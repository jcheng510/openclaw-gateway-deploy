import { y as uniqueStrings } from "./string-normalization-YMwDjufr.mjs";
import { t as resolveIdentityPathViaExistingAncestorSync } from "./boundary-path-CAv_plX7.mjs";
import { r as resolveStateDir } from "./state-dir-CfAW6S2K.mjs";
import "./paths-CtO6iw0c.mjs";
import { n as executeSqliteQuerySync, r as executeSqliteQueryTakeFirstSync } from "./kysely-sync-Y4_ti-rQ.mjs";
import { c as registerNodeSqliteDisposeCallback } from "./kysely-sync-cache-state-BlM1eqOk.mjs";
import { a as readDatabasePathIdentitySync, t as assertExistingDatabaseIdentity } from "./sqlite-worker-identity-Dggu-rKK.mjs";
import { r as getChildLogger } from "./logger-DabFgCLJ.mjs";
import { n as readSqliteBusyTimeout } from "./sqlite-busy-timeout-DYrW2wFu.mjs";
import { a as withSqlitePostCommitPublications } from "./sqlite-post-commit-Dih1WMKX.mjs";
import { i as runSqliteImmediateTransaction } from "./sqlite-transaction-2VkikDo-.mjs";
import { t as coerceRequiredSqliteNumber } from "./sqlite-number-DZt1m75H.mjs";
import { r as isOpenClawAgentDatabasePathCurrent, t as createOpenClawAgentDatabaseClaim } from "./openclaw-agent-db-identity-ChZ28OhF.mjs";
import { n as normalizeAgentId } from "./agent-id-D1-Q6vR4.mjs";
import { n as createSqliteWorkerOperationAdmission } from "./sqlite-worker-operation-admission-BB758RIN.mjs";
import { r as cloneEnvWithPlatformSemantics } from "./config-env-vars-C__rW8Th.mjs";
import { r as captureOpenClawStateWorkerContext } from "./openclaw-state-worker-context-C_iAE7YK.mjs";
import { r as isIncognitoSessionKey } from "./session-key-DDIJxXfQ.mjs";
import { A as parseAgentSessionKey, l as resolveAgentIdFromSessionKey } from "./session-key-BC4m_Ly5.mjs";
import { c as resolveOpenClawAgentSqlitePath, i as isIncognitoOpenClawAgentSqlitePath } from "./openclaw-agent-db.paths-Dv3PPTNK.mjs";
import { a as resolveExplicitSessionStorePathForScope, l as resolveSessionStorePathCore } from "./paths-CQ3zRaeb.mjs";
import { r as getRuntimeConfig } from "./io.runtime-BOdk1dW9.mjs";
import "./io-B18HRL9J.mjs";
import { x as getAgentDeletionDatabaseCleanup, y as assertAgentDeletionDatabaseCleanupAccess } from "./agent-deletion-journal-C9BqqBYt.mjs";
import { m as ensureOpenClawAgentDatabasePermissions } from "./openclaw-agent-db-maintenance-DY-8E9tR.mjs";
import { m as listOpenIncognitoAgentDatabases, n as cache, y as retainAgentDatabase } from "./openclaw-agent-db-lifecycle-CCXA1nI8.mjs";
import { c as openOpenClawAgentDatabase, d as runOpenClawAgentWriteTransaction, o as getOpenClawAgentDatabaseIfOpen, p as withOpenClawAgentDatabaseAsync, t as borrowOpenClawAgentDatabase } from "./openclaw-agent-db-CZUYuo7P.mjs";
import { t as OpenClawAgentDatabaseReadOnlyScope } from "./openclaw-agent-db-readonly-scope-CuYmDv32.mjs";
import { o as prepareOpenClawAgentDatabaseRegistrySnapshotRead, t as AgentDatabaseRegistryChangedError } from "./openclaw-agent-db-registry-listing-DKcT5BJS.mjs";
import { r as sessionEntrySnapshotColumns } from "./session-entry-snapshots-CHPWIM1D.mjs";
import { n as runOpenClawAgentWorkerWrite } from "./openclaw-agent-write-admission-CDwQO6YZ.mjs";
import { t as captureSessionTranscriptStorageEnvironment } from "./transcript-target-binding-Cytsl9mY.mjs";
import { r as publishSystemEventStoreResolver, t as getSystemEventStorePath } from "./system-event-ownership-Bp0P_EZz.mjs";
import { t as captureOpenClawAgentDatabaseExecution } from "./openclaw-agent-execution-C4GB-NRD.mjs";
import { n as withOpenClawAgentDatabaseReadOnly } from "./openclaw-agent-db-readonly-CkWWSfuG.mjs";
import { t as assertSessionStoreReadCandidate } from "./session-store-read-candidates-YT_i67iQ.mjs";
import { i as prepareSqliteTargetFromSessionStorePath, o as resolveSqliteTargetFromSessionStorePath } from "./session-sqlite-target-YT3XOdWA.mjs";
import { _ as toDatabaseOptions, a as prepareSqliteScope, c as resolveSqliteReadScope, f as resolveSqliteTranscriptArchiveDirectory, g as runExclusiveSqliteSessionWrite, i as getSessionKysely, l as resolveSqliteScope, p as resolveSqliteTranscriptReadScope, u as resolveSqliteSessionKey } from "./session-accessor.sqlite-scope-AxUEwRt8.mjs";
import { c as readSessionEntryRow, n as parseReadableSqliteSessionEntryRows, o as readExactSessionEntryRowValidated } from "./session-accessor.sqlite-entry-read-oKmXbFma.mjs";
import { n as assertCanonicalSessionKeyWrite, r as assertCanonicalSqliteSessionKeysCurrent } from "./session-canonical-key-Cjd4Pn_g.mjs";
import { a as selectSessionEntryRows, i as readSessionEntriesByStatus, t as hasSessionEntriesByStatus } from "./session-accessor.sqlite-status-CbDRSABL.mjs";
import { n as buildSessionCreationStamp } from "./session-entry-provenance-BWZtrWXT.mjs";
import { t as isInternalSessionEffectsKey } from "./internal-session-key-BOMXCQVf.mjs";
import { n as listSqliteSessionEntriesFromDatabase } from "./session-accessor.sqlite-entry-list.read-6sJ8GFrX.mjs";
import { C as captureSessionEntryMaintenanceAgeFact, D as readSessionEntryMaintenanceNextAgeAt, G as deriveSessionMetaPatch, S as adoptSessionEntryMaintenanceAgeFact, T as isSessionEntryMaintenanceAgeCaptureCurrent, W as deriveLastRoutePatch, h as createFallbackSessionEntry, o as readLifecycleTargetSnapshot, s as readSessionEntrySelectionSnapshot, x as SESSION_ENTRY_MAINTENANCE_INTERVAL_MS } from "./session-accessor.sqlite-entry-store-JXJQe1fh.mjs";
import { t as normalizeInternalTurnContext } from "./internal-turn-source-BeIoKV0x.mjs";
import { c as normalizeResolvedMaintenanceConfigInput } from "./store-maintenance-C0GS_WY5.mjs";
import { E as resolveSessionEntry, _ as assertCapturedSessionEntryReadSource } from "./session-accessor.sqlite-pending-inputs-BdT_Tg9N.mjs";
import { i as MAX_VISIBLE_MESSAGE_MAX_MESSAGES, n as DEFAULT_VISIBLE_MESSAGE_MAX_MESSAGES, r as MAX_VISIBLE_MESSAGE_MAX_BYTES, s as normalizeVisibleMessageLimit, t as DEFAULT_VISIBLE_MESSAGE_MAX_BYTES } from "./session-accessor.sqlite-visible-cursor-CJh4GhW9.mjs";
import { r as prepareSessionIdentityPublication } from "./session-accessor.sqlite-identity-C3Jm_Tf4.mjs";
import "./session-accessor.sqlite-initial-entry-Cnt5IctI.mjs";
import { i as mergeSessionEntryPreserveActivity, r as mergeSessionEntry } from "./types-DBHkhm7j.mjs";
import { n as replaceSessionEntryInDatabase, t as applySessionEntryPatchInDatabase } from "./session-accessor.sqlite-entry-mutation-B3nc5nAx.mjs";
import { n as listTranscriptArchivesFromDatabase, t as hasTranscriptArchiveInDatabase } from "./session-accessor.sqlite-archive-read-DPAfqQ9N.mjs";
import { f as withSqliteTranscriptArchiveSession, l as runSqliteTranscriptArchiveReadWorker, s as runSqliteTranscriptArchivePageWorker } from "./session-accessor.sqlite-reclamation-worker-Du8IF7nF.mjs";
import { t as captureSessionStoreReadCandidates } from "./session-store-target-inventory-DQQNzqyR.mjs";
import { m as withSessionHistoryWorkerReadCandidates } from "./session-transcript-worker-resources-DLvHY0vJ.mjs";
import { c as finalizeSessionEntryMaintenancePlansAfterWriterReleaseBestEffort, i as kickSessionHistoryDiskBudgetMaintenance } from "./session-history-eviction-BJoKqhi_.mjs";
import { m as runSqliteSessionReclamation, o as createSessionMaintenancePlanningOperation } from "./session-accessor.sqlite-reclamation-D523hzXQ.mjs";
import { t as SqliteReclamationInputsChangedError } from "./session-accessor.sqlite-reclamation-worker-diagnostics-CO1DPtzp.mjs";
import { d as captureSessionMaintenancePreservation, u as resolveMaintenanceConfig } from "./disk-budget-DNKBUWcN.mjs";
import path from "node:path";
import { isDeepStrictEqual } from "node:util";
//#region src/state/openclaw-agent-db-transaction.ts
/** Yield only for BEGIN admission; admitted writes and publications are never replayed. */
async function runOpenClawAgentWriteWithYieldingAdmission(operation, options, transactionOptions = {}) {
	const captured = {
		...options,
		env: cloneEnvWithPlatformSemantics(options.env ?? process.env)
	};
	const database = openOpenClawAgentDatabase(captured);
	captured.path = database.path;
	const release = retainAgentDatabase(database.db);
	try {
		return await runSqliteImmediateTransaction(database.db, async () => () => {
			assertAgentDeletionDatabaseCleanupAccess(database, captured);
			const result = operation(database);
			if (!cache.incognito.has(database)) ensureOpenClawAgentDatabasePermissions(database.path, captured);
			return result;
		}, {
			...transactionOptions,
			busyTimeoutMs: readSqliteBusyTimeout(database.db),
			databaseLabel: database.path,
			operationLabel: transactionOptions.operationLabel ?? "agent.write",
			withCommit: getAgentDeletionDatabaseCleanup(captured)?.withCommit
		}, (write) => {
			if (getOpenClawAgentDatabaseIfOpen(captured) !== database) throw new Error(`Agent database closed or replaced before write: ${database.path}`);
			return withSqlitePostCommitPublications(database.db, write);
		});
	} finally {
		release();
	}
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-history.ts
async function readSessionTaskArchivePageReadOnly(scope, options) {
	return readTaskArchivePage(scope, options);
}
/** Revalidate retained bytes and unique run membership before disclosing a prepared page. */
async function verifySessionTranscriptArchivePageBindingReadOnly(scope, runId, binding) {
	if (!await readTaskArchivePage(scope, { runId }, binding)) throw new Error("Archived transcript is no longer available.");
}
async function readTaskArchivePage(scope, options, verifyBinding) {
	const resolved = resolveSqliteReadScope(scope);
	const databaseOptions = toDatabaseOptions(resolved);
	const limit = normalizeVisibleMessageLimit(options.limit, DEFAULT_VISIBLE_MESSAGE_MAX_MESSAGES, MAX_VISIBLE_MESSAGE_MAX_MESSAGES, "limit");
	const maxBytes = normalizeVisibleMessageLimit(options.maxBytes, DEFAULT_VISIBLE_MESSAGE_MAX_BYTES, MAX_VISIBLE_MESSAGE_MAX_BYTES, "maxBytes");
	const contextMaxMessages = options.contextMaxMessages === void 0 ? 0 : normalizeVisibleMessageLimit(options.contextMaxMessages, 0, MAX_VISIBLE_MESSAGE_MAX_MESSAGES, "contextMaxMessages");
	return withSqliteTranscriptArchiveSession(databaseOptions, async () => {
		const [result] = await runSqliteTranscriptArchivePageWorker([{
			agentId: databaseOptions.agentId,
			databasePath: resolveOpenClawAgentSqlitePath(databaseOptions),
			logicalAgentId: resolved.agentId,
			sessionKey: scope.sessionKey,
			runId: options.runId,
			cursor: options.cursor,
			limit,
			maxBytes,
			contextMaxMessages,
			verifyBinding,
			projectionSources: options.projectionSources
		}]);
		return result;
	});
}
function listTranscriptInstancesFromDatabase(params) {
	let query = getSessionKysely(params.database.db).selectFrom("session_windows").select([
		"session_id",
		"session_key",
		"created_at",
		"updated_at",
		"channel",
		"account_id",
		"transcript_updated_at",
		"session_entry_provenance",
		"acp_owned",
		"plugin_owner_id",
		"hook_external_content_source",
		"parent_session_key",
		"spawned_by",
		"chat_type"
	]);
	if (!params.options.includeAllWindows) query = query.where("transcript_updated_at", "is not", null);
	if (params.options.sessionId !== void 0) query = query.where("session_id", "=", params.options.sessionId);
	return executeSqliteQuerySync(params.database.db, query.orderBy("transcript_updated_at", "desc").orderBy("session_id", "asc")).rows.map((row) => {
		if (!params.options.includeAllWindows && isInternalSessionEffectsKey(row.session_key)) return;
		const updatedAtMs = row.transcript_updated_at ?? row.updated_at;
		const current = params.currentEntries.get(row.session_key);
		const currentIsExact = current?.sessionId === row.session_id;
		const provenanceKnown = row.session_entry_provenance === 1;
		const hookExternalContentSource = row.hook_external_content_source === "gmail" || row.hook_external_content_source === "webhook" ? row.hook_external_content_source : void 0;
		const chatType = row.chat_type === "direct" || row.chat_type === "group" || row.chat_type === "channel" ? row.chat_type : void 0;
		const exactHookSource = (currentIsExact ? current?.hookExternalContentSource : void 0) ?? (provenanceKnown && hookExternalContentSource === "gmail" ? "gmail" : null);
		const entry = {
			...currentIsExact && current ? structuredClone(current) : {},
			sessionId: row.session_id,
			updatedAt: updatedAtMs,
			...row.parent_session_key ? { parentSessionKey: row.parent_session_key } : {},
			...row.spawned_by ? {
				spawnedBy: row.spawned_by,
				spawnDepth: 1
			} : {},
			...chatType ? { chatType } : {},
			...provenanceKnown && row.plugin_owner_id ? { pluginOwnerId: row.plugin_owner_id } : {},
			...provenanceKnown && hookExternalContentSource ? { hookExternalContentSource } : {}
		};
		return {
			agentId: resolveAgentIdFromSessionKey(row.session_key, params.database.agentId),
			acpOwned: row.acp_owned === 1 || Boolean(currentIsExact && current?.acp),
			entry,
			provenanceKnown,
			sessionId: row.session_id,
			sessionKey: row.session_key,
			updatedAtMs,
			sourceMetadata: {
				createdAt: row.created_at,
				channel: row.channel,
				accountId: row.account_id,
				chatType: chatType ?? null,
				hookExternalContentSource: exactHookSource
			}
		};
	}).filter((entry) => entry !== void 0);
}
/** Read retained archive identities through the same physical and logical session owner. */
function listSessionTranscriptArchivesReadOnly(scope) {
	const selectors = [...new Set(scope.sessionIds ?? [])];
	const archiveNames = [...new Set(scope.archiveNames ?? [])];
	if (selectors.length === 0 && archiveNames.length === 0) return [];
	const resolved = resolveSqliteReadScope(scope);
	const result = withOpenClawAgentDatabaseReadOnly((database) => listTranscriptArchivesFromDatabase(database, scope.includeAllAgents ? void 0 : resolved.agentId, selectors, archiveNames), toDatabaseOptions(resolved));
	return result.found ? result.value : [];
}
/** Reads committed archive content before its optional filesystem export is published. */
async function findSessionTranscriptArchiveEventReadOnly(scope, runId) {
	const captured = {
		...scope,
		env: captureSessionTranscriptStorageEnvironment(scope.env ?? process.env)
	};
	const context = captureOpenClawStateWorkerContext({ env: captured.env });
	const assertStateCurrent = () => {
		context.maintenanceScope?.assertAdmission();
		context.admission.assertCurrent();
	};
	const native = isIncognitoSessionKey(captured.sessionKey) || Boolean(captured.storePath && isIncognitoOpenClawAgentSqlitePath(captured.storePath, {
		agentId: captured.agentId ?? resolveAgentIdFromSessionKey(captured.sessionKey),
		env: captured.env
	}));
	const candidates = native ? void 0 : captureSessionStoreReadCandidates(captured.storePath ?? resolveOpenClawAgentSqlitePath(toDatabaseOptions(resolveSqliteReadScope(captured))));
	const identities = new Map(candidates?.map((candidate) => [candidate.physicalPath, readDatabasePathIdentitySync(candidate.path)]));
	const read = async (assertCurrent) => {
		const resolved = native ? resolveSqliteReadScope(captured) : await prepareSqliteScope(captured);
		assertCurrent();
		const options = toDatabaseOptions(resolved);
		const databasePath = resolveOpenClawAgentSqlitePath(options);
		const expectedIdentity = candidates ? identities.get(assertSessionStoreReadCandidate(databasePath, candidates)) : void 0;
		if (candidates && !expectedIdentity) throw new Error("SQLite archive database identity changed during discovery");
		if (expectedIdentity) {
			const current = readDatabasePathIdentitySync(databasePath);
			if (current.key !== expectedIdentity.key || current.birthtime !== expectedIdentity.birthtime) throw new Error("SQLite archive database identity changed during discovery");
			if (!expectedIdentity.key.startsWith("file:")) return;
		}
		const target = {
			logicalAgentId: resolved.agentId,
			sessionId: captured.sessionId,
			sessionKey: captured.sessionKey
		};
		return withSqliteTranscriptArchiveSession(options, async () => {
			const readArchive = async () => {
				const [result] = await runSqliteTranscriptArchiveReadWorker([{
					agentId: options.agentId,
					databasePath,
					...target,
					runId,
					expectedIdentity
				}]);
				assertCurrent();
				if (expectedIdentity) assertExistingDatabaseIdentity(databasePath, expectedIdentity.key, expectedIdentity.birthtime);
				return result?.event === void 0 ? void 0 : { event: result.event };
			};
			if (!expectedIdentity) {
				const registered = withOpenClawAgentDatabaseReadOnly((database) => hasTranscriptArchiveInDatabase(database, target), options);
				return registered.found && registered.value ? readArchive() : void 0;
			}
			const { withSessionHistoryWorkerDatabase } = await import("./session-transcript-worker-runtime-B29SjUk6.mjs");
			assertCurrent();
			return withSessionHistoryWorkerDatabase(options, async (reader) => {
				const registered = await reader.readArchivePresence({
					...target,
					env: captured.env,
					expectedIdentity
				});
				assertCurrent();
				reader.assertCurrent();
				assertExistingDatabaseIdentity(databasePath, expectedIdentity.key, expectedIdentity.birthtime);
				return registered ? readArchive() : void 0;
			});
		});
	};
	return candidates ? withSessionHistoryWorkerReadCandidates(candidates, (owner) => read(() => {
		assertStateCurrent();
		owner.assertCurrent();
	})) : read(assertStateCurrent);
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-maintenance-kick.ts
const maintenanceByStore = /* @__PURE__ */ new Map();
const MAINTENANCE_WRITE_QUIET_MS = 1e3;
const MAX_MAINTENANCE_REJECTIONS = 3;
/** Coalesce automatic logical maintenance outside ordinary entry-write latency. */
function kickSessionEntryMaintenanceAfterWrite(params) {
	if (params.skipMaintenance) return;
	const databasePath = resolveOpenClawAgentSqlitePath(toDatabaseOptions(params.scope));
	const database = getOpenClawAgentDatabaseIfOpen(toDatabaseOptions(params.scope));
	if (!database) return;
	const owner = maintenanceByStore.get(databasePath);
	if (owner?.database === database) {
		owner.activeSessionKeys.add(params.activeSessionKey);
		Object.assign(owner, params, { generation: owner.generation + 1 });
		if (!owner.running) {
			if (owner.retryDelayMs !== void 0) {
				if (owner.rejections >= MAX_MAINTENANCE_REJECTIONS) owner.rejections = 0;
				scheduleMaintenanceAfterWriteQuiet(databasePath, owner);
			} else scheduleImmediateMaintenance(databasePath, owner);
		}
		return;
	}
	if (owner) retireMaintenanceOwner(databasePath, owner);
	const created = {
		...params,
		activeSessionKeys: /* @__PURE__ */ new Set([params.activeSessionKey]),
		database,
		generation: 1,
		running: false,
		rejections: 0
	};
	maintenanceByStore.set(databasePath, created);
	created.unregisterClose = registerNodeSqliteDisposeCallback(database.db, () => retireMaintenanceOwner(databasePath, created));
	scheduleImmediateMaintenance(databasePath, created);
}
function retireMaintenanceOwner(databasePath, owner) {
	clearImmediate(owner.immediate);
	clearTimeout(owner.timer);
	owner.unregisterClose?.();
	if (maintenanceByStore.get(databasePath) === owner) maintenanceByStore.delete(databasePath);
}
function scheduleImmediateMaintenance(databasePath, owner) {
	clearTimeout(owner.timer);
	owner.timer = void 0;
	owner.running = true;
	owner.immediate = setImmediate(() => {
		owner.immediate = void 0;
		runPendingMaintenance(databasePath, owner);
	});
}
function scheduleMaintenanceAfterWriteQuiet(databasePath, owner) {
	owner.running = false;
	owner.retryDelayMs = MAINTENANCE_WRITE_QUIET_MS * 2 ** Math.max(0, owner.rejections - 1);
	if (owner.timer) {
		owner.timer.refresh();
		return;
	}
	owner.timer = setTimeout(() => {
		owner.timer = void 0;
		owner.retryDelayMs = void 0;
		owner.running = true;
		runPendingMaintenance(databasePath, owner);
	}, owner.retryDelayMs);
	owner.timer.unref();
}
async function runPendingMaintenance(databasePath, owner) {
	const isCurrent = () => maintenanceByStore.get(databasePath) === owner && owner.database.db.isOpen && getOpenClawAgentDatabaseIfOpen(toDatabaseOptions(owner.scope)) === owner.database;
	if (!isCurrent()) {
		retireMaintenanceOwner(databasePath, owner);
		return;
	}
	const generation = owner.generation;
	let activeSessionKeys = [...owner.activeSessionKeys];
	owner.activeSessionKeys.clear();
	let nextMaintenanceAt = Infinity;
	let planningChanged = false;
	try {
		const prepared = await runExclusiveSqliteSessionWrite(owner.scope, async () => {
			if (!isCurrent()) return;
			const maintenance = owner.maintenanceConfig ? normalizeResolvedMaintenanceConfigInput(owner.maintenanceConfig) : resolveMaintenanceConfig();
			const ageCapture = captureSessionEntryMaintenanceAgeFact(owner.database.db, maintenance);
			return {
				maintenance,
				operation: maintenance.mode === "warn" ? null : createSessionMaintenancePlanningOperation({
					databaseOptions: toDatabaseOptions(owner.scope),
					input: {
						ageFact: ageCapture.fact,
						activeSessionKeys,
						archiveDirectory: owner.archiveDirectory,
						maintenance,
						preservation: null,
						storePath: owner.storePath
					}
				}),
				ageCapture
			};
		}, "session.maintenance.plan");
		if (!prepared) {
			retireMaintenanceOwner(databasePath, owner);
			return;
		}
		const { maintenance, operation } = prepared;
		if (operation === null) {
			if (isCurrent() && owner.generation !== generation) scheduleMaintenanceAfterWriteQuiet(databasePath, owner);
			else retireMaintenanceOwner(databasePath, owner);
			return;
		}
		let { ageCapture } = prepared;
		let admitted = false;
		const assertInputsCurrent = () => {
			if (!isCurrent()) throw new Error("SQLite automatic maintenance owner retired");
			if (admitted && [...owner.activeSessionKeys].some((key) => !activeSessionKeys.includes(key)) || !isDeepStrictEqual(maintenance, owner.maintenanceConfig ? normalizeResolvedMaintenanceConfigInput(owner.maintenanceConfig) : resolveMaintenanceConfig()) || admitted && operation.input.preservation !== null && !isDeepStrictEqual(operation.input.preservation, captureSessionMaintenancePreservation(operation.input.storePath))) {
				planningChanged = true;
				throw new SqliteReclamationInputsChangedError("SQLite automatic maintenance inputs changed before commit");
			}
		};
		const runPlanning = () => {
			if (!isSessionEntryMaintenanceAgeCaptureCurrent(owner.database.db, ageCapture)) {
				ageCapture = captureSessionEntryMaintenanceAgeFact(owner.database.db, maintenance);
				operation.input.ageFact = ageCapture.fact;
			}
			return runSqliteSessionReclamation({
				diagnostics: { kind: "maintenance-plan" },
				assertCommitAllowed: assertInputsCurrent,
				refreshMaintenanceProtection: () => {
					admitted = false;
					assertInputsCurrent();
					activeSessionKeys = [.../* @__PURE__ */ new Set([...activeSessionKeys, ...owner.activeSessionKeys])];
					operation.input.activeSessionKeys = activeSessionKeys;
					if (operation.input.preservation !== null) operation.input.preservation = captureSessionMaintenancePreservation(operation.input.storePath);
					admitted = true;
					return {
						activeSessionKeys,
						preservation: operation.input.preservation
					};
				},
				onWorkerResult: (result) => {
					if (result.kind === "maintenance-plan" && isCurrent()) adoptSessionEntryMaintenanceAgeFact(owner.database.db, ageCapture, result.ageFact);
				},
				forceInProcess: false,
				plan: operation
			});
		};
		let result = await runPlanning();
		if (result.kind === "maintenance-preservation-required") {
			await runExclusiveSqliteSessionWrite(owner.scope, async () => {
				assertInputsCurrent();
				ageCapture = captureSessionEntryMaintenanceAgeFact(owner.database.db, operation.input.maintenance);
				operation.input.ageFact = ageCapture.fact;
				operation.input.preservation = captureSessionMaintenancePreservation(operation.input.storePath);
			}, "session.maintenance.plan");
			result = await runPlanning();
		}
		if (result.kind === "maintenance-plan-stale") {
			planningChanged = true;
			throw new SqliteReclamationInputsChangedError("SQLite maintenance snapshot changed before commit");
		}
		if (result.kind !== "maintenance-plan") throw new Error("SQLite automatic maintenance returned another operation's result");
		const plan = result.value;
		if (plan.archived === 0 && plan.entryRemovals.length === 0) {
			assertInputsCurrent();
			if (!isOpenClawAgentDatabasePathCurrent(owner.database)) {
				planningChanged = true;
				throw new SqliteReclamationInputsChangedError("SQLite automatic maintenance database path changed after no-op planning");
			}
			if (captureSessionEntryMaintenanceAgeFact(owner.database.db, maintenance).fact !== result.ageFact) {
				planningChanged = true;
				throw new SqliteReclamationInputsChangedError("SQLite automatic maintenance age fact changed after no-op planning");
			}
		}
		await finalizeSessionEntryMaintenancePlansAfterWriterReleaseBestEffort(owner.scope, [plan], { isCurrent });
		owner.rejections = 0;
		if (isCurrent() && owner.generation === generation) nextMaintenanceAt = readSessionEntryMaintenanceNextAgeAt(owner.database, maintenance);
	} catch (error) {
		if (planningChanged && isCurrent()) {
			activeSessionKeys.forEach((key) => owner.activeSessionKeys.add(key));
			owner.rejections += 1;
			owner.running = false;
			owner.retryDelayMs = MAINTENANCE_WRITE_QUIET_MS;
			if (owner.rejections >= MAX_MAINTENANCE_REJECTIONS) getChildLogger({ subsystem: "session-sqlite" }).warn("SQLite automatic session maintenance paused after repeated input changes", {
				error,
				path: databasePath,
				rejections: owner.rejections
			});
			else {
				owner.running = true;
				owner.retryDelayMs = void 0;
				await runPendingMaintenance(databasePath, owner);
			}
			return;
		}
		getChildLogger({ subsystem: "session-sqlite" }).warn("SQLite automatic session maintenance failed", {
			error,
			path: databasePath
		});
	}
	if (!isCurrent()) {
		retireMaintenanceOwner(databasePath, owner);
		return;
	}
	if (owner.generation === generation) {
		if (nextMaintenanceAt === void 0) {
			retireMaintenanceOwner(databasePath, owner);
			return;
		}
		owner.running = false;
		owner.timer = setTimeout(() => {
			owner.timer = void 0;
			owner.running = true;
			runPendingMaintenance(databasePath, owner);
		}, Math.max(1, Math.min(SESSION_ENTRY_MAINTENANCE_INTERVAL_MS, nextMaintenanceAt - Date.now())));
		owner.timer.unref();
		return;
	}
	scheduleMaintenanceAfterWriteQuiet(databasePath, owner);
}
//#endregion
//#region src/config/sessions/session-entry-lineage.ts
/** True when this entry's transcript began as a copy of a parent (actual forkSource ancestry or the legacy/thread-settled marker). */
function sessionEntryForkedFromParent(entry) {
	return entry?.forkSource !== void 0 || entry?.forkedFromParent === true;
}
function preserveSqliteSameKeySessionRolloverLineage(params) {
	const previousSessionId = params.previous.sessionId.trim();
	const nextSessionId = params.next.sessionId.trim();
	if (!previousSessionId || !nextSessionId || previousSessionId === nextSessionId) return params.next;
	return {
		...params.next,
		previousSessionId,
		usageFamilyKey: params.next.usageFamilyKey ?? params.previous.usageFamilyKey ?? params.sessionKey,
		usageFamilySessionIds: uniqueStrings([
			...params.previous.usageFamilySessionIds ?? [],
			previousSessionId,
			...params.next.usageFamilySessionIds ?? [],
			nextSessionId
		])
	};
}
//#endregion
//#region src/config/sessions/session-store-path.ts
function resolvePhysicalSessionStorePath(scope, cfg) {
	const agentId = scope.agentId ?? resolveAgentIdFromSessionKey(scope.sessionKey);
	return resolveIdentityPathViaExistingAncestorSync(resolveSqliteTargetFromSessionStorePath(resolveSessionStorePathForScope(scope, cfg), {
		...scope,
		agentId
	}).path);
}
/** Prepare ownership in the read worker before resolving the physical path identity. */
async function preparePhysicalSessionStorePath(scope, cfg) {
	const agentId = scope.agentId ?? resolveAgentIdFromSessionKey(scope.sessionKey);
	const target = await prepareSqliteTargetFromSessionStorePath(resolveSessionStorePathForScope(scope, cfg), {
		agentId,
		env: scope.env
	});
	return resolveIdentityPathViaExistingAncestorSync(target.path);
}
function publishSystemEventStoreConfig(cfg) {
	const env = { ...process.env };
	const paths = /* @__PURE__ */ new Map();
	publishSystemEventStoreResolver((sessionKey, owner) => {
		const agentId = resolveAgentIdFromSessionKey(sessionKey, owner);
		const scope = {
			sessionKey,
			agentId,
			env
		};
		const key = JSON.stringify([agentId, resolveSessionStorePathForScope(scope, cfg)]);
		if (!paths.has(key)) paths.set(key, resolvePhysicalSessionStorePath(scope, cfg));
		return paths.get(key);
	});
}
function captureSessionWatcherStorePaths(keys = [], env) {
	return Object.fromEntries(keys.filter((key) => parseAgentSessionKey(key) != null).map((sessionKey) => [sessionKey, getSystemEventStorePath(sessionKey) ?? resolvePhysicalSessionStorePath({
		sessionKey,
		env
	})]));
}
function resolveSessionStorePathForScope(scope, config) {
	const explicitStorePath = resolveExplicitSessionStorePathForScope(scope);
	if (explicitStorePath) return explicitStorePath;
	const agentId = scope.agentId ?? resolveAgentIdFromSessionKey(scope.sessionKey);
	return resolveSessionStorePathCore((config ?? getRuntimeConfig()).session?.store, {
		agentId,
		env: scope.env
	});
}
//#endregion
//#region src/config/sessions/session-store-target-runtime.ts
async function withSessionStoreTarget(request, operation, assertCallerCurrent, onReadError, { lane } = {}) {
	assertCallerCurrent?.();
	const { candidates, ...targetRequest } = request;
	const registryRead = prepareOpenClawAgentDatabaseRegistrySnapshotRead({ env: targetRequest.env });
	return withSessionHistoryWorkerReadCandidates(candidates, async (discovery) => {
		let registryStarted = false;
		const assertDiscoveryCurrent = () => {
			assertCallerCurrent?.();
			discovery.assertCurrent();
			if (registryStarted) registryRead.assertCurrent();
		};
		const failedRead = async (error) => {
			assertDiscoveryCurrent();
			if (!onReadError) throw error;
			return await onReadError(error, assertDiscoveryCurrent);
		};
		let read = await discovery.readStoreTargetResult({
			...targetRequest,
			registeredDatabases: { status: "deferred" }
		});
		if (!read.ok) return await failedRead(read.error);
		let resolved = read.value;
		let registry;
		if (resolved.kind === "session-target-registry-required") {
			registryStarted = true;
			registryRead.assertCurrent();
			registry = await registryRead.read();
			registry.assertCurrent();
			discovery.assertCurrent();
			assertCallerCurrent?.();
			read = await discovery.readStoreTargetResult({
				...targetRequest,
				registeredDatabases: registry.result.status === "available" ? registry.result.entries : { status: "unavailable" }
			});
			if (!read.ok) return await failedRead(read.error);
			resolved = read.value;
			if (resolved.kind === "session-target-registry-required") throw new Error("Session store target requested registry rows twice");
		}
		registry?.assertCurrent();
		const target = resolved;
		const assertSourceCurrent = () => {
			assertCallerCurrent?.();
			discovery.assertCurrent();
			assertSessionStoreReadCandidate(target.sourcePath, candidates);
		};
		const assertCurrent = () => {
			assertSourceCurrent();
			assertDiscoveryCurrent();
			registry?.assertCurrent();
		};
		let registrationChanged = false;
		const verifyCurrentTarget = async (assertRetainedCurrent) => {
			assertRetainedCurrent();
			const currentRegistry = await registryRead.read();
			assertRetainedCurrent();
			currentRegistry.assertCurrent();
			const current = await discovery.readStoreTargetResult({
				...targetRequest,
				registeredDatabases: currentRegistry.result.status === "available" ? currentRegistry.result.entries : { status: "unavailable" }
			});
			if (!current.ok) throw current.error;
			assertRetainedCurrent();
			currentRegistry.assertCurrent();
			if (current.value.kind !== "session-store-target" || current.value.logicalAgentId !== target.logicalAgentId || current.value.sourcePath !== target.sourcePath || current.value.database.agentId !== target.database.agentId || current.value.database.path !== target.database.path) throw new Error("Session store registration changed its selected target");
			registry = currentRegistry;
			registrationChanged = false;
		};
		assertCurrent();
		const result = await operation(target, {
			assertCurrent,
			onRegistryChange(change) {
				if (registry) {
					registry.followRegistration(change);
					registrationChanged = true;
				}
			},
			async refreshBeforeDispatch(assertRetainedTarget) {
				try {
					assertCurrent();
				} catch (error) {
					if (!(error instanceof AgentDatabaseRegistryChangedError)) throw error;
					await verifyCurrentTarget(() => {
						assertSourceCurrent();
						assertRetainedTarget();
					});
				}
			},
			async revalidateTarget() {
				assertCurrent();
				if (!registrationChanged) return;
				await verifyCurrentTarget(assertCurrent);
			}
		});
		if (registrationChanged) throw new Error("Session read released its owner before confirming registration");
		return result;
	}, lane);
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-entry-admission.ts
/** Admission retains the exact owner that supplied its row across asynchronous policy work. */
async function loadSessionEntryForAdmission(input, preparation = {}) {
	const env = cloneEnvWithPlatformSemantics(input.env ?? process.env);
	env.OPENCLAW_STATE_DIR = resolveStateDir(env);
	const scope = {
		...input,
		env
	};
	const agentId = scope.agentId ? normalizeAgentId(scope.agentId) : parseAgentSessionKey(scope.sessionKey)?.agentId;
	const assertCurrent = () => {
		preparation.signal?.throwIfAborted();
		preparation.assertCurrent?.();
	};
	assertCurrent();
	if (isIncognitoSessionKey(scope.sessionKey) || Boolean(scope.storePath && (isIncognitoOpenClawAgentSqlitePath(scope.storePath, {
		agentId: agentId ?? scope.defaultAgentId ?? "main",
		env
	}) || listOpenIncognitoAgentDatabases().some((owner) => owner.storePath === scope.storePath)))) {
		const resolved = resolveSqliteScope(scope);
		const options = toDatabaseOptions(resolved);
		const database = openOpenClawAgentDatabase(options);
		const borrowed = borrowOpenClawAgentDatabase(options);
		const databaseClaim = createOpenClawAgentDatabaseClaim(database, borrowed.release);
		try {
			assertCurrent();
			return {
				entry: readSessionEntryRow(database, resolved.sessionKey)?.entry,
				databaseClaim
			};
		} catch (error) {
			databaseClaim.release();
			throw error;
		}
	}
	let storePath;
	if (scope.storePath) storePath = path.resolve(scope.storePath);
	else {
		if (!agentId) throw new Error("Cannot resolve SQLite session scope without an agent id");
		storePath = resolveOpenClawAgentSqlitePath({
			agentId,
			env
		});
	}
	const candidates = captureSessionStoreReadCandidates(storePath);
	let claim;
	try {
		const result = await withSessionStoreTarget({
			agentId,
			defaultAgentId: scope.defaultAgentId,
			storePath,
			env,
			candidates
		}, async (target, owner) => {
			const options = {
				...target.database,
				path: target.sourcePath,
				env
			};
			const observed = readDatabasePathIdentitySync(options.path);
			const assertOriginalTarget = () => {
				const current = readDatabasePathIdentitySync(options.path);
				if (current.key !== observed.key || current.canonicalPath !== observed.canonicalPath || current.birthtime !== observed.birthtime) throw new Error("Session database changed while waiting for admission");
			};
			return await runOpenClawAgentWorkerWrite(options, async () => {
				await owner.refreshBeforeDispatch(assertOriginalTarget);
				owner.assertCurrent();
				assertOriginalTarget();
				const execution = captureOpenClawAgentDatabaseExecution(options, observed.key.startsWith("file:") ? { expectedIdentity: {
					kind: "file",
					physicalIdentity: observed.key.slice(5),
					nativeLocation: observed.canonicalPath,
					birthtime: observed.birthtime
				} } : { expectedCreationIdentity: observed });
				const assertSourceCurrent = () => {
					assertCurrent();
					execution.assertCurrent();
					owner.assertCurrent();
				};
				const source = {
					assertCurrent: assertSourceCurrent,
					onRegistryChange: owner.onRegistryChange,
					createAdmission(binding) {
						return () => ({
							nativeLocations: binding.nativeLocations,
							admission: createSqliteWorkerOperationAdmission((request, grant) => {
								binding.authorize(request);
								assertSourceCurrent();
								if (!grant()) throw new Error("Session admission authority expired");
							}, binding.attachment)
						});
					}
				};
				let transferred = false;
				try {
					await execution.prepare(source, preparation.signal);
					const entry = await execution.runExisting(source, (worker) => worker.execute({
						type: "session.entry.read",
						input: { sessionKey: resolveSqliteSessionKey(scope.sessionKey, target.logicalAgentId) }
					}, { signal: preparation.signal }));
					await owner.revalidateTarget();
					assertSourceCurrent();
					const generation = execution.captureGenerationClaim();
					let release;
					claim = {
						kind: "worker",
						identity: generation.identity,
						incarnation: generation.incarnation,
						assertCurrent: () => generation.assertCurrent(),
						isCurrent() {
							try {
								generation.assertCurrent();
								return true;
							} catch {
								return false;
							}
						},
						release: () => release ??= execution.release()
					};
					transferred = true;
					return {
						entry,
						databaseClaim: claim
					};
				} finally {
					if (!transferred) await execution.release();
				}
			}, void 0, preparation.signal);
		}, assertCurrent);
		assertCurrent();
		result.databaseClaim.assertCurrent();
		return result;
	} catch (error) {
		await claim?.release();
		throw error;
	}
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-entry.ts
/** Loads one session entry from the additive SQLite session store. */
function loadSessionEntry(scope) {
	return resolveSessionEntry(scope).existing;
}
/** Loads one session entry without opening its agent database writable. */
function loadSessionEntryReadOnly(scope) {
	return resolveSessionEntry(scope, {
		readOnly: true,
		projection: scope.projection
	}).existing;
}
/** Private prepared reads must reject a different physical owner at the captured path. */
function loadSessionEntryReadOnlyInScope(scope) {
	return resolveSessionEntry(scope, {
		readOnly: true,
		databaseAgentId: scope.databaseAgentId,
		projection: scope.projection
	}).existing;
}
/** Lists persisted session keys without materializing their entry JSON. */
async function listSessionEntryKeysReadOnly(scope = {}) {
	const resolved = resolveSqliteScope({
		...scope,
		sessionKey: ""
	});
	const result = withOpenClawAgentDatabaseReadOnly((database) => {
		const db = getSessionKysely(database.db);
		return executeSqliteQuerySync(database.db, db.selectFrom("session_nodes").select("session_key").orderBy("session_key")).rows.map((row) => row.session_key);
	}, toDatabaseOptions(resolved));
	return result.found ? result.value : [];
}
/** Lists direct child rows without cloning or rebuilding the complete session store. */
function listSessionChildEntriesReadOnly(scope) {
	const resolved = resolveSqliteScope(scope);
	const result = withOpenClawAgentDatabaseReadOnly((database) => {
		assertCanonicalSqliteSessionKeysCurrent(database);
		const db = getSessionKysely(database.db);
		const query = scope.projection === "list" ? selectSessionEntryRows(database, scope.projection).select(["current_session_id", "updated_at"]) : db.selectFrom("session_nodes").selectAll().select(sessionEntrySnapshotColumns);
		const sessionKeys = db.selectFrom("session_nodes").select("session_key");
		const childKeys = sessionKeys.where("parent_session_key", "=", resolved.sessionKey).union(sessionKeys.where("spawned_by", "=", resolved.sessionKey));
		const childRows = executeSqliteQuerySync(database.db, query.where("session_key", "in", childKeys).where("session_key", "!=", resolved.sessionKey).orderBy("session_key", "asc")).rows;
		return parseReadableSqliteSessionEntryRows(database, childRows.filter((row) => !isInternalSessionEffectsKey(row.session_key)), scope.projection);
	}, toDatabaseOptions(resolved));
	return result.found ? result.value : [];
}
/** Resolves the persisted session key for a SQLite transcript session id. */
function resolveSessionKeyBySessionId(scope) {
	const resolved = resolveSqliteTranscriptReadScope(scope);
	const result = withOpenClawAgentDatabaseReadOnly((database) => {
		const db = getSessionKysely(database.db);
		return executeSqliteQueryTakeFirstSync(database.db, db.selectFrom("session_windows").select("session_key").where("session_id", "=", resolved.sessionId).limit(1));
	}, toDatabaseOptions(resolved));
	return result.found ? result.value?.session_key : void 0;
}
/** Lists session entries from the additive SQLite session store. */
function listSessionEntryRows(scope = {}) {
	const resolved = resolveSqliteScope({
		...scope,
		sessionKey: ""
	});
	const database = openOpenClawAgentDatabase(toDatabaseOptions(resolved));
	return listSqliteSessionEntriesFromDatabase(database, resolved, scope);
}
/** Reuse one reader during synchronous entry work; each read keeps its current admission. */
function withSessionEntryReadOnlyScope(scope, operation) {
	const options = toDatabaseOptions(resolveSqliteScope({
		...scope,
		sessionKey: ""
	}));
	const reader = new OpenClawAgentDatabaseReadOnlyScope();
	try {
		return reader.run({
			agentId: options.agentId,
			path: resolveOpenClawAgentSqlitePath(options)
		}, operation);
	} finally {
		reader.close();
	}
}
/**
* Proves whether a durable store has a row in one of the requested lifecycle states.
* Unknown existing schemas stay eligible so the writable owner can surface or repair them.
*/
function hasSessionEntriesByStatusReadOnly(scope, statuses) {
	const selectedStatuses = [...new Set(statuses)];
	if (selectedStatuses.length === 0) return false;
	const resolved = resolveSqliteScope({
		...scope,
		sessionKey: ""
	});
	const result = withOpenClawAgentDatabaseReadOnly((database) => hasSessionEntriesByStatus(database, selectedStatuses), toDatabaseOptions(resolved));
	return result.found ? result.value : result.reason !== "database-missing";
}
/** Lists only entries whose normalized session row has one of the requested statuses. */
function listSessionEntriesByStatus(scope, statuses) {
	const resolved = resolveSqliteScope({
		...scope,
		sessionKey: ""
	});
	const database = openOpenClawAgentDatabase(toDatabaseOptions(resolved));
	return readSessionEntriesByStatus(database, statuses).filter(({ sessionKey }) => !isInternalSessionEffectsKey(sessionKey));
}
/** Lists transcript-bearing SQLite sessions, including retained rows from session-id rotation. */
function listSessionTranscriptInstances(scope = {}, options = {}) {
	const resolved = resolveSqliteScope({
		...scope,
		sessionKey: ""
	});
	const result = withOpenClawAgentDatabaseReadOnly((database) => {
		return listTranscriptInstancesFromDatabase({
			currentEntries: options.sessionId !== void 0 ? { get: (sessionKey) => readExactSessionEntryRowValidated(database, sessionKey, scope.projection)?.entry } : new Map(listSqliteSessionEntriesFromDatabase(database, resolved, {
				...scope,
				clone: false
			}).map(({ sessionKey, entry }) => [sessionKey, entry])),
			database,
			options
		});
	}, toDatabaseOptions(resolved));
	return result.found ? result.value : [];
}
/** Reads a session activity timestamp from the additive SQLite session store. */
function readSessionUpdatedAtCore(scope) {
	const resolved = resolveSqliteScope(scope);
	const database = openOpenClawAgentDatabase(toDatabaseOptions(resolved));
	const row = readSessionEntryRow(database, resolved.sessionKey)?.row;
	return row ? coerceRequiredSqliteNumber(row.updated_at) : void 0;
}
/** Applies a partial entry update to the additive SQLite session store. */
async function upsertSessionEntryCore(scope, patch, options = {}) {
	return await patchSessionEntryCore(scope, () => patch, {
		...options,
		fallbackEntry: createFallbackSessionEntry(patch)
	});
}
/** Replaces one entry in the additive SQLite session store. */
async function replaceSessionEntry(scope, entry) {
	return await patchSessionEntryCore(scope, () => entry, {
		fallbackEntry: entry,
		replaceEntry: true
	});
}
/** Replaces one entry synchronously for sync session runtimes. */
function replaceSessionEntrySync(scope, entry) {
	const resolved = resolveSqliteScope(scope);
	assertCanonicalSessionKeyWrite(resolved.sessionKey, resolved.agentId);
	runOpenClawAgentWriteTransaction((database) => {
		const { previous, current } = replaceSessionEntryInDatabase(database, resolved.sessionKey, entry);
		return prepareSessionIdentityPublication(database, resolved.agentId, previous, current);
	}, toDatabaseOptions(resolved), { operationLabel: "session-entry.replace" })();
}
/** Patches one entry in the additive SQLite session store. */
async function patchSessionEntryCore(scope, update, options = {}) {
	return await patchSessionEntryInScope(scope, update, options);
}
async function patchSessionEntryInScope(scope, update, options, databaseAgentId) {
	const resolved = resolveSqliteScope(scope);
	if (databaseAgentId) resolved.databaseAgentId = databaseAgentId;
	assertCanonicalSessionKeyWrite(resolved.sessionKey, resolved.agentId);
	return await patchSqliteSessionEntrySnapshot({
		operationLabel: "session-entry.patch",
		validateCanonicalKeys: options.replaceEntry !== true,
		options,
		readSnapshot: (database) => readSessionEntrySelectionSnapshot(database, resolved.sessionKey, options.replaceEntry === true),
		resolved,
		sessionKey: resolved.sessionKey,
		storePath: resolveSessionStorePathForScope(scope),
		update
	});
}
/** Patches one logical entry after validating its canonical lifecycle target. */
async function patchSessionEntryTarget(scope, update, options = {}) {
	const source = scope.readSource;
	return await patchSqliteSessionEntrySnapshot({
		operationLabel: "session-entry-target.patch",
		capturedSource: source,
		validateCanonicalKeys: true,
		options,
		readSnapshot: (database) => readLifecycleTargetSnapshot(database, scope.target),
		resolved: source ? {
			agentId: scope.agentId ?? source.agentId,
			databaseAgentId: source.agentId,
			env: scope.env,
			path: source.path,
			ownerStorePath: source.path,
			sessionKey: ""
		} : resolveSqliteScope({
			agentId: scope.agentId,
			env: scope.env,
			sessionKey: "",
			storePath: scope.storePath
		}),
		sessionKey: scope.target.canonicalKey,
		storePath: source?.path ?? resolveSessionStorePathForScope({
			agentId: scope.agentId,
			sessionKey: scope.target.canonicalKey,
			storePath: scope.storePath
		}),
		update
	});
}
/** All entry patches prepare asynchronously, then revalidate and publish on one commit edge. */
async function patchSqliteSessionEntrySnapshot(params) {
	const { options, sessionKey } = params;
	const resolved = {
		...params.resolved,
		env: cloneEnvWithPlatformSemantics(params.resolved.env ?? process.env)
	};
	resolved.env.OPENCLAW_STATE_DIR = resolveStateDir(resolved.env);
	const databaseOptions = toDatabaseOptions(resolved);
	const databasePath = resolveOpenClawAgentSqlitePath(databaseOptions);
	resolved.path = databasePath;
	databaseOptions.path = databasePath;
	const incognito = isIncognitoOpenClawAgentSqlitePath(databasePath, databaseOptions);
	const captured = params.capturedSource;
	const assertCapturedSource = (database) => {
		if (!captured) return;
		assertCapturedSessionEntryReadSource(captured, database ?? getOpenClawAgentDatabaseIfOpen(databaseOptions));
	};
	const assertCurrent = captured ? () => assertCapturedSource() : void 0;
	const withDatabase = (operation) => {
		assertCurrent?.();
		return !incognito && !getOpenClawAgentDatabaseIfOpen(databaseOptions) ? withOpenClawAgentDatabaseAsync(databaseOptions, operation, assertCurrent) : operation();
	};
	let wrote = false;
	const committed = await runExclusiveSqliteSessionWrite(resolved, async () => withDatabase(async () => {
		const database = openOpenClawAgentDatabase(databaseOptions);
		assertCapturedSource(database);
		const prepared = params.readSnapshot(database);
		const existing = prepared[0]?.entry;
		const writeBase = existing ?? options.fallbackEntry;
		if (!writeBase) return null;
		let contextEntry = existing;
		let contextEntryBorrowed = true;
		const patch = await params.update(structuredClone(writeBase), {
			get existingEntry() {
				if (contextEntryBorrowed) {
					contextEntry = contextEntry ? structuredClone(contextEntry) : void 0;
					contextEntryBorrowed = false;
				}
				return contextEntry;
			},
			set existingEntry(entry) {
				contextEntry = entry;
				contextEntryBorrowed = false;
			}
		});
		const mergeBase = existing ? writeBase : void 0;
		const creationPatch = !existing && patch ? {
			...writeBase,
			...patch
		} : patch;
		const merged = !creationPatch ? void 0 : options.replaceEntry ? structuredClone(patch) : options.preserveActivity ? mergeSessionEntryPreserveActivity(mergeBase, creationPatch) : mergeSessionEntry(mergeBase, creationPatch);
		const next = !merged ? void 0 : options.replaceEntry ? merged : preserveSqliteSameKeySessionRolloverLineage({
			next: merged,
			previous: writeBase,
			sessionKey
		});
		return withDatabase(async () => {
			let result = null;
			const publish = await runOpenClawAgentWriteWithYieldingAdmission((writeDatabase) => {
				assertCapturedSource(writeDatabase);
				if (options.shouldCommit?.() === false) return;
				const mutation = applySessionEntryPatchInDatabase(writeDatabase, {
					operationLabel: params.operationLabel,
					validateCanonicalKeys: params.validateCanonicalKeys,
					readSnapshot: params.readSnapshot,
					prepared,
					sessionKey,
					writeBase,
					next,
					options
				});
				result = mutation.entry;
				if (!mutation.identity) return;
				wrote = true;
				return prepareSessionIdentityPublication(writeDatabase, resolved.agentId, mutation.identity.previous, mutation.identity.current);
			}, databaseOptions, { operationLabel: params.operationLabel });
			try {
				if (next && result) options.onCommitted?.(structuredClone(result));
			} finally {
				publish?.();
			}
			return result;
		});
	}), params.operationLabel);
	if (wrote) kickSessionEntryMaintenanceAfterWrite({
		activeSessionKey: sessionKey,
		archiveDirectory: resolveSqliteTranscriptArchiveDirectory(resolved),
		maintenanceConfig: options.maintenanceConfig,
		scope: resolved,
		skipMaintenance: options.skipMaintenance,
		storePath: params.storePath
	});
	kickSessionHistoryDiskBudgetMaintenance({
		...resolved.agentId ? { agentId: resolved.agentId } : {},
		env: resolved.env,
		storePath: params.storePath,
		...options.maintenanceConfig ? { maintenanceConfig: options.maintenanceConfig } : {}
	});
	return committed;
}
function buildInboundSessionCreationStamp(ctx) {
	const senderId = ctx?.SenderId?.trim();
	return buildSessionCreationStamp(ctx?.SessionCreation ?? {
		via: "channel",
		...senderId ? { actor: {
			type: "human",
			source: "channel",
			id: senderId
		} } : {}
	});
}
async function recordInboundSessionMeta(params) {
	normalizeInternalTurnContext(params.ctx);
	const createIfMissing = params.createIfMissing ?? true;
	return await patchSessionEntryCore({
		sessionKey: params.sessionKey,
		storePath: params.storePath
	}, (_entry, context) => {
		const metadataPatch = deriveSessionMetaPatch({
			ctx: params.ctx,
			sessionKey: params.sessionKey,
			existing: context.existingEntry,
			groupResolution: params.groupResolution
		});
		if (context.existingEntry) return metadataPatch;
		return {
			...buildInboundSessionCreationStamp(params.ctx),
			...metadataPatch
		};
	}, {
		preserveActivity: true,
		...createIfMissing ? { fallbackEntry: mergeSessionEntry(void 0, {}) } : {}
	});
}
/** Updates last-route/delivery metadata without refreshing activity timestamps. */
async function updateSessionLastRoute(params) {
	return await updateSessionLastRouteInScope({
		sessionKey: params.sessionKey,
		storePath: params.storePath
	}, params);
}
/** Internal callers retain their captured storage owner across route preparation. */
async function updateSessionLastRouteInScope(scope, params) {
	if (params.ctx) normalizeInternalTurnContext(params.ctx);
	const createIfMissing = params.createIfMissing ?? true;
	return await patchSessionEntryInScope(scope, (_entry, context) => {
		const routePatch = deriveLastRoutePatch({
			channel: params.channel,
			to: params.to,
			accountId: params.accountId,
			threadId: params.threadId,
			route: params.route,
			deliveryContext: params.deliveryContext,
			ctx: params.ctx,
			groupResolution: params.groupResolution,
			existing: context.existingEntry,
			sessionKey: scope.sessionKey
		});
		if (context.existingEntry) return routePatch;
		return {
			...buildInboundSessionCreationStamp(params.ctx),
			...routePatch
		};
	}, {
		preserveActivity: true,
		...params.assertCommitAllowed ? { assertCommitAllowed: params.assertCommitAllowed } : {},
		...createIfMissing ? { fallbackEntry: mergeSessionEntry(void 0, {}) } : {}
	}, scope.databaseAgentId);
}
//#endregion
export { kickSessionEntryMaintenanceAfterWrite as A, captureSessionWatcherStorePaths as C, resolveSessionStorePathForScope as D, resolvePhysicalSessionStorePath as E, listSessionTranscriptArchivesReadOnly as M, readSessionTaskArchivePageReadOnly as N, preserveSqliteSameKeySessionRolloverLineage as O, verifySessionTranscriptArchivePageBindingReadOnly as P, withSessionStoreTarget as S, publishSystemEventStoreConfig as T, updateSessionLastRoute as _, listSessionEntryRows as a, withSessionEntryReadOnlyScope as b, loadSessionEntryReadOnly as c, patchSessionEntryTarget as d, readSessionUpdatedAtCore as f, resolveSessionKeyBySessionId as g, replaceSessionEntrySync as h, listSessionEntryKeysReadOnly as i, findSessionTranscriptArchiveEventReadOnly as j, sessionEntryForkedFromParent as k, loadSessionEntryReadOnlyInScope as l, replaceSessionEntry as m, listSessionChildEntriesReadOnly as n, listSessionTranscriptInstances as o, recordInboundSessionMeta as p, listSessionEntriesByStatus as r, loadSessionEntry as s, hasSessionEntriesByStatusReadOnly as t, patchSessionEntryCore as u, updateSessionLastRouteInScope as v, preparePhysicalSessionStorePath as w, loadSessionEntryForAdmission as x, upsertSessionEntryCore as y };
