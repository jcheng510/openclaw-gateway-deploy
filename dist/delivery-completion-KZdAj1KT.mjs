import { r as resolveStateDir } from "./state-dir-CfAW6S2K.mjs";
import { n as executeSqliteQuerySync, s as prepareSqliteQuerySync } from "./kysely-sync-Y4_ti-rQ.mjs";
import { o as isGatewayExternallySupervised } from "./gateway-supervision-fKhmwUVZ.mjs";
import { n as normalizeAgentId } from "./agent-id-D1-Q6vR4.mjs";
import { r as captureOpenClawStateWorkerContext } from "./openclaw-state-worker-context-C_iAE7YK.mjs";
import "./session-key-BC4m_Ly5.mjs";
import { c as resolveOpenClawAgentSqlitePath, o as isSameOpenClawAgentDatabasePath } from "./openclaw-agent-db.paths-Dv3PPTNK.mjs";
import { c as openOpenClawAgentDatabase, d as runOpenClawAgentWriteTransaction } from "./openclaw-agent-db-CZUYuo7P.mjs";
import { _ as toDatabaseOptions, c as resolveSqliteReadScope, i as getSessionKysely } from "./session-accessor.sqlite-scope-AxUEwRt8.mjs";
import { u as patchSessionEntryCore } from "./session-accessor.sqlite-entry-C87Sde4p.mjs";
import "./session-accessor-CGLseszP.mjs";
import { o as mergeRestartRecoveryTerminalDeliveryEvidence } from "./restart-recovery-state-DXIMXTjg.mjs";
import { r as getOwedHarnessCompletionTask } from "./agent-harness-completion-recovery-Bd8kJDPx.mjs";
import { i as resolveMessageReceiptPrimaryId } from "./receipt-Cu38Wczp.mjs";
import { s as runConversationDatabaseWrite } from "./conversation-registry-CJJRy_lh.mjs";
import { n as resolveDeliveryQueueStateEnv } from "./delivery-queue-state-context-BtpRP2xf.mjs";
import "./delivery-queue-sqlite-BLFBXqlF.mjs";
import crypto from "node:crypto";
//#region src/config/sessions/conversation-delivery-store.ts
function resolveDatabaseOptions(scope) {
	return toDatabaseOptions(resolveSqliteReadScope({
		agentId: scope.agentId,
		...scope.env ? { env: scope.env } : {},
		...scope.storePath ? { storePath: scope.storePath } : {}
	}));
}
function normalizeOperationId(value) {
	const operationId = value.trim();
	if (!operationId) throw new Error("Conversation delivery operation id is required");
	return operationId;
}
function hashMessage(message) {
	return crypto.createHash("sha256").update(message).digest("hex");
}
function normalizeStatus(value) {
	switch (value) {
		case "created":
		case "queued":
		case "sent":
		case "suppressed":
		case "rejected":
		case "unknown":
		case "replied": return value;
		default: throw new Error(`Invalid conversation delivery status: ${value}`);
	}
}
function normalizeOperationKind(value) {
	if (value === "send" || value === "turn") return value;
	throw new Error(`Invalid conversation delivery operation kind: ${value}`);
}
function mapRow(row) {
	const reply = row.reply_message_id && row.reply_text !== null && row.reply_timestamp !== null ? {
		messageId: row.reply_message_id,
		...row.reply_to_id ? { replyToId: row.reply_to_id } : {},
		...row.reply_thread_id ? { threadId: row.reply_thread_id } : {},
		text: row.reply_text,
		timestamp: row.reply_timestamp
	} : void 0;
	return {
		operationId: row.operation_id,
		operationKind: normalizeOperationKind(row.operation_kind),
		conversationRef: row.conversation_id,
		channel: row.channel,
		...row.source_session_key ? { sourceSessionKey: row.source_session_key } : {},
		messageHash: row.message_hash,
		status: normalizeStatus(row.status),
		...row.prepared_message_id ? { preparedMessageId: row.prepared_message_id } : {},
		...row.platform_message_id ? { platformMessageId: row.platform_message_id } : {},
		...row.queue_id ? { queueId: row.queue_id } : {},
		...row.rejection_error ? { rejectionError: row.rejection_error } : {},
		...reply ? { reply } : {},
		createdAt: row.created_at,
		updatedAt: row.updated_at
	};
}
var ConversationDeliveryInputError = class extends Error {
	constructor(message) {
		super(message);
		this.name = "ConversationDeliveryInputError";
	}
};
var ConversationDeliveryMissingError = class extends Error {};
function assertConversationDeliveryInput(record, input, messageHash = hashMessage(input.message)) {
	if (record.conversationRef !== input.conversationRef || record.operationKind !== input.operationKind || record.sourceSessionKey !== (input.sourceSessionKey?.trim() || void 0) || record.messageHash !== messageHash) throw new ConversationDeliveryInputError(`Conversation delivery operation was reused with different input: ${record.operationId}`);
}
function createOperationQuery(database) {
	const db = getSessionKysely(database);
	return prepareSqliteQuerySync(database, (parameter) => db.selectFrom("conversation_deliveries as delivery").innerJoin("conversations as conversation", "conversation.conversation_id", "delivery.conversation_id").selectAll("delivery").select("conversation.channel as channel").where("delivery.operation_id", "=", parameter((operationId) => operationId)));
}
const operationQueryByDatabase = /* @__PURE__ */ new WeakMap();
function selectOperation(database, operationId) {
	let query = operationQueryByDatabase.get(database.db);
	if (!query) {
		query = createOperationQuery(database.db);
		operationQueryByDatabase.set(database.db, query);
	}
	const row = query(operationId).rows[0];
	return row ? mapRow(row) : void 0;
}
/** Reads one durable conversation operation by its stable id. */
function getConversationDeliveryOperation(scope, operationId, expectedInput) {
	const record = selectOperation(openOpenClawAgentDatabase(resolveDatabaseOptions(scope)), normalizeOperationId(operationId));
	if (record && expectedInput) assertConversationDeliveryInput(record, expectedInput);
	return record;
}
/** Creates one idempotent delivery operation or returns its authoritative prior state. */
function beginConversationDeliveryOperation(scope, params) {
	const operationId = normalizeOperationId(params.operationId);
	const sourceSessionKey = params.sourceSessionKey?.trim() || void 0;
	const messageHash = hashMessage(params.message);
	return runOpenClawAgentWriteTransaction((database) => {
		const existing = selectOperation(database, operationId);
		if (existing) {
			assertConversationDeliveryInput(existing, params, messageHash);
			return {
				created: false,
				record: existing
			};
		}
		const now = Date.now();
		const db = getSessionKysely(database.db);
		executeSqliteQuerySync(database.db, db.insertInto("conversation_deliveries").values({
			operation_id: operationId,
			operation_kind: params.operationKind,
			conversation_id: params.conversationRef,
			source_session_key: sourceSessionKey ?? null,
			message_hash: messageHash,
			status: "created",
			prepared_message_id: params.preparedMessageId ?? null,
			platform_message_id: null,
			queue_id: null,
			rejection_error: null,
			reply_message_id: null,
			reply_to_id: null,
			reply_thread_id: null,
			reply_text: null,
			reply_timestamp: null,
			created_at: now,
			updated_at: now
		}));
		const record = selectOperation(database, operationId);
		if (!record) throw new Error(`Conversation delivery operation was not persisted: ${operationId}`);
		return {
			created: true,
			record
		};
	}, resolveDatabaseOptions(scope), { operationLabel: "conversation-delivery.begin" });
}
function updateConversationDeliveryOperation(scope, params) {
	const operationId = normalizeOperationId(params.operationId);
	return runOpenClawAgentWriteTransaction((database) => {
		const current = selectOperation(database, operationId);
		if (!current) throw new ConversationDeliveryMissingError(`Conversation delivery operation not found: ${operationId}`);
		if (!params.allowedFrom.includes(current.status)) return current;
		const db = getSessionKysely(database.db);
		executeSqliteQuerySync(database.db, db.updateTable("conversation_deliveries").set({
			status: params.status,
			...params.queueId !== void 0 ? { queue_id: params.queueId } : {},
			...params.platformMessageId !== void 0 ? { platform_message_id: params.platformMessageId } : {},
			...params.rejectionError !== void 0 ? { rejection_error: params.rejectionError } : {},
			...params.reply ? {
				reply_message_id: params.reply.messageId,
				reply_to_id: params.reply.replyToId ?? null,
				reply_thread_id: params.reply.threadId ?? null,
				reply_text: params.reply.text,
				reply_timestamp: params.reply.timestamp
			} : {},
			updated_at: Date.now()
		}).where("operation_id", "=", operationId));
		const record = selectOperation(database, operationId);
		if (!record) throw new Error(`Conversation delivery operation disappeared: ${operationId}`);
		return record;
	}, resolveDatabaseOptions(scope), { operationLabel: `conversation-delivery.${params.status}` });
}
function markConversationDeliveryQueued(scope, operationId, queueId) {
	return updateConversationDeliveryOperation(scope, {
		operationId,
		status: "queued",
		queueId,
		allowedFrom: ["created"]
	});
}
function markConversationDeliverySent(scope, operationId, platformMessageId) {
	return updateConversationDeliveryOperation(scope, {
		operationId,
		status: "sent",
		...platformMessageId ? { platformMessageId } : {},
		allowedFrom: ["created", "queued"]
	});
}
function markConversationDeliverySuppressed(scope, operationId) {
	return updateConversationDeliveryOperation(scope, {
		operationId,
		status: "suppressed",
		allowedFrom: ["created", "queued"]
	});
}
function markConversationDeliveryRejected(scope, operationId, rejectionError) {
	const normalizedError = rejectionError.trim();
	if (!normalizedError) throw new Error("Conversation delivery rejection error is required");
	return updateConversationDeliveryOperation(scope, {
		operationId,
		status: "rejected",
		rejectionError: normalizedError,
		allowedFrom: ["created", "queued"]
	});
}
function markConversationDeliveryUnknown(scope, operationId) {
	return updateConversationDeliveryOperation(scope, {
		operationId,
		status: "unknown",
		allowedFrom: ["created", "queued"]
	});
}
function markConversationDeliveryReplied(scope, params) {
	return updateConversationDeliveryOperation(scope, {
		operationId: params.operationId,
		status: "replied",
		reply: params.reply,
		allowedFrom: ["queued", "sent"]
	});
}
/** Finds the durable correlated turn associated with an inbound transport reply. */
function findConversationTurnDeliveryByReplyTarget(scope, params) {
	const database = openOpenClawAgentDatabase(resolveDatabaseOptions(scope));
	const db = getSessionKysely(database.db);
	const row = executeSqliteQuerySync(database.db, db.selectFrom("conversation_deliveries as delivery").innerJoin("conversations as conversation", "conversation.conversation_id", "delivery.conversation_id").selectAll("delivery").select("conversation.channel as channel").where("delivery.conversation_id", "=", params.conversationRef).where("delivery.operation_kind", "=", "turn").where((eb) => eb.or([eb("delivery.platform_message_id", "=", params.replyToId), eb("delivery.prepared_message_id", "=", params.replyToId)])).where("delivery.status", "in", [
		"queued",
		"sent",
		"replied"
	]).orderBy("delivery.updated_at", "desc").limit(1)).rows[0];
	return row ? mapRow(row) : void 0;
}
//#endregion
//#region src/infra/outbound/delivery-completion.ts
function captureConversationDeliveryTarget(scope) {
	return {
		workerContext: captureOpenClawStateWorkerContext({ env: scope.env }),
		agentId: scope.agentId,
		databaseAgentId: scope.databaseAgentId,
		storePath: scope.storePath,
		stateDir: resolveStateDir(scope.env),
		...isGatewayExternallySupervised(scope.env) ? { supervisorMode: "external" } : {}
	};
}
function resolveConversationDeliveryScope(completion, stateDir, stateContext, target) {
	const scope = {
		agentId: completion.agentId,
		...completion.storePath ? { storePath: completion.storePath } : {},
		env: resolveDeliveryQueueStateEnv(stateDir, target ?? stateContext)
	};
	if (!target) return scope;
	const options = toDatabaseOptions(resolveSqliteReadScope(scope));
	if (normalizeAgentId(scope.agentId) !== normalizeAgentId(target.agentId) || options.agentId !== target.databaseAgentId || !isSameOpenClawAgentDatabasePath(resolveOpenClawAgentSqlitePath(options), target.storePath)) throw new Error("Conversation delivery target does not match durable custody");
	return {
		...scope,
		storePath: target.storePath,
		databaseAgentId: target.databaseAgentId
	};
}
async function conversationResult(completion, update, stateDir, stateContext, target) {
	let record;
	try {
		record = await runConversationDatabaseWrite(resolveConversationDeliveryScope(completion, stateDir, stateContext, target), update);
	} catch (error) {
		if (error instanceof ConversationDeliveryMissingError) return { state: "stale" };
		throw error;
	}
	const delivered = record.status === "sent" || record.status === "replied";
	return {
		state: delivered ? "delivered" : record.status === "suppressed" || record.status === "rejected" || record.status === "unknown" ? record.status : "queued",
		...delivered && (record.platformMessageId || record.preparedMessageId) ? { platformMessageId: record.platformMessageId ?? record.preparedMessageId } : {},
		...record.status === "rejected" && record.rejectionError ? { rejectionError: record.rejectionError } : {}
	};
}
async function settlePendingFinalDelivery(completion, state, expectedStates, options = {}) {
	let settled = "stale";
	let wakeRecovery = false;
	await patchSessionEntryCore({
		agentId: completion.agentId,
		sessionKey: completion.sessionKey,
		storePath: completion.storePath,
		env: resolveDeliveryQueueStateEnv(options.stateDir, options.stateContext)
	}, (entry) => {
		const internalEntry = entry;
		if (internalEntry.sessionId !== completion.sessionId || internalEntry.pendingFinalDelivery?.intentId !== completion.intentId) return null;
		const deliveries = internalEntry.pendingFinalDelivery.deliveries;
		const index = deliveries?.findIndex(({ id }) => id === completion.deliveryId) ?? -1;
		if (!deliveries || index < 0) return null;
		const authority = completion.sessionWriterDeliveryAuthority;
		const claim = authority?.harnessCompletion;
		if (completion.agentId !== void 0 && (authority?.agentId !== void 0 && normalizeAgentId(authority.agentId) !== normalizeAgentId(completion.agentId) || claim && normalizeAgentId(claim.requesterAgentId) !== normalizeAgentId(completion.agentId))) return null;
		if (claim && (!authority || authority.sessionKey !== completion.sessionKey || authority.storePath !== void 0 && authority.storePath !== completion.storePath || claim.requesterSessionKey !== completion.sessionKey || claim.sessionId !== completion.sessionId || authority.expectedSessionId !== completion.sessionId || authority.agentId !== void 0 && authority.agentId !== claim.requesterAgentId || authority.expectedLifecycleRevision !== void 0 && authority.expectedLifecycleRevision !== internalEntry.lifecycleRevision || authority.expectedWriterRunId !== void 0 && authority.expectedWriterRunId !== internalEntry.activeWriterRunId || !getOwedHarnessCompletionTask(claim, internalEntry))) return null;
		const current = deliveries[index].state;
		if (expectedStates && !expectedStates.some((expected) => expected === current)) return null;
		settled = current === "delivered" || current === "suppressed" || current === "unknown" && state === "unknown" ? current : state;
		const pending = internalEntry.pendingFinalDelivery;
		const existingNotice = internalEntry.pendingDeliveryNotice;
		const owedNotice = settled === "unknown" && (current === "queued" || current === "unknown") && pending.context && pending.intentId && existingNotice?.intentId !== pending.intentId && (!existingNotice || existingNotice.createdAt <= pending.createdAt) ? { pendingDeliveryNotice: {
			createdAt: pending.createdAt,
			context: pending.context,
			intentId: pending.intentId,
			state: "owed"
		} } : void 0;
		const updatedDeliveries = deliveries.with(index, {
			id: completion.deliveryId,
			state: settled
		});
		const result = options.identifiedResult;
		const platformMessageId = result ? readPlatformMessageId(result) : void 0;
		const context = pending.context;
		const terminalEvidence = claim && result && platformMessageId && result.channel === context?.channel && context?.to && (!result.target || result.target.id === context.to) && settled === "delivered" && updatedDeliveries.every((delivery) => delivery.state === "delivered") ? mergeRestartRecoveryTerminalDeliveryEvidence(internalEntry.restartRecoveryTerminalDeliveryEvidence, [{
			runId: claim.sourceRunId,
			harnessCompletion: claim,
			deliveryContext: context,
			captured: true,
			payloads: [{ visible: true }],
			deliveryStatus: {
				status: "sent",
				resultCount: 1
			},
			durableFinalReceipt: {
				intentId: completion.intentId,
				deliveryId: completion.deliveryId,
				platformMessageId
			}
		}]) : void 0;
		const clearsNotice = existingNotice?.state !== "acknowledged" && !updatedDeliveries.some((delivery) => delivery.state === "unknown") && settled !== "queued" && settled !== "unknown" && existingNotice?.intentId === pending.intentId;
		if (settled === current && !owedNotice && !clearsNotice && !terminalEvidence) return null;
		wakeRecovery = settled !== "queued" && internalEntry.status === "running" && internalEntry.abortedLastRun === true;
		return {
			...internalEntry.mainRestartRecovery ? { mainRestartRecovery: {
				...internalEntry.mainRestartRecovery,
				revision: internalEntry.mainRestartRecovery.revision + 1
			} } : {},
			pendingFinalDelivery: {
				...internalEntry.pendingFinalDelivery,
				deliveries: updatedDeliveries
			},
			...clearsNotice ? { pendingDeliveryNotice: void 0 } : owedNotice,
			...terminalEvidence ? { restartRecoveryTerminalDeliveryEvidence: terminalEvidence } : {}
		};
	}, {
		skipMaintenance: true,
		takeCacheOwnership: true,
		preserveActivity: options.preserveActivity
	});
	if (wakeRecovery) {
		const { scheduleMainSessionRecoveryPendingTarget } = await import("./main-session-recovery-owner-release-CV_S0eN1.mjs");
		scheduleMainSessionRecoveryPendingTarget({
			...completion.agentId !== void 0 ? { agentId: completion.agentId } : {},
			sessionId: completion.sessionId,
			sessionKey: completion.sessionKey,
			...options.stateDir !== void 0 ? { stateDir: options.stateDir } : {},
			storePath: completion.storePath
		});
	}
	return { state: settled };
}
function readPlatformMessageId(result) {
	return (result.receipt ? resolveMessageReceiptPrimaryId(result.receipt) : void 0) ?? (result.messageId.trim() || void 0);
}
/** Records queue ownership before either the live sender or recovery crosses platform I/O. */
async function markDurableDeliveryQueued(completion, queueId, expectedPendingFinalState, stateDir, stateContext, target) {
	return completion.kind === "pending-final" ? await settlePendingFinalDelivery(completion, "queued", expectedPendingFinalState ? ["prepared", "queued"] : void 0, {
		stateDir,
		stateContext
	}) : conversationResult(completion, (scope) => markConversationDeliveryQueued(scope, completion.operationId, queueId), stateDir, stateContext, target);
}
/** Finalizes owner state from identified platform evidence before queue acknowledgement. */
async function completeDurableDelivery(completion, result, stateDir, stateContext, target) {
	return completion.kind === "pending-final" ? await settlePendingFinalDelivery(completion, "delivered", void 0, {
		stateDir,
		stateContext,
		identifiedResult: result
	}) : conversationResult(completion, (scope) => markConversationDeliverySent(scope, completion.operationId, readPlatformMessageId(result)), stateDir, stateContext, target);
}
/** Finalizes a policy-suppressed send before its durable intent is acknowledged. */
async function suppressDurableDelivery(completion, stateDir, stateContext, target) {
	return completion.kind === "pending-final" ? await settlePendingFinalDelivery(completion, "suppressed", void 0, {
		stateDir,
		stateContext
	}) : conversationResult(completion, (scope) => markConversationDeliverySuppressed(scope, completion.operationId), stateDir, stateContext, target);
}
/** Finalizes a permanent provider rejection that provably preceded platform I/O. */
async function rejectDurableDelivery(completion, error, stateDir, stateContext, target) {
	return completion.kind === "pending-final" ? await settlePendingFinalDelivery(completion, "suppressed", void 0, {
		stateDir,
		stateContext
	}) : conversationResult(completion, (scope) => markConversationDeliveryRejected(scope, completion.operationId, error), stateDir, stateContext, target);
}
/** Makes a dead-lettered durable send terminal without allowing a blind replay. */
async function failDurableDelivery(completion, stateDir, stateContext, target) {
	return completion.kind === "pending-final" ? await settlePendingFinalDelivery(completion, "unknown", void 0, {
		stateDir,
		stateContext
	}) : conversationResult(completion, (scope) => markConversationDeliveryUnknown(scope, completion.operationId), stateDir, stateContext, target);
}
/** Settles the completion owner from the final evidence held by its lifecycle owner. */
async function settleDurableDelivery(completion, evidence, stateDir, stateContext, target) {
	return "result" in evidence ? completeDurableDelivery(completion, evidence.result, stateDir, stateContext, target) : evidence.platformSendStarted ? failDurableDelivery(completion, stateDir, stateContext, target) : suppressDurableDelivery(completion, stateDir, stateContext, target);
}
//#endregion
export { rejectDurableDelivery as a, settlePendingFinalDelivery as c, findConversationTurnDeliveryByReplyTarget as d, getConversationDeliveryOperation as f, markConversationDeliverySuppressed as h, markDurableDeliveryQueued as i, ConversationDeliveryInputError as l, markConversationDeliverySent as m, completeDurableDelivery as n, resolveConversationDeliveryScope as o, markConversationDeliveryReplied as p, failDurableDelivery as r, settleDurableDelivery as s, captureConversationDeliveryTarget as t, beginConversationDeliveryOperation as u };
