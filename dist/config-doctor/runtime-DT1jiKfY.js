import { a as readStringValue, c as asOptionalRecord, i as normalizeOptionalString, l as isRecord, n as normalizeNullableString, o as asNullableRecord, r as normalizeOptionalLowercaseString, t as normalizeLowercaseStringOrEmpty } from "./string-coerce-6O-WySZM.js";
import { C as hasErrnoCode, D as normalizeUniqueStringEntries, _ as resolveGlobalSingleton, h as normalizeAgentId, m as pruneMapToMaxSize } from "./runtime-doctor-migrations-BdgZ9Dfo.js";
import "./src-BdCVpmTW.js";
import { a as extractErrorCode, i as collectNestedErrorCandidates, n as coerceErrorMessage, r as collectErrorGraphCandidates, t as formatErrorMessage } from "./errors-njERyofs.js";
import { a as DEFAULT_SECRET_PROVIDER_ALIAS, d as expectDefined, r as resolveIdentityPathViaExistingAncestorSync } from "./types.secrets-C41nwEA3.js";
import { a as asSafeIntegerInRange, i as asPositiveSafeInteger, o as resolveNonNegativeIntegerOption, r as asFiniteNumber, s as resolveTimerTimeoutMs, t as MAX_DATE_TIMESTAMP_MS } from "./number-coercion-C4aQ0B2l.js";
import { S as resolveConfigEnvVars, T as truncateUtf16Safe, _ as readConfigIncludeFileWithGuards, b as parseJsonWithJson5Fallback, d as resolveConfigPath, g as hashConfigIncludeRaw, h as resolveStateDir, m as resolveIncludeRoots, o as hasRegisteredSecretValuesForRedaction, s as redactRegisteredSecretValues, v as resolveConfigIncludeWritePath, w as sliceUtf16Safe, y as resolveConfigIncludes } from "./redact-B_47uiIQ.js";
import { a as custom, c as literal, d as object, h as string, i as boolean, l as looseObject, t as _enum, u as number, v as unknown } from "./schemas-BDyHDkT2.js";
import { t as LEGACY_IMPLICIT_AGENT_ID } from "./session-key-B5kkW1U6.js";
import { a as resolveRequiredHomeDir, r as expandHomePrefix, s as resolveUserPath } from "./utils-DhELI9oB.js";
import { $ as runSqliteDeferredTransactionSync, $t as createSqliteLifecycleAggregateError, A as readSqliteSchemaCookie, At as resolveOpenClawStateDirForDatabasePath, B as classifySqliteTableReadError, Bt as OPENCLAW_SQLITE_BUSY_TIMEOUT_MS, C as assertSqliteSchemaContains, Cn as iterateSqliteQuerySync, Ct as withStateDatabaseColdAdmission, D as createSqliteTableContractReader, Dn as sha256FileSync$1, Dt as describeAgentPathMigration, E as collectSqliteSchemaIssues, En as registerNodeSqliteDisposeCallback, Et as applyPrivateModeSync, F as registerSqliteCacheExitClose, Ft as DOCTOR_OWNED_STATE_TABLES, G as SqliteSchemaMismatchError, Gt as observeOpenClawDatabaseMaintenanceResource, H as tableExists, I as runInSqliteMaintenanceContext, It as FIRST_USE_STATE_INDEXES, J as isTerminalSqliteIntegrityError, K as assertSqliteIntegrity, L as createSqliteWalReclamationResult, Lt as FIRST_USE_STATE_TABLES, M as createSqliteSnapshotStagingDirectorySync, Mt as resolveOpenClawStateSqlitePath, N as configureSqliteConnectionPragmas, Nt as resolveQuarantineStorePath, O as getCanonicalSqliteNamedIndexContracts, On as sha256Hex, Ot as existingPathOrUndefined, P as configureSqlitePreSchemaPragmas, Pt as warnAgentPathMigration, Qt as SqliteCoordinatorError, R as coerceRequiredSqliteNumber, Rt as LAZY_ADDITIVE_STATE_INDEXES, S as migrateSqliteSchemaToStrictInTransaction, Sn as getNodeSqliteKysely, St as getStateDatabaseSchemaLease, T as collectSqliteNamedIndexContract, Tn as executeWithCachedStatement, Tt as setSqliteBusyTimeout, U as tableHasColumn, Ut as getOpenClawDatabaseMaintenanceScope, V as ensureColumn, Vt as StateDatabaseReadAdmissionInvalidatedError, W as tablePrimaryKeyColumns, X as sqliteIntegrityCheckSteps, Xt as OpenClawStateOwnershipError, Y as runSqliteIntegrityOperationSync, Yt as OpenClawStateExternalOwnershipError, Z as assertTransactionUsable, Zt as OpenClawStateOwnershipMetadataError, _ as applyConfigEnvVars, _n as runSqlitePinnedReadSnapshotSync, _t as VERSION, a as recordOpenClawStateDatabaseOpenFailure, an as isSqliteLockError, at as requestSqliteWorkerSchemaMaintenance, b as SQLITE_IDLE_HANDLE_TTL_MS, bn as executeSqliteQuerySync, bt as acquireStateDatabaseSchemaLease, c as retainOpenClawStateDatabaseForIdle, cn as admitSqliteSchema, d as readStateSchemaContentVersion, dn as assertExistingDatabaseIdentity, dt as normalizeOpenClawStateSchemaReadError, en as runWithSqliteCleanup, et as runSqliteImmediateTransactionSync, f as readStateSchemaMigrationVersion, g as isGatewayExternallySupervised, gn as splitSqlList, hn as quoteSqliteIdentifier, ht as StartupMaintenanceRequiredError, in as removeTempDirectory, j as acquireSqliteSnapshotReadToken, jt as resolveOpenClawStateSqliteDir, k as getCanonicalSqliteTableNames, kt as resolveOpenClawAgentDatabaseStoredPath, l as CONTENT_VERSION_KEY, ln as invalidateSqliteSchemaFacts, lt as withSqlitePostCommitPublications, m as openTrackedStateDatabaseResult, mn as extractSqliteTableSchema, mt as readSqliteUserVersion, nn as SqliteSnapshotCleanupError, nt as isExistingOpenClawStateSchema, o as registerOpenClawStateDatabaseAsyncResource, p as openTrackedStateDatabase, pn as readDatabasePathIdentitySync, pt as isSqliteSchemaVersionError, q as assertSqliteTableIntegrity, r as openClawStateDatabaseCache, rn as adoptPreparedLocation, rt as recordExistingOpenClawStateSchemaDatabase, s as registerOpenClawStateDatabaseLifecycleListener, sn as openNodeSqliteDatabase, st as SqliteWorkerError, tn as throwSqliteLifecycleErrors, u as assertSupportedStateSchemaVersion, un as runSqliteReadOperationSync, ut as OpenClawStateDatabaseSchemaMigrationRequiredError, v as cloneEnvWithPlatformSemantics, w as assertSqliteSchemaTablesPresent, wn as enableNodeSqliteKyselyStatementCache, wt as runWithSqliteBusyTimeout, x as migrateSqliteSchemaToStrict, xn as executeSqliteQueryTakeFirstSync, xt as assertStateDatabaseAccessAllowed, y as isTruthyEnvValue, yn as compileSqliteQueryBindings, yt as GatewayStateOwnerContentionError, z as normalizeSqliteNumber, zt as LAZY_ADDITIVE_STATE_TABLES } from "./openclaw-state-db-cache-r55YXcqj.js";
import { i as registerSignalExitBarrier, t as createSubsystemLogger } from "./subsystem-Bga3ZpNK.js";
import { n as createDeferredCore, t as isPromiseLike } from "./promise-like-ByIJ_1fR.js";
import { a as resolveRuntimeWorkerArgv, c as resolveNodeCompileCacheEnv, i as getSqliteWorkerExistingDatabaseIdentity, l as SQLITE_READONLY_CHILD_ARG, o as resolveRuntimeWorkerUrl, r as reserveSqliteWorkerInputPreparation, s as captureRuntimeWorkerSource, t as createOpenClawStateWorkerLease, u as runtimeProcessEntrypoints } from "./openclaw-state-worker-store-BGtLE3K2.js";
import { t as isHeadersLike } from "./fetch-headers-DD03wtQj.js";
import { n as withResponseBodyTimeout } from "./http-response-body-timeout-BoU0BKYf.js";
import { t as captureOpenClawStateWorkerContext } from "./openclaw-state-worker-context-DG-iGm2w.js";
import "node:fs/promises";
import "@openclaw/fs-safe/path";
import { toUSVString } from "node:util";
import path from "node:path";
import { URL as URL$1, fileURLToPath } from "node:url";
import { AsyncLocalStorage } from "node:async_hooks";
import fs$1, { existsSync, mkdirSync, readdirSync, statSync, writeSync } from "node:fs";
import "@openclaw/fs-safe/advanced";
import { isUtf8 } from "node:buffer";
import os from "node:os";
import { createHash, randomUUID } from "node:crypto";
import "@openclaw/fs-safe/errors";
import { channel } from "node:diagnostics_channel";
import { performance as performance$1 } from "node:perf_hooks";
import { parse } from "semver";
import { spawnSync } from "node:child_process";
import process$1 from "node:process";
import { StringDecoder } from "node:string_decoder";
import "@openclaw/fs-safe/output";
import "@openclaw/fs-safe/root";
import "@openclaw/fs-safe/secure-file";
import "@openclaw/fs-safe/walk";
import "@openclaw/fs-safe/durability";
import { serialize } from "node:v8";
import { isProxy } from "node:util/types";
import JSON5 from "json5";
import zlib, { gunzipSync, gzipSync } from "node:zlib";
import "@openclaw/proxyline";
//#region packages/normalization-core/src/format.ts
const BYTE_SIZE_UNITS = [
	"byte",
	"kilo",
	"mega",
	"giga",
	"tera"
];
const BYTE_SIZE_STYLES = {
	iec: {
		base: 1024,
		labels: [
			"B",
			"KiB",
			"MiB",
			"GiB",
			"TiB"
		]
	},
	"legacy-binary": {
		base: 1024,
		labels: [
			"B",
			"KB",
			"MB",
			"GB",
			"TB"
		]
	}
};
/** Formats a byte count with caller-explicit scale, labels, precision, and unit cap. */
function formatByteSize(bytes, options) {
	const { base, labels } = BYTE_SIZE_STYLES[options.style];
	const maxUnitIndex = BYTE_SIZE_UNITS.indexOf(options.maxUnit);
	let unitIndex = 0;
	let value = bytes;
	while (value >= base && unitIndex < maxUnitIndex) {
		value /= base;
		unitIndex += 1;
	}
	const unit = expectDefined(BYTE_SIZE_UNITS[unitIndex], "byte-size unit");
	const label = expectDefined(labels[unitIndex], "byte-size label");
	const fractionDigits = typeof options.fractionDigits === "function" ? options.fractionDigits(value, unit) : options.fractionDigits;
	if (fractionDigits === null) return `${value}${options.separator}${label}`;
	if (options.floorUnits?.includes(unit)) value = Math.floor(value * 10 ** fractionDigits) / 10 ** fractionDigits;
	return `${value.toFixed(fractionDigits)}${options.separator}${label}`;
}
//#endregion
//#region packages/normalization-core/src/json-coercion.ts
/** Parses JSON without throwing, returning undefined for invalid input. */
function safeParseJson(value) {
	try {
		return JSON.parse(value);
	} catch {
		return;
	}
}
/** Parses JSON into a non-array record, returning undefined for every other result. */
function safeParseJsonRecord(value) {
	return /^[\t\n\r ]*\{/.test(value) ? asOptionalRecord(safeParseJson(value)) : void 0;
}
//#endregion
//#region src/cli/profile-utils.ts
const PROFILE_NAME_RE = /^[a-z0-9][a-z0-9_-]{0,63}$/i;
function isValidProfileName(value) {
	return PROFILE_NAME_RE.test(value);
}
/** Resolve the canonical home-scoped state root for a validated CLI profile. */
function resolveProfileStateDir(profile, env, homedir) {
	const trimmed = profile.trim();
	if (!isValidProfileName(trimmed)) throw new Error(`Invalid profile name: ${JSON.stringify(profile)}`);
	const suffix = normalizeLowercaseStringOrEmpty(trimmed) === "default" ? "" : `-${trimmed}`;
	return path.join(resolveRequiredHomeDir(env, homedir), `.openclaw${suffix}`);
}
new AsyncLocalStorage();
resolveGlobalSingleton(Symbol.for("openclaw.childProcessSpawnCounts"), () => ({
	counts: /* @__PURE__ */ new Map(),
	sampledAt: performance.now()
}));
new AsyncLocalStorage();
//#endregion
//#region src/infra/sqlite-readonly-worker-protocol.ts
const SQLITE_READONLY_WORKER_MAX_BUFFER = 1048576;
function isSqliteSnapshotStagingMode(mode) {
	return mode === "staging-create" || mode === "staging-create-legacy" || mode === "staging-reconcile" || mode === "staging-retire";
}
var SqliteReadOnlyInspectionContentionError = class extends Error {};
function isSqliteReadOnlyWorkerResult(value) {
	if (!value || typeof value !== "object" || Array.isArray(value)) return false;
	if (Object.keys(value).length !== 2 || !("ok" in value)) return false;
	return value.ok === true && "location" in value && typeof value.location === "string" || value.ok === true && "contentVersion" in value && typeof value.contentVersion === "string" && /^(?:[a-f0-9]{64})?$/.test(value.contentVersion) || value.ok === true && "warnings" in value && Array.isArray(value.warnings) && value.warnings.every((warning) => typeof warning === "string") || value.ok === false && "message" in value && typeof value.message === "string";
}
function createSqliteReadOnlyWorkerError(message, stderr) {
	const stderrTail = toUSVString(sliceUtf16Safe(stderr.trim(), -4e3));
	return /* @__PURE__ */ new Error(`SQLite read-only worker ${message}${stderrTail ? `\nstderr (tail): ${stderrTail}` : ""}`);
}
function parseSqliteReadOnlyWorkerResult(stdout, stderr) {
	if (!stdout.trim()) throw createSqliteReadOnlyWorkerError("returned no JSON result", stderr);
	let message;
	try {
		message = JSON.parse(stdout);
	} catch {
		throw createSqliteReadOnlyWorkerError("returned invalid JSON", stderr);
	}
	if (!isSqliteReadOnlyWorkerResult(message)) throw createSqliteReadOnlyWorkerError("returned an invalid result", stderr);
	return message;
}
function readSqliteReadOnlyWorkerValue(params, mode) {
	let result;
	try {
		result = parseSqliteReadOnlyWorkerResult(params.stdout, params.stderr);
	} catch (error) {
		if (params.failure) throw createSqliteReadOnlyWorkerError(params.failure, params.stderr);
		throw error;
	}
	if (params.failure || !result.ok) {
		const contention = !result.ok && result.message.startsWith("Retryable SQLite inspection contention: ");
		const error = createSqliteReadOnlyWorkerError(!result.ok ? contention ? result.message.slice(40) : result.message : params.failure ?? "failed", params.stderr);
		if (contention) throw new SqliteReadOnlyInspectionContentionError(error.message);
		throw error;
	}
	if ((mode === "sync" || mode === "async" || mode === "consolidated" || isSqliteSnapshotStagingMode(mode)) && "location" in result) return result.location;
	if (mode === "content-version" && "contentVersion" in result) return result.contentVersion;
	if (mode === "reclaim" && "warnings" in result) return result.warnings;
	throw createSqliteReadOnlyWorkerError("returned a result for a different operation", params.stderr);
}
//#endregion
//#region src/infra/sqlite-readonly-worker.ts
const SQLITE_INSPECTION_TIMEOUT_MS = 3e5;
const SQLITE_INSPECTION_BYTES_PER_SECOND = 33554432;
const log = createSubsystemLogger("state/sqlite");
function resolveSqliteInspectionBudget(operation, pathname, sizeBytes) {
	const timeoutMs = resolveTimerTimeoutMs(SQLITE_INSPECTION_TIMEOUT_MS + Math.ceil(40 * Number(sizeBytes ?? 0) / SQLITE_INSPECTION_BYTES_PER_SECOND) * 1e3, SQLITE_INSPECTION_TIMEOUT_MS);
	const size = sizeBytes === void 0 ? "unknown size" : formatByteSize(Number(sizeBytes), {
		style: "iec",
		maxUnit: "giga",
		separator: " ",
		fractionDigits: sizeBytes < 1024n ? 0 : 1
	});
	if (timeoutMs > SQLITE_INSPECTION_TIMEOUT_MS) log.debug(`SQLite ${operation} for ${pathname}: ${size}, budget ${timeoutMs / 1e3} seconds`);
	return {
		timeoutMs,
		size
	};
}
function readSqliteInspectionBudget(operation, pathname, mainSizeBytes) {
	let sizeBytes = mainSizeBytes;
	try {
		sizeBytes ??= fs$1.statSync(pathname, { bigint: true }).size;
		for (const suffix of [
			"-wal",
			"-shm",
			"-journal"
		]) try {
			sizeBytes += fs$1.statSync(pathname + suffix, { bigint: true }).size;
		} catch (error) {
			if (!hasErrnoCode(error, "ENOENT")) throw error;
		}
	} catch {}
	return resolveSqliteInspectionBudget(operation, pathname, sizeBytes);
}
function sqliteInspectionTimeoutError(operation, pathname, timeoutMs, size) {
	return /* @__PURE__ */ new Error(`SQLite ${operation} timed out after ${timeoutMs / 1e3} seconds (budget for ${size}) for ${pathname}. Stop the Gateway service and other OpenClaw processes using this database, then retry; if already stopped, check storage performance.`);
}
function sqliteReadOnlyWorkerRequestArgs(pathname, options) {
	return [
		options.mode,
		path.resolve(pathname),
		...options.stagingRoot ? [options.stagingRoot] : []
	];
}
function sqliteReadOnlyWorkerArgv(pathname, options) {
	const { moduleUrl, runtimeGeneration } = captureRuntimeWorkerSource(resolveRuntimeWorkerUrl(options.mode === "content-version" ? runtimeProcessEntrypoints.sqliteSourceRevision : runtimeProcessEntrypoints.sqliteReadOnly));
	return {
		runtimeGeneration,
		argv: [
			...resolveRuntimeWorkerArgv(moduleUrl),
			SQLITE_READONLY_CHILD_ARG,
			...sqliteReadOnlyWorkerRequestArgs(pathname, options)
		]
	};
}
function runSqliteReadOnlyWorkerSync(pathname, stagingRoot, mode = "sync") {
	const { timeoutMs, size } = readSqliteInspectionBudget("read-only snapshot", pathname);
	const started = log.isEnabled("trace") ? performance$1.now() : void 0;
	const result = spawnSync(process.execPath, sqliteReadOnlyWorkerArgv(pathname, {
		mode,
		stagingRoot
	}).argv, {
		encoding: "utf8",
		env: resolveNodeCompileCacheEnv(),
		maxBuffer: SQLITE_READONLY_WORKER_MAX_BUFFER,
		timeout: timeoutMs,
		killSignal: "SIGKILL"
	});
	if (started !== void 0) log.trace(`SQLite read-only snapshot child durationMs=${performance$1.now() - started}`);
	return readSqliteReadOnlyWorkerValue({
		failure: result.error ? hasErrnoCode(result.error, "ETIMEDOUT") ? sqliteInspectionTimeoutError("read-only snapshot", pathname, timeoutMs, size).message : `failed to start: ${result.error.message}` : result.status === 0 ? void 0 : `exited with ${result.signal ? `signal ${result.signal}` : `code ${result.status}`}`,
		stderr: result.stderr,
		stdout: result.stdout
	}, mode);
}
//#endregion
//#region src/infra/sqlite-snapshot-source.ts
function prepareSqliteReadOnlyLocationSync(pathname) {
	const stagingRoot = createSqliteSnapshotStagingDirectorySync();
	try {
		return adoptPreparedLocation(runSqliteReadOnlyWorkerSync(pathname, stagingRoot), stagingRoot);
	} catch (error) {
		if (!removeTempDirectory(stagingRoot)) throw new SqliteSnapshotCleanupError(`${coerceErrorMessage(error)}; SQLite snapshot cleanup failed: ${stagingRoot}`, { cause: error });
		throw error;
	}
}
//#endregion
//#region src/infra/state-database-maintenance.ts
const StateSchemaMutationConflictError = resolveGlobalSingleton(Symbol.for("openclaw.stateSchemaMutationConflictError"), () => class SchemaMutationConflictError extends Error {
	constructor(databasePath, cause) {
		super(`OpenClaw refused shared state schema mutation at ${databasePath} because another Gateway owns that state directory. Stop that Gateway or perform the update through its managed restart path, then retry.`, { cause });
		this.name = "StateSchemaMutationConflictError";
	}
});
/** Ordinary transactions use SQLite; schema changes retain the installation's process owner. */
function withStateDatabaseSchemaMaintenance({ databasePath, busyTimeoutMs }, operation) {
	if (requestSqliteWorkerSchemaMaintenance(databasePath)) return operation();
	const canonical = resolveIdentityPathViaExistingAncestorSync(databasePath);
	const inherited = getStateDatabaseSchemaLease(canonical);
	if (inherited) {
		inherited.assertCurrent();
		return operation();
	}
	let lease;
	try {
		lease = acquireStateDatabaseSchemaLease(canonical, { busyTimeoutMs });
	} catch (error) {
		if (error instanceof GatewayStateOwnerContentionError) throw new StateSchemaMutationConflictError(canonical, error);
		throw error;
	}
	return runWithSqliteCleanup(lease, "state schema mutation", () => lease.run(operation));
}
//#endregion
//#region packages/gateway-protocol/src/failover-reasons.ts
const FAILOVER_REASONS = [
	"auth",
	"auth_permanent",
	"format",
	"rate_limit",
	"overloaded",
	"billing",
	"server_error",
	"timeout",
	"tls_certificate",
	"context_overflow",
	"model_not_found",
	"session_expired",
	"empty_response",
	"no_error_details",
	"unclassified",
	"unknown"
];
//#endregion
//#region src/cron/completion-status.ts
/** Resolves authored completion from an admitted job, or legacy completion from stored facts. */
function resolveCronCompletionStatus(params) {
	if (params.status === "error" || params.status === "skipped") return "failed";
	if (params.status !== "ok") return "unknown";
	if (params.requiredDelivery === void 0) return params.delivered === true || params.deliveryStatus === "delivered" || params.deliveryStatus === "not-requested" ? "succeeded" : "unknown";
	if (!params.requiredDelivery || params.deliveryStatus === "delivered" || params.deliveryStatus === "not-delivered" && params.deliverySuppressionReason !== void 0) return "succeeded";
	return params.deliveryStatus === "not-delivered" ? "failed" : "unknown";
}
const CRON_TIMEOUT_ERROR_PREFIXES = [
	"cron: job execution timed out",
	"cron: isolated agent setup timed out before runner start",
	"cron: isolated agent run stalled before execution start"
];
/** Recognizes watchdog timeouts without loading agent or execution-phase runtime. */
function isCronTimeoutErrorText(error) {
	return typeof error === "string" && CRON_TIMEOUT_ERROR_PREFIXES.some((prefix) => error === prefix || error.startsWith(`${prefix} `));
}
//#endregion
//#region src/cron/run-diagnostics-normalize.ts
const MAX_ENTRIES = 10;
const MAX_ENTRY_CHARS = 1e3;
const MAX_SUMMARY_CHARS = 2e3;
function normalizeSeverity(value) {
	return value === "info" || value === "warn" || value === "error" ? value : "error";
}
function normalizeSource(value) {
	switch (value) {
		case "cron-preflight":
		case "cron-setup":
		case "model-preflight":
		case "agent-run":
		case "tool":
		case "exec":
		case "delivery": return value;
		default: return "agent-run";
	}
}
function normalizeTimestamp$1(value, nowMs) {
	return typeof value === "number" && Number.isFinite(value) && value >= 0 ? Math.floor(value) : nowMs();
}
function normalizeDiagnosticMessage(value, redactText) {
	if (typeof value !== "string") return {};
	const normalized = normalizeOptionalString(value);
	if (!normalized) return {};
	const redacted = redactText(normalized);
	if (redacted.length <= MAX_ENTRY_CHARS) return { message: redacted };
	return {
		message: `${truncateUtf16Safe(redacted, 999)}…`,
		truncated: true
	};
}
function normalizeCronRunDiagnosticSummary(value) {
	const normalized = normalizeOptionalString(value);
	if (!normalized) return;
	if (normalized.length <= MAX_SUMMARY_CHARS) return normalized;
	return `${truncateUtf16Safe(normalized, 1999)}…`;
}
/** Normalizes stored cron diagnostic payloads into bounded entries. */
function normalizeCronRunDiagnosticsCore(value, opts) {
	if (!value || typeof value !== "object") return;
	const record = value;
	const nowMs = opts?.nowMs ?? Date.now;
	const redactText = opts?.redactText ?? ((text) => text);
	const entriesRaw = Array.isArray(record.entries) ? record.entries : [];
	const entries = [];
	for (const item of entriesRaw) {
		if (!item || typeof item !== "object") continue;
		const entry = item;
		const normalized = normalizeDiagnosticMessage(entry.message, redactText);
		if (!normalized.message) continue;
		entries.push({
			ts: normalizeTimestamp$1(entry.ts, nowMs),
			source: normalizeSource(entry.source),
			severity: normalizeSeverity(entry.severity),
			message: normalized.message,
			...typeof entry.toolName === "string" && entry.toolName.trim() ? { toolName: entry.toolName.trim() } : {},
			...typeof entry.exitCode === "number" && Number.isFinite(entry.exitCode) ? { exitCode: entry.exitCode } : entry.exitCode === null ? { exitCode: null } : {},
			...entry.truncated === true || normalized.truncated ? { truncated: true } : {}
		});
		if (entries.length > MAX_ENTRIES) entries.shift();
	}
	const summary = normalizeCronRunDiagnosticSummary(typeof record.summary === "string" ? redactText(record.summary) : void 0);
	if (entries.length === 0 && !summary) return;
	return {
		...summary ? { summary } : {},
		entries
	};
}
//#endregion
//#region src/cron/run-history-detail.ts
/** Read-side cron codec between cron history detail and the stable run-history wire shape.
* Deliberately free of agent/runtime imports so history reads stay dependency-light;
* the event->entry write codec lives in run-event-codec.ts. */
const CRON_RUN_DETAIL_KIND = "cron-run";
const cronRunStatusSchema = _enum([
	"ok",
	"error",
	"skipped"
]);
const cronCompletionStatusSchema = _enum([
	"succeeded",
	"failed",
	"unknown"
]);
const cronDeliveryStatusSchema = _enum([
	"delivered",
	"not-delivered",
	"unknown",
	"not-requested"
]);
const optionalCronStringSchema = string().optional().catch(void 0);
const optionalNonBlankCronStringSchema = string().refine((value) => value.trim().length > 0).optional().catch(void 0);
const optionalCronTimestampSchema = unknown().optional().transform((value) => normalizeTimestamp(value));
const optionalCronNonnegativeIntegerSchema = unknown().optional().transform((value) => asSafeIntegerInRange(value, { min: 0 }));
const cronUsageSchema = object({
	input_tokens: optionalCronNonnegativeIntegerSchema,
	output_tokens: optionalCronNonnegativeIntegerSchema,
	total_tokens: optionalCronNonnegativeIntegerSchema,
	cache_read_tokens: optionalCronNonnegativeIntegerSchema,
	cache_write_tokens: optionalCronNonnegativeIntegerSchema
}).transform((usage) => Object.values(usage).some((tokenCount) => tokenCount !== void 0) ? usage : void 0).optional().catch(void 0);
const cronFailureNotificationDeliverySchema = looseObject({
	status: cronDeliveryStatusSchema,
	delivered: boolean().optional().catch(void 0),
	error: optionalCronStringSchema
}).transform(({ status, delivered, error }) => ({
	status,
	...delivered !== void 0 ? { delivered } : {},
	...error !== void 0 ? { error } : {}
})).optional().catch(void 0);
const cronRunLogEntrySchema = looseObject({
	action: literal("finished"),
	jobId: string().refine((value) => value.trim().length > 0),
	ts: unknown().transform((value) => normalizeTimestamp(value)).pipe(number()),
	status: cronRunStatusSchema.optional().catch(void 0),
	completionStatus: cronCompletionStatusSchema.optional().catch(void 0),
	error: optionalCronStringSchema,
	errorReason: _enum(FAILOVER_REASONS).optional().catch(void 0),
	summary: optionalCronStringSchema,
	runId: optionalNonBlankCronStringSchema,
	diagnostics: unknown().optional(),
	runAtMs: optionalCronTimestampSchema,
	durationMs: optionalCronNonnegativeIntegerSchema,
	nextRunAtMs: optionalCronTimestampSchema,
	triggerFired: unknown().optional().transform((value) => value === true ? true : void 0),
	model: optionalNonBlankCronStringSchema,
	provider: optionalNonBlankCronStringSchema,
	usage: cronUsageSchema,
	delivered: boolean().optional().catch(void 0),
	deliveryStatus: cronDeliveryStatusSchema.optional().catch(void 0),
	deliveryError: optionalCronStringSchema,
	deliverySuppressionReason: _enum([
		"empty",
		"silent",
		"heartbeat",
		"channel_transform"
	]).optional().catch(void 0),
	failureNotificationDelivery: cronFailureNotificationDeliverySchema,
	delivery: custom(isJsonObject).optional().catch(void 0),
	sessionId: optionalNonBlankCronStringSchema,
	sessionKey: optionalNonBlankCronStringSchema
});
function isJsonValue(value) {
	const pending = [value];
	while (pending.length > 0) {
		const current = pending.pop();
		if (current === null || typeof current === "string" || typeof current === "boolean" || typeof current === "number") continue;
		if (!Array.isArray(current) && !isRecord(current)) return false;
		for (const child of Object.values(current)) pending.push(child);
	}
	return true;
}
/** Native JSON parsing keeps released scalar/null and numeric-overflow semantics. */
function parseCronRunDetailJson(serialized) {
	const value = safeParseJson(serialized);
	return isJsonValue(value) ? value : void 0;
}
function toJsonValue(value) {
	const serialized = JSON.stringify(value);
	return serialized === void 0 ? void 0 : parseCronRunDetailJson(serialized);
}
function isJsonObject(value) {
	return isRecord(value);
}
function normalizeTimestamp(value) {
	return asSafeIntegerInRange(value, {
		min: 0,
		max: MAX_DATE_TIMESTAMP_MS
	});
}
/** Parses stored or migrated cron history while preserving the stable wire shape. */
function parseCronRunLogEntryObject(obj, opts) {
	const jobId = normalizeOptionalString(opts?.jobId);
	const parsed = cronRunLogEntrySchema.safeParse(obj);
	if (!parsed.success) return null;
	const entryObj = parsed.data;
	if (jobId && entryObj.jobId !== jobId) return null;
	const entry = {
		ts: entryObj.ts,
		jobId: entryObj.jobId,
		action: "finished",
		status: entryObj.status,
		completionStatus: entryObj.completionStatus ?? resolveCronCompletionStatus({
			status: entryObj.status,
			delivered: entryObj.delivered,
			deliveryStatus: entryObj.deliveryStatus
		}),
		error: entryObj.error,
		errorReason: entryObj.errorReason,
		summary: entryObj.summary,
		runId: entryObj.runId,
		diagnostics: normalizeCronRunDiagnosticsCore(entryObj.diagnostics),
		runAtMs: entryObj.runAtMs,
		durationMs: entryObj.durationMs,
		nextRunAtMs: entryObj.nextRunAtMs,
		triggerFired: entryObj.triggerFired,
		model: entryObj.model,
		provider: entryObj.provider,
		usage: entryObj.usage
	};
	for (const field of [
		"delivered",
		"deliveryStatus",
		"deliveryError",
		"deliverySuppressionReason",
		"failureNotificationDelivery",
		"delivery",
		"sessionId",
		"sessionKey"
	]) if (entryObj[field] !== void 0) Object.assign(entry, { [field]: entryObj[field] });
	return entry;
}
/** Encodes Cron-owned outcome fields for retained history. */
function cronRunLogEntryToDetail(entry, options) {
	return toJsonValue({
		kind: CRON_RUN_DETAIL_KIND,
		status: entry.status,
		completionStatus: entry.completionStatus,
		error: entry.error ?? null,
		summary: entry.summary ?? null,
		storeKey: options.storeKey,
		errorReason: entry.errorReason,
		diagnostics: entry.diagnostics,
		delivered: entry.delivered,
		deliveryStatus: entry.deliveryStatus,
		deliveryError: entry.deliveryError,
		deliverySuppressionReason: entry.deliverySuppressionReason,
		failureNotificationDelivery: entry.failureNotificationDelivery,
		delivery: entry.delivery,
		sessionId: entry.sessionId,
		runId: entry.runId,
		runAtMs: entry.runAtMs,
		durationMs: entry.durationMs,
		nextRunAtMs: entry.nextRunAtMs,
		triggerFired: entry.triggerFired,
		triggerStateChanged: options.triggerEval?.fired === true ? options.triggerEval.stateChanged : void 0,
		triggerState: options.triggerEval?.fired === true && options.triggerEval.stateChanged ? options.triggerEval.state : void 0,
		scriptStateChanged: options.scriptResult?.scriptStateChanged === true ? true : void 0,
		scriptState: options.scriptResult?.scriptStateChanged === true ? options.scriptResult.scriptState : void 0,
		model: entry.model,
		provider: entry.provider,
		usage: entry.usage
	}) ?? { kind: CRON_RUN_DETAIL_KIND };
}
/** Preserves the released history row status vocabulary. */
function cronRunStorageStatus(entry) {
	if (entry.status === "ok") return (entry.completionStatus ?? resolveCronCompletionStatus({
		status: entry.status,
		delivered: entry.delivered,
		deliveryStatus: entry.deliveryStatus
	})) === "succeeded" ? "succeeded" : "failed";
	return entry.status === "error" && isCronTimeoutErrorText(entry.error) ? "timed_out" : "failed";
}
//#endregion
//#region src/infra/state-migrations.cron-run-logs.ts
const CRON_RUN_LOG_TASK_IMPORT_MIGRATION_ID = "state:cron-run-logs-to-task-runs:v1";
const CRON_RUN_LOG_IMPORT_BATCH_SIZE = 500;
function hasLegacyCronRunLogs(db) {
	return Boolean(db.prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = 'cron_run_logs' LIMIT 1").get());
}
function collectMirroredTasks(db) {
	const rows = db.prepare(`SELECT source_id, ended_at, detail_json
       FROM task_runs
       WHERE runtime = 'cron' AND source_id IS NOT NULL AND detail_json IS NOT NULL`).all();
	const bySource = /* @__PURE__ */ new Map();
	for (const row of rows) {
		const detail = row.detail_json ? safeParseJsonRecord(row.detail_json) : void 0;
		if (!row.source_id || detail?.kind !== "cron-run") continue;
		const identities = bySource.get(row.source_id) ?? [];
		identities.push({
			endedAt: normalizeSqliteNumber(row.ended_at) ?? null,
			...typeof detail.runId === "string" && detail.runId ? { runId: detail.runId } : {}
		});
		bySource.set(row.source_id, identities);
	}
	return bySource;
}
function hasMirroredIdentity(identities, runId, endedAt) {
	return identities.some((identity) => runId && identity.runId ? identity.runId === runId : identity.endedAt === endedAt);
}
function integerToBoolean(value) {
	return value === null || value === void 0 ? void 0 : coerceRequiredSqliteNumber(value) !== 0;
}
/** Legacy rows trust write-time errorReason and diagnostic redaction without recomputation. */
function parseLegacyRow(row) {
	const parsed = parseCronRunLogEntryObject(safeParseJson(row.entry_json ?? ""), { jobId: row.job_id });
	if (!parsed) return null;
	return {
		...parsed,
		ts: normalizeSqliteNumber(row.ts) ?? parsed.ts,
		jobId: row.job_id,
		status: row.status ?? parsed.status,
		error: row.error ?? parsed.error,
		summary: row.summary ?? parsed.summary,
		delivered: integerToBoolean(row.delivered) ?? parsed.delivered,
		deliveryStatus: row.delivery_status ?? parsed.deliveryStatus,
		deliveryError: row.delivery_error ?? parsed.deliveryError,
		sessionId: row.session_id ?? parsed.sessionId,
		sessionKey: row.session_key ?? parsed.sessionKey,
		runId: row.run_id ?? parsed.runId,
		runAtMs: normalizeSqliteNumber(row.run_at_ms ?? null) ?? parsed.runAtMs,
		durationMs: normalizeSqliteNumber(row.duration_ms ?? null) ?? parsed.durationMs,
		nextRunAtMs: normalizeSqliteNumber(row.next_run_at_ms ?? null) ?? parsed.nextRunAtMs,
		model: row.model ?? parsed.model,
		provider: row.provider ?? parsed.provider
	};
}
/** Runs inside the state schema transaction and removes the retired table after import. */
function migrateLegacyCronRunLogsToTaskRuns(db) {
	if (!hasLegacyCronRunLogs(db)) return {
		imported: 0,
		alreadyMirrored: 0,
		malformed: 0,
		skipped: true
	};
	const mirrored = collectMirroredTasks(db);
	const ordinals = /* @__PURE__ */ new Map();
	const insert = db.prepare(`
    INSERT INTO task_runs (
      task_id, runtime, task_kind, source_id, requester_session_key, owner_key, scope_kind,
      child_session_key, parent_flow_id, parent_task_id, agent_id, requester_agent_id, run_id,
      label, task, status, delivery_status, notify_policy, created_at, started_at, ended_at,
      last_event_at, cleanup_after, error, progress_summary, terminal_summary, terminal_outcome,
      detail_json
    ) VALUES (
      @task_id, 'cron', NULL, @source_id, '', '', 'system', @child_session_key, NULL, NULL,
      NULL, NULL, @run_id, NULL, @task, @status, 'not_applicable', 'silent', @created_at,
      @started_at, @ended_at, @ended_at, NULL, @error, NULL, @terminal_summary,
      @terminal_outcome, @detail_json
    )
  `);
	let imported = 0;
	let alreadyMirrored = 0;
	let malformed = 0;
	let offset = 0;
	while (true) {
		const rows = db.prepare(`SELECT * FROM cron_run_logs
         ORDER BY job_id, ts, store_key, seq
         LIMIT ? OFFSET ?`).all(CRON_RUN_LOG_IMPORT_BATCH_SIZE, offset);
		if (rows.length === 0) break;
		offset += rows.length;
		for (const row of rows) {
			const entry = parseLegacyRow(row);
			if (!entry) {
				malformed++;
				continue;
			}
			const key = `${entry.jobId}\0${entry.ts}`;
			const ordinal = (ordinals.get(key) ?? 0) + 1;
			ordinals.set(key, ordinal);
			if (hasMirroredIdentity(mirrored.get(entry.jobId) ?? [], entry.runId, entry.ts)) {
				alreadyMirrored++;
				continue;
			}
			const taskId = `cron-runlog-import:${entry.jobId}:${entry.ts}:${ordinal}`;
			const status = cronRunStorageStatus(entry);
			insert.run({
				task_id: taskId,
				source_id: entry.jobId,
				child_session_key: entry.sessionKey?.trim() || null,
				run_id: taskId,
				task: entry.jobId,
				status,
				created_at: entry.runAtMs ?? entry.ts,
				started_at: entry.runAtMs ?? null,
				ended_at: entry.ts,
				error: entry.error ?? null,
				terminal_summary: entry.summary ?? null,
				terminal_outcome: status === "succeeded" ? "succeeded" : null,
				detail_json: JSON.stringify(cronRunLogEntryToDetail(entry, { storeKey: row.store_key }))
			});
			imported++;
		}
	}
	db.exec(`
    DROP INDEX IF EXISTS idx_cron_run_logs_store_ts;
    DROP INDEX IF EXISTS idx_cron_run_logs_job_status;
    DROP INDEX IF EXISTS idx_cron_run_logs_delivery;
    DROP TABLE cron_run_logs;
  `);
	const result = {
		imported,
		alreadyMirrored,
		malformed,
		skipped: false
	};
	const now = Date.now();
	db.prepare(`INSERT INTO migration_runs (id, started_at, finished_at, status, report_json)
     VALUES (?, ?, ?, 'completed', ?)
     ON CONFLICT(id) DO UPDATE SET
       finished_at = excluded.finished_at,
       status = excluded.status,
       report_json = excluded.report_json`).run(CRON_RUN_LOG_TASK_IMPORT_MIGRATION_ID, now, now, JSON.stringify(result));
	return result;
}
//#endregion
//#region src/state/openclaw-state-db-additive-columns.ts
const lazyColumns = [
	[
		"user_profile_identities",
		"authorization_id",
		"TEXT"
	],
	[
		"user_profile_identities",
		"authorization_basis_json",
		"TEXT"
	],
	[
		"claw_installs",
		"bootstrap_content_digest",
		"TEXT"
	],
	[
		"claw_installs",
		"bootstrap_source_path",
		"TEXT"
	],
	[
		"worker_environments",
		"desktop_json",
		"TEXT"
	],
	[
		"worker_environments",
		"bootstrap_install_kind",
		"TEXT"
	],
	[
		"worker_environments",
		"preparation_purpose",
		"TEXT"
	],
	[
		"claw_package_refs",
		"extension_adapter_identity",
		"TEXT"
	],
	[
		"claw_package_refs",
		"extension_detected_format",
		"TEXT"
	],
	[
		"claw_package_refs",
		"extension_format",
		"TEXT"
	],
	[
		"claw_package_refs",
		"extension_id",
		"TEXT"
	],
	[
		"claw_package_refs",
		"extension_mapped_json",
		"TEXT"
	],
	[
		"claw_package_refs",
		"extension_unavailable_json",
		"TEXT"
	],
	[
		"worker_environments",
		"shared_host",
		"INTEGER"
	],
	[
		"worker_environments",
		"node_setup_id",
		"TEXT"
	],
	[
		"worker_environments",
		"node_device_id",
		"TEXT"
	],
	[
		"worker_session_placements",
		"terminal_reason",
		"TEXT"
	],
	[
		"worker_session_placements",
		"terminal_at_ms",
		"INTEGER"
	],
	[
		"worker_workspace_pending_results",
		"repository_workspace_id",
		"TEXT",
		true
	],
	[
		"worker_session_placement_moves",
		"abandon_source",
		"INTEGER",
		true
	],
	[
		"worker_session_placement_moves",
		"target_machine_class",
		"TEXT",
		true
	],
	[
		"worker_session_placement_moves",
		"target_os",
		"TEXT",
		true
	],
	[
		"worktrees",
		"run_end_cleanup_json",
		"TEXT"
	],
	[
		"worktrees",
		"gc_protection_json",
		"TEXT"
	],
	[
		"device_bootstrap_tokens",
		"setup_id",
		"TEXT",
		true
	],
	[
		"session_groups",
		"cwd",
		"TEXT",
		true
	],
	[
		"session_groups",
		"worktree",
		"INTEGER",
		true
	],
	[
		"secret_store_entries",
		"allowed_hosts",
		"TEXT"
	],
	[
		"web_push_subscriptions",
		"device_id",
		"TEXT",
		true
	],
	[
		"web_push_subscriptions",
		"user_profile_id",
		"TEXT",
		true
	],
	[
		"web_push_subscriptions",
		"preferences_json",
		"TEXT",
		true
	],
	[
		"task_runs",
		"execution_owner_host",
		"TEXT",
		true
	],
	[
		"task_runs",
		"execution_owner_pid",
		"INTEGER",
		true
	],
	[
		"task_runs",
		"execution_owner_start_identity",
		"INTEGER",
		true
	],
	[
		"session_watch_cursors",
		"watcher_store_path",
		"TEXT",
		true
	],
	[
		"subagent_runs",
		"requester_store_path",
		"TEXT",
		true
	],
	[
		"subagent_runs",
		"controller_store_path",
		"TEXT",
		true
	],
	[
		"cron_jobs",
		"grant_definition_revision",
		"TEXT"
	],
	[
		"cron_jobs",
		"grant_definition_generation",
		"INTEGER"
	],
	[
		"cron_jobs",
		"grant_definition_updated_at",
		"INTEGER"
	]
];
function lazyColumnDefinitions(firstUseOnly) {
	return lazyColumns.filter((definition) => firstUseOnly === void 0 || Boolean(definition[3]) === firstUseOnly).map(([tableName, columnName, dataType]) => ({
		columnName,
		dataType,
		tableName
	}));
}
const CLAW_LAZY_ADDITIVE_STATE_COLUMN_DEFINITIONS = lazyColumnDefinitions();
const CLAW_STARTUP_ADDITIVE_STATE_COLUMN_DEFINITIONS = lazyColumnDefinitions(false);
const CLAW_FIRST_USE_ADDITIVE_STATE_COLUMN_DEFINITIONS = lazyColumnDefinitions(true);
const ORDERED_STARTUP_ADDITIVE_STATE_COLUMNS = {
	packageUpdatedAt: [["claw_package_refs", "updated_at_ms INTEGER NOT NULL DEFAULT 0"]],
	packageIntegrity: [["claw_package_refs", "package_integrity TEXT NOT NULL DEFAULT 'sha256:0000000000000000000000000000000000000000000000000000000000000000'"]],
	diagnosticSequence: [["diagnostic_events", "sequence INTEGER NOT NULL DEFAULT 0"]],
	cronRunLogs: [
		["worktrees", "provisioned_paths_json TEXT"],
		["apns_registrations", "relay_origin TEXT"],
		["device_pairing_pending", "refreshed_at_ms INTEGER"],
		["device_pairing_pending", "browser_origin TEXT"],
		["device_pairing_paired", "approved_via TEXT"],
		["device_pairing_paired", "browser_origin TEXT"],
		["device_pairing_paired", "operator_label TEXT"],
		["device_pairing_paired", "node_surface_json TEXT"],
		["device_pairing_paired", "pending_node_surface_json TEXT"],
		["cron_run_logs", "status TEXT"],
		["cron_run_logs", "error TEXT"],
		["cron_run_logs", "summary TEXT"],
		["cron_run_logs", "diagnostics_summary TEXT"],
		["cron_run_logs", "delivery_status TEXT"],
		["cron_run_logs", "delivery_error TEXT"],
		["cron_run_logs", "delivered INTEGER"],
		["cron_run_logs", "session_id TEXT"],
		["cron_run_logs", "session_key TEXT"],
		["cron_run_logs", "run_id TEXT"],
		["cron_run_logs", "run_at_ms INTEGER"],
		["cron_run_logs", "duration_ms INTEGER"],
		["cron_run_logs", "next_run_at_ms INTEGER"],
		["cron_run_logs", "model TEXT"],
		["cron_run_logs", "provider TEXT"],
		["cron_run_logs", "total_tokens INTEGER"],
		["cron_run_logs", "entry_json TEXT NOT NULL DEFAULT '{}'"],
		["cron_run_logs", "created_at INTEGER NOT NULL DEFAULT 0"]
	],
	acpReplay: [["acp_replay_events", "estimated_bytes INTEGER NOT NULL DEFAULT 0"], ["acp_replay_sessions", "estimated_bytes INTEGER NOT NULL DEFAULT 0"]],
	cronJobs: [
		["cron_jobs", "description TEXT"],
		["cron_jobs", "declaration_key TEXT"],
		["cron_jobs", "owner_agent_id TEXT"],
		["cron_jobs", "name TEXT NOT NULL DEFAULT ''"],
		["cron_jobs", "enabled INTEGER NOT NULL DEFAULT 1"],
		["cron_jobs", "agent_id TEXT"],
		["cron_jobs", "payload_kind TEXT NOT NULL DEFAULT 'message'"],
		["cron_jobs", "state_json TEXT NOT NULL DEFAULT '{}'"],
		["cron_jobs", "runtime_updated_at_ms INTEGER"],
		["cron_jobs", "schedule_identity TEXT"],
		["cron_jobs", "sort_order INTEGER NOT NULL DEFAULT 0"]
	],
	deliveryQueue: [
		["sandbox_registry_entries", "session_key TEXT"],
		["sandbox_registry_entries", "backend_id TEXT"],
		["sandbox_registry_entries", "runtime_label TEXT"],
		["sandbox_registry_entries", "image TEXT"],
		["sandbox_registry_entries", "created_at_ms INTEGER"],
		["sandbox_registry_entries", "last_used_at_ms INTEGER"],
		["sandbox_registry_entries", "config_label_kind TEXT"],
		["sandbox_registry_entries", "config_hash TEXT"],
		["sandbox_registry_entries", "cdp_port INTEGER"],
		["sandbox_registry_entries", "no_vnc_port INTEGER"],
		["delivery_queue_entries", "entry_kind TEXT"],
		["delivery_queue_entries", "session_key TEXT"],
		["delivery_queue_entries", "channel TEXT"],
		["delivery_queue_entries", "target TEXT"],
		["delivery_queue_entries", "account_id TEXT"],
		["delivery_queue_entries", "retry_count INTEGER NOT NULL DEFAULT 0"],
		["delivery_queue_entries", "last_attempt_at INTEGER"],
		["delivery_queue_entries", "last_error TEXT"],
		["delivery_queue_entries", "recovery_state TEXT"],
		["delivery_queue_entries", "platform_send_started_at INTEGER"]
	],
	originalMediaRoot: [["managed_outgoing_image_records", "original_media_root TEXT NOT NULL DEFAULT ''"]],
	beforeTaskAttribution: [
		["managed_outgoing_image_records", "agent_id TEXT"],
		["managed_outgoing_image_records", "cleanup_pending INTEGER NOT NULL DEFAULT 0 CHECK (cleanup_pending IN (0, 1))"],
		["current_conversation_bindings", "conversation_kind TEXT NOT NULL DEFAULT 'channel'"],
		["device_bootstrap_tokens", "pending_profile_json TEXT"],
		["gateway_restart_handoff", "restart_trace_started_at INTEGER"],
		["gateway_restart_handoff", "restart_trace_last_at INTEGER"],
		["gateway_restart_intent", "reason TEXT"],
		["gateway_restart_sentinel", "delivery_channel TEXT"],
		["gateway_restart_sentinel", "delivery_to TEXT"],
		["gateway_restart_sentinel", "delivery_account_id TEXT"],
		["gateway_restart_sentinel", "message TEXT"],
		["gateway_restart_sentinel", "continuation_json TEXT"],
		["gateway_restart_sentinel", "doctor_hint TEXT"],
		["gateway_restart_sentinel", "stats_json TEXT"],
		["gateway_boot_lifecycle", "startup_reason TEXT"],
		["official_external_plugin_catalog_snapshots", "trust_mode TEXT"],
		["official_external_plugin_catalog_snapshots", "trust_key_id TEXT"],
		["official_external_plugin_catalog_snapshots", "trust_signature_count INTEGER"],
		["official_external_plugin_catalog_snapshots", "trust_threshold INTEGER"],
		["official_external_plugin_catalog_snapshots", "trust_verified_at TEXT"]
	],
	taskRequester: [["task_runs", "requester_agent_id TEXT"]],
	taskRunDetails: [
		["task_runs", "tool_use_count INTEGER"],
		["task_runs", "last_tool_name TEXT"],
		["task_runs", "detail_json TEXT"]
	],
	workerEnvironments: [
		["worker_environments", "bootstrap_bundle_hash TEXT"],
		["worker_environments", "bootstrap_openclaw_version TEXT"],
		["worker_environments", "bootstrap_protocol_features_json TEXT"],
		["worker_environments", "bootstrap_install_kind TEXT"],
		["worker_environments", "owner_epoch INTEGER NOT NULL DEFAULT 0 CHECK (owner_epoch >= 0)"],
		["worker_environments", "ssh_host_key TEXT"],
		["worker_workspace_pending_results", "staged_result_ref TEXT"],
		["worker_environments", "teardown_terminal_state TEXT CHECK (teardown_terminal_state IN ('destroyed', 'failed'))"]
	]
};
//#endregion
//#region src/acp/event-ledger-bytes.ts
/** Retained UTF-8 text footprint, including the existing fixed allowance per row. */
function estimateAcpSessionRowBytes(params) {
	return Buffer.byteLength(params.sessionId, "utf8") + Buffer.byteLength(params.sessionKey, "utf8") + Buffer.byteLength(params.cwd, "utf8") + 32;
}
function estimateAcpEventRowBytes(params) {
	return Buffer.byteLength(params.sessionId, "utf8") + Buffer.byteLength(params.sessionKey, "utf8") + Buffer.byteLength(params.runId ?? "", "utf8") + Buffer.byteLength(params.updateJson, "utf8") + 32;
}
//#endregion
//#region src/infra/approval-resolution-ref.ts
/** Build the full SHA-256 base64url locator used only when a transport cannot carry the exact id. */
function buildApprovalResolutionRef(params) {
	return createHash("sha256").update(params.approvalKind, "utf8").update("\0", "utf8").update(params.approvalId, "utf8").digest("base64url");
}
//#endregion
//#region src/infra/delivery-queue-sqlite-bound.ts
const COMPLETED_TOMBSTONE_RETENTION_MS = 2592e6;
const BOUNDED_DELIVERY_RECEIPTS_SQL = `
  SELECT * FROM (
    SELECT rowid receipt_rowid, queue_name, id, enqueued_at,
      json_extract(entry_json, '$.completionRetention.idPrefix') id_prefix,
      json_extract(entry_json, '$.completionRetention.maxAgeMs') max_age_ms,
      json_extract(entry_json, '$.completionRetention.maxEntries') max_entries
    FROM delivery_queue_entries WHERE status IN ('completed', 'failed')
      AND recovery_state = 'completed_bounded' AND json_valid(entry_json)
       AND json_type(entry_json, '$.completionRetention') = 'object'
  )
  WHERE typeof(id_prefix) = 'text' AND id_prefix <> ''
    AND substr(id, 1, length(id_prefix)) = id_prefix
    AND typeof(max_age_ms) = 'integer' AND max_age_ms BETWEEN 1 AND 9007199254740991
    AND typeof(max_entries) = 'integer' AND max_entries BETWEEN 1 AND 9007199254740991`;
/** Prunes bounded receipts globally or for one exact producer namespace. */
function pruneDeliveryQueueTombstones(db, now, prefix) {
	const result = db.prepare(`WITH policies AS (
      ${BOUNDED_DELIVERY_RECEIPTS_SQL}
      ${prefix ? "AND queue_name = @queueName AND id_prefix = @idPrefix" : ""}
    ), ranked AS (
      SELECT *, row_number() OVER (PARTITION BY queue_name, id_prefix
        ORDER BY enqueued_at DESC, id DESC) retention_rank FROM policies
    ) DELETE FROM delivery_queue_entries WHERE rowid IN (
      SELECT receipt_rowid FROM ranked
      WHERE enqueued_at < @now - max_age_ms OR retention_rank > max_entries
    )`).run(prefix ? {
		now,
		...prefix
	} : { now });
	const ordinaryPruned = prefix ? false : pruneOrdinaryDeliveryReceipts(db, now);
	return result.changes > 0 || ordinaryPruned;
}
function pruneOrdinaryDeliveryReceipts(db, now) {
	return (executeSqliteQuerySync(db, getNodeSqliteKysely(db).deleteFrom("delivery_queue_entries").where("status", "=", "completed").where("enqueued_at", "<", now - COMPLETED_TOMBSTONE_RETENTION_MS).where((eb) => eb.or([eb("recovery_state", "is", null), eb("recovery_state", "not in", ["completed_permanent", "completed_bounded"])]))).numAffectedRows ?? 0n) > 0n;
}
//#endregion
//#region src/infra/delivery-queue-sqlite.types.ts
/** Parse only the shipped completion-retention shape for one exact producer ID. */
function parseDeliveryQueueCompletionRetention(value, id) {
	if (value === "permanent") return value;
	if (!value || typeof value !== "object" || Array.isArray(value)) return;
	const retention = value;
	const idPrefix = typeof retention.idPrefix === "string" ? retention.idPrefix : "";
	const maxAgeMs = asPositiveSafeInteger(retention.maxAgeMs);
	const maxEntries = asPositiveSafeInteger(retention.maxEntries);
	if (!idPrefix || !id.startsWith(idPrefix) || maxAgeMs === void 0 || maxEntries === void 0) return;
	return {
		idPrefix,
		maxAgeMs,
		maxEntries
	};
}
const finite = (value) => typeof value === "number" && Number.isFinite(value);
/** Recover only authored or shipped producer ownership from a failed entry. */
function inferDeliveryQueueFailureRetention(entry, id, queueName, legacyAmbiguousSendEvidence = false) {
	const explicit = parseDeliveryQueueCompletionRetention(entry.completionRetention, id) ?? parseDeliveryQueueCompletionRetention(entry.failureRetention, id);
	if (explicit) return explicit;
	const fence = asNullableRecord(asNullableRecord(entry.terminalPolicy)?.fence);
	if (fence?.kind === "none") return;
	const fenced = fence?.kind === "permanent" ? "permanent" : parseDeliveryQueueCompletionRetention(fence, id);
	if (fenced) return fenced;
	const durable = queueName === "outbound-preparing-v1" || queueName === "outbound-legacy-preparing-v1" || queueName === "outbound-prepared-migration-v1" || entry.retainOnFailure === true || asNullableRecord(entry.deliveryCompletion) !== null || queueName === "session" && finite(entry.availableAt);
	const ambiguous = legacyAmbiguousSendEvidence && (typeof entry.platformSendAttemptId === "string" && entry.platformSendAttemptId.length > 0 || finite(entry.platformSendStartedAt) || entry.recoveryState === "send_attempt_started" || entry.recoveryState === "unknown_after_send" || queueName === "session" && (finite(entry.deliveryStartedAt) || typeof entry.settlementOutcome === "string" && entry.settlementOutcome.length > 0 || finite(entry.acknowledgedAt)));
	return durable || ambiguous ? "permanent" : void 0;
}
/** Strip a terminal queue row to the producer policy needed for admission. */
function projectDeliveryQueueTerminalEntry(entry, terminalAt, terminal, completionRetention) {
	const retryCount = Number.isSafeInteger(entry.retryCount) && entry.retryCount >= 0 ? entry.retryCount : 0;
	const recoveryState = completionRetention === "permanent" ? "completed_permanent" : completionRetention ? "completed_bounded" : void 0;
	return {
		id: entry.id,
		enqueuedAt: terminalAt,
		retryCount,
		...terminal === "completed" ? { acknowledgedAt: terminalAt } : { failedAt: terminalAt },
		...completionRetention ? { completionRetention } : {},
		...recoveryState ? { recoveryState } : {}
	};
}
//#endregion
//#region src/state/openclaw-state-db-delivery-queue-backfill.ts
function nonNegativeSafeInteger(value) {
	const number = typeof value === "bigint" ? Number(value) : value;
	return typeof number === "number" && Number.isSafeInteger(number) && number >= 0 ? number : void 0;
}
const inferLegacyRetention = (entry, id, queue) => inferDeliveryQueueFailureRetention(entry ?? {}, id, queue, true);
/** Compact every preexisting failed row without inferring replay or owner policy. */
function compactLegacyDeliveryQueueFailures(db) {
	const migrationNow = Date.now();
	const retainPending = db.prepare(`UPDATE delivery_queue_entries SET entry_json = ?
      WHERE queue_name = ? AND id = ? AND status = 'pending' AND entry_json = ?`);
	const select = db.prepare(`SELECT queue_name, id, status, retry_count, entry_json, updated_at, failed_at, recovery_state
       FROM delivery_queue_entries WHERE status IN ('pending', 'failed')`);
	select.setReadBigInts(true);
	const rows = select.all();
	const remove = db.prepare(`DELETE FROM delivery_queue_entries WHERE queue_name = ? AND id = ? AND status = 'failed'`);
	const compact = db.prepare(`UPDATE delivery_queue_entries
        SET entry_kind = NULL, session_key = NULL, channel = NULL, target = NULL,
            account_id = NULL, retry_count = @retryCount, last_attempt_at = NULL,
            last_error = NULL, platform_send_started_at = NULL, entry_json = @entryJson,
            enqueued_at = @failedAt, failed_at = @failedAt, recovery_state = @recoveryState
      WHERE queue_name = @queueName AND id = @id AND status = 'failed'`);
	for (const row of rows) {
		if (row.recovery_state === "settlement_pending") continue;
		const parsedEntry = safeParseJsonRecord(String(row.entry_json));
		const queueName = String(row.queue_name);
		const id = String(row.id);
		if (row.status === "pending") {
			if (parsedEntry?.retainOnFailure !== true && inferLegacyRetention(parsedEntry, id, queueName)) retainPending.run(JSON.stringify({
				...parsedEntry,
				retainOnFailure: true
			}), queueName, id, String(row.entry_json));
			continue;
		}
		const failedAt = nonNegativeSafeInteger(row.failed_at) ?? nonNegativeSafeInteger(row.updated_at) ?? migrationNow;
		const entry = parsedEntry ?? {};
		const retryCount = Math.max(nonNegativeSafeInteger(row.retry_count) ?? 0, nonNegativeSafeInteger(entry.retryCount) ?? 0);
		const retention = parsedEntry ? inferLegacyRetention(entry, id, queueName) : "permanent";
		if (!retention) {
			remove.run(queueName, id);
			continue;
		}
		const failedEntry = projectDeliveryQueueTerminalEntry({
			id,
			retryCount
		}, failedAt, "failed", retention);
		compact.run({
			retryCount,
			entryJson: JSON.stringify(failedEntry),
			failedAt,
			recoveryState: failedEntry.recoveryState ?? null,
			queueName,
			id
		});
	}
	pruneDeliveryQueueTombstones(db, migrationNow);
}
//#endregion
//#region src/state/openclaw-state-schema.ts
const OPENCLAW_STATE_SCHEMA_SQL = process.getBuiltinModule("node:fs").readFileSync(fileURLToPath(new URL("./openclaw-state-schema.sql", import.meta.url)), "utf8");
//#endregion
//#region src/state/openclaw-state-db-operator-approval-migration.ts
function tableSql$1(db) {
	const row = db.prepare("SELECT sql FROM sqlite_master WHERE type = 'table' AND name = 'operator_approvals'").get();
	return typeof row?.sql === "string" ? row.sql : void 0;
}
function hasCanonicalOperatorApprovalKinds(db) {
	if (!tableExists(db, "operator_approvals")) return true;
	return /kind\s+text\s+not\s+null\s+check\s*\(\s*kind\s+in\s*\(\s*'exec'\s*,\s*'plugin'\s*,\s*'system-agent'\s*\)\s*\)/.test(tableSql$1(db)?.toLowerCase() ?? "");
}
function assertCanonicalOperatorApprovalKinds(db, pathname) {
	if (!hasCanonicalOperatorApprovalKinds(db)) throw new SqliteSchemaMismatchError(`OpenClaw state database ${pathname} has a legacy operator approval schema; run openclaw doctor --fix to migrate it.`);
}
function isCanonicalOperatorApprovalKind(value) {
	return value === "exec" || value === "plugin" || value === "system-agent";
}
//#endregion
//#region src/state/openclaw-state-db-legacy-backfills.ts
function ensureOperatorApprovalResolutionRefs(db) {
	if (!tableExists(db, "operator_approvals")) return;
	runSqliteImmediateTransactionSync(db, () => {
		ensureColumn(db, "operator_approvals", "resolution_ref TEXT");
		const rows = db.prepare("SELECT approval_id, kind, resolution_ref FROM operator_approvals").all();
		const update = db.prepare("UPDATE operator_approvals SET resolution_ref = ? WHERE approval_id = ?");
		for (const row of rows) {
			if (typeof row.approval_id !== "string" || !isCanonicalOperatorApprovalKind(row.kind)) throw new Error("operator approval row cannot be assigned a transport reference");
			const resolutionRef = buildApprovalResolutionRef({
				approvalId: row.approval_id,
				approvalKind: row.kind
			});
			if (row.resolution_ref !== resolutionRef) update.run(resolutionRef, row.approval_id);
		}
		if (db.prepare(`SELECT canonical.approval_id
         FROM operator_approvals AS canonical
         JOIN operator_approvals AS referenced
           ON canonical.approval_id = referenced.resolution_ref
         WHERE canonical.approval_id <> referenced.approval_id
         LIMIT 1`).get()) throw new Error("operator approval ids conflict with durable transport references");
		db.exec(`
      CREATE UNIQUE INDEX IF NOT EXISTS idx_operator_approvals_resolution_ref
        ON operator_approvals(resolution_ref);
    `);
	});
}
function nullableTextValue(record, key) {
	if (!record || !Object.hasOwn(record, key)) return;
	const value = record[key];
	return typeof value === "string" || value === null ? value : void 0;
}
/** Promote shipped retained results before runtime hydrates canonical subagent state. */
function repairLegacySubagentRetainedResults(db) {
	if (!tableExists(db, "subagent_runs")) return;
	const repair = () => {
		const hasLegacyPendingPayload = tableHasColumn(db, "subagent_runs", "pending_final_delivery_payload_json");
		const rows = db.prepare(hasLegacyPendingPayload ? "SELECT run_id, payload_json, pending_final_delivery_payload_json FROM subagent_runs" : "SELECT run_id, payload_json FROM subagent_runs").all();
		const updateRun = db.prepare(`UPDATE subagent_runs
          SET payload_json = ?
        WHERE run_id = ?`);
		for (const row of rows) {
			const stored = safeParseJsonRecord(row.payload_json) ?? null;
			const parent = stored ? asNullableRecord(stored.parentCompletion) : null;
			const payload = parent?.completionTarget === "parent" ? parent : stored;
			const completion = payload ? asNullableRecord(payload.completion) : null;
			if (!payload || !completion) continue;
			const delivery = asNullableRecord(payload.delivery);
			const deliveryPayload = delivery ? asNullableRecord(delivery.payload) : null;
			const pendingPayload = row.pending_final_delivery_payload_json ? safeParseJsonRecord(row.pending_final_delivery_payload_json) ?? null : null;
			if (!Boolean(deliveryPayload && (Object.hasOwn(deliveryPayload, "frozenResultText") || Object.hasOwn(deliveryPayload, "fallbackFrozenResultText")) || pendingPayload && (Object.hasOwn(pendingPayload, "frozenResultText") || Object.hasOwn(pendingPayload, "fallbackFrozenResultText")))) continue;
			const legacyPrimary = nullableTextValue(deliveryPayload, "frozenResultText") ?? nullableTextValue(pendingPayload, "frozenResultText");
			const legacyFallback = nullableTextValue(deliveryPayload, "fallbackFrozenResultText") ?? nullableTextValue(pendingPayload, "fallbackFrozenResultText");
			if (nullableTextValue(completion, "resultText") == null && legacyPrimary !== void 0) completion.resultText = legacyPrimary;
			if (nullableTextValue(completion, "fallbackResultText") == null && legacyFallback !== void 0) completion.fallbackResultText = legacyFallback;
			delete deliveryPayload?.frozenResultText;
			delete deliveryPayload?.fallbackFrozenResultText;
			updateRun.run(JSON.stringify(stored), row.run_id);
		}
	};
	if (db.isTransaction) {
		repair();
		return;
	}
	runSqliteImmediateTransactionSync(db, repair);
}
/** Canonicalize shipped subagent rows whose pause/kill owner only wrote root terminal fields. */
function repairLegacySubagentExecutionPayloads(db) {
	if (!tableExists(db, "subagent_runs")) return;
	db.exec(`
    UPDATE subagent_runs
    SET payload_json = json_remove(
      CASE
        WHEN json_extract(payload_json, '$.pauseReason') = 'sessions_yield'
          AND json_extract(payload_json, '$.execution.status') <> 'terminal'
          AND json_type(payload_json, '$.endedAt') IN ('integer', 'real')
        THEN json_remove(json_set(
          payload_json,
          '$.execution.status', 'terminal',
          '$.execution.endedAt', json_extract(payload_json, '$.endedAt')
        ), '$.execution.outcome')
        WHEN (json_type(payload_json, '$.killReconciliation') = 'object'
          OR json_extract(payload_json, '$.endedReason') = 'subagent-killed')
          AND json_extract(payload_json, '$.execution.status') <> 'terminal'
          AND json_type(payload_json, '$.endedAt') IN ('integer', 'real')
          AND json_type(payload_json, '$.outcome') = 'object'
        THEN json_set(
          payload_json,
          '$.execution.status', 'terminal',
          '$.execution.endedAt', json_extract(payload_json, '$.endedAt'),
          '$.execution.outcome', json_extract(payload_json, '$.outcome')
        )
        ELSE payload_json
      END,
      '$.startedAt', '$.endedAt', '$.outcome'
    )
    WHERE json_valid(payload_json)
      AND (json_type(payload_json, '$.startedAt') IS NOT NULL
        OR json_type(payload_json, '$.endedAt') IS NOT NULL
        OR json_type(payload_json, '$.outcome') IS NOT NULL);
  `);
}
/** Canonicalize the shipped suspension reason before runtime hydrates subagent state. */
function repairLegacySubagentSuspensionReasons(db) {
	if (!tableExists(db, "subagent_runs")) return;
	db.exec(`
    UPDATE subagent_runs
    SET payload_json = json_set(payload_json, '$.delivery.suspendedReason', 'permanent_failure')
    WHERE json_valid(payload_json)
      AND json_extract(payload_json, '$.delivery.suspendedReason') = 'retry-limit';
  `);
}
function backfillAcpReplayEstimatedBytes(db) {
	if (!tableExists(db, "acp_replay_events") || !tableHasColumn(db, "acp_replay_events", "estimated_bytes")) return;
	const replayDb = getNodeSqliteKysely(db);
	const updateEvent = db.prepare("UPDATE acp_replay_events SET estimated_bytes = ? WHERE session_id = ? AND seq = ?");
	for (const row of iterateSqliteQuerySync(db, replayDb.selectFrom("acp_replay_events").select([
		"session_id",
		"seq",
		"session_key",
		"run_id",
		"update_json",
		"estimated_bytes"
	]))) {
		const expected = estimateAcpEventRowBytes({
			sessionId: row.session_id,
			sessionKey: row.session_key,
			runId: row.run_id,
			updateJson: row.update_json
		});
		if (coerceRequiredSqliteNumber(row.estimated_bytes) !== expected) updateEvent.run(expected, row.session_id, row.seq);
	}
	const updateSession = db.prepare("UPDATE acp_replay_sessions SET estimated_bytes = ? WHERE session_id = ?");
	for (const row of iterateSqliteQuerySync(db, replayDb.selectFrom("acp_replay_sessions as s").select([
		"s.session_id",
		"s.session_key",
		"s.cwd",
		"s.estimated_bytes"
	]).select((eb) => eb.fn.coalesce(eb.selectFrom("acp_replay_events as e").select((events) => events.fn.sum("e.estimated_bytes").as("total")).whereRef("e.session_id", "=", "s.session_id"), eb.val(0)).as("event_bytes")))) {
		const expected = estimateAcpSessionRowBytes({
			sessionId: row.session_id,
			sessionKey: row.session_key,
			cwd: row.cwd
		}) + coerceRequiredSqliteNumber(row.event_bytes);
		if (coerceRequiredSqliteNumber(row.estimated_bytes) !== expected) updateSession.run(expected, row.session_id);
	}
}
function backfillCronRunLogEntryJson(db) {
	if (!tableExists(db, "cron_run_logs") || !tableHasColumn(db, "cron_run_logs", "entry_json")) return;
	const rows = db.prepare(`SELECT store_key, job_id, seq, ts
         FROM cron_run_logs
        WHERE entry_json = '{}'`).all();
	if (rows.length === 0) return;
	const update = db.prepare(`UPDATE cron_run_logs
        SET entry_json = ?
      WHERE store_key = ? AND job_id = ? AND seq = ?`);
	for (const row of rows) update.run(JSON.stringify({
		ts: coerceRequiredSqliteNumber(row.ts),
		jobId: row.job_id,
		action: "finished"
	}), row.store_key, row.job_id, row.seq);
}
function textField(record, key) {
	const value = record[key];
	return typeof value === "string" && value.trim() ? value : null;
}
function backfillCronJobsFromJobJson(db) {
	if (!tableExists(db, "cron_jobs") || !tableHasColumn(db, "cron_jobs", "job_json") || !tableHasColumn(db, "cron_jobs", "payload_kind")) return;
	const rows = db.prepare(`SELECT store_key, job_id, job_json, updated_at
         FROM cron_jobs
        WHERE payload_kind = 'message'
           OR name = ''`).all();
	if (rows.length === 0) return;
	const update = db.prepare(`UPDATE cron_jobs
        SET name = ?,
            enabled = ?,
            agent_id = ?,
            payload_kind = ?,
            runtime_updated_at_ms = ?
      WHERE store_key = ?
        AND job_id = ?`);
	for (const row of rows) {
		const job = safeParseJsonRecord(row.job_json) ?? null;
		if (!job) continue;
		const schedule = asNullableRecord(job.schedule);
		const payload = asNullableRecord(job.payload);
		const scheduleKind = textField(schedule ?? {}, "kind");
		const payloadKind = textField(payload ?? {}, "kind");
		const isAt = scheduleKind === "at" && textField(schedule ?? {}, "at");
		const isEvery = scheduleKind === "every" && asFiniteNumber((schedule ?? {}).everyMs) != null;
		const isCron = scheduleKind === "cron" && textField(schedule ?? {}, "expr");
		const isSystemEvent = payloadKind === "systemEvent" && textField(payload ?? {}, "text");
		const isAgentTurn = payloadKind === "agentTurn" && textField(payload ?? {}, "message");
		if (!schedule || !payload || !isAt && !isEvery && !isCron || !isSystemEvent && !isAgentTurn) continue;
		update.run(textField(job, "name") ?? row.job_id, job.enabled === false ? 0 : 1, textField(job, "agentId"), payloadKind, asFiniteNumber(job.updatedAtMs) ?? (coerceRequiredSqliteNumber(row.updated_at) || 0), row.store_key, row.job_id);
	}
}
function backfillDeliveryQueueEntriesFromEntryJson(db) {
	if (!tableExists(db, "delivery_queue_entries") || !tableHasColumn(db, "delivery_queue_entries", "entry_json") || !tableHasColumn(db, "delivery_queue_entries", "retry_count")) return;
	compactLegacyDeliveryQueueFailures(db);
	const rows = db.prepare(`SELECT queue_name, id, entry_json
         FROM delivery_queue_entries
        WHERE status = 'pending'
          AND (retry_count = 0
            OR last_attempt_at IS NULL
            OR last_error IS NULL
            OR recovery_state IS NULL
            OR platform_send_started_at IS NULL
            OR entry_kind IS NULL
            OR session_key IS NULL
            OR channel IS NULL
            OR target IS NULL
            OR account_id IS NULL)`).all();
	if (rows.length === 0) return;
	const update = db.prepare(`UPDATE delivery_queue_entries
        SET entry_kind = COALESCE(?, entry_kind),
            session_key = COALESCE(?, session_key),
            channel = COALESCE(?, channel),
            target = COALESCE(?, target),
            account_id = COALESCE(?, account_id),
            retry_count = ?,
            last_attempt_at = COALESCE(?, last_attempt_at),
            last_error = COALESCE(?, last_error),
            recovery_state = COALESCE(?, recovery_state),
            platform_send_started_at = COALESCE(?, platform_send_started_at)
      WHERE queue_name = ?
        AND id = ?`);
	for (const row of rows) {
		const entry = safeParseJsonRecord(row.entry_json) ?? null;
		if (!entry) continue;
		const session = asNullableRecord(entry.session);
		const route = asNullableRecord(entry.route);
		const deliveryContext = asNullableRecord(entry.deliveryContext);
		update.run(textField(entry, "kind"), textField(entry, "sessionKey") ?? (session ? textField(session, "key") : null), textField(entry, "channel") ?? (route ? textField(route, "channel") : null) ?? (deliveryContext ? textField(deliveryContext, "channel") : null), textField(entry, "to") ?? (route ? textField(route, "to") : null) ?? (deliveryContext ? textField(deliveryContext, "to") : null), textField(entry, "accountId") ?? (route ? textField(route, "accountId") : null) ?? (deliveryContext ? textField(deliveryContext, "accountId") : null), asSafeIntegerInRange(entry.retryCount, { min: 0 }) ?? 0, asSafeIntegerInRange(entry.lastAttemptAt, { min: 0 }) ?? null, textField(entry, "lastError"), textField(entry, "recoveryState"), asSafeIntegerInRange(entry.platformSendStartedAt, { min: 0 }) ?? null, row.queue_name, row.id);
	}
}
//#endregion
//#region src/state/openclaw-state-db-schema-v13-widerow.ts
const FAILURE_DESTINATION_COLUMNS = [
	["failure_delivery_mode", "mode"],
	["failure_delivery_channel", "channel"],
	["failure_delivery_to", "to"],
	["failure_delivery_account_id", "accountId"]
];
function reprojectLegacyCronJson(db) {
	const projectionColumns = FAILURE_DESTINATION_COLUMNS.map(([columnName]) => tableHasColumn(db, "cron_jobs", columnName) ? quoteSqliteIdentifier(columnName) : `NULL AS ${quoteSqliteIdentifier(columnName)}`);
	const lastRunStatus = tableHasColumn(db, "cron_jobs", "last_run_status") ? "last_run_status" : "NULL AS last_run_status";
	const rows = db.prepare(`SELECT store_key, job_id, enabled, job_json, state_json, ${lastRunStatus}, ${projectionColumns.join(", ")}
         FROM cron_jobs`).all();
	const update = db.prepare("UPDATE cron_jobs SET job_json = ?, state_json = ? WHERE store_key = ? AND job_id = ?");
	for (const row of rows) {
		if (typeof row.store_key !== "string" || typeof row.job_id !== "string" || typeof row.job_json !== "string" || typeof row.state_json !== "string") throw new Error("OpenClaw v12 cron job row is not canonical");
		const job = asNullableRecord(safeParseJson(row.job_json));
		const state = asNullableRecord(safeParseJson(row.state_json));
		if (!job || !state) continue;
		let changed = false;
		const delivery = asNullableRecord(job.delivery);
		const destination = asNullableRecord(delivery?.failureDestination);
		if ((!Object.hasOwn(job, "delivery") || delivery !== null) && (!delivery || !Object.hasOwn(delivery, "failureDestination") || destination !== null)) {
			const nextDelivery = delivery ?? {};
			const nextDestination = destination ?? {};
			for (const [columnName, fieldName] of FAILURE_DESTINATION_COLUMNS) {
				const value = row[columnName];
				if (typeof value !== "string" || Object.hasOwn(nextDestination, fieldName)) continue;
				nextDestination[fieldName] = value === "" ? null : value;
				changed = true;
			}
			if (changed) {
				nextDelivery.failureDestination = nextDestination;
				job.delivery = nextDelivery;
			}
		}
		if (typeof job.enabled !== "boolean") {
			job.enabled = row.enabled !== 0;
			changed = true;
		}
		const hasLegacyStatus = Object.hasOwn(state, "lastStatus");
		if (!Object.hasOwn(state, "lastRunStatus") && (hasLegacyStatus || typeof row.last_run_status === "string")) {
			state.lastRunStatus = hasLegacyStatus ? state.lastStatus : row.last_run_status;
			changed = true;
		}
		if (changed) update.run(JSON.stringify(job), JSON.stringify(state), row.store_key, row.job_id);
	}
}
function rebuildJsonCanonicalTable(db, tableName) {
	const migrationTable = `${tableName}_migration_v13`;
	if (tableExists(db, migrationTable)) throw new Error(`OpenClaw v13 migration table already exists: ${migrationTable}`);
	const migrationSchema = extractSqliteTableSchema(OPENCLAW_STATE_SCHEMA_SQL, tableName, { errorMessage: `Canonical ${tableName} schema block is missing` }).replace(`CREATE TABLE IF NOT EXISTS ${tableName} (`, `CREATE TABLE ${migrationTable} (`);
	db.exec(migrationSchema);
	const columns = db.prepare(`PRAGMA table_xinfo(${migrationTable})`).all().flatMap((column) => column.hidden === 0 && typeof column.name === "string" ? [column.name] : []);
	const projection = columns.map((columnName) => {
		return CLAW_LAZY_ADDITIVE_STATE_COLUMN_DEFINITIONS.some((column) => column.tableName === tableName && column.columnName === columnName) && !tableHasColumn(db, tableName, columnName) ? "NULL" : quoteSqliteIdentifier(columnName);
	});
	db.exec(`INSERT INTO ${migrationTable} (${columns.map(quoteSqliteIdentifier).join(", ")}) SELECT ${projection.join(", ")} FROM ${tableName};`);
	db.exec(`DROP TABLE ${tableName};`);
	db.exec(`ALTER TABLE ${migrationTable} RENAME TO ${tableName};`);
}
/** Fold obsolete physical projections into canonical JSON before removing their columns. */
function migrateJsonCanonicalWideRowsV13(db, previousVersion) {
	if (previousVersion >= 13) return false;
	let migrated = false;
	if (tableExists(db, "cron_jobs") && tableHasColumn(db, "cron_jobs", "schedule_kind")) {
		reprojectLegacyCronJson(db);
		rebuildJsonCanonicalTable(db, "cron_jobs");
		migrated = true;
	}
	const hasSetupState = tableExists(db, "workspace_setup_state");
	const hasAttestations = tableExists(db, "workspace_attestations");
	if (hasSetupState && !tableHasColumn(db, "workspace_setup_state", "attested_at_ms")) {
		db.exec("ALTER TABLE workspace_setup_state ADD COLUMN attested_at_ms INTEGER;");
		db.exec("ALTER TABLE workspace_setup_state ADD COLUMN attestation_updated_at_ms INTEGER;");
		rebuildJsonCanonicalTable(db, "workspace_setup_state");
		migrated = true;
	}
	if (hasAttestations) {
		db.exec(`
      UPDATE workspace_setup_state
         SET attested_at_ms = (
               SELECT attested_at_ms FROM workspace_attestations
                WHERE workspace_attestations.workspace_key = workspace_setup_state.workspace_key
             ),
             attestation_updated_at_ms = (
               SELECT updated_at_ms FROM workspace_attestations
                WHERE workspace_attestations.workspace_key = workspace_setup_state.workspace_key
             )
       WHERE workspace_key IN (SELECT workspace_key FROM workspace_attestations);
    `);
		const workspacePath = tableExists(db, "workspace_path_aliases") ? `(SELECT alias.workspace_path FROM workspace_path_aliases alias
           WHERE alias.workspace_key = a.workspace_key LIMIT 1)` : "NULL";
		db.exec(`
      INSERT INTO workspace_setup_state (
        workspace_key, workspace_path, attested_at_ms, attestation_updated_at_ms
      )
      SELECT a.workspace_key,
             ${workspacePath},
             a.attested_at_ms,
             a.updated_at_ms
        FROM workspace_attestations a
       WHERE a.workspace_key NOT IN (SELECT workspace_key FROM workspace_setup_state);
    `);
		db.exec("DROP TABLE workspace_attestations;");
		migrated = true;
	}
	if ((hasSetupState || hasAttestations) && tableExists(db, "workspace_generated_bootstrap_hashes")) {
		rebuildJsonCanonicalTable(db, "workspace_generated_bootstrap_hashes");
		db.exec(`
      DELETE FROM workspace_generated_bootstrap_hashes
       WHERE workspace_key NOT IN (SELECT workspace_key FROM workspace_setup_state);
    `);
	}
	for (const [tableName, jsonColumn, stateKey] of [[
		"auth_profile_stores",
		"store_json",
		"authProfiles.store"
	], [
		"auth_profile_state",
		"state_json",
		"authProfiles.state"
	]]) {
		if (!tableExists(db, tableName)) continue;
		db.prepare(`INSERT INTO config_machine_state (state_key, value_json, updated_at_ms)
       SELECT ?, ${jsonColumn}, updated_at FROM ${tableName} WHERE store_key = 'shared'
       ON CONFLICT(state_key) DO NOTHING`).run(stateKey);
		db.exec(`DROP TABLE ${tableName};`);
		migrated = true;
	}
	if (tableExists(db, "installed_plugin_index")) {
		const workspaceDirColumn = tableHasColumn(db, "installed_plugin_index", "workspace_dir") ? "workspace_dir" : "NULL AS workspace_dir";
		const rawRow = db.prepare(`SELECT version, warning, host_contract_version, compat_registry_version,
                migration_version, policy_hash, generated_at_ms, ${workspaceDirColumn},
                refresh_reason, install_records_json, plugins_json, diagnostics_json,
                updated_at_ms
           FROM installed_plugin_index
          WHERE index_key = 'installed-plugin-index'`).get();
		const installRecords = asNullableRecord(safeParseJson(String(rawRow?.install_records_json ?? "")));
		const plugins = safeParseJson(String(rawRow?.plugins_json ?? ""));
		const diagnostics = safeParseJson(String(rawRow?.diagnostics_json ?? ""));
		const row = rawRow && installRecords && Array.isArray(plugins) && Array.isArray(diagnostics) ? rawRow : void 0;
		if (row) {
			const index = {
				version: Number(row.version),
				...typeof row.warning === "string" && row.warning ? { warning: row.warning } : {},
				hostContractVersion: row.host_contract_version,
				compatRegistryVersion: row.compat_registry_version,
				migrationVersion: Number(row.migration_version),
				policyHash: row.policy_hash,
				generatedAtMs: Number(row.generated_at_ms),
				...typeof row.workspace_dir === "string" ? { workspaceDir: row.workspace_dir } : {},
				...typeof row.refresh_reason === "string" && row.refresh_reason ? { refreshReason: row.refresh_reason } : {},
				installRecords,
				plugins,
				diagnostics
			};
			db.prepare(`INSERT INTO config_machine_state (state_key, value_json, updated_at_ms)
         VALUES (?, ?, ?) ON CONFLICT(state_key) DO NOTHING`).run("plugins.installedIndex", JSON.stringify({
				revision: Number(row.updated_at_ms),
				index
			}), Number(row.updated_at_ms));
		}
		db.exec("DROP TABLE installed_plugin_index;");
		migrated = true;
	}
	if (tableExists(db, "subagent_runs") && tableHasColumn(db, "subagent_runs", "task")) {
		repairLegacySubagentRetainedResults(db);
		rebuildJsonCanonicalTable(db, "subagent_runs");
		migrated = true;
	}
	return migrated;
}
//#endregion
//#region src/infra/sqlite-files.ts
/** SQLite main database plus every journal-mode sidecar that can contain database pages. */
const SQLITE_DATABASE_FILE_SUFFIXES = [
	"",
	"-wal",
	"-shm",
	"-journal"
];
SQLITE_DATABASE_FILE_SUFFIXES.slice(1);
const SQLITE_WAL_HEADER_BYTES = 32;
Buffer.from([
	0,
	5,
	22,
	7
]);
const sqliteFilesLog = createSubsystemLogger("state/sqlite");
var SqliteOrphanedSidecarsError = class extends Error {
	constructor(pathname, sidecarPaths, cause) {
		super(`SQLite database is missing at ${pathname}, and orphaned sidecars could not be copied: ${sidecarPaths.join(", ")}. Refusing to open because SQLite could delete orphan WAL or journal state. Preserve the sidecar bytes, restore the main database, and pair it with the matching sidecar before retrying.`, { cause });
		this.name = "SqliteOrphanedSidecarsError";
	}
};
/** Resolves the main database and all possible journal-mode sidecar paths. */
function resolveSqliteDatabaseFilePaths(pathname) {
	return SQLITE_DATABASE_FILE_SUFFIXES.map((suffix) => `${pathname}${suffix}`);
}
function findMatchingOrphanedSidecarCopy(sourcePath, sourceSize) {
	const directory = path.dirname(sourcePath);
	const prefix = `${path.basename(sourcePath)}.orphaned-`;
	const candidates = fs$1.readdirSync(directory, { withFileTypes: true }).filter((entry) => entry.isFile() && entry.name.startsWith(prefix)).map((entry) => path.join(directory, entry.name)).filter((candidate) => fs$1.statSync(candidate).size === sourceSize);
	if (candidates.length === 0) return;
	const sourceHash = sha256FileSync$1(sourcePath);
	for (const candidate of candidates) if (sha256FileSync$1(candidate) === sourceHash) return candidate;
}
function copyOrphanedSidecar(sourcePath, epochMs) {
	const basePath = `${sourcePath}.orphaned-${epochMs}`;
	for (let suffix = 0;; suffix += 1) {
		const candidate = suffix === 0 ? basePath : `${basePath}-${suffix}`;
		try {
			fs$1.copyFileSync(sourcePath, candidate, fs$1.constants.COPYFILE_EXCL);
			return candidate;
		} catch (error) {
			if (error.code !== "EEXIST") throw error;
		}
	}
}
/** Preserve durable orphan sidecars before SQLite creates a replacement main database. */
function quarantineOrphanedSqliteSidecars(pathname) {
	if (fs$1.existsSync(pathname)) return;
	const sidecars = [{
		path: `${pathname}-wal`,
		minimumBytes: SQLITE_WAL_HEADER_BYTES
	}, {
		path: `${pathname}-journal`,
		minimumBytes: 0
	}].flatMap((sidecar) => {
		const stat = fs$1.statSync(sidecar.path, { throwIfNoEntry: false });
		return stat?.isFile() === true && stat.size > sidecar.minimumBytes ? [{
			path: sidecar.path,
			size: stat.size
		}] : [];
	});
	if (sidecars.length === 0) return;
	const epochMs = Date.now();
	const copied = [];
	try {
		for (const sidecar of sidecars) {
			if (findMatchingOrphanedSidecarCopy(sidecar.path, sidecar.size)) continue;
			const quarantinePath = copyOrphanedSidecar(sidecar.path, epochMs);
			copied.push({
				quarantinePath,
				sourcePath: sidecar.path
			});
		}
	} catch (error) {
		throw new SqliteOrphanedSidecarsError(pathname, sidecars.map((sidecar) => sidecar.path), error);
	}
	if (copied.length === 0) return;
	const copies = copied.map(({ sourcePath, quarantinePath }) => `${sourcePath} -> ${quarantinePath}`);
	sqliteFilesLog.warn(`SQLite database is missing at ${pathname}; copied orphaned sidecars: ${copies.join(", ")}. Committed frames could not be applied because the main database is missing. The bytes are preserved. Recovery requires restoring the main database and pairing it with the quarantined file.`, {
		databasePath: pathname,
		copiedSidecars: copied
	});
}
//#endregion
//#region src/state/openclaw-state-ownership.ts
const STATE_SUPERVISION_KEY = "gateway.supervision";
const MAX_OWNERSHIP_TIMESTAMP_MS = 864e13;
const MANAGER_ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/u;
function isOpenClawStateWriteContentionError(error) {
	return error instanceof GatewayStateOwnerContentionError || error instanceof StateSchemaMutationConflictError || isSqliteLockError(error);
}
function parseExternalOwnership(valueJson, databasePath) {
	let value;
	try {
		value = JSON.parse(valueJson);
	} catch {
		throw new OpenClawStateOwnershipMetadataError(databasePath, "reserved value is not valid JSON");
	}
	const record = isRecord(value) ? value : void 0;
	const keys = record ? Object.keys(record).toSorted().join(",") : "";
	const managerId = record?.managerId;
	const claimedAt = record?.claimedAt;
	if (keys !== "claimedAt,managerId,mode,version" || record?.version !== 1 || record?.mode !== "external" || typeof managerId !== "string" || !MANAGER_ID_PATTERN.test(managerId) || typeof claimedAt !== "number" || !Number.isSafeInteger(claimedAt) || claimedAt < 0 || claimedAt > MAX_OWNERSHIP_TIMESTAMP_MS) throw new OpenClawStateOwnershipMetadataError(databasePath, "reserved value does not match the version 1 external ownership contract");
	return {
		version: 1,
		mode: "external",
		managerId,
		claimedAt
	};
}
/** Inspect the reserved ownership row without entering the shared-state lifecycle. */
function inspectOpenClawStateOwnershipFromDatabase(database, databasePath, configMachineStateTableReady = false) {
	try {
		if (!configMachineStateTableReady && !tableExists(database, "config_machine_state")) return null;
		const ownershipSql = configMachineStateTableReady ? "SELECT value_json FROM config_machine_state WHERE state_key = ? LIMIT 1" : "SELECT value_json FROM config_machine_state NOT INDEXED WHERE state_key = ? LIMIT 1";
		const row = database.prepare(ownershipSql).get(STATE_SUPERVISION_KEY);
		if (!row) return null;
		if (typeof row.value_json !== "string") throw new OpenClawStateOwnershipMetadataError(databasePath, "reserved value is not text");
		return parseExternalOwnership(row.value_json, databasePath);
	} catch (error) {
		throw normalizeOpenClawStateSchemaReadError(error, databasePath);
	}
}
function assertOwnershipAllowsWrite(status, databasePath, env) {
	if (status && !isGatewayExternallySupervised(env)) throw new OpenClawStateExternalOwnershipError(databasePath, status.managerId);
}
/** Fence shared-state writes once an external manager has claimed ownership. */
function assertOpenClawStateWriteAllowed(options) {
	const resolvedPath = path.resolve(options.databasePath);
	assertStateDatabaseAccessAllowed(resolvedPath);
	assertOwnershipAllowsWrite(inspectOpenClawStateOwnershipFromDatabase(options.database, resolvedPath, options.schemaReady), resolvedPath, options.env ?? process.env);
}
//#endregion
//#region src/state/openclaw-state-schema-compatibility.ts
const CLAW_LAZY_ADDITIVE_STATE_COLUMNS = CLAW_LAZY_ADDITIVE_STATE_COLUMN_DEFINITIONS.map(({ columnName, tableName }) => `${tableName}.${columnName}`);
const CLAW_FIRST_USE_ADDITIVE_STATE_COLUMNS = CLAW_FIRST_USE_ADDITIVE_STATE_COLUMN_DEFINITIONS.map(({ columnName, tableName }) => `${tableName}.${columnName}`);
new Set(CLAW_FIRST_USE_ADDITIVE_STATE_COLUMNS);
const CLAW_STARTUP_ADDITIVE_STATE_COLUMN_SET = /* @__PURE__ */ new Set([...CLAW_STARTUP_ADDITIVE_STATE_COLUMN_DEFINITIONS.map(({ columnName, tableName }) => `${tableName}.${columnName}`), ...Object.values(ORDERED_STARTUP_ADDITIVE_STATE_COLUMNS).flat().map(([tableName, definition]) => `${tableName}.${definition.split(" ", 1)[0]}`)]);
const CLAW_STARTUP_ADDITIVE_STATE_TABLES = ["worker_session_tool_operations", "worker_turn_tool_authorities"];
const CLAW_STARTUP_ADDITIVE_STATE_TABLE_SET = new Set(CLAW_STARTUP_ADDITIVE_STATE_TABLES);
const CLAW_READONLY_OPTIONAL_STATE_INDEXES = [
	"idx_operator_approvals_source_run_resolved",
	"idx_task_runs_requester_session_key",
	"idx_worker_session_placements_environment"
];
let openClawStateCanonicalNamedIndexSet;
function getOpenClawStateCanonicalNamedIndexSet() {
	openClawStateCanonicalNamedIndexSet ??= new Set(getCanonicalSqliteNamedIndexContracts(OPENCLAW_STATE_SCHEMA_SQL).map((index) => index.name));
	return openClawStateCanonicalNamedIndexSet;
}
const runtimeSchemaCache = /* @__PURE__ */ new Map();
/** Project canonical SQL to the tables the shared runtime may create during this open. */
function getOpenClawStateRuntimeSchema(options) {
	const { includeVersionLazyAdditiveTables, includeAgentDeletionJournal = true } = options;
	const key = `${includeVersionLazyAdditiveTables}:${includeAgentDeletionJournal}`;
	const cached = runtimeSchemaCache.get(key);
	if (cached !== void 0) return cached;
	let schema = OPENCLAW_STATE_SCHEMA_SQL;
	const omittedTables = [...includeVersionLazyAdditiveTables ? FIRST_USE_STATE_TABLES : LAZY_ADDITIVE_STATE_TABLES, ...includeAgentDeletionJournal ? [] : DOCTOR_OWNED_STATE_TABLES];
	const omittedIndexes = includeVersionLazyAdditiveTables ? FIRST_USE_STATE_INDEXES : LAZY_ADDITIVE_STATE_INDEXES;
	for (const tableName of omittedTables) {
		const start = schema.indexOf(`CREATE TABLE IF NOT EXISTS ${tableName} (`);
		const end = start >= 0 ? schema.indexOf("\n) STRICT;", start) : -1;
		if (start < 0 || end < 0) throw new Error(`lazy additive state schema block is missing for ${tableName}`);
		schema = `${schema.slice(0, start)}${schema.slice(end + 10)}`;
	}
	for (const indexName of omittedIndexes) {
		const plainStart = schema.indexOf(`CREATE INDEX IF NOT EXISTS ${indexName}`);
		const uniqueStart = schema.indexOf(`CREATE UNIQUE INDEX IF NOT EXISTS ${indexName}`);
		const start = plainStart >= 0 ? plainStart : uniqueStart;
		const end = start >= 0 ? schema.indexOf(";", start) : -1;
		if (start < 0 || end < 0) throw new Error(`lazy additive state schema index is missing for ${indexName}`);
		schema = `${schema.slice(0, start)}${schema.slice(end + 1)}`;
	}
	runtimeSchemaCache.set(key, schema);
	return schema;
}
const STATE_PERSISTENT_SCHEMA_COMPATIBILITY = {
	allowCompatibleAdditiveColumns: true,
	allowedMissingTables: DOCTOR_OWNED_STATE_TABLES,
	allowedMissingColumns: CLAW_FIRST_USE_ADDITIVE_STATE_COLUMNS,
	allowedColumnDefinitions: {
		"diagnostic_events.sequence": ["sequence INTEGER NOT NULL DEFAULT 0"],
		"claw_package_refs.package_integrity": ["package_integrity TEXT NOT NULL DEFAULT 'sha256:0000000000000000000000000000000000000000000000000000000000000000'"],
		"claw_package_refs.updated_at_ms": ["updated_at_ms INTEGER NOT NULL DEFAULT 0"],
		"cron_jobs.enabled": ["enabled INTEGER NOT NULL DEFAULT 1"],
		"cron_jobs.name": ["name TEXT NOT NULL DEFAULT ''"],
		"cron_jobs.payload_kind": ["payload_kind TEXT NOT NULL DEFAULT 'message'"],
		"current_conversation_bindings.conversation_kind": ["conversation_kind TEXT NOT NULL DEFAULT 'channel'"],
		"operator_approvals.resolution_ref": ["resolution_ref TEXT"],
		"worker_environments.desktop_json": ["desktop_json TEXT"],
		"worker_environments.bootstrap_install_kind": ["bootstrap_install_kind TEXT"],
		"worker_environments.shared_host": ["shared_host INTEGER CHECK (shared_host IN (0, 1))"],
		"worker_environments.node_setup_id": ["node_setup_id TEXT"],
		"worker_environments.node_device_id": ["node_device_id TEXT"],
		"worker_session_placements.terminal_reason": ["terminal_reason TEXT"],
		"worker_session_placements.terminal_at_ms": ["terminal_at_ms INTEGER"]
	}
};
const OPENCLAW_STATE_MAINTENANCE_SCHEMA_COMPATIBILITY = {
	...STATE_PERSISTENT_SCHEMA_COMPATIBILITY,
	allowedMissingTables: [
		...LAZY_ADDITIVE_STATE_TABLES,
		...CLAW_STARTUP_ADDITIVE_STATE_TABLES,
		...DOCTOR_OWNED_STATE_TABLES
	],
	allowedMissingIndexes: CLAW_READONLY_OPTIONAL_STATE_INDEXES,
	allowedMissingColumns: CLAW_LAZY_ADDITIVE_STATE_COLUMNS
};
/** Identify schema differences that the writable shared-state cold open repairs. */
function isOpenClawStateStartupRepairableSchemaIssue(issue) {
	if (issue.code === "missing-table") return CLAW_STARTUP_ADDITIVE_STATE_TABLE_SET.has(issue.objectName);
	if (issue.code === "missing-column") return CLAW_STARTUP_ADDITIVE_STATE_COLUMN_SET.has(issue.objectName);
	return issue.code === "missing-or-drifted-index" && getOpenClawStateCanonicalNamedIndexSet().has(issue.objectName);
}
//#endregion
//#region src/infra/update-run-timeouts.ts
/** Shared legacy-reader grace and inactive update reconciliation threshold. */
const ABANDONED_UPDATE_RUN_MS = 18e5;
//#endregion
//#region src/state/openclaw-state-schema-publication.ts
const TERMINAL_GRACE_MS = 3e5;
/** Only the 2026.9.2 release line reopens the ledger without the transaction fence. */
function isUnfencedUpdateDriver(version) {
	const parsed = typeof version === "string" ? parse(version) : null;
	return parsed !== null && `${parsed.major}.${parsed.minor}.${parsed.patch}` === "2026.9.2";
}
/** Every unfenced driver must clear its own deadline; a newer run cannot hide an older one. */
function readStateSchemaPublicationBlocker(db, nowMs = Date.now()) {
	if (!tableExists(db, "update_runs")) return;
	const rows = executeSqliteQuerySync(db, getNodeSqliteKysely(db).selectFrom("update_runs").select([
		"run_id",
		"before_json",
		"status",
		"updated_at_ms",
		"finished_at_ms"
	]).where((eb) => eb.or([eb.and([eb("status", "=", "running"), eb("updated_at_ms", ">=", nowMs - ABANDONED_UPDATE_RUN_MS)]), eb.and([eb("status", "!=", "running"), eb.or([eb("finished_at_ms", ">", nowMs - TERMINAL_GRACE_MS), eb("finished_at_ms", "is", null)])])])).orderBy("run_id")).rows;
	let blocker;
	for (const row of rows) {
		const before = JSON.parse(row.before_json);
		if (!isRecord(before) || typeof before.version !== "string" || !isUnfencedUpdateDriver(before.version)) continue;
		const deadline = row.status === "running" ? row.updated_at_ms + ABANDONED_UPDATE_RUN_MS + 1 : row.finished_at_ms === null ? null : row.finished_at_ms + TERMINAL_GRACE_MS;
		if (!blocker || deadline === null || blocker.publishAfterMs !== null && deadline > blocker.publishAfterMs) blocker = {
			runId: row.run_id,
			updaterVersion: before.version,
			publishAfterMs: deadline
		};
	}
	return blocker;
}
/** Called inside the schema write transaction, after all content migrations succeed. */
function resolveStateSchemaVersionToPublish(db) {
	const published = readSqliteUserVersion(db);
	if (published >= 19 || !readStateSchemaPublicationBlocker(db)) return 19;
	if (!tableExists(db, "config_machine_state")) throw new Error("Shared state schema publication cannot be deferred without config_machine_state.");
	executeSqliteQuerySync(db, getNodeSqliteKysely(db).insertInto("config_machine_state").values({
		state_key: CONTENT_VERSION_KEY,
		value_json: String(19),
		updated_at_ms: Date.now()
	}).onConflict((conflict) => conflict.column("state_key").doUpdateSet({
		value_json: String(19),
		updated_at_ms: Date.now()
	}).where("config_machine_state.value_json", "!=", String(19))));
	invalidateSqliteSchemaFacts(db);
	return published;
}
//#endregion
//#region src/state/openclaw-update-schema-refusal.ts
/** An unfenced updater needs a manual update when safe publication deferral is unavailable. */
var UpdateSchemaRefusalError = class extends Error {
	constructor(databases, updaterVersion, options) {
		const { targetVersion } = options;
		const commands = options.recovery?.commands ?? [
			"openclaw gateway stop",
			`npm install -g openclaw@${targetVersion} --allow-scripts=openclaw`,
			"openclaw doctor --fix",
			"openclaw gateway start"
		];
		const reason = options.cause === void 0 ? "" : ` Deferral failed: ${formatErrorMessage(options.cause).slice(0, 600)}.`;
		const summary = `Doctor refused update-time schema repair driven by OpenClaw ${updaterVersion}: this updater reopens the ledger with old code after migration, and version publication could not be deferred safely.`;
		const unchanged = `${databases.map((database) => `${database.kind} database ${database.path}: on-disk schema ${database.foundVersion}, this build's schema ${database.supportedVersion}.`).join(" ")}${reason} The blocked schema change was not applied.`;
		super(options.recovery ? `${summary} ${unchanged}\n${options.recovery.message}` : [
			summary,
			unchanged,
			"Let the updater restore the previous package and exit. Then use an independent shell with the original service account, package prefix, profile, and state/config overrides.",
			`Manual update: ${commands.join(" && ")}.`,
			`Use the package manager that owns this install (pnpm: pnpm add -g --allow-build=openclaw openclaw@${targetVersion}; Bun: bun add -g --trust openclaw@${targetVersion}). On npm 11.15 and earlier, omit --allow-scripts=openclaw.`
		].join("\n"), options);
		this.databases = databases;
		this.updaterVersion = updaterVersion;
		this.code = "update-schema-bump-unfenced";
		this.name = "UpdateSchemaRefusalError";
		this.targetVersion = targetVersion;
		this.commands = commands;
	}
};
//#endregion
//#region src/state/openclaw-state-db-maintenance.ts
const STATE_V6_ADDITIVE_TABLES = [
	"gateway_origin_device_tokens",
	...LAZY_ADDITIVE_STATE_TABLES,
	"worker_session_tool_operations",
	"worker_turn_tool_authorities"
];
const STATE_MIGRATION_ALLOWED_MISSING_TABLES = {
	5: [
		"agent_database_leases",
		"agent_deletion_journal",
		"claw_cron_refs",
		"claw_installs",
		"claw_mcp_server_refs",
		"claw_package_refs",
		"claw_workspace_files",
		"config_machine_state",
		"cron_job_scratch",
		"meeting_transcript_sessions",
		"meeting_transcript_summaries",
		"meeting_transcript_utterances",
		"outbound_media_provenance",
		"worker_environment_credentials",
		"worker_transcript_commit_heads",
		"worker_transcript_commits",
		...STATE_V6_ADDITIVE_TABLES
	],
	6: STATE_V6_ADDITIVE_TABLES,
	7: STATE_V6_ADDITIVE_TABLES,
	8: STATE_V6_ADDITIVE_TABLES,
	9: STATE_V6_ADDITIVE_TABLES,
	10: STATE_V6_ADDITIVE_TABLES,
	11: STATE_V6_ADDITIVE_TABLES,
	12: STATE_V6_ADDITIVE_TABLES,
	13: LAZY_ADDITIVE_STATE_TABLES,
	14: LAZY_ADDITIVE_STATE_TABLES,
	15: LAZY_ADDITIVE_STATE_TABLES,
	16: LAZY_ADDITIVE_STATE_TABLES,
	17: LAZY_ADDITIVE_STATE_TABLES
};
/** Require canonical shared-state ownership without requiring the latest schema. */
function assertOpenClawStateDatabaseOwner(database, options) {
	const hasMetadataTable = database.prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = 'schema_meta' LIMIT 1").get();
	let metadata;
	try {
		metadata = hasMetadataTable ? database.prepare("SELECT role, schema_version FROM schema_meta WHERE meta_key = 'primary' LIMIT 1").get() : void 0;
	} catch (error) {
		throw classifySqliteTableReadError(database, "schema_meta", [
			"meta_key",
			"role",
			"schema_version"
		], error);
	}
	if (metadata?.role !== "global") {
		const role = typeof metadata?.role === "string" ? metadata.role : "missing";
		throw new SqliteSchemaMismatchError(`OpenClaw state database ${options.pathname} has schema role ${role}; expected global. Run openclaw doctor --fix to inspect and repair its ownership.`);
	}
	return metadata;
}
/** Require the canonical shared-state owner and schema before offline file maintenance. */
function assertOpenClawStateDatabaseForMaintenance(database, options, readTable) {
	const userVersion = assertSupportedStateSchemaVersion(database, options.pathname);
	if (readStateSchemaContentVersion(database) !== 19) throw new SqliteSchemaMismatchError(`OpenClaw state database ${options.pathname} uses schema version ${userVersion}; run openclaw doctor --fix before compacting it.`);
	const metadata = assertOpenClawStateDatabaseOwner(database, options);
	if (metadata?.schema_version !== userVersion) {
		const schemaVersion = typeof metadata?.schema_version === "number" ? metadata.schema_version : "invalid";
		throw new SqliteSchemaMismatchError(`OpenClaw state database ${options.pathname} metadata schema version ${schemaVersion} does not match ${userVersion}; run openclaw doctor --fix before compacting it.`);
	}
	assertSqliteSchemaContains(database, options.pathname, OPENCLAW_STATE_SCHEMA_SQL, OPENCLAW_STATE_MAINTENANCE_SCHEMA_COMPATIBILITY, readTable);
}
function assertOpenClawStateDatabaseVersionForMigration(database, options) {
	const userVersion = readSqliteUserVersion(database);
	if (readStateSchemaMigrationVersion(database) !== options.version) throw new SqliteSchemaMismatchError(`OpenClaw state database ${options.pathname} uses schema version ${userVersion}; expected ${options.version} before migrating it.`);
	const metadata = assertOpenClawStateDatabaseOwner(database, options);
	if (metadata?.schema_version !== userVersion) {
		const schemaVersion = typeof metadata?.schema_version === "number" ? metadata.schema_version : "invalid";
		throw new SqliteSchemaMismatchError(`OpenClaw state database ${options.pathname} metadata schema version ${schemaVersion} does not match ${userVersion}; repair the ownership metadata before migrating it.`);
	}
	assertSqliteSchemaTablesPresent(database, options.pathname, OPENCLAW_STATE_SCHEMA_SQL, { allowedMissingTables: [...STATE_MIGRATION_ALLOWED_MISSING_TABLES[options.version], ...DOCTOR_OWNED_STATE_TABLES] });
}
/** Keep historical migration gates beside their version-specific ownership assertions. */
const openClawStateMigrationAssertions = new Map([
	5,
	6,
	7,
	8,
	9,
	10,
	11,
	12,
	13,
	14,
	15,
	16,
	17
].map((version) => [version, (database, options) => assertOpenClawStateDatabaseVersionForMigration(database, {
	...options,
	version
})]));
function markCurrentStateSchemaVersion(db, options = {}) {
	if (!tableExists(db, "audit_events")) return;
	const version = resolveStateSchemaVersionToPublish(db);
	db.exec(`PRAGMA user_version = ${version};`);
	if (tableExists(db, "schema_meta") && [
		"meta_key",
		"schema_version",
		"updated_at"
	].every((column) => tableHasColumn(db, "schema_meta", column))) {
		const now = Date.now();
		if (options.createMetadataIfMissing) {
			db.prepare(`INSERT INTO schema_meta (
           meta_key, role, schema_version, agent_id, app_version, created_at, updated_at
         ) VALUES ('primary', 'global', ?, NULL, NULL, ?, ?)
         ON CONFLICT(meta_key) DO UPDATE SET
           schema_version = excluded.schema_version,
           updated_at = excluded.updated_at`).run(version, now, now);
			return;
		}
		db.prepare("UPDATE schema_meta SET schema_version = ?, updated_at = ? WHERE meta_key = 'primary'").run(version, now);
	}
}
function resolveDatabasePath(options = {}) {
	return path.resolve(options.path ?? resolveOpenClawStateSqlitePath(options.env ?? process.env));
}
/** Historical jobs lost the creator's origin; preserve attribution without guessing authority. */
function migrateCronCreatorNamespaces(db, previousVersion) {
	if (previousVersion >= 14 || !tableExists(db, "cron_jobs")) return false;
	db.exec(`
    UPDATE cron_jobs
       SET job_json = json_set(job_json, '$.createdActor.source', 'unknown')
     WHERE json_valid(job_json)
       AND json_extract(job_json, '$.createdActor.type') = 'human';
  `);
	return true;
}
/** Keep opaque plugin targets independent of agent identity without rewriting binding records. */
function migrateConversationBindingTargets(db, previousVersion) {
	if (previousVersion >= 15) return false;
	const columns = ["target_agent_id", "target_session_id"].filter((column) => tableHasColumn(db, "current_conversation_bindings", column));
	if (columns.length === 0) return false;
	db.exec("DROP INDEX IF EXISTS idx_current_conversation_bindings_target;");
	for (const column of columns) db.exec(`ALTER TABLE current_conversation_bindings DROP COLUMN ${column};`);
	return true;
}
/** Add preparation and activation facts without rebuilding the referenced environment table. */
function migratePreparedWorkerOwnership(db, previousVersion) {
	if (previousVersion >= 17 || !tableExists(db, "worker_environments")) return false;
	const start = OPENCLAW_STATE_SCHEMA_SQL.indexOf("CREATE TABLE IF NOT EXISTS worker_environments (");
	const end = OPENCLAW_STATE_SCHEMA_SQL.indexOf("\n) STRICT;", start);
	if (start < 0 || end < start) throw new Error("OpenClaw worker environment schema marker is missing.");
	const columns = splitSqlList(OPENCLAW_STATE_SCHEMA_SQL.slice(start + 48, end)).map((column) => column.trim()).filter((column) => column.startsWith("last_activated_at_ms ") || column.startsWith("preparation_"));
	let changed = false;
	for (const column of columns) changed = ensureColumn(db, "worker_environments", column) || changed;
	return changed;
}
/** Historical publication rows retain unknown requesters; first use still owns absent tables. */
function migrateGitHubPublicationRequesterAuthority(db, previousVersion) {
	if (previousVersion >= 18) return false;
	let changed = false;
	for (const table of ["github_publication_session_lifecycles", "github_repository_publication_requests"]) if (tableExists(db, table)) changed = ensureColumn(db, table, "requester_authority_json TEXT") || changed;
	return changed;
}
const RELEASED_WORKSHOP_CLAIM_REASON = "Skill Workshop released this skill in a collection review; the path stays user-owned.";
function migrateSkillWorkshopCollectionReviewOwnership(db) {
	const retainedObjects = db.prepare(`
    SELECT sql FROM sqlite_schema
    WHERE tbl_name = 'skill_workshop_collection_reviews'
      AND type IN ('index', 'trigger') AND sql IS NOT NULL
      AND name NOT IN ('idx_skill_workshop_collection_reviews_workspace_time',
                       'idx_skill_workshop_collection_reviews_owner_time')
    ORDER BY type, name
  `).all();
	db.exec(`
    CREATE TABLE skill_workshop_collection_reviews_v16 (
      review_id TEXT NOT NULL PRIMARY KEY,
      owner_agent_id TEXT NOT NULL,
      backup_id TEXT NOT NULL,
      create_time INTEGER NOT NULL,
      kept_names_json TEXT NOT NULL,
      written_names_json TEXT NOT NULL,
      dropped_json TEXT NOT NULL
    ) STRICT;
  `);
	if (tableExists(db, "skill_workshop_proposals")) db.exec(`
    INSERT INTO skill_workshop_collection_reviews_v16 (
      review_id, owner_agent_id, backup_id, create_time,
      kept_names_json, written_names_json, dropped_json
    )
    SELECT review.review_id,
           (
             SELECT MIN(proposal.owner_agent_id)
             FROM skill_workshop_proposals AS proposal
             WHERE proposal.workspace_dir = review.workspace_dir
               AND proposal.owner_agent_id IS NOT NULL
               AND (
                 SELECT COUNT(DISTINCT owner_agent_id)
                 FROM skill_workshop_proposals AS matching
                 WHERE matching.workspace_dir = review.workspace_dir
                   AND matching.owner_agent_id IS NOT NULL
               ) = 1
           ),
           review.backup_id,
           review.create_time,
           review.kept_names_json,
           review.written_names_json,
           review.dropped_json
    FROM skill_workshop_collection_reviews AS review
    WHERE (
      SELECT COUNT(DISTINCT proposal.owner_agent_id)
      FROM skill_workshop_proposals AS proposal
      WHERE proposal.workspace_dir = review.workspace_dir
        AND proposal.owner_agent_id IS NOT NULL
    ) = 1;
    `);
	db.exec(`
    DROP TABLE skill_workshop_collection_reviews;
    ALTER TABLE skill_workshop_collection_reviews_v16
      RENAME TO skill_workshop_collection_reviews;
    CREATE INDEX idx_skill_workshop_collection_reviews_owner_time
      ON skill_workshop_collection_reviews(owner_agent_id, create_time DESC, review_id);
  `);
	for (const object of retainedObjects) if (typeof object.sql === "string") db.exec(object.sql);
}
/** Remove row provenance after the Workshop directory becomes the ownership boundary. */
function migrateSkillWorkshopDirectoryOwnership(db, previousVersion) {
	if (previousVersion >= 16) return false;
	const proposalColumns = ["workspace_dir", "claim_released_time"].filter((column) => tableHasColumn(db, "skill_workshop_proposals", column));
	const reviewHasWorkspace = tableHasColumn(db, "skill_workshop_collection_reviews", "workspace_dir");
	if (proposalColumns.length === 0 && !reviewHasWorkspace) return false;
	if (proposalColumns.includes("claim_released_time")) {
		const released = db.prepare("SELECT proposal_id, record_json FROM skill_workshop_proposals WHERE claim_released_time IS NOT NULL").all();
		if (released.length > 0) {
			const staleAt = (/* @__PURE__ */ new Date()).toISOString();
			const update = db.prepare(`UPDATE skill_workshop_proposals
           SET record_json = ?, status = 'stale', updated_at = ?, stale_at = ?, status_reason = ?
         WHERE proposal_id = ?`);
			for (const row of released) {
				const staleRecord = {
					...JSON.parse(row.record_json),
					status: "stale",
					updatedAt: staleAt,
					staleAt,
					statusReason: RELEASED_WORKSHOP_CLAIM_REASON
				};
				update.run(JSON.stringify(staleRecord), staleAt, staleAt, RELEASED_WORKSHOP_CLAIM_REASON, row.proposal_id);
			}
		}
	}
	if (reviewHasWorkspace) migrateSkillWorkshopCollectionReviewOwnership(db);
	for (const column of proposalColumns) db.exec(`ALTER TABLE skill_workshop_proposals DROP COLUMN ${column};`);
	return true;
}
/** Version-gated column and row migrations, oldest first; each runs inside the caller's schema transaction. */
const versionedStateMigrations = [
	{
		migrate: migrateJsonCanonicalWideRowsV13,
		applied: "Consolidated shared state tables (v13)"
	},
	{
		migrate: migrateCronCreatorNamespaces,
		applied: "Qualified historical cron creator attribution as unknown (v14)"
	},
	{
		migrate: migrateConversationBindingTargets,
		applied: "Removed redundant conversation binding target projections (v15)"
	},
	{
		migrate: migrateSkillWorkshopDirectoryOwnership,
		applied: "Moved Skill Workshop ownership to per-agent directories (v16)"
	},
	{
		migrate: migratePreparedWorkerOwnership,
		applied: "Recorded prepared worker ownership and one-use lifecycle (v17)"
	},
	{
		migrate: migrateGitHubPublicationRequesterAuthority,
		applied: "Added original requester authority to GitHub publication receipts (v18)"
	}
];
function runStateSchemaMigrationTransaction(db, pathname, migrate, transactionOptions, prepareSchema) {
	const foreignKeysWereEnabled = Number(db.prepare("PRAGMA foreign_keys").get()?.foreign_keys) === 1;
	if (foreignKeysWereEnabled) db.exec("PRAGMA foreign_keys = OFF;");
	try {
		return runSqliteImmediateTransactionSync(db, () => {
			prepareSchema?.();
			const publishedVersion = readSqliteUserVersion(db);
			const blocker = publishedVersion < 19 ? readStateSchemaPublicationBlocker(db) : void 0;
			if (!blocker) return migrate();
			try {
				if (!tableExists(db, "config_machine_state")) throw new Error("Shared state schema publication requires config_machine_state.");
				return migrate();
			} catch (cause) {
				if (cause instanceof OpenClawStateOwnershipError) throw cause;
				throw new UpdateSchemaRefusalError([{
					kind: "state",
					path: pathname,
					foundVersion: publishedVersion,
					supportedVersion: 19
				}], blocker.updaterVersion, {
					targetVersion: VERSION,
					cause
				});
			}
		}, transactionOptions);
	} finally {
		if (foreignKeysWereEnabled && db.isOpen) db.exec("PRAGMA foreign_keys = ON;");
	}
}
function writeCurrentStateSchemaMetadata(db, now) {
	const kysely = getNodeSqliteKysely(db);
	const schemaVersion = resolveStateSchemaVersionToPublish(db);
	db.exec(`PRAGMA user_version = ${schemaVersion};`);
	executeSqliteQuerySync(db, kysely.insertInto("schema_meta").values({
		meta_key: "primary",
		role: "global",
		schema_version: schemaVersion,
		agent_id: null,
		app_version: VERSION,
		created_at: now,
		updated_at: now
	}).onConflict((conflict) => conflict.column("meta_key").doUpdateSet({
		role: "global",
		schema_version: schemaVersion,
		agent_id: null,
		app_version: VERSION,
		updated_at: now
	}).where((eb) => eb.or([
		eb("schema_meta.schema_version", "!=", schemaVersion),
		eb("schema_meta.app_version", "is not", VERSION),
		eb("schema_meta.role", "!=", "global")
	]))));
}
function executeCanonicalStateSchema(database, options) {
	database.exec(getOpenClawStateRuntimeSchema({
		...options,
		includeAgentDeletionJournal: options.includeAgentDeletionJournal ?? tableExists(database, "agent_deletion_journal")
	}));
}
//#endregion
//#region src/state/openclaw-state-db-audit-migration.ts
const AUDIT_EVENT_STATE_SCHEMA_VERSION = 2;
const AUDIT_EVENT_LEGACY_COLUMNS = [
	"sequence",
	"event_id",
	"source_id",
	"source_sequence",
	"occurred_at",
	"kind",
	"action",
	"status",
	"error_code",
	"actor_type",
	"actor_id",
	"agent_id",
	"session_key",
	"session_id",
	"run_id",
	"tool_call_id",
	"tool_name"
];
const AUDIT_EVENT_V2_COLUMNS = [
	"sequence",
	"event_id",
	"source_id",
	"schema_version",
	"source_sequence",
	"occurred_at",
	"kind",
	"action",
	"status",
	"error_code",
	"actor_type",
	"actor_id",
	"agent_id",
	"session_key",
	"session_id",
	"run_id",
	"tool_call_id",
	"tool_name",
	"direction",
	"channel",
	"conversation_kind",
	"message_outcome",
	"reason_code",
	"delivery_kind",
	"failure_stage",
	"duration_ms",
	"result_count",
	"account_ref",
	"conversation_ref",
	"message_ref",
	"target_ref"
];
function tableColumnInfo(db, tableName) {
	return db.prepare(`PRAGMA table_info(${tableName})`).all();
}
function tableHasExactColumns(db, tableName, expected) {
	const names = tableColumnInfo(db, tableName).map((column) => column.name);
	return names.length === expected.length && names.every((name, index) => name === expected[index]);
}
function tableHasRequiredColumns(db, tableName, required) {
	const columns = new Map(tableColumnInfo(db, tableName).map((column) => [column.name, column]));
	return required.every((name) => Number(columns.get(name)?.notnull ?? 0) === 1);
}
function tableSql(db, tableName) {
	const row = db.prepare("SELECT sql FROM sqlite_master WHERE type = 'table' AND name = ?").get(tableName);
	return typeof row?.sql === "string" ? row.sql : void 0;
}
function tableHasUniqueColumn(db, tableName, columnName) {
	return db.prepare(`PRAGMA index_list(${tableName})`).all().some((index) => {
		if (Number(index.unique ?? 0) !== 1 || typeof index.name !== "string") return false;
		const escaped = index.name.replaceAll("'", "''");
		const columns = db.prepare(`PRAGMA index_info('${escaped}')`).all();
		return columns.length === 1 && columns[0]?.name === columnName;
	});
}
function hasCanonicalAuditEventTable(db, expectedColumns, requiredColumns) {
	const sql = tableSql(db, "audit_events")?.toLowerCase();
	return tableHasExactColumns(db, "audit_events", expectedColumns) && tablePrimaryKeyColumns(db, "audit_events").join(",") === "sequence" && tableHasRequiredColumns(db, "audit_events", requiredColumns) && typeof sql === "string" && /\bsequence\s+integer\s+primary\s+key\s+autoincrement\b/.test(sql) && tableHasUniqueColumn(db, "audit_events", "event_id") && tableHasUniqueColumn(db, "audit_events", "source_id");
}
function hasCanonicalAuditIdentityKeyTable(db) {
	if (!tableExists(db, "audit_identity_keys")) return false;
	const sql = tableSql(db, "audit_identity_keys")?.toLowerCase();
	return tableHasExactColumns(db, "audit_identity_keys", [
		"id",
		"key_id",
		"key",
		"created_at"
	]) && tablePrimaryKeyColumns(db, "audit_identity_keys").join(",") === "id" && tableHasRequiredColumns(db, "audit_identity_keys", [
		"id",
		"key_id",
		"key",
		"created_at"
	]) && typeof sql === "string" && /\bcheck\s*\(\s*id\s*=\s*1\s*\)/.test(sql);
}
function hasCanonicalAuditEventsSchema(db) {
	if (!tableExists(db, "audit_events")) return readSqliteUserVersion(db) < AUDIT_EVENT_STATE_SCHEMA_VERSION && !tableExists(db, "audit_identity_keys");
	return hasCanonicalAuditEventTable(db, AUDIT_EVENT_V2_COLUMNS, [
		"event_id",
		"source_id",
		"schema_version",
		"source_sequence",
		"occurred_at",
		"kind",
		"action",
		"status",
		"actor_type",
		"actor_id"
	]) && hasCanonicalAuditIdentityKeyTable(db);
}
function canRepairLegacyAuditEventsSchema(db) {
	if (!tableExists(db, "audit_events") || tableExists(db, "audit_events_migration_new") || tableHasColumn(db, "audit_events", "schema_version")) return false;
	return (!tableExists(db, "audit_identity_keys") || hasCanonicalAuditIdentityKeyTable(db)) && hasCanonicalAuditEventTable(db, AUDIT_EVENT_LEGACY_COLUMNS, [
		"event_id",
		"source_id",
		"source_sequence",
		"occurred_at",
		"kind",
		"action",
		"status",
		"actor_type",
		"actor_id",
		"agent_id",
		"run_id"
	]);
}
//#endregion
//#region src/state/openclaw-state-db-schema-v12-foldin.ts
const FOLDED_SINGLETON_STATE_TABLES_V12 = [
	"skill_curator_state",
	"update_check_state",
	"clawhub_promotions_feed_state",
	"model_catalog_remote",
	"voicewake_triggers",
	"voicewake_routing_routes",
	"voicewake_routing_config",
	"onboarding_recommendations",
	"cron_store_epochs",
	"tui_last_sessions",
	"sidebar_sections",
	"node_host_config",
	"web_push_vapid_keys"
];
function migrateSingletonStateFoldInV12(db, previousVersion) {
	if (previousVersion >= 12) return false;
	db.exec(`
    CREATE TABLE IF NOT EXISTS config_machine_state (
      state_key TEXT NOT NULL PRIMARY KEY,
      value_json TEXT NOT NULL,
      updated_at_ms INTEGER NOT NULL
    ) STRICT;
  `);
	const importState = db.prepare("INSERT INTO config_machine_state (state_key, value_json, updated_at_ms) VALUES (?, ?, ?) ON CONFLICT(state_key) DO NOTHING");
	if (tableExists(db, "update_check_state")) {
		const row = db.prepare("SELECT * FROM update_check_state WHERE state_key = 'default'").get();
		if (row) importState.run("update.checkState", JSON.stringify({
			lastCheckedAt: row.last_checked_at ?? void 0,
			lastNotifiedVersion: row.last_notified_version ?? void 0,
			lastNotifiedTag: row.last_notified_tag ?? void 0,
			lastAvailableVersion: row.last_available_version ?? void 0,
			lastAvailableTag: row.last_available_tag ?? void 0,
			autoInstallId: row.auto_install_id ?? void 0,
			autoFirstSeenVersion: row.auto_first_seen_version ?? void 0,
			autoFirstSeenTag: row.auto_first_seen_tag ?? void 0,
			autoFirstSeenAt: row.auto_first_seen_at ?? void 0,
			autoLastAttemptVersion: row.auto_last_attempt_version ?? void 0,
			autoLastAttemptAt: row.auto_last_attempt_at ?? void 0,
			autoLastSuccessVersion: row.auto_last_success_version ?? void 0,
			autoLastSuccessAt: row.auto_last_success_at ?? void 0
		}), Number(row.updated_at_ms));
	}
	if (tableExists(db, "voicewake_triggers")) {
		const rows = db.prepare("SELECT trigger, updated_at_ms FROM voicewake_triggers WHERE config_key = 'default' ORDER BY position").all();
		if (rows.length > 0) importState.run("voicewake.triggers", JSON.stringify(rows.map((row) => row.trigger)), Math.max(...rows.map((row) => Number(row.updated_at_ms))));
	}
	if (tableExists(db, "voicewake_routing_config")) {
		const config = db.prepare("SELECT * FROM voicewake_routing_config WHERE config_key = 'default'").get();
		if (config) {
			const routes = tableExists(db, "voicewake_routing_routes") ? db.prepare("SELECT trigger, target_mode, target_agent_id, target_session_key FROM voicewake_routing_routes WHERE config_key = 'default' ORDER BY position").all() : [];
			const targetFromColumns = (mode, agentId, sessionKey) => mode === "agent" && typeof agentId === "string" && agentId ? { agentId } : mode === "session" && typeof sessionKey === "string" && sessionKey ? { sessionKey } : { mode: "current" };
			importState.run("voicewake.routing", JSON.stringify({
				version: 1,
				defaultTarget: targetFromColumns(config.default_target_mode, config.default_target_agent_id, config.default_target_session_key),
				routes: routes.map((route) => ({
					trigger: route.trigger,
					target: targetFromColumns(route.target_mode, route.target_agent_id, route.target_session_key)
				})),
				updatedAtMs: config.updated_at_ms
			}), Number(config.updated_at_ms));
		}
	}
	if (tableExists(db, "onboarding_recommendations")) {
		const rows = db.prepare("SELECT * FROM onboarding_recommendations").all();
		for (const row of rows) importState.run(`onboarding.recommendations.${String(row.config_key)}`, JSON.stringify({
			inventoryHash: row.inventory_hash,
			matches: JSON.parse(String(row.matches_json)),
			offeredAt: row.offered_at_ms,
			acceptedAt: row.accepted_at_ms,
			updatedAt: row.updated_at_ms
		}), Number(row.updated_at_ms));
	}
	if (tableExists(db, "sidebar_sections")) {
		const sections = db.prepare("SELECT section_id FROM sidebar_sections ORDER BY position, section_id").all();
		if (sections.length > 0) importState.run("sidebar.sectionOrder", JSON.stringify(sections.map((section) => section.section_id)), Date.now());
	}
	if (tableExists(db, "node_host_config")) {
		const nodeHost = db.prepare("SELECT * FROM node_host_config WHERE config_key = 'current'").get();
		if (nodeHost) {
			const gateway = {
				...nodeHost.gateway_host == null ? {} : { host: nodeHost.gateway_host },
				...nodeHost.gateway_port == null ? {} : { port: nodeHost.gateway_port },
				...nodeHost.gateway_tls == null ? {} : { tls: nodeHost.gateway_tls === 1 },
				...nodeHost.gateway_tls_fingerprint == null ? {} : { tlsFingerprint: nodeHost.gateway_tls_fingerprint },
				...nodeHost.gateway_context_path == null ? {} : { contextPath: nodeHost.gateway_context_path },
				...nodeHost.gateway_cloudflare_access_json == null ? {} : { cloudflareAccess: JSON.parse(String(nodeHost.gateway_cloudflare_access_json)) }
			};
			importState.run("nodeHost.config", JSON.stringify({
				version: nodeHost.version,
				nodeId: nodeHost.node_id,
				...nodeHost.display_name == null ? {} : { displayName: nodeHost.display_name },
				...Object.keys(gateway).length === 0 ? {} : { gateway },
				installedAppsSharing: nodeHost.installed_apps_sharing === 1
			}), Number(nodeHost.updated_at_ms));
		}
	}
	if (tableExists(db, "web_push_vapid_keys")) {
		const vapidKeys = db.prepare("SELECT * FROM web_push_vapid_keys WHERE key_id = 'default'").get();
		if (vapidKeys) importState.run("webPush.vapidKeys", JSON.stringify({
			publicKey: vapidKeys.public_key,
			privateKey: vapidKeys.private_key,
			subject: vapidKeys.subject
		}), Number(vapidKeys.updated_at_ms));
	}
	let dropped = false;
	for (const tableName of FOLDED_SINGLETON_STATE_TABLES_V12) if (tableExists(db, tableName)) {
		db.exec(`DROP TABLE IF EXISTS ${tableName};`);
		dropped = true;
	}
	return dropped;
}
//#endregion
//#region src/state/session-watch-cursor-provenance.ts
const SESSION_WATCH_PROVENANCE_EXPLICIT = "explicit";
const SESSION_WATCH_PROVENANCE_AMBIENT_GROUP = "ambient-group";
//#endregion
//#region src/state/openclaw-state-db-session-watch-migration.ts
const LEGACY_AMBIENT_GROUP_WATCH_MARKER_PREFIX = "ambient-group-watch:";
const SESSION_WATCH_PROVENANCE_COLUMN_SQL = `provenance TEXT NOT NULL DEFAULT '${SESSION_WATCH_PROVENANCE_EXPLICIT}' CHECK (provenance IN ('${SESSION_WATCH_PROVENANCE_EXPLICIT}', '${SESSION_WATCH_PROVENANCE_AMBIENT_GROUP}'))`;
function getSessionWatchCursorKysely(db) {
	return getNodeSqliteKysely(db);
}
function decodeLegacyAmbientWatchMarkerKey(markerKey) {
	const encoded = markerKey.slice(20);
	if (!encoded || encoded.length % 2 !== 0 || !/^[0-9a-f]+$/.test(encoded)) return;
	try {
		return new TextDecoder("utf-8", {
			fatal: true,
			ignoreBOM: true
		}).decode(Buffer.from(encoded, "hex"));
	} catch {
		return;
	}
}
function migrateSessionWatchCursorProvenance(db) {
	if (!tableExists(db, "session_watch_cursors")) return {
		addedColumn: false,
		migratedAmbientWatches: 0,
		removedLegacySentinels: 0
	};
	const addedColumn = ensureColumn(db, "session_watch_cursors", SESSION_WATCH_PROVENANCE_COLUMN_SQL);
	const kysely = getSessionWatchCursorKysely(db);
	const legacyMarkers = executeSqliteQuerySync(db, kysely.selectFrom("session_watch_cursors").select([
		"watcher_session_key",
		"target_session_key",
		"updated_at"
	]).where("watcher_session_key", "like", `${LEGACY_AMBIENT_GROUP_WATCH_MARKER_PREFIX}%`)).rows;
	let migratedAmbientWatches = 0;
	for (const marker of legacyMarkers) {
		const watcherSessionKey = decodeLegacyAmbientWatchMarkerKey(marker.watcher_session_key);
		if (watcherSessionKey) {
			const watch = executeSqliteQueryTakeFirstSync(db, kysely.selectFrom("session_watch_cursors").select("updated_at").where("watcher_session_key", "=", watcherSessionKey).where("target_session_key", "=", marker.target_session_key));
			if (watch) {
				const promoted = executeSqliteQuerySync(db, kysely.updateTable("session_watch_cursors").set({
					provenance: SESSION_WATCH_PROVENANCE_AMBIENT_GROUP,
					updated_at: Math.max(watch.updated_at, marker.updated_at)
				}).where("watcher_session_key", "=", watcherSessionKey).where("target_session_key", "=", marker.target_session_key));
				migratedAmbientWatches += Number(promoted.numAffectedRows ?? 0n);
			}
		}
		executeSqliteQuerySync(db, kysely.deleteFrom("session_watch_cursors").where("watcher_session_key", "=", marker.watcher_session_key).where("target_session_key", "=", marker.target_session_key));
	}
	return {
		addedColumn,
		migratedAmbientWatches,
		removedLegacySentinels: legacyMarkers.length
	};
}
//#endregion
//#region src/state/openclaw-state-db-table-retirements.ts
const stateDbLog$3 = createSubsystemLogger("state/db");
const logRetiredStateTableMigration = (message) => stateDbLog$3.info(message);
const RETIRED_DEAD_STATE_TABLES_V10 = [
	"agent_model_catalogs",
	"android_notification_recent_packages",
	"command_log_entries",
	"diagnostic_stability_bundles",
	"media_blobs",
	"model_capability_cache"
];
const RETIRED_COMMITMENTS_COLUMNS_SQL = `
  id TEXT NOT NULL PRIMARY KEY,
  agent_id TEXT NOT NULL,
  session_key TEXT NOT NULL,
  channel TEXT NOT NULL,
  account_id TEXT,
  recipient_id TEXT,
  thread_id TEXT,
  sender_id TEXT,
  kind TEXT NOT NULL,
  sensitivity TEXT NOT NULL,
  source TEXT NOT NULL,
  status TEXT NOT NULL,
  reason TEXT NOT NULL,
  suggested_text TEXT NOT NULL,
  dedupe_key TEXT NOT NULL,
  confidence REAL NOT NULL,
  due_earliest_ms INTEGER NOT NULL,
  due_latest_ms INTEGER NOT NULL,
  due_timezone TEXT NOT NULL,
  source_message_id TEXT,
  source_run_id TEXT,
  created_at_ms INTEGER NOT NULL,
  updated_at_ms INTEGER NOT NULL,
  attempts INTEGER NOT NULL,
  last_attempt_at_ms INTEGER,
  sent_at_ms INTEGER,
  dismissed_at_ms INTEGER,
  snoozed_until_ms INTEGER,
  expired_at_ms INTEGER,
  record_json TEXT NOT NULL
`;
const RETIRED_COMMITMENTS_BASE_INDEXES_SQL = `CREATE INDEX idx_commitments_scope_due
  ON commitments(agent_id, session_key, status, due_earliest_ms, due_latest_ms);
CREATE INDEX idx_commitments_status_due
  ON commitments(status, due_earliest_ms, due_latest_ms);
CREATE INDEX idx_commitments_scope_dedupe
  ON commitments(agent_id, session_key, channel, dedupe_key, status);`;
const RETIRED_COMMITMENTS_SCHEMA_SQL = `
CREATE TABLE commitments (${RETIRED_COMMITMENTS_COLUMNS_SQL.slice(1, -1)}
) STRICT;
${RETIRED_COMMITMENTS_BASE_INDEXES_SQL}
CREATE INDEX idx_commitments_agent_due
  ON commitments(agent_id, status, due_earliest_ms, due_latest_ms, session_key);
CREATE INDEX idx_commitments_agent_sent
  ON commitments(agent_id, status, sent_at_ms, session_key);
`;
const SHIPPED_RETIRED_COMMITMENTS_SCHEMA_SQL = `
CREATE TABLE commitments (${RETIRED_COMMITMENTS_COLUMNS_SQL.slice(1, -1)}
);
${RETIRED_COMMITMENTS_BASE_INDEXES_SQL}
`;
const RETIRED_COMMITMENTS_ADDITIVE_COLUMNS = [
	"commitments.account_id",
	"commitments.recipient_id",
	"commitments.thread_id",
	"commitments.sender_id",
	"commitments.kind",
	"commitments.sensitivity",
	"commitments.source",
	"commitments.reason",
	"commitments.suggested_text",
	"commitments.dedupe_key",
	"commitments.confidence",
	"commitments.due_timezone",
	"commitments.source_message_id",
	"commitments.source_run_id",
	"commitments.created_at_ms",
	"commitments.attempts",
	"commitments.last_attempt_at_ms",
	"commitments.sent_at_ms",
	"commitments.dismissed_at_ms",
	"commitments.snoozed_until_ms",
	"commitments.expired_at_ms"
];
function deriveRetiredCommitmentsContract() {
	const indexFingerprints = new Map(getCanonicalSqliteNamedIndexContracts(RETIRED_COMMITMENTS_SCHEMA_SQL).map(({ fingerprint, name }) => [name, JSON.stringify(fingerprint)]));
	return {
		indexFingerprints,
		compatibility: {
			allowedColumnDefinitions: {
				"commitments.attempts": ["attempts INTEGER NOT NULL DEFAULT 0"],
				"commitments.confidence": ["confidence REAL NOT NULL DEFAULT 0"],
				"commitments.created_at_ms": ["created_at_ms INTEGER NOT NULL DEFAULT 0"],
				"commitments.dedupe_key": ["dedupe_key TEXT NOT NULL DEFAULT ''"],
				"commitments.due_timezone": ["due_timezone TEXT NOT NULL DEFAULT 'UTC'"],
				"commitments.kind": ["kind TEXT NOT NULL DEFAULT 'followup'"],
				"commitments.reason": ["reason TEXT NOT NULL DEFAULT ''"],
				"commitments.sensitivity": ["sensitivity TEXT NOT NULL DEFAULT 'normal'"],
				"commitments.source": ["source TEXT NOT NULL DEFAULT 'unknown'"],
				"commitments.suggested_text": ["suggested_text TEXT NOT NULL DEFAULT ''"]
			},
			allowedMissingColumns: RETIRED_COMMITMENTS_ADDITIVE_COLUMNS,
			allowedMissingIndexes: [...indexFingerprints.keys()]
		}
	};
}
function hasSupportedRetiredCommitmentsSchema(db, schemaSql, { compatibility, indexFingerprints }) {
	if (collectSqliteSchemaIssues(db, schemaSql, compatibility).length > 0) return false;
	return db.prepare(`SELECT type, name
           FROM sqlite_schema
          WHERE type IN ('index', 'trigger')
            AND tbl_name = 'commitments'
            AND sql IS NOT NULL
          ORDER BY type, name`).all().every((object) => object.type === "index" && JSON.stringify(collectSqliteNamedIndexContract(db, object.name)) === indexFingerprints.get(object.name));
}
function assertRecognizedRetiredCommitmentsSchema(db) {
	if (hasRecognizedRetiredCommitmentsSchema(db)) return;
	assertSqliteSchemaContains(db, "retired OpenClaw commitments schema", RETIRED_COMMITMENTS_SCHEMA_SQL, deriveRetiredCommitmentsContract().compatibility);
	throw new Error("Retired OpenClaw commitments schema has unsupported additional indexes; refusing destructive migration.");
}
function hasRecognizedRetiredCommitmentsSchema(db) {
	const contract = deriveRetiredCommitmentsContract();
	return hasSupportedRetiredCommitmentsSchema(db, RETIRED_COMMITMENTS_SCHEMA_SQL, contract) || hasSupportedRetiredCommitmentsSchema(db, SHIPPED_RETIRED_COMMITMENTS_SCHEMA_SQL, contract);
}
function assertNoRetiredCommitmentsForeignKeys(db) {
	const tables = db.prepare(`SELECT name
         FROM sqlite_schema
        WHERE type = 'table' AND name <> 'commitments'
        ORDER BY name`).all();
	for (const table of tables) if (db.prepare(`PRAGMA foreign_key_list(${quoteSqliteIdentifier(table.name)})`).all().some((foreignKey) => typeof foreignKey.table === "string" && foreignKey.table.toLowerCase() === "commitments")) throw new Error(`Retired OpenClaw commitments schema is referenced by table ${table.name}; refusing destructive migration.`);
}
function collectRetainedSchemaSql(db) {
	return new Map(db.prepare(`SELECT type, name, sql
             FROM sqlite_schema
            WHERE type IN ('trigger', 'view')
              AND tbl_name <> 'commitments'
              AND sql IS NOT NULL
            ORDER BY type, name`).all().map((object) => [`${object.type}:${object.name}`, object.sql]));
}
function assertNoRetiredCommitmentsSchemaDependencies(db) {
	const probeTable = "__openclaw_retired_commitments_probe";
	if (tableExists(db, probeTable)) throw new Error(`OpenClaw state database already contains ${probeTable}; refusing destructive migration.`);
	const before = collectRetainedSchemaSql(db);
	const savepoint = "openclaw_probe_commitments_dependencies";
	db.exec(`SAVEPOINT ${savepoint};`);
	let changedObject;
	try {
		db.exec(`ALTER TABLE commitments RENAME TO ${quoteSqliteIdentifier(probeTable)};`);
		const after = collectRetainedSchemaSql(db);
		changedObject = [...before].find(([object, sql]) => after.get(object) !== sql)?.[0];
	} catch (error) {
		db.exec(`ROLLBACK TO ${savepoint}; RELEASE ${savepoint};`);
		throw new Error("Could not prove retained SQLite views and triggers independent of commitments; refusing destructive migration.", { cause: error });
	}
	db.exec(`ROLLBACK TO ${savepoint}; RELEASE ${savepoint};`);
	if (changedObject) {
		const [type, name] = changedObject.split(":", 2);
		throw new Error(`Retired OpenClaw commitments schema is referenced by ${type} ${name}; refusing destructive migration.`);
	}
}
function assertVirtualTablesUsable(db, phase) {
	const virtualTables = db.prepare(`SELECT name
         FROM sqlite_schema
        WHERE type = 'table' AND lower(sql) LIKE 'create virtual table%'
        ORDER BY name`).all();
	for (const table of virtualTables) try {
		db.prepare(`SELECT * FROM ${quoteSqliteIdentifier(table.name)} LIMIT 1`).all();
	} catch (error) {
		throw new Error(`SQLite virtual table ${table.name} is unusable ${phase} commitments retirement.`, { cause: error });
	}
}
function migrateRetiredCommitmentsSchema(db, previousVersion) {
	if (previousVersion >= 7) return false;
	if (!tableExists(db, "commitments")) return false;
	assertRecognizedRetiredCommitmentsSchema(db);
	assertNoRetiredCommitmentsForeignKeys(db);
	assertNoRetiredCommitmentsSchemaDependencies(db);
	assertVirtualTablesUsable(db, "before");
	const savepoint = "openclaw_retire_commitments_v7";
	db.exec(`SAVEPOINT ${savepoint};`);
	try {
		db.exec("DROP TABLE commitments;");
		assertVirtualTablesUsable(db, "after");
		db.exec(`RELEASE ${savepoint};`);
		return true;
	} catch (error) {
		db.exec(`ROLLBACK TO ${savepoint}; RELEASE ${savepoint};`);
		throw error;
	}
}
function migrateRetiredDeadStateTablesV10(db, previousVersion) {
	if (previousVersion >= 10) return false;
	let dropped = false;
	for (const tableName of RETIRED_DEAD_STATE_TABLES_V10) if (tableExists(db, tableName)) {
		db.exec(`DROP TABLE IF EXISTS ${tableName};`);
		dropped = true;
	}
	return dropped;
}
const RETIRED_SKILL_CURATOR_TABLES_V11 = ["skill_lifecycle", "skill_workshop_proposal_origin_runs"];
function migrateRetiredSkillCuratorTablesV11(db, previousVersion) {
	if (previousVersion >= 11) return false;
	const retiredTables = RETIRED_SKILL_CURATOR_TABLES_V11.filter((table) => tableExists(db, table));
	if (retiredTables.length === 0) return false;
	if (retiredTables.includes("skill_lifecycle")) {
		const archivedCount = Number(db.prepare("SELECT COUNT(*) AS archived_count FROM skill_lifecycle WHERE state = 'archived'").get()?.archived_count);
		if (archivedCount > 0) stateDbLog$3.info(`${archivedCount} previously archived workshop skills return to the active collection; the weekly collection review will judge them`);
	}
	for (const table of retiredTables) db.exec(`DROP TABLE IF EXISTS ${table};`);
	return true;
}
/**
* Runs every retired-table migration in schema order and names what it changed.
* Both the repair path and the ordinary open path go through here so the order
* and the operator-visible labels cannot drift apart.
*/
function runRetiredStateTableMigrations(db, previousVersion) {
	const applied = [];
	if (migrateRetiredCommitmentsSchema(db, previousVersion)) applied.push("Discarded retired shared-state commitments rows, table, and indexes");
	if (migrateRetiredDeadStateTablesV10(db, previousVersion)) applied.push("Retired six dead shared-state tables (v10)");
	if (migrateRetiredSkillCuratorTablesV11(db, previousVersion)) applied.push("Retired legacy skill curator lifecycle and proposal origin-run tables");
	return applied;
}
//#endregion
//#region src/state/openclaw-state-db-schema-repair.ts
function dropLegacyStateTables(db) {
	const transientHistoryTable = ["database", "verifications"].join("_");
	db.exec(`DROP TABLE IF EXISTS ${transientHistoryTable};`);
	db.exec("DROP TABLE IF EXISTS node_pairing_pending; DROP TABLE IF EXISTS node_pairing_paired;");
}
function migrateWorkerPlacementExecutionModeSchema(db, previousVersion) {
	if (previousVersion >= 8 || !tableExists(db, "worker_session_placements")) return false;
	for (const definition of [
		"execution_mode TEXT",
		"terminal_reason TEXT",
		"terminal_at_ms INTEGER"
	]) {
		const column = definition.split(" ", 1)[0];
		if (!tableHasColumn(db, "worker_session_placements", column)) db.exec(`ALTER TABLE worker_session_placements ADD COLUMN ${definition};`);
	}
	const placementSchema = extractSqliteTableSchema(OPENCLAW_STATE_SCHEMA_SQL, "worker_session_placements", { errorMessage: "Canonical worker placement schema block is missing" });
	const canonical = openNodeSqliteDatabase(":memory:");
	let canonicalColumns;
	try {
		canonical.exec(placementSchema);
		canonicalColumns = canonical.prepare("PRAGMA table_xinfo(worker_session_placements)").all().filter((column) => column.hidden === 0).map((column) => column.name);
	} finally {
		canonical.close();
	}
	const currentColumns = db.prepare("PRAGMA table_xinfo(worker_session_placements)").all().filter((column) => column.hidden === 0).map((column) => column.name);
	const expected = new Set(canonicalColumns);
	if (currentColumns.length !== canonicalColumns.length || currentColumns.some((column) => !expected.has(column))) throw new Error("OpenClaw v7 worker placement columns are not canonical");
	if (db.prepare(`SELECT type, name
         FROM sqlite_schema
        WHERE tbl_name = 'worker_session_placements'
          AND type IN ('index', 'trigger')
          AND sql IS NOT NULL
          AND name NOT IN (
            'idx_worker_session_placements_session_key',
            'idx_worker_session_placements_reconcile'
          )`).all().length > 0) throw new Error("OpenClaw v7 worker placement schema has unsupported attached objects");
	const migrationTable = "worker_session_placements_migration_v8";
	if (tableExists(db, migrationTable)) throw new Error(`OpenClaw worker placement migration table already exists: ${migrationTable}`);
	const migrationSchema = placementSchema.replace("CREATE TABLE IF NOT EXISTS worker_session_placements", `CREATE TABLE ${migrationTable}`);
	const columns = canonicalColumns.map(quoteSqliteIdentifier).join(", ");
	db.exec(migrationSchema);
	db.exec(`INSERT INTO ${migrationTable} (${columns}) SELECT ${columns} FROM worker_session_placements;`);
	db.exec("DROP TABLE worker_session_placements;");
	db.exec(`ALTER TABLE ${migrationTable} RENAME TO worker_session_placements;`);
	return true;
}
function isDefaultAgentDatabasePath(pathname, agentId) {
	const agentDir = path.dirname(pathname);
	const agentIdDir = path.dirname(agentDir);
	return path.basename(pathname) === "openclaw-agent.sqlite" && path.basename(agentDir) === "agent" && path.basename(agentIdDir) === agentId && path.basename(path.dirname(agentIdDir)) === "agents";
}
function migrateAgentDatabaseRelativePaths(db, previousVersion, databasePath) {
	if (previousVersion >= 9 || !tableExists(db, "agent_databases")) return {
		relativized: 0,
		reanchored: [],
		deleted: [],
		preserved: 0
	};
	const rows = db.prepare("SELECT agent_id, path FROM agent_databases").all();
	const updatePath = db.prepare("UPDATE agent_databases SET path = ? WHERE agent_id = ? AND path = ?");
	const deletePath = db.prepare("DELETE FROM agent_databases WHERE agent_id = ? AND path = ?");
	const hasPath = db.prepare("SELECT 1 FROM agent_databases WHERE agent_id = ? AND path = ? LIMIT 1");
	const retainNewerFacts = db.prepare(`
    UPDATE agent_databases AS canonical
       SET schema_version = source.schema_version,
           last_seen_at = source.last_seen_at,
           size_bytes = source.size_bytes
      FROM agent_databases AS source
     WHERE canonical.agent_id = ? AND canonical.path = ?
       AND source.agent_id = canonical.agent_id AND source.path = ?
       AND source.last_seen_at > canonical.last_seen_at
  `);
	let relativized = 0;
	const reanchored = [];
	const deleted = [];
	for (const row of rows) {
		const agentId = row.agent_id;
		const registeredPath = row.path;
		if (typeof agentId !== "string" || typeof registeredPath !== "string") throw new Error("OpenClaw v8 agent database registry paths are not canonical");
		if (!path.isAbsolute(registeredPath)) continue;
		const storedPath = resolveOpenClawAgentDatabaseStoredPath(databasePath, registeredPath);
		if (!path.isAbsolute(storedPath)) {
			if (hasPath.get(agentId, storedPath)) {
				retainNewerFacts.run(agentId, storedPath, registeredPath);
				deletePath.run(agentId, registeredPath);
				deleted.push(registeredPath);
			} else {
				updatePath.run(storedPath, agentId, registeredPath);
				relativized += 1;
			}
		}
	}
	const stateDir = resolveOpenClawStateDirForDatabasePath(databasePath);
	for (const row of rows) {
		const agentId = row.agent_id;
		const registeredPath = row.path;
		if (typeof agentId !== "string" || typeof registeredPath !== "string" || !path.isAbsolute(registeredPath) || !path.isAbsolute(resolveOpenClawAgentDatabaseStoredPath(databasePath, registeredPath))) continue;
		if (isDefaultAgentDatabasePath(path.resolve(registeredPath), agentId)) {
			const counterpartAbsolute = path.join(stateDir, "agents", agentId, "agent", "openclaw-agent.sqlite");
			const counterpartStored = resolveOpenClawAgentDatabaseStoredPath(databasePath, counterpartAbsolute);
			if (hasPath.get(agentId, counterpartStored)) {
				deletePath.run(agentId, registeredPath);
				deleted.push(registeredPath);
			} else if (existsSync(counterpartAbsolute)) {
				updatePath.run(counterpartStored, agentId, registeredPath);
				reanchored.push(registeredPath);
			}
		}
	}
	return {
		relativized,
		reanchored,
		deleted,
		preserved: rows.length - relativized - reanchored.length - deleted.length
	};
}
function hasCanonicalAgentDatabasesPrimaryKey(db) {
	if (!tableExists(db, "agent_databases")) return true;
	const primaryKey = tablePrimaryKeyColumns(db, "agent_databases");
	return primaryKey.length === 2 && primaryKey[0] === "agent_id" && primaryKey[1] === "path";
}
function canRepairAgentDatabasesPrimaryKey(db) {
	if (!tableExists(db, "agent_databases")) return false;
	return [
		"agent_id",
		"path",
		"schema_version",
		"last_seen_at",
		"size_bytes"
	].every((column) => tableHasColumn(db, "agent_databases", column));
}
function repairLegacyGatewayRestartHandoffsForStrictMigration(db) {
	if (!tableExists(db, "gateway_restart_handoff")) return;
	db.prepare("DELETE FROM gateway_restart_handoff WHERE expires_at <= ?").run(Date.now());
	db.exec(`
    UPDATE gateway_restart_handoff
    SET
      restart_trace_started_at = CASE
        WHEN typeof(restart_trace_started_at) = 'real'
          THEN CAST(restart_trace_started_at AS INTEGER)
        ELSE restart_trace_started_at
      END,
      restart_trace_last_at = CASE
        WHEN typeof(restart_trace_last_at) = 'real'
          THEN CAST(restart_trace_last_at AS INTEGER)
        ELSE restart_trace_last_at
      END
    WHERE typeof(restart_trace_started_at) = 'real'
       OR typeof(restart_trace_last_at) = 'real';
  `);
}
function assertCanonicalStateSchemaShape(db, pathname) {
	assertCanonicalOperatorApprovalKinds(db, pathname);
	if (!hasCanonicalAgentDatabasesPrimaryKey(db)) {
		if (canRepairAgentDatabasesPrimaryKey(db)) throw new OpenClawStateDatabaseSchemaMigrationRequiredError("agent-databases-composite-primary-key", pathname);
		throw new SqliteSchemaMismatchError(`OpenClaw state database ${pathname} has a noncanonical agent database registry schema that cannot be repaired automatically; restore the canonical agent_databases shape before retrying.`);
	}
	if (!hasCanonicalAuditEventsSchema(db)) {
		if (canRepairLegacyAuditEventsSchema(db)) throw new OpenClawStateDatabaseSchemaMigrationRequiredError("audit-events-v2", pathname);
		throw new SqliteSchemaMismatchError(`OpenClaw state database ${pathname} has a noncanonical audit event schema that cannot be repaired automatically; restore the canonical audit_events shape before retrying.`);
	}
}
//#endregion
//#region src/state/openclaw-state-db-fast-path.ts
function assertCurrentStateRuntimeSchema(database, pathname, readTable) {
	assertCanonicalStateSchemaShape(database, pathname);
	assertOpenClawStateDatabaseForMaintenance(database, { pathname }, readTable);
}
/** Catalog presence is enough to refuse retired history without reading or rewriting its rows. */
function assertNoLegacyStateRuntimeRepair(database, pathname) {
	if (hasLegacyCronRunLogs(database)) throw new OpenClawStateDatabaseSchemaMigrationRequiredError("legacy-cron-run-logs", pathname);
}
function isOpenClawStateSchemaFastPathEligible(database, pathname) {
	return runSqliteDeferredTransactionSync(database, () => {
		assertSupportedStateSchemaVersion(database, pathname);
		if (readStateSchemaMigrationVersion(database) !== 19) return false;
		assertSqliteIntegrity(database, pathname);
		const readTable = createSqliteTableContractReader(database);
		assertCurrentStateRuntimeSchema(database, pathname, readTable);
		if (collectSqliteSchemaIssues(database, getOpenClawStateRuntimeSchema({ includeVersionLazyAdditiveTables: false }), STATE_PERSISTENT_SCHEMA_COMPATIBILITY, readTable).some(isOpenClawStateStartupRepairableSchemaIssue)) return false;
		assertNoLegacyStateRuntimeRepair(database, pathname);
		return true;
	});
}
//#endregion
//#region src/state/openclaw-state-db-existing-schema.ts
const validatedSchemas = /* @__PURE__ */ new WeakMap();
/** Prove the existing runtime contract without certifying this release's repairs. */
function assertExistingOpenClawStateRuntimeSchema(database, pathname) {
	const schemaCookie = runSqliteDeferredTransactionSync(database, () => {
		const version = assertSupportedStateSchemaVersion(database, pathname);
		if (readStateSchemaMigrationVersion(database) !== 19) throw new Error(`Existing shared-state database ${pathname} requires schema migration by its owning installation before this node can use it.`);
		let metadata;
		try {
			metadata = executeSqliteQueryTakeFirstSync(database, getNodeSqliteKysely(database).selectFrom("schema_meta").select(["role", "schema_version"]).where("meta_key", "=", "primary").limit(1));
		} catch (error) {
			throw classifySqliteTableReadError(database, "schema_meta", [
				"meta_key",
				"role",
				"schema_version"
			], error);
		}
		if (metadata?.role !== "global" || metadata.schema_version !== version) throw new Error(`Existing shared-state database ${pathname} has inconsistent ownership or schema metadata.`);
		const currentCookie = readSqliteSchemaCookie(database);
		if (typeof currentCookie !== "number") throw new Error(`Existing shared-state database ${pathname} schema version is unavailable.`);
		const cached = validatedSchemas.get(database);
		if (cached?.cookie !== currentCookie) {
			cached?.unregister();
			validatedSchemas.delete(database);
			assertSqliteIntegrity(database, pathname);
			const readTable = createSqliteTableContractReader(database);
			assertCurrentStateRuntimeSchema(database, pathname, readTable);
			assertNoLegacyStateRuntimeRepair(database, pathname);
			assertSqliteSchemaContains(database, pathname, getOpenClawStateRuntimeSchema({ includeVersionLazyAdditiveTables: false }), STATE_PERSISTENT_SCHEMA_COMPATIBILITY, readTable);
		}
		return currentCookie;
	});
	if (!database.isTransaction && validatedSchemas.get(database)?.cookie !== schemaCookie) {
		const unregister = registerNodeSqliteDisposeCallback(database, () => {
			validatedSchemas.delete(database);
			unregister();
		});
		validatedSchemas.set(database, {
			cookie: schemaCookie,
			unregister
		});
	}
}
//#endregion
//#region src/config/legacy.default-agent-owner-state.ts
const legacyDefaultAgentIdByConfig = /* @__PURE__ */ new WeakMap();
function getRetainedLegacyDefaultAgentId(config) {
	return legacyDefaultAgentIdByConfig.get(config);
}
//#endregion
//#region src/config/model-policy-allowlist-migration.ts
/** A per-agent policy replaces inherited defaults only when it owns `allow`. */
function hasExplicitModelPolicyAllow(value) {
	return isRecord(value) && Object.hasOwn(value, "allow");
}
//#endregion
//#region src/shared/immutable-data.ts
const deeplyFrozenPlainData = /* @__PURE__ */ new WeakSet();
function isPlainDataObject(value) {
	if (isProxy(value)) return false;
	const prototype = Object.getPrototypeOf(value);
	return prototype === null || prototype === Object.prototype || Array.isArray(value) && prototype === Array.prototype;
}
/** Immutable graphs keep their classification for exactly as long as their objects live. */
function isDeeplyFrozenPlainData(value) {
	if (!value || typeof value !== "object") return typeof value !== "function";
	if (deeplyFrozenPlainData.has(value)) return true;
	if (!isPlainDataObject(value) || !Object.isFrozen(value)) return false;
	const inspected = /* @__PURE__ */ new Set();
	const pending = [value];
	while (pending.length) {
		const candidate = pending.pop();
		if (inspected.has(candidate)) continue;
		if (!isPlainDataObject(candidate) || !Object.isFrozen(candidate)) return false;
		inspected.add(candidate);
		const childStart = pending.length;
		for (const key of Reflect.ownKeys(candidate)) {
			const descriptor = Object.getOwnPropertyDescriptor(candidate, key);
			if (!("value" in descriptor) || typeof descriptor.value === "function") return false;
			if (descriptor.value && typeof descriptor.value === "object" && !deeplyFrozenPlainData.has(descriptor.value)) pending.push(descriptor.value);
		}
		for (let left = childStart, right = pending.length - 1; left < right; left++, right--) {
			const child = pending[left];
			pending[left] = pending[right];
			pending[right] = child;
		}
	}
	for (const candidate of inspected) deeplyFrozenPlainData.add(candidate);
	return true;
}
//#endregion
//#region src/agents/agent-roster.ts
function collectAgentEntries(cfg, withSource, limit) {
	const roster = readAgentRosterProperty(cfg);
	if (roster?.kind === "entries" && isRecord(roster.value)) {
		const result = [];
		for (const id in roster.value) {
			if (!Object.hasOwn(roster.value, id)) continue;
			const entry = roster.value[id];
			if (isRecord(entry)) {
				const projected = {
					...entry,
					id
				};
				result.push(withSource ? {
					entry: projected,
					source: {
						kind: "entries",
						key: id
					}
				} : projected);
				if (result.length === limit) break;
			}
		}
		return result;
	}
	if (roster?.kind !== "list" || !Array.isArray(roster.value)) return [];
	const listed = [];
	roster.value.some((entry, index) => {
		if (entry !== null && typeof entry === "object") listed.push({
			entry,
			source: {
				kind: "list",
				index
			}
		});
		return listed.length === limit;
	});
	return withSource ? listed : listed.map(({ entry }) => entry);
}
/** Lists valid configured agent entries from config. */
function listAgentEntriesWithSource(cfg) {
	return collectAgentEntries(cfg, true);
}
/** Lists valid configured agent entries from either supported representation. */
function listAgentEntries(cfg) {
	return collectAgentEntries(cfg, false);
}
/** Reads the explicitly owned raw roster without normalizing malformed values. */
function readAgentRosterProperty(raw) {
	if (!isRecord(raw)) return;
	const agents = raw.agents;
	if (!isRecord(agents)) return;
	const entries = agents["entries"];
	if (Object.hasOwn(agents, "entries") && entries !== void 0) return {
		kind: "entries",
		value: entries
	};
	const list = agents["list"];
	if (Object.hasOwn(agents, "list") && list !== void 0) return {
		kind: "list",
		value: list
	};
}
/** True when raw config explicitly owns either supported roster representation. */
function hasAgentRosterProperty(raw) {
	return readAgentRosterProperty(raw) !== void 0;
}
/** Lists unique configured agent ids. */
function listAgentIds(cfg) {
	const agents = listAgentEntries(cfg);
	if (agents.length === 0 && !hasAgentRosterProperty(cfg)) return [LEGACY_IMPLICIT_AGENT_ID];
	return [...new Set(agents.map((entry) => normalizeAgentId(entry?.id)))];
}
//#endregion
//#region src/agents/workspace-default-path.ts
/**
* Default agent workspace resolver.
*
* Derives the process workspace directory from env, profile, and home-directory state.
*/
/** Resolve the default agent workspace directory from env/profile/home state. */
function resolveDefaultAgentWorkspaceDir(env = process.env, homedir = os.homedir) {
	const workspaceDir = env.OPENCLAW_WORKSPACE_DIR?.trim();
	if (workspaceDir) return path.resolve(workspaceDir);
	if (env.OPENCLAW_STATE_DIR?.trim()) return path.join(resolveStateDir(env, homedir), "workspace");
	const home = resolveRequiredHomeDir(env, homedir);
	const profile = env.OPENCLAW_PROFILE?.trim();
	if (profile && normalizeOptionalLowercaseString(profile) !== "default") return path.join(resolveProfileStateDir(profile, env, homedir), "workspace");
	return path.join(home, ".openclaw", "workspace");
}
resolveDefaultAgentWorkspaceDir();
//#endregion
//#region src/agents/agent-scope-config.ts
/** Resolves configured agent ids, directories, workspaces, and merged agent defaults. */
let activeAgentRosterFactsBatch;
const immutableAgentRosterFacts = /* @__PURE__ */ new WeakMap();
function readAgentRosterFacts(cfg) {
	if (void 0 === cfg) return activeAgentRosterFactsBatch.facts;
	if (!isDeeplyFrozenPlainData(cfg)) return;
	const legacyOwner = getRetainedLegacyDefaultAgentId(cfg);
	let cached = immutableAgentRosterFacts.get(cfg);
	if (!cached || cached.legacyOwner !== legacyOwner) {
		cached = {
			legacyOwner,
			facts: {}
		};
		immutableAgentRosterFacts.set(cfg, cached);
	}
	return cached.facts;
}
function resolveAgentEntry(cfg, agentId) {
	const id = normalizeAgentId(agentId);
	const facts = readAgentRosterFacts(cfg);
	if (facts) {
		const found = (facts.entryByNormalizedId ??= buildAgentEntryIndex(cfg)).get(id);
		return found ? found.clone ? { ...found.entry } : found.entry : void 0;
	}
	const roster = readAgentRosterProperty(cfg);
	if (roster?.kind === "entries" && isRecord(roster.value)) {
		const entries = roster.value;
		for (const key in entries) {
			if (!Object.hasOwn(entries, key)) continue;
			const entry = entries[key];
			if (isRecord(entry) && normalizeAgentId(key) === id) return {
				...entry,
				id: key
			};
		}
		return;
	}
	if (roster?.kind === "list" && Array.isArray(roster.value)) return roster.value.find((entry) => entry !== null && typeof entry === "object" && normalizeAgentId(entry.id) === id);
}
/**
* First-match index over the projected roster for batch point lookups.
*
* Keyed entries must stay clone-on-read (callers may mutate the returned
* entry); list entries keep the original object, matching the direct
* traversal semantics of `resolveAgentEntry` outside a batch.
*/
function buildAgentEntryIndex(cfg) {
	const index = /* @__PURE__ */ new Map();
	for (const { entry, source } of listAgentEntriesWithSource(cfg)) {
		const normalizedId = normalizeAgentId(entry?.id);
		if (!index.has(normalizedId)) index.set(normalizedId, {
			clone: source.kind === "entries",
			entry
		});
	}
	return index;
}
/** Resolves merged config for one agent id. */
function resolveAgentConfig(cfg, agentId) {
	const id = normalizeAgentId(agentId);
	const entry = resolveAgentEntry(cfg, id) ?? (!hasAgentRosterProperty(cfg) && id === "main" ? { id } : void 0);
	if (!entry) return;
	const agentDefaults = cfg.agents?.defaults;
	return {
		name: readStringValue(entry.name),
		workspace: readStringValue(entry.workspace),
		agentDir: readStringValue(entry.agentDir),
		model: typeof entry.model === "string" || entry.model && typeof entry.model === "object" ? entry.model : void 0,
		...entry.models ? { models: entry.models } : {},
		...entry.params ? { params: entry.params } : {},
		...entry.runtime ? { runtime: entry.runtime } : {},
		...hasExplicitModelPolicyAllow(entry.modelPolicy) ? { modelPolicy: entry.modelPolicy } : {},
		...entry.agentRuntime ? { agentRuntime: entry.agentRuntime } : {},
		utilityModel: readStringValue(entry.utilityModel),
		decisionModel: readStringValue(entry.decisionModel),
		thinkingDefault: entry.thinkingDefault,
		verboseDefault: entry.verboseDefault ?? agentDefaults?.verboseDefault,
		toolProgressDetail: entry.toolProgressDetail ?? agentDefaults?.toolProgressDetail,
		reasoningDefault: entry.reasoningDefault,
		fastModeDefault: entry.fastModeDefault ?? agentDefaults?.fastModeDefault,
		contextInjection: entry.contextInjection,
		bootstrapMaxChars: entry.bootstrapMaxChars,
		bootstrapTotalMaxChars: entry.bootstrapTotalMaxChars,
		experimental: typeof entry.experimental === "object" && entry.experimental ? {
			...agentDefaults?.experimental,
			...entry.experimental
		} : agentDefaults?.experimental,
		skills: Array.isArray(entry.skills) ? entry.skills : void 0,
		memory: entry.memory,
		humanDelay: entry.humanDelay,
		typingMode: entry.typingMode ?? agentDefaults?.typingMode,
		tts: entry.tts,
		contextLimits: typeof entry.contextLimits === "object" && entry.contextLimits ? {
			...agentDefaults?.contextLimits,
			...entry.contextLimits
		} : agentDefaults?.contextLimits,
		heartbeat: entry.heartbeat,
		identity: entry.identity,
		groupChat: entry.groupChat,
		subagents: typeof entry.subagents === "object" && entry.subagents ? entry.subagents : void 0,
		embeddedAgent: typeof entry.embeddedAgent === "object" && entry.embeddedAgent ? entry.embeddedAgent : void 0,
		sandbox: entry.sandbox,
		tools: entry.tools
	};
}
function resolveEffectiveAgentDir(cfg, agentId, deps) {
	const id = normalizeAgentId(agentId);
	const configured = resolveAgentConfig(cfg, id)?.agentDir?.trim();
	const env = deps?.env ?? process.env;
	return configured ? resolveUserPath(configured, env, deps?.homedir) : path.join(resolveStateDir(env, deps?.homedir), "agents", id, "agent");
}
//#endregion
//#region src/config/resolution-facts.ts
const envSecretRefsByFacts = /* @__PURE__ */ new WeakMap();
function createConfigResolutionFacts(warnings, pendingEnvSecretRefs = /* @__PURE__ */ new Map(), envProvider = DEFAULT_SECRET_PROVIDER_ALIAS, resolvedEnvSecretRefs = /* @__PURE__ */ new Map()) {
	const facts = new Set(warnings.map(({ configPath }) => configPath));
	const provider = envProvider?.trim() || "default";
	if (pendingEnvSecretRefs.size > 0 || resolvedEnvSecretRefs.size > 0) {
		const envSecretRefs = /* @__PURE__ */ new Map();
		for (const [path, id] of pendingEnvSecretRefs) envSecretRefs.set(path, {
			ref: {
				source: "env",
				provider,
				id
			},
			state: "pending"
		});
		for (const [path, id] of resolvedEnvSecretRefs) envSecretRefs.set(path, {
			ref: {
				source: "env",
				provider,
				id
			},
			state: "resolved"
		});
		envSecretRefsByFacts.set(facts, envSecretRefs);
	}
	return facts;
}
//#endregion
//#region src/config/io.read-helpers.ts
function coerceConfig(value) {
	return asOptionalRecord(value) ?? {};
}
function normalizeConfigIoDeps(overrides = {}) {
	const env = overrides.env ?? process.env;
	return {
		fs: overrides.fs ?? fs$1,
		json5: overrides.json5 ?? JSON5,
		env,
		lowerPrecedenceEnv: overrides.lowerPrecedenceEnv ?? {},
		homedir: overrides.homedir ?? (() => resolveRequiredHomeDir(env, os.homedir)),
		configPath: overrides.configPath ?? "",
		logger: overrides.logger ?? console,
		measure: overrides.measure ?? (async (_name, run) => await run()),
		suppressFutureVersionWarning: overrides.suppressFutureVersionWarning ?? (isTruthyEnvValue(env.OPENCLAW_UPDATE_IN_PROGRESS) || isTruthyEnvValue(env.OPENCLAW_UPDATE_POST_CORE)),
		observe: overrides.observe ?? true
	};
}
function parseConfigJson5(raw, json5 = JSON5) {
	try {
		return {
			ok: true,
			parsed: parseJsonWithJson5Fallback(raw, json5)
		};
	} catch (err) {
		return {
			ok: false,
			error: String(err)
		};
	}
}
function resolveConfigIncludesForRead(parsed, configPath, deps, includeFileHashesForWrite, includeFileTargetsForWrite, includeFilePathsForWatch, onIncludeResolved) {
	const allowedRoots = resolveIncludeRoots(deps.env, deps.homedir);
	const recordIncludeWatchPath = (resolvedPath) => {
		includeFilePathsForWatch?.add(path.normalize(resolvedPath));
	};
	const recordIncludeTarget = (resolvedPath, canonicalPath) => {
		if (!includeFileTargetsForWrite) return;
		const normalizedPath = path.normalize(resolvedPath);
		try {
			includeFileTargetsForWrite[normalizedPath] = path.normalize(canonicalPath ?? resolveConfigIncludeWritePath({
				configPath,
				includePath: resolvedPath,
				allowedRoots
			}));
		} catch {}
	};
	return resolveConfigIncludes(parsed, configPath, {
		readFile: (candidate) => deps.fs.readFileSync(candidate, "utf-8"),
		onLexicalPath: recordIncludeWatchPath,
		onIncludeResolved,
		readFileWithGuards: ({ includePath, resolvedPath, rootRealDir }) => {
			try {
				const raw = readConfigIncludeFileWithGuards({
					includePath,
					resolvedPath,
					rootRealDir,
					ioFs: deps.fs,
					onResolvedPath: (canonicalPath) => {
						recordIncludeWatchPath(canonicalPath);
						recordIncludeTarget(resolvedPath, canonicalPath);
					}
				});
				if (includeFileHashesForWrite) includeFileHashesForWrite[path.normalize(resolvedPath)] = hashConfigIncludeRaw(raw);
				return raw;
			} catch (error) {
				const missing = collectErrorGraphCandidates(error, (current) => [current.cause]).some((candidate) => extractErrorCode(candidate) === "ENOENT");
				if (includeFileHashesForWrite && missing) includeFileHashesForWrite[path.normalize(resolvedPath)] = hashConfigIncludeRaw(null);
				if (missing) recordIncludeTarget(resolvedPath);
				throw error;
			}
		},
		parseJson: (raw) => deps.json5.parse(raw)
	}, { allowedRoots });
}
function resolveConfigForRead(resolvedIncludes, env, lowerPrecedenceEnv = {}) {
	if (resolvedIncludes && typeof resolvedIncludes === "object" && "env" in resolvedIncludes) applyConfigEnvVars(resolvedIncludes, env, { lowerPrecedenceEnv });
	const envWarnings = [];
	const pendingEnvSecretRefs = /* @__PURE__ */ new Map();
	const resolvedEnvSecretRefs = /* @__PURE__ */ new Map();
	const resolvedConfigRaw = resolveConfigEnvVars(resolvedIncludes, env, {
		onMissing: (warning) => envWarnings.push(warning),
		onPendingEnvSecretRef: (id, configPath) => pendingEnvSecretRefs.set(configPath, id),
		onResolvedEnvSecretRef: (id, configPath) => resolvedEnvSecretRefs.set(configPath, id)
	});
	return {
		resolvedConfigRaw,
		envSnapshotForRestore: cloneEnvWithPlatformSemantics(env),
		envWarnings,
		resolutionFacts: createConfigResolutionFacts(envWarnings, pendingEnvSecretRefs, coerceConfig(resolvedConfigRaw).secrets?.defaults?.env, resolvedEnvSecretRefs)
	};
}
//#endregion
//#region src/infra/zstd-codec.ts
let resolvedCodec;
/** Resolve the process runtime once; persisted readers must reject unsupported compressed data. */
function resolveZstdCodec() {
	if (resolvedCodec !== void 0) return resolvedCodec;
	if (typeof zlib.zstdCompressSync !== "function" || typeof zlib.zstdDecompressSync !== "function") {
		resolvedCodec = null;
		return resolvedCodec;
	}
	const compress = zlib.zstdCompressSync.bind(zlib);
	const decompress = zlib.zstdDecompressSync.bind(zlib);
	resolvedCodec = {
		compress: (data, level, checksum) => {
			if (level === void 0 && checksum === void 0) return compress(data);
			return compress(data, { params: {
				...level === void 0 ? {} : { [zlib.constants.ZSTD_c_compressionLevel]: level },
				...checksum === void 0 ? {} : { [zlib.constants.ZSTD_c_checksumFlag]: checksum }
			} });
		},
		decompress: (data, maxOutputLength) => decompress(data, maxOutputLength === void 0 ? void 0 : { maxOutputLength })
	};
	return resolvedCodec;
}
resolveZstdCodec();
//#endregion
//#region src/config/sessions/paths.ts
function resolveSessionTranscriptsDirForAgent(agentId, env = process.env, homedir = () => resolveRequiredHomeDir(env, os.homedir)) {
	if (!agentId?.trim()) throw new Error("Session storage path requires an explicit agent id.");
	const root = resolveStateDir(env, homedir);
	const id = normalizeAgentId(agentId);
	return path.join(root, "agents", id, "sessions");
}
var SessionStoreAgentIdRequiredError = class extends Error {
	constructor() {
		super("Session store path requires an explicit agent id.");
		this.name = "SessionStoreAgentIdRequiredError";
	}
};
/** Resolves fixed literal paths without an owner; derived or templated paths require agentId. */
function resolveSessionStorePathCore(store, opts) {
	return resolveSessionStorePathWithContext(store, opts, { cwd: process.cwd() });
}
/** Internal async readers capture their relative-path base before yielding. */
function resolveSessionStorePathWithContext(store, opts, context) {
	const env = opts?.env ?? process.env;
	const homedir = () => resolveRequiredHomeDir(env, os.homedir);
	if (!store) {
		if (!opts?.agentId?.trim()) throw new SessionStoreAgentIdRequiredError();
		const agentId = normalizeAgentId(opts.agentId);
		return path.join(resolveSessionTranscriptsDirForAgent(agentId, env, homedir), "sessions.json");
	}
	let expandedStore = store;
	if (expandedStore.includes("{agentId}")) {
		if (!opts?.agentId?.trim()) throw new SessionStoreAgentIdRequiredError();
		const agentId = normalizeAgentId(opts.agentId);
		expandedStore = expandedStore.replaceAll("{agentId}", agentId);
	}
	if (expandedStore.startsWith("~")) return path.resolve(context.cwd, expandHomePrefix(expandedStore, {
		home: resolveRequiredHomeDir(env, homedir),
		env,
		homedir
	}));
	return path.resolve(context.cwd, expandedStore);
}
//#endregion
//#region src/config/sessions/session-sqlite-target-paths.ts
/** Inventory main-file locators, including families whose main file is missing. */
function listSqliteTargetCandidatePathsInDirectory(directory) {
	let entries;
	try {
		entries = readdirSync(directory, { withFileTypes: true });
	} catch (error) {
		if (hasErrnoCode(error, "ENOENT")) return [];
		throw error;
	}
	return [...new Set(entries.filter((entry) => (entry.isFile() || entry.isSymbolicLink()) && /\.sqlite(?:-(?:wal|shm|journal))?$/u.test(entry.name)).map((entry) => path.join(directory, entry.name.replace(/-(?:wal|shm|journal)$/u, ""))))].toSorted();
}
/** Resolves only the legacy unsuffixed target, without reading ownership state. */
function resolveUnsuffixedSqliteTargetFromSessionStorePath(storePath) {
	const resolved = path.resolve(storePath);
	if (resolved.endsWith(".sqlite")) {
		const agentId = resolveAgentIdFromSqliteDatabasePath(resolved);
		return {
			path: resolved,
			...agentId ? { agentId } : { shared: true }
		};
	}
	const sessionsDir = path.dirname(resolved);
	if (path.basename(resolved) !== "sessions.json") {
		const sqliteBaseName = path.basename(resolved, path.extname(resolved)) || "openclaw-agent";
		return { path: path.join(sessionsDir, `${sqliteBaseName}.sqlite`) };
	}
	if (path.basename(sessionsDir) !== "sessions") return { path: path.join(sessionsDir, "openclaw-agent.sqlite") };
	const agentDir = path.dirname(sessionsDir);
	if (path.basename(path.dirname(agentDir)) !== "agents") return { path: path.join(sessionsDir, "openclaw-agent.sqlite") };
	return {
		agentId: normalizeAgentId(path.basename(agentDir)),
		path: path.join(agentDir, "agent", "openclaw-agent.sqlite")
	};
}
/** List inspection candidates without opening stores or assigning writable ownership. */
function listSqliteTargetCandidatePathsForSessionStorePath(storePath) {
	const unsuffixedTarget = resolveUnsuffixedSqliteTargetFromSessionStorePath(storePath);
	if (unsuffixedTarget.agentId || unsuffixedTarget.shared) return [unsuffixedTarget.path];
	const directory = path.dirname(unsuffixedTarget.path);
	const baseName = path.basename(unsuffixedTarget.path, ".sqlite");
	const candidateNames = /* @__PURE__ */ new Set([path.basename(unsuffixedTarget.path)]);
	try {
		for (const fileName of readdirSync(directory)) {
			const databaseName = fileName.replace(/-(?:wal|shm|journal)$/u, "");
			if (databaseName.startsWith(`${baseName}.`) && databaseName.endsWith(".sqlite")) candidateNames.add(databaseName);
		}
	} catch (error) {
		if (!hasErrnoCode(error, "ENOENT")) throw error;
	}
	return [...candidateNames].map((fileName) => path.join(directory, fileName));
}
/** Extracts the agent id from the canonical per-agent SQLite database path. */
function resolveAgentIdFromSqliteDatabasePath(databasePath) {
	if (path.basename(databasePath) !== "openclaw-agent.sqlite") return;
	const agentDbDir = path.dirname(databasePath);
	if (path.basename(agentDbDir) !== "agent") return;
	const agentDir = path.dirname(agentDbDir);
	if (path.basename(path.dirname(agentDir)) !== "agents") return;
	return normalizeAgentId(path.basename(agentDir));
}
//#endregion
//#region src/config/sessions/targets-configured-agents.ts
/** Lists agent ids whose session stores should be considered configured. */
function listConfiguredSessionStoreAgentIds(cfg) {
	const ids = new Set(listAgentIds(cfg).map((agentId) => normalizeAgentId(agentId)));
	const addAcpAgentId = (agentId) => {
		const raw = agentId?.trim() ?? "";
		if (!raw || raw === "*") return;
		ids.add(normalizeAgentId(raw));
	};
	addAcpAgentId(cfg.acp?.defaultAgent);
	for (const agentId of cfg.acp?.allowedAgents ?? []) addAcpAgentId(agentId);
	for (const agent of listAgentEntries(cfg)) if (agent.runtime?.type === "acp") addAcpAgentId(agent.runtime.acp?.agent ?? agent.id);
	return [...ids];
}
//#endregion
//#region src/config/agent-store-source.ts
/** Inspect authored SQLite locators without runtime config, plugin loading, or state access. */
function readAgentStorePathsFromConfig(env, stateDir) {
	const readEnv = cloneEnvWithPlatformSemantics(env);
	readEnv.OPENCLAW_STATE_DIR = stateDir;
	const configPath = resolveConfigPath(readEnv, stateDir);
	let raw = "{}";
	try {
		raw = fs$1.readFileSync(configPath, "utf8");
	} catch (error) {
		if (!hasErrnoCode(error, "ENOENT")) throw error;
	}
	const parsed = parseConfigJson5(raw);
	if (!parsed.ok) throw new Error(`Cannot parse agent storage configuration at ${configPath}.`);
	const deps = normalizeConfigIoDeps({
		env: readEnv,
		configPath,
		observe: false
	});
	const source = resolveConfigIncludesForRead(parsed.parsed, configPath, deps);
	if (!isRecord(source) || ["agents", "session"].some((key) => source[key] !== void 0 && !isRecord(source[key]))) throw new Error(`Invalid agent storage configuration at ${configPath}.`);
	const roster = readAgentRosterProperty(source);
	const hasValidStorageLocator = (entry) => isRecord(entry) && (entry.agentDir === void 0 || typeof entry.agentDir === "string");
	if (roster && (roster.kind === "entries" ? !isRecord(roster.value) || Object.values(roster.value).some((entry) => !hasValidStorageLocator(entry)) : !Array.isArray(roster.value) || roster.value.some((entry) => !hasValidStorageLocator(entry) || typeof entry.id !== "string"))) throw new Error(`Invalid agent roster at ${configPath}.`);
	if (isRecord(source.session) && source.session.store !== void 0 && typeof source.session.store !== "string") throw new Error(`Invalid session storage configuration at ${configPath}.`);
	const resolved = resolveConfigForRead(source, readEnv);
	if (resolved.envWarnings.some((warning) => warning.configPath === "session.store" || warning.configPath.endsWith(".agentDir") || warning.configPath.startsWith("agents.list[") && warning.configPath.endsWith(".id") || warning.configPath === "acp.defaultAgent" || warning.configPath.startsWith("acp.allowedAgents") || warning.configPath.endsWith(".runtime.type") || warning.configPath.endsWith(".runtime.acp.agent"))) throw new Error(`Unresolved environment reference in agent storage configuration at ${configPath}.`);
	const config = coerceConfig(resolved.resolvedConfigRaw);
	const agentIds = listAgentIds(config);
	const paths = new Set(agentIds.map((agentId) => path.join(resolveEffectiveAgentDir(config, agentId, { env: readEnv }), "openclaw-agent.sqlite")));
	const stores = new Set(listConfiguredSessionStoreAgentIds(config).map((agentId) => resolveSessionStorePathCore(config.session?.store, {
		agentId,
		env: readEnv
	})));
	for (const store of stores) for (const candidate of listSqliteTargetCandidatePathsForSessionStorePath(store)) paths.add(candidate);
	for (const directory of [readEnv.OPENCLAW_AGENT_DIR, readEnv.PI_CODING_AGENT_DIR]) if (directory?.trim()) paths.add(path.join(resolveUserPath(directory, readEnv), "openclaw-agent.sqlite"));
	return [...paths];
}
//#endregion
//#region src/state/openclaw-state-db-initialization.ts
/** Capture deletion-history evidence before a native open can create the shared database. */
function prepareStateDatabaseInitialization(pathname, env, initializationAgentPaths = []) {
	try {
		if ([pathname, resolveQuarantineStorePath(env)].some((databasePath) => resolveSqliteDatabaseFilePaths(databasePath).some((file) => fs$1.lstatSync(file, { throwIfNoEntry: false })))) return { kind: "existing" };
		const stateDir = resolveOpenClawStateDirForDatabasePath(pathname);
		const candidates = /* @__PURE__ */ new Set([...initializationAgentPaths, ...readAgentStorePathsFromConfig(env, stateDir)]);
		const agentsDir = path.join(stateDir, "agents");
		if (fs$1.lstatSync(agentsDir, { throwIfNoEntry: false })?.isSymbolicLink()) return { kind: "unavailable" };
		let entries = [];
		try {
			entries = fs$1.readdirSync(agentsDir, { withFileTypes: true });
		} catch (error) {
			if (!hasErrnoCode(error, "ENOENT")) throw error;
		}
		for (const entry of entries) {
			if (!entry.isDirectory() && !entry.isSymbolicLink()) continue;
			const agentDir = path.join(agentsDir, entry.name, "agent");
			if (entry.isSymbolicLink() || fs$1.lstatSync(agentDir, { throwIfNoEntry: false })?.isSymbolicLink()) return { kind: "unavailable" };
			candidates.add(path.join(agentDir, "openclaw-agent.sqlite"));
			for (const candidate of listSqliteTargetCandidatePathsInDirectory(agentDir)) candidates.add(candidate);
		}
		for (const candidate of candidates) {
			const family = resolveSqliteDatabaseFilePaths(candidate);
			const main = fs$1.lstatSync(candidate, { throwIfNoEntry: false });
			if (main && (!main.isFile() || main.size > 0) || family.slice(1).some((file) => fs$1.lstatSync(file, { throwIfNoEntry: false }))) return { kind: "existing" };
		}
		return { kind: "fresh" };
	} catch {
		return { kind: "unavailable" };
	}
}
//#endregion
//#region src/infra/dedupe.ts
/** Creates a bounded in-memory dedupe cache with optional TTL expiry. */
function createDedupeCache(options) {
	const ttlMs = resolveNonNegativeIntegerOption(options.ttlMs, 0);
	const maxSize = resolveNonNegativeIntegerOption(options.maxSize, 0);
	const cache = /* @__PURE__ */ new Map();
	let oldestRecordedAt = Number.POSITIVE_INFINITY;
	let newestRecordedAt = Number.NEGATIVE_INFINITY;
	let timestampsOrdered = true;
	const prune = (now) => {
		const cutoff = ttlMs > 0 ? now - ttlMs : void 0;
		if (cutoff !== void 0 && cutoff >= oldestRecordedAt) {
			oldestRecordedAt = Number.POSITIVE_INFINITY;
			for (const [entryKey, entry] of cache) if (entry.recordedAt <= cutoff) cache.delete(entryKey);
			else if (entry.recordedAt < oldestRecordedAt) {
				oldestRecordedAt = entry.recordedAt;
				if (timestampsOrdered) break;
			}
		}
		if (maxSize <= 0) {
			cache.clear();
			oldestRecordedAt = Number.POSITIVE_INFINITY;
			return;
		}
		pruneMapToMaxSize(cache, maxSize);
	};
	const hasUnexpired = (key, now, touchOnRead) => {
		const existing = cache.get(key);
		if (!existing) return false;
		if (ttlMs > 0 && now - existing.recordedAt >= ttlMs) {
			cache.delete(key);
			return false;
		}
		if (touchOnRead) {
			existing.recordedAt = now;
			cache.delete(key);
			cache.set(key, existing);
		}
		return true;
	};
	return {
		check: (key, now, ownerToken) => {
			if (!key) return false;
			const checkedAt = now ?? Date.now();
			if (ttlMs > 0) {
				if (checkedAt < oldestRecordedAt) oldestRecordedAt = checkedAt;
				if (timestampsOrdered) {
					timestampsOrdered = checkedAt >= newestRecordedAt;
					newestRecordedAt = checkedAt;
				}
			}
			if (hasUnexpired(key, checkedAt, true)) return true;
			cache.set(key, {
				recordedAt: checkedAt,
				...ownerToken ? { ownerToken } : {}
			});
			prune(checkedAt);
			return false;
		},
		peek: (key, now = Date.now()) => {
			if (!key) return false;
			return hasUnexpired(key, now, false);
		},
		delete: (key, ownerToken) => {
			if (!key) return;
			if (ownerToken && cache.get(key)?.ownerToken !== ownerToken) return;
			cache.delete(key);
		},
		clear: () => {
			cache.clear();
			oldestRecordedAt = Number.POSITIVE_INFINITY;
			newestRecordedAt = Number.NEGATIVE_INFINITY;
			timestampsOrdered = true;
		},
		size: () => cache.size
	};
}
//#endregion
//#region src/state/openclaw-state-db-permissions.ts
const OPENCLAW_STATE_DIR_MODE = 448;
const OPENCLAW_STATE_FILE_MODE = 384;
const stateDbLog$2 = createSubsystemLogger("state/db");
/** Targets already warned about, so chmod-less filesystems warn once per path. */
const chmodWarnedTargets = createDedupeCache({
	ttlMs: 0,
	maxSize: 4096
});
function bestEffortChmodSync(target, mode) {
	const result = applyPrivateModeSync(target, mode);
	if (result.applied || chmodWarnedTargets.check(target)) return;
	stateDbLog$2.warn(`skipped permission hardening for ${target}: ${String(result.error)}`);
}
function ensureOpenClawStatePermissions(pathname, env, options = {}) {
	const dir = path.dirname(pathname);
	const defaultDir = resolveOpenClawStateSqliteDir(env);
	const isDefaultStateDatabase = path.resolve(pathname) === path.resolve(resolveOpenClawStateSqlitePath(env));
	if (isDefaultStateDatabase && dir !== defaultDir) throw new Error(`OpenClaw state database path resolved outside its state dir: ${pathname}`);
	const dirExisted = existsSync(dir);
	if (options.createDirectory) mkdirSync(dir, {
		recursive: true,
		mode: OPENCLAW_STATE_DIR_MODE
	});
	if (isDefaultStateDatabase || !dirExisted) bestEffortChmodSync(dir, OPENCLAW_STATE_DIR_MODE);
	for (const candidate of resolveSqliteDatabaseFilePaths(pathname)) if (existsSync(candidate)) try {
		bestEffortChmodSync(candidate, OPENCLAW_STATE_FILE_MODE);
	} catch (error) {
		if (candidate === pathname || !hasErrnoCode(error, "ENOENT")) throw error;
	}
}
//#endregion
//#region src/state/openclaw-state-db-open.ts
const stateDbLog$1 = createSubsystemLogger("state/db");
function assertStateDatabaseIntegrityBeforeMutation(database, pathname) {
	const contentVersion = readStateSchemaMigrationVersion(database);
	const hasApplicationSchema = database.prepare("SELECT 1 FROM sqlite_master WHERE name NOT LIKE 'sqlite_%' LIMIT 1").get();
	if (contentVersion === 0 && hasApplicationSchema || contentVersion > 0 && contentVersion < 19) stateDbLog$1.info("state database schema migration pending; verifying integrity first", {
		fromVersion: contentVersion,
		path: pathname,
		toVersion: 19
	});
	if (contentVersion !== 19) assertSqliteIntegrity(database, pathname);
}
function openUnpublishedStateDatabase(params) {
	const open = (schemaOwned) => {
		const existingIdentity = getSqliteWorkerExistingDatabaseIdentity(params.pathname);
		const original = params.existingSchema || existingIdentity ? statSync(params.pathname, { bigint: true }) : statSync(params.pathname, {
			bigint: true,
			throwIfNoEntry: false
		});
		if (existingIdentity && (!original || `file:${original.dev}:${original.ino}` !== existingIdentity)) throw new Error("SQLite database file identity changed before existing-only open");
		if (!original && !schemaOwned) return withStateDatabaseSchemaMaintenance({
			databasePath: params.pathname,
			busyTimeoutMs: params.busyTimeoutMs
		}, () => open(true));
		if (original && !original.isFile()) throw new Error(`Existing shared-state database must be a regular file: ${params.pathname}`);
		const initialization = prepareStateDatabaseInitialization(params.pathname, params.env, params.initializationAgentPaths);
		if (!original) {
			quarantineOrphanedSqliteSidecars(params.pathname);
			ensureOpenClawStatePermissions(params.pathname, params.env, { createDirectory: true });
		}
		return openNativeStateDatabase(params, initialization, original);
	};
	return open(false);
}
function openNativeStateDatabase(params, initialization, original) {
	const { busyTimeoutMs, lockFailureReporting } = params;
	const assertSameFile = () => {
		if (original) {
			const current = statSync(params.pathname, { bigint: true });
			if (!current.isFile() || current.dev !== original.dev || current.ino !== original.ino || current.birthtimeNs !== original.birthtimeNs) throw new Error(`Existing shared-state database generation changed: ${params.pathname}`);
		}
	};
	const db = openTrackedStateDatabase(params.pathname, {
		existingOnly: original !== void 0,
		expectedIdentity: original ? `file:${original.dev}:${original.ino}` : void 0
	});
	let walMaintenance;
	try {
		assertSameFile();
		enableNodeSqliteKyselyStatementCache(db);
		setSqliteBusyTimeout(db, busyTimeoutMs);
		assertOpenClawStateWriteAllowed({
			database: db,
			databasePath: params.pathname,
			env: params.env
		});
		if (params.existingSchema) {
			assertSameFile();
			params.ensureSchema(db, initialization);
			assertSameFile();
			return {
				db,
				path: params.pathname,
				walMaintenance: {
					checkpoint: () => false,
					close: () => true,
					reclaimFreePages: createSqliteWalReclamationResult
				}
			};
		}
		ensureOpenClawStatePermissions(params.pathname, params.env);
		const maintenance = runWithSqliteBusyTimeout(db, busyTimeoutMs, () => {
			assertSupportedStateSchemaVersion(db, params.pathname);
			assertStateDatabaseIntegrityBeforeMutation(db, params.pathname);
			configureSqlitePreSchemaPragmas(db, { busyTimeoutMs });
			walMaintenance = configureSqliteConnectionPragmas(db, {
				busyTimeoutMs,
				databaseLabel: "openclaw-state",
				databasePath: params.pathname,
				onCheckpointError: (error) => stateDbLog$1.warn("Shared-state WAL maintenance failed", {
					error: formatErrorMessage(error),
					path: params.pathname,
					checkpoint: walMaintenance?.health
				}),
				runMaintenance: (operation) => {
					assertStateDatabaseAccessAllowed(params.pathname);
					return operation();
				},
				foreignKeys: true,
				synchronous: "NORMAL"
			});
			params.ensureSchema(db, initialization);
			return walMaintenance;
		}, { lockFailureReporting });
		ensureOpenClawStatePermissions(params.pathname, params.env);
		assertSameFile();
		return {
			db,
			path: params.pathname,
			walMaintenance: maintenance
		};
	} catch (error) {
		const errors = openClawStateDatabaseCache.closeUnpublishedOpenClawStateDatabaseHandle({
			db,
			path: params.pathname,
			walMaintenance
		});
		if (error instanceof Error && (isSqliteSchemaVersionError(error) || isTerminalSqliteIntegrityError(error))) params.recordOpenFailure(params.pathname, error);
		if (errors.length > 0) throw createSqliteLifecycleAggregateError([error, ...errors], `OpenClaw state database acquisition and cleanup failed for ${params.pathname}.`, error);
		throw error;
	}
}
//#endregion
//#region src/state/openclaw-state-db-read-connection.ts
const retainedReaders = /* @__PURE__ */ new Map();
let unregisterExitClose$1;
function retireReader(reader) {
	clearTimeout(reader.idleTimer);
	reader.retiring = true;
	reader.connection.close();
	retainedReaders.delete(reader.identity.key);
	if (!retainedReaders.size) {
		unregisterExitClose$1?.();
		unregisterExitClose$1 = void 0;
	}
}
function scheduleReaderRetirement(reader) {
	if (retainedReaders.get(reader.identity.key) !== reader) return;
	clearTimeout(reader.idleTimer);
	reader.idleTimer = runInSqliteMaintenanceContext(() => setTimeout(() => {
		try {
			retireReader(reader);
		} catch (error) {
			process.emitWarning(`Idle shared-state reader cleanup failed: ${String(error)}`);
			scheduleReaderRetirement(reader);
		}
	}, SQLITE_IDLE_HANDLE_TTL_MS));
	reader.idleTimer.unref?.();
}
/** The host joins this receipt before allowing replacement or deletion of live state. */
function closeRetainedOpenClawStateReadConnections(identity) {
	const errors = [];
	for (const reader of retainedReaders.values()) if (identity === void 0 || reader.identity.key === identity) try {
		retireReader(reader);
	} catch (error) {
		errors.push(error);
	}
	throwSqliteLifecycleErrors(errors, "Retained shared-state reader cleanup failed.");
}
function borrowStateReadConnection(pathname, expectedIdentity) {
	isExistingOpenClawStateSchema(pathname);
	const identity = readDatabasePathIdentitySync(pathname);
	if (expectedIdentity !== void 0) assertExistingDatabaseIdentity(pathname, expectedIdentity);
	for (const previous of retainedReaders.values()) if (previous.identity.canonicalPath === identity.canonicalPath && previous.identity.key !== identity.key) retireReader(previous);
	if (!identity.key.startsWith("file:")) return openStateReadConnectionResult(pathname, pathname, expectedIdentity);
	let reader = retainedReaders.get(identity.key);
	if (reader?.retiring || reader && !reader.connection.database.db.isOpen) {
		retireReader(reader);
		reader = void 0;
	}
	if (!reader) {
		const opening = openStateReadConnectionResult(pathname, pathname, identity.key);
		if (opening.status === "unavailable") return opening;
		reader = {
			connection: opening.value,
			identity,
			retiring: false
		};
		retainedReaders.set(identity.key, reader);
		unregisterExitClose$1 ??= registerSqliteCacheExitClose(closeRetainedOpenClawStateReadConnections);
	}
	const retained = reader;
	clearTimeout(retained.idleTimer);
	return {
		status: "available",
		value: {
			database: {
				db: retained.connection.database.db,
				path: pathname
			},
			close(keep) {
				if (keep && retained.connection.database.db.isOpen && !retained.connection.database.db.isTransaction) scheduleReaderRetirement(retained);
				else retireReader(retained);
				return true;
			}
		}
	};
}
var SnapshotCleanupIncompleteError = class extends Error {};
function assertStateReadSchema(database, pathname) {
	assertStateReadSchemaForPolicy(database, pathname, isExistingOpenClawStateSchema(pathname, database));
}
function assertStateReadSchemaForPolicy(database, pathname, existingSchema) {
	if (existingSchema) assertExistingOpenClawStateRuntimeSchema(database, pathname);
	else assertSupportedStateSchemaVersion(database, pathname);
}
function withOpenClawStateReadOnlyLocation(operation, pathname, source, openStateSchemaReadAdmission, expectedIdentity, snapshotRoot, retainConnection = false) {
	const result = readOpenClawStateReadOnlyLocation(operation, pathname, source, openStateSchemaReadAdmission, expectedIdentity, snapshotRoot, retainConnection);
	if (result.status === "unavailable") throw result.error;
	return result.value;
}
/** Return a failed read only after its native reader and admission have settled. */
function readOpenClawStateReadOnlyLocation(operation, pathname, source, openStateSchemaReadAdmission, expectedIdentity, snapshotRoot, retainConnection = false) {
	const opening = retainConnection && source === pathname && !snapshotRoot && !process.versions.bun ? borrowStateReadConnection(pathname, expectedIdentity) : openStateReadConnectionResult(pathname, source, expectedIdentity, snapshotRoot, true);
	if (opening.status === "unavailable") return opening;
	const opened = opening.value;
	const errors = [];
	let closeAdmission;
	let result;
	try {
		closeAdmission = openStateSchemaReadAdmission?.(opened.database.db);
		const existingSchema = isExistingOpenClawStateSchema(pathname, opened.database.db);
		try {
			runSqliteReadOperationSync(opened.database.db, () => {
				assertStateReadSchemaForPolicy(opened.database.db, pathname, existingSchema);
				admitSqliteSchema(opened.database.db);
			});
			result = {
				status: "available",
				value: operation(opened.database)
			};
		} catch (error) {
			result = {
				status: "unavailable",
				error
			};
		}
		const location = typeof source === "string" ? source : source.location;
		if (result.status === "available" && location === pathname && isPromiseLike(result.value)) throw new SqliteCoordinatorError("SQLite source read must remain synchronous");
		assertTransactionUsable(opened.database.db);
	} catch (error) {
		errors.push(error);
	}
	try {
		closeAdmission?.();
	} catch (error) {
		errors.push(error);
	}
	try {
		if (!opened.close(errors.length === 0 && result?.status === "available")) throw new SnapshotCleanupIncompleteError("Shared-state snapshot cleanup is incomplete.");
	} catch (error) {
		errors.push(error);
	}
	if (errors.length) {
		if (result?.status === "unavailable" && !errors.includes(result.error)) errors.unshift(result.error);
		throwSqliteLifecycleErrors(errors, "Shared-state read and reader cleanup failed.");
	}
	return result;
}
function openOpenClawStateReadOnlyLocation(pathname, source) {
	const connection = openOpenClawStateReadConnection(pathname, source);
	try {
		runSqliteReadOperationSync(connection.database.db, () => {
			assertStateReadSchema(connection.database.db, pathname);
			admitSqliteSchema(connection.database.db);
		});
	} catch (error) {
		try {
			connection.close();
		} catch (cleanupError) {
			throwSqliteLifecycleErrors([error, cleanupError], "Shared-state reader admission and cleanup failed.");
		}
		throw error;
	}
	return connection;
}
/** Own one native reader; callers retain their runtime or maintenance schema policy. */
function openOpenClawStateReadConnection(pathname, source, expectedIdentity, snapshotRoot) {
	const result = openStateReadConnectionResult(pathname, source, expectedIdentity, snapshotRoot);
	if (result.status === "unavailable") throw result.error;
	return result.value;
}
function openStateReadConnectionResult(pathname, source, expectedIdentity, snapshotRoot, checkSchemaPolicy = false) {
	const snapshot = typeof source === "string" ? void 0 : source;
	const location = typeof source === "string" ? source : source.location;
	const options = {
		readOnly: true,
		timeout: OPENCLAW_SQLITE_BUSY_TIMEOUT_MS
	};
	let releaseToken;
	const cleanupFailedOpen = (error) => {
		const errors = [error];
		try {
			releaseToken?.();
		} catch (cleanupError) {
			errors.push(cleanupError);
		}
		try {
			if (snapshot && !snapshot.cleanup()) errors.push(new SnapshotCleanupIncompleteError("Shared-state snapshot cleanup is incomplete."));
		} catch (cleanupError) {
			errors.push(cleanupError);
		}
		if (errors.length > 1) throw createSqliteLifecycleAggregateError(errors, "Shared-state reader open and cleanup failed.", error);
	};
	let native;
	try {
		if (expectedIdentity !== void 0) assertExistingDatabaseIdentity(location, expectedIdentity);
		releaseToken = snapshotRoot ? acquireSqliteSnapshotReadToken(snapshotRoot) : void 0;
		if (checkSchemaPolicy) isExistingOpenClawStateSchema(pathname);
		if (location === pathname) native = openTrackedStateDatabaseResult(pathname, options);
		else try {
			native = {
				status: "available",
				database: openNodeSqliteDatabase(location, options)
			};
		} catch (error) {
			native = {
				status: "unavailable",
				error
			};
		}
	} catch (error) {
		cleanupFailedOpen(error);
		throw error;
	}
	if (native.status === "unavailable") {
		cleanupFailedOpen(native.error);
		return native;
	}
	const db = native.database;
	let closed = false;
	const database = {
		db,
		path: pathname,
		afterClose: () => {
			releaseToken?.();
			if (snapshot && !snapshot.cleanup()) throw new SnapshotCleanupIncompleteError("Shared-state snapshot cleanup is incomplete.");
		}
	};
	const connection = {
		database: {
			db,
			path: pathname
		},
		close() {
			if (closed) return false;
			const errors = openClawStateDatabaseCache.closeOpenClawStateDatabaseHandle(database);
			if (errors.length === 1 && errors[0] instanceof SnapshotCleanupIncompleteError) return false;
			throwSqliteLifecycleErrors(errors, "Shared-state reader cleanup failed.");
			closed = true;
			return true;
		}
	};
	try {
		if (expectedIdentity !== void 0) assertExistingDatabaseIdentity(location, expectedIdentity);
	} catch (error) {
		try {
			if (!connection.close()) throw new SnapshotCleanupIncompleteError("Shared-state snapshot cleanup is incomplete.");
		} catch (cleanupError) {
			throw createSqliteLifecycleAggregateError([error, cleanupError], "Shared-state reader identity and cleanup failed.", error);
		}
		throw error;
	}
	return {
		status: "available",
		value: connection
	};
}
//#endregion
//#region src/state/openclaw-state-db-transaction.ts
const managedStateTransactions = resolveGlobalSingleton(Symbol.for("openclaw.managedStateTransactions"), () => /* @__PURE__ */ new WeakSet());
/** Only the synchronous transaction owner may lend its uncommitted authority rows. */
function isManagedStateTransaction(database) {
	return database.isTransaction && managedStateTransactions.has(database);
}
function runManagedStateTransaction(database, operation, options) {
	if (database.isTransaction && !managedStateTransactions.has(database)) throw new Error("Cannot join an unmanaged shared-state transaction; enter through runOpenClawStateWriteTransaction before BEGIN.");
	const transaction = () => withSqlitePostCommitPublications(database, () => {
		const outer = !database.isTransaction;
		if (outer) managedStateTransactions.add(database);
		try {
			return runSqliteImmediateTransactionSync(database, operation, options);
		} finally {
			if (outer) managedStateTransactions.delete(database);
		}
	});
	return options.busyTimeoutMs === void 0 ? transaction() : runWithSqliteBusyTimeout(database, options.busyTimeoutMs, transaction);
}
//#endregion
//#region src/state/openclaw-state-db-readonly-reuse.ts
/** Current-authority guards can borrow their writer; discovery sees committed rows. */
function withCachedOpenClawStateDatabaseReadOnly(operation, pathname, currentAuthority) {
	const opened = openClawStateDatabaseCache.getCachedOpenClawStateDatabase(pathname, { readOnly: true });
	if (!opened?.db.isOpen) return { reused: false };
	const ownedTransaction = currentAuthority && isManagedStateTransaction(opened.db);
	if (opened.db.isTransaction && !ownedTransaction) return { reused: false };
	try {
		assertStateReadSchema(opened.db, pathname);
		observeOpenClawDatabaseMaintenanceResource(opened.db);
		const value = operation(opened);
		if (ownedTransaction && isPromiseLike(value)) throw new SqliteCoordinatorError("SQLite current-authority read must remain synchronous");
		return {
			reused: true,
			value
		};
	} catch (error) {
		openClawStateDatabaseCache.evictOpenClawStateDatabaseAfterCorruption(opened, error);
		throw error;
	}
}
//#endregion
//#region src/state/openclaw-state-read-scope.ts
/** Closing retains custody for accepted readers, but never admits a new reader. */
function assertRetainedReadScopeAdmission(pathname, scopes) {
	if (scopes.some((scope) => scope?.path === pathname && (!scope.active || scope.work.isClosing))) throw new StateDatabaseReadAdmissionInvalidatedError("Shared-state read scope is closing or closed; retry the operation in a current scope.");
}
resolveGlobalSingleton(Symbol.for("openclaw.workerTaskNativeSection"), () => new AsyncLocalStorage());
channel("openclaw.worker.task");
AsyncLocalStorage.snapshot();
//#endregion
//#region src/state/openclaw-state-db-readonly.ts
const artifactPreservingReads = resolveGlobalSingleton(Symbol.for("openclaw.artifactPreservingStateReads"), () => new AsyncLocalStorage());
const disposableStateReads = resolveGlobalSingleton(Symbol.for("openclaw.disposableStateReads"), () => new AsyncLocalStorage());
const stateSnapshotReads = resolveGlobalSingleton(Symbol.for("openclaw.stateSnapshotReads"), () => new AsyncLocalStorage());
function requiresArtifactPreservingSnapshot(pathname) {
	return isArtifactPreservingStateRead() && !disposableStateReads.getStore()?.some((scope) => scope.active && scope.path === pathname);
}
function isArtifactPreservingStateRead() {
	return artifactPreservingReads.getStore() === true;
}
const synchronousReadSnapshots = resolveGlobalSingleton(Symbol.for("openclaw.synchronousStateReadSnapshots"), () => ({ current: void 0 }));
function resolveReadOnlyPath(options) {
	const pathname = path.resolve(options.path ?? resolveOpenClawStateSqlitePath(options.env ?? process.env));
	assertRetainedReadScopeAdmission(pathname, [stateSnapshotReads.getStore(), ...disposableStateReads.getStore() ?? []]);
	isExistingOpenClawStateSchema(pathname);
	return pathname;
}
function withOpenClawStateDatabaseReadOnlyIfOpen(operation, pathname, currentAuthority = false) {
	const snapshot = stateSnapshotReads.getStore();
	if (snapshot?.active && snapshot.path === pathname) {
		openClawStateDatabaseCache.assertOpenClawStateDatabaseFreshOpenAllowedAtPath(pathname, snapshot.env);
		return {
			reused: true,
			value: withOpenClawStateReadOnlyLocation(operation, pathname, snapshot.location)
		};
	}
	return withCachedOpenClawStateDatabaseReadOnly(operation, pathname, currentAuthority);
}
function withFreshOpenClawStateDatabaseReadOnly(operation, options, pathname) {
	const env = options.env ?? process.env;
	openClawStateDatabaseCache.assertOpenClawStateDatabaseFreshOpenAllowedAtPath(pathname, env);
	const readers = synchronousReadSnapshots.current;
	if (readers && requiresArtifactPreservingSnapshot(pathname)) {
		let opened = readers.get(pathname);
		if (!opened) {
			opened = openOpenClawStateReadOnlyLocation(pathname, prepareSqliteReadOnlyLocationSync(pathname));
			readers.set(pathname, opened);
		}
		assertStateReadSchema(opened.database.db, pathname);
		const result = operation(opened.database);
		if (isPromiseLike(result)) throw new SqliteCoordinatorError("SQLite metadata snapshot read must remain synchronous");
		return result;
	}
	return withOpenClawStateReadOnlyLocation(operation, pathname, (requiresArtifactPreservingSnapshot(pathname) ? prepareSqliteReadOnlyLocationSync(pathname) : void 0) ?? pathname);
}
/** Read existing shared state while preserving non-missing filesystem failures. */
function withExistingOpenClawStateDatabaseReadOnly(operation, options = {}) {
	const pathname = resolveReadOnlyPath(options);
	if (synchronousReadSnapshots.current?.has(pathname)) return withFreshOpenClawStateDatabaseReadOnly(operation, options, pathname);
	const reused = withOpenClawStateDatabaseReadOnlyIfOpen(operation, pathname);
	if (reused.reused) return reused.value;
	const existingPath = existingPathOrUndefined(pathname);
	return existingPath === void 0 ? void 0 : withFreshOpenClawStateDatabaseReadOnly(operation, options, existingPath);
}
//#endregion
//#region src/infra/sqlite-index-schema.ts
const SQLITE_IDENTIFIER_PATTERN = /^[A-Za-z_][A-Za-z0-9_]*$/u;
/**
* Verify the whole file before schema convergence. Physical corruption belongs
* to explicit Doctor maintenance, including when only an index is damaged.
*/
function verifyAndRepairCanonicalSqliteIndexes(db, databaseLabel, schemaSql, options = {}) {
	return runSqliteIntegrityOperationSync(verifyAndRepairCanonicalSqliteIndexSteps(db, databaseLabel, schemaSql, options));
}
function* verifyAndRepairCanonicalSqliteIndexSteps(db, databaseLabel, schemaSql, options = {}) {
	const { diagnostics, reuseIntegrity, integrityTables, ...repairOptions } = options;
	if (reuseIntegrity) {
		if (diagnostics) diagnostics.integrityGateOutcome = "cached";
	} else yield* sqliteIntegrityCheckSteps(db, databaseLabel, diagnostics, integrityTables);
	const indexesStartedAt = performance$1.now();
	const repairedIndexes = repairCanonicalSqliteIndexes(db, databaseLabel, schemaSql, {
		...repairOptions,
		verifyPhysicalIntegrity: false
	});
	if (diagnostics) {
		diagnostics.canonicalIndexMs = Math.floor(performance$1.now() - indexesStartedAt);
		diagnostics.repairedIndexCount = repairedIndexes.length;
	}
	return repairedIndexes;
}
/**
* Restore every named index when SQLite's IF NOT EXISTS semantics preserve a
* same-name definition that no longer matches the committed schema.
*/
function repairCanonicalSqliteIndexes(db, databaseLabel, schemaSql, options = {}) {
	const indexes = getCanonicalSqliteNamedIndexContracts(schemaSql);
	const indexesByTable = /* @__PURE__ */ new Map();
	const repairIndexes = /* @__PURE__ */ new Set();
	runSqlitePinnedReadSnapshotSync(db, () => {
		for (const index of indexes) {
			assertSqliteIdentifier(index.name);
			assertSqliteIdentifier(index.tableName);
			if (!db.prepare("SELECT 1 FROM main.sqlite_schema WHERE type = 'table' AND name = ?").get(index.tableName)) continue;
			const tableIndexes = indexesByTable.get(index.tableName) ?? [];
			tableIndexes.push(index);
			indexesByTable.set(index.tableName, tableIndexes);
			const actual = collectSqliteNamedIndexContract(db, index.name);
			if (JSON.stringify(actual) !== JSON.stringify(index.fingerprint)) repairIndexes.add(index);
		}
		assertNoUnexpectedUniqueIndexes(db, databaseLabel, schemaSql, indexesByTable);
		if (options.verifyPhysicalIntegrity !== false) assertSqliteIntegrity(db, databaseLabel);
	});
	if (repairIndexes.size === 0) return [];
	const savepoint = "repair_canonical_indexes";
	let activeIndex;
	db.exec(`SAVEPOINT ${savepoint};`);
	try {
		for (const index of repairIndexes) {
			activeIndex = index;
			const probeName = findUnusedProbeIndexName(db, index.name);
			try {
				db.exec(createIndexSql(index, probeName));
			} catch (error) {
				if (options.allowMissingColumns && isMissingColumnError(error)) {
					repairIndexes.delete(index);
					continue;
				}
				throw error;
			}
			db.exec(`DROP INDEX IF EXISTS main.${index.name};`);
			db.exec(createIndexSql(index, index.name));
			db.exec(`DROP INDEX main.${probeName};`);
		}
		if (repairIndexes.size === 0) {
			db.exec(`RELEASE SAVEPOINT ${savepoint};`);
			return [];
		}
		for (const tableName of indexesByTable.keys()) assertSqliteTableIntegrity(db, databaseLabel, tableName);
		assertSqliteIntegrity(db, databaseLabel);
		options.validateAfterRepair?.();
		db.exec(`RELEASE SAVEPOINT ${savepoint};`);
	} catch (error) {
		try {
			db.exec(`ROLLBACK TO SAVEPOINT ${savepoint};`);
		} finally {
			db.exec(`RELEASE SAVEPOINT ${savepoint};`);
		}
		if (error instanceof Error && isTerminalSqliteIntegrityError(error)) throw error;
		const detail = error instanceof Error ? error.message : String(error);
		throw new Error(`SQLite canonical index ${activeIndex?.name ?? "repair"} failed for ${databaseLabel}: ${detail}`, { cause: error });
	}
	return [...repairIndexes].map((index) => index.name).toSorted();
}
function assertNoUnexpectedUniqueIndexes(db, databaseLabel, schemaSql, indexesByTable) {
	for (const tableName of getCanonicalSqliteTableNames(schemaSql)) {
		assertSqliteIdentifier(tableName);
		if (!db.prepare("SELECT 1 FROM main.sqlite_schema WHERE type = 'table' AND name = ?").get(tableName)) continue;
		const canonicalIndexNames = new Set((indexesByTable.get(tableName) ?? []).map((index) => index.name));
		const unexpected = db.prepare(`PRAGMA main.index_list(${tableName})`).all().find((index) => index.unique === 1 && index.origin === "c" && !canonicalIndexNames.has(index.name));
		if (unexpected) throw new Error(`SQLite schema is incomplete or noncanonical for ${databaseLabel}: unexpected unique index ${unexpected.name}`);
	}
}
function createIndexSql(index, name) {
	assertSqliteIdentifier(name);
	return `${index.unique ? "CREATE UNIQUE INDEX" : "CREATE INDEX"} main.${name} ${index.definition};`;
}
function findUnusedProbeIndexName(db, canonicalName) {
	const prefix = `openclaw_probe_${canonicalName}`;
	for (let suffix = 0; suffix < 100; suffix += 1) {
		const candidate = suffix === 0 ? prefix : `${prefix}_${suffix}`;
		if (!db.prepare("SELECT 1 AS found FROM main.sqlite_schema WHERE name = ?").get(candidate)) return candidate;
	}
	throw new Error(`could not allocate a probe index name for ${canonicalName}`);
}
function assertSqliteIdentifier(identifier) {
	if (!SQLITE_IDENTIFIER_PATTERN.test(identifier)) throw new Error(`invalid SQLite identifier: ${identifier}`);
}
function isMissingColumnError(error) {
	return error instanceof Error && error.code === "ERR_SQLITE_ERROR" && /^no such column:/iu.test(error.message);
}
//#endregion
//#region src/state/agent-deletion-journal-history.ts
function hasPreJournalStateSchema(database) {
	if (readStateSchemaContentVersion(database) !== 1 || tableExists(database, "config_machine_state") || tableExists(database, "agent_database_leases") || !tableExists(database, "agent_databases") || !tableExists(database, "migration_sources")) return false;
	const db = getNodeSqliteKysely(database);
	const metadata = executeSqliteQueryTakeFirstSync(database, db.selectFrom("schema_meta").selectAll().where("meta_key", "=", "primary"));
	return metadata?.role === "global" && metadata.schema_version === 1 && metadata.agent_id === null && !executeSqliteQueryTakeFirstSync(database, db.selectFrom("migration_sources").select("source_key").where("target_table", "=", "agent_deletion_journal").limit(1));
}
//#endregion
//#region src/state/openclaw-state-db-schema-additive.ts
function resolveLegacyManagedImageRoot(recordJson) {
	if (typeof recordJson !== "string") return null;
	const record = safeParseJsonRecord(recordJson);
	if (!record || !isRecord(record.original)) return null;
	const mediaRoot = record.original.mediaRoot;
	if (typeof mediaRoot === "string" && mediaRoot.trim()) return path.resolve(mediaRoot);
	const originalPath = record.original.path;
	if (typeof originalPath !== "string" || !originalPath.trim()) return null;
	const resolvedOriginalPath = path.resolve(originalPath);
	return path.dirname(path.dirname(path.dirname(resolvedOriginalPath)));
}
function backfillLegacyManagedImageRoots(db) {
	const rows = db.prepare("SELECT attachment_id, record_json FROM managed_outgoing_image_records").all();
	const updateRoot = db.prepare("UPDATE managed_outgoing_image_records SET original_media_root = ? WHERE attachment_id = ?");
	const deleteRecord = db.prepare("DELETE FROM managed_outgoing_image_records WHERE attachment_id = ?");
	for (const row of rows) {
		const mediaRoot = resolveLegacyManagedImageRoot(row.record_json);
		if (mediaRoot) updateRoot.run(mediaRoot, row.attachment_id);
		else deleteRecord.run(row.attachment_id);
	}
}
function ensureWorkerSessionToolStateSchema(db) {
	db.exec([extractSqliteTableSchema(OPENCLAW_STATE_SCHEMA_SQL, "worker_turn_tool_authorities"), extractSqliteTableSchema(OPENCLAW_STATE_SCHEMA_SQL, "worker_session_tool_operations")].join("\n"));
}
/**
* Add the feature-owned first-use columns that a STRICT rebuild cannot skip.
*
* These columns normally stay absent until their owning feature first writes
* them, and the persistent schema contract accepts that shape. The STRICT
* table rebuild is the one caller that cannot: it recreates each table from
* canonical SQL, which already declares these columns, so a database missing
* them fails the canonical column check and rolls the entire repair back.
* Ensuring them immediately before that rebuild matches the shape the rebuild
* produces anyway, and stays scoped to databases old enough to need it.
*/
function ensureFirstUseAdditiveStateColumnsForStrictMigration(db) {
	for (const { columnName, dataType, tableName } of CLAW_FIRST_USE_ADDITIVE_STATE_COLUMN_DEFINITIONS) ensureColumn(db, tableName, `${columnName} ${dataType}`);
}
function ensureColumns(db, definitions) {
	const added = [];
	for (const [tableName, definition] of definitions) {
		const columnName = definition.trim().split(/\s+/, 1)[0];
		if (columnName && ensureColumn(db, tableName, definition)) added.push({
			tableName,
			columnName
		});
	}
	return added;
}
/** Runtime pairs new columns with their transforms; full historical repair stays explicit. */
function ensureAdditiveStateColumns(db, scope) {
	const repairHistoricalRows = scope === "repair";
	ensureWorkerSessionToolStateSchema(db);
	for (const { columnName, dataType, tableName } of CLAW_STARTUP_ADDITIVE_STATE_COLUMN_DEFINITIONS) ensureColumn(db, tableName, `${columnName} ${dataType}`);
	if (ensureColumn(db, ...ORDERED_STARTUP_ADDITIVE_STATE_COLUMNS.packageUpdatedAt[0])) db.exec("UPDATE claw_package_refs SET updated_at_ms = installed_at_ms;");
	ensureColumns(db, ORDERED_STARTUP_ADDITIVE_STATE_COLUMNS.packageIntegrity);
	const addedDiagnosticEventSequence = ensureColumn(db, ...ORDERED_STARTUP_ADDITIVE_STATE_COLUMNS.diagnosticSequence[0]);
	if (addedDiagnosticEventSequence) db.exec(`
      WITH ranked AS (
        SELECT
          rowid AS event_rowid,
          ROW_NUMBER() OVER (
            PARTITION BY scope
            ORDER BY created_at ASC, rowid ASC
          ) AS sequence
        FROM diagnostic_events
      )
      UPDATE diagnostic_events
      SET sequence = (
        SELECT ranked.sequence
        FROM ranked
        WHERE ranked.event_rowid = diagnostic_events.rowid
      );
    `);
	if (addedDiagnosticEventSequence || repairHistoricalRows) db.exec("DROP INDEX IF EXISTS idx_diagnostic_events_scope_created;");
	const addedCronLogColumns = ensureColumns(db, ORDERED_STARTUP_ADDITIVE_STATE_COLUMNS.cronRunLogs);
	if (repairHistoricalRows || addedCronLogColumns.some(({ tableName }) => tableName === "cron_run_logs")) backfillCronRunLogEntryJson(db);
	if (ensureColumns(db, ORDERED_STARTUP_ADDITIVE_STATE_COLUMNS.acpReplay).length > 0 || repairHistoricalRows) backfillAcpReplayEstimatedBytes(db);
	const addedCronJobColumns = ensureColumns(db, ORDERED_STARTUP_ADDITIVE_STATE_COLUMNS.cronJobs);
	if (repairHistoricalRows || addedCronJobColumns.some(({ columnName }) => [
		"name",
		"enabled",
		"agent_id",
		"payload_kind",
		"runtime_updated_at_ms"
	].includes(columnName))) backfillCronJobsFromJobJson(db);
	const addedDeliveryColumns = ensureColumns(db, ORDERED_STARTUP_ADDITIVE_STATE_COLUMNS.deliveryQueue);
	if (repairHistoricalRows || addedDeliveryColumns.some(({ tableName }) => tableName === "delivery_queue_entries")) backfillDeliveryQueueEntriesFromEntryJson(db);
	if (ensureColumn(db, ...ORDERED_STARTUP_ADDITIVE_STATE_COLUMNS.originalMediaRoot[0])) backfillLegacyManagedImageRoots(db);
	ensureColumns(db, ORDERED_STARTUP_ADDITIVE_STATE_COLUMNS.beforeTaskAttribution);
	ensureColumns(db, ORDERED_STARTUP_ADDITIVE_STATE_COLUMNS.taskRequester);
	ensureColumns(db, ORDERED_STARTUP_ADDITIVE_STATE_COLUMNS.taskRunDetails);
	if (repairHistoricalRows) {
		repairLegacySubagentSuspensionReasons(db);
		repairLegacySubagentExecutionPayloads(db);
		repairLegacySubagentRetainedResults(db);
	}
	ensureColumns(db, ORDERED_STARTUP_ADDITIVE_STATE_COLUMNS.workerEnvironments);
	if (repairHistoricalRows || !tableHasColumn(db, "operator_approvals", "resolution_ref")) ensureOperatorApprovalResolutionRefs(db);
}
//#endregion
//#region src/state/openclaw-state-db-startup-checkpoint.ts
const NATIVE_STARTUP_BOOTSTRAP_OBJECTS = /* @__PURE__ */ new Set([
	"table:device_auth_tokens",
	"index:idx_device_auth_tokens_updated",
	"table:device_identities",
	"index:idx_device_identities_device",
	"table:exec_approvals_config",
	"table:macos_port_guardian_records",
	"index:idx_macos_port_guardian_records_port",
	"table:schema_meta",
	"table:state_leases",
	"index:idx_state_leases_expiry",
	"index:idx_state_leases_owner"
]);
function isUninitializedNativeStartupDatabase(db) {
	if (readSqliteUserVersion(db) !== 0) return false;
	const objects = db.prepare("SELECT type, name FROM sqlite_schema WHERE name NOT LIKE 'sqlite_%'").all();
	if (objects.some(({ type, name }) => typeof type !== "string" || typeof name !== "string" || !NATIVE_STARTUP_BOOTSTRAP_OBJECTS.has(`${type}:${name}`))) return false;
	const tableNames = new Set(objects.filter(({ type }) => type === "table").map(({ name }) => name));
	if (tableNames.has("schema_meta") && db.prepare("SELECT 1 FROM schema_meta LIMIT 1").get()) return false;
	return !(tableNames.has("state_leases") && db.prepare("SELECT 1 FROM state_leases LIMIT 1").get());
}
//#endregion
//#region src/state/openclaw-state-db-schema-runtime.ts
const stateDbLog = createSubsystemLogger("state/db");
/** Runtime converges schema; historical row repair belongs to explicit Doctor maintenance. */
function ensureOpenClawStateRuntimeSchema(db, pathname, env, initialization, busyTimeoutMs = OPENCLAW_SQLITE_BUSY_TIMEOUT_MS, initializeNativeOnly = false) {
	if (isExistingOpenClawStateSchema(pathname, db)) {
		assertExistingOpenClawStateRuntimeSchema(db, pathname);
		assertOpenClawStateWriteAllowed({
			database: db,
			databasePath: pathname,
			env
		});
		return [];
	}
	try {
		if (isOpenClawStateSchemaFastPathEligible(db, pathname)) {
			assertOpenClawStateWriteAllowed({
				database: db,
				databasePath: pathname,
				env
			});
			return [];
		}
	} catch (error) {
		if (!db.isOpen || error instanceof StartupMaintenanceRequiredError) throw error;
	}
	return withStateDatabaseSchemaMaintenance({
		databasePath: pathname,
		busyTimeoutMs
	}, () => {
		const now = Date.now();
		const retiredTableChanges = [];
		const applied = runStateSchemaMigrationTransaction(db, pathname, () => {
			assertOpenClawStateWriteAllowed({
				database: db,
				databasePath: pathname,
				env
			});
			assertSupportedStateSchemaVersion(db, pathname);
			if (initializeNativeOnly && !isUninitializedNativeStartupDatabase(db)) return [];
			const previousVersion = readStateSchemaMigrationVersion(db);
			const includeAgentDeletionJournal = tableExists(db, "agent_deletion_journal") || hasPreJournalStateSchema(db) || initialization.kind === "fresh" && isUninitializedNativeStartupDatabase(db);
			if (previousVersion === 19) {
				assertNoLegacyStateRuntimeRepair(db, pathname);
				const indexes = verifyAndRepairCanonicalSqliteIndexes(db, pathname, OPENCLAW_STATE_SCHEMA_SQL, {
					allowMissingColumns: true,
					validateAfterRepair: () => assertCurrentStateRuntimeSchema(db, pathname)
				});
				ensureAdditiveStateColumns(db, "runtime");
				assertCurrentStateRuntimeSchema(db, pathname);
				writeCurrentStateSchemaMetadata(db, now);
				return indexes.length > 0 ? [`Rebuilt canonical shared-state SQLite indexes (${indexes.length})`] : [];
			}
			openClawStateMigrationAssertions.get(previousVersion)?.(db, { pathname });
			assertSqliteIntegrity(db, pathname);
			dropLegacyStateTables(db);
			const changes = runRetiredStateTableMigrations(db, previousVersion);
			retiredTableChanges.push(...changes);
			if (migrateSingletonStateFoldInV12(db, previousVersion)) changes.push("Folded singleton state tables into config_machine_state (v12)");
			if (migrateWorkerPlacementExecutionModeSchema(db, previousVersion)) changes.push("Migrated cloud worker placements to execution modes");
			const pathMigration = migrateAgentDatabaseRelativePaths(db, previousVersion, pathname);
			changes.push(...describeAgentPathMigration(pathMigration));
			ensureAdditiveStateColumns(db, "repair");
			for (const migration of versionedStateMigrations) if (migration.migrate(db, previousVersion)) changes.push(migration.applied);
			migrateSessionWatchCursorProvenance(db);
			assertCanonicalStateSchemaShape(db, pathname);
			executeCanonicalStateSchema(db, {
				includeVersionLazyAdditiveTables: true,
				includeAgentDeletionJournal
			});
			migrateLegacyCronRunLogsToTaskRuns(db);
			if (previousVersion < 3) {
				repairLegacyGatewayRestartHandoffsForStrictMigration(db);
				ensureFirstUseAdditiveStateColumnsForStrictMigration(db);
				const strict = migrateSqliteSchemaToStrictInTransaction(db, getOpenClawStateRuntimeSchema({
					includeVersionLazyAdditiveTables: true,
					includeAgentDeletionJournal
				}), { databaseLabel: pathname });
				if (strict.migratedTables.length > 0) changes.push(`Migrated shared state tables to SQLite STRICT typing (${strict.migratedTables.length})`);
			}
			repairCanonicalSqliteIndexes(db, pathname, OPENCLAW_STATE_SCHEMA_SQL, { verifyPhysicalIntegrity: false });
			writeCurrentStateSchemaMetadata(db, now);
			assertOpenClawStateDatabaseForMaintenance(db, { pathname });
			warnAgentPathMigration(stateDbLog, pathMigration, pathname);
			return changes;
		}, {
			busyTimeoutMs,
			databaseLabel: pathname,
			operationLabel: "state.schema.ensure"
		});
		retiredTableChanges.forEach(logRetiredStateTableMigration);
		return applied;
	});
}
//#endregion
//#region src/state/openclaw-state-db.ts
/** Reject a fresh shared-state open after known corruption until repair clears it. */
function assertOpenClawStateDatabaseFreshOpenAllowed(options = {}) {
	const env = options.env ?? process.env;
	openClawStateDatabaseCache.assertOpenClawStateDatabaseFreshOpenAllowedAtPath(resolveDatabasePath(options), env);
}
const deferredStateDatabases = /* @__PURE__ */ new WeakSet();
/** Open or return a cached shared state database after schema and migration checks. */
function openOpenClawStateDatabaseWithBusyTimeout(options = {}, busyTimeoutMs = OPENCLAW_SQLITE_BUSY_TIMEOUT_MS, lockFailureReporting = "report", remainingColdAdmissionTimeout) {
	getOpenClawDatabaseMaintenanceScope()?.assertAdmission();
	const env = options.env ?? process.env;
	if (options.database) {
		assertStateDatabaseSchemaAdmission(options.database);
		assertOpenClawStateWriteAllowed({
			database: options.database.db,
			databasePath: options.database.path,
			env
		});
		observeOpenClawDatabaseMaintenanceResource(options.database.db);
		openClawStateDatabaseCache.touchStateDatabase(options.database);
		return options.database;
	}
	const pathname = resolveDatabasePath(options);
	const existingSchema = isExistingOpenClawStateSchema(pathname);
	const cached = openClawStateDatabaseCache.getCachedOpenClawStateDatabase(pathname);
	if (cached?.db.isOpen) {
		openClawStateDatabaseCache.assertOpenClawStateDatabaseOpenAllowed(pathname);
		assertStateDatabaseSchemaAdmission(cached);
		assertOpenClawStateWriteAllowed({
			database: cached.db,
			databasePath: pathname,
			env,
			schemaReady: true
		});
		observeOpenClawDatabaseMaintenanceResource(cached.db);
		if (!existingSchema && deferredStateDatabases.has(cached.db)) {
			reconcileOpenClawStateSchemaPublication(options);
			if (readSqliteUserVersion(cached.db) === 19) deferredStateDatabases.delete(cached.db);
		}
		return cached;
	}
	let unpublished;
	try {
		const open = (remaining) => {
			getOpenClawDatabaseMaintenanceScope()?.assertAdmission();
			openClawStateDatabaseCache.assertOpenClawStateDatabaseOpenAllowed(pathname);
			assertOpenClawStateDatabaseFreshOpenAllowed(options);
			if (cached) openClawStateDatabaseCache.closeStaleCachedOpenClawStateDatabase(cached);
			return openUnpublishedStateDatabase({
				pathname,
				env,
				busyTimeoutMs: remaining(),
				lockFailureReporting,
				existingSchema,
				initializationAgentPaths: options.initializationAgentPaths,
				ensureSchema: (database, initialization) => ensureOpenClawStateRuntimeSchema(database, pathname, env, initialization, remaining()),
				recordOpenFailure: recordOpenClawStateDatabaseOpenFailure
			});
		};
		unpublished = remainingColdAdmissionTimeout ? open(remainingColdAdmissionTimeout) : withStateDatabaseColdAdmission({
			databasePath: pathname,
			busyTimeoutMs
		}, open);
		setSqliteBusyTimeout(unpublished.db, busyTimeoutMs);
	} catch (error) {
		if (lockFailureReporting === "report" || !isOpenClawStateWriteContentionError(error)) openClawStateDatabaseCache.recordOpenClawStateDatabaseLifecycleOpenError(pathname, error);
		if (unpublished) {
			const errors = openClawStateDatabaseCache.closeUnpublishedOpenClawStateDatabaseHandle(unpublished);
			if (errors.length > 0) throw createSqliteLifecycleAggregateError([error, ...errors], `Fresh OpenClaw state database open failed releasing access and closing its unpublished handle for ${pathname}.`, error);
		}
		throw error;
	}
	if (existingSchema) recordExistingOpenClawStateSchemaDatabase(unpublished.db, pathname);
	const database = openClawStateDatabaseCache.publishOpenClawStateDatabase(unpublished, env);
	try {
		if (!existingSchema && readSqliteUserVersion(database.db) < 19) {
			deferredStateDatabases.add(database.db);
			reconcileOpenClawStateSchemaPublication(options);
		}
		return database;
	} catch (error) {
		if (database.db.isOpen) setSqliteBusyTimeout(database.db, OPENCLAW_SQLITE_BUSY_TIMEOUT_MS);
		throw error;
	}
}
/** Open or return a cached shared state database after schema and migration checks. */
function openOpenClawStateDatabase(options = {}) {
	return openOpenClawStateDatabaseWithBusyTimeout(options);
}
/** The Gateway watcher also publishes without requiring a new physical database open. */
function reconcileOpenClawStateSchemaPublication(options = {}) {
	if (isExistingOpenClawStateSchema(options.database?.path ?? resolveDatabasePath(options))) return;
	const pending = withExistingOpenClawStateDatabaseReadOnly(({ db }) => {
		if (readSqliteUserVersion(db) >= 19 || readStateSchemaContentVersion(db) < 19) return;
		return { blocker: readStateSchemaPublicationBlocker(db) };
	}, options);
	if (!pending || pending.blocker) return pending?.blocker;
	const pathname = resolveDatabasePath(options);
	try {
		return withStateDatabaseSchemaMaintenance({ databasePath: pathname }, () => runOpenClawStateWriteTransaction(({ db }) => {
			const blocker = readStateSchemaPublicationBlocker(db);
			if (blocker) return blocker;
			assertOpenClawStateDatabaseForMaintenance(db, { pathname });
			markCurrentStateSchemaVersion(db);
		}, options, { operationLabel: "state.schema.publish" }));
	} catch (error) {
		if (error instanceof StateSchemaMutationConflictError) return;
		throw error;
	}
}
/** Run a synchronous immediate transaction against the shared state database. */
function runOpenClawStateWriteTransaction(operation, options = {}, transactionOptions = {}) {
	getOpenClawDatabaseMaintenanceScope()?.assertAdmission();
	const existing = options.database ?? getOpenClawStateDatabaseIfOpen(options);
	if (existing) isExistingOpenClawStateSchema(existing.path, existing.db);
	let database = existing;
	let callbackEntered = false;
	let committed;
	const execute = (remaining) => {
		const acquired = options.database ? openOpenClawStateDatabase(options) : database ?? openOpenClawStateDatabaseWithBusyTimeout(options, 5e3, "report", remaining);
		database = acquired;
		return {
			database: acquired,
			value: runManagedStateTransaction(acquired.db, () => {
				assertStateDatabaseSchemaAdmission(acquired);
				assertOpenClawStateWriteAllowed({
					database: acquired.db,
					databasePath: acquired.path,
					env: options.env ?? process.env,
					schemaReady: !options.database && acquired === getOpenClawStateDatabaseIfOpen(options)
				});
				observeOpenClawDatabaseMaintenanceResource(acquired.db);
				callbackEntered = true;
				return operation(acquired);
			}, {
				databaseLabel: acquired.path,
				...transactionOptions,
				...remaining ? { busyTimeoutMs: remaining() } : {},
				operationLabel: transactionOptions.operationLabel ?? "state.write"
			})
		};
	};
	try {
		committed = existing ? execute() : withStateDatabaseColdAdmission({
			databasePath: resolveDatabasePath(options),
			busyTimeoutMs: transactionOptions.busyTimeoutMs ?? 5e3,
			canRetry() {
				if (callbackEntered || database && (!database.db.isOpen || database.db.isTransaction)) return false;
				if (database) assertTransactionUsable(database.db);
				return true;
			}
		}, execute);
	} catch (error) {
		if (database) openClawStateDatabaseCache.evictOpenClawStateDatabaseAfterCorruption(database, error);
		throw error;
	}
	try {
		if (!isExistingOpenClawStateSchema(committed.database.path, committed.database.db)) ensureOpenClawStatePermissions(committed.database.path, options.env ?? process.env);
	} catch {}
	return committed.value;
}
/**
* Return a shared state handle this process already holds open, if any.
*
* Read-only callers use this to avoid opening a connection per call; it never
* creates, repairs, or registers a handle.
*/
function getOpenClawStateDatabaseIfOpen(options = {}) {
	const pathname = resolveDatabasePath(options);
	isExistingOpenClawStateSchema(pathname);
	const cached = openClawStateDatabaseCache.getCachedOpenClawStateDatabase(pathname);
	if (cached?.db.isOpen) isExistingOpenClawStateSchema(cached.path, cached.db);
	return cached?.db.isOpen ? cached : void 0;
}
function assertStateDatabaseSchemaAdmission(database) {
	if (isExistingOpenClawStateSchema(database.path, database.db)) {
		const location = database.db.location();
		if (!location) throw new Error("Existing shared-state schema admission requires a filesystem-backed database.");
		if (!isExistingOpenClawStateSchema(location, database.db)) throw new Error("Existing shared-state schema admission requires its selected physical database.");
		assertExistingOpenClawStateRuntimeSchema(database.db, database.path);
	}
}
//#endregion
//#region src/proxy-capture/paths.ts
function resolveDebugProxyRootDir(env = process.env) {
	return path.join(resolveStateDir(env), "debug-proxy");
}
/** @deprecated Capture storage now lives in the shared state database. */
function resolveDebugProxyDbPath(env = process.env) {
	return path.join(resolveDebugProxyRootDir(env), "capture.sqlite");
}
/** @deprecated Capture payloads now live in the shared state database. */
function resolveDebugProxyBlobDir(env = process.env) {
	return path.join(resolveDebugProxyRootDir(env), "blobs");
}
function resolveDebugProxyCertDir(env = process.env) {
	return path.join(resolveDebugProxyRootDir(env), "certs");
}
//#endregion
//#region src/proxy-capture/env.ts
const OPENCLAW_DEBUG_PROXY_ENABLED = "OPENCLAW_DEBUG_PROXY_ENABLED";
const OPENCLAW_DEBUG_PROXY_URL = "OPENCLAW_DEBUG_PROXY_URL";
const OPENCLAW_DEBUG_PROXY_CERT_DIR = "OPENCLAW_DEBUG_PROXY_CERT_DIR";
const OPENCLAW_DEBUG_PROXY_SESSION_ID = "OPENCLAW_DEBUG_PROXY_SESSION_ID";
const OPENCLAW_DEBUG_PROXY_REQUIRE = "OPENCLAW_DEBUG_PROXY_REQUIRE";
let cachedImplicitSessionId;
function isTruthy(value) {
	return value === "1" || value === "true" || value === "yes" || value === "on";
}
function resolveDebugProxySettings(env = process$1.env) {
	const enabled = isTruthy(env[OPENCLAW_DEBUG_PROXY_ENABLED]);
	const sessionId = (env[OPENCLAW_DEBUG_PROXY_SESSION_ID]?.trim() || void 0) ?? (cachedImplicitSessionId ??= randomUUID());
	return {
		enabled,
		required: isTruthy(env[OPENCLAW_DEBUG_PROXY_REQUIRE]),
		proxyUrl: env[OPENCLAW_DEBUG_PROXY_URL]?.trim() || void 0,
		dbPath: resolveDebugProxyDbPath(env),
		blobDir: resolveDebugProxyBlobDir(env),
		certDir: env[OPENCLAW_DEBUG_PROXY_CERT_DIR]?.trim() || resolveDebugProxyCertDir(env),
		sessionId,
		sourceProcess: "openclaw"
	};
}
function resolveEnabledDebugProxySettings(resolved) {
	if (!(resolved?.enabled ?? isTruthy(process$1.env[OPENCLAW_DEBUG_PROXY_ENABLED]))) return;
	return resolved ?? resolveDebugProxySettings();
}
//#endregion
//#region src/secrets/model-provider-header-policy.ts
/** Classifies model-provider request headers that should be treated as credential material. */
/** Exact header names that always carry credential material for model provider requests. */
const ALWAYS_SENSITIVE_MODEL_PROVIDER_HEADER_NAMES = /* @__PURE__ */ new Set([
	"authorization",
	"proxy-authorization",
	"x-api-key",
	"api-key",
	"apikey",
	"x-auth-token",
	"auth-token",
	"x-access-token",
	"access-token",
	"x-secret-key",
	"secret-key"
]);
const SENSITIVE_MODEL_PROVIDER_HEADER_NAME_FRAGMENTS = [
	"api-key",
	"apikey",
	"token",
	"secret",
	"password",
	"credential"
];
/**
* Returns whether a model-provider header name should be treated as secret-bearing.
* This is intentionally conservative: false positives are audit noise, false negatives leak keys.
*/
function isLikelySensitiveModelProviderHeaderName(value) {
	const normalized = normalizeLowercaseStringOrEmpty(value);
	if (!normalized) return false;
	if (ALWAYS_SENSITIVE_MODEL_PROVIDER_HEADER_NAMES.has(normalized)) return true;
	return SENSITIVE_MODEL_PROVIDER_HEADER_NAME_FRAGMENTS.some((fragment) => normalized.includes(fragment));
}
//#endregion
//#region src/proxy-capture/header-redaction.ts
const REDACTED_CAPTURE_HEADER_VALUE = "[REDACTED]";
function isSensitiveCaptureHeaderName(name) {
	const normalized = name.trim().toLowerCase();
	return isLikelySensitiveModelProviderHeaderName(normalized) || normalized === "cookie" || normalized === "set-cookie" || normalized.includes("session");
}
function redactedCaptureHeaders(headers, additionalSensitiveNames) {
	if (!headers) return;
	const additionalSensitive = new Set([...additionalSensitiveNames ?? []].map((name) => name.trim().toLowerCase()));
	const entries = isHeadersLike(headers) ? Array.from(headers.entries()) : Object.entries(headers);
	const redacted = {};
	for (const [name, value] of entries) {
		if (additionalSensitive.has(name.trim().toLowerCase()) || isSensitiveCaptureHeaderName(name)) {
			redacted[name] = REDACTED_CAPTURE_HEADER_VALUE;
			continue;
		}
		const flattened = Array.isArray(value) ? value.join(", ") : value ?? "";
		redacted[name] = redactRegisteredSecretValues(flattened, () => REDACTED_CAPTURE_HEADER_VALUE);
	}
	return redacted;
}
//#endregion
//#region src/proxy-capture/runtime-cleanup.ts
const finalizers$1 = /* @__PURE__ */ new Set();
function registerActiveDebugProxyCapture(finalize) {
	finalizers$1.add(finalize);
	const unregisterSignalBarrier = registerSignalExitBarrier(finalize);
	return () => {
		finalizers$1.delete(finalize);
		unregisterSignalBarrier();
	};
}
//#endregion
//#region src/proxy-capture/store-lifecycle.ts
const finalizers = /* @__PURE__ */ new WeakMap();
const closed = /* @__PURE__ */ new WeakSet();
function registerCaptureStoreFinalizer(store, finalize) {
	if (closed.has(store)) throw new Error("Capture store is already finalized.");
	let callbacks = finalizers.get(store);
	if (!callbacks) {
		callbacks = /* @__PURE__ */ new Set();
		finalizers.set(store, callbacks);
	}
	callbacks.add(finalize);
	return () => callbacks.delete(finalize);
}
function finalizeCaptureStore(store) {
	if (closed.has(store)) return;
	closed.add(store);
	const callbacks = finalizers.get(store);
	finalizers.delete(store);
	const errors = [];
	for (const finalize of callbacks ?? []) try {
		finalize();
	} catch (error) {
		errors.push(error);
	}
	if (errors.length) throw new AggregateError(errors, "Capture store finalization failed.");
}
const asyncFinalizers = /* @__PURE__ */ new WeakMap();
const asyncFinalizations = /* @__PURE__ */ new WeakMap();
function registerAsyncCaptureStoreFinalizer(store, finalize) {
	if (closed.has(store)) throw new Error("Capture store is already finalized.");
	let callbacks = asyncFinalizers.get(store);
	if (!callbacks) {
		callbacks = /* @__PURE__ */ new Set();
		asyncFinalizers.set(store, callbacks);
	}
	callbacks.add(finalize);
	return () => callbacks.delete(finalize);
}
function finalizeCaptureStoreAsync(store, finalizingStore) {
	const existing = asyncFinalizations.get(store);
	if (existing) return existing;
	if (closed.has(store)) return Promise.resolve();
	const completion = createDeferredCore();
	asyncFinalizations.set(store, completion.promise);
	closed.add(store);
	const callbacks = [...finalizers.get(store) ?? [], ...asyncFinalizers.get(store) ?? []];
	finalizers.delete(store);
	asyncFinalizers.delete(store);
	const pending = [];
	const errors = [];
	for (const finalize of callbacks) try {
		pending.push(Promise.resolve(finalize(finalizingStore)));
	} catch (error) {
		errors.push(error);
	}
	Promise.allSettled(pending).then((results) => {
		for (const result of results) if (result.status === "rejected") errors.push(result.reason);
		if (errors.length) completion.reject(new AggregateError(errors, "Capture store finalization failed."));
		else completion.resolve();
	});
	completion.promise.catch(() => void 0);
	return completion.promise;
}
//#endregion
//#region src/proxy-capture/store.async.ts
function createDebugProxyCaptureStoreForContext(context) {
	let closed = false;
	let closing = false;
	let completion;
	let worker;
	const retire = async () => {
		closed = true;
		try {
			await worker.retire();
		} finally {
			unregisterResource();
			unregisterLifecycle();
		}
	};
	const unregisterResource = registerOpenClawStateDatabaseAsyncResource({ close: async (identity) => {
		if (identity !== void 0 && identity.key !== context.admission.identity.key) return;
		await retire();
	} });
	const unregisterLifecycle = registerOpenClawStateDatabaseLifecycleListener((event) => {
		if (event.kind !== "opened" && event.identity?.key === context.admission.identity.key) retire().catch(() => void 0);
	});
	const executePublic = (command) => {
		const result = closed || closing ? Promise.reject(new SqliteWorkerError("Capture store is closed", "closed")) : worker.execute(command);
		result.catch(() => void 0);
		return result;
	};
	const createStore = (execute) => ({
		dbPath: context.admission.databasePath,
		get isClosed() {
			if (closed) return true;
			try {
				context.admission.assertCurrent();
				return false;
			} catch {
				return true;
			}
		},
		upsertSession: (session) => execute({
			type: "capture.upsertSession",
			input: { ...session }
		}),
		endSession: (sessionId, endedAt = Date.now()) => execute({
			type: "capture.endSession",
			input: {
				sessionId,
				endedAt
			}
		}),
		persistPayload: (data, contentType) => execute({
			type: "capture.persistPayload",
			input: {
				data: Buffer.from(data),
				contentType
			}
		}),
		recordEvent: (event) => execute({
			type: "capture.recordEvent",
			input: { ...event }
		}),
		recordEventWithPayload: (event, payload) => execute({
			type: "capture.recordEventWithPayload",
			input: {
				event: { ...event },
				payload: {
					...payload,
					data: Buffer.isBuffer(payload.data) ? Buffer.from(payload.data) : payload.data
				}
			}
		}),
		listSessions: (limit) => execute({
			type: "capture.listSessions",
			input: { limit }
		}),
		getSessionEvents: (sessionId, limit) => execute({
			type: "capture.getSessionEvents",
			input: {
				sessionId,
				limit
			}
		}),
		summarizeSessionCoverage: (sessionId) => execute({
			type: "capture.summarizeSessionCoverage",
			input: { sessionId }
		}),
		readBlob: (blobId) => execute({
			type: "capture.readBlob",
			input: { blobId }
		}),
		queryPreset: (preset, sessionId) => execute({
			type: "capture.queryPreset",
			input: {
				preset,
				sessionId
			}
		}),
		deleteSessions: (sessionIds) => execute({
			type: "capture.deleteSessions",
			input: { sessionIds: [...sessionIds] }
		}),
		purgeAll: () => execute({
			type: "capture.purgeAll",
			input: void 0
		}),
		close: () => {
			closing = true;
			return completion ??= worker.release();
		}
	});
	const store = createStore(executePublic);
	try {
		worker = createOpenClawStateWorkerLease(context, async (scope) => {
			closing = true;
			try {
				await finalizeCaptureStoreAsync(store, createStore(scope.execute));
			} finally {
				closed = true;
				unregisterResource();
				unregisterLifecycle();
			}
		});
	} catch (error) {
		unregisterResource();
		unregisterLifecycle();
		throw error;
	}
	const ready = worker.ready.then(() => {
		context.admission.assertCurrent();
		if (closed) throw new SqliteWorkerError("Capture store is closed", "closed");
	});
	ready.catch(() => {
		unregisterResource();
		unregisterLifecycle();
	});
	return {
		store,
		ready,
		runOperation: (operation) => worker.runOperation((scope) => operation(createStore(scope.execute))),
		release: () => store.close()
	};
}
//#endregion
//#region src/proxy-capture/store-readonly.ts
function listDebugProxyCaptureSessions(db, limit = 50) {
	const kysely = getNodeSqliteKysely(db);
	const sessions = kysely.selectFrom("capture_sessions").select([
		"id",
		"started_at",
		"ended_at",
		"mode",
		"source_process",
		"proxy_url"
	]).groupBy("id").orderBy("started_at", "desc").limit(limit).as("s");
	const query = kysely.selectFrom(sessions).select([
		"s.id",
		"s.started_at as startedAt",
		"s.ended_at as endedAt",
		"s.mode",
		"s.source_process as sourceProcess",
		"s.proxy_url as proxyUrl"
	]).select((eb) => eb.selectFrom("capture_events as e").select((event) => event.fn.count("e.id").as("count")).whereRef("e.session_id", "=", "s.id").as("eventCount")).orderBy("s.started_at", "desc");
	const { compiled, bind } = compileSqliteQueryBindings(() => query);
	return db.prepare(compiled.sql).all(...bind(void 0));
}
function findDebugProxyCaptureBlobReference(db, blobId) {
	const query = getNodeSqliteKysely(db).selectFrom("capture_events").select("data_blob_id as blobId").where("data_blob_id", "=", blobId).limit(1);
	const { compiled, bind } = compileSqliteQueryBindings(() => query);
	return db.prepare(compiled.sql).get(...bind(void 0))?.blobId || null;
}
function queryDebugProxyCapturePreset(db, preset, sessionId) {
	const kysely = getNodeSqliteKysely(db);
	let events = kysely.selectFrom("capture_events");
	if (sessionId) events = events.where("session_id", "=", sessionId);
	const locations = events.select(["host", "path"]);
	const count = kysely.fn.countAll();
	let query;
	switch (preset) {
		case "double-sends":
			query = locations.select(["method", count.as("duplicateCount")]).where("kind", "=", "request").groupBy([
				"host",
				"path",
				"method",
				"data_sha256"
			]).having(count, ">", 1).orderBy("duplicateCount", "desc").orderBy("host", "asc");
			break;
		case "retry-storms":
			query = locations.select(count.as("errorCount")).where("kind", "=", "response").where("status", ">=", 429).groupBy(["host", "path"]).having(count, ">", 1).orderBy("errorCount", "desc").orderBy("host", "asc");
			break;
		case "cache-busting":
			query = locations.select(count.as("variantCount")).where("kind", "=", "request").where((eb) => eb.or([
				eb("path", "like", "%?%"),
				eb("headers_json", "like", "%cache-control%"),
				eb("headers_json", "like", "%pragma%")
			])).groupBy(["host", "path"]).orderBy("variantCount", "desc").orderBy("host", "asc");
			break;
		case "ws-duplicate-frames":
			query = locations.select(count.as("duplicateFrames")).where("kind", "=", "ws-frame").where("direction", "=", "outbound").groupBy([
				"host",
				"path",
				"data_sha256"
			]).having(count, ">", 1).orderBy("duplicateFrames", "desc").orderBy("host", "asc");
			break;
		case "missing-ack":
			query = events.select([
				"flow_id as flowId",
				"host",
				"path",
				count.as("outboundFrames")
			]).where("kind", "=", "ws-frame").where("direction", "=", "outbound").where("flow_id", "not in", events.select("flow_id").where("kind", "=", "ws-frame").where("direction", "=", "inbound")).groupBy([
				"flow_id",
				"host",
				"path"
			]).orderBy("outboundFrames", "desc");
			break;
		case "error-bursts":
			query = locations.select(count.as("errorCount")).where("kind", "=", "error").groupBy(["host", "path"]).orderBy("errorCount", "desc").orderBy("host", "asc");
			break;
		default: return [];
	}
	const { compiled, bind } = compileSqliteQueryBindings(() => query);
	return db.prepare(compiled.sql).all(...bind(void 0));
}
function readDebugProxyCaptureSessionEvents(db, sessionId, limit = 500) {
	return executeSqliteQuerySync(db, getNodeSqliteKysely(db).selectFrom("capture_events").select([
		"id",
		"session_id as sessionId",
		"ts",
		"source_scope as sourceScope",
		"source_process as sourceProcess",
		"protocol",
		"direction",
		"kind",
		"flow_id as flowId",
		"method",
		"host",
		"path",
		"status",
		"close_code as closeCode",
		"content_type as contentType",
		"headers_json as headersJson",
		"data_text as dataText",
		"data_blob_id as dataBlobId",
		"data_sha256 as dataSha256",
		"error_text as errorText",
		"meta_json as metaJson"
	]).where("session_id", "=", sessionId).orderBy("ts", "desc").orderBy("id", "desc").limit(limit)).rows;
}
function parseMetaJson(metaJson) {
	if (typeof metaJson !== "string" || metaJson.trim().length === 0) return null;
	try {
		const parsed = JSON.parse(metaJson);
		return parsed && typeof parsed === "object" ? parsed : null;
	} catch {
		return null;
	}
}
function sortObservedCounts(counts) {
	return [...counts.entries()].map(([value, count]) => ({
		value,
		count
	})).toSorted((left, right) => right.count - left.count || left.value.localeCompare(right.value));
}
function summarizeDebugProxyCaptureSessionCoverage(db, sessionId) {
	const { compiled, bind } = compileSqliteQueryBindings((parameter) => getNodeSqliteKysely(db).selectFrom("capture_events").select(["host", "meta_json as metaJson"]).where("session_id", "=", parameter((value) => value)));
	const rows = db.prepare(compiled.sql).iterate(...bind(sessionId));
	const providers = /* @__PURE__ */ new Map();
	const apis = /* @__PURE__ */ new Map();
	const models = /* @__PURE__ */ new Map();
	const hosts = /* @__PURE__ */ new Map();
	const localPeers = /* @__PURE__ */ new Map();
	let totalEvents = 0;
	let unlabeledEventCount = 0;
	try {
		for (const row of rows) {
			totalEvents += 1;
			const meta = parseMetaJson(row.metaJson);
			const provider = normalizeNullableString(meta?.provider);
			const api = normalizeNullableString(meta?.api);
			const model = normalizeNullableString(meta?.model);
			const host = normalizeNullableString(row.host);
			if (!provider && !api && !model) unlabeledEventCount += 1;
			if (provider) providers.set(provider, (providers.get(provider) ?? 0) + 1);
			if (api) apis.set(api, (apis.get(api) ?? 0) + 1);
			if (model) models.set(model, (models.get(model) ?? 0) + 1);
			if (host) {
				hosts.set(host, (hosts.get(host) ?? 0) + 1);
				if (host.startsWith("127.0.0.1:") || host.startsWith("localhost:")) localPeers.set(host, (localPeers.get(host) ?? 0) + 1);
			}
		}
	} catch (error) {
		try {
			rows.return?.();
		} catch {}
		throw error;
	}
	return {
		sessionId,
		totalEvents,
		unlabeledEventCount,
		providers: sortObservedCounts(providers),
		apis: sortObservedCounts(apis),
		models: sortObservedCounts(models),
		hosts: sortObservedCounts(hosts),
		localPeers: sortObservedCounts(localPeers)
	};
}
function readDebugProxyCaptureBlob(db, blobId) {
	const row = executeSqliteQueryTakeFirstSync(db, getNodeSqliteKysely(db).selectFrom("capture_blobs").select(["encoding", "data"]).where("blob_id", "=", blobId));
	if (!row?.data) return null;
	const data = Buffer.from(row.data);
	return (row.encoding === "gzip" ? gunzipSync(data) : data).toString("utf8");
}
var DebugProxyCaptureKernel = class {
	constructor(options) {
		this.db = options.db;
		this.dbPath = options.dbPath;
		this.blobDir = options.blobDir;
		this.capturePathBased = options.pathBased;
		this.runWrite = options.runWrite;
	}
	upsertSession(session) {
		const pathBased = this.capturePathBased;
		const { compiled, bind } = compileSqliteQueryBindings((parameter) => {
			const values = {
				id: parameter((value) => value.id),
				started_at: parameter((value) => value.startedAt),
				ended_at: parameter((value) => value.endedAt ?? null),
				mode: parameter((value) => value.mode),
				source_scope: parameter((value) => value.sourceScope),
				source_process: parameter((value) => value.sourceProcess),
				proxy_url: parameter((value) => value.proxyUrl ?? null)
			};
			if (pathBased) return getNodeSqliteKysely(this.db).insertInto("capture_sessions").values({
				...values,
				db_path: parameter((value) => value.dbPath ?? this.dbPath),
				blob_dir: parameter((value) => value.blobDir ?? pathBased.blobDir)
			}).onConflict((conflict) => conflict.column("id").doUpdateSet((eb) => ({
				ended_at: eb.ref("excluded.ended_at"),
				proxy_url: eb.ref("excluded.proxy_url"),
				source_process: eb.ref("excluded.source_process")
			})));
			return getNodeSqliteKysely(this.db).insertInto("capture_sessions").values(values).onConflict((conflict) => conflict.column("id").doUpdateSet((eb) => ({
				started_at: eb.fn("min", ["capture_sessions.started_at", "excluded.started_at"]),
				ended_at: eb.ref("excluded.ended_at"),
				mode: eb.case().when("capture_sessions.mode", "=", "implicit").then(eb.ref("excluded.mode")).else(eb.ref("capture_sessions.mode")).end(),
				proxy_url: eb.ref("excluded.proxy_url"),
				source_process: eb.ref("excluded.source_process")
			})));
		});
		const upsert = () => {
			const parameters = bind(session);
			return executeWithCachedStatement(this.db, compiled.sql, parameters, (statement) => statement.run(...parameters));
		};
		if (pathBased) {
			upsert();
			return;
		}
		this.runWrite(upsert);
	}
	endSession(sessionId, endedAt = Date.now()) {
		const { compiled, bind } = compileSqliteQueryBindings(() => getNodeSqliteKysely(this.db).updateTable("capture_sessions").set({ ended_at: endedAt }).where("id", "=", sessionId));
		const update = () => {
			const parameters = bind();
			return executeWithCachedStatement(this.db, compiled.sql, parameters, (statement) => statement.run(...parameters));
		};
		if (this.capturePathBased) {
			update();
			return;
		}
		this.runWrite(update);
	}
	persistPayload(data, contentType) {
		const sha256 = sha256Hex(data);
		const blobId = sha256.slice(0, 24);
		if (this.capturePathBased) {
			fs$1.mkdirSync(this.capturePathBased.blobDir, {
				recursive: true,
				mode: 448
			});
			const outputPath = path.join(this.capturePathBased.blobDir, `${blobId}.bin.gz`);
			if (!fs$1.existsSync(outputPath)) fs$1.writeFileSync(outputPath, gzipSync(data), { mode: 384 });
			applyPrivateModeSync(outputPath, 384);
			return {
				blobId,
				path: outputPath,
				encoding: "gzip",
				sizeBytes: data.byteLength,
				sha256,
				...contentType ? { contentType } : {}
			};
		}
		const { compiled, bind } = compileSqliteQueryBindings((parameter) => getNodeSqliteKysely(this.db).insertInto("capture_blobs").orIgnore().values({
			blob_id: blobId,
			content_type: contentType ?? null,
			encoding: "gzip",
			size_bytes: parameter((value) => value.byteLength),
			sha256,
			data: parameter((value) => gzipSync(value)),
			created_at: parameter(() => Date.now())
		}));
		this.runWrite(() => executeWithCachedStatement(this.db, compiled.sql, [
			data,
			contentType ?? null,
			blobId,
			sha256
		], (statement) => statement.run(...bind(data))));
		return {
			blobId,
			encoding: "gzip",
			sizeBytes: data.byteLength,
			sha256,
			...contentType ? { contentType } : {}
		};
	}
	recordEvent(event) {
		if (this.capturePathBased) {
			this.insertEvent(event, event.dataBlobId ?? null);
			return;
		}
		this.runWrite(() => {
			const implicitSession = compileSqliteQueryBindings((parameter) => getNodeSqliteKysely(this.db).insertInto("capture_sessions").orIgnore().values({
				id: parameter((value) => value.sessionId),
				started_at: parameter((value) => value.ts),
				mode: "implicit",
				source_scope: parameter((value) => value.sourceScope),
				source_process: parameter((value) => value.sourceProcess)
			}));
			const sessionParameters = implicitSession.bind(event);
			executeWithCachedStatement(this.db, implicitSession.compiled.sql, sessionParameters, (statement) => statement.run(...sessionParameters));
			let dataBlobId = null;
			if (event.dataBlobId) {
				const blob = compileSqliteQueryBindings((parameter) => getNodeSqliteKysely(this.db).selectFrom("capture_blobs").select((eb) => eb.lit(1).as("present")).where("blob_id", "=", parameter((value) => value)));
				const blobParameters = blob.bind(event.dataBlobId);
				dataBlobId = executeWithCachedStatement(this.db, blob.compiled.sql, blobParameters, (statement) => statement.get(...blobParameters)) ? event.dataBlobId : null;
			}
			this.insertEvent(event, dataBlobId);
		});
	}
	insertEvent(event, dataBlobId) {
		const { compiled, bind } = compileSqliteQueryBindings((parameter) => getNodeSqliteKysely(this.db).insertInto("capture_events").values({
			session_id: parameter((value) => value.sessionId),
			ts: parameter((value) => value.ts),
			source_scope: parameter((value) => value.sourceScope),
			source_process: parameter((value) => value.sourceProcess),
			protocol: parameter((value) => value.protocol),
			direction: parameter((value) => value.direction),
			kind: parameter((value) => value.kind),
			flow_id: parameter((value) => value.flowId),
			method: parameter((value) => value.method ?? null),
			host: parameter((value) => value.host ?? null),
			path: parameter((value) => value.path ?? null),
			status: parameter((value) => value.status ?? null),
			close_code: parameter((value) => value.closeCode ?? null),
			content_type: parameter((value) => value.contentType ?? null),
			headers_json: parameter((value) => value.headersJson ?? null),
			data_text: parameter((value) => value.dataText ?? null),
			data_blob_id: dataBlobId,
			data_sha256: parameter((value) => value.dataSha256 ?? null),
			error_text: parameter((value) => value.errorText ?? null),
			meta_json: parameter((value) => value.metaJson ?? null)
		}));
		const parameters = bind(event);
		executeWithCachedStatement(this.db, compiled.sql, parameters, (statement) => statement.run(...parameters));
	}
	listSessions(limit = 50) {
		return listDebugProxyCaptureSessions(this.db, limit);
	}
	getSessionEvents(sessionId, limit = 500) {
		return readDebugProxyCaptureSessionEvents(this.db, sessionId, limit);
	}
	summarizeSessionCoverage(sessionId) {
		return summarizeDebugProxyCaptureSessionCoverage(this.db, sessionId);
	}
	readBlob(blobId) {
		if (this.capturePathBased) {
			const legacyBlobId = findDebugProxyCaptureBlobReference(this.db, blobId);
			if (!legacyBlobId) return null;
			const blobPath = path.join(this.capturePathBased.blobDir, `${legacyBlobId}.bin.gz`);
			return fs$1.existsSync(blobPath) ? gunzipSync(fs$1.readFileSync(blobPath)).toString("utf8") : null;
		}
		return readDebugProxyCaptureBlob(this.db, blobId);
	}
	queryPreset(preset, sessionId) {
		return queryDebugProxyCapturePreset(this.db, preset, sessionId);
	}
	purgeAll() {
		const kysely = getNodeSqliteKysely(this.db);
		const metadataDeletes = [kysely.deleteFrom("capture_events").compile().sql, kysely.deleteFrom("capture_sessions").compile().sql];
		if (this.capturePathBased) {
			const sessionCount = this.countCaptureRows("capture_sessions");
			const eventCount = this.countCaptureRows("capture_events");
			runSqliteImmediateTransactionSync(this.db, () => {
				for (const sql of metadataDeletes) executeWithCachedStatement(this.db, sql, [], (statement) => statement.run());
			});
			let blobs = 0;
			if (fs$1.existsSync(this.capturePathBased.blobDir)) for (const entry of fs$1.readdirSync(this.capturePathBased.blobDir)) {
				fs$1.rmSync(path.join(this.capturePathBased.blobDir, entry), { force: true });
				blobs += 1;
			}
			return {
				sessions: sessionCount,
				events: eventCount,
				blobs
			};
		}
		return this.runWrite(() => {
			const sessionCount = this.countCaptureRows("capture_sessions");
			const eventCount = this.countCaptureRows("capture_events");
			const blobCount = this.countCaptureRows("capture_blobs");
			for (const sql of [...metadataDeletes, kysely.deleteFrom("capture_blobs").compile().sql]) executeWithCachedStatement(this.db, sql, [], (statement) => statement.run());
			return {
				sessions: sessionCount,
				events: eventCount,
				blobs: blobCount
			};
		});
	}
	deleteSessions(sessionIds) {
		const uniqueSessionIds = normalizeUniqueStringEntries(sessionIds);
		if (uniqueSessionIds.length === 0) return {
			sessions: 0,
			events: 0,
			blobs: 0
		};
		if (this.capturePathBased) return this.deletePathBasedSessions(uniqueSessionIds);
		return this.runWrite(() => {
			const { blobRows, eventCount, sessionCount } = this.readSessionDeletionRows(uniqueSessionIds);
			this.deleteSessionMetadata(uniqueSessionIds);
			const candidateBlobIds = blobRows.map((row) => row.blobId?.trim()).filter((blobId) => Boolean(blobId));
			const remainingBlobRefs = this.findRemainingBlobReferences(candidateBlobIds);
			const { compiled, bind } = compileSqliteQueryBindings((parameter) => getNodeSqliteKysely(this.db).deleteFrom("capture_blobs").where("blob_id", "=", parameter((blobId) => blobId)));
			return {
				sessions: sessionCount,
				events: eventCount,
				blobs: executeWithCachedStatement(this.db, compiled.sql, candidateBlobIds, (statement) => {
					let deleted = 0;
					for (const blobId of candidateBlobIds) {
						if (remainingBlobRefs.has(blobId)) continue;
						const result = statement.run(...bind(blobId));
						if (Number(result.changes) > 0) deleted += 1;
					}
					return deleted;
				})
			};
		});
	}
	deletePathBasedSessions(sessionIds) {
		const pathBased = this.capturePathBased;
		if (!pathBased) throw new Error("path-based debug proxy capture store is unavailable");
		const { blobRows, eventCount, sessionCount } = this.readSessionDeletionRows(sessionIds);
		runSqliteImmediateTransactionSync(this.db, () => this.deleteSessionMetadata(sessionIds));
		const candidateBlobIds = blobRows.map((row) => row.blobId?.trim()).filter((blobId) => Boolean(blobId));
		const remainingBlobRefs = this.findRemainingBlobReferences(candidateBlobIds);
		let blobs = 0;
		for (const blobId of candidateBlobIds) {
			if (remainingBlobRefs.has(blobId)) continue;
			const blobPath = path.join(pathBased.blobDir, `${blobId}.bin.gz`);
			if (fs$1.existsSync(blobPath)) {
				fs$1.rmSync(blobPath, { force: true });
				blobs += 1;
			}
		}
		return {
			sessions: sessionCount,
			events: eventCount,
			blobs
		};
	}
	countCaptureRows(table) {
		const query = getNodeSqliteKysely(this.db).selectFrom(table).select((eb) => eb.fn.countAll().as("count"));
		return executeWithCachedStatement(this.db, query.compile().sql, [], (statement) => statement.get()).count ?? 0;
	}
	readSessionDeletionRows(sessionIds) {
		const kysely = getNodeSqliteKysely(this.db);
		const events = kysely.selectFrom("capture_events").where("session_id", "in", sessionIds);
		const blobs = compileSqliteQueryBindings(() => events.select("data_blob_id as blobId").distinct().where("data_blob_id", "is not", null));
		const blobParameters = blobs.bind(void 0);
		const blobRows = executeWithCachedStatement(this.db, blobs.compiled.sql, blobParameters, (statement) => statement.all(...blobParameters));
		const eventQuery = compileSqliteQueryBindings(() => events.select((eb) => eb.fn.countAll().as("count")));
		const eventParameters = eventQuery.bind(void 0);
		const eventRow = executeWithCachedStatement(this.db, eventQuery.compiled.sql, eventParameters, (statement) => statement.get(...eventParameters));
		const sessionQuery = compileSqliteQueryBindings(() => kysely.selectFrom("capture_sessions").select((eb) => eb.fn.countAll().as("count")).where("id", "in", sessionIds));
		const sessionParameters = sessionQuery.bind(void 0);
		const sessionRow = executeWithCachedStatement(this.db, sessionQuery.compiled.sql, sessionParameters, (statement) => statement.get(...sessionParameters));
		return {
			blobRows,
			eventCount: eventRow.count ?? 0,
			sessionCount: sessionRow.count ?? 0
		};
	}
	deleteSessionMetadata(sessionIds) {
		const kysely = getNodeSqliteKysely(this.db);
		const events = compileSqliteQueryBindings(() => kysely.deleteFrom("capture_events").where("session_id", "in", sessionIds));
		const eventParameters = events.bind(void 0);
		executeWithCachedStatement(this.db, events.compiled.sql, eventParameters, (statement) => statement.run(...eventParameters));
		const sessions = compileSqliteQueryBindings(() => kysely.deleteFrom("capture_sessions").where("id", "in", sessionIds));
		const sessionParameters = sessions.bind(void 0);
		executeWithCachedStatement(this.db, sessions.compiled.sql, sessionParameters, (statement) => statement.run(...sessionParameters));
	}
	findRemainingBlobReferences(candidateBlobIds) {
		if (candidateBlobIds.length === 0) return /* @__PURE__ */ new Set();
		const { compiled, bind } = compileSqliteQueryBindings(() => getNodeSqliteKysely(this.db).selectFrom("capture_events").select("data_blob_id as blobId").distinct().where("data_blob_id", "in", candidateBlobIds).where("data_blob_id", "is not", null));
		const parameters = bind(void 0);
		const rows = executeWithCachedStatement(this.db, compiled.sql, parameters, (statement) => statement.all(...parameters));
		return new Set(rows.map((row) => row.blobId?.trim()).filter((blobId) => Boolean(blobId)));
	}
};
function persistEventPayload(store, params) {
	if (params.data == null) return {};
	const buffer = Buffer.isBuffer(params.data) ? params.data : Buffer.from(params.data);
	const previewLimit = params.previewLimit ?? 8192;
	const blob = store.persistPayload(buffer, params.contentType);
	return {
		dataText: new StringDecoder("utf8").write(buffer.subarray(0, previewLimit)),
		dataBlobId: blob.blobId,
		dataSha256: blob.sha256
	};
}
//#endregion
//#region src/proxy-capture/store.sqlite.ts
const DEBUG_PROXY_CAPTURE_LEGACY_SCHEMA_VERSION = 1;
const DEBUG_PROXY_CAPTURE_LEGACY_SCHEMA_SQL = `
  CREATE TABLE IF NOT EXISTS capture_sessions (
    id TEXT PRIMARY KEY,
    started_at INTEGER NOT NULL,
    ended_at INTEGER,
    mode TEXT NOT NULL,
    source_scope TEXT NOT NULL,
    source_process TEXT NOT NULL,
    proxy_url TEXT,
    db_path TEXT NOT NULL,
    blob_dir TEXT NOT NULL
  ) STRICT;
  CREATE TABLE IF NOT EXISTS capture_events (
    id INTEGER PRIMARY KEY,
    session_id TEXT NOT NULL,
    ts INTEGER NOT NULL,
    source_scope TEXT NOT NULL,
    source_process TEXT NOT NULL,
    protocol TEXT NOT NULL,
    direction TEXT NOT NULL,
    kind TEXT NOT NULL,
    flow_id TEXT NOT NULL,
    method TEXT,
    host TEXT,
    path TEXT,
    status INTEGER,
    close_code INTEGER,
    content_type TEXT,
    headers_json TEXT,
    data_text TEXT,
    data_blob_id TEXT,
    data_sha256 TEXT,
    error_text TEXT,
    meta_json TEXT
  ) STRICT;
  CREATE INDEX IF NOT EXISTS capture_events_session_ts_idx ON capture_events(session_id, ts);
  CREATE INDEX IF NOT EXISTS capture_events_flow_idx ON capture_events(flow_id, ts);
`;
function isInMemoryDatabasePath(dbPath) {
	if (dbPath === ":memory:") return true;
	if (!dbPath.startsWith("file:")) return false;
	const fragmentIndex = dbPath.indexOf("#");
	const uriWithoutFragment = fragmentIndex === -1 ? dbPath : dbPath.slice(0, fragmentIndex);
	const queryIndex = uriWithoutFragment.indexOf("?");
	const uriPath = queryIndex === -1 ? uriWithoutFragment : uriWithoutFragment.slice(0, queryIndex);
	try {
		if (decodeURIComponent(uriPath.slice(5)) === ":memory:") return true;
	} catch {}
	return queryIndex !== -1 && new URLSearchParams(uriWithoutFragment.slice(queryIndex + 1)).get("mode") === "memory";
}
function hardenLegacyDatabaseFiles(dbPath) {
	for (const candidate of resolveSqliteDatabaseFilePaths(dbPath)) if (fs$1.existsSync(candidate)) applyPrivateModeSync(candidate, 384);
}
function openPathBasedDebugProxyCaptureStore(dbPath, blobDir) {
	const fileBackedPath = isInMemoryDatabasePath(dbPath) ? void 0 : dbPath;
	if (fileBackedPath) {
		fs$1.mkdirSync(path.dirname(fileBackedPath), {
			recursive: true,
			mode: 448
		});
		if (!fs$1.existsSync(fileBackedPath)) fs$1.closeSync(fs$1.openSync(fileBackedPath, "a", 384));
	}
	const db = openNodeSqliteDatabase(dbPath);
	let walMaintenance;
	try {
		if (fileBackedPath) applyPrivateModeSync(fileBackedPath, 384);
		walMaintenance = configureSqliteConnectionPragmas(db, {
			busyTimeoutMs: 5e3,
			databaseLabel: "debug-proxy-capture-sdk",
			...fileBackedPath ? { databasePath: fileBackedPath } : {},
			foreignKeys: true
		});
		const versionRow = db.prepare("PRAGMA user_version").get();
		const schemaVersion = Number(versionRow?.user_version ?? 0);
		if (schemaVersion > DEBUG_PROXY_CAPTURE_LEGACY_SCHEMA_VERSION) throw new Error(`Legacy debug proxy capture database uses newer schema version ${schemaVersion}; this build supports ${DEBUG_PROXY_CAPTURE_LEGACY_SCHEMA_VERSION}`);
		db.exec(DEBUG_PROXY_CAPTURE_LEGACY_SCHEMA_SQL);
		if (schemaVersion < DEBUG_PROXY_CAPTURE_LEGACY_SCHEMA_VERSION) {
			migrateSqliteSchemaToStrict(db, DEBUG_PROXY_CAPTURE_LEGACY_SCHEMA_SQL, { databaseLabel: fileBackedPath ?? dbPath });
			db.exec(`PRAGMA user_version = ${DEBUG_PROXY_CAPTURE_LEGACY_SCHEMA_VERSION};`);
		}
		if (fileBackedPath) hardenLegacyDatabaseFiles(fileBackedPath);
		return {
			db,
			pathBased: {
				blobDir,
				walMaintenance
			}
		};
	} catch (err) {
		walMaintenance?.close();
		db.close();
		throw err;
	}
}
const sharedDebugProxyCaptureStates = /* @__PURE__ */ new WeakMap();
function runSharedDebugProxyCaptureWrite(owner, operation) {
	const shared = sharedDebugProxyCaptureStates.get(owner);
	if (!shared) throw new Error("shared debug proxy capture state is unavailable");
	return runOpenClawStateWriteTransaction(() => operation(), {
		database: shared.database,
		env: shared.env ?? process.env
	});
}
var DebugProxyCaptureStoreImpl = class extends DebugProxyCaptureKernel {
	constructor(optionsOrDbPath = {}, legacyBlobDir) {
		if (typeof optionsOrDbPath === "string") {
			if (!legacyBlobDir) throw new TypeError("legacy debug proxy capture store requires a blob directory");
			const opened = openPathBasedDebugProxyCaptureStore(optionsOrDbPath, legacyBlobDir);
			super({
				db: opened.db,
				dbPath: optionsOrDbPath,
				blobDir: legacyBlobDir,
				pathBased: opened.pathBased,
				runWrite: (operation) => runSharedDebugProxyCaptureWrite(this, operation)
			});
			this.pathBased = opened.pathBased;
			this.closed = false;
			this.closing = false;
			return;
		}
		const database = openOpenClawStateDatabase({ env: optionsOrDbPath.env });
		super({
			db: database.db,
			dbPath: database.path,
			blobDir: database.path,
			runWrite: (operation) => runSharedDebugProxyCaptureWrite(this, operation)
		});
		this.closed = false;
		this.closing = false;
		this.releaseIdleReference = retainOpenClawStateDatabaseForIdle(database);
		sharedDebugProxyCaptureStates.set(this, {
			database,
			env: optionsOrDbPath.env
		});
	}
	close() {
		if (this.closed || this.closing) return;
		this.closing = true;
		const errors = [];
		for (const close of [
			() => finalizeCaptureStore(this),
			() => this.releaseIdleReference?.(),
			() => this.pathBased?.walMaintenance.close(),
			() => {
				if (this.pathBased && this.db.isOpen) this.db.close();
			}
		]) try {
			close();
		} catch (error) {
			errors.push(error);
		}
		this.closed = true;
		this.closing = false;
		if (errors.length) throw new AggregateError(errors, "Capture store close failed.");
	}
	get isClosed() {
		return this.closed || !this.db.isOpen;
	}
};
const cachedStores = /* @__PURE__ */ new Map();
let unregisterExitClose = null;
function resolveDebugProxyCaptureStoreKey(optionsOrDbPath, legacyBlobDir) {
	return typeof optionsOrDbPath === "string" ? `legacy:${optionsOrDbPath}:${legacyBlobDir ?? ""}` : `shared:${openOpenClawStateDatabase({ env: optionsOrDbPath.env }).path}`;
}
function getDebugProxyCaptureStoreImpl(optionsOrDbPath = {}, legacyBlobDir) {
	const key = resolveDebugProxyCaptureStoreKey(optionsOrDbPath, legacyBlobDir);
	const cached = cachedStores.get(key);
	if (cached && !cached.store.isClosed) return cached.store;
	const store = new DebugProxyCaptureStoreImpl(optionsOrDbPath, legacyBlobDir);
	cachedStores.set(key, {
		store,
		leases: 0
	});
	unregisterExitClose ??= registerSqliteCacheExitClose(closeDebugProxyCaptureStore);
	return store;
}
function getDebugProxyCaptureStore(optionsOrDbPath = {}, legacyBlobDir) {
	return getDebugProxyCaptureStoreImpl(optionsOrDbPath, legacyBlobDir);
}
/** @deprecated Await each async capture lease's release instead. */
function closeDebugProxyCaptureStore() {
	unregisterExitClose?.();
	unregisterExitClose = null;
	const stores = [...cachedStores.values()];
	cachedStores.clear();
	const errors = [];
	for (const cached of stores) try {
		cached.store.close();
	} catch (error) {
		errors.push(error);
	}
	if (errors.length) throw new AggregateError(errors, "Capture stores failed to close.");
}
function safeJsonString(value) {
	return value == null ? void 0 : JSON.stringify(value);
}
//#endregion
//#region src/proxy-capture/runtime-owner.ts
const DEBUG_PROXY_FETCH_PATCH_KEY = Symbol.for("openclaw.debugProxy.fetchPatch");
function captureStateContext() {
	try {
		return { context: captureOpenClawStateWorkerContext() };
	} catch (error) {
		return { error };
	}
}
function currentStateContext(owner) {
	if ("error" in owner.state) throw owner.state.error;
	owner.state.context.admission.assertCurrent();
	return owner.state.context;
}
function resolveRuntimeDeps(deps = {}) {
	return {
		getStore: deps.getStore ?? getDebugProxyCaptureStore,
		closeStore: deps.closeStore,
		persistEventPayload: deps.persistEventPayload ?? ((store, payload) => persistEventPayload(store, payload)),
		safeJsonString: deps.safeJsonString ?? safeJsonString,
		fetchTarget: deps.fetchTarget ?? globalThis
	};
}
const captureOwners = /* @__PURE__ */ new WeakMap();
const globalFetchPatches = /* @__PURE__ */ new WeakMap();
/** Guarded requests own capture admission, including when given a saved patch. */
function resolveDebugProxyFetchTransport(fetchImpl) {
	return globalFetchPatches.get(fetchImpl)?.originalFetch ?? fetchImpl;
}
function uninstallDebugProxyGlobalFetchPatch(deps = {}, admission) {
	const fetchTarget = resolveRuntimeDeps(deps).fetchTarget;
	const state = fetchTarget[DEBUG_PROXY_FETCH_PATCH_KEY];
	if (!state || admission && state.admission !== admission) return;
	fetchTarget.fetch = state.originalFetch;
	delete fetchTarget[DEBUG_PROXY_FETCH_PATCH_KEY];
}
function captureOwnerKey(settings) {
	return JSON.stringify([settings.dbPath, settings.sessionId]);
}
function reportCapturePersistenceFailure(owner, error) {
	owner.errors.push(error);
	reportCaptureError(error);
}
function reportCaptureError(error) {
	try {
		const message = redactRegisteredSecretValues(error instanceof Error ? error.message : String(error), () => REDACTED_CAPTURE_HEADER_VALUE);
		writeSync(2, `[proxy-capture] Capture persistence failed: ${message}\n`);
	} catch {}
}
function finishCaptureOwner(owner) {
	if (!owner.active) return;
	sealCaptureOwner(owner);
	const lastClaim = releaseCaptureClaim(owner);
	try {
		if (lastClaim && !owner.store.isClosed) owner.store.endSession(owner.settings.sessionId);
	} catch (error) {
		reportCapturePersistenceFailure(owner, error);
	}
	forgetCaptureOwner(owner);
	if (owner.errors.length) throw new AggregateError(owner.errors.splice(0), "Capture session finalization failed.");
}
function resolveCaptureOwner(settings, runtime, options = {}) {
	let registry = captureOwners.get(runtime.getStore);
	const key = captureOwnerKey(settings);
	let session = registry?.owners.get(key);
	if (!session) {
		const prior = options.explicit ? registry?.resolved.get(settings) : registry?.ambient?.sessionId === settings.sessionId && registry.ambient.dbPath === settings.dbPath ? registry.ambient.admission : void 0;
		if (!options.initialize && prior) {
			session = prior.current;
			if (!session) return;
		}
	}
	if (session?.closing) return;
	const maintenanceScope = getOpenClawDatabaseMaintenanceScope();
	maintenanceScope?.assertAdmission();
	if (!registry) {
		registry = {
			owners: /* @__PURE__ */ new Map(),
			resolved: /* @__PURE__ */ new WeakMap()
		};
		captureOwners.set(runtime.getStore, registry);
	}
	if (!session) {
		session = {
			settings: { ...settings },
			runtime,
			state: captureStateContext(),
			errors: [],
			claims: /* @__PURE__ */ new Set(),
			admission: {},
			closing: false,
			syncClosed: false,
			usedAsync: false,
			writes: Promise.resolve()
		};
		session.admission.current = session;
	}
	const asynchronous = options.asynchronous === true;
	if (!asynchronous) {
		if (options.initialize) session.syncClosed = false;
		else if (session.syncClosed) return;
	}
	let owner = [...session.claims].find((claim) => claim.maintenanceScope === maintenanceScope && claim.asynchronous === asynchronous);
	if (!owner) {
		const unregister = [];
		const state = "context" in session.state ? { context: {
			...session.state.context,
			maintenanceScope
		} } : session.state;
		const getStore = () => {
			if (session.runtime.getStore !== getDebugProxyCaptureStore) return session.runtime.getStore();
			if ("error" in state) throw state.error;
			state.context.admission.assertCurrent();
			return getDebugProxyCaptureStore({ env: state.context.environment });
		};
		const store = options.asynchronous ? void 0 : getStore();
		if (store?.isClosed) return;
		owner = {
			session,
			maintenanceScope,
			settings: session.settings,
			runtime: session.runtime,
			syncStore: store,
			get store() {
				if (!this.syncStore) {
					if (this.asyncStore?.isClosed) throw new Error("Capture store is closed.");
					this.syncStore = getStore();
					unregister.push(registerCaptureStoreFinalizer(this.syncStore, () => finishCaptureOwner(this)));
				}
				return this.syncStore;
			},
			state,
			asynchronous,
			writes: /* @__PURE__ */ new Set(),
			active: true,
			pending: /* @__PURE__ */ new Set(),
			errors: [],
			unregister: () => {
				for (const remove of unregister.splice(0)) remove();
			},
			admission: {}
		};
		owner.admission.current = owner;
		const retainedOwner = owner;
		if (store) unregister.push(registerCaptureStoreFinalizer(store, () => finishCaptureOwner(retainedOwner)));
		unregister.push(registerActiveDebugProxyCapture(() => closeCaptureOwnerAsync(retainedOwner)));
		session.claims.add(owner);
		registry.owners.set(key, session);
		maintenanceScope?.own(retainedOwner, "shared-resources", () => closeCaptureOwnerAsync(retainedOwner));
	}
	if (!owner.active) return;
	if (options.asynchronous) session.usedAsync = true;
	if (options.explicit) registry.resolved.set(settings, session.admission);
	else registry.ambient = {
		sessionId: settings.sessionId,
		dbPath: settings.dbPath,
		admission: session.admission
	};
	return owner;
}
function resolveCaptureOwnerForTransport(resolved, deps = {}, options = {}) {
	let settings;
	let runtime;
	try {
		settings = resolveEnabledDebugProxySettings(resolved);
		if (!settings) return;
		runtime = resolveRuntimeDeps(deps);
		return resolveCaptureOwner(settings, runtime, {
			explicit: resolved !== void 0,
			...options
		});
	} catch (error) {
		const session = settings && runtime ? captureOwners.get(runtime.getStore)?.owners.get(captureOwnerKey(settings)) : void 0;
		if (session) reportCapturePersistenceFailure(session, error);
		else reportCaptureError(error);
		return;
	}
}
function sealCaptureOwner(owner) {
	revokeCaptureOwner(owner);
	for (const finish of owner.pending) finish();
}
function revokeCaptureOwner(owner) {
	owner.active = false;
	owner.admission.current = void 0;
}
function forgetCaptureOwner(owner) {
	const registry = captureOwners.get(owner.runtime.getStore);
	if (owner.session.claims.size === 0 && registry?.owners.get(captureOwnerKey(owner.settings)) === owner.session) registry.owners.delete(captureOwnerKey(owner.settings));
	owner.unregister();
}
function releaseCaptureClaim(owner) {
	const session = owner.session;
	if (!session.claims.delete(owner)) return false;
	if (session.claims.size > 0) return false;
	session.closing = true;
	session.admission.current = void 0;
	owner.errors.push(...session.errors.splice(0));
	uninstallDebugProxyGlobalFetchPatch(session.runtime, session.admission);
	return true;
}
/** Observe callback-owned work without converting its rejection into success. */
function observeCaptureWrite(owner, operation) {
	owner.writes.add(operation);
	operation.then(() => owner.writes.delete(operation), (error) => {
		owner.writes.delete(operation);
		reportCapturePersistenceFailure(owner, error);
	});
	return operation;
}
function ensureAsyncCaptureLease(owner) {
	const context = currentStateContext(owner);
	if (!owner.asyncLease) {
		const lease = createDebugProxyCaptureStoreForContext(context);
		owner.asyncLease = lease;
		owner.asyncStore = lease.store;
		const unregister = registerAsyncCaptureStoreFinalizer(lease.store, (finalizingStore) => {
			owner.asyncStore = finalizingStore;
			const finishing = finishCaptureOwnerAsync(owner);
			const forgetAfterStoreClose = () => {
				if (!owner.closing) forgetCaptureOwner(owner);
			};
			lease.store.close().then(forgetAfterStoreClose, forgetAfterStoreClose);
			return finishing;
		});
		const previous = owner.unregister;
		owner.unregister = () => {
			unregister();
			previous();
		};
	}
	return owner.asyncLease;
}
async function getAsyncCaptureStore(owner) {
	const lease = ensureAsyncCaptureLease(owner);
	await lease.ready;
	return lease.store;
}
function runCaptureOperation(owner, operation) {
	return ensureAsyncCaptureLease(owner).runOperation(operation);
}
/** Reserve retained input before copying facts or waiting for FIFO admission. */
async function recordCaptureEventAsync(owner, event, payload, store) {
	const data = payload?.data;
	const inputBytes = serialize(payload === void 0 ? {
		type: "capture.recordEvent",
		input: event
	} : {
		type: "capture.recordEventWithPayload",
		input: {
			event,
			payload: {
				...payload,
				data: Buffer.isBuffer(data) ? Buffer.alloc(0) : data
			}
		}
	}).byteLength + (Buffer.isBuffer(data) ? data.byteLength : 0);
	const preparation = reserveSqliteWorkerInputPreparation(inputBytes);
	try {
		const preparedEvent = { ...event };
		const preparedPayload = payload === void 0 ? void 0 : {
			...payload,
			data: Buffer.isBuffer(data) ? Buffer.from(data) : data
		};
		const ready = ensureAsyncCaptureLease(owner).ready;
		return await sequenceCaptureWrite(owner, store, async (execution) => {
			await ready;
			return preparation.handoff(() => preparedPayload === void 0 ? execution.recordEvent(preparedEvent) : execution.recordEventWithPayload(preparedEvent, preparedPayload));
		});
	} finally {
		preparation.release();
	}
}
function sequenceCaptureWrite(owner, store, write) {
	const operation = owner.session.writes.then(() => write(store));
	owner.session.writes = operation.then(() => void 0, () => void 0);
	return owner.maintenanceScope ? owner.maintenanceScope.track(operation) : operation;
}
function finishCaptureOwnerAsync(owner) {
	if (owner.finishing) return owner.finishing;
	const completion = createDeferredCore();
	owner.finishing = completion.promise;
	sealCaptureOwner(owner);
	const finish = async () => {
		while (owner.writes.size) await Promise.allSettled(owner.writes);
		try {
			const lastClaim = releaseCaptureClaim(owner);
			if (lastClaim && owner.asyncLease) {
				const lease = owner.asyncLease;
				await lease.ready;
				const store = owner.asyncStore ?? lease.store;
				if (store.isClosed) throw new SqliteWorkerError("Capture store is closed", "closed");
				await store.endSession(owner.settings.sessionId);
			} else if (lastClaim && owner.syncStore && !owner.syncStore.isClosed) owner.syncStore.endSession(owner.settings.sessionId);
		} catch (error) {
			reportCapturePersistenceFailure(owner, error);
		}
		if (owner.errors.length) throw new AggregateError(owner.errors.splice(0), "Capture session finalization failed.");
	};
	finish().then(completion.resolve, completion.reject);
	completion.promise.catch(() => void 0);
	return completion.promise;
}
function closeCaptureOwnerAsync(owner) {
	if (owner.closing) return owner.closing;
	const completion = createDeferredCore();
	owner.closing = completion.promise;
	revokeCaptureOwner(owner);
	const close = async () => {
		const errors = [];
		try {
			if (owner.asyncLease) await owner.asyncLease.release();
		} catch (error) {
			errors.push(error);
		}
		try {
			await finishCaptureOwnerAsync(owner);
		} catch (error) {
			if (!errors.some((previous) => collectNestedErrorCandidates(previous).includes(error))) errors.push(error);
		}
		try {
			const store = owner.syncStore;
			if (store && ![...owner.session.claims].some((claim) => claim.syncStore === store)) {
				if (owner.runtime.closeStore) owner.runtime.closeStore();
				else store.close?.();
			}
		} catch (error) {
			errors.push(error);
		}
		forgetCaptureOwner(owner);
		if (errors.length) throw new AggregateError(errors, "Capture finalization failed.");
	};
	close().then(completion.resolve, completion.reject);
	completion.promise.catch(() => void 0);
	return completion.promise;
}
//#endregion
//#region src/proxy-capture/runtime-response-body.ts
const MAX_CAPTURED_RESPONSE_BODY_BYTES = 16777216;
const CAPTURED_RESPONSE_BODY_IDLE_TIMEOUT_MS = 1e4;
/** Distinguishes the capture deadline from a genuine response-stream failure. */
var CaptureReadIdleTimeoutError = class extends Error {};
function readCapturedResponseBodyBounded(response, owner, record, signal, asynchronous = false) {
	const recordMetadata = (status) => {
		try {
			record({ status });
		} catch (error) {
			reportCapturePersistenceFailure(owner, error);
		}
	};
	if (typeof response.clone !== "function") {
		recordMetadata("unavailable");
		return;
	}
	const declaredLength = parseDeclaredCaptureContentLength(typeof response.headers?.get === "function" ? response.headers.get("content-length") : void 0);
	if (declaredLength !== void 0 && declaredLength > BigInt(MAX_CAPTURED_RESPONSE_BODY_BYTES)) {
		recordMetadata("too-large");
		return;
	}
	let reader;
	let chunks = [];
	let total = 0;
	let finished = false;
	let canceled = false;
	let detachAbort = () => {};
	const cancel = (reason) => {
		if (!reader || canceled) return;
		canceled = true;
		try {
			reader.cancel(reason).catch(() => void 0);
		} catch (error) {
			owner.errors.push(error);
		}
	};
	const release = () => {
		try {
			reader?.releaseLock();
		} catch {}
	};
	const finish = (result) => {
		if (finished) return;
		finished = true;
		detachAbort();
		owner.pending.delete(finalize);
		try {
			if (!asynchronous && owner.store.isClosed) throw new Error("Capture store closed before its response could be finalized.");
			record(result);
		} catch (error) {
			reportCapturePersistenceFailure(owner, error);
		} finally {
			chunks = [];
			cancel();
			release();
		}
	};
	const finalize = () => finish({
		status: "finalized",
		buffer: Buffer.concat(chunks, total)
	});
	owner.pending.add(finalize);
	if (signal) {
		const onAbort = () => {
			setTimeout(() => {
				if (finished) return;
				finish({
					status: "failed",
					buffer: Buffer.concat(chunks, total),
					error: signal.reason instanceof Error ? signal.reason : new Error("Response capture aborted", { cause: signal.reason })
				});
			}, 0);
		};
		if (signal.aborted) onAbort();
		else {
			signal.addEventListener("abort", onAbort, { once: true });
			detachAbort = () => signal.removeEventListener("abort", onAbort);
		}
	}
	if (finished) return;
	(async () => {
		try {
			const clone = response.clone();
			const body = clone.body;
			if (!body || typeof body.getReader !== "function") {
				finish(clone instanceof Response && clone.body === null ? {
					status: "captured",
					buffer: Buffer.alloc(0)
				} : { status: "unavailable" });
				return;
			}
			reader = body.getReader();
			for (;;) {
				if (finished || !owner.active) return;
				const { done, value } = await withResponseBodyTimeout({
					timeoutMs: CAPTURED_RESPONSE_BODY_IDLE_TIMEOUT_MS,
					onTimeout: ({ timeoutMs }) => new CaptureReadIdleTimeoutError(`capture read stalled: no data for ${timeoutMs}ms`),
					cancel: async (error) => cancel(error),
					read: () => reader.read()
				});
				if (finished || !owner.active) return;
				if (done) {
					finish({
						status: "captured",
						buffer: Buffer.concat(chunks, total)
					});
					return;
				}
				if (!value?.length) continue;
				if (total + value.length > MAX_CAPTURED_RESPONSE_BODY_BYTES) {
					finish({ status: "too-large" });
					return;
				}
				chunks.push(Buffer.from(value));
				total += value.length;
			}
		} catch (error) {
			if (!finished && owner.active) finish(error instanceof CaptureReadIdleTimeoutError ? {
				status: "stalled",
				buffer: Buffer.concat(chunks, total)
			} : {
				status: "failed",
				buffer: Buffer.concat(chunks, total),
				error
			});
		} finally {
			release();
		}
	})();
}
function parseDeclaredCaptureContentLength(raw) {
	if (raw === null || raw === void 0) return;
	const trimmed = raw.trim();
	if (!/^\d+$/.test(trimmed)) return;
	return BigInt(trimmed);
}
//#endregion
//#region src/proxy-capture/runtime.ts
const REDACTED_CAPTURE_BINARY_PAYLOAD = Buffer.from("[REDACTED BINARY PAYLOAD]", "utf8");
function protocolFromUrl(rawUrl) {
	try {
		switch (new URL$1(rawUrl).protocol) {
			case "https:": return "https";
			case "wss:": return "wss";
			case "ws:": return "ws";
			default: return "http";
		}
	} catch {
		return "http";
	}
}
function redactCaptureUrl(rawUrl) {
	let url;
	try {
		url = new URL$1(rawUrl);
	} catch {
		return "https://redacted.invalid/%5BREDACTED%5D";
	}
	const redactComponent = (value) => redactRegisteredSecretValues(value, () => REDACTED_CAPTURE_HEADER_VALUE);
	const decodeComponent = (value) => {
		try {
			return decodeURIComponent(value);
		} catch {
			return value;
		}
	};
	if (redactComponent(url.hostname) !== url.hostname) url.hostname = "redacted.invalid";
	for (const key of ["username", "password"]) {
		const decoded = decodeComponent(url[key]);
		const redacted = redactComponent(decoded);
		if (redacted !== decoded) url[key] = redacted;
	}
	url.pathname = url.pathname.split("/").map((segment) => {
		try {
			const decoded = decodeURIComponent(segment);
			const redacted = redactComponent(decoded);
			return redacted === decoded ? segment : encodeURIComponent(redacted);
		} catch {
			return segment;
		}
	}).join("/");
	const searchParams = new URLSearchParams();
	let searchChanged = false;
	for (const [name, value] of url.searchParams.entries()) {
		const redactedName = redactComponent(name);
		const redactedValue = redactComponent(value);
		searchParams.append(redactedName, redactedValue);
		if (redactedName !== name || redactedValue !== value) searchChanged = true;
	}
	if (searchChanged) url.search = searchParams.toString();
	const decodedHash = decodeComponent(url.hash.slice(1));
	const redactedHash = redactComponent(decodedHash);
	if (redactedHash !== decodedHash) url.hash = redactedHash;
	const serialized = url.toString();
	return redactComponent(serialized) === serialized ? serialized : `${url.protocol}//redacted.invalid/%5BREDACTED%5D`;
}
function redactCaptureText(value) {
	return redactRegisteredSecretValues(value, () => REDACTED_CAPTURE_HEADER_VALUE);
}
function redactCapturePayload(value) {
	if (typeof value === "string") return redactCaptureText(value);
	if (!Buffer.isBuffer(value)) return value ?? null;
	if (!isUtf8(value)) return hasRegisteredSecretValuesForRedaction() ? REDACTED_CAPTURE_BINARY_PAYLOAD : value;
	const text = value.toString("utf8");
	const redacted = redactCaptureText(text);
	return redacted === text ? value : Buffer.from(redacted, "utf8");
}
function redactedCaptureJson(value, stringify = safeJsonString) {
	const serialized = stringify(value);
	return serialized === void 0 ? void 0 : redactCaptureText(serialized);
}
function createHttpCaptureEventBase(params) {
	return {
		sessionId: params.settings.sessionId,
		ts: Date.now(),
		sourceScope: "openclaw",
		sourceProcess: params.settings.sourceProcess,
		protocol: params.transport ?? protocolFromUrl(params.rawUrl),
		direction: params.direction,
		kind: params.kind,
		flowId: params.flowId,
		method: params.method,
		host: params.url.host,
		path: `${params.url.pathname}${params.url.search}`
	};
}
function runOwnedCapture(owner, asynchronous, capture) {
	if (!asynchronous) {
		try {
			owner.maintenanceScope?.assertAdmission();
		} catch (error) {
			reportCapturePersistenceFailure(owner, error);
			return;
		}
		return capture({ asynchronous: false });
	}
	try {
		owner.maintenanceScope?.assertAdmission();
		return observeCaptureWrite(owner, runCaptureOperation(owner, async (store) => {
			await capture({
				asynchronous: true,
				store
			});
		}));
	} catch (error) {
		const failed = createDeferredCore();
		failed.reject(error);
		return observeCaptureWrite(owner, failed.promise);
	}
}
function writeCaptureEvent(owner, event, payload, execution) {
	if (execution.asynchronous) return recordCaptureEventAsync(owner, event, payload, execution.store);
	const store = owner.store;
	const fields = payload === void 0 ? {} : owner.runtime.persistEventPayload(store, payload);
	store.recordEvent({
		...event,
		...fields
	});
}
function captureOwnedHttpError(params, owner, execution = { asynchronous: false }) {
	const asynchronous = execution.asynchronous;
	try {
		const captureUrl = redactCaptureUrl(params.url);
		return writeCaptureEvent(owner, {
			...createHttpCaptureEventBase({
				settings: owner.settings,
				rawUrl: captureUrl,
				url: new URL$1(captureUrl),
				transport: params.transport,
				direction: "local",
				kind: "error",
				flowId: params.flowId ?? randomUUID(),
				method: params.method
			}),
			errorText: redactCaptureText(params.error instanceof Error ? params.error.message : String(params.error)),
			metaJson: redactedCaptureJson(params.meta, owner.runtime.safeJsonString)
		}, void 0, execution);
	} catch (error) {
		if (asynchronous) throw error;
		reportCapturePersistenceFailure(owner, error);
	}
}
function captureOwnedHttpExchange(params, owner, execution = { asynchronous: false }) {
	const asynchronous = execution.asynchronous;
	const { settings, runtime } = owner;
	const flowId = params.flowId ?? randomUUID();
	const captureUrl = redactCaptureUrl(params.url);
	const url = new URL$1(captureUrl);
	const method = params.method;
	const transport = params.transport;
	const responseStatus = params.response.status;
	const requestBody = typeof params.requestBody === "string" || Buffer.isBuffer(params.requestBody) ? params.requestBody : null;
	const rawRequestContentType = params.requestHeaders ? isHeadersLike(params.requestHeaders) ? params.requestHeaders.get("content-type") ?? void 0 : params.requestHeaders["content-type"] : void 0;
	const requestContentType = rawRequestContentType === void 0 ? void 0 : redactCaptureText(rawRequestContentType);
	const rawResponseContentType = typeof params.response.headers?.get === "function" ? params.response.headers.get("content-type") ?? void 0 : void 0;
	const responseContentType = rawResponseContentType === void 0 ? void 0 : redactCaptureText(rawResponseContentType);
	let responseHeadersJson;
	let metaJson;
	let meta;
	let requestWrite;
	try {
		responseHeadersJson = params.response.headers && typeof params.response.headers.entries === "function" ? runtime.safeJsonString(redactedCaptureHeaders(params.response.headers)) : void 0;
		metaJson = redactedCaptureJson(params.meta, runtime.safeJsonString);
		meta = metaJson === void 0 ? void 0 : JSON.parse(metaJson);
		requestWrite = writeCaptureEvent(owner, {
			...createHttpCaptureEventBase({
				settings,
				rawUrl: captureUrl,
				url,
				transport,
				direction: "outbound",
				kind: "request",
				flowId,
				method
			}),
			contentType: requestContentType,
			headersJson: runtime.safeJsonString(redactedCaptureHeaders(params.requestHeaders, Array.isArray(params.meta?.sensitiveRequestHeaderNames) ? params.meta.sensitiveRequestHeaderNames.filter((name) => typeof name === "string") : void 0)),
			metaJson
		}, {
			data: redactCapturePayload(requestBody),
			contentType: requestContentType
		}, execution);
	} catch (error) {
		if (asynchronous) throw error;
		reportCapturePersistenceFailure(owner, error);
		return;
	}
	const completion = asynchronous ? createDeferredCore() : void 0;
	const requestSettled = asynchronous ? Promise.resolve(requestWrite) : void 0;
	if (completion && requestSettled) requestSettled.catch(completion.reject);
	const recordTerminal = (result) => {
		try {
			const failed = result.status === "failed";
			const event = {
				...createHttpCaptureEventBase({
					settings,
					rawUrl: captureUrl,
					url,
					transport,
					direction: failed ? "local" : "inbound",
					kind: failed ? "error" : "response",
					flowId,
					method
				}),
				status: responseStatus,
				contentType: responseContentType,
				headersJson: responseHeadersJson,
				errorText: failed ? redactCaptureText(result.error instanceof Error ? result.error.message : String(result.error)) : void 0,
				metaJson: result.status === "captured" ? metaJson : redactedCaptureJson(Object.assign({}, meta, {
					bodyCapture: result.status,
					...failed ? { stage: "response-body" } : {}
				}), runtime.safeJsonString)
			};
			const payload = "buffer" in result ? {
				data: redactCapturePayload(result.buffer),
				contentType: responseContentType
			} : void 0;
			if (completion && requestSettled) requestSettled.then(() => writeCaptureEvent(owner, event, payload, execution)).then(completion.resolve, completion.reject);
			else writeCaptureEvent(owner, event, payload, execution);
		} catch (error) {
			if (completion) completion.reject(error);
			else throw error;
		}
	};
	readCapturedResponseBodyBounded(params.response, owner, recordTerminal, params.signal, asynchronous);
	return completion?.promise;
}
function prepareHttpCaptureForTransport() {
	const owner = resolveCaptureOwnerForTransport(void 0, {}, { asynchronous: true });
	return owner ? prepareOwnedHttpCapture(owner) : void 0;
}
function prepareOwnedHttpCapture(owner) {
	const admission = owner.admission;
	const ready = observeCaptureWrite(owner, getAsyncCaptureStore(owner).then(() => void 0));
	const reserved = owner.asyncLease !== void 0;
	const capture = (params) => {
		const current = admission.current;
		if (!current) return Promise.resolve();
		if (!reserved) return ready;
		return Promise.resolve(runOwnedCapture(current, true, (execution) => "response" in params ? captureOwnedHttpExchange(params, current, execution) : captureOwnedHttpError(params, current, execution)));
	};
	return capture;
}
//#endregion
export { prepareHttpCaptureForTransport, resolveDebugProxyFetchTransport };
