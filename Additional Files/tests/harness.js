/* ==================================================================
   harness.js — runs the app's own JavaScript outside a browser
   ------------------------------------------------------------------
   There is no build step and no test framework in this project, so this
   file fakes just enough of a browser (localStorage, document, window)
   to load the real shared/js files and the real page scripts and check
   that they behave.

   Run it with:   node "Additional Files/tests/run-tests.js"
   ================================================================== */

'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..', '..');

/* ---------------- a fake localStorage ---------------- */
function makeStorage() {
  const data = new Map();
  return {
    getItem: (k) => (data.has(k) ? data.get(k) : null),
    setItem: (k, v) => data.set(k, String(v)),
    removeItem: (k) => data.delete(k),
    clear: () => data.clear(),
    get length() { return data.size; },
    _dump: () => Object.fromEntries(data)
  };
}

/* ---------------- a fake element ----------------
   Enough for the pages: innerHTML, textContent, value, classList and
   the on* handlers. Anything the pages do not use is a no-op.

   Three browser behaviours are copied deliberately, because the pages
   rely on them:
     * data-* attributes and .dataset are the same storage
     * filling a <select> with innerHTML selects the first <option>,
       so sel.value is readable straight afterwards
     * HTML written into an element becomes elements that querySelectorAll
       can find, which is how every "Edit"/"Delete" button gets wired */
function makeElement(id, nodes) {
  const attrs = {};
  const el = {
    id: id || '',
    tagName: 'DIV',
    textContent: '',
    value: '',
    checked: false,
    className: '',
    title: '',
    style: {},
    children: [],
    classList: {
      _set: new Set(),
      add(c) { this._set.add(c); },
      remove(c) { this._set.delete(c); },
      contains(c) { return this._set.has(c); },
      toggle(c, on) { if (on === undefined) { this._set.has(c) ? this._set.delete(c) : this._set.add(c); } else if (on) { this._set.add(c); } else { this._set.delete(c); } }
    },
    getAttribute: (k) => (k in attrs ? attrs[k] : null),
    setAttribute: (k, v) => { attrs[k] = String(v); },
    removeAttribute: (k) => { delete attrs[k]; },
    appendChild(child) { this.children.push(child); return child; },
    removeChild(child) { this.children = this.children.filter((c) => c !== child); },
    remove() {},
    focus() {},
    click() { if (typeof this.onclick === 'function') this.onclick({ preventDefault() {} }); },
    addEventListener() {},
    removeEventListener() {},
    querySelector: () => null,
    querySelectorAll: () => [],
    onclick: null, oninput: null, onchange: null, onsubmit: null
  };

  /* .dataset.theme and getAttribute('data-theme') must agree. */
  el.dataset = new Proxy({}, {
    get: (_, key) => attrs['data-' + dashed(key)],
    set: (_, key, value) => { attrs['data-' + dashed(key)] = String(value); return true; },
    has: (_, key) => ('data-' + dashed(key)) in attrs,
    deleteProperty: (_, key) => { delete attrs['data-' + dashed(key)]; return true; }
  });

  let html = '';
  Object.defineProperty(el, 'innerHTML', {
    get: () => html,
    set(value) {
      html = String(value);
      // A real <select> selects its first option (or the one marked
      // selected) as soon as the options exist.
      if (html.indexOf('<option') >= 0) {
        const options = [];
        const re = /<option([^>]*)>/g;
        let m;
        while ((m = re.exec(html)) !== null) {
          const attrText = m[1];
          const val = /value\s*=\s*"([^"]*)"/.exec(attrText);
          options.push({ value: val ? val[1] : '', selected: /\sselected\b/.test(attrText) });
        }
        const chosen = options.filter((o) => o.selected)[0] || options[0];
        if (chosen) el.value = chosen.value;
      }
      // The new markup replaces whatever was there before, so selectors
      // find the buttons that are on screen now and not the old ones.
      if (nodes) nodes.replace(el, html);
    }
  });

  return el;
}

