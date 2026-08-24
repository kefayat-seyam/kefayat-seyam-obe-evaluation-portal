/* ==================================================================
   auth.js — login, session and the role guard
   ------------------------------------------------------------------
   There is no server, so "logging in" means: find a user in the Store
   whose email and password match, then remember that user's id in
   localStorage under 'obe.session'.

   Used from the login page:
     Auth.login(email, password, role)   -> { ok, user, error }
     Auth.dashboardPath('admin')         -> 'admin/dashboard.html'

   Used at the top of every page inside /admin, /faculty, /student:
     var me = Auth.requireRole('admin');   // redirects if not allowed

   SECURITY NOTE (worth saying out loud in the demo): this is a
   frontend-only project, so anybody can read the passwords in
   seed-data.js or edit localStorage by hand. The role check below
   stops the wrong *screen* from opening; it is not real security.
   A real deployment would check the role on a server.
   ================================================================== */

window.Auth = (function () {
  'use strict';

  var SESSION_KEY = 'obe.session';

  var ROLES = {
    admin:   { label: 'Admin',   note: 'Department Head', home: 'admin/dashboard.html',   icon: '🛡' },
    faculty: { label: 'Faculty', note: 'Course Teacher',  home: 'faculty/dashboard.html', icon: '🎓' },
    student: { label: 'Student', note: 'Read-only',       home: 'student/dashboard.html', icon: '📖' }
  };

  function readSession() {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
    } catch (err) {
      return null;
    }
  }

  function writeSession(user) {
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify({
        userId: user.id, role: user.role, at: new Date().toISOString()
      }));
    } catch (err) {
      console.warn('Could not save the session:', err);
    }
  }

  /** The logged-in user record, or null. */
  function current() {
    var session = readSession();
    if (!session) return null;
    return Store.get('users', session.userId);
  }

  /** role is optional: pass it to require that the account matches. */
  function login(email, password, role) {
    var wanted = String(email || '').trim().toLowerCase();
    if (!wanted) return { ok: false, error: 'Enter your email address.' };
    if (!password) return { ok: false, error: 'Enter your password.' };

    var user = Store.where('users', function (u) {
      return u.email.toLowerCase() === wanted;
    })[0];

    if (!user) return { ok: false, error: 'No account found with that email.' };
    if (user.password !== password) return { ok: false, error: 'Wrong password. Try again.' };
    if (role && user.role !== role) {
      return { ok: false, error: 'That account is a ' + user.role + ' account, not ' + role + '.' };
    }

    writeSession(user);
    return { ok: true, user: user };
  }

  function logout(loginPath) {
    try { localStorage.removeItem(SESSION_KEY); } catch (err) { /* ignore */ }
    window.location.href = loginPath || '../index.html';
  }

  /* Path from the login page (root) to a role's landing page. */
  function dashboardPath(role) {
    return (ROLES[role] || ROLES.student).home;
  }

  /**
   * Guard for the pages inside /admin, /faculty and /student.
   * Returns the logged-in user, or sends the browser back to the login
   * page. Every role page calls this on its first line.
   */
  function requireRole(role) {
    var user = current();
    if (!user) {
      window.location.replace('../index.html?msg=login-first');
      return null;
    }
    if (user.role !== role) {
      // Logged in, but this screen belongs to another role: send them
      // to their own dashboard instead of showing an error.
      window.location.replace('../' + dashboardPath(user.role));
      return null;
    }
    return user;
  }

  return {
    ROLES: ROLES,
    current: current,
    login: login,
    logout: logout,
    requireRole: requireRole,
    dashboardPath: dashboardPath,
    sessionKey: SESSION_KEY
  };
})();
