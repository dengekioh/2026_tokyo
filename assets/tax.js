/* Japan refund-type tax-free system (from 2026-11-01) + N'EX — researched 2026-11-21, re-checked 2026-11-25 */
window.TAX = {
  html: `
  <p class="lede">2026/11/01 起，日本退稅改成「先付含稅價，出境時海關確認後再退」。以下整理官方規定與成田 T2 的實際流程，並依你的條件（不用 Global Blue、不提供信用卡資料、拿到最多現金）排序。</p>

  <figure class="tax-fig" id="taxFig">
    <img src="assets/tax-infographic.png?v=1" alt="成田機場退稅領現金：必備條件與各退稅公司領現方式" loading="lazy" onerror="this.closest('figure').hidden=true">
    <figcaption class="small muted">圖：成田 T2 退稅領現金總整理（11/25 查證後重畫）</figcaption>
  </figure>

  <div class="grid3">
    <div class="stat"><div class="k">結帳時</div><div class="v" style="font-size:17px">付含 10% 稅的全額</div><div class="small muted">出示護照，拿退稅收據或 QR code</div></div>
    <div class="stat"><div class="k">出境時</div><div class="v" style="font-size:17px">海關確認商品出境</div><div class="small muted">購買後 90 天內</div></div>
    <div class="stat"><div class="k">之後</div><div class="v" style="font-size:17px">退稅業者退錢</div><div class="small muted">現金、信用卡、Alipay 等，看店家用哪一家</div></div>
  </div>

  <div class="panel" style="margin-top:16px">
    <h3 style="font-size:16px;margin-bottom:8px">規則重點</h3>
    <ul style="margin:0;padding-left:20px">
      <li>門檻：<b>同一家店、同一天，未稅滿 ¥5,000</b>。吸頂燈（約 ¥18,182 未稅）、慢跑鞋（約 ¥16,364 未稅）都有達到。</li>
      <li>取消了「一般物品／消耗品」分類、消耗品 ¥50 萬上限和特殊包裝。</li>
      <li>海關是<b>一張收據一起確認</b>：同一張收據上只要有一件商品沒帶走或已使用，整張都不退。</li>
      <li>一人一本護照，各自操作 kiosk 和退稅。</li>
      <li><b>在店裡付款前先問：用哪一家退稅業者？能不能在機場領現金？</b></li>
    </ul>
    <p class="small muted" style="margin-top:8px">來源：<a href="https://www.mlit.go.jp/kankocho/tax-free/page01_000001_00028.html" target="_blank" rel="noopener">觀光廳</a>・<a href="https://www.mof.go.jp/tax_policy/publication/brochure/zeisei2025/03.html" target="_blank" rel="noopener">財務省 2025 稅改</a>・<a href="https://www.customs.go.jp/kaigairyoko/taxrefund_e.html" target="_blank" rel="noopener">日本海關</a></p>
  </div>

  <div class="panel" style="margin-top:16px;border-left:5px solid var(--accent)">
    <h3 style="font-size:16px;margin-bottom:8px">成田 T2 流程（吸頂燈最重要）</h3>
    <ol style="margin:0;padding-left:20px">
      <li>到 3F 出境大廳，<b>先不要託運</b>。帶護照和所有免稅品；燈可以放在行李箱裡，但箱子要能打開。</li>
      <li>做海關確認，二選一：
        <ul>
          <li><b>海關退稅 kiosk</b>：在大廳最尾端、A 櫃台附近，05:30–23:00。</li>
          <li><b>Visit Japan Web</b>：連免費 Wi-Fi（SSID <span class="mono">Customs_WiFi_For_TaxRefund</span>，密碼 <span class="mono">jcustoms</span>）。只能在安檢前用，護照要先登錄。</li>
        </ul>
      </li>
      <li>畫面<b>綠色</b>就完成；<b>紅色</b>要到 kiosk 旁的檢查區給海關看商品。所以燈<b>不能先託運</b>。</li>
      <li>如果顯示「未判定」，等幾分鐘再試一次。</li>
      <li>確認完成 ➔ 去自助退稅機領現金 ➔ 虎航櫃台託運 ➔ 安檢。</li>
    </ol>
    <div class="note warn" style="margin-top:10px">成田機場官方說明：商品如果在海關確認前就託運，行李拿不回來，也不能退稅。過了安檢之後也不能再做確認。</div>
    <p class="small muted" style="margin-top:8px">來源：<a href="https://www.narita-airport.jp/en/service/exchange/taxrefund/" target="_blank" rel="noopener">成田機場退稅說明</a></p>
  </div>

  <h3 style="font-size:17px;margin:22px 0 10px">不用信用卡的退稅方式（拿到的現金由多到少）</h3>
  <ol class="rank">
    <li><b>J-TaxRefund 或 JPrefund ➔ 成田 T2 自助退稅機（Self Tax Refund，Glory）領日圓現金</b>
      <div class="small" style="margin-top:4px">位置：本館 3F，<b>安檢前</b>，G 櫃台旁，06:00–24:00（成田官方）。支援 J-TaxRefund、JPrefund、Planet、AddSmart、LINKTIVITY、InTaxFree（第三方整理，官方沒列名單）。每張收據約 1 分鐘。</div>
      <div class="small" style="margin-top:4px">⚠️ Glory 官方新聞稿寫的第一步是「<b>在店裡結帳時就選現金退款</b>」。結帳時記得說要「空港で現金」。</div>
      <div class="small muted">試算 ¥20,000 吸頂燈：稅 ¥1,818，扣掉現金手續費（約 1.1%，網友實測，未證實）≈ <b>拿回約 ¥1,600</b>。<b>不用 Global Blue，也不用給卡號。</b></div>
    </li>
    <li><b>Cash Japan 現金機（出境審查之後）</b>
      <div class="small muted" style="margin-top:4px"><b>更正（11/25）</b>：成田官方寫 Cash Japan 在 T2 本館 3F 和衛星廳 3F 的<b>出國後區域</b>，24 小時；原本寫的「3F 06:00–23:00」只出現在第三方網站。可處理 Global Blue、J-TaxRefund、JPrefund（Smart Detax）等。手續費有報導說 10%（未證實）。⚠️ <b>Cash Japan 是 Global Blue 設立的</b>，想完全避開就用上一個方式。</div>
    </li>
    <li><b>Alipay／WeChat Pay</b>
      <div class="small muted" style="margin-top:4px">不用卡號，但要有能收款的 Alipay 或微信帳戶，大多數台灣人沒有。手續費依業者而定。</div>
    </li>
    <li class="out"><b>銀行轉帳（實際上不適用）</b>
      <div class="small muted" style="margin-top:4px">J-TaxRefund 要 ¥100,000 以上才能轉帳，而且是匯美元；JPrefund 需要 Wise 帳戶。</div>
    </li>
    <li class="out"><b>Global Blue（你排除的）</b>
      <div class="small muted" style="margin-top:4px">不採用。</div>
    </li>
  </ol>

  <div class="grid2" style="margin-top:16px">
    <div class="panel">
      <h3 style="font-size:16px;margin-bottom:8px">兩家「J」開頭的業者</h3>
      <dl class="kv">
        <dt>JPrefund</dt><dd>Smart Technologies &amp; Resources（SmartDetax）。在 jprefund.com 登錄，用收據 QR code 或 20 碼交易編號加入每筆購物，<b>出發前</b>選「Cash at Airport」（官方原文）。期限：購買日起 200 天。（人臉確認、每趟 ¥100,000 上限只有第三方說法，未證實）</dd>
        <dt>J-TaxRefund</dt><dd>J&amp;J Tax Free。網站 j-taxrefund.com（官網只顯示登入頁，細節讀不到）。180 天內要用收據 QR 登記（唐吉訶德官方說明）；「海關確認後再選退款方式」只有第三方說法。Self Tax Refund 機和 Cash Japan 都能領現金。</dd>
      </dl>
      <p class="small muted" style="margin-top:8px">來源：<a href="https://jprefund.com/landing" target="_blank" rel="noopener">JPrefund</a>・<a href="https://www.donki.com/en/tax_free" target="_blank" rel="noopener">唐吉訶德（PPIH）</a>・<a href="https://tokyo-haneda.com/site_resource/whats_new/pdf/000017830.pdf" target="_blank" rel="noopener">Glory 新聞稿</a>・<a href="https://livejapan.com/en/article-a0006097/" target="_blank" rel="noopener">LiveJapan（第三方）</a></p>
    </div>
    <div class="panel">
      <h3 style="font-size:16px;margin-bottom:8px">社群圖卡 vs 查證（11/25）</h3>
      <dl class="kv">
        <dt>Global Blue</dt><dd>Cash Japan 領現金 <span class="tag t-ok">一致</span>；「不用註冊、不用 QR」<span class="tag t-warn">未證實</span></dd>
        <dt>J-TaxRefund</dt><dd>Self Tax Refund＋Cash Japan 都能領 <span class="tag t-ok">一致</span>；「不用註冊」<span class="tag t-stop">可能不對</span>：唐吉訶德要求 180 天內掃收據 QR 登記，Glory 要在店裡先選現金</dd>
        <dt>JPrefund</dt><dd>要登記 QR 並選「機場領現金」<span class="tag t-ok">一致</span>（官方：出發前選）；另外 Self Tax Refund 機也支援（第三方）</dd>
        <dt>PIE VAT</dt><dd>不能在機場領現金 <span class="tag t-warn">只有第三方</span></dd>
        <dt>兩個條件</dt><dd>結帳出示護照＋check-in 前做海關確認 <span class="tag t-ok">一致</span></dd>
      </dl>
    </div>
  </div>


  <div class="panel" style="margin-top:16px">
    <h3 style="font-size:16px;margin-bottom:4px">這趟會去的店：退稅方式（11/25 查證）</h3>
    <p class="small muted" style="margin-bottom:8px">【官】＝店家或業者官方；【三】＝媒體、部落格。業者不明的店，結帳前問：<b>「免税の返金は空港で現金で受け取れますか？どの返金会社ですか？」</b></p>
    <div class="tbl-wrap"><table class="dt cards">
      <tr><th>店</th><th>誰・哪天</th><th>退稅業者</th><th>機場現金</th><th>注意</th></tr>
      <tr><td class="name">Bic Camera 有樂町</td><td data-l="誰・哪天">Charles・12/5</td><td data-l="業者">J-TaxRefund【三】</td><td data-l="機場現金"><span class="tag t-ok">可以</span></td><td data-l="注意">店家免收申請費；機場窗口手續費會從退款扣除【三】</td></tr>
      <tr><td class="name">Alpen TOKYO 新宿</td><td data-l="誰・哪天">Charles 11/30・Cris 12/2</td><td data-l="業者">查不到</td><td data-l="機場現金"><span class="tag t-warn">未確認</span></td><td data-l="注意">結帳前用上面那句日文問</td></tr>
      <tr><td class="name">新宿高島屋</td><td data-l="誰・哪天">Cris・12/2</td><td data-l="業者">官方未寫名（第三方說 Global Blue）</td><td data-l="機場現金"><span class="tag t-stop">不行</span></td><td data-l="注意"><b>購物當天要到 11F 免稅櫃台（11:00–19:30）出示本人信用卡</b>；只能退信用卡、支付寶、微信；手續費 <b>23%</b>【官】。<b>建議不要在這裡辦退稅</b></td></tr>
      <tr><td class="name">無印良品 東京有明</td><td data-l="誰・哪天">Cris・12/2</td><td data-l="業者">查不到（官網 11/11 起維護中）</td><td data-l="機場現金"><span class="tag t-warn">未確認</span></td><td data-l="注意">結帳前問</td></tr>
      <tr><td class="name">UNIQLO 銀座</td><td data-l="誰・哪天">Cris・12/5 晚上</td><td data-l="業者">J-TaxRefund【三】</td><td data-l="機場現金"><span class="tag t-warn">未確認</span></td><td data-l="注意">官方 FAQ 擋爬蟲讀不到；結帳前問</td></tr>
      <tr><td class="name">マツモトキヨシ 銀座みゆきAve.</td><td data-l="誰・哪天">Cris・12/5 晚上</td><td data-l="業者">查不到</td><td data-l="機場現金"><span class="tag t-warn">未確認</span></td><td data-l="注意">結帳前問</td></tr>
      <tr><td class="name">（備案）唐吉訶德 銀座本館</td><td data-l="誰・哪天">Cris・12/5</td><td data-l="業者">J-TaxRefund【三】</td><td data-l="機場現金"><span class="tag t-ok">可以</span></td><td data-l="注意">180 天內要用收據 QR 到 PPIH 網站登記，用別家網站登記會退不到【官】；24 小時營業</td></tr>
      <tr><td class="name">（備案）ココカラファイン 銀座4丁目</td><td data-l="誰・哪天">Cris・12/5</td><td data-l="業者">第三方說 J-TaxRefund</td><td data-l="機場現金"><span class="tag t-warn">未確認</span></td><td data-l="注意">08:00–23:00（週末 09:00 起）【官】</td></tr>
    </table></div>
    <p class="small muted" style="margin-top:8px">來源：<a href="https://www.takashimaya.co.jp/store/special/tax_refund_procedure/index_cn.html" target="_blank" rel="noopener">高島屋退稅說明</a>・<a href="https://www.donki.com/en/tax_free" target="_blank" rel="noopener">唐吉訶德</a>・<a href="https://www.matsukiyococokara-online.com/map?kid=20002260" target="_blank" rel="noopener">ココカラファイン</a>・<a href="https://www.narita-airport.jp/ja/service/exchange/taxrefund/" target="_blank" rel="noopener">成田機場</a></p>
  </div>

  <div class="panel" style="margin-top:16px">
    <h3 style="font-size:16px;margin-bottom:8px">12/6 時間規劃</h3>
    <p>N'EX 5 號 <b>07:18</b> 品川 ➔ <b>08:32</b> 成田 T2 ➔ 海關 kiosk ➔ 自助退稅機領現金 ➔ 虎航櫃台託運 ➔ 安檢 ➔ <b>11:25 IT201</b>。到機場時距離起飛約 2 小時 53 分。</p>
  </div>`,

  nex: `
    <div class="note warn" style="margin-bottom:10px"><b>更正：</b>12/6 是週日，要看週六日、假日時刻表。原本寫的 07:08、07:42 那天沒有這兩班，車資也改成 <b>¥3,330</b>（車資 ¥1,600＋特急費 ¥1,730）。</div>
    <div class="tbl-wrap"><table class="dt">
      <tr><th>車次</th><th>品川發</th><th>成田 T2（空港第 2 ビル）到</th><th></th></tr>
      <tr><td>N'EX 3 號</td><td class="mono">06:47</td><td class="mono">07:54</td><td></td></tr>
      <tr><td><b>N'EX 5 號</b></td><td class="mono"><b>07:18</b></td><td class="mono"><b>08:32</b></td><td><span class="tag t-accent">建議</span></td></tr>
      <tr><td>N'EX 7 號</td><td class="mono">07:39</td><td class="mono">08:58</td><td><span class="tag t-move">備案</span></td></tr>
      <tr><td>N'EX 9 號</td><td class="mono">08:19</td><td class="mono">09:25</td><td><span class="tag t-stop">太晚</span></td></tr>
    </table></div>
    <ul style="margin:10px 0 0;padding-left:20px">
      <li><b>全車指定席，一定要先買票</b>。12/6 的位子乘車前一個月 10:00 就開賣了，現在已經可以訂。</li>
      <li>週日早上應該不會賣完，但建議提早幾天訂。</li>
      <li>訂法：eki-net／JR-EAST Train Reservation 訂無票券（ticketless）再刷 Suica 進站，或在品川站的指定席售票機買。</li>
      <li><b>沒有單程折扣</b>：eki-net 的 N'EX 折扣票只賣到 9/30 乘車。外國護照可以買「N'EX 東京來回票」¥5,200，但你去程是羽田進來，只需要單程，買 ¥3,330 比較划算。</li>
      <li>出發前一天再查一次 JR 東日本的運行資訊。</li>
    </ul>
    <p class="small muted" style="margin-top:8px">來源：<a href="https://timetables.jreast.co.jp/2612/timetable-v/023d2.html" target="_blank" rel="noopener">JR 東日本 N'EX 時刻表（週六日假日）</a>・<a href="https://jr-group.jp/nex-ryokin/" target="_blank" rel="noopener">N'EX 票價</a></p>`
};
