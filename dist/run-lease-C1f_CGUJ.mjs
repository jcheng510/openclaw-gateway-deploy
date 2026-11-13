import { a as isPidDefinitelyDead, n as getFileLockProcessStartTime } from "./pid-alive-DB0zHgvx.mjs";
import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { t as createSubsystemLogger } from "./subsystem-CeqVSEVi.mjs";
import { n as enqueueKeyedTask } from "./keyed-async-queue-CTreGrmR.mjs";
import { n as createSqliteWorkerOperationAdmission } from "./sqlite-worker-operation-admission-BB758RIN.mjs";
import { r as captureOpenClawStateWorkerContext } from "./openclaw-state-worker-context-C_iAE7YK.mjs";
import { d as runGit, n as commandError, s as listGitWorktrees } from "./git-CtRrTgDk.mjs";
import { a as readRegistryWorktree } from "./registry-read-B8kvi9EH.mjs";
import { d as getRegistryWorktree, f as hasLiveWorktreeRunLeaseRow, g as listRegistryWorktrees, i as claimWorktreeRemovalRow, v as releaseWorktreeRunLeaseRow } from "./registry-8DTb8KC2.mjs";
import path from "node:path";
import fs from "node:fs/promises";
import { randomUUID } from "node:crypto";
//#region src/agents/worktrees/git-lock.ts
const OPENCLAW_LOCK_PATTERN = /^openclaw pid=(\d+)$/;
async function lockState(record) {
	return classifyLockReason((await listGitWorktrees(record.repoRoot)).find((candidate) => path.resolve(candidate.path) === path.resolve(record.path))?.lockedReason);
}
function classifyLockReason(reason) {
	if (reason === void 0) return { kind: "none" };
	const match = OPENCLAW_LOCK_PATTERN.exec(reason);
	if (!match) return {
		kind: "foreign",
		reason
	};
	const pid = Number(match[1]);
	return isPidDefinitelyDead(pid) ? {
		kind: "dead",
		pid
	} : {
		kind: "live",
		pid
	};
}
/** One GC pass may skip these paths; removal still rechecks locks and HEAD under its lease. */
function createWorktreeGcPrefilter() {
	const repositories = /* @__PURE__ */ new Map();
	return async (record) => {
		const root = path.resolve(record.repoRoot);
		let reasons = repositories.get(root);
		if (!reasons) {
			reasons = listGitWorktrees(root).then((entries) => {
				const paths = /* @__PURE__ */ new Map();
				for (const entry of entries) paths.set(path.resolve(entry.path), entry);
				return paths;
			});
			repositories.set(root, reasons);
		}
		const entry = (await reasons).get(path.resolve(record.path));
		const state = classifyLockReason(entry?.lockedReason);
		if (state.kind === "live" || state.kind === "foreign") return "worktree has a live or foreign lock";
		if (entry?.branch !== void 0 && entry.branch !== `refs/heads/${record.branch}`) return "branch-moved";
	};
}
function heldByThisProcess(state) {
	return state.kind === "live" && state.pid === process.pid;
}
async function runLock(record) {
	return await runGit(record.repoRoot, [
		"worktree",
		"lock",
		"--reason",
		`openclaw pid=${process.pid}`,
		record.path
	]);
}
async function lockWorktreeForProcess(record) {
	const result = await runLock(record);
	if (result.code === 0) return;
	const state = await lockState(record);
	if (heldByThisProcess(state)) return;
	if (state.kind !== "dead") throw commandError("git worktree lock", result);
	await unlockWorktree(record);
	const retry = await runLock(record);
	if (retry.code !== 0 && !heldByThisProcess(await lockState(record))) throw commandError("git worktree lock", retry);
}
async function unlockWorktree(record) {
	const result = await runGit(record.repoRoot, [
		"worktree",
		"unlock",
		record.path
	]);
	if (result.code !== 0) throw commandError("git worktree unlock", result);
}
//#endregion
//#region src/agents/worktrees/run-lease-store.ts
async function admitWorktreeRunLeaseRowAsync(context, input, onSettlement) {
	await runLeaseCommand(context, {
		type: "worktrees.admitRunLease",
		input
	}, onSettlement);
	context.admission.assertCurrent();
}
async function releaseWorktreeRunLeaseRowAsync(env, worktreeId, token, context = captureOpenClawStateWorkerContext({ env })) {
	await runLeaseCommand(context, {
		type: "worktrees.releaseRunLease",
		input: {
			worktreeId,
			token
		}
	});
}
async function reapWorktreeRunLeases(env, scopes) {
	if (scopes.length > 0) await runLeaseCommand(captureOpenClawStateWorkerContext({ env }), {
		type: "worktrees.reapRunLeases",
		input: { scopes }
	});
}
async function runLeaseCommand(context, command, onSettlement) {
	let settled;
	try {
		const { runOpenClawStateWorkerOperation } = await import("./openclaw-state-worker-store-Bp_XCEWM.mjs");
		await runOpenClawStateWorkerOperation(context, (scope) => scope.execute(command), { createAdmission: (operation) => {
			settled = operation.settled;
			return {
				nativeLocations: [context.admission.databasePath],
				admission: createSqliteWorkerOperationAdmission((_request, grant) => {
					context.admission.assertCurrent();
					grant();
				})
			};
		} });
	} finally {
		onSettlement?.((await settled)?.kind ?? "not-entered");
	}
}
//#endregion
//#region src/agents/worktrees/run-lease.ts
const log = createSubsystemLogger("agents/worktrees");
const RELEASE_MAX_ATTEMPTS = 3;
const heldGitLocks = /* @__PURE__ */ new Map();
const gitLockTransitionTails = /* @__PURE__ */ new Map();
let ownerChecks = {};
let resolveSelfStartTime = getFileLockProcessStartTime;
let releaseRunLeaseRow = releaseWorktreeRunLeaseRowAsync;
let unlockWorktreeImpl = unlockWorktree;
const pendingLeaseCleanups = /* @__PURE__ */ new Set();
let exitCleanupRegistered = false;
function withGitLockTransition(id, task) {
	return enqueueKeyedTask({
		tails: gitLockTransitionTails,
		key: id,
		task
	});
}
async function retainGitLock(context, id) {
	await withGitLockTransition(id, async () => {
		const held = heldGitLocks.get(id) ?? {
			refcount: 0,
			gitLocked: false
		};
		const needsLock = held.refcount === 0 && !held.gitLocked;
		held.refcount += 1;
		heldGitLocks.set(id, held);
		if (!needsLock) return;
		let record;
		try {
			record = await readRegistryWorktree(context, id);
			if (!record) return;
			await lockWorktreeForProcess(record);
			held.gitLocked = true;
		} catch (error) {
			heldGitLocks.delete(id);
			throw new Error(`managed worktree is unusable because its Git removal guard could not be acquired: ${record?.path ?? id}; repair the checkout or create a new worktree before retrying: ${formatErrorMessage(error)}`, { cause: error });
		}
	});
}
async function releaseGitLock(cleanup) {
	return await withGitLockTransition(cleanup.id, async () => {
		const held = heldGitLocks.get(cleanup.id);
		if (!cleanup.refcountReleased) {
			cleanup.refcountReleased = true;
			if (held) held.refcount -= 1;
		}
		if (!held) return true;
		if (held.refcount > 0) return true;
		if (!held.gitLocked) {
			heldGitLocks.delete(cleanup.id);
			return true;
		}
		try {
			const record = await readRegistryWorktree(cleanup.context, cleanup.id);
			if (record) await unlockWorktreeImpl(record);
		} catch (error) {
			log.warn(`failed to unlock worktree ${cleanup.id}: ${formatErrorMessage(error)}`);
			return false;
		}
		heldGitLocks.delete(cleanup.id);
		return true;
	});
}
async function realpathOrSelf(candidate) {
	try {
		return await fs.realpath(candidate);
	} catch {
		return path.resolve(candidate);
	}
}
async function resolveWorktreeIdForPath(params) {
	const env = params.env ?? process.env;
	const boundId = params.sessionEntry?.worktree?.id;
	if (boundId !== void 0) {
		const record = getRegistryWorktree(env, boundId);
		if (!record || record.removedAt !== void 0) throw new Error(`managed worktree was removed: ${record?.path ?? boundId}`);
		return boundId;
	}
	const records = listRegistryWorktrees(env).filter((record) => record.removedAt === void 0);
	if (records.length === 0) return;
	const bases = /* @__PURE__ */ new Map();
	for (const record of records) bases.set(record.id, await realpathOrSelf(record.path));
	const seen = /* @__PURE__ */ new Set();
	for (const candidate of params.candidatePaths) {
		if (!candidate || seen.has(candidate)) continue;
		seen.add(candidate);
		const real = await realpathOrSelf(candidate);
		for (const record of records) {
			const base = bases.get(record.id);
			if (base && (real === base || real.startsWith(`${base}${path.sep}`))) return record.id;
		}
	}
}
async function deleteRunLeaseRowWithRetries(cleanup) {
	for (let attempt = 1; attempt <= RELEASE_MAX_ATTEMPTS; attempt += 1) try {
		await releaseRunLeaseRow(cleanup.env, cleanup.id, cleanup.token, cleanup.context);
		return true;
	} catch (error) {
		log.warn(`failed to release worktree run lease for ${cleanup.id} (attempt ${attempt}): ${formatErrorMessage(error)}`);
		if (attempt < RELEASE_MAX_ATTEMPTS) await new Promise((resolve) => {
			setTimeout(resolve, 25 * attempt);
		});
	}
	return false;
}
async function runLeaseCleanup(cleanup) {
	if (!cleanup.admissionSettled) return false;
	if (!cleanup.rowDeleted) {
		if (!await deleteRunLeaseRowWithRetries(cleanup)) return false;
		cleanup.rowDeleted = true;
	}
	return !cleanup.gitRetained || await releaseGitLock(cleanup);
}
async function drainPendingLeaseCleanups() {
	for (const cleanup of pendingLeaseCleanups) if (await runLeaseCleanup(cleanup)) pendingLeaseCleanups.delete(cleanup);
}
function ensureExitCleanupRegistered() {
	if (exitCleanupRegistered) return;
	exitCleanupRegistered = true;
	process.on("exit", () => {
		for (const cleanup of pendingLeaseCleanups) if (cleanup.admissionSettled && !cleanup.rowDeleted) try {
			cleanup.context.admission.assertCurrent();
			releaseWorktreeRunLeaseRow(cleanup.context.environment, cleanup.id, cleanup.token);
		} catch {}
	});
}
async function acquireWorktreeRunLease(id, opts = {}) {
	const env = opts.env ?? process.env;
	ensureExitCleanupRegistered();
	await drainPendingLeaseCleanups();
	const token = randomUUID();
	const pid = process.pid;
	const startTime = resolveSelfStartTime(pid);
	const context = captureOpenClawStateWorkerContext({ env });
	const cleanup = {
		env,
		context,
		id,
		token,
		rowDeleted: false,
		admissionSettled: false,
		gitRetained: false,
		refcountReleased: true
	};
	try {
		await admitWorktreeRunLeaseRowAsync(context, {
			worktreeId: id,
			token,
			pid,
			startTime,
			now: Date.now(),
			...opts.exclusive ? { exclusive: true } : {}
		}, (kind) => {
			cleanup.admissionSettled = kind !== "unknown";
			cleanup.rowDeleted = kind === "not-entered";
		});
		await retainGitLock(context, id);
		cleanup.gitRetained = true;
		cleanup.refcountReleased = false;
		context.admission.assertCurrent();
	} catch (error) {
		if (!await runLeaseCleanup(cleanup)) pendingLeaseCleanups.add(cleanup);
		throw error;
	}
	let release;
	return {
		id,
		token,
		release: () => release ??= runLeaseCleanup(cleanup).then((complete) => {
			if (!complete) pendingLeaseCleanups.add(cleanup);
		})
	};
}
function claimWorktreeRemoval(env, params) {
	const pid = process.pid;
	claimWorktreeRemovalRow(env, {
		...params,
		pid,
		startTime: resolveSelfStartTime(pid),
		now: Date.now(),
		checks: ownerChecks
	});
}
function hasLiveWorktreeRunLease(env, worktreeId) {
	return hasLiveWorktreeRunLeaseRow(env, worktreeId, ownerChecks);
}
const testing = {
	setProcessStartTimeResolverForTest(resolver) {
		resolveSelfStartTime = resolver ?? getFileLockProcessStartTime;
		ownerChecks = {
			...ownerChecks,
			getProcessStartTime: resolver ?? void 0
		};
	},
	setDeadPidResolverForTest(resolver) {
		ownerChecks = {
			...ownerChecks,
			isPidDefinitelyDead: resolver ?? void 0
		};
	},
	setReleaseRowImplForTest(impl) {
		releaseRunLeaseRow = impl ?? releaseWorktreeRunLeaseRowAsync;
	},
	setUnlockImplForTest(impl) {
		unlockWorktreeImpl = impl ?? unlockWorktree;
	},
	async drainPendingCleanupsForTest() {
		await drainPendingLeaseCleanups();
	},
	resetForTest() {
		heldGitLocks.clear();
		gitLockTransitionTails.clear();
		pendingLeaseCleanups.clear();
		ownerChecks = {};
		resolveSelfStartTime = getFileLockProcessStartTime;
		releaseRunLeaseRow = releaseWorktreeRunLeaseRowAsync;
		unlockWorktreeImpl = unlockWorktree;
	}
};
if (process.env.VITEST || false) globalThis[Symbol.for("openclaw.worktreeRunLeaseTestApi")] = { testing };
//#endregion
export { reapWorktreeRunLeases as a, lockWorktreeForProcess as c, resolveWorktreeIdForPath as i, unlockWorktree as l, claimWorktreeRemoval as n, createWorktreeGcPrefilter as o, hasLiveWorktreeRunLease as r, lockState as s, acquireWorktreeRunLease as t };
