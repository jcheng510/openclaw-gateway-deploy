import { r as captureOpenClawStateWorkerContext } from "./openclaw-state-worker-context-C_iAE7YK.mjs";
import { A as waitForPendingSubagentRegistryWrites, E as assertSubagentRegistryWriteSourceCurrent } from "./subagent-registry-state-DbBqXjLM.mjs";
import { a as getLatestLiveSubagentRunByChildSessionKey, o as getLatestSubagentRunByChildSessionKey } from "./subagent-registry-read-DgbIKTmN.mjs";
//#region src/gateway/session-subagent-reactivation.ts
/**
* Reactivates a yielded or completed subagent session under its next run id.
*
* `task` is the canonical user-supplied prompt text that just dispatched the
* follow-up. When provided, it is persisted on the new run record so a later
* orphan recovery / gateway restart rewraps the follow-up prompt rather than
* the stale original task. Without this, sessions.send and agent.run callers
* could reactivate a completed run with the new run id but lose the new
* prompt text from restart redispatch.
*/
async function reactivateCompletedSubagentSession(params) {
	const runId = params.runId?.trim();
	if (!runId) return false;
	const paused = getLatestLiveSubagentRunByChildSessionKey(params.sessionKey, (entry) => entry.pauseReason === "sessions_yield");
	const existing = paused ?? getLatestSubagentRunByChildSessionKey(params.sessionKey);
	if (!existing || typeof existing.execution.endedAt !== "number") return false;
	const stateContext = captureOpenClawStateWorkerContext();
	const selected = getLatestLiveSubagentRunByChildSessionKey(params.sessionKey, (entry) => entry.runId === existing.runId);
	const selectedGeneration = selected?.generation;
	const latest = getLatestLiveSubagentRunByChildSessionKey(params.sessionKey);
	const latestGeneration = latest?.generation;
	const source = selected ?? existing;
	const isOriginalOwnerCurrent = () => {
		assertSubagentRegistryWriteSourceCurrent(stateContext);
		if (getLatestLiveSubagentRunByChildSessionKey(params.sessionKey, (entry) => entry.runId === existing.runId) !== selected || selected?.generation !== selectedGeneration || selected && selectedGeneration !== existing.generation || getLatestLiveSubagentRunByChildSessionKey(params.sessionKey) !== latest || latest?.generation !== latestGeneration || typeof source.execution.endedAt !== "number") throw new Error("subagent follow-up source changed while its writes settled");
		params.assertCurrent?.();
		return !params.gatewayContextResolver || Boolean(params.gatewayContextResolver());
	};
	const runtime = await import("./subagent-registry-runtime-DlpsEU1j.mjs");
	if (!isOriginalOwnerCurrent()) return false;
	const pending = waitForPendingSubagentRegistryWrites([source.runId], stateContext.admission);
	if (pending) {
		await pending;
		if (!isOriginalOwnerCurrent()) return false;
	}
	const task = params.task;
	const hasTask = typeof task === "string" && task.trim().length > 0;
	const gatewayBinding = params.gatewayContextResolver ? { gatewayContextResolver: params.gatewayContextResolver } : {};
	if (paused ? runtime.adoptPausedSubagentRunForFollowUp({
		childSessionKey: params.sessionKey,
		runId,
		task: hasTask ? task : paused.task,
		...gatewayBinding
	}) : runtime.replaceSubagentRunAfterSteer({
		previousRunId: source.runId,
		nextRunId: runId,
		fallback: source,
		runTimeoutSeconds: source.runTimeoutSeconds ?? 0,
		persistenceFailure: "throw",
		...hasTask ? { task } : {},
		...gatewayBinding
	})) return true;
	if (getLatestLiveSubagentRunByChildSessionKey(params.sessionKey)?.runId === runId) return true;
	throw new Error("subagent follow-up owner replacement was rejected");
}
//#endregion
export { reactivateCompletedSubagentSession as t };
