import { w as parseStrictPositiveInteger, x as parseStrictFiniteNumber } from "./number-coercion-Dq1l5muL.mjs";
import { r as defaultRuntime } from "./runtime-BC29JSZp.mjs";
import { a as resolveAgentDir, l as resolveAgentOperationAgentId, m as resolveConfiguredAgentId } from "./agent-scope-config-Dm6T00l4.mjs";
import "./agent-scope-L_eY3Hj7.mjs";
import { t as getProviderEnvVarsCore } from "./provider-env-vars-BPrlF8Sq.mjs";
import { D as setRuntimeConfigSnapshot, l as getRuntimeConfigSourceSnapshot } from "./runtime-snapshot-BHGp6OxI.mjs";
import { r as getRuntimeConfig } from "./io.runtime-BOdk1dW9.mjs";
import "./config-D1R2igem.mjs";
import { n as inheritOptionFromParent } from "./command-options-BDuSHeWG.mjs";
import { p as listProfilesForProvider } from "./order-Du3RLv_J.mjs";
import { o as loadAuthProfileStoreForRuntime } from "./store-runtime-BpJB9uZ1.mjs";
import "./auth-profiles-DCINaNQ4.mjs";
import { n as parseTimeoutMsWithFallback } from "./parse-timeout-Bk1085i8.mjs";
import { t as resolveCommandConfigWithSecrets } from "./command-config-resolution-8Fgug16_.mjs";
//#region src/cli/capability-cli/shared.ts
function resolveTransport(opts) {
	if (opts.local && opts.gateway) throw new Error("Pass only one of --local or --gateway.");
	if (opts.local) {
		if (!opts.supported.includes("local")) throw new Error("This command does not support --local.");
		return "local";
	}
	if (opts.gateway) {
		if (!opts.supported.includes("gateway")) throw new Error("This command does not support --gateway.");
		return "gateway";
	}
	return opts.defaultTransport;
}
function hasOwnKeys(value) {
	return Boolean(value && typeof value === "object" && Object.keys(value).length > 0);
}
function resolveSelectedProviderFromModelRef(modelRef) {
	return resolveModelRefOverride(modelRef).provider;
}
function resolveCapabilityProviderAgentId(cfg, rawAgentId, surface = "inference provider inspection") {
	const requestedAgentId = rawAgentId?.trim();
	if (rawAgentId !== void 0 && !requestedAgentId) throw new Error("--agent must not be blank");
	const agentId = resolveAgentOperationAgentId(cfg, requestedAgentId, {
		surface,
		hint: "Pass --agent <id> or set agents.defaults.systemAgent.agentId."
	});
	return resolveConfiguredAgentId(cfg, agentId);
}
function resolveCapabilityAgentOption(command, rawAgentId) {
	return typeof rawAgentId === "string" ? rawAgentId : inheritOptionFromParent(command, "agent");
}
function providerHasGenericConfig(params) {
	const modelsProviders = params.cfg.models?.providers ?? {};
	const pluginEntries = params.cfg.plugins?.entries ?? {};
	const ttsProviders = params.cfg.tts?.providers ?? {};
	const envConfigured = (params.envVars ?? getProviderEnvVarsCore(params.providerId, {
		config: params.cfg,
		includeUntrustedWorkspacePlugins: false
	})).some((envVar) => Boolean(process.env[envVar]?.trim()));
	return (params.agentId ? listProfilesForProvider(loadAuthProfileStoreForRuntime(resolveAgentDir(params.cfg, params.agentId)), params.providerId).length > 0 : false) || hasOwnKeys(modelsProviders[params.providerId]) || hasOwnKeys(pluginEntries[params.providerId]?.config) || hasOwnKeys(ttsProviders[params.providerId]) || envConfigured;
}
function resolveModelRefOverride(raw) {
	const trimmed = raw?.trim();
	if (!trimmed) return {};
	const slash = trimmed.indexOf("/");
	if (slash <= 0 || slash === trimmed.length - 1) return { model: trimmed };
	return {
		provider: trimmed.slice(0, slash),
		model: trimmed.slice(slash + 1)
	};
}
function requireProviderModelOverride(raw) {
	const resolved = resolveModelRefOverride(raw);
	if (!raw?.trim()) return;
	if (!resolved.provider || !resolved.model) throw new Error("Model overrides must use the form <provider/model>.");
	return {
		provider: resolved.provider,
		model: resolved.model
	};
}
function parseOptionalFiniteNumber(raw, label) {
	if (raw === void 0) return;
	const value = parseStrictFiniteNumber(raw);
	if (value === void 0) throw new Error(`${label} must be a finite number`);
	return value;
}
function parseOptionalPositiveInteger(raw, label) {
	if (raw === void 0) return;
	const value = parseStrictPositiveInteger(raw);
	if (value === void 0) throw new Error(`${label} must be a positive integer`);
	return value;
}
function parseOptionalTimeoutMs(raw, flagName = "--timeout-ms") {
	if (raw === void 0) return;
	return parseTimeoutMsWithFallback(raw, 0, {
		invalidType: "error",
		flagName
	});
}
async function resolveLocalCapabilityRuntimeConfig(params) {
	const cfg = params.config ?? getRuntimeConfig();
	const { effectiveConfig } = await resolveCommandConfigWithSecrets({
		config: cfg,
		commandName: params.commandName,
		targetIds: params.targetIds,
		...params.allowedPaths ? { allowedPaths: params.allowedPaths } : {},
		...params.forcedActivePaths ? { forcedActivePaths: params.forcedActivePaths } : {},
		...params.optionalActivePaths ? { optionalActivePaths: params.optionalActivePaths } : {},
		runtime: defaultRuntime,
		autoEnable: true
	});
	pinRuntimeConfigSnapshot(effectiveConfig);
	return effectiveConfig;
}
async function resolveLocalCapabilityAgent(params) {
	const cfg = await resolveLocalCapabilityRuntimeConfig(params);
	const agentId = resolveCapabilityProviderAgentId(cfg, params.agent, params.surface ?? params.commandName);
	const { prepareLocalCapabilityAccountSecrets } = await import("./local-account-secrets-C2hA8SW5.mjs");
	await prepareLocalCapabilityAccountSecrets({
		cfg,
		agentId
	});
	return {
		cfg,
		agentId,
		agentDir: resolveAgentDir(cfg, agentId)
	};
}
function pinRuntimeConfigSnapshot(config) {
	const sourceConfig = getRuntimeConfigSourceSnapshot();
	if (sourceConfig) setRuntimeConfigSnapshot(config, sourceConfig);
	else setRuntimeConfigSnapshot(config);
}
//#endregion
export { providerHasGenericConfig as a, resolveCapabilityProviderAgentId as c, resolveModelRefOverride as d, resolveSelectedProviderFromModelRef as f, pinRuntimeConfigSnapshot as i, resolveLocalCapabilityAgent as l, parseOptionalPositiveInteger as n, requireProviderModelOverride as o, resolveTransport as p, parseOptionalTimeoutMs as r, resolveCapabilityAgentOption as s, parseOptionalFiniteNumber as t, resolveLocalCapabilityRuntimeConfig as u };
