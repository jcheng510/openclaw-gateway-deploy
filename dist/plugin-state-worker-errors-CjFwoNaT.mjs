import { D as resolveExpiresAtMsFromDurationMs } from "./number-coercion-Dq1l5muL.mjs";
import { t as hasErrnoCode } from "./errno-FR4CRyya.mjs";
import { a as iterateSqliteQuerySync, i as getNodeSqliteKysely, n as executeSqliteQuerySync, r as executeSqliteQueryTakeFirstSync, s as prepareSqliteQuerySync } from "./kysely-sync-Y4_ti-rQ.mjs";
import { r as hasOpenClawStateTablesBeyondStartupCheckpoint } from "./openclaw-state-db-schema-helpers-C29HKgWe.mjs";
import { t as VERSION } from "./version-BMuSsYfE.mjs";
import { i as isSqliteSchemaVersionError } from "./sqlite-user-version-BLp_KV8U.mjs";
import { n as normalizeSqliteNumber, t as coerceRequiredSqliteNumber } from "./sqlite-number-DZt1m75H.mjs";
import { s as resolveOpenClawStateSqlitePath } from "./openclaw-state-db.paths-rJI64Ab5.mjs";
import { M as resolveDatabasePath } from "./openclaw-state-db-read-connection-DJObJIAO.mjs";
import { a as isTerminalSqliteIntegrityError } from "./sqlite-integrity-BWdDHT-b.mjs";
import { d as isOpenClawStateDatabaseOpen } from "./openclaw-state-db-cache-IAib4pqp.mjs";
import { d as withExistingOpenClawStateDatabaseReadOnly } from "./openclaw-state-db-readonly-DE3MB0wy.mjs";
import { n as hydrateOpenClawStateWorkerError, r as retainOpenClawStateWorkerErrorPayload, t as encodeOpenClawStateWorkerError } from "./openclaw-state-worker-error-CvUWzlTD.mjs";
import { l as runOpenClawStateWriteTransaction, r as openOpenClawStateDatabase } from "./openclaw-state-db-DM-mSY0m.mjs";
import { threadId } from "node:worker_threads";
//#region src/plugin-state/plugin-state-error-cause.ts
function capturePluginStateErrorCause(value, encodeCanonical, seen = /* @__PURE__ */ new Set()) {
	if (value === void 0) return;
	const canonical = encodeCanonical?.(value);
	if (canonical) return { canonical };
	if (value === null || typeof value === "string" || typeof value === "number" || typeof value === "boolean" || typeof value === "bigint" || typeof value === "symbol") return {
		name: "Error",
		message: String(value)
	};
	if (typeof value !== "object") return {
		name: "Error",
		message: "Unknown SQLite error cause"
	};
	if (seen.has(value) || seen.size >= 8) return {
		name: "Error",
		message: "Additional SQLite error cause omitted"
	};
	seen.add(value);
	const name = "name" in value && typeof value.name === "string" ? value.name : "Error";
	const message = "message" in value && typeof value.message === "string" ? value.message : name;
	const code = "code" in value ? value.code : void 0;
	const errcode = "errcode" in value ? value.errcode : void 0;
	const errno = "errno" in value ? value.errno : void 0;
	return {
		name,
		message,
		...typeof code === "string" || typeof code === "number" ? { errorCode: code } : {},
		...typeof errcode === "number" ? { errcode } : {},
		...typeof errno === "number" ? { errno } : {},
		..."cause" in value ? { cause: capturePluginStateErrorCause(value.cause, encodeCanonical, seen) } : {},
		...value instanceof AggregateError ? { errors: value.errors.slice(0, 8).map((error) => capturePluginStateErrorCause(error, encodeCanonical, seen)) } : {}
	};
}
//#endregion
//#region src/plugin-state/plugin-state-store.types.ts
/** Typed error thrown for plugin-state validation and sqlite failures. */
var PluginStateStoreError = class extends Error {
	constructor(message, options) {
		super(message, { cause: options.cause });
		this.name = "PluginStateStoreError";
		this.code = options.code;
		this.operation = options.operation;
		this.owner = options.owner ?? {
			pid: process.pid,
			threadId,
			version: VERSION
		};
		if (options.path) this.path = options.path;
	}
	toJSON() {
		return {
			name: this.name,
			message: this.message,
			code: this.code,
			operation: this.operation,
			path: this.path,
			owner: this.owner,
			cause: capturePluginStateErrorCause(this.cause)
		};
	}
};
//#endregion
//#region src/plugin-state/plugin-state-store.kernel.ts
const MAX_PLUGIN_STATE_VALUE_BYTES = 1048576;
const RETAINED_PLUGIN_STATE_NAMESPACE_PREFIX = "@retained.";
function isRetainedPluginStateNamespace(namespace) {
	return namespace.startsWith(RETAINED_PLUGIN_STATE_NAMESPACE_PREFIX);
}
const PLUGIN_STATE_EXPIRY_BATCH_ROWS = 1024;
function createPluginStateError(params) {
	return new PluginStateStoreError(params.message, {
		code: params.code,
		operation: params.operation,
		...params.path ? { path: params.path } : {},
		cause: params.cause
	});
}
function resolvePluginStateExpiresAtMs(params) {
	if (params.ttlMs == null) return null;
	if (params.namespace && isRetainedPluginStateNamespace(params.namespace)) throw createPluginStateError({
		code: "PLUGIN_STATE_INVALID_INPUT",
		operation: params.operation,
		message: "Retained plugin state does not accept a TTL.",
		path: params.path
	});
	const expiresAt = resolveExpiresAtMsFromDurationMs(params.ttlMs, { nowMs: params.now });
	if (expiresAt === void 0) throw createPluginStateError({
		code: "PLUGIN_STATE_INVALID_INPUT",
		operation: params.operation,
		message: "Plugin state ttlMs cannot produce a valid expiry timestamp.",
		...params.path ? { path: params.path } : {}
	});
	return expiresAt;
}
function parseStoredJson(raw, operation, databasePath) {
	try {
		return JSON.parse(raw);
	} catch (error) {
		throw createPluginStateError({
			code: "PLUGIN_STATE_CORRUPT",
			operation,
			message: "Plugin state entry contains corrupt JSON.",
			path: databasePath,
			cause: error
		});
	}
}
function rowToEntry(row, operation, databasePath) {
	const expiresAt = normalizeSqliteNumber(row.expires_at);
	return {
		key: row.entry_key,
		value: parseStoredJson(row.value_json, operation, databasePath),
		createdAt: normalizeSqliteNumber(row.created_at) ?? 0,
		...expiresAt != null ? { expiresAt } : {}
	};
}
function getPluginStateKysely(db) {
	return getNodeSqliteKysely(db);
}
function bindPluginStateEntry(params) {
	return {
		plugin_id: params.pluginId,
		namespace: params.namespace,
		entry_key: params.key,
		value_json: params.valueJson,
		created_at: params.createdAt,
		expires_at: params.expiresAt
	};
}
const pluginStateUpsertQueries = /* @__PURE__ */ new WeakMap();
const pluginStateInsertIfAbsentQueries = /* @__PURE__ */ new WeakMap();
function upsertPluginStateEntry(db, row) {
	let query = pluginStateUpsertQueries.get(db);
	if (!query) {
		query = prepareSqliteQuerySync(db, (parameter) => getPluginStateKysely(db).insertInto("plugin_state_entries").values({
			plugin_id: parameter((value) => value.plugin_id),
			namespace: parameter((value) => value.namespace),
			entry_key: parameter((value) => value.entry_key),
			value_json: parameter((value) => value.value_json),
			created_at: parameter((value) => value.created_at),
			expires_at: parameter((value) => value.expires_at)
		}).onConflict((conflict) => conflict.columns([
			"plugin_id",
			"namespace",
			"entry_key"
		]).doUpdateSet({
			value_json: (eb) => eb.ref("excluded.value_json"),
			created_at: (eb) => eb.ref("excluded.created_at"),
			expires_at: (eb) => eb.ref("excluded.expires_at")
		})));
		pluginStateUpsertQueries.set(db, query);
	}
	query(row);
}
function insertPluginStateEntryIfAbsent(db, row) {
	let query = pluginStateInsertIfAbsentQueries.get(db);
	if (!query) {
		query = prepareSqliteQuerySync(db, (parameter) => getPluginStateKysely(db).insertInto("plugin_state_entries").orIgnore().values({
			plugin_id: parameter((value) => value.plugin_id),
			namespace: parameter((value) => value.namespace),
			entry_key: parameter((value) => value.entry_key),
			value_json: parameter((value) => value.value_json),
			created_at: parameter((value) => value.created_at),
			expires_at: parameter((value) => value.expires_at)
		}));
		pluginStateInsertIfAbsentQueries.set(db, query);
	}
	const result = query(row);
	return Number(result.numAffectedRows ?? 0) > 0;
}
const pluginStateEntryQueries = /* @__PURE__ */ new WeakMap();
const pluginStateEntryExistsQueries = /* @__PURE__ */ new WeakMap();
function hasPluginStateEntry(db, params) {
	let query = pluginStateEntryExistsQueries.get(db);
	if (!query) {
		query = prepareSqliteQuerySync(db, (parameter) => {
			const pluginId = parameter((value) => value.pluginId);
			const namespace = parameter((value) => value.namespace);
			const key = parameter((value) => value.key);
			const now = parameter((value) => value.now);
			return getPluginStateKysely(db).selectFrom("plugin_state_entries").select("entry_key").where("plugin_id", "=", pluginId).where("namespace", "=", namespace).where("entry_key", "=", key).where((eb) => eb.or([eb("expires_at", "is", null), eb("expires_at", ">", now)]));
		});
		pluginStateEntryExistsQueries.set(db, query);
	}
	return query(params).rows.length !== 0;
}
function selectPluginStateEntry(db, params) {
	let query = pluginStateEntryQueries.get(db);
	if (!query) {
		query = prepareSqliteQuerySync(db, (parameter) => {
			const pluginId = parameter((value) => value.pluginId);
			const namespace = parameter((value) => value.namespace);
			const key = parameter((value) => value.key);
			const now = parameter((value) => value.now);
			return getPluginStateKysely(db).selectFrom("plugin_state_entries").select([
				"entry_key",
				"value_json",
				"created_at",
				"expires_at"
			]).where("plugin_id", "=", pluginId).where("namespace", "=", namespace).where("entry_key", "=", key).where((eb) => eb.or([eb("expires_at", "is", null), eb("expires_at", ">", now)]));
		});
		pluginStateEntryQueries.set(db, query);
	}
	return query(params).rows[0];
}
function iteratePluginStateEntries(db, params) {
	return iterateSqliteQuerySync(db, getPluginStateKysely(db).selectFrom("plugin_state_entries").select([
		"entry_key",
		"value_json",
		"created_at",
		"expires_at"
	]).where("plugin_id", "=", params.pluginId).where("namespace", "=", params.namespace).where((eb) => eb.or([eb("expires_at", "is", null), eb("expires_at", ">", params.now)])).orderBy("created_at", "asc").orderBy("entry_key", "asc"));
}
function selectPluginStateEntriesInKeyRange(db, params) {
	return executeSqliteQuerySync(db, getPluginStateKysely(db).selectFrom("plugin_state_entries").select([
		"entry_key",
		"value_json",
		"created_at",
		"expires_at"
	]).where("plugin_id", "=", params.pluginId).where("namespace", "=", params.namespace).where("entry_key", ">=", params.keyStartInclusive).where("entry_key", "<", params.keyEndExclusive).where((eb) => eb.or([eb("expires_at", "is", null), eb("expires_at", ">", params.now)])).orderBy("entry_key", params.order).limit(params.limit)).rows;
}
function deletePluginStateEntry(db, params) {
	const result = executeSqliteQuerySync(db, getPluginStateKysely(db).deleteFrom("plugin_state_entries").where("plugin_id", "=", params.pluginId).where("namespace", "=", params.namespace).where("entry_key", "=", params.key));
	return Number(result.numAffectedRows ?? 0);
}
const pluginStateExpiryQueries = /* @__PURE__ */ new WeakMap();
function deleteExpiredPluginStateEntries(db, now, scope) {
	if (scope && isRetainedPluginStateNamespace(scope.namespace)) return 0;
	const kysely = getPluginStateKysely(db);
	if (scope) {
		let query = pluginStateExpiryQueries.get(db);
		if (!query) {
			query = prepareSqliteQuerySync(db, (parameter) => kysely.selectFrom("plugin_state_entries").select("expires_at").where("expires_at", "is not", null).where("expires_at", "<=", parameter((value) => value)).limit(1));
			pluginStateExpiryQueries.set(db, query);
		}
		if (query(now).rows.length === 0) return 0;
	}
	let expiredEntries = kysely.selectFrom("plugin_state_entries").select([
		"plugin_id",
		"namespace",
		"entry_key"
	]).where("expires_at", "is not", null).where("expires_at", "<=", now);
	expiredEntries = scope ? expiredEntries.where("plugin_id", "=", scope.pluginId).where("namespace", "=", scope.namespace) : expiredEntries.orderBy("expires_at", "asc");
	const result = executeSqliteQuerySync(db, kysely.deleteFrom("plugin_state_entries").where((expression) => expression(expression.refTuple("plugin_id", "namespace", "entry_key"), "in", expiredEntries.limit(PLUGIN_STATE_EXPIRY_BATCH_ROWS).$asTuple("plugin_id", "namespace", "entry_key"))));
	return Number(result.numAffectedRows ?? 0);
}
const pluginStateNamespaceCountQueries = /* @__PURE__ */ new WeakMap();
function countLivePluginStateNamespaceEntries(db, params) {
	let query = pluginStateNamespaceCountQueries.get(db);
	if (!query) {
		query = prepareSqliteQuerySync(db, (parameter) => getPluginStateKysely(db).selectFrom("plugin_state_entries").select((eb) => eb.fn.countAll().as("count")).where("plugin_id", "=", parameter((value) => value.pluginId)).where("namespace", "=", parameter((value) => value.namespace)).where((eb) => eb.or([eb("expires_at", "is", null), eb("expires_at", ">", parameter((value) => value.now))])));
		pluginStateNamespaceCountQueries.set(db, query);
	}
	const row = query(params).rows[0];
	return coerceRequiredSqliteNumber(row?.count ?? 0);
}
function allocatePluginStateNamespaceCreatedAt(db, params) {
	const row = executeSqliteQueryTakeFirstSync(db, getPluginStateKysely(db).selectFrom("plugin_state_entries").select((eb) => eb.fn.max("created_at").as("max_created_at")).where("plugin_id", "=", params.pluginId).where("namespace", "=", params.namespace));
	const previous = normalizeSqliteNumber(row?.max_created_at ?? null);
	const next = previous === void 0 ? params.now : Math.max(params.now, previous + 1);
	if (!Number.isSafeInteger(next)) throw new RangeError("Plugin state namespace append order exhausted safe integer range");
	return next;
}
function lookupPluginStateEntry(store, params) {
	const row = selectPluginStateEntry(store.db, {
		pluginId: params.pluginId,
		namespace: params.namespace,
		key: params.key,
		now: Date.now()
	});
	return row ? parseStoredJson(row.value_json, "lookup", store.path) : void 0;
}
//#endregion
//#region src/plugin-state/plugin-state-store.database.ts
function wrapPluginStateError(error, operation, fallbackCode, message, pathname = resolveOpenClawStateSqlitePath(process.env)) {
	if (error instanceof PluginStateStoreError) return error;
	let publicMessage = message;
	if (fallbackCode === "PLUGIN_STATE_OPEN_FAILED") {
		if (isSqliteSchemaVersionError(error)) publicMessage += "\nThe state database uses a newer schema. Run an OpenClaw build that supports it.";
		else if (error instanceof Error && isTerminalSqliteIntegrityError(error)) publicMessage += "\nDatabase integrity verification failed. Restore or repair the state database, then run openclaw doctor --fix.";
	}
	return createPluginStateError({
		code: fallbackCode,
		operation,
		message: publicMessage,
		path: pathname,
		cause: error
	});
}
function openPluginStateDatabase(operation = "open", options = {}) {
	const env = options.env ?? process.env;
	const pathname = resolveOpenClawStateSqlitePath(env);
	try {
		return openOpenClawStateDatabase(options);
	} catch (error) {
		throw wrapPluginStateError(error, operation, "PLUGIN_STATE_OPEN_FAILED", "Failed to open the plugin state database.", pathname);
	}
}
function isMissingPluginStateTableError(error) {
	return error instanceof Error && hasErrnoCode(error, "ERR_SQLITE_ERROR") && error.message === "no such table: plugin_state_entries";
}
/** Read plugin state without joining the shared writable database lifecycle. */
function withPluginStateDatabaseReadOnly(operationName, operation, options = {}) {
	const pathname = resolveDatabasePath(options);
	let operationStarted = false;
	try {
		return withExistingOpenClawStateDatabaseReadOnly(({ db, path }) => {
			operationStarted = true;
			try {
				return operation({
					db,
					path
				});
			} catch (error) {
				if (isMissingPluginStateTableError(error)) {
					if (!hasOpenClawStateTablesBeyondStartupCheckpoint(db)) return;
				}
				throw error;
			}
		}, options);
	} catch (error) {
		if (!operationStarted) throw wrapPluginStateError(error, operationName, "PLUGIN_STATE_OPEN_FAILED", "Failed to open the plugin state database.", pathname);
		throw error;
	}
}
function runWriteTransaction(operation, write, options = {}) {
	if (!isOpenClawStateDatabaseOpen(resolveOpenClawStateSqlitePath(options.env ?? process.env))) openPluginStateDatabase(operation, options);
	return runOpenClawStateWriteTransaction(write, options);
}
//#endregion
//#region src/plugin-state/plugin-state-worker-errors.ts
const errorConstructors = /* @__PURE__ */ new Map([
	["Error", Error],
	["TypeError", TypeError],
	["SyntaxError", SyntaxError],
	["RangeError", RangeError],
	["ReferenceError", ReferenceError],
	["URIError", URIError],
	["EvalError", EvalError]
]);
function restoreCause(value) {
	if (value && "canonical" in value) {
		const retained = /* @__PURE__ */ new Error("SQLite worker error cause");
		retainOpenClawStateWorkerErrorPayload(retained, value.canonical);
		return hydrateOpenClawStateWorkerError(retained, { includeOrdinary: true });
	}
	const Constructor = value ? errorConstructors.get(value.name) ?? Error : Error;
	return value ? Object.assign(new Constructor(value.message, { cause: restoreCause(value.cause) }), {
		name: value.name,
		...value.errorCode === void 0 ? {} : { code: value.errorCode },
		...value.errcode === void 0 ? {} : { errcode: value.errcode },
		...value.errno === void 0 ? {} : { errno: value.errno }
	}) : void 0;
}
function capturePluginStateWorkerFailure(error) {
	const cause = capturePluginStateErrorCause(error.cause, (value) => encodeOpenClawStateWorkerError(value, { includeOrdinary: value instanceof AggregateError }));
	return {
		message: error.message,
		code: error.code,
		operation: error.operation,
		owner: error.owner,
		...error.path === void 0 ? {} : { path: error.path },
		...cause ? { cause } : {}
	};
}
function restorePluginStateWorkerFailure(error) {
	return new PluginStateStoreError(error.message, {
		code: error.code,
		operation: error.operation,
		owner: error.owner,
		...error.path === void 0 ? {} : { path: error.path },
		cause: restoreCause(error.cause)
	});
}
//#endregion
export { rowToEntry as C, PluginStateStoreError as D, upsertPluginStateEntry as E, resolvePluginStateExpiresAtMs as S, selectPluginStateEntry as T, insertPluginStateEntryIfAbsent as _, wrapPluginStateError as a, lookupPluginStateEntry as b, RETAINED_PLUGIN_STATE_NAMESPACE_PREFIX as c, countLivePluginStateNamespaceEntries as d, createPluginStateError as f, hasPluginStateEntry as g, getPluginStateKysely as h, withPluginStateDatabaseReadOnly as i, allocatePluginStateNamespaceCreatedAt as l, deletePluginStateEntry as m, restorePluginStateWorkerFailure as n, MAX_PLUGIN_STATE_VALUE_BYTES as o, deleteExpiredPluginStateEntries as p, runWriteTransaction as r, PLUGIN_STATE_EXPIRY_BATCH_ROWS as s, capturePluginStateWorkerFailure as t, bindPluginStateEntry as u, isRetainedPluginStateNamespace as v, selectPluginStateEntriesInKeyRange as w, parseStoredJson as x, iteratePluginStateEntries as y };
