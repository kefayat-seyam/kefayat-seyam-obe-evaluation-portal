/* ==================================================================
   run-tests.js — checks the app without opening a browser
   ------------------------------------------------------------------
   Run from the project root:

       node "Additional Files/tests/run-tests.js"

   It does three kinds of checking:

     A. DATA      the seeded database matches the printed syllabus
     B. BEHAVIOUR add / update / delete and login really work
     C. PAGES     every page's own script runs without throwing, and
                  every file it links to actually exists

   If you change the syllabus or the seed data, the expected numbers in
   section A are the ones to update.
   ================================================================== */

'use strict';

const fs = require('fs');
const path = require('path');
const H = require('./harness');
const { ROOT, makeEnv, makeStorage, readPage, captureModals,
        check, group, summary } = H;

/* "Semester-wise Distribution of Credits", syllabus page 28:
     semester -> [theory courses, theory credits,
                  sessional courses, sessional credits,
                  total credits, elective slots]

   In 4th year the student picks two optional theory courses and their two
   sessionals, so those four slots are counted on top of the compulsory
   courses (each slot = one 3.00 theory + one 0.75 sessional). */
const OFFICIAL = {
  '1-1': [5, 15.00, 5, 5.25, 20.25, 0],
  '1-2': [5, 15.00, 4, 3.75, 18.75, 0],
  '2-1': [5, 15.00, 5, 4.50, 19.50, 0],
  '2-2': [5, 15.00, 4, 5.25, 20.25, 0],
  '3-1': [5, 15.00, 5, 4.50, 19.50, 0],
  '3-2': [5, 15.00, 5, 4.50, 19.50, 0],
  '4-1': [5, 15.00, 7, 5.50, 20.50, 2],
  '4-2': [5, 15.00, 5, 6.75, 21.75, 2]
};
const OFFICIAL_TOTAL = 160.00;   // printed in the same table

const EXPECTED_COURSES = 122;
const EXPECTED_POS = 12;

/* ================================================================
   A. DATA — is the seeded database right?
   ================================================================ */

group('A. Seed data');

const env = makeEnv();
let loadError = null;
try {
  env.loadShared();
} catch (err) {
  loadError = err;
}
check('shared/js files all load without throwing', !loadError,
  loadError ? loadError.message : '');

if (loadError) {
  process.exit(summary());
}

const Store = env.sandbox.Store;
const Auth = env.sandbox.Auth;
const UI = env.sandbox.UI;
const Shell = env.sandbox.Shell;

const stats = Store.stats();

check(`${EXPECTED_COURSES} courses seeded`, stats.courses === EXPECTED_COURSES,
  'got ' + stats.courses);
check(`${EXPECTED_POS} program outcomes seeded`, stats.programOutcomes === EXPECTED_POS,
  'got ' + stats.programOutcomes);
check('every course has a curriculum row',
  Store.all('curriculums').length === stats.courses,
  Store.all('curriculums').length + ' curriculums for ' + stats.courses + ' courses');
check('one admin account exists',
  Store.where('users', (u) => u.role === 'admin').length === 1);
check('faculty and students both seeded',
  stats.faculty > 0 && stats.students > 0,
  stats.faculty + ' faculty, ' + stats.students + ' students');
check('some courses are assigned to a teacher', stats.assignedCourses > 0,
  'assigned: ' + stats.assignedCourses);
check('COs exist and belong to real courses',
  stats.courseOutcomes > 0 &&
  Store.all('courseOutcomes').every((co) => !!Store.get('courses', co.courseId)),
  stats.courseOutcomes + ' COs');
check('every mapping points at a real CO and a real PO',
  stats.mappings > 0 &&
  Store.all('coPoMappings').every((m) =>
    !!Store.get('courseOutcomes', m.coId) && !!Store.get('programOutcomes', m.poId)),
  stats.mappings + ' mappings');
check('every mapping level is 1, 2 or 3',
  Store.all('coPoMappings').every((m) => [1, 2, 3].indexOf(m.level) >= 0));
check('notices seeded with valid levels',
  stats.notices > 0 &&
  Store.all('notices').every((n) =>
    ['department', 'semester', 'course'].indexOf(n.level) >= 0));
check('course-level notices point at a real course',
  Store.where('notices', (n) => n.level === 'course')
    .every((n) => !!Store.get('courses', n.courseId)));

/* No seeding warnings — a warning here means a course code in
   seed-data.js does not match any course from the syllabus. */
check('no "Seed: no course with code" warnings',
  env.logs.warn.filter((w) => w.indexOf('Seed:') === 0).length === 0,
  env.logs.warn.filter((w) => w.indexOf('Seed:') === 0).join(' | '));

/* Course counts and credits must match the printed syllabus table. */
let grandTotal = 0;
Object.keys(OFFICIAL).forEach((sem) => {
  const [nTh, crTh, nSe, crSe, total, slots] = OFFICIAL[sem];
  const core = Store.coursesOfSemester(sem).filter((c) => !c.optional);
  const th = core.filter((c) => c.type === 'theory');
  const se = core.filter((c) => c.type === 'sessional');
  const gotTh = Math.round((sum(th) + slots * 3.00) * 100) / 100;
  const gotSe = Math.round((sum(se) + slots * 0.75) * 100) / 100;
  const gotTotal = Math.round((gotTh + gotSe) * 100) / 100;
  grandTotal += gotTotal;

  check(`semester ${sem}: ${nTh} theory courses worth ${crTh.toFixed(2)}`,
    th.length + slots === nTh && gotTh === crTh,
    (th.length + slots) + ' courses, ' + gotTh.toFixed(2) + ' credits');
  check(`semester ${sem}: ${nSe} sessional courses worth ${crSe.toFixed(2)}`,
    se.length + slots === nSe && gotSe === crSe,
    (se.length + slots) + ' courses, ' + gotSe.toFixed(2) + ' credits');
  check(`semester ${sem}: total ${total.toFixed(2)} credits`,
    gotTotal === total, 'got ' + gotTotal.toFixed(2));
});
check(`the degree adds up to ${OFFICIAL_TOTAL.toFixed(2)} credits`,
  Math.round(grandTotal * 100) / 100 === OFFICIAL_TOTAL,
  'got ' + grandTotal.toFixed(2));

function sum(list) {
  return list.reduce((t, c) => t + (c.credits || 0), 0);
}

