import { i as reloadSharedAuthStoreOwnership } from "./path-resolve-CkbtowIT.mjs";
import { m as prepareModelRuntimeSnapshot } from "./prepared-model-runtime-CiPCD0fr.mjs";
import { u as refreshActiveProviderAuthRuntimeSnapshot } from "./runtime-89_dSlVV.mjs";
import { n as resolveModelAuthAgentScope, t as modelAuthAgentScopeError } from "./model-auth-agent-scope-Bu-qNid-.mjs";
import { t as clearModelAuthStatusUsageCache } from "./models-auth-status-usage-cache-C_t56G_r.mjs";
//#region src/gateway/model-auth-refresh.ts
async function refreshModelAuthStateAfterMutation(getRuntimeConfig, agentId) {
	reloadSharedAuthStoreOwnership();
	clearModelAuthStatusUsageCache();
	await refreshActiveProviderAuthRuntimeSnapshot();
	const config = getRuntimeConfig();
	const scope = resolveModelAuthAgentScope(config, agentId);
	if (!scope.ok) throw new Error(modelAuthAgentScopeError(scope).message);
	await prepareModelRuntimeSnapshot({
		config,
		agentId,
		agentDir: scope.agentDir
	});
}
//#endregion
export { refreshModelAuthStateAfterMutation as t };
