import { l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import { l as sqliteStringSet, n as executeSqliteQuerySync } from "./kysely-sync-Y4_ti-rQ.mjs";
import { a as withSqlitePostCommitPublications } from "./sqlite-post-commit-Dih1WMKX.mjs";
import { r as runSqliteDeferredTransactionSync } from "./sqlite-transaction-2VkikDo-.mjs";
import { i as readOpenClawAgentDatabaseIdentity } from "./openclaw-agent-db-identity-ChZ28OhF.mjs";
import { i as getSessionKysely } from "./session-accessor.sqlite-scope-AxUEwRt8.mjs";
import { d as validateDeliveryCanonicalSessionEntry, f as participantRecordsBySessionKey } from "./session-accessor.sqlite-entry-read-oKmXbFma.mjs";
import { r as assertCanonicalSqliteSessionKeysCurrent } from "./session-canonical-key-Cjd4Pn_g.mjs";
import { a as selectSessionEntryRows, r as parseSessionEntryJson } from "./session-accessor.sqlite-status-CbDRSABL.mjs";
import { t as isInternalSessionEffectsKey } from "./internal-session-key-BOMXCQVf.mjs";
//#region src/config/sessions/session-membership-facts.ts
/** The read-only worker projects a store once, then only keys named by committed publications. */
function readSessionMembershipFactsInDatabase(database, sessionKeys) {
	const { identity, birthtime } = readOpenClawAgentDatabaseIdentity(database);
	if (typeof identity !== "string") throw new Error("Durable session membership requires a physical database");
	if (sessionKeys?.length === 0) return {
		kind: "session-membership-facts",
		identity,
		birthtime,
		facts: []
	};
	return withSqlitePostCommitPublications(database.db, () => runSqliteDeferredTransactionSync(database.db, () => {
		assertCanonicalSqliteSessionKeysCurrent(database);
		let entries = selectSessionEntryRows(database, "list").select("updated_at").orderBy("session_key");
		let members = getSessionKysely(database.db).selectFrom("session_members").select(["session_key", "identity_id"]).orderBy("session_key").orderBy("identity_id");
		if (sessionKeys) {
			entries = entries.where("session_key", "in", sqliteStringSet(sessionKeys));
			members = members.where("session_key", "in", sqliteStringSet(sessionKeys));
		}
		const facts = /* @__PURE__ */ new Map();
		const readableKeys = [];
		for (const row of executeSqliteQuerySync(database.db, entries).rows) {
			const entry = parseSessionEntryJson(row, "list");
			if (!entry) continue;
			const internal = isInternalSessionEffectsKey(row.session_key);
			if (!internal) validateDeliveryCanonicalSessionEntry(row.session_key, entry);
			readableKeys.push(row.session_key);
			facts.set(row.session_key, [
				row.session_key,
				internal ? null : normalizeOptionalString(entry.category) ?? null,
				[],
				{},
				entry.sessionId
			]);
		}
		const memberships = /* @__PURE__ */ new Map();
		for (const row of executeSqliteQuerySync(database.db, members).rows) {
			const values = memberships.get(row.session_key) ?? [];
			values.push(row.identity_id);
			memberships.set(row.session_key, values);
		}
		for (const [sessionKey, values] of memberships) {
			const current = facts.get(sessionKey);
			facts.set(sessionKey, [
				sessionKey,
				current?.[1] ?? null,
				values,
				current?.[3] ?? {},
				current?.[4] ?? null
			]);
		}
		for (const [sessionKey, records] of participantRecordsBySessionKey(database.db, readableKeys)) {
			const current = facts.get(sessionKey);
			facts.set(sessionKey, [
				sessionKey,
				current?.[1] ?? null,
				current?.[2] ?? [],
				{
					participants: records.map(({ identity: participantIdentity }) => ({ identity: participantIdentity })),
					participantCount: records.length
				},
				current?.[4] ?? null
			]);
		}
		return {
			kind: "session-membership-facts",
			identity,
			birthtime,
			facts: [...facts.values()]
		};
	}));
}
//#endregion
export { readSessionMembershipFactsInDatabase };