/* The optional courses are the 4th-year electives, and nothing else. */
const optional = Store.where('courses', (c) => c.optional);
check('every optional course is a 4th-year elective',
  optional.length > 0 && optional.every((c) => c.semester.indexOf('4-') === 0),
  optional.length + ' optional courses');
check('the elective lists have the sizes printed on pages 32-33',
  Store.where('courses', (c) => c.optional && c.semester === '4-1').length === 22 &&
  Store.where('courses', (c) => c.optional && c.semester === '4-2').length === 28,
  Store.where('courses', (c) => c.optional && c.semester === '4-1').length + ' / ' +
  Store.where('courses', (c) => c.optional && c.semester === '4-2').length);

check('every course sits in one of the eight semesters',
  Store.all('courses').every((c) => !!OFFICIAL[c.semester]));
check('every course has a code, a name and a type',
  Store.all('courses').every((c) =>
    c.code && c.name && (c.type === 'theory' || c.type === 'sessional')));
check('ids are unique across every collection', (() => {
  const seen = new Set();
  let ok = true;
  ['courses', 'curriculums', 'programOutcomes', 'courseOutcomes',
   'coPoMappings', 'notices', 'users', 'series'].forEach((name) => {
    Store.all(name).forEach((r) => {
      if (seen.has(r.id)) ok = false;
      seen.add(r.id);
    });
  });
  return ok;
})());

/* ================================================================
   B. BEHAVIOUR — do the operations the pages perform actually work?
   ================================================================ */

group('B. Store operations');

/* --- add --- */
const made = Store.add('courses', {
  code: 'TEST 9999', name: 'Harness Course', semester: '3-1',
  departmentId: 'dept-ece', credits: 3, type: 'theory', optional: false, facultyIds: []
});
check('add() returns a record with a generated crs- id',
  !!made.id && made.id.indexOf('crs-') === 0, made.id);
check('add() grows the collection', Store.all('courses').length === EXPECTED_COURSES + 1);
check('the new course is findable by code',
  !!Store.courseByCode('TEST 9999'));

/* --- update --- */
Store.update('courses', made.id, { name: 'Renamed Course', credits: 4 });
const afterUpdate = Store.get('courses', made.id);
check('update() changes the given fields',
  afterUpdate.name === 'Renamed Course' && afterUpdate.credits === 4);
check('update() leaves other fields alone', afterUpdate.code === 'TEST 9999');
Store.update('courses', made.id, { id: 'hacked' });
check('update() refuses to change an id', !!Store.get('courses', made.id));

/* --- the copy-on-read promise --- */
const grabbed = Store.get('courses', made.id);
grabbed.name = 'changed outside the store';
check('records handed out are copies, not live references',
  Store.get('courses', made.id).name === 'Renamed Course');

/* --- next-code helpers --- */
check('nextOutcomeCode() starts at CO1 for a fresh course',
  Store.nextOutcomeCode(made.id) === 'CO1', Store.nextOutcomeCode(made.id));
check('nextProgramOutcomeCode() is PO13 when PO1..PO12 exist',
  Store.nextProgramOutcomeCode() === 'PO13', Store.nextProgramOutcomeCode());

/* --- the course delete cascade --- */
group('B. Delete cascade');

const victim = Store.courseByCode('ECE 1103') || Store.all('courses')[0];
const before = {
  outcomes: Store.outcomesOf(victim.id).length,
  mappings: Store.mappingsOfCourse(victim.id).length,
  curriculum: !!Store.curriculumOf(victim.id),
  totalMappings: Store.all('coPoMappings').length,
  totalCourses: Store.all('courses').length
};
Store.add('notices', {
  title: 'Harness notice', message: 'attached to the victim course',
  level: 'course', departmentId: 'dept-ece', semester: null,
  courseId: victim.id, date: '2026-08-24', author: 'Harness'
});
const noticeCount = Store.where('notices', (n) => n.courseId === victim.id).length;
check('test course has COs, mappings, a curriculum and a notice to lose',
  before.outcomes > 0 && before.mappings > 0 && before.curriculum && noticeCount > 0,
  JSON.stringify(before));

const result = Store.removeCourseDeep(victim.id);
check('removeCourseDeep() reports the course as removed', result.removed === true);
check('the course itself is gone', Store.get('courses', victim.id) === null);
check('its curriculum is gone', Store.curriculumOf(victim.id) === null);
check('its COs are gone', Store.outcomesOf(victim.id).length === 0);
check('its notices are gone',
  Store.where('notices', (n) => n.courseId === victim.id).length === 0);
check('exactly its own mappings were removed',
  Store.all('coPoMappings').length === before.totalMappings - before.mappings,
  'expected ' + (before.totalMappings - before.mappings) +
  ', got ' + Store.all('coPoMappings').length);
check('no orphaned mapping is left anywhere',
  Store.all('coPoMappings').every((m) => !!Store.get('courseOutcomes', m.coId)));
check('other courses were not touched',
  Store.all('courses').length === before.totalCourses - 1);

/* --- the PO delete cascade --- */
const po = Store.programOutcomesSorted()[0];
const poMappingCount = Store.where('coPoMappings', (m) => m.poId === po.id).length;
const mappingsBeforePo = Store.all('coPoMappings').length;
const poResult = Store.removeProgramOutcomeDeep(po.id);
check('removeProgramOutcomeDeep() removes the PO',
  Store.get('programOutcomes', po.id) === null);
check('it removes exactly that PO\'s mappings',
  Store.all('coPoMappings').length === mappingsBeforePo - poMappingCount &&
  poResult.mappings === poMappingCount);
check('no mapping points at a deleted PO',
  Store.all('coPoMappings').every((m) => !!Store.get('programOutcomes', m.poId)));

/* --- the CO delete cascade --- */
const co = Store.all('courseOutcomes')[0];
const coMappingCount = Store.where('coPoMappings', (m) => m.coId === co.id).length;
const mappingsBeforeCo = Store.all('coPoMappings').length;
Store.removeOutcomeDeep(co.id);
check('removeOutcomeDeep() removes the CO',
  Store.get('courseOutcomes', co.id) === null);
check('it removes exactly that CO\'s mappings',
  Store.all('coPoMappings').length === mappingsBeforeCo - coMappingCount);

/* --- reset puts everything back --- */
Store.reset();
check('reset() restores the seeded course count',
  Store.all('courses').length === EXPECTED_COURSES);
