import { l as normalizePluginsConfig, u as resolveEffectiveEnableState } from "./config-state-D-KaEbbt.mjs";
import { i as resolveManifestProviderAuthChoices } from "./provider-auth-choices-BYjVKu6M.mjs";
import { n as resolveProviderInstallCatalogEntries } from "./provider-install-catalog-Cg4YS7Wy.mjs";
import { t as sortFlowContributionsByLabel } from "./types-CnTXyUgM.mjs";
//#region src/flows/provider-flow.ts
const DEFAULT_PROVIDER_FLOW_SCOPE = "text-inference";
function includesProviderFlowScope(scopes, scope) {
	return scope === "all" || (scopes ? scopes.includes(scope) : scope === DEFAULT_PROVIDER_FLOW_SCOPE);
}
function buildProviderSetupFlowContribution(choice, source, fallbackGroupLabel) {
	const groupId = choice.groupId ?? choice.providerId;
	const groupLabel = choice.groupLabel ?? fallbackGroupLabel;
	return {
		id: `provider:setup:${choice.choiceId}`,
		kind: "provider",
		surface: "setup",
		providerId: choice.providerId,
		pluginId: choice.pluginId,
		option: {
			value: choice.choiceId,
			...choice.modelTarget ? { modelTarget: choice.modelTarget } : {},
			label: choice.choiceLabel,
			...choice.choiceHint ? { hint: choice.choiceHint } : {},
			...choice.assistantPriority !== void 0 ? { assistantPriority: choice.assistantPriority } : {},
			...choice.assistantVisibility ? { assistantVisibility: choice.assistantVisibility } : {},
			...source === "manifest" && choice.onboardingFeatured ? { onboardingFeatured: true } : {},
			group: {
				id: groupId,
				label: groupLabel,
				...choice.groupHint ? { hint: choice.groupHint } : {}
			}
		},
		...choice.onboardingScopes ? { onboardingScopes: [...choice.onboardingScopes] } : {},
		source
	};
}
function resolveInstallCatalogProviderSetupFlowContributions(params) {
	const scope = params?.scope ?? DEFAULT_PROVIDER_FLOW_SCOPE;
	const normalizedPluginsConfig = normalizePluginsConfig(params?.config?.plugins);
	return resolveProviderInstallCatalogEntries({
		...params,
		includeUntrustedWorkspacePlugins: false
	}).filter((entry) => includesProviderFlowScope(entry.onboardingScopes, scope) && resolveEffectiveEnableState({
		id: entry.pluginId,
		origin: entry.origin,
		config: normalizedPluginsConfig,
		rootConfig: params?.config,
		enabledByDefault: true
	}).enabled).map((entry) => buildProviderSetupFlowContribution(entry, "install-catalog", entry.label));
}
function resolveManifestProviderSetupFlowContributions(params) {
	const scope = params?.scope ?? DEFAULT_PROVIDER_FLOW_SCOPE;
	return resolveManifestProviderAuthChoices({
		...params,
		includeUntrustedWorkspacePlugins: false
	}).filter((choice) => includesProviderFlowScope(choice.onboardingScopes, scope)).map((choice) => buildProviderSetupFlowContribution(choice, "manifest", choice.choiceLabel));
}
function resolveProviderSetupFlowContributions(params) {
	const scope = params?.scope ?? DEFAULT_PROVIDER_FLOW_SCOPE;
	const manifestContributions = resolveManifestProviderSetupFlowContributions({
		...params,
		scope
	});
	const seenOptionValues = new Set(manifestContributions.map((contribution) => contribution.option.value));
	const installCatalogContributions = resolveInstallCatalogProviderSetupFlowContributions({
		...params,
		scope
	}).filter((contribution) => !seenOptionValues.has(contribution.option.value));
	return sortFlowContributionsByLabel([...manifestContributions, ...installCatalogContributions]);
}
//#endregion
export { resolveProviderSetupFlowContributions as t };
