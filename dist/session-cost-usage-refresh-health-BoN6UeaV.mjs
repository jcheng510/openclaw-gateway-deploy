import { i as isPidAlive } from "./pid-alive-DB0zHgvx.mjs";
import { r as resolveStateDir } from "./state-dir-CfAW6S2K.mjs";
import { r as isOpenClawAgentDatabasePathCurrent } from "./openclaw-agent-db-identity-ChZ28OhF.mjs";
import { n as normalizeAgentId } from "./agent-id-D1-Q6vR4.mjs";
import { r as cloneEnvWithPlatformSemantics } from "./config-env-vars-C__rW8Th.mjs";
import "./session-key-BC4m_Ly5.mjs";
import { c as resolveOpenClawAgentSqlitePath, i as isIncognitoOpenClawAgentSqlitePath } from "./openclaw-agent-db.paths-Dv3PPTNK.mjs";
import { y as retainAgentDatabase } from "./openclaw-agent-db-lifecycle-CCXA1nI8.mjs";
import { d as runOpenClawAgentWriteTransaction } from "./openclaw-agent-db-CZUYuo7P.mjs";
import { t as createCorePluginStateKeyedStore } from "./plugin-state-store-BQ7Px0YV.mjs";
import { t as withOpenClawAgentDatabaseWrite } from "./openclaw-agent-db-write-C8nAShbb.mjs";
import { o as withSessionHistoryWorkerDatabase } from "./session-transcript-worker-runtime-BNJMKJjz.mjs";
import { c as writeSessionCostUsageRollupInDatabase, n as deleteSessionCostUsageRefreshLockInDatabase, r as pruneSessionCostUsageRollupsInDatabase, t as acquireSessionCostUsageRefreshLockInDatabase } from "./session-cost-usage-cache.kernel-D1pvgiYd.mjs";
//#region src/infra/session-cost-usage-cache.sqlite.ts
function captureCacheDatabaseOptions(inputOptions) {
	const options = {
		...inputOptions,
		env: cloneEnvWithPlatformSemantics(inputOptions.env ?? process.env)
	};
	options.env.OPENCLAW_STATE_DIR = resolveStateDir(options.env);
	return {
		...options,
		path: resolveOpenClawAgentSqlitePath(options)
	};
}
function runCacheWriteTransaction(operation, inputOptions, transactionOptions, owner) {
	const options = captureCacheDatabaseOptions(inputOptions);
	return withOpenClawAgentDatabaseWrite(options, (database) => runOpenClawAgentWriteTransaction((current) => {
		if (current !== database || !isOpenClawAgentDatabasePathCurrent(current)) throw new Error("Usage cache database changed before write admission");
		owner?.assertCurrent?.(current);
		owner?.onAdmitted?.(current);
		return operation(current);
	}, {
		...options,
		path: database.path
	}, transactionOptions), owner?.database?.db);
}
async function readCacheDatabase(options, request) {
	if (isIncognitoOpenClawAgentSqlitePath(options.path, options)) {
		const { readSessionCostUsageCache } = await import("./session-cost-usage-cache-read-Dsx-wNes.mjs");
		return readSessionCostUsageCache(options, request);
	}
	return withSessionHistoryWorkerDatabase(options, (owner) => owner.readUsageCache({
		request,
		env: {
			...options.env,
			OPENCLAW_STATE_DIR: options.env.OPENCLAW_STATE_DIR
		}
	}));
}
async function readRefreshLock(options) {
	const result = await readCacheDatabase(options, { kind: "usage-refresh-lock" });
	if (result.kind !== "usage-refresh-lock") throw new Error("Invalid usage refresh-lock worker result");
	return result.value;
}
async function deleteSessionCostUsageRollupsExcept(params) {
	const existing = params.rows.filter((row) => !params.liveKeys.has(row.key));
	await runCacheWriteTransaction((database) => pruneSessionCostUsageRollupsInDatabase(database.db, existing), {
		agentId: normalizeAgentId(params.agentId),
		env: params.env,
		...params.databasePath ? { path: params.databasePath } : {}
	}, { operationLabel: "session-cost-usage.rollup.prune" });
}
function parseRefreshLock(raw) {
	if (!raw) return null;
	try {
		const value = JSON.parse(raw);
		if (!value || typeof value.pid !== "number" || !Number.isInteger(value.pid) || value.pid <= 0 || typeof value.startedAt !== "number" || !Number.isFinite(value.startedAt) || typeof value.ownerNonce !== "string" || !value.ownerNonce) return null;
		return {
			pid: value.pid,
			startedAt: value.startedAt,
			ownerNonce: value.ownerNonce
		};
	} catch {
		return null;
	}
}
async function isSessionCostUsageRefreshRunning(agentId, databasePath) {
	const lock = parseRefreshLock(await readRefreshLock(captureCacheDatabaseOptions({
		agentId: normalizeAgentId(agentId),
		path: databasePath
	})));
	return lock !== null && isPidAlive(lock.pid);
}
function prepareSessionCostUsageRefreshLock(agentId, databasePath, owner) {
	const options = captureCacheDatabaseOptions({
		agentId: normalizeAgentId(agentId),
		path: databasePath,
		env: owner?.env
	});
	const lock = {
		pid: process.pid,
		startedAt: Date.now(),
		ownerNonce: `${process.pid}:${Date.now()}:${process.hrtime.bigint()}`
	};
	const lockJson = JSON.stringify(lock);
	let database;
	let releaseBorrow;
	let acquiring;
	let releasing;
	let closed = false;
	let acquired = false;
	let mayOwnLock = false;
	const assertCurrent = (current) => {
		if (closed || !acquired) throw new Error("Usage cache refresh owner is closed");
		owner?.assertCurrent?.(current);
	};
	const release = () => {
		closed = true;
		releasing ??= (async () => {
			await acquiring?.catch(() => void 0);
			if (mayOwnLock) {
				await runCacheWriteTransaction((current) => deleteSessionCostUsageRefreshLockInDatabase(current.db, lockJson), options, { operationLabel: "session-cost-usage.refresh-lock.delete" }, { database });
				mayOwnLock = false;
			}
			releaseBorrow?.();
			releaseBorrow = void 0;
		})().catch((error) => {
			releasing = void 0;
			throw error;
		});
		return releasing;
	};
	return {
		acquire() {
			if (closed) return Promise.reject(/* @__PURE__ */ new Error("Usage cache refresh owner is closed"));
			acquiring ??= (async () => {
				owner?.assertCurrent?.();
				const previousRaw = await readRefreshLock(options);
				const previousLock = parseRefreshLock(previousRaw);
				const previousOwnerIsRunning = previousLock ? isPidAlive(previousLock.pid) : false;
				acquired = await runCacheWriteTransaction((current) => {
					mayOwnLock = true;
					const granted = acquireSessionCostUsageRefreshLockInDatabase(current.db, {
						previousRaw,
						previousOwnerIsRunning,
						lockJson,
						startedAt: lock.startedAt
					});
					if (!granted) mayOwnLock = false;
					return granted;
				}, options, { operationLabel: "session-cost-usage.refresh-lock.acquire" }, {
					assertCurrent: (current) => {
						if (closed) throw new Error("Usage cache refresh owner is closed");
						owner?.assertCurrent?.(current);
					},
					onAdmitted: (current) => {
						database = current;
						releaseBorrow = retainAgentDatabase(current.db);
					}
				});
				if (!acquired) {
					releaseBorrow?.();
					releaseBorrow = void 0;
				}
				return acquired;
			})();
			return acquiring;
		},
		release,
		writeRollup(params) {
			assertCurrent();
			return runCacheWriteTransaction((current) => writeSessionCostUsageRollupInDatabase(current.db, params), options, { operationLabel: "session-cost-usage.rollup.write" }, {
				database,
				assertCurrent
			});
		},
		pruneRows(rows) {
			assertCurrent();
			return runCacheWriteTransaction((current) => pruneSessionCostUsageRollupsInDatabase(current.db, rows), options, { operationLabel: "session-cost-usage.rollup.prune" }, {
				database,
				assertCurrent
			});
		}
	};
}
//#endregion
//#region src/infra/session-cost-usage-refresh-health.ts
/** Bounded health facts survive worker/process exits; successful refresh retires each fact. */
function openUsageCostRefreshFailures(env) {
	return createCorePluginStateKeyedStore({
		ownerId: "core:usage-cost-cache",
		namespace: "refresh-failures",
		maxEntries: 256,
		env
	});
}
//#endregion
export { prepareSessionCostUsageRefreshLock as i, deleteSessionCostUsageRollupsExcept as n, isSessionCostUsageRefreshRunning as r, openUsageCostRefreshFailures as t };
