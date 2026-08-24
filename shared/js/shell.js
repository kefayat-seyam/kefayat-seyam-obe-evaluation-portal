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
    home:    '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>'
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
      { id: 'copo',      label: 'CO / PO Framework', href: 'co-po.html',       icon: 'target' },
      { group: 'Department' },
      { id: 'faculty',   label: 'Faculty Info',      href: 'faculty-info.html', icon: 'users',    soon: true },
      { id: 'students',  label: 'Students Info',     href: 'students-info.html', icon: 'cap',     soon: true },
      { id: 'series',    label: 'Series / Semester', href: 'series.html',       icon: 'calendar', soon: true },
      { id: 'notices',   label: 'Notices',           href: 'notices.html',      icon: 'bell',     soon: true }
    ],

    faculty: [
      { group: 'Overview' },
      { id: 'dashboard',  label: 'My Dashboard',     href: 'dashboard.html',   icon: 'grid' },
      { group: 'My Courses' },
      { id: 'curriculum', label: 'Curriculum Editor', href: 'curriculum.html', icon: 'pencil' },
      { id: 'copo',       label: 'CO-PO Mapping',     href: 'co-po-mapping.html', icon: 'target' },
      { group: 'Coming in Visit 3' },
      { id: 'marks',      label: 'CT & Exam Marks',   href: 'marks.html',      icon: 'file',     soon: true },
      { id: 'attendance', label: 'Attendance',        href: 'attendance.html', icon: 'calendar', soon: true },
      { id: 'notices',    label: 'Notices',           href: 'notices.html',    icon: 'bell',     soon: true }
    ],

    student: [
      { group: 'Overview' },
      { id: 'dashboard', label: 'My Dashboard',   href: 'dashboard.html', icon: 'grid' },
      { group: 'My Courses' },
      { id: 'syllabus',  label: 'Syllabus',       href: 'syllabus.html',  icon: 'book' },
      { id: 'notices',   label: 'Notices',        href: 'notices.html',   icon: 'bell' },
      { group: 'Coming in Visit 3' },
      { id: 'marks',     label: 'Marks',          href: 'marks.html',      icon: 'file',   soon: true },
      { id: 'attainment',label: 'CO / PO Attainment', href: 'attainment.html', icon: 'target', soon: true },
      { id: 'attendance',label: 'Attendance',     href: 'attendance.html', icon: 'calendar', soon: true }
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
        '<div class="brand-mark">' + UI.esc(dept.shortName) + '</div>' +
        '<div>' +
          '<div class="brand-name">OBE Curriculum</div>' +
          '<div class="brand-sub">' + UI.esc(dept.shortName) + ' · ' + UI.esc(roleInfo.label) + '</div>' +
        '</div>' +
      '</div>' +
      '<nav class="nav">' + links +
        '<div class="nav-group">Session</div>' +
        '<a class="nav-link" href="#" id="resetDataLink">' + icon('refresh') +
          '<span>Reset demo data</span></a>' +
        '<a class="nav-link" href="#" id="logoutLink">' + icon('logout') +
          '<span>Log out</span></a>' +
      '</nav>';

    /* ---- topbar ---- */
    UI.el('topbar').innerHTML =
      '<div>' +
        '<div class="topbar-title">' + UI.esc(opts.title || 'Dashboard') + '</div>' +
        '<div class="topbar-crumb">' + UI.esc(opts.crumb || (dept.shortName + ' · ' + dept.university)) + '</div>' +
      '</div>' +
      '<div class="spacer"></div>' +
      '<button class="icon-btn" data-theme-toggle title="Switch theme">☾</button>' +
      '<div class="who">' +
        '<div class="avatar">' + UI.esc(UI.initials(user.name)) + '</div>' +
        '<div>' +
          '<div class="who-name">' + UI.esc(user.name) + '</div>' +
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

    return user;
  }

  return { mount: mount, icon: icon, NAV: NAV };
})();
