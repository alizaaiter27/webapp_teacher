/* ============================================================
   Zero to Live: app engine
   Content lives in content/*.js; this file only renders it.
   ============================================================ */
(function () {
  'use strict';

  const COURSE = window.COURSE || { modules: [] };
  const GLOSSARY = window.GLOSSARY || [];
  const CHECKLIST = window.CHECKLIST || [];
  const KEY = 'ztl-progress-v1';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const LANG = { html: 'HTML', css: 'CSS', js: 'JavaScript', text: 'Text', bash: 'Terminal' };
  const PRAISE = ['Correct!', 'Nailed it!', 'Exactly right!', 'Yes, well done!', 'Spot on!'];

  /* ---------- Inline formatting for content strings ----------
     {{code}}  → <code>code</code>
     **bold**  → <strong>
     *italic*  → <em>
     [text](url) → link                                        */
  function fmt(s) {
    if (s == null) return '';
    const codes = [];
    let out = String(s).replace(/\{\{([\s\S]+?)\}\}(?!\})/g, (_, c) => { codes.push(c); return '\u0000' + (codes.length - 1) + '\u0000'; });
    out = esc(out)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|[\s(“])\*([^*\s][^*]*?)\*(?=[\s.,;:!?)”]|$)/g, '$1<em>$2</em>')
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, u) =>
        `<a href="${u}"${/^https?:/.test(u) ? ' target="_blank" rel="noopener"' : ''}>${t}</a>`);
    return out.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${esc(codes[i])}</code>`);
  }
  const clean = (code) => String(code || '').replace(/^\n/, '').replace(/\s+$/, '');

  /* ---------- Saved progress ---------- */
  function defaults() {
    return { completed: {}, quiz: {}, exercises: {}, checklist: {}, celebrated: {}, last: null, theme: null };
  }
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return Object.assign(defaults(), JSON.parse(raw));
    } catch (e) { /* storage unavailable: start fresh */ }
    return defaults();
  }
  let state = load();
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
  }

  /* ---------- Course index ---------- */
  const modules = COURSE.modules;
  const units = [];
  modules.forEach((m, mi) => {
    m.num = mi + 1;
    if (m.status !== 'ready') return;
    m.lessons.forEach((l, li) => {
      l.num = `${mi + 1}.${li + 1}`;
      units.push({ id: l.id, kind: 'lesson', module: m, lesson: l, route: '#/lesson/' + l.id, title: l.title });
    });
    units.push({ id: m.id + '-review', kind: 'review', module: m, route: '#/review/' + m.id, title: `Module ${m.num} checkpoint` });
  });
  const unitById = Object.fromEntries(units.map((u) => [u.id, u]));

  function progress() {
    const done = units.filter((u) => state.completed[u.id]).length;
    return { done, total: units.length, pct: units.length ? Math.round((done * 100) / units.length) : 0 };
  }
  function moduleProgress(m) {
    const us = units.filter((u) => u.module === m);
    const done = us.filter((u) => state.completed[u.id]).length;
    return { done, total: us.length, complete: us.length > 0 && done === us.length };
  }
  function nextUnit() {
    if (state.last && unitById[state.last] && !state.completed[state.last]) return unitById[state.last];
    return units.find((u) => !state.completed[u.id]) || null;
  }

  function complete(id) {
    if (state.completed[id]) return;
    const u = unitById[id];
    if (!u) return;
    state.completed[id] = Date.now();
    const msgs = [];
    let big = false;
    if (u.kind === 'lesson' && u.lesson.milestone) { msgs.push(u.lesson.milestone); big = true; }
    else msgs.push(u.kind === 'review' ? `Checkpoint done! You put Module ${u.module.num} into practice. 💪` : pick(['Lesson complete! Nice work. ✓', 'Another one done! ✓', 'Lesson complete. Keep the momentum going! ✓']));
    if (moduleProgress(u.module).complete) { msgs.push(`Module ${u.module.num} complete: ${u.module.title}! 🎉`); big = true; }
    const p = progress().pct;
    [25, 50, 75, 100].forEach((t) => {
      if (p >= t && !state.celebrated[t]) {
        state.celebrated[t] = 1;
        msgs.push(t === 100 ? "You've finished every lesson! 🏆" : `You're ${t}% of the way through! 🚀`);
        big = true;
      }
    });
    save();
    celebrate(msgs, big);
    updateChrome();
  }

  /* ============================================================
     Syntax highlighting (small, dependency-free)
     ============================================================ */
  const span = (cls, s) => `<span class="t-${cls}">${esc(s)}</span>`;
  function tokenize(src, rules) {
    let out = '', i = 0;
    outer: while (i < src.length) {
      for (const [re, cls] of rules) {
        re.lastIndex = i;
        const m = re.exec(src);
        if (m && m[0].length) {
          out += typeof cls === 'function' ? cls(m[0]) : cls ? span(cls, m[0]) : esc(m[0]);
          i += m[0].length;
          continue outer;
        }
      }
      out += esc(src[i]);
      i++;
    }
    return out;
  }
  const ATTR_RULES = [
    [/\s+/y, null],
    [/"[^"]*"?|'[^']*'?/y, 'str'],
    [/=/y, 'pun'],
    [/[^\s="'>\/]+/y, 'attr'],
  ];
  function hlTag(t) {
    const m = /^(<\/?)([\w-]+)([\s\S]*?)(\/?>)?$/.exec(t);
    if (!m) return esc(t);
    return span('pun', m[1]) + span('tag', m[2]) + tokenize(m[3], ATTR_RULES) + (m[4] ? span('pun', m[4]) : '');
  }
  const HTML_RULES = [
    [/<!--[\s\S]*?(-->|$)/y, 'com'],
    [/<!DOCTYPE[^>]*>?/iy, 'kw'],
    [/<\/?[a-zA-Z][\w-]*(?:\s+[^\s=>\/]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?)*\s*\/?>?/y, hlTag],
    [/&[#\w]+;/y, 'ent'],
    [/[^<&]+/y, null],
  ];
  function hlCssValue(v) {
    return tokenize(v, [
      [/"[^"]*"|'[^']*'/y, 'str'],
      [/#[0-9a-fA-F]{3,8}\b/y, 'num'],
      [/-?\d*\.?\d+(px|rem|em|%|vh|vw|vmin|vmax|s|ms|fr|deg|ch)?/y, 'num'],
      [/[\w-]+(?=\()/y, 'fn'],
      [/[:;,()]/y, 'pun'],
      [/[^"'#\d:;,()-]+|-/y, null],
    ]);
  }
  const CSS_RULES = [
    [/\/\*[\s\S]*?(\*\/|$)/y, 'com'],
    [/@[\w-]+/y, 'kw'],
    [/[\w-]+(?=\s*:[^;{}]*[;}])/y, 'prop'],
    [/:[^;{}]*(?=[;}])/y, (v) => span('pun', ':') + hlCssValue(v.slice(1))],
    [/[^{};\/\s][^{};\/]*(?=\{)/y, 'sel'],
    [/[{};]/y, 'pun'],
    [/\s+/y, null],
  ];
  const JS_RULES = [
    [/\/\/[^\n]*/y, 'com'],
    [/\/\*[\s\S]*?(\*\/|$)/y, 'com'],
    [/"(?:\\.|[^"\\\n])*"?|'(?:\\.|[^'\\\n])*'?|`(?:\\.|[^`\\])*`?/y, 'str'],
    [/\b(?:const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|true|false|null|undefined|new|class|this|of|in|typeof|async|await|import|export|from|default|try|catch)\b/y, 'kw'],
    [/\b\d+(\.\d+)?\b/y, 'num'],
    [/[A-Za-z_$][\w$]*(?=\s*\()/y, 'fn'],
    [/[A-Za-z_$][\w$]*/y, null],
    [/=>|[{}()[\];,.]/y, 'pun'],
    [/\s+/y, null],
  ];
  function highlight(code, lang) {
    if (lang === 'html') return tokenize(code, HTML_RULES);
    if (lang === 'css') return tokenize(code, CSS_RULES);
    if (lang === 'js') return tokenize(code, JS_RULES);
    if (lang === 'bash') return tokenize(code, [[/#[^\n]*/y, 'com'], [/[^#]+/y, null]]);
    return esc(code);
  }

  /* ============================================================
     Content blocks
     ============================================================ */
  function callout(kind, icon, title, text) {
    return `<div class="callout ${kind}"><span class="ico" aria-hidden="true">${icon}</span><div><span class="c-title">${fmt(title)}</span><p>${fmt(text)}</p></div></div>`;
  }
  function codeBlock(code, lang, file) {
    return `<figure class="code"><figcaption><span>${esc(file || LANG[lang] || lang)}</span><button class="copy" type="button">Copy</button></figcaption><pre><code>${highlight(clean(code), lang)}</code></pre></figure>`;
  }
  function renderBlock(b) {
    switch (b.type) {
      case 'p': return `<p>${fmt(b.text)}</p>`;
      case 'h': return `<h2>${fmt(b.text)}</h2>`;
      case 'list': {
        const t = b.ordered ? 'ol' : 'ul';
        return `<${t} class="prose-list">${b.items.map((i) => `<li>${fmt(i)}</li>`).join('')}</${t}>`;
      }
      case 'analogy': return callout('analogy', '💡', b.title || 'Think of it like this', b.text);
      case 'tip': return callout('tip', '✨', b.title || 'Tip', b.text);
      case 'warn': return callout('warn', '⚠️', b.title || 'Watch out', b.text);
      case 'code': return codeBlock(b.code, b.lang, b.file);
      case 'steps':
        return `<ol class="steps">${b.items.map((s, i) => `<li><span class="step-n">${i + 1}</span><div><strong>${fmt(s.title)}</strong>${s.text ? `<p>${fmt(s.text)}</p>` : ''}</div></li>`).join('')}</ol>`;
      case 'html': return b.html;
      case 'try': return editorHTML(b);
      case 'sim': return simHTML(b);
      default: return '';
    }
  }

  /* ============================================================
     Live editor
     ============================================================ */
  let edSeq = 0;
  const editors = {};
  function editorHTML(cfg) {
    const id = 'ed' + (++edSeq);
    editors[id] = { cfg };
    const active = cfg.focus || 'html';
    const tabs = ['html', 'css', 'js'];
    return `<section class="try" id="${id}" aria-label="Try it: live code editor">
      <header class="try-head">
        <div><span class="try-badge">Try it</span> <strong>${fmt(cfg.title || 'Your turn')}</strong></div>
        <div class="try-actions">
          <button type="button" class="btn-ghost sm" data-act="reset" title="Put the original code back">↺ Reset</button>
          <button type="button" class="btn sm" data-act="run" title="Re-run the preview">▶ Run</button>
        </div>
      </header>
      ${cfg.prompt ? `<p class="try-prompt">${fmt(cfg.prompt)}</p>` : ''}
      <div class="try-body">
        <div class="try-code">
          <div class="tabs" role="tablist" aria-label="Code language">
            ${tabs.map((k) => `<button type="button" role="tab" data-tab="${k}" aria-selected="${k === active}">${LANG[k]}</button>`).join('')}
          </div>
          ${tabs.map((k) => `<div class="ed-pane" data-pane="${k}" role="tabpanel"${k === active ? '' : ' hidden'}>
            <pre class="ed-hl" aria-hidden="true"><code></code></pre>
            <textarea spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" wrap="off" data-lang="${k}" aria-label="${LANG[k]} code (press Esc then Tab to leave the editor)"></textarea>
          </div>`).join('')}
        </div>
        <div class="try-out">
          <div class="out-head"><span class="dots" aria-hidden="true"><i></i><i></i><i></i></span> Live preview</div>
          <iframe title="Live preview of your code" sandbox="allow-scripts allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox"></iframe>
          <div class="console" hidden><div class="console-head"><span>Console</span><button type="button" data-act="clear">Clear</button></div><div class="console-body" role="log"></div></div>
        </div>
      </div>
    </section>`;
  }

  // Runs inside the preview: forwards console output, keeps links/forms inside the sandbox.
  function helperScript(id) {
    return `<script>(function(){var ID=${JSON.stringify(id)};
function send(t,a){try{parent.postMessage({ztl:ID,type:t,text:Array.prototype.map.call(a,function(x){if(typeof x==='object'&&x!==null){try{return JSON.stringify(x)}catch(e){}}return String(x)}).join(' ')},'*')}catch(e){}}
['log','info','warn','error'].forEach(function(k){var o=console[k];console[k]=function(){send(k,arguments);if(o)o.apply(console,arguments)}});
window.addEventListener('error',function(e){send('error',[e.message||'Something went wrong in your JavaScript'])});
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href]');if(!a)return;var h=a.getAttribute('href')||'';
if(h.charAt(0)==='#'){e.preventDefault();var t=h.length>1&&document.getElementById(h.slice(1));if(t)t.scrollIntoView({behavior:'smooth'});return}
if(/^(https?:)?\\/\\//i.test(h)){a.target='_blank';a.rel='noopener';return}
e.preventDefault();if(/^mailto:/i.test(h)){send('info',['📧 This link would open your email app to write to '+h.slice(7)]);return}
if(/^tel:/i.test(h)){send('info',['📞 This link would call '+h.slice(4)]);return}
send('info',['🔗 On a real website, this link would open "'+h+'"'])});
document.addEventListener('submit',function(e){e.preventDefault();var d=[];try{new FormData(e.target).forEach(function(v,k){d.push(k+' = '+v)})}catch(x){}
send('info',['✅ Form submitted! On a live site this would be sent to a server:'+(d.length?' '+d.join(' | '):' (no fields had a name attribute)')])});
})();<\/script>`;
  }
  function buildDoc(html, css, js, id) {
    const helper = helperScript(id);
    const style = css.trim() ? `<style>\n${css}\n</style>` : '';
    const script = js.trim() ? `<script>\n${js.replace(/<\/script/gi, '<\\/script')}\n<\/script>` : '';
    if (/<html[\s>]/i.test(html)) {
      let doc = html;
      doc = /<head[^>]*>/i.test(doc) ? doc.replace(/<head[^>]*>/i, (m) => m + helper) : doc.replace(/<html[^>]*>/i, (m) => m + helper);
      doc = /<\/head>/i.test(doc) ? doc.replace(/<\/head>/i, () => style + '</head>') : doc + style;
      doc = /<\/body>/i.test(doc) ? doc.replace(/<\/body>/i, () => script + '</body>') : doc + script;
      return doc;
    }
    return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">${helper}${style}</head><body>${html}${script}</body></html>`;
  }

  function mountEditors(root) {
    $$('.try', root).forEach((el) => {
      const ed = editors[el.id];
      if (!ed || ed.mounted) return;
      ed.mounted = true;
      const cfg = ed.cfg;
      const tas = {};
      const frame = $('iframe', el);
      let timer;

      const run = () => {
        $('.console-body', el).innerHTML = '';
        $('.console', el).hidden = true;
        frame.srcdoc = buildDoc(tas.html.value, tas.css.value, tas.js.value, el.id);
      };
      const schedule = () => { clearTimeout(timer); timer = setTimeout(run, 350); };

      $$('textarea', el).forEach((ta) => {
        const k = ta.dataset.lang;
        const pre = ta.previousElementSibling;
        const codeEl = pre.firstElementChild;
        tas[k] = ta;
        ta.value = clean(cfg[k]);
        ta._sync = () => { codeEl.innerHTML = highlight(ta.value, k) + '\n\n'; pre.scrollTop = ta.scrollTop; pre.scrollLeft = ta.scrollLeft; };
        ta._sync();
        ta.addEventListener('input', () => { ta._sync(); schedule(); });
        ta.addEventListener('scroll', () => { pre.scrollTop = ta.scrollTop; pre.scrollLeft = ta.scrollLeft; });
        ta.addEventListener('blur', () => { delete ta.dataset.escaped; });
        ta.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') { ta.dataset.escaped = '1'; return; }
          if (e.key === 'Tab' && !e.shiftKey && !ta.dataset.escaped) {
            e.preventDefault();
            const s = ta.selectionStart, en = ta.selectionEnd;
            ta.setRangeText('  ', s, en, 'end');
            ta._sync(); schedule();
          }
          if (e.key === 'Enter' && !e.isComposing) {
            // keep the current line's indentation
            const s = ta.selectionStart;
            const line = ta.value.slice(0, s).split('\n').pop();
            const indent = (line.match(/^\s*/) || [''])[0];
            if (indent) { e.preventDefault(); ta.setRangeText('\n' + indent, s, ta.selectionEnd, 'end'); ta._sync(); schedule(); }
          }
        });
      });

      $$('[role="tab"]', el).forEach((tab) => tab.addEventListener('click', () => {
        $$('[role="tab"]', el).forEach((t) => t.setAttribute('aria-selected', String(t === tab)));
        $$('.ed-pane', el).forEach((p) => { p.hidden = p.dataset.pane !== tab.dataset.tab; });
        const ta = tas[tab.dataset.tab];
        ta._sync();
        ta.focus({ preventScroll: true });
      }));
      $('[data-act="run"]', el).addEventListener('click', run);
      $('[data-act="reset"]', el).addEventListener('click', () => {
        Object.keys(tas).forEach((k) => { tas[k].value = clean(cfg[k]); tas[k]._sync(); });
        run();
        toast('Code reset to the original. ↺');
      });
      $('[data-act="clear"]', el).addEventListener('click', () => { $('.console-body', el).innerHTML = ''; $('.console', el).hidden = true; });
      run();
    });
    mountSims(root);
  }

  /* ============================================================
     Git terminal simulator
     A pretend terminal that understands the Git commands taught
     in Module 8. Nothing touches the real computer.
     ============================================================ */
  const sims = {};
  function simHTML(cfg) {
    const id = 'sim' + (++edSeq);
    sims[id] = { cfg };
    return `<section class="try sim" id="${id}" aria-label="Practice terminal">
      <header class="try-head">
        <div><span class="try-badge">Try it</span> <strong>${fmt(cfg.title || 'Practice terminal')}</strong></div>
        <div class="try-actions"><button type="button" class="btn-ghost sm" data-act="sim-reset">↺ Start over</button></div>
      </header>
      ${cfg.prompt ? `<p class="try-prompt">${fmt(cfg.prompt)}</p>` : ''}
      <div class="sim-body">
        <div class="term">
          <div class="term-out" role="log" aria-live="polite"></div>
          <form class="term-line" autocomplete="off">
            <label class="ps" for="${id}-in">~/my-website <span class="ps-branch"></span>$</label>
            <input id="${id}-in" type="text" spellcheck="false" autocapitalize="off" autocorrect="off" placeholder="type a command, e.g. git status">
          </form>
        </div>
        <aside class="sim-side">
          <h4>📁 Files</h4><ul class="sim-files"></ul>
          <h4>🌿 Branch <span class="sim-branch"></span></h4><ol class="sim-commits"></ol>
          ${cfg.tasks ? `<h4>🎯 Tasks</h4><ul class="sim-tasks"></ul>` : ''}
        </aside>
      </div>
    </section>`;
  }

  function newRepoState(start) {
    start = start || {};
    const st = {
      repo: !!start.repo, branch: 'main', branches: { main: [] },
      files: Object.assign({}, start.files || { 'index.html': 1, 'styles.css': 1 }),
      staged: {}, remote: null, pushed: {}, user: null, flags: {}, seq: 0,
    };
    (start.commits || []).forEach((msg) => {
      const snap = Object.assign({}, st.files);
      st.branches.main.push({ id: fakeHash(st, msg), msg, files: snap });
    });
    if (start.remote) { st.remote = start.remote; st.pushed.main = (st.branches.main.slice(-1)[0] || {}).id; }
    if (start.user) st.user = start.user;
    return st;
  }
  function fakeHash(st, msg) { st.seq++; return (hash(msg + st.seq) >>> 0).toString(16).padStart(8, '0').slice(0, 7); }

  function mountSims(root) {
    $$('.sim', root).forEach((el) => {
      const sim = sims[el.id];
      if (!sim || sim.mounted) return;
      sim.mounted = true;
      const cfg = sim.cfg;
      const out = $('.term-out', el), input = $('input', el);
      let st, history = [], hIdx = 0;

      const line = (text, cls) => {
        const d = document.createElement('div');
        d.className = 'tl' + (cls ? ' ' + cls : '');
        d.textContent = text;
        out.appendChild(d);
      };
      const snapshot = () => { const c = st.branches[st.branch].slice(-1)[0]; return c ? c.files : {}; };
      const statusOf = (name) => {
        const snap = snapshot();
        if (st.staged[name] !== undefined) return snap[name] === undefined ? 'new' : 'staged';
        if (snap[name] === undefined) return 'untracked';
        return st.files[name] !== snap[name] ? 'modified' : 'clean';
      };
      const dirty = () => Object.keys(st.files).some((f) => statusOf(f) !== 'clean');

      function render() {
        $('.ps-branch', el).textContent = st.repo ? `(${st.branch}) ` : '';
        const LBL = { untracked: ['U', 'untracked'], modified: ['M', 'modified'], new: ['A', 'staged (new)'], staged: ['M', 'staged'], clean: ['✓', 'saved in a commit'] };
        $('.sim-files', el).innerHTML = Object.keys(st.files).sort().map((f) => {
          const s = st.repo ? statusOf(f) : 'plain';
          const [b, t] = LBL[s] || ['·', 'not tracked (no repository yet)'];
          return `<li class="fs-${s}"><span class="fs-badge" title="${t}">${b}</span><code>${esc(f)}</code><small>${t}</small></li>`;
        }).join('');
        $('.sim-branch', el).textContent = st.repo ? st.branch : '(no repository)';
        const commits = st.branches[st.branch] || [];
        $('.sim-commits', el).innerHTML = commits.length
          ? commits.slice().reverse().map((c) => `<li><code>${c.id}</code> ${esc(c.msg)}${st.pushed[st.branch] === c.id ? ' <span class="pill accent">origin</span>' : ''}</li>`).join('')
          : `<li class="dim">No commits yet</li>`;
        if (cfg.tasks) {
          $('.sim-tasks', el).innerHTML = cfg.tasks.map(([text, flag]) => `<li class="${st.flags[flag] ? 'done' : ''}"><span class="tick" aria-hidden="true">✓</span>${fmt(text)}</li>`).join('');
        }
      }
      function flag(name) {
        if (st.flags[name]) return;
        st.flags[name] = true;
        if (cfg.tasks && cfg.tasks.every(([, f]) => st.flags[f])) setTimeout(() => toast('All terminal tasks done! You’re getting the hang of Git. 🌿', true), 150);
      }
      function parse(cmd) {
        const args = [];
        cmd.replace(/"([^"]*)"|'([^']*)'|(\S+)/g, (_, a, b, c) => { args.push(a !== undefined ? a : b !== undefined ? b : c); });
        return args;
      }
      const needRepo = () => { if (!st.repo) { line('fatal: not a git repository. Run “git init” first.', 'err'); return false; } return true; };

      function git(a) {
        const sub = a[0];
        switch (sub) {
          case undefined: case 'help': case '--help':
            line('Commands this simulator understands:', 'dim');
            ['git init', 'git status', 'git add <file>   (or git add .)', 'git commit -m "message"', 'git log   (or git log --oneline)', 'git diff', 'git branch [name]', 'git switch <name>   /  git switch -c <name>', 'git checkout <name> / git checkout -b <name>', 'git merge <name>', 'git remote add origin <url>', 'git push -u origin main', 'git config --global user.name "Your Name"']
              .forEach((t) => line('  ' + t, 'dim'));
            return;
          case '--version': case 'version': line('git version 2.47.0'); return;
          case 'config': {
            const i = a.indexOf('user.name'), j = a.indexOf('user.email');
            if (i > -1 && a[i + 1]) { st.user = a[i + 1]; flag('config'); return; }
            if (j > -1 && a[j + 1]) { st.email = a[j + 1]; flag('config'); return; }
            if (i > -1) { line(st.user || '(not set)'); return; }
            line('usage: git config --global user.name "Your Name"', 'dim');
            return;
          }
          case 'init':
            if (st.repo) { line('Reinitialized existing Git repository in ~/my-website/.git/'); return; }
            st.repo = true; flag('init');
            line('Initialized empty Git repository in ~/my-website/.git/', 'ok');
            return;
        }
        if (!needRepo()) return;
        switch (sub) {
          case 'status': {
            line(`On branch ${st.branch}`);
            const files = Object.keys(st.files).sort();
            const staged = files.filter((f) => ['new', 'staged'].includes(statusOf(f)));
            const mod = files.filter((f) => statusOf(f) === 'modified');
            const un = files.filter((f) => statusOf(f) === 'untracked');
            if (!st.branches[st.branch].length) line('No commits yet');
            if (staged.length) { line('Changes to be committed:'); staged.forEach((f) => line(`        ${statusOf(f) === 'new' ? 'new file' : 'modified'}:   ${f}`, 'ok')); }
            if (mod.length) { line('Changes not staged for commit:'); line('  (use "git add <file>..." to stage them)', 'dim'); mod.forEach((f) => line(`        modified:   ${f}`, 'err')); }
            if (un.length) { line('Untracked files:'); line('  (use "git add <file>..." to include in what will be committed)', 'dim'); un.forEach((f) => line(`        ${f}`, 'err')); }
            if (!staged.length && !mod.length && !un.length) line('nothing to commit, working tree clean', 'ok');
            flag('status');
            return;
          }
          case 'add': {
            const targets = a.slice(1);
            if (!targets.length) { line('Nothing specified, nothing added. Try “git add .” or “git add index.html”.', 'err'); return; }
            const all = targets.some((t) => t === '.' || t === '-A' || t === '--all');
            const names = all ? Object.keys(st.files) : targets;
            for (const n of names) {
              if (!(n in st.files)) { line(`fatal: pathspec '${n}' did not match any files`, 'err'); return; }
              if (statusOf(n) !== 'clean') st.staged[n] = st.files[n];
            }
            flag('add');
            return;
          }
          case 'commit': {
            const m = a.indexOf('-m');
            if (m === -1 || !a[m + 1]) { line('In this simulator, add a message: git commit -m "Describe your change"', 'err'); return; }
            if (!Object.keys(st.staged).length) {
              line(dirty() ? 'no changes added to commit (use "git add" first)' : 'nothing to commit, working tree clean', 'err');
              return;
            }
            const files = Object.assign({}, snapshot(), st.staged);
            const c = { id: fakeHash(st, a[m + 1]), msg: a[m + 1], files };
            st.branches[st.branch].push(c);
            const n = Object.keys(st.staged).length;
            st.staged = {};
            line(`[${st.branch} ${c.id}] ${c.msg}`, 'ok');
            line(` ${n} file${n === 1 ? '' : 's'} changed`);
            flag('commit');
            if (st.branches[st.branch].length >= 3 || Object.values(st.branches).reduce((x, b) => x + b.length, 0) >= 3) flag('commit3');
            if (st.branch !== 'main') flag('branchcommit');
            return;
          }
          case 'log': {
            const cs = st.branches[st.branch].slice().reverse();
            if (!cs.length) { line(`fatal: your current branch '${st.branch}' does not have any commits yet`, 'err'); return; }
            const one = a.includes('--oneline');
            cs.forEach((c, i) => {
              if (one) { line(`${c.id}${i === 0 ? ` (HEAD -> ${st.branch})` : ''} ${c.msg}`, i === 0 ? 'ok' : ''); return; }
              line(`commit ${c.id}${i === 0 ? ` (HEAD -> ${st.branch})` : ''}`, 'warn');
              line(`Author: ${st.user || 'You'} <${st.email || 'you@example.com'}>`);
              line('');
              line('    ' + c.msg);
              line('');
            });
            flag('log');
            return;
          }
          case 'diff': {
            const ch = Object.keys(st.files).filter((f) => statusOf(f) === 'modified');
            if (!ch.length) { line('(no unstaged changes)', 'dim'); return; }
            ch.forEach((f) => { line(`diff --git a/${f} b/${f}`, 'warn'); line(`- version ${snapshot()[f]} of ${f}`, 'err'); line(`+ version ${st.files[f]} of ${f}`, 'ok'); });
            return;
          }
          case 'branch': {
            const name = a[1];
            if (!name || name === '-a' || name === '--list') {
              Object.keys(st.branches).forEach((b) => line(`${b === st.branch ? '* ' : '  '}${b}`, b === st.branch ? 'ok' : ''));
              return;
            }
            if (name === '-d' || name === '-D') {
              const b = a[2];
              if (!st.branches[b]) { line(`error: branch '${b}' not found`, 'err'); return; }
              if (b === st.branch) { line(`error: cannot delete the branch you are on`, 'err'); return; }
              delete st.branches[b]; line(`Deleted branch ${b}.`); return;
            }
            if (!st.branches[st.branch].length) { line(`fatal: make your first commit before creating branches`, 'err'); return; }
            if (st.branches[name]) { line(`fatal: a branch named '${name}' already exists`, 'err'); return; }
            st.branches[name] = st.branches[st.branch].slice();
            flag('branch');
            return;
          }
          case 'switch': case 'checkout': {
            const create = a[1] === '-c' || a[1] === '-b';
            const name = create ? a[2] : a[1];
            if (!name) { line(`usage: git ${sub} <branch>`, 'err'); return; }
            if (create) {
              if (st.branches[name]) { line(`fatal: a branch named '${name}' already exists`, 'err'); return; }
              if (!st.branches[st.branch].length) { line(`fatal: make your first commit before creating branches`, 'err'); return; }
              st.branches[name] = st.branches[st.branch].slice();
              flag('branch');
            } else if (!st.branches[name]) { line(`error: no branch named '${name}'. Create it with: git ${sub} ${sub === 'switch' ? '-c' : '-b'} ${name}`, 'err'); return; }
            if (name === st.branch && !create) { line(`Already on '${name}'`); return; }
            if (dirty() && Object.keys(st.files).some((f) => ['modified', 'staged', 'new'].includes(statusOf(f)))) {
              line('error: you have uncommitted changes. Commit them first (git add + git commit).', 'err'); return;
            }
            st.branch = name;
            const snap = snapshot();
            Object.keys(st.files).forEach((f) => { if (statusOf(f) !== 'untracked' && snap[f] === undefined) delete st.files[f]; });
            Object.assign(st.files, snap);
            line(`Switched to ${create ? 'a new ' : ''}branch '${name}'`, 'ok');
            if (name !== 'main') flag('switch');
            return;
          }
          case 'merge': {
            const other = a[1];
            if (!st.branches[other]) { line(`merge: ${other || '(nothing)'} - not something we can merge`, 'err'); return; }
            const mine = st.branches[st.branch], theirs = st.branches[other];
            const mineIds = new Set(mine.map((c) => c.id));
            const extra = theirs.filter((c) => !mineIds.has(c.id));
            if (!extra.length) { line('Already up to date.'); return; }
            const ff = mine.every((c, i) => theirs[i] && theirs[i].id === c.id);
            if (ff) {
              st.branches[st.branch] = theirs.slice();
              line(`Updating ${mine.slice(-1)[0].id}..${theirs.slice(-1)[0].id}`);
              line('Fast-forward', 'ok');
            } else {
              const files = Object.assign({}, snapshot(), theirs.slice(-1)[0].files);
              const msg = `Merge branch '${other}'`;
              st.branches[st.branch] = mine.concat(extra, [{ id: fakeHash(st, msg), msg, files }]);
              line(`Merge made by the 'ort' strategy.`, 'ok');
            }
            Object.assign(st.files, snapshot());
            extra.forEach((c) => line(`  ${c.id} ${c.msg}`, 'dim'));
            flag('merge');
            return;
          }
          case 'remote': {
            if (a[1] === 'add' && a[2] && a[3]) { st.remote = a[3]; line(''); flag('remote'); return; }
            if (a[1] === '-v' || !a[1]) {
              if (!st.remote) { line('(no remotes yet)', 'dim'); return; }
              line(`origin  ${st.remote} (fetch)`); line(`origin  ${st.remote} (push)`); return;
            }
            line('usage: git remote add origin https://github.com/you/my-website.git', 'err');
            return;
          }
          case 'push': {
            if (!st.remote) { line(`fatal: No configured push destination. Add one with: git remote add origin <url>`, 'err'); return; }
            const cs = st.branches[st.branch];
            if (!cs.length) { line(`error: src refspec ${st.branch} does not match any (make a commit first)`, 'err'); return; }
            const last = cs.slice(-1)[0].id;
            if (st.pushed[st.branch] === last) { line('Everything up-to-date'); return; }
            line(`Enumerating objects: ${cs.length * 3}, done.`, 'dim');
            line(`Writing objects: 100% (${cs.length * 3}/${cs.length * 3}), done.`, 'dim');
            line(`To ${st.remote}`);
            line(`   ${st.pushed[st.branch] ? st.pushed[st.branch] + '..' + last : '* [new branch]'}   ${st.branch} -> ${st.branch}`, 'ok');
            st.pushed[st.branch] = last;
            flag('push');
            return;
          }
          case 'pull': line('Already up to date.'); return;
          case 'clone': line('In this simulator you already have a project. (Cloning copies a repository from GitHub to your computer.)', 'dim'); return;
          default:
            line(`git: '${sub}' is not a git command this simulator knows. Type “git help”.`, 'err');
        }
      }

      function exec(raw) {
        const cmd = raw.trim();
        line(`~/my-website ${st.repo ? `(${st.branch}) ` : ''}$ ${cmd}`, 'cmd');
        if (!cmd) return;
        const a = parse(cmd);
        const prog = a.shift();
        switch (prog) {
          case 'git': git(a); break;
          case 'help': line('Try: ls, edit <file>, touch <file>, clear, and any git command (type “git help”).', 'dim'); break;
          case 'clear': out.innerHTML = ''; break;
          case 'ls': line(Object.keys(st.files).sort().join('   ')); flag('ls'); break;
          case 'pwd': line('/Users/you/my-website'); break;
          case 'touch': case 'edit': case 'code': {
            const f = a[0];
            if (!f) { line(`usage: ${prog} <file>`, 'err'); break; }
            const existed = f in st.files;
            if (prog === 'touch' && existed) break;
            st.files[f] = existed ? st.files[f] + 1 : 1;
            line(existed ? `✏️  You edited ${f} and saved it (pretend!).` : `📄 Created ${f}.`, 'dim');
            flag('edit');
            break;
          }
          case 'rm': {
            const f = a[0];
            if (!(f in st.files)) { line(`rm: ${f}: No such file`, 'err'); break; }
            delete st.files[f]; delete st.staged[f]; break;
          }
          case 'cd': line('In this simulator you stay inside ~/my-website.', 'dim'); break;
          default: line(`command not found: ${prog}. Type “help” to see what you can try.`, 'err');
        }
      }

      function reset() {
        st = newRepoState(cfg.start);
        out.innerHTML = '';
        line(cfg.welcome || 'Welcome to the practice terminal! Type “help” to see what you can do.', 'dim');
        render();
      }
      $('form', el).addEventListener('submit', (e) => {
        e.preventDefault();
        const v = input.value;
        if (v.trim()) { history.push(v); hIdx = history.length; }
        input.value = '';
        exec(v);
        render();
        out.scrollTop = out.scrollHeight;
      });
      input.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp' && hIdx > 0) { e.preventDefault(); input.value = history[--hIdx]; }
        if (e.key === 'ArrowDown') { e.preventDefault(); hIdx = Math.min(history.length, hIdx + 1); input.value = history[hIdx] || ''; }
      });
      $('.term', el).addEventListener('click', (e) => { if (!window.getSelection().toString() && e.target.tagName !== 'INPUT') input.focus({ preventScroll: true }); });
      $('[data-act="sim-reset"]', el).addEventListener('click', reset);
      reset();
    });
  }

  window.addEventListener('message', (e) => {
    const d = e.data;
    if (!d || !d.ztl) return;
    const el = document.getElementById(d.ztl);
    if (!el) return;
    const frame = $('iframe', el);
    if (!frame || e.source !== frame.contentWindow) return;
    // Hide "don't use this in production" notices from CDN tools (Babel, Tailwind): they only confuse beginners.
    if (/in-browser Babel transformer|cdn\.tailwindcss\.com should not be used in production|Download the React DevTools/i.test(String(d.text))) return;
    const c = $('.console', el);
    const body = $('.console-body', el);
    c.hidden = false;
    const line = document.createElement('div');
    line.className = 'log ' + (d.type || 'log');
    line.textContent = String(d.text).slice(0, 2000);
    body.appendChild(line);
    body.scrollTop = body.scrollHeight;
  });

  /* ============================================================
     Quiz
     ============================================================ */
  // Stable shuffle: each question's options always appear in the same mixed-up order.
  function hash(s) {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    h ^= h >>> 16; h = Math.imul(h, 0x85ebca6b); h ^= h >>> 13; h = Math.imul(h, 0xc2b2ae35); h ^= h >>> 16;
    return h >>> 0;
  }
  function optionOrder(q) {
    return q.options.map((_, i) => i).sort((a, b) => hash(q.q + '#' + a) - hash(q.q + '#' + b));
  }
  function quizHTML(qs, key) {
    return `<div class="quiz" data-key="${esc(key)}">
      ${qs.map((q, qi) => `<fieldset class="q" data-q="${qi}">
        <legend><span class="q-n">${qi + 1}</span><span>${fmt(q.q)}</span></legend>
        <div class="opts">${optionOrder(q).map((oi, pos) => `<button type="button" class="opt" data-o="${oi}"><span class="opt-letter">${'ABCDE'[pos]}</span><span>${fmt(q.options[oi])}</span></button>`).join('')}</div>
        <div class="feedback" aria-live="polite"></div>
      </fieldset>`).join('')}
      <div class="quiz-result" aria-live="polite"></div>
    </div>`;
  }
  function mountQuiz(root, key, qs, onDone) {
    const wrap = $(`.quiz[data-key="${key}"]`, root);
    if (!wrap) return;
    let answers = {};
    const result = $('.quiz-result', wrap);
    const prev = state.quiz[key];
    if (prev) result.innerHTML = `<p class="count">Your best score so far: <strong>${prev.best}/${prev.total}</strong>. Take it again any time.</p>`;

    wrap.addEventListener('click', (e) => {
      if (e.target.closest('[data-retry]')) { reset(); return; }
      const btn = e.target.closest('.opt');
      if (!btn) return;
      const fs = btn.closest('.q');
      if (fs.dataset.answered) return;
      const qi = +fs.dataset.q, q = qs[qi], oi = +btn.dataset.o, ok = oi === q.answer;
      fs.dataset.answered = '1';
      answers[qi] = ok;
      $$('.opt', fs).forEach((b) => { b.disabled = true; if (+b.dataset.o === q.answer) b.classList.add('correct'); });
      if (!ok) btn.classList.add('wrong');
      $('.feedback', fs).innerHTML = `<div class="fb ${ok ? 'ok' : 'no'}"><strong>${ok ? pick(PRAISE) : 'Not quite.'}</strong> ${fmt(q.explain)}</div>`;
      if (Object.keys(answers).length === qs.length) finish();
    });

    function finish() {
      const score = Object.values(answers).filter(Boolean).length;
      const best = Math.max(score, (state.quiz[key] || {}).best || 0);
      state.quiz[key] = { score, best, total: qs.length };
      save();
      const perfect = score === qs.length;
      result.innerHTML = `<div class="result-card"><span>${perfect ? '🌟 Perfect score!' : score >= qs.length / 2 ? '👍 Nice work!' : '🌱 Good start!'} You got <strong>${score}/${qs.length}</strong>.${perfect ? '' : ' Re-read the explanations above, then try again.'}</span><button type="button" class="btn-ghost sm" data-retry>↺ Retry quiz</button></div>`;
      if (onDone) onDone(score);
    }
    function reset() {
      answers = {};
      $$('.q', wrap).forEach((fs) => {
        delete fs.dataset.answered;
        $('.feedback', fs).innerHTML = '';
        $$('.opt', fs).forEach((b) => { b.disabled = false; b.classList.remove('correct', 'wrong'); });
      });
      result.innerHTML = '';
      $('.opt', wrap).focus();
    }
  }

  /* ============================================================
     Views
     ============================================================ */
  let main = $('#main');
  const sidebar = $('#sidebar');
  const expanded = new Set();

  function crumbs(m, last) {
    return `<nav class="crumbs" aria-label="Breadcrumb"><a href="#/">Course</a><span aria-hidden="true">›</span><a href="#/module/${m.id}">Module ${m.num}: ${esc(m.title)}</a>${last ? `<span aria-hidden="true">›</span><span>${esc(last)}</span>` : ''}</nav>`;
  }
  function pager(u) {
    const i = units.indexOf(u);
    const prev = units[i - 1], next = units[i + 1];
    const nextOutline = !next && modules.find((m) => m.num === u.module.num + 1);
    return `<nav class="pager" aria-label="Lesson navigation">
      ${prev ? `<a class="prev" href="${prev.route}"><small>← Previous</small><span>${esc(prev.title)}</span></a>` : '<span></span>'}
      ${next ? `<a class="next" href="${next.route}"><small>Next →</small><span>${esc(next.title)}</span></a>`
        : nextOutline ? `<a class="next" href="#/module/${nextOutline.id}"><small>Up next (coming soon) →</small><span>Module ${nextOutline.num}: ${esc(nextOutline.title)}</span></a>`
        : `<a class="next" href="#/checklist"><small>Finish line →</small><span>Launch checklist</span></a>`}
    </nav>`;
  }
  function completeBar(u) {
    const done = !!state.completed[u.id];
    const label = u.kind === 'lesson' ? 'lesson' : 'checkpoint';
    return `<div class="complete-bar${done ? ' is-done' : ''}" data-unit="${u.id}">
      ${done ? `<span>✓ You completed this ${label}. Great job!</span>`
        : `<span>${u.kind === 'lesson' ? 'Finish the quiz above to complete this lesson, or mark it done yourself.' : 'Finish the quiz and the exercise to complete this checkpoint.'}</span><button type="button" class="btn-ghost sm" data-complete>Mark ${label} complete</button>`}
    </div>`;
  }
  function refreshCompleteBar(u) {
    const bar = $(`.complete-bar[data-unit="${u.id}"]`, main);
    if (bar) bar.outerHTML = completeBar(u);
    const head = $('.lesson-head .meta', main);
    if (head && state.completed[u.id] && !$('.pill.ok', head)) head.insertAdjacentHTML('beforeend', '<span class="pill ok">✓ Completed</span>');
  }
  function bindCompleteBar(u) {
    main.addEventListener('click', (e) => {
      if (!e.target.closest('[data-complete]')) return;
      complete(u.id);
      refreshCompleteBar(u);
    });
  }

  function renderLesson(u) {
    const l = u.lesson, m = u.module;
    state.last = u.id; save();
    main.innerHTML = `<article class="page">
      ${crumbs(m, 'Lesson ' + l.num)}
      <header class="lesson-head">
        <h1 tabindex="-1">${esc(l.title)}</h1>
        ${l.intro ? `<p class="lead">${fmt(l.intro)}</p>` : ''}
        <div class="meta"><span class="pill accent">Lesson ${l.num}</span><span class="pill">⏱ ${l.minutes} min</span>${state.completed[u.id] ? '<span class="pill ok">✓ Completed</span>' : ''}</div>
      </header>
      ${l.blocks.map(renderBlock).join('')}
      <section class="quiz-wrap" aria-labelledby="qh">
        <h2 id="qh">🧠 Quick check</h2>
        <p>Pick an answer for each question. You'll see the explanation right away.</p>
        ${quizHTML(l.quiz, u.id)}
      </section>
      ${completeBar(u)}
      ${pager(u)}
    </article>`;
    mountEditors(main);
    mountQuiz(main, u.id, l.quiz, () => { complete(u.id); refreshCompleteBar(u); });
    bindCompleteBar(u);
  }

  function renderReview(u) {
    const m = u.module, ex = m.exercise;
    state.last = u.id; save();
    const exState = state.exercises[m.id] || (state.exercises[m.id] = { goals: {}, done: false });
    main.innerHTML = `<article class="page">
      ${crumbs(m, 'Checkpoint')}
      <header class="lesson-head">
        <h1 tabindex="-1">Module ${m.num} checkpoint</h1>
        <p class="lead">Check what you learned in <strong>${esc(m.title)}</strong>, then put it into practice with a hands-on exercise.</p>
        <div class="meta"><span class="pill accent">Mini-quiz + exercise</span><span class="pill">⏱ ${ex.minutes || 15} min</span>${state.completed[u.id] ? '<span class="pill ok">✓ Completed</span>' : ''}</div>
      </header>
      <section class="quiz-wrap" aria-labelledby="mq">
        <h2 id="mq">🧠 Module mini-quiz</h2>
        <p>These questions mix ideas from the whole module.</p>
        ${quizHTML(m.quiz, m.id + '-quiz')}
      </section>
      <section class="exercise" aria-labelledby="exh">
        <h2 id="exh">🛠️ Hands-on: ${esc(ex.title)}</h2>
        ${(ex.blocks || []).map(renderBlock).join('')}
        <h3>Your goals</h3>
        <ul class="goals">${ex.goals.map((g, i) => `<li><label><input type="checkbox" data-goal="${i}"${exState.goals[i] ? ' checked' : ''}><span>${fmt(g)}</span></label></li>`).join('')}</ul>
        ${ex.starter ? editorHTML(Object.assign({ title: 'Exercise workspace' }, ex.starter)) : ''}
        ${ex.sim ? simHTML(Object.assign({ title: 'Exercise terminal' }, ex.sim)) : ''}
        <div style="margin-top:16px;display:flex;gap:12px;align-items:center;flex-wrap:wrap">
          <button type="button" class="btn ${exState.done ? 'success' : ''}" data-exdone ${exState.done ? 'disabled' : ''}>${exState.done ? '✓ Exercise finished' : 'I finished the exercise ✓'}</button>
          <span class="count" style="margin:0" data-goalcount></span>
        </div>
      </section>
      ${completeBar(u)}
      ${pager(u)}
    </article>`;
    mountEditors(main);

    const goalCount = () => {
      const n = Object.values(exState.goals).filter(Boolean).length;
      $('[data-goalcount]', main).textContent = `${n} of ${ex.goals.length} goals checked`;
    };
    goalCount();
    const tryFinish = () => {
      if (state.quiz[m.id + '-quiz'] && exState.done) { complete(u.id); refreshCompleteBar(u); }
    };
    main.addEventListener('change', (e) => {
      const g = e.target.closest('[data-goal]');
      if (!g) return;
      exState.goals[g.dataset.goal] = g.checked; save(); goalCount();
    });
    $('[data-exdone]', main).addEventListener('click', (e) => {
      exState.done = true; save();
      e.currentTarget.disabled = true; e.currentTarget.classList.add('success'); e.currentTarget.textContent = '✓ Exercise finished';
      if (!state.quiz[m.id + '-quiz']) toast('Exercise done! 🛠️ Finish the mini-quiz to complete the checkpoint.');
      tryFinish();
    });
    mountQuiz(main, m.id + '-quiz', m.quiz, () => {
      if (!exState.done) toast('Quiz done! Now try the hands-on exercise below. 🛠️');
      tryFinish();
    });
    bindCompleteBar(u);
  }

  function renderModule(m) {
    if (!m) return renderHome();
    expanded.add(m.id);
    const ready = m.status === 'ready';
    const mp = moduleProgress(m);
    const first = ready && (units.find((u) => u.module === m && !state.completed[u.id]) || units.find((u) => u.module === m));
    main.innerHTML = `<article class="page">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="#/">Course</a><span aria-hidden="true">›</span><span>Module ${m.num}</span></nav>
      <div class="mod-hero"><span class="m-ico" aria-hidden="true">${m.icon}</span><div>
        <h1 tabindex="-1">${esc(m.title)}</h1>
        <div class="meta"><span class="pill accent">Module ${m.num}</span>${ready ? `<span class="pill">${m.lessons.length} lessons + checkpoint</span><span class="pill${mp.complete ? ' ok' : ''}">${mp.done}/${mp.total} done</span>` : '<span class="soon">Coming soon</span>'}</div>
      </div></div>
      <p class="lead">${fmt(m.summary)}</p>
      ${m.goal ? `<p>${fmt(m.goal)}</p>` : ''}
      ${ready ? `
        ${first ? `<p><a class="btn" href="${first.route}">${mp.done ? 'Continue module →' : 'Start module →'}</a></p>` : ''}
        <h2>Lessons</h2>
        <ul class="lesson-list">
          ${m.lessons.map((l) => `<li><a href="#/lesson/${l.id}" class="${state.completed[l.id] ? 'done' : ''}"><span class="tick" aria-hidden="true">✓</span><span class="l-n">${l.num}</span><span class="l-t">${esc(l.title)}${l.intro ? `<small>${fmt(l.intro)}</small>` : ''}</span><span class="l-m">${l.minutes} min</span><span class="sr-only">${state.completed[l.id] ? '(completed)' : ''}</span></a></li>`).join('')}
          <li><a href="#/review/${m.id}" class="${state.completed[m.id + '-review'] ? 'done' : ''}"><span class="tick" aria-hidden="true">✓</span><span class="l-n">★</span><span class="l-t">Checkpoint: mini-quiz + hands-on exercise<small>${esc(m.exercise.title)}</small></span><span class="l-m">${m.exercise.minutes || 15} min</span></a></li>
        </ul>`
      : `
        <div class="callout tip"><span class="ico" aria-hidden="true">🚧</span><div><span class="c-title">This module is outlined, not written yet</span><p>Here's what it will cover. Lessons, live examples, and quizzes are on the way.</p></div></div>
        <h2>Planned lessons</h2>
        <ul class="lesson-list">${m.planned.map((p, i) => `<li><div class="planned"><span class="l-n">${m.num}.${i + 1}</span><span class="l-t">${esc(p.title)}<small>${fmt(p.text)}</small></span></div></li>`).join('')}</ul>
        <h2>Planned hands-on exercise</h2>
        <p><strong>${esc(m.exercise.title)}:</strong> ${fmt(m.exercise.text)}</p>`}
    </article>`;
  }

  function ring(p) {
    const r = 48, c = 2 * Math.PI * r;
    return `<div class="ring" role="img" aria-label="${p}% complete"><svg width="112" height="112" viewBox="0 0 112 112" aria-hidden="true">
      <defs><linearGradient id="rg" x1="0" x2="1"><stop offset="0" stop-color="var(--accent)"/><stop offset="1" stop-color="var(--teal)"/></linearGradient></defs>
      <circle cx="56" cy="56" r="${r}" fill="none" stroke="var(--surface-3)" stroke-width="10"/>
      <circle cx="56" cy="56" r="${r}" fill="none" stroke="url(#rg)" stroke-width="10" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - p / 100)}" style="transition:stroke-dashoffset .8s"/>
    </svg><div class="ring-txt"><div>${p}%<small>complete</small></div></div></div>`;
  }

  function renderHome() {
    const p = progress();
    const nu = nextUnit();
    const started = p.done > 0;
    main.innerHTML = `<div class="page wide">
      <section class="hero">
        <h1 tabindex="-1">Zero to Live 🚀</h1>
        <p class="lead">Go from <strong>zero coding experience</strong> to a real website on the internet, one short lesson at a time.</p>
        <div class="hero-row">
          ${ring(p.pct)}
          <div class="hero-actions">
            ${nu ? `<a class="btn" href="${nu.route}">${started ? 'Continue where you left off →' : 'Start the first lesson →'}</a>
              <span class="sub">${started ? 'Up next' : 'First up'}: ${esc(nu.title)}</span>`
              : `<a class="btn" href="#/checklist">Open the launch checklist →</a><span class="sub">You've finished every lesson. Amazing!</span>`}
            <span class="sub">${p.done} of ${p.total} lessons &amp; checkpoints done</span>
          </div>
        </div>
      </section>

      <div class="features">
        <div class="feature"><span class="f-ico" aria-hidden="true">⏱️</span><strong>Bite-sized lessons</strong><p>Each lesson takes 5–10 minutes. Plain language, real-world analogies, no jargon walls.</p></div>
        <div class="feature"><span class="f-ico" aria-hidden="true">🧪</span><strong>Try it live</strong><p>Edit real code and see the result instantly, right next to the lesson. Nothing to install.</p></div>
        <div class="feature"><span class="f-ico" aria-hidden="true">🧠</span><strong>Quizzes &amp; projects</strong><p>Quick checks after every lesson and a hands-on exercise at the end of each module.</p></div>
      </div>

      <h2>Your learning path</h2>
      <div class="mod-grid">
        ${modules.map((m) => {
          const mp = moduleProgress(m);
          const ready = m.status === 'ready';
          return `<a class="mod-card${ready ? '' : ' outline'}" href="#/module/${m.id}">
            <div class="mod-card-top"><span class="m-ico" aria-hidden="true">${m.icon}</span>${ready ? (mp.complete ? '<span class="pill ok">✓ Complete</span>' : `<span class="pill">${mp.done}/${mp.total}</span>`) : '<span class="soon">Coming soon</span>'}</div>
            <span class="m-n">Module ${m.num}</span>
            <h3>${esc(m.title)}</h3>
            <p>${fmt(m.summary)}</p>
            ${ready ? `<div class="mini-bar" aria-hidden="true"><span style="width:${mp.total ? (mp.done * 100) / mp.total : 0}%"></span></div>` : ''}
          </a>`;
        }).join('')}
      </div>

      <h2>Handy tools</h2>
      <div class="features">
        <a class="feature mod-card" href="#/glossary"><span class="f-ico" aria-hidden="true">📖</span><strong>Glossary</strong><p>Look up any term (${GLOSSARY.length} and counting) in plain English.</p></a>
        <a class="feature mod-card" href="#/checklist"><span class="f-ico" aria-hidden="true">✅</span><strong>Launch checklist</strong><p>“Is my website ready to launch?” Tick off every item before you go live.</p></a>
        <div class="feature"><span class="f-ico" aria-hidden="true">💾</span><strong>Progress saves itself</strong><p>Your progress is stored in this browser, so you can close the tab and pick up later.</p></div>
      </div>
    </div>`;
  }

  function renderGlossary() {
    const items = GLOSSARY.slice().sort((a, b) => a.term.localeCompare(b.term));
    main.innerHTML = `<article class="page">
      <h1 tabindex="-1">📖 Glossary</h1>
      <p class="lead">Every key term from the course, explained in plain English.</p>
      <label class="search"><span aria-hidden="true">🔍</span><span class="sr-only">Search the glossary</span>
        <input type="search" id="gq" placeholder="Search terms, like “DNS” or “tag”" autocomplete="off"></label>
      <p class="count" id="gcount" aria-live="polite"></p>
      <dl class="gloss" id="glist"></dl>
    </article>`;
    const input = $('#gq'), list = $('#glist'), count = $('#gcount');
    const hl = (text, q) => {
      const t = esc(text);
      if (!q) return t;
      const re = new RegExp('(' + esc(q).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
      return t.replace(re, '<mark>$1</mark>');
    };
    const draw = () => {
      const q = input.value.trim();
      const ql = q.toLowerCase();
      const shown = items.filter((g) => !ql || g.term.toLowerCase().includes(ql) || g.def.toLowerCase().includes(ql));
      shown.sort((a, b) => (ql ? (b.term.toLowerCase().includes(ql) - a.term.toLowerCase().includes(ql)) : 0));
      count.textContent = q ? `${shown.length} result${shown.length === 1 ? '' : 's'} for “${q}”` : `${items.length} terms`;
      list.innerHTML = shown.length ? shown.map((g) => {
        const m = modules.find((x) => x.id === g.module);
        return `<div class="gloss-item"><dt><span>${hl(g.term, q)}</span>${m ? `<a href="#/module/${m.id}">Module ${m.num} →</a>` : ''}</dt><dd>${hl(g.def, q)}</dd></div>`;
      }).join('') : `<div class="empty">🤔 No terms match “${esc(q)}”. Try a shorter word.</div>`;
    };
    input.addEventListener('input', draw);
    draw();
  }

  function renderChecklist() {
    const total = CHECKLIST.reduce((n, g) => n + g.items.length, 0);
    main.innerHTML = `<article class="page">
      <h1 tabindex="-1">✅ Is my website ready to launch?</h1>
      <p class="lead">Go through this list before you share your site with the world. Each item links back to ideas from the course.</p>
      <div class="sticky-progress"><div class="mini-bar"><span id="clbar"></span></div><strong id="clcount"></strong></div>
      <div id="clbanner"></div>
      ${CHECKLIST.map((g, gi) => `<section class="check-group">
        <h2><span aria-hidden="true">${g.icon}</span> ${esc(g.title)} <span class="pill" data-gcount="${gi}"></span></h2>
        ${g.items.map((it, ii) => `<label class="check-item"><input type="checkbox" data-ck="${gi}-${ii}"${state.checklist[gi + '-' + ii] ? ' checked' : ''}><span><strong>${fmt(it.text)}</strong>${it.hint ? `<small>${fmt(it.hint)}</small>` : ''}</span></label>`).join('')}
      </section>`).join('')}
      <p style="margin-top:24px"><button type="button" class="btn-ghost sm" id="clreset">↺ Uncheck everything</button></p>
    </article>`;
    const update = (celebrateIfDone) => {
      const done = Object.keys(state.checklist).filter((k) => state.checklist[k]).length;
      $('#clbar').style.width = (done * 100) / total + '%';
      $('#clcount').textContent = `${done}/${total}`;
      CHECKLIST.forEach((g, gi) => {
        const n = g.items.filter((_, ii) => state.checklist[gi + '-' + ii]).length;
        const pill = $(`[data-gcount="${gi}"]`);
        pill.textContent = `${n}/${g.items.length}`;
        pill.classList.toggle('ok', n === g.items.length);
      });
      const all = done === total;
      $('#clbanner').innerHTML = all ? '<div class="launch-banner">🚀 Your website is ready to launch! Go share it with the world.</div>' : '';
      if (all && celebrateIfDone) celebrate(['Launch checklist complete! Your site is ready for the world. 🚀'], true);
    };
    main.addEventListener('change', (e) => {
      const c = e.target.closest('[data-ck]');
      if (!c) return;
      state.checklist[c.dataset.ck] = c.checked;
      if (!c.checked) delete state.checklist[c.dataset.ck];
      save();
      update(c.checked);
    });
    $('#clreset').addEventListener('click', () => {
      state.checklist = {}; save();
      $$('[data-ck]').forEach((c) => { c.checked = false; });
      update(false);
    });
    update(false);
  }

  /* ============================================================
     Sidebar + header
     ============================================================ */
  const CHEV = '<svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  function renderSidebar() {
    const hash = location.hash || '#/';
    const cur = (href) => (href === hash ? ' aria-current="page"' : '');
    sidebar.innerHTML = `
      <a class="side-link" href="#/"${cur('#/') || (hash === '' ? ' aria-current="page"' : '')}><span aria-hidden="true">🏠</span> Course overview</a>
      <div class="side-label">Modules</div>
      ${modules.map((m) => {
        const mp = moduleProgress(m);
        const ready = m.status === 'ready';
        const open = expanded.has(m.id);
        return `<div class="side-mod${open ? ' open' : ''}${mp.complete ? ' complete' : ''}${ready ? '' : ' outline'}">
          <button type="button" class="side-mod-head" aria-expanded="${open}" data-mod="${m.id}">
            <span class="mod-num" aria-hidden="true">${mp.complete ? '✓' : m.num}</span>
            <span class="mod-title">${esc(m.title)}</span>
            ${ready ? `<span class="mod-count" aria-label="${mp.done} of ${mp.total} done">${mp.done}/${mp.total}</span>` : '<span class="soon">Soon</span>'}
            ${CHEV}
          </button>
          <ul class="side-lessons">
            <li><a href="#/module/${m.id}"${cur('#/module/' + m.id)}><span class="tick" aria-hidden="true" style="border-style:dashed">i</span>Module overview</a></li>
            ${ready
              ? m.lessons.map((l) => `<li><a href="#/lesson/${l.id}" class="${state.completed[l.id] ? 'done' : ''}"${cur('#/lesson/' + l.id)}><span class="tick" aria-hidden="true">✓</span><span>${esc(l.title)}${state.completed[l.id] ? '<span class="sr-only"> (completed)</span>' : ''}</span></a></li>`).join('')
                + `<li><a href="#/review/${m.id}" class="${state.completed[m.id + '-review'] ? 'done' : ''}"${cur('#/review/' + m.id)}><span class="tick" aria-hidden="true">✓</span><span>★ Checkpoint</span></a></li>`
              : m.planned.map((p) => `<li><span class="planned"><span class="tick" aria-hidden="true" style="border-style:dotted"></span><span>${esc(p.title)}</span></span></li>`).join('')}
          </ul>
        </div>`;
      }).join('')}
      <div class="side-foot">
        <a class="side-link" href="#/glossary"${cur('#/glossary')}><span aria-hidden="true">📖</span> Glossary</a>
        <a class="side-link" href="#/checklist"${cur('#/checklist')}><span aria-hidden="true">✅</span> Launch checklist</a>
        <button type="button" class="side-link" id="resetBtn"><span aria-hidden="true">↺</span> Reset my progress</button>
      </div>`;
  }
  sidebar.addEventListener('click', (e) => {
    const head = e.target.closest('[data-mod]');
    if (head) {
      const id = head.dataset.mod;
      expanded.has(id) ? expanded.delete(id) : expanded.add(id);
      head.parentElement.classList.toggle('open');
      head.setAttribute('aria-expanded', String(expanded.has(id)));
      return;
    }
    if (e.target.closest('#resetBtn')) {
      if (confirm('Reset all your progress, quiz scores, and checklist? This cannot be undone.')) {
        const theme = state.theme;
        state = defaults(); state.theme = theme; save();
        updateChrome(); route();
        toast('Progress reset. A fresh start! 🌱');
      }
    }
  });

  function updateChrome() {
    const p = progress();
    $('#barFill').style.width = p.pct + '%';
    $('#pctText').textContent = p.pct + '%';
    $('#topBar').setAttribute('aria-valuenow', p.pct);
    $('#topBar').setAttribute('aria-valuetext', `${p.pct}% complete, ${p.done} of ${p.total}`);
    const scroll = sidebar.scrollTop;
    renderSidebar();
    sidebar.scrollTop = scroll;
  }

  /* ---------- Theme ---------- */
  const SUN = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  const MOON = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>';
  function applyTheme(t) {
    document.documentElement.dataset.theme = t;
    const btn = $('#themeBtn');
    btn.innerHTML = t === 'dark' ? SUN : MOON;
    btn.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
  applyTheme(document.documentElement.dataset.theme || 'light');
  $('#themeBtn').addEventListener('click', () => {
    const t = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    state.theme = t; save(); applyTheme(t);
  });

  /* ---------- Mobile drawer ---------- */
  const scrim = $('#scrim'), menuBtn = $('#menuBtn');
  function openDrawer() { document.body.classList.add('drawer-open'); scrim.hidden = false; menuBtn.setAttribute('aria-expanded', 'true'); }
  function closeDrawer() { document.body.classList.remove('drawer-open'); scrim.hidden = true; menuBtn.setAttribute('aria-expanded', 'false'); }
  menuBtn.addEventListener('click', () => (document.body.classList.contains('drawer-open') ? closeDrawer() : openDrawer()));
  scrim.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && document.body.classList.contains('drawer-open')) { closeDrawer(); menuBtn.focus(); } });

  /* ---------- Copy buttons ---------- */
  document.addEventListener('click', (e) => {
    const b = e.target.closest('.copy');
    if (!b) return;
    const text = b.closest('.code').querySelector('pre').textContent;
    const done = () => { b.textContent = 'Copied!'; setTimeout(() => { b.textContent = 'Copy'; }, 1400); };
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, () => toast('Copy failed. Select the code and copy it manually.'));
  });

  /* ---------- Toasts + confetti ---------- */
  function toast(msg, big) {
    const t = document.createElement('div');
    t.className = 'toast' + (big ? ' big' : '');
    t.textContent = msg;
    $('#toasts').appendChild(t);
    setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 320); }, big ? 5000 : 3200);
  }
  function confetti() {
    if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const box = document.createElement('div');
    box.className = 'confetti';
    box.setAttribute('aria-hidden', 'true');
    const colors = ['#6366f1', '#14b8a6', '#f59e0b', '#ec4899', '#22c55e', '#38bdf8'];
    for (let i = 0; i < 70; i++) {
      const p = document.createElement('i');
      p.style.left = Math.random() * 100 + 'vw';
      p.style.background = pick(colors);
      p.style.setProperty('--x', (Math.random() * 240 - 120) + 'px');
      p.style.setProperty('--r', (Math.random() * 900 - 450) + 'deg');
      p.style.setProperty('--d', (1.4 + Math.random() * 1.4) + 's');
      p.style.animationDelay = Math.random() * 0.3 + 's';
      box.appendChild(p);
    }
    document.body.appendChild(box);
    setTimeout(() => box.remove(), 3400);
  }
  function celebrate(msgs, big) {
    msgs.forEach((m, i) => setTimeout(() => toast(m, big && i === msgs.length - 1 ? true : big && i === 0), i * 450));
    if (big) confetti();
  }

  /* ============================================================
     Router
     ============================================================ */
  let routedOnce = false;
  function route() {
    const h = location.hash.replace(/^#\/?/, '');
    const [kind, id] = h.split('/');
    closeDrawer();
    edSeq = 0;
    Object.keys(editors).forEach((k) => delete editors[k]);
    Object.keys(sims).forEach((k) => delete sims[k]);
    // Swap in a fresh <main> so listeners from the previous view are dropped.
    const fresh = main.cloneNode(false);
    main.replaceWith(fresh);
    main = fresh;

    if (kind === 'lesson' && unitById[id]) { expanded.add(unitById[id].module.id); renderLesson(unitById[id]); }
    else if (kind === 'review' && unitById[id + '-review']) { expanded.add(id); renderReview(unitById[id + '-review']); }
    else if (kind === 'module') renderModule(modules.find((m) => m.id === id));
    else if (kind === 'glossary') renderGlossary();
    else if (kind === 'checklist') renderChecklist();
    else renderHome();

    updateChrome();
    window.scrollTo(0, 0);
    const h1 = $('h1', main);
    if (h1 && routedOnce) h1.focus({ preventScroll: true });
    routedOnce = true;
    const active = $('[aria-current="page"]', sidebar);
    if (active) {
      // Scroll only the sidebar (scrollIntoView would also shift the page toward the hidden drawer on mobile).
      const r = active.getBoundingClientRect(), s = sidebar.getBoundingClientRect();
      if (r.top < s.top || r.bottom > s.bottom) sidebar.scrollTop += r.top - s.top - s.height / 3;
    }
    const t = $('h1', main);
    document.title = (t && kind ? t.textContent.trim() + ' · ' : '') + 'Zero to Live: Web Development';
  }

  window.addEventListener('hashchange', route);
  route();
})();
