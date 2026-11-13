import { o as normalizeLowercaseStringOrEmpty } from "./string-coerce-6kR-86XC.mjs";
import { w as parseStrictPositiveInteger } from "./number-coercion-Dq1l5muL.mjs";
import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { d as normalizeStringEntries } from "./string-normalization-YMwDjufr.mjs";
import { n as resolveDiagnosticProcessEnv } from "./process-env-DlZFJzq6.mjs";
import { n as getFileLockProcessStartTime, s as decodeWindowsProcessOutput } from "./pid-alive-DB0zHgvx.mjs";
import { i as tableExists } from "./openclaw-state-db-schema-helpers-C29HKgWe.mjs";
import { t as createSubsystemLogger } from "./subsystem-CeqVSEVi.mjs";
import { a as runSqliteImmediateTransactionSync } from "./sqlite-transaction-2VkikDo-.mjs";
import { s as resolveOpenClawStateSqlitePath } from "./openclaw-state-db.paths-rJI64Ab5.mjs";
import { t as splitArgsPreservingQuotes } from "./arg-split-CR3xkHmb.mjs";
import { a as getWindowsSystem32ExePath, o as getWindowsWmicExePath, r as getWindowsPowerShellExePath } from "./windows-install-roots--RziW4S3.mjs";
import { d as withExistingOpenClawStateDatabaseReadOnly, u as withExistingOpenClawStateDatabaseCurrentReadOnly } from "./openclaw-state-db-readonly-DE3MB0wy.mjs";
import { n as assertOpenClawStateWriteAllowed } from "./openclaw-state-ownership-1l-TMJat.mjs";
import { d as withOpenClawStateStartupMigrationCheckpointDatabase } from "./openclaw-state-db-DM-mSY0m.mjs";
import { a as releaseOpenClawStateLeaseInTransaction, c as readStateLeaseProcessOwnerStatus, i as reclaimDeadOpenClawStateLeaseInTransaction, n as readOpenClawStateLease, s as parseStateLeaseProcessOwner, t as acquireOpenClawStateLeaseInTransaction } from "./openclaw-state-lease-store-mYOdDX2y.mjs";
import { n as STARTUP_MIGRATION_LEASE_TTL_MS } from "./startup-migration-checkpoint-CHB08AgD.mjs";
import { t as readDarwinProcessCommand } from "./darwin-process-command-BeGMs9jL.mjs";
import { n as parseProcCmdline } from "./gateway-process-argv-DCrAz6F8.mjs";
import { r as parseWindowsNetstatListeners } from "./ports-netstat-Bdog4KHV.mjs";
import { t as startOpenClawStateLeaseHeartbeat } from "./openclaw-state-lease-heartbeat-N-FrPH5_.mjs";
import fs from "node:fs";
import { hostname } from "node:os";
import { spawnSync } from "node:child_process";
import { randomUUID } from "node:crypto";
//#region src/infra/windows-port-pids.ts
const DEFAULT_TIMEOUT_MS = 5e3;
function readListeningPidsViaPowerShell(port, timeoutMs) {
	const ps = spawnSync(getWindowsPowerShellExePath(), [
		"-NoProfile",
		"-Command",
		`(Get-NetTCPConnection -LocalPort ${port} -State Listen -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess)`
	], {
		env: resolveDiagnosticProcessEnv(),
		encoding: "utf8",
		timeout: timeoutMs,
		windowsHide: true
	});
	if (ps.error || ps.status !== 0) return null;
	return ps.stdout.split(/\r?\n/).flatMap((line) => parseStrictPositiveInteger(line.trim()) ?? []);
}
function parseListeningPidsFromNetstat(stdout, port) {
	return [...new Set(parseWindowsNetstatListeners(stdout, port).map((listener) => listener.pid))];
}
function readWindowsListeningPidsOnPortSync(port, timeoutMs = DEFAULT_TIMEOUT_MS) {
	const result = readWindowsListeningPidsResultSync(port, timeoutMs);
	return result.ok ? result.pids : [];
}
function readWindowsListeningPidsResultSync(port, timeoutMs = DEFAULT_TIMEOUT_MS) {
	const powershellPids = readListeningPidsViaPowerShell(port, timeoutMs);
	if (powershellPids != null) return {
		ok: true,
		pids: powershellPids
	};
	const netstat = spawnSync(getWindowsSystem32ExePath("netstat.exe"), ["-ano"], {
		env: resolveDiagnosticProcessEnv(),
		encoding: "utf8",
		timeout: timeoutMs,
		windowsHide: true
	});
	if (netstat.error) {
		const code = netstat.error.code;
		return {
			ok: false,
			permanent: code === "ENOENT" || code === "EACCES" || code === "EPERM"
		};
	}
	if (netstat.status !== 0) return {
		ok: false,
		permanent: false
	};
	return {
		ok: true,
		pids: parseListeningPidsFromNetstat(netstat.stdout, port)
	};
}
/** Read-only bounded listener observation, without PID enrichment or a second budget. */
function readWindowsPortUsageSync(port, timeoutMs) {
	if (process.platform !== "win32" || !Number.isInteger(port) || port < 1 || port > 65535 || !Number.isFinite(timeoutMs) || timeoutMs < 1) return "unknown";
	const result = spawnSync(getWindowsPowerShellExePath(), [
		"-NoProfile",
		"-NonInteractive",
		"-Command",
		`\$ErrorActionPreference = 'Stop'; @(Get-NetTCPConnection -ErrorAction Stop | Where-Object { $_.LocalPort -eq ${port} -and $_.State -eq 'Listen' }).Count`
	], {
		env: resolveDiagnosticProcessEnv(),
		encoding: "utf8",
		timeout: Math.min(Math.floor(timeoutMs), DEFAULT_TIMEOUT_MS),
		windowsHide: true
	});
	if (result.error || result.status !== 0) return "unknown";
	const count = result.stdout.trim();
	return /^\d+$/.test(count) ? Number(count) === 0 ? "free" : "busy" : "unknown";
}
function extractWindowsCommandLine(raw) {
	const lines = normalizeStringEntries(decodeWindowsProcessOutput(raw).split(/\r?\n/));
	for (const line of lines) {
		if (!normalizeLowercaseStringOrEmpty(line).startsWith("commandline=")) continue;
		return line.slice(12).trim() || null;
	}
	return lines.find((line) => normalizeLowercaseStringOrEmpty(line) !== "commandline") ?? null;
}
function readWindowsProcessArgsSync(pid, timeoutMs = DEFAULT_TIMEOUT_MS, env = process.env, deadlineMs) {
	const result = readWindowsProcessArgsResultSync(pid, timeoutMs, env, deadlineMs);
	return result.ok ? result.args : null;
}
function readWindowsProcessArgsResultSync(pid, timeoutMs = DEFAULT_TIMEOUT_MS, env = process.env, deadlineMs) {
	const remainingTimeoutMs = () => deadlineMs === void 0 ? timeoutMs : Math.min(timeoutMs, Math.max(0, Math.ceil(deadlineMs - performance.now())));
	if (remainingTimeoutMs() <= 0) return {
		ok: false,
		permanent: false
	};
	const powershellPath = getWindowsPowerShellExePath(env, deadlineMs);
	const powershellTimeoutMs = remainingTimeoutMs();
	if (powershellTimeoutMs <= 0) return {
		ok: false,
		permanent: false
	};
	const powershell = spawnSync(powershellPath, [
		"-NoProfile",
		"-Command",
		`(Get-CimInstance Win32_Process -Filter "ProcessId = ${pid}" | Select-Object -ExpandProperty CommandLine)`
	], {
		env: resolveDiagnosticProcessEnv(env),
		encoding: "utf8",
		timeout: powershellTimeoutMs,
		windowsHide: true
	});
	if (!powershell.error && powershell.status === 0) {
		const command = powershell.stdout.trim();
		return {
			ok: true,
			args: command ? splitArgsPreservingQuotes(command, { escapeMode: "backslash-quote-only" }) : null
		};
	}
	if (remainingTimeoutMs() <= 0) return {
		ok: false,
		permanent: false
	};
	const wmicPath = getWindowsWmicExePath(env, deadlineMs);
	const wmicTimeoutMs = remainingTimeoutMs();
	if (wmicTimeoutMs <= 0) return {
		ok: false,
		permanent: false
	};
	const wmic = spawnSync(wmicPath, [
		"process",
		"where",
		`ProcessId=${pid}`,
		"get",
		"CommandLine",
		"/value"
	], {
		env: resolveDiagnosticProcessEnv(env),
		timeout: wmicTimeoutMs,
		windowsHide: true,
		stdio: [
			"ignore",
			"pipe",
			"ignore"
		]
	});
	if (!wmic.error && wmic.status === 0) {
		const command = extractWindowsCommandLine(wmic.stdout);
		return {
			ok: true,
			args: command ? splitArgsPreservingQuotes(command, { escapeMode: "backslash-quote-only" }) : null
		};
	}
	const code = (wmic.error ?? powershell.error)?.code;
	return {
		ok: false,
		permanent: code === "ENOENT" || code === "EACCES" || code === "EPERM"
	};
}
//#endregion
//#region src/infra/gateway-lock-process.ts
function readGatewayLockProcessStartTime(pid, platform, timeoutMs) {
	return platform === process.platform ? getFileLockProcessStartTime(pid, process.env, timeoutMs) : null;
}
function readGatewayLockProcessCmdline(pid, platform, timeoutMs, deadlineMs, env = process.env) {
	try {
		if (platform === "linux") return parseProcCmdline(fs.readFileSync(`/proc/${pid}/cmdline`, "utf8"));
		if (platform === "win32") return readWindowsProcessArgsSync(pid, timeoutMs, env, deadlineMs);
		if (platform === "darwin") {
			const command = readDarwinProcessCommand(pid);
			return command && "argv" in command ? command.argv : null;
		}
	} catch {}
	return null;
}
//#endregion
//#region src/infra/gateway-owner-lease.ts
const gatewayOwnerKey = {
	scope: "gateway-owner",
	key: "global"
};
const log = createSubsystemLogger("gateway");
function parseSupervisor(value) {
	if (value === null) return null;
	if (!isRecord(value) || value.kind !== "launchd" && value.kind !== "systemd" && value.kind !== "schtasks" && value.kind !== "external" || value.name !== null && (typeof value.name !== "string" || !value.name.trim())) throw new Error("Gateway owner lease supervisor could not be verified");
	return {
		kind: value.kind,
		name: value.name
	};
}
/** Read through the caller's admitted connection when ownership guards a write. */
function readGatewayOwnerLeaseFromDatabase(db, port) {
	if (!tableExists(db, "state_leases")) return;
	const row = readOpenClawStateLease(db, gatewayOwnerKey);
	if (!row) return;
	const processOwner = parseStateLeaseProcessOwner(row.payloadJson);
	let payload;
	try {
		payload = row.payloadJson ? JSON.parse(row.payloadJson) : null;
	} catch {
		payload = null;
	}
	if (!processOwner || !isRecord(payload) || typeof payload.port !== "number" || !Number.isInteger(payload.port) || payload.port <= 0 || payload.port > 65535 || payload.mode !== "foreground" && payload.mode !== "supervised") throw new Error("Gateway owner lease identity could not be verified");
	if (port !== void 0 && payload.port !== port) return;
	const supervisor = parseSupervisor(payload.supervisor);
	if (payload.mode === "foreground" !== (supervisor === null)) throw new Error("Gateway owner lease supervisor does not match its listener mode");
	return {
		...processOwner,
		owner: row.owner,
		port: payload.port,
		mode: payload.mode,
		supervisor,
		state: readStateLeaseProcessOwnerStatus(processOwner),
		expired: row.expiresAt === null || row.expiresAt <= Date.now()
	};
}
function readGatewayOwnerLease(params = {}) {
	const operation = ({ db }) => readGatewayOwnerLeaseFromDatabase(db, params.port);
	return params.current || params.openStateSchemaReadAdmission ? withExistingOpenClawStateDatabaseCurrentReadOnly(operation, { env: params.env }, params.openStateSchemaReadAdmission) : withExistingOpenClawStateDatabaseReadOnly(operation, { env: params.env });
}
/** Publish only while the caller holds the Gateway lifecycle coordinator. */
function acquireGatewayOwnerLease(params) {
	const env = params.env ?? process.env;
	const databasePath = resolveOpenClawStateSqlitePath(env);
	const identity = {
		...gatewayOwnerKey,
		owner: params.owner ?? randomUUID()
	};
	const processOwner = {
		pid: process.pid,
		host: hostname(),
		startedAt: getFileLockProcessStartTime(process.pid, env) ?? getFileLockProcessStartTime(process.pid, env)
	};
	const payloadJson = JSON.stringify({
		owner: processOwner,
		port: params.port,
		mode: params.mode,
		supervisor: params.supervisor
	});
	const expiresAt = withOpenClawStateStartupMigrationCheckpointDatabase((db) => runSqliteImmediateTransactionSync(db, () => {
		assertOpenClawStateWriteAllowed({
			database: db,
			databasePath,
			env
		});
		reclaimDeadOpenClawStateLeaseInTransaction(db, identity);
		const acquired = acquireOpenClawStateLeaseInTransaction(db, identity, STARTUP_MIGRATION_LEASE_TTL_MS, payloadJson);
		if (acquired.kind === "held") throw new Error("Another Gateway owner lease is still active for this state directory");
		return acquired.expiresAt;
	}, {
		databaseLabel: databasePath,
		operationLabel: "gateway.owner-lease.acquire"
	}), {
		env,
		path: databasePath
	});
	const releaseRow = () => withOpenClawStateStartupMigrationCheckpointDatabase((db) => runSqliteImmediateTransactionSync(db, () => {
		assertOpenClawStateWriteAllowed({
			database: db,
			databasePath,
			env
		});
		releaseOpenClawStateLeaseInTransaction(db, identity);
	}, {
		databaseLabel: databasePath,
		operationLabel: "gateway.owner-lease.release"
	}), {
		env,
		path: databasePath
	});
	let heartbeat;
	let constructionFailure;
	let warned = false;
	const ready = (async () => {
		try {
			heartbeat = startOpenClawStateLeaseHeartbeat({
				path: databasePath,
				identity,
				leaseMs: STARTUP_MIGRATION_LEASE_TTL_MS,
				acquiredAt: expiresAt - STARTUP_MIGRATION_LEASE_TTL_MS,
				expiresAt,
				heartbeatMs: 3e4,
				...processOwner.startedAt === null ? { processOwner: {
					identity: processOwner,
					env: resolveDiagnosticProcessEnv(env)
				} } : {},
				onLost: () => {
					if (!warned) {
						warned = true;
						log.warn("Gateway owner lease heartbeat stopped; process identity remains recorded");
					}
				}
			});
		} catch (error) {
			constructionFailure = { error };
			throw error;
		}
		await heartbeat.ready;
	})();
	let released = false;
	return {
		owner: identity.owner,
		ready,
		async release() {
			if (released) return;
			if (constructionFailure) throw new Error("Gateway owner heartbeat cleanup could not be confirmed", { cause: constructionFailure.error });
			await heartbeat?.stop();
			releaseRow();
			released = true;
		}
	};
}
//#endregion
export { readGatewayLockProcessStartTime as a, readWindowsPortUsageSync as c, readGatewayLockProcessCmdline as i, readWindowsProcessArgsResultSync as l, readGatewayOwnerLease as n, readWindowsListeningPidsOnPortSync as o, readGatewayOwnerLeaseFromDatabase as r, readWindowsListeningPidsResultSync as s, acquireGatewayOwnerLease as t, readWindowsProcessArgsSync as u };
