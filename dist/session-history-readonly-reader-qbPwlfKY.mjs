import { a as asOptionalRecord } from "./record-coerce-TIsquoVR.mjs";
import { a as iterateSqliteQuerySync, i as getNodeSqliteKysely, r as executeSqliteQueryTakeFirstSync, u as sql } from "./kysely-sync-Y4_ti-rQ.mjs";
import { o as withScopedOpenClawAgentDatabaseReadOnly } from "./openclaw-agent-db-readonly-scope-CuYmDv32.mjs";
import { u as transcriptEventNavigationSql } from "./transcript-payload-BY1k8MVa.mjs";
import { c as readSessionEntryRow } from "./session-accessor.sqlite-entry-read-oKmXbFma.mjs";
import { u as readWithCanonicalSessionAdmission } from "./session-canonical-key-Cjd4Pn_g.mjs";
import { n as SessionTranscriptStorageUnavailableError, t as SessionTranscriptProjectionUnavailableError } from "./session-transcript-projection-error-B7C6SQei.mjs";
import { i as resolveSqliteSessionTranscriptReadFence } from "./session-transcript-read-fence-Bq0b1oaG.mjs";
import { _ as readCurrentProjectionSnapshot, m as getActiveTranscriptKysely, u as resolveVisibleMessagePositions } from "./session-accessor.sqlite-reset-window-aHCfqvV_.mjs";
import { i as buildRunUserTurnIdempotencyKey } from "./user-turn-transcript.metadata-C4MejEIQ.mjs";
import { c as resolveHistoryMessageSequence, d as resolveVisibleHistoryRange, s as readTranscriptDisplayDeltaFromProjection, u as resolveVisibleHistoryProjection } from "./session-accessor.sqlite-history-query-C4OrjAh-.mjs";
import { t as createSessionTranscriptReader } from "./session-transcript-read-kernel-Bwx5_ZFV.mjs";
import { s as isSubagentCoordinationHistoryInput } from "./chat-display-projection.history-BtIa0UYa.mjs";
import { t as createBoundSessionHistorySubagentSource } from "./session-history-subagent-sources-BOsHVTQh.mjs";
//#region src/config/sessions/session-accessor.sqlite-history-input-visibility.ts
const inputMessageJson = sql`json_object('role', json_extract(${transcriptEventNavigationSql("event")}, '$.message.role'),
    'idempotencyKey', json_extract(${transcriptEventNavigationSql("event")}, '$.message.idempotencyKey'),
    'provenance', json_extract(${transcriptEventNavigationSql("event")}, '$.message.provenance'),
    '__openclaw', json_object(
      'runId', json_extract(${transcriptEventNavigationSql("event")}, '$.message.__openclaw.runId'),
      'steerTargetRunId', json_extract(${transcriptEventNavigationSql("event")}, '$.message.__openclaw.steerTargetRunId')))`;
