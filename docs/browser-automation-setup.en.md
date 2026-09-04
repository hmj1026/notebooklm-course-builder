# Auto Mode Fallback Setup and Troubleshooting

For a first installation, follow the fixed path in the [complete beginner tutorial](first-course-tutorial.md#步驟-0建立自動模式環境). This page is branch reference: open only the section matching a failed Node.js, `agent-browser`, preflight, or sign-in completion criterion.

Auto mode requires Node.js 22.8.0 or newer and one browser adapter. The skill prefers `agent-browser`, falls back to `playwright-cli`, and safely switches to guided mode when neither is available.

## 1. Install and Verify Node.js

Install the latest LTS release from the [official Node.js download page](https://nodejs.org/en/download). If `nvm` is already installed, you can instead run:

```bash
nvm install --lts
nvm use --lts
```

Restart the terminal or AI editor, then verify the environment:

```bash
node --version
npm --version
npx --version
```

`node --version` must report `v22.8.0` or newer. This minimum also supports the native coverage-threshold flags used by the test command. If the terminal still reports `node: command not found`, use `command -v node` (`where node` on Windows) to confirm that Node.js is on `PATH`.

## 2. Install One Browser Adapter

Preferred, `agent-browser`:

```bash
npx skills add vercel-labs/agent-browser
npm install -g agent-browser
agent-browser install
agent-browser --version
agent-browser doctor --offline --quick --json
```

Or install `playwright-cli` as the fallback:

```bash
npx skills add https://github.com/microsoft/playwright-cli --skill playwright-cli
npm install -g @playwright/cli@latest
playwright-cli install-browser
playwright-cli --version
```

Only one adapter is required. The `agent-browser` doctor should report no failed check; the skill validates `playwright-cli` by obtaining the first snapshot from a dedicated session. Installing or updating tools changes the environment, so the skill does not perform it without confirmation.

## 3. Verify Auto Mode

Regular users do not need to locate the installed skill directory. Paste this into the AI assistant:

```text
Use the notebooklm-course-builder skill and run only its complete browser preflight,
including Node, CLI, and adapter health checks.
Do not create or modify any Notebook. Report node.ready, mode, selected_adapter,
adapter_health, and the remediation when auto mode is unavailable.
```

Run the command directly from the repository root only when developing or debugging this repository:

```bash
node scripts/detect-browser-tools.mjs --json
```

The detector's `mode: auto` means only that Node and a CLI are candidates; complete preflight must still pass a doctor or first-snapshot check. The final result should report `node.ready: true`, `mode: auto`, `selected_adapter` as either `agent-browser` or `playwright-cli`, and `adapter_health: ready`. If the final route is guided, inspect `node.reason`, `tools.<adapter>.reason`, the health-check error, and `recommendations`.

**Completion criterion:** `node.ready: true`, `mode: auto`, a selected adapter, and `adapter_health: ready`; or the user explicitly accepts guided mode.

## 4. First Sign-In and Run Boundaries

The first automated run opens a dedicated persistent browser session. Sign in to Google in that window yourself; the skill never asks for, receives, or stores your password.

Each run begins with a scope confirmation. During normal execution, the workflow pauses only before each source batch import and before each module is finalized. The agent handles prompt entry, result extraction, and note saving. Deletion, sharing, permission changes, overwrites, and tool installation still require separate confirmation.

## 5. Troubleshooting

- `node: command not found`: restart the terminal and inspect `PATH`.
- `node.reason` is `unsupported-version`: upgrade to the documented minimum and rerun detection.
- Adapter `reason` is `not-found`: install either adapter above, then rerun detection.
- Adapter `reason` is `version-check-failed`: run that CLI with `--version`, fix the reported issue, and retry.
- Google sign-in expired: sign in again inside the dedicated session; never paste credentials into the agent chat.
- NotebookLM UI cannot be identified: the skill retries at most twice, then stops at the last verified checkpoint and hands control to guided mode.

For automation preconditions, batch gates, and exception handling, see the [Browser Automation Contract](../references/automation.md).
