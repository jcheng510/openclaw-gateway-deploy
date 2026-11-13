import { l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import { l as resolveAgentIdFromSessionKey } from "./session-key-BC4m_Ly5.mjs";
import { u as resolveSessionLifecycleTimestamps } from "./lifecycle-DlS-bWdU.mjs";
import { l as resolveSessionStorePathCore } from "./paths-CQ3zRaeb.mjs";
import { n as getCliSessionBinding } from "./cli-session-binding-Xt6nY3mk.mjs";
import { c as loadSessionEntryReadOnly } from "./session-accessor.sqlite-entry-C87Sde4p.mjs";
import "./session-accessor-CGLseszP.mjs";
import { n as resolveSessionResetPolicy, t as evaluateSessionFreshness } from "./reset-policy-CD3R4vnQ.mjs";
import "./reset-ww_2Qzne.mjs";
//#region src/config/sessions/entry-freshness.ts
function hasProviderOwnedSession(entry) {
	const provider = normalizeOptionalString(entry?.providerOverride ?? entry?.modelProvider);
	return Boolean(provider && getCliSessionBinding(entry, provider));
}
/** Resolves one session entry's reset freshness using the runtime lifecycle rules. */
function resolveSessionEntryResetFreshness(params) {
	const agentId = params.agentId ?? resolveAgentIdFromSessionKey(params.sessionKey, params.defaultAgentId);
	const sessionCfg = params.sessionCfg;
	const storePath = params.storePath ?? resolveSessionStorePathCore(sessionCfg?.store, {
		agentId,
		env: params.env
	});
	const entry = loadSessionEntryReadOnly({
		...params,
		agentId,
		storePath
	});
	const resetType = params.resetType;
	const resetPolicy = resolveSessionResetPolicy({
		sessionCfg,
		resetType,
		resetOverride: params.resetOverride
	});
	const lifecycleTimestamps = resolveSessionLifecycleTimestamps({
		entry,
		agentId,
		sessionKey: params.sessionKey,
		storePath
	});
	const base = {
		lifecycleTimestamps,
		resetPolicy,
		resetType
	};
	if (!entry) return {
		state: "missing",
		entry: void 0,
		freshness: void 0,
		...base
	};
	const freshness = resetPolicy.configured !== true && hasProviderOwnedSession(entry) ? { fresh: true } : evaluateSessionFreshness({
		updatedAt: entry.updatedAt,
		sessionStartedAt: lifecycleTimestamps.sessionStartedAt,
		lastInteractionAt: lifecycleTimestamps.lastInteractionAt,
		now: params.now ?? Date.now(),
		policy: resetPolicy
	});
	return {
		state: freshness.fresh ? "fresh" : "stale",
		entry,
		freshness,
		...base
	};
}
//#endregion
export { resolveSessionEntryResetFreshness as n, hasProviderOwnedSession as t };
