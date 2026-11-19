# OBE Curriculum Management — RUET ECE

A frontend-only web app for managing an Outcome Based Education curriculum.
No server, no database, no build step: open `index.html` in a browser and it runs.
All data lives in `localStorage`, seeded from the real RUET ECE undergraduate syllabus.

## Running it

Double-click `index.html`. That is all.

If your browser blocks `localStorage` on `file://` pages (rare, but some
strict privacy settings do), the app still works for the page you are on but
forgets everything when you navigate. The fix is to serve the folder over
http instead:

```
cd "OBE Software"
python -m http.server 8000
```

then open <http://localhost:8000>.

### Demo logins

| Role                  | Email                        | Password     |
|-----------------------|------------------------------|--------------|
| Admin                 | `head.ece@ruet.ac.bd`        | `admin123`   |
| Faculty               | `fariya@ece.ruet.ac.bd`      | `faculty123` |
| Faculty (Mathematics) | `sharmin@math.ruet.ac.bd`    | `faculty123` |
| Student               | `2410001@student.ruet.ac.bd` | `student123` |

The login page has a role picker; picking the wrong role for an account is
refused on purpose, so the three dashboards stay separate.

Teachers from other departments log in exactly like ECE staff — they pick
"Faculty" too, and see only their own courses. Besides Mathematics above,
the seed has `kamrul@phy.ruet.ac.bd` (Physics), `rahima@hum.ruet.ac.bd`
(Humanities) and `nasrin@chem.ruet.ac.bd` (Chemistry), all with
`faculty123`. `ECE 1101` is deliberately shared
between two teachers, Fariya Tabassum and Nadim Reza, so the same course
can be opened from two different staff logins.

Students are no longer typed in one at a time. The admin generates a range
of rolls and each roll becomes a login on its own: the ID is
`<roll>@student.ruet.ac.bd` (built from the roll) and the password starts
as `student123` — the same default for everyone. The student then fills in
their own name, section and contact number on the **My Profile** page of
their portal, and changes that password there as well.

There is no real security here — passwords sit in plain text in the seed file.
That is fine for a frontend demonstration and is noted in `shared/js/auth.js`.
It is not suitable for production security. Evaluation API methods enforce
the demo role and ownership checks in `Store`, but a production deployment
must replace localStorage and role checks with server-side authentication,
authorization and encrypted storage.

## Folder layout

```
index.html            login page — routes to the right dashboard
shared/
  css/theme.css       colours for the light and dark themes
  css/ui.css          every component: cards, tables, buttons, modal…
  js/seed-courses.js  122 courses + syllabus topics (AUTO-GENERATED)
  js/seed-data.js     everything else that is placeholder data
  js/store.js         the "database": load, save, add, update, delete
  js/ui.js            small helpers: el, esc, modal, confirm, toast…
  js/theme.js         light / dark switching
  js/auth.js          login, logout, role guard
  js/shell.js         the sidebar and topbar every page shares
admin/                Admin = Department Head          (STEP 1 — done)
faculty/              Faculty                           (STEP 2 — done)
student/              Student, read-only                (STEP 3 — done)
Additional Files/
  ECE_syllabus.pdf    the source document
  extract_syllabus.py rebuilds seed-courses.js from the PDF
  tests/run-tests.js  checks the whole app without a browser
```

Each role folder is self-contained. It reuses `shared/` and nothing else,
so one role can be worked on without touching another.

## The pages

