import { y as uniqueStrings } from "./string-normalization-YMwDjufr.mjs";
import { r as normalizeProviderId } from "./provider-id-BIyeXQag.mjs";
import { i as isUserModelAuthProfileId } from "./profile-usage-stats-CsXf5PwL.mjs";
import { n as readCodexCliCredentialsCached } from "./cli-credentials-BaCubPeC.mjs";
import { n as externalCliDiscoveryForProviderAuth } from "./external-cli-discovery-DHQI45vG.mjs";
import { a as resolveAuthProfileOrder, n as isStoredCredentialCompatibleWithAuthProvider } from "./order-Du3RLv_J.mjs";
import { t as resolveEnvApiKey } from "./model-auth-env-D6-JZ2i2.mjs";
import { S as resolveUsableCustomProviderApiKey, b as resolveProviderEntryApiKeyProfileReference } from "./model-auth-provider-config-hHBq41iK.mjs";
import { l as loadAuthProfileStoreWithoutExternalProfiles, n as ensureAuthProfileStore } from "./store-runtime-BpJB9uZ1.mjs";
import { t as resolveAuthProfileDisplayLabel } from "./auth-profiles-DCINaNQ4.mjs";
import "./model-auth-ByqXHWUV.mjs";
//#region src/agents/model-auth-label.ts
/**
* Formats user-facing auth labels for resolved provider/model credentials.
*/
/** Resolve the display label that describes how a provider is authenticated. */
function resolveModelAuthLabel(params) {
	const resolvedProvider = params.provider?.trim();
	if (!resolvedProvider) return;
	const providerKey = normalizeProviderId(resolvedProvider);
	const profileOverride = params.sessionEntry?.authProfileOverride?.trim();
	const store = params.includeExternalProfiles === false ? loadAuthProfileStoreWithoutExternalProfiles(params.agentDir, { profileId: profileOverride }) : ensureAuthProfileStore(params.agentDir, {
		profileId: profileOverride,
		externalCli: externalCliDiscoveryForProviderAuth({
			cfg: params.cfg,
			provider: providerKey,
			preferredProfile: profileOverride
		})
	});
	const acceptedProviderKeys = uniqueStrings([...(params.acceptedProviderIds ?? []).map(normalizeProviderId), providerKey].filter(Boolean));
	const candidates = [profileOverride, ...uniqueStrings(acceptedProviderKeys.flatMap((acceptedProvider) => resolveAuthProfileOrder({
		cfg: params.cfg,
		store,
		provider: acceptedProvider,
		preferredProfile: profileOverride
	})))].filter(Boolean);
	for (const profileId of candidates) {
		const profile = store.profiles[profileId];
		if (!profile || !acceptedProviderKeys.some((acceptedProvider) => isStoredCredentialCompatibleWithAuthProvider({
			cfg: params.cfg,
			provider: acceptedProvider,
			credential: profile
		}))) continue;
		const label = isUserModelAuthProfileId(profileId) ? "personal account" : resolveAuthProfileDisplayLabel({
			cfg: params.cfg,
			store,
			profileId
		});
		return `${profile.type === "api_key" ? "api-key" : profile.type}${label ? ` (${label})` : ""}`;
	}
	const providerEntryProfileRef = resolveProviderEntryApiKeyProfileReference({
		cfg: params.cfg,
		provider: providerKey,
		store
	});
	if (providerEntryProfileRef.kind === "profile") {
		const label = resolveAuthProfileDisplayLabel({
			cfg: params.cfg,
			store,
			profileId: providerEntryProfileRef.profileId
		});
		return `${providerEntryProfileRef.mode === "token" ? "token" : "api-key"}${label ? ` (${label})` : ""}`;
	}
	if (providerEntryProfileRef.kind === "profile-incompatible") return "unknown";
	if (params.codexCliCredentialsHome && (providerKey === "openai" || providerKey === "codex") && readCodexCliCredentialsCached({
		codexHome: params.codexCliCredentialsHome,
		ttlMs: 5e3,
		allowKeychainPrompt: false
	})) return "oauth (codex-cli)";
	const envKey = resolveEnvApiKey(providerKey, process.env, {
		config: params.cfg,
		workspaceDir: params.workspaceDir
	});
	if (envKey?.apiKey) return `${envKey.source.includes("OAUTH_TOKEN") ? "oauth" : "api-key"} (${envKey.source})`;
	if (providerKey === "codex" && readCodexCliCredentialsCached({
		ttlMs: 5e3,
		allowKeychainPrompt: false
	})) return "oauth (codex-cli)";
	if (providerKey === "claude-cli") return "native (claude-cli)";
	if (resolveUsableCustomProviderApiKey({
		cfg: params.cfg,
		provider: providerKey
	})) return `api-key (models.json)`;
	return "unknown";
}
//#endregion
export { resolveModelAuthLabel as t };
