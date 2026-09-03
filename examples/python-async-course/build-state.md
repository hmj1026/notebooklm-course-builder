# NotebookLM Course Build State: Python Async Programming

> 本狀態表記錄 Module 1 的完整建置過程與各階段決策。

## Course

- 名稱：Python 高併發與非同步程式設計實戰
- 教材語言：繁體中文（專有名詞保留英文）
- 目標受眾：具備 Python 基礎與 1~2 年經驗的軟體工程師
- 先備知識：Python 基礎、函數、例外處理、基本網路概念
- 課程深度：中階實務應用
- 全課核心心智模型：單執行緒事件迴圈協作式調度（Cooperative Multitasking）
- 明確不含：CPython C 語言原始碼、分散式隊列、多行程記憶體共享
- 目前階段：Module 1 驗收完成（已產出 Quiz 與 Study Guide）
- 下一個使用者動作：確認 Module 2 Notebook 規劃並開啟新 Notebook

## Course Map

| Module | 單元 | 核心成果 | 依賴 | 後續邊界 | 狀態 |
|---|---|---|---|---|---|
| Module 1 | 1.1 阻塞 I/O vs. 非同步 I/O | 釐清阻塞本質，理解 epoll 機制 | Python 基礎 | 不涉及協程語法 | Final Passed |
| Module 1 | 1.2 Coroutine 與 async/await | 掌握協程生命週期與暫停機制 | 1.1 | 不涉及 Task 批次排程 | Final Passed |
| Module 1 | 1.3 Task 與 Future 排程管理 | 掌握 create_task 與 gather | 1.2 | 不涉及鎖與 Semaphore | Final Passed |
| Module 2 | 2.1 共享資源防護與限流 | 掌握 Lock 與 Semaphore | 1.3 | 不涉及分散式鎖 | Planned |
| Module 2 | 2.2 非同步 HTTP 客戶端實踐 | 掌握 aiohttp/httpx 連線池 | 2.1 | 不涉及全端框架整合 | Planned |

## Notebook Plan

| Module | Notebook 名稱 | 合併／拆分理由 | Outline Source 狀態 |
|---|---|---|---|
| Module 1 | PyAsync-M1-EventLoop | 核心基礎概念，獨立一本維持最小干擾 | Added (Course Outline Source) |
| Module 2 | PyAsync-M2-Ecosystem | 涉及外部套件與網路連線實務，拆分以防來源混雜 | Planned |

## Research Clusters

| Module | Cluster | 涵蓋單元 | 必要知識 | 既有來源／避免重複 | 狀態 |
|---|---|---|---|---|---|
| Module 1 | Cluster 1: I/O 多工與 Event Loop | 1.1, 1.2 | 阻塞 I/O、epoll、Event Loop 原理、協程語法演進 | 無（首發群組） | Closed |
| Module 1 | Cluster 2: asyncio Task 與併發工具 | 1.3 | Task、Future、asyncio.gather、例外捕獲 | 避免重複概念，著重 API 與狀態轉換 | Closed |

## Source Ledger

| Module／Cluster | 來源標題 | URL／網域 | 決策 | 支援內容 | 理由 | 已 Import |
|---|---|---|---|---|---|---|
| M1 / Cluster 1 | Python Docs: asyncio - Asynchronous I/O | docs.python.org | Import | 1.1, 1.2, 1.3 | 官方最權威定義與最新行為規格 | Yes |
| M1 / Cluster 1 | PEP 492: Coroutines with async and await syntax | peps.python.org | Import | 1.2 | 協程設計原理與設計動機（原始標準） | Yes |
| M1 / Cluster 1 | Linux epoll(7) Manual Page | man7.org | 可選 | 1.1 | 底層 OS 多工機制輔助說明，作為補充參考 | Yes |
| M1 / Cluster 1 | Medium: 5 分鐘搞懂 Python 非同步 | medium.com | 不要 Import | 1.1 | 內容農場型簡化文章，且包含已過時的 yield from 舊寫法 | No |
| M1 / Cluster 2 | Python Docs: Coroutines and Tasks | docs.python.org | Import | 1.3 | Task 排程、Future 與 gather 規範 | Yes |
| M1 / Cluster 2 | Real Python: Async IO in Python: A Complete Walkthrough | realpython.com | Import | 1.2, 1.3 | 高品質實用教學與心智模型圖解 | Yes |

## Coverage

| 單元 | Coverage | 已有核心知識 | 真正缺口 | 缺口類型 | 下一步／接受理由 |
|---|---|---|---|---|---|
| 1.1 | High | 阻塞機制、epoll 概念、事件迴圈概念 | 無重大缺口 | — | 停止搜尋，進入講義產出 |
| 1.2 | High | async/await 語法、狀態轉換、生成器對照 | 無重大缺口 | — | 停止搜尋，進入講義產出 |
| 1.3 | Medium | Task、gather、基本例外處理 | 欠缺 wait_for 逾時與 Task 撤銷取消細節 | 教學細節 | 接受缺口，於 Prompt 提示官方 API 即可，不擴增來源 |

## Lesson Production

| 單元 | Draft | Review | 正式候選 | Final Check | 已儲存 | 限制 |
|---|---|---|---|---|---|---|
| 1.1 | v1 | PASS | v1 | PASS | Yes | 不提前介紹協程語法 |
| 1.2 | v1 | Needs Minor Revision | v2 | PASS | Yes | 修正了產生器語法的歷史贅述，聚焦現代語法 |
| 1.3 | v1 | PASS | v1 | PASS | Yes | 限制聚焦 gather 與取消，Semaphore 留給 M2 |

## Module Completion

| Module | Review | 可進下一 Module | Quiz | Study Guide | 封存 |
|---|---|---|---|---|---|
| Module 1 | PASS | YES | 已產生 (5 題情境題) | 已產生 (含心智模型與常見陷阱) | Yes |

## Decision Log

| 日期／階段 | 決策 | 原因 | 影響 |
|---|---|---|---|
| Phase 2 | Module 1 與 Module 2 分開建置不同 Notebook | 外部生態系 (aiohttp/httpx) 來源龐大，分開避免干擾基礎理論精確度 | 保持 Notebook 專注 |
| Phase 7 | 接受 Unit 1.3 的 Medium Coverage | 核心 API 已有官方文檔覆蓋，取消機制的邊界情境屬進階，不影響中階工程師目標 | 避免來源膨脹 |
