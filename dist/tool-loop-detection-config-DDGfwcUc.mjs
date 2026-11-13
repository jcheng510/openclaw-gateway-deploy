import { r as resolveAgentConfig } from "./agent-scope-config-Dm6T00l4.mjs";
import "./agent-scope-L_eY3Hj7.mjs";
//#region src/agents/tool-loop-detection-config.ts
/** Resolves effective tool loop-detection config by overlaying agent settings on globals. */
function resolveToolLoopDetectionConfig(params) {
	const global = params.cfg?.tools?.loopDetection;
	const agent = params.agentId && params.cfg ? resolveAgentConfig(params.cfg, params.agentId)?.tools?.loopDetection : void 0;
	if (!agent) return global;
	if (!global) return agent;
	return { enabled: agent.enabled ?? global.enabled };
}
//#endregion
export { resolveToolLoopDetectionConfig as t };
