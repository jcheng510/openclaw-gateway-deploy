import { t as parseNodeOptionsEnvVar } from "./node-options-W869vrJq.mjs";
import { i as runCommandWithTimeout } from "./exec-Bjx7k3vE.mjs";
import { t as resolveServiceManagerEnv } from "./service-process-env-DzXjpjx4.mjs";
import { i as assertGatewayServiceUpdateCurrent } from "./service-update-authority-CVLjmQiA.mjs";
import { n as publishServiceFile } from "./service-stage-fQ3IJFe-.mjs";
import { d as hasGatewayServiceEnvironmentOverride, o as resolveServiceEntrypointIndex, p as resolveManagedGatewayServiceCommand } from "./service-layout-BP96VEeH.mjs";
import path from "node:path";
import fs from "node:fs/promises";
import os from "node:os";
//#region src/daemon/gateway-heap.ts
/** Adaptive Node heap policy for the managed Gateway service. */
const MEBIBYTE_BYTES = 1048576;
const GATEWAY_HEAP_FLOOR_MIB = 2048;
const GATEWAY_HEAP_CAP_MIB = 8192;
function readAvailableMemory(params) {
	const constrainedMemoryBytes = params.constrainedMemoryBytes ?? process.constrainedMemory();
	const physicalMemoryBytes = params.physicalMemoryBytes ?? os.totalmem();
	const validPhysical = Number.isSafeInteger(physicalMemoryBytes) && physicalMemoryBytes > 0;
	if (Number.isSafeInteger(constrainedMemoryBytes) && constrainedMemoryBytes > 0 && (!validPhysical || constrainedMemoryBytes <= physicalMemoryBytes)) return {
		bytes: constrainedMemoryBytes,
		source: "constrained"
	};
	return {
		bytes: validPhysical ? physicalMemoryBytes : null,
		source: validPhysical ? "physical" : "unknown"
	};
}
function resolveGatewayHeapLimit(params = {}) {
	const memory = readAvailableMemory(params);
	if (memory.bytes === null || memory.bytes < 2 * MEBIBYTE_BYTES) return {
		maxOldSpaceSizeMiB: null,
		availableMemoryMiB: null,
		memorySource: "unknown",
		floorMiB: GATEWAY_HEAP_FLOOR_MIB,
		capMiB: GATEWAY_HEAP_CAP_MIB,
		headroomCapMiB: null
	};
	const availableMemoryMiB = Math.floor(memory.bytes / MEBIBYTE_BYTES);
	const halfMemoryMiB = Math.floor(availableMemoryMiB / 2);
	const capMiB = Math.max(GATEWAY_HEAP_CAP_MIB, Math.floor(availableMemoryMiB / 4));
	const headroomCapMiB = Math.floor(availableMemoryMiB * .75);
	return {
		maxOldSpaceSizeMiB: Math.min(capMiB, Math.max(GATEWAY_HEAP_FLOOR_MIB, halfMemoryMiB), headroomCapMiB),
		availableMemoryMiB,
		memorySource: memory.source,
		floorMiB: GATEWAY_HEAP_FLOOR_MIB,
		capMiB,
		headroomCapMiB
	};
}
function parseHeapControls(tokens) {
	const controls = /* @__PURE__ */ new Map();
	for (let index = 0; index < tokens.length; index += 1) {
		const token = tokens[index] ?? "";
		if (token === "--") break;
		const match = /^(--max(?:[-_]old[-_]space[-_]size(?:[-_]percentage)?|[-_]heap[-_]size))(?:=(.*))?$/u.exec(token);
		if (!match) continue;
		const flag = (match[1] ?? "").replaceAll("_", "-");
		const rawValue = match[2] ?? tokens[++index] ?? "";
		const value = Number(rawValue);
		if (flag.endsWith("-percentage") ? Number.isFinite(value) && value > 0 && value <= 100 : /^\+?\d+$/u.test(rawValue) && Number.isSafeInteger(value) && value >= 0) controls.set(flag, value);
	}
	return Array.from(controls, ([flag, value]) => `${flag}=${value}`);
}
function resolveGatewayHeapNodeOptions(existingNodeOptions, runtime = "node") {
	const controls = parseHeapControls(parseNodeOptionsEnvVar(existingNodeOptions) ?? []).join(" ");
	if (controls || runtime !== "bun") return controls;
	const limit = resolveGatewayHeapLimit().maxOldSpaceSizeMiB;
	return limit === null ? "" : `--max-old-space-size=${Math.min(GATEWAY_HEAP_CAP_MIB, limit)}`;
}
function readServiceHeapExecArgv(programArguments) {
	const entrypointIndex = resolveServiceEntrypointIndex(programArguments);
	return parseHeapControls(programArguments.slice(1, entrypointIndex ?? 1));
}
function resolveGatewayHeapExecArgv(existingCommand) {
	const managed = resolveManagedGatewayServiceCommand(existingCommand);
	const existing = readServiceHeapExecArgv(managed?.programArguments ?? []);
	if (existing.length || resolveGatewayHeapNodeOptions(managed?.environment?.NODE_OPTIONS) || hasGatewayServiceEnvironmentOverride(existingCommand, ["NODE_OPTIONS"])) return existing;
	const limit = resolveGatewayHeapLimit().maxOldSpaceSizeMiB;
	return limit === null ? [] : [`--max-old-space-size=${limit}`];
}
function inspectGatewayHeapLimit(nodeOptions, memory = {}, programArguments = []) {
	return {
		...resolveGatewayHeapLimit(memory),
		nodeOptions: resolveGatewayHeapNodeOptions(nodeOptions),
		execArgv: readServiceHeapExecArgv(programArguments)
	};
}
function formatGatewayHeapLimitReport(report) {
	return `${[report.nodeOptions ? `service NODE_OPTIONS: ${report.nodeOptions}` : "", report.execArgv.length ? `service argv: ${report.execArgv.join(" ")}` : ""].filter(Boolean).join("; ") || "no service heap control"}; installer recommendation: ${report.maxOldSpaceSizeMiB === null ? "unavailable (unknown capacity; use Node default)" : `${report.maxOldSpaceSizeMiB} MiB old space (${report.availableMemoryMiB} MiB ${report.memorySource} capacity; adaptive cap ${report.capMiB} MiB; native headroom cap ${report.headroomCapMiB} MiB)`}; runtime V8 ceiling: not measured`;
}
//#endregion
//#region src/daemon/schtasks-exec.ts
/** Executes Windows Task Scheduler commands with daemon-friendly timeouts. */
const SCHTASKS_TIMEOUT_MS = 15e3;
const SCHTASKS_NO_OUTPUT_TIMEOUT_MS = 3e4;
/** Runs Windows schtasks with bounded timeouts and normalized process results. */
async function execSchtasks(args) {
	assertGatewayServiceUpdateCurrent();
	const result = await runCommandWithTimeout(["schtasks", ...args], {
		baseEnv: resolveServiceManagerEnv(),
		timeoutMs: SCHTASKS_TIMEOUT_MS,
		noOutputTimeoutMs: SCHTASKS_NO_OUTPUT_TIMEOUT_MS
	});
	const timeoutDetail = result.termination === "timeout" ? `schtasks timed out after ${SCHTASKS_TIMEOUT_MS}ms` : result.termination === "no-output-timeout" ? `schtasks produced no output for ${SCHTASKS_NO_OUTPUT_TIMEOUT_MS}ms` : result.termination !== "exit" ? "schtasks command terminated before confirmed completion" : "";
	return {
		stdout: result.stdout,
		stderr: result.stderr || timeoutDetail,
		code: result.termination === "exit" ? result.code ?? 1 : result.code || 124
	};
}
//#endregion
//#region src/daemon/schtasks-xml.ts
function escapeXmlText(value) {
	return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
function buildScheduledTaskXml(params) {
	const description = escapeXmlText(params.taskDescription);
	const command = escapeXmlText(params.launchPath);
	const principalLogon = params.taskUser ? `\n      <UserId>${escapeXmlText(params.taskUser)}</UserId>\n      <LogonType>InteractiveToken</LogonType>` : "\n      <GroupId>S-1-5-32-545</GroupId>";
	return `<?xml version="1.0" encoding="UTF-16"?>
<Task version="1.2" xmlns="http://schemas.microsoft.com/windows/2004/02/mit/task">
  <RegistrationInfo>
    <Description>${description}</Description>
  </RegistrationInfo>
  <Triggers>
    <LogonTrigger>
      <Enabled>true</Enabled>${params.taskUser ? `\n      <UserId>${escapeXmlText(params.taskUser)}</UserId>` : ""}
    </LogonTrigger>
  </Triggers>
  <Principals>
    <Principal id="Author">${principalLogon}
      <RunLevel>LeastPrivilege</RunLevel>
    </Principal>
  </Principals>
  <Settings>
    <MultipleInstancesPolicy>IgnoreNew</MultipleInstancesPolicy>
    <DisallowStartIfOnBatteries>false</DisallowStartIfOnBatteries>
    <StopIfGoingOnBatteries>false</StopIfGoingOnBatteries>
    <AllowHardTerminate>true</AllowHardTerminate>
    <StartWhenAvailable>false</StartWhenAvailable>
    <RunOnlyIfNetworkAvailable>false</RunOnlyIfNetworkAvailable>
    <IdleSettings>
      <StopOnIdleEnd>false</StopOnIdleEnd>
      <RestartOnIdle>false</RestartOnIdle>
    </IdleSettings>
    <AllowStartOnDemand>true</AllowStartOnDemand>
    <Enabled>true</Enabled>
    <Hidden>false</Hidden>
    <RunOnlyIfIdle>false</RunOnlyIfIdle>
    <WakeToRun>false</WakeToRun>
    <ExecutionTimeLimit>PT0S</ExecutionTimeLimit>
    <RestartOnFailure>
      <Interval>PT1M</Interval>
      <Count>3</Count>
    </RestartOnFailure>
    <Priority>7</Priority>
  </Settings>
  <Actions Context="Author">
    <Exec>
      <Command>${command}</Command>
    </Exec>
  </Actions>
</Task>`;
}
async function writeTaskXmlTempFile(xml) {
	const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "openclaw-task-xml-"));
	const xmlPath = path.join(tmpDir, "task.xml");
	const bom = Buffer.from([255, 254]);
	const body = Buffer.from(xml, "utf16le");
	await publishServiceFile({
		filePath: xmlPath,
		contents: Buffer.concat([bom, body]),
		mode: 384
	});
	return xmlPath;
}
//#endregion
export { inspectGatewayHeapLimit as a, resolveGatewayHeapNodeOptions as c, formatGatewayHeapLimitReport as i, writeTaskXmlTempFile as n, readServiceHeapExecArgv as o, execSchtasks as r, resolveGatewayHeapExecArgv as s, buildScheduledTaskXml as t };
