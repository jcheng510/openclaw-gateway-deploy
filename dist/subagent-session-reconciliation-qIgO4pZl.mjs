import { s as asFiniteNumber } from "./number-coercion-Dq1l5muL.mjs";
import { u as withExistingOpenClawStateDatabaseCurrentReadOnly } from "./openclaw-state-db-readonly-DE3MB0wy.mjs";
import { l as resolveAgentIdFromSessionKey } from "./session-key-BC4m_Ly5.mjs";
import { l as resolveSessionStorePathCore } from "./paths-CQ3zRaeb.mjs";
import { l as getAgentRunContext, m as listAgentRunsForSession } from "./agent-run-registry-BDW3IRlF.mjs";
import { r as getRuntimeConfig } from "./io.runtime-BOdk1dW9.mjs";
import "./config-D1R2igem.mjs";
import { c as loadSessionEntryReadOnly } from "./session-accessor.sqlite-entry-C87Sde4p.mjs";
import "./session-accessor-CGLseszP.mjs";
import { s as withSessionEntryReadOnlyInWorker } from "./session-entry-read-runtime-e6OehipM.mjs";
import "./sessions-Db5eEwNA.mjs";
import { i as isStaleUnendedSubagentRun, v as subagentRuns } from "./subagent-run-liveness-CjqSkJZp.mjs";
import { a as SUBAGENT_ENDED_REASON_ERROR, i as SUBAGENT_ENDED_REASON_COMPLETE, o as SUBAGENT_ENDED_REASON_KILLED } from "./subagent-lifecycle-events-CDQCTuLB.mjs";
import { t as hasSubagentSessionOwnerInDatabase, w as hasRetainedRequiredCompletionDelivery } from "./subagent-registry.store.sqlite-DQWBMoqK.mjs";
//#region src/agents/subagents/registry/subagent-session-reconciliation.ts
/**
* Subagent session-store reconciliation.
*
* Infers child completion from persisted session entries when registry updates arrive late.
*/
function terminalSessionTimestamp(sessionEntry) {
	return asFiniteNumber(sessionEntry?.endedAt) ?? asFiniteNumber(sessionEntry?.updatedAt);
}
function isFreshForRun(sessionEntry, notBeforeMs) {
	if (notBeforeMs === void 0) return true;
	const terminalAt = terminalSessionTimestamp(sessionEntry);
	return terminalAt !== void 0 && terminalAt >= notBeforeMs;
}
function freshSessionStartedAt(sessionEntry, notBeforeMs) {
	const startedAt = asFiniteNumber(sessionEntry?.startedAt);
	if (startedAt === void 0) return;
	return notBeforeMs === void 0 || startedAt >= notBeforeMs ? startedAt : void 0;
}
/** Read the current child entry; session-key scope also selects incognito storage. */
function loadSubagentSessionEntry(params) {
	const key = params.childSessionKey.trim();
	if (!key) return;
	const agentId = resolveAgentIdFromSessionKey(key);
	const cfg = params.cfg ?? getRuntimeConfig();
	const storePath = resolveSessionStorePathCore(cfg.session?.store, { agentId });
	return loadSessionEntryReadOnly({
		agentId,
		storePath,
		sessionKey: key,
		clone: false
	});
}
/** Resolves whether a registry row is orphaned from its child session entry. */
function resolveSubagentRunOrphanReason(params) {
	const { entry } = params;
	if (entry.execution.outcome || entry.collectorCompletion || entry.requesterSettleWake || hasRetainedRequiredCompletionDelivery(entry) || entry.pauseReason || entry.killIntent || entry.killReconciliation || entry.execution.restartRecovery || entry.terminalOwner === "interrupted-recovery" || entry.suppressAnnounceReason === "steer-restart" || entry.execution.status === "queued" || getAgentRunContext(entry.runId)) return null;
	const childSessionKey = params.entry.childSessionKey?.trim();
	if (!childSessionKey) return "missing-session-entry";
	try {
		const sessionEntry = loadSubagentSessionEntry({
			childSessionKey,
			cfg: params.cfg
		});
		if (!sessionEntry) return "missing-session-entry";
		if (typeof sessionEntry.sessionId !== "string" || !sessionEntry.sessionId.trim()) return "missing-session-id";
		if (params.includeStaleUnended === true && sessionEntry.abortedLastRun !== true && params.entry.execution.status !== "interrupted" && isStaleUnendedSubagentRun(params.entry, params.now)) return "stale-unended-run";
		return null;
	} catch {
		return null;
	}
}
/** Convert persisted session status into a subagent completion outcome. */
function resolveCompletionFromSessionEntry(sessionEntry, fallbackEndedAt, opts) {
	const status = sessionEntry?.status;
	if (status === "running" || status === "interrupted" || !isFreshForRun(sessionEntry, opts?.notBeforeMs)) return null;
	let outcome;
	let reason = SUBAGENT_ENDED_REASON_COMPLETE;
	switch (status) {
		case "failed":
			outcome = {
				status: "error",
				error: "session completed before registry settled"
			};
			reason = SUBAGENT_ENDED_REASON_ERROR;
			break;
		case "killed":
			outcome = {
				status: "error",
				error: "subagent run terminated"
			};
			reason = SUBAGENT_ENDED_REASON_KILLED;
			break;
		case "timeout":
			outcome = { status: "timeout" };
			break;
		default:
			if (status !== "done" && typeof sessionEntry?.endedAt !== "number") return null;
			outcome = { status: "ok" };
	}
	return {
		startedAt: freshSessionStartedAt(sessionEntry, opts?.notBeforeMs),
		endedAt: terminalSessionTimestamp(sessionEntry) ?? fallbackEndedAt,
		outcome,
		reason
	};
}
/** Resolve child completion by reading its persisted session entry. */
async function resolveSubagentSessionCompletion(params) {
	return withSubagentSessionEntry(params, (entry) => resolveCompletionFromSessionEntry(entry, params.fallbackEndedAt, { notBeforeMs: params.notBeforeMs }));
}
async function withSubagentSessionEntry(params, consume) {
	const agentId = resolveAgentIdFromSessionKey(params.childSessionKey);
	const cfg = params.cfg ?? getRuntimeConfig();
	const storePath = resolveSessionStorePathCore(cfg.session?.store, { agentId });
	return withSessionEntryReadOnlyInWorker({
		agentId,
		storePath,
		sessionKey: params.childSessionKey
	}, () => params.assertCurrent?.(), async (read) => {
		if (!read.ok) throw read.error;
		return consume(read.value);
	});
}
/** Resolve a fresh child session start time for lifecycle reconciliation. */
async function resolveSubagentSessionStartedAt(params) {
	return withSubagentSessionEntry(params, (entry) => isFreshForRun(entry, params.notBeforeMs) ? freshSessionStartedAt(entry, params.notBeforeMs) : void 0);
}
/** Startup may only settle session-only rows; any run/task generation retains ownership. */
function hasSubagentSessionRecoveryOwner(params) {
	const key = params.sessionKey;
	if (listAgentRunsForSession(params).length > 0) return true;
	for (const run of subagentRuns.values()) if (run.childSessionKey === key || run.requesterSessionKey === key || run.controllerSessionKey === key) return true;
	return withExistingOpenClawStateDatabaseCurrentReadOnly((database) => hasSubagentSessionOwnerInDatabase(database, key), { env: params.env }) ?? false;
}
//#endregion
export { resolveSubagentSessionCompletion as a, resolveSubagentRunOrphanReason as i, loadSubagentSessionEntry as n, resolveSubagentSessionStartedAt as o, resolveCompletionFromSessionEntry as r, hasSubagentSessionRecoveryOwner as t };
