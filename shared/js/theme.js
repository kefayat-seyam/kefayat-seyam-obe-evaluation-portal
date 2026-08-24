/* ==================================================================
   theme.js — light / dark switching
   ------------------------------------------------------------------
   The chosen theme is written to <html data-theme="..."> and remembered
   in localStorage. theme.css defines both palettes, so flipping this
   one attribute re-colours the whole app.

   Each page also has a one-line copy of "apply the saved theme" in its
   <head>; that runs before anything is painted so the page never
   flashes the wrong colours.
   ================================================================== */

window.Theme = (function () {
  'use strict';

  var KEY = 'obe.theme';

  /** The theme saved from a previous visit, or null. */
  function saved() {
    try {
      var value = localStorage.getItem(KEY);
      return value === 'dark' || value === 'light' ? value : null;
    } catch (err) {
      return null;   // private browsing: fall back to the light theme
    }
  }

  /**
   * What theme are we in? The attribute on <html> is the live answer,
   * because the one-liner in each <head> sets it before paint. If that
   * one-liner is missing from a page we fall back to the saved value, so
   * a new page still opens in the right theme (it may just flash once).
   */
  function current() {
    return document.documentElement.getAttribute('data-theme') || saved() || 'light';
  }

  function apply(name) {
    var theme = name === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem(KEY, theme); } catch (err) { /* ignore */ }
    // Keep every theme button on the page in sync.
    UI.qsa('[data-theme-toggle]').forEach(function (btn) {
      btn.textContent = theme === 'dark' ? '☀' : '☾';
      btn.title = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
    });
    return theme;
  }

  function toggle() {
    return apply(current() === 'dark' ? 'light' : 'dark');
  }

  /** Called once per page: wires up any button marked data-theme-toggle. */
  function init() {
    apply(saved() || current());
    UI.qsa('[data-theme-toggle]').forEach(function (btn) { btn.onclick = toggle; });
  }

  return { init: init, apply: apply, toggle: toggle, current: current, storageKey: KEY };
})();
