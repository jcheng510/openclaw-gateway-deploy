import { t as createLazyImportLoader } from "./lazy-promise-DGqyc4Y4.mjs";
import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { g as hasSqliteWorkerOutcomeUnknown } from "./sqlite-worker-operation-admission-BB758RIN.mjs";
import { r as captureOpenClawStateWorkerContext } from "./openclaw-state-worker-context-C_iAE7YK.mjs";
import { g as resolveSessionAgentId } from "./agent-scope-L_eY3Hj7.mjs";
import { l as getAgentEventLifecycleGeneration, u as isAgentEventLifecycleGenerationCurrent } from "./agent-events-Cg4kQnvf.mjs";
import { r as logVerbose } from "./globals-ChjEJkWj.mjs";
import { _ as startSessionWorkAdmissionInterruption, g as runExclusiveSessionLifecycleMutation, t as SESSION_WORK_ADMISSION_DRAIN_TIMEOUT_MS, v as waitForSessionWorkAdmissionRelease } from "./session-lifecycle-admission-6HF8YqSN.mjs";
import { a as createAgentRunDirectAbortError } from "./run-termination-JCCL0TyS.mjs";
import { t as isSessionDeliveryGenerationRevokedError } from "./session-delivery-generation-B5vrCPbg.mjs";
import { o as holdQueuedSwarmRun } from "./swarm-scheduler-CHKCkll9.mjs";
import { v as subagentRuns } from "./subagent-run-liveness-CjqSkJZp.mjs";
import "./subagent-lifecycle-events-CDQCTuLB.mjs";
import { M as resolveKilledSubagentTaskEndedAt, N as SUBAGENT_KILL_TASK_ERROR, O as persistSubagentAbortedLastRun, a as claimSubagentRunKill, h as markSubagentRunTerminated, i as cancelSubagentRequesterSettleWake, j as resolveFinalizedSubagentTaskState, k as prepareSubagentKillSession, x as releaseSubagentRunKillClaim } from "./subagent-registry-Dfg59-Q4.mjs";
import { E as assertSubagentRegistryWriteSourceCurrent, T as assertSubagentRegistryWriteOutcomeKnown, w as SubagentRegistryWriteError, x as withSubagentRunReadSnapshot } from "./subagent-registry-state-DbBqXjLM.mjs";
import { t as compareSubagentRunGeneration } from "./subagent-run-generation-DCkOHoP9.mjs";
import { u as listRunsForControllerFromRuns } from "./subagent-registry-queries-Bq7e2tgq.mjs";
import { d as listSubagentRunsForRequester, u as listSubagentRunsForController } from "./subagent-registry-read-DgbIKTmN.mjs";
import { n as resolveSubagentRequesterAgentId } from "./subagent-requester-owner-oCJlmSbG.mjs";
import { n as resolveSubagentLabel } from "./subagents-utils-DVlMB0me.mjs";
import { a as getLatestOwnedSubagentRun, i as ensureSubagentControllerOwnsRun, o as isCurrentSubagentRun, s as isSameSubagentRunGeneration } from "./subagent-control-scope-CSPScolH.mjs";
//#region src/agents/subagents/registry/subagent-control-kill-runtime.ts
/** Session-lifecycle mutation and persistence for subagent kills. */
const subagentKillRuntimeLoader = createLazyImportLoader(() => import("./subagent-control.runtime.js"));
function formatKillPersistenceError(error) {
	return formatErrorMessage(error instanceof SubagentRegistryWriteError ? error.cause : error);
}
function resolveSubagentKillTargetState(entry) {
	if (entry.endedReason === "subagent-killed" && entry.suppressAnnounceReason !== "steer-restart") {
		const taskEndedAt = resolveKilledSubagentTaskEndedAt(entry);
		return typeof taskEndedAt === "number" ? {
			state: "terminal",
			task: {
				status: "cancelled",
				endedAt: taskEndedAt,
				error: SUBAGENT_KILL_TASK_ERROR
			}
		} : void 0;
	}
	const terminal = resolveFinalizedSubagentTaskState(entry);
	if (terminal) return {
		state: "terminal",
		task: terminal
	};
	return typeof entry.execution.endedAt === "number" && entry.pauseReason !== "sessions_yield" && (entry.endedReason !== "subagent-killed" || entry.suppressAnnounceReason === "steer-restart") ? { state: "finalizing" } : void 0;
}
async function markSubagentRunTerminatedBestEffort(params) {
	try {
		return await markSubagentRunTerminated(params);
	} catch (error) {
		if (hasSqliteWorkerOutcomeUnknown(error)) throw error;
		logVerbose(`subagents control kill: failed to persist ${params.runId ?? params.childSessionKey ?? "unknown"}: ${formatErrorMessage(error)}`);
		return 0;
	}
}
async function killSubagentRun(params) {
	const stateContext = params.stateContext ?? captureOpenClawStateWorkerContext();
	const assertState = () => {
		stateContext.admission.assertCurrent();
		assertSubagentRegistryWriteOutcomeKnown([params.entry.runId], stateContext.admission);
		params.session.assertCurrent();
	};
	assertState();
	const isCurrent = (requirePreparedSession = true) => isCurrentSubagentRun(params.entry, params.cfg) && params.isCurrent?.(params.entry, requirePreparedSession) !== false;
	const assertSelectedNativeRun = () => {
		assertSubagentRegistryWriteSourceCurrent(stateContext);
		assertSubagentRegistryWriteOutcomeKnown([params.entry.runId], stateContext.admission);
		if (!isCurrent(false)) throw new Error("Subagent kill settlement lost its original run");
	};
	const assertSelectedRun = () => {
		assertSelectedNativeRun();
		params.session.assertCurrent();
	};
	const markKilledBestEffort = () => markSubagentRunTerminatedBestEffort({
		runId: params.entry.runId,
		session: params.session,
		withdrawQueuedReservation: params.withdrawQueuedReservation,
		reason: "killed",
		suppressTaskDelivery: params.suppressTaskDelivery,
		context: stateContext,
		assertCurrent: assertSelectedRun
	});
	const initialTargetState = resolveSubagentKillTargetState(params.entry);
	if (initialTargetState) {
		if (params.suppressTaskDelivery && params.entry.requesterSettleWake) await cancelSubagentRequesterSettleWake(params.entry, () => {
			params.cancellationControl?.assertCurrent();
			if (!isCurrent()) throw new Error("Subagent ownership changed during cancellation; retry.");
		});
		if (params.entry.endedReason === "subagent-killed" && params.entry.suppressAnnounceReason !== "steer-restart") await markKilledBestEffort();
		return {
			killed: false,
			targetState: initialTargetState
		};
	}
	if (params.entry.execution.endedAt && params.entry.pauseReason !== "sessions_yield") return { killed: false };
	const childSessionKey = params.entry.childSessionKey;
	const resolved = params.session;
	const sessionId = resolved.entry?.sessionId;
	const sessionLifecycleRevision = resolved.entry?.lifecycleRevision;
	const runtime = await subagentKillRuntimeLoader.load();
	let admission = "ready";
	let killClaim;
	const claimSelectedRunKill = () => claimSubagentRunKill({
		runId: params.entry.runId,
		expected: params.entry,
		sessionId,
		sessionLifecycleRevision,
		suppressTaskDelivery: params.suppressTaskDelivery,
		context: stateContext,
		assertCurrent: () => {
			assertState();
			params.cancellationControl?.assertCurrent();
		},
		assertPublicationCurrent: assertSelectedNativeRun
	});
	let stopAccepted = false;
	let preparationResult;
	const cancellationFailure = async (error, declined) => {
		let reason = formatErrorMessage(error);
		if (killClaim && !stopAccepted) try {
			await releaseSubagentRunKillClaim({
				runId: params.entry.runId,
				expected: params.entry,
				claim: killClaim,
				context: stateContext
			});
		} catch (releaseError) {
			if (hasSqliteWorkerOutcomeUnknown(releaseError)) throw releaseError;
			reason += ` Kill intent could not be released: ${formatErrorMessage(releaseError)}`;
		}
		return {
			killed: false,
			sessionId,
			...declined ? { declined } : {},
			error: reason
		};
	};
	const declineRevokedCancellation = () => {
		try {
			params.cancellationControl?.assertCurrent();
			return;
		} catch (error) {
			if (hasSqliteWorkerOutcomeUnknown(error)) throw error;
			return cancellationFailure(error, true);
		}
	};
	const killOwnerCurrent = () => isCurrent() && (!killClaim || (params.entry.killIntent === killClaim || params.entry.endedReason === "subagent-killed" && params.entry.killReconciliation !== void 0 && params.entry.execution.lifecycleGeneration === killClaim.lifecycleGeneration) && (killClaim.lifecycleGeneration === void 0 || isAgentEventLifecycleGenerationCurrent(killClaim.lifecycleGeneration)));
	const ownsSessionIncarnation = () => {
		try {
			assertState();
			return true;
		} catch (error) {
			if (isSessionDeliveryGenerationRevokedError(error)) return false;
			throw error;
		}
	};
	const releaseChangedSessionKill = async (claim) => {
		try {
			await releaseSubagentRunKillClaim({
				runId: params.entry.runId,
				expected: params.entry,
				claim,
				context: stateContext
			});
		} catch (error) {
			if (hasSqliteWorkerOutcomeUnknown(error)) throw error;
			return {
				killed: false,
				sessionId,
				error: `Subagent session changed and its kill intent could not be released: ${formatErrorMessage(error)}`
			};
		}
		return {
			killed: false,
			sessionId,
			error: "Subagent session changed while the kill was pending; retry."
		};
	};
	return await runExclusiveSessionLifecycleMutation({
		scope: resolved.storePath,
		identities: [childSessionKey, sessionId],
		prepare: async () => {
			for (let pending = params.cancellationControl?.prepareRead?.(); pending; pending = params.cancellationControl?.prepareRead?.()) await pending;
			if (!isCurrent()) return;
			{
				const declined = declineRevokedCancellation();
				if (declined) {
					preparationResult = await declined;
					return;
				}
			}
			await params.refreshDescendants();
			assertState();
			if (params.beforeSessionKill?.() === false) {
				admission = "declined";
				return;
			}
			if (!isCurrent()) return;
			{
				const declined = declineRevokedCancellation();
				if (declined) {
					preparationResult = await declined;
					return;
				}
			}
			if (params.entry.swarmLaunchPending !== true && params.entry.execution.restartRecovery === void 0 && !resolveSubagentKillTargetState(params.entry)) {
				try {
					killClaim = await claimSelectedRunKill();
				} catch (error) {
					if (hasSqliteWorkerOutcomeUnknown(error)) throw error;
					preparationResult = {
						killed: false,
						sessionId,
						error: `Failed to persist subagent kill intent: ${formatKillPersistenceError(error)}`
					};
					return;
				}
				if (killClaim) {
					if (!ownsSessionIncarnation()) {
						preparationResult = await releaseChangedSessionKill(killClaim);
						return;
					}
					if (!killOwnerCurrent()) {
						preparationResult = {
							killed: false,
							sessionId,
							superseded: true
						};
						return;
					}
				}
			}
			{
				const declined = declineRevokedCancellation();
				if (declined) {
					preparationResult = await declined;
					return;
				}
			}
			assertState();
			const interruption = startSessionWorkAdmissionInterruption({
				scope: resolved.storePath,
				identities: [childSessionKey, sessionId],
				reason: createAgentRunDirectAbortError()
			});
			stopAccepted = interruption.interruptedRunIds.has(params.entry.runId) && killOwnerCurrent();
			const released = await waitForSessionWorkAdmissionRelease(interruption.released, SESSION_WORK_ADMISSION_DRAIN_TIMEOUT_MS);
			admission = released ? "ready" : "busy";
			if (released && params.beforeSessionKill && params.entry.swarmLaunchPending === true && params.entry.execution.restartRecovery === void 0 && !resolveSubagentKillTargetState(params.entry) && isCurrent()) try {
				killClaim = await claimSelectedRunKill();
			} catch (error) {
				if (hasSqliteWorkerOutcomeUnknown(error)) throw error;
				preparationResult = {
					killed: false,
					sessionId,
					error: `Failed to persist subagent kill intent: ${formatKillPersistenceError(error)}`
				};
			}
		},
		run: async () => {
			if (preparationResult) return preparationResult;
			if (admission === "declined") return {
				killed: false,
				sessionId,
				declined: true
			};
			if (admission === "busy") {
				try {
					if (killClaim && !stopAccepted) await releaseSubagentRunKillClaim({
						runId: params.entry.runId,
						expected: params.entry,
						claim: killClaim,
						context: stateContext
					});
				} catch (error) {
					if (hasSqliteWorkerOutcomeUnknown(error)) throw error;
					return {
						killed: false,
						sessionId,
						error: `Subagent remained active and its kill intent could not be released: ${formatErrorMessage(error)}`
					};
				}
				return {
					killed: false,
					sessionId,
					error: stopAccepted ? "Subagent accepted cancellation but is still active; cleanup is pending." : "Subagent is still active; try the kill again in a moment."
				};
			}
			let readFailure;
			try {
				for (let pending = params.cancellationControl?.prepareRead?.(); pending; pending = params.cancellationControl?.prepareRead?.()) await pending;
			} catch (error) {
				if (hasSqliteWorkerOutcomeUnknown(error)) throw error;
				if (!stopAccepted) return cancellationFailure(error);
				readFailure = { error };
			}
			if (!isCurrent()) return {
				killed: false,
				sessionId,
				superseded: true
			};
			if (killClaim && !ownsSessionIncarnation()) return releaseChangedSessionKill(killClaim);
			if (!readFailure) await params.refreshDescendants();
			const targetStateAfterRuntimeLoad = resolveSubagentKillTargetState(params.entry);
			if (targetStateAfterRuntimeLoad) {
				const killedTarget = params.entry.endedReason === "subagent-killed" && params.entry.suppressAnnounceReason !== "steer-restart";
				const claimedCurrentKill = killClaim !== void 0 && killOwnerCurrent();
				if (killedTarget && (!killClaim || claimedCurrentKill)) await markKilledBestEffort();
				return {
					killed: killedTarget && claimedCurrentKill,
					sessionId,
					targetState: targetStateAfterRuntimeLoad,
					...readFailure ? { error: formatErrorMessage(readFailure.error) } : {}
				};
			}
			const declined = readFailure ? void 0 : declineRevokedCancellation();
			if (declined && !stopAccepted) return declined;
			const persistAbortedLastRun = (abortedLastRun, strict = false) => persistSubagentAbortedLastRun({
				childSessionKey,
				storePath: resolved.storePath,
				hasSessionEntry: resolved.entry !== void 0,
				expectedSessionId: sessionId,
				expectedLifecycleRevision: sessionLifecycleRevision,
				abortedLastRun,
				isCurrent: () => killOwnerCurrent(),
				assertCommitAllowed: () => {
					assertState();
					if (!killOwnerCurrent()) throw new Error("subagent kill lifecycle retired before abort-marker commit");
				},
				strict
			});
			if (!killClaim) try {
				killClaim = await claimSelectedRunKill();
			} catch (error) {
				if (hasSqliteWorkerOutcomeUnknown(error)) throw error;
				return {
					killed: false,
					sessionId,
					error: `Failed to persist subagent kill intent: ${formatKillPersistenceError(error)}`
				};
			}
			if (!killClaim) return {
				killed: false,
				sessionId,
				superseded: true
			};
			const claimedKill = killClaim;
			const settleTargetCancellation = async () => {
				if (!ownsSessionIncarnation()) return releaseChangedSessionKill(claimedKill);
				if (!killOwnerCurrent()) return {
					killed: false,
					sessionId,
					superseded: true
				};
				let marked;
				try {
					marked = await markSubagentRunTerminated({
						runId: params.entry.runId,
						session: params.session,
						withdrawQueuedReservation: params.withdrawQueuedReservation,
						reason: "killed",
						suppressTaskDelivery: params.suppressTaskDelivery,
						context: stateContext,
						assertCurrent: () => {
							assertState();
							if (!stopAccepted) params.cancellationControl?.assertCurrent();
							if (!killOwnerCurrent()) throw new Error("Subagent kill settlement lost its original claim.");
						},
						assertPublicationCurrent: () => {
							assertState();
							if (!killOwnerCurrent()) throw new Error("Subagent kill publication lost its original claim");
						}
					});
				} catch (error) {
					if (hasSqliteWorkerOutcomeUnknown(error)) throw error;
					return {
						killed: false,
						sessionId,
						error: `Failed to persist subagent kill tombstone: ${formatErrorMessage(error)}`
					};
				}
				if (marked === 0) {
					assertState();
					if (!isCurrent()) return {
						killed: false,
						sessionId,
						superseded: true
					};
					return {
						killed: false,
						sessionId,
						targetState: resolveSubagentKillTargetState(params.entry)
					};
				}
				await persistAbortedLastRun(true);
				return {
					killed: marked > 0,
					sessionId
				};
			};
			try {
				if (!ownsSessionIncarnation()) return releaseChangedSessionKill(claimedKill);
				if (!killOwnerCurrent()) return {
					killed: false,
					sessionId,
					superseded: true
				};
				if (readFailure || declined) {
					const settled = await settleTargetCancellation();
					return readFailure ? {
						...settled,
						error: [settled.error, formatErrorMessage(readFailure.error)].filter(Boolean).join(" ")
					} : settled;
				}
				const active = sessionId ? runtime.isEmbeddedAgentRunActive(sessionId) : false;
				if (!ownsSessionIncarnation()) return releaseChangedSessionKill(claimedKill);
				const declinedBeforeAbort = declineRevokedCancellation();
				if (declinedBeforeAbort) return stopAccepted ? await settleTargetCancellation() : declinedBeforeAbort;
				const aborted = sessionId ? runtime.abortEmbeddedAgentRun(sessionId) : false;
				stopAccepted ||= aborted;
				if (!ownsSessionIncarnation()) return releaseChangedSessionKill(claimedKill);
				const declinedBeforeQueueClear = declineRevokedCancellation();
				if (declinedBeforeQueueClear) return stopAccepted ? await settleTargetCancellation() : declinedBeforeQueueClear;
				const cleared = runtime.clearSessionQueues([childSessionKey, sessionId]);
				if (cleared.followupCleared > 0 || cleared.laneCleared > 0) logVerbose(`subagents control kill: cleared followups=${cleared.followupCleared} lane=${cleared.laneCleared} keys=${cleared.keys.join(",")}`);
				if (active && !stopAccepted) {
					try {
						await releaseSubagentRunKillClaim({
							runId: params.entry.runId,
							expected: params.entry,
							claim: killClaim,
							context: stateContext
						});
					} catch (error) {
						if (hasSqliteWorkerOutcomeUnknown(error)) throw error;
						return {
							killed: false,
							sessionId,
							error: `Subagent remained active and its kill intent could not be released: ${formatErrorMessage(error)}`
						};
					}
					return {
						killed: false,
						sessionId,
						error: "Subagent is still active; try the kill again in a moment."
					};
				}
				const targetState = resolveSubagentKillTargetState(params.entry);
				if (targetState) {
					const killedTarget = targetState.state === "terminal" && targetState.task.status === "cancelled" && targetState.task.error === "Subagent run killed.";
					if (killedTarget) await markKilledBestEffort();
					else try {
						await releaseSubagentRunKillClaim({
							runId: params.entry.runId,
							expected: params.entry,
							claim: killClaim,
							context: stateContext
						});
					} catch (error) {
						if (hasSqliteWorkerOutcomeUnknown(error)) throw error;
						return {
							killed: false,
							sessionId,
							targetState,
							error: `Completed subagent kill intent could not be released: ${formatErrorMessage(error)}`
						};
					}
					return {
						killed: killedTarget,
						sessionId,
						targetState
					};
				}
				return await settleTargetCancellation();
			} catch (error) {
				if (hasSqliteWorkerOutcomeUnknown(error)) throw error;
				return {
					killed: false,
					sessionId,
					error: formatErrorMessage(error)
				};
			}
		},
		finalize: async () => {
			if (killClaim && subagentRuns.get(params.entry.runId) === params.entry && params.entry.killIntent === killClaim) params.withdrawQueuedReservation();
		}
	});
}
//#endregion
//#region src/agents/subagents/registry/subagent-control-kill-scope.ts
async function withSubagentKillScope(params, run, publish, preparePublication) {
	const lifecycleGeneration = getAgentEventLifecycleGeneration();
	const stateContext = captureOpenClawStateWorkerContext();
	const assertCurrent = () => {
		assertSubagentRegistryWriteSourceCurrent(stateContext);
		params.assertCurrent?.();
	};
	const cancellationControl = {
		prepareRead: params.prepareRead,
		assertCurrent: () => {
			assertCurrent();
		}
	};
	const selected = /* @__PURE__ */ new Set();
	const releaseSessions = [];
	const releaseRetirements = [];
	const completeRetirementPublications = [];
	const holds = [];
	const hold = (tree) => {
		if (!tree.dispatchHold) {
			tree.dispatchHold = holdQueuedSwarmRun(tree.entry.schedulerSlotId ?? tree.entry.runId);
			if (tree.dispatchHold) holds.push(tree.dispatchHold);
		}
	};
	const capture = (pending, runs, trees, owner, isParentCurrent, ownsRoot) => {
		const controller = owner ? { ...owner } : void 0;
		for (const snapshot of runs) {
			assertCurrent();
			const entry = getLatestOwnedSubagentRun(snapshot.childSessionKey, snapshot.requesterAgentId, params.cfg);
			if (!entry || !isSameSubagentRunGeneration(entry, snapshot) || selected.has(entry.childSessionKey)) continue;
			const ownerCurrent = (candidate, requirePreparedSession = true) => isAgentEventLifecycleGenerationCurrent(lifecycleGeneration) && isParentCurrent?.(requirePreparedSession) !== false && ownsRoot?.(candidate) !== false && (!controller || !ensureSubagentControllerOwnsRun({
				cfg: params.cfg,
				controller,
				entry: candidate
			}));
			if (!ownerCurrent(entry, false) || !isCurrentSubagentRun(entry, params.cfg)) continue;
			selected.add(entry.childSessionKey);
			const errors = /* @__PURE__ */ new Set();
			let session;
			const ownsSessionIncarnation = () => {
				if (!session) return false;
				try {
					session.assertCurrent();
					return true;
				} catch (error) {
					if (isSessionDeliveryGenerationRevokedError(error)) return false;
					throw error;
				}
			};
			const { childSessionKey, requesterAgentId } = entry;
			const latest = () => getLatestOwnedSubagentRun(childSessionKey, requesterAgentId, params.cfg);
			const retirement = subagentRuns.captureRetirement(entry, (candidate) => latest() === candidate);
			completeRetirementPublications.push(retirement.completePublication);
			releaseRetirements.push(retirement.release);
			const bind = (current) => {
				const { generation, createdAt } = retirement.observation;
				const ownsRun = () => retirement.observation.entry === current && current.generation === generation && current.createdAt === createdAt && isAgentEventLifecycleGenerationCurrent(lifecycleGeneration) && (subagentRuns.get(current.runId) === current || retirement.observation.state === "retired");
				const isCurrent = (candidate, requirePreparedSession = true) => retirement.observation.entry === candidate && ownerCurrent(candidate, requirePreparedSession) && isCurrentSubagentRun(candidate, params.cfg) && (candidate !== current || ownsRun()) && (!requirePreparedSession || ownsSessionIncarnation());
				const canTraverse = (requirePreparedSession = true) => {
					if (!ownerCurrent(current, requirePreparedSession) || !ownsRun()) return false;
					const replacement = latest();
					return (replacement === current || retirement.observation.state === "retired" && (!replacement || compareSubagentRunGeneration(replacement, current) < 0)) && (!requirePreparedSession || ownsSessionIncarnation());
				};
				return {
					entry: current,
					isCurrent,
					ownsRun,
					canTraverse
				};
			};
			const tree = {
				...bind(entry),
				session,
				children: [],
				errors,
				discoveryFailed: errors.size > 0
			};
			hold(tree);
			trees.push(tree);
			pending.push({
				tree,
				prepare: async () => {
					try {
						session = await prepareSubagentKillSession(params.cfg, entry.childSessionKey, () => assertSubagentRegistryWriteSourceCurrent(stateContext), entry.execution.transcriptTarget);
						releaseSessions.push(session.release);
						if (!tree.canTraverse(false)) return;
						tree.session = session;
					} catch (error) {
						if (hasSqliteWorkerOutcomeUnknown(error)) throw error;
						errors.add(formatErrorMessage(error));
						tree.discoveryFailed = true;
					}
				}
			});
		}
	};
	const select = async (runs, trees, owner, isParentCurrent, ownsRoot) => {
		const pending = [];
		capture(pending, runs, trees, owner, isParentCurrent, ownsRoot);
		const resident = new Map(subagentRuns);
		for (const { tree } of pending) {
			const controller = {
				controllerSessionKey: tree.entry.childSessionKey,
				controllerAgentId: resolveSessionAgentId({
					config: params.cfg,
					sessionKey: tree.entry.childSessionKey
				})
			};
			capture(pending, listRunsForControllerFromRuns(resident, controller.controllerSessionKey), tree.children, controller, (prepared) => tree.canTraverse(prepared));
		}
		for (const item of pending) await item.prepare();
	};
	const refreshTree = async (tree) => {
		if (tree.discoveryFailed) return;
		try {
			assertSubagentRegistryWriteSourceCurrent(stateContext);
			try {
				params.assertCurrent?.();
			} catch (error) {
				if (!hasSqliteWorkerOutcomeUnknown(error) && tree.entry.execution.status === "terminal" && tree.entry.endedReason === "subagent-killed" && tree.entry.killReconciliation?.taskCancellationAccepted === true && tree.canTraverse()) {
					for (const child of tree.children) await refreshTree(child);
					return;
				}
				throw error;
			}
			if (!tree.canTraverse()) return;
			if (tree.isCurrent(tree.entry)) {
				hold(tree);
				const controller = {
					controllerSessionKey: tree.entry.childSessionKey,
					controllerAgentId: resolveSessionAgentId({
						config: params.cfg,
						sessionKey: tree.entry.childSessionKey
					})
				};
				const candidates = await withSubagentRunReadSnapshot(subagentRuns, (snapshot) => ({
					runIds: [...snapshot.values()].filter((candidate) => (candidate.controllerSessionKey?.trim() || candidate.requesterSessionKey) === controller.controllerSessionKey).map((candidate) => candidate.runId),
					sessionKeys: [controller.controllerSessionKey]
				}), (_selection, runs) => listRunsForControllerFromRuns(new Map(runs), controller.controllerSessionKey));
				assertCurrent();
				await select(candidates, tree.children, controller, () => tree.canTraverse());
			}
			for (const child of tree.children) await refreshTree(child);
		} catch (error) {
			if (hasSqliteWorkerOutcomeUnknown(error)) throw error;
			tree.discoveryFailed = true;
			tree.errors.add(formatErrorMessage(error));
		}
	};
	let outcome;
	try {
		assertCurrent();
		const trees = [];
		await select(params.runs, trees, params.controller, void 0, params.ownsRoot);
		const scope = {
			cancellationControl,
			stateContext,
			refresh: async () => {
				for (const tree of trees) await refreshTree(tree);
				return selected.size;
			}
		};
		await scope.refresh();
		const result = await run(scope, trees);
		if (preparePublication) do
			await preparePublication.prepare();
		while (preparePublication.needsPreparation());
		if (publish) assertCurrent();
		outcome = {
			ok: true,
			value: publish ? publish(result, trees) : result
		};
	} catch (error) {
		outcome = {
			ok: false,
			error
		};
	}
	completeRetirementPublications.forEach((complete) => complete());
	const released = await Promise.allSettled(holds.map((reservation) => reservation.release()));
	const retired = await Promise.allSettled(releaseRetirements.map(async (release) => release()));
	releaseSessions.forEach((release) => release());
	if (!outcome.ok) throw outcome.error;
	for (const result of [...released, ...retired]) if (result.status === "rejected") throw result.reason;
	return outcome.value;
}
//#endregion
//#region src/agents/subagents/registry/subagent-control-kill.ts
/** Authorized tree and admin subagent kill orchestration. */
async function killLatestSubagentRun(params) {
	const { tree, scope } = params;
	for (let pending = scope.cancellationControl?.prepareRead?.(); pending; pending = scope.cancellationControl?.prepareRead?.()) await pending;
	const matchesExpected = (entry) => (params.expectedGeneration === void 0 || entry.generation === params.expectedGeneration) && (!params.expectedOwnerKey || entry.requesterSessionKey === params.expectedOwnerKey);
	scope.cancellationControl?.assertCurrent();
	const entry = tree.entry;
	const session = tree.session;
	if (!session) return {
		entry,
		result: { killed: false }
	};
	if (!matchesExpected(entry)) return {
		entry,
		session,
		result: {
			killed: false,
			superseded: true
		}
	};
	const result = tree.isCurrent(entry) ? await killSubagentRun({
		...params,
		entry,
		session,
		stateContext: scope.stateContext,
		cancellationControl: scope.cancellationControl,
		isCurrent: (candidate, requirePreparedSession) => tree.isCurrent(candidate, requirePreparedSession) && matchesExpected(candidate),
		withdrawQueuedReservation: () => tree.dispatchHold?.withdraw(),
		refreshDescendants: scope.refresh
	}) : {
		killed: false,
		superseded: true
	};
	if (result.superseded && !tree.isCurrent(entry) && tree.canTraverse() && matchesExpected(entry)) return {
		entry,
		session,
		result: {
			killed: false,
			targetState: resolveSubagentKillTargetState(entry)
		}
	};
	return {
		entry,
		session,
		result
	};
}
function collectKillErrors(trees, unlabeledRoot) {
	let failed = 0;
	const errors = [];
	const collect = (tree) => {
		if (tree.errors.size > 0) {
			failed += 1;
			for (const error of tree.errors) errors.push(tree === unlabeledRoot ? error : `${resolveSubagentLabel(tree.entry)}: ${error}`);
		}
		tree.children.forEach(collect);
	};
	trees.forEach(collect);
	return {
		errors,
		failed
	};
}
async function visitAll(work) {
	const results = await Promise.allSettled(work);
	for (const result of results) if (result.status === "rejected") throw result.reason;
}
async function killSubagentRunTree(params) {
	const visits = /* @__PURE__ */ new Map();
	const visit = async (tree, suppressCompletedWakes) => {
		let result = visits.get(tree);
		try {
			if (!result) {
				result = {
					descendants: false,
					suppressCompletedWakes
				};
				visits.set(tree, result);
				if (!tree.entry.execution.endedAt || tree.entry.pauseReason === "sessions_yield" || params.suppressTaskDelivery && suppressCompletedWakes && tree.entry.requesterSettleWake) {
					const stopped = await killLatestSubagentRun({
						...params,
						tree
					});
					if (stopped.result.error) tree.errors.add(stopped.result.error);
					if (stopped.result.error || stopped.result.declined) result.suppressCompletedWakes = false;
					if (stopped.result.killed) result.label = resolveSubagentLabel(stopped.entry);
					if (stopped.result.superseded) return;
				}
				result.descendants = true;
			}
			if (result.descendants && tree.canTraverse()) {
				const suppressDescendantWakes = result.suppressCompletedWakes;
				await visitAll(tree.children.map((child) => visit(child, suppressDescendantWakes)));
			}
		} catch (error) {
			if (hasSqliteWorkerOutcomeUnknown(error)) throw error;
			tree.errors.add(formatErrorMessage(error));
			if (result) result.descendants = false;
		}
	};
	let selected;
	do {
		selected = await params.scope.refresh();
		await visitAll(params.trees.map((tree) => visit(tree, params.suppressCompletedWakes !== false)));
	} while (await params.scope.refresh() !== selected);
	const collectLabels = (trees) => trees.flatMap((tree) => {
		const label = visits.get(tree)?.label;
		return [...label === void 0 ? [] : [label], ...collectLabels(tree.children)];
	});
	const labels = collectLabels(params.trees);
	return {
		killed: labels.length,
		labels
	};
}
async function killSubagentRoot(params) {
	let stopped = {
		entry: params.tree.entry,
		result: { killed: false }
	};
	let cascade = {
		killed: 0,
		labels: []
	};
	try {
		stopped = await killLatestSubagentRun(params);
		if (stopped.result.error) params.tree.errors.add(stopped.result.error);
		if (!stopped.result.superseded && !stopped.result.declined && params.tree.canTraverse()) cascade = await killSubagentRunTree({
			cfg: params.cfg,
			suppressTaskDelivery: params.suppressTaskDelivery,
			suppressCompletedWakes: !stopped.result.error,
			scope: params.scope,
			trees: params.tree.children
		});
	} catch (error) {
		if (hasSqliteWorkerOutcomeUnknown(error)) throw error;
		params.tree.errors.add(formatErrorMessage(error));
	}
	return {
		...stopped,
		cascade
	};
}
/** Kills every currently controlled child run and its descendants. */
async function killAllControlledSubagentRuns(params) {
	if (params.controller.controlScope !== "children") {
		await params.beforeKill?.();
		return {
			status: "forbidden",
			error: "Leaf subagents cannot control other sessions.",
			killed: 0,
			labels: []
		};
	}
	return killSelectedSubagentRuns(params);
}
/** Lifecycle cleanup owns both the completion requester and its separately scoped controller. */
async function killSessionSubagentRuns(params) {
	const controller = {
		controllerSessionKey: params.sessionKey,
		controllerAgentId: params.agentId
	};
	return killSelectedSubagentRuns({
		cfg: params.cfg,
		assertCurrent: params.assertCurrent,
		runs: [...listSubagentRunsForRequester(params.sessionKey, { requesterAgentId: params.agentId }), ...listSubagentRunsForController(params.sessionKey, params.agentId)],
		ownsRoot: (entry) => !ensureSubagentControllerOwnsRun({
			cfg: params.cfg,
			controller,
			entry
		}) || entry.requesterSessionKey === params.sessionKey && resolveSubagentRequesterAgentId(params.cfg, entry) === params.agentId,
		suppressTaskDelivery: true
	});
}
async function killSelectedSubagentRuns(params) {
	const result = await withSubagentKillScope(params, async (scope, trees) => {
		const accepted = params.beforeKill ? await params.beforeKill() : true;
		if (accepted) await scope.refresh();
		const acceptedTrees = accepted ? trees : [];
		return {
			...await killSubagentRunTree({
				cfg: params.cfg,
				suppressTaskDelivery: params.suppressTaskDelivery,
				trees: acceptedTrees,
				scope
			}),
			...collectKillErrors(acceptedTrees)
		};
	});
	if (result.errors.length > 0) return {
		status: "error",
		error: result.errors.join("; "),
		failed: result.failed,
		killed: result.killed,
		labels: result.labels
	};
	return {
		status: "ok",
		killed: result.killed,
		labels: result.labels
	};
}
/** Admin kill path for a subagent session key, bypassing caller ownership checks. */
async function killSubagentRunAdmin(params, control) {
	const publish = (result) => {
		if (params.onResult?.(result) !== void 0) throw new TypeError("Subagent cancellation publication must be synchronous.");
		return result;
	};
	const targetSessionKey = params.sessionKey.trim();
	if (!targetSessionKey) return publish({
		found: false,
		killed: false
	});
	const entry = getLatestOwnedSubagentRun(targetSessionKey, params.agentId, params.cfg);
	if (!entry) return publish({
		found: false,
		killed: false
	});
	const expectedRunId = params.expectedRunId?.trim();
	const expectedTaskRunId = params.expectedTaskRunId?.trim();
	if (expectedRunId && entry.runId !== expectedRunId || expectedTaskRunId && (entry.taskRunId ?? entry.runId) !== expectedTaskRunId) return publish({
		found: false,
		killed: false
	});
	if (params.expectedGeneration !== void 0 && entry.generation !== params.expectedGeneration || params.expectedOwnerKey?.trim() && entry.requesterSessionKey !== params.expectedOwnerKey.trim()) return publish({
		found: false,
		killed: false
	});
	let rootStopSuperseded = false;
	return withSubagentKillScope({
		cfg: params.cfg,
		runs: [entry],
		assertCurrent: control?.assertCurrent,
		prepareRead: control?.prepareRead
	}, async (scope, [tree]) => {
		if (!tree) return {
			found: false,
			killed: false
		};
		const stopped = await killSubagentRoot({
			cfg: params.cfg,
			tree,
			scope,
			beforeSessionKill: control?.beforeSessionKill,
			expectedRunId: expectedRunId || (expectedTaskRunId ? entry.runId : void 0),
			expectedGeneration: params.expectedGeneration,
			expectedOwnerKey: params.expectedOwnerKey?.trim() || void 0
		});
		const { result: stopResult, cascade } = stopped;
		rootStopSuperseded = stopResult.superseded === true;
		const targetState = resolveSubagentKillTargetState(stopped.entry) ?? stopResult.targetState;
		const killedTarget = targetState?.state === "terminal" && targetState.task.status === "cancelled" && targetState.task.error === "Subagent run killed.";
		const stopResultAlreadyClearedAbort = stopResult.targetState !== void 0 && !(stopResult.targetState.state === "terminal" && stopResult.targetState.task.status === "cancelled" && stopResult.targetState.task.error === "Subagent run killed.");
		const resolved = stopped.session;
		if (targetState && !killedTarget && !stopResultAlreadyClearedAbort && resolved) await persistSubagentAbortedLastRun({
			childSessionKey: targetSessionKey,
			storePath: resolved.storePath,
			hasSessionEntry: resolved.entry !== void 0,
			expectedSessionId: resolved.entry?.sessionId,
			expectedLifecycleRevision: resolved.entry?.lifecycleRevision,
			abortedLastRun: false,
			isCurrent: () => tree.isCurrent(stopped.entry)
		});
		return {
			found: true,
			killed: stopResult.killed || cascade.killed > 0,
			runId: stopped.entry.runId,
			sessionKey: stopped.entry.childSessionKey,
			cascadeKilled: cascade.killed,
			cascadeLabels: cascade.killed > 0 ? cascade.labels : void 0
		};
	}, (result, [tree]) => {
		if (!result.found || !tree) return publish(result);
		const ownsOutcome = !rootStopSuperseded && tree.ownsRun() && tree.canTraverse();
		if (!ownsOutcome) tree.errors.add("Subagent ownership changed during cancellation; retry.");
		const targetState = ownsOutcome ? resolveSubagentKillTargetState(tree.entry) : void 0;
		const { errors } = collectKillErrors([tree], tree);
		return publish({
			...result,
			...targetState ? { targetState } : {},
			...errors.length > 0 ? { error: errors.join("; ") } : {}
		});
	}, control?.preparePublication);
}
//#endregion
export { killSessionSubagentRuns as n, killSubagentRunAdmin as r, killAllControlledSubagentRuns as t };
