# 互動範例紀錄：Python Async 課程建置歷程

本文件記錄 AI 代理在建置「Python 高併發與非同步程式設計實戰」Module 1 時的關鍵提示詞與審核對話片斷。

---

## 步驟 1: 課程大綱確認與地圖輸出 (Phase 1)

**代理輸出給使用者：**

```text
目前：Phase 1 課程大綱解析

已完成「Python 高併發與非同步程式設計實戰」大綱解析：
- 受眾：具備 Python 基礎與 1~2 年經驗的軟體工程師
- 核心心智模型：單執行緒事件迴圈協作式調度（Cooperative Multitasking）
- 明確不涵蓋：CPython C 原始碼、分散式隊列、多行程記憶體共享
- 規劃：拆分為 Module 1 (基礎與語法) 與 Module 2 (併發控制與網路生態系)

完成判準：請確認受眾設定與單元劃分是否符合您的預期？
請回傳：「確認無誤，進行下一步」或具體調整建議。
```

---

## 步驟 4: Fast Research Prompt 產生 (Phase 4)

**代理輸出給使用者：**

```text
目前：Module 1 / Research Cluster 1 來源研究

請在 NotebookLM：切換至「PyAsync-M1-EventLoop」筆記本，在左側「來源 (Sources)」面板點擊「+ 新增來源」> 選擇「快速研究 (Fast Research)」，將下方提示詞貼入搜尋框並按下 Enter：

---
請研究「I/O 多工與 Python Event Loop 基礎」，作為「Module 1: Event Loop 與協程基礎」的中階工程師教材來源。

需要支援：
- 阻塞 I/O vs. 非阻塞 I/O 的本質差異與作業系統 select/epoll 多工角色
- Python asyncio Event Loop 的核心運行機制與任務切換
- PEP 492 async/await 協程語法演進與狀態機模型
- 餐廳單一廚師調度多鍋比喻（心智模型）

來源優先：
- docs.python.org 官方文件與 PEP 492 / 3156 標準
- 權威技術教學（如 Real Python、權威大學課程教材）

避免：
- SEO 內容農場或過度簡化的個人簡短心得
- 包含 Python 3.4 以前舊版 `yield from` 或 `@asyncio.coroutine` 的過時教學
- 與本單元無關的第三方 Web 框架（FastAPI/Django）完整教學

研究目標：讓學習者能掌握非同步的運作機制並能手寫 coroutine。
不需要深入：CPython C 語言底層實作。
---

完成判準：NotebookLM 展開候選來源清單。
請回傳：請不要直接點擊「全選」或「匯入」，請提供候選來源的標題與網址（或截圖）。
```

---

## 步驟 5: 候選來源互動審核 (Phase 5)

**代理輸出給使用者：**

```text
目前：Module 1 / Cluster 1 來源審核

針對 NotebookLM 搜尋出的 4 個候選來源，審核結果如下：

| # | 來源標題 | 網址／來源 | 決策 | 支援單元 | 理由 |
|---|---|---|---|---|---|
| 1 | asyncio — Asynchronous I/O | docs.python.org | Import | 1.1, 1.2 | 官方最權威的 Event Loop 與 Coroutine 規範 |
| 2 | PEP 492 – Coroutines with async and await | peps.python.org | Import | 1.2 | 協程語法設計的原始提案標準，具備最高定義權威 |
| 3 | epoll(7) — Linux manual page | man7.org | 可選 | 1.1 | 適合作為 OS 多工機制的輔助佐證，建議納入 |
| 4 | 5 分鐘搞懂 Python 非同步 | medium.com | 不要 Import | — | 包含已棄用的 yield from 語法，且內容零碎 |

請在 NotebookLM：在快速研究候選視窗中，僅勾選前 3 項（Import 及可選項），點擊視窗右下角「匯入 (Import)」按鈕加入左側筆記本來源，忽略第 4 項。

完成判準：左側 Sources 清單中已包含 3 份核准來源。
請回傳：「已完成匯入」或您對取捨的調整意見。
```

---

## 步驟 8: 講義 Draft Prompt (Phase 8 - Unit 1.2)

**代理輸出給使用者：**