check('reset() restores the seeded PO count',
  Store.all('programOutcomes').length === EXPECTED_POS);
check('reset() restores the mappings', Store.all('coPoMappings').length === stats.mappings);
check('reset() drops the harness test course', Store.courseByCode('TEST 9999') === null);

/* --- persistence --- */
group('B. Persistence (localStorage)');

check('data is written under Store.storageKey',
  typeof env.storage.getItem(Store.storageKey) === 'string');
check('what is stored is valid JSON with a courses array', (() => {
  try {
    const parsed = JSON.parse(env.storage.getItem(Store.storageKey));
    return Array.isArray(parsed.courses) && parsed.courses.length === EXPECTED_COURSES;
  } catch (e) { return false; }
})());

/* A second page load with the same storage must NOT re-seed: it should
   read back what the first page saved, including an edit. */
Store.add('courses', {
  code: 'KEEP 1000', name: 'Survives navigation', semester: '1-1',
  departmentId: 'dept-ece', credits: 1, type: 'theory', optional: false, facultyIds: []
});
const env2 = makeEnv({ storage: env.storage });
env2.loadShared();
check('a second page load reads the saved data instead of re-seeding',
  !!env2.sandbox.Store.courseByCode('KEEP 1000'));
check('the second load did not duplicate the seed',
  env2.sandbox.Store.all('courses').length === EXPECTED_COURSES + 1,
  'got ' + env2.sandbox.Store.all('courses').length);

/* Corrupt storage must fall back to a fresh seed rather than a blank page. */
const badStorage = makeStorage();
badStorage.setItem(Store.storageKey, '{not json at all');
const env3 = makeEnv({ storage: badStorage });
env3.loadShared();
check('corrupt saved data re-seeds instead of crashing',
  env3.sandbox.Store.all('courses').length === EXPECTED_COURSES);
check('and it says why in a console warning',
  env3.logs.warn.some((w) => w.indexOf('corrupt') >= 0));

/* If localStorage throws entirely (private mode), the app must still run. */
const deadStorage = {
  getItem() { throw new Error('denied'); },
  setItem() { throw new Error('denied'); },
  removeItem() { throw new Error('denied'); }
};
const env4 = makeEnv({ storage: deadStorage });
let deadError = null;
try { env4.loadShared(); } catch (err) { deadError = err; }
check('the app still loads when localStorage is blocked', !deadError,
  deadError ? deadError.message : '');
if (!deadError) {
  check('and it still serves the full course list from memory',
    env4.sandbox.Store.all('courses').length === EXPECTED_COURSES);
  check('and it warns rather than failing silently',
    env4.logs.warn.some((w) => w.indexOf('localStorage') >= 0));
}

/* ================================================================
   B2. LOGIN AND THE ROLE GUARD
   ================================================================ */

group('B. Login and role guard');

const demoLogins = [
  ['head.ece@ruet.ac.bd', 'admin123', 'admin'],
  ['faculty123', null, null]  // placeholder, replaced below
];

/* Pull the real demo accounts out of the seed rather than hard-coding. */
const adminUser = Store.where('users', (u) => u.role === 'admin')[0];
const facultyUser = Store.facultyList()[0];
const studentUser = Store.studentList()[0];

[adminUser, facultyUser, studentUser].forEach((u) => {
  const res = Auth.login(u.email, u.password, u.role);
  check(`${u.role} "${u.email}" can log in`, res.ok === true,
    res.error || '');
});

check('a wrong password is refused',
  Auth.login(adminUser.email, 'not-the-password', 'admin').ok === false);
check('and the message says so',
  /password/i.test(Auth.login(adminUser.email, 'nope', 'admin').error || ''));
check('an unknown email is refused',
  /No account/i.test(Auth.login('nobody@example.com', 'x', 'admin').error || ''));
check('an empty email is refused',
  Auth.login('', 'x', 'admin').ok === false);
check('an empty password is refused',
  Auth.login(adminUser.email, '', 'admin').ok === false);
check('picking the wrong role is refused',
  Auth.login(adminUser.email, adminUser.password, 'student').ok === false);
check('the wrong-role message names both roles',
  /admin account, not student/.test(
    Auth.login(adminUser.email, adminUser.password, 'student').error || ''));
check('email is matched case-insensitively',
  Auth.login(adminUser.email.toUpperCase(), adminUser.password, 'admin').ok === true);
check('surrounding spaces in the email are trimmed',
  Auth.login('  ' + adminUser.email + '  ', adminUser.password, 'admin').ok === true);

check('dashboardPath() maps each role to its own folder',
  Auth.dashboardPath('admin') === 'admin/dashboard.html' &&
  Auth.dashboardPath('faculty') === 'faculty/dashboard.html' &&
  Auth.dashboardPath('student') === 'student/dashboard.html');

/* requireRole: logged out -> login page; wrong role -> own dashboard. */
const guardEnv = makeEnv();
guardEnv.loadShared();
guardEnv.sandbox.Auth.logout('../index.html');
const loggedOut = guardEnv.sandbox.Auth.requireRole('admin');
check('requireRole() returns null when nobody is logged in', loggedOut === null);
check('and it sends the browser to the login page',
  guardEnv.redirects.some((r) => r.indexOf('index.html?msg=login-first') >= 0),
  guardEnv.redirects.join(' | '));

guardEnv.sandbox.Auth.login(studentUser.email, studentUser.password, 'student');
const wrongRole = guardEnv.sandbox.Auth.requireRole('admin');
check('a student opening an admin page is turned away', wrongRole === null);
check('and is sent to their own dashboard',
  guardEnv.redirects.some((r) => r.indexOf('student/dashboard.html') >= 0),
  guardEnv.redirects.join(' | '));
check('a student on a student page is let through',
  !!guardEnv.sandbox.Auth.requireRole('student'));
check('Auth.current() returns the logged-in user record',
  (guardEnv.sandbox.Auth.current() || {}).email === studentUser.email);

/* ================================================================
   B4. COURSE EVALUATION & FEEDBACK
   ================================================================ */

group('B. Course evaluation and feedback');

const facultyCourses = Store.coursesOfFaculty(facultyUser.id);
const evaluationCourse = facultyCourses[0];
const unauthorizedFaculty = Store.facultyList().filter((f) =>
  f.id !== facultyUser.id &&
  !Store.coursesOfFaculty(f.id).some((course) => course.id === evaluationCourse.id))[0];
