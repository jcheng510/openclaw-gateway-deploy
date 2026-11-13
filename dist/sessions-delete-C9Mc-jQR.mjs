import { l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { n as normalizeAgentId } from "./agent-id-D1-Q6vR4.mjs";
import { S as tryResolveAgentOperationAgentId } from "./agent-scope-config-Dm6T00l4.mjs";
import { r as isIncognitoSessionKey } from "./session-key-DDIJxXfQ.mjs";
import { A as parseAgentSessionKey } from "./session-key-BC4m_Ly5.mjs";
import { t as SESSION_LIFECYCLE_CHANGED_ERROR_REASON } from "./lifecycle-DlS-bWdU.mjs";
import { n as resolvePersistedSessionStoreOwnerForKey } from "./session-store-owner-CqyGjSj-.mjs";
import { Ti as validateSessionsDeleteParams } from "./src-D2gvuSyP.mjs";
import { t as ErrorCodes } from "./gateway-error-details-DIefe7Zy.mjs";
import { f as errorShape } from "./error-codes-DI20vDEB.mjs";
import { a as isAgentHarnessSessionKey } from "./agent-harness-session-key-BypxcwJ7.mjs";
import { g as runExclusiveSessionLifecycleMutation } from "./session-lifecycle-admission-6HF8YqSN.mjs";
import "./session-accessor-CGLseszP.mjs";
import { c as invalidSessionRequest, n as resolveRequestedSessionAgentId } from "./session-request-agent-DFWpsx2m.mjs";
import { o as rollbackPluginOwnedSessionEntryLifecycle, r as deleteSessionEntryLifecycle } from "./session-accessor.sqlite-lifecycle-DMe8Z3DK.mjs";
import { s as isModelSelectionLocked } from "./model-overrides-h9qKlxn9.mjs";
import { a as handleSessionStateSessionDeleted } from "./session-state-events-DxrQGYa3.mjs";
import "./sessions-Db5eEwNA.mjs";
import { o as prepareSessionWorkerPlacementRetirement } from "./session-placement-lifecycle-BqtqNz6X.mjs";
import { o as resolveGatewaySessionStoreTarget } from "./session-utils-store-lookup-B0P8tI_m.mjs";
import { i as loadGatewaySessionEntryReadOnly, r as loadGatewaySessionEntry } from "./session-utils-store-DWiBeNMH.mjs";
import "./session-utils-FXsPIESl.mjs";
import { t as resolvePluginSessionOwnershipError } from "./session-plugin-ownership-BsAflZdC.mjs";
import { r as emitSessionsChanged } from "./session-change-event-Biy7CorC.mjs";
import { t as assertValidParams } from "./validation-B7TobU6-.mjs";
import { i as loadAccessorSessionEntryForGatewayTarget, n as isAgentMainSessionKey, o as loadSessionsRuntimeModule, s as requireSessionKey } from "./sessions-shared-Dj5YlWj4.mjs";
import { r as removeSessionWorktree } from "./session-worktree-lifecycle-BwOaQxsQ.mjs";
import { n as prepareSessionLifecycleDrain, t as SessionLifecycleWorkspaceRecoveryError } from "./sessions-lifecycle-drain-CuSFVwiu.mjs";
//#region src/gateway/server-methods/sessions-delete.ts
var SessionDeletionError = class extends Error {
	constructor(error) {
		super(error.message);
		this.error = error;
	}
};
/** Shared lifecycle owner for operator deletion and automatic Incognito expiry. */
async function deleteGatewaySession({ params: p, client, context, sessionMutationAuthorization, assertCurrent: assertCallerCurrent, onDeleted }) {
	assertCallerCurrent?.();
	const key = p.key.trim();
	const cfg = context.getRuntimeConfig();
	const requestedAgent = resolveRequestedSessionAgentId(cfg, key, p.agentId);
	if (!requestedAgent.ok) return {
		ok: false,
		error: requestedAgent.error
	};
	const requestedAgentId = requestedAgent.agentId;
	const target = resolveGatewaySessionStoreTarget({
		cfg,
		key,
		agentId: requestedAgentId
	});
	const { storePath } = target;
	const compatibilityDefaultAgentId = tryResolveAgentOperationAgentId(cfg);
	const persistedStoreOwner = resolvePersistedSessionStoreOwnerForKey(cfg, key);
	const protectedGlobalAgentId = persistedStoreOwner.kind === "configured" ? persistedStoreOwner.agentId : compatibilityDefaultAgentId;
	const explicitlySelectedGlobalAgentId = normalizeOptionalString(p.agentId) ?? parseAgentSessionKey(key)?.agentId;
	const isSelectedNonDefaultGlobal = target.canonicalKey === "global" && explicitlySelectedGlobalAgentId !== void 0 && normalizeAgentId(explicitlySelectedGlobalAgentId) !== protectedGlobalAgentId;
	const isMainSession = target.canonicalKey !== "global" && isAgentMainSessionKey(cfg, target.canonicalKey);
	if ((target.canonicalKey === "global" || isMainSession) && !isSelectedNonDefaultGlobal) return invalidSessionRequest(`Cannot delete the main session (${target.canonicalKey}).`);
	const deleteTranscript = typeof p.deleteTranscript === "boolean" ? p.deleteTranscript : true;
	const initialDeleteEntry = loadGatewaySessionEntry(key, { agentId: requestedAgentId }).entry;
	const expectedSessionId = p.expectedSessionId?.trim();
	const expectedLifecycleRevision = p.expectedLifecycleRevision?.trim();
	const sessionChangedError = () => errorShape(ErrorCodes.INVALID_REQUEST, `Session ${key} changed before deletion. Retry.`, { details: { reason: SESSION_LIFECYCLE_CHANGED_ERROR_REASON } });
	const resolveEntryError = (entry) => {
		const deletablePluginOwnedSession = normalizeOptionalString(entry?.pluginOwnerId) !== void 0 && entry?.agentHarnessId === void 0 && !isAgentHarnessSessionKey(target.canonicalKey);
		if (isModelSelectionLocked(entry) && !deletablePluginOwnedSession) return errorShape(ErrorCodes.INVALID_REQUEST, "This session cannot be deleted while model selection is locked.");
		if (p.archivedOnly === true && entry?.archivedAt === void 0) return errorShape(ErrorCodes.INVALID_REQUEST, `Session ${key} is not archived. Archive it first, then delete it.`);
		if (expectedSessionId && entry?.sessionId !== expectedSessionId || expectedLifecycleRevision && entry?.lifecycleRevision !== expectedLifecycleRevision) return sessionChangedError();
		return resolvePluginSessionOwnershipError({
			action: "delete",
			entry,
			key: target.canonicalKey,
			pluginOwnerId: client?.internal?.pluginRuntimeOwnerId
		});
	};
	const initialError = resolveEntryError(initialDeleteEntry);
	if (initialError) return {
		ok: false,
		error: initialError
	};
	const { cleanupSessionBeforeMutation, emitGatewaySessionEndPluginHook, emitSessionUnboundLifecycleEvent } = await loadSessionsRuntimeModule();
	const assertCurrent = () => {
		assertCallerCurrent?.();
		sessionMutationAuthorization?.assertCurrent();
		const current = loadGatewaySessionEntryReadOnly(key, { agentId: requestedAgentId });
		if (current.storePath !== storePath || current.canonicalKey !== target.canonicalKey || current.entry?.sessionId !== initialDeleteEntry?.sessionId || current.entry?.lifecycleRevision !== initialDeleteEntry?.lifecycleRevision) throw new SessionDeletionError(sessionChangedError());
		const error = resolveEntryError(current.entry);
		if (error) throw new SessionDeletionError(error);
		return current;
	};
	const deleteLifecycleIdentities = [
		target.canonicalKey,
		key,
		...target.storeKeys,
		initialDeleteEntry?.sessionId,
		expectedSessionId
	];
	let drain;
	let deletedWorktreeId;
	let worktreePreserved;
	const deleteCurrent = async () => {
		try {
			const current = assertCurrent();
			try {
				drain = await prepareSessionLifecycleDrain({
					action: "delete",
					authorize: assertCurrent,
					beforeCancel: () => {
						if (p.expectedSessionUpdatedAt !== void 0 && assertCurrent().entry?.updatedAt !== p.expectedSessionUpdatedAt) throw new SessionDeletionError(sessionChangedError());
					},
					context,
					storePath,
					sessionKeys: Array.from(/* @__PURE__ */ new Set([
						key,
						target.canonicalKey,
						...target.storeKeys
					])),
					sessionId: current.entry?.sessionId,
					sessionKey: target.canonicalKey,
					agentId: target.agentId,
					defaultAgentId: compatibilityDefaultAgentId,
					lifecycleIdentities: deleteLifecycleIdentities.filter((identity) => Boolean(identity))
				});
			} catch (error) {
				assertCurrent();
				if (error instanceof SessionDeletionError) throw error;
				if (error instanceof SessionLifecycleWorkspaceRecoveryError) throw new SessionDeletionError(error.error);
				throw new SessionDeletionError(errorShape(ErrorCodes.UNAVAILABLE, `Session ${key} could not safely stop before deletion: ${formatErrorMessage(error)} Retry after active work or worker recovery finishes.`, { retryable: true }));
			}
			return await runExclusiveSessionLifecycleMutation({
				scope: storePath,
				identities: deleteLifecycleIdentities,
				prepare: async () => drain?.handoffToMutation(),
				finalize: async () => drain?.release(),
				run: async () => {
					const { entry, legacyKey, canonicalKey } = assertCurrent();
					const retirement = prepareSessionWorkerPlacementRetirement({
						context,
						sessionId: entry?.sessionId
					});
					const commitGuard = () => {
						assertCurrent();
						retirement.assertCurrent();
						if (drain?.hasAuthoritativeWork()) throw new SessionDeletionError(errorShape(ErrorCodes.UNAVAILABLE, `Session ${key} is still active; try again.`, { retryable: true }));
					};
					commitGuard();
					const mutationCleanupError = await cleanupSessionBeforeMutation({
						cfg,
						key,
						target,
						entry,
						legacyKey,
						canonicalKey,
						reason: "session-delete",
						assertCurrent: commitGuard
					});
					if (mutationCleanupError) throw new SessionDeletionError(mutationCleanupError);
					const postCleanupTarget = loadAccessorSessionEntryForGatewayTarget({
						key,
						cfg,
						agentId: requestedAgentId
					});
					const postCleanupEntry = postCleanupTarget.entry;
					deletedWorktreeId = normalizeOptionalString(postCleanupEntry?.worktree?.id);
					commitGuard();
					const pluginOwnerId = normalizeOptionalString(postCleanupEntry?.pluginOwnerId);
					const incognito = postCleanupEntry?.incognito === true || isIncognitoSessionKey(target.canonicalKey);
					const deletionParams = {
						agentId: target.agentId,
						archiveTranscript: incognito ? false : deleteTranscript,
						commitGuard,
						deleteDeliveryArtifacts: true,
						deleteTranscriptWithoutArchive: incognito,
						expectedEntry: postCleanupEntry,
						expectedLifecycleRevision,
						expectedSessionId: initialDeleteEntry?.sessionId ?? null,
						expectedUpdatedAt: postCleanupEntry?.updatedAt,
						storePath,
						target: {
							canonicalKey: target.canonicalKey,
							storeKeys: target.storeKeys
						}
					};
					const result = postCleanupEntry && pluginOwnerId && isModelSelectionLocked(postCleanupEntry) ? await rollbackPluginOwnedSessionEntryLifecycle({
						...deletionParams,
						expectedEntry: postCleanupEntry,
						expectedPluginOwnerId: pluginOwnerId,
						target: {
							canonicalKey: postCleanupTarget.target.canonicalKey,
							storeKeys: postCleanupTarget.target.storeKeys
						}
					}) : await deleteSessionEntryLifecycle(deletionParams);
					if (result.expectedEntryMismatch) throw new SessionDeletionError(sessionChangedError());
					if (result.deleted) {
						retirement.retire();
						emitGatewaySessionEndPluginHook({
							cfg,
							sessionKey: target.canonicalKey ?? key,
							sessionId: result.deletedSessionId,
							storePath,
							agentId: target.agentId,
							reason: "deleted",
							archivedTranscripts: result.archivedTranscripts
						});
						await emitSessionUnboundLifecycleEvent({
							targetSessionKey: target.canonicalKey ?? key,
							reason: "session-delete",
							emitHooks: p.emitLifecycleHooks !== false
						});
						const deletedSessionKey = target.canonicalKey ?? key;
						handleSessionStateSessionDeleted(deletedSessionKey, requestedAgentId);
						worktreePreserved = await removeSessionWorktree({
							id: deletedWorktreeId,
							sessionKey: deletedSessionKey,
							reason: "session-delete"
						});
					}
					return result;
				}
			});
		} finally {
			drain?.release();
		}
	};
	let deletion;
	try {
		deletion = await deleteCurrent();
	} catch (error) {
		if (!(error instanceof SessionDeletionError)) throw error;
		return {
			ok: false,
			error: error.error
		};
	}
	const deleted = deletion.deleted;
	const archived = deletion.archivedTranscripts.map((entryLocal) => entryLocal.archivedPath);
	const response = {
		ok: true,
		key: target.canonicalKey,
		deleted,
		archived,
		...worktreePreserved ? { worktreePreserved } : {}
	};
	onDeleted?.(response);
	if (deleted) {
		emitSessionsChanged(context, {
			sessionKey: target.canonicalKey,
			sessionId: deletion.deletedSessionId,
			agentId: target.agentId,
			reason: "delete"
		});
		emitSessionsChanged(context, { reason: "delete" }, { preparedPublication: true });
	}
	return {
		ok: true,
		result: response
	};
}
const sessionDeleteHandlers = { "sessions.delete": async (options) => {
	const { params, respond } = options;
	if (!assertValidParams(params, validateSessionsDeleteParams, "sessions.delete", respond)) return;
	if (!requireSessionKey(params.key, respond)) return;
	const result = await deleteGatewaySession({
		...options,
		params,
		onDeleted: (response) => respond(true, response, void 0)
	});
	if (!result.ok) respond(false, void 0, result.error);
} };
//#endregion
export { sessionDeleteHandlers as n, deleteGatewaySession as t };
