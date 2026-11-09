/* Abzeichen-System des Lernsystems (nur eigene Inhalte). Läuft im Browser, speichert nur auf diesem Gerät, keine Namen, kein Server.
   Prinzip wie bei Nike Run Club (Lehrkraft 2026-11-09): jedes Abzeichen = Emblem + Name + Zähler ("n Mal"), der mit jedem Erreichen wächst, dazu Datum.
   Kein Spiel mehr: Belohnung für Leistung, dazu Anzeige des Lernstands. Es wird nur Positives gesammelt (Lehrkraft 2026-11-09), bewusst wenige Abzeichen. Kein Abzeichen hängt vom ersten Versuch oder vom Verzicht auf Hilfe ab (kein Leistungsdruck, Lehrkraft 2026-11-09).
   Speicherschlüssel: ls-fort-<k> / ls-plan-<k> (Fortschritt der Kontrollseite), ls-stat-<k> (Versuche und Hilfen je Blatt),
   ls-bz (Zähler), ls-bd (Abzeichen: {id:{n:Zähler, t:erstes Mal, l:letztes Mal}}), ls-ton ('1' = Ton an).
   Dieselbe Datei liegt in jedem Blattordner und im Regal (Ordner abzeichen). Änderungen überall neu veröffentlichen. */