**Admin** — Dashboard (counts and shortcuts), Course Management (create,
edit, delete, filter, export), CO/PO Framework (program outcomes for the
department, course outcomes per course, and the CO×PO matrix), plus
Faculty Info (add ECE teachers and assign them courses — a course may
hold several teachers at once), External Faculty (the Mathematics,
Physics and Humanities staff who teach the first-year courses), Student
Rolls (generate a batch's rolls instead of typing students in),
Series/Semester (the batches and their per-term course plans) and Notices.

**Faculty** — My Dashboard (my courses and the notices aimed at me),
Course Outcomes (write and edit the COs of each of my courses, each with
a short title and a full description), CO-PO Mapping (set the level for
each of my course's outcomes against the program outcomes), Question
Setup (list the questions of each class test and of the two final-exam
parts, and tag every question with the CO/PO pairs it examines), CT &
Exam Marks (enter four class tests — the best three count — plus one
assignment/quiz/presentation mark and the final; attendance feeds in
automatically and the running /100 total previews live), Assignments
(post the work students see, with due dates), Attendance (a per-day
present / late / absent sheet with a term-to-date summary), CO/PO
Attainment (the report that comes out of the question tags), and Notices
(read the department's, post my own at course level). A faculty member
only ever sees and edits the courses assigned to them. The Curriculum
Editor has moved out of the faculty portal; the topic list is the
syllabus, and the syllabus belongs to the department.

**Student** — every student page is read-only. My Dashboard (my courses
with result, attendance and outcomes at a glance), Syllabus (topics and
outcomes per course), Course Outcomes (what each of my courses is meant
to teach me), Assignments (with due dates), Marks (the full breakdown:
best three of four class tests, attendance, assignment/quiz/presentation
and the final), Attendance (summary plus a day-by-day log), and Notices
(department + my semester + my courses). The one page a student can type
on is **My Profile**: their own name, section and contact number, and
their own password. Nothing else on the student side is editable.

**Course Evaluation & Feedback** — faculty create course-wise evaluations
with custom sections and rating 1-5, MCQ, checkbox and written-feedback
questions. Optional CLO mappings are stored on questions. Publishing makes
an evaluation available only to eligible students in that course semester;
submissions are persistent, deadline checked and duplicate protected.
Student feedback is anonymous by default. Aggregate analytics, question
statistics, response percentages and written suggestions/improvement areas
are available only to the creator teacher, who can also export CSV or print
to PDF. Individual reports are restricted to the creator and never expose
student identity for anonymous evaluations.

## Data models

Every record has a readable `id` (`crs-1`, `co-27`, `po-3`…) so it is easy
to follow in the console.

```js
Course      { id, code, name, semester, departmentId,
              credits, type, optional, facultyIds: [],
              coThreshold, poThreshold }
              // semester is "year-term": "3-1" = 3rd year odd
              // type is "theory" | "sessional"
              // facultyIds is EVERY teacher of the course; empty when
              // nobody is assigned yet
              // the two thresholds are the pass mark for attainment,
              // 60 (%) unless the department changes them

Curriculum  { id, courseId, topics: [{ title, detail }],
              updatedAt, updatedBy }
              // one row per course, created with the course

CO          { id, courseId, code, title, description }
              // code is "CO1", "CO2"… restarting at 1 for each course
              // title is a short name for tables, description the full
              // sentence; faculty edit both

PO          { id, departmentId, code, title, description }
              // the 12 Washington Accord / BAETE outcomes

COPOMapping { id, coId, poId, level }
              // level 1 = low, 2 = medium, 3 = high

Notice      { id, title, message, level, departmentId,
              courseId, semester, date, author }
              // level is "department" | "semester" | "course"
              // courseId set only for course notices; semester only
              // for semester notices

User        { id, name, email, password, role, departmentId,
              designation,                        (faculty)
              external, externalDepartment,       (faculty)
              roll, seriesId, semester, section,
              contact, profileComplete }           (student)
              // role is "admin" | "faculty" | "student"
              // external is true for a teacher from another department,
              // and externalDepartment names it ("Mathematics")
              // profileComplete is false until the student has filled
              // in their own name and section

Semester    { id, label, year, term }         // fixed, 1-1 … 4-2
Series      { id, name, departmentId, startYear, currentSemester }
              // a batch, e.g. "Series 24 (2024-25)"
Department  { id, code, name, university, head }

// ---- added in Visit 3 ----

SeriesSemester { id, seriesId, number, termId, courseIds: [] }
              // one series' course plan for one term.
              // number 1..8, termId "1-1"…"4-2". The admin's
              // Series/Semester screen edits courseIds.

Assignment  { id, courseId, title, description, dueDate }
              // posted by faculty, read by students

CTMark      { id, studentId, courseId, testNumber, marks }
              // testNumber 1..4, marks out of 20.
              // the best three of the four count towards the total.
              // still used when the test has no questions set up

AssessMark  { id, studentId, courseId, marks }
              // one per student per course, marks out of 10.
              // the assignment + quiz + presentation component.

FinalMark   { id, studentId, courseId, marks }
              // one per student per course, marks out of 60
              // still used when the final has no questions set up

Attendance  { id, studentId, courseId, date, status }
              // status "present" | "late" | "absent"
              // late counts as half a class in the percentage
              // the percentage ÷ 10 is the attendance mark (out of 10)

// ---- added in Visit 4 ----

Question    { id, courseId, paper, qNo, maxMarks,
              tags: [ { coId, poId, marks } ] }
              // paper is one of Store.PAPERS:
              //   "ct1" … "ct4" (20 each), "finalA", "finalB" (30 each)
              // one question can be split over several CO/PO pairs, and
              // the tag marks must add up to the question's maxMarks

QuestionMark { id, studentId, courseId, questionId, marks }
              // what one student scored on one question

CourseEvaluation { id, courseId, creatorFacultyId, title, description,
                   deadline, anonymous, status, sections, createdAt,
                   publishedAt }
              // status is "draft" or "published"
              // sections contain typed questions with optional cloIds

EvaluationResponse { id, evaluationId, studentId, submittedAt, answers }
              // one response per student/evaluation
              // studentId is retained only for creator individual reports;
              // default anonymous mode hides that identity everywhere
```

The course total (out of 100) is worked out in one place, `Store.courseResult`:
best three of four class tests averaged to **/20**, plus attendance
(percentage ÷ 10, **/10**), plus the assignment/quiz/presentation mark
(**/10**), plus the final exam (**/60**). That split has not changed, but
the return value has: it is now
`{ctCount, ctScores, ctScore, ctCounted, attPct, attScore, assessScore,
finalScore, total, grade, hasAny}`, where `ctScores` is
`[{testNumber, marks}]` and **`ctCounted` is a list of test numbers**
like `[1, 2, 4]` rather than a list of CT mark ids. Anything that used
the old `ctCounted` has to be updated. The `grade` is the letter grade
`Store.gradeOf(total)` gives back: A+ at 80, A at 75, A- at 70, B+ at 65,
B at 60, B- at 55, C+ at 50, C at 45, D at 40, and F below that.

### Question-wise marks

Until now a class test was one box with one number in it, which is enough
to grade a student and not enough to say anything about outcomes. A
teacher can now list the questions of a paper on **Question Setup** —
however many questions that paper has — give each a mark, and tag each
question with the CO and PO it examines. A question worth 5 can be split,
say 3 marks against CO2/PO2 and 2 against CO3/PO5; the tags must add up
to the question's own total. Marks are then entered question by question
as `QuestionMark` rows. The six papers are listed in `Store.PAPERS` —
four class tests and the two halves of the final — with
`Store.paperLabel` for their names and `Store.paperOutOf` for what each
should add up to, 20 for a class test and 30 for each final part.

**Papers are optional, and that is the point.** If a course has no
questions for a paper, `Store.ctTestScore` and `Store.finalScoreOf` fall
back to the old single-box `ctMarks` / `finalMarks` rows, so every screen
that worked before still works and no teacher is forced into the new way.
The demo shows both paths side by side: `ECE 1101` has full question
papers, `ECE 1103` deliberately has none.

### CO / PO attainment

`Store.attainmentOf(courseId)` is what the question tags are for, and it
is the report on **CO/PO Attainment**. For each question a student
answered, `share = marks scored ÷ question maxMarks`; each tag of that
question then hands `share × tag.marks` obtained, out of `tag.marks`
possible, to its CO and to its PO. A student attains an outcome when
their percentage on it reaches the course's `coThreshold` or
`poThreshold` (both 60 unless changed), and the class-level figure is
simply the percentage of the counted students who attained it. Students
who were never examined on an outcome are left out of its count rather
than counted as failing it.

### One course, several teachers

A course used to carry a single `facultyId`. It now carries
`facultyIds: []`, because a theory course and its sessional are often
shared, and because two teachers really do split one section. Nothing
should read or write that array directly — go through
`Store.coursesOfFaculty`, `Store.teachersOfCourse`, `Store.teacherNames`,
`Store.assignTeacher`, `Store.unassignTeacher` and `Store.setTeachers`,
which keep the link tidy from either end. In the seed a teacher is still
written with a `courseCodes` list because it reads better there; the
loader resolves it into the courses' `facultyIds` and then throws it away.

First-year students are taught by staff who are not in the department at
all. Such a user carries `external: true` and the name of their own
department in `externalDepartment` — Mathematics, Physics or Humanities —
and teaches the courses that belong to it: `Math 1117`, `Phy 1117`,
`Phy 1118`, `Hum 1117`, `Hum 1118` and so on. They are ordinary faculty
in every other way. Three list helpers keep the two groups apart:
`Store.facultyList()` is the ECE staff, `Store.externalFacultyList()` the
visitors, and `Store.allFacultyList()` both together. The head manages
the visitors on their own screen, `admin/external-faculty.html`, so the
ECE staff list stays a list of ECE staff.

### Rolls, not people

The head does not type a student in. On **Student Rolls** they give a
range and the app makes the accounts:
`Store.generateRolls({fromRoll, toRoll, seriesId, semester, departmentId})`
— 2410001 to 2410060, say. At most 300 rolls at a time, and any roll that
already exists is skipped, so running it twice does no harm. Each new
roll gets the login `<roll>@student.ruet.ac.bd`, the password
`student123`, and `profileComplete: false`.

The student supplies the rest themselves: `Store.saveProfile(userId,
{name, section, contact})` from **My Profile**, and
`Store.setPassword(userId, current, next)` for the password.
`Store.pendingProfiles(seriesId)` lists the rolls of a series that have
not been filled in yet, which is what the head watches at the start of a
term. Those two methods are named the way they are on purpose: the
student module is checked for the generic writers, and a self-service
save must not look like one (see below).

## Where the placeholder data is

Real data from the syllabus and the department, safe to keep:

- `shared/js/seed-courses.js` — all 122 courses, their credits, type,
  semester and the topic list from the Course Contents pages.
  **Auto-generated — do not hand-edit.** Re-run the extractor instead.
- The nineteen ECE teachers and the Series 24 student roster in
  `shared/js/seed-data.js` are real people. The roster is the whole
  2024-25 intake, rolls `2410001`–`2410060`, now in 2nd Year Odd (2-1).
  Four of those rolls (`2410008`, `2410034`, `2410038`, `2410041`) were
  issued but have no name against them in the department sheet, so they
  are seeded with a blank name on purpose and show as "Waiting for
  student" until the student fills in their own profile.

Made-up data, meant to be replaced:

- `shared/js/seed-data.js` — everything else. The file is split into
  labelled sections and each placeholder block says so in a comment:
  the department, four external teachers from Mathematics, Physics,
  Humanities and Chemistry, the
  five series, the sample course outcomes (for thirteen courses only), their
  CO-PO mappings, the notices, and a few sample assignments. The twelve
  program outcomes in that file are real, taken from the accreditation
  criteria. A course outcome may be written either as a plain sentence,
  which becomes its description and leaves the title blank, or as
  `{ title, description }` — both forms are accepted, and faculty can
  edit either field afterwards. Class-test marks, the
  assignment/quiz/presentation marks, final marks and attendance start
  empty and are filled for the whole roster by a small, fixed loop at
  the bottom of the file (the same every reset, so it is easy to talk
  through in class) — everything else is entered through the app. The
  marks sit on the two first-year theory courses `ECE 1101` and
  `ECE 1103`, because those are the results this batch has actually
  finished; their current 2-1 courses start empty. That
  same loop spreads each `ECE 1101` paper total over that paper's
  questions, so the question-wise screens and the old one-box screens
  always agree on the number; `ECE 1103` is left without questions on
  purpose, to show the fallback working.

Because the batch has moved on to 2-1 while its marks live in 1-1, two
lookups deliberately look wider than "the current semester":
`Store.coursesWithRecords(student)` (used by the student Marks and
Attendance pages) and `Store.studentsOfCourse(course)` (the class list
behind every faculty screen) both add anyone who already has a mark or
an attendance record, on top of the plain semester match.

## Editing it

**Change the seed data.** Edit `shared/js/seed-data.js`, then click
"Reset demo data" at the bottom of the sidebar. Nothing re-seeds by
itself once a database exists, so that button is the way to pick up
your changes. The app keeps its data under the `localStorage` key
`obe.data.v5`; bump that version suffix (`STORAGE_KEY` in
`shared/js/store.js`) whenever you change the seed shape, otherwise the
browser keeps serving the old cached copy and your edits look like they
"didn't take".

**The two reset buttons.** The sidebar has two, and they are different:

- **Reset demo data** reloads the full seed — every course, teacher,
  student, mark and notice goes back to the values in the seed files.
- **Start fresh (empty app)** wipes everything a department would fill
  in over time (teachers, students, series, outcomes, mappings, notices,
  assignments, marks, attendance, questions and question marks, and
  course→teacher links) but keeps the fixed foundation: the department,
  the eight semesters, the 122 syllabus courses and their topics, the
  program outcomes, and the admin login. Use it to start from a blank
  app without losing the syllabus.

**Change the syllabus courses.** Edit the PDF page range or the fixes at
the top of `Additional Files/extract_syllabus.py` and re-run it:

```
pip install pypdf
python "Additional Files/extract_syllabus.py"
```

It rewrites `seed-courses.js` and then checks itself against the credit
table printed on page 28 of the syllabus, failing loudly if a semester
no longer adds up.

**Add a page.** Copy an existing one — `admin/series.html` is the
smallest. Each page is the same four parts: the `<head>` one-liner that
applies the saved theme before paint, the shared `<script src>` tags in
the order they appear everywhere, `Auth.requireRole('admin')` and
`Shell.mount(...)` at the top of the inline script, then the page's own
code. Add a matching entry to `NAV` in `shared/js/shell.js` and the
sidebar link appears.

**Change the colours.** `shared/css/theme.css` holds two blocks of CSS
variables, one per theme. Nothing else in the app names a colour, so
editing those two blocks re-skins everything.

## Tests

```
node "Additional Files/tests/run-tests.js"
```

No packages to install. They run the app's real JavaScript
under Node against a small fake browser (`tests/harness.js`), so they
catch actual breakage rather than just reading the files. Three groups:

- **A. Data** — the seeded courses match the syllabus credit table
  semester by semester, and the degree totals exactly 160.00 credits.
  If you change the syllabus, this is the section to update.
- **B. Behaviour** — add / update / delete, the delete cascades,
  persistence, login, the role guard, and theme switching.
- **C. Pages** — across all three role folders, every page's script runs
  without throwing, every link points at a file that exists, every
  `UI.el('id')` matches a real id, the pages show real data, the pop-up
  forms accept good input and refuse bad input, and every student page is
  checked to be strictly read-only. That last rule is a plain text
  search: nothing under `student/` may contain `btn-danger`, `openForm(`,
  `askDelete(`, `Store.add(`, `Store.update(` or `Store.remove(`. It is
  why the two things a student *can* save go through `Store.saveProfile`
  and `Store.setPassword` instead of the generic writers.
