#!/usr/bin/env node
import { t as resolveCliArgvInvocation } from "./argv-invocation-vUYXxKSU.mjs";
import { n as tryRunUpdateAdmissionBeforeStartup } from "./run-main-update-admission-NonLk9mD.mjs";
import { t as isMainModule } from "./is-main-DYSvvM1W.mjs";
import { existsSync } from "node:fs";
import process from "node:process";
import { fileURLToPath } from "node:url";
//#region src/index.ts
const isMain = isMainModule({ currentFile: fileURLToPath(import.meta.url) });
const handledAdmission = isMain && await tryRunUpdateAdmissionBeforeStartup(resolveCliArgvInvocation(process.argv));
const packageRootUrl = new URL("../", import.meta.url);
if (!handledAdmission && !existsSync(new URL("entry.ts", import.meta.url)) && (existsSync(new URL(".openclaw-lifecycle-pending", packageRootUrl)) || existsSync(new URL("dist/openclaw-install-guard", packageRootUrl)))) {
	const { completePendingPackageLifecycle } = await import("./infra/package-lifecycle.js");
	try {
		await completePendingPackageLifecycle({ packageRoot: fileURLToPath(packageRootUrl) });
	} catch (error) {
		throw new Error(`OpenClaw package lifecycle is incomplete. Reinstall with package scripts enabled, then retry. ${error instanceof Error ? error.message : String(error)}`, { cause: error });
	}
}
const [{ formatCliFailureLines, formatCliJsonFailure, isExpectedCliError }, { isJsonOutputModeActive }, { runCliWithExitFinalization }, { withCliProcessScope }, { installDistEsmResolveFastPath }, { tryHandleRootVersionFastPath }, { formatUncaughtError }, { runFatalErrorHooks }, { installUnhandledRejectionHandler, isBenignUncaughtExceptionError, isUncaughtExceptionHandled }] = await Promise.all([
	import("./failure-output-CyDWgJbC.mjs"),
	import("./json-output-mode-CObM-WjA.mjs"),
	import("./one-shot-exit-CQQ5ZQ-i.mjs"),
	import("./runtime-cleanup-scope-CPV3WiOc.mjs"),
	import("./entry.esm-resolve-fast-path-nYOOyhlm.mjs"),
	import("./entry.version-fast-path-wYaTxm_c.mjs"),
	import("./infra/errors.js"),
	import("./fatal-error-hooks-Q7ktJSt7.mjs"),
	import("./unhandled-rejections-DKRB30Pe.mjs")
]);
let applyTemplate;
let createDefaultDeps;
let deriveSessionKey;
let describePortOwner;
let ensureBinary;
let ensurePortAvailable;
let getReplyFromConfig;
let handlePortError;
let loadConfig;
/** @deprecated Use SQLite-backed session APIs. Scheduled for removal after 2026-10-12. */
let loadSessionStore;
let monitorWebChannel;
let normalizeE164;
let PortInUseError;
let promptYesNo;
let resolveSessionKey;
let resolveStorePath;
let runCommandWithTimeout;
let runExec;
/** @deprecated Use SQLite-backed session APIs. Scheduled for removal after 2026-10-12. */
let saveSessionStore;
let waitForever;
async function loadLegacyCliDeps() {
	const { runCli } = await import("./cli/run-main.js");
	return { runCli };
}
async function runLegacyCliEntry(argv = process.argv, deps, options) {
	const { runCli } = deps ?? await loadLegacyCliDeps();
	await runCli(argv, options);
}
if (isMain && !handledAdmission) installDistEsmResolveFastPath(import.meta.url);
const handledRootVersion = isMain && !handledAdmission && tryHandleRootVersionFastPath(process.argv);
if (!isMain) ({applyTemplate, createDefaultDeps, deriveSessionKey, describePortOwner, ensureBinary, ensurePortAvailable, getReplyFromConfig, handlePortError, loadConfig, loadSessionStore, monitorWebChannel, normalizeE164, PortInUseError, promptYesNo, resolveSessionKey, resolveStorePath, runCommandWithTimeout, runExec, saveSessionStore, waitForever} = await import("./library-BKqibvZy.mjs"));
if (isMain && !handledRootVersion && !handledAdmission) {
	const { defaultRuntime, restoreRuntimeTerminalState } = await import("./runtime-pvh-jBbt.mjs");
	installUnhandledRejectionHandler();
	process.on("uncaughtException", (error) => {
		if (isUncaughtExceptionHandled(error)) return;
		if (isBenignUncaughtExceptionError(error)) {
			console.warn("[openclaw] Non-fatal uncaught exception (continuing):", formatUncaughtError(error));
			return;
		}
		if (isJsonOutputModeActive(process.argv)) defaultRuntime.writeJson(formatCliJsonFailure(error));
		for (const line of formatCliFailureLines({
			title: "OpenClaw hit an unexpected runtime error.",
			error,
			argv: process.argv
		})) console.error(line);
		for (const message of runFatalErrorHooks({
			reason: "uncaught_exception",
			error
		})) console.error("[openclaw]", message);
		restoreRuntimeTerminalState("uncaught exception", { resumeStdinIfPaused: false });
		process.exit(1);
	});
	runCliWithExitFinalization({
		run: () => withCliProcessScope(() => runLegacyCliEntry(process.argv, void 0, { retainConsoleRoutingUntilProcessExit: true })),
		onError: (err) => {
			if (isJsonOutputModeActive(process.argv)) defaultRuntime.writeJson(formatCliJsonFailure(err));
			for (const line of formatCliFailureLines({
				title: "The CLI command failed.",
				error: err,
				argv: process.argv
			})) console.error(line);
			if (!isExpectedCliError(err)) for (const message of runFatalErrorHooks({
				reason: "legacy_cli_failure",
				error: err
			})) console.error("[openclaw]", message);
			restoreRuntimeTerminalState("legacy cli failure", { resumeStdinIfPaused: false });
			process.exitCode = 1;
		}
	});
}
//#endregion
export { PortInUseError, applyTemplate, createDefaultDeps, deriveSessionKey, describePortOwner, ensureBinary, ensurePortAvailable, getReplyFromConfig, handlePortError, loadConfig, loadSessionStore, monitorWebChannel, normalizeE164, promptYesNo, resolveSessionKey, resolveStorePath, runCommandWithTimeout, runExec, runLegacyCliEntry, saveSessionStore, waitForever };
