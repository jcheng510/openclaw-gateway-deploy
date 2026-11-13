import { u as toErrorObject } from "./error-coercion-1P2One0X.mjs";
import { t as createDeferredCore } from "./deferred-D0La5CRk.mjs";
import "./src-SskUVPJG.mjs";
import { t as expectDefined } from "./expect-lbe3Hgrh.mjs";
import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { r as resolveStateDir } from "./state-dir-CfAW6S2K.mjs";
import { t as assertExistingDatabaseIdentity } from "./sqlite-worker-identity-Dggu-rKK.mjs";
import { t as createSubsystemLogger } from "./subsystem-CeqVSEVi.mjs";
import { n as ok, t as err } from "./result-BQGgYouL.mjs";
import { r as WorkerTaskError } from "./worker-task-pool-Cl1KhdJb.mjs";
import { c as resolveOpenClawAgentSqlitePath, i as isIncognitoOpenClawAgentSqlitePath } from "./openclaw-agent-db.paths-Dv3PPTNK.mjs";
import { p as withSqliteWorkerCleanupFailure } from "./sqlite-worker-store-DNLj-iuz.mjs";
import "./openclaw-agent-db-CZUYuo7P.mjs";
import { t as captureSessionTranscriptStorageEnvironment } from "./transcript-target-binding-Cytsl9mY.mjs";
import { _ as toDatabaseOptions, l as resolveSqliteScope } from "./session-accessor.sqlite-scope-AxUEwRt8.mjs";
import { a as unwrapSessionTranscriptWorkerReply, i as sessionHistoryCleanupError, n as decodeSessionTranscriptWorkerReadError } from "./session-history-worker-errors-BIrOr1iJ.mjs";
import { D as resolveSessionStorePathForScope, l as loadSessionEntryReadOnlyInScope } from "./session-accessor.sqlite-entry-C87Sde4p.mjs";
import { a as costRefreshLane, d as refreshDatabaseWorkerPressureSubscription, f as releaseRetiredDatabaseCustody, h as UsageCostWorkerReplyError, i as costReadLane, n as armDatabaseWorkerIdleRetirement, o as historyClearTimeout, p as rotateDatabaseWorkers, r as clearClosedDatabaseCustody, s as historyLane, t as acquireHistoryDatabaseResource, u as pruneHistoryDatabases } from "./session-transcript-worker-resources-DLvHY0vJ.mjs";
import { AsyncLocalStorage } from "node:async_hooks";
//#region src/config/sessions/session-transcript-worker-readers.ts
function assertResultKind(value, kind, expected) {
	if (typeof value === "boolean" || Array.isArray(value) || value.kind !== kind) throw new Error(`Session history worker returned another result instead of ${expected}`);
}
/** Decode domain results; database custody remains with the enclosing history owner. */
function createSessionHistoryWorkerReaders(runRequest) {
	function reader(kind, expected, prepare, project) {
		return async (input, signal) => runRequest(() => prepare(input), JSON.stringify(input).length * 2, (value) => {
			assertResultKind(value, kind, expected);
			return project(value);
		}, signal);
	}
	return {
		prewarm: reader("prewarm", "prewarm acknowledgement", (input) => ({
			kind: "prewarm",
			...input
		}), () => void 0),
		readPendingArchives: reader("session-pending-archives", "pending archives", (input) => ({
			kind: "session-pending-archives",
			...input
		}), (value) => value.pending),
		readArchivePresence: reader("session-archive-presence", "archive presence", (input) => ({
			kind: "session-archive-presence",
			...input
		}), (value) => value.registered),
		findTranscriptEvent: reader("transcript-match", "a transcript match", (request) => ({
			kind: "transcript-match",
			request
		}), (value) => value.result),
		readHistoricalEvictionCandidates: reader("historical-eviction-candidates", "eviction candidates", (input) => ({
			kind: "historical-eviction-candidates",
			...input
		}), (value) => value.sessionIds),
		readArchivePruning: reader("session-archive-pruning", "archive pruning", (input) => ({
			kind: "session-archive-pruning",
			...input
		}), (value) => value.result),
		readColdMetadata: reader("cold-metadata", "cold metadata", (input) => ({
			kind: "cold-metadata",
			...input
		}), (value) => value),
		searchTranscripts: reader("transcript-search", "search", (params) => ({
			kind: "transcript-search",
			params
		}), (value) => value.result),
		readPreview: reader("session-preview", "a preview", (input) => ({
			kind: "session-preview",
			...input
		}), (value) => value.items),
		readTitleFields: reader("session-title-fields", "title fields", (input) => ({
			kind: "session-title-fields",
			...input
		}), (value) => value.fields),
		readRowBackfill: reader("session-row-backfill", "transcript fields", (params) => ({
			kind: "session-row-backfill",
			params
		}), (value) => value.fields),
		run: async (prepare, inputBytes) => await runRequest(prepare, inputBytes, (value) => {
			if (typeof value === "boolean" || Array.isArray(value) || value.kind !== "transcript-binding" && value.kind !== "artifacts" && value.kind !== "message-page" && value.kind !== "around-id" && value.kind !== "source-messages" && value.kind !== "recent-page" && value.kind !== "rpc" && value.kind !== "http" && value.kind !== "delta" && value.kind !== "recent" && value.kind !== "message-by-id" && value.kind !== "message-count" && value.kind !== "message-lookup") throw new Error("Session history worker returned metadata instead of history");
			return value;
		}),
		readTranscript: async (input, signal) => {
			const events = [];
			let parts = [];
			let text;
			const receiveChunk = (value) => {
				if (!isRecord(value) || value.kind !== "transcript-hydration-chunk" || typeof value.encoding !== "string" || !Array.isArray(value.frames)) throw new Error("Session history worker returned an invalid transcript chunk");
				if (!text) text = {
					encoding: value.encoding,
					decoder: new TextDecoder(value.encoding, { ignoreBOM: true })
				};
				else if (text.encoding !== value.encoding) throw new Error("Session history worker changed transcript encoding during transfer");
				for (const frame of value.frames) {
					if (!isRecord(frame) || !(frame.data instanceof Uint8Array) || typeof frame.endOfEvent !== "boolean") throw new Error("Session history worker returned an invalid transcript frame");
					parts.push(text.decoder.decode(frame.data, { stream: !frame.endOfEvent }));
					if (frame.endOfEvent) {
						events.push(JSON.parse(parts.join("")));
						parts = [];
					}
				}
			};
			return await runRequest(() => ({
				kind: "transcript-hydration",
				...input
			}), JSON.stringify(input).length * 2, (value) => {
				if (typeof value === "boolean" || Array.isArray(value) || value.kind !== "full" && value.kind !== "bounded") throw new Error("Session history worker returned another result instead of a transcript");
				if (value.kind === "bounded") return value;
				if (parts.length !== 0 || events.length !== value.eventCount) throw new Error("Session history worker returned an incomplete transcript");
				return {
					kind: "full",
					snapshot: {
						events,
						version: value.version
					}
				};
			}, signal, input.limits ? void 0 : receiveChunk);
		},
		readCurrentTurnEntry: reader("current-turn-entry", "a current-turn entry", (input) => ({
			kind: "current-turn-entry",
			...input
		}), (value) => value),
		readUsageCache: reader("usage-refresh-lock", "usage cache", (input) => ({
			kind: "usage-cache",
			...input
		}), (value) => value),
		readMembershipFacts: reader("session-membership-facts", "membership facts", (input) => ({
			kind: "session-membership-facts",
			...input
		}), (value) => value),
		readMembers: async (input) => await runRequest(() => ({
			kind: "session-members",
			...input
		}), JSON.stringify(input).length * 2, (value) => {
			if (!Array.isArray(value)) throw new Error("Session history worker returned another result instead of members");
			return value;
		}),
		readExactEntries: async (input, signal) => {
			const captured = {
				...input,
				env: captureSessionTranscriptStorageEnvironment(input.env)
			};
			return runRequest(() => ({
				kind: "session-exact-entries",
				...captured
			}), JSON.stringify(captured).length * 2, (value) => {
				assertResultKind(value, "session-exact-entries", "exact entries");
				return value;
			}, signal);
		},
		readRowFacts: async (input) => {
			if (input.sessionKeys.length > 64) throw new Error(`Session row facts support at most 64 keys`);
			const captured = {
				env: { ...input.env },
				sessionKeys: [...input.sessionKeys],
				continuation: input.continuation ? { ...input.continuation } : void 0
			};
			return await runRequest(() => ({
				kind: "session-row-facts",
				...captured
			}), JSON.stringify(captured).length * 2, (value) => {
				assertResultKind(value, "session-row-facts", "row facts");
				return value;
			});
		},
		readProgressCard: reader("session-progress-card", "a progress card", (input) => ({
			kind: "session-progress-card",
			...input
		}), (value) => value.card),
		readPendingInputReceipts: reader("session-pending-input-receipts", "pending input receipts", (input) => ({
			kind: "session-pending-input-receipts",
			...input
		}), (value) => value.receipts),
		readEntryResult: reader("session-entry-read", "an entry", (input) => ({
			kind: "session-entry-read",
			...input
		}), (value) => value.readError ? err(decodeSessionTranscriptWorkerReadError(value.readError)) : ok(value.entry)),
		readDiagnosticText: reader("session-diagnostic-text", "diagnostic text", (input) => ({
			kind: "session-diagnostic-text",
			...input
		}), (value) => value.text),
		readEntries: reader("session-entry-list", "entries", (scope) => ({
			kind: "session-entry-list",
			scope
		}), (value) => value.entries),
		readIdentityEvidence: reader("session-identity-evidence", "identity evidence", (input) => ({
			kind: "session-identity-evidence",
			...input
		}), (value) => value.evidence),
		readProjectionStatus: async (input, signal) => await runRequest(() => ({
			kind: "projection-status",
			...input
		}), JSON.stringify(input).length * 2, (value) => {
			if (typeof value !== "boolean") throw new Error("Session history worker returned history instead of projection status");
			return value;
		}, signal),
		readEntryPresence: async (scope) => await runRequest(() => ({
			kind: "session-row-presence",
			scope
		}), JSON.stringify(scope).length * 2, (value) => {
			if (typeof value !== "boolean") throw new Error("Session history worker returned history instead of metadata presence");
			return value;
		})
	};
}
//#endregion
//#region src/config/sessions/session-transcript-worker-runtime.ts
const log = createSubsystemLogger("sessions/history-worker");
const historyPrewarms = /* @__PURE__ */ new WeakMap();
function isSessionHistoryWorkerCold() {
	return historyLane.pending === 0 && historyLane.nativeSequence <= historyLane.retiredSequence;
}
/** Reuse normal reader custody; repeated warmups never refresh the idle deadline. */
async function prewarmSessionHistoryWorker(options) {
	try {
		const resource = acquireHistoryDatabaseResource(options);
		const existing = historyPrewarms.get(resource);
		if (existing && (existing.pending || !historyLane.rotation && existing.retiredSequence === historyLane.retiredSequence && resource.nativeSequences.has(historyLane))) return await existing.promise;
		const completion = createDeferredCore();
		const prewarm = {
			promise: completion.promise,
			pending: true,
			retiredSequence: historyLane.retiredSequence
		};
		historyPrewarms.set(resource, prewarm);
		withSessionHistoryWorkerDatabase(options, (owner) => owner.prewarm({ env: captureSessionTranscriptStorageEnvironment(options.env ?? process.env) })).then(() => {
			prewarm.pending = false;
			completion.resolve();
		}, (error) => {
			historyPrewarms.delete(resource);
			log.debug(`Session history worker prewarm failed: ${String(error)}`);
			completion.resolve();
		});
		await completion.promise;
	} catch (error) {
		log.debug(`Session history worker prewarm failed: ${String(error)}`);
	}
}
/** Capture the exact metadata owner before initial-writer admission can wait. */
function prepareSessionEntryPresenceRead(input) {
	const env = { ...input.env ?? process.env };
	env.OPENCLAW_STATE_DIR = resolveStateDir(env);
	const storePath = resolveSessionStorePathForScope({
		...input,
		env
	});
	const resolved = resolveSqliteScope({
		...input,
		storePath,
		env
	});
	const options = toDatabaseOptions(resolved);
	const databasePath = resolveOpenClawAgentSqlitePath(options);
	const scope = {
		agentId: resolved.agentId,
		sessionKey: resolved.sessionKey,
		storePath: databasePath,
		databaseAgentId: options.agentId,
		env
	};
	const incognito = isIncognitoOpenClawAgentSqlitePath(databasePath, options);
	return {
		sessionKey: resolved.sessionKey,
		storePath,
		read: incognito ? async () => loadSessionEntryReadOnlyInScope({
			...scope,
			projection: "list"
		}) !== void 0 : async () => await withSessionHistoryWorkerDatabase(options, async (owner) => await owner.readEntryPresence(scope))
	};
}
/** Single and batch reads synchronously retain the same lane-aware database owner. */
function retainSessionHistoryWorkerDatabase(options, lane = historyLane) {
	const owned = acquireHistoryDatabaseResource(options);
	const { database } = owned;
	let entryReadSource;
	const assertCurrent = () => {
		if (owned.revoked) throw new WorkerTaskError("Session history database read was revoked", "unavailable");
		if (entryReadSource) assertExistingDatabaseIdentity(database.path, `file:${entryReadSource.databaseIdentity}`, entryReadSource.databaseBirthtime);
	};
	historyClearTimeout(lane.idleTimer);
	lane.pending++;
	owned.pending++;
	refreshDatabaseWorkerPressureSubscription();
	let countsReleased = false;
	let releaseFinished = false;
	const releaseCleanup = { run: async () => release() };
	const release = () => {
		if (releaseFinished) return;
		owned.cleanups.add(releaseCleanup);
		if (!countsReleased) {
			countsReleased = true;
			owned.pending--;
			lane.pending--;
		}
		try {
			armDatabaseWorkerIdleRetirement(lane);
			owned.cleanups.delete(releaseCleanup);
			pruneHistoryDatabases();
			releaseFinished = true;
		} catch (error) {
			owned.cleanups.add(releaseCleanup);
			throw error;
		}
	};
	try {
		assertCurrent();
		const runRequest = async (prepare, inputBytes, receive, signal, onRequest) => {
			assertCurrent();
			const deadline = performance.now() + 6e4;
			let sequence = 0;
			let executionRetired = false;
			try {
				const reply = await lane.pool.run(() => {
					assertCurrent();
					const input = prepare();
					assertCurrent();
					sequence = ++lane.nativeSequence;
					owned.nativeSequences.set(lane, sequence);
					return {
						...input,
						database
					};
				}, {
					inputBytes,
					timeoutMs: 6e4,
					signal,
					onRequest: onRequest ? async (value, context) => {
						context.signal.throwIfAborted();
						assertCurrent();
						onRequest(value);
						assertCurrent();
						const remaining = deadline - performance.now();
						if (remaining <= 0) throw new WorkerTaskError("worker task timed out", "timeout");
						return {
							input: null,
							timeoutMs: remaining
						};
					} : void 0,
					onExecutionSettled: ({ retired }) => {
						if (retired) {
							executionRetired = true;
							releaseRetiredDatabaseCustody(lane, sequence);
						}
					}
				});
				const received = unwrapSessionTranscriptWorkerReply(reply);
				if (typeof received !== "boolean" && !Array.isArray(received) && (received.kind === "session-entry-read" || received.kind === "session-diagnostic-text") && received.source) {
					const source = received.source;
					if (source.agentId !== database.agentId || source.path !== database.path || entryReadSource && (entryReadSource.databaseIdentity !== source.databaseIdentity || entryReadSource.databaseBirthtime !== source.databaseBirthtime)) throw new Error("Session entry read changed its retained physical owner");
					entryReadSource = source;
				}
				const value = receive(received);
				if (reply.ok && reply.closedHistoryDatabase) clearClosedDatabaseCustody(lane, sequence, [reply.closedHistoryDatabase]);
				assertCurrent();
				return value;
			} catch (error) {
				if (sequence > 0 && !executionRetired) try {
					await rotateDatabaseWorkers(lane);
				} catch (cleanupError) {
					throw sessionHistoryCleanupError(error, cleanupError, "worker retirement");
				}
				throw error;
			}
		};
		return {
			owner: {
				generation: owned.generation,
				assertCurrent,
				...createSessionHistoryWorkerReaders(runRequest)
			},
			release
		};
	} catch (error) {
		try {
			release();
		} catch (cleanupError) {
			throw new AggregateError([error, cleanupError], "Session history reader admission cleanup failed", { cause: cleanupError });
		}
		throw error;
	}
}
/** Capture every selected store before yielding; a closed target cannot join a later generation. */
async function withSessionHistoryWorkerDatabases(options, operation, lane = historyLane) {
	const retained = [];
	let outcome;
	try {
		for (const target of options) retained.push(retainSessionHistoryWorkerDatabase(target, lane));
		const value = await operation(retained.map(({ owner }) => owner));
		for (const { owner } of retained) owner.assertCurrent();
		outcome = { value };
	} catch (error) {
		outcome = { error };
	}
	const cleanupErrors = [];
	for (const retainedRead of retained.toReversed()) try {
		retainedRead.release();
	} catch (error) {
		cleanupErrors.push(error);
	}
	if (cleanupErrors.length > 0) throw new AggregateError([..."error" in outcome ? [outcome.error] : [], ...cleanupErrors], "Session history read scope cleanup failed", { cause: "error" in outcome ? outcome.error : cleanupErrors[0] });
	if ("error" in outcome) throw outcome.error;
	return outcome.value;
}
/** Single-target callers retain the same batch admission and revocation boundary. */
function withSessionHistoryWorkerDatabase(options, operation, lane = historyLane) {
	return withSessionHistoryWorkerDatabases([options], (owners) => operation(expectDefined(owners[0], "retained session history reader")), lane);
}
/** Usage reads retain every physical store while compute and its admitted host effects settle. */
async function withSessionCostUsageWorkerDatabases(options, operation) {
	if (options.length === 0) throw new Error("Usage cost work requires its database owners");
	const resources = /* @__PURE__ */ new Set();
	try {
		for (const databaseOptions of options) {
			const resource = acquireHistoryDatabaseResource(databaseOptions);
			if (!resources.has(resource)) {
				resources.add(resource);
				resource.pending++;
			}
		}
	} catch (error) {
		for (const resource of resources) resource.pending--;
		pruneHistoryDatabases();
		throw error;
	}
	const pending = /* @__PURE__ */ new Set();
	const cleanups = /* @__PURE__ */ new Set();
	const lanes = /* @__PURE__ */ new Map();
	let phase = "open";
	const assertCurrent = () => {
		if (phase === "closed" || [...resources].some((resource) => resource.revoked)) throw new WorkerTaskError("Session usage database work was revoked", "unavailable");
	};
	const settle = async () => {
		while (pending.size > 0) await Promise.allSettled(pending);
		for (const [lane, custody] of lanes) {
			if (custody.nativeThrough > lane.retiredSequence) await lane.rotation;
			if (custody.failedThrough > lane.retiredSequence) await rotateDatabaseWorkers(lane);
		}
	};
	const retainCleanup = (close) => {
		if (phase === "closed") throw new WorkerTaskError("Session usage database scope is closed", "unavailable");
		const runInContext = AsyncLocalStorage.snapshot();
		let released = false;
		let closing;
		const release = () => {
			released = true;
			cleanups.delete(cleanup);
			for (const resource of resources) resource.cleanups.delete(cleanup);
			pruneHistoryDatabases();
		};
		const cleanup = { run: () => {
			if (released) return Promise.resolve();
			closing ??= (async () => {
				await settle();
				await runInContext(close);
				release();
			})().catch((error) => {
				closing = void 0;
				throw error;
			});
			return closing;
		} };
		cleanups.add(cleanup);
		for (const resource of resources) resource.cleanups.add(cleanup);
		return release;
	};
	const run = (input, runOptions) => {
		assertCurrent();
		if (phase !== "open") throw new WorkerTaskError("Session usage database scope is closing", "unavailable");
		const lane = input.operation.kind === "refresh" ? costRefreshLane : costReadLane;
		const custody = lanes.get(lane) ?? {
			nativeThrough: 0,
			failedThrough: 0
		};
		lanes.set(lane, custody);
		const controller = new AbortController();
		const signal = runOptions.signal ? AbortSignal.any([controller.signal, runOptions.signal]) : controller.signal;
		const abort = () => controller.abort(new WorkerTaskError("Session usage database work was revoked", "unavailable"));
		for (const resource of resources) resource.aborters.add(abort);
		historyClearTimeout(lane.idleTimer);
		lane.pending++;
		refreshDatabaseWorkerPressureSubscription();
		const hostEffects = /* @__PURE__ */ new Set();
		const onRequest = runOptions.onRequest;
		let sequence = 0;
		let executionSettled = false;
		const task = (async () => {
			try {
				const reply = await lane.pool.run(() => {
					assertCurrent();
					signal.throwIfAborted();
					runOptions.beforeDispatch?.();
					sequence = ++lane.nativeSequence;
					custody.nativeThrough = sequence;
					for (const resource of resources) resource.nativeSequences.set(lane, sequence);
					return {
						...input,
						databases: [...resources].map((resource) => resource.database)
					};
				}, {
					...runOptions,
					signal,
					onExecutionSettled: ({ retired }) => {
						executionSettled = true;
						if (retired && sequence > 0) releaseRetiredDatabaseCustody(lane, sequence);
					},
					onRequest: onRequest ? (value, context) => {
						const effect = createDeferredCore();
						hostEffects.add(effect.promise);
						for (const resource of resources) resource.hostEffects.add(effect.promise);
						const releaseEffect = () => {
							hostEffects.delete(effect.promise);
							for (const resource of resources) resource.hostEffects.delete(effect.promise);
						};
						effect.promise.then(releaseEffect, releaseEffect);
						try {
							assertCurrent();
							context.signal.throwIfAborted();
							effect.resolve(onRequest(value, context));
						} catch (error) {
							effect.reject(error);
						}
						return effect.promise;
					} : void 0
				});
				if (!reply.ok) throw new UsageCostWorkerReplyError(reply.error);
				clearClosedDatabaseCustody(lane, sequence, reply.closedDatabases);
				signal.throwIfAborted();
				assertCurrent();
				return reply.value;
			} catch (error) {
				if (sequence > 0 && !executionSettled) {
					custody.failedThrough = Math.max(custody.failedThrough, sequence);
					try {
						await rotateDatabaseWorkers(lane);
					} catch (cleanupError) {
						throw withSqliteWorkerCleanupFailure(toErrorObject(error, "Usage cost worker failed"), cleanupError);
					}
				}
				throw error;
			} finally {
				await Promise.allSettled(hostEffects);
				for (const resource of resources) resource.aborters.delete(abort);
				lane.pending--;
				pruneHistoryDatabases();
				armDatabaseWorkerIdleRetirement(lane);
			}
		})();
		pending.add(task);
		task.then(() => pending.delete(task), () => pending.delete(task));
		return task;
	};
	let result;
	try {
		assertCurrent();
		const value = await operation({
			assertCurrent,
			run,
			retainCleanup
		});
		assertCurrent();
		result = {
			ok: true,
			value
		};
	} catch (error) {
		result = {
			ok: false,
			error
		};
	}
	phase = "closing";
	try {
		await settle();
		for (const cleanup of cleanups) await cleanup.run();
		if (result.ok) assertCurrent();
	} catch (cleanupError) {
		throw result.ok ? cleanupError : withSqliteWorkerCleanupFailure(toErrorObject(result.error, "Usage cost operation failed"), cleanupError);
	} finally {
		phase = "closed";
		for (const resource of resources) resource.pending--;
		pruneHistoryDatabases();
		for (const lane of lanes.keys()) armDatabaseWorkerIdleRetirement(lane);
	}
	if (!result.ok) throw result.error;
	return result.value;
}
//#endregion
export { withSessionCostUsageWorkerDatabases as a, retainSessionHistoryWorkerDatabase as i, prepareSessionEntryPresenceRead as n, withSessionHistoryWorkerDatabase as o, prewarmSessionHistoryWorker as r, withSessionHistoryWorkerDatabases as s, isSessionHistoryWorkerCold as t };
