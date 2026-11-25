/* 2026 Tokyo trip data — source of truth: ../2026_Tokyo_itinerary_v3.md (v3.7, 2026-11-24) */
window.TRIP = {
  version: "v4.0 · 2026-11-25",
  hotel: { name: "品川王子大飯店", lat: 35.6280, lng: 139.7365 },

  /* sun: 國立天文台 暦計算室（東京；12/3 為橫濱） who: 當天成員 */
  days: [
    { id: 1, date: "11/29", dow: "日", sun: ["06:30","16:28"], who: "Charles", title: "外苑清晨・寶可夢雕像・光之丘・外苑點燈・都廳投影" },
    { id: 2, date: "11/30", dow: "一", sun: ["06:31","16:28"], who: "Charles", title: "高尾山・八王子銀杏・井之頭・Alpen・しば田" },
    { id: 3, date: "12/01", dow: "二", sun: ["06:32","16:28"], who: "Charles ➔ 晚上 👫", title: "上野・東大・新宿御苑・六本木會合・光之森林" },
    { id: 4, date: "12/02", dow: "三", sun: ["06:33","16:28"], who: "早上 👫 ➔ 各自 ➔ 六義園 👫", title: "靖國・東御苑・PokéPark KANTO・六義園" },
    { id: 5, date: "12/03", dow: "四", sun: ["06:33","16:29"], who: "👫", title: "橫濱：三溪園・波靈橋・寶可夢井蓋・紅磚聖誕" },
    { id: 6, date: "12/04", dow: "五", sun: ["06:34","16:28"], who: "👫", title: "銅鑼燒・三囲・魚政 ➔ 下午兩案",
      plans: [ { key: "A", label: "A'", desc: "芝公園・東京鐵塔・聖誕市集" }, { key: "B", label: "B", desc: "晴空塔・竹燈祭・みつヰ" } ] },
    { id: 7, date: "12/05", dow: "六", sun: ["06:35","16:28"], who: "👫 ➔ 晚上各自", title: "九品佛・日比谷公園・國會議事堂・Bic・午餐（選配）・小石川・YOASOBI" },
    { id: 8, date: "12/06", dow: "日", sun: ["06:36","16:28"], who: "👫", title: "N'EX ➔ 成田 ➔ 返台" }
  ],

  /* cat: sight 景點 | light 點燈夜景 | food 餐飲 | shop 購物 | move 交通 ; who: 只有部分人參加時才標 */
  items: [
    // Day 1 — Charles
    { id: "d1-01", day: 1, time: "00:50", title: "羽田 T3 ➔ NODOKA 休息淋浴", cat: "move", lat: 35.5494, lng: 139.7798, note: "PP／JCB 白金免費 3 小時。05:15 京急首班車到品川，寄放行李。" },
    { id: "d1-02", day: 1, time: "06:20", title: "明治神宮外苑銀杏大道・清晨", cat: "sight", lat: 35.6748, lng: 139.7177, note: "日出 06:30。11/20 見頃 7–8 成，12/2 起落葉。", transit: "品川 ➔ 外苑前", tenki: "3/16/30688" },
    { id: "d1-03", day: 1, time: "07:30", title: "走到千駄ヶ谷（經國立競技場）", cat: "sight", lat: 35.6812, lng: 139.7115, note: "約 15–20 分鐘，用走的比繞信濃町好。", transit: "千駄ヶ谷 ➔ 總武線 ➔ 四ツ谷 ➔ 中央線快速 ➔ 東京" },
    { id: "d1-04", day: 1, time: "08:20", title: "早餐：アロマ珈琲 八重洲店", cat: "food", lat: 35.6800, lng: 139.7690, note: "週日 07:30 開，早餐套餐 ¥700，只收現金。", link: "https://tabelog.com/tokyo/A1302/A130201/13045029/" },
    { id: "d1-05", day: 1, time: "09:05", title: "東京車站丸之內站舍＋行幸通銀杏", cat: "sight", lat: 35.6812, lng: 139.7649, note: "早上站舍正面逆光，從行幸通斜拍。" },
    { id: "d1-06", day: 1, time: "09:45", title: "傳說寶可夢雕像（展期最後一天）", cat: "sight", lat: 35.6870, lng: 139.7735, note: "東京中城八重洲 ➔ 日本橋三井塔 ➔ COREDO 室町。" },
    { id: "d1-07", day: 1, time: "10:30", title: "寶可夢中心 TOKYO DX", cat: "shop", lat: 35.6810, lng: 139.7745, note: "日本橋高島屋 5F，10:30 開。11:00 離開。" },
    { id: "d1-08", day: 1, time: "11:30", title: "RAMEN MATSUI", cat: "food", lat: 35.6880, lng: 139.7155, note: "完全預約制：11/26 (四) 12:00 JST（台灣 11:00）TableCheck 開放。預約費 ¥500 不退；遲到算取消（¥2,000）；提早 10 分到；只收現金。備案：MAIKAGURA、谷や。", transit: "日本橋 ➔ 新宿御苑前", link: "https://tabelog.com/tokyo/A1304/A130402/13285098/" },
    { id: "d1-09", day: 1, time: "13:00", title: "光之丘公園 銀杏大道", cat: "sight", lat: 35.7630, lng: 139.6300, note: "11/22 紅葉見頃（tenki.jp），12/2 左右開始落葉。⚠️ 11/24 東京風雨大，葉子可能被吹落不少：11/28 晚上先看 X 搜尋「光が丘公園 イチョウ」再決定；落葉太多就改回品川 check-in 睡午覺。11/28–29 有光が丘公園フェスタ，人會比較多。", transit: "新宿御苑前 ➔ 光が丘（大江戶線）", tenki: "3/16/30117" },
    { id: "d1-10", day: 1, time: "15:30", title: "神宮外苑：夕陽 16:28 ➔ 16:30 點燈（最後一晚）", cat: "light", lat: 35.6748, lng: 139.7177, note: "點燈 16:30–19:30，免費（東京都官方）。", transit: "光が丘 ➔ 國立競技場（大江戶線直達）", link: "https://www.metro.tokyo.lg.jp/information/press/2026/11/2026111301", tenki: "3/16/30688" },
    { id: "d1-11", day: 1, time: "19:00", title: "都廳投影：哥吉拉 19:00＋寶可夢 TCG 19:30", cat: "light", lat: 35.6896, lng: 139.6917, note: "都民廣場，免費。", transit: "國立競技場 ➔ 都廳前（大江戶線）", link: "https://tokyoprojectionmappingproject.jp/" },
    { id: "d1-12", day: 1, time: "19:45", title: "晚餐留白 ➔ 品川 Check-in", cat: "food", lat: 35.6896, lng: 139.6917 },
    // Day 2 — Charles
    { id: "d2-01", day: 2, time: "07:10", title: "京王線 新宿 ➔ 高尾山口", cat: "move", lat: 35.6896, lng: 139.6995, note: "品川 06:45 出發，08:00 到高尾山口。" },
    { id: "d2-02", day: 2, time: "08:15", title: "高尾山：纜車上山 ➔ 1 號路 ➔ 山頂", cat: "sight", lat: 35.6251, lng: 139.2437, note: "纜車首班 08:00；下山搭吊椅。早上最容易看到富士山。", tenki: "3/16/34655" },
    { id: "d2-03", day: 2, time: "10:50", title: "甲州街道銀杏大道 ➔ 西八王子", cat: "sight", lat: 35.6490, lng: 139.2980, note: "11/20 見頃 7–8 成，12/8 起落葉。午餐留白。" },
    { id: "d2-04", day: 2, time: "13:00", title: "吉祥寺・井之頭恩賜公園", cat: "sight", lat: 35.6998, lng: 139.5730, transit: "西八王子 ➔ 吉祥寺", tenki: "3/16/32202" },
    { id: "d2-05", day: 2, time: "15:00", title: "Alpen TOKYO 買慢跑鞋", cat: "shop", lat: 35.6905, lng: 139.7020, note: "新宿東口步行 1 分。", transit: "吉祥寺 ➔ 新宿" },
    { id: "d2-06", day: 2, time: "17:00", title: "(選) mont-bell 新宿南口店", cat: "shop", lat: 35.6860, lng: 139.7005, note: "限定 T 4 款，包含「都廳とモンタベア」。" },
    { id: "d2-07", day: 2, time: "18:10", title: "中華そば しば田", cat: "food", lat: 35.6360, lng: 139.5785, note: "不能預約，晚上 17:30–20:30，週一有開。", transit: "新宿 ➔ 狛江（小田急）", link: "https://tabelog.com/tokyo/A1326/A132603/13300645/" },
    { id: "d2-09", day: 2, time: "21:00", title: "⚠️ 魚政（12/4）免費取消最後一天", cat: "food", lat: 35.6280, lng: 139.7365, note: "今天（日本時間）之前取消免費；12/1 起取消收 50%，12/2 起收 100%。改日期、改人數也算取消。不去就自己上 TableCheck 取消。", link: "https://www.tablecheck.com/ja/shops/unagi-uomasa/reserve" },
    // Day 3 — Charles；Cris 下午到，晚上會合
    { id: "d3-01", day: 3, time: "08:40", title: "ほたて日和 現場記帳", cat: "food", lat: 35.69856, lng: 139.77717, note: "平日午餐約 09:00 開放記帳，選 12:00–12:30。", transit: "品川 ➔ 秋葉原" },
    { id: "d3-02", day: 3, time: "09:10", title: "上野恩賜公園", cat: "sight", lat: 35.7148, lng: 139.7730, tenki: "3/16/32201" },
    { id: "d3-03", day: 3, time: "10:15", title: "根津神社", cat: "sight", lat: 35.7203, lng: 139.7606 },
    { id: "d3-04", day: 3, time: "10:50", title: "東京大學本鄉 銀杏大道", cat: "sight", lat: 35.7134, lng: 139.7622, note: "彌生門 ➔ 安田講堂 ➔ 三四郎池。" },
    { id: "d3-05", day: 3, time: "12:15", title: "ほたて日和", cat: "food", lat: 35.69856, lng: 139.77717, link: "https://tabelog.com/tokyo/A1310/A131001/13280086/" },
    { id: "d3-c1", day: 3, time: "13:25", who: "Cris", title: "Cris 抵達成田 T2（JX314）➔ 品川 Check-in", cat: "move", lat: 35.7720, lng: 140.3929, note: "入境約 14:15，成田 T2 ➔ 品川約 16:00。延誤就直接到六本木或光之森林會合。" },
    { id: "d3-06", day: 3, time: "13:40", title: "新宿御苑", cat: "sight", lat: 35.6852, lng: 139.7100, note: "最後入園 16:00，¥500。", transit: "秋葉原 ➔ 千駄ヶ谷" },
    { id: "d3-07", day: 3, time: "15:15", title: "明治神宮北門巨木銀杏", cat: "sight", lat: 35.6795, lng: 139.6990, note: "12 月 16:00 關門。" },
    { id: "d3-08", day: 3, time: "16:20", title: "入鹿 TOKYO 六本木", cat: "food", lat: 35.66477, lng: 139.73168, note: "排隊制，全面無現金。", link: "https://tabelog.com/tokyo/A1307/A130701/13264260/" },
    { id: "d3-09", day: 3, time: "17:30", title: "👫 六本木之丘會合 ➔ 櫸坂燈飾＋東京鐵塔", cat: "light", lat: 35.6595, lng: 139.7300, note: "「SNOW & BLUE」17:00–22:00；六本木之丘聖誕市集。", link: "https://www.christmas.hills-site.com/" },
    { id: "d3-10", day: 3, time: "19:00", title: "代代木 Forest of Lights 光之森林", cat: "light", lat: 35.6717, lng: 139.6949, note: "預購 19:00 時段，只賣預售（Cris 也要買）。", transit: "六本木 ➔ 原宿", link: "https://www.yoyogiforestoflights.tokyo/", ticket: "https://l-tike.com/yoyogiforestoflights/" },
    { id: "d3-11", day: 3, time: "20:20", title: "(選) mont-bell 澀谷店", cat: "shop", lat: 35.6625, lng: 139.6985, note: "限定 T 5 款，營業到 21:00。" },
    // Day 4 — 早上一起，Charles 去 PokéPark，Cris 自由行，六義園會合
    { id: "d4-01", day: 4, time: "07:30", title: "靖國神社 參道銀杏", cat: "sight", lat: 35.6941, lng: 139.7436, note: "👫 一起。", transit: "品川 ➔ 九段下", tenki: "3/16/34671" },
    { id: "d4-02", day: 4, time: "08:20", title: "北之丸公園（田安門）➔ 北桔橋門", cat: "sight", lat: 35.6915, lng: 139.7510 },
    { id: "d4-03", day: 4, time: "09:00", title: "江戶城遺址・皇居東御苑", cat: "sight", lat: 35.6875, lng: 139.7547, note: "天守台、本丸。免費，週一、五休。09:35 Charles 出發去 PokéPark，Cris 自由行。" },
    { id: "d4-04", day: 4, time: "11:00", who: "Charles", title: "🎮 PokéPark KANTO（精英票）", cat: "sight", lat: 35.6250, lng: 139.5180, note: "11:00–16:30。代購票 NT$4,600。", transit: "九段下 ➔ 京王よみうりランド（都營新宿線直通京王線）➔ 纜車" },
    { id: "d4-05", day: 4, time: "18:00", title: "👫 六義園 夜間特別觀賞（會合）", cat: "light", lat: 35.7331, lng: 139.7468, note: "18:00–20:30，預售 ¥1,000 × 2（12/1 23:59 前買）。晚餐留白。", transit: "京王よみうりランド ➔ 駒込", link: "https://www.tokyo-park.or.jp/park/rikugien/news/2026/rikugiengardens.html", ticket: "https://www.tokyo-park.or.jp/park/rikugien/news/2026/rikugiengardens.html", tenki: "3/16/30125" },
    // Day 5 — 橫濱
    { id: "d5-01", day: 5, time: "09:15", title: "名勝 三溪園", cat: "sight", lat: 35.4160, lng: 139.6620, note: "¥900。11/20 楓 2 成、銀杏見頃；楓預測 12/9 見頃。", transit: "品川 ➔ 橫濱 ➔ 三溪園（巴士）", tenki: "3/17/34666" },
    { id: "d5-02", day: 5, time: "11:00", title: "波靈橋（ポーリン橋）", cat: "sight", lat: 35.4425, lng: 139.6530, note: "人形之家 ↔ 山下公園的人行天橋。", transit: "三溪園 ➔ 山下公園" },
    { id: "d5-03", day: 5, time: "11:15", title: "🔵 井蓋⑤ 橫濱海洋塔（皮卡丘・大嘴鷗）", cat: "sight", lat: 35.443707, lng: 139.650904, note: "塔下小廣場。座標來自寶可夢官方 Poké Lids。", link: "https://www.welcome.city.yokohama.jp/pokelids/" },
    { id: "d5-04", day: 5, time: "11:30", title: "山下公園", cat: "sight", lat: 35.4460, lng: 139.6505, note: "午餐留白。" },
    { id: "d5-05", day: 5, time: "13:00", title: "日本大通銀杏＋神奈川縣廳合照", cat: "sight", lat: 35.4470, lng: 139.6430 },
    { id: "d5-06", day: 5, time: "13:45", title: "🔵 井蓋④ 赤レンガパーク（皮卡丘・雷丘）", cat: "sight", lat: 35.451037, lng: 139.644154, note: "最難找：穿過倉庫往東南，藍屋頂公廁旁、靠內河側。" },
    { id: "d5-07", day: 5, time: "14:15", title: "🔵 井蓋③ 臨港パーク（皮卡丘・比克提尼・小卡比獸）", cat: "sight", lat: 35.458698, lng: 139.638331, note: "洲際酒店靠海側、綠屋頂碼頭旁。" },
    { id: "d5-08", day: 5, time: "14:45", title: "🔵 井蓋② 日本丸紀念公園（皮卡丘・可達鴨・腕力）", cat: "sight", lat: 35.453319, lng: 139.631688, note: "看得到日本丸的岸邊。" },
    { id: "d5-09", day: 5, time: "15:00", title: "🔵 井蓋① JR 櫻木町站前廣場（皮卡丘）", cat: "sight", lat: 35.451167, lng: 139.631501, note: "東口廣場中間，AIR CABIN 塔旁。" },
    { id: "d5-10", day: 5, time: "15:10", title: "📮 橫濱市役所前寶可夢郵筒", cat: "sight", lat: 35.4513, lng: 139.6340, note: "設置延長到 2027/6 底。" },
    { id: "d5-11", day: 5, time: "15:30", title: "寶可夢中心 YOKOHAMA", cat: "shop", lat: 35.4643, lng: 139.6250, note: "橫濱 SKY 大樓 8F，10:30–20:30。", transit: "櫻木町 ➔ 橫濱" },
    { id: "d5-12", day: 5, time: "16:30", title: "紅磚倉庫聖誕市集＋寶可夢燈飾 1025", cat: "light", lat: 35.4527, lng: 139.6425, note: "日落 16:29。平日入場 ¥500；寶可夢區免費，至 21:00。晚餐留白。", transit: "橫濱 ➔ 馬車道", link: "https://www.yokohama-akarenga.jp/christmas/" },
    // Day 6 — 上午共用；下午 A' 或 B（看板上可切換）
    { id: "d6-01", day: 6, time: "09:00", title: "🥞 清寿軒 銅鑼燒（外帶）", cat: "food", lat: 35.6886, lng: 139.7795, note: "一～五 09:00–17:00，可刷卡。中午要吃鰻魚，建議外帶。", transit: "品川 08:30 ➔ 人形町（淺草線直通）", link: "https://tabelog.com/tokyo/A1302/A130204/13213772/" },
    { id: "d6-03", day: 6, time: "10:05", title: "🥞 亀十 銅鑼燒（外帶）", cat: "food", lat: 35.7105, lng: 139.7965, note: "10:00 開，只能外帶，只收現金，常排隊。", transit: "人形町 ➔ 淺草", link: "https://tabelog.com/tokyo/A1311/A131102/13003655/" },
    { id: "d6-04", day: 6, time: "10:30", title: "隅田公園 ➔ 言問橋", cat: "sight", lat: 35.7120, lng: 139.8020 },
    { id: "d6-06", day: 6, time: "11:00", title: "三囲神社", cat: "sight", lat: 35.7150, lng: 139.8068, note: "三柱鳥居、三越獅子。" },
    { id: "d6-07", day: 6, time: "11:30", title: "飛木稻荷神社", cat: "sight", lat: 35.7141, lng: 139.8154, note: "之後走到京成曳舟站約 8 分。" },
    { id: "d6-u1", day: 6, time: "12:00", title: "🍱 うなぎ 魚政（已訂，2 位）", cat: "food", lat: 35.7235, lng: 139.8290, note: "國產特上 ×2（うなわさ重1・志ら焼1）＋肝吸×2＋白飯1。11:55 前到；遲到 30 分以上會被取消；同桌同一種鰻；只能一起結帳。價格以當天為準。11/30 前取消免費。", transit: "曳舟 ➔ 四ツ木（京成押上線 2 站）", link: "https://tabelog.com/tokyo/A1324/A132403/13035339/" },
    // A'：芝公園・東京鐵塔・聖誕市集
    { id: "d6-a1", day: 6, plan: "A", time: "14:15", title: "增上寺 ➔ 芝公園", cat: "sight", lat: 35.6575, lng: 139.7483, note: "銀杏、紅葉，東京鐵塔合照。", transit: "四ツ木 ➔ 大門（京成直通淺草線，不用轉車）", tenki: "3/16/30157" },
    { id: "d6-a2", day: 6, plan: "A", time: "15:30", title: "東京鐵塔", cat: "sight", lat: 35.6586, lng: 139.7454, note: "（選）上展望台看 16:28 夕陽，現場或官網買票。", link: "https://www.tokyotower.co.jp/" },
    { id: "d6-a3", day: 6, plan: "A", time: "16:30", title: "🎄 東京聖誕市集・芝公園（晚餐在市集）", cat: "light", lat: 35.6610, lng: 139.7490, note: "12/4 首日 16:00–22:00（最後入場 21:00）。門票指定日期時段，平日 ¥1,000／人，要先買。首日人可能多。", link: "https://tokyochristmas.net/", ticket: "https://tokyochristmas.net/" },
    { id: "d6-a4", day: 6, plan: "A", time: "19:30", title: "日比谷哥吉拉＋復仇者聯盟燈光秀", cat: "light", lat: 35.6738, lng: 139.7595, note: "每 30 分一場，免費。", transit: "御成門 ➔ 日比谷（三田線 2 站）", link: "https://www.hibiya.tokyo-midtown.com/xmas/" },
    { id: "d6-a5", day: 6, plan: "A", time: "20:00", title: "丸之內仲通燈飾＋哈利波特聖誕樹", cat: "light", lat: 35.6812, lng: 139.7640, note: "丸大樓 1F，燈光秀到 21:00，每 15 分一場。", transit: "日比谷 ➔ 丸之內（走路）", link: "https://www.marunouchi.com/lp/brightholiday2026/" },
    // B：晴空塔・竹燈祭・みつヰ
    { id: "d6-b1", day: 6, plan: "B", time: "13:30", title: "晴空塔城 聖誕市集＋寶可夢中心", cat: "shop", lat: 35.7101, lng: 139.8107, note: "（選）展望台看 16:28 夕陽。", transit: "四ツ木 ➔ 押上" },
    { id: "d6-b2", day: 6, plan: "B", time: "16:30", title: "竹燈祭 竹あかり", cat: "light", lat: 35.7105, lng: 139.8045, note: "17:00 點燈，免費。17:10 離開。", link: "https://www.tobu.co.jp/odekake/special/takeakari/index.html" },
    { id: "d6-b3", day: 6, plan: "B", time: "17:30", title: "🎫 麺 みつヰ 領晚場整理券", cat: "food", lat: 35.7095, lng: 139.7915, note: "晚場約 17:30 發券；不能預約。拿到 18:45 以後的券，19:30 燈光秀會趕不上。", transit: "隅田公園 ➔ 田原町（走路 15–20 分）" },
    { id: "d6-b4", day: 6, plan: "B", time: "18:00", title: "🍜 麺 みつヰ", cat: "food", lat: 35.7095, lng: 139.7915, note: "依整理券時間入店，18:00–20:00。", link: "https://tabelog.com/tokyo/A1311/A131102/13284327/" },
    { id: "d6-b5", day: 6, plan: "B", time: "19:30", title: "日比谷哥吉拉＋復仇者聯盟燈光秀", cat: "light", lat: 35.6738, lng: 139.7595, note: "每 30 分一場，免費。", transit: "田原町 ➔ 銀座（銀座線直達）", link: "https://www.hibiya.tokyo-midtown.com/xmas/" },
    { id: "d6-b6", day: 6, plan: "B", time: "20:00", title: "丸之內仲通燈飾＋哈利波特聖誕樹", cat: "light", lat: 35.6812, lng: 139.7640, note: "丸大樓 1F，燈光秀到 21:00，每 15 分一場。", transit: "日比谷 ➔ 丸之內（走路）", link: "https://www.marunouchi.com/lp/brightholiday2026/" },
    // Day 7
    { id: "d7-01", day: 7, time: "07:20", title: "九品佛 淨真寺", cat: "sight", lat: 35.6060, lng: 139.6610, note: "例年 12 月上旬～中旬最盛。", transit: "品川 06:50 ➔ 九品仏（大井町線）" },
    { id: "d7-02", day: 7, time: "09:00", title: "日比谷公園（首かけイチョウ）", cat: "sight", lat: 35.6735, lng: 139.7560, note: "Weathernews 預測 12/7 見頃。", transit: "九品仏 ➔ 日比谷（自由が丘、中目黒轉日比谷線）", tenki: "3/16/34670" },
    { id: "d7-02b", day: 7, time: "09:45", title: "國會議事堂外觀＋銀杏拍照", cat: "sight", lat: 35.6759, lng: 139.7449, note: "不進去參觀，只在外面拍。今年國會前銀杏沒有專門報導，參考附近北之丸、日比谷的狀況。", transit: "日比谷公園 ➔ 國會議事堂（走路約 10 分）" },
    { id: "d7-03", day: 7, time: "10:30", title: "Bic Camera 有樂町 買吸頂燈 ➔ 回飯店", cat: "shop", lat: 35.6745, lng: 139.7630, note: "B2F 照明區，可免稅。", transit: "國會議事堂前 ➔ 有樂町" },
    { id: "d7-04", day: 7, time: "12:00", title: "午餐留白（選配）", cat: "food", lat: 35.7020, lng: 139.7530, note: "選配：麺 みつヰ（田原町，週六 11:00–16:00，整理券）／とんかつ じゅうろく（田原町，3.56）／中華そば 勝本（水道橋，3.74，無休）／海老丸らーめん（水道橋，3.74，午餐有 TableCheck Fast Pass）。詳見餐廳頁。" },
    { id: "d7-05", day: 7, time: "13:30", title: "小石川後樂園", cat: "sight", lat: 35.7056, lng: 139.7495, note: "¥300，現場買票。", transit: "➔ 水道橋", link: "https://www.tokyo-park.or.jp/park/format/index030.html", tenki: "3/16/30119" },
    { id: "d7-06", day: 7, time: "15:30", title: "(選) 東京大神宮", cat: "sight", lat: 35.6996, lng: 139.7470 },
    { id: "d7-07", day: 7, time: "18:00", who: "Charles", title: "🎤 YOASOBI 東京巨蛋", cat: "light", lat: 35.7056, lng: 139.7519, note: "15:30 開場、18:00 開演，預計 20:30 左右結束（分區退場）。16:20 到巨蛋。Cris 晚上自由。", link: "https://www.yoasobi-music.jp/special/superplanet/" },
    // Day 8
    { id: "d8-01", day: 8, time: "07:18", title: "N'EX 5 號 品川 ➔ 成田 T2（08:32 到）", cat: "move", lat: 35.6285, lng: 139.7387, note: "06:55 退房；¥3,330 × 2，全車指定席。備案 07:39 N'EX 7 號。" },
    { id: "d8-02", day: 8, time: "08:32", title: "成田 T2：海關退稅 kiosk ➔ 領現金 ➔ 託運 ➔ 返台", cat: "move", lat: 35.7720, lng: 140.3929, note: "吸頂燈先做海關確認再託運。Charles IT201 11:25；Cris 另訂同時段班機。" }
  ],

  events: [
    { name: "神宮外苑銀杏點燈", when: "11/21–11/29", hours: "16:30–19:30", fee: "免費", day: "Day 1", src: "https://www.metro.tokyo.lg.jp/information/press/2026/11/2026111301" },
    { name: "都廳投影（寶可夢 TCG／哥吉拉）", when: "週六日、假日", hours: "寶可夢 17:30・19:30；哥吉拉 19:00・21:00", fee: "免費", day: "Day 1", src: "https://tokyoprojectionmappingproject.jp/" },
    { name: "六本木櫸坂通燈飾", when: "11/05–12/25", hours: "17:00–22:00", fee: "免費", day: "Day 3", src: "https://www.christmas.hills-site.com/" },
    { name: "代代木 Forest of Lights", when: "11/13–1/11", hours: "17:30–22:00（最後入場 21:00）", fee: "平日 ¥3,200，只賣預售票", day: "Day 3", src: "https://www.yoyogiforestoflights.tokyo/" },
    { name: "六義園 夜間特別觀賞", when: "11/25–12/06", hours: "18:00–20:30（最後入園 19:30）", fee: "預售 ¥1,000／當日 ¥1,200", day: "Day 4", src: "https://www.tokyo-park.or.jp/park/rikugien/news/2026/rikugiengardens.html" },
    { name: "紅磚倉庫聖誕市集", when: "11/20–12/25", hours: "11:00–21:00（12/5 起至 22:00）", fee: "平日 ¥500", day: "Day 5", src: "https://www.yokohama-akarenga.jp/christmas/" },
    { name: "寶可夢燈飾 1025（紅磚免費區）", when: "11/25–12/25", hours: "11:00–21:00", fee: "免費", day: "Day 5", src: "https://www.pokemon.co.jp/info/2026/11/261113_e01.html" },
    { name: "橫濱寶可夢井蓋 5 處＋郵筒", when: "常設（郵筒至 2027/6 底）", hours: "24 小時", fee: "免費", day: "Day 5", src: "https://www.welcome.city.yokohama.jp/pokelids/" },
    { name: "竹燈祭 東京下町回遊 竹あかり", when: "11/07–1/31", hours: "17:00–22:00", fee: "免費", day: "Day 6（B）", src: "https://www.tobu.co.jp/odekake/special/takeakari/index.html" },
    { name: "東京聖誕市集・芝公園", when: "12/04–12/25", hours: "首日 16:00–22:00；其他 11:00–22:00（最後入場 21:00）", fee: "日時指定票：平日 ¥1,000／週末 ¥1,500（要先買）", day: "Day 6（A')", src: "https://tokyochristmas.net/" },
    { name: "復仇者聯盟 HIBIYA Magic Time", when: "11/12–12/25", hours: "16:00–23:00，每 30 分一場燈光秀", fee: "免費", day: "Day 6", src: "https://www.hibiya.tokyo-midtown.com/xmas/" },
    { name: "丸之內 哈利波特聖誕樹", when: "11/12–12/25", hours: "燈光秀 17:00–21:00，每 15 分", fee: "免費", day: "Day 6", src: "https://www.marunouchi.com/lp/brightholiday2026/" },
    { name: "丸之內仲通燈飾", when: "11/12–2/14", hours: "12 月 16:00–24:00", fee: "免費", day: "Day 6", src: "https://www.marunouchi.com/pickup/event/11233/" },
    { name: "YOASOBI 東京巨蛋", when: "12/05", hours: "15:30 開場、18:00 開演", fee: "已購票", day: "Day 7", src: "https://www.yoasobi-music.jp/special/superplanet/" },
    { name: "小石川後樂園 深山紅葉", when: "11/21–12/06", hours: "09:00–17:00", fee: "¥300", day: "Day 7", src: "https://www.tokyo-park.or.jp/park/format/index030.html" }
  ],

  /* tenki: tenki.jp 紅葉頁（Apps Script 每 6 小時抓，要通行碼才顯示）；links: 其他可查的紅葉情報 */
  foliage: [
    { spot: "明治神宮外苑", visit: "11/29", status: "見頃 7–8 成（11/20），12/2 起落葉", verdict: "ok", tenki: "3/16/30688" },
    { spot: "光之丘公園", visit: "11/29", status: "紅葉見頃（11/22），12/2 左右開始落葉；11/24 風雨", verdict: "warn", tenki: "3/16/30117" },
    { spot: "高尾山", visit: "11/30", status: "tenki.jp 紅葉見頃（11/24）", verdict: "ok", tenki: "3/16/34655" },
    { spot: "八王子甲州街道", visit: "11/30", status: "見頃 7–8 成（11/20），12/8 起落葉", verdict: "ok" },
    { spot: "井之頭恩賜公園", visit: "11/30", status: "tenki.jp 紅葉見頃（11/24）", verdict: "ok", tenki: "3/16/32202" },
    { spot: "上野恩賜公園", visit: "12/01", status: "紅葉見頃（11/21）", verdict: "ok", tenki: "3/16/32201" },
    { spot: "東京大學本鄉", visit: "12/01", status: "沒有 2026 實測，依周邊推估接近最盛", verdict: "warn" },
    { spot: "靖國神社", visit: "12/02", status: "tenki.jp 紅葉見頃（11/24）", verdict: "ok", tenki: "3/16/34671" },
    { spot: "六義園", visit: "12/02", status: "預測 12/2 起見頃", verdict: "ok", tenki: "3/16/30125" },
    { spot: "三溪園", visit: "12/03", status: "楓 2 成、銀杏見頃（11/20）；楓預測 12/9 見頃", verdict: "warn", tenki: "3/17/34666", more: "https://www.sankeien.or.jp/" },
    { spot: "日本大通", visit: "12/03", status: "接近見頃（11/19）", verdict: "ok" },
    { spot: "芝公園", visit: "12/04", status: "tenki.jp 青葉（11/24），預測 12 月上旬～下旬", verdict: "warn", tenki: "3/16/30157" },
    { spot: "九品佛 淨真寺", visit: "12/05", status: "今年無資料；例年 12 月上旬～中旬", verdict: "ok" },
    { spot: "日比谷公園", visit: "12/05", status: "まだ（11/19），預測 12/7 見頃、12/22 落葉", verdict: "ok", tenki: "3/16/34670" },
    { spot: "國會議事堂", visit: "12/05", status: "沒有專門報導", verdict: "warn" },
    { spot: "小石川後樂園", visit: "12/05", status: "預測 12/1 起見頃", verdict: "ok", tenki: "3/16/30119" }
  ],
  foliageLinks: [
    { name: "tenki.jp 東京", url: "https://tenki.jp/kouyou/3/16/" },
    { name: "Weathernews 紅葉", url: "https://weathernews.jp/koyo/" },
    { name: "Walkerplus 紅葉名所", url: "https://koyo.walkerplus.com/" },
    { name: "東京都 37 公園紅葉情報（週一、四更新）", url: "https://www.metro.tokyo.lg.jp/information/press/2026/11/2026110514" },
    { name: "三溪園官網", url: "https://www.sankeien.or.jp/" }
  ],

  /* 天氣：氣象廳公開 JSON（瀏覽器直接讀，6 小時快取） */
  weather: { default: "130000", byDay: { 5: "140000" } },

  todos: [
    { id: "t20", text: "RAMEN MATSUI：TableCheck 訂 11/29 11:30（1 位）", due: "11/26 12:00 JST" },
    { id: "t29", text: "魚政 12/4 12:00（已訂）：不去的話 11/30 前上 TableCheck 取消（12/1 起收 50%）", due: "11/30" },
    { id: "t30", text: "12/4 選 A' 的話：買東京聖誕市集・芝公園 12/4 門票 × 2（日時指定）", due: "12/4 前" },
    { id: "t23", text: "光之森林 12/1 19:00：Cris 也要買同時段", due: "盡快" },
    { id: "t24", text: "六義園夜楓 12/2：預售 ¥1,000 × 2", due: "12/1 23:59" },
    { id: "t25", text: "N'EX 12/6 07:18 品川發 5 號 × 2（連號）", due: "出發前" },
    { id: "t26", text: "品川王子：12/1 起 2 人入住的價差（已寫信詢問）", due: "等回覆" },
    { id: "t28", text: "Cris 回程航班：確認航廈（是否也是成田 T2）", due: "出發前" },
    { id: "t10", text: "註冊 J-TaxRefund／JPrefund；Alpen 結帳前先問用哪一家退稅業者", due: "購物前" },
    { id: "t7", text: "Bic Camera 官網先選好吸頂燈型號", due: "12/5 前" },
    { id: "t8", text: "確認ほたて日和、みつヰ（B 案／12/5 選配）12 月公休；MATSUI 看 IG／X 公告", due: "11/28" }
  ],

  /* 攜帶物品（第一次連上 Google Sheet 時寫入 packing 分頁） */
  packing: {
    people: ["Charles","Cris"],
    common: ["護照","日幣","錢包","證件","個人藥品","雨具","換洗衣物","帽子","毛巾","拖鞋","充電器","行動電源"],
    extra: { Cris: ["枕頭套"] },
    notes: { "行動電源": "只能放隨身行李，不能托運" }
  },

  /* seed rows for the Google-Sheet-backed restaurant table */
  restaurants: [
    { name: "宍道湖しじみ中華蕎麦 琥珀 東京本店", type: "拉麵", tabelog: 3.92, tabelogReviews: 2112, google: 4.3, googleReviews: 1013, area: "雜色", closed: "日・假日", reserve: "TableCheck 完全預約", day: "不排", url: "https://tabelog.com/tokyo/A1315/A131503/13234195/" },
    { name: "入鹿 TOKYO 六本木", type: "拉麵", tabelog: 3.91, tabelogReviews: 2999, google: 4.0, googleReviews: 1762, area: "六本木", closed: "一", reserve: "排隊", day: "Day 3", url: "https://tabelog.com/tokyo/A1307/A130701/13264260/" },
    { name: "Tokyo Style Noodle ほたて日和", type: "拉麵", tabelog: 3.88, tabelogReviews: 1477, google: 4.2, googleReviews: 566, area: "秋葉原", closed: "三", reserve: "現場記帳", day: "Day 3", url: "https://tabelog.com/tokyo/A1310/A131001/13280086/" },
    { name: "中華そば しば田", type: "拉麵", tabelog: 4.01, tabelogReviews: 1787, google: "", googleReviews: "", area: "狛江", closed: "四・日", reserve: "排隊", day: "Day 2", url: "https://tabelog.com/tokyo/A1326/A132603/13300645/" },
    { name: "らーめん MAIKAGURA", type: "拉麵", tabelog: 3.86, tabelogReviews: 2144, google: 4.2, googleReviews: 967, area: "千歲船橋", closed: "一", reserve: "排隊／TableCheck 11:00 枠", day: "備案", url: "https://tabelog.com/tokyo/A1318/A131813/13218425/" },
    { name: "RAMEN MATSUI", type: "拉麵", tabelog: 3.83, tabelogReviews: 1563, google: "", googleReviews: "", area: "新宿御苑前", closed: "三・四", reserve: "TableCheck 完全預約（3 天前 12:00）", day: "Day 1", url: "https://tabelog.com/tokyo/A1304/A130402/13285098/" },
    { name: "麺 みつヰ", type: "拉麵", tabelog: 3.82, tabelogReviews: 1629, google: "", googleReviews: "", area: "田原町", closed: "日・一", reserve: "現場整理券", day: "Day 6-B 晚餐／Day 7 選配", url: "https://tabelog.com/tokyo/A1311/A131102/13284327/" },
    { name: "三ん寅", type: "拉麵", tabelog: 3.82, tabelogReviews: 3292, google: "", googleReviews: "", area: "江戶川橋", closed: "不定休", reserve: "不可預約，只收現金", day: "Day 7 選配（稍遠）", url: "https://tabelog.com/tokyo/A1309/A130905/13240660/" },
    { name: "中華そば 勝本", type: "拉麵", tabelog: 3.74, tabelogReviews: 3468, google: "", googleReviews: "", area: "水道橋", closed: "無休", reserve: "不可預約，只收現金", day: "Day 7 選配", url: "https://tabelog.com/tokyo/A1310/A131003/13179757/" },
    { name: "海老丸らーめん", type: "拉麵", tabelog: 3.74, tabelogReviews: 1931, google: "", googleReviews: "", area: "水道橋", closed: "不定休", reserve: "排隊；午餐 TableCheck Fast Pass", day: "Day 7 選配", url: "https://tabelog.com/tokyo/A1310/A131003/13212911/" },
    { name: "麺や晴心", type: "拉麵", tabelog: 3.75, tabelogReviews: 972, google: 4.2, googleReviews: 312, area: "東中野", closed: "二・三", reserve: "排隊", day: "備案", url: "https://tabelog.com/tokyo/A1321/A132104/13302009/" },
    { name: "おにやんま 五反田本店", type: "烏龍麵", tabelog: 3.73, tabelogReviews: 5233, google: "", googleReviews: "", area: "五反田", closed: "無", reserve: "不可預約（立食）", day: "備案", url: "" },
    { name: "難波千日前 釜たけうどん 八重洲北口店", type: "烏龍麵", tabelog: 3.72, tabelogReviews: 3330, google: "", googleReviews: "", area: "東京站", closed: "無", reserve: "不可預約", day: "備案", url: "" },
    { name: "うどん山長", type: "烏龍麵", tabelog: 3.69, tabelogReviews: 2656, google: "", googleReviews: "", area: "惠比壽", closed: "無", reserve: "晚餐可電話預約", day: "備案", url: "" },
    { name: "谷や", type: "烏龍麵", tabelog: 3.68, tabelogReviews: 3031, google: "", googleReviews: "", area: "水天宮前", closed: "不定休", reserve: "不可預約", day: "備案", url: "https://tabelog.com/tokyo/A1302/A130204/13114085/" },
    { name: "亀十", type: "和菓子・銅鑼燒", tabelog: 3.79, tabelogReviews: 4569, google: "", googleReviews: "", area: "淺草", closed: "不定休", reserve: "外帶排隊", day: "Day 6", url: "https://tabelog.com/tokyo/A1311/A131102/13003655/" },
    { name: "清寿軒", type: "和菓子・銅鑼燒", tabelog: 3.77, tabelogReviews: 1442, google: "", googleReviews: "", area: "人形町", closed: "六・日・假日", reserve: "不可預約", day: "Day 6", url: "https://tabelog.com/tokyo/A1302/A130204/13213772/" },
    { name: "とんかつ ここまでやるか。", type: "炸豬排", tabelog: 3.74, tabelogReviews: 884, google: 4.2, googleReviews: 150, area: "外苑前", closed: "三・日", reserve: "Tabelog 線上", day: "備案", url: "https://tabelog.com/tokyo/A1306/A130603/13294363/" },
    { name: "銀座 とんかつ 斉藤", type: "炸豬排", tabelog: 3.60, tabelogReviews: 280, google: 4.7, googleReviews: 535, area: "東銀座", closed: "六・日", reserve: "TableCheck", day: "備案", url: "https://tabelog.com/tokyo/A1301/A130101/13294753/" },
    { name: "かつ吉 新丸ビル店", type: "炸豬排", tabelog: 3.57, tabelogReviews: 1345, google: 4.3, googleReviews: 699, area: "東京站", closed: "無", reserve: "Tabelog／電話", day: "備案", url: "https://tabelog.com/tokyo/A1302/A130201/13038494/" },
    { name: "とんかつ じゅうろく", type: "炸豬排", tabelog: 3.56, tabelogReviews: 231, google: 4.7, googleReviews: 544, area: "淺草", closed: "一＋不定休", reserve: "現場候位", day: "Day 7 選配", url: "https://tabelog.com/tokyo/A1311/A131102/13276330/" },
    { name: "とんかつ にいむら 本店", type: "炸豬排", tabelog: 3.49, tabelogReviews: 987, google: 4.0, googleReviews: 2176, area: "歌舞伎町", closed: "無", reserve: "Tabelog／電話", day: "備案", url: "https://tabelog.com/tokyo/A1304/A130401/13010847/" },
    { name: "とんかつ伊とう 渋谷フクラス店", type: "炸豬排", tabelog: 3.42, tabelogReviews: 140, google: 4.6, googleReviews: 168, area: "澀谷", closed: "無", reserve: "Tabelog／電話", day: "備案", url: "https://tabelog.com/tokyo/A1303/A130301/13295361/" },
    { name: "鮨 さわ田", type: "壽司", tabelog: 4.53, tabelogReviews: 622, google: 4.7, googleReviews: 195, area: "銀座", closed: "一（四・日不定）", reserve: "OMAKASE only", day: "撿取消", url: "https://tabelog.com/tokyo/A1301/A130101/13001043/" },
    { name: "鮓 ふじなが", type: "壽司", tabelog: 4.33, tabelogReviews: 319, google: "", googleReviews: "", area: "麻布十番", closed: "日・假日", reserve: "Tabelog／電話（18:00、20:30 兩輪）", day: "考慮中", url: "https://tabelog.com/tokyo/A1307/A130702/13265370/" },
    { name: "佐たけ", type: "壽司", tabelog: 3.93, tabelogReviews: 552, google: "", googleReviews: "", area: "築地市場", closed: "日・一", reserve: "Tabelog 線上", day: "已取消", url: "https://tabelog.com/tokyo/A1301/A130103/13258466/" },
    { name: "すきやばし次郎 六本木ヒルズ店", type: "壽司", tabelog: 3.68, tabelogReviews: 217, google: 4.0, googleReviews: 504, area: "六本木", closed: "三", reserve: "已訂不到", day: "—", url: "https://tabelog.com/tokyo/A1307/A130701/13004426/" },
    { name: "かぶと", type: "鰻魚", tabelog: 4.43, tabelogReviews: 1427, google: "", googleReviews: "", area: "池袋", closed: "日・四・假日", reserve: "OMAKASE（撿取消）", day: "撿取消", url: "https://tabelog.com/tokyo/A1305/A130501/13016660/" },
    { name: "うなぎ 魚政", type: "鰻魚", tabelog: 4.30, tabelogReviews: 1288, google: "", googleReviews: "", area: "四ツ木", closed: "二・三", reserve: "TableCheck（內用 11:30–12:30／17:30–18:30）", day: "Day 6 午餐（已訂）", url: "https://tabelog.com/tokyo/A1324/A132403/13035339/" },
    { name: "アロマ珈琲 八重洲店", type: "早餐・咖啡", tabelog: 3.63, tabelogReviews: 1044, google: "", googleReviews: "", area: "八重洲", closed: "1/1", reserve: "不可預約，只收現金", day: "Day 1", url: "https://tabelog.com/tokyo/A1302/A130201/13045029/" }
  ]
};
