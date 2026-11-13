import { t as resolveIdentityPathViaExistingAncestorSync } from "./boundary-path-CAv_plX7.mjs";
import { i as getNodeSqliteKysely, n as executeSqliteQuerySync } from "./kysely-sync-Y4_ti-rQ.mjs";
import { i as stageSqliteTransactionState } from "./sqlite-post-commit-Dih1WMKX.mjs";
import { i as resolveOpenClawRegisteredAgentDatabasePath, r as resolveOpenClawAgentDatabaseStoredPath } from "./openclaw-state-db.paths-rJI64Ab5.mjs";
import { y as requireOpenClawStateDatabaseIdentity } from "./openclaw-state-db-cache-IAib4pqp.mjs";
import "./openclaw-agent-db-identity-ChZ28OhF.mjs";
import { c as invalidateOpenClawAgentDatabaseValidation, l as invalidateOpenClawAgentDatabaseValidationsForAgent } from "./openclaw-agent-db-validation-cache-C348cqkT.mjs";
import { a as isPersistentOpenClawAgentDatabasePath, o as isSameOpenClawAgentDatabasePath } from "./openclaw-agent-db.paths-Dv3PPTNK.mjs";
import { l as runOpenClawStateWriteTransaction } from "./openclaw-state-db-DM-mSY0m.mjs";
import { n as sessionChanges } from "./session-row-changes-DFigA589.mjs";
import { a as prepareAgentDeletionPathFence, t as assertAgentDeletionPathFence } from "./agent-deletion-journal-C9BqqBYt.mjs";
import { i as invalidateRegisteredAgentDatabasesMemo } from "./openclaw-agent-db-registry-listing-DKcT5BJS.mjs";
import { statSync } from "node:fs";
import path from "node:path";
//#region src/state/openclaw-agent-db-registry.ts
function resolveRegisteredAgentDatabaseStoredPath(database, params) {
	const storedPath = resolveOpenClawAgentDatabaseStoredPath(database.path, params.path);
	if (params.path !== resolveIdentityPathViaExistingAncestorSync(params.path)) return storedPath;
	const db = getNodeSqliteKysely(database.db);
	const { rows } = executeSqliteQuerySync(database.db, db.selectFrom("agent_databases").select("path").where("agent_id", "=", params.agentId));
	return rows.some((row) => row.path === storedPath) ? storedPath : rows.find((row) => isSameOpenClawAgentDatabasePath(resolveOpenClawRegisteredAgentDatabasePath(database.path, row.path), params.path))?.path ?? storedPath;
}
function registerOpenClawAgentDatabase(params, observer) {
	if (!isPersistentOpenClawAgentDatabasePath(params.path, params.env)) return;
	const deletionFence = prepareAgentDeletionPathFence({
		agentId: params.agentId,
		path: params.path
	}, { env: params.env });
	let sizeBytes = null;
	try {
		sizeBytes = statSync(params.path).size;
	} catch {
		sizeBytes = null;
	}
	const lastSeenAt = Date.now();
	observer?.starting?.();
	runOpenClawStateWriteTransaction((database) => {
		assertAgentDeletionPathFence(database, deletionFence);
		const storedPath = resolveRegisteredAgentDatabaseStoredPath(database, params);
		const db = getNodeSqliteKysely(database.db);
		executeSqliteQuerySync(database.db, db.insertInto("agent_databases").values({
			agent_id: params.agentId,
			path: storedPath,
			schema_version: params.schemaVersion ?? 24,
			last_seen_at: lastSeenAt,
			size_bytes: sizeBytes
		}).onConflict((conflict) => conflict.columns(["agent_id", "path"]).doUpdateSet({
			schema_version: params.schemaVersion ?? 24,
			last_seen_at: lastSeenAt,
			size_bytes: sizeBytes
		})));
		invalidateRegisteredAgentDatabasesMemo({ env: params.env });
		const onCommitted = observer?.committed;
		if (onCommitted) {
			const receipt = Object.freeze({
				agentId: params.agentId,
				agentPath: params.path,
				stateDatabasePath: database.path,
				stateDatabaseIdentity: requireOpenClawStateDatabaseIdentity(database).key
			});
			if (!stageSqliteTransactionState(database.db, {
				stage() {},
				rollback() {},
				commit: () => onCommitted(receipt)
			})) throw new Error("Agent registration requires its canonical transaction publication scope");
		}
		sessionChanges.emit({
			all: true,
			scope: {
				agentId: params.agentId,
				topology: true
			}
		}, database.db);
	}, { env: params.env });
	invalidateOpenClawAgentDatabaseValidation(params.path);
}
function unregisterOpenClawAgentDatabase(params) {
	runOpenClawStateWriteTransaction((database) => {
		const storedPath = resolveRegisteredAgentDatabaseStoredPath(database, params);
		const matchingPaths = [.../* @__PURE__ */ new Set([
			storedPath,
			params.path,
			path.resolve(params.path)
		])];
		const db = getNodeSqliteKysely(database.db);
		executeSqliteQuerySync(database.db, db.deleteFrom("agent_databases").where("agent_id", "=", params.agentId).where("path", "in", matchingPaths));
		invalidateRegisteredAgentDatabasesMemo({ env: params.env });
		sessionChanges.emit({
			all: true,
			scope: {
				agentId: params.agentId,
				topology: true
			}
		}, database.db);
	}, {
		env: params.env,
		initializationAgentPaths: [params.path]
	});
	invalidateOpenClawAgentDatabaseValidation(params.path);
}
/** Remove every durable database registration owned by a deleted agent. */
function unregisterOpenClawAgentDatabases(params) {
	const options = {
		env: params.env,
		...params.database ? {
			database: params.database,
			path: params.database.path
		} : {}
	};
	const removedPaths = runOpenClawStateWriteTransaction((database) => {
		const db = getNodeSqliteKysely(database.db);
		const removed = executeSqliteQuerySync(database.db, db.deleteFrom("agent_databases").where("agent_id", "=", params.agentId).returning("path"));
		invalidateRegisteredAgentDatabasesMemo(options);
		sessionChanges.emit({
			all: true,
			scope: {
				agentId: params.agentId,
				topology: true
			}
		}, database.db);
		return removed.rows.map((row) => resolveOpenClawRegisteredAgentDatabasePath(database.path, row.path));
	}, options);
	invalidateOpenClawAgentDatabaseValidationsForAgent(params.agentId, removedPaths);
}
//#endregion
export { unregisterOpenClawAgentDatabase as n, unregisterOpenClawAgentDatabases as r, registerOpenClawAgentDatabase as t };
