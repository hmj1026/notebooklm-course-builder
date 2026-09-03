# NotebookLM Course Builder Examples

本目錄提供使用 `notebooklm-course-builder` 技能建置課程的完整實戰範例。

## 範例目錄

- **[python-async-course/](./python-async-course/)**
  - 一門針對 Python 中階工程師設計的「Python 非同步程式設計 (Python Async Programming)」課程。
  - 展示從原始大綱到完整講義產出、來源審核、涵蓋度檢查與 Module 驗收的端到端過程。

## 範例檔案結構

```
examples/python-async-course/
├── syllabus.md               # 原始輸入的課程大綱
├── build-state.md            # 建課過程維護的狀態追蹤表（對應 templates/build-state.md）
└── prompts-and-review.md     # 實際執行的嚮導提示詞、來源審核表、Review 判定與驗收紀錄
```

## 如何參考本範例？

1. **規劃階段**：參考 `syllabus.md`，觀察如何定義明確邊界（Out of scope）、核心心智模型與單元學習成果。
2. **追蹤階段**：參考 `build-state.md`，觀察如何記錄 Research Cluster、Source Ledger（包含三級決策理由）、Coverage 與 Lesson 驗收狀態。
3. **推進階段**：參考 `prompts-and-review.md`，學習如何給出短版 Prompt、如何精準挑選候選來源，以及如何給出客觀的 Review 判準。