let eligibleStudent = Store.studentList().filter((s) =>
  evaluationCourse && s.semester === evaluationCourse.semester)[0];
if (evaluationCourse && !eligibleStudent) {
  eligibleStudent = Store.add('users', {
    role: 'student',
    departmentId: 'dept-ece',
    name: 'Evaluation Test Student',
    email: 'evaluation-test@student.ruet.ac.bd',
    password: 'student123',
    roll: 'eval-test',
    seriesId: null,
    semester: evaluationCourse.semester,
    section: 'A',
    contact: '',
    profileComplete: true
  });
}

check('the seed has a faculty course and eligible student for evaluation tests',
  !!evaluationCourse && !!eligibleStudent,
  evaluationCourse ? evaluationCourse.code : 'no faculty course');

const createdEvaluation = Store.createEvaluation(facultyUser.id, {
  courseId: evaluationCourse.id,
  title: 'Harness course feedback',
  description: 'Please provide honest feedback.',
  deadline: '2026-12-31',
  anonymous: true,
  sections: [{
    title: 'Teaching',
    questions: [
      { text: 'Teaching quality', type: 'rating', required: true },
      { text: 'Overall delivery', type: 'mcq', required: true, options: ['Excellent', 'Good', 'Needs improvement'] },
      { text: 'Suggestions', type: 'written', required: false },
      { text: 'Priority improvements', type: 'checkbox', required: true, options: ['Examples', 'Pacing', 'Resources'] }
    ]
  }]
});
check('a creator faculty can build and persist an evaluation',
  createdEvaluation.ok && !!Store.get('courseEvaluations', createdEvaluation.evaluation.id));
check('course evaluations do not persist CLO mappings',
  createdEvaluation.ok && (createdEvaluation.evaluation.sections || []).every((section) =>
    (section.questions || []).every((question) => !Object.prototype.hasOwnProperty.call(question, 'cloIds'))));
const evalId = createdEvaluation.evaluation ? createdEvaluation.evaluation.id : null;
check('course assignments restrict evaluation creation',
  !!unauthorizedFaculty &&
  Store.createEvaluation(unauthorizedFaculty.id, {
    courseId: evaluationCourse.id,
    title: 'Unauthorized',
    sections: [{ title: 'S', questions: [{ text: 'Q', type: 'written' }] }]
  }).ok === false);

check('an evaluation starts as a draft',
  !!evalId && Store.get('courseEvaluations', evalId).status === 'draft');
check('only the creator faculty can publish',
  !!evalId && Store.publishEvaluation(Store.facultyList().filter((f) => f.id !== facultyUser.id)[0].id, evalId).ok === false);
const publish = evalId ? Store.publishEvaluation(facultyUser.id, evalId) : { ok: false };
check('the creator can publish the evaluation', publish.ok);
check('published evaluations appear only for eligible students',
  !!evalId && !!eligibleStudent &&
  Store.evaluationsForStudent(eligibleStudent.id).some((item) => item.evaluation.id === evalId));

const submit = evalId && eligibleStudent ? Store.submitEvaluation(eligibleStudent.id, evalId, {
  'q-1-1': 5,
  'q-1-2': 'Excellent',
  'q-1-3': 'More worked examples would improve practice.',
  'q-1-4': ['Examples', 'Resources']
}, '2026-11-19T10:00:00') : { ok: false };
check('an eligible student can submit a valid response', submit.ok,
  submit.error || '');
check('duplicate submission is prevented',
  !!evalId && eligibleStudent &&
  Store.submitEvaluation(eligibleStudent.id, evalId, {
    'q-1-1': 4, 'q-1-2': 'Good', 'q-1-3': '', 'q-1-4': ['Pacing']
  }, '2026-11-20T10:00:00').ok === false);
check('deadline validation rejects late submissions',
  !!evalId && eligibleStudent &&
  Store.submitEvaluation(eligibleStudent.id, evalId, {
    'q-1-1': 4, 'q-1-2': 'Good', 'q-1-3': '', 'q-1-4': ['Pacing']
  }, '2027-01-01T10:00:00').error === 'The submission deadline has passed.');

const analytics = evalId ? Store.evaluationAnalytics(facultyUser.id, evalId) : { ok: false };
check('creator faculty gets persisted aggregate analytics',
  analytics.ok && analytics.responseCount === 1 &&
  analytics.questionStats.some((q) => q.type === 'rating' && q.average === 5));
check('rating question statistics include percentages',
  analytics.ok && analytics.questionStats[0].distribution.length === 5 &&
  analytics.questionStats[0].percentages.length === 5);
check('written feedback exposes suggestions and improvement areas',
  analytics.ok && analytics.questionStats[2].suggestions.length === 1 &&
  analytics.questionStats[2].improvementAreas.length === 1);
check('a non-creator faculty cannot see analytics',
  !!evalId && Store.evaluationAnalytics(Store.facultyList().filter((f) => f.id !== facultyUser.id)[0].id, evalId).ok === false);
check('students cannot access analytics',
  !!evalId && Store.evaluationAnalytics(eligibleStudent.id, evalId).ok === false);
const reports = evalId ? Store.evaluationIndividualReports(facultyUser.id, evalId) : { ok: false };
check('creator faculty can access individual reports',
  reports.ok && reports.reports.length === 1);
check('default anonymous reports hide student identity',
  reports.ok && reports.reports[0].studentId === null &&
  reports.reports[0].studentName === 'Anonymous student');
check('non-creator faculty cannot access individual reports',
  !!evalId && Store.evaluationIndividualReports(Store.facultyList().filter((f) => f.id !== facultyUser.id)[0].id, evalId).ok === false);
check('admin cannot access individual reports',
  !!evalId && Store.evaluationIndividualReports(adminUser.id, evalId).ok === false);

const studentEvaluationHtml = fs.readFileSync(path.join(ROOT, 'student/evaluations.html'), 'utf8');
const facultyEvaluationHtml = fs.readFileSync(path.join(ROOT, 'faculty/evaluations.html'), 'utf8');
check('student rating questions render as radio choices',
  studentEvaluationHtml.indexOf('type="radio"') >= 0 &&
  ['Poor', 'Fair', 'Satisfactory', 'Very good', 'Excellent'].every((label) =>
    studentEvaluationHtml.indexOf(label) >= 0));
