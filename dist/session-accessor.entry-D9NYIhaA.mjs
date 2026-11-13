import { y as uniqueStrings } from "./string-normalization-YMwDjufr.mjs";
import { a as iterateSqliteQuerySync, l as sqliteStringSet, n as executeSqliteQuerySync } from "./kysely-sync-Y4_ti-rQ.mjs";
import { a as withSqlitePostCommitPublications } from "./sqlite-post-commit-Dih1WMKX.mjs";
import { r as runSqliteDeferredTransactionSync } from "./sqlite-transaction-2VkikDo-.mjs";
import { r as isIncognitoSessionKey } from "./session-key-DDIJxXfQ.mjs";
import { A as parseAgentSessionKey, O as normalizeSessionKeyPreservingOpaquePeerIds, _ as toAgentStoreSessionKey, l as resolveAgentIdFromSessionKey } from "./session-key-BC4m_Ly5.mjs";
import { s as resolveIncognitoOpenClawAgentSqlitePath } from "./openclaw-agent-db.paths-Dv3PPTNK.mjs";
import { l as resolveSessionStorePathCore } from "./paths-CQ3zRaeb.mjs";
import { a as normalizeOptionalAgentRuntimeId } from "./agent-runtime-id-D1H9nIYN.mjs";
import "./openclaw-agent-db-CZUYuo7P.mjs";
import { r as sessionEntrySnapshotColumns } from "./session-entry-snapshots-CHPWIM1D.mjs";
import { r as resolveAgentMainSessionKey } from "./main-session-BFJFO581.mjs";
import { t as normalizeSessionEntrySlotKey } from "./session-entry-slot-keys-CUiZdkL7.mjs";
import { n as withOpenClawAgentDatabaseReadOnly } from "./openclaw-agent-db-readonly-CkWWSfuG.mjs";
import { a as normalizeStoreSessionKey, o as resolveDeliveryProvenCanonicalSessionKey } from "./store-entry-CBksE8pX.mjs";
import { _ as toDatabaseOptions, i as getSessionKysely, l as resolveSqliteScope } from "./session-accessor.sqlite-scope-AxUEwRt8.mjs";
import { m as projectSqliteSessionParticipantsBatch } from "./session-accessor.sqlite-entry-read-oKmXbFma.mjs";
import { g as canonicalSessionKeyMigrationRequiredError, r as assertCanonicalSqliteSessionKeysCurrent } from "./session-canonical-key-Cjd4Pn_g.mjs";
import { r as parseSessionEntryJson } from "./session-accessor.sqlite-status-CbDRSABL.mjs";
import { t as isInternalSessionEffectsKey } from "./internal-session-key-BOMXCQVf.mjs";
import { t as listSessionEntriesReadOnly } from "./session-accessor.sqlite-entry-list.read-6sJ8GFrX.mjs";
import { a as resolveAllAgentSessionStoreTargetsSync } from "./targets-CxfGP2B4.mjs";
import { D as retainSessionEntryKeyAbsence, E as resolveSessionEntry, S as loadExactSessionEntryReadOnly, v as loadExactSessionEntry, y as loadExactSessionEntryCandidates } from "./session-accessor.sqlite-pending-inputs-BdT_Tg9N.mjs";
import { a as listSessionEntryRows, d as patchSessionEntryTarget, u as patchSessionEntryCore } from "./session-accessor.sqlite-entry-C87Sde4p.mjs";
import { r as resolveSessionStoreIdentity } from "./session-store-key-__CfQfd2.mjs";
import "./session-accessor.sqlite-canonical-repair-DfjyvxZp.mjs";
import { isDeepStrictEqual } from "node:util";
//#region src/config/sessions/plugin-host-cleanup.ts
function collectStoredSessionEntrySlotKeys(entry, pluginId) {
	const slotKeys = /* @__PURE__ */ new Set();
	const storedSlotKeys = entry.pluginExtensionSlotKeys;
	if (!storedSlotKeys) return slotKeys;
	const records = pluginId === void 0 ? Object.values(storedSlotKeys) : storedSlotKeys[pluginId] ? [storedSlotKeys[pluginId]] : [];
	for (const record of records) for (const slotKey of Object.values(record)) {
		const normalized = normalizeSessionEntrySlotKey(slotKey);
		if (normalized.ok) slotKeys.add(normalized.key);
	}
	return slotKeys;
}
function collectPromotedSessionEntrySlotKeys(entry, pluginId, sessionEntrySlotKeys) {
	const slotKeys = collectStoredSessionEntrySlotKeys(entry, pluginId);
	for (const slotKey of sessionEntrySlotKeys ?? []) slotKeys.add(slotKey);
	return slotKeys;
}
function clearPromotedSessionEntrySlots(entry, pluginId, sessionEntrySlotKeys, options = {}) {
	const slotKeys = options.includeStoredSlotKeys === false && sessionEntrySlotKeys ? new Set(sessionEntrySlotKeys) : collectPromotedSessionEntrySlotKeys(entry, pluginId, sessionEntrySlotKeys);
	for (const slotKey of slotKeys) Reflect.deleteProperty(entry, slotKey);
	if (!options.pruneSlotOwnership || !entry.pluginExtensionSlotKeys) return;
	const pruneRecord = (record) => {
		for (const [namespace, slotKey] of Object.entries(record)) {
			const normalized = normalizeSessionEntrySlotKey(slotKey);
			if (normalized.ok && slotKeys.has(normalized.key)) delete record[namespace];
		}
	};
	if (pluginId) {
		const record = entry.pluginExtensionSlotKeys[pluginId];
		if (record) {
			pruneRecord(record);
			if (Object.keys(record).length === 0) delete entry.pluginExtensionSlotKeys[pluginId];
		}
	} else {
		for (const record of Object.values(entry.pluginExtensionSlotKeys)) pruneRecord(record);
		for (const [ownerPluginId, record] of Object.entries(entry.pluginExtensionSlotKeys)) if (Object.keys(record).length === 0) delete entry.pluginExtensionSlotKeys[ownerPluginId];
	}
	if (Object.keys(entry.pluginExtensionSlotKeys).length === 0) delete entry.pluginExtensionSlotKeys;
}
/** Clears plugin-owned extension state from one session entry. */
function clearPluginOwnedSessionState(entry, pluginId, sessionEntrySlotKeys) {
	clearPromotedSessionEntrySlots(entry, pluginId, sessionEntrySlotKeys);
	for (const field of [
		"pluginExtensions",
		"pluginExtensionSlotKeys",
		"pluginNextTurnInjections"
	]) {
		const state = entry[field];
		if (!pluginId) delete entry[field];
		else if (state) {
			delete state[pluginId];
			if (Object.keys(state).length === 0) delete entry[field];
		}
	}
}
function hasPromotedSessionEntrySlot(entry, pluginId, sessionEntrySlotKeys) {
	const slotKeys = collectPromotedSessionEntrySlotKeys(entry, pluginId, sessionEntrySlotKeys);
	for (const slotKey of slotKeys) if (Object.hasOwn(entry, slotKey)) return true;
	return false;
}
function hasPluginOwnedSessionState(entry, pluginId, sessionEntrySlotKeys) {
	if (hasPromotedSessionEntrySlot(entry, pluginId, sessionEntrySlotKeys)) return true;
	if (!pluginId) return Boolean(entry.pluginExtensions || entry.pluginExtensionSlotKeys || entry.pluginNextTurnInjections);
	return Boolean(entry.pluginExtensions?.[pluginId] || entry.pluginExtensionSlotKeys?.[pluginId] || entry.pluginNextTurnInjections?.[pluginId]);
}
function matchesPluginHostCleanupSession(entryKey, entry, sessionKey) {
	const normalizedSessionKey = normalizeSessionKeyPreservingOpaquePeerIds(sessionKey);
	if (!normalizedSessionKey) return true;
	return normalizeSessionKeyPreservingOpaquePeerIds(entryKey) === normalizedSessionKey || entry.sessionId.trim().toLowerCase() === sessionKey?.trim().toLowerCase();
}
function shouldSkipPluginHostCleanupStore(params) {
	if (!params.pluginId && !params.sessionKey) return true;
	return params.mode === "promoted-slots" && (params.sessionEntrySlotKeys?.size ?? 0) === 0;
}
function hasPluginHostCleanupTarget(entry, params) {
	if (params.mode === "promoted-slots") return hasPromotedSessionEntrySlot(entry, params.pluginId, params.sessionEntrySlotKeys);
	return hasPluginOwnedSessionState(entry, params.pluginId, params.sessionEntrySlotKeys);
}
function isLockedHarnessSessionOwnedByPlugin(entry, preserveLockedHarnessIds) {
	if (entry.modelSelectionLocked !== true || !preserveLockedHarnessIds?.size) return false;
	const harnessId = normalizeOptionalAgentRuntimeId(entry.agentHarnessId);
	return harnessId !== void 0 && preserveLockedHarnessIds.has(harnessId);
}
function clearPluginHostCleanupTarget(entry, params) {
	if (params.mode === "promoted-slots") {
		clearPromotedSessionEntrySlots(entry, params.pluginId, params.sessionEntrySlotKeys, {
			includeStoredSlotKeys: false,
			pruneSlotOwnership: true
		});
		return;
	}
	clearPluginOwnedSessionState(entry, params.pluginId, params.sessionEntrySlotKeys);
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-summary.ts
/** Reads counts and bounded recent session payloads without warming the store cache. */
function readSessionStoreSummaryReadOnly(scope, options) {
	const resolved = resolveSqliteScope({
		...scope,
		sessionKey: ""
	});
	const summary = {
		count: 0,
		recent: [],
		byAgent: new Map(options.agentIds.map((agentId) => [agentId, {
			count: 0,
			recent: []
		}]))
	};
	const result = withOpenClawAgentDatabaseReadOnly((database) => withSqlitePostCommitPublications(database.db, () => runSqliteDeferredTransactionSync(database.db, () => {
		assertCanonicalSqliteSessionKeysCurrent(database);
		const db = getSessionKysely(database.db);
		const batchSize = Math.min(128, Math.max(1, Math.ceil(options.recentLimit) || 1) * Math.max(1, summary.byAgent.size));
		let candidates = [];
		const readCandidates = () => {
			if (candidates.length === 0) return;
			const rows = candidates;
			candidates = [];
			const storedRows = new Map(executeSqliteQuerySync(database.db, db.selectFrom("session_nodes").selectAll().select(sessionEntrySnapshotColumns).where("session_key", "in", sqliteStringSet(rows.map((row) => row.sessionKey)))).rows.map((row) => [row.session_key, row]));
			const selectedEntries = [];
			for (const { sessionKey, entryValid, agent } of rows) {
				const needsRecent = summary.recent.length < options.recentLimit || agent !== void 0 && agent.recent.length < options.recentLimit;
				if (entryValid === 1 && !needsRecent) {
					summary.count += 1;
					if (agent) agent.count += 1;
					continue;
				}
				const stored = storedRows.get(sessionKey);
				if (!stored) continue;
				const { current_session_id: _currentSessionId, ...listRow } = stored;
				const entry = parseSessionEntryJson(listRow);
				if (!entry) continue;
				summary.count += 1;
				const selected = {
					sessionKey,
					entry
				};
				selectedEntries.push(selected);
				if (summary.recent.length < options.recentLimit) summary.recent.push(selected);
				if (agent) {
					agent.count += 1;
					if (agent.recent.length < options.recentLimit) agent.recent.push(selected);
				}
			}
			if (selectedEntries.length === 0) return;
			const projected = projectSqliteSessionParticipantsBatch(database.db, new Map(selectedEntries.map(({ sessionKey, entry }) => [sessionKey, entry])));
			for (const { sessionKey, entry } of selectedEntries) {
				Object.assign(entry, projected.get(sessionKey));
				const deliveryCanonicalKey = resolveDeliveryProvenCanonicalSessionKey(sessionKey, entry);
				if (deliveryCanonicalKey !== sessionKey) throw canonicalSessionKeyMigrationRequiredError(`non-canonical persisted row resolves to session key ${deliveryCanonicalKey}`);
			}
		};
		for (const row of iterateSqliteQuerySync(database.db, db.selectFrom("session_nodes").select(["session_key", "entry_valid"]).orderBy("updated_at", "desc").orderBy("session_key", "asc"))) {
			const owner = parseAgentSessionKey(row.session_key)?.agentId;
			if (!owner || isInternalSessionEffectsKey(row.session_key)) continue;
			const agent = summary.byAgent.get(owner);
			if (row.entry_valid === 1 && summary.recent.length >= options.recentLimit && (!agent || agent.recent.length >= options.recentLimit)) {
				summary.count += 1;
				if (agent) agent.count += 1;
				continue;
			}
			candidates.push({
				sessionKey: row.session_key,
				entryValid: row.entry_valid,
				agent
			});
			if (candidates.length >= batchSize) readCandidates();
		}
		readCandidates();
		return summary;
	})), toDatabaseOptions(resolved));
	return result.found ? result.value : summary;
}
//#endregion
//#region src/config/sessions/session-accessor.entry.ts
function resolveLogicalSessionStoreCandidates(params) {
	const storeConfig = params.cfg.session?.store;
	const defaultTarget = {
		agentId: params.agentId,
		storePath: resolveSessionStorePathCore(storeConfig, {
			agentId: params.agentId,
			env: params.env
		})
	};
	if (typeof storeConfig !== "string" || !storeConfig.includes("{agentId}")) return [defaultTarget];
	const targets = /* @__PURE__ */ new Map();
	targets.set(defaultTarget.storePath, defaultTarget);
	for (const target of resolveAllAgentSessionStoreTargetsSync(params.cfg, { env: params.env })) if (target.agentId === params.agentId) targets.set(target.storePath, target);
	return [...targets.values()];
}
function buildLogicalSessionEntryCandidateKeys(params) {
	const targets = /* @__PURE__ */ new Set();
	if (params.canonicalKey) targets.add(params.canonicalKey);
	if (params.requestedKey && params.requestedKey !== params.canonicalKey) targets.add(params.requestedKey);
	if (params.canonicalKey === "global" || params.canonicalKey === "unknown") return [...targets];
	const agentMainKey = resolveAgentMainSessionKey({
		cfg: params.cfg,
		agentId: params.agentId
	});
	if (params.canonicalKey === agentMainKey) targets.add(`agent:${params.agentId}:main`);
	return [...targets];
}
function findCanonicalSessionEntryMatch(scope, canonicalKey, candidateKeys, options = {}) {
	let selected;
	let readSource;
	for (const match of loadExactSessionEntryCandidates({
		...scope,
		sessionKeys: candidateKeys,
		readOnly: options.readOnly !== false,
		onReadSource: (source, physical) => {
			readSource = physical ? {
				...source,
				databaseIdentity: physical.identity,
				databaseBirthtime: physical.birthtime
			} : void 0;
		}
	})) {
		if (selected) throw canonicalSessionKeyMigrationRequiredError(`duplicate rows resolve to canonical session key ${canonicalKey}`);
		if (match.sessionKey !== canonicalKey) throw canonicalSessionKeyMigrationRequiredError(`non-canonical persisted row resolves to session key ${canonicalKey}`);
		selected = match;
	}
	return selected ? {
		...selected,
		readSource
	} : void 0;
}
function resolveSessionEntryAccessTarget(scope, options) {
	const target = resolveSessionEntryStoreTarget(scope);
	if (options?.keyFormat === "agent-qualified") return projectQualifiedSessionEntryTarget(scope, target);
	return {
		agentId: target.agentId,
		canonicalKey: target.canonicalKey,
		entry: target.entry,
		requestedKey: target.requestedKey,
		storeKey: target.storeKey
	};
}
/** Resolves ordered candidate keys inside one agent-owned session store. */
function resolveSessionEntryCandidateTarget(scope) {
	const candidateKeys = uniqueStrings(scope.candidateKeys.map((key) => key.trim()));
	const incognitoKey = candidateKeys.find(isIncognitoSessionKey);
	const incognitoAgentId = incognitoKey ? resolveAgentIdFromSessionKey(incognitoKey) : void 0;
	const storePath = incognitoAgentId ? resolveIncognitoOpenClawAgentSqlitePath({
		agentId: incognitoAgentId,
		env: scope.env
	}) : resolveSessionStorePathCore(scope.cfg.session?.store, {
		agentId: scope.agentId,
		env: scope.env
	});
	const resolvedAgentId = incognitoAgentId ?? scope.agentId;
	for (const candidateKey of candidateKeys) {
		if (!candidateKey) continue;
		const resolved = resolveSessionEntry({
			agentId: resolvedAgentId,
			...scope.env ? { env: scope.env } : {},
			sessionKey: candidateKey,
			storePath
		}, { readOnly: !incognitoAgentId });
		if (!resolved.existing) continue;
		return {
			agentId: resolvedAgentId,
			candidateKey,
			entry: resolved.existing,
			persisted: true,
			sessionKey: resolved.normalizedKey
		};
	}
	const fallbackKey = scope.fallback?.sessionKey.trim();
	if (!fallbackKey || !scope.fallback) return null;
	return {
		agentId: resolvedAgentId,
		candidateKey: fallbackKey,
		entry: structuredClone(scope.fallback.entry),
		persisted: false,
		sessionKey: fallbackKey
	};
}
function resolveSessionEntryStoreTarget(scope) {
	const requestedKey = scope.sessionKey.trim();
	const { agentId, canonicalKey } = resolveSessionStoreIdentity({
		cfg: scope.cfg,
		sessionKey: requestedKey,
		agentId: scope.agentId
	});
	const scanTargets = buildLogicalSessionEntryCandidateKeys({
		agentId,
		canonicalKey,
		cfg: scope.cfg,
		requestedKey
	});
	if (isIncognitoSessionKey(canonicalKey)) {
		const incognitoAgentId = resolveAgentIdFromSessionKey(canonicalKey);
		const storePath = resolveIncognitoOpenClawAgentSqlitePath({
			agentId: incognitoAgentId,
			env: scope.env
		});
		const selectedMatch = findCanonicalSessionEntryMatch({
			agentId: incognitoAgentId,
			...scope.env ? { env: scope.env } : {},
			storePath
		}, canonicalKey, scanTargets, { readOnly: false });
		return {
			agentId: incognitoAgentId,
			canonicalKey,
			entry: selectedMatch?.entry,
			requestedKey,
			storeKey: selectedMatch?.sessionKey ?? canonicalKey,
			storePath,
			readSource: selectedMatch?.readSource
		};
	}
	const candidates = resolveLogicalSessionStoreCandidates({
		agentId,
		cfg: scope.cfg,
		env: scope.env
	});
	const fallback = candidates[0] ?? {
		agentId,
		storePath: resolveSessionStorePathCore(scope.cfg.session?.store, {
			agentId,
			env: scope.env
		})
	};
	let selectedStorePath = fallback.storePath;
	let selectedMatch = findCanonicalSessionEntryMatch({
		agentId,
		...scope.env ? { env: scope.env } : {},
		storePath: fallback.storePath
	}, canonicalKey, scanTargets);
	for (let index = 1; index < candidates.length; index += 1) {
		const candidate = candidates[index];
		if (!candidate) continue;
		const match = findCanonicalSessionEntryMatch({
			agentId,
			...scope.env ? { env: scope.env } : {},
			storePath: candidate.storePath
		}, canonicalKey, scanTargets);
		if (match && selectedMatch) throw canonicalSessionKeyMigrationRequiredError(`duplicate rows resolve to canonical session key ${canonicalKey}`);
		if (match) {
			selectedStorePath = candidate.storePath;
			selectedMatch = match;
		}
	}
	return {
		agentId,
		canonicalKey,
		entry: selectedMatch?.entry,
		requestedKey,
		storeKey: selectedMatch?.sessionKey ?? canonicalKey,
		storePath: selectedStorePath,
		readSource: selectedMatch?.readSource
	};
}
function projectQualifiedSessionEntryTarget(scope, target) {
	const prepared = prepareQualifiedSessionEntryTarget(target, void 0, scope.env);
	try {
		return prepared.target;
	} finally {
		prepared.release();
	}
}
function prepareQualifiedSessionEntryTarget(target, readSources = [], env) {
	if (target.entry && !target.readSource) throw new Error("Qualified session projection requires its captured physical source");
	const canonicalKey = toAgentStoreSessionKey({
		agentId: target.agentId,
		requestKey: target.storeKey
	});
	const parsed = parseAgentSessionKey(canonicalKey);
	const physicalKeys = (physicalAgentId) => {
		if (parsed?.rest !== "global" && parsed?.rest !== "unknown") return [canonicalKey];
		return physicalAgentId === target.agentId ? [parsed.rest, canonicalKey] : [canonicalKey];
	};
	const qualified = {
		keyFormat: "agent-qualified",
		agentId: target.agentId,
		canonicalKey,
		requestedKey: target.requestedKey,
		storeKey: target.storeKey,
		storeKeys: uniqueStrings([target.storeKey, ...physicalKeys(target.readSource?.agentId ?? target.agentId)]),
		storePath: target.readSource?.path ?? target.storePath,
		entry: target.entry,
		readSource: target.readSource
	};
	const sources = [];
	let active = true;
	const release = () => {
		active = false;
		const failures = [];
		for (let index = sources.length - 1; index >= 0; index--) try {
			sources[index].release();
			sources.splice(index, 1);
		} catch (error) {
			failures.push(error);
		}
		if (failures.length) throw new AggregateError(failures, "Qualified session sources could not be released");
	};
	try {
		const capturedSources = target.readSource ? [target.readSource, ...readSources.filter((source) => !isDeepStrictEqual(source, target.readSource))] : readSources;
		for (const readSource of capturedSources) {
			const selectedSource = readSource.agentId === target.readSource?.agentId && readSource.databaseIdentity === target.readSource.databaseIdentity && readSource.databaseBirthtime === target.readSource.databaseBirthtime;
			sources.push(retainSessionEntryKeyAbsence({
				source: readSource,
				canonicalKey,
				sessionKeys: physicalKeys(readSource.agentId).filter((key) => !selectedSource || key !== target.storeKey),
				env
			}));
		}
		return {
			target: qualified,
			assertCurrent: () => {
				if (!active) throw new Error("Qualified session target is no longer active");
				for (const source of sources) source.assertCurrent();
			},
			release
		};
	} catch (error) {
		release();
		throw error;
	}
}
/**
* Mutates the canonical logical session entry without exposing the
* backing store map to callers.
*/
async function updateResolvedSessionEntry(scope, update, options) {
	const captured = options?.target;
	const target = captured ?? resolveSessionEntryStoreTarget(scope);
	const source = captured?.readSource;
	if (!target.entry || captured && !source) return {
		canonicalKey: target.canonicalKey,
		found: false
	};
	if (captured) {
		const current = resolveSessionStoreIdentity({
			cfg: scope.cfg,
			sessionKey: scope.sessionKey,
			agentId: scope.agentId
		});
		if (scope.sessionKey.trim() !== captured.requestedKey || current.agentId !== captured.agentId || current.canonicalKey !== captured.storeKey) throw new Error("Captured session selector changed before update");
	}
	const expectedSessionId = target.entry.sessionId;
	const expectedLifecycleRevision = target.entry.lifecycleRevision;
	let updateResult;
	const apply = async (entry) => {
		if (captured && (entry.sessionId !== expectedSessionId || entry.lifecycleRevision !== expectedLifecycleRevision)) throw new Error("Captured session generation changed before update");
		updateResult = await update(entry, {
			agentId: target.agentId,
			canonicalKey: target.canonicalKey,
			entry,
			requestedKey: target.requestedKey,
			storeKey: target.storeKey
		});
		return entry;
	};
	const patchOptions = {
		replaceEntry: true,
		skipMaintenance: true
	};
	const updated = captured && source ? await patchSessionEntryTarget({
		agentId: captured.agentId,
		env: scope.env,
		storePath: source.path,
		readSource: source,
		target: {
			canonicalKey: captured.storeKey,
			storeKeys: [...captured.storeKeys]
		}
	}, apply, patchOptions) : await patchSessionEntryCore({
		agentId: target.agentId,
		sessionKey: target.storeKey,
		storePath: target.storePath
	}, apply, patchOptions);
	if (!updated) return {
		canonicalKey: target.canonicalKey,
		found: false
	};
	return {
		canonicalKey: target.canonicalKey,
		entry: structuredClone(updated),
		found: true,
		result: updateResult,
		storeKey: target.storeKey
	};
}
/** Lists entries from the resolved store, preserving the persisted key for each row. */
function listSessionEntriesCore(scope = {}) {
	if (scope.clone === false) return openSessionEntryReadView(scope).entries();
	return listSessionEntryRows(scope);
}
/**
* Synchronous read view: `get` queries one exact persisted key without alias resolution;
* `entries` caches listing metadata or loads complete entries. Rows and nested values are
* borrowed: callers must not mutate them and must drop the view before any await.
*/
function openSessionEntryReadView(scope = {}) {
	return {
		get: (sessionKey) => (isIncognitoSessionKey(sessionKey) ? loadExactSessionEntry : loadExactSessionEntryReadOnly)({
			...scope,
			clone: false,
			sessionKey
		})?.entry,
		entries: () => listSessionEntriesReadOnly({
			...scope,
			clone: false
		})
	};
}
/**
* Applies an atomic patch and returns the persisted key selected by the backing
* store. Use when a caller must keep sidecar state keyed to the final row.
*/
async function patchSessionEntryWithKey(scope, update, options = {}) {
	const entry = await patchSessionEntryCore(scope, update, options);
	return entry ? {
		sessionKey: normalizeStoreSessionKey(scope.sessionKey),
		entry
	} : null;
}
//#endregion
export { resolveSessionEntryAccessTarget as a, readSessionStoreSummaryReadOnly as c, hasPluginHostCleanupTarget as d, isLockedHarnessSessionOwnedByPlugin as f, prepareQualifiedSessionEntryTarget as i, clearPluginHostCleanupTarget as l, shouldSkipPluginHostCleanupStore as m, openSessionEntryReadView as n, resolveSessionEntryCandidateTarget as o, matchesPluginHostCleanupSession as p, patchSessionEntryWithKey as r, updateResolvedSessionEntry as s, listSessionEntriesCore as t, clearPluginOwnedSessionState as u };
