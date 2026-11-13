import { n as normalizeAgentId } from "./agent-id-D1-Q6vR4.mjs";
import { D as withAgentRosterFactsBatch, d as resolveAgentWorkspaceDir } from "./agent-scope-config-Dm6T00l4.mjs";
import "./session-key-BC4m_Ly5.mjs";
import { i as listAgentIds } from "./agent-roster-B45JERT5.mjs";
import "./agent-scope-L_eY3Hj7.mjs";
import { C as resolveRuntimeConfigCacheKey } from "./runtime-snapshot-BHGp6OxI.mjs";
import { h as readAgentDatabaseAdmissionRefusal } from "./agent-database-admission-CLYAvaL3.mjs";
import { i as getPreparedModelFullCatalogAuth } from "./prepared-model-runtime-auth-Cx-T0hXc.mjs";
import { x as withPreparedModelRuntimeReadBatch } from "./prepared-model-runtime-CiPCD0fr.mjs";
import { t as getPreparedModelRuntimeStartupStatus } from "./prepared-model-runtime.startup-status-Da154XRr.mjs";
import "./prepared-model-catalog-2PLeV8Ci.mjs";
//#region src/gateway/server-methods/chat-metadata-facts.ts
var ChatMetadataSnapshotUnavailableError = class extends Error {
	constructor(message = "prepared chat metadata snapshot is unavailable") {
		super(message);
		this.name = "ChatMetadataSnapshotUnavailableError";
	}
};
function captureGenerationFacts(deps) {
	const config = deps.getConfig();
	const agents = withPreparedModelRuntimeReadBatch(() => withAgentRosterFactsBatch(config, () => listAgentIds(config).filter((agentId) => !readAgentDatabaseAdmissionRefusal(agentId)).flatMap((rawAgentId) => {
		const agentId = normalizeAgentId(rawAgentId);
		const owner = deps.getPreparedOwner({
			agentId,
			config
		});
		if (!owner) {
			if (getPreparedModelRuntimeStartupStatus()?.degraded) return [];
			throw new ChatMetadataSnapshotUnavailableError(`prepared chat metadata owner is unavailable for agent "${agentId}"`);
		}
		const workspaceDir = owner.workspaceDir ?? resolveAgentWorkspaceDir(config, agentId);
		const fullModelCatalog = owner.readFullModelCatalog?.();
		const fullCatalogAuth = fullModelCatalog ? getPreparedModelFullCatalogAuth(fullModelCatalog) : void 0;
		if (fullModelCatalog && !fullCatalogAuth) throw new Error("prepared full model catalog omitted its auth generation");
		const catalog = fullModelCatalog ?? owner.modelCatalog;
		return [{
			agentId,
			owner,
			authStore: fullCatalogAuth?.authStore ?? deps.getPreparedAuthStore(owner.agentDir, owner.inheritedAuthDir) ?? {
				version: 1,
				profiles: {}
			},
			authModes: fullCatalogAuth?.authModes ?? owner.authModes,
			authStoreRevision: `${deps.getAuthStoreRevision(owner.agentDir)}:${deps.getAuthStoreRevision(owner.inheritedAuthDir)}`,
			modelCatalog: catalog,
			catalogRefreshFailed: catalog.refreshFailed === true,
			skillsVersion: deps.getSkillsVersion(workspaceDir)
		}];
	})));
	return {
		config,
		configKey: resolveRuntimeConfigCacheKey(config),
		pluginRegistryVersion: deps.getPluginRegistryVersion(),
		agents
	};
}
function generationFactsMatch(left, right, scope = "metadata") {
	if (left.configKey !== right.configKey || left.pluginRegistryVersion !== right.pluginRegistryVersion || left.agents.length !== right.agents.length) return false;
	return left.agents.every((agent, index) => {
		const candidate = right.agents[index];
		return candidate?.agentId === agent.agentId && candidate.owner === agent.owner && candidate.authStoreRevision === agent.authStoreRevision && candidate.modelCatalog === agent.modelCatalog && (scope === "auth" || candidate.catalogRefreshFailed === agent.catalogRefreshFailed) && (scope !== "metadata" || candidate.skillsVersion === agent.skillsVersion);
	});
}
//#endregion
export { captureGenerationFacts as n, generationFactsMatch as r, ChatMetadataSnapshotUnavailableError as t };
