import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { c as prepareSqliteQueryTakeFirstSync, i as getNodeSqliteKysely, l as sqliteStringSet, n as executeSqliteQuerySync, r as executeSqliteQueryTakeFirstSync, s as prepareSqliteQuerySync, u as sql } from "./kysely-sync-Y4_ti-rQ.mjs";
import { a as runSqliteReadOperationSync, i as readSqliteCacheDataVersion, n as getAdmittedSqliteSchemaFacts } from "./sqlite-schema-facts-DwsuACBg.mjs";
import { n as readSqliteDataVersion } from "./node-sqlite-B4hwsR7e.mjs";
import { t as isPromiseLike } from "./promise-like-D7-l5Fsp.mjs";
import { i as tableExists } from "./openclaw-state-db-schema-helpers-C29HKgWe.mjs";
import { i as stageSqliteTransactionState } from "./sqlite-post-commit-Dih1WMKX.mjs";
import { n as findOpenClawAgentDatabaseIdentity } from "./openclaw-agent-db-identity-ChZ28OhF.mjs";
import { A as parseAgentSessionKey } from "./session-key-BC4m_Ly5.mjs";
import { i as parseSqliteSessionEntryRecord } from "./conversation-ref-C2GC3TG4.mjs";
import { r as sessionEntrySnapshotColumns } from "./session-entry-snapshots-CHPWIM1D.mjs";
import { r as SessionParticipantIdentitySchema } from "./session-participant-BgfyKr4q.mjs";
import { o as resolveDeliveryProvenCanonicalSessionKey, t as collectSessionEntryLookupKeys } from "./store-entry-CBksE8pX.mjs";
import { g as canonicalSessionKeyMigrationRequiredError, o as canonicalSessionValidationQuery, r as assertCanonicalSqliteSessionKeysCurrent, v as validateCanonicalSessionRowEntry, y as hasSqliteSessionOwnerColumns } from "./session-canonical-key-Cjd4Pn_g.mjs";
import { a as selectSessionEntryRows, r as parseSessionEntryJson } from "./session-accessor.sqlite-status-CbDRSABL.mjs";
import { toUSVString } from "node:util";
import { Compile } from "typebox/schema";
//#region src/config/sessions/session-accessor.sqlite-entry-revision.ts
const sessionNodesGenerationTrackerSchemaVersions = /* @__PURE__ */ new WeakMap();
const generationQueries = /* @__PURE__ */ new WeakMap();
function ensureSessionNodesGenerationTracker(database) {
	const schema = getAdmittedSqliteSchemaFacts(database);
	if (!schema) throw new Error("SQLite session entry caching requires admitted schema facts");
	const { schemaVersion } = schema;
	const trackedSchemaVersion = sessionNodesGenerationTrackerSchemaVersions.get(database);
	if (trackedSchemaVersion === schemaVersion) return;
	const hasParticipants = schema.tables.has("session_participants");
	database.exec(`
    CREATE TEMP TABLE IF NOT EXISTS openclaw_session_nodes_cache_generation (id INTEGER NOT NULL PRIMARY KEY CHECK (id = 1), generation INTEGER NOT NULL) STRICT;
    INSERT OR IGNORE INTO openclaw_session_nodes_cache_generation (id, generation) VALUES (1, 0);
    ${trackedSchemaVersion === void 0 ? "" : "UPDATE openclaw_session_nodes_cache_generation SET generation = generation + 1 WHERE id = 1;"}
    DROP TRIGGER IF EXISTS openclaw_session_nodes_cache_generation_insert;
    DROP TRIGGER IF EXISTS openclaw_session_nodes_cache_generation_update;
    DROP TRIGGER IF EXISTS openclaw_session_nodes_cache_generation_delete;
    CREATE TEMP TRIGGER openclaw_session_nodes_cache_generation_insert
      AFTER INSERT ON main.session_nodes BEGIN UPDATE openclaw_session_nodes_cache_generation SET generation = generation + 1 WHERE id = 1; END;
    CREATE TEMP TRIGGER openclaw_session_nodes_cache_generation_update
      AFTER UPDATE ON main.session_nodes BEGIN UPDATE openclaw_session_nodes_cache_generation SET generation = generation + 1 WHERE id = 1; END;
    CREATE TEMP TRIGGER openclaw_session_nodes_cache_generation_delete
      AFTER DELETE ON main.session_nodes BEGIN UPDATE openclaw_session_nodes_cache_generation SET generation = generation + 1 WHERE id = 1; END;
    DROP TRIGGER IF EXISTS openclaw_session_participants_cache_generation_insert;
    DROP TRIGGER IF EXISTS openclaw_session_participants_cache_generation_update;
    DROP TRIGGER IF EXISTS openclaw_session_participants_cache_generation_delete;
    ${hasParticipants ? `
    CREATE TEMP TRIGGER openclaw_session_participants_cache_generation_insert
      AFTER INSERT ON main.session_participants BEGIN UPDATE openclaw_session_nodes_cache_generation SET generation = generation + 1 WHERE id = 1; END;
    CREATE TEMP TRIGGER openclaw_session_participants_cache_generation_update
      AFTER UPDATE ON main.session_participants BEGIN UPDATE openclaw_session_nodes_cache_generation SET generation = generation + 1 WHERE id = 1; END;
    CREATE TEMP TRIGGER openclaw_session_participants_cache_generation_delete
      AFTER DELETE ON main.session_participants BEGIN UPDATE openclaw_session_nodes_cache_generation SET generation = generation + 1 WHERE id = 1; END;
    ` : ""}
  `);
	if (!database.isTransaction) sessionNodesGenerationTrackerSchemaVersions.set(database, schemaVersion);
	else stageSqliteTransactionState(database, {
		stage: () => sessionNodesGenerationTrackerSchemaVersions.set(database, schemaVersion),
		rollback: () => sessionNodesGenerationTrackerSchemaVersions.delete(database),
		commit: () => {}
	});
}
function readSessionNodesGeneration(database) {
	ensureSessionNodesGenerationTracker(database);
	let query = generationQueries.get(database);
	if (!query) {
		query = prepareSqliteQueryTakeFirstSync(database, () => getNodeSqliteKysely(database).withSchema("temp").selectFrom("openclaw_session_nodes_cache_generation").select("generation").where("id", "=", 1));
		generationQueries.set(database, query);
	}
	const row = query();
	if (typeof row?.generation !== "number") throw new Error("SQLite session_nodes cache generation is unavailable");
	return row.generation;
}
function readSessionEntryCacheValidityToken(database, mode = "fresh") {
	return {
		dataVersion: mode === "cached" ? readSqliteCacheDataVersion(database) : readSqliteDataVersion(database),
		sessionNodesGeneration: readSessionNodesGeneration(database)
	};
}
function cacheValidityTokensEqual(left, right) {
	return left.dataVersion === right.dataVersion && left.sessionNodesGeneration === right.sessionNodesGeneration;
}
var SessionEntryRevisionConflictError = class extends Error {
	constructor(..._args) {
		super(..._args);
		this.code = "invalid_state";
	}
};
/** Reuse prepared facts until this connection observes a write, then compare only their predicate. */
function createSessionEntryRevisionGuard(database, assertSourceCurrent, matches) {
	let verified;
	return () => {
		assertSourceCurrent();
		const before = readSessionEntryCacheValidityToken(database);
		if (verified && cacheValidityTokensEqual(verified, before)) {
			assertSourceCurrent();
			return;
		}
		if (!matches()) throw new SessionEntryRevisionConflictError("Prepared session entry facts are no longer current");
		const after = readSessionEntryCacheValidityToken(database);
		assertSourceCurrent();
		if (!cacheValidityTokensEqual(before, after)) throw new SessionEntryRevisionConflictError("Session entry facts changed during their mutation check");
		verified = after;
	};
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-entry-cache-state.ts
const sessionEntryCaches = /* @__PURE__ */ new WeakMap();
function publishTrackedCacheUpdate(database, publish, stage) {
	let settle;
	if (stageSqliteTransactionState(database.db, {
		stage: () => {
			settle = stage?.();
		},
		rollback: () => settle?.(),
		commit: () => {
			try {
				publish();
			} finally {
				settle?.();
			}
		}
	})) return true;
	if (database.db.isTransaction) throw new Error("SQLite session entry writes must use runOpenClawAgentWriteTransaction for cache publication");
	publish();
	return false;
}
/** Participant display facts may be borrowed in a transaction only at its native revision. */
function readCurrentSessionEntryCacheParticipants(database, sessionKey) {
	const cached = sessionEntryCaches.get(database);
	const entry = cached?.entries.get(sessionKey);
	if (!cached || !entry || !getAdmittedSqliteSchemaFacts(database) || !cacheValidityTokensEqual(cached.validityToken, readSessionEntryCacheValidityToken(database, "cached"))) return;
	return entry.participants ? {
		participants: entry.participants.map(({ identity }) => ({ identity: { ...identity } })),
		participantCount: entry.participantCount
	} : {};
}
//#endregion
//#region src/config/sessions/session-participant-identity.ts
let identityValidator;
function participantIdentityNamespace(identity) {
	if (identity.type === "profile" || identity.type === "agent") return JSON.stringify({ type: identity.type });
	if (identity.type === "remote") return JSON.stringify({
		type: identity.type,
		pluginId: identity.pluginId,
		domain: identity.domain,
		idKind: identity.idKind
	});
	if (identity.type === "observation") return JSON.stringify({
		type: identity.type,
		pluginId: identity.pluginId,
		accountId: identity.accountId,
		senderKind: identity.senderKind
	});
	return JSON.stringify({
		type: identity.type,
		actorType: identity.actorType,
		source: identity.source
	});
}
function readParticipantIdentity(namespace, id) {
	const parsed = JSON.parse(namespace);
	if (isRecord(parsed)) {
		const identity = {
			...parsed,
			id
		};
		if ((identityValidator ??= Compile(SessionParticipantIdentitySchema)).Check(identity)) return identity;
	}
	throw new Error("Session participant identity is invalid; run openclaw doctor --fix.");
}
/** Inputs/aliases sum; retried cross-store copies retain the largest recorded aggregate. */
function mergeParticipantAggregate(current, incoming, mode) {
	if (!current) return incoming;
	return {
		contribution_count: mode === "sum" ? current.contribution_count + incoming.contribution_count : Math.max(current.contribution_count, incoming.contribution_count),
		first_prompted_at: current.first_prompted_at === null || incoming.first_prompted_at === null ? null : Math.min(current.first_prompted_at, incoming.first_prompted_at),
		last_prompted_at: current.last_prompted_at === null ? incoming.last_prompted_at : incoming.last_prompted_at === null ? current.last_prompted_at : Math.max(current.last_prompted_at, incoming.last_prompted_at)
	};
}
//#endregion
//#region src/config/sessions/session-participant-prepared-read.ts
let preparedRead;
/** Only synchronous materialization borrows facts; transaction authority always reads its owner. */
function withPreparedSessionParticipants(read, consume) {
	const previous = preparedRead;
	preparedRead = read;
	try {
		const value = consume();
		if (isPromiseLike(value)) {
			Promise.resolve(value).catch(() => {});
			throw new Error("Prepared participant consumers must remain synchronous");
		}
		return value;
	} finally {
		preparedRead = previous;
	}
}
function readPreparedSessionParticipants(database, sessionKey) {
	if (!preparedRead || database.isTransaction) return;
	const identity = findOpenClawAgentDatabaseIdentity({ db: database })?.identity;
	if (identity === void 0) return;
	const projection = preparedRead(identity, sessionKey);
	return projection && {
		...projection.participants ? { participants: projection.participants.map(({ identity: participantIdentity }) => ({ identity: { ...participantIdentity } })) } : {},
		...projection.participantCount === void 0 ? {} : { participantCount: projection.participantCount }
	};
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-participant-projection.ts
function selectParticipantRows(database) {
	return getNodeSqliteKysely(database).selectFrom("session_participants").selectAll().orderBy("session_key").orderBy("first_prompted_at").orderBy("actor_id").orderBy("identity_namespace");
}
function prepareSingleSessionParticipantQuery(database) {
	return prepareSqliteQuerySync(database, (parameter) => selectParticipantRows(database).where("session_key", "=", parameter((sessionKey) => sessionKey)));
}
const singleSessionParticipantQueries = /* @__PURE__ */ new WeakMap();
function readParticipantRows(database, sessionKeys) {
	const sessionKey = sessionKeys?.length === 1 ? sessionKeys[0] : void 0;
	if (sessionKey !== void 0) {
		let query = singleSessionParticipantQueries.get(database);
		if (!query) {
			query = prepareSingleSessionParticipantQuery(database);
			singleSessionParticipantQueries.set(database, query);
		}
		return query(sessionKey).rows;
	}
	let query = selectParticipantRows(database);
	if (sessionKeys) query = query.where("session_key", "in", sqliteStringSet(sessionKeys));
	return executeSqliteQuerySync(database, query).rows;
}
function readParticipantRecord(row) {
	return {
		identity: readParticipantIdentity(row.identity_namespace, row.actor_id),
		contributionCount: row.contribution_count,
		firstPromptedAt: row.first_prompted_at,
		lastPromptedAt: row.last_prompted_at
	};
}
function participantRecordsBySessionKey(database, sessionKeys) {
	const records = /* @__PURE__ */ new Map();
	if (!tableExists(database, "session_participants")) return records;
	for (const row of readParticipantRows(database, sessionKeys)) {
		const participants = records.get(row.session_key) ?? [];
		participants.push(readParticipantRecord(row));
		records.set(row.session_key, participants);
	}
	return records;
}
function participantProjection(records) {
	if (records.length === 0) return {};
	return {
		participants: records.map(({ identity }) => ({ identity })),
		participantCount: records.length
	};
}
function withProjectedParticipants(entry, records) {
	return records.length ? {
		...entry,
		...participantProjection(records)
	} : entry;
}
function readSqliteSessionParticipantProjection(database, sessionKey) {
	return readPreparedSessionParticipants(database, sessionKey) ?? readCurrentSessionEntryCacheParticipants(database, sessionKey) ?? participantProjection(participantRecordsBySessionKey(database, [sessionKey]).get(sessionKey) ?? []);
}
function projectSqliteSessionParticipants(database, sessionKey, entry) {
	const prepared = readPreparedSessionParticipants(database, sessionKey) ?? readCurrentSessionEntryCacheParticipants(database, sessionKey);
	if (prepared) return prepared.participants ? {
		...entry,
		...prepared
	} : entry;
	return withProjectedParticipants(entry, participantRecordsBySessionKey(database, [sessionKey]).get(sessionKey) ?? []);
}
/** Acquire one fresh cohort lazily, then decode only the requested session's participants. */
function prepareSqliteSessionParticipantProjection(database, sessionKeys) {
	let rowsByKey;
	let acquisitionFailed = false;
	return (sessionKey, entry) => {
		const prepared = readPreparedSessionParticipants(database, sessionKey);
		if (prepared) return prepared.participants ? {
			...entry,
			...prepared
		} : entry;
		if (!rowsByKey && !acquisitionFailed) try {
			const rows = tableExists(database, "session_participants") ? readParticipantRows(database, sessionKeys) : [];
			rowsByKey = /* @__PURE__ */ new Map();
			for (const row of rows) {
				const participants = rowsByKey.get(row.session_key) ?? [];
				participants.push(row);
				rowsByKey.set(row.session_key, participants);
			}
		} catch {
			acquisitionFailed = true;
		}
		if (acquisitionFailed) return projectSqliteSessionParticipants(database, sessionKey, entry);
		return withProjectedParticipants(entry, (rowsByKey?.get(sessionKey) ?? []).map(readParticipantRecord));
	};
}
function projectSqliteSessionParticipantsBatch(database, entries) {
	const prepared = /* @__PURE__ */ new Map();
	for (const [sessionKey, entry] of entries) {
		const projection = readPreparedSessionParticipants(database, sessionKey);
		if (!projection) break;
		prepared.set(sessionKey, projection.participants ? {
			...entry,
			...projection
		} : entry);
	}
	if (prepared.size === entries.size) return prepared;
	const records = participantRecordsBySessionKey(database, [...entries.keys()]);
	const projected = new Map(entries);
	for (const [sessionKey, participants] of records) {
		const entry = entries.get(sessionKey);
		if (entry) projected.set(sessionKey, withProjectedParticipants(entry, participants));
	}
	return projected;
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-entry-read.ts
function prepareExactSessionEntryQueries(database) {
	const db = getNodeSqliteKysely(database);
	const metadataQueries = /* @__PURE__ */ new Map();
	const canonicalQueries = /* @__PURE__ */ new Map();
	return {
		row: prepareSqliteQueryTakeFirstSync(database, (parameter) => db.selectFrom("session_nodes").selectAll().select(sessionEntrySnapshotColumns).where("session_key", "=", parameter((key) => key))),
		metadata: (key) => {
			const ownerColumns = hasSqliteSessionOwnerColumns(database);
			let query = metadataQueries.get(ownerColumns);
			if (!query) {
				query = prepareSqliteQueryTakeFirstSync(database, (parameter) => selectSessionEntryRows({ db: database }, "list", [], ownerColumns).select(["current_session_id", "updated_at"]).select(sql`CAST(session_nodes.rowid AS TEXT)`.as("rowid")).where("session_key", "=", parameter((value) => value)));
				metadataQueries.set(ownerColumns, query);
			}
			return query(key);
		},
		canonical: (key, projection) => {
			const shape = `${projection}:${hasSqliteSessionOwnerColumns(database)}`;
			let query = canonicalQueries.get(shape);
			if (!query) {
				query = prepareSqliteQueryTakeFirstSync(database, (parameter) => canonicalSessionValidationQuery({ db: database }, { metadata: true }).$if(projection === "full", (selection) => selection.select(sessionEntrySnapshotColumns)).where("session_nodes.session_key", "=", parameter((value) => value)));
				canonicalQueries.set(shape, query);
			}
			return query(key);
		}
	};
}
const exactSessionEntryQueries = /* @__PURE__ */ new WeakMap();
function getExactSessionEntryQueries(database) {
	let queries = exactSessionEntryQueries.get(database);
	if (!queries) {
		queries = prepareExactSessionEntryQueries(database);
		exactSessionEntryQueries.set(database, queries);
	}
	return queries;
}
function parseReadableSessionEntryData(database, row, projection) {
	const parsed = projection === "delivery" ? parseSqliteSessionEntryRecord(row) : parseSessionEntryJson(row, projection);
	if (parsed) {
		if (projection === "delivery") {
			const { sessionId, updatedAt, delivery, groupId } = parsed;
			return {
				sessionId,
				updatedAt,
				delivery,
				groupId
			};
		}
		return parsed;
	}
	if (row.entry_json === "{}" ? executeSqliteQueryTakeFirstSync(database.db, getNodeSqliteKysely(database.db).selectFrom("session_windows").select("session_id").where("session_id", "=", row.current_session_id).where("session_key", "=", row.session_key)) : void 0) return null;
	throw canonicalSessionKeyMigrationRequiredError(`invalid persisted session row requires repair for ${row.session_key}`);
}
function validateDeliveryCanonicalSessionEntry(sessionKey, entry) {
	if (resolveDeliveryProvenCanonicalSessionKey(sessionKey, entry) !== sessionKey) throw canonicalSessionKeyMigrationRequiredError(`non-canonical persisted row resolves to session key ${sessionKey}`);
	return entry;
}
/** Decodes a fresh owned entry, including its nested JSON, owner and participant values. */
function parseReadableSqliteSessionEntryRow(database, row, projection = "full") {
	const parsed = parseReadableSessionEntryData(database, row, projection);
	return parsed ? validateDeliveryCanonicalSessionEntry(row.session_key, projectSqliteSessionParticipants(database.db, row.session_key, parsed)) : null;
}
/** Decode supplied rows in caller order while sharing their lazy participant acquisition. */
function prepareSqliteSessionEntryRowDecoder(database, rows, projection = "full") {
	const projectParticipants = projection === "delivery" ? (_key, entry) => entry : prepareSqliteSessionParticipantProjection(database.db, rows.filter((row) => row.entry_json !== "{}").map((row) => row.session_key));
	return (row) => {
		const parsed = parseReadableSessionEntryData(database, row, projection);
		return parsed ? validateDeliveryCanonicalSessionEntry(row.session_key, projectParticipants(row.session_key, parsed)) : null;
	};
}
/** Projects one selected row set without repeating participant reads for each entry. */
function parseReadableSqliteSessionEntryRows(database, rows, projection = "full") {
	const parsedEntries = /* @__PURE__ */ new Map();
	for (const row of rows) {
		const entry = parseReadableSessionEntryData(database, row, projection);
		if (entry) parsedEntries.set(row.session_key, entry);
	}
	if (parsedEntries.size === 0) return [];
	return [...projectSqliteSessionParticipantsBatch(database.db, parsedEntries)].map(([sessionKey, entry]) => ({
		sessionKey,
		entry: validateDeliveryCanonicalSessionEntry(sessionKey, entry)
	}));
}
function readSessionEntryRow(database, sessionKey, projection = "full") {
	return scanSessionEntryRows(database, sessionKey, projection)?.selected;
}
/**
* Reads the selected row plus every raw row the lookup scanned. A write transaction that must
* prove this logical row is unchanged can re-read and compare the raw rows instead of decoding
* the entry JSON again.
*/
function readSessionEntryRowScan(database, sessionKey) {
	return scanSessionEntryRows(database, sessionKey, "full");
}
function selectReadableSessionEntryRows(database, projection) {
	if (projection === "delivery") {
		const deliveryJson = sql`
      CASE WHEN json_valid(entry_json)
        AND json_type(entry_json, '$.sessionId') = 'text'
        AND json_type(entry_json, '$.updatedAt') IN ('integer', 'real')
        AND length(CAST(entry_json AS BLOB)) = length(CAST(printf('%s', entry_json) AS BLOB))
      THEN (SELECT CASE WHEN count(*) = count(DISTINCT key)
        THEN json_group_object(key, json(entry_json -> fullkey)) ELSE entry_json END
        FROM json_each(entry_json) WHERE key IN ('sessionId', 'updatedAt', 'delivery', 'groupId'))
      ELSE entry_json END`.as("entry_json");
		return getNodeSqliteKysely(database.db).selectFrom("session_nodes").select([
			"session_key",
			"current_session_id",
			"updated_at",
			deliveryJson
		]);
	}
	return projection === "list" ? selectSessionEntryRows(database, projection).select(["current_session_id", "updated_at"]) : getNodeSqliteKysely(database.db).selectFrom("session_nodes").selectAll().select(sessionEntrySnapshotColumns);
}
function scanSessionEntryRows(database, sessionKey, projection) {
	return runSqliteReadOperationSync(database.db, () => {
		assertCanonicalSqliteSessionKeysCurrent(database);
		const lookupKeys = collectSessionEntryLookupKeys(sessionKey);
		const firstLookupKey = lookupKeys[0];
		if (firstLookupKey === void 0) return;
		let rows;
		if (lookupKeys.length === 1) {
			const queries = getExactSessionEntryQueries(database.db);
			const row = projection === "list" ? queries.metadata(firstLookupKey) : queries.row(firstLookupKey);
			rows = row ? [row] : [];
		} else rows = executeSqliteQuerySync(database.db, selectReadableSessionEntryRows(database, projection).where("session_key", "in", lookupKeys).orderBy("session_key", "asc")).rows;
		let selected;
		for (const row of rows) {
			const entry = parseReadableSqliteSessionEntryRow(database, row, projection);
			if (!entry || row.session_key !== sessionKey.trim()) continue;
			selected = {
				entry,
				row
			};
		}
		return {
			lookupKeys,
			rows,
			selected
		};
	});
}
function readExactSessionEntryRow(database, sessionKey, projection = "full", validation) {
	return runSqliteReadOperationSync(database.db, () => {
		const queries = getExactSessionEntryQueries(database.db);
		const canonicalRow = validation === "canonical" ? queries.canonical(sessionKey, projection) : void 0;
		const row = validation === "canonical" ? canonicalRow : projection === "list" ? queries.metadata(sessionKey) : queries.row(sessionKey);
		if (!row) return;
		const entry = parseReadableSqliteSessionEntryRow(database, row, projection);
		if (canonicalRow) validateCanonicalSessionRowEntry(canonicalRow, entry, "read");
		return entry ? {
			entry,
			row
		} : void 0;
	});
}
/** Capture exact rows once; failed cohort acquisition retains single-key error isolation. */
function prepareExactSessionEntryRowReads(database, sessionKeys, projection = "full") {
	return runSqliteReadOperationSync(database.db, () => {
		let rows;
		try {
			rows = executeSqliteQuerySync(database.db, selectReadableSessionEntryRows(database, projection).where("session_key", "in", sqliteStringSet(sessionKeys))).rows;
		} catch {
			return (sessionKey) => readExactSessionEntryRow(database, sessionKey, projection === "delivery" ? "list" : projection);
		}
		const byKey = new Map(rows.map((row) => [row.session_key, row]));
		const decodeRow = prepareSqliteSessionEntryRowDecoder(database, rows, projection);
		return (sessionKey) => runSqliteReadOperationSync(database.db, () => {
			const row = byKey.get(toUSVString(sessionKey));
			if (!row) return;
			const entry = decodeRow(row);
			return entry ? {
				entry,
				row
			} : void 0;
		});
	});
}
function readExactSessionEntryRowValidated(database, sessionKey, projection = "full") {
	return runSqliteReadOperationSync(database.db, () => {
		assertCanonicalSqliteSessionKeysCurrent(database);
		return readExactSessionEntryRow(database, sessionKey, projection);
	});
}
/** Select a physical row while refusing any other admitted spelling. */
function readSessionEntryTargetRow(database, target, options = {}) {
	return runSqliteReadOperationSync(database.db, () => {
		assertCanonicalSqliteSessionKeysCurrent(database);
		const queries = getExactSessionEntryQueries(database.db);
		const rows = target.storeKeys.flatMap((key) => {
			const row = options.projection === "list" ? queries.metadata(key.trim()) : queries.row(key.trim());
			if (!row) return [];
			const entry = parseReadableSqliteSessionEntryRow(database, row, options.projection);
			return entry || options.guardRetainedWindows ? [{
				entry,
				row
			}] : [];
		});
		if (rows.length > 1) throw canonicalSessionKeyMigrationRequiredError(`duplicate rows resolve to canonical session key ${target.canonicalKey}`);
		const selected = rows[0];
		if (selected && selected.row.session_key !== target.canonicalKey && !options.allowCanonicalMove) throw canonicalSessionKeyMigrationRequiredError(`non-canonical persisted row resolves to session key ${target.canonicalKey}`);
		return selected;
	});
}
/** Only sentinel aliases share a logical identity with a different physical key. */
function readQualifiedSessionEntryRow(database, agentId, sessionKey, options = {}) {
	const parsed = parseAgentSessionKey(sessionKey);
	const sentinel = parsed?.rest ?? sessionKey;
	if (agentId !== database.agentId || parsed && parsed.agentId !== agentId || sentinel !== "global" && sentinel !== "unknown") return readSessionEntryRow(database, sessionKey, options.projection);
	return readSessionEntryTargetRow(database, {
		canonicalKey: sessionKey,
		storeKeys: [sentinel, `agent:${agentId}:${sentinel}`]
	}, {
		...options,
		guardRetainedWindows: true
	});
}
//#endregion
export { readSessionEntryCacheValidityToken as C, createSessionEntryRevisionGuard as S, mergeParticipantAggregate as _, readExactSessionEntryRow as a, sessionEntryCaches as b, readSessionEntryRow as c, validateDeliveryCanonicalSessionEntry as d, participantRecordsBySessionKey as f, withPreparedSessionParticipants as g, readSqliteSessionParticipantProjection as h, prepareSqliteSessionEntryRowDecoder as i, readSessionEntryRowScan as l, projectSqliteSessionParticipantsBatch as m, parseReadableSqliteSessionEntryRows as n, readExactSessionEntryRowValidated as o, projectSqliteSessionParticipants as p, prepareExactSessionEntryRowReads as r, readQualifiedSessionEntryRow as s, parseReadableSqliteSessionEntryRow as t, readSessionEntryTargetRow as u, participantIdentityNamespace as v, readSessionNodesGeneration as w, cacheValidityTokensEqual as x, publishTrackedCacheUpdate as y };
