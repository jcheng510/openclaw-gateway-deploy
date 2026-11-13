import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { a as resolveAgentDir } from "./agent-scope-config-Dm6T00l4.mjs";
import { r as resolveCollapsedSessionAuthPinSource } from "./auth-profile-override-provenance-DEDEMC3M.mjs";
import "./agent-scope-L_eY3Hj7.mjs";
import { t as modelKey } from "./model-key-Bn3_BG3H.mjs";
import { t as resolveDefaultModelForAgent } from "./model-selection-config-rcK5tFX8.mjs";
import { c as resolveContextConfigProviderForRuntime } from "./openai-routing-yzlBh98z.mjs";
import { o as resolveSystemEventQueueKey } from "./system-event-ownership-Bp0P_EZz.mjs";
import { i as enqueueSystemEvent } from "./system-events-DzT7qucG.mjs";
import { n as assertOperatorModelAllowed } from "./admitted-run-context-BL8yRX2D.mjs";
import { r as resolveOperatorModelDefault } from "./operator-model-policy-qe8TrXrY.mjs";
import { c as resolveSupportedThinkingLevel } from "./thinking-hj_KWR0q.mjs";
import "./model-selection-BAezv3YH.mjs";
import { o as resolveEffectiveAgentRuntime } from "./thinking-runtime-ZnTNCdix.mjs";
import { n as emitSessionLifecycleEvent } from "./session-lifecycle-events-Ded_zLM3.mjs";
import { s as isModelSelectionLocked, t as MODEL_SELECTION_LOCKED_MESSAGE } from "./model-overrides-h9qKlxn9.mjs";
import { t as resolveSessionWorkerPlacementContext } from "./session-worker-placement-context-ByNj7-Qn.mjs";
import { l as refreshQueuedFollowupSession } from "./state-D7Sqv4oU.mjs";
import "./queue-DC2hEEWL.mjs";
import { t as triggerSessionPatchHook } from "./session-patch-hooks-CPc2Elx3.mjs";
import { t as applyModelOverrideWithAuthProfileCompatibility } from "./auth-profile-preservation-ngRpHLoO.mjs";
import { n as createModelVisibilityPolicy } from "./model-visibility-policy-Co1eFIBD.mjs";
import { a as resolveWorkerPlacementSessionRuntimeCapabilities } from "./placement-session-runtime-C0kqyrmj.mjs";
import { t as persistStickyModelSelectionBestEffort } from "./sticky-model-selection-UpQpCkzx.mjs";
import { t as applyModelRuntimeDirective } from "./directive-handling.model-runtime-DDHp_tvm.mjs";
import { a as sessionModelOverrideChangesApplied, n as adoptPersistedSessionSnapshot, t as SESSION_MODEL_OVERRIDE_TRANSACTION_FIELDS } from "./session-snapshot-merge-DVwCWecn.mjs";
import { a as prepareModelSelectionRuntime, t as findSelectedCatalogEntry } from "./model-runtime-normalization-B6nVzQF3.mjs";
import { t as resolveContextTokens } from "./model-selection-context-CDbImXAy.mjs";
import { t as persistReplySessionEntry } from "./session-entry-persistence-ahBx_r09.mjs";
//#region src/model-picker/apply-session-model-selection.ts
/** Applies the model transaction field family to one caller-owned snapshot. */
function applySessionModelSelectionToEntry(params) {
	const modelChange = applyModelOverrideWithAuthProfileCompatibility({
		cfg: params.cfg,
		agentDir: params.agentDir,
		entry: params.entry,
		currentProvider: params.currentProvider,
		selection: params.request,
		explicitDefaultSelection: params.request.isDefault,
		profileOverride: params.request.profileOverride,
		markLiveSwitchPending: params.markLiveSwitchPending
	});
	const runtimeChange = applyModelRuntimeDirective(params.entry, params.runtime);
	return {
		changed: modelChange.updated || runtimeChange.updated,
		...params.runtime.kind === "clear" || params.runtime.kind === "set" ? { runtimeChange: params.runtime } : {}
	};
}
function formatModelSwitchEvent(provider, model, alias) {
	const label = `${provider}/${model}`;
	return alias ? `Model switched to ${alias} (${label}).` : `Model switched to ${label}.`;
}
function rejectNotAllowed(provider, model) {
	return {
		status: "rejected",
		reason: "not-allowed",
		message: `Model ${provider}/${model} is not available for this agent.`
	};
}
/**
* Rejects a model selection when the candidate runtime is incompatible with an
* active cloud-worker placement. Mirrors the sessions.patch guard so directive
* model changes are validated before they persist.
*/
function resolveActivePlacementModelSelectionError(params) {
	const sessionId = params.entry.sessionId;
	if (!sessionId) return;
	const placement = resolveSessionWorkerPlacementContext().workerSessionPlacementService?.getMany([sessionId]).get(sessionId);
	if (!placement || placement.state === "local") return;
	const { executionMode } = resolveWorkerPlacementSessionRuntimeCapabilities({
		cfg: params.cfg,
		entry: params.entry,
		agentId: params.agentId,
		sessionKey: params.sessionKey
	});
	if (executionMode === placement.executionMode) return;
	return executionMode ? `Session cannot change cloud placement execution mode while placement is ${placement.state}.` : `Session cannot select a runtime without cloud placement support while cloud worker placement is ${placement.state}.`;
}
/** Applies one validated picker selection to the authoritative live session. */
async function applySessionModelSelectionInternal(params) {
	const startingStoreEntry = params.sessionStore[params.sessionKey];
	const startingEntry = params.storePath ? params.sessionEntry : startingStoreEntry ?? params.sessionEntry;
	const initialEntry = { ...startingEntry };
	if (isModelSelectionLocked(startingEntry)) return {
		status: "rejected",
		reason: "locked",
		message: MODEL_SELECTION_LOCKED_MESSAGE
	};
	const operatorScope = params.operatorAuthority ? void 0 : (await import("./operator-invocation-authority-BT0zaBuM.mjs")).captureOperatorToolGatewayAuthority();
	const operatorAuthority = params.operatorAuthority ?? operatorScope?.authority;
	const resetToDefault = params.request.resetToDefault === true;
	const policy = params.modelPolicy ?? createModelVisibilityPolicy({
		cfg: params.cfg,
		catalog: [...params.modelCatalog],
		defaultProvider: params.defaultProvider,
		defaultModel: {
			provider: params.defaultProvider,
			model: params.defaultModel
		},
		agentId: params.agentId
	});
	const selectedRef = resetToDefault ? resolveOperatorModelDefault({
		cfg: params.cfg,
		agentId: params.agentId,
		policy: operatorAuthority?.modelPolicy,
		model: resolveDefaultModelForAgent({
			cfg: params.cfg,
			agentId: params.agentId
		}),
		allows: policy.allows
	}) : params.request;
	const validateOperatorSelection = () => {
		try {
			operatorScope?.assertCurrent();
			assertOperatorModelAllowed(operatorAuthority, selectedRef);
			return;
		} catch (error) {
			return formatErrorMessage(error);
		}
	};
	const operatorError = validateOperatorSelection();
	if (operatorError || !selectedRef) return {
		status: "rejected",
		reason: "not-allowed",
		message: operatorError ?? "No model is available for this operator role and agent."
	};
	const normalizedModelKey = modelKey(selectedRef.provider, selectedRef.model);
	const request = {
		...params.request,
		provider: selectedRef.provider,
		model: selectedRef.model,
		isDefault: resetToDefault || normalizedModelKey === modelKey(params.defaultProvider, params.defaultModel)
	};
	if (!resetToDefault && !policy.allows(request)) return rejectNotAllowed(request.provider, request.model);
	const prepared = await prepareModelSelectionRuntime({
		cfg: params.cfg,
		agentId: params.agentId,
		workspaceDir: startingEntry.spawnedWorkspaceDir,
		sessionEntry: startingEntry,
		profileOverride: request.profileOverride,
		provider: request.provider,
		model: request.model,
		catalog: params.thinkingCatalog ?? params.modelCatalog,
		rawRuntime: request.runtime.kind === "set" ? request.runtime.runtime : request.runtime.kind === "clear" ? "default" : void 0
	});
	if (prepared.status === "rejected") return prepared;
	const validateSelection = () => validateOperatorSelection() ?? params.validateAuthProfileSelection?.() ?? prepared.validateRuntimeSelection?.();
	const authProfileError = validateSelection();
	if (authProfileError) return {
		status: "rejected",
		reason: "not-allowed",
		message: authProfileError
	};
	const currentEntry = params.storePath ? startingEntry : params.sessionStore[params.sessionKey] ?? params.sessionEntry;
	if (isModelSelectionLocked(currentEntry)) return {
		status: "rejected",
		reason: "locked",
		message: MODEL_SELECTION_LOCKED_MESSAGE
	};
	if (!params.storePath && (params.sessionStore[params.sessionKey] !== startingStoreEntry || currentEntry.sessionId !== initialEntry.sessionId)) return {
		status: "conflict",
		message: "Model change was not applied because the session changed. Retry."
	};
	const runtime = prepared.runtime;
	const thinkingCatalog = prepared.catalog;
	const selectedCatalogEntry = findSelectedCatalogEntry({
		catalog: thinkingCatalog,
		...request
	});
	const nextEntry = { ...startingEntry };
	const applied = applySessionModelSelectionToEntry({
		cfg: params.cfg,
		agentDir: resolveAgentDir(params.cfg, params.agentId),
		entry: nextEntry,
		currentProvider: params.currentProvider,
		request,
		runtime,
		markLiveSwitchPending: params.markLiveSwitchPending
	});
	const thinkingRuntime = resolveEffectiveAgentRuntime({
		cfg: params.cfg,
		provider: request.provider,
		modelId: request.model,
		modelApi: selectedCatalogEntry?.api,
		modelBaseUrl: selectedCatalogEntry?.baseUrl,
		agentId: params.agentId,
		sessionKey: params.sessionKey,
		sessionEntry: nextEntry
	});
	const currentThinkingLevel = nextEntry.thinkingLevel;
	let thinkingRemap;
	if (currentThinkingLevel) {
		const remapped = resolveSupportedThinkingLevel({
			provider: request.provider,
			model: request.model,
			level: currentThinkingLevel,
			catalog: [...thinkingCatalog],
			agentRuntime: thinkingRuntime
		});
		if (remapped !== currentThinkingLevel) {
			nextEntry.thinkingLevel = remapped;
			thinkingRemap = {
				from: currentThinkingLevel,
				to: remapped,
				provider: request.provider,
				model: request.model
			};
		}
	}
	const placementError = resolveActivePlacementModelSelectionError({
		cfg: params.cfg,
		agentId: params.agentId,
		sessionKey: params.sessionKey,
		entry: nextEntry
	});
	if (placementError) return {
		status: "rejected",
		reason: "invalid-runtime",
		message: placementError
	};
	nextEntry.updatedAt = Date.now();
	let persistedEntry;
	const validateCommit = () => validateSelection() ?? resolveActivePlacementModelSelectionError({
		cfg: params.cfg,
		agentId: params.agentId,
		sessionKey: params.sessionKey,
		entry: nextEntry
	});
	if (params.storePath) {
		const persistence = await persistReplySessionEntry({
			storePath: params.storePath,
			sessionKey: params.sessionKey,
			initialEntry,
			entry: nextEntry,
			allowCreate: params.allowCreate,
			reassertLiveModelSwitchPending: applied.changed && nextEntry.liveModelSwitchPending === true,
			requireModelSelectionUnlocked: true,
			touchedFields: SESSION_MODEL_OVERRIDE_TRANSACTION_FIELDS,
			validateCommit
		});
		if (persistence.entry) {
			params.sessionStore[params.sessionKey] = persistence.entry;
			adoptPersistedSessionSnapshot(params.sessionEntry, persistence.entry);
		}
		if (persistence.status === "model-selection-locked") return {
			status: "rejected",
			reason: "locked",
			message: MODEL_SELECTION_LOCKED_MESSAGE
		};
		if (persistence.status === "commit-rejected") return {
			status: "rejected",
			reason: "not-allowed",
			message: persistence.error
		};
		if (persistence.status !== "current" || !sessionModelOverrideChangesApplied({
			initial: initialEntry,
			next: nextEntry,
			current: persistence.entry,
			reassertLiveModelSwitchPending: applied.changed && nextEntry.liveModelSwitchPending === true
		})) return {
			status: "conflict",
			message: "Model change was not applied because the session changed. Retry."
		};
		persistedEntry = persistence.entry;
	} else {
		const commitError = validateCommit();
		if (commitError) return {
			status: "rejected",
			reason: "not-allowed",
			message: commitError
		};
		adoptPersistedSessionSnapshot(params.sessionEntry, nextEntry);
		params.sessionStore[params.sessionKey] = params.sessionEntry;
		persistedEntry = params.sessionEntry;
	}
	const agentRuntime = resolveEffectiveAgentRuntime({
		cfg: params.cfg,
		provider: request.provider,
		modelId: request.model,
		modelApi: selectedCatalogEntry?.api,
		modelBaseUrl: selectedCatalogEntry?.baseUrl,
		agentId: params.agentId,
		sessionKey: params.sessionKey,
		sessionEntry: persistedEntry
	});
	const provider = request.provider;
	const model = request.model;
	const effectiveModelRef = `${provider}/${model}`;
	const changed = applied.changed || thinkingRemap !== void 0;
	operatorScope?.assertCurrent();
	assertOperatorModelAllowed(operatorAuthority, request);
	const configuredDefaultUpdate = params.canPersistStickyModelSelection === true && (!request.isDefault || params.stickyModelSelectionTarget) ? persistStickyModelSelectionBestEffort({
		agentId: params.agentId,
		model: effectiveModelRef,
		target: params.stickyModelSelectionTarget ?? "effective"
	}) : void 0;
	if (changed) {
		emitSessionLifecycleEvent({
			sessionKey: params.sessionKey,
			agentId: params.agentId,
			reason: "patch",
			catalogChanged: true
		});
		triggerSessionPatchHook({
			cfg: params.cfg,
			sessionEntry: persistedEntry,
			sessionKey: params.sessionKey,
			patch: {
				key: params.sessionKey,
				model: params.patchModel ?? effectiveModelRef
			}
		});
		refreshQueuedFollowupSession({
			key: params.sessionKey,
			nextProvider: provider,
			nextModel: model,
			nextRouteResolution: "resolved",
			nextModelOverrideSource: request.isDefault ? void 0 : "user",
			nextAuthProfileId: persistedEntry.authProfileOverride,
			nextAuthProfileIdSource: resolveCollapsedSessionAuthPinSource(persistedEntry),
			nextThinking: {
				level: persistedEntry.thinkingLevel,
				catalog: [...thinkingCatalog],
				agentRuntime
			}
		});
	}
	if (`${params.currentProvider}/${params.currentModel}` !== effectiveModelRef) enqueueSystemEvent(formatModelSwitchEvent(provider, model, request.alias), {
		sessionKey: resolveSystemEventQueueKey(params.sessionKey, params.agentId),
		contextKey: `model:${effectiveModelRef}`
	});
	const contextProvider = resolveContextConfigProviderForRuntime({
		provider,
		runtimeId: agentRuntime,
		config: params.cfg
	});
	return {
		status: "applied",
		provider,
		model,
		effectiveModelRef,
		agentRuntime,
		changed,
		contextTokens: resolveContextTokens({
			cfg: params.cfg,
			provider: contextProvider,
			model,
			modelContextWindow: selectedCatalogEntry?.contextWindow,
			modelContextTokens: selectedCatalogEntry?.contextTokens
		}),
		...configuredDefaultUpdate ? { configuredDefaultUpdate } : {},
		...applied.runtimeChange ? { runtimeChange: applied.runtimeChange } : {},
		...thinkingRemap ? { thinkingRemap } : {}
	};
}
//#endregion
export { applySessionModelSelectionInternal as t };
