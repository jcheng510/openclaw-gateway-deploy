import { i as resolveGlobalSingleton } from "./global-singleton-BfHBYj6Y.mjs";
import { i as getNodeSqliteKysely, n as executeSqliteQuerySync, r as executeSqliteQueryTakeFirstSync } from "./kysely-sync-Y4_ti-rQ.mjs";
import { i as stageSqliteTransactionState } from "./sqlite-post-commit-Dih1WMKX.mjs";
import { t as assertTransactionUsable } from "./sqlite-transaction-2VkikDo-.mjs";
import { v as registerOpenClawStateDatabaseLifecycleListener, y as requireOpenClawStateDatabaseIdentity } from "./openclaw-state-db-cache-IAib4pqp.mjs";
import { r as captureOpenClawStateWorkerContext } from "./openclaw-state-worker-context-C_iAE7YK.mjs";
import { d as nullableRequired, h as required, i as isCurrentPlacementTurnClaim, l as normalizeNonNegativeInteger, o as nextGeneration, r as assertRecordShape, s as normalizeEpoch, u as normalizeWorkerPlacementExecutionMode } from "./placement-record-CfXaWmIw.mjs";
import { t as publishWorkerEnvironmentNativeMutation } from "./store-native-publication-PEwxtDg3.mjs";
//#region src/gateway/worker-environments/placement-turn-authority.ts
function notifyRevoked(claim) {
	if (!claim.revoked) return;
	const listeners = [...claim.listeners];
	claim.listeners.clear();
	for (const listener of listeners) try {
		listener();
	} catch {}
}
function closeOwner(owner) {
	owner.active = false;
	owner.pending.clear();
	owner.published.clear();
	const claims = Array.from(owner.claims.values()).flatMap((retained) => Array.from(retained));
	for (const claim of claims) claim.revoked = true;
	for (const claim of claims) notifyRevoked(claim);
	owner.claims.clear();
	owner.observations.clear();
}
const owners = resolveGlobalSingleton(Symbol.for("openclaw.placementTurnAuthorities"), () => /* @__PURE__ */ new Map(), (registered) => {
	for (const owner of registered.values()) closeOwner(owner);
	registered.clear();
});
function ownerFor(identity) {
	const existing = owners.get(identity.key);
	if (existing?.active) return existing;
	const owner = {
		identity,
		active: true,
		claims: /* @__PURE__ */ new Map(),
		observations: /* @__PURE__ */ new Map(),
		pending: /* @__PURE__ */ new Set(),
		sequence: 0,
		published: /* @__PURE__ */ new Map()
	};
	owners.set(identity.key, owner);
	return owner;
}
registerOpenClawStateDatabaseLifecycleListener((event) => {
	if (event.kind === "opened") return;
	for (const [key, owner] of owners) if (key === event.identity?.key || owner.identity.canonicalPath === (event.identity?.canonicalPath ?? event.path)) {
		closeOwner(owner);
		owners.delete(key);
	}
});
function allows(change, claim) {
	return change.kind === "workspace-result" || change.sessionId !== claim.sessionId || Boolean(change.facts && isCurrentPlacementTurnClaim(change.facts, claim));
}
function prunePublication(owner, sessionId) {
	if (!owner.claims.has(sessionId) && ![...owner.pending].some((change) => change.sessionId === sessionId)) owner.published.delete(sessionId);
}
function commitChange(owner, change, sequence) {
	owner.pending.delete(change);
	if (!owner.active) return;
	for (const observation of owner.observations.get(change.sessionId) ?? []) observation.revoked = true;
	if (change.kind === "workspace-result") {
		prunePublication(owner, change.sessionId);
		return;
	}
	owner.published.set(change.sessionId, Math.max(owner.published.get(change.sessionId) ?? 0, sequence));
	for (const retained of owner.claims.get(change.sessionId) ?? []) {
		if (sequence <= retained.createdSequence) continue;
		if (sequence > retained.publicationSequence) {
			retained.facts = change.facts;
			retained.publicationSequence = sequence;
		}
		retained.revoked ||= !allows(change, retained.claim);
	}
	prunePublication(owner, change.sessionId);
}
/** Retain placement custody across a read-worker wait and pending claim commits. */
function observePlacementAuthority(pathname, sessionId) {
	const context = captureOpenClawStateWorkerContext({ path: pathname });
	const owner = ownerFor(context.admission.identity);
	const observation = { revoked: false };
	const observations = owner.observations.get(sessionId) ?? /* @__PURE__ */ new Set();
	observations.add(observation);
	owner.observations.set(sessionId, observations);
	let released = false;
	return {
		assertCurrent() {
			context.admission.assertCurrent();
			if (released || observation.revoked || !owner.active || owners.get(owner.identity.key) !== owner || [...owner.pending].some((change) => change.sessionId === sessionId)) throw new Error(`Session ${sessionId} placement authority changed`);
		},
		release() {
			released = true;
			observations.delete(observation);
			if (observations.size === 0) owner.observations.delete(sessionId);
		}
	};
}
function stageChange(db, change) {
	const owner = ownerFor(requireOpenClawStateDatabaseIdentity({ db }));
	if (!stageSqliteTransactionState(db, {
		stage() {
			owner.pending.add(change);
		},
		commit() {
			commitChange(owner, change, ++owner.sequence);
		},
		prepareObservers() {
			for (const retained of Array.from(owner.claims.get(change.sessionId) ?? [])) notifyRevoked(retained);
		},
		rollback() {
			owner.pending.delete(change);
			prunePublication(owner, change.sessionId);
			try {
				assertTransactionUsable(db);
			} catch {
				closeOwner(owner);
			}
		}
	})) throw new Error("Placement authority publication requires its owning transaction");
}
/** Fence host authority before granting the worker's commit; settle only its exact receipt. */
function stagePlacementTurnClaimWorkerPublication(identity, facts) {
	const owner = ownerFor(identity);
	const sequence = ++owner.sequence;
	const change = {
		kind: "claim",
		sessionId: facts.sessionId,
		facts: structuredClone(facts),
		sequence
	};
	owner.pending.add(change);
	let settled = false;
	return {
		commit() {
			if (settled) return;
			settled = true;
			commitChange(owner, change, sequence);
			for (const retained of Array.from(owner.claims.get(change.sessionId) ?? [])) notifyRevoked(retained);
		},
		rollback() {
			if (settled) return;
			settled = true;
			owner.pending.delete(change);
			prunePublication(owner, change.sessionId);
		},
		invalidate() {
			if (settled) return;
			settled = true;
			change.facts = void 0;
			commitChange(owner, change, sequence);
			for (const retained of Array.from(owner.claims.get(change.sessionId) ?? [])) notifyRevoked(retained);
		}
	};
}
/** Publish only an existing successful writer postimage; this performs no database read. */
function publishPlacementTurnClaimState(db, record) {
	const { sessionId, agentId, sessionKey, state, executionMode, environmentId, activeOwnerEpoch } = record;
	stageChange(db, {
		kind: "claim",
		sessionId,
		facts: {
			sessionId,
			agentId,
			sessionKey,
			state,
			executionMode,
			environmentId,
			activeOwnerEpoch,
			turnClaim: record.turnClaim ? { ...record.turnClaim } : null
		}
	});
}
function publishPlacementTurnClaimCleared(db, sessionId) {
	stageChange(db, {
		kind: "claim",
		sessionId
	});
}
function publishPlacementWorkspaceResultState(db, sessionId) {
	stageChange(db, {
		kind: "workspace-result",
		sessionId
	});
}
/** Prepare once through the placement reader; subsequent checks use this retained incarnation. */
async function preparePlacementTurnClaimAuthority(pathname, requestedClaim, read) {
	const context = captureOpenClawStateWorkerContext({ path: pathname });
	const owner = ownerFor(context.admission.identity);
	const claim = structuredClone(requestedClaim);
	claim.sessionId = required(claim.sessionId, "session id");
	Object.freeze(claim.owner);
	Object.freeze(claim);
	const retained = {
		claim,
		createdSequence: owner.published.get(claim.sessionId) ?? 0,
		publicationSequence: owner.published.get(claim.sessionId) ?? 0,
		revoked: false,
		released: false,
		listeners: /* @__PURE__ */ new Set()
	};
	const claims = owner.claims.get(claim.sessionId) ?? /* @__PURE__ */ new Set();
	claims.add(retained);
	owner.claims.set(claim.sessionId, claims);
	const release = () => {
		retained.released = true;
		retained.listeners.clear();
		claims.delete(retained);
		if (claims.size === 0 && owner.claims.get(claim.sessionId) === claims) owner.claims.delete(claim.sessionId);
		prunePublication(owner, claim.sessionId);
	};
	const isCurrent = () => {
		if (retained.released || retained.revoked || !owner.active || owners.get(owner.identity.key) !== owner || !retained.facts || !isCurrentPlacementTurnClaim(retained.facts, claim)) return false;
		for (const change of owner.pending) if ((change.sequence === void 0 || change.sequence > retained.createdSequence) && !allows(change, claim)) return false;
		try {
			context.admission.assertCurrent();
			return true;
		} catch {
			return false;
		}
	};
	const assertCurrent = () => {
		if (!isCurrent()) throw new Error(`Session ${claim.sessionId} turn claim authority changed`);
	};
	try {
		const projection = await read([claim.sessionId]);
		context.admission.assertCurrent();
		retained.facts ??= projection.placements.get(claim.sessionId);
		assertCurrent();
		const facts = retained.facts;
		if (!facts) throw new Error(`Session ${claim.sessionId} turn claim is unavailable`);
		return {
			claim,
			identity: Object.freeze({
				agentId: facts.agentId,
				sessionKey: facts.sessionKey
			}),
			isCurrent,
			onRevoked(listener) {
				if (retained.revoked || !owner.active) {
					listener();
					return () => {};
				}
				retained.listeners.add(listener);
				return () => retained.listeners.delete(listener);
			},
			release
		};
	} catch (error) {
		release();
		throw error;
	}
}
//#endregion
//#region src/gateway/worker-environments/placement-state.ts
const WORKER_SESSION_PLACEMENT_STATES = [
	"local",
	"requested",
	"provisioning",
	"syncing",
	"starting",
	"active",
	"draining",
	"reconciling",
	"reclaimed",
	"failed"
];
const WORKER_SESSION_PLACEMENT_TRANSITIONS = {
	local: ["requested", "failed"],
	requested: ["provisioning", "failed"],
	provisioning: ["syncing", "failed"],
	syncing: ["starting", "failed"],
	starting: ["active", "failed"],
	active: ["draining"],
	draining: ["reconciling"],
	reconciling: [
		"local",
		"reclaimed",
		"failed"
	],
	reclaimed: ["requested"],
	failed: ["local", "requested"]
};
function parseWorkerSessionPlacementState(value) {
	if (WORKER_SESSION_PLACEMENT_STATES.includes(value)) return value;
	throw new Error(`Invalid worker session placement state: ${value}`);
}
function canTransitionWorkerSessionPlacement(from, to) {
	return WORKER_SESSION_PLACEMENT_TRANSITIONS[from].includes(to);
}
//#endregion
//#region src/gateway/worker-environments/placement-row-codec.ts
const query = (db) => getNodeSqliteKysely(db);
function parseTurnClaim(row) {
	if (row.turn_claim_owner === null) return null;
	const claimId = required(row.turn_claim_id ?? "", "turn claim id");
	const runId = required(row.turn_claim_run_id ?? "", "turn claim run id");
	const generation = row.turn_claim_generation;
	if (generation === null || !Number.isSafeInteger(generation) || generation < 0) throw new Error("Worker session placement turn claim generation is invalid");
	if (row.turn_claim_owner === "local") {
		if (row.turn_claim_owner_epoch !== null) throw new Error("Local turn claim cannot retain a worker owner epoch");
		return {
			owner: "local",
			claimId,
			runId,
			generation,
			ownerEpoch: null
		};
	}
	if (row.turn_claim_owner === "worker") return {
		owner: "worker",
		claimId,
		runId,
		generation,
		ownerEpoch: normalizeEpoch(row.turn_claim_owner_epoch ?? 0, "turn claim owner epoch")
	};
	throw new Error(`Invalid worker session turn claim owner: ${row.turn_claim_owner}`);
}
function fromRow(row) {
	const state = parseWorkerSessionPlacementState(row.state);
	const executionMode = normalizeWorkerPlacementExecutionMode(row.execution_mode);
	const parsed = {
		environmentId: row.environment_id === null ? null : required(row.environment_id, "environment id"),
		activeOwnerEpoch: row.active_owner_epoch === null ? null : normalizeEpoch(row.active_owner_epoch, "active owner epoch"),
		workspaceBaseManifestRef: nullableRequired(row.workspace_base_manifest_ref, "workspace base manifest ref"),
		remoteWorkspaceDir: nullableRequired(row.remote_workspace_dir, "remote workspace directory"),
		workerBundleHash: nullableRequired(row.worker_bundle_hash, "worker bundle hash"),
		lastTranscriptAckCursor: normalizeNonNegativeInteger(row.last_transcript_ack_cursor, "transcript ACK cursor"),
		lastLiveEventAckCursor: normalizeNonNegativeInteger(row.last_live_event_ack_cursor, "live ACK cursor"),
		terminalReason: nullableRequired(row.terminal_reason, "terminal reason"),
		terminalAtMs: normalizeNonNegativeInteger(row.terminal_at_ms, "terminal timestamp")
	};
	const recoveryError = nullableRequired(row.recovery_error, "recovery error");
	const turnClaim = parseTurnClaim(row);
	const record = {
		sessionId: row.session_id,
		agentId: row.agent_id,
		sessionKey: row.session_key,
		executionMode,
		generation: row.transition_generation,
		createdAtMs: row.created_at_ms,
		updatedAtMs: row.updated_at_ms,
		stateChangedAtMs: row.state_changed_at_ms,
		state,
		turnClaim,
		...parsed,
		recoveryError
	};
	assertRecordShape(record);
	return record;
}
function find(db, sessionId) {
	const row = executeSqliteQueryTakeFirstSync(db, query(db).selectFrom("worker_session_placements").selectAll().where("session_id", "=", sessionId));
	return row ? fromRow(row) : void 0;
}
function getRequired(db, sessionId) {
	const record = find(db, sessionId);
	if (!record) throw new Error(`Unknown worker session placement: ${sessionId}`);
	return record;
}
function assertIdentity(record, identity) {
	if (record.agentId !== identity.agentId || record.sessionKey !== identity.sessionKey) throw new Error(`Worker session placement identity changed for ${identity.sessionId}`);
}
function insertLocal(db, identity, nowMs) {
	executeSqliteQuerySync(db, query(db).insertInto("worker_session_placements").values({
		session_id: identity.sessionId,
		agent_id: identity.agentId,
		session_key: identity.sessionKey,
		execution_mode: null,
		state: "local",
		environment_id: null,
		transition_generation: 0,
		active_owner_epoch: null,
		workspace_base_manifest_ref: null,
		remote_workspace_dir: null,
		worker_bundle_hash: null,
		last_transcript_ack_cursor: null,
		last_live_event_ack_cursor: null,
		recovery_error: null,
		terminal_reason: null,
		terminal_at_ms: null,
		turn_claim_owner: null,
		turn_claim_id: null,
		turn_claim_run_id: null,
		turn_claim_generation: null,
		turn_claim_owner_epoch: null,
		created_at_ms: nowMs,
		updated_at_ms: nowMs,
		state_changed_at_ms: nowMs
	}));
	const record = getRequired(db, identity.sessionId);
	publishPlacementTurnClaimState(db, record);
	return record;
}
function ensureLocal(db, identity, nowMs) {
	const current = find(db, identity.sessionId);
	if (current) {
		assertIdentity(current, identity);
		return current;
	}
	return insertLocal(db, identity, nowMs);
}
function transitionValues(current, to, patch, nowMs) {
	const environmentId = to === "local" || to === "requested" ? null : patch.environmentId === void 0 ? current.environmentId : patch.environmentId === null ? null : required(patch.environmentId, "environment id");
	const activeOwnerEpoch = to === "local" || to === "requested" || to === "provisioning" || to === "syncing" || to === "starting" ? null : patch.activeOwnerEpoch === void 0 ? current.activeOwnerEpoch : patch.activeOwnerEpoch === null ? null : normalizeEpoch(patch.activeOwnerEpoch, "active owner epoch");
	const generation = nextGeneration(current.generation);
	const clearsWorkerMetadata = to === "local" || to === "requested";
	const values = {
		session_id: current.sessionId,
		agent_id: current.agentId,
		session_key: current.sessionKey,
		execution_mode: current.executionMode,
		state: to,
		environment_id: environmentId,
		transition_generation: generation,
		active_owner_epoch: activeOwnerEpoch,
		workspace_base_manifest_ref: clearsWorkerMetadata ? null : patch.workspaceBaseManifestRef === void 0 ? current.workspaceBaseManifestRef : nullableRequired(patch.workspaceBaseManifestRef, "workspace base manifest ref"),
		remote_workspace_dir: clearsWorkerMetadata ? null : patch.remoteWorkspaceDir === void 0 ? current.remoteWorkspaceDir : nullableRequired(patch.remoteWorkspaceDir, "remote workspace directory"),
		worker_bundle_hash: clearsWorkerMetadata ? null : patch.workerBundleHash === void 0 ? current.workerBundleHash : nullableRequired(patch.workerBundleHash, "worker bundle hash"),
		last_transcript_ack_cursor: clearsWorkerMetadata ? null : patch.lastTranscriptAckCursor === void 0 ? current.lastTranscriptAckCursor : normalizeNonNegativeInteger(patch.lastTranscriptAckCursor, "transcript ACK cursor"),
		last_live_event_ack_cursor: clearsWorkerMetadata ? null : patch.lastLiveEventAckCursor === void 0 ? current.lastLiveEventAckCursor : normalizeNonNegativeInteger(patch.lastLiveEventAckCursor, "live ACK cursor"),
		recovery_error: clearsWorkerMetadata ? null : patch.recoveryError === void 0 ? current.recoveryError : nullableRequired(patch.recoveryError, "recovery error"),
		terminal_reason: to === "failed" ? patch.terminalReason === void 0 ? current.terminalReason : nullableRequired(patch.terminalReason, "terminal reason") : null,
		terminal_at_ms: to === "reclaimed" || to === "failed" ? current.terminalAtMs ?? nowMs : null,
		turn_claim_owner: null,
		turn_claim_id: null,
		turn_claim_run_id: null,
		turn_claim_generation: null,
		turn_claim_owner_epoch: null,
		created_at_ms: current.createdAtMs,
		updated_at_ms: nowMs,
		state_changed_at_ms: nowMs
	};
	assertRecordShape({
		state: to,
		executionMode: current.executionMode,
		environmentId,
		activeOwnerEpoch,
		workspaceBaseManifestRef: values.workspace_base_manifest_ref,
		remoteWorkspaceDir: values.remote_workspace_dir,
		workerBundleHash: values.worker_bundle_hash,
		lastTranscriptAckCursor: values.last_transcript_ack_cursor,
		lastLiveEventAckCursor: values.last_live_event_ack_cursor,
		recoveryError: values.recovery_error,
		terminalReason: values.terminal_reason,
		terminalAtMs: values.terminal_at_ms,
		turnClaim: null
	});
	return values;
}
function updateTransition(db, current, to, patch, nowMs) {
	const values = transitionValues(current, to, patch, nowMs);
	if (executeSqliteQuerySync(db, query(db).updateTable("worker_session_placements").set(values).where("session_id", "=", current.sessionId).where("state", "=", current.state).where("transition_generation", "=", current.generation).where("turn_claim_owner", "is", null)).numAffectedRows !== 1n) throw new Error(`Worker session placement ${current.sessionId} changed during transition`);
	const updated = getRequired(db, current.sessionId);
	if (updated.state === "active") {
		const activated = executeSqliteQuerySync(db, getNodeSqliteKysely(db).updateTable("worker_environments").set((eb) => ({ last_activated_at_ms: eb.case().when("last_activated_at_ms", ">", nowMs).then(eb.ref("last_activated_at_ms")).else(nowMs).end() })).where("environment_id", "=", updated.environmentId).where("state", "=", "attached").where("destroy_requested_at_ms", "is", null).where("owner_epoch", "=", updated.activeOwnerEpoch).where("attached_session_ids_json", "=", JSON.stringify([updated.sessionId])).returning("last_activated_at_ms"));
		if (activated.rows.length !== 1) throw new Error(`Worker session placement ${current.sessionId} lost its attached environment`);
		publishWorkerEnvironmentNativeMutation(db, updated.environmentId, { lastActivatedAtMs: activated.rows[0].last_activated_at_ms });
	}
	publishPlacementTurnClaimState(db, updated);
	return updated;
}
//#endregion
export { query as a, canTransitionWorkerSessionPlacement as c, publishPlacementTurnClaimCleared as d, publishPlacementTurnClaimState as f, getRequired as i, observePlacementAuthority as l, stagePlacementTurnClaimWorkerPublication as m, find as n, transitionValues as o, publishPlacementWorkspaceResultState as p, fromRow as r, updateTransition as s, ensureLocal as t, preparePlacementTurnClaimAuthority as u };