check('faculty setup offers course selection without CLO coupling',
  facultyEvaluationHtml.indexOf('id="evCourse"') >= 0 &&
  facultyEvaluationHtml.indexOf('sqClo') < 0 &&
  facultyEvaluationHtml.indexOf('Optional CLO mapping') < 0);
check('faculty setup exposes radio ratings and written suggestions',
  facultyEvaluationHtml.indexOf('Radio rating') >= 0 &&
  facultyEvaluationHtml.indexOf('Written feedback') >= 0);

const shellHtml = fs.readFileSync(path.join(ROOT, 'shared/js/shell.js'), 'utf8');
const seedHtml = fs.readFileSync(path.join(ROOT, 'shared/js/seed-data.js'), 'utf8');
check('admin identity is separate from professor identity',
  seedHtml.indexOf("name: 'Department Administrator'") >= 0 &&
  seedHtml.indexOf("id: 'u-fac-head', role: 'faculty'") >= 0 &&
  seedHtml.indexOf("name: 'Prof. Dr. Md. Anwar Hossain'") >= 0);
check('admin shell uses a neutral identity',
  shellHtml.indexOf("opts.role === 'admin' ? 'Department Administrator'") >= 0 &&
  shellHtml.indexOf('Prof. Dr. Md. Anwar Hossain') < 0);
check('navigation uses Series and CO and PO Framework labels',
  shellHtml.indexOf("label: 'Series'") >= 0 &&
  shellHtml.indexOf("label: 'CO and PO Framework'") >= 0 &&
  shellHtml.indexOf("label: 'Series / Semester'") < 0 &&
  shellHtml.indexOf("label: 'CO / PO Framework'") < 0);

check('dashboard semester notice bug has no undefined semesterSet',
  fs.readFileSync(path.join(ROOT, 'faculty/dashboard.html'), 'utf8').indexOf('var semesterSet = {};') >= 0);
check('faculty assignment fixtures use facultyIds',
  /facultyIds\s*:\s*\[\]/.test(fs.readFileSync(path.join(ROOT, 'Additional Files/tests/run-tests.js'), 'utf8')) &&
  !/\bfacultyId\s*:/m.test(fs.readFileSync(path.join(ROOT, 'Additional Files/tests/run-tests.js'), 'utf8')));
check('marks recompute guards missing DOM inputs',
  fs.readFileSync(path.join(ROOT, 'faculty/marks.html'), 'utf8').indexOf('var box = inputFor(studentId,') >= 0 &&
  fs.readFileSync(path.join(ROOT, 'faculty/marks.html'), 'utf8').indexOf('if (!totalCell) return;') >= 0);

/* ================================================================
   B3. SMALL HELPERS
   ================================================================ */

group('B. UI helpers');

check('esc() neutralises angle brackets and quotes',
  UI.esc('<script>"x"</script>').indexOf('<') === -1 &&
  UI.esc('<b>').indexOf('&lt;') === 0,
  UI.esc('<b>'));
check('esc() handles null without throwing', UI.esc(null) === '');
check('plural() says "1 course" and "2 courses"',
  UI.plural(1, 'course') === '1 course' && UI.plural(2, 'course') === '2 courses',
  UI.plural(1, 'course') + ' / ' + UI.plural(2, 'course'));
check('plural() takes an irregular plural',
  UI.plural(2, 'series', 'series') === '2 series');
check('date() formats an ISO date readably',
  /^\d{1,2} [A-Z][a-z]{2} \d{4}$/.test(UI.date('2026-08-18')),
  UI.date('2026-08-18'));
check('date() survives an empty value', typeof UI.date('') === 'string');
check('initials() takes the first letters of two names',
  UI.initials('Sadikin Rahman') === 'SR', UI.initials('Sadikin Rahman'));

group('B. Theme');

const Theme = env.sandbox.Theme;
Theme.apply('dark');
check('apply("dark") stores the choice', env.storage.getItem('obe.theme') === 'dark');
check('apply("dark") sets the html data-theme attribute',
  env.sandbox.document.documentElement.dataset.theme === 'dark' ||
  env.sandbox.document.documentElement.getAttribute('data-theme') === 'dark');
Theme.toggle();
check('toggle() goes back to light', Theme.current() === 'light', Theme.current());
Theme.toggle();
check('toggle() goes to dark again', Theme.current() === 'dark');
Theme.apply('light');

/* A saved theme must be picked up by the next page load. */
const themeEnv = makeEnv({ storage: env.storage });
env.storage.setItem('obe.theme', 'dark');
themeEnv.loadShared();
themeEnv.sandbox.Theme.init();
check('a new page picks up the saved theme',
  themeEnv.sandbox.Theme.current() === 'dark');
env.storage.setItem('obe.theme', 'light');

/* ================================================================
   C. PAGES — every page runs, and every link resolves
   ================================================================ */

group('C. Files exist');

/** All .html files in the project, ignoring the notes folder. */
function htmlPages(dir, out) {
  out = out || [];
  fs.readdirSync(path.join(ROOT, dir || '.'), { withFileTypes: true }).forEach((entry) => {
    const rel = dir ? path.join(dir, entry.name) : entry.name;
    if (entry.isDirectory()) {
      if (entry.name === 'Additional Files' || entry.name.charAt(0) === '.') return;
      htmlPages(rel, out);
    } else if (entry.name.endsWith('.html')) {
      out.push(rel.split(path.sep).join('/'));
    }
  });
  return out;
}

const pages = htmlPages('');
check('login page and admin pages are all present',
  ['index.html', 'admin/dashboard.html', 'admin/courses.html', 'admin/co-po.html']
    .every((p) => pages.indexOf(p) >= 0),
  pages.join(', '));

