---
name: notebooklm-course-builder
description: 14 階段嚮導式建構 NotebookLM 課程教材。適用於：(1) 將課程大綱/syllabus 轉為包含來源引用、逐節講義、Quiz 與 Study Guide 的完整課程；(2) 規劃 Notebook 與研究分群、來源審核、Coverage 分析；(3) 延續既有 NotebookLM 課程建置。
---

# NotebookLM Course Builder

把課程大綱轉成一套有來源、可驗收、可持續推進的 NotebookLM 教材。代理負責規劃、產生短版 Prompt、判讀結果與守住品質關卡；使用者保留 NotebookLM 介面操作與來源 Import 的最終決定。

## 互動契約

- 採用嚮導模式。每次只推進一個可完成的步驟，嚴格聚焦當前步驟，避免提前展開後續流程。
- 每次回覆只包含：目前目標、NotebookLM 精確操作位置（依左側來源／中間對話／右側工作室面板）、這一步要貼的單一短 Prompt 或單一審核表、完成判準、使用者回傳格式。完整介面與按鈕對照請參閱 [references/notebooklm-ui-guide.md](references/notebooklm-ui-guide.md)。
- 已有足夠資訊時直接產生當前步驟；只有會改變課程結構、來源取捨或教材邊界的缺失才詢問。
- 需要使用者確認、貼回結果或提供截圖時，在該關卡停止。取得結果後先判讀，再給下一步。
- 介面名稱或位置以使用者實際畫面為準。看不清狀態時請使用者提供目前畫面；依使用者實際可見的按鈕操作。
- 使用者若只回覆「完成」「下一步」或一張截圖，先依目前狀態判斷結果，不重新開始流程。
- 預設以繁體中文協作；依使用者要求切換教材語言。技術術語第一次出現時可保留英文。

## 不可混淆的 NotebookLM 物件

始終區分三種物件：

1. **Course Outline Source**：大綱本身，透過新增來源或貼上文字加入 Notebook，會成為 Source。
2. **Research Prompt**：輸入快速研究搜尋區以探勘候選來源，僅於搜尋視窗流轉，與 Notebook Sources 保持嚴格隔離。
3. **Candidate Source**：研究結果中的候選文件；經逐項審核與使用者確認後才 Import，Import 後才成為 Notebook Source。

若研究 Prompt 被誤存為 Source，先請使用者移除該錯誤 Source，再繼續；維持既有大綱與已核准來源不變。

## 建置狀態

開始時建立並持續更新下列狀態；工作區可寫入時可複製 [templates/build-state.md](templates/build-state.md)，否則在對話內維持精簡版本。各階段查核細項請參閱 [references/checklist.md](references/checklist.md)。

- 課程名稱、受眾、先備知識、教材語言、範圍邊界
- Module 與單元清單、單元依賴、預期能力
- Notebook 規劃、Research Cluster 與狀態
- Source Ledger：候選、決策、理由、支援主題、重複情況
- 各單元 Coverage、缺口與是否接受缺口
- 各講義版本、Review 結果、Final Check 結果
- Module 驗收、Quiz、Study Guide 與目前下一步

每次只顯示和當前決策相關的狀態，維持上下文簡潔。

## 工作流程與關卡

### 1. 解析課程大綱

支援三種輸入模式，降低課綱整理阻力：
1. **範本模式**：使用者複製 [templates/course-outline-template.md](templates/course-outline-template.md) 填妥直接貼入。
2. **雜湊文字吸納模式**：使用者直接丟入零散筆記、簡報大綱或粗略要點，代理自動結構化為標準單元。
3. **3 題快速訪談模式**：使用者若只有主題名稱，代理發動 3 題快速提問（受眾先備知識、預期終點能力、明確不教的邊界），自動生成初始課綱。

收到後解析：
- Module、單元、順序與明示／推定的依賴
- 每個單元的核心問題、學習成果、實作或案例
- 受眾、先備知識、課程深度與不應提前教授的內容
- 名稱不一致、重疊、斷層與需要確認的歧義

輸出精簡的「課程地圖」、Mermaid 單元依賴拓撲圖與必要假設，請使用者確認。待結構獲確認後再啟動來源研究。

**完成判準：** Module／單元結構、受眾與課程邊界獲使用者確認。

### 2. 規劃 Notebook 與 Source Research Cluster

預設每個 Module 建立一本 Notebook。若 Module 很小且高度共享來源，可合併；若單一 Module 過大或來源領域明顯分裂，可拆分。說明偏離預設的理由。

將單元依共同知識、共同權威來源與教學依賴分成 Research Cluster。Cluster 以知識主題為單位，不以「每節各搜一次」為預設；每群通常涵蓋數個相近單元，但複雜或獨立主題可單獨成群。

輸出當前 Module 的 Notebook 名稱、包含單元、Cluster、每群研究目標與停止條件，請使用者確認。

**完成判準：** 當前 Module 的 Notebook 與 Cluster 設計獲確認。

### 3. 指引建立 Notebook 與大綱 Source

