import { a as getGatewayContextResolver, t as bindGatewayContextResolver } from "./gateway-context-binding-VqB7gkMe.mjs";
import "./gateway-request-scope-Da9jAC9_.mjs";
import { l as resolveAgentIdFromSessionKey } from "./session-key-BC4m_Ly5.mjs";
import { l as resolveSessionStorePathCore } from "./paths-CQ3zRaeb.mjs";
import { m as listAgentRunsForSession } from "./agent-run-registry-BDW3IRlF.mjs";
import { l as getAgentEventLifecycleGeneration, u as isAgentEventLifecycleGenerationCurrent } from "./agent-events-Cg4kQnvf.mjs";
import { r as getRuntimeConfig } from "./io.runtime-BOdk1dW9.mjs";
import "./config-D1R2igem.mjs";
import { i as prepareSqliteTargetFromSessionStorePath } from "./session-sqlite-target-YT3XOdWA.mjs";
import { h as isSessionWorkAdmissionActive, u as getSessionWorkAdmissionRelease } from "./session-lifecycle-admission-6HF8YqSN.mjs";
import { s as loadSessionEntry, u as patchSessionEntryCore } from "./session-accessor.sqlite-entry-C87Sde4p.mjs";
import "./session-accessor-CGLseszP.mjs";
import { s as withSessionEntryReadOnlyInWorker } from "./session-entry-read-runtime-e6OehipM.mjs";
import "./sessions-Db5eEwNA.mjs";
import { g as getSubagentRunsForRequesterSession, m as getSubagentRunsForChildSession } from "./subagent-run-liveness-CjqSkJZp.mjs";
import { o as getLatestSubagentRunByChildSessionKeyFromRuns } from "./subagent-registry-queries-Bq7e2tgq.mjs";
import { r as resolveCompletionFromSessionEntry } from "./subagent-session-reconciliation-qIgO4pZl.mjs";
import { n as isRequesterSettleWakeForRun } from "./subagent-requester-settle-identity-YP9sFnSh.mjs";
import { a as ownsSubagentSessionExecution, i as isRetiredSubagentSessionOwner, n as isRestartRecoveryLifecycleCurrent, r as isRetiredSubagentExecution, t as getRestartRecoveryReplayError } from "./subagent-registry-restart-recovery-helpers-C_c-tVv_.mjs";
//#region src/agents/subagents/registry/subagent-registry-restart-recovery-session.ts
function retainSessionOwner(storePath, sessionKey, sessionId) {
	const isCurrent = () => listAgentRunsForSession({
		sessionKey,
		sessionId
	}).length > 0 || isSessionWorkAdmissionActive(storePath, [sessionKey, sessionId]);
	return isCurrent() ? {
		isCurrent,
		released: getSessionWorkAdmissionRelease({
			scope: storePath,
			identities: [sessionKey, sessionId]
		})
	} : void 0;
}
async function loadSubagentRecoverySession(params) {
	const sessionKey = params.entry.childSessionKey.trim();
	const agentId = resolveAgentIdFromSessionKey(sessionKey);
	const storePath = resolveSessionStorePathCore(getRuntimeConfig().session?.store, { agentId });
	const sessionEntry = await withSessionEntryReadOnlyInWorker({
		storePath,
		sessionKey,
		projection: "list"
	}, () => {
		if (!params.isOwnerCurrent()) throw new Error("subagent recovery owner changed during session read");
	}, async (read) => {
		if (!read.ok) throw read.error;
		return read.value;
	});
	const retained = retainSessionOwner(storePath, sessionKey, sessionEntry?.sessionId);
	if (retained || params.entry.execution.restartRecovery || sessionEntry?.abortedLastRun === true || !isRetiredSubagentSessionOwner(params.entry, sessionEntry)) return {
		agentId,
		storePath,
		sessionEntry,
		retained
	};
	const { sessionId, lifecycleRevision, updatedAt } = sessionEntry;
	const target = {
		sessionKey,
		sessionId
	};
	const isCurrent = () => params.isOwnerCurrent() && isRetiredSubagentExecution(params.entry) && listAgentRunsForSession(target).length === 0 && !isSessionWorkAdmissionActive(storePath, [sessionKey, sessionId]);
	const interrupted = await patchSessionEntryCore({
		storePath,
		sessionKey
	}, (current) => {
		if (!isCurrent() || current.sessionId !== sessionId || current.lifecycleRevision !== lifecycleRevision || current.updatedAt !== updatedAt || !isRetiredSubagentSessionOwner(params.entry, current)) return null;
		return {
			...current,
			abortedLastRun: true
		};
	}, {
		assertCommitAllowed: () => {
			if (!isCurrent()) throw new Error("subagent orphan ownership changed before interruption commit");
		},
		replaceEntry: true,
		skipMaintenance: true
	});
	return interrupted ? {
		agentId,
		storePath,
		sessionEntry: interrupted
	} : null;
}
//#endregion
//#region src/agents/subagents/registry/subagent-registry-restart-recovery.ts
async function recoverInterruptedSubagentRow(params) {
	const { entry, runId } = params;
	const childSessionKey = entry.childSessionKey.trim();
	const lifecycleGeneration = getAgentEventLifecycleGeneration();
	const isGatewayCurrent = () => isAgentEventLifecycleGenerationCurrent(lifecycleGeneration) && params.isGatewayCurrent?.() !== false;
	const isCurrent = () => isGatewayCurrent() && params.isCurrent(runId, entry) && entry.pauseReason !== "sessions_yield" && entry.suppressAnnounceReason !== "steer-restart" && !entry.killIntent && !entry.killReconciliation && entry.execution.status !== "queued";
	if (!childSessionKey || !isCurrent()) return { status: "ignored" };
	const terminalError = getRestartRecoveryReplayError(entry);
	const replayTerminal = terminalError !== void 0;
	if (!replayTerminal && typeof entry.execution.endedAt === "number") return { status: "ignored" };
	try {
		const session = await loadSubagentRecoverySession({
			entry,
			isOwnerCurrent: isCurrent
		}).catch((error) => {
			if (!replayTerminal) throw error;
			params.warn("could not verify child session effects for saved terminal result", {
				runId,
				childSessionKey,
				error
			});
			return null;
		});
		if (!session && !replayTerminal || !isCurrent()) return { status: "deferred" };
		if (!replayTerminal && session?.retained?.isCurrent()) return {
			status: "handled",
			retained: session.retained
		};
		const physicalStorePath = session && !replayTerminal && !entry.execution.restartRecovery ? (await prepareSqliteTargetFromSessionStorePath(session.storePath, { agentId: session.agentId })).path : void 0;
		if (!isCurrent()) return { status: "deferred" };
		const sessionEntry = session?.sessionEntry;
		const sessionId = sessionEntry?.sessionId;
		const lifecycleRevision = sessionEntry?.lifecycleRevision;
		const lifecycleRunId = sessionEntry?.lifecycleRunId;
		const target = {
			sessionKey: childSessionKey,
			sessionId
		};
		const hasPendingRequesterSettleWake = () => {
			if (!session || !sessionId || lifecycleRunId !== runId || entry.execution.restartRecovery || !params.gatewayRuntime) return false;
			const children = new Map([...getSubagentRunsForRequesterSession(childSessionKey)].filter((child) => getLatestSubagentRunByChildSessionKeyFromRuns(getSubagentRunsForChildSession(child.childSessionKey), child.childSessionKey) === child).map((child) => [child.runId, child]));
			return [...children.values()].some((child) => {
				const wake = child.requesterSettleWake;
				return wake?.status === "dispatching" && wake.requesterYieldBatch === true && wake.rearmGeneration !== void 0 && isRequesterSettleWakeForRun({
					entry: child,
					runId,
					requesterSessionKey: childSessionKey,
					requesterAgentId: session.agentId,
					runsById: children
				}) && wake.batchRunIds?.every((id) => {
					const member = children.get(id);
					return member?.expectsCompletionMessage === true && !member.collect && member.completionRequesterSessionId === sessionId && member.requesterStorePath === physicalStorePath && member.requesterAgentId === session.agentId && !member.suppressCompletionDelivery && !member.killReconciliation?.suppressTaskDelivery && member.requesterSettleWake?.status === "dispatching" && member.requesterSettleWake.rearmGeneration === wake.rearmGeneration && member.requesterSettleWake.attemptCount === wake.attemptCount && getGatewayContextResolver(member)?.()?.recoveryRuntime === params.gatewayRuntime;
				});
			});
		};
		if (!replayTerminal && hasPendingRequesterSettleWake()) return { status: "handled" };
		const isChildSessionEffectsCurrent = () => {
			if (!session || !isGatewayCurrent()) return false;
			try {
				const current = loadSessionEntry({
					storePath: session.storePath,
					sessionKey: childSessionKey,
					clone: false
				});
				return current?.sessionId === sessionId && current?.lifecycleRevision === lifecycleRevision && current?.lifecycleRunId === lifecycleRunId && (!replayTerminal || current !== void 0 && ownsSubagentSessionExecution(entry, current)) && listAgentRunsForSession(target).length === 0 && !isSessionWorkAdmissionActive(session.storePath, [childSessionKey, sessionId]);
			} catch {
				return false;
			}
		};
		if (!replayTerminal && !isChildSessionEffectsCurrent()) return { status: "handled" };
		if (!replayTerminal && sessionEntry?.lifecycleRunId && ownsSubagentSessionExecution(entry, sessionEntry) && resolveCompletionFromSessionEntry(sessionEntry, Date.now(), { notBeforeMs: entry.execution.startedAt ?? entry.createdAt })) return { status: "ignored" };
		const receipt = entry.execution.restartRecovery;
		if (!replayTerminal && !receipt && sessionEntry?.abortedLastRun !== true && entry.execution.status !== "interrupted") return { status: "ignored" };
		const suppressSessionEffects = receipt !== void 0 && !isRestartRecoveryLifecycleCurrent(receipt) || sessionEntry?.lifecycleRunId !== void 0 && !ownsSubagentSessionExecution(entry, sessionEntry);
		const resolveGatewayContext = params.gatewayRuntime ? getGatewayContextResolver(params.gatewayRuntime) : void 0;
		if (resolveGatewayContext) bindGatewayContextResolver(entry, resolveGatewayContext);
		return {
			status: "terminal",
			isRecoveryCurrent: () => isCurrent() && (replayTerminal || isChildSessionEffectsCurrent() && !hasPendingRequesterSettleWake()),
			isChildSessionEffectsCurrent,
			error: terminalError ?? "Subagent execution was interrupted by a Gateway restart. Inspect retained session history and uncertain tool outcomes, then continue the child with a follow-up or assign replacement work.",
			endedAt: replayTerminal ? entry.execution.endedAt : void 0,
			suppressSessionEffects: suppressSessionEffects || void 0
		};
	} catch (error) {
		params.warn("failed to reconcile interrupted subagent execution", {
			runId,
			childSessionKey,
			error
		});
		return { status: "deferred" };
	}
}
//#endregion
export { recoverInterruptedSubagentRow };
