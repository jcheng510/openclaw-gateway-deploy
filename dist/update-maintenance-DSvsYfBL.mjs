import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { n as quotePowerShellArg, t as quoteCliArg } from "./quote-cli-arg-BEt71TUh.mjs";
import { n as awaitWithinDeadline, t as ABSOLUTE_DEADLINE_EXPIRED } from "./absolute-deadline-C4A1_R9J.mjs";
import fs from "node:fs/promises";
//#region src/infra/update-maintenance.ts
const UPDATE_CLEANUP_BUDGET_MS = 3e5;
function formatUpdateCleanupCommand(directory) {
	return process.platform === "win32" ? `Remove-Item -LiteralPath ${quotePowerShellArg(directory)} -Recurse -Force` : `rm -rf -- ${quoteCliArg(directory)}`;
}
/** Only disposable directories owned by this update, never recovery originals. */
async function cleanupUpdateTemporaryDirectory(params) {
	const started = Date.now();
	const monotonicDeadline = performance.now() + UPDATE_CLEANUP_BUDGET_MS;
	const recordProgress = (reason, completed = false) => params.onProgress?.({
		step: params.name,
		status: completed ? "completed" : "in_progress",
		startedAtMs: started,
		...completed ? {
			endedAtMs: Date.now(),
			exitCode: 0
		} : {},
		detail: `Temporary-copy cleanup ${params.directory}; ${reason}; budget=${UPDATE_CLEANUP_BUDGET_MS}ms (5 minutes for large copies on slow disks); deadline=${new Date(started + UPDATE_CLEANUP_BUDGET_MS).toISOString()}.`
	});
	recordProgress(`waiting for ${params.canRemove ? "directory custody verification" : "filesystem removal"}`);
	let canRemove = false;
	let expired = false;
	let failure;
	try {
		expired = await awaitWithinDeadline(async () => {
			if (!(!params.canRemove || await params.canRemove()) || expired || performance.now() >= monotonicDeadline) return;
			canRemove = true;
			if (params.canRemove) recordProgress("waiting for filesystem removal");
			await fs.rm(params.directory, {
				recursive: true,
				force: true
			});
		}, monotonicDeadline, () => performance.now()) === ABSOLUTE_DEADLINE_EXPIRED;
	} catch (error) {
		failure = formatErrorMessage(error);
	}
	if (canRemove && failure === void 0 && !expired) {
		recordProgress("removed disposable temporary copy", true);
		return;
	}
	const command = canRemove ? formatUpdateCleanupCommand(params.directory) : "";
	const reason = expired ? `Temporary-copy cleanup budget expired after ${UPDATE_CLEANUP_BUDGET_MS}ms.` : failure ?? "Directory ownership could not be verified.";
	params.onWarning({
		name: params.name,
		command,
		cwd: params.root,
		durationMs: Date.now() - started,
		exitCode: expired ? null : 1,
		...expired ? { termination: "timeout" } : {},
		stderrTail: reason,
		advisory: {
			kind: "recoverable-maintenance",
			message: canRemove ? expired ? `Stopped waiting for ${params.name}. Temporary-copy removal may still be finishing. If ${params.directory} remains after the updater exits, remove it with: ${command}. Reason: ${reason}` : `Skipped ${params.name}. Remove the retained temporary copy with: ${command}. Reason: ${reason}` : `Skipped ${params.name}: ownership could not be verified for ${params.directory}. Inspect that path before removing any files.${failure !== void 0 || expired ? ` Reason: ${reason}` : ""}`
		}
	});
}
//#endregion
export { cleanupUpdateTemporaryDirectory as n, formatUpdateCleanupCommand as r, UPDATE_CLEANUP_BUDGET_MS as t };
