import { u as toErrorObject } from "./error-coercion-1P2One0X.mjs";
import { t as createDeferredCore } from "./deferred-D0La5CRk.mjs";
import { o as resolveUserPath } from "./home-dir-CjKH62jd.mjs";
import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { p as normalizeTrimmedStringList } from "./string-normalization-YMwDjufr.mjs";
import { t as CONFIG_DIR } from "./utils-DUAwk2p5.mjs";
import { r as isPathInside } from "./path-guards-CH7noY0Z.mjs";
import { r as resolveRealpathOrAbsolute } from "./boundary-path-CAv_plX7.mjs";
import { t as hasErrnoCode } from "./errno-FR4CRyya.mjs";
import { s as isDefaultStateDir } from "./paths-CtO6iw0c.mjs";
import { t as createSubsystemLogger } from "./subsystem-CeqVSEVi.mjs";
import { n as ok, t as err } from "./result-BQGgYouL.mjs";
import { s as getGatewayRestartDrainSignal } from "./gateway-work-admission-B4bQUVQ6.mjs";
import { i as getAgentWorkspaceAccess } from "./workspace-access-DIRgQG5g.mjs";
import { n as resolveWorkspaceSkillDirectories, t as normalizeWorkspaceSkillRoots } from "./workspace-skill-roots-CFHkU9qW.mjs";
import { a as markSkillsSupportingFilesChanged, f as suspendSkillsSnapshotSources, l as resetSkillsRefreshStateForTest, o as notifySkillsWatchAvailable, t as bumpSkillsSnapshotVersion, u as setSkillsChangeListenerErrorHandler } from "./refresh-state-Cazo5oir.mjs";
import { n as resolveWorkshopWatchRoots } from "./skills-root-CYPE5f0c.mjs";
import { t as areOrderedArraysEqual } from "./ordered-array-equality-CBhMoHgO.mjs";
import { c as tryRealpath, s as resolveAllowedSkillSymlinkTargetRealPaths } from "./skill-paths-BcXtEU9H.mjs";
import { n as resolveWorkspaceSkillSourcePlan, r as splitSkillSourcePlan } from "./workspace-skill-sources-cANwnBQq.mjs";
import { i as resolvePluginSkillRootsFromMetadata, r as resolvePluginSkillRoots } from "./plugin-skills-CNjaoQjW.mjs";
import { t as getFileWatchCapacityCode } from "./fs-watch-errors-D0zoLJOB.mjs";
import fs from "node:fs";
import path from "node:path";
import { AsyncLocalStorage } from "node:async_hooks";
import fs$1 from "node:fs/promises";
import os from "node:os";
import { EventEmitter } from "node:events";
import chokidar from "chokidar";
//#region src/skills/runtime/refresh-watch-close.ts
const pendingWatcherCloses = /* @__PURE__ */ new Set();
function trackSkillsWatcherClose(close) {
	const closing = (async () => {
		try {
			await close();
			return ok(void 0);
		} catch (error) {
			return err(error);
		}
	})();
	pendingWatcherCloses.add(closing);
	closing.then(() => pendingWatcherCloses.delete(closing));
	return closing;
}
function teardownSkillsPathWatcher(state) {
	const watcher = state.watcher;
	watcher.add = () => watcher;
	clearTimeout(state.timer);
	return trackSkillsWatcherClose(async () => {
		const wasClosed = watcher.closed;
		let closed;
		try {
			closed = watcher.close();
		} finally {
			if (!wasClosed) watcher.on("error", () => {});
		}
		await closed;
	});
}
async function joinSkillsWatcherCloses() {
	await Promise.all(pendingWatcherCloses);
}
//#endregion
//#region src/skills/runtime/refresh-watch-path.ts
function isTrustedSymlinkSkillTarget(source, rootRealPath, targetRealPath, allowedSymlinkTargetRealPaths) {
	if (source === "openclaw-managed" || source === "agents-skills-personal") return true;
	return isPathInside(rootRealPath, targetRealPath) || allowedSymlinkTargetRealPaths.some((root) => isPathInside(root, targetRealPath));
}
function toWatchRoot(raw) {
	const normalized = raw.replaceAll("\\", "/");
	const root = path.parse(normalized).root;
	const trimmed = normalized.replace(/\/+$/, "");
	return trimmed.length < root.length ? root : trimmed;
}
function resolveSkillsWatchPath(raw) {
	if (process.platform !== "win32") return raw;
	const absolute = path.resolve(raw);
	const root = path.parse(absolute).root;
	const parts = absolute.slice(root.length).split(path.sep);
	let cursor = root;
	let index = 0;
	for (const part of parts) {
		const next = path.join(cursor, part);
		try {
			if (fs.lstatSync(next).isSymbolicLink()) break;
		} catch {
			break;
		}
		cursor = next;
		index += 1;
	}
	try {
		const resolved = fs.realpathSync.native(cursor);
		return fs.existsSync(resolved) ? path.join(resolved, ...parts.slice(index)) : raw;
	} catch {
		return raw;
	}
}
const DEFAULT_SKILLS_WATCH_IGNORED = [
	/(^|[\\/])\.git([\\/]|$)/,
	/(^|[\\/])node_modules([\\/]|$)/,
	/(^|[\\/])dist([\\/]|$)/,
	/(^|[\\/])\.venv([\\/]|$)/,
	/(^|[\\/])venv([\\/]|$)/,
	/(^|[\\/])__pycache__([\\/]|$)/,
	/(^|[\\/])\.mypy_cache([\\/]|$)/,
	/(^|[\\/])\.pytest_cache([\\/]|$)/,
	/(^|[\\/])build([\\/]|$)/,
	/(^|[\\/])\.cache([\\/]|$)/
];
function shouldIgnoreSkillsWatchPath(watchPath, stats, usePolling = false) {
	if (DEFAULT_SKILLS_WATCH_IGNORED.some((re) => re.test(watchPath))) return true;
	if (!stats || stats.isDirectory?.() || stats.isSymbolicLink?.()) return false;
	return !usePolling || !isSkillDiscoveryFileWatchPath(watchPath);
}
function isSkillDiscoveryFileWatchPath(watchPath) {
	const basename = path.posix.basename(watchPath.replaceAll("\\", "/"));
	return (basename === "SKILL.md" || basename === "source-origin.json") && !DEFAULT_SKILLS_WATCH_IGNORED.some((re) => re.test(watchPath));
}
function getRawWatchedPath(details) {
	return isRecord(details) && typeof details.watchedPath === "string" ? details.watchedPath : void 0;
}
function rawPathToString(rawPath) {
	const decoded = Buffer.isBuffer(rawPath) ? rawPath.toString() : rawPath;
	return typeof decoded === "string" ? decoded || void 0 : void 0;
}
function resolveRawSkillsWatchPath(rawPath, details) {
	if (path.isAbsolute(rawPath)) return rawPath;
	const watchedPath = getRawWatchedPath(details);
	return watchedPath ? path.join(watchedPath, rawPath) : void 0;
}
function createSkillsWatchPathFilter(root, usePolling) {
	const directorySymlinks = /* @__PURE__ */ new Set();
	const contains = (watchPath) => isPathInside(root, watchPath) || isPathInside(watchPath, root);
	const isSupportingPath = (watchPath) => isPathInside(root, watchPath) && !DEFAULT_SKILLS_WATCH_IGNORED.some((re) => re.test(watchPath));
	return {
		isSupportingPath,
		isStructuralRaw: (event, rawPath, details) => {
			const name = rawPathToString(rawPath);
			const changedPath = name ? resolveRawSkillsWatchPath(name, details) : getRawWatchedPath(details);
			if (changedPath && !isSupportingPath(changedPath)) return false;
			if (!name || !changedPath) return true;
			if (!usePolling) return event !== "change";
			return [isRecord(details) ? details.curr : void 0, isRecord(details) ? details.prev : void 0].some((stats) => !isRecord(stats) || typeof stats.isDirectory !== "function" || stats.isDirectory());
		},
		ignored: (watchPath, stats) => {
			if (shouldIgnoreSkillsWatchPath(watchPath, stats, usePolling) || !contains(watchPath)) return true;
			if (stats?.isSymbolicLink?.()) try {
				if (fs.statSync(watchPath).isDirectory()) directorySymlinks.add(toWatchRoot(watchPath));
			} catch {}
			return false;
		},
		isRelevant: (event, changedPath) => {
			const symlinkKey = toWatchRoot(changedPath);
			const directorySymlink = directorySymlinks.has(symlinkKey);
			if (event === "unlink") directorySymlinks.delete(symlinkKey);
			return (isSkillDiscoveryFileWatchPath(changedPath) || event === "addDir" || event === "unlinkDir" || directorySymlink) && !DEFAULT_SKILLS_WATCH_IGNORED.some((re) => re.test(changedPath)) && contains(changedPath);
		}
	};
}
function resolveSkillsWatcherUsePolling() {
	const envPolling = process.env.CHOKIDAR_USEPOLLING;
	if (envPolling === void 0) return process.platform === "os400" || Boolean(process.versions.bun);
	const normalized = envPolling.toLowerCase();
	return Boolean(normalized) && normalized !== "false" && normalized !== "0";
}
function makeSkillsWatchTarget(raw, depth, previousWatchRoot) {
	const watchPath = toWatchRoot(previousWatchRoot ? raw : resolveSkillsWatchPath(raw));
	let watchRoot = watchPath;
	while (!fs.existsSync(watchRoot)) {
		const parent = path.dirname(watchRoot);
		if (parent === watchRoot) break;
		watchRoot = parent;
	}
	if (previousWatchRoot && previousWatchRoot !== watchRoot && isPathInside(previousWatchRoot, watchRoot)) {
		let cursor = previousWatchRoot;
		const parts = path.relative(previousWatchRoot, watchRoot).split(path.sep).filter(Boolean);
		for (const part of ["", ...parts]) {
			cursor = path.join(cursor, part);
			try {
				if (!fs.lstatSync(cursor).isSymbolicLink()) continue;
			} catch {}
			watchRoot = path.dirname(cursor);
			while (!fs.existsSync(watchRoot) && path.dirname(watchRoot) !== watchRoot) watchRoot = path.dirname(watchRoot);
			break;
		}
	}
	return {
		path: watchPath,
		watchRoot: toWatchRoot(watchRoot),
		depth
	};
}
function resolveSkillsWatchAncestors(target, previousAncestorRoot) {
	const ancestorRoot = isPathInside(previousAncestorRoot, target.watchRoot) ? previousAncestorRoot : target.watchRoot;
	const ancestorRoots = [];
	let currentRoot = target.watchRoot;
	while (isPathInside(ancestorRoot, currentRoot)) {
		if (currentRoot !== target.path) ancestorRoots.push(currentRoot);
		const parent = toWatchRoot(path.dirname(currentRoot));
		if (parent === currentRoot) break;
		currentRoot = parent;
	}
	return {
		ancestorRoot,
		ancestorRoots
	};
}
function readBudgetedDirEntries(dir, maxEntries) {
	const entries = [];
	const limit = Math.max(0, maxEntries);
	let handle;
	try {
		handle = fs.opendirSync(dir);
		for (let scanned = 0; scanned < limit; scanned += 1) {
			const entry = handle.readSync();
			if (!entry) return {
				ok: true,
				entries,
				scannedEntryCount: scanned
			};
			entries.push(entry);
		}
		return {
			ok: true,
			entries,
			scannedEntryCount: limit
		};
	} catch {
		return {
			ok: false,
			scannedEntryCount: 0
		};
	} finally {
		handle?.closeSync();
	}
}
//#endregion
//#region src/skills/runtime/refresh-ancestor-native.ts
var SkillsNativeWatchInvalidatedError = class extends Error {};
function isNativeSkillsStructuralChange(changedPath) {
	try {
		const state = fs.lstatSync(changedPath);
		return state.isDirectory() || state.isSymbolicLink();
	} catch {
		return true;
	}
}
function readDirectoryState(watchRoot, entryParent) {
	const state = entryParent ? fs.statSync(watchRoot, { bigint: true }) : fs.lstatSync(watchRoot, { bigint: true });
	if (!state.isDirectory()) throw new SkillsNativeWatchInvalidatedError(`Skills content watch requires a directory: ${watchRoot}`);
	return state;
}
function readRootState(watchRoot, entryParent = false) {
	try {
		return readDirectoryState(watchRoot, entryParent);
	} catch {
		return;
	}
}
function sameRootIdentity(left, right) {
	return left !== void 0 && right !== void 0 && left.dev === right.dev && left.ino === right.ino;
}
function sameRootState(left, right) {
	return left !== void 0 && right !== void 0 && sameRootIdentity(left, right) && left.mode === right.mode && left.uid === right.uid && left.gid === right.gid && left.ctimeNs === right.ctimeNs;
}
var NativeSkillsAncestorWatcher = class extends EventEmitter {
	get admitted() {
		return !this.closed && !this.failed;
	}
	get admittedIdentity() {
		return this.admitted ? this.identity : void 0;
	}
	constructor(watchRoot, ignored, rearm, admission) {
		super();
		this.closed = false;
		this.failed = false;
		this.closure = createDeferredCore();
		const requireExactRoot = admission !== "ancestor";
		const entryParent = admission === "entry-parent";
		try {
			let observationRoot = watchRoot;
			for (;;) {
				let state;
				try {
					state = requireExactRoot ? readDirectoryState(observationRoot, entryParent) : fs.lstatSync(observationRoot, { bigint: true });
				} catch (error) {
					if (requireExactRoot || !hasErrnoCode(error, "ENOENT") && !hasErrnoCode(error, "ENOTDIR")) throw error;
				}
				if (state?.isDirectory()) break;
				const parent = path.dirname(observationRoot);
				if (parent === observationRoot) throw new Error(`No directory can observe Skills root: ${watchRoot}`);
				observationRoot = parent;
			}
			const snapshot = requireExactRoot ? readDirectoryState : readRootState;
			const before = snapshot(observationRoot, entryParent);
			const nativeRootPath = path.toNamespacedPath(observationRoot);
			const rootName = path.basename(observationRoot);
			this.watcher = fs.watch(observationRoot, (event, filename) => {
				if (this.closed || this.failed) return;
				const name = rawPathToString(filename);
				const explicitRootChange = !name || event === "rename" && name === nativeRootPath;
				const currentRoot = !explicitRootChange && (event === "rename" || name === rootName) ? readRootState(observationRoot, entryParent) : void 0;
				const rootChanged = explicitRootChange || event === "rename" && !sameRootIdentity(registeredIdentity, currentRoot) || name === rootName && !sameRootState(registeredRoot, currentRoot);
				const details = { watchedPath: observationRoot };
				const changedPath = rootChanged ? observationRoot : resolveRawSkillsWatchPath(name, details);
				if (!changedPath) return;
				const reconcileEntry = process.platform === "win32" && !rootChanged;
				if (reconcileEntry) this.emit("reconcile", changedPath, event !== "change" || isNativeSkillsStructuralChange(changedPath));
				if (this.closed || this.failed || ignored(changedPath)) return;
				if (!reconcileEntry) this.emit("all", event === "rename" || rootChanged ? "ancestor" : "change", changedPath);
				if (!this.closed && !this.failed) this.emit("raw", event, filename, details);
				if (!this.closed && !this.failed && (rootChanged || observationRoot !== watchRoot && readRootState(watchRoot, entryParent))) rearm();
			});
			this.watcher.on("close", () => this.closure.resolve());
			this.watcher.on("error", (error) => {
				this.failed = true;
				this.closure.resolve();
				if (this.closed) return;
				if (process.platform === "win32" && error.code === "EPERM") try {
					if (entryParent) fs.statSync(observationRoot);
					else fs.lstatSync(observationRoot);
				} catch (stateError) {
					if (hasErrnoCode(stateError, "ENOENT") || hasErrnoCode(stateError, "ENOTDIR")) {
						this.emit("all", "ancestor", observationRoot);
						if (!this.closed) rearm();
						return;
					}
				}
				this.emit("error", error);
			});
			const after = snapshot(observationRoot, entryParent);
			const registeredIdentity = sameRootIdentity(before, after) ? after : void 0;
			if (requireExactRoot && !registeredIdentity) throw new SkillsNativeWatchInvalidatedError(`Skills directory changed during native registration: ${watchRoot}`);
			this.identity = registeredIdentity;
			const registeredRoot = sameRootState(before, after) ? after : void 0;
			queueMicrotask(() => {
				if (this.closed || this.failed) return;
				if (observationRoot !== watchRoot && readRootState(watchRoot, entryParent)) {
					rearm();
					return;
				}
				this.emit("ready");
			});
		} catch (error) {
			this.failed = true;
			if (this.watcher) this.closing = trackSkillsWatcherClose(() => {
				this.watcher.close();
				return this.closure.promise;
			});
			else this.closure.resolve();
			queueMicrotask(() => {
				if (!this.closed) this.emit("error", error);
			});
		}
	}
	close() {
		this.closed = true;
		this.removeAllListeners();
		if (this.closing) return this.closing;
		this.closing = trackSkillsWatcherClose(() => {
			this.watcher?.close();
			return this.closure.promise;
		});
		return this.closing;
	}
};
function createNativeSkillsAncestorWatcher(watchRoot, ignored, rearm, admission = "ancestor") {
	return new NativeSkillsAncestorWatcher(watchRoot, ignored, rearm, admission);
}
//#endregion
//#region src/skills/runtime/refresh-content-native.ts
function sameEntry(left, right) {
	return left !== void 0 && right !== void 0 && left.kind === right.kind && left.identity.dev === right.identity.dev && left.identity.ino === right.identity.ino && (left.kind === "directory" || left.identity.ctimeNs === right.identity.ctimeNs && left.target === right.target);
}
function missing(error) {
	return hasErrnoCode(error, "ENOENT") || hasErrnoCode(error, "ENOTDIR");
}
function readSymlinkEntry(candidate, identity) {
	if (!identity.isSymbolicLink()) return;
	try {
		return {
			kind: "symlink",
			identity,
			target: fs.readlinkSync(candidate)
		};
	} catch (error) {
		if (missing(error) || hasErrnoCode(error, "EINVAL")) return;
		throw error;
	}
}
function sameDirectory(left, right) {
	return left !== void 0 && right.isDirectory() && left.dev === right.dev && left.ino === right.ino;
}
var NativeSkillsContentWatcher = class extends EventEmitter {
	constructor(root, depth, ignored) {
		super();
		this.root = root;
		this.depth = depth;
		this.ignored = ignored;
		this.closed = false;
		this.failed = false;
		this.ready = false;
		this.dirty = false;
		this.registrations = /* @__PURE__ */ new Map();
		this.entries = /* @__PURE__ */ new Map();
		this.retired = /* @__PURE__ */ new Set();
		queueMicrotask(() => this.rescan());
	}
	get directories() {
		return new Set(this.registrations.keys());
	}
	owns(directory, registration) {
		return !this.closed && this.registrations.get(directory) === registration;
	}
	retire(directory, descendants = true) {
		for (const [candidate, registration] of this.registrations) {
			if (candidate !== directory && (!descendants || !isPathInside(directory, candidate))) continue;
			this.registrations.delete(candidate);
			const closing = registration.watcher.close();
			this.retired.add(closing);
			closing.then((result) => {
				if (!result.ok) this.retirementFailure ??= result;
				this.retired.delete(closing);
			});
		}
	}
	acquire(directory, identity, entryParent) {
		const previous = this.registrations.get(directory);
		if (previous && sameDirectory(previous.watcher.admittedIdentity, identity)) return previous;
		if (previous) this.retire(directory);
		const watcher = createNativeSkillsAncestorWatcher(directory, this.ignored, () => {
			if (this.owns(directory, registration)) {
				this.retire(directory);
				this.rescan();
			}
		}, entryParent ? "entry-parent" : "directory");
		const registration = {
			watcher,
			entryParent
		};
		this.registrations.set(directory, registration);
		watcher.on("reconcile", (changedPath, structural) => {
			if (!this.owns(directory, registration) || !structural && !this.entries.has(toWatchRoot(changedPath))) return;
			this.emit("dirty");
			if (this.owns(directory, registration)) this.rescan();
		});
		watcher.on("all", (event, changedPath) => {
			if (!this.owns(directory, registration)) return;
			if (event === "ancestor" && changedPath === directory) this.emit("all", "unlinkDir", directory);
			else if (event === "change" && this.isStructuralChange(changedPath)) this.rescan();
		});
		watcher.on("raw", (event, filename, details) => {
			if (!this.owns(directory, registration)) return;
			this.emit("raw", event, filename, details);
			if (this.owns(directory, registration) && (event !== "change" || !filename)) this.rescan();
		});
		watcher.on("error", (error) => {
			if (this.owns(directory, registration)) {
				this.retire(directory);
				if (!entryParent && directory !== this.root && (missing(error) || error instanceof SkillsNativeWatchInvalidatedError)) this.rescan();
				else this.fail(error);
			}
		});
		return registration;
	}
	isStructuralChange(changedPath) {
		return this.entries.has(toWatchRoot(changedPath)) || isNativeSkillsStructuralChange(changedPath);
	}
	fail(error) {
		if (!this.closed) {
			this.failed = true;
			this.emit("error", error);
		}
	}
	readRootState() {
		try {
			return fs.lstatSync(this.root, { bigint: true });
		} catch (error) {
			if (!missing(error)) throw error;
			const parent = toWatchRoot(path.dirname(this.root));
			const registration = this.registrations.get(parent);
			const admittedIdentity = registration?.watcher.admittedIdentity;
			if (!registration?.entryParent || !this.owns(parent, registration) || !admittedIdentity) throw error;
			if (!sameDirectory(admittedIdentity, fs.statSync(parent, { bigint: true }))) throw new SkillsNativeWatchInvalidatedError(`Skills entry observation changed before root reconciliation: ${parent}`);
			return;
		}
	}
	async scan() {
		const discovered = /* @__PURE__ */ new Map();
		const announced = /* @__PURE__ */ new Set();
		const visited = /* @__PURE__ */ new Map();
		const entryParent = !this.readRootState()?.isDirectory();
		const rootDirectory = entryParent ? toWatchRoot(path.dirname(this.root)) : this.root;
		const queue = [{
			directory: rootDirectory,
			depth: 0
		}];
		for (const current of queue) {
			if (this.closed || this.dirty || current.parent && !this.owns(current.parent.directory, current.parent.registration)) return;
			const { directory, depth } = current;
			let identity;
			try {
				identity = entryParent ? fs.statSync(directory, { bigint: true }) : fs.lstatSync(directory, { bigint: true });
			} catch (error) {
				if (directory !== rootDirectory && missing(error)) continue;
				throw error;
			}
			if (!identity.isDirectory()) {
				if (entryParent) throw new Error(`Skills entry observation requires a directory: ${directory}`);
				if (directory === rootDirectory) {
					this.dirty = true;
					return;
				}
				continue;
			}
			if (this.ignored(directory, identity)) continue;
			const registration = this.acquire(directory, identity, entryParent);
			const admittedIdentity = registration.watcher.admittedIdentity;
			if (!admittedIdentity) return;
			visited.set(directory, registration);
			if (entryParent) {
				const currentRoot = this.readRootState();
				if (currentRoot?.isDirectory()) {
					this.dirty = true;
					return;
				}
				if (currentRoot?.isSymbolicLink() && !this.ignored(this.root, currentRoot)) {
					const entry = readSymlinkEntry(this.root, currentRoot);
					if (!entry) {
						this.dirty = true;
						return;
					}
					discovered.set(this.root, entry);
				}
				if (currentRoot && !sameDirectory(admittedIdentity, fs.statSync(directory, { bigint: true }))) {
					this.retire(directory);
					this.dirty = true;
					return;
				}
				continue;
			}
			const directoryEntry = {
				kind: "directory",
				identity: admittedIdentity
			};
			discovered.set(directory, directoryEntry);
			if (this.ready && !sameEntry(this.entries.get(directory), directoryEntry)) {
				announced.add(directory);
				this.emit("all", "addDir", directory);
				if (this.dirty || !this.owns(directory, registration)) return;
			}
			let children;
			try {
				children = await fs$1.readdir(directory, { withFileTypes: true });
			} catch (error) {
				if (!this.owns(directory, registration)) return;
				if (!missing(error)) throw error;
			}
			if (this.dirty || !this.owns(directory, registration)) return;
			let after;
			try {
				after = fs.lstatSync(directory, { bigint: true });
			} catch (error) {
				if (!missing(error)) throw error;
				discovered.delete(directory);
				visited.delete(directory);
				this.retire(directory);
				if (this.ready) this.emit("all", "unlinkDir", directory);
				if (directory === rootDirectory) {
					this.dirty = true;
					return;
				}
				continue;
			}
			if (!sameDirectory(admittedIdentity, after)) {
				this.retire(directory);
				this.dirty = true;
				return;
			}
			if (!children) {
				this.dirty = true;
				return;
			}
			for (const child of children) {
				const candidate = toWatchRoot(path.join(directory, child.name));
				if (this.ignored(candidate, child)) continue;
				if (child.isSymbolicLink()) try {
					const entry = readSymlinkEntry(candidate, fs.lstatSync(candidate, { bigint: true }));
					if (!entry) {
						this.dirty = true;
						return;
					}
					discovered.set(candidate, entry);
				} catch (error) {
					if (!missing(error)) throw error;
				}
				else if (child.isDirectory() && depth < this.depth) queue.push({
					directory: candidate,
					depth: depth + 1,
					parent: {
						directory,
						registration
					}
				});
			}
		}
		if (this.closed || this.dirty) return;
		for (const [directory, registration] of visited) if (!this.owns(directory, registration)) return;
		for (const directory of this.registrations.keys()) if (!visited.has(directory)) this.retire(directory, false);
		const previous = this.entries;
		this.entries = discovered;
		if (this.ready) {
			for (const [entry, fact] of previous) if (!announced.has(entry) && !sameEntry(discovered.get(entry), fact)) {
				if (fact.kind === "symlink" && discovered.get(entry)?.kind === "symlink") continue;
				this.emit("all", fact.kind === "directory" ? "unlinkDir" : "unlink", entry);
				if (this.closed) return;
			}
			for (const [entry, fact] of discovered) if (!announced.has(entry) && !sameEntry(previous.get(entry), fact)) {
				const event = fact.kind === "directory" ? "addDir" : previous.get(entry)?.kind === "symlink" ? "change" : "add";
				this.emit("all", event, entry);
				if (this.closed) return;
			}
		}
	}
	rescan() {
		if (this.closed) return;
		this.dirty = true;
		if (this.scanning) return;
		this.scanning = (async () => {
			try {
				while (this.dirty && !this.closed) {
					this.dirty = false;
					await this.scan();
				}
				if (!this.closed && !this.failed && !this.ready) {
					this.ready = true;
					this.emit("ready");
				}
			} catch (error) {
				this.fail(error);
			} finally {
				this.scanning = void 0;
			}
		})();
	}
	close() {
		if (this.closing) return this.closing;
		this.closed = true;
		this.removeAllListeners();
		for (const directory of this.registrations.keys()) this.retire(directory);
		const scanning = this.scanning;
		this.closing = trackSkillsWatcherClose(async () => {
			await scanning;
			await Promise.all(this.retired);
			const failed = this.retirementFailure;
			if (failed && !failed.ok) throw failed.error;
		});
		return this.closing;
	}
};
function createNativeSkillsContentWatcher(root, options) {
	return new NativeSkillsContentWatcher(root, options.depth, options.ignored);
}
//#endregion
//#region src/skills/runtime/refresh-watch-transport.ts
function shouldUseNativeSkillsWatcher(usePolling) {
	return !usePolling && !process.versions.bun && (process.platform === "linux" || process.platform === "win32");
}
function adaptChokidarSkillsWatcher(watcher) {
	let closing;
	return {
		get closed() {
			return watcher.closed;
		},
		get directories() {
			return new Set(Object.keys(watcher.getWatched()));
		},
		on: (event, listener) => event === "dirty" ? void 0 : watcher.on(event, listener),
		close: () => closing ??= teardownSkillsPathWatcher({ watcher })
	};
}
function createSkillsContentWatchFactory(runInContext) {
	return (target, usePolling, ignored, stabilityThreshold) => runInContext(() => shouldUseNativeSkillsWatcher(usePolling) ? createNativeSkillsContentWatcher(target.path, {
		depth: target.depth + 1,
		ignored
	}) : adaptChokidarSkillsWatcher(chokidar.watch(target.path, {
		ignoreInitial: true,
		followSymlinks: false,
		usePolling,
		depth: target.depth + 1,
		awaitWriteFinish: {
			stabilityThreshold,
			pollInterval: 100
		},
		ignored
	})));
}
//#endregion
//#region src/skills/runtime/refresh-ancestor-watch.ts
const runInWatcherContext = AsyncLocalStorage.snapshot();
const ancestorWatchers = /* @__PURE__ */ new Map();
function createAncestorWatcher(watchRoot, usePolling, subscriptions) {
	const ignored = (candidate, stats) => {
		let allIgnored = true;
		for (const current of subscriptions) if (!current.ignored(candidate, stats)) allIgnored = false;
		return allIgnored;
	};
	return runInWatcherContext(() => {
		if (shouldUseNativeSkillsWatcher(usePolling)) {
			const watcher = createNativeSkillsAncestorWatcher(watchRoot, ignored, () => {
				const current = ancestorWatchers.get(watchRoot);
				if (current?.watcher === watcher && !current.retiring) replaceAncestorWatcher(watchRoot, usePolling, current);
			});
			watcher.on("reconcile", (_changedPath, structural) => {
				const current = ancestorWatchers.get(watchRoot);
				if (!structural || current?.watcher !== watcher || current.retiring) return;
				for (const target of Array.from(subscriptions)) if (current.watcher === watcher && !watcher.closed && subscriptions.has(target)) target.reconcile();
			});
			return {
				watcher,
				close: () => watcher.close(),
				observationRoot: watchRoot
			};
		}
		const watcher = chokidar.watch(watchRoot, {
			ignoreInitial: true,
			followSymlinks: false,
			usePolling,
			depth: 0,
			ignored
		});
		let observationRoot = watchRoot;
		if (process.platform === "darwin" && !usePolling) {
			const parent = path.dirname(watchRoot);
			watcher.add(parent);
			observationRoot = parent;
		}
		return {
			watcher,
			close: () => teardownSkillsPathWatcher({ watcher }),
			observationRoot
		};
	});
}
function observeAncestorWatcher(current) {
	const { watcher, subscriptions } = current;
	const isCurrent = () => current.watcher === watcher && !current.retiring && !watcher.closed;
	const publish = (notify) => {
		for (const target of Array.from(subscriptions)) if (isCurrent() && subscriptions.has(target)) notify(target);
	};
	watcher.on("ready", () => {
		if (!isCurrent() || current.error) return;
		current.ready = true;
		publish((target) => target.ready());
	});
	watcher.on("all", (event, changedPath) => {
		publish((target) => {
			if (isPathInside(changedPath, target.path) || isPathInside(target.path, changedPath)) target.changed(event, changedPath);
		});
	});
	watcher.on("raw", (event, rawPath, details) => {
		publish((target) => target.raw(event, rawPath, details));
	});
	watcher.on("error", (error) => {
		if (!isCurrent()) return;
		current.ready = false;
		const watchError = toErrorObject(error, "Skills ancestor watcher failed");
		current.error = watchError;
		publish((target) => target.error(watchError, current.observationRoot));
	});
}
function replaceAncestorWatcher(watchRoot, usePolling, current) {
	if (current.retiring) return current.retiring;
	current.ready = false;
	const retiring = current.close();
	current.retiring = retiring;
	for (const target of Array.from(current.subscriptions)) if (current.subscriptions.has(target)) target.unavailable();
	retiring.then((result) => {
		if (ancestorWatchers.get(watchRoot) !== current) return;
		if (!result.ok) {
			current.error = toErrorObject(result.error, "Skills ancestor watcher retirement failed");
			for (const target of Array.from(current.subscriptions)) if (current.subscriptions.has(target)) target.error(current.error, current.observationRoot);
			return;
		}
		if (current.subscriptions.size === 0) {
			ancestorWatchers.delete(watchRoot);
			return;
		}
		Object.assign(current, createAncestorWatcher(watchRoot, usePolling, current.subscriptions));
		current.retiring = void 0;
		current.error = void 0;
		observeAncestorWatcher(current);
	});
	return retiring;
}
function acquireSkillsAncestorWatcher(watchRoot, usePolling, subscription) {
	let group = ancestorWatchers.get(watchRoot);
	if (!group) {
		const subscriptions = /* @__PURE__ */ new Set([subscription]);
		group = {
			...createAncestorWatcher(watchRoot, usePolling, subscriptions),
			ready: false,
			subscriptions
		};
		ancestorWatchers.set(watchRoot, group);
		observeAncestorWatcher(group);
	} else group.subscriptions.add(subscription);
	const current = group;
	const watcher = current.watcher;
	if (current.error && !current.retiring) queueMicrotask(() => {
		if (ancestorWatchers.get(watchRoot) === current && current.subscriptions.has(subscription) && current.error && !current.retiring) replaceAncestorWatcher(watchRoot, usePolling, current);
	});
	let released;
	if (current.ready || current.error) queueMicrotask(() => {
		if (ancestorWatchers.get(watchRoot) === current && current.watcher === watcher && current.subscriptions.has(subscription)) {
			if (current.ready && !watcher.closed && !current.retiring) subscription.ready();
			else if (current.error) subscription.error(current.error, current.observationRoot);
		}
	});
	return { release: () => {
		if (released) return released;
		if (current.subscriptions.delete(subscription) && current.subscriptions.size === 0) released = replaceAncestorWatcher(watchRoot, usePolling, current);
		else released = current.retiring ?? Promise.resolve(ok(void 0));
		return released;
	} };
}
function resetSkillsAncestorWatchersForTest() {
	ancestorWatchers.clear();
}
//#endregion
//#region src/skills/runtime/refresh-content-watch.ts
/** Keep native coverage while a directory rescan establishes its replacement. */
function createSkillsContentWatcher(params) {
	let closed = false;
	let published = false;
	let revision = 0;
	let active;
	let pending;
	let closing;
	let retirementFailure;
	const retiring = /* @__PURE__ */ new Set();
	const owns = (generation) => !closed && !generation.retired && params.isCurrent() && (active === generation || pending === generation);
	const retire = (generation) => {
		generation.retired = true;
		const retirement = generation.watcher.close();
		retiring.add(retirement);
		retirement.then((result) => {
			if (!result.ok) retirementFailure ??= result;
			retiring.delete(retirement);
		});
	};
	const rescan = () => {
		if (!closed && params.isCurrent() && (active.ready || active.errored) && !pending) pending = create();
	};
	const create = () => {
		const generation = {
			watcher: params.watch(),
			revision,
			ready: false,
			readyDirectories: /* @__PURE__ */ new Set(),
			errored: false,
			retired: false
		};
		const { watcher } = generation;
		watcher.on("ready", () => {
			if (!owns(generation) || generation.ready) return;
			generation.ready = true;
			generation.readyDirectories = new Set(watcher.directories);
			if (generation === active) {
				rescan();
				return;
			}
			pending = void 0;
			if (generation.revision !== revision) {
				retire(generation);
				rescan();
				return;
			}
			const previous = active;
			active = generation;
			retire(previous);
			if (previous.errored || Array.from(generation.readyDirectories).some((directory) => !previous.readyDirectories.has(directory))) {
				rescan();
				return;
			}
			const isRescan = published;
			published = true;
			params.ready(isRescan);
		});
		watcher.on("all", (event, changedPath) => {
			if (owns(generation)) params.changed(event, changedPath);
		});
		watcher.on("dirty", () => {
			if (owns(generation)) revision += 1;
		});
		watcher.on("raw", (event, rawPath, details) => {
			if (!owns(generation)) return;
			if (params.isStructuralRaw(event, rawPath, details)) revision += 1;
			params.raw(event, rawPath, details);
		});
		watcher.on("error", (error) => {
			if (!owns(generation)) return;
			generation.errored = true;
			const isRescan = generation === pending;
			if (isRescan) {
				pending = void 0;
				retire(generation);
			}
			params.error(error, isRescan);
		});
		return generation;
	};
	active = create();
	return {
		rescan,
		structureChanged() {
			revision += 1;
		},
		close() {
			if (closing) return closing;
			closed = true;
			retire(active);
			if (pending) {
				retire(pending);
				pending = void 0;
			}
			closing = trackSkillsWatcherClose(async () => {
				await Promise.all(retiring);
				if (retirementFailure && !retirementFailure.ok) throw retirementFailure.error;
			});
			return closing;
		}
	};
}
//#endregion
//#region src/skills/runtime/refresh-file-stability.ts
const RAW_SKILL_FILE_POLL_INTERVAL_MS = 100;
function readFileStabilitySnapshot(filePath) {
	try {
		const stat = fs.statSync(filePath);
		return stat.isFile() ? {
			size: stat.size,
			mtimeMs: stat.mtimeMs
		} : void 0;
	} catch {
		return;
	}
}
async function waitForStableSkillFile(filePath, stabilityMs, watcher, readRevision) {
	if (watcher.closed || stabilityMs <= 0) return;
	let previousRevision = readRevision();
	let previous = readFileStabilitySnapshot(filePath);
	if (!previous) return;
	let stableForMs = 0;
	while (stableForMs < stabilityMs) {
		const delayMs = Math.min(RAW_SKILL_FILE_POLL_INTERVAL_MS, stabilityMs - stableForMs);
		await new Promise((resolve) => {
			setTimeout(resolve, delayMs);
		});
		if (watcher.closed) return;
		const nextRevision = readRevision();
		const next = readFileStabilitySnapshot(filePath);
		if (!next) return;
		if (nextRevision === previousRevision && next.size === previous.size && next.mtimeMs === previous.mtimeMs) {
			stableForMs += delayMs;
			continue;
		}
		previous = next;
		previousRevision = nextRevision;
		stableForMs = 0;
	}
}
function createRawSkillFileScheduler({ watcher, stabilityMs, schedule, onError }) {
	const pendingRawFiles = /* @__PURE__ */ new Map();
	return (changedPath) => {
		if (watcher.closed) return;
		const pending = pendingRawFiles.get(changedPath);
		if (pending) {
			pending.revision += 1;
			return;
		}
		const current = { revision: 0 };
		pendingRawFiles.set(changedPath, current);
		(async () => {
			try {
				while (!watcher.closed) {
					let sampledRevision = current.revision;
					await waitForStableSkillFile(changedPath, stabilityMs, watcher, () => {
						sampledRevision = current.revision;
						return sampledRevision;
					}).catch((err) => onError(changedPath, err));
					if (current.revision !== sampledRevision) continue;
					schedule(changedPath);
					return;
				}
			} finally {
				pendingRawFiles.delete(changedPath);
			}
		})();
	};
}
//#endregion
//#region src/skills/runtime/refresh-remote.ts
const log$1 = createSubsystemLogger("gateway/skills");
const runInSkillsWatcherContext = AsyncLocalStorage.snapshot();
const remoteWatchers = /* @__PURE__ */ new Map();
const remoteWatchTasks = /* @__PURE__ */ new Set();
function ensureRemoteSkillsWatcher(params) {
	const { watcherKey, workspaceDir, access } = params;
	const drainSignal = getGatewayRestartDrainSignal();
	if (drainSignal.aborted) return;
	const request = {
		sourcePlan: params.sourcePlan,
		executionWorkspaceDir: params.executionWorkspaceDir
	};
	const signature = JSON.stringify(request);
	const previous = remoteWatchers.get(watcherKey);
	if (previous?.access === access && previous.signature === signature) {
		if (previous.unavailable) bumpSkillsSnapshotVersion({
			workspaceDir,
			reason: "remote-node"
		});
		return;
	}
	disposeRemoteSkillsWatcher(watcherKey);
	const state = {
		access,
		signature,
		controller: new AbortController(),
		unavailable: !access.watchSkills
	};
	remoteWatchers.set(watcherKey, state);
	bumpSkillsSnapshotVersion({
		workspaceDir,
		reason: "remote-node"
	});
	const watch = access.watchSkills;
	if (!watch) return;
	const signal = AbortSignal.any([state.controller.signal, drainSignal]);
	const isCurrent = () => remoteWatchers.get(watcherKey) === state && !signal.aborted;
	const task = runInSkillsWatcherContext(async () => {
		try {
			await watch(request, (event) => {
				if (!isCurrent()) return;
				if (event === "unavailable") state.unavailable = true;
				else if (event === "available") {
					state.unavailable = false;
					return;
				}
				bumpSkillsSnapshotVersion({
					workspaceDir,
					reason: "remote-node"
				});
			}, signal);
		} catch (error) {
			if (isCurrent()) log$1.warn(`remote skills watcher stopped (${workspaceDir}): ${String(error)}`);
		} finally {
			if (remoteWatchers.get(watcherKey) === state) {
				remoteWatchers.delete(watcherKey);
				if (!signal.aborted) bumpSkillsSnapshotVersion({
					workspaceDir,
					reason: "remote-node"
				});
			}
		}
	});
	remoteWatchTasks.add(task);
	task.finally(() => remoteWatchTasks.delete(task));
}
function disposeRemoteSkillsWatcher(watcherKey) {
	const state = remoteWatchers.get(watcherKey);
	remoteWatchers.delete(watcherKey);
	state?.controller.abort();
	return Boolean(state);
}
async function closeRemoteSkillsWatchers() {
	for (const key of remoteWatchers.keys()) disposeRemoteSkillsWatcher(key);
	await Promise.all(remoteWatchTasks);
}
//#endregion
//#region src/skills/runtime/refresh-watch-registry.ts
const pathWatchers = /* @__PURE__ */ new Map();
const workspaceWatchTargets = /* @__PURE__ */ new Map();
const workspaceWatchOwners = /* @__PURE__ */ new Map();
const workspaceWatchTargetCache = /* @__PURE__ */ new Map();
const uncertainPooledObservationRoots = /* @__PURE__ */ new Set();
const hasUncertainPooledCoverage = (root) => Array.from(uncertainPooledObservationRoots).some((lost) => isPathInside(root, lost) || isPathInside(lost, root));
function recordPooledObservationLoss(root) {
	uncertainPooledObservationRoots.add(root);
	const changes = [];
	for (const [targetPath, state] of pathWatchers) {
		if (state.closed || !state.pooledNative || !hasUncertainPooledCoverage(targetPath)) continue;
		state.verified = false;
		if (!state.unavailable) {
			state.unavailable = true;
			changes.push({
				targetPath,
				state,
				watcherKeys: state.subscribers,
				change: "unavailable"
			});
		}
	}
	publishSkillsWatchChanges(changes);
}
function unsubscribeWorkspaceFromPath(workspaceDir, watchTarget) {
	const state = pathWatchers.get(watchTarget.path);
	if (!state) return;
	state.subscribers.delete(workspaceDir);
	if (state.subscribers.size === 0) state.close().then((result) => {
		if (result.ok && state.subscribers.size === 0 && pathWatchers.get(watchTarget.path) === state) pathWatchers.delete(watchTarget.path);
	});
}
const hasUnreadySharedTargets = (watcherKey) => (workspaceWatchTargets.get(watcherKey) ?? []).some((target) => !target.executionOnly && pathWatchers.get(target.path)?.initialScan !== "ready");
function hasVerifiedCoverage(watcherKey) {
	return workspaceWatchTargets.get(watcherKey)?.every((target) => {
		const state = pathWatchers.get(target.path);
		return state && !state.closed && state.verified && !state.unavailable;
	}) ?? false;
}
function publishRecoveredCoverage() {
	for (const [watcherKey, owner] of workspaceWatchOwners) if (owner.unavailable && hasVerifiedCoverage(watcherKey)) {
		owner.unavailable = false;
		notifySkillsWatchAvailable({
			workspaceDir: owner.workspaceDir,
			sourceScope: owner.sourceScope
		});
	}
}
function publishSkillsWatchChanges(changes) {
	const affected = /* @__PURE__ */ new Map();
	for (const pending of changes) for (const watcherKey of pending.watcherKeys) {
		const owner = workspaceWatchOwners.get(watcherKey);
		const targets = workspaceWatchTargets.get(watcherKey);
		if (owner && targets) {
			const entries = affected.get(owner.workspaceDir) ?? [];
			entries.push({
				pending,
				watcherKey,
				targets
			});
			affected.set(owner.workspaceDir, entries);
		}
	}
	for (const [workspaceDir, entries] of affected) {
		const scopes = /* @__PURE__ */ new Map();
		let changedPath;
		let unavailable = false;
		for (const { pending, watcherKey, targets } of entries) {
			const owner = workspaceWatchOwners.get(watcherKey);
			const { targetPath, state, change } = pending;
			if (!owner || state.closed || pathWatchers.get(targetPath) !== state || !state.subscribers.has(watcherKey) || workspaceWatchTargets.get(watcherKey) !== targets) continue;
			if (change !== "supporting") {
				workspaceWatchTargetCache.delete(watcherKey);
				changedPath = pending.changedPath;
			}
			unavailable ||= change === "unavailable";
			owner.unavailable ||= change === "unavailable";
			const initialScan = change === "initial-scan";
			const shared = initialScan ? owner.sharedScanPending : targets.find((entry) => entry.path === targetPath)?.executionOnly !== true;
			if (initialScan && shared) for (const [key, other] of workspaceWatchOwners) other.sharedScanPending &&= other.workspaceDir !== workspaceDir || hasUnreadySharedTargets(key);
			const kind = change === "supporting" ? "supporting" : "skills";
			if (shared) scopes.set(kind, void 0);
			else if (!scopes.has(kind) || scopes.get(kind)) {
				const selected = scopes.get(kind) ?? [];
				if (!selected.some((scope) => scope.executionWorkspaceDir === owner.sourceScope.executionWorkspaceDir)) selected.push(owner.sourceScope);
				scopes.set(kind, selected);
			}
		}
		if (scopes.has("supporting")) markSkillsSupportingFilesChanged({
			workspaceDir,
			sourceScopes: scopes.get("supporting")
		});
		if (scopes.has("skills")) bumpSkillsSnapshotVersion({
			workspaceDir,
			sourceScopes: scopes.get("skills"),
			reason: unavailable ? "watch-unavailable" : "watch",
			changedPath
		});
	}
}
function flushSkillsWatchChanges(trigger) {
	if (trigger.closed) return;
	const now = performance.now();
	const changes = [];
	for (const [targetPath, state] of pathWatchers) {
		if (state.closed || state.timer === void 0 || state !== trigger && (state.pendingAt === void 0 || state.pendingAt > now)) continue;
		changes.push({
			targetPath,
			state,
			watcherKeys: state.subscribers,
			changedPath: state.pendingPath,
			change: state.pendingChange ?? "skills"
		});
		clearTimeout(state.timer);
		state.timer = void 0;
		state.pendingAt = void 0;
		state.pendingPath = void 0;
		state.pendingChange = void 0;
	}
	publishSkillsWatchChanges(changes);
}
//#endregion
//#region src/skills/runtime/refresh-source-roots.ts
function resolveSkillsWatchSourceRoots(workspaceDir, config, agentId, executionWorkspaceDir, pluginMetadataSnapshot, sourcePlan) {
	const executionRoots = executionWorkspaceDir ? resolveWorkspaceSkillDirectories(executionWorkspaceDir) : [];
	let baseRoots;
	let extraDirs;
	let pluginSkillDirs;
	let allowedSymlinkTargetRealPaths;
	if (sourcePlan) {
		baseRoots = sourcePlan.roots.filter((root) => !["extra", "bundled"].includes(root.tier)).map((root) => ({
			path: root.dir,
			source: root.source
		}));
		extraDirs = sourcePlan.roots.filter((root) => root.tier === "extra").map((root) => root.dir);
		pluginSkillDirs = sourcePlan.pluginSkillRoots.map((root) => root.dir);
		allowedSymlinkTargetRealPaths = resolveAllowedSkillSymlinkTargetRealPaths({ skills: { load: { allowSymlinkTargets: sourcePlan.allowSymlinkTargets } } });
	} else {
		baseRoots = resolveWorkspaceSkillDirectories(workspaceDir).map(({ dir, source }) => ({
			path: dir,
			source
		}));
		baseRoots.push(...resolveWorkshopWatchRoots(config, agentId));
		baseRoots.push({
			path: path.join(CONFIG_DIR, "skills"),
			source: "openclaw-managed"
		});
		if (isDefaultStateDir()) baseRoots.push({
			path: path.join(os.homedir(), ".agents", "skills"),
			source: "agents-skills-personal"
		});
		extraDirs = normalizeTrimmedStringList(config?.skills?.load?.extraDirs).map((dir) => resolveUserPath(dir));
		pluginSkillDirs = (pluginMetadataSnapshot ? resolvePluginSkillRootsFromMetadata({
			workspaceDir,
			config,
			metadataSnapshot: pluginMetadataSnapshot
		}) : resolvePluginSkillRoots({
			workspaceDir,
			config
		})).map((root) => root.dir);
		allowedSymlinkTargetRealPaths = resolveAllowedSkillSymlinkTargetRealPaths(config);
	}
	return {
		executionRoots,
		baseRoots,
		extraDirs,
		pluginSkillDirs,
		allowedSymlinkTargetRealPaths
	};
}
//#endregion
//#region src/skills/runtime/refresh-watch-targets.ts
function skillsWatchTargetsMatch(previous, next) {
	return previous.path === next.path && previous.watchRoot === next.watchRoot && previous.depth === next.depth && previous.executionOnly === next.executionOnly;
}
function compareSkillsWatchTargets(previous, next, covered) {
	const targetsUnchanged = areOrderedArraysEqual(previous, next, skillsWatchTargetsMatch);
	if (targetsUnchanged) return {
		targetsUnchanged,
		sharedTargetsChanged: false
	};
	return {
		targetsUnchanged,
		sharedTargetsChanged: next.some((target) => !target.executionOnly && !covered.some((prior) => skillsWatchTargetsMatch(prior, target))) || previous.some((prior) => !prior.executionOnly && !next.some((target) => skillsWatchTargetsMatch(prior, target)))
	};
}
const GROUPED_SKILLS_WATCH_DEPTH = 6;
const CONFIGURED_ROOT_WATCH_DEPTH = 2;
const MAX_SYMLINK_WATCH_TARGETS_PER_ROOT = 100;
const MAX_SYMLINK_WATCH_DIRECTORY_SCANS_PER_ROOT = 200;
const MAX_SYMLINK_WATCH_RAW_ENTRIES_PER_ROOT = 2e3;
function resolveSkillsWatchTargets(workspaceDir, config, agentId, executionWorkspaceDir, pluginMetadataSnapshot, sourcePlan, cached) {
	const { executionRoots, baseRoots, extraDirs, pluginSkillDirs, allowedSymlinkTargetRealPaths } = resolveSkillsWatchSourceRoots(workspaceDir, config, agentId, executionWorkspaceDir, pluginMetadataSnapshot, sourcePlan);
	const signature = JSON.stringify({
		basePaths: baseRoots.map((root) => toWatchRoot(root.path)),
		executionPaths: executionRoots.map((root) => toWatchRoot(root.dir)),
		extraDirs: extraDirs.map(toWatchRoot),
		pluginSkillDirs: pluginSkillDirs.map(toWatchRoot),
		allowSymlinkTargets: allowedSymlinkTargetRealPaths
	});
	if (cached?.signature === signature) return cached;
	const targets = /* @__PURE__ */ new Map();
	for (const root of baseRoots) addSkillSourceWatchTargets(targets, root.path, root.source, allowedSymlinkTargetRealPaths, GROUPED_SKILLS_WATCH_DEPTH);
	for (const resolved of extraDirs) addSkillSourceWatchTargets(targets, resolved, "openclaw-extra", allowedSymlinkTargetRealPaths);
	for (const dir of pluginSkillDirs) addSkillSourceWatchTargets(targets, dir, "openclaw-plugin", allowedSymlinkTargetRealPaths);
	const executionTargets = /* @__PURE__ */ new Map();
	for (const root of executionRoots) addSkillSourceWatchTargets(executionTargets, root.dir, root.source, allowedSymlinkTargetRealPaths, GROUPED_SKILLS_WATCH_DEPTH);
	for (const [key, target] of executionTargets) {
		const shared = targets.get(key);
		if (shared) shared.depth = Math.max(shared.depth, target.depth);
		else targets.set(key, {
			...target,
			executionOnly: true
		});
	}
	return {
		signature,
		targets: Array.from(targets.values()).toSorted((a, b) => a.path.localeCompare(b.path))
	};
}
function addWatchTarget(targets, raw, depth) {
	const target = makeSkillsWatchTarget(raw, depth);
	target.depth = Math.max(target.depth, targets.get(target.path)?.depth ?? 0);
	targets.set(target.path, target);
}
function addSkillRootWatchTargets(targets, root, rootDepth) {
	addWatchTarget(targets, root, rootDepth);
	const companionSkillsRoot = path.join(root, "skills");
	addWatchTarget(targets, companionSkillsRoot, GROUPED_SKILLS_WATCH_DEPTH);
	return companionSkillsRoot;
}
function addSkillSourceWatchTargets(targets, root, source, allowedSymlinkTargetRealPaths, rootDepth = path.basename(root) === "skills" ? GROUPED_SKILLS_WATCH_DEPTH : CONFIGURED_ROOT_WATCH_DEPTH) {
	const companionSkillsRoot = addSkillRootWatchTargets(targets, root, rootDepth);
	const rootRealPath = resolveRealpathOrAbsolute(root);
	addTrustedSymlinkSkillWatchTargets(targets, root, source, allowedSymlinkTargetRealPaths, rootDepth, rootRealPath, rootRealPath);
	addTrustedSymlinkSkillWatchTargets(targets, companionSkillsRoot, source, allowedSymlinkTargetRealPaths, GROUPED_SKILLS_WATCH_DEPTH, rootRealPath, resolveRealpathOrAbsolute(companionSkillsRoot));
}
function addTrustedSymlinkSkillWatchTargets(targets, root, source, allowedSymlinkTargetRealPaths, maxDepth, containmentRootRealPath, rootRealPath) {
	try {
		if (fs.lstatSync(root).isSymbolicLink() && isTrustedSymlinkSkillTarget(source, containmentRootRealPath, rootRealPath, allowedSymlinkTargetRealPaths)) addSkillRootWatchTargets(targets, rootRealPath, maxDepth);
	} catch {
		return;
	}
	const queue = [{
		dir: root,
		depth: 0
	}];
	let watched = 0;
	let directoryScans = 0;
	let rawEntries = 0;
	for (const current of queue) {
		if (watched >= MAX_SYMLINK_WATCH_TARGETS_PER_ROOT || directoryScans >= MAX_SYMLINK_WATCH_DIRECTORY_SCANS_PER_ROOT || rawEntries >= MAX_SYMLINK_WATCH_RAW_ENTRIES_PER_ROOT) break;
		const scan = readBudgetedDirEntries(current.dir, MAX_SYMLINK_WATCH_RAW_ENTRIES_PER_ROOT - rawEntries);
		directoryScans += 1;
		rawEntries += scan.scannedEntryCount;
		if (!scan.ok) continue;
		for (const entry of scan.entries.toSorted((a, b) => a.name.localeCompare(b.name))) {
			if (watched >= MAX_SYMLINK_WATCH_TARGETS_PER_ROOT) break;
			if (entry.name.startsWith(".") || entry.name === "node_modules") continue;
			const childPath = path.join(current.dir, entry.name);
			if (DEFAULT_SKILLS_WATCH_IGNORED.some((re) => re.test(childPath))) continue;
			if (entry.isSymbolicLink()) {
				const targetRealPath = tryRealpath(childPath);
				if (targetRealPath && isTrustedSymlinkSkillTarget(source, containmentRootRealPath, targetRealPath, allowedSymlinkTargetRealPaths)) {
					addSkillRootWatchTargets(targets, targetRealPath, GROUPED_SKILLS_WATCH_DEPTH);
					watched += 1;
				}
				continue;
			}
			if (entry.isDirectory() && current.depth < maxDepth) queue.push({
				dir: childPath,
				depth: current.depth + 1
			});
		}
	}
}
//#endregion
//#region src/skills/runtime/refresh.ts
const log = createSubsystemLogger("gateway/skills");
const watchContent = createSkillsContentWatchFactory(AsyncLocalStorage.snapshot());
const SKILLS_WATCH_DEBOUNCE_MS = 250;
const failedContentPaths = /* @__PURE__ */ new Set();
const retiringWatchers = /* @__PURE__ */ new Set();
const replacingWatchers = /* @__PURE__ */ new Set();
let watchersClosing = false;
let nativeWatchCapacityFailed = false;
const workspaceWatchLastEnsuredAt = /* @__PURE__ */ new Map();
const SKILLS_WORKSPACE_WATCH_IDLE_TTL_MS = 36e5;
const MAX_SKILLS_WORKSPACE_WATCH_STATES = 128;
setSkillsChangeListenerErrorHandler((err) => {
	log.warn(`skills change listener failed: ${String(err)}`);
});
function createSkillsPathWatcher(target, previousAncestorRoot = target.watchRoot, previous) {
	const usePolling = resolveSkillsWatcherUsePolling();
	const pooledNative = !usePolling && !shouldUseNativeSkillsWatcher(usePolling);
	const pathFilter = createSkillsWatchPathFilter(target.path, usePolling);
	const { ancestorRoot, ancestorRoots } = resolveSkillsWatchAncestors(target, previousAncestorRoot);
	const pendingAncestors = new Set(ancestorRoots);
	let contentReady = target.path !== target.watchRoot;
	let content;
	const releaseAncestors = [];
	let closing;
	const quarantined = failedContentPaths.has(target.path);
	const state = {
		closed: false,
		close: () => {
			if (closing) return closing;
			state.closed = true;
			clearTimeout(state.timer);
			const contentClose = content?.close().then((result) => {
				if (!result.ok) failedContentPaths.add(target.path);
				return result;
			});
			closing = Promise.all([...contentClose ? [contentClose] : [], ...releaseAncestors.map((release) => release())]).then((results) => results.find((result) => !result.ok) ?? ok(void 0));
			retiringWatchers.add(closing);
			closing.then(() => retiringWatchers.delete(closing));
			return closing;
		},
		watchRoot: target.watchRoot,
		ancestorRoot,
		depth: target.depth,
		initialScan: quarantined ? "error" : previous?.initialScan ?? "pending",
		unavailable: quarantined || Boolean(previous?.unavailable) || pooledNative && hasUncertainPooledCoverage(target.path),
		pooledNative,
		verified: false,
		failed: quarantined,
		recovering: Boolean(previous?.unavailable),
		replacing: false,
		subscribers: /* @__PURE__ */ new Set()
	};
	const targetChange = {
		targetPath: target.path,
		state,
		watcherKeys: state.subscribers
	};
	const isCurrent = () => !state.closed && pathWatchers.get(target.path) === state;
	const reconcileRoot = (changedPath, replaceContent = false) => {
		if (!isCurrent()) return true;
		const nextTarget = makeSkillsWatchTarget(target.path, state.depth, state.ancestorRoot);
		if (nextTarget.watchRoot === state.watchRoot && !replaceContent) return false;
		if (pooledNative && nextTarget.watchRoot !== state.watchRoot && isPathInside(nextTarget.watchRoot, state.watchRoot)) recordPooledObservationLoss(state.watchRoot);
		if (changedPath && isCurrent()) publishSkillsWatchChanges([{
			...targetChange,
			changedPath,
			change: "skills"
		}]);
		if (!isCurrent()) return true;
		for (const subscriber of state.subscribers) {
			workspaceWatchTargetCache.delete(subscriber);
			for (const entry of workspaceWatchTargets.get(subscriber) ?? []) if (entry.path === target.path) entry.watchRoot = nextTarget.watchRoot;
		}
		const subscriber = state.subscribers.values().next().value;
		if (subscriber !== void 0) subscribeWorkspaceToPath(subscriber, nextTarget, replaceContent);
		return true;
	};
	const schedule = (changedPath, change = "skills") => {
		if (!isCurrent() || change === "supporting" && state.pendingChange === "skills") return;
		state.pendingPath = changedPath ?? state.pendingPath;
		state.pendingChange = change;
		clearTimeout(state.timer);
		state.pendingAt = performance.now() + SKILLS_WATCH_DEBOUNCE_MS;
		state.timer = setTimeout(() => flushSkillsWatchChanges(state), SKILLS_WATCH_DEBOUNCE_MS);
	};
	const scheduleRawSkillFile = createRawSkillFileScheduler({
		watcher: state,
		stabilityMs: SKILLS_WATCH_DEBOUNCE_MS,
		schedule,
		onError: (changedPath, err) => {
			log.warn(`skills watcher stability check failed (${changedPath}): ${String(err)}`);
		}
	});
	const ready = (rescan = false) => {
		if (reconcileRoot() || !contentReady) return;
		const ancestorsSettled = pendingAncestors.size === 0;
		const uncertainCoverage = pooledNative && hasUncertainPooledCoverage(target.path);
		const restored = ancestorsSettled && state.unavailable;
		if (ancestorsSettled) {
			state.unavailable = uncertainCoverage;
			state.failed = false;
			state.recovering = false;
			state.verified = !uncertainCoverage;
		}
		const changes = [];
		if (ancestorsSettled && state.initialScan !== "ready") {
			state.initialScan = "ready";
			const watcherKeys = Array.from(state.subscribers).filter((watcherKey) => workspaceWatchTargets.get(watcherKey)?.every((entry) => {
				const current = pathWatchers.get(entry.path);
				return current && !current.closed && current.initialScan !== "pending";
			}));
			changes.push({
				...targetChange,
				watcherKeys,
				change: "initial-scan"
			});
		}
		if (rescan || restored) changes.push({
			...targetChange,
			change: "skills"
		});
		publishSkillsWatchChanges(changes);
		publishRecoveredCoverage();
	};
	const onChange = (event, changedPath) => {
		if (!isCurrent()) return;
		if (pooledNative && event === "unlinkDir" && pathFilter.isRelevant(event, changedPath)) {
			recordPooledObservationLoss(changedPath);
			if (!isCurrent()) return;
		}
		const ancestorChanged = event === "ancestor";
		if ((!content || ancestorChanged || event === "addDir" || event === "unlinkDir") && reconcileRoot(changedPath, ancestorChanged && Boolean(content))) return;
		const skillsRelevant = ancestorChanged || pathFilter.isRelevant(event, changedPath);
		if (skillsRelevant && (event === "addDir" || event === "unlinkDir")) {
			content?.structureChanged();
			if (event === "addDir") content?.rescan();
		}
		if (skillsRelevant || pathFilter.isSupportingPath(changedPath)) schedule(changedPath, skillsRelevant ? "skills" : "supporting");
	};
	const handleRaw = (_eventName, rawPath, details) => {
		if (!isCurrent()) return;
		const rawPathText = rawPathToString(rawPath);
		const changedPath = rawPathText ? resolveRawSkillsWatchPath(rawPathText, details) : getRawWatchedPath(details);
		if (!changedPath) return;
		if (isPathInside(changedPath, target.path) && reconcileRoot(changedPath)) return;
		if (!rawPathText) {
			if (isPathInside(target.path, changedPath)) schedule(changedPath);
			return;
		}
		if (isSkillDiscoveryFileWatchPath(changedPath) && isPathInside(target.path, changedPath)) {
			if (usePolling) return;
			scheduleRawSkillFile(changedPath);
		} else if (pathFilter.isSupportingPath(changedPath)) schedule(changedPath, "supporting");
	};
	const onRaw = (...args) => {
		if (usePolling) queueMicrotask(() => handleRaw(...args));
		else handleRaw(...args);
	};
	const onError = (err, rescan = false, ancestor, observedRoot = ancestor) => {
		if (!isCurrent()) return;
		const capacityCode = usePolling ? void 0 : getFileWatchCapacityCode(err);
		if (capacityCode) {
			if (!nativeWatchCapacityFailed) {
				nativeWatchCapacityFailed = true;
				log.warn(`skills native watcher capacity exhausted (${capacityCode}); refreshing skills during agent preparation`);
				for (const active of pathWatchers.values()) active.close();
				for (const workspaceDir of new Set(Array.from(workspaceWatchOwners.values(), (owner) => owner.workspaceDir))) bumpSkillsSnapshotVersion({
					workspaceDir,
					reason: "watch-unavailable"
				});
			}
			return;
		}
		if (pooledNative) recordPooledObservationLoss(observedRoot ?? target.path);
		log.warn(`skills watcher error (${target.path}): ${String(err)}`);
		if (state.initialScan === "pending") state.initialScan = "error";
		const changes = [];
		state.failed = true;
		state.verified = false;
		if (!state.unavailable) {
			state.unavailable = true;
			changes.push({
				...targetChange,
				change: "unavailable"
			});
		}
		publishSkillsWatchChanges(changes);
		if (rescan) schedule();
		if (ancestor && !state.recovering) reconcileRoot(void 0, true);
	};
	if (quarantined) return state;
	if (target.path === target.watchRoot) content = createSkillsContentWatcher({
		watch: () => watchContent(target, usePolling, pathFilter.ignored, SKILLS_WATCH_DEBOUNCE_MS),
		isCurrent,
		isStructuralRaw: pathFilter.isStructuralRaw,
		ready: (rescan) => {
			contentReady = true;
			ready(rescan || state.unavailable);
		},
		changed: onChange,
		raw: onRaw,
		error: (error, rescan) => {
			contentReady = false;
			onError(error, rescan);
		}
	});
	for (const root of ancestorRoots) releaseAncestors.push(acquireSkillsAncestorWatcher(root, usePolling, {
		path: target.path,
		ignored: pathFilter.ignored,
		ready: () => {
			if (!isCurrent()) return;
			if (pendingAncestors.delete(root) && pendingAncestors.size === 0 && state.recovering && content) {
				if (reconcileRoot()) return;
				contentReady = false;
				content.structureChanged();
				content.rescan();
				return;
			}
			ready();
		},
		unavailable: () => {
			if (!isCurrent()) return;
			pendingAncestors.add(root);
			state.verified = false;
			if (!state.unavailable && state.initialScan === "ready") {
				state.unavailable = true;
				publishSkillsWatchChanges([{
					...targetChange,
					change: "unavailable"
				}]);
			}
			if (content && !state.recovering) reconcileRoot(void 0, true);
		},
		changed: onChange,
		reconcile: () => {
			if (!isCurrent() || reconcileRoot(target.path)) return;
			content?.structureChanged();
			content?.rescan();
			schedule(target.path);
		},
		raw: onRaw,
		error: (error, observationRoot) => {
			pendingAncestors.add(root);
			onError(error, false, root, observationRoot);
		}
	}).release);
	return state;
}
function subscribeWorkspaceToPath(workspaceDir, watchTarget, replaceContent = false) {
	const existing = pathWatchers.get(watchTarget.path);
	if (existing) {
		existing.subscribers.add(workspaceDir);
		const reusable = !existing.closed && !existing.failed && !replaceContent && existing.watchRoot === watchTarget.watchRoot && existing.depth >= watchTarget.depth;
		existing.depth = Math.max(existing.depth, watchTarget.depth);
		if (reusable || existing.replacing) return;
		existing.replacing = true;
		existing.verified = false;
		if (!existing.unavailable) {
			existing.unavailable = true;
			publishSkillsWatchChanges([{
				targetPath: watchTarget.path,
				state: existing,
				watcherKeys: existing.subscribers,
				change: "unavailable"
			}]);
		}
		const replacement = existing.close().then((result) => {
			if (!result.ok || watchersClosing || nativeWatchCapacityFailed || pathWatchers.get(watchTarget.path) !== existing || existing.subscribers.size === 0) return;
			const target = makeSkillsWatchTarget(watchTarget.path, existing.depth, existing.ancestorRoot);
			const next = createSkillsPathWatcher(target, existing.ancestorRoot, existing);
			for (const subscriber of existing.subscribers) {
				next.subscribers.add(subscriber);
				workspaceWatchTargetCache.delete(subscriber);
				for (const entry of workspaceWatchTargets.get(subscriber) ?? []) if (entry.path === target.path) entry.watchRoot = target.watchRoot;
			}
			pathWatchers.set(target.path, next);
		});
		replacingWatchers.add(replacement);
		replacement.finally(() => replacingWatchers.delete(replacement));
		return;
	}
	const state = createSkillsPathWatcher(watchTarget);
	state.subscribers.add(workspaceDir);
	pathWatchers.set(watchTarget.path, state);
}
function disposeWorkspaceWatchState(watcherKey, watchTargets = workspaceWatchTargets.get(watcherKey) ?? []) {
	disposeRemoteSkillsWatcher(watcherKey);
	for (const watchTarget of watchTargets) unsubscribeWorkspaceFromPath(watcherKey, watchTarget);
	workspaceWatchTargets.delete(watcherKey);
	workspaceWatchOwners.delete(watcherKey);
	workspaceWatchTargetCache.delete(watcherKey);
	workspaceWatchLastEnsuredAt.delete(watcherKey);
}
function evictWorkspaceWatchStates(now) {
	const evict = (watcherKey) => {
		const owner = workspaceWatchOwners.get(watcherKey);
		disposeWorkspaceWatchState(watcherKey);
		if (!owner) return;
		const remainingOwners = Array.from(workspaceWatchOwners.values()).filter((other) => other.workspaceDir === owner.workspaceDir);
		if (remainingOwners.length === 0) suspendSkillsSnapshotSources(owner.workspaceDir, {});
		if (owner.sourceScope.executionWorkspaceDir && !remainingOwners.some((other) => other.sourceScope.executionWorkspaceDir === owner.sourceScope.executionWorkspaceDir)) suspendSkillsSnapshotSources(owner.workspaceDir, owner.sourceScope);
	};
	const cutoff = now - SKILLS_WORKSPACE_WATCH_IDLE_TTL_MS;
	for (const [watcherKey, lastEnsuredAt] of workspaceWatchLastEnsuredAt) if (lastEnsuredAt < cutoff) evict(watcherKey);
	for (const watcherKey of workspaceWatchLastEnsuredAt.keys()) {
		if (workspaceWatchLastEnsuredAt.size <= MAX_SKILLS_WORKSPACE_WATCH_STATES) break;
		evict(watcherKey);
	}
}
function ensureSkillsWatcher(params) {
	if (watchersClosing) return;
	const workspaceDir = params.workspaceDir.trim();
	if (!workspaceDir) return;
	const { executionWorkspaceDir } = normalizeWorkspaceSkillRoots({
		agentWorkspaceDir: workspaceDir,
		executionWorkspaceDir: params.executionWorkspaceDir
	});
	const watcherKey = JSON.stringify([
		workspaceDir,
		executionWorkspaceDir,
		params.agentId
	]);
	const sourceScope = { executionWorkspaceDir };
	const owner = {
		workspaceDir,
		sourceScope,
		sharedScanPending: workspaceWatchOwners.get(watcherKey)?.sharedScanPending ?? false,
		unavailable: workspaceWatchOwners.get(watcherKey)?.unavailable ?? false
	};
	workspaceWatchOwners.set(watcherKey, owner);
	const isCurrent = () => !watchersClosing && workspaceWatchOwners.get(watcherKey) === owner;
	const refreshInputs = {
		sourceScope,
		config: params.config,
		pluginMetadataSnapshot: params.pluginMetadataSnapshot
	};
	const now = Date.now();
	const watchEnabled = params.config?.skills?.load?.watch !== false;
	const previousTargets = workspaceWatchTargets.get(watcherKey) ?? [];
	if (!watchEnabled) {
		disposeWorkspaceWatchState(watcherKey, previousTargets);
		evictWorkspaceWatchStates(now);
		return;
	}
	workspaceWatchLastEnsuredAt.delete(watcherKey);
	workspaceWatchLastEnsuredAt.set(watcherKey, now);
	evictWorkspaceWatchStates(now);
	if (!isCurrent()) return;
	const access = getAgentWorkspaceAccess(workspaceDir, "loadSkills");
	let localPlan = params.sourcePlan;
	if (access?.loadSkills) {
		const { gatewayPlan, workspacePlan } = splitSkillSourcePlan(resolveWorkspaceSkillSourcePlan(workspaceDir, params));
		ensureRemoteSkillsWatcher({
			watcherKey,
			workspaceDir,
			executionWorkspaceDir,
			access,
			sourcePlan: workspacePlan
		});
		localPlan = gatewayPlan;
	} else disposeRemoteSkillsWatcher(watcherKey);
	if (!isCurrent()) return;
	if (nativeWatchCapacityFailed) {
		workspaceWatchTargetCache.delete(watcherKey);
		bumpSkillsSnapshotVersion({
			workspaceDir,
			refreshInputs,
			reason: "watch"
		});
		return;
	}
	const failedTargets = previousTargets.filter((entry) => pathWatchers.get(entry.path)?.unavailable);
	if (failedTargets.length > 0) workspaceWatchTargetCache.delete(watcherKey);
	const cachedTargets = workspaceWatchTargetCache.get(watcherKey);
	const resolvedTargets = resolveSkillsWatchTargets(workspaceDir, params.config, params.agentId, access?.loadSkills ? void 0 : executionWorkspaceDir, params.pluginMetadataSnapshot, localPlan, cachedTargets);
	if (resolvedTargets !== cachedTargets) workspaceWatchTargetCache.set(watcherKey, resolvedTargets);
	const watchTargets = resolvedTargets.targets;
	const targetChanges = compareSkillsWatchTargets(previousTargets, watchTargets, previousTargets.length ? previousTargets : Array.from(workspaceWatchOwners).flatMap(([key, other]) => other.workspaceDir === workspaceDir ? workspaceWatchTargets.get(key) ?? [] : []));
	const watcherDepthsCoverTargets = watchTargets.every((watchTarget) => (pathWatchers.get(watchTarget.path)?.depth ?? -1) >= watchTarget.depth);
	if (targetChanges.targetsUnchanged && watcherDepthsCoverTargets && failedTargets.length === 0) return;
	const nextTargetKeys = new Set(watchTargets.map((target) => target.path));
	for (const watchTarget of previousTargets) if (!nextTargetKeys.has(watchTarget.path)) unsubscribeWorkspaceFromPath(watcherKey, watchTarget);
	workspaceWatchTargets.set(watcherKey, watchTargets);
	for (const watchTarget of watchTargets) {
		subscribeWorkspaceToPath(watcherKey, watchTarget);
		if (!isCurrent()) return;
	}
	owner.sharedScanPending ||= hasUnreadySharedTargets(watcherKey);
	const joinedUnavailable = watchTargets.some((target) => pathWatchers.get(target.path)?.unavailable && !previousTargets.some((previous) => previous.path === target.path));
	const notifyUnavailable = joinedUnavailable && !owner.unavailable;
	owner.unavailable ||= joinedUnavailable;
	if (!targetChanges.targetsUnchanged || failedTargets.length > 0) bumpSkillsSnapshotVersion({
		workspaceDir,
		sourceScopes: targetChanges.sharedTargetsChanged || failedTargets.some((target) => !target.executionOnly) ? void 0 : [sourceScope],
		refreshInputs,
		reason: notifyUnavailable ? "watch-unavailable" : "watch-targets",
		changedPath: watchTargets.map((target) => target.path).join("|")
	});
}
/** Finish discovery deferred during an outage before a worker advertises coverage. */
function reconcileSkillsWatcherCoverage(params) {
	ensureSkillsWatcher(params);
	const workspaceDir = params.workspaceDir.trim();
	const { executionWorkspaceDir } = normalizeWorkspaceSkillRoots({
		agentWorkspaceDir: workspaceDir,
		executionWorkspaceDir: params.executionWorkspaceDir
	});
	const watcherKey = JSON.stringify([
		workspaceDir,
		executionWorkspaceDir,
		params.agentId
	]);
	const owner = workspaceWatchOwners.get(watcherKey);
	const covered = !watchersClosing && !nativeWatchCapacityFailed && hasVerifiedCoverage(watcherKey);
	if (owner && !covered) owner.unavailable = true;
	return covered;
}
async function closeSkillsWatchers(resetState = false) {
	watchersClosing = true;
	if (resetState) resetSkillsRefreshStateForTest();
	const active = Array.from(pathWatchers.values());
	nativeWatchCapacityFailed = false;
	pathWatchers.clear();
	workspaceWatchTargets.clear();
	workspaceWatchOwners.clear();
	workspaceWatchTargetCache.clear();
	workspaceWatchLastEnsuredAt.clear();
	for (const state of active) state.close();
	await Promise.all([
		...replacingWatchers,
		...retiringWatchers,
		joinSkillsWatcherCloses(),
		closeRemoteSkillsWatchers()
	]);
	watchersClosing = false;
	if (resetState) {
		failedContentPaths.clear();
		uncertainPooledObservationRoots.clear();
		resetSkillsAncestorWatchersForTest();
	}
}
//#endregion
export { ensureSkillsWatcher as n, reconcileSkillsWatcherCoverage as r, closeSkillsWatchers as t };
