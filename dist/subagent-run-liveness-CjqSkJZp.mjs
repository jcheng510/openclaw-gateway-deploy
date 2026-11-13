import { h as finiteSecondsToTimerSafeMilliseconds, o as asDateTimestampMs } from "./number-coercion-Dq1l5muL.mjs";
import { t as createDeferredCore } from "./deferred-D0La5CRk.mjs";
import { i as resolveGlobalSingleton } from "./global-singleton-BfHBYj6Y.mjs";
import { n as sessionChanges } from "./session-row-changes-DFigA589.mjs";
import { p as hasLiveAgentRunContext } from "./agent-run-registry-BDW3IRlF.mjs";
import { l as ownsSwarmRunReservation } from "./swarm-scheduler-CHKCkll9.mjs";
import "./subagent-lifecycle-events-CDQCTuLB.mjs";
import { n as getSubagentSessionStartedAt } from "./subagent-session-metrics-BQO41Z67.mjs";
import { isDeepStrictEqual } from "node:util";
//#region src/agents/subagents/completion/session-followup-cohort.ts
const owners = resolveGlobalSingleton(Symbol.for("openclaw.sessions.followupCohorts"), () => /* @__PURE__ */ new WeakMap());
function getFollowupCohortOwner(entry) {
	return owners.get(entry);
}
function bindFollowupCohortOwner(entry, owner) {
	owners.set(entry, owner);
}
function transferFollowupCohort(previous, next) {
	const owner = owners.get(previous);
	if (!owner) return () => {};
	owners.set(next, owner);
	return owner.replaceCohortEntry(previous, next);
}
//#endregion
//#region src/agents/subagents/registry/subagent-registry-publication.ts
let revision = 0;
const listeners = /* @__PURE__ */ new Set();
function subscribeSubagentRunChanges(listener) {
	listeners.add(listener);
	return () => {
		listeners.delete(listener);
	};
}
/** Read projections reuse registry facts until an owner publishes a mutation. */
function getSubagentRegistryPublicationRevision() {
	return revision;
}
function publishSubagentRunChanges(keys, runIds) {
	revision++;
	for (const listener of listeners) listener(runIds);
	if (!keys?.length) sessionChanges.emit({
		all: true,
		scope: "subagent-runs"
	});
	for (const sessionKey of new Set(keys)) if (sessionKey) sessionChanges.emit({
		sessionKey,
		scope: "runtime"
	});
}
//#endregion
//#region src/agents/subagents/registry/subagent-run-id-lookup.ts
/** Derived exact/collector membership; the publishing Map remains the record owner. */
var SubagentRunIdLookup = class {
	#memberships = /* @__PURE__ */ new Map();
	#byId = /* @__PURE__ */ new Map();
	#nextOrder = 0;
	constructor(entries = []) {
		for (const [key, entry] of entries) this.set(key, entry);
	}
	set(cacheKey, entry) {
		const previous = this.#memberships.get(cacheKey);
		if (previous) {
			if (entry && previous.runId === entry.runId && previous.swarmRunId === entry.swarmRunId) return;
			for (const id of [previous.runId, previous.swarmRunId]) {
				if (!id) continue;
				const bucket = this.#byId.get(id);
				bucket?.delete(previous);
				if (bucket?.size === 0) this.#byId.delete(id);
			}
			this.#memberships.delete(cacheKey);
		}
		if (!entry) return;
		const membership = {
			cacheKey,
			runId: entry.runId,
			swarmRunId: entry.swarmRunId,
			order: previous?.order ?? this.#nextOrder++
		};
		this.#memberships.set(cacheKey, membership);
		for (const id of [membership.runId, membership.swarmRunId]) if (id) {
			const bucket = this.#byId.get(id) ?? /* @__PURE__ */ new Set();
			bucket.add(membership);
			this.#byId.set(id, bucket);
		}
	}
	/** Keep snapshot order, including persisted rows that entered the selection through live facts. */
	select(ids, additionalCacheKeys = []) {
		const selected = /* @__PURE__ */ new Set();
		for (const id of ids) for (const membership of this.#byId.get(id) ?? []) selected.add(membership);
		for (const key of additionalCacheKeys) {
			const membership = this.#memberships.get(key);
			if (membership) selected.add(membership);
		}
		return [...selected].toSorted((left, right) => left.order - right.order).map((membership) => membership.cacheKey);
	}
};
//#endregion
//#region src/agents/subagents/registry/subagent-registry-memory.ts
/**
* Process-local live subagent run map.
*
* Shared by registry read/write helpers for active in-memory run state.
*/
const collectorRunIdByChildSessionKey = /* @__PURE__ */ new Map();
const runsByChildSessionKey = /* @__PURE__ */ new Map();
const runsByRequesterSessionKey = /* @__PURE__ */ new Map();
const runsByCollectorGroupKey = /* @__PURE__ */ new Map();
function collectorGroupKey(entry) {
	if (entry.collect !== true || !entry.groupId) return;
	return JSON.stringify([entry.swarmRequesterSessionKey ?? entry.requesterSessionKey, entry.groupId]);
}
function removeIndexedSubagentRun(index, key, runId, entry) {
	if (!key) return;
	const indexedRuns = index.get(key);
	if (indexedRuns?.get(runId) !== entry) return;
	indexedRuns.delete(runId);
	if (indexedRuns.size === 0) index.delete(key);
}
function indexSubagentRun(index, key, runId, entry) {
	if (!key) return;
	const indexedRuns = index.get(key);
	if (indexedRuns) indexedRuns.set(runId, entry);
	else index.set(key, /* @__PURE__ */ new Map([[runId, entry]]));
}
const retirementPublications = /* @__PURE__ */ new WeakMap();
function waitForSubagentRetirementPublication(entry) {
	const pending = retirementPublications.get(entry);
	if (!pending?.size) return;
	return Promise.all([...pending].map((publication) => publication.promise)).then(() => void 0);
}
function hasPendingSubagentRetirementPublication(entry) {
	return Boolean(retirementPublications.get(entry)?.size);
}
function completeRetirementPublication(scope) {
	const publication = scope.publication;
	if (publication.settled) return;
	publication.settled = true;
	const pending = retirementPublications.get(publication.entry);
	pending?.delete(publication);
	if (pending?.size === 0) retirementPublications.delete(publication.entry);
	publication.resolve();
}
var SubagentRunMap = class extends Map {
	constructor(..._args) {
		super(..._args);
		this.runIdLookup = new SubagentRunIdLookup();
		this.retirementScopes = /* @__PURE__ */ new Set();
		this.registrationScopes = /* @__PURE__ */ new Set();
		this.completionAuthorities = /* @__PURE__ */ new Map();
		this.operatorCompletionEntries = /* @__PURE__ */ new WeakSet();
		this.retiredCompletionEntries = /* @__PURE__ */ new WeakSet();
	}
	retireCompletionAuthority(entry) {
		this.retiredCompletionEntries.add(entry);
		this.releaseCompletionAuthority(entry);
	}
	isCompletionAuthorityRetired(entry) {
		return this.retiredCompletionEntries.has(entry);
	}
	bindCompletionAuthority(entry, authority) {
		authority.assertCurrent();
		if (this.retiredCompletionEntries.has(entry) && this.get(entry.runId) !== entry) throw new Error("Subagent completion retry no longer owns its source");
		this.releaseCompletionAuthority(entry);
		this.retiredCompletionEntries.delete(entry);
		const custody = {
			authority,
			entry,
			stop: () => authority.signal.removeEventListener("abort", revoked)
		};
		const revoked = () => this.releaseCompletionAuthority(custody.entry);
		this.completionAuthorities.set(entry, custody);
		this.operatorCompletionEntries.add(entry);
		authority.signal.addEventListener("abort", revoked, { once: true });
		if (authority.signal.aborted) revoked();
	}
	releaseCompletionAuthority(entry) {
		const custody = this.completionAuthorities.get(entry);
		this.completionAuthorities.delete(entry);
		custody?.stop();
		custody?.authority.release();
	}
	assertCompletionEntryCurrent(entry) {
		if (this.retiredCompletionEntries.has(entry)) throw new Error("Subagent completion requester store was retired");
		if (this.operatorCompletionEntries.has(entry) && this.get(entry.runId) !== entry) throw new Error("Subagent completion authority is no longer active");
	}
	runWithCompletionAuthority(entry, run) {
		this.assertCompletionEntryCurrent(entry);
		const custody = this.completionAuthorities.get(entry);
		if (entry.endedReason === "subagent-killed" && entry.execution.outcome?.status === "error") return run();
		if (this.operatorCompletionEntries.has(entry) && !custody) throw new Error("Subagent completion authority is no longer active");
		return custody ? custody.authority.run(run) : run();
	}
	runWithCompletionBatchAuthority(batch, run) {
		batch.forEach((entry) => this.assertCompletionEntryCurrent(entry));
		const resultEntry = batch.find((entry) => !(entry.endedReason === "subagent-killed" && entry.execution.outcome?.status === "error"));
		if (!resultEntry) return run();
		const first = this.completionAuthorities.get(resultEntry)?.authority.operatorAuthority;
		for (const entry of batch) {
			const source = this.completionAuthorities.get(entry)?.authority.operatorAuthority;
			if (this.operatorCompletionEntries.has(entry) && !source) throw new Error("Subagent completion authority is no longer active");
			source?.assertCurrent();
			if (source?.source !== first?.source || !isDeepStrictEqual(source?.scopes, first?.scopes)) throw new Error("Subagent completion batch has incompatible operator authority");
		}
		return this.runWithCompletionAuthority(resultEntry, run);
	}
	/** Same-task replacement stages custody before publication and can restore it on rollback. */
	transferCompletionAuthority(previous, next) {
		const restoreFollowup = transferFollowupCohort(previous, next);
		if (this.retiredCompletionEntries.has(previous)) this.retiredCompletionEntries.add(next);
		if (this.operatorCompletionEntries.has(previous)) this.operatorCompletionEntries.add(next);
		const custody = this.completionAuthorities.get(previous);
		if (!custody) return restoreFollowup;
		this.completionAuthorities.delete(previous);
		custody.entry = next;
		this.completionAuthorities.set(next, custody);
		this.operatorCompletionEntries.add(next);
		return () => {
			restoreFollowup();
			if (this.completionAuthorities.get(next) === custody) {
				this.completionAuthorities.delete(next);
				custody.entry = previous;
				this.completionAuthorities.set(previous, custody);
			}
		};
	}
	/** Only acknowledged registry state retires custody; tentative map writes can roll back. */
	settleCompletionAuthorities(committed, changedRunIds) {
		const changed = changedRunIds && new Set(changedRunIds);
		for (const entry of this.completionAuthorities.keys()) {
			if (changed && !changed.has(entry.runId)) continue;
			const record = committed.get(entry.runId);
			if (!record || this.get(entry.runId) !== entry || record.generation !== entry.generation || record.execution.suppressSessionEffects === true || !record.requesterTurnRunId && !record.requesterSettleWake && record.pauseReason !== "sessions_yield" && (record.cleanupCompletedAt !== void 0 || record.delivery?.status === "suspended" || record.delivery?.status === "discarded" || record.suppressCompletionDelivery === true)) this.releaseCompletionAuthority(entry);
		}
	}
	/** A cancellation borrows retirement evidence only for its own lexical lifetime. */
	captureRetirement(entry, isSuccessor) {
		const { promise, resolve } = createDeferredCore();
		const publication = {
			entry,
			promise,
			resolve,
			settled: false
		};
		const scope = {
			observation: {
				entry,
				generation: entry.generation,
				createdAt: entry.createdAt,
				state: "selected"
			},
			isSuccessor,
			publication
		};
		this.retirementScopes.add(scope);
		const pending = retirementPublications.get(entry);
		if (pending) pending.add(publication);
		else retirementPublications.set(entry, /* @__PURE__ */ new Set([publication]));
		return {
			get observation() {
				return scope.observation;
			},
			completePublication: () => completeRetirementPublication(scope),
			release: () => {
				completeRetirementPublication(scope);
				scope.observation = { state: "superseded" };
				this.retirementScopes.delete(scope);
			}
		};
	}
	/** A committed successor remains superseding even if it retires before preparation finishes. */
	captureRegistrationOwnership(childSessionKey, expectedEntry) {
		const scope = {
			childSessionKey,
			current: true,
			expectedEntry
		};
		this.registrationScopes.add(scope);
		return {
			assertCurrent: () => {
				if (!scope.current) throw new Error("Subagent registration owner changed during preparation");
			},
			release: () => {
				scope.current = false;
				this.registrationScopes.delete(scope);
			}
		};
	}
	/** Publish only accepted ownership, after synchronous registration/replacement rollback decisions. */
	commitOwnership(entry) {
		if (this.get(entry.runId) !== entry) return;
		for (const scope of this.registrationScopes) if (scope.childSessionKey === entry.childSessionKey && scope.expectedEntry !== entry) scope.current = false;
		for (const scope of this.retirementScopes) {
			const previous = scope.observation.entry;
			if (previous && previous !== entry && previous.childSessionKey === entry.childSessionKey && scope.isSuccessor(entry)) scope.observation = { state: "superseded" };
		}
		publishSubagentRunChanges([entry.childSessionKey], [entry.runId]);
	}
	/** Normal cleanup calls this only after its deletion commits; raw map deletion is not evidence. */
	confirmRetirement(entry) {
		for (const scope of this.retirementScopes) {
			const observed = scope.observation;
			if (observed.entry === entry && observed.state === "selected" && this.get(entry.runId) !== entry) observed.state = "retired";
		}
		publishSubagentRunChanges([entry.childSessionKey], [entry.runId]);
	}
	set(runId, entry) {
		const prev = this.get(runId);
		if (prev) {
			removeIndexedSubagentRun(runsByChildSessionKey, prev.childSessionKey, runId, prev);
			removeIndexedSubagentRun(runsByRequesterSessionKey, prev.requesterSessionKey, runId, prev);
			removeIndexedSubagentRun(runsByCollectorGroupKey, collectorGroupKey(prev), runId, prev);
			if (prev.collect === true && prev.childSessionKey) collectorRunIdByChildSessionKey.delete(prev.childSessionKey);
		}
		super.set(runId, entry);
		this.runIdLookup.set(runId, entry);
		indexSubagentRun(runsByChildSessionKey, entry.childSessionKey, runId, entry);
		indexSubagentRun(runsByRequesterSessionKey, entry.requesterSessionKey, runId, entry);
		indexSubagentRun(runsByCollectorGroupKey, collectorGroupKey(entry), runId, entry);
		if (entry.collect === true && entry.childSessionKey) collectorRunIdByChildSessionKey.set(entry.childSessionKey, runId);
		return this;
	}
	delete(runId) {
		this.runIdLookup.set(runId, void 0);
		const prev = this.get(runId);
		if (prev) {
			removeIndexedSubagentRun(runsByChildSessionKey, prev.childSessionKey, runId, prev);
			removeIndexedSubagentRun(runsByRequesterSessionKey, prev.requesterSessionKey, runId, prev);
			removeIndexedSubagentRun(runsByCollectorGroupKey, collectorGroupKey(prev), runId, prev);
		}
		if (prev?.collect === true && prev.childSessionKey && collectorRunIdByChildSessionKey.get(prev.childSessionKey) === runId) collectorRunIdByChildSessionKey.delete(prev.childSessionKey);
		return super.delete(runId);
	}
	clear() {
		for (const scope of this.registrationScopes) scope.current = false;
		this.registrationScopes.clear();
		for (const entry of this.completionAuthorities.keys()) this.releaseCompletionAuthority(entry);
		for (const scope of this.retirementScopes) {
			completeRetirementPublication(scope);
			scope.observation = { state: "superseded" };
		}
		this.retirementScopes.clear();
		super.clear();
		this.runIdLookup = new SubagentRunIdLookup();
		collectorRunIdByChildSessionKey.clear();
		runsByChildSessionKey.clear();
		runsByRequesterSessionKey.clear();
		runsByCollectorGroupKey.clear();
		publishSubagentRunChanges();
	}
};
const subagentRuns = new SubagentRunMap();
/** The live owner maintains identity changes; unowned Maps have no publication lifecycle. */
function getSubagentRunIdLookup(runs) {
	return runs instanceof SubagentRunMap ? runs.runIdLookup : new SubagentRunIdLookup(runs);
}
/** Iterate live generations for one child session without scanning the registry. */
function getSubagentRunsForChildSession(childSessionKey) {
	return runsByChildSessionKey.get(childSessionKey)?.values() ?? [];
}
/** Current requester-owned generations, without restoring or scanning retained rows. */
function getSubagentRunsForRequesterSession(requesterSessionKey) {
	return runsByRequesterSessionKey.get(requesterSessionKey)?.values() ?? [];
}
/** Iterate live collector members for one requester/group archive decision. */
function getSubagentRunsForCollectorGroup(requesterSessionKey, groupId, requesterAgentId) {
	const key = JSON.stringify([requesterSessionKey, groupId]);
	return [...runsByCollectorGroupKey.get(key)?.entries() ?? []].filter(([, entry]) => entry.requesterAgentId === requesterAgentId);
}
/** Resolve a collector tombstone that reserves its child session from ordinary turns. */
function findSwarmCollectorSession(childSessionKey) {
	const key = childSessionKey?.trim();
	if (!key) return;
	const runId = collectorRunIdByChildSessionKey.get(key);
	return runId ? subagentRuns.get(runId) : void 0;
}
/** Resolve the host-registered collector that authorizes a Gateway request. */
function findAuthorizedSwarmCollectorRequest(params) {
	const idempotencyKey = params.idempotencyKey?.trim();
	if (!idempotencyKey) return;
	const entry = findSwarmCollectorSession(params.childSessionKey);
	if (!entry) return;
	return entry.swarmLaunchIdempotencyKey === idempotencyKey && isDeepStrictEqual(entry.outputSchema, params.outputSchema) ? entry : void 0;
}
//#endregion
//#region src/agents/subagents/registry/subagent-run-timeout.ts
/**
* Subagent run timeout math.
*
* Separates timer-safe delays from duration/deadline values because setTimeout has stricter bounds.
*/
/** Convert subagent timeout seconds to a timer-safe delay. */
function resolveSubagentRunTimerDelayMs(timeoutSeconds) {
	return finiteSecondsToTimerSafeMilliseconds(timeoutSeconds, { floorSeconds: true });
}
/** Convert subagent timeout seconds to a finite millisecond duration. */
function resolveSubagentRunDurationMs(timeoutSeconds) {
	if (typeof timeoutSeconds !== "number" || !Number.isFinite(timeoutSeconds) || timeoutSeconds <= 0) return;
	const durationMs = Math.floor(timeoutSeconds) * 1e3;
	return Number.isSafeInteger(durationMs) && durationMs > 0 ? durationMs : void 0;
}
/** Resolve the absolute timeout deadline for a subagent run. */
function resolveSubagentRunDeadlineMs(entry, observedStartedAt) {
	const durationMs = resolveSubagentRunDurationMs(entry.runTimeoutSeconds);
	if (durationMs === void 0) return;
	const startedAt = typeof observedStartedAt === "number" && Number.isFinite(observedStartedAt) ? observedStartedAt : typeof entry.execution.startedAt === "number" && Number.isFinite(entry.execution.startedAt) ? entry.execution.startedAt : entry.collect ? void 0 : entry.createdAt;
	const safeStartedAt = asDateTimestampMs(startedAt);
	if (safeStartedAt === void 0) return;
	const deadlineMs = safeStartedAt + durationMs;
	return Number.isSafeInteger(deadlineMs) && asDateTimestampMs(deadlineMs) !== void 0 ? deadlineMs : void 0;
}
/** Clamp a reported terminal time to the run's explicit timeout deadline. */
function resolveSubagentRunEffectiveEndedAt(entry, endedAt, observedStartedAt) {
	const deadlineMs = resolveSubagentRunDeadlineMs(entry, observedStartedAt);
	return deadlineMs !== void 0 && endedAt > deadlineMs ? deadlineMs : endedAt;
}
//#endregion
//#region src/agents/subagents/registry/subagent-run-liveness.ts
/**
* Subagent run liveness policy.
*
* Ages out stale unended runs while keeping recent/composed child links visible.
*/
/** Routing metadata alone does not own an execution. */
function isSubagentRunLive(entry) {
	if (!entry || typeof entry.execution.endedAt === "number") return false;
	return hasLiveAgentRunContext(entry.runId);
}
/** Queued admission belongs to the exact current registration and scheduler reservation. */
function isSubagentRunQueued(entry) {
	const current = entry ? subagentRuns.get(entry.runId) : void 0;
	return Boolean(current && current === entry && current.collect && current.execution.status === "queued" && ownsSwarmRunReservation(current.schedulerSlotId ?? current.runId, current));
}
const STALE_UNENDED_SUBAGENT_RUN_MS = 72e5;
const RECENT_ENDED_SUBAGENT_CHILD_SESSION_MS = 18e5;
const EXPLICIT_TIMEOUT_STALE_GRACE_MS = 6e4;
const MIN_REALISTIC_RUN_TIMESTAMP_MS = Date.UTC(2020, 0, 1);
/** Return whether a subagent run has a finite execution end timestamp. */
function hasSubagentRunEnded(entry) {
	return typeof entry.execution.endedAt === "number" && Number.isFinite(entry.execution.endedAt);
}
function resolveStaleCutoffMs(entry) {
	const durationMs = resolveSubagentRunDurationMs(entry.runTimeoutSeconds);
	if (durationMs !== void 0) return Math.max(STALE_UNENDED_SUBAGENT_RUN_MS, durationMs + EXPLICIT_TIMEOUT_STALE_GRACE_MS);
	return STALE_UNENDED_SUBAGENT_RUN_MS;
}
/** Return whether an unended subagent run is stale enough to hide as inactive. */
function isStaleUnendedSubagentRun(entry, now = Date.now()) {
	if (hasSubagentRunEnded(entry)) return false;
	const startedAt = getSubagentSessionStartedAt(entry) ?? entry.createdAt;
	if (typeof startedAt !== "number" || !Number.isFinite(startedAt) || startedAt < MIN_REALISTIC_RUN_TIMESTAMP_MS) return false;
	return now - startedAt > resolveStaleCutoffMs(entry);
}
/** Admission/display retention includes current owners and a bounded registration grace.
* This is not an executor-liveness assertion; use isSubagentRunLive for that.
*/
function isRetainedUnendedSubagentRun(entry, now = Date.now()) {
	return !hasSubagentRunEnded(entry) && (isSubagentRunLive(entry) || isSubagentRunQueued(entry) || !isStaleUnendedSubagentRun(entry, now));
}
function isRecentlyEndedSubagentRun(entry, now = Date.now(), recentMs = RECENT_ENDED_SUBAGENT_CHILD_SESSION_MS) {
	if (!hasSubagentRunEnded(entry)) return false;
	return now - entry.execution.endedAt <= recentMs;
}
/** Return whether a child-session link should still appear in subagent listings. */
function shouldKeepSubagentRunChildLink(entry, options) {
	const now = options?.now ?? Date.now();
	return isRetainedUnendedSubagentRun(entry, now) || (options?.activeDescendants ?? 0) > 0 || isRecentlyEndedSubagentRun(entry, now);
}
//#endregion
export { subscribeSubagentRunChanges as C, publishSubagentRunChanges as S, getFollowupCohortOwner as T, hasPendingSubagentRetirementPublication as _, isSubagentRunLive as a, SubagentRunIdLookup as b, resolveSubagentRunDeadlineMs as c, findAuthorizedSwarmCollectorRequest as d, findSwarmCollectorSession as f, getSubagentRunsForRequesterSession as g, getSubagentRunsForCollectorGroup as h, isStaleUnendedSubagentRun as i, resolveSubagentRunEffectiveEndedAt as l, getSubagentRunsForChildSession as m, hasSubagentRunEnded as n, isSubagentRunQueued as o, getSubagentRunIdLookup as p, isRetainedUnendedSubagentRun as r, shouldKeepSubagentRunChildLink as s, RECENT_ENDED_SUBAGENT_CHILD_SESSION_MS as t, resolveSubagentRunTimerDelayMs as u, subagentRuns as v, bindFollowupCohortOwner as w, getSubagentRegistryPublicationRevision as x, waitForSubagentRetirementPublication as y };
