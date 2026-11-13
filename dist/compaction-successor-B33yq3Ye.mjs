import { o as resolveUserPath } from "./home-dir-CjKH62jd.mjs";
import "./utils-DUAwk2p5.mjs";
import { t as createSubsystemLogger } from "./subsystem-CeqVSEVi.mjs";
import { a as resolveAgentDir } from "./agent-scope-config-Dm6T00l4.mjs";
import { A as parseAgentSessionKey, l as resolveAgentIdFromSessionKey } from "./session-key-BC4m_Ly5.mjs";
import { v as resolveSessionAgentIds } from "./agent-scope-L_eY3Hj7.mjs";
import { n as withPluginRuntimeGenerationScope } from "./generation-scope-BTOPD8Qn.mjs";
import { a as normalizeOptionalAgentRuntimeId, r as isDefaultAgentRuntimeId } from "./agent-runtime-id-D1H9nIYN.mjs";
import { i as isOpenAIProvider } from "./openai-routing-yzlBh98z.mjs";
import { d as retireSessionMcpRuntime } from "./agent-bundle-mcp-manager-api-DgAsD8Ws.mjs";
import { r as logVerbose } from "./globals-ChjEJkWj.mjs";
import { t as getGlobalHookRunner } from "./hook-runner-global-CwCyBBBr.mjs";
import { t as SessionTranscriptWriterClaimReboundError } from "./transcript-write-context-D53SX4tj.mjs";
import { x as runWithGatewayDetachedWorkContinuation } from "./gateway-work-admission-B4bQUVQ6.mjs";
import { t as resolveAgentHarnessPolicy } from "./policy-CR9PgpAw.mjs";
import { d as prepareSystemAgentRunAdmission } from "./admitted-run-context-BL8yRX2D.mjs";
import { i as ensureAuthProfileStoreWithoutExternalProfiles, n as ensureAuthProfileStore } from "./store-runtime-BpJB9uZ1.mjs";
import { a as resolveAgentHarnessOwnerPluginId, o as resolveCodexAgentHarnessNativeCompaction } from "./registry-BDCa-WcD.mjs";
import { i as unwrapSecretSentinelsForProviderEgress, r as unwrapModelHeaderSentinelsForProviderEgress } from "./provider-secret-egress-DkMhDJl3.mjs";
import { a as projectPreparedModelProvider } from "./availability-bQlFZ63y.mjs";
import { a as isCliRuntimeProvider, i as isCliRuntimeAliasForProvider } from "./model-runtime-aliases-Wn7RduAA.mjs";
import { r as applySecretRefHeaderSentinels } from "./model-auth-ByqXHWUV.mjs";
import { n as parseSqliteSessionFileMarker, t as formatSqliteSessionFileMarker } from "./legacy-sqlite-marker-COPKCuIN.mjs";
import { t as listSessionEntriesReadOnly } from "./session-accessor.sqlite-entry-list.read-6sJ8GFrX.mjs";
import { D as resolveSessionStorePathForScope, c as loadSessionEntryReadOnly, s as loadSessionEntry, u as patchSessionEntryCore } from "./session-accessor.sqlite-entry-C87Sde4p.mjs";
import "./session-accessor-CGLseszP.mjs";
import { t as resolvePreferredSessionKeyForSessionIdMatches } from "./session-id-resolution-BFn3udT1.mjs";
import { a as buildSessionStartHookPayload, i as buildSessionEndHookPayload, r as noteActiveSessionForShutdown, t as forgetActiveSessionForShutdown } from "./active-sessions-shutdown-tracker-DwvpHA5S.mjs";
import { s as resolveStableSessionEndTranscript } from "./session-transcript-files.fs-BRm2boSm.mjs";
import { t as runWithAsyncWorkResources } from "./async-work-resources-DqyyrnZo.mjs";
import { n as resolveModelAsync } from "./model-C9slIIP4.mjs";
import { t as materializePreparedRuntimeModel } from "./materialize-model-D8pV6uHl.mjs";
import { r as prepareAgentRuntimeAuth, t as agentRuntimeAuthPlanMatchesTarget } from "./prepare-auth-CTne_sJu.mjs";
import { a as resolvePreparedRuntimeAuthAttempts, o as resolvePreparedRuntimeModelAuth } from "./simple-completion-runtime-SCvr0cFK.mjs";
import { n as resolveAgentHarnessNativeToolPolicyRestricted } from "./execution-environment-CU6Dkl2v.mjs";
import { a as createAgentHarnessHostCapabilities, i as selectAgentHarnessForPreparedModelProviders, o as assertCompactionSource, r as selectAgentHarness } from "./selection-aEGvijq3.mjs";
import { t as log$1 } from "./logger-CRHWOiHk.mjs";
import { i as resolveAgentRunSessionTarget } from "./builtin-openclaw-DEib7rq9.mjs";
import { t as captureSessionPlacementCompactionSuccessorAssertion } from "./session-placement-admission-BrBHkB_W.mjs";
import path from "node:path";
import { randomUUID } from "node:crypto";
//#region src/agents/harness/compaction-recovery.ts
function isRecoverableNativeHarnessBindingReason(reason) {
	if (typeof reason !== "string") return false;
	const normalized = reason.trim().toLowerCase();
	return normalized === "missing_thread_binding" || normalized === "stale_thread_binding" || normalized.includes("thread not found") || normalized.includes("no thread binding");
}
/** Native binding failures permit context-engine fallback after clearing the stale binding. */
function isRecoverableNativeHarnessBindingFailure(result) {
	return result?.ok === false && (isRecoverableNativeHarnessBindingReason(result.failure?.reason) || isRecoverableNativeHarnessBindingReason(result.reason));
}
//#endregion
//#region src/agents/harness/compaction.ts
const log = createSubsystemLogger("agents/harness-compaction");
function runtimePlanRequiresHostApiKey(plan) {
	return plan?.modelRoute?.authRequirement === "api-key";
}
function resolveHarnessCompactIdentity(params) {
	const agentIds = resolveSessionAgentIds({
		sessionKey: params.sessionKey,
		config: params.config,
		agentId: params.agentId
	});
	return {
		agentDir: params.agentDir ?? resolveAgentDir(params.config ?? {}, agentIds.sessionAgentId),
		agentId: params.agentId ?? agentIds.sessionAgentId
	};
}
function stripHarnessOwnedAuthInputs(params) {
	const result = { ...params };
	delete result.resolvedApiKey;
	delete result.runtimeModel;
	return result;
}
async function resolveHarnessCompactApiKey(params) {
	const { agentDir, compactParams, initialHarness } = params;
	if (!compactParams.provider?.trim() || !compactParams.model?.trim()) {
		const existing = compactParams.resolvedApiKey?.trim();
		return existing ? {
			harness: initialHarness,
			apiKey: existing
		} : { harness: initialHarness };
	}
	const provider = compactParams.provider;
	const modelId = compactParams.model;
	const providedRuntimeAuthPlan = compactParams.runtimeAuthPlan ?? compactParams.runtimePlan?.auth;
	const reusableRuntimeAuthPlan = providedRuntimeAuthPlan && agentRuntimeAuthPlanMatchesTarget(providedRuntimeAuthPlan, {
		provider,
		modelId
	}) ? providedRuntimeAuthPlan : void 0;
	const workspaceDir = resolveUserPath(compactParams.workspaceDir);
	const preparedStores = params.preparedModelRuntime.createStores();
	const callerRuntimeModel = compactParams.runtimeModel;
	const fallbackResolution = (harness, runtimeModel, runtimeAuthPlan) => {
		const apiKey = compactParams.resolvedApiKey?.trim() || void 0;
		if (harness.authBootstrap === "harness" && !runtimeAuthPlan && apiKey) throw new Error(`Unable to prepare a route-locked native compaction attempt for ${provider}/${modelId}; refusing harness-owned ambient auth.`);
		return {
			harness,
			...apiKey ? { apiKey } : {},
			...runtimeModel ? { runtimeModel } : {},
			...runtimeAuthPlan ? { runtimeAuthPlan } : {}
		};
	};
	const selectPreparedHarness = (attempts, preparedModel) => selectAgentHarnessForPreparedModelProviders({
		provider,
		modelId,
		modelProviders: attempts.map((attempt) => projectPreparedModelProvider({
			model: preparedModel,
			plan: attempt.plan,
			attemptKind: attempt.kind
		})),
		config: compactParams.config,
		agentId: parseAgentSessionKey(params.sessionKey) ? void 0 : params.agentId,
		sessionKey: params.sessionKey,
		agentHarnessId: params.pinnedHarnessId
	});
	if (reusableRuntimeAuthPlan) {
		const reusableHarness = selectPreparedHarness([{
			kind: "implicit",
			plan: reusableRuntimeAuthPlan
		}], callerRuntimeModel);
		if ((reusableHarness.authBootstrap === "harness" || reusableRuntimeAuthPlan.harnessAuthProvider) && !runtimePlanRequiresHostApiKey(reusableRuntimeAuthPlan)) return fallbackResolution(reusableHarness, callerRuntimeModel, reusableRuntimeAuthPlan);
	}
	const resolvePreparedModel = ({ config, authProfileId: profileId, authProfileMode }) => resolveModelAsync(provider, modelId, agentDir, config, {
		abortSignal: compactParams.abortSignal,
		...preparedStores,
		preparedModelRuntime: params.preparedModelRuntime,
		authProfileId: profileId,
		authProfileMode,
		skipAgentDiscovery: true,
		allowBundledStaticCatalogFallback: true,
		workspaceDir
	});
	let model = callerRuntimeModel;
	if (!model) try {
		model = (await resolveModelAsync(provider, modelId, agentDir, compactParams.config, {
			abortSignal: compactParams.abortSignal,
			...preparedStores,
			preparedModelRuntime: params.preparedModelRuntime,
			authProfileId: reusableRuntimeAuthPlan?.forwardedAuthProfileId ?? compactParams.authProfileId?.trim() ?? void 0,
			workspaceDir
		})).model;
	} catch (error) {
		compactParams.abortSignal?.throwIfAborted();
		log.warn(`native compaction model resolution failed for ${provider}/${modelId}: ${error instanceof Error ? error.message : String(error)}`);
		return fallbackResolution(initialHarness);
	}
	if (!model) return fallbackResolution(initialHarness);
	const runtimeAuthProfileStore = isOpenAIProvider(provider) ? ensureAuthProfileStore(agentDir, {
		profileId: compactParams.authProfileId ?? reusableRuntimeAuthPlan?.forwardedAuthProfileId,
		externalCliProviderIds: ["openai"],
		allowKeychainPrompt: false
	}) : ensureAuthProfileStoreWithoutExternalProfiles(agentDir, {
		profileId: compactParams.authProfileId ?? reusableRuntimeAuthPlan?.forwardedAuthProfileId,
		allowKeychainPrompt: false
	});
	const prepareRuntimeAuth = (harness) => prepareAgentRuntimeAuth({
		provider,
		modelId,
		modelApi: model.api,
		modelBaseUrl: model.baseUrl,
		config: compactParams.config,
		agentId: params.agentId,
		env: process.env,
		agentDir,
		workspaceDir,
		authProfileStore: runtimeAuthProfileStore,
		sessionAuthProfileId: compactParams.authProfileId,
		sessionAuthProfileSource: compactParams.authProfileIdSource,
		harnessId: harness.id,
		harnessRuntime: harness.id,
		harnessAuthBootstrap: harness.authBootstrap
	});
	let preparation;
	if (reusableRuntimeAuthPlan) preparation = {
		plan: reusableRuntimeAuthPlan,
		attempts: [{
			kind: "implicit",
			plan: reusableRuntimeAuthPlan
		}]
	};
	else try {
		preparation = prepareRuntimeAuth(initialHarness);
	} catch (error) {
		log.warn(`native compaction auth preparation failed for ${provider}/${modelId}: ${error instanceof Error ? error.message : String(error)}`);
		return fallbackResolution(initialHarness, model);
	}
	let harness = params.pinnedHarnessId ? initialHarness : selectPreparedHarness(preparation.attempts, model);
	if (!params.pinnedHarnessId && !reusableRuntimeAuthPlan && harness.id !== initialHarness.id) {
		try {
			preparation = prepareRuntimeAuth(harness);
		} catch (error) {
			log.warn(`native compaction auth preparation failed for ${provider}/${modelId}: ${error instanceof Error ? error.message : String(error)}`);
			return fallbackResolution(harness, model);
		}
		const confirmedHarness = selectPreparedHarness(preparation.attempts, model);
		if (confirmedHarness.id !== harness.id) throw new Error(`Prepared native compaction auth routes did not converge on one agent harness for ${provider}/${modelId}.`);
		harness = confirmedHarness;
	}
	const materializeModel = async (input) => {
		const materialized = await materializePreparedRuntimeModel({
			plan: input.plan,
			provider,
			modelId,
			config: compactParams.config,
			workspaceDir,
			metadataSnapshot: params.preparedModelRuntime.metadataSnapshot,
			model: input.model,
			forceResolve: input.forceResolve,
			rejectMismatchedModel: true,
			resolveModel: resolvePreparedModel
		});
		if (!materialized) throw new Error(`Unable to materialize ${provider}/${modelId} for native compaction.`);
		return applySecretRefHeaderSentinels(materialized, compactParams.config);
	};
	let resolved;
	try {
		resolved = await resolvePreparedRuntimeAuthAttempts({
			attempts: preparation.attempts,
			store: runtimeAuthProfileStore,
			modelId,
			model,
			materializeModel,
			resolveAuth: async ({ attempt, model: attemptModel }) => {
				if ((harness.authBootstrap === "harness" || attempt.plan.harnessAuthProvider) && !runtimePlanRequiresHostApiKey(attempt.plan)) return {
					plan: attempt.plan,
					auth: {}
				};
				const existing = attempt.plan.forwardedAuthProfileSource === "auto" && Boolean(attempt.plan.forwardedAuthProfileId || attempt.plan.forwardedAuthProfileCandidateIds?.length) ? void 0 : compactParams.resolvedApiKey?.trim();
				if (existing) return {
					plan: attempt.plan,
					auth: { apiKey: existing }
				};
				const auth = await resolvePreparedRuntimeModelAuth({
					plan: attempt.plan,
					model: attemptModel,
					cfg: compactParams.config,
					store: runtimeAuthProfileStore,
					agentDir,
					workspaceDir,
					...attempt.allowAuthProfileFallback !== void 0 ? { allowAuthProfileFallback: attempt.allowAuthProfileFallback } : {},
					secretSentinels: true
				});
				return {
					plan: auth.plan,
					auth: { apiKey: auth.auth.apiKey?.trim() || void 0 }
				};
			},
			errorMessage: `Prepared native compaction auth attempts could not be resolved for ${provider}/${modelId}.`
		});
	} catch (error) {
		compactParams.abortSignal?.throwIfAborted();
		log.warn(`native compaction prepared auth resolution failed for ${provider}/${modelId}: ${error instanceof Error ? error.message : String(error)}`);
		return fallbackResolution(harness, model, preparation.plan);
	}
	return {
		harness,
		apiKey: resolved.auth.apiKey,
		runtimeModel: resolved.model,
		runtimeAuthPlan: resolved.plan
	};
}
/** Runs harness-provided compaction when the selected runtime supports it. */
async function maybeCompactAgentHarnessSession(params, options) {
	return await withPluginRuntimeGenerationScope(options.preparedModelRuntime, () => maybeCompactAgentHarnessSessionInGeneration(params, options));
}
async function maybeCompactAgentHarnessSessionInGeneration(params, options) {
	const selectedRuntime = normalizeOptionalAgentRuntimeId(params.agentHarnessId);
	const pinnedHarnessId = selectedRuntime && !isDefaultAgentRuntimeId(selectedRuntime) ? selectedRuntime : void 0;
	if (!pinnedHarnessId && params.provider && isCliRuntimeProvider(params.provider, { config: params.config })) return;
	const runtimePolicySessionKey = params.sandboxSessionKey ?? params.sessionKey;
	const runtimePolicyAgentId = params.sandboxAgentId ?? (params.sandboxSessionKey && parseAgentSessionKey(params.sandboxSessionKey) ? void 0 : params.agentId);
	const runtimeAuthPlan = params.runtimeAuthPlan ?? params.runtimePlan?.auth;
	const modelRoute = runtimeAuthPlan?.modelRoute;
	if (runtimeAuthPlan && modelRoute && (!params.provider || !params.model || !agentRuntimeAuthPlanMatchesTarget(runtimeAuthPlan, {
		provider: params.provider,
		modelId: params.model ?? ""
	}))) throw new Error(`Prepared runtime auth route ${modelRoute.provider}/${modelRoute.modelId} does not match the compaction target ${params.provider ?? "unknown"}/${params.model ?? "unknown"}.`);
	const runtime = resolveAgentHarnessPolicy({
		provider: params.provider,
		modelId: params.model,
		config: params.config,
		agentId: runtimePolicyAgentId,
		sessionKey: runtimePolicySessionKey
	}).runtime;
	if (isCliRuntimeAliasForProvider({
		runtime: pinnedHarnessId ?? runtime,
		provider: params.provider,
		cfg: params.config
	})) return;
	const harnessSelectionParams = {
		provider: params.provider ?? "",
		modelId: params.model,
		config: params.config,
		agentId: runtimePolicyAgentId,
		sessionKey: runtimePolicySessionKey,
		agentHarnessId: pinnedHarnessId
	};
	let harness = runtimeAuthPlan ? selectAgentHarnessForPreparedModelProviders({
		...harnessSelectionParams,
		modelProviders: [projectPreparedModelProvider({
			model: params.runtimeModel,
			plan: runtimeAuthPlan
		})]
	}) : selectAgentHarness(harnessSelectionParams);
	const initialNativeCompaction = resolveCodexAgentHarnessNativeCompaction(harness);
	if (options.nativeCompactionRequest === "after_context_engine" && !initialNativeCompaction) return;
	if (!options.nativeCompactionRequest && !harness.compact) {
		if (harness.id !== "openclaw") return {
			ok: false,
			compacted: false,
			reason: `Agent harness "${harness.id}" does not support compaction.`,
			failure: { reason: "unsupported_harness_compaction" }
		};
		return;
	}
	const compactIdentity = resolveHarnessCompactIdentity(params);
	const sourceAuthority = options.sourceAuthority;
	assertCompactionSource(sourceAuthority);
	const signals = [params.abortSignal, sourceAuthority.operatorAuthority?.signal].filter((signal) => signal !== void 0);
	const abortSignal = signals.length > 0 ? AbortSignal.any(signals) : void 0;
	const assertSourceCurrent = () => {
		abortSignal?.throwIfAborted();
		assertCompactionSource(sourceAuthority);
	};
	return await runWithAsyncWorkResources(async (onAcquired) => {
		const runId = `${params.runId ?? params.sessionId}:harness-compact:${randomUUID()}`;
		const admission = prepareSystemAgentRunAdmission(params.config ?? {}, runId, compactIdentity.agentId, "agents.harness-compaction", assertSourceCurrent, sourceAuthority.operatorAuthority);
		const resources = {};
		onAcquired({
			release: () => {
				try {
					resources.releaseUnqualifiedModelSource?.();
					resources.host?.close();
				} finally {
					admission.close();
				}
			},
			releaseBeforeResultWhenIdle: true
		});
		const compactParams = {
			...params,
			abortSignal,
			agentDir: compactIdentity.agentDir,
			agentId: compactIdentity.agentId
		};
		const resolved = await resolveHarnessCompactApiKey({
			agentDir: compactIdentity.agentDir,
			compactParams,
			initialHarness: harness,
			agentId: compactIdentity.agentId,
			sessionKey: runtimePolicySessionKey,
			pinnedHarnessId,
			preparedModelRuntime: options.preparedModelRuntime
		});
		assertSourceCurrent();
		harness = resolved.harness;
		const nativeToolPolicyRestricted = resolveAgentHarnessNativeToolPolicyRestricted({
			...params,
			agentId: compactIdentity.agentId,
			provider: params.provider ?? "",
			modelId: params.model ?? ""
		}, harness);
		compactParams.nativeToolSurface = nativeToolPolicyRestricted ? "host-isolated" : "unrestricted";
		const resolvedRuntimeAuthPlan = resolved.runtimeAuthPlan ?? runtimeAuthPlan;
		const nativeCompaction = resolveCodexAgentHarnessNativeCompaction(harness);
		if (options.nativeCompactionRequest === "after_context_engine" && !nativeCompaction) return;
		if (!options.nativeCompactionRequest && !harness.compact) {
			if (harness.id !== "openclaw") return {
				ok: false,
				compacted: false,
				reason: `Agent harness "${harness.id}" does not support compaction.`,
				failure: { reason: "unsupported_harness_compaction" }
			};
			return;
		}
		if (nativeToolPolicyRestricted && harness.id !== "openclaw" && harness.conversationToolPolicySupport !== "exact") throw new Error(`Agent harness ${harness.id} cannot enforce the host-isolated tool policy required for compaction`);
		const harnessOwnsAuth = harness.authBootstrap === "harness" && !runtimePlanRequiresHostApiKey(resolvedRuntimeAuthPlan);
		const resolvedApiKey = harnessOwnsAuth ? void 0 : resolved.apiKey;
		const runtimeModel = harnessOwnsAuth && !resolvedRuntimeAuthPlan ? void 0 : resolved.runtimeModel;
		const compactParamsWithResolvedAuth = resolvedRuntimeAuthPlan ? {
			...compactParams,
			authProfileId: resolvedRuntimeAuthPlan.forwardedAuthProfileId,
			authProfileIdSource: resolvedRuntimeAuthPlan.forwardedAuthProfileSource,
			runtimeAuthPlan: resolvedRuntimeAuthPlan,
			...compactParams.runtimePlan ? { runtimePlan: {
				...compactParams.runtimePlan,
				auth: resolvedRuntimeAuthPlan
			} } : {}
		} : compactParams;
		const handoffCompactParams = harnessOwnsAuth ? stripHarnessOwnedAuthInputs(compactParamsWithResolvedAuth) : compactParamsWithResolvedAuth;
		const resolvedCompactParams = resolvedApiKey || runtimeModel ? {
			...handoffCompactParams,
			...resolvedApiKey ? { resolvedApiKey: unwrapSecretSentinelsForProviderEgress(resolvedApiKey, "plugin harness compaction handoff") } : {},
			...runtimeModel ? { runtimeModel: unwrapModelHeaderSentinelsForProviderEgress(runtimeModel, "plugin harness compaction handoff") } : {}
		} : handoffCompactParams;
		const admittedRunContext = await admission.admit("plugin-harness", harness.id);
		assertSourceCurrent();
		const { model: modelId, trigger: _compactionTrigger, ...hostAttempt } = resolvedCompactParams;
		const host = createAgentHarnessHostCapabilities({
			attempt: {
				...hostAttempt,
				modelId,
				runId,
				admittedRunContext
			},
			pluginId: resolveAgentHarnessOwnerPluginId(harness),
			nativeModelPolicySupport: harness.nativeModelPolicySupport
		});
		resources.host = host;
		const retainSourceAuthority = host.capabilities.retainSourceAuthority;
		if (!retainSourceAuthority) throw new Error("Compaction host cannot retain its original source authority");
		const unqualifiedModelSource = harness.nativeModelPolicySupport === "exact" ? void 0 : retainSourceAuthority();
		resources.releaseUnqualifiedModelSource = unqualifiedModelSource?.release;
		const dispatchParams = {
			...resolvedCompactParams,
			...unqualifiedModelSource?.signal ? { abortSignal: AbortSignal.any([unqualifiedModelSource.signal, ...abortSignal ? [abortSignal] : []]) } : {},
			hostCapabilities: Object.freeze({
				kind: host.capabilities.kind,
				version: host.capabilities.version,
				assertActive: host.capabilities.assertActive,
				retainSourceAuthority
			})
		};
		if (options.nativeCompactionRequest) {
			if (nativeCompaction) {
				options.onNativeCompactionCapabilityUsed?.();
				return await nativeCompaction({
					...dispatchParams,
					nativeCompactionRequest: options.nativeCompactionRequest
				});
			}
			if (!harness.compact) return;
		}
		return await harness.compact?.(dispatchParams);
	});
}
//#endregion
//#region src/agents/embedded-agent-runner/compaction-successor.ts
/** Resolve a context engine's successor without letting it cross the active store binding. */
async function resolveContextEngineCompactionSuccessor(params) {
	const current = params.currentTarget;
	const result = params.result.result;
	const target = result?.sessionTarget;
	const successorId = target?.sessionId ?? result?.sessionId;
	const successorFile = result?.sessionFile;
	if (target) {
		if (result?.sessionId && target.sessionId && target.sessionId !== result.sessionId) throw new Error("Context-engine successor identity is inconsistent");
		const resolvedTarget = await resolveAgentRunSessionTarget({
			agentId: target.agentId ?? current.agentId,
			config: params.config,
			missingSessionKey: "resolve-existing",
			sessionId: target.sessionId ?? successorId ?? current.sessionId,
			sessionFile: successorFile,
			sessionKey: target.sessionKey ?? current.sessionKey,
			sessionTarget: {
				...target,
				storePath: target.storePath ?? current.storePath
			}
		});
		assertSameSessionBinding(current, resolvedTarget, "Context-engine");
		return {
			sessionId: resolvedTarget.sessionId,
			sessionFile: resolvedTarget.sessionKey,
			sessionTarget: {
				...resolvedTarget,
				...target.threadId !== void 0 ? { threadId: target.threadId } : {}
			}
		};
	}
	if (successorFile) {
		const marker = parseSqliteSessionFileMarker(successorFile);
		if (marker && (marker.agentId !== current.agentId || successorId && marker.sessionId !== successorId)) throw new Error("Legacy context-engine successor identity is inconsistent");
		const isSessionKey = successorFile.startsWith("agent:");
		const keyedEntry = isSessionKey ? loadSessionEntryReadOnly({
			agentId: current.agentId,
			sessionKey: successorFile,
			storePath: current.storePath
		}) : void 0;
		if (isSessionKey && (resolveAgentIdFromSessionKey(successorFile) !== current.agentId || !keyedEntry?.sessionId || successorId && keyedEntry.sessionId !== successorId)) throw new Error("Legacy context-engine successor identity is inconsistent");
		const keyedSessionId = isSessionKey ? successorId ?? keyedEntry?.sessionId : void 0;
		const retainedMarkerEntry = marker ? loadSessionEntryReadOnly({
			agentId: marker.agentId,
			sessionKey: current.sessionKey,
			storePath: marker.storePath
		}) : void 0;
		const markerMatches = marker ? listSessionEntriesReadOnly({
			agentId: marker.agentId,
			storePath: marker.storePath
		}).filter(({ entry }) => entry.sessionId === marker.sessionId) : [];
		const preferredMarkerSessionKey = marker ? resolvePreferredSessionKeyForSessionIdMatches(markerMatches.map(({ sessionKey, entry }) => [sessionKey, entry]), marker.sessionId) : void 0;
		const markerMappedToRetainedKey = markerMatches.some(({ sessionKey }) => sessionKey === current.sessionKey);
		const markerSessionKey = marker ? retainedMarkerEntry?.sessionId === marker.sessionId || retainedMarkerEntry?.sessionId === current.sessionId && (markerMatches.length === 0 || markerMappedToRetainedKey) ? current.sessionKey : preferredMarkerSessionKey ?? (markerMatches.length === 0 && !retainedMarkerEntry ? current.sessionKey : void 0) : void 0;
		const legacyTarget = marker ? markerSessionKey ? {
			...marker,
			sessionId: marker.sessionId,
			sessionKey: markerSessionKey
		} : void 0 : keyedSessionId ? {
			...current,
			sessionId: keyedSessionId,
			sessionKey: successorFile
		} : void 0;
		if (!legacyTarget) throw new Error("Legacy context-engine successor files are unsupported; return a structured sessionTarget");
		const resolvedTarget = await resolveAgentRunSessionTarget({
			agentId: legacyTarget.agentId,
			config: params.config,
			missingSessionKey: "resolve-existing",
			sessionId: legacyTarget.sessionId,
			sessionKey: legacyTarget.sessionKey,
			sessionTarget: legacyTarget
		});
		assertSameSessionBinding(current, resolvedTarget, "Legacy context-engine");
		return {
			sessionId: resolvedTarget.sessionId,
			sessionFile: marker ? formatSqliteSessionFileMarker(resolvedTarget) : resolvedTarget.sessionKey,
			sessionTarget: resolvedTarget
		};
	}
	return {
		sessionId: successorId ?? current.sessionId,
		sessionFile: params.currentSessionFile,
		sessionTarget: successorId ? {
			...current,
			sessionId: successorId
		} : current
	};
}
/** Accepts a declared successor under the predecessor's exact host-owned claim. */
async function acceptCompactionSuccessor(params) {
	const currentTarget = { ...params.currentTarget };
	const expected = { ...params.expectedEntry };
	const assertPlacement = captureSessionPlacementCompactionSuccessorAssertion();
	params.assertActive();
	if (currentTarget.sessionId !== expected.sessionId) throw new SessionTranscriptWriterClaimReboundError();
	const successor = await resolveContextEngineCompactionSuccessor({
		config: params.config,
		currentSessionFile: params.currentSessionFile ?? currentTarget.sessionKey,
		currentTarget,
		result: params.result
	});
	params.assertActive();
	const requireExpectedEntry = (entry) => {
		if (!entry || entry.sessionId !== expected.sessionId || entry.lifecycleRevision !== expected.lifecycleRevision || entry.activeWriterRunId !== expected.activeWriterRunId) throw new SessionTranscriptWriterClaimReboundError();
		return entry;
	};
	const previousEntry = requireExpectedEntry(loadSessionEntry({
		...currentTarget,
		readConsistency: "latest"
	}));
	if (successor.sessionId === currentTarget.sessionId) return {
		...successor,
		entry: previousEntry
	};
	if (!params.result.ok || !params.result.compacted) throw new Error("Cannot accept a successor without a successful completed compaction");
	const assertCommitAllowed = () => {
		params.assertActive();
		assertPlacement({
			currentTarget,
			successorSessionId: successor.sessionId
		});
	};
	assertCommitAllowed();
	let committed;
	try {
		await patchSessionEntryCore(currentTarget, (entry) => {
			requireExpectedEntry(entry);
			return { sessionId: successor.sessionId };
		}, {
			skipMaintenance: true,
			assertCommitAllowed,
			onCommitted: (entry) => {
				committed = {
					...successor,
					entry,
					previousSessionId: currentTarget.sessionId
				};
				params.onCommitted?.(committed);
			}
		});
		if (!committed) throw new SessionTranscriptWriterClaimReboundError();
		return committed;
	} catch (error) {
		if (!committed) {
			params.assertActive();
			throw error;
		}
		log$1.warn(`compaction successor committed but publication failed: ${String(error)}`);
		return committed;
	} finally {
		if (committed) await retireSessionMcpRuntime({
			sessionId: currentTarget.sessionId,
			reason: "compaction-session-end",
			retainAcrossReuse: true,
			preserveActiveLeases: true
		});
		if (committed && params.config) try {
			emitCompactionSessionLifecycleHooks({
				agentId: currentTarget.agentId,
				cfg: params.config,
				sessionKey: currentTarget.sessionKey,
				storePath: currentTarget.storePath,
				previousEntry,
				nextEntry: committed.entry
			});
		} catch (error) {
			log$1.warn(`compaction successor lifecycle notification failed: ${String(error)}`);
		}
	}
}
function emitCompactionSessionLifecycleHooks(params) {
	const agentId = params.agentId ?? resolveAgentIdFromSessionKey(params.sessionKey);
	if (params.previousEntry.sessionId) forgetActiveSessionForShutdown(params.previousEntry.sessionId);
	if (params.nextEntry.sessionId && params.storePath) noteActiveSessionForShutdown({
		cfg: params.cfg,
		sessionKey: params.sessionKey,
		sessionId: params.nextEntry.sessionId,
		storePath: params.storePath,
		sessionFile: params.sessionKey,
		agentId
	});
	const hookRunner = getGlobalHookRunner();
	if (!hookRunner) return;
	if (hookRunner.hasHooks("session_end")) {
		const storePath = agentId && params.storePath ? resolveSessionStorePathForScope({
			agentId,
			sessionKey: params.sessionKey,
			storePath: params.storePath
		}) : params.storePath;
		const transcript = resolveStableSessionEndTranscript({
			sessionId: params.previousEntry.sessionId,
			storePath,
			agentId
		});
		const payload = buildSessionEndHookPayload({
			sessionId: params.previousEntry.sessionId,
			sessionKey: params.sessionKey,
			agentId,
			reason: "compaction",
			sessionFile: transcript.sessionFile ?? (agentId && storePath ? formatSqliteSessionFileMarker({
				agentId,
				sessionId: params.previousEntry.sessionId,
				storePath
			}) : void 0),
			transcriptArchived: transcript.transcriptArchived,
			nextSessionId: params.nextEntry.sessionId
		});
		runWithGatewayDetachedWorkContinuation(async () => {
			await hookRunner.runSessionEnd(payload.event, payload.context);
		}, "hooks:session-end").catch((error) => {
			logVerbose(`session_end hook failed: ${String(error)}`);
		});
	}
	if (hookRunner.hasHooks("session_start")) {
		const payload = buildSessionStartHookPayload({
			sessionId: params.nextEntry.sessionId,
			sessionKey: params.sessionKey,
			agentId,
			resumedFrom: params.previousEntry.sessionId
		});
		runWithGatewayDetachedWorkContinuation(async () => {
			await hookRunner.runSessionStart(payload.event, payload.context);
		}, "hooks:session-start").catch((error) => {
			logVerbose(`session_start hook failed: ${String(error)}`);
		});
	}
}
function assertSameSessionBinding(currentTarget, successorTarget, label) {
	if (successorTarget.agentId !== currentTarget.agentId || successorTarget.sessionKey !== currentTarget.sessionKey || path.resolve(successorTarget.storePath) !== path.resolve(currentTarget.storePath)) throw new Error(`${label} successor target changed the active session binding`);
}
//#endregion
export { isRecoverableNativeHarnessBindingFailure as i, resolveContextEngineCompactionSuccessor as n, maybeCompactAgentHarnessSession as r, acceptCompactionSuccessor as t };
