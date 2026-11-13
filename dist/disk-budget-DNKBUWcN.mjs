import { c as normalizeOptionalLowercaseString, o as normalizeLowercaseStringOrEmpty } from "./string-coerce-6kR-86XC.mjs";
import { i as resolveGlobalSingleton } from "./global-singleton-BfHBYj6Y.mjs";
import { r as resolveRealpathOrAbsolute } from "./boundary-path-CAv_plX7.mjs";
import { r as getChildLogger } from "./logger-DabFgCLJ.mjs";
import { r as resolveRuntimeWorkerUrl } from "./runtime-worker-url-S0NIVxUR.mjs";
import { t as err } from "./result-BQGgYouL.mjs";
import { t as WorkerTaskPool } from "./worker-task-pool-Cl1KhdJb.mjs";
import { a as isPrimarySessionTranscriptFileName, c as isSessionStoreTempArtifactName, l as isTrajectorySessionArtifactName, o as isRetainedSessionTranscriptArchiveName, r as isCompactionCheckpointTranscriptFileName, s as isSessionArchiveArtifactName, t as SESSION_STORE_TEMP_STALE_MS } from "./artifacts-D5koLTEP.mjs";
import { o as resolveSessionArtifactDirectory, s as resolveSessionFilePathCore } from "./paths-CQ3zRaeb.mjs";
import { r as getRuntimeConfig, t as captureRuntimeConfigAsyncReader } from "./io.runtime-BOdk1dW9.mjs";
import "./config-D1R2igem.mjs";
import { a as removeFileForBudget, i as readSessionsDirFiles, o as removeFileIfExists, r as readSessionPromptBlobFiles, t as isSessionPromptBlobTempArtifactName } from "./disk-budget-files-DE2PkCPJ.mjs";
import { a as normalizeStoreSessionKey } from "./store-entry-CBksE8pX.mjs";
import { a as collectActiveSessionLifecycleMutationIdentities, o as collectActiveSessionWorkAdmissions } from "./session-lifecycle-admission-6HF8YqSN.mjs";
import { i as projectSessionStoreForPersistence } from "./skill-prompt-blobs-CDwNJfQ9.mjs";
import { d as resolveMaintenanceConfigFromInput, s as isSessionEntryDiskBudgetEvictable } from "./store-maintenance-C0GS_WY5.mjs";
import { n as readLegacyCompactionSnapshotPaths } from "./legacy-compaction-history-x3brqeU3.mjs";
import { n as resolveSessionMaintenancePreserveKeys, t as collectSessionWorkAdmissionKeysFromSnapshot } from "./store-maintenance-preserve-snapshot-Dxlg_v74.mjs";
import { a as resolveTrajectoryFilePath, o as resolveTrajectoryPointerFilePath } from "./paths-BUKQ0aWt.mjs";
import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
//#region src/config/sessions/store-maintenance-preserve.ts
const preserveKeysProviders = /* @__PURE__ */ new Set();
/** Registers a provider for session maintenance preserve keys. */
function registerSessionMaintenancePreserveKeysProvider(provider) {
	preserveKeysProviders.add(provider);
	return () => {
		preserveKeysProviders.delete(provider);
	};
}
function addSessionMaintenancePreserveKeys(keys, values) {
	for (const value of values ?? []) {
		const normalized = normalizeStoreSessionKey(value ?? "");
		if (normalized) keys.add(normalized);
	}
}
/** Collects normalized session keys that maintenance/pruning must preserve. */
function collectSessionMaintenancePreserveKeys(baseKeys) {
	const keys = /* @__PURE__ */ new Set();
	addSessionMaintenancePreserveKeys(keys, baseKeys);
	for (const provider of preserveKeysProviders) try {
		addSessionMaintenancePreserveKeys(keys, provider());
	} catch {}
	return keys.size > 0 ? keys : void 0;
}
/** Resolves store keys owned by active work, including aliases sharing a backing session id. */
function collectActiveSessionWorkAdmissionKeys(params) {
	const keys = collectSessionWorkAdmissionKeysFromSnapshot(params.store, [...collectActiveSessionWorkAdmissions().get(params.storePath) ?? []]);
	return keys.size > 0 ? keys : void 0;
}
/** Capture live parent owners before dispatch; no protection registry is copied into the worker. */
function captureSessionMaintenancePreservation(storePath) {
	return {
		providerKeys: [...collectSessionMaintenancePreserveKeys() ?? []].toSorted(),
		workIdentities: [...collectActiveSessionWorkAdmissions().get(storePath) ?? []].toSorted(),
		lifecycleIdentities: collectActiveSessionLifecycleMutationIdentities(storePath)
	};
}
/** Collects runtime, active-work, and lifecycle keys protected from automatic maintenance. */
function collectSessionMaintenancePreserveKeysForStore(params) {
	const keys = resolveSessionMaintenancePreserveKeys({
		...params,
		snapshot: captureSessionMaintenancePreservation(params.storePath)
	});
	return keys.size > 0 ? keys : void 0;
}
//#endregion
//#region src/config/sessions/store-maintenance-runtime.ts
function resolveMaintenanceConfig() {
	let maintenance;
	try {
		maintenance = getRuntimeConfig().session?.maintenance;
	} catch {}
	return resolveMaintenanceConfigFromInput(maintenance);
}
/** Use the canonical runtime policy even when a caller supplies only routing config. */
function captureMaintenanceConfigAsyncReader(assertCallerCurrent) {
	const read = captureRuntimeConfigAsyncReader({ assertCurrent: assertCallerCurrent });
	return Object.assign(async () => {
		let maintenance;
		try {
			maintenance = (await read()).session?.maintenance;
		} catch {
			read.assertCurrent();
		}
		read.assertCurrent();
		return resolveMaintenanceConfigFromInput(maintenance);
	}, { assertCurrent: read.assertCurrent });
}
//#endregion
//#region src/config/sessions/disk-budget-runtime.ts
const measurements = resolveGlobalSingleton(Symbol.for("openclaw.sessionDiskBudgetWorkers"), () => ({
	pool: new WorkerTaskPool({
		workerUrl: resolveRuntimeWorkerUrl({
			currentModuleUrl: import.meta.url,
			sourceWorkerName: "disk-budget.worker",
			distWorkerPath: "config/sessions/disk-budget.worker.js"
		}),
		maxWorkers: 1
	}),
	pending: /* @__PURE__ */ new Set()
}), () => drainSessionDiskBudgetWorkers());
/** Join admitted scans before retiring workers; later measurements reuse the pool. */
function drainSessionDiskBudgetWorkers() {
	return measurements.draining ??= Promise.resolve().then(async () => {
		while (measurements.pending.size > 0) await Promise.allSettled(measurements.pending);
		await measurements.pool.rotate();
	}).finally(() => {
		measurements.draining = void 0;
	});
}
/** Measures physical session artifacts without running per-file synchronous work on the caller. */
async function measureSessionPhysicalDiskUsage(storePath) {
	const pending = measurements.pool.run(path.resolve(storePath), {});
	measurements.pending.add(pending);
	try {
		return await pending;
	} finally {
		measurements.pending.delete(pending);
	}
}
//#endregion
//#region src/config/sessions/session-history-archive-pruning-diagnostics.ts
function archivePruningLogFields(diagnostics) {
	const milliseconds = (value) => value === void 0 ? void 0 : Math.round(value);
	return {
		trigger: diagnostics.trigger,
		checkpointCalls: diagnostics.checkpointCalls,
		checkpointIncomplete: diagnostics.checkpointIncomplete,
		checkpoint: diagnostics.checkpoint,
		totalBytesBefore: diagnostics.totalBytesBefore,
		totalBytesAfter: diagnostics.totalBytesAfter,
		walBytesBefore: diagnostics.walBytesBefore,
		walBytesAfter: diagnostics.walBytesAfter,
		checkpointMs: milliseconds(diagnostics.checkpointMs),
		checkpointMaxMs: milliseconds(diagnostics.checkpointMaxMs),
		vacuumMs: milliseconds(diagnostics.vacuumMs),
		vacuumPasses: diagnostics.vacuumPasses,
		vacuumPagesRequested: diagnostics.vacuumPagesRequested,
		queryMs: milliseconds(diagnostics.queryMs),
		rowDeletionMs: milliseconds(diagnostics.rowDeletionMs),
		fileRemovalMs: milliseconds(diagnostics.fileRemovalMs),
		removedFiles: diagnostics.removedFiles,
		missingFiles: diagnostics.missingFiles,
		failedRemovals: diagnostics.failedRemovals,
		measurementMs: milliseconds(diagnostics.measurementMs),
		measurements: diagnostics.measurements,
		legacyInventoryMs: milliseconds(diagnostics.legacyInventoryMs),
		completed: diagnostics.completed === true
	};
}
async function observeSessionArchivePruning(diagnostics, run) {
	const startedAt = performance.now();
	let failed = true;
	try {
		const result = await run();
		failed = false;
		return result;
	} finally {
		const elapsedMs = performance.now() - startedAt;
		if (failed || elapsedMs >= 1e3) try {
			getChildLogger({ subsystem: "session-sqlite" }).warn(failed ? "SQLite session archive pruning failed" : "slow SQLite session archive pruning", {
				elapsedMs: Math.round(elapsedMs),
				archivePruning: archivePruningLogFields(diagnostics)
			});
		} catch {}
	}
}
async function timeArchivePruningAsync(diagnostics, stage, operation) {
	if (!diagnostics) return await operation();
	if (stage === "measurementMs") diagnostics.measurements = (diagnostics.measurements ?? 0) + 1;
	const startedAt = performance.now();
	try {
		return await operation();
	} finally {
		diagnostics[stage] = (diagnostics[stage] ?? 0) + performance.now() - startedAt;
	}
}
//#endregion
//#region src/config/sessions/disk-budget.ts
const NOOP_LOGGER = {
	warn: () => {},
	info: () => {}
};
function measureStoreBytes(store) {
	return Buffer.byteLength(JSON.stringify(store, null, 2), "utf-8");
}
function measureStoreEntryChunkBytes(key, entry) {
	const singleEntryStore = JSON.stringify({ [key]: entry }, null, 2);
	if (!singleEntryStore.startsWith("{\n") || !singleEntryStore.endsWith("\n}")) return measureStoreBytes({ [key]: entry }) - 4;
	const chunk = singleEntryStore.slice(2, -2);
	return Buffer.byteLength(chunk, "utf-8");
}
function buildStoreEntryChunkSizeMap(store) {
	const out = /* @__PURE__ */ new Map();
	for (const [key, entry] of Object.entries(store)) out.set(key, measureStoreEntryChunkBytes(key, entry));
	return out;
}
function resolveProjectedPromptBlobHash(entry) {
	const ref = entry?.skillsSnapshot?.promptRef;
	return ref?.algorithm === "sha256" && typeof ref.hash === "string" ? ref.hash : void 0;
}
function buildProjectedPromptBlobRefCounts(store) {
	const counts = /* @__PURE__ */ new Map();
	for (const entry of Object.values(store)) {
		const hash = resolveProjectedPromptBlobHash(entry);
		if (!hash) continue;
		counts.set(hash, (counts.get(hash) ?? 0) + 1);
	}
	return counts;
}
function buildSessionIdRefCounts(store) {
	const counts = /* @__PURE__ */ new Map();
	for (const entry of Object.values(store)) {
		const sessionId = entry?.sessionId;
		if (!sessionId) continue;
		counts.set(sessionId, (counts.get(sessionId) ?? 0) + 1);
	}
	return counts;
}
function resolveSessionTranscriptPathForEntry(params) {
	if (!params.entry.sessionId) return null;
	try {
		const resolved = resolveSessionFilePathCore(params.entry.sessionId, params.entry, { sessionsDir: params.sessionsDir });
		const resolvedSessionsDir = resolveRealpathOrAbsolute(params.sessionsDir);
		const resolvedPath = resolveRealpathOrAbsolute(resolved);
		const relative = path.relative(resolvedSessionsDir, resolvedPath);
		if (!relative || relative.startsWith("..") || path.isAbsolute(relative)) return null;
		return resolvedPath;
	} catch {
		return null;
	}
}
function resolveSessionArtifactPathsForEntry(params) {
	const transcriptPath = resolveSessionTranscriptPathForEntry(params);
	if (!transcriptPath) return [];
	const paths = [transcriptPath];
	if (params.entry.sessionId) {
		paths.push(resolveTrajectoryPointerFilePath(transcriptPath));
		paths.push(resolveTrajectoryFilePath({
			env: {},
			sessionFile: transcriptPath,
			sessionId: params.entry.sessionId
		}));
	}
	return paths;
}
function resolveSessionArtifactCanonicalPathsForEntry(params) {
	return resolveSessionArtifactPathsForEntry(params).map(resolveRealpathOrAbsolute);
}
function resolveReferencedSessionArtifactPaths(params) {
	const referenced = /* @__PURE__ */ new Set();
	if (!params.files.some((file) => isUnreferencedSessionArtifactFile(file, referenced))) return referenced;
	const resolvedSessionsDir = resolveRealpathOrAbsolute(params.sessionsDir);
	for (const entry of Object.values(params.store)) {
		for (const resolved of resolveSessionArtifactCanonicalPathsForEntry({
			sessionsDir: params.sessionsDir,
			entry
		})) referenced.add(resolved);
		for (const checkpointFile of readLegacyCompactionSnapshotPaths(entry)) {
			const resolvedCheckpointPath = resolveRealpathOrAbsolute(checkpointFile);
			const relative = path.relative(resolvedSessionsDir, resolvedCheckpointPath);
			if (relative && !relative.startsWith("..") && !path.isAbsolute(relative)) referenced.add(resolvedCheckpointPath);
		}
	}
	return referenced;
}
async function hasRetainedSessionTranscriptArchives(storePath) {
	return (await readSessionsDirFiles(resolveSessionArtifactDirectory(storePath))).some((file) => isRetainedSessionTranscriptArchiveName(file.name));
}
/** Removes oldest retained archives and legacy compact backups, remeasuring after each file. */
async function pruneSessionTranscriptArchivesToHighWater(params) {
	const { diagnostics } = params;
	const files = await timeArchivePruningAsync(diagnostics, "legacyInventoryMs", async () => (await readSessionsDirFiles(resolveSessionArtifactDirectory(params.storePath))).filter((file) => isRetainedSessionTranscriptArchiveName(file.name)).toSorted((left, right) => left.mtimeMs - right.mtimeMs));
	let usage = await timeArchivePruningAsync(diagnostics, "measurementMs", () => measureSessionPhysicalDiskUsage(params.storePath));
	let removedFiles = 0;
	for (const file of files) {
		if (usage.totalBytes <= params.highWaterBytes) break;
		const removal = params.removeFile ? await params.removeFile(file) : (await timeArchivePruningAsync(diagnostics, "fileRemovalMs", () => removeFileIfExists(file.path))).ok ? "removed" : "failed";
		if (removal === "failed") {
			if (diagnostics) diagnostics.failedRemovals = (diagnostics.failedRemovals ?? 0) + 1;
			continue;
		}
		if (removal === "removed") {
			removedFiles += 1;
			if (diagnostics) diagnostics.removedFiles = (diagnostics.removedFiles ?? 0) + 1;
		}
		usage = await timeArchivePruningAsync(diagnostics, "measurementMs", () => measureSessionPhysicalDiskUsage(params.storePath));
	}
	return {
		removedFiles,
		usage
	};
}
function resolvePromptBlobFileHash(file) {
	return /^[a-f0-9]{64}\.txt$/u.test(file.name) ? file.name.slice(0, -4) : void 0;
}
function isUnreferencedSessionArtifactFile(file, referencedPaths) {
	if (referencedPaths.has(file.canonicalPath)) return false;
	return isCompactionCheckpointTranscriptFileName(file.name) || isTrajectorySessionArtifactName(file.name) || isPrimarySessionTranscriptFileName(file.name);
}
const SESSION_PROMPT_BLOB_UNREFERENCED_GRACE_MS = SESSION_STORE_TEMP_STALE_MS;
function isUnreferencedPromptBlobFileRemovable(file, projectedPromptBlobRefCounts, cutoffMs) {
	if (file.mtimeMs > cutoffMs) return false;
	const hash = resolvePromptBlobFileHash(file);
	return hash ? !projectedPromptBlobRefCounts.has(hash) : false;
}
function isPromptBlobArtifactRemovable(file, projectedPromptBlobRefCounts, promptBlobCutoffMs, tempCutoffMs) {
	if (isSessionPromptBlobTempArtifactName(file.name)) return file.mtimeMs <= tempCutoffMs;
	return isUnreferencedPromptBlobFileRemovable(file, projectedPromptBlobRefCounts, promptBlobCutoffMs);
}
function isDiskBudgetRemovableSessionFile(file, referencedPaths, tempStaleCutoffMs, storeBasename) {
	if (isSessionStoreTempArtifactName(file.name, storeBasename)) return file.mtimeMs <= tempStaleCutoffMs;
	return isSessionArchiveArtifactName(file.name) || isUnreferencedSessionArtifactFile(file, referencedPaths);
}
async function removePromptBlobFileForBudget(params) {
	let file = params.file;
	if (!params.dryRun) {
		const stat = await fs.promises.stat(file.path).catch(() => null);
		if (!stat?.isFile()) return err("not-removed");
		file = {
			...file,
			size: stat.size,
			mtimeMs: stat.mtimeMs
		};
	}
	if (!isPromptBlobArtifactRemovable(file, params.projectedPromptBlobRefCounts, params.promptBlobCutoffMs, params.tempCutoffMs)) return err("not-removed");
	return await removeFileForBudget({
		filePath: file.path,
		canonicalPath: file.canonicalPath,
		dryRun: params.dryRun,
		fileSizesByPath: params.fileSizesByPath,
		simulatedRemovedPaths: params.simulatedRemovedPaths,
		onRemovedPath: params.onRemovedPath
	});
}
async function pruneUnreferencedSessionArtifacts(params) {
	const olderThanMs = Number.isFinite(params.olderThanMs) && params.olderThanMs > 0 ? params.olderThanMs : 0;
	const sessionsDir = resolveSessionArtifactDirectory(params.storePath);
	const files = await readSessionsDirFiles(sessionsDir);
	const promptBlobFiles = await readSessionPromptBlobFiles(sessionsDir);
	const fileSizesByPath = new Map([...files, ...promptBlobFiles].map((file) => [file.canonicalPath, file.size]));
	const simulatedRemovedPaths = /* @__PURE__ */ new Set();
	const now = Date.now();
	const cutoffMs = now - olderThanMs;
	const tempCutoffMs = now - SESSION_STORE_TEMP_STALE_MS;
	const promptBlobCutoffMs = now - Math.max(olderThanMs, SESSION_PROMPT_BLOB_UNREFERENCED_GRACE_MS);
	const referencedPaths = resolveReferencedSessionArtifactPaths({
		files: files.filter((file) => file.mtimeMs <= cutoffMs && !params.excludeCanonicalPaths?.has(file.canonicalPath)),
		sessionsDir,
		store: params.store
	});
	const projectedPromptBlobRefCounts = promptBlobFiles.length > 0 ? buildProjectedPromptBlobRefCounts(projectSessionStoreForPersistence({
		storePath: params.storePath,
		store: params.store
	}).store) : /* @__PURE__ */ new Map();
	const storeBasename = path.basename(params.storePath);
	const removableStoreFiles = files.filter((file) => {
		if (params.excludeCanonicalPaths?.has(file.canonicalPath)) return false;
		if (isSessionStoreTempArtifactName(file.name, storeBasename)) return file.mtimeMs <= tempCutoffMs;
		return file.mtimeMs <= cutoffMs && isUnreferencedSessionArtifactFile(file, referencedPaths);
	});
	const removablePromptBlobFiles = promptBlobFiles.filter((file) => {
		if (params.excludeCanonicalPaths?.has(file.canonicalPath)) return false;
		return isPromptBlobArtifactRemovable(file, projectedPromptBlobRefCounts, promptBlobCutoffMs, tempCutoffMs);
	});
	const removableFiles = [...removableStoreFiles.map((file) => ({
		kind: "store",
		file
	})), ...removablePromptBlobFiles.map((file) => ({
		kind: "promptBlob",
		file
	}))].toSorted((a, b) => a.file.mtimeMs - b.file.mtimeMs);
	let removedFiles = 0;
	let freedBytes = 0;
	const dryRun = params.dryRun === true;
	for (const item of removableFiles) {
		const removal = item.kind === "promptBlob" ? await removePromptBlobFileForBudget({
			file: item.file,
			projectedPromptBlobRefCounts,
			promptBlobCutoffMs,
			tempCutoffMs,
			dryRun,
			fileSizesByPath,
			simulatedRemovedPaths
		}) : await removeFileForBudget({
			filePath: item.file.path,
			canonicalPath: item.file.canonicalPath,
			dryRun,
			fileSizesByPath,
			simulatedRemovedPaths
		});
		if (!removal.ok) continue;
		removedFiles += 1;
		freedBytes += removal.value;
	}
	return {
		scannedFiles: files.length + promptBlobFiles.length,
		removedFiles,
		freedBytes,
		olderThanMs
	};
}
async function enforceSessionDiskBudget(params) {
	const maxBytes = params.maintenance.maxDiskBytes;
	const highWaterBytes = params.maintenance.highWaterBytes;
	if (maxBytes == null || highWaterBytes == null) return null;
	const log = params.log ?? NOOP_LOGGER;
	const dryRun = params.dryRun === true;
	const sessionsDir = resolveSessionArtifactDirectory(params.storePath);
	const files = await readSessionsDirFiles(sessionsDir);
	const promptBlobFiles = await readSessionPromptBlobFiles(sessionsDir);
	const fileSizesByPath = new Map([...files, ...promptBlobFiles].map((file) => [file.canonicalPath, file.size]));
	const simulatedRemovedPaths = /* @__PURE__ */ new Set();
	const resolvedStorePath = resolveRealpathOrAbsolute(params.storePath);
	const storeFile = files.find((file) => file.canonicalPath === resolvedStorePath);
	const projectedPersistence = projectSessionStoreForPersistence({
		storePath: params.storePath,
		store: params.store
	});
	const projectedStore = projectedPersistence.store;
	let projectedStoreBytes = measureStoreBytes(projectedStore);
	const projectedPromptBlobBytesByHash = /* @__PURE__ */ new Map();
	const existingPromptBlobFilesByHash = /* @__PURE__ */ new Map();
	for (const file of promptBlobFiles) {
		const hash = resolvePromptBlobFileHash(file);
		if (hash) existingPromptBlobFilesByHash.set(hash, file);
	}
	for (const [hash, blob] of projectedPersistence.promptBlobs) if (!existingPromptBlobFilesByHash.has(hash)) projectedPromptBlobBytesByHash.set(hash, blob.ref.bytes);
	const projectedPromptBlobRefCounts = buildProjectedPromptBlobRefCounts(projectedStore);
	const projectedPromptBlobBytes = [...projectedPromptBlobBytesByHash.values()].reduce((sum, bytes) => sum + bytes, 0);
	let total = [...files, ...promptBlobFiles].reduce((sum, file) => sum + file.size, 0) - (storeFile?.size ?? 0) + projectedStoreBytes + projectedPromptBlobBytes;
	const totalBefore = total;
	const overBudget = !(total <= maxBytes);
	if (!overBudget || params.warnOnly) {
		if (overBudget) log.warn("session disk budget exceeded (warn-only mode)", {
			sessionsDir,
			totalBytes: total,
			maxBytes,
			highWaterBytes
		});
		return {
			totalBytesBefore: totalBefore,
			totalBytesAfter: total,
			removedFiles: 0,
			removedEntries: 0,
			freedBytes: 0,
			maxBytes,
			highWaterBytes,
			overBudget
		};
	}
	let removedFiles = 0;
	let removedEntries = 0;
	let freedBytes = 0;
	const recordRemoval = (removal) => {
		if (removal.ok) {
			total -= removal.value;
			freedBytes += removal.value;
			removedFiles += 1;
		}
	};
	const commitEvictedIndex = params.commitEvictedIndex;
	const referencedPaths = resolveReferencedSessionArtifactPaths({
		files,
		sessionsDir,
		store: params.store
	});
	const tempStaleCutoffMs = Date.now() - SESSION_STORE_TEMP_STALE_MS;
	const promptBlobOrphanCutoffMs = Date.now() - SESSION_PROMPT_BLOB_UNREFERENCED_GRACE_MS;
	const storeBasename = path.basename(params.storePath);
	const unreferencedPromptBlobQueue = promptBlobFiles.filter((file) => {
		return isPromptBlobArtifactRemovable(file, projectedPromptBlobRefCounts, promptBlobOrphanCutoffMs, tempStaleCutoffMs);
	}).toSorted((a, b) => a.mtimeMs - b.mtimeMs);
	for (const file of unreferencedPromptBlobQueue) {
		if (total <= highWaterBytes) break;
		recordRemoval(await removePromptBlobFileForBudget({
			file,
			projectedPromptBlobRefCounts,
			promptBlobCutoffMs: promptBlobOrphanCutoffMs,
			tempCutoffMs: tempStaleCutoffMs,
			dryRun,
			fileSizesByPath,
			simulatedRemovedPaths,
			onRemovedPath: params.onRemoveFile
		}));
	}
	const removableFileQueue = files.filter((file) => isDiskBudgetRemovableSessionFile(file, referencedPaths, tempStaleCutoffMs, storeBasename)).toSorted((a, b) => a.mtimeMs - b.mtimeMs);
	for (const file of removableFileQueue) {
		if (total <= highWaterBytes) break;
		recordRemoval(await removeFileForBudget({
			filePath: file.path,
			canonicalPath: file.canonicalPath,
			dryRun,
			fileSizesByPath,
			simulatedRemovedPaths,
			onRemovedPath: params.onRemoveFile
		}));
	}
	if (total > highWaterBytes) {
		const activeSessionKey = normalizeOptionalLowercaseString(params.activeSessionKey);
		const sessionIdRefCounts = buildSessionIdRefCounts(params.store);
		const entryChunkBytesByKey = buildStoreEntryChunkSizeMap(projectedStore);
		const keys = Object.keys(params.store).filter((key) => isSessionEntryDiskBudgetEvictable({
			key,
			entry: params.store[key],
			preserveKeys: params.preserveKeys,
			preserveRecentMs: params.maintenance.preserveRecentMs
		})).toSorted((a, b) => (params.store[a]?.archivedAt ?? Number.POSITIVE_INFINITY) - (params.store[b]?.archivedAt ?? Number.POSITIVE_INFINITY) || a.localeCompare(b));
		for (const key of keys) {
			if (total <= highWaterBytes) break;
			if (activeSessionKey && normalizeLowercaseStringOrEmpty(key) === activeSessionKey) continue;
			const entry = params.store[key];
			if (!entry) continue;
			const previousProjectedBytes = projectedStoreBytes;
			const projectedEntry = projectedStore[key];
			const promptBlobHash = resolveProjectedPromptBlobHash(projectedEntry);
			delete params.store[key];
			delete projectedStore[key];
			const chunkBytes = entryChunkBytesByKey.get(key);
			entryChunkBytesByKey.delete(key);
			if (typeof chunkBytes === "number" && Number.isFinite(chunkBytes) && chunkBytes >= 0) projectedStoreBytes = Math.max(2, projectedStoreBytes - (chunkBytes + 2));
			else projectedStoreBytes = measureStoreBytes(projectedStore);
			total += projectedStoreBytes - previousProjectedBytes;
			removedEntries += 1;
			if (!dryRun && commitEvictedIndex) {
				await commitEvictedIndex();
				if (projectedPromptBlobBytesByHash.size > 0) for (const file of await readSessionPromptBlobFiles(sessionsDir)) {
					const hash = resolvePromptBlobFileHash(file);
					if (hash && projectedPromptBlobBytesByHash.delete(hash)) existingPromptBlobFilesByHash.set(hash, file);
				}
			}
			if (promptBlobHash) {
				const nextRefCount = (projectedPromptBlobRefCounts.get(promptBlobHash) ?? 1) - 1;
				if (nextRefCount > 0) projectedPromptBlobRefCounts.set(promptBlobHash, nextRefCount);
				else {
					projectedPromptBlobRefCounts.delete(promptBlobHash);
					const virtualBlobBytes = projectedPromptBlobBytesByHash.get(promptBlobHash) ?? 0;
					if (virtualBlobBytes > 0) {
						total -= virtualBlobBytes;
						projectedPromptBlobBytesByHash.delete(promptBlobHash);
					} else {
						const blobFile = existingPromptBlobFilesByHash.get(promptBlobHash);
						if (blobFile && (dryRun || commitEvictedIndex)) recordRemoval(await removePromptBlobFileForBudget({
							file: blobFile,
							projectedPromptBlobRefCounts,
							promptBlobCutoffMs: promptBlobOrphanCutoffMs,
							tempCutoffMs: tempStaleCutoffMs,
							dryRun,
							fileSizesByPath,
							simulatedRemovedPaths,
							onRemovedPath: dryRun ? void 0 : params.onRemoveFile
						}));
					}
				}
			}
			const sessionId = entry.sessionId;
			if (!sessionId) continue;
			const nextRefCount = (sessionIdRefCounts.get(sessionId) ?? 1) - 1;
			if (nextRefCount > 0) {
				sessionIdRefCounts.set(sessionId, nextRefCount);
				continue;
			}
			sessionIdRefCounts.delete(sessionId);
			if (!dryRun && !commitEvictedIndex) continue;
			for (const artifactPath of resolveSessionArtifactPathsForEntry({
				sessionsDir,
				entry
			})) recordRemoval(await removeFileForBudget({
				filePath: artifactPath,
				dryRun,
				fileSizesByPath,
				simulatedRemovedPaths,
				onRemovedPath: dryRun ? void 0 : params.onRemoveFile
			}));
		}
	}
	if (!dryRun) {
		if (total > highWaterBytes) log.warn("session disk budget still above high-water target after cleanup", {
			sessionsDir,
			totalBytes: total,
			maxBytes,
			highWaterBytes,
			removedFiles,
			removedEntries
		});
		else if (removedFiles > 0 || removedEntries > 0) log.info("applied session disk budget cleanup", {
			sessionsDir,
			totalBytesBefore: totalBefore,
			totalBytesAfter: total,
			maxBytes,
			highWaterBytes,
			removedFiles,
			removedEntries
		});
	}
	return {
		totalBytesBefore: totalBefore,
		totalBytesAfter: total,
		removedFiles,
		removedEntries,
		freedBytes,
		maxBytes,
		highWaterBytes,
		overBudget: true
	};
}
//#endregion
export { resolveSessionArtifactCanonicalPathsForEntry as a, measureSessionPhysicalDiskUsage as c, captureSessionMaintenancePreservation as d, collectActiveSessionWorkAdmissionKeys as f, pruneUnreferencedSessionArtifacts as i, captureMaintenanceConfigAsyncReader as l, registerSessionMaintenancePreserveKeysProvider as m, hasRetainedSessionTranscriptArchives as n, observeSessionArchivePruning as o, collectSessionMaintenancePreserveKeysForStore as p, pruneSessionTranscriptArchivesToHighWater as r, timeArchivePruningAsync as s, enforceSessionDiskBudget as t, resolveMaintenanceConfig as u };
