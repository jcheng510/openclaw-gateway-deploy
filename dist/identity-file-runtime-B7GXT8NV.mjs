import { i as resolveGlobalSingleton } from "./global-singleton-BfHBYj6Y.mjs";
import { i as getOrCreatePromise } from "./lazy-promise-DGqyc4Y4.mjs";
import { t as resolveRuntimeProcessEntrypointUrl } from "./runtime-process-url-Dp0Sw2Fd.mjs";
import { r as WorkerTaskError, t as WorkerTaskPool } from "./worker-task-pool-Cl1KhdJb.mjs";
import path from "node:path";
//#region src/agents/identity-file-runtime.ts
const MAX_IDENTITY_CACHE_BYTES = 16777216;
const MAX_IDENTITY_CACHE_ENTRIES = 64;
function prepareIdentityFile(identityPath) {
	const runtime = resolveGlobalSingleton(Symbol.for("openclaw.identityFiles"), () => ({
		pending: /* @__PURE__ */ new Map(),
		cached: /* @__PURE__ */ new Map(),
		bytes: 0
	}), (state) => {
		state.closing ??= (async () => {
			await state.pool?.close();
			await Promise.allSettled(state.pending.values());
			state.pool = void 0;
			state.cached.clear();
			state.bytes = 0;
		})().finally(() => {
			state.closing = void 0;
		});
		return state.closing;
	});
	if (runtime.closing) return Promise.reject(new WorkerTaskError("Identity file reader is closing", "unavailable"));
	const filePath = path.resolve(identityPath);
	return getOrCreatePromise(runtime.pending, filePath, async () => {
		const previous = runtime.cached.get(filePath);
		const result = await (runtime.pool ??= new WorkerTaskPool({
			workerUrl: resolveRuntimeProcessEntrypointUrl("identityFile"),
			maxWorkers: 2,
			sharedCompute: true,
			maxPendingTasks: 256,
			maxPendingBytes: 1048576
		})).run({
			identityPath: filePath,
			knownRevision: previous?.revision
		}, { inputBytes: 2 * (filePath.length + (previous?.revision.length ?? 0)) });
		const prepared = result.kind === "unchanged" ? previous : result;
		if (!prepared) throw new Error("Identity file reader returned an unknown revision");
		const retained = runtime.cached.get(filePath);
		if (retained) {
			runtime.cached.delete(filePath);
			runtime.bytes -= retained.size;
		}
		if (prepared.kind === "loaded") {
			runtime.cached.set(filePath, prepared);
			runtime.bytes += prepared.size;
			while (runtime.bytes > MAX_IDENTITY_CACHE_BYTES || runtime.cached.size > MAX_IDENTITY_CACHE_ENTRIES) {
				const oldest = runtime.cached.entries().next().value;
				if (!oldest) break;
				runtime.cached.delete(oldest[0]);
				runtime.bytes -= oldest[1].size;
			}
		}
		return prepared;
	}, { evictOnSettled: true });
}
//#endregion
export { prepareIdentityFile };