function dashed(key) {
  return String(key).replace(/[A-Z]/g, (c) => '-' + c.toLowerCase());
}

/* ---------------- the elements written as HTML ----------------
   The pages build their rows and buttons as HTML strings and then wire
   them up with UI.qsa('[data-edit]') and friends. For that to work under
   test, something has to turn those strings back into elements. This
   registry keeps one entry per tag that carries an id, a class or a
   data-* attribute, remembers which element it was written into, and
   answers the simple selectors the app actually uses:

       [data-edit]      an attribute is present
       .btn-danger      a class is present
       #rolePick .opt   a class, but only inside that element

   Whenever an element's innerHTML is replaced, its old entries go with
   it — exactly like a real browser. */
function makeNodes(lookupById) {
  const list = [];

  function attributesOf(text) {
    const found = {};
    const re = /([\w:-]+)(?:\s*=\s*"([^"]*)")?/g;
    let m;
    while ((m = re.exec(text)) !== null) found[m[1]] = m[2] === undefined ? '' : m[2];
    return found;
  }

  function parse(owner, html) {
    const made = [];
    const tagRe = /<([a-z][a-z0-9]*)\b([^>]*)>/gi;
    let m;
    while ((m = tagRe.exec(html)) !== null) {
      const attrs = attributesOf(m[2] || '');
      const interesting = attrs.id || attrs.class ||
        Object.keys(attrs).some((k) => k.indexOf('data-') === 0);
      if (!interesting) continue;
      // One element per id, as in a real document.
      const node = attrs.id ? lookupById(attrs.id) : makeElement('');
      node.tagName = m[1].toUpperCase();
      Object.keys(attrs).forEach((k) => node.setAttribute(k, attrs[k]));
      if (attrs.class) {
        node.className = attrs.class;
        attrs.class.split(/\s+/).forEach((c) => { if (c) node.classList.add(c); });
      }
      // The label of a button/cell is the text before the next tag.
      const after = html.slice(m.index + m[0].length);
      node.textContent = (after.split('<')[0] || '').trim();
      node._owner = owner;
      made.push(node);
    }
    return made;
  }

  return {
    list,
    /** Re-reads one element's HTML: its old children go, the new ones appear. */
    replace(owner, html) {
      for (let i = list.length - 1; i >= 0; i -= 1) {
        if (list[i]._owner === owner) list.splice(i, 1);
      }
      parse(owner, html).forEach((n) => list.push(n));
    },
    /** Everything matching one of the selector shapes described above. */
    match(selector) {
      const parts = String(selector).trim().split(/\s+/);
      const target = parts[parts.length - 1];
      const inside = parts.length > 1 && parts[0][0] === '#' ? parts[0].slice(1) : null;
      return list.filter((node) => {
        if (inside && !(node._owner && node._owner.id === inside)) return false;
        if (target[0] === '[') {
          const name = target.slice(1, -1).split('=')[0];
          return node.getAttribute(name) !== null;
        }
        if (target[0] === '.') return node.classList.contains(target.slice(1));
        if (target[0] === '#') return node.id === target.slice(1);
        return node.tagName === target.toUpperCase();
      });
    }
  };
}

/**
 * Builds one shared JS context: the same globals a page would see.
 * storage is reused between loads so navigation can be simulated.
 */
