import { i as resolveGlobalSingleton } from "./global-singleton-BfHBYj6Y.mjs";
import { o as emitInternalDiagnosticEvent, t as areDiagnosticsEnabledForProcess } from "./diagnostic-events-4jYHJPUA.mjs";
import { t as createSubsystemLogger } from "./subsystem-CeqVSEVi.mjs";
import path from "node:path";
//#region src/process/spawn-diagnostics.ts
const spawnCounts = resolveGlobalSingleton(Symbol.for("openclaw.childProcessSpawnCounts"), () => ({
	counts: /* @__PURE__ */ new Map(),
	sampledAt: performance.now()
}));
let spawnLog;
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
/** The existing diagnostics heartbeat owns sampling; rates use actual elapsed time. */
function emitChildProcessSpawnSample() {
	const now = performance.now();
	if (!areDiagnosticsEnabledForProcess()) {
		spawnCounts.counts.clear();
		spawnCounts.sampledAt = now;
		return;
	}
	const intervalMs = now - spawnCounts.sampledAt;
	if (intervalMs < 6e4) return;
	for (const [family, count] of spawnCounts.counts) {
		emitInternalDiagnosticEvent({
			type: "diagnostic.child_process.spawn",
			family,
			count,
			intervalMs
		});
		(spawnLog ??= createSubsystemLogger("gateway/diagnostics/process")).debug(`child process spawns: family=${family} count=${count} ratePerMinute=${(count * 6e4 / intervalMs).toFixed(2)}`);
	}
	spawnCounts.counts.clear();
	spawnCounts.sampledAt = now;
}
//#endregion
export { recordChildProcessSpawn as n, emitChildProcessSpawnSample as t };