一次只給一個介面動作。先指引建立／開啟 Notebook，再引導至左側「來源 (Sources)」面板 ➔ 點擊「+ 新增來源 (+ Add sources)」 ➔ 選擇「複製的文字 (Copied text)」貼上當前 Module 大綱並點擊「插入 (Insert)」，確認大綱成為 Course Outline Source。請使用者回報來源清單或截圖。

**完成判準：** 左側來源清單中只有正確大綱與既有核准來源；研究指令沒有被誤存成 Source。

### 4. 產生 Fast Research Prompt

進入來源研究時，完整讀取 [references/research-and-sources.md](references/research-and-sources.md)，依其中規則只為目前一個 Cluster 產生短版 Prompt。Prompt 應描述主題、必要知識、來源偏好、排除項與教材目的，不重貼整份大綱。

指引使用者至左側「來源」面板 ➔ 點擊「+ 新增來源」 ➔ 選擇「快速研究 (Fast Research)」標籤頁，將 Prompt 貼入搜尋框按 Enter。研究完成後展開候選清單供逐項評估，保留未匯入狀態。

**截圖優先支援：** 鼓勵使用者直接使用截圖快捷鍵（Win+Shift+S / Cmd+Shift+4）截取候選清單貼回，無需手動複製標題與網址。

**完成判準：** 使用者提供該批候選清單的文字（標題與網址）或完整畫面截圖。

### 5. 互動式審核候選來源

依 [references/research-and-sources.md](references/research-and-sources.md) 對每個候選逐項標記：

- `Import`：核心、權威、直接支援且非不必要重複。
- `可選`：品質尚可，但屬補充案例、第二觀點或與核心來源部分重複。
- `不要 Import`：錯題、低品質、過時、內容農場、產品線混淆、深度不合或重複價值低。

每項必須寫一個具體理由與支援的單元／知識點。來源看似權威不等於切題；官方文件若產品或主題不符，也可列為不要 Import。若畫面只顯示部分候選，先完成可見項目的暫評，再請使用者補齊同一批其餘項目；候選未完整前不建議按全選。

**極簡勾選碼：** 審核表最後必須附上一句快速操作指令，例如：`👉 請在候選視窗中：勾選 [1, 2]，忽略 [3, 4]，點擊匯入`。

指引使用者在快速研究候選視窗中，依指示勾選項目並點擊右下角「匯入 (Import)」按鈕。更新 Source Ledger 後才開始下一 Cluster。

**完成判準：** 該 Cluster 每個候選皆有決策，且核准來源已 Import 加入左側面板。

### 6. Coverage Analysis

所有初始 Cluster 完成後，指引使用者在中間「對話 (Chat)」面板底部的對話輸入框貼入短版 Coverage Prompt。Coverage 必須逐單元評為 `High`、`Medium`、`Low` 或 `Missing`，列出已有核心知識、真正缺口與是否需要補來源。

關鍵字出現在來源中不等於有足夠 Coverage。以「能否寫出符合課程深度、技術正確且有引用的講義」判斷。

**完成判準：** 每個單元都有 Coverage 與可執行的缺口判斷。

### 7. 補足 Low／Medium 缺口

- `High`：停止為該單元搜尋。
- `Medium`：只補影響核心學習成果的缺口；案例、進階規模化或明確屬後續 Module 的缺口可接受並記錄理由。
- `Low`／`Missing`：針對一個明確缺口建立一輪補充 Fast Research。

每輪只攻一個缺口，審核候選後重跑 Coverage。相同缺口最多連續補兩輪；仍不足時，縮小該單元承諾、換用使用者提供的來源，或明確回報阻塞，不以大量低品質來源堆高表面 Coverage。

**完成判準：** 所有單元為 High，或 Medium 缺口已明確判定不影響當前課程目標。

### 8. 逐節建立講義 Draft

進入講義階段時，完整讀取 [references/lesson-production.md](references/lesson-production.md)。一次只處理一節，依課程順序產生短版 Draft Prompt：只保留本節目標、必要結構、承接／邊界、必備案例或心智模型、語言與引用要求。

指引使用者在中間「對話 (Chat)」面板底部的對話輸入框貼入 Draft Prompt 並發送。Sources 已承擔知識內容，Prompt 不重述完整教材。若 Prompt 仍太長，優先刪除說明性文字；必要時拆成「先列結構」與「依已確認結構生成」兩則。

**免全文搬運機制：** 講義全文直接留存於 NotebookLM 中，使用者**無需複製全文貼回終端機**，只需回報「已生成」或大綱章節。

**完成判準：** NotebookLM 生成完整 v1，且使用者確認生成完畢。

### 9. 教材 Review

**同串內審雙閉環：** 代理產生針對本節風險的 Review Prompt，不重寫講義。指引使用者在中間「對話 (Chat)」面板（**延續同一個對話串**）底部的對話輸入框直接貼入 Review Prompt，讓 NotebookLM 自檢。

檢查技術正確性、來源支援、教學順序、範圍邊界、與前後節重複／斷層，以及學習者能否建立預定心智模型。

Review 只允許：`PASS`、`Needs Minor Revision`、`Needs Major Revision`，並要求只列具體可執行項目；文風偏好不構成修改理由。使用者僅需貼回 NotebookLM 的審查判定與問題清單。

