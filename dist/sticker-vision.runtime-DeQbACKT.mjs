import { a as resolveAgentDir } from "./agent-scope-config-Dm6T00l4.mjs";
import { n as findModelInCatalog } from "./model-catalog-lookup-CDmSroVq.mjs";
import { t as resolveDefaultModelForAgent } from "./model-selection-config-rcK5tFX8.mjs";
import { r as modelSupportsVision } from "./model-catalog-vrrWcXWU.mjs";
import { n as loadPreparedModelCatalog } from "./agent-runtime-BT2IhHg-.mjs";
//#region extensions/telegram/src/sticker-vision.runtime.ts
async function resolveStickerVisionSupportRuntime(params) {
	const catalog = await loadPreparedModelCatalog({
		config: params.cfg,
		...params.agentId ? {
			agentId: params.agentId,
			agentDir: resolveAgentDir(params.cfg, params.agentId)
		} : {},
		readOnly: true
	});
	const defaultModel = resolveDefaultModelForAgent({
		cfg: params.cfg,
		agentId: params.agentId
	});
	const entry = findModelInCatalog(catalog, defaultModel.provider, defaultModel.model);
	if (!entry) return false;
	return modelSupportsVision(entry);
}
//#endregion
export { resolveStickerVisionSupportRuntime };
