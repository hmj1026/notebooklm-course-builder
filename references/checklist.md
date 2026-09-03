# Course Building Checklists

本文件提供 NotebookLM 課程建置全流程的完整查核清單，供 AI 代理或課程開發者自檢使用。詳細介面三大面板與按鈕操作請對照 [references/notebooklm-ui-guide.md](notebooklm-ui-guide.md)。

---

## 14 階段全流程查核清單

### Phase 1: 解析課程大綱
- [ ] 已取得完整課程大綱與目標受眾設定（可使用 [templates/course-outline-template.md](../templates/course-outline-template.md)）
- [ ] 已釐清先備知識、課程深度與邊界（明確不教的內容）
- [ ] 已識別單元間的順序與核心依賴關係
- [ ] 已輸出精簡的「課程地圖」並經使用者確認

### Phase 2: 規劃 Notebook 與 Source Research Cluster
- [ ] 預設 1 Module 對應 1 本 Notebook（若合併或拆分，已有明確理由）
- [ ] 已將單元依知識主題分群為 Research Cluster（非每節搜一次）
- [ ] 每群已定義研究目標、必要知識點與停止條件
- [ ] 規劃結果已向使用者呈現並獲確認

### Phase 3: 指引建立 Notebook 與大綱 Source
- [ ] 已在 NotebookLM 建立／開啟對應的 Notebook
- [ ] 指引路徑正確：左側「來源」面板 ➔ 點擊 **`+ 新增來源`** ➔ 選擇 **`複製的文字`** 貼入大綱並點擊 **`插入`**
- [ ] 已將 Module 大綱加入為 **Course Outline Source**
- [ ] 使用者已回報來源清單或截圖確認
- [ ] **防呆檢查**：確認 Sources 清單僅保留大綱與核准來源，研究指令嚴格隔離

### Phase 4: 產生 Fast Research Prompt
- [ ] 遵守短版規格（約 150～300 字，僅保留關鍵主題與邊界）
- [ ] 指引路徑正確：左側「來源」面板 ➔ 點擊 **`+ 新增來源`** ➔ 選擇 **`快速研究`** 搜尋框貼入 Prompt
- [ ] 包含必要知識點、來源優先級、排除項與教學目標
- [ ] 一次只針對單一 Research Cluster 進行研究
- [ ] 指引使用者貼入 Fast Research 並「展開查看」候選清單，維持未匯入狀態以供逐項審核

### Phase 5: 互動式審核候選來源
- [ ] 候選清單包含標題、網址／網域與摘要片段（截圖時需逐張判讀）
- [ ] 依「切題性、權威性、證據直接性、新鮮度、教學適配、獨特價值、邊界風險」評估
- [ ] 逐項標記三級決策：`Import` / `可選` / `不要 Import`
- [ ] 每項皆具備具體理由與支援的單元／知識點
- [ ] 指引使用者僅勾選通過項目，點擊視窗右下角 **`匯入 (Import)`** 按鈕加入來源
- [ ] 使用者確認後完成 Import，並更新 Source Ledger

### Phase 6: Coverage Analysis
- [ ] 針對該 Module 所有單元逐一評定：`High` / `Medium` / `Low` / `Missing`
- [ ] 涵蓋度以「能否產出具備來源引用且技術正確的講義」為準（非單純關鍵字提及）
- [ ] 列出已具備之核心知識與實質缺口清單

### Phase 7: 補足 Low/Medium 缺口
- [ ] `High` 單元立即停止搜尋
- [ ] `Medium` 單元評估是否影響核心學習成果（次要缺口可接受並記錄理由）
- [ ] `Low` / `Missing` 單元針對單一缺口發動補強 Fast Research（最多連續補兩輪）
- [ ] 補完來源後重新執行 Coverage Analysis，確認達到可生產標準

