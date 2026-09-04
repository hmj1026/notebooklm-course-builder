# Helper Scripts

本目錄提供輔助管理、驗證與瀏覽器能力偵測的命令列工具。

## 執行環境

- Shell 腳本需要 Bash。
- `detect-browser-tools.mjs`、自動模式與測試需要 Node.js 22.8.0 以上版本，並使用隨 Node.js 安裝的 `npm` 與 `npx`。

```bash
node --version
npm --version
npx --version
```

若尚未安裝 Node.js，請依 [自動模式環境建置與排錯](../docs/browser-automation-setup.md)完成設定。

## 腳本清單

| 腳本名稱 | 說明 | 適用時機 |
|---|---|---|
| `init-course.sh` | 快速建立新課程的工作目錄與初始模板 | 開始新課程建置時 |
| `validate-state.sh` | 驗證 `build-state.md` 的欄位填寫與關卡進度 | 階段檢查或提交審核前 |
| `detect-browser-tools.mjs` | 偵測並選擇 `agent-browser`／`playwright-cli` | 啟動 auto mode 前 |

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

---

## 3. `detect-browser-tools.mjs`

依序檢查 Node runtime 與 `agent-browser`、`playwright-cli` CLI 是否可執行。兩者皆不可用時回傳 `guided`，不會自行安裝任何工具。`mode: auto` 只表示已有 CLI 候選；browser engine 與 session 仍須依 [automation.md](../references/automation.md)通過 health check。

### 用法

```bash
node scripts/detect-browser-tools.mjs
node scripts/detect-browser-tools.mjs --json
```

JSON 格式固定使用 `notebooklm.browser-preflight.v1`，包含 Node runtime、`mode`、`selected_adapter`、工具狀態與安裝建議。Node 版本不符或兩套 adapter 皆不可用時，結果會 fail closed 為 `guided`。
