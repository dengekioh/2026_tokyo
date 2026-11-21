/** @OnlyCurrentDoc */
/**
 * 2026 Tokyo — Google Sheet backend (Apps Script Web App)
 *
 * 1. 在試算表「擴充功能 → Apps Script」貼上這整份程式碼。
 * 2. 左側「專案設定 → 指令碼屬性」新增：TOKEN = 你自己想的通行碼。
 * 3. 執行一次 setup()（會要求授權），自動建立 restaurants / expenses 的欄位。
 * 4. 「部署 → 新增部署作業 → 網頁應用程式」：執行身分＝我，存取權＝所有人。
 * 5. 把產生的 …/exec 網址和通行碼，貼到網站「消費表 → Google Sheet 同步設定」。
 */
const HEADERS = {
  restaurants: ["id","name","type","tabelog","tabelogReviews","google","googleReviews","area","closed","reserve","day","url"],
  expenses:    ["id","day","cat","item","amount","pay","note","created"]
};

function setup(){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  Object.keys(HEADERS).forEach(name => {
    const sh = ss.getSheetByName(name) || ss.insertSheet(name);
    sh.getRange(1, 1, 1, HEADERS[name].length).setValues([HEADERS[name]]).setFontWeight("bold");
    sh.setFrozenRows(1);
    // 文字欄位設成純文字，避免「1/1」被轉成日期
    HEADERS[name].forEach((h, i) => {
      if (!["tabelog","tabelogReviews","google","googleReviews","amount","day"].includes(h))
        sh.getRange(2, i + 1, sh.getMaxRows() - 1, 1).setNumberFormat("@");
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
    if (b.action === "delete"){
      const ids = sh.getRange(2, 1, Math.max(sh.getLastRow() - 1, 1), 1).getValues().map(r => String(r[0]));
      const i = ids.indexOf(String(b.id));
      if (i >= 0) sh.deleteRow(i + 2);
      return json_({ ok:true, deleted: i >= 0 });
    }
    if (b.action === "seed"){
      if (sh.getLastRow() > 1) return json_({ ok:true, written:0 });
      const data = (b.rows || []).map(r => head.map(h => r[h] ?? ""));
      if (data.length) sh.getRange(2, 1, data.length, head.length).setValues(data);
      return json_({ ok:true, written:data.length });
    }
    return json_({ ok:false, error:"unknown action" });
  } catch (err) { return json_({ ok:false, error:String(err.message || err) }); }
  finally { lock.releaseLock(); }
}
