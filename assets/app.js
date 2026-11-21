/* 2026 Tokyo trip site */
(function(){
  const T = window.TRIP;
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const store = {
    get(k, d){ try{ const v = localStorage.getItem("tk26-"+k); return v==null ? d : JSON.parse(v); }catch(e){ return d; } },
    set(k, v){ try{ localStorage.setItem("tk26-"+k, JSON.stringify(v)); }catch(e){} },
    del(k){ try{ localStorage.removeItem("tk26-"+k); }catch(e){} }
  };
  const CAT = { sight:"景點", light:"點燈・夜景", food:"餐飲", shop:"購物", move:"交通" };
  const yen = n => "¥" + Math.round(Number(n)||0).toLocaleString("en-US");

  /* ---------- geo ---------- */
  function haversine(a, b){
    const R = 6371, r = x => x*Math.PI/180;
    const dLat = r(b.lat-a.lat), dLng = r(b.lng-a.lng);
    const h = Math.sin(dLat/2)**2 + Math.cos(r(a.lat))*Math.cos(r(b.lat))*Math.sin(dLng/2)**2;
    return 2*R*Math.asin(Math.sqrt(h));
  }
  function bearing(a, b){
    const r = x => x*Math.PI/180;
    const y = Math.sin(r(b.lng-a.lng))*Math.cos(r(b.lat));
    const x = Math.cos(r(a.lat))*Math.sin(r(b.lat)) - Math.sin(r(a.lat))*Math.cos(r(b.lat))*Math.cos(r(b.lng-a.lng));
    return (Math.atan2(y, x)*180/Math.PI + 360) % 360;
  }
  const DIRS = ["北","東北","東","東南","南","西南","西","西北"];
  const ARROWS = ["↑","↗","→","↘","↓","↙","←","↖"];
  function rel(p){
    const d = haversine(T.hotel, p);
    if (d < 0.4) return { text:"飯店附近", arrow:"★", km:d };
    const i = Math.round(bearing(T.hotel, p)/45) % 8;
    return { text:`品川${DIRS[i]} ${d < 10 ? d.toFixed(1) : Math.round(d)} km`, arrow:ARROWS[i], km:d };
  }

  /* ---------- theme ---------- */
  function setTheme(t){
    document.documentElement.setAttribute("data-theme", t);
    try{ localStorage.setItem("tk26-theme", t); }catch(e){}
    $$("#themeSwitch button").forEach(b => b.classList.toggle("on", b.dataset.theme === t));
    if (window._map) refreshMapStyle();
  }
  $$("#themeSwitch button").forEach(b => b.addEventListener("click", () => setTheme(b.dataset.theme)));
  setTheme(document.documentElement.getAttribute("data-theme"));
  $("#ver").textContent = "行程 " + T.version;

  /* ---------- router ---------- */
  const SECS = ["overview","board","map","events","food","todo","stay","tax","expense"];
  function show(id){
    if (!SECS.includes(id)) id = "overview";
    $$(".sec").forEach(s => s.classList.toggle("on", s.id === "sec-"+id));
    $$("#nav a").forEach(a => a.classList.toggle("on", a.dataset.sec === id));
    if (id === "map") initMap();
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", () => show(location.hash.slice(1)));

  /* ---------- itinerary state (kanban order) ---------- */
  const ORIG = T.items.map(i => ({...i}));
  function loadItems(){
    const saved = store.get("board", null); // {id:{day,order}}
    const items = ORIG.map((i, idx) => ({...i, order: idx}));
    if (saved) items.forEach(i => { if (saved[i.id]) { i.day = saved[i.id].day; i.order = saved[i.id].order; i.moved = saved[i.id].day !== ORIG.find(o=>o.id===i.id).day; } });
    return items;
  }
  let ITEMS = loadItems();
  const byDay = d => ITEMS.filter(i => i.day === d).sort((a,b) => a.order - b.order);

  /* ---------- overview ---------- */
  function renderOverview(){
    const start = new Date("2026-11-28T20:55:00+08:00");
    const days = Math.ceil((start - new Date())/86400000);
    const lights = T.items.filter(i => i.cat === "light").length;
    const spend = T.budget.reduce((s,b) => s+b.amount, 0) + T.lodging;
    $("#ovStats").innerHTML = [
      ["出發倒數", days > 0 ? days + " 天" : "旅途中", true],
      ["行程點", T.items.length + " 個", false],
      ["點燈・夜景", lights + " 場", false],
      ["總預估（含住宿）", yen(spend), false]
    ].map(([k,v,a]) => `<div class="stat"><div class="k">${k}</div><div class="v ${a?"accent":""}">${v}</div></div>`).join("");
    const must = [
      ["11/29","神宮外苑點燈最後一晚 16:30–19:30"],
      ["11/29","都廳投影：19:00 哥吉拉、19:30 寶可夢 TCG"],
      ["11/29 12:00","手機搶琥珀 12/5 12:00"],
      ["12/01","光之森林 19:00（預購）"],
      ["12/03","紅磚倉庫寶可夢燈飾＋市役所寶可夢郵筒"],
      ["12/05","18:00 YOASOBI 東京巨蛋"]
    ];
    $("#ovMust").innerHTML = must.map(([d,t]) => `<li><span class="tag t-accent">${d}</span><span class="txt">${esc(t)}</span></li>`).join("");
    const V = { ok:["t-ok","可以"], warn:["t-warn","偏晚／未確認"], stop:["t-stop","已過"] };
    $("#ovFoliage").innerHTML = `<tr><th>地點</th><th>你去</th><th>現況</th><th></th></tr>` +
      T.foliage.map(f => `<tr><td><b>${esc(f.spot)}</b></td><td class="mono">${f.visit}</td><td>${esc(f.status)}</td><td><span class="tag ${V[f.verdict][0]}">${V[f.verdict][1]}</span></td></tr>`).join("");
  }

  /* ---------- kanban ---------- */
  function cardHTML(i){
    const r = rel(i);
    const title = i.link ? `<a href="${esc(i.link)}" target="_blank" rel="noopener">${esc(i.title)}</a>` : esc(i.title);
    return `<div class="card cat-${i.cat}${i.moved?" moved":""}" data-id="${i.id}" style="--dc:var(--d${i.day})">
      <div class="top"><span class="time">${esc(i.time)}</span><span class="tag t-${i.cat}">${CAT[i.cat]}</span></div>
      <h4>${title}</h4>
      <div class="dist"><span class="arr">${r.arrow}</span>${esc(r.text)}</div>
      <div class="more">
        ${i.transit ? `<div class="tr">🚃 ${esc(i.transit)}</div>` : ""}
        ${i.note ? `<div>${esc(i.note)}</div>` : ""}
        <button class="maplink" data-go="${i.id}">在地圖上看</button>
      </div></div>`;
  }
  function renderBoard(){
    $("#boardLegend").innerHTML = Object.entries(CAT).map(([k,v]) => `<span><i style="background:var(--c-${k})"></i>${v}</span>`).join("");
    $("#board").innerHTML = T.days.map(d => `<div class="col" style="--dc:var(--d${d.id})">
      <div class="col-head"><div class="d"><b>D${d.id}</b><span>${d.date}（${d.dow}）</span></div><div class="t">${esc(d.title)}</div></div>
      <div class="col-body" data-day="${d.id}">${byDay(d.id).map(cardHTML).join("")}</div></div>`).join("");
    $$("#board .col-body").forEach(el => {
      if (window.Sortable) new Sortable(el, { group:"days", animation:150, delay:120, delayOnTouchOnly:true, ghostClass:"sortable-ghost", onEnd: saveBoard });
    });
  }
  function saveBoard(){
    const saved = {};
    $$("#board .col-body").forEach(col => {
      const day = +col.dataset.day;
      $$(".card", col).forEach((c, idx) => { saved[c.dataset.id] = { day, order: idx }; });
    });
    store.set("board", saved);
    ITEMS = loadItems();
    $$("#board .card").forEach(c => c.classList.toggle("moved", !!ITEMS.find(i => i.id === c.dataset.id)?.moved));
    if (window._map) drawMarkers();
  }
  $("#board").addEventListener("click", e => {
    const go = e.target.closest("[data-go]");
    if (go){ e.stopPropagation(); location.hash = "map"; setTimeout(() => focusItem(go.dataset.go), 300); return; }
    if (e.target.closest("a")) return;
    const c = e.target.closest(".card"); if (c) c.classList.toggle("open");
  });
  $("#boardReset").addEventListener("click", () => { store.del("board"); ITEMS = loadItems(); renderBoard(); if (window._map) drawMarkers(); });

  /* ---------- map ---------- */
  let map, layer, mapDay = 0, markerById = {};
  function initMap(){
    if (map){ setTimeout(() => map.invalidateSize(), 50); return; }
    if (!window.L) { $("#map").textContent = "地圖載入失敗（需要網路）"; return; }
    map = window._map = L.map("map", { zoomControl:true }).setView([T.hotel.lat, T.hotel.lng], 11);
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      maxZoom:19, subdomains:"abcd", attribution:'&copy; OpenStreetMap &copy; CARTO'
    }).addTo(map);
    layer = L.layerGroup().addTo(map);
    $("#mapDays").innerHTML = `<button class="chip on" data-d="0">全部</button>` +
      T.days.map(d => `<button class="chip daychip" data-d="${d.id}" style="--dc:var(--d${d.id})">D${d.id} ${d.date}</button>`).join("");
    $("#mapDays").addEventListener("click", e => {
      const b = e.target.closest("[data-d]"); if (!b) return;
      mapDay = +b.dataset.d; $$("#mapDays .chip").forEach(x => x.classList.toggle("on", x === b)); drawMarkers(true);
    });
    drawMarkers(true);
  }
  function accent(){ return getComputedStyle(document.documentElement).getPropertyValue("--accent").trim(); }
  function dayColor(n){ return getComputedStyle(document.documentElement).getPropertyValue("--d"+n).trim() || accent(); }
  function refreshMapStyle(){ drawMarkers(); }
  function drawMarkers(fit){
    layer.clearLayers(); markerById = {};
    const ac = accent();
    // distance rings
    [5,10,20,50].forEach(km => {
      L.circle([T.hotel.lat, T.hotel.lng], { radius:km*1000, color:ac, weight:1, opacity:.35, fill:false, dashArray:"4 6" }).addTo(layer);
      L.marker([T.hotel.lat + km/111, T.hotel.lng], { icon: L.divIcon({ className:"", html:`<span class="ring-label">${km} km</span>`, iconSize:[44,16], iconAnchor:[22,8] }), interactive:false }).addTo(layer);
    });
    L.marker([T.hotel.lat, T.hotel.lng], { icon: L.divIcon({ className:"", html:'<div class="pin-hotel">★</div>', iconSize:[26,26], iconAnchor:[13,13] }), zIndexOffset:1000 })
      .bindPopup(`<b>${T.hotel.name}</b><br>所有距離的基準點`).addTo(layer);
    const list = [], pts = [];
    T.days.forEach(d => {
      const items = byDay(d.id);
      const route = [];
      items.forEach((i, n) => {
        const on = !mapDay || mapDay === d.id;
        const label = `${d.id}-${n+1}`;
        const r = rel(i);
        const m = L.marker([i.lat, i.lng], {
          icon: L.divIcon({ className:"", html:`<div class="pin ${on?"":"faded"}" style="${on?`--dc:var(--d${d.id})`:""}">${on?label:""}</div>`, iconSize:[24,24], iconAnchor:[12,12] }),
          zIndexOffset: on ? 500 : 0, opacity: on ? 1 : .55
        }).bindPopup(`<b>D${label} ${esc(i.time)}</b><br>${esc(i.title)}<br><span style="color:#6b6b7b">${esc(r.text)}</span>${i.link?`<br><a href="${esc(i.link)}" target="_blank" rel="noopener">Tabelog</a>`:""}`).addTo(layer);
        markerById[i.id] = m;
        if (on){ route.push([i.lat, i.lng]); pts.push([i.lat, i.lng]); list.push({ i, label, r }); }
      });
      if (mapDay === d.id && route.length > 1) L.polyline(route, { color:dayColor(d.id), weight:3, opacity:.75 }).addTo(layer);
    });
    $("#mapList").innerHTML = `<div class="small muted" style="margin-bottom:6px">${mapDay ? "D"+mapDay+" 的行程點" : "全部行程點"}（點一下定位）</div>` +
      list.map(x => `<div class="row" data-id="${x.i.id}" style="--dc:var(--d${x.i.day})"><span class="n">${x.label}</span><span><b>${esc(x.i.title)}</b><br><span class="muted">${esc(x.i.time)} · ${esc(x.r.text)}</span></span></div>`).join("");
    if (fit && pts.length) map.fitBounds(L.latLngBounds(pts.concat([[T.hotel.lat, T.hotel.lng]])), { padding:[30,30] });
  }
  function focusItem(id){
    initMap();
    const it = ITEMS.find(i => i.id === id); if (!it) return;
    if (mapDay && mapDay !== it.day){ mapDay = 0; $$("#mapDays .chip").forEach(x => x.classList.toggle("on", x.dataset.d === "0")); drawMarkers(); }
    map.setView([it.lat, it.lng], 15); markerById[id]?.openPopup();
  }
  $("#mapList").addEventListener("click", e => { const r = e.target.closest(".row"); if (r) focusItem(r.dataset.id); });

  /* ---------- events ---------- */
  function renderEvents(){
    $("#evTable").innerHTML = `<tr><th>活動</th><th>期間</th><th>時間</th><th>費用</th><th>排在</th></tr>` +
      T.events.map(e => `<tr><td><a href="${esc(e.src)}" target="_blank" rel="noopener">${esc(e.name)}</a></td><td class="mono">${esc(e.when)}</td><td>${esc(e.hours)}</td><td>${esc(e.fee)}</td><td><span class="tag t-accent">${esc(e.day)}</span></td></tr>`).join("");
  }

  /* ---------- Google Sheet API (Apps Script web app) ---------- */
  const Sheet = {
    cfg(){ return store.get("sheet", null); },
    on(){ const c = this.cfg(); return !!(c && c.url); },
    async list(name){ return (await this.post({ action:"list", sheet:name })).rows; },
    async post(body){
      const c = this.cfg();
      const r = await fetch(c.url, { method:"POST", headers:{ "Content-Type":"text/plain;charset=utf-8" }, body: JSON.stringify({ ...body, token: c.token||"" }) });
      const j = await r.json(); if (!j.ok) throw new Error(j.error || "post failed"); return j;
    }
  };
  function setSync(el, state, text){ const d = $(".dot", el); d.className = "dot " + (state||""); $("span", el).textContent = text; }
  function errText(e){
    const m = String(e && e.message || e);
    if (/bad token/.test(m)) return "通行碼不對（bad token）";
    if (/use POST|unknown action/.test(m)) return "Apps Script 還是舊版，請貼新版程式碼並重新部署成「新版本」";
    if (/sheet not found/.test(m)) return "找不到分頁，請在 Apps Script 執行 setup()";
    if (/Failed to fetch|NetworkError|Load failed|Unexpected token|JSON/.test(m)) return "連不到網址或回應不是 JSON（確認網址結尾是 /exec、存取權是「所有人」）";
    return m;
  }
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2,7);

  /* ---------- restaurants ---------- */
  let FOOD = [], foodType = "全部", foodSort = { k:"tabelog", dir:-1 };
  async function loadFood(){
    if (Sheet.on()){
      setSync($("#foodSync"), "busy", "同步中…");
      try { FOOD = (await Sheet.list("restaurants")).map(normFood); setSync($("#foodSync"), "ok", "已連線 Google Sheet"); }
      catch(e){ console.error("[tk26] restaurants", e); FOOD = store.get("food", null) || T.restaurants.map(r => ({ id: uid(), ...r })); setSync($("#foodSync"), "err", "連線失敗：" + errText(e)); }
    } else {
      FOOD = store.get("food", null) || T.restaurants.map(r => ({ id: uid(), ...r }));
      setSync($("#foodSync"), "", "本機模式");
    }
    renderFood();
  }
  function normFood(r){ ["tabelog","google","tabelogReviews","googleReviews"].forEach(k => { if (r[k] !== "" && r[k] != null) r[k] = Number(r[k]); }); return r; }
  function renderFood(){
    const types = ["全部", ...Array.from(new Set(FOOD.map(f => f.type).filter(Boolean)))];
    $("#foodTypes").innerHTML = types.map(t => `<button class="chip ${t===foodType?"on":""}" data-t="${esc(t)}">${esc(t)}</button>`).join("");
    let rows = FOOD.filter(f => foodType === "全部" || f.type === foodType);
    const k = foodSort.k;
    rows.sort((a,b) => {
      if (k === "tabelog" && foodType === "全部" && a.type !== b.type) return String(a.type).localeCompare(String(b.type), "zh-Hant");
      const x = a[k], y = b[k];
      if (typeof x === "number" || typeof y === "number") return ((Number(x)||0) - (Number(y)||0)) * foodSort.dir;
      return String(x||"").localeCompare(String(y||""), "zh-Hant") * foodSort.dir;
    });
    const th = (key, label) => `<th class="sortable" data-k="${key}">${label}${foodSort.k===key?(foodSort.dir<0?" ↓":" ↑"):""}</th>`;
    $("#foodTable").innerHTML = `<tr>${th("name","店名")}${th("type","種類")}${th("tabelog","Tabelog")}${th("google","Google")}${th("area","地區")}<th>公休</th><th>預約</th>${th("day","排在")}<th></th></tr>` +
      rows.map(f => `<tr>
        <td>${f.url ? `<a href="${esc(f.url)}" target="_blank" rel="noopener">${esc(f.name)}</a>` : `<b>${esc(f.name)}</b>`}</td>
        <td><span class="tag t-food">${esc(f.type)}</span></td>
        <td class="num"><span class="score ${Number(f.tabelog)>=3.8?"hi":""}">${f.tabelog!==""&&f.tabelog!=null?Number(f.tabelog).toFixed(2):"—"}</span><br><span class="muted small">${f.tabelogReviews?Number(f.tabelogReviews).toLocaleString()+" 則":""}</span></td>
        <td class="num">${f.google!==""&&f.google!=null?Number(f.google).toFixed(1):"—"}<br><span class="muted small">${f.googleReviews?Number(f.googleReviews).toLocaleString()+" 則":""}</span></td>
        <td>${esc(f.area)}</td><td>${esc(f.closed)}</td><td>${esc(f.reserve)}</td>
        <td>${f.day?`<span class="tag ${/^Day/.test(f.day)?"t-accent":"t-move"}">${esc(f.day)}</span>`:""}</td>
        <td><button class="btn danger sm" data-del="${esc(f.id)}">刪除</button></td></tr>`).join("");
  }
  $("#foodTypes").addEventListener("click", e => { const b = e.target.closest("[data-t]"); if (b){ foodType = b.dataset.t; renderFood(); } });
  $("#foodTable").addEventListener("click", async e => {
    const h = e.target.closest("th[data-k]");
    if (h){ const k = h.dataset.k; foodSort = { k, dir: foodSort.k===k ? -foodSort.dir : (["tabelog","google"].includes(k)?-1:1) }; renderFood(); return; }
    const d = e.target.closest("[data-del]"); if (!d) return;
    const f = FOOD.find(x => x.id === d.dataset.del); if (!f || !confirm(`刪除「${f.name}」？`)) return;
    FOOD = FOOD.filter(x => x !== f); renderFood();
    if (Sheet.on()) { try{ await Sheet.post({ action:"delete", sheet:"restaurants", id:f.id }); }catch(err){ setSync($("#foodSync"),"err","刪除同步失敗"); } }
    else store.set("food", FOOD);
  });
  $("#foodForm").addEventListener("submit", async e => {
    e.preventDefault();
    const fd = Object.fromEntries(new FormData(e.target).entries());
    const row = normFood({ id: uid(), ...fd });
    FOOD.push(row); renderFood(); e.target.reset();
    if (Sheet.on()) { try{ await Sheet.post({ action:"add", sheet:"restaurants", row }); setSync($("#foodSync"),"ok","已同步"); }catch(err){ setSync($("#foodSync"),"err","新增同步失敗"); } }
    else store.set("food", FOOD);
  });

  /* ---------- todo ---------- */
  function renderTodo(){
    const done = store.get("todo", {});
    $("#todoList").innerHTML = T.todos.map(t => `<li class="${done[t.id]?"done":""}"><input type="checkbox" data-id="${t.id}" ${done[t.id]?"checked":""}><span class="txt">${esc(t.text)}</span><span class="due tag t-accent">${esc(t.due)}</span></li>`).join("");
  }
  $("#todoList").addEventListener("change", e => {
    const id = e.target.dataset.id; if (!id) return;
    const done = store.get("todo", {}); done[id] = e.target.checked; store.set("todo", done); renderTodo();
  });

  /* ---------- tax & N'EX (content from tax.js) ---------- */
  function renderTax(){
    const X = window.TAX;
    if (!X){ $("#taxBody").innerHTML = `<div class="panel muted">資料整理中。</div>`; $("#nexBody").textContent = "資料整理中。"; return; }
    $("#taxBody").innerHTML = X.html;
    $("#nexBody").innerHTML = X.nex;
  }

  /* ---------- expenses ---------- */
  let EXP = [];
  const fx = () => Number($("#fx").value) || 0;
  async function loadExp(){
    if (Sheet.on()){
      setSync($("#expSync"), "busy", "同步中…");
      try { EXP = (await Sheet.list("expenses")).map(r => ({...r, amount:Number(r.amount)||0, day:Number(r.day)||0})); setSync($("#expSync"), "ok", "已連線 Google Sheet"); }
      catch(e){ console.error("[tk26] expenses", e); EXP = store.get("exp", []); setSync($("#expSync"), "err", "連線失敗：" + errText(e)); }
    } else { EXP = store.get("exp", []); setSync($("#expSync"), "", "本機模式"); }
    renderExp();
  }
  function renderExp(){
    const total = EXP.reduce((s,e) => s+e.amount, 0);
    const budget = T.budget.reduce((s,b) => s+b.amount, 0);
    const twd = v => fx() ? ` ≈ NT$${Math.round(v*fx()).toLocaleString()}` : "";
    $("#expStats").innerHTML = [
      ["已花費", yen(total), twd(total)],
      ["行程預算（不含住宿）", yen(budget), twd(budget)],
      ["剩餘", yen(budget-total), ""],
      ["住宿（已付）", yen(T.lodging), twd(T.lodging)]
    ].map(([k,v,s]) => `<div class="stat"><div class="k">${k}</div><div class="v">${v}</div><div class="small muted">${s}</div></div>`).join("");
    $("#expDays").innerHTML = T.budget.map(b => {
      const d = T.days.find(x => x.id === b.day);
      const spent = EXP.filter(e => e.day === b.day).reduce((s,e) => s+e.amount, 0);
      const pct = Math.min(100, b.amount ? spent/b.amount*100 : 0);
      return `<div style="margin-bottom:10px"><div style="display:flex;justify-content:space-between;font-size:13px"><span><b>D${b.day}</b> ${d.date}</span><span class="mono">${yen(spent)} / ${yen(b.amount)}</span></div>
        <div class="bar"><i class="${spent>b.amount?"over":""}" style="width:${pct}%"></i></div></div>`;
    }).join("");
    const cats = {};
    EXP.forEach(e => cats[e.cat] = (cats[e.cat]||0) + e.amount);
    const max = Math.max(1, ...Object.values(cats));
    $("#expCats").innerHTML = Object.keys(cats).length ? Object.entries(cats).sort((a,b)=>b[1]-a[1]).map(([c,v]) =>
      `<div style="margin-bottom:10px"><div style="display:flex;justify-content:space-between;font-size:13px"><span>${esc(c)}</span><span class="mono">${yen(v)}${twd(v)}</span></div><div class="bar"><i style="width:${v/max*100}%"></i></div></div>`).join("")
      : `<p class="muted small">還沒有記帳資料。</p>`;
    const rows = EXP.slice().sort((a,b) => a.day-b.day || String(a.created||"").localeCompare(String(b.created||"")));
    $("#expTable").innerHTML = `<tr><th>日期</th><th>分類</th><th>品項</th><th style="text-align:right">金額</th><th>付款</th><th>備註</th><th></th></tr>` +
      (rows.length ? rows.map(e => { const d = T.days.find(x => x.id === e.day); return `<tr><td class="mono">D${e.day} ${d?d.date:""}</td><td><span class="tag t-move">${esc(e.cat)}</span></td><td>${esc(e.item)}</td><td class="num">${yen(e.amount)}</td><td>${esc(e.pay)}</td><td class="muted">${esc(e.note)}</td><td><button class="btn danger sm" data-del="${esc(e.id)}">刪除</button></td></tr>`; }).join("")
      : `<tr><td colspan="7" class="muted">還沒有資料。</td></tr>`);
  }
  $("#expDay").innerHTML = T.days.map(d => `<option value="${d.id}">D${d.id} ${d.date}（${d.dow}）</option>`).join("");
  $("#fx").value = store.get("fx", 0.21);
  $("#fx").addEventListener("input", () => { store.set("fx", fx()); renderExp(); });
  $("#expForm").addEventListener("submit", async e => {
    e.preventDefault();
    const fd = Object.fromEntries(new FormData(e.target).entries());
    const row = { id: uid(), day:Number(fd.day), cat:fd.cat, item:fd.item, amount:Number(fd.amount)||0, pay:fd.pay, note:fd.note, created:new Date().toISOString() };
    EXP.push(row); renderExp(); const el = e.target.elements; el.item.value = ""; el.amount.value = ""; el.note.value = "";
    if (Sheet.on()) { try{ await Sheet.post({ action:"add", sheet:"expenses", row }); setSync($("#expSync"),"ok","已同步"); }catch(err){ setSync($("#expSync"),"err","新增同步失敗"); } }
    else store.set("exp", EXP);
  });
  $("#expTable").addEventListener("click", async e => {
    const d = e.target.closest("[data-del]"); if (!d) return;
    const x = EXP.find(r => r.id === d.dataset.del); if (!x || !confirm(`刪除「${x.item}」？`)) return;
    EXP = EXP.filter(r => r !== x); renderExp();
    if (Sheet.on()) { try{ await Sheet.post({ action:"delete", sheet:"expenses", id:x.id }); }catch(err){ setSync($("#expSync"),"err","刪除同步失敗"); } }
    else store.set("exp", EXP);
  });

  /* ---------- sheet settings ---------- */
  (function(){
    const c = Sheet.cfg(); const f = $("#sheetForm");
    const el = f.elements;
    if (c){ el.url.value = c.url || ""; el.token.value = c.token || ""; }
    f.addEventListener("submit", e => { e.preventDefault(); store.set("sheet", { url:el.url.value.trim(), token:el.token.value }); loadFood(); loadExp(); });
    $("#sheetClear").addEventListener("click", () => { store.del("sheet"); f.reset(); loadFood(); loadExp(); });
    $("#sheetSeed").addEventListener("click", async () => {
      if (!Sheet.on()) { alert("請先儲存 Web App 網址與通行碼。"); return; }
      if (!confirm("把預設的餐廳清單寫入試算表（只會在 restaurants 分頁是空的時候寫入）？")) return;
      try { const r = await Sheet.post({ action:"seed", sheet:"restaurants", rows: T.restaurants.map(x => ({ id: uid(), ...x })) }); alert(r.written ? `已寫入 ${r.written} 筆。` : "試算表已有資料，沒有寫入。"); loadFood(); }
      catch(err){ alert("寫入失敗：" + err.message); }
    });
  })();

  /* ---------- boot ---------- */
  renderOverview(); renderBoard(); renderEvents(); renderTodo(); renderTax();
  loadFood(); loadExp();
  show(location.hash.slice(1));
})();
