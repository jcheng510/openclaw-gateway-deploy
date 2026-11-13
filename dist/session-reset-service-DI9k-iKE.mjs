import { l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import { i as resolveGlobalSingleton } from "./global-singleton-BfHBYj6Y.mjs";
import { r as truncateUtf16Safe } from "./utf16-slice-D_ngcYKd.mjs";
import { n as getInProcessGatewayRequestContext } from "./gateway-request-scope-Da9jAC9_.mjs";
import { i as getOrCreatePromise } from "./lazy-promise-DGqyc4Y4.mjs";
import { A as withTimeout } from "./fs-safe-CHQXnCPk.mjs";
import { n as sanitizeForLog } from "./ansi-6Z0Nu6M4.mjs";
import { t as _usingCtx } from "./usingCtx-DwOBYOJf.mjs";
import { n as normalizeAgentId } from "./agent-id-D1-Q6vR4.mjs";
import { a as resolveAgentDir, d as resolveAgentWorkspaceDir, p as resolveAmbientOwnerAgentId } from "./agent-scope-config-Dm6T00l4.mjs";
import { r as isIncognitoSessionKey } from "./session-key-DDIJxXfQ.mjs";
import { A as parseAgentSessionKey, S as isSubagentSessionKey } from "./session-key-BC4m_Ly5.mjs";
import { c as isRestartRecoveryTombstone, d as resolveSessionWorkStartError, t as SESSION_LIFECYCLE_CHANGED_ERROR_REASON } from "./lifecycle-DlS-bWdU.mjs";
import { i as listAgentIds } from "./agent-roster-B45JERT5.mjs";
import "./agent-scope-L_eY3Hj7.mjs";
import { l as getActivePluginRegistry } from "./runtime-BnZb2P5v.mjs";
import { t as ADMIN_SCOPE } from "./operator-scopes-D-CL26h0.mjs";
import { r as getRuntimeConfig } from "./io.runtime-BOdk1dW9.mjs";
import "./io-B18HRL9J.mjs";
import { r as logVerbose } from "./globals-ChjEJkWj.mjs";
import { t as getGlobalHookRunner } from "./hook-runner-global-CwCyBBBr.mjs";
import { C as runWithGatewayIndependentRootWorkContinuation } from "./gateway-work-admission-B4bQUVQ6.mjs";
import { t as ErrorCodes } from "./gateway-error-details-DIefe7Zy.mjs";
import { f as errorShape, p as missingScopeErrorShape } from "./error-codes-DI20vDEB.mjs";
import { l as resolveCreatorSandbox, n as authorizeGatewaySessionCreation } from "./operator-role-policy-Cx-TzI2k.mjs";
import { i as resetRegisteredAgentHarnessSessions } from "./registry-BDCa-WcD.mjs";
import { i as rebindCliSessionReseedReceiptsForReset, t as clearAllCliSessions } from "./cli-session-binding-Xt6nY3mk.mjs";
import { m as resolveMissingAgentHarnessSessionError } from "./agent-harness-session-key-BypxcwJ7.mjs";
import { n as acquireAgentRuntimeCleanupRegistries } from "./prepared-model-runtime-CiPCD0fr.mjs";
import { t as formatSqliteSessionFileMarker } from "./legacy-sqlite-marker-COPKCuIN.mjs";
import { n as buildSessionCreationStamp, o as preserveCreationStamp } from "./session-entry-provenance-BWZtrWXT.mjs";
import { d as hasOnlySessionLifecycleMutationKindActive, f as interruptSessionWorkAdmissions, g as runExclusiveSessionLifecycleMutation, m as isSessionLifecycleMutationActive, t as SESSION_WORK_ADMISSION_DRAIN_TIMEOUT_MS } from "./session-lifecycle-admission-6HF8YqSN.mjs";
import { v as projectPublicSessionEntry } from "./session-accessor.sqlite-transcript-write-CZkj18r-.mjs";
import { c as loadSessionEntryReadOnly, k as sessionEntryForkedFromParent } from "./session-accessor.sqlite-entry-C87Sde4p.mjs";
import "./session-accessor-CGLseszP.mjs";
import { c as invalidSessionRequest } from "./session-request-agent-DFWpsx2m.mjs";
import { i as resolveSessionStoreKey } from "./session-store-key-__CfQfd2.mjs";
import { i as resetSessionEntryLifecycle, r as deleteSessionEntryLifecycle } from "./session-accessor.sqlite-lifecycle-DMe8Z3DK.mjs";
import { r as MODEL_SELECTION_LOCKED_RESET_MESSAGE, s as isModelSelectionLocked } from "./model-overrides-h9qKlxn9.mjs";
import { a as handleSessionStateSessionDeleted, o as handleSessionStateSessionReset } from "./session-state-events-DxrQGYa3.mjs";
import { n as buildAcpDatabaseSessionKey } from "./session-meta-keys-Cf_DSUTp.mjs";
import { c as resolveAcpSessionTarget } from "./manager.utils-CzFesmEe.mjs";
import { c as createSupersededActorError, l as isAcpOwnerRepairRequired, n as getAcpSessionManager, o as getAcpSessionResetControls, s as tryPrepareFreshManagerRuntimeSession } from "./manager-B85OKKGa.mjs";
import { t as getAcpRuntimeBackend } from "./registry-xlVr1Zxc.mjs";
import { i as writeAcpSessionMetaForMigration, l as readAcpSessionMetaAsync, o as upsertAcpSessionMeta, u as listAcpSessionEntries } from "./session-meta-C-yU0zLz.mjs";
import "./sessions-Db5eEwNA.mjs";
import { t as getSessionBindingService } from "./session-binding-service-Cm-tIhAJ.mjs";
import { n as createInternalHookEvent, u as triggerInternalHook } from "./internal-hooks-C3e5o6Hw.mjs";
import { n as clearBootstrapSnapshotOnSessionBoundary, t as clearBootstrapSnapshot } from "./bootstrap-cache-DzgX-eHd.mjs";
import "./cli-session-CuXTit63.mjs";
import { c as resolveSessionWorkerPlacementMutationError, u as retireSessionWorkerPlacementBeforeMutation } from "./session-placement-lifecycle-BqtqNz6X.mjs";
import { t as resolveResetPreservedSelection } from "./reset-preserved-selection-Bqeladif.mjs";
import { n as resolveSessionModelRef } from "./session-model-ref-BOtRIEYy.mjs";
import { a as buildSessionStartHookPayload, i as buildSessionEndHookPayload, r as noteActiveSessionForShutdown, t as forgetActiveSessionForShutdown } from "./active-sessions-shutdown-tracker-DwvpHA5S.mjs";
import { s as resolveStableSessionEndTranscript } from "./session-transcript-files.fs-BRm2boSm.mjs";
import { o as resolveGatewaySessionStoreTarget } from "./session-utils-store-lookup-B0P8tI_m.mjs";
import { o as readSessionMessagesAsync } from "./session-transcript-readers-DuU1dcaM.mjs";
import { t as recordSessionCreated } from "./session-created-DvrOWezO.mjs";
import { a as managedWorktrees } from "./service-BaVf-s6B.mjs";
import { r as loadGatewaySessionEntry } from "./session-utils-store-DWiBeNMH.mjs";
import "./session-utils-FXsPIESl.mjs";
import { t as createSessionDiffBaselineCaptureClaim } from "./session-diff-baseline-capture-6ejBT0Am.mjs";
import { i as stopSessionResetSubagents, n as clearSessionResetRuntimeState, r as createSessionResetCleanupGuard, t as SessionResetCleanupError } from "./session-reset-cleanup-BdsHoNax.mjs";
import { t as cleanupBrowserSessionsForLifecycleEnd } from "./browser-lifecycle-cleanup-CGhOfsj7.mjs";
import { n as hasSessionAutoResetListeners, r as isSessionAutoResetReason, t as emitSessionAutoResetHook } from "./session-auto-reset-y6CYCkrr.mjs";
import { n as runPluginHostCleanup } from "./host-hook-cleanup-DPNlBYRW.mjs";
import { o as rollbackGatewaySessionPreparation, s as settleGatewaySessionLifecycleCommit } from "./session-lifecycle-preparation-CbUFNvEO.mjs";
import { t as resolvePluginSessionOwnershipError } from "./session-plugin-ownership-BsAflZdC.mjs";
import { t as notifyGatewaySessionReset } from "./session-reset-notifications-D-4emC7p.mjs";
import { randomUUID } from "node:crypto";
import { cleanupSessionResources } from "@openclaw/ai/internal/runtime";
//#region src/gateway/session-reset-acp.ts
const ACP_RUNTIME_CLEANUP_TIMEOUT_MS = 15e3;
async function runAcpCleanupStep(op) {
	let timer;
	const timeoutPromise = new Promise((resolve) => {
		timer = setTimeout(() => resolve({ status: "timeout" }), ACP_RUNTIME_CLEANUP_TIMEOUT_MS);
	});
	const opPromise = op().then(() => ({ status: "ok" })).catch((error) => ({
		status: "error",
		error
	}));
	const outcome = await Promise.race([opPromise, timeoutPromise]);
	if (timer) clearTimeout(timer);
	return outcome;
}
async function closeAcpRuntimeForSession(params) {
	if (params.shouldCleanup && !params.shouldCleanup()) return;
	params.assertCurrent?.();
	const sessionKeys = Array.from(new Set([params.sessionKey, ...params.fallbackSessionKeys ?? []].map((key) => typeof key === "string" ? key.trim() : "").filter(Boolean)));
	let acpMeta;
	let acpSessionKey = params.sessionKey;
	for (const sessionKey of sessionKeys) {
		acpMeta = await readAcpSessionMetaAsync({
			sessionKey,
			agentId: params.agentId,
			cfg: params.cfg,
			assertCurrent: params.assertCurrent
		});
		params.assertCurrent?.();
		if (params.shouldCleanup && !params.shouldCleanup()) return;
		if (acpMeta) {
			acpSessionKey = sessionKey;
			break;
		}
	}
	if (!acpMeta) return;
	const acpManager = getAcpSessionManager();
	if (params.shouldCleanup && !params.shouldCleanup()) return;
	params.assertCurrent?.();
	const resetControls = getAcpSessionResetControls(acpManager);
	const ownership = resetControls.captureSessionRuntimeOwnership({
		cfg: params.cfg,
		sessionKey: acpSessionKey,
		agentId: params.agentId
	});
	try {
		const cancelOutcome = await runAcpCleanupStep(async () => {
			await acpManager.cancelSession({
				cfg: params.cfg,
				sessionKey: acpSessionKey,
				agentId: params.agentId,
				reason: params.reason
			});
		});
		if (params.shouldCleanup && !params.shouldCleanup()) return;
		params.assertCurrent?.();
		if (cancelOutcome.status === "timeout") await resetControls.forceDiscardSessionRuntime({
			cfg: params.cfg,
			sessionKey: acpSessionKey,
			agentId: params.agentId,
			reason: params.reason,
			isCurrent: ownership.isCurrent,
			assertCurrent: params.assertCurrent
		});
		if (cancelOutcome.status === "error" && isAcpOwnerRepairRequired(cancelOutcome.error)) return errorShape(ErrorCodes.UNAVAILABLE, String(cancelOutcome.error));
		if (cancelOutcome.status === "error") logVerbose(`sessions.${params.reason}: ACP cancel failed for ${params.sessionKey}: ${String(cancelOutcome.error)}`);
		if (params.shouldCleanup && !params.shouldCleanup()) return;
		params.assertCurrent?.();
		const closeOutcome = cancelOutcome.status === "timeout" ? { status: "ok" } : await runAcpCleanupStep(async () => {
			await acpManager.closeSession({
				cfg: params.cfg,
				sessionKey: acpSessionKey,
				agentId: params.agentId,
				reason: params.reason,
				discardPersistentState: true,
				requireAcpSession: false,
				allowBackendUnavailable: true
			});
		});
		if (params.shouldCleanup && !params.shouldCleanup()) return;
		params.assertCurrent?.();
		if (closeOutcome.status === "timeout") await resetControls.forceDiscardSessionRuntime({
			cfg: params.cfg,
			sessionKey: acpSessionKey,
			agentId: params.agentId,
			reason: params.reason,
			isCurrent: ownership.isCurrent,
			assertCurrent: params.assertCurrent
		});
		if (closeOutcome.status === "error" && isAcpOwnerRepairRequired(closeOutcome.error)) return errorShape(ErrorCodes.UNAVAILABLE, String(closeOutcome.error));
		if (closeOutcome.status === "error") logVerbose(`sessions.${params.reason}: ACP runtime close failed for ${params.sessionKey}: ${String(closeOutcome.error)}`);
		if (params.reason === "session-delete") {
			params.assertCurrent?.();
			await upsertAcpSessionMeta({
				cfg: params.cfg,
				sessionKey: acpSessionKey,
				agentId: params.agentId,
				assertCommitAllowed: params.assertCurrent,
				mutate: () => null
			});
			params.assertCurrent?.();
		} else if (params.deferResetState) params.onDeferredResetState?.({
			sessionKey: acpSessionKey,
			meta: acpMeta
		});
		else {
			const resetMeta = await ensureFreshAcpResetState({
				cfg: params.cfg,
				sessionKey: acpSessionKey,
				agentId: params.agentId,
				reason: params.reason,
				acpMeta,
				assertCurrent: params.assertCurrent,
				shouldApply: params.shouldCleanup
			});
			if (resetMeta) params.onResetMeta?.({
				sessionKey: acpSessionKey,
				meta: resetMeta
			});
		}
		return;
	} finally {
		ownership.release();
	}
}
async function closeChildAcpRuntimesForParent(params) {
	let children;
	try {
		if (params.shouldCleanup && !params.shouldCleanup()) return;
		params.assertCurrent?.();
		children = (await listAcpSessionEntries({ cfg: params.cfg })).filter(({ entry, sessionKey }) => {
			if (!entry || entry.spawnedBy !== params.parentKey && entry.parentSessionKey !== params.parentKey) return false;
			const requesterAgentId = entry.createdVia === "spawn" && entry.createdActor?.type === "agent" ? entry.createdActor.id : parseAgentSessionKey(params.parentKey)?.agentId;
			try {
				if (!requesterAgentId) throw new Error("ACP parent ownership is not recorded for this unqualified key");
				return resolveAcpSessionTarget({
					cfg: params.cfg,
					sessionKey: params.parentKey,
					agentId: requesterAgentId
				}).agentId === params.parentAgentId;
			} catch (error) {
				logVerbose(`sessions.${params.reason}: retained ACP child ${sessionKey} because parent ownership could not be proven: ${String(error)}`);
				return false;
			}
		});
	} catch (error) {
		logVerbose(`sessions.${params.reason}: failed to enumerate sessions for child ACP cleanup: ${String(error)}`);
		return;
	}
	if (params.shouldCleanup && !params.shouldCleanup()) return;
	params.assertCurrent?.();
	await Promise.allSettled(children.map(({ sessionKey, agentId }) => closeAcpRuntimeForSession({
		cfg: params.cfg,
		sessionKey,
		agentId,
		reason: params.reason,
		assertCurrent: params.assertCurrent,
		shouldCleanup: params.shouldCleanup
	}).then((childError) => {
		if (childError) logVerbose(`sessions.${params.reason}: child ACP cleanup incomplete for ${sessionKey}`);
	})));
	if (params.shouldCleanup && !params.shouldCleanup()) return;
	params.assertCurrent?.();
}
function buildPendingAcpMeta(base, now) {
	const currentIdentity = base.identity;
	return {
		backend: base.backend,
		agent: base.agent,
		runtimeSessionName: base.runtimeSessionName,
		identity: {
			state: "pending",
			...currentIdentity?.acpxRecordId ? { acpxRecordId: currentIdentity.acpxRecordId } : {},
			source: currentIdentity ? currentIdentity.source : "ensure",
			lastUpdatedAt: now
		},
		mode: base.mode,
		...base.runtimeOptions ? { runtimeOptions: base.runtimeOptions } : {},
		...base.cwd ? { cwd: base.cwd } : {},
		state: "idle",
		lastActivityAt: now
	};
}
async function ensureFreshAcpResetState(params) {
	if (params.reason !== "session-reset") return;
	const latestMeta = await readAcpSessionMetaAsync({
		sessionKey: params.sessionKey,
		agentId: params.agentId,
		cfg: params.cfg,
		assertCurrent: params.assertCurrent
	}) ?? params.acpMeta;
	params.assertCurrent?.();
	if (params.shouldApply && !params.shouldApply()) return;
	if (!latestMeta?.identity || latestMeta.identity.state !== "resolved" || !latestMeta.identity.acpxSessionId && !latestMeta.identity.agentSessionId) return;
	await tryPrepareFreshManagerRuntimeSession({
		deps: { getRuntimeBackend: getAcpRuntimeBackend },
		cfg: params.cfg,
		meta: latestMeta,
		...resolveAcpSessionTarget(params),
		logPrefix: `sessions.${params.reason}`
	});
	if (params.shouldApply && !params.shouldApply()) return;
	params.assertCurrent?.();
	const now = Date.now();
	let resetMeta;
	if (params.shouldApply && !params.shouldApply()) return;
	params.assertCurrent?.();
	const assertCommitAllowed = () => {
		params.assertCurrent?.();
		if (params.shouldApply && !params.shouldApply()) throw createSupersededActorError(params.sessionKey);
	};
	await upsertAcpSessionMeta({
		cfg: params.cfg,
		sessionKey: params.sessionKey,
		agentId: params.agentId,
		assertCommitAllowed,
		mutate: (current) => {
			assertCommitAllowed();
			resetMeta = buildPendingAcpMeta(current ?? latestMeta, now);
			return resetMeta;
		}
	});
	params.assertCurrent?.();
	return resetMeta;
}
//#endregion
//#region src/gateway/session-reset-incognito.ts
/** The caller retains the reset lifecycle fence through deletion and its notifications. */
async function deleteIncognitoSessionForReset(params) {
	const terminalDrain = getInProcessGatewayRequestContext()?.terminalSessions?.beginAgentSessionDrain({
		kind: "agent",
		agentSessionKey: params.target.canonicalKey,
		agentSessionId: params.entry.sessionId,
		agentId: params.agentId
	});
	try {
		if (terminalDrain) try {
			await withTimeout(terminalDrain.drained, SESSION_WORK_ADMISSION_DRAIN_TIMEOUT_MS, "agent terminal lifecycle drain");
		} catch {
			return {
				ok: false,
				error: errorShape(ErrorCodes.UNAVAILABLE, `Session ${params.key} terminals are still active; try again in a moment.`)
			};
		}
		await params.beforeDelete();
		const deleted = await deleteSessionEntryLifecycle({
			commitGuard: params.commitGuard,
			agentId: params.agentId,
			archiveTranscript: false,
			deleteDeliveryArtifacts: true,
			deleteTranscriptWithoutArchive: true,
			expectedEntry: params.entry,
			expectedSessionId: params.entry.sessionId,
			expectedUpdatedAt: params.entry.updatedAt,
			storePath: params.storePath,
			target: params.target
		});
		if (!deleted.deleted) return {
			ok: false,
			error: errorShape(ErrorCodes.UNAVAILABLE, `Session ${params.key} changed before reset. Retry.`)
		};
		return {
			ok: true,
			value: { deletedSessionId: deleted.deletedSessionId }
		};
	} finally {
		terminalDrain?.release();
	}
}
//#endregion
//#region src/gateway/session-reset-transcript.ts
async function readGatewayBeforeResetPluginHookMessages(params) {
	if (typeof params.sessionId !== "string" || params.sessionId.trim().length === 0) return [];
	try {
		return await readSessionMessagesAsync({
			agentId: params.agentId,
			sessionEntry: params.entry,
			sessionId: params.sessionId,
			sessionKey: params.sessionKey,
			storePath: params.storePath
		}, {
			mode: "full",
			reason: "before_reset hook payload"
		});
	} catch (err) {
		logVerbose(`before_reset: failed to read session messages for ${params.sessionId}; firing hook with empty messages (${String(err)})`);
		return [];
	}
}
//#endregion
//#region src/gateway/session-reset-service.ts
function resolveLifecycleAgentId(cfg, agentId) {
	return normalizeAgentId(agentId ?? resolveAmbientOwnerAgentId(cfg));
}
async function resetSessionAgentHarnesses(params) {
	try {
		var _usingCtx$1 = _usingCtx();
		const agentId = resolveLifecycleAgentId(params.cfg, params.target.agentId);
		const sessionKey = params.target.canonicalKey ?? params.key;
		params.assertCurrent?.();
		const owners = _usingCtx$1.a(await acquireAgentRuntimeCleanupRegistries(resolveAgentDir(params.cfg, agentId)));
		params.assertCurrent?.();
		await resetRegisteredAgentHarnessSessions({
			agentId,
			sessionId: params.entry.sessionId,
			sessionKey,
			sessionFile: sessionKey,
			reason: params.reason
		}, owners.registries);
		params.assertCurrent?.();
	} catch (_) {
		_usingCtx$1.e = _;
	} finally {
		await _usingCtx$1.d();
	}
}
const mcpRunEndWatcherState = resolveGlobalSingleton(Symbol.for("openclaw.mcpRunEndWatchers"), () => ({
	cancellations: /* @__PURE__ */ new Map(),
	retirements: /* @__PURE__ */ new Set(),
	watchers: /* @__PURE__ */ new Map()
}), async (state) => {
	for (const cancel of state.cancellations.values()) cancel();
	await Promise.allSettled([...state.watchers.values(), ...state.retirements]);
	state.cancellations.clear();
	state.retirements.clear();
	state.watchers.clear();
});
const mcpRunEndWatchers = mcpRunEndWatcherState.watchers;
function emitGatewaySessionEndPluginHook(params) {
	if (!params.sessionId) return;
	forgetActiveSessionForShutdown(params.sessionId);
	const hookRunner = getGlobalHookRunner();
	const shouldEmitAutoReset = isSessionAutoResetReason(params.reason) && hasSessionAutoResetListeners();
	const shouldEmitPluginHook = hookRunner?.hasHooks("session_end") === true;
	if (!shouldEmitAutoReset && !shouldEmitPluginHook) return;
	const transcript = resolveStableSessionEndTranscript({
		sessionId: params.sessionId,
		storePath: params.storePath,
		sessionFile: params.sessionFile,
		agentId: params.agentId,
		archivedTranscripts: params.archivedTranscripts
	});
	if (shouldEmitAutoReset) emitSessionAutoResetHook({
		cfg: params.cfg,
		sessionId: params.sessionId,
		sessionKey: params.sessionKey,
		reason: params.reason,
		sessionFile: transcript.sessionFile,
		transcriptArchived: transcript.transcriptArchived,
		nextSessionId: params.nextSessionId,
		nextSessionKey: params.nextSessionKey,
		agentId: params.agentId,
		workspaceDir: params.workspaceDir,
		storePath: params.storePath
	});
	if (!shouldEmitPluginHook) return;
	if (!hookRunner) return;
	const payload = buildSessionEndHookPayload({
		sessionId: params.sessionId,
		sessionKey: params.sessionKey,
		agentId: params.agentId,
		reason: params.reason,
		sessionFile: transcript.sessionFile,
		transcriptArchived: transcript.transcriptArchived,
		nextSessionId: params.nextSessionId,
		nextSessionKey: params.nextSessionKey
	});
	runWithGatewayIndependentRootWorkContinuation(async () => {
		await hookRunner.runSessionEnd(payload.event, payload.context);
	}, "hooks:session-end").catch((err) => {
		logVerbose(`session_end hook failed: ${String(err)}`);
	});
}
function emitGatewaySessionStartPluginHook(params) {
	if (!params.sessionId) return;
	if (params.storePath) noteActiveSessionForShutdown({
		cfg: params.cfg,
		sessionKey: params.sessionKey,
		sessionId: params.sessionId,
		storePath: params.storePath,
		sessionFile: params.sessionFile,
		agentId: params.agentId
	});
	const hookRunner = getGlobalHookRunner();
	if (!hookRunner?.hasHooks("session_start")) return;
	const payload = buildSessionStartHookPayload({
		sessionId: params.sessionId,
		sessionKey: params.sessionKey,
		agentId: params.agentId,
		resumedFrom: params.resumedFrom
	});
	runWithGatewayIndependentRootWorkContinuation(async () => {
		await hookRunner.runSessionStart(payload.event, payload.context);
	}, "hooks:session-start").catch((err) => {
		logVerbose(`session_start hook failed: ${String(err)}`);
	});
}
async function emitSessionUnboundLifecycleEvent(params) {
	const targetKind = isSubagentSessionKey(params.targetSessionKey) ? "subagent" : "acp";
	await getSessionBindingService().unbind({
		targetSessionKey: params.targetSessionKey,
		reason: params.reason
	});
	if (params.emitHooks === false) return;
	const hookRunner = getGlobalHookRunner();
	if (!hookRunner?.hasHooks("subagent_ended")) return;
	await hookRunner.runSubagentEnded({
		targetSessionKey: params.targetSessionKey,
		targetKind,
		reason: params.reason,
		sendFarewell: true,
		outcome: params.reason === "session-reset" ? "reset" : "deleted"
	}, { childSessionKey: params.targetSessionKey });
}
async function ensureSessionRuntimeCleanup(params) {
	const assertCurrent = createSessionResetCleanupGuard({
		storePath: params.target.storePath,
		sessionKey: params.target.canonicalKey,
		expectedSession: params.sessionId ? {
			sessionId: params.sessionId,
			lifecycleRevision: params.sessionLifecycleRevision
		} : void 0,
		assertCurrent: params.assertCurrent
	});
	const [embeddedAgent, mcpTools, { clearFinishedSessionsForScopes }] = await Promise.all([
		import("./runs-BNGdq2-c.mjs"),
		import("./agent-bundle-mcp-tools-CkKSnI5u.mjs"),
		import("./bash-process-registry-BQE8aazs.mjs")
	]);
	const closeTrackedBrowserTabs = async () => {
		assertCurrent();
		const closeKeys = /* @__PURE__ */ new Set([
			params.key,
			params.target.canonicalKey,
			...params.target.storeKeys,
			params.sessionId ?? ""
		]);
		await cleanupBrowserSessionsForLifecycleEnd({
			cfg: params.cfg,
			sessionKeys: [...closeKeys],
			onWarn: (message) => logVerbose(message)
		});
		assertCurrent();
	};
	try {
		assertCurrent();
		await stopSessionResetSubagents({
			cfg: params.cfg,
			sessionKey: params.target.canonicalKey,
			agentId: resolveLifecycleAgentId(params.cfg, params.target.agentId),
			assertCurrent
		});
	} catch (error) {
		if (error instanceof SessionResetCleanupError) return errorShape(ErrorCodes.UNAVAILABLE, error.message);
		throw error;
	}
	assertCurrent();
	const queueKeys = new Set(params.target.storeKeys);
	queueKeys.add(params.target.canonicalKey);
	if (params.sessionId) queueKeys.add(params.sessionId);
	const processScopeKeys = new Set(queueKeys);
	processScopeKeys.add(params.key);
	clearFinishedSessionsForScopes(processScopeKeys);
	clearSessionResetRuntimeState([...queueKeys], {
		activeReplySessionId: params.sessionId,
		agentId: resolveLifecycleAgentId(params.cfg, params.target.agentId)
	});
	if (!params.sessionId) {
		assertCurrent();
		clearBootstrapSnapshot(params.target.canonicalKey);
		await closeTrackedBrowserTabs();
		return;
	}
	const sessionId = params.sessionId;
	assertCurrent();
	const cleanupProviderResources = () => {
		try {
			cleanupSessionResources(sessionId);
		} catch (error) {
			logVerbose(`sessions cleanup: failed to dispose provider resources for ${sessionId}: ${String(error)}`);
		}
	};
	const retireMcpRuntime = async (retainAcrossReuse) => {
		await mcpTools.retireSessionMcpRuntime({
			sessionId,
			reason: "gateway-session-cleanup",
			preserveActiveLeases: true,
			retainAcrossReuse,
			onError: (error, retiredSessionId) => {
				logVerbose(`sessions cleanup: failed to dispose bundle MCP runtime for ${retiredSessionId}: ${String(error)}`);
			}
		});
	};
	const ensureMcpRetirementWatcher = () => {
		return getOrCreatePromise(mcpRunEndWatchers, sessionId, async () => {
			let cancelWatcher = () => {};
			const cancelled = new Promise((resolve) => {
				cancelWatcher = () => resolve(false);
			});
			mcpRunEndWatcherState.cancellations.set(sessionId, cancelWatcher);
			try {
				while (await Promise.race([embeddedAgent.waitForEmbeddedAgentRunEnd(sessionId, null), cancelled])) {
					if (embeddedAgent.isEmbeddedAgentRunActive(sessionId)) continue;
					const retirement = retireMcpRuntime(false);
					mcpRunEndWatcherState.retirements.add(retirement);
					try {
						await retirement;
					} finally {
						mcpRunEndWatcherState.retirements.delete(retirement);
					}
					if (embeddedAgent.isEmbeddedAgentRunActive(sessionId)) continue;
					cleanupProviderResources();
					return;
				}
			} catch (error) {
				logVerbose(`sessions cleanup: failed to disarm deferred MCP retirement: ${String(error)}`);
			} finally {
				if (mcpRunEndWatcherState.cancellations.get(sessionId) === cancelWatcher) mcpRunEndWatcherState.cancellations.delete(sessionId);
			}
		}, { evictOnSettled: true });
	};
	const mcpRetirementWatcher = ensureMcpRetirementWatcher();
	embeddedAgent.abortEmbeddedAgentRun(sessionId);
	await retireMcpRuntime(true);
	const ended = await embeddedAgent.waitForEmbeddedAgentRunEnd(sessionId, 15e3);
	assertCurrent();
	await retireMcpRuntime(!ended);
	assertCurrent();
	clearBootstrapSnapshot(params.target.canonicalKey);
	if (ended && !embeddedAgent.isEmbeddedAgentRunActive(sessionId)) {
		assertCurrent();
		mcpRunEndWatcherState.cancellations.get(sessionId)?.();
		await mcpRetirementWatcher;
		assertCurrent();
		cleanupProviderResources();
		await closeTrackedBrowserTabs();
		return;
	}
	return errorShape(ErrorCodes.UNAVAILABLE, `Session ${params.key} is still active; try again in a moment.`);
}
async function cleanupSessionBeforeMutation(params) {
	const cleanupError = await ensureSessionRuntimeCleanup({
		cfg: params.cfg,
		key: params.key,
		target: params.target,
		sessionId: params.entry?.sessionId,
		sessionLifecycleRevision: params.entry?.lifecycleRevision,
		assertCurrent: params.assertCurrent
	});
	if (cleanupError) return cleanupError;
	const pluginCleanup = await runPluginHostCleanup({
		cfg: params.cfg,
		registry: getActivePluginRegistry(),
		reason: params.reason === "session-reset" ? "reset" : "delete",
		sessionKey: params.target.canonicalKey ?? params.key,
		sessionStoreTargets: [params.target],
		shouldCleanup: () => {
			params.assertCurrent?.();
			return true;
		}
	});
	params.assertCurrent?.();
	for (const failure of pluginCleanup.failures) logVerbose(`plugin host cleanup failed for ${failure.pluginId}/${failure.hookId}: ${String(failure.error)}`);
	const parentSessionKey = params.target.canonicalKey ?? params.canonicalKey ?? params.key;
	const parentAcpError = await closeAcpRuntimeForSession({
		cfg: params.cfg,
		sessionKey: parentSessionKey,
		agentId: params.target.agentId,
		fallbackSessionKeys: [
			params.canonicalKey,
			params.legacyKey,
			params.key
		],
		reason: params.reason,
		onResetMeta: params.onAcpResetMeta,
		assertCurrent: params.assertCurrent
	});
	params.assertCurrent?.();
	await closeChildAcpRuntimesForParent({
		cfg: params.cfg,
		parentKey: params.target.canonicalKey ?? params.canonicalKey ?? params.key,
		parentAgentId: params.target.agentId,
		reason: params.reason,
		assertCurrent: params.assertCurrent
	});
	params.assertCurrent?.();
	if (parentAcpError) return parentAcpError;
	if (params.entry?.sessionId) {
		await resetSessionAgentHarnesses({
			cfg: params.cfg,
			key: params.key,
			target: params.target,
			entry: params.entry,
			reason: params.reason === "session-reset" ? "reset" : "deleted",
			assertCurrent: params.assertCurrent
		});
		params.assertCurrent?.();
	}
}
async function emitGatewayBeforeResetPluginHook(params) {
	const hookRunner = getGlobalHookRunner();
	if (!hookRunner?.hasHooks("before_reset")) return;
	const sessionKey = params.target.canonicalKey ?? params.key;
	const sessionId = params.entry?.sessionId;
	const agentId = resolveLifecycleAgentId(params.cfg, params.target.agentId);
	const sessionFile = sessionId ? formatSqliteSessionFileMarker({
		agentId,
		sessionId,
		storePath: params.storePath
	}) : void 0;
	const workspaceDir = resolveAgentWorkspaceDir(params.cfg, agentId);
	const messages = params.messages ?? await readGatewayBeforeResetPluginHookMessages({
		agentId,
		entry: params.entry,
		sessionId,
		sessionKey,
		storePath: params.storePath
	});
	hookRunner.runBeforeReset({
		sessionFile,
		messages,
		reason: params.reason
	}, {
		agentId,
		sessionKey,
		sessionId,
		workspaceDir
	}).catch((err) => {
		logVerbose(`before_reset hook failed: ${String(err)}`);
	});
}
async function performGatewaySessionReset(params) {
	const resetTarget = (() => {
		const cfg = getRuntimeConfig();
		const explicitAgentId = params.agentId ? normalizeAgentId(params.agentId) : void 0;
		const parsedKey = parseAgentSessionKey(params.key);
		const inferredGlobalAgentId = !explicitAgentId && parsedKey && resolveSessionStoreKey({
			cfg,
			sessionKey: params.key
		}) === "global" ? normalizeAgentId(parsedKey.agentId) : void 0;
		const requestedAgentId = explicitAgentId ?? inferredGlobalAgentId;
		if (requestedAgentId && !listAgentIds(cfg).includes(requestedAgentId)) return invalidSessionRequest(`Unknown agent id: ${requestedAgentId}`);
		if (explicitAgentId && parsedKey?.agentId && normalizeAgentId(parsedKey.agentId) !== explicitAgentId) return invalidSessionRequest("session key agent does not match agentId");
		const target = resolveGatewaySessionStoreTarget({
			cfg,
			key: params.key,
			...requestedAgentId ? { agentId: requestedAgentId } : {}
		});
		return {
			ok: true,
			cfg,
			target,
			storePath: target.storePath,
			requestedAgentId
		};
	})();
	if (!resetTarget.ok) return resetTarget;
	const authorizeResetCreation = () => authorizeGatewaySessionCreation({
		cfg: resetTarget.cfg,
		agentId: resetTarget.target.agentId,
		...params.operatorRoleActor ? { actor: params.operatorRoleActor } : { profileId: params.requestingOperatorProfileId }
	});
	const reportLifecycleCleanupError = (error) => {
		if (params.onLifecycleCleanupError) {
			params.onLifecycleCleanupError(error);
			return;
		}
		logVerbose(`session lifecycle resource cleanup failed: ${String(error)}`);
	};
	const initialResetEntry = loadGatewaySessionEntry(params.key, resetTarget.requestedAgentId ? { agentId: resetTarget.requestedAgentId } : void 0).entry;
	const expectedSessionMatches = (entry) => params.expectedSessionId === void 0 || entry?.sessionId === params.expectedSessionId;
	const sessionChangedError = () => errorShape(ErrorCodes.INVALID_REQUEST, `Session ${params.key} changed before reset. Retry.`, { details: { reason: SESSION_LIFECYCLE_CHANGED_ERROR_REASON } });
	if (!expectedSessionMatches(initialResetEntry)) return {
		ok: false,
		error: sessionChangedError()
	};
	if (!initialResetEntry) {
		const creationError = authorizeResetCreation();
		if (creationError) return {
			ok: false,
			error: creationError
		};
	}
	const initialOwnershipError = resolvePluginSessionOwnershipError({
		action: "reset",
		entry: initialResetEntry,
		key: resetTarget.target.canonicalKey,
		pluginOwnerId: params.authorizedPluginId
	});
	if (initialOwnershipError) return {
		ok: false,
		error: initialOwnershipError
	};
	const resolveFastModeSelectionError = (entry) => {
		const selection = params.fastModeSelection;
		return entry && selection && selection.value !== entry.fastMode && !selection.allowExistingChange ? missingScopeErrorShape({
			missingScope: ADMIN_SCOPE,
			requiredScopes: [ADMIN_SCOPE]
		}) : void 0;
	};
	const initialFastModeSelectionError = resolveFastModeSelectionError(initialResetEntry);
	if (initialFastModeSelectionError) return {
		ok: false,
		error: initialFastModeSelectionError
	};
	const missingHarnessSessionError = resolveMissingAgentHarnessSessionError(resetTarget.target.canonicalKey, initialResetEntry);
	if (missingHarnessSessionError) return invalidSessionRequest(missingHarnessSessionError);
	if (isModelSelectionLocked(initialResetEntry)) return invalidSessionRequest(MODEL_SELECTION_LOCKED_RESET_MESSAGE);
	const workerPlacementContext = params.workerPlacementContext ?? (await import("./session-worker-placement-context-CqxxYsTp.mjs")).resolveSessionWorkerPlacementContext();
	const resolveResetEntryStateError = (entry, canonicalKey) => {
		const placementError = resolveSessionWorkerPlacementMutationError({
			action: "reset",
			context: workerPlacementContext,
			key: params.key,
			sessionId: normalizeOptionalString(entry?.sessionId)
		});
		if (placementError) return errorShape(ErrorCodes.INVALID_REQUEST, placementError.message);
		const archivedSessionError = resolveSessionWorkStartError(canonicalKey, entry, {
			allowPendingWorkspace: true,
			allowRestartTombstoneReplacement: entry !== void 0 && entry.archivedAt === void 0 && isRestartRecoveryTombstone(entry)
		});
		if (archivedSessionError) return errorShape(ErrorCodes.INVALID_REQUEST, archivedSessionError);
		if (isModelSelectionLocked(entry)) return errorShape(ErrorCodes.INVALID_REQUEST, MODEL_SELECTION_LOCKED_RESET_MESSAGE);
		if (!entry && isIncognitoSessionKey(resetTarget.target.canonicalKey)) return errorShape(ErrorCodes.INVALID_REQUEST, `unknown session: ${params.key}`);
	};
	const initialPlacementError = resolveSessionWorkerPlacementMutationError({
		action: "reset",
		context: workerPlacementContext,
		key: params.key,
		sessionId: normalizeOptionalString(initialResetEntry?.sessionId)
	});
	if (initialPlacementError) return invalidSessionRequest(initialPlacementError.message);
	const resetLifecycleIdentities = [
		resetTarget.target.canonicalKey,
		params.key,
		initialResetEntry?.sessionId
	];
	const activeLifecycleMutation = isSessionLifecycleMutationActive(resetTarget.storePath, resetLifecycleIdentities);
	const activeCompaction = hasOnlySessionLifecycleMutationKindActive(resetTarget.storePath, resetLifecycleIdentities, "compaction");
	if (activeLifecycleMutation && !activeCompaction) return {
		ok: false,
		error: errorShape(ErrorCodes.UNAVAILABLE, `Session ${params.key} has another lifecycle mutation in progress; try again.`)
	};
	let admittedWorkReleased = true;
	let resetPreparationError;
	let preparedResetSessionId;
	let preparedLifecycle;
	let lifecyclePreparationCommitted = false;
	return await runExclusiveSessionLifecycleMutation({
		scope: resetTarget.storePath,
		identities: resetLifecycleIdentities,
		prepare: async () => {
			params.assertCurrent?.();
			params.assertAuthorizedInstance?.();
			const { entry: currentEntry, canonicalKey: currentCanonicalKey } = loadGatewaySessionEntry(params.key, resetTarget.requestedAgentId ? { agentId: resetTarget.requestedAgentId } : void 0);
			if (!expectedSessionMatches(currentEntry)) {
				resetPreparationError = sessionChangedError();
				return;
			}
			if (!currentEntry) {
				resetPreparationError = authorizeResetCreation();
				if (resetPreparationError) return;
			}
			resetPreparationError = resolveFastModeSelectionError(currentEntry);
			if (resetPreparationError) return;
			resetPreparationError = resolvePluginSessionOwnershipError({
				action: "reset",
				entry: currentEntry,
				key: resetTarget.target.canonicalKey,
				pluginOwnerId: params.authorizedPluginId
			});
			if (resetPreparationError) return;
			const currentMissingHarnessSessionError = resolveMissingAgentHarnessSessionError(resetTarget.target.canonicalKey, currentEntry);
			if (currentMissingHarnessSessionError) {
				resetPreparationError = errorShape(ErrorCodes.INVALID_REQUEST, currentMissingHarnessSessionError);
				return;
			}
			resetPreparationError = resolveResetEntryStateError(currentEntry, currentCanonicalKey);
			if (resetPreparationError) return;
			preparedResetSessionId = normalizeOptionalString(currentEntry?.sessionId);
			admittedWorkReleased = await interruptSessionWorkAdmissions({
				scope: resetTarget.storePath,
				identities: resetLifecycleIdentities,
				timeoutMs: SESSION_WORK_ADMISSION_DRAIN_TIMEOUT_MS
			});
			if (admittedWorkReleased && params.prepareLifecycle) {
				const prepared = await params.prepareLifecycle({
					agentId: resetTarget.target.agentId,
					entry: currentEntry,
					key: resetTarget.target.canonicalKey,
					storePath: resetTarget.storePath
				});
				if (!prepared.ok) {
					resetPreparationError = prepared.error;
					return;
				}
				preparedLifecycle = prepared.value;
			}
		},
		run: async () => {
			const { cfg, target, storePath, requestedAgentId } = resetTarget;
			if (resetPreparationError) return {
				ok: false,
				error: resetPreparationError
			};
			if (!admittedWorkReleased) return {
				ok: false,
				error: errorShape(ErrorCodes.UNAVAILABLE, `Session ${params.key} is still active; try again in a moment.`)
			};
			params.assertCurrent?.();
			params.assertAuthorizedInstance?.();
			const { entry, legacyKey, canonicalKey } = loadGatewaySessionEntry(params.key, requestedAgentId ? { agentId: requestedAgentId } : void 0);
			if (normalizeOptionalString(entry?.sessionId) !== preparedResetSessionId) return {
				ok: false,
				error: params.expectedSessionId === void 0 ? errorShape(ErrorCodes.UNAVAILABLE, `Session ${params.key} changed before reset. Retry.`) : sessionChangedError()
			};
			const currentFastModeSelectionError = resolveFastModeSelectionError(entry);
			if (currentFastModeSelectionError) return {
				ok: false,
				error: currentFastModeSelectionError
			};
			const currentOwnershipError = resolvePluginSessionOwnershipError({
				action: "reset",
				entry,
				key: canonicalKey,
				pluginOwnerId: params.authorizedPluginId
			});
			if (currentOwnershipError) return {
				ok: false,
				error: currentOwnershipError
			};
			const entryStateError = resolveResetEntryStateError(entry, canonicalKey);
			if (entryStateError) return {
				ok: false,
				error: entryStateError
			};
			const incognito = entry?.incognito === true || isIncognitoSessionKey(target.canonicalKey);
			const placementRetirementError = retireSessionWorkerPlacementBeforeMutation({
				action: "reset",
				context: workerPlacementContext,
				key: params.key,
				sessionId: normalizeOptionalString(entry?.sessionId)
			});
			if (placementRetirementError) return invalidSessionRequest(placementRetirementError.message);
			if (entry?.worktree?.id) {
				const record = managedWorktrees.findLiveById(entry.worktree.id);
				if (record) {
					const { withSettledLocalWorkspace } = await import("./local-workspace-projection-BA9KEiK6.mjs");
					await withSettledLocalWorkspace({
						worktree: record,
						assertCurrent: params.assertCurrent,
						retireRuntime: true
					}, async () => {});
				}
			}
			const hadExistingEntry = Boolean(entry);
			const detachedWorktreeId = params.clearSpawnedCwd ? normalizeOptionalString(entry?.worktree?.id) : void 0;
			const resetLifecycleRevision = entry?.lifecycleRevision;
			const agentId = resolveLifecycleAgentId(cfg, target.agentId);
			const workspaceDir = resolveAgentWorkspaceDir(cfg, agentId);
			const resetPluginRegistry = getActivePluginRegistry();
			const isResetLifecycleCurrent = () => {
				try {
					params.assertCurrent?.();
					return true;
				} catch {
					return false;
				}
			};
			let deferredAcpResetState;
			const hookEvent = createInternalHookEvent("command", params.reason, target.canonicalKey ?? params.key, {
				agentId,
				sessionEntry: entry,
				previousSessionEntry: entry,
				commandSource: params.commandSource,
				cfg,
				storePath,
				workspaceDir
			});
			await triggerInternalHook(hookEvent);
			params.assertCurrent?.();
			params.assertAuthorizedInstance?.();
			const assertCompletionAuthorized = hadExistingEntry ? void 0 : () => {
				params.assertCurrent?.();
				params.assertAuthorizedInstance?.();
			};
			const runtimeCleanupError = await ensureSessionRuntimeCleanup({
				cfg,
				key: params.key,
				target,
				sessionId: entry?.sessionId,
				sessionLifecycleRevision: resetLifecycleRevision
			});
			if (runtimeCleanupError) return {
				ok: false,
				error: runtimeCleanupError
			};
			const parentAcpError = await closeAcpRuntimeForSession({
				cfg,
				sessionKey: target.canonicalKey ?? canonicalKey ?? params.key,
				agentId: target.agentId,
				fallbackSessionKeys: [
					canonicalKey,
					legacyKey,
					params.key
				],
				reason: "session-reset",
				deferResetState: true,
				onDeferredResetState: (state) => {
					deferredAcpResetState = state;
				}
			});
			if (parentAcpError) return {
				ok: false,
				error: parentAcpError
			};
			const pluginCleanup = await runPluginHostCleanup({
				cfg,
				registry: resetPluginRegistry,
				reason: "reset",
				sessionKey: target.canonicalKey ?? params.key,
				skipPersistentSessionState: true
			});
			for (const failure of pluginCleanup.failures) logVerbose(`plugin host cleanup failed for ${failure.pluginId}/${failure.hookId}: ${String(failure.error)}`);
			await closeChildAcpRuntimesForParent({
				cfg,
				parentKey: target.canonicalKey ?? canonicalKey ?? params.key,
				parentAgentId: target.agentId,
				reason: "session-reset"
			});
			if (entry?.sessionId) await resetSessionAgentHarnesses({
				cfg,
				key: params.key,
				target,
				entry,
				reason: "reset"
			});
			const beforeResetMessages = getGlobalHookRunner()?.hasHooks("before_reset") ? await readGatewayBeforeResetPluginHookMessages({
				agentId: resolveLifecycleAgentId(cfg, target.agentId ?? requestedAgentId),
				entry,
				sessionId: entry?.sessionId,
				sessionKey: target.canonicalKey ?? params.key,
				storePath
			}) : void 0;
			const { prepareSubagentSessionCleanupRevocation } = await import("./subagent-registry-Dy6CO-Wk.mjs");
			const revokeSessionCleanup = prepareSubagentSessionCleanupRevocation(target.canonicalKey);
			const commitGuard = () => {
				assertCompletionAuthorized?.();
				const current = loadSessionEntryReadOnly({
					agentId,
					storePath,
					sessionKey: target.canonicalKey,
					clone: false
				});
				if (current?.sessionId === entry?.sessionId && current?.lifecycleRevision === resetLifecycleRevision) revokeSessionCleanup();
			};
			if (incognito) {
				if (!entry) return invalidSessionRequest(`unknown session: ${params.key}`);
				const deleted = await deleteIncognitoSessionForReset({
					key: params.key,
					agentId,
					storePath,
					target,
					entry,
					commitGuard,
					beforeDelete: () => emitGatewayBeforeResetPluginHook({
						cfg,
						key: params.key,
						messages: beforeResetMessages,
						target,
						storePath,
						entry,
						reason: params.reason
					})
				});
				if (!deleted.ok) return deleted;
				handleSessionStateSessionDeleted(target.canonicalKey, agentId);
				notifyGatewaySessionReset(target.canonicalKey, target.agentId);
				emitGatewaySessionEndPluginHook({
					cfg,
					sessionKey: target.canonicalKey,
					sessionId: entry.sessionId,
					storePath,
					sessionFile: target.canonicalKey,
					agentId: target.agentId,
					reason: params.reason,
					archivedTranscripts: []
				});
				await emitSessionUnboundLifecycleEvent({
					targetSessionKey: target.canonicalKey,
					reason: "session-reset"
				});
				return {
					ok: true,
					key: target.canonicalKey,
					agentId: target.agentId,
					storePath,
					incognitoDeleted: true,
					deletedSessionId: deleted.value.deletedSessionId
				};
			}
			let createdNewEntry = false;
			assertCompletionAuthorized?.();
			const boundaryEntry = loadGatewaySessionEntry(params.key, requestedAgentId ? { agentId: requestedAgentId } : void 0).entry;
			if (boundaryEntry?.sessionId !== entry?.sessionId) {
				params.assertCurrent?.();
				throw new Error(`Session ${params.key} changed before reset boundary append.`);
			}
			let resetBoundaryAppended = false;
			let resetSkipped = false;
			let creationAuthorizationError;
			let fastModeSelectionError;
			const postCommitActions = [];
			const lifecycleRequest = {
				commitGuard,
				archivePreviousTranscript: false,
				agentId: target.agentId,
				resetBoundary: boundaryEntry ? {
					context: "clear",
					reason: params.reason,
					cwd: workspaceDir
				} : void 0,
				storePath,
				target: {
					canonicalKey: target.canonicalKey,
					storeKeys: [...new Set([
						...target.storeKeys,
						canonicalKey,
						legacyKey,
						params.key
					].filter((key) => Boolean(key)))]
				},
				buildNextEntry: ({ currentEntry, primaryKey }) => {
					assertCompletionAuthorized?.();
					if (!currentEntry) {
						creationAuthorizationError = authorizeResetCreation();
						if (creationAuthorizationError) throw new Error(creationAuthorizationError.message);
					}
					createdNewEntry = currentEntry === void 0;
					fastModeSelectionError = resolveFastModeSelectionError(currentEntry);
					if (fastModeSelectionError) throw new Error(fastModeSelectionError.message);
					if (currentEntry?.sessionId !== boundaryEntry?.sessionId) {
						if (currentEntry) {
							resetSkipped = true;
							return currentEntry;
						}
						params.assertCurrent?.();
						throw new Error(`Session ${params.key} changed before reset boundary commit.`);
					}
					if (currentEntry && currentEntry.lifecycleRevision !== resetLifecycleRevision) {
						resetSkipped = true;
						return currentEntry;
					}
					resetBoundaryAppended = currentEntry !== void 0;
					const resetPreservedSelection = resolveResetPreservedSelection({ entry: currentEntry });
					const now = Date.now();
					const nextSessionId = currentEntry?.sessionId ?? randomUUID();
					const nextExecNode = params.execNode ? params.execNode : params.clearExecBinding ? void 0 : currentEntry?.execNode;
					const creationStamp = currentEntry ? {
						...preserveCreationStamp({}, currentEntry),
						projectId: currentEntry.projectId
					} : params.creation ? {
						...buildSessionCreationStamp(params.creation),
						...resolveCreatorSandbox(cfg, params.creation) === "required" ? { sandbox: "required" } : {}
					} : {};
					const nextEntry = {
						sessionId: nextSessionId,
						lifecycleRevision: randomUUID(),
						updatedAt: now,
						sessionStartedAt: now,
						systemSent: false,
						abortedLastRun: false,
						contextWindow: currentEntry?.contextWindow,
						thinkingLevel: currentEntry?.thinkingLevel,
						fastMode: params.fastModeSelection?.value ?? currentEntry?.fastMode,
						toolOverrides: currentEntry?.toolOverrides,
						verboseLevel: currentEntry?.verboseLevel,
						traceLevel: currentEntry?.traceLevel,
						reasoningLevel: currentEntry?.reasoningLevel,
						elevatedLevel: currentEntry?.elevatedLevel,
						ttsAuto: currentEntry?.ttsAuto,
						execHost: params.execNode ? "node" : params.clearExecBinding ? void 0 : currentEntry?.execHost,
						execNode: nextExecNode,
						execCwd: params.execNode ? params.execCwd : params.clearExecBinding ? void 0 : currentEntry?.execCwd,
						...params.armSessionDiffBaselineCapture && !nextExecNode ? { sessionDiffBaselineCapture: createSessionDiffBaselineCaptureClaim() } : {},
						responseUsage: currentEntry?.responseUsage,
						pinnedAt: currentEntry?.pinnedAt,
						...resetPreservedSelection,
						groupActivation: currentEntry?.groupActivation,
						groupActivationNeedsSystemIntro: currentEntry?.groupActivationNeedsSystemIntro,
						chatType: currentEntry?.chatType,
						compactionCount: 0,
						sendPolicy: currentEntry?.sendPolicy,
						queueMode: currentEntry?.queueMode,
						queueDebounceMs: currentEntry?.queueDebounceMs,
						queueCap: currentEntry?.queueCap,
						queueDrop: currentEntry?.queueDrop,
						spawnedBy: currentEntry?.spawnedBy,
						completionOwnerSessionKey: currentEntry?.completionOwnerSessionKey,
						inheritedToolPolicyVersion: currentEntry?.inheritedToolPolicyVersion,
						inheritedToolAllow: currentEntry?.inheritedToolAllow,
						inheritedToolDeny: currentEntry?.inheritedToolDeny,
						spawnedWorkspaceDir: currentEntry?.spawnedWorkspaceDir,
						spawnedCwd: params.clearSpawnedCwd ? void 0 : preparedLifecycle?.spawnedCwd ?? params.spawnedCwd ?? currentEntry?.spawnedCwd,
						sessionRoot: params.clearSpawnedCwd ? void 0 : preparedLifecycle?.sessionRoot ?? params.sessionRoot ?? currentEntry?.sessionRoot,
						permissionMode: params.clearSpawnedCwd ? void 0 : params.permissionMode ?? currentEntry?.permissionMode,
						sandboxMode: currentEntry?.sandboxMode,
						worktree: params.clearSpawnedCwd ? void 0 : preparedLifecycle?.worktree ?? currentEntry?.worktree,
						repositoryWorkspaceId: preparedLifecycle?.repositoryWorkspaceId ?? currentEntry?.repositoryWorkspaceId,
						parentSessionKey: currentEntry?.parentSessionKey,
						parentSessionId: currentEntry?.parentSessionId,
						...creationStamp,
						forkSource: currentEntry?.forkSource,
						forkedFromParent: sessionEntryForkedFromParent(currentEntry) ? true : void 0,
						spawnDepth: currentEntry?.spawnDepth,
						subagentRole: currentEntry?.subagentRole,
						subagentControlScope: currentEntry?.subagentControlScope,
						label: currentEntry?.label,
						autoLabel: currentEntry?.autoLabel,
						icon: currentEntry?.icon,
						category: currentEntry?.category,
						boardFace: currentEntry?.boardFace,
						boardPresentation: currentEntry?.boardPresentation,
						visibility: currentEntry?.visibility,
						displayName: currentEntry?.displayName,
						delivery: currentEntry?.delivery,
						pendingDeliveryNotice: currentEntry?.pendingDeliveryNotice,
						groupId: currentEntry?.groupId,
						subject: currentEntry?.subject,
						groupChannel: currentEntry?.groupChannel,
						space: currentEntry?.space,
						pluginOwnerId: currentEntry?.pluginOwnerId ?? params.authorizedPluginId,
						cliSessionBindings: currentEntry?.cliSessionBindings,
						cliSessionIds: currentEntry?.cliSessionIds,
						claudeCliSessionId: currentEntry?.claudeCliSessionId,
						usageFamilyKey: currentEntry?.usageFamilyKey,
						usageFamilySessionIds: currentEntry?.usageFamilySessionIds,
						inputTokens: 0,
						outputTokens: 0,
						totalTokens: 0,
						totalTokensFresh: true,
						totalTokensVersion: 1
					};
					if (resetBoundaryAppended && !isSubagentSessionKey(primaryKey)) clearAllCliSessions(nextEntry);
					else nextEntry.cliSessionBindings = rebindCliSessionReseedReceiptsForReset(nextEntry.cliSessionBindings, nextSessionId);
					return nextEntry;
				},
				afterEntryMutation: (mutation) => {
					if (resetSkipped) return;
					lifecyclePreparationCommitted = true;
					let committedAcpResetState;
					postCommitActions.push(async () => {
						if (committedAcpResetState && isResetLifecycleCurrent()) await tryPrepareFreshManagerRuntimeSession({
							deps: { getRuntimeBackend: getAcpRuntimeBackend },
							cfg,
							meta: committedAcpResetState.meta,
							sessionKey: committedAcpResetState.sessionKey,
							agentId,
							logPrefix: "sessions.session-reset"
						});
						await emitGatewayBeforeResetPluginHook({
							cfg,
							key: params.key,
							messages: beforeResetMessages,
							target,
							storePath,
							entry: mutation.previousEntry,
							reason: params.reason
						});
					}, () => {
						const resetSessionKey = target.canonicalKey ?? params.key;
						handleSessionStateSessionReset(resetSessionKey);
						notifyGatewaySessionReset(resetSessionKey, target.agentId);
						emitGatewaySessionEndPluginHook({
							cfg,
							sessionKey: resetSessionKey,
							sessionId: mutation.previousSessionId,
							storePath,
							sessionFile: mutation.previousSessionFile,
							agentId: target.agentId,
							reason: params.reason,
							archivedTranscripts: [],
							nextSessionId: mutation.nextEntry.sessionId
						});
						emitGatewaySessionStartPluginHook({
							cfg,
							sessionKey: resetSessionKey,
							sessionId: mutation.nextEntry.sessionId,
							resumedFrom: mutation.previousSessionId,
							storePath,
							sessionFile: resetSessionKey,
							agentId: target.agentId
						});
					});
					if (hadExistingEntry) postCommitActions.push(() => emitSessionUnboundLifecycleEvent({
						targetSessionKey: target.canonicalKey ?? params.key,
						reason: "session-reset"
					}));
					if (detachedWorktreeId) postCommitActions.push(async () => {
						try {
							if (!await managedWorktrees.removeIfLossless(detachedWorktreeId)) {
								const retained = managedWorktrees.findLiveById(detachedWorktreeId);
								if (retained) {
									const safePath = truncateUtf16Safe(sanitizeForLog(retained.path), 256);
									reportLifecycleCleanupError(/* @__PURE__ */ new Error(`worktree retained: branch=${retained.branch} path=${safePath} outcome=${retained.runEndCleanup?.outcome}`));
								}
							}
						} catch (error) {
							reportLifecycleCleanupError(error);
						}
					});
					clearBootstrapSnapshotOnSessionBoundary({
						boundaryAppended: resetBoundaryAppended,
						sessionKey: target.canonicalKey ?? params.key
					});
					if (createdNewEntry) recordSessionCreated(cfg, {
						sessionKey: target.canonicalKey ?? params.key,
						agentId,
						entry: mutation.nextEntry
					});
					if (deferredAcpResetState) {
						const resetState = {
							sessionKey: target.canonicalKey,
							meta: buildPendingAcpMeta(deferredAcpResetState.meta, Date.now())
						};
						writeAcpSessionMetaForMigration({
							sessionKey: buildAcpDatabaseSessionKey(target.canonicalKey, agentId),
							sessionId: mutation.nextEntry.sessionId,
							lifecycleRevision: mutation.nextEntry.lifecycleRevision,
							meta: resetState.meta
						});
						committedAcpResetState = resetState;
					}
					params.onCommitted?.({
						key: target.canonicalKey,
						sessionId: mutation.nextEntry.sessionId
					});
				}
			};
			const resetLifecycle = async (assertSourceCurrent) => await resetSessionEntryLifecycle({
				...lifecycleRequest,
				commitGuard: () => {
					commitGuard();
					assertSourceCurrent?.();
				}
			});
			const lifecyclePromise = preparedLifecycle?.withCommit ? preparedLifecycle.withCommit(resetLifecycle) : resetLifecycle();
			let lifecycle;
			try {
				lifecycle = await settleGatewaySessionLifecycleCommit(lifecyclePromise, postCommitActions);
			} catch (error) {
				if (fastModeSelectionError) return {
					ok: false,
					error: fastModeSelectionError
				};
				if (creationAuthorizationError) return {
					ok: false,
					error: creationAuthorizationError
				};
				throw error;
			}
			const next = lifecycle.nextEntry;
			const selectedModel = resolveSessionModelRef(cfg, next, target.agentId);
			const resolved = {
				modelProvider: selectedModel.provider,
				model: selectedModel.model
			};
			const responseEntry = {
				...projectPublicSessionEntry(next),
				modelProvider: resolved.modelProvider,
				model: resolved.model
			};
			return {
				ok: true,
				key: target.canonicalKey,
				entry: responseEntry,
				resolved,
				agentId: target.agentId,
				storePath
			};
		},
		finalize: async () => {
			if (!lifecyclePreparationCommitted) await rollbackGatewaySessionPreparation({
				prepared: preparedLifecycle,
				onError: reportLifecycleCleanupError
			});
		}
	});
}
//#endregion
export { emitSessionUnboundLifecycleEvent as a, emitGatewaySessionStartPluginHook as i, emitGatewayBeforeResetPluginHook as n, performGatewaySessionReset as o, emitGatewaySessionEndPluginHook as r, cleanupSessionBeforeMutation as t };
