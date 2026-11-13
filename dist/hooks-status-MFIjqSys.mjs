import { a as getPluginRuntimeGatewayRequestScope } from "./gateway-request-scope-Da9jAC9_.mjs";
import { d as resolveAgentWorkspaceDir } from "./agent-scope-config-Dm6T00l4.mjs";
import "./agent-scope-L_eY3Hj7.mjs";
import { l as getActivePluginRegistry } from "./runtime-BnZb2P5v.mjs";
import { un as validateHooksStatusParams } from "./src-D2gvuSyP.mjs";
import { t as loadWorkspaceHookEntries } from "./workspace-SFZ8sGpP.mjs";
import { t as buildWorkspaceHookStatus } from "./hooks-status-Ct532lXE.mjs";
import { t as assertValidParams } from "./validation-B7TobU6-.mjs";
import { t as resolveAgentIdOrRespondError } from "./agent-id-shared-Ed1g6nj_.mjs";
//#region src/gateway/server-methods/hooks-status.ts
/** Gateway handler for the live hook status report. */
const hooksStatusHandlers = { "hooks.status": ({ params, respond, context }) => {
	if (!assertValidParams(params, validateHooksStatusParams, "hooks.status", respond)) return;
	const config = context.getRuntimeConfig();
	const resolved = resolveAgentIdOrRespondError({
		rawAgentId: params.agentId,
		respond,
		cfg: config,
		normalize: (value) => typeof value === "string" ? value.trim() || void 0 : void 0
	});
	if (!resolved) return;
	const workspaceDir = resolveAgentWorkspaceDir(config, resolved.agentId);
	const entries = [...(getPluginRuntimeGatewayRequestScope()?.pluginRegistry ?? getActivePluginRegistry())?.hooks.map((hook) => hook.entry) ?? [], ...loadWorkspaceHookEntries(workspaceDir, { config })];
	respond(true, buildWorkspaceHookStatus(workspaceDir, {
		config,
		entries
	}), void 0);
} };
//#endregion
export { hooksStatusHandlers };
