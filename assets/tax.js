/* Japan refund-type tax-free system (from 2026-11-01) + N'EX — researched 2026-11-21 */
window.TAX = {
  html: `
  <p class="lede">2026/11/01 起，日本退稅改成「先付含稅價，出境時海關確認後再退」。以下整理官方規定與成田 T2 的實際流程，並依你的條件（不用 Global Blue、不提供信用卡資料、拿到最多現金）排序。</p>

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
      <div class="small" style="margin-top:4px">位置：本館 3F，<b>安檢前</b>，G 櫃台旁（過了 G9/G10），06:00–24:00。支援 J-TaxRefund、JPrefund、Planet、AddSmart、LINKTIVITY、InTaxFree。每張收據約 1 分鐘，最少 ¥100。</div>
      <div class="small muted">試算 ¥20,000 吸頂燈：稅 ¥1,818，扣掉約 1.1% 的現金手續費（網友實測，未證實）≈ <b>拿回約 ¥1,600</b>。<b>不用 Global Blue，也不用給卡號。</b></div>
    </li>
    <li><b>同樣的業者 ➔ Cash Japan 櫃台領現金</b>
      <div class="small muted" style="margin-top:4px">3F，櫃台 06:00–23:00。金額可能差不多或略少（有報導說手續費是退稅額的 10%，未證實）。⚠️ <b>Cash Japan 是 Global Blue 旗下</b>，你想完全避開的話就不要用。</div>
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
        <dt>JPrefund</dt><dd>Smart Technologies &amp; Resources（SmartDetax）。在 jprefund.com 登錄護照（會做人臉確認），用 QR code 或 20 碼交易編號加入每筆購物。<b>機場現金要在海關確認之前就選好</b>，每趟上限約 ¥100,000。</dd>
        <dt>J-TaxRefund</dt><dd>J&amp;J Tax Free。只有網站 j-taxrefund.com，沒有 app。要登錄 email 和護照照片；退款方式可以在海關確認之後再選，180 天內要完成。</dd>
      </dl>
      <p class="small muted" style="margin-top:8px">⚠️ 這兩家的細節來自第三方整理，官網無法直接讀取。</p>
    </div>
    <div class="panel">
      <h3 style="font-size:16px;margin-bottom:8px">你要買的兩家店</h3>
      <dl class="kv">
        <dt>Bic Camera</dt><dd>媒體報導用 <b>J-TaxRefund</b>（未經 Bic 官方證實）。Bic 負擔退稅手續費（¥0，可能隨時結束）；但選機場現金時，櫃台手續費還是會扣（網友實測約 1.1%）。</dd>
        <dt>Alpen TOKYO</dt><dd>查不到用哪一家。<b>結帳前問清楚</b>，或看收據上的 QR code。</dd>
      </dl>
      <div class="note" style="margin-top:10px">如果信用卡退款：Bic 的 ¥0 方案可以全額退 ¥1,818，只扣台灣信用卡的海外交易手續費。只是你不想提供卡號。</div>
    </div>
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
