import { n as hasSubagentRunEnded, o as isSubagentRunQueued, r as isRetainedUnendedSubagentRun } from "./subagent-run-liveness-CjqSkJZp.mjs";
import { E as isDeliverySuspended } from "./subagent-registry.store.sqlite-DQWBMoqK.mjs";
import { i as recordLatestSubagentRun, n as latestSubagentRun, t as compareSubagentRunGeneration } from "./subagent-run-generation-DCkOHoP9.mjs";
//#region src/agents/subagents/registry/subagent-registry-read-topology.ts
const NO_DESCENDANTS = Object.freeze([]);
function resolveControllerSessionKey(entry) {
	return entry.controllerSessionKey?.trim() || entry.requesterSessionKey;
}
/** Mutable membership belongs to the resident index; query windows own time and liveness. */
function buildSubagentRunReadTopology(params) {
	const { runs } = params;
	const inMemoryDisplayByChildSessionKey = /* @__PURE__ */ new Map();
	const runsByChildSessionKey = /* @__PURE__ */ new Map();
	const latestRunsByChildSessionKey = /* @__PURE__ */ new Map();
	const runsByControllerSessionKey = /* @__PURE__ */ new Map();
	const swarmRunsByRequesterSessionKey = /* @__PURE__ */ new Map();
	const latestRunByRequesterAndChildSessionKey = /* @__PURE__ */ new Map();
	const descendantsBySessionKey = /* @__PURE__ */ new Map();
	let revision = {};
	const snapshotRunsByChildSessionKey = /* @__PURE__ */ new Map();
	const memoryRunsByChildSessionKey = /* @__PURE__ */ new Map();
	const memoryChildKeys = /* @__PURE__ */ new Map();
	const runKeys = /* @__PURE__ */ new Map();
	const groupingKeys = (entry) => [
		entry.childSessionKey.trim(),
		resolveControllerSessionKey(entry),
		entry.collect && entry.groupId ? entry.swarmRequesterSessionKey ?? "" : "",
		entry.requesterSessionKey
	];
	const positionsByIndex = /* @__PURE__ */ new Map();
	const updateBucket = (index, key, runId, entry) => {
		if (!key) return;
		const rows = index.get(key) ?? [];
		let positions = positionsByIndex.get(index);
		if (!positions) {
			positions = /* @__PURE__ */ new Map();
			positionsByIndex.set(index, positions);
		}
		const position = positions.get(runId);
		if (position !== void 0) {
			if (entry) rows[position] = entry;
			else {
				rows.splice(position, 1);
				positions.delete(runId);
				for (let next = position; next < rows.length; next++) {
					const row = rows[next];
					if (row) positions.set(row.runId, next);
				}
			}
		} else if (entry) {
			positions.set(runId, rows.length);
			rows.push(entry);
		}
		if (rows.length) index.set(key, rows);
		else index.delete(key);
	};
	for (const entry of params.inMemoryRuns ?? []) {
		const childSessionKey = entry.childSessionKey.trim();
		memoryChildKeys.set(entry.runId, childSessionKey);
		updateBucket(memoryRunsByChildSessionKey, childSessionKey, entry.runId, entry);
		if (!childSessionKey) continue;
		recordLatestSubagentRun(inMemoryDisplayByChildSessionKey, childSessionKey, entry);
	}
	const inputs = {
		runs,
		inMemoryRuns: new Set(inMemoryDisplayByChildSessionKey.values())
	};
	function patch(changes, inMemoryChanges) {
		descendantsBySessionKey.clear();
		revision = {};
		const affected = /* @__PURE__ */ new Map();
		const touch = (child) => {
			if (child && !affected.has(child)) affected.set(child, new Set((snapshotRunsByChildSessionKey.get(child) ?? []).map((entry) => runKeys.get(entry.runId)?.[3] ?? entry.requesterSessionKey)));
		};
		const groups = [
			snapshotRunsByChildSessionKey,
			runsByControllerSessionKey,
			swarmRunsByRequesterSessionKey
		];
		for (const [runId, entry] of changes) {
			const previous = runKeys.get(runId) ?? [];
			const next = entry ? groupingKeys(entry) : [];
			touch(previous[0] ?? "");
			touch(next[0] ?? "");
			groups.forEach((index, position) => {
				if (previous[position] && previous[position] !== next[position]) updateBucket(index, previous[position], runId);
				updateBucket(index, next[position] ?? "", runId, entry);
			});
			if (entry) {
				if (changes !== runs) runs.set(runId, entry);
				runKeys.set(runId, next);
			} else {
				runs.delete(runId);
				runKeys.delete(runId);
			}
		}
		for (const [runId, entry] of inMemoryChanges) {
			const previous = memoryChildKeys.get(runId) ?? "";
			const next = entry?.childSessionKey.trim() ?? "";
			touch(previous);
			touch(next);
			if (previous !== next) updateBucket(memoryRunsByChildSessionKey, previous, runId);
			updateBucket(memoryRunsByChildSessionKey, next, runId, entry);
			if (entry) memoryChildKeys.set(runId, next);
			else memoryChildKeys.delete(runId);
		}
		for (const [child, previousRequesters] of affected) {
			const rows = snapshotRunsByChildSessionKey.get(child) ?? [];
			const memory = latestSubagentRun(memoryRunsByChildSessionKey.get(child) ?? []);
			const latest = latestSubagentRun(rows);
			const previousMemory = inMemoryDisplayByChildSessionKey.get(child);
			if (previousMemory !== memory) {
				if (previousMemory) inputs.inMemoryRuns.delete(previousMemory);
				if (memory) inputs.inMemoryRuns.add(memory);
			}
			for (const [index, entry] of [[inMemoryDisplayByChildSessionKey, memory], [latestRunsByChildSessionKey, latest]]) if (entry) index.set(child, entry);
			else index.delete(child);
			const candidates = [.../* @__PURE__ */ new Set([...rows, ...memory ? [memory] : []])];
			if (candidates.length) runsByChildSessionKey.set(child, candidates);
			else runsByChildSessionKey.delete(child);
			const byRequester = /* @__PURE__ */ new Map();
			for (const row of rows) if (row.requesterSessionKey) recordLatestSubagentRun(byRequester, row.requesterSessionKey, row);
			for (const requester of /* @__PURE__ */ new Set([...previousRequesters, ...byRequester.keys()])) {
				const children = latestRunByRequesterAndChildSessionKey.get(requester) ?? /* @__PURE__ */ new Map();
				const entry = byRequester.get(requester);
				if (entry) children.set(child, entry);
				else children.delete(child);
				if (children.size) latestRunByRequesterAndChildSessionKey.set(requester, children);
				else latestRunByRequesterAndChildSessionKey.delete(requester);
			}
		}
	}
	patch(runs, /* @__PURE__ */ new Map());
	for (const [key, entry] of inMemoryDisplayByChildSessionKey) if (!runsByChildSessionKey.has(key)) runsByChildSessionKey.set(key, [entry]);
	function getDescendantRuns(rootSessionKey) {
		const root = rootSessionKey.trim();
		if (!root || !latestRunByRequesterAndChildSessionKey.has(root)) return NO_DESCENDANTS;
		const cached = descendantsBySessionKey.get(root);
		if (cached) return cached;
		const descendants = [];
		const pending = [root];
		const visited = new Set(pending);
		for (const requester of pending) for (const [childSessionKey, entry] of latestRunByRequesterAndChildSessionKey.get(requester) ?? []) {
			if (latestRunsByChildSessionKey.get(childSessionKey) !== entry) continue;
			descendants.push(entry);
			if (!visited.has(childSessionKey)) {
				visited.add(childSessionKey);
				pending.push(childSessionKey);
			}
		}
		descendantsBySessionKey.set(root, Object.freeze(descendants));
		return descendants;
	}
	return {
		inputs,
		get revision() {
			return revision;
		},
		getDescendantRuns,
		inMemoryDisplayByChildSessionKey,
		runsByChildSessionKey,
		latestRunsByChildSessionKey,
		runsByControllerSessionKey,
		swarmRunsByRequesterSessionKey,
		patch
	};
}
//#endregion
//#region src/agents/subagents/registry/subagent-registry-queries.ts
function resolveConcurrencyOwnerSessionKey(entry) {
	return entry.collect ? entry.swarmRequesterSessionKey?.trim() || resolveControllerSessionKey(entry) : resolveControllerSessionKey(entry);
}
function isDeliveryTerminalForRequesterSettle(entry) {
	return isDeliverySuspended(entry) || entry.delivery?.disposition === "delivered" || entry.delivery?.disposition === "intentional_non_delivery" || entry.delivery?.disposition === "permanent_failure";
}
function matchesSubagentRequesterSession(entry, requester) {
	return entry.completionRequesterSessionId === requester.sessionId && entry.completionRequesterLifecycleRevision === requester.lifecycleRevision;
}
/** Lists requester-owned runs, optionally scoped to a requester run or session incarnation. */
function listRunsForRequesterFromRuns(runs, requesterSessionKey, options) {
	const key = requesterSessionKey.trim();
	if (!key) return [];
	const requesterRunId = options?.requesterRunId?.trim();
	const requesterRun = requesterRunId ? runs.get(requesterRunId) : void 0;
	const requesterRunMatchesScope = requesterRun && requesterRun.childSessionKey === key ? requesterRun : void 0;
	const lowerBound = requesterRunMatchesScope?.execution.startedAt ?? requesterRunMatchesScope?.createdAt;
	const upperBound = requesterRunMatchesScope?.execution.endedAt;
	const latestRuns = options?.requesterSessionId === void 0 ? void 0 : buildLatestSubagentRunReadIndexFromRuns(runs);
	const results = [];
	for (const entry of runs.values()) if (entry.requesterSessionKey === key && (options?.requesterSessionId === void 0 || matchesSubagentRequesterSession(entry, {
		sessionId: options.requesterSessionId,
		lifecycleRevision: options.requesterLifecycleRevision
	})) && (!latestRuns || latestRuns.getLatestSubagentRun(entry.childSessionKey) === entry) && (!options?.requesterAgentId || entry.requesterAgentId === options.requesterAgentId) && (options?.requesterStorePath === void 0 || (entry.requesterStorePath ?? null) === options.requesterStorePath) && (typeof lowerBound !== "number" || entry.createdAt >= lowerBound) && (typeof upperBound !== "number" || entry.createdAt <= upperBound)) results.push(entry);
	return results;
}
function selectConnectedSettledSubagentWave(candidates, settledEntry) {
	const targetIndex = candidates.findIndex((entry) => entry.runId === settledEntry.runId);
	const target = candidates[targetIndex];
	if (!target) return [];
	const sorted = candidates.map((entry, originalIndex) => ({
		entry,
		originalIndex,
		endedAt: typeof entry.execution.endedAt === "number" ? entry.execution.endedAt : Number.MAX_SAFE_INTEGER
	})).toSorted((a, b) => a.entry.createdAt - b.entry.createdAt || a.endedAt - b.endedAt || a.originalIndex - b.originalIndex);
	const first = sorted[0];
	if (!first) return [];
	let componentStart = 0;
	let componentEnd = first.endedAt;
	let containsTarget = first.originalIndex === targetIndex;
	for (let index = 1; index <= sorted.length; index += 1) {
		const next = sorted[index];
		if (!next || next.entry.createdAt > componentEnd) {
			if (containsTarget) return [target, ...sorted.slice(componentStart, index).filter((item) => item.originalIndex !== targetIndex).toSorted((a, b) => a.originalIndex - b.originalIndex).map((item) => item.entry)];
			if (!next) break;
			componentStart = index;
			componentEnd = next.endedAt;
			containsTarget = next.originalIndex === targetIndex;
			continue;
		}
		componentEnd = Math.max(componentEnd, next.endedAt);
		containsTarget ||= next.originalIndex === targetIndex;
	}
	return [];
}
/** Lists runs controlled by the normalized controller session key. */
function listRunsForControllerFromRuns(runs, controllerSessionKey, controllerAgentId) {
	const key = controllerSessionKey.trim();
	const results = [];
	if (!key) return results;
	for (const entry of runs.values()) if (resolveControllerSessionKey(entry) === key && (!controllerAgentId || entry.requesterAgentId === controllerAgentId)) results.push(entry);
	return results;
}
/** Builds a reusable latest-generation lookup from one registry snapshot. */
function buildLatestSubagentRunReadIndexFromRuns(runs) {
	const latestRunByChildSessionKey = /* @__PURE__ */ new Map();
	for (const entry of runs.values()) {
		const childSessionKey = entry.childSessionKey.trim();
		if (!childSessionKey) continue;
		recordLatestSubagentRun(latestRunByChildSessionKey, childSessionKey, entry);
	}
	return { getLatestSubagentRun: (childSessionKey) => latestRunByChildSessionKey.get(childSessionKey.trim()) ?? null };
}
/** Builds a read index from snapshot and optional in-memory runs. */
function buildSubagentRunReadIndexFromRuns(params) {
	const { runs } = params;
	const now = params.now ?? Date.now();
	const topology = buildSubagentRunReadTopology(params);
	const { inputs, inMemoryDisplayByChildSessionKey, runsByChildSessionKey, latestRunsByChildSessionKey, runsByControllerSessionKey, swarmRunsByRequesterSessionKey, getDescendantRuns } = topology;
	const isRetainedReadRun = (entry, clock = now) => {
		if (isRetainedUnendedSubagentRun(entry, clock)) return true;
		if (hasSubagentRunEnded(entry) || entry.execution.status !== "queued") return false;
		const current = inMemoryDisplayByChildSessionKey.get(entry.childSessionKey.trim());
		return current !== void 0 && current.requesterSessionKey === entry.requesterSessionKey && compareSubagentRunGeneration(current, entry) === 0 && isSubagentRunQueued(current);
	};
	const atTime = (clock, captured) => {
		const activeDescendantCountBySessionKey = /* @__PURE__ */ new Map();
		const pendingDescendantCountBySessionKey = /* @__PURE__ */ new Map();
		const displayByChildSessionKey = /* @__PURE__ */ new Map();
		const getDisplaySubagentRun = (childSessionKey) => {
			const key = childSessionKey.trim();
			if (!key || !runsByChildSessionKey.has(key)) return null;
			if (displayByChildSessionKey.has(key)) return displayByChildSessionKey.get(key) ?? null;
			const selected = inMemoryDisplayByChildSessionKey.get(key) ?? latestSubagentRun(runsByChildSessionKey.get(key) ?? [], (entry) => captured?.has(entry) ?? isRetainedReadRun(entry, clock)) ?? latestRunsByChildSessionKey.get(key) ?? null;
			displayByChildSessionKey.set(key, selected);
			return selected;
		};
		const countActiveDescendantRuns = (rootSessionKey) => {
			const root = rootSessionKey.trim();
			const descendants = getDescendantRuns(root);
			if (!descendants.length) return 0;
			if (activeDescendantCountBySessionKey.has(root)) return activeDescendantCountBySessionKey.get(root) ?? 0;
			let count = 0;
			for (const entry of descendants) if (isRetainedReadRun(entry, clock)) count += 1;
			activeDescendantCountBySessionKey.set(root, count);
			return count;
		};
		const countPendingDescendantRunsInternal = (rootSessionKey, options) => {
			const excludedRunId = options?.excludeRunId?.trim();
			let count = 0;
			for (const entry of getDescendantRuns(rootSessionKey)) {
				if (entry.runId === excludedRunId) continue;
				if (options?.settledBefore !== void 0 && hasSubagentRunEnded(entry) && entry.execution.endedAt < options.settledBefore) continue;
				if (hasSubagentRunEnded(entry) ? typeof entry.cleanupCompletedAt !== "number" && !(options?.treatSuspendedDeliveryAsSettled === true && isDeliveryTerminalForRequesterSettle(entry)) : isRetainedReadRun(entry, clock)) {
					count += 1;
					if (options?.stopAtFirst === true) return count;
				}
			}
			return count;
		};
		const countPendingDescendantRuns = (rootSessionKey) => {
			const root = rootSessionKey.trim();
			if (!getDescendantRuns(root).length) return 0;
			if (pendingDescendantCountBySessionKey.has(root)) return pendingDescendantCountBySessionKey.get(root) ?? 0;
			const count = countPendingDescendantRunsInternal(root);
			pendingDescendantCountBySessionKey.set(root, count);
			return count;
		};
		const hasDescendantRunAwaitingSettle = (rootSessionKey, excludeRunId, settledBefore) => countPendingDescendantRunsInternal(rootSessionKey, {
			excludeRunId,
			settledBefore,
			treatSuspendedDeliveryAsSettled: true,
			stopAtFirst: true
		}) > 0;
		const listDescendantRunsForRequester = (rootSessionKey) => [...getDescendantRuns(rootSessionKey)];
		return {
			inputs,
			revision: topology.revision,
			atTime,
			patch,
			getDisplaySubagentRun,
			latestRunsByChildSessionKey,
			runsByChildSessionKey,
			countActiveDescendantRuns,
			countPendingDescendantRuns,
			hasDescendantRunAwaitingSettle,
			listDescendantRunsForRequester,
			runsByControllerSessionKey,
			swarmRunsByRequesterSessionKey
		};
	};
	function patch(changes, inMemoryChanges, clock = Date.now()) {
		topology.patch(changes, inMemoryChanges);
		return atTime(clock);
	}
	return atTime(now, new Set([...runs.values()].filter((entry) => isRetainedReadRun(entry))));
}
/**
* Returns the latest-generation run for a child session.
*
* `matches` narrows the candidates before the generation comparison, so callers
* that own a specific row class (a paused continuation target, say) select the
* newest row of that class rather than the newest row overall. Without it a
* sibling registered at a higher generation hides the row the caller owns.
*/
function getLatestSubagentRunByChildSessionKeyFromRuns(runs, childSessionKey, matches) {
	const key = childSessionKey.trim();
	if (!key) return;
	return latestSubagentRun(runs instanceof Map ? runs.values() : runs, (entry) => entry.childSessionKey === key && (!matches || matches(entry)));
}
/** Returns the preferred run for a child session, active first then latest ended. */
function getSubagentRunByChildSessionKeyFromRuns(runs, childSessionKey) {
	const key = childSessionKey.trim();
	if (!key) return null;
	let latestActive = null;
	let latestEnded = null;
	for (const entry of runs.values()) {
		if (entry.childSessionKey !== key) continue;
		if (isRetainedUnendedSubagentRun(entry)) {
			if (!latestActive || compareSubagentRunGeneration(entry, latestActive) > 0) latestActive = entry;
			continue;
		}
		if (!latestEnded || compareSubagentRunGeneration(entry, latestEnded) > 0) latestEnded = entry;
	}
	return latestActive ?? latestEnded;
}
/** Resolves the requester and delivery origin for the latest child-session run. */
function resolveRequesterForChildSessionFromRuns(runs, childSessionKey) {
	const latest = getLatestSubagentRunByChildSessionKeyFromRuns(runs, childSessionKey);
	if (!latest) return null;
	return {
		requesterSessionKey: latest.requesterSessionKey,
		requesterAgentId: latest.requesterAgentId,
		requesterOrigin: latest.requesterOrigin
	};
}
/** Returns whether post-completion announce should be skipped for a cleaned-up run. */
function shouldIgnorePostCompletionAnnounceForSessionFromRuns(runs, childSessionKey) {
	const latest = getLatestSubagentRunByChildSessionKeyFromRuns(runs, childSessionKey);
	return Boolean(latest && latest.spawnMode !== "session" && typeof latest.execution.endedAt === "number" && typeof latest.cleanupCompletedAt === "number" && latest.cleanupCompletedAt >= latest.execution.endedAt);
}
function listSwarmRunsForGroupFromRuns(runs, groupId, requesterSessionKey, requesterAgentId) {
	const key = groupId.trim();
	const requesterKey = requesterSessionKey?.trim();
	return [...runs.values()].filter((entry) => entry.collect === true && entry.groupId === key && (!requesterKey || (entry.swarmRequesterSessionKey ?? entry.requesterSessionKey) === requesterKey) && (!requesterAgentId || entry.requesterAgentId === requesterAgentId));
}
/** Counts active direct child runs plus completed children that still have pending descendants. */
function countActiveRunsForSessionFromRuns(runs, controllerSessionKey, options) {
	const key = controllerSessionKey.trim();
	if (!key) return 0;
	const now = Date.now();
	let readIndex;
	const latestByChildSessionKey = /* @__PURE__ */ new Map();
	for (const entry of runs.values()) {
		if (options?.collect !== void 0 && entry.collect === true !== options.collect) continue;
		if (resolveConcurrencyOwnerSessionKey(entry) !== key) continue;
		if (options?.requesterAgentId && entry.requesterAgentId !== options.requesterAgentId) continue;
		recordLatestSubagentRun(latestByChildSessionKey, entry.childSessionKey, entry);
	}
	let count = 0;
	for (const entry of latestByChildSessionKey.values()) {
		if (isRetainedUnendedSubagentRun(entry)) {
			count += 1;
			continue;
		}
		readIndex ??= buildSubagentRunReadIndexFromRuns({
			runs,
			now
		});
		if (readIndex.countPendingDescendantRuns(entry.childSessionKey) > 0) count += 1;
	}
	return count;
}
function scopeRootDescendantsToRequesterAgent(runs, rootSessionKey, requesterAgentId, requesterStorePath, rootRunIds) {
	return requesterAgentId || requesterStorePath !== void 0 || rootRunIds ? new Map([...runs].filter(([, entry]) => entry.requesterSessionKey !== rootSessionKey || (!rootRunIds || rootRunIds.has(entry.runId)) && (!requesterAgentId || entry.requesterAgentId === requesterAgentId) && (requesterStorePath === void 0 || (entry.requesterStorePath ?? null) === requesterStorePath))) : runs;
}
/** Counts live descendants under a requester/session tree. */
function countActiveDescendantRunsFromRuns(runs, rootSessionKey, requesterAgentId, requesterStorePath, rootRunIds) {
	return buildSubagentRunReadIndexFromRuns({ runs: scopeRootDescendantsToRequesterAgent(runs, rootSessionKey, requesterAgentId, requesterStorePath, rootRunIds) }).countActiveDescendantRuns(rootSessionKey);
}
/** Counts descendants that are live or ended but not yet cleaned up. */
function countPendingDescendantRunsFromRuns(runs, rootSessionKey) {
	return buildSubagentRunReadIndexFromRuns({ runs }).countPendingDescendantRuns(rootSessionKey);
}
/**
* True when any descendant below a root session has not reached a terminal
* settle. Differs from the pending count in one way: a run whose final
* delivery was suspended counts as settled — suspension is terminal for
* automatic announce retries, so requester-drain decisions must not wait on it.
*/
function hasDescendantRunAwaitingSettleFromRuns(runs, rootSessionKey, excludeRunId, requesterAgentId, requesterStorePath, settledBefore, rootRunIds) {
	return buildSubagentRunReadIndexFromRuns({ runs: scopeRootDescendantsToRequesterAgent(runs, rootSessionKey, requesterAgentId, requesterStorePath, rootRunIds) }).hasDescendantRunAwaitingSettle(rootSessionKey, excludeRunId, settledBefore);
}
/** Lists latest descendant runs under a requester/session tree. */
function listDescendantRunsForRequesterFromRuns(runs, rootSessionKey) {
	return buildSubagentRunReadIndexFromRuns({ runs }).listDescendantRunsForRequester(rootSessionKey);
}
//#endregion
export { countPendingDescendantRunsFromRuns as a, hasDescendantRunAwaitingSettleFromRuns as c, listRunsForRequesterFromRuns as d, listSwarmRunsForGroupFromRuns as f, shouldIgnorePostCompletionAnnounceForSessionFromRuns as g, selectConnectedSettledSubagentWave as h, countActiveRunsForSessionFromRuns as i, listDescendantRunsForRequesterFromRuns as l, resolveRequesterForChildSessionFromRuns as m, buildSubagentRunReadIndexFromRuns as n, getLatestSubagentRunByChildSessionKeyFromRuns as o, matchesSubagentRequesterSession as p, countActiveDescendantRunsFromRuns as r, getSubagentRunByChildSessionKeyFromRuns as s, buildLatestSubagentRunReadIndexFromRuns as t, listRunsForControllerFromRuns as u };
