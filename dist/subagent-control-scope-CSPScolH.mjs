import { n as normalizeAgentId } from "./agent-id-D1-Q6vR4.mjs";
import { A as parseAgentSessionKey, S as isSubagentSessionKey } from "./session-key-BC4m_Ly5.mjs";
import { g as resolveSessionAgentId } from "./agent-scope-L_eY3Hj7.mjs";
import { n as isSystemEventStoreCurrent } from "./system-event-ownership-Bp0P_EZz.mjs";
import { r as resolveStoredSubagentCapabilities } from "./subagent-capabilities-C-BoOoUd.mjs";
import { g as getSubagentRunsForRequesterSession, v as subagentRuns } from "./subagent-run-liveness-CjqSkJZp.mjs";
import { u as getSubagentSessionListRunsSnapshotForRead, x as withSubagentRunReadSnapshot } from "./subagent-registry-state-DbBqXjLM.mjs";
import { n as buildSubagentRunReadIndexFromRuns } from "./subagent-registry-queries-Bq7e2tgq.mjs";
import { a as getLatestLiveSubagentRunByChildSessionKey, d as listSubagentRunsForRequester, u as listSubagentRunsForController } from "./subagent-registry-read-DgbIKTmN.mjs";
import { n as resolveSubagentRequesterAgentId } from "./subagent-requester-owner-oCJlmSbG.mjs";
import { n as isRequesterSettleWakeForRun } from "./subagent-requester-settle-identity-YP9sFnSh.mjs";
import { a as resolveInternalSessionKey, o as resolveMainSessionAlias } from "./sessions-resolution-Dx_C5vfd.mjs";
import "./sessions-helpers-QGUN2_Kz.mjs";
import { i as observeSubagentExecution, n as captureSubagentListReadContext } from "./subagent-list-Cf2R9Ce6.mjs";
//#region src/agents/subagents/registry/subagent-control-scope.ts
/** Recent-run default window used by subagent control UI/tools. */
const DEFAULT_RECENT_MINUTES = 30;
/** Maximum recent-run window accepted by subagent control UI/tools. */
const MAX_RECENT_MINUTES = 1440;
/** Resolve caller routing before preparing its persisted capability facts. */
function resolveSubagentControllerIdentity(params) {
	const { mainKey, alias } = resolveMainSessionAlias(params.cfg);
	const callerRaw = params.agentSessionKey?.trim() || alias;
	const callerSessionKey = resolveInternalSessionKey({
		key: callerRaw,
		alias,
		mainKey
	});
	return {
		controllerSessionKey: callerSessionKey,
		controllerAgentId: resolveSessionAgentId({
			config: params.cfg,
			sessionKey: callerSessionKey,
			agentId: params.agentId
		}),
		callerSessionKey,
		callerIsSubagent: isSubagentSessionKey(callerSessionKey)
	};
}
/** Resolves which subagent runs the caller is allowed to control. */
function resolveSubagentController(params) {
	const identity = resolveSubagentControllerIdentity(params);
	if (!identity.callerIsSubagent) return {
		...identity,
		controlScope: "children"
	};
	const capabilities = resolveStoredSubagentCapabilities(identity.callerSessionKey, {
		cfg: params.cfg,
		agentId: identity.controllerAgentId,
		store: params.capabilityStore
	});
	return {
		...identity,
		controlScope: capabilities.controlScope
	};
}
function listControlledSubagentRunsForTurn(controller, requesterTurnRunId) {
	const controlledRuns = listSubagentRunsForController(controller.controllerSessionKey, controller.controllerAgentId);
	if (requesterTurnRunId === void 0) return controlledRuns;
	const requesterRuns = listSubagentRunsForRequester(controller.controllerSessionKey, { requesterAgentId: controller.controllerAgentId });
	const runsById = new Map(requesterRuns.filter((entry) => getLatestLiveSubagentRunByChildSessionKey(entry.childSessionKey) === entry).map((entry) => [entry.runId, entry]));
	return controlledRuns.filter((entry) => entry.requesterTurnRunId === requesterTurnRunId || isRequesterSettleWakeForRun({
		entry,
		runId: requesterTurnRunId,
		requesterSessionKey: controller.controllerSessionKey,
		requesterAgentId: controller.controllerAgentId,
		runsById
	}));
}
function resolveRunRequesterAgentId(entry, cfg) {
	if (entry.requesterAgentId) return entry.requesterAgentId;
	const parsed = parseAgentSessionKey(entry.requesterSessionKey)?.agentId;
	if (parsed || !cfg) return parsed;
	return resolveSubagentRequesterAgentId(cfg, entry);
}
function isSubagentRunVisibleToSession(entry, sessionKey, agentId, cfg) {
	const controllerKey = entry.controllerSessionKey?.trim();
	const requesterKey = entry.requesterSessionKey.trim();
	const requesterAgentId = resolveRunRequesterAgentId(entry, cfg);
	const controllerAgentId = (controllerKey ? parseAgentSessionKey(controllerKey)?.agentId : void 0) ?? requesterAgentId;
	const normalizedAgentId = normalizeAgentId(agentId);
	return controllerKey === sessionKey && controllerAgentId === normalizedAgentId || requesterKey === sessionKey && requesterAgentId === normalizedAgentId;
}
/** Builds one stable snapshot for controlled-run listing and descendant status reads. */
async function buildControlledSubagentRunsReadContext(controllerSessionKey, controllerAgentId, cfg, recentMinutes = 30) {
	const key = controllerSessionKey.trim();
	const agentId = controllerAgentId ?? parseAgentSessionKey(key)?.agentId;
	if (!key || !agentId) return {
		runs: [],
		list: captureSubagentListReadContext([], buildSubagentRunReadIndexFromRuns({ runs: /* @__PURE__ */ new Map() }), /* @__PURE__ */ new Map(), recentMinutes),
		getExecutionObservation: () => ({ state: "unknown" })
	};
	const select = (snapshot) => {
		const index = buildSubagentRunReadIndexFromRuns({
			runs: snapshot,
			inMemoryRuns: subagentRuns.values()
		});
		const visible = [...index.latestRunsByChildSessionKey.values()].filter((entry) => isSubagentRunVisibleToSession(entry, key, agentId, cfg));
		return {
			index,
			runIds: visible.map((entry) => entry.runId),
			sessionKeys: visible.filter((entry) => entry.pauseReason === "sessions_yield").map((entry) => entry.childSessionKey)
		};
	};
	return withSubagentRunReadSnapshot(subagentRuns, select, (selection, snapshot) => buildControlledReadContext(snapshot, selection.index, new Set(selection.runIds), recentMinutes));
}
function buildControlledReadContext(snapshot, readIndex, visibleIds, recentMinutes = 30) {
	const runs = [...snapshot.values()].filter((entry) => visibleIds.has(entry.runId));
	const list = captureSubagentListReadContext(runs, readIndex, snapshot, recentMinutes);
	return {
		runs: list.view.latest,
		list,
		getExecutionObservation: (entry) => observeSubagentExecution(entry, getSubagentRunsForRequesterSession(entry.childSessionKey))
	};
}
/** Cancellation consumes current ownership facts without hydrating retained result payloads. */
function listControlledSubagentRunFacts(controllerSessionKey, controllerAgentId, cfg) {
	if (!controllerAgentId) return [];
	return [...buildSubagentRunReadIndexFromRuns({ runs: getSubagentSessionListRunsSnapshotForRead(subagentRuns) }).latestRunsByChildSessionKey.values()].filter((entry) => isSubagentRunVisibleToSession(entry, controllerSessionKey, controllerAgentId, cfg));
}
function ensureSubagentControllerOwnsRun(params) {
	const controllerKey = params.entry.controllerSessionKey?.trim();
	const owner = controllerKey || params.entry.requesterSessionKey;
	const ownerStorePath = controllerKey ? params.entry.controllerStorePath : params.entry.requesterStorePath;
	const ownerAgentId = parseAgentSessionKey(owner)?.agentId ?? resolveRunRequesterAgentId(params.entry, params.cfg);
	const controllerAgentId = params.controller.controllerAgentId ?? parseAgentSessionKey(params.controller.controllerSessionKey)?.agentId;
	if (owner === params.controller.controllerSessionKey && ownerAgentId === controllerAgentId && (ownerStorePath === void 0 || isSystemEventStoreCurrent(owner, ownerStorePath, ownerAgentId))) return;
	return "Subagents can only control runs spawned from their own session.";
}
function getLatestOwnedSubagentRun(childSessionKey, agentId, cfg) {
	const ownerFilter = parseAgentSessionKey(childSessionKey) ? void 0 : agentId;
	return getLatestLiveSubagentRunByChildSessionKey(childSessionKey, ownerFilter ? (candidate) => resolveRunRequesterAgentId(candidate, cfg) === ownerFilter : void 0) ?? void 0;
}
function isCurrentSubagentRun(entry, cfg) {
	if (!cfg) return getLatestLiveSubagentRunByChildSessionKey(entry.childSessionKey) === entry;
	return getLatestOwnedSubagentRun(entry.childSessionKey, resolveRunRequesterAgentId(entry, cfg), cfg) === entry;
}
function isSameSubagentRunGeneration(live, snapshot) {
	return live.childSessionKey === snapshot.childSessionKey && live.runId === snapshot.runId && live.generation === snapshot.generation && live.createdAt === snapshot.createdAt;
}
//#endregion
export { getLatestOwnedSubagentRun as a, isSubagentRunVisibleToSession as c, resolveSubagentController as d, resolveSubagentControllerIdentity as f, ensureSubagentControllerOwnsRun as i, listControlledSubagentRunFacts as l, MAX_RECENT_MINUTES as n, isCurrentSubagentRun as o, buildControlledSubagentRunsReadContext as r, isSameSubagentRunGeneration as s, DEFAULT_RECENT_MINUTES as t, listControlledSubagentRunsForTurn as u };
