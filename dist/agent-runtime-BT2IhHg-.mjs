import "./agent-scope-config-Dm6T00l4.mjs";
import "./agent-scope-L_eY3Hj7.mjs";
import "./provider-auth-aliases-jv_ENzum.mjs";
import "./model-selection-shared-dOoB6UQS.mjs";
import "./model-selection-config-rcK5tFX8.mjs";
import "./model-auth-markers-D2C6UTDZ.mjs";
import "./model-catalog-vrrWcXWU.mjs";
import "./model-selection-BAezv3YH.mjs";
import { t as resolveThinkingDefaultWithRuntimeCatalogCore } from "./model-thinking-default-C5zCCiYw.mjs";
import "./auth-profiles-DCINaNQ4.mjs";
import "./model-auth-ByqXHWUV.mjs";
import { d as readPreparedModelCatalog, f as refreshExpiredPreparedModelCatalog } from "./prepared-model-catalog-2PLeV8Ci.mjs";
import "./identity-CYLpjE8a.mjs";
import "./common-CnSoEQyp.mjs";
import "./agent-scope-runtime-BIhssPWI.mjs";
import "./embedded-agent-utils-D8ZFH1d0.mjs";
import "./tts-Cw1OB5Jm.mjs";
import "./embedded-agent-block-chunker-C7iOG9sJ.mjs";
import "./identity-avatar-BpSGGDKw.mjs";
import "./agent-command-DUhFGJSr.mjs";
//#region src/plugin-sdk/agent-runtime.ts
/** Preserves the public SDK's writable default while internal catalog reads stay passive. */
async function loadPreparedModelCatalog(params = {}) {
	return await readPreparedModelCatalog({
		...params,
		readOnly: params.readOnly ?? false
	});
}
/** @deprecated Use loadPreparedModelCatalog or getPreparedModelCatalogSnapshot. */
async function loadModelCatalog(params = {}) {
	const { agentId, agentDir, cacheOnly, config, env, readOnly, refreshFullCatalog, workspaceDir } = params;
	const preparedParams = {
		...agentId ? { agentId } : {},
		...agentDir ? { agentDir } : {},
		...config ? { config } : {},
		...env ? { env } : {},
		...readOnly !== void 0 ? { readOnly } : {},
		...refreshFullCatalog !== void 0 ? { refreshFullCatalog } : {},
		...workspaceDir ? { workspaceDir } : {}
	};
	if (cacheOnly) return refreshExpiredPreparedModelCatalog(preparedParams)?.entries ?? [];
	return await loadPreparedModelCatalog(preparedParams);
}
function resolveThinkingDefaultWithRuntimeCatalog(params) {
	const { loadModelCatalog: loadRuntimeCatalog, ...rest } = params;
	return resolveThinkingDefaultWithRuntimeCatalogCore({
		...rest,
		loadRuntimeCatalog
	});
}
//#endregion
export { loadPreparedModelCatalog as n, resolveThinkingDefaultWithRuntimeCatalog as r, loadModelCatalog as t };
