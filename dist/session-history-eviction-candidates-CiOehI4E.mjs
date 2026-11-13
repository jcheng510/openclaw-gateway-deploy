import { a as iterateSqliteQuerySync, l as sqliteStringSet, n as executeSqliteQuerySync } from "./kysely-sync-Y4_ti-rQ.mjs";
import { r as sessionEntrySnapshotColumns } from "./session-entry-snapshots-CHPWIM1D.mjs";
import { n as withOpenClawAgentDatabaseReadOnly } from "./openclaw-agent-db-readonly-CkWWSfuG.mjs";
import { a as normalizeStoreSessionKey } from "./store-entry-CBksE8pX.mjs";
import { i as getSessionKysely } from "./session-accessor.sqlite-scope-AxUEwRt8.mjs";
import { r as parseSessionEntryJson } from "./session-accessor.sqlite-status-CbDRSABL.mjs";
import { s as isSessionEntryDiskBudgetEvictable } from "./store-maintenance-C0GS_WY5.mjs";
import { n as collectRecentSessionHistoryIds, r as collectSessionStateIdsForEntry } from "./session-accessor.sqlite-references-YChoasaE.mjs";
import { u as readReferencedSessionIds } from "./session-accessor.sqlite-lifecycle-state-DalYr83g.mjs";
//#region src/config/sessions/session-history-eviction-candidates.ts
const DISK_EVICTABLE_ARCHIVE_BATCH_SIZE = 64;
function readDiskEvictableArchivedSessionBatch(params) {
	const result = withOpenClawAgentDatabaseReadOnly((database) => {
		const limit = Math.max(1, params.limit ?? DISK_EVICTABLE_ARCHIVE_BATCH_SIZE);
		const candidates = [];
		let cursor = params.after;
		while (candidates.length < limit) {
			let query = getSessionKysely(database.db).selectFrom("session_nodes").select([
				"archived_at",
				"current_session_id",
				"entry_json",
				"session_key",
				"updated_at"
			]).select(sessionEntrySnapshotColumns).where("archived_at", "is not", null).orderBy("archived_at", "asc").orderBy("session_key", "asc").limit(DISK_EVICTABLE_ARCHIVE_BATCH_SIZE);
			if (cursor) {
				const after = cursor;
				query = query.where((eb) => eb.or([eb("archived_at", ">", after.archivedAt), eb.and([eb("archived_at", "=", after.archivedAt), eb("session_key", ">", after.sessionKey)])]));
			}
			const rows = executeSqliteQuerySync(database.db, query).rows;
			let scanned = 0;
			for (const row of rows) {
				scanned += 1;
				if (row.archived_at == null) continue;
				cursor = {
					archivedAt: row.archived_at,
					sessionKey: row.session_key
				};
				const entry = parseSessionEntryJson(row);
				if (entry && isSessionEntryDiskBudgetEvictable({
					key: row.session_key,
					entry,
					preserveRecentMs: params.preserveRecentMs
				})) {
					candidates.push({
						archivedAt: row.archived_at,
						entry,
						sessionKey: row.session_key
					});
					if (candidates.length >= limit) break;
				}
			}
			const exhausted = rows.length < DISK_EVICTABLE_ARCHIVE_BATCH_SIZE && scanned === rows.length;
			if (candidates.length >= limit || exhausted) return {
				candidates,
				...cursor ? { cursor } : {},
				exhausted
			};
		}
		return {
			candidates,
			...cursor ? { cursor } : {},
			exhausted: false
		};
	}, params.databaseOptions);
	return result.found ? result.value : {
		candidates: [],
		exhausted: true
	};
}
/** Resolve a captured admission snapshot without consulting another thread's live owners. */
function collectSessionAdmissionReferences(params) {
	const protectedSessionIds = /* @__PURE__ */ new Set();
	const admissionIdentities = params.admissionIdentities;
	if (admissionIdentities.length === 0) return protectedSessionIds;
	for (const identity of admissionIdentities) protectedSessionIds.add(identity);
	const normalizedAdmissionKeys = new Set([...admissionIdentities].map((identity) => normalizeStoreSessionKey(identity)));
	const db = getSessionKysely(params.database.db);
	const admittedKeyBytes = [];
	for (const row of iterateSqliteQuerySync(params.database.db, db.selectFrom("session_nodes").select(["session_key", db.fn("hex", ["session_key"]).as("key_bytes")]))) if (normalizedAdmissionKeys.has(normalizeStoreSessionKey(row.session_key))) admittedKeyBytes.push(row.key_bytes);
	const rows = admittedKeyBytes.length ? iterateSqliteQuerySync(params.database.db, db.selectFrom("session_nodes").select(["entry_json", "current_session_id"]).where("session_key", "in", db.selectFrom("session_nodes").select("session_key").where(db.fn("hex", ["session_key"]), "in", sqliteStringSet(admittedKeyBytes)))) : [];
	for (const row of rows) {
		protectedSessionIds.add(row.current_session_id);
		const entry = parseSessionEntryJson(row);
		if (entry) for (const sessionId of collectSessionStateIdsForEntry(entry)) protectedSessionIds.add(sessionId);
	}
	const generationRows = iterateSqliteQuerySync(params.database.db, db.selectFrom("session_windows").select(["session_id", "session_key"]));
	for (const row of generationRows) if (normalizedAdmissionKeys.has(normalizeStoreSessionKey(row.session_key))) protectedSessionIds.add(row.session_id);
	return protectedSessionIds;
}
function readHistoricalSessionIdsInDatabase(params) {
	const { database } = params;
	const protectedSessionIds = readReferencedSessionIds(database, void 0, void 0, params);
	for (const sessionId of collectSessionAdmissionReferences(params)) protectedSessionIds.add(sessionId);
	for (const sessionId of collectRecentSessionHistoryIds(params)) protectedSessionIds.add(sessionId);
	const db = getSessionKysely(database.db);
	return executeSqliteQuerySync(database.db, db.selectFrom("session_windows").select("session_id").orderBy("updated_at", "asc").orderBy("session_id", "asc")).rows.flatMap((row) => protectedSessionIds.has(row.session_id) ? [] : [row.session_id]);
}
//#endregion
export { readDiskEvictableArchivedSessionBatch as n, readHistoricalSessionIdsInDatabase as r, collectSessionAdmissionReferences as t };
