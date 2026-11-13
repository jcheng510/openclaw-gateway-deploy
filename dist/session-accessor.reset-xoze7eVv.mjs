import { t as createDeferredCore } from "./deferred-D0La5CRk.mjs";
import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { y as uniqueStrings } from "./string-normalization-YMwDjufr.mjs";
import { r as createLazyRuntimeModule } from "./lazy-runtime-CJrzFzqU.mjs";
import { r as resolveStateDir } from "./state-dir-CfAW6S2K.mjs";
import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { a as readDatabasePathIdentitySync, t as assertExistingDatabaseIdentity } from "./sqlite-worker-identity-Dggu-rKK.mjs";
import { a as createSqliteLifecycleAggregateError } from "./sqlite-lifecycle-errors-Q-hsFPSB.mjs";
import { r as runSqliteDeferredTransactionSync } from "./sqlite-transaction-2VkikDo-.mjs";
import { o as getOpenClawDatabaseMaintenanceScope } from "./openclaw-state-db-async-lifecycle-D4cx8OBO.mjs";
import { s as resolveOpenClawStateSqlitePath } from "./openclaw-state-db.paths-rJI64Ab5.mjs";
import { _ as registerOpenClawStateDatabaseAsyncResource, n as captureOpenClawStateDatabaseReadAdmission } from "./openclaw-state-db-cache-IAib4pqp.mjs";
import { i as readOpenClawAgentDatabaseIdentity, r as isOpenClawAgentDatabasePathCurrent } from "./openclaw-agent-db-identity-ChZ28OhF.mjs";
import { n as normalizeAgentId } from "./agent-id-D1-Q6vR4.mjs";
import { o as registerOpenClawAgentDatabaseAsyncResource, s as registerOpenClawAgentDatabaseReadCandidateResource } from "./openclaw-agent-db-resources-DZhhXFbz.mjs";
import { g as hasSqliteWorkerOutcomeUnknown, h as SqliteWorkerError, n as createSqliteWorkerOperationAdmission } from "./sqlite-worker-operation-admission-BB758RIN.mjs";
import { r as cloneEnvWithPlatformSemantics } from "./config-env-vars-C__rW8Th.mjs";
import { r as captureOpenClawStateWorkerContext } from "./openclaw-state-worker-context-C_iAE7YK.mjs";
import { r as isIncognitoSessionKey } from "./session-key-DDIJxXfQ.mjs";
import { A as parseAgentSessionKey, l as resolveAgentIdFromSessionKey } from "./session-key-BC4m_Ly5.mjs";
import { c as resolveOpenClawAgentSqlitePath } from "./openclaw-agent-db.paths-Dv3PPTNK.mjs";
import { i as resolveSessionAuthProfileOverrideSource } from "./auth-profile-override-provenance-DEDEMC3M.mjs";
import { w as hasSessionActiveAutoModelFallback } from "./agent-scope-L_eY3Hj7.mjs";
import { n as assertAgentDatabaseAdmitted } from "./agent-database-admission-CLYAvaL3.mjs";
import { l as deferOpenClawAgentPostCommitPublication, n as cache, t as assertAgentDatabaseTerminalOpenAllowed, y as retainAgentDatabase } from "./openclaw-agent-db-lifecycle-CCXA1nI8.mjs";
import { c as openOpenClawAgentDatabase, d as runOpenClawAgentWriteTransaction, o as getOpenClawAgentDatabaseIfOpen } from "./openclaw-agent-db-CZUYuo7P.mjs";
import { b as findSessionTranscriptHeader, x as isIndexedSessionEntry } from "./transcript-payload-BY1k8MVa.mjs";
import { n as projectModelContextMessages } from "./model-context-message-Dwq9Zc_h.mjs";
import { n as runOpenClawAgentWorkerWrite } from "./openclaw-agent-write-admission-CDwQO6YZ.mjs";
import { n as captureSessionTranscriptTargetBinding, t as captureSessionTranscriptStorageEnvironment } from "./transcript-target-binding-Cytsl9mY.mjs";
import { n as supportsOpenClawAgentDatabaseExecution, t as captureOpenClawAgentDatabaseExecution } from "./openclaw-agent-execution-C4GB-NRD.mjs";
import { n as withOpenClawAgentDatabaseReadOnly } from "./openclaw-agent-db-readonly-CkWWSfuG.mjs";
import { f as resolveAgentHarnessSessionStoreError, p as resolveAgentHarnessSessionStoreTransitionError } from "./agent-harness-session-key-BypxcwJ7.mjs";
import { n as iterateSessionContextEntries } from "./session-BA9qunLx.mjs";
import { n as captureSessionStoreReadCandidate } from "./session-store-read-candidates-YT_i67iQ.mjs";
import { a as normalizeStoreSessionKey, c as resolveSessionStoreEntryCore } from "./store-entry-CBksE8pX.mjs";
import { _ as toDatabaseOptions, a as prepareSqliteScope, d as resolveSqliteStoreScope, f as resolveSqliteTranscriptArchiveDirectory, g as runExclusiveSqliteSessionWrite, h as resolveSqliteWriteAdmissionScope, l as resolveSqliteScope, m as resolveSqliteTranscriptScope, n as captureLifecycleDatabaseScope, o as prepareSqliteTranscriptReadScope, p as resolveSqliteTranscriptReadScope, r as formatLegacySqliteSessionMarkerForScope, y as withSqliteSessionDatabase } from "./session-accessor.sqlite-scope-AxUEwRt8.mjs";
import { a as mergeSessionTranscriptVisiblePathWithOpaqueAppendPath, l as scanSessionTranscriptTree, n as isSessionTranscriptLeafControl, p as selectSessionTranscriptTreePathNodes } from "./transcript-tree-D_mugOJ0.mjs";
import { a as readExactSessionEntryRow } from "./session-accessor.sqlite-entry-read-oKmXbFma.mjs";
import { r as assertCanonicalSqliteSessionKeysCurrent } from "./session-canonical-key-Cjd4Pn_g.mjs";
import { _ as retainSessionEntryWorkerPublication, v as runWithSessionEntryCreationPublication, y as withSessionEntryCreationPublication } from "./session-accessor.sqlite-entry-cache-DYTBofzQ.mjs";
import { t as isInternalSessionEffectsKey } from "./internal-session-key-BOMXCQVf.mjs";
import { n as readSessionEntryCount, r as readSessionEntryStore } from "./session-accessor.sqlite-entry-inventory-C1YppdkT.mjs";
import { F as withSqliteSessionDeletions, M as runPreparedSqliteSessionWrite, N as runSqliteSessionDeletionTransaction, Q as sqliteSessionEntriesEqual, a as normalizeLifecycleTarget, c as readSessionIdentitySnapshot, d as resolveLifecyclePrimaryEntry, f as writeSessionEntry, i as deleteSessionEntryRows, j as hasPreparedNativeSessionDeletion, n as deleteLegacySessionEntryRows, u as rehomeSessionWindows } from "./session-accessor.sqlite-entry-store-JXJQe1fh.mjs";
import { r as collectSessionStateIdsForEntry } from "./session-accessor.sqlite-references-YChoasaE.mjs";
import { a as runWithSessionTranscriptReadFence, r as resolveSessionTranscriptReadFence } from "./session-transcript-read-fence-Bq0b1oaG.mjs";
import { t as readSessionTranscriptBoundedActiveContextCore } from "./session-accessor.sqlite-active-context-CW0GiOoo.mjs";
import { a as publishCommittedSessionIdentity, n as prepareLifecycleIdentityPublication, r as prepareSessionIdentityPublication, t as prepareCommittedSessionEntryRemovals } from "./session-accessor.sqlite-identity-C3Jm_Tf4.mjs";
import { f as loadTranscriptReadSnapshotSync, l as loadTranscriptEventsFromDatabase } from "./session-accessor.sqlite-read-lTzWPVDn.mjs";
import { n as appendTranscriptEventsInTransaction } from "./session-accessor.sqlite-transcript-store-CPlEEZZV.mjs";
import { t as createSessionTranscriptHeader } from "./transcript-header-Dher2Bur.mjs";
import { t as ensureTranscriptHeader } from "./session-accessor.sqlite-transcript-header-DnlbeuET.mjs";
import { o as resolveFreshSessionTotalTokens, r as mergeSessionEntry } from "./types-DBHkhm7j.mjs";
import { n as normalizeSessionContextEntryBoundaries } from "./session-entry-navigation-WbG7ZkMm.mjs";
import { D as resolveSessionStorePathForScope, O as preserveSqliteSameKeySessionRolloverLineage, s as loadSessionEntry, u as patchSessionEntryCore } from "./session-accessor.sqlite-entry-C87Sde4p.mjs";
import { i as materializeSessionStateDeletePlans } from "./session-accessor.sqlite-reclamation-worker-Du8IF7nF.mjs";
import { t as captureSessionStoreReadCandidates } from "./session-store-target-inventory-DQQNzqyR.mjs";
import { c as finalizeSessionEntryMaintenancePlansAfterWriterReleaseBestEffort, d as publishSessionStateArchives, f as emitArchivedTranscriptUpdates, s as applySessionEntryMaintenance, u as prunePublishedSessionArchivesByRetention } from "./session-history-eviction-BJoKqhi_.mjs";
import { a as deletePlannedLifecycleArtifactEntries, i as deleteMaterializedSessionStatePlans, l as projectSessionEntryLifecycleMutation, n as assertRawSessionEntryRemovalUnchanged, p as shouldRemoveSessionEntry, r as collectProjectedReferencedSessionIds, s as planSessionStateAfterEntryRemoval, t as assertPlannedLifecycleArtifactEntriesUnchanged } from "./session-accessor.sqlite-lifecycle-state-DalYr83g.mjs";
import { d as captureSessionMaintenancePreservation, u as resolveMaintenanceConfig } from "./disk-budget-DNKBUWcN.mjs";
import { o as resolveStoredSessionOwnerAgentId } from "./session-store-key-__CfQfd2.mjs";
import { d as hasPluginHostCleanupTarget, f as isLockedHarnessSessionOwnedByPlugin, l as clearPluginHostCleanupTarget, m as shouldSkipPluginHostCleanupStore, p as matchesPluginHostCleanupSession, t as listSessionEntriesCore } from "./session-accessor.entry-D9NYIhaA.mjs";
import { i as readExactSessionEntryRowForCanonicalRepair } from "./session-accessor.sqlite-canonical-repair-DfjyvxZp.mjs";
import { a as readSessionEntryReplacementState, i as readSessionCreationSnapshotInDatabase, n as prepareSessionEntryReplacementPublication, r as assertSessionCreationLabelAvailable, t as commitSessionEntryReplacementsInDatabase } from "./session-accessor.sqlite-replacement-state-tKkLifEu.mjs";
import { n as replaceSessionOwnerInTransaction } from "./session-accessor.sqlite-owner-De5R81DU.mjs";
import { i as retainSessionHistoryWorkerDatabase, o as withSessionHistoryWorkerDatabase } from "./session-transcript-worker-runtime-BNJMKJjz.mjs";
import { s as appendSessionResetBoundary } from "./session-accessor.sqlite-lifecycle-DMe8Z3DK.mjs";
import { n as MODEL_SELECTION_LOCKED_PARENT_FORK_MESSAGE, o as assertModelSelectionUnlocked } from "./model-overrides-h9qKlxn9.mjs";
import { r as derivePromptTokens, u as normalizeUsage } from "./usage-DDsrNSO2.mjs";
import { t as readSessionTranscriptCurrentTurnEntry } from "./session-accessor.sqlite-current-turn-Csentma6.mjs";
import path from "node:path";
import { isDeepStrictEqual } from "node:util";
import { randomUUID } from "node:crypto";
import { isMainThread } from "node:worker_threads";
import { stripCompactionReplayCheckpoint } from "@openclaw/ai/transports";
//#region src/config/sessions/session-accessor.sqlite-commit-context.ts
/** Native-only scopes retain their original handle, not a pathname reopened after commit. */
async function withNativeSessionCommitContext(database, env, commit, afterCommitted) {
	if (!afterCommitted) return commit();
	if (database.db.isTransaction) throw new Error("Session commit follow-up requires an outer transaction");
	const capturedEnv = Object.freeze({ ...env });
	const state = captureOpenClawStateDatabaseReadAdmission(resolveOpenClawStateSqlitePath(capturedEnv));
	const maintenance = getOpenClawDatabaseMaintenanceScope();
	const completion = createDeferredCore();
	let active = true;
	const revoke = () => {
		active = false;
	};
	const context = {
		env: capturedEnv,
		assertCurrent() {
			if (!active || cache.databases.get(database.path) !== database || !isOpenClawAgentDatabasePathCurrent(database)) throw new Error("Session commit owner is no longer current");
			if (cache.failures.has(database.path)) throw cache.failures.get(database.path);
			state.assertCurrent();
			maintenance?.assertAdmission();
			assertAgentDatabaseAdmitted(database.agentId, { env: capturedEnv });
		}
	};
	context.assertCurrent();
	const release = retainAgentDatabase(database.db);
	let unregisterAgent;
	let unregisterState;
	try {
		unregisterAgent = registerOpenClawAgentDatabaseAsyncResource({
			agentId: database.agentId,
			path: database.path,
			revoke,
			close: () => completion.promise
		});
		unregisterState = registerOpenClawStateDatabaseAsyncResource({ close: async (identity) => {
			if (!identity || identity.key === state.identity.key) {
				revoke();
				await completion.promise;
			}
		} });
		const result = commit(context);
		await afterCommitted(context);
		return result;
	} finally {
		revoke();
		release();
		completion.resolve();
		unregisterAgent?.();
		unregisterState?.();
	}
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-replacement-worker.ts
function rejectUnknownSessionEntryOutcome(message, cause) {
	if (hasSqliteWorkerOutcomeUnknown(cause)) throw cause;
	const error = new SqliteWorkerError(message, "outcome-unknown");
	error.cause = cause;
	throw error;
}
async function withSessionEntryWorker(options, databaseIdentity, assertCurrent, run, onCommit, retainedExecution) {
	const execution = retainedExecution ?? captureOpenClawAgentDatabaseExecution(options, databaseIdentity ? { expectedIdentity: {
		kind: "file",
		physicalIdentity: databaseIdentity,
		nativeLocation: options.path
	} } : {});
	const assertRetainedIdentity = () => {
		if (!retainedExecution) return;
		if (!options.env || execution.agentId !== normalizeAgentId(options.agentId)) throw new Error("Session writer differs from its captured database scope");
		const accepted = execution.fileIdentity;
		if (!accepted) {
			if (databaseIdentity !== void 0 || execution.path !== options.path) throw new Error("Session writer has no accepted identity for this target");
			return;
		}
		if (databaseIdentity !== void 0 && accepted.physicalIdentity !== databaseIdentity) throw new Error("Session writer differs from its original read snapshot");
		assertExistingDatabaseIdentity(options.path, `file:${accepted.physicalIdentity}`, accepted.birthtime);
	};
	let assertNativeCurrent;
	const context = {
		env: Object.freeze({ ...options.env ?? process.env }),
		assertCurrent() {
			execution.assertCurrent();
			assertRetainedIdentity();
			assertNativeCurrent?.();
		}
	};
	const assertHeld = () => {
		execution.assertCurrent();
		assertCurrent();
		assertRetainedIdentity();
	};
	const source = {
		assertCurrent: assertHeld,
		createAdmission(binding) {
			assertNativeCurrent = () => binding.assertCurrent();
			return (retained) => {
				const admission = createSqliteWorkerOperationAdmission((request, grant) => {
					binding.authorize(request);
					assertHeld();
					if (request.stage === "commit") onCommit?.(admission, retained, request.facts);
					if (!grant()) throw new Error("Session replacement authority expired");
				}, binding.attachment);
				return {
					nativeLocations: binding.nativeLocations,
					admission
				};
			};
		}
	};
	try {
		return await runOpenClawAgentWorkerWrite(options, () => run(execution, source, context));
	} finally {
		if (!retainedExecution) await execution.release();
	}
}
function prepareSessionEntryReplacementDatabase(options, assertCurrent, retainedExecution) {
	return withSessionEntryWorker(options, void 0, assertCurrent, (execution, source) => execution.prepare(source), void 0, retainedExecution);
}
async function initializeSessionTranscriptInWorker(options, databaseIdentity, input, assertCurrent) {
	const publication = retainSessionEntryWorkerPublication({
		agentId: options.agentId,
		storePath: options.path,
		databaseIdentity
	});
	let admitted;
	await withSessionEntryWorker(options, databaseIdentity, assertCurrent, async (execution, source) => {
		if (!await execution.runExisting(source, async (worker) => {
			const outcome = await worker.execute({
				type: "session.transcript.initialize",
				input
			}).then((value) => ({
				ok: true,
				value
			}), (error) => ({
				ok: false,
				error
			}));
			let unknown = outcome.ok;
			if (admitted) {
				await admitted.retained.settled;
				const facts = admitted.admission.committed?.facts;
				const placeholder = isRecord(facts) && isRecord(facts.placeholder) && typeof facts.placeholder.sessionId === "string" ? { sessionId: facts.placeholder.sessionId } : void 0;
				let receipt = outcome.ok ? outcome.value : void 0;
				if (isRecord(facts) && facts.kind === "session-transcript-initialized" && facts.sessionKey === input.sessionKey && (facts.placeholder === void 0 || placeholder?.sessionId === input.sessionId)) receipt = {
					kind: "session-transcript-initialized",
					sessionKey: facts.sessionKey,
					...placeholder ? { placeholder } : {}
				};
				unknown = admitted.admission.settlement?.kind !== "completed" || !receipt;
				publication.settle(receipt, unknown);
			}
			if (unknown) rejectUnknownSessionEntryOutcome("Session transcript initialization has no confirmed native completion and commit receipt", outcome.ok ? void 0 : outcome.error);
			if (!outcome.ok) throw outcome.error;
			return true;
		})) throw new Error("Session database disappeared before transcript initialization");
	}, (admission, retained, facts) => {
		if (!isRecord(facts) || !isRecord(facts.publication) || facts.publication.kind !== "session-transcript-initialized" || facts.publication.sessionKey !== input.sessionKey || facts.publication.placeholder !== void 0 && (!isRecord(facts.publication.placeholder) || facts.publication.placeholder.sessionId !== input.sessionId)) throw new Error("Session transcript commit omitted its exact publication facts");
		admitted = {
			admission,
			retained
		};
		publication.begin([input.sessionKey], []);
	});
}
async function commitSessionEntryReplacementsInWorker(options, databaseIdentity, input, assertCurrent, lifecycle, retainedExecution) {
	const publication = retainSessionEntryWorkerPublication({
		agentId: options.agentId,
		storePath: options.path,
		databaseIdentity
	});
	let committed;
	let admitted;
	const settle = async () => {
		if (!admitted) return committed !== void 0;
		await admitted.retained.settled;
		const facts = admitted.admission.committed?.facts;
		let receipt;
		if (isRecord(facts) && facts.kind === "session-entry-replacements") receipt = facts;
		else if (committed) receipt = prepareSessionEntryReplacementPublication(committed);
		if (receipt) lifecycle.onLifecycleCommitted?.(receipt.pendingArchiveRecovery);
		const unknown = admitted.admission.settlement?.kind !== "completed" || !receipt;
		const published = publication.settle(receipt, unknown);
		if (published) publishCommittedSessionIdentity(lifecycle.identityAgentId, databaseIdentity, published.previous, published.current);
		return unknown;
	};
	return await withSessionEntryWorker(options, databaseIdentity, assertCurrent, (execution, source, context) => execution.runExisting(source, async (worker) => {
		const outcome = await worker.execute({
			type: "session.entries.replace",
			input
		}).then((value) => ({
			ok: true,
			value
		}), (error) => ({
			ok: false,
			error
		}));
		if (outcome.ok) committed = outcome.value;
		if (await settle()) rejectUnknownSessionEntryOutcome("Session replacement has no confirmed native completion and commit receipt", outcome.ok ? void 0 : outcome.error);
		if (!outcome.ok) throw outcome.error;
		await lifecycle.afterCommitted?.(context);
		return outcome.value;
	}).then((result) => {
		if (!result) throw new Error("Session database disappeared before replacement");
		return result;
	}), (admission, retained, facts) => {
		if (!isRecord(facts) || !isRecord(facts.publication) || facts.publication.kind !== "session-entry-replacements" || !Array.isArray(facts.publication.changedKeys) || !facts.publication.changedKeys.every((key) => typeof key === "string") || !Array.isArray(facts.publication.membershipInvalidatedKeys) || !facts.publication.membershipInvalidatedKeys.every((key) => typeof key === "string")) throw new Error("Session replacement commit omitted its publication keys");
		admitted = {
			admission,
			retained
		};
		publication.begin(facts.publication.changedKeys, facts.publication.membershipInvalidatedKeys);
	}, retainedExecution);
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-replacement-projection.ts
async function applySqliteSessionEntryReplacementProjection(params, normalize) {
	const env = cloneEnvWithPlatformSemantics(params.env ?? process.env);
	env.OPENCLAW_STATE_DIR = resolveStateDir(env);
	const target = {
		...params.agentId ? { agentId: params.agentId } : {},
		sessionKey: params.activeSessionKey ?? params.sessionKeys?.[0] ?? "",
		storePath: params.storePath,
		env
	};
	const admission = isMainThread ? resolveSqliteWriteAdmissionScope(target) : void 0;
	const scope = admission ?? (isMainThread ? await prepareSqliteScope(target) : resolveSqliteScope(target));
	scope.path ??= resolveOpenClawAgentSqlitePath(toDatabaseOptions(scope));
	const preparedWrite = await runPreparedSqliteSessionWrite(scope, async (preparedScope) => {
		const resolved = {
			...preparedScope,
			env
		};
		const databaseOptions = {
			...toDatabaseOptions(resolved),
			path: resolveOpenClawAgentSqlitePath(toDatabaseOptions(resolved))
		};
		const useWorker = isMainThread && supportsOpenClawAgentDatabaseExecution(databaseOptions);
		const readNative = () => withSqliteSessionDatabase(databaseOptions, (database) => ({
			...readSessionEntryReplacementState(database, params),
			databaseIdentity: readOpenClawAgentDatabaseIdentity(database).identity
		}));
		const snapshot = useWorker ? await withSessionHistoryWorkerDatabase(databaseOptions, async (owner) => {
			const read = () => owner.readExactEntries({
				sessionKeys: params.sessionKeys ?? [],
				projection: "replacement",
				replacementSelection: {
					sessionKeys: params.sessionKeys,
					statuses: params.statuses,
					includeLabelOwners: params.includeLabelOwners
				},
				env: { ...resolved.env }
			});
			let result = await read();
			if (!result.replacement) {
				await prepareSessionEntryReplacementDatabase(databaseOptions, () => {
					owner.assertCurrent();
					params.assertCommitAllowed?.();
				}, params.retainedExecution);
				result = await read();
			}
			if (!result.replacement) throw new Error("Session replacement snapshot lost its initialized database");
			return result.replacement;
		}) : await readNative();
		const { entries, expectedRows, labelOwnerKeys } = snapshot;
		const selectedKeys = params.sessionKeys ? new Set(params.sessionKeys) : void 0;
		const selectedStatuses = params.statuses ? new Set(params.statuses) : void 0;
		const replacementAuthorityKeys = selectedStatuses ? new Set(entries.map(({ sessionKey }) => sessionKey)) : selectedKeys;
		const operation = await params.update(entries);
		const replacements = normalize(operation.replacements);
		const claimedCanonicalKeys = /* @__PURE__ */ new Set();
		for (const replacement of replacements) {
			const previousSessionKeys = replacement.previousSessionKeys;
			const canonical = previousSessionKeys !== void 0;
			if (canonical && !replacement.sessionKey) throw new Error("Session entry replacement requires a key");
			if (canonical && [replacement.sessionKey, ...previousSessionKeys ?? []].some(isInternalSessionEffectsKey)) throw new Error("Session entry canonical replacement cannot target internal effects rows");
			for (const sessionKey of [replacement.sessionKey, ...previousSessionKeys ?? []]) {
				if (replacementAuthorityKeys && !replacementAuthorityKeys.has(sessionKey)) throw new Error(`Session entry replacement is outside the selected ${selectedStatuses ? "row" : "key"} set: ${sessionKey}`);
				if (canonical) {
					if (claimedCanonicalKeys.has(sessionKey)) throw new Error(`Session entry replacements overlap at ${sessionKey}`);
					claimedCanonicalKeys.add(sessionKey);
				}
			}
			if (canonical) {
				for (const previousSessionKey of previousSessionKeys) if (!expectedRows.has(previousSessionKey)) throw new Error(`Session entry canonical projection cannot replace missing alias ${previousSessionKey}`);
			}
		}
		const applicable = replacements.filter((replacement) => replacement.previousSessionKeys || expectedRows.has(replacement.sessionKey));
		if (params.requireWriteSuccess && replacements.length > 0 && applicable.length === 0) throw new Error("session entry replacements did not persist any rows");
		if (applicable.length === 0) return {
			deletedEntries: [],
			commit: () => ({
				maintenancePlans: [],
				result: operation.result
			})
		};
		const mutationKeys = new Set(applicable.flatMap((replacement) => [replacement.sessionKey, ...replacement.previousSessionKeys ?? []]));
		const validationKeys = /* @__PURE__ */ new Set([...mutationKeys, ...labelOwnerKeys]);
		return {
			deletedEntries: [...mutationKeys].flatMap((sessionKey) => {
				const entry = expectedRows.get(sessionKey)?.entry;
				return entry && !applicable.some((replacement) => replacement.sessionKey === sessionKey) ? [{
					entry,
					sessionKey
				}] : [];
			}),
			commit: async (assertSourceCurrent) => {
				const maintenance = params.skipMaintenance === false ? {
					activeSessionKey: params.activeSessionKey ?? "",
					archiveDirectory: resolveSqliteTranscriptArchiveDirectory(resolved),
					maintenance: resolveMaintenanceConfig(),
					preservation: captureSessionMaintenancePreservation(params.storePath),
					storePath: params.storePath
				} : void 0;
				const assertCurrent = () => {
					assertSourceCurrent?.();
					params.assertCommitAllowed?.();
					if (maintenance && !isDeepStrictEqual(maintenance.preservation, captureSessionMaintenancePreservation(params.storePath))) throw new Error("Session maintenance protection changed before replacement");
				};
				const input = {
					expectedRows,
					labelOwnerKeys,
					includeLabelOwners: params.includeLabelOwners,
					validationKeys: [...validationKeys],
					replacements: applicable,
					checkPendingArchiveRecovery: params.checkPendingArchiveRecovery,
					consumePendingReset: params.consumePendingReset,
					ownerAssignment: params.ownerAssignment,
					labelClaim: params.labelClaim,
					preparedTranscript: params.preparedTranscript,
					maintenance
				};
				if (!useWorker || hasPreparedNativeSessionDeletion()) return withSqliteSessionDatabase(databaseOptions, (owned) => withNativeSessionCommitContext(owned, resolved.env, (source) => {
					const committed = runSqliteSessionDeletionTransaction((database) => {
						if (params.onLifecycleCommitted) deferOpenClawAgentPostCommitPublication(database, () => params.onLifecycleCommitted?.(result.pendingArchiveRecovery));
						const result = commitSessionEntryReplacementsInDatabase(database, input, () => {
							assertCurrent();
							source?.assertCurrent();
						});
						return {
							...result,
							publish: prepareSessionIdentityPublication(database, resolved.agentId, result.previous, result.current)
						};
					}, databaseOptions, { operationLabel: "session.entry-replacements" });
					committed.publish();
					return {
						maintenancePlans: committed.maintenancePlans,
						result: operation.result
					};
				}, params.afterCommitted ? (source) => params.afterCommitted(operation.result, source) : void 0), assertCurrent);
				if (typeof snapshot.databaseIdentity !== "string") throw new Error("Session replacement requires its durable database identity");
				return {
					maintenancePlans: (await commitSessionEntryReplacementsInWorker(databaseOptions, snapshot.databaseIdentity, input, assertCurrent, {
						identityAgentId: resolved.agentId,
						onLifecycleCommitted: params.onLifecycleCommitted,
						afterCommitted: params.afterCommitted ? (context) => params.afterCommitted(operation.result, context) : void 0
					}, params.retainedExecution)).maintenancePlans,
					result: operation.result
				};
			}
		};
	}, "session.entry-replacements", params.withCommit, admission ? () => prepareSqliteScope(target) : void 0);
	const committed = preparedWrite.result;
	await finalizeSessionEntryMaintenancePlansAfterWriterReleaseBestEffort(preparedWrite.scope, committed.maintenancePlans, { deletedEntriesBeforeMaintenance: preparedWrite.deletedEntries });
	return committed.result;
}
async function applySessionEntryExactReplacements(params) {
	return await applySqliteSessionEntryReplacementProjection(params, (replacements) => [...replacements ?? []].map(({ entry, sessionKey }) => ({
		entry,
		sessionKey
	})));
}
/** Internal alias-aware owner; public SDK replacements remain exact-key only. */
async function applySessionEntryCanonicalReplacements(params) {
	return await applySqliteSessionEntryReplacementProjection({
		...params,
		...params.sessionKeys ? { sessionKeys: uniqueStrings(params.sessionKeys.map((key) => key.trim()).filter(Boolean)) } : {}
	}, (replacements) => [...replacements ?? []].map((replacement) => ({
		entry: replacement.entry,
		previousSessionKeys: uniqueStrings(replacement.previousSessionKeys.map((key) => key.trim()).filter(Boolean)),
		sessionKey: replacement.sessionKey.trim()
	})));
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-batch-projection.ts
/** Compatibility adapter for the shipped detached-store projection. */
async function applySessionEntryBatchProjection(params) {
	return await applySessionEntryCanonicalReplacements({
		...params,
		update: async (entries) => {
			const store = Object.fromEntries(entries.flatMap(({ entry, sessionKey }) => isInternalSessionEffectsKey(sessionKey) ? [] : [[sessionKey, entry]]));
			const operation = await params.update(store);
			return {
				result: operation.result,
				replacements: [...operation.mutations ?? []].map((mutation) => ({
					entry: mutation.entry,
					previousSessionKeys: mutation.previousSessionKeys ?? [],
					sessionKey: mutation.sessionKey
				}))
			};
		}
	});
}
//#endregion
//#region src/config/sessions/session-accessor.lifecycle-types.ts
var SessionEntryLifecycleUpsertConflictError = class extends Error {
	constructor(sessionKey) {
		super(`SQLite session entry changed before lifecycle upsert for ${sessionKey}`);
		this.sessionKey = sessionKey;
		this.name = "SessionEntryLifecycleUpsertConflictError";
	}
};
//#endregion
//#region src/config/sessions/session-accessor.sqlite-projection.ts
let sessionArchiveRuntimePromise;
function loadSessionArchiveRuntime$1() {
	sessionArchiveRuntimePromise ??= import("./session-archive.runtime.js");
	return sessionArchiveRuntimePromise;
}
/**
* Applies a detached whole-store projection under the SQLite writer lane.
* This exists only for bounded compatibility adapters that must preserve a
* legacy serialized callback without exposing mutable storage internals.
*/
async function applySessionStoreProjection(params) {
	const resolved = resolveSqliteScope({
		...params.agentId ? { agentId: params.agentId } : {},
		sessionKey: params.activeSessionKey ?? "",
		storePath: params.storePath
	});
	const preparedWrite = await runPreparedSqliteSessionWrite(resolved, async () => {
		return withSqliteSessionDatabase(toDatabaseOptions(resolved), async (database) => {
			const before = readSessionEntryStore(database);
			const projected = structuredClone(before);
			const operation = await params.update(projected);
			if (!operation.persist) return {
				deletedEntries: [],
				commit: () => ({
					maintenancePlans: [],
					result: operation.result
				})
			};
			const lockedEntriesBefore = new Map(Object.entries(before).filter(([, entry]) => entry.modelSelectionLocked === true));
			const transitionError = resolveAgentHarnessSessionStoreTransitionError({
				before: lockedEntriesBefore,
				store: projected
			});
			const storeError = resolveAgentHarnessSessionStoreError(projected);
			if (transitionError || storeError) throw new Error(transitionError ?? storeError);
			const changedKeys = uniqueStrings([...Object.keys(before), ...Object.keys(projected)]).filter((sessionKey) => !sqliteSessionEntriesEqual(before[sessionKey], projected[sessionKey]));
			if (changedKeys.length === 0) return {
				deletedEntries: [],
				commit: () => ({
					maintenancePlans: [],
					result: operation.result
				})
			};
			const maintenancePlans = [];
			return {
				deletedEntries: changedKeys.flatMap((sessionKey) => {
					const entry = before[sessionKey];
					return entry && !projected[sessionKey] ? [{
						entry,
						sessionKey
					}] : [];
				}),
				commit: (assertSourceCurrent) => withSqliteSessionDatabase(toDatabaseOptions(resolved), () => {
					runSqliteSessionDeletionTransaction((transactionDb) => {
						assertSourceCurrent?.();
						for (const sessionKey of changedKeys) {
							const current = readExactSessionEntryRow(transactionDb, sessionKey)?.entry;
							if (!sqliteSessionEntriesEqual(current, before[sessionKey])) throw new Error(`SQLite session entry changed before store projection for ${sessionKey}`);
						}
						for (const sessionKey of changedKeys) {
							const entry = projected[sessionKey];
							if (entry) writeSessionEntry(transactionDb, sessionKey, structuredClone(entry), { previousEntry: before[sessionKey] ?? null });
							else deleteSessionEntryRows(transactionDb, sessionKey);
						}
						maintenancePlans.push(applySessionEntryMaintenance(transactionDb, {
							activeSessionKey: params.activeSessionKey ?? "",
							archiveDirectory: resolveSqliteTranscriptArchiveDirectory(resolved),
							skipMaintenance: params.skipMaintenance,
							storePath: params.storePath
						}));
					}, toDatabaseOptions(resolved), { operationLabel: "session.store-projection" });
					return {
						maintenancePlans,
						result: operation.result
					};
				})
			};
		});
	}, "session.store-projection");
	const committed = preparedWrite.result;
	await finalizeSessionEntryMaintenancePlansAfterWriterReleaseBestEffort(resolved, committed.maintenancePlans, { deletedEntriesBeforeMaintenance: preparedWrite.deletedEntries });
	return committed.result;
}
function readProjectedRemovalEntry(database, projected, allowCanonicalRepair = false) {
	if (projected.removal.expectedRawEntryJson === void 0) return (allowCanonicalRepair ? readExactSessionEntryRowForCanonicalRepair(database, projected.sessionKey, { allowMalformedRowRepair: true }) : readExactSessionEntryRow(database, projected.sessionKey))?.entry;
	assertRawSessionEntryRemovalUnchanged(database, projected.sessionKey, projected.removal);
	return projected.expectedEntry;
}
/** Applies exact lifecycle removals/upserts using SQLite session rows. */
async function applySessionEntryLifecycleMutation(params) {
	const resolved = captureLifecycleDatabaseScope(resolveSqliteScope({
		...params.agentId ? { agentId: params.agentId } : {},
		env: params.env,
		sessionKey: "",
		storePath: params.storePath
	}));
	const removals = [...params.removals ?? []];
	const upserts = [...params.upserts ?? []];
	let artifactCleanupError;
	const captureArtifactCleanupError = (error) => {
		if (params.captureArtifactCleanupError === true) {
			artifactCleanupError ??= error;
			return;
		}
		throw error;
	};
	let projected;
	let materializedRemovalPlans = [];
	let removalArchiveMaterializationFailed = false;
	const preparedWrite = await runPreparedSqliteSessionWrite(resolved, async () => {
		projected = await projectSessionEntryLifecycleMutation(toDatabaseOptions(resolved), {
			...params.allowCanonicalRepair ? { allowCanonicalRepair: true } : {},
			archiveDirectory: resolveSqliteTranscriptArchiveDirectory(resolved),
			removals,
			upserts
		});
		const deletedOwners = projected.removals.flatMap(({ sessionKey, expectedEntry: entry }) => {
			return entry && !projected.upsertedEntries.some((upsert) => upsert.sessionKey === sessionKey) ? [{
				entry,
				sessionKey
			}] : [];
		});
		const resetSources = projected.upsertedEntries.flatMap(({ resetBoundary, expectedEntry }) => resetBoundary && expectedEntry?.sessionId ? [expectedEntry.sessionId] : []);
		return {
			deletedEntries: deletedOwners,
			...projected.deletePlans.length > 0 || resetSources.length > 0 ? { beforeCommit: async () => {
				if (resetSources.length > 0) {
					const { restoreSessionColdTranscript } = await import("./session-cold-storage-Bz1cFOwq.mjs");
					for (const sessionId of new Set(resetSources)) await restoreSessionColdTranscript({
						agentId: resolved.agentId,
						env: resolved.env,
						storePath: params.storePath,
						sessionId
					});
				}
				try {
					materializedRemovalPlans = await materializeSessionStateDeletePlans(projected.deletePlans);
				} catch (error) {
					removalArchiveMaterializationFailed = true;
					captureArtifactCleanupError(error);
				}
			} } : {},
			commit: (assertSourceCurrent) => withSqliteSessionDatabase(toDatabaseOptions(resolved), (database) => withNativeSessionCommitContext(database, resolved.env, (source) => commitProjectedLifecycleMutation(materializedRemovalPlans, removalArchiveMaterializationFailed, () => {
				assertSourceCurrent?.();
				source?.assertCurrent();
			}), params.afterCommitted))
		};
	}, "session.lifecycle.mutate", params.withCommit);
	const committed = preparedWrite.result;
	function commitProjectedLifecycleMutation(removalPlans, materializationFailed, assertSourceCurrent) {
		let beforeCount = 0;
		const removedSessionKeys = [];
		let archivedTranscripts = [];
		let pendingArchives = true;
		const maintenancePlans = [];
		runSqliteSessionDeletionTransaction((transactionDb) => {
			params.beforeCommitInTransaction?.();
			assertSourceCurrent?.();
			if (projected.archiveRecovery?.databaseIdentity === readOpenClawAgentDatabaseIdentity(transactionDb).identity) pendingArchives = projected.archiveRecovery.pending;
			if (params.onLifecycleCommitted) deferOpenClawAgentPostCommitPublication(transactionDb, params.onLifecycleCommitted);
			beforeCount = readSessionEntryCount(transactionDb);
			const validatedRemovals = projected.removals.filter((removal) => {
				if (materializationFailed && removal.removal.archiveRemovedTranscript === true) return false;
				const entry = readProjectedRemovalEntry(transactionDb, removal, params.allowCanonicalRepair);
				if (!sqliteSessionEntriesEqual(entry, removal.expectedEntry)) {
					const replacedInSameMutation = projected.upsertedEntries.some((upsert) => upsert.sessionKey === removal.sessionKey);
					throw new Error(replacedInSameMutation ? `SQLite session entry has stale lifecycle state for ${removal.sessionKey}` : `SQLite session entry changed before lifecycle removal for ${removal.sessionKey}`);
				}
				const shouldRemove = shouldRemoveSessionEntry(entry, removal.removal);
				if (!shouldRemove && projected.upsertedEntries.some((upsert) => upsert.sessionKey === removal.sessionKey)) throw new Error(`SQLite session entry has stale lifecycle state for ${removal.sessionKey}`);
				return shouldRemove;
			});
			archivedTranscripts = deleteMaterializedSessionStatePlans(transactionDb, removalPlans, void 0, new Set(validatedRemovals.map((removal) => removal.sessionKey)));
			const legacyReplacementTargets = /* @__PURE__ */ new Map();
			for (const { sessionKey, entry, expectedEntry, routeContext, resetBoundary } of projected.upsertedEntries) {
				const sameKeyRemoval = validatedRemovals.find((removal) => removal.sessionKey === sessionKey);
				const currentEntry = sameKeyRemoval ? readProjectedRemovalEntry(transactionDb, sameKeyRemoval, params.allowCanonicalRepair) : (params.allowCanonicalRepair ? readExactSessionEntryRowForCanonicalRepair(transactionDb, sessionKey, { allowMalformedRowRepair: true }) : readExactSessionEntryRow(transactionDb, sessionKey))?.entry;
				const expectedCurrentEntry = expectedEntry ?? sameKeyRemoval?.expectedEntry;
				if (!sqliteSessionEntriesEqual(currentEntry, expectedCurrentEntry)) {
					if (sameKeyRemoval) throw new Error(`SQLite session entry has stale lifecycle state for ${sessionKey}`);
					throw new SessionEntryLifecycleUpsertConflictError(sessionKey);
				}
				if (sameKeyRemoval && !shouldRemoveSessionEntry(currentEntry, sameKeyRemoval.removal)) throw new Error(`SQLite session entry has stale lifecycle state for ${sessionKey}`);
				if (resetBoundary && expectedEntry?.sessionId) {
					const boundaryScope = {
						...resolved,
						sessionId: expectedEntry.sessionId,
						sessionKey
					};
					appendSessionResetBoundary(transactionDb, boundaryScope, expectedEntry, resetBoundary);
				}
				writeSessionEntry(transactionDb, sessionKey, entry, {
					allowStoredAliases: params.allowCanonicalRepair === true,
					preserveNodeSuggestions: params.allowCanonicalRepair === true,
					previousEntry: expectedCurrentEntry ?? null,
					...routeContext !== void 0 ? { routeContext } : {}
				});
				const relatedRemovalKeys = validatedRemovals.flatMap((removal) => {
					const removedSessionId = removal.expectedEntry.sessionId;
					return removal.sessionKey !== sessionKey && (removedSessionId === entry.sessionId || removedSessionId === entry.previousSessionId) ? [removal.sessionKey] : [];
				});
				rehomeSessionWindows(transactionDb, sessionKey, relatedRemovalKeys);
				for (const legacyKey of relatedRemovalKeys) {
					const removedEntry = validatedRemovals.find((removal) => removal.sessionKey === legacyKey)?.expectedEntry;
					legacyReplacementTargets.set(legacyKey, {
						canonicalKey: sessionKey,
						rehomeMembers: removedEntry?.sessionId === entry.sessionId
					});
				}
			}
			params.afterUpsertsInTransaction?.(transactionDb);
			params.afterFreshUpsertsInTransaction?.(transactionDb);
			const upsertedKeys = new Set(projected.upsertedEntries.map((upsert) => upsert.sessionKey));
			for (const removal of validatedRemovals) {
				if (upsertedKeys.has(removal.sessionKey)) continue;
				const entry = readProjectedRemovalEntry(transactionDb, removal, params.allowCanonicalRepair);
				if (!sqliteSessionEntriesEqual(entry, removal.expectedEntry)) throw new Error(`SQLite session entry changed before lifecycle removal for ${removal.sessionKey}`);
				if (!shouldRemoveSessionEntry(entry, removal.removal)) continue;
				const replacement = legacyReplacementTargets.get(removal.sessionKey);
				if (replacement) deleteLegacySessionEntryRows(transactionDb, [removal.sessionKey], replacement.canonicalKey, {
					rehomeMembers: replacement.rehomeMembers,
					validatedEntries: /* @__PURE__ */ new Map([[removal.sessionKey, entry]])
				});
				else deleteSessionEntryRows(transactionDb, removal.sessionKey, {
					deleteOwnedWindows: removal.removal.deleteOwnedWindows === true,
					deliveryCleanupKeys: removal.removal.deliveryCleanupKeys,
					validatedEntry: entry
				});
				removedSessionKeys.push(removal.sessionKey);
			}
			maintenancePlans.push(applySessionEntryMaintenance(transactionDb, {
				activeSessionKey: params.activeSessionKey ?? "",
				archiveDirectory: resolveSqliteTranscriptArchiveDirectory(resolved),
				forceMaintenance: params.maintenanceOverride !== void 0,
				maintenanceConfig: params.maintenanceOverride ? {
					...resolveMaintenanceConfig(),
					...params.maintenanceOverride
				} : void 0,
				skipMaintenance: params.skipMaintenance,
				storePath: params.storePath
			}));
			return prepareLifecycleIdentityPublication({
				database: transactionDb,
				agentId: resolved.agentId,
				projected,
				removedSessionKeys
			});
		}, toDatabaseOptions(resolved), { operationLabel: "session.lifecycle.project" })();
		return {
			archivedTranscripts,
			beforeCount,
			maintenancePlans,
			removedSessionKeys,
			publishArchives: archivedTranscripts.length > 0 || params.allowCanonicalRepair === true || params.afterUpsertsInTransaction !== void 0 || removals.length > 0 || (pendingArchives || params.withCommit !== void 0 || projected.upsertedEntries.some(({ resetBoundary }) => resetBoundary !== void 0)) && (params.skipMaintenance !== true || projected.upsertedEntries.length === 0 || projected.upsertedEntries.some(({ expectedEntry }) => expectedEntry !== void 0))
		};
	}
	const { archivedTranscripts: maintenanceArchivedTranscripts, ...maintenance } = await finalizeSessionEntryMaintenancePlansAfterWriterReleaseBestEffort(resolved, committed.maintenancePlans, { deletedEntriesBeforeMaintenance: preparedWrite.deletedEntries });
	let publishedRemovalTranscripts = [];
	try {
		if (committed.publishArchives) publishedRemovalTranscripts = await publishSessionStateArchives(resolved, committed.archivedTranscripts);
	} catch (error) {
		captureArtifactCleanupError(error);
	}
	const archivedTranscripts = [...publishedRemovalTranscripts, ...maintenanceArchivedTranscripts];
	const afterCount = readSessionEntryCount(openOpenClawAgentDatabase(toDatabaseOptions(resolved)));
	emitArchivedTranscriptUpdates(archivedTranscripts);
	const archivedTranscriptDirectories = uniqueStrings(archivedTranscripts.map((transcript) => path.dirname(transcript.archivedPath))).toSorted();
	if (archivedTranscriptDirectories.length > 0 && params.cleanupArchivedTranscripts) try {
		const { cleanupArchivedSessionTranscripts } = await loadSessionArchiveRuntime$1();
		await cleanupArchivedSessionTranscripts({
			directories: archivedTranscriptDirectories,
			rules: params.cleanupArchivedTranscripts.rules,
			nowMs: params.cleanupArchivedTranscripts.nowMs
		});
		await prunePublishedSessionArchivesByRetention({
			scope: resolved,
			rules: params.cleanupArchivedTranscripts.rules,
			nowMs: params.cleanupArchivedTranscripts.nowMs
		});
	} catch (error) {
		captureArtifactCleanupError(error);
	}
	return {
		beforeCount: committed.beforeCount,
		removedEntries: committed.removedSessionKeys.length,
		removedSessionKeys: committed.removedSessionKeys,
		...maintenance,
		archivedTranscriptDirectories,
		afterCount,
		artifactCleanupError
	};
}
/** Purges entries owned by a deleted agent from SQLite session rows. */
async function purgeDeletedAgentSessionEntries(params) {
	const resolved = resolveSqliteScope({
		agentId: params.storeAgentId,
		env: params.env,
		sessionKey: "",
		storePath: params.storePath
	});
	const prepared = await runExclusiveSqliteSessionWrite(resolved, async () => {
		const database = openOpenClawAgentDatabase(toDatabaseOptions(resolved));
		const store = readSessionEntryStore(database);
		const remainingStore = { ...store };
		const entryRemovals = [];
		const removedEntriesToArchive = [];
		for (const sessionKey of Object.keys(store)) {
			if (resolveStoredSessionOwnerAgentId({
				cfg: params.cfg,
				agentId: params.storeAgentId,
				sessionKey
			}) !== params.agentId) continue;
			const entry = store[sessionKey];
			if (!entry) continue;
			entryRemovals.push({
				expectedEntry: structuredClone(entry),
				sessionKey
			});
			removedEntriesToArchive.push(entry);
			delete remainingStore[sessionKey];
		}
		const referencedSessionIds = collectProjectedReferencedSessionIds({
			database,
			excludedSessionKeys: entryRemovals.map((removal) => removal.sessionKey),
			projectedStore: remainingStore,
			candidateSessionIds: removedEntriesToArchive.flatMap(collectSessionStateIdsForEntry)
		});
		return {
			deletePlans: removedEntriesToArchive.flatMap((entry) => planSessionStateAfterEntryRemoval({
				archiveDirectory: resolveSqliteTranscriptArchiveDirectory(resolved),
				database,
				entry,
				reason: "deleted",
				referencedSessionIds
			})),
			entryRemovals
		};
	}, "session.agent-purge.prepare");
	const materializedPlans = await materializeSessionStateDeletePlans(prepared.deletePlans);
	const committed = await withSqliteSessionDeletions(resolved, prepared.entryRemovals.flatMap(({ expectedEntry: entry, sessionKey }) => entry ? [{
		entry,
		sessionKey
	}] : []), async () => await runExclusiveSqliteSessionWrite(resolved, async () => {
		let archivedTranscripts = [];
		const maintenancePlans = [];
		runSqliteSessionDeletionTransaction((transactionDb) => {
			const currentOwnedSessionKeys = Object.keys(readSessionEntryStore(transactionDb)).filter((sessionKey) => resolveStoredSessionOwnerAgentId({
				cfg: params.cfg,
				agentId: params.storeAgentId,
				sessionKey
			}) === params.agentId).toSorted();
			const plannedSessionKeys = prepared.entryRemovals.map((removal) => removal.sessionKey).toSorted();
			if (JSON.stringify(currentOwnedSessionKeys) !== JSON.stringify(plannedSessionKeys)) throw new Error("SQLite deleted-agent session entries changed before purge");
			assertPlannedLifecycleArtifactEntriesUnchanged(transactionDb, prepared.entryRemovals);
			archivedTranscripts = deleteMaterializedSessionStatePlans(transactionDb, materializedPlans, void 0, new Set(prepared.entryRemovals.map((removal) => removal.sessionKey)));
			deletePlannedLifecycleArtifactEntries(transactionDb, prepared.entryRemovals);
			const publish = prepareCommittedSessionEntryRemovals(resolved.agentId, readOpenClawAgentDatabaseIdentity(transactionDb).identity, prepared.entryRemovals);
			maintenancePlans.push(applySessionEntryMaintenance(transactionDb, {
				activeSessionKey: "",
				archiveDirectory: resolveSqliteTranscriptArchiveDirectory(resolved),
				storePath: params.storePath
			}));
			return publish;
		}, toDatabaseOptions(resolved), { operationLabel: "session.entry.purge-deleted-agent" })();
		return {
			archivedTranscripts,
			maintenancePlans
		};
	}, "session.agent-purge.commit"));
	const { archivedTranscripts: maintenanceArchivedTranscripts } = await finalizeSessionEntryMaintenancePlansAfterWriterReleaseBestEffort(resolved, committed.maintenancePlans, { deletedEntriesBeforeMaintenance: prepared.entryRemovals.length });
	const archivedTranscripts = [...await publishSessionStateArchives(resolved, committed.archivedTranscripts), ...maintenanceArchivedTranscripts];
	emitArchivedTranscriptUpdates(archivedTranscripts);
}
//#endregion
//#region src/config/sessions/session-entry-selection.ts
var SessionLabelOwnerIndex = class {
	#owners = /* @__PURE__ */ new Map();
	constructor(store) {
		this.store = store;
		for (const [sessionKey, entry] of Object.entries(this.store)) this.#update(sessionKey, entry.label, true);
	}
	isLabelInUse(label, excludedKeys) {
		for (const sessionKey of this.#owners.get(label) ?? []) if (!excludedKeys.includes(sessionKey)) return true;
		return false;
	}
	replaceEntry(candidateKeys, primaryKey, entry) {
		for (const sessionKey of /* @__PURE__ */ new Set([...candidateKeys, primaryKey])) {
			this.#update(sessionKey, this.store[sessionKey]?.label, false);
			delete this.store[sessionKey];
		}
		const cloned = structuredClone(entry);
		this.store[primaryKey] = cloned;
		this.#update(primaryKey, cloned.label, true);
		return cloned;
	}
	#update(sessionKey, label, add) {
		if (label === void 0) return;
		const owners = this.#owners.get(label) ?? /* @__PURE__ */ new Set();
		if (add) {
			owners.add(sessionKey);
			this.#owners.set(label, owners);
			return;
		}
		owners.delete(sessionKey);
	}
};
function selectSessionModelOverride(entry) {
	return {
		modelOverride: entry.modelOverride,
		providerOverride: entry.providerOverride,
		modelOverrideSource: entry.modelOverrideSource,
		modelOverrideRouteResolution: entry.modelOverrideRouteResolution,
		agentRuntimeOverride: entry.agentRuntimeOverride
	};
}
/** Carries only user/runtime selection into a new dashboard fork. */
function inheritSessionSelection(parentEntry) {
	if (!parentEntry) return {};
	const authProfileOverrideSource = resolveSessionAuthProfileOverrideSource(parentEntry);
	const inheritModelSelection = !hasSessionActiveAutoModelFallback(parentEntry);
	const inheritAuthProfile = inheritModelSelection || authProfileOverrideSource === "user" || authProfileOverrideSource === "user-link";
	return {
		...inheritModelSelection && parentEntry.providerOverride ? { providerOverride: parentEntry.providerOverride } : {},
		...inheritModelSelection && parentEntry.modelOverride ? { modelOverride: parentEntry.modelOverride } : {},
		...inheritModelSelection && parentEntry.modelOverrideSource ? { modelOverrideSource: parentEntry.modelOverrideSource } : {},
		...inheritModelSelection && parentEntry.modelOverrideRouteResolution ? { modelOverrideRouteResolution: parentEntry.modelOverrideRouteResolution } : {},
		...inheritModelSelection && parentEntry.agentRuntimeOverride ? { agentRuntimeOverride: parentEntry.agentRuntimeOverride } : {},
		...parentEntry.contextWindow ? { contextWindow: parentEntry.contextWindow } : {},
		...parentEntry.thinkingLevel ? { thinkingLevel: parentEntry.thinkingLevel } : {},
		...parentEntry.fastMode !== void 0 ? { fastMode: parentEntry.fastMode } : {},
		...parentEntry.toolOverrides ? { toolOverrides: parentEntry.toolOverrides } : {},
		...parentEntry.verboseLevel ? { verboseLevel: parentEntry.verboseLevel } : {},
		...parentEntry.traceLevel ? { traceLevel: parentEntry.traceLevel } : {},
		...parentEntry.reasoningLevel ? { reasoningLevel: parentEntry.reasoningLevel } : {},
		...parentEntry.elevatedLevel ? { elevatedLevel: parentEntry.elevatedLevel } : {},
		...inheritAuthProfile && authProfileOverrideSource && parentEntry.authProfileOverride ? { authProfileOverride: parentEntry.authProfileOverride } : {},
		...inheritAuthProfile && authProfileOverrideSource ? { authProfileOverrideSource } : {}
	};
}
function resolveProjectionExistingEntry(snapshot, target) {
	const candidateKeys = target.candidateKeys ?? [target.primaryKey];
	let freshest;
	for (const candidateKey of candidateKeys) {
		const entry = snapshot.store[candidateKey];
		if (entry && (!freshest || (entry.updatedAt ?? 0) > (freshest.updatedAt ?? 0))) freshest = entry;
	}
	return freshest ? structuredClone(freshest) : void 0;
}
//#endregion
//#region src/config/sessions/session-accessor.lifecycle.ts
/** Projects ordered session patches against one store snapshot and commits once. */
async function applySessionPatchProjections(params) {
	return await applySessionEntryBatchProjection({
		agentId: params.agentId,
		sessionKeys: params.sessionKeys,
		storePath: params.storePath,
		skipMaintenance: true,
		update: async (workingStore) => {
			const snapshot = { store: workingStore };
			const labelOwners = new SessionLabelOwnerIndex(workingStore);
			const mutations = [];
			const results = [];
			for (const operation of params.operations) try {
				const target = operation.resolveTarget(snapshot);
				const existingEntry = resolveProjectionExistingEntry(snapshot, target);
				const candidateKeys = uniqueStrings((target.candidateKeys ?? [target.primaryKey]).map((key) => key.trim()).filter(Boolean));
				const projected = await operation.project({
					...target,
					...snapshot,
					...existingEntry ? { existingEntry } : {},
					isLabelInUse: (label) => labelOwners.isLabelInUse(label, candidateKeys)
				});
				if (!projected.ok) {
					results.push(projected);
					continue;
				}
				const authorizationFailure = operation.authorize?.();
				if (authorizationFailure) {
					results.push(authorizationFailure);
					continue;
				}
				const previousSessionKeys = candidateKeys.filter((sessionKey) => sessionKey !== target.primaryKey && workingStore[sessionKey]);
				mutations.push({
					entry: projected.entry,
					...previousSessionKeys.length > 0 ? { previousSessionKeys } : {},
					sessionKey: target.primaryKey
				});
				const cloned = labelOwners.replaceEntry(candidateKeys, target.primaryKey, projected.entry);
				results.push({
					ok: true,
					entry: structuredClone(cloned)
				});
			} catch (error) {
				if (!operation.onError) throw error;
				results.push(operation.onError(error));
			}
			return {
				mutations,
				result: results
			};
		}
	});
}
/** Applies one patch through the canonical ordered batch projection owner. */
async function applySessionPatchProjection(params) {
	const [result] = await applySessionPatchProjections({
		agentId: params.agentId,
		sessionKeys: params.sessionKeys,
		storePath: params.storePath,
		operations: [{
			resolveTarget: params.resolveTarget,
			project: params.project,
			...params.assertCurrent ? { authorize: () => {
				params.assertCurrent?.();
			} } : {}
		}]
	});
	if (!result) throw new Error("Session patch projection produced no result");
	return result;
}
/**
* Clears plugin host-owned state inside one resolved session store.
* This is an internal transaction-sized boundary for the storage backend, not
* a Plugin SDK API.
*/
async function cleanupPluginHostSessionStore(params) {
	if (shouldSkipPluginHostCleanupStore(params) || params.shouldCleanup && !params.shouldCleanup()) return 0;
	const now = Date.now();
	let cleared = 0;
	for (const { entry, sessionKey } of listSessionEntriesCore({
		agentId: params.agentId,
		storePath: params.storePath,
		projection: "list"
	})) {
		if (isLockedHarnessSessionOwnedByPlugin(entry, params.preserveLockedHarnessIds)) continue;
		if (!matchesPluginHostCleanupSession(sessionKey, entry, params.sessionKey) || !hasPluginHostCleanupTarget(entry, params)) continue;
		if (params.shouldCleanup && !params.shouldCleanup()) break;
		await patchSessionEntryCore({
			agentId: params.agentId,
			sessionKey,
			storePath: params.storePath
		}, (currentEntry) => {
			if (isLockedHarnessSessionOwnedByPlugin(currentEntry, params.preserveLockedHarnessIds)) return null;
			if (!hasPluginHostCleanupTarget(currentEntry, params)) return null;
			clearPluginHostCleanupTarget(currentEntry, params);
			currentEntry.updatedAt = now;
			return currentEntry;
		}, {
			shouldCommit: params.shouldCleanup,
			onCommitted: () => {
				cleared += 1;
			},
			replaceEntry: true,
			skipMaintenance: true
		});
	}
	return cleared;
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-creation-worker.ts
/** Durable creation uses the existing read owner and the canonical agent writer. */
async function createSessionEntryWithTranscriptInWorker(scope, createEntry, options) {
	const databaseOptions = {
		...toDatabaseOptions(scope),
		path: scope.path
	};
	const retained = retainSessionHistoryWorkerDatabase(databaseOptions);
	const reader = retained.owner;
	try {
		const read = () => reader.readExactEntries({
			projection: "creation",
			creationLabel: options.label,
			sessionKeys: [scope.sessionKey],
			env: { ...scope.env }
		});
		let snapshot = (await read()).creation;
		if (!snapshot) {
			await prepareSessionEntryReplacementDatabase(databaseOptions, () => {
				reader.assertCurrent();
				options.commitGuard?.();
			});
			snapshot = (await read()).creation;
		}
		if (!snapshot) throw new Error("Session creation lost its initialized database");
		const { normalizedKey, legacyKeys, databaseIdentity, databasePath, ...context } = snapshot;
		const assertDatabaseCurrent = () => {
			reader.assertCurrent();
			assertExistingDatabaseIdentity(scope.path, `file:${databaseIdentity}`);
		};
		return await withSessionEntryCreationPublication({
			agentId: scope.agentId,
			sessionKey: normalizedKey,
			file: {
				path: databasePath,
				agentId: databaseOptions.agentId,
				databaseIdentity,
				assertCurrent: assertDatabaseCurrent
			},
			bind: options.bindCreation
		}, async (operation) => {
			const withSourceCommit = options.withCommit;
			const withCommit = withSourceCommit ? (run) => withSourceCommit((assertCurrent) => runWithSessionEntryCreationPublication(operation, () => run(assertCurrent))) : void 0;
			options.onPhase?.("entry");
			const created = await createEntry(context);
			if (!created.ok) return {
				ok: false,
				error: created.error,
				phase: "entry"
			};
			const owner = options.resolveOwnerAssignment?.();
			const preparedTranscript = created.transcriptEvents ? {
				sessionKey: normalizedKey,
				sessionId: created.entry.sessionId,
				events: created.transcriptEvents
			} : void 0;
			const labelClaim = options.label === void 0 ? void 0 : {
				sessionKey: normalizedKey,
				label: options.label
			};
			const assertCurrent = () => {
				assertDatabaseCurrent();
				options.commitGuard?.();
			};
			let pendingArchiveRecovery = false;
			const onLifecycleCommitted = (pending) => {
				pendingArchiveRecovery = pending;
				options.onLifecycleCommitted?.(created.entry);
			};
			const publishArchives = async () => {
				if (!pendingArchiveRecovery) return;
				const run = (execute) => withSessionEntryWorker(databaseOptions, databaseIdentity, assertCurrent, async (execution, source) => {
					const result = await execution.runExisting(source, async (worker) => ({ value: await execute(worker) }));
					if (!result) throw new Error("Session database disappeared before archive publication");
					return result.value;
				});
				await publishSessionStateArchives({
					...scope,
					agentId: databaseOptions.agentId
				}, [], {
					prepare: (requested) => run((worker) => worker.execute({
						type: "session.archives.preparePublication",
						input: {
							archiveDirectory: resolveSqliteTranscriptArchiveDirectory(scope),
							requested
						}
					})),
					record: (results) => run((worker) => worker.execute({
						type: "session.archives.recordPublication",
						input: {
							results,
							nowMs: Date.now()
						}
					}))
				});
			};
			if (legacyKeys.length > 0) {
				const initialize = async (assertSourceCurrent) => {
					const assertHeld = () => {
						assertCurrent();
						assertSourceCurrent?.();
					};
					try {
						await initializeSessionTranscriptInWorker(databaseOptions, databaseIdentity, {
							sessionKey: normalizedKey,
							sessionId: created.entry.sessionId,
							cwd: options.cwd
						}, assertHeld);
					} catch (error) {
						if (hasSqliteWorkerOutcomeUnknown(error)) throw error;
						assertHeld();
						return formatErrorMessage(error);
					}
				};
				options.onPhase?.("transcript");
				const transcriptError = preparedTranscript ? void 0 : withCommit ? await withCommit(initialize) : await initialize();
				if (transcriptError !== void 0) return {
					ok: false,
					error: transcriptError,
					phase: "transcript"
				};
				await applySessionEntryCanonicalReplacements({
					agentId: scope.agentId,
					storePath: scope.path,
					env: scope.env,
					sessionKeys: [normalizedKey, ...legacyKeys],
					assertCommitAllowed: assertCurrent,
					withCommit,
					ownerAssignment: owner ? {
						sessionKey: normalizedKey,
						owner
					} : void 0,
					labelClaim,
					preparedTranscript,
					onLifecycleCommitted,
					checkPendingArchiveRecovery: true,
					afterCommitted: options.afterCommitted ? (_result, source) => options.afterCommitted(created.entry, source) : void 0,
					update: () => ({
						result: void 0,
						replacements: [{
							sessionKey: normalizedKey,
							previousSessionKeys: legacyKeys,
							entry: created.entry
						}]
					})
				});
				await publishArchives();
				return {
					ok: true,
					entry: created.entry,
					sessionFile: normalizedKey
				};
			}
			options.onPhase?.("writerAdmission");
			const commit = (assertSourceCurrent) => runExclusiveSqliteSessionWrite(scope, async () => {
				options.onPhase?.("commit");
				const assertHeld = () => {
					assertCurrent();
					assertSourceCurrent?.();
				};
				assertHeld();
				const replacement = (await reader.readExactEntries({
					projection: "replacement",
					sessionKeys: [normalizedKey],
					replacementSelection: { sessionKeys: [normalizedKey] },
					env: { ...scope.env }
				})).replacement;
				assertHeld();
				if (!replacement || replacement.databaseIdentity !== databaseIdentity) throw new Error("Session creation database changed before entry commit");
				try {
					await commitSessionEntryReplacementsInWorker(databaseOptions, databaseIdentity, {
						expectedRows: replacement.expectedRows,
						labelOwnerKeys: replacement.labelOwnerKeys,
						labelClaim,
						preparedTranscript,
						validationKeys: [normalizedKey],
						replacements: [{
							sessionKey: normalizedKey,
							entry: created.entry
						}],
						checkPendingArchiveRecovery: true,
						initializeTranscript: preparedTranscript ? void 0 : {
							sessionKey: normalizedKey,
							sessionId: created.entry.sessionId,
							cwd: options.cwd
						},
						...owner ? { ownerAssignment: {
							sessionKey: normalizedKey,
							owner
						} } : {}
					}, assertHeld, {
						identityAgentId: scope.agentId,
						afterCommitted: options.afterCommitted ? (source) => options.afterCommitted(created.entry, source) : void 0,
						onLifecycleCommitted
					});
				} catch (error) {
					if (!hasSqliteWorkerOutcomeUnknown(error) && error instanceof Error && error.name === "SessionTranscriptInitializationError") {
						assertHeld();
						return error.message;
					}
					throw error;
				}
			}, "session.entry.create-with-transcript");
			const transcriptError = withCommit ? await withCommit(commit) : await commit();
			if (transcriptError !== void 0) return {
				ok: false,
				error: transcriptError,
				phase: "transcript"
			};
			await publishArchives();
			return {
				ok: true,
				entry: created.entry,
				sessionFile: normalizedKey
			};
		});
	} finally {
		retained.release();
	}
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-parent-fork.ts
const DEFAULT_PARENT_FORK_MAX_TOKENS = 1e5;
function planParentForkDecision(parentEntry, transcriptEstimate, options = {}) {
	const maxTokens = normalizePositiveTokenCount(options.maxTokens) ?? DEFAULT_PARENT_FORK_MAX_TOKENS;
	const parentTokens = options.preferTranscriptEstimate ? transcriptEstimate : normalizePositiveTokenCount(Math.max(resolveFreshSessionTotalTokens(parentEntry) ?? 0, transcriptEstimate ?? 0));
	if (typeof parentTokens === "number" && parentTokens > maxTokens) return {
		status: "skip",
		reason: "parent-too-large",
		maxTokens,
		parentTokens,
		message: `Parent context is too large to fork (${parentTokens}/${maxTokens} tokens); starting with isolated context instead.`
	};
	return {
		status: "fork",
		maxTokens,
		...typeof parentTokens === "number" ? { parentTokens } : {}
	};
}
function estimateParentForkPromptTokens(source) {
	if (!source) return;
	let byteEstimate = 0;
	let latestUsageEstimate;
	let trailingBytes = 0;
	for (const { event, context } of selectParentForkTokenEstimateEvents(source.branchEntries)) {
		if (context !== "reset-retained" && isRecord(event) && isRecord(event.message) && event.message.excludeFromContext === true) continue;
		let contextEvent = event;
		if (isRecord(event) && isRecord(event.message)) {
			const message = context !== "current" && isIndexedSessionEntry(event) && event.type === "message" && event.message.role === "assistant" ? stripCompactionReplayCheckpoint(event.message) : event.message;
			contextEvent = {
				...event,
				message: projectModelContextMessages([message])[0]
			};
		}
		const serializedBytes = Buffer.byteLength(JSON.stringify(contextEvent)) + 1;
		byteEstimate += serializedBytes;
		if (context !== "current" || !isRecord(event)) {
			if (latestUsageEstimate !== void 0) trailingBytes += serializedBytes;
			continue;
		}
		const message = isRecord(event.message) ? event.message : void 0;
		const usageRaw = isRecord(message?.usage) ? message.usage : isRecord(event.usage) ? event.usage : void 0;
		if (!usageRaw) {
			if (latestUsageEstimate !== void 0) trailingBytes += serializedBytes;
			continue;
		}
		const contextUsage = readTranscriptContextUsage(usageRaw);
		if (message?.api === "cli" && contextUsage === void 0 || contextUsage?.state === "unavailable") {
			latestUsageEstimate = void 0;
			trailingBytes = 0;
			continue;
		}
		if (contextUsage?.state === "available") {
			latestUsageEstimate = normalizePositiveTokenCount(contextUsage.totalTokens);
			trailingBytes = 0;
			continue;
		}
		const usage = normalizeUsage(usageRaw);
		const promptTokens = normalizePositiveTokenCount(derivePromptTokens({
			input: usage?.input,
			cacheRead: usage?.cacheRead,
			cacheWrite: usage?.cacheWrite
		}));
		const outputTokens = normalizePositiveTokenCount(usage?.output) ?? 0;
		const totalTokens = promptTokens === void 0 ? void 0 : normalizePositiveTokenCount(promptTokens + outputTokens);
		if (typeof totalTokens === "number") {
			latestUsageEstimate = totalTokens;
			trailingBytes = 0;
		}
	}
	if (latestUsageEstimate !== void 0) return normalizePositiveTokenCount(latestUsageEstimate + Math.ceil(trailingBytes / 4));
	return normalizePositiveTokenCount(Math.ceil(byteEstimate / 4));
}
function* selectParentForkTokenEstimateEvents(branch) {
	if (!branch.some((event) => isRecord(event) && (event.type === "compaction" || event.type === "reset"))) {
		for (const event of branch) yield {
			event,
			context: "current"
		};
		return;
	}
	const indexedEntries = branch.filter(isIndexedSessionEntry);
	const selected = Array.from(iterateSessionContextEntries(indexedEntries));
	const boundary = selected[0]?.entry;
	if (boundary?.type !== "compaction" && boundary?.type !== "reset") {
		for (const event of branch) yield {
			event,
			context: "current"
		};
		return;
	}
	const contexts = new Map(selected.map(({ entry, context }) => [entry.id, context]));
	const indexedIds = new Set(indexedEntries.map((entry) => entry.id));
	const boundaryIndex = branch.findIndex((entry) => isRecord(entry) && entry.id === boundary.id);
	for (const [index, event] of branch.entries()) {
		const context = isRecord(event) && typeof event.id === "string" ? contexts.get(event.id) : void 0;
		if (context) yield {
			event,
			context
		};
		else if (index > boundaryIndex && (!isRecord(event) || typeof event.id !== "string" || !indexedIds.has(event.id))) yield {
			event,
			context: "opaque"
		};
	}
}
function normalizePositiveTokenCount(value) {
	return typeof value === "number" && Number.isFinite(value) && value > 0 ? Math.floor(value) : void 0;
}
function readTranscriptContextUsage(usageRaw) {
	const contextUsage = usageRaw.contextUsage;
	if (!isRecord(contextUsage)) return;
	if (contextUsage.state === "unavailable") return { state: "unavailable" };
	if (contextUsage.state !== "available") return;
	const totalTokens = normalizePositiveTokenCount(contextUsage.totalTokens);
	return totalTokens === void 0 ? void 0 : {
		state: "available",
		totalTokens
	};
}
function resolveParentForkSourceTranscript(fileEntries, forkFrom) {
	if (fileEntries.length === 0) return null;
	const header = findSessionTranscriptHeader(fileEntries);
	const entries = fileEntries.filter((entry) => !(isRecord(entry) && entry.type === "session"));
	const tree = scanSessionTranscriptTree(entries);
	const visiblePath = selectSessionTranscriptTreePathNodes(tree, tree.leafId);
	const appendPath = selectSessionTranscriptTreePathNodes(tree, tree.appendParentId);
	const mergedPath = mergeSessionTranscriptVisiblePathWithOpaqueAppendPath({
		visiblePath,
		appendPath,
		appendParentId: tree.appendParentId
	});
	const visibleBranchEntries = normalizeSessionContextEntryBoundaries(mergedPath.nodes.flatMap((node) => {
		if (!isRecord(node.entry)) return [];
		const parentId = node.selectedParentId;
		return [node.entry.parentId === parentId ? node.entry : {
			...node.entry,
			parentId
		}];
	}), tree.nodes);
	const branchEntries = forkFrom === "last-completed" ? visibleBranchEntries.slice(0, findLastCompletedAssistantIndex(visibleBranchEntries) + 1) : visibleBranchEntries;
	const pathEntryIds = new Set(branchEntries.flatMap((entry) => isRecord(entry) && typeof entry.id === "string" ? [entry.id] : []));
	const lastLeafUpdateNode = tree.nodes.findLast((node) => node.leafId !== void 0);
	const lastBranchEntry = branchEntries.at(-1);
	const lastBranchEntryId = isRecord(lastBranchEntry) && typeof lastBranchEntry.id === "string" ? lastBranchEntry.id : null;
	return {
		appendParentId: forkFrom === "last-completed" ? lastBranchEntryId : mergedPath.appendParentId,
		...forkFrom !== "last-completed" && lastLeafUpdateNode?.appendMode ? { appendMode: lastLeafUpdateNode.appendMode } : {},
		branchEntries,
		cwd: typeof header?.cwd === "string" ? header.cwd : void 0,
		version: header?.version ?? 3,
		labelsToWrite: collectBranchLabels({
			allEntries: entries,
			pathEntryIds
		}),
		leafId: forkFrom === "last-completed" ? lastBranchEntryId : tree.leafId,
		preserveLeafControl: forkFrom !== "last-completed" && isSessionTranscriptLeafControl(lastLeafUpdateNode?.entry)
	};
}
function findLastCompletedAssistantIndex(entries) {
	return entries.findLastIndex((entry) => {
		const message = isRecord(entry) && isRecord(entry.message) ? entry.message : void 0;
		return message?.role === "assistant" && message.stopReason !== "toolUse";
	});
}
function collectBranchLabels(params) {
	return params.allEntries.flatMap((entry) => isRecord(entry) && entry.type === "label" && typeof entry.label === "string" && typeof entry.targetId === "string" && typeof entry.id === "string" && !params.pathEntryIds.has(entry.id) && params.pathEntryIds.has(entry.targetId) && typeof entry.timestamp === "string" ? [{
		targetId: entry.targetId,
		label: entry.label,
		timestamp: entry.timestamp
	}] : []);
}
function generateEntryId(existingIds) {
	for (let attempt = 0; attempt < 100; attempt += 1) {
		const id = randomUUID().slice(0, 8);
		if (!existingIds.has(id)) {
			existingIds.add(id);
			return id;
		}
	}
	const id = randomUUID();
	existingIds.add(id);
	return id;
}
function buildLabelEntries(params) {
	let parentId = params.lastEntryId;
	return params.labelsToWrite.map(({ targetId, label, timestamp }) => {
		const entry = {
			type: "label",
			id: generateEntryId(params.pathEntryIds),
			parentId,
			timestamp,
			targetId,
			label
		};
		parentId = entry.id;
		return entry;
	});
}
function hasAssistantEntry(entries) {
	return entries.some((entry) => isRecord(entry) && entry.type === "message" && isRecord(entry.message) && entry.message.role === "assistant");
}
function buildForkedChildTranscriptEvents(params) {
	const keepHistory = params.source.preserveLeafControl || hasAssistantEntry(params.source.branchEntries);
	const header = {
		...createSessionTranscriptHeader({
			cwd: params.source.cwd,
			sessionId: params.targetSessionId,
			version: keepHistory ? params.source.version : void 0
		}),
		parentSession: params.parentSessionFile
	};
	if (!keepHistory) return [header];
	const pathEntryIds = new Set(params.source.branchEntries.flatMap((entry) => isRecord(entry) && typeof entry.id === "string" ? [entry.id] : []));
	const lastPathEntry = params.source.branchEntries.at(-1);
	const lastPathEntryId = isRecord(lastPathEntry) && typeof lastPathEntry.id === "string" ? lastPathEntry.id : null;
	const labelEntries = buildLabelEntries({
		labelsToWrite: params.source.labelsToWrite,
		pathEntryIds,
		lastEntryId: lastPathEntryId
	});
	const leafEntry = params.source.preserveLeafControl ? {
		type: "leaf",
		id: generateEntryId(pathEntryIds),
		parentId: labelEntries.at(-1)?.id ?? lastPathEntryId,
		timestamp: (/* @__PURE__ */ new Date()).toISOString(),
		targetId: params.source.leafId,
		appendParentId: params.source.appendParentId,
		...params.source.appendMode ? { appendMode: params.source.appendMode } : {}
	} : null;
	return [
		header,
		...params.source.branchEntries,
		...labelEntries,
		...leafEntry ? [leafEntry] : []
	];
}
//#endregion
//#region src/config/sessions/session-transcript-hydration.ts
/** Capture identity before queueing; a missing file remains the creation owner's responsibility. */
function prepareSessionTranscriptHydration(source, limits, signal) {
	const target = captureSessionTranscriptTargetBinding(source);
	const contextLimits = limits ? {
		maxBytes: limits.maxBytes,
		maxEvents: limits.maxEvents
	} : void 0;
	const receipt = resolveSessionTranscriptReadFence(target);
	const admission = receipt ? { ...receipt } : void 0;
	signal?.throwIfAborted();
	const incognitoOptions = isIncognitoSessionKey(target.sessionKey) ? toDatabaseOptions(resolveSqliteTranscriptReadScope(target)) : void 0;
	const incognitoOwner = incognitoOptions ? getOpenClawAgentDatabaseIfOpen(incognitoOptions) : void 0;
	const assertCurrent = () => {
		if (incognitoOptions && getOpenClawAgentDatabaseIfOpen(incognitoOptions) !== incognitoOwner) throw new Error("Session transcript incognito database owner is no longer current");
	};
	const readInOwner = async (readInProcess, readInWorker) => {
		signal?.throwIfAborted();
		if (incognitoOptions) return runWithSessionTranscriptReadFence(admission, readInProcess);
		const resolvedScope = await prepareSqliteTranscriptReadScope(target, signal);
		signal?.throwIfAborted();
		const options = toDatabaseOptions(resolvedScope);
		const databasePath = resolveOpenClawAgentSqlitePath(options);
		assertAgentDatabaseTerminalOpenAllowed(databasePath);
		try {
			const result = await withSessionHistoryWorkerDatabase(options, async (owner) => {
				try {
					return await readInWorker(owner, resolvedScope);
				} finally {
					owner.assertCurrent();
				}
			});
			signal?.throwIfAborted();
			return result;
		} finally {
			assertAgentDatabaseTerminalOpenAllowed(databasePath);
		}
	};
	const read = () => readInOwner(() => contextLimits ? {
		kind: "bounded",
		snapshot: readSessionTranscriptBoundedActiveContextCore(target, {
			...contextLimits,
			readOnly: true
		})
	} : {
		kind: "full",
		snapshot: loadTranscriptReadSnapshotSync(target, { readOnly: true })
	}, (owner, resolvedScope) => owner.readTranscript({
		target,
		resolvedScope,
		limits: contextLimits,
		admission
	}, signal));
	const readCurrentTurnEntry = (input) => {
		const request = {
			entryId: input.entryId,
			version: { ...input.version },
			includeEntry: input.includeEntry
		};
		return readInOwner(() => readSessionTranscriptCurrentTurnEntry(target, {
			...request,
			readOnly: true
		}), (owner, resolvedScope) => owner.readCurrentTurnEntry({
			...request,
			target,
			resolvedScope,
			admission
		}, signal));
	};
	return {
		target,
		read,
		readCurrentTurnEntry,
		assertCurrent
	};
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-parent-session.ts
/** Prepare one source snapshot; the creation owner commits its copy with the child entry. */
async function prepareSessionForkTranscript(params) {
	if (!params.parentEntry.sessionId) return { status: "missing-parent" };
	params.commitGuard?.();
	const resolved = await prepareSqliteScope({
		agentId: params.agentId,
		sessionKey: params.parentSessionKey,
		storePath: params.storePath
	});
	if (params.targetStorePath) await prepareSqliteScope({
		sessionKey: params.sessionKey,
		storePath: params.targetStorePath
	});
	const sourceScope = {
		agentId: resolved.agentId,
		env: resolved.env,
		sessionKey: normalizeStoreSessionKey(params.parentSessionKey),
		sessionId: params.parentEntry.sessionId,
		storePath: resolved.path ?? params.storePath
	};
	const hydration = prepareSessionTranscriptHydration(sourceScope);
	const { readRestoredSessionTranscript } = await import("./session-cold-storage-read-Cnk_Rpjj.mjs");
	const snapshot = await readRestoredSessionTranscript(sourceScope, hydration.read, { assertCurrent: params.commitGuard });
	params.commitGuard?.();
	hydration.assertCurrent();
	if (snapshot.kind !== "full") throw new Error("Parent fork requires its complete transcript snapshot");
	const source = resolveParentForkSourceTranscript(snapshot.snapshot.events, params.forkFrom);
	if (!source) return { status: "failed" };
	const decision = resolveParentForkLimitDecision(params, source);
	if (decision) return {
		status: "too-large",
		decision
	};
	const sessionId = params.targetSessionId ?? randomUUID();
	return {
		status: "prepared",
		transcript: {
			sessionId,
			sessionFile: params.sessionKey
		},
		events: buildForkedChildTranscriptEvents({
			parentSessionFile: formatLegacySqliteSessionMarkerForScope({
				...resolved,
				...sourceScope
			}),
			source,
			targetSessionId: sessionId
		})
	};
}
async function forkSessionTranscriptFromParent(params) {
	const resolved = resolveSqliteScope({
		...params.agentId ? { agentId: params.agentId } : {},
		sessionKey: params.sessionKey,
		storePath: params.storePath
	});
	const target = params.targetStorePath ? resolveSqliteScope({
		sessionKey: params.sessionKey,
		storePath: params.targetStorePath
	}) : resolved;
	const crossDatabase = target.agentId !== resolved.agentId || (target.path ?? "") !== (resolved.path ?? "");
	if (params.parentEntry.sessionId) {
		params.commitGuard?.();
		const { restoreSessionColdTranscript } = await import("./session-cold-storage-Bz1cFOwq.mjs");
		await restoreSessionColdTranscript({
			agentId: resolved.agentId,
			env: resolved.env,
			storePath: params.storePath,
			sessionId: params.parentEntry.sessionId
		});
	}
	if (!crossDatabase) return await runExclusiveSqliteSessionWrite(resolved, async () => runOpenClawAgentWriteTransaction((database) => {
		params.commitGuard?.();
		return forkSqliteParentTranscriptInTransaction(database, resolved, {
			enforceTokenLimit: params.enforceTokenLimit,
			maxTokens: params.maxTokens,
			parentEntry: params.parentEntry,
			parentSessionKey: params.parentSessionKey,
			forkFrom: params.forkFrom,
			targetSessionId: params.targetSessionId,
			targetSessionKey: params.sessionKey
		});
	}, toDatabaseOptions(resolved), { operationLabel: "session.parent-fork.same-store" }), "session.parent.fork-transcript");
	if (!params.parentEntry.sessionId) return { status: "missing-parent" };
	const sourceDatabase = openOpenClawAgentDatabase(toDatabaseOptions(resolved));
	const source = resolveParentForkSourceTranscript(loadTranscriptEventsFromDatabase(sourceDatabase, params.parentEntry.sessionId), params.forkFrom);
	if (!source) return { status: "failed" };
	const limitDecision = resolveParentForkLimitDecision(params, source);
	if (limitDecision) return {
		status: "too-large",
		decision: limitDecision
	};
	const parentSessionFile = formatLegacySqliteSessionMarkerForScope({
		...resolved,
		sessionId: params.parentEntry.sessionId,
		sessionKey: normalizeStoreSessionKey(params.parentSessionKey)
	});
	return await runExclusiveSqliteSessionWrite(target, async () => {
		const sessionId = params.targetSessionId ?? randomUUID();
		const targetScope = {
			...target,
			sessionId,
			sessionKey: normalizeStoreSessionKey(params.sessionKey)
		};
		runOpenClawAgentWriteTransaction((database) => {
			params.commitGuard?.();
			appendTranscriptEventsInTransaction(database, targetScope, buildForkedChildTranscriptEvents({
				parentSessionFile,
				source,
				targetSessionId: sessionId
			}));
		}, toDatabaseOptions(target), { operationLabel: "session.parent-fork.copy-transcript" });
		return {
			status: "created",
			transcript: {
				sessionFile: targetScope.sessionKey,
				sessionId
			}
		};
	}, "session.parent.fork-transcript");
}
/** Forks parent context into a child session entry using SQLite rows only. */
async function forkSessionEntryFromParentTarget(params) {
	const resolved = resolveSqliteStoreScope(params.storePath, { agentId: params.agentId });
	const parentTarget = normalizeLifecycleTarget(params.parentTarget);
	const sessionTarget = normalizeLifecycleTarget(params.sessionTarget);
	const prepared = await runExclusiveSqliteSessionWrite(resolved, async () => {
		const database = openOpenClawAgentDatabase(toDatabaseOptions(resolved));
		const parent = resolveLifecyclePrimaryEntry(database, parentTarget);
		if (!parent?.entry.sessionId) return { status: "missing-parent" };
		const base = resolveLifecyclePrimaryEntry(database, sessionTarget)?.entry ?? params.fallbackEntry;
		if (!base) return { status: "missing-entry" };
		if (params.skipForkWhen?.(structuredClone(base))) {
			const sessionEntry = persistSqliteParentForkSkipPatch({
				commitGuard: params.commitGuard,
				entry: base,
				sessionKey: sessionTarget.canonicalKey,
				patch: params.skipPatch?.(structuredClone(base)),
				resolved
			});
			return {
				status: "skipped",
				reason: "existing-entry",
				parentEntry: structuredClone(parent.entry),
				sessionEntry
			};
		}
		assertModelSelectionUnlocked(parent.entry, MODEL_SELECTION_LOCKED_PARENT_FORK_MESSAGE);
		return {
			status: "prepared",
			parentEntry: structuredClone(parent.entry),
			base: structuredClone(base)
		};
	}, "session.parent.fork-entry");
	if (prepared.status !== "prepared") return prepared;
	params.commitGuard?.();
	const { restoreSessionColdTranscript } = await import("./session-cold-storage-Bz1cFOwq.mjs");
	await restoreSessionColdTranscript({
		agentId: resolved.agentId,
		env: resolved.env,
		storePath: params.storePath,
		sessionId: prepared.parentEntry.sessionId
	});
	return await runExclusiveSqliteSessionWrite(resolved, async () => {
		params.commitGuard?.();
		const committed = runOpenClawAgentWriteTransaction((writeDatabase) => {
			params.commitGuard?.();
			const freshParent = resolveLifecyclePrimaryEntry(writeDatabase, parentTarget)?.entry;
			const freshBase = resolveLifecyclePrimaryEntry(writeDatabase, sessionTarget)?.entry ?? params.fallbackEntry;
			if (!freshParent || !freshBase || !sqliteSessionEntriesEqual(freshParent, prepared.parentEntry) || !sqliteSessionEntriesEqual(freshBase, prepared.base)) return { result: { status: "failed" } };
			assertModelSelectionUnlocked(freshParent, MODEL_SELECTION_LOCKED_PARENT_FORK_MESSAGE);
			const source = resolveParentForkSourceTranscript(loadTranscriptEventsFromDatabase(writeDatabase, freshParent.sessionId));
			const decision = planParentForkDecision(freshParent, estimateParentForkPromptTokens(source));
			if (decision.status === "skip") return { skip: {
				decision,
				base: freshBase,
				parentEntry: freshParent
			} };
			const fork = forkSqliteParentTranscriptInTransaction(writeDatabase, resolved, {
				parentEntry: freshParent,
				parentSessionKey: parentTarget.canonicalKey,
				source,
				targetSessionKey: sessionTarget.canonicalKey
			});
			if (fork.status !== "created") return { result: fork.status === "missing-parent" ? { status: "missing-parent" } : { status: "failed" } };
			const forkIdentityPatch = {
				...params.patch?.({
					decision,
					entry: structuredClone(freshBase),
					fork: fork.transcript,
					parentEntry: structuredClone(freshParent)
				}),
				forkSource: {
					sessionKey: parentTarget.canonicalKey,
					sessionId: freshParent.sessionId
				},
				forkedFromParent: true,
				lifecycleRunId: void 0,
				lastRunId: void 0,
				sessionId: fork.transcript.sessionId,
				totalTokens: void 0,
				totalTokensFresh: false,
				totalTokensVersion: void 0
			};
			const previousIdentity = readSessionIdentitySnapshot(writeDatabase, [sessionTarget.canonicalKey]);
			const next = writeSessionEntry(writeDatabase, sessionTarget.canonicalKey, mergeSessionEntry(freshBase, forkIdentityPatch), {
				previousEntry: freshBase,
				canonicalPreviousEntry: previousIdentity.get(sessionTarget.canonicalKey) ?? null
			});
			const currentIdentity = readSessionIdentitySnapshot(writeDatabase, [sessionTarget.canonicalKey]);
			return {
				result: {
					status: "forked",
					decision,
					fork: fork.transcript,
					parentEntry: structuredClone(freshParent),
					sessionEntry: structuredClone(next)
				},
				publish: prepareSessionIdentityPublication(writeDatabase, resolved.agentId, previousIdentity, currentIdentity)
			};
		}, toDatabaseOptions(resolved), { operationLabel: "session.parent-fork.entry" });
		if ("skip" in committed) {
			const { decision, base, parentEntry } = committed.skip;
			const patch = params.decisionSkipPatch?.({
				decision,
				entry: structuredClone(base),
				parentEntry: structuredClone(parentEntry)
			});
			const sessionEntry = persistSqliteParentForkSkipPatch({
				commitGuard: params.commitGuard,
				entry: base,
				sessionKey: sessionTarget.canonicalKey,
				patch,
				resolved
			});
			return {
				status: "skipped",
				reason: "decision-skip",
				parentEntry: structuredClone(parentEntry),
				sessionEntry,
				decision
			};
		}
		committed.publish?.();
		return committed.result;
	}, "session.parent.fork-entry");
}
function persistSqliteParentForkSkipPatch(params) {
	if (!params.patch) return structuredClone(params.entry);
	const merged = mergeSessionEntry(params.entry, params.patch);
	const next = preserveSqliteSameKeySessionRolloverLineage({
		next: merged,
		previous: params.entry,
		sessionKey: params.sessionKey
	});
	runOpenClawAgentWriteTransaction((database) => {
		params.commitGuard?.();
		const previousIdentity = readSessionIdentitySnapshot(database, [params.sessionKey]);
		writeSessionEntry(database, params.sessionKey, next, {
			previousEntry: params.entry,
			canonicalPreviousEntry: previousIdentity.get(params.sessionKey) ?? null
		});
		const currentIdentity = readSessionIdentitySnapshot(database, [params.sessionKey]);
		return prepareSessionIdentityPublication(database, params.resolved.agentId, previousIdentity, currentIdentity);
	}, toDatabaseOptions(params.resolved), { operationLabel: "session.parent-fork.skip" })();
	return structuredClone(next);
}
async function resolveSessionParentForkDecision(params) {
	const parentSessionId = typeof params.parentEntry.sessionId === "string" ? params.parentEntry.sessionId : "";
	if (parentSessionId.length === 0) return planParentForkDecision(params.parentEntry);
	const resolved = resolveSqliteStoreScope(params.storePath);
	const { readRestoredSessionTranscript } = await import("./session-cold-storage-read-Cnk_Rpjj.mjs");
	return readRestoredSessionTranscript({
		agentId: resolved.agentId,
		storePath: params.storePath,
		sessionId: parentSessionId
	}, () => {
		const database = openOpenClawAgentDatabase(toDatabaseOptions(resolved));
		return planParentForkDecision(params.parentEntry, estimateParentForkPromptTokens(resolveParentForkSourceTranscript(loadTranscriptEventsFromDatabase(database, parentSessionId))));
	});
}
function forkSqliteParentTranscriptInTransaction(database, resolved, params) {
	if (!params.parentEntry.sessionId) return { status: "missing-parent" };
	const source = params.source === void 0 ? resolveParentForkSourceTranscript(loadTranscriptEventsFromDatabase(database, params.parentEntry.sessionId), params.forkFrom) : params.source;
	if (!source) return { status: "failed" };
	const limitDecision = resolveParentForkLimitDecision(params, source);
	if (limitDecision) return {
		status: "too-large",
		decision: limitDecision
	};
	const sessionId = params.targetSessionId ?? randomUUID();
	const targetScope = {
		...resolved,
		sessionId,
		sessionKey: normalizeStoreSessionKey(params.targetSessionKey)
	};
	const parentSessionFile = formatLegacySqliteSessionMarkerForScope({
		...resolved,
		sessionId: params.parentEntry.sessionId,
		sessionKey: normalizeStoreSessionKey(params.parentSessionKey)
	});
	appendTranscriptEventsInTransaction(database, targetScope, buildForkedChildTranscriptEvents({
		parentSessionFile,
		source,
		targetSessionId: sessionId
	}));
	return {
		status: "created",
		transcript: {
			sessionFile: targetScope.sessionKey,
			sessionId
		}
	};
}
function resolveParentForkLimitDecision(params, source) {
	if (!params.enforceTokenLimit) return;
	const decision = planParentForkDecision(params.parentEntry, estimateParentForkPromptTokens(source), {
		maxTokens: params.maxTokens,
		preferTranscriptEstimate: params.forkFrom === "last-completed"
	});
	return decision.status === "skip" ? decision : void 0;
}
//#endregion
//#region src/config/sessions/session-accessor.entry-mutation.ts
/** Capture source custody before authority or physical-owner discovery yields. */
function captureSessionEntryDatabasePreparation(scope, assertCurrent, relatedScopes = []) {
	const captureScope = (source) => ({
		...source,
		env: Object.freeze(captureSessionTranscriptStorageEnvironment(source.env ?? process.env))
	});
	const captured = captureScope(scope);
	const target = {
		...captured,
		agentId: captured.agentId ?? resolveAgentIdFromSessionKey(captured.sessionKey),
		storePath: resolveSessionStorePathForScope(captured)
	};
	const shared = captureOpenClawStateWorkerContext({ env: target.env });
	const candidates = [target, ...relatedScopes.map(captureScope)].flatMap((related) => captureSessionStoreReadCandidates(resolveSessionStorePathForScope(related)).map((candidate) => ({
		path: candidate.path,
		physicalPath: candidate.physicalPath,
		scope: candidate.scope,
		identity: readDatabasePathIdentitySync(candidate.path)
	})));
	const releases = [];
	let active = true;
	let execution;
	let preparedPath;
	let preparedIdentity;
	let creatingPath;
	const assertSourceCurrent = () => {
		if (!active) throw new Error("Session creation database preparation is closed");
		shared.admission.assertCurrent();
		execution?.assertCurrent();
		for (const candidate of candidates) {
			const isCreating = candidate.path === creatingPath || candidate.physicalPath === creatingPath;
			const isPrepared = candidate.path === preparedPath || candidate.physicalPath === preparedPath;
			if (captureSessionStoreReadCandidate(candidate.path, candidate.scope).physicalPath !== candidate.physicalPath || !(isCreating && candidate.identity.key.startsWith("path:")) && !isDeepStrictEqual(readDatabasePathIdentitySync(candidate.path), isPrepared ? preparedIdentity : candidate.identity)) throw new Error("Session creation database changed during preparation");
		}
		if (preparedPath && !isDeepStrictEqual(readDatabasePathIdentitySync(preparedPath), preparedIdentity)) throw new Error("Session creation database changed after preparation");
	};
	const assertHeld = () => {
		assertCurrent();
		assertSourceCurrent();
	};
	const unregister = () => {
		for (const release of releases.splice(0).toReversed()) release();
	};
	const release = async () => {
		active = false;
		try {
			await execution?.release();
		} finally {
			unregister();
		}
	};
	try {
		for (const candidate of candidates) for (const path of /* @__PURE__ */ new Set([candidate.path, candidate.physicalPath])) releases.push(registerOpenClawAgentDatabaseReadCandidateResource({
			path,
			scope: candidate.scope,
			revoke: () => {
				active = false;
			},
			close: release
		}));
	} catch (error) {
		active = false;
		unregister();
		throw error;
	}
	return {
		assertCurrent: assertSourceCurrent,
		env: target.env,
		get execution() {
			return execution;
		},
		assertHeld,
		release,
		async resolve() {
			assertHeld();
			const resolved = captureLifecycleDatabaseScope(isMainThread ? await prepareSqliteScope(target) : resolveSqliteScope(target));
			assertHeld();
			const options = {
				...toDatabaseOptions(resolved),
				path: resolved.path
			};
			if (!isMainThread || !supportsOpenClawAgentDatabaseExecution(options) || hasPreparedNativeSessionDeletion()) return;
			const original = candidates.find((candidate) => candidate.path === resolved.path || candidate.physicalPath === resolved.path);
			if (!original) throw new Error("Session creation lost its originally captured database target");
			return {
				options,
				identity: original.identity,
				key: JSON.stringify([
					shared.admission.databasePath,
					shared.admission.identity.key,
					options.agentId,
					original.identity.key,
					original.identity.birthtime
				])
			};
		},
		begin(path, retained) {
			execution = retained;
			creatingPath = path;
		},
		finish(path, original) {
			const accepted = execution?.fileIdentity;
			if (!accepted || typeof accepted.birthtime !== "string") throw new Error("Session creation has no accepted native file identity");
			preparedPath = path;
			preparedIdentity = {
				key: `file:${accepted.physicalIdentity}`,
				canonicalPath: original.canonicalPath,
				birthtime: accepted.birthtime
			};
			creatingPath = void 0;
		}
	};
}
/** Settle every selected writer before any facts snapshot, retaining borrowers without FIFO permits. */
function prepareSessionEntryMutationDatabases(targets, ready) {
	ready.catch(() => {});
	const captured = targets.map((target) => {
		try {
			return {
				status: "fulfilled",
				value: captureSessionEntryDatabasePreparation(target.scope, target.assertCurrent, target.relatedScopes)
			};
		} catch (reason) {
			return {
				status: "rejected",
				reason
			};
		}
	});
	const promotion = (async () => {
		await ready;
		const resolved = await Promise.allSettled(captured.map(async (capture) => {
			if (capture.status === "rejected") throw capture.reason;
			return await capture.value.resolve();
		}));
		const outcomes = [];
		const groups = /* @__PURE__ */ new Map();
		for (const [index, result] of resolved.entries()) {
			if (result.status === "rejected") {
				outcomes[index] = result;
				continue;
			}
			const capture = captured[index];
			if (capture.status !== "fulfilled") throw new Error("Session database resolution lost its captured source");
			const source = capture.value;
			outcomes[index] = {
				status: "fulfilled",
				value: {
					assertCurrent: source.assertCurrent,
					env: source.env,
					get execution() {
						return source.execution;
					}
				}
			};
			if (result.value) {
				const group = groups.get(result.value.key) ?? {
					target: result.value,
					members: []
				};
				group.members.push({
					index,
					capture: source,
					target: result.value
				});
				groups.set(result.value.key, group);
			}
		}
		await Promise.all([...groups.values()].map(async ({ target, members }) => {
			try {
				const assertCurrent = () => {
					for (const { capture } of members) capture.assertHeld();
				};
				assertCurrent();
				const identity = target.identity;
				const execution = captureOpenClawAgentDatabaseExecution(target.options, identity.key.startsWith("file:") ? { expectedIdentity: {
					kind: "file",
					physicalIdentity: identity.key.slice(5),
					nativeLocation: identity.canonicalPath,
					birthtime: identity.birthtime
				} } : { expectedCreationIdentity: identity });
				for (const member of members) member.capture.begin(member.target.options.path, execution);
				await prepareSessionEntryReplacementDatabase(target.options, assertCurrent, execution);
				for (const member of members) member.capture.finish(member.target.options.path, member.target.identity);
				assertCurrent();
			} catch (reason) {
				for (const { index } of members) outcomes[index] = {
					status: "rejected",
					reason
				};
			}
		}));
		return outcomes;
	})();
	const preparations = targets.map((_, index) => promotion.then((outcomes) => {
		const result = outcomes[index];
		if (result.status === "rejected") throw result.reason;
		result.value.assertCurrent();
		return result.value;
	}));
	for (const preparation of preparations) preparation.catch(() => {});
	return {
		preparations,
		async [Symbol.asyncDispose]() {
			await promotion.catch(() => {});
			const errors = (await Promise.allSettled(captured.flatMap((capture) => capture.status === "fulfilled" ? [capture.value.release()] : []))).flatMap((result) => result.status === "rejected" ? [result.reason] : []);
			if (errors.length) throw createSqliteLifecycleAggregateError(errors, "Session database preparation cleanup failed", errors[0]);
		}
	};
}
/**
* Creates or updates one session entry and initializes its transcript header as
* one SQLite-backed lifecycle operation. Callers do not compose row creation,
* transcript initialization, rollback, and normalized session identity.
*/
async function createSessionEntryWithTranscript(scope, createEntry, options = {}) {
	const captured = {
		...scope,
		env: captureSessionTranscriptStorageEnvironment(scope.env ?? process.env)
	};
	const storePath = resolveSessionStorePathForScope(captured);
	const agentId = captured.agentId ?? resolveAgentIdFromSessionKey(captured.sessionKey);
	const target = {
		...captured,
		agentId,
		storePath
	};
	const resolved = captureLifecycleDatabaseScope(isMainThread ? await prepareSqliteScope(target) : resolveSqliteScope(target));
	if (isMainThread && supportsOpenClawAgentDatabaseExecution(toDatabaseOptions(resolved)) && !hasPreparedNativeSessionDeletion()) return createSessionEntryWithTranscriptInWorker(resolved, createEntry, options);
	const storeScope = {
		agentId,
		env: resolved.env,
		storePath: resolved.path
	};
	const creationDatabase = openOpenClawAgentDatabase(toDatabaseOptions(resolved));
	const { normalizedKey, legacyKeys, ...context } = readSessionCreationSnapshotInDatabase(creationDatabase, captured.sessionKey, options.label);
	return await withSessionEntryCreationPublication({
		database: creationDatabase,
		agentId,
		sessionKey: normalizedKey,
		bind: options.bindCreation
	}, async (operation) => {
		options.onPhase?.("entry");
		const created = await createEntry(context);
		if (!created.ok) return {
			ok: false,
			error: created.error,
			phase: "entry"
		};
		const ownerAssignment = options.resolveOwnerAssignment?.();
		const { cwd, commitGuard, withCommit: withSourceCommit, onLifecycleCommitted } = options;
		const withCommit = withSourceCommit ? (run) => withSourceCommit((assertCurrent) => runWithSessionEntryCreationPublication(operation, () => run(assertCurrent))) : void 0;
		const initializeTranscript = async (assertSourceCurrent) => {
			try {
				const transcriptScope = resolveSqliteTranscriptScope({
					...storeScope,
					sessionId: created.entry.sessionId,
					sessionKey: normalizedKey
				});
				await runExclusiveSqliteSessionWrite(transcriptScope, async () => {
					runOpenClawAgentWriteTransaction((database) => {
						commitGuard?.();
						assertSourceCurrent?.();
						ensureTranscriptHeader(database, transcriptScope, cwd);
					}, toDatabaseOptions(transcriptScope), { operationLabel: "session.entry.create-transcript" });
				}, "session.entry.create-with-transcript");
				return;
			} catch (err) {
				commitGuard?.();
				assertSourceCurrent?.();
				return formatErrorMessage(err);
			}
		};
		options.onPhase?.("transcript");
		const transcriptError = created.transcriptEvents ? void 0 : withCommit ? await withCommit(initializeTranscript) : await initializeTranscript();
		if (transcriptError !== void 0) return {
			ok: false,
			error: transcriptError,
			phase: "transcript"
		};
		const entry = created.entry;
		options.onPhase?.("commit");
		await applySessionEntryLifecycleMutation({
			...storeScope,
			removals: legacyKeys.map((sessionKey) => ({ sessionKey })),
			upserts: [{
				sessionKey: normalizedKey,
				entry
			}],
			skipMaintenance: true,
			beforeCommitInTransaction: () => {
				commitGuard?.();
				assertSessionCreationLabelAvailable(creationDatabase, normalizedKey, options.label);
			},
			...withCommit ? { withCommit } : {},
			afterFreshUpsertsInTransaction: (database) => {
				if (created.transcriptEvents) appendTranscriptEventsInTransaction(database, {
					...resolved,
					sessionKey: normalizedKey,
					sessionId: entry.sessionId
				}, created.transcriptEvents);
				if (ownerAssignment && !replaceSessionOwnerInTransaction(database, normalizedKey, ownerAssignment)) throw new Error(`Session owner assignment lost its target: ${normalizedKey}`);
			},
			...onLifecycleCommitted ? { onLifecycleCommitted: () => onLifecycleCommitted(entry) } : {},
			...options.afterCommitted ? { afterCommitted: (source) => options.afterCommitted(entry, source) } : {}
		});
		return {
			ok: true,
			entry,
			sessionFile: normalizedKey
		};
	});
}
function cloneSessionEntries(store) {
	return Object.fromEntries(Object.entries(store).map(([sessionKey, entry]) => [sessionKey, { ...entry }]));
}
function collectSessionEntryKeys(...entries) {
	return [...new Set(entries.flatMap((entry) => Object.keys(entry)))];
}
function sessionEntryFieldUnchanged(left, right, key) {
	return isDeepStrictEqual(Object.hasOwn(left, key) ? left[key] : void 0, Object.hasOwn(right, key) ? right[key] : void 0);
}
function mergeConcurrentReplySessionMetadata(params) {
	const { currentEntry, preparedEntry, snapshotEntry } = params;
	if (!snapshotEntry || preparedEntry.sessionId !== snapshotEntry.sessionId) return preparedEntry;
	const merged = { ...preparedEntry };
	const mergedFields = merged;
	for (const key of collectSessionEntryKeys(currentEntry, preparedEntry, snapshotEntry)) {
		const currentChanged = !sessionEntryFieldUnchanged(currentEntry, snapshotEntry, key);
		const preparedKeptSnapshot = sessionEntryFieldUnchanged(preparedEntry, snapshotEntry, key);
		if (currentChanged && preparedKeptSnapshot) {
			if (Object.hasOwn(currentEntry, key)) mergedFields[key] = currentEntry[key];
			else delete mergedFields[key];
		}
	}
	return merged;
}
function createReplySessionInitializationRevision(entry) {
	return JSON.stringify(entry ? { sessionId: entry.sessionId } : null);
}
/** Updates an existing entry only; returns null when the session is absent. */
async function updateSessionEntry(scope, update, options = {}) {
	return await patchSessionEntryCore(scope, update, options);
}
/** Resolves one abort target identity without exposing the mutable store. */
function resolveSessionAbortTarget(scope) {
	const entry = loadSessionEntry(scope);
	if (!entry) return null;
	return {
		entry: { ...entry },
		sessionId: entry.sessionId,
		sessionKey: normalizeStoreSessionKey(scope.sessionKey)
	};
}
/**
* Resolves, marks, touches, and canonicalizes one abort target entry as a
* storage-sized operation. Runtime abort side effects remain with callers.
*/
async function markSessionAbortTarget(params) {
	const resolution = { target: null };
	try {
		const sessionKey = normalizeStoreSessionKey(params.scope.sessionKey);
		const updated = await patchSessionEntryCore(params.scope, (currentEntry) => {
			if (params.isCurrent?.() === false) return null;
			resolution.target = {
				entry: { ...currentEntry },
				persisted: false,
				sessionId: currentEntry.sessionId,
				sessionKey
			};
			const entry = {
				...currentEntry,
				abortedLastRun: true,
				updatedAt: params.now?.() ?? Date.now()
			};
			const cutoff = params.resolveAbortCutoff?.({
				entry: { ...currentEntry },
				sessionKey
			});
			entry.abortCutoffMessageSid = cutoff?.messageSid;
			entry.abortCutoffTimestamp = cutoff?.timestamp;
			return entry;
		}, {
			replaceEntry: true,
			skipMaintenance: true,
			assertCommitAllowed: () => {
				if (resolution.target && params.isCurrent?.() === false) throw new Error("The selected session changed before it could be stopped.");
			}
		});
		return updated && resolution.target ? {
			entry: { ...updated },
			persisted: true,
			sessionId: updated.sessionId,
			sessionKey
		} : null;
	} catch (error) {
		const fallbackTarget = resolution.target;
		if (fallbackTarget) return {
			...fallbackTarget,
			persistenceError: formatErrorMessage(error)
		};
		throw error;
	}
}
//#endregion
//#region src/config/sessions/session-accessor.reset.ts
var SessionInitializationAgentScopeMismatchError = class extends Error {
	constructor(agentId, sessionKeyAgentId) {
		super(`Session initialization agent scope mismatch: explicit agent "${agentId}" does not match session key agent "${sessionKeyAgentId}".`);
		this.agentId = agentId;
		this.sessionKeyAgentId = sessionKeyAgentId;
		this.code = "SESSION_INITIALIZATION_AGENT_SCOPE_MISMATCH";
		this.name = "SessionInitializationAgentScopeMismatchError";
	}
};
function assertSessionInitializationAgentScope(agentId, sessionKey) {
	const normalizedAgentId = normalizeAgentId(agentId);
	const sessionKeyAgentId = parseAgentSessionKey(sessionKey)?.agentId;
	if (sessionKeyAgentId && normalizeAgentId(sessionKeyAgentId) !== normalizedAgentId) throw new SessionInitializationAgentScopeMismatchError(normalizedAgentId, sessionKeyAgentId);
}
const loadSessionArchiveRuntime = createLazyRuntimeModule(() => import("./session-archive.runtime.js"));
function loadReplySessionInitializationEntries(params) {
	assertSessionInitializationAgentScope(params.agentId, params.sessionKey);
	const result = withOpenClawAgentDatabaseReadOnly((database) => runSqliteDeferredTransactionSync(database.db, () => {
		assertCanonicalSqliteSessionKeysCurrent(database);
		const entries = {};
		const currentKey = normalizeStoreSessionKey(params.sessionKey);
		const keys = /* @__PURE__ */ new Set([currentKey, ...params.relatedSessionKeys ?? []]);
		for (const key of keys) {
			const sessionKey = normalizeStoreSessionKey(key);
			if (!sessionKey || entries[sessionKey]) continue;
			const entry = readExactSessionEntryRow(database, sessionKey)?.entry;
			if (entry) {
				entries[sessionKey] = entry;
				if (sessionKey === currentKey && entry.parentSessionKey) keys.add(entry.parentSessionKey);
			}
		}
		return entries;
	}), toDatabaseOptions(resolveSqliteScope(params)));
	return result.found ? result.value : {};
}
/** Loads the declared reply-session rows without exposing a mutable store. */
function loadReplySessionInitializationSnapshot(params) {
	const storePath = resolveSessionStorePathForScope(params);
	const store = loadReplySessionInitializationEntries({
		...params,
		storePath
	});
	const resolved = resolveSessionStoreEntryCore({
		store,
		sessionKey: params.sessionKey
	});
	const currentEntry = resolved.existing ? { ...resolved.existing } : void 0;
	return {
		...currentEntry ? { currentEntry } : {},
		readEntry: (sessionKey) => {
			const entry = resolveSessionStoreEntryCore({
				store,
				sessionKey
			}).existing;
			return entry ? { ...entry } : void 0;
		},
		revision: createReplySessionInitializationRevision(currentEntry)
	};
}
function createStaleReplySessionInitializationResult(currentEntry) {
	return {
		ok: false,
		...currentEntry ? { currentEntry } : {},
		reason: "stale-snapshot",
		revision: createReplySessionInitializationRevision(currentEntry)
	};
}
/**
* Persists one reply-session initialization result and archives the previous
* transcript after metadata commits, keeping archive failure warning-only.
*/
async function commitReplySessionInitialization(params) {
	assertSessionInitializationAgentScope(params.agentId, params.sessionKey);
	const storePath = resolveSessionStorePathForScope({
		sessionKey: params.sessionKey,
		storePath: params.storePath
	});
	const store = loadReplySessionInitializationEntries({
		...params,
		storePath
	});
	const resolved = resolveSessionStoreEntryCore({
		store,
		sessionKey: params.sessionKey
	});
	const currentEntry = resolved.existing ? { ...resolved.existing } : void 0;
	if (createReplySessionInitializationRevision(currentEntry) !== params.expectedRevision) return createStaleReplySessionInitializationResult(currentEntry);
	const readEntry = (sessionKey) => {
		const entry = resolveSessionStoreEntryCore({
			store,
			sessionKey
		}).existing;
		return entry ? { ...entry } : void 0;
	};
	const sessionEntry = params.prepareSessionEntry ? await params.prepareSessionEntry({
		...currentEntry ? { currentEntry } : {},
		readEntry,
		sessionEntry: params.sessionEntry
	}) : params.sessionEntry;
	let staleCommit;
	let committedSessionEntry = sessionEntry;
	let beforeEntryMutationDone = false;
	const upserts = [{
		sessionKey: resolved.normalizedKey,
		...params.routeContext !== void 0 ? { routeContext: params.routeContext } : {},
		...params.resetBoundary ? { resetBoundary: params.resetBoundary } : {},
		buildEntry: async ({ currentEntry: commitEntry }) => {
			if (createReplySessionInitializationRevision(commitEntry) !== params.expectedRevision) {
				staleCommit = commitEntry ? { ...commitEntry } : null;
				return null;
			}
			committedSessionEntry = commitEntry ? mergeConcurrentReplySessionMetadata({
				currentEntry: commitEntry,
				preparedEntry: sessionEntry,
				snapshotEntry: params.snapshotEntry ?? params.previousEntry
			}) : sessionEntry;
			if (!beforeEntryMutationDone) {
				await params.beforeEntryMutation?.({
					...commitEntry ? { currentEntry: { ...commitEntry } } : {},
					sessionEntry: committedSessionEntry
				});
				beforeEntryMutationDone = true;
			}
			return committedSessionEntry;
		}
	}];
	if (params.retiredEntry) {
		const retiredEntry = params.retiredEntry;
		upserts.push({
			sessionKey: retiredEntry.key,
			buildEntry: () => staleCommit === void 0 ? retiredEntry.entry : null
		});
	}
	try {
		await applySessionEntryLifecycleMutation({
			activeSessionKey: params.activeSessionKey,
			agentId: params.agentId,
			maintenanceOverride: params.maintenanceConfig,
			storePath,
			upserts,
			beforeCommitInTransaction: params.commitGuard
		});
	} catch (error) {
		if (!(error instanceof SessionEntryLifecycleUpsertConflictError) || error.sessionKey !== resolved.normalizedKey) throw error;
		return createStaleReplySessionInitializationResult(loadSessionEntry({
			agentId: params.agentId,
			readConsistency: "latest",
			sessionKey: error.sessionKey,
			storePath
		}));
	}
	if (staleCommit !== void 0) return createStaleReplySessionInitializationResult(staleCommit ?? void 0);
	store[resolved.normalizedKey] = committedSessionEntry;
	if (params.retiredEntry) store[params.retiredEntry.key] = params.retiredEntry.entry;
	const committed = {
		ok: true,
		previousSessionTranscript: {},
		sessionEntry: { ...committedSessionEntry },
		sessionStoreView: cloneSessionEntries(store)
	};
	const previousSessionTranscript = isIncognitoSessionKey(params.sessionKey) || params.previousEntry?.incognito === true ? {} : params.archivePreviousTranscript === false ? {} : await archivePreviousSessionTranscript({
		agentId: params.agentId,
		onArchiveError: params.onArchiveError,
		previousEntry: params.previousEntry,
		storePath: params.storePath
	});
	return {
		...committed,
		previousSessionTranscript
	};
}
async function archivePreviousSessionTranscript(params) {
	if (!params.previousEntry?.sessionId) return {};
	const { archiveSessionTranscriptsDetailed, resolveStableSessionEndTranscript } = await loadSessionArchiveRuntime();
	const archivedTranscripts = archiveSessionTranscriptsDetailed({
		sessionId: params.previousEntry.sessionId,
		storePath: params.storePath,
		agentId: params.agentId,
		reason: "reset",
		onArchiveError: params.onArchiveError
	});
	return resolveStableSessionEndTranscript({
		sessionId: params.previousEntry.sessionId,
		storePath: params.storePath,
		agentId: params.agentId,
		archivedTranscripts
	});
}
//#endregion
export { applySessionEntryCanonicalReplacements as C, purgeDeletedAgentSessionEntries as S, withSessionEntryWorker as T, SessionLabelOwnerIndex as _, markSessionAbortTarget as a, applySessionEntryLifecycleMutation as b, updateSessionEntry as c, prepareSessionForkTranscript as d, resolveSessionParentForkDecision as f, cleanupPluginHostSessionStore as g, applySessionPatchProjections as h, createSessionEntryWithTranscript as i, forkSessionEntryFromParentTarget as l, applySessionPatchProjection as m, commitReplySessionInitialization as n, prepareSessionEntryMutationDatabases as o, prepareSessionTranscriptHydration as p, loadReplySessionInitializationSnapshot as r, resolveSessionAbortTarget as s, SessionInitializationAgentScopeMismatchError as t, forkSessionTranscriptFromParent as u, inheritSessionSelection as v, applySessionEntryExactReplacements as w, applySessionStoreProjection as x, selectSessionModelOverride as y };
