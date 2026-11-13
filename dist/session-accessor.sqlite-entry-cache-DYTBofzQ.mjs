import { i as resolveGlobalSingleton } from "./global-singleton-BfHBYj6Y.mjs";
import { a as iterateSqliteQuerySync, i as getNodeSqliteKysely, l as sqliteStringSet, n as executeSqliteQuerySync } from "./kysely-sync-Y4_ti-rQ.mjs";
import { a as runSqliteReadOperationSync, n as getAdmittedSqliteSchemaFacts } from "./sqlite-schema-facts-DwsuACBg.mjs";
import { n as readSqliteDataVersion } from "./node-sqlite-B4hwsR7e.mjs";
import { n as findOpenClawAgentDatabaseIdentity } from "./openclaw-agent-db-identity-ChZ28OhF.mjs";
import { n as ok, t as err } from "./result-BQGgYouL.mjs";
import { t as freezeJsonSnapshot } from "./immutable-data-MyNs7ITg.mjs";
import { n as sessionChanges } from "./session-row-changes-DFigA589.mjs";
import { f as invalidateOpenClawAgentWritableProjections } from "./openclaw-agent-db-lifecycle-CCXA1nI8.mjs";
import { r as readOpenClawAgentDatabase } from "./openclaw-agent-db-readonly-open-BuSJ-FUr.mjs";
import { i as invalidateOpenClawAgentReadOnlyProjections } from "./openclaw-agent-db-readonly-scope-CuYmDv32.mjs";
import { C as readSessionEntryCacheValidityToken, a as readExactSessionEntryRow, b as sessionEntryCaches, d as validateDeliveryCanonicalSessionEntry, h as readSqliteSessionParticipantProjection, m as projectSqliteSessionParticipantsBatch, r as prepareExactSessionEntryRowReads, w as readSessionNodesGeneration, x as cacheValidityTokensEqual, y as publishTrackedCacheUpdate } from "./session-accessor.sqlite-entry-read-oKmXbFma.mjs";
import { r as assertCanonicalSqliteSessionKeysCurrent, x as readSqliteSessionOwner, y as hasSqliteSessionOwnerColumns } from "./session-canonical-key-Cjd4Pn_g.mjs";
import { a as selectSessionEntryRows, r as parseSessionEntryJson } from "./session-accessor.sqlite-status-CbDRSABL.mjs";
import { r as listSessionMembersInDatabase } from "./session-sharing-store.kernel-BTYS_97Q.mjs";
import path from "node:path";
import { AsyncLocalStorage } from "node:async_hooks";
import { toUSVString } from "node:util";
//#region src/config/sessions/session-accessor.sqlite-entry-cache-projection.ts
function loadSessionEntrySnapshot(database, projection = "list", prepared, retainFullEntry, deferParticipants = false) {
	const metadata = prepared && prepared.dataVersion === readSqliteDataVersion(database.db) ? prepared : void 0;
	const parsedEntries = metadata?.entries ?? /* @__PURE__ */ new Map();
	const keys = metadata?.keys ?? [];
	if (!metadata) for (const row of iterateSqliteQuerySync(database.db, selectSessionEntryRows(database, projection).select("updated_at").orderBy("session_key"))) {
		keys.push(row.session_key);
		const entry = parseSessionEntryJson(row, projection);
		if (entry) {
			if (retainFullEntry && !retainFullEntry(row.session_key, entry)) {
				delete entry.sessionDiffBaseline;
				delete entry.skillsSnapshot;
				delete entry.systemPromptReport;
			}
			parsedEntries.set(row.session_key, entry);
		}
	}
	return {
		entries: deferParticipants ? parsedEntries : projectSqliteSessionParticipantsBatch(database.db, parsedEntries),
		keys
	};
}
function readSessionEntrySideMetadata(database, sessionKey, participants) {
	const ownerRow = hasSqliteSessionOwnerColumns(database.db) ? executeSqliteQuerySync(database.db, getNodeSqliteKysely(database.db).selectFrom("session_nodes").select([
		"owner_actor_type",
		"owner_actor_id",
		"owner_assigned_by_type",
		"owner_assigned_by_id",
		"owner_assigned_at"
	]).where("session_key", "=", sessionKey).limit(1)).rows[0] : void 0;
	const owner = ownerRow ? readSqliteSessionOwner(ownerRow) : void 0;
	return {
		...owner ? { owner } : {},
		...participants ?? readSqliteSessionParticipantProjection(database.db, sessionKey)
	};
}
function projectSessionEntryCacheUpdate(entryJson, sideMetadata) {
	const parsedEntry = parseSessionEntryJson({ entry_json: entryJson }, "list");
	return parsedEntry ? freezeJsonSnapshot({
		...parsedEntry,
		...sideMetadata
	}) : void 0;
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-entry-cache.types.ts
function projectSessionSharingEntry(entry) {
	return {
		sessionId: entry.sessionId,
		updatedAt: entry.updatedAt,
		lifecycleRevision: entry.lifecycleRevision,
		archivedAt: entry.archivedAt,
		visibility: entry.visibility,
		incognito: entry.incognito,
		createdActor: entry.createdActor ? { ...entry.createdActor } : void 0,
		owner: entry.owner ? {
			...entry.owner,
			actor: { ...entry.owner.actor },
			assignedBy: entry.owner.assignedBy ? { ...entry.owner.assignedBy } : void 0
		} : void 0,
		sandbox: entry.sandbox,
		spawnedBy: entry.spawnedBy,
		spawnDepth: entry.spawnDepth,
		parentSessionKey: entry.parentSessionKey,
		sessionStartedAt: entry.sessionStartedAt
	};
}
const creationBrand = Symbol("sessionEntryCreation");
/** Allocate an opaque token; the publication owner's WeakMap alone grants live custody. */
function createSessionEntryCreationOperation() {
	return Object.freeze({ [creationBrand]: true });
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-sharing-acquisition.ts
function publishRetainedSessionGeneration(read, entry, known) {
	const generation = read.generation;
	if (generation?.initiallyAbsent) {
		if (generation.current === null) generation.current = known ? entry ?? null : void 0;
		return;
	}
	if (!generation?.current) return;
	if (!known) generation.current = void 0;
	else if (!entry || generation.current.sessionId !== entry.sessionId || generation.current.lifecycleRevision !== entry.lifecycleRevision) generation.current = null;
}
/** Reconcile one worker snapshot with commit postimages, without adopting another lifecycle. */
function reconcileSessionSharingAcquisition(acquisition, snapshot) {
	if (acquisition.invalidated || acquisition.sessionId !== void 0 && acquisition.sessionId !== snapshot.entry?.sessionId || acquisition.entry !== void 0 && acquisition.entry.lifecycleRevision !== snapshot.entry?.lifecycleRevision) throw new Error("Session sharing acquisition is no longer current");
	const membership = new Set(snapshot.membership);
	for (const [identityId, present] of acquisition.membership) if (present) membership.add(identityId);
	else membership.delete(identityId);
	return {
		...snapshot,
		entry: acquisition.entry ?? snapshot.entry,
		membership
	};
}
/** The committing producer supplies both identities; a matching final snapshot cannot undo reset. */
function recordAcquiringSessionEntry(acquisition, entry, previous) {
	if (!acquisition) return;
	if (!entry || !previous || previous.sessionId !== entry.sessionId || previous.lifecycleRevision !== entry.lifecycleRevision || acquisition.sessionId !== void 0 && acquisition.sessionId !== entry.sessionId || acquisition.entry !== void 0 && acquisition.entry.lifecycleRevision !== entry.lifecycleRevision) {
		acquisition.invalidated = true;
		return;
	}
	acquisition.entry = entry;
	acquisition.sessionId = entry.sessionId;
}
function recordAcquiringSessionMember(acquisition, member) {
	if (acquisition.sessionId !== void 0 && acquisition.sessionId !== member.sessionId) acquisition.invalidated = true;
	acquisition.sessionId = member.sessionId;
	acquisition.membership.set(member.identityId, member.present);
}
/** Apply a committed field postimage only to its original session generation. */
function updateSessionSharingField(facts, change) {
	if (facts.entry?.sessionId !== change.sessionId) return facts;
	if (change.kind === "owner") return (facts.entry.lifecycleRevision ?? null) === change.lifecycleRevision ? {
		...facts,
		entry: {
			...facts.entry,
			owner: change.owner
		}
	} : facts;
	const membership = new Set(facts.membership);
	if (change.present) membership.add(change.identityId);
	else membership.delete(change.identityId);
	return {
		...facts,
		membership
	};
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-entry-cache-publication.ts
const preparedSharingReads = resolveGlobalSingleton(Symbol.for("openclaw.preparedSessionSharingReads"), () => /* @__PURE__ */ new Map());
const preparedSharingChanges = resolveGlobalSingleton(Symbol.for("openclaw.preparedSessionSharingChanges"), () => ({
	changes: /* @__PURE__ */ new WeakMap(),
	operations: /* @__PURE__ */ new WeakMap(),
	current: new AsyncLocalStorage()
}));
const pendingSessionEntryPublications = resolveGlobalSingleton(Symbol.for("openclaw.pendingSessionEntryPublications"), () => /* @__PURE__ */ new Map());
function recordCommittedSessionEntryPublication(database, sessionKey, entry) {
	const identity = findOpenClawAgentDatabaseIdentity(database)?.identity;
	if (typeof identity !== "string") return;
	for (const pending of pendingSessionEntryPublications.get(`file:${identity}\0${sessionKey}`) ?? []) pending.superseded.set(sessionKey, entry ? {
		sessionId: entry.sessionId,
		lifecycleRevision: entry.lifecycleRevision
	} : void 0);
}
/** Private owner metadata follows the original event object without changing its public fields. */
function isPreparedSessionSharingChange(change) {
	return preparedSharingChanges.changes.has(change);
}
function emitPreparedSessionSharingChange(database, sessionKey, agentId = database.agentId, facts, receipt) {
	const change = {
		agentId,
		storePath: database.path,
		sessionKey,
		...facts ? {
			facts,
			scope: "session-entry"
		} : { factsInvalidated: true }
	};
	preparedSharingChanges.changes.set(change, receipt);
	sessionChanges.emit(change, database.db);
}
function assertCreationCurrent(creation) {
	if (!creation?.active) throw new Error("Session creation publication owner is no longer current");
	const source = creation.source;
	if (source.kind === "file") source.assertCurrent();
	else if (!source.database.db.isOpen || source.database.agentId !== source.agentId) throw new Error("Session creation publication owner is no longer current");
}
function creationDatabaseIdentity(creation) {
	return creation.source.kind === "native" ? creation.source.database.db : creation.source.databaseIdentity;
}
function creationMatchesDatabase(creation, database) {
	return creation.source.kind === "native" ? creation.source.database.db === database.db : creation.source.agentId === database.agentId && findOpenClawAgentDatabaseIdentity(database)?.identity === creation.source.databaseIdentity;
}
/** Canonical creation scopes provenance only; caller and target guards still authorize each write. */
async function withSessionEntryCreationPublication(params, run) {
	const operation = createSessionEntryCreationOperation();
	const creation = {
		agentId: params.agentId,
		source: params.database ? {
			kind: "native",
			database: params.database,
			agentId: params.database.agentId
		} : {
			kind: "file",
			...params.file
		},
		sessionKey: params.sessionKey,
		active: true
	};
	preparedSharingChanges.operations.set(operation, creation);
	try {
		params.bind?.(operation);
		return await runWithSessionEntryCreationPublication(operation, () => run(operation));
	} finally {
		creation.active = false;
		preparedSharingChanges.operations.delete(operation);
	}
}
/** Reenter only this operation's provenance after another owner restores its own context. */
function runWithSessionEntryCreationPublication(operation, run) {
	const creation = preparedSharingChanges.operations.get(operation);
	assertCreationCurrent(creation);
	return preparedSharingChanges.current.run(creation, run);
}
function assertSessionEntryCreationPublication(operation, target) {
	const creation = preparedSharingChanges.operations.get(operation);
	assertCreationCurrent(creation);
	const sourcePath = creation.source.kind === "native" ? creation.source.database.path : creation.source.path;
	if (creation.agentId !== target.agentId || creation.sessionKey !== target.sessionKey || !target.paths.has(path.resolve(sourcePath))) throw new Error("Session creation publication owner is no longer current");
}
function readSessionEntryCreationTransition(change, operation) {
	const receipt = preparedSharingChanges.changes.get(change);
	const creation = preparedSharingChanges.operations.get(operation);
	if (!creation) return;
	try {
		assertCreationCurrent(creation);
	} catch {
		return;
	}
	return receipt?.committed && receipt.creation === creation && receipt.databaseIdentity === creationDatabaseIdentity(creation) && receipt.sessionKey === creation.sessionKey ? receipt.placeholder : void 0;
}
/** Only the actual inserted-placeholder producer supplies these known row facts. */
function publishSessionEntryPlaceholderInsertion(database, params) {
	const { sessionKey, sessionId } = params;
	const placeholder = Object.freeze({ sessionId });
	const current = preparedSharingChanges.current.getStore();
	const creation = current?.active && creationMatchesDatabase(current, database) && current.sessionKey === sessionKey ? current : void 0;
	const receipt = {
		creation,
		databaseIdentity: creation ? creationDatabaseIdentity(creation) : database.db,
		sessionKey,
		placeholder,
		committed: false
	};
	const incognito = !database.db.location();
	let staged = false;
	staged = publishTrackedCacheUpdate(database, () => {
		recordCommittedSessionEntryPublication(database, sessionKey, void 0);
		const facts = staged ? {
			entry: void 0,
			placeholder,
			membership: /* @__PURE__ */ new Set()
		} : void 0;
		for (const read of retainedSharingReads(database, sessionKey) ?? []) {
			if (read.acquisition) read.acquisition.invalidated = true;
			publishRetainedSessionGeneration(read, void 0, staged);
			read.facts = facts;
		}
		if (incognito) incognitoSharingState(database.db).entries.set(sessionKey, facts ?? null);
		sessionEntryCaches.delete(database.db);
		receipt.committed = staged;
	}, () => stageSessionSharingPublication(database, sessionKey));
	emitPreparedSessionSharingChange(database, sessionKey, database.agentId, void 0, receipt);
}
/** The existing entry writer advances retained facts before any commit observer can reenter. */
function retainPreparedSessionSharingFacts(params) {
	const key = `${params.databaseIdentity}\0${params.sessionKey}`;
	const initial = "acquiring" in params ? void 0 : params;
	const read = {
		pending: /* @__PURE__ */ new Set(),
		facts: initial && {
			entry: initial.entry,
			placeholder: initial.placeholder,
			membership: initial.membership
		},
		generation: initial?.generation,
		acquisition: initial ? void 0 : {
			invalidated: false,
			membership: /* @__PURE__ */ new Map()
		}
	};
	const reads = preparedSharingReads.get(key) ?? /* @__PURE__ */ new Set();
	reads.add(read);
	preparedSharingReads.set(key, reads);
	let active = true;
	const pending = (membership) => read.pending.size > 0 || [...pendingSessionEntryPublications.get(key) ?? []].some((publication) => !publication.settled && (!publication.superseded.has(params.sessionKey) || membership && publication.membershipInvalidated.has(params.sessionKey)));
	return {
		initialize: (snapshot) => {
			const acquisition = read.acquisition;
			if (!active || !acquisition) throw new Error("Session sharing acquisition is no longer current");
			read.facts = reconcileSessionSharingAcquisition(acquisition, snapshot);
			read.acquisition = void 0;
		},
		readGeneration: () => active && !pending(false) ? read.generation?.current : void 0,
		readCurrent: () => pending(true) ? void 0 : read.facts,
		release: () => {
			if (!active) return;
			active = false;
			read.facts = void 0;
			read.acquisition = void 0;
			reads.delete(read);
			if (reads.size === 0 && preparedSharingReads.get(key) === reads) preparedSharingReads.delete(key);
		}
	};
}
/** Generation custody shares the entry publication owner, independently of membership. */
function retainPreparedSessionGenerationFacts(params) {
	const retained = retainPreparedSessionSharingFacts({
		...params,
		membership: /* @__PURE__ */ new Set(),
		generation: {
			current: params.entry ?? null,
			initiallyAbsent: params.entry ? void 0 : true
		}
	});
	return {
		readCurrent: retained.readGeneration,
		release: retained.release
	};
}
function retainedSharingReads(database, sessionKey) {
	const identity = findOpenClawAgentDatabaseIdentity(database)?.identity;
	return typeof identity === "string" ? preparedSharingReads.get(`file:${identity}\0${sessionKey}`) : void 0;
}
const incognitoSharingEntries = resolveGlobalSingleton(Symbol.for("openclaw.incognitoSessionSharingEntries"), () => /* @__PURE__ */ new WeakMap());
function incognitoSharingState(database) {
	let state = incognitoSharingEntries.get(database);
	if (!state) {
		state = {
			entries: /* @__PURE__ */ new Map(),
			pending: /* @__PURE__ */ new Map()
		};
		incognitoSharingEntries.set(database, state);
	}
	return state;
}
function stageIncognitoSharingPublication(database, sessionKey) {
	const state = incognitoSharingState(database);
	const token = {};
	const pending = state.pending.get(sessionKey) ?? /* @__PURE__ */ new Set();
	state.pending.set(sessionKey, pending);
	pending.add(token);
	return () => {
		pending.delete(token);
		if (pending.size === 0) state.pending.delete(sessionKey);
	};
}
function stageSessionSharingPublication(database, sessionKey) {
	const releaseIncognito = !database.db.location() ? stageIncognitoSharingPublication(database.db, sessionKey) : void 0;
	const reads = [...retainedSharingReads(database, sessionKey) ?? []];
	const token = {};
	for (const read of reads) read.pending.add(token);
	return () => {
		releaseIncognito?.();
		for (const read of reads) read.pending.delete(token);
	};
}
function readCommittedIncognitoSessionSharing(database, sessionKey) {
	const state = incognitoSharingEntries.get(database);
	if (state?.pending.has(sessionKey)) throw new Error("Incognito session sharing publication is pending");
	const current = state?.entries.get(sessionKey);
	if (current === null) throw new Error("Incognito session sharing projection is unavailable");
	return current;
}
function publishSessionSharingFieldChange(database, sessionKey, change) {
	publishTrackedCacheUpdate(database, () => {
		for (const read of retainedSharingReads(database, sessionKey) ?? []) if (read.acquisition) {
			if (change.kind === "member") recordAcquiringSessionMember(read.acquisition, change);
			else recordAcquiringSessionEntry(read.acquisition, void 0, void 0);
		} else if (read.facts) read.facts = updateSessionSharingField(read.facts, change);
		const entries = incognitoSharingEntries.get(database.db)?.entries;
		const current = entries?.get(sessionKey);
		if (current) entries?.set(sessionKey, updateSessionSharingField(current, change));
	}, () => stageSessionSharingPublication(database, sessionKey));
}
function publishSessionSharingMemberChange(database, sessionKey, member, agentId = database.agentId) {
	publishSessionSharingFieldChange(database, sessionKey, member);
	emitPreparedSessionSharingChange(database, sessionKey, agentId, member);
}
/** Publish sharing state before the listing projection and its public change event. */
function publishSessionSharingEntryChange(database, update) {
	const facts = update.facts;
	if (facts?.kind === "owner") {
		publishSessionSharingFieldChange(database, update.sessionKey, facts);
		return;
	}
	const sharingUnchanged = facts?.kind === "unchanged" || facts?.kind === "participants" || facts?.kind === "category";
	const incognito = !database.db.location();
	const sharingEntry = update.entry ? projectSessionSharingEntry(update.entry) : void 0;
	const previousIdentity = update.previousEntry && {
		sessionId: update.previousEntry.sessionId,
		lifecycleRevision: update.previousEntry.lifecycleRevision
	};
	if (!sharingUnchanged) publishTrackedCacheUpdate(database, () => {
		recordCommittedSessionEntryPublication(database, update.sessionKey, sharingEntry);
		for (const read of retainedSharingReads(database, update.sessionKey) ?? []) {
			recordAcquiringSessionEntry(read.acquisition, sharingEntry, previousIdentity);
			publishRetainedSessionGeneration(read, sharingEntry, sharingEntry !== void 0 || facts?.kind === "removed");
			const previous = read.facts;
			read.facts = sharingEntry && previous?.entry && previous.entry.sessionId === sharingEntry.sessionId && previous.entry.lifecycleRevision === sharingEntry.lifecycleRevision ? {
				entry: sharingEntry,
				membership: previous.membership
			} : void 0;
		}
	}, !incognito ? () => stageSessionSharingPublication(database, update.sessionKey) : void 0);
	if (incognito && !sharingUnchanged) {
		let current;
		try {
			const entry = update.entry ?? readExactSessionEntryRow(database, update.sessionKey, "list")?.entry;
			current = entry ? {
				entry: projectSessionSharingEntry(entry),
				membership: new Set(listSessionMembersInDatabase(database, update.sessionKey).map((member) => member.identityId))
			} : void 0;
		} catch {
			current = null;
		}
		const state = incognitoSharingState(database.db);
		publishTrackedCacheUpdate(database, () => {
			if (current !== void 0) state.entries.set(update.sessionKey, current);
			else state.entries.delete(update.sessionKey);
		}, () => stageIncognitoSharingPublication(database.db, update.sessionKey));
	}
}
/** Final-grant custody fences old facts until native settlement, independently of result delivery. */
function retainSessionEntryWorkerPublication(params) {
	const creation = preparedSharingChanges.current.getStore();
	const owner = {
		superseded: /* @__PURE__ */ new Map(),
		membershipInvalidated: /* @__PURE__ */ new Set(),
		settled: false
	};
	let keys = [];
	const identityKey = `file:${params.databaseIdentity}`;
	let pending = false;
	return {
		begin(sessionKeys, membershipInvalidatedKeys) {
			if (pending) return;
			keys = [...new Set(sessionKeys)];
			owner.membershipInvalidated = new Set(membershipInvalidatedKeys);
			pending = true;
			for (const sessionKey of keys) {
				const key = `${identityKey}\0${sessionKey}`;
				const owners = pendingSessionEntryPublications.get(key) ?? /* @__PURE__ */ new Set();
				owners.add(owner);
				pendingSessionEntryPublications.set(key, owners);
			}
		},
		settle(receipt, unknown) {
			if (!pending) return;
			const replacement = receipt?.kind === "session-entry-replacements" ? receipt : void 0;
			const initialization = receipt?.kind === "session-transcript-initialized" ? receipt : void 0;
			const current = (sessionKey) => !owner.superseded.has(sessionKey);
			const currentIdentity = (sessionKey) => {
				if (current(sessionKey)) return true;
				const native = owner.superseded.get(sessionKey);
				const committed = replacement?.current.get(sessionKey);
				return native !== void 0 && committed !== void 0 && native.sessionId === committed.sessionId && native.lifecycleRevision === committed.lifecycleRevision;
			};
			const membershipInvalidated = new Set(replacement ? replacement.membershipInvalidatedKeys.filter(currentIdentity) : unknown ? owner.membershipInvalidated : []);
			const changed = [.../* @__PURE__ */ new Set([...(replacement?.changedKeys ?? (initialization?.placeholder ? [initialization.sessionKey] : unknown ? keys : [])).filter(current), ...membershipInvalidated])];
			if (changed.length) {
				invalidateOpenClawAgentWritableProjections(params.databaseIdentity, (database) => sessionEntryCaches.delete(database));
				invalidateOpenClawAgentReadOnlyProjections(params.databaseIdentity, (database) => sessionEntryCaches.delete(database));
			}
			const changes = [];
			for (const sessionKey of changed) {
				const sharingEntry = replacement?.current.get(sessionKey);
				const placeholder = initialization?.sessionKey === sessionKey ? initialization.placeholder : void 0;
				const creationSource = creation?.source;
				const ownsCreation = creation?.active && creationSource?.kind === "file" && creationSource.databaseIdentity === params.databaseIdentity && creationSource.agentId === params.agentId && creation.sessionKey === sessionKey;
				for (const read of preparedSharingReads.get(`${identityKey}\0${sessionKey}`) ?? []) {
					recordAcquiringSessionEntry(read.acquisition, !unknown && !membershipInvalidated.has(sessionKey) ? sharingEntry : void 0, replacement?.previous.get(sessionKey));
					publishRetainedSessionGeneration(read, sharingEntry, replacement !== void 0 || placeholder !== void 0);
					const previous = read.facts;
					read.facts = placeholder ? {
						entry: void 0,
						placeholder,
						membership: /* @__PURE__ */ new Set()
					} : !membershipInvalidated.has(sessionKey) && sharingEntry && previous?.entry && previous.entry.sessionId === sharingEntry.sessionId && previous.entry.lifecycleRevision === sharingEntry.lifecycleRevision ? {
						entry: sharingEntry,
						membership: previous.membership
					} : void 0;
				}
				const change = {
					agentId: params.agentId,
					storePath: ownsCreation ? creationSource.path : params.storePath,
					sessionKey,
					factsInvalidated: true,
					...receipt && !unknown ? { scope: "session-entry" } : {}
				};
				if (receipt) preparedSharingChanges.changes.set(change, !unknown && placeholder && ownsCreation ? {
					creation,
					databaseIdentity: params.databaseIdentity,
					sessionKey,
					placeholder,
					committed: true
				} : void 0);
				changes.push(change);
			}
			owner.settled = true;
			try {
				sessionChanges.emitBatch(changes);
				return replacement ? {
					previous: new Map([...replacement.previous].filter(([key]) => currentIdentity(key))),
					current: new Map([...replacement.current].filter(([key]) => currentIdentity(key)))
				} : void 0;
			} finally {
				for (const sessionKey of keys) {
					const key = `${identityKey}\0${sessionKey}`;
					const owners = pendingSessionEntryPublications.get(key);
					owners?.delete(owner);
					if (owners?.size === 0) pendingSessionEntryPublications.delete(key);
				}
				pending = false;
			}
		}
	};
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-entry-cache.ts
/** Commit-driven projections borrow owner memory; ordinary reads still validate SQLite. */
function readCommittedSessionEntryCache(database) {
	return sessionEntryCaches.get(database)?.entries;
}
/** A settled worker with an unknown write outcome cannot publish a trustworthy field patch. */
function discardCommittedSessionEntryCache(database) {
	sessionEntryCaches.delete(database);
}
/** Reuse only complete, current metadata; exact reads still own misses and invalid rows. */
function readCachedExactSessionEntries(database, sessionKeys, clone) {
	const cached = sessionEntryCaches.get(database.db);
	if (!cached || database.db.isTransaction) return;
	const keys = [...new Set(sessionKeys.map(toUSVString))];
	if (keys.some((key) => !cached.entries.has(key))) return;
	const validityToken = cached.validityToken;
	try {
		if (!cacheValidityTokensEqual(validityToken, readSessionEntryCacheValidityToken(database.db))) return;
		const rows = executeSqliteQuerySync(database.db, getNodeSqliteKysely(database.db).selectFrom("session_nodes").select([
			"session_key",
			"current_session_id",
			"updated_at"
		]).where("session_key", "in", sqliteStringSet(keys))).rows;
		if (rows.length !== keys.length) return;
		const rowsByKey = new Map(rows.map((row) => [row.session_key, row]));
		const entries = /* @__PURE__ */ new Map();
		for (const sessionKey of new Set(sessionKeys)) {
			const key = toUSVString(sessionKey);
			const row = rowsByKey.get(key);
			const entry = cached.entries.get(key);
			if (!row || !entry || entry.sessionId !== row.current_session_id || entry.updatedAt !== row.updated_at) return;
			entries.set(sessionKey, validateDeliveryCanonicalSessionEntry(key, clone ? structuredClone(entry) : entry));
		}
		return sessionEntryCaches.get(database.db) === cached && cacheValidityTokensEqual(validityToken, readSessionEntryCacheValidityToken(database.db)) ? entries : void 0;
	} catch {
		sessionEntryCaches.delete(database.db);
		return;
	}
}
/** Decode one admitted physical store without changing exact per-request error isolation. */
function readExactSessionEntryCandidatesInDatabase(database, requests, projection, options = {}) {
	const entries = /* @__PURE__ */ new Map();
	const keys = [...new Set(requests.flat())];
	const cachedEntries = projection === "list" ? readCachedExactSessionEntries(database, keys, options.clone !== false) : void 0;
	let readPrepared;
	if (cachedEntries) readPrepared = (sessionKey) => cachedEntries.get(sessionKey);
	else {
		const readRows = prepareExactSessionEntryRowReads(database, keys, projection);
		readPrepared = (sessionKey) => readRows(sessionKey)?.entry;
	}
	const readEntry = (sessionKey) => {
		const cached = entries.get(sessionKey);
		if (cached) return cached;
		let result;
		try {
			const entry = readOpenClawAgentDatabase(database, () => readPrepared(sessionKey)).value;
			result = ok(entry ? {
				sessionKey,
				entry
			} : void 0);
		} catch (error) {
			result = err(error);
		}
		entries.set(sessionKey, result);
		return result;
	};
	return requests.map((sessionKeys) => {
		const matches = [];
		for (const sessionKey of sessionKeys) {
			const entry = readEntry(sessionKey);
			if (!entry.ok) return err(entry.error);
			if (entry.value) matches.push(entry.value);
		}
		return ok(matches);
	});
}
/** Bracket one accessor-owned row write so its publication cannot hide earlier raw DML. */
function trackSessionEntryCacheWrite(database, write) {
	const before = sessionEntryCaches.has(database.db) && getAdmittedSqliteSchemaFacts(database.db) ? readSessionNodesGeneration(database.db) : void 0;
	write();
	if (before === void 0 || !getAdmittedSqliteSchemaFacts(database.db)) {
		sessionEntryCaches.delete(database.db);
		return;
	}
	return {
		before,
		after: readSessionNodesGeneration(database.db)
	};
}
function readSessionEntryCache(database, options) {
	return runSqliteReadOperationSync(database.db, () => {
		const projection = options.retainFullEntry ? "full" : options.projection;
		const prepared = assertCanonicalSqliteSessionKeysCurrent(database, projection !== "full");
		if (!options.cache || options.deferParticipants || options.retainFullEntry || options.latest || projection === "full" || database.db.isTransaction || !getAdmittedSqliteSchemaFacts(database.db)) return loadSessionEntrySnapshot(database, projection, prepared, options.retainFullEntry, options.deferParticipants);
		const validityToken = readSessionEntryCacheValidityToken(database.db, "cached");
		const cached = sessionEntryCaches.get(database.db);
		if (cached && cacheValidityTokensEqual(cached.validityToken, validityToken)) return cached;
		const loaded = loadSessionEntrySnapshot(database, options.projection, prepared);
		for (const entry of loaded.entries.values()) freezeJsonSnapshot(entry);
		const next = {
			...loaded,
			validityToken
		};
		sessionEntryCaches.set(database.db, next);
		return next;
	});
}
function advanceSessionEntryCacheGeneration(cached, writeGeneration) {
	if (cached.validityToken.sessionNodesGeneration === writeGeneration.before) cached.validityToken = {
		...cached.validityToken,
		sessionNodesGeneration: writeGeneration.after
	};
}
function publishSqliteSessionEntryCacheUpsert(database, update, writeGeneration) {
	const owner = sessionEntryCaches.get(database.db);
	if (!owner) return;
	const { sessionKey } = update;
	let sideMetadata;
	let entry;
	try {
		const retained = update.entry && owner.validityToken.sessionNodesGeneration === writeGeneration.before && owner.validityToken.dataVersion === readSqliteDataVersion(database.db) ? owner.entries.get(sessionKey) : void 0;
		sideMetadata = readSessionEntrySideMetadata(database, sessionKey, retained ? {
			participants: retained.participants,
			participantCount: retained.participantCount
		} : void 0);
		entry = update.entry ? projectSessionEntryCacheUpdate(update.entryJson, sideMetadata) : void 0;
	} catch {
		publishTrackedCacheUpdate(database, () => sessionEntryCaches.delete(database.db));
		return;
	}
	publishTrackedCacheUpdate(database, () => {
		const cached = sessionEntryCaches.get(database.db);
		if (!cached) return;
		let publishedEntry = entry;
		const currentEntry = cached.entries.get(sessionKey);
		if (!update.entry && currentEntry && sideMetadata) {
			const { owner: _owner, participants: _participants, participantCount: _count, ...metadata } = currentEntry;
			publishedEntry = freezeJsonSnapshot({
				...metadata,
				...sideMetadata
			});
		}
		if (!publishedEntry) {
			sessionEntryCaches.delete(database.db);
			return;
		}
		if (!cached.entries.has(sessionKey) && !cached.keys.includes(sessionKey)) cached.keys = [...cached.keys, sessionKey].toSorted();
		cached.entries.set(sessionKey, publishedEntry);
		advanceSessionEntryCacheGeneration(cached, writeGeneration);
	});
	return sideMetadata;
}
function publishSessionEntryCacheInvalidation(database, update, writeGeneration) {
	let facts = update.facts;
	publishSessionSharingEntryChange(database, update);
	if (writeGeneration) {
		const metadata = publishSqliteSessionEntryCacheUpsert(database, update, writeGeneration);
		if (facts?.kind === "participants" && metadata) facts = {
			kind: "participants",
			projection: {
				participants: metadata.participants,
				participantCount: metadata.participantCount
			}
		};
	} else publishTrackedCacheUpdate(database, () => sessionEntryCaches.delete(database.db));
	emitPreparedSessionSharingChange(database, update.sessionKey, database.agentId, facts);
}
/** The category worker publishes only its changed field; native freshness tokens still expose other commits. */
function publishSessionEntryCacheCategoryUpdate(database, rows, category) {
	publishTrackedCacheUpdate(database, () => {
		const cached = sessionEntryCaches.get(database.db);
		for (const { sessionKey, sessionId } of rows) {
			const current = cached?.entries.get(sessionKey);
			if (!current || current.sessionId !== sessionId) continue;
			const next = { ...current };
			if (category === void 0) delete next.category;
			else next.category = category;
			cached?.entries.set(sessionKey, freezeJsonSnapshot(next));
		}
	});
}
/** Refresh participant projections without reloading unchanged session-entry JSON. */
function publishSessionEntryCacheParticipantUpdate(database, sessionKey, params) {
	const { writeGeneration, projectionChanged } = params;
	if (!projectionChanged) {
		if (writeGeneration) publishTrackedCacheUpdate(database, () => {
			const cached = sessionEntryCaches.get(database.db);
			if (cached) advanceSessionEntryCacheGeneration(cached, writeGeneration);
		});
		return;
	}
	let facts = { kind: "participants" };
	if (!writeGeneration) try {
		facts = {
			kind: "participants",
			projection: readSqliteSessionParticipantProjection(database.db, sessionKey)
		};
	} catch {}
	publishSessionEntryCacheInvalidation(database, {
		sessionKey,
		facts
	}, writeGeneration);
}
//#endregion
export { retainSessionEntryWorkerPublication as _, readCommittedSessionEntryCache as a, projectSessionSharingEntry as b, trackSessionEntryCacheWrite as c, publishSessionEntryPlaceholderInsertion as d, publishSessionSharingMemberChange as f, retainPreparedSessionSharingFacts as g, retainPreparedSessionGenerationFacts as h, publishSessionEntryCacheParticipantUpdate as i, assertSessionEntryCreationPublication as l, readSessionEntryCreationTransition as m, publishSessionEntryCacheCategoryUpdate as n, readExactSessionEntryCandidatesInDatabase as o, readCommittedIncognitoSessionSharing as p, publishSessionEntryCacheInvalidation as r, readSessionEntryCache as s, discardCommittedSessionEntryCache as t, isPreparedSessionSharingChange as u, runWithSessionEntryCreationPublication as v, withSessionEntryCreationPublication as y };
