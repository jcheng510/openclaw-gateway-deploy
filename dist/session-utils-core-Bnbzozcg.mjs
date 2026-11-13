import { l as normalizeOptionalString, o as normalizeLowercaseStringOrEmpty } from "./string-coerce-6kR-86XC.mjs";
import { l as asNonNegativeFiniteNumber, u as asPositiveFiniteNumber } from "./number-coercion-Dq1l5muL.mjs";
import { A as parseAgentSessionKey } from "./session-key-BC4m_Ly5.mjs";
import { n as isTerminalSessionStatus } from "./types-DBHkhm7j.mjs";
import { n as estimateAggregateUsageCost, s as resolveModelCostConfig } from "./usage-format-CTo3V5gU.mjs";
import "./sessions-Db5eEwNA.mjs";
import { s as shouldKeepSubagentRunChildLink } from "./subagent-run-liveness-CjqSkJZp.mjs";
import { t as deriveGoalSessionTitle } from "./derive-goal-session-title-CxMjELIW.mjs";
//#region src/gateway/session-utils-contracts.ts
function createSessionRowModelCacheKey(provider, model) {
	return `${normalizeLowercaseStringOrEmpty(provider)}\0${normalizeOptionalString(model) ?? ""}`;
}
//#endregion
//#region src/gateway/session-utils-core.ts
function deriveSessionTitle(entry, firstUserMessage, externalDisplayName) {
	if (!entry) return;
	return normalizeOptionalString(entry.label) ?? normalizeOptionalString(externalDisplayName) ?? normalizeOptionalString(entry.displayName) ?? normalizeOptionalString(entry.subject) ?? (deriveGoalSessionTitle(firstUserMessage) || void 0);
}
function prepareSessionTitleRead(entry, displayName, opts) {
	if (!entry?.sessionId || !(opts.includeDerivedTitles || opts.includeLastMessage)) return;
	const derivedTitle = opts.includeDerivedTitles ? deriveSessionTitle(entry, void 0, displayName) : void 0;
	return {
		derivedTitle,
		needsTranscript: opts.includeLastMessage || !derivedTitle
	};
}
function resolveModelCostConfigCached(provider, model, cfg, rowContext) {
	if (!rowContext) return resolveModelCostConfig({
		provider,
		model,
		config: cfg
	});
	const key = createSessionRowModelCacheKey(provider, model);
	if (rowContext.modelCostConfigByModelRef.has(key)) return rowContext.modelCostConfigByModelRef.get(key);
	const value = resolveModelCostConfig({
		provider,
		model,
		config: cfg
	});
	rowContext.modelCostConfigByModelRef.set(key, value);
	return value;
}
function resolveEstimatedSessionCostUsd(params) {
	const explicitCostUsd = asNonNegativeFiniteNumber(params.explicitCostUsd ?? params.entry?.estimatedCostUsd);
	if (explicitCostUsd !== void 0) return explicitCostUsd;
	const input = asPositiveFiniteNumber(params.entry?.inputTokens);
	const output = asPositiveFiniteNumber(params.entry?.outputTokens);
	const cacheRead = asPositiveFiniteNumber(params.entry?.cacheRead);
	const cacheWrite = asPositiveFiniteNumber(params.entry?.cacheWrite);
	if (input === void 0 && output === void 0 && cacheRead === void 0 && cacheWrite === void 0) return;
	const cost = resolveModelCostConfigCached(params.provider, params.model, params.cfg, params.rowContext);
	if (!cost) return;
	const estimated = estimateAggregateUsageCost({
		usage: {
			...input !== void 0 ? { input } : {},
			...output !== void 0 ? { output } : {},
			...cacheRead !== void 0 ? { cacheRead } : {},
			...cacheWrite !== void 0 ? { cacheWrite } : {}
		},
		cost
	});
	return asNonNegativeFiniteNumber(estimated);
}
const STALE_STORE_ONLY_CHILD_LINK_MS = 36e5;
function isFinitePositiveTimestamp(value) {
	return typeof value === "number" && Number.isFinite(value) && value > 0;
}
function shouldKeepStoreOnlyChildLink(entry, now) {
	if (isTerminalSessionStatus(entry.status) || isFinitePositiveTimestamp(entry.endedAt)) {
		const endedAt = isFinitePositiveTimestamp(entry.endedAt) ? entry.endedAt : entry.updatedAt;
		return isFinitePositiveTimestamp(endedAt) && now - endedAt <= 18e5;
	}
	return entry.status === "running" || isFinitePositiveTimestamp(entry.startedAt) || isFinitePositiveTimestamp(entry.updatedAt) && now - entry.updatedAt <= STALE_STORE_ONLY_CHILD_LINK_MS;
}
const emptyChildOwners = Object.freeze([]);
const sessionChildOwners = /* @__PURE__ */ new WeakMap();
/** Reuse owner identities, but recheck time and live authority on every read. */
function resolveSessionChildOwners(params) {
	const { key, entry, now, subagentRuns } = params;
	const latest = subagentRuns.getDisplaySubagentRun(key);
	const keep = params.hasActiveRun || (latest ? shouldKeepSubagentRunChildLink(latest, {
		activeDescendants: subagentRuns.countActiveDescendantRuns(key),
		now
	}) : shouldKeepStoreOnlyChildLink(entry, now));
	const controller = keep ? latest ? normalizeOptionalString(latest.controllerSessionKey) || normalizeOptionalString(latest.requesterSessionKey) : normalizeOptionalString(entry.spawnedBy) : void 0;
	const parent = keep || parseAgentSessionKey(key)?.rest.startsWith("dashboard:") ? normalizeOptionalString(entry.parentSessionKey) : void 0;
	const cached = sessionChildOwners.get(entry);
	if (cached?.revision === subagentRuns.revision && cached.key === key && cached.controller === controller && cached.parent === parent) return cached.owners;
	const owners = [];
	if (controller && controller !== key) owners.push(controller);
	if (parent && parent !== key && parent !== controller) owners.push(parent);
	const result = owners.length ? Object.freeze(owners) : emptyChildOwners;
	sessionChildOwners.set(entry, {
		revision: subagentRuns.revision,
		key,
		controller,
		parent,
		owners: result
	});
	return result;
}
/** Index only canonical children; retained run results cannot create session links. */
function* buildStoreChildSessionLinksWork(params, shouldYield) {
	const children = /* @__PURE__ */ new Map();
	if (params.keys.length === 0) return children;
	const parents = new Set(params.keys);
	for (const key of Object.keys(params.store)) {
		if (shouldYield?.()) yield;
		const entry = params.store[key];
		if (!entry) continue;
		const runs = params.subagentRunsByChildSessionKey.get(key.trim()) ?? [];
		const owners = /* @__PURE__ */ new Set([
			...runs.map((run) => normalizeOptionalString(run.controllerSessionKey) || normalizeOptionalString(run.requesterSessionKey)),
			normalizeOptionalString(entry.spawnedBy),
			normalizeOptionalString(entry.parentSessionKey)
		]);
		for (const owner of owners) if (owner && owner !== key && parents.has(owner)) {
			const siblings = children.get(owner) ?? [];
			siblings.push({
				key,
				entry
			});
			children.set(owner, siblings);
		}
	}
	return children;
}
//#endregion
export { resolveEstimatedSessionCostUsd as a, prepareSessionTitleRead as i, deriveSessionTitle as n, resolveSessionChildOwners as o, isFinitePositiveTimestamp as r, createSessionRowModelCacheKey as s, buildStoreChildSessionLinksWork as t };
