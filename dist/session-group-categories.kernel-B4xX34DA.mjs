import { n as executeSqliteQuerySync } from "./kysely-sync-Y4_ti-rQ.mjs";
import { d as withExistingOpenClawStateDatabaseReadOnly } from "./openclaw-state-db-readonly-DE3MB0wy.mjs";
import { a as readExactSessionEntryRow, d as validateDeliveryCanonicalSessionEntry, r as prepareExactSessionEntryRowReads } from "./session-accessor.sqlite-entry-read-oKmXbFma.mjs";
import { r as assertCanonicalSqliteSessionKeysCurrent } from "./session-canonical-key-Cjd4Pn_g.mjs";
import { a as selectSessionEntryRows, r as parseSessionEntryJson } from "./session-accessor.sqlite-status-CbDRSABL.mjs";
import { t as isInternalSessionEffectsKey } from "./internal-session-key-BOMXCQVf.mjs";
import { n as readSessionGroupCatalogEntry } from "./session-group-catalog.kernel-Cov7RRef.mjs";
import { Q as sqliteSessionEntriesEqual, f as writeSessionEntry } from "./session-accessor.sqlite-entry-store-JXJQe1fh.mjs";
//#region src/config/sessions/session-group-categories.read.ts
function readSessionGroupCategoryKeys(database, name) {
	assertCanonicalSqliteSessionKeysCurrent(database);
	return executeSqliteQuerySync(database.db, selectSessionEntryRows(database, "list").orderBy("session_key")).rows.flatMap((row) => {
		if (isInternalSessionEffectsKey(row.session_key)) return [];
		const entry = parseSessionEntryJson(row, "list");
		if (!entry) return [];
		validateDeliveryCanonicalSessionEntry(row.session_key, entry);
		return entry.category?.trim() === name ? [row.session_key] : [];
	});
}
//#endregion
//#region src/config/sessions/session-group-categories.kernel.ts
const MIN_BATCHED_CATEGORY_KEYS = 10;
function prepareSessionGroupCategoryMutation(database, name) {
	const rows = /* @__PURE__ */ new Map();
	const keys = readSessionGroupCategoryKeys(database, name);
	const readPrepared = keys.length >= MIN_BATCHED_CATEGORY_KEYS ? prepareExactSessionEntryRowReads(database, keys) : void 0;
	for (const key of keys) {
		const row = readPrepared ? readPrepared(key) : readExactSessionEntryRow(database, key);
		if (row?.entry.category?.trim() === name) rows.set(key, row);
	}
	return rows;
}
function applySessionGroupCategoryMutation(database, expected, to, env) {
	const current = /* @__PURE__ */ new Map();
	const readPrepared = expected.size >= MIN_BATCHED_CATEGORY_KEYS ? prepareExactSessionEntryRowReads(database, [...expected.keys()]) : void 0;
	for (const [key, before] of expected) {
		const row = readPrepared ? readPrepared(key) : readExactSessionEntryRow(database, key);
		if (!row || row.row.entry_json !== before.row.entry_json || !sqliteSessionEntriesEqual(row.entry, before.entry)) throw new Error(`SQLite session entry changed before replacement for ${key}`);
		current.set(key, row);
	}
	assertSessionGroupCategoryDestination(to, env);
	for (const [key, row] of current) {
		const next = { ...row.entry };
		if (to === void 0) delete next.category;
		else next.category = to;
		writeSessionEntry(database, key, next, {
			canonicalPreviousEntry: row.entry,
			previousEntry: row.entry
		});
	}
	return [...current].map(([sessionKey, { entry }]) => ({
		sessionKey,
		sessionId: entry.sessionId
	}));
}
function assertSessionGroupCategoryDestination(to, env) {
	if (to !== void 0 && !withExistingOpenClawStateDatabaseReadOnly(({ db }) => readSessionGroupCatalogEntry(db, to), { env })) throw new Error(`unknown session group: ${to}`);
}
//#endregion
export { assertSessionGroupCategoryDestination as n, prepareSessionGroupCategoryMutation as r, applySessionGroupCategoryMutation as t };
