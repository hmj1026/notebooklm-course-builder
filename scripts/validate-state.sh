#!/usr/bin/env bash
#
# validate-state.sh - 驗證 NotebookLM 課程建置狀態表 (build-state.md) 的完整性與關卡狀況
#
# 用法:
#   ./scripts/validate-state.sh <path-to-build-state.md>
#
# 範例:
#   ./scripts/validate-state.sh examples/python-async-course/build-state.md

set -euo pipefail

if [ $# -lt 1 ]; then
  echo "錯誤: 請指定要驗證的 build-state.md 檔案路徑。"
  echo "用法: $0 <path-to-build-state.md>"
  exit 1
fi

STATE_FILE="$1"

if [ ! -f "${STATE_FILE}" ]; then
  echo "❌ 找不到檔案: ${STATE_FILE}"
  exit 1
fi

echo "🔍 正在檢查課程狀態表: ${STATE_FILE}"
echo "----------------------------------------------------"

# 1. 檢查課程基本資訊
COURSE_NAME=$(grep -E '^\- 名稱：' "${STATE_FILE}" | sed 's/- 名稱：//' | tr -d ' ' || true)
if [ -z "${COURSE_NAME}" ]; then
  echo "⚠️  [警告] 課程名稱尚未填寫！"
else
  echo "📘 課程名稱: ${COURSE_NAME}"
fi

CURRENT_PHASE=$(grep -E '^\- 目前階段：' "${STATE_FILE}" | sed 's/- 目前階段：//' | tr -d ' ' || true)
echo "📍 目前階段: ${CURRENT_PHASE:-未填寫}"

# 2. 檢查 Coverage 區塊是否有未解的 Low / Missing
LOW_COUNT=$(grep -ci "Low" "${STATE_FILE}" || true)
MISSING_COUNT=$(grep -ci "Missing" "${STATE_FILE}" || true)

if [ "${MISSING_COUNT}" -gt 0 ]; then
  echo "⚠️  [注意] 發現 ${MISSING_COUNT} 處 'Missing' 覆蓋度，需補足來源或說明理由！"
fi

if [ "${LOW_COUNT}" -gt 0 ]; then
  echo "ℹ️  [提示] 發現 ${LOW_COUNT} 處 'Low' 覆蓋度，建議發起補強 Fast Research。"
fi

# 3. 檢查 Lesson Production 是否有待處理項目
FINAL_PASS_COUNT=$(grep -c "PASS" "${STATE_FILE}" || true)
echo "✅ 通過審查 (PASS) 標記數: ${FINAL_PASS_COUNT}"

echo "----------------------------------------------------"
echo "✨ 狀態表格式檢查完成！"
