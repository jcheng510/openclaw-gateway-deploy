import "./number-coercion-Dq1l5muL.mjs";
import "./src-SskUVPJG.mjs";
import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { t as safeParseJson } from "./json-coercion-pfKbZnCJ.mjs";
import { i as getNodeSqliteKysely, l as sqliteStringSet, n as executeSqliteQuerySync, u as sql } from "./kysely-sync-Y4_ti-rQ.mjs";
import { n as ensureColumn, o as tableHasColumns } from "./openclaw-state-db-schema-helpers-C29HKgWe.mjs";
import { t as deferSqlitePostCommitPublication } from "./sqlite-post-commit-Dih1WMKX.mjs";
import { r as runSqliteDeferredTransactionSync } from "./sqlite-transaction-2VkikDo-.mjs";
import { l as runOpenClawStateWriteTransaction, r as openOpenClawStateDatabase } from "./openclaw-state-db-DM-mSY0m.mjs";
import { s as normalizeDeliveryContext } from "./delivery-context.shared-CMOBtTen.mjs";
import { r as normalizeAgentRunTerminalReplySnapshot } from "./agent-run-terminal-reply-DV0cZr9u.mjs";
//#region src/agents/subagents/registry/subagent-delivery-state.ts
function projectSubagentRunForSessionList(entry) {
	return {
		runId: entry.runId,
		...entry.taskRunId !== void 0 ? { taskRunId: entry.taskRunId } : {},
		...entry.pauseReason ? { pauseReason: entry.pauseReason } : {},
		...entry.swarmRunId ? { swarmRunId: entry.swarmRunId } : {},
		childSessionKey: entry.childSessionKey,
		...entry.controllerSessionKey ? { controllerSessionKey: entry.controllerSessionKey } : {},
		requesterSessionKey: entry.requesterSessionKey,
		requesterStorePath: entry.requesterStorePath,
		controllerStorePath: entry.controllerStorePath,
		...entry.collect ? {
			collect: true,
			groupId: entry.groupId,
			swarmRequesterSessionKey: entry.swarmRequesterSessionKey
		} : {},
		...entry.collectorCompletion ? { collectorCompletion: { status: entry.collectorCompletion.status } } : {},
		...entry.requesterAgentId ? { requesterAgentId: entry.requesterAgentId } : {},
		...entry.model ? { model: entry.model } : {},
		...entry.generation !== void 0 ? { generation: entry.generation } : {},
		createdAt: entry.createdAt,
		execution: {
			status: entry.execution.status,
			...entry.execution.interruptionReason ? { interruptionReason: entry.execution.interruptionReason } : {},
			...entry.execution.startedAt !== void 0 ? { startedAt: entry.execution.startedAt } : {},
			...entry.execution.endedAt !== void 0 ? { endedAt: entry.execution.endedAt } : {},
			...entry.execution.outcome ? { outcome: { status: entry.execution.outcome.status } } : {}
		},
		...entry.sessionStartedAt !== void 0 ? { sessionStartedAt: entry.sessionStartedAt } : {},
		...entry.accumulatedRuntimeMs !== void 0 ? { accumulatedRuntimeMs: entry.accumulatedRuntimeMs } : {},
		...entry.runTimeoutSeconds !== void 0 ? { runTimeoutSeconds: entry.runTimeoutSeconds } : {},
		...entry.endedReason ? { endedReason: entry.endedReason } : {},
		...entry.cleanupCompletedAt !== void 0 ? { cleanupCompletedAt: entry.cleanupCompletedAt } : {},
		...entry.delivery ? { delivery: {
			status: entry.delivery.status,
			...entry.delivery.disposition === "intentional_non_delivery" ? { disposition: entry.delivery.disposition } : {},
			...entry.delivery.suspendedAt !== void 0 ? { suspendedAt: entry.delivery.suspendedAt } : {}
		} } : {}
	};
}
/** Copy only protection facts; live memory retains its existing, unnormalized semantics. */
function projectSubagentRunForMaintenance(entry) {
	return {
		runId: entry.runId,
		childSessionKey: entry.childSessionKey,
		requesterSessionKey: entry.requesterSessionKey,
		createdAt: entry.createdAt,
		cleanupCompletedAt: entry.cleanupCompletedAt,
		expectsCompletionMessage: entry.expectsCompletionMessage,
		killIntent: entry.killIntent ? { ...entry.killIntent } : entry.killIntent,
		killReconciliation: entry.killReconciliation ? { ...entry.killReconciliation } : entry.killReconciliation,
		execution: {
			status: entry.execution.status,
			endedAt: entry.execution.endedAt
		},
		delivery: entry.delivery ? {
			status: entry.delivery.status,
			suspendedAt: entry.delivery.suspendedAt
		} : void 0
	};
}
function normalizeSubagentRunState(entry) {
	entry.taskRunId = (typeof entry.taskRunId === "string" ? entry.taskRunId.trim() : "") || void 0;
	const requesterTurnRunId = typeof entry.requesterTurnRunId === "string" ? entry.requesterTurnRunId.trim() : "";
	entry.requesterTurnRunId = requesterTurnRunId || void 0;
	entry.requesterTurnYielded = requesterTurnRunId && entry.requesterTurnYielded === true ? true : void 0;
	entry.retireAfterRequesterTurn = requesterTurnRunId && entry.retireAfterRequesterTurn === true ? true : void 0;
	entry.generation = typeof entry.generation === "number" && Number.isSafeInteger(entry.generation) && entry.generation > 0 ? entry.generation : void 0;
	entry.deleteCleanupDispatchedAt = Number.isFinite(entry.deleteCleanupDispatchedAt) ? entry.deleteCleanupDispatchedAt : void 0;
	entry.suppressCompletionDelivery = entry.suppressCompletionDelivery === true ? true : void 0;
	entry.terminalOwner = entry.terminalOwner === "interrupted-recovery" && Number.isFinite(entry.execution.endedAt) && entry.execution.outcome?.status === "error" && entry.endedReason === "subagent-error" && entry.pauseReason !== "sessions_yield" ? "interrupted-recovery" : void 0;
	if (entry.completion) entry.completion.terminalReply = normalizeAgentRunTerminalReplySnapshot(entry.completion.terminalReply);
	const killReconciliation = entry.killReconciliation;
	if (!killReconciliation || typeof killReconciliation !== "object" || !Number.isFinite(killReconciliation.killedAt)) delete entry.killReconciliation;
	else entry.killReconciliation = {
		killedAt: killReconciliation.killedAt,
		taskCancellationAccepted: killReconciliation.taskCancellationAccepted === true ? true : void 0,
		suppressTaskDelivery: killReconciliation.suppressTaskDelivery === true ? true : void 0,
		supersededAt: Number.isFinite(killReconciliation.supersededAt) ? killReconciliation.supersededAt : void 0
	};
	const killIntent = entry.killIntent;
	if (!killIntent || typeof killIntent !== "object" || !Number.isFinite(killIntent.requestedAt) || typeof killIntent.reason !== "string" || !killIntent.reason.trim()) delete entry.killIntent;
	else entry.killIntent = {
		requestedAt: killIntent.requestedAt,
		reason: killIntent.reason.trim(),
		lifecycleGeneration: typeof killIntent.lifecycleGeneration === "string" && killIntent.lifecycleGeneration.trim() ? killIntent.lifecycleGeneration.trim() : void 0,
		sessionId: typeof killIntent.sessionId === "string" && killIntent.sessionId.trim() ? killIntent.sessionId.trim() : void 0,
		sessionLifecycleRevision: typeof killIntent.sessionLifecycleRevision === "string" && killIntent.sessionLifecycleRevision.trim() ? killIntent.sessionLifecycleRevision.trim() : void 0,
		suppressTaskDelivery: killIntent.suppressTaskDelivery === true ? true : void 0
	};
	if (entry.cleanupHandled === true && typeof entry.cleanupCompletedAt !== "number" && entry.delivery?.status !== "discarded") entry.cleanupHandled = false;
	return entry;
}
/** Ensures a run has a nested completion state object. */
function ensureCompletionState(entry) {
	entry.completion ??= { required: entry.expectsCompletionMessage === true };
	return entry.completion;
}
/** Ensures a run has a nested delivery state object. */
function ensureDeliveryState(entry) {
	entry.delivery ??= { status: entry.expectsCompletionMessage === false ? "not_required" : "pending" };
	return entry.delivery;
}
/** Resets delivery state to its initial status for the run's completion requirement. */
function clearDeliveryState(entry) {
	entry.delivery = { status: entry.expectsCompletionMessage === false ? "not_required" : "pending" };
}
/** Returns true when delivery is suspended with a durable timestamp. */
function isDeliverySuspended(entry) {
	return entry.delivery?.status === "suspended" && typeof entry.delivery.suspendedAt === "number";
}
/** A finished requester without its required message receipt must not execute again implicitly. */
function isCompletedRequesterDeliveryBlocked(entry) {
	return isDeliverySuspended(entry) && entry.delivery?.suspendedReason === "permanent_failure" && entry.delivery.lastDropReason === "message_tool_delivery_missing";
}
/** Returns true when required delivery still owns the row after its child session is gone. */
function hasRetainedRequiredCompletionDelivery(entry) {
	const delivery = entry.delivery;
	if (entry.expectsCompletionMessage !== true || entry.suppressCompletionDelivery === true || entry.completion?.required !== true || !delivery?.payload) return false;
	if (isDeliverySuspended(entry)) return true;
	if (delivery.status === "in_progress") return true;
	return delivery.status === "pending" && delivery.disposition !== "ambiguous" && delivery.disposition !== "intentional_non_delivery" && delivery.disposition !== "permanent_failure";
}
/** Reads the current delivery attempt count. */
function getDeliveryAttemptCount(entry) {
	return entry.delivery?.attemptCount ?? 0;
}
/** Reads the non-empty last delivery error. */
function getDeliveryLastError(entry) {
	const error = entry.delivery?.lastError;
	return typeof error === "string" && error.trim() ? error : void 0;
}
const markRequesterSettleWakePending = (entry, options) => {
	const existing = entry.requesterSettleWake;
	entry.requesterSettleWake = {
		...structuredClone(existing),
		status: existing?.status ?? "pending",
		attemptCount: existing?.attemptCount ?? 0,
		...existing?.retireAfterSettle === true || options?.retireAfterSettle === true ? { retireAfterSettle: true } : {}
	};
};
const clearSubagentPendingDelivery = (entry) => {
	const delivery = ensureDeliveryState(entry);
	delivery.payload = void 0;
	delivery.createdAt = void 0;
	delivery.lastAttemptAt = void 0;
	delivery.nextAttemptAt = void 0;
	delivery.attemptCount = void 0;
	delivery.lastError = void 0;
	delivery.suspendedAt = void 0;
	delivery.suspendedReason = void 0;
	if (delivery.status !== "delivered" && delivery.status !== "failed") clearDeliveryState(entry);
};
const loadPendingFinalDeliveryPayload = (entry) => {
	return {
		requesterSessionKey: entry.delivery?.payload?.requesterSessionKey ?? entry.requesterSessionKey,
		requesterOrigin: entry.delivery?.payload?.requesterOrigin ?? entry.requesterOrigin,
		requesterDisplayKey: entry.delivery?.payload?.requesterDisplayKey ?? entry.requesterDisplayKey,
		childSessionKey: entry.delivery?.payload?.childSessionKey ?? entry.childSessionKey,
		childRunId: entry.delivery?.payload?.childRunId ?? entry.runId,
		task: entry.delivery?.payload?.task ?? entry.task,
		label: entry.delivery?.payload?.label ?? entry.label,
		startedAt: entry.delivery?.payload?.startedAt ?? entry.execution.startedAt,
		endedAt: entry.delivery?.payload?.endedAt ?? entry.execution.endedAt,
		outcome: entry.delivery?.payload?.outcome ?? entry.execution.outcome,
		expectsCompletionMessage: entry.delivery?.payload?.expectsCompletionMessage ?? entry.expectsCompletionMessage,
		completionTarget: entry.completionTarget,
		completionRequesterSessionId: entry.completionRequesterSessionId,
		spawnMode: entry.delivery?.payload?.spawnMode ?? entry.spawnMode,
		wakeOnDescendantSettle: entry.delivery?.payload?.wakeOnDescendantSettle ?? entry.wakeOnDescendantSettle,
		terminalReply: entry.completion?.terminalReply ?? entry.delivery?.payload?.terminalReply
	};
};
//#endregion
//#region src/agents/subagents/registry/subagent-registry.store.codec.ts
const EXECUTION_STATUSES = new Set("queued running interrupted terminal".split(" "));
const DELIVERY_STATUSES = new Set("not_required pending in_progress delivered failed suspended discarded".split(" "));
function hasStateStatus(value, statuses) {
	return isRecord(value) && typeof value.status === "string" && statuses.has(value.status);
}
function isCanonicalSubagentRunRecord(value) {
	return isRecord(value) && hasStateStatus(value.execution, EXECUTION_STATUSES) && isRecord(value.completion) && typeof value.completion.required === "boolean" && hasStateStatus(value.delivery, DELIVERY_STATUSES) && !("handoffLeaseId" in value.delivery || "handoffLeasedAt" in value.delivery || "handoffInjectedAt" in value.delivery);
}
function assertCanonicalSubagentRunRecord(entry) {
	if (!isCanonicalSubagentRunRecord(entry)) throw new Error("subagent run is missing canonical nested state");
}
function parseJson(raw) {
	return raw ? safeParseJson(raw) : void 0;
}
/** Rehydrates one sqlite row into the normalized subagent run record shape. */
function rowToSubagentRunRecord(row) {
	const stored = parseJson(row.payload_json);
	const payload = isRecord(stored) && isRecord(stored.parentCompletion) && stored.parentCompletion.completionTarget === "parent" ? stored.parentCompletion : stored;
	if (!isCanonicalSubagentRunRecord(payload)) return null;
	payload.runId = row.run_id;
	payload.childSessionKey = row.child_session_key;
	payload.requesterSessionKey = row.requester_session_key;
	payload.requesterStorePath = row.requester_store_path ?? void 0;
	payload.controllerStorePath = row.controller_store_path ?? void 0;
	const controllerSessionKey = row.controller_session_key?.trim();
	if (controllerSessionKey) payload.controllerSessionKey = controllerSessionKey;
	else delete payload.controllerSessionKey;
	if (payload.requesterOrigin) payload.requesterOrigin = normalizeDeliveryContext(payload.requesterOrigin);
	if (payload.expectsCompletionMessage === false) payload.delivery.status = "not_required";
	const record = normalizeSubagentRunState(payload);
	return record.runId && record.childSessionKey && record.requesterSessionKey ? record : null;
}
/** Canonically serializes a run before an outer transaction acquires the write lock. */
function bindSubagentRunRecord(entry) {
	return bindMutableSubagentRunRecord(structuredClone(entry));
}
/** Binds an isolated registry capture without copying its complete payload again. */
function bindCapturedSubagentRunRecord(entry) {
	assertCanonicalSubagentRunRecord(entry);
	const completion = entry.completion;
	const hadTerminalReply = Object.hasOwn(completion, "terminalReply");
	const terminalReply = completion.terminalReply;
	try {
		return bindMutableSubagentRunRecord({ ...entry });
	} finally {
		if (hadTerminalReply) completion.terminalReply = terminalReply;
		else delete completion.terminalReply;
	}
}
function bindMutableSubagentRunRecord(entry) {
	const normalized = normalizeSubagentRunState(entry);
	assertCanonicalSubagentRunRecord(normalized);
	return {
		run_id: normalized.runId,
		child_session_key: normalized.childSessionKey,
		controller_session_key: normalized.controllerSessionKey?.trim() || null,
		requester_session_key: normalized.requesterSessionKey,
		requester_store_path: normalized.requesterStorePath ?? null,
		controller_store_path: normalized.controllerStorePath ?? null,
		created_at: normalized.createdAt,
		payload_json: JSON.stringify(normalized.completionTarget === "parent" ? { parentCompletion: normalized } : normalized)
	};
}
//#endregion
//#region src/agents/subagents/registry/subagent-session-read-scope.ts
function buildChildren(runGroups) {
	const children = /* @__PURE__ */ new Map();
	for (const runs of runGroups) for (const run of runs) {
		const child = run.childSessionKey.trim();
		if (!child) continue;
		const siblings = children.get(run.requesterSessionKey) ?? /* @__PURE__ */ new Set();
		siblings.add(child);
		children.set(run.requesterSessionKey, siblings);
	}
	return children;
}
function collectKeys(sessionKeys, ...childrenForRequester) {
	const selected = new Set(sessionKeys.map((key) => key.trim()).filter(Boolean));
	for (const requester of selected) for (const children of childrenForRequester) for (const child of children(requester)) selected.add(child);
	return selected;
}
/** Select a complete requester closure; the read index still owns generation and liveness policy. */
function collectSubagentSessionReadKeys(sessionKeys, ...runGroups) {
	const children = buildChildren(runGroups);
	return collectKeys(sessionKeys, (requester) => children.get(requester) ?? []);
}
/** Derived membership only; the cache's snapshot Map remains the record owner. */
var SubagentSessionReadLookup = class {
	#memberships = /* @__PURE__ */ new Map();
	#children = /* @__PURE__ */ new Map();
	#byChild = /* @__PURE__ */ new Map();
	#byController = /* @__PURE__ */ new Map();
	#nextOrder = 0;
	constructor(entries) {
		for (const [cacheKey, entry] of entries) this.set(cacheKey, entry);
	}
	set(cacheKey, entry) {
		const previous = this.#memberships.get(cacheKey);
		if (!entry) {
			if (previous) {
				this.#remove(previous);
				this.#memberships.delete(cacheKey);
			}
			return;
		}
		const child = entry.childSessionKey.trim();
		const requester = entry.requesterSessionKey;
		const controller = entry.controllerSessionKey?.trim() || requester;
		if (previous && previous.child === child && previous.requester === requester && previous.controller === controller) return;
		if (previous) this.#remove(previous);
		const membership = {
			cacheKey,
			child,
			requester,
			controller,
			order: previous?.order ?? this.#nextOrder++
		};
		this.#memberships.set(cacheKey, membership);
		if (membership.child) {
			const children = this.#children.get(membership.requester) ?? /* @__PURE__ */ new Map();
			children.set(membership.child, (children.get(membership.child) ?? 0) + 1);
			this.#children.set(membership.requester, children);
			this.#addToBucket(this.#byChild, membership.child, membership);
		}
		if (membership.controller) this.#addToBucket(this.#byController, membership.controller, membership);
	}
	selectSessions(sessionKeys, inMemoryRuns) {
		const liveChildren = buildChildren([inMemoryRuns]);
		const selected = collectKeys(sessionKeys, (requester) => this.#children.get(requester)?.keys() ?? [], (requester) => liveChildren.get(requester) ?? []);
		return {
			sessionKeys: selected,
			cacheKeys: this.#select(this.#byChild, selected)
		};
	}
	selectChildren(childKeys) {
		return this.#select(this.#byChild, childKeys);
	}
	selectControllers(controllerKeys) {
		return this.#select(this.#byController, controllerKeys);
	}
	#select(buckets, keys) {
		const selected = /* @__PURE__ */ new Set();
		for (const key of keys) for (const membership of buckets.get(key) ?? []) selected.add(membership);
		if (selected.size === this.#memberships.size) return [...this.#memberships.keys()];
		return [...selected].toSorted((left, right) => left.order - right.order).map((row) => row.cacheKey);
	}
	#addToBucket(buckets, key, membership) {
		const bucket = buckets.get(key) ?? /* @__PURE__ */ new Set();
		bucket.add(membership);
		buckets.set(key, bucket);
	}
	#removeFromBucket(buckets, key, membership) {
		const bucket = buckets.get(key);
		bucket?.delete(membership);
		if (bucket?.size === 0) buckets.delete(key);
	}
	#remove(membership) {
		const children = this.#children.get(membership.requester);
		const remaining = (children?.get(membership.child) ?? 0) - 1;
		if (remaining > 0) children?.set(membership.child, remaining);
		else {
			children?.delete(membership.child);
			if (children?.size === 0) this.#children.delete(membership.requester);
		}
		this.#removeFromBucket(this.#byChild, membership.child, membership);
		this.#removeFromBucket(this.#byController, membership.controller, membership);
	}
};
//#endregion
//#region src/agents/subagents/registry/subagent-registry.store.kernel.ts
const parentStoreSchemas = /* @__PURE__ */ new WeakSet();
function hasParentStoreColumns(db) {
	if (parentStoreSchemas.has(db)) return true;
	const present = tableHasColumns(db, "subagent_runs", ["requester_store_path", "controller_store_path"]);
	if (present && !db.isTransaction) parentStoreSchemas.add(db);
	return present;
}
/** Upserts a prebound run on the exact supplied shared-state handle. */
function upsertSubagentRunRowInDatabase(database, row) {
	if (!parentStoreSchemas.has(database.db)) {
		if (!hasParentStoreColumns(database.db)) {
			ensureColumn(database.db, "subagent_runs", "requester_store_path TEXT");
			ensureColumn(database.db, "subagent_runs", "controller_store_path TEXT");
		}
		deferSqlitePostCommitPublication(database.db, () => parentStoreSchemas.add(database.db));
	}
	const stateDb = getNodeSqliteKysely(database.db);
	executeSqliteQuerySync(database.db, stateDb.insertInto("subagent_runs").values(row).onConflict((conflict) => conflict.column("run_id").doUpdateSet(subagentRunRecordToSqliteUpdate(row))));
}
/** Deletes one run on the exact supplied shared-state handle. */
function deleteSubagentRunRowInDatabase(database, runId) {
	executeSqliteQuerySync(database.db, getNodeSqliteKysely(database.db).deleteFrom("subagent_runs").where("run_id", "=", runId));
}
function subagentRunRecordToSqliteUpdate(values) {
	const { run_id: _runId, ...update } = values;
	return update;
}
/** The caller owns the transaction; both registry writers use this exact row kernel. */
function writeSubagentRunValuesInDatabase(database, values, deleteRunIds, retainedRunIds) {
	const { db } = database;
	const stateDb = getNodeSqliteKysely(db);
	for (const row of values) upsertSubagentRunRowInDatabase(database, row);
	if (retainedRunIds !== void 0) {
		const deleteQuery = retainedRunIds.length === 0 ? stateDb.deleteFrom("subagent_runs") : stateDb.deleteFrom("subagent_runs").where("run_id", "not in", retainedRunIds);
		executeSqliteQuerySync(db, deleteQuery);
	} else if (deleteRunIds && deleteRunIds.length > 0) executeSqliteQuerySync(db, stateDb.deleteFrom("subagent_runs").where("run_id", "in", deleteRunIds));
}
//#endregion
//#region src/agents/subagents/registry/subagent-registry.store.sqlite.ts
function parentStoreColumns(db) {
	return hasParentStoreColumns(db) ? ["requester_store_path", "controller_store_path"] : [sql.val(null).as("requester_store_path"), sql.val(null).as("controller_store_path")];
}
function readSubagentRun(database, runId) {
	const row = executeSqliteQuerySync(database.db, getNodeSqliteKysely(database.db).selectFrom("subagent_runs").selectAll().where("run_id", "=", runId)).rows[0];
	return row ? rowToSubagentRunRecord(row) : null;
}
function writeSubagentRunValues(values, deleteRunIds, retainedRunIds) {
	if (values.length === 0 && deleteRunIds?.length === 0 && retainedRunIds === void 0) return;
	runOpenClawStateWriteTransaction((database) => writeSubagentRunValuesInDatabase(database, values, deleteRunIds, retainedRunIds));
}
function subagentControllerFilter(controllerSessionKeys) {
	return (eb) => eb.or([eb("controller_session_key", "in", controllerSessionKeys), eb.and([eb.or([eb("controller_session_key", "is", null), eb("controller_session_key", "=", "")]), eb("requester_session_key", "in", controllerSessionKeys)])]);
}
function readSubagentRegistryRows(scope, database = openOpenClawStateDatabase(), projection = "full") {
	const { db } = database;
	let query = getNodeSqliteKysely(db).selectFrom("subagent_runs").select([
		"run_id",
		"child_session_key",
		"controller_session_key",
		"requester_session_key",
		...parentStoreColumns(db),
		"created_at"
	]).select(projection === "full" ? "payload_json" : subagentMaintenancePayload.as("payload_json"));
	if (scope?.kind === "child") query = query.where("child_session_key", "=", scope.sessionKey);
	else if (scope?.kind === "runs") query = query.where("run_id", "in", sqliteStringSet(scope.runIds));
	else if (scope?.kind === "session") query = query.where((eb) => eb.or([eb("controller_session_key", "=", scope.sessionKey), eb("requester_session_key", "=", scope.sessionKey)]));
	else if (scope?.kind === "controller") query = query.where(subagentControllerFilter([scope.sessionKey]));
	return executeSqliteQuerySync(db, query.orderBy("created_at", "asc").orderBy("run_id", "asc")).rows;
}
const subagentRetainedPayloadPaths = [
	"$.task",
	"$.completion.resultText",
	"$.completion.fallbackResultText",
	"$.completion.terminalReply",
	"$.delivery.payload",
	"$.delivery.lastError",
	"$.execution.outcome.error",
	"$.collectorCompletion.structured",
	"$.collectorCompletion.schemaError",
	"$.outputSchema",
	"$.structuredOutput",
	"$.queuedLaunch"
];
sql`CASE WHEN json_valid(payload_json) THEN json_remove(
    CASE WHEN json_type(payload_json, '$.parentCompletion') = 'object'
      AND json_extract(payload_json, '$.parentCompletion.completionTarget') = 'parent'
      THEN json_extract(payload_json, '$.parentCompletion') ELSE payload_json END,
    ${sql.join(subagentRetainedPayloadPaths)}
  ) ELSE payload_json END`;
