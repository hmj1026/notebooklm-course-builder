import assert from "node:assert/strict";
import test from "node:test";

import {
  detectBrowserTools,
  formatHumanResult,
  inspectNodeRuntime,
  probeCommand,
  runCli,
} from "../scripts/detect-browser-tools.mjs";

function probeFrom(results) {
  return (command) => results[command] ?? {
    available: false,
    ready: false,
    version: null,
    reason: "not-found",
  };
}

test("prefers agent-browser when both adapters are ready", () => {
  const result = detectBrowserTools({
    probe: probeFrom({
      "agent-browser": {
        available: true,
        ready: true,
        version: "agent-browser 1.2.3",
        reason: null,
      },
      "playwright-cli": {
        available: true,
        ready: true,
        version: "0.1.19",
        reason: null,
      },
    }),
  });

  assert.equal(result.schema, "notebooklm.browser-preflight.v1");
  assert.equal(result.mode, "auto");
  assert.equal(result.selected_adapter, "agent-browser");
  assert.equal(result.tools["agent-browser"].version, "agent-browser 1.2.3");
});

test("falls back to playwright-cli when agent-browser is not ready", () => {
  const result = detectBrowserTools({
    probe: probeFrom({
      "agent-browser": {
        available: true,
        ready: false,
        version: null,
        reason: "version-check-failed",
      },
      "playwright-cli": {
        available: true,
        ready: true,
        version: "0.1.19",
        reason: null,
      },
    }),
  });

  assert.equal(result.mode, "auto");
  assert.equal(result.selected_adapter, "playwright-cli");
});

test("fails closed when the Node.js runtime is below the supported baseline", () => {
  const result = detectBrowserTools({
    nodeVersion: "22.7.9",
    probe: probeFrom({
      "agent-browser": {
        available: true,
        ready: true,
        version: "agent-browser 1.2.3",
        reason: null,
      },
    }),
  });

  assert.equal(result.mode, "guided");
  assert.equal(result.selected_adapter, null);
  assert.deepEqual(result.node, {
    version: "22.7.9",
    required: ">=22.8.0",
    ready: false,
    reason: "unsupported-version",
  });
});

test("Node.js runtime inspection handles the boundary and invalid versions", () => {
  assert.equal(inspectNodeRuntime("22.8.0").ready, true);
  assert.equal(inspectNodeRuntime("23.0.0").ready, true);
  assert.equal(inspectNodeRuntime("22.7.99").ready, false);
  assert.equal(inspectNodeRuntime("unknown").reason, "unparseable-version");
});

test("uses guided mode and returns install help when no adapter is ready", () => {
  const result = detectBrowserTools({ probe: probeFrom({}) });

  assert.equal(result.mode, "guided");
  assert.equal(result.selected_adapter, null);
  assert.deepEqual(
    result.recommendations.map(({ tool }) => tool),
    ["agent-browser", "playwright-cli"],
  );
  assert.match(result.recommendations[0].cli_install, /agent-browser install/);
  assert.match(result.recommendations[1].skill_install, /microsoft\/playwright-cli/);
});

test("human output exposes the selected adapter and degraded tools", () => {
  const result = detectBrowserTools({
    probe: probeFrom({
      "playwright-cli": {
        available: true,
        ready: true,
        version: "0.1.19",
        reason: null,
      },
    }),
  });

  const output = formatHumanResult(result);

  assert.match(output, /Automation mode: auto/);
  assert.match(output, /Selected adapter: playwright-cli/);
  assert.match(output, /agent-browser: unavailable \(not-found\)/);
  assert.match(output, /playwright-cli: ready \(0\.1\.19\)/);
});

test("command probing distinguishes missing, broken, and ready tools", () => {
  const missing = probeCommand("missing", {
    spawn: () => ({ error: { code: "ENOENT" } }),
  });
  const broken = probeCommand("broken", {
    spawn: () => ({ status: 1, stdout: "", stderr: "boom" }),
  });
  const ready = probeCommand("ready", {
    spawn: () => ({ status: 0, stdout: "tool 2.4.0\n", stderr: "" }),
  });
  const readyFromStderr = probeCommand("ready-stderr", {
    spawn: () => ({ status: 0, stdout: "", stderr: "tool 3.0.0\n" }),
  });
  const inaccessible = probeCommand("inaccessible", {
    spawn: () => ({ error: { code: "EACCES" } }),
  });

  assert.deepEqual(missing, {
    available: false,
    ready: false,
    version: null,
    reason: "not-found",
  });
  assert.equal(broken.reason, "version-check-failed");
  assert.equal(ready.version, "tool 2.4.0");
  assert.equal(readyFromStderr.version, "tool 3.0.0");
  assert.equal(inaccessible.reason, "version-check-failed");
});

test("CLI emits JSON, help, and an error for unknown arguments", () => {
  const writes = { stdout: [], stderr: [] };
  const io = {
    stdout: { write: (value) => writes.stdout.push(value) },
    stderr: { write: (value) => writes.stderr.push(value) },
  };
  const detect = () => ({
    schema: "notebooklm.browser-preflight.v1",
    mode: "guided",
    selected_adapter: null,
    tools: {},
    recommendations: [],
  });

  assert.equal(runCli(["--json"], { ...io, detect }), 0);
  assert.equal(JSON.parse(writes.stdout[0]).mode, "guided");

  assert.equal(runCli(["--help"], io), 0);
  assert.match(writes.stdout[1], /Usage:/);

  assert.equal(runCli(["--wat"], io), 2);
  assert.match(writes.stderr[0], /Unknown argument: --wat/);

  const readyResult = detectBrowserTools({
    probe: probeFrom({
      "agent-browser": {
        available: true,
        ready: true,
        version: "agent-browser 1.2.3",
        reason: null,
      },
    }),
  });
  assert.equal(runCli([], { ...io, detect: () => readyResult }), 0);
  assert.match(writes.stdout[2], /Selected adapter: agent-browser/);
});
