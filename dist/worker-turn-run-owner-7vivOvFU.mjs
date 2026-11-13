import { l as getAgentEventLifecycleGeneration, u as isAgentEventLifecycleGenerationCurrent } from "./agent-events-Cg4kQnvf.mjs";
import { s as getGatewayRestartDrainSignal } from "./gateway-work-admission-B4bQUVQ6.mjs";
import { _ as setActiveEmbeddedRunLifecycleGeneration } from "./run-state-DZ1sFvNP.mjs";
import { d as markDiagnosticRunProgress, n as closeDiagnosticEmbeddedRunOwner, r as createDiagnosticEmbeddedRunOwner, u as markDiagnosticOwnedToolActivity } from "./diagnostic-run-activity-CwdtVcLR.mjs";
import { o as createAgentRunRestartAbortError, s as createAgentRunSupersededAbortError } from "./run-termination-JCCL0TyS.mjs";
import { M as setActiveEmbeddedRun, i as clearActiveEmbeddedRun } from "./runs-BSJKmITf.mjs";
import { _ as sameWorkerSessionTurnClaim } from "./placement-record-CfXaWmIw.mjs";
//#region src/gateway/worker-environments/worker-turn-run-owner.ts
const activeOwners = /* @__PURE__ */ new Map();
function createWorkerTurnRunOwner(params) {
	const { claim, turn, sessionKey } = params;
	const controller = new AbortController();
	const signal = turn.abortSignal ? AbortSignal.any([turn.abortSignal, controller.signal]) : controller.signal;
	let closed = false;
	const lifecycleGeneration = turn.lifecycleGeneration ?? getAgentEventLifecycleGeneration();
	const startedAtMs = Date.now();
	const deadlineAtMs = startedAtMs + turn.timeoutMs;
	const diagnosticOwner = createDiagnosticEmbeddedRunOwner({
		sessionId: claim.sessionId,
		sessionKey,
		runId: claim.runId
	});
	const cancel = (reason) => {
		controller.abort(reason === "restart" ? createAgentRunRestartAbortError() : reason === "superseded" ? createAgentRunSupersededAbortError() : void 0);
	};
	const restartSignal = getGatewayRestartDrainSignal();
	const onRestart = () => cancel("restart");
	if (restartSignal.aborted) onRestart();
	else restartSignal.addEventListener("abort", onRestart, { once: true });
	const isCurrent = () => activeOwners.get(claim.sessionId) === owner && isAgentEventLifecycleGenerationCurrent(lifecycleGeneration) && params.placements.validateTurnClaim(claim);
	const owner = {
		claim,
		isCancelled: () => signal.aborted && isCurrent(),
		record: (event) => {
			if (signal.aborted || !isCurrent()) return;
			if (event.kind === "tool" && event.payload.phase !== "update") markDiagnosticOwnedToolActivity(diagnosticOwner, {
				toolName: event.payload.name,
				toolCallId: event.payload.toolCallId,
				phase: event.payload.phase === "start" ? "start" : "end",
				deadlineAtMs
			});
			else markDiagnosticRunProgress({
				sessionId: claim.sessionId,
				sessionKey,
				runId: claim.runId,
				reason: `worker:${event.kind}`
			});
		}
	};
	const queueMessage = async () => {
		throw new Error("Cloud worker turns do not support message injection");
	};
	const handle = {
		kind: "embedded",
		runId: claim.runId,
		startedAtMs,
		diagnosticOwner,
		closeDiagnostics: () => {
			restartSignal.removeEventListener("abort", onRestart);
			closed = true;
			closeDiagnosticEmbeddedRunOwner(diagnosticOwner);
			if (activeOwners.get(claim.sessionId) === owner) activeOwners.delete(claim.sessionId);
		},
		queueMessage,
		messageInjection: {
			isAvailable: () => false,
			queueMessage
		},
		isStreaming: () => false,
		isStopped: () => closed || signal.aborted,
		isAborted: () => signal.aborted,
		isAbortable: () => !closed && !signal.aborted,
		isCompacting: () => false,
		cancel,
		abort: cancel
	};
	setActiveEmbeddedRunLifecycleGeneration(handle, lifecycleGeneration);
	turn.replyOperation?.attachBackend(handle);
	setActiveEmbeddedRun(claim.sessionId, handle, sessionKey, turn.sessionFile, turn.agentId);
	if (!signal.aborted) activeOwners.set(claim.sessionId, owner);
	return {
		claim,
		sessionKey,
		signal,
		dispose: () => {
			turn.replyOperation?.detachBackend(handle);
			clearActiveEmbeddedRun(claim.sessionId, handle, sessionKey, turn.sessionFile);
		}
	};
}
function captureWorkerTurnLiveEventOwner(identity) {
	const owner = identity.sessionId ? activeOwners.get(identity.sessionId) : void 0;
	return owner && identity.turnClaim?.owner.kind === "worker" && sameWorkerSessionTurnClaim(owner.claim, identity.turnClaim) ? owner : void 0;
}
//#endregion
export { createWorkerTurnRunOwner as n, captureWorkerTurnLiveEventOwner as t };
