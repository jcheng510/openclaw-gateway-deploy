import "./src-SskUVPJG.mjs";
import { t as expectDefined } from "./expect-lbe3Hgrh.mjs";
import { i as getNodeSqliteKysely, l as sqliteStringSet, n as executeSqliteQuerySync } from "./kysely-sync-Y4_ti-rQ.mjs";
import { a as withSqlitePostCommitPublications } from "./sqlite-post-commit-Dih1WMKX.mjs";
import { r as runSqliteDeferredTransactionSync } from "./sqlite-transaction-2VkikDo-.mjs";
import { i as readOpenClawAgentDatabaseIdentity, r as isOpenClawAgentDatabasePathCurrent } from "./openclaw-agent-db-identity-ChZ28OhF.mjs";
import { t as SessionMetadataUnavailableError } from "./session-metadata-unavailable-error-DwD7IuoE.mjs";
import { n as ok } from "./result-BQGgYouL.mjs";
import { u as resolveSessionLifecycleTimestamps } from "./lifecycle-DlS-bWdU.mjs";
import { n as withOpenClawAgentDatabaseReadOnly } from "./openclaw-agent-db-readonly-CkWWSfuG.mjs";
import { u as resolveSqliteSessionKey } from "./session-accessor.sqlite-scope-AxUEwRt8.mjs";
import { o as readBoardSessionKeys } from "./sqlite-board-store.kernel-Cr2GHVo9.mjs";
import { c as readSessionEntryRow, f as participantRecordsBySessionKey } from "./session-accessor.sqlite-entry-read-oKmXbFma.mjs";
import { a as assertCanonicalSqliteSessionRowsCurrent, d as readWithCanonicalSessionReaderContinuation, g as canonicalSessionKeyMigrationRequiredError, r as assertCanonicalSqliteSessionKeysCurrent } from "./session-canonical-key-Cjd4Pn_g.mjs";
import { o as readExactSessionEntryCandidatesInDatabase } from "./session-accessor.sqlite-entry-cache-DYTBofzQ.mjs";
import { r as listSessionMembersInDatabase } from "./session-sharing-store.kernel-BTYS_97Q.mjs";
import { r as readSelectedSessionEntriesInDatabase } from "./session-accessor.sqlite-entry-list.read-6sJ8GFrX.mjs";
import { T as readSessionEntryByIdInDatabase } from "./session-accessor.sqlite-pending-inputs-BdT_Tg9N.mjs";
import { a as runWithSessionTranscriptReadFence } from "./session-transcript-read-fence-Bq0b1oaG.mjs";
import { S as readTranscriptHeaderFromDatabase, h as readLatestAssistantTextFromDatabase } from "./session-accessor.sqlite-read-lTzWPVDn.mjs";
import { n as hasPendingSessionTranscriptArchives } from "./session-accessor.sqlite-archive-store-kernel-B7AKinHq.mjs";
import { r as readSessionBackingFactsInDatabase, u as readSessionTranscriptWatermarkInDatabase } from "./session-accessor-CGLseszP.mjs";
import { a as readSessionEntryReplacementState, i as readSessionCreationSnapshotInDatabase } from "./session-accessor.sqlite-replacement-state-tKkLifEu.mjs";
import { t as boundSessionDiagnosticText } from "./session-diagnostic-text-RSPQUBVJ.mjs";
import { t as readSessionActivitySummary } from "./activity-summary-CfqWjwl5.mjs";
//#region src/config/sessions/session-entry-read.worker.ts
/** Current identity and assistant bytes come from one existing-only read snapshot. */
function readSessionDiagnosticText(request) {
	const result = withOpenClawAgentDatabaseReadOnly((database) => readWithCanonicalSessionReaderContinuation(database, request.continuation, () => runSqliteDeferredTransactionSync(database.db, () => {
		const identity = readOpenClawAgentDatabaseIdentity(database);
		if (typeof identity.identity !== "string" || !isOpenClawAgentDatabasePathCurrent(database)) throw new Error("Session diagnostic read requires its current durable owner");
		const source = {
			agentId: database.agentId,
			path: database.path,
			databaseIdentity: identity.identity,
			databaseBirthtime: identity.birthtime
		};
		const scope = {
			agentId: request.scope.agentId,
			sessionKey: resolveSqliteSessionKey(request.scope.sessionKey, request.scope.agentId),
			sessionId: request.scope.sessionId
		};
		const entry = readSessionEntryRow(database, scope.sessionKey, "list")?.entry;
		if (entry?.sessionId !== scope.sessionId || entry.incognito === true) return {
			text: void 0,
			source
		};
		const latest = runWithSessionTranscriptReadFence(request.admission, () => readLatestAssistantTextFromDatabase(database, scope));
		return {
			text: latest ? boundSessionDiagnosticText(latest.text) : void 0,
			source
		};
	})), {
		...request.database,
		env: request.scope.env
	});
	if (!result.found && result.reason !== "database-missing") throw new SessionMetadataUnavailableError(result.reason);
	return {
		kind: "session-diagnostic-text",
		...result.found ? result.value : { text: void 0 }
	};
}
/** Full rows share a snapshot with lifecycle fallback; backing reads retain listing admission. */
function readExactSessionEntriesWithLifecycle(request) {
	const result = withOpenClawAgentDatabaseReadOnly((database) => request.projection === "backing" || request.projection === "list" ? {
		kind: "session-exact-entries",
		entries: request.projection === "list" ? readSelectedSessionEntriesInDatabase(database, request.sessionKeys, { continuation: request.continuation }) : readSessionBackingFactsInDatabase(database, request.sessionKeys, request.continuation),
		lifecycleTimestamps: {}
	} : withSqlitePostCommitPublications(database.db, () => runSqliteDeferredTransactionSync(database.db, () => {
		assertCanonicalSqliteSessionKeysCurrent(database);
		if (request.projection === "creation") {
			const { identity, filename } = readOpenClawAgentDatabaseIdentity(database);
			const sessionKey = request.sessionKeys[0];
			if (typeof identity !== "string" || !sessionKey || request.sessionKeys.length !== 1) throw new Error("Session creation snapshot requires its durable owner and target");
			return {
				kind: "session-exact-entries",
				entries: [],
				lifecycleTimestamps: {},
				creation: {
					...readSessionCreationSnapshotInDatabase(database, sessionKey, request.creationLabel),
					databaseIdentity: identity,
					databasePath: filename
				}
			};
		}
		if (request.projection === "replacement") {
			const identity = readOpenClawAgentDatabaseIdentity(database).identity;
			if (typeof identity !== "string" || !request.replacementSelection) throw new Error("Session replacement snapshot requires its durable owner and selection");
			const replacement = readSessionEntryReplacementState(database, request.replacementSelection);
			return {
				kind: "session-exact-entries",
				entries: replacement.entries,
				lifecycleTimestamps: {},
				replacement: {
					...replacement,
					databaseIdentity: identity
				}
			};
		}
		const selectedById = request.selection ? readSessionEntryByIdInDatabase(database, {
			sessionId: request.selection.sessionId,
			projection: "list"
		}) : void 0;
		const selected = request.selection ? ok(selectedById ? [selectedById] : []) : expectDefined(readExactSessionEntryCandidatesInDatabase(database, [request.sessionKeys], request.projection === "sharing" ? "list" : "full")[0], "exact session read result");
		if (!selected.ok) throw selected.error;
		if (request.projection === "sharing") {
			const { identity } = readOpenClawAgentDatabaseIdentity(database);
			if (typeof identity !== "string") throw new Error("Private session facts require their process-held owner");
			const presentKeys = new Set(selected.value.map(({ sessionKey }) => sessionKey));
			const missingKeys = (request.sessionKeys ?? []).filter((key) => !presentKeys.has(key));
			const placeholders = missingKeys.length ? executeSqliteQuerySync(database.db, getNodeSqliteKysely(database.db).selectFrom("session_nodes as node").leftJoin("session_windows as window", (join) => join.onRef("window.session_id", "=", "node.current_session_id").onRef("window.session_key", "=", "node.session_key")).select([
				"node.session_key",
				"node.current_session_id",
				"node.entry_json",
				"node.entry_valid",
				"window.session_id as retained_session_id"
			]).where("node.session_key", "in", sqliteStringSet(missingKeys))).rows.map((row) => {
				if (row.entry_json !== "{}" || row.entry_valid !== -1 || row.retained_session_id !== row.current_session_id) throw canonicalSessionKeyMigrationRequiredError(`invalid retained session row requires repair for ${row.session_key}`);
				return {
					sessionKey: row.session_key,
					sessionId: row.current_session_id
				};
			}) : [];
			return {
				kind: "session-exact-entries",
				entries: selected.value,
				lifecycleTimestamps: {},
				sharing: {
					source: {
						agentId: database.agentId,
						path: database.path
					},
					databaseIdentity: `file:${identity}`,
					placeholders,
					members: selected.value.map(({ sessionKey }) => ({
						sessionKey,
						identityIds: listSessionMembersInDatabase(database, sessionKey).map((member) => member.identityId)
					}))
				}
			};
		}
		const entry = selected.value.find(({ sessionKey }) => sessionKey === request.lifecycleSessionKey)?.entry;
		const identity = request.includeAuthorization ? readOpenClawAgentDatabaseIdentity(database) : void 0;
		if (identity && (typeof identity.identity !== "string" || !isOpenClawAgentDatabasePathCurrent(database))) throw new Error("Session database physical identity changed");
		return {
			...identity && typeof identity.identity === "string" ? { databaseIdentity: {
				...identity,
				identity: identity.identity
			} } : {},
			...request.includeMembers ? { members: Object.fromEntries(selected.value.map(({ sessionKey }) => [sessionKey, listSessionMembersInDatabase(database, sessionKey)])) } : {},
			...request.includeParticipantRecords ? { participantRecords: Object.fromEntries(participantRecordsBySessionKey(database.db, request.sessionKeys)) } : {},
			kind: "session-exact-entries",
			entries: selected.value,
			...request.projection === "lifecycle" ? { pendingArchives: hasPendingSessionTranscriptArchives(database) } : {},
			lifecycleTimestamps: resolveSessionLifecycleTimestamps({
				entry,
				agentId: database.agentId,
				sessionKey: request.lifecycleSessionKey,
				readHeader: (sessionId) => readTranscriptHeaderFromDatabase(database, sessionId)
			})
		};
	})), {
		...request.database,
		env: request.env
	});
	if (result.found) return result.value;
	if (result.reason !== "database-missing") throw new SessionMetadataUnavailableError(result.reason);
	return {
		kind: "session-exact-entries",
		entries: [],
		lifecycleTimestamps: {},
		...request.projection === "lifecycle" ? { pendingArchives: false } : {}
	};
}
/** Entry, board presence, and summary validity describe one committed snapshot. */
function readSessionRowDatabaseFacts(request) {
	if (request.sessionKeys.length > 64) throw new Error(`Session row facts support at most 64 keys`);
	if (request.sessionKeys.length === 0) return {
		kind: "session-row-facts",
		rows: []
	};
	const result = withOpenClawAgentDatabaseReadOnly((database) => readWithCanonicalSessionReaderContinuation(database, request.continuation, () => withSqlitePostCommitPublications(database.db, () => runSqliteDeferredTransactionSync(database.db, () => {
		assertCanonicalSqliteSessionRowsCurrent(database, request.sessionKeys);
		const selected = expectDefined(readExactSessionEntryCandidatesInDatabase(database, [request.sessionKeys], "list")[0], "session row facts read result");
		if (!selected.ok) throw selected.error;
		return {
			kind: "session-row-facts",
			rows: selected.value.map(({ sessionKey, entry }) => {
				const facts = {
					sessionKey,
					entry,
					hasBoard: readBoardSessionKeys(database, sessionKey).length > 0
				};
				if (readSessionActivitySummary(entry)) facts.activitySummaryWatermark = readSessionTranscriptWatermarkInDatabase(database, entry.sessionId);
				return facts;
			})
		};
	}))), {
		...request.database,
		env: request.env
	});
	if (result.found) return result.value;
	if (result.reason !== "database-missing") throw new SessionMetadataUnavailableError(result.reason);
	return {
		kind: "session-row-facts",
		rows: []
	};
}
//#endregion
export { readExactSessionEntriesWithLifecycle, readSessionDiagnosticText, readSessionRowDatabaseFacts };
