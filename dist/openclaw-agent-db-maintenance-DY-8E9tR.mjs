import { s as normalizeNullableString } from "./string-coerce-6kR-86XC.mjs";
import { s as asFiniteNumber } from "./number-coercion-Dq1l5muL.mjs";
import { d as toStringifiedError } from "./error-coercion-1P2One0X.mjs";
import { t as createDeferredCore } from "./deferred-D0La5CRk.mjs";
import "./src-SskUVPJG.mjs";
import { a as asOptionalRecord, c as isRecord, r as asNullableRecord } from "./record-coerce-TIsquoVR.mjs";
import { n as safeParseJsonRecord } from "./json-coercion-pfKbZnCJ.mjs";
import { i as getNodeSqliteKysely, n as executeSqliteQuerySync, s as prepareSqliteQuerySync } from "./kysely-sync-Y4_ti-rQ.mjs";
import { r as enableNodeSqliteKyselyStatementCache, t as clearNodeSqliteKyselyCacheForDatabase } from "./kysely-sync-cache-state-BlM1eqOk.mjs";
import { s as quoteSqliteIdentifier, t as extractSqliteTableSchema } from "./sqlite-schema-sql-CKIqAlrf.mjs";
import { t as openNodeSqliteDatabase } from "./node-sqlite-B4hwsR7e.mjs";
import { t as SqliteSchemaMismatchError } from "./sqlite-schema-issues-Cd5MmsG2.mjs";
import { i as tableExists } from "./openclaw-state-db-schema-helpers-C29HKgWe.mjs";
import { t as readExistingAgentSchemaMeta } from "./openclaw-agent-db-metadata-DQ2t48et.mjs";
import { s as OPENCLAW_SQLITE_BUSY_TIMEOUT_MS } from "./openclaw-state-db-contract-CQDemVBb.mjs";
import { t as createSubsystemLogger } from "./subsystem-CeqVSEVi.mjs";
import { a as runSqliteImmediateTransactionSync } from "./sqlite-transaction-2VkikDo-.mjs";
import { t as VERSION } from "./version-BMuSsYfE.mjs";
import { a as readSqliteUserVersion } from "./sqlite-user-version-BLp_KV8U.mjs";
import { n as configureSqlitePreSchemaPragmas } from "./sqlite-wal-fdekKFS3.mjs";
import { o as getOpenClawDatabaseMaintenanceScope } from "./openclaw-state-db-async-lifecycle-D4cx8OBO.mjs";
import { n as sha256Hex } from "./node-crypto-BInnzoVt.mjs";
import "./crypto-digest-y6oZN-_F.mjs";
import { t as resolveRuntimeWorkerArgv } from "./runtime-worker-url-S0NIVxUR.mjs";
import { a as readSqliteInspectionBudget, c as resolveSqliteInspectionSignal, d as sqliteInspectionTimeoutError, i as isSqliteInspectionDeadlineOwnedByCaller } from "./sqlite-readonly-worker-cuICqy4r.mjs";
import { t as assertSqliteSchemaContains } from "./sqlite-schema-contract-DLUumhUB.mjs";
import { n as readSqliteIntegrityFileIdentity } from "./sqlite-file-generation-Z_oSlnyK.mjs";
import { c as sqliteIntegrityCheckSteps, n as assertSqliteIntegrity, s as runSqliteIntegrityOperationSync } from "./sqlite-integrity-BWdDHT-b.mjs";
import { n as migrateSqliteSchemaToStrictInTransaction } from "./sqlite-strict-UBtwgAMG.mjs";
import { C as ensureMemoryRecallMetadataSchema, E as ensureMemoryChunkProvenance, i as migrateMemoryIndexStorage, n as migrateMemoryIndexSourcesIdentity } from "./memory-schema-BpxvsqPW.mjs";
import { t as OPENCLAW_AGENT_SCHEMA_SQL } from "./openclaw-agent-schema-CV4V4sh3.mjs";
import "./openclaw-agent-db-identity-ChZ28OhF.mjs";
import { r as ensureOpenClawAgentBoardSchemaInTransaction } from "./openclaw-agent-board-schema-DDXh5oFv.mjs";
import { g as withoutCanonicalSessionValidationSchema, h as canonicalSessionValidationSchemaSql } from "./openclaw-agent-db-validation-cache-C348cqkT.mjs";
import { n as normalizeAgentId } from "./agent-id-D1-Q6vR4.mjs";
import { t as canReuseOpenClawAgentIntegrityVerification } from "./openclaw-quarantine-store-kMr7ESBr.mjs";
import { a as resolveSqliteDatabaseFilePaths } from "./sqlite-files-BqDG9Qm0.mjs";
import { t as resolveRuntimeProcessEntrypointUrl } from "./runtime-process-url-Dp0Sw2Fd.mjs";
import "./session-key-BC4m_Ly5.mjs";
import { a as isPersistentOpenClawAgentDatabasePath, c as resolveOpenClawAgentSqlitePath } from "./openclaw-agent-db.paths-Dv3PPTNK.mjs";
import { t as resolveZstdCodec } from "./zstd-codec-C-vEb3Qf.mjs";
import { _ as verifyAndRepairCanonicalSqliteIndexes, g as verifyAndRepairCanonicalSqliteIndexSteps, h as repairCanonicalSqliteIndexes, l as runOpenClawStateWriteTransaction, m as repairDoctorSqliteIndexCorruption } from "./openclaw-state-db-DM-mSY0m.mjs";
import { t as configureSqliteMaintenanceCache } from "./sqlite-maintenance-cache-AYpxl8JZ.mjs";
import { n as assertExistingAgentSchemaOwner, r as assertSupportedAgentSchemaVersion } from "./openclaw-agent-db-schema-read-9PMvdeBr.mjs";
import { i as parseSqliteSessionEntryRecord } from "./conversation-ref-C2GC3TG4.mjs";
import { C as ensureSessionEntryValidityProjection, D as migrateSessionTranscriptActiveProjection, E as migrateSessionEntryStatusProjection, O as migrateSessionTranscriptGenerations, S as ensureSessionAdditiveColumns, T as migrateSessionCreatorNamespaces, a as getOpenClawAgentMigrationSchema, b as dropLegacyRuntimeJournalSchemas, c as migrateRetiredAgentStateLeaseSchema, d as withLegacyAgentStorageSchema, f as migrateDeployedTranscriptFtsRowsInTransaction, g as withLegacySessionParticipantsSchema, h as migrateSessionParticipantsSchema, i as ensureSessionKeyContractSchemaInTransaction, k as readSqliteTableColumns, l as migratedSessionColumn, m as withoutSessionEntrySnapshotsSchema, n as assertOpenClawAgentCurrentRuntimeSchema, o as hasPendingCurrentVersionAgentDatabaseMigration, p as sessionEntrySnapshotsSchemaSql, r as assertOpenClawAgentSchemaContains, s as hasPendingMemoryChunkMetadataMigration, t as assertAgentSchemaVersion, u as repairAndAssertOpenClawAgentV14SchemaForMigration, w as migrateConversationDeliveryTargetColumn, x as dropLegacySessionTranscriptSearchSchema, y as backfillSessionConversations } from "./openclaw-agent-db-schema-helpers-CF1dsxGG.mjs";
import { a as prepareAgentDeletionPathFence, t as assertAgentDeletionPathFence } from "./agent-deletion-journal-C9BqqBYt.mjs";
import { t as assertAgentDeletionRecoveryAllowsMutation } from "./agent-deletion-journal-recovery--JiHJSwq.mjs";
import { _ as renewAgentDatabaseMaintenanceAuthorityIfPresent, i as assertAgentDatabaseMaintenanceAuthorityIfPresent, r as assertAgentDatabaseMaintenanceAuthority, u as invalidateOpenClawAgentDatabaseIntegrityBeforeMutation } from "./openclaw-agent-db-lease-B-E6z2mk.mjs";
import { t as registerOpenClawAgentDatabase } from "./openclaw-agent-db-registry-DqXgJmeH.mjs";
import { a as splitSessionEntrySnapshots } from "./session-entry-snapshots-CHPWIM1D.mjs";
import { i as prepareTranscriptPayload } from "./transcript-payload-BY1k8MVa.mjs";
import { chmodSync, existsSync, mkdirSync, statSync } from "node:fs";
import path from "node:path";
import { AsyncLocalStorage } from "node:async_hooks";
import { fork } from "node:child_process";
import { performance as performance$1 } from "node:perf_hooks";
//#region src/infra/sqlite-integrity-worker-error.ts
var SqliteIntegrityWorkerInterruptedError = class extends Error {
	constructor(signal, lastObservedPhase) {
		super(`SQLite integrity check stopped by ${signal} before completion (lastObservedPhase=${lastObservedPhase})`);
		this.signal = signal;
		this.name = "SqliteIntegrityWorkerInterruptedError";
	}
};
//#endregion
//#region src/infra/sqlite-integrity-worker.ts
const integrityScope = new AsyncLocalStorage();
async function closeIntegrityProcess(worker) {
	if (!worker.retired) {
		worker.retired = true;
		if (worker.child.connected) worker.child.send({ type: "close" }, (error) => {
			if (error) worker.child.kill("SIGKILL");
		});
	}
	const timeout = setTimeout(() => worker.child.kill("SIGKILL"), worker.closeBudgetMs);
	timeout.unref();
	try {
		await worker.closed;
	} finally {
		clearTimeout(timeout);
	}
}
/** Reuse imports within one maintenance lease; each request opens and closes its own database. */
async function withSqliteIntegrityWorkerScope(assertCurrent, operation) {
	const parent = integrityScope.getStore();
	if (parent && !parent.accepting) throw new Error("SQLite integrity maintenance scope is closed");
	const scope = {
		queue: parent?.queue ?? { tail: Promise.resolve() },
		assertCurrent,
		accepting: true,
		pending: /* @__PURE__ */ new Set()
	};
	try {
		return await integrityScope.run(scope, async () => {
			let outcome;
			try {
				outcome = { value: await operation() };
			} catch (error) {
				outcome = { error };
			}
			scope.accepting = false;
			const errors = "error" in outcome ? [outcome.error] : [];
			for (const result of await Promise.allSettled(scope.pending)) if (result.status === "rejected" && !errors.includes(result.reason)) errors.push(result.reason);
			try {
				assertCurrent();
			} catch (error) {
				if (!errors.includes(error)) errors.push(error);
			}
			if (errors.length > 1) throw new AggregateError(errors, "SQLite integrity maintenance scope failed", { cause: errors[0] });
			if (errors.length === 1) throw errors[0];
			if ("error" in outcome) throw outcome.error;
			return outcome.value;
		});
	} finally {
		scope.accepting = false;
		if (!parent && scope.queue.process) await closeIntegrityProcess(scope.queue.process);
	}
}
/** The caller retains its owning lease or private snapshot until the native reader closes. */
function assertSqliteIntegrityInWorker(pathname, busyTimeoutMs, callerSignal, databaseLabel = pathname, timing, tables) {
	const scope = integrityScope.getStore();
	const run = async (heldScope) => {
		if (!tables) return assertSqliteIntegrityWithProcess(pathname, busyTimeoutMs, callerSignal, databaseLabel, timing, heldScope);
		heldScope?.assertCurrent();
		const startedAt = performance$1.now();
		const full = tables.filter((entry) => entry.check === "integrity_check");
		const batches = [tables.filter((entry) => entry.check === "quick_check"), ...Array.from({ length: Math.min(3, full.length) }, (_, index) => full.filter((_entry, position) => position % 3 === index))].filter((batch) => batch.length > 0).map((batch) => ({
			tables: batch,
			timing: {}
		}));
		const results = await Promise.allSettled(batches.map(async (batch) => assertSqliteIntegrityWithProcess(pathname, busyTimeoutMs, callerSignal, databaseLabel, batch.timing, void 0, batch.tables)));
		if (timing) {
			timing.workerLifetimeElapsedMs = performance$1.now() - startedAt;
			timing.workerCheckElapsedMs = Math.max(0, ...batches.map((batch) => batch.timing.workerCheckElapsedMs ?? 0));
			timing.tables = batches.flatMap((batch) => batch.timing.tables ?? []).toSorted((a, b) => a.table.localeCompare(b.table));
		}
		heldScope?.assertCurrent();
		for (const result of results) if (result.status === "rejected") throw result.reason;
	};
	if (!scope) return run();
	if (!scope.accepting) return Promise.reject(/* @__PURE__ */ new Error("SQLite integrity maintenance scope is closed"));
	const pending = scope.queue.tail.then(async () => {
		try {
			if (scope.queue.process?.retired) await scope.queue.process.closed;
			await run(scope);
		} catch (error) {
			if (scope.queue.process) await closeIntegrityProcess(scope.queue.process);
			throw error;
		}
	});
	scope.queue.tail = pending.catch(() => void 0);
	scope.pending.add(pending);
	pending.finally(() => scope.pending.delete(pending)).catch(() => void 0);
	return pending;
}
function assertSqliteIntegrityWithProcess(pathname, busyTimeoutMs, callerSignal, databaseLabel, timing, scope, tables) {
	const signal = resolveSqliteInspectionSignal(callerSignal) ?? callerSignal;
	if (timing) {
		delete timing.workerCheckElapsedMs;
		delete timing.workerLifetimeElapsedMs;
	}
	signal.throwIfAborted();
	scope?.assertCurrent();
	const identity = readSqliteIntegrityFileIdentity(pathname);
	const { timeoutMs, size } = readSqliteInspectionBudget("integrity check", databaseLabel, identity.size);
	const startedAt = timing ? performance$1.now() : 0;
	let active = scope?.queue.process;
	if (!active || active.retired) {
		const entry = resolveRuntimeProcessEntrypointUrl("sqliteIntegrity");
		const child = fork(entry, [], {
			execArgv: resolveRuntimeWorkerArgv(entry).slice(0, -1),
			serialization: "advanced",
			stdio: [
				"ignore",
				"ignore",
				"ignore",
				"ipc"
			],
			timeout: scope || isSqliteInspectionDeadlineOwnedByCaller() ? void 0 : timeoutMs,
			killSignal: "SIGKILL",
			...scope ? {} : { signal }
		});
		const { promise: closed, resolve: onClosed } = createDeferredCore();
		active = {
			child,
			closed,
			retired: false,
			closeBudgetMs: timeoutMs
		};
		const launched = active;
		child.on("error", (error) => {
			launched.failure = toStringifiedError(error);
			launched.retired = true;
			child.kill("SIGKILL");
		});
		child.once("close", () => {
			launched.retired = true;
			onClosed();
		});
		if (scope) scope.queue.process = active;
	}
	active.closeBudgetMs = timeoutMs;
	const reader = active;
	const worker = reader.child;
	return new Promise((resolve, reject) => {
		let result;
		let failure;
		let lastObservedPhase = "starting";
		let timeout;
		const deadlineError = () => {
			const error = sqliteInspectionTimeoutError("integrity check", databaseLabel, timeoutMs, size);
			error.message += ` (lastObservedPhase=${lastObservedPhase})`;
			return error;
		};
		const kill = () => {
			reader.retired = true;
			worker.kill("SIGKILL");
		};
		const onAbort = () => {
			failure = toStringifiedError(signal.reason);
			kill();
		};
		const finish = (code, closeSignal) => {
			clearTimeout(timeout);
			signal.removeEventListener("abort", onAbort);
			worker.off("message", onMessage);
			worker.off("close", onClose);
			if (timing) {
				timing.workerLifetimeElapsedMs = performance$1.now() - startedAt;
				timing.tables = result?.tables;
				const checkElapsedMs = result?.checkElapsedMs;
				if (typeof checkElapsedMs === "number" && Number.isFinite(checkElapsedMs) && checkElapsedMs >= 0) timing.workerCheckElapsedMs = checkElapsedMs;
			}
			try {
				signal.throwIfAborted();
				scope?.assertCurrent();
				const workerFailure = failure ?? reader.failure;
				if (workerFailure) throw workerFailure;
				if (worker.killed && closeSignal === "SIGKILL") throw deadlineError();
				if (code !== 0 || !result) {
					if (!result && closeSignal) throw new SqliteIntegrityWorkerInterruptedError(closeSignal, lastObservedPhase);
					throw new Error(`SQLite integrity worker exited ${code} without a completed check (lastObservedPhase=${lastObservedPhase})`);
				}
				readSqliteIntegrityFileIdentity(pathname, identity);
				if (!result.ok) {
					const cause = result.error.cause ? Object.assign(new Error(result.error.cause.message), result.error.cause) : void 0;
					throw Object.assign(new Error(result.error.message, cause ? { cause } : void 0), {
						name: result.error.name,
						code: result.error.code,
						errcode: result.error.errcode
					});
				}
				resolve();
			} catch (error) {
				if (scope && !reader.retired) {
					kill();
					reader.closed.then(() => reject(toStringifiedError(error)));
				} else reject(toStringifiedError(error));
			}
		};
		const onClose = (code, closeSignal) => finish(code, closeSignal);
		const onMessage = (message) => {
			if ("type" in message && message.type === "phase") {
				if (!result && (message.phase === "opening" || message.phase === "checking" || message.phase === "closing")) lastObservedPhase = message.phase;
			} else if ("ok" in message) {
				result = message;
				lastObservedPhase = "result-received";
				if (scope) {
					if (message.ok && !reader.retired && !failure && !reader.failure) finish(0, null);
					else reader.retired = true;
				}
			}
		};
		worker.on("message", onMessage);
		worker.once("close", onClose);
		if (scope) {
			signal.addEventListener("abort", onAbort, { once: true });
			if (!isSqliteInspectionDeadlineOwnedByCaller()) {
				timeout = setTimeout(() => {
					if (!result || result.ok) failure ??= reader.failure ?? deadlineError();
					kill();
				}, timeoutMs);
				timeout.unref();
			}
		}
		if (!signal.aborted) worker.send({
			pathname,
			databaseLabel,
			identity,
			busyTimeoutMs,
			tables,
			...scope ? { reuse: true } : {}
		}, (error) => {
			if (error) {
				failure = error;
				kill();
			}
		});
		else if (scope) onAbort();
	});
}
//#endregion
//#region src/state/openclaw-agent-db-permissions.ts
const OPENCLAW_AGENT_DB_DIR_MODE = 448;
const OPENCLAW_AGENT_DB_FILE_MODE = 384;
function ensureMode(target, mode) {
	if (process.platform === "win32" || (statSync(target).mode & 4095) !== mode) chmodSync(target, mode);
}
function ensureOpenClawAgentDatabasePermissions(pathname, options) {
	const dir = path.dirname(pathname);
	const defaultPath = resolveOpenClawAgentSqlitePath({
		agentId: options.agentId,
		env: options.env
	});
	const isDefaultAgentDatabase = path.resolve(pathname) === path.resolve(defaultPath);
	const dirExisted = existsSync(dir);
	mkdirSync(dir, {
		recursive: true,
		mode: OPENCLAW_AGENT_DB_DIR_MODE
	});
	if (isDefaultAgentDatabase || !dirExisted) ensureMode(dir, OPENCLAW_AGENT_DB_DIR_MODE);
	for (const candidate of resolveSqliteDatabaseFilePaths(pathname)) try {
		ensureMode(candidate, OPENCLAW_AGENT_DB_FILE_MODE);
	} catch (error) {
		if (error.code !== "ENOENT") throw error;
	}
}
const USAGE_COST_ROLLUP_FORMAT_VERSION = 1;
const USAGE_COST_ROLLUP_SCOPE = "session-cost-usage-rollup-v3";
const zstd = resolveZstdCodec();
function encodeUsageCostRollup(entry) {
	const json = JSON.stringify(entry.rollup);
	const raw = Buffer.from(json, "utf8");
	const compressed = raw.byteLength >= 1024 ? zstd?.compress(raw, 1) : void 0;
	const useCompressed = compressed !== void 0 && compressed.byteLength < raw.byteLength;
	const bytes = useCompressed ? compressed : raw;
	const envelope = {
		version: entry.version,
		pricingFingerprint: entry.pricingFingerprint,
		checkpoint: entry.checkpoint,
		scannedAt: entry.scannedAt,
		parsedRecords: entry.parsedRecords,
		countedRecords: entry.countedRecords,
		format: USAGE_COST_ROLLUP_FORMAT_VERSION,
		body: {
			encoding: useCompressed ? "zstd" : "identity",
			bytes: raw.byteLength,
			storedBytes: bytes.byteLength,
			utf16Length: json.length,
			sha256: sha256Hex(raw)
		}
	};
	return {
		valueJson: JSON.stringify(envelope),
		blob: Uint8Array.from(bytes)
	};
}
function decodeUsageCostRollupEnvelope(valueJson, pricingFingerprint) {
	try {
		const record = JSON.parse(valueJson);
		if (!isRecord(record)) return;
		if (record.version !== 6 || record.format !== USAGE_COST_ROLLUP_FORMAT_VERSION || typeof record.pricingFingerprint !== "string" || pricingFingerprint !== void 0 && record.pricingFingerprint !== pricingFingerprint || !isRecord(record.checkpoint) || record.checkpoint.kind !== "jsonl" && record.checkpoint.kind !== "sqlite" || typeof record.scannedAt !== "number" || typeof record.parsedRecords !== "number" || typeof record.countedRecords !== "number" || !isRecord(record.body) || record.body.encoding !== "identity" && record.body.encoding !== "zstd" || typeof record.body.bytes !== "number" || !Number.isSafeInteger(record.body.bytes) || record.body.bytes <= 0 || typeof record.body.storedBytes !== "number" || !Number.isSafeInteger(record.body.storedBytes) || record.body.storedBytes <= 0 || typeof record.body.utf16Length !== "number" || !Number.isSafeInteger(record.body.utf16Length) || record.body.utf16Length <= 0 || typeof record.body.sha256 !== "string" || !/^[0-9a-f]{64}$/.test(record.body.sha256)) return;
		return record;
	} catch {
		return;
	}
}
function decodeUsageCostRollup(valueJson, pricingFingerprint, blob) {
	const envelope = decodeUsageCostRollupEnvelope(valueJson, pricingFingerprint);
	if (!envelope || !blob || blob.byteLength !== envelope.body.storedBytes) return;
	try {
		const raw = envelope.body.encoding === "zstd" ? zstd?.decompress(blob, envelope.body.bytes) : Buffer.from(blob.buffer, blob.byteOffset, blob.byteLength);
		if (!raw || raw.byteLength !== envelope.body.bytes || sha256Hex(raw) !== envelope.body.sha256) return;
		const json = raw.toString("utf8");
		if (json.length !== envelope.body.utf16Length) return;
		const rollup = JSON.parse(json);
		if (!isRecord(rollup) || !isRecord(rollup.buckets) || !isRecord(rollup.untimestamped)) return;
		const { format: _format, body: _body, ...metadata } = envelope;
		return {
			...metadata,
			rollup
		};
	} catch {
		return;
	}
}
function isUsageCostRollupFresh(params) {
	const { checkpoint } = params;
	if (!checkpoint || checkpoint.kind !== params.file.kind) return false;
	if (checkpoint.kind === "jsonl") return checkpoint.observedSize === params.file.size && checkpoint.observedMtimeMs === params.file.mtimeMs && checkpoint.device === params.file.device && checkpoint.inode === params.file.inode;
	return checkpoint.size === params.file.size && checkpoint.mtimeMs === params.file.mtimeMs && checkpoint.eventCount === params.file.eventCount && checkpoint.maxSeq === params.file.maxSeq;
}
function canUseUsageCostRollupForPartial(params) {
	const checkpoint = params.checkpoint;
	if (!checkpoint || checkpoint.kind !== params.file.kind) return false;
	if (checkpoint.kind === "jsonl") return checkpoint.parsedOffset <= params.file.size && checkpoint.device === params.file.device && checkpoint.inode === params.file.inode;
	return checkpoint.maxSeq <= (params.file.maxSeq ?? 0);
}
//#endregion
//#region src/infra/session-cost-usage-cache-migration.ts
const PREVIOUS_SCOPE = "session-cost-usage-rollup-v2";
/** Migration-only reader for the retired complete-JSON representation. */
function decodePreviousRollup(valueJson) {
	if (valueJson === null) return;
	try {
		const value = JSON.parse(valueJson);
		if (!isRecord(value) || value.version !== 6 || typeof value.pricingFingerprint !== "string" || !isRecord(value.checkpoint) || value.checkpoint.kind !== "jsonl" && value.checkpoint.kind !== "sqlite" || typeof value.scannedAt !== "number" || typeof value.parsedRecords !== "number" || typeof value.countedRecords !== "number" || !isRecord(value.rollup) || !isRecord(value.rollup.buckets) || !isRecord(value.rollup.untimestamped)) return;
		return value;
	} catch {
		return;
	}
}
/** Caller owns the migration transaction; retain at most one complete report body at a time. */
function migrateSessionCostUsageRollupStorage(db, renewAuthority) {
	const cache = getNodeSqliteKysely(db);
	let afterKey;
	for (;;) {
		renewAuthority?.();
		let query = cache.selectFrom("cache_entries").select([
			"key",
			"value_json",
			"updated_at"
		]).where("scope", "=", PREVIOUS_SCOPE).orderBy("key", "asc").limit(1);
		if (afterKey !== void 0) query = query.where("key", ">", afterKey);
		const row = executeSqliteQuerySync(db, query).rows[0];
		if (!row) break;
		afterKey = row.key;
		const entry = decodePreviousRollup(row.value_json);
		if (entry) {
			const encoded = encodeUsageCostRollup(entry);
			executeSqliteQuerySync(db, cache.insertInto("cache_entries").values({
				scope: USAGE_COST_ROLLUP_SCOPE,
				key: row.key,
				value_json: encoded.valueJson,
				blob: encoded.blob,
				updated_at: row.updated_at,
				expires_at: null
			}).onConflict((conflict) => conflict.columns(["scope", "key"]).doNothing()));
		}
		executeSqliteQuerySync(db, cache.deleteFrom("cache_entries").where("scope", "=", PREVIOUS_SCOPE).where("key", "=", row.key));
	}
}
//#endregion
//#region src/state/openclaw-agent-db-session-provenance.ts
function readMigratedEntry(value) {
	return typeof value === "string" ? safeParseJsonRecord(value) : asOptionalRecord(value);
}
function addSessionProvenanceColumns(db, columns) {
	if (columns && !columns.has("session_entry_provenance")) db.exec("ALTER TABLE sessions ADD COLUMN session_entry_provenance INTEGER NOT NULL DEFAULT 0 CHECK (session_entry_provenance IN (0, 1));");
	if (columns && !columns.has("acp_owned")) db.exec("ALTER TABLE sessions ADD COLUMN acp_owned INTEGER NOT NULL DEFAULT 0 CHECK (acp_owned IN (0, 1));");
	if (columns && !columns.has("plugin_owner_id")) db.exec("ALTER TABLE sessions ADD COLUMN plugin_owner_id TEXT;");
	if (columns && !columns.has("hook_external_content_source")) db.exec("ALTER TABLE sessions ADD COLUMN hook_external_content_source TEXT CHECK (hook_external_content_source IS NULL OR hook_external_content_source IN ('gmail', 'webhook'));");
}
function backfillSessionEntryProvenance(db, previousVersion) {
	if (previousVersion >= 8) return;
	const hasSessionEntries = tableExists(db, "session_entries");
	const hasSessions = tableExists(db, "sessions");
	if (!hasSessionEntries || !hasSessions) return;
	const rows = db.prepare(`SELECT se.session_id, se.entry_json
       FROM session_entries AS se
       INNER JOIN sessions AS s
         ON s.session_id = se.session_id AND s.session_key = se.session_key;`).all();
	const update = db.prepare(`
    UPDATE sessions
    SET session_entry_provenance = 1, acp_owned = ?, plugin_owner_id = ?,
        hook_external_content_source = ?
    WHERE session_id = ?;
  `);
	update.setReadBigInts(true);
	for (const row of rows) {
		const sessionId = normalizeNullableString(row.session_id);
		const entry = readMigratedEntry(row.entry_json);
		if (!sessionId || !entry) continue;
		const hookSource = normalizeNullableString(entry.hookExternalContentSource);
		update.run(isRecord(entry.acp) ? 1 : 0, normalizeNullableString(entry.pluginOwnerId), hookSource === "gmail" || hookSource === "webhook" ? hookSource : null, sessionId);
	}
}
function backfillTranscriptMutationWatermarks(db) {
	if (!tableExists(db, "transcript_events")) return;
	db.exec(`
    UPDATE sessions
    SET
      transcript_updated_at = COALESCE(
        transcript_updated_at,
        (SELECT MAX(transcript_events.created_at)
         FROM transcript_events
         WHERE transcript_events.session_id = sessions.session_id)
      ),
      transcript_observed_at = COALESCE(transcript_observed_at, updated_at)
    WHERE EXISTS (
      SELECT 1 FROM transcript_events
      WHERE transcript_events.session_id = sessions.session_id
    );
  `);
}
//#endregion
//#region src/state/openclaw-agent-db-legacy-schema.ts
function migrateOpenClawAgentSchema(db) {
	const userVersion = readSqliteUserVersion(db);
	if (userVersion >= 24) return;
	if (userVersion < 7) {
		db.exec("DROP INDEX IF EXISTS idx_agent_sessions_status;");
		migrateSessionEntryStatusProjection(db, (entryJson) => {
			const entry = parseMigratedSessionEntry(entryJson);
			return entry ? migratedStatus(entry.status) : null;
		});
	}
	if (userVersion < 6) db.exec("DROP INDEX IF EXISTS idx_agent_session_entries_session_id;");
	if (userVersion < 3) db.exec("DROP INDEX IF EXISTS idx_agent_transcript_events_session;");
	const columns = readSqliteTableColumns(db, "sessions");
	if (columns && !columns.has("transcript_updated_at")) db.exec("ALTER TABLE sessions ADD COLUMN transcript_updated_at INTEGER DEFAULT NULL;");
	if (columns && !columns.has("transcript_observed_at")) db.exec("ALTER TABLE sessions ADD COLUMN transcript_observed_at INTEGER DEFAULT NULL;");
	addSessionProvenanceColumns(db, columns);
	if (!columns) return;
	if (userVersion > 1) {
		backfillTranscriptMutationWatermarks(db);
		return;
	}
	const projection = {
		session_id: "session_id",
		session_key: "session_key",
		session_scope: migratedSessionColumn(columns, "session_scope", "'conversation'"),
		created_at: "created_at",
		updated_at: "updated_at",
		session_entry_provenance: migratedSessionColumn(columns, "session_entry_provenance", "0"),
		acp_owned: migratedSessionColumn(columns, "acp_owned", "0"),
		plugin_owner_id: migratedSessionColumn(columns, "plugin_owner_id", "NULL"),
		hook_external_content_source: migratedSessionColumn(columns, "hook_external_content_source", "NULL"),
		started_at: migratedSessionColumn(columns, "started_at", "NULL"),
		ended_at: migratedSessionColumn(columns, "ended_at", "NULL"),
		status: migratedSessionColumn(columns, "status", "NULL"),
		chat_type: migratedSessionColumn(columns, "chat_type", "NULL"),
		channel: migratedSessionColumn(columns, "channel", "NULL"),
		account_id: migratedSessionColumn(columns, "account_id", "NULL"),
		primary_conversation_id: migratedSessionColumn(columns, "primary_conversation_id", "NULL"),
		model_provider: migratedSessionColumn(columns, "model_provider", "NULL"),
		model: migratedSessionColumn(columns, "model", "NULL"),
		agent_harness_id: migratedSessionColumn(columns, "agent_harness_id", "NULL"),
		parent_session_key: migratedSessionColumn(columns, "parent_session_key", "NULL"),
		spawned_by: migratedSessionColumn(columns, "spawned_by", "NULL"),
		display_name: migratedSessionColumn(columns, "display_name", "NULL")
	};
	db.exec(`
    CREATE TABLE IF NOT EXISTS conversations (
      conversation_id TEXT NOT NULL PRIMARY KEY,
      channel TEXT NOT NULL,
      account_id TEXT NOT NULL,
      kind TEXT NOT NULL CHECK (kind IN ('direct', 'group', 'channel')),
      peer_id TEXT NOT NULL,
      delivery_target TEXT NOT NULL,
      parent_conversation_id TEXT,
      thread_id TEXT,
      native_channel_id TEXT,
      native_direct_user_id TEXT,
      label TEXT,
      metadata_json TEXT,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    );
  `);
	db.exec(`
      DROP TABLE IF EXISTS sessions_new;
      CREATE TABLE sessions_new (
        session_id TEXT NOT NULL PRIMARY KEY,
        session_key TEXT NOT NULL,
        session_scope TEXT NOT NULL DEFAULT 'conversation' CHECK (session_scope IN ('conversation', 'shared-main', 'group', 'channel')),
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL,
        transcript_updated_at INTEGER DEFAULT NULL,
        transcript_observed_at INTEGER DEFAULT NULL,
        session_entry_provenance INTEGER NOT NULL DEFAULT 0 CHECK (session_entry_provenance IN (0, 1)),
        acp_owned INTEGER NOT NULL DEFAULT 0 CHECK (acp_owned IN (0, 1)),
        plugin_owner_id TEXT,
        hook_external_content_source TEXT CHECK (hook_external_content_source IS NULL OR hook_external_content_source IN ('gmail', 'webhook')),
        started_at INTEGER,
        ended_at INTEGER,
        status TEXT CHECK (status IS NULL OR status IN ('running', 'done', 'failed', 'killed', 'timeout')),
        chat_type TEXT CHECK (chat_type IS NULL OR chat_type IN ('direct', 'group', 'channel')),
        channel TEXT,
        account_id TEXT,
        primary_conversation_id TEXT,
        model_provider TEXT,
        model TEXT,
        agent_harness_id TEXT,
        parent_session_key TEXT,
        spawned_by TEXT,
        display_name TEXT,
        FOREIGN KEY (primary_conversation_id) REFERENCES conversations(conversation_id) ON DELETE SET NULL
      );
      INSERT INTO sessions_new (${Object.keys(projection).join(", ")})
      SELECT ${Object.values(projection).join(", ")} FROM sessions;
      DROP TABLE sessions;
      ALTER TABLE sessions_new RENAME TO sessions;
    `);
	backfillTranscriptMutationWatermarks(db);
}
function parseMigratedSessionEntry(value) {
	if (typeof value !== "string") return null;
	return safeParseJsonRecord(value) ?? null;
}
function migratedChatType(value) {
	if (value === "direct" || value === "group" || value === "channel") return value;
	return null;
}
function migratedStatus(value) {
	if (value === "running" || value === "done" || value === "failed" || value === "killed" || value === "timeout") return value;
	return null;
}
function migratedSessionScope(entry, sessionKey) {
	const chatType = migratedChatType(entry.chatType);
	const normalizedKey = sessionKey.trim().toLowerCase();
	if (chatType === "direct" && (normalizedKey === "main" || normalizedKey.endsWith(":main"))) return "shared-main";
	if (chatType === "group" || chatType === "channel") return chatType;
	return "conversation";
}
function migratedEntryChannel(entry) {
	const delivery = asNullableRecord(entry.delivery);
	const deliveryContext = asNullableRecord(delivery?.context) ?? asNullableRecord(entry.deliveryContext);
	const origin = asNullableRecord(delivery?.origin) ?? asNullableRecord(entry.origin);
	return normalizeNullableString(entry.channel) ?? normalizeNullableString(deliveryContext?.channel) ?? normalizeNullableString(entry.lastChannel) ?? normalizeNullableString(origin?.provider);
}
function migratedEntryAccountId(entry) {
	const delivery = asNullableRecord(entry.delivery);
	const deliveryContext = asNullableRecord(delivery?.context) ?? asNullableRecord(entry.deliveryContext);
	const origin = asNullableRecord(delivery?.origin) ?? asNullableRecord(entry.origin);
	return normalizeNullableString(deliveryContext?.accountId) ?? normalizeNullableString(entry.lastAccountId) ?? normalizeNullableString(origin?.accountId);
}
function migratedEntryDisplayName(entry) {
	return normalizeNullableString(entry.displayName) ?? normalizeNullableString(entry.label) ?? normalizeNullableString(entry.subject) ?? normalizeNullableString(entry.groupId);
}
function backfillOpenClawAgentSchema(db, previousVersion) {
	if (previousVersion >= 2) return;
	if (!readSqliteTableColumns(db, "session_entries") || !readSqliteTableColumns(db, "sessions")) return;
	if (!readSqliteTableColumns(db, "session_routes")) db.exec(`
      CREATE TABLE session_routes (
        session_key TEXT NOT NULL PRIMARY KEY,
        session_id TEXT NOT NULL,
        updated_at INTEGER NOT NULL,
        FOREIGN KEY (session_id) REFERENCES sessions(session_id) ON DELETE CASCADE
      );
    `);
	db.exec(`
    INSERT OR REPLACE INTO session_routes (session_key, session_id, updated_at)
    SELECT se.session_key, se.session_id, se.updated_at
    FROM session_entries AS se
    INNER JOIN sessions AS s ON s.session_id = se.session_id;
  `);
	const rows = db.prepare(`
        SELECT se.session_key, se.session_id, se.entry_json
        FROM session_entries AS se
        INNER JOIN sessions AS s ON s.session_id = se.session_id;
      `).all();
	const update = db.prepare(`
    UPDATE sessions
    SET
      session_scope = ?,
      started_at = ?,
      ended_at = ?,
      status = ?,
      chat_type = ?,
      channel = ?,
      account_id = ?,
      model_provider = ?,
      model = ?,
      agent_harness_id = ?,
      parent_session_key = ?,
      spawned_by = ?,
      display_name = ?
    WHERE session_id = ?;
  `);
	update.setReadBigInts(true);
	for (const row of rows) {
		const sessionKey = normalizeNullableString(row.session_key);
		const sessionId = normalizeNullableString(row.session_id);
		const entry = parseMigratedSessionEntry(row.entry_json);
		if (!sessionKey || !sessionId || !entry) continue;
		update.run(migratedSessionScope(entry, sessionKey), asFiniteNumber(entry.startedAt) ?? null, asFiniteNumber(entry.endedAt) ?? null, migratedStatus(entry.status), migratedChatType(entry.chatType), migratedEntryChannel(entry), migratedEntryAccountId(entry), normalizeNullableString(entry.modelProvider), normalizeNullableString(entry.model), normalizeNullableString(entry.agentHarnessId), normalizeNullableString(entry.parentSessionKey), normalizeNullableString(entry.spawnedBy), migratedEntryDisplayName(entry), sessionId);
	}
}
//#endregion
//#region src/state/openclaw-agent-db-metadata-write.ts
function persistAgentSchemaMetadata(db, agentId, targetVersion) {
	const now = Date.now();
	const metadata = {
		role: "agent",
		schema_version: targetVersion,
		agent_id: agentId,
		app_version: VERSION
	};
	executeSqliteQuerySync(db, getNodeSqliteKysely(db).insertInto("schema_meta").values({
		meta_key: "primary",
		...metadata,
		created_at: now,
		updated_at: now
	}).onConflict((conflict) => conflict.column("meta_key").doUpdateSet({
		...metadata,
		updated_at: now
	}).where((eb) => eb.or([
		eb("schema_meta.schema_version", "!=", targetVersion),
		eb("schema_meta.app_version", "is", null),
		eb("schema_meta.app_version", "!=", VERSION),
		eb("schema_meta.agent_id", "!=", agentId)
	]))));
}
//#endregion
//#region src/state/openclaw-agent-db-session-nodes-migration.ts
const SESSION_NODE_SCHEMA_VERSION = 14;
function jsonText(path) {
	return `CASE
    WHEN json_valid(entry_json) AND json_type(entry_json, '${path}') = 'text'
    THEN NULLIF(trim(CAST(json_extract(entry_json, '${path}') AS TEXT)), '')
    ELSE NULL
  END`;
}
function jsonNumber(path) {
	return `CASE
    WHEN json_valid(entry_json) AND json_type(entry_json, '${path}') IN ('integer', 'real')
    THEN CAST(json_extract(entry_json, '${path}') AS INTEGER)
    ELSE NULL
  END`;
}
function createSessionNodes(db) {
	db.exec(`
    CREATE TABLE IF NOT EXISTS session_nodes (
      session_key TEXT NOT NULL PRIMARY KEY,
      current_session_id TEXT NOT NULL,
      entry_json TEXT NOT NULL,
      updated_at INTEGER NOT NULL,
      status TEXT CHECK (status IS NULL OR status IN ('running', 'done', 'failed', 'killed', 'timeout')),
      created_at INTEGER,
      created_via TEXT CHECK (created_via IS NULL OR created_via IN ('operator', 'spawn', 'channel', 'cron', 'talk', 'run', 'plugin', 'internal')),
      created_actor_type TEXT CHECK (created_actor_type IS NULL OR created_actor_type IN ('human', 'agent', 'system')),
      created_actor_id TEXT,
      parent_session_key TEXT,
      spawned_by TEXT,
      fork_source_session_key TEXT,
      fork_source_session_id TEXT,
      fork_source_entry_id TEXT,
      label TEXT,
      display_name TEXT,
      category TEXT,
      icon TEXT,
      pinned_at INTEGER,
      archived_at INTEGER,
      last_read_at INTEGER,
      last_interaction_at INTEGER,
      last_activity_at INTEGER
    ) STRICT;
  `);
}
/** Live entries take precedence over routes, then retained generations. */
function createLegacySessionNodeSelects(db) {
	const selects = [];
	const entryColumns = readSqliteTableColumns(db, "session_entries");
	if (entryColumns) {
		const status = migratedSessionColumn(entryColumns, "status", "NULL");
		selects.push({
			replace: true,
			columns: `session_key, current_session_id, entry_json, updated_at, status,
        created_at, created_via, created_actor_type, created_actor_id,
        parent_session_key, spawned_by, fork_source_session_key,
        fork_source_session_id, fork_source_entry_id, label, display_name,
        category, icon, pinned_at, archived_at, last_read_at,
        last_interaction_at, last_activity_at`,
			sql: `SELECT
        session_key,
        session_id,
        entry_json,
        updated_at,
        ${status},
        ${jsonNumber("$.createdAt")},
        CASE
          WHEN json_valid(entry_json)
            AND json_extract(entry_json, '$.createdVia') IN
              ('operator', 'spawn', 'channel', 'cron', 'talk', 'run', 'plugin', 'internal')
          THEN json_extract(entry_json, '$.createdVia')
          ELSE NULL
        END,
        CASE
          WHEN json_valid(entry_json)
            AND json_extract(entry_json, '$.createdActor.type') IN ('human', 'agent', 'system')
          THEN json_extract(entry_json, '$.createdActor.type')
          WHEN ${jsonText("$.createdBy.id")} IS NOT NULL THEN 'human'
          ELSE NULL
        END,
        COALESCE(${jsonText("$.createdActor.id")}, ${jsonText("$.createdBy.id")}),
        COALESCE(${jsonText("$.parentSessionKey")}, ${jsonText("$.spawnedBy")}),
        ${jsonText("$.spawnedBy")},
        ${jsonText("$.forkSource.sessionKey")},
        ${jsonText("$.forkSource.sessionId")},
        ${jsonText("$.forkSource.entryId")},
        ${jsonText("$.label")},
        ${jsonText("$.displayName")},
        ${jsonText("$.category")},
        NULL,
        ${jsonNumber("$.pinnedAt")},
        ${jsonNumber("$.archivedAt")},
        ${jsonNumber("$.lastReadAt")},
        ${jsonNumber("$.lastInteractionAt")},
        ${jsonNumber("$.lastActivityAt")}
      FROM session_entries`
		});
	}
	if (readSqliteTableColumns(db, "session_routes")) selects.push({
		replace: false,
		columns: `session_key, current_session_id, entry_json, updated_at`,
		sql: `SELECT session_key, session_id, '{}', updated_at
      FROM session_routes`
	});
	selects.push({
		replace: false,
		columns: `session_key, current_session_id, entry_json, updated_at`,
		sql: `SELECT session_key, session_id, '{}', updated_at
    FROM sessions`
	});
	return selects;
}
function backfillSessionNodes(db) {
	for (const projection of createLegacySessionNodeSelects(db)) db.exec(`INSERT OR ${projection.replace ? "REPLACE" : "IGNORE"} INTO session_nodes
      (${projection.columns}) ${projection.sql};`);
}
/** Project the legacy window owner with the migration's entry/route precedence. */
function createLegacySessionWindowSelect(db, source) {
	const columns = readSqliteTableColumns(db, "sessions");
	if (!columns) return;
	const entryColumns = readSqliteTableColumns(db, "session_entries");
	const routeColumns = readSqliteTableColumns(db, "session_routes");
	const ownerValue = (table, column) => `(SELECT candidate.${column}
        FROM ${table} AS candidate
        INNER JOIN ${source} AS owner_window ON owner_window.session_id = candidate.session_id
        WHERE candidate.session_id = ${source}.session_id
        ORDER BY CASE WHEN candidate.session_key = owner_window.session_key THEN 0 ELSE 1 END,
                 candidate.updated_at DESC,
                 candidate.session_key ASC
        LIMIT 1)`;
	const entryOwner = entryColumns ? ownerValue("session_entries", "session_key") : "NULL";
	const routeOwner = routeColumns ? ownerValue("session_routes", "session_key") : "NULL";
	const currentEntryJson = entryColumns ? ownerValue("session_entries", "entry_json") : "NULL";
	return {
		columns: `session_id, session_key, previous_session_id, reason, session_scope,
      created_at, updated_at, transcript_updated_at, transcript_observed_at,
      session_entry_provenance, acp_owned, plugin_owner_id,
      hook_external_content_source, started_at, ended_at, status, chat_type,
      channel, account_id, primary_conversation_id, model_provider, model,
      agent_harness_id, parent_session_key, spawned_by, display_name`,
		sql: `SELECT
      session_id,
      COALESCE(${entryOwner}, ${routeOwner}, session_key),
      CASE
        WHEN json_valid(${currentEntryJson})
        THEN NULLIF(trim(CAST(json_extract(${currentEntryJson}, '$.previousSessionId') AS TEXT)), '')
        ELSE NULL
      END,
      NULL,
      ${migratedSessionColumn(columns, "session_scope", "'conversation'")},
      created_at,
      updated_at,
      ${migratedSessionColumn(columns, "transcript_updated_at", "NULL")},
      ${migratedSessionColumn(columns, "transcript_observed_at", "NULL")},
      ${migratedSessionColumn(columns, "session_entry_provenance", "0")},
      ${migratedSessionColumn(columns, "acp_owned", "0")},
      ${migratedSessionColumn(columns, "plugin_owner_id", "NULL")},
      ${migratedSessionColumn(columns, "hook_external_content_source", "NULL")},
      ${migratedSessionColumn(columns, "started_at", "NULL")},
      ${migratedSessionColumn(columns, "ended_at", "NULL")},
      ${migratedSessionColumn(columns, "status", "NULL")},
      ${migratedSessionColumn(columns, "chat_type", "NULL")},
      ${migratedSessionColumn(columns, "channel", "NULL")},
      ${migratedSessionColumn(columns, "account_id", "NULL")},
      ${migratedSessionColumn(columns, "primary_conversation_id", "NULL")},
      ${migratedSessionColumn(columns, "model_provider", "NULL")},
      ${migratedSessionColumn(columns, "model", "NULL")},
      ${migratedSessionColumn(columns, "agent_harness_id", "NULL")},
      ${migratedSessionColumn(columns, "parent_session_key", "NULL")},
      ${migratedSessionColumn(columns, "spawned_by", "NULL")},
      ${migratedSessionColumn(columns, "display_name", "NULL")}
    FROM ${source}`
	};
}
function migrateSessionWindows(db) {
	const projection = createLegacySessionWindowSelect(db, "session_windows");
	if (!projection) return;
	db.exec("ALTER TABLE sessions RENAME TO session_windows;");
	db.exec(`
    DROP TABLE IF EXISTS session_windows_new;
    CREATE TABLE session_windows_new (
      session_id TEXT NOT NULL PRIMARY KEY,
      session_key TEXT NOT NULL,
      previous_session_id TEXT,
      reason TEXT CHECK (reason IS NULL OR reason IN ('initial', 'reset', 'rollover', 'fork', 'rewind', 'switch', 'recovery', 'compaction')),
      session_scope TEXT NOT NULL DEFAULT 'conversation' CHECK (session_scope IN ('conversation', 'shared-main', 'group', 'channel')),
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL,
      transcript_updated_at INTEGER DEFAULT NULL,
      transcript_observed_at INTEGER DEFAULT NULL,
      session_entry_provenance INTEGER NOT NULL DEFAULT 0 CHECK (session_entry_provenance IN (0, 1)),
      acp_owned INTEGER NOT NULL DEFAULT 0 CHECK (acp_owned IN (0, 1)),
      plugin_owner_id TEXT,
      hook_external_content_source TEXT CHECK (hook_external_content_source IS NULL OR hook_external_content_source IN ('gmail', 'webhook')),
      started_at INTEGER,
      ended_at INTEGER,
      status TEXT CHECK (status IS NULL OR status IN ('running', 'done', 'failed', 'killed', 'timeout')),
      chat_type TEXT CHECK (chat_type IS NULL OR chat_type IN ('direct', 'group', 'channel')),
      channel TEXT,
      account_id TEXT,
      primary_conversation_id TEXT,
      model_provider TEXT,
      model TEXT,
      agent_harness_id TEXT,
      parent_session_key TEXT,
      spawned_by TEXT,
      display_name TEXT,
      FOREIGN KEY (session_key) REFERENCES session_nodes(session_key) ON DELETE CASCADE,
      FOREIGN KEY (primary_conversation_id) REFERENCES conversations(conversation_id) ON DELETE SET NULL
    ) STRICT;
    INSERT INTO session_windows_new (${projection.columns})
    ${projection.sql};
    DROP TABLE session_windows;
    ALTER TABLE session_windows_new RENAME TO session_windows;
  `);
}
function renameTranscriptRewriteWatermarks(db) {
	if (readSqliteTableColumns(db, "session_transcript_generations") && !readSqliteTableColumns(db, "transcript_rewrite_watermarks")) db.exec("ALTER TABLE session_transcript_generations RENAME TO transcript_rewrite_watermarks;");
}
function rebuildBoardTabs(db) {
	if (!readSqliteTableColumns(db, "board_tabs")) return;
	if (readSqliteTableColumns(db, "board_widgets")) db.exec(`
      DELETE FROM board_widgets
      WHERE NOT EXISTS (
        SELECT 1 FROM session_nodes WHERE session_nodes.session_key = board_widgets.session_key
      );
    `);
	db.exec(`
    DROP TABLE IF EXISTS board_tabs_new;
    CREATE TABLE board_tabs_new (
      session_key TEXT NOT NULL,
      tab_id TEXT NOT NULL,
      title TEXT NOT NULL,
      position INTEGER NOT NULL CHECK (position >= 0),
      chat_dock TEXT NOT NULL DEFAULT 'right' CHECK (chat_dock IN ('left', 'right', 'bottom', 'hidden')),
      created_by TEXT NOT NULL CHECK (created_by IN ('user', 'agent')),
      revision INTEGER NOT NULL CHECK (revision >= 0),
      PRIMARY KEY (session_key, tab_id),
      FOREIGN KEY (session_key) REFERENCES session_nodes(session_key) ON DELETE CASCADE
    ) STRICT;
    INSERT INTO board_tabs_new (
      session_key, tab_id, title, position, chat_dock, created_by, revision
    )
    SELECT b.session_key, b.tab_id, b.title, b.position, b.chat_dock, b.created_by, b.revision
    FROM board_tabs AS b
    INNER JOIN session_nodes AS n ON n.session_key = b.session_key;
    DROP TABLE board_tabs;
    ALTER TABLE board_tabs_new RENAME TO board_tabs;
  `);
}
function rebuildHeartbeatOutcomes(db) {
	const columns = readSqliteTableColumns(db, "heartbeat_outcomes");
	if (!columns) return;
	db.exec(`
    DROP TABLE IF EXISTS heartbeat_outcomes_new;
    CREATE TABLE heartbeat_outcomes_new (
      session_key TEXT NOT NULL PRIMARY KEY,
      run_session_key TEXT NOT NULL,
      outcome TEXT NOT NULL CHECK (outcome IN ('progress', 'done', 'blocked', 'needs_attention')),
      summary TEXT NOT NULL,
      response_reason TEXT,
      priority TEXT CHECK (priority IS NULL OR priority IN ('low', 'normal', 'high')),
      next_check TEXT,
      task_names_json TEXT,
      wake_source TEXT,
      wake_reason TEXT,
      occurred_at INTEGER NOT NULL,
      context_run_id TEXT,
      context_claimed_at INTEGER,
      updated_at INTEGER NOT NULL,
      FOREIGN KEY (session_key) REFERENCES session_nodes(session_key) ON DELETE CASCADE
    ) STRICT;
    INSERT INTO heartbeat_outcomes_new (
      session_key, run_session_key, outcome, summary, response_reason, priority,
      next_check, task_names_json, wake_source, wake_reason, occurred_at,
      context_run_id, context_claimed_at, updated_at
    )
    SELECT
      h.session_key,
      h.run_session_key,
      h.outcome,
      h.summary,
      ${migratedSessionColumn(columns, "response_reason", "NULL")},
      ${migratedSessionColumn(columns, "priority", "NULL")},
      ${migratedSessionColumn(columns, "next_check", "NULL")},
      ${migratedSessionColumn(columns, "task_names_json", "NULL")},
      ${migratedSessionColumn(columns, "wake_source", "NULL")},
      ${migratedSessionColumn(columns, "wake_reason", "NULL")},
      h.occurred_at,
      ${migratedSessionColumn(columns, "context_run_id", "NULL")},
      ${migratedSessionColumn(columns, "context_claimed_at", "NULL")},
      h.updated_at
    FROM heartbeat_outcomes AS h
    INNER JOIN session_nodes AS n ON n.session_key = h.session_key;
    DROP TABLE heartbeat_outcomes;
    ALTER TABLE heartbeat_outcomes_new RENAME TO heartbeat_outcomes;
  `);
}
function rebuildSessionMembers(db) {
	if (!readSqliteTableColumns(db, "session_members")) return;
	db.exec(`
    DROP TABLE IF EXISTS session_members_new;
    CREATE TABLE session_members_new (
      session_key TEXT NOT NULL,
      identity_id TEXT NOT NULL,
      added_by TEXT NOT NULL,
      added_at INTEGER NOT NULL,
      PRIMARY KEY (session_key, identity_id),
      FOREIGN KEY (session_key) REFERENCES session_nodes(session_key) ON DELETE CASCADE
    ) STRICT;
    INSERT INTO session_members_new (session_key, identity_id, added_by, added_at)
    SELECT m.session_key, m.identity_id, m.added_by, m.added_at
    FROM session_members AS m
    INNER JOIN session_nodes AS n ON n.session_key = m.session_key;
    DROP TABLE session_members;
    ALTER TABLE session_members_new RENAME TO session_members;
  `);
}
function rebuildTranscriptIndexState(db) {
	const columns = readSqliteTableColumns(db, "session_transcript_index_state");
	if (!columns) return;
	db.exec(`
    DROP TABLE IF EXISTS session_transcript_index_state_new;
    CREATE TABLE session_transcript_index_state_new (
      session_id TEXT NOT NULL PRIMARY KEY,
      indexed_seq INTEGER NOT NULL,
      leaf_event_id TEXT,
      needs_rebuild INTEGER NOT NULL DEFAULT 0,
      active_event_count INTEGER NOT NULL DEFAULT 0,
      active_message_count INTEGER NOT NULL DEFAULT 0,
      updated_at INTEGER NOT NULL,
      FOREIGN KEY (session_id) REFERENCES session_windows(session_id) ON DELETE CASCADE
    ) STRICT;
    INSERT INTO session_transcript_index_state_new (
      session_id, indexed_seq, leaf_event_id, needs_rebuild,
      active_event_count, active_message_count, updated_at
    )
    SELECT
      i.session_id,
      i.indexed_seq,
      ${migratedSessionColumn(columns, "leaf_event_id", "NULL")},
      ${migratedSessionColumn(columns, "needs_rebuild", "0")},
      ${migratedSessionColumn(columns, "active_event_count", "0")},
      ${migratedSessionColumn(columns, "active_message_count", "0")},
      i.updated_at
    FROM session_transcript_index_state AS i
    INNER JOIN session_windows AS w ON w.session_id = i.session_id;
    DROP TABLE session_transcript_index_state;
    ALTER TABLE session_transcript_index_state_new RENAME TO session_transcript_index_state;
  `);
}
/** Replace split entry/route roots with logical nodes and generation windows. */
function migrateSessionNodesAndWindows(db, previousVersion) {
	if (previousVersion >= SESSION_NODE_SCHEMA_VERSION || !readSqliteTableColumns(db, "sessions")) return;
	createSessionNodes(db);
	backfillSessionNodes(db);
	migrateSessionWindows(db);
	renameTranscriptRewriteWatermarks(db);
	rebuildBoardTabs(db);
	rebuildHeartbeatOutcomes(db);
	rebuildSessionMembers(db);
	rebuildTranscriptIndexState(db);
	db.exec(`
    DROP TABLE IF EXISTS session_routes;
    DROP TABLE IF EXISTS session_entries;
  `);
}
//#endregion
//#region src/state/openclaw-agent-session-snapshots-migration.ts
/** The existing schema owner holds maintenance authority and the outer write transaction. */
function migrateSessionEntrySnapshotsInTransaction(database) {
	database.exec("ALTER TABLE session_nodes ADD COLUMN snapshot_revision INTEGER NOT NULL DEFAULT 0");
	database.exec(sessionEntrySnapshotsSchemaSql(OPENCLAW_AGENT_SCHEMA_SQL));
	const db = getNodeSqliteKysely(database);
	const select = db.selectFrom("session_nodes").select([
		"session_key",
		"current_session_id",
		"updated_at",
		"entry_json"
	]).orderBy("session_key").limit(64);
	const selectAfter = prepareSqliteQuerySync(database, (parameter) => select.where("session_key", ">", parameter((key) => key)));
	const insert = prepareSqliteQuerySync(database, (parameter) => db.insertInto("session_entry_snapshots").values({
		session_key: parameter((row) => row.sessionKey),
		field: parameter((row) => row.field),
		value_json: parameter((row) => row.valueJson)
	}));
	const update = prepareSqliteQuerySync(database, (parameter) => db.updateTable("session_nodes").set({ entry_json: parameter((row) => row.entryJson) }).where("session_key", "=", parameter((row) => row.sessionKey)));
	const markValid = prepareSqliteQuerySync(database, (parameter) => db.updateTable("session_nodes").set({ entry_valid: 1 }).where("session_key", "=", parameter((key) => key)));
	let after;
	while (true) {
		const { rows } = after === void 0 ? executeSqliteQuerySync(database, select) : selectAfter(after);
		if (rows.length === 0) return;
		renewAgentDatabaseMaintenanceAuthorityIfPresent();
		for (const row of rows) {
			if (typeof row.session_key !== "string" || typeof row.current_session_id !== "string" || typeof row.updated_at !== "number" || typeof row.entry_json !== "string") throw new Error("Unreadable session row during snapshot migration");
			after = row.session_key;
			const entry = parseSqliteSessionEntryRecord({
				current_session_id: row.current_session_id,
				updated_at: row.updated_at,
				entry_json: row.entry_json
			});
			if (!entry) continue;
			const { entryJson, snapshots } = splitSessionEntrySnapshots(entry);
			if (snapshots.length === 0) continue;
			for (const snapshot of snapshots) insert({
				sessionKey: row.session_key,
				...snapshot
			});
			update({
				entryJson,
				sessionKey: row.session_key
			});
			markValid(row.session_key);
		}
	}
}
//#endregion
//#region src/state/openclaw-agent-transcript-payload-migration.ts
const MIGRATION_TABLE = "transcript_events_payload_migration";
const KNOWN_CHILDREN = /* @__PURE__ */ new Set(["transcript_event_identities", "session_transcript_active_events"]);
function assertTranscriptRebuildInputs(database) {
	assertSqliteSchemaContains(database, "transcript payload migration", extractSqliteTableSchema(withLegacyAgentStorageSchema(OPENCLAW_AGENT_SCHEMA_SQL), "transcript_events"));
	const columns = database.prepare("PRAGMA table_xinfo(transcript_events)").all();
	const expectedColumns = /* @__PURE__ */ new Set([
		"session_id",
		"seq",
		"event_json",
		"created_at"
	]);
	if (columns.length !== expectedColumns.size || columns.some((column) => typeof column.name !== "string" || !expectedColumns.has(column.name))) throw new Error("Transcript payload migration cannot discard unknown columns");
	if (database.prepare(`SELECT name FROM sqlite_schema
      WHERE (type IN ('trigger', 'index') AND tbl_name = 'transcript_events' AND sql IS NOT NULL)
         OR (type IN ('view', 'trigger') AND sql LIKE '%transcript_events%')`).all().length > 0) throw new Error("Transcript payload migration cannot rebuild unknown indexes, views, or triggers");
	if (database.prepare("SELECT 1 FROM sqlite_schema WHERE name = ?").get(MIGRATION_TABLE)) throw new Error("Transcript payload migration table already exists");
	for (const table of database.prepare("SELECT name FROM sqlite_schema WHERE type = 'table'").all()) {
		if (typeof table.name !== "string") throw new Error("Invalid table name during transcript payload migration");
		if (KNOWN_CHILDREN.has(table.name)) continue;
		if (database.prepare(`PRAGMA foreign_key_list(${quoteSqliteIdentifier(table.name)})`).all().some((key) => key.table === "transcript_events")) throw new Error("Transcript payload migration cannot rebuild an unknown foreign-key target");
	}
}
/** Convert original bytes under the admitted agent migration; never hydrate oversized identity rows. */
function migrateTranscriptPayloadStorageInTransaction(database) {
	if (!database.isTransaction || database.prepare("PRAGMA foreign_keys").get()?.foreign_keys !== 0) throw new Error("Transcript payload migration requires an admitted transaction with foreign keys off");
	assertTranscriptRebuildInputs(database);
	const utf8 = database.prepare("PRAGMA encoding").get()?.encoding === "UTF-8";
	const decoder = new TextDecoder("utf-8", {
		fatal: true,
		ignoreBOM: true
	});
	const codec = resolveZstdCodec();
	database.exec(extractSqliteTableSchema(OPENCLAW_AGENT_SCHEMA_SQL, "transcript_events").replace("IF NOT EXISTS transcript_events", MIGRATION_TABLE));
	const copyIdentity = database.prepare(`
    INSERT INTO ${MIGRATION_TABLE}
      (rowid, session_id, seq, event_json, created_at, event_zstd, event_utf8_bytes, navigation_json)
    SELECT rowid, session_id, seq, event_json, created_at, NULL,
           CASE WHEN ? THEN octet_length(event_json) ELSE NULL END, ?
    FROM transcript_events WHERE rowid = ?`);
	const copyCompressed = database.prepare(`
    INSERT INTO ${MIGRATION_TABLE}
      (rowid, session_id, seq, event_json, created_at, event_zstd, event_utf8_bytes, navigation_json)
    SELECT rowid, session_id, seq, NULL, created_at, ?, ?, ?
    FROM transcript_events WHERE rowid = ?`);
	copyIdentity.setReadBigInts(true);
	copyCompressed.setReadBigInts(true);
	const readBytes = database.prepare("SELECT CAST(event_json AS BLOB) AS bytes FROM transcript_events WHERE rowid = ?");
	const metadata = database.prepare("SELECT rowid AS storage_rowid, octet_length(event_json) AS bytes FROM transcript_events ORDER BY rowid");
	metadata.setReadBigInts(true);
	let renewedAt = performance.now();
	for (const row of metadata.iterate()) {
		if (performance.now() - renewedAt >= 1e3) {
			renewAgentDatabaseMaintenanceAuthorityIfPresent();
			renewedAt = performance.now();
		}
		if (typeof row.storage_rowid !== "bigint" || typeof row.bytes !== "bigint") throw new Error("Invalid transcript storage identity during migration");
		let navigation = null;
		let copied = false;
		if (utf8 && row.bytes <= BigInt(4194304)) {
			const bytes = readBytes.get(row.storage_rowid)?.bytes;
			if (!(bytes instanceof Uint8Array)) throw new Error("Transcript payload disappeared during migration");
			let text;
			try {
				text = decoder.decode(bytes);
			} catch {}
			if (text !== void 0) {
				const payload = prepareTranscriptPayload(database, text);
				navigation = payload.navigation_json;
				if (payload.event_zstd !== null) {
					if (!codec || payload.event_utf8_bytes === null || !codec.decompress(payload.event_zstd, payload.event_utf8_bytes).equals(bytes)) throw new Error("Transcript compression did not preserve canonical bytes");
					const result = copyCompressed.run(payload.event_zstd, payload.event_utf8_bytes, navigation, row.storage_rowid);
					if (Number(result.changes) !== 1) throw new Error("Transcript payload disappeared before migration publication");
					copied = true;
				}
			}
		}
		if (!copied && Number(copyIdentity.run(utf8 ? 1 : 0, navigation, row.storage_rowid).changes) !== 1) throw new Error("Transcript identity payload disappeared before migration publication");
	}
	renewAgentDatabaseMaintenanceAuthorityIfPresent();
	database.exec(`DROP TABLE transcript_events;
    ALTER TABLE ${MIGRATION_TABLE} RENAME TO transcript_events;`);
}
//#endregion
//#region src/state/openclaw-agent-db-schema.ts
const agentDbLog$1 = createSubsystemLogger("state/agent-db");
function dropLegacyMemoryIndexSchema(db) {
	if (!db.prepare("PRAGMA table_info(memory_index_sources)").all().some((row) => row.name === "source_kind")) return;
	db.exec(`
    DROP TABLE IF EXISTS memory_index_chunks_fts;
    DROP TABLE IF EXISTS memory_index_chunks;
    DROP TABLE IF EXISTS memory_index_sources;
  `);
}
function migrateMemoryChunkMetadataSchema(db) {
	ensureMemoryRecallMetadataSchema(db);
	ensureMemoryChunkProvenance(db);
}
function* agentDatabaseIntegrityBeforeMutationSteps(database, agentId, pathname, diagnostics, verification, reuseRuntimeIntegrity = false, runtimeAdmission = false) {
	database.exec(`PRAGMA busy_timeout = ${OPENCLAW_SQLITE_BUSY_TIMEOUT_MS};`);
	const userVersion = readSqliteUserVersion(database);
	const hasApplicationSchema = database.prepare("SELECT 1 FROM sqlite_master WHERE name NOT LIKE 'sqlite_%' LIMIT 1").get();
	const migrationPending = userVersion === 0 && hasApplicationSchema !== void 0 || userVersion > 0 && userVersion < 24;
	if (migrationPending) agentDbLog$1.info("agent database schema migration pending; verifying integrity first", {
		fromVersion: userVersion,
		path: pathname,
		toVersion: 24
	});
	const hasPendingCurrentVersionMigration = userVersion === 24 && hasPendingCurrentVersionAgentDatabaseMigration(database);
	if (userVersion === 24 && !hasPendingCurrentVersionMigration) {
		const startedAt = performance.now();
		const reuseIntegrity = reuseRuntimeIntegrity || canReuseOpenClawAgentIntegrityVerification(pathname, verification, migrationPending || hasPendingCurrentVersionMigration);
		const rebuiltIndexes = yield* verifyAndRepairCanonicalSqliteIndexSteps(database, pathname, OPENCLAW_AGENT_SCHEMA_SQL, {
			allowMissingColumns: true,
			validateAfterRepair: () => assertOpenClawAgentCurrentRuntimeSchema(database, {
				agentId,
				pathname
			}),
			diagnostics,
			integrityTables: runtimeAdmission && !reuseIntegrity ? [{ name: "sqlite_schema" }, ...database.prepare("SELECT name FROM sqlite_schema WHERE type = 'table' ORDER BY name").all()].map(({ name }) => ({
				table: String(name),
				check: name === "transcript_events" ? "quick_check" : "integrity_check"
			})) : void 0,
			reuseIntegrity
		});
		if (rebuiltIndexes.length > 0) agentDbLog$1.warn(`Rebuilt canonical agent SQLite indexes for ${agentId} (${pathname}): ${rebuiltIndexes.join(", ")}`, {
			agentId,
			path: pathname,
			indexes: rebuiltIndexes,
			elapsedMs: Math.floor(performance.now() - startedAt)
		});
		assertOpenClawAgentCurrentRuntimeSchema(database, {
			agentId,
			pathname
		});
	} else if (userVersion === 0 && !hasApplicationSchema && database.prepare("PRAGMA page_count").get()?.page_count === 0) assertSqliteIntegrity(database, pathname);
	else yield* sqliteIntegrityCheckSteps(database, pathname, diagnostics);
	return hasPendingCurrentVersionMigration;
}
function seedCanonicalSessionValidationPending(db) {
	db.exec(`
    INSERT INTO session_canonical_validation_pending (session_key)
    SELECT node.session_key FROM session_nodes AS node
    WHERE NOT EXISTS (
      SELECT 1 FROM session_canonical_validation_pending AS pending
      WHERE pending.session_key = node.session_key
    );
  `);
}
function migrateAgentStorageInTransaction(db, schemaSql, previousVersion) {
	renewAgentDatabaseMaintenanceAuthorityIfPresent();
	if (previousVersion === 22) migrateDeployedTranscriptFtsRowsInTransaction(db, schemaSql);
	else if (db.prepare("SELECT 1 FROM sqlite_schema WHERE name = ?").get("session_transcript_fts_rows")) throw new Error("Transcript FTS row map already exists before the schema-23 storage migration.");
	renewAgentDatabaseMaintenanceAuthorityIfPresent();
	migrateTranscriptPayloadStorageInTransaction(db);
	renewAgentDatabaseMaintenanceAuthorityIfPresent();
	migrateMemoryIndexStorage(db, { renewAuthority: renewAgentDatabaseMaintenanceAuthorityIfPresent });
	renewAgentDatabaseMaintenanceAuthorityIfPresent();
	migrateSessionCostUsageRollupStorage(db, renewAgentDatabaseMaintenanceAuthorityIfPresent);
	renewAgentDatabaseMaintenanceAuthorityIfPresent();
	db.exec(schemaSql);
	if (previousVersion !== 22) db.exec(`
    INSERT INTO session_transcript_fts_rows (id, session_id, message_id)
    SELECT rowid, session_id, message_id FROM session_transcript_fts;
  `);
}
function finishAgentSchemaMigration(db, agentId, pathname, targetVersion, schemaSql, requiresMaintenance, assertMigration) {
	repairCanonicalSqliteIndexes(db, pathname, schemaSql, { verifyPhysicalIntegrity: false });
	db.exec(`PRAGMA user_version = ${targetVersion};`);
	persistAgentSchemaMetadata(db, agentId, targetVersion);
	assertAgentSchemaVersion(db, {
		agentId,
		pathname,
		version: targetVersion
	}, schemaSql);
	if (requiresMaintenance && db.prepare("PRAGMA foreign_key_check").all().length > 0) throw new Error(`Agent schema migration failed foreign key validation for ${pathname}.`);
	assertMigration();
}
function ensureAgentSchema(db, agentId, pathname, targetVersion = 24, withMutation = (run) => run()) {
	const schemaSql = getOpenClawAgentMigrationSchema(targetVersion);
	const originalVersion = readSqliteUserVersion(db);
	const schemaMigration = originalVersion < targetVersion && (originalVersion > 0 || readExistingAgentSchemaMeta(db) !== null);
	const identityMigration = targetVersion >= 18 && schemaMigration;
	const assertMigration = () => {
		if (!schemaMigration) return;
		if (identityMigration) assertAgentDatabaseMaintenanceAuthority();
		getOpenClawDatabaseMaintenanceScope()?.assertAgentSchemaMigration({
			agentId,
			path: pathname,
			foundVersion: originalVersion,
			supportedVersion: targetVersion
		});
	};
	assertMigration();
	db.exec("PRAGMA foreign_keys = OFF; PRAGMA legacy_alter_table = OFF;");
	try {
		const mutate = () => {
			assertExistingAgentSchemaOwner(readExistingAgentSchemaMeta(db), agentId, pathname);
			assertSupportedAgentSchemaVersion(db, pathname);
			const previousVersion = readSqliteUserVersion(db);
			if (identityMigration && readExistingAgentSchemaMeta(db)?.schemaVersion !== previousVersion) throw new Error(`Agent schema markers disagree for ${pathname}; repair ownership metadata before migration.`);
			if (previousVersion > targetVersion) throw new Error(`OpenClaw agent database ${pathname} uses schema version ${previousVersion}; expected at most ${targetVersion} for this migration.`);
			const isEmptyDatabase = previousVersion === 0 && readExistingAgentSchemaMeta(db) === null && !db.prepare("SELECT 1 FROM sqlite_master WHERE name NOT LIKE 'sqlite_%' LIMIT 1").get();
			const requiresStorageMigration = !isEmptyDatabase && previousVersion < 23 && targetVersion >= 23;
			const requiresSnapshotMigration = !isEmptyDatabase && previousVersion < 24 && targetVersion >= 24;
			const storageSchemaSql = requiresSnapshotMigration ? withoutSessionEntrySnapshotsSchema(schemaSql) : schemaSql;
			const migrationSchemaSql = requiresStorageMigration ? withLegacyAgentStorageSchema(storageSchemaSql, previousVersion) : storageSchemaSql;
			if (previousVersion < targetVersion && previousVersion >= 20 && previousVersion < 24 && targetVersion >= 21) {
				if (previousVersion >= 21) {
					migrateRetiredAgentStateLeaseSchema(db, pathname, targetVersion);
					ensureSessionAdditiveColumns(db);
					ensureSessionEntryValidityProjection(db);
					ensureSessionKeyContractSchemaInTransaction(db);
					if (hasPendingMemoryChunkMetadataMigration(db)) migrateMemoryChunkMetadataSchema(db);
				}
				const previousSchema = previousVersion < 21 ? withoutCanonicalSessionValidationSchema(migrationSchemaSql) : migrationSchemaSql;
				repairCanonicalSqliteIndexes(db, pathname, previousSchema, { verifyPhysicalIntegrity: false });
				assertAgentSchemaVersion(db, {
					agentId,
					pathname,
					version: previousVersion
				}, previousSchema);
				if (previousVersion < 21) {
					db.exec(canonicalSessionValidationSchemaSql(migrationSchemaSql));
					seedCanonicalSessionValidationPending(db);
				}
				if (requiresStorageMigration) migrateAgentStorageInTransaction(db, storageSchemaSql, previousVersion);
				if (requiresSnapshotMigration) migrateSessionEntrySnapshotsInTransaction(db);
				finishAgentSchemaMigration(db, agentId, pathname, targetVersion, schemaSql, identityMigration, assertMigration);
				return;
			}
			if (previousVersion === 17) {
				const legacySql = withLegacySessionParticipantsSchema(withLegacyAgentStorageSchema(OPENCLAW_AGENT_SCHEMA_SQL));
				ensureSessionAdditiveColumns(db);
				verifyAndRepairCanonicalSqliteIndexes(db, pathname, legacySql, { validateAfterRepair: () => {
					assertAgentSchemaVersion(db, {
						agentId,
						pathname,
						version: 17
					}, legacySql);
				} });
			}
			migrateRetiredAgentStateLeaseSchema(db, pathname, targetVersion);
			if (previousVersion === targetVersion) {
				ensureSessionAdditiveColumns(db);
				ensureSessionEntryValidityProjection(db);
				ensureSessionKeyContractSchemaInTransaction(db);
				if (hasPendingMemoryChunkMetadataMigration(db)) {
					migrateMemoryChunkMetadataSchema(db);
					db.exec(schemaSql);
				}
				repairCanonicalSqliteIndexes(db, pathname, schemaSql, { verifyPhysicalIntegrity: false });
				persistAgentSchemaMetadata(db, agentId, targetVersion);
				assertAgentSchemaVersion(db, {
					agentId,
					pathname,
					version: targetVersion
				}, schemaSql);
				assertAgentDatabaseMaintenanceAuthorityIfPresent();
				return;
			} else if (previousVersion === 14) repairAndAssertOpenClawAgentV14SchemaForMigration(db, {
				agentId,
				pathname
			});
			dropLegacyMemoryIndexSchema(db);
			dropLegacySessionTranscriptSearchSchema(db);
			dropLegacyRuntimeJournalSchemas(db);
			renewAgentDatabaseMaintenanceAuthorityIfPresent();
			migrateMemoryIndexSourcesIdentity(db);
			migrateOpenClawAgentSchema(db);
			migrateConversationDeliveryTargetColumn(db);
			backfillOpenClawAgentSchema(db, previousVersion);
			if (previousVersion < 11) backfillSessionConversations(db);
			backfillSessionEntryProvenance(db, previousVersion);
			migrateSessionNodesAndWindows(db, previousVersion);
			renewAgentDatabaseMaintenanceAuthorityIfPresent();
			ensureSessionAdditiveColumns(db);
			ensureSessionEntryValidityProjection(db);
			if (targetVersion >= 18 && previousVersion < 18) migrateSessionParticipantsSchema(db, pathname);
			if (targetVersion >= 19) migrateSessionCreatorNamespaces(db, previousVersion);
			renewAgentDatabaseMaintenanceAuthorityIfPresent();
			db.exec(migrationSchemaSql);
			migrateMemoryChunkMetadataSchema(db);
			if (previousVersion < targetVersion) ensureOpenClawAgentBoardSchemaInTransaction(db);
			migrateSessionTranscriptGenerations(db, previousVersion);
			migrateSessionTranscriptActiveProjection(db, previousVersion);
			if (previousVersion < 11) migrateSqliteSchemaToStrictInTransaction(db, migrationSchemaSql, { databaseLabel: pathname });
			if (previousVersion < 21 && targetVersion >= 21) seedCanonicalSessionValidationPending(db);
			if (requiresStorageMigration) migrateAgentStorageInTransaction(db, storageSchemaSql, previousVersion);
			if (requiresSnapshotMigration) migrateSessionEntrySnapshotsInTransaction(db);
			finishAgentSchemaMigration(db, agentId, pathname, targetVersion, schemaSql, identityMigration, assertMigration);
		};
		runSqliteImmediateTransactionSync(db, () => withMutation(mutate), {
			databaseLabel: pathname,
			operationLabel: "agent.schema.ensure",
			withCommit: withMutation
		});
	} finally {
		if (db.isOpen) db.exec("PRAGMA foreign_keys = ON;");
	}
}
/** Initialize agent schema/ownership metadata on an independently managed connection. */
function ensureOpenClawAgentDatabaseSchema(db, options) {
	runSqliteIntegrityOperationSync(ensureOpenClawAgentDatabaseSchemaSteps(db, options));
}
/** Share one schema sequence between synchronous callers and leased maintenance. */
function* ensureOpenClawAgentDatabaseSchemaSteps(db, options) {
	const agentId = normalizeAgentId(options.agentId);
	const databaseOptions = {
		...options,
		agentId
	};
	const pathname = resolveOpenClawAgentSqlitePath(databaseOptions);
	const deletionFence = databaseOptions.register === true && isPersistentOpenClawAgentDatabasePath(pathname, databaseOptions.env) ? prepareAgentDeletionPathFence({
		agentId,
		path: pathname
	}, { env: databaseOptions.env }, "maintenance") : void 0;
	const withRegistrationFence = (run) => {
		if (!deletionFence) return run();
		return runOpenClawStateWriteTransaction((database) => {
			assertAgentDeletionRecoveryAllowsMutation(database, pathname);
			assertAgentDeletionPathFence(database, deletionFence);
			return run();
		}, {
			env: databaseOptions.env,
			initializationAgentPaths: [pathname]
		});
	};
	withRegistrationFence(() => void 0);
	if (db.location()) invalidateOpenClawAgentDatabaseIntegrityBeforeMutation(pathname, databaseOptions.env);
	ensureOpenClawAgentDatabasePermissions(pathname, databaseOptions);
	db.exec(`PRAGMA busy_timeout = ${OPENCLAW_SQLITE_BUSY_TIMEOUT_MS};`);
	assertSupportedAgentSchemaVersion(db, pathname);
	assertExistingAgentSchemaOwner(readExistingAgentSchemaMeta(db), agentId, pathname);
	const withIntegrityMutation = (run) => deletionFence ? runSqliteImmediateTransactionSync(db, () => withRegistrationFence(run), {
		databaseLabel: pathname,
		operationLabel: "agent.schema.integrity",
		withCommit: withRegistrationFence
	}) : run();
	if (readSqliteUserVersion(db) !== 17) {
		const integrity = agentDatabaseIntegrityBeforeMutationSteps(db, agentId, pathname);
		try {
			let step = withIntegrityMutation(() => integrity.next());
			while (!step.done) {
				let failure;
				try {
					yield step.value;
				} catch (error) {
					failure = { error };
				}
				step = withIntegrityMutation(() => failure ? integrity.throw(failure.error) : integrity.next());
			}
		} finally {
			integrity.return(false);
		}
	}
	configureSqlitePreSchemaPragmas(db, { busyTimeoutMs: OPENCLAW_SQLITE_BUSY_TIMEOUT_MS });
	ensureAgentSchema(db, agentId, pathname, 24, withRegistrationFence);
	ensureOpenClawAgentDatabasePermissions(pathname, databaseOptions);
	if (databaseOptions.register === true) registerOpenClawAgentDatabase({
		agentId,
		path: pathname,
		env: databaseOptions.env
	});
}
/** Upgrade older owned databases to the structural schema required by the media cutover. */
function migrateOpenClawAgentDatabaseToMediaPrerequisiteSchema(db, options) {
	const targetVersion = 16;
	if (readSqliteUserVersion(db) > targetVersion) return;
	const agentId = normalizeAgentId(options.agentId);
	const pathname = resolveOpenClawAgentSqlitePath({
		...options,
		agentId
	});
	if (db.location()) invalidateOpenClawAgentDatabaseIntegrityBeforeMutation(pathname, options.env);
	runSqliteIntegrityOperationSync(agentDatabaseIntegrityBeforeMutationSteps(db, agentId, pathname));
	configureSqlitePreSchemaPragmas(db, { busyTimeoutMs: OPENCLAW_SQLITE_BUSY_TIMEOUT_MS });
	ensureAgentSchema(db, agentId, pathname, targetVersion);
}
//#endregion
//#region src/state/openclaw-agent-db-maintenance.ts
const agentDbLog = createSubsystemLogger("state/agent-db");
/** Require exact agent ownership without requiring the latest schema. */
function assertOpenClawAgentDatabaseOwner(database, options) {
	const agentId = normalizeAgentId(options.agentId);
	const metadata = readExistingAgentSchemaMeta(database);
	if (!metadata) throw new SqliteSchemaMismatchError(`OpenClaw agent database ${options.pathname} has no schema ownership metadata. Run openclaw doctor --fix to inspect and repair its ownership.`);
	assertExistingAgentSchemaOwner(metadata, agentId, options.pathname);
	if (metadata.agentId !== agentId) throw new SqliteSchemaMismatchError(`OpenClaw agent database ${options.pathname} belongs to agent ${metadata.agentId}; requested agent ${agentId}.`);
	return metadata;
}
/** Require the exact agent owner and schema before offline file maintenance. */
function assertOpenClawAgentDatabaseForMaintenance(database, options) {
	const metadata = assertOpenClawAgentDatabaseOwner(database, options);
	const userVersion = assertSupportedAgentSchemaVersion(database, options.pathname);
	if (userVersion !== 24) throw new SqliteSchemaMismatchError(`OpenClaw agent database ${options.pathname} uses schema version ${userVersion}; run openclaw doctor --fix before compacting it.`);
	if (metadata.schemaVersion !== 24) throw new SqliteSchemaMismatchError(`OpenClaw agent database ${options.pathname} metadata schema version ${metadata.schemaVersion ?? "invalid"} does not match 24; run openclaw doctor --fix before compacting it.`);
	assertOpenClawAgentSchemaContains(database, options.pathname, OPENCLAW_AGENT_SCHEMA_SQL, "current", options.allowStartupIndexRepair);
}
/** Upgrade or repair a supported owned schema before strict offline maintenance. */
async function migrateOpenClawAgentDatabaseForMaintenance(options, maintenance) {
	const agentId = normalizeAgentId(options.agentId);
	const pathname = options.pathname;
	const env = { ...process.env };
	const assertOwned = () => {
		maintenance.signal.throwIfAborted();
		assertAgentDatabaseMaintenanceAuthority(maintenance);
	};
	assertOwned();
	invalidateOpenClawAgentDatabaseIntegrityBeforeMutation(pathname, env);
	const database = openNodeSqliteDatabase(pathname);
	try {
		configureSqliteMaintenanceCache(database);
		enableNodeSqliteKyselyStatementCache(database);
		database.exec(`PRAGMA busy_timeout = ${OPENCLAW_SQLITE_BUSY_TIMEOUT_MS};`);
		const metadata = readExistingAgentSchemaMeta(database);
		if (!metadata) return;
		assertExistingAgentSchemaOwner(metadata, agentId, pathname);
		assertSupportedAgentSchemaVersion(database, pathname);
		const userVersion = readSqliteUserVersion(database);
		const metadataVersion = metadata.schemaVersion;
		if (!(userVersion === 24 && metadataVersion === 24) && !(userVersion >= 1 && userVersion < 24 && metadataVersion === userVersion)) return;
		const repairIndexes = () => {
			const changes = repairDoctorSqliteIndexCorruption(database, pathname, {
				label: `agent ${agentId}`,
				assertCurrent: () => {
					assertOwned();
					assertOpenClawAgentDatabaseOwner(database, {
						agentId,
						pathname
					});
					assertSupportedAgentSchemaVersion(database, pathname);
				}
			});
			for (const change of changes) agentDbLog.warn(change);
			return changes.length > 0;
		};
		if (userVersion === 17) repairIndexes();
		const operation = ensureOpenClawAgentDatabaseSchemaSteps(database, {
			agentId,
			path: pathname,
			env
		});
		try {
			let step = operation.next();
			while (!step.done) {
				assertOwned();
				try {
					await assertSqliteIntegrityInWorker(step.value.databaseLabel, OPENCLAW_SQLITE_BUSY_TIMEOUT_MS, maintenance.signal);
				} catch (error) {
					assertOwned();
					assertExistingAgentSchemaOwner(readExistingAgentSchemaMeta(database), agentId, pathname);
					assertSupportedAgentSchemaVersion(database, pathname);
					step = repairIndexes() ? operation.next() : operation.throw(error);
					continue;
				}
				assertOwned();
				assertExistingAgentSchemaOwner(readExistingAgentSchemaMeta(database), agentId, pathname);
				assertSupportedAgentSchemaVersion(database, pathname);
				step = operation.next();
			}
		} finally {
			operation.return();
		}
		assertOwned();
		assertOpenClawAgentDatabaseForMaintenance(database, {
			agentId,
			pathname
		});
	} finally {
		clearNodeSqliteKyselyCacheForDatabase(database);
		database.close();
	}
}
//#endregion
export { SqliteIntegrityWorkerInterruptedError as _, ensureAgentSchema as a, USAGE_COST_ROLLUP_SCOPE as c, decodeUsageCostRollupEnvelope as d, encodeUsageCostRollup as f, withSqliteIntegrityWorkerScope as g, assertSqliteIntegrityInWorker as h, agentDatabaseIntegrityBeforeMutationSteps as i, canUseUsageCostRollupForPartial as l, ensureOpenClawAgentDatabasePermissions as m, assertOpenClawAgentDatabaseOwner as n, ensureOpenClawAgentDatabaseSchema as o, isUsageCostRollupFresh as p, migrateOpenClawAgentDatabaseForMaintenance as r, migrateOpenClawAgentDatabaseToMediaPrerequisiteSchema as s, assertOpenClawAgentDatabaseForMaintenance as t, decodeUsageCostRollup as u };
