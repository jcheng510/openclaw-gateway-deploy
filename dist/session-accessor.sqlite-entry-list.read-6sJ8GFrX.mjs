import { i as getNodeSqliteKysely, l as sqliteStringSet, n as executeSqliteQuerySync } from "./kysely-sync-Y4_ti-rQ.mjs";
import { a as withSqlitePostCommitPublications } from "./sqlite-post-commit-Dih1WMKX.mjs";
import { r as runSqliteDeferredTransactionSync } from "./sqlite-transaction-2VkikDo-.mjs";
import { n as normalizeAgentId } from "./agent-id-D1-Q6vR4.mjs";
import { A as parseAgentSessionKey, b as isCronRunSessionKey } from "./session-key-BC4m_Ly5.mjs";
import { i as isIncognitoOpenClawAgentSqlitePath } from "./openclaw-agent-db.paths-Dv3PPTNK.mjs";
import { n as withOpenClawAgentDatabaseReadOnly } from "./openclaw-agent-db-readonly-CkWWSfuG.mjs";
import { o as resolveDeliveryProvenCanonicalSessionKey } from "./store-entry-CBksE8pX.mjs";
import { _ as toDatabaseOptions, l as resolveSqliteScope } from "./session-accessor.sqlite-scope-AxUEwRt8.mjs";
import { d as validateDeliveryCanonicalSessionEntry } from "./session-accessor.sqlite-entry-read-oKmXbFma.mjs";
import { c as hasCanonicalSessionValidationProjection, d as readWithCanonicalSessionReaderContinuation, g as canonicalSessionKeyMigrationRequiredError, r as assertCanonicalSqliteSessionKeysCurrent } from "./session-canonical-key-Cjd4Pn_g.mjs";
import { a as selectSessionEntryRows, r as parseSessionEntryJson } from "./session-accessor.sqlite-status-CbDRSABL.mjs";
import { s as readSessionEntryCache } from "./session-accessor.sqlite-entry-cache-DYTBofzQ.mjs";
import { t as isInternalSessionEffectsKey } from "./internal-session-key-BOMXCQVf.mjs";
//#region src/config/sessions/session-accessor.sqlite-entry-list.read.ts
/** Select listing facts without hydrating the store; creation retains only its target payloads. */
function readSelectedSessionEntriesInDatabase(database, sessionKeys, options = {}) {
	return readWithCanonicalSessionReaderContinuation(database, options.continuation, () => {
		assertCanonicalSqliteSessionKeysCurrent(database);
		const keys = new Set(sessionKeys);
		const fullEntryKeys = new Set(options.fullEntryKeys);
		const query = selectSessionEntryRows(database, "list", options.fullEntryKeys).select("updated_at");
		const db = getNodeSqliteKysely(database.db);
		const pending = db.selectFrom("session_canonical_validation_pending").select("session_key");
		let selected = db.selectFrom("session_nodes").select("session_key").where("session_key", "in", sqliteStringSet(sessionKeys));
		if (options.label !== void 0) selected = selected.union(db.selectFrom("session_nodes").select("session_key").where("label", "=", options.label.trim()));
		const rows = executeSqliteQuerySync(database.db, hasCanonicalSessionValidationProjection(database) ? query.where("session_key", "in", pending.union(selected)) : query).rows;
		const entries = [];
		for (const row of rows) {
			if (isInternalSessionEffectsKey(row.session_key)) continue;
			const entry = parseSessionEntryJson(row, fullEntryKeys.has(row.session_key) ? "full" : "list");
			if (!entry) continue;
			validateDeliveryCanonicalSessionEntry(row.session_key, entry);
			if (keys.has(row.session_key) || options.label !== void 0 && entry.label === options.label) entries.push({
				sessionKey: row.session_key,
				entry
			});
		}
		return entries;
	});
}
/**
* Lists session entries without opening the agent database writable.
* Transient lock errors propagate: only the caller knows whether "empty" is an
* acceptable degradation (health snapshots) or hides real state (migration detection).
*/
function listSessionEntriesReadOnly(scope = {}, options = {}) {
	const resolved = resolveSqliteScope({
		...scope,
		sessionKey: ""
	});
	const result = withOpenClawAgentDatabaseReadOnly((database) => listSqliteSessionEntriesFromDatabase(database, resolved, scope, options), toDatabaseOptions(resolved));
	return result.found ? result.value : [];
}
function listSqliteSessionEntriesFromDatabase(database, resolved, scope, options = {}) {
	if (scope.expiredCronRuns) {
		const { agentId, updatedBefore } = scope.expiredCronRuns;
		const requestedOwner = normalizeAgentId(agentId);
		return withSqlitePostCommitPublications(database.db, () => runSqliteDeferredTransactionSync(database.db, () => {
			const selectedKeys = /* @__PURE__ */ new Set();
			const snapshot = readSessionEntryCache(database, {
				cache: false,
				retainFullEntry: (sessionKey, entry) => {
					const selected = isCronRunSessionKey(sessionKey) && normalizeAgentId(parseAgentSessionKey(sessionKey).agentId) === requestedOwner && !((entry.updatedAt ?? 0) >= updatedBefore);
					if (selected) selectedKeys.add(sessionKey);
					return selected;
				}
			});
			return Array.from(iterateSessionEntriesForListing(snapshot, false, selectedKeys));
		}));
	}
	const projection = scope.projection ?? "full";
	const cache = !isIncognitoOpenClawAgentSqlitePath(database.path, {
		agentId: database.agentId,
		env: resolved.env
	});
	const snapshot = readSessionEntryCache(database, {
		cache,
		latest: scope.readConsistency === "latest",
		projection,
		deferParticipants: options.deferParticipants
	});
	return Array.from(iterateSessionEntriesForListing(snapshot, projection === "list" && scope.clone !== false, scope.sessionKeys ? new Set(scope.sessionKeys) : void 0));
}
/** Applies the listing visibility and canonical-key contract to an owned snapshot. */
function* iterateSessionEntriesForListing(snapshot, cloneEntries = false, sessionKeys) {
	for (const sessionKey of snapshot.keys) {
		if (isInternalSessionEffectsKey(sessionKey)) continue;
		const entry = snapshot.entries.get(sessionKey);
		if (!entry) continue;
		const deliveryCanonicalKey = resolveDeliveryProvenCanonicalSessionKey(sessionKey, entry);
		if (deliveryCanonicalKey !== sessionKey) throw canonicalSessionKeyMigrationRequiredError(`non-canonical persisted row resolves to session key ${deliveryCanonicalKey}`);
		if (sessionKeys && !sessionKeys.has(sessionKey)) continue;
		yield {
			sessionKey,
			entry: cloneEntries ? structuredClone(entry) : entry
		};
	}
}
//#endregion
export { listSqliteSessionEntriesFromDatabase as n, readSelectedSessionEntriesInDatabase as r, listSessionEntriesReadOnly as t };
