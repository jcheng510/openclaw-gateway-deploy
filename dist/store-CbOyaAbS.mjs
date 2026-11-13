import { t as pruneMapToMaxSize } from "./map-size-CNcWiFKu.mjs";
import { t as deferSqlitePostCommitPublication } from "./sqlite-post-commit-Dih1WMKX.mjs";
import { r as captureOpenClawStateWorkerContext } from "./openclaw-state-worker-context-C_iAE7YK.mjs";
import { l as runOpenClawStateWriteTransaction } from "./openclaw-state-db-DM-mSY0m.mjs";
import { a as runOpenClawStateWorkerOperation } from "./openclaw-state-worker-store-DwGcGmZn.mjs";
import { l as readCronJobsFingerprint, t as assertCronStoreCanPersist } from "./row-codec-BoajbjTy.mjs";
import { t as restoreCronLoadError } from "./load-error-Hk_r_XY_.mjs";
import { t as resolveCronJobsStorePath } from "./paths-zJ_Rby85.mjs";
import { n as runCronRuntimeMutation, t as prepareCronRunReceiptWriteSchema } from "./run-receipt-write-admission-C_bxAGc4.mjs";
import { t as cronStoreKey } from "./key-BBZ40bDq.mjs";
import { c as restoreCronSaveError, i as saveCronStoreInDatabase, n as prepareCronStoreChanges, r as saveCronStoreChangesInDatabase, s as CronJobsStoreChangedError, t as isCronRuntimeOnlySave } from "./save.kernel-BKRAPiix.mjs";
import "./read-only-CgIcbGc8.mjs";
import path from "node:path";
//#region src/cron/store.ts
/** Public cron store load/save API backed entirely by shared SQLite state. */
const MAX_TRACKED_CRON_STORE_REVISIONS = 64;
const STALE_CRON_STORE_REVISION = -1;
const cronStoreRevisions = /* @__PURE__ */ new Map();
let nextCronStoreRevision = 0;
/** Reads the process-local committed revision for one canonical SQLite partition. */
function getCronJobsStoreRevision(storePath) {
	return cronStoreRevisions.get(cronStoreKey(storePath)) ?? nextCronStoreRevision;
}
function noteCronJobsStoreCommit(storeKey) {
	cronStoreRevisions.delete(storeKey);
	cronStoreRevisions.set(storeKey, ++nextCronStoreRevision);
	pruneMapToMaxSize(cronStoreRevisions, MAX_TRACKED_CRON_STORE_REVISIONS);
}
/** Loads cron jobs plus config/runtime sidecars from the SQLite-backed store. */
async function loadCronJobsStoreWithConfigJobs(storePath) {
	const storeKey = cronStoreKey(storePath);
	const context = captureOpenClawStateWorkerContext();
	let received = false;
	try {
		return await runOpenClawStateWorkerOperation(context, async (scope) => {
			const result = await scope.execute({
				type: "cron.loadMutable",
				input: { storeKey }
			});
			received = true;
			for (let index = 0; index < result.repairCommits; index += 1) noteCronJobsStoreCommit(storeKey);
			if (!result.ok) {
				if (result.repairCommits === 0) noteCronJobsStoreCommit(storeKey);
				throw restoreCronLoadError(result.error);
			}
			return result.loaded;
		});
	} catch (error) {
		if (!received) noteCronJobsStoreCommit(storeKey);
		throw error;
	}
}
function assertCronJobsStoreUnchanged(db, storePath, expectedJobsFingerprint) {
	const resolvedStorePath = path.resolve(storePath);
	if (readCronJobsFingerprint(db, cronStoreKey(resolvedStorePath)) !== expectedJobsFingerprint) throw new CronJobsStoreChangedError(resolvedStorePath);
}
/** Removes an owned declarative job family left under obsolete absolute store keys. */
async function removeStaleCronJobFamilyRows(storePath, family, opts) {
	const storeKey = cronStoreKey(path.resolve(storePath));
	const context = captureOpenClawStateWorkerContext();
	let removed = 0;
	await runCronRuntimeMutation({
		context,
		type: "cron.removeStaleFamily",
		input: {
			storeKey,
			family: { ...family }
		},
		assertCurrent: () => opts?.commitGuard?.(),
		prepare: () => ({
			value: {},
			assertCurrent() {}
		}),
		publish: (outcome) => {
			removed = outcome.removed;
		}
	});
	return removed;
}
/** Loads only the persisted cron job store payload. */
async function loadCronJobsStore(storePath) {
	return (await loadCronJobsStoreWithConfigJobs(storePath)).store;
}
function publishCronStoreSaveRevision(storeKey, observedRevision) {
	const unchanged = getCronJobsStoreRevision(storeKey) === observedRevision;
	noteCronJobsStoreCommit(storeKey);
	return unchanged ? nextCronStoreRevision : STALE_CRON_STORE_REVISION;
}
function commitCronStoreNative(storeKey, operation, hooks, operationLabel) {
	const observedRevision = getCronJobsStoreRevision(storeKey);
	let committed = false;
	try {
		const value = runOpenClawStateWriteTransaction((database) => {
			const result = operation(database, hooks ? {
				hooks,
				receiptSchema: prepareCronRunReceiptWriteSchema(database.db)
			} : void 0);
			deferSqlitePostCommitPublication(database.db, () => {
				committed = true;
			});
			return result;
		}, {}, operationLabel ? { operationLabel } : void 0);
		hooks?.afterCommit?.();
		return {
			value,
			revision: publishCronStoreSaveRevision(storeKey, observedRevision)
		};
	} catch (error) {
		if (committed) noteCronJobsStoreCommit(storeKey);
		throw error;
	}
}
async function saveCronStoreWithWorker(storeKey, operation) {
	const observedRevision = getCronJobsStoreRevision(storeKey);
	const context = captureOpenClawStateWorkerContext();
	let received = false;
	try {
		return await runOpenClawStateWorkerOperation(context, async (scope) => {
			const result = await operation(scope);
			received = true;
			const revision = result.committed || !result.ok ? publishCronStoreSaveRevision(storeKey, observedRevision) : observedRevision;
			if (!result.ok) throw restoreCronSaveError(result.error);
			return {
				value: result.value,
				revision
			};
		});
	} catch (error) {
		if (!received) noteCronJobsStoreCommit(storeKey);
		throw error;
	}
}
/** Internal synchronous entry for callers whose authority callbacks must not yield before commit. */
function saveCronJobsStoreChangesWithRevisionNative(storePath, previous, next, opts) {
	assertCronStoreCanPersist(next);
	const storeKey = cronStoreKey(path.resolve(storePath));
	const prepared = prepareCronStoreChanges(previous, next);
	if (prepared.changedIds.size === 0) return {
		value: previous,
		revision: getCronJobsStoreRevision(storeKey)
	};
	const { transactionHooks, ...options } = opts ?? {};
	return commitCronStoreNative(storeKey, ({ db }, admittedHooks) => saveCronStoreChangesInDatabase(db, storeKey, storeKey, prepared, options, admittedHooks), transactionHooks, "cron.config-mutation");
}
/** Commits scheduler-disabled CRUD rows and retains this operation's revision fact. */
async function saveCronJobsStoreChangesWithRevision(storePath, previous, next, opts) {
	if (opts?.transactionHooks) return saveCronJobsStoreChangesWithRevisionNative(storePath, previous, next, opts);
	assertCronStoreCanPersist(next);
	const storeKey = cronStoreKey(path.resolve(storePath));
	const prepared = prepareCronStoreChanges(previous, next);
	if (prepared.changedIds.size === 0) return {
		value: previous,
		revision: getCronJobsStoreRevision(storeKey)
	};
	const { transactionHooks: _hooks, ...options } = opts ?? {};
	const input = structuredClone({
		storeKey,
		changes: prepared,
		options
	});
	return await saveCronStoreWithWorker(storeKey, (scope) => scope.execute({
		type: "cron.saveChanges",
		input
	}));
}
/** Commits only scheduler-disabled CRUD rows against authoritative SQLite state. */
async function saveCronJobsStoreChanges(storePath, previous, next, opts) {
	return (await saveCronJobsStoreChangesWithRevision(storePath, previous, next, opts)).value;
}
/** Internal synchronous entry preserving the caller's consumed guard/capture window. */
function saveCronJobsStoreWithRevisionNative(storePath, store, opts) {
	const storeKey = cronStoreKey(path.resolve(storePath));
	if (!isCronRuntimeOnlySave(opts)) assertCronStoreCanPersist(store);
	const { transactionHooks, ...options } = opts ?? {};
	return commitCronStoreNative(storeKey, (database, admittedHooks) => {
		saveCronStoreInDatabase(database, storeKey, store, options, admittedHooks);
	}, transactionHooks);
}
/** Persist cron data and return only this operation's publication revision. */
async function saveCronJobsStoreWithRevision(storePath, store, opts) {
	if (opts?.transactionHooks) return saveCronJobsStoreWithRevisionNative(storePath, store, opts);
	const storeKey = cronStoreKey(path.resolve(storePath));
	if (!isCronRuntimeOnlySave(opts)) assertCronStoreCanPersist(store);
	const { transactionHooks: _hooks, ...options } = opts ?? {};
	const input = structuredClone({
		storeKey,
		store,
		options
	});
	return await saveCronStoreWithWorker(storeKey, (scope) => scope.execute({
		type: "cron.save",
		input
	}));
}
/** Persists cron jobs, or only mutable runtime state when stateOnly is set. */
async function saveCronJobsStore(storePath, store, opts) {
	await saveCronJobsStoreWithRevision(storePath, store, opts);
}
/** Atomically acquire doctor migration metadata and replace cron rows only for the winner. */
async function saveCronJobsStoreWithMetadata(storePath, store, acquireMetadata, opts) {
	const resolvedStorePath = path.resolve(storePath);
	const storeKey = cronStoreKey(resolvedStorePath);
	assertCronStoreCanPersist(store);
	const committed = runOpenClawStateWriteTransaction((database) => {
		if (!acquireMetadata(database.db)) return false;
		saveCronStoreInDatabase(database, storeKey, store, {
			...opts,
			stateOnly: false
		});
		return true;
	});
	if (committed) noteCronJobsStoreCommit(storeKey);
	return committed;
}
/** Resolves the public plugin-SDK cron store path. */
function resolveCronStorePath(storePath) {
	return resolveCronJobsStorePath(storePath);
}
/** Plugin-SDK alias for loading the cron store. */
async function loadCronStore(storePath) {
	return await loadCronJobsStore(storePath);
}
/** Plugin-SDK alias for saving the cron store. */
async function saveCronStore(storePath, store, opts) {
	await saveCronJobsStore(storePath, store, opts);
}
//#endregion
export { loadCronStore as a, resolveCronStorePath as c, saveCronJobsStoreChangesWithRevision as d, saveCronJobsStoreChangesWithRevisionNative as f, saveCronStore as g, saveCronJobsStoreWithRevisionNative as h, loadCronJobsStoreWithConfigJobs as i, saveCronJobsStore as l, saveCronJobsStoreWithRevision as m, getCronJobsStoreRevision as n, noteCronJobsStoreCommit as o, saveCronJobsStoreWithMetadata as p, loadCronJobsStore as r, removeStaleCronJobFamilyRows as s, assertCronJobsStoreUnchanged as t, saveCronJobsStoreChanges as u };
