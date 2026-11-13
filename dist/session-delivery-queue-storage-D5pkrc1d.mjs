import { l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import { _ as bindDeliveryQueueEntry } from "./openclaw-state-db-legacy-backfills-xddLXhvs.mjs";
import { C as parseCronRunScopeSuffix, l as resolveAgentIdFromSessionKey } from "./session-key-BC4m_Ly5.mjs";
import { l as resolveSessionStorePathCore } from "./paths-CQ3zRaeb.mjs";
import { n as createSqliteWorkerWriteAdmission } from "./sqlite-worker-store-DNLj-iuz.mjs";
import { a as runOpenClawStateWorkerOperation } from "./openclaw-state-worker-store-DwGcGmZn.mjs";
import { r as getRuntimeConfig } from "./io.runtime-BOdk1dW9.mjs";
import "./config-D1R2igem.mjs";
import { b as consumeSessionWorkAdmissionHandoff, n as beginSessionWorkAdmission } from "./session-lifecycle-admission-6HF8YqSN.mjs";
import { s as withSessionEntryReadOnlyInWorker } from "./session-entry-read-runtime-e6OehipM.mjs";
import { c as prepareClaimedSessionDelivery, i as SessionDeliveryDeadLetteredError, l as prepareSessionDelivery, n as SessionDeliveryAcknowledgementFinalizeError, r as SessionDeliveryAttemptStartError, t as SESSION_DELIVERY_QUEUE_NAME } from "./session-delivery-queue.records-CjQTBb2t.mjs";
import path from "node:path";
//#region src/gateway/server-methods/agent-expected-session.ts
var ExpectedExistingSessionChangedError = class extends Error {
	constructor(message) {
		super(message);
		this.name = "ExpectedExistingSessionChangedError";
	}
};
function resolveExpectedExistingSessionConstraint(params) {
	const sessionId = normalizeOptionalString(params.expectedExistingSessionId);
	if (!sessionId) {
		if (params.expectedExistingSessionLifecycleRevision !== void 0) return {
			ok: false,
			error: "expectedExistingSessionLifecycleRevision requires expectedExistingSessionId."
		};
		return { ok: true };
	}
	if (!params.canUseInternalRuntimeHandoff) return {
		ok: false,
		error: "expectedExistingSessionId is reserved for backend callers."
	};
	const handoffId = normalizeOptionalString(params.internalRuntimeHandoffId);
	return {
		ok: true,
		constraint: {
			sessionId,
			lifecycleRevision: params.expectedExistingSessionLifecycleRevision,
			...handoffId ? { handoffId } : {}
		}
	};
}
function validateExpectedExistingSessionTarget(params) {
	if (!params.constraint) return;
	if (!params.requestedSessionKey) return "expectedExistingSessionId requires an explicit session key.";
	if (params.requestedSessionId && params.requestedSessionId !== params.constraint.sessionId) return "conflicting session identity constraints.";
}
function assertExpectedExistingSession(params) {
	if (params.constraint && (params.entry?.sessionId !== params.constraint.sessionId || params.constraint.lifecycleRevision !== void 0 && (params.entry?.lifecycleRevision ?? null) !== params.constraint.lifecycleRevision)) throw new ExpectedExistingSessionChangedError(params.message);
}
function consumeExpectedSessionWorkAdmission(params) {
	const handoffId = params.constraint?.handoffId;
	if (!handoffId) return;
	const lease = consumeSessionWorkAdmissionHandoff({
		handoffId,
		scope: params.scope,
		identities: params.identities,
		onInterrupt: params.onInterrupt
	});
	if (!lease) throw new Error("session work admission handoff is unavailable");
	return lease;
}
//#endregion
//#region src/infra/session-delivery-queue-storage.ts
/** Queue publication and continuation deletion share the existing session lifecycle owner. */
async function withSessionDeliveryEnqueueAdmission(payload, context, run) {
	const binding = payload.kind === "agentTurn" && payload.requesterBinding ? { ...payload.requesterBinding } : void 0;
	const sessionKey = payload.sessionKey;
	const unavailable = "session delivery original requester is no longer available";
	const assertQueueCurrent = () => {
		context.admission.assertCurrent();
		if (binding && path.resolve(binding.storePath) !== path.resolve(resolveSessionStorePathCore(getRuntimeConfig().session?.store, {
			agentId: binding.agentId,
			env: context.environment
		}))) throw new SessionDeliveryDeadLetteredError(unavailable);
	};
	assertQueueCurrent();
	if (!binding && !parseCronRunScopeSuffix(sessionKey).runId) return await run(assertQueueCurrent);
	if (binding && binding.sessionKey !== sessionKey) throw new SessionDeliveryDeadLetteredError(unavailable);
	const agentId = binding?.agentId ?? resolveAgentIdFromSessionKey(sessionKey);
	const storePath = binding?.storePath ?? resolveSessionStorePathCore(getRuntimeConfig().session?.store, {
		agentId,
		env: context.environment
	});
	const scope = {
		agentId,
		storePath,
		sessionKey,
		env: context.environment,
		hydrateSkillPromptRefs: false
	};
	const readEntry = () => withSessionEntryReadOnlyInWorker(scope, assertQueueCurrent, async (read) => {
		if (!read.ok) throw read.error;
		if (!read.value) throw new SessionDeliveryDeadLetteredError(unavailable);
		return read.value;
	});
	const original = await readEntry();
	const constraint = binding ?? {
		sessionId: original.sessionId,
		lifecycleRevision: original.lifecycleRevision ?? null
	};
	let interruption;
	let lease;
	try {
		lease = await beginSessionWorkAdmission({
			scope: storePath,
			identities: [sessionKey, constraint.sessionId],
			assertAllowed: async (signal) => {
				signal.throwIfAborted();
				assertExpectedExistingSession({
					constraint,
					entry: await readEntry(),
					message: unavailable
				});
			},
			onInterrupt(reason) {
				interruption = reason ?? /* @__PURE__ */ new Error("session delivery admission interrupted");
			}
		});
		const assertCurrent = () => {
			assertQueueCurrent();
			if (interruption) throw interruption;
			if (!lease?.isActive()) throw new Error("session delivery admission closed");
		};
		return await lease.run(async () => await run(assertCurrent));
	} catch (error) {
		if (error instanceof ExpectedExistingSessionChangedError) throw new SessionDeliveryDeadLetteredError(unavailable);
		throw error;
	} finally {
		lease?.release();
	}
}
function executeSessionDelivery(context, command) {
	return runOpenClawStateWorkerOperation(context, (scope) => scope.execute(command));
}
function prepareEntry(entry, mode) {
	return bindDeliveryQueueEntry({
		queueName: SESSION_DELIVERY_QUEUE_NAME,
		entry,
		...mode === "insert" ? { insertOnly: true } : { updatePendingOnly: true }
	});
}
async function enqueueSessionDelivery(params, context) {
	const entry = prepareSessionDelivery(params);
	const input = prepareEntry(entry, "insert");
	await withSessionDeliveryEnqueueAdmission(entry, context, (assertCurrent) => runOpenClawStateWorkerOperation(context, (scope) => scope.execute({
		type: "sessionDelivery.enqueue",
		input
	}), {
		assertCurrent,
		createAdmission: createSqliteWorkerWriteAdmission(assertCurrent, [context.admission.databasePath])
	}));
	return entry.id;
}
async function enqueueClaimedSessionDelivery(params, initialAttemptLeaseMs, context) {
	const entry = prepareClaimedSessionDelivery(params, initialAttemptLeaseMs);
	const input = prepareEntry(entry, "insert");
	return withSessionDeliveryEnqueueAdmission(entry, context, (assertCurrent) => runOpenClawStateWorkerOperation(context, (scope) => scope.execute({
		type: "sessionDelivery.enqueueClaimed",
		input
	}), {
		assertCurrent,
		createAdmission: createSqliteWorkerWriteAdmission(assertCurrent, [context.admission.databasePath])
	}));
}
async function releaseSessionDeliveryClaim(id, context) {
	return executeSessionDelivery(context, {
		type: "sessionDelivery.releaseClaim",
		input: { id }
	});
}
async function deferSessionDelivery(id, delayMs, context) {
	return executeSessionDelivery(context, {
		type: "sessionDelivery.defer",
		input: {
			id,
			delayMs
		}
	});
}
async function advanceSessionDeliveryAgentRun(id, updates, context) {
	return executeSessionDelivery(context, {
		type: "sessionDelivery.advanceAgentRun",
		input: {
			id,
			updates
		}
	});
}
async function mergeSessionDeliveryPreparedMediaBlocks(id, mediaUrl, blocks, context) {
	const result = await executeSessionDelivery(context, {
		type: "sessionDelivery.mergePreparedMedia",
		input: {
			id,
			mediaUrl,
			blocksJson: JSON.stringify(blocks)
		}
	});
	return result.source === "input" ? blocks : result.blocks;
}
async function markSessionDeliveryAttemptStarted(entry, context) {
	try {
		await executeSessionDelivery(context, {
			type: "sessionDelivery.markAttemptStarted",
			input: prepareEntry({
				...entry,
				deliveryStartedAt: entry.deliveryStartedAt ?? Date.now()
			}, "update")
		});
	} catch (error) {
		throw new SessionDeliveryAttemptStartError(`Session delivery ${entry.id} could not persist attempt ownership`, { cause: error });
	}
}
async function markSessionDeliverySettlement(entry, outcome, context) {
	try {
		await executeSessionDelivery(context, {
			type: "sessionDelivery.markSettlement",
			input: prepareEntry({
				...entry,
				settlementOutcome: outcome,
				...outcome === "recovered" ? { acknowledgedAt: entry.acknowledgedAt ?? Date.now() } : {}
			}, "update")
		});
	} catch (error) {
		throw new SessionDeliveryAcknowledgementFinalizeError(entry.id, { cause: error });
	}
}
async function completeSessionDelivery(id, context) {
	try {
		await executeSessionDelivery(context, {
			type: "sessionDelivery.complete",
			input: { id }
		});
	} catch (error) {
		throw new SessionDeliveryAcknowledgementFinalizeError(id, { cause: error });
	}
}
async function failSessionDelivery(id, error, context, options) {
	return executeSessionDelivery(context, {
		type: "sessionDelivery.fail",
		input: {
			id,
			error,
			...options
		}
	});
}
async function loadPendingSessionDelivery(id, context) {
	const entry = await executeSessionDelivery(context, {
		type: "sessionDelivery.load",
		input: { id }
	});
	context.admission.assertCurrent();
	return entry;
}
async function loadPendingSessionDeliveries(context) {
	const entries = await executeSessionDelivery(context, {
		type: "sessionDelivery.list",
		input: void 0
	});
	context.admission.assertCurrent();
	return entries;
}
async function moveSessionDeliveryToFailed(id, context) {
	return executeSessionDelivery(context, {
		type: "sessionDelivery.moveToFailed",
		input: { id }
	});
}
//#endregion
export { consumeExpectedSessionWorkAdmission as _, enqueueSessionDelivery as a, loadPendingSessionDelivery as c, mergeSessionDeliveryPreparedMediaBlocks as d, moveSessionDeliveryToFailed as f, assertExpectedExistingSession as g, ExpectedExistingSessionChangedError as h, enqueueClaimedSessionDelivery as i, markSessionDeliveryAttemptStarted as l, withSessionDeliveryEnqueueAdmission as m, completeSessionDelivery as n, failSessionDelivery as o, releaseSessionDeliveryClaim as p, deferSessionDelivery as r, loadPendingSessionDeliveries as s, advanceSessionDeliveryAgentRun as t, markSessionDeliverySettlement as u, resolveExpectedExistingSessionConstraint as v, validateExpectedExistingSessionTarget as y };
