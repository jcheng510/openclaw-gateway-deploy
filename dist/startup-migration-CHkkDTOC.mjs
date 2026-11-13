import { r as resolveStateDir } from "./state-dir-CfAW6S2K.mjs";
import "./paths-CtO6iw0c.mjs";
import { t as formatCliCommand } from "./command-format-Cte1SWM4.mjs";
import { i as getNodeSqliteKysely, r as executeSqliteQueryTakeFirstSync } from "./kysely-sync-Y4_ti-rQ.mjs";
import { n as StartupMaintenanceRequiredError } from "./startup-maintenance-required-CNRZ_k46.mjs";
import { n as formatDoctorStateRepairFailure } from "./state-repair-message-B5Bu99oR.mjs";
import "./openclaw-agent-db-identity-ChZ28OhF.mjs";
import { r as cloneEnvWithPlatformSemantics } from "./config-env-vars-C__rW8Th.mjs";
import { i as normalizeMainKey } from "./session-key-DDIJxXfQ.mjs";
import "./session-key-BC4m_Ly5.mjs";
import { c as resolveOpenClawAgentSqlitePath } from "./openclaw-agent-db.paths-Dv3PPTNK.mjs";
import { t as runTasksWithConcurrency } from "./run-with-concurrency-Dtu208ef.mjs";
import { h as readAgentDatabaseAdmissionRefusal } from "./agent-database-admission-CLYAvaL3.mjs";
import { a as readAgentDeletionJournalStatusInWorker, n as prepareAgentDatabaseDeletionSnapshotRead, r as readAgentDatabaseDeletionSnapshot } from "./agent-deletion-journal.read-BnCyzoNE.mjs";
import { o as closeOpenClawAgentDatabaseByPathAsync } from "./openclaw-agent-db-lifecycle-CCXA1nI8.mjs";
import { p as withOpenClawAgentDatabaseAsync, s as isOpenClawAgentDatabaseOpen } from "./openclaw-agent-db-CZUYuo7P.mjs";
import { a as listOpenClawRegisteredAgentDatabases } from "./openclaw-agent-db-registry-listing-DKcT5BJS.mjs";
import "./openclaw-agent-db-registry-DqXgJmeH.mjs";
import { n as withOpenClawAgentDatabaseReadOnly } from "./openclaw-agent-db-readonly-CkWWSfuG.mjs";
import { o as resolveSqliteTargetFromSessionStorePath } from "./session-sqlite-target-YT3XOdWA.mjs";
import { _ as toDatabaseOptions, c as resolveSqliteReadScope } from "./session-accessor.sqlite-scope-AxUEwRt8.mjs";
import { p as setCanonicalSqliteSessionMainKey } from "./session-canonical-key-Cjd4Pn_g.mjs";
import { a as resolveAllAgentSessionStoreTargetsSync, l as resolveSessionStoreTargets, s as resolveConfiguredAgentDatabaseTargets } from "./targets-CxfGP2B4.mjs";
import "./openclaw-database-preflight-agent-scheduler-DLxojnRp.mjs";
import { r as createRetainedAgentDatabaseMatcherFromSnapshot, t as createAgentDatabaseDeletionClassifier } from "./agent-deletion-discovery-ICWhA3Rx.mjs";
import { t as migrateLegacyMainSessionKeys } from "./legacy-main-session-migration-Cufa3-TO.mjs";
import { c as listLegacySessionTranscriptFiles, d as shouldFilterLegacySessionRecordsByTarget, l as readLegacySessionStoreEntries, s as isLegacySessionRecordOwnedByTarget } from "./session-sqlite-transcript-verification-GoHiXlAU.mjs";
import { s as readDeferredPluginSessionImport } from "./deferred-plugin-session-sources-BBVrP7sh.mjs";
import fs from "node:fs";
import path from "node:path";
//#region src/config/sessions/migration-required.ts
/** Legacy history requires an explicit Doctor import, never automatic failure triage. */
var SessionStoreMigrationRequiredError = class extends StartupMaintenanceRequiredError {
	constructor(message) {
		super("legacy-session-store", message);
		this.name = "SessionStoreMigrationRequiredError";
	}
};
//#endregion
//#region src/config/sessions/session-canonical-key-read.ts
/** Checks the startup contract without joining the writable database lifecycle. */
function isCanonicalSqliteSessionMainKeyCurrent(options, mainKey) {
	const canonicalMainKey = normalizeMainKey(mainKey);
	const result = withOpenClawAgentDatabaseReadOnly((database) => {
		const db = getNodeSqliteKysely(database.db);
		if (executeSqliteQueryTakeFirstSync(database.db, db.selectFrom("schema_meta").select("schema_version").where("meta_key", "=", "primary"))?.schema_version !== 24) return false;
		return executeSqliteQueryTakeFirstSync(database.db, db.selectFrom("session_key_contract").select("main_key").where("id", "=", 1))?.main_key === canonicalMainKey;
	}, options);
	return result.found && result.value;
}
//#endregion
//#region src/config/sessions/startup-migration.ts
function assertSessionStoreMigrationComplete(params) {
	const env = params.env ?? process.env;
	const readOptions = {
		env,
		registeredDatabases: params.registeredDatabases
	};
	const targets = (params.targets ?? resolveAllAgentSessionStoreTargetsSync(params.cfg, readOptions)).filter((target) => !target.agentId || !readAgentDatabaseAdmissionRefusal(target.agentId, { env }));
	const legacyRootStore = path.join(resolveStateDir(env), "sessions", "sessions.json");
	const legacyTargets = fs.existsSync(legacyRootStore) ? resolveSessionStoreTargets(params.cfg, { allAgents: true }, readOptions).map((target) => ({
		agentId: target.agentId,
		sqlitePath: resolveSqliteTargetFromSessionStorePath(target.storePath, {
			agentId: target.agentId,
			...readOptions
		}).path,
		storePath: legacyRootStore
	})) : [];
	const sources = [...legacyTargets.length > 0 ? legacyTargets : [{ storePath: legacyRootStore }], ...targets];
	const sourcesByPath = /* @__PURE__ */ new Map();
	for (const target of sources) {
		const sourcePath = path.resolve(target.storePath);
		sourcesByPath.set(sourcePath, [...sourcesByPath.get(sourcePath) ?? [], target]);
	}
	const legacySources = [...sourcesByPath].filter(([storePath]) => !storePath.endsWith(".sqlite") && fs.existsSync(storePath));
	if (legacySources.length === 0) return;
	const deletionSnapshot = readAgentDatabaseDeletionSnapshot(env, params.operation === "doctor" ? "maintenance" : "runtime");
	const classifyDeletion = deletionSnapshot && createAgentDatabaseDeletionClassifier({
		env,
		retainedDeletions: deletionSnapshot.retainedDeletions,
		registeredAgentDatabases: deletionSnapshot.registeredAgentDatabases,
		configuredAgentDatabaseTargets: resolveConfiguredAgentDatabaseTargets(params.cfg, readOptions)
	});
	const legacyStore = legacySources.find(([storePath, candidates]) => {
		const owners = /* @__PURE__ */ new Map();
		for (const target of candidates) {
			if (!target.agentId) return true;
			const destination = target.sqlitePath ?? resolveSqliteTargetFromSessionStorePath(target.storePath, {
				agentId: target.agentId,
				...readOptions
			}).path;
			const deletion = classifyDeletion?.(storePath, target.agentId) ?? classifyDeletion?.(destination, target.agentId);
			const retained = deletion !== void 0 && deletion !== "unavailable";
			owners.set(`${target.agentId}\0${destination}`, {
				target: {
					...target,
					agentId: target.agentId
				},
				destination,
				retained,
				imported: !retained && readDeferredPluginSessionImport({
					cfg: params.cfg,
					target: {
						...target,
						agentId: target.agentId
					},
					sqlitePath: destination,
					env,
					purpose: "readiness"
				}) !== void 0
			});
		}
		if ([...owners.values()].every(({ target, retained, imported }) => (imported || retained) && !shouldFilterLegacySessionRecordsByTarget(target))) return false;
		const issues = [];
		const source = readLegacySessionStoreEntries({ storePath }, issues);
		if (issues.some((issue) => issue.code !== "entry_invalid") || !source.bytes) return [...owners.values()].some(({ imported, retained }) => !imported && !retained);
		const required = new Set(source.entries.length === 0 ? owners.values() : []);
		for (const sessionKey of [...source.entries.map((entry) => entry.sessionKey), ...issues.flatMap((issue) => issue.sessionKey ? [issue.sessionKey] : [])]) {
			const matches = [...owners.values()].filter(({ target }) => !shouldFilterLegacySessionRecordsByTarget(target) || isLegacySessionRecordOwnedByTarget(params.cfg, target, sessionKey));
			if (matches.length !== 1) return true;
			required.add(matches[0]);
		}
		let hasUnindexedHistory;
		return [...required].some(({ target, destination, retained, imported }) => {
			if (imported || retained && (source.entries.length > 0 || !shouldFilterLegacySessionRecordsByTarget(target))) return false;
			if (source.entries.length === 0 && !fs.existsSync(destination)) {
				hasUnindexedHistory ??= listLegacySessionTranscriptFiles(path.dirname(storePath)).length > 0;
				if (!hasUnindexedHistory) return false;
			}
			return true;
		});
	})?.[0];
	if (legacyStore) throw new SessionStoreMigrationRequiredError(params.operation === "doctor" ? formatDoctorStateRepairFailure(`Legacy session store requires migration at ${legacyStore}`, "Repair the retained source using the migration report's named file and validation error, preserving the original history.") : `Legacy session store requires migration: ${legacyStore}. Run "${formatCliCommand("openclaw doctor --fix", env)}" against the same state/config before starting OpenClaw.`);
}
/** Maintains existing stores, optionally handing each live database to its runtime owner. */
async function runSessionStartupMigration(params) {
	params.assertCurrent?.();
	const env = cloneEnvWithPlatformSemantics(params.env ?? process.env);
	const deletionRead = prepareAgentDatabaseDeletionSnapshotRead({ env }, "runtime");
	const resolveTargets = params.deps?.resolveAllAgentSessionStoreTargetsSync ?? resolveAllAgentSessionStoreTargetsSync;
	const admittedTargets = () => resolveTargets(params.cfg, { env }).filter((target) => (!params.agentIds || params.agentIds.has(target.agentId)) && !readAgentDatabaseAdmissionRefusal(target.agentId, { env }));
	const targets = admittedTargets();
	assertSessionStoreMigrationComplete({
		cfg: params.cfg,
		env,
		targets
	});
	const result = await (params.deps?.migrateLegacyMainSessionKeys ?? migrateLegacyMainSessionKeys)({
		cfg: params.cfg,
		env,
		mode: "detect"
	});
	params.assertCurrent?.();
	if (result.warnings.length > 0) params.log.warn(`session: retired main-agent session migration warnings:\n${result.warnings.map((warning) => `- ${warning}`).join("\n")}`);
	const databases = /* @__PURE__ */ new Set();
	const registeredDatabases = new Set(listOpenClawRegisteredAgentDatabases({ env }).map((entry) => `${entry.agentId}\0${entry.path}`));
	const tasks = targets.map((target) => async () => {
		params.assertCurrent?.();
		const options = toDatabaseOptions(resolveSqliteReadScope({
			...target,
			env
		}));
		const databasePath = resolveOpenClawAgentSqlitePath(options);
		if (databases.has(databasePath) || !fs.existsSync(databasePath)) return;
		databases.add(databasePath);
		const runUnlessDeleted = (operation) => deletionRead.withCurrentSnapshot((snapshot) => {
			params.assertCurrent?.();
			if (typeof createRetainedAgentDatabaseMatcherFromSnapshot(env, () => resolveConfiguredAgentDatabaseTargets(params.cfg, {
				env,
				registeredDatabases: (snapshot?.registeredAgentDatabases ?? []).filter((entry) => entry.schemaVersion === 24)
			}), snapshot, "database", "runtime")(databasePath, options.agentId) !== "object") return operation().then(() => true);
			params.log.info(`session: skipping deleted agent database for ${options.agentId} at ${databasePath} (cleanup complete); run "${formatCliCommand("openclaw doctor --fix", env)}" for explicit restoration guidance`);
			return false;
		});
		const deletion = await readAgentDeletionJournalStatusInWorker(options.agentId, { env });
		params.assertCurrent?.();
		if (deletion !== "absent") {
			params.log.info(`session: skipping deleted agent database for ${options.agentId} (${deletion === "complete" ? "cleanup complete" : "cleanup pending; retry agent deletion"})`);
			return;
		}
		let alreadyOpen;
		let handedOff = false;
		try {
			if (!await runUnlessDeleted(async () => {
				alreadyOpen = isOpenClawAgentDatabaseOpen(databasePath);
				try {
					const mainKey = params.cfg.session?.mainKey;
					if (!registeredDatabases.has(`${options.agentId}\0${databasePath}`) || !isCanonicalSqliteSessionMainKeyCurrent(options, mainKey)) await withOpenClawAgentDatabaseAsync(options, (database) => setCanonicalSqliteSessionMainKey(database, mainKey), params.assertCurrent);
				} catch (error) {
					params.assertCurrent?.();
					params.log.warn(`session: SQLite startup maintenance failed for ${target.agentId}; continuing: ${String(error)}`);
				}
			})) return;
			const { certifySessionCanonicalValidationPending } = await import("./session-canonical-validation-readiness-DEmudEsl.mjs");
			const { withSqliteCanonicalValidationWorker } = await import("./session-accessor.sqlite-reclamation-worker-C8Bghdac.mjs");
			params.assertCurrent?.();
			if (!await runUnlessDeleted(() => withSqliteCanonicalValidationWorker((withWorker) => certifySessionCanonicalValidationPending(options, withWorker, params.assertCurrent)))) return;
			params.assertCurrent?.();
			const handoffDatabase = params.handoffDatabase;
			if (handoffDatabase) await runUnlessDeleted(async () => {
				await handoffDatabase(options);
				params.assertCurrent?.();
				handedOff = true;
			});
		} finally {
			if (alreadyOpen === false && !handedOff) await closeOpenClawAgentDatabaseByPathAsync(databasePath);
		}
	});
	const { withSqliteCanonicalValidationWorkerPool } = await import("./session-accessor.sqlite-canonical-worker-pool-CRygqPGc.mjs");
	await withSqliteCanonicalValidationWorkerPool(env, async () => {
		const { hasError, firstError } = await runTasksWithConcurrency({
			tasks,
			limit: 2,
			errorMode: "stop"
		});
		if (hasError) throw firstError;
	});
	params.assertCurrent?.();
}
//#endregion
export { runSessionStartupMigration as n, assertSessionStoreMigrationComplete as t };
