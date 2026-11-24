/** @OnlyCurrentDoc */
/**
 * 2026 Tokyo — Google Sheet backend (Apps Script Web App)
 *
 * 1. 在試算表「擴充功能 → Apps Script」貼上這整份程式碼。
 * 2. 左側「專案設定 → 指令碼屬性」新增：TOKEN = 你自己想的通行碼。
 * 3. 執行一次 setup()（會要求授權），自動建立 restaurants / expenses / packing 的欄位。
 * 4. 「部署 → 管理部署作業 → 編輯 → 版本：新版本 → 部署」（網址不變）。
 *    第一次部署：「部署 → 新增部署作業 → 網頁應用程式」：執行身分＝我，存取權＝所有人。
 * 5. 把 …/exec 網址和通行碼，貼到網站「消費表 → Google Sheet 同步設定」。
 * 6. 紅葉自動更新：執行一次 installTrigger()（第一次會要求「連線到外部服務」的授權），
 *    之後每 6 小時自動抓 tenki.jp 寫入 foliage 分頁。要停用就執行 removeTrigger()。
 */
const HEADERS = {
  restaurants: ["id","name","type","tabelog","tabelogReviews","google","googleReviews","area","closed","reserve","day","url"],
  expenses:    ["id","day","cat","item","amount","pay","note","created"],
  packing:     ["id","person","item","checked","note","order"],
  foliage:     ["id","name","url","status","desc","forecast","asOf","fetched","ok"]
};
// 這些欄位保持數字／布林，其餘一律設成純文字（避免「1/1」被轉成日期）
const NON_TEXT = ["tabelog","tabelogReviews","google","googleReviews","amount","day","checked","order","ok"];

function setup(){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  Object.keys(HEADERS).forEach(name => {
    const sh = ss.getSheetByName(name) || ss.insertSheet(name);
    sh.getRange(1, 1, 1, HEADERS[name].length).setValues([HEADERS[name]]).setFontWeight("bold");
    sh.setFrozenRows(1);
    HEADERS[name].forEach((h, i) => {
      if (!NON_TEXT.includes(h)) sh.getRange(2, i + 1, sh.getMaxRows() - 1, 1).setNumberFormat("@");
    });
  });
}

