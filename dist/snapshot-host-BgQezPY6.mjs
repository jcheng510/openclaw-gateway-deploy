import { t as mergeProcessEnv } from "./process-env-DlZFJzq6.mjs";
import { t as FsSafeError, w as root } from "./fs-safe-CHQXnCPk.mjs";
import { t as hasErrnoCode } from "./errno-FR4CRyya.mjs";
import { r as resolveStateDir } from "./state-dir-CfAW6S2K.mjs";
import "./paths-CtO6iw0c.mjs";
import { Fn as object, Jn as string, xn as literal } from "./schemas-BOYIvvln.mjs";
import { a as writeFileWindowFully } from "./file-descriptor-B4yBUiAP.mjs";
import { c as requireGit, d as runGit, l as requireGitBuffer, m as worktreePathExists, n as commandError, s as listGitWorktrees } from "./git-CtRrTgDk.mjs";
import { t as runGitWorkerOperation } from "./git-worker-By34oXKp.mjs";
import { F as requireWorktreeDiskSpace, I as withWorktreeAllocationLease, T as resolveRepository, d as withExactStateGitLocks, n as assertExactStateSourceIdentity, o as requireExactManagedWorktreeHead, r as hasExactWorktreeIndex, s as requireExactWorktreeRepository } from "./removal-git-CjOTP-o8.mjs";
import { t as getRegistryWorktreeProvisionedChunk } from "./registry-read-B8kvi9EH.mjs";
import { a as clearRegistryWorktreeProvisionedChunks, d as getRegistryWorktree, g as listRegistryWorktrees, m as insertRegistryWorktreeProvisionedChunk, n as assertRegistrySnapshotRetirement, o as deleteRegistryWorktree, r as assertWorktreeRemovalClaim, t as abortWorktreeRemovalRow } from "./registry-8DTb8KC2.mjs";
import { n as claimWorktreeRemoval } from "./run-lease-C1f_CGUJ.mjs";
import { c as rawPathStat, i as gitPathspecBatches, l as splitNullBuffer } from "./git-path-inventory-CpiO9V6P.mjs";
import { c as inspectProvisionedFiles, d as resolveGitPath, i as restoreExactStateMetadata, l as lstatIfExists, o as hasSafeParentDirectories, r as readExactStateSnapshot, u as normalizeProvisionedRelativePath } from "./snapshot-exact-state-BlXzonFD.mjs";
import { constants, lstatSync } from "node:fs";
import path from "node:path";
import fs$1 from "node:fs/promises";
import os from "node:os";
import { createHash, randomUUID } from "node:crypto";
//#region src/agents/worktrees/empty-source.ts
const INITIAL_COMMIT = `tree 4b825dc642cb6eb9a060e54bf8d69288fbee4904\nauthor OpenClaw <openclaw@localhost> 0 +0000\ncommitter OpenClaw <openclaw@localhost> 0 +0000\n\nEmpty workspace\n`;
const INITIAL_COMMIT_ID = createHash("sha1").update(`commit ${Buffer.byteLength(INITIAL_COMMIT)}\0${INITIAL_COMMIT}`).digest("hex");
function sourceParent(env) {
	return path.join(resolveStateDir(env), "worktree-sources", "empty");
}
function sourceName(ownerId) {
	return createHash("sha256").update(ownerId).digest("hex");
}
async function validateSource(sourceRoot, gitOptions) {
	const root = await fs$1.lstat(sourceRoot);
	const metadata = await fs$1.lstat(path.join(sourceRoot, ".git"));
	const entries = await fs$1.readdir(sourceRoot);
	if (!root.isDirectory() || !metadata.isDirectory() || entries.length !== 1 || entries[0] !== ".git" || await requireGit(sourceRoot, ["symbolic-ref", "HEAD"], gitOptions) !== "refs/heads/main" || await requireGit(sourceRoot, [
		"rev-parse",
		"--verify",
		"HEAD^{commit}"
	], gitOptions) !== INITIAL_COMMIT_ID || await requireGit(sourceRoot, ["status", "--porcelain=v1"], gitOptions) !== "") throw new Error("The empty workspace source has changed.");
}
/** Called under the managed-worktree allocation lease, including source publication. */
async function ensureEmptyWorktreeSource(params) {
	const { env, commitGuard } = params;
	const gitEnv = Object.fromEntries(Object.entries(mergeProcessEnv([process.env, env])).filter(([key]) => !key.toUpperCase().startsWith("GIT_")));
	gitEnv.GIT_CONFIG_NOSYSTEM = "1";
	gitEnv.GIT_CONFIG_GLOBAL = os.devNull;
	gitEnv.GIT_NO_REPLACE_OBJECTS = "1";
	const gitOptions = {
		baseEnv: gitEnv,
		env: gitEnv,
		signal: params.signal,
		beforeRun: commitGuard
	};
	params.signal?.throwIfAborted();
	commitGuard();
	await fs$1.mkdir(sourceParent(env), {
		recursive: true,
		mode: 448
	});
	const ownerRoot = path.join(await fs$1.realpath(sourceParent(env)), sourceName(params.ownerId));
	const sourceRoot = path.join(ownerRoot, "workspace");
	if (!await worktreePathExists(sourceRoot)) {
		if (listRegistryWorktrees(env).some((record) => path.relative(sourceRoot, record.repoRoot) === "")) throw new Error(`Empty workspace source is missing: ${sourceRoot}. Restore its original Git metadata before starting this workspace; existing session history and snapshots depend on it.`);
		commitGuard();
		await fs$1.mkdir(ownerRoot, {
			recursive: true,
			mode: 448
		});
		if (!(await fs$1.lstat(ownerRoot)).isDirectory()) throw new Error(`Empty workspace source parent is not a directory: ${ownerRoot}`);
		commitGuard();
		const temporary = await fs$1.mkdtemp(path.join(ownerRoot, ".empty-"));
		try {
			await requireGit(temporary, [
				"init",
				"--quiet",
				"--template=",
				"--object-format=sha1",
				"-b",
				"main"
			], gitOptions);
			await requireGit(temporary, [
				"hash-object",
				"-w",
				"-t",
				"tree",
				"--stdin"
			], {
				...gitOptions,
				input: ""
			});
			await requireGit(temporary, [
				"hash-object",
				"-w",
				"-t",
				"commit",
				"--stdin"
			], {
				...gitOptions,
				input: INITIAL_COMMIT
			});
			await requireGit(temporary, [
				"update-ref",
				"refs/heads/main",
				INITIAL_COMMIT_ID
			], gitOptions);
			await validateSource(temporary, gitOptions);
			commitGuard();
			await fs$1.rename(temporary, sourceRoot);
		} finally {
			await fs$1.rm(temporary, {
				recursive: true,
				force: true
			});
			await fs$1.rmdir(ownerRoot).catch(() => void 0);
		}
		return sourceRoot;
	}
	try {
		await validateSource(sourceRoot, gitOptions);
	} catch (cause) {
		params.signal?.throwIfAborted();
		commitGuard();
		throw new Error(`Empty workspace source is unavailable or modified: ${sourceRoot}. Restore its original Git metadata and keep existing session files; OpenClaw will not recreate it over existing data.`, { cause });
	}
	commitGuard();
	return sourceRoot;
}
async function resolveEmptyWorktreeSourceRoot(params) {
	const { env, record } = params;
	if (record.ownerKind !== "session" || !record.ownerId || !await worktreePathExists(sourceParent(env))) return;
	const ownerRoot = path.join(await fs$1.realpath(sourceParent(env)), sourceName(record.ownerId));
	const expected = path.join(ownerRoot, "workspace");
	return path.relative(expected, record.repoRoot) === "" ? expected : void 0;
}
/** Called under the allocation lease after failed creation or final snapshot expiry. */
async function removeUnusedEmptyWorktreeSource(params) {
	const { env, record, commitGuard } = params;
	const expected = await resolveEmptyWorktreeSourceRoot(params);
	if (!expected || !await worktreePathExists(expected)) return;
	const ownerRoot = path.dirname(expected);
	const otherRecords = listRegistryWorktrees(env).filter((other) => other.id !== record.id && path.relative(expected, other.repoRoot) === "");
	if (otherRecords.length > 0) {
		if (record.id && !otherRecords.some((other) => other.ownerKind === "session" && other.ownerId === record.ownerId)) throw new Error(`Empty workspace source still has retained worktrees; preserved ${expected}`);
		return;
	}
	const ownerDirectory = await fs$1.lstat(ownerRoot);
	const root = await fs$1.lstat(expected);
	const metadata = await fs$1.lstat(path.join(expected, ".git"));
	const entries = await fs$1.readdir(expected);
	if (!ownerDirectory.isDirectory() || !root.isDirectory() || !metadata.isDirectory() || entries.length !== 1 || entries[0] !== ".git") throw new Error(`Empty workspace source contains unexpected files; preserved ${expected}`);
	const worktrees = await listGitWorktrees(expected, {
		signal: params.signal,
		beforeRun: commitGuard
	});
	if (worktrees.length !== 1 || path.relative(expected, worktrees[0].path) !== "") throw new Error(`Empty workspace source still has linked worktrees; preserved ${expected}`);
	commitGuard();
	await fs$1.rm(expected, { recursive: true });
	commitGuard();
	await fs$1.rmdir(ownerRoot).catch(() => void 0);
}
//#endregion
//#region src/agents/worktrees/provisioned-files.ts
async function copyProvisionedFile(params) {
	const relativePath = params.relativePath;
	if (!await hasSafeParentDirectories(params.sourceRoot.rootReal, relativePath) || !await hasSafeParentDirectories(params.destinationRoot.rootReal, relativePath)) return false;
	const source = resolveGitPath(params.sourceRoot.rootReal, relativePath);
	const destination = resolveGitPath(params.destinationRoot.rootReal, relativePath);
	const sourceStat = await fs$1.lstat(source).catch(() => void 0);
	if (!sourceStat?.isFile() || sourceStat.isSymbolicLink()) return false;
	if (await lstatIfExists(destination)) return false;
	try {
		await params.destinationRoot.copyIn(destination, {
			root: params.sourceRoot,
			relativePath: source
		}, {
			overwrite: false,
			maxBytes: Infinity,
			preserveSourceMode: true,
			sourceHardlinks: "allow",
			mutationSymlinks: "reject",
			durable: false,
			assertBeforeMutation: params.assertCurrent,
			signal: params.signal
		});
	} catch (error) {
		if (error instanceof FsSafeError && error.code === "already-exists") return false;
		throw error;
	}
	params.assertCurrent?.();
	return true;
}
/** Copies the current manifest matches and returns only paths this call actually created. */
async function provisionIncludedFiles(repoRoot, worktreePath, options = {}) {
	const inspection = await runGitWorkerOperation({
		type: "worktree.provisioning-inspection",
		input: { sourceRoot: repoRoot }
	}, options);
	const assertCurrent = () => {
		options.signal?.throwIfAborted();
		options.assertCurrent?.();
	};
	if (inspection.paths.length === 0) return [];
	assertCurrent();
	const [sourceRoot, destinationRoot] = await Promise.all([root(repoRoot), root(worktreePath)]);
	const provisioned = [];
	for (const relativePath of inspection.paths) {
		const normalized = normalizeProvisionedRelativePath(relativePath);
		if (normalized && await copyProvisionedFile({
			sourceRoot,
			destinationRoot,
			relativePath: normalized,
			assertCurrent,
			signal: options.signal
		})) provisioned.push(normalized);
	}
	return provisioned.toSorted();
}
const SNAPSHOT_CHUNK_BYTES = 1048576;
async function captureParentDirectoryIdentities(root, relativePath) {
	const segments = relativePath.split("/");
	const directories = [root];
	let current = root;
	for (const segment of segments.slice(0, -1)) {
		current = path.join(current, segment);
		directories.push(current);
	}
	const identities = [];
	for (const directory of directories) {
		const stat = await fs$1.lstat(directory);
		if (!stat.isDirectory() || stat.isSymbolicLink()) throw new Error(`unsafe provisioned parent directory: ${directory}`);
		identities.push({
			path: directory,
			dev: stat.dev,
			ino: stat.ino
		});
	}
	return identities;
}
async function validateDirectoryIdentities(identities) {
	for (const identity of identities) {
		const stat = await fs$1.lstat(identity.path);
		if (!stat.isDirectory() || stat.isSymbolicLink() || stat.dev !== identity.dev || stat.ino !== identity.ino) throw new Error(`provisioned parent directory changed: ${identity.path}`);
	}
}
function sameFileState(left, right) {
	return left.dev === right.dev && left.ino === right.ino && left.mode === right.mode && left.size === right.size && left.mtimeMs === right.mtimeMs && left.ctimeMs === right.ctimeMs;
}
async function readProvisionedMembership(worktreePath, paths, options) {
	const ignoredUntracked = /* @__PURE__ */ new Set();
	const currentTracked = /* @__PURE__ */ new Set();
	const trackedAtHead = /* @__PURE__ */ new Set();
	for (const batch of gitPathspecBatches(paths)) for (const [target, args] of [
		[ignoredUntracked, [
			"ls-files",
			"--others",
			"--ignored",
			"--exclude-standard",
			"-z"
		]],
		[currentTracked, [
			"ls-files",
			"--cached",
			"-z"
		]],
		[trackedAtHead, [
			"ls-tree",
			"-r",
			"--name-only",
			"-z",
			"HEAD"
		]]
	]) {
		const output = await requireGitBuffer(worktreePath, [
			"--literal-pathspecs",
			...args,
			"--",
			...batch
		], {
			...options,
			killProcessTree: true
		});
		for (const entry of splitNullBuffer(output)) target.add(entry.toString("utf8"));
	}
	return {
		ignoredUntracked,
		currentTracked,
		trackedAtHead
	};
}
/** Stores provisioned bytes outside Git so ignored credentials never enter its object database. */
async function snapshotProvisionedFiles(env, worktreeId, worktreePath, provisionedPaths, options = {}) {
	const commitGuard = () => {
		options.signal?.throwIfAborted();
		options.assertCurrent?.();
	};
	const files = await inspectProvisionedFiles(worktreePath, provisionedPaths);
	if (files === void 0) throw new Error("provisioned path ledger is unavailable");
	const expected = options.expected ? new Map(options.expected.files.map((file) => [file.path, file])) : void 0;
	if (expected && (expected.size !== files.length || files.some((file) => !expected.has(file.path) || expected.get(file.path)?.mode !== file.mode))) throw new Error("provisioned exact-state membership or modes changed after capture");
	if (files.every((file) => file.mode === null)) {
		commitGuard();
		clearRegistryWorktreeProvisionedChunks(env, worktreeId);
		return files.map((file) => ({
			path: file.path,
			mode: null,
			chunks: 0
		}));
	}
	const { ignoredUntracked, currentTracked, trackedAtHead } = await readProvisionedMembership(worktreePath, files.filter((file) => file.mode !== null).map((file) => file.path), {
		signal: options.signal,
		beforeRun: commitGuard
	});
	commitGuard();
	clearRegistryWorktreeProvisionedChunks(env, worktreeId);
	const states = [];
	try {
		for (const file of files) {
			if (file.mode === null) {
				states.push({
					path: file.path,
					mode: null,
					chunks: 0
				});
				continue;
			}
			if (currentTracked.has(file.path)) throw new Error(`provisioned path is now tracked: ${file.path}`);
			if (trackedAtHead.has(file.path)) throw new Error(`provisioned path is tracked at HEAD: ${file.path}`);
			if (!ignoredUntracked.has(file.path)) throw new Error(`provisioned path is no longer ignored: ${file.path}`);
			const parentIdentities = await captureParentDirectoryIdentities(worktreePath, file.path);
			const handle = await fs$1.open(file.target, constants.O_RDONLY | (constants.O_NOFOLLOW ?? 0));
			try {
				await validateDirectoryIdentities(parentIdentities);
				const before = await handle.stat();
				const captured = expected?.get(file.path);
				if (captured && (captured.size !== before.size || captured.mode !== (before.mode & 4095))) throw new Error(`provisioned exact-state size or mode changed after capture: ${file.path}`);
				const digest = options.expected ? createHash(options.expected.algorithm).update(`blob ${before.size}\0`) : void 0;
				const buffer = Buffer.allocUnsafe(SNAPSHOT_CHUNK_BYTES);
				let chunkIndex = 0;
				let offset = 0;
				while (offset < before.size) {
					const { bytesRead } = await handle.read(buffer, 0, Math.min(buffer.byteLength, before.size - offset), offset);
					if (bytesRead === 0) throw new Error(`provisioned file changed while snapshotting: ${file.path}`);
					digest?.update(buffer.subarray(0, bytesRead));
					commitGuard();
					insertRegistryWorktreeProvisionedChunk(env, {
						worktreeId,
						path: file.path,
						chunkIndex,
						data: buffer.subarray(0, bytesRead)
					});
					offset += bytesRead;
					chunkIndex += 1;
				}
				const [after, current] = await Promise.all([handle.stat(), fs$1.lstat(file.target)]);
				await validateDirectoryIdentities(parentIdentities);
				if (!sameFileState(before, after) || !sameFileState(before, current)) throw new Error(`provisioned file changed while snapshotting: ${file.path}`);
				if (digest && digest.digest("hex") !== captured?.blob) throw new Error(`provisioned exact-state bytes changed after capture: ${file.path}`);
				states.push({
					path: file.path,
					mode: before.mode & 4095,
					chunks: chunkIndex
				});
			} finally {
				await handle.close();
			}
		}
		return states;
	} catch (error) {
		clearRegistryWorktreeProvisionedChunks(env, worktreeId);
		throw error;
	}
}
/** Restores provisioned bytes and modes from SQLite, never from the mutable source checkout. */
async function restoreProvisionedFiles(env, worktreeId, worktreePath, states, commitGuard) {
	for (const state of states) {
		const normalized = normalizeProvisionedRelativePath(state.path);
		if (!normalized || !await hasSafeParentDirectories(worktreePath, normalized)) throw new Error(`unsafe provisioned path: ${state.path}`);
		const target = resolveGitPath(worktreePath, normalized);
		if (state.mode === null) {
			if (await lstatIfExists(target)) throw new Error(`snapshot expected provisioned path to be absent: ${state.path}`);
			continue;
		}
		commitGuard?.();
		await fs$1.mkdir(path.dirname(target), { recursive: true });
		const parentIdentities = await captureParentDirectoryIdentities(worktreePath, normalized);
		commitGuard?.();
		const handle = await fs$1.open(target, constants.O_CREAT | constants.O_EXCL | constants.O_WRONLY | (constants.O_NOFOLLOW ?? 0), state.mode);
		try {
			await validateDirectoryIdentities(parentIdentities);
			for (let chunkIndex = 0; chunkIndex < state.chunks; chunkIndex += 1) {
				const chunk = await getRegistryWorktreeProvisionedChunk(env, {
					worktreeId,
					path: state.path,
					chunkIndex
				});
				if (!chunk) throw new Error(`provisioned snapshot chunk missing: ${state.path}:${chunkIndex}`);
				commitGuard?.();
				await writeFileWindowFully(handle, chunk, null, { assertBeforeMutation: commitGuard });
			}
			commitGuard?.();
			await handle.chmod(state.mode);
			await validateDirectoryIdentities(parentIdentities);
		} finally {
			await handle.close();
		}
	}
}
//#endregion
//#region src/agents/worktrees/snapshot-restore-exact.ts
const oid = string().regex(/^[a-f0-9]{40}(?:[a-f0-9]{24})?$/u);
const receiptSchema = object({
	version: literal(1),
	binding: string().regex(/^[a-f0-9]{64}$/u),
	snapshot: oid,
	nonce: string().uuid(),
	sourceIdentity: object({
		device: string().regex(/^\d+$/u),
		inode: string().regex(/^\d+$/u)
	}).strict()
}).strict();
const receiptRef = (record) => "refs/openclaw/restores/exact-v1/" + record.id;
const binding = (record) => createHash("sha256").update(JSON.stringify([
	record.id,
	record.createdAt,
	record.ownerKind,
	record.ownerId,
	record.repoRoot,
	record.path,
	record.branch
])).digest("hex");
/** A native Git receipt pins the immutable snapshot and the newly allocated inode before checkout. */
async function readExactRestoreReceipt(record, options) {
	const found = await runGit(record.repoRoot, [
		"rev-parse",
		"--verify",
		"--quiet",
		receiptRef(record) + "^{commit}"
	], options);
	if (found.code === 1) return;
	if (found.code !== 0) throw commandError("git rev-parse exact restore", found);
	const commit = found.stdout.trim();
	const receipt = receiptSchema.parse(JSON.parse((await requireGitBuffer(record.repoRoot, ["show", commit + ":manifest.json"], options)).toString("utf8")));
	if (receipt.binding !== binding(record) || await requireGit(record.repoRoot, ["rev-parse", commit + "^"], options) !== receipt.snapshot) throw new Error("Exact restore receipt ownership changed; source and snapshot preserved");
	return {
		...receipt,
		commit
	};
}
async function clearExactRestoreReceipt(record, receipt, options) {
	await requireGit(record.repoRoot, [
		"update-ref",
		"-d",
		receiptRef(record),
		receipt.commit
	], options);
}
async function createReceipt(record, snapshot, options) {
	options?.beforeRun?.();
	await fs$1.mkdir(path.dirname(record.path), { recursive: true });
	await fs$1.mkdir(record.path).catch((error) => {
		if (!hasErrnoCode(error, "EEXIST")) throw error;
	});
	if ((await fs$1.readdir(record.path)).length || (await listGitWorktrees(record.repoRoot)).some((entry) => entry.path === record.path)) throw new Error("Exact restore destination is occupied; source and snapshot preserved");
	const stat = await fs$1.lstat(record.path, { bigint: true });
	if (!stat.isDirectory()) throw new Error("Exact restore destination is not a directory");
	const receipt = {
		version: 1,
		binding: binding(record),
		snapshot,
		nonce: randomUUID(),
		sourceIdentity: {
			device: stat.dev.toString(),
			inode: stat.ino.toString()
		}
	};
	const blob = await requireGit(record.repoRoot, [
		"hash-object",
		"-w",
		"--stdin"
	], {
		...options,
		input: Buffer.from(JSON.stringify(receipt))
	});
	const tree = await requireGit(record.repoRoot, ["mktree", "-z"], {
		...options,
		input: Buffer.from("100644 blob " + blob + "	manifest.json\0")
	});
	const commit = await requireGit(record.repoRoot, [
		"commit-tree",
		tree,
		"-p",
		snapshot,
		"-m",
		"OpenClaw exact restore v1"
	], {
		...options,
		env: {
			...options?.env,
			GIT_AUTHOR_NAME: "OpenClaw",
			GIT_AUTHOR_EMAIL: "openclaw@localhost",
			GIT_COMMITTER_NAME: "OpenClaw",
			GIT_COMMITTER_EMAIL: "openclaw@localhost"
		}
	});
	await requireGit(record.repoRoot, [
		"update-ref",
		receiptRef(record),
		commit,
		"0".repeat(snapshot.length)
	], options);
	return {
		...receipt,
		commit
	};
}
async function restoreProvisionedAtomically(params) {
	const { record, metadata, temporaryRoot, assertCurrent } = params;
	const root$1 = path.join(temporaryRoot, "provisioned");
	await fs$1.mkdir(root$1, { recursive: true });
	await restoreProvisionedFiles(params.env, record.id, root$1, params.states, assertCurrent);
	const [sourceRoot, destinationRoot] = await Promise.all([root(root$1), root(record.path)]);
	for (const state of params.states) {
		assertCurrent();
		const target = path.join(record.path, state.path);
		const entry = metadata.files.find((file) => file.provisioned && Buffer.from(file.path, "hex").toString("utf8") === state.path);
		if (!entry) throw new Error("Exact restore lacks provisioned metadata");
		const existing = await rawPathStat(target);
		if (existing) {
			if (!existing.isFile() || state.mode === null) throw new Error("Exact restore provisioned path changed; source preserved");
			const opened = await destinationRoot.open(target, { hardlinks: "allow" });
			try {
				const digest = createHash(metadata.head.length === 64 ? "sha256" : "sha1").update("blob " + opened.stat.size + "\0");
				const buffer = Buffer.allocUnsafe(65536);
				for (;;) {
					const { bytesRead } = await opened.handle.read(buffer);
					if (!bytesRead) break;
					digest.update(buffer.subarray(0, bytesRead));
					assertCurrent();
				}
				if (digest.digest("hex") !== entry.blob) throw new Error("Exact restore provisioned bytes changed; source preserved");
			} finally {
				await opened.handle.close();
			}
		} else if (state.mode !== null) await destinationRoot.copyIn(target, {
			root: sourceRoot,
			relativePath: path.join(root$1, state.path)
		}, {
			overwrite: false,
			maxBytes: Infinity,
			preserveSourceMode: true,
			sourceHardlinks: "allow",
			mutationSymlinks: "reject",
			durable: false,
			assertBeforeMutation: assertCurrent
		});
	}
}
/** Resume only the receipt-owned incarnation; keep it and the snapshot on any interrupted attempt. */
async function restoreExactSnapshotFallback(params) {
	const { record, snapshot, metadata } = params;
	const receipt = await readExactRestoreReceipt(record, params.options) ?? await createReceipt(record, snapshot, params.options);
	if (receipt.snapshot !== snapshot) throw new Error("Exact restore snapshot changed; receipt and source preserved");
	const identity = {
		...metadata,
		sourceIdentity: receipt.sourceIdentity
	};
	const assertCurrent = () => {
		params.assertCurrent();
		assertExactStateSourceIdentity(record.path, identity);
	};
	const options = {
		...params.options,
		beforeRun: assertCurrent
	};
	assertCurrent();
	if (!(await listGitWorktrees(record.repoRoot)).some((entry) => entry.path === record.path)) {
		if ((await fs$1.readdir(record.path)).length) throw new Error("Incomplete exact restore registration; source and receipt preserved");
		assertCurrent();
		await params.add(assertCurrent);
	}
	await requireExactWorktreeRepository(record, record.path, options);
	return await withExactStateGitLocks(record, assertCurrent, async () => {
		await requireExactManagedWorktreeHead({
			...record,
			removedAt: void 0
		}, {
			ownerKind: record.ownerKind,
			ownerId: record.ownerId,
			createdAt: record.createdAt,
			lastActiveAt: record.lastActiveAt,
			head: metadata.head,
			branchHead: metadata.branchHead,
			indexSha256: metadata.indexSha256
		}, options);
		const temporaryRoot = path.join(record.path, ".openclaw-restore-" + receipt.nonce);
		if (metadata.files.some((entry) => Buffer.from(entry.path, "hex").toString("utf8").split("/")[0] === path.basename(temporaryRoot))) throw new Error("Exact restore temporary namespace conflicts with captured data");
		if (!await hasExactWorktreeIndex(record.path, metadata, options)) {
			assertCurrent();
			await fs$1.rm(temporaryRoot, {
				recursive: true,
				force: true
			});
			await restoreProvisionedAtomically({
				env: params.env,
				record,
				metadata,
				states: params.states,
				temporaryRoot,
				assertCurrent
			});
			await restoreExactStateMetadata({
				checkoutPath: record.path,
				metadata,
				options,
				assertCurrent,
				temporaryRoot
			});
		}
		assertCurrent();
		await fs$1.rm(temporaryRoot, {
			recursive: true,
			force: true
		});
		assertCurrent();
		const result = await params.finalize(identity);
		await clearExactRestoreReceipt(record, receipt, options);
		return result;
	});
}
//#endregion
//#region src/agents/worktrees/snapshot-host.ts
/** Existing snapshot worker and effect owners, supplied with this operation's Git policy. */
async function captureManagedWorktreeSnapshot(params) {
	const { record, env, provisionedPaths } = params;
	const exactState = params.exactState && params.retirementName ? {
		branch: record.branch,
		expected: params.exactState,
		retirementName: params.retirementName
	} : void 0;
	if (params.exactState && !exactState) throw new Error("Exact-state capture lacks retirement custody");
	return await runGitWorkerOperation({
		type: "worktree.snapshot",
		input: {
			worktreeId: record.id,
			checkoutPath: record.path,
			repoRoot: record.repoRoot,
			reason: params.reason,
			provisionedPaths,
			...exactState ? { exactState } : {}
		}
	}, {
		signal: params.signal,
		assertCurrent: params.assertCurrent,
		git: params.git.worker,
		onEffect: async (effect, { signal }) => {
			const assertCurrent = () => {
				signal.throwIfAborted();
				params.assertCurrent?.();
			};
			assertCurrent();
			switch (effect.type) {
				case "worktree.assert-current": return;
				case "worktree.snapshot-capacity":
					requireWorktreeDiskSpace([...effect.input.demands, ...effect.input.stateBytes === void 0 ? [] : [{
						path: resolveStateDir(env),
						bytes: effect.input.stateBytes
					}]], effect.input.purpose, true);
					return;
				case "worktree.snapshot-provisioned": return await snapshotProvisionedFiles(env, record.id, record.path, provisionedPaths, {
					signal,
					assertCurrent,
					expected: effect.input.expected
				});
			}
		}
	});
}
async function verifyManagedWorktreeExactSnapshot(params) {
	await runGitWorkerOperation({
		type: "worktree.snapshot-verify-exact",
		input: {
			worktreeId: params.record.id,
			checkoutPath: params.record.path,
			repoRoot: params.record.repoRoot,
			reason: "exact-state verification",
			provisionedPaths: params.provisionedPaths,
			exactState: {
				branch: params.record.branch,
				expected: params.expected,
				retirementName: params.retirementName
			},
			expectedDigest: params.expectedDigest
		}
	}, {
		signal: params.signal,
		assertCurrent: params.assertCurrent,
		git: params.git.worker,
		onEffect: async () => {
			params.signal?.throwIfAborted();
			params.assertCurrent();
		}
	});
}
function assertExactSnapshotRecordCurrent(env, original) {
	const current = getRegistryWorktree(env, original.id);
	if (!current || current.ownerKind !== original.ownerKind || current.ownerId !== original.ownerId || current.createdAt !== original.createdAt || current.lastActiveAt !== original.lastActiveAt || current.removedAt !== original.removedAt || current.path !== original.path || current.repoRoot !== original.repoRoot || current.repoFingerprint !== original.repoFingerprint || current.branch !== original.branch || current.snapshotRef !== original.snapshotRef) throw new Error("Exact-state recovery owner or lifecycle changed; source and snapshot preserved");
}
/** Local CLI retirement shares the same allocation owner as removal and GC. */
async function retireManagedWorktreeSnapshotById(params, env = process.env) {
	return await withWorktreeAllocationLease({
		...params,
		env
	}, async (guard) => {
		const record = getRegistryWorktree(env, params.id);
		if (!record || record.removedAt === void 0 || record.removedAt !== params.expectedRemovedAt || record.snapshotRef !== params.expectedSnapshotRef) throw new Error("Expected removed worktree snapshot identity does not match");
		await retireManagedWorktreeSnapshot({
			record,
			env,
			signal: guard.signal,
			assertCurrent: () => guard.commitGuard(),
			expected: params
		});
		return {
			retired: true,
			id: record.id
		};
	});
}
/** Preparation remains under the allocation owner; Git commits exact ref custody atomically. */
async function prepareExactSnapshotRetirement(params) {
	const { record, expected, signal, assertCurrent } = params;
	const ref = `refs/openclaw/snapshots/${record.id}`;
	if (expected.id !== record.id || expected.expectedSnapshotRef !== ref || record.snapshotRef !== ref || record.removedAt !== expected.expectedRemovedAt || !Number.isSafeInteger(expected.expectedRemovedAt) || expected.expectedRemovedAt < 0 || !/^(?:[a-f0-9]{40}|[a-f0-9]{64})$/u.test(expected.expectedSnapshotOid) || !/^(?:[a-f0-9]{40}|[a-f0-9]{64})$/u.test(expected.expectedRetainedSourceOid) || !/^refs\/(?:heads|remotes)\//u.test(expected.retainedSourceRef)) throw new Error("Invalid exact snapshot retirement identity or retained source ref");
	const options = {
		signal,
		beforeRun: assertCurrent,
		env: {
			GIT_NO_LAZY_FETCH: "1",
			GIT_NO_REPLACE_OBJECTS: "1",
			GIT_OPTIONAL_LOCKS: "0"
		}
	};
	await requireGit(record.repoRoot, ["check-ref-format", ref], options);
	await requireGit(record.repoRoot, ["check-ref-format", expected.retainedSourceRef], options);
	const repository = await resolveRepository(record.repoRoot);
	assertCurrent();
	if (repository.repoRoot !== record.repoRoot || repository.fingerprint !== record.repoFingerprint) throw new Error("Worktree snapshot repository identity changed");
	if (await worktreePathExists(record.path) || (await listGitWorktrees(record.repoRoot, options)).some((entry) => path.resolve(entry.path) === path.resolve(record.path))) throw new Error("Worktree snapshot still has a checkout or Git registration");
	for (const [reference, oid] of [[ref, expected.expectedSnapshotOid], [expected.retainedSourceRef, expected.expectedRetainedSourceOid]]) {
		if ((await runGit(record.repoRoot, [
			"symbolic-ref",
			"--quiet",
			reference
		], options)).code !== 1) throw new Error("Snapshot retirement requires direct, not symbolic, refs");
		if (await requireGit(record.repoRoot, [
			"show-ref",
			"--verify",
			"--hash",
			reference
		], options) !== oid) throw new Error("Snapshot retirement ref OID changed");
	}
	const pendingRef = `refs/openclaw/removals/${record.id}`;
	if ((await runGit(record.repoRoot, [
		"show-ref",
		"--verify",
		"--quiet",
		pendingRef
	], options)).code !== 1) throw new Error("Snapshot retirement has pending removal custody");
	if (await requireGit(record.repoRoot, ["rev-parse", `${expected.expectedSnapshotOid}^{tree}`], options) !== await requireGit(record.repoRoot, ["rev-parse", `${expected.expectedRetainedSourceOid}^{tree}`], options)) throw new Error("Snapshot contains source not covered by the retained commit");
	const parents = (await requireGit(record.repoRoot, [
		"rev-list",
		"--parents",
		"-n",
		"1",
		expected.expectedSnapshotOid
	], options)).split(" ");
	if (parents.length !== 2) throw new Error("Snapshot parent custody is unavailable");
	await requireGit(record.repoRoot, [
		"merge-base",
		"--is-ancestor",
		parents[1],
		expected.expectedRetainedSourceOid
	], options);
	assertCurrent();
	return async (assertProjectionCurrent) => {
		const beforeRun = () => {
			assertCurrent();
			assertProjectionCurrent();
		};
		if (await worktreePathExists(record.path) || (await listGitWorktrees(record.repoRoot, {
			...options,
			beforeRun
		})).some((entry) => path.resolve(entry.path) === path.resolve(record.path))) throw new Error("Worktree snapshot checkout or Git registration reappeared");
		await requireGit(record.repoRoot, ["update-ref", "--stdin"], {
			...options,
			beforeRun,
			input: `start\nverify ${expected.retainedSourceRef} ${expected.expectedRetainedSourceOid}\noption no-deref\nverify ${pendingRef} ${"0".repeat(expected.expectedSnapshotOid.length)}\noption no-deref\ndelete ${ref} ${expected.expectedSnapshotOid}\nprepare\ncommit\n`
		});
	};
}
/** Retire the restore entry point before releasing accepted projection custody. */
async function retireManagedWorktreeSnapshot(params) {
	const { record, env, signal } = params;
	if (params.expected) {
		const { localWorkspaceStore } = await import("./local-workspace-store-r2Rzt1km.mjs");
		const projectionStore = localWorkspaceStore(env);
		const assertCurrent = () => {
			params.assertCurrent();
			assertRegistrySnapshotRetirement(env, record);
			if (projectionStore.get(record.id)) throw new Error("Snapshot retains local workspace projection custody; preserve its recovery data");
		};
		assertCurrent();
		const retireSnapshot = await prepareExactSnapshotRetirement({
			record,
			expected: params.expected,
			signal,
			assertCurrent
		});
		const { expireLocalWorkspaceProjection } = await import("./local-workspace-projection-BA9KEiK6.mjs");
		await expireLocalWorkspaceProjection({
			worktree: record,
			env,
			assertCurrent,
			retireSnapshot
		});
		assertCurrent();
		deleteRegistryWorktree(env, record.id, {
			assertCurrent,
			expectedRetired: record
		});
		return;
	}
	const exactRecord = record.snapshotRef?.startsWith("refs/openclaw/snapshots/exact-");
	const expirationToken = exactRecord ? randomUUID() : void 0;
	let claimed = false;
	const assertCurrent = () => {
		params.assertCurrent();
		if (exactRecord) {
			assertExactSnapshotRecordCurrent(env, record);
			if (claimed && expirationToken) assertWorktreeRemovalClaim(env, record.id, expirationToken);
		}
	};
	if (exactRecord && !await worktreePathExists(record.repoRoot)) throw new Error("Exact-state source repository unavailable; recovery and registry preserved");
	if (expirationToken) {
		claimWorktreeRemoval(env, {
			worktreeId: record.id,
			token: expirationToken,
			retiredExact: true,
			assertCurrent
		});
		claimed = true;
	}
	try {
		const { expireLocalWorkspaceProjection } = await import("./local-workspace-projection-BA9KEiK6.mjs");
		await expireLocalWorkspaceProjection({
			worktree: record,
			env,
			assertCurrent,
			retireSnapshot: async (assertProjectionCurrent) => {
				const beforeRun = () => {
					assertCurrent();
					assertProjectionCurrent();
				};
				if (await worktreePathExists(record.repoRoot)) {
					if (record.snapshotRef) {
						const found = await runGit(record.repoRoot, [
							"rev-parse",
							"--verify",
							"--quiet",
							record.snapshotRef + "^{commit}"
						], {
							signal,
							beforeRun
						});
						if (found.code !== 0 && found.code !== 1) throw commandError("git rev-parse snapshot", found);
						const snapshot = found.code === 0 ? found.stdout.trim() : void 0;
						const exact = snapshot ? await readExactStateSnapshot(record.repoRoot, snapshot, record.snapshotRef, {
							signal,
							beforeRun
						}) : void 0;
						const assertNoLiveSource = () => {
							beforeRun();
							if (lstatSync(record.path, { throwIfNoEntry: false })) throw new Error("Exact-state source already moved back; source and snapshot preserved");
						};
						const registrations = exactRecord ? await listGitWorktrees(record.repoRoot) : [];
						if (exactRecord) {
							assertNoLiveSource();
							if (registrations.some((entry) => entry.path === record.path)) throw new Error("Exact-state live registration remains; source and snapshot preserved");
							if (!snapshot && !record.snapshotRef.startsWith("refs/openclaw/snapshots/exact-v1/")) throw new Error("Unsupported exact-state snapshot version; registry preserved");
						}
						if (exact) {
							const retained = path.join(path.dirname(record.path), exact.retirementName);
							const exists = await worktreePathExists(retained);
							const registered = registrations.some((entry) => entry.path === retained);
							if (exists !== registered) throw new Error("Exact-state retention source is incomplete; source and snapshot preserved");
							if (registered) await requireGit(record.repoRoot, [
								"worktree",
								"remove",
								"--force",
								"--",
								retained
							], {
								beforeRun: () => {
									assertNoLiveSource();
									assertExactStateSourceIdentity(retained, exact);
								},
								killProcessTree: true
							});
						}
						await requireGit(record.repoRoot, [
							"update-ref",
							"-d",
							record.snapshotRef,
							...snapshot ? [snapshot] : []
						], {
							signal,
							beforeRun: exactRecord ? assertNoLiveSource : beforeRun
						});
						if (exactRecord) {
							const receipt = await readExactRestoreReceipt(record, {
								signal,
								beforeRun: assertNoLiveSource
							});
							if (receipt) await clearExactRestoreReceipt(record, receipt, {
								signal,
								beforeRun: assertNoLiveSource
							});
						}
					}
					await requireGit(record.repoRoot, [
						"update-ref",
						"-d",
						"refs/openclaw/removals/" + record.id
					], {
						signal,
						beforeRun
					});
				}
			}
		});
		await removeUnusedEmptyWorktreeSource({
			env,
			record,
			signal,
			commitGuard: assertCurrent
		});
		assertCurrent();
		deleteRegistryWorktree(env, record.id, {
			assertCurrent,
			removalToken: expirationToken
		});
	} finally {
		if (expirationToken && claimed) abortWorktreeRemovalRow(env, record.id, expirationToken);
	}
}
//#endregion
export { verifyManagedWorktreeExactSnapshot as a, restoreExactSnapshotFallback as c, restoreProvisionedFiles as d, ensureEmptyWorktreeSource as f, retireManagedWorktreeSnapshotById as i, SNAPSHOT_CHUNK_BYTES as l, captureManagedWorktreeSnapshot as n, clearExactRestoreReceipt as o, removeUnusedEmptyWorktreeSource as p, retireManagedWorktreeSnapshot as r, readExactRestoreReceipt as s, assertExactSnapshotRecordCurrent as t, provisionIncludedFiles as u };
