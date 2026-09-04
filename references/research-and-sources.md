# Research, Source Review, and Coverage

進入 Fast Research、候選來源審核、Coverage Analysis 或缺口補來源時使用本參考。

Auto mode 由代理依 [automation.md](automation.md) 操作並讀取頁面；本文的「指引使用者」只適用 guided mode。來源決策仍必須經 Source Import Gate 核准後才執行 Import。

## Fast Research Prompt

每輪專注研究單一 Research Cluster 或明確缺口，長度保持在約 150～300 個中文字詞，僅保留關鍵主題與必要邊界。

填入實際內容並刪除不適用欄位：

```text
請研究「{CLUSTER_NAME}」，作為「{MODULE_NAME}」的{AUDIENCE_LEVEL}教材來源。

需要支援：
- {KNOWLEDGE_POINT_1}
- {KNOWLEDGE_POINT_2}
- {KNOWLEDGE_POINT_3}
- {MENTAL_MODEL_OR_CASE}

來源優先：
- {RELEVANT_OFFICIAL_DOCS_OR_STANDARDS}
- 大學教材、政府／研究機構、同儕審查或公認權威技術資料

避免：
- SEO／內容農場、只有行銷敘述的頁面
- 與本題不同的產品線或同名但不同領域
- 過度綁定單一工具的完整教學
- 與已匯入來源重複：{EXISTING_COVERAGE}

研究目標：讓學習者能夠{LEARNING_OUTCOME}。
不需要深入：{OUT_OF_SCOPE}。
```

指引路徑：在左側「來源」面板點擊 **`+ 新增來源`** ➔ 選擇 **`快速研究 (Fast Research)`**（位於研究／搜尋分頁）➔ 將 Prompt 貼入搜尋框按 Enter。完成後展開候選清單供逐項評估，保留未匯入狀態。詳細介面配置詳見 [notebooklm-ui-guide.md](notebooklm-ui-guide.md)。

## 候選來源所需資訊

至少需要：標題、網域或 URL、NotebookLM 摘要／片段。只有標題仍可進行暫評；凡遇同名、版本或發布者不確定時，一律標記「待確認」。Auto mode 先嘗試展開或另開候選頁，仍不足便進入例外關卡；guided mode 請使用者補充完整網址或截圖。

若候選來自截圖：

1. 逐張讀取可見項目。
2. 合併重複出現的候選。
3. 記錄看不到的 URL／發布者為不確定。
4. 若清單有「另外 N 個來源」，auto mode 由代理展開，guided mode 請使用者展開；完整擷取後才完成本批決策。

## 來源品質矩陣

按下列軸線判斷，不做單一網域白名單：

| 軸線 | 要問的問題 |
|---|---|
| 切題性 | 是否直接支援本 Cluster 的核心學習成果？ |
| 權威性 | 是否為規格／官方文件／原始研究／大學或公認權威？ |
| 證據直接性 | 是第一手資料，還是未提供依據的轉述？ |
| 新鮮度 | 對快速變動的 API／產品是否仍有效？基礎理論是否為代表性原始文獻？ |
| 教學適配 | 深度、語言與案例是否適合目標學習者？ |
| 獨特價值 | 是否填補缺口，或只是複製已 Import 內容？ |
| 邊界風險 | 是否引入不同產品線、偏離課程或過早深入後續 Module？ |

常見優先順序：

1. 直接相關的官方文件、標準、規格、原始論文或原作者資料。
2. 大學課程、政府／研究機構、同儕審查材料。
3. 具公信力組織或公認實務專家的技術解說。
4. 高品質二手文章，用於補充教學表達或案例。
5. 社群貼文、專案範例與教學文章，只作案例且需有核心來源支撐。

「官方但不切題」不勝過「切題且可靠」；品牌知名度不能替代內容適配。

## 三級決策

### Import

符合大多數條件：

- 直接支援必要知識點或關鍵案例。
- 權威、可追溯且版本適當。
- 能填補缺口，或明顯優於現有來源。
- 深度適合本 Module。

### 可選

常見情況：

- 品質良好，但和核心來源部分重複。
- 有助於案例、不同觀點或較白話的教學表達。
- 發布者可靠，但只支援次要內容。
- 尚缺 URL、版本或完整摘要，需要確認後再決定。

