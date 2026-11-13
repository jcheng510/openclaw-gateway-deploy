import { l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import { o as resolveUserPath } from "./home-dir-CjKH62jd.mjs";
import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import "./utils-DUAwk2p5.mjs";
import { c as isSecretRef } from "./ref-contract-D0kWy5jy.mjs";
import "./types.secrets-BXEuin38.mjs";
import { t as formatCliCommand } from "./command-format-Cte1SWM4.mjs";
import { n as findNormalizedProviderValue, r as normalizeProviderId } from "./provider-id-BIyeXQag.mjs";
import { o as tryResolveDefaultAgentId } from "./agent-roster-B45JERT5.mjs";
import { n as defaultSlotIdForKey } from "./slots-CSgIxf6O.mjs";
import { l as normalizePluginsConfig } from "./config-state-D-KaEbbt.mjs";
import { h as listProviderPolicyOwners } from "./plugin-metadata-snapshot-Ctf1TsvW.mjs";
import "./agent-scope-L_eY3Hj7.mjs";
import { t as getProviderEnvVarsCore } from "./provider-env-vars-BPrlF8Sq.mjs";
import { a as resolveManifestOwnerBasePolicyBlock } from "./manifest-owner-policy-DyoKFqGS.mjs";
import { n as loadPluginManifestRegistryForPluginRegistry } from "./plugin-registry-contributions-CZq67NZQ.mjs";
import { t as loadProviderPolicyArtifacts } from "./provider-public-artifacts-DzU0Zs8g.mjs";
import "./legacy-BsVKffEe.mjs";
import "./legacy-config-migrations.runtime.models-Dl5Y6YWP.mjs";
import { o as resolveRememberAcrossConversations } from "./config-utils-DioOBKyj.mjs";
import "./plugin-registry-BbOSHtTb.mjs";
import { n as hasAuthProfileStoreSourceForProvider, t as hasAnyAuthProfileStoreSource } from "./source-check-CU2dwDSm.mjs";
import { t as isConfiguredAwsSdkAuthProfileForProvider } from "./order-Du3RLv_J.mjs";
import { t as resolveEnvApiKey } from "./model-auth-env-D6-JZ2i2.mjs";
import { S as resolveUsableCustomProviderApiKey } from "./model-auth-provider-config-hHBq41iK.mjs";
import "./auth-profiles-DCINaNQ4.mjs";
import { t as resolveApiKeyForProviderCore } from "./model-auth-provider-GP8l5DsY.mjs";
import "./model-auth-ByqXHWUV.mjs";
import { t as note } from "./note-BpWs6H5N.mjs";
import { s as resolveActiveMemoryBackendConfig } from "./memory-runtime-OxiS29vI.mjs";
import { t as resolveMemorySearchConfig } from "./memory-search-Dgo94r6q.mjs";
import { t as hasConfiguredMemorySecretInput } from "./secret-input-CX3H7wil.mjs";
import "./secret-BVY1jdHw.mjs";
import { a as getMissingLocalMemoryEmbeddingProviderMessage } from "./memory-core-bundled-runtime-DFb7S5fW.mjs";
import { n as resolveMemoryDoctorAgentScopes, t as formatMemoryDoctorAgentMessage } from "./doctor-memory-scope-gwntCWG1.mjs";
import { i as noteWorkspaceMemoryHealth } from "./doctor-workspace-Bw6KVdCR.mjs";
import { safeStatSync } from "@openclaw/fs-safe/path";
//#region src/commands/doctor-memory-search-local.ts
function formatLocalRuntimeDoctorNote(facts) {
	const backend = facts.backend ?? "unknown";
	const build = facts.buildInfo ? `, ${facts.buildInfo}` : "";
	const model = facts.model?.id ? `\nModel: ${facts.model.id}${facts.model.path ? ` (${facts.model.path})` : ""}` : "";
	const capabilities = facts.capabilities ? `\nCapabilities: ${[facts.capabilities.vision ? "vision" : null, facts.capabilities.draft ? "draft" : null].filter(Boolean).join(", ") || "text only"}` : "";
	const endpoints = facts.endpoints ? `\nEndpoints: ${Object.entries(facts.endpoints).map(([name, status]) => `${name}=${status}`).join(" ")}` : "";
	const loadError = facts.loadError ? `\nLoad error: ${facts.loadError}` : "";
	return `llama.cpp server: ${backend}${build}${facts.state === "ready" ? "" : ` (${facts.state})`}${model}${capabilities}${endpoints}${loadError}`;
}
function resolveLocalProviderPolicyBlockGuidance(reason, pluginId) {
	switch (reason) {
		case "plugins-disabled": return {
			message: "Plugin loading is disabled for this config.",
			fix: `Fix: ${formatCliCommand("openclaw config set plugins.enabled true --strict-json")}, or select another memory provider.`
		};
		case "blocked-by-denylist": return {
			message: `Installed plugin "${pluginId}" is blocked by plugins.deny.`,
			fix: `Fix: Remove "${pluginId}" from plugins.deny, or select another memory provider.`
		};
		case "plugin-disabled": return {
			message: `Installed plugin "${pluginId}" is disabled for this config.`,
			fix: `Fix: Enable it: ${formatCliCommand(`openclaw plugins enable ${pluginId} --accept-capabilities`)}, or select another memory provider.`
		};
		case "not-in-allowlist": return {
			message: `Installed plugin "${pluginId}" is omitted from plugins.allow.`,
			fix: `Fix: Include "${pluginId}" in plugins.allow, or select another memory provider.`
		};
	}
	return reason;
}
//#endregion
//#region src/commands/doctor-memory-search.ts
const MEMORY_EMBEDDING_PROVIDER_AUTH_IDS = /* @__PURE__ */ new Map([
	["github-copilot", "github-copilot"],
	["openai", "openai"],
	["gemini", "google"],
	["voyage", "voyage"],
	["mistral", "mistral"],
	["bedrock", "amazon-bedrock"]
]);
const OPENAI_COMPATIBLE_MEMORY_EMBEDDING_PROVIDER = "openai-compatible";
const OPENAI_COMPATIBLE_MODEL_APIS = /* @__PURE__ */ new Set(["openai-completions", "openai-responses"]);
function hasConfiguredAwsSdkAuthForProvider(provider, cfg) {
	if (findNormalizedProviderValue(cfg.models?.providers, provider)?.auth === "aws-sdk") return true;
	return (findNormalizedProviderValue(cfg.auth?.order, provider) ?? (cfg.auth?.profiles ? Object.keys(cfg.auth.profiles) : [])).some((profileId) => isConfiguredAwsSdkAuthProfileForProvider({
		cfg,
		provider,
		profileId
	}));
}
function isOpenAICompatibleMemoryProvider(providerId, cfg) {
	const normalizedProviderId = normalizeProviderId(providerId);
	if (normalizedProviderId === OPENAI_COMPATIBLE_MEMORY_EMBEDDING_PROVIDER) return true;
	if (MEMORY_EMBEDDING_PROVIDER_AUTH_IDS.has(normalizedProviderId)) return false;
	const providerConfig = findNormalizedProviderValue(cfg.models?.providers, providerId);
	if (!providerConfig) return false;
	const api = normalizeProviderId(providerConfig.api ?? "");
	if (api === OPENAI_COMPATIBLE_MEMORY_EMBEDDING_PROVIDER || OPENAI_COMPATIBLE_MODEL_APIS.has(api)) return true;
	return !api && Boolean(normalizeOptionalString(providerConfig.baseUrl));
}
function resolveOpenAICompatibleMemoryBaseUrl(providerId, cfg, remoteBaseUrl) {
	return normalizeOptionalString(remoteBaseUrl) ?? normalizeOptionalString(findNormalizedProviderValue(cfg.models?.providers, providerId)?.baseUrl);
}
function isKeyOptionalMemoryProvider(providerId, cfg) {
	return providerId === "local" || providerId === "ollama" || providerId === "lmstudio" || isOpenAICompatibleMemoryProvider(providerId, cfg);
}
function hasActiveAlternateMemoryPluginSlot(cfg) {
	const plugins = normalizePluginsConfig(cfg.plugins);
	if (!plugins.enabled) return false;
	const memorySlot = plugins.slots.memory;
	if (typeof memorySlot !== "string" || memorySlot.length === 0) return false;
	if (memorySlot === defaultSlotIdForKey("memory")) return false;
	if (plugins.deny.includes(memorySlot)) return false;
	if (!Object.hasOwn(plugins.entries, memorySlot)) return false;
	const entry = plugins.entries[memorySlot];
	if (!entry || entry.enabled === false) return false;
	return entry.enabled === true || entry.config !== void 0;
}
function isActiveMemoryPluginAvailable(cfg) {
	const plugins = normalizePluginsConfig(cfg.plugins);
	if (!plugins.enabled || plugins.deny.includes("active-memory")) return false;
	if (plugins.allow.length > 0 && !plugins.allow.includes("active-memory")) return false;
	const entry = plugins.entries["active-memory"];
	if (entry?.enabled === false) return false;
	return (isRecord(entry?.config) ? entry.config : void 0)?.enabled !== false;
}
function resolveActiveMemoryConversationRecallSupport(cfg) {
	const providerSupported = normalizePluginsConfig(cfg.plugins).slots.memory === defaultSlotIdForKey("memory");
	const entry = cfg.plugins?.entries?.["active-memory"];
	const config = isRecord(entry?.config) ? entry.config : void 0;
	if (!Array.isArray(config?.toolsAllow)) return {
		providerSupported,
		memorySearchAllowed: true
	};
	return {
		providerSupported,
		memorySearchAllowed: config.toolsAllow.some((toolName) => typeof toolName === "string" && toolName.trim().toLowerCase() === "memory_search")
	};
}
function inspectRememberAcrossConversationsHealth(params) {
	if (!resolveRememberAcrossConversations(params.cfg, params.agentId)) return { enabled: false };
	const activeMemoryAvailable = isActiveMemoryPluginAvailable(params.cfg);
	const conversationRecallSupport = resolveActiveMemoryConversationRecallSupport(params.cfg);
	if (!activeMemoryAvailable) params.report(`Remember across conversations is effectively enabled for agent "${params.agentId}", but the Active Memory plugin is disabled. Enable the plugin or set memory.search.rememberAcrossConversations to false.`);
	if (activeMemoryAvailable && !conversationRecallSupport.providerSupported) params.report(`Remember across conversations is effectively enabled for agent "${params.agentId}", but the current memory provider does not support protected private transcript recall. Set memory.search.rememberAcrossConversations to false or use that provider's own recall path; advanced Active Memory can still use its recall tools.`);
	else if (activeMemoryAvailable && !conversationRecallSupport.memorySearchAllowed) params.report(`Remember across conversations is effectively enabled for agent "${params.agentId}", but Active Memory does not allow memory_search. Add memory_search to the plugin toolsAllow list or set memory.search.rememberAcrossConversations to false.`);
	return { enabled: true };
}
async function noteMemorySearchHealth(cfg, opts) {
	await inspectMemorySearchHealth(cfg, opts ?? {}, ({ text }) => note(text, "Memory search"));
}
async function collectMemorySearchHealthFindings(ctx) {
	const findings = [];
	await inspectMemorySearchHealth(ctx.cfg, {
		env: ctx.env,
		includeWorkspaceMemoryHealth: false,
		skipAuthProfileResolution: true,
		gatewayMemoryProbe: {
			checked: false,
			ready: false,
			skipped: true
		}
	}, ({ finding }) => {
		if (finding) findings.push(finding);
	});
	return findings;
}
async function inspectMemorySearchHealth(cfg, opts, emit) {
	const scopes = resolveMemoryDoctorAgentScopes(cfg);
	const defaultAgentId = tryResolveDefaultAgentId(cfg);
	const labelAgents = scopes.length > 1;
	for (const scope of scopes) {
		if (opts.includeWorkspaceMemoryHealth !== false) await noteWorkspaceMemoryHealth(cfg, {
			agentId: scope.agentId,
			workspaceDir: scope.workspaceDir,
			labelAgent: labelAgents
		});
		const report = (message, path = "memory.search.provider", disabled = false) => {
			const text = formatMemoryDoctorAgentMessage(scope.agentId, labelAgents, message);
			const [firstLine, ...details] = text.split("\n");
			const fixHint = details.map((line) => line.trimEnd()).join("\n").trim();
			emit({
				text,
				finding: disabled && !labelAgents ? null : {
					checkId: "core/doctor/memory-search",
					severity: "warning",
					message: (firstLine ?? text).trim(),
					path,
					...fixHint ? { fixHint } : {}
				}
			});
		};
		await inspectMemorySearchHealthForAgent(cfg, scope, {
			...opts,
			gatewayMemoryProbe: scope.agentId === defaultAgentId || opts.gatewayMemoryProbe?.skipped ? opts.gatewayMemoryProbe : void 0
		}, report);
	}
}
async function inspectMemorySearchHealthForAgent(cfg, scope, opts, report) {
	const { agentId, agentDir } = scope;
	const resolved = resolveMemorySearchConfig(cfg, agentId);
	if (!resolved) {
		const recallHealth = inspectRememberAcrossConversationsHealth({
			cfg,
			agentId,
			report
		});
		report(recallHealth.enabled ? `Remember across conversations is effectively enabled for agent "${agentId}", but memory search is disabled. Enable memory search or set memory.search.rememberAcrossConversations to false.` : "Memory search is explicitly disabled (enabled: false).", "memory.search.provider", !recallHealth.enabled);
		return;
	}
	const provider = resolved.provider;
	const normalizedPlugins = normalizePluginsConfig(cfg.plugins);
	if (provider === "local" && !normalizedPlugins.enabled) {
		const policyBlock = resolveLocalProviderPolicyBlockGuidance("plugins-disabled", provider);
		report([
			policyBlock.message,
			"",
			policyBlock.fix,
			"",
			`Verify: ${formatCliCommand("openclaw memory status --deep")}`
		].join("\n"));
		return;
	}
	inspectRememberAcrossConversationsHealth({
		cfg,
		agentId,
		report
	});
	const hasRemoteApiKey = hasConfiguredMemorySecretInput(resolved.remote?.apiKey);
	if (!resolveActiveMemoryBackendConfig({
		cfg,
		agentId
	})) {
		if (opts?.gatewayMemoryProbe?.checked && opts.gatewayMemoryProbe.ready) return;
		if (hasActiveAlternateMemoryPluginSlot(cfg)) return;
		report("No active memory plugin is registered for the current config.", "plugins.slots.memory");
		return;
	}
	if (provider === "none") return;
	if (provider === "local") {
		const runtimeFacts = opts?.gatewayMemoryProbe?.runtimeFacts;
		if (opts?.gatewayMemoryProbe?.checked && opts.gatewayMemoryProbe.ready) {
			if (runtimeFacts) report(formatLocalRuntimeDoctorNote(runtimeFacts));
			return;
		}
		const hasExplicitLocalModel = hasLocalEmbeddings(resolved.local);
		const hasUnavailableConfiguredLocalModel = Boolean(normalizeOptionalString(resolved.local.modelPath)) && !hasExplicitLocalModel;
		const detail = opts?.gatewayMemoryProbe?.error?.trim();
		const gatewayDetail = detail && detail !== runtimeFacts?.loadError ? detail : null;
		const env = opts.env ?? process.env;
		const manifestRegistry = loadPluginManifestRegistryForPluginRegistry({
			config: cfg,
			env,
			includeDisabled: true
		});
		const installedOwners = listProviderPolicyOwners(provider, manifestRegistry);
		if (installedOwners.length === 0) {
			report(getMissingLocalMemoryEmbeddingProviderMessage());
			return;
		}
		const ownerPolicies = installedOwners.map((owner) => ({
			owner,
			policyBlock: resolveManifestOwnerBasePolicyBlock({
				plugin: owner,
				normalizedConfig: normalizedPlugins
			})
		}));
		const eligibleOwners = ownerPolicies.filter(({ policyBlock }) => !policyBlock).map(({ owner }) => owner);
		const policyArtifacts = eligibleOwners.length > 0 ? loadProviderPolicyArtifacts(eligibleOwners) : null;
		let installedOwner;
		let ownerPolicyBlock;
		if (policyArtifacts) {
			installedOwner = policyArtifacts.owner;
			ownerPolicyBlock = null;
		} else {
			const blockedOwner = ownerPolicies.find(({ policyBlock }) => policyBlock);
			if (!blockedOwner) throw new Error(`Unable to resolve the installed provider owner for "${provider}".`);
			installedOwner = blockedOwner.owner;
			ownerPolicyBlock = blockedOwner.policyBlock;
		}
		const providerPolicy = policyArtifacts?.surface;
		const inspectSetup = ownerPolicyBlock ? void 0 : providerPolicy?.inspectEmbeddingProviderSetup;
		const setup = inspectSetup ? await inspectSetup({
			config: cfg,
			env,
			agentId,
			provider
		}) : null;
		const setupReason = setup?.reason.trim();
		const setupFix = setup?.fixHint?.trim();
		const updateFix = !ownerPolicyBlock && !inspectSetup ? `Fix: Update the installed plugin: ${formatCliCommand(`openclaw plugins update ${installedOwner.id}`)}` : null;
		const policyBlock = ownerPolicyBlock ? resolveLocalProviderPolicyBlockGuidance(ownerPolicyBlock, installedOwner.id) : null;
		if (opts?.gatewayMemoryProbe?.skipped && !hasUnavailableConfiguredLocalModel && !setup && !policyBlock && !updateFix) return;
		const hasRuntimeFailureDetail = Boolean(gatewayDetail || runtimeFacts?.loadError);
		report([
			runtimeFacts ? formatLocalRuntimeDoctorNote(runtimeFacts) : null,
			runtimeFacts ? "" : null,
			hasExplicitLocalModel ? "Memory search provider is set to \"local\" and a local model path is configured, but local embeddings are not confirmed ready." : "Memory search provider is set to \"local\", but local embeddings are not confirmed ready.",
			setupReason ? `Setup: ${setupReason}` : null,
			policyBlock?.message,
			updateFix ? `Installed plugin "${installedOwner.id}" does not provide current local-memory setup diagnostics.` : null,
			gatewayDetail && gatewayDetail !== setupReason ? `Gateway probe: ${gatewayDetail}` : null,
			"",
			policyBlock?.fix ?? updateFix ?? (setupFix ? `Fix: ${setupFix}` : hasUnavailableConfiguredLocalModel ? "Fix: Set memory.search.local.modelPath to an existing GGUF file, or remove it to use the managed default." : hasRuntimeFailureDetail ? "Fix: Repair the llama.cpp server problem reported by the Gateway." : null),
			"",
			`Verify: ${formatCliCommand("openclaw memory status --deep")}`
		].filter(Boolean).join("\n"));
		return;
	}
	if (isOpenAICompatibleMemoryProvider(provider, cfg) && !resolveOpenAICompatibleMemoryBaseUrl(provider, cfg, resolved.remote?.baseUrl)) {
		report([
			`Memory search provider is set to "${provider}" but no OpenAI-compatible embeddings endpoint was configured.`,
			"Set memory.search.remote.baseUrl to the /v1 endpoint for your embeddings server.",
			"",
			"Fix:",
			`- ${formatCliCommand("openclaw config set memory.search.remote.baseUrl http://127.0.0.1:1234/v1")}`,
			"",
			`Verify: ${formatCliCommand("openclaw memory status --deep")}`
		].join("\n"), "memory.search.remote.baseUrl");
		return;
	}
	if (isOpenAICompatibleMemoryProvider(provider, cfg) && !normalizeOptionalString(resolved.model)) {
		report([
			`Memory search provider is set to "${provider}" but no OpenAI-compatible embedding model was configured.`,
			"Set memory.search.model to the embedding model id your server expects.",
			"",
			"Fix:",
			`- ${formatCliCommand("openclaw config set memory.search.model text-embedding-bge-m3")}`,
			"",
			`Verify: ${formatCliCommand("openclaw memory status --deep")}`
		].join("\n"), "memory.search.model");
		return;
	}
	if (isKeyOptionalMemoryProvider(provider, cfg)) {
		if (opts?.gatewayMemoryProbe?.checked && opts.gatewayMemoryProbe.ready) return;
		if (opts?.gatewayMemoryProbe?.skipped) return;
		const gatewayProbeWarning = buildGatewayProbeWarning(opts?.gatewayMemoryProbe);
		report([
			gatewayProbeWarning ? `Memory search provider "${provider}" is configured, but the gateway reports embeddings are not ready.` : `Memory search provider "${provider}" is configured, but the gateway could not confirm embeddings are ready.`,
			gatewayProbeWarning,
			`Verify: ${formatCliCommand("openclaw memory status --deep")}`
		].filter(Boolean).join("\n"));
		return;
	}
	if (hasRemoteApiKey || await hasApiKeyForProvider(provider, cfg, agentDir, { skipProfileResolution: opts?.skipAuthProfileResolution === true })) return;
	if (opts?.gatewayMemoryProbe?.checked && opts.gatewayMemoryProbe.ready) {
		report([
			`Memory search provider is set to "${provider}" but the API key was not found in the CLI environment.`,
			"The running gateway reports memory embeddings are ready for the default agent.",
			`Verify: ${formatCliCommand("openclaw memory status --deep")}`
		].join("\n"));
		return;
	}
	const gatewayProbeWarning = buildGatewayProbeWarning(opts?.gatewayMemoryProbe);
	const envVar = resolvePrimaryMemoryProviderEnvVar(provider);
	report([
		`Memory search provider is set to "${provider}" but no API key was found.`,
		`Semantic recall will not work without a valid API key.`,
		gatewayProbeWarning ? gatewayProbeWarning : null,
		"",
		"Fix (pick one):",
		`- Set ${envVar} in your environment`,
		`- Configure credentials: ${formatCliCommand("openclaw configure --section model")}`,
		`- To disable: ${formatCliCommand("openclaw config set memory.search.enabled false")}`,
		"",
		`Verify: ${formatCliCommand("openclaw memory status --deep")}`
	].join("\n"));
}
function hasLocalEmbeddings(local) {
	const modelPath = normalizeOptionalString(local.modelPath);
	if (!modelPath) return false;
	if (/^(hf:|https?:)/i.test(modelPath)) return true;
	const resolved = resolveUserPath(modelPath);
	return safeStatSync(resolved)?.isFile() ?? false;
}
async function hasApiKeyForProvider(provider, cfg, agentDir, opts) {
	const authProviderId = MEMORY_EMBEDDING_PROVIDER_AUTH_IDS.get(provider) ?? provider;
	if (isSecretRef(findNormalizedProviderValue(cfg.models?.providers, authProviderId)?.apiKey) || resolveEnvApiKey(authProviderId) || resolveUsableCustomProviderApiKey({
		cfg,
		provider: authProviderId
	})) return true;
	if (opts?.skipProfileResolution === true) {
		if (authProviderId === "amazon-bedrock") return hasConfiguredAwsSdkAuthForProvider(authProviderId, cfg);
		const orderedProfileIds = findNormalizedProviderValue(cfg.auth?.order, authProviderId);
		return orderedProfileIds === void 0 ? hasAuthProfileStoreSourceForProvider(authProviderId, agentDir) : hasAuthProfileStoreSourceForProvider(authProviderId, agentDir, { profileIds: orderedProfileIds });
	}
	if (authProviderId !== "amazon-bedrock" && !hasAnyAuthProfileStoreSource(agentDir)) return false;
	try {
		await resolveApiKeyForProviderCore({
			provider: authProviderId,
			cfg,
			agentDir
		});
		return true;
	} catch {
		return false;
	}
}
function resolvePrimaryMemoryProviderEnvVar(provider) {
	if (provider === "openai") return "OPENAI_API_KEY";
	const authProviderId = MEMORY_EMBEDDING_PROVIDER_AUTH_IDS.get(provider);
	return (authProviderId ? getProviderEnvVarsCore(authProviderId)[0] : void 0) ?? `${provider.toUpperCase()}_API_KEY`;
}
function buildGatewayProbeWarning(probe) {
	if (!probe?.checked || probe.ready) return null;
	const detail = probe.error?.trim();
	return detail ? `Gateway memory probe for default agent is not ready: ${detail}` : "Gateway memory probe for default agent is not ready.";
}
//#endregion
export { collectMemorySearchHealthFindings, noteMemorySearchHealth };
