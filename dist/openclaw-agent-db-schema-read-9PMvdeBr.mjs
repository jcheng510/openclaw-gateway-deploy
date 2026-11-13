import { n as getAdmittedSqliteSchemaFacts } from "./sqlite-schema-facts-DwsuACBg.mjs";
import { t as SqliteSchemaMismatchError } from "./sqlite-schema-issues-Cd5MmsG2.mjs";
import { t as readExistingAgentSchemaMeta } from "./openclaw-agent-db-metadata-DQ2t48et.mjs";
import { a as readSqliteUserVersion, n as createNewerSqliteSchemaVersionError } from "./sqlite-user-version-BLp_KV8U.mjs";
import "./openclaw-agent-db-identity-ChZ28OhF.mjs";
import { n as normalizeAgentId } from "./agent-id-D1-Q6vR4.mjs";
import { t as OpenClawAgentDatabaseMediaMigrationRequiredError } from "./openclaw-agent-db-migration-required-Dca0twmF.mjs";
//#region src/state/openclaw-agent-db-schema-read.ts
function assertSupportedAgentSchemaVersion(db, pathname) {
	const userVersion = getAdmittedSqliteSchemaFacts(db)?.userVersion ?? readSqliteUserVersion(db);
	if (userVersion > 24) throw createNewerSqliteSchemaVersionError("OpenClaw agent database", pathname, userVersion, 24);
	return userVersion;
}
/** Readers may pass their immediate check; writers reread the version after integrity work. */
function assertCanonicalAgentPersistenceVersion(db, pathname, userVersion = getAdmittedSqliteSchemaFacts(db)?.userVersion ?? readSqliteUserVersion(db)) {
	const hasApplicationSchema = userVersion === 0 && db.prepare("SELECT 1 FROM sqlite_master WHERE substr(name, 1, 7) <> 'sqlite_' LIMIT 1").get();
	const isNewUnownedDatabase = userVersion === 0 && readExistingAgentSchemaMeta(db) === null && !hasApplicationSchema;
	if (userVersion < 17 && !isNewUnownedDatabase) throw new OpenClawAgentDatabaseMediaMigrationRequiredError(pathname, userVersion);
	if (userVersion < 24 && !isNewUnownedDatabase) throw new SqliteSchemaMismatchError(`OpenClaw agent database ${pathname} uses schema version ${userVersion}; stop active agents and run openclaw doctor --fix to migrate session identities before using it.`);
}
function assertExistingAgentSchemaOwner(existing, agentId, pathname) {
	if (!existing) return;
	if (existing.role !== "agent") throw new SqliteSchemaMismatchError(`OpenClaw agent database ${pathname} has schema role ${existing.role ?? "unknown"}; expected agent. Run openclaw doctor --fix to inspect and repair its ownership.`);
	if (!existing.agentId) throw new SqliteSchemaMismatchError(`OpenClaw agent database ${pathname} has no agent owner. Run openclaw doctor --fix to inspect and repair its ownership.`);
	if (normalizeAgentId(existing.agentId) !== agentId) throw new SqliteSchemaMismatchError(`OpenClaw agent database ${pathname} belongs to agent ${existing.agentId}; requested agent ${agentId}.`);
}
//#endregion
export { assertExistingAgentSchemaOwner as n, assertSupportedAgentSchemaVersion as r, assertCanonicalAgentPersistenceVersion as t };
