#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const MIN_NODE_VERSION = Object.freeze([22, 8, 0]);

const TOOL_DEFINITIONS = Object.freeze([
  Object.freeze({
    name: "agent-browser",
    skill_install: "npx skills add vercel-labs/agent-browser",
    cli_install: "npm install -g agent-browser && agent-browser install",
  }),
  Object.freeze({
    name: "playwright-cli",
    skill_install:
      "npx skills add https://github.com/microsoft/playwright-cli --skill playwright-cli",
    cli_install: "npm install -g @playwright/cli@latest",
  }),
]);

export function inspectNodeRuntime(version = process.versions.node) {
  const match = /^v?(\d+)\.(\d+)\.(\d+)/u.exec(version);

  if (!match) {
    return Object.freeze({
      version,
      required: ">=22.8.0",
      ready: false,
      reason: "unparseable-version",
    });
  }

  const actual = match.slice(1).map(Number);
  const ready = actual.some(
    (part, index) =>
      part > MIN_NODE_VERSION[index]
      && actual.slice(0, index).every(
        (previousPart, previousIndex) =>
          previousPart === MIN_NODE_VERSION[previousIndex],
      ),
  ) || actual.every((part, index) => part === MIN_NODE_VERSION[index]);

  return Object.freeze({
    version,
    required: ">=22.8.0",
    ready,
    reason: ready ? null : "unsupported-version",
  });
}

export function probeCommand(command, { spawn = spawnSync } = {}) {
  const result = spawn(command, ["--version"], {
    encoding: "utf8",
    windowsHide: true,
  });

  if (result.error?.code === "ENOENT") {
    return Object.freeze({
      available: false,
      ready: false,
      version: null,
      reason: "not-found",
    });
  }

  if (result.error || result.status !== 0) {
    return Object.freeze({
      available: true,
      ready: false,
      version: null,
      reason: "version-check-failed",
    });
  }

  const version = `${result.stdout ?? ""}\n${result.stderr ?? ""}`
    .split(/\r?\n/u)
    .map((line) => line.trim())
    .find(Boolean) ?? null;

  return Object.freeze({
    available: true,
    ready: true,
    version,
    reason: null,
  });
}

export function detectBrowserTools({
  probe = probeCommand,
  nodeVersion = process.versions.node,
} = {}) {
  const node = inspectNodeRuntime(nodeVersion);
  const tools = Object.fromEntries(
    TOOL_DEFINITIONS.map(({ name }) => [name, probe(name)]),
  );
  const selected = node.ready
    ? TOOL_DEFINITIONS.find(({ name }) => tools[name].ready)
    : null;

  return Object.freeze({
    schema: "notebooklm.browser-preflight.v1",
    mode: selected ? "auto" : "guided",
    selected_adapter: selected?.name ?? null,
    node,
    tools: Object.freeze(tools),
    recommendations: Object.freeze(
      TOOL_DEFINITIONS.map(({ name, skill_install, cli_install }) =>
        Object.freeze({ tool: name, skill_install, cli_install }),
      ),
    ),
  });
}

export function formatHumanResult(result) {
  const selected = result.selected_adapter ?? "none";
  const nodeStatus = result.node.ready ? "ready" : "unsupported";
  const toolLines = TOOL_DEFINITIONS.map(({ name }) => {
    const tool = result.tools[name];
    const status = tool.ready ? "ready" : "unavailable";
    const detail = tool.version ?? tool.reason;
    return `- ${name}: ${status} (${detail})`;
  });

  return [
    `Automation mode: ${result.mode}`,
    `Selected adapter: ${selected}`,
    `Node.js: ${nodeStatus} (${result.node.version}; requires ${result.node.required})`,
    ...toolLines,
  ].join("\n");
}

export function runCli(
  args,
  {
    stdout = process.stdout,
    stderr = process.stderr,
    detect = detectBrowserTools,
  } = {},
) {
  if (args.includes("--help") || args.includes("-h")) {
    stdout.write("Usage: node scripts/detect-browser-tools.mjs [--json]\n");
    return 0;
  }

  const unknownArgs = args.filter((arg) => arg !== "--json");
  if (unknownArgs.length > 0) {
    stderr.write(`Unknown argument: ${unknownArgs[0]}\n`);
    return 2;
  }

  const result = detect();
  const output = args.includes("--json")
    ? JSON.stringify(result, null, 2)
    : formatHumanResult(result);
  stdout.write(`${output}\n`);
  return 0;
}

const invokedPath = process.argv[1]
  ? pathToFileURL(process.argv[1]).href
  : null;

if (invokedPath === import.meta.url) {
  process.exitCode = runCli(process.argv.slice(2));
}
