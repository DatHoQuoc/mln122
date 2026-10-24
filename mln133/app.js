(function () {
  const SL = window.SLIDES, PL = window.PART_LABELS;
  const app = document.getElementById('app');
  const PRINT = new URLSearchParams(location.search).has('print');
  const idx = {}; SL.forEach((s, i) => idx[s.id] = i);
  let cur = 0, step = 0, hl = null;
  const cache = {};

  const maxStep = s => {
    let m = 0;
    s.nodes.forEach(n => m = Math.max(m, n.s || 0));
    (s.edges || []).forEach(e => m = Math.max(m, e[4] || 0));
    return m;
  };

  function nodeHTML(n) {
    const xs = (n.x || []).map(x => `<a class="x" data-x="${x}" href="#K1">${x}</a>`).join('');
    const text = n.text.replace(/___/g, '<span class="blank"><b>dân</b></span>');
    const inner = n.type === 'hub' ? `<span class="q">?</span><div class="txt">${text}</div>` : `<div class="txt">${text}</div>`;
    return `<div class="node t-${n.type}" data-id="${n.id}">${xs ? `<span class="xs">${xs}</span>` : ''}${inner}</div>`;
  }

  function buildStage(sl) {
    const st = document.createElement('section');
    st.className = 'stage' + (sl.cover ? ' cover' : '');
    const byId = {}; sl.nodes.forEach(n => byId[n.id] = n);
    let h = `<header><h1>${sl.title}</h1><span class="tag">${sl.id}</span></header>
      <svg class="edges"><defs>
        <marker id="mG" class="mG" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z"/></marker>
        <marker id="mR" class="mR" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z"/></marker>
        <marker id="mB" class="mB" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z"/></marker>
      </defs><g class="eg"></g></svg><div class="body"><div class="inner">`;
    if (sl.cover) h += `<div class="star">★</div><h1 class="cv">${sl.title}</h1><div class="orn"></div>`;
    sl.rows.forEach(r => {
      h += '<div class="row">';
      r.cells.forEach((c, i) => {
        const cc = Array.isArray(c) ? { ids: c } : c;
        const w = (r.w || [])[i] || 1;
        h += `<div class="cell${cc.g ? ' grid' : ''}${cc.spread ? ' spread' : ''}" style="--w:${w};${cc.g ? '--g:' + cc.g : ''}">${cc.ids.map(id => nodeHTML(byId[id])).join('')}</div>`;
      });
      h += '</div>';
    });
    h += '</div></div><nav class="parts">' + PL.map(p => `<span>${p}</span>`).join('') + '<span class="cnt"></span></nav>';
    st.innerHTML = h;
    st._el = {}; st.querySelectorAll('.node').forEach(e => st._el[e.dataset.id] = e);
    st._by = byId; st._sl = sl;
    // cạnh
    const g = st.querySelector('.eg'), NS = 'http://www.w3.org/2000/svg';
    st._edges = (sl.edges || []).map(e => {
      const line = document.createElementNS(NS, 'line');
      line.setAttribute('class', 'e e-' + e[2]); g.appendChild(line);
      let lab = null;
      if (e[3]) {
        lab = document.createElementNS(NS, 'g'); lab.setAttribute('class', 'elab');
        lab.innerHTML = `<rect rx="12" height="26"/><text dy="19">${e[3]}</text>`; g.appendChild(lab);
      }
      return { e, line, lab };
    });
    return st;
  }

  function fit(st) {
    st.classList.add('measure');
    const body = st.querySelector('.body'), inner = st.querySelector('.inner');
    let fs = 30;
    for (; fs >= 14; fs--) {
      st.style.setProperty('--fs', fs + 'px');
      if (inner.offsetHeight <= body.clientHeight && inner.scrollWidth <= body.clientWidth + 24) break;
    }
    st.classList.remove('measure');
  }

  function pos(st, id) {
    const el = st._el[id];
    if (!el || el.classList.contains('gone')) return null;
    let x = 0, y = 0, e = el;
    while (e && e !== st) { x += e.offsetLeft; y += e.offsetTop; e = e.offsetParent; }
    return { x, y, w: el.offsetWidth, h: el.offsetHeight, cx: x + el.offsetWidth / 2, cy: y + el.offsetHeight / 2 };
  }
  const exit = (r, dx, dy, pad) => Math.min(dx ? (r.w / 2 + pad) / Math.abs(dx) : 1e9, dy ? (r.h / 2 + pad) / Math.abs(dy) : 1e9);

  function setStep(st, n, hlc) {
    const sl = st._sl;
    st.classList.toggle('filled', sl.fill != null && n >= sl.fill);
    st.classList.toggle('hlon', sl.hl != null && n >= sl.hl);
    sl.nodes.forEach(nd => {
      const el = st._el[nd.id];
      const shown = n >= (nd.s || 0) && !(nd.u != null && n > nd.u);
      el.classList.toggle('on', shown);
      el.classList.toggle('gone', !!((nd.u != null && n > nd.u) || (nd.late && n < nd.s)));
      el.classList.toggle('alert-on', nd.alert != null && n >= nd.alert);
      if (nd.xcode) {
        el.classList.toggle('lit', hlc === nd.xcode);
        el.classList.toggle('dim', !!hlc && hlc !== nd.xcode);
      }
    });
    st.querySelectorAll('.cell').forEach(c => c.classList.toggle('empty', [...c.children].every(k => k.classList.contains('gone'))));
    // cạnh
    const k = st.querySelector('.parts .cnt');
    k.textContent = `${idx[sl.id] + 1}/${SL.length} · bước ${n}/${maxStep(sl)}`;
    st.querySelectorAll('.parts span:not(.cnt)').forEach((p, i) => {
      p.classList.toggle('on', sl.part === 4 || sl.part === i + 1);
      p.classList.toggle('done', sl.part !== 4 && sl.part > i + 1);
    });
    st._edges.forEach(({ e, line, lab }) => {
      let A = pos(st, e[0]), B = pos(st, e[1]);
      const cellOf = st._el[e[0]] && st._el[e[0]].parentElement;
      const grouped = e[2] === 'conv' && cellOf && cellOf.classList.contains('grid') && B;
      if (grouped) {
        const members = st._edges.filter(o => o.e[2] === 'conv' && o.e[1] === e[1] && st._el[o.e[0]] && st._el[o.e[0]].parentElement === cellOf);
        if (members[0].line !== line) { line.classList.remove('on'); return; }
        let x = 0, y = 0, q = cellOf; while (q && q !== st) { x += q.offsetLeft; y += q.offsetTop; q = q.offsetParent; }
        A = { x, y, w: cellOf.offsetWidth, h: cellOf.offsetHeight, cx: x + cellOf.offsetWidth / 2, cy: y + cellOf.offsetHeight / 2 };
        e = [e[0], e[1], e[2], e[3], Math.min(...members.map(o => Math.max(st._by[o.e[0]].s || 0)))];
      }
      if (!A || !B) { line.classList.remove('on'); if (lab) lab.classList.remove('on'); return; }
      const na = st._by[e[0]], nb = st._by[e[1]];
      const need = e[4] != null ? e[4] : Math.max(na.s || 0, nb.type === 'hub' && e[2] !== 'arrow' ? 0 : nb.s || 0);
      let x1, y1, x2, y2;
      if (A.x + A.w + 10 < B.x) { x1 = A.x + A.w + 6; y1 = A.cy; x2 = B.x - 8; y2 = B.cy; }
      else if (B.x + B.w + 10 < A.x) { x1 = A.x - 6; y1 = A.cy; x2 = B.x + B.w + 8; y2 = B.cy; }
      else {
        const dx = B.cx - A.cx, dy = B.cy - A.cy;
        const ta = exit(A, dx, dy, 6), tb = exit(B, dx, dy, 8);
        if (ta + tb >= 0.98) { line.classList.remove('on'); if (lab) lab.classList.remove('on'); return; }
        x1 = A.cx + dx * ta; y1 = A.cy + dy * ta; x2 = B.cx - dx * tb; y2 = B.cy - dy * tb;
      }
      line.setAttribute('x1', x1); line.setAttribute('y1', y1); line.setAttribute('x2', x2); line.setAttribute('y2', y2);
      const vis = n >= need;
      line.classList.toggle('on', vis);
      if (lab) {
        const w = e[3].length * 9.5 + 22, mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
        const r = lab.querySelector('rect'), t = lab.querySelector('text');
        r.setAttribute('x', mx - w / 2); r.setAttribute('y', my - 13); r.setAttribute('width', w);
        t.setAttribute('x', mx); t.setAttribute('y', my - 13);
        lab.classList.toggle('on', vis);
      }
    });
  }

  function scale(st) {
    const k = Math.min(innerWidth / 1920, innerHeight / 1080);
    st.style.transform = `scale(${k})`;
  }

  function show(i, s, hlc) {
    i = Math.max(0, Math.min(SL.length - 1, i));
    cur = i; hl = hlc || null;
    const sl = SL[i];
    step = Math.max(0, Math.min(maxStep(sl), s));
    let st = cache[sl.id];
    app.replaceChildren();
    if (!st) { st = cache[sl.id] = buildStage(sl); }
    app.appendChild(st);
    scale(st);
    if (!st._fit) { fit(st); st._fit = true; }
    setStep(st, step, hl);
    history.replaceState(null, '', '#' + sl.id + (step ? '/' + step : ''));
  }

  const next = () => { const m = maxStep(SL[cur]); step < m ? show(cur, step + 1) : cur < SL.length - 1 && show(cur + 1, 0); };
  const prev = () => { step > 0 ? show(cur, step - 1) : cur > 0 && show(cur - 1, maxStep(SL[cur - 1])); };
  const goFull = id => show(idx[id], maxStep(SL[idx[id]]));

  if (PRINT) {
    document.body.classList.add('print', 'static');
    document.fonts.ready.then(() => {
      document.documentElement.setAttribute('data-theme', 'light');
      SL.forEach(sl => {
        const m = maxStep(sl);
        for (let s = 0; s <= m; s++) {
          const page = document.createElement('div'); page.className = 'page';
          const st = buildStage(sl); page.appendChild(st); app.appendChild(page);
          fit(st); setStep(st, s, null);
          st.querySelectorAll('.e.on,.elab.on').forEach(x => x.style.transition = 'none');
        }
      });
    });
    return;
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown' || e.key === 'Enter') { e.preventDefault(); next(); }
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp' || e.key === 'Backspace') { e.preventDefault(); prev(); }
    else if (e.key === 'Home') show(0, 0);
    else if (e.key === 'End') goFull('K2');
    else if (e.key === 't' || e.key === 'T') {
      const d = document.documentElement, dark = d.dataset.theme ? d.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
      d.dataset.theme = dark ? 'light' : 'dark';
    } else if (e.key === 'f' || e.key === 'F') {
      document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();
    }
  });
  app.addEventListener('click', e => {
    const x = e.target.closest('a.x'), c = e.target.closest('a[data-go]');
    if (x) { e.preventDefault(); show(idx.K1, maxStep(SL[idx.K1]), x.dataset.x); }
    else if (c) { e.preventDefault(); goFull(c.dataset.go); }
    else if (e.clientX > innerWidth * 0.5) next(); else prev();
  });
  addEventListener('resize', () => { const st = cache[SL[cur].id]; st && scale(st); });

  document.fonts.ready.then(() => {
    const m = /^#(\w+)(?:\/(\d+))?/.exec(location.hash);
    show(m && idx[m[1]] != null ? idx[m[1]] : 0, m && m[2] ? +m[2] : 0);
  });
})();
