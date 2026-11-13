import { c as normalizeOptionalLowercaseString } from "./string-coerce-6kR-86XC.mjs";
import { t as createSubsystemLogger } from "./subsystem-CeqVSEVi.mjs";
import { g as resolveSessionAgentId } from "./agent-scope-L_eY3Hj7.mjs";
import { o as getRuntimeConfigSnapshot } from "./runtime-snapshot-BHGp6OxI.mjs";
import { t as AUTOMATIONS_TOOL_NAME } from "./automations-tool-name-DBMZPbPL.mjs";
import { l as normalizeToolPolicyName, o as expandToolGroups } from "./tool-policy-shared-DSNSYBF4.mjs";
import { n as createRuntimeToolMatcher } from "./tool-policy-match-COwlx5YS.mjs";
import { c as hasRestrictiveAllowPolicy, u as replaceWithEffectiveToolAllowlist } from "./tool-policy-C57wduz9.mjs";
import { i as resolveGatewayMessageChannel } from "./message-channel-normalize-CAZyLfyK.mjs";
import "./message-channel-DDiCYM9I.mjs";
import { i as logWarn } from "./logger-DmolGPgx.mjs";
import { o as getActiveSecretsRuntimeConfigSnapshot } from "./runtime-state-I0A0iuwu.mjs";
import { r as resolveImageSanitizationLimits } from "./image-sanitization-DhkMOJXD.mjs";
import { t as ToolAuthorizationError } from "./tool-input-error-mjW74R8m.mjs";
import { n as copyPluginToolMeta, r as getPluginToolMeta } from "./tool-metadata--ndgGyn8.mjs";
import { n as bindAssembledAgentToolActionDescriptor, r as copyAgentToolMetadata } from "./agent-tool-metadata-BZbVjjCx.mjs";
import { r as pinExecToolTarget } from "./exec-tool-target-pinning-CTUpUcAa.mjs";
import { u as wrapToolWithGatewayCallerIdentity } from "./gateway-caller-context-DQ2iIITl.mjs";
import { x as waitForExecScope } from "./bash-process-registry-BZy7vXn-.mjs";
import { u as isCompletionReportInputProvenance } from "./input-provenance-v8gTqxPd.mjs";
import { n as projectEffectiveExecPolicy, r as resolveSessionPermissionCoreToolPolicy } from "./session-permission-exec-mode-Bm_ZQ6Ge.mjs";
import { r as resolveToolFsConfig } from "./tool-fs-policy-DnnmQR8b.mjs";
import "./common-CnSoEQyp.mjs";
import { t as resolveScheduledToolCallerContext } from "./scheduled-tool-policy-dpd0XLqN.mjs";
import { t as resolveSessionPlacementComputer } from "./session-placement-computer-2-8Eh4vQ.mjs";
import { t as resolveConversationCapabilityProfile } from "./conversation-capability-profile-DC5b6Jzy.mjs";
import { n as resolveEventSessionRoutingPolicy } from "./event-session-routing-DKtD3QRJ.mjs";
import { t as getProcessSupervisor } from "./supervisor-Bkt-g18U.mjs";
import { t as HEARTBEAT_RESPONSE_TOOL_NAME } from "./heartbeat-tool-response-CZbTMQAj.mjs";
import { r as messageToolOwnsVisibleReply } from "./source-reply-delivery-mode-C0QKYTyh.mjs";
import { n as mergeGatewayAgentCliPath } from "./openclaw-cli-shim-s56_saib.mjs";
import { t as appendRuntimePluginToolGrant } from "./tool-grant-allowlist-8G1M1DiX.mjs";
import { t as applyToolPolicyPipeline } from "./tool-policy-pipeline-DUbvyPz4.mjs";
import { i as resolveConversationToolPolicies, n as isConversationToolAllowed, t as buildConversationToolPolicyPipelineSteps } from "./conversation-tool-policy-pipeline-sb3plgU7.mjs";
import { i as finalizeAgentTools, r as resolveConfiguredApplyPatchPolicy, t as createCoreCodingTools } from "./core-coding-tools-BmfxDnfH.mjs";
import { d as wrapToolMemoryFlushAppendOnlyWrite, p as createMemoryWriteProvenanceObserver } from "./agent-tools.read-D1M4eS-p.mjs";
import { n as resolveSandboxFileIdentity } from "./file-mutation-identity--w5QwGUN.mjs";
import { E as resolveLocalModelLeanPreserveToolNames, S as TOOL_SEARCH_RAW_TOOL_NAME, b as TOOL_DESCRIBE_RAW_TOOL_NAME, l as resolveToolSearchConfig, r as createToolSearchTools, w as filterLocalModelLeanTools, y as TOOL_CALL_RAW_TOOL_NAME } from "./tool-search-n_DuQ-T8.mjs";
import { t as resolveNativeWebSearchRoute } from "./native-web-search-xQ4u9WoH.mjs";
import { r as mergeAgentRingZeroTools, t as getActiveAgentRingZeroTools } from "./agent-tools.ring-zero-context-DcmTQndF.mjs";
import { t as resolveProcessToolScopeKey } from "./bash-process-scope-Bmw8_ghL.mjs";
import { n as listChannelAgentTools } from "./channel-tools-CWT9bm1n.mjs";
import { n as resolveExecToolConfig } from "./lazy-exec-tool-DeqgWNWL.mjs";
import { i as bindCronManagementGrant, n as bindActiveCronCreatorAuthorityResolver } from "./cron-creator-authority-context-D-BVNJXy.mjs";
import { l as prepareGitHubToolEnvironment } from "./github-tool-identity-fecb-JRm.mjs";
import { _ as resolveOpenClawPluginToolsForOptions, c as applySwarmCollectorToolContract, g as filterToolsByClientCaps, r as hasSessionControlAuthority, t as createOpenClawTools } from "./openclaw-tools-BwWTN0hs.mjs";
import { a as getInProcessGatewayToolContext } from "./in-process-gateway-D3MPtHXl.mjs";
import { n as filterRequesterYieldTools } from "./openclaw-tools.requester-yield-CSq4sgrt.mjs";
import { i as subagentAttachmentRootForRun } from "./subagent-attachment-paths-RH3egeZ6.mjs";
import { t as resolveToolLoopDetectionConfig } from "./tool-loop-detection-config-DDGfwcUc.mjs";
import "./cron-tool-DAk_frKB.mjs";
import { d as replaceWithEffectiveCronCreatorToolAllowlist } from "./cron-tool-creator-cap-DmXKLrHw.mjs";
import { r as GATEWAY_OWNER_ONLY_CORE_TOOLS } from "./dangerous-tools-D5_2xo_6.mjs";
import { t as buildDeclaredToolAllowlistContext } from "./tool-policy-declared-context-CwnDx-k1.mjs";
import { n as getSessionRowProjection } from "./session-row-projection-access-tcGTz6Lk.mjs";
import { t as captureSessionPortalTarget } from "./session-portal-target-D54R2k-a.mjs";
//#region src/agents/agent-tools.caller.ts
/** Carries the coding surface's prepared policy and requesting route into plugin delegation. */
function createCodingToolsGatewayCaller(params) {
	const { options, agentId, sessionKey, capabilityProfile } = params;
	const identity = options && agentId && sessionKey?.trim() ? {
		agentId,
		sessionKey: sessionKey.trim(),
		receiptAuthority: capabilityProfile.policy.requesterPolicySource === "completion-handoff" ? options.trustedInternalHandoff?.settleBatch?.isCurrent : void 0,
		assertToolAllowed: (toolName) => {
			if (!isConversationToolAllowed(capabilityProfile, toolName)) throw new Error(`${toolName} is not allowed by this conversation's tool policy`);
		},
		...options.abortSignal ? { approvalSignals: [options.abortSignal] } : {},
		turnSourceChannel: resolveGatewayMessageChannel(options.messageChannel ?? options.messageProvider),
		turnSourceTo: options.currentMessagingTarget ?? options.currentChannelId ?? options.messageTo,
		turnSourceAccountId: params.accountId,
		turnSourceThreadId: options.currentThreadTs ?? options.messageThreadId
	} : void 0;
	return (tool) => wrapToolWithGatewayCallerIdentity(tool, identity);
}
//#endregion
//#region src/agents/agent-tools.memory-flush.ts
/** A memory flush can read context and append to its one prepared memory path. */
function projectMemoryFlushTools(tools, write) {
	if (!write) return tools;
	return tools.flatMap((tool) => {
		if (tool.name === "read") return [tool];
		return tool.name === "write" ? [wrapToolMemoryFlushAppendOnlyWrite(tool, write)] : [];
	});
}
//#endregion
//#region src/agents/agent-tools.message-provider-policy.ts
/**
* Message-provider tool filtering.
* Channels can restrict tool names after runtime assembly when the active
* transport cannot safely render or execute a class of tools.
*/
const TOOL_DENY_BY_MESSAGE_PROVIDER = {
	"discord-voice": ["tts"],
	voice: ["tts"]
};
const TOOL_ALLOW_BY_MESSAGE_PROVIDER = { node: [
	"canvas",
	"pdf",
	"tts",
	"view_image",
	"web_fetch",
	"web_search"
] };
/**
* True when a provider's allowlist removes the tool by design rather than by an
* operator's policy. Callers that diagnose a missing tool use this to stay quiet about
* transports that were never meant to carry it.
*/
function messageProviderExcludesTool(messageProvider, toolName) {
	const normalizedProvider = normalizeOptionalLowercaseString(messageProvider);
	if (!normalizedProvider) return false;
	const allowedTools = TOOL_ALLOW_BY_MESSAGE_PROVIDER[normalizedProvider];
	return allowedTools !== void 0 && allowedTools.length > 0 && !allowedTools.includes(toolName);
}
/** Applies message-provider filtering while preserving duplicate tool entries. */
function filterToolsByMessageProvider(tools, messageProvider) {
	const normalizedProvider = normalizeOptionalLowercaseString(messageProvider);
	if (!normalizedProvider) return [...tools];
	const allowedTools = TOOL_ALLOW_BY_MESSAGE_PROVIDER[normalizedProvider];
	if (allowedTools && allowedTools.length > 0) {
		const allowedSet = new Set(allowedTools);
		return tools.filter((tool) => allowedSet.has(tool.name));
	}
	const deniedTools = TOOL_DENY_BY_MESSAGE_PROVIDER[normalizedProvider];
	if (!deniedTools || deniedTools.length === 0) return [...tools];
	const deniedSet = new Set(deniedTools);
	return tools.filter((tool) => !deniedSet.has(tool.name));
}
//#endregion
//#region src/agents/agent-tools.model-provider-policy.ts
function applyModelProviderToolPolicy(toolsInput, params) {
	const tools = filterLocalModelLeanTools({
		tools: toolsInput,
		config: params?.config,
		agentId: params?.agentId,
		sessionKey: params?.sessionKey,
		preserveToolNames: params?.localModelLeanPreserveToolNames ?? params?.runtimeToolAllowlist
	});
	if (params?.suppressManagedWebSearch !== false && resolveNativeWebSearchRoute({
		config: params?.config,
		modelProvider: params?.modelProvider,
		modelApi: params?.modelApi,
		modelBaseUrl: params?.modelBaseUrl,
		modelId: params?.modelId,
		agentId: params?.agentId,
		sessionKey: params?.sessionKey,
		agentDir: params?.agentDir,
		runtimeToolAllowlist: params?.runtimeToolAllowlist,
		pluginMetadataSnapshot: params?.preparedModelRuntime?.metadataSnapshot
	}).kind === "native") return tools.filter((tool) => tool.name !== "web_search");
	return tools;
}
//#endregion
//#region src/agents/delegation-capability.ts
const log = createSubsystemLogger("agents/delegation-capability");
const NEW_DELEGATION_TOOL_NAMES = /* @__PURE__ */ new Set([
	"codex_session_send",
	"llm-task",
	"openclaw",
	"sessions_send",
	"sessions_spawn"
]);
const REPORT_ONLY_TOOL_ACTIONS = /* @__PURE__ */ new Map([
	[AUTOMATIONS_TOOL_NAME, /* @__PURE__ */ new Set([
		"get",
		"list",
		"remove",
		"runs",
		"status"
	])],
	["image_generate", /* @__PURE__ */ new Set(["list", "status"])],
	["music_generate", /* @__PURE__ */ new Set(["list", "status"])],
	["video_generate", /* @__PURE__ */ new Set(["list", "status"])]
]);
const REPORT_ONLY_ERROR = "New delegation is unavailable while reporting a completion through a fallback model.";
function resolveDelegationCapability(params) {
	if (!isCompletionReportInputProvenance(params.inputProvenance)) return "full";
	if (params.fallbackActive || params.disableTools === true) return "report_only";
	if (params.toolsAllow === void 0) return "full";
	return [...NEW_DELEGATION_TOOL_NAMES].some(createRuntimeToolMatcher(params.toolsAllow)) ? "full" : "report_only";
}
function readToolAction(params) {
	if (!params || typeof params !== "object" || Array.isArray(params)) return "";
	const action = params.action;
	return typeof action === "string" ? action.trim().toLowerCase() : "";
}
function wrapReportOnlyTool(tool, allowedActions) {
	const wrapped = new Proxy(tool, { get(target, property, receiver) {
		if (property !== "execute") return Reflect.get(target, property, receiver);
		return async (toolCallId, params, signal, onUpdate) => {
			if (!allowedActions.has(readToolAction(params))) throw new ToolAuthorizationError(REPORT_ONLY_ERROR);
			return await target.execute(toolCallId, params, signal, onUpdate);
		};
	} });
	copyPluginToolMeta(tool, wrapped);
	return wrapped;
}
/**
* Enforces the run's delegation capability after ordinary tool authorization.
* Tool names and safe actions here are explicit built-in/plugin contracts: the
* gate removes task launchers while retaining status, history, and cleanup.
*/
function applyDelegationCapability(tools, capability) {
	if (capability !== "report_only") return tools;
	const removed = [];
	const narrowed = [];
	const gated = tools.flatMap((tool) => {
		const name = normalizeToolPolicyName(tool.name);
		if (NEW_DELEGATION_TOOL_NAMES.has(name)) {
			removed.push(name);
			return [];
		}
		const allowedActions = REPORT_ONLY_TOOL_ACTIONS.get(name);
		if (!allowedActions) return [tool];
		narrowed.push(name);
		return [wrapReportOnlyTool(tool, allowedActions)];
	});
	if (removed.length > 0 || narrowed.length > 0) log.debug("delegation capability restricted run tools", {
		removed,
		narrowed
	});
	return gated;
}
//#endregion
//#region src/agents/scheduled-message-invocation.ts
/** Admit each new invocation against published policy without changing an accepted invocation. */
function createScheduledMessageInvocationAdmission(params) {
	let cached;
	return () => {
		const config = getRuntimeConfigSnapshot() ?? params.config;
		if (!config) throw new Error("Scheduled message tools require an active runtime configuration.");
		if (cached?.config !== config) cached = {
			config,
			allowed: params.isAllowed(config)
		};
		if (!cached.allowed) throw new Error("Scheduled message invocation is not allowed by the current tool policy.");
		return config;
	};
}
/** Reuse the assembled embedded catalog and resource ceilings for prospective message policy. */
function createEmbeddedMessageInvocationPolicy(params) {
	const policies = resolveConversationToolPolicies({
		capabilityProfile: params.capabilityProfile,
		additionalProfileAllow: params.runtimeProfileAlsoAllow,
		additionalPolicyAllow: params.toolSearchControlAllowlist
	});
	const filter = (currentProfile = params.capabilityProfile, onFilter) => {
		const currentPolicies = currentProfile === params.capabilityProfile ? policies : resolveConversationToolPolicies({
			capabilityProfile: currentProfile,
			additionalProfileAllow: params.runtimeProfileAlsoAllow,
			additionalPolicyAllow: params.toolSearchControlAllowlist
		});
		const { tools, declaredToolAllowlist, unavailableCoreToolReason } = params.catalog();
		return applyToolPolicyPipeline({
			tools,
			toolMeta: (tool) => getPluginToolMeta(tool),
			warn: logWarn,
			steps: buildConversationToolPolicyPipelineSteps({
				capabilityProfile: currentProfile,
				policies: {
					...currentPolicies,
					groupPolicy: policies.groupPolicy,
					senderPolicy: policies.senderPolicy,
					sandboxPolicy: policies.sandboxPolicy,
					subagentPolicy: policies.subagentPolicy,
					runtimeToolPolicy: policies.runtimeToolPolicy,
					inheritedToolPolicy: policies.inheritedToolPolicy
				},
				additionalStepsAfterSandbox: [{
					policy: params.ownerOnlyCoreToolPolicy,
					source: { kind: "session" },
					label: "gateway sender owner-only tools",
					unavailableCoreToolReason
				}],
				includeRuntimeToolPolicy: true,
				unavailableCoreToolReason
			}),
			declaredToolAllowlist,
			onFilter
		});
	};
	return {
		filter,
		admit: createScheduledMessageInvocationAdmission({
			config: params.config,
			isAllowed: (config) => {
				const profile = params.capabilityProfile;
				const currentProfile = config === params.config ? profile : resolveConversationCapabilityProfile({
					...profile.conversation,
					config,
					agentId: profile.policy.agentId,
					sessionKey: profile.policy.sessionKey,
					agentAccountId: profile.serviceIdentity.accountId,
					modelProvider: profile.model.provider,
					modelId: profile.model.id,
					senderIsOwner: profile.sender.isOwner,
					scheduledToolPolicy: params.scheduledToolPolicy,
					runtimePluginToolGrant: profile.policy.runtimePluginToolGrant,
					pluginMetadataSnapshot: params.pluginMetadataSnapshot
				});
				return params.isAvailable() && filter(currentProfile).some((tool) => tool.name === "message");
			}
		})
	};
}
//#endregion
//#region src/agents/tools/session-portal-target.ts
function prepareSessionPortalToolAccess(input) {
	const sessionPortalTarget = input.senderIsOwner === false && !input.sandboxed ? prepareSessionPortalToolTarget(input) : void 0;
	const ownerOnlyCoreToolDenylist = input.senderIsOwner === false ? GATEWAY_OWNER_ONLY_CORE_TOOLS.filter((name) => (name !== "portal" || !sessionPortalTarget) && (name !== "sessions" || !hasSessionControlAuthority()) && (name !== "automations" || !input.hasAutomationGrant)) : [];
	return {
		sessionPortalTarget,
		ownerOnlyCoreToolDenylist,
		ownerOnlyCoreToolPolicy: ownerOnlyCoreToolDenylist.length ? { deny: ownerOnlyCoreToolDenylist } : void 0
	};
}
/** Availability uses resident execution facts; the scoped RPC still authorizes every call. */
function prepareSessionPortalToolTarget(input) {
	if (!input.sessionId || !input.sessionKey || !input.agentId) return;
	const context = getInProcessGatewayToolContext();
	const environments = context?.workerEnvironmentService;
	const projection = getSessionRowProjection(context);
	const row = projection?.sharingTarget({
		agentId: input.agentId,
		key: input.sessionKey
	});
	const record = row && {
		agentId: row.agentId,
		sessionKey: row.canonicalKey,
		sessionId: row.entry.sessionId,
		sessionLifecycleRevision: row.entry.lifecycleRevision
	};
	if (!context?.portalService || !environments || !record || record.sessionKey !== input.sessionKey || record.agentId !== input.agentId || record.sessionId !== input.sessionId || row?.entry.modelSelectionLocked === true) return;
	try {
		const target = captureSessionPortalTarget(environments, record);
		return {
			sessionKey: record.sessionKey,
			agentId: record.agentId,
			environmentId: target.binding.environmentId,
			assertCurrent: () => {
				if (getInProcessGatewayToolContext() !== context) throw new Error("Session preview belongs to a different or retired Gateway");
				const current = projection?.sharingTarget({
					agentId: record.agentId,
					key: record.sessionKey
				});
				if (!current || current.entry.sessionId !== record.sessionId || current.entry.lifecycleRevision !== record.sessionLifecycleRevision || current.entry.modelSelectionLocked === true) throw new Error("Conversation preview policy or session identity changed");
				target.assertCurrent();
			}
		};
	} catch {
		return;
	}
}
//#endregion
//#region src/agents/agent-tools.ts
/**
* Builds the effective OpenClaw agent tool surface.
* Assembles core, shell, channel, OpenClaw, plugin, and Tool Search tools, then
* applies sandbox, profile, provider, sender, group, and sub-agent policy.
*/
/** Internal preparation data stays outside the public harness factory options. */
function createOpenClawCodingToolsInternal(options, skillReadResources, onPolicyFilter) {
	const sandbox = options?.sandbox?.enabled ? options.sandbox : void 0;
	const isMemoryFlushRun = options?.trigger === "memory";
	if (isMemoryFlushRun && !options?.memoryFlushWritePath) throw new Error("memoryFlushWritePath required for memory-triggered tool runs");
	const memoryFlushWritePath = isMemoryFlushRun ? options.memoryFlushWritePath : void 0;
	const cronSelfRemoveOnlyJobId = options?.trigger === "cron" && options.jobId?.trim() ? options.jobId.trim() : void 0;
	const capabilityProfile = options?.conversationCapabilityProfile ?? resolveConversationCapabilityProfile({
		config: options?.config,
		sessionKey: options?.sessionKey,
		runSessionKey: options?.runSessionKey,
		sessionId: options?.sessionId,
		runId: options?.runId,
		agentId: options?.policyAgentId ?? options?.agentId,
		agentDir: options?.agentDir,
		agentAccountId: options?.agentAccountId,
		messageProvider: options?.messageProvider,
		messageChannel: options?.messageChannel,
		chatType: options?.chatType,
		messageTo: options?.messageTo,
		messageThreadId: options?.messageThreadId,
		conversationToolPolicy: options?.conversationToolPolicy,
		currentChannelId: options?.currentChannelId,
		currentMessagingTarget: options?.currentMessagingTarget,
		currentThreadTs: options?.currentThreadTs,
		currentMessageId: options?.currentMessageId,
		groupId: options?.groupId,
		groupChannel: options?.groupChannel,
		groupSpace: options?.groupSpace,
		memberRoleIds: options?.memberRoleIds,
		spawnedBy: options?.spawnedBy,
		senderId: options?.senderId,
		senderName: options?.senderName,
		senderUsername: options?.senderUsername,
		senderE164: options?.senderE164,
		senderIsOwner: options?.senderIsOwner,
		modelProvider: options?.modelProvider,
		modelId: options?.modelId,
		modelApi: options?.modelApi,
		modelContextWindowTokens: options?.modelContextWindowTokens,
		modelHasVision: options?.modelHasVision,
		workspaceDir: options?.workspaceDir,
		cwd: options?.cwd,
		spawnWorkspaceDir: options?.spawnWorkspaceDir,
		skillsSnapshot: options?.skillsSnapshot,
		sandboxToolPolicy: sandbox?.tools,
		runtimeToolAllowlist: options?.runtimeToolAllowlist,
		runtimePluginToolGrant: options?.runtimePluginToolGrant,
		inheritRuntimeToolAllowlist: options?.inheritRuntimeToolAllowlist,
		inputProvenance: options?.inputProvenance,
		trustedInternalHandoff: options?.trustedInternalHandoff,
		scheduledToolPolicy: options?.scheduledToolPolicy,
		pluginMetadataSnapshot: options?.preparedModelRuntime?.metadataSnapshot
	});
	const { agentId, runtimePluginToolGrant } = capabilityProfile.policy;
	const executionAgentId = options?.agentId ?? (options?.runSessionKey ? resolveSessionAgentId({
		config: options.config,
		sessionKey: options.runSessionKey
	}) : agentId);
	const executionSessionKey = options?.runSessionKey ?? options?.sessionKey;
	const attachmentReadRoot = subagentAttachmentRootForRun(executionAgentId, executionSessionKey);
	const enableHeartbeatTool = options?.enableHeartbeatTool === true || options?.trigger === "heartbeat" && options?.config?.messages?.visibleReplies === "message_tool";
	const forceHeartbeatTool = options?.forceHeartbeatTool === true || enableHeartbeatTool;
	const toolSearchConfig = resolveToolSearchConfig(options?.config);
	const toolSearchControlsEnabled = options?.includeToolSearchControls === true && toolSearchConfig.enabled;
	const toolSearchControlAllowlist = toolSearchControlsEnabled ? [
		TOOL_SEARCH_RAW_TOOL_NAME,
		TOOL_DESCRIBE_RAW_TOOL_NAME,
		TOOL_CALL_RAW_TOOL_NAME
	] : [];
	const runtimeToolAllowlistIncludesMessage = expandToolGroups(options?.runtimeToolAllowlist ?? []).some((toolName) => {
		const normalized = normalizeToolPolicyName(toolName);
		return normalized === "*" || normalized === "message";
	});
	const sourceReplyOnly = capabilityProfile.policy.requesterPolicySource === "completion-handoff" && options?.sourceReplyDeliveryMode === "message_tool_only";
	const localModelLeanPreserveToolNames = resolveLocalModelLeanPreserveToolNames({
		toolNames: capabilityProfile.policy.explicitToolOverrideAllowlist,
		forceMessageTool: options?.forceMessageTool,
		sourceReplyDeliveryMode: options?.sourceReplyDeliveryMode
	});
	const runtimeProfileAlsoAllow = [
		...options && messageToolOwnsVisibleReply(options) ? ["message"] : [],
		...runtimeToolAllowlistIncludesMessage ? ["message"] : [],
		...forceHeartbeatTool ? [HEARTBEAT_RESPONSE_TOOL_NAME] : [],
		...toolSearchControlAllowlist
	];
	const sandboxWorkspaceMediaReadAllowed = isConversationToolAllowed(capabilityProfile, "read");
	const scopeKey = resolveProcessToolScopeKey({
		scopeKey: options?.exec?.scopeKey,
		sessionKey: executionSessionKey,
		sessionId: options?.sessionId,
		agentId: executionAgentId
	});
	if (options?.oneShotCliRun && scopeKey && options.registerRunCleanup) {
		const cleanupScope = getProcessSupervisor().acquireScopeCleanup(scopeKey, { processTree: "owned-only" });
		options.registerRunCleanup(async () => {
			const failed = (await Promise.allSettled([cleanupScope(), waitForExecScope(scopeKey)])).find((result) => result.status === "rejected");
			if (failed) throw failed.reason;
		});
	}
	options?.recordToolPrepStage?.("tool-policy");
	const execConfig = resolveExecToolConfig({
		cfg: options?.config,
		agentId
	});
	const execRuntimeConfig = options?.exec?.config ?? options?.config;
	const preparedRunEnvironment = execRuntimeConfig && executionAgentId ? prepareGitHubToolEnvironment({
		config: execRuntimeConfig,
		sourceConfig: getActiveSecretsRuntimeConfigSnapshot()?.sourceConfig,
		agentId: executionAgentId
	}) : void 0;
	const fsConfig = resolveToolFsConfig({
		cfg: options?.config,
		agentId
	});
	const sessionPermissionPolicy = options?.sessionPermissionPolicy;
	const sessionCoreToolPolicy = sessionPermissionPolicy ? resolveSessionPermissionCoreToolPolicy(sessionPermissionPolicy) : void 0;
	const sandboxRoot = sandbox?.workspaceDir;
	const sandboxFsBridge = sandbox?.fsBridge;
	const allowWorkspaceWrites = sandbox?.workspaceAccess !== "ro";
	const workspaceRoot = capabilityProfile.workspace.workspaceRoot;
	const runtimeRoot = capabilityProfile.workspace.runtimeRoot;
	const codingRoot = sandboxRoot ?? runtimeRoot;
	const containmentRoot = sandboxRoot ?? sessionPermissionPolicy?.root ?? codingRoot;
	const memoryFlushWriteRoot = sandboxRoot ?? workspaceRoot;
	const memoryWriteProvenance = createMemoryWriteProvenanceObserver({
		mutationRoot: sandboxRoot ?? workspaceRoot,
		workspaceDir: sandboxRoot ?? workspaceRoot,
		resolvePath: sandboxFsBridge ? (filePath) => resolveSandboxFileIdentity({
			bridge: sandboxFsBridge,
			filePath,
			cwd: sandboxRoot,
			signal: options?.abortSignal
		}) : void 0,
		resolveOriginClass: () => options?.senderIsOwner === false || options?.isTurnTainted?.() === true ? "untrusted" : "agent",
		sessionId: options?.sessionId,
		sessionKey: options?.runSessionKey ?? options?.sessionKey
	});
	const includeCoreTools = options?.includeCoreTools !== false;
	const toolConstructionPlan = options?.toolConstructionPlan ?? {
		includeBaseCodingTools: includeCoreTools,
		includeShellTools: includeCoreTools,
		includeChannelTools: includeCoreTools,
		includeOpenClawTools: includeCoreTools,
		includePluginTools: true
	};
	const includeBaseCodingTools = includeCoreTools && toolConstructionPlan.includeBaseCodingTools;
	const includeShellTools = includeCoreTools && toolConstructionPlan.includeShellTools;
	const includeOpenClawTools = includeCoreTools && toolConstructionPlan.includeOpenClawTools;
	const includeChannelTools = toolConstructionPlan.includeChannelTools;
	const includePluginTools = toolConstructionPlan.includePluginTools;
	const workspaceOnly = options?.requireWorkspaceOnly === true || isMemoryFlushRun || (sessionCoreToolPolicy?.workspaceOnly ?? fsConfig.workspaceOnly === true);
	const fsPolicy = {
		workspaceOnly,
		...sessionPermissionPolicy ? { root: sessionPermissionPolicy.root } : {},
		...attachmentReadRoot ? { readOnlyRoots: [attachmentReadRoot] } : {}
	};
	const readOnly = sessionCoreToolPolicy?.readOnly ?? false;
	const applyPatchPolicy = resolveConfiguredApplyPatchPolicy({
		config: execConfig.applyPatch,
		workspaceOnly,
		readOnly,
		requireWorkspaceOnly: options?.requireWorkspaceOnly === true,
		sessionPolicy: sessionCoreToolPolicy,
		modelProvider: options?.modelProvider,
		modelId: options?.modelId
	});
	const imageSanitization = resolveImageSanitizationLimits(options?.config);
	options?.recordToolPrepStage?.("workspace-policy");
	const execDefaults = options?.exec ?? {};
	const scheduledExecTarget = options?.scheduledToolPolicy?.execTarget;
	const effectiveExecPolicy = projectEffectiveExecPolicy({
		base: execConfig,
		overrides: options?.exec,
		permissionPolicy: sessionPermissionPolicy,
		scheduledExecTarget
	});
	const processToolAvailabilityRef = {};
	const coreTools = createCoreCodingTools({
		abortSignal: options?.abortSignal,
		attachmentReadRoot,
		codingRoot,
		containmentRoot,
		includeBaseCodingTools,
		shellTools: includeShellTools ? "full" : "disabled",
		workspaceOnly,
		readOnly,
		sandbox,
		skillsSnapshot: options?.skillsSnapshot,
		skillReadResources,
		skillInstructionPaths: options?.skillUsagePaths?.map((entry) => entry.readPath),
		skillInstructionDeliveryCache: options?.skillInstructionDeliveryCache,
		modelContextWindowTokens: options?.modelContextWindowTokens,
		imageSanitization,
		modelHasVision: options?.modelHasVision,
		memoryWriteProvenance,
		...applyPatchPolicy,
		execDefaults: {
			...execDefaults,
			...effectiveExecPolicy,
			config: execRuntimeConfig,
			preparedRunEnvironment,
			reviewer: options?.exec?.reviewer ?? execConfig.reviewer,
			reviewTranscript: options?.exec?.reviewTranscript,
			trigger: options?.trigger,
			node: options?.exec?.node ?? execConfig.node,
			pathPrepend: mergeGatewayAgentCliPath(options?.exec?.pathPrepend ?? execConfig.pathPrepend),
			safeBins: options?.exec?.safeBins ?? execConfig.safeBins,
			strictInlineEval: options?.exec?.strictInlineEval ?? execConfig.strictInlineEval,
			commandHighlighting: options?.exec?.commandHighlighting ?? execConfig.commandHighlighting,
			safeBinTrustedDirs: options?.exec?.safeBinTrustedDirs ?? execConfig.safeBinTrustedDirs,
			safeBinProfiles: options?.exec?.safeBinProfiles ?? execConfig.safeBinProfiles,
			agentId,
			cleanupMs: options?.exec?.cleanupMs ?? execConfig.cleanupMs,
			processToolAvailabilityRef,
			scopeKey,
			sessionKey: options?.sessionKey,
			runId: options?.runId,
			operationalRunInstance: options?.operationalRunInstance,
			runSessionKey: executionSessionKey,
			sessionId: options?.sessionId,
			sessionStore: options?.config?.session?.store,
			eventRouting: resolveEventSessionRoutingPolicy({
				cfg: options?.config,
				sessionKey: options?.runSessionKey ?? options?.sessionKey,
				channel: options?.messageProvider,
				accountId: options?.agentAccountId
			}),
			messageProvider: options?.messageProvider,
			currentChannelId: options?.currentChannelId,
			currentThreadTs: options?.currentThreadTs,
			channelContext: options?.channelContext,
			accountId: options?.agentAccountId,
			approvalReviewerDeviceId: options?.approvalReviewerDeviceId,
			nonInteractiveApproval: options?.swarmCollector,
			backgroundMs: options?.exec?.backgroundMs ?? execConfig.backgroundMs,
			timeoutSec: options?.exec?.timeoutSec ?? execConfig.timeoutSec,
			approvalRunningNoticeMs: options?.exec?.approvalRunningNoticeMs ?? execConfig.approvalRunningNoticeMs,
			notifyOnExit: options?.exec?.notifyOnExit ?? execConfig.notifyOnExit,
			notifyOnExitEmptySuccess: options?.exec?.notifyOnExitEmptySuccess ?? execConfig.notifyOnExitEmptySuccess
		},
		processDefaults: { scopeKey },
		recordToolPrepStage: options?.recordToolPrepStage
	});
	const cronCreatorAuthorityResolver = bindActiveCronCreatorAuthorityResolver(options?.runId);
	const cronManagementGrant = bindCronManagementGrant(options?.runId);
	const { sessionPortalTarget, ownerOnlyCoreToolDenylist, ownerOnlyCoreToolPolicy } = prepareSessionPortalToolAccess({
		sessionKey: executionSessionKey,
		agentId: executionAgentId,
		sessionId: options?.sessionId,
		senderIsOwner: options?.senderIsOwner,
		sandboxed: Boolean(sandbox),
		hasAutomationGrant: Boolean(cronCreatorAuthorityResolver || cronManagementGrant)
	});
	const pluginToolAllowlist = appendRuntimePluginToolGrant(capabilityProfile.policy.explicitToolAllowlist, runtimePluginToolGrant);
	const pluginToolDenylist = [...capabilityProfile.policy.explicitToolDenylist, ...ownerOnlyCoreToolDenylist];
	const inheritedToolDenylist = [...pluginToolDenylist];
	const inheritedToolAllowlist = options?.inheritedToolAllowlistRef ?? [];
	const shouldInheritEffectiveToolAllowlist = capabilityProfile.policy.inheritancePolicies.some(hasRestrictiveAllowPolicy);
	const cronCreatorToolAllowlist = options?.cronCreatorToolAllowlistRef ?? [];
	const gatewayCaller = resolveScheduledToolCallerContext({
		scheduledToolPolicy: options?.scheduledToolPolicy,
		accountId: options?.agentAccountId,
		channel: resolveGatewayMessageChannel(options?.messageChannel ?? options?.messageProvider)
	});
	const wrapGatewayCaller = createCodingToolsGatewayCaller({
		options,
		agentId: executionAgentId,
		sessionKey: executionSessionKey,
		accountId: gatewayCaller.accountId,
		capabilityProfile
	});
	const pluginToolOptions = {
		agentSessionKey: options?.sessionKey,
		runSessionKey: options?.runSessionKey,
		runId: options?.runId,
		agentChannel: resolveGatewayMessageChannel(options?.messageChannel ?? options?.messageProvider),
		agentAccountId: options?.agentAccountId,
		agentTo: options?.messageTo,
		agentThreadId: options?.messageThreadId,
		nativeChannelId: options?.nativeChannelId,
		messageActionTurnCapability: options?.messageActionTurnCapability,
		agentDir: options?.agentDir,
		preparedModelRuntime: options?.preparedModelRuntime,
		workspaceDir: workspaceRoot,
		config: options?.config,
		fsPolicy,
		requesterSenderId: options?.senderId,
		senderIsOwner: options?.senderIsOwner,
		sessionId: options?.sessionId,
		conversationRecall: options?.conversationRecall,
		oneShotCliRun: options?.oneShotCliRun,
		sandboxBrowserBridgeUrl: sandbox?.browser?.bridgeUrl,
		allowHostBrowserControl: sandbox ? sandbox.browserAllowHostControl : true,
		sandboxed: Boolean(sandbox),
		pluginToolAllowlist,
		pluginToolDenylist,
		currentChannelId: options?.currentChannelId,
		currentMessagingTarget: options?.currentMessagingTarget,
		currentThreadTs: options?.currentThreadTs,
		currentMessageId: options?.currentMessageId,
		modelProvider: options?.modelProvider,
		modelId: options?.modelId,
		modelHasVision: options?.modelHasVision,
		requireExplicitMessageTarget: options?.requireExplicitMessageTarget,
		disableMessageTool: options?.disableMessageTool || options?.swarmCollector,
		requesterAgentIdOverride: executionAgentId,
		allowGatewaySubagentBinding: options?.allowGatewaySubagentBinding,
		clientCaps: options?.clientCaps,
		toolBindings: options?.toolBindings,
		authProfileStore: options?.authProfileStore
	};
	const pluginToolsOnly = filterToolsByClientCaps(includeOpenClawTools || !includePluginTools ? [] : resolveOpenClawPluginToolsForOptions({
		options: pluginToolOptions,
		resolvedConfig: options?.config
	}), options?.clientCaps);
	const ringZeroTools = includeOpenClawTools ? getActiveAgentRingZeroTools() : [];
	const toolSearchTools = toolSearchControlsEnabled && ringZeroTools.length === 0 ? createToolSearchTools({
		config: options?.config,
		runtimeConfig: options?.config,
		agentId,
		sessionKey: options?.sessionKey,
		sessionId: options?.sessionId,
		runId: options?.runId,
		catalogRef: options?.toolSearchCatalogRef,
		codeModeSkills: options?.codeModeSkills,
		abortSignal: options?.abortSignal,
		executeTool: options?.toolSearchCatalogExecutor
	}) : [];
	const scheduledCoreTools = scheduledExecTarget ? coreTools.map((tool) => tool.name === "exec" ? copyAgentToolMetadata(tool, pinExecToolTarget(tool, scheduledExecTarget)) : tool) : coreTools;
	const messageInvocationPolicy = createEmbeddedMessageInvocationPolicy({
		config: options?.config,
		capabilityProfile,
		runtimeProfileAlsoAllow,
		toolSearchControlAllowlist,
		scheduledToolPolicy: options?.scheduledToolPolicy,
		pluginMetadataSnapshot: options?.preparedModelRuntime?.metadataSnapshot,
		ownerOnlyCoreToolPolicy,
		catalog: () => ({
			tools: toolsForModelProvider,
			declaredToolAllowlist,
			unavailableCoreToolReason
		}),
		isAvailable: () => authorizedTools.some((tool) => tool.name === "message")
	});
	const tools = [
		...scheduledCoreTools,
		...includeChannelTools ? listChannelAgentTools({ cfg: options?.config }) : [],
		...includeOpenClawTools ? mergeAgentRingZeroTools(ringZeroTools, createOpenClawTools({
			...pluginToolOptions,
			sessionPortalTarget,
			...options?.systemAgentTool ? { systemAgentTool: options.systemAgentTool } : {},
			...options?.questionPrompt ? { questionPrompt: options.questionPrompt } : {},
			requesterThinkingLevel: options?.requesterThinkingLevel,
			requesterModel: options?.requesterModel,
			sessionPermissionPolicy,
			execSession: sessionPermissionPolicy ? { permissionMode: sessionPermissionPolicy.mode } : void 0,
			execOverrides: {
				host: effectiveExecPolicy.host,
				mode: effectiveExecPolicy.mode,
				security: effectiveExecPolicy.security,
				ask: effectiveExecPolicy.ask,
				node: options?.exec?.node ?? execConfig.node
			},
			approvalReviewerDeviceIds: options?.approvalReviewerDeviceId ? [options.approvalReviewerDeviceId] : void 0,
			gatewayCallerAccountId: gatewayCaller.accountId,
			gatewayCallerChannel: gatewayCaller.channel,
			gatewayCallerLocal: gatewayCaller.local,
			gatewayCallerScheduled: gatewayCaller.scheduled,
			admitScheduledMessageInvocation: options?.messageActionTurnCapability ? messageInvocationPolicy.admit : void 0,
			agentGroupId: options?.groupId ?? null,
			agentGroupChannel: options?.groupChannel ?? null,
			agentGroupSpace: options?.groupSpace ?? null,
			agentMemberRoleIds: options?.memberRoleIds,
			sandboxRoot,
			sandboxContainerWorkdir: sandbox?.containerWorkdir,
			sandboxFsBridge,
			sandboxReadOnlyResourceMounts: sandbox?.readOnlyResourceMounts,
			stagedMediaPaths: options?.stagedMediaPaths,
			sandboxWorkspaceMediaReadAllowed,
			spawnWorkspaceDir: capabilityProfile.workspace.spawnWorkspaceRoot,
			cwd: sandbox ? capabilityProfile.workspace.spawnWorkspaceRoot ?? runtimeRoot : runtimeRoot,
			sessionConfigSource: options?.sessionConfigSource,
			sessionReadScopeKey: options?.sessionReadScopeKey,
			webFetchHostnameAllowlistRef: options?.webFetchHostnameAllowlistRef,
			webSearchEnabled: options?.webSearchEnabled,
			pinnedWidgetAuthoring: options?.pinnedWidgetAuthoring,
			gatewayUiCommandTarget: options?.gatewayUiCommandTarget,
			gatewayConfigReadAllowed: capabilityProfile.policy.gatewayConfigReadAllowed,
			runtimeToolAllowlist: options?.runtimeToolAllowlist,
			githubPublicationAvailable: options?.githubPublicationAvailable,
			cronCreatorToolAllowlist,
			cronCreatorToolAllowlistCaptureRef: options?.cronCreatorToolAllowlistCaptureRef,
			resolveCronCreatorToolAuthority: cronCreatorAuthorityResolver,
			cronCreatorAuthorityUnavailableReason: options?.cronCreatorAuthorityUnavailableReason,
			currentChatType: options?.chatType,
			currentInboundAudio: options?.currentInboundAudio,
			hasCurrentInboundAudio: options?.hasCurrentInboundAudio,
			modelContextWindowTokens: options?.modelContextWindowTokens,
			skillWorkshop: options?.skillWorkshop,
			replyToMode: options?.replyToMode,
			hasRepliedRef: options?.hasRepliedRef,
			computerContextEpoch: options?.computerContextEpoch,
			computerTransport: options?.computerTransport === null ? null : options?.computerTransport ?? resolveSessionPlacementComputer(options?.operationalRunInstance),
			pairedNodeComputerUse: options?.pairedNodeComputerUse,
			registerRunCleanup: options?.registerRunCleanup,
			sourceReplyDeliveryMode: options?.sourceReplyDeliveryMode,
			sourceReplyOnly,
			taskSuggestionDeliveryMode: options?.taskSuggestionDeliveryMode,
			inboundEventKind: options?.inboundEventKind,
			swarmCollector: options?.swarmCollector,
			swarmOutputSchema: options?.swarmOutputSchema,
			enableHeartbeatTool,
			disablePluginTools: !includePluginTools,
			wrapBeforeToolCallHook: false,
			...cronSelfRemoveOnlyJobId ? { cronSelfRemoveOnlyJobId } : {},
			inheritedToolAllowlist,
			inheritedToolDenylist,
			onProgressCardPlanSaved: options?.onProgressCardPlanSaved,
			onYield: options?.onYield,
			claimYieldCompletion: options?.claimYieldCompletion,
			processScopeKey: scopeKey,
			recordToolPrepStage: options?.recordToolPrepStage
		})) : pluginToolsOnly,
		...toolSearchTools
	];
	options?.recordToolPrepStage?.("openclaw-tools");
	const swarmStructuredOutputTool = options?.swarmCollector && options.swarmOutputSchema ? tools.find((tool) => tool.name === "structured_output") : void 0;
	const toolsForMemoryFlush = projectMemoryFlushTools(tools, isMemoryFlushRun && memoryFlushWritePath ? {
		root: memoryFlushWriteRoot,
		relativePath: memoryFlushWritePath,
		memoryWriteProvenance,
		containerWorkdir: sandbox?.containerWorkdir,
		sandbox: sandboxRoot && sandboxFsBridge ? {
			root: sandboxRoot,
			bridge: sandboxFsBridge
		} : void 0
	} : void 0);
	const unavailableCoreToolReason = isMemoryFlushRun && memoryFlushWritePath ? "memory-triggered compaction runs expose only read and append-only write" : void 0;
	const toolsForMessageProvider = filterToolsByMessageProvider(toolsForMemoryFlush, options?.toolPolicyMessageProvider ?? options?.messageProvider);
	options?.recordToolPrepStage?.("message-provider-policy");
	const toolsForModelProvider = applyModelProviderToolPolicy(toolsForMessageProvider, {
		...options,
		agentId,
		localModelLeanPreserveToolNames
	});
	options?.recordToolPrepStage?.("model-provider-policy");
	const declaredToolAllowlist = buildDeclaredToolAllowlistContext({
		config: options?.config,
		metadataSnapshot: options?.preparedModelRuntime?.metadataSnapshot,
		workspaceDir: workspaceRoot,
		toolDenylist: pluginToolDenylist
	});
	const subagentFiltered = messageInvocationPolicy.filter(capabilityProfile, onPolicyFilter);
	const authorizedTools = applySwarmCollectorToolContract(applyDelegationCapability(mergeAgentRingZeroTools(ringZeroTools, subagentFiltered), options?.delegationCapability), {
		swarmCollector: options?.swarmCollector,
		structuredOutputTool: swarmStructuredOutputTool
	});
	authorizedTools.forEach(bindAssembledAgentToolActionDescriptor);
	processToolAvailabilityRef.value = authorizedTools.some((tool) => tool.name === "process");
	if (shouldInheritEffectiveToolAllowlist) replaceWithEffectiveToolAllowlist(inheritedToolAllowlist, authorizedTools);
	replaceWithEffectiveCronCreatorToolAllowlist(cronCreatorToolAllowlist, authorizedTools, (tool) => getPluginToolMeta(tool));
	if (isMemoryFlushRun && memoryFlushWritePath && !authorizedTools.some((tool) => tool.name === "write") && !messageProviderExcludesTool(options?.toolPolicyMessageProvider ?? options?.messageProvider, "write")) logWarn(`memory flush cannot persist ${memoryFlushWritePath}: no write tool survived this agent's tool policy, so this run will not save anything.`);
	options?.recordToolPrepStage?.("authorization-policy");
	const turnSourceChannel = options?.messageChannel ?? options?.messageProvider;
	const turnSourceTo = options?.currentMessagingTarget ?? options?.currentChannelId;
	const requester = {
		...turnSourceChannel ? { channel: turnSourceChannel } : {},
		...options?.agentAccountId ? { accountId: options.agentAccountId } : {},
		...options?.senderId ? { senderId: options.senderId } : {},
		...options?.senderIsOwner !== void 0 ? { senderIsOwner: options.senderIsOwner } : {},
		...options?.memberRoleIds?.length ? { roleIds: [...options.memberRoleIds] } : {}
	};
	const hasRequester = Object.keys(requester).length > 0;
	const hookContext = {
		agentId: executionAgentId,
		...options?.config ? { config: options.config } : {},
		cwd: codingRoot,
		workspaceDir: workspaceRoot,
		...options?.skillsSnapshot ? { skillsSnapshot: options.skillsSnapshot } : {},
		...options?.skillUsagePaths ? { skillUsagePaths: options.skillUsagePaths } : {},
		...sandboxRoot && sandboxFsBridge && allowWorkspaceWrites ? { sandbox: {
			root: sandboxRoot,
			bridge: sandboxFsBridge
		} } : {},
		sessionKey: executionSessionKey,
		sessionId: options?.sessionId,
		runId: options?.runId,
		trigger: options?.trigger,
		approvalReviewerDeviceId: options?.approvalReviewerDeviceId,
		channelId: options?.hookChannelId ?? options?.currentChannelId,
		...hasRequester ? { requester } : {},
		...turnSourceChannel ? { turnSourceChannel } : {},
		...turnSourceTo ? { turnSourceTo } : {},
		...options?.agentAccountId ? { turnSourceAccountId: options.agentAccountId } : {},
		...options?.currentThreadTs ? { turnSourceThreadId: options.currentThreadTs } : {},
		...options?.trace ? { trace: options.trace } : {},
		loopDetection: resolveToolLoopDetectionConfig({
			cfg: options?.config,
			agentId
		}),
		onToolOutcome: options?.onToolOutcome,
		allocateToolOutcomeOrdinal: options?.allocateToolOutcomeOrdinal
	};
	return finalizeAgentTools({
		tools: filterRequesterYieldTools(authorizedTools, executionSessionKey),
		modelProvider: options?.modelProvider,
		modelId: options?.modelId,
		modelCompat: options?.modelCompat,
		hookContext,
		wrapBeforeToolCallHook: options?.wrapBeforeToolCallHook,
		emitBeforeToolCallDiagnostics: options?.emitBeforeToolCallDiagnostics,
		...options?.swarmCollector ? { approvalMode: "deny" } : {},
		abortSignal: options?.abortSignal,
		recordToolPrepStage: options?.recordToolPrepStage
	}).map(wrapGatewayCaller);
}
/** Build the SDK tool list without exposing core-only read scope or completion observations. */
function createOpenClawCodingTools(options) {
	return createOpenClawCodingToolsInternal(options);
}
//#endregion
export { applyDelegationCapability as a, createScheduledMessageInvocationAdmission as i, createOpenClawCodingToolsInternal as n, resolveDelegationCapability as o, prepareSessionPortalToolTarget as r, filterToolsByMessageProvider as s, createOpenClawCodingTools as t };
