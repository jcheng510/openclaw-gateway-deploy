import { l as resolveSessionStorePathCore } from "./paths-CQ3zRaeb.mjs";
import { h as readAgentDatabaseAdmissionRefusal } from "./agent-database-admission-CLYAvaL3.mjs";
import { o as resolveSqliteTargetFromSessionStorePath } from "./session-sqlite-target-YT3XOdWA.mjs";
import "./session-accessor-CGLseszP.mjs";
import { c as readSessionStoreSummaryReadOnly } from "./session-accessor.entry-D9NYIhaA.mjs";
import { performance } from "node:perf_hooks";
import { setImmediate } from "node:timers/promises";
//#region src/status/session-stores.ts
const SESSION_STORE_READ_SLICE_MS = 8;
function summarizeProjectionRows(projection, storePath, agentIds, recentLimit) {
	const rows = projection.selectEntries({
		storePath,
		sortBy: null
	});
	if (recentLimit !== 0) rows.sort((left, right) => (right.entry.updatedAt ?? 0) - (left.entry.updatedAt ?? 0) || (left.key < right.key ? -1 : left.key > right.key ? 1 : 0));
	const summarize = (selected) => ({
		count: selected.length,
		recent: selected.slice(0, recentLimit).map(({ key: sessionKey, entry }) => ({
			sessionKey,
			entry
		}))
	});
	if (recentLimit >= 0) {
		const byAgent = new Map(agentIds.map((agentId) => [agentId, {
			count: 0,
			recent: []
		}]));
		rows.forEach((row) => {
			const agent = byAgent.get(row.agentId);
			if (agent) {
				agent.count += 1;
				if (agent.count <= recentLimit) agent.recent.push({
					sessionKey: row.key,
					entry: row.entry
				});
			}
		});
		return {
			count: rows.length,
			recent: recentLimit === 0 ? [] : summarize(rows).recent,
			byAgent
		};
	}
	return {
		...summarize(rows),
		byAgent: new Map(agentIds.map((agentId) => [agentId, summarize(rows.filter((row) => row.agentId === agentId))]))
	};
}
/** One collection owns each physical store's bounded snapshot, including its agent windows. */
function createStatusSessionStoreReader(agentIds, recentLimit, options = {}) {
	const readSummary = options.readSummary ?? readSessionStoreSummaryReadOnly;
	const stores = /* @__PURE__ */ new Map();
	let sliceStartedAt = performance.now();
	return {
		stores,
		async read(storePath, agentId) {
			const path = resolveSqliteTargetFromSessionStorePath(storePath, { agentId }).path;
			if (agentId && readAgentDatabaseAdmissionRefusal(agentId)) return {
				path,
				count: 0,
				recent: []
			};
			let store = stores.get(path);
			if (!store) {
				try {
					const projection = options.projection;
					if (projection) do
						await projection.ensureMaterialized();
					while (projection.needsMaterialization);
					store = options.projection ? summarizeProjectionRows(options.projection, path, agentIds, recentLimit) : readSummary({
						...agentId ? { agentId } : {},
						storePath
					}, {
						agentIds,
						recentLimit
					});
				} catch (error) {
					if (!options.recoverReadError) throw error;
					store = options.recoverReadError(error);
				}
				stores.set(path, store);
				if (performance.now() - sliceStartedAt >= SESSION_STORE_READ_SLICE_MS) {
					await setImmediate();
					sliceStartedAt = performance.now();
				}
			}
			const summary = agentId ? store.byAgent.get(agentId) : store;
			return {
				path,
				count: summary?.count ?? 0,
				recent: summary?.recent ?? []
			};
		}
	};
}
/** Reads each physical store once, retaining retired agent namespaces in the aggregate. */
async function readStatusSessionStores(cfg, agents, recentLimit, projection) {
	const reader = createStatusSessionStoreReader(agents.map((agent) => agent.id), recentLimit, { projection });
	const byAgent = [];
	for (const agent of agents) byAgent.push({
		agent,
		...await reader.read(resolveSessionStorePathCore(cfg.session?.store, { agentId: agent.id }), agent.id)
	});
	return {
		paths: [...reader.stores.keys()],
		count: [...reader.stores.values()].reduce((count, store) => count + store.count, 0),
		recent: [...reader.stores.values()].flatMap((store) => store.recent),
		byAgent
	};
}
//#endregion
export { readStatusSessionStores as n, createStatusSessionStoreReader as t };
