import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { t as createLazyImportLoader } from "./lazy-promise-DGqyc4Y4.mjs";
import "./utils-DUAwk2p5.mjs";
import { t as GENERATED_BUNDLED_CHANNEL_CONFIG_METADATA } from "./bundled-channel-config-metadata.generated-BrjnqnKW.mjs";
import { t as collectStatusScanOverview } from "./status.scan-overview-Z-tZIYWu.mjs";
import { t as executeStatusScanFromOverview } from "./status.scan-execute-DxGipIaT.mjs";
//#region src/commands/status.scan.fast-json.ts
const statusGatewayModuleLoader = createLazyImportLoader(() => import("./status.scan.gateway-r-3OW5-S.mjs"));
const statusScanMemoryModuleLoader = createLazyImportLoader(() => import("./status.scan-memory-B55ABDQ8.mjs"));
const statusScanPluginStatusModuleLoader = createLazyImportLoader(() => import("./status--1EOmBqL.mjs"));
const IGNORED_CHANNEL_CONFIG_KEYS = /* @__PURE__ */ new Set(["defaults", "modelByChannel"]);
const STATUS_JSON_CHANNEL_ENV_PREFIXES = GENERATED_BUNDLED_CHANNEL_CONFIG_METADATA.filter((entry) => entry.configurable !== false).map((entry) => `${entry.channelId.replace(/[^a-z0-9]+/gi, "_").toUpperCase()}_`);
const STATUS_JSON_CHANNEL_ENV_VARS = new Set(GENERATED_BUNDLED_CHANNEL_CONFIG_METADATA.filter((entry) => entry.configurable !== false).flatMap((entry) => entry.channelEnvVars ?? []));
function hasExplicitStatusJsonChannelConfig(cfg) {
	if (!isRecord(cfg.channels)) return false;
	return Object.entries(cfg.channels).some(([key, value]) => !IGNORED_CHANNEL_CONFIG_KEYS.has(key) && isRecord(value) && Object.keys(value).some((field) => field !== "enabled"));
}
function hasStatusJsonChannelEnvConfig(env = process.env) {
	return Object.entries(env).some(([key, value]) => typeof value === "string" && value.trim().length > 0 && (STATUS_JSON_CHANNEL_ENV_VARS.has(key) || STATUS_JSON_CHANNEL_ENV_PREFIXES.some((prefix) => key.startsWith(prefix))));
}
async function scanStatusJsonFast(opts, runtime) {
	const online = await (await statusGatewayModuleLoader.load()).scanStatusJsonGateway(opts);
	if (online.scan) return online.scan;
	const overview = await collectStatusScanOverview({
		env: process.env,
		commandName: "status --json",
		opts,
		showSecrets: false,
		runtime,
		allowMissingConfigFastPath: true,
		resolveHasConfiguredChannels: (cfg) => hasExplicitStatusJsonChannelConfig(cfg) || hasStatusJsonChannelEnvConfig(),
		includeChannelsData: false,
		fetchGitUpdate: opts.all === true,
		includeRegistryUpdate: opts.all === true,
		includeLocalStatusRpcFallback: opts.all === true,
		gatewaySnapshot: online.gatewaySnapshot
	});
	const pluginCompatibility = opts.all ? await statusScanPluginStatusModuleLoader.load().then(({ buildPluginCompatibilitySnapshotNotices }) => buildPluginCompatibilitySnapshotNotices({ config: overview.cfg })) : [];
	return await executeStatusScanFromOverview({
		overview,
		runtime,
		resolveMemory: async ({ cfg, agentStatus, memoryPlugin }) => {
			if (!opts.all) return null;
			const { resolveDefaultMemoryDatabasePath, resolveStatusMemoryStatusSnapshot } = await statusScanMemoryModuleLoader.load();
			return await resolveStatusMemoryStatusSnapshot({
				cfg,
				agentStatus,
				memoryPlugin,
				requireDefaultDatabasePath: resolveDefaultMemoryDatabasePath
			});
		},
		channelIssues: overview.channelIssues,
		channels: overview.channels,
		pluginCompatibility
	});
}
//#endregion
export { scanStatusJsonFast as t };
