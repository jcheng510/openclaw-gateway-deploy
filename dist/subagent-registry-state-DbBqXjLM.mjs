import { t as createDeferredCore } from "./deferred-D0La5CRk.mjs";
import { r as getAsyncWorkSignal } from "./async-work-scope-ClifbwQr.mjs";
import "./src-SskUVPJG.mjs";
import { t as expectDefined } from "./expect-lbe3Hgrh.mjs";
import { n as isVitestRuntimeEnv } from "./test-runtime-env-mVzBKwSd.mjs";
import "./env-SuLFUnAK.mjs";
import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { t as isPromiseLike } from "./promise-like-D7-l5Fsp.mjs";
import { t as SqliteSnapshotCleanupError } from "./sqlite-readonly-location-cleanup-HvAn98XM.mjs";
import { c as isStateDatabaseReadAdmissionInvalidatedError } from "./openclaw-state-db-async-lifecycle-D4cx8OBO.mjs";
import { s as resolveOpenClawStateSqlitePath } from "./openclaw-state-db.paths-rJI64Ab5.mjs";
import { _ as registerOpenClawStateDatabaseAsyncResource, f as openClawStateDatabaseCache, n as captureOpenClawStateDatabaseReadAdmission } from "./openclaw-state-db-cache-IAib4pqp.mjs";
import { g as hasSqliteWorkerOutcomeUnknown, h as SqliteWorkerError, n as createSqliteWorkerOperationAdmission } from "./sqlite-worker-operation-admission-BB758RIN.mjs";
import { n as getActiveOpenClawStateDatabaseReadSnapshot, t as executeExistingOpenClawStateRead } from "./openclaw-state-db-readonly-DE3MB0wy.mjs";
import { n as hydrateOpenClawStateWorkerError, r as retainOpenClawStateWorkerErrorPayload } from "./openclaw-state-worker-error-CvUWzlTD.mjs";
import { i as prepareOpenClawStateReadSource, r as captureOpenClawStateWorkerContext, t as captureOpenClawStateReadContext } from "./openclaw-state-worker-context-C_iAE7YK.mjs";
import { a as runOpenClawStateWorkerOperation } from "./openclaw-state-worker-store-DwGcGmZn.mjs";
import { n as emitSessionLifecycleEvent } from "./session-lifecycle-events-Ded_zLM3.mjs";
import { S as publishSubagentRunChanges, b as SubagentRunIdLookup, m as getSubagentRunsForChildSession, p as getSubagentRunIdLookup, v as subagentRuns } from "./subagent-run-liveness-CjqSkJZp.mjs";
import { A as projectSubagentRunForMaintenance, a as loadSubagentRunsForControllerFromSqlite, c as saveSubagentRegistryChangesToSqlite, h as bindCapturedSubagentRunRecord, i as loadSubagentRunsForChildSessionFromSqlite, j as projectSubagentRunForSessionList, k as normalizeSubagentRunState, l as saveSubagentRegistryToSqlite, m as collectSubagentSessionReadKeys, n as loadSubagentMaintenanceRunsFromSqlite, o as loadSubagentRunsForSessionsFromSqlite, p as SubagentSessionReadLookup, r as loadSubagentRegistryFromSqlite } from "./subagent-registry.store.sqlite-DQWBMoqK.mjs";
import { isDeepStrictEqual } from "node:util";
import { randomUUID } from "node:crypto";
//#region src/agents/subagents/registry/subagent-registry-persistence.ts
const pendingWrites = /* @__PURE__ */ new Set();
/** Source custody is independent of the caller admission that authorized a new Stop. */
function assertSubagentRegistryWriteSourceCurrent(context) {
	context.maintenanceScope?.assertAdmission();
	context.admission.assertCurrent();
	if (captureOpenClawStateWorkerContext().admission.identity.key !== context.admission.identity.key) throw new Error("Queued registry write lost its original database");
}
function waitForPendingSubagentKillClaim(entry, admission) {
	assertSubagentRegistryWriteOutcomeKnown([entry.runId], admission);
	for (const pending of pendingWrites) if (pending.killClaim === entry && matchesSource(pending, admission)) return pending.settled.promise;
}
/** Joins only the already-admitted writes for the selected physical source and rows. */
function waitForPendingSubagentRegistryWrites(runIds, admission) {
	assertSubagentRegistryWriteOutcomeKnown(runIds, admission);
	const writes = [...pendingWrites].filter((pending) => matchesSource(pending, admission) && runIds.some((id) => pending.runIds.has(id)));
	return writes.length > 0 ? Promise.all(writes.map((pending) => pending.settled.promise)).then(() => void 0) : void 0;
}
function matchesSource(owner, admission) {
	return owner.admission.databasePath === admission.databasePath || owner.admission.identity.canonicalPath === admission.identity.canonicalPath || owner.admission.identity.key === admission.identity.key && owner.admission.identity.birthtime === admission.identity.birthtime;
}
function assertSubagentRegistryWriteOutcomeKnown(runIds, admission) {
	for (const pending of pendingWrites) if (pending.uncertain && matchesSource(pending, admission) && (runIds === void 0 || runIds.some((runId) => pending.runIds.has(runId)))) throw pending.uncertain;
}
/** Closing a source does not reconcile a possibly committed row; a canonical restore does. */
function reconcileRetiredSubagentRegistryWrites(runs, restored) {
	const { admission } = captureOpenClawStateWorkerContext();
	for (const pending of pendingWrites) {
		if (!pending.retired || !pending.uncertain || !matchesSource(pending, admission)) continue;
		for (const runId of pending.runIds) {
			const canonical = restored.get(runId);
			if (canonical) runs.set(runId, canonical);
			else runs.delete(runId);
		}
		pending.unregister?.();
		pendingWrites.delete(pending);
	}
}
/** Synchronous writers invalidate pending row authority before waiting for their write lock. */
function supersedePendingSubagentRegistryWrites(runIds) {
	if (pendingWrites.size === 0) return;
	const { admission } = captureOpenClawStateWorkerContext();
	assertSubagentRegistryWriteOutcomeKnown(runIds, admission);
	for (const pending of pendingWrites) {
		if (!matchesSource(pending, admission)) continue;
		for (const runId of runIds ?? pending.runIds) if (pending.runIds.has(runId)) pending.superseded.add(runId);
	}
}
var SubagentRegistryWriteError = class extends Error {
	constructor(outcome, cause, publication) {
		let failure = cause;
		if (outcome === "unknown" && !hasSqliteWorkerOutcomeUnknown(cause)) {
			const unknown = new SqliteWorkerError("Queued subagent registry write has an unknown outcome", "outcome-unknown");
			unknown.cause = cause;
			failure = unknown;
		}
		super(`Queued subagent registry persistence failed: ${formatErrorMessage(cause)}`, { cause: failure });
		this.outcome = outcome;
		this.publication = publication;
		this.name = "SubagentRegistryWriteError";
	}
};
/** All registry writers retain the same pending-write supersession owner through settlement. */
async function withSubagentRegistryWriteAuthority(runIds, options, run) {
	const { context } = options;
	assertSubagentRegistryWriteOutcomeKnown(runIds, context.admission);
	const pending = {
		runIds: new Set(runIds),
		superseded: /* @__PURE__ */ new Set(),
		admission: context.admission,
		settled: createDeferredCore(),
		killClaim: options.pendingKillClaim
	};
	pending.settled.promise.catch(() => {});
	const assertDatabase = () => assertSubagentRegistryWriteSourceCurrent(context);
	const assertCurrent = () => {
		assertDatabase();
		assertSubagentRegistryWriteOutcomeKnown(runIds, context.admission);
		options.assertCurrent?.();
		if (pending.superseded.size > 0) throw new Error("Queued registry write was superseded");
	};
	pendingWrites.add(pending);
	const unregister = registerOpenClawStateDatabaseAsyncResource({ close: async (identity) => {
		if (!identity || identity.key === context.admission.identity.key) pending.retired = true;
	} });
	pending.unregister = unregister;
	try {
		return await run({
			assertCurrent,
			assertDatabase,
			currentRunIds: () => runIds.filter((runId) => !pending.superseded.has(runId))
		});
	} catch (error) {
		if (hasSqliteWorkerOutcomeUnknown(error) && !(error instanceof SubagentRegistryWriteError && error.outcome === "committed")) pending.uncertain = error instanceof SubagentRegistryWriteError ? error : new SubagentRegistryWriteError("unknown", error);
		throw error;
	} finally {
		if (pending.uncertain) pending.settled.reject(pending.uncertain);
		else pending.settled.resolve();
		if (!pending.uncertain) {
			unregister();
			pendingWrites.delete(pending);
		}
	}
}
/** Retains captured rows, original database admission, and publication through actor settlement. */
async function persistSubagentRegistryChangesAsync(runs, changedRunIds, options, publish) {
	const runIds = [...new Set(changedRunIds.map((id) => id.trim()).filter(Boolean))];
	const retired = new Set(options.retireRunIds);
	return withSubagentRegistryWriteAuthority(runIds, options, async (authority) => {
		let commitGranted = false;
		let acknowledged = false;
		try {
			const snapshot = /* @__PURE__ */ new Map();
			for (const runId of runIds) {
				const entry = runs.get(runId);
				if (entry && !retired.has(runId)) snapshot.set(runId, normalizeSubagentRunState(structuredClone(entry)));
			}
			const write = {
				writeId: randomUUID(),
				values: [...snapshot.values()].map(bindCapturedSubagentRunRecord),
				deleteRunIds: runIds.filter((runId) => !snapshot.has(runId))
			};
			const { context } = options;
			await runOpenClawStateWorkerOperation(context, async (scope) => {
				if ((await scope.execute({
					type: "subagents.persistChanges",
					input: write
				})).writeId !== write.writeId) throw new Error("Queued registry acknowledgement identifies another write");
				acknowledged = true;
				try {
					authority.assertDatabase();
				} catch (error) {
					throw new SubagentRegistryWriteError("committed", error, "superseded");
				}
				const currentIds = authority.currentRunIds();
				if (currentIds.length > 0) publish(snapshot, currentIds);
			}, {
				assertCurrent: authority.assertCurrent,
				createAdmission: () => {
					let phase = "waiting";
					return {
						nativeLocations: [context.admission.databasePath, context.admission.identity.canonicalPath],
						admission: createSqliteWorkerOperationAdmission((request, grant) => {
							if (request.facts !== write.writeId || !(phase === "waiting" && request.stage === "transaction" || phase === "transaction" && request.stage === "commit")) throw new Error("Queued registry write authority requested out of order");
							authority.assertCurrent();
							if (!grant()) throw new Error("Queued registry write authority expired");
							phase = request.stage === "transaction" ? "transaction" : "commit";
							commitGranted = phase === "commit";
						})
					};
				}
			});
		} catch (error) {
			if (acknowledged && error instanceof SubagentRegistryWriteError) throw error;
			throw new SubagentRegistryWriteError(acknowledged ? "committed" : commitGranted || hasSqliteWorkerOutcomeUnknown(error) ? "unknown" : "not-committed", error);
		}
	});
}
/** Keep the live pointers that identify execution and cancellation owners during staging. */
function captureSubagentRunMutationSnapshot(entry) {
	const snapshot = structuredClone(entry);
	snapshot.execution = entry.execution;
	if (Object.hasOwn(entry, "killIntent")) snapshot.killIntent = entry.killIntent;
	if (Object.hasOwn(entry, "killReconciliation")) snapshot.killReconciliation = entry.killReconciliation;
	if (Object.hasOwn(entry, "requesterSettleWake")) snapshot.requesterSettleWake = entry.requesterSettleWake;
	return snapshot;
}
/** The existing writer captures staged rows synchronously; live preimages remain until ACK. */
async function publishSubagentRunPostimages(params) {
	const selected = [...params.previous].map(([entry, previous]) => ({
		entry,
		previous,
		previousSnapshot: structuredClone(previous),
		next: { ...entry },
		nextSnapshot: structuredClone(entry),
		retire: params.retire?.has(entry) === true
	}));
	const replace = (entry, value) => {
		for (const key of Object.keys(entry)) Reflect.deleteProperty(entry, key);
		Object.assign(entry, value);
	};
	let capturing = true;
	let published = false;
	const matches = (next) => selected.every((selection) => params.runs.get(selection.entry.runId) === selection.entry && isDeepStrictEqual(selection.entry, next ? selection.nextSnapshot : selection.previousSnapshot));
	let publication;
	try {
		params.assertCurrent();
		publication = params.persist(params.context, {
			pendingKillClaim: params.pendingKillClaim,
			retireRunIds: selected.filter(({ retire }) => retire).map(({ entry }) => entry.runId),
			assertCurrent() {
				params.assertCurrent();
				if (!matches(capturing)) throw new Error("Subagent mutation lost its original registry row");
			},
			onCommitted() {
				try {
					assertSubagentRegistryWriteSourceCurrent(params.context);
					(params.assertPublicationCurrent ?? params.assertCurrent)();
					if (!matches(false)) throw new Error("Subagent publication lost its original preimage");
				} catch (error) {
					throw new SubagentRegistryWriteError("committed", error, "superseded");
				}
				for (const selection of selected) if (selection.retire) params.runs.delete(selection.entry.runId);
				else replace(selection.entry, selection.next);
				published = true;
				params.onPublished?.();
			}
		}, ...selected.map(({ entry }) => entry.runId));
	} finally {
		if (matches(true)) for (const selection of selected) replace(selection.entry, selection.previous);
		capturing = false;
	}
	try {
		await publication;
	} catch (error) {
		if (error instanceof SubagentRegistryWriteError && error.outcome === "committed") {
			if (!published && error.publication === "superseded") return {
				outcome: "committed",
				publication: "superseded"
			};
			throw new SubagentRegistryWriteError("committed", error, published ? "published" : error.publication);
		}
		throw error;
	}
	return {
		outcome: "committed",
		publication: published ? "published" : "superseded"
	};
}
//#endregion
//#region src/agents/subagents/registry/subagent-registry-read-cache.ts
function getSessionListLookup(cache, snapshot = cache.state.snapshot) {
	const state = cache.state;
	if (!snapshot) return;
	if (state.snapshot !== snapshot) return new SubagentSessionReadLookup(snapshot);
	return state.lookup ??= new SubagentSessionReadLookup(snapshot);
}
function indexedSnapshotRows(snapshot, keys) {
	return keys.map((key) => expectDefined(snapshot.get(key), "indexed subagent cache entry"));
}
function getPersistedRunIdLookup(cache, snapshot) {
	return cache.state.snapshot === snapshot ? cache.state.runIdLookup ??= new SubagentRunIdLookup(snapshot) : new SubagentRunIdLookup(snapshot);
}
function shouldReadPersistedSubagentRuns() {
	return !isVitestRuntimeEnv() || process.env.OPENCLAW_TEST_READ_SUBAGENT_RUNS_FROM_SQLITE === "1";
}
function captureSubagentFactsAdmission(databasePath = resolveOpenClawStateSqlitePath()) {
	return captureOpenClawStateDatabaseReadAdmission(databasePath);
}
function matchesSubagentCacheAdmission(previous, current) {
	if (!previous) return true;
	if (!current || previous.identity.key !== current.identity.key) return false;
	try {
		previous.assertCurrent();
		return true;
	} catch {
		return false;
	}
}
function applySubagentRunChanges(runs, changes) {
	for (const [runId, { entry }] of changes ?? []) if (entry) runs.set(runId, entry);
	else runs.delete(runId);
	return runs;
}
function retainUnpublishedSubagentChanges(changes) {
	for (const [runId, change] of changes ?? []) if (change.committed) changes?.delete(runId);
	return changes?.size ? changes : void 0;
}
/** Selecting a read must not consume another database owner's publication. */
function selectSubagentCacheStateForRead(state, context) {
	const identity = state.retiredPublicationIdentity ?? state.admission?.identity;
	return (context ? !state.retiredPublicationIdentity && matchesSubagentCacheAdmission(state.admission, context.admission) && (state.sourceIdentity === void 0 || state.sourceIdentity === context.admission.identity.key) : !identity || identity === openClawStateDatabaseCache.getKnownOpenClawStateDatabaseIdentity(resolveOpenClawStateSqlitePath())) ? state : {};
}
function rememberSubagentRunsSnapshot(cache, runs, changedRunIds, { committed = true, databasePath } = {}) {
	let admission;
	let retiredPublicationIdentity;
	try {
		admission = cache.captureAdmission?.(databasePath);
	} catch (error) {
		if (!isStateDatabaseReadAdmissionInvalidatedError(error)) throw error;
		if (!cache.load) {
			cache.state = {};
			return;
		}
		retiredPublicationIdentity = expectDefined(openClawStateDatabaseCache.getKnownOpenClawStateDatabaseIdentity(databasePath ?? resolveOpenClawStateSqlitePath()), "retired subagent registry publication identity");
	}
	const previous = retiredPublicationIdentity ? (cache.state.retiredPublicationIdentity ?? cache.state.admission?.identity) === retiredPublicationIdentity ? cache.state : {} : !cache.state.retiredPublicationIdentity && matchesSubagentCacheAdmission(cache.state.admission, admission) && (cache.state.sourceIdentity === void 0 || cache.state.sourceIdentity === admission?.identity.key) ? cache.state : {};
	const owner = {
		admission,
		sourceIdentity: admission?.identity.key ?? retiredPublicationIdentity?.key,
		retiredPublicationIdentity
	};
	const snapshot = previous.snapshot;
	if (!changedRunIds) {
		cache.state = {
			snapshot: new Map([...runs].map(([runId, entry]) => [runId, cache.copy(entry)])),
			...!committed ? { replacementPending: true } : {},
			...owner,
			pending: previous.pending
		};
		return;
	}
	if (!snapshot) {
		const changes = previous.changes ?? /* @__PURE__ */ new Map();
		for (const runId of changedRunIds) {
			const entry = runs.get(runId);
			changes.set(runId, {
				entry: entry ? cache.copy(entry) : void 0,
				committed
			});
		}
		cache.state = {
			changes,
			...owner,
			pending: previous.pending
		};
		return;
	}
	const lookup = previous.lookup;
	const runIdLookup = previous.runIdLookup;
	const changes = previous.changes ?? /* @__PURE__ */ new Map();
	previous.lookup = void 0;
	previous.runIdLookup = void 0;
	for (const runId of new Set(changedRunIds)) {
		const entry = runs.get(runId);
		if (entry) snapshot.set(runId, cache.copy(entry));
		else snapshot.delete(runId);
		if (!committed || previous.replacementPending) changes.set(runId, {
			entry: snapshot.get(runId),
			committed
		});
		else changes.delete(runId);
		lookup?.set(runId, snapshot.get(runId));
		runIdLookup?.set(runId, snapshot.get(runId));
	}
	cache.state = {
		snapshot,
		...owner,
		pending: previous.pending,
		changes: changes.size ? changes : void 0,
		...previous.replacementPending ? { replacementPending: true } : {},
		...lookup ? { lookup } : {},
		...runIdLookup ? { runIdLookup } : {}
	};
}
function getPersistedSubagentRunsSnapshot(cache, prepared) {
	let admission;
	if (!cache.load) {
		const context = prepared ?? captureOpenClawStateReadContext();
		context.maintenanceScope?.assertAdmission();
		context.admission.assertCurrent();
		admission = context.admission;
	} else try {
		admission = cache.captureAdmission?.();
	} catch (error) {
		if (!isStateDatabaseReadAdmissionInvalidatedError(error)) throw error;
		const state = selectSubagentCacheStateForRead(cache.state);
		return applySubagentRunChanges(new Map(state.snapshot), state.changes);
	}
	if (cache.state.retiredPublicationIdentity || !matchesSubagentCacheAdmission(cache.state.admission, admission) || admission && cache.state.sourceIdentity !== admission.identity.key) {
		if (!prepared) cache.state = {
			admission,
			sourceIdentity: admission?.identity.key
		};
		return null;
	}
	return cache.state.pending ? null : cache.state.snapshot ?? null;
}
function loadPersistedSubagentRunsForRead(cache, prepared) {
	const cached = getPersistedSubagentRunsSnapshot(cache, prepared);
	if (cached) return cached;
	if (!cache.load) throw new Error("Subagent session-list facts must be prepared before synchronous reads");
	const runs = applySubagentRunChanges(cache.load(), cache.state.changes);
	const admission = cache.captureAdmission?.();
	cache.state = {
		snapshot: runs,
		changes: retainUnpublishedSubagentChanges(cache.state.changes),
		admission,
		sourceIdentity: admission?.identity.key
	};
	return runs;
}
function assertSubagentReadContext(context) {
	getAsyncWorkSignal()?.throwIfAborted();
	context.maintenanceScope?.assertAdmission();
	context.admission.assertCurrent();
	if (captureOpenClawStateReadContext().admission.identity.key !== context.admission.identity.key) throw new Error("Subagent registry database changed during preparation");
}
function getSubagentRunsSnapshot(inMemoryRuns, cache, scope) {
	if (shouldReadPersistedSubagentRuns() && !cache.load && !getPersistedSubagentRunsSnapshot(cache, scope?.context)) throw new Error("Subagent session-list facts must be prepared before synchronous reads");
	const merged = /* @__PURE__ */ new Map();
	if (shouldReadPersistedSubagentRuns()) try {
		const cached = scope?.load && !scope.fresh ? getPersistedSubagentRunsSnapshot(cache, scope.context) : null;
		const cachedRows = cached && scope?.selectCached ? indexedSnapshotRows(cached, scope.selectCached(expectDefined(getSessionListLookup(cache, cached), "subagent lookup"))) : cached?.values();
		const persisted = scope?.load ? cachedRows ?? scope.load() : loadPersistedSubagentRunsForRead(cache, scope?.context).values();
		for (const entry of persisted) if (!scope || scope.matches(entry)) merged.set(entry.runId, scope?.load && !scope.borrowPersisted ? structuredClone(entry) : entry);
	} catch {}
	if (shouldReadPersistedSubagentRuns()) {
		const state = selectSubagentCacheStateForRead(cache.state, scope?.context);
		for (const [runId, { entry }] of state.changes ?? []) if (entry && (!scope || scope.matches(entry))) merged.set(runId, scope?.load && !scope.borrowPersisted ? structuredClone(entry) : entry);
		else merged.delete(runId);
	}
	for (const [runId, entry] of inMemoryRuns) if (!scope || scope.matches(entry)) merged.set(runId, cache.project(entry));
	else merged.delete(runId);
	return merged;
}
var SubagentSessionListUnavailableError = class extends Error {};
async function readCompactSubagentRuns(context) {
	const reply = await executeExistingOpenClawStateRead({
		path: context.admission.databasePath,
		env: context.environment
	}, { type: "subagents.sessionList" }, { context });
	if (!reply) return /* @__PURE__ */ new Map();
	if (!reply.ok || reply.type !== "subagents.sessionList") throw new Error("Unexpected compact subagent registry read result");
	if ("unavailable" in reply) {
		const failure = new Error(reply.unavailable.message);
		retainOpenClawStateWorkerErrorPayload(failure, reply.unavailable.error);
		throw new SubagentSessionListUnavailableError(reply.unavailable.message, { cause: hydrateOpenClawStateWorkerError(failure, { includeOrdinary: true }) });
	}
	return reply.runs;
}
async function readFullSubagentRuns(context, scope, options = {}) {
	if (scope.kind === "ids" && scope.runIds.length === 0) {
		assertSubagentReadContext(context);
		return /* @__PURE__ */ new Map();
	}
	const reply = await executeExistingOpenClawStateRead({
		path: context.admission.databasePath,
		env: context.environment
	}, {
		type: "subagents.runs",
		scope
	}, options.current ? {
		context,
		current: true
	} : void 0);
	assertSubagentReadContext(context);
	if (!reply) return /* @__PURE__ */ new Map();
	if (!reply.ok || reply.type !== "subagents.runs") throw new Error("Unexpected subagent registry read result");
	return reply.runs;
}
async function prepareSubagentRunsCache(cache, load, prepared) {
	const context = prepared ?? captureOpenClawStateWorkerContext();
	const assertCurrent = () => {
		if (!prepared) {
			assertSubagentReadContext(context);
			return;
		}
		getAsyncWorkSignal()?.throwIfAborted();
		context.maintenanceScope?.assertAdmission();
		context.admission.assertCurrent();
	};
	assertCurrent();
	if (getActiveOpenClawStateDatabaseReadSnapshot({
		path: context.admission.databasePath,
		env: context.environment
	})) {
		const runs = await load(context);
		assertCurrent();
		return runs;
	}
	const callerAbortSignal = getAsyncWorkSignal();
	let retriedCanceledFill = false;
	while (true) {
		assertCurrent();
		let state = cache.state;
		if (!matchesSubagentCacheAdmission(state.admission, context.admission) || state.sourceIdentity !== void 0 && state.sourceIdentity !== context.admission.identity.key) cache.state = state = {
			admission: captureSubagentFactsAdmission(context.admission.databasePath),
			sourceIdentity: context.admission.identity.key
		};
		if (state.snapshot && !state.pending) return state.snapshot;
		if (!state.pending) {
			const sourceIdentity = context.admission.identity.key;
			state.admission = captureSubagentFactsAdmission(context.admission.databasePath);
			state.sourceIdentity = sourceIdentity;
			const fill = {
				ownerAbortSignal: callerAbortSignal,
				promise: Promise.resolve().then(async () => {
					const runs = await load(context);
					try {
						assertCurrent();
					} catch (error) {
						fill.cleanCancellation = fill.ownerAbortSignal?.aborted === true && error === fill.ownerAbortSignal.reason && !(error instanceof AggregateError) && !isStateDatabaseReadAdmissionInvalidatedError(error) && !(error instanceof SqliteSnapshotCleanupError);
						throw error;
					}
					if (cache.state.pending === fill && !cache.state.snapshot) {
						const admission = captureSubagentFactsAdmission(context.admission.databasePath);
						cache.state = sourceIdentity === admission.identity.key ? {
							snapshot: applySubagentRunChanges(runs, cache.state.changes),
							changes: retainUnpublishedSubagentChanges(cache.state.changes),
							admission,
							sourceIdentity
						} : {
							changes: cache.state.changes,
							admission,
							sourceIdentity: admission.identity.key
						};
					}
				})
			};
			state.pending = fill;
		}
		const fill = state.pending;
		try {
			await fill.promise;
		} catch (error) {
			if (!fill.cleanCancellation || fill.ownerAbortSignal === callerAbortSignal || retriedCanceledFill) throw error;
			assertCurrent();
			retriedCanceledFill = true;
		} finally {
			if (cache.state.pending === fill) cache.state.pending = void 0;
		}
		if (prepared && cache.state.sourceIdentity !== void 0 && cache.state.sourceIdentity !== context.admission.identity.key) throw new Error("Subagent registry database changed during preparation");
	}
}
function acceptedFullSnapshot(cache, context) {
	const state = cache.state;
	return !state.retiredPublicationIdentity && !getActiveOpenClawStateDatabaseReadSnapshot({
		path: context.admission.databasePath,
		env: context.environment
	}) && state.sourceIdentity === context.admission.identity.key && matchesSubagentCacheAdmission(state.admission, context.admission) ? state.snapshot : void 0;
}
function consumeSubagentRuns(runs, consume) {
	getAsyncWorkSignal()?.throwIfAborted();
	const result = consume(runs);
	if (isPromiseLike(result)) {
		Promise.resolve(result).catch(() => {});
		throw new Error("Subagent registry read consumers must remain synchronous");
	}
	return result;
}
function mergeSelectedFullRuns(cache, inMemoryRuns, persisted, matches, { context, runIds } = {}) {
	const current = context ? acceptedFullSnapshot(cache, context) : void 0;
	const merged = /* @__PURE__ */ new Map();
	for (const [runId, entry] of selectedEntries(current ?? persisted, runIds)) if (matches(entry)) merged.set(runId, current ? structuredClone(entry) : entry);
	const state = selectSubagentCacheStateForRead(cache.state, context);
	if (context && !getActiveOpenClawStateDatabaseReadSnapshot({
		path: context.admission.databasePath,
		env: context.environment
	}) && state.sourceIdentity === context.admission.identity.key && matchesSubagentCacheAdmission(state.admission, context.admission)) for (const [runId, { entry }] of state.changes ? selectedEntries(state.changes, runIds) : []) if (entry && matches(entry)) merged.set(runId, structuredClone(entry));
	else merged.delete(runId);
	for (const [runId, entry] of selectedEntries(inMemoryRuns, runIds)) if (matches(entry)) merged.set(runId, entry);
	else merged.delete(runId);
	return merged;
}
function* selectedEntries(rows, runIds) {
	if (!runIds) {
		yield* rows;
		return;
	}
	for (const runId of runIds) {
		const entry = rows.get(runId);
		if (entry !== void 0) yield [runId, entry];
	}
}
//#endregion
//#region src/agents/subagents/registry/subagent-registry-read-snapshot.ts
function selectionScope(selected) {
	const runIds = new Set(selected.runIds);
	const sessionKeys = new Set(selected.sessionKeys);
	return {
		runIds,
		sessionKeys,
		matches: (entry) => runIds.has(entry.runId) || sessionKeys.has(entry.requesterSessionKey.trim()) || Boolean(entry.controllerSessionKey && sessionKeys.has(entry.controllerSessionKey.trim()))
	};
}
/** Prepare worker payloads; authority and publications are merged in the caller's consuming frame. */
async function prepareSubagentRunReadSnapshot(params) {
	const { inMemoryRuns, fullCache, compactCache, select, requestedRunIds } = params;
	const requestSignal = getAsyncWorkSignal();
	const privateSnapshot = getActiveOpenClawStateDatabaseReadSnapshot();
	const context = shouldReadPersistedSubagentRuns() ? captureOpenClawStateWorkerContext() : void 0;
	const assertCurrent = () => {
		requestSignal?.throwIfAborted();
		getAsyncWorkSignal()?.throwIfAborted();
		if (getActiveOpenClawStateDatabaseReadSnapshot() !== privateSnapshot) throw new Error("Prepared subagent read left its database snapshot scope");
		if (context) assertSubagentReadContext(context);
	};
	const readCompact = async () => {
		const compact = context ? await prepareSubagentRunsCache(compactCache, readCompactSubagentRuns) : /* @__PURE__ */ new Map();
		assertCurrent();
		return compact;
	};
	const withLiveFacts = (compact) => {
		if (requestedRunIds) {
			const liveKeys = getSubagentRunIdLookup(inMemoryRuns).select(requestedRunIds);
			const persistedKeys = getPersistedRunIdLookup(compactCache, compact).select(requestedRunIds, liveKeys);
			const snapshot = /* @__PURE__ */ new Map();
			for (const key of /* @__PURE__ */ new Set([...persistedKeys, ...liveKeys])) {
				const live = inMemoryRuns.get(key);
				const entry = live ? projectSubagentRunForSessionList(live) : compact.get(key);
				if (entry) snapshot.set(key, entry);
			}
			return snapshot;
		}
		const snapshot = new Map(compact);
		for (const [runId, entry] of inMemoryRuns) snapshot.set(runId, projectSubagentRunForSessionList(entry));
		return snapshot;
	};
	let compact = await readCompact();
	let selected = select(withLiveFacts(compact));
	let refreshedMissingRows = false;
	for (;;) {
		assertCurrent();
		const preparedCompact = compact;
		const scope = selectionScope(selected);
		let persisted = context ? acceptedFullSnapshot(fullCache, context) : void 0;
		if (!persisted) {
			persisted = /* @__PURE__ */ new Map();
			if (context) {
				const scopes = [{
					kind: "ids",
					runIds: [...scope.runIds]
				}, ...[...scope.sessionKeys].map((sessionKey) => ({
					kind: "session",
					sessionKey
				}))];
				for (const readScope of scopes) for (const [runId, entry] of await readFullSubagentRuns(context, readScope)) persisted.set(runId, entry);
			}
		}
		const preparedPayloads = persisted;
		const captureFrame = (reselect) => {
			assertCurrent();
			const currentFull = context ? acceptedFullSnapshot(fullCache, context) : void 0;
			const currentCompact = context && !privateSnapshot ? getPersistedSubagentRunsSnapshot(compactCache) : preparedCompact;
			if (!currentCompact || currentCompact !== preparedCompact && !currentFull) return;
			const snapshot = withLiveFacts(currentCompact);
			const currentScope = reselect ? selectionScope(select(snapshot)) : scope;
			const matches = (entry) => scope.matches(entry) || currentScope.matches(entry);
			const full = mergeSelectedFullRuns(fullCache, inMemoryRuns, preparedPayloads, matches, {
				context,
				...requestedRunIds ? { runIds: /* @__PURE__ */ new Set([...scope.runIds, ...currentScope.runIds]) } : {}
			});
			for (const entry of full.values()) snapshot.set(entry.runId, projectSubagentRunForSessionList(entry));
			const current = select(snapshot);
			const needsHydration = current.sessionKeys.some((key) => !scope.sessionKeys.has(key)) || current.runIds.some((runId) => {
				const entry = snapshot.get(runId);
				return entry && !matches(entry);
			});
			const finalScope = selectionScope(current);
			for (const [runId, entry] of full) if (!finalScope.matches(entry)) full.delete(runId);
			return {
				compact: currentCompact,
				selection: current,
				runs: full,
				needsHydration,
				missingRunIds: current.runIds.filter((runId) => !full.has(runId))
			};
		};
		const prepared = captureFrame(false);
		if (!prepared) {
			compact = await readCompact();
			selected = select(withLiveFacts(compact));
			continue;
		}
		if (prepared.needsHydration) {
			compact = prepared.compact;
			selected = prepared.selection;
			continue;
		}
		if (!refreshedMissingRows && prepared.missingRunIds.length > 0) {
			if (!privateSnapshot) compactCache.state = {};
			compact = await readCompact();
			selected = select(withLiveFacts(compact));
			refreshedMissingRows = true;
			continue;
		}
		const missingRunIds = new Set(prepared.missingRunIds);
		return { consume(consume) {
			const frame = captureFrame(true);
			if (!frame || frame.needsHydration || frame.missingRunIds.some((runId) => !missingRunIds.has(runId))) return { ready: false };
			return {
				ready: true,
				value: consumeSubagentRuns(frame.runs, (runs) => consume(frame.selection, runs))
			};
		} };
	}
}
//#endregion
//#region src/agents/subagents/registry/subagent-registry-state.ts
/**
* Subagent registry state persistence bridge.
*
* Merges live runs with retained SQLite rows under the process-local registry owner.
*/
const persistedSubagentRunsReadCache = {
	state: {},
	captureAdmission: captureSubagentFactsAdmission,
	load: loadSubagentRegistryFromSqlite,
	copy: structuredClone,
	project: (entry) => entry
};
const persistedSubagentSessionListRunsReadCache = {
	state: {},
	captureAdmission: captureSubagentFactsAdmission,
	copy: projectSubagentRunForSessionList,
	project: projectSubagentRunForSessionList
};
const persistedSubagentMaintenanceRunsReadCache = {
	state: {},
	load: () => loadSubagentMaintenanceRunsFromSqlite(),
	copy: projectSubagentRunForMaintenance,
	project: projectSubagentRunForMaintenance
};
const committedSwarmNotifications = /* @__PURE__ */ new Map();
function swarmNotification(entry) {
	if (!entry?.collect || !entry.swarmRequesterSessionKey || !entry.requesterAgentId || !entry.groupId) return;
	return {
		event: {
			sessionKey: entry.swarmRequesterSessionKey,
			agentId: entry.requesterAgentId,
			reason: "swarm",
			scope: "runtime"
		},
		signature: JSON.stringify([
			entry.swarmRequesterSessionKey,
			entry.requesterAgentId,
			entry.groupId,
			entry.createdAt,
			entry.childSessionKey,
			entry.execution.status,
			entry.collectorCompletion?.status
		])
	};
}
function updateCommittedSwarmNotifications(runs, changedRunIds) {
	const events = /* @__PURE__ */ new Map();
	const ids = changedRunIds ?? /* @__PURE__ */ new Set([...committedSwarmNotifications.keys(), ...runs.keys()]);
	for (const runId of ids) {
		const previous = committedSwarmNotifications.get(runId);
		const next = swarmNotification(runs.get(runId));
		if (previous?.signature === next?.signature) continue;
		if (next) committedSwarmNotifications.set(runId, next);
		else committedSwarmNotifications.delete(runId);
		for (const notification of [previous, next]) if (notification) {
			const event = notification.event;
			events.set(JSON.stringify([event.sessionKey, event.agentId]), event);
		}
	}
	return [...events.values()];
}
const SUBAGENT_REGISTRY_PERSIST_LISTENERS = /* @__PURE__ */ new Set();
function emitSubagentRegistryPersisted(keys, runIds) {
	publishSubagentRunChanges(keys, runIds);
	for (const listener of SUBAGENT_REGISTRY_PERSIST_LISTENERS) try {
		listener(keys);
	} catch {}
}
/** Wake process-local readers after a registry mutation, even if persistence failed. */
function onSubagentRegistryPersisted(listener) {
	SUBAGENT_REGISTRY_PERSIST_LISTENERS.add(listener);
	return () => {
		SUBAGENT_REGISTRY_PERSIST_LISTENERS.delete(listener);
	};
}
function rememberPersistedSubagentRunsSnapshot(runs, changedRunIds, publication = {}) {
	const previous = persistedSubagentSessionListRunsReadCache.state.snapshot ?? persistedSubagentRunsReadCache.state.snapshot;
	const keys = previous && changedRunIds?.flatMap((runId) => [previous.get(runId), runs.get(runId)].flatMap((run) => [
		run?.childSessionKey,
		run?.requesterSessionKey,
		run?.controllerSessionKey,
		run?.swarmRequesterSessionKey
	]));
	for (const cache of [
		persistedSubagentRunsReadCache,
		persistedSubagentSessionListRunsReadCache,
		persistedSubagentMaintenanceRunsReadCache
	]) rememberSubagentRunsSnapshot(cache, runs, changedRunIds, publication);
	return keys;
}
/** Publishes registry rows already committed by a cross-owner shared-state transaction. */
function publishSubagentRunsAfterAtomicStore(runs, changedRunIds, deferredObserverEvents, databasePath) {
	supersedePendingSubagentRegistryWrites(changedRunIds);
	subagentRuns.settleCompletionAuthorities(runs, changedRunIds);
	const keys = rememberPersistedSubagentRunsSnapshot(runs, changedRunIds, { databasePath });
	const events = updateCommittedSwarmNotifications(runs, changedRunIds);
	deferredObserverEvents.push(() => {
		emitSubagentRegistryPersisted(keys, changedRunIds);
		events.forEach(emitSessionLifecycleEvent);
	});
}
/** Existing resident facts, fenced by the physical source rather than a publisher's scope. */
function getSubagentSessionListReadSnapshotIdentity() {
	if (!shouldReadPersistedSubagentRuns()) return subagentRuns;
	return getPersistedSubagentRunsSnapshot(persistedSubagentSessionListRunsReadCache) ?? void 0;
}
/** A long-lived projection retains its source; registry publications still own the facts. */
function createSubagentSessionListReadView(options) {
	const path = options.path ?? resolveOpenClawStateSqlitePath(options.env);
	const source = prepareOpenClawStateReadSource({
		path,
		env: options.env
	});
	const cache = persistedSubagentSessionListRunsReadCache;
	const readPersisted = shouldReadPersistedSubagentRuns();
	const matches = () => true;
	const prepare = (context) => prepareSubagentRunsCache(cache, readCompactSubagentRuns, context);
	return {
		snapshotIdentity() {
			if (!readPersisted) return subagentRuns;
			return getPersistedSubagentRunsSnapshot(cache, source.current()) ?? void 0;
		},
		runs(runIds) {
			if (runIds) {
				const persisted = readPersisted ? getPersistedSubagentRunsSnapshot(cache, source.current()) : void 0;
				const selected = /* @__PURE__ */ new Map();
				for (const runId of runIds) {
					const live = subagentRuns.get(runId);
					const entry = live ? cache.project(live) : persisted?.get(runId);
					if (entry) selected.set(runId, entry);
				}
				return selected;
			}
			return getSubagentRunsSnapshot(subagentRuns, cache, {
				context: readPersisted ? source.current() : void 0,
				matches
			});
		},
		async prepare() {
			if (!readPersisted) return;
			if (getActiveOpenClawStateDatabaseReadSnapshot({
				path,
				env: options.env
			})) throw new Error("Resident subagent preparation cannot adopt a private database snapshot");
			await source.withCurrent(prepare);
		}
	};
}
async function prepareSubagentSessionListReadCache() {
	if (!shouldReadPersistedSubagentRuns()) return;
	if (getActiveOpenClawStateDatabaseReadSnapshot()) throw new Error("Resident subagent preparation cannot adopt a private database snapshot");
	await prepareSubagentRunsCache(persistedSubagentSessionListRunsReadCache, readCompactSubagentRuns);
}
/** History can omit retained child hints only after a failed query has settled cleanly. */
async function prepareOptionalSubagentSessionListReadCache() {
	if (!shouldReadPersistedSubagentRuns()) return true;
	const context = captureOpenClawStateWorkerContext();
	try {
		await prepareSubagentSessionListReadCache();
		assertSubagentReadContext(context);
		return true;
	} catch (error) {
		if (!(error instanceof SubagentSessionListUnavailableError)) throw error;
		assertSubagentReadContext(context);
		return false;
	}
}
function clearSubagentRunsReadCacheForTest() {
	supersedePendingSubagentRegistryWrites();
	committedSwarmNotifications.clear();
	persistedSubagentRunsReadCache.state = {};
	persistedSubagentSessionListRunsReadCache.state = {};
	persistedSubagentMaintenanceRunsReadCache.state = {};
}
function persistSubagentRuns(runs, changedRunIds, strict) {
	supersedePendingSubagentRegistryWrites(changedRunIds);
	let committed = false;
	try {
		if (changedRunIds) saveSubagentRegistryChangesToSqlite(runs, changedRunIds);
		else saveSubagentRegistryToSqlite(runs);
		committed = true;
	} catch (error) {
		if (strict) throw error;
	}
	if (committed) subagentRuns.settleCompletionAuthorities(runs, changedRunIds);
	const keys = rememberPersistedSubagentRunsSnapshot(runs, changedRunIds, { committed });
	const events = committed ? updateCommittedSwarmNotifications(runs, changedRunIds) : [];
	emitSubagentRegistryPersisted(keys, changedRunIds);
	events.forEach(emitSessionLifecycleEvent);
}
function persistSubagentRunsToDisk(runs, changedRunIds) {
	persistSubagentRuns(runs, changedRunIds, false);
}
function persistSubagentRunsToDiskOrThrow(runs, changedRunIds) {
	persistSubagentRuns(runs, changedRunIds, true);
}
function persistSubagentRunsToDiskAsyncOrThrow(runs, changedRunIds, options) {
	return persistSubagentRegistryChangesAsync(runs, changedRunIds, options, (snapshot, runIds) => {
		options.onCommitted?.();
		subagentRuns.settleCompletionAuthorities(snapshot, runIds);
		const keys = rememberPersistedSubagentRunsSnapshot(snapshot, runIds, { databasePath: options.context.admission.databasePath });
		const events = updateCommittedSwarmNotifications(snapshot, runIds);
		emitSubagentRegistryPersisted(keys, runIds);
		events.forEach(emitSessionLifecycleEvent);
	});
}
function restoreSubagentRunsFromDisk(params) {
	const restored = loadSubagentRegistryFromSqlite();
	if (!params.mergeOnly) reconcileRetiredSubagentRegistryWrites(params.runs, restored);
	supersedePendingSubagentRegistryWrites();
	const keys = rememberPersistedSubagentRunsSnapshot(restored);
	let added = 0;
	for (const [runId, entry] of restored.entries()) {
		if (!runId || !entry) continue;
		if (params.mergeOnly && params.runs.has(runId)) continue;
		params.runs.set(runId, entry);
		const notification = swarmNotification(entry);
		if (notification) committedSwarmNotifications.set(runId, notification);
		else committedSwarmNotifications.delete(runId);
		subagentRuns.commitOwnership(entry);
		added += 1;
	}
	emitSubagentRegistryPersisted(keys);
	return added;
}
function getSubagentRunsSnapshotForRead(inMemoryRuns) {
	return getSubagentRunsSnapshot(inMemoryRuns, persistedSubagentRunsReadCache);
}
/** All generations of exact children, sharing the existing snapshot and its publication-owned lookup. */
function getSubagentSessionListRunsSnapshotForChildSessions(childSessionKeys) {
	const keys = new Set(childSessionKeys.map((key) => key.trim()).filter(Boolean));
	const selected = /* @__PURE__ */ new Map();
	if (keys.size === 0) return selected;
	const cache = persistedSubagentSessionListRunsReadCache;
	if (shouldReadPersistedSubagentRuns()) {
		const snapshot = loadPersistedSubagentRunsForRead(cache);
		const lookup = getSessionListLookup(cache, snapshot);
		for (const runId of lookup?.selectChildren(keys) ?? []) {
			const persisted = snapshot.get(runId);
			const live = persisted && subagentRuns.get(persisted.runId);
			const entry = live ? cache.project(live) : persisted;
			if (entry && keys.has(entry.childSessionKey.trim())) selected.set(entry.runId, entry);
		}
	}
	for (const key of keys) for (const entry of getSubagentRunsForChildSession(key)) selected.set(entry.runId, cache.project(entry));
	return selected;
}
function getSubagentMaintenanceRunsSnapshotForRead(inMemoryRuns) {
	return getSubagentRunsSnapshot(inMemoryRuns, persistedSubagentMaintenanceRunsReadCache);
}
/** Hydrate selected payloads, then capture their current graph and raw owners in one frame. */
async function withSubagentRunReadSnapshot(inMemoryRuns, select, consume) {
	for (;;) {
		const result = (await prepareSubagentRunReadSnapshot({
			inMemoryRuns,
			fullCache: persistedSubagentRunsReadCache,
			compactCache: persistedSubagentSessionListRunsReadCache,
			select
		})).consume(consume);
		if (result.ready) return result.value;
	}
}
async function prepareSubagentRunsSnapshotForRunIds(inMemoryRuns, runIds) {
	const requested = new Set(runIds.map((runId) => runId.trim()));
	const matches = (entry) => requested.has(entry.runId) || Boolean(entry.swarmRunId && requested.has(entry.swarmRunId));
	const prepared = await prepareSubagentRunReadSnapshot({
		inMemoryRuns,
		fullCache: persistedSubagentRunsReadCache,
		compactCache: persistedSubagentSessionListRunsReadCache,
		requestedRunIds: requested,
		select: (snapshot) => ({
			runIds: [...snapshot.values()].filter(matches).map((entry) => entry.runId),
			sessionKeys: []
		})
	});
	return { consume(consume) {
		return prepared.consume((selection, runs) => {
			const selected = /* @__PURE__ */ new Map();
			for (const runId of selection.runIds) {
				const entry = runs.get(runId);
				if (entry) selected.set(runId, entry);
			}
			return consume(selected);
		});
	} };
}
function getSubagentSessionListRunsSnapshotForRead(inMemoryRuns, controllerSessionKeys) {
	if (controllerSessionKeys) {
		const keys = new Set(controllerSessionKeys.map((key) => key.trim()).filter(Boolean));
		if (keys.size === 0) return /* @__PURE__ */ new Map();
		const cache = persistedSubagentSessionListRunsReadCache;
		const cached = shouldReadPersistedSubagentRuns() ? getPersistedSubagentRunsSnapshot(cache) : null;
		const lookup = cached ? getSessionListLookup(cache, cached) : void 0;
		if (!cached || !lookup) {
			if (!shouldReadPersistedSubagentRuns()) return getSubagentRunsSnapshot(inMemoryRuns, cache, { matches: (entry) => keys.has(entry.controllerSessionKey?.trim() || entry.requesterSessionKey) });
			throw new Error("Subagent session-list facts must be prepared before synchronous reads");
		}
		return getSubagentRunsSnapshot(inMemoryRuns, cache, {
			fresh: true,
			load: () => indexedSnapshotRows(cached, lookup.selectControllers(keys)),
			matches: (entry) => keys.has(entry.controllerSessionKey?.trim() || entry.requesterSessionKey)
		});
	}
	return getSubagentRunsSnapshot(inMemoryRuns, persistedSubagentSessionListRunsReadCache);
}
function getSubagentSessionTreeSnapshot(inMemoryRuns, sessionKeys, cache, load) {
	if (!sessionKeys.some((key) => key.trim())) return /* @__PURE__ */ new Map();
	const cached = shouldReadPersistedSubagentRuns() ? getPersistedSubagentRunsSnapshot(cache) : null;
	const indexed = (cached ? getSessionListLookup(cache, cached) : void 0)?.selectSessions(sessionKeys, inMemoryRuns.values());
	let selected = indexed?.sessionKeys ?? collectSubagentSessionReadKeys(sessionKeys, cached?.values() ?? [], inMemoryRuns.values());
	return getSubagentRunsSnapshot(inMemoryRuns, cache, {
		fresh: true,
		borrowPersisted: true,
		load: () => {
			if (cached) return indexed ? indexedSnapshotRows(cached, indexed.cacheKeys) : cached.values();
			if (!load) throw new Error("Subagent session-list facts must be prepared before synchronous reads");
			const snapshot = load();
			if (snapshot.complete) {
				applySubagentRunChanges(snapshot.runs, cache.state.changes);
				snapshot.sessionKeys = collectSubagentSessionReadKeys(sessionKeys, snapshot.runs.values(), inMemoryRuns.values());
				const admission = cache.captureAdmission?.();
				cache.state = {
					snapshot: snapshot.runs,
					changes: retainUnpublishedSubagentChanges(cache.state.changes),
					admission,
					sourceIdentity: admission?.identity.key
				};
			}
			selected = snapshot.sessionKeys;
			return snapshot.runs.values();
		},
		matches: (entry) => selected.has(entry.childSessionKey.trim())
	});
}
/** Exact rows share the owner snapshot while projecting only their complete requester trees. */
function getSubagentSessionListRunsSnapshotForSessions(inMemoryRuns, sessionKeys) {
	return getSubagentSessionTreeSnapshot(inMemoryRuns, sessionKeys, persistedSubagentSessionListRunsReadCache);
}
/** Settlement reads retain the canonical codec and raw local reservation ownership. */
function getSubagentRunsSnapshotForSessions(inMemoryRuns, sessionKeys) {
	return getSubagentSessionTreeSnapshot(inMemoryRuns, sessionKeys, persistedSubagentRunsReadCache, () => loadSubagentRunsForSessionsFromSqlite(sessionKeys, inMemoryRuns.values()));
}
function getSubagentRunsSnapshotForController(inMemoryRuns, controllerSessionKey) {
	const key = controllerSessionKey.trim();
	if (!key) return /* @__PURE__ */ new Map();
	return getSubagentRunsSnapshot(inMemoryRuns, persistedSubagentRunsReadCache, {
		selectCached: (lookup) => lookup.selectControllers(/* @__PURE__ */ new Set([key])),
		load: () => loadSubagentRunsForControllerFromSqlite(key),
		matches: (entry) => (entry.controllerSessionKey?.trim() || entry.requesterSessionKey) === key
	});
}
function getSubagentRunsSnapshotForChildSession(inMemoryRuns, childSessionKey) {
	const key = childSessionKey.trim();
	if (!key) return /* @__PURE__ */ new Map();
	return getSubagentRunsSnapshot(inMemoryRuns, persistedSubagentRunsReadCache, {
		selectCached: (lookup) => lookup.selectChildren(/* @__PURE__ */ new Set([key])),
		load: () => loadSubagentRunsForChildSessionFromSqlite(key),
		matches: (entry) => entry.childSessionKey === key
	});
}
//#endregion
export { waitForPendingSubagentRegistryWrites as A, readFullSubagentRuns as C, captureSubagentRunMutationSnapshot as D, assertSubagentRegistryWriteSourceCurrent as E, publishSubagentRunPostimages as O, assertSubagentReadContext as S, assertSubagentRegistryWriteOutcomeKnown as T, prepareSubagentRunsSnapshotForRunIds as _, getSubagentRunsSnapshotForController as a, restoreSubagentRunsFromDisk as b, getSubagentSessionListReadSnapshotIdentity as c, getSubagentSessionListRunsSnapshotForSessions as d, onSubagentRegistryPersisted as f, prepareOptionalSubagentSessionListReadCache as g, persistSubagentRunsToDiskOrThrow as h, getSubagentRunsSnapshotForChildSession as i, withSubagentRegistryWriteAuthority as j, waitForPendingSubagentKillClaim as k, getSubagentSessionListRunsSnapshotForChildSessions as l, persistSubagentRunsToDiskAsyncOrThrow as m, createSubagentSessionListReadView as n, getSubagentRunsSnapshotForRead as o, persistSubagentRunsToDisk as p, getSubagentMaintenanceRunsSnapshotForRead as r, getSubagentRunsSnapshotForSessions as s, clearSubagentRunsReadCacheForTest as t, getSubagentSessionListRunsSnapshotForRead as u, prepareSubagentSessionListReadCache as v, SubagentRegistryWriteError as w, withSubagentRunReadSnapshot as x, publishSubagentRunsAfterAtomicStore as y };
