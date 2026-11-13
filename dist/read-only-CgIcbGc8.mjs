import { t as createDeferredCore } from "./deferred-D0La5CRk.mjs";
import { t as ensureSqliteLibrarySelected } from "./bun-sqlite-library-gIY4lQaO.mjs";
import { n as createSqliteSnapshotStagingDirectory } from "./sqlite-snapshot-staging-C3ICAs3m.mjs";
import { c as removeTempDirectoryAsync, l as retainSnapshotTempDirectory, u as retainSnapshotWork } from "./sqlite-readonly-location-cleanup-HvAn98XM.mjs";
import { o as getOpenClawDatabaseMaintenanceScope } from "./openclaw-state-db-async-lifecycle-D4cx8OBO.mjs";
import { s as resolveOpenClawStateSqlitePath } from "./openclaw-state-db.paths-rJI64Ab5.mjs";
import { _ as registerOpenClawStateDatabaseAsyncResource, n as captureOpenClawStateDatabaseReadAdmission } from "./openclaw-state-db-cache-IAib4pqp.mjs";
import { r as isArtifactPreservingStateRead } from "./openclaw-state-db-readonly-DE3MB0wy.mjs";
import { t as resolveRuntimeProcessEntrypointUrl } from "./runtime-process-url-Dp0Sw2Fd.mjs";
import { t as WorkerTaskPool } from "./worker-task-pool-Cl1KhdJb.mjs";
import { t as restoreCronLoadError } from "./load-error-Hk_r_XY_.mjs";
import { t as cronStoreKey } from "./key-BBZ40bDq.mjs";
import fs from "node:fs";
//#region src/cron/store/read-only.ts
function emptyLoadedCronStore() {
	return {
		store: {
			version: 1,
			jobs: []
		},
		configJobs: [],
		configJobIndexes: [],
		configJobRuntimeEntries: [],
		invalidConfigRows: []
	};
}
/** Loads cron jobs from existing SQLite state without creating or migrating it. */
async function loadCronJobsStoreWithConfigJobsReadOnly(storePath, env = process.env) {
	return (await readCronState({
		storeKey: cronStoreKey(storePath),
		env
	})).loaded ?? emptyLoadedCronStore();
}
/** Doctor inventory includes raw definitions in every persisted partition. */
async function inspectCronJobsReadOnly(env) {
	return (await readCronState({ env })).inventory ?? [];
}
async function readCronState({ storeKey, env, history }) {
	const statePath = resolveOpenClawStateSqlitePath(env);
	if (!fs.existsSync(statePath)) return { ok: true };
	const preserveArtifacts = storeKey === void 0 || isArtifactPreservingStateRead();
	const admission = captureOpenClawStateDatabaseReadAdmission(statePath);
	const identity = admission.identity;
	const canonicalPath = identity.canonicalPath;
	const maintenance = getOpenClawDatabaseMaintenanceScope();
	ensureSqliteLibrarySelected();
	const environment = { ...process.env };
	const environmentBytes = Object.entries(environment).reduce((bytes, [key, value]) => bytes + Buffer.byteLength(key) + Buffer.byteLength(value ?? ""), 0);
	const pool = new WorkerTaskPool({
		workerUrl: resolveRuntimeProcessEntrypointUrl("cronReadOnly"),
		workerOptions: { env: environment },
		maxWorkers: 1,
		sharedCompute: true
	});
	const controller = new AbortController();
	const producerSettled = createDeferredCore();
	let stagingRoot;
	let releaseSnapshot;
	let workerStopped = false;
	let cleaned = false;
	let cleanupPending;
	const cleanup = () => {
		if (cleaned) return Promise.resolve();
		return cleanupPending ??= (async () => {
			if (!workerStopped) {
				await pool.close();
				workerStopped = true;
			}
			await producerSettled.promise;
			releaseSnapshot?.();
			releaseSnapshot = void 0;
			if (stagingRoot) {
				if (!await removeTempDirectoryAsync(stagingRoot)) throw new Error("Cron read-only state snapshot cleanup failed.");
				stagingRoot = void 0;
			}
			cleaned = true;
			unregister();
		})().finally(() => {
			cleanupPending = void 0;
		});
	};
	const resource = { async close(target) {
		if (!target || target.key === identity?.key || target.canonicalPath === canonicalPath) {
			controller.abort(/* @__PURE__ */ new Error("Cron read-only load closed"));
			await cleanup();
		}
	} };
	const unregister = registerOpenClawStateDatabaseAsyncResource(resource);
	const run = async () => {
		let loaded = { ok: true };
		try {
			maintenance?.own(resource, "shared-resources", () => resource.close());
			if (preserveArtifacts) {
				stagingRoot = await createSqliteSnapshotStagingDirectory(void 0, false, controller.signal, true);
				releaseSnapshot = retainSnapshotTempDirectory(stagingRoot);
			}
			const location = statePath;
			controller.signal.throwIfAborted();
			admission.assertCurrent();
			const result = await pool.run({
				location,
				storeKey,
				history,
				stagingRoot
			}, {
				signal: controller.signal,
				inputBytes: Buffer.byteLength(location) + Buffer.byteLength(storeKey ?? "") + Buffer.byteLength(history?.jobId ?? "") + Buffer.byteLength(stagingRoot ?? "") + environmentBytes
			});
			if (!result.ok) throw restoreCronLoadError(result.error);
			loaded = result;
		} finally {
			producerSettled.resolve();
			await cleanup();
		}
		controller.signal.throwIfAborted();
		admission.assertCurrent();
		return loaded;
	};
	return await retainSnapshotWork(run(), () => controller.abort(/* @__PURE__ */ new Error("Cron read-only load closed")));
}
async function readCronRunRecords(storeKey, jobId) {
	return (await readCronState({
		storeKey: cronStoreKey(storeKey),
		env: process.env,
		history: { jobId }
	})).history ?? [];
}
//#endregion
export { loadCronJobsStoreWithConfigJobsReadOnly as n, readCronRunRecords as r, inspectCronJobsReadOnly as t };
