import { i as getNodeSqliteKysely, n as executeSqliteQuerySync, r as executeSqliteQueryTakeFirstSync } from "./kysely-sync-Y4_ti-rQ.mjs";
import { i as tableExists, n as ensureColumn } from "./openclaw-state-db-schema-helpers-C29HKgWe.mjs";
import { f as OPENCLAW_STATE_SCHEMA_SQL } from "./openclaw-state-db-legacy-backfills-xddLXhvs.mjs";
import { n as sessionChanges } from "./session-row-changes-DFigA589.mjs";
import { i as generateSecureToken } from "./secure-random-DiIgddjs.mjs";
import "./worker-protocol-primitives-vA8IesMt.mjs";
import { a as isForceAbandonedWorkerPlacement, h as required, r as assertRecordShape, s as normalizeEpoch } from "./placement-record-CfXaWmIw.mjs";
import { a as query, f as publishPlacementTurnClaimState, i as getRequired, o as transitionValues } from "./placement-row-codec-VEfceuUb.mjs";
import { d as clearWorkerWorkspaceReconciliation, o as hasWorkerWorkspacePendingResult } from "./placement-workspace-result-fPBcZ3tM.mjs";
import { t as boundedWorkerError } from "./worker-error-D4DYRm01.mjs";
import { isDeepStrictEqual } from "node:util";
//#region src/gateway/worker-environments/placement-drain.ts
function drainWorkerSessionPlacement(db, input, nowMs) {
	const sessionId = required(input.sessionId, "session id");
	const environmentId = required(input.environmentId, "environment id");
	const ownerEpoch = normalizeEpoch(input.ownerEpoch, "active owner epoch");
	const current = getRequired(db, sessionId);
	if (current.state !== "active" || current.generation !== input.expectedGeneration || current.environmentId !== environmentId || current.activeOwnerEpoch !== ownerEpoch) throw new Error(`Cannot drain stale worker placement for session ${sessionId}`);
	if (!input.allowPendingWorkspaceResult && hasWorkerWorkspacePendingResult(db, sessionId)) throw new Error(`Cannot drain session ${sessionId} with a pending cloud workspace result`);
	const values = transitionValues(current, "draining", input.workspaceBaseManifestRef === void 0 ? {} : { workspaceBaseManifestRef: input.workspaceBaseManifestRef }, nowMs);
	const turnClaim = current.turnClaim;
	if (turnClaim) {
		values.turn_claim_owner = turnClaim.owner;
		values.turn_claim_id = turnClaim.claimId;
		values.turn_claim_run_id = turnClaim.runId;
		values.turn_claim_generation = turnClaim.generation;
		values.turn_claim_owner_epoch = turnClaim.ownerEpoch;
	}
	assertRecordShape({
		state: "draining",
		executionMode: current.executionMode,
		environmentId,
		activeOwnerEpoch: ownerEpoch,
		workspaceBaseManifestRef: values.workspace_base_manifest_ref,
		remoteWorkspaceDir: values.remote_workspace_dir,
		workerBundleHash: values.worker_bundle_hash,
		lastTranscriptAckCursor: values.last_transcript_ack_cursor,
		lastLiveEventAckCursor: values.last_live_event_ack_cursor,
		recoveryError: values.recovery_error,
		terminalReason: values.terminal_reason,
		terminalAtMs: values.terminal_at_ms,
		turnClaim
	});
	if (executeSqliteQuerySync(db, query(db).updateTable("worker_session_placements").set(values).where("session_id", "=", sessionId).where("state", "=", "active").where("transition_generation", "=", current.generation).where("environment_id", "=", environmentId).where("active_owner_epoch", "=", ownerEpoch)).numAffectedRows !== 1n) throw new Error(`Worker session placement ${sessionId} changed during drain`);
	if (input.workspaceBaseManifestRef !== void 0) {
		clearWorkerWorkspaceReconciliation(db, sessionId, input.workspaceBaseManifestRef);
		sessionChanges.emit({
			agentId: current.agentId,
			sessionKey: current.sessionKey
		}, db);
	}
	const record = getRequired(db, sessionId);
	publishPlacementTurnClaimState(db, record);
	return record;
}
//#endregion
//#region src/gateway/worker-environments/placement-move-intent.ts
const MOVE_SCHEMA_START = "CREATE TABLE IF NOT EXISTS worker_session_placement_moves (";
const MOVE_SCHEMA_END = "\n) STRICT;";
const MOVE_OPERATION_PREFIX = "move:v1:";
const MOVE_MACHINE_CLASS_MAX_LENGTH = 128;
const MOVE_OS_MAX_LENGTH = 64;
const moveQuery = (db) => getNodeSqliteKysely(db);
function moveSchemaSql() {
	const start = OPENCLAW_STATE_SCHEMA_SQL.indexOf(MOVE_SCHEMA_START);
	const endMarkerStart = OPENCLAW_STATE_SCHEMA_SQL.indexOf(MOVE_SCHEMA_END, start);
	if (start < 0 || endMarkerStart < start) throw new Error("Worker placement move schema marker is missing");
	return OPENCLAW_STATE_SCHEMA_SQL.slice(start, endMarkerStart + 10);
}
const ensuredMoveSchemaHandles = /* @__PURE__ */ new WeakSet();
function ensureWorkerPlacementMoveSchema(db) {
	if (ensuredMoveSchemaHandles.has(db)) return;
	db.exec(moveSchemaSql());
	ensureColumn(db, "worker_session_placement_moves", "target_machine_class TEXT");
	ensureColumn(db, "worker_session_placement_moves", "target_os TEXT");
	ensureColumn(db, "worker_session_placement_moves", "abandon_source INTEGER");
	ensuredMoveSchemaHandles.add(db);
}
function ensureExistingWorkerPlacementMoveSchema(db) {
	if (ensuredMoveSchemaHandles.has(db)) return true;
	if (!tableExists(db, "worker_session_placement_moves")) return false;
	ensureWorkerPlacementMoveSchema(db);
	return true;
}
function normalizeGeneration(value) {
	if (!Number.isSafeInteger(value) || value < 0) throw new Error("Worker placement move source generation must be a non-negative integer");
	return value;
}
function boundedIdentifier(value, field, maximumLength = 256) {
	const normalized = required(value, field);
	if (normalized.length > maximumLength) throw new Error(`Worker session placement ${field} exceeds ${maximumLength} characters`);
	return normalized;
}
function normalizeOperationId(value) {
	const operationId = required(value, "move operation id");
	if (!operationId.startsWith(MOVE_OPERATION_PREFIX) || operationId.length > 128) throw new Error("Worker session placement move operation id is invalid");
	return operationId;
}
function normalizeWorkerPlacementMoveTarget(target) {
	if (target.kind !== "profile" && Object.hasOwn(target, "os")) throw new Error("Worker placement move operating system requires a profile target");
	switch (target.kind) {
		case "gateway": return { kind: "gateway" };
		case "profile": {
			const machineClass = target.machineClass;
			return {
				kind: "profile",
				profileId: boundedIdentifier(target.profileId, "move profile id"),
				...target.os === void 0 ? {} : { os: boundedIdentifier(target.os, "move operating system", MOVE_OS_MAX_LENGTH) },
				...machineClass === void 0 ? {} : { machineClass: boundedIdentifier(machineClass, "move machine class", MOVE_MACHINE_CLASS_MAX_LENGTH) }
			};
		}
		case "device": return {
			kind: "device",
			deviceId: boundedIdentifier(target.deviceId, "move device id")
		};
	}
	throw new Error("Worker placement move target is invalid");
}
function normalizeWorkerPlacementMoveSource(source) {
	return {
		generation: normalizeGeneration(source.generation),
		environmentId: boundedIdentifier(source.environmentId, "move source environment id"),
		ownerEpoch: normalizeEpoch(source.ownerEpoch, "move source owner epoch")
	};
}
function targetValues(target) {
	switch (target.kind) {
		case "gateway": return {
			target_kind: target.kind,
			target_id: null,
			target_machine_class: null,
			target_os: null
		};
		case "profile": return {
			target_kind: target.kind,
			target_id: target.profileId,
			target_machine_class: target.machineClass ?? null,
			target_os: target.os ?? null
		};
		case "device": return {
			target_kind: target.kind,
			target_id: target.deviceId,
			target_machine_class: null,
			target_os: null
		};
	}
	throw new Error("Worker placement move target is invalid");
}
function normalizeAbandonSource(value) {
	if (value === null) return false;
	if (value === 1) return true;
	throw new Error("Invalid worker placement move source abandonment value");
}
function abandonSourceValue(abandonSource) {
	return abandonSource ? 1 : null;
}
function fromRow(row) {
	const source = normalizeWorkerPlacementMoveSource({
		generation: row.source_generation,
		environmentId: row.source_environment_id,
		ownerEpoch: row.source_owner_epoch
	});
	let target;
	if (row.target_kind !== "profile" && (row.target_machine_class !== null || row.target_os !== null)) throw new Error(`Invalid worker placement move target: ${row.target_kind}`);
	if (row.target_kind === "gateway" && row.target_id === null) target = { kind: "gateway" };
	else if (row.target_kind === "profile" && row.target_id !== null) target = normalizeWorkerPlacementMoveTarget({
		kind: "profile",
		profileId: row.target_id,
		...row.target_os === null ? {} : { os: row.target_os },
		...row.target_machine_class === null ? {} : { machineClass: row.target_machine_class }
	});
	else if (row.target_kind === "device" && row.target_id !== null) target = {
		kind: "device",
		deviceId: boundedIdentifier(row.target_id, "move device id")
	};
	else throw new Error(`Invalid worker placement move target: ${row.target_kind}`);
	const abandonSource = normalizeAbandonSource(row.abandon_source);
	if (abandonSource && target.kind !== "gateway") throw new Error("Worker placement move source abandonment requires a Gateway target");
	return {
		operationId: normalizeOperationId(row.operation_id),
		sessionId: required(row.session_id, "move session id"),
		source,
		target,
		abandonSource,
		lastError: row.last_error,
		createdAtMs: row.created_at_ms,
		updatedAtMs: row.updated_at_ms
	};
}
function findMoveRowBySession(db, sessionId) {
	if (!ensureExistingWorkerPlacementMoveSchema(db)) return;
	return executeSqliteQueryTakeFirstSync(db, moveQuery(db).selectFrom("worker_session_placement_moves").selectAll().where("session_id", "=", sessionId));
}
function readWorkerPlacementMove(db, sessionId) {
	const row = findMoveRowBySession(db, sessionId);
	return row ? fromRow(row) : void 0;
}
/** Display reads tolerate the shipped additive columns without mutating their source. */
function readWorkerPlacementMovesReadOnly(db, sessionIds) {
	const results = /* @__PURE__ */ new Map();
	if (!tableExists(db, "worker_session_placement_moves")) return results;
	for (let offset = 0; offset < sessionIds.length; offset += 250) for (const row of executeSqliteQuerySync(db, moveQuery(db).selectFrom("worker_session_placement_moves").selectAll().where("session_id", "in", sessionIds.slice(offset, offset + 250))).rows) {
		const intent = fromRow({
			...row,
			target_machine_class: row.target_machine_class ?? null,
			target_os: row.target_os ?? null,
			abandon_source: row.abandon_source ?? null
		});
		results.set(intent.sessionId, intent);
	}
	return results;
}
function findMoveRowByOperation(db, operationId) {
	if (!ensureExistingWorkerPlacementMoveSchema(db)) return;
	return executeSqliteQueryTakeFirstSync(db, moveQuery(db).selectFrom("worker_session_placement_moves").selectAll().where("operation_id", "=", operationId));
}
function requireExactMove(db, input) {
	const operationId = normalizeOperationId(input.operationId);
	const sessionId = required(input.sessionId, "move session id");
	const row = findMoveRowByOperation(db, operationId);
	if (!row || row.session_id !== sessionId) throw new Error(`Session ${sessionId} placement move changed before completion`);
	return fromRow(row);
}
function exactMoveValues(intent) {
	return {
		operation_id: intent.operationId,
		session_id: intent.sessionId,
		source_generation: intent.source.generation,
		source_environment_id: intent.source.environmentId,
		source_owner_epoch: intent.source.ownerEpoch,
		...targetValues(intent.target),
		abandon_source: abandonSourceValue(intent.abandonSource)
	};
}
function deleteExactMove(db, intent) {
	const statement = moveQuery(db).deleteFrom("worker_session_placement_moves").where((eb) => eb.and(exactMoveValues(intent)));
	if (executeSqliteQuerySync(db, statement).numAffectedRows !== 1n) throw new Error(`Session ${intent.sessionId} placement move changed before completion`);
	sessionChanges.emit({
		all: true,
		scope: "worker-placements"
	}, db);
}
function requireExactAttachedEnvironment(db, input) {
	const row = executeSqliteQueryTakeFirstSync(db, moveQuery(db).selectFrom("worker_environments").select([
		"state",
		"owner_epoch",
		"profile_id",
		"attached_session_ids_json"
	]).where("environment_id", "=", input.environmentId));
	let attachedSessionIds;
	try {
		attachedSessionIds = row ? JSON.parse(row.attached_session_ids_json) : void 0;
	} catch {
		attachedSessionIds = void 0;
	}
	if (!row || row.state !== "attached" || row.owner_epoch !== input.ownerEpoch || input.profileId !== void 0 && row.profile_id !== input.profileId || !Array.isArray(attachedSessionIds) || attachedSessionIds.length !== 1 || attachedSessionIds[0] !== input.sessionId) throw new Error(`Cannot move stale worker environment for session ${input.sessionId}`);
}
function createPlacementMoveOps(runtime) {
	const { read, write, now } = runtime;
	return {
		getPlacementMove(sessionId) {
			return readWorkerPlacementMove(read(), required(sessionId, "move session id"));
		},
		beginPlacementMove(input) {
			const sessionId = required(input.sessionId, "move session id");
			const source = normalizeWorkerPlacementMoveSource(input.source);
			const target = normalizeWorkerPlacementMoveTarget(input.target);
			const abandonSource = input.abandonSource === true;
			if (abandonSource && target.kind !== "gateway") throw new Error("Worker placement move source abandonment requires a Gateway target");
			const operationId = `${MOVE_OPERATION_PREFIX}${generateSecureToken(32)}`;
			return write((db) => {
				const existingRow = findMoveRowBySession(db, sessionId);
				if (existingRow) {
					const existing = fromRow(existingRow);
					if (!isDeepStrictEqual(existing.source, source) || !isDeepStrictEqual(existing.target, target) || existing.abandonSource !== abandonSource) throw new Error(`Session ${sessionId} already has a conflicting placement move`);
					return {
						intent: existing,
						placement: getRequired(db, sessionId),
						joined: true
					};
				}
				const current = getRequired(db, sessionId);
				if (current.state !== "active" && !(abandonSource && isForceAbandonedWorkerPlacement(current)) || current.generation !== source.generation || current.environmentId !== source.environmentId || current.activeOwnerEpoch !== source.ownerEpoch) throw new Error(`Cannot move stale worker placement for session ${sessionId}`);
				if (current.state === "active") requireExactAttachedEnvironment(db, {
					sessionId,
					...source
				});
				ensureWorkerPlacementMoveSchema(db);
				const timestamp = now();
				const row = {
					operation_id: operationId,
					session_id: sessionId,
					source_generation: source.generation,
					source_environment_id: source.environmentId,
					source_owner_epoch: source.ownerEpoch,
					...targetValues(target),
					abandon_source: abandonSourceValue(abandonSource),
					last_error: null,
					created_at_ms: timestamp,
					updated_at_ms: timestamp
				};
				executeSqliteQuerySync(db, moveQuery(db).insertInto("worker_session_placement_moves").values(row));
				const placement = current.state === "failed" ? current : drainWorkerSessionPlacement(db, {
					sessionId,
					...source,
					expectedGeneration: source.generation,
					...abandonSource ? { allowPendingWorkspaceResult: true } : {}
				}, timestamp);
				return {
					intent: fromRow(row),
					placement,
					joined: false
				};
			});
		},
		recordPlacementMoveError(input) {
			return write((db) => {
				const row = findMoveRowByOperation(db, normalizeOperationId(input.operationId));
				if (!row || row.session_id !== required(input.sessionId, "move session id")) return false;
				const intent = fromRow(row);
				const statement = moveQuery(db).updateTable("worker_session_placement_moves").set({
					last_error: boundedWorkerError(input.error),
					updated_at_ms: now()
				}).where((eb) => eb.and(exactMoveValues(intent)));
				sessionChanges.emit({
					all: true,
					scope: "worker-placements"
				}, db);
				return executeSqliteQuerySync(db, statement).numAffectedRows === 1n;
			});
		},
		cancelPlacementMove(input) {
			write((db) => {
				deleteExactMove(db, requireExactMove(db, input));
			});
		},
		completePlacementMoveSourceToLocal(input) {
			return write((db) => {
				const intent = requireExactMove(db, input);
				const current = getRequired(db, intent.sessionId);
				if (current.state !== "reconciling" || current.generation !== input.expectedGeneration || current.environmentId !== intent.source.environmentId || current.activeOwnerEpoch !== intent.source.ownerEpoch) throw new Error(`Cannot complete stale Gateway placement move for session ${intent.sessionId}`);
				const values = transitionValues(current, "local", {}, now());
				if (executeSqliteQuerySync(db, query(db).updateTable("worker_session_placements").set(values).where("session_id", "=", intent.sessionId).where("state", "=", "reconciling").where("transition_generation", "=", current.generation).where("environment_id", "=", intent.source.environmentId).where("active_owner_epoch", "=", intent.source.ownerEpoch).where("turn_claim_owner", "is", null)).numAffectedRows !== 1n) throw new Error(`Session ${intent.sessionId} changed during Gateway placement move`);
				if (intent.target.kind === "gateway") deleteExactMove(db, intent);
				const record = getRequired(db, intent.sessionId);
				publishPlacementTurnClaimState(db, record);
				return record;
			});
		},
		completeAbandonedPlacementMoveSourceToLocal(input) {
			return write((db) => {
				const intent = requireExactMove(db, input);
				if (!intent.abandonSource || intent.target.kind !== "gateway") throw new Error(`Session ${intent.sessionId} placement move is not an abandonment`);
				const current = getRequired(db, intent.sessionId);
				if (current.state !== "failed" || current.generation !== input.expectedGeneration || current.environmentId !== intent.source.environmentId || current.activeOwnerEpoch !== intent.source.ownerEpoch || current.recoveryError !== input.expectedRecoveryError || current.turnClaim !== null) throw new Error(`Cannot complete stale abandoned placement move for session ${intent.sessionId}`);
				const values = transitionValues(current, "local", {}, now());
				if (executeSqliteQuerySync(db, query(db).updateTable("worker_session_placements").set(values).where("session_id", "=", intent.sessionId).where("state", "=", "failed").where("transition_generation", "=", current.generation).where("environment_id", "=", intent.source.environmentId).where("active_owner_epoch", "=", intent.source.ownerEpoch).where("recovery_error", "=", input.expectedRecoveryError).where("turn_claim_owner", "is", null)).numAffectedRows !== 1n) throw new Error(`Session ${intent.sessionId} changed during abandoned placement move`);
				deleteExactMove(db, intent);
				const record = getRequired(db, intent.sessionId);
				publishPlacementTurnClaimState(db, record);
				return record;
			});
		},
		completePlacementMoveToWorker(input) {
			const environmentId = boundedIdentifier(input.environmentId, "move destination environment id");
			const ownerEpoch = normalizeEpoch(input.ownerEpoch, "move destination owner epoch");
			return write((db) => {
				const intent = requireExactMove(db, input);
				if (intent.target.kind === "gateway") throw new Error(`Session ${intent.sessionId} placement move target is not a worker`);
				const current = getRequired(db, intent.sessionId);
				if (current.state !== "active" || current.generation !== input.expectedGeneration || current.environmentId !== environmentId || current.activeOwnerEpoch !== ownerEpoch) throw new Error(`Cannot complete stale worker placement move for session ${intent.sessionId}`);
				const profileId = intent.target.kind === "profile" ? intent.target.profileId : `device:${intent.target.deviceId}`;
				requireExactAttachedEnvironment(db, {
					sessionId: intent.sessionId,
					environmentId,
					ownerEpoch,
					profileId
				});
				deleteExactMove(db, intent);
				return current;
			});
		}
	};
}
//#endregion
export { readWorkerPlacementMovesReadOnly as n, drainWorkerSessionPlacement as r, createPlacementMoveOps as t };
