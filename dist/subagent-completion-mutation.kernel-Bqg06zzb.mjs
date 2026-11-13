import { i as getNodeSqliteKysely, n as executeSqliteQuerySync } from "./kysely-sync-Y4_ti-rQ.mjs";
import { T as upsertBoundDeliveryQueueEntryInDatabase, _ as bindDeliveryQueueEntry, x as loadDeliveryQueueEntryInDatabase } from "./openclaw-state-db-legacy-backfills-xddLXhvs.mjs";
import { u as resolveEventSessionKey } from "./session-key-BC4m_Ly5.mjs";
import "./subagent-lifecycle-events-CDQCTuLB.mjs";
import { c as prepareClaimedSessionDelivery, t as SESSION_DELIVERY_QUEUE_NAME } from "./session-delivery-queue.records-CjQTBb2t.mjs";
import { D as loadPendingFinalDeliveryPayload, O as markRequesterSettleWakePending, T as isCompletedRequesterDeliveryBlocked, _ as rowToSubagentRunRecord, b as ensureCompletionState, d as upsertSubagentRunRowInDatabase, g as bindSubagentRunRecord, i as loadSubagentRunsForChildSessionFromSqlite, s as readSubagentRun, u as deleteSubagentRunRowInDatabase, x as ensureDeliveryState, y as clearSubagentPendingDelivery } from "./subagent-registry.store.sqlite-DQWBMoqK.mjs";
import { t as compareSubagentRunGeneration } from "./subagent-run-generation-DCkOHoP9.mjs";
//#region src/agents/subagents/completion/subagent-completion-mutation.kernel.ts
const SUSPENDED_RETENTION_MS = 6048e5;
const query = (db) => getNodeSqliteKysely(db);
const noMutation = (applied) => ({
	applied,
	records: [],
	retiredRunIds: [],
	queueIds: []
});
function retiredCancellationEndedAt(subagent, now) {
	const endedAt = subagent.execution.endedAt;
	if (subagent.execution.status !== "terminal" || subagent.execution.outcome?.status !== "error" || subagent.endedReason !== "subagent-killed" || typeof endedAt !== "number" || !Number.isFinite(endedAt) || typeof subagent.cleanupCompletedAt !== "number" || !Number.isFinite(subagent.cleanupCompletedAt) || subagent.cleanupCompletedAt < endedAt || subagent.pauseReason || subagent.killIntent || subagent.terminalOwner || subagent.execution.restartRecovery || subagent.suppressAnnounceReason === "steer-restart" || subagent.expectsCompletionMessage !== true || subagent.completion?.required !== true || !subagent.requesterSettleWake || subagent.delivery?.status !== "pending" || subagent.delivery.queueId || endedAt + SUSPENDED_RETENTION_MS > now) return;
	return endedAt;
}
function ownsRetiredCancellation(database, subagent, expected) {
	const newerSibling = (candidate) => candidate.childSessionKey === subagent.childSessionKey && compareSubagentRunGeneration(candidate, subagent) > 0;
	return bindSubagentRunRecord(subagent).payload_json === bindSubagentRunRecord(expected).payload_json && !loadSubagentRunsForChildSessionFromSqlite(subagent.childSessionKey, database).some(newerSibling);
}
function prepareBlockedSubagentCompletion(database, params, now, subagent) {
	const generation = params.subagent.delivery?.generation ?? 1;
	if (!subagent || subagent.execution.status !== "terminal" || !subagent.execution.outcome || subagent.pauseReason === "sessions_yield" || subagent.expectsCompletionMessage !== true || (subagent.delivery?.generation ?? 1) !== generation || bindSubagentRunRecord(subagent).payload_json !== bindSubagentRunRecord(params.subagent).payload_json) return;
	const successful = subagent.execution.outcome?.status === "ok";
	if (!successful && (params.suspendedReason !== void 0 && !params.storeReplaced || ![
		"pending",
		"in_progress",
		"failed"
	].includes(subagent.delivery?.status ?? "pending"))) return;
	const retiredEndedAt = retiredCancellationEndedAt(subagent, now);
	if (retiredEndedAt !== void 0) {
		if (subagent.killReconciliation || !ownsRetiredCancellation(database, subagent, params.subagent)) return;
		const completion = ensureCompletionState(subagent);
		completion.resultText ??= null;
		completion.capturedAt ??= retiredEndedAt;
	}
	const delivery = ensureDeliveryState(subagent);
	if (params.storeReplaced && (delivery.status === "delivered" || delivery.announcedAt !== void 0 || delivery.deliveredAt !== void 0)) return;
	delivery.payload ??= loadPendingFinalDeliveryPayload(subagent);
	if (typeof params.enqueuedAt === "number") delivery.enqueuedAt ??= params.enqueuedAt;
	Object.assign(delivery, {
		status: params.suspendedReason ? "suspended" : "failed",
		disposition: params.storeReplaced ? "intentional_non_delivery" : params.suspendedReason ? "permanent_failure" : params.disposition ?? delivery.disposition,
		lastError: params.reason,
		deliveredAt: void 0,
		announcedAt: void 0,
		suspendedAt: params.suspendedReason ? delivery.suspendedAt ?? now : delivery.suspendedAt,
		suspendedReason: params.suspendedReason ?? delivery.suspendedReason,
		lastDropReason: params.lastDropReason ?? delivery.lastDropReason,
		nextAttemptAt: void 0,
		queueId: void 0
	});
	Object.assign(subagent, {
		cleanupHandled: false,
		wakeOnDescendantSettle: void 0
	});
	if (params.storeReplaced) subagent.requesterSettleWake = void 0;
	else if (params.suspendedReason) {
		if (isCompletedRequesterDeliveryBlocked(subagent)) {
			if (subagent.requesterSettleWake?.requesterYieldBatch !== true) subagent.requesterSettleWake = void 0;
		} else markRequesterSettleWakePending(subagent);
	} else subagent.suppressCompletionDelivery = true;
	const text = successful && !params.storeReplaced ? "Subagent completion delivery is blocked: " + params.reason : null;
	return {
		subagent,
		queued: text ? prepareClaimedSessionDelivery({
			kind: "systemEvent",
			sessionKey: resolveEventSessionKey(subagent.requesterSessionKey),
			...subagent.requesterAgentId ? { agentId: subagent.requesterAgentId } : {},
			text,
			...subagent.requesterOrigin ? { deliveryContext: subagent.requesterOrigin } : {},
			idempotencyKey: `subagent-completion-blocked:${subagent.runId}:generation:${generation}`
		}, 0, now) : void 0
	};
}
function commitCompletionMutations(database, mutations) {
	for (const { subagent, queued, retire } of mutations) {
		if (queued) upsertBoundDeliveryQueueEntryInDatabase(bindDeliveryQueueEntry({
			queueName: SESSION_DELIVERY_QUEUE_NAME,
			entry: queued,
			insertOnly: true
		}), database);
		if (retire) deleteSubagentRunRowInDatabase(database, subagent.runId);
		else upsertSubagentRunRowInDatabase(database, bindSubagentRunRecord(subagent));
	}
	return {
		applied: true,
		records: mutations.filter((mutation) => !mutation.retire).map(({ subagent }) => {
			const row = executeSqliteQuerySync(database.db, query(database.db).selectFrom("subagent_runs").selectAll().where("run_id", "=", subagent.runId)).rows[0];
			if (!row) throw new Error("Subagent completion mutation lost its native row");
			return {
				row,
				cleanupHandled: subagent.cleanupHandled
			};
		}),
		retiredRunIds: mutations.filter((mutation) => mutation.retire).map(({ subagent }) => subagent.runId),
		queueIds: mutations.flatMap(({ queued }) => queued ? [queued.id] : [])
	};
}
function settleRequesterBatch(database, params) {
	const now = params.now;
	const entries = params.entries;
	const ids = new Set(entries.map(({ subagent }) => subagent.runId));
	const first = entries[0]?.subagent;
	const cohort = first?.requesterSettleWake?.batchRunIds?.toSorted().join("\0");
	const checkedOmittedIds = /* @__PURE__ */ new Set();
	return commitCompletionMutations(database, entries.map(({ subagent: expected }) => {
		const changedOwner = () => /* @__PURE__ */ new Error("subagent completion owner changed before settlement: " + expected.runId);
		const subagent = readSubagentRun(database, expected.runId);
		if (!subagent || !subagent.requesterSettleWake || subagent.requesterSessionKey !== first?.requesterSessionKey || subagent.requesterAgentId !== first?.requesterAgentId || subagent.requesterSettleWake.rearmGeneration !== first?.requesterSettleWake?.rearmGeneration || subagent.requesterSettleWake.batchRunIds?.toSorted().join("\0") !== cohort || bindSubagentRunRecord(subagent).payload_json !== bindSubagentRunRecord(expected).payload_json) throw changedOwner();
		for (const id of subagent.requesterSettleWake?.batchRunIds ?? []) if (!ids.has(id) && !checkedOmittedIds.has(id)) {
			const member = readSubagentRun(database, id);
			if (member?.requesterSettleWake && member.requesterSettleWake.rearmGeneration === subagent.requesterSettleWake?.rearmGeneration) throw changedOwner();
			checkedOmittedIds.add(id);
		}
		subagent.cleanupHandled = expected.cleanupHandled;
		const acknowledgeExpiredDelivery = params.outcome.delivered && subagent.delivery?.status === "suspended" && subagent.delivery.suspendedReason === "expiry";
		let mutation = { subagent };
		if (subagent.pauseReason !== "sessions_yield" && subagent.expectsCompletionMessage === true && (["pending", "in_progress"].includes(subagent.delivery?.status ?? "pending") || acknowledgeExpiredDelivery)) {
			if (params.outcome.delivered) {
				const delivery = ensureDeliveryState(subagent);
				const deliveredAt = params.outcome.deliveredAt ?? now;
				Object.assign(delivery, {
					status: "delivered",
					disposition: "delivered",
					deliveredAt,
					announcedAt: deliveredAt,
					lastDropReason: void 0
				});
				clearSubagentPendingDelivery(subagent);
			} else {
				const blocked = prepareBlockedSubagentCompletion(database, {
					subagent: expected,
					reason: params.outcome.error ?? params.outcome.reason ?? "requester settle wake failed",
					disposition: params.outcome.disposition,
					storeReplaced: params.outcome.storeReplaced,
					suspendedReason: params.outcome.storeReplaced ? "permanent_failure" : void 0
				}, now, subagent);
				if (!blocked) throw changedOwner();
				mutation = blocked;
			}
		}
		const settled = mutation.subagent;
		if (settled.pauseReason !== "sessions_yield") {
			if (settled.requesterTurnRunId && settled.expectsCompletionMessage === true) settled.retireAfterRequesterTurn = settled.retireAfterRequesterTurn === true || settled.requesterSettleWake?.retireAfterSettle === true ? true : void 0;
			else mutation.retire = settled.requesterSettleWake?.retireAfterSettle === true;
		}
		settled.requesterSettleWake = void 0;
		return mutation;
	}));
}
/** Worker transaction owner supplies the handle and live admission before/after this mutation. */
function mutateSubagentCompletionInDatabase(database, mutation) {
	switch (mutation.kind) {
		case "settle": {
			const queued = loadDeliveryQueueEntryInDatabase(database, SESSION_DELIVERY_QUEUE_NAME, mutation.queueId, "pending");
			const owner = queued?.kind === "agentTurn" ? queued.owner : void 0;
			const row = executeSqliteQuerySync(database.db, query(database.db).selectFrom("subagent_runs").selectAll().where("run_id", "=", mutation.expected.runId)).rows[0];
			const current = row && rowToSubagentRunRecord(row);
			if (!current || !queued || !owner || owner.kind !== "subagent_completion" || owner.runId !== current.runId || owner.generation !== current.delivery?.generation || owner.deadlineAt !== current.delivery.deadlineAt || (queued.settlementOutcome ?? (queued.acknowledgedAt !== void 0 ? "recovered" : void 0)) !== "recovered" || compareSubagentRunGeneration(current, mutation.expected) !== 0 || current.childSessionKey !== mutation.expected.childSessionKey || current.requesterSessionKey !== mutation.expected.requesterSessionKey || current.requesterStorePath !== mutation.expected.requesterStorePath) throw new Error("Subagent completion recovery lost its queue or native owner");
			if (current.delivery.status === "delivered" && current.delivery.queueId === void 0) return {
				applied: true,
				records: [{
					row,
					cleanupHandled: mutation.expected.cleanupHandled
				}],
				retiredRunIds: [],
				queueIds: []
			};
			if (current.delivery.queueId !== mutation.queueId || bindSubagentRunRecord(current).payload_json !== bindSubagentRunRecord(mutation.expected).payload_json) throw new Error("Subagent completion owner changed before settlement");
			return commitCompletionMutations(database, [{ subagent: mutation.subagent }]);
		}
		case "block": {
			const prepared = prepareBlockedSubagentCompletion(database, mutation.params, mutation.now, readSubagentRun(database, mutation.params.subagent.runId));
			return prepared ? commitCompletionMutations(database, [prepared]) : noMutation(false);
		}
		case "reconcileCancelled": {
			const { expected, now } = mutation;
			const endedAt = retiredCancellationEndedAt(expected, now);
			const marker = expected.killReconciliation;
			if (endedAt === void 0 || !marker || !Number.isFinite(marker.killedAt) || marker.killedAt > endedAt) return noMutation(null);
			const current = readSubagentRun(database, expected.runId);
			if (!current || retiredCancellationEndedAt(current, now) !== endedAt || !ownsRetiredCancellation(database, current, expected)) return noMutation(false);
			current.killReconciliation = void 0;
			return commitCompletionMutations(database, [{ subagent: current }]);
		}
		case "requesterBatch": return settleRequesterBatch(database, mutation);
	}
	throw new Error("Unknown subagent completion mutation");
}
//#endregion
export { retiredCancellationEndedAt as n, mutateSubagentCompletionInDatabase as t };