/* Every <script src> / <link href> / nav href must point at a real file. */
let missingAssets = [];
let missingIds = [];
pages.forEach((page) => {
  const info = readPage(page);
  const dir = path.dirname(path.join(ROOT, page));

  info.srcs.forEach((src) => {
    if (!fs.existsSync(path.resolve(dir, src))) missingAssets.push(page + ' -> ' + src);
  });

  const cssRe = /<link[^>]+href\s*=\s*"([^"]+\.css)"/g;
  let m;
  while ((m = cssRe.exec(info.html)) !== null) {
    if (!fs.existsSync(path.resolve(dir, m[1]))) missingAssets.push(page + ' -> ' + m[1]);
  }

  info.hrefs.forEach((href) => {
    if (/^(https?:|mailto:|#|javascript:)/.test(href)) return;
    const file = href.split('?')[0].split('#')[0];
    if (!file || !file.endsWith('.html')) return;
    if (!fs.existsSync(path.resolve(dir, file))) missingAssets.push(page + ' -> ' + href);
  });

  /* Every UI.el('x') in the page must match an id in that page's HTML. */
  const elRe = /UI\.el\(\s*'([^']+)'\s*\)/g;
  while ((m = elRe.exec(info.html)) !== null) {
    if (info.ids.indexOf(m[1]) === -1) missingIds.push(page + ' -> #' + m[1]);
  }
});
check('every script/stylesheet/page link resolves to a real file',
  missingAssets.length === 0, missingAssets.join(' | '));
check('every UI.el(id) matches an id in the same page',
  missingIds.length === 0, missingIds.join(' | '));

/* Every nav entry that is not marked "soon" must exist on disk.
   ({ group: '...' } entries are just headings, and the faculty/student
   folders only appear in steps 2 and 3.) */
let missingNav = [];
let pendingNav = [];
Object.keys(Shell.NAV).forEach((role) => {
  // A role folder counts as "built" once it holds at least one page.
  const roleDir = path.join(ROOT, role);
  const roleBuilt = fs.existsSync(roleDir) &&
    fs.readdirSync(roleDir).some((f) => f.endsWith('.html'));
  Shell.NAV[role].forEach((item) => {
    if (item.soon || !item.href) return;
    const target = path.join(roleDir, item.href.split('?')[0]);
    if (fs.existsSync(target)) return;
    if (roleBuilt) missingNav.push(role + '/' + item.href);
    else pendingNav.push(role + '/' + item.href);
  });
});
check('every ready nav link points at a page that exists',
  missingNav.length === 0, missingNav.join(' | '));
if (pendingNav.length) {
  console.log('  – not built yet (later steps): ' + pendingNav.join(', '));
}

group('C. Each page script runs');

/* Run each page the way the browser would: shared files, then the page's
   own inline script, with an admin logged in. */
pages.forEach((page) => {
  const info = readPage(page);
  const pageEnv = makeEnv({ storage: makeStorage() });
  let err = null;
  try {
    pageEnv.loadShared();
    pageEnv.mount(info.markup);   // the page's own markup, before its script runs
    // Log in as the role that owns this folder, so the guard lets us in.
    const folder = page.indexOf('/') >= 0 ? page.split('/')[0] : null;
    if (folder) {
      const owner = pageEnv.sandbox.Store.where('users', (u) => u.role === folder)[0];
      if (owner) pageEnv.sandbox.Auth.login(owner.email, owner.password, owner.role);
    }
    info.scripts.forEach((code, i) => pageEnv.runCode(code, page + ' #' + (i + 1)));
  } catch (e) {
    err = e;
  }

  const consoleErrors = pageEnv.logs.error;
  check(page + ' runs without throwing', !err,
    err ? (err.message + (err.stack ? ' @ ' + String(err.stack).split('\n')[1] : '')) : '');
  check(page + ' logs no console errors', consoleErrors.length === 0,
    consoleErrors.join(' | '));

  if (!err && page !== 'index.html') {
    check(page + ' was not bounced by the role guard',
      !pageEnv.redirects.some((r) => r.indexOf('index.html') >= 0),
      pageEnv.redirects.join(' | '));
    check(page + ' rendered a sidebar and a topbar',
      pageEnv.el('sidebar').innerHTML.length > 50 &&
      pageEnv.el('topbar').innerHTML.length > 50);
    check(page + ' set the document title', pageEnv.sandbox.document.title.length > 0);
  }
});

group('C. Admin pages show real data');

/* Spot-check that the two big admin pages actually put rows on screen. */
function renderAdminPage(page, search) {
  const info = readPage(page);
  const pageEnv = makeEnv({ storage: makeStorage(), search: search || '' });
  pageEnv.loadShared();
  pageEnv.mount(info.markup);
  const admin = pageEnv.sandbox.Store.where('users', (u) => u.role === 'admin')[0];
  pageEnv.sandbox.Auth.login(admin.email, admin.password, 'admin');
  info.scripts.forEach((code, i) => pageEnv.runCode(code, page + ' #' + (i + 1)));
  return pageEnv;
}

const coursesEnv = renderAdminPage('admin/courses.html');
const coursesHtml = coursesEnv.renderedHtml();
check('courses.html lists a real course code from the syllabus',
  coursesHtml.indexOf('ECE 1103') >= 0);
check('courses.html says how many courses there are',
  /\d+ courses/.test(coursesEnv.el('countLine').textContent),
  coursesEnv.el('countLine').textContent);
check('courses.html renders one table row per course',
  (coursesHtml.match(/<tr>/g) || []).length >= EXPECTED_COURSES,
  'rows: ' + (coursesHtml.match(/<tr>/g) || []).length);

const semesterEnv = renderAdminPage('admin/courses.html', '?semester=3-1');
check('courses.html?semester=3-1 pre-selects that semester',
  semesterEnv.el('fSemester').value === '3-1',
  semesterEnv.el('fSemester').value);
check('and then counts only that semester',
  /Showing\s+10\s+of\s+122/.test(semesterEnv.el('countLine').textContent),
  semesterEnv.el('countLine').textContent);

const dashEnv = renderAdminPage('admin/dashboard.html');
const dashHtml = dashEnv.renderedHtml();
check('dashboard shows the total course count',
  dashHtml.indexOf(String(EXPECTED_COURSES)) >= 0);
check('dashboard shows the faculty and student counts',
  dashHtml.indexOf(String(stats.faculty)) >= 0 &&
  dashHtml.indexOf(String(stats.students)) >= 0);
check('dashboard links to course management',
  dashHtml.indexOf('courses.html') >= 0);

const copoEnv = renderAdminPage('admin/co-po.html');
const copoHtml = copoEnv.renderedHtml();
check('co-po.html lists the program outcomes',
  copoHtml.indexOf('PO1') >= 0 && copoHtml.indexOf('PO12') >= 0);

