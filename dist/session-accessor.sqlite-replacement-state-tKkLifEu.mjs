import { y as uniqueStrings } from "./string-normalization-YMwDjufr.mjs";
import { l as sqliteStringSet, n as executeSqliteQuerySync } from "./kysely-sync-Y4_ti-rQ.mjs";
import { a as withSqlitePostCommitPublications } from "./sqlite-post-commit-Dih1WMKX.mjs";
import { r as runSqliteDeferredTransactionSync } from "./sqlite-transaction-2VkikDo-.mjs";
import { a as normalizeStoreSessionKey, s as resolveSessionEntryCandidates, t as collectSessionEntryLookupKeys } from "./store-entry-CBksE8pX.mjs";
import { i as getSessionKysely } from "./session-accessor.sqlite-scope-AxUEwRt8.mjs";
import { a as readExactSessionEntryRow, m as projectSqliteSessionParticipantsBatch, r as prepareExactSessionEntryRowReads } from "./session-accessor.sqlite-entry-read-oKmXbFma.mjs";
import { r as assertCanonicalSqliteSessionKeysCurrent } from "./session-canonical-key-Cjd4Pn_g.mjs";
import { b as projectSessionSharingEntry } from "./session-accessor.sqlite-entry-cache-DYTBofzQ.mjs";
import { r as readSelectedSessionEntriesInDatabase } from "./session-accessor.sqlite-entry-list.read-6sJ8GFrX.mjs";
import { t as iterateSessionEntryKeys } from "./session-accessor.sqlite-entry-inventory-C1YppdkT.mjs";
import { Q as sqliteSessionEntriesEqual, f as writeSessionEntry, n as deleteLegacySessionEntryRows } from "./session-accessor.sqlite-entry-store-JXJQe1fh.mjs";
import { n as appendTranscriptEventsInTransaction } from "./session-accessor.sqlite-transcript-store-CPlEEZZV.mjs";
import { n as hasPendingSessionTranscriptArchives } from "./session-accessor.sqlite-archive-store-kernel-B7AKinHq.mjs";
import { n as emptySessionEntryMaintenancePlan, t as applySessionEntryMaintenanceInDatabase } from "./session-accessor.sqlite-maintenance-store-Cb8zEW1y.mjs";
import { n as replaceSessionOwnerInTransaction } from "./session-accessor.sqlite-owner-De5R81DU.mjs";
//#region src/config/sessions/session-accessor.sqlite-replacement-read.ts
function readSessionEntryReplacementLabelOwnerKeys(database, label) {
	return label === void 0 ? [] : executeSqliteQuerySync(database.db, getSessionKysely(database.db).selectFrom("session_nodes").select("session_key").where("label", "=", label).orderBy("session_key")).rows.map((row) => row.session_key);
}
function selectReplacementKeys(database, params, labelOwnerKeys) {
	if (params.statuses) {
		if (params.statuses.length === 0) return [];
		let query = getSessionKysely(database.db).selectFrom("session_nodes").select("session_key").where("status", "in", params.statuses);
		if (params.sessionKeys) query = query.where("session_key", "in", sqliteStringSet(params.sessionKeys));
		return executeSqliteQuerySync(database.db, query).rows.map((row) => row.session_key).toSorted((left, right) => left.localeCompare(right));
	}
	if (params.sessionKeys) return uniqueStrings([...params.sessionKeys, ...labelOwnerKeys]);
	assertCanonicalSqliteSessionKeysCurrent(database);
	return [...iterateSessionEntryKeys(database)];
}
/** Detached entries and their CAS bytes must come from the same admitted read snapshot. */
function readSessionEntryReplacementState(database, params) {
	const selectedKeys = params.sessionKeys ? new Set(params.sessionKeys) : void 0;
	const selectedStatuses = params.statuses ? new Set(params.statuses) : void 0;
	const labelOwnerKeys = readSessionEntryReplacementLabelOwnerKeys(database, params.includeLabelOwners);
	const selected = selectReplacementKeys(database, params, labelOwnerKeys);
	const expectedRows = /* @__PURE__ */ new Map();
	const readPrepared = selected.length > 1 ? prepareExactSessionEntryRowReads(database, selected) : void 0;
	return {
		entries: selected.flatMap((sessionKey) => {
			const row = readPrepared ? readPrepared(sessionKey) : readExactSessionEntryRow(database, sessionKey);
			if (!row) {
				if (!selectedKeys || selectedStatuses) throw new Error(`SQLite session entry changed before replacement for ${sessionKey}`);
				return [];
			}
			if (selectedStatuses && (!row.entry.status || !selectedStatuses.has(row.entry.status))) return [];
			expectedRows.set(sessionKey, row);
			return [{
				entry: structuredClone(row.entry),
				sessionKey
			}];
		}),
		expectedRows,
		labelOwnerKeys
	};
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-creation-read.ts
/** Recheck the explicit claim inside the transaction that writes its session row. */
function assertSessionCreationLabelAvailable(database, sessionKey, label) {
	if (label === void 0) return;
	if (readSelectedSessionEntriesInDatabase(database, [], { label }).some((candidate) => candidate.sessionKey !== sessionKey)) {
		const error = /* @__PURE__ */ new Error(`label already in use: ${label}`);
		error.name = "SessionLabelConflictError";
		throw error;
	}
}
/** Target payload and the indexed label claim share one snapshot on the executing owner. */
function readSessionCreationSnapshotInDatabase(database, sessionKey, label) {
	return withSqlitePostCommitPublications(database.db, () => runSqliteDeferredTransactionSync(database.db, () => {
		const normalizedKey = normalizeStoreSessionKey(sessionKey);
		const keys = [normalizedKey, ...collectSessionEntryLookupKeys(sessionKey)];
		const candidates = readSelectedSessionEntriesInDatabase(database, keys, {
			fullEntryKeys: keys,
			label
		});
		const entries = projectSqliteSessionParticipantsBatch(database.db, new Map(candidates.filter((candidate) => keys.includes(candidate.sessionKey)).map(({ sessionKey: key, entry }) => [key, entry])));
		const resolved = resolveSessionEntryCandidates({
			entries: Array.from(entries, ([key, entry]) => ({
				sessionKey: key,
				entry
			})),
			sessionKey,
			canonicalKeys: true
		});
		const targetEntry = entries.get(normalizedKey);
		return {
			normalizedKey,
			legacyKeys: resolved.legacyKeys,
			existingEntry: resolved.existing ? { ...resolved.existing.entry } : void 0,
			targetEntry: targetEntry ? { ...targetEntry } : void 0,
			labelInUse: label !== void 0 && candidates.some((candidate) => candidate.sessionKey !== normalizedKey && candidate.entry.label === label)
		};
	}));
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-replacement-state.ts
/** Receipts carry only publication facts, never saved prompts or maintenance payloads. */
function prepareSessionEntryReplacementPublication(result) {
	return {
		kind: "session-entry-replacements",
		pendingArchiveRecovery: result.pendingArchiveRecovery,
		membershipInvalidatedKeys: result.membershipInvalidatedKeys,
		previous: new Map([...result.previous].map(([key, entry]) => [key, {
			sessionId: entry.sessionId,
			lifecycleRevision: entry.lifecycleRevision
		}])),
		current: new Map([...result.current].map(([key, entry]) => [key, projectSessionSharingEntry(entry)])),
		changedKeys: [.../* @__PURE__ */ new Set([
			...result.previous.keys(),
			...result.current.keys(),
			...result.maintenancePlans.flatMap((plan) => plan.archivedSessionKeys)
		])]
	};
}
/** One SQL owner serves admitted worker writes and the native rollback exception. */
function commitSessionEntryReplacementsInDatabase(database, input, beforeReplacements) {
	if (input.labelClaim) assertSessionCreationLabelAvailable(database, input.labelClaim.sessionKey, input.labelClaim.label);
	if (input.includeLabelOwners !== void 0 && JSON.stringify(readSessionEntryReplacementLabelOwnerKeys(database, input.includeLabelOwners)) !== JSON.stringify(input.labelOwnerKeys)) throw new Error("SQLite session label owners changed before replacement");
	const transactionEntries = /* @__PURE__ */ new Map();
	for (const sessionKey of input.validationKeys) {
		const transactionRow = readExactSessionEntryRow(database, sessionKey);
		const expectedRow = input.expectedRows.get(sessionKey);
		if (transactionRow?.row.entry_json !== expectedRow?.row.entry_json || !sqliteSessionEntriesEqual(transactionRow?.entry, expectedRow?.entry)) throw new Error(`SQLite session entry changed before replacement for ${sessionKey}`);
		if (transactionRow) transactionEntries.set(sessionKey, transactionRow.entry);
	}
	beforeReplacements();
	if (input.preparedTranscript) {
		const { sessionKey, sessionId, events } = input.preparedTranscript;
		appendTranscriptEventsInTransaction(database, {
			agentId: database.agentId,
			path: database.path,
			sessionKey,
			sessionId
		}, events);
	}
	const previous = /* @__PURE__ */ new Map();
	const current = /* @__PURE__ */ new Map();
	const membershipInvalidatedKeys = [];
	for (const replacement of input.replacements) {
		const sourceEntries = [replacement.sessionKey, ...replacement.previousSessionKeys ?? []].flatMap((sessionKey) => {
			const entry = transactionEntries.get(sessionKey);
			return entry ? [{
				entry,
				sessionKey
			}] : [];
		});
		const selectedBefore = sourceEntries.toSorted((left, right) => (right.entry.updatedAt ?? 0) - (left.entry.updatedAt ?? 0))[0]?.entry;
		for (const { entry, sessionKey } of sourceEntries) previous.set(sessionKey, entry);
		const written = writeSessionEntry(database, replacement.sessionKey, structuredClone(replacement.entry), {
			...input.consumePendingReset ? { consumePendingReset: true } : {},
			previousEntry: selectedBefore ?? null,
			canonicalPreviousEntry: transactionEntries.get(replacement.sessionKey) ?? null
		});
		deleteLegacySessionEntryRows(database, [...replacement.previousSessionKeys ?? []], replacement.sessionKey, { rehomeMembers: selectedBefore?.sessionId === replacement.entry.sessionId });
		if (replacement.previousSessionKeys?.some((key) => key !== replacement.sessionKey)) membershipInvalidatedKeys.push(replacement.sessionKey);
		current.set(replacement.sessionKey, written);
	}
	const maintenance = input.maintenance;
	if (input.ownerAssignment) {
		const { sessionKey, owner } = input.ownerAssignment;
		if (!current.has(sessionKey) || !replaceSessionOwnerInTransaction(database, sessionKey, owner)) throw new Error("Session owner assignment lost its creation target");
	}
	const preservation = maintenance?.preservation;
	const maintenancePlan = maintenance && preservation ? applySessionEntryMaintenanceInDatabase(database, maintenance, () => preservation) : emptySessionEntryMaintenancePlan();
	return {
		pendingArchiveRecovery: input.checkPendingArchiveRecovery === true && previous.size > 0 && hasPendingSessionTranscriptArchives(database),
		previous,
		current,
		maintenancePlans: [maintenancePlan],
		membershipInvalidatedKeys
	};
}
//#endregion
export { readSessionEntryReplacementState as a, readSessionCreationSnapshotInDatabase as i, prepareSessionEntryReplacementPublication as n, assertSessionCreationLabelAvailable as r, commitSessionEntryReplacementsInDatabase as t };
