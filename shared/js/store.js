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

  var STORAGE_KEY = 'obe.data.v2';   // bump this whenever seed-data changes,
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
      notices: []
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
        facultyId: null             // filled in below from the seed users
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
      delete record.courseCodes;      // Course.facultyId is the real link
      db.users.push(record);

      codes.forEach(function (code) {
        var course = findCourseByCode(code);
        if (course) course.facultyId = record.id;
        else console.warn('Seed: no course with code', code);
      });
    });

    /* --- course outcomes (CO), numbered CO1, CO2, ... --- */
    Object.keys(seed.courseOutcomes || {}).forEach(function (code) {
      var course = findCourseByCode(code);
      if (!course) return console.warn('Seed: no course with code', code);
      seed.courseOutcomes[code].forEach(function (text, i) {
        db.courseOutcomes.push({
          id: nextId('co'),
          courseId: course.id,
          code: 'CO' + (i + 1),
          description: text
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

    return db;

    function findCourseByCode(code) {
      return db.courses.filter(function (c) { return c.code === code; })[0];
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
        users: 'usr', series: 'srs'
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

    coursesOfFaculty: function (facultyId) {
      return api.where('courses', function (c) { return c.facultyId === facultyId; });
    },

    /** A student is enrolled in every non-optional course of their semester. */
    coursesOfStudent: function (student) {
      return api.where('courses', function (c) {
        return c.semester === student.semester && !c.optional;
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

    facultyList: function () {
      return api.where('users', function (u) { return u.role === 'faculty'; });
    },

    studentList: function () {
      return api.where('users', function (u) { return u.role === 'student'; });
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
        faculty: d.users.filter(function (u) { return u.role === 'faculty'; }).length,
        students: d.users.filter(function (u) { return u.role === 'student'; }).length,
        courses: d.courses.length,
        assignedCourses: d.courses.filter(function (c) { return !!c.facultyId; }).length,
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
        curriculum: api.curriculumOf(courseId)
      };
    },

    /** Deletes a course with its mappings, COs, notices and curriculum. */
    removeCourseDeep: function (courseId) {
      var dep = api.dependentsOfCourse(courseId);
      dep.mappings.forEach(function (m) { api.remove('coPoMappings', m.id); });
      dep.outcomes.forEach(function (co) { api.remove('courseOutcomes', co.id); });
      dep.notices.forEach(function (n) { api.remove('notices', n.id); });
      if (dep.curriculum) api.remove('curriculums', dep.curriculum.id);
      var gone = api.remove('courses', courseId);
      return {
        removed: gone,
        outcomes: dep.outcomes.length,
        mappings: dep.mappings.length,
        notices: dep.notices.length
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

    /* --- housekeeping --- */

    /** Throw away every change and load the seed data again. */
    reset: function () {
      db = null;
      try { localStorage.removeItem(STORAGE_KEY); } catch (err) { /* ignore */ }
      load();
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

  return api;
})();
