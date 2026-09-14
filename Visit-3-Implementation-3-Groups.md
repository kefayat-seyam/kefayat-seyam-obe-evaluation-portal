# Visit 3 — Implementation Summary, Split into 3 Group Parts

**Project:** OBE Curriculum Management — RUET ECE (frontend-only: HTML/CSS/JS, no backend).
**Team:** 3 groups × 3 members.
**How this split works:** the app is built as one folder per role plus a shared
core, so the cleanest division is *by role module*. Each group owns one role
folder end-to-end, and the shared work that all three depend on is listed
separately at the end so no group is left holding it alone.

---

## What Visit 3 added (the big picture)

Visits 1–2 gave us the foundation: the login/role system, the shared UI
(theme, sidebar, tables, modals), the 122-course syllabus data, and the Admin
course/CO-PO screens.

**Visit 3 is the operational layer** — the parts a department actually uses day
to day:

- the people and plans (teachers, students, series and their per-term course lists),
- assessment (class tests, assignment/quiz/presentation, attendance, final exam, and the /100 result),
- communication (notices at department / semester / course level),
- and a complete **read-only Student portal** so students can see all of it.

It also added the **result engine** (`Store.courseResult`) and two data-reset
tools (**Reset demo data** and **Start fresh**).

---

## Group 1 — Admin module (Department Head)

**Folder:** `admin/`
**Pages:** `dashboard.html`, `courses.html`, `co-po.html`,
`faculty-info.html`, `students-info.html`, `series.html`, `notices.html`

**What this group implemented / owns in Visit 3**

- **Series / Semester planning** (`series.html`) — create a batch (e.g.
  "Series 24") and, for each of its 8 terms, pick which courses run. This is
  the plan every other screen reads to know "who studies what this term".
- **Faculty Info** (`faculty-info.html`) — add teachers and **assign courses**
  to them. Assignment sets `course.facultyId`, which is what scopes every
  faculty screen.
- **Students Info** (`students-info.html`) — manage students per series
  (roll, semester, section).
- **Notices** (`notices.html`) — full create/edit/delete of notices at three
  levels: department-wide, a specific semester, or a specific course.
- **Course Management + CO/PO Framework** (`courses.html`, `co-po.html`) —
  the curriculum backbone the whole app hangs on (carried and maintained from
  the earlier visits).

**Data / logic it drives:** `seriesSemesters`, `notices`, `users` (faculty +
students), and `courses.facultyId`. Delete cascades live in `Store`
(`removeCourseDeep`, `removeStudentDeep`, `removeProgramOutcomeDeep`).

**Demo to show in class:** add a teacher, assign them a 1-1 course, add a
couple of students to a series, then post a department notice — and show it
appearing on the faculty and student sides.

---

## Group 2 — Faculty module + the assessment engine

**Folder:** `faculty/`
**Pages:** `dashboard.html`, `curriculum.html`, `co-po-mapping.html`,
`marks.html`, `attendance.html`, `notices.html`

**What this group implemented / owns in Visit 3**

- **CT & Exam Marks** (`marks.html`) — the heart of Visit 3. Enter **four
  class tests** (each /20, best 3 count), one **assignment/quiz/presentation**
  mark (/10) and the **final** (/60). Attendance shows read-only (/10) and the
  **/100 total previews live** as you type.
- **Attendance** (`attendance.html`) — a per-day present / late / absent sheet
  with a term-to-date summary. "Late" counts as half a class in the percentage.
- **Curriculum Editor** (`curriculum.html`) — edit the topic list of each
  assigned course.
- **CO-PO Mapping** (`co-po-mapping.html`) — set each course outcome's level
  (low/medium/high) against the 12 program outcomes.
- **Notices** (`notices.html`) — read the department's, post own at course level.
- Every faculty page is scoped to `Store.coursesOfFaculty(me.id)` — a teacher
  only ever sees their own courses.

**The result engine (owned here):** `Store.courseResult(studentId, courseId)`
computes the **/100 total**:

