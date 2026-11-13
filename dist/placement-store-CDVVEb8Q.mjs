import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { i as getNodeSqliteKysely, n as executeSqliteQuerySync } from "./kysely-sync-Y4_ti-rQ.mjs";
import { a as isSqliteLockError } from "./sqlite-error-diagnostics-XVtvbiXE.mjs";
import { t as createSubsystemLogger } from "./subsystem-CeqVSEVi.mjs";
import { n as createSqliteWorkerOperationAdmission } from "./sqlite-worker-operation-admission-BB758RIN.mjs";
import { t as executeExistingOpenClawStateRead } from "./openclaw-state-db-readonly-DE3MB0wy.mjs";
import { r as captureOpenClawStateWorkerContext } from "./openclaw-state-worker-context-C_iAE7YK.mjs";
import { l as runOpenClawStateWriteTransaction, r as openOpenClawStateDatabase } from "./openclaw-state-db-DM-mSY0m.mjs";
import { a as runOpenClawStateWorkerOperation } from "./openclaw-state-worker-store-DwGcGmZn.mjs";
import { n as sessionChanges } from "./session-row-changes-DFigA589.mjs";
import { c as normalizeIdentity, f as placementTurnOwner, g as resolvePlacementTurnEnvironment, h as required, i as isCurrentPlacementTurnClaim, o as nextGeneration, p as projectWorkerSessionTurnClaim, s as normalizeEpoch, u as normalizeWorkerPlacementExecutionMode } from "./placement-record-CfXaWmIw.mjs";
import { a as query, c as canTransitionWorkerSessionPlacement, d as publishPlacementTurnClaimCleared, f as publishPlacementTurnClaimState, i as getRequired, l as observePlacementAuthority, m as stagePlacementTurnClaimWorkerPublication, n as find, o as transitionValues, r as fromRow, s as updateTransition, u as preparePlacementTurnClaimAuthority } from "./placement-row-codec-VEfceuUb.mjs";
import { a as hasCurrentWorkspaceResultClaim, c as isCurrentWorkerWorkspacePendingResultOwner, f as createPlacementWorkspaceJournalOps, n as createPlacementWorkspaceResultOps, o as hasWorkerWorkspacePendingResult, u as readWorkerWorkspaceReconciliationFacts } from "./placement-workspace-result-fPBcZ3tM.mjs";
import { r as drainWorkerSessionPlacement, t as createPlacementMoveOps } from "./placement-move-intent-Dt4RAeIf.mjs";
import { t as boundedWorkerError } from "./worker-error-D4DYRm01.mjs";
import { n as clearWorkerTurnToolState, t as assertNoRunningWorkerSessionToolOperations } from "./placement-session-tool-operations-CunYVY8I.mjs";
import { f as registerWorkerTurnClaimClosedHandler, l as prepareWorkerTurnClaimClosed, n as attachWorkerTurnExecutionIdentityStore, s as deferWorkerTurnClaimClosed } from "./placement-turn-claim-events-i7ItfUJ9.mjs";
import { r as createPlacementWorkspaceReservationOps } from "./placement-workspace-reservation-BPEl88PB.mjs";
import { n as createPlacementTurnClaimOps, t as ActiveTurnClaimError } from "./placement-turn-claims-29eNxuPh.mjs";
import { n as consumePreparedEnvironment } from "./prepared-environment-store-Cc6aw6It.mjs";
import { a as projectWorkspaceResultConflict } from "./workspace-conflicts-CQVfTI04.mjs";
import { randomUUID } from "node:crypto";
//#region src/gateway/worker-environments/placement-dispatch-store.ts
function readDispatchTurnClaim(value) {
	if (value === null) return null;
	if (!isRecord(value) || value.owner !== "local" || typeof value.claimId !== "string" || !value.claimId || typeof value.runId !== "string" || !value.runId || typeof value.generation !== "number" || !Number.isSafeInteger(value.generation) || value.generation < 0 || value.ownerEpoch !== null) throw new Error("Worker placement dispatch commit has an invalid predecessor claim");
	return {
		owner: "local",
		claimId: value.claimId,
		runId: value.runId,
		generation: value.generation,
		ownerEpoch: null
	};
}
function readDispatchReceipt(value, identity, executionMode) {
	if (!isRecord(value) || value.state !== "requested" || value.sessionId !== identity.sessionId || value.agentId !== identity.agentId || value.sessionKey !== identity.sessionKey || value.executionMode !== executionMode) throw new Error("Worker placement dispatch receipt has a different identity");
	const metadata = {
		environmentId: null,
		activeOwnerEpoch: null,
		workspaceBaseManifestRef: null,
		remoteWorkspaceDir: null,
		workerBundleHash: null,
		lastTranscriptAckCursor: null,
		lastLiveEventAckCursor: null,
		recoveryError: null,
		terminalReason: null,
		terminalAtMs: null
	};
	if (Object.keys(metadata).some((key) => value[key] !== null)) throw new Error("Worker placement dispatch receipt retains worker metadata");
	const number = (key) => {
		const field = value[key];
		if (typeof field !== "number" || !Number.isSafeInteger(field) || field < 0) throw new Error(`Worker placement dispatch receipt has an invalid ${key}`);
		return field;
	};
	return {
		...identity,
		...metadata,
		state: "requested",
		executionMode,
		generation: number("generation"),
		createdAtMs: number("createdAtMs"),
		updatedAtMs: number("updatedAtMs"),
		stateChangedAtMs: number("stateChangedAtMs"),
		turnClaim: readDispatchTurnClaim(value.turnClaim)
	};
}
async function startWorkerPlacementDispatch(path, placement, nowMs, assertCurrent) {
	const context = captureOpenClawStateWorkerContext({ path });
	const captured = structuredClone(placement);
	const identity = normalizeIdentity(captured);
	const executionMode = normalizeWorkerPlacementExecutionMode(captured.executionMode);
	const check = () => {
		context.admission.assertCurrent();
		assertCurrent?.();
	};
	let admission;
	let publication;
	let commitGranted = false;
	try {
		return await runOpenClawStateWorkerOperation(context, async (scope) => {
			const result = await scope.execute({
				type: "workerPlacements.startDispatch",
				input: {
					placement: captured,
					nowMs
				}
			});
			publication?.commit();
			return result;
		}, {
			assertCurrent: check,
			createAdmission: () => {
				let stage = "transaction";
				admission = createSqliteWorkerOperationAdmission((request, grant) => {
					if (request.stage !== stage) throw new Error("Worker placement dispatch admission is out of order");
					check();
					const facts = request.stage === "commit" ? {
						...identity,
						state: "requested",
						executionMode,
						environmentId: null,
						activeOwnerEpoch: null,
						turnClaim: readDispatchTurnClaim(request.facts)
					} : void 0;
					if (facts) publication = stagePlacementTurnClaimWorkerPublication(context.admission.identity, facts);
					if (!grant()) {
						publication?.rollback();
						throw new Error("Worker placement dispatch admission expired");
					}
					commitGranted ||= request.stage === "commit";
					stage = "commit";
				});
				return {
					nativeLocations: [context.admission.databasePath],
					admission
				};
			}
		});
	} catch (error) {
		const committed = admission?.committed ?? admission?.settlement?.committed;
		if (committed) {
			publication?.commit();
			return readDispatchReceipt(committed.facts, identity, executionMode);
		} else if (!commitGranted || admission?.settlement?.kind === "completed") publication?.rollback();
		else publication?.invalidate();
		throw error;
	}
}
//#endregion
//#region src/gateway/worker-environments/placement-pending-failure.ts
function createPlacementPendingFailureOps(runtime) {
	const { now, path, write } = runtime;
	return { failWorkspaceResultAndReleaseTurn(pending, error) {
		const sessionId = required(pending.sessionId, "session id");
		const recoveryError = boundedWorkerError(error);
		return write((db) => {
			const current = getRequired(db, sessionId);
			if (!isCurrentWorkerWorkspacePendingResultOwner(current, pending)) throw new Error(`Session ${sessionId} workspace result owner changed before failure`);
			const persisted = current.turnClaim;
			const releasedClaim = persisted ? {
				sessionId,
				claimId: persisted.claimId,
				runId: persisted.runId,
				placementGeneration: persisted.generation,
				owner: placementTurnOwner(current)
			} : null;
			const pendingQuery = getNodeSqliteKysely(db);
			if (!executeSqliteQuerySync(db, pendingQuery.selectFrom("worker_workspace_pending_results").select("session_id").where("session_id", "=", sessionId).where("environment_id", "=", pending.environmentId).where("owner_epoch", "=", pending.ownerEpoch).where("placement_generation", "=", pending.placementGeneration).where("claim_id", "=", pending.claimId).where("run_id", "=", pending.runId)).rows[0]) throw new Error(`Session ${sessionId} workspace result changed before failure`);
			const terminalAtMs = now();
			let transitioning = current;
			if (transitioning.state === "active") {
				const values = transitionValues(transitioning, "draining", {}, terminalAtMs);
				if (persisted) {
					values.turn_claim_owner = persisted.owner;
					values.turn_claim_id = persisted.claimId;
					values.turn_claim_run_id = persisted.runId;
					values.turn_claim_generation = persisted.generation;
					values.turn_claim_owner_epoch = persisted.ownerEpoch;
				}
				if (executeSqliteQuerySync(db, query(db).updateTable("worker_session_placements").set(values).where("session_id", "=", sessionId).where("state", "=", "active").where("transition_generation", "=", transitioning.generation)).numAffectedRows !== 1n) throw new Error(`Session ${sessionId} workspace result changed during drain`);
				transitioning = getRequired(db, sessionId);
				publishPlacementTurnClaimState(db, transitioning);
			}
			if (transitioning.state !== "draining") throw new Error(`Session ${sessionId} workspace result did not reach draining`);
			if (persisted) {
				assertNoRunningWorkerSessionToolOperations(db, {
					sessionId,
					claimId: persisted.claimId
				});
				clearWorkerTurnToolState(db, {
					sessionId,
					claimId: persisted.claimId
				});
			}
			const reconcilingValues = transitionValues(transitioning, "reconciling", {}, terminalAtMs);
			if (executeSqliteQuerySync(db, query(db).updateTable("worker_session_placements").set(reconcilingValues).where("session_id", "=", sessionId).where("state", "=", "draining").where("transition_generation", "=", transitioning.generation)).numAffectedRows !== 1n) throw new Error(`Session ${sessionId} workspace result changed during reconcile`);
			transitioning = getRequired(db, sessionId);
			publishPlacementTurnClaimState(db, transitioning);
			const failedValues = transitionValues(transitioning, "failed", {
				recoveryError,
				terminalReason: recoveryError
			}, terminalAtMs);
			if (executeSqliteQuerySync(db, query(db).updateTable("worker_session_placements").set(failedValues).where("session_id", "=", sessionId).where("state", "=", "reconciling").where("transition_generation", "=", transitioning.generation).where("turn_claim_owner", "is", null)).numAffectedRows !== 1n) throw new Error(`Session ${sessionId} workspace result changed during failure`);
			if (executeSqliteQuerySync(db, pendingQuery.deleteFrom("worker_workspace_pending_results").where("session_id", "=", sessionId).where("environment_id", "=", pending.environmentId).where("owner_epoch", "=", pending.ownerEpoch).where("placement_generation", "=", pending.placementGeneration).where("claim_id", "=", pending.claimId).where("run_id", "=", pending.runId)).numAffectedRows !== 1n) throw new Error(`Session ${sessionId} workspace result changed during failure`);
			sessionChanges.emit({
				agentId: current.agentId,
				sessionKey: current.sessionKey
			}, db);
			const record = getRequired(db, sessionId);
			publishPlacementTurnClaimState(db, record);
			if (releasedClaim) deferWorkerTurnClaimClosed(db, path, releasedClaim);
			return record;
		});
	} };
}
//#endregion
//#region src/gateway/worker-environments/placement-turn-claims-store.ts
const log = createSubsystemLogger("gateway/placement");
function isReceipt(value) {
	return isRecord(value) && (value.placement === void 0 || isRecord(value.placement) && typeof value.placement.sessionId === "string" && typeof value.placement.agentId === "string" && typeof value.placement.sessionKey === "string") && (value.claim === void 0 || isRecord(value.claim) && typeof value.claim.claimId === "string");
}
function createPlacementTurnClaimWorkerOps(runtime) {
	const context = captureOpenClawStateWorkerContext({ path: runtime.path });
	async function execute(input, assertCurrent) {
		const requested = input.input.claim;
		const owner = requested.owner.kind === "local" ? {
			kind: "local",
			environmentId: requested.owner.environmentId,
			ownerEpoch: requested.owner.ownerEpoch
		} : {
			kind: "worker",
			environmentId: requested.owner.environmentId,
			ownerEpoch: requested.owner.ownerEpoch
		};
		const claim = {
			sessionId: requested.sessionId,
			claimId: requested.claimId,
			runId: requested.runId,
			owner
		};
		const command = input.type === "placementTurns.claim" ? {
			type: input.type,
			input: {
				nowMs: input.input.nowMs,
				claim: {
					...claim,
					agentId: input.input.claim.agentId,
					sessionKey: input.input.claim.sessionKey
				}
			}
		} : input.type === "placementTurns.recoverWorkspace" ? {
			type: input.type,
			input: {
				nowMs: input.input.nowMs,
				gatewayInstanceId: input.input.gatewayInstanceId,
				claim: {
					...claim,
					placementGeneration: input.input.claim.placementGeneration
				}
			}
		} : input.type === "placementTurns.handoffRuntimeRefreshResult" ? {
			type: input.type,
			input: {
				nowMs: input.input.nowMs,
				claim: {
					...claim,
					placementGeneration: input.input.claim.placementGeneration
				},
				expectedGeneration: input.input.expectedGeneration,
				gatewayInstanceId: input.input.gatewayInstanceId
			}
		} : {
			type: input.type,
			input: {
				nowMs: input.input.nowMs,
				claim: {
					...claim,
					placementGeneration: input.input.claim.placementGeneration
				}
			}
		};
		const close = command.type === "placementTurns.release" || command.type === "placementTurns.releaseIfOwned" ? prepareWorkerTurnClaimClosed(runtime.path, command.input.claim) : void 0;
		let reportedContention = false;
		for (;;) {
			let admission;
			let publication;
			let entered = false;
			let granted = false;
			let prepared;
			let published = false;
			const check = () => {
				context.admission.assertCurrent();
				assertCurrent?.();
			};
			const publish = (receipt) => {
				if (!published) {
					published = true;
					publication?.commit();
					if (receipt.placement) {
						close?.();
						sessionChanges.emit({
							agentId: receipt.placement.agentId,
							sessionKey: receipt.placement.sessionKey
						});
					}
				}
				return receipt;
			};
			try {
				return await runOpenClawStateWorkerOperation(context, async (scope) => publish(await scope.execute(command)), {
					assertCurrent: check,
					createAdmission: () => {
						admission = createSqliteWorkerOperationAdmission((request, grant) => {
							check();
							if (request.stage === "commit") {
								if (!isReceipt(request.facts)) throw new Error("Placement claim commit has no receipt");
								prepared = request.facts;
								if (request.facts.placement) publication = stagePlacementTurnClaimWorkerPublication(context.admission.identity, request.facts.placement);
							}
							if (!grant()) {
								publication?.rollback();
								throw new Error("Placement claim admission expired");
							}
							entered ||= request.stage === "transaction";
							granted ||= request.stage === "commit";
						});
						return {
							nativeLocations: [runtime.path],
							admission
						};
					}
				});
			} catch (error) {
				const committed = admission?.committed ?? admission?.settlement?.committed;
				if (committed && isReceipt(committed.facts)) return publish(committed.facts);
				if (!granted || admission?.settlement?.kind === "completed") publication?.rollback();
				else if (command.type === "placementTurns.handoffRuntimeRefreshResult") publication?.invalidate();
				else {
					if (command.type === "placementTurns.recoverWorkspace") {
						publication?.rollback();
						throw error;
					}
					const reply = await (async () => {
						try {
							context.admission.assertCurrent();
							return await executeExistingOpenClawStateRead({ path: runtime.path }, {
								type: "workers.placementProjection",
								sessionIds: [command.input.claim.sessionId],
								conflictBindings: []
							}, { current: true });
						} catch (readError) {
							if (command.type === "placementTurns.claim" && prepared?.claim) try {
								await execute({
									type: "placementTurns.releaseIfOwned",
									input: {
										claim: prepared.claim,
										nowMs: runtime.now?.()
									}
								});
								publication?.rollback();
							} catch (cleanupError) {
								throw new AggregateError([
									error,
									readError,
									cleanupError
								], "Placement turn claim custody could not be settled; restart recovery is required", { cause: cleanupError });
							}
							throw new AggregateError([error, readError], "Placement turn outcome readback failed", { cause: readError });
						}
					})();
					context.admission.assertCurrent();
					if (!reply?.ok || reply.type !== "workers.placementProjection") throw error;
					const placement = reply.result.projection.placements.get(command.input.claim.sessionId);
					if (command.type === "placementTurns.claim" ? placement && prepared?.claim && isCurrentPlacementTurnClaim(placement, prepared.claim) : !placement || !isCurrentPlacementTurnClaim(placement, command.input.claim)) {
						if (prepared) return publish(prepared);
					}
					publication?.rollback();
				}
				if (command.type === "placementTurns.releaseIfOwned" && !entered && !granted && admission?.settlement?.kind !== "unknown" && isSqliteLockError(error)) {
					context.admission.assertCurrent();
					if (!reportedContention) {
						reportedContention = true;
						log.warn("Turn claim release is waiting for the state database", {
							sessionId: claim.sessionId,
							runId: claim.runId,
							error
						});
					}
					continue;
				}
				if (error instanceof Error && error.name === "ActiveTurnClaimError") throw new ActiveTurnClaimError(command.input.claim.sessionId);
				throw error;
			}
		}
	}
	return {
		async retainInterruptedTurnWorkspace(claim, assertCurrent) {
			await execute({
				type: "placementTurns.recoverWorkspace",
				input: {
					claim,
					gatewayInstanceId: runtime.instanceId,
					nowMs: runtime.now?.()
				}
			}, assertCurrent);
		},
		async handoffRuntimeRefreshResult(input, assertCurrent) {
			const receipt = await execute({
				type: "placementTurns.handoffRuntimeRefreshResult",
				input: {
					...input,
					nowMs: runtime.now?.() ?? Date.now()
				}
			}, assertCurrent);
			if (!receipt.placement) throw new Error("Worker runtime refresh handoff receipt is missing its placement");
			return receipt.placement;
		},
		async claimTurn(input, assertCurrent) {
			const receipt = await execute({
				type: "placementTurns.claim",
				input: {
					claim: input,
					nowMs: runtime.now?.()
				}
			}, assertCurrent);
			if (!receipt.claim) throw new Error("Placement turn claim receipt is missing its claim");
			return receipt.claim;
		},
		async releaseTurn(claim, assertCurrent) {
			const receipt = await execute({
				type: "placementTurns.release",
				input: {
					claim,
					nowMs: runtime.now?.()
				}
			}, assertCurrent);
			if (!receipt.placement) throw new Error("Placement turn release receipt is missing its placement");
			return receipt.placement;
		},
		async releaseTurnIfOwned(claim) {
			await execute({
				type: "placementTurns.releaseIfOwned",
				input: {
					claim,
					nowMs: runtime.now?.()
				}
			});
		}
	};
}
//#endregion
//#region src/gateway/worker-environments/placement-store.ts
const RETIRABLE_PLACEMENT_STATES = [
	"local",
	"requested",
	"reclaimed",
	"failed"
];
function exactConflictPath(value) {
	if (typeof value !== "string" || value.length === 0) throw new Error("Worker placement conflict path is required");
	return value;
}
function createWorkerSessionPlacementStore(options = {}) {
	const path = (options.database ?? openOpenClawStateDatabase()).path;
	const now = options.now ?? Date.now;
	const runtime = {
		path,
		instanceId: randomUUID(),
		now,
		read: () => openOpenClawStateDatabase({ path }).db,
		write: (operation) => runOpenClawStateWriteTransaction(({ db }) => operation(db), { path })
	};
	const { read, write } = runtime;
	const workspaceResultConflicts = /* @__PURE__ */ new Map();
	const withWorkspaceResultConflict = (record) => {
		if (!record) return;
		const conflict = workspaceResultConflicts.get(record.sessionId)?.conflict;
		return conflict ? {
			...record,
			workspaceResultConflict: conflict
		} : record;
	};
	const store = {
		...createPlacementWorkspaceReservationOps(runtime),
		...createPlacementTurnClaimOps(runtime),
		...createPlacementTurnClaimWorkerOps({
			path,
			instanceId: runtime.instanceId,
			now: options.now
		}),
		...createPlacementPendingFailureOps(runtime),
		...createPlacementMoveOps(runtime),
		...createPlacementWorkspaceJournalOps(runtime),
		...createPlacementWorkspaceResultOps(runtime),
		registerTurnClaimClosedHandler(handler) {
			return registerWorkerTurnClaimClosedHandler(path, handler);
		},
		get(sessionId) {
			return withWorkspaceResultConflict(find(read(), required(sessionId, "session id")));
		},
		prepareTurnClaimAuthority(claim) {
			return preparePlacementTurnClaimAuthority(path, claim, (sessionIds) => store.readProjection(sessionIds, { current: true }));
		},
		async prepareRuntimeRefresh(sessionIdInput) {
			const sessionId = required(sessionIdInput, "session id");
			const observation = observePlacementAuthority(path, sessionId);
			try {
				const result = await executeExistingOpenClawStateRead({ path }, {
					type: "workers.placementProjection",
					sessionIds: [sessionId],
					conflictBindings: []
				}, { current: true });
				if (!result?.ok || result.type !== "workers.placementProjection") throw new Error("Worker placement projection source is unavailable");
				observation.assertCurrent();
				return {
					placement: result.result.projection.placements.get(sessionId),
					move: result.result.projection.moves.get(sessionId),
					pendingResult: result.result.projection.pendingResults.get(sessionId),
					...observation
				};
			} catch (error) {
				observation.release();
				throw error;
			}
		},
		async readProjection(sessionIds, readOptions = {}) {
			const requestedIds = new Map(sessionIds.map((id) => [id, required(id, "session id")]));
			const ids = [...new Set(requestedIds.values())];
			const conflicts = new Map(ids.flatMap((id) => {
				const conflict = workspaceResultConflicts.get(id);
				return conflict ? [[id, conflict]] : [];
			}));
			const result = await executeExistingOpenClawStateRead({ path }, {
				type: "workers.placementProjection",
				sessionIds: ids,
				conflictBindings: [...conflicts.values()].map(({ placement, claim }) => ({
					placement: {
						sessionId: placement.sessionId,
						generation: placement.generation,
						environmentId: placement.environmentId,
						activeOwnerEpoch: placement.activeOwnerEpoch
					},
					claim: { ...claim }
				}))
			}, readOptions);
			if (!result || !result.ok || result.type !== "workers.placementProjection") throw new Error("Worker placement projection source is unavailable");
			const { projection, conflictSessionIds } = result.result;
			const placements = new Map(projection.placements);
			for (const [id, captured] of conflicts) {
				const record = placements.get(id);
				if (record && conflictSessionIds.has(id) && workspaceResultConflicts.get(id) === captured) placements.set(id, {
					...record,
					workspaceResultConflict: captured.conflict
				});
			}
			const byRequestedId = (records) => {
				const requested = /* @__PURE__ */ new Map();
				for (const [original, normalized] of requestedIds) {
					const value = records.get(normalized);
					if (value !== void 0) requested.set(original, value);
				}
				return requested;
			};
			const byRequestedSet = (normalizedSessionIds) => new Set([...requestedIds].flatMap(([original, normalized]) => normalizedSessionIds.has(normalized) ? [original] : []));
			return {
				...projection,
				placements: byRequestedId(placements),
				moves: byRequestedId(projection.moves),
				pendingResults: byRequestedId(projection.pendingResults),
				workspaceJournalOwnerSessionIds: byRequestedSet(projection.workspaceJournalOwnerSessionIds),
				workspaceResultReconcilingSessionIds: byRequestedSet(projection.workspaceResultReconcilingSessionIds),
				workspaceRecoveryPendingSessionIds: byRequestedSet(projection.workspaceRecoveryPendingSessionIds)
			};
		},
		async readRecoveryCandidates() {
			const result = await executeExistingOpenClawStateRead({ path }, { type: "workers.placementRecoveryCandidates" }, { current: true });
			if (!result || !result.ok || result.type !== "workers.placementRecoveryCandidates") throw new Error("Worker placement recovery candidates source is unavailable");
			return result.candidates;
		},
		getMany(sessionIds) {
			const normalizedIds = [...new Set(sessionIds.map((sessionId) => required(sessionId, "session id")))];
			const records = /* @__PURE__ */ new Map();
			const db = read();
			for (let offset = 0; offset < normalizedIds.length; offset += 250) {
				const chunk = normalizedIds.slice(offset, offset + 250);
				for (const row of executeSqliteQuerySync(db, query(db).selectFrom("worker_session_placements").selectAll().where("session_id", "in", chunk)).rows) {
					const record = fromRow(row);
					records.set(record.sessionId, withWorkspaceResultConflict(record));
				}
			}
			return records;
		},
		getWorkspaceResultReconcilingSessionIds(sessionIds) {
			const normalizedIds = [...new Set(sessionIds.map((sessionId) => required(sessionId, "session id")))];
			return readWorkerWorkspaceReconciliationFacts(read(), normalizedIds).reconcilingSessionIds;
		},
		retireSessionPlacement(input) {
			const sessionId = required(input.sessionId, "session id");
			if (!RETIRABLE_PLACEMENT_STATES.includes(input.expectedState)) throw new Error(`Cannot retire worker session placement from ${input.expectedState}`);
			write((db) => {
				if (executeSqliteQuerySync(db, query(db).deleteFrom("worker_session_placements").where("session_id", "=", sessionId).where("state", "=", input.expectedState).where("transition_generation", "=", input.expectedGeneration).where("turn_claim_owner", "is", null).where("turn_claim_id", "is", null).where("turn_claim_run_id", "is", null).where("turn_claim_generation", "is", null).where("turn_claim_owner_epoch", "is", null)).numAffectedRows !== 1n) throw new Error(`Worker session placement ${sessionId} changed before retirement`);
				publishPlacementTurnClaimCleared(db, sessionId);
			});
			workspaceResultConflicts.delete(sessionId);
		},
		recordWorkspaceResultConflict(claim, conflict) {
			const db = read();
			const current = find(db, required(claim.sessionId, "session id"));
			if (!current || !isCurrentPlacementTurnClaim(current, claim) && !hasCurrentWorkspaceResultClaim(db, claim)) throw new Error(`Session ${claim.sessionId} workspace result conflict owner changed`);
			if (!conflict) {
				workspaceResultConflicts.delete(claim.sessionId);
				sessionChanges.emit({
					agentId: current.agentId,
					sessionKey: current.sessionKey
				});
				return;
			}
			const paths = conflict.paths.map(exactConflictPath);
			const stagedResultRef = required(conflict.stagedResultRef, "staged result ref");
			if (paths.length === 0 || !/^refs\/openclaw\/worker-results\/[A-Za-z0-9-]+$/u.test(stagedResultRef)) throw new Error("Cloud workspace result conflict projection is invalid");
			workspaceResultConflicts.set(claim.sessionId, {
				conflict: projectWorkspaceResultConflict(paths, stagedResultRef, conflict.totalCount),
				placement: current,
				claim: { ...claim }
			});
			sessionChanges.emit({
				agentId: current.agentId,
				sessionKey: current.sessionKey
			});
		},
		bindPreparedEnvironment(input) {
			return write((db) => {
				const nowMs = now();
				const current = consumePreparedEnvironment(db, input, nowMs);
				return current ? updateTransition(db, current, "provisioning", { environmentId: input.environmentId }, nowMs) : void 0;
			});
		},
		startDispatch(input, dispatchOptions = {}) {
			return startWorkerPlacementDispatch(path, input, now(), dispatchOptions.assertCurrent);
		},
		transition(input) {
			if (!canTransitionWorkerSessionPlacement(input.from, input.to)) throw new Error(`Illegal worker session placement transition: ${input.from} -> ${input.to}`);
			if (input.from === "draining" && input.to === "reconciling") throw new Error("Use startReconcile after fencing the drained worker environment");
			if (input.to === "failed") throw new Error("Use fail to record terminal worker placement diagnostics");
			const sessionId = required(input.sessionId, "session id");
			return write((db) => {
				const current = getRequired(db, sessionId);
				if (current.state !== input.from || current.generation !== input.expectedGeneration) throw new Error(`Worker session placement ${sessionId} changed: expected ${input.from}@${input.expectedGeneration}, found ${current.state}@${current.generation}`);
				if (current.turnClaim) throw new Error(`Cannot transition session ${sessionId} during an active turn`);
				return updateTransition(db, current, input.to, input.patch ?? {}, now());
			});
		},
		startDrain(input) {
			return write((db) => drainWorkerSessionPlacement(db, input, now()));
		},
		startWorkspaceResultDrain(claim) {
			return write((db) => {
				const current = getRequired(db, required(claim.sessionId, "session id"));
				const ownsWorkspaceResult = hasCurrentWorkspaceResultClaim(db, claim);
				const owner = resolvePlacementTurnEnvironment(current, claim) ?? (ownsWorkspaceResult && current.state === "active" && current.environmentId && current.activeOwnerEpoch !== null ? {
					environmentId: current.environmentId,
					ownerEpoch: current.activeOwnerEpoch
				} : void 0);
				if (current.state !== "active" || !owner || !ownsWorkspaceResult) throw new Error(`Cannot drain stale workspace result for session ${claim.sessionId}`);
				return drainWorkerSessionPlacement(db, {
					sessionId: current.sessionId,
					environmentId: owner.environmentId,
					ownerEpoch: owner.ownerEpoch,
					expectedGeneration: current.generation,
					allowPendingWorkspaceResult: true
				}, now());
			});
		},
		startReconcile(input) {
			const sessionId = required(input.sessionId, "session id");
			const environmentId = required(input.environmentId, "environment id");
			const ownerEpoch = normalizeEpoch(input.ownerEpoch, "active owner epoch");
			return write((db) => {
				const current = getRequired(db, sessionId);
				if (current.state !== "draining" || current.generation !== input.expectedGeneration || current.environmentId !== environmentId || current.activeOwnerEpoch !== ownerEpoch) throw new Error(`Cannot reconcile stale worker placement for session ${sessionId}`);
				if (hasWorkerWorkspacePendingResult(db, sessionId)) throw new Error(`Cannot reconcile session ${sessionId} with a pending cloud workspace result`);
				const claim = current.turnClaim;
				if (claim?.owner === "local" && input.forceLocalClaim !== true) throw new Error(`Cannot reconcile session ${sessionId} while its local turn is active`);
				if (claim) {
					assertNoRunningWorkerSessionToolOperations(db, {
						sessionId,
						claimId: claim.claimId
					});
					clearWorkerTurnToolState(db, {
						sessionId,
						claimId: claim.claimId
					});
				}
				const values = transitionValues(current, "reconciling", {}, now());
				const update = query(db).updateTable("worker_session_placements").set(values).where("session_id", "=", sessionId).where("state", "=", "draining").where("transition_generation", "=", current.generation).where("environment_id", "=", environmentId).where("active_owner_epoch", "=", ownerEpoch);
				const guardedUpdate = claim ? update.where("turn_claim_owner", "=", claim.owner).where("turn_claim_id", "=", claim.claimId).where("turn_claim_run_id", "=", claim.runId).where("turn_claim_generation", "=", claim.generation).where("turn_claim_owner_epoch", claim.owner === "worker" ? "=" : "is", claim.ownerEpoch) : update.where("turn_claim_owner", "is", null);
				if (executeSqliteQuerySync(db, guardedUpdate).numAffectedRows !== 1n) throw new Error(`Worker session placement ${sessionId} changed during reconcile`);
				const updated = getRequired(db, sessionId);
				publishPlacementTurnClaimState(db, updated);
				if (claim) deferWorkerTurnClaimClosed(db, path, {
					sessionId,
					claimId: claim.claimId,
					runId: claim.runId,
					placementGeneration: claim.generation,
					owner: placementTurnOwner(current)
				});
				return updated;
			});
		},
		fail(input) {
			const sessionId = required(input.sessionId, "session id");
			const recoveryError = boundedWorkerError(input.recoveryError);
			return write((db) => {
				const current = getRequired(db, sessionId);
				if (input.expectedGeneration !== void 0 && current.generation !== input.expectedGeneration) throw new Error(`Worker session placement ${sessionId} changed before failure`);
				if (current.state === "failed") {
					if (executeSqliteQuerySync(db, query(db).updateTable("worker_session_placements").set({
						recovery_error: recoveryError,
						updated_at_ms: now()
					}).where("session_id", "=", sessionId).where("state", "=", "failed").where("transition_generation", "=", current.generation)).numAffectedRows !== 1n) throw new Error(`Worker session placement ${sessionId} changed during failure update`);
					return getRequired(db, sessionId);
				}
				if (!canTransitionWorkerSessionPlacement(current.state, "failed")) throw new Error(`Cannot fail worker session placement from ${current.state}`);
				const localClaim = current.turnClaim?.owner === "local" ? current.turnClaim : null;
				const updatedAtMs = now();
				if (executeSqliteQuerySync(db, query(db).updateTable("worker_session_placements").set({
					state: "failed",
					transition_generation: nextGeneration(current.generation),
					recovery_error: recoveryError,
					terminal_reason: recoveryError,
					terminal_at_ms: updatedAtMs,
					turn_claim_owner: localClaim ? "local" : null,
					turn_claim_id: localClaim?.claimId ?? null,
					turn_claim_run_id: localClaim?.runId ?? null,
					turn_claim_generation: localClaim?.generation ?? null,
					turn_claim_owner_epoch: null,
					updated_at_ms: updatedAtMs,
					state_changed_at_ms: updatedAtMs
				}).where("session_id", "=", sessionId).where("state", "=", current.state).where("transition_generation", "=", current.generation)).numAffectedRows !== 1n) throw new Error(`Worker session placement ${sessionId} changed during failure`);
				const updated = getRequired(db, sessionId);
				publishPlacementTurnClaimState(db, updated);
				const releasedClaim = projectWorkerSessionTurnClaim(current);
				if (releasedClaim) deferWorkerTurnClaimClosed(db, path, releasedClaim);
				return updated;
			});
		},
		adoptActive(input) {
			const sessionId = required(input.sessionId, "session id");
			const environmentId = required(input.environmentId, "environment id");
			const ownerEpoch = normalizeEpoch(input.ownerEpoch, "active owner epoch");
			const current = getRequired(read(), sessionId);
			if (current.state !== "active" || current.environmentId !== environmentId || current.activeOwnerEpoch !== ownerEpoch || input.expectedGeneration !== void 0 && current.generation !== input.expectedGeneration) throw new Error(`Cannot adopt stale worker placement for session ${sessionId}`);
			return current;
		},
		listForReconcile(sessionKey) {
			const db = read();
			let select = query(db).selectFrom("worker_session_placements").selectAll().where("state", "not in", ["local", "reclaimed"]);
			if (sessionKey !== void 0) select = select.where("session_key", "=", sessionKey);
			return executeSqliteQuerySync(db, select.orderBy("updated_at_ms").orderBy("session_id")).rows.map((row) => withWorkspaceResultConflict(fromRow(row)));
		},
		list() {
			const db = read();
			return executeSqliteQuerySync(db, query(db).selectFrom("worker_session_placements").selectAll().orderBy("session_id")).rows.map((row) => withWorkspaceResultConflict(fromRow(row)));
		},
		async readChangeSnapshot(profileIds) {
			const reply = await executeExistingOpenClawStateRead({ path }, {
				type: "workerPlacements.changeSnapshot",
				profileIds: profileIds ? [...profileIds] : void 0
			}, { current: true });
			if (!reply || !reply.ok || reply.type !== "workerPlacements.changeSnapshot") throw new Error("Worker placement change snapshot is unavailable");
			return reply.placements;
		}
	};
	attachWorkerTurnExecutionIdentityStore(store, path);
	return store;
}
//#endregion
export { createWorkerSessionPlacementStore as t };
