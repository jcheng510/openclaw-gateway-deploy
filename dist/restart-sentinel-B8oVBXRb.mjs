import { n as resolveOpenClawPackageRoot } from "./openclaw-root-3-SBP6RS.mjs";
import "./src-SskUVPJG.mjs";
import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { t as safeParseJson } from "./json-coercion-pfKbZnCJ.mjs";
import { n as sliceUtf16Safe } from "./utf16-slice-D_ngcYKd.mjs";
import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { t as formatCliCommand } from "./command-format-Cte1SWM4.mjs";
import { i as getNodeSqliteKysely, n as executeSqliteQuerySync, r as executeSqliteQueryTakeFirstSync } from "./kysely-sync-Y4_ti-rQ.mjs";
import { t as createSubsystemLogger } from "./subsystem-CeqVSEVi.mjs";
import { t as gitCommitPrefixesMatch } from "./git-commit-Brz49B6u.mjs";
import { c as resolveRuntimeServiceCommit, l as resolveRuntimeServiceVersion } from "./version-BMuSsYfE.mjs";
import { n as sha256Hex } from "./node-crypto-BInnzoVt.mjs";
import "./crypto-digest-y6oZN-_F.mjs";
import { ni as NEVER } from "./json-schema-processors-C6KO_BFy.mjs";
import { Et as _enum, Fn as object, Jn as string, Kt as custom, Lt as boolean, Pn as number, Yt as discriminatedUnion, xn as literal } from "./schemas-BOYIvvln.mjs";
import { n as UpdateFailureFactSchema, o as updateRecoverySchema } from "./update-run-schema-Ap8UiBpH.mjs";
import { t as resolveUpdateInstallRoot } from "./update-install-root-DH-onosx.mjs";
import { d as withExistingOpenClawStateDatabaseReadOnly } from "./openclaw-state-db-readonly-DE3MB0wy.mjs";
import { l as runOpenClawStateWriteTransaction, r as openOpenClawStateDatabase } from "./openclaw-state-db-DM-mSY0m.mjs";
//#region src/infra/restart-sentinel-store.ts
const RESTART_SENTINEL_KEY = "current";
const RESTART_SENTINEL_REVISION_FLOOR_KEY = "revision-floor";
const UPDATE_INSTALL_RECEIPT_KEY = "latest-update-install";
function isSafeInteger(value) {
	return typeof value === "number" && Number.isSafeInteger(value);
}
function omitUndefinedFields(value) {
	for (const key in value) if (value[key] === void 0) delete value[key];
	return value;
}
const restartSentinelLogSchema = object({
	stdoutTail: string().nullish(),
	stderrTail: string().nullish(),
	exitCode: number().int().nullish()
}).transform(omitUndefinedFields);
const restartSentinelStepSchema = object({
	name: string(),
	command: string(),
	failureFacts: UpdateFailureFactSchema.array().max(5).optional().catch(void 0),
	cwd: string().nullish(),
	durationMs: number().finite().nullish(),
	log: restartSentinelLogSchema.nullish(),
	advisory: boolean().optional()
}).transform(omitUndefinedFields);
const restartSentinelStepsSchema = custom(Array.isArray).transform((steps, ctx) => steps.map((step) => {
	const parsed = restartSentinelStepSchema.safeParse(step);
	if (parsed.success) return parsed.data;
	ctx.addIssue({
		code: "custom",
		message: "Invalid restart sentinel step"
	});
	return NEVER;
}));
const restartSentinelStatsSchema = object({
	recovery: updateRecoverySchema.optional().catch(void 0),
	mode: string().optional(),
	root: string().optional(),
	target: string().optional(),
	requiresRestart: boolean().optional(),
	handoffId: string().optional(),
	runId: string().optional(),
	before: custom(isRecord).nullish(),
	after: custom(isRecord).nullish(),
	steps: restartSentinelStepsSchema.optional(),
	reason: string().nullish(),
	durationMs: number().finite().nullish()
}).transform(omitUndefinedFields);
const restartSentinelContinuationSchema = discriminatedUnion("kind", [object({
	kind: literal("systemEvent"),
	text: string()
}), object({
	kind: literal("agentTurn"),
	message: string()
})]);
const restartSentinelPayloadSchema = object({
	kind: _enum([
		"config-apply",
		"config-auto-recovery",
		"config-patch",
		"update",
		"restart"
	]),
	status: _enum([
		"ok",
		"error",
		"skipped"
	]),
	ts: number().int(),
	sessionKey: string().optional(),
	deliveryContext: object({
		channel: string().optional(),
		to: string().optional(),
		accountId: string().optional()
	}).transform(omitUndefinedFields).transform((value) => Object.keys(value).length > 0 ? value : void 0).optional(),
	threadId: string().optional(),
	message: string().nullish().transform((value) => value ?? void 0),
	continuation: restartSentinelContinuationSchema.nullish().transform((value) => value ?? void 0),
	doctorHint: string().nullish().transform((value) => value ?? void 0),
	stats: restartSentinelStatsSchema.nullish().transform((value) => value ?? void 0)
}).transform(omitUndefinedFields);
function parseRestartSentinelPayload(value) {
	const parsed = restartSentinelPayloadSchema.safeParse(value);
	return parsed.success ? parsed.data : null;
}
function parseRestartSentinelEnvelope(value) {
	if (!isRecord(value) || value.version !== 1) return null;
	const payload = parseRestartSentinelPayload(value.payload);
	return payload ? {
		version: 1,
		payload
	} : null;
}
function parseRequiredJson(value) {
	if (value === null) return;
	return safeParseJson(value);
}
function decodeRestartSentinelRow(row) {
	if (row.version !== 1 || !isSafeInteger(row.updated_at_ms)) return null;
	const continuation = parseRequiredJson(row.continuation_json);
	if (row.continuation_json !== null && continuation === void 0) return null;
	const stats = parseRequiredJson(row.stats_json);
	if (row.stats_json !== null && stats === void 0) return null;
	const payload = parseRestartSentinelPayload({
		kind: row.kind,
		status: row.status,
		ts: row.ts,
		sessionKey: row.session_key ?? void 0,
		threadId: row.thread_id ?? void 0,
		deliveryContext: {
			channel: row.delivery_channel ?? void 0,
			to: row.delivery_to ?? void 0,
			accountId: row.delivery_account_id ?? void 0
		},
		message: row.message,
		continuation,
		doctorHint: row.doctor_hint,
		stats
	});
	return payload ? {
		version: 1,
		payload,
		revision: row.updated_at_ms
	} : null;
}
function readRestartSentinelRowForKeySync(db, sentinelKey) {
	const stateDb = getNodeSqliteKysely(db);
	const row = executeSqliteQueryTakeFirstSync(db, stateDb.selectFrom("gateway_restart_sentinel").select([
		"version",
		"kind",
		"status",
		"ts",
		"session_key",
		"thread_id",
		"delivery_channel",
		"delivery_to",
		"delivery_account_id",
		"message",
		"continuation_json",
		"doctor_hint",
		"stats_json",
		"updated_at_ms"
	]).where("sentinel_key", "=", sentinelKey));
	if (!row) return { kind: "missing" };
	const sentinel = decodeRestartSentinelRow(row);
	return sentinel ? {
		kind: "valid",
		sentinel
	} : {
		kind: "invalid",
		revision: row.updated_at_ms
	};
}
function readRestartSentinelRowSync(db) {
	return readRestartSentinelRowForKeySync(db, RESTART_SENTINEL_KEY);
}
function readUpdateInstallReceiptRowSync(db) {
	const current = readRestartSentinelRowForKeySync(db, UPDATE_INSTALL_RECEIPT_KEY);
	return current.kind === "valid" ? current.sentinel : null;
}
function requireValidPayload(payload) {
	const parsed = parseRestartSentinelPayload(payload);
	if (!parsed) throw new TypeError("Invalid restart sentinel payload");
	return parsed;
}
function nextRevision(currentRevision) {
	if (currentRevision !== null && !Number.isSafeInteger(currentRevision)) throw new Error("Restart sentinel revision is outside the safe integer range");
	const revision = Math.max(Date.now(), currentRevision === null ? 0 : currentRevision + 1);
	if (!Number.isSafeInteger(revision)) throw new Error("Restart sentinel revision exhausted the safe integer range");
	return revision;
}
function readRestartSentinelRevisionFloorSync(db) {
	const stateDb = getNodeSqliteKysely(db);
	const row = executeSqliteQueryTakeFirstSync(db, stateDb.selectFrom("gateway_restart_sentinel").select("updated_at_ms").where("sentinel_key", "=", RESTART_SENTINEL_REVISION_FLOOR_KEY));
	if (!row) return null;
	if (!Number.isSafeInteger(row.updated_at_ms)) throw new Error("Restart sentinel revision floor is outside the safe integer range");
	return row.updated_at_ms;
}
function maxRevision(left, right) {
	if (left === null) return right;
	if (right === null) return left;
	return Math.max(left, right);
}
function buildRestartSentinelRow(payload, revision, sentinelKey = RESTART_SENTINEL_KEY) {
	return {
		sentinel_key: sentinelKey,
		version: 1,
		kind: payload.kind,
		status: payload.status,
		ts: payload.ts,
		session_key: payload.sessionKey ?? null,
		thread_id: payload.threadId ?? null,
		delivery_channel: payload.deliveryContext?.channel ?? null,
		delivery_to: payload.deliveryContext?.to ?? null,
		delivery_account_id: payload.deliveryContext?.accountId ?? null,
		message: payload.message ?? null,
		continuation_json: payload.continuation ? JSON.stringify(payload.continuation) : null,
		doctor_hint: payload.doctorHint ?? null,
		stats_json: payload.stats ? JSON.stringify(payload.stats) : null,
		payload_json: JSON.stringify(payload),
		updated_at_ms: revision
	};
}
function upsertRestartSentinelRowSync(db, row) {
	const stateDb = getNodeSqliteKysely(db);
	const { sentinel_key: _key, ...values } = row;
	executeSqliteQuerySync(db, stateDb.insertInto("gateway_restart_sentinel").values(row).onConflict((conflict) => conflict.column("sentinel_key").doUpdateSet(values)));
}
function advanceRestartSentinelRevisionFloorSync(db, revision) {
	upsertRestartSentinelRowSync(db, buildRestartSentinelRow({
		kind: "restart",
		status: "skipped",
		ts: revision
	}, revision, RESTART_SENTINEL_REVISION_FLOOR_KEY));
}
function writeRestartSentinelRowSync(db, rawPayload) {
	const payload = requireValidPayload(rawPayload);
	const revision = nextRevision(readRestartSentinelSnapshotSync(db).revision);
	upsertRestartSentinelRowSync(db, buildRestartSentinelRow(payload, revision));
	advanceRestartSentinelRevisionFloorSync(db, revision);
	return {
		version: 1,
		payload,
		revision
	};
}
/** Read inside a transaction; the floor also identifies an absent, consumed notification. */
function readRestartSentinelSnapshotSync(db) {
	const state = readRestartSentinelRowSync(db);
	return {
		state,
		revision: maxRevision(state.kind === "missing" ? null : state.kind === "valid" ? state.sentinel.revision : state.revision, readRestartSentinelRevisionFloorSync(db))
	};
}
function writeUpdateInstallReceiptRowSync(db, rawPayload) {
	const payload = requireValidPayload(rawPayload);
	if (payload.kind !== "update" || payload.stats?.mode !== "git") throw new TypeError("Update install receipt requires a git update payload");
	const current = readRestartSentinelRowForKeySync(db, UPDATE_INSTALL_RECEIPT_KEY);
	const revision = nextRevision(current.kind === "missing" ? null : current.kind === "valid" ? current.sentinel.revision : current.revision);
	upsertRestartSentinelRowSync(db, buildRestartSentinelRow(payload, revision, UPDATE_INSTALL_RECEIPT_KEY));
	return {
		version: 1,
		payload,
		revision
	};
}
/** Compare inside the caller's transaction; null requires an absent current row. */
function writeRestartSentinelRowIfRevisionSync(db, rawPayload, expectedRevision) {
	const { state: current, revision: previousRevision } = readRestartSentinelSnapshotSync(db);
	if (expectedRevision === null ? current.kind !== "missing" : current.kind !== "valid" || current.sentinel.revision !== expectedRevision) return null;
	const payload = requireValidPayload(rawPayload);
	const revision = nextRevision(previousRevision);
	const row = buildRestartSentinelRow(payload, revision);
	const stateDb = getNodeSqliteKysely(db);
	if (executeSqliteQuerySync(db, expectedRevision === null ? stateDb.insertInto("gateway_restart_sentinel").values(row).onConflict((conflict) => conflict.column("sentinel_key").doNothing()) : stateDb.updateTable("gateway_restart_sentinel").set(row).where("sentinel_key", "=", RESTART_SENTINEL_KEY).where("updated_at_ms", "=", expectedRevision)).numAffectedRows !== 1n) return null;
	advanceRestartSentinelRevisionFloorSync(db, revision);
	return {
		version: 1,
		payload,
		revision
	};
}
function deleteRestartSentinelRowSync(db, expectedRevision) {
	const current = readRestartSentinelRowSync(db);
	if (current.kind === "missing") return false;
	const currentRevision = current.kind === "valid" ? current.sentinel.revision : current.revision;
	if (currentRevision !== expectedRevision) return false;
	if (!Number.isSafeInteger(currentRevision)) throw new Error("Restart sentinel revision is outside the safe integer range");
	advanceRestartSentinelRevisionFloorSync(db, maxRevision(currentRevision, readRestartSentinelRevisionFloorSync(db)) ?? currentRevision);
	const query = getNodeSqliteKysely(db).deleteFrom("gateway_restart_sentinel").where("sentinel_key", "=", RESTART_SENTINEL_KEY).where("updated_at_ms", "=", expectedRevision);
	if (executeSqliteQuerySync(db, query).numAffectedRows !== 1n) throw new Error("Restart sentinel changed during guarded delete");
	return true;
}
//#endregion
//#region src/infra/update-failure-report-receipt-store.ts
const RECEIPT_KEY_PREFIX = "update-failure-report:";
const PREPARING_RECEIPT_STALE_AFTER_MS = 12e4;
const ARTIFACT_SWEEP_STALE_AFTER_MS = 12e4;
function isCanonicalGithubUrl(value, pathname, options) {
	if (typeof value !== "string") return false;
	try {
		const parsed = new URL(value);
		return parsed.origin === "https://github.com" && !parsed.username && !parsed.password && !parsed.hash && (options.allowSearch || !parsed.search) && pathname.test(parsed.pathname);
	} catch {
		return false;
	}
}
function isPreviewDigest(value) {
	return typeof value === "string" && /^[a-f0-9]{64}$/u.test(value);
}
function retainedArtifactSweep(receipt) {
	return receipt.artifactSweep ? { artifactSweep: receipt.artifactSweep } : {};
}
function isValidTerminalReceipt(receipt) {
	if (!isPreviewDigest(receipt.previewDigest) || receipt.preparingSinceMs !== void 0) return false;
	if (receipt.status === "created") return receipt.cleanup === "pending" && receipt.fallbackUrl === void 0 && isCanonicalGithubUrl(receipt.url, /^\/openclaw\/openclaw\/issues\/\d+$/u, { allowSearch: false });
	if (receipt.status === "fallback") return receipt.cleanup === void 0 && receipt.url === void 0 && isCanonicalGithubUrl(receipt.fallbackUrl, /^\/openclaw\/openclaw\/issues\/new$/u, { allowSearch: true });
	return receipt.status === "retryable" && receipt.cleanup === void 0 && receipt.url === void 0 && receipt.fallbackUrl === void 0;
}
function receiptKey(attemptId) {
	return `${RECEIPT_KEY_PREFIX}${sha256Hex(attemptId)}`;
}
function parseReceipt(sentinel) {
	if (sentinel?.payload.kind !== "update" || sentinel.payload.status !== "skipped" || sentinel.payload.stats?.reason !== "update-failure-report-receipt" || typeof sentinel.payload.message !== "string") return null;
	const value = safeParseJson(sentinel.payload.message);
	if (!isRecord(value) || value.status !== "preparing" && value.status !== "prepared" && value.status !== "pending" && value.status !== "retryable" && value.status !== "created" && value.status !== "fallback" || typeof value.reservationId !== "string" || (value.status === "preparing" || value.status === "prepared") && (typeof value.preparingSinceMs !== "number" || !Number.isFinite(value.preparingSinceMs)) || value.artifactSweep !== void 0 && value.artifactSweep !== "pending" || value.cleanup !== void 0 && value.cleanup !== "pending" || value.previewDigest !== void 0 && !isPreviewDigest(value.previewDigest) || value.replacementReady !== void 0 && value.replacementReady !== true || value.replacementReady === true && (value.status !== "retryable" || value.cleanup !== void 0 || value.artifactSweep !== "pending") || value.sweepOwnerId === void 0 !== (value.sweepSinceMs === void 0) || value.sweepOwnerId === void 0 !== (value.sweepGeneration === void 0) || value.sweepGeneration !== void 0 && typeof value.sweepGeneration !== "string" || value.sweepOwnerId !== void 0 && typeof value.sweepOwnerId !== "string" || value.sweepSinceMs !== void 0 && (typeof value.sweepSinceMs !== "number" || !Number.isFinite(value.sweepSinceMs)) || value.sweepOwnerId !== void 0 && value.artifactSweep !== "pending" || value.status === "created" && !isCanonicalGithubUrl(value.url, /^\/openclaw\/openclaw\/issues\/\d+$/u, { allowSearch: false }) || value.status === "fallback" && !isCanonicalGithubUrl(value.fallbackUrl, /^\/openclaw\/openclaw\/issues\/new$/u, { allowSearch: true }) || value.cleanup !== void 0 && value.status !== "created" && value.status !== "retryable" || value.status !== "created" && value.url !== void 0 || value.status !== "fallback" && value.fallbackUrl !== void 0) return null;
	return {
		...value.artifactSweep === "pending" ? { artifactSweep: value.artifactSweep } : {},
		reservationId: value.reservationId,
		status: value.status,
		...value.cleanup === "pending" ? { cleanup: value.cleanup } : {},
		...typeof value.preparingSinceMs === "number" ? { preparingSinceMs: value.preparingSinceMs } : {},
		...typeof value.previewDigest === "string" ? { previewDigest: value.previewDigest } : {},
		...value.replacementReady === true ? { replacementReady: value.replacementReady } : {},
		...typeof value.sweepGeneration === "string" ? { sweepGeneration: value.sweepGeneration } : {},
		...typeof value.sweepOwnerId === "string" ? { sweepOwnerId: value.sweepOwnerId } : {},
		...typeof value.sweepSinceMs === "number" ? { sweepSinceMs: value.sweepSinceMs } : {},
		...typeof value.url === "string" ? { url: value.url } : {},
		...typeof value.fallbackUrl === "string" ? { fallbackUrl: value.fallbackUrl } : {}
	};
}
/** Reads one existing report receipt without creating state. */
function readUpdateFailureReportReceiptRowSync(db, attemptId) {
	const current = readRestartSentinelRowForKeySync(db, receiptKey(attemptId));
	return parseReceipt(current.kind === "valid" ? current.sentinel : null);
}
function buildReceiptPayload(receipt) {
	return {
		kind: "update",
		status: "skipped",
		ts: Date.now(),
		message: JSON.stringify(receipt),
		stats: { reason: "update-failure-report-receipt" }
	};
}
function replaceReceiptAtRevision(db, sentinelKey, revision, receipt) {
	const row = buildRestartSentinelRow(buildReceiptPayload(receipt), nextRevision(revision), sentinelKey);
	const stateDb = getNodeSqliteKysely(db);
	return executeSqliteQuerySync(db, stateDb.updateTable("gateway_restart_sentinel").set(row).where("sentinel_key", "=", sentinelKey).where("updated_at_ms", "=", revision)).numAffectedRows === 1n;
}
function mutateReceipt(db, attemptId, update) {
	const sentinelKey = receiptKey(attemptId);
	const current = readRestartSentinelRowForKeySync(db, sentinelKey);
	const receipt = parseReceipt(current.kind === "valid" ? current.sentinel : null);
	if (current.kind !== "valid" || !receipt) return false;
	const next = update(receipt);
	return next && replaceReceiptAtRevision(db, sentinelKey, current.sentinel.revision, next);
}
/** Atomically owns one report attempt in the canonical state database. */
function reserveUpdateFailureReportReceiptRowSync(db, attemptId, reservationId, previewDigest) {
	const sentinelKey = receiptKey(attemptId);
	const stateDb = getNodeSqliteKysely(db);
	const nowMs = Date.now();
	const receipt = {
		preparingSinceMs: nowMs,
		previewDigest,
		reservationId,
		status: "preparing"
	};
	const row = buildRestartSentinelRow(buildReceiptPayload(receipt), nowMs, sentinelKey);
	if (executeSqliteQuerySync(db, stateDb.insertInto("gateway_restart_sentinel").values(row).onConflict((conflict) => conflict.column("sentinel_key").doNothing())).numAffectedRows === 1n) return {
		receipt,
		reserved: true
	};
	const current = readRestartSentinelRowForKeySync(db, sentinelKey);
	const currentReceipt = parseReceipt(current.kind === "valid" ? current.sentinel : null);
	if (current.kind === "valid" && currentReceipt?.status === "retryable" && currentReceipt.cleanup === void 0 && currentReceipt.replacementReady === true && currentReceipt.sweepOwnerId === void 0) {
		const replacement = {
			preparingSinceMs: nowMs,
			previewDigest,
			...retainedArtifactSweep(currentReceipt),
			reservationId,
			status: "preparing"
		};
		return replaceReceiptAtRevision(db, sentinelKey, current.sentinel.revision, replacement) ? {
			receipt: replacement,
			reserved: true
		} : {
			receipt: readUpdateFailureReportReceiptRowSync(db, attemptId),
			reserved: false
		};
	}
	return {
		receipt: currentReceipt,
		reserved: false
	};
}
/** CAS-refreshes one owned, definitely-unstarted phase before fallback publication. */
function refreshUpdateFailureReportReceiptPreparationRowSync(db, attemptId, reservationId) {
	return mutateReceipt(db, attemptId, (currentReceipt) => {
		if (currentReceipt.status !== "prepared" && currentReceipt.status !== "pending" || currentReceipt.sweepOwnerId !== void 0 || currentReceipt.reservationId !== reservationId) return false;
		return {
			...currentReceipt.previewDigest ? { previewDigest: currentReceipt.previewDigest } : {},
			...retainedArtifactSweep(currentReceipt),
			reservationId,
			status: currentReceipt.status,
			...currentReceipt.status === "prepared" ? { preparingSinceMs: Date.now() } : {}
		};
	});
}
/** Fences final artifact publication behind one process-owned preparation. */
function markUpdateFailureReportReceiptPreparedRowSync(db, attemptId, reservationId, previewDigest) {
	return mutateReceipt(db, attemptId, (currentReceipt) => {
		if (currentReceipt.status !== "preparing" || currentReceipt.sweepOwnerId !== void 0 || currentReceipt.reservationId !== reservationId || currentReceipt.previewDigest !== previewDigest) return false;
		return {
			preparingSinceMs: Date.now(),
			previewDigest,
			...retainedArtifactSweep(currentReceipt),
			reservationId,
			status: "prepared"
		};
	});
}
/** Makes one published preparation ambiguity-safe immediately before issue creation starts. */
function markUpdateFailureReportReceiptPendingRowSync(db, attemptId, reservationId, previewDigest) {
	return mutateReceipt(db, attemptId, (currentReceipt) => {
		if (currentReceipt.status !== "prepared" || currentReceipt.sweepOwnerId !== void 0 || currentReceipt.reservationId !== reservationId || currentReceipt.previewDigest !== previewDigest) return false;
		return {
			...currentReceipt.previewDigest ? { previewDigest: currentReceipt.previewDigest } : {},
			...retainedArtifactSweep(currentReceipt),
			reservationId,
			status: "pending"
		};
	});
}
/** Finalizes only a process-owned reservation in the required prior phase. */
function finalizeUpdateFailureReportReceiptRowSync(db, attemptId, receipt) {
	if (!isValidTerminalReceipt(receipt)) return false;
	return mutateReceipt(db, attemptId, (currentReceipt) => {
		if (currentReceipt.sweepOwnerId !== void 0 || (receipt.status === "fallback" || receipt.status === "retryable" ? currentReceipt.status !== "prepared" && currentReceipt.status !== "pending" : currentReceipt.status !== "pending") || currentReceipt.reservationId !== receipt.reservationId || currentReceipt.previewDigest === void 0 || currentReceipt.previewDigest !== receipt.previewDigest) return false;
		return {
			...receipt,
			...retainedArtifactSweep(currentReceipt)
		};
	});
}
/** Records post-commit cleanup intent without performing filesystem work in SQLite. */
function beginUpdateFailureReportReceiptCleanupRowSync(db, attemptId, reservationId) {
	return mutateReceipt(db, attemptId, (currentReceipt) => {
		if (currentReceipt.sweepOwnerId !== void 0 || currentReceipt.status !== "preparing" && currentReceipt.status !== "prepared" && currentReceipt.status !== "retryable" || currentReceipt.cleanup !== void 0 || currentReceipt.reservationId !== reservationId) return false;
		return {
			cleanup: "pending",
			...currentReceipt.previewDigest ? { previewDigest: currentReceipt.previewDigest } : {},
			...retainedArtifactSweep(currentReceipt),
			reservationId,
			status: "retryable"
		};
	});
}
/** Atomically transfers an expired preparation into durable cleanup custody. */
function beginStaleUpdateFailureReportReceiptCleanupRowSync(db, attemptId, reservationId) {
	const sentinelKey = receiptKey(attemptId);
	const current = readRestartSentinelRowForKeySync(db, sentinelKey);
	const currentReceipt = parseReceipt(current.kind === "valid" ? current.sentinel : null);
	const nowMs = Date.now();
	if (current.kind !== "valid" || !currentReceipt || currentReceipt.sweepOwnerId !== void 0 || currentReceipt.status !== "preparing" && currentReceipt.status !== "prepared" || currentReceipt.preparingSinceMs === void 0 || currentReceipt.preparingSinceMs > nowMs - PREPARING_RECEIPT_STALE_AFTER_MS || currentReceipt.reservationId !== reservationId) return false;
	if (!currentReceipt.previewDigest) return false;
	const cleanupReceipt = {
		artifactSweep: "pending",
		cleanup: "pending",
		previewDigest: currentReceipt.previewDigest,
		reservationId,
		status: "retryable"
	};
	return replaceReceiptAtRevision(db, sentinelKey, current.sentinel.revision, cleanupReceipt);
}
/** Serializes one attempt-wide retired-artifact sweep against successor publication. */
function claimUpdateFailureReportArtifactSweepRowSync(db, attemptId, expectedReservationId, sweepOwnerId, sweepGeneration) {
	const sentinelKey = receiptKey(attemptId);
	const current = readRestartSentinelRowForKeySync(db, sentinelKey);
	const currentReceipt = parseReceipt(current.kind === "valid" ? current.sentinel : null);
	const nowMs = Date.now();
	if (current.kind !== "valid" || !currentReceipt || currentReceipt.artifactSweep !== "pending" || currentReceipt.reservationId !== expectedReservationId || currentReceipt.sweepOwnerId !== void 0 && currentReceipt.sweepSinceMs !== void 0 && currentReceipt.sweepSinceMs > nowMs - ARTIFACT_SWEEP_STALE_AFTER_MS) return false;
	const claimed = {
		...currentReceipt,
		sweepGeneration,
		sweepOwnerId,
		sweepSinceMs: nowMs
	};
	return replaceReceiptAtRevision(db, sentinelKey, current.sentinel.revision, claimed);
}
/** Checks the exact sweep generation without renewing or otherwise mutating it. */
function hasUpdateFailureReportArtifactSweepLeaseRowSync(db, attemptId, expectedReservationId, sweepOwnerId, sweepGeneration) {
	const currentReceipt = readUpdateFailureReportReceiptRowSync(db, attemptId);
	return currentReceipt?.artifactSweep === "pending" && currentReceipt.reservationId === expectedReservationId && currentReceipt.sweepOwnerId === sweepOwnerId && currentReceipt.sweepGeneration === sweepGeneration;
}
/** Releases only the exact attempt-wide artifact sweep lease held by this worker. */
function releaseUpdateFailureReportArtifactSweepRowSync(db, attemptId, expectedReservationId, sweepOwnerId, sweepGeneration) {
	return mutateReceipt(db, attemptId, (currentReceipt) => {
		if (currentReceipt.reservationId !== expectedReservationId || currentReceipt.sweepOwnerId !== sweepOwnerId || currentReceipt.sweepGeneration !== sweepGeneration) return false;
		const { sweepGeneration: _generation, sweepOwnerId: _owner, sweepSinceMs: _since, ...released } = currentReceipt;
		return released;
	});
}
/** Completes one idempotent artifact cleanup after the cleanup intent has committed. */
function completeUpdateFailureReportReceiptCleanupRowSync(db, attemptId, reservationId) {
	const sentinelKey = receiptKey(attemptId);
	const current = readRestartSentinelRowForKeySync(db, sentinelKey);
	const currentReceipt = parseReceipt(current.kind === "valid" ? current.sentinel : null);
	if (current.kind !== "valid" || !currentReceipt || currentReceipt.cleanup !== "pending" || currentReceipt.sweepOwnerId !== void 0 || currentReceipt.reservationId !== reservationId) return false;
	const stateDb = getNodeSqliteKysely(db);
	if (currentReceipt.status === "retryable") {
		if (currentReceipt.artifactSweep) {
			const completed = {
				artifactSweep: currentReceipt.artifactSweep,
				...currentReceipt.previewDigest ? { previewDigest: currentReceipt.previewDigest } : {},
				replacementReady: true,
				reservationId,
				status: "retryable"
			};
			return replaceReceiptAtRevision(db, sentinelKey, current.sentinel.revision, completed);
		}
		return executeSqliteQuerySync(db, stateDb.deleteFrom("gateway_restart_sentinel").where("sentinel_key", "=", sentinelKey).where("updated_at_ms", "=", current.sentinel.revision)).numAffectedRows === 1n;
	}
	if (currentReceipt.status !== "created" || !currentReceipt.url) return false;
	const completed = {
		...currentReceipt.previewDigest ? { previewDigest: currentReceipt.previewDigest } : {},
		...retainedArtifactSweep(currentReceipt),
		reservationId,
		status: "created",
		...currentReceipt.url ? { url: currentReceipt.url } : {}
	};
	return replaceReceiptAtRevision(db, sentinelKey, current.sentinel.revision, completed);
}
//#endregion
//#region src/infra/restart-sentinel.ts
const sentinelLog = createSubsystemLogger("restart-sentinel");
function formatDoctorNonInteractiveHint(env = process.env) {
	return `Recommended follow-up: run ${formatCliCommand("openclaw doctor --non-interactive", env)} in a terminal or approvals-capable OpenClaw surface.`;
}
async function writeRestartSentinel(payload, env = process.env) {
	return runOpenClawStateWriteTransaction(({ db }) => writeRestartSentinelRowSync(db, payload), { env }, { operationLabel: "restart-sentinel.write" });
}
function reserveUpdateFailureReportReceipt(attemptId, reservationId, previewDigest, env = process.env) {
	return runOpenClawStateWriteTransaction(({ db }) => reserveUpdateFailureReportReceiptRowSync(db, attemptId, reservationId, previewDigest), { env }, { operationLabel: "update-failure-report.reserve" });
}
function beginUpdateFailureReportReceiptCleanup(attemptId, reservationId, env = process.env) {
	return runOpenClawStateWriteTransaction(({ db }) => beginUpdateFailureReportReceiptCleanupRowSync(db, attemptId, reservationId), { env }, { operationLabel: "update-failure-report.begin-cleanup" });
}
function beginStaleUpdateFailureReportReceiptCleanup(attemptId, reservationId, env = process.env) {
	return runOpenClawStateWriteTransaction(({ db }) => beginStaleUpdateFailureReportReceiptCleanupRowSync(db, attemptId, reservationId), { env }, { operationLabel: "update-failure-report.begin-stale-cleanup" });
}
function completeUpdateFailureReportReceiptCleanup(attemptId, reservationId, env = process.env) {
	return runOpenClawStateWriteTransaction(({ db }) => completeUpdateFailureReportReceiptCleanupRowSync(db, attemptId, reservationId), { env }, { operationLabel: "update-failure-report.complete-cleanup" });
}
function claimUpdateFailureReportArtifactSweep(attemptId, expectedReservationId, sweepOwnerId, sweepGeneration, env = process.env) {
	return runOpenClawStateWriteTransaction(({ db }) => claimUpdateFailureReportArtifactSweepRowSync(db, attemptId, expectedReservationId, sweepOwnerId, sweepGeneration), { env }, { operationLabel: "update-failure-report.claim-artifact-sweep" });
}
function hasUpdateFailureReportArtifactSweepLease(attemptId, expectedReservationId, sweepOwnerId, sweepGeneration, env = process.env) {
	return withExistingOpenClawStateDatabaseReadOnly(({ db }) => hasUpdateFailureReportArtifactSweepLeaseRowSync(db, attemptId, expectedReservationId, sweepOwnerId, sweepGeneration), { env }) ?? false;
}
function releaseUpdateFailureReportArtifactSweep(attemptId, expectedReservationId, sweepOwnerId, sweepGeneration, env = process.env) {
	return runOpenClawStateWriteTransaction(({ db }) => releaseUpdateFailureReportArtifactSweepRowSync(db, attemptId, expectedReservationId, sweepOwnerId, sweepGeneration), { env }, { operationLabel: "update-failure-report.release-artifact-sweep" });
}
function readUpdateFailureReportReceipt(attemptId, env = process.env) {
	return withExistingOpenClawStateDatabaseReadOnly(({ db }) => readUpdateFailureReportReceiptRowSync(db, attemptId), { env }) ?? null;
}
function refreshUpdateFailureReportReceiptPreparation(attemptId, reservationId, env = process.env) {
	return runOpenClawStateWriteTransaction(({ db }) => refreshUpdateFailureReportReceiptPreparationRowSync(db, attemptId, reservationId), { env }, { operationLabel: "update-failure-report.refresh-preparation" });
}
function finalizeUpdateFailureReportReceipt(attemptId, receipt, env = process.env) {
	return runOpenClawStateWriteTransaction(({ db }) => finalizeUpdateFailureReportReceiptRowSync(db, attemptId, receipt), { env }, { operationLabel: "update-failure-report.finalize" });
}
function markUpdateFailureReportReceiptPending(attemptId, reservationId, previewDigest, env = process.env) {
	return runOpenClawStateWriteTransaction(({ db }) => markUpdateFailureReportReceiptPendingRowSync(db, attemptId, reservationId, previewDigest), { env }, { operationLabel: "update-failure-report.mark-pending" });
}
function markUpdateFailureReportReceiptPrepared(attemptId, reservationId, previewDigest, env = process.env) {
	return runOpenClawStateWriteTransaction(({ db }) => markUpdateFailureReportReceiptPreparedRowSync(db, attemptId, reservationId, previewDigest), { env }, { operationLabel: "update-failure-report.mark-prepared" });
}
/** Publish an outcome only while its producer and the captured notification are unchanged. */
async function writeRestartSentinelIfUnchanged(params) {
	return runOpenClawStateWriteTransaction(({ db }) => {
		const current = readRestartSentinelSnapshotSync(db);
		if (current.state.kind === "invalid" || !params.isCurrent()) return null;
		return current.revision === params.expectedRevision ? writeRestartSentinelRowSync(db, params.payload) : null;
	}, {}, { operationLabel: "restart-sentinel.write-if-unchanged" });
}
async function readRestartSentinelSnapshot() {
	return runOpenClawStateWriteTransaction(({ db }) => {
		const snapshot = readRestartSentinelSnapshotSync(db);
		return {
			sentinel: snapshot.state.kind === "valid" ? snapshot.state.sentinel : null,
			revision: snapshot.revision
		};
	}, {}, { operationLabel: "restart-sentinel.read-snapshot" });
}
async function rewriteRestartSentinel(rewrite, env = process.env) {
	return runOpenClawStateWriteTransaction(({ db }) => {
		const current = readRestartSentinelRowSync(db);
		if (current.kind !== "valid") return null;
		const nextPayload = rewrite(structuredClone(current.sentinel.payload));
		return nextPayload ? writeRestartSentinelRowIfRevisionSync(db, nextPayload, current.sentinel.revision) : null;
	}, { env }, { operationLabel: "restart-sentinel.rewrite-current" });
}
async function finalizeUpdateRestartSentinelRunningVersion(version = resolveRuntimeServiceVersion(process.env), env = process.env, commit = resolveRuntimeServiceCommit(), runningRoot) {
	const snapshot = await readRestartSentinel(env);
	if (!snapshot || snapshot.payload.kind !== "update") return null;
	const snapshotRoot = snapshot.payload.stats?.root;
	const expectedRoot = typeof snapshotRoot === "string" ? resolveUpdateInstallRoot(snapshotRoot) : null;
	const discoveredRoot = expectedRoot ? runningRoot ?? await resolveOpenClawPackageRoot({
		moduleUrl: import.meta.url,
		argv1: process.argv[1]
	}) : null;
	const actualRoot = discoveredRoot ? resolveUpdateInstallRoot(discoveredRoot) : null;
	return runOpenClawStateWriteTransaction(({ db }) => {
		const current = readRestartSentinelRowSync(db);
		if (current.kind !== "valid" || current.sentinel.revision !== snapshot.revision || current.sentinel.payload.kind !== "update") return null;
		const payload = structuredClone(current.sentinel.payload);
		const stats = payload.stats ? { ...payload.stats } : {};
		const after = isRecord(stats.after) ? { ...stats.after } : {};
		let changed = false;
		if (after.version !== version) {
			after.version = version;
			changed = true;
		}
		if (expectedRoot && stats.root !== expectedRoot) {
			stats.root = expectedRoot;
			changed = true;
		}
		const before = isRecord(stats.before) ? stats.before : {};
		const beforeSha = typeof before.sha === "string" ? before.sha.trim() : "";
		const expectedSha = typeof after.sha === "string" ? after.sha.trim() : "";
		const actualSha = commit?.trim() ?? "";
		const verifiesGitRevision = stats.mode !== "git" || expectedSha.length > 0 && gitCommitPrefixesMatch(expectedSha, actualSha);
		const verifiesInstallRoot = expectedRoot !== null && actualRoot !== null && expectedRoot === actualRoot;
		const changedInstall = stats.mode !== "git" || beforeSha.length > 0 && expectedSha.length > 0 && !gitCommitPrefixesMatch(beforeSha, expectedSha);
		if (payload.status === "ok" && expectedRoot && !verifiesInstallRoot) {
			payload.status = "error";
			stats.reason = actualRoot ? "restart-root-mismatch" : "restart-root-unavailable";
			delete payload.continuation;
			changed = true;
		} else if (payload.status === "ok" && stats.mode === "git" && expectedSha && !verifiesGitRevision) {
			payload.status = "error";
			stats.reason = actualSha ? "restart-revision-mismatch" : "restart-revision-unavailable";
			delete payload.continuation;
			changed = true;
		}
		stats.after = after;
		payload.stats = stats;
		const finalized = changed ? writeRestartSentinelRowIfRevisionSync(db, payload, current.sentinel.revision) : current.sentinel;
		if (!finalized) return null;
		if (stats.mode === "git" && verifiesInstallRoot && verifiesGitRevision && changedInstall) writeUpdateInstallReceiptRowSync(db, payload);
		return changed ? finalized : null;
	}, { env }, { operationLabel: "restart-sentinel.finalize-running-install" });
}
async function markUpdateRestartSentinelFailure(reason, env = process.env, expectedOwner) {
	return await rewriteRestartSentinel((payload) => {
		if (payload.kind !== "update" || expectedOwner?.runId !== void 0 && payload.stats?.runId !== expectedOwner.runId || expectedOwner?.handoffId !== void 0 && payload.stats?.handoffId !== expectedOwner.handoffId) return null;
		delete payload.continuation;
		payload.status = "error";
		payload.stats = {
			...payload.stats,
			reason
		};
		return payload;
	}, env);
}
async function clearRestartSentinelIfRevision(expectedRevision, env = process.env) {
	return runOpenClawStateWriteTransaction(({ db }) => deleteRestartSentinelRowSync(db, expectedRevision), { env }, { operationLabel: "restart-sentinel.clear-if-revision" });
}
async function readRestartSentinel(env = process.env) {
	try {
		const current = readRestartSentinelRowSync(openOpenClawStateDatabase({ env }).db);
		if (current.kind === "invalid") {
			sentinelLog.warn("Ignoring invalid typed restart sentinel row");
			return null;
		}
		return current.kind === "valid" ? current.sentinel : null;
	} catch (err) {
		sentinelLog.warn(`Failed to read restart sentinel: ${formatErrorMessage(err)}`);
		return null;
	}
}
/** Read the restart sentinel without creating or mutating shared state. */
async function readRestartSentinelReadOnly(env = process.env) {
	try {
		const current = withExistingOpenClawStateDatabaseReadOnly(({ db }) => readRestartSentinelRowSync(db), { env });
		if (!current || current.kind === "missing") return null;
		if (current.kind === "invalid") {
			sentinelLog.warn("Ignoring invalid typed restart sentinel row");
			return null;
		}
		return current.sentinel;
	} catch (err) {
		sentinelLog.warn(`Failed to read restart sentinel: ${formatErrorMessage(err)}`);
		return null;
	}
}
async function readUpdateInstallReceiptPayload(env = process.env) {
	try {
		return readUpdateInstallReceiptRowSync(openOpenClawStateDatabase({ env }).db)?.payload ?? null;
	} catch (err) {
		sentinelLog.warn(`Failed to read update install receipt: ${formatErrorMessage(err)}`);
		return null;
	}
}
function normalizeVerifiedGitUpdateReceipt(payload) {
	if (payload?.kind !== "update" || payload.stats?.mode !== "git" || !isRecord(payload.stats.after)) return null;
	const root = typeof payload.stats.root === "string" ? payload.stats.root.trim() : "";
	const sha = typeof payload.stats.after.sha === "string" ? payload.stats.after.sha.trim() : "";
	if (!root || !sha) return null;
	const upstreamRef = typeof payload.stats.after.upstreamRef === "string" ? payload.stats.after.upstreamRef.trim() : "";
	return {
		root,
		sha,
		...upstreamRef ? { upstreamRef } : {},
		installedAtMs: payload.ts
	};
}
async function readVerifiedGitUpdateReceipt(env = process.env) {
	return normalizeVerifiedGitUpdateReceipt(await readUpdateInstallReceiptPayload(env));
}
async function hasRestartSentinel(env = process.env) {
	try {
		const current = readRestartSentinelRowSync(openOpenClawStateDatabase({ env }).db);
		if (current.kind === "invalid") {
			sentinelLog.warn("Ignoring invalid typed restart sentinel row");
			return false;
		}
		return current.kind === "valid";
	} catch (err) {
		sentinelLog.warn(`Failed to check restart sentinel: ${formatErrorMessage(err)}`);
		return false;
	}
}
function formatRestartSentinelMessage(payload) {
	const message = payload.message?.trim();
	if (message && (!payload.stats || payload.kind === "config-auto-recovery")) return message;
	const lines = [summarizeRestartSentinel(payload)];
	if (message) lines.push(message);
	const reason = payload.stats?.reason?.trim();
	if (reason && reason !== message) lines.push(`Reason: ${reason}`);
	if (payload.doctorHint?.trim()) lines.push(payload.doctorHint.trim());
	return lines.join("\n");
}
function isRestartRequiredConfigWriteSentinel(payload) {
	return (payload.kind === "config-apply" || payload.kind === "config-patch") && payload.status === "ok" && payload.stats?.requiresRestart === true;
}
function summarizeRestartSentinel(payload) {
	if (payload.kind === "config-auto-recovery") return "Gateway auto-recovery";
	if (isRestartRequiredConfigWriteSentinel(payload)) return `Gateway restart required${payload.stats?.mode ? ` (${payload.stats.mode})` : ""}`.trim();
	const kind = payload.kind;
	const status = payload.status;
	const mode = payload.stats?.mode ? ` (${payload.stats.mode})` : "";
	return `Gateway restart${kind === "restart" ? "" : ` ${kind}`} ${status}${mode}`.trim();
}
function trimLogTail(input, maxChars = 8e3) {
	if (!input) return null;
	const text = input.trimEnd();
	if (text.length <= maxChars) return text;
	return `…${sliceUtf16Safe(text, text.length - maxChars)}`;
}
//#endregion
export { writeRestartSentinelRowSync as A, summarizeRestartSentinel as C, parseRestartSentinelEnvelope as D, writeRestartSentinelIfUnchanged as E, readRestartSentinelRowSync as O, reserveUpdateFailureReportReceipt as S, writeRestartSentinel as T, readRestartSentinelSnapshot as _, completeUpdateFailureReportReceiptCleanup as a, refreshUpdateFailureReportReceiptPreparation as b, formatDoctorNonInteractiveHint as c, hasUpdateFailureReportArtifactSweepLease as d, markUpdateFailureReportReceiptPending as f, readRestartSentinelReadOnly as g, readRestartSentinel as h, clearRestartSentinelIfRevision as i, readRestartSentinelSnapshotSync as k, formatRestartSentinelMessage as l, markUpdateRestartSentinelFailure as m, beginUpdateFailureReportReceiptCleanup as n, finalizeUpdateFailureReportReceipt as o, markUpdateFailureReportReceiptPrepared as p, claimUpdateFailureReportArtifactSweep as r, finalizeUpdateRestartSentinelRunningVersion as s, beginStaleUpdateFailureReportReceiptCleanup as t, hasRestartSentinel as u, readUpdateFailureReportReceipt as v, trimLogTail as w, releaseUpdateFailureReportArtifactSweep as x, readVerifiedGitUpdateReceipt as y };
