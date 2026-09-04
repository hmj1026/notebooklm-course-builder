# Module Completion

Auto mode 由代理依 [automation.md](automation.md) 操作並讀取結果；Module Review 通過後必須先進入 Module Finalization Gate，核准後才產生 Quiz、Study Guide 與封存結果。本文的「指引使用者」只適用 guided mode。

當一個 Module 的所有單元已通過 Final Check 並儲存時使用本參考。

## 驗收前提

確認：

- 每節都有正式版本與 `PASS`。
- 所有單元已按課程順序命名。
- Source Ledger 能指出關鍵主張由哪些來源支援。
- Accepted Medium 的限制已記錄，不會被誤寫成已完整涵蓋。

缺少任何一項時，先補齊該項，不開始 Module Review。

## Module Review Prompt

單元不多時列出全部；單元很多時列出代碼與一句核心成果，不重貼講義內容。指引使用者在中間「對話 (Chat)」面板底部的對話輸入框貼入下方 Prompt 並發送：

```text
請對「{MODULE_NAME}」的正式講義進行整體課程驗收。

包含：
- {UNIT_1}
- {UNIT_2}
- {UNIT_3}

不要重新撰寫講義。請從完整 Module 檢查：

1. 學習順序與先備關係是否合理
2. 是否有影響理解的重要知識斷層
3. 是否有需要處理的明顯重複
4. 專有名詞是否在合理時機首次介紹
5. 跨單元是否存在技術矛盾
6. 心智模型是否依序建立：{MENTAL_MODEL_PROGRESSION}
7. 是否有內容應延後到後續 Module
8. 學習者是否已具備進入「{NEXT_MODULE}」的必要能力
9. 重要技術主張是否有目前 Sources 支援

輸出：

## Module 驗收結果
PASS / Needs Revision

## 知識銜接
只列真正問題。

## 重複或矛盾
只列需要處理的項目。

## 應延後內容
列出單元與原因。

## 完成後應具備的能力
列出 5～8 項。

## 是否可以進入下一 Module
YES / NO

不要因文風、排版或措辭提出修改。
除非會影響學習或技術正確性，否則判定 PASS。
```

## 驗收判讀與修正

- `PASS + YES`：封存 Module，進入 Quiz／Study Guide。
- `Needs Revision + NO`：只修阻止通過的單元或跨節銜接，再重跑 Module Review。
- `Needs Revision + YES`：判斷是否為非阻塞建議；若只屬文風或可選延伸，記錄但不重開講義。
- `PASS + NO`：結果自相矛盾。要求 NotebookLM 只說明阻止進入下一 Module 的實質能力缺口，再判讀。

Module Review 修正僅限於跨單元銜接與阻止通過的關鍵章節，避免全面改寫無問題之單元。

## Quiz 規格

指引使用者選擇以下任一種方式產出測驗：
- 方式 A（快捷工具）：在右側「工作室 (Studio)」面板點擊 **`測驗 (Quiz)`** 工具卡片生成。
- 方式 B（專屬 Prompt）：在中間「對話」面板底部的對話輸入框貼入下方文字 Prompt，生成後點擊回答氣泡下方的 **`儲存至記事 (Save to note)`**。

```text
請為「{MODULE_NAME}」建立 {QUESTION_COUNT} 題理解型測驗。

依據本 Module 正式講義與 Sources，涵蓋：
- {LEARNING_OUTCOME_1}
- {LEARNING_OUTCOME_2}
- {LEARNING_OUTCOME_3}

題目以情境判斷、比較、資料流、除錯或應用為主，避免只背名詞。
難度由基礎理解逐步到跨單元整合。
每題提供答案與簡短解析，並標示對應單元。
題目嚴格限定於本 Module 正式講義與 Sources 已涵蓋之範圍。
```

檢查 Quiz：

- 所有核心學習成果至少被測一次。
- 沒有只有術語記憶、答案明顯或超出範圍的題目。
- 解析能指出推理依據，而非只重複答案。
- 跨單元題目建立整體心智模型，不靠冷知識。

## Study Guide 規格

指引使用者選擇以下任一種方式產出學習指南：
- 方式 A（快捷工具）：在右側「工作室 (Studio)」面板點擊 **`學習指南 (Study Guide)`** 工具卡片生成。
- 方式 B（專屬 Prompt）：在中間「對話」面板底部的對話輸入框貼入下方文字 Prompt，生成後點擊回答氣泡下方的 **`儲存至記事 (Save to note)`**。

```text
請為「{MODULE_NAME}」建立學習指南。

請包含：
1. Module 完成後應具備的能力
2. 各單元的一句核心問題
3. 跨單元心智模型：{MENTAL_MODEL_PROGRESSION}
4. 關鍵概念之間的關係
5. 常見誤解與自我診斷方式
6. 建議複習順序
7. 進入「{NEXT_MODULE}」前的自我檢查

依據正式講義與目前 Sources，使用{LANGUAGE}。
著重整合跨單元心智模型與能力檢驗，嚴格限於本 Module 講義與來源。
```

## Module 封存紀錄

```text
Module：{MODULE_NAME}
- Notebook：{NOTEBOOK_NAME}
- 單元：{UNIT_LIST}
- 正式講義：{FINAL_FILES}
- 核准核心來源：{CORE_SOURCES}
- Coverage 限制：{ACCEPTED_GAPS_OR_NONE}
- Module Review：PASS
- 可進入下一 Module：YES
- Quiz：Completed
- Study Guide：Completed
- 封存日期：{DATE_IF_AVAILABLE}
```

只向使用者顯示精簡完成摘要；完整紀錄保留在狀態表。

## 下一 Module 啟動

下一則只提供：

1. 建議 Notebook 名稱。
2. 下一 Module 的單元清單與一句整體目標。
3. Research Cluster 草案與共享來源策略。
4. Guided mode 的一個確認問題；auto mode 將此規劃併入前一個 Module Finalization Gate。

Guided mode 取得使用者對下一 Module 規劃的明確確認後，方可產生 Fast Research Prompt。Auto mode 在 Module Finalization Gate 核准後直接回到主流程的 Notebook／大綱 Source 步驟，不再新增確認關卡。

整門課最後一個 Module 完成時，將「下一 Module」改為全課程總結：列出每個 Module 的完成狀態、能力遞進、已知限制與教材資產清單。