```text
目前：Module 1 / Unit 1.2 協程語法講義生成

請在 NotebookLM：在中間「對話 (Chat)」面板底部的對話輸入框，貼入下列講義生成指令並發送（確認左側來源皆已勾選）：

---
請根據目前 Notebook Sources 製作正式講義：

# Unit 1.2: Coroutine 與 async / await 語法機制
建議檔名：unit-1-2-coroutine-and-async-await.md

對象：具備 Python 基礎、欲理解非同步實作細節的中階工程師。
本節承接：Unit 1.1 阻塞與事件迴圈基礎概念。
完成後，學習者應能：
1. 精確說明 async def 與一般 def 的本質差異（產生 coroutine object）
2. 清楚描述 await 表達式的控制權出讓機制與暫停點
3. 手寫標準協程並避免常見的「定義協程卻未 await」警告

請依序包含：
1. 學習目標
2. 協程物件剖析：當我們呼叫 async def 時發生了什麼？
3. await 表達式與控制權出讓生命週期
4. 核心心智模型：狀態機（State Machine）與協程暫停/恢復圖解
5. 實戰程式碼範例與常見陷阱（如 RuntimeWarning: coroutine was never awaited）
6. 5 個理解型自我檢查題
7. 延伸思考

要求：
- 使用繁體中文（技術名詞初次出現附英文）
- 嚴格依據目前 Sources 撰寫並保留 NotebookLM 引用，不虛構來源
- 聚焦現代 Python 3.8+ async/await 語法，不引入舊版語法
- 不提前展開 Unit 1.3 的 Task 排程與 gather
---

完成判準：NotebookLM 產生完整講義草稿。
請回傳：貼回產生的講義內容或主要章節段落。
```

---

## 步驟 9: 講義 Review Prompt (Phase 9 - Unit 1.2)

**代理輸出給使用者：**

```text
目前：Module 1 / Unit 1.2 講義審查

請在 NotebookLM：在中間「對話 (Chat)」面板（延續同一個對話串）底部的對話輸入框，貼入下方審查指令並發送：

---
請審查「Unit 1.2: Coroutine 與 async / await 語法機制」講義，不要重寫講義。

以 Python 技術專家與教材審核者角度檢查：
1. 技術正確性：async def 傳回 coroutine object 的描述是否精確？
2. 邊界控制：是否嚴格避免了跨界講述 Unit 1.3 的 Task/gather？
3. 心智模型：協程暫停與恢復的說明是否足以建立正確的心智模型？
4. 來源支援：關鍵主張是否有目前 Sources 引用支撐？
5. 學習成果：是否有效解決「忘記 await 產生 RuntimeWarning」的實務痛點？

只判定：
- PASS
- Needs Minor Revision
- Needs Major Revision

需要修改時，只列具體、可執行且影響正確性或學習的項目。
不要因文風或措辭偏好要求修改。
---

完成判準：NotebookLM 給出審查判定與清單。
請回傳：審核結果判定（PASS / Needs Minor Revision / Needs Major Revision）與修改項目。
```

---

## 步驟 13: Quiz 與 Study Guide 生成 (Phase 13)

**代理輸出給使用者：**

```text
目前：Module 1 整體測驗與學習指南生成

已通過 Module 1 整體驗收！現在為學習者產出單元總複習工具。

請在 NotebookLM：在右側「工作室 (Studio)」面板點擊「測驗 (Quiz)」卡片；或在中間「對話」面板底部輸入框貼入下方指令並發送，生成後點擊回答氣泡下方的「儲存至記事 (Save to note)」：

---
請為「Module 1: Event Loop 與協程基礎」建立 5 題理解與情境型測驗。

依據本 Module 正式講義與 Sources，涵蓋：
- 阻塞 I/O 與 epoll 的本質差異
- async/await 的暫停與事件迴圈調度機制
- asyncio.gather 與 create_task 的使用情境與異常捕獲

題目以情境判斷、除錯分析為主，避免純死記名詞。
每題提供詳細答案與解析，並標註對應單元。
---

完成判準：產出 5 題情境測驗題與解答。
請回傳：「測驗已儲存至 Note」，我們將進入 Module 2 的建置！
```
