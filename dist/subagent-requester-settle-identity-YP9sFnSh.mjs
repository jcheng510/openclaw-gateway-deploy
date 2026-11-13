import { n as buildAnnounceIdempotencyKey } from "./announce-idempotency-CkUlnjaT.mjs";
//#region src/agents/subagents/registry/subagent-requester-settle-identity.ts
function buildRequesterSettleWakeIdentity(params) {
	const batchKey = [`requester-settle:${params.requesterAgentId ?? "unknown"}:${params.requesterSessionKey}:${params.batchRunIds.toSorted().join(",")}`, params.rearmGeneration === void 0 ? void 0 : `yield-${params.rearmGeneration}`].filter(Boolean).join(":");
	const attemptIndex = params.attemptIndex ?? 0;
	return {
		batchKey,
		runId: buildAnnounceIdempotencyKey(params.parentOnly || attemptIndex === 0 ? batchKey : `${batchKey}:retry-${attemptIndex}`)
	};
}
function isRequesterSettleWakeForRun(params) {
	const { entry, requesterSessionKey, requesterAgentId } = params;
	const wake = entry.requesterSettleWake;
	const batchRunIds = wake?.batchRunIds;
	if (entry.requesterSessionKey !== requesterSessionKey || entry.requesterAgentId && entry.requesterAgentId !== requesterAgentId || !wake || wake.attemptCount < 1 || params.runsById.get(entry.runId) !== entry || !batchRunIds?.includes(entry.runId)) return false;
	const parentOnly = batchRunIds.some((runId) => {
		const member = params.runsById.get(runId);
		return member?.requesterSessionKey === requesterSessionKey && (!member.requesterAgentId || member.requesterAgentId === requesterAgentId) && member.requesterSettleWake !== void 0 && member.requesterSettleWake.rearmGeneration === wake.rearmGeneration && member.completionTarget === "parent";
	});
	return params.runId === buildRequesterSettleWakeIdentity({
		requesterSessionKey,
		requesterAgentId,
		batchRunIds,
		rearmGeneration: wake.rearmGeneration,
		attemptIndex: wake.attemptCount - 1,
		parentOnly
	}).runId;
}
//#endregion
export { isRequesterSettleWakeForRun as n, buildRequesterSettleWakeIdentity as t };