function makeEnv(options) {
  const opts = options || {};
  const storage = opts.storage || makeStorage();
  const logs = { warn: [], error: [], log: [] };
  const elements = new Map();
  const redirects = [];

  const nodes = makeNodes((id) => document.getElementById(id));

  const documentElement = makeElement('html', nodes);

  const document = {
    documentElement,
    body: makeElement('body', nodes),
    title: '',
    getElementById(id) {
      if (!elements.has(id)) elements.set(id, makeElement(id, nodes));
      return elements.get(id);
    },
    createElement(tag) {
      const el = makeElement('', nodes);
      el.tagName = String(tag).toUpperCase();
      return el;
    },
    querySelector: (sel) => nodes.match(sel)[0] || null,
    querySelectorAll: (sel) => nodes.match(sel),
    addEventListener() {},
    removeEventListener() {}
  };

  const location = {
    search: opts.search || '',
    href: opts.href || 'file:///app/index.html',
    replace(url) { redirects.push(url); },
    reload() { redirects.push('[reload]'); }
  };
  // Assigning to window.location.href is a navigation in a real browser.
  Object.defineProperty(location, 'href', {
    get() { return opts.href || 'file:///app/index.html'; },
    set(url) { redirects.push(url); }
  });

  const sandbox = {
    console: {
      warn: (...a) => logs.warn.push(a.join(' ')),
      error: (...a) => logs.error.push(a.join(' ')),
      log: (...a) => logs.log.push(a.join(' '))
    },
    localStorage: storage,
    document,
    navigator: { clipboard: null },
    setTimeout: (fn) => { void fn; return 0; },   // toasts must not keep node alive
    clearTimeout: () => {},
    JSON, Math, Date, parseInt, parseFloat, isNaN, String, Number, Object, Array, RegExp, Error
  };
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;
  sandbox.window.location = location;

  const context = vm.createContext(sandbox);

  function runFile(relPath) {
    const full = path.join(ROOT, relPath);
    const code = fs.readFileSync(full, 'utf8');
    vm.runInContext(code, context, { filename: relPath });
  }

  function runCode(code, label) {
    vm.runInContext(code, context, { filename: label || 'inline' });
  }

  /** Loads the shared library files in the same order the pages do. */
  function loadShared() {
    ['shared/js/seed-courses.js', 'shared/js/seed-data.js', 'shared/js/store.js',
     'shared/js/ui.js', 'shared/js/theme.js', 'shared/js/auth.js', 'shared/js/shell.js']
      .forEach(runFile);
  }

  return {
    sandbox, context, storage, logs, elements, redirects, location, nodes,
    runFile, runCode, loadShared,
    el: (id) => document.getElementById(id),
    /** Makes the page's own markup selectable, as if it had been loaded. */
    mount(html) { nodes.replace(document.body, String(html)); },
    /** Every element matching one of the app's selectors. */
    find: (selector) => nodes.match(selector),
    /** Concatenated innerHTML of every element the page wrote to. */
    renderedHtml() {
      let out = '';
      elements.forEach((el) => { out += (el.innerHTML || '') + '\n' + (el.textContent || '') + '\n'; });
      return out;
    }
  };
}

/* ---------------- driving the pop-up forms ----------------
   The add/edit forms live inside UI.modal(), which builds real DOM
   nodes. Rather than emulate a whole browser, we replace UI.modal with
   a stand-in that:

     * reads the ids out of the form HTML and registers them, with their
       starting values, as elements the page can find with UI.el(...)
     * hands back a small object so a test can type into the fields and
       press OK

   That exercises the part that matters — the validation and the save —
   without needing a real DOM. */
function captureModals(env) {
  const opened = [];
  const UI = env.sandbox.UI;

  UI.modal = function (opts) {
    const fields = readFields(opts.body || '', env);
    const record = {
      title: opts.title || '',
      okText: opts.okText || '',
      fields,
      closed: false,
      /** Type into one field. */
      set(id, value) {
        const el = env.el(id);
        if (typeof value === 'boolean') el.checked = value;
        else el.value = String(value);
        return record;
      },
      /** Press the primary button. Returns true if the form closed. */
      ok() {
        if (!opts.onOk) { record.closed = true; return true; }
        const result = opts.onOk(() => { record.closed = true; }, null);
        if (result !== false) record.closed = true;
        return record.closed;
      },
      /** Whatever error message the form is showing, if any. */
      error(id) {
        return (env.el(id || 'fErr').textContent || '').trim();
      }
    };
    opened.push(record);
    return { close() { record.closed = true; }, root: null };
  };

  UI.confirm = function (opts, onYes) {
    const record = {
      title: opts.title || '', message: opts.message || '',
      isConfirm: true,
      yes() { onYes(); record.closed = true; return true; }
    };
    opened.push(record);
    return { close() {}, root: null };
  };

  return {
    /** The most recent dialog. */
    last() { return opened[opened.length - 1]; },
    all: opened,
    clear() { opened.length = 0; }
  };
}