/** Resolve a run's hidden input and the first visible steer on its active transcript branch. */
function readSessionTranscriptRunInputVisibilityFromProjection(projection, params) {
	const db = getActiveTranscriptKysely(projection.database);
	resolveSqliteSessionTranscriptReadFence({
		database: projection.database,
		...projection.resolved
	});
	const visible = resolveVisibleMessagePositions(projection);
	const history = resolveVisibleHistoryProjection(projection);
	const { messageEnd } = resolveVisibleHistoryRange(history, params.messageSeq - 1, params.messageSeq);
	const scannedThroughMessagePosition = messageEnd <= visible.kept.length ? visible.kept[messageEnd - 1] ?? -1 : visible.postStart + messageEnd - visible.kept.length - 1;
	const hidden = {
		hidden: true,
		scannedThroughMessageSeq: params.messageSeq,
		scannedThroughMessagePosition
	};
	const keptPositions = sql`(SELECT value FROM json_each(${JSON.stringify(visible.kept)}))`;
	const userInputs = db.selectFrom("session_transcript_active_events as active").innerJoin("transcript_events as event", (join) => join.onRef("event.session_id", "=", "active.session_id").onRef("event.seq", "=", "active.event_seq")).select(["active.message_position", inputMessageJson.as("message_json")]).where("active.session_id", "=", projection.resolved.sessionId).where("active.message_position", "<", projection.state.activeMessageCount).where((eb) => visible.kept.length > 0 ? eb.or([eb("active.message_position", ">=", visible.postStart), eb("active.message_position", "in", keptPositions)]) : eb("active.message_position", ">=", visible.postStart)).where(sql`json_extract(${transcriptEventNavigationSql("event")}, '$.message.role')`, "=", "user").$narrowType();
	let readAfter = params.previous?.scannedThroughMessagePosition;
	if (readAfter === void 0) {
		const anchor = executeSqliteQueryTakeFirstSync(projection.database.db, userInputs.innerJoin("transcript_event_identities as identity", (join) => join.onRef("identity.session_id", "=", "active.session_id").onRef("identity.seq", "=", "active.event_seq")).where("identity.message_idempotency_key", "=", params.idempotencyKey).where(sql`json_extract(${transcriptEventNavigationSql("event")}, '$.message.__openclaw.steerTargetRunId')`, "is", null).limit(1));
		if (!anchor || !params.isHiddenInput(JSON.parse(anchor.message_json))) return { hidden: false };
		readAfter = anchor.message_position;
	}
	const laterInputs = userInputs.where("active.message_position", ">", readAfter).where("active.message_position", "<=", scannedThroughMessagePosition).where((eb) => eb.or([eb(sql`json_extract(${transcriptEventNavigationSql("event")}, '$.message.__openclaw.steerTargetRunId')`, "=", params.runId), eb(sql`json_extract(${transcriptEventNavigationSql("event")}, '$.message.__openclaw.runId')`, "=", params.runId)])).orderBy("active.message_position", "asc");
	for (const row of iterateSqliteQuerySync(projection.database.db, laterInputs)) if (!params.isHiddenInput(JSON.parse(row.message_json))) {
		const firstVisibleMessageSeq = resolveHistoryMessageSequence(visible, history, row.message_position);
		return firstVisibleMessageSeq === void 0 ? { hidden: false } : {
			...hidden,
			firstVisibleMessageSeq
		};
	}
	return hidden;
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-transcript-binding.ts
function readSessionTranscriptBindingFromProjection(projection) {
	resolveSqliteSessionTranscriptReadFence({
		database: projection.database,
		...projection.resolved
	});
	const { sessionId } = projection.resolved;
	const owner = executeSqliteQueryTakeFirstSync(projection.database.db, getNodeSqliteKysely(projection.database.db).selectFrom("session_windows").select("session_key").where("session_id", "=", sessionId));
	if (!owner) return;
	return {
		sessionId,
		sessionKey: owner.session_key
	};
}
//#endregion
//#region src/gateway/session-history-readonly-reader.ts
/** Source and run facts live only for one history operation, on its admitted database. */
function createBoundSessionHistorySubagentProjection(readSnapshot, stateDatabase, readSourceDatabases) {
	const runs = /* @__PURE__ */ new Map();
	const readSource = createBoundSessionHistorySubagentSource(readSnapshot, stateDatabase, readSourceDatabases);
	return {
		isSubagentSession: readSource,
		isSubagentRunMessage(runId, messageSeq) {
			if (messageSeq === void 0) return false;
			let visibility = runs.get(runId);
			if (!visibility || visibility.hidden && visibility.firstVisibleMessageSeq === void 0 && visibility.scannedThroughMessageSeq < messageSeq) {
				visibility = readSnapshot((projection) => readSessionTranscriptRunInputVisibilityFromProjection(projection, {
					idempotencyKey: buildRunUserTurnIdempotencyKey(runId),
					runId,
					messageSeq,
					previous: visibility?.hidden ? visibility : void 0,
					isHiddenInput: (message) => {
						const record = asOptionalRecord(message);
						return Boolean(record && isSubagentCoordinationHistoryInput(record, readSource));
					}
				}));
				runs.set(runId, visibility);
			}
			return visibility.hidden && (visibility.firstVisibleMessageSeq === void 0 || messageSeq < visibility.firstVisibleMessageSeq);
		}
	};
}
function createReadonlySessionHistoryReader(target, resolveSourceDatabases) {
	let sourceDatabases = target.sourceDatabases;
	const readSnapshot = (read) => {
		const result = withScopedOpenClawAgentDatabaseReadOnly((database) => readWithCanonicalSessionAdmission(database, () => {
			const entryValidationKey = target.entryValidationKey;
			if (entryValidationKey !== void 0) readSessionEntryRow(database, entryValidationKey);
			return readCurrentProjectionSnapshot(database, {
				agentId: target.transcript.agentId,
				sessionId: target.transcript.sessionId,
				sessionKey: target.transcript.sessionKey,
				databaseAgentId: target.database.agentId,
				path: target.database.path
			}, read);
		}), target.database);
		if (!result.found) throw new SessionTranscriptStorageUnavailableError(result.reason);
		if (result.value.kind === "unavailable") throw new SessionTranscriptProjectionUnavailableError(target.transcript.sessionId);
		return result.value.value;
	};
	return {
		readArtifactSummaries: async (query) => {
			const { readArtifactSummariesFromProjection } = await import("./session-artifact-read-AukVXVTp.mjs");
			return readSnapshot((projection) => readArtifactSummariesFromProjection(projection, query));
		},
		readTranscriptBinding: () => readSnapshot((projection) => readSessionTranscriptBindingFromProjection(projection)),
		readTranscriptDisplayDelta: (limits) => readSnapshot((projection) => readTranscriptDisplayDeltaFromProjection(projection, limits)),
		...createSessionTranscriptReader({
			resolveTarget: async () => target.transcript,
			readSnapshot: async (_transcript, read) => readSnapshot(read)
		}),
		subagentCoordination: createBoundSessionHistorySubagentProjection(readSnapshot, target.stateDatabase, () => sourceDatabases ??= resolveSourceDatabases?.())
	};
}
//#endregion
export { createReadonlySessionHistoryReader as n, createBoundSessionHistorySubagentProjection as t };
