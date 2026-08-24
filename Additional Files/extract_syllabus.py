"""Extract courses + curriculum topics from the RUET ECE syllabus PDF into a JS seed file.

Run it from anywhere (it works out its own paths):

    pip install pypdf
    python "Additional Files/extract_syllabus.py"

It reads ECE_syllabus.pdf sitting next to this script and overwrites
shared/js/seed-courses.js, then checks the result against the credit
table printed on page 28 of the syllabus and fails if anything is off.
"""
import json
import os
import re

import pypdf

HERE = os.path.dirname(os.path.abspath(__file__))
PROJECT = os.path.dirname(HERE)

PDF = os.path.join(HERE, "ECE_syllabus.pdf")
OUT = os.path.join(PROJECT, "shared", "js", "seed-courses.js")

# "Course Contents" section of the book
FIRST_PAGE, LAST_PAGE = 34, 52  # 1-based, inclusive

SEM_RE = re.compile(
    r"^(1st|2nd|3rd|4th)\s+year\s+(odd|even)\s+semester\s*(\(([^)]*)\))?\s*$",
    re.IGNORECASE,
)
COURSE_RE = re.compile(
    r"^([A-Za-z]{2,4}\s?\d{4})\s*:\s*(.+?)\s{1,}Credits?\s*:\s*([\d.]+)\s*$"
)
# Long titles wrap, and then "Credits: 3.00" sits on a line of its own:
#     Math 1217: Transform Methods, Statistics & Complex
#     Variable
#     Credits: 3.00
HEADER_START_RE = re.compile(r"^([A-Za-z]{2,4}\s?\d{4})\s*:\s*(\D.*)$")
CREDITS_ONLY_RE = re.compile(r"^Credits?\s*:\s*([\d.]+)\s*$")
MAX_WRAPPED_TITLE_LINES = 3
# A topic line looks like  "Network Theorems:  Superposition theorem, ..."
TOPIC_RE = re.compile(r"^([A-Z][A-Za-z0-9 ,\-&/()'\.]{2,60}?)\s*:\s+(\S.*)$")

TERM_NUM = {"odd": 1, "even": 2}
YEAR_NUM = {"1st": 1, "2nd": 2, "3rd": 3, "4th": 4}


