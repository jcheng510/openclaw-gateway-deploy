import { t as appendConfigPathSegment } from "./dot-path-CVD5Jolm.mjs";
import { a as coerceSecretRef } from "./types.secrets-BXEuin38.mjs";
import { r as normalizeProviderId } from "./provider-id-BIyeXQag.mjs";
import { f as resolveConfigSecretRef, l as getResolvedConfigEnvSecretRef } from "./resolution-facts-CYe39-eJ.mjs";
import { n as getShellEnvAppliedKeys } from "./shell-env-CveuoxyC.mjs";
import { o as resolveMergedModelProviderEntry } from "./model-provider-config-DvzubVfQ.mjs";
import { d as hashRuntimeConfigValue, l as getRuntimeConfigSourceSnapshot, o as getRuntimeConfigSnapshot } from "./runtime-snapshot-BHGp6OxI.mjs";
import { n as SecretSurfaceUnavailableError } from "./runtime-degraded-state-oevwKU3u.mjs";
import { n as normalizeSecretInput, t as normalizeOptionalSecretInput } from "./normalize-secret-input-DBJvdk-L.mjs";
import { n as isStoredCredentialCompatibleWithAuthProvider, t as isConfiguredAwsSdkAuthProfileForProvider } from "./order-Du3RLv_J.mjs";
import { l as readInlineProviderApiKeyUsage } from "./usage-state-kWjx8QAa.mjs";
import { t as canResolveEnvSecretRefInReadOnlyPath } from "./secret-ref-readonly.internal-qsdt7vnj.mjs";
import { t as NON_ENV_SECRETREF_MARKER } from "./provider-credential-values-Cf7LMsFg.mjs";
import { a as SECRETREF_ENV_HEADER_MARKER_PREFIX, n as CUSTOM_LOCAL_AUTH_MARKER, o as isKnownEnvApiKeyMarker, s as isNonSecretApiKeyMarker } from "./model-auth-markers-D2C6UTDZ.mjs";
import { t as resolveEnvApiKey } from "./model-auth-env-D6-JZ2i2.mjs";
import { c as mintSecretSentinel } from "./sentinel-CMYxtrjh.mjs";
import { t as isLocalProviderBaseUrl } from "./model-provider-local-LVnoMHLm.mjs";
import { isDeepStrictEqual } from "node:util";
//#region src/agents/model-auth-runtime-shared.ts
/**
* Shared provider-auth runtime types and errors. Provider calls use these
* helpers to fail with actionable auth provenance while keeping secret
* normalization local.
*/
const AWS_BEARER_ENV = "AWS_BEARER_TOKEN_BEDROCK";
const AWS_ACCESS_KEY_ENV = "AWS_ACCESS_KEY_ID";
const AWS_SECRET_KEY_ENV = "AWS_SECRET_ACCESS_KEY";
const AWS_PROFILE_ENV = "AWS_PROFILE";
function resolveDirectProviderCredentialMode(params) {
	const configuredMode = resolveMergedModelProviderEntry(params.cfg, params.provider)?.providerConfig.auth;
	return configuredMode === "oauth" || configuredMode === "token" ? configuredMode : params.inferredMode;
}
/** Base provider auth error with a stable code for retry/fallback logic. */
var ProviderAuthError = class extends Error {
	constructor(code, provider, message, options) {
		super(message);
		this.name = "ProviderAuthError";
		this.code = code;
		this.provider = provider;
		this.providerGuidance = options?.providerGuidance === true;
	}
};
/** Auth error raised when a resolved provider auth source lacks usable material. */
var MissingProviderAuthError = class extends ProviderAuthError {
	constructor(provider, auth) {
		super("missing-api-key", provider, formatMissingAuthError(auth, provider));
		this.name = "MissingProviderAuthError";
		this.mode = auth.mode;
		this.source = auth.source;
	}
};
/** Narrow unknown errors to provider auth errors, optionally by code. */
function isProviderAuthError(err, code) {
	return err instanceof ProviderAuthError && (!code || err.code === code);
}
/** Narrow unknown errors to missing-provider-auth failures. */
function isMissingProviderAuthError(err) {
	return err instanceof MissingProviderAuthError;
}
/** Return the AWS credential env var that proves SDK auth is configured. */
function resolveAwsSdkEnvVarName(env = process.env) {
	if (env[AWS_BEARER_ENV]?.trim()) return AWS_BEARER_ENV;
	if (env[AWS_ACCESS_KEY_ENV]?.trim() && env[AWS_SECRET_KEY_ENV]?.trim()) return AWS_ACCESS_KEY_ENV;
	if (env[AWS_PROFILE_ENV]?.trim()) return AWS_PROFILE_ENV;
}
/** Format the user-facing missing-auth error from auth provenance. */
function formatMissingAuthError(auth, provider) {
	return `No API key resolved for provider "${provider}" (auth mode: ${auth.mode}, checked: ${auth.source}).`;
}
/** Require a normalized API key or throw a provider-auth error. */
function requireApiKey(auth, provider) {
	const key = normalizeSecretInput(auth.apiKey);
	if (key) return key;
	throw new MissingProviderAuthError(provider, auth);
}
//#endregion
//#region src/agents/model-auth-provider-config.ts
/**
* Provider-entry configuration and stored-profile binding for model auth.
*/
const MODEL_AUTH_LOCAL_HOST_ALIASES = /* @__PURE__ */ new Set([
	"docker.orb.internal",
	"host.docker.internal",
	"host.orb.internal"
]);
function projectResolvedProfileAuth(params) {
	const credential = params.store.profiles[params.profileId];
	return {
		apiKey: (credential?.type === "api_key" ? coerceSecretRef(credential.keyRef) : credential?.type === "token" ? coerceSecretRef(credential.tokenRef) : null) && params.enabled ? mintSecretSentinel(params.apiKey, { label: `model-auth:${params.provider}` }) : params.apiKey,
		profileId: params.profileId,
		source: `profile:${params.profileId}`,
		mode: params.mode,
		...params.authFlow ? { authFlow: params.authFlow } : {}
	};
}
function resolveConfigAwareEnvApiKey(cfg, provider, workspaceDir, skipSetupProviderFallback) {
	return resolveEnvApiKey(provider, process.env, {
		config: cfg,
		workspaceDir,
		...skipSetupProviderFallback ? { skipSetupProviderFallback: true } : {}
	});
}
function resolveProviderConfig(cfg, provider) {
	return resolveMergedModelProviderEntry(cfg, provider)?.providerConfig;
}
function resolveProviderSourceConfig(cfg, provider) {
	const source = getRuntimeConfigSourceSnapshot();
	if (cfg === source) return cfg;
	return providerConfigMatchesRuntimeSnapshot({
		inputConfig: cfg,
		runtimeConfig: getRuntimeConfigSnapshot(),
		provider
	}) ? source ?? cfg : cfg;
}
/** Keeps authored references distinct from opaque bytes in a matching runtime provider. */
function resolveProviderConfigSecretInput(cfg, provider, sourceConfig = resolveProviderSourceConfig(cfg, provider)) {
	const entry = resolveMergedModelProviderEntry(sourceConfig, provider);
	const path = entry ? `${appendConfigPathSegment("models.providers", entry.providerKey)}.apiKey` : "";
	const resolvedEnvRef = entry ? getResolvedConfigEnvSecretRef(sourceConfig, path) : null;
	return {
		providerConfig: resolveProviderConfig(cfg, provider),
		resolvedEnvRef,
		ref: entry ? resolvedEnvRef ?? resolveConfigSecretRef({
			config: sourceConfig,
			path,
			value: entry.providerConfig.apiKey,
			defaults: sourceConfig?.secrets?.defaults
		}) : null
	};
}
/** Reads a literal or env-secret marker for a custom provider entry. */
function getCustomProviderApiKey(cfg, provider) {
	const { providerConfig, ref } = resolveProviderConfigSecretInput(cfg, provider);
	if (!ref) return normalizeOptionalSecretInput(providerConfig?.apiKey);
	if (ref.source === "env") return ref.id.trim() || "secretref-managed";
	return NON_ENV_SECRETREF_MARKER;
}
/** Resolves custom provider API keys that are usable without mutating secret stores. */
function resolveUsableCustomProviderApiKey(params) {
	const input = resolveProviderConfigSecretInput(params.cfg, params.provider);
	const { providerConfig: customProviderConfig, ref: apiKeyRef } = input;
	if (apiKeyRef) {
		const envVarName = apiKeyRef.source === "env" ? apiKeyRef.id.trim() : "";
		if (!envVarName) return null;
		if (!(input.resolvedEnvRef || canResolveEnvSecretRefInReadOnlyPath({
			cfg: params.cfg,
			provider: apiKeyRef.provider,
			id: envVarName
		}))) return null;
		const envValue = normalizeOptionalSecretInput(input.resolvedEnvRef ? customProviderConfig?.apiKey : (params.env ?? process.env)[envVarName]);
		if (!envValue) return null;
		const source = input.resolvedEnvRef ? "models.json" : resolveEnvSourceLabel([envVarName], `${envVarName} (models.json secretref)`);
		return {
			apiKey: params.secretSentinels ? mintSecretSentinel(envValue, { label: `model-auth:${params.provider}` }) : envValue,
			source
		};
	}
	const customKey = normalizeOptionalSecretInput(customProviderConfig?.apiKey);
	if (!customKey) return null;
	if (!isNonSecretApiKeyMarker(customKey)) return {
		apiKey: customKey,
		source: "models.json"
	};
	if (isKnownEnvApiKeyMarker(customKey)) {
		const envValue = normalizeOptionalSecretInput((params.env ?? process.env)[customKey]);
		if (!envValue) return null;
		return {
			apiKey: envValue,
			source: resolveEnvSourceLabel([customKey], `${customKey} (models.json marker)`)
		};
	}
	if (customProviderConfig && isCustomLocalProviderConfig(customProviderConfig) && (customProviderConfig.api === "openai-completions" || customProviderConfig.api === "ollama") && customProviderConfig.baseUrl && isLocalAuthProviderBaseUrl(customProviderConfig.baseUrl)) return {
		apiKey: customProviderConfig.api === "ollama" ? customKey : CUSTOM_LOCAL_AUTH_MARKER,
		source: "models.json (local marker)"
	};
	return null;
}
/** True when a custom provider has a literal/env/local key available now. */
const hasUsableCustomProviderApiKey = (cfg, provider, env) => Boolean(resolveUsableCustomProviderApiKey({
	cfg,
	provider,
	env
}));
/** True when explicit provider config should outrank profile/environment auth. */
function shouldPreferExplicitConfigApiKeyAuth(cfg, provider) {
	const providerConfig = resolveProviderConfig(cfg, provider);
	return resolveProviderAuthOverride(cfg, provider) === "api-key" && providerConfig !== void 0 && hasExplicitProviderApiKeyConfig(providerConfig);
}
/** True when configured or prepared route facts prove a local no-auth provider. */
function hasSyntheticLocalProviderAuthConfig(params) {
	const providerConfig = resolveProviderConfig(params.cfg, params.provider);
	const authOverride = resolveProviderAuthOverride(params.cfg, params.provider);
	if (authOverride && authOverride !== "api-key") return false;
	if (!params.route && (!providerConfig || !isCustomLocalProviderConfig(providerConfig)) || providerConfig !== void 0 && hasExplicitProviderApiKeyConfig(providerConfig)) return false;
	const route = params.route ?? providerConfig;
	return typeof route?.api === "string" && route.api.trim().length > 0 && typeof route.baseUrl === "string" && isLocalAuthProviderBaseUrl(route.baseUrl);
}
function resolveProviderAuthOverride(cfg, provider) {
	const auth = resolveProviderConfig(cfg, provider)?.auth;
	if (auth === "api-key" || auth === "aws-sdk" || auth === "oauth" || auth === "token") return auth;
}
function shouldUseImplicitAwsSdkAuth(params) {
	if (params.modelApi !== "bedrock-converse-stream") return false;
	if (normalizeProviderId(params.provider) !== "amazon-bedrock") return false;
	const providerConfig = resolveProviderConfig(params.cfg, params.provider);
	return resolveProviderAuthOverride(params.cfg, params.provider) === void 0 && (providerConfig === void 0 || !hasExplicitProviderApiKeyConfig(providerConfig));
}
function profileTypeToAuthMode(type) {
	return type === "oauth" ? "oauth" : type === "token" ? "token" : "api-key";
}
function normalizeProviderEntryBaseUrlForBinding(baseUrl) {
	const trimmed = baseUrl?.trim();
	if (!trimmed) return;
	try {
		const parsed = new URL(trimmed);
		parsed.hash = "";
		parsed.search = "";
		parsed.pathname = parsed.pathname.replace(/\/+$/, "");
		return parsed.toString().replace(/\/+$/, "");
	} catch {
		return trimmed.toLowerCase().replace(/\/+$/, "");
	}
}
function providerEntriesShareBaseUrl(params) {
	const providerBaseUrl = normalizeProviderEntryBaseUrlForBinding(resolveProviderConfig(params.cfg, params.provider)?.baseUrl);
	const credentialProviderBaseUrl = normalizeProviderEntryBaseUrlForBinding(resolveProviderConfig(params.cfg, params.credentialProvider)?.baseUrl);
	return Boolean(providerBaseUrl && credentialProviderBaseUrl && providerBaseUrl === credentialProviderBaseUrl);
}
function isBearerProfileCredential(credential) {
	return credential.type === "api_key" || credential.type === "token";
}
/** True when a bearer auth profile can safely satisfy a provider-entry apiKey reference. */
function canUseProfileAsProviderEntryApiKey(params) {
	if (!isBearerProfileCredential(params.credential)) return false;
	if (isStoredCredentialCompatibleWithAuthProvider({
		cfg: params.cfg,
		authAliasLookupParams: params.authAliasLookupParams,
		provider: params.provider,
		credential: params.credential
	})) return true;
	return providerEntriesShareBaseUrl({
		cfg: params.cfg,
		provider: params.provider,
		credentialProvider: params.credential.provider
	});
}
/** Classifies a provider entry apiKey as literal/profile/marker before resolving secrets. */
function resolveProviderEntryApiKeyProfileReference(params) {
	const { providerConfig, ref } = resolveProviderConfigSecretInput(params.cfg, params.provider, params.sourceConfig);
	if (ref) return { kind: "none" };
	const perEntryRawKey = normalizeOptionalSecretInput(providerConfig?.apiKey);
	if (!perEntryRawKey) return { kind: "none" };
	if (isNonSecretApiKeyMarker(perEntryRawKey)) return {
		kind: "marker",
		evidence: isKnownEnvApiKeyMarker(perEntryRawKey) ? "environment" : "synthetic"
	};
	const credential = params.store.profiles[perEntryRawKey];
	if (!credential) return {
		kind: "literal",
		apiKey: perEntryRawKey,
		source: "models.json"
	};
	const reason = !isBearerProfileCredential(credential) ? "credential-class" : !canUseProfileAsProviderEntryApiKey({
		cfg: params.cfg,
		authAliasLookupParams: params.authAliasLookupParams,
		provider: params.provider,
		credential
	}) ? "provider-binding" : void 0;
	if (reason) return {
		kind: "profile-incompatible",
		profileId: perEntryRawKey,
		credentialProvider: credential.provider,
		credentialType: credential.type,
		reason
	};
	return {
		kind: "profile",
		profileId: perEntryRawKey,
		credential,
		mode: profileTypeToAuthMode(credential.type)
	};
}
/** Resolves a provider-entry apiKey profile reference into runtime auth when possible. */
async function resolveProviderEntryApiKeyBinding(params) {
	params.signal?.throwIfAborted();
	const reference = resolveProviderEntryApiKeyProfileReference(params);
	if (reference.kind === "none" || reference.kind === "marker") return { kind: "none" };
	if (reference.kind === "literal" || reference.kind === "profile-incompatible") return reference;
	try {
		const { resolveApiKeyForProfile } = await import("./oauth-Ic3A1cC2.mjs");
		const resolved = await resolveApiKeyForProfile({
			cfg: params.cfg,
			store: params.store,
			profileId: reference.profileId,
			agentDir: params.agentDir,
			signal: params.signal
		});
		params.signal?.throwIfAborted();
		if (!resolved) return {
			kind: "profile-unresolved",
			profileId: reference.profileId
		};
		const resolvedProfileId = resolved.profileId ?? reference.profileId;
		const credential = resolved.credential ?? reference.credential;
		return {
			kind: "profile-resolved",
			auth: projectResolvedProfileAuth({
				apiKey: resolved.apiKey,
				enabled: params.secretSentinels,
				profileId: resolvedProfileId,
				provider: params.provider,
				store: params.store,
				mode: resolved.profileType ? profileTypeToAuthMode(resolved.profileType) : reference.mode,
				authFlow: credential.type === "oauth" ? credential.authFlow : void 0
			})
		};
	} catch (err) {
		params.signal?.throwIfAborted();
		if (err instanceof SecretSurfaceUnavailableError) throw err;
		return {
			kind: "profile-unresolved",
			profileId: reference.profileId,
			error: err
		};
	}
}
function resolveConfiguredAwsSdkProfileAuth(params) {
	if (!isConfiguredAwsSdkAuthProfileForProvider(params)) return null;
	return {
		...resolveAwsSdkAuthInfo(),
		profileId: params.profileId,
		source: `profile:${params.profileId}`
	};
}
function isLocalAuthProviderBaseUrl(baseUrl) {
	return isLocalProviderBaseUrl(baseUrl, MODEL_AUTH_LOCAL_HOST_ALIASES);
}
function hasExplicitProviderApiKeyConfig(providerConfig) {
	return normalizeOptionalSecretInput(providerConfig.apiKey) !== void 0 || coerceSecretRef(providerConfig.apiKey) !== null;
}
function isInlineProviderApiKeySource(source) {
	return source === "models.json" || source.endsWith(" (models.json secretref)") || source.endsWith(" (models.json marker)");
}
/** True when a resolved credential came from an inline `models.providers.<id>.apiKey`. */
function isConfigBackedInlineProviderApiKey(params) {
	if (isInlineProviderApiKeySource(params.source)) return true;
	const { providerConfig, ref } = resolveProviderConfigSecretInput(params.cfg, params.provider);
	if (!providerConfig || !hasExplicitProviderApiKeyConfig(providerConfig)) return false;
	if (ref) return true;
	const perEntryRawKey = normalizeOptionalSecretInput(providerConfig.apiKey);
	return Boolean(perEntryRawKey && !params.store?.profiles[perEntryRawKey]);
}
function resolveInlineProviderApiKeyCooldownUntil(store, provider) {
	return readInlineProviderApiKeyUsage(store, provider).unusableUntil;
}
/** Fails closed while an inline provider API key is inside its billing/auth cooldown. */
function assertInlineProviderApiKeyUsable(params) {
	const unusableUntil = resolveInlineProviderApiKeyCooldownUntil(params.store, params.provider);
	if (typeof unusableUntil !== "number" || unusableUntil <= Date.now()) return;
	const waitMs = Math.max(0, unusableUntil - Date.now());
	const waitMinutes = Math.max(1, Math.ceil(waitMs / 6e4));
	throw new Error(`Inline API key for provider "${params.provider}" is temporarily disabled after a provider auth/billing failure. Retry after about ${waitMinutes} minute${waitMinutes === 1 ? "" : "s"}, or switch to a different auth profile/API key.`);
}
function isCustomLocalProviderConfig(providerConfig) {
	return typeof providerConfig.baseUrl === "string" && providerConfig.baseUrl.trim().length > 0 && typeof providerConfig.api === "string" && providerConfig.api.trim().length > 0 && Array.isArray(providerConfig.models) && providerConfig.models.length > 0;
}
function isManagedSecretRefApiKeyMarker(apiKey) {
	return apiKey?.trim() === NON_ENV_SECRETREF_MARKER;
}
function hasSecretRefProviderApiKey(cfg, provider) {
	const { providerConfig, ref } = resolveProviderConfigSecretInput(cfg, provider);
	const apiKey = providerConfig?.apiKey;
	if (ref) return true;
	return typeof apiKey === "string" && (isManagedSecretRefApiKeyMarker(apiKey) || apiKey.trim().startsWith("secretref-env:"));
}
function providerConfigMatchesRuntimeSnapshot(params) {
	const inputProvider = resolveProviderConfig(params.inputConfig, params.provider);
	const runtimeProvider = resolveProviderConfig(params.runtimeConfig ?? void 0, params.provider);
	const toComparableConfig = (providerConfig) => ({ models: { providers: { [params.provider]: providerConfig } } });
	return inputProvider && runtimeProvider ? params.inputConfig === params.runtimeConfig || inputProvider === runtimeProvider || isDeepStrictEqual(inputProvider, runtimeProvider) || hashRuntimeConfigValue(toComparableConfig(inputProvider)) === hashRuntimeConfigValue(toComparableConfig(runtimeProvider)) : false;
}
function sentinelizeConfigSecretRefEnvApiKey(params) {
	if (!params.enabled) return params.apiKey;
	const configured = resolveProviderConfig(resolveProviderSourceConfig(params.cfg, params.provider), params.provider)?.apiKey;
	const ref = coerceSecretRef(configured);
	const envId = ref?.source === "env" ? ref.id : typeof configured === "string" && configured.trim().startsWith("secretref-env:") ? configured.trim().slice(SECRETREF_ENV_HEADER_MARKER_PREFIX.length) : void 0;
	return envId && params.source.includes(envId) ? mintSecretSentinel(params.apiKey, { label: `model-auth:${params.provider}` }) : params.apiKey;
}
function resolveRuntimeProviderConfigApiKeyAuth(params) {
	const { providerConfig, ref } = resolveProviderConfigSecretInput(params.cfg, params.provider);
	const sourceRef = resolveProviderConfigSecretInput(params.sourceConfig, params.provider).ref;
	const apiKey = sourceRef ? providerConfig?.apiKey : ref ? void 0 : normalizeOptionalSecretInput(providerConfig?.apiKey);
	if (typeof apiKey !== "string" || !apiKey.trim() || !sourceRef && isNonSecretApiKeyMarker(apiKey)) return;
	return {
		apiKey,
		source: `models.providers.${params.provider}`,
		mode: resolveDirectProviderCredentialMode({
			cfg: params.cfg,
			provider: params.provider,
			inferredMode: "api-key"
		})
	};
}
function resolveEnvSourceLabel(envVars, label = envVars.join(" + ")) {
	const applied = new Set(getShellEnvAppliedKeys());
	return `${envVars.some((envVar) => applied.has(envVar)) ? "shell env: " : "env: "}${label}`;
}
function resolveAwsSdkAuthInfo() {
	const envVar = resolveAwsSdkEnvVarName();
	return {
		mode: "aws-sdk",
		source: envVar ? resolveEnvSourceLabel(envVar === "AWS_ACCESS_KEY_ID" ? [envVar, "AWS_SECRET_ACCESS_KEY"] : envVar ? [envVar] : []) : "aws-sdk default chain"
	};
}
//#endregion
export { isProviderAuthError as A, sentinelizeConfigSecretRefEnvApiKey as C, ProviderAuthError as D, MissingProviderAuthError as E, resolveAwsSdkEnvVarName as M, resolveDirectProviderCredentialMode as N, formatMissingAuthError as O, resolveUsableCustomProviderApiKey as S, shouldUseImplicitAwsSdkAuth as T, resolveProviderConfig as _, hasSyntheticLocalProviderAuthConfig as a, resolveProviderEntryApiKeyProfileReference as b, isManagedSecretRefApiKeyMarker as c, providerConfigMatchesRuntimeSnapshot as d, resolveAwsSdkAuthInfo as f, resolveProviderAuthOverride as g, resolveInlineProviderApiKeyCooldownUntil as h, hasSecretRefProviderApiKey as i, requireApiKey as j, isMissingProviderAuthError as k, profileTypeToAuthMode as l, resolveConfiguredAwsSdkProfileAuth as m, canUseProfileAsProviderEntryApiKey as n, hasUsableCustomProviderApiKey as o, resolveConfigAwareEnvApiKey as p, getCustomProviderApiKey as r, isConfigBackedInlineProviderApiKey as s, assertInlineProviderApiKeyUsable as t, projectResolvedProfileAuth as u, resolveProviderConfigSecretInput as v, shouldPreferExplicitConfigApiKeyAuth as w, resolveRuntimeProviderConfigApiKeyAuth as x, resolveProviderEntryApiKeyBinding as y };