/** Registers every id in a chunk of form HTML, with its starting value. */
function readFields(html, env) {
  const ids = [];
  const tagRe = /<(input|select|textarea|div|span)([^>]*)>/g;
  let m;
  while ((m = tagRe.exec(html)) !== null) {
    const attrs = m[2];
    const idMatch = /\sid\s*=\s*"([^"]+)"/.exec(attrs);
    if (!idMatch) continue;
    const id = idMatch[1];
    ids.push(id);
    const el = env.el(id);
    // A form that has just been built starts clean, so every field is
    // reset here — otherwise the previous dialog's typing would leak in.
    const valMatch = /\svalue\s*=\s*"([^"]*)"/.exec(attrs);
    el.value = valMatch ? valMatch[1] : '';
    el.checked = /\schecked\b/.test(attrs);
    el.textContent = '';
    const after = html.slice(m.index + m[0].length);
    if (m[1] === 'select') {
      const end = after.indexOf('</select>');
      el.innerHTML = end >= 0 ? after.slice(0, end) : after;   // shim picks the option
    }
    if (m[1] === 'textarea') {
      // A textarea's value is the text between its tags.
      const end = after.indexOf('</textarea>');
      el.value = (end >= 0 ? after.slice(0, end) : '').replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"').trim();
    }
  }
  return ids;
}

/* ---------------- reading a page's inline script ---------------- */

function readPage(relPath) {
  const html = fs.readFileSync(path.join(ROOT, relPath), 'utf8');
  // Comments are stripped first: several pages mention "<script> tags"
  // inside a comment, which would otherwise look like a real script.
  const live = html.replace(/<!--[\s\S]*?-->/g, '');
  const scripts = [];
  const srcs = [];
  const re = /<script([^>]*)>([\s\S]*?)<\/script>/g;
  let m;
  while ((m = re.exec(live)) !== null) {
    const attrs = m[1] || '';
    const srcMatch = /src\s*=\s*"([^"]+)"/.exec(attrs);
    if (srcMatch) srcs.push(srcMatch[1]);
    else scripts.push(m[2]);
  }
  const ids = [];
  const idRe = /\sid\s*=\s*"([^"]+)"/g;
  while ((m = idRe.exec(live)) !== null) ids.push(m[1]);
  const hrefs = [];
  const hrefRe = /\shref\s*=\s*"([^"]+)"/g;
  while ((m = hrefRe.exec(live)) !== null) hrefs.push(m[1]);

  // The page's real markup: no script or style text, because the code
  // inside a <script> talks *about* tags ("data-edit=..."), and mounting
  // those would create buttons that do not exist on screen.
  const markup = live.replace(/<script[\s\S]*?<\/script>/gi, '')
                     .replace(/<style[\s\S]*?<\/style>/gi, '');

  return { html, live, markup, scripts, srcs, ids, hrefs };
}

/* ---------------- the tiny test runner ---------------- */

const results = { passed: 0, failed: 0, failures: [] };

function check(name, condition, detail) {
  if (condition) {
    results.passed += 1;
    console.log('  ✓ ' + name);
  } else {
    results.failed += 1;
    results.failures.push(name + (detail ? ' — ' + detail : ''));
    console.log('  ✗ ' + name + (detail ? '  (' + detail + ')' : ''));
  }
}

function group(title) {
  console.log('\n' + title);
}

function summary() {
  console.log('\n' + '-'.repeat(58));
  console.log(results.failed === 0
    ? `ALL PASSED — ${results.passed} checks`
    : `${results.failed} FAILED of ${results.passed + results.failed} checks`);
  results.failures.forEach((f) => console.log('   ! ' + f));
  return results.failed === 0 ? 0 : 1;
}

module.exports = { ROOT, makeEnv, makeStorage, readPage, captureModals,
                   check, group, summary, results };
