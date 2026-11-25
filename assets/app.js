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
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#f7f4ee");
    if (window._map) refreshMapStyle();
  }
  $$("#themeSwitch button").forEach(b => b.addEventListener("click", () => setTheme(b.dataset.theme)));
  $("#mTheme").addEventListener("click", () => setTheme(document.documentElement.getAttribute("data-theme") === "maple" ? "indigo" : "maple"));
  setTheme(document.documentElement.getAttribute("data-theme"));
  $("#ver").textContent = "行程 " + T.version;

  /* ---------- router ---------- */
  const SECS = ["overview","board","map","events","food","todo","stay","tax","pack","expense"];
  function show(id){
    if (!SECS.includes(id)) id = "overview";
    $$(".sec").forEach(s => s.classList.toggle("on", s.id === "sec-"+id));
    $$("[data-sec]").forEach(a => a.classList.toggle("on", a.dataset.sec === id));
    const NAMES = { overview:"總覽", board:"行程看板", map:"地圖", events:"點燈・聖誕・紅葉", food:"餐廳", todo:"預約待辦", stay:"住宿・航班", tax:"退稅新制", pack:"攜帶物品", expense:"消費表" };
    $("#mSec").textContent = NAMES[id];
    sheet(false);
    if (id === "map") initMap();
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", () => show(location.hash.slice(1)));
  function sheet(open){ $("#sheet").classList.toggle("on", open); $("#sheetBg").classList.toggle("on", open); $("#sheet").setAttribute("aria-hidden", !open); }
  $("#moreBtn").addEventListener("click", () => sheet(!$("#sheet").classList.contains("on")));
  $("#sheetBg").addEventListener("click", () => sheet(false));
  const isPhone = () => matchMedia("(max-width:760px)").matches;

  /* ---------- itinerary state (kanban order) ---------- */
  const ORIG = T.items.map(i => ({...i}));
  const SLOTS = [["am","☀️ 上午","～11:59"],["pm","🌤️ 下午","12:00–16:59"],["night","🌙 晚上","17:00～"]];
  function slotOf(time){ const h = parseInt(String(time).slice(0,2), 10); return h < 12 ? "am" : h < 17 ? "pm" : "night"; }
  function loadItems(){
    const saved = store.get("board36", null); // {id:{day,order}}
    const items = ORIG.map((i, idx) => ({...i, order: idx}));
    items.forEach(i => i.slot = slotOf(i.time));
    if (saved) items.forEach(i => { if (saved[i.id]) { i.day = saved[i.id].day; i.order = saved[i.id].order; if (saved[i.id].slot) i.slot = saved[i.id].slot; i.moved = saved[i.id].day !== ORIG.find(o=>o.id===i.id).day; } });
    return items;
  }
  let ITEMS = loadItems();
  /* 同一天的兩個版本（例如 12/4 的 A' / B）：items 帶 plan，看板上切換 */
  const PLAN = Object.assign({}, store.get("plan", {}));
  const planOf = dayId => { const d = T.days.find(x => x.id === dayId); return d?.plans ? (PLAN[dayId] || d.plans[0].key) : null; };
  const origDay = id => ORIG.find(o => o.id === id)?.day;
  const visible = i => !i.plan || planOf(origDay(i.id)) === i.plan;
  const byDay = d => ITEMS.filter(i => i.day === d && visible(i)).sort((a,b) => a.order - b.order);

  /* ---------- 紅葉即時（tenki.jp → Apps Script → foliage 分頁，要通行碼） ---------- */
  let FOL = {}, folFetched = "";
  const folTag = st => /見頃/.test(st) ? "t-ok" : /色あせ|落葉/.test(st) ? "t-stop" : "t-warn";
  async function loadFoliage(){
    FOL = {}; folFetched = "";
    if (Sheet.on()){
      try { (await Sheet.list("foliage")).forEach(r => { FOL[String(r.id)] = r; if (r.fetched > folFetched) folFetched = String(r.fetched); }); }
      catch(e){ console.warn("[tk26] foliage", e); }
    }
    renderOverview(); renderBoard();
  }

  /* ---------- 天氣（氣象廳 bosai JSON，瀏覽器直接讀，6 小時快取） ---------- */
  const WX = {};
  async function loadWeather(){
    const codes = [...new Set([T.weather.default, ...Object.values(T.weather.byDay)])];
    await Promise.all(codes.map(async c => {
      const k = "wx-" + c, cached = store.get(k, null);
      if (cached && Date.now() - cached.t < 6*3600e3){ WX[c] = cached.d; return; }
      try {
        const r = await fetch(`https://www.jma.go.jp/bosai/forecast/data/forecast/${c}.json`);
        const d = await r.json(); WX[c] = d; store.set(k, { t: Date.now(), d });
      } catch(e){ console.warn("[tk26] weather", e); if (cached) WX[c] = cached.d; }
    }));
    renderBoard();
  }
  /* 氣象廳天氣代碼 → 中文（常見的；其餘用日文翻譯或第一碼） */
  const WXZH = {100:"晴",101:"晴時多雲",102:"晴短暫雨",103:"晴時而有雨",104:"晴短暫雪",105:"晴時而有雪",106:"晴短暫雨或雪",107:"晴時而雨或雪",108:"晴短暫雷雨",
    110:"晴後時多雲",111:"晴後轉多雲",112:"晴後短暫雨",113:"晴後時而有雨",114:"晴後轉雨",115:"晴後短暫雪",116:"晴後時而有雪",117:"晴後轉雪",118:"晴後轉雨或雪",119:"晴後轉雷雨",
    120:"晴，早晚短暫雨",121:"晴，早上短暫雨",122:"晴，傍晚短暫雨",123:"晴，山區有雷雨",124:"晴，山區有雪",125:"晴，午後有雷雨",126:"晴，中午起轉雨",127:"晴，傍晚起轉雨",128:"晴，夜間轉雨",
    130:"清晨有霧，之後晴",131:"晴，清晨有霧",132:"晴時多雲，早晚多雲",140:"晴時而雨，伴隨雷",160:"晴短暫雪或雨",170:"晴時而雪或雨",181:"晴後轉雪或雨",
    200:"多雲",201:"多雲時晴",202:"多雲短暫雨",203:"多雲時而有雨",204:"多雲短暫雪",205:"多雲時而有雪",206:"多雲短暫雨或雪",207:"多雲時而雨或雪",208:"多雲短暫雷雨",209:"有霧",
    210:"多雲後時晴",211:"多雲後轉晴",212:"多雲後短暫雨",213:"多雲後時而有雨",214:"多雲後轉雨",215:"多雲後短暫雪",216:"多雲後時而有雪",217:"多雲後轉雪",218:"多雲後轉雨或雪",219:"多雲後轉雷雨",
    220:"多雲，早晚短暫雨",221:"多雲，早上短暫雨",222:"多雲，傍晚短暫雨",223:"多雲，白天時晴",224:"多雲，中午起轉雨",225:"多雲，傍晚起轉雨",226:"多雲，夜間轉雨",
    228:"多雲，中午起轉雪",229:"多雲，傍晚起轉雪",230:"多雲，夜間轉雪",231:"多雲，海上有霧",240:"多雲時而雨，伴隨雷",250:"多雲時而雪，伴隨雷",260:"多雲短暫雪或雨",270:"多雲時而雪或雨",281:"多雲後轉雪或雨",
    300:"雨",301:"雨時晴",302:"雨時停",303:"雨時而有雪",304:"雨或雪",306:"大雨",308:"暴風雨",309:"雨短暫雪",311:"雨後轉晴",313:"雨後轉多雲",314:"雨後時而有雪",315:"雨後轉雪",
    316:"雨或雪後轉晴",317:"雨或雪後轉多雲",320:"雨，早上後轉晴",321:"雨，早上後轉多雲",322:"雨，早晚短暫雪",323:"雨，中午起轉晴",324:"雨，傍晚起轉晴",325:"雨，夜間轉晴",
    326:"雨，傍晚起轉雪",327:"雨，夜間轉雪",328:"雨，時而大雨",329:"雨短暫夾雪",340:"雪或雨",350:"雨，伴隨雷",361:"雪或雨後轉晴",371:"雪或雨後轉多雲",400:"雪"};
  const JA2ZH = [["晴れ","晴"],["くもり","多雲"],["時々","時而"],["一時","短暫"],["のち","後轉"],["所により","局部"],["を伴う","伴隨"],["昼過ぎ","下午"],["昼前","上午"],["夕方","傍晚"],["未明","凌晨"],["朝","早上"],["夜","夜間"],["から","起"],["激しく","大"],["降る",""],["で","，"]];
  const wxZh = (code, ja) => WXZH[+code] || (ja ? JA2ZH.reduce((t, [x, y]) => t.split(x).join(y), ja) : ({1:"晴",2:"多雲",3:"雨",4:"雪"})[String(code).charAt(0)] || "—");
  function wxKind(code, zh){
    if (/雪/.test(zh)) return "snow";
    const c = String(code).charAt(0);
    if (c === "3") return "rain";
    if (/雨/.test(zh)) return "shower";
    if (c === "1") return /多雲/.test(zh) ? "partly" : "sun";
    return /晴/.test(zh) ? "partly" : "cloud";
  }
  const WXICO = { sun:"☀️", partly:"⛅", cloud:"☁️", shower:"🌦️", rain:"🌧️", snow:"❄️" };
  function wxFor(day){
    const code = T.weather.byDay[day.id] || T.weather.default, d = WX[code];
    if (!d) return null;
    const iso = "2026-" + day.date.replace("/", "-");
    const out = { code, report: "" };
    try {
      const s0 = d[0].timeSeries[0], i = s0.timeDefines.findIndex(t => t.startsWith(iso));
      if (i >= 0){ out.text = s0.areas[0].weathers[i].replace(/　+/g, " "); out.wcode = s0.areas[0].weatherCodes[i]; out.report = d[0].reportDatetime; }
      const s1 = d[0].timeSeries[1];
      const pops = s1.timeDefines.map((t, n) => [t, s1.areas[0].pops[n]]).filter(([t]) => t.startsWith(iso));
      const slot = { "06":"am", "12":"pm", "18":"night" };
      pops.forEach(([t, p]) => { const k = slot[t.slice(11,13)]; if (k && p !== "") (out.slots ||= {})[k] = +p; });
      const s2 = d[0].timeSeries[2];
      if (s2){ const tt = s2.timeDefines.map((t, n) => [t, s2.areas[0].temps[n]]).filter(([t]) => t.startsWith(iso)).map(x => +x[1]);
        if (tt.length === 2 && tt[0] !== tt[1]){ out.min = Math.min(...tt); out.max = Math.max(...tt); } }
      const w0 = d[1].timeSeries[0], j = w0.timeDefines.findIndex(t => t.startsWith(iso));
      if (j >= 0){
        const a = w0.areas[0], tm = d[1].timeSeries[1].areas[0];
        out.wcode = out.wcode || a.weatherCodes[j];
        if (a.pops[j] !== "" && a.pops[j] != null) out.pop = a.pops[j];
        if (a.reliabilities && a.reliabilities[j]) out.rel = a.reliabilities[j];
        if (out.min == null && tm.tempsMin[j] !== "") out.min = tm.tempsMin[j];
        if (out.max == null && tm.tempsMax[j] !== "") out.max = tm.tempsMax[j];
        if (!out.report) out.report = d[1].reportDatetime;
      }
    } catch(e){ console.warn("[tk26] wx parse", e); }
    out.none = !out.wcode;
    return out;
  }
  function wxHTML(day){
    const w = wxFor(day);
    if (!w) return `<div class="wxcard none">🌤️ 天氣載入中…</div>`;
    const url = `https://www.jma.go.jp/bosai/forecast/#area_type=offices&area_code=${w.code}`;
    if (w.none) return `<div class="wxcard none">🌤️ 這天還沒有天氣預報（氣象廳約 7 天前開始發布）· <a href="${url}" target="_blank" rel="noopener">氣象廳 ↗</a></div>`;
    const zh = wxZh(w.wcode, w.text), kind = wxKind(w.wcode, zh);
    const pops = w.slots ? Object.values(w.slots) : w.pop != null ? [+w.pop] : [];
    const maxPop = pops.length ? Math.max(...pops) : null;
    const umb = maxPop == null ? null : maxPop >= 50 ? ["t-rain","☔ 要帶傘"] : maxPop >= 30 ? ["t-maybe","🌂 帶折傘備用"] : ["t-dry","🌂 不用帶傘"];
    const lo = w.min != null && w.min !== "" ? +w.min : null, hi = w.max != null && w.max !== "" ? +w.max : null;
    const coat = lo == null ? null : lo <= 5 ? "🧥 很冷：穿厚外套、羽絨" : lo <= 10 ? "🧥 早晚冷：外套＋保暖層" : "👕 薄外套就好";
    const rain = w.slots
      ? [["am","上午"],["pm","下午"],["night","晚上"]].map(([k, l]) => `<span class="slot"><small>${l}</small><b>${w.slots[k] != null ? w.slots[k] + "%" : "—"}</b><i style="--p:${w.slots[k] ?? 0}%"></i></span>`).join("")
      : `<span class="slot"><small>全天</small><b>${maxPop != null ? maxPop + "%" : "—"}</b><i style="--p:${maxPop ?? 0}%"></i></span>`;
    const relZh = { A:"高", B:"中", C:"低，可能會變" }[w.rel];
    const when = w.report ? w.report.slice(5,16).replace("T"," ").replace("-","/") : "";
    const fx = kind === "rain" || kind === "shower" ? `<i class="drop"></i><i class="drop"></i><i class="drop"></i>` : kind === "snow" ? `<i class="flake">❄</i><i class="flake">❄</i>` : "";
    return `<div class="wxcard k-${kind}">
      <div class="wx-ico" aria-hidden="true"><span class="ico">${WXICO[kind]}</span>${fx}</div>
      <div class="wx-main"><div class="wx-sum">${esc(zh)}</div>
        <div class="wx-temp">${hi != null ? `<span><small>最高</small><b>${hi}°</b></span>` : ""}${lo != null ? `<span><small>最低</small><b>${lo}°</b></span>` : ""}</div></div>
      <div class="wx-rain"><span class="lbl">降雨機率</span>${rain}</div>
      <div class="wx-tips">${umb ? `<span class="tip ${umb[0]}">${umb[1]}</span>` : ""}${coat ? `<span class="tip">${coat}</span>` : ""}
      <span class="wx-src">${relZh ? `預報可信度：${relZh} · ` : ""}<a href="${url}" target="_blank" rel="noopener">氣象廳 ${when} 發表 ↗</a></span></div>
    </div>`;
  }


  /* ---------- overview ---------- */
  function renderOverview(){
    const start = new Date("2026-11-28T20:55:00+08:00");
    const days = Math.ceil((start - new Date())/86400000);
    const lights = ORIG.filter(i => i.cat === "light" && visible(i)).length;
    $("#ovStats").innerHTML = [
      ["出發倒數", days > 0 ? days + " 天" : "旅途中", true],
      ["行程點", ORIG.filter(visible).length + " 個", false],
      ["點燈・夜景", lights + " 場", false],
      ["日落", "16:28", false]
    ].map(([k,v,a]) => `<div class="stat"><div class="k">${k}</div><div class="v ${a?"accent":""}">${v}</div></div>`).join("");
    const must = [
      ["11/29","神宮外苑點燈最後一晚 16:30–19:30"],
      ["11/29","都廳投影：19:00 哥吉拉、19:30 寶可夢 TCG"],
      ["11/26 12:00","RAMEN MATSUI 開放預約（11/29 午餐）"],
      ["12/01","Cris 13:25 抵達成田，17:30 六本木會合 ➔ 光之森林 19:00"],
      ["12/02","PokéPark KANTO 11:00 ➔ 18:00 六義園會合"],
      ["12/03","橫濱 5 個寶可夢井蓋＋郵筒＋紅磚寶可夢燈飾"],
      ["12/04","魚政 12:00（已訂）➔ 下午 A' 芝公園・東京鐵塔・聖誕市集／B 晴空塔・竹燈祭・みつヰ"],
      ["12/05","18:00 YOASOBI 東京巨蛋"]
    ];
    $("#ovMust").innerHTML = must.map(([d,t]) => `<li><span class="tag t-accent">${d}</span><span class="txt">${esc(t)}</span></li>`).join("");
    const V = { ok:["t-ok","可以"], warn:["t-warn","偏晚／未確認"], stop:["t-stop","已過"] };
    const live = f => {
      if (!f.tenki) return f.more ? `<a href="${esc(f.more)}" target="_blank" rel="noopener">官網 ↗</a>` : `<span class="muted">無自動資料</span>`;
      const url = `https://tenki.jp/kouyou/${f.tenki}.html`, r = FOL[f.tenki];
      if (r && r.status) return `<a href="${esc(url)}" target="_blank" rel="noopener"><span class="tag ${folTag(r.status)}">🍁 ${esc(r.status)}</span></a><br><small class="muted">${esc(r.asOf)}現在・預測 ${esc(r.forecast)}</small>`;
      return `<a href="${esc(url)}" target="_blank" rel="noopener">tenki.jp ↗</a><br><small class="muted">${Sheet.on() ? "尚無資料（執行 installTrigger）" : "輸入通行碼後顯示即時"}</small>`;
    };
    $("#ovFoliage").innerHTML = `<tr><th>地點</th><th>你去</th><th>手動查詢</th><th>tenki.jp 即時</th><th></th></tr>` +
      T.foliage.map(f => `<tr><td class="name">${esc(f.spot)}</td><td class="mono" data-l="你去">${f.visit}</td><td data-l="手動查詢">${esc(f.status)}</td><td data-l="tenki.jp">${live(f)}</td><td data-l="判斷"><span class="tag ${V[f.verdict][0]}">${V[f.verdict][1]}</span></td></tr>`).join("");
    $("#ovFolNote").innerHTML = `手動查詢：11/21–24。即時：tenki.jp，Apps Script 每 6 小時更新${folFetched ? `（最後抓取 ${esc(folFetched)}）` : ""}。其他：` +
      T.foliageLinks.map(l => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.name)}</a>`).join("・");
  }

  /* ---------- itinerary board: day tabs, each day is a 3-column kanban (上午／下午／晚上) ---------- */
  function tripDayToday(){
    const jst = new Date(Date.now() + 9*3600e3), m = jst.getUTCMonth()+1, d = jst.getUTCDate();
    const key = `${String(m).padStart(2,"0")}/${String(d).padStart(2,"0")}`;
    return T.days.find(x => x.date === key)?.id || 0;
  }
  let boardDay = tripDayToday() || store.get("boardDay", 1);
  function cardHTML(i){
    const r = rel(i);
    const title = i.link ? `<a href="${esc(i.link)}" target="_blank" rel="noopener">${esc(i.title)}</a>` : esc(i.title);
    const pd = i.plan && T.days.find(x => x.id === origDay(i.id));
    const planTag = pd ? `<span class="tag t-plan">${esc(pd.plans.find(p => p.key === i.plan).label)} 限定</span>` : "";
    const opts = T.days.map(d => `<option value="${d.id}" ${d.id===i.day?"selected":""}>D${d.id} ${d.date}（${d.dow}）</option>`).join("");
    return `<div class="card cat-${i.cat}${i.moved?" moved":""}" data-id="${i.id}" style="--dc:var(--d${i.day})">
      <div class="top"><span class="time">${esc(i.time)}</span><span class="tag t-${i.cat}">${CAT[i.cat]}</span>${i.who?`<span class="tag t-who">${esc(i.who)}</span>`:""}${planTag}</div>
      <h4>${title}</h4>
      ${i.tenki && FOL[i.tenki]?.status ? `<a class="fol tag ${folTag(FOL[i.tenki].status)}" href="https://tenki.jp/kouyou/${esc(i.tenki)}.html" target="_blank" rel="noopener">🍁 ${esc(FOL[i.tenki].status)}（${esc(FOL[i.tenki].asOf)}）</a>` : ""}
      ${i.ticket ? `<a class="tix" href="${esc(i.ticket)}" target="_blank" rel="noopener">🎟 要先買票 · 官網</a>` : ""}
      <div class="dist"><span class="arr">${r.arrow}</span>${esc(r.text)}${i.moved?` <span class="tag t-accent">已移動</span>`:""}</div>
      <div class="more">
        ${i.transit ? `<div class="tr">🚃 ${esc(i.transit)}</div>` : ""}
        ${i.note ? `<div>${esc(i.note)}</div>` : ""}
        <div class="ctrl"><label class="small muted">移到 <select data-move="${i.id}">${opts}</select></label>
        <button class="maplink" data-go="${i.id}">在地圖上看</button>
        <a class="navlink" href="https://www.google.com/maps/dir/?api=1&destination=${i.lat},${i.lng}&travelmode=transit" target="_blank" rel="noopener">🧭 Google 導航</a></div>
      </div></div>`;
  }
  function renderBoard(){
    $("#boardLegend").innerHTML = Object.entries(CAT).map(([k,v]) => `<span><i style="background:var(--c-${k})"></i>${v}</span>`).join("");
    $("#boardTabs").innerHTML = T.days.map(d => `<button role="tab" class="daytab ${d.id===boardDay?"on":""}" data-day="${d.id}" style="--dc:var(--d${d.id})" aria-selected="${d.id===boardDay}">
      <b>D${d.id}${d.id===tripDayToday()?' · 今天':''}</b><span>${d.date}<small>（${d.dow}）</small></span><em>${byDay(d.id).length}</em></button>`).join("");
    const tabs = $("#boardTabs"), on = $(".daytab.on", tabs);
    if (on && tabs.scrollWidth > tabs.clientWidth) tabs.scrollTo({ left: on.offsetLeft - (tabs.clientWidth - on.offsetWidth)/2, behavior:"smooth" });
    const d = T.days.find(x => x.id === boardDay), list = byDay(boardDay);
    $("#board").style.setProperty("--dc", `var(--d${d.id})`);
    const phone = isPhone(), seg = phone ? slotFor(d.id, list) : null;
    $("#board").innerHTML = `<div class="day-title" style="--dc:var(--d${d.id})"><b>D${d.id}</b> ${d.date}（${d.dow}）<span>${esc(d.title)}</span><em class="nav-hint">← → 切換天數</em></div>
      ${wxHTML(d)}
      <div class="day-meta"><span class="sun">🌅 日出 <b>${d.sun[0]}</b></span><span class="sun">🌇 日落 <b>${d.sun[1]}</b></span><span class="who">👤 ${esc(d.who)}</span></div>
      ${d.plans ? `<div class="plan-tabs" role="tablist" aria-label="版本">${d.plans.map(p => `<button role="tab" class="plan-tab ${planOf(d.id)===p.key?"on":""}" data-plan="${p.key}" aria-selected="${planOf(d.id)===p.key}"><b>${esc(p.label)}</b><span>${esc(p.desc)}</span></button>`).join("")}<small class="muted">只顯示所選版本；標「限定」的是兩版不同的地方</small></div>` : ""}
      ${phone ? `<div class="seg" role="tablist" aria-label="時段">${SLOTS.map(([k, label]) => `<button role="tab" class="${seg===k?"on":""}" data-seg="${k}" aria-selected="${seg===k}">${label} <em>${list.filter(i => i.slot === k).length}</em></button>`).join("")}</div>` : ""}
      <div class="board3${phone?" one":""}">${SLOTS.map(([k, label, range]) => {
        const cards = list.filter(i => i.slot === k);
        return `<div class="col${seg===k?" show":""}"><div class="col-head"><div class="d"><span>${label}</span><small>${range}</small><em>${cards.length}</em></div></div>
          <div class="col-body" data-slot="${k}">${cards.map(cardHTML).join("")}</div></div>`;
      }).join("")}</div>`;
    if (window.Sortable && !isPhone()) $$("#board .col-body").forEach(el => new Sortable(el, { group:"slots", animation:150, delay:150, delayOnTouchOnly:true, ghostClass:"sortable-ghost", onEnd: saveBoard }));
  }
  /* 手機：一次只看一個時段。今天就依現在時間，其他天選第一個有行程的時段 */
  const SEG = {};
  function slotFor(dayId, list){
    if (SEG[dayId]) return SEG[dayId];
    if (dayId === tripDayToday()){ const h = new Date(Date.now() + 9*3600e3).getUTCHours(); return h < 12 ? "am" : h < 17 ? "pm" : "night"; }
    return (SLOTS.find(([k]) => list.some(i => i.slot === k)) || SLOTS[0])[0];
  }
  matchMedia("(max-width:760px)").addEventListener("change", () => renderBoard());
  function persist(){
    const saved = {};
    ITEMS.forEach(i => saved[i.id] = { day:i.day, order:i.order, slot:i.slot });
    store.set("board36", saved);
    ITEMS = loadItems(); renderBoard(); if (window._map) drawMarkers();
  }
  function saveBoard(){
    let n = 0;
    $$("#board .col-body").forEach(col => $$(".card", col).forEach(c => { const it = ITEMS.find(x => x.id === c.dataset.id); it.slot = col.dataset.slot; it.order = n++; }));
    persist();
  }
  function setDay(n){ boardDay = Math.min(8, Math.max(1, n)); store.set("boardDay", boardDay); renderBoard(); }
  $("#boardTabs").addEventListener("click", e => { const b = e.target.closest("[data-day]"); if (b) setDay(+b.dataset.day); });
  (function(){ // swipe left/right on the board to change day
    let x0 = null, y0 = null;
    $("#board").addEventListener("touchstart", e => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive:true });
    $("#board").addEventListener("touchend", e => {
      if (x0 == null) return;
      const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0; x0 = null;
      if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) setDay(boardDay + (dx < 0 ? 1 : -1));
    }, { passive:true });
  })();
  document.addEventListener("keydown", e => {
    if (!$("#sec-board").classList.contains("on") || /input|select|textarea/i.test(e.target.tagName)) return;
    if (e.key === "ArrowRight") setDay(boardDay + 1);
    if (e.key === "ArrowLeft") setDay(boardDay - 1);
  });
  $("#board").addEventListener("click", e => {
    const sg = e.target.closest("[data-seg]");
    if (sg){ SEG[boardDay] = sg.dataset.seg; renderBoard(); return; }
    const pl = e.target.closest("[data-plan]");
    if (pl){ PLAN[boardDay] = pl.dataset.plan; store.set("plan", PLAN); renderBoard(); if (window._map) drawMarkers(); return; }
    const go = e.target.closest("[data-go]");
    if (go){ e.stopPropagation(); location.hash = "map"; setTimeout(() => focusItem(go.dataset.go), 300); return; }
    if (e.target.closest("a,select,label,button")) return;
    const c = e.target.closest(".card"); if (c) c.classList.toggle("open");
  });
  $("#board").addEventListener("change", e => {
    const s = e.target.closest("[data-move]"); if (!s) return;
    const it = ITEMS.find(x => x.id === s.dataset.move), to = +s.value;
    it.day = to; it.order = Math.max(-1, ...byDay(to).filter(x => x !== it).map(x => x.order)) + 1;
    persist();
  });
  $("#boardReset").addEventListener("click", () => { store.del("board36"); ITEMS = loadItems(); renderBoard(); if (window._map) drawMarkers(); });

  /* ---------- map ---------- */
  let map, layer, mapDay = 0, markerById = {};
  function initMap(){
    if (map){ setTimeout(() => map.invalidateSize(), 50); return; }
    if (!window.L) { $("#map").textContent = "地圖載入失敗（需要網路）"; return; }
    map = window._map = L.map("map", { zoomControl:true }).setView([T.hotel.lat, T.hotel.lng], 11);
    // 國土地理院「淡色地図」: Japanese labels, no API key, works from file:// and GitHub Pages
    L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png", {
      minZoom:5, maxZoom:18, attribution:'<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noopener">地理院タイル</a>'
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
        }).bindPopup(`<b>D${label} ${esc(i.time)}</b><br>${esc(i.title)}<br><span style="color:#6b6b7b">${esc(r.text)}</span>${i.link?`<br><a href="${esc(i.link)}" target="_blank" rel="noopener">${/tabelog/.test(i.link)?"Tabelog":"官網"}</a>`:""}${i.ticket?` · <a href="${esc(i.ticket)}" target="_blank" rel="noopener">🎟 買票</a>`:""}<br><a href="https://www.google.com/maps/dir/?api=1&destination=${i.lat},${i.lng}&travelmode=transit" target="_blank" rel="noopener">🧭 Google 導航</a>`).addTo(layer);
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
      T.events.map(e => `<tr><td class="name"><a href="${esc(e.src)}" target="_blank" rel="noopener">${esc(e.name)}</a></td><td class="mono" data-l="期間">${esc(e.when)}</td><td data-l="時間">${esc(e.hours)}</td><td data-l="費用">${esc(e.fee)}</td><td data-l="排在"><span class="tag t-accent">${esc(e.day)}</span></td></tr>`).join("");
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
        <td class="name">${f.url ? `<a href="${esc(f.url)}" target="_blank" rel="noopener">${esc(f.name)}</a>` : `<b>${esc(f.name)}</b>`}</td>
        <td class="extra" data-l="種類"><span class="tag t-food">${esc(f.type)}</span></td>
        <td class="num" data-l="Tabelog"><span class="score ${Number(f.tabelog)>=3.8?"hi":""}">${f.tabelog!==""&&f.tabelog!=null?Number(f.tabelog).toFixed(2):"—"}</span><br><span class="muted small">${f.tabelogReviews?Number(f.tabelogReviews).toLocaleString()+" 則":""}</span></td>
        <td class="num extra" data-l="Google">${f.google!==""&&f.google!=null?Number(f.google).toFixed(1):"—"}<br><span class="muted small">${f.googleReviews?Number(f.googleReviews).toLocaleString()+" 則":""}</span></td>
        <td data-l="地區">${esc(f.area)}</td><td class="extra" data-l="公休">${esc(f.closed)}</td><td class="extra" data-l="預約">${esc(f.reserve)}</td>
        <td data-l="排在">${f.day?`<span class="tag ${/^Day/.test(f.day)?"t-accent":"t-move"}">${esc(f.day)}</span>`:""}</td>
        <td class="act"><button class="btn danger sm" data-del="${esc(f.id)}">刪除</button></td></tr>`).join("");
  }
  $("#foodTypes").addEventListener("click", e => { const b = e.target.closest("[data-t]"); if (b){ foodType = b.dataset.t; renderFood(); } });
  $("#foodTable").addEventListener("click", async e => {
    const h = e.target.closest("th[data-k]");
    if (h){ const k = h.dataset.k; foodSort = { k, dir: foodSort.k===k ? -foodSort.dir : (["tabelog","google"].includes(k)?-1:1) }; renderFood(); return; }
    const d = e.target.closest("[data-del]");
    if (!d){ const tr = e.target.closest("tr"); if (tr && isPhone() && !e.target.closest("a")) tr.classList.toggle("open"); return; }
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
    const twd = v => fx() ? ` ≈ NT$${Math.round(v*fx()).toLocaleString()}` : "";
    const today = tripDayToday(), todaySum = EXP.filter(e => e.day === today).reduce((s,e) => s+e.amount, 0);
    const cash = EXP.filter(e => e.pay === "現金").reduce((s,e) => s+e.amount, 0);
    $("#expStats").innerHTML = [
      ["已花費", yen(total), twd(total)],
      [today ? `今天（D${today}）` : "今天", yen(todaySum), twd(todaySum)],
      ["現金支出", yen(cash), twd(cash)],
      ["筆數", EXP.length + " 筆", ""]
    ].map(([k,v,s]) => `<div class="stat"><div class="k">${k}</div><div class="v">${v}</div><div class="small muted">${s}</div></div>`).join("");
    const perDay = T.days.map(d => ({ d, v: EXP.filter(e => e.day === d.id).reduce((s,e) => s+e.amount, 0) }));
    const dmax = Math.max(1, ...perDay.map(x => x.v));
    $("#expDays").innerHTML = perDay.map(({d, v}) => `<div style="margin-bottom:10px"><div style="display:flex;justify-content:space-between;font-size:13px"><span><b>D${d.id}</b> ${d.date}</span><span class="mono">${yen(v)}${twd(v)}</span></div>
        <div class="bar"><i style="width:${v/dmax*100}%;background:var(--d${d.id})"></i></div></div>`).join("");
    const cats = {};
    EXP.forEach(e => cats[e.cat] = (cats[e.cat]||0) + e.amount);
    const max = Math.max(1, ...Object.values(cats));
    $("#expCats").innerHTML = Object.keys(cats).length ? Object.entries(cats).sort((a,b)=>b[1]-a[1]).map(([c,v]) =>
      `<div style="margin-bottom:10px"><div style="display:flex;justify-content:space-between;font-size:13px"><span>${esc(c)}</span><span class="mono">${yen(v)}${twd(v)}</span></div><div class="bar"><i style="width:${v/max*100}%"></i></div></div>`).join("")
      : `<p class="muted small">還沒有記帳資料。</p>`;
    const rows = EXP.slice().sort((a,b) => a.day-b.day || String(a.created||"").localeCompare(String(b.created||"")));
    $("#expTable").innerHTML = `<tr><th>日期</th><th>分類</th><th>品項</th><th style="text-align:right">金額</th><th>付款</th><th>備註</th><th></th></tr>` +
      (rows.length ? rows.map(e => { const d = T.days.find(x => x.id === e.day); return `<tr><td class="mono" data-l="日期">D${e.day} ${d?d.date:""}</td><td data-l="分類"><span class="tag t-move">${esc(e.cat)}</span></td><td class="name">${esc(e.item)}</td><td class="num amt" data-l="金額">${yen(e.amount)}</td><td data-l="付款">${esc(e.pay)}</td><td class="muted" data-l="備註">${esc(e.note)}</td><td class="act"><button class="btn danger sm" data-del="${esc(e.id)}">刪除</button></td></tr>`; }).join("")
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
    f.addEventListener("submit", e => { e.preventDefault(); store.set("sheet", { url:el.url.value.trim(), token:el.token.value }); loadFood(); loadExp(); loadPack(); loadFoliage(); });
    $("#sheetClear").addEventListener("click", () => { store.del("sheet"); f.reset(); loadFood(); loadExp(); loadPack(); loadFoliage(); });
    $("#sheetSeed").addEventListener("click", async () => {
      if (!Sheet.on()) { alert("請先儲存 Web App 網址與通行碼。"); return; }
      if (!confirm("把預設的餐廳清單寫入試算表（只會在 restaurants 分頁是空的時候寫入）？")) return;
      try { const r = await Sheet.post({ action:"seed", sheet:"restaurants", rows: T.restaurants.map(x => ({ id: uid(), ...x })) }); alert(r.written ? `已寫入 ${r.written} 筆。` : "試算表已有資料，沒有寫入。"); loadFood(); }
      catch(err){ alert("寫入失敗：" + err.message); }
    });
    $("#sheetMerge").addEventListener("click", async () => {
      if (!Sheet.on()) { alert("請先儲存 Web App 網址與通行碼。"); return; }
      if (!confirm("把這一版行程的餐廳合併進試算表？\n・試算表沒有的店會新增\n・已經有的店只更新「排在」欄位")) return;
      try { const r = await Sheet.post({ action:"merge", sheet:"restaurants", key:"name", fields:["day","closed","reserve"], rows: T.restaurants.map(x => ({ id: uid(), ...x })) }); alert(`新增 ${r.added} 家、更新 ${r.updated} 家。`); loadFood(); }
      catch(err){ alert("合併失敗：" + errText(err)); }
    });
  })();

  /* ---------- packing list (Charles / Cris) ---------- */
  let PACK = [];
  function defaultPack(){
    const P = T.packing, rows = [];
    P.people.forEach(person => {
      P.common.concat(P.extra[person] || []).forEach((item, n) => rows.push({ id: uid(), person, item, checked:false, note: P.notes[item] || "", order: n }));
    });
    return rows;
  }
  const truthy = v => v === true || v === "TRUE" || v === "true" || v === 1 || v === "1";
  async function loadPack(){
    if (Sheet.on()){
      setSync($("#packSync"), "busy", "同步中…");
      try {
        let rows = await Sheet.list("packing");
        if (!rows.length){ await Sheet.post({ action:"seed", sheet:"packing", rows: defaultPack() }); rows = await Sheet.list("packing"); }
        PACK = rows.map(r => ({ ...r, checked: truthy(r.checked), order: Number(r.order) || 0 }));
        setSync($("#packSync"), "ok", "已連線 Google Sheet");
      } catch(e){ console.error("[tk26] packing", e); PACK = store.get("pack", null) || defaultPack(); setSync($("#packSync"), "err", "連線失敗：" + errText(e)); }
    } else { PACK = store.get("pack", null) || defaultPack(); setSync($("#packSync"), "", "本機模式"); }
    renderPack();
  }
  function renderPack(){
    $("#packCols").innerHTML = T.packing.people.map(person => {
      const list = PACK.filter(r => r.person === person).sort((a,b) => a.order - b.order || String(a.item).localeCompare(String(b.item)));
      const done = list.filter(r => r.checked).length;
      return `<div class="panel pack-col" data-person="${esc(person)}">
        <div class="pack-head"><h3>${esc(person)}</h3><span class="tag ${done===list.length&&list.length?"t-ok":"t-accent"}">${done} / ${list.length}</span></div>
        <div class="bar"><i style="width:${list.length?done/list.length*100:0}%"></i></div>
        <ul class="todo pack">${list.map(r => `<li class="${r.checked?"done":""}"><label><input type="checkbox" data-pid="${esc(r.id)}" ${r.checked?"checked":""}><span class="txt">${esc(r.item)}${r.note?`<small class="muted"> · ${esc(r.note)}</small>`:""}</span></label><button class="x" data-pdel="${esc(r.id)}" aria-label="刪除">×</button></li>`).join("")}</ul>
        <form class="pack-add" data-person="${esc(person)}"><input name="item" placeholder="新增項目" required><button class="btn sm" type="submit">＋</button></form>
      </div>`;
    }).join("");
  }
  async function packSave(action, payload){
    if (!Sheet.on()){ store.set("pack", PACK); return; }
    try { await Sheet.post({ sheet:"packing", action, ...payload }); setSync($("#packSync"), "ok", "已同步"); }
    catch(e){ setSync($("#packSync"), "err", "同步失敗：" + errText(e)); }
  }
  $("#packCols").addEventListener("change", e => {
    const id = e.target.dataset.pid; if (!id) return;
    const r = PACK.find(x => x.id === id); if (!r) return;
    r.checked = e.target.checked; renderPack();
    packSave("update", { id, row:{ checked: r.checked } });
  });
  $("#packCols").addEventListener("click", e => {
    const b = e.target.closest("[data-pdel]"); if (!b) return;
    const r = PACK.find(x => x.id === b.dataset.pdel); if (!r || !confirm(`刪除「${r.item}」？`)) return;
    PACK = PACK.filter(x => x !== r); renderPack();
    packSave("delete", { id: r.id });
  });
  $("#packCols").addEventListener("submit", e => {
    const f = e.target.closest(".pack-add"); if (!f) return;
    e.preventDefault();
    const item = f.elements.item.value.trim(); if (!item) return;
    const person = f.dataset.person;
    const row = { id: uid(), person, item, checked:false, note:"", order: Math.max(-1, ...PACK.filter(r => r.person === person).map(r => r.order)) + 1 };
    PACK.push(row); renderPack();
    packSave("add", { row });
  });
  $("#packReset").addEventListener("click", () => {
    if (!confirm("把所有勾選清掉？")) return;
    PACK.filter(r => r.checked).forEach(r => { r.checked = false; packSave("update", { id:r.id, row:{ checked:false } }); });
    renderPack(); if (!Sheet.on()) store.set("pack", PACK);
  });

  /* ---------- boot ---------- */
  renderOverview(); renderBoard(); renderEvents(); renderTodo(); renderTax();
  loadFood(); loadExp(); loadPack(); loadFoliage(); loadWeather();
  show(location.hash.slice(1));
})();
