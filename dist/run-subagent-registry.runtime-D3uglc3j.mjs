import { v as subagentRuns } from "./subagent-run-liveness-CjqSkJZp.mjs";
import { m as collectSubagentSessionReadKeys } from "./subagent-registry.store.sqlite-DQWBMoqK.mjs";
import { x as withSubagentRunReadSnapshot } from "./subagent-registry-state-DbBqXjLM.mjs";
import { c as hasDescendantRunAwaitingSettleFromRuns, l as listDescendantRunsForRequesterFromRuns, r as countActiveDescendantRunsFromRuns } from "./subagent-registry-queries-Bq7e2tgq.mjs";
//#region src/cron/isolated-agent/run-subagent-registry.runtime.ts
function withCronDescendantRuns(sessionKey, consume) {
	return withSubagentRunReadSnapshot(subagentRuns, (snapshot) => {
		const sessionKeys = collectSubagentSessionReadKeys([sessionKey], snapshot.values());
		return {
			runIds: [...snapshot.values()].filter((entry) => sessionKeys.has(entry.childSessionKey.trim())).map((entry) => entry.runId),
			sessionKeys: []
		};
	}, (_selection, runs) => consume(new Map(runs)));
}
function readDescendantExecutionState(sessionKey, runStartedAt) {
	return withCronDescendantRuns(sessionKey, (runs) => ({
		hasFreshDescendants: listDescendantRunsForRequesterFromRuns(runs, sessionKey).some((entry) => {
			const descendantStartedAt = typeof entry.execution.startedAt === "number" ? entry.execution.startedAt : entry.createdAt;
			return typeof descendantStartedAt === "number" && descendantStartedAt >= runStartedAt;
		}),
		hasActiveDescendants: countActiveDescendantRunsFromRuns(runs, sessionKey) > 0
	}));
}
function listDescendantRunsForRequester(sessionKey) {
	return withCronDescendantRuns(sessionKey, (runs) => listDescendantRunsForRequesterFromRuns(runs, sessionKey));
}
function hasUnsettledCronDescendants(sessionKey) {
	return withCronDescendantRuns(sessionKey, (runs) => hasDescendantRunAwaitingSettleFromRuns(runs, sessionKey));
}
//#endregion
export { listDescendantRunsForRequester as n, readDescendantExecutionState as r, hasUnsettledCronDescendants as t };
