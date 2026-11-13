import { t as clearNodeSqliteKyselyCacheForDatabase } from "./kysely-sync-cache-state-BlM1eqOk.mjs";
import { t as admitSqliteSchema } from "./sqlite-schema-facts-DwsuACBg.mjs";
import { t as openNodeSqliteDatabase } from "./node-sqlite-B4hwsR7e.mjs";
import { d as sqlitePrimaryResultCode } from "./sqlite-error-diagnostics-XVtvbiXE.mjs";
import { t as readExistingAgentSchemaMeta } from "./openclaw-agent-db-metadata-DQ2t48et.mjs";
import { s as OPENCLAW_SQLITE_BUSY_TIMEOUT_MS } from "./openclaw-state-db-contract-CQDemVBb.mjs";
import { a as registerOpenClawAgentDatabaseIdentity, c as recordOpenClawAgentDatabaseReadOpenFailure, o as classifyOpenClawAgentDatabaseReadError } from "./openclaw-agent-db-identity-ChZ28OhF.mjs";
import { n as normalizeAgentId } from "./agent-id-D1-Q6vR4.mjs";
import { c as resolveOpenClawAgentSqlitePath, i as isIncognitoOpenClawAgentSqlitePath } from "./openclaw-agent-db.paths-Dv3PPTNK.mjs";
import { n as assertExistingAgentSchemaOwner, r as assertSupportedAgentSchemaVersion, t as assertCanonicalAgentPersistenceVersion } from "./openclaw-agent-db-schema-read-9PMvdeBr.mjs";
import fs from "node:fs";
//#region src/state/openclaw-agent-db-readonly-open.ts
function readOpenClawAgentDatabase(database, operation) {
	try {
		return {
			found: true,
			value: operation(database)
		};
	} catch (error) {
		throw sqlitePrimaryResultCode(error) === 1 ? classifyOpenClawAgentDatabaseReadError(database.db, error) : error;
	}
}
/** Recheck committed admission facts before using an existing read-only connection. */
function hasOpenClawAgentReadOnlySchema(database) {
	const userVersion = assertSupportedAgentSchemaVersion(database.db, database.path);
	assertCanonicalAgentPersistenceVersion(database.db, database.path, userVersion);
	const schemaMeta = readExistingAgentSchemaMeta(database.db);
	if (!schemaMeta) return false;
	assertExistingAgentSchemaOwner(schemaMeta, database.agentId, database.path);
	return true;
}
/** Fresh-only callers do not need the writable runtime's process-held connection cache. */
function withFreshOpenClawAgentDatabaseReadOnly(operation, options, behavior = {}) {
	const opened = openOpenClawAgentDatabaseReadOnly(options, behavior);
	if (!opened.found) return opened;
	try {
		return readOpenClawAgentDatabase(opened.database, operation);
	} finally {
		opened.database.close();
	}
}
/** Open one existing agent database without creating, registering, migrating, or adopting it. */
function openOpenClawAgentDatabaseReadOnly(options, behavior = {}) {
	const agentId = normalizeAgentId(options.agentId);
	const pathname = resolveOpenClawAgentSqlitePath({
		...options,
		agentId
	});
	if (isIncognitoOpenClawAgentSqlitePath(pathname, {
		agentId,
		env: options.env
	})) return {
		found: false,
		reason: "database-missing"
	};
	if (!fs.existsSync(pathname)) return {
		found: false,
		reason: "database-missing"
	};
	let db;
	try {
		db = openNodeSqliteDatabase(pathname, {
			readOnly: true,
			timeout: OPENCLAW_SQLITE_BUSY_TIMEOUT_MS,
			...behavior.allowExtension ? { allowExtension: true } : {}
		});
	} catch (error) {
		recordOpenClawAgentDatabaseReadOpenFailure(error);
		throw error;
	}
	let closed = false;
	const close = () => {
		if (closed) return;
		clearNodeSqliteKyselyCacheForDatabase(db);
		if (db.isOpen) db.close();
		closed = true;
	};
	try {
		registerOpenClawAgentDatabaseIdentity(db);
		const database = {
			agentId,
			db,
			path: pathname,
			close
		};
		if (!hasOpenClawAgentReadOnlySchema(database)) {
			close();
			return {
				found: false,
				reason: "schema-missing"
			};
		}
		admitSqliteSchema(db);
		return {
			found: true,
			database
		};
	} catch (error) {
		close();
		recordOpenClawAgentDatabaseReadOpenFailure(error);
		throw error;
	}
}
//#endregion
export { withFreshOpenClawAgentDatabaseReadOnly as i, openOpenClawAgentDatabaseReadOnly as n, readOpenClawAgentDatabase as r, hasOpenClawAgentReadOnlySchema as t };
