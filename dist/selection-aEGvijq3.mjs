import { i as resolveGlobalSingleton } from "./global-singleton-BfHBYj6Y.mjs";
import { r as getAsyncWorkSignal } from "./async-work-scope-ClifbwQr.mjs";
import { t as containsAsciiControlCharacter } from "./string-normalization-YMwDjufr.mjs";
import { a as getGatewayContextResolver } from "./gateway-context-binding-VqB7gkMe.mjs";
import { a as getPluginRuntimeGatewayRequestScope, c as withPluginRuntimeGatewayRequestScope } from "./gateway-request-scope-Da9jAC9_.mjs";
import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { O as freezeDiagnosticTraceContext, P as runWithDiagnosticTraceContext, T as createDiagnosticTraceContext, c as emitTrustedDiagnosticEventWithPrivateData, k as getActiveDiagnosticTraceContext, s as emitTrustedDiagnosticEvent, w as createChildDiagnosticTraceContext } from "./diagnostic-events-4jYHJPUA.mjs";
import { t as createSubsystemLogger } from "./subsystem-CeqVSEVi.mjs";
import { r as sha256HexPrefixCore } from "./node-crypto-BInnzoVt.mjs";
import "./crypto-digest-y6oZN-_F.mjs";
import { i as normalizePathPrepend, n as findPathKey, t as applyPathPrepend } from "./path-prepend-D4FR37qV.mjs";
import { _ as resolveSessionAgentIdStrict, v as resolveSessionAgentIds } from "./agent-scope-L_eY3Hj7.mjs";
import { d as getAgentRunLifecycleGeneration } from "./agent-run-registry-BDW3IRlF.mjs";
import { c as emitAgentRunOutputTokens, h as registerAgentEventLifecycleRotationHandler } from "./agent-events-Cg4kQnvf.mjs";
import { a as capturePluginLifecycleAuthority } from "./registry-lifecycle-D7jOZqUu.mjs";
import { l as getActivePluginRegistry } from "./runtime-BnZb2P5v.mjs";
import { l as normalizeToolPolicyName } from "./tool-policy-shared-DSNSYBF4.mjs";
import { a as isRuntimeToolAllowed, o as isToolAllowedByPolicies } from "./tool-policy-match-COwlx5YS.mjs";
import "./tool-policy-C57wduz9.mjs";
import { a as withInstallationTarget, n as getInstallationTarget, r as installationTargetEnv } from "./installation-target-context-CzFxcNEX.mjs";
import { c as openOpenClawAgentDatabase } from "./openclaw-agent-db-CZUYuo7P.mjs";
import { b as runBeforeToolCallHook, c as rewrapToolWithBeforeToolCallHook } from "./agent-tools.before-tool-call-BbipAsOC.mjs";
import { s as getOwnedSessionTranscriptWriterFence } from "./transcript-write-context-D53SX4tj.mjs";
import { o as getActiveSecretsRuntimeConfigSnapshot } from "./runtime-state-I0A0iuwu.mjs";
import { _ as retainAdmittedRunBeforeToolCallRecovery, c as getAdmittedRunDelegatedAuthority, f as readAdmittedRunOperatorAuthority, h as resolveAdmittedRunActiveAssertion, m as readRunOperatorAuthority, n as assertOperatorModelAllowed, r as bindOperatorModelExecution, t as assertAdmittedRunOperatorAuthority } from "./admitted-run-context-BL8yRX2D.mjs";
import { i as unwrapSecretSentinelsForProviderEgress, r as unwrapModelHeaderSentinelsForProviderEgress } from "./provider-secret-egress-DkMhDJl3.mjs";
import { o as resolveAgentHarnessPreparedAuthSupport, r as assertPluginHarnessConversationToolPolicySupport, s as resolveAgentHarnessPreparedRouteSupport } from "./availability-bQlFZ63y.mjs";
import { o as recordAgentHarnessPreflightOwner, t as AgentHarnessPreflightError } from "./errors-Bd6GQRkh.mjs";
import { f as sessionTranscriptIndexNeedsReconcile } from "./session-transcript-index-DOai861G.mjs";
import { o as waitForSessionTranscriptProjection } from "./session-transcript-reconcile-CihXLpUw.mjs";
import { c as getUserTurnTranscriptAdmissionOwner } from "./session-transcript-read-fence-Bq0b1oaG.mjs";
import { n as readActiveTranscriptEntryAnchor } from "./session-accessor.sqlite-transcript-anchor-D71pHf5z.mjs";
import { _ as redactTranscriptMessage } from "./session-accessor.sqlite-transcript-store-CPlEEZZV.mjs";
import { c as loadSessionEntryReadOnly, s as loadSessionEntry } from "./session-accessor.sqlite-entry-C87Sde4p.mjs";
import { p as publishTranscriptUpdate } from "./session-history-eviction-BJoKqhi_.mjs";
import { E as rewriteTranscriptMessageAtAnchor, m as sessionMatchesExpectedTranscriptTurn } from "./session-accessor-CGLseszP.mjs";
import { n as resolveSessionTranscriptDatabasePath } from "./session-accessor.transcript-target-Bb5PwcvU.mjs";
import { g as throwAgentRunRestartAbortReason } from "./run-termination-JCCL0TyS.mjs";
import { r as copyAgentToolMetadata } from "./agent-tool-metadata-BZbVjjCx.mjs";
import { n as createCronScheduledToolProjection } from "./exec-tool-target-pinning-CTUpUcAa.mjs";
import { a as attachInternalToolExecutionPreparer, p as getInternalToolExecutionPreparer } from "./internal-hooks-DUPhyX-W.mjs";
import { c as withGatewayToolCallerIdentity, i as getGatewayToolCallerIdentity, n as createAdmittedGatewayToolCallerIdentity, s as withGatewayToolApprovalOwner, u as wrapToolWithGatewayCallerIdentity } from "./gateway-caller-context-DQ2iIITl.mjs";
import { i as withChannelReadAuthority } from "./channel-read-authority-BBYW2wKk.mjs";
import { n as resolveEffectiveToolFsWorkspaceOnly } from "./tool-fs-policy-DnnmQR8b.mjs";
import { r as diagnosticErrorMessage, t as diagnosticErrorCategory } from "./diagnostic-error-metadata-Bs8HzEWF.mjs";
import { c as registerTrustedToolNoStartError } from "./tool-result-error-PlIKzTNz.mjs";
import { t as callGatewayTool } from "./gateway-CnezJTJC.mjs";
import { t as bindAgentToolSourceExecutionGuard } from "./agent-tool-source-execution-guard-D0rco2wW.mjs";
import { a as registerAgentHarnessScheduledToolProjectionCapability, d as withAgentQuestionAnswerAuthority, l as resolveAgentQuestionAnswerAuthority, o as registerAgentHarnessTtsProvenanceTransferCapability, r as registerAgentHarnessBeforeToolCallRetention } from "./host-private-capabilities-D8EEgJHq.mjs";
import { r as assertContextEngineHostSupport } from "./host-compat-xESS3bi6.mjs";
import { r as resolveAgentHarnessSelectionDecision, t as buildAgentHarnessSelectionDecision } from "./selection-decision-CgiQJFvc.mjs";
import { c as normalizeAgentRunAttemptTerminal, l as projectAgentRunAttemptTerminal } from "./agent-run-terminal-outcome-BGbjspLO.mjs";
import { i as resolvePluginHarnessDenyAllToolPolicyPrompt, o as resolvePluginHarnessToolPolicies, t as assertAgentHarnessExecutionEnvironment } from "./execution-environment-CU6Dkl2v.mjs";
import { a as prepareActiveNodeContext, t as buildActiveNodeContextText } from "./active-node-context-DCXnpnv4.mjs";
import { t as registerMcpToolApprovalBinding } from "./mcp-tool-approval-binding-CR3cnhS_.mjs";
import { s as prepareSystemRunMutableFileApproval } from "./system-run-approval-binding-B-39Lo0o.mjs";
import { t as buildAgentHookContextChannelFields } from "./hook-agent-context-CHMCw5IP.mjs";
import { t as resolveSkillResourceCandidates } from "./resource-candidates-C5O2TUrB.mjs";
import { n as wrapToolWithAbortSignal } from "./agent-tools.abort-DuDEn6gj.mjs";
import { n as createOpenClawCodingToolsInternal } from "./agent-tools-DdIcx9SP.mjs";
import { i as runWithAgentRingZeroTools, n as isHostScopedAgentToolActive } from "./agent-tools.ring-zero-context-DcmTQndF.mjs";
import { n as resolveExecToolConfig } from "./lazy-exec-tool-DeqgWNWL.mjs";
import { l as prepareGitHubToolEnvironment } from "./github-tool-identity-fecb-JRm.mjs";
import { t as isHeartbeatLifecycleRunKind } from "./bootstrap-mode-HvSedbJl.mjs";
import { t as resolveToolLoopDetectionConfig } from "./tool-loop-detection-config-DDGfwcUc.mjs";
import { o as transferCoreTtsToolResultProvenance, r as getCoreTtsToolResultMediaUrls, t as copyCoreTtsAttemptResultProvenance } from "./tts-tool-result-provenance-z42MPFVT.mjs";
import { t as log$1 } from "./logger-CRHWOiHk.mjs";
import { bt as runBestEffortCallback, n as isBuiltInOpenClawAgentHarness, t as createOpenClawAgentHarness } from "./builtin-openclaw-DEib7rq9.mjs";
import { t as formatHarnessApprovalPresentation } from "./native-hook-relay-approval-presentation-CbSRCLHn.mjs";
import { t as claimHeartbeatContextForUserRun } from "./heartbeat-outcome-store-DYCRUBoi.mjs";
import { t as appendCurrentInboundContext } from "./runtime-context-prompt-K3ClPtvW.mjs";
import { i as EmptySettledTurnFinalizationError, t as assertSettledTurnFinalizationResult } from "./settled-turn-finalization-result-B8lL2uN5.mjs";
import { a as selectContextEngineForTranscriptHost, n as drainPendingContextEngineTurnsBeforeRun } from "./context-engine-turn-attempt-C_GMPF6I.mjs";
import { t as subscribeAgentCommentaryDiagnostics } from "./commentary-diagnostics-BbS5aIRo.mjs";
import path from "node:path";
import { isDeepStrictEqual } from "node:util";
//#region src/sessions/user-turn-transcript-annotation.ts
/** Core-only binding performed by the harness host before invoking plugin code. */
function bindUserTurnTranscriptAnnotation(params) {
	const owner = getUserTurnTranscriptAdmissionOwner(params.recorder);
	const receipt = owner?.receipt();
	const message = owner?.message();
	if (!owner || !receipt || !message || owner.blocked() || message.excludeFromContext === true) return;
	let admission = structuredClone(receipt);
	let admittedMessage = structuredClone(message);
	const target = { ...params.target };
	const selected = loadSessionEntry({
		...target,
		readConsistency: "latest"
	});
	const fence = getOwnedSessionTranscriptWriterFence({ sessionTarget: target });
	if (target.sessionId !== admission.sessionId || target.sessionKey !== admission.sessionKey || target.agentId !== admission.agentId || resolveSessionTranscriptDatabasePath(target) !== admission.storePath || !selected || selected.sessionId !== admission.sessionId || selected.activeWriterRunId !== void 0 && selected.activeWriterRunId !== params.runId) return;
	const expectedLifecycleRevision = target.expectedLifecycleRevision ?? fence?.expectedLifecycleRevision ?? selected.lifecycleRevision ?? null;
	const expectedWriterRunId = target.expectedWriterRunId ?? fence?.expectedWriterRunId;
	const assertCurrent = () => {
		params.assertCurrent();
		const current = loadSessionEntry({
			...target,
			readConsistency: "latest"
		});
		const { logicalTurnId: _logicalTurnId, role: _role, ...anchor } = admission;
		if (params.abortSignal?.aborted || owner.blocked() || !isDeepStrictEqual(owner.receipt(), admission) || !isDeepStrictEqual(owner.message(), admittedMessage) || admittedMessage["__openclaw"]?.steerTargetRunId !== void 0 || !sessionMatchesExpectedTranscriptTurn(current ? { entry: current } : void 0, {
			expectedSessionId: admission.sessionId,
			expectedLifecycleRevision,
			expectedWriterRunId
		}) || fence?.expectedWriterRunId !== void 0 && current?.activeWriterRunId !== fence.expectedWriterRunId || fence?.expectedLifecycleRevision !== void 0 && current?.lifecycleRevision !== fence.expectedLifecycleRevision || current?.activeWriterRunId !== selected.activeWriterRunId || sessionTranscriptIndexNeedsReconcile(openOpenClawAgentDatabase({
			agentId: admission.agentId,
			path: admission.storePath
		}).db, admission.sessionId) || !isDeepStrictEqual(readActiveTranscriptEntryAnchor(admission), anchor)) throw new Error("current user admission is no longer available for native annotation");
	};
	return async (annotation) => {
		const fields = {
			mirrorIdentity: annotation.mirrorIdentity,
			upstreamUserText: annotation.upstreamUserText,
			mirrorOrigin: annotation.mirrorOrigin,
			mirrorSourceFingerprint: annotation.mirrorSourceFingerprint,
			runId: params.runId
		};
		if (Object.values(fields).some((value) => typeof value !== "string") || !fields.mirrorIdentity || !fields.mirrorOrigin || !fields.mirrorSourceFingerprint) throw new Error("native prompt annotation requires complete provenance");
		assertCurrent();
		if (sha256HexPrefixCore(JSON.stringify({
			role: "user",
			content: admittedMessage.content,
			upstreamUserText: fields.upstreamUserText || void 0
		}), 32) !== fields.mirrorSourceFingerprint) throw new Error("native prompt annotation does not match admitted content");
		let verified = false;
		const rewritten = await rewriteTranscriptMessageAtAnchor(admission, (current) => {
			assertCurrent();
			if (!isDeepStrictEqual(current, admittedMessage)) throw new Error("native prompt annotation cannot replace an edited admission");
			const metadata = admittedMessage["__openclaw"] ?? {};
			if (metadata.runTerminal !== void 0 || Object.entries(fields).some(([key, value]) => metadata[key] !== void 0 && metadata[key] !== value)) throw new Error("native prompt annotation conflicts with recorded provenance");
			const next = {
				...admittedMessage,
				__openclaw: {
					...metadata,
					...fields
				}
			};
			if (!isDeepStrictEqual(redactTranscriptMessage(next, params.config), next)) throw new Error("native prompt annotation would restore redacted evidence");
			verified = true;
			return isDeepStrictEqual(next, admittedMessage) ? void 0 : next;
		});
		if (!verified) throw new Error("native prompt admission disappeared before annotation");
		if (rewritten) {
			admission = {
				...admission,
				generation: rewritten.generation
			};
			admittedMessage = structuredClone(rewritten.message);
			owner.refresh({ ...admission }, rewritten.message);
			await waitForSessionTranscriptProjection(admission, params.abortSignal);
		}
		assertCurrent();
		if (rewritten) {
			await publishTranscriptUpdate(admission, {
				message: rewritten.message,
				messageId: admission.entryId,
				messageSeq: admission.activeMessagePosition + 1
			});
			assertCurrent();
		}
	};
}
//#endregion
//#region src/agents/harness/host-environment.ts
const MAX_NATIVE_OPERATION_CWD_BYTES = 4096;
function normalizeNativeOperationCwd(value, attemptCwd) {
	if (typeof value !== "string") throw new Error("native operation cwd must be a string");
	const normalized = value.trim();
	if (!normalized) throw new Error("native operation cwd must not be empty");
	if (Buffer.byteLength(normalized, "utf8") > MAX_NATIVE_OPERATION_CWD_BYTES) throw new Error(`native operation cwd must not exceed ${MAX_NATIVE_OPERATION_CWD_BYTES} bytes`);
	if (containsAsciiControlCharacter(normalized)) throw new Error("native operation cwd must not contain control characters");
	return path.resolve(attemptCwd ?? process.cwd(), normalized);
}
/** Capture non-secret environment facts once; the harness owns their placement. */
function prepareAgentHarnessEnvironment(params) {
	const execConfig = resolveExecToolConfig({
		cfg: params.config,
		agentId: params.sandboxAgentId ?? resolveSessionAgentIdStrict(params)
	});
	const hasConfiguredPrefix = normalizePathPrepend(execConfig.configuredPathPrepend).length > 0;
	const pathKey = findPathKey(process.env);
	const localToolEnv = hasConfiguredPrefix ? { [pathKey]: process.env[pathKey] ?? "" } : void 0;
	const localToolPathPrepend = hasConfiguredPrefix ? Object.freeze(normalizePathPrepend(execConfig.pathPrepend)) : void 0;
	if (localToolEnv && localToolPathPrepend) {
		applyPathPrepend(localToolEnv, [...localToolPathPrepend]);
		Object.freeze(localToolEnv);
	}
	const identity = prepareGitHubToolEnvironment({
		config: params.config ?? {},
		sourceConfig: getActiveSecretsRuntimeConfigSnapshot()?.sourceConfig,
		agentId: params.agentId ?? "main"
	});
	const localProcessEnv = installationTargetEnv(params.installationTarget);
	return Object.freeze({
		credentialScrubEnv: Object.freeze({ ...identity.credentialScrubEnv }),
		localIdentityEnv: Object.freeze({ ...identity.localIdentityEnv }),
		managedLocalIdentity: identity.managedLocalIdentity,
		...localProcessEnv ? { localProcessEnv } : {},
		...localToolEnv ? {
			localToolEnv,
			localToolPathPrepend
		} : {}
	});
}
//#endregion
//#region src/agents/harness/context-media.ts
/** Captures media policy before plugin invocation while keeping extraction dependencies lazy. */
function bindHarnessContextMedia(params) {
	const { attempt, config, assertActive } = params;
	if (!attempt.workspaceDir || !attempt.model) return;
	const modelInput = structuredClone(attempt.model.input);
	Object.freeze(modelInput);
	const contextMedia = Object.freeze({
		config,
		workspaceDir: attempt.sandbox?.enabled ? attempt.sandbox.workspaceDir : attempt.workspaceDir,
		agentWorkspaceDir: attempt.workspaceDir,
		modelInput,
		agentId: attempt.agentId,
		channelId: attempt.messageChannel ?? attempt.messageProvider,
		accountId: attempt.agentAccountId,
		...attempt.sandbox?.enabled && attempt.sandbox.fsBridge ? { sandbox: Object.freeze({
			root: attempt.sandbox.workspaceDir,
			bridge: attempt.sandbox.fsBridge
		}) } : {}
	});
	const assertCurrent = () => {
		assertActive();
		attempt.abortSignal?.throwIfAborted();
	};
	return async (request) => {
		assertCurrent();
		const { prepareHarnessContextMedia } = await import("./context-media-runtime-CRLAYOn0.mjs");
		assertCurrent();
		const result = await prepareHarnessContextMedia({
			...request,
			...contextMedia,
			assertCurrent
		});
		assertCurrent();
		return result;
	};
}
//#endregion
//#region src/agents/harness/input-attachments.ts
/** Capture original input and policy before the plugin confirms actual execution placement. */
function bindHarnessInputAttachments(params) {
	const { attempt, config, assertActive } = params;
	const attemptSignal = attempt.abortSignal;
	const inputWorkspaceDir = attempt.workspaceDir;
	const inputTimeoutMs = attempt.timeoutMs;
	const initialInput = {
		media: structuredClone(attempt.inputAttachmentMedia ?? attempt.media),
		userTurnTranscriptRecorder: attempt.userTurnTranscriptRecorder
	};
	const inputPolicyEligible = !attempt.sandbox?.enabled && !attempt.requireWorkspaceOnly && !attempt.modelRun && attempt.promptMode !== "none" && (!attempt.permissionMode || attempt.permissionMode === "full") && !resolveEffectiveToolFsWorkspaceOnly({
		cfg: config,
		agentId: attempt.agentId
	});
	let inputReadAllowed = false;
	return {
		prepareInputAttachments: inputWorkspaceDir && inputTimeoutMs !== void 0 ? async (request) => {
			const assertCurrent = () => {
				assertActive();
				attemptSignal?.throwIfAborted();
				request.signal?.throwIfAborted();
				request.assertCurrent();
			};
			assertCurrent();
			if (!inputReadAllowed || !inputPolicyEligible) return;
			const { prepareAgentWorkspaceAttachments } = await import("./workspace-access-C_8Dvsfe.mjs");
			assertCurrent();
			const result = await prepareAgentWorkspaceAttachments({
				workspaceDir: inputWorkspaceDir,
				localExecution: {
					config,
					readAllowed: inputReadAllowed,
					maxChars: request.maxChars
				},
				turn: {
					...request.turn ?? initialInput,
					config,
					timeoutMs: inputTimeoutMs,
					abortSignal: request.signal ?? attemptSignal
				},
				assertCurrent
			});
			assertCurrent();
			return result;
		} : void 0,
		setInputAttachmentReadAllowed: (allowed) => {
			assertActive();
			inputReadAllowed = allowed;
		}
	};
}
//#endregion
//#region src/agents/harness/reply-media.ts
/** Capture policy before plugin invocation; the supplied reader only provides workspace bytes. */
function bindHarnessReplyMedia(params) {
	const { attempt, assertActive } = params;
	if (!attempt.workspaceDir) return;
	const context = Object.freeze({
		cfg: params.config ?? {},
		workspaceDir: attempt.workspaceDir,
		agentId: attempt.agentId,
		sessionKey: attempt.sessionKey ?? attempt.sessionId,
		messageProvider: attempt.messageChannel ?? attempt.messageProvider,
		accountId: attempt.agentAccountId,
		groupId: attempt.groupId ?? void 0,
		groupChannel: attempt.groupChannel ?? void 0,
		groupSpace: attempt.groupSpace ?? void 0,
		requesterSenderId: attempt.senderId ?? void 0,
		requesterSenderName: attempt.senderName ?? void 0,
		requesterSenderUsername: attempt.senderUsername ?? void 0,
		requesterSenderE164: attempt.senderE164 ?? void 0,
		sourceReplyDeliveryMode: attempt.sourceReplyDeliveryMode,
		runId: attempt.runId,
		reasoningLevel: attempt.reasoningLevel
	});
	const attemptSignal = attempt.abortSignal;
	return async (request) => {
		const assertSourceCurrent = request.assertCurrent;
		const signal = AbortSignal.any([
			params.signal,
			...attemptSignal ? [attemptSignal] : [],
			...request.signal ? [request.signal] : []
		]);
		const assertCurrent = () => {
			assertActive();
			assertSourceCurrent?.();
			signal.throwIfAborted();
		};
		assertCurrent();
		const { prepareHarnessReplyMedia } = await import("./reply-media-runtime-Zenz5xzv.mjs");
		assertCurrent();
		const result = await withChannelReadAuthority(assertCurrent, () => prepareHarnessReplyMedia({
			request,
			context,
			signal,
			assertCurrent
		}), signal);
		assertCurrent();
		return result;
	};
}
//#endregion
//#region src/agents/harness/host-media.ts
/** Bind media capabilities to the same captured attempt policy and host lifetime. */
function bindHarnessMedia(params) {
	const { prepareInputAttachments, setInputAttachmentReadAllowed } = bindHarnessInputAttachments(params);
	const prepareContextMedia = bindHarnessContextMedia(params);
	const prepareReplyMedia = bindHarnessReplyMedia(params);
	return {
		capabilities: {
			...prepareContextMedia ? { prepareContextMedia } : {},
			...prepareInputAttachments ? { prepareInputAttachments } : {},
			...prepareReplyMedia ? { prepareReplyMedia } : {}
		},
		setInputAttachmentReadAllowed
	};
}
//#endregion
//#region src/agents/harness/host-source-authority.ts
/** Acquires original-source model authority while the issuing host is active. */
function bindHarnessModelExecution(admittedRunContext, model, assertActive) {
	assertActive();
	return bindOperatorModelExecution(readAdmittedRunOperatorAuthority(admittedRunContext), model);
}
const retainedSources = resolveGlobalSingleton(Symbol.for("openclaw.harness.retainedSources"), () => /* @__PURE__ */ new Set());
registerAgentEventLifecycleRotationHandler("harness-retained-sources", () => {
	const retiring = [...retainedSources];
	retainedSources.clear();
	for (const controller of retiring) controller.abort(/* @__PURE__ */ new Error("agent harness retained source is no longer active"));
});
/** Transfers original-source custody while the issuing foreground host is still live. */
function retainHarnessSource(admittedRunContext, assertActive, nativeModelPolicySupported = false) {
	assertActive();
	const lifecycleGeneration = getAgentRunLifecycleGeneration();
	const source = readAdmittedRunOperatorAuthority(admittedRunContext);
	if (!source) return;
	const modelExecution = nativeModelPolicySupported ? void 0 : bindOperatorModelExecution(source, void 0);
	const release = nativeModelPolicySupported ? source.retain?.() : modelExecution?.release;
	const assertSourceCurrent = () => {
		if (nativeModelPolicySupported) source.assertCurrent();
		else modelExecution?.assertCurrent();
	};
	try {
		assertActive();
		assertSourceCurrent();
		assertActive();
	} catch (error) {
		release?.();
		throw error;
	}
	let released = false;
	let modelLifetime;
	const lifecycle = new AbortController();
	retainedSources.add(lifecycle);
	const authoritySignal = modelExecution?.signal ?? source.signal;
	const signal = authoritySignal ? AbortSignal.any([authoritySignal, lifecycle.signal]) : lifecycle.signal;
	const assertRetained = () => {
		if (released || getAgentRunLifecycleGeneration() !== lifecycleGeneration) throw new Error("agent harness retained source is no longer active");
		signal.throwIfAborted();
	};
	const assertCurrent = () => {
		assertRetained();
		assertSourceCurrent();
		assertRetained();
	};
	return Object.freeze({
		signal,
		assertCurrent,
		get modelPolicyRequired() {
			assertCurrent();
			const required = source.modelPolicy !== void 0;
			assertCurrent();
			return required;
		},
		get sourceIdentity() {
			assertCurrent();
			const identity = source.source;
			assertCurrent();
			return identity;
		},
		bindModelExecution: (model) => {
			assertCurrent();
			const binding = bindOperatorModelExecution(source, model);
			if (!binding) return;
			const assertBindingCurrent = () => {
				binding.assertCurrent();
				assertRetained();
			};
			try {
				assertBindingCurrent();
			} catch (error) {
				binding.release();
				throw error;
			}
			modelLifetime ??= new AbortController();
			return {
				signal: AbortSignal.any([
					signal,
					modelLifetime.signal,
					binding.signal
				]),
				assertCurrent: assertBindingCurrent,
				release: binding.release
			};
		},
		release: () => {
			if (!released) {
				released = true;
				retainedSources.delete(lifecycle);
				modelLifetime?.abort(/* @__PURE__ */ new Error("agent harness retained source is no longer active"));
				release?.();
			}
		}
	});
}
function assertCompactionSource(source) {
	if (!source || !Object.hasOwn(source, "operatorAuthority")) throw new Error("Compaction requires its original host source authority");
	source.assertActive();
	if (source.operatorAuthority !== void 0) {
		assertAdmittedRunOperatorAuthority(source.operatorAuthority);
		source.operatorAuthority.assertCurrent();
	}
}
/** Retains the existing issuer through queueing; the compaction work owner releases it. */
function retainAgentHarnessCompactionSource(source) {
	assertCompactionSource(source);
	const release = source.operatorAuthority?.retain?.();
	try {
		assertCompactionSource(source);
	} catch (error) {
		release?.();
		throw error;
	}
	let released = false;
	return () => {
		if (!released) {
			released = true;
			release?.();
		}
	};
}
//#endregion
//#region src/agents/harness/host-trajectory.ts
/** Keeps trajectory callbacks bound to the exact foreground host lifetime. */
function bindHarnessTrajectory(recorder, assertActive) {
	return Object.freeze({
		recordEvent: (type, data) => {
			assertActive();
			recorder.recordEvent(type, data);
		},
		flush: async () => {
			assertActive();
			await recorder.flush();
			assertActive();
		}
	});
}
//#endregion
//#region src/agents/harness/node-execution-authority.ts
/** Full is admitted host authority, narrowed to one placement claim, never a request flag. */
function createSessionNodeAuthorities(attempt, pluginId, requiredNodeCommands, assertActive, signal) {
	const admittedFull = attempt.permissionMode === "full";
	const resolveContext = getGatewayContextResolver(attempt.admittedRunContext);
	const context = resolveContext?.();
	const target = attempt.sessionTarget;
	const gatewayRegistry = getActivePluginRegistry();
	const pluginOwners = [gatewayRegistry, getPluginRuntimeGatewayRequestScope()?.pluginRegistry ?? gatewayRegistry].map((owner) => {
		const record = owner?.plugins.find((candidate) => candidate.id === pluginId);
		return owner && record ? capturePluginLifecycleAuthority(owner, record, { scopedRuntime: owner !== gatewayRegistry }) : void 0;
	});
	const assertPlacementCurrent = getPluginRuntimeGatewayRequestScope()?.assertNodeExecutionCurrent;
	if (!context || !target?.storePath || !attempt.agentId || !attempt.sessionKey || !attempt.sessionId || !assertPlacementCurrent) return {};
	const session = {
		agentId: attempt.agentId,
		sessionKey: attempt.sessionKey,
		storePath: target.storePath
	};
	const assertRequestCurrent = (request) => {
		if (request.source === "session-full" && (!admittedFull || !requiredNodeCommands.has(request.command))) throw new Error("admitted node execution authority does not cover this command");
		assertActive();
		const entry = loadSessionEntryReadOnly(session);
		if (signal.aborted || getActivePluginRegistry() !== gatewayRegistry || pluginOwners.some((isCurrent) => !isCurrent?.()) || request.source === "session-full" && (attempt.permissionMode !== "full" || !requiredNodeCommands.has(request.command)) || resolveContext && resolveContext() !== context || request.pluginId !== pluginId || !entry || entry.sessionId !== attempt.sessionId || request.source === "session-full" && entry.permissionMode !== "full" || request.workspace.sessionKey !== attempt.sessionKey || request.workspace.sessionId !== attempt.sessionId) throw new Error("admitted node execution authority is no longer current");
		assertPlacementCurrent({
			...request,
			runId: attempt.runId,
			agentId: session.agentId
		});
	};
	const invokeWithSessionNodeAuthority = async (request, invoke) => {
		if (request.source === "session-full" && (!admittedFull || !requiredNodeCommands.has(request.command))) return;
		const assertCurrent = () => assertRequestCurrent(request);
		assertCurrent();
		const result = await invoke(assertCurrent, signal);
		assertCurrent();
		return result;
	};
	return {
		invokeWithSessionNodeAuthority,
		nodePlacementGrantAuthority: {
			agentId: session.agentId,
			sessionKey: attempt.sessionKey,
			runId: attempt.runId,
			assertCurrent: (request) => assertRequestCurrent({
				...request,
				source: "human-approved"
			})
		}
	};
}
//#endregion
//#region src/agents/harness/host-capability.ts
function freezeSnapshot(value, seen = /* @__PURE__ */ new WeakSet()) {
	if (!value || typeof value !== "object" || seen.has(value)) return value;
	seen.add(value);
	for (const nested of Object.values(value)) freezeSnapshot(nested, seen);
	return Object.freeze(value);
}
function cloneSnapshot(value) {
	return freezeSnapshot(structuredClone(value));
}
function gateBoundTool(tool, assertActive, observeResult) {
	const execute = tool.execute;
	const sourcePreparer = getInternalToolExecutionPreparer(tool);
	if (!execute && !sourcePreparer) return tool;
	const gated = {
		...tool,
		...execute ? { execute: async (...args) => {
			try {
				assertActive();
			} catch (error) {
				throw registerTrustedToolNoStartError(error);
			}
			const result = await execute(...args);
			assertActive();
			observeResult(result);
			return result;
		} } : {}
	};
	copyAgentToolMetadata(tool, gated, (source) => gateBoundTool(source, assertActive, observeResult));
	if (sourcePreparer) attachInternalToolExecutionPreparer(gated, async (preparationParams) => {
		assertActive();
		const prepared = await sourcePreparer(preparationParams);
		try {
			assertActive();
		} catch (error) {
			prepared.dispose();
			throw error;
		}
		if (prepared.kind === "immediate") {
			if (prepared.outcome.kind === "result") observeResult(prepared.outcome.result);
			return prepared;
		}
		return {
			...prepared,
			execute: async (onImplementationStart) => {
				assertActive();
				const result = await prepared.execute(onImplementationStart);
				assertActive();
				observeResult(result);
				return result;
			}
		};
	});
	return gated;
}
/** Creates a closure-bound capability before plugin invocation. */
function createAgentHarnessHostCapabilities(params) {
	const attempt = params.attempt;
	const runtimePluginToolGrant = attempt.runtimePluginToolGrant ? Object.freeze({
		pluginId: attempt.runtimePluginToolGrant.pluginId,
		toolNames: Object.freeze([...attempt.runtimePluginToolGrant.toolNames])
	}) : void 0;
	const githubPublicationAvailable = attempt.githubPublicationAvailable;
	const workSignal = getAsyncWorkSignal();
	const attemptSignal = attempt.abortSignal;
	const installationTarget = getInstallationTarget();
	const { sessionKey, onAgentEvent } = attempt;
	const requiredNodeCommands = new Set(params.requiredNodeCommands);
	const nativeModelPolicySupported = params.nativeModelPolicySupport === "exact";
	const operationalRunInstance = attempt.admittedRunContext.operationalRunInstance;
	const delegatedAuthority = getAdmittedRunDelegatedAuthority(attempt.admittedRunContext);
	const requesterProfileId = readAdmittedRunOperatorAuthority(attempt.admittedRunContext)?.profileId;
	if (!delegatedAuthority) throw new Error("agent harness host capability requires active admitted run authority");
	const { lifecycleGeneration } = delegatedAuthority;
	const { runId } = delegatedAuthority.operationalRunInstance;
	const coreTtsToolResults = /* @__PURE__ */ new WeakSet();
	let active = true;
	const capabilityAbortController = new AbortController();
	const inheritedCaller = getGatewayToolCallerIdentity();
	const sourceCaller = inheritedCaller?.operationalRunInstance === operationalRunInstance ? inheritedCaller : void 0;
	const callerIdentity = createAdmittedGatewayToolCallerIdentity({
		admittedRunContext: attempt.admittedRunContext,
		receiptAuthority: assertActive,
		approvalSignals: [capabilityAbortController.signal, ...attemptSignal ? [attemptSignal] : []],
		agentId: attempt.agentId,
		sessionKey: attempt.sessionKey,
		turnSourceChannel: attempt.messageChannel ?? attempt.messageProvider,
		turnSourceTo: attempt.currentMessagingTarget ?? attempt.currentChannelId,
		turnSourceAccountId: attempt.agentAccountId,
		turnSourceThreadId: attempt.currentThreadTs
	});
	const inactiveError = (message) => {
		throwAgentRunRestartAbortReason(attemptSignal?.aborted ? attemptSignal.reason : workSignal?.reason);
		return new Error(message);
	};
	const boundGatewayContext = getGatewayContextResolver(attempt.admittedRunContext);
	function assertActive() {
		if (!active || attempt.admittedRunContext.operationalRunInstance !== operationalRunInstance || getAdmittedRunDelegatedAuthority(attempt.admittedRunContext) !== delegatedAuthority || boundGatewayContext && callerIdentity?.gatewayContextResolver?.() === void 0) throw inactiveError("agent harness host capability is no longer active");
		if (sourceCaller && (sourceCaller.agentId !== attempt.agentId || sourceCaller.sessionKey !== attempt.sessionKey) || sourceCaller?.workerTurnClaim && (sourceCaller.workerTurnClaim.sessionId !== attempt.sessionId || sourceCaller.workerTurnClaim.runId !== attempt.runId) || sourceCaller?.workerTurnClaim && !sourceCaller.receiptAuthority || sourceCaller?.receiptAuthority?.() === false) throw new Error("agent harness host capability lost its source execution claim");
	}
	const observeCoreTtsToolResult = (result) => {
		if (typeof result === "object" && result !== null && getCoreTtsToolResultMediaUrls(result)) coreTtsToolResults.add(result);
	};
	const requester = {
		...attempt.messageChannel ?? attempt.messageProvider ? { channel: attempt.messageChannel ?? attempt.messageProvider ?? void 0 } : {},
		...attempt.agentAccountId ? { accountId: attempt.agentAccountId } : {},
		...attempt.senderId ? { senderId: attempt.senderId } : {},
		...attempt.senderIsOwner !== void 0 ? { senderIsOwner: attempt.senderIsOwner } : {},
		...attempt.memberRoleIds?.length ? { roleIds: Object.freeze([...attempt.memberRoleIds]) } : {}
	};
	const config = attempt.config ? cloneSnapshot(attempt.config) : void 0;
	const hostSandboxEnabled = attempt.sandbox?.enabled === true;
	const media = bindHarnessMedia({
		attempt,
		config,
		assertActive,
		signal: capabilityAbortController.signal
	});
	const recorder = attempt.userTurnTranscriptRecorder;
	const sessionTarget = attempt.sessionTarget ? cloneSnapshot(attempt.sessionTarget) : void 0;
	const annotateCurrentUserTurn = attempt.userTurnTranscriptRecorder && attempt.sessionTarget && attempt.agentId && attempt.sessionId && attempt.sessionKey && attempt.sessionTarget.storePath && !attempt.suppressNextUserMessagePersistence && attempt.trigger !== "memory" ? bindUserTurnTranscriptAnnotation({
		recorder: attempt.userTurnTranscriptRecorder,
		target: {
			...attempt.sessionTarget,
			agentId: attempt.agentId,
			sessionId: attempt.sessionId,
			sessionKey: attempt.sessionKey,
			storePath: attempt.sessionTarget.storePath
		},
		runId: attempt.runId,
		config,
		abortSignal: attempt.abortSignal ? AbortSignal.any([attempt.abortSignal, capabilityAbortController.signal]) : capabilityAbortController.signal,
		assertCurrent: () => {
			assertActive();
			if (attempt.userTurnTranscriptRecorder !== recorder || !isDeepStrictEqual(attempt.sessionTarget, sessionTarget) || sessionTarget?.agentId !== void 0 && sessionTarget.agentId !== attempt.agentId || sessionTarget?.sessionId !== void 0 && sessionTarget.sessionId !== attempt.sessionId || sessionTarget?.sessionKey !== void 0 && sessionTarget.sessionKey !== attempt.sessionKey) throw new Error("native prompt annotation lost its source execution claim");
		}
	}) : void 0;
	const skillsSnapshot = attempt.skillsSnapshot ? cloneSnapshot(attempt.skillsSnapshot) : void 0;
	const preparedRunEnvironment = prepareAgentHarnessEnvironment({
		config,
		agentId: attempt.agentId,
		sessionKey: attempt.sessionKey,
		sandboxAgentId: attempt.sandboxAgentId,
		installationTarget
	});
	const skillUsagePaths = attempt.sandbox?.skillUsagePaths ? cloneSnapshot(attempt.sandbox.skillUsagePaths) : void 0;
	const hookContext = Object.freeze({
		...attempt.agentId ? { agentId: attempt.agentId } : {},
		...config ? { config } : {},
		...attempt.cwd ? { cwd: attempt.cwd } : {},
		...attempt.workspaceDir ? { workspaceDir: attempt.workspaceDir } : {},
		...attempt.sessionKey ? { sessionKey: attempt.sessionKey } : {},
		...attempt.sessionId ? { sessionId: attempt.sessionId } : {},
		runId: attempt.runId,
		...buildAgentHookContextChannelFields(attempt),
		...Object.keys(requester).length > 0 ? { requester: Object.freeze(requester) } : {},
		...getActiveDiagnosticTraceContext() ? { trace: getActiveDiagnosticTraceContext() } : {},
		...skillsSnapshot ? { skillsSnapshot } : {},
		...skillUsagePaths ? { skillUsagePaths } : {},
		...attempt.onToolOutcome ? { onToolOutcome: attempt.onToolOutcome } : {},
		...attempt.allocateToolOutcomeOrdinal ? { allocateToolOutcomeOrdinal: attempt.allocateToolOutcomeOrdinal } : {},
		...attempt.sandbox?.enabled && attempt.sandbox.workspaceAccess === "rw" && attempt.sandbox.fsBridge ? { sandbox: Object.freeze({
			root: attempt.sandbox.workspaceDir,
			bridge: attempt.sandbox.fsBridge
		}) } : {},
		loopDetection: cloneSnapshot(resolveToolLoopDetectionConfig({
			cfg: config,
			agentId: attempt.agentId
		})),
		trigger: attempt.trigger,
		approvalReviewerDeviceId: attempt.approvalReviewerDeviceId,
		turnSourceChannel: attempt.messageChannel ?? attempt.messageProvider,
		turnSourceTo: attempt.currentMessagingTarget ?? attempt.currentChannelId,
		turnSourceAccountId: attempt.agentAccountId,
		turnSourceThreadId: attempt.currentThreadTs
	});
	const withCaller = async (run, signal) => await withGatewayToolCallerIdentity(callerIdentity && signal ? {
		...callerIdentity,
		approvalSignals: [...callerIdentity.approvalSignals ?? [], signal]
	} : callerIdentity, run);
	const runBeforeToolCallWithAssertion = async (assertCurrent, { nativeOperation, approvalMode, ...request }) => {
		assertCurrent();
		const hostApprovalMode = approvalMode === "defer" ? "defer" : "request";
		const actionCwd = nativeOperation?.cwd !== void 0 ? normalizeNativeOperationCwd(nativeOperation.cwd, hookContext.cwd) : void 0;
		const actionHookContext = actionCwd ? Object.freeze({
			...hookContext,
			cwd: actionCwd
		}) : hookContext;
		const result = await runBeforeToolCallHook({
			...request,
			approvalMode: hostApprovalMode,
			ctx: actionHookContext
		});
		assertCurrent();
		return result;
	};
	const runBeforeToolCall = async (request) => await withCaller(async () => await runBeforeToolCallWithAssertion(assertActive, request), request.signal);
	registerAgentHarnessBeforeToolCallRetention(runBeforeToolCall, () => {
		const recovery = retainAdmittedRunBeforeToolCallRecovery(attempt.admittedRunContext);
		if (!recovery) return;
		const assertRecoveryActive = () => {
			if (attempt.abortSignal?.aborted || attempt.admittedRunContext.operationalRunInstance !== operationalRunInstance || boundGatewayContext && callerIdentity?.gatewayContextResolver?.() === void 0) throw inactiveError("agent harness retained host policy is no longer active");
			recovery.assertActive();
		};
		return Object.freeze({
			assertActive: assertRecoveryActive,
			release: recovery.release,
			runBeforeToolCall: async (request) => await runBeforeToolCallWithAssertion(assertRecoveryActive, request)
		});
	});
	const trajectoryRecorder = attempt.trajectoryRecorder;
	const scheduledToolSources = /* @__PURE__ */ new WeakMap();
	const bindTools = (tools, options, observeResult) => {
		assertActive();
		const boundAbortSignal = attempt.abortSignal ? AbortSignal.any([attempt.abortSignal, capabilityAbortController.signal]) : capabilityAbortController.signal;
		const bindingCwd = options?.cwd !== void 0 ? normalizeNativeOperationCwd(options.cwd, hookContext.cwd) : void 0;
		const bindingHookContext = bindingCwd ? Object.freeze({
			...hookContext,
			cwd: bindingCwd
		}) : hookContext;
		return tools.map((tool) => bindAgentToolSourceExecutionGuard(tool, assertActive)).map((tool) => rewrapToolWithBeforeToolCallHook(tool, bindingHookContext)).map((tool) => callerIdentity ? wrapToolWithGatewayCallerIdentity(tool, callerIdentity) : tool).map((tool) => wrapToolWithAbortSignal(tool, boundAbortSignal)).map((tool) => gateBoundTool(tool, assertActive, observeResult));
	};
	const bindToolSurface = (tools, options) => bindTools(tools, options, () => {});
	const bindModelExecution = nativeModelPolicySupported ? (model) => bindHarnessModelExecution(attempt.admittedRunContext, model, assertActive) : void 0;
	const capabilities = Object.freeze({
		kind: "agent-harness-host-capability",
		version: 1,
		assertActive,
		...bindModelExecution ? { bindModelExecution } : {},
		retainSourceAuthority: () => retainHarnessSource(attempt.admittedRunContext, assertActive, nativeModelPolicySupported),
		reportOutputTokens: (outputTokens) => {
			assertActive();
			const data = emitAgentRunOutputTokens({
				runId,
				lifecycleGeneration,
				sessionKey,
				outputTokens
			});
			if (data && onAgentEvent) runBestEffortCallback({
				label: "usage agent event",
				log: log$1,
				callback: () => onAgentEvent({
					stream: "usage",
					data
				})
			});
		},
		...annotateCurrentUserTurn ? { annotateCurrentUserTurn } : {},
		...media.capabilities,
		...trajectoryRecorder ? { trajectory: bindHarnessTrajectory(trajectoryRecorder, assertActive) } : {},
		preparedEnvironment: () => {
			assertActive();
			return preparedRunEnvironment;
		},
		activeComputerContext: () => {
			assertActive();
			return buildActiveNodeContextText(requesterProfileId);
		},
		bindToolSurface,
		createToolSurface: (options, bindingOptions) => {
			assertActive();
			const tools = bindTools(withAgentQuestionAnswerAuthority(resolveAgentQuestionAnswerAuthority(capabilities), () => withInstallationTarget(installationTarget, () => createOpenClawCodingToolsInternal({
				...options,
				githubPublicationAvailable,
				runtimePluginToolGrant,
				skillsSnapshot: options?.skillsSnapshot ?? skillsSnapshot,
				skillUsagePaths: options?.skillUsagePaths ?? skillUsagePaths,
				operationalRunInstance
			}, !hostSandboxEnabled && !options?.sandbox?.enabled && options?.includeCoreTools !== false && options?.toolConstructionPlan?.includeBaseCodingTools !== false ? resolveSkillResourceCandidates(skillsSnapshot) : void 0))), bindingOptions, observeCoreTtsToolResult);
			for (const tool of tools) if (tool.name === "exec" || tool.name === "process") scheduledToolSources.set(tool, Object.freeze({
				targetTool: tool.name,
				execute: tool.execute
			}));
			return tools;
		},
		prepareMutableFileApproval: async (request) => {
			assertActive();
			const prepared = await prepareSystemRunMutableFileApproval(request);
			assertActive();
			if (!prepared.ok) return prepared;
			return Object.freeze({
				ok: true,
				requiresOneShot: prepared.requiresOneShot,
				revalidate: async () => {
					assertActive();
					const current = await prepared.revalidate();
					assertActive();
					return current;
				}
			});
		},
		runBeforeToolCall,
		requestApproval: async (request) => {
			assertActive();
			request.signal?.throwIfAborted();
			const releaseMcpBinding = request.mcpTool && request.toolCallId && request.isMcpToolApprovalActive && attempt.agentId ? registerMcpToolApprovalBinding({
				authority: delegatedAuthority,
				agentId: attempt.agentId,
				toolCallId: request.toolCallId,
				...request.mcpTool,
				isActive: () => {
					assertActive();
					return !request.signal?.aborted && request.isMcpToolApprovalActive();
				}
			}) : void 0;
			try {
				const result = await withCaller(async () => await withGatewayToolApprovalOwner(params.pluginId, async () => await callGatewayTool("plugin.approval.request", { timeoutMs: request.transportTimeoutMs ?? request.timeoutMs }, {
					...formatHarnessApprovalPresentation(request),
					...request.detail !== void 0 ? { detail: request.detail } : {},
					severity: request.severity,
					toolName: request.toolName,
					toolCallId: request.toolCallId,
					...request.mcpTool ? { mcpTool: request.mcpTool } : {},
					timeoutMs: request.timeoutMs,
					twoPhase: true,
					...request.allowedDecisions ? { allowedDecisions: request.allowedDecisions } : {}
				}, {
					expectFinal: false,
					requireAgentRuntimeIdentity: true,
					signal: request.signal
				})), request.signal);
				assertActive();
				request.signal?.throwIfAborted();
				return result;
			} finally {
				releaseMcpBinding?.();
			}
		},
		waitForApproval: async (request) => {
			assertActive();
			const result = await withCaller(async () => await callGatewayTool("plugin.approval.waitDecision", { timeoutMs: request.transportTimeoutMs ?? request.timeoutMs }, { id: request.approvalId }, { signal: request.signal }), request.signal);
			assertActive();
			if (result?.id !== request.approvalId) return;
			return {
				decision: result.decision,
				terminalReason: result.terminalReason
			};
		}
	});
	registerAgentHarnessScheduledToolProjectionCapability({
		hostCapabilities: capabilities,
		ownerPluginId: params.pluginId,
		create: (sourceTool, projection) => {
			assertActive();
			const source = scheduledToolSources.get(sourceTool);
			if (!source || sourceTool.name !== source.targetTool || sourceTool.execute !== source.execute) throw new Error("scheduled tool projection source was not created by this host capability");
			return createCronScheduledToolProjection(sourceTool, assertActive, source.targetTool, projection);
		}
	});
	registerAgentHarnessTtsProvenanceTransferCapability({
		hostCapabilities: capabilities,
		ownerPluginId: params.pluginId,
		transfer: (toolResult, attemptResult, eligibleMediaUrls) => {
			assertActive();
			if (typeof toolResult !== "object" || toolResult === null || !coreTtsToolResults.has(toolResult)) return attemptResult;
			return transferCoreTtsToolResultProvenance(toolResult, attemptResult, eligibleMediaUrls, operationalRunInstance);
		}
	});
	return {
		capabilities,
		setInputAttachmentReadAllowed: media.setInputAttachmentReadAllowed,
		runWithScope: (run) => {
			const nodeAuthorities = createSessionNodeAuthorities(attempt, params.pluginId, requiredNodeCommands, assertActive, attempt.abortSignal ? AbortSignal.any([attempt.abortSignal, capabilityAbortController.signal]) : capabilityAbortController.signal);
			return withPluginRuntimeGatewayRequestScope({
				isWebchatConnect: () => false,
				...getPluginRuntimeGatewayRequestScope(),
				...nodeAuthorities
			}, run);
		},
		close: () => {
			if (!active) return;
			active = false;
			capabilityAbortController.abort();
		}
	};
}
//#endregion
//#region src/agents/harness/result-classification.ts
/** Applies a harness classifier while replacing any stale prior classification. */
function applyAgentHarnessResultClassification(harness, result, params) {
	if (!harness.classify) return {
		...result,
		agentHarnessId: harness.id
	};
	const { agentHarnessResultClassification: _previousClassification, ...resultWithoutPrevious } = result;
	const classification = harness.classify(resultWithoutPrevious, params);
	if (!classification || classification === "ok") return {
		...resultWithoutPrevious,
		agentHarnessId: harness.id
	};
	return {
		...resultWithoutPrevious,
		agentHarnessId: harness.id,
		agentHarnessResultClassification: classification
	};
}
//#endregion
//#region src/agents/harness/lifecycle.ts
function assertAgentHarnessContextEngineSupport(harness, params) {
	if (!params.contextEngine || params.contextEngine.info.id === "legacy") return;
	assertContextEngineHostSupport({
		contextEngine: params.contextEngine,
		operation: "agent-run",
		host: {
			id: `agent-harness:${harness.id}`,
			label: `agent harness "${harness.id}"`,
			capabilities: harness.contextEngineHostCapabilities ?? []
		}
	});
}
function agentHarnessDiagnosticBase(harness, params, trace) {
	const diagnosticTrace = trace ?? getActiveDiagnosticTraceContext();
	const channel = params.messageChannel ?? params.messageProvider;
	return {
		runId: params.runId,
		sessionId: params.sessionId,
		...params.agentId ? { agentId: params.agentId } : {},
		provider: params.provider,
		model: params.modelId,
		harnessId: harness.id,
		...harness.pluginId ? { pluginId: harness.pluginId } : {},
		...params.sessionKey ? { sessionKey: params.sessionKey } : {},
		...params.trigger ? { trigger: params.trigger } : {},
		...channel ? { channel } : {},
		...diagnosticTrace ? { trace: freezeDiagnosticTraceContext(diagnosticTrace) } : {}
	};
}
function normalizeAgentHarnessAttemptResult(result) {
	const { aborted, externalAbort, idleTimedOut, promptError, promptErrorSource, timedOut, timedOutByRunBudget, timedOutDuringCompaction, timedOutDuringToolExecution, ...canonical } = result;
	const currentAttemptProvenance = Object.hasOwn(result, "currentAttemptAssistant") ? { currentAttemptAssistant: result.currentAttemptAssistant } : result.lastAssistant ? { currentAttemptAssistant: result.lastAssistant } : {};
	const canonicalWithAttemptProvenance = {
		...canonical,
		...currentAttemptProvenance
	};
	if ("terminal" in canonicalWithAttemptProvenance) return canonicalWithAttemptProvenance;
	const terminal = normalizeAgentRunAttemptTerminal({
		aborted,
		externalAbort,
		idleTimedOut,
		promptError,
		promptErrorSource,
		timedOut,
		timedOutByRunBudget,
		timedOutDuringCompaction,
		timedOutDuringToolExecution
	});
	return {
		...canonicalWithAttemptProvenance,
		terminal
	};
}
function agentHarnessRunOutcome(result) {
	const terminal = projectAgentRunAttemptTerminal(result.terminal);
	if (terminal.timedOut) return "timed_out";
	if (terminal.externalAbort || terminal.aborted) return "aborted";
	if (terminal.promptErrorSource !== null) return "error";
	return "completed";
}
function shouldEmitAgentRunDiagnostics(harness) {
	return harness.id !== "openclaw";
}
function agentRunDiagnosticBase(params, trace) {
	const channel = params.messageChannel ?? params.messageProvider;
	return {
		runId: params.runId,
		...params.sessionKey ? { sessionKey: params.sessionKey } : {},
		...params.sessionId ? { sessionId: params.sessionId } : {},
		...params.agentId ? { agentId: params.agentId } : {},
		provider: params.provider,
		model: params.modelId,
		...params.trigger ? { trigger: params.trigger } : {},
		...channel ? { channel } : {},
		trace
	};
}
function agentRunCompletion(result) {
	const terminal = projectAgentRunAttemptTerminal(result.terminal);
	if (terminal.timedOut || terminal.externalAbort || terminal.aborted) return { outcome: "aborted" };
	if (terminal.promptErrorSource === "hook:before_agent_run") return {
		outcome: "blocked",
		blockedBy: "before_agent_run"
	};
	if (terminal.promptErrorSource !== null) return {
		outcome: "error",
		error: terminal.promptError
	};
	return { outcome: "completed" };
}
function withFallbackDiagnosticTrace(result, trace) {
	if (result.diagnosticTrace || !trace) return result;
	return copyCoreTtsAttemptResultProvenance(result, {
		...result,
		diagnosticTrace: freezeDiagnosticTraceContext(trace)
	});
}
function emitAgentHarnessRunStarted(harness, params, trace) {
	emitTrustedDiagnosticEvent({
		type: "harness.run.started",
		...agentHarnessDiagnosticBase(harness, params, trace)
	});
}
function emitAgentHarnessRunCompleted(params) {
	const { harness, attemptParams, result, startedAt, trace } = params;
	const outcome = agentHarnessRunOutcome(result);
	const terminal = projectAgentRunAttemptTerminal(result.terminal);
	const errorMessage = outcome === "error" ? diagnosticErrorMessage(terminal.promptError) : void 0;
	emitTrustedDiagnosticEventWithPrivateData({
		type: "harness.run.completed",
		...agentHarnessDiagnosticBase(harness, attemptParams, trace ?? result.diagnosticTrace),
		durationMs: Date.now() - startedAt,
		outcome,
		...result.agentHarnessResultClassification ? { resultClassification: result.agentHarnessResultClassification } : {},
		...typeof result.yieldDetected === "boolean" ? { yieldDetected: result.yieldDetected } : {},
		itemLifecycle: { ...result.itemLifecycle }
	}, errorMessage ? { errorMessage } : void 0);
}
function emitAgentHarnessRunError(params) {
	const { harness, attemptParams, startedAt, phase, error, trace } = params;
	const errorMessage = diagnosticErrorMessage(error);
	emitTrustedDiagnosticEventWithPrivateData({
		type: "harness.run.error",
		...agentHarnessDiagnosticBase(harness, attemptParams, trace),
		durationMs: Date.now() - startedAt,
		phase,
		errorCategory: diagnosticErrorCategory(error)
	}, errorMessage ? { errorMessage } : void 0);
}
/** Runs one harness attempt with diagnostics, tracing, and result classification. */
async function runAgentHarnessLifecycleAttempt(harness, params, execute = (attemptParams) => harness.runAttempt(attemptParams)) {
	let result;
	let phase = "prepare";
	const startedAt = Date.now();
	const activeHarnessTrace = getActiveDiagnosticTraceContext();
	let agentRunTrace;
	let agentRunStartedAt = 0;
	let agentRunCompleted = false;
	const emitAgentRunCompleted = (completion) => {
		if (!agentRunTrace || agentRunCompleted) return;
		agentRunCompleted = true;
		const failed = completion.outcome === "error" && completion.error != null;
		const errorMessage = failed ? diagnosticErrorMessage(completion.error) : void 0;
		emitTrustedDiagnosticEventWithPrivateData({
			type: "run.completed",
			...agentRunDiagnosticBase(params, agentRunTrace),
			durationMs: Date.now() - agentRunStartedAt,
			outcome: completion.outcome,
			...completion.blockedBy ? { blockedBy: completion.blockedBy } : {},
			...failed ? { errorCategory: diagnosticErrorCategory(completion.error) } : {}
		}, errorMessage ? { errorMessage } : void 0);
	};
	emitAgentHarnessRunStarted(harness, params, activeHarnessTrace);
	const unsubscribeCommentary = subscribeAgentCommentaryDiagnostics(params.config, agentHarnessDiagnosticBase(harness, params, activeHarnessTrace));
	try {
		phase = "prepare";
		assertAgentHarnessContextEngineSupport(harness, params);
		if (shouldEmitAgentRunDiagnostics(harness) && activeHarnessTrace) {
			agentRunTrace = freezeDiagnosticTraceContext(createChildDiagnosticTraceContext(activeHarnessTrace));
			agentRunStartedAt = Date.now();
			emitTrustedDiagnosticEvent({
				type: "run.started",
				...agentRunDiagnosticBase(params, agentRunTrace)
			});
		}
		const runAndClassify = async () => {
			phase = "send";
			const rawResult = await execute(params);
			phase = "resolve";
			return copyCoreTtsAttemptResultProvenance(rawResult, normalizeAgentHarnessAttemptResult(applyAgentHarnessResultClassification(harness, rawResult, params)));
		};
		result = agentRunTrace ? await runWithDiagnosticTraceContext(agentRunTrace, runAndClassify) : await runAndClassify();
		result = withFallbackDiagnosticTrace(result, activeHarnessTrace);
	} catch (error) {
		recordAgentHarnessPreflightOwner(error, harness.id);
		emitAgentHarnessRunError({
			harness,
			attemptParams: params,
			startedAt,
			phase,
			error,
			trace: activeHarnessTrace
		});
		emitAgentRunCompleted({
			outcome: "error",
			error
		});
		throw error;
	} finally {
		unsubscribeCommentary();
	}
	emitAgentRunCompleted(agentRunCompletion(result));
	emitAgentHarnessRunCompleted({
		harness,
		attemptParams: params,
		result,
		startedAt,
		trace: activeHarnessTrace
	});
	return result;
}
/** Runs one isolated finalization with diagnostics and its narrow result validator. */
async function runAgentHarnessLifecycleFinalization(harness, params, execute) {
	let phase = "prepare";
	const startedAt = Date.now();
	const activeHarnessTrace = getActiveDiagnosticTraceContext();
	const agentRunTrace = shouldEmitAgentRunDiagnostics(harness) && activeHarnessTrace ? freezeDiagnosticTraceContext(createChildDiagnosticTraceContext(activeHarnessTrace)) : void 0;
	emitAgentHarnessRunStarted(harness, params, activeHarnessTrace);
	const unsubscribeCommentary = subscribeAgentCommentaryDiagnostics(params.config, agentHarnessDiagnosticBase(harness, params, activeHarnessTrace));
	if (agentRunTrace) emitTrustedDiagnosticEvent({
		type: "run.started",
		...agentRunDiagnosticBase(params, agentRunTrace)
	});
	try {
		const runAndValidate = async () => {
			phase = "send";
			try {
				const rawResult = await execute();
				phase = "resolve";
				return {
					outcome: "answered",
					result: assertSettledTurnFinalizationResult(rawResult)
				};
			} catch (error) {
				if (error instanceof EmptySettledTurnFinalizationError) return {
					outcome: "empty",
					result: error.result
				};
				throw error;
			}
		};
		const rawResult = agentRunTrace ? await runWithDiagnosticTraceContext(agentRunTrace, runAndValidate) : await runAndValidate();
		const result = {
			...rawResult,
			result: rawResult.result.diagnosticTrace || !activeHarnessTrace ? rawResult.result : {
				...rawResult.result,
				diagnosticTrace: freezeDiagnosticTraceContext(activeHarnessTrace)
			}
		};
		if (agentRunTrace) emitTrustedDiagnosticEvent({
			type: "run.completed",
			...agentRunDiagnosticBase(params, agentRunTrace),
			durationMs: Date.now() - startedAt,
			outcome: "completed"
		});
		emitTrustedDiagnosticEvent({
			type: "harness.run.completed",
			...agentHarnessDiagnosticBase(harness, params, result.result.diagnosticTrace ?? activeHarnessTrace),
			durationMs: Date.now() - startedAt,
			outcome: "completed",
			itemLifecycle: {
				startedCount: 0,
				completedCount: 0,
				activeCount: 0
			}
		});
		return result;
	} catch (error) {
		emitAgentHarnessRunError({
			harness,
			attemptParams: params,
			startedAt,
			phase,
			error,
			trace: activeHarnessTrace
		});
		if (agentRunTrace) {
			const errorMessage = diagnosticErrorMessage(error);
			emitTrustedDiagnosticEventWithPrivateData({
				type: "run.completed",
				...agentRunDiagnosticBase(params, agentRunTrace),
				durationMs: Date.now() - startedAt,
				outcome: "error",
				errorCategory: diagnosticErrorCategory(error)
			}, errorMessage ? { errorMessage } : void 0);
		}
		throw error;
	} finally {
		unsubscribeCommentary();
	}
}
//#endregion
//#region src/agents/harness/selection.ts
/**
* Selects and invokes native agent harnesses for embedded run attempts.
*/
const log = createSubsystemLogger("agents/harness");
function selectAgentHarness(params) {
	return selectAgentHarnessDecision(params).harness;
}
/** Selects one harness that can preserve every prepared route/auth retry candidate. */
function selectAgentHarnessForPreparedModelProviders(params) {
	const { modelProviders, ...selectionParams } = params;
	if (modelProviders.length === 0) return selectAgentHarness(selectionParams);
	const decisions = modelProviders.map((modelProvider) => selectAgentHarnessDecision({
		...selectionParams,
		modelProvider,
		preparedModelProvider: true
	}));
	const first = decisions[0];
	if (!first || decisions.every((decision) => decision.selectedHarnessId === first.selectedHarnessId)) return first?.harness ?? selectAgentHarness(selectionParams);
	return decisions.find((decision) => decision.selectedHarnessId === "openclaw")?.harness ?? createOpenClawAgentHarness();
}
function selectAgentHarnessDecision(params) {
	const selection = resolveAgentHarnessSelectionDecision(params);
	return {
		...selection,
		harness: selection.builtIn ? createOpenClawAgentHarness() : selection.harness
	};
}
/** Runs the selected harness's fail-closed settled-turn finalization operation. */
async function runAgentHarnessSettledTurnFinalization(params, settledAttempt, harness) {
	const internalParams = params;
	const finalizeSettledTurn = harness.finalizeSettledTurn?.bind(harness);
	if (!finalizeSettledTurn) throw new Error(`Agent harness ${harness.id} cannot safely finalize a settled tool turn.`);
	if (internalParams.systemAgentTool && !isSystemAgentOnlyAllowlist(internalParams.toolsAllow)) throw new Error("OpenClaw host authority requires toolsAllow: [\"openclaw\"]");
	const builtIn = isBuiltInOpenClawAgentHarness(harness);
	const operatorAuthority = assertHarnessModelPolicySupport(harness, params);
	const modelExecution = builtIn ? void 0 : bindOperatorModelExecution(operatorAuthority, harness.nativeModelPolicySupport === "exact" ? settledAttempt.runtimeModelSelection ?? {
		provider: params.provider,
		model: params.modelId
	} : void 0);
	try {
		modelExecution?.assertCurrent();
		const attemptParams = prepareHarnessFinalizationParams({
			...internalParams,
			operation: "settled-tool-finalization",
			abortSignal: modelExecution ? params.abortSignal ? AbortSignal.any([params.abortSignal, modelExecution.signal]) : modelExecution.signal : params.abortSignal
		}, builtIn);
		const result = await runAgentHarnessOperation(harness, params, () => runWithAgentRingZeroTools([], () => runAgentHarnessLifecycleFinalization(harness, attemptParams, () => {
			assertHarnessModelPolicySupport(harness, params);
			modelExecution?.assertCurrent();
			return finalizeSettledTurn({
				attempt: attemptParams,
				settledAttempt
			});
		})));
		modelExecution?.assertCurrent();
		return result;
	} finally {
		modelExecution?.release();
	}
}
async function runAgentHarnessAttempt(params, nativeSessionRuntime) {
	let internalParams = params;
	if (nativeSessionRuntime) await nativeSessionRuntime.assertCurrent();
	else assertOperatorModelAllowed(readRunOperatorAuthority(params), {
		provider: params.provider,
		model: params.modelId
	});
	const selection = nativeSessionRuntime?.auth === "native" ? buildSelectionDecision({
		harness: nativeSessionRuntime.harness,
		policy: {
			runtime: nativeSessionRuntime.harness.id,
			runtimeSource: "model"
		},
		selectedReason: "forced_plugin",
		candidates: []
	}) : selectPreparedAgentHarness(params);
	const harness = selection.harness;
	const nativeOwnsModel = nativeSessionRuntime?.auth === "native";
	const nativeModelPolicySupported = harness.nativeModelPolicySupport === "exact";
	assertHarnessModelPolicySupport(harness, params);
	const runPreparedAttempt = async (prepared) => {
		if (nativeSessionRuntime) await nativeSessionRuntime.assertCurrent();
		else assertOperatorModelAllowed(readRunOperatorAuthority(params), {
			provider: params.provider,
			model: params.modelId
		});
		const operatorAuthority = assertHarnessModelPolicySupport(harness, params);
		const modelExecution = selection.builtIn || nativeOwnsModel && nativeModelPolicySupported ? void 0 : bindOperatorModelExecution(operatorAuthority, !nativeModelPolicySupported ? void 0 : nativeSessionRuntime ? nativeSessionRuntime.modelRef : {
			provider: params.provider,
			model: params.modelId
		});
		try {
			modelExecution?.assertCurrent();
			const result = await runAgentHarnessLifecycleAttempt(harness, modelExecution ? {
				...prepared,
				abortSignal: prepared.abortSignal ? AbortSignal.any([prepared.abortSignal, modelExecution.signal]) : modelExecution.signal
			} : prepared);
			await nativeSessionRuntime?.assertCurrent();
			modelExecution?.assertCurrent();
			return result;
		} finally {
			modelExecution?.release();
		}
	};
	assertAgentHarnessExecutionEnvironment(harness, params);
	if (nativeSessionRuntime && harness !== nativeSessionRuntime.harness) throw new AgentHarnessPreflightError("Native session runtime changed before dispatch. Reattach the original native session before retrying.");
	if (internalParams.contextEngineLogicalTurnLease) {
		selectContextEngineForTranscriptHost({
			lease: internalParams.contextEngineLogicalTurnLease,
			host: {
				id: `agent-harness:${harness.id}`,
				label: `agent harness "${harness.id}"`,
				capabilities: harness.contextEngineHostCapabilities ?? []
			},
			operation: "agent-run",
			recorder: internalParams.userTurnTranscriptRecorder
		});
		await drainPendingContextEngineTurnsBeforeRun({
			admission: internalParams.userTurnTranscriptRecorder?.getAdmissionReceipt(),
			isHeartbeat: isHeartbeatLifecycleRunKind(internalParams.bootstrapContextRunKind),
			lease: internalParams.contextEngineLogicalTurnLease,
			recorder: internalParams.userTurnTranscriptRecorder,
			sessionTarget: internalParams.sessionTarget
		});
		const effective = internalParams.contextEngineLogicalTurnLease.begin();
		internalParams = {
			...internalParams,
			contextEngine: effective.engine.info.id === "legacy" ? void 0 : effective.engine
		};
	}
	if (internalParams.systemAgentTool && !isSystemAgentOnlyAllowlist(internalParams.toolsAllow)) throw new Error("OpenClaw host authority requires toolsAllow: [\"openclaw\"]");
	const ringZeroTools = internalParams.systemAgentTool ? [(await import("./system-agent-tool-BFRjKjej.mjs")).createSystemAgentTool(internalParams.systemAgentTool)] : [];
	if (!selection.builtIn && !internalParams.suppressNextUserMessagePersistence && internalParams.userTurnTranscriptRecorder) {
		const assertCurrent = resolveAdmittedRunActiveAssertion(internalParams.admittedRunContext, internalParams.abortSignal);
		if (!assertCurrent) throw new Error("agent harness requires active admitted run authority");
		assertCurrent();
		await internalParams.userTurnTranscriptRecorder.persistApproved({ cwd: internalParams.cwd ?? internalParams.workspaceDir });
		assertCurrent();
	}
	if (nativeSessionRuntime) await nativeSessionRuntime.assertCurrent();
	const pluginAttempt = withoutInternalHarnessAuthority(withoutHarnessSetupAuthority(internalParams), harness, selection.builtIn, selection.ownerPluginId);
	logAgentHarnessSelection(selection, {
		provider: params.provider,
		modelId: params.modelId,
		sessionKey: params.sessionKey,
		agentId: params.agentId
	});
	let result;
	try {
		result = await runAgentHarnessOperation(harness, params, () => runWithAgentRingZeroTools(ringZeroTools, () => {
			const hostOpenClawAuthority = isHostScopedAgentToolActive("openclaw") && isSystemAgentOnlyAllowlist(pluginAttempt.params.toolsAllow);
			const nativePermissionsConsented = assertAgentHarnessExecutionEnvironment(harness, params);
			const preparedParams = selection.builtIn ? pluginAttempt.params : preparePluginHarnessParams(pluginAttempt.params, harness, nativePermissionsConsented, pluginAttempt.setInputAttachmentReadAllowed);
			const effectiveAttemptParams = hostOpenClawAuthority && preparedParams.pluginHarnessToolPolicyRestricted ? {
				...preparedParams,
				pluginHarnessToolPolicyRestricted: false
			} : preparedParams;
			assertPluginHarnessConversationToolPolicySupport(harness, effectiveAttemptParams.pluginHarnessToolPolicyRestricted === true && !nativePermissionsConsented);
			return import("./tool-authority.runtime.js").then(({ withPreparedEmbeddedRunToolAuthority }) => withPreparedEmbeddedRunToolAuthority(internalParams, effectiveAttemptParams, selection.builtIn ? void 0 : (input) => {
				const policies = resolvePluginHarnessToolPolicies({
					...input.run,
					modelId: input.run.model,
					sandboxSessionKey: input.run.runtimePolicySessionKey,
					messageChannel: input.originatingChannel,
					toolsAllow: input.toolsAllow,
					disableTools: input.disableTools
				});
				return resolvePluginHarnessDenyAllToolPolicyPrompt(policies) ? {
					...input,
					toolsAllow: []
				} : input;
			}, (prepared) => pluginAttempt.runWithHostScope(async () => {
				if (prepared.trigger !== "user" || !prepared.sessionKey) return runPreparedAttempt(prepared);
				const note = await claimHeartbeatContextForUserRun({
					...prepared,
					agentId: resolveSessionAgentIds(prepared).sessionAgentId,
					storePath: prepared.sessionTarget?.storePath,
					detached: prepared.sessionPersistence === "detached",
					assertCurrent: resolveAdmittedRunActiveAssertion(internalParams.admittedRunContext, prepared.abortSignal)
				});
				if (!note) return runPreparedAttempt(prepared);
				return runPreparedAttempt({
					...prepared,
					currentInboundContext: appendCurrentInboundContext(prepared.currentInboundContext, [{
						kind: "heartbeat-outcome",
						text: note
					}])
				});
			})));
		}));
	} finally {
		pluginAttempt.closeHostCapabilities();
	}
	const admission = internalParams.userTurnTranscriptRecorder?.getAdmissionReceipt();
	if (internalParams.onContextEngineTurnCandidate && admission && result.contextEngineTerminalAnchor) internalParams.onContextEngineTurnCandidate({
		boundary: {
			admission,
			terminal: result.contextEngineTerminalAnchor
		},
		sessionIdUsed: result.sessionIdUsed,
		sessionKey: internalParams.sessionKey,
		sessionTarget: internalParams.sessionTarget,
		promptError: result.terminal.kind === "failed",
		aborted: result.terminal.kind === "aborted" || result.terminal.kind === "timeout" && "aborted" in result.terminal && result.terminal.aborted === true,
		yieldAborted: result.terminal.kind === "aborted" && result.terminal.source === "yield_cleanup",
		isHeartbeat: isHeartbeatLifecycleRunKind(internalParams.bootstrapContextRunKind),
		runtimeContext: nativeSessionRuntime && result.runtimeModelSelection ? {
			provider: result.runtimeModelSelection.provider,
			modelId: result.runtimeModelSelection.model
		} : {
			provider: internalParams.provider,
			modelId: internalParams.modelId,
			modelContextWindow: internalParams.modelContextWindow,
			tokenBudget: internalParams.contextTokenBudget
		}
	});
	const { contextEngineTerminalAnchor: _contextEngineTerminalAnchor, ...publicResult } = result;
	return copyCoreTtsAttemptResultProvenance(result, publicResult);
}
function assertHarnessModelPolicySupport(harness, params) {
	const authority = readRunOperatorAuthority(params);
	authority?.assertCurrent();
	if (!isBuiltInOpenClawAgentHarness(harness) && authority?.modelPolicy && harness.nativeModelPolicySupport !== "exact") throw new AgentHarnessPreflightError(`Agent harness ${harness.id} cannot enforce your operator role's model policy. Choose a compatible runtime or ask a gateway administrator to update the harness.`);
	return authority;
}
function selectPreparedAgentHarness(params) {
	return selectAgentHarnessDecision({
		provider: params.provider,
		modelId: params.modelId,
		modelProvider: {
			api: params.model.api,
			baseUrl: params.model.baseUrl,
			...resolveAgentHarnessPreparedRouteSupport(params.runtimePlan?.auth),
			preparedAuth: resolveAgentHarnessPreparedAuthSupport({ plan: params.runtimePlan?.auth })
		},
		config: params.config,
		agentId: params.agentId,
		sessionKey: params.sessionKey,
		agentHarnessId: params.agentHarnessId,
		agentHarnessRuntimeOverride: params.agentHarnessRuntimeOverride,
		preparedModelProvider: params.runtimePlan?.auth !== void 0
	});
}
async function runAgentHarnessOperation(harness, params, execute) {
	await prepareActiveNodeContext(readRunOperatorAuthority(params)?.profileId);
	resolveAdmittedRunActiveAssertion(params.admittedRunContext, params.abortSignal)?.();
	const activeTrace = getActiveDiagnosticTraceContext();
	const harnessTrace = freezeDiagnosticTraceContext(activeTrace ? createChildDiagnosticTraceContext(activeTrace) : createDiagnosticTraceContext());
	if (isBuiltInOpenClawAgentHarness(harness)) return await runWithDiagnosticTraceContext(harnessTrace, execute);
	try {
		return await runWithDiagnosticTraceContext(harnessTrace, execute);
	} catch (error) {
		log.warn(`${harness.label} failed; not falling back to embedded OpenClaw backend`, {
			harnessId: harness.id,
			provider: params.provider,
			modelId: params.modelId,
			error: formatErrorMessage(error)
		});
		throw error;
	}
}
function isSystemAgentOnlyAllowlist(toolsAllow) {
	return toolsAllow?.length === 1 && normalizeToolPolicyName(toolsAllow[0] ?? "") === "openclaw";
}
function withoutHarnessSetupAuthority(params) {
	const { contextEngineLogicalTurnLease: _contextEngineLogicalTurnLease, systemAgentTool: _systemAgentTool, ...attemptParams } = params;
	return attemptParams;
}
function withoutInternalHarnessAuthority(params, harness, builtIn, ownerPluginId) {
	if (builtIn) return {
		params: {
			...params,
			operationalRunInstance: params.admittedRunContext.operationalRunInstance
		},
		closeHostCapabilities: () => {},
		setInputAttachmentReadAllowed: () => {},
		runWithHostScope: (run) => run()
	};
	const pluginParams = withoutPluginHarnessPrivateState(params);
	const host = createAgentHarnessHostCapabilities({
		attempt: params,
		requiredNodeCommands: harness.cloudPlacement?.devicePlacement?.requiredNodeCommands,
		nativeModelPolicySupport: harness.nativeModelPolicySupport,
		pluginId: ownerPluginId ?? (() => {
			throw new Error(`Agent harness ${harness.id} has no authoritative registry owner.`);
		})()
	});
	return {
		params: {
			...pluginParams,
			hostCapabilities: host.capabilities
		},
		closeHostCapabilities: host.close,
		setInputAttachmentReadAllowed: host.setInputAttachmentReadAllowed,
		runWithHostScope: host.runWithScope
	};
}
function prepareHarnessFinalizationParams(params, builtIn) {
	const { hostCapabilities: _hostCapabilities, systemAgentTool: _systemAgentTool, ...withoutCapabilities } = params;
	if (builtIn) return withoutCapabilities;
	const pluginParams = withoutPluginHarnessPrivateState(withoutCapabilities);
	const boundary = "plugin harness finalization handoff";
	return {
		...pluginParams,
		model: unwrapModelHeaderSentinelsForProviderEgress(pluginParams.model, boundary),
		resolvedApiKey: pluginParams.resolvedApiKey ? unwrapSecretSentinelsForProviderEgress(pluginParams.resolvedApiKey, boundary) : pluginParams.resolvedApiKey
	};
}
function withoutPluginHarnessPrivateState(params) {
	const { admittedRunContext: _admittedRunContext, runtimePluginToolGrant: _runtimePluginToolGrant, assistantErrorTranscript: _assistantErrorTranscript, compactionCountOwner: _compactionCountOwner, completionCheck: _completionCheck, onContextAccountingEvent: _onContextAccountingEvent, onCompactionRequestBudget: _onCompactionRequestBudget, contextEngineLogicalTurnLease: _contextEngineLogicalTurnLease, hostCapabilities: _hostCapabilities, onContextEngineTurnCandidate: _onContextEngineTurnCandidate, trajectoryRecorder: _trajectoryRecorder, inputAttachmentMedia: _inputAttachmentMedia, __openclawSourceReplyDeliveryRuntime: _sourceReplyDeliveryRuntime, ...pluginParams } = params;
	return pluginParams;
}
function preparePluginHarnessParams(params, harness, nativePermissionsConsented, setInputAttachmentReadAllowed) {
	const boundary = "plugin harness handoff";
	const resolvedApiKey = params.resolvedApiKey ? unwrapSecretSentinelsForProviderEgress(params.resolvedApiKey, boundary) : params.resolvedApiKey;
	const model = unwrapModelHeaderSentinelsForProviderEgress(params.model, boundary);
	const preparedParams = model === params.model && resolvedApiKey === params.resolvedApiKey ? params : {
		...params,
		model,
		resolvedApiKey
	};
	const policies = resolvePluginHarnessToolPolicies(preparedParams, harness.conversationToolPolicySupport === "exact" ? harness.conversationToolPolicySafeDenyTools : void 0, harness.conversationToolPolicyNativeTools);
	const policyParams = {
		...preparedParams,
		pluginHarnessToolPolicySafeDeniedTools: policies.safeDeniedToolNames.length > 0 ? policies.safeDeniedToolNames : void 0,
		pluginHarnessToolPolicyRestricted: policies.toolPolicyRestricted
	};
	const effectiveParams = nativePermissionsConsented ? policyParams : applyPluginHarnessDenyAllToolPolicy(policyParams, policies);
	setInputAttachmentReadAllowed(isRuntimeToolAllowed("read", effectiveParams.toolsAllow) && isRuntimeToolAllowed("read", effectiveParams.toolExecutionAllow) && isToolAllowedByPolicies("read", [
		policies.senderPolicy,
		policies.groupPolicy,
		...policies.runtimePolicies
	]));
	return effectiveParams;
}
function applyPluginHarnessDenyAllToolPolicy(params, policies) {
	if (isHostScopedAgentToolActive("openclaw") && isSystemAgentOnlyAllowlist(params.toolsAllow)) return params;
	const prompt = resolvePluginHarnessDenyAllToolPolicyPrompt(policies);
	if (!prompt) return params;
	return {
		...params,
		toolsAllow: [],
		extraSystemPrompt: appendPluginHarnessToolPolicyPrompt(params.extraSystemPrompt, prompt)
	};
}
function appendPluginHarnessToolPolicyPrompt(existing, prompt) {
	const trimmed = existing?.trim();
	if (!trimmed) return prompt;
	return trimmed.includes(prompt) ? trimmed : `${trimmed}\n\n${prompt}`;
}
function buildSelectionDecision(params) {
	return {
		...buildAgentHarnessSelectionDecision({
			...params,
			harness: isBuiltInOpenClawAgentHarness(params.harness) ? void 0 : params.harness
		}),
		harness: params.harness
	};
}
function logAgentHarnessSelection(selection, params) {
	if (!log.isEnabled("debug")) return;
	log.debug("agent harness selected", {
		provider: params.provider,
		modelId: params.modelId,
		sessionKey: params.sessionKey,
		agentId: params.agentId,
		selectedHarnessId: selection.selectedHarnessId,
		selectedReason: selection.selectedReason,
		runtime: selection.policy.runtime,
		candidates: selection.candidates
	});
}
//#endregion
export { createAgentHarnessHostCapabilities as a, selectAgentHarnessForPreparedModelProviders as i, runAgentHarnessSettledTurnFinalization as n, assertCompactionSource as o, selectAgentHarness as r, retainAgentHarnessCompactionSource as s, runAgentHarnessAttempt as t };
