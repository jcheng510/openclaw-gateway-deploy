import { R as timestampMsToIsoString } from "./number-coercion-Dq1l5muL.mjs";
import { A as parseAgentSessionKey } from "./session-key-BC4m_Ly5.mjs";
import { l as resolveSessionStorePathCore } from "./paths-CQ3zRaeb.mjs";
import { t as formatDurationCompact } from "./format-duration-BIQQYTeV.mjs";
import { c as loadSessionEntryReadOnly } from "./session-accessor.sqlite-entry-C87Sde4p.mjs";
import "./session-accessor-CGLseszP.mjs";
import { n as commandReply } from "./command-gates-D1OFbxXh.mjs";
import { n as formatTimeAgo } from "./format-relative-BxDvkn1P.mjs";
import { r as resolveSubagentDisplayStatus } from "./subagent-session-metrics-BQO41Z67.mjs";
import { r as sanitizeRunStatusText, t as formatRunLabel } from "./subagents-utils-DVlMB0me.mjs";
import { i as resolveSubagentEntryForToken } from "./shared-C5XqGm9F.mjs";
//#region src/auto-reply/reply/commands-subagents/action-info.ts
function formatTimestampWithAge(valueMs) {
	if (!valueMs || !Number.isFinite(valueMs) || valueMs <= 0) return "n/a";
	const timestamp = timestampMsToIsoString(valueMs);
	if (!timestamp) return "n/a";
	return `${timestamp} (${formatTimeAgo(Date.now() - valueMs, { fallback: "n/a" })})`;
}
function loadSubagentSessionEntry(params, childKey) {
	const parsed = parseAgentSessionKey(childKey);
	const storePath = resolveSessionStorePathCore(params.cfg.session?.store, { agentId: parsed?.agentId });
	return { entry: loadSessionEntryReadOnly({
		storePath,
		sessionKey: childKey,
		clone: false
	}) };
}
function handleSubagentsInfoAction(ctx) {
	const { params, readContext, restTokens } = ctx;
	const target = restTokens[0];
	if (!target) return commandReply("ℹ️ Usage: /subagents info <id|#>");
	const targetResolution = resolveSubagentEntryForToken(readContext.list.view, target);
	if ("reply" in targetResolution) return targetResolution.reply;
	const run = targetResolution.entry;
	const { entry: sessionEntry } = loadSubagentSessionEntry(params, run.childSessionKey);
	const runtime = run.execution.startedAt && Number.isFinite(run.execution.startedAt) ? formatDurationCompact((run.execution.endedAt ?? Date.now()) - run.execution.startedAt) ?? "n/a" : "n/a";
	const outcomeError = sanitizeRunStatusText(run.execution.outcome?.error, { errorContext: true });
	const outcome = run.execution.outcome ? `${run.execution.outcome.status}${outcomeError ? ` (${outcomeError})` : ""}` : "n/a";
	const taskText = sanitizeRunStatusText(run.task) || "n/a";
	const progressText = sanitizeRunStatusText(run.completion?.resultText);
	const taskSummaryText = sanitizeRunStatusText(run.delivery?.lastError, { errorContext: true });
	const taskErrorText = sanitizeRunStatusText(run.execution.outcome?.error, { errorContext: true });
	const lines = [
		"ℹ️ Subagent info",
		`Status: ${resolveSubagentDisplayStatus(run, readContext.list.pendingDescendants.get(run.childSessionKey) ?? 0)}`,
		`Label: ${formatRunLabel(run)}`,
		`Task: ${taskText}`,
		`Run: ${run.runId}`,
		`Session: ${run.childSessionKey}`,
		`SessionId: ${sessionEntry?.sessionId ?? "n/a"}`,
		`Runtime: ${runtime}`,
		`Created: ${formatTimestampWithAge(run.createdAt)}`,
		`Started: ${formatTimestampWithAge(run.execution.startedAt)}`,
		`Ended: ${formatTimestampWithAge(run.execution.endedAt)}`,
		`Cleanup: ${run.cleanup}`,
		run.archiveAtMs ? `Archive: ${formatTimestampWithAge(run.archiveAtMs)}` : void 0,
		run.cleanupHandled ? "Cleanup handled: yes" : void 0,
		`Outcome: ${outcome}`,
		progressText ? `Progress: ${progressText}` : void 0,
		taskSummaryText ? `Task summary: ${taskSummaryText}` : void 0,
		taskErrorText ? `Task error: ${taskErrorText}` : void 0,
		run.delivery ? `Delivery: ${run.delivery.status}` : void 0,
		run.delivery?.discardReason ? `Delivery disposition: ${run.delivery.discardReason}` : void 0,
		run.delivery?.discardedAt ? `Delivery retired: ${formatTimestampWithAge(run.delivery.discardedAt)}` : void 0
	].filter(Boolean);
	return commandReply(lines.join("\n"));
}
//#endregion
export { handleSubagentsInfoAction };
