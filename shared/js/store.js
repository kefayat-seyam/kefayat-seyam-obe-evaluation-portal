/* ==================================================================
   store.js — the app's "database"
   ------------------------------------------------------------------
   There is no server in this project, so every record lives in the
   browser's localStorage under one single key. The whole database is
   one JavaScript object:

     {
       meta:       { seededAt, counters }
       department: { ... }                 (one department per admin)
       semesters:  [ ... ]                 (fixed 1-1 ... 4-2)
       series:     [ ... ]
       users:      [ ... ]                 (admin / faculty / student)
       courses:    [ ... ]
       curriculums:[ ... ]                 (topics list per course)
       programOutcomes: [ ... ]            (PO, per department)
       courseOutcomes:  [ ... ]            (CO, per course)
       coPoMappings:    [ ... ]            (CO -> PO with level 1-3)
       notices:    [ ... ]
     }

   Pages never touch localStorage directly. They call the small API at
   the bottom of this file:

     Store.all('courses')                  -> array
     Store.get('courses', id)              -> one record or null
     Store.where('courses', c => ...)      -> filtered array
     Store.add('courses', {...})           -> the new record (id added)
     Store.update('courses', id, {...})    -> the updated record
     Store.remove('courses', id)           -> true / false
     Store.reset()                         -> wipe and re-seed

   Every write saves the whole database back to localStorage, which is
   fast enough at this size and keeps the code easy to follow.
   ================================================================== */

