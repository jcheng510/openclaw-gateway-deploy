import { o as getRootOptionAwareCommandPath } from "./cli-root-options-DGcy1qRg.mjs";
import { a as isPidDefinitelyDead } from "./pid-alive-DB0zHgvx.mjs";
import { n as runtimeProcessEntrypoints } from "./runtime-process-entrypoints-CbWx0yUe.mjs";
import { t as isContainerEnvironment } from "./container-environment-e2wGNmXf.mjs";
import { t as readDarwinProcessCommand } from "./darwin-process-command-BeGMs9jL.mjs";
import { t as classifyOpenClawArgv } from "./gateway-process-argv-DCrAz6F8.mjs";
import { n as readProcessGroupMembers } from "./service-child-group-ownership-DehHGVKe.mjs";
import path from "node:path";
//#region src/infra/openclaw-process-census.ts
const workerEntrypoints = Object.values(runtimeProcessEntrypoints).flatMap((entry) => [path.posix.normalize(`src/infra/${entry.sourceWorkerName}.ts`), `dist/${entry.distWorkerPath}`]);
/** Incomplete process inspection never authorizes reclamation of unowned scratch. */
function inspectOtherOpenClawProcesses() {
	try {
		if (process.platform === "linux" && isContainerEnvironment()) throw new Error("Host process visibility cannot be established from this container. Run Doctor on the host after stopping OpenClaw containers that share its temporary directory.");
		const processes = [...readProcessGroupMembers(1e3, { readDarwinCommand: readDarwinProcessCommand })];
		const byPid = new Map(processes.map((entry) => [entry.pid, entry]));
		const current = byPid.get(process.pid);
		if (!current?.command || processes.some((entry) => !entry.command)) throw new Error("OpenClaw process census is incomplete.");
		const launchers = /* @__PURE__ */ new Set();
		const ancestors = /* @__PURE__ */ new Set([process.pid]);
		let parentPid = current.command.ppid;
		while (parentPid > 0) {
			const parent = byPid.get(parentPid);
			if (!parent?.command || ancestors.has(parentPid)) throw new Error("OpenClaw process ancestry is incomplete.");
			ancestors.add(parentPid);
			if ("argv" in parent.command) {
				const { argv, serviceMarker } = parent.command;
				const identity = classifyOpenClawArgv(argv, {
					pid: parentPid,
					serviceMarker,
					additionalEntrypoints: workerEntrypoints
				});
				if (identity.kind === "openclaw" && identity.entryIndex !== void 0 && getRootOptionAwareCommandPath(["node", ...argv.slice(identity.entryIndex)], 1)[0] === "doctor") launchers.add(parentPid);
			}
			parentPid = parent.command.ppid;
		}
		return { pids: processes.filter(({ pid, state, command }) => {
			if (pid === process.pid || launchers.has(pid)) return false;
			if (state.startsWith("Z") && isPidDefinitelyDead(pid)) return false;
			if (!command || !("argv" in command)) return false;
			if (command.argv.some((arg) => /(?:^|[/\\])openclaw-update-runtime-[A-Za-z0-9]{6}(?:[/\\]|$)/u.test(arg))) return true;
			const identity = classifyOpenClawArgv(command.argv, {
				pid,
				serviceMarker: command.serviceMarker,
				additionalEntrypoints: workerEntrypoints
			});
			if (identity.kind === "unclassified") throw new Error(`Could not classify PID ${pid}: ${identity.reason}`);
			return identity.kind === "openclaw";
		}).map(({ pid }) => pid) };
	} catch (error) {
		return { error: `Could not inspect OpenClaw processes: ${String(error)}` };
	}
}
//#endregion
export { inspectOtherOpenClawProcesses as t };
