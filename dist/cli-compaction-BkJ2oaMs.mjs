import { n as captureAsyncWorkTracker, t as AsyncWorkScope } from "./async-work-scope-ClifbwQr.mjs";
import { t as createSubsystemLogger } from "./subsystem-CeqVSEVi.mjs";
import { t as _usingCtx } from "./usingCtx-DwOBYOJf.mjs";
import { n as withPluginRuntimeGenerationScope } from "./generation-scope-BTOPD8Qn.mjs";
import { a as normalizeOptionalAgentRuntimeId } from "./agent-runtime-id-D1H9nIYN.mjs";
import { s as resolveContextEngine } from "./registry-CmDX3rgP.mjs";
import { i as resolveCliBackendConfig } from "./cli-backends-CdkNfYy4.mjs";
import { t as acquireAgentRunPreparedModelRuntime } from "./prepared-model-runtime-CiPCD0fr.mjs";
import { i as resolveLiveToolResultMaxChars } from "./tool-result-limits-B-fhY8wF.mjs";
import { o as resolveFreshSessionTotalTokens } from "./types-DBHkhm7j.mjs";
import { c as loadSessionEntryReadOnly } from "./session-accessor.sqlite-entry-C87Sde4p.mjs";
import "./session-accessor-CGLseszP.mjs";
import { b as resolveCompactionTimeoutMs, v as compactContextEngineWithSafetyTimeout } from "./diagnostic-DLixObfX.mjs";
import { a as isBenignCompactionSkipReason, o as isBenignCompactionSkipResult } from "./request-error-facts-CpKG9Koj.mjs";
import { i as buildGenericCliContextEngineHostSupport } from "./host-compat-xESS3bi6.mjs";
import { t as ensureContextEnginesInitialized } from "./init-DCBLs_0W.mjs";
import { c as buildContextEngineRuntimeSettings } from "./context-engine-lifecycle-c7v9dJay.mjs";
import { t as runWithAsyncWorkResources } from "./async-work-resources-DqyyrnZo.mjs";
import { i as isRecoverableNativeHarnessBindingFailure, r as maybeCompactAgentHarnessSession, t as acceptCompactionSuccessor } from "./compaction-successor-B33yq3Ye.mjs";
import { s as retainAgentHarnessCompactionSource } from "./selection-aEGvijq3.mjs";
import { y as createPreparedEmbeddedAgentSettingsManager } from "./builtin-openclaw-DEib7rq9.mjs";
import "./tool-result-truncation-CKAInP-Z.mjs";
import { h as shouldPreemptivelyCompactBeforePrompt } from "./settled-turn-finalization-result-B8lL2uN5.mjs";
import { f as buildEmbeddedCompactionRuntimeContext, t as runContextEngineMaintenance } from "./context-engine-maintenance-DKbclwGZ.mjs";
import { t as SessionManager } from "./session-manager-BsFekDGn.mjs";
import { a as resolveEffectiveCompactionMode, n as applyAgentAutoCompactionGuard } from "./agent-settings-CgH6-jRQ.mjs";
import { t as ensureSelectedAgentHarnessPlugin } from "./runtime-plugin-C5rQmPUd.mjs";
import { t as clearCliSessionInStore } from "./cli-session-store-BYzx-K5l.mjs";
import { i as recordCliCompactionInStore, n as normalizeSessionTokenCount } from "./session-store-CsJecWiE.mjs";
//#region src/agents/command/cli-compaction-context.ts
function buildCliCompactionRuntimeContext(params) {
	return {
		...buildEmbeddedCompactionRuntimeContext({
			sessionKey: params.sessionKey,
			messageChannel: params.messageChannel,
			messageProvider: params.messageChannel,
			agentAccountId: params.agentAccountId,
			authProfileId: params.authProfileId,
			workspaceDir: params.workspaceDir,
			cwd: params.cwd,
			agentDir: params.agentDir,
			config: params.cfg,
			skillsSnapshot: params.skillsSnapshot,
			senderIsOwner: params.senderIsOwner,
			provider: params.provider,
			modelId: params.model,
			harnessRuntime: params.harnessRuntime,
			modelSelectionLocked: params.modelSelectionLocked,
			thinkLevel: params.thinkLevel,
			extraSystemPrompt: params.extraSystemPrompt
		}),
		currentTokenCount: params.currentTokenCount,
		tokenBudget: params.contextTokenBudget,
		trigger: params.trigger
	};
}
//#endregion
//#region src/agents/command/cli-compaction.ts
/**
* CLI turn compaction lifecycle.
*
* This module decides when CLI-backed sessions need context compaction, chooses
* native harness or context-engine compaction, and records resulting session state.
*/
const CODEX_APP_SERVER_OWNS_AUTO_COMPACTION_REASON = "codex app-server owns automatic compaction";
const log = createSubsystemLogger("agents/cli-compaction");
const defaultCliCompactionDeps = {
	openSessionManager: (target) => SessionManager.open(target),
	ensureContextEnginesInitialized,
	resolveContextEngine,
	createPreparedEmbeddedAgentSettingsManager,
	applyAgentAutoCompactionGuard,
	shouldPreemptivelyCompactBeforePrompt,
	resolveLiveToolResultMaxChars,
	runContextEngineMaintenance,
	acquirePreparedModelRuntime: acquireAgentRunPreparedModelRuntime,
	ensureSelectedAgentHarnessPlugin,
	maybeCompactAgentHarnessSession,
	clearCliSessionInStore,
	resolveCliBackendConfig,
	recordCliCompactionInStore
};
const cliCompactionDeps = { ...defaultCliCompactionDeps };
function setCliCompactionTestDeps(overrides) {
	Object.assign(cliCompactionDeps, overrides);
}
function resetCliCompactionTestDeps() {
	Object.assign(cliCompactionDeps, defaultCliCompactionDeps);
}
function resolveSessionTokenSnapshot(sessionEntry) {
	return normalizeSessionTokenCount(resolveFreshSessionTotalTokens(sessionEntry));
}
function isNativeHarnessCompactionSession(sessionEntry, provider) {
	const harnessId = sessionEntry?.agentHarnessId?.trim().toLowerCase();
	if (!harnessId || normalizeOptionalAgentRuntimeId(harnessId) === "openclaw") return false;
	const providerId = provider.trim().toLowerCase();
	return harnessId === providerId || harnessId === "copilot" && providerId === "github-copilot" || harnessId === "codex" && (providerId === "codex" || providerId === "openai");
}
function isUnsupportedNativeHarnessCompaction(result) {
	return result?.ok === false && result.failure?.reason === "unsupported_harness_compaction";
}
function isIntentionalNativeAutoCompactionSkip(result) {
	return result?.ok === true && !result.compacted && result.reason === CODEX_APP_SERVER_OWNS_AUTO_COMPACTION_REASON;
}
async function compactCliTranscript(params) {
	const runtimeContext = buildCliCompactionRuntimeContext({
		...params,
		trigger: "cli_budget"
	});
	const runtimeSettings = buildContextEngineRuntimeSettings({
		contextEngineHost: buildGenericCliContextEngineHostSupport({
			backendId: params.provider,
			capabilities: ["compact", "maintain"]
		}),
		provider: params.provider,
		requestedModel: params.model,
		resolvedModel: params.model,
		selectedContextEngineId: params.contextEngine.info.id,
		contextEngineSelectionSource: "configured",
		promptTokenBudget: params.contextTokenBudget
	});
	let compactResult;
	params.assertActive();
	try {
		compactResult = await compactContextEngineWithSafetyTimeout(params.contextEngine, {
			sessionId: params.sessionId,
			sessionKey: params.sessionKey,
			sessionTarget: {
				agentId: params.agentId,
				sessionId: params.sessionId,
				sessionKey: params.sessionKey,
				...params.storePath ? { storePath: params.storePath } : {}
			},
			tokenBudget: params.contextTokenBudget,
			currentTokenCount: params.currentTokenCount,
			force: true,
			compactionTarget: "budget",
			runtimeContext,
			runtimeSettings
		}, resolveCompactionTimeoutMs(params.cfg), params.abortSignal);
	} catch (error) {
		const reason = error instanceof Error ? error.message : String(error);
		if (isBenignCompactionSkipReason(reason)) {
			log.info(`CLI transcript compaction skipped for ${params.provider}/${params.model}: ${reason}`);
			return { compacted: false };
		}
		log.warn(`CLI transcript compaction failed for ${params.provider}/${params.model}: ${reason}`);
		return {
			compacted: false,
			failureReason: reason
		};
	}
	if (!compactResult.ok || !compactResult.compacted) {
		const reason = compactResult.reason;
		if (isBenignCompactionSkipResult(compactResult)) {
			log.info(`CLI transcript compaction skipped for ${params.provider}/${params.model}: ${reason}`);
			return { compacted: false };
		}
		log.warn(`CLI transcript compaction did not reduce context for ${params.provider}/${params.model}: ${reason ?? "compaction did not reduce context"}`);
		return {
			compacted: false,
			failureReason: compactResult.reason ?? "compaction did not reduce context"
		};
	}
	const result = compactResult.result;
	const successor = await acceptCompactionSuccessor({
		expectedEntry: params.expectedEntry,
		assertActive: params.assertActive,
		onCommitted: params.onCommitted,
		config: params.cfg,
		currentSessionFile: params.sessionFile,
		currentTarget: {
			agentId: params.agentId,
			sessionId: params.sessionId,
			sessionKey: params.sessionKey,
			storePath: params.storePath
		},
		result: compactResult
	});
	const outcome = {
		compacted: true,
		accepted: successor,
		...result?.tokensAfter !== void 0 ? { tokensAfter: result.tokensAfter } : {}
	};
	try {
		params.assertActive();
		await cliCompactionDeps.runContextEngineMaintenance({
			contextEngine: params.contextEngine,
			sessionId: successor.sessionId,
			sessionKey: params.sessionKey,
			sessionFile: successor.sessionFile,
			sessionTarget: successor.sessionTarget,
			reason: "compaction",
			...successor.previousSessionId ? {} : { sessionManager: params.sessionManager },
			runtimeContext,
			runtimeSettings,
			config: params.cfg,
			assertActive: params.assertActive
		});
	} catch (error) {
		try {
			params.assertActive();
		} catch {
			return outcome;
		}
		if (!params.bestEffortMaintenance) throw error;
		log.warn(`CLI transcript compaction maintenance failed after fallback for ${params.provider}/${params.model}: ${error instanceof Error ? error.message : String(error)}`);
	}
	return outcome;
}
async function compactNativeHarnessCliTranscript(params) {
	let result;
	try {
		try {
			var _usingCtx$1 = _usingCtx();
			const nativeHarnessId = params.sessionEntry.agentHarnessId?.trim();
			const modelSelectionLocked = params.sessionEntry.modelSelectionLocked === true;
			const authProfileId = params.sessionEntry.authProfileOverride?.trim() || void 0;
			const preparedModelRuntime = _usingCtx$1.a(await cliCompactionDeps.acquirePreparedModelRuntime({
				config: params.cfg,
				agentId: params.sessionAgentId,
				agentDir: params.agentDir,
				workspaceDir: params.workspaceDir,
				allowGatewaySubagentBinding: true,
				runtimePluginSelections: [{
					provider: params.provider,
					modelId: params.model,
					agentId: params.sessionAgentId,
					...nativeHarnessId ? { runtime: nativeHarnessId } : {}
				}]
			}, params.pluginGeneration ? { pluginGeneration: params.pluginGeneration } : {})).snapshot;
			result = await withPluginRuntimeGenerationScope(preparedModelRuntime, async () => {
				await cliCompactionDeps.ensureSelectedAgentHarnessPlugin({
					provider: params.provider,
					modelId: params.model,
					config: params.cfg,
					sessionKey: params.sessionKey,
					workspaceDir: params.workspaceDir,
					agentId: params.sessionAgentId,
					...nativeHarnessId ? { agentHarnessRuntimeOverride: nativeHarnessId } : {},
					pluginRegistry: preparedModelRuntime.pluginRegistry
				});
				params.assertActive();
				return await cliCompactionDeps.maybeCompactAgentHarnessSession({
					agentId: params.sessionAgentId,
					sessionId: params.sessionId,
					sessionKey: params.sessionKey,
					sessionFile: params.sessionFile,
					workspaceDir: params.workspaceDir,
					cwd: params.cwd,
					agentDir: params.agentDir,
					config: params.cfg,
					skillsSnapshot: params.skillsSnapshot,
					provider: params.provider,
					model: params.model,
					authProfileId,
					contextTokenBudget: params.contextTokenBudget,
					currentTokenCount: params.currentTokenCount,
					trigger: "budget",
					force: true,
					messageChannel: params.messageChannel,
					agentAccountId: params.agentAccountId,
					senderIsOwner: params.senderIsOwner,
					thinkLevel: params.thinkLevel,
					extraSystemPrompt: params.extraSystemPrompt,
					modelSelectionLocked,
					allowGatewaySubagentBinding: true,
					...params.contextEngine ? {
						contextEngine: params.contextEngine,
						contextEngineRuntimeContext: buildCliCompactionRuntimeContext({
							...params,
							authProfileId,
							harnessRuntime: nativeHarnessId,
							modelSelectionLocked,
							trigger: "cli_native_budget"
						})
					} : {},
					...nativeHarnessId ? { agentHarnessId: nativeHarnessId } : {},
					abortSignal: params.abortSignal
				}, {
					preparedModelRuntime,
					sourceAuthority: params.sourceAuthority
				});
			});
		} catch (_) {
			_usingCtx$1.e = _;
		} finally {
			await _usingCtx$1.d();
		}
	} catch (error) {
		log.warn(`CLI native harness compaction failed for ${params.provider}/${params.model}: ${error instanceof Error ? error.message : String(error)}`);
		return {
			compacted: false,
			failureReason: error instanceof Error ? error.message : String(error)
		};
	}
	if (!result?.ok || !result.compacted) {
		const reason = result?.reason;
		if (result && isBenignCompactionSkipResult(result)) {
			log.info(`CLI native harness compaction skipped for ${params.provider}/${params.model}: ${reason}`);
			return { compacted: false };
		}
		if (isIntentionalNativeAutoCompactionSkip(result)) {
			log.info(`CLI native harness compaction skipped for ${params.provider}/${params.model}: ${CODEX_APP_SERVER_OWNS_AUTO_COMPACTION_REASON}`);
			return { compacted: false };
		}
		const recoverableBindingFailure = isRecoverableNativeHarnessBindingFailure(result);
		const fallbackToContextEngine = params.sessionEntry.modelSelectionLocked !== true && (isUnsupportedNativeHarnessCompaction(result) || recoverableBindingFailure);
		log.warn(`CLI native harness compaction did not reduce context for ${params.provider}/${params.model}: ${reason}`);
		return {
			compacted: false,
			fallbackToContextEngine,
			clearCliSessionBinding: params.sessionEntry.modelSelectionLocked !== true && recoverableBindingFailure,
			failureReason: result?.reason ?? "native harness compaction did not reduce context"
		};
	}
	return {
		compacted: true,
		result
	};
}
/** Runs pre-turn compaction for a CLI session and returns the updated session entry. */
async function runCliTurnCompactionLifecycle(input, host) {
	const storePath = input.storePath;
	const contextTokenBudget = normalizeSessionTokenCount(input.sessionEntry?.contextTokens);
	if (!storePath || !contextTokenBudget) return input.sessionEntry;
	return await runWithAsyncWorkResources(async (onAcquired) => {
		const sourceAuthority = host.sourceAuthority;
		onAcquired({
			release: retainAgentHarnessCompactionSource(sourceAuthority),
			releaseBeforeResultWhenIdle: true
		});
		const operatorAuthority = sourceAuthority.operatorAuthority;
		const assertSourceActive = sourceAuthority.assertActive;
		const sourceSignal = operatorAuthority?.signal;
		const abortSignal = input.abortSignal && sourceSignal ? AbortSignal.any([input.abortSignal, sourceSignal]) : input.abortSignal ?? sourceSignal;
		const params = {
			...input,
			abortSignal
		};
		const capturedEntry = loadSessionEntryReadOnly({
			agentId: params.sessionAgentId,
			sessionKey: params.sessionKey,
			storePath,
			readConsistency: "latest"
		});
		const expectedEntry = {
			sessionId: params.sessionId,
			lifecycleRevision: capturedEntry?.lifecycleRevision,
			activeWriterRunId: capturedEntry?.activeWriterRunId
		};
		const assertActive = () => {
			params.abortSignal?.throwIfAborted();
			assertSourceActive();
			operatorAuthority?.assertCurrent();
			host.assertActive?.();
		};
		assertActive();
		const onCommitted = (accepted) => {
			if (params.sessionStore) params.sessionStore[params.sessionKey] = accepted.entry;
			host.onCommitted?.(accepted);
		};
		const sessionManager = cliCompactionDeps.openSessionManager({
			agentId: params.sessionAgentId,
			sessionId: params.sessionId,
			sessionKey: params.sessionKey,
			storePath
		});
		const sessionFile = params.sessionKey;
		const settingsManager = await cliCompactionDeps.createPreparedEmbeddedAgentSettingsManager({
			cwd: params.cwd ?? params.workspaceDir,
			agentDir: params.agentDir,
			cfg: params.cfg,
			contextTokenBudget
		});
		assertActive();
		const preemptiveCompaction = cliCompactionDeps.shouldPreemptivelyCompactBeforePrompt({
			messages: sessionManager.buildSessionContext().messages,
			prompt: "",
			contextTokenBudget,
			reserveTokens: settingsManager.getCompactionReserveTokens(),
			toolResultMaxChars: cliCompactionDeps.resolveLiveToolResultMaxChars({ contextWindowTokens: contextTokenBudget })
		});
		const tokenSnapshot = resolveSessionTokenSnapshot(params.sessionEntry);
		const currentTokenCount = Math.max(preemptiveCompaction.estimatedPromptTokens, tokenSnapshot ?? 0);
		if (!preemptiveCompaction.shouldCompact && currentTokenCount <= preemptiveCompaction.promptBudgetBeforeReserve) return params.sessionEntry;
		const resolvedBackend = cliCompactionDeps.resolveCliBackendConfig(params.provider, params.cfg);
		const lockedHarnessRuntime = normalizeOptionalAgentRuntimeId(params.sessionEntry?.agentHarnessId);
		if (params.sessionEntry?.modelSelectionLocked === true && lockedHarnessRuntime !== "openclaw" && !isNativeHarnessCompactionSession(params.sessionEntry, params.provider)) throw new Error("CLI compaction cannot replace a model-locked native harness runtime");
		if (resolvedBackend?.ownsNativeCompaction && !isNativeHarnessCompactionSession(params.sessionEntry, params.provider)) {
			log.info(`CLI backend "${params.provider}" owns native compaction — deferring to backend`);
			return params.sessionEntry;
		}
		let compactionKind;
		let contextCompactionOutcome;
		let nativeCompactionResult;
		let useContextEngineCompaction = true;
		let nativeFallbackToContextEngine = false;
		let nativeFallbackNeedsBindingClear = false;
		let resolvedContextEngine;
		let autoCompactionGuardApplied = false;
		const authProfileId = params.sessionEntry?.authProfileOverride?.trim() || void 0;
		const applyAutoCompactionGuard = async (contextEngine) => {
			if (autoCompactionGuardApplied) return;
			autoCompactionGuardApplied = true;
			await cliCompactionDeps.applyAgentAutoCompactionGuard({
				settingsManager,
				contextEngineInfo: contextEngine.info,
				compactionMode: resolveEffectiveCompactionMode(params.cfg)
			});
		};
		const work = new AsyncWorkScope();
		const trackCleanup = captureAsyncWorkTracker();
		let result;
		let failure;
		try {
			result = await work.run(async () => {
				if (isNativeHarnessCompactionSession(params.sessionEntry, params.provider)) {
					cliCompactionDeps.ensureContextEnginesInitialized();
					resolvedContextEngine = await cliCompactionDeps.resolveContextEngine(params.cfg);
					await applyAutoCompactionGuard(resolvedContextEngine);
					const nativeOutcome = await compactNativeHarnessCliTranscript({
						...params,
						sessionFile,
						sessionEntry: params.sessionEntry,
						contextTokenBudget,
						currentTokenCount,
						contextEngine: resolvedContextEngine,
						assertActive,
						sourceAuthority: {
							assertActive,
							operatorAuthority
						}
					});
					if (nativeOutcome.compacted) {
						compactionKind = "native-harness";
						nativeCompactionResult = nativeOutcome.result;
						useContextEngineCompaction = false;
					} else if (nativeOutcome.fallbackToContextEngine) {
						nativeFallbackToContextEngine = true;
						nativeFallbackNeedsBindingClear = nativeOutcome.clearCliSessionBinding === true;
					} else if (nativeOutcome.failureReason) throw new Error(`CLI native harness compaction failed for ${params.provider}/${params.model}: ${nativeOutcome.failureReason}`);
					else useContextEngineCompaction = false;
				}
				if (useContextEngineCompaction) {
					assertActive();
					if (!resolvedContextEngine) {
						cliCompactionDeps.ensureContextEnginesInitialized();
						resolvedContextEngine = await cliCompactionDeps.resolveContextEngine(params.cfg);
					}
					const contextEngine = resolvedContextEngine;
					await applyAutoCompactionGuard(contextEngine);
					const contextOutcome = await compactCliTranscript({
						...params,
						agentId: params.sessionAgentId,
						contextEngine,
						sessionFile,
						sessionManager,
						storePath,
						harnessRuntime: params.sessionEntry?.agentHarnessId,
						modelSelectionLocked: params.sessionEntry?.modelSelectionLocked,
						contextTokenBudget,
						currentTokenCount,
						authProfileId,
						bestEffortMaintenance: nativeFallbackToContextEngine,
						expectedEntry,
						assertActive,
						onCommitted
					});
					contextCompactionOutcome = contextOutcome;
					compactionKind = contextOutcome.compacted ? "context-engine" : void 0;
					if (!compactionKind && contextOutcome.failureReason) throw new Error(`CLI transcript compaction failed for ${params.provider}/${params.model}: ${contextOutcome.failureReason}`);
				}
				if (nativeFallbackNeedsBindingClear && !compactionKind && params.sessionStore) {
					assertActive();
					return await cliCompactionDeps.clearCliSessionInStore({
						agentId: params.sessionAgentId,
						provider: params.provider,
						sessionKey: params.sessionKey,
						sessionStore: params.sessionStore,
						storePath,
						expectedSessionId: params.sessionId,
						assertCommitAllowed: assertActive
					}) ?? params.sessionEntry;
				}
				if (!compactionKind || !params.sessionStore) return params.sessionEntry;
				const recorded = await cliCompactionDeps.recordCliCompactionInStore({
					agentId: params.sessionAgentId,
					compactionKind,
					sessionKey: params.sessionKey,
					sessionStore: params.sessionStore,
					storePath,
					tokensAfter: nativeCompactionResult?.result?.tokensAfter ?? contextCompactionOutcome?.tokensAfter,
					expectedSession: contextCompactionOutcome?.accepted?.entry ?? expectedEntry
				});
				if (!recorded) throw new Error("Session changed before CLI compaction could be recorded");
				return recorded;
			});
		} catch (error) {
			failure = { error };
		}
		const cleanup = async () => {
			try {
				await AsyncWorkScope.runWhenAllIdle(() => [work], () => resolvedContextEngine?.dispose?.());
			} finally {
				await work.run(() => work.drain());
			}
		};
		if (work.hasPendingWork) trackCleanup(cleanup).catch((error) => {
			log.warn(`CLI compaction engine cleanup failed: ${String(error)}`);
		});
		else try {
			await cleanup();
		} catch (error) {
			failure ??= { error };
		}
		if (failure) throw failure.error;
		return result;
	});
}
//#endregion
export { resetCliCompactionTestDeps, runCliTurnCompactionLifecycle, setCliCompactionTestDeps };