window.Store = (function () {
  'use strict';

  var STORAGE_KEY = 'obe.data.v5';   // bump this whenever seed-data changes,
                                     // so old cached data in the browser is
                                     // dropped and the new seed loads.
  var db = null;   // the in-memory copy; localStorage is the backup

  /* ---------------- low level load / save ---------------- */

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    } catch (err) {
      // Private-browsing mode or a full quota. The app still works for
      // this page view, it just will not remember anything.
      console.warn('Could not save to localStorage:', err);
    }
  }

  function load() {
    if (db) return db;
    var saved = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch (err) {
      console.warn('localStorage is not available:', err);
    }
    if (saved) {
      try {
        db = JSON.parse(saved);
        return db;
      } catch (err) {
        console.warn('Saved data was corrupt, re-seeding.', err);
      }
    }
    db = buildSeed();
    save();
    return db;
  }

  /* A readable, increasing id per prefix: "crs-1", "co-27", ... */
  function nextId(prefix) {
    if (!db.meta.counters[prefix]) db.meta.counters[prefix] = 0;
    db.meta.counters[prefix] += 1;
    return prefix + '-' + db.meta.counters[prefix];
  }

  /* Work on copies so a page cannot change the database by accident. */
  function copy(value) {
    return value == null ? value : JSON.parse(JSON.stringify(value));
  }

  /* ---------------- first-run seeding ---------------- */

  function buildSeed() {
    var seed = window.OBE_SEED;
    var seedCourses = window.OBE_SEED_COURSES || [];
    if (!seed) throw new Error('seed-data.js must be loaded before store.js');

    db = {
      meta: { seededAt: new Date().toISOString(), counters: {} },
      department: copy(seed.department),
      semesters: copy(seed.semesters),
      series: copy(seed.series),
      users: [],
      courses: [],
      curriculums: [],
      programOutcomes: [],
      courseOutcomes: [],
      coPoMappings: [],
      notices: [],
      /* --- Visit 3 collections --- */
      seriesSemesters: [],   // a series' course plan for one semester number
      assignments: [],       // per-course assignments (faculty post, students read)
      ctMarks: [],           // class-test marks, per student / course / test
      assessMarks: [],       // assignment/quiz/presentation mark, per student / course (out of 10)
      finalMarks: [],        // final-exam marks, per student / course
      attendance: [],        // one row per student / course / date
      /* --- Visit 4 collections (question-wise CO/PO, like the RUET workbook) --- */
      questions: [],         // one row per question of a CT or final paper
      questionMarks: [],     // what one student scored on one question
      /* --- Course Evaluation & Feedback Portal --- */
      courseEvaluations: [], // evaluation builders created by faculty
      evaluationResponses: [] // submitted student answers
    };
    var deptId = db.department.id;

    /* --- courses + their curriculum topics (from the syllabus PDF) --- */
    seedCourses.forEach(function (row) {
      var course = {
        id: nextId('crs'),
        code: row.code,
        name: row.name,
        semester: row.semester,
        departmentId: deptId,
        credits: row.credits,
        type: row.type,             // 'theory' | 'sessional'
        optional: !!row.optional,
        facultyIds: [],             // MANY teachers can share one course
        coThreshold: 60,            // a student "attains" a CO at 60% or above
        poThreshold: 60             // and a PO the same way
      };
      db.courses.push(course);
      db.curriculums.push({
        id: nextId('cur'),
        courseId: course.id,
        topics: copy(row.topics || []),
        updatedAt: db.meta.seededAt,
        updatedBy: 'Syllabus import'
      });
    });

    /* --- program outcomes (PO) --- */
    seed.programOutcomes.forEach(function (po) {
      db.programOutcomes.push({
        id: nextId('po'),
        departmentId: deptId,
        code: po.code,
        title: po.title,
        description: po.description
      });
    });

    /* --- users, and the course assignments they carry --- */
    seed.users.forEach(function (user) {
      var record = copy(user);
      var codes = record.courseCodes || [];
      delete record.courseCodes;      // course.facultyIds is the real link

      // A seeded student already has a name and a section typed in, so
      // treat their profile as finished. Rolls created in bulk by the
      // admin start out blank and the student fills them in.
      if (record.role === 'student' && record.profileComplete === undefined) {
        record.profileComplete = !!(record.name && record.section);
      }
      db.users.push(record);

      codes.forEach(function (code) {
        var course = findCourseByCode(code);
        if (!course) return console.warn('Seed: no course with code', code);
        if (course.facultyIds.indexOf(record.id) < 0) course.facultyIds.push(record.id);
      });
    });

    /* --- course outcomes (CO), numbered CO1, CO2, ... ---
       A seed CO may be written either as a plain sentence (the
       description) or as { title, description } when it also has a short
       name. Faculty can edit both from their Course Outcomes page. */
    Object.keys(seed.courseOutcomes || {}).forEach(function (code) {
      var course = findCourseByCode(code);
      if (!course) return console.warn('Seed: no course with code', code);
      seed.courseOutcomes[code].forEach(function (entry, i) {
        var isText = typeof entry === 'string';
        db.courseOutcomes.push({
          id: nextId('co'),
          courseId: course.id,
          code: 'CO' + (i + 1),
          title: isText ? '' : (entry.title || ''),
          description: isText ? entry : (entry.description || '')
        });
      });
    });

    /* --- CO-PO mappings --- */
    Object.keys(seed.coPoMappings || {}).forEach(function (code) {
      var course = findCourseByCode(code);
      if (!course) return;
      var perCo = seed.coPoMappings[code];
      Object.keys(perCo).forEach(function (coCode) {
        var co = db.courseOutcomes.filter(function (c) {
          return c.courseId === course.id && c.code === coCode;
        })[0];
        if (!co) return;
        Object.keys(perCo[coCode]).forEach(function (poCode) {
          var po = db.programOutcomes.filter(function (p) { return p.code === poCode; })[0];
          if (!po) return;
          db.coPoMappings.push({
            id: nextId('map'),
            coId: co.id,
            poId: po.id,
            level: perCo[coCode][poCode]      // 1 low, 2 medium, 3 high
          });
        });
      });
    });

    /* --- notices --- */
    (seed.notices || []).forEach(function (n) {
      var course = n.courseCode ? findCourseByCode(n.courseCode) : null;
      db.notices.push({
        id: nextId('ntc'),
        title: n.title,
        message: n.message,
        level: n.level,                       // department | semester | course
        departmentId: deptId,
        semester: n.semester || null,
        courseId: course ? course.id : null,
        date: n.date,
        author: n.author || ''
      });
    });

    /* --- series semesters (Visit 3) ---
       Every series starts with one "current semester" plan, holding all the
       courses of that term. Admin can add the other semesters from the UI. */
    db.series.forEach(function (srs) {
      var termId = srs.currentSemester;
      if (!termId) return;
      db.seriesSemesters.push({
        id: nextId('sem'),
        seriesId: srs.id,
        number: termNumber(termId),           // 1..8
        termId: termId,                        // '1-1' ... '4-2'
        courseIds: db.courses
          .filter(function (c) { return c.semester === termId; })
          .map(function (c) { return c.id; })
      });
    });

    /* --- assignments (Visit 3) --- */
    (seed.assignments || []).forEach(function (a) {
      var course = findCourseByCode(a.courseCode);
      if (!course) return console.warn('Seed: no course with code', a.courseCode);
      db.assignments.push({
        id: nextId('asg'),
        courseId: course.id,
        title: a.title,
        description: a.description || '',
        dueDate: a.dueDate || null
      });
    });

    /* --- CT marks, final marks, attendance (Visit 3) ---
       All three are keyed by course code + student id in the seed; here we
       turn the code into the real courseId and drop anything that does not
       resolve, so bad seed data warns instead of breaking a page. */
    (seed.ctMarks || []).forEach(function (m) {
      var course = findCourseByCode(m.courseCode);
      if (!course || !findUser(m.studentId)) return;
      db.ctMarks.push({
        id: nextId('ct'), studentId: m.studentId, courseId: course.id,
        testNumber: m.testNumber, marks: m.marks
      });
    });
    (seed.assessMarks || []).forEach(function (m) {
      var course = findCourseByCode(m.courseCode);
      if (!course || !findUser(m.studentId)) return;
      db.assessMarks.push({
        id: nextId('asm'), studentId: m.studentId, courseId: course.id, marks: m.marks
      });
    });
    (seed.finalMarks || []).forEach(function (m) {
      var course = findCourseByCode(m.courseCode);
      if (!course || !findUser(m.studentId)) return;
      db.finalMarks.push({
        id: nextId('fin'), studentId: m.studentId, courseId: course.id, marks: m.marks
      });
    });
    (seed.attendance || []).forEach(function (r) {
      var course = findCourseByCode(r.courseCode);
      if (!course || !findUser(r.studentId)) return;
      db.attendance.push({
        id: nextId('att'), studentId: r.studentId, courseId: course.id,
        date: r.date, status: r.status
      });
    });

    /* --- exam questions + their CO/PO tags (Visit 4) ---
       A question belongs to one "paper": 'ct1'..'ct4', 'finalA' or 'finalB'.
       Each tag says "this many marks of this question test this CO and this
       PO", which is what makes attainment computable. The seed writes CO and
       PO by their codes (CO2, PO9); here they become real ids. */
    (seed.questions || []).forEach(function (q) {
      var course = findCourseByCode(q.courseCode);
      if (!course) return console.warn('Seed: no course with code', q.courseCode);
      db.questions.push({
        id: nextId('qn'),
        courseId: course.id,
        paper: q.paper,
        qNo: q.qNo,
        maxMarks: q.maxMarks,
        tags: (q.tags || []).map(function (t) {
          var co = db.courseOutcomes.filter(function (c) {
            return c.courseId === course.id && c.code === t.coCode;
          })[0];
          var po = db.programOutcomes.filter(function (p) { return p.code === t.poCode; })[0];
          return {
            coId: co ? co.id : null,
            poId: po ? po.id : null,
            marks: t.marks
          };
        })
      });
    });
    (seed.questionMarks || []).forEach(function (m) {
      var course = findCourseByCode(m.courseCode);
      if (!course || !findUser(m.studentId)) return;
      var q = db.questions.filter(function (x) {
        return x.courseId === course.id && x.paper === m.paper && x.qNo === m.qNo;
      })[0];
      if (!q) return;
      db.questionMarks.push({
        id: nextId('qm'), studentId: m.studentId, courseId: course.id,
        questionId: q.id, marks: m.marks
      });
    });

    return db;

    function findCourseByCode(code) {
      return db.courses.filter(function (c) { return c.code === code; })[0];
    }
    function findUser(id) {
      return db.users.filter(function (u) { return u.id === id; })[0];
    }
    /** '1-1' -> 1, '1-2' -> 2, ... '4-2' -> 8 (position in the term list). */
    function termNumber(termId) {
      for (var i = 0; i < db.semesters.length; i += 1) {
        if (db.semesters[i].id === termId) return i + 1;
      }
      return 0;
    }
  }

  /* ---------------- the public API ---------------- */

  var api = {

    /* --- generic collection access --- */

    all: function (name) {
      return copy(load()[name] || []);
    },

    get: function (name, id) {
      var found = (load()[name] || []).filter(function (r) { return r.id === id; })[0];
      return copy(found) || null;
    },

    where: function (name, test) {
      return copy((load()[name] || []).filter(test));
    },

    /** Adds a record. An id is generated unless you supply one. */
    add: function (name, record) {
      load();
      if (!db[name]) db[name] = [];
      var saved = copy(record);
      if (!saved.id) saved.id = nextId(api.prefixFor(name));
      db[name].push(saved);
      save();
      return copy(saved);
    },

    /** Merges the given fields into one record. */
    update: function (name, id, changes) {
      load();
      var record = (db[name] || []).filter(function (r) { return r.id === id; })[0];
      if (!record) return null;
      Object.keys(changes).forEach(function (key) {
        if (key !== 'id') record[key] = changes[key];
      });
      save();
      return copy(record);
    },

    remove: function (name, id) {
      load();
      var before = (db[name] || []).length;
      db[name] = (db[name] || []).filter(function (r) { return r.id !== id; });
      save();
      return db[name].length < before;
    },

    /** id prefix used for each collection */
    prefixFor: function (name) {
      return {
        courses: 'crs', curriculums: 'cur', programOutcomes: 'po',
        courseOutcomes: 'co', coPoMappings: 'map', notices: 'ntc',
        users: 'usr', series: 'srs',
        seriesSemesters: 'sem', assignments: 'asg',
        ctMarks: 'ct', assessMarks: 'asm', finalMarks: 'fin', attendance: 'att',
        questions: 'qn', questionMarks: 'qm',
        courseEvaluations: 'ev', evaluationResponses: 'er'
      }[name] || 'rec';
    },

    /* --- convenience getters used by the pages --- */

    department: function () { return copy(load().department); },

    semesters: function () { return copy(load().semesters); },

    /** '3-1' -> '3rd Year Odd' */
    semesterLabel: function (id) {
      var s = load().semesters.filter(function (x) { return x.id === id; })[0];
      return s ? s.label : (id || '—');
    },

    coursesOfSemester: function (semesterId) {
      return api.where('courses', function (c) { return c.semester === semesterId; });
    },

    /** Every course this teacher is on. A course can have several teachers,
        so we look inside the course's facultyIds list. */
    coursesOfFaculty: function (facultyId) {
      return api.where('courses', function (c) {
        return (c.facultyIds || []).indexOf(facultyId) >= 0;
      });
    },

    /** The teachers assigned to one course, in the order they were added. */
    teachersOfCourse: function (courseId) {
      var course = api.get('courses', courseId);
      if (!course) return [];
      return (course.facultyIds || [])
        .map(function (id) { return api.get('users', id); })
        .filter(Boolean);
    },

    /** Course code + the names of its teachers, e.g. "Fariya Tabassum, Nadim Reza". */
    teacherNames: function (courseId) {
      var names = api.teachersOfCourse(courseId).map(function (u) { return u.name; });
      return names.length ? names.join(', ') : '';
    },

    /** Add a teacher to a course without removing the ones already on it. */
    assignTeacher: function (courseId, facultyId) {
      var course = api.get('courses', courseId);
      if (!course) return null;
      var ids = (course.facultyIds || []).slice();
      if (ids.indexOf(facultyId) < 0) ids.push(facultyId);
      return api.update('courses', courseId, { facultyIds: ids });
    },

    /** Take one teacher off a course, leaving any others in place. */
    unassignTeacher: function (courseId, facultyId) {
      var course = api.get('courses', courseId);
      if (!course) return null;
      return api.update('courses', courseId, {
        facultyIds: (course.facultyIds || []).filter(function (id) { return id !== facultyId; })
      });
    },

    /** Replace the whole teacher list of a course in one go. */
    setTeachers: function (courseId, facultyIds) {
      return api.update('courses', courseId, { facultyIds: (facultyIds || []).slice() });
    },

    /** A student is enrolled in every non-optional course of their semester. */
    coursesOfStudent: function (student) {
      return api.where('courses', function (c) {
        return c.semester === student.semester && !c.optional;
      });
    },

    /** Every course a student should SEE RESULTS for: the courses they are
        taking right now, plus any earlier course that already has a mark or
        an attendance record against their name. Without this, moving a batch
        up a semester would hide the results they have already earned.
        Sorted by semester, then by course code. */
    coursesWithRecords: function (student) {
      var list = api.coursesOfStudent(student);
      var seen = {};
      list.forEach(function (c) { seen[c.id] = true; });

      ['ctMarks', 'assessMarks', 'finalMarks', 'questionMarks', 'attendance']
        .forEach(function (name) {
          api.where(name, function (r) { return r.studentId === student.id; })
            .forEach(function (r) {
              if (seen[r.courseId]) return;
              var course = api.get('courses', r.courseId);
              if (!course) return;
              seen[course.id] = true;
              list.push(course);
            });
        });

      return list.sort(function (a, b) {
        if (a.semester !== b.semester) return a.semester < b.semester ? -1 : 1;
        return a.code < b.code ? -1 : 1;
      });
    },

    courseByCode: function (code) {
      return api.where('courses', function (c) { return c.code === code; })[0] || null;
    },

    /** Course code + name, e.g. "ECE 1103 — Computer Programming". */
    courseTitle: function (courseId) {
      var c = api.get('courses', courseId);
      return c ? c.code + ' — ' + c.name : 'Unknown course';
    },

    curriculumOf: function (courseId) {
      return api.where('curriculums', function (r) { return r.courseId === courseId; })[0] || null;
    },

    /** COs of one course, in CO1, CO2, ... order. */
    outcomesOf: function (courseId) {
      return api.where('courseOutcomes', function (co) { return co.courseId === courseId; })
        .sort(function (a, b) { return numberIn(a.code) - numberIn(b.code); });
    },

    /** POs of the department, in PO1 ... PO12 order. */
    programOutcomesSorted: function () {
      return api.all('programOutcomes')
        .sort(function (a, b) { return numberIn(a.code) - numberIn(b.code); });
    },

    mappingsOfCourse: function (courseId) {
      var coIds = api.outcomesOf(courseId).map(function (co) { return co.id; });
      return api.where('coPoMappings', function (m) { return coIds.indexOf(m.coId) >= 0; });
    },

    /** Teachers of this department (the ECE staff list). */
    facultyList: function () {
      return api.where('users', function (u) {
        return u.role === 'faculty' && !u.external;
      });
    },

    /** Teachers from OTHER departments who teach a course here — e.g. the
        Mathematics or Chemistry teacher who takes a 1st-year course.
        They are the same kind of user, just flagged external and carrying
        the name of their own department. */
    externalFacultyList: function () {
      return api.where('users', function (u) {
        return u.role === 'faculty' && !!u.external;
      });
    },

    /** Both lists together, for anywhere that just needs "all teachers". */
    allFacultyList: function () {
      return api.where('users', function (u) { return u.role === 'faculty'; });
    },

    studentList: function () {
      return api.where('users', function (u) { return u.role === 'student'; });
    },

    /* --- series, students, semesters (Visit 3, admin) --- */

    seriesList: function () {
      return api.all('series').sort(function (a, b) {
        return (a.startYear || 0) - (b.startYear || 0);
      });
    },

    /** Students admitted under one series (batch). */
    studentsOfSeries: function (seriesId) {
      return api.where('users', function (u) {
        return u.role === 'student' && u.seriesId === seriesId;
      }).sort(byRoll);
    },

    /** Every student sitting in a given term, e.g. '1-1'. */
    studentsOfSemester: function (termId) {
      return api.where('users', function (u) {
        return u.role === 'student' && u.semester === termId;
      }).sort(byRoll);
    },

    /** The class list for a course: the students of the course's term, plus
        anyone who already has a mark or an attendance record in it. The
        second half matters once a batch moves up a semester — their old
        course would otherwise lose its whole class list. */
    studentsOfCourse: function (course) {
      if (!course) return [];
      var list = api.studentsOfSemester(course.semester);
      var seen = {};
      list.forEach(function (s) { seen[s.id] = true; });

      ['ctMarks', 'assessMarks', 'finalMarks', 'questionMarks', 'attendance']
        .forEach(function (name) {
          api.where(name, function (r) { return r.courseId === course.id; })
            .forEach(function (r) {
              if (seen[r.studentId]) return;
              var student = api.get('users', r.studentId);
              if (!student || student.role !== 'student') return;
              seen[student.id] = true;
              list.push(student);
            });
        });

      return list.sort(byRoll);
    },

    /** A series' semester plans (its course lists), in semester order. */
    seriesSemestersOf: function (seriesId) {
      return api.where('seriesSemesters', function (s) { return s.seriesId === seriesId; })
        .sort(function (a, b) { return (a.number || 0) - (b.number || 0); });
    },

    /** The courses linked to one series-semester plan. */
    coursesOfSeriesSemester: function (ss) {
      if (!ss || !ss.courseIds) return [];
      return ss.courseIds
        .map(function (id) { return api.get('courses', id); })
        .filter(Boolean)
        .sort(function (a, b) { return a.code < b.code ? -1 : 1; });
    },

    /* --- assignments, marks, attendance (Visit 3, faculty + student) --- */

    assignmentsOf: function (courseId) {
      return api.where('assignments', function (a) { return a.courseId === courseId; })
        .sort(function (a, b) { return (a.dueDate || '') < (b.dueDate || '') ? -1 : 1; });
    },

    /** All CT marks for a course (any student, any test). */
    ctMarksOf: function (courseId) {
      return api.where('ctMarks', function (m) { return m.courseId === courseId; });
    },

    /** One student's CT marks in a course, ordered by test number. */
    ctMarksFor: function (studentId, courseId) {
      return api.where('ctMarks', function (m) {
        return m.studentId === studentId && m.courseId === courseId;
      }).sort(function (a, b) { return a.testNumber - b.testNumber; });
    },

    finalMarkFor: function (studentId, courseId) {
      return api.where('finalMarks', function (m) {
        return m.studentId === studentId && m.courseId === courseId;
      })[0] || null;
    },

    /** All assignment/quiz/presentation marks for a course. */
    assessMarksOf: function (courseId) {
      return api.where('assessMarks', function (m) { return m.courseId === courseId; });
    },

    /** One student's assignment/quiz/presentation mark in a course (out of 10). */
    assessMarkFor: function (studentId, courseId) {
      return api.where('assessMarks', function (m) {
        return m.studentId === studentId && m.courseId === courseId;
      })[0] || null;
    },

    attendanceOf: function (courseId) {
      return api.where('attendance', function (r) { return r.courseId === courseId; });
    },

    attendanceFor: function (studentId, courseId) {
      return api.where('attendance', function (r) {
        return r.studentId === studentId && r.courseId === courseId;
      }).sort(function (a, b) { return (a.date || '') < (b.date || '') ? -1 : 1; });
    },

    /** {present, late, absent, total, pct} for one student in one course. */
    attendanceSummary: function (studentId, courseId) {
      var rows = api.attendanceFor(studentId, courseId);
      var present = rows.filter(function (r) { return r.status === 'present'; }).length;
      var late = rows.filter(function (r) { return r.status === 'late'; }).length;
      var absent = rows.filter(function (r) { return r.status === 'absent'; }).length;
      // A late counts as a half-present day for the percentage.
      var pct = rows.length ? Math.round(((present + late * 0.5) / rows.length) * 100) : 0;
      return { present: present, late: late, absent: absent, total: rows.length, pct: pct };
    },

    /* --- exam questions and their CO/PO tags (Visit 4) ---------------
       This is the part that mirrors the department's Excel workbook.
       A course's assessment is split into six "papers":

         'ct1' 'ct2' 'ct3' 'ct4'   the four class tests (each out of 20)
         'finalA'                  final exam Part A   (out of 30)
         'finalB'                  final exam Part B   (out of 30)

       The teacher lists the questions of a paper, gives each a mark, and
       tags each question with one or more CO + PO pairs and how many of
       the question's marks belong to that pair. Example: question 3 is
       worth 5, with 3 marks tagged CO2/PO9 and 2 marks tagged CO3/PO10.

       Papers are optional. If a teacher has not set up questions for a
       paper, the old single-box mark (ctMarks / finalMarks) is used
       instead, so nothing that already worked stops working.
       ---------------------------------------------------------------- */

    PAPERS: ['ct1', 'ct2', 'ct3', 'ct4', 'finalA', 'finalB'],

    paperLabel: function (paper) {
      return {
        ct1: 'Class Test 1', ct2: 'Class Test 2',
        ct3: 'Class Test 3', ct4: 'Class Test 4',
        finalA: 'Final Exam — Part A', finalB: 'Final Exam — Part B'
      }[paper] || paper;
    },

    /** What a paper is meant to add up to, by the department's scheme. */
    paperOutOf: function (paper) {
      return paper === 'finalA' || paper === 'finalB' ? 30 : 20;
    },

    /** The questions of one paper, in question order. */
    questionsOf: function (courseId, paper) {
      return api.where('questions', function (q) {
        return q.courseId === courseId && q.paper === paper;
      }).sort(function (a, b) { return (a.qNo || 0) - (b.qNo || 0); });
    },

    /** Every question of a course, any paper. */
    questionsOfCourse: function (courseId) {
      return api.where('questions', function (q) { return q.courseId === courseId; });
    },

    /** True once a teacher has set up questions for this paper. */
    paperHasQuestions: function (courseId, paper) {
      return api.questionsOf(courseId, paper).length > 0;
    },

    /** The marks the questions of a paper add up to. */
    paperMax: function (courseId, paper) {
      return api.questionsOf(courseId, paper)
        .reduce(function (sum, q) { return sum + (q.maxMarks || 0); }, 0);
    },

    questionMarkFor: function (studentId, questionId) {
      return api.where('questionMarks', function (m) {
        return m.studentId === studentId && m.questionId === questionId;
      })[0] || null;
    },

    /** What one student scored on one paper, adding up their question marks.
        Returns null when the paper has no questions set up. */
    paperScore: function (studentId, courseId, paper) {
      var questions = api.questionsOf(courseId, paper);
      if (!questions.length) return null;
      var total = 0;
      questions.forEach(function (q) {
        var m = api.questionMarkFor(studentId, q.id);
        if (m && typeof m.marks === 'number') total += m.marks;
      });
      return round1(total);
    },

    /** One student's score in class test n (1..4), out of 20.
        Uses the question marks when the teacher set questions up, and the
        single typed total otherwise. Returns null if neither exists. */
    ctTestScore: function (studentId, courseId, testNumber) {
      var paper = 'ct' + testNumber;
      if (api.paperHasQuestions(courseId, paper)) {
        return api.paperScore(studentId, courseId, paper);
      }
      var row = api.ctMarksFor(studentId, courseId).filter(function (m) {
        return m.testNumber === testNumber;
      })[0];
      return row && typeof row.marks === 'number' ? row.marks : null;
    },

    /** One student's final-exam score, out of 60 (Part A + Part B), falling
        back to the single final mark when no questions are set up. */
    finalScoreOf: function (studentId, courseId) {
      var hasA = api.paperHasQuestions(courseId, 'finalA');
      var hasB = api.paperHasQuestions(courseId, 'finalB');
      if (hasA || hasB) {
        var a = hasA ? (api.paperScore(studentId, courseId, 'finalA') || 0) : 0;
        var b = hasB ? (api.paperScore(studentId, courseId, 'finalB') || 0) : 0;
        return round1(a + b);
      }
      var fin = api.finalMarkFor(studentId, courseId);
      return fin && typeof fin.marks === 'number' ? fin.marks : null;
    },

    /** Combined result for one student in one course. The mark split is:
          class tests   : best 3 of 4 (each out of 20), averaged  -> out of 20
          attendance    : the attendance percentage / 10           -> out of 10
          assign/quiz/pres: one mark entered by the teacher         -> out of 10
          final exam    : Part A + Part B                          -> out of 60
        Total is out of 100. Any component with nothing entered counts as 0,
        and `total` is null only when nothing at all has been entered yet. */
    courseResult: function (studentId, courseId) {
      var CT_KEEP = 3;   // keep the best 3 of the (up to) 4 class tests

      // --- class tests: best 3, each /20, averaged -> /20 ---
      var scores = [];
      [1, 2, 3, 4].forEach(function (n) {
        var s = api.ctTestScore(studentId, courseId, n);
        if (s !== null) scores.push({ testNumber: n, marks: s });
      });
      var best = scores.slice()
        .sort(function (a, b) { return b.marks - a.marks; })
        .slice(0, CT_KEEP);
      var ctScore = best.length
        ? round1(best.reduce(function (s, m) { return s + m.marks; }, 0) / best.length)
        : null;
      // Which class tests counted, as test numbers: e.g. [1, 2, 4]
      var ctCounted = best.map(function (m) { return m.testNumber; }).sort();

      // --- attendance: percentage / 10 -> /10 ---
      var att = api.attendanceSummary(studentId, courseId);
      var attScore = att.total ? round1(att.pct / 10) : null;

      // --- assignment / quiz / presentation: /10 ---
      var asm = api.assessMarkFor(studentId, courseId);
      var assessScore = asm && typeof asm.marks === 'number' ? asm.marks : null;

      // --- final exam: /60 ---
      var finalScore = api.finalScoreOf(studentId, courseId);

      var hasAny = ctScore !== null || attScore !== null ||
                   assessScore !== null || finalScore !== null;
      var total = hasAny
        ? round1((ctScore || 0) + (attScore || 0) + (assessScore || 0) + (finalScore || 0))
        : null;

      return {
        ctCount: scores.length,
        ctScores: scores,         // [{testNumber, marks}] for the tests that exist
        ctScore: ctScore,         // out of 20 (best 3 of 4, averaged)
        ctCounted: ctCounted,     // test numbers that counted, e.g. [1,2,4]
        attPct: att.pct,          // 0..100
        attScore: attScore,       // out of 10
        assessScore: assessScore, // out of 10
        finalScore: finalScore,   // out of 60
        total: total,             // out of 100
        grade: api.gradeOf(total),
        hasAny: hasAny
      };
    },

    /** The letter grade for a total out of 100 (the usual RUET scale). */
    gradeOf: function (total) {
      if (total === null || total === undefined) return '—';
      if (total >= 80) return 'A+';
      if (total >= 75) return 'A';
      if (total >= 70) return 'A-';
      if (total >= 65) return 'B+';
      if (total >= 60) return 'B';
      if (total >= 55) return 'B-';
      if (total >= 50) return 'C+';
      if (total >= 45) return 'C';
      if (total >= 40) return 'D';
      return 'F';
    },

    /** CO and PO attainment for a whole course — the report the workbook's
        FINAL_SHEET produces, and the reason questions carry CO/PO tags.

        For every question a student answered we work out what share of the
        question they got, and give that share of each tag's marks to the
        tag's CO and PO. A student attains a CO when their percentage on it
        reaches the course's CO threshold; the class attains it when enough
        students do.

        Returns:
          { coThreshold, poThreshold,
            students: [ { student, co: {coId: cell}, po: {poId: cell} } ],
            co: [ { outcome, pct, attained, counted, met } ],
            po: [ { outcome, pct, attained, counted, met } ] }
        where a cell is { got, max, pct, attained }. */
    attainmentOf: function (courseId) {
      var course = api.get('courses', courseId);
      if (!course) return null;

      var coThreshold = typeof course.coThreshold === 'number' ? course.coThreshold : 60;
      var poThreshold = typeof course.poThreshold === 'number' ? course.poThreshold : 60;

      var questions = api.questionsOfCourse(courseId);
      var students = api.studentsOfCourse(course);
      var outcomes = api.outcomesOf(courseId);
      var programOutcomes = api.programOutcomesSorted();

      var rows = students.map(function (student) {
        var co = {}, po = {};
        questions.forEach(function (q) {
          var mark = api.questionMarkFor(student.id, q.id);
          var scored = mark && typeof mark.marks === 'number' ? mark.marks : 0;
          // What fraction of this question the student got right.
          var share = q.maxMarks > 0 ? scored / q.maxMarks : 0;
          (q.tags || []).forEach(function (tag) {
            var tagMarks = tag.marks || 0;
            if (tag.coId) addTo(co, tag.coId, share * tagMarks, tagMarks);
            if (tag.poId) addTo(po, tag.poId, share * tagMarks, tagMarks);
          });
        });
        return {
          student: student,
          co: finishCells(co, coThreshold),
          po: finishCells(po, poThreshold)
        };
      });

      return {
        coThreshold: coThreshold,
        poThreshold: poThreshold,
        students: rows,
        co: classLevel(outcomes, 'co', coThreshold),
        po: classLevel(programOutcomes, 'po', poThreshold)
      };

      function addTo(bag, key, got, max) {
        if (!bag[key]) bag[key] = { got: 0, max: 0 };
        bag[key].got += got;
        bag[key].max += max;
      }
      function finishCells(bag, threshold) {
        Object.keys(bag).forEach(function (key) {
          var cell = bag[key];
          cell.got = round1(cell.got);
          cell.pct = cell.max > 0 ? Math.round((cell.got / cell.max) * 100) : 0;
          cell.attained = cell.max > 0 && cell.pct >= threshold;
        });
        return bag;
      }
      /** How much of the class attained each outcome. */
      function classLevel(list, which, threshold) {
        return list.map(function (outcome) {
          var counted = 0, attained = 0;
          rows.forEach(function (row) {
            var cell = row[which][outcome.id];
            if (!cell || !cell.max) return;      // this outcome was not examined
            counted += 1;
            if (cell.attained) attained += 1;
          });
          var pct = counted ? Math.round((attained / counted) * 100) : 0;
          return {
            outcome: outcome,
            counted: counted,                    // students who were examined on it
            attained: attained,                  // students who reached the threshold
            pct: pct,                            // percentage of the class
            met: counted > 0 && pct >= threshold // did the class attain it?
          };
        }).filter(function (r) { return r.counted > 0; });
      }
    },


    /** The next free CO code for a course: CO1, CO2, ... */
    nextOutcomeCode: function (courseId) {
      var used = api.outcomesOf(courseId).map(function (co) { return numberIn(co.code); });
      var n = 1;
      while (used.indexOf(n) >= 0) n += 1;
      return 'CO' + n;
    },

    nextProgramOutcomeCode: function () {
      var used = api.all('programOutcomes').map(function (po) { return numberIn(po.code); });
      var n = 1;
      while (used.indexOf(n) >= 0) n += 1;
      return 'PO' + n;
    },

    /** Numbers for the admin dashboard cards. */
    stats: function () {
      var d = load();
      return {
        faculty: d.users.filter(function (u) { return u.role === 'faculty' && !u.external; }).length,
        externalFaculty: d.users.filter(function (u) { return u.role === 'faculty' && !!u.external; }).length,
        students: d.users.filter(function (u) { return u.role === 'student'; }).length,
        pendingProfiles: d.users.filter(function (u) {
          return u.role === 'student' && !u.profileComplete;
        }).length,
        courses: d.courses.length,
        assignedCourses: d.courses.filter(function (c) { return (c.facultyIds || []).length > 0; }).length,
        programOutcomes: d.programOutcomes.length,
        courseOutcomes: d.courseOutcomes.length,
        coursesWithOutcomes: unique(d.courseOutcomes.map(function (co) { return co.courseId; })).length,
        mappings: d.coPoMappings.length,
        notices: d.notices.length,
        series: d.series.length,
        credits: round2(d.courses.reduce(function (sum, c) { return sum + (c.credits || 0); }, 0))
      };
    },

    /* --- deleting: the "what else goes with it" rules ---
       These live here rather than in the pages so that there is exactly
       one place that decides what a delete takes with it. Child records
       are always removed first, so nothing is ever left pointing at a
       parent that has already gone. */

    /** Everything that would disappear together with this course. */
    dependentsOfCourse: function (courseId) {
      return {
        outcomes: api.outcomesOf(courseId),
        mappings: api.mappingsOfCourse(courseId),
        notices: api.where('notices', function (n) { return n.courseId === courseId; }),
        curriculum: api.curriculumOf(courseId),
        assignments: api.where('assignments', function (a) { return a.courseId === courseId; }),
        ctMarks: api.where('ctMarks', function (m) { return m.courseId === courseId; }),
        assessMarks: api.where('assessMarks', function (m) { return m.courseId === courseId; }),
        finalMarks: api.where('finalMarks', function (m) { return m.courseId === courseId; }),
        attendance: api.where('attendance', function (r) { return r.courseId === courseId; }),
        questions: api.where('questions', function (q) { return q.courseId === courseId; }),
        questionMarks: api.where('questionMarks', function (m) { return m.courseId === courseId; })
      };
    },

    /** Deletes a course with its mappings, COs, notices, curriculum and the
        Visit 3 records that hang off it (assignments, marks, attendance). */
    removeCourseDeep: function (courseId) {
      var dep = api.dependentsOfCourse(courseId);
      dep.mappings.forEach(function (m) { api.remove('coPoMappings', m.id); });
      dep.outcomes.forEach(function (co) { api.remove('courseOutcomes', co.id); });
      dep.notices.forEach(function (n) { api.remove('notices', n.id); });
      if (dep.curriculum) api.remove('curriculums', dep.curriculum.id);
      dep.assignments.forEach(function (a) { api.remove('assignments', a.id); });
      dep.ctMarks.forEach(function (m) { api.remove('ctMarks', m.id); });
      dep.assessMarks.forEach(function (m) { api.remove('assessMarks', m.id); });
      dep.finalMarks.forEach(function (m) { api.remove('finalMarks', m.id); });
      dep.attendance.forEach(function (r) { api.remove('attendance', r.id); });
      dep.questionMarks.forEach(function (m) { api.remove('questionMarks', m.id); });
      dep.questions.forEach(function (q) { api.remove('questions', q.id); });
      // Also drop this course from any series-semester course plan.
      api.where('seriesSemesters', function (s) {
        return (s.courseIds || []).indexOf(courseId) >= 0;
      }).forEach(function (s) {
        api.update('seriesSemesters', s.id, {
          courseIds: s.courseIds.filter(function (id) { return id !== courseId; })
        });
      });
      var gone = api.remove('courses', courseId);
      return {
        removed: gone,
        outcomes: dep.outcomes.length,
        mappings: dep.mappings.length,
        notices: dep.notices.length,
        assignments: dep.assignments.length,
        marks: dep.ctMarks.length + dep.assessMarks.length + dep.finalMarks.length,
        attendance: dep.attendance.length
      };
    },

    /** Deletes one CO together with the PO mappings that used it. */
    removeOutcomeDeep: function (coId) {
      var mappings = api.where('coPoMappings', function (m) { return m.coId === coId; });
      mappings.forEach(function (m) { api.remove('coPoMappings', m.id); });
      return { removed: api.remove('courseOutcomes', coId), mappings: mappings.length };
    },

    /** Deletes one PO together with every CO mapping that pointed at it. */
    removeProgramOutcomeDeep: function (poId) {
      var mappings = api.where('coPoMappings', function (m) { return m.poId === poId; });
      mappings.forEach(function (m) { api.remove('coPoMappings', m.id); });
      return { removed: api.remove('programOutcomes', poId), mappings: mappings.length };
    },

    /** Everything that would disappear together with one student. */
    dependentsOfStudent: function (studentId) {
      return {
        ctMarks: api.where('ctMarks', function (m) { return m.studentId === studentId; }),
        assessMarks: api.where('assessMarks', function (m) { return m.studentId === studentId; }),
        finalMarks: api.where('finalMarks', function (m) { return m.studentId === studentId; }),
        attendance: api.where('attendance', function (r) { return r.studentId === studentId; }),
        questionMarks: api.where('questionMarks', function (m) { return m.studentId === studentId; })
      };
    },

    /** Deletes a student together with their marks and attendance rows. */
    removeStudentDeep: function (studentId) {
      var dep = api.dependentsOfStudent(studentId);
      dep.ctMarks.forEach(function (m) { api.remove('ctMarks', m.id); });
      dep.assessMarks.forEach(function (m) { api.remove('assessMarks', m.id); });
      dep.finalMarks.forEach(function (m) { api.remove('finalMarks', m.id); });
      dep.attendance.forEach(function (r) { api.remove('attendance', r.id); });
      dep.questionMarks.forEach(function (m) { api.remove('questionMarks', m.id); });
      return {
        removed: api.remove('users', studentId),
        marks: dep.ctMarks.length + dep.assessMarks.length +
               dep.finalMarks.length + dep.questionMarks.length,
        attendance: dep.attendance.length
      };
    },

    /** Deletes one exam question together with the marks given for it. */
    removeQuestionDeep: function (questionId) {
      var marks = api.where('questionMarks', function (m) { return m.questionId === questionId; });
      marks.forEach(function (m) { api.remove('questionMarks', m.id); });
      return { removed: api.remove('questions', questionId), marks: marks.length };
    },

    /** Deletes a teacher: takes them off every course they were on, but
        leaves the courses (and any co-teacher) alone. */
    removeFacultyDeep: function (facultyId) {
      var courses = api.coursesOfFaculty(facultyId);
      courses.forEach(function (c) { api.unassignTeacher(c.id, facultyId); });
      return { removed: api.remove('users', facultyId), courses: courses.length };
    },

    /** Deletes a series with its semester plans and all of its students
        (each student going through removeStudentDeep, so their marks and
        attendance go too). */
    removeSeriesDeep: function (seriesId) {
      var students = api.studentsOfSeries(seriesId);
      students.forEach(function (s) { api.removeStudentDeep(s.id); });
      var plans = api.where('seriesSemesters', function (s) { return s.seriesId === seriesId; });
      plans.forEach(function (p) { api.remove('seriesSemesters', p.id); });
      return {
        removed: api.remove('series', seriesId),
        students: students.length,
        semesters: plans.length
      };
    },

    /** Deletes one series-semester plan (just the plan row; the courses and
        students it referenced are left untouched). */
    removeSemesterDeep: function (ssId) {
      return { removed: api.remove('seriesSemesters', ssId) };
    },

    /* --- enrolment and account (self-service) --- */

    /** Create student logins for a whole roll range in one go.

        The admin does NOT type each student's details. They generate the
        rolls for a batch (say 2410001 to 2410060) and each student then
        fills in their own name, section and contact on their profile page
        the first time they log in.

        Every generated student gets:
          roll     the number, keeping the width of the "from" roll
          email    <roll>@student.ruet.ac.bd   (their login id)
          password 'student123'                (the same default for all)
          profileComplete: false               (until they fill it in)

        Rolls that already exist are skipped, so running it twice is safe.
        Returns { ok, created, skipped, error }. */
    generateRolls: function (opts) {
      load();
      opts = opts || {};
      var fromRoll = String(opts.fromRoll || '').trim();
      var toRoll = String(opts.toRoll || '').trim();

      if (!/^\d+$/.test(fromRoll) || !/^\d+$/.test(toRoll)) {
        return { ok: false, error: 'Both rolls must be numbers, e.g. 2410001 and 2410060.' };
      }
      var start = parseInt(fromRoll, 10);
      var end = parseInt(toRoll, 10);
      if (end < start) return { ok: false, error: 'The last roll must not be smaller than the first.' };
      if (end - start + 1 > 300) {
        return { ok: false, error: 'That is more than 300 rolls at once. Split it into smaller ranges.' };
      }
      if (!opts.seriesId) return { ok: false, error: 'Choose the series these students belong to.' };

      var width = fromRoll.length;
      var created = 0, skipped = 0;

      for (var n = start; n <= end; n += 1) {
        var roll = padRoll(String(n), width);
        var taken = db.users.filter(function (u) {
          return u.role === 'student' && String(u.roll) === roll;
        })[0];
        if (taken) { skipped += 1; continue; }
        api.add('users', {
          role: 'student',
          departmentId: db.department.id,
          name: '',                       // the student fills this in
          email: roll + '@student.ruet.ac.bd',
          password: 'student123',
          roll: roll,
          seriesId: opts.seriesId,
          semester: opts.semester || '1-1',
          section: '',                    // the student fills this in
          contact: '',
          profileComplete: false
        });
        created += 1;
      }
      return { ok: true, created: created, skipped: skipped };
    },

    /** A student filling in their own details for the first time (or
        correcting them later). Only the fields a student owns. */
    saveProfile: function (userId, info) {
      load();
      var user = (db.users || []).filter(function (u) { return u.id === userId; })[0];
      if (!user) return { ok: false, error: 'Your account could not be found.' };

      var name = String((info && info.name) || '').trim();
      var section = String((info && info.section) || '').trim().toUpperCase();
      if (!name) return { ok: false, error: 'Your full name is required.' };
      if (!section) return { ok: false, error: 'Your section is required.' };

      user.name = name;
      user.section = section;
      user.contact = String((info && info.contact) || '').trim();
      user.profileComplete = true;
      save();
      return { ok: true };
    },

    /** Students of a series who have not filled in their details yet. */
    pendingProfiles: function (seriesId) {
      return api.studentsOfSeries(seriesId).filter(function (s) {
        return !s.profileComplete;
      });
    },

    /** Change one user's own password after checking the current one.
        Returns { ok:true } or { ok:false, error:'...' }.
        This is a self-service action (a student changing their own
        password), not an admin edit, so it lives here as its own small
        method — that also lets the read-only student pages call it without
        ever touching the generic add/update/remove writers. */
    setPassword: function (userId, currentPassword, newPassword) {
      load();
      var user = (db.users || []).filter(function (u) { return u.id === userId; })[0];
      if (!user) return { ok: false, error: 'Your account could not be found.' };
      if (String(user.password) !== String(currentPassword)) {
        return { ok: false, error: 'Your current password is not correct.' };
      }
      newPassword = String(newPassword || '');
      if (newPassword.length < 4) {
        return { ok: false, error: 'The new password must be at least 4 characters.' };
      }
      user.password = newPassword;
      save();
      return { ok: true };
    },

    /* --- course evaluation & feedback --- */

    evaluationsOfFaculty: function (facultyId) {
      return api.where('courseEvaluations', function (e) {
        return e.creatorFacultyId === facultyId;
      }).sort(function (a, b) { return (b.createdAt || '').localeCompare(a.createdAt || ''); });
    },

    createEvaluation: function (facultyId, input) {
      load();
      var faculty = api.get('users', facultyId);
      var course = api.get('courses', input && input.courseId);
      if (!faculty || faculty.role !== 'faculty') return { ok: false, error: 'Faculty authorization required.' };
      if (!course || (course.facultyIds || []).indexOf(facultyId) < 0) {
        return { ok: false, error: 'You can only evaluate a course assigned to you.' };
      }
      var title = String(input.title || '').trim();
      if (!title) return { ok: false, error: 'Evaluation title is required.' };
      var sections = (input.sections || []).map(function (section, si) {
        var questions = (section.questions || []).map(function (q, qi) {
          var type = ['rating', 'mcq', 'checkbox', 'written'].indexOf(q.type) >= 0 ? q.type : 'written';
          var options = (q.options || []).map(function (o) { return String(o).trim(); }).filter(Boolean);
          if ((type === 'mcq' || type === 'checkbox') && options.length < 2) {
            return null;
          }
          return {
            id: 'q-' + (si + 1) + '-' + (qi + 1),
            text: String(q.text || '').trim(),
            type: type,
            options: type === 'rating' ? ['Poor', 'Fair', 'Satisfactory', 'Very good', 'Excellent'] : options,
            required: q.required !== false
          };
        }).filter(function (q) { return q && !!q.text; });
        return { id: 'sec-' + (si + 1), title: String(section.title || '').trim(), questions: questions };
      }).filter(function (s) { return s.title && s.questions.length; });
      if (!sections.length) return { ok: false, error: 'Add at least one section and question.' };
      var record = api.add('courseEvaluations', {
        courseId: course.id,
        creatorFacultyId: facultyId,
        title: title,
        description: String(input.description || '').trim(),
        deadline: input.deadline ? String(input.deadline).slice(0, 10) : null,
        anonymous: input.anonymous !== false,
        status: 'draft',
        sections: sections,
        createdAt: new Date().toISOString(),
        publishedAt: null
      });
      return { ok: true, evaluation: record };
    },

    publishEvaluation: function (facultyId, evaluationId) {
      var evaluation = api.get('courseEvaluations', evaluationId);
      if (!evaluation) return { ok: false, error: 'Evaluation not found.' };
      if (evaluation.creatorFacultyId !== facultyId) return { ok: false, error: 'Only the creator teacher can publish this evaluation.' };
      var updated = api.update('courseEvaluations', evaluationId, {
        status: 'published',
        publishedAt: new Date().toISOString()
      });
      return { ok: true, evaluation: updated };
    },

    evaluationsForStudent: function (studentId) {
      var student = api.get('users', studentId);
      if (!student || student.role !== 'student') return [];
      return api.where('courseEvaluations', function (evaluation) {
        if (evaluation.status !== 'published') return false;
        var course = api.get('courses', evaluation.courseId);
        if (!course || course.semester !== student.semester || course.optional) return false;
        var deadline = evaluation.deadline ? new Date(evaluation.deadline + 'T23:59:59').getTime() : null;
        if (deadline !== null && Date.now() > deadline) return false;
        return true;
      }).map(function (evaluation) {
        var submitted = api.where('evaluationResponses', function (r) {
          return r.evaluationId === evaluation.id && r.studentId === studentId;
        }).length > 0;
        return copy({ evaluation: evaluation, submitted: submitted });
      });
    },

    submitEvaluation: function (studentId, evaluationId, answers, now) {
      var student = api.get('users', studentId);
      var evaluation = api.get('courseEvaluations', evaluationId);
      if (!student || student.role !== 'student') return { ok: false, error: 'Student authorization required.' };
      if (!evaluation || evaluation.status !== 'published') return { ok: false, error: 'Evaluation is not available.' };
      var course = api.get('courses', evaluation.courseId);
      if (!course || course.semester !== student.semester || course.optional) {
        return { ok: false, error: 'You are not eligible for this evaluation.' };
      }
      if (evaluation.deadline) {
        var deadline = new Date(evaluation.deadline + 'T23:59:59').getTime();
        var current = now ? new Date(now).getTime() : Date.now();
        if (current > deadline) return { ok: false, error: 'The submission deadline has passed.' };
      }
      var duplicate = api.where('evaluationResponses', function (r) {
        return r.evaluationId === evaluationId && r.studentId === studentId;
      }).length;
      if (duplicate) return { ok: false, error: 'You have already submitted this evaluation.' };

      var cleanAnswers = [];
      var questions = [];
      (evaluation.sections || []).forEach(function (section) { questions = questions.concat(section.questions || []); });
      for (var i = 0; i < questions.length; i += 1) {
        var question = questions[i];
        var answer = (answers && answers[question.id]);
        if (question.required) {
          var empty = answer === undefined || answer === null || answer === '' ||
            (Array.isArray(answer) && !answer.length);
          if (empty) return { ok: false, error: 'Please answer: ' + question.text };
        }
        if (question.type === 'rating') {
          var rating = Number(answer);
          if (answer !== undefined && answer !== '' && (rating < 1 || rating > 5)) {
            return { ok: false, error: 'Ratings must be from 1 to 5.' };
          }
          answer = rating || null;
        } else if (question.type === 'written') {
          answer = String(answer || '').trim().slice(0, 5000);
        } else if (Array.isArray(answer)) {
          answer = answer.filter(function (v) { return question.options.indexOf(String(v)) >= 0; }).map(String);
        } else if (answer !== undefined && answer !== null) {
          answer = String(answer);
          if (question.options.indexOf(answer) < 0) return { ok: false, error: 'Invalid option selected.' };
        }
        cleanAnswers.push({ questionId: question.id, value: answer });
      }
      var response = api.add('evaluationResponses', {
        evaluationId: evaluationId,
        studentId: studentId,
        submittedAt: now ? new Date(now).toISOString() : new Date().toISOString(),
        answers: cleanAnswers
      });
      return { ok: true, response: response };
    },

    evaluationAnalytics: function (facultyId, evaluationId) {
      var evaluation = api.get('courseEvaluations', evaluationId);
      if (!evaluation) return { ok: false, error: 'Evaluation not found.' };
      if (evaluation.creatorFacultyId !== facultyId) return { ok: false, error: 'Only the creator teacher can view this analysis.' };
      var responses = api.where('evaluationResponses', function (r) { return r.evaluationId === evaluationId; });
      var questionStats = [];
      (evaluation.sections || []).forEach(function (section) {
        (section.questions || []).forEach(function (question) {
          var values = responses.map(function (response) {
            var answer = response.answers.filter(function (a) { return a.questionId === question.id; })[0];
            return answer ? answer.value : null;
          }).filter(function (value) { return value !== null && value !== undefined && value !== ''; });
          var stat = { questionId: question.id, section: section.title, text: question.text, type: question.type, responseCount: values.length };
          if (question.type === 'rating') {
            var sum = 0;
            var distribution = [0, 0, 0, 0, 0];
            values.forEach(function (value) { var n = Number(value); if (n >= 1 && n <= 5) { sum += n; distribution[n - 1] += 1; } });
            stat.average = values.length ? Math.round((sum / values.length) * 100) / 100 : null;
            stat.distribution = distribution;
            stat.percentages = distribution.map(function (n) { return values.length ? Math.round(n * 1000 / values.length) / 10 : 0; });
          } else if (question.type === 'mcq') {
            stat.counts = question.options.map(function (option) {
              var count = values.filter(function (value) { return value === option; }).length;
              return { option: option, count: count, percentage: values.length ? Math.round(count * 1000 / values.length) / 10 : 0 };
            });
          } else if (question.type === 'checkbox') {
            stat.counts = question.options.map(function (option) {
              var count = values.filter(function (value) { return Array.isArray(value) && value.indexOf(option) >= 0; }).length;
              return { option: option, count: count, percentage: values.length ? Math.round(count * 1000 / values.length) / 10 : 0 };
            });
          } else {
            stat.writtenAnswers = values.map(function (value) { return String(value); });
            stat.suggestions = stat.writtenAnswers.slice(0, 20);
            stat.improvementAreas = stat.writtenAnswers.filter(function (value) {
              return /improv|better|suggest|need|should|problem|difficulty/i.test(value);
            }).slice(0, 20);
          }
          questionStats.push(stat);
        });
      });
      return { ok: true, evaluation: evaluation, responseCount: responses.length, questionStats: questionStats };
    },

    evaluationIndividualReports: function (facultyId, evaluationId) {
      var evaluation = api.get('courseEvaluations', evaluationId);
      if (!evaluation) return { ok: false, error: 'Evaluation not found.' };
      if (evaluation.creatorFacultyId !== facultyId) return { ok: false, error: 'Only the creator teacher can view individual reports.' };
      var reports = api.where('evaluationResponses', function (r) { return r.evaluationId === evaluationId; }).map(function (response) {
        var student = api.get('users', response.studentId);
        return {
          studentId: evaluation.anonymous ? null : response.studentId,
          studentName: evaluation.anonymous ? 'Anonymous student' : (student ? (student.name || student.roll || 'Student') : 'Student'),
          roll: evaluation.anonymous ? '' : (student ? (student.roll || '') : ''),
          submittedAt: response.submittedAt,
          answers: copy(response.answers)
        };
      });
      return { ok: true, anonymous: evaluation.anonymous, reports: reports };
    },

    /* --- housekeeping --- */

    /** Throw away every change and load the seed data again. */
    reset: function () {
      db = null;
      try { localStorage.removeItem(STORAGE_KEY); } catch (err) { /* ignore */ }
      load();
      return true;
    },

    /** Start the app from zero, like a fresh install.
        KEEPS the fixed foundation that any deployment ships with:
          the department, the eight fixed semesters, the 122 syllabus
          courses and their topic lists, the twelve program outcomes,
          and the admin (department-head) login so the app is still usable.
        CLEARS everything a real department fills in over time:
          all other users (faculty + students), series and their semester
          plans, course outcomes, CO-PO mappings, notices, assignments, and
          every mark and attendance row. Course→teacher links are cleared too. */
    startFresh: function () {
      buildSeed();                       // rebuild the full seed into `db`
      db.users = db.users.filter(function (u) { return u.role === 'admin'; });
      db.courses.forEach(function (c) { c.facultyIds = []; });
      db.series = [];
      db.seriesSemesters = [];
      db.courseOutcomes = [];
      db.coPoMappings = [];
      db.notices = [];
      db.assignments = [];
      db.ctMarks = [];
      db.assessMarks = [];
      db.finalMarks = [];
      db.attendance = [];
      db.questions = [];
      db.questionMarks = [];
      db.courseEvaluations = [];
      db.evaluationResponses = [];
      db.meta.startedFreshAt = new Date().toISOString();
      save();
      return true;
    },

    /** Handy in the console: Store.raw() shows the whole database. */
    raw: function () { return copy(load()); },

    storageKey: STORAGE_KEY
  };

  /* ---------------- tiny helpers ---------------- */

  function numberIn(code) {
    var m = /(\d+)/.exec(code || '');
    return m ? parseInt(m[1], 10) : 0;
  }
  function unique(list) {
    return list.filter(function (v, i) { return list.indexOf(v) === i; });
  }
  function round2(n) { return Math.round(n * 100) / 100; }
  function round1(n) { return Math.round(n * 10) / 10; }
  /* "7" with width 7 -> "0000007". Keeps generated rolls the same length
     as the roll the admin typed. */
  function padRoll(text, width) {
    while (text.length < width) text = '0' + text;
    return text;
  }
  /* Sort students by roll number (a plain string compare is fine, the
     rolls are the same length e.g. "2410001"). Falls back to name. */
  function byRoll(a, b) {
    var ra = a.roll || '', rb = b.roll || '';
    if (ra !== rb) return ra < rb ? -1 : 1;
    return (a.name || '') < (b.name || '') ? -1 : 1;
  }

  return api;
})();
