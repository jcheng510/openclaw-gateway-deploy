import "./subagent-lifecycle-events-CDQCTuLB.mjs";
//#region src/agents/subagents/registry/subagent-session-metrics.ts
/**
* Subagent session metric helpers.
*
* Derives display/runtime status from partial live, archived, or recovered registry records.
*/
/** Returns a recorded execution start, never the earlier admission time. */
function getSubagentSessionStartedAt(entry) {
	if (!entry) return;
	if (typeof entry.sessionStartedAt === "number" && Number.isFinite(entry.sessionStartedAt)) return entry.sessionStartedAt;
	if (typeof entry.execution.startedAt === "number" && Number.isFinite(entry.execution.startedAt)) return entry.execution.startedAt;
}
/** Computes accumulated runtime including the current live run when still active. */
function getSubagentSessionRuntimeMs(entry, now = Date.now()) {
	if (!entry) return;
	const accumulatedRuntimeMs = typeof entry.accumulatedRuntimeMs === "number" && Number.isFinite(entry.accumulatedRuntimeMs) ? Math.max(0, entry.accumulatedRuntimeMs) : 0;
	const startedAt = entry.execution.startedAt;
	if (typeof startedAt !== "number" || !Number.isFinite(startedAt)) return accumulatedRuntimeMs > 0 ? accumulatedRuntimeMs : void 0;
	const endedAt = entry.execution.endedAt;
	return Math.max(0, accumulatedRuntimeMs + Math.max(0, (typeof endedAt === "number" && Number.isFinite(endedAt) ? endedAt : now) - startedAt));
}
/** Maps persisted run outcome fields to the compact session status shown in tools/UI. */
function resolveSubagentSessionStatus(entry) {
	if (!entry) return;
	if (!entry.execution.endedAt) {
		if (entry.execution.status === "interrupted") return "interrupted";
		return entry.execution.status === "queued" ? "queued" : "running";
	}
	if (entry.endedReason === "subagent-killed") return "killed";
	const status = entry.execution.outcome?.status;
	if (status === "error" && entry.execution.interruptionReason === "gateway-restart") {
		const delivery = entry.delivery;
		return delivery && delivery.disposition !== "intentional_non_delivery" && (delivery.status === "failed" || delivery.status === "suspended" || delivery.status === "discarded") ? "failed" : "interrupted";
	}
	if (status === "error") return "failed";
	if (status === "timeout") return "timeout";
	return "done";
}
/** Formats the authoritative run status while preserving unfinished descendants. */
function resolveSubagentDisplayStatus(entry, pendingDescendants = 0) {
	const status = resolveSubagentSessionStatus(entry) ?? "done";
	const pending = Math.max(0, pendingDescendants);
	if (entry.pauseReason === "sessions_yield" && status !== "killed" && status !== "failed" && status !== "timeout") return pending > 0 ? `waiting on ${pending} ${pending === 1 ? "child" : "children"}` : "waiting for external continuation";
	if (pending > 0) {
		const waiting = `waiting on ${pending} ${pending === 1 ? "child" : "children"}`;
		return status === "running" || status === "done" ? `active (${waiting})` : `${status} (${waiting})`;
	}
	return status;
}
//#endregion
export { resolveSubagentSessionStatus as i, getSubagentSessionStartedAt as n, resolveSubagentDisplayStatus as r, getSubagentSessionRuntimeMs as t };
