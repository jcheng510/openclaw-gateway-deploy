import { r as captureOpenClawStateWorkerContext } from "./openclaw-state-worker-context-C_iAE7YK.mjs";
import { C as parseCronRunScopeSuffix, l as resolveAgentIdFromSessionKey } from "./session-key-BC4m_Ly5.mjs";
import { l as resolveSessionStorePathCore } from "./paths-CQ3zRaeb.mjs";
import { l as getAgentEventLifecycleGeneration } from "./agent-events-Cg4kQnvf.mjs";
import { r as getRuntimeConfig } from "./io.runtime-BOdk1dW9.mjs";
import "./config-D1R2igem.mjs";
import { g as runExclusiveSessionLifecycleMutation, p as isCompetingSessionWorkAdmissionActive } from "./session-lifecycle-admission-6HF8YqSN.mjs";
import "./session-accessor-CGLseszP.mjs";
import { r as deleteSessionEntryLifecycle } from "./session-accessor.sqlite-lifecycle-DMe8Z3DK.mjs";
import { s as withSessionEntryReadOnlyInWorker } from "./session-entry-read-runtime-e6OehipM.mjs";
import { c as hasPendingGeneratedMediaTaskForSessionKey } from "./media-generation-activity-8_KIfY-s.mjs";
import { s as loadPendingSessionDeliveries } from "./session-delivery-queue-storage-D5pkrc1d.mjs";
import { c as hasDescendantRunAwaitingSettle } from "./subagent-registry-read-DgbIKTmN.mjs";
//#region src/cron/run-continuation-cleanup.ts
/** Removes an idle exact-run continuation through the session lifecycle owner. */
function canRemoveCronRunContinuation(marker) {
	if (!marker || marker.basePersisted !== true) return false;
	if (marker.phase === "ready") return !marker.ownerRunId;
	if (marker.phase !== "continuing" || !marker.ownerRunId) return false;
	const ownerLifecycleGeneration = marker.ownerLifecycleGeneration?.trim();
	return Boolean(ownerLifecycleGeneration && ownerLifecycleGeneration !== getAgentEventLifecycleGeneration());
}
async function removeCronRunContinuationSessionIfIdle(sessionKey, settledDeliveryId, queueContext) {
	if (!parseCronRunScopeSuffix(sessionKey).runId || hasPendingGeneratedMediaTaskForSessionKey(sessionKey)) return;
	const context = queueContext ?? captureOpenClawStateWorkerContext();
	const assertCurrent = () => context.admission.assertCurrent();
	const agentId = resolveAgentIdFromSessionKey(sessionKey);
	const storePath = resolveSessionStorePathCore(getRuntimeConfig().session?.store, {
		agentId,
		env: context.environment
	});
	const readEntry = () => withSessionEntryReadOnlyInWorker({
		agentId,
		sessionKey,
		storePath,
		env: context.environment,
		hydrateSkillPromptRefs: false
	}, assertCurrent, async (read) => {
		if (!read.ok) throw read.error;
		return read.value;
	});
	const original = await readEntry();
	if (!original || !canRemoveCronRunContinuation(original.cronRunContinuation)) return;
	await runExclusiveSessionLifecycleMutation({
		scope: storePath,
		identities: [sessionKey, original.sessionId],
		run: async () => {
			if (isCompetingSessionWorkAdmissionActive(storePath, [sessionKey, original.sessionId])) return;
			const pendingSessionDeliveries = await loadPendingSessionDeliveries(context);
			if (hasDescendantRunAwaitingSettle(sessionKey) || hasPendingGeneratedMediaTaskForSessionKey(sessionKey) || pendingSessionDeliveries.some((entry) => entry.sessionKey === sessionKey && entry.id !== settledDeliveryId && entry.settlementOutcome === void 0 && entry.acknowledgedAt === void 0)) return;
			const entry = await readEntry();
			if (!entry || entry.sessionId !== original.sessionId || entry.lifecycleRevision !== original.lifecycleRevision || !canRemoveCronRunContinuation(entry.cronRunContinuation)) return;
			await deleteSessionEntryLifecycle({
				agentId,
				commitGuard: () => {
					assertCurrent();
					if (hasDescendantRunAwaitingSettle(sessionKey) || hasPendingGeneratedMediaTaskForSessionKey(sessionKey)) throw new Error("cron run continuation still has unsettled background work");
				},
				archiveTranscript: false,
				expectedEntry: entry,
				expectedLifecycleRevision: entry.lifecycleRevision,
				expectedSessionId: entry.sessionId,
				expectedUpdatedAt: entry.updatedAt,
				requireWriteSuccess: true,
				storePath,
				target: {
					canonicalKey: sessionKey,
					storeKeys: [sessionKey]
				}
			});
		}
	});
}
//#endregion
export { removeCronRunContinuationSessionIfIdle as t };
