import { i as resolveGlobalSingleton } from "./global-singleton-BfHBYj6Y.mjs";
import { t as expectDefined } from "./expect-lbe3Hgrh.mjs";
import { a as asOptionalRecord } from "./record-coerce-TIsquoVR.mjs";
import { a as iterateSqliteQuerySync, l as sqliteStringSet, n as executeSqliteQuerySync, r as executeSqliteQueryTakeFirstSync } from "./kysely-sync-Y4_ti-rQ.mjs";
import { t as assertExistingDatabaseIdentity } from "./sqlite-worker-identity-Dggu-rKK.mjs";
import { d as sqlitePrimaryResultCode } from "./sqlite-error-diagnostics-XVtvbiXE.mjs";
import { i as stageSqliteTransactionState } from "./sqlite-post-commit-Dih1WMKX.mjs";
import { t as assertTransactionUsable } from "./sqlite-transaction-2VkikDo-.mjs";
import { i as readOpenClawAgentDatabaseIdentity, o as classifyOpenClawAgentDatabaseReadError, r as isOpenClawAgentDatabasePathCurrent, s as isOpenClawAgentDatabaseReadOpenFailure, v as hasSessionPendingInputsSchema } from "./openclaw-agent-db-identity-ChZ28OhF.mjs";
import { t as SessionMetadataUnavailableError } from "./session-metadata-unavailable-error-DwD7IuoE.mjs";
import { n as ok, t as err } from "./result-BQGgYouL.mjs";
import { A as parseAgentSessionKey } from "./session-key-BC4m_Ly5.mjs";
import { c as resolveOpenClawAgentSqlitePath } from "./openclaw-agent-db.paths-Dv3PPTNK.mjs";
import { h as registerAgentEventLifecycleRotationHandler, u as isAgentEventLifecycleGenerationCurrent } from "./agent-events-Cg4kQnvf.mjs";
import { c as openOpenClawAgentDatabase, d as runOpenClawAgentWriteTransaction, o as getOpenClawAgentDatabaseIfOpen } from "./openclaw-agent-db-CZUYuo7P.mjs";
import { n as withOpenClawAgentDatabaseReadOnly, t as retainOpenClawAgentDatabaseReadOnly } from "./openclaw-agent-db-readonly-CkWWSfuG.mjs";
import { _ as toDatabaseOptions, i as getSessionKysely, l as resolveSqliteScope } from "./session-accessor.sqlite-scope-AxUEwRt8.mjs";
import { a as readExactSessionEntryRow, c as readSessionEntryRow, o as readExactSessionEntryRowValidated, s as readQualifiedSessionEntryRow } from "./session-accessor.sqlite-entry-read-oKmXbFma.mjs";
import { d as readWithCanonicalSessionReaderContinuation, h as SessionCanonicalKeyMigrationRequiredError, r as assertCanonicalSqliteSessionKeysCurrent, u as readWithCanonicalSessionAdmission } from "./session-canonical-key-Cjd4Pn_g.mjs";
import { o as readExactSessionEntryCandidatesInDatabase } from "./session-accessor.sqlite-entry-cache-DYTBofzQ.mjs";
import { t as isInternalSessionEffectsKey } from "./internal-session-key-BOMXCQVf.mjs";
import { i as classifyAgentRunTerminalOutcome } from "./agent-run-terminal-outcome-B2LU37vr.mjs";
import { t as SessionPendingInputCustodyError } from "./session-pending-input-custody-error-fcZzzQWk.mjs";
import { AsyncLocalStorage } from "node:async_hooks";
//#region src/config/sessions/session-accessor.sqlite-exact-read.ts
/** Resolves one exact canonical entry without materializing the store. */
function resolveSessionEntry(scope, options = {}) {
	const resolved = options.databaseAgentId && scope.storePath ? {
		...resolveSqliteScope({
			...scope,
			agentId: scope.agentId ?? parseAgentSessionKey(scope.sessionKey)?.agentId ?? options.databaseAgentId,
			storePath: void 0
		}),
		path: scope.storePath,
		databaseAgentId: options.databaseAgentId
	} : resolveSqliteScope(scope);
	if (options.databaseAgentId) resolved.databaseAgentId = options.databaseAgentId;
	const read = (database) => {
		let selected = void 0;
		let failure;
		if (options.onReadError) try {
			assertCanonicalSqliteSessionKeysCurrent(database);
		} catch (error) {
			if (!(error instanceof SessionCanonicalKeyMigrationRequiredError)) throw error;
			failure = { error };
		}
		if (!failure) try {
			const projection = options.readOnly ? options.projection : "full";
			selected = options.keyFormat === "agent-qualified" ? readQualifiedSessionEntryRow(database, resolved.agentId, resolved.sessionKey, {
				allowCanonicalMove: options.allowCanonicalMove,
				projection
			}) : readSessionEntryRow(database, resolved.sessionKey, projection);
		} catch (error) {
			if (!options.onReadError) throw error;
			failure = { error };
		}
		if (options.onReadSource) {
			const source = readOpenClawAgentDatabaseIdentity(database);
			if (!isOpenClawAgentDatabasePathCurrent(database)) throw new Error("Session database physical identity changed during read");
			options.onReadSource({
				agentId: database.agentId,
				path: database.path,
				databaseIdentity: source.identity,
				databaseBirthtime: source.birthtime
			});
		}
		if (failure) options.onReadError(failure.error, database.db);
		return {
			existing: selected?.entry ?? void 0,
			legacyKeys: [],
			normalizedKey: selected?.row.session_key ?? resolved.sessionKey
		};
	};
	if (options.readOnly) {
		const result = withOpenClawAgentDatabaseReadOnly((database) => readWithCanonicalSessionReaderContinuation(database, options.continuation, () => read(database)), toDatabaseOptions(resolved));
		return result.found ? result.value : {
			existing: void 0,
			legacyKeys: [],
			normalizedKey: resolved.sessionKey
		};
	}
	return read(openOpenClawAgentDatabase(toDatabaseOptions(resolved)));
}
var SessionEntryDataReadError = class extends Error {
	constructor(readError, database) {
		const classified = sqlitePrimaryResultCode(readError) === 1 ? classifyOpenClawAgentDatabaseReadError(database, readError) : readError;
		super("Session entry data read failed", { cause: classified });
		this.database = database;
		this.readError = classified;
	}
	assertSettled() {
		assertTransactionUsable(this.database);
		if (this.database.isOpen && this.database.isTransaction) throw this.readError;
	}
};
/** Unreadable stores and rows become data; authority, source checks and cleanup still throw. */
function loadSessionEntryReadOnlyResultInScope(scope, continuation, onReadSource) {
	try {
		return ok(resolveSessionEntry(scope, {
			readOnly: true,
			databaseAgentId: scope.databaseAgentId,
			projection: scope.projection,
			continuation,
			onReadSource,
			onReadError(error, database) {
				throw new SessionEntryDataReadError(error, database);
			}
		}).existing);
	} catch (error) {
		if (error instanceof SessionEntryDataReadError) {
			error.assertSettled();
			return err(error.readError);
		}
		if (isOpenClawAgentDatabaseReadOpenFailure(error)) return err(error);
		throw error;
	}
}
function assertCapturedSessionEntryReadSource(source, database) {
	if (typeof source.databaseIdentity === "string" && (!database || database.path !== source.path)) assertExistingDatabaseIdentity(source.path, `file:${source.databaseIdentity}`);
	if (!database) {
		if (typeof source.databaseIdentity === "symbol") throw new Error("Captured session database is no longer open");
		return;
	}
	const physical = readOpenClawAgentDatabaseIdentity(database);
	if (database.agentId !== source.agentId || physical.identity !== source.databaseIdentity || physical.birthtime !== source.databaseBirthtime || !isOpenClawAgentDatabasePathCurrent(database)) throw new Error("Captured session database changed before read");
}
/** Retain the recorded physical owner without selecting a replacement database. */
function retainCapturedSessionEntryReadSource(source, env) {
	const retained = retainOpenClawAgentDatabaseReadOnly({
		agentId: source.agentId,
		path: source.path,
		env
	});
	if (!retained.found) throw new Error("Captured session database is unavailable");
	const assertCurrent = () => {
		retained.claim.assertCurrent();
		assertCapturedSessionEntryReadSource(source, retained.database);
	};
	try {
		assertCurrent();
		return {
			database: retained.database,
			assertCurrent,
			release: retained.claim.release
		};
	} catch (error) {
		retained.claim.release();
		throw error;
	}
}
/** Retained windows occupy a key even when they have no current readable entry. */
function retainSessionEntryKeyAbsence(params) {
	const source = retainCapturedSessionEntryReadSource(params.source, params.env);
	const assertCurrent = () => {
		source.assertCurrent();
		if (!params.sessionKeys.length) return;
		const occupied = executeSqliteQueryTakeFirstSync(source.database.db, getSessionKysely(source.database.db).selectFrom("session_nodes").select("session_key").where("session_key", "in", sqliteStringSet(params.sessionKeys)).limit(1));
		source.assertCurrent();
		if (occupied) throw new Error(`Session "${params.canonicalKey}" has ambiguous stored identity. Select an unambiguous session; stored rows and history were not changed.`);
	};
	try {
		assertCurrent();
		return {
			assertCurrent,
			release: source.release
		};
	} catch (error) {
		source.release();
		throw error;
	}
}
/** Loads one exact persisted-key entry from the additive SQLite session store. */
function loadExactSessionEntry(scope) {
	return loadExactSessionEntryCandidates({
		...scope,
		sessionKeys: [scope.sessionKey],
		readOnly: false
	})[0];
}
/** Reads exact candidates for one logical session through a single store admission. */
function loadExactSessionEntryCandidates(scope) {
	const sessionKeys = scope.sessionKeys.map((key) => key.trim()).filter(Boolean);
	const [sessionKey] = sessionKeys;
	if (!sessionKey) return [];
	const options = "readSource" in scope ? {
		agentId: scope.readSource.agentId,
		path: scope.readSource.path,
		...scope.env ? { env: scope.env } : {}
	} : toDatabaseOptions(resolveSqliteScope({
		...scope,
		sessionKey
	}));
	const read = (database) => {
		const physical = readOpenClawAgentDatabaseIdentity(database);
		if (scope.expectedSource) assertCapturedSessionEntryReadSource(scope.expectedSource, database);
		const entries = sessionKeys.flatMap((key) => {
			const entry = readExactSessionEntryRow(database, key, scope.projection, "canonical")?.entry;
			return entry ? [{
				sessionKey: key,
				entry
			}] : [];
		});
		scope.onReadSource?.({
			agentId: database.agentId,
			path: database.path
		}, {
			identity: physical.identity,
			birthtime: physical.birthtime
		});
		return entries;
	};
	if (!scope.readOnly) return read(openOpenClawAgentDatabase(options));
	const result = withOpenClawAgentDatabaseReadOnly(read, options);
	return result.found ? result.value : [];
}
const SESSION_ID_TRIM_CHARACTERS = "	\n\v\f\r \xA0            \u2028\u2029  　﻿";
/** Uses the native current-ID and trimmed legacy-ID winner order inside the reader owner. */
function readSessionEntryByIdInDatabase(database, selection) {
	return readWithCanonicalSessionAdmission(database, () => {
		assertCanonicalSqliteSessionKeysCurrent(database);
		const query = getSessionKysely(database.db).selectFrom("session_nodes").select("session_key").orderBy("session_key");
		for (const trimLegacyId of [false, true]) {
			const matches = iterateSqliteQuerySync(database.db, trimLegacyId ? query.where((eb) => eb(eb.fn("trim", ["current_session_id", eb.val(SESSION_ID_TRIM_CHARACTERS)]), "=", selection.sessionId)) : query.where("current_session_id", "=", selection.sessionId));
			for (const { session_key: sessionKey } of matches) {
				if (isInternalSessionEffectsKey(sessionKey)) continue;
				const selected = readExactSessionEntryRowValidated(database, sessionKey, selection.projection);
				if (selected) return {
					sessionKey,
					entry: selected.entry
				};
			}
		}
	});
}
/** Loads a visible current ID, falling back to legacy trimmed IDs only on an exact miss. */
function loadSessionEntryByIdReadOnly(scope) {
	const resolved = resolveSqliteScope({
		...scope,
		sessionKey: ""
	});
	const result = withOpenClawAgentDatabaseReadOnly((database) => readSessionEntryByIdInDatabase(database, scope), toDatabaseOptions(resolved));
	return result.found ? result.value : void 0;
}
/** Exact persisted-key probe on the read-only handle, for per-row hot paths. */
function loadExactSessionEntryReadOnly(scope) {
	return loadExactSessionEntryCandidates({
		...scope,
		sessionKeys: [scope.sessionKey],
		readOnly: true
	})[0];
}
/** Probe the selected store without rerouting an incognito-shaped key to ephemeral state. */
function loadExactSessionEntryFromStoreReadOnly(scope) {
	const options = toDatabaseOptions(resolveSqliteScope({
		...scope,
		sessionKey: ""
	}));
	return loadExactSessionEntryCandidates({
		readSource: {
			...options,
			path: resolveOpenClawAgentSqlitePath(options)
		},
		projection: scope.projection,
		readOnly: true,
		sessionKeys: [scope.sessionKey]
	})[0];
}
function groupExactSessionEntryReadRequests(scopes) {
	const results = [];
	const targetCache = /* @__PURE__ */ new Map();
	const groups = /* @__PURE__ */ new Map();
	for (const [index, scope] of scopes.entries()) {
		const sessionKeys = scope.sessionKeys.map((key) => key.trim()).filter(Boolean);
		const [sessionKey] = sessionKeys;
		if (!sessionKey) {
			results[index] = ok([]);
			continue;
		}
		try {
			const options = toDatabaseOptions(resolveSqliteScope({
				...scope,
				sessionKey
			}, targetCache));
			const groupKey = [
				options.agentId,
				resolveOpenClawAgentSqlitePath(options),
				scope.projection ?? "full",
				scope.clone !== false
			].join("\0");
			const group = groups.get(groupKey) ?? {
				options,
				projection: scope.projection,
				clone: scope.clone !== false,
				requests: []
			};
			group.requests.push({
				index,
				sessionKeys
			});
			groups.set(groupKey, group);
		} catch (error) {
			results[index] = err(error);
		}
	}
	return {
		groups,
		results
	};
}
function loadExactSessionEntryCandidatesReadOnlyBatch(scopes) {
	const { groups, results } = groupExactSessionEntryReadRequests(scopes);
	for (const group of groups.values()) try {
		const read = withOpenClawAgentDatabaseReadOnly((database) => readWithCanonicalSessionAdmission(database, () => {
			assertCanonicalSqliteSessionKeysCurrent(database);
			const source = {
				agentId: database.agentId,
				path: database.path
			};
			const grouped = readExactSessionEntryCandidatesInDatabase(database, group.requests.map((request) => request.sessionKeys), group.projection, { clone: group.clone });
			for (const [ordinal, request] of group.requests.entries()) {
				const result = grouped[ordinal];
				results[request.index] = result;
				if (result.ok) scopes[request.index].onReadSource?.(source);
			}
		}), group.options);
		if (!read.found) {
			if (read.reason !== "database-missing") throw new SessionMetadataUnavailableError(read.reason);
			for (const { index } of group.requests) results[index] = ok([]);
		}
	} catch (error) {
		for (const { index } of group.requests) results[index] = err(error);
	}
	return scopes.map((_, index) => expectDefined(results[index], "exact session batch read result"));
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-pending-inputs.ts
const owners = resolveGlobalSingleton(Symbol.for("openclaw.sessionPendingInputOwners"), () => ({
	live: /* @__PURE__ */ new Map(),
	current: new AsyncLocalStorage(),
	relocation: new AsyncLocalStorage(),
	transactionRelocations: /* @__PURE__ */ new WeakMap()
}));
const recoveredDedupeOwners = resolveGlobalSingleton(Symbol.for("openclaw.sessionPendingInputDedupeRecoveries"), () => /* @__PURE__ */ new WeakSet());
registerAgentEventLifecycleRotationHandler("session-pending-inputs", () => {
	const failures = [];
	for (const owner of owners.live.values()) try {
		owner.finish("interrupted");
	} catch (error) {
		failures.push(error);
	}
	if (failures.length) throw new AggregateError(failures, "Failed to record interrupted pending inputs");
});
function registerSessionPendingInputOwner(owner) {
	if (owners.live.has(owner.inputId)) throw new Error("Pending input already has a live owner");
	owners.live.set(owner.inputId, owner);
}
function releaseSessionPendingInputOwner(owner) {
	if (owners.live.get(owner.inputId) === owner) owners.live.delete(owner.inputId);
}
function finishSessionPendingInputOwner(owner, disposition, source, options) {
	releaseSessionPendingInputOwner(owner);
	if (owner.consumed) return;
	const capturedOptions = {
		...options,
		agentId: source.agentId,
		path: source.path
	};
	assertCapturedSessionEntryReadSource(source, getOpenClawAgentDatabaseIfOpen(capturedOptions));
	runOpenClawAgentWriteTransaction((current) => {
		assertCapturedSessionEntryReadSource(source, current);
		executeSqliteQuerySync(current.db, getSessionKysely(current.db).updateTable("session_pending_inputs").set({ state: disposition }).where("input_id", "=", owner.inputId).where("lifecycle_generation", "=", owner.lifecycleGeneration).where("state", "=", "queued").where("consumed_event_id", "is", null));
	}, capturedOptions, { operationLabel: "session.pending-input.finish-owner" });
}
function assertPendingInputOwnerCurrent(owner) {
	if (owner.sources) {
		for (const source of owner.sources) assertPendingInputOwnerCurrent(source);
		return;
	}
	if (owners.live.get(owner.inputId) !== owner || !isAgentEventLifecycleGenerationCurrent(owner.lifecycleGeneration)) throw new SessionPendingInputCustodyError("Pending input ownership ended; submit a new turn to continue");
	owner.assertCurrent();
}
function runWithSessionPendingInput(owner, run) {
	assertPendingInputOwnerCurrent(owner);
	return owners.current.run(owner, run);
}
/** Persistence alone may mirror a closed turn; the append owner proves exact committed bytes. */
function runWithSessionPendingInputPersistence(owner, persist) {
	return owners.current.run(owner, persist);
}
/** A transcript rewrite may move only the exact current user owned by the live admitted turn. */
function withSessionPendingInputRelocation(sourceInputId, message, append) {
	const owner = owners.current.getStore();
	const record = asOptionalRecord(message);
	const ownsSource = owner?.transcriptInputId === sourceInputId;
	const claimsOwner = record?.role === "user" && record.idempotencyKey === owner?.idempotencyKey;
	if (!owner || !ownsSource && !claimsOwner) return append();
	assertPendingInputOwnerCurrent(owner);
	if (JSON.stringify(message) !== owner.messageJson) throw new Error("Pending input relocation does not match its admitted transcript entry");
	return owners.relocation.run({
		owner,
		sourceInputId
	}, append);
}
/** Registration owns disposition; execution and promotion check the private operational predicates. */
function readSessionPendingInputOwnerIds(database, rows) {
	const candidates = rows.filter((row) => {
		const owner = owners.live.get(row.input_id);
		return owner?.databasePath === database.path && owner.sessionId === row.session_id && owner.sessionKey === row.session_key && owner.lifecycleGeneration === row.lifecycle_generation && isAgentEventLifecycleGenerationCurrent(owner.lifecycleGeneration);
	});
	if (!candidates.length) return /* @__PURE__ */ new Set();
	const sessions = executeSqliteQuerySync(database.db, getSessionKysely(database.db).selectFrom("session_nodes").select(["session_key", "current_session_id"]).where("session_key", "in", [...new Set(candidates.map((row) => row.session_key))])).rows;
	const current = new Map(sessions.map((row) => [row.session_key, row.current_session_id]));
	return new Set(candidates.filter((row) => current.get(row.session_key) === row.session_id).map((row) => row.input_id));
}
function parseSessionPendingInputMessage(messageJson) {
	const value = JSON.parse(messageJson);
	if (asOptionalRecord(value)?.role !== "user") throw new Error("Pending input has an invalid persisted user message");
	return value;
}
function isFinalInputCompletion(outcome) {
	return outcome.reason === "completed" || outcome.reason === "cancelled" && outcome.stopReason !== "restart";
}
function readSessionInputCompletion(database, scope) {
	const row = executeSqliteQueryTakeFirstSync(database.db, getSessionKysely(database.db).selectFrom("session_input_completions").selectAll().where("session_key", "=", scope.sessionKey).where("session_id", "=", scope.sessionId).where("idempotency_key", "=", scope.idempotencyKey));
	if (!row) return;
	const outcome = JSON.parse(row.outcome_json);
	return {
		...row,
		outcome
	};
}
/** The caller holds the write transaction and has revalidated the exact live admission owner. */
function writeSessionInputCompletion(database, scope, outcome) {
	const retained = readSessionInputCompletion(database, scope);
	if (retained && isFinalInputCompletion(retained.outcome)) return retained.outcome;
	const succeeded = classifyAgentRunTerminalOutcome(outcome) === "success";
	executeSqliteQuerySync(database.db, getSessionKysely(database.db).insertInto("session_input_completions").values({
		session_key: scope.sessionKey,
		session_id: scope.sessionId,
		idempotency_key: scope.idempotencyKey,
		run_id: scope.runId,
		request_hash: scope.requestHash,
		outcome_json: JSON.stringify(outcome),
		succeeded: succeeded ? 1 : 0,
		completed_at: Date.now()
	}).onConflict((conflict) => conflict.columns(["session_id", "idempotency_key"]).doUpdateSet({
		outcome_json: JSON.stringify(outcome),
		succeeded: succeeded ? 1 : 0,
		completed_at: Date.now()
	}).where("session_input_completions.succeeded", "=", 0)));
	if (isFinalInputCompletion(outcome)) executeSqliteQuerySync(database.db, getSessionKysely(database.db).deleteFrom("session_pending_inputs").where("session_key", "=", scope.sessionKey).where("session_id", "=", scope.sessionId).where("idempotency_key", "=", scope.idempotencyKey).where("run_id", "=", scope.runId).where("request_hash", "=", scope.requestHash).where("lifecycle_generation", "=", scope.lifecycleGeneration));
	return outcome;
}
function projectSessionPendingInput(row) {
	if (row.state !== "queued" && row.state !== "interrupted" && row.state !== "cancelled") throw new Error("Pending input has an invalid disposition");
	return {
		id: row.input_id,
		runId: row.run_id,
		message: parseSessionPendingInputMessage(row.message_json),
		acceptedAt: row.accepted_at,
		state: row.state
	};
}
/** Only a current recovered source can supersede its previous request receipt, once. */
function claimCurrentSessionPendingInputDedupeRecovery(database, scope, runId) {
	const owner = owners.current.getStore();
	if (!owner || owner.sources || owner.restartRecovered !== true || recoveredDedupeOwners.has(owner) || owner.databasePath !== database.path || owner.sessionId !== scope.sessionId || owner.sessionKey !== scope.sessionKey || owner.idempotencyKey !== `${runId}:user`) return false;
	assertPendingInputOwnerCurrent(owner);
	const row = readSessionPendingInputByKey(database, scope, owner.idempotencyKey);
	const current = Boolean(row && row.input_id === owner.inputId && row.run_id === runId && row.message_json === owner.messageJson && row.state === "queued" && row.consumed_event_id == null && readSessionPendingInputOwnerIds(database, [row]).has(owner.inputId));
	if (current) recoveredDedupeOwners.add(owner);
	return current;
}
/** Query only the exact physical transcript; copied keys cannot adopt another generation. */
function readSessionPendingInputByKey(database, scope, idempotencyKey) {
	if (!hasSessionPendingInputsSchema(database.db)) return;
	return executeSqliteQueryTakeFirstSync(database.db, getSessionKysely(database.db).selectFrom("session_pending_inputs").selectAll().where("session_id", "=", scope.sessionId).where("session_key", "=", scope.sessionKey).where("idempotency_key", "=", idempotencyKey));
}
/** The private call-path owner, not a copied id or durable row, permits promotion. */
function resolveSessionPendingInputAppend(database, scope, message) {
	const record = asOptionalRecord(message);
	if (record?.role !== "user" || typeof record.idempotencyKey !== "string") return;
	const idempotencyKey = record.idempotencyKey.trim();
	const row = readSessionPendingInputByKey(database, scope, idempotencyKey);
	const owner = owners.current.getStore();
	const ownsInput = owner?.idempotencyKey === idempotencyKey && owner.databasePath === database.path && owner.sessionId === scope.sessionId && owner.sessionKey === scope.sessionKey;
	if (!row && !ownsInput) return;
	if (!owner || !ownsInput || row && (row.input_id !== owner.inputId || row.consumed_event_id != null || row.state !== "queued" || row.lifecycle_generation !== owner.lifecycleGeneration)) throw new SessionPendingInputCustodyError("Pending input cannot be appended outside its admitted turn");
	const relocation = owners.relocation.getStore();
	const transcriptInputId = owners.transactionRelocations.get(database.db)?.get(owner) ?? owner.transcriptInputId;
	if (relocation?.owner === owner && relocation.sourceInputId !== transcriptInputId) throw new Error("Pending input relocation does not match its admitted transcript entry");
	const stageRelocation = relocation?.owner === owner ? (destinationInputId) => {
		let staged = owners.transactionRelocations.get(database.db);
		const hadPrevious = staged?.has(owner) ?? false;
		const previous = staged?.get(owner);
		if (!stageSqliteTransactionState(database.db, {
			stage: () => {
				staged ??= /* @__PURE__ */ new Map();
				owners.transactionRelocations.set(database.db, staged);
				staged.set(owner, destinationInputId);
			},
			rollback: () => {
				if (hadPrevious && previous !== void 0) staged?.set(owner, previous);
				else staged?.delete(owner);
				if (staged?.size === 0) owners.transactionRelocations.delete(database.db);
			},
			commit: () => {
				owner.transcriptInputId = destinationInputId;
				if (staged?.get(owner) === destinationInputId) staged.delete(owner);
				if (staged?.size === 0) owners.transactionRelocations.delete(database.db);
			}
		})) throw new Error("Pending input relocation requires a transcript write transaction");
	} : void 0;
	if (owner.sources) {
		const acceptedByKey = new Map(executeSqliteQuerySync(database.db, getSessionKysely(database.db).selectFrom("session_pending_inputs").selectAll().where("session_id", "=", scope.sessionId).where("session_key", "=", scope.sessionKey).where("idempotency_key", "in", owner.sources.map((source) => source.idempotencyKey))).rows.map((sourceRow) => [sourceRow.idempotency_key, sourceRow]));
		const sources = owner.sources.map((source) => {
			const accepted = acceptedByKey.get(source.idempotencyKey);
			if (!accepted || accepted.input_id !== source.inputId || accepted.lifecycle_generation !== source.lifecycleGeneration || accepted.message_json !== source.messageJson) throw new SessionPendingInputCustodyError("Collected input custody changed before transcript promotion");
			return accepted;
		});
		const alreadyPromoted = sources.every((source) => source.consumed_event_id === owner.inputId);
		if (!alreadyPromoted) {
			if (sources.some((source) => source.consumed_event_id != null || source.state !== "queued")) throw new SessionPendingInputCustodyError("Collected input custody ended before transcript promotion");
			assertPendingInputOwnerCurrent(owner);
		}
		return {
			inputId: transcriptInputId,
			message: parseSessionPendingInputMessage(owner.messageJson),
			alreadyPromoted,
			sourceInputIds: sources.map((source) => source.input_id),
			...alreadyPromoted && stageRelocation ? { stageRelocation } : {}
		};
	}
	if (row) assertPendingInputOwnerCurrent(owner);
	return {
		inputId: transcriptInputId,
		message: parseSessionPendingInputMessage(row?.message_json ?? owner.messageJson),
		alreadyPromoted: !row,
		...!row && stageRelocation ? { stageRelocation } : {}
	};
}
function consumeSessionPendingInput(database, pending) {
	if (pending.alreadyPromoted) return;
	const owner = owners.current.getStore();
	const inputIds = new Set(pending.sourceInputIds ?? [pending.inputId]);
	const consumedOwners = (owner?.sources ?? (owner ? [owner] : [])).filter((candidate) => owners.live.get(candidate.inputId) === candidate && candidate.databasePath === database.path && inputIds.has(candidate.inputId));
	if (pending.sourceInputIds) {
		if (executeSqliteQuerySync(database.db, getSessionKysely(database.db).updateTable("session_pending_inputs").set({ consumed_event_id: pending.inputId }).where("input_id", "in", [...pending.sourceInputIds]).where("state", "=", "queued").where("consumed_event_id", "is", null)).numAffectedRows !== BigInt(pending.sourceInputIds.length)) throw new SessionPendingInputCustodyError("Collected input custody changed during transcript promotion");
	} else if (executeSqliteQuerySync(database.db, getSessionKysely(database.db).deleteFrom("session_pending_inputs").where("input_id", "=", pending.inputId).where("state", "=", "queued")).numAffectedRows !== 1n) return;
	stageSqliteTransactionState(database.db, {
		stage: () => {},
		rollback: () => {},
		commit: () => {
			for (const consumedOwner of consumedOwners) consumedOwner.consumed = true;
		}
	});
}
/** Logical deletion also clears custody when transcript windows are retained. */
function deleteSessionPendingInputs(database, sessionKey) {
	if (hasSessionPendingInputsSchema(database.db)) executeSqliteQuerySync(database.db, getSessionKysely(database.db).deleteFrom("session_pending_inputs").where("session_key", "=", sessionKey));
}
//#endregion
export { loadSessionEntryByIdReadOnly as C, retainSessionEntryKeyAbsence as D, resolveSessionEntry as E, loadExactSessionEntryReadOnly as S, readSessionEntryByIdInDatabase as T, assertCapturedSessionEntryReadSource as _, isFinalInputCompletion as a, loadExactSessionEntryCandidatesReadOnlyBatch as b, readSessionInputCompletion as c, registerSessionPendingInputOwner as d, resolveSessionPendingInputAppend as f, writeSessionInputCompletion as g, withSessionPendingInputRelocation as h, finishSessionPendingInputOwner as i, readSessionPendingInputByKey as l, runWithSessionPendingInputPersistence as m, consumeSessionPendingInput as n, parseSessionPendingInputMessage as o, runWithSessionPendingInput as p, deleteSessionPendingInputs as r, projectSessionPendingInput as s, claimCurrentSessionPendingInputDedupeRecovery as t, readSessionPendingInputOwnerIds as u, loadExactSessionEntry as v, loadSessionEntryReadOnlyResultInScope as w, loadExactSessionEntryFromStoreReadOnly as x, loadExactSessionEntryCandidates as y };
