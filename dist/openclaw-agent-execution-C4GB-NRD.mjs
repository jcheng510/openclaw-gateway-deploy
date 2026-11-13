import { i as resolveGlobalSingleton } from "./global-singleton-BfHBYj6Y.mjs";
import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { a as readDatabasePathIdentitySync, t as assertExistingDatabaseIdentity } from "./sqlite-worker-identity-Dggu-rKK.mjs";
import { a as createSqliteLifecycleAggregateError, s as throwSqliteLifecycleErrors } from "./sqlite-lifecycle-errors-Q-hsFPSB.mjs";
import { t as createSubsystemLogger } from "./subsystem-CeqVSEVi.mjs";
import { f as publishSqliteWalCheckpointObservation } from "./sqlite-wal-fdekKFS3.mjs";
import { l as observeOpenClawDatabaseMaintenanceResource, o as getOpenClawDatabaseMaintenanceScope, u as runOutsideOpenClawDatabaseMaintenanceScope } from "./openclaw-state-db-async-lifecycle-D4cx8OBO.mjs";
import { s as resolveOpenClawStateSqlitePath } from "./openclaw-state-db.paths-rJI64Ab5.mjs";
import { n as runtimeProcessEntrypoints } from "./runtime-process-entrypoints-CbWx0yUe.mjs";
import { r as resolveRuntimeWorkerUrl } from "./runtime-worker-url-S0NIVxUR.mjs";
import { _ as registerOpenClawStateDatabaseAsyncResource, m as publishOpenClawStateDatabaseWorkerAdmission } from "./openclaw-state-db-cache-IAib4pqp.mjs";
import { a as getOpenClawAgentDatabaseValidationForTransfer, n as captureOpenClawAgentDatabaseValidationTransfer } from "./openclaw-agent-db-validation-cache-C348cqkT.mjs";
import { n as normalizeAgentId } from "./agent-id-D1-Q6vR4.mjs";
import { o as registerOpenClawAgentDatabaseAsyncResource } from "./openclaw-agent-db-resources-DZhhXFbz.mjs";
import { t as SQLITE_IDLE_HANDLE_TTL_MS } from "./sqlite-handle-lifecycle-dWd9h3ii.mjs";
import { v as retainSqliteWorkerErrorCode } from "./sqlite-worker-operation-admission-BB758RIN.mjs";
import { r as cloneEnvWithPlatformSemantics } from "./config-env-vars-C__rW8Th.mjs";
import { r as captureOpenClawStateWorkerContext, t as captureOpenClawStateReadContext } from "./openclaw-state-worker-context-C_iAE7YK.mjs";
import "./session-key-BC4m_Ly5.mjs";
import { c as resolveOpenClawAgentSqlitePath, i as isIncognitoOpenClawAgentSqlitePath } from "./openclaw-agent-db.paths-Dv3PPTNK.mjs";
import { a as isSqliteWorkerStoreAvailable, d as runSqliteWorkerStoreOperation, o as openAgentDatabaseSqliteWorkerStore, t as closeUnclaimedSharedStateSqliteWorkers } from "./sqlite-worker-store-DNLj-iuz.mjs";
import { i as captureAgentDatabaseAdmission, o as captureAgentDatabasePreparationJournal } from "./agent-database-admission-CLYAvaL3.mjs";
import { x as getAgentDeletionDatabaseCleanup } from "./agent-deletion-journal-C9BqqBYt.mjs";
import { l as hasAgentDatabaseMaintenanceAuthority } from "./openclaw-agent-db-lease-B-E6z2mk.mjs";
import { n as cache } from "./openclaw-agent-db-lifecycle-CCXA1nI8.mjs";
import { n as captureOpenClawAgentDatabaseRegistration } from "./openclaw-agent-db-registry-listing-DKcT5BJS.mjs";
import { t as requestOpenClawAgentDatabaseQuickCheck } from "./openclaw-database-verify-DNMLxw8t.mjs";
import { s as getGatewayRestartDrainSignal } from "./gateway-work-admission-B4bQUVQ6.mjs";
import { t as cleanupRetiredAgentDatabaseLease } from "./openclaw-agent-execution-cleanup-B0nkwPFH.mjs";
import { AsyncLocalStorage } from "node:async_hooks";
import { isDeepStrictEqual } from "node:util";
import { randomUUID } from "node:crypto";
import { MessagePort } from "node:worker_threads";
import { addAbortListener } from "node:events";
//#region src/state/openclaw-agent-execution-native.ts
async function settleAgentRegistration(registration, operation) {
	let result;
	try {
		result = {
			ok: true,
			value: await operation()
		};
	} catch (error) {
		result = {
			ok: false,
			error
		};
	}
	try {
		registration.finish();
	} catch (error) {
		if (!result.ok) throw createSqliteLifecycleAggregateError([result.error, error], "Agent open and registration publication failed", result.error);
		throw error;
	}
	if (!result.ok) throw result.error;
	return result.value;
}
/** A logical execution owner can replace this generation only after its native close settles. */
function createAgentDatabaseNativeGeneration(agentId, pathname, context, assertLogicalCurrent, assertCleanupOwned, expectedIdentity, acceptFileIdentity, creatingIdentity) {
	const input = {
		leaseId: randomUUID(),
		agentId,
		databasePath: pathname,
		stateDatabasePath: context.admission.databasePath,
		environment: context.environment,
		...expectedIdentity ? { expectedIdentity } : {},
		...creatingIdentity ? { creatingIdentity } : {}
	};
	let retiring = false;
	let opening;
	let openedStore;
	let openingFailed = false;
	let closing;
	let nativeIdentity;
	let nativeStopped;
	let readCloseReceipt;
	let lease;
	let quickCheckPending = false;
	let receiveValidation;
	const assertCurrent = () => {
		assertLogicalCurrent();
		if (retiring) throw new Error("Agent native generation is retiring");
		if (openedStore && !isSqliteWorkerStoreAvailable(openedStore)) throw new Error("Agent database execution lost its native owner");
	};
	const admission = (source, registration, assertCallerCurrent) => (operation) => {
		const assertPreparationJournal = captureAgentDatabasePreparationJournal(agentId, { env: context.environment });
		const nativeLocations = [
			pathname,
			...nativeIdentity ? [nativeIdentity.nativeLocation] : [],
			context.admission.databasePath,
			context.admission.identity.canonicalPath
		];
		const assertSourceCurrent = (identity) => {
			source.assertCurrent();
			assertCurrent();
			assertCallerCurrent?.(identity);
			if (identity) assertExistingDatabaseIdentity(pathname, `file:${identity.physicalIdentity}`, identity.birthtime);
		};
		const authorizeNative = (request) => {
			const facts = request.facts;
			if (request.stage === "prepare" && isRecord(facts) && facts.kind === "agent-registration-committed") {
				const received = facts.registration;
				if (!registration || !lease || !isRecord(received) || received.agentId !== input.agentId || received.agentPath !== pathname || received.stateDatabasePath !== lease.sharedStatePath || received.stateDatabaseIdentity !== lease.sharedStateIdentity) throw new Error("Agent registration commit differs from its admitted native owner");
				registration.recordCommitted({
					agentId: input.agentId,
					agentPath: pathname,
					stateDatabasePath: lease.sharedStatePath,
					stateDatabaseIdentity: lease.sharedStateIdentity
				});
				return;
			}
			assertCurrent();
			if (!nativeIdentity || creatingIdentity) assertCallerCurrent?.();
			if (request.stage === "prepare" && isRecord(facts) && facts.kind === "agent-registration-start") {
				assertSourceCurrent();
				if (!registration || !lease || !isDeepStrictEqual(facts.lease, lease)) throw new Error("Agent registration start differs from its admitted native owner");
				registration.begin();
				return;
			}
			if (request.stage === "prepare" && isRecord(facts) && facts.kind === "shared-owner") {
				if (!(facts.validationPort instanceof MessagePort)) throw new Error("Agent worker lost its validation handoff port");
				try {
					assertSourceCurrent();
					publishOpenClawStateDatabaseWorkerAdmission(context.admission);
					const received = facts.lease;
					if (!isDeepStrictEqual(facts.identity, context.admission.identity) || !isRecord(received) || received.leaseId !== input.leaseId || received.agentId !== input.agentId || received.path !== pathname || received.ownerPid !== process.pid || received.ownerStartTime !== null && typeof received.ownerStartTime !== "number" || received.sharedStatePath !== context.admission.databasePath || received.sharedStateIdentity !== context.admission.identity.key) throw new Error("Agent worker lease differs from its captured native owner");
					lease = {
						leaseId: input.leaseId,
						agentId: input.agentId,
						path: pathname,
						ownerPid: process.pid,
						ownerStartTime: received.ownerStartTime,
						sharedStatePath: context.admission.databasePath,
						sharedStateIdentity: context.admission.identity.key
					};
					receiveValidation = captureOpenClawAgentDatabaseValidationTransfer({
						agentId,
						path: pathname
					});
					facts.validationPort.postMessage(getOpenClawAgentDatabaseValidationForTransfer({
						agentId,
						path: pathname
					}), []);
				} finally {
					facts.validationPort.close();
				}
				return;
			}
			if (request.stage === "prepare" && isRecord(facts) && facts.kind === "agent-integrity-cached") {
				assertSourceCurrent();
				if (!lease || !isDeepStrictEqual(facts.lease, lease)) throw new Error("Agent integrity notice differs from its captured native lease");
				quickCheckPending = true;
				return;
			}
			if (request.stage === "open") {
				if (!isDeepStrictEqual(facts, input)) throw new Error("Agent database open differs from its captured owner");
			} else {
				const received = isRecord(facts) ? facts.identity : void 0;
				if (!isRecord(received) || received.kind !== "file" || typeof received.physicalIdentity !== "string" || typeof received.birthtime !== "string" || typeof received.incarnation !== "string" || typeof received.nativeLocation !== "string" || nativeIdentity && !isDeepStrictEqual(received, nativeIdentity)) throw new Error("Agent database operation belongs to another native owner");
				const receivedIdentity = nativeIdentity ?? Object.freeze({
					kind: "file",
					physicalIdentity: received.physicalIdentity,
					birthtime: received.birthtime,
					incarnation: received.incarnation,
					nativeLocation: received.nativeLocation
				});
				if (expectedIdentity && (receivedIdentity.physicalIdentity !== expectedIdentity.physicalIdentity || expectedIdentity.birthtime !== void 0 && receivedIdentity.birthtime !== expectedIdentity.birthtime)) throw new Error("Agent database operation differs from its expected physical file");
				if (!nativeIdentity) assertExistingDatabaseIdentity(pathname, `file:${receivedIdentity.physicalIdentity}`, receivedIdentity.birthtime);
				acceptFileIdentity({
					kind: "file",
					physicalIdentity: receivedIdentity.physicalIdentity,
					birthtime: receivedIdentity.birthtime,
					nativeLocation: receivedIdentity.nativeLocation
				});
				assertPreparationJournal?.(isRecord(facts) ? facts.agentDeletionJournalPresent : void 0);
				nativeIdentity ??= receivedIdentity;
				return nativeIdentity;
			}
		};
		return source.createAdmission({
			attachment: {
				kind: "agent-execution",
				startupJournal: assertPreparationJournal !== void 0
			},
			nativeLocations,
			assertCurrent,
			authorize(request) {
				const identity = authorizeNative(request);
				if (request.stage === "open" && registration) {
					assertSourceCurrent();
					if (creatingIdentity ? creatingIdentity.key.startsWith("path:") : !nativeIdentity && !expectedIdentity && readDatabasePathIdentitySync(pathname).key.startsWith("path:")) registration.begin();
				}
				if (request.stage === "prepare" && identity && receiveValidation && isRecord(request.facts)) {
					assertSourceCurrent(identity);
					receiveValidation(identity.physicalIdentity, request.facts.validation);
					receiveValidation = void 0;
				}
				assertSourceCurrent(identity);
			}
		})(operation);
	};
	const open = (source, assertCallerCurrent, createIfMissing = false, signal) => {
		assertCurrent();
		source.assertCurrent();
		assertCallerCurrent?.();
		opening ??= (async () => {
			const registration = createIfMissing ? captureOpenClawAgentDatabaseRegistration({
				agentId,
				agentPath: pathname,
				admission: context.admission,
				onRegistryChange: source.onRegistryChange
			}) : void 0;
			const openStore = async () => {
				const assertOpening = () => {
					assertCurrent();
					source.assertCurrent();
					assertCallerCurrent?.();
					signal?.throwIfAborted();
				};
				const createAdmission = admission(source, registration, assertCallerCurrent);
				return await openAgentDatabaseSqliteWorkerStore({
					moduleUrl: resolveRuntimeWorkerUrl(runtimeProcessEntrypoints.agentDatabaseExecution),
					databasePath: pathname,
					input,
					existingOnly: !createIfMissing
				}, {
					stateContext: context,
					stateDatabasePath: context.admission.databasePath,
					assertCurrent: assertOpening,
					signal,
					createAdmission,
					onNativeStopped: (stopped, readReceipt) => {
						nativeStopped = stopped;
						readCloseReceipt = readReceipt;
					}
				});
			};
			const store = registration ? await settleAgentRegistration(registration, openStore) : await openStore();
			if (!store) return;
			openedStore = store;
			try {
				assertCurrent();
				return store;
			} catch (error) {
				try {
					await store.close();
				} catch (cleanupError) {
					throw new AggregateError([error, cleanupError], "Agent open and cleanup failed", { cause: cleanupError });
				}
				throw error;
			}
		})().catch((error) => {
			openingFailed = true;
			throw error;
		});
		const attempt = opening;
		return attempt.then((store) => {
			if (!store && opening === attempt) opening = void 0;
			if (!store && createIfMissing) return open(source, assertCallerCurrent, true, signal);
			return store;
		});
	};
	async function run(source, operation, assertCallerCurrent, createIfMissing = false, signal) {
		const assertOperationCurrent = () => {
			assertCurrent();
			source.assertCurrent();
			assertCallerCurrent?.();
			signal?.throwIfAborted();
		};
		const store = openedStore ?? await open(source, assertCallerCurrent, createIfMissing, signal);
		assertOperationCurrent();
		if (!store) return;
		if (!nativeIdentity) {
			const registration = captureOpenClawAgentDatabaseRegistration({
				agentId,
				agentPath: pathname,
				admission: context.admission,
				onRegistryChange: source.onRegistryChange
			});
			await settleAgentRegistration(registration, async () => {
				const createAdmission = admission(source, registration, assertCallerCurrent);
				await runSqliteWorkerStoreOperation(store, (scope) => scope.execute({
					type: "database.prepareWrite",
					input: void 0
				}, { signal }), void 0, assertOperationCurrent, createAdmission);
				assertCurrent();
				source.assertCurrent();
			});
		}
		if (quickCheckPending) {
			quickCheckPending = false;
			requestOpenClawAgentDatabaseQuickCheck({
				path: pathname,
				env: input.environment
			});
		}
		return runSqliteWorkerStoreOperation(store, operation, void 0, assertOperationCurrent, admission(source, void 0, assertCallerCurrent));
	}
	const readConfirmedClose = () => {
		const receipt = readCloseReceipt?.();
		if (!receipt || !nativeIdentity || !lease || receipt.incarnation !== nativeIdentity.incarnation || receipt.identity.key !== `file:${nativeIdentity.physicalIdentity}` || receipt.identity.canonicalPath !== nativeIdentity.nativeLocation) return;
		return {
			receipt,
			identity: nativeIdentity,
			lease
		};
	};
	const publishCloseCheckpoint = () => {
		const closed = readConfirmedClose();
		if (!closed) return;
		const { receipt, identity, lease: closedLease } = closed;
		try {
			assertCleanupOwned();
			assertExistingDatabaseIdentity(pathname, receipt.identity.key);
			assertExistingDatabaseIdentity(identity.nativeLocation, receipt.identity.key);
			assertExistingDatabaseIdentity(closedLease.sharedStatePath, closedLease.sharedStateIdentity);
			publishSqliteWalCheckpointObservation(pathname, receipt.checkpoint);
		} catch {}
	};
	return {
		failed: () => openingFailed || Boolean(openedStore && !isSqliteWorkerStoreAvailable(openedStore)),
		captureClaim() {
			assertCurrent();
			const captured = nativeIdentity;
			if (!captured) throw new Error("Agent database generation has not been admitted");
			return {
				identity: captured.physicalIdentity,
				incarnation: captured.incarnation,
				assertCurrent() {
					assertCurrent();
					if (nativeIdentity !== captured) throw new Error("Agent database generation changed");
				}
			};
		},
		run,
		close() {
			retiring = true;
			closing ??= (async () => {
				const errors = [];
				let storeClosed = false;
				if (opening) try {
					await opening.then(async (store) => {
						await store?.close();
						storeClosed = store !== void 0;
					}, () => openedStore ? openedStore.close() : closeUnclaimedSharedStateSqliteWorkers(pathname));
				} catch (error) {
					errors.push(error);
				}
				if (nativeStopped && lease) try {
					await nativeStopped;
					assertCleanupOwned();
					if (storeClosed && readConfirmedClose()) assertExistingDatabaseIdentity(lease.sharedStatePath, lease.sharedStateIdentity);
					else await cleanupRetiredAgentDatabaseLease({
						context,
						stopped: nativeStopped,
						assertOwned: assertCleanupOwned,
						lease
					});
				} catch (error) {
					errors.push(error);
				}
				throwSqliteLifecycleErrors(errors, "Agent native close and lease cleanup failed");
				publishCloseCheckpoint();
			})().catch((error) => {
				closing = void 0;
				throw error;
			});
			return closing;
		}
	};
}
//#endregion
//#region src/state/openclaw-agent-execution.ts
const log = createSubsystemLogger("state/agent-db");
const executionState = resolveGlobalSingleton(Symbol.for("openclaw.agentDatabaseExecutionOwners"), () => ({ owners: /* @__PURE__ */ new Map() }));
const executions = executionState.owners;
const runInExecutionOwnerContext = AsyncLocalStorage.snapshot();
function supportsAgentDatabaseExecutionScope(options) {
	return getOpenClawDatabaseMaintenanceScope()?.ownsSchemaMaintenance !== true && !hasAgentDatabaseMaintenanceAuthority() && !getAgentDeletionDatabaseCleanup(options);
}
/** These native-only scopes still need their complete owning caller cutover. */
function supportsOpenClawAgentDatabaseExecution(options) {
	return !isIncognitoOpenClawAgentSqlitePath(resolveOpenClawAgentSqlitePath(options), options) && supportsAgentDatabaseExecutionScope(options);
}
/** Borrow before callers yield; native opening stays lazy and release joins owned work. */
function captureOpenClawAgentDatabaseExecution(options, constraints = {}) {
	const agentId = normalizeAgentId(options.agentId);
	const pathname = resolveOpenClawAgentSqlitePath(options);
	if (!supportsOpenClawAgentDatabaseExecution(options)) throw new Error("This agent database scope still requires its existing native owner");
	let existing = executions.get(pathname);
	const expectedCreationIdentity = constraints.expectedCreationIdentity ? Object.freeze({ ...constraints.expectedCreationIdentity }) : void 0;
	if (!existing || expectedCreationIdentity) {
		const identity = readDatabasePathIdentitySync(pathname);
		existing ??= executions.get(identity.canonicalPath);
		if (expectedCreationIdentity) {
			const capturesAbsence = expectedCreationIdentity.key.startsWith("path:");
			if (constraints.expectedIdentity || capturesAbsence && (existing || cache.databases.has(pathname) || cache.pending.has(pathname)) || !capturesAbsence && (!expectedCreationIdentity.key.startsWith("file:") || typeof expectedCreationIdentity.birthtime !== "string") || identity.key !== expectedCreationIdentity.key || identity.canonicalPath !== expectedCreationIdentity.canonicalPath || identity.birthtime !== expectedCreationIdentity.birthtime) throw new Error("Agent creation no longer owns its originally observed target");
		}
		if (!existing) return createAgentDatabaseExecution(options, {
			agentId,
			pathname,
			identity,
			initialIdentity: constraints.expectedIdentity,
			expectedCreationIdentity
		});
	}
	if (existing.agentId !== agentId) throw new Error(`OpenClaw agent database ${pathname} is already open for agent ${existing.agentId}; requested agent ${agentId}.`);
	const env = process.platform === "win32" ? cloneEnvWithPlatformSemantics(options.env ?? process.env) : options.env;
	const state = captureOpenClawStateReadContext(resolveOpenClawStateSqlitePath(env));
	if (existing.sharedDatabaseKey !== state.admission.identity.key) throw new Error("Agent database execution belongs to another shared-state database; drain its existing resources before changing the state directory.");
	return existing.borrow(pathname, constraints.expectedIdentity, expectedCreationIdentity);
}
function createAgentDatabaseExecution(options, prepared) {
	const { agentId, pathname, identity, initialIdentity, expectedCreationIdentity } = prepared;
	const context = captureOpenClawStateWorkerContext({ env: options.env });
	const executionOptions = {
		agentId,
		path: pathname,
		env: context.environment
	};
	const aliases = /* @__PURE__ */ new Map();
	const assertAgentAdmitted = captureAgentDatabaseAdmission(agentId, { env: context.environment });
	let retired = false;
	let revoked = false;
	let borrowers = 0;
	let creationReference;
	let generation;
	let fileIdentity;
	let nativeClosing;
	let cleanupFailure;
	let closing;
	let unregisterShared;
	let idleTimer;
	let idleDrainListener;
	const clearIdleTimer = () => {
		idleDrainListener?.[Symbol.dispose]();
		idleDrainListener = void 0;
		clearTimeout(idleTimer);
		idleTimer = void 0;
	};
	const reportCleanupFailure = (error) => {
		try {
			log.warn(`Agent database idle cleanup failed: ${formatErrorMessage(error)}`);
		} catch {}
	};
	const finishRetirement = () => {
		retired = true;
		if (executions.get(pathname) !== owner) return;
		unregisterAgent();
		unregisterShared?.();
	};
	const assertCurrent = () => {
		if (retired || executions.get(pathname) !== owner || !supportsAgentDatabaseExecutionScope(executionOptions)) throw new Error("Agent database execution admission is closed");
		context.admission.assertCurrent();
		assertAgentAdmitted();
	};
	const closeNative = (expected) => {
		if (expected && generation !== expected) return Promise.resolve();
		clearIdleTimer();
		if (nativeClosing) return nativeClosing;
		const captured = generation;
		if (!captured) return Promise.resolve();
		const result = captured.close().then(() => {
			if (generation === captured) {
				generation = void 0;
				cleanupFailure = void 0;
				if (executionState.idle === owner) executionState.idle = void 0;
			}
		}, (error) => {
			cleanupFailure = { error };
			throw error;
		});
		nativeClosing = result;
		result.finally(() => {
			if (nativeClosing === result) nativeClosing = void 0;
		}).catch(() => void 0);
		return result;
	};
	async function run(source, operation, assertCallerCurrent, expectedIdentity, retireNativeOnFailure = false, createIfMissing = false, creatingTarget, signal) {
		const pending = cache.pending.get(pathname);
		if (pending) {
			if (creatingTarget && !fileIdentity) throw new Error("Agent creation cannot adopt another pending opener");
			if (pending.agentId !== agentId) throw new Error(`Agent database ${pathname} is opening for ${pending.agentId}`);
			await pending.promise;
			pending.controller.signal.throwIfAborted();
			assertCallerCurrent();
		}
		if (nativeClosing) {
			await nativeClosing;
			assertCallerCurrent();
		}
		if (cleanupFailure) {
			await closeNative();
			assertCurrent();
			source.assertCurrent();
			assertCallerCurrent();
		}
		if (!generation) {
			for (let idle = executionState.idle; idle && idle !== owner; idle = executionState.idle) {
				await idle.closeIdle();
				assertCurrent();
				source.assertCurrent();
				assertCallerCurrent();
			}
			if (!generation) {
				const created = createAgentDatabaseNativeGeneration(agentId, identity.canonicalPath, context, assertCurrent, () => {
					if (executions.get(pathname) !== owner || generation !== created || !nativeClosing) throw new Error("Agent cleanup no longer owns its original execution reference");
				}, expectedIdentity ?? fileIdentity, (received) => {
					if (fileIdentity && (fileIdentity.physicalIdentity !== received.physicalIdentity || fileIdentity.birthtime !== received.birthtime)) throw new Error("Agent database execution belongs to another physical file");
					fileIdentity ??= Object.freeze({ ...received });
				}, fileIdentity ? void 0 : creatingTarget);
				generation = created;
			}
		}
		const current = generation;
		try {
			const result = await current.run(source, operation, assertCallerCurrent, createIfMissing, signal);
			if (generation === current && current.failed()) try {
				await owner.close();
			} catch (error) {
				reportCleanupFailure(error);
			}
			return result;
		} catch (error) {
			const nativeFailed = current.failed();
			if (generation === current && (nativeFailed || retireNativeOnFailure)) try {
				if (nativeFailed) await owner.close();
				else await closeNative(current);
			} catch (cleanupError) {
				throw retainSqliteWorkerErrorCode(new AggregateError([error, cleanupError], "Agent operation and cleanup failed", { cause: error }), error);
			}
			throw error;
		}
	}
	const owner = {
		agentId,
		get sharedDatabaseKey() {
			return context.admission.identity.key;
		},
		assertCurrent,
		borrow(borrowedPath, expected, creating) {
			const expectedIdentity = expected ? Object.freeze({ ...expected }) : void 0;
			const creatingTarget = creating ? Object.freeze({ ...creating }) : void 0;
			const assertReferenceCurrent = (nativeIdentity) => {
				assertCurrent();
				if (!fileIdentity || creatingTarget) {
					const current = readDatabasePathIdentitySync(borrowedPath);
					if (current.canonicalPath !== identity.canonicalPath || creatingTarget?.key.startsWith("file:") && (current.key !== creatingTarget.key || current.birthtime !== creatingTarget.birthtime)) throw new Error("Agent database borrower changed its originally observed target");
				}
				if (fileIdentity && expectedIdentity && (fileIdentity.physicalIdentity !== expectedIdentity.physicalIdentity || fileIdentity.birthtime !== void 0 && expectedIdentity.birthtime !== void 0 && fileIdentity.birthtime !== expectedIdentity.birthtime)) throw new Error("Agent database borrower belongs to another physical file");
				const file = fileIdentity ?? expectedIdentity;
				const birthtime = fileIdentity?.birthtime ?? expectedIdentity?.birthtime;
				if (file) {
					if (nativeIdentity && (nativeIdentity.physicalIdentity !== file.physicalIdentity || birthtime !== void 0 && nativeIdentity.birthtime !== birthtime)) throw new Error("Agent database borrower belongs to another physical file");
					if (!nativeIdentity || borrowedPath !== nativeIdentity.nativeLocation) assertExistingDatabaseIdentity(borrowedPath, `file:${file.physicalIdentity}`, birthtime);
				}
			};
			assertReferenceCurrent();
			if (creatingTarget && !fileIdentity && generation) throw new Error("Agent creation cannot capture another pending native opener");
			retainAlias(borrowedPath);
			observeOpenClawDatabaseMaintenanceResource(aliases.get(pathname));
			borrowers += 1;
			clearIdleTimer();
			if (executionState.idle === owner && !nativeClosing && !cleanupFailure) executionState.idle = void 0;
			const reference = {};
			if (creatingTarget && !fileIdentity) creationReference ??= reference;
			const assertCreationReference = (create) => {
				if (creatingTarget && !fileIdentity && !create) throw new Error("Originally observed agent target requires creating admission first");
				if (creationReference && !fileIdentity && (!create || creationReference !== reference)) throw new Error("Originally observed agent target requires its captured creating reference");
			};
			let released = false;
			let release;
			const pending = /* @__PURE__ */ new Set();
			const assertBorrowed = () => {
				if (released) throw new Error("Agent database execution reference is released");
				assertReferenceCurrent();
			};
			return {
				agentId,
				path: borrowedPath,
				get fileIdentity() {
					assertBorrowed();
					return fileIdentity;
				},
				assertCurrent: assertBorrowed,
				captureGenerationClaim() {
					assertBorrowed();
					const captured = generation;
					if (!captured) throw new Error("Agent database execution has no admitted generation");
					const claim = captured.captureClaim();
					return {
						identity: claim.identity,
						incarnation: claim.incarnation,
						assertCurrent() {
							assertBorrowed();
							if (generation !== captured) throw new Error("Agent database execution generation was replaced");
							claim.assertCurrent();
						}
					};
				},
				async prepare(source, signal) {
					assertBorrowed();
					assertCreationReference(true);
					const result = run(source, async () => void 0, (nativeIdentity) => {
						assertReferenceCurrent(nativeIdentity);
						assertCreationReference(true);
					}, expectedIdentity, false, true, creatingTarget, signal);
					pending.add(result);
					result.finally(() => pending.delete(result)).catch(() => void 0);
					await result;
				},
				async runExisting(source, operation, runOptions) {
					assertBorrowed();
					assertCreationReference(false);
					const result = run(source, operation, (nativeIdentity) => {
						assertReferenceCurrent(nativeIdentity);
						assertCreationReference(false);
					}, expectedIdentity, runOptions?.retireNativeOnFailure);
					pending.add(result);
					result.finally(() => pending.delete(result)).catch(() => void 0);
					return result;
				},
				release() {
					released = true;
					release ??= (async () => {
						await Promise.allSettled(pending);
						if (creationReference === reference && !fileIdentity && !nativeClosing && !cleanupFailure) {
							if (generation) try {
								await closeNative(generation);
							} catch (error) {
								reportCleanupFailure(error);
							}
							if (!generation && !nativeClosing && !cleanupFailure) creationReference = void 0;
						}
						borrowers -= 1;
						if (borrowers !== 0 || retired || cleanupFailure) return;
						const drainSignal = getGatewayRestartDrainSignal();
						if (generation && !nativeClosing && !executionState.idle && !drainSignal.aborted) {
							executionState.idle = owner;
							const timer = runInExecutionOwnerContext(() => setTimeout(() => {
								if (idleTimer !== timer || executionState.idle !== owner) return;
								owner.closeIdle().catch(reportCleanupFailure);
							}, SQLITE_IDLE_HANDLE_TTL_MS));
							idleTimer = timer;
							timer.unref();
							idleDrainListener = addAbortListener(drainSignal, () => {
								runInExecutionOwnerContext(() => {
									owner.closeIdle().catch(reportCleanupFailure);
								});
							});
							return;
						}
						try {
							await owner.closeIdle();
						} catch (error) {
							reportCleanupFailure(error);
						}
					})();
					return release;
				}
			};
		},
		async closeIdle() {
			await closeNative();
			if (borrowers === 0 && !generation) finishRetirement();
		},
		close() {
			retired = true;
			closing ??= (async () => {
				await closeNative();
				finishRetirement();
			})().catch((error) => {
				closing = void 0;
				if (!revoked) retired = false;
				throw error;
			});
			return closing;
		}
	};
	const unregisterAgent = () => {
		for (const [alias, unregister] of aliases) {
			if (executions.get(alias) === owner) executions.delete(alias);
			unregister();
		}
		aliases.clear();
	};
	const retainAlias = (alias) => {
		if (aliases.has(alias)) return;
		const register = () => registerOpenClawAgentDatabaseAsyncResource({
			agentId,
			path: alias,
			revoke() {
				revoked = true;
				retired = true;
				clearIdleTimer();
			},
			close: () => owner.close()
		});
		const unregister = aliases.size === 0 ? register() : runOutsideOpenClawDatabaseMaintenanceScope(register);
		aliases.set(alias, unregister);
		executions.set(alias, owner);
	};
	try {
		retainAlias(pathname);
		retainAlias(identity.canonicalPath);
		unregisterShared = registerOpenClawStateDatabaseAsyncResource({ close: async (sharedIdentity) => {
			if (!sharedIdentity || sharedIdentity.key === context.admission.identity.key) await owner.close();
		} });
		return owner.borrow(pathname, initialIdentity, expectedCreationIdentity);
	} catch (error) {
		unregisterAgent();
		unregisterShared?.();
		throw error;
	}
}
//#endregion
export { supportsOpenClawAgentDatabaseExecution as n, captureOpenClawAgentDatabaseExecution as t };
