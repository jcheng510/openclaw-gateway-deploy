import { i as resolveGlobalSingleton } from "./global-singleton-BfHBYj6Y.mjs";
import { i as getOrCreatePromise } from "./lazy-promise-DGqyc4Y4.mjs";
import { t as resolveRuntimeProcessEntrypointUrl } from "./runtime-process-url-Dp0Sw2Fd.mjs";
import { r as WorkerTaskError, t as WorkerTaskPool } from "./worker-task-pool-Cl1KhdJb.mjs";
import { t as localAgentAvatarRevision } from "./identity-avatar-file-C3RuXwXq.mjs";
//#region src/agents/identity-avatar-file-runtime.ts
const MAX_AVATAR_CACHE_BYTES = 16777216;
const MAX_AVATAR_CACHE_ENTRIES = 64;
function prepareLocalAgentAvatar(input) {
	const runtime = resolveGlobalSingleton(Symbol.for("openclaw.localAgentAvatars"), () => ({
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
	if (runtime.closing) return Promise.reject(new WorkerTaskError("Avatar reader is closing", "unavailable"));
	const key = JSON.stringify([
		input.workspaceDir,
		input.source,
		input.readBody
	]);
	return getOrCreatePromise(runtime.pending, key, async () => {
		const previous = runtime.cached.get(key);
		const pool = runtime.pool ??= new WorkerTaskPool({
			workerUrl: resolveRuntimeProcessEntrypointUrl("localAgentAvatar"),
			maxWorkers: 2,
			sharedCompute: true,
			maxPendingTasks: 256,
			maxPendingBytes: 1048576
		});
		const knownRevision = previous ? localAgentAvatarRevision(previous.file) : void 0;
		const result = await pool.run({
			...input,
			knownRevision
		}, { inputBytes: 2 * (key.length + (knownRevision?.length ?? 0)) });
		let prepared = previous;
		if (!("kind" in result)) prepared = result.ok ? {
			ok: true,
			file: {
				...result.file,
				body: result.file.body ? Buffer.from(result.file.body.buffer, result.file.body.byteOffset, result.file.body.byteLength) : void 0
			}
		} : result;
		if (!prepared) throw new Error("Avatar reader returned an unknown revision");
		const retained = runtime.cached.get(key);
		if (retained) {
			runtime.cached.delete(key);
			runtime.bytes -= retained.file.body?.byteLength ?? 0;
		}
		if (prepared.ok) {
			runtime.cached.set(key, prepared);
			runtime.bytes += prepared.file.body?.byteLength ?? 0;
			while (runtime.bytes > MAX_AVATAR_CACHE_BYTES || runtime.cached.size > MAX_AVATAR_CACHE_ENTRIES) {
				const oldest = runtime.cached.entries().next().value;
				if (!oldest) break;
				runtime.cached.delete(oldest[0]);
				runtime.bytes -= oldest[1].file.body?.byteLength ?? 0;
			}
		}
		return prepared;
	}, { evictOnSettled: true });
}
//#endregion
export { prepareLocalAgentAvatar };
