import { i as extractErrorCode } from "./error-coercion-CwIUUFnu.mjs";
import { r as isPidDefinitelyDead } from "./pid-alive-DlMTfMO3.mjs";
import { n as runtimeProcessEntrypoints } from "./runtime-process-entrypoints-CbWx0yUe.mjs";
import { t as createSubsystemLogger } from "./subsystem-EYGCijzb.mjs";
import { n as getRootOptionAwareCommandPath, t as classifyOpenClawArgv } from "./gateway-process-argv-B0mym2pt.mjs";
import { createRequire } from "node:module";
import { spawnSync } from "node:child_process";
import fsSync, { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
//#region src/infra/container-environment.ts
let containerEnvironmentCache;
function isContainerEnvironment() {
	return containerEnvironmentCache ??= detectContainerEnvironment();
}
function detectContainerEnvironment() {
	if (process.env.FLY_MACHINE_ID?.trim() && process.env.FLY_APP_NAME?.trim()) return true;
	for (const sentinelPath of [
		"/.dockerenv",
		"/run/.containerenv",
		"/var/run/.containerenv"
	]) try {
		fsSync.accessSync(sentinelPath, fsSync.constants.F_OK);
		return true;
	} catch {}
	try {
		const cgroup = fsSync.readFileSync("/proc/1/cgroup", "utf8");
		if (/\/docker\/|cri-containerd-[0-9a-f]|containerd\/[0-9a-f]{64}|\/kubepods[/.]|\blxc\b/.test(cgroup)) return true;
	} catch {}
	return false;
}
//#endregion
//#region src/process/supervisor/darwin-process-command.ts
let native;
let reportedForeignArguments = false;
function loadNative() {
	const koffi = createRequire(import.meta.url)("koffi");
	const sysctl = koffi.load("/usr/lib/libSystem.B.dylib").func("int sysctl(const int *name, unsigned int namelen, void *oldp, size_t *oldlenp, const void *newp, size_t newlen)");
	const size = Buffer.alloc(8);
	const argMax = Buffer.alloc(4);
	size.writeBigUInt64LE(4n);
	if (sysctl(new Int32Array([1, 8]), 2, argMax, size, null, 0) !== 0 || argMax.readInt32LE() <= 4) throw new Error("Darwin process argument limit is unavailable");
	const buffer = Buffer.alloc(argMax.readInt32LE());
	return { readArguments(pid) {
		size.writeBigUInt64LE(BigInt(buffer.length));
		if (sysctl(new Int32Array([
			1,
			49,
			pid
		]), 3, buffer, size, null, 0) !== 0) return { errno: koffi.errno() };
		const length = Number(size.readBigUInt64LE());
		if (length < 4 || length > buffer.length) throw new Error(`Incomplete Darwin process arguments for PID ${pid}`);
		return { bytes: buffer.subarray(0, length) };
	} };
}
function parseArguments(bytes, pid) {
	const argc = bytes.readInt32LE();
	let offset = bytes.indexOf(0, 4);
	if (argc <= 0 || argc > bytes.length || offset <= 4) throw new Error(`Invalid Darwin process arguments for PID ${pid}`);
	while (offset < bytes.length && bytes[offset] === 0) offset++;
	const argv = [];
	for (let index = 0; index < argc; index++) {
		const end = bytes.indexOf(0, offset);
		if (end < 0) throw new Error(`Truncated Darwin process arguments for PID ${pid}`);
		argv.push(bytes.toString("utf8", offset, end));
		offset = end + 1;
	}
	const marker = bytes.toString("utf8", offset).split("\0").find((entry) => entry.startsWith("OPENCLAW_SERVICE_MARKER="));
	return {
		argv,
		...marker ? { serviceMarker: marker.slice(24) } : {}
	};
}
/** Exact argv, or observed foreign ownership when Darwin denies argument inspection. */
function readDarwinProcessCommand(pid, uid) {
	native ??= loadNative();
	const result = native.readArguments(pid);
	if ("bytes" in result) return parseArguments(result.bytes, pid);
	if (isPidDefinitelyDead(pid)) return;
	const currentUid = process.getuid?.();
	if (uid !== void 0 && currentUid !== void 0 && uid !== currentUid) {
		if (!reportedForeignArguments) {
			reportedForeignArguments = true;
			createSubsystemLogger("process/census").debug("Unreadable Darwin arguments for another UID do not establish capture custody.", {
				pid,
				uid,
				errno: result.errno
			});
		}
		return {
			argvUnavailable: true,
			uid
		};
	}
	throw new Error(`Could not classify PID ${pid}: cannot inspect Darwin arguments (errno ${result.errno}).`);
}
//#endregion
//#region src/process/supervisor/service-child-group-ownership.ts
/** The caller supplies native command inspection; the standalone group worker stays dependency-free. */
function* readProcessGroupMembers(timeoutMs, commandInspection) {
	const includeCommand = commandInspection !== void 0;
	if (process.platform === "linux") {
		const deadline = Date.now() + timeoutMs;
		for (const name of readdirSync("/proc")) {
			if (Date.now() >= deadline) throw new Error("Process group census exceeded its deadline");
			if (!/^\d+$/.test(name)) continue;
			const pid = Number(name);
			let stat;
			let argv;
			try {
				stat = readFileSync(`/proc/${name}/stat`, "utf8");
				if (includeCommand) argv = readFileSync(`/proc/${name}/cmdline`, "utf8").split("\0").filter(Boolean);
			} catch (error) {
				if (pid !== process.pid && ["ENOENT", "ESRCH"].includes(extractErrorCode(error) ?? "")) continue;
				throw new Error(`Could not classify PID ${pid}: process command inspection failed (${extractErrorCode(error) ?? "unavailable"}).`, { cause: error });
			}
			const match = /^(\d+) \([\s\S]*\) (\S) (\d+) (\d+)(?:\s|$)/.exec(stat);
			if (!match || Number(match[1]) !== pid || Date.now() >= deadline) throw new Error("Process group census is unavailable");
			if (argv?.length === 0) {
				const flags = Number(stat.slice(stat.lastIndexOf(")") + 2).split(/\s+/)[6]);
				if (!(Number.isInteger(flags) && (flags & 2097152) !== 0) && !isPidDefinitelyDead(pid)) throw new Error(`Could not classify PID ${pid}: live userspace process has no readable arguments.`);
			}
			yield {
				pid,
				pgid: Number(match[4]),
				state: match[2],
				...argv ? { command: {
					ppid: Number(match[3]),
					argv
				} } : {}
			};
		}
		if (Date.now() >= deadline) throw new Error("Process group census exceeded its deadline");
		return;
	}
	if (includeCommand && process.platform !== "darwin") throw new Error(`Exact process command census is unavailable on ${process.platform}.`);
	const deadline = Date.now() + timeoutMs;
	const census = spawnSync("/bin/ps", [
		"-A",
		"-o",
		includeCommand ? "pid=,pgid=,stat=,ppid=,uid=" : "pid=,pgid=,stat="
	], {
		encoding: "utf8",
		timeout: timeoutMs,
		maxBuffer: 4194304
	});
	if (census.error || census.status !== 0) throw new Error("Process group census is unavailable");
	for (const line of census.stdout.split("\n")) {
		if (!line.trim()) continue;
		const match = includeCommand ? /^\s*(\d+)\s+(\d+)\s+(\S+)\s+(\d+)\s+(-?\d+)\s*$/.exec(line) : /^\s*(\d+)\s+(\d+)\s+(\S+)\s*$/.exec(line);
		if (!match) throw new Error("Process group census is unavailable");
		const pid = Number(match[1]);
		if (pid !== census.pid) {
			if (includeCommand && Date.now() >= deadline) throw new Error("Process group census exceeded its deadline");
			const command = includeCommand ? match[3].startsWith("Z") || pid === 0 ? { argv: [] } : commandInspection?.readDarwinCommand(pid, Number(match[5]) >>> 0) : void 0;
			if (includeCommand && !command) continue;
			yield {
				pid,
				pgid: Number(match[2]),
				state: match[3],
				...command ? { command: {
					ppid: Number(match[4]),
					...command
				} } : {}
			};
		}
	}
	if (includeCommand && Date.now() >= deadline) throw new Error("Process group census exceeded its deadline");
}
//#endregion
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
export { inspectOtherOpenClawProcesses };
