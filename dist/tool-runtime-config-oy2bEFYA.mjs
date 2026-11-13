import { l as getRuntimeConfigSourceSnapshot, o as getRuntimeConfigSnapshot, w as selectApplicableRuntimeConfig } from "./runtime-snapshot-BHGp6OxI.mjs";
import "./config-D1R2igem.mjs";
//#region src/agents/tool-runtime-config.ts
function resolveAgentRuntimeToolConfig(inputConfig) {
	const runtimeConfig = getRuntimeConfigSnapshot() ?? void 0;
	if (!runtimeConfig) return inputConfig;
	if (!inputConfig || inputConfig === runtimeConfig) return runtimeConfig;
	const runtimeSourceConfig = getRuntimeConfigSourceSnapshot() ?? void 0;
	if (!runtimeSourceConfig) return inputConfig;
	return selectApplicableRuntimeConfig({
		inputConfig,
		runtimeConfig,
		runtimeSourceConfig
	});
}
//#endregion
export { resolveAgentRuntimeToolConfig as t };
