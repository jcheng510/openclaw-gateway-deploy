import { r as isPathInside } from "./path-guards-CH7noY0Z.mjs";
import { n as normalizeAgentId } from "./agent-id-D1-Q6vR4.mjs";
import { a as resolveSqliteDatabaseFilePaths } from "./sqlite-files-BqDG9Qm0.mjs";
import { O as isPathOwnedByAnotherRegisteredAgent, k as normalizeAgentDirRegistryPath } from "./agent-scope-config-Dm6T00l4.mjs";
import "./session-key-BC4m_Ly5.mjs";
import { i as listAgentIds } from "./agent-roster-B45JERT5.mjs";
import { c as resolveOpenClawAgentSqlitePath, s as resolveIncognitoOpenClawAgentSqlitePath } from "./openclaw-agent-db.paths-Dv3PPTNK.mjs";
import { l as resolveSessionStorePathCore } from "./paths-CQ3zRaeb.mjs";
import { n as resolveSessionStoreCompatibilityAgentId } from "./legacy.default-agent-owner-C1atgXtB.mjs";
import "./agent-scope-L_eY3Hj7.mjs";
import { a as assertNoOpenClawAgentDatabaseLeases } from "./openclaw-agent-db-lease-B-E6z2mk.mjs";
import { d as inspectOpenClawAgentDatabaseOwner, o as closeOpenClawAgentDatabaseByPathAsync } from "./openclaw-agent-db-lifecycle-CCXA1nI8.mjs";
import "./openclaw-agent-db-CZUYuo7P.mjs";
import { a as listOpenClawRegisteredAgentDatabases, i as invalidateRegisteredAgentDatabasesMemo } from "./openclaw-agent-db-registry-listing-DKcT5BJS.mjs";
import { o as resolveSqliteTargetFromSessionStorePath } from "./session-sqlite-target-YT3XOdWA.mjs";
import { t as findOverlappingWorkspaceAgentIds } from "./agent-delete-safety-B3cTCEyG.mjs";
import path from "node:path";
//#region src/agents/agent-delete-databases.ts
/** Destructive planning includes every registered owner, regardless of runtime schema readiness. */
function readAgentDeleteDatabaseRegistry(options = {}) {
	invalidateRegisteredAgentDatabasesMemo(options);
	return listOpenClawRegisteredAgentDatabases({
		...options,
		includeIncompatibleSchemaVersions: true
	});
}
var AgentSharedStoreOwnerError = class extends Error {};
/** Check before journaling: retaining the file alone would still fence its shared owner. */
function assertAgentSessionStoreDeletionSafe(cfg, agentId, options = {}) {
	if (!cfg.session?.store?.trim()) return;
	const id = normalizeAgentId(agentId);
	const defaultAgentId = resolveSessionStoreCompatibilityAgentId(cfg);
	const registeredDatabases = readAgentDeleteDatabaseRegistry(options);
	for (const survivorId of listAgentIds(cfg)) {
		if (normalizeAgentId(survivorId) === id) continue;
		const storePath = resolveSessionStorePathCore(cfg.session.store, {
			agentId: survivorId,
			env: options.env
		});
		const target = resolveSqliteTargetFromSessionStorePath(storePath, {
			agentId: survivorId,
			defaultAgentId,
			env: options.env,
			registeredDatabases
		});
		const owner = inspectOpenClawAgentDatabaseOwner(target.path);
		if (owner.status === "owned" && owner.agentId === id) throw new AgentSharedStoreOwnerError(`Agent "${id}" owns the session database still used by agent "${survivorId}" and cannot be deleted. Keep this owner configured until shared history can be moved with a supported migration; no such migration is currently available.`);
	}
}
function resolveSurvivingDatabaseFilePaths(registeredDatabases, agentId, env) {
	return [...new Set(registeredDatabases.filter((entry) => normalizeAgentId(entry.agentId) !== agentId).flatMap((entry) => resolveSqliteDatabaseFilePaths(entry.path)).map((pathname) => normalizeAgentDirRegistryPath(pathname, env)))];
}
function isPathOwnedBySurvivingAgent(cfg, agentId, pathname, survivingDatabaseFilePaths = [], env) {
	const canonicalPath = normalizeAgentDirRegistryPath(pathname, env);
	return isPathOwnedByAnotherRegisteredAgent({
		agentId,
		pathname,
		env
	}) || findOverlappingWorkspaceAgentIds(cfg, agentId, pathname, env).length > 0 || survivingDatabaseFilePaths.some((databasePath) => databasePath === canonicalPath || isPathInside(databasePath, canonicalPath) || isPathInside(canonicalPath, databasePath));
}
async function prepareAgentDeleteDatabases(cfg, agentId, agentDir, options = {}) {
	const registeredDatabases = readAgentDeleteDatabaseRegistry(options);
	const survivingDatabaseFilePaths = resolveSurvivingDatabaseFilePaths(registeredDatabases, agentId, options.env);
	const registeredDatabasePaths = /* @__PURE__ */ new Set([resolveOpenClawAgentSqlitePath({
		agentId,
		env: options.env,
		path: path.join(agentDir, "openclaw-agent.sqlite")
	}), ...registeredDatabases.filter((entry) => normalizeAgentId(entry.agentId) === agentId).map((entry) => entry.path)]);
	for (const databasePath of registeredDatabasePaths) await closeOpenClawAgentDatabaseByPathAsync(databasePath, agentId);
	await closeOpenClawAgentDatabaseByPathAsync(resolveIncognitoOpenClawAgentSqlitePath({
		agentId,
		env: options.env
	}), agentId);
	const databasePaths = [...registeredDatabasePaths].filter((pathname) => resolveSqliteDatabaseFilePaths(pathname).every((filePath) => !isPathOwnedBySurvivingAgent(cfg, agentId, filePath, survivingDatabaseFilePaths, options.env)));
	assertNoOpenClawAgentDatabaseLeases(agentId, options);
	const fileGroups = databasePaths.map(resolveSqliteDatabaseFilePaths);
	const relocatedFileGroups = fileGroups.filter((fileGroup) => {
		const relative = path.relative(agentDir, fileGroup[0] ?? agentDir);
		return relative.startsWith("..") || path.isAbsolute(relative);
	});
	return {
		registrationPaths: [...registeredDatabasePaths],
		fileGroups,
		relocatedFileGroups
	};
}
//#endregion
export { readAgentDeleteDatabaseRegistry as a, prepareAgentDeleteDatabases as i, assertAgentSessionStoreDeletionSafe as n, resolveSurvivingDatabaseFilePaths as o, isPathOwnedBySurvivingAgent as r, AgentSharedStoreOwnerError as t };