def clean(text):
    """Undo the PDF's stray spaces: 'non -technical' -> 'non-technical'."""
    text = text.replace("–", "-").replace("’", "'").replace("‘", "'")
    text = re.sub(r"(\w)\s+-\s*(\w)", r"\1-\2", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def page_lines(reader, page_no):
    raw = reader.pages[page_no - 1].extract_text() or ""
    out = []
    for line in raw.split("\n"):
        line = line.rstrip()
        # drop the printed page-number band at the top of every page
        if re.match(r"^\s+\d+\s+\d+\s*$", line):
            continue
        if line.strip():
            out.append(line)
    return out


# ---------------------------------------------------------------------
# Two things the "Course Contents" pages get wrong, corrected from the
# "Semester-wise Distribution of Credits" table on page 28 and the
# semester tables on pages 29-33. Those tables are the authority here
# because the printed semester totals only add up with these values.
# ---------------------------------------------------------------------

# The contents page prints "ECE 4224 ... Credits: 0.75", but the 4th year
# even semester table gives it 3 contact hours and 1.50 credits, and the
# semester total of 21.75 only works with 1.50.
CREDIT_FIXES = {
    "ECE 4224": 1.50,
}

# A course is a lecture ("theory") course only if it is one of the five
# 3.00-credit courses in its semester. Everything else sits in the
# Sessional column of the distribution table, including several whose
# titles do not contain the word "Sessional": Industrial Training,
# Seminar, Engineering Ethics, the shop/drawing/design courses and the
# software development projects. Thesis/Project-II is the one course
# that carries 3.00 credits and is still not a lecture course, so it is
# named here.
NON_LECTURE_CODES = {"ECE 4000"}


def course_type(code, credits):
    """'theory' for the five 3.00-credit lecture courses, else 'sessional'."""
    if code in NON_LECTURE_CODES:
        return "sessional"
    return "theory" if abs(credits - 3.00) < 0.001 else "sessional"


def parse():
    reader = pypdf.PdfReader(PDF)
    courses = []
    semester = None
    optional_tag = None
    current = None
    pending = None  # a course header whose title wrapped onto the next line

    def start_course(code, title, credits):
        code = re.sub(r"\s+", " ", code.strip())
        if " " not in code:  # "ECE1101" -> "ECE 1101"
            code = re.sub(r"([A-Za-z]+)(\d+)", r"\1 \2", code)
        title = clean(title)
        credits = CREDIT_FIXES.get(code, float(credits))
        course = {
            "code": code,
            "name": title,
            "credits": credits,
            "semester": semester,
            "type": course_type(code, credits),
            "optional": bool(optional_tag),
            "topics": [],
        }
        courses.append(course)
        return course

    for page_no in range(FIRST_PAGE, LAST_PAGE + 1):
        for line in page_lines(reader, page_no):
            stripped = line.strip()

            # ---- still waiting for the "Credits: x.xx" of a wrapped header ----
            if pending:
                credits = CREDITS_ONLY_RE.match(stripped)
                if credits:
                    current = start_course(
                        pending["code"], " ".join(pending["title"]), credits.group(1)
                    )
                    pending = None
                    continue
                if len(pending["title"]) - 1 < MAX_WRAPPED_TITLE_LINES:
                    pending["title"].append(stripped)
                    continue
                pending = None  # not a header after all, fall through

            sem = SEM_RE.match(stripped)
            if sem:
                year, term, _, note = sem.groups()
                semester = f"{YEAR_NUM[year.lower()]}-{TERM_NUM[term.lower()]}"
                optional_tag = clean(note) if note else None
                current = None
                continue

            course = COURSE_RE.match(stripped)
            if course and semester:
                current = start_course(*course.groups())
                continue

            header = HEADER_START_RE.match(stripped)
            if header and semester and "Credits" not in stripped:
                pending = {"code": header.group(1), "title": [header.group(2).strip()]}
                continue

            if current is None:
                continue

            topic = TOPIC_RE.match(stripped)
            if topic:
                head, body = topic.groups()
                current["topics"].append({"title": clean(head), "detail": clean(body)})
            elif current["topics"]:
                last = current["topics"][-1]
                last["detail"] = clean(last["detail"] + " " + stripped)
            else:
                # e.g. "Sessional based on the theory of course ECE 1101."
                current["topics"].append({"title": "Overview", "detail": clean(stripped)})

    return courses


def js_literal(courses):
    rows = []
    for c in courses:
        topics = ",\n".join(
            "      { title: %s, detail: %s }"
            % (json.dumps(t["title"]), json.dumps(t["detail"]))
            for t in c["topics"]
        )
        rows.append(
            "  {\n"
            "    code: %s,\n"
            "    name: %s,\n"
            "    credits: %s,\n"
            "    semester: %s,\n"
            "    type: %s,\n"
            "    optional: %s,\n"
            "    topics: [\n%s\n    ]\n"
            "  }"
            % (
                json.dumps(c["code"]),
                json.dumps(c["name"]),
                c["credits"],
                json.dumps(c["semester"]),
                json.dumps(c["type"]),
                "true" if c["optional"] else "false",
                topics,
            )
        )
    return ",\n".join(rows)


if __name__ == "__main__":
    courses = parse()
    header = (
        "/* ------------------------------------------------------------------\n"
        " * seed-courses.js  -  AUTO-GENERATED from the RUET ECE syllabus PDF\n"
        " * (Syllabus for Undergraduate Studies, session 2020-2021, 1st edition)\n"
        " *\n"
        " * %d courses, semester codes are \"year-term\" (\"3-1\" = 3rd year odd).\n"
        " * Edit freely: this file is only the *starting* data. Once the app has\n"
        " * run once, courses live in localStorage and are edited from the Admin\n"
        " * module. Use \"Reset demo data\" in the sidebar to re-seed from here.\n"
        " * ------------------------------------------------------------------ */\n"
        "window.OBE_SEED_COURSES = [\n"
    ) % len(courses)
    with open(OUT, "w", encoding="utf-8") as fh:
        fh.write(header + js_literal(courses) + "\n];\n")

    by_sem = {}
    for c in courses:
        by_sem.setdefault(c["semester"], []).append(c)
    print(f"{len(courses)} courses -> {OUT}")
    for sem in sorted(by_sem):
        cs = by_sem[sem]
        topics = sum(len(c["topics"]) for c in cs)
        print(f"  {sem}: {len(cs):2d} courses, {topics:3d} topics, "
              f"{sum(c['credits'] for c in cs):6.2f} credits")
    noname = [c["code"] for c in courses if not c["topics"]]
    print("courses with no topics:", noname or "none")

    # ---------------- check against the official table ----------------
    # "Semester-wise Distribution of Credits", syllabus page 28:
    #   semester -> (theory courses, theory credits,
    #                sessional courses, sessional credits, total)
    # In 4th year two theory and two sessional slots are filled by
    # whichever optional courses the student picks, so those slots are
    # counted separately from the compulsory courses.
    OFFICIAL = {
        "1-1": (5, 15.00, 5, 5.25, 20.25, 0),
        "1-2": (5, 15.00, 4, 3.75, 18.75, 0),
        "2-1": (5, 15.00, 5, 4.50, 19.50, 0),
        "2-2": (5, 15.00, 4, 5.25, 20.25, 0),
        "3-1": (5, 15.00, 5, 4.50, 19.50, 0),
        "3-2": (5, 15.00, 5, 4.50, 19.50, 0),
        "4-1": (5, 15.00, 7, 5.50, 20.50, 2),
        "4-2": (5, 15.00, 5, 6.75, 21.75, 2),
    }

    print("\nchecking against the credit table on page 28:")
    problems = []
    for sem, (n_th, cr_th, n_se, cr_se, total, elective_slots) in OFFICIAL.items():
        core = [c for c in by_sem.get(sem, []) if not c["optional"]]
        th = [c for c in core if c["type"] == "theory"]
        se = [c for c in core if c["type"] == "sessional"]
        # each elective slot is one 3.00 theory + one 0.75 sessional
        got_n_th = len(th) + elective_slots
        got_n_se = len(se) + elective_slots
        got_cr_th = sum(c["credits"] for c in th) + elective_slots * 3.00
        got_cr_se = sum(c["credits"] for c in se) + elective_slots * 0.75
        got_total = round(got_cr_th + got_cr_se, 2)
        line = (f"  {sem}: theory {got_n_th}/{n_th} {got_cr_th:6.2f}/{cr_th:.2f}"
                f"   sessional {got_n_se}/{n_se} {got_cr_se:5.2f}/{cr_se:.2f}"
                f"   total {got_total:6.2f}/{total:.2f}")
        ok = (got_n_th == n_th and got_n_se == n_se
              and abs(got_cr_th - cr_th) < 0.005
              and abs(got_cr_se - cr_se) < 0.005
              and abs(got_total - total) < 0.005)
        print(line + ("   ok" if ok else "   <-- MISMATCH"))
        if not ok:
            problems.append(sem)

    if problems:
        print("\nMISMATCH in: " + ", ".join(sorted(problems)))
        raise SystemExit(1)
    print("\nevery semester matches the printed syllabus table.")
