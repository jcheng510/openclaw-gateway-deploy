import { D as withPluginCache, a as createPluginCache } from "./plugin-cache-DK2CPN_y.mjs";
import { t as _usingCtx } from "./usingCtx-DwOBYOJf.mjs";
import { r as normalizeProviderId } from "./provider-id-BIyeXQag.mjs";
import { r as enablePluginWithCapabilityConsent } from "./enable-HVz6bNGE.mjs";
import { r as withPluginLifecycleLease } from "./plugin-lifecycle-lease-BgmqKrMY.mjs";
import { r as resolvePluginProvidersCore } from "./providers.runtime-D8tHcZMM.mjs";
import { y as throwIfSetupInferenceCancelled } from "./setup-inference-core-T9FAd_V7.mjs";
import { c as supportsSetupTextInference } from "./setup-inference-auth-options-1yk-3YSQ.mjs";
import { t as createPluginCapabilityConsentPrompter } from "./plugin-capability-consent-CpRz5cis.mjs";
//#region src/system-agent/setup-provider-method.ts
/** Import under the mutation lease; keep provider callbacks owned through their materialization. */
async function withSetupProviderAuthMethod(params, consume) {
	try {
		var _usingCtx$1 = _usingCtx();
		const cache = _usingCtx$1.a(createPluginCache());
		const activation = params.activation;
		const loaded = await withPluginLifecycleLease({ signal: params.signal ?? activation?.signal }, async () => withPluginCache(cache, async () => {
			const enabled = await enablePluginWithCapabilityConsent(params.cfg, params.choice.pluginId, {
				workspaceDir: params.workspace,
				beforePersistentEffect: params.beforePersistentEffect,
				onCapabilityConsent: activation?.prompter ? createPluginCapabilityConsentPrompter(activation.prompter, () => throwIfSetupInferenceCancelled(activation)) : void 0
			});
			if (!enabled.enabled) return { error: `${params.choice.choiceLabel} is disabled (${enabled.reason ?? "blocked"}).` };
			const provider = (params.deps.resolvePluginProviders ?? resolvePluginProvidersCore)({
				config: enabled.config,
				workspaceDir: params.workspace,
				mode: "setup",
				cache: true,
				includeUntrustedWorkspacePlugins: false,
				onlyPluginIds: [params.choice.pluginId]
			}).find((entry) => entry.pluginId === params.choice.pluginId && normalizeProviderId(entry.id) === normalizeProviderId(params.choice.providerId));
			const method = provider?.auth.find((entry) => entry.id === params.choice.methodId);
			if (!provider || !method || !supportsSetupTextInference(method.wizard?.onboardingScopes)) return { error: "That provider setup is not available on this Gateway." };
			return {
				config: enabled.config,
				provider,
				method
			};
		}));
		return "error" in loaded ? loaded : await withPluginCache(cache, () => consume(loaded));
	} catch (_) {
		_usingCtx$1.e = _;
	} finally {
		await _usingCtx$1.d();
	}
}
//#endregion
export { withSetupProviderAuthMethod as t };
