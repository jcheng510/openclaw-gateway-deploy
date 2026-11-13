import { n as runtimeProcessEntrypoints } from "./runtime-process-entrypoints-CbWx0yUe.mjs";
import { t as isBunRuntime } from "./runtime-binary-ZFwXIj1k.mjs";
import { M as isRecord, y as asNonNegativeFiniteNumber } from "./utils-Dor5uhSv.mjs";
import { d as resolveGlobalSingleton } from "./redact-BwKH5fIe.mjs";
import path, { basename } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { readRootJsonObjectSync } from "@openclaw/fs-safe/json";
import { MessagePort, Worker } from "node:worker_threads";
//#region src/infra/runtime-worker-url.ts
/** Resolve an explicit installed root, source sibling, or stable packaged worker path. */
function resolveRuntimeWorkerUrl(params) {
	if (params.root !== void 0) return pathToFileURL(path.join(params.root, "dist", params.distWorkerPath));
	const currentPath = fileURLToPath(params.currentModuleUrl);
	const distIndex = currentPath.replaceAll(path.sep, "/").lastIndexOf("/dist/");
	if (distIndex >= 0) {
		const distRoot = currentPath.slice(0, distIndex + 6);
		let workerPath = params.distWorkerPath;
		if (params.package) {
			const packageRoot = path.resolve(distRoot, "..");
			const manifest = readRootJsonObjectSync({
				rootDir: packageRoot,
				relativePath: "package.json",
				boundaryLabel: "runtime worker package",
				rejectHardlinks: false
			});
			if (!manifest.ok) throw new Error(`Cannot resolve runtime worker package: ${packageRoot}/package.json`);
			if (manifest.value.name === params.package.name) workerPath = params.package.distWorkerPath;
		}
		return pathToFileURL(path.join(distRoot, workerPath));
	}
	const extension = path.extname(currentPath) || ".js";
	return new URL(`./${params.sourceWorkerName}${extension}`, params.currentModuleUrl);
}
function isBunWorkerRuntime(execPath) {
	return execPath === process.execPath ? Boolean(process.versions.bun) : isBunRuntime(execPath);
}
/** Whether a source TypeScript module needs Node's tsx loader; Bun runs TypeScript natively. */
function runtimeNeedsTypeScriptLoader(modulePath, execPath = process.execPath) {
	return /\.[cm]?ts$/.test(modulePath) && !isBunWorkerRuntime(execPath);
}
function resolveRuntimeWorkerArgv(url, execPath = process.execPath) {
	const entry = fileURLToPath(url);
	return runtimeNeedsTypeScriptLoader(entry, execPath) ? [
		"--import",
		import.meta.resolve("tsx"),
		entry
	] : [entry];
}
/** Select the source Worker preload without feeding Node's TypeScript loader to Bun. */
function resolveRuntimeWorkerThreadExecArgv(url, execPath = process.execPath) {
	return url.protocol === "file:" && runtimeNeedsTypeScriptLoader(fileURLToPath(url), execPath) ? ["--import", import.meta.resolve("tsx/esm")] : [];
}
//#endregion
//#region src/infra/runtime-process-url.ts
const sealedEntrypoints = /* @__PURE__ */ new Map();
function resolveRuntimeProcessEntrypointUrl(name) {
	return sealedEntrypoints.get(name) ?? resolveRuntimeWorkerUrl(runtimeProcessEntrypoints[name]);
}
//#endregion
//#region src/infra/worker-diagnostic-script.ts
const workerScriptNames = /* @__PURE__ */ new Set([
	...Object.values(runtimeProcessEntrypoints).map((entry) => basename(entry.distWorkerPath)),
	"catalog-page.worker.js",
	"code-mode.worker.js",
	"compaction-planning.worker.js",
	"disk-budget.worker.js",
	"document-extractor.worker.js",
	"manager-index.worker.js",
	"manager-search.worker.js",
	"memory-index.worker.js",
	"memory-search.worker.js",
	"session-history.worker.js",
	"audio-worker.runtime.js",
	"realtime-quicksilver-audio.worker.js",
	"realtime-quicksilver-socket.worker.js",
	"telegram-ingress-worker.runtime.js"
]);
/** Imported diagnostics may contain arbitrary paths or names. Preserve only known scripts. */
function normalizeDiagnosticWorkerScript(value) {
	return typeof value === "string" && workerScriptNames.has(value) ? value : "other";
}
//#endregion
//#region src/infra/worker-cpu.ts
function workerScriptName(filename, evalSource = false) {
	if (evalSource || filename instanceof URL && filename.protocol !== "file:") return "other";
	return normalizeDiagnosticWorkerScript(basename(filename instanceof URL ? fileURLToPath(filename) : filename).replace(/\.[cm]?ts$/u, ".js"));
}
const trackedWorkers = resolveGlobalSingleton(Symbol.for("openclaw.workerCpuSources"), () => {
	process.on("worker", trackWorker);
	return {
		revision: 0,
		nextPoolId: 0,
		poolIds: /* @__PURE__ */ new WeakMap(),
		workers: /* @__PURE__ */ new Map(),
		lifecycle: /* @__PURE__ */ new Map()
	};
});
function createCpuTrackedWorker(...args) {
	const worker = new Worker(...args);
	trackWorker(worker);
	trackedWorkers.workers.get(worker).script = workerScriptName(args[0], args[1]?.eval);
	return worker;
}
/** Pool identity follows its live Workers without retaining the pool itself. */
function attributeWorkerToPool(worker, pool) {
	const source = trackedWorkers.workers.get(worker);
	if (!source) return;
	let poolId = trackedWorkers.poolIds.get(pool);
	if (poolId === void 0) {
		poolId = ++trackedWorkers.nextPoolId;
		trackedWorkers.poolIds.set(pool, poolId);
	}
	source.poolId = poolId;
}
function forgetWorker(worker) {
	const source = trackedWorkers.workers.get(worker);
	if (!source) return;
	const counts = countWorkerStart(source);
	const reason = source.retirementReason ?? "exit";
	counts.retired.set(reason, (counts.retired.get(reason) ?? 0) + 1);
	source.memoryPort?.close();
	trackedWorkers.workers.delete(worker);
	trackedWorkers.revision++;
}
function countWorkerStart(source) {
	let counts = trackedWorkers.lifecycle.get(source.script);
	if (!counts) {
		counts = {
			started: 0,
			retired: /* @__PURE__ */ new Map()
		};
		trackedWorkers.lifecycle.set(source.script, counts);
	}
	if (!source.started) {
		source.started = true;
		counts.started++;
	}
	return counts;
}
/** Record the owner's reason now; only confirmed native exit increments retirement. */
function markWorkerRetirement(worker, reason) {
	const source = trackedWorkers.workers.get(worker);
	if (source) source.retirementReason ??= reason;
}
function trackWorker(worker) {
	if (trackedWorkers.workers.has(worker)) return;
	let pending = false;
	const source = {
		script: "other",
		async cpuUsage() {
			if (pending) return;
			pending = true;
			try {
				return await worker.cpuUsage();
			} catch {
				return;
			} finally {
				pending = false;
			}
		}
	};
	trackedWorkers.workers.set(worker, source);
	queueMicrotask(() => countWorkerStart(source));
	trackedWorkers.revision++;
	worker.once("exit", () => forgetWorker(worker));
}
/** The existing registry owns this channel until native exit, never the submitting task. */
function receiveWorkerMemoryPort(worker, message) {
	if (!isRecord(message) || message.status !== "memory" || !(message.port instanceof MessagePort)) return false;
	const port = message.port;
	const source = trackedWorkers.workers.get(worker);
	if (!source || source.memoryPort || worker.threadId === -1) {
		port.close();
		return true;
	}
	source.memoryPort = port;
	source.memoryPending = true;
	const close = () => {
		source.memoryPort = void 0;
		source.memoryPending = false;
		source.memoryUnavailable = true;
		port.close();
	};
	port.on("message", (value) => {
		const record = isRecord(value) ? value : {};
		const heapUsed = asNonNegativeFiniteNumber(record.heapUsed);
		const heapTotal = asNonNegativeFiniteNumber(record.heapTotal);
		const external = asNonNegativeFiniteNumber(record.external);
		const arrayBuffers = asNonNegativeFiniteNumber(record.arrayBuffers);
		if (heapUsed === void 0 || heapTotal === void 0 || external === void 0 || arrayBuffers === void 0) {
			close();
			return;
		}
		source.heap = {
			value: {
				heapUsed,
				heapTotal,
				external,
				arrayBuffers
			},
			sampledAt: performance.now()
		};
		source.memoryPending = false;
		source.memoryUnavailable = false;
	});
	port.once("close", close);
	port.once("messageerror", close);
	port.unref();
	return true;
}
//#endregion
export { resolveRuntimeProcessEntrypointUrl as a, resolveRuntimeWorkerUrl as c, receiveWorkerMemoryPort as i, runtimeNeedsTypeScriptLoader as l, createCpuTrackedWorker as n, resolveRuntimeWorkerArgv as o, markWorkerRetirement as r, resolveRuntimeWorkerThreadExecArgv as s, attributeWorkerToPool as t };
