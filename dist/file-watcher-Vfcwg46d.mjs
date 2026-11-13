import { o as normalizeLowercaseStringOrEmpty } from "./string-coerce-6kR-86XC.mjs";
import { r as isPathInside } from "./path-guards-CH7noY0Z.mjs";
import { c as sleepWithAbort } from "./src-DqaLEvc_.mjs";
import { t as formatCliCommand } from "./command-format-Cte1SWM4.mjs";
import { t as createSubsystemLogger } from "./subsystem-CeqVSEVi.mjs";
import "./string-coerce-runtime-B1b8UNzb.mjs";
import "./memory-core-host-engine-storage-yFR6btQR.mjs";
import { d as matchesExtraMemoryPathEntry, f as normalizeExtraMemoryPathEntries } from "./read-file-DxpwVtzf.mjs";
import { t as isFileMissingError } from "./fs-utils-WWARJ71o.mjs";
import { r as classifyMemoryMultimodalPath } from "./multimodal-Sk6z2tSa.mjs";
import "./runtime-env-Bh9hwd9E.mjs";
import { t as getFileWatchCapacityCode } from "./fs-watch-errors-D0zoLJOB.mjs";
import "./setup-tools-CLFs_KtI.mjs";
import "./file-access-runtime-ClDR2VUS.mjs";
import "./memory-core-host-engine-embeddings-BQMKhSGK.mjs";
import "./memory-core-host-engine-foundation-D-_StE-M.mjs";
import fs from "node:fs";
import path from "node:path";
import fs$1 from "node:fs/promises";
import chokidar from "chokidar";
//#region extensions/memory-core/src/memory/watch-pressure.ts
const MEMORY_WATCH_PRESSURE_WARNING_THRESHOLD = 2e3;
function countChokidarWatchedEntries(watcher) {
	const watched = watcher.getWatched();
	let count = Object.keys(watched).length;
	for (const entries of Object.values(watched)) count += entries.length;
	return count;
}
function warnIfMemoryWatchPressureHigh(state, count, unit, pressureDetail, remediation, warn) {
	if (state.shown || count <= MEMORY_WATCH_PRESSURE_WARNING_THRESHOLD) return false;
	state.shown = true;
	warn(`Memory file watching is tracking ${count} ${unit}. ${pressureDetail} ${remediation}`);
	return true;
}
const MEMORY_WATCH_SETTLE_RECHECK_MS = 100;
function snapshotFromStats(stats) {
	if (!stats || stats.isDirectory?.()) return null;
	if (typeof stats.size !== "number" || typeof stats.mtimeMs !== "number") return null;
	return {
		size: stats.size,
		mtimeMs: stats.mtimeMs
	};
}
function snapshotsMatch(left, right) {
	if (left === null || right === null) return left === right;
	return left.size === right.size && left.mtimeMs === right.mtimeMs;
}
async function snapshotPath(filePath) {
	try {
		return snapshotFromStats(await fs$1.stat(filePath));
	} catch {
		return null;
	}
}
function recordMemoryWatchEventPath(queue, watchPath, stats) {
	if (!watchPath) return;
	const trimmed = watchPath.trim();
	if (!trimmed) return;
	queue.set(path.resolve(trimmed), snapshotFromStats(stats));
	if (queue.size > 1024) queue.clear();
}
async function settleMemoryWatchEventPaths(queue, signal) {
	signal?.throwIfAborted();
	if (queue.size === 0) return true;
	const entries = Array.from(queue.entries());
	queue.clear();
	const missingBaseline = [];
	for (const [filePath, previousSnapshot] of entries) {
		signal?.throwIfAborted();
		const currentSnapshot = await snapshotPath(filePath);
		signal?.throwIfAborted();
		if (previousSnapshot === null) {
			if (currentSnapshot !== null) missingBaseline.push({
				filePath,
				snapshot: currentSnapshot
			});
			continue;
		}
		if (!snapshotsMatch(previousSnapshot, currentSnapshot) && !queue.has(filePath) && queue.size < 1024) queue.set(filePath, currentSnapshot);
	}
	if (missingBaseline.length > 0) {
		await sleepWithAbort(MEMORY_WATCH_SETTLE_RECHECK_MS, signal);
		for (const entry of missingBaseline) {
			signal?.throwIfAborted();
			const currentSnapshot = await snapshotPath(entry.filePath);
			signal?.throwIfAborted();
			if (!snapshotsMatch(entry.snapshot, currentSnapshot) && !queue.has(entry.filePath) && queue.size < 1024) queue.set(entry.filePath, currentSnapshot);
		}
	}
	return queue.size === 0;
}
//#endregion
//#region extensions/memory-core/src/memory/manager-watch-resources.ts
const MEMORY_WATCH_PRESSURE_STARTUP_CHECK_DELAY_MS = 1e4;
const log$1 = createSubsystemLogger("memory");
const TEST_MEMORY_WATCH_FACTORY_KEY = Symbol.for("openclaw.test.memoryWatchFactory");
const TEST_MEMORY_NATIVE_WATCH_FACTORY_KEY = Symbol.for("openclaw.test.memoryNativeWatchFactory");
var MemoryFileWatchResources = class {
	constructor(agentId, watchSettings, callbacks) {
		this.agentId = agentId;
		this.watchSettings = watchSettings;
		this.callbacks = callbacks;
		this.closed = false;
		this.watcher = null;
		this.memoryWatchPressureStartupTimer = null;
		this.pendingWatchPaths = /* @__PURE__ */ new Map();
		this.pendingChange = false;
		this.watchTimer = null;
		this.starting = null;
		this.reconciling = null;
		this.settling = null;
		this.lifetime = new AbortController();
		this.pendingReconciliations = /* @__PURE__ */ new Map();
		this.reconcileAll = false;
		this.nativeMemoryWatchPairs = [];
		this.memoryWatchPressureWarning = { shown: false };
		this.memoryWatchCapacityDegraded = false;
	}
	get capacityDegraded() {
		return this.memoryWatchCapacityDegraded;
	}
	scheduleMemoryWatchPressureStartupCheck() {
		if (this.memoryWatchPressureStartupTimer || this.memoryWatchPressureWarning.shown || this.closed || this.nativeMemoryWatchPairs.length === 0 && !this.watcher) return;
		this.memoryWatchPressureStartupTimer = setTimeout(() => {
			this.memoryWatchPressureStartupTimer = null;
			if (this.closed || this.memoryWatchPressureWarning.shown) return;
			if (this.watcher) this.warnIfMemoryWatchPressure(countChokidarWatchedEntries(this.watcher), "paths");
			if (this.memoryWatchPressureWarning.shown) return;
			let directoryCount = 0;
			for (const pair of this.nativeMemoryWatchPairs) directoryCount += pair.treeWatchers?.size ?? 0;
			this.warnIfMemoryWatchPressure(directoryCount, "directories");
		}, MEMORY_WATCH_PRESSURE_STARTUP_CHECK_DELAY_MS);
	}
	warnIfMemoryWatchPressure(count, unit) {
		const reindexCommand = formatCliCommand(`openclaw memory index --force --agent ${this.agentId}`);
		warnIfMemoryWatchPressureHigh(this.memoryWatchPressureWarning, count, unit, "Large memory folders or extraPaths can make OpenClaw run out of file watchers or open files.", `Remove unnecessary memory.search.extraPaths entries or narrow their directory roots, including per-agent entries; otherwise review the host's file-watch/open-file limits. After changes, restart the Gateway. To refresh the affected index, run in the Gateway's environment: ${reindexCommand}.`, (message) => log$1.warn(message));
	}
	closeNativeMemoryWatchChildren(pair) {
		if (pair.treeWatchers) {
			for (const entry of pair.treeWatchers.values()) this.closeNativeMemoryWatcher(entry.watcher);
			pair.treeWatchers.clear();
		} else this.closeNativeMemoryWatcher(pair.main);
		pair.main = null;
	}
	closeNativeMemoryWatcher(watcher) {
		try {
			watcher?.close();
		} catch {}
	}
	closeNativeMemoryWatchPair(pair) {
		this.closeNativeMemoryWatchChildren(pair);
		this.closeNativeMemoryWatcher(pair.parent);
		pair.parent = null;
		const index = this.nativeMemoryWatchPairs.indexOf(pair);
		if (index >= 0) this.nativeMemoryWatchPairs.splice(index, 1);
	}
	closeNativeMemoryWatchPairs() {
		while (this.nativeMemoryWatchPairs.length > 0) {
			const pair = this.nativeMemoryWatchPairs[0];
			if (!pair) return;
			this.closeNativeMemoryWatchPair(pair);
		}
	}
	degradeMemoryWatchCapacity(watchPath, err, markDirty) {
		const code = getFileWatchCapacityCode(err);
		if (!code) return false;
		if (this.memoryWatchCapacityDegraded) return true;
		this.memoryWatchCapacityDegraded = true;
		this.callbacks.onUnavailable();
		this.closeNativeMemoryWatchPairs();
		const watcher = this.watcher;
		if (watcher) {
			watcher.close().catch((error) => {
				log$1.warn(`memory watcher close failed: ${String(error)}`);
			});
			watcher.on("error", () => {});
		}
		markDirty();
		log$1.warn(`memory watcher capacity exhausted on ${watchPath} (${code}); watching disabled, memory will refresh on search`);
		return true;
	}
	start() {
		return this.starting ??= this.startWatching();
	}
	markMemoryWatchDirty(watchPath, stats) {
		this.pendingChange = true;
		recordMemoryWatchEventPath(this.pendingWatchPaths, watchPath, stats);
		this.callbacks.onDirty?.();
		this.scheduleWatchSync();
	}
	resolveMemoryWatchFactory() {
		if (process.env.VITEST === "true" || false) {
			const override = Reflect.get(globalThis, TEST_MEMORY_WATCH_FACTORY_KEY);
			if (typeof override === "function") return override;
		}
		return chokidar.watch.bind(chokidar);
	}
	resolveMemoryNativeWatchFactory() {
		if (process.env.VITEST === "true" || false) {
			const override = Reflect.get(globalThis, TEST_MEMORY_NATIVE_WATCH_FACTORY_KEY);
			if (typeof override === "function") return override;
		}
		return fs.watch.bind(fs);
	}
	async close() {
		this.closed = true;
		this.lifetime.abort();
		this.pendingReconciliations.clear();
		this.reconcileAll = false;
		if (this.watchTimer) {
			clearTimeout(this.watchTimer);
			this.watchTimer = null;
		}
		if (this.memoryWatchPressureStartupTimer) {
			clearTimeout(this.memoryWatchPressureStartupTimer);
			this.memoryWatchPressureStartupTimer = null;
		}
		this.closeNativeMemoryWatchPairs();
		await Promise.allSettled([
			this.starting,
			this.reconciling,
			this.settling
		]);
		if (this.watcher) {
			await this.watcher.close();
			this.watcher = null;
		}
		this.pendingWatchPaths.clear();
		this.pendingChange = false;
	}
	scheduleWatchSync() {
		if (this.closed) return;
		if (this.watchTimer) clearTimeout(this.watchTimer);
		this.watchTimer = setTimeout(() => {
			this.watchTimer = null;
			if (this.settling) return;
			const settle = (async () => {
				if (this.closed) return;
				await this.reconciling;
				if (!await settleMemoryWatchEventPaths(this.pendingWatchPaths, this.lifetime.signal)) return;
				if (this.closed) return;
				this.pendingChange = false;
				await this.callbacks.onChange();
			})().catch((error) => {
				if (!this.closed) log$1.warn(`memory sync failed (watch): ${String(error)}`);
			}).finally(() => {
				if (this.settling === settle) {
					this.settling = null;
					if (this.pendingChange) this.scheduleWatchSync();
				}
			});
			this.settling = settle;
		}, this.watchSettings.sync.watchDebounceMs);
	}
	enqueueReconciliation(key, run) {
		if (this.closed) return Promise.resolve();
		if (!this.reconcileAll) {
			this.pendingReconciliations.set(key, run);
			if (this.pendingReconciliations.size > 1024) {
				this.pendingReconciliations.clear();
				this.reconcileAll = true;
			}
		}
		if (!this.reconciling) {
			const pending = Promise.resolve().then(async () => {
				await this.starting;
				while (!this.closed) {
					if (this.reconcileAll) {
						this.reconcileAll = false;
						const pairs = [...this.nativeMemoryWatchPairs];
						for (const pair of pairs) await pair.reconcile?.();
						continue;
					}
					const next = this.pendingReconciliations.entries().next().value;
					if (!next) {
						this.reconciling = null;
						return;
					}
					this.pendingReconciliations.delete(next[0]);
					await next[1]();
				}
			}).catch((error) => {
				if (!this.closed) {
					this.pendingReconciliations.clear();
					this.reconcileAll = false;
					this.pendingChange = true;
					this.callbacks.onDirty?.();
					this.callbacks.onUnavailable();
					this.scheduleWatchSync();
					log$1.warn(`memory watch reconciliation failed: ${String(error)}`);
				}
			}).finally(() => {
				if (this.reconciling === pending) this.reconciling = null;
			});
			this.reconciling = pending;
		}
		return this.reconciling;
	}
};
//#endregion
//#region extensions/memory-core/src/memory/file-watcher.ts
const IGNORED_MEMORY_WATCH_DIR_NAMES = /* @__PURE__ */ new Set([
	".git",
	"node_modules",
	".pnpm-store",
	".venv",
	"venv",
	".tox",
	"__pycache__"
]);
const log = createSubsystemLogger("memory");
function shouldIgnoreMemoryWatchPath(watchPath, stats, multimodalSettings) {
	const normalized = path.normalize(watchPath);
	if (normalized.split(path.sep).map((segment) => normalizeLowercaseStringOrEmpty(segment)).some((segment) => IGNORED_MEMORY_WATCH_DIR_NAMES.has(segment))) return true;
	if (stats?.isDirectory?.()) return false;
	if (!stats) return false;
	const extension = normalizeLowercaseStringOrEmpty(path.extname(normalized));
	if (extension.length === 0 || extension === ".md") return false;
	if (!multimodalSettings) return true;
	return classifyMemoryMultimodalPath(normalized, multimodalSettings) === null;
}
/** Native Memory file coverage and settling, independent of index or provider state. */
var MemoryFileWatcher = class extends MemoryFileWatchResources {
	constructor(options) {
		super(options.agentId, options.settings, options);
		this.nextWatchGeneration = 0;
		this.workspaceDir = options.workspaceDir;
		this.settings = options.settings;
	}
	async startWatching() {
		if (this.closed) return;
		if (this.memoryWatchCapacityDegraded || this.watcher || this.nativeMemoryWatchPairs.length > 0) return;
		const fileWatchPaths = /* @__PURE__ */ new Set([path.join(this.workspaceDir, "MEMORY.md"), path.join(this.workspaceDir, "USER.md")]);
		const memoryDir = path.join(this.workspaceDir, "memory");
		const dirWatchPaths = /* @__PURE__ */ new Set([memoryDir]);
		const additionalPaths = normalizeExtraMemoryPathEntries(this.workspaceDir, this.settings.extraPaths);
		for (const entry of additionalPaths) try {
			const stat = await fs$1.lstat(entry.path);
			if (this.closed) return;
			if (stat.isSymbolicLink()) continue;
			if (stat.isDirectory()) {
				dirWatchPaths.add(entry.path);
				continue;
			}
			if (stat.isFile() && (normalizeLowercaseStringOrEmpty(entry.path).endsWith(".md") || classifyMemoryMultimodalPath(entry.path, this.settings.multimodal) !== null)) fileWatchPaths.add(entry.path);
		} catch {
			continue;
		}
		const markDirty = (watchPath, stats) => {
			if (this.closed) return;
			if (watchPath) {
				if (shouldIgnoreMemoryWatchPath(watchPath, stats, this.settings.multimodal)) return;
				const normalizedWatchPath = path.resolve(watchPath);
				const matchingEntries = isPathInside(memoryDir, normalizedWatchPath) || normalizedWatchPath === path.join(this.workspaceDir, "MEMORY.md") || normalizedWatchPath === path.join(this.workspaceDir, "USER.md") ? [] : additionalPaths.filter((entry) => isPathInside(entry.path, normalizedWatchPath));
				const couldBeFile = !stats?.isDirectory?.() && !shouldIgnoreMemoryWatchPath(watchPath, stats ?? {}, this.settings.multimodal);
				const couldBeDirectory = !stats || stats.isDirectory?.();
				if (matchingEntries.length > 0 && !matchingEntries.some((entry) => couldBeFile && matchesExtraMemoryPathEntry(entry, normalizedWatchPath) || couldBeDirectory && matchesExtraMemoryPathEntry(entry, normalizedWatchPath, { directory: true }))) return;
			}
			this.markMemoryWatchDirty(watchPath, stats);
		};
		const nativeRecursiveSupported = process.platform === "darwin" || process.platform === "win32";
		for (const dir of dirWatchPaths) {
			if ((nativeRecursiveSupported ? await this.attachNativeMemoryWatchForDir(dir, markDirty) : process.platform === "linux" ? await this.attachLinuxMemoryDirectoryTreeWatchForDir(dir, markDirty) : "failed") !== "attached") fileWatchPaths.add(dir);
			if (this.memoryWatchCapacityDegraded) return;
		}
		if (fileWatchPaths.size > 0) this.attachMemoryChokidarPaths(Array.from(fileWatchPaths), markDirty);
		this.scheduleMemoryWatchPressureStartupCheck();
	}
	async attachNativeMemoryWatchForDir(dir, markDirty, stillCurrent = () => true) {
		if (this.closed || this.memoryWatchCapacityDegraded || !stillCurrent()) return "failed";
		let recordedInode;
		try {
			recordedInode = (await fs$1.stat(dir)).ino;
		} catch (err) {
			return isFileMissingError(err) ? "missing" : "failed";
		}
		const pair = {
			dir,
			main: null,
			parent: null
		};
		if (this.closed || this.memoryWatchCapacityDegraded || !stillCurrent()) return "failed";
		let mainWatcher;
		const generation = ++this.nextWatchGeneration;
		try {
			mainWatcher = this.resolveMemoryNativeWatchFactory()(dir, { recursive: true }, (_eventType, filename) => this.enqueueReconciliation(`${generation}\0${filename ?? ""}`, async () => {
				if (this.closed || mainWatcher && pair.main !== mainWatcher) return;
				if (filename == null) {
					markDirty();
					return;
				}
				const full = path.join(dir, filename);
				let stats;
				try {
					stats = await fs$1.lstat(full);
				} catch {
					stats = void 0;
				}
				if (this.closed || pair.main !== mainWatcher) return;
				markDirty(full, stats);
			}));
		} catch (err) {
			if (isFileMissingError(err)) return "missing";
			if (this.degradeMemoryWatchCapacity(dir, err, markDirty)) return "failed";
			log.warn(`failed to start native recursive watcher on ${dir}: ${String(err)}; falling back to chokidar`);
			return "failed";
		}
		pair.main = mainWatcher;
		mainWatcher.on("error", (err) => {
			if (pair.main !== mainWatcher) return;
			if (this.degradeMemoryWatchCapacity(dir, err, markDirty)) return;
			const message = err instanceof Error ? err.message : String(err);
			log.warn(`memory native watcher error on ${dir}: ${message}`);
			this.closeNativeMemoryWatchPair(pair);
			if (this.closed) return;
			markDirty();
			this.attachMemoryChokidarFallback(dir, markDirty);
		});
		this.nativeMemoryWatchPairs.push(pair);
		pair.reconcile = async () => markDirty();
		await this.attachNativeMemoryParentWatch(pair, recordedInode, markDirty, "native", () => this.attachNativeMemoryWatchForDir(dir, markDirty, () => this.nativeMemoryWatchPairs.includes(pair)), stillCurrent);
		if (!stillCurrent()) {
			this.closeNativeMemoryWatchPair(pair);
			return "failed";
		}
		return "attached";
	}
	async attachNativeMemoryParentWatch(pair, recordedInode, markDirty, label, reattach, stillCurrent) {
		const { dir } = pair;
		let watchedInode = recordedInode;
		const parentDir = path.dirname(dir);
		const baseName = path.basename(dir);
		let parentInode;
		try {
			parentInode = (await fs$1.stat(parentDir)).ino;
		} catch (err) {
			log.warn(`memory ${label} parent watcher could not start on ${parentDir}: ${String(err)}`);
			return;
		}
		if (this.closed || !stillCurrent() || !this.nativeMemoryWatchPairs.includes(pair)) return;
		let parentWatcher = null;
		const reconcileRoot = async () => {
			if (this.closed || !this.nativeMemoryWatchPairs.includes(pair)) return;
			let currentInode = null;
			let result = "missing";
			try {
				currentInode = (await fs$1.stat(dir)).ino;
			} catch (err) {
				result = isFileMissingError(err) ? "missing" : "failed";
				if (result === "missing") try {
					if ((await fs$1.stat(parentDir)).ino !== parentInode) result = "failed";
				} catch {
					result = "failed";
				}
			}
			if (this.closed || !this.nativeMemoryWatchPairs.includes(pair)) return;
			if (currentInode === watchedInode && result !== "failed") return;
			this.closeNativeMemoryWatchChildren(pair);
			watchedInode = null;
			markDirty();
			if (currentInode !== null) result = await reattach();
			if (this.closed || !this.nativeMemoryWatchPairs.includes(pair)) return;
			if (result === "missing" && pair.parent) return;
			this.closeNativeMemoryWatchPair(pair);
			if (result !== "attached") this.attachMemoryChokidarFallback(dir, markDirty);
		};
		const reconcileChildren = pair.reconcile;
		pair.reconcile = async () => {
			await reconcileRoot();
			if (!this.closed && this.nativeMemoryWatchPairs.includes(pair) && pair.main) await reconcileChildren?.();
		};
		const generation = ++this.nextWatchGeneration;
		try {
			parentWatcher = this.resolveMemoryNativeWatchFactory()(parentDir, { recursive: false }, (_eventType, filename) => {
				if (this.closed || pair.parent !== parentWatcher) return;
				if (filename !== null && filename !== baseName && (pair.main || filename !== path.basename(parentDir))) return;
				return this.enqueueReconciliation(`${generation}\0parent`, reconcileRoot);
			});
			const attachedParent = parentWatcher;
			attachedParent.on("error", (err) => {
				if (pair.parent !== attachedParent) return;
				if (this.degradeMemoryWatchCapacity(dir, err, markDirty)) return;
				const message = err instanceof Error ? err.message : String(err);
				log.warn(`memory ${label} parent watcher error on ${path.dirname(dir)}: ${message}`);
				this.closeNativeMemoryWatcher(attachedParent);
				pair.parent = null;
				if (!pair.main) {
					this.closeNativeMemoryWatchPair(pair);
					if (!this.closed) {
						markDirty();
						this.attachMemoryChokidarFallback(dir, markDirty);
					}
				}
			});
			pair.parent = attachedParent;
			await reconcileRoot();
		} catch (err) {
			if (this.degradeMemoryWatchCapacity(dir, err, markDirty)) return;
			log.warn(`memory ${label} parent watcher could not start on ${path.dirname(dir)}: ${String(err)}`);
		}
	}
	async attachLinuxMemoryDirectoryTreeWatchForDir(dir, markDirty, stillCurrent = () => true) {
		if (this.closed || this.memoryWatchCapacityDegraded || !stillCurrent()) return "failed";
		let recordedInode;
		try {
			recordedInode = (await fs$1.stat(dir)).ino;
		} catch (err) {
			return isFileMissingError(err) ? "missing" : "failed";
		}
		let pair = null;
		const treeWatchers = /* @__PURE__ */ new Map();
		let rootMissing = false;
		let installing = true;
		const current = () => !this.closed && !this.memoryWatchCapacityDegraded && (!installing || stillCurrent()) && (!pair || this.nativeMemoryWatchPairs.includes(pair));
		const closeAndFallback = (message, cause) => {
			if (this.memoryWatchCapacityDegraded) return;
			if (cause !== void 0 && this.degradeMemoryWatchCapacity(dir, cause, markDirty)) return;
			log.warn(message);
			if (pair) this.closeNativeMemoryWatchPair(pair);
			if (this.closed) return;
			markDirty();
			this.attachMemoryChokidarFallback(dir, markDirty);
		};
		const closeDirectorySubtree = (watchDir) => {
			const watchDirPrefix = `${watchDir}${path.sep}`;
			for (const [entryDir, entry] of Array.from(treeWatchers.entries())) {
				if (entryDir !== watchDir && !entryDir.startsWith(watchDirPrefix)) continue;
				this.closeNativeMemoryWatcher(entry.watcher);
				treeWatchers.delete(entryDir);
			}
		};
		const attachDirectory = async (watchDir) => {
			if (!current()) return null;
			let currentInode;
			try {
				const currentStat = await fs$1.stat(watchDir);
				if (!currentStat.isDirectory()) return null;
				currentInode = currentStat.ino;
			} catch (err) {
				rootMissing ||= watchDir === dir && isFileMissingError(err);
				return null;
			}
			if (!current()) return null;
			const existing = treeWatchers.get(watchDir);
			if (existing) {
				if (existing.ino === currentInode) return existing.watcher;
				closeDirectorySubtree(watchDir);
			}
			let watcher;
			const generation = ++this.nextWatchGeneration;
			try {
				watcher = this.resolveMemoryNativeWatchFactory()(watchDir, { recursive: false }, (eventType, filename) => this.enqueueReconciliation(`${generation}\0${filename ?? ""}`, async () => {
					if (this.closed || watcher && treeWatchers.get(watchDir)?.watcher !== watcher) return;
					if (filename == null) {
						markDirty();
						if (!await this.attachLinuxSubtree(watchDir, attachDirectory, current)) closeAndFallback(`failed to refresh Linux memory directory watchers under ${watchDir}; falling back to chokidar`);
						return;
					}
					const full = path.join(watchDir, filename);
					let stats;
					try {
						stats = await fs$1.lstat(full);
					} catch {
						stats = void 0;
					}
					if (!current() || treeWatchers.get(watchDir)?.watcher !== watcher) return;
					if (!stats) closeDirectorySubtree(full);
					if (stats?.isDirectory()) {
						if (eventType === "rename") closeDirectorySubtree(full);
						if (!await this.attachLinuxSubtree(full, attachDirectory, current)) {
							closeAndFallback(`failed to attach Linux memory directory watcher under ${full}; falling back to chokidar`);
							return;
						}
					}
					markDirty(full, stats);
				}));
			} catch (err) {
				rootMissing ||= watchDir === dir && isFileMissingError(err);
				if (this.degradeMemoryWatchCapacity(watchDir, err, markDirty)) return null;
				if (watchDir === dir && !rootMissing) log.warn(`failed to start Linux memory directory watcher on ${watchDir}: ${String(err)}; falling back to chokidar`);
				return null;
			}
			treeWatchers.set(watchDir, {
				watcher,
				ino: currentInode
			});
			watcher.on("error", (err) => {
				if (treeWatchers.get(watchDir)?.watcher !== watcher) return;
				const detail = err instanceof Error ? err.message : String(err);
				closeAndFallback(`memory Linux directory watcher error on ${watchDir}: ${detail}`, err);
			});
			return watcher;
		};
		const mainWatcher = await attachDirectory(dir);
		if (!mainWatcher) return rootMissing ? "missing" : "failed";
		pair = {
			dir,
			main: mainWatcher,
			parent: null,
			treeWatchers
		};
		this.nativeMemoryWatchPairs.push(pair);
		pair.reconcile = async () => {
			if (!current()) return;
			markDirty();
			const visited = /* @__PURE__ */ new Set([dir]);
			if (!await this.attachLinuxSubtree(dir, attachDirectory, current, visited)) {
				closeAndFallback(`failed to refresh Linux memory directory watchers under ${dir}; falling back to chokidar`);
				return;
			}
			for (const watchedDir of treeWatchers.keys()) if (!visited.has(watchedDir)) closeDirectorySubtree(watchedDir);
		};
		let subtreeAttached = await this.attachLinuxSubtree(dir, attachDirectory, current);
		try {
			subtreeAttached = (await fs$1.stat(dir)).ino === recordedInode && subtreeAttached;
		} catch (err) {
			this.closeNativeMemoryWatchPair(pair);
			if (!this.closed) markDirty();
			return isFileMissingError(err) ? "missing" : "failed";
		}
		if (!current()) {
			this.closeNativeMemoryWatchPair(pair);
			return "failed";
		}
		if (!subtreeAttached) {
			closeAndFallback(`failed to attach Linux memory directory watcher subtree under ${dir}; falling back to chokidar`);
			return "attached";
		}
		await this.attachNativeMemoryParentWatch(pair, recordedInode, markDirty, "Linux", () => this.attachLinuxMemoryDirectoryTreeWatchForDir(dir, markDirty, () => this.nativeMemoryWatchPairs.includes(pair)), stillCurrent);
		if (!stillCurrent()) {
			this.closeNativeMemoryWatchPair(pair);
			return "failed";
		}
		installing = false;
		return "attached";
	}
	async attachLinuxSubtree(root, attachDirectory, current, visited) {
		if (!current()) return true;
		let rootStats;
		try {
			rootStats = await fs$1.lstat(root);
		} catch {
			return false;
		}
		if (!rootStats?.isDirectory() || shouldIgnoreMemoryWatchPath(root, rootStats, this.settings.multimodal)) return true;
		if (!current()) return true;
		if (!await attachDirectory(root)) return false;
		visited?.add(root);
		let entries;
		try {
			entries = await fs$1.readdir(root, { withFileTypes: true });
		} catch {
			return false;
		}
		for (const entry of entries) {
			if (!entry.isDirectory() || entry.isSymbolicLink()) continue;
			if (!await this.attachLinuxSubtree(path.join(root, entry.name), attachDirectory, current, visited)) return false;
		}
		return true;
	}
	attachMemoryChokidarFallback(dir, markDirty) {
		if (this.closed || this.memoryWatchCapacityDegraded) return;
		try {
			this.attachMemoryChokidarPaths(dir, markDirty);
		} catch (err) {
			log.warn(`failed to attach chokidar fallback for ${dir}: ${String(err)}`);
		}
	}
	attachMemoryChokidarPaths(paths, markDirty) {
		if (this.closed || this.memoryWatchCapacityDegraded) return;
		if (this.watcher) {
			this.watcher.add(paths);
			return;
		}
		const watcher = this.resolveMemoryWatchFactory()(typeof paths === "string" ? [paths] : paths, {
			ignoreInitial: true,
			ignored: (watchPath, stats) => shouldIgnoreMemoryWatchPath(watchPath, stats, this.settings.multimodal)
		});
		this.watcher = watcher;
		watcher.on("add", markDirty);
		watcher.on("change", markDirty);
		watcher.on("unlink", (watchPath) => markDirty(watchPath, { isDirectory: () => false }));
		watcher.on("unlinkDir", (watchPath) => markDirty(watchPath, { isDirectory: () => true }));
		watcher.on("error", (err) => {
			if (this.degradeMemoryWatchCapacity("chokidar", err, markDirty)) return;
			const message = err instanceof Error ? err.message : String(err);
			log.warn(`memory watcher error: ${message}`);
		});
		watcher.once("ready", () => {
			this.warnIfMemoryWatchPressure(countChokidarWatchedEntries(watcher), "paths");
		});
	}
};
//#endregion
export { MemoryFileWatcher as t };
