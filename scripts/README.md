# Helper Scripts

本目錄提供輔助管理與驗證 NotebookLM 課程建置的工具腳本。

## 腳本清單

| 腳本名稱 | 說明 | 適用時機 |
|---|---|---|
| `init-course.sh` | 快速建立新課程的工作目錄與初始模板 | 開始新課程建置時 |
| `validate-state.sh` | 驗證 `build-state.md` 的欄位填寫與關卡進度 | 階段檢查或提交審核前 |

---

## 1. `init-course.sh`

快速建立專案內的課程工作區，自動複製 `build-state.md` 與 `course-outline.md`。

### 用法

```bash
# 賦予執行權限（初次使用）
chmod +x scripts/*.sh

# 初始化新課程工作區
./scripts/init-course.sh <course-folder-name>
```

### 範例

```bash
./scripts/init-course.sh modern-api-design
```

執行後會建立 `courses/modern-api-design/` 並包含：
- `course-outline.md`：填寫您的課程大綱與目標受眾。
- `build-state.md`：AI 代理與您協作記錄的建置狀態表。

---

## 2. `validate-state.sh`

檢查 `build-state.md` 的填寫完整性，提示是否存在未處理的 `Missing` / `Low` 來源涵蓋度缺口，以及統計通過的單元數。

### 用法

```bash
./scripts/validate-state.sh <path-to-build-state.md>
```

### 範例

```bash
./scripts/validate-state.sh examples/python-async-course/build-state.md
```
