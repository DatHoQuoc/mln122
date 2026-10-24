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
    const who = n.who ? `<span class="who">${n.who}</span>` : '';
    return `<div class="node t-${n.type}" data-id="${n.id}">${who}${xs ? `<span class="xs">${xs}</span>` : ''}${inner}</div>`;
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
      h += `<div class="row"${r.gap ? ` style="gap:${r.gap}px"` : ''}>`;
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
      const line = document.createElementNS(NS, 'path');
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

  function applyVis(st, n) {
    st._sl.nodes.forEach(nd => st._el[nd.id].classList.toggle('gone', !!((nd.u != null && n > nd.u) || (nd.late && n < nd.s))));
    st.querySelectorAll('.cell').forEach(c => c.classList.toggle('empty', c.children.length > 0 && [...c.children].every(k => k.classList.contains('gone'))));
  }
  function fit(st) {
    const sl = st._sl, body = st.querySelector('.body'), inner = st.querySelector('.inner');
    const dyn = sl.nodes.some(n => n.u != null || n.late);
    const states = dyn ? Array.from({ length: maxStep(sl) + 1 }, (_, i) => i) : [null];
    for (let fs = 30; fs >= 14; fs--) {
      st.style.setProperty('--fs', fs + 'px');
      const ok = states.every(n => {
        if (n !== null) applyVis(st, n);
        return inner.offsetHeight <= body.clientHeight && inner.scrollWidth <= body.clientWidth + 24;
      });
      if (ok) break;
    }
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
      el.classList.toggle('alert-on', nd.alert != null && n >= nd.alert);
      if (nd.xcode) {
        el.classList.toggle('lit', hlc === nd.xcode);
        el.classList.toggle('dim', !!hlc && hlc !== nd.xcode);
      }
    });
    applyVis(st, n);
    // cạnh
    const k = st.querySelector('.parts .cnt');
    k.textContent = `${idx[sl.id] + 1}/${SL.length} · bước ${n}/${maxStep(sl)}`;
    st.querySelectorAll('.parts span:not(.cnt)').forEach((p, i) => {
      p.classList.toggle('on', sl.part === 4 || sl.part === i + 1);
      p.classList.toggle('done', sl.part !== 4 && sl.part > i + 1);
    });
    // ---- định tuyến cạnh: đường gấp khúc vuông góc, các cạnh cùng đích dùng chung một "thanh dẫn" ----
    const items = [];
    st._edges.forEach(o => {
      let e = o.e, A = pos(st, e[0]), B = pos(st, e[1]);
      const cellOf = st._el[e[0]] && st._el[e[0]].parentElement;
      if ((e[2] === 'conv' || e[2] === 'arrow') && cellOf && A && B && st._by[e[1]].type === 'hub' && cellOf !== st._el[e[1]].parentElement) {
        const members = st._edges.filter(m => m.e[1] === e[1] && m.e[2] === e[2] && st._el[m.e[0]] && st._el[m.e[0]].parentElement === cellOf);
        const vertical = !(A.x + A.w + 10 < B.x || B.x + B.w + 10 < A.x);
        if (members.length > 1 && (cellOf.classList.contains('grid') || vertical)) {
          if (members[0] !== o) { o.line.classList.remove('on'); return; }
          let x = 0, y = 0, q = cellOf; while (q && q !== st) { x += q.offsetLeft; y += q.offsetTop; q = q.offsetParent; }
          A = { x, y, w: cellOf.offsetWidth, h: cellOf.offsetHeight, cx: x + cellOf.offsetWidth / 2, cy: y + cellOf.offsetHeight / 2 };
          e = [e[0], e[1], e[2], e[3], Math.min(...members.map(m => st._by[m.e[0]].s || 0))];
        }
      }
      if (!A || !B) { o.line.classList.remove('on'); if (o.lab) o.lab.classList.remove('on'); return; }
      const na = st._by[e[0]], nb = st._by[e[1]];
      const need = e[4] != null ? e[4] : Math.max(na.s || 0, nb.type === 'hub' && e[2] !== 'arrow' ? 0 : nb.s || 0);
      const side = A.x + A.w + 10 < B.x ? 'L' : B.x + B.w + 10 < A.x ? 'R' : A.cy < B.cy ? 'T' : 'B';
      const shared = nb.type === 'hub' && (e[2] === 'conv' || e[2] === 'arrow');
      items.push({ o, e, A, B, need, side, key: shared ? e[1] + side : null });
    });
    const groups = {};
    items.forEach(it => { if (it.key) (groups[it.key] = groups[it.key] || []).push(it); });
    let uniq = 0;
    items.forEach(it => {
      const { A, B, side } = it;
      let bus;
      if (it.key) {
        const g = groups[it.key];
        if (side === 'L') bus = Math.max(B.x - 36, Math.max(...g.map(i => i.A.x + i.A.w)) + 14);
        else if (side === 'R') bus = Math.min(B.x + B.w + 36, Math.min(...g.map(i => i.A.x)) - 14);
        else if (side === 'T') bus = Math.max(B.y - 24, Math.max(...g.map(i => i.A.y + i.A.h)) + 10);
        else bus = Math.min(B.y + B.h + 24, Math.min(...g.map(i => i.A.y)) - 10);
      } else {
        const off = ((uniq++ % 5) - 2) * 12;
        if (side === 'L') bus = (A.x + A.w + B.x) / 2 + off;
        else if (side === 'R') bus = (B.x + B.w + A.x) / 2 + off;
        else if (side === 'T') bus = (A.y + A.h + B.y) / 2;
        else bus = (B.y + B.h + A.y) / 2;
      }
      let pts;
      if (side === 'L' || side === 'R') {
        const sx = side === 'L' ? A.x + A.w + 4 : A.x - 4, ex = side === 'L' ? B.x - 7 : B.x + B.w + 7;
        pts = Math.abs(A.cy - B.cy) < 4 ? [[sx, B.cy], [ex, B.cy]] : [[sx, A.cy], [bus, A.cy], [bus, B.cy], [ex, B.cy]];
      } else {
        const sy = side === 'T' ? A.y + A.h + 4 : A.y - 4, ey = side === 'T' ? B.y - 7 : B.y + B.h + 7;
        pts = Math.abs(A.cx - B.cx) < 4 ? [[B.cx, sy], [B.cx, ey]] : [[A.cx, sy], [A.cx, bus], [B.cx, bus], [B.cx, ey]];
      }
      it.o.line.setAttribute('d', roundPath(pts, 14));
      const vis = n >= it.need;
      it.o.line.dataset.need = it.need;
      it.o.line.classList.toggle('on', vis);
      if (it.o.lab) {
        let bi = 0, bl = -1;
        for (let i = 0; i < pts.length - 1; i++) { const l = Math.abs(pts[i + 1][0] - pts[i][0]) + Math.abs(pts[i + 1][1] - pts[i][1]); if (l > bl) { bl = l; bi = i; } }
        const mx = (pts[bi][0] + pts[bi + 1][0]) / 2, my = (pts[bi][1] + pts[bi + 1][1]) / 2, lt = it.e[3], w = lt.length * 9.5 + 22;
        if (bl < w + 24) { it.o.lab.classList.remove('on'); return; }
        const r = it.o.lab.querySelector('rect'), t = it.o.lab.querySelector('text');
        r.setAttribute('x', mx - w / 2); r.setAttribute('y', my - 13); r.setAttribute('width', w);
        t.setAttribute('x', mx); t.setAttribute('y', my - 13);
        it.o.lab.classList.toggle('on', vis);
      }
    });
  }

  function roundPath(p, r) {
    let d = `M${p[0][0]} ${p[0][1]}`;
    for (let i = 1; i < p.length - 1; i++) {
      const [x0, y0] = p[i - 1], [x, y] = p[i], [x1, y1] = p[i + 1];
      const l0 = Math.hypot(x - x0, y - y0), l1 = Math.hypot(x1 - x, y1 - y), k = Math.min(r, l0 / 2, l1 / 2);
      d += ` L${x - (x - x0) / l0 * k} ${y - (y - y0) / l0 * k} Q${x} ${y} ${x + (x1 - x) / l1 * k} ${y + (y1 - y) / l1 * k}`;
    }
    const q = p[p.length - 1];
    return d + ` L${q[0]} ${q[1]}`;
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
