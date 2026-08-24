/* ==================================================================
   ui.js — small helpers shared by every page
   ------------------------------------------------------------------
   Nothing clever here on purpose: a text escaper, a toast, a modal
   dialog and a confirm box, plus a couple of formatters.

     UI.esc(text)                     safe text inside HTML
     UI.el(id) / UI.qs(sel)           short document lookups
     UI.toast('Saved')                bottom-right message
     UI.modal({title, body, onOk})    dialog, returns a close() function
     UI.confirm({...}, onYes)         yes/no dialog
     UI.date('2026-08-18')            '18 Aug 2026'
     UI.initials('Nusrat Jahan')      'NJ'
   ================================================================== */

window.UI = (function () {
  'use strict';

  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  /* Anything that came from a user or from the syllabus goes through
     esc() before it is put into innerHTML, so a stray < or & cannot
     break the page. */
  function esc(value) {
    if (value === null || value === undefined) return '';
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function el(id) { return document.getElementById(id); }
  function qs(selector, root) { return (root || document).querySelector(selector); }
  function qsa(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  /* ---------------- toast ---------------- */
  function toast(message, kind) {
    var host = el('toastHost');
    if (!host) {
      host = document.createElement('div');
      host.id = 'toastHost';
      host.className = 'toast-host';
      document.body.appendChild(host);
    }
    var box = document.createElement('div');
    box.className = 'toast' + (kind ? ' is-' + kind : '');
    box.innerHTML = '<span>' + (kind === 'error' ? '⚠' : kind === 'info' ? 'ℹ' : '✓') +
                    '</span><span>' + esc(message) + '</span>';
    host.appendChild(box);
    setTimeout(function () { box.remove(); }, 2600);
  }

  /* ---------------- modal ---------------- */
  /* opts = { title, body (HTML string), okText, cancelText, wide,
              onOk(closeFn), onClose }
     onOk should return false to keep the dialog open (e.g. invalid form). */
  function modal(opts) {
    var back = document.createElement('div');
    back.className = 'modal-back';
    back.innerHTML =
      '<div class="modal' + (opts.wide ? ' wide' : '') + '" role="dialog" aria-modal="true">' +
        '<div class="modal-head">' +
          '<h2>' + esc(opts.title || '') + '</h2>' +
          '<button class="icon-btn" data-close title="Close">✕</button>' +
        '</div>' +
        '<div class="modal-body">' + (opts.body || '') + '</div>' +
        (opts.hideFooter ? '' :
        '<div class="modal-foot">' +
          '<button class="btn" data-close>' + esc(opts.cancelText || 'Cancel') + '</button>' +
          '<button class="btn ' + (opts.danger ? 'btn-danger' : 'btn-primary') + '" data-ok>' +
            esc(opts.okText || 'Save') +
          '</button>' +
        '</div>') +
      '</div>';
    document.body.appendChild(back);
    document.body.style.overflow = 'hidden';

    function close() {
      back.remove();
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      if (opts.onClose) opts.onClose();
    }
    function onKey(ev) { if (ev.key === 'Escape') close(); }

    qsa('[data-close]', back).forEach(function (btn) { btn.onclick = close; });
    back.addEventListener('mousedown', function (ev) { if (ev.target === back) close(); });
    document.addEventListener('keydown', onKey);

    var okBtn = qs('[data-ok]', back);
    if (okBtn && opts.onOk) {
      okBtn.onclick = function () {
        if (opts.onOk(close, back) !== false) close();
      };
    }

    var first = qs('input, select, textarea', back);
    if (first) first.focus();

    return { close: close, root: back };
  }

  /* ---------------- confirm ---------------- */
  function confirm(opts, onYes) {
    return modal({
      title: opts.title || 'Are you sure?',
      body: '<p class="soft">' + esc(opts.message || '') + '</p>',
      okText: opts.okText || 'Delete',
      danger: opts.danger !== false,
      onOk: function () { onYes(); }
    });
  }

  /* ---------------- formatters ---------------- */
  function date(iso) {
    if (!iso) return '—';
    var parts = String(iso).slice(0, 10).split('-');
    if (parts.length !== 3) return iso;
    return Number(parts[2]) + ' ' + MONTHS[Number(parts[1]) - 1] + ' ' + parts[0];
  }

  function today() {
    var d = new Date();
    var m = String(d.getMonth() + 1);
    var day = String(d.getDate());
    return d.getFullYear() + '-' + (m.length < 2 ? '0' + m : m) + '-' +
           (day.length < 2 ? '0' + day : day);
  }

  function initials(name) {
    var words = String(name || '?').replace(/^(Dr|Md|Mr|Mrs|Ms)\.?\s+/i, '').trim().split(/\s+/);
    var first = words[0] ? words[0][0] : '?';
    var last = words.length > 1 ? words[words.length - 1][0] : '';
    return (first + last).toUpperCase();
  }

  /** "1 course" / "4 courses" */
  function plural(count, word, pluralWord) {
    return count + ' ' + (count === 1 ? word : (pluralWord || word + 's'));
  }

  /** Empty-state block for a card body. */
  function emptyState(icon, text, hint) {
    return '<div class="empty"><span class="empty-ico">' + esc(icon) + '</span>' +
           '<div>' + esc(text) + '</div>' +
           (hint ? '<div class="small mt-1">' + esc(hint) + '</div>' : '') + '</div>';
  }

  return {
    esc: esc, el: el, qs: qs, qsa: qsa,
    toast: toast, modal: modal, confirm: confirm,
    date: date, today: today, initials: initials, plural: plural,
    emptyState: emptyState
  };
})();
