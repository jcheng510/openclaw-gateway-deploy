import { s as normalizeDeliveryContext } from "./delivery-context.shared-CMOBtTen.mjs";
import { a as isSubagentRunLive, m as getSubagentRunsForChildSession, v as subagentRuns } from "./subagent-run-liveness-CjqSkJZp.mjs";
import { a as getSubagentRunsSnapshotForController, d as getSubagentSessionListRunsSnapshotForSessions, i as getSubagentRunsSnapshotForChildSession, l as getSubagentSessionListRunsSnapshotForChildSessions, s as getSubagentRunsSnapshotForSessions, u as getSubagentSessionListRunsSnapshotForRead } from "./subagent-registry-state-DbBqXjLM.mjs";
import { a as countPendingDescendantRunsFromRuns, c as hasDescendantRunAwaitingSettleFromRuns, d as listRunsForRequesterFromRuns, g as shouldIgnorePostCompletionAnnounceForSessionFromRuns, m as resolveRequesterForChildSessionFromRuns, n as buildSubagentRunReadIndexFromRuns, o as getLatestSubagentRunByChildSessionKeyFromRuns, r as countActiveDescendantRunsFromRuns, s as getSubagentRunByChildSessionKeyFromRuns, t as buildLatestSubagentRunReadIndexFromRuns, u as listRunsForControllerFromRuns } from "./subagent-registry-queries-Bq7e2tgq.mjs";
//#region src/agents/subagents/registry/subagent-registry-read.ts
/**
* Read-only subagent registry accessors.
*
* Combines persisted snapshots with in-memory live runs for UI, announce, control, and recovery paths.
*/
/** Builds the session-list index without hydrating full retained registry payloads. */
function buildSubagentSessionListReadIndex(now = Date.now(), sessionKeys, preparedRuns) {
	const runs = preparedRuns ?? (sessionKeys ? getSubagentSessionListRunsSnapshotForSessions(subagentRuns, sessionKeys) : getSubagentSessionListRunsSnapshotForRead(subagentRuns));
	return buildSubagentRunReadIndexFromRuns({
		runs,
		inMemoryRuns: sessionKeys ? [...runs.keys()].flatMap((runId) => {
			const current = subagentRuns.get(runId);
			return current ? [current] : [];
		}) : subagentRuns.values(),
		now
	});
}
/** Direct-child discovery needs only its controllers, without building global topology. */
function listSubagentSessionListRunsForControllers(controllerSessionKeys) {
	const runs = getSubagentSessionListRunsSnapshotForRead(subagentRuns, controllerSessionKeys);
	return controllerSessionKeys.flatMap((key) => listRunsForControllerFromRuns(runs, key));
}
function buildLatestSubagentSessionListReadIndex(childSessionKeys) {
	return buildLatestSubagentRunReadIndexFromRuns(getSubagentSessionListRunsSnapshotForChildSessions(childSessionKeys));
}
/** Lists runs controlled by a session key. */
function listSubagentRunsForController(controllerSessionKey, controllerAgentId) {
	return listRunsForControllerFromRuns(getSubagentRunsSnapshotForController(subagentRuns, controllerSessionKey), controllerSessionKey, controllerAgentId);
}
/** Counts active descendant runs for a requester/session tree. */
function countActiveDescendantRuns(rootSessionKey, requesterAgentId, requesterStorePath, rootRunIds) {
	return countActiveDescendantRunsFromRuns(getSubagentRunsSnapshotForSessions(subagentRuns, [rootSessionKey]), rootSessionKey, requesterAgentId, requesterStorePath, rootRunIds);
}
/** Counts pending descendant runs below a requester/session tree. */
function countPendingDescendantRuns(rootSessionKey) {
	return countPendingDescendantRunsFromRuns(getSubagentRunsSnapshotForSessions(subagentRuns, [rootSessionKey]), rootSessionKey);
}
/** True when any descendant run still awaits terminal settle (suspended delivery counts as settled). */
function hasDescendantRunAwaitingSettle(rootSessionKey, excludeRunId, requesterAgentId, requesterStorePath, settledBefore, rootRunIds) {
	return hasDescendantRunAwaitingSettleFromRuns(getSubagentRunsSnapshotForSessions(subagentRuns, [rootSessionKey]), rootSessionKey, excludeRunId, requesterAgentId, requesterStorePath, settledBefore, rootRunIds);
}
/** Resolves the requester session and normalized origin for a child subagent session. */
function resolveRequesterForChildSession(childSessionKey) {
	const resolved = resolveRequesterForChildSessionFromRuns(getSubagentRunsSnapshotForChildSession(subagentRuns, childSessionKey), childSessionKey);
	if (!resolved) return null;
	return {
		requesterSessionKey: resolved.requesterSessionKey,
		requesterAgentId: resolved.requesterAgentId,
		requesterOrigin: normalizeDeliveryContext(resolved.requesterOrigin)
	};
}
/** True when post-completion announce should be skipped for a child session. */
function shouldIgnorePostCompletionAnnounceForSession(childSessionKey) {
	return shouldIgnorePostCompletionAnnounceForSessionFromRuns(getSubagentRunsSnapshotForChildSession(subagentRuns, childSessionKey), childSessionKey);
}
/** True when the process-local registry still owns an active run for the child session. */
function isSubagentSessionRunActive(childSessionKey) {
	return isSubagentRunLive(getLatestSubagentRunByChildSessionKeyFromRuns(subagentRuns, childSessionKey));
}
/** Lists process-local runs requested by one session key. */
function listSubagentRunsForRequester(requesterSessionKey, options) {
	return listRunsForRequesterFromRuns(subagentRuns, requesterSessionKey, options);
}
/** Returns the preferred child-session run from its scoped readable snapshot. */
function getSubagentRunByChildSessionKey(childSessionKey) {
	const key = childSessionKey.trim();
	if (!key) return null;
	return getSubagentRunByChildSessionKeyFromRuns(getSubagentRunsSnapshotForChildSession(subagentRuns, key), key);
}
/** Returns the most recently created run for a child session from readable registry state. */
function getLatestSubagentRunByChildSessionKey(childSessionKey) {
	const key = childSessionKey.trim();
	if (!key) return null;
	return getLatestSubagentRunByChildSessionKeyFromRuns(getSubagentRunsSnapshotForChildSession(subagentRuns, key), key) ?? null;
}
/**
* Returns the authoritative process-local run for mutation ownership checks.
*
* `matches` restricts the search to a row class the caller owns; see
* `getLatestSubagentRunByChildSessionKeyFromRuns`.
*/
function getLatestLiveSubagentRunByChildSessionKey(childSessionKey, matches) {
	const key = childSessionKey.trim();
	if (!key) return null;
	return getLatestSubagentRunByChildSessionKeyFromRuns(getSubagentRunsForChildSession(key), key, matches) ?? null;
}
//#endregion
export { getLatestLiveSubagentRunByChildSessionKey as a, hasDescendantRunAwaitingSettle as c, listSubagentRunsForRequester as d, listSubagentSessionListRunsForControllers as f, countPendingDescendantRuns as i, isSubagentSessionRunActive as l, shouldIgnorePostCompletionAnnounceForSession as m, buildSubagentSessionListReadIndex as n, getLatestSubagentRunByChildSessionKey as o, resolveRequesterForChildSession as p, countActiveDescendantRuns as r, getSubagentRunByChildSessionKey as s, buildLatestSubagentSessionListReadIndex as t, listSubagentRunsForController as u };
