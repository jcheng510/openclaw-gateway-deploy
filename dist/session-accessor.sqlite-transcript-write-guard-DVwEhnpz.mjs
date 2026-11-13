import { I as resolveTimestampMsToIsoString } from "./number-coercion-Dq1l5muL.mjs";
import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { r as executeSqliteQueryTakeFirstSync, u as sql } from "./kysely-sync-Y4_ti-rQ.mjs";
import { t as redactIdentifier } from "./node-crypto-BInnzoVt.mjs";
import { a as prepareTranscriptPayloadForReuse } from "./transcript-payload-BY1k8MVa.mjs";
import { n as assertOwnedTranscriptWriteCommit, t as SessionTranscriptWriterClaimReboundError } from "./transcript-write-context-D53SX4tj.mjs";
import { n as withOpenClawAgentDatabaseReadOnly } from "./openclaw-agent-db-readonly-CkWWSfuG.mjs";
import { r as canonicalizePersistedUserMessageMedia } from "./media-facts-CYny4oQ-.mjs";
import { _ as toDatabaseOptions, i as getSessionKysely, m as resolveSqliteTranscriptScope, v as transcriptWriteScopeIsCurrent } from "./session-accessor.sqlite-scope-AxUEwRt8.mjs";
import { c as readSessionEntryRow } from "./session-accessor.sqlite-entry-read-oKmXbFma.mjs";
import "./session-accessor.sqlite-entry-store-JXJQe1fh.mjs";
import { f as resolveSessionPendingInputAppend, n as consumeSessionPendingInput } from "./session-accessor.sqlite-pending-inputs-BdT_Tg9N.mjs";
import { n as assertSessionTranscriptHot } from "./session-cold-storage-state-DkGnIhMN.mjs";
import { a as isOpenClawDeliveryMirrorAssistantMessage } from "./transcript-only-openclaw-assistant-CVgy4bjA.mjs";
import { C as readTranscriptIdentityByEventId, I as resolveTranscriptMessageAppendParent, N as isTranscriptEntryOnActivePathInTransaction } from "./session-accessor.sqlite-read-lTzWPVDn.mjs";
import { t as readMessageIdempotencyKey } from "./transcript-message-identity-BMBY4Kbd.mjs";
import { r as readActiveTranscriptEntryAnchorInTransaction } from "./session-accessor.sqlite-transcript-anchor-D71pHf5z.mjs";
import { c as redactTranscriptMessageForStorage, o as readTranscriptMessageByEventId, s as readTranscriptMessageByScopedIdempotencyKey, t as appendTranscriptEventInTransaction } from "./session-accessor.sqlite-transcript-store-CPlEEZZV.mjs";
import { t as ensureTranscriptHeader } from "./session-accessor.sqlite-transcript-header-DnlbeuET.mjs";
import { isDeepStrictEqual } from "node:util";
import { randomUUID } from "node:crypto";
//#region src/config/sessions/session-accessor.sqlite-transcript-message-append.ts
var TranscriptTurnAdmissionConflictError = class extends Error {
	constructor(idempotencyKey) {
		super(`Transcript idempotency key "${idempotencyKey}" conflicts with the admitted message.`);
		this.name = "TranscriptTurnAdmissionConflictError";
	}
};
function messagesMatchForIdempotentReplay(stored, candidate) {
	const storedDelivery = isRecord(stored) ? stored.openclawDelivery : void 0;
	const legacyMediaMirror = isRecord(stored) && isOpenClawDeliveryMirrorAssistantMessage(stored) && stored.api === "openclaw-transcript" && (storedDelivery === void 0 || isRecord(storedDelivery) && !Object.hasOwn(storedDelivery, "mediaUrls"));
	const serializedShape = (message, projectLegacyMedia = false) => {
		if (!isRecord(message)) return message;
		const { timestamp: _timestamp, ...stable } = message;
		if (projectLegacyMedia && isRecord(stable.openclawDelivery) && Array.isArray(stable.openclawDelivery.mediaUrls) && stable.openclawDelivery.mediaUrls.every((url) => typeof url === "string")) {
			const { mediaUrls: _mediaUrls, ...delivery } = stable.openclawDelivery;
			if (storedDelivery === void 0 && Object.keys(delivery).length === 0) delete stable.openclawDelivery;
			else stable.openclawDelivery = delivery;
		}
		const serialized = JSON.stringify(stable);
		return serialized === void 0 ? void 0 : JSON.parse(serialized);
	};
	return isDeepStrictEqual(serializedShape(stored), serializedShape(candidate, legacyMediaMirror));
}
function serializePreparedMessageEvent(envelope, messageJson) {
	return `${JSON.stringify(envelope).slice(0, -1)},"message":${messageJson}}`;
}
/** SessionManager owns a detached JSON message and retains this preparation across retries. */
function prepareTranscriptMessageAppend(options, candidate) {
	if (!isRecord(options.message) || options.message.role !== "assistant" && options.message.role !== "toolResult") return;
	const message = redactTranscriptMessageForStorage(options.message, options);
	const messageJson = JSON.stringify(canonicalizePersistedUserMessageMedia(message).message);
	const prepared = {
		messageJson,
		persistedMessage: JSON.parse(messageJson)
	};
	if (!candidate) return prepared;
	const eventJson = serializePreparedMessageEvent(candidate.envelope, messageJson);
	const read = withOpenClawAgentDatabaseReadOnly(({ db }) => prepareTranscriptPayloadForReuse(db, eventJson, {
		...candidate.envelope,
		message: prepared.persistedMessage
	}), toDatabaseOptions(resolveSqliteTranscriptScope(candidate.scope)));
	return read.found ? {
		...prepared,
		physicalPayload: read.value
	} : prepared;
}
function appendTranscriptMessageInTransaction(database, resolved, options, preparedMessage, projection) {
	const pending = resolveSessionPendingInputAppend(database, resolved, options.message);
	if (pending && readSessionEntryRow(database, resolved.sessionKey)?.entry.sessionId !== resolved.sessionId) throw new Error("Pending input session changed before transcript promotion");
	const serializeForStorage = (message) => preparedMessage?.persistedMessage ?? (options.messageAlreadyRedacted ? message : redactTranscriptMessageForStorage(message, options));
	const readAnchor = (params) => readActiveTranscriptEntryAnchorInTransaction({
		database,
		resolved,
		entryId: params.messageId,
		message: params.message
	});
	const existingAppendResult = (found) => {
		const anchor = readAnchor(found);
		if (pending) {
			if (found.messageId !== pending.inputId || !messagesMatchForIdempotentReplay(found.message, pending.message)) throw new TranscriptTurnAdmissionConflictError(pending.inputId);
			if (!anchor && !isTranscriptEntryOnActivePathInTransaction(database, resolved.sessionId, found.messageId)) throw new Error("Pending input is no longer active in its admitted transcript");
			consumeSessionPendingInput(database, pending);
		}
		return {
			appended: false,
			...anchor ? { anchor } : {},
			effectiveParentId: readTranscriptIdentityByEventId(database, resolved.sessionId, found.messageId)?.parentId ?? null,
			message: found.message,
			messageId: found.messageId
		};
	};
	const idempotencyKey = readMessageIdempotencyKey(options.message);
	if (idempotencyKey && options.idempotencyLookup !== "caller-checked") {
		const existing = readTranscriptMessageByScopedIdempotencyKey(database, resolved, idempotencyKey, options.idempotencyLookup);
		if (existing) {
			if (!options.prepareMessageAfterIdempotencyCheck && !messagesMatchForIdempotentReplay(existing.message, serializeForStorage(options.message))) throw new TranscriptTurnAdmissionConflictError(idempotencyKey);
			return existingAppendResult(existing);
		}
	}
	if (pending?.alreadyPromoted && !pending.stageRelocation) {
		const committed = readTranscriptMessageByEventId(database, resolved, pending.inputId);
		if (!committed) throw new Error("Pending input custody ended before transcript promotion");
		return existingAppendResult(committed);
	}
	const prepared = pending ? pending.message : options.prepareMessageAfterIdempotencyCheck ? options.prepareMessageAfterIdempotencyCheck(options.message) : options.message;
	if (prepared === void 0) return;
	const messageId = pending && !pending.alreadyPromoted ? pending.inputId : options.eventId ?? randomUUID();
	const now = options.now ?? Date.now();
	const finalMessage = pending ? prepared : serializeForStorage(prepared);
	if (!pending) options.beforeFreshMessageCommit?.();
	ensureTranscriptHeader(database, resolved, options.cwd, projection);
	const parentId = resolveTranscriptMessageAppendParent(database, resolved.sessionId, options);
	const event = {
		type: "message",
		id: messageId,
		parentId: parentId ?? null,
		...options.appendMode ? { appendMode: options.appendMode } : {},
		timestamp: resolveTimestampMsToIsoString(now),
		message: preparedMessage?.persistedMessage ?? finalMessage
	};
	let eventJson;
	if (preparedMessage) {
		const { message: _message, ...envelope } = event;
		eventJson = serializePreparedMessageEvent(envelope, preparedMessage.messageJson);
	}
	const appended = appendTranscriptEventInTransaction(database, resolved, event, {
		...projection,
		eventJson,
		preparedPayload: preparedMessage?.physicalPayload,
		idempotencyKeyMode: options.idempotencyLookup === "caller-checked" ? "relocate-owner" : options.idempotencyLookup === "scan-assistant" ? "preserve-owner" : "dedupe"
	});
	if (!appended) {
		const existing = (idempotencyKey && options.idempotencyLookup !== "caller-checked" ? readTranscriptMessageByScopedIdempotencyKey(database, resolved, idempotencyKey, options.idempotencyLookup) : void 0) ?? readTranscriptMessageByEventId(database, resolved, messageId);
		if (existing) {
			if (!options.prepareMessageAfterIdempotencyCheck && !messagesMatchForIdempotentReplay(existing.message, finalMessage)) throw new TranscriptTurnAdmissionConflictError(idempotencyKey ?? `event:${messageId}`);
			return existingAppendResult(existing);
		}
		throw new Error(`SQLite transcript append did not insert message ${messageId}.`);
	}
	const persistedMessage = preparedMessage?.persistedMessage ?? JSON.parse(appended).message;
	const anchor = readAnchor({
		message: persistedMessage,
		messageId
	});
	if (pending) {
		if (pending.stageRelocation) pending.stageRelocation(messageId);
		else consumeSessionPendingInput(database, pending);
	}
	return {
		appended: true,
		...anchor ? { anchor } : {},
		effectiveParentId: parentId ?? null,
		message: persistedMessage,
		messageId
	};
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-transcript-write-guard.ts
function assertNonMessageTranscriptEvent(event) {
	if (!event || typeof event !== "object" || Array.isArray(event)) return;
	if ("type" in event && event.type === "message") throw new Error("appendTranscriptEvent cannot write message transcript records; use appendTranscriptMessage instead.");
}
/** Revision guards keep this JSON predicate off stable mutation paths. */
function createSessionTranscriptOwnerPredicate(database, expected) {
	let query = getSessionKysely(database.db).selectFrom("session_nodes").select((eb) => eb.val(1).as("matches")).where("session_key", "=", expected.sessionKey).where("current_session_id", "=", expected.sessionId).where((eb) => eb(eb.fn("json_valid", ["entry_json"]), "=", 1)).where(sql`NOT EXISTS (
        SELECT 1 FROM json_each(entry_json)
        WHERE key IN ('sessionId', 'lifecycleRevision', 'activeWriterRunId')
        GROUP BY key HAVING count(*) > 1
      )`);
	for (const [jsonPath, value] of [
		["$.sessionId", expected.sessionId],
		["$.lifecycleRevision", expected.lifecycleRevision],
		["$.activeWriterRunId", expected.activeWriterRunId]
	]) query = query.where((eb) => value === void 0 ? eb(eb.fn("json_type", ["entry_json", eb.val(jsonPath)]), "is", null) : eb.and([eb(eb.fn("json_type", ["entry_json", eb.val(jsonPath)]), "=", "text"), eb(eb.fn("json_extract", ["entry_json", eb.val(jsonPath)]), "=", value)]));
	return () => executeSqliteQueryTakeFirstSync(database.db, query)?.matches === 1;
}
function resolveTranscriptAppendRefusal(entry, resolved, scope) {
	if (transcriptWriteScopeIsCurrent(entry, resolved.sessionId, scope)) return;
	const identity = {
		agentIdHash: redactIdentifier(resolved.agentId),
		expectedSessionIdHash: redactIdentifier(resolved.sessionId),
		sessionKeyHash: redactIdentifier(resolved.sessionKey)
	};
	if (!entry) return {
		...identity,
		code: "session-entry-missing"
	};
	return {
		...identity,
		actualSessionIdHash: redactIdentifier(entry.sessionId),
		code: "session-rebound"
	};
}
function assertLockedTranscriptWriteAllowed(database, resolved, scope) {
	assertSessionTranscriptHot(database.db, resolved.sessionId);
	const fencedScope = {
		...scope,
		sessionId: resolved.sessionId,
		sessionKey: resolved.sessionKey
	};
	assertOwnedTranscriptWriteCommit(fencedScope);
	if (fencedScope.expectedLifecycleRevision === void 0 && fencedScope.expectedWriterRunId === void 0) return;
	const fresh = readSessionEntryRow(database, resolved.sessionKey);
	const refusal = resolveTranscriptAppendRefusal(fresh?.entry, resolved, fencedScope);
	if (refusal) throw new SessionTranscriptWriterClaimReboundError(refusal);
	return fresh?.entry;
}
//#endregion
export { appendTranscriptMessageInTransaction as a, resolveTranscriptAppendRefusal as i, assertNonMessageTranscriptEvent as n, prepareTranscriptMessageAppend as o, createSessionTranscriptOwnerPredicate as r, assertLockedTranscriptWriteAllowed as t };
