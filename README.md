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

| Role    | Email                        | Password     |
|---------|------------------------------|--------------|
| Admin   | `head.ece@ruet.ac.bd`        | `admin123`   |
| Faculty | `fariya@ece.ruet.ac.bd`      | `faculty123` |
| Student | `sadikin@student.ruet.ac.bd` | `student123` |

The login page has a role picker; picking the wrong role for an account is
refused on purpose, so the three dashboards stay separate.

There is no real security here — passwords sit in plain text in the seed file.
That is fine for a class project and is noted in `shared/js/auth.js` too.

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
faculty/              Faculty                           (STEP 2)
student/              Student, read-only                (STEP 3)
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
Faculty Info, Students Info, Series/Semester and Notices.

**Faculty** and **Student** are steps 2 and 3. Their sidebar links already
exist and will light up as the pages are added.

## Data models

Every record has a readable `id` (`crs-1`, `co-27`, `po-3`…) so it is easy
to follow in the console.

```js
Course      { id, code, name, semester, departmentId,
              credits, type, optional, facultyId }
              // semester is "year-term": "3-1" = 3rd year odd
              // type is "theory" | "sessional"
              // facultyId is null when nobody is assigned yet

Curriculum  { id, courseId, topics: [{ title, detail }],
              updatedAt, updatedBy }
              // one row per course, created with the course

CO          { id, courseId, code, description }
              // code is "CO1", "CO2"… restarting at 1 for each course

PO          { id, departmentId, code, title, description }
              // the 12 Washington Accord / BAETE outcomes

COPOMapping { id, coId, poId, level }
              // level 1 = low, 2 = medium, 3 = high

Notice      { id, title, message, level, departmentId,
              courseId, semester, postedBy, postedAt }
              // level is "department" | "semester" | "course"

User        { id, name, email, password, role,
              departmentId, designation,     (faculty)
              roll, semester, series }        (student)
              // role is "admin" | "faculty" | "student"

Semester    { id, label, year, term }         // fixed, 1-1 … 4-2
Series      { id, name, semester, advisorId, studentCount }
Department  { id, code, name, university, head }
```

## Where the placeholder data is

Real data from the syllabus, safe to keep:

- `shared/js/seed-courses.js` — all 122 courses, their credits, type,
  semester and the topic list from the Course Contents pages.
  **Auto-generated — do not hand-edit.** Re-run the extractor instead.

Made-up data, meant to be replaced:

- `shared/js/seed-data.js` — everything else. The file is split into
  labelled sections and each placeholder block says so in a comment:
  the department, the six teachers, the eight students, the series list,
  the sample course outcomes (for eight courses only), their CO-PO
  mappings, and the notices. The twelve program outcomes in that file are
  real, taken from the accreditation criteria.

## Editing it

**Change the seed data.** Edit `shared/js/seed-data.js`, then click
"Reset demo data" at the bottom of the sidebar. Nothing re-seeds by
itself once a database exists, so that button is the way to pick up
your changes.

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
`Shell.render(...)` at the top of the inline script, then the page's own
code. Add a matching entry to `NAV` in `shared/js/shell.js` and the
sidebar link appears.

**Change the colours.** `shared/css/theme.css` holds two blocks of CSS
variables, one per theme. Nothing else in the app names a colour, so
editing those two blocks re-skins everything.

## Tests

```
node "Additional Files/tests/run-tests.js"
```

218 checks, no packages to install. They run the app's real JavaScript
under Node against a small fake browser (`tests/harness.js`), so they
catch actual breakage rather than just reading the files. Three groups:

- **A. Data** — the seeded courses match the syllabus credit table
  semester by semester, and the degree totals exactly 160.00 credits.
  If you change the syllabus, this is the section to update.
- **B. Behaviour** — add / update / delete, the delete cascades,
  persistence, login, the role guard, and theme switching.
- **C. Pages** — every page's script runs without throwing, every link
  points at a file that exists, every `UI.el('id')` matches a real id,
  the pages show real data, and the pop-up forms accept good input and
  refuse bad input.
