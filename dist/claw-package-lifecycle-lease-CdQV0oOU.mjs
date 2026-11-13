import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { i as getNodeSqliteKysely, n as executeSqliteQuerySync, r as executeSqliteQueryTakeFirstSync } from "./kysely-sync-Y4_ti-rQ.mjs";
import { s as resolveOpenClawStateSqlitePath } from "./openclaw-state-db.paths-rJI64Ab5.mjs";
import { l as runOpenClawStateWriteTransaction } from "./openclaw-state-db-DM-mSY0m.mjs";
import { resolve } from "node:path";
import { randomUUID } from "node:crypto";
//#region src/state/claw-package-lifecycle-lease.ts
const LEASE_SCOPE = "claw-package-lifecycle";
const LEASE_TTL_MS = 3e5;
var ClawPackageLifecycleBusyError = class extends Error {
	constructor(message) {
		super(message);
		this.name = "ClawPackageLifecycleBusyError";
	}
};
function kyselyFor(db) {
	return getNodeSqliteKysely(db);
}
function packageLeaseKey(artifact) {
	if (artifact.kind === "skill") return `skill:${artifact.source}:workspace:${resolve(artifact.workspace)}`;
	return `${artifact.kind}:${artifact.source}:${artifact.ref}`;
}
/** Serializes shared package ownership and artifact mutation across processes. */
function acquireClawPackageLifecycleLease(artifact, options = {}) {
	const env = options.env ?? process.env;
	const databasePath = options.path ?? resolveOpenClawStateSqlitePath(env);
	const nowMs = options.nowMs ?? Date.now();
	const expiresAt = nowMs + LEASE_TTL_MS;
	const owner = options.owner ?? randomUUID();
	const leaseKey = packageLeaseKey(artifact);
	try {
		runOpenClawStateWriteTransaction(({ db }) => {
			const state = kyselyFor(db);
			executeSqliteQuerySync(db, state.deleteFrom("state_leases").where("scope", "=", LEASE_SCOPE).where("lease_key", "=", leaseKey).where("expires_at", "<=", nowMs));
			const existing = executeSqliteQueryTakeFirstSync(db, state.selectFrom("state_leases").select("expires_at").where("scope", "=", LEASE_SCOPE).where("lease_key", "=", leaseKey));
			if (existing) throw new ClawPackageLifecycleBusyError(`Package ${artifact.ref} is being changed by another OpenClaw lifecycle; retry after ${new Date(existing.expires_at ?? expiresAt).toISOString()}.`);
			executeSqliteQuerySync(db, state.insertInto("state_leases").values({
				scope: LEASE_SCOPE,
				lease_key: leaseKey,
				owner,
				expires_at: expiresAt,
				heartbeat_at: nowMs,
				payload_json: JSON.stringify(artifact),
				created_at: nowMs,
				updated_at: nowMs
			}));
		}, {
			env,
			path: databasePath
		});
	} catch (error) {
		if (options.required || error instanceof ClawPackageLifecycleBusyError) throw error;
		return null;
	}
	return {
		heartbeat: (heartbeatNowMs = Date.now()) => {
			const heartbeatExpiresAt = heartbeatNowMs + LEASE_TTL_MS;
			runOpenClawStateWriteTransaction(({ db }) => {
				if (executeSqliteQuerySync(db, kyselyFor(db).updateTable("state_leases").set({
					expires_at: heartbeatExpiresAt,
					heartbeat_at: heartbeatNowMs,
					updated_at: heartbeatNowMs
				}).where("scope", "=", LEASE_SCOPE).where("lease_key", "=", leaseKey).where("owner", "=", owner).where("expires_at", ">", heartbeatNowMs)).numAffectedRows !== 1n) throw new Error(`Package lifecycle lease was lost for ${artifact.ref}.`);
			}, {
				env,
				path: databasePath
			});
		},
		release: () => {
			runOpenClawStateWriteTransaction(({ db }) => {
				executeSqliteQuerySync(db, kyselyFor(db).deleteFrom("state_leases").where("scope", "=", LEASE_SCOPE).where("lease_key", "=", leaseKey).where("owner", "=", owner));
			}, {
				env,
				path: databasePath
			});
		}
	};
}
/** Renews an acquired lease while an asynchronous package mutation is in flight. */
function maintainClawPackageLifecycleLease(lease) {
	let heartbeatError;
	const heartbeat = setInterval(() => {
		try {
			lease.heartbeat();
		} catch (error) {
			heartbeatError ??= error;
		}
	}, LEASE_TTL_MS / 3);
	heartbeat.unref();
	return {
		assertCurrent: () => {
			if (heartbeatError) throw heartbeatError instanceof Error ? heartbeatError : new Error(formatErrorMessage(heartbeatError));
			lease.heartbeat();
		},
		release: () => {
			clearInterval(heartbeat);
			lease.release();
		}
	};
}
async function withClawPackageLifecycleLease(artifact, operation, options = {}) {
	const lease = acquireClawPackageLifecycleLease(artifact, options);
	if (!lease) return await operation();
	const maintained = maintainClawPackageLifecycleLease(lease);
	const releaseOnExit = () => {
		try {
			maintained.release();
		} catch {}
	};
	process.once("exit", releaseOnExit);
	try {
		const result = await operation();
		maintained.assertCurrent();
		return result;
	} finally {
		process.removeListener("exit", releaseOnExit);
		try {
			maintained.release();
		} catch {}
	}
}
//#endregion
export { maintainClawPackageLifecycleLease as n, withClawPackageLifecycleLease as r, acquireClawPackageLifecycleLease as t };
