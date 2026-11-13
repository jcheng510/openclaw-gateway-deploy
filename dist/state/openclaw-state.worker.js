import { r as createLazyRuntimeModule } from "../lazy-runtime-CJrzFzqU.mjs";
import { t as assertNoActiveSqliteReaders } from "../sqlite-reader-lifecycle-B0eu7rNH.mjs";
import { t as assertExistingDatabaseIdentity } from "../sqlite-worker-identity-Dggu-rKK.mjs";
import { t as assertTransactionUsable } from "../sqlite-transaction-2VkikDo-.mjs";
import { D as assertOpenClawStateDatabaseOwner } from "../openclaw-state-db-read-connection-DJObJIAO.mjs";
import { b as retainOpenClawStateDatabase, f as openClawStateDatabaseCache } from "../openclaw-state-db-cache-IAib4pqp.mjs";
import { i as requestSqliteWorkerOperationAdmission, m as SQLITE_WORKER_PREPARE_COMMAND } from "../sqlite-worker-operation-admission-BB758RIN.mjs";
import { o as withSqliteWorkerExistingDatabase, r as getSqliteWorkerStateContext } from "../sqlite-worker-state-context-KkU943i2.mjs";
import { r as openOpenClawStateDatabase } from "../openclaw-state-db-DM-mSY0m.mjs";
import { n as readPluginMetadataStateRowSync } from "../installed-plugin-index-row-BVgMZ3sG.mjs";
import { n as pluginStateWorkerOperations, t as isPluginStateWorkerCommand } from "../plugin-state-worker-contract-jJNqV2rs.mjs";
import { n as loadDeviceIdentityIfPresent, r as loadOrCreateDeviceIdentity } from "../device-identity-CkZMmlTW.mjs";
import { i as executeOpenClawStateLeaseCommand, t as acquireOpenClawStateLeaseInWorker } from "../openclaw-state-lease-worker-CDPqrA5D.mjs";
//#region src/state/openclaw-state.worker.ts
const loadAgentCleanup = createLazyRuntimeModule(() => import("../openclaw-agent-execution-cleanup.worker-CcSnNl1k.mjs"));
let agentCleanup;
const loadPluginState = createLazyRuntimeModule(() => import("../plugin-state.worker-DtZxTqOi.mjs"));
let pluginState;
const loadCapture = createLazyRuntimeModule(() => import("../store.worker-CR1dLB9u.mjs"));
let capture;
const loadRuntime = createLazyRuntimeModule(() => import("../openclaw-state-worker-runtime-CckKB9al.mjs"));
let runtime;
function stateDatabaseInitializationEnvironment() {
	const context = getSqliteWorkerStateContext();
	return context.initializationEnvironment ?? context.environment;
}
function createSqliteWorkerBackend(_input, context) {
	if (context.preparation?.type === "deviceIdentity") loadOrCreateDeviceIdentity({
		path: context.databasePath,
		env: stateDatabaseInitializationEnvironment(),
		identityKey: context.preparation.identityKey
	});
	return createSharedStateWorkerBackend(context, openOpenClawStateDatabase({
		path: context.databasePath,
		env: stateDatabaseInitializationEnvironment(),
		initializationAgentPaths: getSqliteWorkerStateContext().initializationAgentPaths
	}));
}
function openExistingSqliteWorkerBackend(_input, context) {
	const identity = context.existingIdentity;
	assertExistingDatabaseIdentity(context.databasePath, identity);
	const backend = createSharedStateWorkerBackend(context, void 0, identity);
	return {
		...backend,
		execute(command) {
			return withSqliteWorkerExistingDatabase(context.databasePath, identity, () => backend.execute(command));
		}
	};
}
function createSharedStateWorkerBackend(context, initialDatabase, existingIdentity) {
	let nativeDatabase = initialDatabase;
	let borrow = nativeDatabase ? retainOpenClawStateDatabase(nativeDatabase) : void 0;
	let closed = false;
	const open = () => {
		if (!nativeDatabase) {
			const opened = openOpenClawStateDatabase({
				path: context.databasePath,
				env: stateDatabaseInitializationEnvironment(),
				initializationAgentPaths: getSqliteWorkerStateContext().initializationAgentPaths
			});
			borrow = retainOpenClawStateDatabase(opened);
			nativeDatabase = opened;
		}
		if (!nativeDatabase.db.isOpen || openClawStateDatabaseCache.getCachedOpenClawStateDatabase(nativeDatabase.path) !== nativeDatabase) throw new Error("Shared-state worker lost its retained native database");
		return openOpenClawStateDatabase({
			database: nativeDatabase,
			path: context.databasePath,
			env: getSqliteWorkerStateContext().environment
		});
	};
	return {
		[SQLITE_WORKER_PREPARE_COMMAND](commandType) {
			if (commandType.startsWith("capture.")) {
				if (capture) return;
				return loadCapture().then((loaded) => {
					capture = loaded;
				});
			}
			if (commandType === "agentDatabases.releaseExitedLease") {
				if (agentCleanup) return;
				return loadAgentCleanup().then((loaded) => {
					agentCleanup = loaded;
				});
			}
			if (Object.hasOwn(pluginStateWorkerOperations, commandType)) {
				if (pluginState) return;
				return loadPluginState().then((loaded) => {
					pluginState = loaded;
				});
			}
			if (commandType === "plugins.metadata.read" || commandType === "database.inspectIdle" || commandType === "database.walMaintenance" || commandType === "stateLease.acquire" || commandType === "deviceIdentity.read" || commandType === "deviceIdentity.load" || commandType === "stateLease.verify" || commandType === "stateLease.renew" || commandType === "stateLease.release") return;
			if (runtime) return runtime.prepareSharedStateCommand(commandType);
			return loadRuntime().then((loaded) => {
				runtime = loaded;
				return runtime.prepareSharedStateCommand(commandType);
			});
		},
		execute(command) {
			if (closed) throw new Error("Shared-state worker is closed");
			if (command.type === "capture.upsertSession" || command.type === "capture.endSession" || command.type === "capture.persistPayload" || command.type === "capture.recordEvent" || command.type === "capture.recordEventWithPayload" || command.type === "capture.listSessions" || command.type === "capture.getSessionEvents" || command.type === "capture.summarizeSessionCoverage" || command.type === "capture.readBlob" || command.type === "capture.queryPreset" || command.type === "capture.deleteSessions" || command.type === "capture.purgeAll") {
				if (!capture) throw new Error("Capture worker command runtime is not prepared");
				return capture.executeCaptureCommand(command, open());
			}
			if (command.type === "deviceIdentity.read") return loadDeviceIdentityIfPresent({
				path: context.databasePath,
				identityKey: command.input.identityKey,
				env: getSqliteWorkerStateContext().environment
			});
			if (command.type === "deviceIdentity.load") try {
				return loadOrCreateDeviceIdentity({
					path: context.databasePath,
					identityKey: command.input.identityKey,
					env: stateDatabaseInitializationEnvironment()
				});
			} finally {
				const database = openClawStateDatabaseCache.getCachedOpenClawStateDatabase(context.databasePath);
				if (!nativeDatabase && database) {
					borrow = retainOpenClawStateDatabase(database);
					nativeDatabase = database;
				}
			}
			if (command.type === "agentDatabases.releaseExitedLease") {
				if (!agentCleanup) throw new Error("Agent database cleanup runtime is not prepared");
				return agentCleanup.executeAgentDatabaseCleanupCommand(command, open(), getSqliteWorkerStateContext().environment);
			}
			if (command.type === "stateLease.acquire") {
				if (command.input.schemaPolicy === "existing" && existingIdentity) assertExistingDatabaseIdentity(context.databasePath, existingIdentity);
				return acquireOpenClawStateLeaseInWorker(command.input, context.databasePath, open);
			}
			if (command.type === "stateLease.verify" || command.type === "stateLease.renew" || command.type === "stateLease.release") return executeOpenClawStateLeaseCommand(command, open());
			if (command.type === "plugins.metadata.read") return readPluginMetadataStateRowSync(command.input.selector, {
				path: context.databasePath,
				env: getSqliteWorkerStateContext().environment
			}, command.input.artifactPreservingReadOnly);
			if (command.type === "database.walMaintenance") return open().walMaintenance.maintainPeriodic?.(command.input, (stage) => {
				requestSqliteWorkerOperationAdmission({
					stage,
					facts: void 0
				});
			}) ?? { reclaimedPages: 0 };
			if (command.type === "database.inspectIdle") {
				if (!nativeDatabase?.db.isOpen || openClawStateDatabaseCache.getCachedOpenClawStateDatabase(nativeDatabase.path) !== nativeDatabase) return "retire";
				assertOpenClawStateDatabaseOwner(nativeDatabase.db, { pathname: nativeDatabase.path });
				return nativeDatabase.walMaintenance.inspectIdle?.() ?? "retire";
			}
			if (isPluginStateWorkerCommand(command)) {
				if (!pluginState) throw new Error("Plugin-state worker command runtime is not prepared");
				return pluginState.executePluginStateCommand(command, {
					path: context.databasePath,
					env: getSqliteWorkerStateContext().environment
				}, open, nativeDatabase?.db.isOpen === true);
			}
			if (!runtime) throw new Error("Shared-state worker command runtime is not prepared");
			return runtime.executeSharedStateCommand(command, context, open);
		},
		assertSettled() {
			if (nativeDatabase) {
				assertTransactionUsable(nativeDatabase.db);
				if (nativeDatabase.db.isOpen && nativeDatabase.db.isTransaction) throw new Error("Shared-state worker retained an unsettled transaction");
				if (nativeDatabase.db.isOpen) assertNoActiveSqliteReaders(nativeDatabase.db, "Shared-state worker");
			}
		},
		close() {
			closed = true;
			borrow?.release();
		}
	};
}
//#endregion
export { createSqliteWorkerBackend, openExistingSqliteWorkerBackend };