/* The CO tab opens on a course, so the matrix only draws there. */
const coTabEnv = renderAdminPage('admin/co-po.html', '?tab=co');
const matrix = coTabEnv.el('coMatrix').innerHTML;
check('the CO tab picks a course by itself', !!coTabEnv.el("cCourse").value,
  coTabEnv.el("cCourse").value);
check('co-po.html draws the CO-PO matrix on the CO tab',
  matrix.indexOf('<table class="matrix">') >= 0, matrix.slice(0, 80));
check('the matrix has a column for every PO',
  (matrix.match(/<th[ >]/g) || []).length >= EXPECTED_POS);
check('the matrix shows correlation levels 1-3',
  /class="lv[123]"/.test(matrix));
check('the CO tab lists the outcomes of that course',
  /CO1/.test(coTabEnv.el('coRows').innerHTML));

const facultyInfoEnv = renderAdminPage('admin/faculty-info.html');
check('faculty-info.html lists a seeded teacher',
  facultyInfoEnv.renderedHtml().indexOf(facultyUser.name) >= 0);

const studentsInfoEnv = renderAdminPage('admin/students-info.html');
check('students-info.html lists a seeded student roll',
  studentsInfoEnv.renderedHtml().indexOf(String(studentUser.roll)) >= 0);

const seriesEnv = renderAdminPage('admin/series.html');
const seriesHtml = seriesEnv.renderedHtml();
check('series.html shows all eight semesters',
  Object.keys(OFFICIAL).every((s) => seriesHtml.indexOf('>' + s + '<') >= 0));
check('series.html shows a credit total for every semester',
  Object.keys(OFFICIAL).every((s) => {
    // compare against that page's own copy of the data, not this file's
    const list = seriesEnv.sandbox.Store.coursesOfSemester(s);
    const total = Math.round(list.reduce((t, c) => t + (c.credits || 0), 0) * 100) / 100;
    return seriesHtml.indexOf(total.toFixed(2)) >= 0;
  }));

const noticesEnv = renderAdminPage('admin/notices.html');
check('notices.html lists the seeded notices',
  (noticesEnv.renderedHtml().match(/list-title/g) || []).length >= stats.notices);

group('C. The pop-up forms');

/* Everything above checks what the pages *show*. These check what happens
   when somebody actually fills a form in: the rules that keep bad data
   out, and the save that follows when the data is good.

   captureModals swaps UI.modal for a stand-in, so a test can type into
   the fields and press the button without a real browser. */
function openAdminPage(page, search) {
  const info = readPage(page);
  const pageEnv = makeEnv({ storage: makeStorage(), search: search || '' });
  pageEnv.loadShared();
  pageEnv.mount(info.markup);
  const admin = pageEnv.sandbox.Store.where('users', (u) => u.role === 'admin')[0];
  pageEnv.sandbox.Auth.login(admin.email, admin.password, 'admin');
  const modals = captureModals(pageEnv);
  info.scripts.forEach((code, i) => pageEnv.runCode(code, page + ' #' + (i + 1)));
  return { env: pageEnv, modals, store: pageEnv.sandbox.Store };
}

/* ---- the course form ---- */
const courseForm = openAdminPage('admin/courses.html');
courseForm.env.el('btnAdd').click();
let form = courseForm.modals.last();

check('"New course" opens a form', !!form && form.title === 'New course',
  form ? form.title : 'no dialog');
check('the form asks for every field a course needs',
  ['fCode', 'fName', 'fSem', 'fCredits', 'fKind', 'fOpt', 'fErr']
    .every((id) => form.fields.indexOf(id) >= 0), form.fields.join(','));

/* Each rule is checked by breaking exactly one thing. */
form.set('fCode', '').set('fName', 'Anything');
check('a course with no code is refused', form.ok() === false);
check('and says why', form.error() === 'A course code is required.', form.error());

form.set('fCode', 'ECE 9001').set('fName', '  ');
check('a course with no title is refused', form.ok() === false);
check('and says why', form.error() === 'A course title is required.', form.error());

form.set('fName', 'Test Course').set('fCredits', 'three');
check('credits that are not a number are refused', form.ok() === false);
check('and says why', /Credits must be a number/.test(form.error()), form.error());

form.set('fCredits', '-1');
check('negative credits are refused', form.ok() === false);

/* The duplicate rule is per semester, not per code, because ECE 4000
   really does appear in both 4th-year semesters. */
const existing = courseForm.store.coursesOfSemester('1-1')[0];
form.set('fCode', existing.code).set('fSem', '1-1').set('fCredits', '3');
check('the same code twice in one semester is refused', form.ok() === false);
check('and names the clash', form.error().indexOf(existing.code) === 0, form.error());

form.set('fSem', '4-2');
const countBefore = courseForm.store.all('courses').length;
check('but the same code in another semester is allowed', form.ok() === true, form.error());
check('and the course was really added',
  courseForm.store.all('courses').length === countBefore + 1);

const added = courseForm.store.where('courses',
  (c) => c.code === existing.code && c.semester === '4-2')[0];
check('the new course kept what was typed in',
  added && added.name === 'Test Course' && added.credits === 3 &&
  added.departmentId, JSON.stringify(added));
check('and got an empty curriculum, so the faculty editor has something to open',
  !!courseForm.store.curriculumOf(added.id));

/* Editing starts from the existing values rather than a blank form. */
courseForm.env.find('[data-edit]')[0].click();
const editForm = courseForm.modals.last();
const firstRow = courseForm.store.coursesOfSemester(
  courseForm.env.el('fSemester').value || '1-1')[0];
check('the Edit button opens an edit form, not a new one',
  editForm.title.indexOf('Edit ') === 0, editForm.title);
check('the edit form starts with the course already filled in',
  courseForm.env.el('fCode').value.length > 0 &&
  courseForm.env.el('fName').value.length > 0,
  courseForm.env.el('fCode').value + ' / ' + courseForm.env.el('fName').value);

const editedId = courseForm.store.courseByCode(courseForm.env.el('fCode').value).id;
editForm.set('fName', 'Renamed In A Test');
check('saving an edit closes the form', editForm.ok() === true, editForm.error());
check('and the change was stored',
  courseForm.store.get('courses', editedId).name === 'Renamed In A Test',
  courseForm.store.get('courses', editedId).name);
check('editing did not create a second course',
  courseForm.store.all('courses').length === countBefore + 1);
void firstRow;

