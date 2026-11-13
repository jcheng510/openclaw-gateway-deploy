import { r as truncateUtf16Safe } from "./utf16-slice-D_ngcYKd.mjs";
import "./utils-DUAwk2p5.mjs";
import { i as getNodeSqliteKysely, l as sqliteStringSet, n as executeSqliteQuerySync, r as executeSqliteQueryTakeFirstSync, u as sql } from "./kysely-sync-Y4_ti-rQ.mjs";
import { r as runSqliteDeferredTransactionSync } from "./sqlite-transaction-2VkikDo-.mjs";
import { _ as toAgentStoreSessionKey } from "./session-key-BC4m_Ly5.mjs";
import { c as resolveOpenClawAgentSqlitePath, i as isIncognitoOpenClawAgentSqlitePath } from "./openclaw-agent-db.paths-Dv3PPTNK.mjs";
import { n as withOpenClawAgentDatabaseReadOnly } from "./openclaw-agent-db-readonly-CkWWSfuG.mjs";
import { _ as toDatabaseOptions, c as resolveSqliteReadScope, n as captureLifecycleDatabaseScope } from "./session-accessor.sqlite-scope-AxUEwRt8.mjs";
import { s as hasSessionsNeedingTranscriptIndexReconcile } from "./session-transcript-index-DOai861G.mjs";
import { r as startSessionTranscriptIndexReconcile, t as isSessionTranscriptIndexReconcileRunning } from "./session-transcript-reconcile-CihXLpUw.mjs";
import { o as withSessionHistoryWorkerDatabase } from "./session-transcript-worker-runtime-BNJMKJjz.mjs";
//#region src/config/sessions/session-transcript-search.ts
const SEARCH_SNIPPET_MAX_CHARS = 500;
const SEARCH_LIMIT_MAX = 25;
const SEARCH_QUERY_MAX_CHARS = 4096;
function toFtsQuery(query) {
	return query.trim().split(/\s+/u).map((token) => `"${token.replaceAll("\"", "\"\"")}"`).join(" AND ");
}
/** Query a captured disk owner off-thread; reconciliation remains host-owned. */
async function searchSessionTranscripts(params, preparedDatabase) {
	validateSearchQuery(params.query);
	const scope = captureLifecycleDatabaseScope(preparedDatabase ? {
		agentId: params.agentId,
		databaseAgentId: preparedDatabase.agentId,
		path: preparedDatabase.path,
		env: params.env
	} : resolveSqliteReadScope(params));
	const options = toDatabaseOptions(scope);
	const request = {
		...params,
		agentId: scope.agentId,
		env: scope.env,
		sessionKeys: params.sessionKeys?.slice()
	};
	const finish = (result) => {
		if (result.indexing) startSessionTranscriptIndexReconcile(options);
		return {
			...result,
			indexing: result.indexing || isSessionTranscriptIndexReconcileRunning(options)
		};
	};
	if (isIncognitoOpenClawAgentSqlitePath(resolveOpenClawAgentSqlitePath(options), options)) return finish(searchSessionTranscriptsReadOnlySync(request, options));
	return await withSessionHistoryWorkerDatabase(options, async (owner) => {
		const result = await owner.searchTranscripts(request);
		owner.assertCurrent();
		return finish(result);
	});
}
function validateSearchQuery(input) {
	const query = input.trim();
	if (!query) throw new Error("query must not be empty");
	if (query.length > SEARCH_QUERY_MAX_CHARS) throw new Error(`query must not exceed ${SEARCH_QUERY_MAX_CHARS} characters`);
	return query;
}
/** Native read kernel; indexing reports dirty rows without scheduling a writer. */
function searchSessionTranscriptsReadOnlySync(params, preparedDatabase) {
	const query = validateSearchQuery(params.query);
	const scope = preparedDatabase ? { agentId: params.agentId } : resolveSqliteReadScope(params);
	const databaseOptions = preparedDatabase ?? toDatabaseOptions(scope);
	const result = withOpenClawAgentDatabaseReadOnly((database) => runSqliteDeferredTransactionSync(database.db, () => {
		const indexing = hasSessionsNeedingTranscriptIndexReconcile(database.db);
		const limit = Math.min(Math.max(1, params.limit ?? 10), SEARCH_LIMIT_MAX);
		const sessionFilterValues = params.sessionKeys ?? [toAgentStoreSessionKey({
			agentId: scope.agentId,
			requestKey: "*"
		})];
		const sessionKeySet = sqliteStringSet(sessionFilterValues);
		const db = getNodeSqliteKysely(database.db);
		const archivedTranscriptsExcluded = executeSqliteQueryTakeFirstSync(database.db, db.selectFrom("session_transcript_cold_archives as cold").innerJoin("session_windows as window", "window.session_id", "cold.session_id").select((eb) => eb.fn.countAll().as("count")).$if(params.sessionKeys === void 0, (builder) => builder.where((eb) => eb.or([sql`${eb.ref("window.session_key")} GLOB ${sessionFilterValues[0]}`, eb("window.session_key", "in", ["global", "unknown"])]))).$if(params.sessionKeys !== void 0 && sessionFilterValues.length > 0, (builder) => builder.where("window.session_key", "in", sessionKeySet)).$if(params.sessionId !== void 0, (builder) => builder.where("window.session_id", "=", params.sessionId)))?.count ?? 0;
		const hits = executeSqliteQuerySync(database.db, db.selectFrom("session_transcript_fts").innerJoin("session_windows", "session_windows.session_id", "session_transcript_fts.session_id").select([
			"session_windows.session_key",
			"session_transcript_fts.session_id",
			"message_id",
			"role",
			"timestamp",
			sql`snippet(session_transcript_fts, 0, '', '', ' … ', 48)`.as("snippet"),
			sql`bm25(session_transcript_fts)`.as("rank")
		]).where(sql`session_transcript_fts MATCH ${toFtsQuery(query)}`).$if(params.sessionKeys === void 0, (builder) => builder.where((eb) => eb.or([sql`${eb.ref("session_windows.session_key")} GLOB ${sessionFilterValues[0]}`, eb("session_windows.session_key", "in", ["global", "unknown"])]))).$if(params.sessionKeys !== void 0 && sessionFilterValues.length > 0, (builder) => builder.where("session_windows.session_key", "in", sessionKeySet)).$if(Boolean(params.sessionId), (builder) => builder.where("session_transcript_fts.session_id", "=", params.sessionId)).$if(Boolean(params.role), (builder) => builder.where("role", "=", params.role)).where("session_transcript_fts.session_id", "not in", db.selectFrom("session_transcript_index_state").select("session_id").where("needs_rebuild", "!=", 0).$if(Boolean(params.sessionId), (builder) => builder.where("session_id", "=", params.sessionId))).$if(params.order === "recent", (builder) => builder.orderBy("timestamp", "desc").orderBy(sql`session_transcript_fts.rowid`, "desc")).$if(params.order !== "recent", (builder) => builder.orderBy("rank", "asc").orderBy("timestamp", "desc").orderBy("message_id", "asc")).limit(limit + 1)).rows.flatMap((row) => {
			if (typeof row.session_key !== "string" || typeof row.session_id !== "string" || typeof row.message_id !== "string" || row.role !== "user" && row.role !== "assistant" || typeof row.snippet !== "string") return [];
			const timestamp = typeof row.timestamp === "number" ? row.timestamp : Number(row.timestamp);
			const rank = typeof row.rank === "number" ? row.rank : Number(row.rank);
			return [{
				sessionKey: row.session_key,
				sessionId: row.session_id,
				messageId: row.message_id,
				role: row.role,
				timestamp: Number.isFinite(timestamp) ? timestamp : 0,
				snippet: row.snippet.length > SEARCH_SNIPPET_MAX_CHARS ? `${truncateUtf16Safe(row.snippet, SEARCH_SNIPPET_MAX_CHARS)}…` : row.snippet,
				score: Number.isFinite(rank) ? -rank : 0
			}];
		});
		return {
			hits: hits.slice(0, limit),
			indexing,
			truncated: hits.length > limit,
			...archivedTranscriptsExcluded > 0 ? { archivedTranscriptsExcluded } : {}
		};
	}, {
		databaseLabel: database.path,
		operationLabel: "session transcript search"
	}), databaseOptions);
	return result.found ? result.value : {
		hits: [],
		indexing: false,
		truncated: false
	};
}
//#endregion
export { searchSessionTranscriptsReadOnlySync as n, searchSessionTranscripts as t };
