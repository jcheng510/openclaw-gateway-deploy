import { n as normalizeAgentId } from "./agent-id-D1-Q6vR4.mjs";
import { A as parseAgentSessionKey } from "./session-key-BC4m_Ly5.mjs";
import { o as resolveSystemEventQueueKey } from "./system-event-ownership-Bp0P_EZz.mjs";
import { l as peekSystemEventEntries, t as consumeSelectedSystemEventEntries } from "./system-events-DzT7qucG.mjs";
import { S as loadExactSessionEntryReadOnly } from "./session-accessor.sqlite-pending-inputs-BdT_Tg9N.mjs";
import "./session-accessor-CGLseszP.mjs";
import { i as clearReplyRunForResetBySessionId } from "./reply-run-registry.registry-BhusvydJ.mjs";
import "./reply-run-registry-DtWQ30eU.mjs";
import { t as clearSessionQueues } from "./cleanup-cerzXDzF.mjs";
import { n as killSessionSubagentRuns } from "./subagent-control-kill-DnJQThSQ.mjs";
import { t as clearEmbeddedSessionPromptStates } from "./session-prompt-state-BmVcmgqy.mjs";
//#region src/auto-reply/reply/session-reset-cleanup.ts
/** Clears reset-related queues and system events for session keys. */
var SessionResetCleanupError = class extends Error {};
/** Bind runtime cleanup to the parent incarnation accepted before asynchronous work. */
function createSessionResetCleanupGuard(params) {
	const sessionId = params.expectedSession?.sessionId;
	const lifecycleRevision = params.expectedSession?.lifecycleRevision;
	return () => {
		params.assertCurrent?.();
		const current = loadExactSessionEntryReadOnly({
			storePath: params.storePath,
			sessionKey: params.sessionKey,
			clone: false
		})?.entry;
		if (current?.sessionId !== sessionId || current?.lifecycleRevision !== lifecycleRevision) throw new SessionResetCleanupError("Reset did not complete because the session changed before cleanup. Retry /reset.");
	};
}
/** Reset must report unfinished child cleanup before committing a fresh conversation. */
async function stopSessionResetSubagents(params) {
	try {
		params.assertCurrent();
		const result = await killSessionSubagentRuns(params);
		params.assertCurrent();
		if (result.status === "error") throw new Error(result.error);
	} catch (cause) {
		if (cause instanceof SessionResetCleanupError) throw cause;
		throw new SessionResetCleanupError("Reset did not complete because some subagent tasks could not be stopped. Inspect the remaining tasks and retry /reset.", { cause });
	}
}
/** Clears queued follow-ups and pending system events visible to the resetting agent. */
function clearSessionResetRuntimeState(keys, opts) {
	clearEmbeddedSessionPromptStates(keys);
	const cleared = clearSessionQueues(keys);
	let systemEventsCleared = 0;
	for (const key of cleared.keys) {
		const owner = parseAgentSessionKey(key)?.agentId;
		if (owner && owner !== normalizeAgentId(opts.agentId)) continue;
		const queueKey = resolveSystemEventQueueKey(key, opts.agentId);
		const removed = consumeSelectedSystemEventEntries(queueKey, peekSystemEventEntries(queueKey));
		systemEventsCleared += removed.length;
	}
	if (opts.activeReplySessionId) clearReplyRunForResetBySessionId(opts.activeReplySessionId);
	return {
		...cleared,
		systemEventsCleared
	};
}
//#endregion
export { stopSessionResetSubagents as i, clearSessionResetRuntimeState as n, createSessionResetCleanupGuard as r, SessionResetCleanupError as t };
