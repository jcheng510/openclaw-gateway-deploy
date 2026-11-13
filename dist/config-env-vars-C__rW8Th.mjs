import { l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import { i as asOptionalObjectRecord } from "./record-coerce-TIsquoVR.mjs";
import { a as normalizeZaiEnv, o as resolveEnvNormalizationKeys, t as expandEnvNormalizationKeys } from "./env-SuLFUnAK.mjs";
import { Y as containsEnvVarReference } from "./redact-CYYx6Qjc.mjs";
import { t as VERSION } from "./version-BMuSsYfE.mjs";
import { a as normalizeEnvVarKey, n as isDangerousHostEnvOverrideVarName, r as isDangerousHostEnvVarName } from "./host-env-security-DbYDpgPn.mjs";
import { r as shouldWarnOnTouchedVersion } from "./version-ByD9iTct.mjs";
import { AsyncLocalStorage } from "node:async_hooks";
//#region src/config/future-version-guard.ts
/** Override env var for intentional older-binary destructive config actions. */
const ALLOW_OLDER_BINARY_DESTRUCTIVE_ACTIONS_ENV = "OPENCLAW_ALLOW_OLDER_BINARY_DESTRUCTIVE_ACTIONS";
function allowOlderBinaryDestructiveActions(env) {
	const raw = env[ALLOW_OLDER_BINARY_DESTRUCTIVE_ACTIONS_ENV]?.trim().toLowerCase();
	return raw === "1" || raw === "true" || raw === "yes";
}
function resolveTouchedVersion(params) {
	const readSourceVersion = (value) => {
		const meta = asOptionalObjectRecord(asOptionalObjectRecord(value)?.meta);
		return normalizeOptionalString(meta?.lastTouchedVersion);
	};
	return readSourceVersion(params.snapshot?.sourceConfig) ?? readSourceVersion(params.snapshot?.config) ?? readSourceVersion(params.config) ?? null;
}
/** Resolves whether a destructive action should be blocked by future config metadata. */
function resolveFutureConfigActionBlock(params) {
	if (allowOlderBinaryDestructiveActions(params.env ?? process.env)) return null;
	const currentVersion = params.currentVersion ?? VERSION;
	const touchedVersion = resolveTouchedVersion(params);
	if (!touchedVersion || !shouldWarnOnTouchedVersion(currentVersion, touchedVersion)) return null;
	return {
		action: params.action,
		currentVersion,
		touchedVersion,
		message: `Refusing to ${params.action} because this OpenClaw binary (${currentVersion}) is older than the config last written by OpenClaw ${touchedVersion}.`,
		hints: ["Run the newer openclaw binary on PATH, or reinstall the intended gateway service from the newer install.", `Set ${ALLOW_OLDER_BINARY_DESTRUCTIVE_ACTIONS_ENV}=1 only for an intentional downgrade or recovery action.`]
	};
}
/** Formats a future-config action block for CLI/service error output. */
function formatFutureConfigActionBlock(block) {
	return [block.message, ...block.hints].join("\n");
}
//#endregion
//#region src/config/config-env-values.ts
function isBlockedConfigEnvVar(key) {
	return key.toUpperCase() === "OPENCLAW_ALLOW_OLDER_BINARY_DESTRUCTIVE_ACTIONS" || key.toUpperCase() === "OPENCLAW_INCLUDE_ROOTS" || key.toUpperCase() === "OPENCLAW_CONFIG_READONLY" || isDangerousHostEnvVarName(key) || isDangerousHostEnvOverrideVarName(key);
}
/** Returns whether a config-controlled environment entry is safe to apply at runtime. */
function isConfigRuntimeEnvVarAllowed(key, value) {
	return Boolean(value.trim()) && !isBlockedConfigEnvVar(key) && !containsEnvVarReference(value);
}
/** Collects config env vars safe to inject into runtime process environments. */
function collectConfigRuntimeEnvVars(cfg) {
	const envConfig = cfg?.env;
	if (!envConfig) return {};
	const entries = {};
	const candidates = [...Object.entries(envConfig.vars ?? {}), ...Object.entries(envConfig).filter(([key]) => key !== "shellEnv" && key !== "vars")];
	for (const [rawKey, value] of candidates) {
		if (typeof value !== "string" || !value.trim()) continue;
		const key = normalizeEnvVarKey(rawKey, { portable: true });
		if (!key) continue;
		if (!isConfigRuntimeEnvVarAllowed(key, value)) continue;
		entries[key] = value;
	}
	return entries;
}
function findCaseInsensitiveEnvKey(env, key) {
	if (Object.hasOwn(env, key)) return key;
	const upperKey = key.toUpperCase();
	return Object.keys(env).find((candidate) => candidate.toUpperCase() === upperKey);
}
function envSnapshotKey(key) {
	return process.platform === "win32" ? key.toUpperCase() : key;
}
function snapshotEnvByPlatformKey(env) {
	const snapshot = /* @__PURE__ */ new Map();
	for (const [key, value] of Object.entries(env)) {
		const platformKey = envSnapshotKey(key);
		if (!snapshot.has(platformKey)) snapshot.set(platformKey, {
			key,
			value
		});
	}
	return snapshot;
}
function envSnapshotEntriesEqual(left, right) {
	return left?.key === right?.key && left?.value === right?.value;
}
function replaceEnvSnapshotEntry(env, current, next) {
	if (current) delete env[current.key];
	if (next?.value !== void 0) env[next.key] = next.value;
}
function indexConfigRuntimeEnvValues(entries) {
	const allowedValues = /* @__PURE__ */ new Map();
	for (const [key, value] of Object.entries(entries)) for (const normalizedKey of resolveEnvNormalizationKeys(key)) {
		const values = allowedValues.get(normalizedKey) ?? /* @__PURE__ */ new Set();
		values.add(value);
		allowedValues.set(normalizedKey, values);
	}
	return allowedValues;
}
function snapshotEnvProperties(env) {
	return new Map(Object.entries(env).map(([key, value]) => [key, {
		key,
		value
	}]));
}
function rollbackConfigRuntimeEnvChanges(env, changes) {
	let current;
	for (const [key, change] of changes) {
		const currentEntry = (current ??= snapshotEnvByPlatformKey(env)).get(key);
		if (!envSnapshotEntriesEqual(currentEntry, change.after)) continue;
		replaceEnvSnapshotEntry(env, currentEntry, change.before);
	}
}
//#endregion
//#region src/config/config-env-vars.ts
const appliedConfigEnvOwnership = /* @__PURE__ */ new WeakMap();
function resolveAppliedConfigEnvOwnership(env) {
	return {
		...appliedConfigEnvOwnership.get(env),
		...env === process.env ? publishedConfigRuntimeEnvState.ownedEnv : {}
	};
}
/** Capture read-time provenance separately from runtime publication authority. */
function snapshotEnv(env) {
	const snapshot = cloneEnvWithPlatformSemantics(env);
	appliedConfigEnvOwnership.set(snapshot, { ...appliedConfigEnvOwnership.get(env) });
	return snapshot;
}
/** Roll back a rejected read only while both its values and provenance are current. */
function restoreEnvChangesIfUnchanged(params) {
	const before = snapshotEnvByPlatformKey(params.before);
	const after = snapshotEnvByPlatformKey(params.after);
	const current = snapshotEnvByPlatformKey(params.env);
	const beforeOwned = snapshotEnvByPlatformKey(appliedConfigEnvOwnership.get(params.before) ?? {});
	const afterOwned = snapshotEnvByPlatformKey(appliedConfigEnvOwnership.get(params.after) ?? {});
	const owned = { ...appliedConfigEnvOwnership.get(params.env) };
	const currentOwned = snapshotEnvByPlatformKey(owned);
	const keys = new Set(before.keys());
	for (const entries of [
		after,
		beforeOwned,
		afterOwned
	]) entries.forEach((_value, key) => keys.add(key));
	for (const key of keys) {
		if (!envSnapshotEntriesEqual(current.get(key), after.get(key)) || !envSnapshotEntriesEqual(currentOwned.get(key), afterOwned.get(key))) continue;
		if (!envSnapshotEntriesEqual(before.get(key), after.get(key))) replaceEnvSnapshotEntry(params.env, current.get(key), before.get(key));
		replaceEnvSnapshotEntry(owned, currentOwned.get(key), beforeOwned.get(key));
	}
	appliedConfigEnvOwnership.set(params.env, owned);
}
const configReadEnvChanges = new AsyncLocalStorage();
/** Retain only synchronous reader effects for a containing write's compensation. */
async function withConfigReadEnvChanges(env, run) {
	const scope = {
		env,
		receipts: [],
		active: true
	};
	try {
		return await configReadEnvChanges.run(scope, () => run(() => {
			for (const restore of scope.receipts.toReversed()) restore();
		}));
	} finally {
		scope.active = false;
	}
}
function snapshotConfigEnvOwnership(env, properties) {
	return new Map(Object.entries(appliedConfigEnvOwnership.get(env) ?? {}).map(([key, value]) => {
		return [(!properties.has(key) && Object.hasOwn(env, key) ? [...properties.keys()].find((candidate) => candidate.toUpperCase() === key.toUpperCase()) : key) ?? key, {
			key,
			value
		}];
	}));
}
/** Awaited validation may change other keys; the producer owns only its synchronous effects. */
function captureConfigReadEnvMutation(env, run, retainRestore) {
	const before = snapshotEnvProperties(env);
	const beforeOwned = snapshotConfigEnvOwnership(env, before);
	const scope = configReadEnvChanges.getStore();
	try {
		return run();
	} finally {
		const after = snapshotEnvProperties(env);
		const afterOwned = snapshotConfigEnvOwnership(env, after);
		const changes = [.../* @__PURE__ */ new Set([
			...before.keys(),
			...after.keys(),
			...beforeOwned.keys(),
			...afterOwned.keys()
		])].map((key) => ({
			key,
			before: before.get(key),
			after: after.get(key),
			beforeOwned: beforeOwned.get(key),
			afterOwned: afterOwned.get(key)
		})).filter((change) => !envSnapshotEntriesEqual(change.before, change.after) || !envSnapshotEntriesEqual(change.beforeOwned, change.afterOwned));
		const pairedDestinations = /* @__PURE__ */ new Set();
		for (const change of changes) {
			const previous = change.before;
			if (!previous || change.after || !Object.hasOwn(env, previous.key)) continue;
			const destinations = changes.filter((candidate) => !candidate.before && candidate.after && !pairedDestinations.has(candidate.key) && candidate.key.toUpperCase() === previous.key.toUpperCase() && env[previous.key] === candidate.after.value);
			if (destinations.length !== 1) continue;
			const destination = destinations[0];
			change.after = destination.after;
			change.afterOwned = destination.afterOwned;
			pairedDestinations.add(destination.key);
		}
		let active = true;
		const restore = () => {
			if (!active) return;
			active = false;
			const owned = { ...appliedConfigEnvOwnership.get(env) };
			const current = snapshotEnvProperties(env);
			const currentOwned = snapshotConfigEnvOwnership(env, current);
			for (const change of changes) {
				if (pairedDestinations.has(change.key)) continue;
				const key = change.after?.key ?? change.before?.key ?? change.key;
				if (!(change.after ? envSnapshotEntriesEqual(current.get(key), change.after) : !Object.hasOwn(env, key)) || !envSnapshotEntriesEqual(currentOwned.get(key), change.afterOwned)) continue;
				if (!envSnapshotEntriesEqual(change.before, change.after)) replaceEnvSnapshotEntry(env, current.get(key), change.before);
				replaceEnvSnapshotEntry(owned, currentOwned.get(key), change.beforeOwned);
			}
			appliedConfigEnvOwnership.set(env, owned);
		};
		retainRestore?.(restore);
		if (scope?.active && scope.env === env) scope.receipts.push(restore);
	}
}
function cloneEnvWithPlatformSemantics(env) {
	const cloned = { ...env };
	const ownedEnv = resolveAppliedConfigEnvOwnership(env);
	if (process.platform !== "win32") {
		appliedConfigEnvOwnership.set(cloned, ownedEnv);
		return cloned;
	}
	const proxy = new Proxy(cloned, {
		deleteProperty(target, property) {
			if (typeof property !== "string") return Reflect.deleteProperty(target, property);
			const key = findCaseInsensitiveEnvKey(target, property);
			return key ? Reflect.deleteProperty(target, key) : true;
		},
		get(target, property, receiver) {
			if (typeof property !== "string") return Reflect.get(target, property, receiver);
			const key = findCaseInsensitiveEnvKey(target, property);
			return key ? target[key] : Reflect.get(target, property, receiver);
		},
		getOwnPropertyDescriptor(target, property) {
			if (typeof property !== "string") return Reflect.getOwnPropertyDescriptor(target, property);
			const key = findCaseInsensitiveEnvKey(target, property);
			if (!key) return;
			return {
				configurable: true,
				enumerable: true,
				value: target[key],
				writable: true
			};
		},
		has(target, property) {
			return typeof property === "string" ? findCaseInsensitiveEnvKey(target, property) !== void 0 : Reflect.has(target, property);
		},
		set(target, property, value) {
			if (typeof property !== "string") return Reflect.set(target, property, value);
			target[findCaseInsensitiveEnvKey(target, property) ?? property] = value;
			return true;
		}
	});
	appliedConfigEnvOwnership.set(proxy, ownedEnv);
	return proxy;
}
/** Collects config env vars safe to persist into managed service environments. */
const collectConfigServiceEnvVars = collectConfigRuntimeEnvVars;
/** Builds a cloned environment with config env vars applied without mutating the base env. */
function createConfigRuntimeEnv(cfg, baseEnv = process.env) {
	const env = cloneEnvWithPlatformSemantics(baseEnv);
	applyConfigEnvVars(cfg, env);
	return env;
}
let publishedConfigRuntimeEnvState = {
	generation: 0,
	ownedEnv: {},
	sourceConfig: null
};
let publishedConfigRuntimeEnvEpoch = 0;
let pendingConfigRuntimeEnvPublication = null;
function applyPublishedConfigRuntimeEnvRollback(publication) {
	rollbackConfigRuntimeEnvChanges(process.env, publication.changes);
	publishedConfigRuntimeEnvState = {
		generation: publishedConfigRuntimeEnvState.generation + 1,
		ownedEnv: publication.previousState.ownedEnv,
		sourceConfig: publication.previousState.sourceConfig
	};
}
function isPendingConfigRuntimeEnvPublication(publication) {
	let current = pendingConfigRuntimeEnvPublication;
	while (current) {
		if (current === publication) return true;
		current = current.previous;
	}
	return false;
}
function unwindRequestedConfigRuntimeEnvPublications() {
	while (pendingConfigRuntimeEnvPublication?.rollbackRequested) {
		const publication = pendingConfigRuntimeEnvPublication;
		applyPublishedConfigRuntimeEnvRollback(publication);
		const previous = publication.previous;
		if (!previous || previous.committed) {
			pendingConfigRuntimeEnvPublication = null;
			return;
		}
		pendingConfigRuntimeEnvPublication = previous;
	}
}
function getPublishedConfigRuntimeEnvState() {
	return publishedConfigRuntimeEnvState;
}
function collectConfigRuntimeEnvOwnership(sourceConfig, before, after, options = {}) {
	const ownedEnv = {};
	const replacedLowerPrecedenceKeys = new Set((options.replacedLowerPrecedenceKeys ?? []).map(envSnapshotKey));
	for (const [key, value] of Object.entries(collectConfigRuntimeEnvVars(sourceConfig))) for (const normalizedKey of resolveEnvNormalizationKeys(key)) {
		const afterKey = findCaseInsensitiveEnvKey(after, normalizedKey);
		if (!afterKey || after[afterKey] !== value) continue;
		const beforeKey = findCaseInsensitiveEnvKey(before, normalizedKey);
		if (beforeKey && before[beforeKey] === value && !replacedLowerPrecedenceKeys.has(envSnapshotKey(afterKey))) continue;
		ownedEnv[afterKey] = value;
	}
	return ownedEnv;
}
function filterConfigRuntimeEnvOwnership(sourceConfig, env, ownedEnv) {
	const allowedValues = indexConfigRuntimeEnvValues(collectConfigRuntimeEnvVars(sourceConfig));
	const filtered = {};
	for (const [key, value] of Object.entries(ownedEnv)) {
		const normalizedKey = resolveEnvNormalizationKeys(key)[0] ?? key;
		const actualKey = findCaseInsensitiveEnvKey(env, key);
		if (actualKey && env[actualKey] === value && allowedValues.get(normalizedKey)?.has(value)) filtered[actualKey] = value;
	}
	return filtered;
}
function initializePublishedConfigRuntimeEnv(sourceConfig, options = {}) {
	const ownedEnv = filterConfigRuntimeEnvOwnership(sourceConfig, process.env, options.preserveExistingOwnership ? {
		...publishedConfigRuntimeEnvState.ownedEnv,
		...options.ownedEnv
	} : options.ownedEnv ?? {});
	publishedConfigRuntimeEnvState = {
		generation: publishedConfigRuntimeEnvState.generation + 1,
		ownedEnv,
		sourceConfig
	};
	publishedConfigRuntimeEnvEpoch += 1;
	pendingConfigRuntimeEnvPublication = null;
}
function resetPublishedConfigRuntimeEnv(options = {}) {
	if (!options.preserveOwnership) appliedConfigEnvOwnership.delete(process.env);
	publishedConfigRuntimeEnvState = options.preserveOwnership ? {
		...publishedConfigRuntimeEnvState,
		generation: publishedConfigRuntimeEnvState.generation + 1
	} : {
		generation: 0,
		ownedEnv: {},
		sourceConfig: null
	};
	publishedConfigRuntimeEnvEpoch += 1;
	pendingConfigRuntimeEnvPublication = null;
}
/** Removes the active config-owned layer from an isolated read environment. */
function createConfigRuntimeEnvBase(activeConfig, env = process.env, options = {}) {
	const isolated = cloneEnvWithPlatformSemantics(env);
	const ownedEnv = filterConfigRuntimeEnvOwnership(activeConfig, env, options.ownedEnv ?? resolveAppliedConfigEnvOwnership(env));
	for (const [key, ownedValue] of Object.entries(ownedEnv)) {
		if (options.preservedKeys?.has(key.toUpperCase())) continue;
		if (isolated[key] === ownedValue) delete isolated[key];
	}
	return isolated;
}
/** Prepares a config-owned env layer without mutating the live process. */
function prepareConfigRuntimeEnv(params) {
	const targetEnv = params.env ?? process.env;
	const before = snapshotEnvByPlatformKey(targetEnv);
	const preparedEnv = createConfigRuntimeEnvBase(params.previousConfig, targetEnv, params.previousOwnedEnv ? { ownedEnv: params.previousOwnedEnv } : {});
	const base = { ...preparedEnv };
	applyConfigEnvVars(params.nextConfig, preparedEnv);
	const after = { ...preparedEnv };
	const afterByPlatformKey = snapshotEnvByPlatformKey(after);
	const preparedOwnedEnv = collectConfigRuntimeEnvOwnership(params.nextConfig, base, after);
	return prepareConfigRuntimeEnvPublication({
		targetEnv,
		before,
		preparedEnv,
		afterByPlatformKey,
		configState: {
			sourceConfig: params.nextConfig,
			ownedEnv: preparedOwnedEnv
		}
	});
}
/** Stages loader mutations; its caller retains authority over publication. */
function prepareConfigRuntimeEnvLoad(params) {
	const targetEnv = params.env ?? process.env;
	const originalEnv = cloneEnvWithPlatformSemantics(targetEnv);
	const before = snapshotEnvByPlatformKey(originalEnv);
	const env = createConfigRuntimeEnvBase(params.previousConfig, targetEnv, {
		ownedEnv: params.previousOwnedEnv,
		preservedKeys: params.preservedKeys
	});
	const initialBase = snapshotEnvByPlatformKey(env);
	const retainedOwnedEnv = Object.fromEntries(Object.entries(params.previousOwnedEnv ?? resolveAppliedConfigEnvOwnership(targetEnv)).filter(([key, value]) => initialBase.get(envSnapshotKey(key))?.value === value));
	let dotenvBaseline = cloneEnvWithPlatformSemantics(env);
	return {
		env,
		captureDotEnvBaseline: () => {
			dotenvBaseline = cloneEnvWithPlatformSemantics(env);
		},
		prepare: (nextConfig) => {
			const preparedEnv = cloneEnvWithPlatformSemantics(env);
			return prepareConfigRuntimeEnvPublication({
				targetEnv,
				before,
				preparedEnv,
				afterByPlatformKey: snapshotEnvByPlatformKey(preparedEnv),
				configState: {
					sourceConfig: nextConfig,
					ownedEnv: {
						...filterConfigRuntimeEnvOwnership(nextConfig, preparedEnv, retainedOwnedEnv),
						...collectConfigRuntimeEnvOwnership(nextConfig, dotenvBaseline, preparedEnv)
					}
				}
			});
		},
		prepareFailure: () => {
			const preparedEnv = cloneEnvWithPlatformSemantics(originalEnv);
			const dotenv = snapshotEnvByPlatformKey(dotenvBaseline);
			for (const key of /* @__PURE__ */ new Set([...initialBase.keys(), ...dotenv.keys()])) {
				const original = before.get(key);
				const base = initialBase.get(key);
				const loaded = dotenv.get(key);
				if (envSnapshotEntriesEqual(original, base) && !envSnapshotEntriesEqual(base, loaded)) replaceEnvSnapshotEntry(preparedEnv, original, loaded);
			}
			return prepareConfigRuntimeEnvPublication({
				targetEnv,
				before,
				preparedEnv,
				afterByPlatformKey: snapshotEnvByPlatformKey(preparedEnv)
			});
		}
	};
}
function prepareConfigRuntimeEnvPublication(params) {
	const { targetEnv, before, preparedEnv, afterByPlatformKey } = params;
	return {
		env: preparedEnv,
		publish: () => {
			const processPublication = targetEnv === process.env;
			const previousPublishedState = publishedConfigRuntimeEnvState;
			const previousOwnedEnv = resolveAppliedConfigEnvOwnership(targetEnv);
			const previousPublication = processPublication ? pendingConfigRuntimeEnvPublication : null;
			const published = /* @__PURE__ */ new Map();
			const keys = /* @__PURE__ */ new Set([
				...before.keys(),
				...afterByPlatformKey.keys(),
				...previousPublication?.changes.keys() ?? []
			]);
			let current;
			for (const key of keys) {
				const beforeEntry = before.get(key);
				const afterEntry = afterByPlatformKey.get(key);
				const currentEntry = (current ??= snapshotEnvByPlatformKey(targetEnv)).get(key);
				const previousChange = previousPublication?.changes.get(key);
				const continuesPreviousPublication = previousChange !== void 0 && envSnapshotEntriesEqual(currentEntry, previousChange.after) && envSnapshotEntriesEqual(beforeEntry, previousChange.preparedBefore);
				const appliesToPreparedSnapshot = !envSnapshotEntriesEqual(beforeEntry, afterEntry) && envSnapshotEntriesEqual(currentEntry, beforeEntry);
				if (!continuesPreviousPublication && !appliesToPreparedSnapshot) continue;
				published.set(key, {
					before: currentEntry,
					after: afterEntry,
					preparedBefore: beforeEntry
				});
				if (!envSnapshotEntriesEqual(currentEntry, afterEntry)) replaceEnvSnapshotEntry(targetEnv, currentEntry, afterEntry);
			}
			const generation = processPublication ? publishedConfigRuntimeEnvState.generation + 1 : null;
			const publicationEpoch = publishedConfigRuntimeEnvEpoch;
			let processPublicationState = null;
			if (generation !== null) {
				const ownedEnv = {};
				let owned;
				for (const [key, value] of Object.entries(params.configState?.ownedEnv ?? {})) {
					const platformKey = envSnapshotKey(key);
					const currentEntry = (owned ??= snapshotEnvByPlatformKey(targetEnv)).get(platformKey);
					const preparedEntry = afterByPlatformKey.get(platformKey);
					const previousOwnedKey = findCaseInsensitiveEnvKey(previousOwnedEnv, key);
					if (currentEntry?.value === value && envSnapshotEntriesEqual(currentEntry, preparedEntry) && (published.has(platformKey) || previousOwnedKey !== void 0 && previousOwnedEnv[previousOwnedKey] === value)) ownedEnv[currentEntry.key] = value;
				}
				publishedConfigRuntimeEnvState = {
					generation,
					ownedEnv: params.configState ? ownedEnv : previousPublishedState.ownedEnv,
					sourceConfig: params.configState?.sourceConfig ?? previousPublishedState.sourceConfig
				};
				processPublicationState = {
					epoch: publicationEpoch,
					previous: previousPublication,
					previousState: previousPublishedState,
					changes: published,
					committed: false,
					rollbackRequested: false
				};
				pendingConfigRuntimeEnvPublication = processPublicationState;
			}
			let active = true;
			const rollback = (() => {
				if (!active) return;
				active = false;
				if (processPublicationState) {
					if (processPublicationState.epoch !== publishedConfigRuntimeEnvEpoch) return;
					processPublicationState.rollbackRequested = true;
					if (!isPendingConfigRuntimeEnvPublication(processPublicationState)) return;
					unwindRequestedConfigRuntimeEnvPublications();
					return;
				}
				rollbackConfigRuntimeEnvChanges(targetEnv, published);
			});
			rollback.commit = () => {
				if (!active) return;
				active = false;
				if (!processPublicationState) return;
				processPublicationState.committed = true;
				processPublicationState.rollbackRequested = false;
				processPublicationState.previous = null;
				if (pendingConfigRuntimeEnvPublication === processPublicationState) pendingConfigRuntimeEnvPublication = null;
			};
			return rollback;
		}
	};
}
/** Applies config env vars to an environment without overwriting existing non-empty values. */
function applyConfigEnvVars(cfg, env = process.env, options = {}) {
	const before = { ...env };
	const previousOwnedEnv = resolveAppliedConfigEnvOwnership(env);
	const entries = collectConfigRuntimeEnvVars(cfg);
	const lowerPrecedenceEntries = Object.entries(options.lowerPrecedenceEnv ?? {});
	const lowerPrecedenceEnv = new Map(lowerPrecedenceEntries.map(([key, value]) => [envSnapshotKey(key), value]));
	const configEnvKeys = expandEnvNormalizationKeys(Object.keys(entries));
	const configValuesByKey = indexConfigRuntimeEnvValues(entries);
	const higherPrecedenceValues = /* @__PURE__ */ new Map();
	for (const key of Object.keys(entries)) {
		const normalizedKeys = resolveEnvNormalizationKeys(key);
		const winningValue = normalizedKeys.map((normalizedKey) => [normalizedKey, env[normalizedKey]]).find(([normalizedKey, currentValue]) => currentValue?.trim() && lowerPrecedenceEnv.get(normalizedKey) !== currentValue && !configValuesByKey.get(normalizedKey)?.has(currentValue))?.[1];
		if (winningValue !== void 0) for (const normalizedKey of normalizedKeys) higherPrecedenceValues.set(normalizedKey, winningValue);
	}
	const replacedLowerPrecedenceKeys = [];
	for (const [key, value] of lowerPrecedenceEntries) if (configEnvKeys.has(envSnapshotKey(key)) && env[key] === value) {
		delete env[key];
		replacedLowerPrecedenceKeys.push(key);
	}
	if (replacedLowerPrecedenceKeys.length > 0) options.onLowerPrecedenceKeysReplaced?.(replacedLowerPrecedenceKeys);
	for (const [key, value] of Object.entries(entries)) {
		const higherPrecedenceValue = higherPrecedenceValues.get(envSnapshotKey(key));
		if (higherPrecedenceValue !== void 0) {
			env[key] = higherPrecedenceValue;
			continue;
		}
		const currentValue = env[key];
		if (currentValue?.trim() && lowerPrecedenceEnv.get(envSnapshotKey(key)) !== currentValue) continue;
		env[key] = value;
	}
	normalizeZaiEnv(env);
	appliedConfigEnvOwnership.set(env, {
		...filterConfigRuntimeEnvOwnership(cfg, env, previousOwnedEnv),
		...collectConfigRuntimeEnvOwnership(cfg, before, env, { replacedLowerPrecedenceKeys })
	});
}
//#endregion
export { isConfigRuntimeEnvVarAllowed as _, collectConfigServiceEnvVars as a, resolveFutureConfigActionBlock as b, getPublishedConfigRuntimeEnvState as c, prepareConfigRuntimeEnvLoad as d, resetPublishedConfigRuntimeEnv as f, collectConfigRuntimeEnvVars as g, withConfigReadEnvChanges as h, collectConfigRuntimeEnvOwnership as i, initializePublishedConfigRuntimeEnv as l, snapshotEnv as m, captureConfigReadEnvMutation as n, createConfigRuntimeEnv as o, restoreEnvChangesIfUnchanged as p, cloneEnvWithPlatformSemantics as r, createConfigRuntimeEnvBase as s, applyConfigEnvVars as t, prepareConfigRuntimeEnv as u, ALLOW_OLDER_BINARY_DESTRUCTIVE_ACTIONS_ENV as v, formatFutureConfigActionBlock as y };