### Phase 8: 逐節建立講義 Draft
- [ ] 一次只處理一節講義，依序進行
- [ ] 指引路徑正確：中間「對話」面板底部的 **`對話輸入框`** 貼入短版 Draft Prompt（約 250～500 字）
- [ ] 檢查左側來源清單，確認本節所需來源核取方塊均處於勾選狀態
- [ ] 要求 NotebookLM 僅依據已 Import 之 Sources 撰寫並保留原生引用
- [ ] 使用者貼回講義內容或摘要後進行品質快檢

### Phase 9: 教材 Review
- [ ] 指引路徑正確：於中間「對話」面板（延續同一個對話串）底部的 **`對話輸入框`** 貼入審核指令
- [ ] 產生本節專屬的 Review Prompt（6～12 個具體風險檢查點）
- [ ] 檢查技術正確性、來源支援、教學順序、邊界控制與心智模型
- [ ] 僅給出三種判定之一：`PASS` / `Needs Minor Revision` / `Needs Major Revision`
- [ ] 修改項目僅列具體、可執行且影響學習或正確性之內容（不含文風偏好）

### Phase 10: Minor Revision v2
- [ ] 若判定為 `PASS`，直接保留 v1，不重寫
- [ ] 若判定為 `Needs Minor Revision`，針對問題清單產出 v2（保留原結構與正確內容）
- [ ] 若判定為 `Needs Major Revision`，回到 Draft 規格或補強來源，不偽裝為 minor

### Phase 11: Final Check
- [ ] 驗證前輪修改是否完成且無引入新問題
- [ ] 檢查主要主張是否皆有 NotebookLM 引用支援
- [ ] 僅輸出 `PASS` 或 `FAIL`
- [ ] PASS 後立即定稿：指引使用者點擊回答氣泡下方的 **`儲存至記事 (Save to note)`** 保存至右側工作室面板

### Phase 12: Module 整體驗收
- [ ] Module 內所有單元皆已取得 Final Check `PASS` 且已存入記事區
- [ ] 於中間對話輸入框發送整體 Module Review Prompt，驗收順序、知識斷層、矛盾與心智模型銜接
- [ ] 輸出結果為 `PASS / Needs Revision` 與 `是否可進入下一 Module：YES / NO`
- [ ] 確認達成 `PASS + YES` 後方可推進

### Phase 13: Quiz 與 Study Guide
- [ ] 指引路徑正確：右側工作室面板點擊 **`測驗 (Quiz)`** / **`學習指南 (Study Guide)`** 工具卡片；或對話框生成後點擊 **`儲存至記事`**
- [ ] 依 Module 正式講義與 Sources 生成理解／情境／除錯導向的 Quiz
- [ ] 生成整合關鍵心智模型、常見誤解與複習脈絡的 Study Guide
- [ ] 驗證題目不考死記硬背，且解析具備推理依據

### Phase 14: 封存與推進下一 Module
- [ ] 記錄並封存當前 Module 的成果（單元清單、核准來源、受限說明、Quiz、Study Guide）
- [ ] 輸出下一 Module 的 Notebook 與 Cluster 規劃
- [ ] 使用者確認後回到 Phase 3，循環推進直到整門課程完結

---

## 關鍵防呆守則 (Anti-Patterns to Avoid)

| 禁忌做法 | 正確做法 |
|---|---|
| 一次把所有階段的 Prompt 全部印給使用者 | 嚴格遵守嚮導模式，一次只給一個操作步驟與單一 Prompt |
| 將 Fast Research Prompt 貼為 Notebook Source | 僅大綱與審核過的候選可作為 Source；Prompt 僅輸入搜尋框 |
| 看到大量候選來源直接「全選 Import」 | 逐項審核切題性與權威度，追求「最小充分來源集」 |
| 單元只要有出現名詞就判定為 High Coverage | 必須能支撐完整深入的技術教學與引用才算 High |
| Review 時因文風或個人語氣偏好要求重寫 | 僅針對技術正確性、來源支援、先備斷層與範圍越界提出修改 |
| 每個單元都重新設定一套落落長的空泛審查標準 | 依據當前單元的具體風險挑選 6～12 個核心檢驗點 |
