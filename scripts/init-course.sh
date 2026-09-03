#!/usr/bin/env bash
#
# init-course.sh - 初始化新的 NotebookLM 課程工作目錄
#
# 用法:
#   ./scripts/init-course.sh <course-folder-name>
#
# 範例:
#   ./scripts/init-course.sh python-concurrency

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

if [ $# -lt 1 ]; then
  echo "錯誤: 請指定課程目錄名稱。"
  echo "用法: $0 <course-folder-name>"
  exit 1
fi

COURSE_NAME="$1"
TARGET_DIR="${ROOT_DIR}/courses/${COURSE_NAME}"

if [ -d "${TARGET_DIR}" ]; then
  echo "警告: 目錄 '${TARGET_DIR}' 已存在。"
  read -rp "是否覆寫現有檔案？(y/N): " CONFIRM
  if [[ ! "${CONFIRM}" =~ ^[Yy]$ ]]; then
    echo "操作已取消。"
    exit 0
  fi
else
  mkdir -p "${TARGET_DIR}"
fi

# 複製模板
cp "${ROOT_DIR}/templates/build-state.md" "${TARGET_DIR}/build-state.md"
cp "${ROOT_DIR}/templates/course-outline-template.md" "${TARGET_DIR}/course-outline.md"

echo "✅ 課程工作區已建立: ${TARGET_DIR}"
echo "📁 包含檔案:"
echo "   - ${TARGET_DIR}/course-outline.md (編輯此檔填入課程大綱)"
echo "   - ${TARGET_DIR}/build-state.md     (建課狀態追蹤表)"
echo ""
echo "🚀 下一步:"
echo "   1. 編輯 course-outline.md 填入課程主題與單元規劃"
echo "   2. 將大綱提供給 AI 助手，並指示:「請使用 notebooklm-course-builder 技能開始建課」"
