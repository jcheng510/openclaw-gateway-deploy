import { o as asDateTimestampMs } from "./number-coercion-Dq1l5muL.mjs";
import { h as normalizeUniqueStringEntries } from "./string-normalization-YMwDjufr.mjs";
import { u as normalizeSecretInputString } from "./types.secrets-BXEuin38.mjs";
import { n as findNormalizedProviderValue, r as normalizeProviderId } from "./provider-id-BIyeXQag.mjs";
import { i as resolveProviderIdForAuth } from "./provider-auth-aliases-jv_ENzum.mjs";
import { r as resolveEffectiveOAuthCredential } from "./oauth-BZC1dWtw.mjs";
import { a as resolveTokenExpiryState, n as evaluateStoredCredentialEligibility, t as DEFAULT_OAUTH_REFRESH_MARGIN_MS } from "./credential-state-BkcsouDD.mjs";
import { a as resolveAuthProfileOrder } from "./order-Du3RLv_J.mjs";
import { t as resolveAuthProfileDisplayLabel } from "./auth-profiles-DCINaNQ4.mjs";
//#region src/agents/auth-health.ts
/**
* Auth profile health summarization.
* Classifies stored and runtime credentials into profile/provider rollups for
* status commands and doctor output without prompting keychain access.
*/
const DEFAULT_OAUTH_WARN_MS = 864e5;
/** Format a remaining-duration value for compact auth status displays. */
function formatRemainingShort(remainingMs, opts) {
	if (remainingMs === void 0 || Number.isNaN(remainingMs)) return "unknown";
	if (remainingMs <= 0) return "0m";
	const minutes = Math.round(remainingMs / 6e4);
	if (minutes < 1) return opts?.underMinuteLabel ?? "1m";
	if (minutes < 60) return `${minutes}m`;
	const hours = Math.round(minutes / 60);
	if (hours < 48) return `${hours}h`;
	return `${Math.round(hours / 24)}d`;
}
function resolveOAuthStatus(expiresAt, now, expiringWithinMs) {
	const normalizedExpiresAt = asDateTimestampMs(expiresAt);
	if (normalizedExpiresAt === void 0 || normalizedExpiresAt <= 0) return { status: "missing" };
	const remainingMs = normalizedExpiresAt - now;
	const expiryState = resolveTokenExpiryState(normalizedExpiresAt, now, { expiringWithinMs });
	if (expiryState === "invalid_expires" || expiryState === "missing") return { status: "missing" };
	if (expiryState === "expired") return {
		status: "expired",
		expiresAt: normalizedExpiresAt,
		remainingMs
	};
	if (expiryState === "expiring") return {
		status: "expiring",
		expiresAt: normalizedExpiresAt,
		remainingMs
	};
	return {
		status: "ok",
		expiresAt: normalizedExpiresAt,
		remainingMs
	};
}
function buildProfileHealth(params) {
	const { profileId, credential, runtimeCredential, store, cfg, now, warnAfterMs, allowKeychainPrompt } = params;
	const label = resolveAuthProfileDisplayLabel({
		cfg,
		store,
		profileId
	});
	const healthCredential = runtimeCredential ?? credential;
	const profile = {
		profileId,
		provider: normalizeProviderId(healthCredential.provider),
		type: healthCredential.type,
		source: "store",
		label
	};
	if (credential.setup?.replacement) return {
		...profile,
		type: credential.type,
		status: "missing",
		reasonCode: "setup_inactive",
		label: `${label} (saved, inactive)`
	};
	const storedEligibility = evaluateStoredCredentialEligibility({
		credential: healthCredential,
		now
	});
	if (!storedEligibility.eligible && (healthCredential.type !== "oauth" || storedEligibility.reasonCode === "unresolved_ref")) return {
		...profile,
		status: storedEligibility.reasonCode === "expired" ? "expired" : "missing",
		reasonCode: storedEligibility.reasonCode
	};
	if (healthCredential.type === "api_key") return {
		...profile,
		status: "static"
	};
	if (healthCredential.type === "token") {
		const expiresAt = resolveTokenExpiryState(healthCredential.expires, now) === "valid" ? healthCredential.expires : void 0;
		if (!expiresAt) return {
			...profile,
			status: "static"
		};
		const { status, expiresAt: normalizedExpiresAt, remainingMs } = resolveOAuthStatus(expiresAt, now, warnAfterMs ?? 864e5);
		return {
			...profile,
			status,
			reasonCode: status === "expired" ? "expired" : void 0,
			expiresAt: normalizedExpiresAt,
			remainingMs
		};
	}
	const effectiveCredential = resolveEffectiveOAuthCredential({
		store,
		profileId,
		credential: healthCredential,
		allowKeychainPrompt
	});
	const eligibility = evaluateStoredCredentialEligibility({
		credential: effectiveCredential,
		now
	});
	if (!eligibility.eligible) return {
		...profile,
		status: eligibility.reasonCode === "expired" ? "expired" : "missing",
		reasonCode: eligibility.reasonCode
	};
	const oauthWarnAfterMs = Math.max(warnAfterMs ?? (normalizeSecretInputString(effectiveCredential.refresh) ? 0 : 864e5), DEFAULT_OAUTH_REFRESH_MARGIN_MS);
	const { status, expiresAt, remainingMs } = resolveOAuthStatus(effectiveCredential.expires, now, oauthWarnAfterMs);
	return {
		...profile,
		status,
		expiresAt,
		remainingMs
	};
}
/** Build profile and provider auth health rollups from an auth profile store. */
function buildAuthHealthSummary(params) {
	const now = Date.now();
	const warnAfterMs = params.warnAfterMs ?? 864e5;
	const providerFilter = params.providers ? new Set(normalizeUniqueStringEntries(params.providers.map((p) => normalizeProviderId(p)))) : null;
	const profiles = Object.entries(params.store.profiles).filter(([, cred]) => providerFilter ? providerFilter.has(normalizeProviderId(cred.provider)) : true).map(([profileId, credential]) => buildProfileHealth({
		profileId,
		credential,
		runtimeCredential: params.runtimeCredentialsByProvider?.get(normalizeProviderId(credential.provider)),
		store: params.store,
		cfg: params.cfg,
		now,
		warnAfterMs: params.warnAfterMs,
		allowKeychainPrompt: params.allowKeychainPrompt
	})).toSorted((a, b) => {
		if (a.provider !== b.provider) return a.provider.localeCompare(b.provider);
		return a.profileId.localeCompare(b.profileId);
	});
	const providersMap = /* @__PURE__ */ new Map();
	for (const profile of profiles) {
		const existing = providersMap.get(profile.provider);
		if (!existing) providersMap.set(profile.provider, {
			provider: profile.provider,
			status: "missing",
			profiles: [profile]
		});
		else existing.profiles.push(profile);
	}
	if (providerFilter) {
		for (const provider of providerFilter) if (!providersMap.has(provider)) providersMap.set(provider, {
			provider,
			status: "missing",
			profiles: []
		});
	}
	const resolveExplicitAuthOrder = (provider) => {
		const authProvider = resolveProviderIdForAuth(provider, {
			config: params.cfg,
			...params.authAliasLookupParams,
			storedCredential: true
		});
		return findNormalizedProviderValue(params.store.order, authProvider) ?? findNormalizedProviderValue(params.store.order, provider) ?? findNormalizedProviderValue(params.cfg?.auth?.order, authProvider) ?? findNormalizedProviderValue(params.cfg?.auth?.order, provider);
	};
	const resolveProviderStatusProfiles = (provider) => {
		const explicitOrder = resolveExplicitAuthOrder(provider.provider);
		if (explicitOrder && explicitOrder.length === 0) return [];
		const orderedProfiles = resolveAuthProfileOrder({
			cfg: params.cfg,
			store: params.store,
			provider: provider.provider,
			authAliasLookupParams: params.authAliasLookupParams
		}).map((profileId) => provider.profiles.find((profile) => profile.profileId === profileId)).filter((profile) => Boolean(profile));
		if (orderedProfiles.length > 0) return orderedProfiles;
		if (explicitOrder) return explicitOrder.map((profileId) => provider.profiles.find((profile) => profile.profileId === profileId)).filter((profile) => Boolean(profile));
		return provider.profiles;
	};
	for (const provider of providersMap.values()) {
		const effectiveProfiles = resolveProviderStatusProfiles(provider);
		provider.effectiveProfiles = effectiveProfiles;
		if (effectiveProfiles.length === 0) {
			provider.status = "missing";
			provider.expiresAt = void 0;
			provider.remainingMs = void 0;
			continue;
		}
		let hasApiKeyProfile = false;
		let hasExpirableProfile = false;
		let hasExpired = false;
		let hasMissing = false;
		let hasExpiring = false;
		let earliestExpiry;
		for (const profile of effectiveProfiles) {
			if (profile.type === "api_key") {
				if (profile.status === "static") hasApiKeyProfile = true;
				else if (profile.status === "missing") hasMissing = true;
				continue;
			}
			if (profile.type !== "oauth" && profile.type !== "token") continue;
			hasExpirableProfile = true;
			if (typeof profile.expiresAt === "number" && Number.isFinite(profile.expiresAt)) earliestExpiry = earliestExpiry === void 0 ? profile.expiresAt : Math.min(earliestExpiry, profile.expiresAt);
			if (profile.status === "expired") hasExpired = true;
			else if (profile.status === "missing") hasMissing = true;
			else if (profile.status === "expiring") hasExpiring = true;
		}
		if (!hasExpirableProfile) {
			provider.status = hasMissing ? "missing" : hasApiKeyProfile ? "static" : "missing";
			continue;
		}
		if (earliestExpiry !== void 0) {
			provider.expiresAt = earliestExpiry;
			provider.remainingMs = provider.expiresAt - now;
		}
		if (hasExpired) provider.status = "expired";
		else if (hasMissing) provider.status = "missing";
		else if (hasExpiring) provider.status = "expiring";
		else provider.status = "ok";
	}
	return {
		now,
		warnAfterMs,
		profiles,
		providers: Array.from(providersMap.values()).toSorted((a, b) => a.provider.localeCompare(b.provider))
	};
}
//#endregion
export { buildAuthHealthSummary as n, formatRemainingShort as r, DEFAULT_OAUTH_WARN_MS as t };
