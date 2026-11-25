/* 2026 Tokyo — 離線快取
 * 網站本身：先拿網路（3.5 秒內），沒有就用快取 → 有網路一定是最新版
 * CDN（地圖套件、圖示、字型）：先用快取
 * 地圖底圖：看過的先存，最多 400 張
 * Apps Script（記帳、行李同步）與所有 POST：完全不經過這裡
 * 改版時把 V 跟 index.html 的 ?v= 一起改
 */
const V = "tk26-202611260600";
const RT = "tk26-cdn", TILES = "tk26-tiles", MAX_TILES = 400;
const CORE = ["./", "index.html", "assets/style.css", "assets/app.js", "assets/data.js", "assets/tax.js", "assets/tax-infographic.jpg", "assets/icon-180.png", "manifest.json"];
const CDN = /^(cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net|fonts\.googleapis\.com|fonts\.gstatic\.com)$/;

self.addEventListener("install", e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k.startsWith("tk26-2") && k !== V).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

function timeout(ms){ return new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), ms)); }

async function networkFirst(req){
  const c = await caches.open(V);
  try {
    const res = await Promise.race([fetch(req), timeout(3500)]);
    if (res.ok) c.put(req, res.clone());
    return res;
  } catch (err) {
    const hit = await c.match(req, { ignoreSearch: true }) || (req.mode === "navigate" && await c.match("index.html"));
    if (hit) return hit;
    throw err;
  }
}
async function cacheFirst(req, name, max){
  const c = await caches.open(name);
  const hit = await c.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res.ok || res.type === "opaque"){
    await c.put(req, res.clone());
    if (max){ const keys = await c.keys(); if (keys.length > max) await Promise.all(keys.slice(0, keys.length - max).map(k => c.delete(k))); }
  }
  return res;
}

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const u = new URL(req.url);
  if (u.origin === location.origin) return e.respondWith(networkFirst(req));
  if (CDN.test(u.hostname)) return e.respondWith(cacheFirst(req, RT));
  if (u.hostname === "cyberjapandata.gsi.go.jp") return e.respondWith(cacheFirst(req, TILES, MAX_TILES));
  // 其他（氣象廳、Apps Script、外部連結）照常走網路
});
