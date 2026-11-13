import { o as normalizeLowercaseStringOrEmpty } from "../string-coerce-6kR-86XC.mjs";
import { C as resolveRuntimeConfigCacheKey } from "../runtime-snapshot-BHGp6OxI.mjs";
import { d as getActivePluginRegistryVersion } from "../runtime-BnZb2P5v.mjs";
import { r as logVerbose } from "../globals-ChjEJkWj.mjs";
import { S as getActiveRuntimeWebToolsMetadataFromState } from "../runtime-state-I0A0iuwu.mjs";
import { n as sortPluginEntriesForAutoDetect } from "../plugin-entry-order-DxrT0ucv.mjs";
import { n as resolveRuntimeWebFetchProviders, t as resolvePluginWebFetchProviders } from "../web-fetch-providers.runtime-ChuIuUb1.mjs";
import { i as resolveWebProviderConfig, n as providerRequiresCredential, r as readWebProviderEnvValue, t as hasWebProviderEntryCredential } from "../provider-runtime-shared-Cez32igX.mjs";
//#region src/web-fetch/runtime.ts
const webFetchProviderCache = /* @__PURE__ */ new WeakMap();
function resolveFetchConfig(config) {
	return resolveWebProviderConfig(config, "fetch");
}
function hasEntryCredential(provider, config, fetch) {
	return hasWebProviderEntryCredential({
		provider,
		config,
		toolConfig: fetch,
		resolveRawValue: ({ provider: currentProvider, config: currentConfig }) => currentProvider.getConfiguredCredentialValue?.(currentConfig),
		resolveFallbackRawValue: ({ provider: currentProvider, config: currentConfig }) => currentProvider.getConfiguredCredentialFallback?.(currentConfig)?.value,
		resolveEnvValue: ({ provider: currentProvider }) => readWebProviderEnvValue(currentProvider.envVars)
	});
}
/** Reports whether a web_fetch provider has usable credentials. */
function isWebFetchProviderConfigured(params) {
	return hasEntryCredential(params.provider, params.config, resolveFetchConfig(params.config));
}
/** Lists web_fetch providers available to runtime selection. */
function listWebFetchProviders(params) {
	return resolvePluginWebFetchProviders({ config: params?.config });
}
/** Auto-detects a web_fetch provider after explicit selections have been resolved. */
function resolveAutoWebFetchProviderId(params) {
	const raw = params.fetch && "provider" in params.fetch ? normalizeLowercaseStringOrEmpty(params.fetch.provider) : "";
	for (const provider of params.providers) {
		if (!providerRequiresCredential(provider)) {
			if (!hasEntryCredential({
				...provider,
				requiresCredential: true
			}, params.config, params.fetch)) continue;
			logVerbose(`web_fetch: ${raw ? `invalid configured provider "${raw}", ` : ""}auto-detected keyless provider "${provider.id}"`);
			return provider.id;
		}
		if (!hasEntryCredential(provider, params.config, params.fetch)) continue;
		logVerbose(`web_fetch: ${raw ? `invalid configured provider "${raw}", ` : ""}auto-detected "${provider.id}" from available API keys`);
		return provider.id;
	}
	return "";
}
function resolveConfiguredWebFetchProviderId(params) {
	const raw = params.fetch && "provider" in params.fetch ? normalizeLowercaseStringOrEmpty(params.fetch.provider) : "";
	if (!raw) return;
	return params.providers.find((provider) => provider.id === raw)?.id;
}
function resolveWebFetchProviderCacheKey(options) {
	return JSON.stringify([
		getActivePluginRegistryVersion(),
		options?.sandboxed === true,
		options?.preferRuntimeProviders === true
	]);
}
function resolveCachedWebFetchProviders(params) {
	const cached = webFetchProviderCache.get(params.config);
	if (cached?.cacheKey === params.cacheKey && cached.configFingerprint === params.configFingerprint) return cached.providers;
	const loaded = params.load();
	if (loaded.length > 0) webFetchProviderCache.set(params.config, {
		cacheKey: params.cacheKey,
		configFingerprint: params.configFingerprint,
		providers: loaded
	});
	return loaded;
}
function resolveWebFetchProvidersForOptions(options) {
	const load = () => sortPluginEntriesForAutoDetect(options?.sandboxed ? resolvePluginWebFetchProviders({
		config: options?.config,
		sandboxed: true
	}) : options?.preferRuntimeProviders ? resolveRuntimeWebFetchProviders({ config: options?.config }) : resolvePluginWebFetchProviders({ config: options?.config }));
	if (options?.config) return resolveCachedWebFetchProviders({
		config: options.config,
		cacheKey: resolveWebFetchProviderCacheKey(options),
		configFingerprint: resolveRuntimeConfigCacheKey(options.config),
		load
	});
	return load();
}
/** Resolves the executable web_fetch provider tool definition. */
function resolveWebFetchDefinition(options) {
	const fetch = resolveFetchConfig(options?.config);
	if (fetch?.enabled === false) return null;
	const runtimeWebFetch = options?.runtimeWebFetch ?? getActiveRuntimeWebToolsMetadataFromState()?.fetch;
	const providers = resolveWebFetchProvidersForOptions(options);
	if (providers.length === 0) return null;
	const providerId = options?.providerId ?? resolveConfiguredWebFetchProviderId({
		fetch,
		providers
	}) ?? runtimeWebFetch?.selectedProvider ?? resolveAutoWebFetchProviderId({
		config: options?.config,
		fetch,
		providers
	});
	const provider = providers.find((entry) => entry.id === providerId);
	if (!provider) return null;
	const definition = provider.createTool({
		config: options?.config,
		fetchConfig: fetch,
		runtimeMetadata: runtimeWebFetch
	});
	return definition ? {
		provider,
		definition
	} : null;
}
//#endregion
export { isWebFetchProviderConfigured, listWebFetchProviders, resolveWebFetchDefinition };
