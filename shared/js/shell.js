/* ==================================================================
   shell.js — the sidebar + topbar (the "navbar" from Visit 1)
   ------------------------------------------------------------------
   Every page inside /admin, /faculty and /student has the same
   skeleton in its HTML:

     <div class="shell">
       <aside class="sidebar" id="sidebar"></aside>
       <div class="main">
         <header class="topbar" id="topbar"></header>
         <main class="content" id="content"> ...page markup... </main>
       </div>
     </div>

   and one call in its own script:

     Shell.mount({ role: 'admin', active: 'courses',
                   title: 'Course Management' });

   TO ADD A NEW PAGE: create the .html file, then add one line to the
   NAV list below. Nothing else needs changing.
   ================================================================== */

window.Shell = (function () {
  'use strict';

  /* ---------------- icons (inline SVG, no icon library needed) ----------------
     Each entry is the inside of a 24x24 stroked SVG. currentColor means
     the icon always matches the text colour of the link. */
  var ICONS = {
    grid:    '<path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"/>',
    book:    '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    target:  '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
    users:   '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    cap:     '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12.5V17c0 1.2 2.7 3 6 3s6-1.8 6-3v-4.5"/>',
    calendar:'<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    bell:    '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
    pencil:  '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    file:    '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>',
    layers:  '<path d="M12 2l10 5-10 5L2 7z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>',
    logout:  '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/>',
    refresh: '<path d="M23 4v6h-6M1 20v-6h6"/><path d="M20.5 9a9 9 0 0 0-14.9-3.4L1 10M23 14l-4.6 4.4A9 9 0 0 1 3.5 15"/>',
    power:   '<path d="M12 2v10"/><path d="M18.4 6.6a9 9 0 1 1-12.8 0"/>',
    home:    '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
    chart:   '<path d="M3 3v18h18"/><path d="M7 15V9M12 15V5M17 15v-3"/>',
    clipboard:'<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 12h6M9 16h6"/>',
    user:    '<circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/>',
    globe:   '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z"/>',
    cog:     '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>'
  };

  function icon(name) {
    return '<svg class="ico" viewBox="0 0 24 24" width="17" height="17" fill="none" ' +
           'stroke="currentColor" stroke-width="1.7" stroke-linecap="round" ' +
           'stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || '') + '</svg>';
  }

  /* ---------------- navigation ----------------
     One list per role. { group: 'Text' } starts a new section heading.
     soon: true  just adds a small "SOON" tag (the page still opens). */
  var NAV = {
    admin: [
      { group: 'Overview' },
      { id: 'dashboard', label: 'Dashboard',        href: 'dashboard.html',    icon: 'grid' },
      { group: 'Curriculum' },
      { id: 'courses',   label: 'Course Management', href: 'courses.html',     icon: 'book' },
      { id: 'copo',      label: 'CO and PO Framework', href: 'co-po.html',       icon: 'target' },
      { group: 'Department' },
      { id: 'faculty',   label: 'Faculty Info',      href: 'faculty-info.html', icon: 'users' },
      { id: 'external',  label: 'External Faculty',  href: 'external-faculty.html', icon: 'globe' },
      { id: 'students',  label: 'Student Rolls',     href: 'students-info.html', icon: 'cap' },
      { id: 'series',    label: 'Series', href: 'series.html',       icon: 'calendar' },
      { id: 'notices',   label: 'Notices',           href: 'notices.html',      icon: 'bell' }
    ],

    faculty: [
      { group: 'Overview' },
      { id: 'dashboard',  label: 'My Dashboard',      href: 'dashboard.html',     icon: 'grid' },
      { group: 'My Courses' },
      { id: 'outcomes',   label: 'Course Outcomes',   href: 'outcomes.html',      icon: 'pencil' },
      { id: 'copo',       label: 'CO-PO Mapping',     href: 'co-po-mapping.html', icon: 'target' },
      { group: 'Assessment' },
      { id: 'questions',  label: 'Question Setup',    href: 'questions.html',     icon: 'clipboard' },
      { id: 'marks',      label: 'CT & Exam Marks',   href: 'marks.html',         icon: 'file' },
      { id: 'assignments',label: 'Assignments',       href: 'assignments.html',   icon: 'layers' },
      { id: 'attendance', label: 'Attendance',        href: 'attendance.html',    icon: 'calendar' },
      { group: 'Reports' },
      { id: 'attainment', label: 'CO / PO Attainment', href: 'attainment.html',   icon: 'chart' },
      { id: 'evaluations', label: 'Course Evaluations', href: 'evaluations.html', icon: 'clipboard' },
      { id: 'notices',    label: 'Notices',           href: 'notices.html',       icon: 'bell' }
    ],

    student: [
      { group: 'Overview' },
      { id: 'dashboard', label: 'My Dashboard',   href: 'dashboard.html', icon: 'grid' },
      { group: 'My Courses' },
      { id: 'syllabus',    label: 'Syllabus',     href: 'syllabus.html',    icon: 'book' },
      { id: 'outcomes',    label: 'Course Outcomes', href: 'outcomes.html', icon: 'target' },
      { id: 'assignments', label: 'Assignments',  href: 'assignments.html', icon: 'pencil' },
      { id: 'evaluations', label: 'Evaluations',  href: 'evaluations.html', icon: 'clipboard' },
      { id: 'notices',     label: 'Notices',      href: 'notices.html',     icon: 'bell' },
      { group: 'Results' },
      { id: 'marks',     label: 'Marks',          href: 'marks.html',      icon: 'file' },
      { id: 'attendance',label: 'Attendance',     href: 'attendance.html', icon: 'calendar' },
      { group: 'Account' },
      { id: 'profile',   label: 'My Profile',     href: 'profile.html',    icon: 'user' }
    ]
  };

  /* ---------------- mount ----------------
     opts = { role, active, title, crumb }
       role   : 'admin' | 'faculty' | 'student'  (must match the folder)
       active : the nav id to highlight
       title  : shown in the topbar and the browser tab
       crumb  : small grey text after the title (optional) */
  function mount(opts) {
    var user = Auth.current();
    if (!user) return;                        // the page guard already redirected
    var dept = Store.department();
    var roleInfo = Auth.ROLES[opts.role] || Auth.ROLES.student;

    /* ---- sidebar ---- */
    var links = (NAV[opts.role] || []).map(function (item) {
      if (item.group) return '<div class="nav-group">' + UI.esc(item.group) + '</div>';
      var isActive = item.id === opts.active;
      return '<a class="nav-link' + (isActive ? ' is-active' : '') +
             (item.soon ? ' is-soon' : '') + '" href="' + item.href + '">' +
             icon(item.icon) + '<span>' + UI.esc(item.label) + '</span>' +
             (item.soon ? '<span class="soon">SOON</span>' : '') + '</a>';
    }).join('');

    UI.el('sidebar').innerHTML =
      '<div class="brand">' +
        '<img class="brand-logo" src="../shared/img/ruet-logo.png" alt="RUET">' +
        '<div>' +
          '<div class="brand-name">OBE Curriculum</div>' +
          '<div class="brand-sub">' + UI.esc(dept.shortName) + ' · ' + UI.esc(roleInfo.label) + '</div>' +
        '</div>' +
      '</div>' +
      '<nav class="nav">' + links +
        '<div class="nav-group">Session</div>' +
        '<a class="nav-link" href="#" id="resetDataLink">' + icon('refresh') +
          '<span>Reset demo data</span></a>' +
        '<a class="nav-link" href="#" id="startFreshLink">' + icon('power') +
          '<span>Start fresh (empty app)</span></a>' +
        '<a class="nav-link" href="#" id="logoutLink">' + icon('logout') +
          '<span>Log out</span></a>' +
      '</nav>';

    /* ---- topbar ---- */
    var topbarName = opts.role === 'admin' ? 'Department Administrator' : user.name;
    var topbarInitials = opts.role === 'admin' ? 'DA' : UI.initials(user.name);
    UI.el('topbar').innerHTML =
      '<div>' +
        '<div class="topbar-title">' + UI.esc(opts.title || 'Dashboard') + '</div>' +
        '<div class="topbar-crumb">' + UI.esc(opts.crumb || (dept.shortName + ' · ' + dept.university)) + '</div>' +
      '</div>' +
      '<div class="spacer"></div>' +
      '<button class="icon-btn" data-theme-toggle title="Switch theme">☾</button>' +
      '<div class="who">' +
        '<div class="avatar">' + UI.esc(topbarInitials) + '</div>' +
        '<div>' +
          '<div class="who-name">' + UI.esc(topbarName) + '</div>' +
          '<div class="who-role">' + UI.esc(roleInfo.label) +
            (user.roll ? ' · ' + UI.esc(user.roll) : '') + '</div>' +
        '</div>' +
      '</div>';

    document.title = (opts.title || 'Dashboard') + ' · OBE ' + dept.shortName;

    /* ---- wire up the shared buttons ---- */
    Theme.init();

    UI.el('logoutLink').onclick = function (ev) {
      ev.preventDefault();
      Auth.logout('../index.html');
    };

    UI.el('resetDataLink').onclick = function (ev) {
      ev.preventDefault();
      UI.confirm({
        title: 'Reset demo data?',
        message: 'Every course, outcome, mapping and notice goes back to the ' +
                 'values in seed-data.js and seed-courses.js. Anything you ' +
                 'typed in will be lost.',
        okText: 'Reset everything'
      }, function () {
        Store.reset();
        window.location.reload();
      });
    };

    UI.el('startFreshLink').onclick = function (ev) {
      ev.preventDefault();
      UI.confirm({
        title: 'Start fresh — empty the app?',
        message: 'This clears every teacher, student, series, course outcome, ' +
                 'CO-PO mapping, notice, assignment, mark and attendance record, ' +
                 'and unassigns every course, leaving a blank app. The fixed ' +
                 'foundation stays: the department, the eight semesters, the 122 ' +
                 'syllabus courses and their topics, the program outcomes, and the ' +
                 'admin login. This cannot be undone.',
        okText: 'Empty the app'
      }, function () {
        Store.startFresh();
        window.location.reload();
      });
    };

    return user;
  }

  return { mount: mount, icon: icon, NAV: NAV };
})();