const subagentMaintenancePayload = sql`CASE WHEN json_valid(payload_json)
      AND length(CAST(payload_json AS BLOB)) = length(CAST(printf('%s', payload_json) AS BLOB))
    THEN json_remove(payload_json, ${sql.join(subagentRetainedPayloadPaths.flatMap((path) => [path, `$.parentCompletion${path.slice(1)}`]))})
    ELSE payload_json END`;
function loadScopedSubagentRuns(scope, database) {
	const normalizedScope = scope.kind === "runs" ? scope : {
		...scope,
		sessionKey: scope.sessionKey.trim()
	};
	if (normalizedScope.kind === "runs" ? normalizedScope.runIds.length === 0 : !normalizedScope.sessionKey) return [];
	return readSubagentRegistryRows(normalizedScope, database).flatMap((row) => {
		const run = rowToSubagentRunRecord(row);
		return run ? [run] : [];
	});
}
/** Loads runs controlled by one session, preserving the legacy requester fallback. */
function loadSubagentRunsForControllerFromSqlite(controllerSessionKey) {
	return loadScopedSubagentRuns({
		kind: "controller",
		sessionKey: controllerSessionKey
	});
}
/** Loads all persisted generations for one child session through its existing index. */
function loadSubagentRunsForChildSessionFromSqlite(childSessionKey, database) {
	return loadScopedSubagentRuns({
		kind: "child",
		sessionKey: childSessionKey
	}, database);
}
/** Loads the canonical subagent registry from shared SQLite state. */
function loadSubagentRegistryFromSqlite() {
	const runs = /* @__PURE__ */ new Map();
	for (const row of readSubagentRegistryRows()) {
		const entry = rowToSubagentRunRecord(row);
		if (entry) runs.set(entry.runId, entry);
	}
	return runs;
}
/** Uses the canonical codec without transferring retained prompts and completion results. */
function loadSubagentMaintenanceRunsFromSqlite() {
	const runs = /* @__PURE__ */ new Map();
	for (const row of readSubagentRegistryRows(void 0, void 0, "maintenance")) {
		const entry = rowToSubagentRunRecord(row);
		if (entry) runs.set(entry.runId, projectSubagentRunForMaintenance(entry));
	}
	return runs;
}
/** Select identities and their records from the same persisted read snapshot. */
function loadSubagentRunsForSessionsFromSqlite(sessionKeys, inMemoryRuns) {
	const database = openOpenClawStateDatabase();
	const { db } = database;
	return runSqliteDeferredTransactionSync(db, () => {
		const identities = executeSqliteQuerySync(db, getNodeSqliteKysely(db).selectFrom("subagent_runs").select([
			"run_id",
			"child_session_key",
			"requester_session_key"
		])).rows;
		const selected = collectSubagentSessionReadKeys(sessionKeys, identities.map((row) => ({
			childSessionKey: row.child_session_key,
			requesterSessionKey: row.requester_session_key
		})), inMemoryRuns);
		const selectedRunIds = new Set(identities.filter((row) => selected.has(row.child_session_key.trim())).map((row) => row.run_id.trim()));
		const runIds = identities.filter((row) => selectedRunIds.has(row.run_id.trim())).map((row) => row.run_id);
		const runs = /* @__PURE__ */ new Map();
		const complete = runIds.length === identities.length;
		if (runIds.length) for (const row of readSubagentRegistryRows(complete ? void 0 : {
			kind: "runs",
			runIds
		}, database)) {
			const entry = rowToSubagentRunRecord(row);
			if (entry) runs.set(entry.runId, entry);
		}
		return {
			sessionKeys: selected,
			runs,
			complete
		};
	});
}
/** Saves the complete subagent run snapshot to sqlite and prunes rows not in the snapshot. */
function saveSubagentRegistryToSqlite(runs) {
	const values = [...runs.values()].map(bindSubagentRunRecord);
	writeSubagentRunValues(values, void 0, values.map((row) => row.run_id));
}
/** Persists only named run mutations, deleting names absent from the current registry. */
function saveSubagentRegistryChangesToSqlite(runs, changedRunIds) {
	const runIds = [...new Set(changedRunIds.map((runId) => runId.trim()).filter(Boolean))];
	const values = [];
	const deleteRunIds = [];
	for (const runId of runIds) {
		const entry = runs.get(runId);
		if (entry) values.push(bindSubagentRunRecord(entry));
		else deleteRunIds.push(runId);
	}
	writeSubagentRunValues(values, deleteRunIds);
}
/** Mutation ownership cannot discard undecodable retained rows as presentation readers do. */
function hasSubagentSessionOwnerInDatabase(database, sessionKey) {
	return executeSqliteQuerySync(database.db, getNodeSqliteKysely(database.db).selectFrom("subagent_runs").select("run_id").where((eb) => eb.or([
		eb("child_session_key", "=", sessionKey),
		eb("requester_session_key", "=", sessionKey),
		eb("controller_session_key", "=", sessionKey)
	])).limit(1)).rows.length > 0;
}
//#endregion
export { projectSubagentRunForMaintenance as A, getDeliveryLastError as C, loadPendingFinalDeliveryPayload as D, isDeliverySuspended as E, markRequesterSettleWakePending as O, getDeliveryAttemptCount as S, isCompletedRequesterDeliveryBlocked as T, rowToSubagentRunRecord as _, loadSubagentRunsForControllerFromSqlite as a, ensureCompletionState as b, saveSubagentRegistryChangesToSqlite as c, upsertSubagentRunRowInDatabase as d, writeSubagentRunValuesInDatabase as f, bindSubagentRunRecord as g, bindCapturedSubagentRunRecord as h, loadSubagentRunsForChildSessionFromSqlite as i, projectSubagentRunForSessionList as j, normalizeSubagentRunState as k, saveSubagentRegistryToSqlite as l, collectSubagentSessionReadKeys as m, loadSubagentMaintenanceRunsFromSqlite as n, loadSubagentRunsForSessionsFromSqlite as o, SubagentSessionReadLookup as p, loadSubagentRegistryFromSqlite as r, readSubagentRun as s, hasSubagentSessionOwnerInDatabase as t, deleteSubagentRunRowInDatabase as u, clearDeliveryState as v, hasRetainedRequiredCompletionDelivery as w, ensureDeliveryState as x, clearSubagentPendingDelivery as y };