/* ---- deleting a course ---- */
const victimCourse = courseForm.store.all('courseOutcomes')[0];
const targetId = victimCourse.courseId;
const deletable = courseForm.env.find('[data-del]')
  .filter((b) => b.getAttribute('data-del') === targetId)[0];
if (deletable) {
  const beforeDelete = courseForm.store.dependentsOfCourse(targetId);
  deletable.click();
  const ask = courseForm.modals.last();
  check('deleting asks first', !!ask && ask.isConfirm === true);
  check('and warns about what goes with it',
    beforeDelete.outcomes.length === 0 || /course outcome/.test(ask.message),
    ask.message);
  ask.yes();
  check('saying yes removes the course', !courseForm.store.get('courses', targetId));
  check('and leaves none of its outcomes behind',
    courseForm.store.outcomesOf(targetId).length === 0);
  check('and none of its mappings',
    courseForm.store.mappingsOfCourse(targetId).length === 0);
} else {
  check('a delete button exists for a course with outcomes', false, 'no button found');
}

/* ---- the program-outcome form ---- */
const poForm = openAdminPage('admin/co-po.html');
poForm.env.el('btnAddPo').click();
let pForm = poForm.modals.last();

check('"Add PO" opens a form with a suggested next code',
  /^PO\d+$/.test(poForm.env.el('pCode').value), poForm.env.el('pCode').value);

pForm.set('pCode', 'X9').set('pDesc', 'Something');
check('a PO code that is not PO<number> is refused', pForm.ok() === false);
check('and says what the code should look like',
  /PO1\s*…\s*PO12/.test(pForm.error('pErr')), pForm.error('pErr'));

pForm.set('pCode', 'PO13').set('pDesc', '   ');
check('a PO with no statement is refused', pForm.ok() === false);
check('and says why', pForm.error('pErr') === 'A statement is required.', pForm.error('pErr'));

pForm.set('pCode', 'PO 1').set('pDesc', 'A duplicate of the first one');
check('a PO code that already exists is refused (spaces ignored)', pForm.ok() === false);
check('and names the clash', pForm.error('pErr') === 'PO1 already exists.', pForm.error('pErr'));

const posBefore = poForm.store.all('programOutcomes').length;
pForm.set('pCode', 'PO13').set('pTitle', 'Test Outcome').set('pDesc', 'A brand new statement.');
check('a valid PO is accepted', pForm.ok() === true, pForm.error('pErr'));
check('and was really added',
  poForm.store.all('programOutcomes').length === posBefore + 1);

/* ---- the course-outcome form ---- */
const coForm = openAdminPage('admin/co-po.html', '?tab=co');
const coCourseId = coForm.env.el('cCourse').value;
coForm.env.el('btnAddCo').click();
let oForm = coForm.modals.last();

check('"Add CO" opens a form for the selected course',
  oForm.title.indexOf(coForm.store.get('courses', coCourseId).code) >= 0, oForm.title);
check('with the next free CO code filled in',
  /^CO\d+$/.test(coForm.env.el('oCode').value), coForm.env.el('oCode').value);

oForm.set('oCode', 'outcome one').set('oDesc', 'Explain something.');
check('a CO code that is not CO<number> is refused', oForm.ok() === false);
check('and says what the code should look like',
  /CO1, CO2/.test(oForm.error('oErr')), oForm.error('oErr'));

oForm.set('oCode', 'CO9').set('oDesc', '');
check('a CO with no statement is refused', oForm.ok() === false);

const firstCo = coForm.store.outcomesOf(coCourseId)[0];
oForm.set('oCode', firstCo.code).set('oDesc', 'A duplicate code.');
check('a CO code already used by that course is refused', oForm.ok() === false);
check('and names the clash', oForm.error('oErr').indexOf(firstCo.code) === 0,
  oForm.error('oErr'));

/* The same CO code on a *different* course is fine — every course counts
   its outcomes from CO1. */
const otherCourse = coForm.store.all('courses')
  .filter((c) => c.id !== coCourseId && coForm.store.outcomesOf(c.id).length)[0];
check('but that code is in use on other courses too',
  !!otherCourse && coForm.store.outcomesOf(otherCourse.id)
    .some((x) => x.code === firstCo.code));

const cosBefore = coForm.store.outcomesOf(coCourseId).length;
oForm.set('oCode', 'CO99').set('oDesc', 'Apply a test to a test.');
check('a valid CO is accepted', oForm.ok() === true, oForm.error('oErr'));
check('and was added to that course only',
  coForm.store.outcomesOf(coCourseId).length === cosBefore + 1);

/* ---- deleting a CO takes its mappings with it ---- */
const mappedCo = coForm.store.outcomesOf(coCourseId)
  .filter((c) => coForm.store.where('coPoMappings', (m) => m.coId === c.id).length)[0];
if (mappedCo) {
  const mappingsGone = coForm.store.where('coPoMappings', (m) => m.coId === mappedCo.id).length;
  const delBtn = coForm.env.find('[data-co-del]')
    .filter((b) => b.getAttribute('data-co-del') === mappedCo.id)[0];
  check('every CO row has a delete button', !!delBtn);
  if (delBtn) {
    delBtn.click();
    const ask = coForm.modals.last();
    check('deleting a CO asks first, mentioning its mappings',
      ask.isConfirm && /PO mapping/.test(ask.message), ask.message);
    ask.yes();
    check('the CO is gone', !coForm.store.get('courseOutcomes', mappedCo.id));
    check('and so are its ' + mappingsGone + ' mappings',
      coForm.store.where('coPoMappings', (m) => m.coId === mappedCo.id).length === 0);
  }
}

group('C. Student-facing pages stay read-only');
/* The brief says the student module must have no way to change anything.
   Nothing under /student may render an edit, delete or save control. */
const studentPages = pages.filter((p) => p.indexOf('student/') === 0);
if (studentPages.length === 0) {
  console.log('  – no /student pages yet (built in step 3)');
} else {
  studentPages.forEach((page) => {
    const html = fs.readFileSync(path.join(ROOT, page), 'utf8');
    const offenders = ['btn-danger', 'openForm(', 'askDelete(', 'Store.add(',
                       'Store.update(', 'Store.remove(']
      .filter((needle) => html.indexOf(needle) >= 0);
    check(page + ' has no create/edit/delete control',
      offenders.length === 0, offenders.join(', '));
  });
}

process.exit(summary());