(function () {
  'use strict';
  /* Themenliste: k = Kennung des Blatts, n = Name, i = Symbol, gb = Fachgebiet */
  var REG = [
    {k: 'spannplanung', n: 'Spannen planen', i: '🗜️', gb: 'fertigung'},
    {k: 'honen', n: 'Honen', i: '🔧', gb: 'fertigung'},
    {k: 'rueckfederung', n: 'Rückfederung', i: '🔩', gb: 'fertigung'},
    {k: 'grundstromkreis', n: 'Stromkreis', i: '🔋', gb: 'elektro'},
    {k: 'ohm', n: 'Ohmsches Gesetz', i: '📈', gb: 'elektro'},
    {k: 'reihenschaltung', n: 'Reihenschaltung', i: '🔌', gb: 'elektro'},
    {k: 'parallelschaltung', n: 'Parallelschaltung', i: '🔀', gb: 'elektro'},
    {k: 'gemischt', n: 'Gemischte Schaltung', i: '🧩', gb: 'elektro'},
    {k: 'sicherheit', n: 'Sicherheit', i: '🛡️', gb: 'elektro'},
    {k: 'leistung', n: 'Arbeit und Leistung', i: '💡', gb: 'elektro'},
    {k: 'motor', n: 'Drehstrommotor', i: '⚙️', gb: 'elektro'},
    {k: 'mt-biegung', n: 'Biegung: Brücke und Kragarm', i: '🏗️', gb: 'konstruktion'}
  ];
  var GEBIETE = {elektro: {n: 'Elektrotechnik', i: '⚡'}, fertigung: {n: 'Fertigung', i: '🏭'}, konstruktion: {n: 'Konstruktion', i: '📐'}};
  var TIER = [null, {n: 'Bronze', c: '#cd7f32'}, {n: 'Silber', c: '#c9d3df'}, {n: 'Gold', c: '#ffd24a'}];

  /* Abzeichen: id, n = Name, i = Emblem, c = Farbe, grp = Gruppe im Regal, wert(ctx) = aktueller Zähler (wächst), e = Einheit,
     still = Zähler wächst ohne Freischalt-Fenster, txt = Beschreibung */
  var DEFS = [
    {id: 'bronze', grp: 'stufen', n: 'Bronze', i: '🥉', c: '#cd7f32', e: 'Mal', txt: 'Die Hälfte der Aufgaben eines Themas richtig gelöst.', wert: function (c) { return c.stufen[1]; }},
    {id: 'silber', grp: 'stufen', n: 'Silber', i: '🥈', c: '#c9d3df', e: 'Mal', txt: 'Mindestens 80 % der Aufgaben eines Themas richtig gelöst.', wert: function (c) { return c.stufen[2]; }},
    {id: 'perfekt', grp: 'stufen', n: 'Perfektes Blatt', i: '💎', c: '#5ee7ff', e: 'Mal', txt: 'Alle Aufgaben eines Themas richtig gelöst, egal wie viele Versuche du gebraucht hast.', wert: function (c) { return c.stufen[3]; }},
    {id: 'woche', grp: 'ausdauer', n: 'Dranbleiber', i: '📅', c: '#7dff6a', e: 'Wochen', txt: 'Wochen, in denen du mindestens eine Aufgabe gelöst hast.', wert: function (c) { return (c.bz.wo || []).length; }},
    {id: 'aufgaben', grp: 'ausdauer', n: 'Aufgaben', i: '✅', c: '#19e3ff', e: 'gelöst', still: true, txt: 'Richtig gelöste Aufgaben über alle Themen.', wert: function (c) { return c.gel; }}
  ];
  var TITEL = [[0, 'Neuling', '🌱'], [2, 'Einsteiger', '🌿'], [6, 'Fortgeschritten', '🌳'], [15, 'Profi', '⭐'], [30, 'Meister', '👑']];

  function lies(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function schreib(k, v) { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } }
  function obj(k, d) { try { var v = JSON.parse(lies(k) || 'null'); return v && typeof v === 'object' ? v : d; } catch (e) { return d; } }
  function sp(k, v) { schreib(k, JSON.stringify(v)); }
  function def(id) { for (var i = 0; i < DEFS.length; i++) if (DEFS[i].id === id) return DEFS[i]; return null; }

  /* ---------- Fortschritt, Stufen und Lernstand */
  function stand(r) {
    var plan = obj('ls-plan-' + r.k, []), fort = obj('ls-fort-' + r.k, []);
    if (!Array.isArray(plan) || !Array.isArray(fort)) return {n: 0, d: 0};
    plan = plan.map(String); fort = fort.map(String);
    return {n: plan.length, d: plan.filter(function (x) { return fort.indexOf(x) >= 0; }).length};
  }
  function stufe(r) {
    var s = stand(r), n = s.n, d = s.d;
    if (!n) return 0;
    return d >= n ? 3 : d >= Math.floor((n * 4 + 4) / 5) ? 2 : d >= Math.ceil(n / 2) ? 1 : 0;
  }
  function stat(k) { var s = obj('ls-stat-' + k, {}); s.f = s.f || {}; s.h = s.h || {}; s.d = s.d || {}; s.dd = s.dd || {}; s.ok = s.ok || {}; return s; }
  /* Lernstand eines Themas: Selbstständig und Sicher zählen nur Aufgaben, die mit der neuen Kontrollseite erfasst wurden */
  function profil(r) {
    var sd = stand(r), st = stat(r.k), plan = obj('ls-plan-' + r.k, []).map(String), fort = obj('ls-fort-' + r.k, []).map(String);
    var tr = plan.filter(function (a) { return st.ok[a]; });
    var erfasst = tr.length > 0 || Object.keys(st.f).length > 0;
    var stolper = [];
    plan.forEach(function (a) { var f = st.f[a] || 0; if (f > 0) stolper.push({a: a, f: f, ok: fort.indexOf(a) >= 0}); });
    stolper.sort(function (x, y) { return y.f - x.f; });
    return {n: sd.n, d: sd.d, tr: tr.length, erfasst: erfasst,
      ohneH: tr.filter(function (a) { return !(st.h[a] > 0); }).length, erst: tr.filter(function (a) { return !(st.f[a] > 0); }).length, stolper: stolper.slice(0, 3)};
  }
  function kontext() {
    var c = {bz: obj('ls-bz', {}), gel: 0, stufen: [0, 0, 0, 0]};
    REG.forEach(function (r) {
      var s = stufe(r), p = profil(r), t;
      c.gel += p.d;
      for (t = 1; t <= s; t++) c.stufen[t]++;
    });
    return c;
  }
  function gesamtstand() {
    var g = {gel: 0, tr: 0, erst: 0, ohneH: 0};
    REG.forEach(function (r) { var p = profil(r); g.gel += p.d; g.tr += p.tr; g.erst += p.erst; g.ohneH += p.ohneH; });
    return g;
  }

  /* ---------- Zähler fortschreiben; liefert Ereignisse {id, n, neu} für das Freischalt-Fenster */
  function bdLesen() {
    var bd = obj('ls-bd', {}), id;
    for (id in bd) if (typeof bd[id] !== 'object' || bd[id] === null || !def(id)) delete bd[id];
    return bd;
  }
  /* Summe der Zähler (ohne Aufgabenzähler) bestimmt den Rang */
  function rangSumme(bd) { var n = 0, id; for (id in bd) if (def(id) && !def(id).still && !def(id).rankless) n += bd[id].n; return n; }
  function rangStufe(bd) { var n = rangSumme(bd), i = 0, k; for (k = 0; k < TITEL.length; k++) if (n >= TITEL[k][0]) i = k; return i; }
  function pruefe() {
    var bd = bdLesen(), c = kontext(), neu = [], jetzt = Date.now(), geaendert = false;
    DEFS.forEach(function (D) {
      var v = D.wert(c), alt = bd[D.id] ? bd[D.id].n : 0;
      if (v > alt) {
        bd[D.id] = {n: v, t: bd[D.id] ? bd[D.id].t : jetzt, l: jetzt}; geaendert = true;
        if (!D.still) neu.push({id: D.id, n: v, neu: alt === 0});
      }
    });
    if (geaendert) sp('ls-bd', bd);
    return neu;
  }
  /* Liste für das Regal: alle Abzeichen mit Zähler und Datum des letzten Erreichens */
  function abzeichen() {
    var bd = bdLesen();
    return DEFS.map(function (D) { var b = bd[D.id]; return {id: D.id, grp: D.grp, n: D.n, i: D.i, c: D.c, e: D.e, txt: D.txt, zaehler: b ? b.n : 0, datum: b ? b.l : null}; });
  }

  /* ---------- Ereignisse der Kontrollseite */
  function fehler(k, a, spez) {
    var s = stat(k), bz = obj('ls-bz', {});
    s.f[a] = (s.f[a] || 0) + 1; if (spez) s.d[a] = 1; bz.serie = 0;
    sp('ls-stat-' + k, s); sp('ls-bz', bz);
  }
  function hilfe(k, a, stufeNr) { var s = stat(k); s.h[a] = Math.max(s.h[a] || 0, stufeNr); sp('ls-stat-' + k, s); }
  function erfolg(k, a) {
    var s = stat(k), bz = obj('ls-bz', {});
    if (s.ok[a]) return;
    s.ok[a] = 1;
    var w = Math.floor(Date.now() / 604800000); bz.wo = bz.wo || []; if (bz.wo.indexOf(w) < 0) bz.wo.push(w);
    sp('ls-stat-' + k, s); sp('ls-bz', bz);
  }

  /* ---------- Rang: Summe aller Zähler (ohne Aufgabenzähler) */
  function titel() {
    var bd = bdLesen(), n = rangSumme(bd), i = rangStufe(bd);
    var nxt = TITEL[i + 1] || null;
    return {n: n, name: TITEL[i][1], sym: TITEL[i][2], stufe: i, von: TITEL[i][0], next: nxt ? nxt[1] : null, bis: nxt ? nxt[0] : null};
  }
  function datum(ms) { try { return new Date(ms).toLocaleDateString('de-DE', {day: 'numeric', month: 'short', year: 'numeric'}); } catch (e) { return ''; } }

  /* ---------- Anzeige: Freischalt-Fenster mit Konfetti und optionalem Ton */
  /* Variante im Apple-Stil (Seite setzt --lsb-stil: apple und die Farbtokens --card, --label, --sec, --tint, --on-tint, --sans) */
  var APPLE_CSS = '.lsb-ov{position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.38);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:20px;animation:lsbf .2s}' +
    '.lsb-card{max-width:320px;width:100%;text-align:center;background:var(--card);border-radius:20px;padding:26px 22px 20px;color:var(--label);font-family:var(--sans,system-ui,sans-serif);box-shadow:0 24px 64px rgba(0,0,0,.35),0 0 0 .5px rgba(0,0,0,.1);animation:lsbp .45s cubic-bezier(.2,1.2,.4,1)}' +
    '.lsb-k{font-size:.75rem;font-weight:600;letter-spacing:.08em;color:var(--sec)}' +
    '.lsb-i{font-family:"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif;font-size:64px;line-height:1.2;margin:12px 0 6px}' +
    '.lsb-n{font-size:1.375rem;font-weight:700;letter-spacing:-.01em;margin:2px 0 2px}.lsb-z{font-size:1.0625rem;font-weight:600;color:var(--sec);margin-bottom:8px}.lsb-t{font-size:.9375rem;line-height:1.4;color:var(--sec);margin-bottom:4px}' +
    '.lsb-b{appearance:none;border:0;width:100%;background:var(--tint);color:var(--on-tint,#fff);font:600 1.0625rem/1 var(--sans,system-ui,sans-serif);padding:15px;border-radius:12px;cursor:pointer;min-height:48px}' +
    '.lsb-l{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:12px 0 18px;font-size:.875rem}.lsb-l span{background:var(--fill);border-radius:10px;padding:6px 10px}' +
    '.lsb-cf{position:fixed;top:-12px;width:8px;height:12px;z-index:10000;border-radius:2px;pointer-events:none;animation:lsbc 2.8s linear forwards}' +
    '@keyframes lsbf{from{opacity:0}to{opacity:1}}@keyframes lsbp{0%{transform:scale(.8);opacity:0}100%{transform:scale(1);opacity:1}}' +
    '@keyframes lsbc{to{transform:translateY(110vh) rotate(720deg)}}' +
    '@media (prefers-reduced-motion:reduce){.lsb-card,.lsb-ov{animation:none}.lsb-cf{display:none}}';
  var cssOk = false, appleStil = false;
  function css() {
    if (cssOk) return; cssOk = true;
    var s = document.createElement('style'), apple = false;
    try { apple = (getComputedStyle(document.documentElement).getPropertyValue('--lsb-stil') || '').indexOf('apple') >= 0; } catch (e) { apple = false; }
    appleStil = apple;
    s.textContent = apple ? APPLE_CSS : '.lsb-ov{position:fixed;inset:0;z-index:9999;background:rgba(4,8,14,.82);display:flex;align-items:center;justify-content:center;padding:20px;animation:lsbf .25s}' +
      '.lsb-card{position:relative;max-width:340px;width:100%;text-align:center;background:#0e1623;border:1px solid var(--lsc,#19e3ff);border-radius:18px;padding:26px 20px 20px;color:#dbe7f5;font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;box-shadow:0 0 40px var(--lsc,#19e3ff);animation:lsbp .5s}' +
      '.lsb-k{font:700 11px ui-monospace,Consolas,monospace;letter-spacing:.2em;color:var(--lsc,#19e3ff)}' +
      '.lsb-i{font-family:"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif;font-size:72px;line-height:1.1;margin:10px 0 4px;text-rendering:optimizeLegibility;filter:drop-shadow(0 0 14px var(--lsc,#19e3ff))}' +
      '.lsb-n{font-size:19px;font-weight:700;margin:2px 0 4px}.lsb-z{font:700 15px ui-monospace,Consolas,monospace;color:var(--lsc,#19e3ff);margin-bottom:8px}.lsb-t{font-size:14px;line-height:1.5;color:#9fb3cc;margin-bottom:4px}' +
      '.lsb-b{appearance:none;border:1px solid var(--lsc,#19e3ff);background:rgba(25,227,255,.1);color:var(--lsc,#19e3ff);font:700 13px ui-monospace,Consolas,monospace;letter-spacing:.16em;padding:11px 26px;border-radius:10px;cursor:pointer}' +
      '.lsb-l{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:12px 0 16px;font-size:13px}.lsb-l span{border:1px solid #1f3050;border-radius:10px;padding:6px 10px}' +
      '.lsb-cf{position:fixed;top:-12px;width:8px;height:12px;z-index:10000;border-radius:2px;pointer-events:none;animation:lsbc 2.8s linear forwards}' +
      '@keyframes lsbf{from{opacity:0}to{opacity:1}}@keyframes lsbp{0%{transform:scale(.6);opacity:0}60%{transform:scale(1.06)}100%{transform:scale(1);opacity:1}}' +
      '@keyframes lsbc{to{transform:translateY(110vh) rotate(720deg)}}' +
      '@media (prefers-reduced-motion:reduce){.lsb-card,.lsb-ov{animation:none}.lsb-cf{display:none}}';
    document.head.appendChild(s);
  }
  function ton() {
    if (lies('ls-ton') !== '1') return;
    try {
      var C = window.AudioContext || window.webkitAudioContext, a = new C(), t = a.currentTime;
      [523, 659, 784].forEach(function (f, i) {
        var o = a.createOscillator(), g = a.createGain(); o.type = 'triangle'; o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, t + i * 0.12); g.gain.exponentialRampToValueAtTime(0.18, t + i * 0.12 + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + i * 0.12 + 0.3);
        o.connect(g); g.connect(a.destination); o.start(t + i * 0.12); o.stop(t + i * 0.12 + 0.32);
      });
    } catch (e) { /* kein Ton */ }
  }
  function konfetti() {
    var farben = appleStil ? ['#86aedb', '#7cc4a0', '#d9b35a', '#d68f55', '#b9c2cc'] : ['#19e3ff', '#2dff9a', '#ffd24a', '#ff4d6a', '#c9d3df'], i;
    for (i = 0; i < 40; i++) {
      var d = document.createElement('div'); d.className = 'lsb-cf';
      d.style.left = Math.random() * 100 + 'vw'; d.style.background = farben[i % farben.length];
      d.style.animationDelay = Math.random() * 0.6 + 's'; d.style.animationDuration = 2 + Math.random() * 1.4 + 's';
      document.body.appendChild(d); (function (x) { setTimeout(function () { if (x.parentNode) x.parentNode.removeChild(x); }, 4200); })(d);
    }
    if (navigator.vibrate) { try { navigator.vibrate([40, 40, 80]); } catch (e) { /* ok */ } }
  }
  /* ereignisse: Liste aus pruefe() */
  function zeige(ereignisse, fertig) {
    var ev = (ereignisse || []).filter(function (x) { return x && def(x.id); });
    if (!ev.length || !document.body) { if (fertig) fertig(); return; }
    css();
    var ov = document.createElement('div'); ov.className = 'lsb-ov'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true');
    var card = document.createElement('div'); card.className = 'lsb-card'; ov.appendChild(card);
    function el(t, c, h) { var e = document.createElement(t); e.className = c; if (h !== undefined) e.textContent = h; return e; }
    if (ev.length > 3) {
      card.style.setProperty('--lsc', '#ffd24a');
      card.appendChild(el('div', 'lsb-k', 'NEUE ABZEICHEN'));
      card.appendChild(el('div', 'lsb-i', '🎉'));
      card.appendChild(el('div', 'lsb-n', ev.length + ' Abzeichen erreicht'));
      var l = el('div', 'lsb-l'); ev.forEach(function (x) { var y = def(x.id); l.appendChild(el('span', '', y.i + ' ' + y.n + ' · ' + x.n + ' ' + y.e)); }); card.appendChild(l);
      ev = [];
    } else {
      var x = ev.shift(), y = def(x.id); card.style.setProperty('--lsc', y.c);
      card.appendChild(el('div', 'lsb-k', x.neu ? 'NEUES ABZEICHEN' : 'ABZEICHEN WIEDER ERREICHT'));
      card.appendChild(el('div', 'lsb-i', y.i)); card.appendChild(el('div', 'lsb-n', y.n)); card.appendChild(el('div', 'lsb-z', x.n + ' ' + y.e)); card.appendChild(el('div', 'lsb-t', y.txt));
    }
    document.body.appendChild(ov); konfetti(); ton();
    var timer = null, zu_ = false;
    function zu() { if (zu_) return; zu_ = true; if (timer) clearTimeout(timer); if (ov.parentNode) ov.parentNode.removeChild(ov); document.removeEventListener('keydown', taste); zeige(ev, fertig); }
    function taste(e) { if (e.key === 'Escape' || e.key === 'Enter') zu(); }
    /* kein Knopf: Fenster verschwindet von selbst, Tippen irgendwo oder Escape schließt sofort */
    ov.addEventListener('click', zu); document.addEventListener('keydown', taste);
    /* Ohne Antippen verschwindet das Fenster von selbst (Lehrkraft 2026-11-09): sanft ausblenden, dann weiter */
    timer = setTimeout(function () { ov.style.transition = 'opacity .3s'; ov.style.opacity = '0'; timer = setTimeout(zu, 320); }, card.querySelector('.lsb-l') ? 6000 : 4500);
  }
  function nachher(fertig) { var n = pruefe(); zeige(n, fertig); return n; }

  /* ---------- Sicherungscode (Übertragen auf ein anderes Gerät) */
  function hash(s) { var h = 2166136261, i; for (i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; } return ('0000000' + h.toString(16)).slice(-8); }
  function exportCode() {
    var o = {v: 3, bd: bdLesen(), bz: obj('ls-bz', {}), f: {}, p: {}, s: {}};
    REG.forEach(function (r) {
      o.f[r.k] = obj('ls-fort-' + r.k, []); o.p[r.k] = obj('ls-plan-' + r.k, []);
      var st = obj('ls-stat-' + r.k, null); if (st) o.s[r.k] = st;
    });
    var j = JSON.stringify(o);
    return 'LS3-' + btoa(j) + '-' + hash(j);
  }
  function mischeStat(a, b) {
    var o = {f: {}, h: {}, d: {}, dd: {}, ok: {}}, key;
    ['f', 'h'].forEach(function (z) { var u = a[z] || {}, v = b[z] || {}; for (key in u) o[z][key] = Math.max(u[key] || 0, v[key] || 0); for (key in v) o[z][key] = Math.max(o[z][key] || 0, v[key] || 0); });
    ['d', 'dd', 'ok'].forEach(function (z) { var u = a[z] || {}, v = b[z] || {}; for (key in u) if (u[key]) o[z][key] = 1; for (key in v) if (v[key]) o[z][key] = 1; });
    return o;
  }
  function importCode(code) {
    code = String(code || '').replace(/\s+/g, '');
    var m = /^LS3-([A-Za-z0-9+\/=]+)-([0-9a-f]{8})$/.exec(code), j, o;
    if (!m) return {ok: false, msg: 'Der Code ist unvollständig, falsch kopiert oder stammt aus einer älteren Fassung.'};
    try { j = atob(m[1]); } catch (e) { return {ok: false, msg: 'Der Code ist beschädigt.'}; }
    if (hash(j) !== m[2]) return {ok: false, msg: 'Der Code ist beschädigt (Prüfsumme stimmt nicht).'};
    try { o = JSON.parse(j); } catch (e) { return {ok: false, msg: 'Der Code ist beschädigt.'}; }
    if (!o || o.v !== 3) return {ok: false, msg: 'Der Code stammt aus einer anderen Fassung.'};
    var bd = bdLesen(), bz = obj('ls-bz', {}), id, k, ob = o.bz || {};
    for (id in (o.bd || {})) {
      var x = o.bd[id]; if (!def(id) || !x || typeof x !== 'object') continue;
      var y = bd[id]; bd[id] = y ? {n: Math.max(y.n, +x.n || 0), t: Math.min(y.t, +x.t || y.t), l: Math.max(y.l, +x.l || 0)} : {n: +x.n || 0, t: +x.t || Date.now(), l: +x.l || Date.now()};
    }
    
    var wo = (bz.wo || []).concat(Array.isArray(ob.wo) ? ob.wo : []).filter(function (q) { return typeof q === 'number'; });
    bz.wo = wo.filter(function (q, i) { return wo.indexOf(q) === i; });
    sp('ls-bd', bd); sp('ls-bz', bz);
    REG.forEach(function (r) {
      k = r.k;
      var f = obj('ls-fort-' + k, []).concat((o.f || {})[k] || []).map(String), p = obj('ls-plan-' + k, []).concat((o.p || {})[k] || []).map(String);
      f = f.filter(function (q, i) { return f.indexOf(q) === i; }); p = p.filter(function (q, i) { return p.indexOf(q) === i; });
      if (p.length) { sp('ls-plan-' + k, p); sp('ls-fort-' + k, f); }
      if ((o.s || {})[k]) sp('ls-stat-' + k, mischeStat(stat(k), o.s[k]));
    });
    return {ok: true, msg: 'Abzeichen, Fortschritt und Lernstand wurden übernommen.'};
  }

  window.LSB = {
    REG: REG, GEBIETE: GEBIETE, DEFS: DEFS, TIER: TIER, TITEL: TITEL, stand: stand, stufe: stufe, profil: profil, gesamtstand: gesamtstand,
    pruefe: pruefe, abzeichen: abzeichen, titel: titel, datum: datum, fehler: fehler, hilfe: hilfe, erfolg: erfolg, zeige: zeige, nachher: nachher,
    exportCode: exportCode, importCode: importCode, bd: bdLesen, bz: function () { return obj('ls-bz', {}); }
  };
})();
