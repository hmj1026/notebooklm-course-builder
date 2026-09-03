# 課程大綱：Python 高併發與非同步程式設計

## 課程基本資訊

- **課程名稱**：Python 高併發與非同步程式設計實戰 (Practical Python Async Programming)
- **目標受眾**：已掌握 Python 基礎語法與物件導向概念，具備 1~2 年開發經驗但對非同步 I/O 概念不熟練的工程師。
- **先備知識**：Python 基礎、函數、例外處理、基本 HTTP 觀念。
- **課程深度**：中階實務應用。
- **教材語言**：繁體中文（技術名詞初次出現保留英文對照）。
- **全課核心心智模型**：
  > 非同步事件迴圈（Event Loop）如同單一廚師（單執行緒）同時管理多口正在滾煮的鍋子（I/O 任務）。當任務等待 I/O 時主動出讓控制權（Cooperative Multitasking），而非由作業系統搶佔（Preemptive）。
- **明確不涵蓋範圍 (Out of Scope)**：
  - CPython C-API 底層原始碼解析
  - 分散式分散協調（如 Celery / Kafka 架構）
  - 多行程 (multiprocessing) 記憶體共享進階議題

---

## 模組與單元架構

### Module 1: Event Loop 與協程基礎 (Event Loop & Coroutines)
- **單元 1.1: 阻塞 I/O vs. 非同步 I/O**
  - 核心問題：為什麼多執行緒在大量網路連線下會遇到記憶體與 Context Switch 瓶頸？
  - 學習成果：能解釋阻塞與非阻塞 I/O 的本質差異，並清楚說明 select/poll/epoll 的原理。
  - 心智模型：郵局叫號機 vs. 窗口排隊。
- **單元 1.2: Coroutine 與 async / await 語法機制**
  - 核心問題：`await` 到底暫停了什麼？暫停後控制權交給誰？
  - 學習成果：能手寫標準協程函數，並追蹤協程狀態機生命週期。
  - 心智模型：可隨時暫停與恢復的生成器演進。
- **單元 1.3: 任務排程與 Task / Future 管理**
  - 核心問題：如何建立可並發的背景任務，並有效處理例外與逾時？
  - 學習成果：能熟練運用 `asyncio.create_task`、`asyncio.gather` 與 `asyncio.wait_for`。
  - 心智模型：非同步任務佇列與承諾 (Promise/Future)。

### Module 2: 併發控制與非同步生態系 (Concurrency & Ecosystem)
- **單元 2.1: 共享資源防護與 Semaphore 併發限流**
  - 核心問題：非同步是單執行緒，為什麼還會發生 Race Condition？
  - 學習成果：能使用 `asyncio.Lock` 與 `asyncio.Semaphore` 限制爬蟲或 API 請求頻率。
- **單元 2.2: 非同步 HTTP 客戶端 httpx / aiohttp 實踐**
  - 核心問題：在非同步函數中呼叫 `requests.get()` 會造成什麼嚴重後果？
  - 學習成果：能構建高併發網路爬蟲或 API 代理，並正確管理連線池。
