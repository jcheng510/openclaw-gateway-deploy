import { d as toStringifiedError } from "./error-coercion-1P2One0X.mjs";
import { t as createDeferredCore } from "./deferred-D0La5CRk.mjs";
import { i as resolveGlobalSingleton } from "./global-singleton-BfHBYj6Y.mjs";
import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { r as resolveStateDir } from "./state-dir-CfAW6S2K.mjs";
import "./paths-CtO6iw0c.mjs";
import { o as sqliteReaderDatabasePathKey } from "./sqlite-reader-lifecycle-B0eu7rNH.mjs";
import { t as createSubsystemLogger } from "./subsystem-CeqVSEVi.mjs";
import { f as publishSqliteWalCheckpointObservation } from "./sqlite-wal-fdekKFS3.mjs";
import { s as resolveOpenClawStateSqlitePath } from "./openclaw-state-db.paths-rJI64Ab5.mjs";
import { n as runtimeProcessEntrypoints } from "./runtime-process-entrypoints-CbWx0yUe.mjs";
import { n as resolveRuntimeWorkerThreadExecArgv, r as resolveRuntimeWorkerUrl } from "./runtime-worker-url-S0NIVxUR.mjs";
import { t as KeyedAsyncQueue } from "./keyed-async-queue-CTreGrmR.mjs";
import { _ as registerOpenClawStateDatabaseAsyncResource, m as publishOpenClawStateDatabaseWorkerAdmission, n as captureOpenClawStateDatabaseReadAdmission } from "./openclaw-state-db-cache-IAib4pqp.mjs";
import { i as getOpenClawAgentDatabaseValidation, t as adoptOpenClawAgentDatabaseValidation } from "./openclaw-agent-db-validation-cache-C348cqkT.mjs";
import { n as normalizeAgentId } from "./agent-id-D1-Q6vR4.mjs";
import { o as registerOpenClawAgentDatabaseAsyncResource } from "./openclaw-agent-db-resources-DZhhXFbz.mjs";
import { t as SQLITE_IDLE_HANDLE_TTL_MS } from "./sqlite-handle-lifecycle-dWd9h3ii.mjs";
import { n as createCpuTrackedWorker } from "./worker-cpu-BnVPAXBa.mjs";
import { r as captureOpenClawStateWorkerContext } from "./openclaw-state-worker-context-C_iAE7YK.mjs";
import { c as resolveOpenClawAgentSqlitePath } from "./openclaw-agent-db.paths-Dv3PPTNK.mjs";
import "./openclaw-agent-db-lifecycle-CCXA1nI8.mjs";
import { n as runOpenClawAgentWorkerWrite } from "./openclaw-agent-write-admission-CDwQO6YZ.mjs";
import { t as cleanupRetiredAgentDatabaseLease } from "./openclaw-agent-execution-cleanup-B0nkwPFH.mjs";
import { a as observeSqliteMutationWorkerEnd, o as sqliteMutationWorkerThreadId, r as withSqliteMutationWorkerCoordination, s as terminateSqliteMutationWorker } from "./session-accessor.sqlite-worker-coordination-DVYX6ljS.mjs";
import { n as sqliteSessionStateDeleteSnapshotsEqual } from "./session-accessor.sqlite-delete-snapshot-DuECdJEB.mjs";
import { r as revokeSqliteReclamationCommit } from "./session-accessor.sqlite-reclamation-commit-BW3XgI4j.mjs";
import { n as logSqliteReclamationWorkerOutcome, r as logSqliteReclamationWorkerRetirement } from "./session-accessor.sqlite-reclamation-worker-diagnostics-CO1DPtzp.mjs";
import { n as startCanonicalValidationTask, t as captureCanonicalValidationWorkerPool } from "./session-accessor.sqlite-canonical-worker-pool-CemicOGz.mjs";
import { statSync } from "node:fs";
import path from "node:path";
import { AsyncLocalStorage } from "node:async_hooks";
import { isDeepStrictEqual } from "node:util";
import { isMainThread, threadId } from "node:worker_threads";
import { channel } from "node:diagnostics_channel";
import { performance } from "node:perf_hooks";
//#region src/config/sessions/session-accessor.sqlite-archive-session.ts
const sessions = resolveGlobalSingleton(Symbol.for("openclaw.sqliteArchiveSessions"), () => ({ context: new AsyncLocalStorage() }));
/** Reuse only execution; each archive request still closes its read-only and file handles. */
async function withSqliteTranscriptArchiveSession(options, run) {
	const current = sessions.context.getStore();
	if (current?.matches(options)) {
		current.assertCurrent();
		return run();
	}
	const session = new ArchiveSession(options);
	try {
		return await sessions.context.run(session, run);
	} finally {
		await session.close();
	}
}
/** Queue selection stays with the existing archive owner, including unscoped/cold requests. */
function runScopedSqliteArchiveOperation(request, createWorker, enqueue) {
	const session = sessions.context.getStore();
	return session ? enqueue(() => session.run(request, createWorker)) : void 0;
}
var ArchiveSession = class {
	constructor(options) {
		this.revoked = false;
		this.operationId = 0;
		const env = { ...options.env ?? process.env };
		env.OPENCLAW_STATE_DIR = resolveStateDir(env);
		this.options = {
			agentId: normalizeAgentId(options.agentId),
			env: { OPENCLAW_STATE_DIR: env.OPENCLAW_STATE_DIR },
			path: resolveOpenClawAgentSqlitePath({
				...options,
				env
			})
		};
		this.state = captureOpenClawStateDatabaseReadAdmission(options.database?.path ?? resolveOpenClawStateSqlitePath(env));
		this.unregisterAgent = registerOpenClawAgentDatabaseAsyncResource({
			agentId: this.options.agentId,
			path: this.options.path,
			revoke: () => {
				this.revoked = true;
			},
			close: () => this.close()
		});
		try {
			this.unregisterState = registerOpenClawStateDatabaseAsyncResource({ close: async (identity) => {
				if (!identity || identity.key === this.state.identity.key) await this.close();
			} });
		} catch (error) {
			this.unregisterAgent();
			throw error;
		}
	}
	matches(options) {
		return !this.revoked && this.options.agentId === normalizeAgentId(options.agentId) && this.options.path === resolveOpenClawAgentSqlitePath(options) && this.state.databasePath === path.resolve(options.database?.path ?? resolveOpenClawStateSqlitePath(options.env));
	}
	assertCurrent() {
		if (this.revoked) throw new Error("SQLite archive session was revoked");
		this.state.assertCurrent();
	}
	async run(request, createWorker) {
		this.assertCurrent();
		if (request.plans.some((plan) => normalizeAgentId(plan.agentId) !== this.options.agentId || path.resolve(plan.databasePath) !== this.options.path)) throw new Error("SQLite archive request changed its captured database owner");
		if (sessions.warm && sessions.warm !== this) await sessions.warm.retire();
		this.assertCurrent();
		await this.connection?.retiring;
		this.assertCurrent();
		const connection = this.connection ??= this.start(createWorker);
		sessions.warm = this;
		const operationId = ++this.operationId;
		const dispatched = new Promise((resolve, reject) => {
			const cleanup = () => {
				connection.worker.off("message", receive);
				connection.worker.off("exit", exit);
			};
			const receive = (response) => {
				const expectedType = request.operation === "materialize" ? "done" : request.operation === "publish" ? "published" : request.operation === "read-page" ? "page-read" : "final-read";
				if (!isRecord(response) || response.type !== expectedType || response.operationId !== operationId || response.settled !== true || !Array.isArray(response.results)) {
					connection.failure = /* @__PURE__ */ new Error("SQLite archive Worker returned an invalid operation result");
					connection.worker.terminate();
					return;
				}
				cleanup();
				resolve(response);
			};
			const exit = () => {
				cleanup();
				reject(connection.failure ?? /* @__PURE__ */ new Error("SQLite archive Worker exited before operation settlement"));
			};
			connection.worker.on("message", receive);
			connection.worker.once("exit", exit);
			try {
				this.assertCurrent();
				if (connection.failure || connection.didExit) throw connection.failure ?? /* @__PURE__ */ new Error("SQLite archive Worker has exited");
				connection.worker.postMessage({
					...request,
					type: "archive-operation",
					operationId
				}, []);
			} catch (error) {
				cleanup();
				reject(toStringifiedError(error));
			}
		});
		this.dispatched = dispatched;
		let result;
		try {
			result = await dispatched;
		} catch (error) {
			await this.retire();
			throw error;
		} finally {
			if (this.dispatched === dispatched) this.dispatched = void 0;
		}
		if (result.type === "published" && result.results.some((entry) => entry.error !== void 0)) await this.retire();
		this.assertCurrent();
		return result;
	}
	start(createWorker) {
		this.operationId = 0;
		const worker = createWorker({
			type: "sqlite-transcript-archive-v2",
			operation: "archive-session",
			env: this.options.env
		});
		const connection = {
			worker,
			didExit: false,
			exited: Promise.resolve()
		};
		worker.on("error", (error) => {
			connection.failure ??= toStringifiedError(error);
		});
		worker.on("messageerror", (error) => {
			connection.failure ??= toStringifiedError(error);
			worker.terminate();
		});
		connection.exited = new Promise((resolve) => {
			worker.once("exit", (code) => {
				connection.didExit = true;
				if (code !== 0) connection.failure ??= /* @__PURE__ */ new Error(`SQLite archive Worker exited with code ${code}`);
				resolve();
			});
		});
		return connection;
	}
	retire() {
		const connection = this.connection;
		if (!connection) return Promise.resolve();
		return connection.retiring ??= (async () => {
			await this.dispatched?.catch(() => {});
			if (!connection.didExit) try {
				connection.worker.postMessage({ type: "close" }, []);
			} catch {
				await connection.worker.terminate();
			}
			await connection.exited;
			connection.worker.removeAllListeners();
			if (this.connection === connection) this.connection = void 0;
			if (sessions.warm === this) sessions.warm = void 0;
		})();
	}
	async close() {
		this.revoked = true;
		await this.retire();
		this.unregisterAgent();
		this.unregisterState();
	}
};
//#endregion
//#region src/config/sessions/session-accessor.sqlite-worker-request.ts
/** Register before the first await and drain through the parent's retained claim release. */
function withSqliteMutationWorkerLifetime(options, run) {
	const completion = createDeferredCore();
	const state = captureOpenClawStateDatabaseReadAdmission(resolveOpenClawStateSqlitePath(options.env));
	const commitGate = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT);
	const controller = new AbortController();
	const revoke = () => {
		revokeSqliteReclamationCommit(commitGate);
		controller.abort(/* @__PURE__ */ new Error("SQLite mutation Worker request was revoked"));
	};
	const assertCurrent = () => {
		controller.signal.throwIfAborted();
		state.assertCurrent();
	};
	const unregisterAgent = registerOpenClawAgentDatabaseAsyncResource({
		agentId: options.agentId,
		path: options.path,
		revoke,
		close: () => completion.promise
	});
	let unregisterState;
	try {
		unregisterState = registerOpenClawStateDatabaseAsyncResource({ close: async (identity) => {
			if (!identity || identity.key === state.identity.key) {
				revoke();
				await completion.promise;
			}
		} });
	} catch (error) {
		unregisterAgent();
		throw error;
	}
	return Promise.resolve().then(() => {
		assertCurrent();
		return run({
			assertCurrent,
			commitGate,
			signal: controller.signal
		});
	}).finally(() => {
		revoke();
		completion.resolve();
		unregisterAgent();
		unregisterState();
	});
}
/** Transport settlement is separate from the caller's refused authority. */
var SqliteMutationWorkerSettledRefusal = class extends Error {
	constructor(cause) {
		super(cause.message, { cause });
	}
};
/** Share request authority, not connection lifetime: cold mutations join exit; sweeps join each result. */
function runSqliteMutationWorkerRequest(params) {
	const { transport, operationId } = params;
	const worker = transport.channel;
	return new Promise((resolve, reject) => {
		const runInOperationContext = AsyncLocalStorage.snapshot();
		let result;
		let validation;
		let workerError;
		let transportError;
		let admission;
		let admissionId = 0;
		let completed = false;
		let settledRefusal = false;
		const admissionTasks = [];
		const terminate = () => {
			terminateSqliteMutationWorker(transport).catch((failure) => {
				workerError = new AggregateError([workerError ?? transportError, failure].filter((error) => error !== void 0), "SQLite mutation Worker termination failed", { cause: failure });
			});
		};
		const fail = (error) => {
			workerError ??= toStringifiedError(error);
			terminate();
		};
		const error = (failure) => runInOperationContext(() => {
			transportError ??= toStringifiedError(failure);
		});
		const messageError = (failure) => runInOperationContext(() => {
			error(failure);
			terminate();
		});
		const finish = (code) => {
			if (completed) return;
			completed = true;
			if (admission) {
				admission.diagnostics.releaseCause = code === void 0 ? "worker-release" : "worker-exit";
				admission.released.resolve();
			}
			worker.off("message", receive);
			stopObservingEnd();
			worker.off("error", error);
			worker.off("messageerror", messageError);
			Promise.all(admissionTasks).then(() => {
				const failure = workerError ?? transportError ?? params.getFailure?.();
				if (failure) reject(settledRefusal ? new SqliteMutationWorkerSettledRefusal(failure) : failure);
				else if (code !== void 0 && code !== 0) reject(/* @__PURE__ */ new Error(`SQLite transcript archive worker exited with code ${code}`));
				else if (result === void 0) reject(/* @__PURE__ */ new Error("SQLite session reclamation Worker exited without results"));
				else {
					if (validation && params.validationOwner?.isCurrent()) adoptOpenClawAgentDatabaseValidation(params.validationOwner.database, validation);
					resolve(result);
				}
			}).catch(reject);
		};
		const ended = (ending) => runInOperationContext(() => {
			if (ending.kind === "native-exit") {
				params.onExit?.(ending.code);
				finish(ending.code);
			} else {
				if (ending.kind === "task-failed") transportError ??= ending.error;
				finish();
			}
		});
		const receiveInOperationContext = (message) => {
			if (message.operationId !== operationId) return;
			if (message.type === "commit-request") try {
				params.onCommitRequest();
			} catch (failure) {
				workerError ??= toStringifiedError(failure);
			}
			else if (message.type === "admission-request") {
				if (admission || message.admissionId !== admissionId + 1) {
					fail(/* @__PURE__ */ new Error("SQLite reclamation Worker requested invalid write admission; cleanup is uncertain, restart OpenClaw before deleting the owning agent"));
					return;
				}
				const requested = {
					id: ++admissionId,
					released: createDeferredCore(),
					diagnostics: { admissionId }
				};
				admission = requested;
				const task = params.withWriteAdmission(async (refusal, maintenanceProtection) => {
					if (completed) return;
					if (refusal) workerError ??= toStringifiedError(refusal.error);
					const allowed = refusal === void 0 && workerError === void 0;
					worker.postMessage({
						type: "admission",
						operationId,
						admissionId: requested.id,
						allowed,
						maintenanceProtection,
						validation: allowed && params.validationOwner?.isCurrent() ? getOpenClawAgentDatabaseValidation(params.validationOwner.database) : void 0
					}, []);
					await requested.released.promise;
					return completed && !workerError && !transportError && !params.getFailure?.() ? result : void 0;
				}, requested.diagnostics).catch(async (failure) => {
					workerError ??= toStringifiedError(failure);
					if (!completed && admission === requested) try {
						worker.postMessage({
							type: "admission",
							operationId,
							admissionId: requested.id,
							allowed: false
						}, []);
					} catch (dispatchError) {
						fail(new AggregateError([workerError, dispatchError], "SQLite reclamation admission failed and Worker cleanup is uncertain; restart OpenClaw before deleting the owning agent"));
					}
					await requested.released.promise;
				});
				admissionTasks.push(task);
			} else if (message.type === "admission-release") {
				if (!admission || message.admissionId !== admission.id) {
					fail(/* @__PURE__ */ new Error("SQLite reclamation Worker released invalid write admission; cleanup is uncertain, restart OpenClaw before deleting the owning agent"));
					return;
				}
				const released = admission;
				admission = void 0;
				released.diagnostics.releaseCause = "worker-release";
				released.released.resolve();
			} else if (message.type === "refused") {
				if (!message.settled || params.completion !== "result") {
					fail(/* @__PURE__ */ new Error("SQLite reclamation Worker omitted refusal settlement"));
					return;
				}
				settledRefusal = true;
				workerError ??= /* @__PURE__ */ new Error("SQLite reclamation Worker request was refused");
				finish();
			} else if (message.type === "reclaimed") {
				if (!message.settled) {
					fail(/* @__PURE__ */ new Error("SQLite reclamation Worker omitted operation settlement"));
					return;
				}
				result = message.result;
				validation = message.validation;
				if (params.completion === "result") finish();
			}
		};
		const receive = (message) => runInOperationContext(receiveInOperationContext, message);
		worker.on("message", receive);
		const stopObservingEnd = observeSqliteMutationWorkerEnd(transport, ended);
		worker.once("error", error);
		worker.once("messageerror", messageError);
		try {
			params.dispatch?.();
		} catch (failure) {
			fail(failure);
		}
	});
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-archive.ts
function createSqliteTranscriptArchiveWorker(workerData) {
	const workerUrl = resolveRuntimeWorkerUrl(runtimeProcessEntrypoints.sessionTranscriptArchive);
	return createCpuTrackedWorker(workerUrl, {
		resourceLimits: { maxOldGenerationSizeMb: 512 },
		workerData,
		execArgv: resolveRuntimeWorkerThreadExecArgv(workerUrl)
	});
}
function spawnSqliteTranscriptArchiveWorkerOperation(input) {
	const params = input.expectedMessageType === "reclaimed" ? {
		...input,
		stateContext: captureOpenClawStateWorkerContext({ env: input.workerData.plan.databaseOptions.env })
	} : input;
	let worker;
	try {
		worker = createSqliteTranscriptArchiveWorker(params.workerData);
	} catch (error) {
		return Promise.reject(toStringifiedError(error));
	}
	if (params.expectedMessageType === "reclaimed") {
		const startedAt = performance.now();
		const workerThreadId = worker.threadId;
		let exitCode;
		if (params.diagnostics) params.diagnostics.workerThreadId = workerThreadId;
		const operation = withSqliteMutationWorkerCoordination(params.stateContext, {
			kind: "dedicated",
			channel: worker
		}, 0, (coordination) => runSqliteMutationWorkerRequest({
			transport: {
				kind: "dedicated",
				channel: worker
			},
			operationId: 0,
			completion: "exit",
			onCommitRequest: params.onCommitRequest,
			withWriteAdmission: params.withWriteAdmission,
			validationOwner: params.validationOwner,
			onExit: (code) => {
				exitCode = code;
			},
			dispatch: () => worker.postMessage({
				type: "mutate",
				coordination
			}, [])
		})).then((result) => [result]);
		const observe = (outcome) => {
			const elapsedMs = Math.round(performance.now() - startedAt);
			if (elapsedMs >= 1e3) createSubsystemLogger("session-sqlite").warn("slow SQLite reclamation Worker operation", {
				pid: process.pid,
				threadId,
				isMainThread,
				workerThreadId,
				reclamationKind: params.diagnostics?.kind ?? params.workerData.plan.kind,
				elapsedMs,
				outcome,
				exitCode
			});
		};
		operation.then(() => observe("resolved"), () => observe("rejected")).catch(() => {});
		return operation;
	}
	return new Promise((resolve, reject) => {
		let results;
		let workerError;
		worker.on("message", (message) => {
			if (message.type === params.expectedMessageType) (results ??= []).push(...message.results);
		});
		worker.once("error", (error) => {
			workerError ??= toStringifiedError(error);
		});
		worker.once("exit", (code) => {
			worker.removeAllListeners();
			if (workerError) {
				reject(workerError);
				return;
			}
			if (code !== 0) {
				reject(/* @__PURE__ */ new Error(`SQLite transcript archive worker exited with code ${code}`));
				return;
			}
			if (!results) {
				reject(/* @__PURE__ */ new Error("SQLite transcript archive worker exited without results"));
				return;
			}
			resolve(results);
		});
	});
}
const sqliteTranscriptArchiveWorkerQueue = resolveGlobalSingleton(Symbol.for("openclaw.sqliteTranscriptArchiveWorkerQueue"), () => new KeyedAsyncQueue());
const SQLITE_TRANSCRIPT_ARCHIVE_WORKER_QUEUE_KEY = "lifecycle-archive";
function runExclusiveSqliteTranscriptArchiveWorker(run, signal) {
	if (!signal) return sqliteTranscriptArchiveWorkerQueue.enqueue(SQLITE_TRANSCRIPT_ARCHIVE_WORKER_QUEUE_KEY, run);
	return new Promise((resolve, reject) => {
		let pending = run;
		const cancel = () => {
			pending = void 0;
			reject(toStringifiedError(signal.reason));
		};
		if (signal.aborted) {
			cancel();
			return;
		}
		signal.addEventListener("abort", cancel, { once: true });
		sqliteTranscriptArchiveWorkerQueue.enqueue(SQLITE_TRANSCRIPT_ARCHIVE_WORKER_QUEUE_KEY, () => {
			signal.removeEventListener("abort", cancel);
			const admitted = pending;
			pending = void 0;
			if (!admitted) throw toStringifiedError(signal.reason);
			return admitted();
		}).then(resolve, reject);
	});
}
function runSqliteTranscriptArchiveWorkerOperation(params) {
	return runExclusiveSqliteTranscriptArchiveWorker(() => {
		params.assertCurrent?.();
		return spawnSqliteTranscriptArchiveWorkerOperation(params);
	}, params.signal);
}
function runSqliteTranscriptArchiveWorker(plans) {
	const scoped = runScopedSqliteArchiveOperation({
		operation: "materialize",
		plans
	}, createSqliteTranscriptArchiveWorker, runExclusiveSqliteTranscriptArchiveWorker);
	if (scoped) return scoped.then((result) => {
		if (result.type !== "done") throw new Error("SQLite archive Worker returned another operation's result");
		return result.results;
	});
	return runSqliteTranscriptArchiveWorkerOperation({
		expectedMessageType: "done",
		workerData: {
			operation: "materialize",
			type: "sqlite-transcript-archive-v2",
			plans
		}
	});
}
function runSqliteTranscriptArchivePublishWorker(plans, signal) {
	const scoped = runScopedSqliteArchiveOperation({
		operation: "publish",
		plans
	}, createSqliteTranscriptArchiveWorker, (run) => runExclusiveSqliteTranscriptArchiveWorker(run, signal));
	if (scoped) return scoped.then((result) => {
		if (result.type !== "published") throw new Error("SQLite archive Worker returned another operation's result");
		return result.results;
	});
	return runSqliteTranscriptArchiveWorkerOperation({
		signal,
		expectedMessageType: "published",
		workerData: {
			operation: "publish",
			type: "sqlite-transcript-archive-v2",
			plans
		}
	});
}
/** Probe pending publication without creating a writable database or archive schema. */
async function readPendingSqliteTranscriptArchivesInWorker(plan, signal) {
	signal.throwIfAborted();
	const { withSessionHistoryWorkerDatabase } = await import("./session-transcript-worker-runtime-B29SjUk6.mjs");
	signal.throwIfAborted();
	return withSessionHistoryWorkerDatabase({
		agentId: plan.agentId,
		path: plan.databasePath,
		env: plan.env
	}, (reader) => reader.readPendingArchives({ env: plan.env }, signal));
}
async function runSqliteTranscriptArchiveReadWorker(plans) {
	const scoped = runScopedSqliteArchiveOperation({
		operation: "read-final",
		plans
	}, createSqliteTranscriptArchiveWorker, runExclusiveSqliteTranscriptArchiveWorker);
	if (!scoped) throw new Error("SQLite archive reads require their captured database scope");
	const result = await scoped;
	if (result.type !== "final-read") throw new Error("SQLite archive Worker returned another operation's result");
	return result.results;
}
async function runSqliteTranscriptArchivePageWorker(plans) {
	const scoped = runScopedSqliteArchiveOperation({
		operation: "read-page",
		plans
	}, createSqliteTranscriptArchiveWorker, runExclusiveSqliteTranscriptArchiveWorker);
	if (!scoped) throw new Error("SQLite archive reads require their captured database scope");
	const result = await scoped;
	if (result.type !== "page-read") throw new Error("SQLite archive Worker returned another operation's result");
	return result.results;
}
async function materializeSessionStateDeletePlans(plans) {
	const deduped = dedupeSqliteSessionStateDeletePlans(plans);
	const workerPlans = deduped.filter((plan) => plan.archiveTranscript);
	const workerResults = workerPlans.length > 0 ? await runSqliteTranscriptArchiveWorker(workerPlans) : [];
	const resultBySessionId = new Map(workerResults.map((result) => [result.sessionId, result]));
	return deduped.map((plan) => {
		if (!plan.archiveTranscript) return Object.assign({}, plan, {
			archive: null,
			archivedTranscript: null
		});
		const result = resultBySessionId.get(plan.sessionId);
		if (!result) throw new Error(`SQLite transcript archive worker omitted ${plan.sessionId}`);
		const generation = plan.snapshot.generation;
		if (result.archive && !generation) throw new Error(`Cannot archive SQLite transcript without a generation for ${plan.sessionId}`);
		const archivedTranscript = result.archive && generation ? {
			generation,
			sessionId: plan.sessionId,
			archivedPath: path.join(plan.archiveDirectory, result.archive.archiveName),
			sourcePath: path.join(plan.archiveDirectory, `${plan.sessionId}.jsonl`)
		} : null;
		return Object.assign({}, plan, {
			archive: result.archive,
			archivedTranscript
		});
	});
}
function dedupeSqliteSessionStateDeletePlans(plans) {
	const deduped = /* @__PURE__ */ new Map();
	for (const plan of plans) {
		const existing = deduped.get(plan.sessionId);
		if (!existing) {
			deduped.set(plan.sessionId, plan);
			continue;
		}
		if (existing.agentId !== plan.agentId || existing.archiveDirectory !== plan.archiveDirectory || existing.databasePath !== plan.databasePath || existing.reason !== plan.reason || !sqliteSessionStateDeleteSnapshotsEqual(existing.snapshot, plan.snapshot)) throw new Error(`Conflicting SQLite transcript archive plans for ${plan.sessionId}`);
		if (!existing.archiveTranscript && plan.archiveTranscript) deduped.set(plan.sessionId, {
			...existing,
			archiveTranscript: true
		});
	}
	return [...deduped.values()];
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-reclamation-worker.ts
const log = createSubsystemLogger("session-sqlite");
const retained = resolveGlobalSingleton(Symbol.for("openclaw.sessionReclamationWorkers"), () => /* @__PURE__ */ new Map());
/** The global archive FIFO bounds ordinary reclamation's whole-buffer heaps. */
function withSqliteReclamationWorker(options, claim, run, assertRequestCurrent, signal) {
	return runExclusiveSqliteTranscriptArchiveWorker(() => {
		const key = sqliteReaderDatabasePathKey(options.path);
		return useReclamationWorker({
			worker: retained.get(key),
			retain: (worker) => retained.set(key, worker),
			retire: (worker) => {
				if (retained.get(key) === worker) retained.delete(key);
			}
		}, options, claim, run, assertRequestCurrent);
	}, signal);
}
/** Startup bounds these scopes; each keeps one worker through certification and native close. */
async function withSqliteCanonicalValidationWorker(run) {
	const slot = { execution: captureCanonicalValidationWorkerPool() };
	const queue = new KeyedAsyncQueue();
	let closed = false;
	try {
		return await run((options, claim, consume, assertCurrent) => queue.enqueue("canonical-validation", () => {
			if (closed) throw new Error("Canonical validation Worker scope is closed");
			return useReclamationWorker(slot, options, claim, consume, assertCurrent);
		}));
	} finally {
		closed = true;
		await queue.enqueue("canonical-validation", async () => {
			await slot.worker?.close("exclusive-handoff");
		});
	}
}
async function useReclamationWorker(slot, options, claim, run, assertRequestCurrent) {
	assertRequestCurrent();
	claim.assertCurrent();
	if (slot.worker && !slot.worker.matches(options, claim)) {
		await slot.worker.close("matches-mismatch");
		slot.worker = void 0;
	}
	assertRequestCurrent();
	const worker = slot.worker ??= new SqliteReclamationWorker(options, claim.identity, slot.execution, slot.retire);
	slot.retain?.(worker);
	try {
		return await worker.use(() => run(worker));
	} catch (error) {
		let reusable = false;
		try {
			worker.assertCurrent(options, claim);
			reusable = true;
		} catch {}
		if (reusable) throw error;
		try {
			await worker.close("failure");
			if (slot.worker === worker) slot.worker = void 0;
		} catch (cleanupError) {
			throw new AggregateError([error, cleanupError], "SQLite reclamation and cleanup failed", { cause: cleanupError });
		}
		throw error;
	}
}
/** Retains only the admitted connection; each caller owns its plan, claim and commit gate. */
var SqliteReclamationWorker = class {
	constructor(options, identity, execution, onRetired) {
		this.options = options;
		this.identity = identity;
		this.execution = execution;
		this.onRetired = onRetired;
		this.nativeExitProven = false;
		this.taskCustodyReleased = false;
		this.closeRequested = false;
		this.healthyCloseAcknowledged = false;
		this.closed = createDeferredCore();
		this.revoked = false;
		this.retired = false;
		this.operationId = 0;
		this.createdAt = performance.now();
		this.opsServed = 0;
		this.kind = "unused";
		this.beforeExit = () => {
			this.close().catch((error) => log.error(String(error)));
		};
		this.onIdle = () => {
			this.close("idle-ttl").catch((error) => log.error(String(error)));
		};
		this.onMemoryPressure = () => this.retireIfIdle();
		this.options = structuredClone(options);
		this.stateContext = captureOpenClawStateWorkerContext({ env: options.env });
		this.unregisterAgent = registerOpenClawAgentDatabaseAsyncResource({
			agentId: options.agentId,
			path: options.path,
			revoke: () => this.revoke(),
			close: () => this.close()
		});
		try {
			this.unregisterState = registerOpenClawStateDatabaseAsyncResource({ close: async (closingIdentity) => {
				if (!closingIdentity || closingIdentity.key === this.stateContext.admission.identity.key) await this.close();
			} });
		} catch (error) {
			this.unregisterAgent();
			throw error;
		}
		process.once("beforeExit", this.beforeExit);
	}
	matches(options, claim) {
		return !this.revoked && !this.failure && isDeepStrictEqual(this.options, options) && this.identity === claim.identity && resolveOpenClawStateSqlitePath(options.env) === this.stateContext.admission.databasePath;
	}
	assertCurrent(options, claim) {
		claim.assertCurrent();
		this.stateContext.admission.assertCurrent();
		if (this.failure) throw this.failure;
		if (!this.matches(options, claim)) throw new Error("SQLite session reclamation database owner is no longer current");
		this.assertPathCurrent();
	}
	assertPathCurrent() {
		const file = statSync(this.options.path, { bigint: true });
		if (`${file.dev}:${file.ino}` !== this.identity) throw new Error("SQLite session reclamation database path was replaced");
	}
	async use(run) {
		clearTimeout(this.idle);
		this.transport?.channel.ref();
		const operation = Promise.resolve().then(run);
		this.active = operation;
		try {
			return await operation;
		} finally {
			this.active = void 0;
			if (!this.revoked) {
				this.transport?.channel.unref();
				this.idle = setTimeout(this.onIdle, SQLITE_IDLE_HANDLE_TTL_MS);
				this.idle.unref();
			}
		}
	}
	retireIfIdle() {
		if (this.transport && this.idle && !this.active && !this.revoked) this.close("pressure").catch((error) => log.error(String(error)));
	}
	run(params) {
		return this.runRequest({
			...params,
			databaseOptions: params.plan.databaseOptions,
			kind: params.plan.kind,
			sessionId: params.plan.kind === "entry" ? params.plan.preparedTargetSnapshot[0]?.entry.sessionId : params.plan.kind === "historical-generation" || params.plan.kind === "history-eviction" ? params.plan.sessionId : void 0,
			request: (operationId, coordination) => ({
				type: "reclaim",
				operationId,
				commitGate: params.commitGate,
				plan: params.plan,
				coordination
			})
		});
	}
	runCanonicalValidation(params) {
		return this.runRequest({
			...params,
			kind: "canonical-validation",
			transferList: [],
			request: (operationId, coordination) => ({
				type: "canonical-validation",
				operationId,
				commitGate: params.commitGate,
				databaseOptions: params.databaseOptions,
				maxRows: params.maxRows,
				maxBytes: params.maxBytes,
				initializeCanonicalValidation: params.initializeCanonicalValidation,
				coordination
			})
		});
	}
	async runRequest(params) {
		const startedAt = performance.now();
		this.kind = params.kind;
		this.assertCurrent(params.databaseOptions, params.claim);
		const transport = this.transport ??= await this.start();
		this.assertCurrent(params.databaseOptions, params.claim);
		const worker = transport.channel;
		if (params.diagnostics) params.diagnostics.workerThreadId = this.workerThreadId;
		const operationId = ++this.operationId;
		this.opsServed += 1;
		this.commitGate = params.commitGate;
		let exitCode;
		const operation = withSqliteMutationWorkerCoordination(this.stateContext, transport, operationId, (coordination) => runSqliteMutationWorkerRequest({
			transport,
			operationId,
			completion: "result",
			getFailure: () => this.failure,
			onExit: (code) => {
				exitCode = code;
			},
			onCommitRequest: params.onCommitRequest,
			withWriteAdmission: params.withWriteAdmission,
			validationOwner: params.validationOwner,
			dispatch: () => worker.postMessage(params.request(operationId, coordination), [...params.transferList])
		}).then((value) => ({ value }), (error) => {
			if (error instanceof SqliteMutationWorkerSettledRefusal) return { error: error.cause };
			throw error;
		})).catch((error) => {
			this.failure ??= toStringifiedError(error);
			throw error;
		}).then((outcome) => {
			if ("error" in outcome) throw outcome.error;
			return outcome.value;
		});
		const observeCompletion = (outcome, failure) => logSqliteReclamationWorkerOutcome({
			startedAt,
			outcome,
			failure,
			kind: params.diagnostics?.kind ?? params.kind,
			workerThreadId: this.workerThreadId,
			exitCode,
			sessionId: params.sessionId
		});
		operation.then(() => observeCompletion("resolved"), (error) => observeCompletion("rejected", error)).catch(() => {});
		return operation.finally(() => {
			this.commitGate = void 0;
		});
	}
	async start() {
		const transport = this.execution ? await startCanonicalValidationTask(this.execution, this.options) : {
			kind: "dedicated",
			channel: createSqliteTranscriptArchiveWorker({
				type: "sqlite-transcript-archive-v2",
				operation: "reclaim",
				databaseOptions: this.options
			})
		};
		const worker = transport.channel;
		this.workerThreadId = sqliteMutationWorkerThreadId(transport);
		if (transport.kind === "pooled") this.operationId = transport.initialOperationId;
		worker.on("message", (message) => {
			if (message.type === "checkpoint") this.observeCheckpoint(message);
			else if (message.type === "closed") {
				this.cleanup = message;
				this.healthyCloseAcknowledged = this.closeRequested && message.settled;
				this.closed.resolve();
			} else if (message.type === "lease") {
				try {
					publishOpenClawStateDatabaseWorkerAdmission(this.stateContext.admission);
				} catch (error) {
					this.failure ??= toStringifiedError(error);
				}
				try {
					if (message.receipt.agentId !== this.options.agentId || message.receipt.path !== this.options.path || message.receipt.ownerPid !== process.pid || message.receipt.sharedStateIdentity !== this.stateContext.admission.identity.key || this.lease && !isDeepStrictEqual(this.lease, message.receipt)) throw new Error("SQLite reclamation Worker changed its lease receipt");
					this.lease = message.receipt;
				} catch (error) {
					this.failure ??= toStringifiedError(error);
				}
				if (this.failure) this.requestTermination(transport);
			}
		});
		worker.once("error", (error) => {
			this.failure ??= toStringifiedError(error);
		});
		worker.once("messageerror", (error) => {
			this.failure ??= toStringifiedError(error);
			this.requestTermination(transport);
		});
		this.ended = new Promise((resolve) => {
			observeSqliteMutationWorkerEnd(transport, (ending) => {
				this.taskCustodyReleased = ending.kind === "task-complete" || ending.kind === "task-failed" && ending.custodyReleased;
				this.nativeExitProven = ending.kind === "native-exit" || ending.kind === "task-failed" && ending.custodyReleased && !this.healthyCloseAcknowledged;
				if (ending.kind === "task-failed") this.failure ??= ending.error;
				else if (ending.kind === "native-exit" && ending.code !== 0 || !this.revoked || !this.cleanup || ending.kind === "task-complete" && !this.cleanup.settled) this.failure ??= /* @__PURE__ */ new Error("SQLite reclamation Worker ended without confirmed cleanup; operation outcome is uncertain");
				resolve();
			});
		});
		if (this.onRetired) channel("openclaw.memory.critical").subscribe(this.onMemoryPressure);
		return transport;
	}
	observeCheckpoint(message) {
		if (this.retired || this.failure || !this.lease || message.operationId !== this.operationId || this.revoked && !this.closeRequested) return;
		try {
			this.stateContext.admission.assertCurrent();
			this.assertPathCurrent();
			publishSqliteWalCheckpointObservation(this.options.path, message.snapshot);
		} catch {}
	}
	requestTermination(transport) {
		terminateSqliteMutationWorker(transport).catch((error) => {
			this.failure = new AggregateError([this.failure, error].filter((failure) => failure !== void 0), "SQLite reclamation Worker termination failed", { cause: error });
		});
	}
	revoke() {
		this.retirementReason ??= "revoked";
		this.revoked = true;
		if (this.commitGate) revokeSqliteReclamationCommit(this.commitGate);
		clearTimeout(this.idle);
	}
	async close(reason = "revoked") {
		this.retirementReason ??= reason;
		this.revoke();
		if (this.retired) return;
		if (this.execution?.failure) {
			await this.execution.retryFailedRetirements();
			if (this.retired) return;
		}
		return this.closing ??= (async () => {
			await this.active?.catch(() => {});
			const transport = this.transport;
			if (transport) {
				const worker = transport.channel;
				worker.ref();
				await runOpenClawAgentWorkerWrite(this.options, async () => {
					const operationId = ++this.operationId;
					await withSqliteMutationWorkerCoordination(this.stateContext, transport, operationId, async (coordination) => {
						try {
							this.closeRequested = true;
							worker.postMessage({
								type: "close",
								operationId,
								coordination
							}, []);
						} catch (error) {
							await terminateSqliteMutationWorker(transport);
							throw error;
						} finally {
							await (transport.kind === "pooled" ? Promise.race([this.closed.promise, this.ended]) : this.ended);
						}
					});
					if (transport.kind === "pooled") try {
						worker.postMessage({
							type: "release",
							operationId
						}, []);
					} catch (error) {
						await terminateSqliteMutationWorker(transport);
						throw error;
					} finally {
						await this.ended;
					}
				});
			}
			if (transport?.kind === "pooled" && transport.custodyReleased()) {
				this.taskCustodyReleased = true;
				this.nativeExitProven ||= !this.healthyCloseAcknowledged;
			}
			if (this.lease && this.nativeExitProven && !this.cleanup?.settled) {
				const lease = this.lease;
				await cleanupRetiredAgentDatabaseLease({
					context: this.stateContext,
					stopped: this.ended,
					lease,
					assertOwned: () => {
						if (!this.revoked || this.retired || !this.nativeExitProven || this.transport !== transport || this.lease !== lease) throw new Error("SQLite reclamation Worker no longer owns its retired lease");
					}
				});
			} else if (transport && (!this.cleanup?.settled || transport.kind === "pooled" && !this.taskCustodyReleased)) throw new Error("SQLite reclamation Worker cleanup is uncertain; restart OpenClaw before deleting the owning agent");
			if (this.cleanup?.cleanupWarnings.length) log.warn("SQLite session reclamation Worker recovered cleanup failures", {
				errors: this.cleanup.cleanupWarnings,
				path: this.options.path
			});
			this.retired = true;
			channel("openclaw.memory.critical").unsubscribe(this.onMemoryPressure);
			this.unregisterAgent();
			this.unregisterState();
			process.off("beforeExit", this.beforeExit);
			this.transport?.channel.removeAllListeners();
			if (this.transport?.kind === "pooled") this.transport.channel.close();
			this.onRetired?.(this);
			logSqliteReclamationWorkerRetirement({
				reason: this.retirementReason ?? reason,
				kind: this.kind,
				startedAt: this.createdAt,
				opsServed: this.opsServed,
				workerThreadId: this.workerThreadId
			});
		})().finally(() => {
			this.closing = void 0;
		});
	}
};
//#endregion
export { readPendingSqliteTranscriptArchivesInWorker as a, runSqliteTranscriptArchivePublishWorker as c, withSqliteMutationWorkerLifetime as d, withSqliteTranscriptArchiveSession as f, materializeSessionStateDeletePlans as i, runSqliteTranscriptArchiveReadWorker as l, withSqliteCanonicalValidationWorker as n, runExclusiveSqliteTranscriptArchiveWorker as o, withSqliteReclamationWorker as r, runSqliteTranscriptArchivePageWorker as s, SqliteReclamationWorker as t, runSqliteTranscriptArchiveWorkerOperation as u };
