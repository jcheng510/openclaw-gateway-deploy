import { g as isFutureDateTimestampMs } from "../number-coercion-Dq1l5muL.mjs";
import { a as getGatewayContextResolver, r as getCanonicalGatewayContextResolver } from "../gateway-context-binding-VqB7gkMe.mjs";
import { a as getPluginRuntimeGatewayRequestScope, s as withPluginRuntimeGatewayContextResolver } from "../gateway-request-scope-Da9jAC9_.mjs";
import { t as createSubsystemLogger } from "../subsystem-CeqVSEVi.mjs";
import { d as getAgentRunLifecycleGeneration, f as hasAgentRunContextExecutionOwner, l as getAgentRunContext } from "../agent-run-registry-BDW3IRlF.mjs";
import { i as emitAgentEvent, l as getAgentEventLifecycleGeneration } from "../agent-events-Cg4kQnvf.mjs";
import { _ as retainGatewayRootWorkAdmissionContinuationScope } from "../gateway-work-admission-B4bQUVQ6.mjs";
import { v as loadExactSessionEntry } from "../session-accessor.sqlite-pending-inputs-BdT_Tg9N.mjs";
import { Z as readSessionSubmittedInput } from "../session-accessor-CGLseszP.mjs";
import { a as hasRestartRecoveryTerminalRun, n as getRestartRecoveryTerminalDeliveryEvidence } from "../restart-recovery-state-DXIMXTjg.mjs";
import { a as readAdmittedHarnessCompletionInput, c as withAgentHarnessCompletionAdmission, i as hasHarnessCompletionFinalReceipt, o as assertAgentHarnessCompletionScope, r as getOwedHarnessCompletionTask } from "../agent-harness-completion-recovery-Bd8kJDPx.mjs";
import { t as AGENT_INTERNAL_EVENT_TYPE_TASK_COMPLETION } from "../internal-event-contract-pF6FHp8g.mjs";
import { t as captureOperatorToolGatewayContinuationContext } from "../server-plugin-in-process-dispatch-B5twfTO5.mjs";
import { n as buildAnnounceIdempotencyKey } from "../announce-idempotency-CkUlnjaT.mjs";
import { l as formatAgentInternalEventsForPrompt } from "../subagent-completion-delivery-KuoAsUSV.mjs";
import { c as loadRequesterSessionEntry, n as isInternalAnnounceRequesterSession, o as resolveAnnounceOrigin, s as resolveSubagentCompletionOrigin, t as deliverSubagentAnnouncement } from "../subagent-announce-delivery-CoOIdkBH.mjs";
import { isDeepStrictEqual } from "node:util";
//#region src/agents/agent-harness-completion-custody.ts
const registryKey = Symbol.for("openclaw.agentHarnessCompletionCustody.registry");
const globalRegistry = globalThis;
const owners = globalRegistry[registryKey] ??= /* @__PURE__ */ new WeakMap();
function getCompletionOwner(custody, scope) {
	const owner = owners.get(custody);
	const expected = owner && getGatewayContextResolver(owner.scope);
	const actual = getGatewayContextResolver(scope);
	if (!owner || owner.scope.requesterSessionKey !== scope.requesterSessionKey || owner.scope.requesterAgentId !== scope.requesterAgentId || (expected && getCanonicalGatewayContextResolver(expected)) !== (actual && getCanonicalGatewayContextResolver(actual))) throw new Error("Harness completion custody does not own this requester");
	return owner;
}
/** Retains admitted completion work for this exact physical requester lifecycle. */
function captureAgentHarnessCompletionCustody(scope) {
	assertAgentHarnessCompletionScope(scope);
	const entry = loadRequesterSessionEntry(scope.requesterSessionKey, scope.requesterAgentId).entry;
	const expected = {
		sessionId: entry?.sessionId,
		lifecycleRevision: entry?.lifecycleRevision
	};
	return captureAgentHarnessCompletionCustodyOwner(scope, () => {
		const current = loadRequesterSessionEntry(scope.requesterSessionKey, scope.requesterAgentId).entry;
		if (current?.sessionId !== expected.sessionId || current?.lifecycleRevision !== expected.lifecycleRevision) throw new Error("Harness completion requester lifecycle was replaced");
	});
}
/** Capture during admission; assignment/recovery owners retain their own holds before yielding. */
async function captureAgentHarnessCompletionCustodyOwner(scopeInput, assertRequesterCurrent) {
	const scope = assertAgentHarnessCompletionScope(scopeInput);
	const resolver = getGatewayContextResolver(scope);
	const preparation = resolver ? withPluginRuntimeGatewayContextResolver(resolver, captureOperatorToolGatewayContinuationContext) : captureOperatorToolGatewayContinuationContext();
	if (!preparation) return;
	const root = retainGatewayRootWorkAdmissionContinuationScope();
	const captured = await preparation.catch((error) => {
		root?.release();
		throw error;
	});
	const releaseRoot = () => root?.release();
	captured.signal.addEventListener("abort", releaseRoot, { once: true });
	let references = 0;
	let executions = 0;
	const retain = (settled = false) => {
		captured.signal.throwIfAborted();
		references += 1;
		if (!settled) executions += 1;
		const lifetime = new AbortController();
		let executionSettled = settled;
		const settleExecution = () => {
			if (!executionSettled) {
				executionSettled = true;
				if (--executions === 0) {
					captured.signal.removeEventListener("abort", releaseRoot);
					releaseRoot();
				}
			}
		};
		const assertCurrent = () => {
			lifetime.signal.throwIfAborted();
			captured.signal.throwIfAborted();
			assertRequesterCurrent();
		};
		const custody = {
			signal: AbortSignal.any([lifetime.signal, captured.signal]),
			isCurrent: () => isAgentHarnessCompletionCustodyCurrent(custody, scope),
			retain() {
				assertCurrent();
				return retain(executionSettled);
			},
			settleExecution,
			release() {
				if (lifetime.signal.aborted) return;
				lifetime.abort(/* @__PURE__ */ new Error("Harness completion custody was released"));
				settleExecution();
				if (--references === 0) captured.release();
			}
		};
		owners.set(custody, {
			scope,
			run(run) {
				assertCurrent();
				return !executionSettled && root ? root.runSync(() => captured.run(run)) : captured.run(run);
			},
			emit(run) {
				assertCurrent();
				if (executionSettled) throw new Error("Harness execution custody was settled");
				captured.run(() => root ? root.runSync(run) : run());
			}
		});
		return custody;
	};
	try {
		captured.assertCurrent();
		assertRequesterCurrent();
		return retain();
	} catch (error) {
		root?.release();
		captured.release();
		throw error;
	}
}
/** Binds activity to one live native assignment, not a persisted Tasks projection. */
function createAgentHarnessCompletionEventSink(params) {
	const scope = assertAgentHarnessCompletionScope(params.scope);
	const owner = getCompletionOwner(params.completionCustody, scope);
	const runId = params.runId.trim();
	if (!runId) throw new Error("Harness native event assignment requires a run ID");
	const isSourceCurrent = params.isSourceCurrent;
	const generation = getAgentEventLifecycleGeneration();
	return (event) => owner.emit(() => {
		if (!isSourceCurrent()) throw new Error("Harness native event assignment was replaced");
		emitAgentEvent({
			stream: event.stream,
			data: event.data,
			runId,
			agentId: scope.requesterAgentId,
			lifecycleGeneration: generation
		});
	});
}
/** Only the completion SDK can enter retained authority; plugins cannot execute a callback in it. */
function runWithAgentHarnessCompletionCustody(custody, scope, run) {
	return getCompletionOwner(custody, scope).run(run);
}
/** Revalidate the retained source at asynchronous delivery effect boundaries. */
function isAgentHarnessCompletionCustodyCurrent(custody, scope) {
	try {
		return getCompletionOwner(custody, scope).run(() => true);
	} catch {
		return false;
	}
}
//#endregion
//#region src/agents/agent-harness-completion-delivery.ts
const log = createSubsystemLogger("agents/harness-completion-recovery");
function sameRequester(claim, entry) {
	return claim.sessionId === entry.sessionId && claim.lifecycleRevision === entry.lifecycleRevision;
}
function readCurrent(target) {
	const loaded = loadExactSessionEntry({
		...target,
		readConsistency: "latest"
	});
	return loaded?.sessionKey === target.sessionKey ? loaded.entry : void 0;
}
/** Only current process owners can hold admission before its input is committed. */
function hasLiveCompletionOwner(claim, runId) {
	const scope = getPluginRuntimeGatewayRequestScope();
	const admission = (scope?.resolveGatewayContext ? scope.resolveGatewayContext() : scope?.context)?.chatAbortControllers.get(runId);
	if (admission && admission.sessionKey === claim.requesterSessionKey && admission.sessionId === claim.sessionId && admission.agentId === claim.requesterAgentId && admission.lifecycleGeneration === getAgentRunLifecycleGeneration() && admission.projectSessionActive === true && !admission.registrationCleanupRequested && !admission.controller.signal.aborted && isFutureDateTimestampMs(admission.expiresAtMs)) return true;
	const context = getAgentRunContext(runId);
	return hasAgentRunContextExecutionOwner(runId) && context?.sessionKey === claim.requesterSessionKey && context.sessionId === claim.sessionId && context.agentId === claim.requesterAgentId;
}
/** Reconcile before any steer/direct path, including when a restored native parent has no live owner. */
function reconcileHarnessCompletionDelivery(params) {
	const entry = readCurrent(params);
	if (!entry) return "unowned";
	const receipt = getRestartRecoveryTerminalDeliveryEvidence(entry, params.sourceRunId);
	const claim = entry.restartRecoveryHarnessCompletion?.sourceRunId === params.sourceRunId ? entry.restartRecoveryHarnessCompletion : receipt?.harnessCompletion;
	if (!claim) return entry.restartRecoveryDeliverySourceRunId === params.sourceRunId || hasRestartRecoveryTerminalRun(entry, params.sourceRunId) || readSessionSubmittedInput({
		...params,
		sessionId: entry.sessionId
	}, `${params.sourceRunId}:user`) ? "blocked" : "unowned";
	if (claim.sourceRunId !== params.sourceRunId || params.taskRunId !== void 0 && claim.taskRunId !== params.taskRunId || claim.requesterAgentId !== params.agentId || claim.requesterSessionKey !== params.sessionKey || !sameRequester(claim, entry)) return "blocked";
	if (isDeepStrictEqual(receipt?.harnessCompletion, claim) && receipt !== void 0 && hasHarnessCompletionFinalReceipt(receipt)) return "delivered";
	if (!getOwedHarnessCompletionTask(claim, entry)) return "blocked";
	if (entry.status !== "running" || entry.mainRestartRecovery?.tombstone || entry.restartRecoveryDeliverySourceRunId !== claim.sourceRunId || entry.restartRecoveryHarnessCompletion?.taskId !== claim.taskId) return "blocked";
	const operationalRunId = entry.restartRecoveryDeliveryRunId;
	try {
		if (operationalRunId && hasLiveCompletionOwner(claim, operationalRunId)) return "pending";
		return readAdmittedHarnessCompletionInput({
			claim,
			entry,
			storePath: params.storePath,
			operationalRunId
		}) ? "pending" : "blocked";
	} catch (error) {
		log.warn(`Could not inspect harness completion custody for ${params.sessionKey}: ${String(error)}`);
		return "blocked";
	}
}
//#endregion
//#region src/plugin-sdk/agent-harness-completion.ts
/**
* Runtime SDK helpers for host-authorized agent harness completion delivery.
*/
const AGENT_HARNESS_COMPLETION_SOURCE_TOOL = "agent_harness_completion";
/** Delivers a completed harness task result back to the requester or parent session. */
async function deliverAgentHarnessCompletion(params) {
	const scope = assertAgentHarnessCompletionScope(params.scope);
	const completionCustody = params.completionCustody;
	const signal = completionCustody ? AbortSignal.any([completionCustody.signal, ...params.signal ? [params.signal] : []]) : params.signal;
	const requesterSessionKey = scope.requesterSessionKey;
	const childSessionKey = params.childSessionKey.trim();
	const childSessionId = params.childSessionId.trim();
	const taskLabel = params.taskLabel?.trim() || "Agent harness task";
	const announceType = params.announceType?.trim() || "Agent harness task";
	const statusLabel = params.statusLabel?.trim() || params.status;
	const eventStatus = mapHarnessCompletionStatus(params.status);
	const expectedRequester = params.expectedRequester;
	const requester = loadRequesterSessionEntry(requesterSessionKey, scope.requesterAgentId);
	const requesterSessionId = requester.entry?.sessionId;
	const requesterLifecycleRevision = requester.entry?.lifecycleRevision;
	const isRequesterCurrent = () => {
		if (completionCustody && !isAgentHarnessCompletionCustodyCurrent(completionCustody, scope)) return false;
		const current = loadRequesterSessionEntry(requesterSessionKey, scope.requesterAgentId).entry;
		return Boolean(requesterSessionId) && current?.sessionId === requesterSessionId && current?.lifecycleRevision === requesterLifecycleRevision && (!expectedRequester || current?.sessionId === expectedRequester.sessionId && current?.lifecycleRevision === expectedRequester.lifecycleRevision);
	};
	const isSourceSessionEffectsAllowed = () => !signal?.aborted && isRequesterCurrent() && params.isSourceSessionAdmissionAllowed();
	const requesterIsSubagent = isInternalAnnounceRequesterSession(requesterSessionKey);
	let directOrigin = scope.requesterOrigin;
	if (!requesterIsSubagent) directOrigin = resolveAnnounceOrigin(requester.entry, scope.requesterOrigin);
	const completionDirectOrigin = requesterIsSubagent || !directOrigin ? directOrigin : await resolveSubagentCompletionOrigin({
		childSessionKey,
		requesterSessionKey,
		requesterOrigin: directOrigin,
		childRunId: childSessionKey,
		spawnMode: "run",
		expectsCompletionMessage: true
	});
	const internalEvents = [{
		type: AGENT_INTERNAL_EVENT_TYPE_TASK_COMPLETION,
		source: "subagent",
		childSessionKey,
		childSessionId,
		announceType,
		taskLabel,
		status: eventStatus,
		statusLabel,
		result: params.result,
		replyInstruction: params.replyInstruction?.trim() || "Use the completed harness task result to continue or wrap up the parent task. If this is a channel session, send the visible response with the message tool instead of only writing a transcript final answer."
	}];
	const prompt = formatAgentInternalEventsForPrompt(internalEvents);
	const deliver = async () => {
		if (!requesterSessionId || !isRequesterCurrent()) return {
			delivered: false,
			path: "none",
			recoveryBlocked: true,
			error: "completion requester locator is missing or replaced"
		};
		if (requester.agentId && requester.storePath) {
			const custody = reconcileHarnessCompletionDelivery({
				agentId: requester.agentId,
				storePath: requester.storePath,
				sessionKey: requester.canonicalKey,
				sourceRunId: buildAnnounceIdempotencyKey(params.announceId),
				taskRunId: childSessionKey
			});
			if (custody === "delivered") return {
				delivered: true,
				path: "direct"
			};
			if (custody !== "unowned") return {
				delivered: false,
				path: "none",
				...custody === "pending" ? { recoveryPending: true } : { recoveryBlocked: true },
				error: custody === "pending" ? "completion is owned by requester recovery" : "completion recovery receipt or owner is unresolved"
			};
		}
		return await withAgentHarnessCompletionAdmission({
			scope,
			sourceSessionKey: childSessionKey,
			sourceRunId: buildAnnounceIdempotencyKey(params.announceId),
			requesterSessionId,
			requesterLifecycleRevision,
			isSourceCurrent: isSourceSessionEffectsAllowed
		}, () => deliverSubagentAnnouncement({
			requesterSessionKey,
			requesterAgentId: scope.requesterAgentId,
			isSourceSessionEffectsAllowed,
			triggerMessage: prompt,
			steerMessage: prompt,
			internalEvents,
			requesterSessionOrigin: scope.requesterOrigin,
			completionDirectOrigin: completionDirectOrigin ?? directOrigin,
			directOrigin,
			sourceSessionKey: childSessionKey,
			sourceTool: AGENT_HARNESS_COMPLETION_SOURCE_TOOL,
			isSourceSessionAdmissionAllowed: isSourceSessionEffectsAllowed,
			targetRequesterSessionKey: requesterSessionKey,
			requesterIsSubagent,
			expectsCompletionMessage: true,
			bestEffortDeliver: true,
			directIdempotencyKey: buildAnnounceIdempotencyKey(params.announceId),
			signal
		}));
	};
	const resolveGatewayContext = getGatewayContextResolver(scope);
	const deliverInGateway = () => resolveGatewayContext ? withPluginRuntimeGatewayContextResolver(resolveGatewayContext, deliver) : deliver();
	return completionCustody ? await runWithAgentHarnessCompletionCustody(completionCustody, scope, deliverInGateway) : await deliverInGateway();
}
function mapHarnessCompletionStatus(status) {
	if (status === "succeeded") return "ok";
	return "error";
}
/** Returns true when completion delivery reached a persistent direct or steered path. */
function isDurableAgentHarnessCompletionDelivery(delivery) {
	if (!delivery.delivered) return false;
	if (delivery.path === "steered") return true;
	if (delivery.path !== "direct") return false;
	const phases = Array.isArray(delivery.phases) ? delivery.phases : void 0;
	if (!phases) return true;
	return phases.some((phase) => phase.phase === "direct-primary" && phase.delivered && phase.path === "direct");
}
//#endregion
export { captureAgentHarnessCompletionCustody, createAgentHarnessCompletionEventSink, deliverAgentHarnessCompletion, isDurableAgentHarnessCompletionDelivery };
