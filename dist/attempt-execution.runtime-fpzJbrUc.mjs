import { o as resolveUserPath } from "./home-dir-CjKH62jd.mjs";
import "./utils-DUAwk2p5.mjs";
import { n as sanitizeForLog } from "./ansi-6Z0Nu6M4.mjs";
import { t as createSubsystemLogger } from "./subsystem-CeqVSEVi.mjs";
import { S as isSubagentSessionKey } from "./session-key-BC4m_Ly5.mjs";
import { r as resolveCollapsedSessionAuthPinSource } from "./auth-profile-override-provenance-DEDEMC3M.mjs";
import { u as resolveOpenAIRuntimeProvider } from "./openai-routing-yzlBh98z.mjs";
import { a as isRuntimeToolAllowed, o as isToolAllowedByPolicies } from "./tool-policy-match-COwlx5YS.mjs";
import "./message-channel-DDiCYM9I.mjs";
import { a as resolveAuthProfileOrder } from "./order-Du3RLv_J.mjs";
import { n as ensureAuthProfileStore } from "./store-runtime-BpJB9uZ1.mjs";
import "./model-selection-BAezv3YH.mjs";
import { t as isCliProvider } from "./model-selection-cli-DYyt406M.mjs";
import { n as resolveAvailableAgentHarnessPolicy } from "./availability-bQlFZ63y.mjs";
import { n as getCliSessionBinding } from "./cli-session-binding-Xt6nY3mk.mjs";
import { h as resolveSessionPinnedHarnessId } from "./agent-harness-session-key-BypxcwJ7.mjs";
import { i as resolveCliBackendConfig } from "./cli-backends-CdkNfYy4.mjs";
import { s as resolveCliRuntimeExecutionProvider } from "./model-runtime-aliases-Wn7RduAA.mjs";
import { t as DEFAULT_MAX_LIVE_TOOL_RESULT_CHARS } from "./tool-result-limits-B-fhY8wF.mjs";
import { s as loadSessionEntry } from "./session-accessor.sqlite-entry-C87Sde4p.mjs";
import "./session-accessor-CGLseszP.mjs";
import { s as createAgentRunSupersededAbortError } from "./run-termination-JCCL0TyS.mjs";
import { o as getGeneratedMediaTaskIdsForSessionKey, s as hasNewGeneratedMediaTaskForSessionKey } from "./media-generation-activity-8_KIfY-s.mjs";
import { a as annotateInterSessionPromptText } from "./input-provenance-v8gTqxPd.mjs";
import { n as resolveSandboxRuntimeStatus } from "./runtime-status-DhbVLtao.mjs";
import { s as resolveCliSessionClearReason, u as shouldClearFailedCliSessionBinding } from "./cli-session-CuXTit63.mjs";
import { a as setChannelSourceTurnId, n as readChannelSourceTurnId, o as setChannelSourceTurnSameThreadRequired, r as readChannelSourceTurnSameThreadRequired } from "./source-turn-id-Dy-kQ4Au.mjs";
import { t as buildAgentRuntimeAuthPlan } from "./auth-h1Sp-wBd.mjs";
import { a as isTrustedSubagentCompletionHandoffForRun, i as isSubagentAnnounceCompletionHandoff, t as hasVerifiedRequesterCompletionHandoff } from "./requester-tool-policy-CWpqJGNS.mjs";
import { t as resolveConversationCapabilityProfile } from "./conversation-capability-profile-DC5b6Jzy.mjs";
import "./selection-aEGvijq3.mjs";
import { r as messageToolOwnsVisibleReply } from "./source-reply-delivery-mode-C0QKYTyh.mjs";
import { i as resolveConversationToolPolicies } from "./conversation-tool-policy-pipeline-sb3plgU7.mjs";
import { o as resolveDelegationCapability } from "./agent-tools-DdIcx9SP.mjs";
import { G as injectTimestamp, K as timestampOptsFromConfig } from "./builtin-openclaw-DEib7rq9.mjs";
import { s as resolveBootstrapWarningSignaturesSeen } from "./bootstrap-budget-CqFoeR-L.mjs";
import { n as mergeForcedEmbeddedAttemptToolsAllow } from "./attempt-tool-construction-plan-BizPvV2W.mjs";
import { o as withLocalSessionPlacementTurnSettlement } from "./session-placement-admission-BrBHkB_W.mjs";
import { t as runEmbeddedAgent } from "./embedded-agent-DsCaQmKI.mjs";
import { n as resolveCliRuntimeToolsAllow } from "./tool-policy-lIuPVohp.mjs";
import { o as resizeExecApprovalContinuationPrompt } from "./bash-tools.exec-approval-output-fMusnImS.mjs";
import { n as resolveCliExecutionAuthProfileId, t as cliBackendAcceptsAuthProfileForwarding } from "./cli-execution-auth-CeILkn3a.mjs";
import { n as emitAgentAttemptRuntimeStart } from "./attempt-callbacks-Bhj5qFiO.mjs";
import { s as hasCliLiveSession } from "./cli-live-session-registry-UwsGavHf.mjs";
import { _ as resolveFallbackRetryPrompt, d as buildClaudeCliFallbackContextPrelude, f as claudeCliSessionTranscriptHasContent, g as resolveCommandReplyExpectation, h as rebaseExecApprovalContinuationPromptRange, m as createAcpVisibleTextAccumulator, v as sessionTranscriptHasContent } from "./session-history-djjQtyDy.mjs";
import { t as buildCliMcpDelegationCapabilityBinding } from "./mcp-grant-context-BX7efeWf.mjs";
import { n as runCliAgent } from "./cli-runner-B2OP6uzC.mjs";
import { a as emitAcpLifecycleError, c as emitAcpRuntimeEvent, i as emitAcpLifecycleEnd, l as resolveAcpLifecycleEndFields, n as createAcpToolLifecycleTracker, o as emitAcpLifecycleStart, r as emitAcpAssistantDelta, s as emitAcpPromptSubmitted, t as buildAcpResult } from "./acp-lifecycle-WhB_36JX.mjs";
import { n as persistCliSessionBindingResult, t as clearCliSessionInStore } from "./cli-session-store-BYzx-K5l.mjs";
import { a as restoreCliSessionForkInStore, r as persistCliSessionForkSuccessorInStore, t as consumeCliSessionForkInStore } from "./session-store-CsJecWiE.mjs";
import { n as persistCliTurnTranscript, r as resolveCliTranscriptReplyText, t as persistAcpTurnTranscript } from "./transcript-persistence-DMozO2bE.mjs";
//#region src/agents/command/attempt-auth-selection.ts
function resolveHarnessAuthProfileSelection(params) {
	const sessionAuthProfileId = params.sessionAuthProfileId?.trim();
	if (sessionAuthProfileId) {
		const credential = ensureAuthProfileStore(params.agentDir, {
			allowKeychainPrompt: false,
			externalCliProfileIds: [sessionAuthProfileId]
		}).profiles[sessionAuthProfileId];
		return {
			authProfileId: sessionAuthProfileId,
			authProfileIdSource: params.sessionAuthProfileSource,
			authProfileProvider: credential?.provider ?? params.authProfileProvider,
			authProfileMode: credential?.type
		};
	}
	if (!params.allowHarnessAuthProfileForwarding) return { authProfileProvider: params.authProfileProvider };
	const harnessAuthProvider = buildAgentRuntimeAuthPlan({
		provider: params.provider,
		authProfileProvider: params.authProfileProvider,
		config: params.config,
		workspaceDir: params.workspaceDir,
		...params.metadataSnapshot ? { metadataSnapshot: params.metadataSnapshot } : {},
		providerAuthAliasesEnabled: params.providerAuthAliasesEnabled,
		harnessId: params.harnessId,
		harnessRuntime: params.harnessRuntime,
		allowHarnessAuthProfileForwarding: params.allowHarnessAuthProfileForwarding
	}).harnessAuthProvider;
	if (!harnessAuthProvider) return { authProfileProvider: params.authProfileProvider };
	const store = ensureAuthProfileStore(params.agentDir, {
		allowKeychainPrompt: false,
		externalCliProviderIds: [harnessAuthProvider]
	});
	const authProfileId = resolveAuthProfileOrder({
		cfg: params.config,
		store,
		provider: harnessAuthProvider
	})[0];
	return authProfileId ? {
		authProfileId,
		authProfileIdSource: "auto",
		authProfileProvider: harnessAuthProvider
	} : { authProfileProvider: params.authProfileProvider };
}
//#endregion
//#region src/agents/command/attempt-execution.ts
const log = createSubsystemLogger("agents/agent-command");
function isClaudeCliProvider(provider) {
	return provider.trim().toLowerCase() === "claude-cli";
}
function runAgentAttempt(params) {
	const sessionAuthProfileId = params.sessionEntry?.authProfileOverride?.trim();
	const sessionAuthProfileSource = resolveCollapsedSessionAuthPinSource(params.sessionEntry);
	const selectedAuthProfile = sessionAuthProfileId && sessionAuthProfileSource !== "auto" ? {
		id: sessionAuthProfileId,
		source: sessionAuthProfileSource
	} : params.configuredAuthProfileId?.trim() ? {
		id: params.configuredAuthProfileId.trim(),
		source: "user"
	} : sessionAuthProfileId ? {
		id: sessionAuthProfileId,
		source: sessionAuthProfileSource
	} : void 0;
	const isRawModelRun = params.opts.modelRun === true || params.opts.promptMode === "none";
	const isSubagentAnnounceHandoff = isSubagentAnnounceCompletionHandoff({
		inputProvenance: params.opts.inputProvenance,
		internalEvents: params.opts.internalEvents
	});
	const trustedSubagentCompletionHandoff = isTrustedSubagentCompletionHandoffForRun({
		handoff: params.opts.trustedInternalHandoff,
		inputProvenance: params.opts.inputProvenance,
		internalEvents: params.opts.internalEvents,
		sessionKey: params.sessionKey,
		sessionId: params.sessionId,
		provider: params.providerOverride,
		model: params.modelOverride
	}) && hasVerifiedRequesterCompletionHandoff({
		config: params.cfg,
		sessionKey: params.sessionKey,
		inputProvenance: params.opts.inputProvenance,
		trustedInternalHandoff: params.opts.trustedInternalHandoff,
		sessionId: params.sessionId,
		modelProvider: params.providerOverride,
		modelId: params.modelOverride
	});
	const trustedSubagentAnnounceHandoff = isSubagentAnnounceHandoff && trustedSubagentCompletionHandoff;
	const completionRequestsMessageDelivery = trustedSubagentAnnounceHandoff && !isRawModelRun && params.opts.disableMessageTool !== true && messageToolOwnsVisibleReply(params.opts);
	const completionSandboxStatus = completionRequestsMessageDelivery ? resolveSandboxRuntimeStatus({
		cfg: params.cfg,
		sessionKey: params.sessionKey,
		agentId: params.sessionAgentId
	}) : void 0;
	const completionCapabilityProfile = completionRequestsMessageDelivery ? resolveConversationCapabilityProfile({
		config: params.cfg,
		sessionKey: params.sessionKey,
		sessionId: params.sessionId,
		agentId: params.sessionAgentId,
		senderId: params.runContext.senderId,
		modelProvider: params.providerOverride,
		modelId: params.modelOverride,
		sandboxToolPolicy: completionSandboxStatus?.sandboxed ? completionSandboxStatus.toolPolicy : void 0,
		inputProvenance: params.opts.inputProvenance,
		trustedInternalHandoff: params.opts.trustedInternalHandoff
	}) : void 0;
	const completionToolPolicies = completionCapabilityProfile ? resolveConversationToolPolicies({
		capabilityProfile: completionCapabilityProfile,
		additionalProfileAllow: ["message"],
		additionalPolicyAllow: ["message"],
		additionalInheritedAllow: ["message"]
	}) : void 0;
	const completionNeedsMessageDelivery = completionCapabilityProfile?.policy.requesterPolicySource === "completion-handoff" && completionToolPolicies !== void 0 && isToolAllowedByPolicies("message", Object.values(completionToolPolicies)) && isRuntimeToolAllowed("message", params.opts.toolsAllow);
	const claudeCliFallbackPrelude = !isRawModelRun && params.isFallbackRetry && isClaudeCliProvider(params.originalProvider) && !isClaudeCliProvider(params.providerOverride) ? buildClaudeCliFallbackContextPrelude({ cliSessionId: getCliSessionBinding(params.sessionEntry, "claude-cli")?.sessionId }) : "";
	const resolvedPrompt = resolveFallbackRetryPrompt({
		body: params.body,
		isFallbackRetry: params.isFallbackRetry,
		sessionHasHistory: params.sessionHasHistory,
		priorContextPrelude: claudeCliFallbackPrelude
	});
	const effectivePrompt = isRawModelRun ? resolvedPrompt : annotateInterSessionPromptText(resolvedPrompt, params.opts.inputProvenance);
	const embeddedExecApprovalContinuationPromptRange = rebaseExecApprovalContinuationPromptRange({
		body: params.body,
		prompt: effectivePrompt,
		range: params.opts.execApprovalContinuationPromptRange
	});
	const continuationTranscriptBody = params.opts.execApprovalContinuationPromptRange ? params.transcriptBody ?? params.body : params.transcriptBody;
	const continuationTranscriptPromptRange = params.opts.execApprovalContinuationTranscriptPromptRange ?? params.opts.execApprovalContinuationPromptRange;
	const bootstrapPromptWarningSignaturesSeen = resolveBootstrapWarningSignaturesSeen(params.sessionEntry?.systemPromptReport);
	const bootstrapPromptWarningSignature = bootstrapPromptWarningSignaturesSeen.at(-1);
	const requestedAgentHarnessId = isRawModelRun ? "openclaw" : void 0;
	const sessionRuntimeOverride = isRawModelRun ? void 0 : params.agentHarnessRuntimeOverride;
	const pinnedHarnessId = isRawModelRun ? void 0 : resolveSessionPinnedHarnessId(params.sessionEntry);
	const sessionCliRuntime = sessionRuntimeOverride && !(pinnedHarnessId !== void 0 && sessionRuntimeOverride === pinnedHarnessId) && isCliProvider(sessionRuntimeOverride, params.cfg) ? sessionRuntimeOverride : void 0;
	const configuredCliRuntime = !isRawModelRun && !sessionRuntimeOverride ? resolveCliRuntimeExecutionProvider({
		provider: params.providerOverride,
		cfg: params.cfg,
		agentId: params.sessionAgentId,
		modelId: params.modelOverride,
		authProfileId: selectedAuthProfile?.id
	}) : void 0;
	const cliExecutionProvider = isRawModelRun ? params.providerOverride : sessionCliRuntime ?? configuredCliRuntime ?? params.providerOverride;
	const isCliExecutionProvider = sessionRuntimeOverride ? sessionCliRuntime !== void 0 : isCliProvider(cliExecutionProvider, params.cfg);
	const completionRetainsRequesterTools = trustedSubagentAnnounceHandoff && !isRawModelRun && !isCliExecutionProvider && (!messageToolOwnsVisibleReply(params.opts) || completionNeedsMessageDelivery);
	const runtimeToolsAllow = isSubagentAnnounceHandoff ? completionRetainsRequesterTools ? params.opts.toolsAllow : completionNeedsMessageDelivery ? ["message"] : void 0 : params.opts.toolsAllow;
	const cliRuntimeToolsAllow = mergeForcedEmbeddedAttemptToolsAllow(runtimeToolsAllow, { forceToolNames: params.opts.swarmCollector && params.opts.swarmOutputSchema ? ["structured_output"] : void 0 });
	const disableTools = params.opts.modelRun === true || isSubagentAnnounceHandoff && !completionRetainsRequesterTools && !completionNeedsMessageDelivery;
	const toolContext = {
		messageChannel: params.messageChannel,
		messageProvider: params.opts.messageProvider ?? params.messageChannel,
		agentAccountId: params.runContext.accountId,
		groupId: params.runContext.groupId,
		groupChannel: params.runContext.groupChannel,
		groupSpace: params.runContext.groupSpace,
		spawnedBy: params.spawnedBy,
		currentChannelId: params.runContext.currentChannelId,
		chatId: params.runContext.chatId,
		channelContext: params.runContext.channelContext,
		currentThreadTs: params.runContext.currentThreadTs,
		currentInboundAudio: params.runContext.currentInboundAudio,
		replyToMode: params.runContext.replyToMode,
		senderId: params.runContext.senderId,
		senderIsOwner: params.opts.senderIsOwner,
		scheduledToolPolicy: params.opts.scheduledToolPolicy,
		pinnedWidgetAuthoring: params.opts.pinnedWidgetAuthoring
	};
	if (params.fallbackRuntimeState && params.fallbackRuntimeState.originRuntime === void 0) params.fallbackRuntimeState.originRuntime = !isRawModelRun && isCliExecutionProvider ? "cli" : "embedded";
	const shouldForwardImagesToEmbedded = !params.isFallbackRetry || params.fallbackRuntimeState?.originRuntime === "cli";
	const allowCliAuthProfileForwarding = isCliExecutionProvider && cliBackendAcceptsAuthProfileForwarding({
		provider: cliExecutionProvider,
		config: params.cfg,
		agentId: params.sessionAgentId
	});
	const agentHarnessPolicy = isRawModelRun ? {
		runtime: "openclaw",
		runtimeSource: "model"
	} : sessionRuntimeOverride ? {
		runtime: sessionRuntimeOverride,
		runtimeSource: "model"
	} : resolveAvailableAgentHarnessPolicy({
		provider: params.providerOverride,
		modelId: params.modelOverride,
		config: params.cfg,
		agentId: params.sessionAgentId,
		sessionKey: params.sessionKey ?? params.sessionId
	});
	const harnessAuthSelection = resolveHarnessAuthProfileSelection({
		config: params.cfg,
		agentDir: params.agentDir,
		workspaceDir: params.workspaceDir,
		provider: params.providerOverride,
		authProfileProvider: params.authProfileProvider,
		sessionAuthProfileId: selectedAuthProfile?.id,
		sessionAuthProfileSource: selectedAuthProfile?.source,
		harnessId: requestedAgentHarnessId,
		harnessRuntime: agentHarnessPolicy.runtime,
		...params.metadataSnapshot ? { metadataSnapshot: params.metadataSnapshot } : {},
		providerAuthAliasesEnabled: params.pluginsEnabled,
		allowHarnessAuthProfileForwarding: !isCliExecutionProvider
	});
	const runtimeAuthPlan = buildAgentRuntimeAuthPlan({
		provider: params.providerOverride,
		authProfileProvider: harnessAuthSelection.authProfileProvider,
		authProfileMode: harnessAuthSelection.authProfileMode,
		sessionAuthProfileId: harnessAuthSelection.authProfileId,
		config: params.cfg,
		workspaceDir: params.workspaceDir,
		...params.metadataSnapshot ? { metadataSnapshot: params.metadataSnapshot } : {},
		providerAuthAliasesEnabled: params.pluginsEnabled,
		harnessId: requestedAgentHarnessId,
		harnessRuntime: agentHarnessPolicy.runtime,
		allowHarnessAuthProfileForwarding: !isCliExecutionProvider
	});
	const cliAuthNeedsSessionBinding = allowCliAuthProfileForwarding && !isRawModelRun && (!harnessAuthSelection.authProfileId || harnessAuthSelection.authProfileIdSource === "auto");
	const authProfileId = allowCliAuthProfileForwarding && !cliAuthNeedsSessionBinding ? resolveCliExecutionAuthProfileId({
		cliExecutionProvider,
		authProfileProvider: params.authProfileProvider,
		config: params.cfg,
		agentDir: params.agentDir,
		selected: harnessAuthSelection
	}) : runtimeAuthPlan.forwardedAuthProfileId;
	const embeddedAgentProvider = resolveOpenAIRuntimeProvider({
		provider: params.providerOverride,
		harnessRuntime: agentHarnessPolicy.runtime,
		agentHarnessId: requestedAgentHarnessId,
		authProfileProvider: runtimeAuthPlan.authProfileProviderForAuth,
		authProfileId,
		config: params.cfg,
		workspaceDir: params.workspaceDir
	});
	const embeddedAgentHarnessOverride = requestedAgentHarnessId ?? sessionRuntimeOverride ?? (agentHarnessPolicy.runtime === "openclaw" && agentHarnessPolicy.runtimeSource !== "implicit" ? "openclaw" : void 0);
	const replyExpectation = resolveCommandReplyExpectation(params);
	const buildCommonRunParams = () => ({
		preparedRunAdmission: params.preparedRunAdmission,
		sessionId: params.sessionId,
		sessionKey: params.sessionKey,
		sessionTarget: params.sessionTarget,
		chatType: params.sessionEntry?.chatType,
		contextWindow: params.sessionEntry?.contextWindow,
		agentId: params.sessionAgentId,
		trigger: "user",
		sessionFile: params.sessionFile,
		workspaceDir: params.workspaceDir,
		cwd: params.cwd,
		config: params.cfg,
		modelHasVision: params.modelHasVision,
		model: params.modelOverride,
		modelRoutingProvenance: params.modelRoutingProvenance,
		thinkLevel: params.resolvedThinkLevel,
		fastMode: params.fastMode,
		fastModeStartedAtMs: params.fastModeStartedAtMs,
		fastModeAutoOnSeconds: params.fastModeAutoOnSeconds,
		timeoutMs: params.timeoutMs,
		runTimeoutOverrideMs: params.runTimeoutOverrideMs,
		runId: params.runId,
		lifecycleGeneration: params.lifecycleGeneration,
		onExecutionPhase: (info) => emitAgentAttemptRuntimeStart(info, params.onAgentEvent),
		lane: params.opts.lane,
		swarmExecutionLane: params.opts.swarmExecutionLane,
		extraSystemPrompt: params.opts.extraSystemPrompt,
		inputProvenance: params.opts.inputProvenance,
		skillLibraryAuthoring: params.opts.skillLibraryAuthoring,
		sourceReplyDeliveryMode: params.opts.sourceReplyDeliveryMode,
		taskSuggestionDeliveryMode: params.opts.taskSuggestionDeliveryMode,
		clientCaps: params.opts.clientCaps,
		gatewayUiCommandTarget: params.opts.gatewayUiCommandTarget,
		media: params.opts.media,
		skillsSnapshot: params.skillsSnapshot,
		streamParams: params.opts.streamParams,
		approvalReviewerDeviceId: params.opts.approvalReviewerDeviceId,
		bashElevated: params.opts.bashElevated,
		cleanupBundleMcpOnRunEnd: params.opts.cleanupBundleMcpOnRunEnd,
		oneShotCliRun: params.opts.oneShotCliRun,
		userTurnTranscriptRecorder: params.userTurnTranscriptRecorder,
		contextEngineLogicalTurnLease: params.contextEngineLogicalTurnLease,
		onContextEngineTurnCandidate: params.onContextEngineTurnCandidate,
		suppressNextUserMessagePersistence: params.suppressPromptPersistenceOnRetry === true,
		disableTools,
		terminalReplyExpectation: replyExpectation,
		silentReplyPromptMode: replyExpectation === "required" ? "none" : void 0,
		bootstrapPromptWarningSignaturesSeen,
		bootstrapPromptWarningSignature
	});
	if (!isRawModelRun && isCliExecutionProvider) {
		const expectedLifecycleRevision = params.sessionEntry?.lifecycleRevision;
		return withLocalSessionPlacementTurnSettlement({
			sessionId: params.sessionId,
			sessionKey: params.sessionKey ?? params.sessionId,
			agentId: params.sessionAgentId,
			runId: params.runId
		}, async (assertSettlementCurrent) => {
			if (params.sessionKey && params.storePath) {
				params.sessionEntry = loadSessionEntry({
					agentId: params.sessionAgentId,
					sessionKey: params.sessionKey,
					storePath: params.storePath,
					readConsistency: "latest"
				});
				if (params.sessionEntry?.sessionId !== params.sessionId || params.sessionEntry.lifecycleRevision !== expectedLifecycleRevision) throw createAgentRunSupersededAbortError();
			}
			const cliSessionBinding = getCliSessionBinding(params.sessionEntry, cliExecutionProvider);
			const cliAuthProfileId = cliAuthNeedsSessionBinding ? resolveCliExecutionAuthProfileId({
				cliExecutionProvider,
				authProfileProvider: params.authProfileProvider,
				config: params.cfg,
				agentDir: params.agentDir,
				selected: harnessAuthSelection,
				sessionBinding: cliSessionBinding
			}) : authProfileId;
			const diagnosticOwner = params.deferredLifecycle?.handoffToCli();
			const cliProcessCwd = params.cwd ? resolveUserPath(params.cwd) : params.workspaceDir;
			const cliContinuationBody = params.opts.execApprovalContinuationPromptRange ? resizeExecApprovalContinuationPrompt({
				prompt: params.body,
				range: params.opts.execApprovalContinuationPromptRange,
				maxOutputUtf16Units: DEFAULT_MAX_LIVE_TOOL_RESULT_CHARS
			}) : params.body;
			const cliResolvedPrompt = params.opts.execApprovalContinuationPromptRange ? resolveFallbackRetryPrompt({
				body: cliContinuationBody,
				isFallbackRetry: params.isFallbackRetry,
				sessionHasHistory: params.sessionHasHistory,
				priorContextPrelude: claudeCliFallbackPrelude
			}) : resolvedPrompt;
			const cliEffectivePrompt = params.opts.execApprovalContinuationPromptRange ? annotateInterSessionPromptText(cliResolvedPrompt, params.opts.inputProvenance) : effectivePrompt;
			const cliTranscriptPrompt = continuationTranscriptBody === void 0 || !continuationTranscriptPromptRange ? continuationTranscriptBody : resizeExecApprovalContinuationPrompt({
				prompt: continuationTranscriptBody,
				range: continuationTranscriptPromptRange,
				maxOutputUtf16Units: DEFAULT_MAX_LIVE_TOOL_RESULT_CHARS
			});
			params.userTurnTranscriptRecorder?.replaceTextBeforePersistence?.(cliTranscriptPrompt ?? cliContinuationBody);
			const cliPrompt = params.opts.inputProvenance?.kind === "inter_session" ? cliEffectivePrompt : injectTimestamp(cliEffectivePrompt, timestampOptsFromConfig(params.cfg));
			const mutableCliSessionStore = params.sessionKey && params.sessionStore && params.storePath ? {
				agentId: params.sessionAgentId,
				sessionKey: params.sessionKey,
				sessionStore: params.sessionStore,
				storePath: params.storePath,
				expectedSessionId: params.sessionId,
				assertCommitAllowed: assertSettlementCurrent
			} : void 0;
			const prepareCliSessionBinding = async () => {
				const hasManagedClaudeLiveSession = Boolean(isClaudeCliProvider(cliExecutionProvider) && cliSessionBinding?.sessionId && hasCliLiveSession({
					backendId: cliExecutionProvider,
					agentAccountId: params.runContext.accountId,
					agentId: params.sessionAgentId,
					authProfileId: cliSessionBinding.authProfileId,
					sessionId: params.sessionId,
					sessionKey: params.sessionKey
				}));
				if (!isClaudeCliProvider(cliExecutionProvider) || !cliSessionBinding?.sessionId || hasManagedClaudeLiveSession || await claudeCliSessionTranscriptHasContent({
					sessionId: cliSessionBinding.sessionId,
					workspaceDir: cliProcessCwd
				})) return;
				log.warn(`cli session reset: provider=${sanitizeForLog(cliExecutionProvider)} reason=transcript-missing sessionKey=${params.sessionKey ?? params.sessionId}`);
				if (mutableCliSessionStore) params.sessionEntry = await clearCliSessionInStore({
					provider: cliExecutionProvider,
					...mutableCliSessionStore
				}) ?? params.sessionEntry;
			};
			const mediaTaskIdsBefore = getGeneratedMediaTaskIdsForSessionKey(params.sessionKey, params.sessionAgentId);
			const hasNewMediaTask = () => hasNewGeneratedMediaTaskForSessionKey(params.sessionKey, mediaTaskIdsBefore, params.sessionAgentId);
			await prepareCliSessionBinding();
			let result;
			try {
				const forkCliSessionOnResume = cliSessionBinding?.forkNextResume === true;
				const resolvedCliBackend = resolveCliBackendConfig(cliExecutionProvider, params.cfg, { agentId: params.sessionAgentId });
				const supportsCliSessionFork = Boolean(resolvedCliBackend?.config.forkArg);
				if (forkCliSessionOnResume && !supportsCliSessionFork) throw new Error(`CLI backend "${cliExecutionProvider}" does not support session forks`);
				const forkStoreParams = supportsCliSessionFork && cliSessionBinding?.sessionId && mutableCliSessionStore ? {
					provider: cliExecutionProvider,
					expectedCliSessionId: cliSessionBinding.sessionId,
					...mutableCliSessionStore,
					assertCommitAllowed: () => {
						assertSettlementCurrent();
						(params.deferredLifecycle?.signal ?? params.opts.abortSignal)?.throwIfAborted();
					}
				} : void 0;
				result = await runCliAgent({
					...buildCommonRunParams(),
					diagnosticOwner,
					sessionEntry: params.sessionEntry,
					storePath: params.storePath,
					persistAssistantTranscript: params.storePath !== void 0 && params.sessionStore !== void 0,
					prompt: cliPrompt,
					transcriptPrompt: cliTranscriptPrompt,
					modelProvider: params.providerOverride,
					requesterModel: {
						provider: params.providerOverride,
						model: params.modelOverride
					},
					provider: cliExecutionProvider,
					abortSignal: params.deferredLifecycle?.signal ?? params.opts.abortSignal,
					onExecutionStarted: params.opts.onExecutionStarted,
					cronCreatorCallerOrigin: params.opts.cronCreatorAuthorityCapability?.callerOrigin,
					requireExplicitMessageTarget: params.opts.requireExplicitMessageTarget ?? isSubagentSessionKey(params.sessionKey),
					cliSessionBindingFacts: params.opts.cliSessionBindingFacts,
					cliSessionId: cliSessionBinding?.sessionId,
					cliSessionBinding,
					forkCliSessionOnResume,
					...forkStoreParams ? {
						claimCliSessionFork: async () => {
							const claimed = await consumeCliSessionForkInStore(forkStoreParams);
							if (claimed) params.sessionEntry = claimed;
							return Boolean(claimed);
						},
						restoreCliSessionFork: async () => {
							const restored = await restoreCliSessionForkInStore({
								...forkStoreParams,
								assertCommitAllowed: assertSettlementCurrent
							});
							if (restored) params.sessionEntry = restored;
						},
						persistCliSessionForkSuccessor: async (successorCliSessionId) => {
							const persisted = await persistCliSessionForkSuccessorInStore({
								...forkStoreParams,
								successorCliSessionId
							});
							if (!persisted) throw new Error("CLI session fork successor could not be persisted");
							params.sessionEntry = persisted;
						}
					} : {},
					authProfileId: cliAuthProfileId,
					imagePrompt: params.body,
					images: params.opts.images,
					imageOrder: params.opts.imageOrder,
					...toolContext,
					currentChannelId: params.runContext.currentChannelId ?? (completionNeedsMessageDelivery ? params.opts.replyTo ?? params.opts.to : void 0),
					toolsAllow: resolveCliRuntimeToolsAllow(cliRuntimeToolsAllow, params.opts.toolsAllowIsDefault),
					...buildCliMcpDelegationCapabilityBinding(resolveDelegationCapability({
						fallbackActive: params.isFallbackRetry,
						inputProvenance: params.opts.inputProvenance,
						disableTools,
						toolsAllow: runtimeToolsAllow
					})),
					cleanupCliLiveSessionOnRunEnd: params.opts.cleanupCliLiveSessionOnRunEnd,
					...forkStoreParams && !forkCliSessionOnResume ? { onBeforeForkedCliSessionRetry: async (retry) => {
						if (hasNewMediaTask() || retry.sessionId !== cliSessionBinding?.sessionId) return false;
						log.warn(`CLI session stalled, arming forked recovery: provider=${sanitizeForLog(cliExecutionProvider)} sessionKey=${forkStoreParams.sessionKey}`);
						const armed = await restoreCliSessionForkInStore(forkStoreParams);
						if (armed) params.sessionEntry = armed;
						return Boolean(armed);
					} } : {},
					...mutableCliSessionStore ? { onBeforeFreshCliSessionRetry: async (retry) => {
						if (hasNewMediaTask() || getCliSessionBinding(loadSessionEntry({
							agentId: params.sessionAgentId,
							sessionKey: mutableCliSessionStore.sessionKey,
							storePath: mutableCliSessionStore.storePath,
							readConsistency: "latest"
						}), cliExecutionProvider)?.sessionId !== retry.sessionId) return false;
						log.warn(`CLI session failed, clearing before fresh retry: provider=${sanitizeForLog(cliExecutionProvider)} sessionKey=${mutableCliSessionStore.sessionKey} reason=${sanitizeForLog(retry.reason)}`);
						const cleared = await clearCliSessionInStore({
							provider: cliExecutionProvider,
							expectedCliSessionId: retry.sessionId,
							...mutableCliSessionStore
						});
						if (!cleared) return false;
						params.sessionEntry = cleared;
						return true;
					} } : {}
				});
			} catch (err) {
				const failedCliSessionBinding = getCliSessionBinding(params.sessionEntry, cliExecutionProvider);
				const failedCliSessionId = failedCliSessionBinding?.sessionId;
				if (isClaudeCliProvider(cliExecutionProvider) && shouldClearFailedCliSessionBinding({
					error: err,
					binding: failedCliSessionBinding,
					bindingReplacedDuringRun: failedCliSessionId !== cliSessionBinding?.sessionId,
					hasNewGeneratedMediaTask: hasNewMediaTask()
				}) && failedCliSessionId && mutableCliSessionStore) {
					log.warn(`CLI session cleared after failed reused turn: provider=${sanitizeForLog(cliExecutionProvider)} sessionKey=${mutableCliSessionStore.sessionKey} reason=${sanitizeForLog(resolveCliSessionClearReason(err))}`);
					params.sessionEntry = await clearCliSessionInStore({
						provider: cliExecutionProvider,
						expectedCliSessionId: failedCliSessionId,
						...mutableCliSessionStore
					}) ?? params.sessionEntry;
				}
				throw err;
			}
			const classification = params.classifyResult?.(result);
			if (!params.preserveCliSessionBinding && (!classification || result.meta.agentMeta?.clearCliSessionBinding === true)) return await persistCliSessionBindingResult({
				agentId: params.sessionAgentId,
				provider: cliExecutionProvider,
				result,
				sessionKey: params.sessionKey,
				storePath: params.storePath,
				sessionStore: params.sessionStore,
				expectedSession: params.sessionEntry,
				assertSettlementCurrent,
				abortSignal: params.deferredLifecycle?.signal ?? params.opts.abortSignal
			});
			return result;
		}, {
			preparedRunAdmission: params.preparedRunAdmission,
			lifecycleGeneration: params.lifecycleGeneration,
			isFinalFallbackAttempt: params.isFinalFallbackAttempt,
			abortSignal: params.deferredLifecycle?.signal ?? params.opts.abortSignal,
			trigger: "user",
			inputProvenance: params.opts.inputProvenance
		});
	}
	const embeddedRunParams = {
		...buildCommonRunParams(),
		sandboxSessionKey: params.sessionKey,
		...toolContext,
		messageTo: params.opts.replyTo ?? params.opts.to,
		messageThreadId: params.opts.threadId,
		hasRepliedRef: params.runContext.hasRepliedRef,
		permissionMode: params.sessionEntry?.permissionMode,
		toolOverrides: params.sessionEntry?.toolOverrides,
		sessionRoot: params.sessionEntry?.sessionRoot,
		...params.pluginGeneration ? { pluginGeneration: params.pluginGeneration } : {},
		agentHarnessId: pinnedHarnessId,
		modelSelectionLocked: !isRawModelRun && params.sessionEntry?.modelSelectionLocked === true,
		agentHarnessRuntimeOverride: embeddedAgentHarnessOverride,
		agentHarnessRuntimePreparationHint: agentHarnessPolicy.runtimeSource !== "implicit" ? agentHarnessPolicy.runtime : void 0,
		prompt: effectivePrompt,
		transcriptPrompt: continuationTranscriptBody,
		images: shouldForwardImagesToEmbedded ? params.opts.images : void 0,
		imageOrder: shouldForwardImagesToEmbedded ? params.opts.imageOrder : void 0,
		clientTools: params.opts.clientTools,
		toolBindings: params.opts.toolBindings,
		provider: embeddedAgentProvider,
		requestedRouteResolution: "resolved",
		modelThinkingCapability: params.modelThinkingCapability,
		modelFallbacksOverride: params.modelFallbacksOverride,
		authProfileId,
		authProfileIdSource: authProfileId ? harnessAuthSelection.authProfileIdSource : void 0,
		isFinalFallbackAttempt: params.isFinalFallbackAttempt,
		verboseLevel: params.resolvedVerboseLevel,
		execSession: params.sessionEntry,
		execApprovalContinuationPromptRange: embeddedExecApprovalContinuationPromptRange,
		execApprovalContinuationTranscriptPromptRange: continuationTranscriptPromptRange,
		suppressLiveStreamOutput: params.opts.sessionEffects === "internal" && params.opts.deliver !== true,
		abortSignal: params.opts.abortSignal,
		bootstrapContextMode: params.opts.bootstrapContextMode,
		bootstrapContextRunKind: params.opts.bootstrapContextRunKind,
		toolsAllow: runtimeToolsAllow,
		runtimePluginToolGrant: params.opts.runtimePluginToolGrant,
		trustedInternalHandoff: trustedSubagentCompletionHandoff ? params.opts.trustedInternalHandoff : void 0,
		cronCreatorAuthorityCapability: params.opts.cronCreatorAuthorityCapability,
		internalEvents: params.opts.internalEvents,
		runtimeContextFragments: params.opts.runtimeContextFragments,
		requireExplicitMessageTarget: params.opts.requireExplicitMessageTarget,
		disableMessageTool: params.opts.disableMessageTool,
		swarmCollector: params.opts.swarmCollector,
		swarmOutputSchema: params.opts.swarmOutputSchema,
		forceRestartSafeTools: params.opts.forceRestartSafeTools,
		forceCodeModeTools: params.opts.forceCodeModeTools,
		codeModeOverride: params.opts.codeModeOverride,
		agentDir: params.agentDir,
		allowGatewaySubagentBinding: params.opts.allowGatewaySubagentBinding,
		allowTransientCooldownProbe: params.allowTransientCooldownProbe,
		modelRun: params.opts.modelRun,
		promptMode: params.opts.promptMode,
		onAgentEvent: params.onAgentEvent,
		deferTerminalLifecycle: params.deferTerminalLifecycle,
		onDeferredLifecycleOwner: params.deferredLifecycle?.adopt,
		onDeferredLifecycleAbort: params.deferredLifecycle?.abort,
		onRetryWait: params.deferredLifecycle?.beginRetryWait,
		assistantErrorTranscript: params.assistantErrorTranscript,
		authProfileFailurePolicy: params.authProfileFailurePolicy,
		onUserMessagePersisted: params.onUserMessagePersisted,
		onCompactionAccounting: params.onCompactionAccounting,
		onCompactionRequestBudget: params.onCompactionRequestBudget,
		onSuccessfulAuthProfile: params.onSuccessfulAuthProfile ? (successfulProfileId) => params.onSuccessfulAuthProfile?.({
			authProfileId: successfulProfileId,
			authProfileIdSource: successfulProfileId ? successfulProfileId === authProfileId ? harnessAuthSelection.authProfileIdSource : "auto" : void 0
		}) : void 0,
		onExecutionStarted: async (info) => {
			await params.opts.onExecutionStarted?.();
			if (info?.lifecycleGeneration) params.onLifecycleGenerationChanged?.(info.lifecycleGeneration);
		},
		onSessionIdChanged: params.opts.onSessionIdChanged
	};
	setChannelSourceTurnId(embeddedRunParams, readChannelSourceTurnId(params.runContext));
	setChannelSourceTurnSameThreadRequired(embeddedRunParams, readChannelSourceTurnSameThreadRequired(params.runContext));
	return runEmbeddedAgent(embeddedRunParams);
}
//#endregion
export { buildAcpResult, createAcpToolLifecycleTracker, createAcpVisibleTextAccumulator, emitAcpAssistantDelta, emitAcpLifecycleEnd, emitAcpLifecycleError, emitAcpLifecycleStart, emitAcpPromptSubmitted, emitAcpRuntimeEvent, persistAcpTurnTranscript, persistCliTurnTranscript, resolveAcpLifecycleEndFields, resolveCliTranscriptReplyText, runAgentAttempt, sessionTranscriptHasContent };
