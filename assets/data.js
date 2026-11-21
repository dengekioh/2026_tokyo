/* 2026 Tokyo trip data — source of truth: ../2026_Tokyo_itinerary_v3.md (v3.2, 2026-11-21) */
window.TRIP = {
  version: "v3.2 · 2026-11-21",
  hotel: { name: "品川王子大飯店", lat: 35.6280, lng: 139.7365 },

  days: [
    { id: 1, date: "11/29", dow: "日", title: "外苑清晨・寶可夢雕像・外苑點燈・都廳投影" },
    { id: 2, date: "11/30", dow: "一", title: "高尾山・八王子銀杏・Alpen・魚政" },
    { id: 3, date: "12/01", dow: "二", title: "上野・東大・新宿御苑・六本木・光之森林" },
    { id: 4, date: "12/02", dow: "三", title: "靖國・江戶城・日比谷・東京鐵塔・六義園" },
    { id: 5, date: "12/03", dow: "四", title: "橫濱：三溪園・銀杏・紅磚寶可夢聖誕" },
    { id: 6, date: "12/04", dow: "五", title: "押上・隅田川・晴空塔・竹燈祭・丸之內" },
    { id: 7, date: "12/05", dow: "六", title: "Bic Camera・琥珀・小石川・YOASOBI" },
    { id: 8, date: "12/06", dow: "日", title: "N'EX ➔ 成田 ➔ 返台" }
  ],

  /* cat: sight 景點 | light 點燈夜景 | food 餐飲 | shop 購物 | move 交通 */
  items: [
    // Day 1
    { id: "d1-01", day: 1, time: "00:50", title: "羽田 T3 ➔ NODOKA 休息淋浴", cat: "move", lat: 35.5494, lng: 139.7798, note: "PP / JCB 白金免費 3 小時。05:15 京急首班車 ➔ 05:36 品川，寄放行李。" },
    { id: "d1-02", day: 1, time: "06:20", title: "明治神宮外苑銀杏大道・清晨", cat: "sight", lat: 35.6748, lng: 139.7177, note: "日出 06:27。Weathernews 11/20 已 7–8 成，12/2 起落葉。", transit: "品川 ➔ 山手線 ➔ 澀谷 ➔ 銀座線 ➔ 外苑前 4a（約 25 分）" },
    { id: "d1-03", day: 1, time: "08:00", title: "早餐：アロマ珈琲 八重洲店", cat: "food", lat: 35.6800, lng: 139.7690, note: "週日 07:30 開，早餐套餐 ¥700，只收現金。", transit: "外苑前 ➔ 銀座線直達京橋（約 20 分）", link: "https://tabelog.com/tokyo/A1302/A130201/13045029/" },
    { id: "d1-04", day: 1, time: "08:45", title: "東京車站丸之內站舍＋行幸通銀杏", cat: "sight", lat: 35.6812, lng: 139.7649, note: "早上站舍正面逆光，從行幸通斜拍。" },
    { id: "d1-05", day: 1, time: "09:30", title: "傳說寶可夢雕像（展期最後一天）", cat: "sight", lat: 35.6870, lng: 139.7735, note: "東京中城八重洲 ➔ 日本橋三井塔 ➔ COREDO 室町。" },
    { id: "d1-06", day: 1, time: "10:30", title: "寶可夢中心 TOKYO DX", cat: "shop", lat: 35.6810, lng: 139.7745, note: "日本橋高島屋 5F，10:30 開。" },
    { id: "d1-07", day: 1, time: "11:55", title: "らーめん MAIKAGURA", cat: "food", lat: 35.64807, lng: 139.61899, note: "週日排隊預估 45–90 分。⏰ 12:00 用手機搶琥珀 12/5 12:00 那輪。", transit: "東京 ➔ 中央線快速 ➔ 新宿 ➔ 小田急各停／準急 ➔ 千歲船橋（約 55 分）", link: "https://tabelog.com/tokyo/A1318/A131813/13218425/" },
    { id: "d1-08", day: 1, time: "13:30", title: "豪德寺（招福貓・紅葉）", cat: "sight", lat: 35.6489, lng: 139.6472, note: "小田急 2 站。MAIKAGURA 14:00 還沒吃到就砍掉。" },
    { id: "d1-09", day: 1, time: "15:30", title: "神宮外苑：夕陽 ➔ 16:30 點燈（最後一晚）", cat: "light", lat: 35.6748, lng: 139.7177, note: "點燈 16:30–19:30，免費（東京都官方）。", transit: "豪德寺 ➔ 小田急 ➔ 新宿 ➔ 總武線 ➔ 信濃町（約 40 分）" },
    { id: "d1-10", day: 1, time: "19:00", title: "都廳投影：哥吉拉 19:00＋寶可夢 TCG 19:30", cat: "light", lat: 35.6896, lng: 139.6917, note: "都民廣場，免費。19:00 哥吉拉場，19:30 寶可夢「TOKYO LUMINOUS NIGHT」。", transit: "國立競技場 ➔ 大江戶線 ➔ 都廳前（約 10 分）" },
    { id: "d1-11", day: 1, time: "19:45", title: "晚餐留白 ➔ 品川 Check-in", cat: "food", lat: 35.6896, lng: 139.6917, note: "西新宿／新宿一帶自己找。" },
    // Day 2
    { id: "d2-01", day: 2, time: "07:10", title: "京王特急 新宿 ➔ 高尾山口", cat: "move", lat: 35.6896, lng: 139.6995, note: "品川 06:45 出發，08:00 到高尾山口，刷 Suica ¥430。" },
    { id: "d2-02", day: 2, time: "08:15", title: "高尾山：纜車上山 ➔ 1 號路 ➔ 山頂", cat: "sight", lat: 35.6251, lng: 139.2437, note: "纜車首班 08:00；下山搭吊椅。早上最容易看到富士山。" },
    { id: "d2-03", day: 2, time: "10:50", title: "甲州街道銀杏大道 ➔ 西八王子", cat: "sight", lat: 35.6490, lng: 139.2980, note: "高尾站北口沿國道 20 號往東約 3.5km。見頃 7–8 成，12/8 起落葉。午餐留白。" },
    { id: "d2-04", day: 2, time: "13:00", title: "井之頭恩賜公園", cat: "sight", lat: 35.6998, lng: 139.5730, transit: "西八王子 ➔ 中央線快速 ➔ 吉祥寺（約 40 分）" },
    { id: "d2-05", day: 2, time: "15:00", title: "Alpen TOKYO 買慢跑鞋", cat: "shop", lat: 35.6905, lng: 139.7020, note: "新宿東口步行 1 分，B2–8F。" },
    { id: "d2-06", day: 2, time: "17:10", title: "(opt) mont-bell 新宿南口店", cat: "shop", lat: 35.6860, lng: 139.7005, note: "限定 T 4 款，包含「都廳とモンタベア」（只有這家有）。10:00–21:00。" },
    { id: "d2-07", day: 2, time: "19:30", title: "うなぎ 魚政", cat: "food", lat: 35.7235, lng: 139.8290, note: "TableCheck 19:30 時段。回程搭京成／淺草線／京急直通品川。", transit: "新宿 ➔ 總武線 ➔ 淺草橋 ➔ 淺草線（京成直通）➔ 四木（約 50 分）", link: "https://tabelog.com/tokyo/A1324/A132403/13035339/" },
    // Day 3
    { id: "d3-01", day: 3, time: "08:40", title: "ほたて日和 現場記帳", cat: "food", lat: 35.69856, lng: 139.77717, note: "平日午餐約 09:00 開放記帳，選 12:00–12:30。", transit: "品川 ➔ 京濱東北線 ➔ 秋葉原" },
    { id: "d3-02", day: 3, time: "09:10", title: "上野恩賜公園", cat: "sight", lat: 35.7148, lng: 139.7730, note: "tenki.jp 11/21：紅葉見頃。" },
    { id: "d3-03", day: 3, time: "10:15", title: "根津神社", cat: "sight", lat: 35.7203, lng: 139.7606, note: "不是紅葉名所，順路看看。" },
    { id: "d3-04", day: 3, time: "10:50", title: "東京大學本鄉 銀杏大道", cat: "sight", lat: 35.7134, lng: 139.7622, note: "彌生門 ➔ 安田講堂 ➔ 三四郎池。赤門整修中。" },
    { id: "d3-05", day: 3, time: "12:15", title: "ほたて日和", cat: "food", lat: 35.69856, lng: 139.77717, link: "https://tabelog.com/tokyo/A1310/A131001/13280086/" },
    { id: "d3-06", day: 3, time: "13:40", title: "新宿御苑", cat: "sight", lat: 35.6852, lng: 139.7100, note: "千駄谷門進，最後入園 16:00，¥500。", transit: "秋葉原 ➔ 總武線 ➔ 千駄谷" },
    { id: "d3-07", day: 3, time: "15:15", title: "明治神宮北門巨木銀杏", cat: "sight", lat: 35.6795, lng: 139.6990, note: "12 月 16:00 關門。" },
    { id: "d3-08", day: 3, time: "16:20", title: "入鹿 TOKYO 六本木", cat: "food", lat: 35.66477, lng: 139.73168, note: "排隊制，LO 19:40，全面無現金。", link: "https://tabelog.com/tokyo/A1307/A130701/13264260/" },
    { id: "d3-09", day: 3, time: "17:45", title: "六本木櫸坂通燈飾＋東京鐵塔", cat: "light", lat: 35.6595, lng: 139.7300, note: "「SNOW & BLUE」17:00–22:00；六本木之丘聖誕市集。" },
    { id: "d3-10", day: 3, time: "19:00", title: "代代木 Forest of Lights 光之森林", cat: "light", lat: 35.6717, lng: 139.6949, note: "預購 19:00 時段，平日 ¥3,200，不賣當日票。", transit: "六本木 ➔ 日比谷線 ➔ 惠比壽 ➔ 山手線 ➔ 原宿" },
    { id: "d3-11", day: 3, time: "20:20", title: "(opt) mont-bell 澀谷店", cat: "shop", lat: 35.6625, lng: 139.6985, note: "限定 T 5 款，全東京最多。營業到 21:00。" },
    // Day 4
    { id: "d4-01", day: 4, time: "07:30", title: "靖國神社 參道銀杏", cat: "sight", lat: 35.6941, lng: 139.7436, transit: "品川 ➔ 東京 ➔ 大手町 ➔ 東西線 ➔ 九段下" },
    { id: "d4-02", day: 4, time: "08:30", title: "北之丸公園（田安門）", cat: "sight", lat: 35.6915, lng: 139.7510 },
    { id: "d4-03", day: 4, time: "09:00", title: "江戶城遺址・皇居東御苑", cat: "sight", lat: 35.6875, lng: 139.7547, note: "天守台、本丸、二之丸庭園。免費，週一、五休。" },
    { id: "d4-04", day: 4, time: "10:50", title: "日比谷公園＋哥吉拉廣場＋發車音樂", cat: "sight", lat: 35.6735, lng: 139.7578, note: "日比谷站日比谷線、千代田線月台播哥吉拉音樂。午餐留白。" },
    { id: "d4-05", day: 4, time: "13:30", title: "增上寺＋芝公園＋東京鐵塔", cat: "sight", lat: 35.6575, lng: 139.7480, note: "增上寺與鐵塔同框。看完回飯店休息。", transit: "日比谷 ➔ 三田線 ➔ 御成門" },
    { id: "d4-06", day: 4, time: "18:00", title: "六義園 夜間特別觀賞", cat: "light", lat: 35.7331, lng: 139.7468, note: "18:00–20:30，預售 ¥1,000（12/1 23:59 前購買）。晚餐留白。", transit: "品川 ➔ 山手線 ➔ 駒込" },
    // Day 5
    { id: "d5-01", day: 5, time: "09:15", title: "名勝 三溪園", cat: "sight", lat: 35.4160, lng: 139.6620, note: "¥900。", transit: "品川 ➔ 京急 ➔ 橫濱 ➔ 巴士 8／148" },
    { id: "d5-02", day: 5, time: "11:10", title: "港之見丘公園 ➔ 山手 ➔ 元町", cat: "sight", lat: 35.4385, lng: 139.6520, note: "午餐留白（中華街）。" },
    { id: "d5-03", day: 5, time: "13:45", title: "山下公園通銀杏", cat: "sight", lat: 35.4460, lng: 139.6505 },
    { id: "d5-04", day: 5, time: "14:30", title: "日本大通銀杏＋橫濱公園", cat: "sight", lat: 35.4455, lng: 139.6440, note: "中區役所 11/19：接近見頃。" },
    { id: "d5-05", day: 5, time: "15:20", title: "橫濱市役所前寶可夢郵筒", cat: "sight", lat: 35.4513, lng: 139.6340, note: "馬車道站 1a 出口。" },
    { id: "d5-06", day: 5, time: "16:00", title: "紅磚倉庫聖誕市集＋寶可夢燈飾 1025", cat: "light", lat: 35.4527, lng: 139.6425, note: "平日入場 ¥500；寶可夢區免費，至 21:00。晚餐留白。" },
    { id: "d5-07", day: 5, time: "19:30", title: "寶可夢中心 YOKOHAMA", cat: "shop", lat: 35.4660, lng: 139.6240, note: "至 20:30。京急回品川。" },
    // Day 6
    { id: "d6-01", day: 6, time: "08:40", title: "飛木稻荷神社", cat: "sight", lat: 35.7141, lng: 139.8154, transit: "品川 ➔ 京急／淺草線直通 ➔ 押上" },
    { id: "d6-02", day: 6, time: "09:10", title: "三囲神社", cat: "sight", lat: 35.7150, lng: 139.8068, note: "三柱鳥居、三越獅子。" },
    { id: "d6-03", day: 6, time: "09:50", title: "隅田公園 ➔ 隅田川步道橋", cat: "sight", lat: 35.7120, lng: 139.8020 },
    { id: "d6-04", day: 6, time: "11:10", title: "とんかつ じゅうろく", cat: "food", lat: 35.71028, lng: 139.79254, note: "11:30 開，約 10 席。", link: "https://tabelog.com/tokyo/A1311/A131102/13276330/" },
    { id: "d6-05", day: 6, time: "13:05", title: "晴空塔城 聖誕市集＋寶可夢中心", cat: "shop", lat: 35.7101, lng: 139.8107 },
    { id: "d6-06", day: 6, time: "16:30", title: "竹燈祭 竹あかり", cat: "light", lat: 35.7105, lng: 139.8045, note: "17:00 點燈，免費。" },
    { id: "d6-07", day: 6, time: "17:30", title: "麺 みつヰ（17:30 領整理券）", cat: "food", lat: 35.7095, lng: 139.7915, link: "https://tabelog.com/tokyo/A1311/A131102/13284327/" },
    { id: "d6-08", day: 6, time: "19:00", title: "日比谷哥吉拉＋復仇者聯盟燈光秀", cat: "light", lat: 35.6738, lng: 139.7595, note: "復仇者聯盟燈光秀每 30 分一場。" },
    { id: "d6-09", day: 6, time: "19:40", title: "丸之內仲通燈飾＋哈利波特聖誕樹", cat: "light", lat: 35.6812, lng: 139.7640, note: "丸大樓 1F，17:00–21:00 每 15 分一場燈光秀。" },
    // Day 7
    { id: "d7-01", day: 7, time: "10:00", title: "Bic Camera 有樂町 買吸頂燈", cat: "shop", lat: 35.6745, lng: 139.7630, note: "B2F 照明區，可免稅。10:40 把燈送回飯店。" },
    { id: "d7-02", day: 7, time: "12:00", title: "琥珀 東京本店", cat: "food", lat: 35.55126, lng: 139.71120, note: "11/29 12:00 預約。只收現金。", link: "https://tabelog.com/tokyo/A1315/A131503/13234195/" },
    { id: "d7-03", day: 7, time: "13:30", title: "小石川後樂園", cat: "sight", lat: 35.7056, lng: 139.7495, note: "¥300。" },
    { id: "d7-04", day: 7, time: "18:00", title: "YOASOBI 東京巨蛋", cat: "light", lat: 35.7056, lng: 139.7519, note: "散場後看東京巨蛋城燈飾；（選）都廳 21:30 寶可夢投影。" },
    // Day 8
    { id: "d8-01", day: 8, time: "07:18", title: "N'EX 5 號 品川 ➔ 成田 T2（08:32 到）", cat: "move", lat: 35.6285, lng: 139.7387, note: "06:55 退房；¥3,330 全車指定席。備案 07:39 N'EX 7 號（08:58 到）。" },
    { id: "d8-02", day: 8, time: "08:32", title: "成田 T2：海關退稅 kiosk ➔ 領現金 ➔ 託運 ➔ 11:25 IT201", cat: "move", lat: 35.7720, lng: 140.3929, note: "吸頂燈要先做海關確認再託運。自助退稅機在 3F 安檢前、G 櫃台旁。" }
  ],

  events: [
    { name: "神宮外苑銀杏點燈", when: "11/21–11/29", hours: "16:30–19:30", fee: "免費", day: "Day 1", src: "https://www.metro.tokyo.lg.jp/information/press/2026/11/2026111301" },
    { name: "都廳投影（寶可夢 TCG／哥吉拉）", when: "週六日、假日", hours: "寶可夢 17:30・19:30；哥吉拉 19:00・21:00", fee: "免費", day: "Day 1（Day 7 選配）", src: "https://tokyoprojectionmappingproject.jp/" },
    { name: "六本木櫸坂通燈飾", when: "11/05–12/25", hours: "17:00–22:00", fee: "免費", day: "Day 3", src: "https://www.christmas.hills-site.com/" },
    { name: "代代木 Forest of Lights", when: "11/13–1/11", hours: "17:30–22:00（最後入場 21:00）", fee: "平日 ¥3,200，只賣預售票", day: "Day 3", src: "https://www.yoyogiforestoflights.tokyo/" },
    { name: "六義園 夜間特別觀賞", when: "11/25–12/06", hours: "18:00–20:30（最後入園 19:30）", fee: "預售 ¥1,000／當日 ¥1,200", day: "Day 4", src: "https://www.tokyo-park.or.jp/park/rikugien/news/2026/rikugiengardens.html" },
    { name: "紅磚倉庫聖誕市集", when: "11/20–12/25", hours: "11:00–21:00（12/5 起至 22:00）", fee: "平日 ¥500", day: "Day 5", src: "https://www.yokohama-akarenga.jp/christmas/" },
    { name: "寶可夢燈飾 1025（紅磚免費區）", when: "11/25–12/25", hours: "11:00–21:00", fee: "免費", day: "Day 5", src: "https://www.pokemon.co.jp/info/2026/11/261113_e01.html" },
    { name: "竹燈祭 東京下町回遊 竹あかり", when: "11/07–1/31", hours: "17:00–22:00", fee: "免費", day: "Day 6", src: "https://www.tobu.co.jp/odekake/special/takeakari/index.html" },
    { name: "復仇者聯盟 HIBIYA Magic Time", when: "11/12–12/25", hours: "16:00–23:00，每 30 分一場燈光秀", fee: "免費", day: "Day 6", src: "https://www.hibiya.tokyo-midtown.com/xmas/" },
    { name: "丸之內 哈利波特聖誕樹", when: "11/12–12/25", hours: "燈光秀 17:00–21:00，每 15 分", fee: "免費", day: "Day 6", src: "https://www.marunouchi.com/lp/brightholiday2026/" },
    { name: "丸之內仲通燈飾", when: "11/12–2/14", hours: "12 月 16:00–24:00", fee: "免費", day: "Day 1・6", src: "https://www.marunouchi.com/pickup/event/11233/" },
    { name: "小石川後樂園 深山紅葉", when: "11/21–12/06", hours: "09:00–17:00", fee: "¥300", day: "Day 7", src: "https://www.tokyo-park.or.jp/park/format/index030.html" }
  ],

  foliage: [
    { spot: "明治神宮外苑", visit: "11/29", status: "見頃 7–8 成（11/20），12/2 起落葉", verdict: "ok" },
    { spot: "高尾山", visit: "11/30", status: "11/18 已見頃", verdict: "warn" },
    { spot: "八王子甲州街道", visit: "11/30", status: "見頃 7–8 成（11/20），12/8 起落葉", verdict: "ok" },
    { spot: "上野恩賜公園", visit: "12/01", status: "紅葉見頃（11/21）", verdict: "ok" },
    { spot: "東京大學本鄉", visit: "12/01", status: "沒有 2026 實測，依周邊推估接近最盛", verdict: "warn" },
    { spot: "六義園", visit: "12/02", status: "預測 12/2 起見頃", verdict: "ok" },
    { spot: "日本大通", visit: "12/03", status: "接近見頃（11/19）", verdict: "ok" },
    { spot: "山下公園通", visit: "12/03", status: "通常 12 月上旬最盛", verdict: "ok" },
    { spot: "小石川後樂園", visit: "12/05", status: "預測 12/1 起見頃", verdict: "ok" }
  ],

  todos: [
    { id: "t1", text: "琥珀：11/29 (日) 12:00 JST 在 TableCheck 搶 12/5 12:00", due: "11/29" },
    { id: "t2", text: "うなぎ 魚政：TableCheck 訂 11/30 19:30", due: "盡快" },
    { id: "t3", text: "代代木光之森林：Lawson Ticket 預購 12/1 19:00 時段", due: "盡快" },
    { id: "t4", text: "六義園夜楓：Asoview 預售 ¥1,000", due: "12/1 23:59" },
    { id: "t5", text: "N'EX：預訂 12/6 07:18 品川發 5 號（¥3,330）", due: "已開賣" },
    { id: "t10", text: "註冊 J-TaxRefund／JPrefund；Alpen 結帳前先問用哪一家退稅業者", due: "購物前" },
    { id: "t6", text: "OMAKASE 註冊，把さわ田、かぶと 加入お気に入り", due: "盡快" },
    { id: "t7", text: "Bic Camera 官網先選好吸頂燈型號", due: "12/5 前" },
    { id: "t8", text: "確認ほたて日和、じゅうろく、晴心 12 月公休", due: "11/28" },
    { id: "t9", text: "MAIKAGURA（選）TableCheck 11/29 11:00 入場枠", due: "11/22 起" }
  ],

  /* seed rows for the Google-Sheet-backed restaurant table */
  restaurants: [
    { name: "宍道湖しじみ中華蕎麦 琥珀 東京本店", type: "拉麵", tabelog: 3.92, tabelogReviews: 2112, google: 4.3, googleReviews: 1013, area: "雜色", closed: "日・假日", reserve: "TableCheck 完全預約", day: "Day 7", url: "https://tabelog.com/tokyo/A1315/A131503/13234195/" },
    { name: "入鹿 TOKYO 六本木", type: "拉麵", tabelog: 3.91, tabelogReviews: 2999, google: 4.0, googleReviews: 1762, area: "六本木", closed: "一", reserve: "排隊", day: "Day 3", url: "https://tabelog.com/tokyo/A1307/A130701/13264260/" },
    { name: "Tokyo Style Noodle ほたて日和", type: "拉麵", tabelog: 3.88, tabelogReviews: 1477, google: 4.2, googleReviews: 566, area: "秋葉原", closed: "三", reserve: "現場記帳", day: "Day 3", url: "https://tabelog.com/tokyo/A1310/A131001/13280086/" },
    { name: "らーめん MAIKAGURA", type: "拉麵", tabelog: 3.86, tabelogReviews: 2144, google: 4.2, googleReviews: 967, area: "千歲船橋", closed: "一", reserve: "排隊／TableCheck 11:00 枠", day: "Day 1", url: "https://tabelog.com/tokyo/A1318/A131813/13218425/" },
    { name: "麺 みつヰ", type: "拉麵", tabelog: 3.82, tabelogReviews: 1629, google: "", googleReviews: "", area: "田原町", closed: "日・一", reserve: "現場整理券", day: "Day 6", url: "https://tabelog.com/tokyo/A1311/A131102/13284327/" },
    { name: "麺や晴心", type: "拉麵", tabelog: 3.75, tabelogReviews: 972, google: 4.2, googleReviews: 312, area: "東中野", closed: "二・三", reserve: "排隊", day: "備案", url: "https://tabelog.com/tokyo/A1321/A132104/13302009/" },
    { name: "とんかつ ここまでやるか。", type: "炸豬排", tabelog: 3.74, tabelogReviews: 884, google: 4.2, googleReviews: 150, area: "外苑前", closed: "三・日", reserve: "Tabelog 線上", day: "備案", url: "https://tabelog.com/tokyo/A1306/A130603/13294363/" },
    { name: "銀座 とんかつ 斉藤", type: "炸豬排", tabelog: 3.60, tabelogReviews: 280, google: 4.7, googleReviews: 535, area: "東銀座", closed: "六・日", reserve: "TableCheck", day: "備案", url: "https://tabelog.com/tokyo/A1301/A130101/13294753/" },
    { name: "かつ吉 新丸ビル店", type: "炸豬排", tabelog: 3.57, tabelogReviews: 1345, google: 4.3, googleReviews: 699, area: "東京站", closed: "無", reserve: "Tabelog／電話", day: "備案", url: "https://tabelog.com/tokyo/A1302/A130201/13038494/" },
    { name: "とんかつ じゅうろく", type: "炸豬排", tabelog: 3.56, tabelogReviews: 231, google: 4.7, googleReviews: 544, area: "淺草", closed: "一＋不定休", reserve: "現場候位", day: "Day 6", url: "https://tabelog.com/tokyo/A1311/A131102/13276330/" },
    { name: "とんかつ にいむら 本店", type: "炸豬排", tabelog: 3.49, tabelogReviews: 987, google: 4.0, googleReviews: 2176, area: "歌舞伎町", closed: "無", reserve: "Tabelog／電話", day: "備案", url: "https://tabelog.com/tokyo/A1304/A130401/13010847/" },
    { name: "とんかつ伊とう 渋谷フクラス店", type: "炸豬排", tabelog: 3.42, tabelogReviews: 140, google: 4.6, googleReviews: 168, area: "澀谷", closed: "無", reserve: "Tabelog／電話", day: "備案", url: "https://tabelog.com/tokyo/A1303/A130301/13295361/" },
    { name: "鮨 さわ田", type: "壽司", tabelog: 4.53, tabelogReviews: 622, google: 4.7, googleReviews: 195, area: "銀座", closed: "一（四・日不定）", reserve: "OMAKASE only", day: "撿取消", url: "https://tabelog.com/tokyo/A1301/A130101/13001043/" },
    { name: "すきやばし次郎 六本木ヒルズ店", type: "壽司", tabelog: 3.68, tabelogReviews: 217, google: 4.0, googleReviews: 504, area: "六本木", closed: "三", reserve: "已訂不到", day: "—", url: "https://tabelog.com/tokyo/A1307/A130701/13004426/" },
    { name: "かぶと", type: "鰻魚", tabelog: 4.43, tabelogReviews: 1427, google: "", googleReviews: "", area: "池袋", closed: "日・四・假日", reserve: "OMAKASE（撿取消）", day: "撿取消", url: "https://tabelog.com/tokyo/A1305/A130501/13016660/" },
    { name: "うなぎ 魚政", type: "鰻魚", tabelog: 4.30, tabelogReviews: 1288, google: "", googleReviews: "", area: "四木", closed: "二・三", reserve: "TableCheck", day: "Day 2", url: "https://tabelog.com/tokyo/A1324/A132403/13035339/" },
    { name: "アロマ珈琲 八重洲店", type: "早餐・咖啡", tabelog: 3.63, tabelogReviews: 1044, google: "", googleReviews: "", area: "八重洲", closed: "1/1", reserve: "不可預約，只收現金", day: "Day 1", url: "https://tabelog.com/tokyo/A1302/A130201/13045029/" }
  ],

  budget: [
    { day: 1, amount: 15500 }, { day: 2, amount: 29600 }, { day: 3, amount: 13900 }, { day: 4, amount: 6700 },
    { day: 5, amount: 12500 }, { day: 6, amount: 7700 }, { day: 7, amount: 31700 }, { day: 8, amount: 8330 }
  ],
  lodging: 198331
};
