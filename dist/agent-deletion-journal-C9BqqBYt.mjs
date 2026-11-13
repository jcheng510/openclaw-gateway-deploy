import { i as resolveGlobalSingleton } from "./global-singleton-BfHBYj6Y.mjs";
import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { r as isPathInside } from "./path-guards-CH7noY0Z.mjs";
import { t as hasErrnoCode } from "./errno-FR4CRyya.mjs";
import { a as iterateSqliteQuerySync, i as getNodeSqliteKysely, n as executeSqliteQuerySync, r as executeSqliteQueryTakeFirstSync } from "./kysely-sync-Y4_ti-rQ.mjs";
import { i as isSqliteCorruptionError } from "./sqlite-error-diagnostics-XVtvbiXE.mjs";
import { i as tableExists } from "./openclaw-state-db-schema-helpers-C29HKgWe.mjs";
import { i as stageSqliteTransactionState } from "./sqlite-post-commit-Dih1WMKX.mjs";
import { i as resolveOpenClawRegisteredAgentDatabasePath, s as resolveOpenClawStateSqlitePath } from "./openclaw-state-db.paths-rJI64Ab5.mjs";
import { n as ok, t as err } from "./result-BQGgYouL.mjs";
import { n as normalizeAgentId } from "./agent-id-D1-Q6vR4.mjs";
import { u as withExistingOpenClawStateDatabaseCurrentReadOnly } from "./openclaw-state-db-readonly-DE3MB0wy.mjs";
import { a as resolveSqliteDatabaseFilePaths } from "./sqlite-files-BqDG9Qm0.mjs";
import { r as captureOpenClawStateWorkerContext } from "./openclaw-state-worker-context-C_iAE7YK.mjs";
import { k as normalizeAgentDirRegistryPath } from "./agent-scope-config-Dm6T00l4.mjs";
import "./session-key-BC4m_Ly5.mjs";
import { c as resolveOpenClawAgentSqlitePath } from "./openclaw-agent-db.paths-Dv3PPTNK.mjs";
import { l as runOpenClawStateWriteTransaction } from "./openclaw-state-db-DM-mSY0m.mjs";
import { t as assertAgentDeletionJournalAvailable } from "./openclaw-state-db-schema-additive-Dxdw3FOE.mjs";
import { n as sessionChanges } from "./session-row-changes-DFigA589.mjs";
import { a as captureAgentDatabasePreparationDeletion } from "./agent-database-admission-CLYAvaL3.mjs";
import { i as resolveAgentDeletionRecoveryHolds } from "./agent-deletion-journal-recovery--JiHJSwq.mjs";
import { t as parseAgentDeletionDatabasePaths } from "./agent-deletion-journal.read-BnCyzoNE.mjs";
import { t as createOpenClawStateSchemaEnsurer } from "./openclaw-state-feature-schema-C1E82tS9.mjs";
import path from "node:path";
import { AsyncLocalStorage } from "node:async_hooks";
//#region src/state/agent-deletion-cleanup.ts
const databaseCleanup = resolveGlobalSingleton(Symbol.for("openclaw.agentDeletionDatabaseCleanup"), () => new AsyncLocalStorage());
const cleanupHandles = resolveGlobalSingleton(Symbol.for("openclaw.agentDeletionDatabaseCleanupHandles"), () => /* @__PURE__ */ new Map());
/** The lifecycle owner supplies live closures, never a transferable operation id. */
function createAgentDeletionDatabaseCleanup(owner) {
	return async (target, run) => {
		let active = true;
		const closers = /* @__PURE__ */ new Set();
		const closeHandles = async () => {
			const errors = [];
			for (const close of [...closers].toReversed()) try {
				await close();
				closers.delete(close);
			} catch (error) {
				errors.push(error);
			}
			return errors;
		};
		const assertActive = () => {
			if (!active) throw new Error("Agent deletion database cleanup is no longer active.");
		};
		const scope = {
			agentId: normalizeAgentId(target.agentId),
			path: path.resolve(target.path),
			statePath: path.resolve(owner.statePath),
			assertCurrent: () => {
				assertActive();
				owner.assertCurrent();
			},
			assertJournal: (statePath, entries) => {
				assertActive();
				return owner.assertJournal(statePath, entries);
			},
			registerClose: (close) => {
				assertActive();
				closers.add(close);
			},
			retryClose: async () => {
				if (active) throw new Error("Agent database belongs to an active deletion cleanup.");
				const errors = await closeHandles();
				if (errors.length > 0) throw new AggregateError(errors, "Agent deletion database close retry failed.");
			},
			withCommit: (commit) => {
				assertActive();
				owner.withCommit(commit);
			}
		};
		return await databaseCleanup.run(scope, async () => {
			let outcome;
			const closeErrors = [];
			try {
				scope.assertCurrent();
				for (const previous of new Set(cleanupHandles.values())) if (previous.statePath === scope.statePath && previous.agentId === scope.agentId && previous.path === scope.path) {
					await previous.retryClose();
					scope.assertCurrent();
				}
				owner.assertAdmission();
				const value = await run();
				scope.assertCurrent();
				outcome = ok(value);
			} catch (error) {
				outcome = err(error);
			} finally {
				active = false;
				closeErrors.push(...await closeHandles());
			}
			if (!outcome.ok) throw closeErrors.length > 0 ? new AggregateError([outcome.error, ...closeErrors], "Agent deletion database cleanup failed.") : outcome.error;
			if (closeErrors.length > 0) throw closeErrors.length === 1 ? closeErrors[0] : new AggregateError(closeErrors, "Agent deletion database cleanup failed.");
			owner.assertCurrent();
			return outcome.value;
		});
	};
}
function getAgentDeletionDatabaseCleanup(params) {
	const scope = databaseCleanup.getStore();
	if (!scope || scope.agentId !== normalizeAgentId(params.agentId) || scope.path !== resolveOpenClawAgentSqlitePath(params)) return;
	const statePath = params.statePath ?? resolveOpenClawStateSqlitePath(params.env ?? process.env);
	if (scope.statePath !== path.resolve(statePath)) throw new Error("Agent deletion database cleanup belongs to another state database.");
	return scope;
}
function assertAgentDeletionDatabaseCleanupAccess(database, options) {
	const scope = getAgentDeletionDatabaseCleanup(options);
	const owner = cleanupHandles.get(database);
	if (owner && owner !== scope) throw new Error("Agent database belongs to an active deletion cleanup.");
	scope?.assertCurrent();
}
function assertAgentDeletionCleanupAliases(options, isSamePath) {
	const pathname = resolveOpenClawAgentSqlitePath(options);
	for (const owned of cleanupHandles.keys()) if (isSamePath(owned.path, pathname)) assertAgentDeletionDatabaseCleanupAccess(owned, options);
}
function registerAgentDeletionDatabaseCleanup(database, options) {
	const scope = getAgentDeletionDatabaseCleanup(options);
	scope?.assertCurrent();
	if (scope) cleanupHandles.set(database, scope);
	return scope;
}
/** Release the tag only after the native owner has closed and released its lease. */
function releaseAgentDeletionDatabaseCleanup(database) {
	cleanupHandles.delete(database);
}
//#endregion
//#region src/state/agent-provenance.kernel.ts
function fromRow$1(row) {
	if (row.created_via !== "operator" && row.created_via !== "agent" && row.created_via !== "claw") throw new Error(`Invalid agent provenance created_via: ${row.created_via}`);
	return {
		agentId: row.agent_id,
		createdVia: row.created_via,
		creatorAgentId: row.creator_agent_id,
		createdAtMs: row.created_at_ms
	};
}
function readAgentProvenanceInDatabase(database, agentId) {
	const db = getNodeSqliteKysely(database);
	const row = executeSqliteQueryTakeFirstSync(database, db.selectFrom("agent_provenance").selectAll().where("agent_id", "=", normalizeAgentId(agentId)));
	return row ? fromRow$1(row) : void 0;
}
function listAgentProvenanceInDatabase(database) {
	const db = getNodeSqliteKysely(database);
	return executeSqliteQuerySync(database, db.selectFrom("agent_provenance").selectAll().orderBy("agent_id", "asc")).rows.map(fromRow$1);
}
/** Decode only requested provenance, in the caller's order, including its first error. */
function readAgentProvenanceBatchInDatabase(database, agentIds) {
	if (agentIds.length === 0) return [];
	const db = getNodeSqliteKysely(database);
	const requestedIds = JSON.stringify(agentIds.map(normalizeAgentId));
	const query = db.selectFrom((eb) => eb.fn("json_each", [eb.val(requestedIds)]).as("requested")).innerJoin("agent_provenance", "agent_provenance.agent_id", "requested.value").selectAll("agent_provenance").orderBy("requested.key", "asc");
	const records = [];
	for (const row of iterateSqliteQuerySync(database, query)) records.push(fromRow$1(row));
	return records;
}
//#endregion
//#region src/state/agent-provenance.schema.ts
const ensureAgentProvenanceSchema = createOpenClawStateSchemaEnsurer({
	table: "agent_provenance",
	operationLabel: "agent-provenance.schema.ensure"
});
//#endregion
//#region src/state/agent-provenance.ts
function recordAgentProvenance(agentId, provenance, options = {}) {
	ensureAgentProvenanceSchema(options);
	const id = normalizeAgentId(agentId);
	const creatorAgentId = provenance.creatorAgentId ? normalizeAgentId(provenance.creatorAgentId) : null;
	const createdAtMs = options.nowMs ?? Date.now();
	runOpenClawStateWriteTransaction(({ db: sqlite }) => {
		const db = getNodeSqliteKysely(sqlite);
		executeSqliteQuerySync(sqlite, db.insertInto("agent_provenance").values({
			agent_id: id,
			created_via: provenance.createdVia,
			creator_agent_id: creatorAgentId,
			created_at_ms: createdAtMs
		}).onConflict((conflict) => conflict.column("agent_id").doUpdateSet({
			created_via: provenance.createdVia,
			creator_agent_id: creatorAgentId,
			created_at_ms: createdAtMs
		})));
	}, options, { operationLabel: "agent-provenance.record" });
}
function readAgentProvenance(agentId, options = {}) {
	return withExistingOpenClawStateDatabaseCurrentReadOnly(({ db }) => {
		try {
			return readAgentProvenanceInDatabase(db, agentId);
		} catch (error) {
			if (error instanceof Error && hasErrnoCode(error, "ERR_SQLITE_ERROR") && error.message === "no such table: agent_provenance") return;
			throw error;
		}
	}, options);
}
const DISPLAY_PROVENANCE_BATCH_SIZE = 256;
/** Presentation reads may wait; incarnation checks retain the synchronous reader above. */
async function readAgentProvenanceForDisplay(agentIds, options = {}) {
	if (agentIds.length === 0) return [];
	const context = captureOpenClawStateWorkerContext(options);
	const requestedIds = agentIds.map(normalizeAgentId);
	const { executeOpenClawStateWorker } = await import("./openclaw-state-worker-store-Bp_XCEWM.mjs");
	const records = [];
	for (let offset = 0; offset < requestedIds.length; offset += DISPLAY_PROVENANCE_BATCH_SIZE) {
		const batch = await executeOpenClawStateWorker(context, {
			type: "agentProvenance.readBatch",
			input: { agentIds: requestedIds.slice(offset, offset + DISPLAY_PROVENANCE_BATCH_SIZE) }
		});
		records.push(...batch);
	}
	return records;
}
async function listAgentProvenance(options = {}) {
	const context = captureOpenClawStateWorkerContext(options);
	const { executeOpenClawStateWorker } = await import("./openclaw-state-worker-store-Bp_XCEWM.mjs");
	return executeOpenClawStateWorker(context, {
		type: "agentProvenance.list",
		input: void 0
	});
}
/** Delete one row inside the caller's authoritative state transaction. */
function deleteAgentProvenanceForAgent(database, agentId) {
	const db = getNodeSqliteKysely(database);
	executeSqliteQuerySync(database, db.deleteFrom("agent_provenance").where("agent_id", "=", normalizeAgentId(agentId)));
}
//#endregion
//#region src/state/agent-deletion-journal.ts
function assertAgentDeletionIdentityClaimAllowed(claimAgentId, deletedAgentId) {
	if (deletedAgentId && normalizeAgentId(claimAgentId) === normalizeAgentId(deletedAgentId)) throw new Error(`OpenClaw agent database is unavailable while agent ${normalizeAgentId(deletedAgentId)} is deleted.`);
}
function readAgentDeletionPathFenceRows(database, purpose = "runtime", agentId) {
	if (purpose === "maintenance") assertAgentDeletionJournalAvailable(database);
	try {
		if (!tableExists(database, "agent_deletion_journal")) return {
			known: false,
			rows: []
		};
		const db = getNodeSqliteKysely(database);
		let known = true;
		let query = db.selectFrom("agent_deletion_journal").select([
			"agent_id",
			"operation_id",
			"agent_dir",
			"workspace_dir",
			"sessions_dir",
			"database_paths_json",
			"cleanup_paths_json",
			"cleanup_completed",
			"created_at",
			"delete_files"
		]);
		if (agentId !== void 0) query = query.where("agent_id", "=", normalizeAgentId(agentId));
		const rows = executeSqliteQuerySync(database, query).rows.map((row) => {
			let databasePaths = [];
			let cleanupPaths = [];
			try {
				databasePaths = parseAgentDeletionDatabasePaths(row.database_paths_json);
				cleanupPaths = parseCleanupPaths(row.cleanup_paths_json);
			} catch (error) {
				if (purpose === "maintenance") throw error;
				known = false;
			}
			return Object.assign(row, {
				databasePaths,
				cleanupPaths
			});
		});
		return {
			known,
			rows
		};
	} catch (error) {
		if (purpose === "maintenance" || isSqliteCorruptionError(error)) throw error;
		return {
			known: false,
			rows: []
		};
	}
}
function prepareAgentDeletionPathFence(claim, options = {}, purpose = claim.fenceAgentId ? "maintenance" : "runtime") {
	const { rows, known } = runOpenClawStateWriteTransaction((database) => readAgentDeletionPathFenceRows(database.db, purpose), {
		...options,
		initializationAgentPaths: [...options.initializationAgentPaths ?? [], claim.path]
	});
	const env = options.env ?? process.env;
	return {
		journal: known ? "known" : "unknown",
		purpose,
		claimAgentId: normalizeAgentId(claim.agentId),
		claimPath: path.resolve(claim.path),
		...claim.fenceAgentId ? { fenceAgentId: normalizeAgentId(claim.fenceAgentId) } : {},
		targetPaths: resolveSqliteDatabaseFilePaths(claim.path).map((filePath) => normalizeAgentDirRegistryPath(filePath, env)),
		entries: rows.map((row) => ({
			agentId: row.agent_id,
			operationId: row.operation_id,
			agentDir: row.agent_dir,
			workspaceDir: row.workspace_dir,
			sessionsDir: row.sessions_dir,
			cleanupCompleted: row.cleanup_completed === 1,
			databasePathsJson: row.database_paths_json,
			cleanupPathsJson: row.cleanup_paths_json,
			canonicalPaths: [
				row.agent_dir,
				row.workspace_dir,
				row.sessions_dir
			].map((entryPath) => normalizeAgentDirRegistryPath(entryPath, env)),
			databasePaths: row.databasePaths.map((databasePath) => ({
				path: databasePath,
				canonicalPath: normalizeAgentDirRegistryPath(databasePath, env)
			})),
			cleanupPaths: row.cleanupPaths.map((cleanupPath) => Object.assign({}, cleanupPath, { fencePath: normalizeAgentDirRegistryPath(cleanupPath.canonicalPath, env) }))
		}))
	};
}
/** Refuse database claims beneath paths still owned by an unfinished deletion. */
function assertAgentDeletionPathFence(state, snapshot) {
	const database = state.db;
	const { rows: journalRows, known } = readAgentDeletionPathFenceRows(database, snapshot.purpose);
	if (!known && journalRows.length === 0) return;
	const snapshotJournal = snapshot.entries.map((entry) => [
		entry.agentId,
		entry.operationId,
		entry.agentDir,
		entry.workspaceDir,
		entry.sessionsDir,
		entry.databasePathsJson,
		entry.cleanupPathsJson,
		entry.cleanupCompleted ? 1 : 0
	].join("\0")).toSorted();
	const currentJournal = journalRows.map((row) => [
		row.agent_id,
		row.operation_id,
		row.agent_dir,
		row.workspace_dir,
		row.sessions_dir,
		row.database_paths_json,
		row.cleanup_paths_json,
		row.cleanup_completed
	].join("\0")).toSorted();
	if (snapshotJournal.join("\n") !== currentJournal.join("\n")) throw new Error("Agent deletion journal changed while preparing a database claim.");
	const cleanupAgentId = (snapshot.fenceAgentId ? void 0 : getAgentDeletionDatabaseCleanup({
		agentId: snapshot.claimAgentId,
		path: snapshot.claimPath,
		statePath: state.path
	}))?.assertJournal(state.path, journalRows.map((row) => ({
		agentId: row.agent_id,
		operationId: row.operation_id,
		cleanupCompleted: row.cleanup_completed === 1
	})));
	for (const row of journalRows) {
		if (snapshot.fenceAgentId && snapshot.fenceAgentId !== row.agent_id) continue;
		if (row.agent_id === cleanupAgentId) continue;
		assertAgentDeletionIdentityClaimAllowed(snapshot.claimAgentId, row.agent_id);
		if (row.cleanup_completed === 1) continue;
		const entry = snapshot.entries.find((candidate) => candidate.agentId === row.agent_id && candidate.operationId === row.operation_id && candidate.agentDir === row.agent_dir && candidate.workspaceDir === row.workspace_dir && candidate.sessionsDir === row.sessions_dir && candidate.databasePathsJson === row.database_paths_json && candidate.cleanupPathsJson === row.cleanup_paths_json);
		if (!entry) throw new Error("Agent deletion journal changed while preparing a database claim.");
		const fences = [
			...entry.canonicalPaths.map((canonicalPath, index) => ({
				canonicalPath,
				path: [
					entry.agentDir,
					entry.workspaceDir,
					entry.sessionsDir
				][index]
			})),
			...entry.databasePaths,
			...entry.cleanupPaths.map((cleanupPath) => ({
				path: cleanupPath.path,
				canonicalPath: cleanupPath.fencePath
			}))
		];
		for (const fence of fences) {
			const blockedPath = snapshot.targetPaths.find((targetPath) => targetPath === fence.canonicalPath || isPathInside(fence.canonicalPath, targetPath));
			if (blockedPath) throw new Error(`OpenClaw agent database ${blockedPath} is unavailable while agent ${row.agent_id} deletion owns ${fence.path}.`);
		}
	}
}
function fromRow(row) {
	return {
		agentId: row.agent_id,
		operationId: row.operation_id,
		agentDir: row.agent_dir,
		workspaceDir: row.workspace_dir,
		sessionsDir: row.sessions_dir,
		databasePaths: row.databasePaths ?? parseAgentDeletionDatabasePaths(row.database_paths_json),
		cleanupPaths: row.cleanupPaths ?? parseCleanupPaths(row.cleanup_paths_json),
		createdAt: row.created_at,
		cleanupCompleted: row.cleanup_completed === 1,
		deleteFiles: row.delete_files === 1
	};
}
function parseCleanupPaths(value) {
	const parsed = JSON.parse(value);
	if (!Array.isArray(parsed) || !parsed.every((entry) => isRecord(entry) && typeof entry.path === "string" && typeof entry.canonicalPath === "string" && typeof entry.parentPath === "string" && (entry.kind === "target" || entry.kind === "symlink") && (entry.dev === null || typeof entry.dev === "number") && (entry.ino === null || typeof entry.ino === "number") && typeof entry.coversDescendants === "boolean" && typeof entry.done === "boolean" && (entry.note === void 0 || typeof entry.note === "string") && Array.isArray(entry.sourcePaths) && entry.sourcePaths.every((sourcePath) => typeof sourcePath === "string"))) throw new Error("Invalid agent deletion cleanup path journal.");
	return parsed;
}
/** Read the journal through an already validated shared-state connection. */
function readAgentDeletionJournalInDatabase(database, agentId, purpose = "maintenance") {
	const row = readAgentDeletionPathFenceRows(database.db, purpose, agentId).rows[0];
	return row ? fromRow(row) : void 0;
}
function readAgentDeletionJournal(agentId, options = {}, purpose = "maintenance") {
	return withExistingOpenClawStateDatabaseCurrentReadOnly((database) => readAgentDeletionJournalInDatabase(database, agentId, purpose), options);
}
function beginAgentDeletionJournal(entry, options = {}) {
	const normalized = {
		...entry,
		agentId: normalizeAgentId(entry.agentId),
		databasePaths: [...new Set((entry.databasePaths ?? []).map((entryPath) => path.resolve(entryPath)))],
		cleanupPaths: entry.cleanupPaths ?? []
	};
	ensureAgentProvenanceSchema(options);
	return runOpenClawStateWriteTransaction((database) => {
		const invalidatePreparation = captureAgentDatabasePreparationDeletion(normalized.agentId, database);
		if (!stageSqliteTransactionState(database.db, {
			stage() {},
			rollback() {},
			commit: invalidatePreparation
		})) throw new Error("Agent deletion journal requires a managed transaction");
		sessionChanges.emit({
			all: true,
			scope: "stores"
		}, database.db);
		assertAgentDeletionJournalAvailable(database.db);
		const db = getNodeSqliteKysely(database.db);
		const existing = executeSqliteQueryTakeFirstSync(database.db, db.selectFrom("agent_deletion_journal").selectAll().where("agent_id", "=", normalized.agentId));
		const registeredDatabasePaths = executeSqliteQuerySync(database.db, db.selectFrom("agent_databases").select("path").where("agent_id", "=", normalized.agentId)).rows.flatMap((row) => resolveSqliteDatabaseFilePaths(resolveOpenClawRegisteredAgentDatabasePath(database.path, row.path)));
		const previous = existing && fromRow(existing);
		const databasePaths = [...new Set([
			...previous?.databasePaths ?? [],
			...normalized.databasePaths,
			...registeredDatabasePaths
		].map((entryPath) => path.resolve(entryPath)))];
		const cleanupPaths = previous?.cleanupPaths ?? normalized.cleanupPaths;
		if (previous) {
			executeSqliteQuerySync(database.db, db.updateTable("agent_deletion_journal").set({
				operation_id: normalized.operationId,
				database_paths_json: JSON.stringify(databasePaths),
				cleanup_paths_json: JSON.stringify(cleanupPaths),
				cleanup_completed: 0,
				delete_files: normalized.deleteFiles ? 1 : 0
			}).where("agent_id", "=", normalized.agentId));
			return {
				...previous,
				operationId: normalized.operationId,
				databasePaths,
				cleanupPaths,
				cleanupCompleted: false,
				deleteFiles: normalized.deleteFiles
			};
		}
		const createdAt = Date.now();
		executeSqliteQuerySync(database.db, db.insertInto("agent_deletion_journal").values({
			agent_id: normalized.agentId,
			operation_id: normalized.operationId,
			agent_dir: normalized.agentDir,
			workspace_dir: normalized.workspaceDir,
			sessions_dir: normalized.sessionsDir,
			database_paths_json: JSON.stringify(databasePaths),
			cleanup_paths_json: JSON.stringify(cleanupPaths),
			created_at: createdAt,
			cleanup_completed: 0,
			delete_files: normalized.deleteFiles ? 1 : 0
		}));
		return {
			...normalized,
			databasePaths,
			cleanupPaths,
			createdAt,
			cleanupCompleted: false
		};
	}, options);
}
function updateAgentDeletionJournalCleanupPaths(agentId, operationId, cleanupPaths, options = {}) {
	return updateAgentDeletionJournalPaths(normalizeAgentId(agentId), operationId, "cleanup_paths_json", cleanupPaths, options);
}
function updateAgentDeletionJournalDatabasePaths(agentId, operationId, databasePaths, options = {}) {
	return updateAgentDeletionJournalPaths(normalizeAgentId(agentId), operationId, "database_paths_json", [...new Set(databasePaths.map((entryPath) => path.resolve(entryPath)))], options);
}
function updateAgentDeletionJournalPaths(agentId, operationId, column, paths, options) {
	return runOpenClawStateWriteTransaction((database) => {
		assertAgentDeletionJournalAvailable(database.db);
		const db = getNodeSqliteKysely(database.db);
		const result = executeSqliteQuerySync(database.db, db.updateTable("agent_deletion_journal").set({ [column]: JSON.stringify(paths) }).where("agent_id", "=", agentId).where("operation_id", "=", operationId).where("cleanup_completed", "=", 0));
		const updated = Number(result.numAffectedRows ?? 0) > 0;
		if (updated) sessionChanges.emit({
			all: true,
			scope: "stores"
		}, database.db);
		return updated;
	}, options);
}
/** Complete a deletion journal inside a caller-owned shared-state transaction. */
function completeAgentDeletionJournalInDatabase(database, agentId, operationId) {
	const id = normalizeAgentId(agentId);
	assertAgentDeletionJournalAvailable(database.db);
	const db = getNodeSqliteKysely(database.db);
	const result = executeSqliteQuerySync(database.db, db.updateTable("agent_deletion_journal").set({ cleanup_completed: 1 }).where("agent_id", "=", id).where("operation_id", "=", operationId));
	const completed = Number(result.numAffectedRows ?? 0) > 0;
	if (completed) {
		const journal = readAgentDeletionJournalInDatabase(database, id);
		resolveAgentDeletionRecoveryHolds(database, id, journal?.databasePaths ?? []);
		deleteAgentProvenanceForAgent(database.db, id);
		sessionChanges.emit({
			all: true,
			scope: "stores"
		}, database.db);
	}
	return completed;
}
function removeAgentDeletionJournal(agentId, operationId, options = {}) {
	return deleteAgentDeletionJournal(agentId, operationId, false, options);
}
function claimCompletedAgentDeletionJournal(agentId, operationId, options = {}) {
	return deleteAgentDeletionJournal(agentId, operationId, true, options);
}
function deleteAgentDeletionJournal(agentId, operationId, completedOnly, options) {
	const id = normalizeAgentId(agentId);
	return runOpenClawStateWriteTransaction((database) => {
		assertAgentDeletionJournalAvailable(database.db);
		const query = getNodeSqliteKysely(database.db).deleteFrom("agent_deletion_journal").where("agent_id", "=", id).where("operation_id", "=", operationId);
		const result = executeSqliteQuerySync(database.db, completedOnly ? query.where("cleanup_completed", "=", 1) : query);
		const removed = Number(result.numAffectedRows ?? 0) > 0;
		if (removed) sessionChanges.emit({
			all: true,
			scope: "stores"
		}, database.db);
		return removed;
	}, options);
}
//#endregion
export { releaseAgentDeletionDatabaseCleanup as C, registerAgentDeletionDatabaseCleanup as S, readAgentProvenanceBatchInDatabase as _, prepareAgentDeletionPathFence as a, createAgentDeletionDatabaseCleanup as b, removeAgentDeletionJournal as c, listAgentProvenance as d, readAgentProvenance as f, listAgentProvenanceInDatabase as g, ensureAgentProvenanceSchema as h, completeAgentDeletionJournalInDatabase as i, updateAgentDeletionJournalCleanupPaths as l, recordAgentProvenance as m, beginAgentDeletionJournal as n, readAgentDeletionJournal as o, readAgentProvenanceForDisplay as p, claimCompletedAgentDeletionJournal as r, readAgentDeletionJournalInDatabase as s, assertAgentDeletionPathFence as t, updateAgentDeletionJournalDatabasePaths as u, assertAgentDeletionCleanupAliases as v, getAgentDeletionDatabaseCleanup as x, assertAgentDeletionDatabaseCleanupAccess as y };
