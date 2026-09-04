# Lesson Production

Auto mode 由代理依 [automation.md](automation.md) 發送 Prompt、讀取結果、驗證與存記事；本文的「指引使用者」只適用 guided mode。

進入單節 Draft、Review、Revision 或 Final Check 時使用本參考。一次只處理一節。

## 生成前準備

從狀態表取得：

- 單元名稱與檔名
- 學習者起點與本節可觀察成果
- 本節承接的已學內容
- 明確留給後續單元的內容
- 2～6 個必要知識點
- 一個核心案例、資料流或心智模型
- 已 Import 且實際支援本節的來源類型

缺少核心學習成果時，先補課程設計；缺少來源時，回到 Coverage。Draft Prompt 範圍必須嚴格受限於已 Import 的 Sources 與本節學習成果。

## Short Draft Prompt

預設約 250～500 個中文字詞。單元本身複雜時，刪除說明性贅字與重複限制，僅保留本節目標、核心結構與邊界要求。指引使用者在中間「對話 (Chat)」面板底部的對話輸入框貼入（確保左側來源面板中本節所需 Sources 皆已勾選）：

```text
請根據目前 Notebook Sources 製作正式講義：

# {UNIT_CODE} {UNIT_TITLE}
建議檔名：{FILENAME}.md

對象：{AUDIENCE}。
本節承接：{PRIOR_KNOWLEDGE}。
完成後，學習者應能：{LEARNING_OUTCOMES}。

請依序包含：
1. 學習目標
2. {SECTION_2}
3. {SECTION_3}
4. {SECTION_4}
5. {CORE_CASE_OR_FLOW}
6. 常見錯誤與誤解
7. 本節心智模型／重點
8. 5 個理解型自我檢查題
9. 延伸閱讀

核心關係：
{MENTAL_MODEL_OR_ASCII_FLOW}

要求：
- 使用{LANGUAGE}
- 依據目前 Sources 並保留 NotebookLM 原生引用，嚴格錨定既有來源
- 聚焦{PRIMARY_SCOPE}
- 承接既有進度，推進新概念
- 嚴守本節邊界，將進階議題保留至後續單元
- 深度契合{AUDIENCE_LEVEL}，聚焦通用核心原理
```

依單元實際需要調整章節，不必硬保留九項。必要結構應服務學習成果，不以篇幅為目標。

若 NotebookLM 拒絕或無法送出 Prompt：

1. 保留本節名稱、學習成果、核心結構、心智模型與四條關鍵限制。
2. 刪除背景敘述、逐項展開與已存在 Sources 中的內容。
3. 仍過長時先請 NotebookLM 產生 6～10 項講義結構；auto mode 依已核准課綱驗證結構，guided mode 由使用者確認，再要求依該結構寫正式講義。

## Draft 快速檢視

Review 前先確認：

- 回答的確是本節，而非逐篇來源摘要。
- 關鍵技術主張帶有 NotebookLM 引用。
- 必要案例／流程／心智模型存在。
- 沒有明顯越界到後續 Module。
- 內容完整到足以接受正式 Review。

Draft 若有缺頁或不完整，先發出一句補全指令修復，確認結構完整後再進行正式 Review。

## Short Review Prompt

依本節核心技術風險、先備知識與概念邊界，精選 6～12 個具體檢查項目，避免通用空泛條款。指引使用者在中間「對話 (Chat)」面板（延續同一個對話串）底部的對話輸入框貼入：

```text
請審查「{UNIT_CODE} {UNIT_TITLE}」，不要重寫講義。

以{DOMAIN_EXPERT_ROLE}與教材審查者角度檢查：

1. {TECHNICAL_RISK_1}
2. {TECHNICAL_RISK_2}
3. {CONCEPT_BOUNDARY_RISK}
4. 核心案例／資料流是否完整且正確
5. 是否達成本節學習成果並適合{AUDIENCE_LEVEL}
6. 是否與前節明顯重複，或提前深入{LATER_SCOPE}
7. 重要技術主張是否有目前 Sources 支援
8. 是否存在會建立錯誤心智模型的過度簡化

只判定：
- PASS
- Needs Minor Revision
- Needs Major Revision

需要修改時，只列具體、可執行且影響正確性或學習的項目。
僅聚焦於影響技術正確性、學習成果或單元邊界的實質問題。
```

### Review 判讀

- **PASS**：沒有會影響技術正確性、學習成果或課程邊界的問題。
- **Needs Minor Revision**：局部修正即可，不改核心結構與主要論述。
- **Needs Major Revision**：結構、核心心智模型、來源基礎或大部分內容需重做。

若 NotebookLM 給的標籤和清單矛盾，以實際問題嚴重度判讀，並向使用者說明。

## Minor Revision v2 Prompt

把 Review 問題逐條原意轉成最短可執行修改，不加入新的優化願望。

```text
請根據「{UNIT_CODE} {UNIT_TITLE}」v1 產生正式候選版本 v2。

只修正以下項目：
1. {FIX_1}
2. {FIX_2}
3. {FIX_3}

要求：
- 保留已正確內容、原本章節結構與 NotebookLM 引用
- 嚴格限定於 Review 列出之修改項，維持原章節結構與篇幅
- 所有新增敘述均須有目前 Sources 支持
- 使用{LANGUAGE}
```

Review 若為 PASS，不生成內容相同的 v2。Review 若為 Major，先回到下列其中一處：

- 核心主張無來源：Coverage／缺口研究。
- 學習目標與結構不符：重做短版 Draft 規格。
- 大量技術錯誤：核對來源與課程深度後重做 Draft。
- 與其他單元嚴重重複：重畫單元邊界，再重做 Draft。

## Final Check Prompt

```text
請對「{UNIT_CODE} {UNIT_TITLE}」正式候選版進行最終驗收。

只檢查：
1. 上一輪實質修改項目是否完成（若上一輪 PASS，確認沒有未解決問題）
2. 是否引入新的技術錯誤或矛盾
3. 重要主張是否有目前 Sources 支援
4. 是否適合{AUDIENCE_LEVEL}並達成本節學習成果
5. 是否守住與前後單元的內容邊界

只輸出 PASS 或 FAIL。
如果 FAIL，只列出阻止本節定稿的問題。
維持現有講義內容，僅列出阻礙定稿的關鍵問題。
```

## 定稿規則

- Final Check `PASS`：立即停止修訂。指引使用者在該則正式講義回答氣泡下方點擊「儲存至記事 / 儲存為筆記 (Save to note)」（便條紙圖示），講義將保存至右側「工作室 (Studio)」面板的「記事 (Notes)」區。記錄正式檔名與版本。
- Final Check `FAIL`：把每個阻塞問題映射到一個最小修正，修正後只重跑 Final Check。
- 連續兩次 FAIL 且原因相同：停止字句微調；回到 Coverage、單元邊界或 Draft 結構定位根因。
- 品質門檻明確具體：技術正確、來源充分、教學順序合理、邊界清楚、達成本節學習成果。

## 每節完成紀錄

```text
{UNIT_CODE} {UNIT_TITLE}
- Coverage：High／Accepted Medium
- Draft：v1
- Review：PASS／Minor／Major
- 正式版本：v1／v2／其他
- Final Check：PASS
- 已儲存：Yes
- 接受的限制：{NONE_OR_NOTES}
```
