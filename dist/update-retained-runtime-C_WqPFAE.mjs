import { n as resolveOpenClawPackageRoot } from "./openclaw-root-3-SBP6RS.mjs";
import { w as root } from "./fs-safe-CHQXnCPk.mjs";
import { r as isPathInside, t as hasNodeErrorCode } from "./path-guards-CH7noY0Z.mjs";
import { n as resolvePathViaExistingAncestorSync } from "./boundary-path-CAv_plX7.mjs";
import { t as hasErrnoCode } from "./errno-FR4CRyya.mjs";
import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { n as withRuntimeWorkerGeneration } from "./runtime-worker-generation-BjD_E12V.mjs";
import { t as resolveNativePackageProjectRoot } from "./update-native-package-owner-BSb9WTCB.mjs";
import { i as reportRetainedUpdateRuntime, n as registerRetainedUpdateRuntime, r as removeTemporaryArtifacts, t as maintainRetainedUpdateRuntimes } from "./temp-artifact-cleanup-DA2wQVhY.mjs";
import { t as collectPluginSafetyInspectedFiles } from "./plugin-safety-inspected-files-DEKZsJzd.mjs";
import { t as runTasksWithConcurrency } from "./run-with-concurrency-Dtu208ef.mjs";
import { n as withUpdateCandidateIoBudget } from "./update-candidate-io-pRtgvOhr.mjs";
import { a as relocateRuntimePath, r as relocateRuntimeEntry, t as prepareRuntimeRelocations } from "./update-runtime-relocation-CWWzARHh.mjs";
import { a as assertUpdateCandidatePluginEntryStat, c as resolveUpdateCandidatePluginTreeTargets, l as verifyUpdateCandidatePluginTree, o as assertUpdateCandidatePluginLinkTarget, r as prepareUpdateCandidatePluginTrees, s as publishUpdateCandidatePluginTreeLinks } from "./update-candidate-plugin-tree-QdBsMVPV.mjs";
import fs from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import fs$1 from "node:fs/promises";
import os from "node:os";
//#region src/infra/update-retained-runtime-tree.ts
const isRelocatedFile = (file) => path.basename(file) === ".modules.yaml" || path.basename(path.dirname(file)) === ".bin" && !file.endsWith(".exe");
const isLinkUnsupported = (error) => [
	"EXDEV",
	"EPERM",
	"EACCES",
	"ENOTSUP",
	"EOPNOTSUPP",
	"EMLINK",
	"ENOSYS"
].some((code) => hasNodeErrorCode(error, code));
/**
* Retain the admitted tree by hard-linking its files into the private directory.
*
* Retention only needs the inventoried inodes to outlive the installer's rename or
* unlink, so files share their inode with the source and bytes are copied only when
* the filesystem cannot preserve identity, a plugin boundary checks it, or relocation rewrites it.
* One walk performs the inventory check, publication, relocation, and escape check
* for every entry.
*/
async function linkUpdateCandidatePluginTrees(plan, params) {
	const targets = resolveUpdateCandidatePluginTreeTargets(plan, params);
	const { privateRoot, candidateRoot, hostLinks, relocations, destinationFor } = targets;
	const linkedInodes = /* @__PURE__ */ new Map();
	const assertEntryStat = (entry, current) => {
		const expected = entry.kind === "file" && linkedInodes.has(`${entry.dev}:${entry.ino}`) ? {
			...entry,
			ctimeNs: linkedInodes.get(`${entry.dev}:${entry.ino}`)
		} : entry;
		assertUpdateCandidatePluginEntryStat(expected, current);
	};
	const assertEntry = async (entry) => {
		await params.onProgress?.();
		assertEntryStat(entry, await fs$1.lstat(entry.path, { bigint: true }));
		if (entry.kind === "symlink" && await fs$1.readlink(entry.path) !== entry.link) throw new Error(`Plugin entry changed after snapshot inventory: ${entry.path}`);
	};
	for (const entry of plan.entries) if (path.basename(entry.path) === "openclaw.plugin.json") await assertEntry(entry);
	const pluginFiles = collectPluginSafetyInspectedFiles(plan.entries);
	await targets.assertBindings();
	params.assertCurrent();
	await fs$1.mkdir(privateRoot, {
		recursive: true,
		mode: 448
	});
	const preparedDirectories = /* @__PURE__ */ new Set([privateRoot]);
	const preparingDirectories = /* @__PURE__ */ new Map();
	const prepareDirectory = async (directory, mode) => {
		if (preparedDirectories.has(directory)) return;
		let preparing = preparingDirectories.get(directory);
		if (!preparing) {
			params.assertCurrent();
			preparing = fs$1.mkdir(directory, {
				recursive: true,
				mode
			}).then(() => {
				preparedDirectories.add(directory);
				preparingDirectories.delete(directory);
			});
			preparingDirectories.set(directory, preparing);
		}
		await preparing;
	};
	let destinationRoot;
	const copyEntry = async (entry, destination) => {
		await (await (destinationRoot ??= root(privateRoot))).copyIn(path.relative(privateRoot, destination), entry.path, {
			overwrite: false,
			mkdir: false,
			durable: false,
			clone: "auto",
			maxBytes: entry.size,
			mode: entry.mode | 384,
			sourceHardlinks: "allow",
			assertBeforeMutation: () => {
				params.assertCurrent();
				assertEntryStat(entry, fs.lstatSync(entry.path, { bigint: true }));
			}
		});
		await assertEntry(entry);
		await relocateRuntimeEntry(destination, entry.path, destination, "file", relocations, params.assertCurrent);
		if ((entry.mode & 384) !== 384) {
			params.assertCurrent();
			await fs$1.chmod(destination, entry.mode);
		}
	};
	const copyDevices = /* @__PURE__ */ new Map();
	const requiresCopy = async (entry) => {
		if (process.platform !== "linux") return false;
		let copy = copyDevices.get(entry.dev);
		if (copy === void 0) {
			copy = (await fs$1.statfs(entry.path)).type === 2035054128;
			copyDevices.set(entry.dev, copy);
		}
		return copy;
	};
	const counts = {
		linked: 0,
		copied: 0
	};
	const directories = [];
	const materialize = async (entry) => {
		await assertEntry(entry);
		const destination = destinationFor(entry.path);
		const directory = entry.kind === "directory" ? destination : path.dirname(destination);
		await prepareDirectory(directory, entry.kind === "directory" ? entry.mode | 448 : 448);
		if (entry.kind === "directory") {
			directories.push(entry);
			return;
		}
		if (entry.kind === "symlink") {
			params.assertCurrent();
			await fs$1.symlink(entry.link, destination, entry.linkType);
			await relocateRuntimeEntry(destination, entry.path, destination, "symlink", relocations, params.assertCurrent);
			assertUpdateCandidatePluginLinkTarget(destination, path.resolve(path.dirname(destination), await fs$1.readlink(destination)), {
				privateRoot,
				candidateRoot
			});
			return;
		}
		if (pluginFiles.has(entry.path) || isRelocatedFile(destination) || await requiresCopy(entry)) {
			await copyEntry(entry, destination);
			counts.copied += 1;
			return;
		}
		params.assertCurrent();
		try {
			await fs$1.link(entry.path, destination);
		} catch (error) {
			if (!isLinkUnsupported(error)) throw error;
			await copyEntry(entry, destination);
			counts.copied += 1;
			return;
		}
		const linked = await fs$1.lstat(destination, { bigint: true });
		if (!linked.isFile() || linked.dev.toString() !== entry.dev || linked.ino.toString() !== entry.ino) throw new Error(`Retained runtime entry does not reference its inventoried file: ${entry.path}`);
		assertUpdateCandidatePluginEntryStat({
			...entry,
			ctimeNs: linked.ctimeNs.toString()
		}, linked);
		linkedInodes.set(`${entry.dev}:${entry.ino}`, linked.ctimeNs.toString());
		counts.linked += 1;
	};
	const files = [];
	const inodes = /* @__PURE__ */ new Set();
	const drain = async () => {
		const result = await runTasksWithConcurrency({
			tasks: files.map((entry) => () => materialize(entry)),
			limit: 4,
			errorMode: "stop"
		});
		if (result.hasError) throw result.firstError;
		files.length = 0;
		inodes.clear();
	};
	for (const entry of plan.entries) {
		const inode = `${entry.dev}:${entry.ino}`;
		if (files.length && (entry.kind !== "file" || files.length === 4 || inodes.has(inode))) await drain();
		if (entry.kind === "file") {
			files.push(entry);
			inodes.add(inode);
		} else await materialize(entry);
	}
	if (files.length) await drain();
	await targets.assertBindings();
	const privateAliases = await publishUpdateCandidatePluginTreeLinks({
		privateRoot,
		candidateRoot,
		hostLinks,
		aliases: targets.aliases,
		assertBeforeMutation: params.assertCurrent
	});
	for (const alias of privateAliases) await verifyUpdateCandidatePluginTree(alias, {
		privateRoot,
		candidateRoot,
		hostLinks
	});
	for (const entry of directories.toSorted((left, right) => right.path.length - left.path.length)) {
		params.assertCurrent();
		await fs$1.chmod(destinationFor(entry.path), entry.mode);
	}
	return counts;
}
//#endregion
//#region src/infra/update-retained-runtime.ts
/** The command retains its own workers through reporting, rollback, and native settlement. */
async function withRetainedUpdateRuntime(moduleUrl, operation) {
	let directory;
	let prepared = false;
	let closing = false;
	let preparation;
	let unregister;
	return await withRuntimeWorkerGeneration(async (bind) => await operation((params) => {
		preparation = (async () => {
			const { mutationRoots, installTarget, env, timeoutMs } = params;
			const assertCurrent = () => {
				if (closing) throw new Error("The updater's retained runtime is closing");
				params.assertCurrent();
			};
			assertCurrent();
			if (prepared) return;
			const root = await resolveOpenClawPackageRoot({ moduleUrl });
			if (!root) throw new Error("Cannot retain the running updater's package root");
			const sourceRoot = await fs$1.realpath(root);
			assertCurrent();
			const mutations = mutationRoots.map((entry) => resolvePathViaExistingAncestorSync(path.resolve(entry)));
			if (!mutations.some((entry) => isPathInside(entry, sourceRoot) || isPathInside(sourceRoot, entry))) return;
			await maintainRetainedUpdateRuntimes({
				packageRoots: [sourceRoot],
				repair: true,
				assertCurrent
			});
			assertCurrent();
			const packageOwner = installTarget ? resolveNativePackageProjectRoot(installTarget, env) ?? installTarget.globalRoot : void 0;
			const boundaries = [
				sourceRoot,
				...mutations,
				...packageOwner ? [resolvePathViaExistingAncestorSync(path.resolve(packageOwner))] : []
			];
			let parent = path.dirname(sourceRoot);
			while (boundaries.some((entry) => isPathInside(entry, parent))) {
				const ancestor = path.dirname(parent);
				if (ancestor === parent) break;
				parent = ancestor;
			}
			const outsideMutation = (candidate) => !boundaries.some((entry) => isPathInside(entry, candidate));
			if ((installTarget || !sourceRoot.split(path.sep).includes("node_modules")) && outsideMutation(parent)) {
				const sourceStat = await fs$1.stat(sourceRoot);
				assertCurrent();
				try {
					const parentStat = await fs$1.stat(parent);
					if (sourceStat.dev === parentStat.dev) {
						directory = await fs$1.mkdtemp(path.join(parent, "openclaw-update-runtime-"));
						unregister = registerRetainedUpdateRuntime(directory);
					}
				} catch (error) {
					if (![
						"EACCES",
						"EPERM",
						"EROFS",
						"ENOENT",
						"ENOTDIR",
						"ENOSPC",
						"EDQUOT"
					].some((code) => hasErrnoCode(error, code))) throw error;
				}
			}
			if (!directory) {
				const temporary = resolvePathViaExistingAncestorSync(path.resolve(os.tmpdir()));
				if (!outsideMutation(temporary)) throw new Error("Updater temporary directory is inside an installation being replaced");
				assertCurrent();
				directory = await fs$1.mkdtemp(path.join(temporary, "openclaw-update-runtime-"));
				unregister = registerRetainedUpdateRuntime(directory);
			}
			const privateRoot = await fs$1.realpath(directory);
			assertCurrent();
			if (!outsideMutation(privateRoot)) throw new Error("Retained updater directory overlaps an installation being replaced");
			const project = (source) => {
				const base = path.parse(source).root;
				return path.join(privateRoot, "tree", Buffer.from(base).toString("hex"), path.relative(base, source));
			};
			const candidateRoot = project(sourceRoot);
			const roots = /* @__PURE__ */ new Map();
			for (const name of [
				"package.json",
				"dist",
				"node_modules"
			]) {
				const entry = path.join(sourceRoot, name);
				const present = await fs$1.lstat(entry).catch((error) => {
					if (hasErrnoCode(error, "ENOENT")) return;
					throw error;
				});
				assertCurrent();
				if (present) roots.set(entry, project(entry));
			}
			const inventoryStartedAt = performance.now();
			const plan = await prepareUpdateCandidatePluginTrees({
				roots,
				project,
				targetStateDir: privateRoot,
				candidateRoot,
				retainedHostRoot: sourceRoot,
				onProgress: assertCurrent
			});
			const inventoryMs = Math.round(performance.now() - inventoryStartedAt);
			const materializationStartedAt = performance.now();
			const counts = await withUpdateCandidateIoBudget({
				directory: privateRoot,
				bytes: plan.bytes,
				timeoutMs
			}, async (signal) => await linkUpdateCandidatePluginTrees(plan, {
				targetStateDir: privateRoot,
				candidateRoot,
				onProgress: () => {
					signal.throwIfAborted();
				},
				assertCurrent: () => {
					signal.throwIfAborted();
					assertCurrent();
				}
			}));
			const materializationMs = Math.round(performance.now() - materializationStartedAt);
			assertCurrent();
			const relocations = prepareRuntimeRelocations([...plan.relocations, ...root === sourceRoot ? [] : [{
				sourceRoot: root,
				destinationRoot: candidateRoot
			}]].map((entry) => Object.freeze({ ...entry })));
			const resolve = (url) => pathToFileURL(relocateRuntimePath(fileURLToPath(url), relocations));
			bind(resolve);
			prepared = true;
			return {
				inventoryMs,
				materializationMs,
				entries: plan.entries.length,
				estimatedBytes: plan.bytes,
				...counts
			};
		})();
		return preparation;
	}), async () => {
		closing = true;
		await preparation?.catch(() => void 0);
		const retained = directory;
		if (retained) await removeTemporaryArtifacts(retained, "Updater runtime", (error) => {
			reportRetainedUpdateRuntime(retained, `cleanup failed: ${formatErrorMessage(error)}`);
		});
		unregister?.();
	}, (reason) => {
		if (directory) reportRetainedUpdateRuntime(directory, reason);
		return directory;
	});
}
//#endregion
export { withRetainedUpdateRuntime };
