# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Conditional browser automation with `agent-browser` as the preferred adapter and `playwright-cli` as fallback.
- Run-level authorization, source-import and module-finalization batch gates, bounded retries, and observable checkpoints.
- A deterministic Node/runtime and browser-tool preflight command with behavior tests and coverage thresholds.

### Changed
- The 14-stage workflow now defaults to auto mode when a supported browser adapter is ready, while preserving guided mode and existing build-state compatibility.
- Course state now records automation mode, adapter, run identity, checkpoint, pending gate, and blocker.
- The beginner tutorial now starts with terminal, Node.js, skill, adapter, preflight, and first-sign-in completion criteria; fallback setup and troubleshooting remain behind targeted links.

## [1.0.0] - 2026-09-03

### Added
- **Core Skill (`SKILL.md`)**:
  - Full 14-phase wizard-style methodology for transforming coarse course outlines into structured, citation-grounded curriculum in Google NotebookLM.
  - Strict distinction of three NotebookLM objects (Course Outline Source, Research Prompt, Candidate Source).
  - 3-Mode syllabus ingestion: Template Mode, Raw Text Ingestion Mode, and 3-Question Interview Mode.
  - Progress header tracking and session continuation mechanism (`/resume`).
  - Positive-steering behavioral constraints and verifiable completion criteria per step.
- **Cross-Platform Agent Support (`agents/openai.yaml`)**:
  - Full compatibility with the open Agent Skills standard (agentskills.io, skills.sh).
  - Native integration with OpenAI Codex and ChatGPT App desktop/workspace environments.
- **Reference Manuals (`references/`)**:
  - `notebooklm-ui-guide.md`: Detailed mapping of NotebookLM 3-panel UI layout (Sources, Chat, Studio), bilingual button tables, and step-by-step UI paths.
  - `checklist.md`: 14-stage verification checklist and key anti-patterns to avoid.
  - `research-and-sources.md`: Fast Research prompt engineering, 7-dimension source quality matrix, and Coverage analysis.
  - `lesson-production.md`: Single-lesson draft generation, zero-bloat in-notebook review loop, minor revisions, and final check rules.
  - `module-completion.md`: Module-level acceptance review, Quiz specifications, and Study Guide synthesis.
- **Hands-on Tutorial (`docs/first-course-tutorial.md`)**:
  - Step-by-step onboarding walkthrough using a real-world Git collaboration course.
  - Beginner-friendly installation guide covering `skills.sh`, ChatGPT App, Claude Cowork, Google Antigravity, and Cursor.
  - AI-assisted installation prompt ("懶人救星") for zero-barrier setup.
- **Automation Scripts & Templates (`scripts/`, `templates/`)**:
  - `scripts/init-course.sh`: Fast scaffolding for new course directories.
  - `scripts/validate-state.sh`: Automated inspection script for course build-state integrity.
  - `templates/build-state.md`: Single source of truth (SSOT) state ledger tracking research, coverage, drafts, reviews, and decisions.
  - `templates/course-outline-template.md`: Standard input format for course design.
- **Real-World Examples (`examples/`)**:
  - `examples/python-async-course/`: Complete end-to-end course build demonstration covering syllabus, state ledger, and prompt dialogue history.
- **Project Documentation**:
  - Comprehensive bilingual documentation in Traditional Chinese (`README.md`) and English (`README.en.md`).
