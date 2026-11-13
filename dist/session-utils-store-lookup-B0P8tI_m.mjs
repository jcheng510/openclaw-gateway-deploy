import { l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import "./src-SskUVPJG.mjs";
import { t as expectDefined } from "./expect-lbe3Hgrh.mjs";
import { n as ok, t as err } from "./result-BQGgYouL.mjs";
import { n as normalizeAgentId } from "./agent-id-D1-Q6vR4.mjs";
import { r as isIncognitoSessionKey } from "./session-key-DDIJxXfQ.mjs";
import { A as parseAgentSessionKey } from "./session-key-BC4m_Ly5.mjs";
import { i as listAgentIds } from "./agent-roster-B45JERT5.mjs";
import { s as resolveIncognitoOpenClawAgentSqlitePath } from "./openclaw-agent-db.paths-Dv3PPTNK.mjs";
import { l as resolveSessionStorePathCore } from "./paths-CQ3zRaeb.mjs";
import { b as isConfiguredSessionStoreAgentId } from "./openclaw-state-db-DM-mSY0m.mjs";
import { t as isPerAgentSessionStoreConfig } from "./session-store-config-BTa4BrjU.mjs";
import "./agent-scope-L_eY3Hj7.mjs";
import "./openclaw-agent-db-CZUYuo7P.mjs";
import { r as resolveAgentMainSessionKey } from "./main-session-BFJFO581.mjs";
import { t as listSessionEntriesReadOnly } from "./session-accessor.sqlite-entry-list.read-6sJ8GFrX.mjs";
import { c as resolveExistingAgentSessionStoreTargetsSync } from "./targets-CxfGP2B4.mjs";
import { b as loadExactSessionEntryCandidatesReadOnlyBatch, y as loadExactSessionEntryCandidates } from "./session-accessor.sqlite-pending-inputs-BdT_Tg9N.mjs";
import { n as listSessionChildEntriesReadOnly } from "./session-accessor.sqlite-entry-C87Sde4p.mjs";
import "./session-accessor-CGLseszP.mjs";
import { a as resolveStoredSessionKeyForAgentStore, r as resolveSessionStoreIdentity, s as selectStoredSessionLineage } from "./session-store-key-__CfQfd2.mjs";
import { t as listSessionEntriesCore } from "./session-accessor.entry-D9NYIhaA.mjs";
import "./sessions-Db5eEwNA.mjs";
import { f as listSubagentSessionListRunsForControllers } from "./subagent-registry-read-DgbIKTmN.mjs";
import { n as resolveGatewaySessionStoreReadResults } from "./session-utils-store-selection-fXGPFfH8.mjs";
//#region src/gateway/session-utils-store-read.ts
/** Single-target resolution keeps its original lazy read and failure order. */
function readGatewaySessionStore(read) {
	if (read.result === void 0) {
		const loaded = loadGatewaySessionLookupStore(read.storePath, read.clone, read.agentId, read.options);
		read.result = ok(loaded.store);
		read.readSource = loaded.readSource;
		read.capturedReadSource = loaded.capturedReadSource;
	}
	if (!read.result.ok) throw read.result.error;
	return read.result.value;
}
/** Populate exact logical lookups without materializing unrelated store entries. */
function loadGatewaySessionStoreReads(reads) {
	const pending = reads.filter((read) => read.result === void 0);
	const results = loadExactSessionEntryCandidatesReadOnlyBatch(pending.map((read) => ({
		agentId: read.agentId,
		storePath: read.storePath,
		projection: read.options.projection,
		clone: false,
		sessionKeys: expectDefined(read.options.exactKeys, "exact batch lookup keys"),
		onReadSource: (source) => {
			read.readSource = source;
		}
	})));
	for (const [index, read] of pending.entries()) {
		const result = expectDefined(results[index], "exact batch lookup result");
		read.result = result.ok ? ok(Object.fromEntries(result.value.map(({ sessionKey, entry }) => [sessionKey, entry]))) : result;
		if (!result.ok) read.readSource = void 0;
	}
}
function loadGatewaySessionLookupStore(storePath, clone, agentId, options = {}) {
	const cache = options.cache;
	const cacheKey = cache ? `${storePath}\u0000${agentId ?? ""}\u0000${clone === false ? "0" : "1"}\u0000${options.readOnly}\u0000${options.projection ?? "full"}\u0000${options.readConsistency ?? ""}\u0000${options.exactKeys?.join("") ?? ""}\u0000${options.listKeys ? JSON.stringify(options.listKeys) : ""}` : "";
	if (cache) {
		const cached = cache.get(cacheKey);
		if (cached) return cached;
	}
	const loaded = loadGatewaySessionLookupStoreUncached(storePath, clone, agentId, options);
	cache?.set(cacheKey, loaded);
	return loaded;
}
function loadGatewaySessionLookupStoreUncached(storePath, clone, agentId, options = {}) {
	if (options.exactKeys) {
		let readSource;
		let capturedReadSource;
		const target = options.readSource ? {
			readSource: options.readSource,
			readOnly: true
		} : {
			...agentId ? { agentId } : {},
			storePath,
			readOnly: options.readOnly !== false || clone === false
		};
		const entries = loadExactSessionEntryCandidates({
			...target,
			projection: options.projection,
			sessionKeys: options.exactKeys,
			onReadSource: (source, physical) => {
				readSource = source;
				capturedReadSource = physical ? {
					...source,
					databaseIdentity: physical.identity,
					databaseBirthtime: physical.birthtime
				} : void 0;
			}
		});
		return {
			store: Object.fromEntries(entries.map(({ sessionKey, entry }) => [sessionKey, entry])),
			...readSource ? { readSource } : {},
			...capturedReadSource ? { capturedReadSource } : {}
		};
	}
	const listEntries = options.readOnly ? listSessionEntriesReadOnly : listSessionEntriesCore;
	return { store: Object.fromEntries(listEntries({
		...agentId ? { agentId } : {},
		...clone === false ? { clone: false } : {},
		...options.projection ? { projection: options.projection } : {},
		...options.readConsistency ? { readConsistency: options.readConsistency } : {},
		...options.listKeys ? { sessionKeys: options.listKeys } : {},
		storePath
	}).map(({ sessionKey, entry }) => [sessionKey, entry])) };
}
//#endregion
//#region src/gateway/session-utils-store-lookup.ts
function buildGatewaySessionStoreScanTargets(params) {
	const targets = /* @__PURE__ */ new Set();
	if (params.canonicalKey) targets.add(params.canonicalKey);
	if (params.key && params.key !== params.canonicalKey) targets.add(params.key);
	if (params.canonicalKey === "global" || params.canonicalKey === "unknown") return [...targets];
	const agentMainKey = resolveAgentMainSessionKey({
		cfg: params.cfg,
		agentId: params.agentId
	});
	if (params.canonicalKey === agentMainKey) targets.add(`agent:${params.agentId}:main`);
	return [...targets];
}
function resolveGatewaySessionStoreCandidates(cfg, agentId, cache, excludeConfiguredFallback = false, env = process.env, registeredDatabases, resolveExistingTargets) {
	const cached = cache?.get(agentId);
	if (cached) return cached;
	const storeConfig = cfg.session?.store;
	const fallback = {
		agentId,
		storePath: resolveSessionStorePathCore(storeConfig, {
			agentId,
			env
		})
	};
	const excludeStorePath = !cache && excludeConfiguredFallback && !isPerAgentSessionStoreConfig(storeConfig) ? fallback.storePath : void 0;
	const discovery = {
		existing: resolveExistingTargets ? resolveExistingTargets(agentId, excludeStorePath) : resolveExistingAgentSessionStoreTargetsSync(cfg, agentId, {
			env,
			registeredDatabases,
			excludeStorePath
		}),
		fallback
	};
	cache?.set(agentId, discovery);
	return discovery;
}
function resolveGatewaySessionStoreLookupCandidates(params) {
	const configured = isConfiguredSessionStoreAgentId(params.cfg, params.agentId);
	if (!configured && params.registeredDatabases) {
		const readSources = params.registeredDatabases.filter((source) => normalizeAgentId(source.agentId) === params.agentId).map((source) => ({
			agentId: source.agentId,
			path: source.path
		}));
		return {
			configured,
			fallback: {
				agentId: params.agentId,
				storePath: resolveSessionStorePathCore(params.cfg.session?.store, {
					agentId: params.agentId,
					env: params.env
				})
			},
			candidates: readSources.map((source) => ({
				agentId: source.agentId,
				storePath: source.path
			})),
			readSources
		};
	}
	const { existing, fallback } = resolveGatewaySessionStoreCandidates(params.cfg, params.agentId, params.targetDiscoveryCache, configured, params.env, params.registeredDatabases, params.resolveExistingTargets);
	return {
		configured,
		fallback,
		candidates: configured ? [fallback, ...existing.filter((target) => target.storePath !== fallback.storePath)] : existing
	};
}
function storeReadOptions(params, keys, readOnly) {
	return {
		readOnly,
		...params.exactRead ? { exactKeys: keys } : {},
		...params.listCandidatesOnly ? { listKeys: keys } : {},
		...params.projection ? { projection: params.projection } : {},
		...params.readConsistency ? { readConsistency: params.readConsistency } : {},
		...params.storeCache ? { cache: params.storeCache } : {}
	};
}
function prepareGatewaySessionStoreLookup(params, scanTargets) {
	const { configured, fallback, candidates } = resolveGatewaySessionStoreLookupCandidates(params);
	if (candidates.length === 0) return {
		reads: [],
		resolve: () => ({
			storePath: fallback.storePath,
			store: {},
			match: void 0
		})
	};
	const reads = candidates.map((target, index) => ({
		storePath: target.storePath,
		agentId: target.agentId,
		clone: params.clone,
		options: storeReadOptions(params, scanTargets, configured ? params.readOnly : true),
		result: index === 0 && target.storePath === fallback.storePath && params.store !== void 0 ? ok(params.store) : void 0
	}));
	return {
		reads,
		resolve: () => resolveGatewaySessionStoreReadResults({
			...params,
			reads,
			readStore: readGatewaySessionStore,
			scanTargets
		})
	};
}
function prepareExplicitDeletedLegacyMainStoreTarget(params) {
	const parsed = parseAgentSessionKey(params.key);
	const legacyAgentId = normalizeAgentId(parsed?.agentId);
	if (!parsed || isIncognitoSessionKey(params.key) || legacyAgentId !== "main" || listAgentIds(params.cfg).includes(legacyAgentId)) return null;
	const canonicalKey = resolveStoredSessionKeyForAgentStore({
		cfg: params.cfg,
		agentId: legacyAgentId,
		sessionKey: params.key
	});
	const agentMainKey = resolveAgentMainSessionKey({
		cfg: params.cfg,
		agentId: legacyAgentId
	});
	const lookupSeeds = Array.from(/* @__PURE__ */ new Set([
		params.key,
		canonicalKey,
		agentMainKey,
		`agent:${legacyAgentId}:main`
	]));
	const { existing } = resolveGatewaySessionStoreCandidates(params.cfg, legacyAgentId, params.targetDiscoveryCache, false, params.env);
	const reads = existing.filter((target) => target.agentId === legacyAgentId).map((target) => ({
		storePath: target.storePath,
		clone: params.clone,
		agentId: target.agentId,
		options: storeReadOptions(params, lookupSeeds, true)
	}));
	return {
		reads,
		resolve: () => {
			if (reads.length === 0) return null;
			const best = resolveGatewaySessionStoreReadResults({
				reads,
				readStore: readGatewaySessionStore,
				scanTargets: lookupSeeds,
				canonicalKey
			});
			if (!best.match) return null;
			const storeKeys = /* @__PURE__ */ new Set([canonicalKey]);
			if (params.key !== canonicalKey) storeKeys.add(params.key);
			storeKeys.add(best.match.key);
			for (const seed of lookupSeeds) storeKeys.add(seed);
			return {
				agentId: legacyAgentId,
				storePath: best.storePath,
				canonicalKey,
				storeKeys: Array.from(storeKeys),
				store: best.store,
				...best.readSource ? { readSource: best.readSource } : {},
				...best.capturedReadSource ? { capturedReadSource: best.capturedReadSource } : {},
				capturedReadSources: best.capturedReadSources
			};
		}
	};
}
function prepareGatewaySessionStoreTarget(params) {
	const key = params.key;
	const { canonicalKey, agentId } = resolveSessionStoreIdentity({
		cfg: params.cfg,
		sessionKey: key,
		agentId: params.agentId
	});
	if (isIncognitoSessionKey(canonicalKey)) {
		const storePath = resolveIncognitoOpenClawAgentSqlitePath({
			agentId,
			env: params.env
		});
		const read = {
			storePath,
			agentId,
			clone: params.clone,
			options: storeReadOptions(params, [canonicalKey], true)
		};
		return {
			reads: [read],
			resolve: () => ({
				agentId,
				storePath,
				canonicalKey,
				storeKeys: [canonicalKey],
				store: readGatewaySessionStore(read),
				...read.readSource ? { readSource: read.readSource } : {},
				...read.capturedReadSource ? {
					capturedReadSource: read.capturedReadSource,
					capturedReadSources: [read.capturedReadSource]
				} : {}
			})
		};
	}
	const storeKeys = buildGatewaySessionStoreScanTargets({
		...params,
		canonicalKey,
		agentId
	});
	const lookup = prepareGatewaySessionStoreLookup({
		...params,
		canonicalKey,
		agentId
	}, storeKeys);
	return {
		reads: lookup.reads,
		resolve: () => {
			const { storePath, store, readSource, capturedReadSource, capturedReadSources } = lookup.resolve();
			return {
				agentId,
				storePath,
				canonicalKey,
				storeKeys: [...storeKeys],
				store,
				...readSource ? { readSource } : {},
				...capturedReadSource ? { capturedReadSource } : {},
				...capturedReadSources ? { capturedReadSources } : {}
			};
		}
	};
}
function resolveGatewaySessionStoreTargetWithStore(params) {
	const normalized = {
		...params,
		key: normalizeOptionalString(params.key) ?? ""
	};
	const deletedMain = prepareExplicitDeletedLegacyMainStoreTarget(normalized)?.resolve();
	return includeDirectChildEntries(deletedMain ?? prepareGatewaySessionStoreTarget(normalized).resolve(), params.includeStoreChildEntries, params.cfg, params.env);
}
/** Worker readers fill the same ordered lookup plan before its synchronous selection. */
async function prepareGatewaySessionStoreTargetReadOnly(params, prepareReads) {
	const normalized = {
		...params,
		key: normalizeOptionalString(params.key) ?? "",
		exactRead: true,
		readOnly: true,
		projection: "list"
	};
	const resolve = async (plan) => {
		return await prepareReads(plan.reads, () => {
			if (plan.reads.some((read) => read.result === void 0)) throw new Error("Session lookup facts were not prepared");
			return plan.resolve();
		});
	};
	const deletedMain = prepareExplicitDeletedLegacyMainStoreTarget(normalized);
	if (deletedMain) {
		const target = await resolve(deletedMain);
		if (target) return target;
	}
	return await resolve(prepareGatewaySessionStoreTarget(normalized));
}
/** Stored-address joins share discovery without passing selected keys through request aliases. */
function createGatewaySessionLineageReader(cfg) {
	const targetDiscoveryCache = /* @__PURE__ */ new Map();
	function readAlias(key, agentId) {
		const target = resolveGatewaySessionStoreTargetWithStore({
			cfg,
			key,
			...parseAgentSessionKey(key) ? {} : { agentId },
			readOnly: true,
			exactRead: true,
			clone: false,
			projection: "list",
			targetDiscoveryCache
		});
		return target.store[target.canonicalKey];
	}
	const readStored = (agentId, key) => {
		if (isIncognitoSessionKey(key)) return readAlias(key, agentId);
		return prepareGatewaySessionStoreLookup({
			cfg,
			agentId,
			key,
			canonicalKey: key,
			readOnly: true,
			exactRead: true,
			clone: false,
			projection: "list",
			targetDiscoveryCache
		}, [key]).resolve().store[key];
	};
	return {
		readStored,
		readAlias
	};
}
/** Exact row owners supply missing parent facts without expanding their selected store. */
function createGatewaySessionEntryReader(params) {
	const reader = createGatewaySessionLineageReader(params.cfg);
	return (key) => {
		if (params.store[key]) return params.store[key];
		if (key === "global" || key === "unknown") {
			const readSource = params.readSource;
			if (!readSource) return;
			return readGatewaySessionStore({
				agentId: readSource.agentId,
				storePath: readSource.path,
				options: {
					readSource,
					readOnly: true,
					exactKeys: [key],
					projection: "list"
				}
			})[key];
		}
		return selectStoredSessionLineage({
			cfg: params.cfg,
			agentId: params.agentId,
			sessionKey: key,
			read: reader.readStored,
			readAlias: () => reader.readAlias(key, params.agentId)
		}).value;
	};
}
/** Resolve one synchronous set of logical metadata targets using exact grouped reads. */
function resolveGatewaySessionStoreTargetsReadOnly(params) {
	return readGatewaySessionStoreTargets(params, "eager").map((result) => {
		if (!result.ok) throw result.error;
		return result.value;
	});
}
/** Read exact groups now, retaining logical errors for the caller's ordered visitor. */
function prepareGatewaySessionStoreTargetsReadOnly(params) {
	return readGatewaySessionStoreTargets(params, "prepared");
}
function readGatewaySessionStoreTargets(params, mode) {
	const resolve = (items, read) => items.map((item) => {
		if (!item.ok) return item;
		try {
			return ok(read(item.value));
		} catch (error) {
			if (mode === "eager") throw error;
			return err(error);
		}
	});
	const targetDiscoveryCache = /* @__PURE__ */ new Map();
	const requests = resolve(params.targets.map(ok), (target) => {
		const lookup = {
			...target,
			key: normalizeOptionalString(target.key) ?? "",
			cfg: params.cfg,
			env: params.env,
			clone: false,
			readOnly: true,
			exactRead: true,
			projection: mode === "eager" ? params.projection ?? "list" : params.projection,
			targetDiscoveryCache
		};
		return {
			lookup,
			legacy: prepareExplicitDeletedLegacyMainStoreTarget(lookup)
		};
	});
	loadGatewaySessionStoreReads(requests.flatMap((request) => request.ok ? request.value.legacy?.reads ?? [] : []));
	const selected = resolve(requests, ({ lookup, legacy }) => {
		const target = legacy?.resolve();
		return target ? {
			reads: [],
			resolve: () => target
		} : prepareGatewaySessionStoreTarget(lookup);
	});
	loadGatewaySessionStoreReads(selected.flatMap((selection) => selection.ok ? selection.value.reads : []));
	return resolve(selected, (selection) => selection.resolve());
}
function includeDirectChildEntries(target, include, cfg, env) {
	if (!include) return target;
	try {
		const parentKeys = /* @__PURE__ */ new Set([target.canonicalKey, ...target.storeKeys]);
		const childKeys = /* @__PURE__ */ new Set();
		for (const parentKey of parentKeys) for (const { sessionKey, entry } of listSessionChildEntriesReadOnly({
			agentId: target.agentId,
			env,
			clone: false,
			projection: "list",
			sessionKey: parentKey,
			storePath: target.storePath
		})) if (!parentKeys.has(sessionKey)) target.store[sessionKey] = entry;
		for (const { childSessionKey } of listSubagentSessionListRunsForControllers([...parentKeys])) childKeys.add(childSessionKey);
		const targets = [...childKeys].filter((key) => !target.store[key]).map((key) => ({ key }));
		for (const child of resolveGatewaySessionStoreTargetsReadOnly({
			cfg,
			env,
			targets,
			projection: "list"
		})) {
			const entry = child.store[child.canonicalKey];
			if (entry && !parentKeys.has(child.canonicalKey)) target.store[child.canonicalKey] = entry;
		}
	} catch {}
	return target;
}
function resolveGatewaySessionStoreTarget(params) {
	const { store: _store, readSource: _readSource, capturedReadSource: _capturedReadSource, capturedReadSources: _capturedReadSources, ...target } = resolveGatewaySessionStoreTargetWithStore({
		...params,
		projection: "list",
		listCandidatesOnly: true
	});
	return target;
}
//#endregion
export { resolveGatewaySessionStoreLookupCandidates as a, prepareGatewaySessionStoreTargetsReadOnly as i, createGatewaySessionLineageReader as n, resolveGatewaySessionStoreTarget as o, prepareGatewaySessionStoreTargetReadOnly as r, resolveGatewaySessionStoreTargetWithStore as s, createGatewaySessionEntryReader as t };