| Component                          | Out of | How                                            |
|------------------------------------|--------|------------------------------------------------|
| Class tests                        | 20     | best **3 of 4**, averaged                      |
| Attendance                         | 10     | attendance percentage ÷ 10                     |
| Assignment / quiz / presentation   | 10     | one mark entered by the teacher                |
| Final exam                         | 60     | one mark entered by the teacher                |
| **Total**                          | **100**|                                                |

**Data models it drives:** `ctMarks {studentId, courseId, testNumber(1–4),
marks/20}`, `assessMarks {studentId, courseId, marks/10}`, `finalMarks
{studentId, courseId, marks/60}`, `attendance {studentId, courseId, date,
status}`.

**Demo to show in class:** open a 1-1 course, type four CT scores and watch the
best three get counted and the /100 update live; flip to Attendance, mark a day
absent, and show the attendance /10 change flow back into the total.

---

## Group 3 — Student module (read-only portal)

**Folder:** `student/`
**Pages:** `dashboard.html`, `syllabus.html`, `assignments.html`,
`marks.html`, `attendance.html`, `notices.html`

**What this group implemented / owns in Visit 3**

- **My Dashboard** (`dashboard.html`) — my courses with result and attendance
  at a glance.
- **Marks** (`marks.html`) — a full results summary across courses plus a
  per-course breakdown showing which **3 of 4** class tests were counted, the
  attendance mark, the assignment/quiz/presentation mark and the final,
  mirroring the same `Store.courseResult` the teacher sees.
- **Attendance** (`attendance.html`) — summary (present/late/absent/%) plus a
  day-by-day log.
- **Syllabus** (`syllabus.html`) — topics and outcomes per course.
- **Assignments** (`assignments.html`) — the work set for each course, with
  due-date badges (due today / upcoming / closed).
- **Notices** (`notices.html`) — department + my semester + my courses.

**The rule this group enforces:** every student page is **strictly read-only**.
None of these pages contains `btn-danger`, `openForm(`, `askDelete(`,
`Store.add(`, `Store.update(` or `Store.remove(`. The test harness checks this,
and it is the group's headline talking point.

**Data it reads (never writes):** `coursesOfStudent`, `courseResult`,
`ctMarksFor`, `assessMarkFor`, `finalMarkFor`, `attendanceSummary`,
`assignmentsOf`, and the notice filters.

**Demo to show in class:** log in as the demo student, open Marks, and show the
same /100 the teacher entered — plus the "counted / dropped" badges on the four
class tests — with no edit control anywhere on the page.

---

## Built together (shared core — all three groups depend on it)

These are not owned by one group; they are the plumbing everyone builds on and
are best presented briefly at the start:

- **`shared/js/store.js`** — the in-memory "database": load/save to
  `localStorage` (key `obe.data.v3`), generic add/update/remove, all the
  getters above, the delete cascades, `courseResult`, and the two resets.
- **`shared/js/shell.js`** — the sidebar + topbar every page shares, and the
  per-role navigation. Two reset buttons live here:
  - **Reset demo data** → `Store.reset()` reloads the full seed.
  - **Start fresh (empty app)** → `Store.startFresh()` empties everything a
    department fills in (teachers, students, series, outcomes, mappings,
    notices, assignments, all marks and attendance, and course→teacher links)
    but **keeps the fixed foundation**: the department, the 8 semesters, the
    122 syllabus courses and their topics, the 12 program outcomes, and the
    admin login.
- **`shared/js/seed-data.js`** — the placeholder people, notices, sample
  outcomes, and the fixed (non-random) demo marks/attendance loop for one 1-1
  batch.
- **`shared/js/{ui,theme,auth}.js`** and **`shared/css/*`** — the components,
  light/dark theme, and login/role-guard used everywhere.
- **`README.md`** and the **`Additional Files/tests/`** harness.

---

### One-line split for the cover slide

- **Group 1 — Admin:** people, course plans, and notices (`admin/`).
- **Group 2 — Faculty:** marks, attendance, and the /100 result engine (`faculty/` + `courseResult`).
- **Group 3 — Student:** the read-only portal that shows all of it (`student/`).
