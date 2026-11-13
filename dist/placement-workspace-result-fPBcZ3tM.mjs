import { i as getNodeSqliteKysely, n as executeSqliteQuerySync } from "./kysely-sync-Y4_ti-rQ.mjs";
import { h as ensureRepositoryWorkspacePendingResultSchema } from "./openclaw-state-db-schema-additive-Dxdw3FOE.mjs";
import { n as sessionChanges } from "./session-row-changes-DFigA589.mjs";
import { f as placementTurnOwner, g as resolvePlacementTurnEnvironment, i as isCurrentPlacementTurnClaim } from "./placement-record-CfXaWmIw.mjs";
import { i as getRequired, n as find, p as publishPlacementWorkspaceResultState, r as fromRow } from "./placement-row-codec-VEfceuUb.mjs";
import { l as serializeWorkerWorkspaceReconciliationPlan, s as parseWorkerWorkspaceReconciliationPlan } from "./workspace-manifest-CARUR9sD.mjs";
import "./workspace-reconcile-CwR8jgTf.mjs";
import { createHash } from "node:crypto";
//#region src/gateway/worker-environments/placement-workspace-journal.ts
const query$1 = (db) => getNodeSqliteKysely(db);
function isCurrentJournalOwner(db, placement, owner) {
	if (placement?.state !== "active" && placement?.state !== "draining" || placement.environmentId !== owner.environmentId || placement.activeOwnerEpoch !== owner.ownerEpoch) return false;
	if (placement.generation === owner.placementGeneration) return true;
	if (placement.state !== "draining" || placement.generation !== owner.placementGeneration + 1) return false;
	return executeSqliteQuerySync(db, query$1(db).selectFrom("worker_workspace_pending_results").select("session_id").where("session_id", "=", owner.sessionId).where("environment_id", "=", owner.environmentId).where("owner_epoch", "=", owner.ownerEpoch).where("placement_generation", "=", owner.placementGeneration)).rows[0] !== void 0;
}
function assertJournalOwner(db, owner, options = {}) {
	const placement = getRequired(db, owner.sessionId);
	const isCurrentOwner = isCurrentJournalOwner(db, placement, owner);
	const isAllowedFailedOwner = options.allowFailedOwner === true && placement.state === "failed" && placement.generation > owner.placementGeneration && placement.environmentId === owner.environmentId && placement.activeOwnerEpoch === owner.ownerEpoch;
	if (!isCurrentOwner && !isAllowedFailedOwner) throw new Error(`Cannot reconcile stale worker workspace for session ${owner.sessionId}`);
	return placement;
}
function clearWorkerWorkspaceReconciliation(db, sessionId, currentManifestRef) {
	const existing = executeSqliteQuerySync(db, query$1(db).selectFrom("worker_workspace_reconciliations").select("current_manifest_ref").where("session_id", "=", sessionId)).rows[0];
	if (existing && currentManifestRef && existing.current_manifest_ref !== currentManifestRef) throw new Error(`Worker workspace journal result changed for session ${sessionId}`);
	executeSqliteQuerySync(db, query$1(db).deleteFrom("worker_workspace_reconciliations").where("session_id", "=", sessionId));
}
function createPlacementWorkspaceJournalOps(runtime) {
	const { now, read, write } = runtime;
	return {
		getWorkspaceReconciliationPlacement(owner) {
			const db = read();
			const placement = find(db, owner.sessionId);
			return isCurrentJournalOwner(db, placement, owner) ? placement : void 0;
		},
		listWorkspaceReconciliationOwners() {
			const db = read();
			return executeSqliteQuerySync(db, query$1(db).selectFrom("worker_workspace_reconciliations").select([
				"session_id",
				"environment_id",
				"owner_epoch",
				"placement_generation"
			]).orderBy("session_id")).rows.map((row) => ({
				sessionId: row.session_id,
				environmentId: row.environment_id,
				ownerEpoch: row.owner_epoch,
				placementGeneration: row.placement_generation
			}));
		},
		pruneOrphanedWorkspaceReconciliations(options) {
			return write((db) => {
				const rows = executeSqliteQuerySync(db, query$1(db).selectFrom("worker_workspace_reconciliations").select([
					"session_id",
					"environment_id",
					"owner_epoch",
					"placement_generation"
				]).orderBy("session_id")).rows;
				const pruned = [];
				for (const row of rows) {
					const owner = {
						sessionId: row.session_id,
						environmentId: row.environment_id,
						ownerEpoch: row.owner_epoch,
						placementGeneration: row.placement_generation
					};
					const placement = find(db, owner.sessionId);
					const stillOwned = isCurrentJournalOwner(db, placement, owner);
					const retainedFailedOwner = placement?.state === "failed" && placement.environmentId === owner.environmentId && placement.activeOwnerEpoch === owner.ownerEpoch && placement.generation > owner.placementGeneration && options.retainFailedOwner(placement.recoveryError);
					if (stillOwned || retainedFailedOwner) continue;
					if (executeSqliteQuerySync(db, query$1(db).deleteFrom("worker_workspace_reconciliations").where("session_id", "=", owner.sessionId).where("environment_id", "=", owner.environmentId).where("owner_epoch", "=", owner.ownerEpoch).where("placement_generation", "=", owner.placementGeneration)).numAffectedRows === 1n) {
						pruned.push(owner);
						if (placement) sessionChanges.emit({
							agentId: placement.agentId,
							sessionKey: placement.sessionKey
						}, db);
					}
				}
				return pruned;
			});
		},
		loadWorkspaceReconciliation(owner, options = {}) {
			const db = read();
			const placement = assertJournalOwner(db, owner, options);
			const row = executeSqliteQuerySync(db, query$1(db).selectFrom("worker_workspace_reconciliations").selectAll().where("session_id", "=", owner.sessionId)).rows[0];
			if (!row) return;
			const plan = parseWorkerWorkspaceReconciliationPlan(row.plan_json);
			if (row.environment_id !== owner.environmentId || row.owner_epoch !== owner.ownerEpoch || row.placement_generation !== owner.placementGeneration || placement.workspaceBaseManifestRef !== row.base_manifest_ref && placement.workspaceBaseManifestRef !== plan.appliedManifestRef) throw new Error(`Worker workspace journal owner is stale for session ${owner.sessionId}`);
			if (plan.baseManifestRef !== row.base_manifest_ref || plan.currentManifestRef !== row.current_manifest_ref) throw new Error(`Worker workspace journal metadata is inconsistent for ${owner.sessionId}`);
			if (row.base_pack.byteLength > 268435456 || createHash("sha256").update(row.base_pack).digest("hex") !== plan.basePackSha256) throw new Error(`Worker workspace journal snapshot is invalid for ${owner.sessionId}`);
			return {
				...plan,
				basePack: row.base_pack
			};
		},
		beginWorkspaceReconciliation(owner, journal) {
			if (journal.appliedManifestRef) throw new Error("Worker workspace reconciliation cannot begin as already applied");
			write((db) => {
				const placement = assertJournalOwner(db, owner);
				if (placement.workspaceBaseManifestRef !== journal.baseManifestRef) throw new Error(`Worker workspace base changed for session ${owner.sessionId}`);
				if (executeSqliteQuerySync(db, query$1(db).insertInto("worker_workspace_reconciliations").values({
					session_id: owner.sessionId,
					environment_id: owner.environmentId,
					owner_epoch: owner.ownerEpoch,
					placement_generation: owner.placementGeneration,
					base_manifest_ref: journal.baseManifestRef,
					current_manifest_ref: journal.currentManifestRef,
					plan_json: serializeWorkerWorkspaceReconciliationPlan(journal),
					base_pack: journal.basePack,
					created_at_ms: now()
				}).onConflict((conflict) => conflict.column("session_id").doNothing())).numAffectedRows !== 1n) throw new Error(`Worker workspace reconciliation is already pending for ${owner.sessionId}`);
				sessionChanges.emit({
					agentId: placement.agentId,
					sessionKey: placement.sessionKey
				}, db);
			});
		},
		abortWorkspaceReconciliation(owner, options = {}) {
			write((db) => {
				if (!options.force) {
					const placement = assertJournalOwner(db, owner);
					clearWorkerWorkspaceReconciliation(db, owner.sessionId);
					sessionChanges.emit({
						agentId: placement.agentId,
						sessionKey: placement.sessionKey
					}, db);
					return;
				}
				if (executeSqliteQuerySync(db, query$1(db).deleteFrom("worker_workspace_reconciliations").where("session_id", "=", owner.sessionId).where("environment_id", "=", owner.environmentId).where("owner_epoch", "=", owner.ownerEpoch).where("placement_generation", "=", owner.placementGeneration)).numAffectedRows !== 1n) throw new Error(`Worker workspace journal changed for ${owner.sessionId}`);
				sessionChanges.emit({
					all: true,
					scope: "worker-placements"
				}, db);
			});
		}
	};
}
//#endregion
//#region src/gateway/worker-environments/placement-workspace-result.ts
const query = (db) => getNodeSqliteKysely(db);
function pendingResultFromRow(row) {
	return {
		sessionId: row.session_id,
		environmentId: row.environment_id,
		ownerEpoch: row.owner_epoch,
		placementGeneration: row.placement_generation,
		claimId: row.claim_id,
		runId: row.run_id,
		gatewayInstanceId: row.gateway_instance_id,
		recoveryRequestedAtMs: row.recovery_requested_at_ms,
		workspaceAcceptedAtMs: row.workspace_accepted_at_ms,
		stagedResultRef: row.staged_result_ref,
		...row.repository_workspace_id ? { repositoryWorkspaceId: row.repository_workspace_id } : {}
	};
}
function findPendingWorkerWorkspaceResult(placements, claim) {
	return placements.listPendingWorkspaceResults(claim.sessionId).find((pending) => pending.sessionId === claim.sessionId && pending.claimId === claim.claimId && pending.runId === claim.runId);
}
function matchesWorkspaceResultGeneration(placement, generation) {
	return (placement.state === "active" || placement.state === "draining") && (placement.generation === generation || placement.state === "draining" && placement.generation === generation + 1);
}
function isCurrentWorkerWorkspacePendingResultOwner(placement, pending) {
	if (placement?.state !== "active" && placement?.state !== "draining" || placement.sessionId !== pending.sessionId || placement.environmentId !== pending.environmentId || placement.activeOwnerEpoch !== pending.ownerEpoch) return false;
	if (placement.turnClaim) return isCurrentPlacementTurnClaim(placement, {
		sessionId: pending.sessionId,
		claimId: pending.claimId,
		runId: pending.runId,
		placementGeneration: pending.placementGeneration,
		owner: placementTurnOwner(placement)
	});
	return matchesWorkspaceResultGeneration(placement, pending.placementGeneration);
}
function matchesWorkspaceResultClaim(placement, pending, claim) {
	const recoveryOwner = placement.state === "active" || placement.state === "draining" ? placementTurnOwner(placement) : void 0;
	return pending.sessionId === claim.sessionId && pending.environmentId === placement.environmentId && pending.ownerEpoch === placement.activeOwnerEpoch && pending.placementGeneration === claim.placementGeneration && pending.claimId === claim.claimId && pending.runId === claim.runId && (isCurrentPlacementTurnClaim(placement, claim) || matchesWorkspaceResultGeneration(placement, claim.placementGeneration) && placement.turnClaim === null && recoveryOwner?.kind === "local" && claim.owner.kind === "local" && claim.owner.environmentId === recoveryOwner.environmentId && claim.owner.ownerEpoch === recoveryOwner.ownerEpoch);
}
function hasCurrentWorkspaceResultClaim(db, claim) {
	const placement = getRequired(db, claim.sessionId);
	const row = executeSqliteQuerySync(db, query(db).selectFrom("worker_workspace_pending_results").selectAll().where("session_id", "=", claim.sessionId)).rows[0];
	return Boolean(row && matchesWorkspaceResultClaim(placement, pendingResultFromRow(row), claim));
}
function clearWorkerWorkspacePendingResult(db, sessionId) {
	executeSqliteQuerySync(db, query(db).deleteFrom("worker_workspace_pending_results").where("session_id", "=", sessionId));
	publishPlacementWorkspaceResultState(db, sessionId);
}
function readWorkerWorkspaceReconciliationFacts(db, sessionIds) {
	const placements = /* @__PURE__ */ new Map();
	const pendingResults = /* @__PURE__ */ new Map();
	for (let offset = 0; offset < sessionIds.length; offset += 250) {
		const chunk = sessionIds.slice(offset, offset + 250);
		for (const row of executeSqliteQuerySync(db, query(db).selectFrom("worker_session_placements").selectAll().where("session_id", "in", chunk)).rows) {
			const placement = fromRow(row);
			placements.set(placement.sessionId, placement);
		}
		for (const row of executeSqliteQuerySync(db, query(db).selectFrom("worker_workspace_pending_results").selectAll().where("session_id", "in", chunk)).rows) pendingResults.set(row.session_id, pendingResultFromRow(row));
	}
	return {
		placements,
		reconcilingSessionIds: new Set([...pendingResults.values()].flatMap((pending) => {
			const placement = placements.get(pending.sessionId);
			return (placement?.turnClaim?.owner === "worker" || pending.stagedResultRef !== null) && isCurrentWorkerWorkspacePendingResultOwner(placement, pending) ? [pending.sessionId] : [];
		})),
		pendingResults
	};
}
function hasWorkerWorkspacePendingResult(db, sessionId) {
	return Boolean(executeSqliteQuerySync(db, query(db).selectFrom("worker_workspace_pending_results").select("session_id").where("session_id", "=", sessionId)).rows[0]);
}
function hasAcceptedWorkerWorkspacePendingResult(db, sessionId) {
	return Boolean(executeSqliteQuerySync(db, query(db).selectFrom("worker_workspace_pending_results").select("session_id").where("session_id", "=", sessionId).where("workspace_accepted_at_ms", "is not", null)).rows[0]);
}
function insertWorkerWorkspacePendingResult(db, claim, nowMs, gatewayInstanceId) {
	const placement = getRequired(db, claim.sessionId);
	const environment = resolvePlacementTurnEnvironment(placement, claim);
	if (!environment) throw new Error(`Cannot retain stale worker workspace result for ${claim.sessionId}`);
	const { environmentId, ownerEpoch } = environment;
	if (executeSqliteQuerySync(db, query(db).insertInto("worker_workspace_pending_results").values({
		session_id: claim.sessionId,
		environment_id: environmentId,
		owner_epoch: ownerEpoch,
		placement_generation: claim.placementGeneration,
		claim_id: claim.claimId,
		run_id: claim.runId,
		gateway_instance_id: gatewayInstanceId,
		recovery_requested_at_ms: null,
		workspace_accepted_at_ms: null,
		staged_result_ref: null,
		created_at_ms: nowMs
	}).onConflict((conflict) => conflict.column("session_id").doNothing())).numAffectedRows === 1n) {
		publishPlacementWorkspaceResultState(db, placement.sessionId);
		sessionChanges.emit({
			agentId: placement.agentId,
			sessionKey: placement.sessionKey
		}, db);
		return;
	}
	const existing = executeSqliteQuerySync(db, query(db).selectFrom("worker_workspace_pending_results").selectAll().where("session_id", "=", claim.sessionId)).rows[0];
	if (!existing || existing.environment_id !== environmentId || existing.owner_epoch !== ownerEpoch || existing.placement_generation !== claim.placementGeneration || existing.claim_id !== claim.claimId || existing.run_id !== claim.runId) throw new Error(`Worker workspace result is already pending for ${claim.sessionId}`);
}
function markWorkerWorkspacePendingResultAccepted(db, claim, nowMs) {
	const placement = getRequired(db, claim.sessionId);
	const environment = resolvePlacementTurnEnvironment(placement, claim);
	if (!environment && !hasCurrentWorkspaceResultClaim(db, claim)) throw new Error(`Cannot accept stale worker workspace result for ${claim.sessionId}`);
	const environmentId = environment?.environmentId ?? placement.environmentId;
	const ownerEpoch = environment?.ownerEpoch ?? placement.activeOwnerEpoch;
	if (executeSqliteQuerySync(db, query(db).updateTable("worker_workspace_pending_results").set({ workspace_accepted_at_ms: nowMs }).where("session_id", "=", claim.sessionId).where("environment_id", "=", environmentId).where("owner_epoch", "=", ownerEpoch).where("placement_generation", "=", claim.placementGeneration).where("claim_id", "=", claim.claimId).where("run_id", "=", claim.runId)).numAffectedRows !== 1n) throw new Error(`Cannot accept stale worker workspace result for ${claim.sessionId}`);
}
function createPlacementWorkspaceResultOps(runtime) {
	const { instanceId, now, read, write } = runtime;
	const assertPendingClaim = (db, claim) => {
		const placement = getRequired(db, claim.sessionId);
		const row = executeSqliteQuerySync(db, query(db).selectFrom("worker_workspace_pending_results").selectAll().where("session_id", "=", claim.sessionId)).rows[0];
		if (!row || !matchesWorkspaceResultClaim(placement, pendingResultFromRow(row), claim)) throw new Error(`Cannot update stale worker workspace result for ${claim.sessionId}`);
		publishPlacementWorkspaceResultState(db, placement.sessionId);
		sessionChanges.emit({
			agentId: placement.agentId,
			sessionKey: placement.sessionKey
		}, db);
		return row;
	};
	return {
		workspaceResultInstanceId() {
			return instanceId;
		},
		validateWorkspaceResultClaim(claim) {
			return hasCurrentWorkspaceResultClaim(read(), claim);
		},
		listPendingWorkspaceResults(sessionId) {
			const db = read();
			let pendingResults = query(db).selectFrom("worker_workspace_pending_results").selectAll();
			if (sessionId !== void 0) pendingResults = pendingResults.where("session_id", "=", sessionId);
			return executeSqliteQuerySync(db, pendingResults.orderBy("session_id")).rows.map(pendingResultFromRow);
		},
		markWorkspaceResultPending(claim) {
			write((db) => {
				insertWorkerWorkspacePendingResult(db, claim, now(), instanceId);
			});
		},
		recordStagedWorkspaceResult(claim, stagedResultRef, repositoryWorkspaceId) {
			if (!/^refs\/openclaw\/worker-results\/[A-Za-z0-9-]+$/u.test(stagedResultRef)) throw new Error("Worker workspace staged result reference is invalid");
			if (repositoryWorkspaceId !== void 0 && !/^[a-f0-9-]{36}$/u.test(repositoryWorkspaceId)) throw new Error("Worker workspace result repository identity is invalid");
			write((db) => {
				if (repositoryWorkspaceId !== void 0) ensureRepositoryWorkspacePendingResultSchema(db);
				const pending = assertPendingClaim(db, claim);
				if (pending.workspace_accepted_at_ms !== null) throw new Error(`Cannot restage accepted worker workspace result for ${claim.sessionId}`);
				if (pending.staged_result_ref && (pending.staged_result_ref !== stagedResultRef || (pending.repository_workspace_id ?? void 0) !== repositoryWorkspaceId)) throw new Error(`Worker workspace result ref changed for ${claim.sessionId}`);
				if (repositoryWorkspaceId !== void 0) {
					const placement = getRequired(db, claim.sessionId);
					const repository = executeSqliteQuerySync(db, query(db).selectFrom("session_repository_workspaces").select(["agent_id", "session_key"]).where("workspace_id", "=", repositoryWorkspaceId)).rows[0];
					if (!repository || repository.agent_id !== placement.agentId || repository.session_key !== placement.sessionKey) throw new Error(`Worker workspace result repository owner changed for ${claim.sessionId}`);
				}
				if (executeSqliteQuerySync(db, query(db).updateTable("worker_workspace_pending_results").set({
					staged_result_ref: stagedResultRef,
					...repositoryWorkspaceId ? { repository_workspace_id: repositoryWorkspaceId } : {}
				}).where("session_id", "=", claim.sessionId).where("claim_id", "=", claim.claimId).where("run_id", "=", claim.runId)).numAffectedRows !== 1n) throw new Error(`Cannot stage stale worker workspace result for ${claim.sessionId}`);
			});
		},
		acceptWorkspaceResult(claim) {
			write((db) => {
				assertPendingClaim(db, claim);
				markWorkerWorkspacePendingResultAccepted(db, claim, now());
				clearWorkerWorkspaceReconciliation(db, claim.sessionId);
			});
		},
		handoffWorkspaceResultRecovery(claim) {
			write((db) => {
				if (assertPendingClaim(db, claim).gateway_instance_id !== instanceId) throw new Error(`Worker workspace result belongs to another gateway for ${claim.sessionId}`);
				if (executeSqliteQuerySync(db, query(db).updateTable("worker_workspace_pending_results").set({ recovery_requested_at_ms: now() }).where("session_id", "=", claim.sessionId).where("gateway_instance_id", "=", instanceId)).numAffectedRows !== 1n) throw new Error(`Worker workspace result changed for ${claim.sessionId}`);
			});
		},
		abandonWorkspaceResult(pending) {
			write((db) => {
				if (executeSqliteQuerySync(db, query(db).deleteFrom("worker_workspace_pending_results").where("session_id", "=", pending.sessionId).where("environment_id", "=", pending.environmentId).where("owner_epoch", "=", pending.ownerEpoch).where("placement_generation", "=", pending.placementGeneration).where("claim_id", "=", pending.claimId).where("run_id", "=", pending.runId)).numAffectedRows !== 1n) throw new Error(`Worker workspace result changed for ${pending.sessionId}`);
				publishPlacementWorkspaceResultState(db, pending.sessionId);
				sessionChanges.emit({
					all: true,
					scope: "worker-placements"
				}, db);
			});
		}
	};
}
//#endregion
export { hasCurrentWorkspaceResultClaim as a, isCurrentWorkerWorkspacePendingResultOwner as c, clearWorkerWorkspaceReconciliation as d, createPlacementWorkspaceJournalOps as f, hasAcceptedWorkerWorkspacePendingResult as i, matchesWorkspaceResultClaim as l, createPlacementWorkspaceResultOps as n, hasWorkerWorkspacePendingResult as o, findPendingWorkerWorkspaceResult as r, insertWorkerWorkspacePendingResult as s, clearWorkerWorkspacePendingResult as t, readWorkerWorkspaceReconciliationFacts as u };
