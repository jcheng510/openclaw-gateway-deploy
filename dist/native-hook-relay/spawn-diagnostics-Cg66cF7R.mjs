import "./runtime-process-entrypoints-CbWx0yUe.mjs";
import { d as resolveGlobalSingleton } from "./redact-BwKH5fIe.mjs";
import { d as areDiagnosticsEnabledForProcess } from "./subsystem-EYGCijzb.mjs";
import path from "node:path";
import { AsyncLocalStorage } from "node:async_hooks";
//#region src/process/spawn-broker/context.ts
const context = new AsyncLocalStorage();
function getSpawnBroker() {
	return context.getStore();
}
//#endregion
//#region src/process/spawn-diagnostics.ts
const spawnCounts = resolveGlobalSingleton(Symbol.for("openclaw.childProcessSpawnCounts"), () => ({
	counts: /* @__PURE__ */ new Map(),
	sampledAt: performance.now()
}));
const COMMAND_FAMILIES = /^(node|bun|git|ps|pgrep|lsof|sh|bash|zsh|cmd|powershell|pwsh|npm|pnpm|python|python3|uv|ssh|openclaw)$/;
/** Count admitted local and broker launches, without recording paths or arguments. */
function recordChildProcessSpawn(command, child) {
	if (!areDiagnosticsEnabledForProcess()) return;
	const name = path.win32.basename(command).toLowerCase().replace(/\.(exe|cmd)$/, "");
	const family = COMMAND_FAMILIES.test(name) ? name : "other";
	child.once("spawn", () => {
		if (areDiagnosticsEnabledForProcess()) spawnCounts.counts.set(family, (spawnCounts.counts.get(family) ?? 0) + 1);
	});
}
//#endregion
export { getSpawnBroker as n, recordChildProcessSpawn as t };
