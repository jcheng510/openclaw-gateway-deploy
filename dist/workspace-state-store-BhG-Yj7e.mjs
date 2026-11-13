import { o as resolveUserPath } from "./home-dir-CjKH62jd.mjs";
import "./utils-DUAwk2p5.mjs";
import { r as isPathInside } from "./path-guards-CH7noY0Z.mjs";
import { i as getNodeSqliteKysely, n as executeSqliteQuerySync, r as executeSqliteQueryTakeFirstSync } from "./kysely-sync-Y4_ti-rQ.mjs";
import { t as deferSqlitePostCommitPublication } from "./sqlite-post-commit-Dih1WMKX.mjs";
import { r as runSqliteDeferredTransactionSync } from "./sqlite-transaction-2VkikDo-.mjs";
import { s as resolveOpenClawStateSqlitePath } from "./openclaw-state-db.paths-rJI64Ab5.mjs";
import { n as createSqliteWorkerOperationAdmission } from "./sqlite-worker-operation-admission-BB758RIN.mjs";
import { t as executeExistingOpenClawStateRead } from "./openclaw-state-db-readonly-DE3MB0wy.mjs";
import { c as resolveWorkspaceStateIdentity, i as createWorkspaceStateIdentity, n as WorkspaceAliasRepointedError, o as resolveCanonicalWorkspacePath, s as resolveWorkspaceStateAliases } from "./workspace-state-identity-DKiOuwcn.mjs";
import { r as captureOpenClawStateWorkerContext } from "./openclaw-state-worker-context-C_iAE7YK.mjs";
import { l as runOpenClawStateWriteTransaction, r as openOpenClawStateDatabase } from "./openclaw-state-db-DM-mSY0m.mjs";
import { a as runOpenClawStateWorkerOperation } from "./openclaw-state-worker-store-DwGcGmZn.mjs";
import { t as MAX_WORKSPACE_BOOTSTRAP_FILE_BYTES } from "./workspace-bootstrap-read-B5B8MlNt.mjs";
import { a as assertCanonicalTimestamp, c as registerWorkspaceStateAliasIdentitiesInTransaction, d as resolveWorkspaceIdentityFromDatabase, f as workspacePathEntryExists, i as assertCanonicalIntegerTimestamp, n as WORKSPACE_CONTENT_RELOCATION_MIGRATION_KIND, r as WORKSPACE_LEGACY_STATE_MIGRATION_KIND, s as readWorkspaceStateSnapshotFromDatabase } from "./workspace-state-store.kernel-CyIpx4Yp.mjs";
import { existsSync } from "node:fs";
import path from "node:path";
//#region src/agents/workspace-file-cache.ts
const MAX_WORKSPACE_FILE_CACHE_BYTES = 6 * MAX_WORKSPACE_BOOTSTRAP_FILE_BYTES;
const MAX_WORKSPACE_FILE_CACHE_ENTRIES = 64;
const workspaceFileCache = /* @__PURE__ */ new Map();
let workspaceFileCacheBytes = 0;
function deleteWorkspaceFileCacheEntry(filePath) {
	const entry = workspaceFileCache.get(filePath);
	if (!entry) return;
	workspaceFileCache.delete(filePath);
	workspaceFileCacheBytes -= entry.sizeBytes;
}
function readWorkspaceFileCache(filePath, identity) {
	const entry = workspaceFileCache.get(filePath);
	if (!entry) return;
	if (entry.identity !== identity) {
		deleteWorkspaceFileCacheEntry(filePath);
		return;
	}
	workspaceFileCache.delete(filePath);
	workspaceFileCache.set(filePath, entry);
	return entry.content;
}
function writeWorkspaceFileCache(params) {
	deleteWorkspaceFileCacheEntry(params.filePath);
	const entry = {
		content: params.content,
		identity: params.identity,
		sizeBytes: Buffer.byteLength(params.content, "utf8")
	};
	workspaceFileCache.set(params.filePath, entry);
	workspaceFileCacheBytes += entry.sizeBytes;
	while (workspaceFileCache.size > MAX_WORKSPACE_FILE_CACHE_ENTRIES || workspaceFileCacheBytes > MAX_WORKSPACE_FILE_CACHE_BYTES) {
		const oldest = workspaceFileCache.keys().next().value;
		if (oldest === void 0) break;
		deleteWorkspaceFileCacheEntry(oldest);
	}
}
function retireWorkspaceFileCache(workspaceRoot) {
	const rootIdentityPath = workspaceRoot.normalize("NFC");
	for (const filePath of workspaceFileCache.keys()) if (isPathInside(rootIdentityPath, filePath.normalize("NFC"))) deleteWorkspaceFileCacheEntry(filePath);
}
//#endregion
//#region src/agents/workspace-state-store.ts
async function readWorkspaceStateSnapshot(workspaceDir, options = {}) {
	if (options.readOnly) {
		const capturedWorkspaceDir = path.resolve(resolveUserPath(workspaceDir));
		const reply = await executeExistingOpenClawStateRead(options, {
			type: "workspace.snapshot",
			workspaceDir: capturedWorkspaceDir
		});
		if (reply && (!reply.ok || reply.type !== "workspace.snapshot")) throw new Error("Unexpected workspace state snapshot result");
		return reply?.snapshot ?? {
			identity: resolveWorkspaceStateIdentity(capturedWorkspaceDir),
			setupExists: false,
			setup: { version: 1 }
		};
	}
	const database = openOpenClawStateDatabase(options);
	const initial = runSqliteDeferredTransactionSync(database.db, () => {
		const resolution = resolveWorkspaceIdentityFromDatabase({
			workspaceDir,
			database
		});
		return {
			resolution,
			snapshot: readWorkspaceStateSnapshotFromDatabase({
				identity: resolution.identity,
				database
			})
		};
	});
	if (initial.resolution.missingAliasKeys.length === 0 || !initial.snapshot.setupExists && !initial.snapshot.attestation) return initial.snapshot;
	return runOpenClawStateWriteTransaction((writeDatabase) => {
		options.assertCurrent?.();
		const currentAliases = resolveWorkspaceStateAliases(workspaceDir);
		const currentCanonicalIdentity = currentAliases.at(-1);
		if (workspacePathEntryExists(workspaceDir) && currentCanonicalIdentity.workspaceKey !== initial.resolution.identity.workspaceKey) throw new WorkspaceAliasRepointedError({
			aliasPath: currentAliases[0].workspacePath,
			storedWorkspacePath: initial.resolution.identity.workspacePath,
			currentWorkspacePath: currentCanonicalIdentity.workspacePath
		});
		const snapshot = readWorkspaceStateSnapshotFromDatabase({
			identity: initial.resolution.identity,
			database: writeDatabase
		});
		if (snapshot.setupExists || snapshot.attestation) {
			const aliases = new Map([...initial.resolution.aliases, ...currentAliases].map((alias) => [alias.workspaceKey, alias]));
			registerWorkspaceStateAliasIdentitiesInTransaction({
				database: writeDatabase,
				identity: initial.resolution.identity,
				aliases: [...aliases.values()],
				updatedAtMs: Date.now()
			});
		}
		return snapshot;
	}, options);
}
async function mergeWorkspaceSetupState(workspaceDir, next, nowMs = Date.now(), options = {}) {
	assertCanonicalIntegerTimestamp(nowMs, "setup update");
	if (next.bootstrapSeededAt) assertCanonicalTimestamp(next.bootstrapSeededAt, "bootstrap seeded");
	if (next.setupCompletedAt) assertCanonicalTimestamp(next.setupCompletedAt, "setup completed");
	return runOpenClawStateWriteTransaction((database) => {
		options.assertCurrent?.();
		const resolution = resolveWorkspaceIdentityFromDatabase({
			workspaceDir,
			database
		});
		const identity = resolution.identity;
		const snapshot = readWorkspaceStateSnapshotFromDatabase({
			identity,
			database
		});
		const bootstrapSeededAt = snapshot.setup.bootstrapSeededAt ?? next.bootstrapSeededAt;
		const setupCompletedAt = snapshot.setup.setupCompletedAt ?? next.setupCompletedAt;
		const merged = {
			version: 1,
			...bootstrapSeededAt ? { bootstrapSeededAt } : {},
			...setupCompletedAt ? { setupCompletedAt } : {}
		};
		const kysely = getNodeSqliteKysely(database.db);
		executeSqliteQuerySync(database.db, kysely.insertInto("workspace_setup_state").values({
			workspace_key: identity.workspaceKey,
			workspace_path: identity.workspacePath,
			version: 1,
			bootstrap_seeded_at: merged.bootstrapSeededAt ?? null,
			setup_completed_at: merged.setupCompletedAt ?? null,
			updated_at: nowMs
		}).onConflict((conflict) => conflict.column("workspace_key").doUpdateSet({
			workspace_path: identity.workspacePath,
			version: 1,
			bootstrap_seeded_at: merged.bootstrapSeededAt ?? null,
			setup_completed_at: merged.setupCompletedAt ?? null,
			updated_at: nowMs
		})));
		registerWorkspaceStateAliasIdentitiesInTransaction({
			database,
			identity,
			aliases: resolution.aliases,
			updatedAtMs: nowMs
		});
		return merged;
	}, options);
}
async function replaceWorkspaceAttestation(params) {
	const context = captureOpenClawStateWorkerContext();
	const { assertCurrent } = params;
	const input = {
		workspaceDir: path.resolve(resolveUserPath(params.workspaceDir)),
		attestedAtMs: params.attestedAtMs,
		generatedHashes: new Map(params.generatedHashes),
		nowMs: params.nowMs
	};
	return runOpenClawStateWorkerOperation(context, (scope) => scope.execute({
		type: "workspace.replaceAttestation",
		input
	}), {
		assertCurrent,
		createAdmission: () => ({
			nativeLocations: [context.admission.databasePath],
			admission: createSqliteWorkerOperationAdmission((request, grant) => {
				if (request.stage !== "transaction" && request.stage !== "commit") throw new Error("Workspace attestation requires transaction admission");
				context.admission.assertCurrent();
				assertCurrent?.();
				grant();
			})
		})
	});
}
function deleteWorkspaceRows(database, { workspaceKey, workspacePath }) {
	const kysely = getNodeSqliteKysely(database.db);
	const receiptRows = executeSqliteQuerySync(database.db, kysely.selectFrom("migration_sources").select([
		"source_key",
		"last_run_id",
		"report_json"
	]).where("migration_kind", "in", [WORKSPACE_LEGACY_STATE_MIGRATION_KIND, WORKSPACE_CONTENT_RELOCATION_MIGRATION_KIND])).rows.filter((row) => {
		try {
			return JSON.parse(row.report_json).workspaceKey === workspaceKey;
		} catch {
			return false;
		}
	});
	if (receiptRows.length > 0) {
		const receiptKeys = receiptRows.map((row) => row.source_key);
		executeSqliteQuerySync(database.db, kysely.deleteFrom("migration_sources").where("source_key", "in", receiptKeys));
		const runIds = [...new Set(receiptRows.map((row) => row.last_run_id))];
		const referencedRunIds = new Set(executeSqliteQuerySync(database.db, kysely.selectFrom("migration_sources").select("last_run_id").where("last_run_id", "in", runIds)).rows.map((row) => row.last_run_id));
		const orphanedRunIds = runIds.filter((runId) => !referencedRunIds.has(runId));
		if (orphanedRunIds.length > 0) executeSqliteQuerySync(database.db, kysely.deleteFrom("migration_runs").where("id", "in", orphanedRunIds));
	}
	executeSqliteQuerySync(database.db, kysely.deleteFrom("workspace_generated_bootstrap_hashes").where("workspace_key", "=", workspaceKey));
	executeSqliteQuerySync(database.db, kysely.deleteFrom("workspace_setup_state").where("workspace_key", "=", workspaceKey));
	executeSqliteQuerySync(database.db, kysely.deleteFrom("workspace_path_aliases").where("workspace_key", "=", workspaceKey));
	deferSqlitePostCommitPublication(database.db, () => retireWorkspaceFileCache(workspacePath));
}
/** The migration owner has verified the same workspace and every relocated byte before this commit. */
function retireWorkspaceRelocationAttestation(params) {
	const snapshot = readWorkspaceStateSnapshotFromDatabase(params);
	if (snapshot.setupExists || snapshot.attestation?.attestedAtMs !== params.attestedAtMs || snapshot.attestation.generatedHashes.size > 0) return false;
	executeSqliteQuerySync(params.database.db, getNodeSqliteKysely(params.database.db).updateTable("workspace_setup_state").set({
		attested_at_ms: null,
		attestation_updated_at_ms: null
	}).where("workspace_key", "=", params.identity.workspaceKey));
	return true;
}
/** Clear expired state only when no concurrent writer refreshed the vanished workspace. */
async function clearExpiredWorkspaceStateForVanishedWorkspace(workspaceDir, nowMs = Date.now(), options = {}) {
	assertCanonicalIntegerTimestamp(nowMs, "workspace expiry check");
	return runOpenClawStateWriteTransaction((database) => {
		options.assertCurrent?.();
		const resolution = resolveWorkspaceIdentityFromDatabase({
			workspaceDir,
			database
		});
		const identity = resolution.identity;
		const snapshot = readWorkspaceStateSnapshotFromDatabase({
			identity,
			database
		});
		const preserveRecentState = () => {
			registerWorkspaceStateAliasIdentitiesInTransaction({
				database,
				identity,
				aliases: resolution.aliases,
				updatedAtMs: nowMs
			});
			return false;
		};
		if (snapshot.attestation) {
			if (nowMs - snapshot.attestation.attestedAtMs <= 864e5) return preserveRecentState();
		}
		if ((snapshot.setup.bootstrapSeededAt || snapshot.setup.setupCompletedAt) && snapshot.setupUpdatedAtMs !== void 0) {
			if (nowMs - snapshot.setupUpdatedAtMs <= 864e5) return preserveRecentState();
		}
		deleteWorkspaceRows(database, identity);
		return true;
	});
}
/** Capture workspace identity before the filesystem entry is removed. */
function prepareWorkspaceStateDeletion(workspaceDir) {
	const aliases = resolveWorkspaceStateAliases(workspaceDir);
	return {
		cacheRoot: resolveCanonicalWorkspacePath(workspaceDir),
		lexicalAlias: aliases[0],
		currentCanonicalIdentity: aliases.at(-1),
		pathEntryExisted: workspacePathEntryExists(workspaceDir)
	};
}
async function deleteWorkspaceState(plan, options = {}) {
	if (!existsSync(resolveOpenClawStateSqlitePath())) {
		options.assertCurrent?.();
		retireWorkspaceFileCache(plan.cacheRoot);
		return;
	}
	runOpenClawStateWriteTransaction((database) => {
		options.assertCurrent?.();
		const { lexicalAlias, currentCanonicalIdentity } = plan;
		const kysely = getNodeSqliteKysely(database.db);
		const storedAlias = executeSqliteQueryTakeFirstSync(database.db, kysely.selectFrom("workspace_path_aliases").selectAll().where("alias_key", "=", lexicalAlias.workspaceKey));
		if (storedAlias && storedAlias.alias_path !== lexicalAlias.workspacePath) throw new Error("workspace path alias key collision");
		const storedIdentity = storedAlias ? createWorkspaceStateIdentity(storedAlias.workspace_path) : void 0;
		if (storedIdentity && storedIdentity.workspaceKey !== storedAlias?.workspace_key) throw new Error("workspace path alias target is invalid");
		if (storedIdentity && plan.pathEntryExisted && storedIdentity.workspaceKey !== currentCanonicalIdentity.workspaceKey) {
			executeSqliteQuerySync(database.db, kysely.deleteFrom("workspace_path_aliases").where("alias_key", "=", lexicalAlias.workspaceKey));
			return deleteWorkspaceRows(database, resolveWorkspaceIdentityFromDatabase({
				workspaceDir: currentCanonicalIdentity.workspacePath,
				database
			}).identity);
		}
		if (storedIdentity) return deleteWorkspaceRows(database, storedIdentity);
		return deleteWorkspaceRows(database, resolveWorkspaceIdentityFromDatabase({
			workspaceDir: currentCanonicalIdentity.workspacePath,
			database
		}).identity);
	});
}
//#endregion
export { readWorkspaceStateSnapshot as a, readWorkspaceFileCache as c, prepareWorkspaceStateDeletion as i, retireWorkspaceFileCache as l, deleteWorkspaceState as n, replaceWorkspaceAttestation as o, mergeWorkspaceSetupState as r, retireWorkspaceRelocationAttestation as s, clearExpiredWorkspaceStateForVanishedWorkspace as t, writeWorkspaceFileCache as u };
