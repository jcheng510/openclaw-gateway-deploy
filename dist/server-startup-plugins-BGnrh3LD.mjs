import { d as getPluginMetadataSnapshotCache } from "./plugin-cache-DK2CPN_y.mjs";
import { u as withPluginRuntimeRegistryScope } from "./gateway-request-scope-Da9jAC9_.mjs";
import { w as tryResolveConfiguredAgentWorkspaceDir } from "./agent-scope-config-Dm6T00l4.mjs";
import { t as resolveDefaultAgentWorkspaceDir } from "./workspace-default-path-BG9KN4ds.mjs";
import "./workspace-default-CQbD5G-j.mjs";
import { i as getGatewayPluginMetadataSnapshot } from "./current-plugin-metadata-state-oQuFR0NJ.mjs";
import { p as extractPluginInstallRecordsFromInstalledPluginIndex } from "./installed-plugin-index-CrJ6zmAL.mjs";
import { n as completePluginMetadataSnapshot } from "./plugin-metadata-snapshot-Ctf1TsvW.mjs";
import "./agent-scope-L_eY3Hj7.mjs";
import { r as listAmbientOnlyConfiguredChannelIds } from "./channel-presence-policy-DBIVdr7d.mjs";
import { T as withPluginRegistryPreparationScope, b as markPluginRegistryActive } from "./registry-lifecycle-D7jOZqUu.mjs";
import { l as getActivePluginRegistry, o as disposePluginRegistryInstances } from "./runtime-BnZb2P5v.mjs";
import { t as createEmptyPluginRegistry } from "./registry-empty-BTjzcMW2.mjs";
import { i as resolveProviderPolicySurfaceForOwner } from "./provider-public-artifacts-DzU0Zs8g.mjs";
import "./loader-runtime-load-DCwhg2IV.mjs";
import { i as getPluginRuntimeLoadContext, o as setPluginRuntimeLoadContext } from "./load-context-F71qIsqu.mjs";
import { C as collectUnregisteredConfiguredMemoryEmbeddingProviders, S as collectRegisteredEmbeddingProviderIds, T as getRegisteredEmbeddingProvider, y as collectConfiguredMemoryEmbeddingStartupProviderOwners } from "./gateway-startup-plugin-config-zzTfF5rk.mjs";
import "./channel-plugin-ids-C18TOaQy.mjs";
import { i as validateConfiguredBindings } from "./configured-binding-registry-TgEVmppx.mjs";
import { u as initSubagentRegistry } from "./subagent-registry-Dfg59-Q4.mjs";
import { t as loadPluginLookUpTable } from "./plugin-lookup-table-3En2zu7G.mjs";
import { r as resolveGatewayStartupPluginActivationConfig } from "./plugin-activation-runtime-config-BUvs4gZJ.mjs";
import { n as listGatewayMethods } from "./server-methods-list-B9W8GMJt.mjs";
//#region src/gateway/server-startup-plugins.ts
/** Returns the config snapshot used by channel/plugin startup maintenance. */
function resolveGatewayStartupMaintenanceConfig(params) {
	return params.cfgAtStart.channels === void 0 && params.startupRuntimeConfig.channels !== void 0 ? {
		...params.cfgAtStart,
		channels: params.startupRuntimeConfig.channels
	} : params.cfgAtStart;
}
/** Runs channel, session, and pairing maintenance before plugin bootstrap. */
async function runGatewayStartupMaintenance(params) {
	const startupMaintenanceConfig = resolveGatewayStartupMaintenanceConfig({
		cfgAtStart: params.cfgAtStart,
		startupRuntimeConfig: params.startupRuntimeConfig
	});
	if (!params.minimalTestGateway || startupMaintenanceConfig.channels !== void 0) {
		const { runChannelPluginStartupMaintenance } = await import("./lifecycle-startup-sghYb4c7.mjs");
		const startupTasks = [runChannelPluginStartupMaintenance({
			cfg: startupMaintenanceConfig,
			env: process.env,
			log: params.log
		})];
		if (!params.minimalTestGateway) {
			const { migrateLegacyDesktopStreamOptOuts } = await import("./device-pairing-node-desktop-migration-mom6Ii05.mjs");
			const retiredDesktopApprovals = await migrateLegacyDesktopStreamOptOuts(startupMaintenanceConfig);
			if (retiredDesktopApprovals > 0) params.log.warn(`Preserved disabled desktop access for ${retiredDesktopApprovals} paired node(s); approve their updated desktop capability to enable sharing.`);
			const { runStartupSessionMigration } = await import("./server-startup-session-migration-DogqdCur.mjs");
			startupTasks.push(runStartupSessionMigration({
				cfg: params.cfgAtStart,
				env: process.env,
				log: params.log
			}));
			const { listLegacyPairingStoreFiles } = await import("./pairing-files-Dv7TfwSi.mjs");
			startupTasks.push(listLegacyPairingStoreFiles().then((files) => {
				if (files.length > 0) params.log.warn(`Legacy pairing stores require repair: ${files.join(", ")}. Stop the Gateway and run openclaw doctor --fix.`);
			}, (error) => {
				params.log.warn(`Legacy pairing store inspection failed: ${String(error)}. Stop the Gateway and run openclaw doctor --fix.`);
			}));
		}
		await Promise.all(startupTasks);
	}
}
/** Builds plugin startup state and gateway method lists before the server binds. */
async function prepareGatewayPluginBootstrap(params) {
	const activationSourceConfig = params.activationSourceConfig ?? params.cfgAtStart;
	initSubagentRegistry();
	const gatewayPluginConfig = params.minimalTestGateway ? params.cfgAtStart : resolveGatewayStartupPluginActivationConfig({
		runtimeConfig: params.cfgAtStart,
		activationSourceConfig,
		env: process.env,
		...params.pluginMetadataSnapshot?.manifestRegistry ? { manifestRegistry: params.pluginMetadataSnapshot.manifestRegistry } : {},
		discovery: params.pluginMetadataSnapshot?.discovery,
		ambientEnvTriggers: params.ambientEnvTriggers
	});
	const pluginsGloballyDisabled = gatewayPluginConfig.plugins?.enabled === false;
	const pluginWorkspaceDir = tryResolveConfiguredAgentWorkspaceDir(gatewayPluginConfig);
	const defaultWorkspaceDir = pluginWorkspaceDir ?? resolveDefaultAgentWorkspaceDir();
	const pluginLookUpTable = params.minimalTestGateway || pluginsGloballyDisabled ? void 0 : loadPluginLookUpTable({
		config: gatewayPluginConfig,
		workspaceDir: pluginWorkspaceDir,
		env: process.env,
		activationSourceConfig,
		metadataSnapshot: params.pluginMetadataSnapshot,
		workerProviderIds: params.workerProviderIds ?? [],
		ambientEnvTriggers: params.ambientEnvTriggers
	});
	const pluginManifestRecords = pluginLookUpTable?.manifestRegistry.plugins ?? params.pluginMetadataSnapshot?.manifestRegistry.plugins ?? [];
	const startupPluginIds = [...pluginLookUpTable?.startup.pluginIds ?? []];
	const ambientAutostartSuppressedChannelIds = params.ambientEnvTriggers === "suppress" ? new Set(listAmbientOnlyConfiguredChannelIds({
		config: params.cfgAtStart,
		activationSourceConfig,
		env: process.env,
		includePersistedAuthState: false,
		manifestRecords: pluginManifestRecords
	})) : /* @__PURE__ */ new Set();
	const baseMethods = listGatewayMethods();
	const emptyPluginRegistry = createEmptyPluginRegistry();
	markPluginRegistryActive(emptyPluginRegistry);
	const pluginRegistry = params.minimalTestGateway && !pluginsGloballyDisabled ? getActivePluginRegistry() ?? emptyPluginRegistry : emptyPluginRegistry;
	const metadataSnapshot = getGatewayPluginMetadataSnapshot() ?? completePluginMetadataSnapshot({
		snapshot: pluginLookUpTable ?? params.pluginMetadataSnapshot,
		config: activationSourceConfig,
		env: process.env,
		workspaceDir: defaultWorkspaceDir
	});
	setPluginRuntimeLoadContext(pluginRegistry, {
		rawConfig: params.cfgAtStart,
		config: gatewayPluginConfig,
		activationSourceConfig,
		autoEnabledReasons: {},
		workspaceDir: pluginWorkspaceDir,
		env: process.env,
		logger: params.log,
		metadataSnapshot,
		manifestRegistry: metadataSnapshot?.manifestRegistry,
		installRecords: metadataSnapshot ? extractPluginInstallRecordsFromInstalledPluginIndex(metadataSnapshot.index) : void 0,
		preferBuiltPluginArtifacts: true
	});
	return {
		gatewayPluginConfigAtStart: gatewayPluginConfig,
		defaultWorkspaceDir,
		pluginWorkspaceDir,
		startupPluginIds,
		pluginManifestRecords,
		pluginMetadataSnapshot: metadataSnapshot,
		pluginLookUpTable,
		baseMethods,
		pluginRegistry,
		baseGatewayMethods: baseMethods,
		ambientAutostartSuppressedChannelIds
	};
}
/**
* Warn when `memory.search.provider` selects a memory embedding provider
* that no loaded plugin registered. Without the owning plugin, `active-memory`
* cannot embed and silently falls back to keyword/FTS-only recall.
*/
function warnUnregisteredConfiguredMemoryEmbeddingProviders(params) {
	const unregistered = collectUnregisteredConfiguredMemoryEmbeddingProviders({
		config: params.config,
		registeredProviderIds: collectRegisteredEmbeddingProviderIds(params.pluginRegistry)
	});
	for (const provider of unregistered) {
		const path = `memory.search.${provider.source}`;
		params.log.warn(`${path}="${provider.configuredId}" is configured, but no loaded plugin registered a memory embedding provider that can serve "${provider.configuredId}". Semantic memory recall will fall back to keyword/FTS-only search. Ensure the plugin that provides "${provider.configuredId}" is installed and enabled.`);
	}
}
async function warnConfiguredMemoryEmbeddingProviderSetup(params) {
	const manifestRegistry = getPluginRuntimeLoadContext(params.pluginRegistry)?.manifestRegistry ?? params.pluginLookUpTable?.manifestRegistry ?? { plugins: [] };
	await Promise.all(collectConfiguredMemoryEmbeddingStartupProviderOwners(params.config).flatMap((provider) => {
		const registered = [...provider.ownerIds].map((ownerId) => getRegisteredEmbeddingProvider(ownerId)).find((entry) => entry !== void 0);
		const owner = manifestRegistry.plugins.find((plugin) => plugin.id === registered?.ownerPluginId);
		if (provider.agentIds.size === 0 || !owner) return [];
		let policy;
		try {
			policy = resolveProviderPolicySurfaceForOwner(owner);
		} catch (error) {
			params.log.warn(`Memory embedding provider "${provider.configuredId}" setup could not be checked (${String(error)}). Run "openclaw doctor" to retry.`);
			return [];
		}
		const inspectSetup = policy?.inspectEmbeddingProviderSetup;
		if (!inspectSetup) return [];
		return [...provider.agentIds].map(async (agentId) => {
			try {
				const setup = await inspectSetup({
					config: params.config,
					env: process.env,
					agentId,
					provider: provider.configuredId
				});
				if (setup) params.log.warn(`Agent "${agentId}": semantic memory recall is degraded (${provider.source}="${provider.configuredId}"). ${setup.reason}${setup.fixHint ? ` ${setup.fixHint}` : ""}`);
			} catch (error) {
				params.log.warn(`Agent "${agentId}": memory embedding setup could not be checked (${String(error)}). Run "openclaw doctor" to retry.`);
			}
		});
	}));
}
/** Loads startup plugin runtimes after the gateway listener binds. */
async function loadGatewayStartupPluginRuntime(params) {
	const { prepareGatewayPluginLoad } = await import("./server-plugin-bootstrap-DZVTvXzJ.mjs");
	await params.pluginRuntimeClaim?.waitForUnblocked();
	if (params.pluginRuntimeClaim && !params.pluginRuntimeClaim.isCurrent()) {
		const currentPluginRegistry = params.getCurrentPluginRegistry?.();
		if (!currentPluginRegistry) throw new Error("superseded Gateway startup cannot resolve the current plugin runtime");
		return {
			pluginRegistry: currentPluginRegistry,
			gatewayMethods: params.baseMethods
		};
	}
	const loaded = prepareGatewayPluginLoad({
		loadIntent: "startup",
		cfg: params.cfg,
		activationSourceConfig: params.activationSourceConfig,
		workspaceDir: params.workspaceDir,
		log: params.log,
		coreGatewayMethodNames: params.coreGatewayMethodNames ?? params.baseMethods,
		baseMethods: params.baseMethods,
		...params.hostServices !== void 0 && { hostServices: params.hostServices },
		pluginIds: params.startupPluginIds,
		pluginLookUpTable: params.pluginLookUpTable,
		channelPluginLoadIntent: "full",
		startupTrace: params.startupTrace,
		ambientEnvTriggers: params.ambientEnvTriggers,
		...params.resolveGatewayContext ? { resolveGatewayContext: params.resolveGatewayContext } : {}
	});
	try {
		withPluginRegistryPreparationScope(loaded.pluginRegistry, () => withPluginRuntimeRegistryScope(loaded.pluginRegistry, () => validateConfiguredBindings(loaded.resolvedConfig)));
		warnUnregisteredConfiguredMemoryEmbeddingProviders({
			config: loaded.resolvedConfig,
			pluginRegistry: loaded.pluginRegistry,
			log: params.log
		});
		withPluginRuntimeRegistryScope(loaded.pluginRegistry, () => warnConfiguredMemoryEmbeddingProviderSetup({
			config: loaded.resolvedConfig,
			pluginRegistry: loaded.pluginRegistry,
			pluginLookUpTable: params.pluginLookUpTable,
			log: params.log
		})).catch((error) => {
			params.log.warn(`Memory embedding setup checks failed: ${String(error)}`);
		});
		const metadata = getPluginRuntimeLoadContext(loaded.pluginRegistry)?.metadataSnapshot;
		const { settlePluginNativeAdmissions } = await import("./plugin-native-admission-state-B8KtxnAW.mjs");
		await settlePluginNativeAdmissions(metadata ? getPluginMetadataSnapshotCache(metadata) : void 0);
		return loaded;
	} catch (error) {
		loaded.retireGatewayRuntimeBindings();
		await disposePluginRegistryInstances(loaded.pluginRegistry).catch((cleanupError) => {
			throw new AggregateError([error, cleanupError], "Startup plugin candidate cleanup failed", { cause: error });
		});
		throw error;
	}
}
//#endregion
export { loadGatewayStartupPluginRuntime, prepareGatewayPluginBootstrap, resolveGatewayStartupMaintenanceConfig, runGatewayStartupMaintenance, warnUnregisteredConfiguredMemoryEmbeddingProviders };
