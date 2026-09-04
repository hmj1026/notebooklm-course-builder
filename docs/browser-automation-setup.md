# 自動模式備援安裝與排錯

第一次安裝請先走 [完整新手教學](first-course-tutorial.md#步驟-0建立自動模式環境)的固定路徑。本頁是分支參考：只在 Node.js、`agent-browser`、preflight 或登入未達完成判準時，讀取對應小節。

自動模式需要 Node.js 22.8.0 以上版本及一套 browser adapter。技能優先使用 `agent-browser`，無法使用時再選擇 `playwright-cli`；兩者皆不可用時會安全降級為 guided mode。

## 1. 安裝與驗證 Node.js

建議從 [Node.js 官方下載頁](https://nodejs.org/en/download)安裝最新 LTS 版本。若電腦已安裝 `nvm`，也可以執行：

```bash
nvm install --lts
nvm use --lts
```

重新開啟終端機或 AI 編輯器後確認：

```bash
node --version
npm --version
npx --version
```

`node --version` 必須顯示 `v22.8.0` 或更新版本。這個門檻同時支援專案的原生 coverage threshold 測試旗標。若仍出現 `node: command not found`，請用 `command -v node`（Windows 使用 `where node`）確認 Node.js 已加入 `PATH`。

## 2. 安裝一套 Browser Adapter

首選 `agent-browser`：

```bash
npx skills add vercel-labs/agent-browser
npm install -g agent-browser
agent-browser install
agent-browser --version
agent-browser doctor --offline --quick --json
```

或安裝 `playwright-cli` 作為備援：

```bash
npx skills add https://github.com/microsoft/playwright-cli --skill playwright-cli
npm install -g @playwright/cli@latest
playwright-cli install-browser
playwright-cli --version
```

只需安裝其中一套。`agent-browser` 的 doctor 應沒有 failed check；`playwright-cli` 還會由技能用專用 session 的第一次 snapshot 驗證 browser 可啟動。安裝或更新工具屬於環境變更，技能不會在未確認的情況下自行執行。

## 3. 驗證自動模式

一般使用者不必尋找技能安裝目錄。請在 AI 助手中貼上：

```text
請使用 notebooklm-course-builder 技能，只執行完整 browser preflight，
包含 Node、CLI 與 adapter health check；
不要建立或修改任何 Notebook。請回報 node.ready、mode、selected_adapter，
adapter_health，以及無法進入 auto mode 時的修復建議。
```

只有在這個 repository 中開發或除錯時，才需要從專案根目錄直接執行：

```bash
node scripts/detect-browser-tools.mjs --json
```

偵測腳本的 `mode: auto` 只代表 Node 與 CLI 可作為候選；完整 preflight 還必須完成 doctor 或首次 snapshot。最終結果中的 `node.ready` 應為 `true`、`mode` 應為 `auto`、`selected_adapter` 應為 `agent-browser` 或 `playwright-cli`，且 `adapter_health` 應為 `ready`。若最後降級為 guided，請查看 `node.reason`、`tools.<adapter>.reason`、health check 錯誤與 `recommendations`。

**完成判準：** `node.ready: true`、`mode: auto`、`selected_adapter` 有值且 `adapter_health: ready`；或使用者明確接受 guided mode。

## 4. 第一次登入與執行邊界

第一次自動 Run 會開啟專用的持久 browser session。請在該視窗自行完成 Google 登入；技能不會要求、接收或儲存密碼。

每次 Run 會先確認執行範圍。正常流程只在每批來源匯入前與每個 Module 定稿前暫停確認，其他 Prompt 輸入、結果擷取與記事保存由代理處理。刪除、分享、權限變更、覆寫或安裝工具仍需另外確認。

## 5. 常見問題

- `node: command not found`：重新開啟終端機並檢查 `PATH`。
- `node.reason` 是 `unsupported-version`：升級至文件列出的最低版本，再重新執行偵測。
- adapter 的 `reason` 是 `not-found`：安裝上述任一 adapter，再重新執行偵測。
- adapter 的 `reason` 是 `version-check-failed`：先直接執行該 CLI 的 `--version`，依錯誤訊息修復後重試。
- Google 登入失效：在專用 session 重新登入，不要把帳號密碼貼給代理。
- NotebookLM 介面無法辨識：技能最多重試兩次，仍失敗便停止在已驗證 checkpoint 並改由 guided mode 接手。

自動化的操作條件、批次關卡與例外策略詳見 [Browser Automation Contract](../references/automation.md)。
