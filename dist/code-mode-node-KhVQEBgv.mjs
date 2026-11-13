import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { r as racePromiseWithAbortSignal } from "./abort-signal-Z3A36sLL.mjs";
import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { n as runtimeProcessEntrypoints } from "./runtime-process-entrypoints-CbWx0yUe.mjs";
import { r as resolveRuntimeWorkerUrl } from "./runtime-worker-url-S0NIVxUR.mjs";
import { r as WorkerTaskError, t as WorkerTaskPool } from "./worker-task-pool-Cl1KhdJb.mjs";
import { t as runBestEffortCleanup } from "./non-fatal-cleanup-BoCq8AND.mjs";
import { t as CODE_MODE_WORKER_WATCHDOG_GRACE_MS } from "./code-mode-worker-types-BrXHJGAa.mjs";
import { n as EMPTY_CODE_MODE_OUTPUT } from "./code-mode-json-D7Gim6zD.mjs";
import { t as CodeModeNodeProgress } from "./code-mode-node-progress-DlOYoVlG.mjs";
import { n as CodeModeHeadlessTimeoutError, r as codeModeFailureCode, t as CodeModeHeadlessAbortError } from "./code-mode-errors-DO6ZOs9y.mjs";
import { channel } from "node:diagnostics_channel";
//#region src/agents/code-mode-node.ts
const retiringPools = /* @__PURE__ */ new Set();
const idlePools = /* @__PURE__ */ new Map();
const MAX_IDLE_POOLS = 4;
const memoryPressure = channel("openclaw.memory.critical");
function removeIdlePool(owner) {
	clearTimeout(idlePools.get(owner));
	idlePools.delete(owner);
	if (!idlePools.size) memoryPressure.unsubscribe(retireIdlePools);
}
function retireIdlePool(owner) {
	if (!idlePools.has(owner)) return;
	runBestEffortCleanup({
		cleanup: () => closePool(owner),
		onError: (error) => process.emitWarning(`Code Mode worker retirement failed: ${formatErrorMessage(error)}`)
	});
}
function retireIdlePools() {
	for (const owner of idlePools.keys()) retireIdlePool(owner);
}
async function closePool(owner) {
	removeIdlePool(owner);
	retiringPools.add(owner);
	await owner.tasks.close();
	retiringPools.delete(owner);
}
async function takePool(memoryLimitBytes, signal) {
	let workerUrl;
	for (;;) {
		signal.throwIfAborted();
		workerUrl = resolveRuntimeWorkerUrl(runtimeProcessEntrypoints.codeModeNode);
		const retiring = /* @__PURE__ */ new Set([...retiringPools, ...[...idlePools.keys()].filter((owner) => owner.url !== workerUrl.href || owner.tasks.isClosed)]);
		if (!retiring.size) break;
		await Promise.all([...retiring].map(closePool));
	}
	for (const owner of idlePools.keys()) if (owner.memoryLimitBytes === memoryLimitBytes && owner.url === workerUrl.href && !owner.tasks.isClosed) {
		removeIdlePool(owner);
		return owner;
	}
	const owner = {
		url: workerUrl.href,
		memoryLimitBytes,
		tasks: new WorkerTaskPool({
			workerUrl,
			maxWorkers: 1,
			idleTimeoutMs: 0,
			restartOnError: false,
			sharedCompute: true,
			onRetirementFailure: () => {
				retiringPools.add(owner);
			},
			workerOptions: {
				env: {},
				resourceLimits: {
					maxOldGenerationSizeMb: Math.max(1, Math.floor(memoryLimitBytes / 1048576) - 4),
					maxYoungGenerationSizeMb: 4
				}
			}
		})
	};
	return owner;
}
async function releasePool(owner) {
	if (idlePools.size >= MAX_IDLE_POOLS || owner.tasks.isClosed || owner.url !== resolveRuntimeWorkerUrl(runtimeProcessEntrypoints.codeModeNode).href) {
		await closePool(owner);
		return;
	}
	const timer = setTimeout(() => retireIdlePool(owner), 3e5);
	timer.unref();
	idlePools.set(owner, timer);
	if (idlePools.size === 1) memoryPressure.subscribe(retireIdlePools);
}
function failure(error, code) {
	return {
		status: "failed",
		code,
		error: formatErrorMessage(error),
		failurePhase: "host",
		bridgeDispatchStarted: false,
		output: EMPTY_CODE_MODE_OUTPUT
	};
}
function continuation(pool) {
	let state = "owned";
	let closing;
	return {
		executor: "node",
		retainedBytes: pool.memoryLimitBytes,
		resume(input, options) {
			if (state !== "owned") return Promise.resolve(failure("code mode continuation is no longer available", "runtime_unavailable"));
			state = "resumed";
			return run(pool, input, options);
		},
		dispose() {
			if (state === "resumed" || state === "disposed") return Promise.resolve();
			state = "disposing";
			return closing ??= closePool(pool).then(() => {
				state = "disposed";
			}).finally(() => {
				closing = void 0;
			});
		}
	};
}
async function run(pool, input, options, startedAt = performance.now()) {
	const inlineHost = options.inlineHost;
	const progress = new CodeModeNodeProgress(input.config.maxOutputBytes);
	const deadline = new AbortController();
	const signal = options.signal ? AbortSignal.any([options.signal, deadline.signal]) : deadline.signal;
	let timer;
	let admittedTimeoutMs = 0;
	let retained = false;
	try {
		const preparationMs = performance.now() - startedAt;
		if (input.config.timeoutMs <= preparationMs || options.timeoutMs <= preparationMs) throw new CodeModeHeadlessTimeoutError();
		const result = await pool.tasks.run(() => {
			admittedTimeoutMs = Math.max(0, input.config.timeoutMs - (performance.now() - startedAt));
			if (admittedTimeoutMs <= 0) throw new CodeModeHeadlessTimeoutError();
			return {
				...input,
				progress: progress.buffer,
				inlineHost: Boolean(inlineHost),
				config: {
					...input.config,
					timeoutMs: admittedTimeoutMs
				}
			};
		}, {
			timeoutMs: Math.min(options.timeoutMs, input.config.timeoutMs) - preparationMs,
			signal,
			inputBytes: input.kind === "exec" ? input.source.length * 2 : 0,
			onInputConsumed: () => {
				if (input.kind === "exec") timer = setTimeout(() => deadline.abort(new CodeModeHeadlessTimeoutError()), Math.max(0, progress.deadline - performance.timeOrigin - performance.now()));
				inlineHost?.onInputConsumed?.();
			},
			onRequest: async (value, context) => {
				clearTimeout(timer);
				if (!inlineHost || !isRecord(value) || value.status !== "boundary") throw new Error("invalid code mode worker boundary");
				if (!Number.isFinite(admittedTimeoutMs) || admittedTimeoutMs <= 0) throw new Error("invalid code mode worker admission budget");
				if (value.networkContentObserved === true) inlineHost?.onNetworkContent?.();
				const response = inlineHost.onBoundary(value, {
					...context,
					maxTimeoutMs: admittedTimeoutMs
				});
				progress.resetOutput();
				const { onConsumed, ...command } = await response;
				return {
					input: command,
					onConsumed,
					timeoutMs: command.kind === "continue" ? command.timeoutMs : CODE_MODE_WORKER_WATCHDOG_GRACE_MS
				};
			}
		});
		if (result.networkContentObserved === true) inlineHost?.onNetworkContent?.();
		if (result.status === "waiting") {
			retained = true;
			return {
				...result,
				continuation: continuation(pool)
			};
		}
		if (result.status === "completed") {
			await releasePool(pool);
			retained = true;
		}
		return result;
	} catch (error) {
		const reason = signal.aborted ? signal.reason : error;
		if (reason instanceof CodeModeHeadlessTimeoutError || error instanceof WorkerTaskError && error.code === "timeout") {
			if (progress.networkContentObserved) inlineHost?.onNetworkContent?.();
			return {
				...failure("code mode timeout exceeded", "timeout"),
				failurePhase: progress.deadline ? "guest" : "host",
				output: progress.output(),
				...progress.networkContentObserved ? { networkContentObserved: true } : {}
			};
		}
		if (options.signal?.aborted || reason instanceof CodeModeHeadlessAbortError) return failure("code mode execution aborted", "aborted");
		return failure(error, error instanceof WorkerTaskError ? "runtime_unavailable" : codeModeFailureCode(error));
	} finally {
		clearTimeout(timer);
		if (!retained) await closePool(pool);
	}
}
const nodeCodeModeExecutor = {
	id: "node",
	async execute(input, options) {
		const startedAt = performance.now();
		const deadline = new AbortController();
		const signal = options.signal ? AbortSignal.any([options.signal, deadline.signal]) : deadline.signal;
		const timer = setTimeout(() => deadline.abort(new CodeModeHeadlessTimeoutError()), Math.max(0, Math.min(input.config.timeoutMs, options.timeoutMs)));
		const acquisition = takePool(input.config.memoryLimitBytes, signal);
		let pool;
		try {
			pool = await racePromiseWithAbortSignal(acquisition, signal);
		} catch (error) {
			runBestEffortCleanup({
				cleanup: () => acquisition.then(closePool, () => void 0),
				onError: (cleanupError) => process.emitWarning(`Code Mode worker retirement failed: ${formatErrorMessage(cleanupError)}`)
			});
			if (signal.aborted) {
				const timeout = signal.reason instanceof CodeModeHeadlessTimeoutError;
				return failure(timeout ? "code mode timeout exceeded" : "code mode execution aborted", timeout ? "timeout" : "aborted");
			}
			throw error;
		} finally {
			clearTimeout(timer);
		}
		return run(pool, input, options, startedAt);
	}
};
//#endregion
export { nodeCodeModeExecutor };