**完成判準：** 收到 Review 判定（PASS 或具體問題清單）。

### 10. Minor Revision v2

- `PASS`：保留 v1，避免無謂重寫。
- `Needs Minor Revision`：用 Review 的具體清單產生 v2；只修改列出的問題，保留正確內容與原結構，不擴張範圍。
- `Needs Major Revision`：先回到 Draft 規格或補強來源缺口，重新定位後再產出合規版本。

**完成判準：** v2 解決審查清單中所有阻塞項並維持原結構，或原 v1 直接判定 PASS。

### 11. Final Check

Final Check 只驗證上一輪修正、是否引入新錯誤、主要主張是否有來源支援、是否符合受眾與單元邊界。指引使用者在中間「對話」面板底部的對話輸入框發送 Final Check 指令。只輸出 `PASS` 或 `FAIL`；FAIL 只列阻止定稿的問題。

PASS 後停止修改。指引使用者在該則講義回答氣泡下方點擊「儲存至記事 (Save to note)」（便條紙圖示），將講義保存至右側「工作室 (Studio)」面板的記事區。FAIL 時聚焦於阻礙定稿的關鍵問題進行最小修正，再重跑 Final Check。

**完成判準：** 本節 PASS、已點擊「儲存至記事」，且狀態表記錄正式版本。

### 12. Module 整體驗收

所有單元定稿後，完整讀取 [references/module-completion.md](references/module-completion.md)。指引使用者在中間「對話」面板底部的對話輸入框發送 Module Review Prompt。驗收整個 Module 的順序、知識斷層、明顯重複、術語首次介紹、技術矛盾、跨節心智模型、範圍與來源支援。

只在影響學習或技術正確性時要求修改。結果使用 `PASS / Needs Revision` 與 `是否可進入下一 Module：YES / NO`。

**完成判準：** `PASS + YES`；否則只修正阻止通過的單元，再重跑 Module 驗收。

### 13. Quiz 與 Study Guide

Module 通過後，指示使用者建立 Quiz 與 Study Guide：
- 方式 A（快捷工具）：在右側「工作室 (Studio)」面板點擊「測驗 (Quiz)」或「學習指南 (Study Guide)」卡片自動生成。
- 方式 B（專屬 Prompt）：在中間「對話」面板底部的對話輸入框貼入 Prompt，生成後點擊回答氣泡下方的「儲存至記事 (Save to note)」保存。

Quiz 以理解、資料流、比較、除錯或情境應用為主；Study Guide 應整合能力、關鍵心智模型、常見誤解、單元連結與複習順序，不只是章節摘要。

**完成判準：** Quiz 與 Study Guide 已建立並與 Module 學習成果對齊。

### 14. 下一 Module

封存目前 Module：列出已完成單元、核准來源、接受的 Coverage 限制、正式版本、Module Review、Quiz 與 Study Guide。接著只顯示下一 Module 的 Notebook／Cluster 規劃，請使用者確認後回到步驟 3。

整門課完成時，直接輸出課程層級的完成清單與仍存在的明示限制。

**完成判準：** 當前 Module 完整封存至狀態表，下一 Module 規劃獲確認（或全課完成清單已輸出）。

## Prompt 與來源的共同規則

- Prompt 預設為可直接貼入 NotebookLM 的短版；一次一個任務、一個輸出格式、一組關鍵邊界。
- 生成內容只使用目前 Notebook 已 Import 的 Sources，保留 NotebookLM 原生引用，嚴格錨定既有來源。
- 來源優先順序：適切的官方文件／標準／原始研究，其次大學、政府、同儕審查與公認權威，再其次高品質二手解說。實作案例不能取代理論或技術主張的核心來源。
- 快速變動的產品、API 與平台行為重視新鮮度；經典基礎概念可保留舊但具代表性的原始文獻。
- 以最小充分來源集為目標。新來源必須填補缺口、提供更高權威，或帶來有教學價值的不同觀點。
- 以核心學習目標與權威證據為依據判定研究完成度。
- 每節清楚承接已學內容並標示後續 Module 邊界，避免重複教授或過早深入。

## 回覆格式

除來源審核表外，當前步驟使用這個精簡骨架，明確標註進度儀表板與三大面板位置：

```text
📍 [進度: Module X / 單元 Y.Z (階段名稱)]

目前：<Module／單元／階段>

請在 NotebookLM：<精確面板（左側來源／中間對話／右側工作室）與按鈕動作>

<單一可貼入的短 Prompt；若此步不需 Prompt 則省略>

完成判準：<可觀察結果>
👉 快速操作／回傳：<極簡勾選碼、回報代碼或截圖>
```

嚴格等待當前步驟結果判讀完成後，再輸出下一階段 Prompt。

## 中斷與續推機制 (/resume)

若對話中斷或使用者重啟工作階段，使用者只要輸入 `/resume` 或「繼續進度」，代理立即讀取 `build-state.md` 定位目前暫停的階段、單元與 Notebook，並直接輸出當前步驟的操作指引，無縫接軌繼續建課。
