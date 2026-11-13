import { l as normalizeOptionalString, o as normalizeLowercaseStringOrEmpty } from "./string-coerce-6kR-86XC.mjs";
import { n as normalizeAgentId } from "./agent-id-D1-Q6vR4.mjs";
import { t as AgentSelectionRequiredError } from "./agent-scope-config-Dm6T00l4.mjs";
import { i as normalizeMainKey, r as isIncognitoSessionKey } from "./session-key-DDIJxXfQ.mjs";
import { A as parseAgentSessionKey, O as normalizeSessionKeyPreservingOpaquePeerIds } from "./session-key-BC4m_Ly5.mjs";
import { i as listAgentIds } from "./agent-roster-B45JERT5.mjs";
import { g as resolveSessionAgentId } from "./agent-scope-L_eY3Hj7.mjs";
import { n as resolvePersistedSessionStoreOwnerForKey } from "./session-store-owner-CqyGjSj-.mjs";
import { n as canonicalizeMainSessionAlias, r as resolveAgentMainSessionKey } from "./main-session-BFJFO581.mjs";
import { a as tryResolveSessionCompatibilityOwnerAgentId } from "./session-request-agent-DFWpsx2m.mjs";
//#region src/gateway/session-store-key.ts
/** Canonicalize an opaque session key into the agent-scoped store namespace. */
function canonicalizeSessionKeyForAgent(agentId, key) {
	const lowered = normalizeLowercaseStringOrEmpty(key);
	if (lowered === "global" || lowered === "unknown") return lowered;
	const normalized = normalizeSessionKeyPreservingOpaquePeerIds(key);
	return normalized.startsWith("agent:") ? normalized : `agent:${normalizeAgentId(agentId)}:${normalized}`;
}
function resolveLogicalSessionStoreAgentId(cfg, sessionKey) {
	const agentId = tryResolveSessionCompatibilityOwnerAgentId(cfg, sessionKey);
	if (agentId) return agentId;
	const persistedOwner = resolvePersistedSessionStoreOwnerForKey(cfg, sessionKey);
	if (persistedOwner.kind === "retired") throw new AgentSelectionRequiredError(listAgentIds(cfg), {
		surface: `session key "${sessionKey}"`,
		hint: `Its recorded owner "${persistedOwner.agentId}" is no longer configured. Select a configured agent explicitly.`
	});
	throw new AgentSelectionRequiredError(listAgentIds(cfg), {
		surface: `session key "${sessionKey}"`,
		hint: "Use an agent-prefixed session key or select an agent explicitly."
	});
}
function resolveParsedSessionStoreKey(cfg, raw, parsed, options) {
	const parsedAgentId = normalizeAgentId(parsed.agentId);
	const rest = normalizeLowercaseStringOrEmpty(parsed.rest);
	if (parsedAgentId !== "main" || rest !== "main" && rest !== normalizeMainKey(cfg.session?.mainKey) || listAgentIds(cfg).includes("main")) return {
		agentId: parsedAgentId,
		sessionKey: normalizeSessionKeyPreservingOpaquePeerIds(raw)
	};
	const agentId = options?.storeAgentId ? normalizeAgentId(options.storeAgentId) : resolveLogicalSessionStoreAgentId(cfg, "main");
	return {
		agentId,
		sessionKey: `agent:${agentId}:${rest}`
	};
}
function canonicalizeParsedSessionStoreKey(cfg, raw, parsed, storeAgentId, preserveQualifiedAddress = false) {
	const resolved = resolveParsedSessionStoreKey(cfg, raw, parsed, { storeAgentId });
	if (preserveQualifiedAddress && resolved.agentId === normalizeAgentId(parsed.agentId)) return resolved.sessionKey;
	return canonicalizeMainSessionAlias({
		cfg,
		agentId: resolved.agentId,
		sessionKey: resolved.sessionKey
	});
}
/** Resolve any incoming session key into the canonical key used in persisted session stores. */
function resolveSessionStoreKey(params) {
	const raw = normalizeOptionalString(params.sessionKey) ?? "";
	if (!raw) return raw;
	const rawLower = normalizeLowercaseStringOrEmpty(raw);
	if (rawLower === "global" || rawLower === "unknown") return rawLower;
	const parsed = parseAgentSessionKey(raw);
	if (parsed) return canonicalizeParsedSessionStoreKey(params.cfg, raw, parsed, params.storeAgentId);
	const rawMainKey = normalizeMainKey(params.cfg.session?.mainKey);
	const storeAgentId = params.storeAgentId ? normalizeAgentId(params.storeAgentId) : void 0;
	if (rawLower === "main" || rawLower === rawMainKey) {
		if (params.cfg.session?.scope === "global") return "global";
		return resolveAgentMainSessionKey({
			cfg: params.cfg,
			agentId: storeAgentId ?? resolveLogicalSessionStoreAgentId(params.cfg, raw)
		});
	}
	return canonicalizeSessionKeyForAgent(storeAgentId ?? resolveLogicalSessionStoreAgentId(params.cfg, raw), raw);
}
/** Resolve ownership before a prepared agent's main alias collapses to global. */
function resolveSessionStoreAgentId(cfg, canonicalKey, explicitAgentId) {
	if (explicitAgentId) {
		const parsed = parseAgentSessionKey(canonicalKey);
		const sessionKey = parsed ? resolveParsedSessionStoreKey(cfg, canonicalKey, parsed, { storeAgentId: explicitAgentId }).sessionKey : canonicalKey;
		return resolveSessionAgentId({
			config: cfg,
			sessionKey,
			agentId: explicitAgentId
		});
	}
	const parsed = parseAgentSessionKey(canonicalKey);
	return parsed ? normalizeAgentId(parsed.agentId) : resolveLogicalSessionStoreAgentId(cfg, canonicalKey);
}
/** Preserve raw alias ownership and validate the canonical fixed-store boundary together. */
function resolveSessionStoreIdentity(params) {
	const raw = normalizeOptionalString(params.sessionKey) ?? "";
	const requestedAgentId = normalizeOptionalString(params.agentId);
	const parsed = parseAgentSessionKey(raw);
	const sessionKey = parsed ? resolveParsedSessionStoreKey(params.cfg, raw, parsed, { storeAgentId: requestedAgentId }).sessionKey : raw;
	const agentId = resolveSessionStoreAgentId(params.cfg, sessionKey, requestedAgentId);
	const canonicalKey = resolveSessionStoreKey({
		cfg: params.cfg,
		sessionKey,
		storeAgentId: agentId
	});
	resolveSessionStoreAgentId(params.cfg, canonicalKey, agentId);
	return {
		agentId,
		canonicalKey
	};
}
/** Resolve a session key for lookup inside a specific agent's store. */
function resolveStoredSessionKeyForAgentStore(params) {
	const raw = normalizeOptionalString(params.sessionKey) ?? "";
	if (!raw) return raw;
	const lowered = normalizeLowercaseStringOrEmpty(raw);
	if (lowered === "global" || lowered === "unknown") return lowered;
	const parsed = parseAgentSessionKey(raw);
	if (parsed) return canonicalizeParsedSessionStoreKey(params.cfg, raw, parsed, params.agentId, params.preserveQualifiedAddress);
	const persistedOwner = resolvePersistedSessionStoreOwnerForKey(params.cfg, raw);
	if (persistedOwner.kind === "configured" && persistedOwner.agentId === normalizeAgentId(params.agentId) && lowered !== "main" && lowered !== normalizeMainKey(params.cfg.session?.mainKey)) return raw;
	const key = canonicalizeSessionKeyForAgent(params.agentId, raw);
	return resolveSessionStoreKey({
		cfg: params.cfg,
		sessionKey: key,
		storeAgentId: params.agentId
	});
}
/** Existing stored lineage wins; only absence permits the shipped main-alias lookup. */
function selectStoredSessionLineage(params) {
	const agentId = normalizeAgentId(parseAgentSessionKey(params.sessionKey)?.agentId ?? params.agentId);
	const target = {
		cfg: params.cfg,
		agentId,
		sessionKey: params.sessionKey
	};
	const storedKey = resolveStoredSessionKeyForAgentStore({
		...target,
		preserveQualifiedAddress: true
	});
	const value = params.read(agentId, storedKey);
	if (value !== void 0 || isIncognitoSessionKey(storedKey)) return {
		agentId,
		key: storedKey,
		value
	};
	const key = resolveStoredSessionKeyForAgentStore(target);
	return {
		agentId,
		key,
		value: key === storedKey && !params.readAlias ? void 0 : (params.readAlias ?? params.read)(agentId, key)
	};
}
/** Resolve the owner agent for a stored session key, returning null for global/unknown keys. */
function resolveStoredSessionOwnerAgentId(params) {
	const canonicalKey = resolveStoredSessionKeyForAgentStore(params);
	if (canonicalKey === "global" || canonicalKey === "unknown") return null;
	return resolveSessionStoreAgentId(params.cfg, canonicalKey);
}
//#endregion
export { resolveStoredSessionKeyForAgentStore as a, resolveSessionStoreKey as i, resolveSessionStoreAgentId as n, resolveStoredSessionOwnerAgentId as o, resolveSessionStoreIdentity as r, selectStoredSessionLineage as s, canonicalizeSessionKeyForAgent as t };
