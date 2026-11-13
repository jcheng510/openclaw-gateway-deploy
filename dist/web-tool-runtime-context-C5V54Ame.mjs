import { i as resolveManifestContractOwnerPluginId } from "./plugin-registry-contributions-CZq67NZQ.mjs";
import "./plugin-registry-BbOSHtTb.mjs";
import { S as getActiveRuntimeWebToolsMetadataFromState, o as getActiveSecretsRuntimeConfigSnapshot } from "./runtime-state-I0A0iuwu.mjs";
//#region src/agents/tools/web-tool-runtime-context.ts
function resolveWebToolRuntimeContext(params) {
	const runtimeMetadata = (params.lateBindRuntimeConfig === true ? getActiveRuntimeWebToolsMetadataFromState() : null)?.[params.kind] ?? params.runtimeMetadata;
	const config = params.lateBindRuntimeConfig === true ? getActiveSecretsRuntimeConfigSnapshot()?.config ?? params.config : params.config;
	let providerSelectionId = (runtimeMetadata?.selectedProvider ?? runtimeMetadata?.providerConfigured) || "";
	if (!providerSelectionId) {
		const configuredProvider = config?.tools?.web?.[params.kind]?.provider;
		providerSelectionId = typeof configuredProvider === "string" ? configuredProvider.trim().toLowerCase() : "";
	}
	return {
		config,
		preferRuntimeProviders: !providerSelectionId || params.kind === "search" || !resolveManifestContractOwnerPluginId({
			contract: "webFetchProviders",
			value: providerSelectionId,
			origin: "bundled",
			config
		}),
		providerSelectionId,
		runtimeMetadata
	};
}
//#endregion
export { resolveWebToolRuntimeContext as t };