function json_(o){ return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
function authed_(token){
  const t = PropertiesService.getScriptProperties().getProperty("TOKEN");
  return !!t && token === t;
}
function sheet_(name){
  if (!HEADERS[name]) throw new Error("unknown sheet");
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
  if (!sh) throw new Error("sheet not found: " + name + "（請先執行 setup）");
  return sh;
}
function rows_(name){
  const sh = sheet_(name);
  const range = sh.getDataRange();
  const v = range.getValues(), shown = range.getDisplayValues();
  const head = v.shift() || []; shown.shift();
  // 試算表自動把「1/1」之類的字轉成日期時，回傳畫面上看到的文字
  return v.map((r, ri) => r.map((c, ci) => c instanceof Date ? shown[ri][ci] : c))
          .filter(r => r[0] !== "")
          .map(r => Object.fromEntries(head.map((h, i) => [h, r[i]])));
}
function rowIndex_(sh, id){
  const n = Math.max(sh.getLastRow() - 1, 1);
  const ids = sh.getRange(2, 1, n, 1).getValues().map(r => String(r[0]));
  const i = ids.indexOf(String(id));
  return i >= 0 ? i + 2 : -1;
}

function doGet(e){
  // 不在網址帶通行碼：所有讀寫都走 POST
  return json_({ ok:false, error:"use POST" });
}

function doPost(e){
  const lock = LockService.getScriptLock(); lock.waitLock(10000);
  try {
    const b = JSON.parse(e.postData.contents || "{}");
    if (!authed_(b.token)) return json_({ ok:false, error:"bad token" });
    if (b.action === "list") return json_({ ok:true, rows: rows_(b.sheet) });
    const sh = sheet_(b.sheet), head = HEADERS[b.sheet];

    if (b.action === "add"){
      sh.appendRow(head.map(h => b.row[h] ?? ""));
      return json_({ ok:true });
    }
    if (b.action === "update"){
      // 只改傳進來的欄位，例如 { checked:true }
      const r = rowIndex_(sh, b.id);
      if (r < 0) return json_({ ok:true, updated:false });
      Object.keys(b.row || {}).forEach(k => {
        const c = head.indexOf(k);
        if (c > 0) sh.getRange(r, c + 1).setValue(b.row[k]);
      });
      return json_({ ok:true, updated:true });
    }
    if (b.action === "delete"){
      const r = rowIndex_(sh, b.id);
      if (r > 0) sh.deleteRow(r);
      return json_({ ok:true, deleted: r > 0 });
    }
    if (b.action === "seed"){
      // 只在分頁是空的時候寫入
      if (sh.getLastRow() > 1) return json_({ ok:true, written:0 });
      const data = (b.rows || []).map(r => head.map(h => r[h] ?? ""));
      if (data.length) sh.getRange(2, 1, data.length, head.length).setValues(data);
      return json_({ ok:true, written:data.length });
    }
    if (b.action === "merge"){
      // 依 key（預設 name）合併：已存在的只更新 fields 指定的欄位，不存在的就新增
      const key = b.key || "name", fields = b.fields || [];
      const kc = head.indexOf(key);
      if (kc < 0) throw new Error("bad key");
      const n = Math.max(sh.getLastRow() - 1, 0);
      const keys = n ? sh.getRange(2, kc + 1, n, 1).getDisplayValues().map(r => String(r[0]).trim()) : [];
      let added = 0, updated = 0;
      (b.rows || []).forEach(row => {
        const i = keys.indexOf(String(row[key]).trim());
        if (i >= 0){
          fields.forEach(f => { const c = head.indexOf(f); if (c > 0 && row[f] !== undefined){ sh.getRange(i + 2, c + 1).setValue(row[f]); } });
          updated++;
        } else {
          sh.appendRow(head.map(h => row[h] ?? ""));
          keys.push(String(row[key]).trim()); added++;
        }
      });
      return json_({ ok:true, added, updated });
    }
    return json_({ ok:false, error:"unknown action" });
  } catch (err) { return json_({ ok:false, error:String(err.message || err) }); }
  finally { lock.releaseLock(); }
}

/* ---------- 紅葉：tenki.jp 每 6 小時更新（只寫進這份試算表，網站要通行碼才讀得到） ---------- */
const FOLIAGE_SPOTS = [
  ["3/16/30688", "明治神宮外苑"], ["3/16/30117", "光が丘公園"], ["3/16/34655", "高尾山"],
  ["3/16/32202", "井の頭恩賜公園"], ["3/16/32201", "上野恩賜公園"], ["3/16/34671", "靖国神社"],
  ["3/16/30125", "六義園"], ["3/17/34666", "三溪園"], ["3/16/30157", "芝公園"],
  ["3/16/34670", "日比谷公園"], ["3/16/30119", "小石川後楽園"]
];
function strip_(h){ return String(h || "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim(); }
function parseTenki_(html){
  const pick = re => { const m = html.match(re); return m ? strip_(m[1]) : ""; };
  return {
    status:   pick(/class="rank-telop">([\s\S]*?)<\/span>/),
    desc:     pick(/class="rank-telop-status">([\s\S]*?)<\/p>/),
    forecast: pick(/今年の見頃予想<\/p>\s*<p class="date">([\s\S]*?)<\/p>/),
    asOf:     pick(/※([0-9]+日)現在の情報/)
  };
}
function updateFoliage(){
  const sh = sheet_("foliage"), head = HEADERS.foliage;
  const old = {}; rows_("foliage").forEach(r => old[r.id] = r);
  const now = Utilities.formatDate(new Date(), "Asia/Tokyo", "yyyy-MM-dd HH:mm");
  const out = FOLIAGE_SPOTS.map(([id, name]) => {
    const url = "https://tenki.jp/kouyou/" + id + ".html";
    let row = { id, name, url, status:"", desc:"", forecast:"", asOf:"", fetched: now, ok:false };
    try {
      const res = UrlFetchApp.fetch(url, { muteHttpExceptions:true, followRedirects:true, headers:{ "User-Agent":"Mozilla/5.0" } });
      if (res.getResponseCode() === 200){
        const p = parseTenki_(res.getContentText("UTF-8"));
        if (p.status) row = Object.assign(row, p, { ok:true });
      }
    } catch (e) {}
    // 抓失敗時保留上一次成功的資料，只更新 fetched／ok
    if (!row.ok && old[id] && old[id].status) row = Object.assign({}, old[id], { fetched: now, ok:false });
    Utilities.sleep(500);
    return head.map(h => row[h] ?? "");
  });
  const lock = LockService.getScriptLock(); lock.waitLock(10000);
  try {
    if (sh.getLastRow() > 1) sh.getRange(2, 1, sh.getLastRow() - 1, head.length).clearContent();
    sh.getRange(2, 1, out.length, head.length).setValues(out);
  } finally { lock.releaseLock(); }
}
function installTrigger(){
  removeTrigger();
  ScriptApp.newTrigger("updateFoliage").timeBased().everyHours(6).create();
  updateFoliage();
}
function removeTrigger(){
  ScriptApp.getProjectTriggers().filter(t => t.getHandlerFunction() === "updateFoliage").forEach(t => ScriptApp.deleteTrigger(t));
}
