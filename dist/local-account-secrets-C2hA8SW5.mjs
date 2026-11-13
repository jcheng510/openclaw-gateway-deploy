import { a as resolveAgentDir } from "./agent-scope-config-Dm6T00l4.mjs";
import "./agent-scope-L_eY3Hj7.mjs";
import { l as getRuntimeConfigSourceSnapshot } from "./runtime-snapshot-BHGp6OxI.mjs";
import "./config-D1R2igem.mjs";
import { t as assertAuthProfileStoreAgentOwner } from "./sqlite-bVIXwkEM.mjs";
import { o as getActiveSecretsRuntimeConfigSnapshot } from "./runtime-state-I0A0iuwu.mjs";
//#region src/cli/capability-cli/local-account-secrets.ts
/**
* Prepare the selected agent's account-owned SecretRefs for one standalone local
* capability run. Every agent-scoped local runner calls this before provider auth.
*/
async function prepareLocalCapabilityAccountSecrets(params) {
	const agentDir = resolveAgentDir(params.cfg, params.agentId);
	assertAuthProfileStoreAgentOwner(agentDir, params.agentId);
	if (getActiveSecretsRuntimeConfigSnapshot()) return;
	const secretsRuntime = await import("./runtime-C7WXKW5W.mjs");
	const snapshot = await secretsRuntime.prepareSecretsRuntimeSnapshot({
		config: getRuntimeConfigSourceSnapshot() ?? params.cfg,
		assignmentConfig: params.cfg,
		agentDirs: [agentDir],
		includeConfigRefs: false,
		allowUnavailableSecretOwners: true
	});
	secretsRuntime.activateSecretsRuntimeSnapshot(snapshot);
}
//#endregion
export { prepareLocalCapabilityAccountSecrets };