### 不要 Import

常見情況：

- 主題錯配、同名異義或產品線混淆。
- 主要是 SEO、行銷、聚合、未具名轉載或內容農場。
- 內容已過時且會影響技術正確性。
- 過度進階、過度綁定特定框架，偏離單元目標。
- 與更權威的已 Import 來源高度重複，沒有新增教學價值。
- 只是一個未經說明的範例專案，卻被當成技術主張依據。

## 來源審核輸出

必須覆蓋本批每一項：

```markdown
| 候選來源 | 決策 | 支援內容 | 原因 |
|---|---|---|---|
| {TITLE — DOMAIN} | Import／可選／不要 Import | {UNIT_OR_TOPIC} | {ONE_SPECIFIC_REASON} |
```

表格後只列：

```text
建議這輪 Import：
- {SOURCE}

可選，先不勾：
- {SOURCE}

這輪不要 Import：
- {SOURCE}

👉 快速操作指令：
請在候選視窗中：勾選 [{IMPORT_INDEXES}]，忽略 [{EXCLUDE_INDEXES}]，點擊右下角「匯入 (Import)」按鈕。

完成後回傳目前 Sources 清單或來源數量。
```

若使用者不同意某項，先理解其用途。只要不破壞技術正確性或課程邊界，更新 Source Ledger 並尊重選擇；若有明確風險，具體說明風險。

## Coverage Analysis Prompt

指引使用者在中間「對話 (Chat)」面板底部的對話輸入框貼入下方 Prompt 並發送（確保左側來源清單均處於勾選狀態）：

```text
請根據目前 Notebook 的所有 Sources，對「{MODULE_NAME}」做 Coverage Analysis。

單元：
- {UNIT_1}
- {UNIT_2}
- {UNIT_3}

輸出表格：
| 單元 | Coverage | 已有核心知識 | 真正缺口 | 是否需補來源 |

Coverage：
- High：足以製作符合本課程深度、技術正確且有引用的完整教材
- Medium：核心大致足夠，但仍缺一項重要案例或關鍵細節
- Low：只能支援部分核心學習成果
- Missing：幾乎沒有可用來源

請依單元學習成果判斷，不因出現關鍵字就判定 High。
屬於後續 Module 或超出本課深度的進階細節，不算當前缺口。
此階段聚焦於來源結構與缺口分析。
```

單元很多時，可按 Cluster 分批做 Coverage，再用一則極短 Prompt 整合；避免把數十個單元塞入同一則。

## 缺口判讀

把 NotebookLM 回傳的每個缺口分成：

- **核心缺口**：缺少就無法達成本節學習成果，必須補。
- **教學缺口**：理論足夠但缺適合受眾的案例；優先找一個高品質案例或允許講義自行用非技術性例子說明。
- **延後內容**：已規劃在後續 Module，記錄邊界，不補。
- **超出範圍**：規模化、專家細節或不影響本課定位，接受缺口。
- **表面缺口**：現有來源其實已支援，只是術語不同；先核對 Source Ledger。

## Targeted Gap Research Prompt

```text
針對「{UNIT_NAME}」補研究一個缺口：{GAP}。

目前已有：{EXISTING_COVERAGE}。
請只找能支援以下結果的來源：{REQUIRED_OUTCOME}。

優先：{AUTHORITATIVE_SOURCE_TYPES_OR_DOMAINS}。
避免重複既有來源、SEO／內容農場、{OUT_OF_SCOPE}。

目標是補足{AUDIENCE_LEVEL}教材，不擴張成進階專題。
```

每輪候選仍須執行三級審核。補完來源後必須重新執行 Coverage Analysis，依實際佐證確認缺口已消除。

## 研究停止條件

停止來源蒐集並進入講義時，需同時成立：

- 所有核心學習成果都有至少一個適切來源支援。
- 高風險或快速變動主張有足夠新的第一手來源。
- Medium 只剩已記錄的教學性、延後或超出範圍缺口。
- 新一輪來源大多只重複既有內容，邊際價值低。
- Source Ledger 能說明每個保留來源的用途。
