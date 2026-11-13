import { i as resolveRequiredHomeDir } from "./home-dir-CjKH62jd.mjs";
import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { r as truncateUtf16Safe } from "./utf16-slice-D_ngcYKd.mjs";
import { _ as redactSensitiveText } from "./redact-CYYx6Qjc.mjs";
import { t as escapeRegExp } from "./regexp-BZyMFTlj.mjs";
import { r as resolveStateDir } from "./state-dir-CfAW6S2K.mjs";
import "./paths-CtO6iw0c.mjs";
import { i as getNodeSqliteKysely, n as executeSqliteQuerySync } from "./kysely-sync-Y4_ti-rQ.mjs";
import { t as UPDATE_RUN_PHASES } from "./update-run-vocabulary-BYZF4sMi.mjs";
import { r as UpdateRunRecordSchema } from "./update-run-schema-Ap8UiBpH.mjs";
import { t as UPDATE_RUN_TEXT_LIMIT } from "./update-run-limits-Dcay4rgn.mjs";
import { r as hasCommandProcessCleanupError } from "./exec-result-C1iGiwu0.mjs";
import { f as OPENCLAW_STATE_SCHEMA_SQL } from "./openclaw-state-db-legacy-backfills-xddLXhvs.mjs";
import { r as normalizeUpdateFailureFacts, t as createUpdateErrorFact } from "./update-failure-facts-RzGaiYBm.mjs";
import { t as finishUpdateRunRecord } from "./update-run-record-BCEjJm1u.mjs";
import { i as updateRunStepsFromResultStep } from "./update-run-step-BfCzkPVr.mjs";
import { t as runExistingOpenClawStateWriteTransaction } from "./openclaw-state-db-existing-write-Bs94uHSu.mjs";
import { n as decodeRun, o as readUpdateRunRecord } from "./update-run-read.kernel-l3RrZ-g3.mjs";
//#region src/infra/update-run-codec.ts
const JSON_BYTES = 16384;
const RETAINED_STEP_NAMES = [
	...UPDATE_RUN_PHASES,
	"candidate-admission",
	"warning:update-admission-unsupported-target",
	"warning:update-admission-fallback",
	"warning:managed-service-membership",
	"warning:finalize:plugins:deadline",
	"global update",
	"global update (omit optional)",
	"candidate-doctor-lint",
	"notice:ack",
	"notice:activating",
	"notice:verifying",
	"previous generation restoration",
	"post-update verification",
	"diagnostic:database snapshot",
	"diagnostic:database migration writes",
	"diagnostic:database rollback",
	"task-delivery-recovery",
	"driver:adopted",
	"driver:identity-unavailable",
	"reconcile:abandoned",
	"reconcile:superseded",
	"reconcile:acknowledged",
	"reconcile:settle"
];
function mapJsonText(value, transform, key) {
	if (typeof value === "string") return transform(value, key);
	if (Array.isArray(value)) return value.map((entry) => mapJsonText(entry, transform, key));
	if (isRecord(value)) return Object.fromEntries(Object.keys(value).toSorted().map((field) => [field, mapJsonText(value[field], transform, field)]));
	return value;
}
function isRetainedStep(item) {
	return isRecord(item) && typeof item.step === "string" && (item.step.startsWith("finalize:") || RETAINED_STEP_NAMES.some((name) => name === item.step));
}
/** Phase history, notice custody, and restoration proof survive diagnostic eviction. */
function boundedJson(input, maxBytes = JSON_BYTES, preservedTextFields) {
	let value = input;
	let json = JSON.stringify(value);
	while (Buffer.byteLength(json) > maxBytes) {
		if (Array.isArray(value)) {
			const disposable = value.findIndex((item) => !isRetainedStep(item));
			if (disposable >= 0) value = value.toSpliced(disposable, 1);
			else {
				const compacted = value.map((item) => isRecord(item) && item.step !== "task-delivery-recovery" && item.step !== "diagnostic:database snapshot" && item.step !== "diagnostic:database migration writes" && item.step !== "diagnostic:database rollback" && !(typeof item.step === "string" && item.step.startsWith("finalize:doctor-lint:")) ? {
					...item,
					detail: void 0,
					failureFacts: void 0
				} : item);
				if (JSON.stringify(compacted) === json) throw new Error("Update run retained step metadata exceeds its byte limit");
				value = compacted;
			}
		} else if (isRecord(value)) {
			const object = value;
			const arrayField = Object.keys(object).toSorted().find((field) => Array.isArray(object[field]) && object[field].length > 0);
			const array = arrayField ? object[arrayField] : void 0;
			if (arrayField && Array.isArray(array)) value = {
				...object,
				[arrayField]: array.slice(1)
			};
			else value = mapJsonText(value, (text, key) => key && preservedTextFields?.has(key) ? text : truncateUtf16Safe(text, Math.floor(text.length / 2)));
		} else throw new Error("Update run metadata exceeds its bounded schema");
		const nextJson = JSON.stringify(value);
		if (nextJson === json) throw new Error("Update run retained metadata exceeds its byte limit");
		json = nextJson;
	}
	return json;
}
function boundedOriginJson(origin) {
	const { driver, previousDrivers, updateRecoveryCapture, requester, sessionKey, deliveryContext, campaignId, ...admissionDiagnostics } = origin;
	const retained = JSON.stringify({
		driver,
		previousDrivers,
		updateRecoveryCapture
	});
	if (Buffer.byteLength(retained) > JSON_BYTES) throw new Error("Update run recovery receipts exceed the origin byte limit");
	const routing = {
		requester,
		sessionKey,
		deliveryContext,
		campaignId
	};
	const hasAdmission = origin.admission !== void 0 || origin.candidateAdmission !== void 0;
	const identities = hasAdmission ? JSON.stringify({
		driver,
		previousDrivers,
		updateRecoveryCapture,
		...routing
	}) : retained;
	const diagnostics = hasAdmission ? admissionDiagnostics : {
		...admissionDiagnostics,
		...routing
	};
	const diagnosticBudget = JSON_BYTES - Buffer.byteLength(identities) + 2 - (identities === "{}" ? 0 : 1);
	if (diagnostics.candidateAdmission?.warnings.length && Buffer.byteLength(JSON.stringify(diagnostics)) > diagnosticBudget) diagnostics.candidateAdmission = {
		...diagnostics.candidateAdmission,
		warnings: []
	};
	const preservedTextFields = /* @__PURE__ */ new Set([
		"owner",
		"verdict",
		"status",
		"code",
		"name",
		"candidateVersion",
		"installedVersion",
		"fallbackReason"
	]);
	const minimumDiagnostics = JSON.stringify(mapJsonText(diagnostics, (text, key) => key && preservedTextFields.has(key) ? text : ""));
	if (Buffer.byteLength(minimumDiagnostics) > diagnosticBudget) return retained;
	const boundedDiagnostics = boundedJson(diagnostics, diagnosticBudget, preservedTextFields);
	return `{${[identities.slice(1, -1), boundedDiagnostics.slice(1, -1)].filter(Boolean).join(",")}}`;
}
function encodeRun(input, options) {
	const env = options.env ?? process.env;
	const redactPaths = [
		[resolveRequiredHomeDir(env), "~"],
		[env.HOME, "~"],
		[env.USERPROFILE, "~"],
		[resolveStateDir(env), "$OPENCLAW_STATE_DIR"],
		[env.OPENCLAW_CONFIG_PATH, "[path]"],
		...(options.redactPaths ?? []).map((root) => [root, "[path]"])
	].flatMap(([root, replacement]) => {
		if (!root) return [];
		const prefix = root.replaceAll("\\", "/").replace(/\/+$/u, "").split("/").map(escapeRegExp).join("[\\\\/]");
		const flags = /^(?:[A-Za-z]:|\\\\)/u.test(root) ? "giu" : "gu";
		return prefix ? [[new RegExp(`(?<!https?:)(?:(?<![\\w/])|(?<=file:///?))${prefix}(?=$|[\\\\/\\s"'<>.,;:)])`, flags), replacement]] : [];
	});
	const { driver, previousDrivers, updateRecoveryCapture, ...originDiagnostics } = input.origin;
	const record = UpdateRunRecordSchema.parse(mapJsonText({
		...input,
		origin: originDiagnostics,
		steps: input.steps.map((step) => ({
			...step,
			...step.failureFacts ? { failureFacts: normalizeUpdateFailureFacts(step.failureFacts, env) } : {}
		}))
	}, (value) => {
		let text = redactSensitiveText(value, { mode: "tools" });
		for (const [pattern, replacement] of redactPaths) text = text.replace(pattern, () => replacement);
		return truncateUtf16Safe(text, UPDATE_RUN_TEXT_LIMIT);
	}));
	record.origin = UpdateRunRecordSchema.shape.origin.parse({
		...record.origin,
		driver,
		previousDrivers,
		updateRecoveryCapture
	});
	return {
		run_id: record.runId,
		created_at_ms: record.createdAtMs,
		updated_at_ms: record.updatedAtMs,
		trigger: record.trigger,
		phase: record.phase,
		status: record.status,
		reason: record.reason,
		origin_json: boundedOriginJson(record.origin),
		target_json: boundedJson(record.target),
		before_json: boundedJson(record.before),
		after_json: boundedJson(record.after),
		steps_json: boundedJson(record.steps),
		verification_json: boundedJson(record.verification),
		repair_json: boundedJson(record.repair),
		confirmed_at_ms: record.confirmedAtMs,
		finished_at_ms: record.finishedAtMs,
		downtime_ms: record.downtimeMs
	};
}
//#endregion
//#region src/infra/update-run-verification.ts
function isUpdateRunVerificationConfirmed(verification) {
	return verification.serviceRunning === true && verification.versionMatch === true && verification.settled === true && verification.readyz === true && verification.channelsReady === true && verification.pluginErrors?.length === 0;
}
function recordUpdateRunVerificationRecord(record, verification, options = {}) {
	if (options.onlyIfRunning && record.status !== "running") return;
	record.verification = {
		...record.verification,
		...verification,
		...verification.pluginErrors ? { pluginErrors: verification.pluginErrors.slice(-32) } : {}
	};
	if (record.status === "running" && verification.serviceRunning === false) record.confirmedAtMs = null;
	if (isUpdateRunVerificationConfirmed(record.verification) && record.confirmedAtMs === null) record.confirmedAtMs = Date.now();
}
//#endregion
//#region src/infra/update-run-step-key.ts
const RELEASED_STEP_KEYS = /* @__PURE__ */ new Map([
	["package-install", "global update"],
	["package-install-omit-optional", "global update (omit optional)"],
	["git-fetch", "git fetch"],
	["git-fetch-tags", "git fetch tags"],
	["git-fetch-target-tag", "git fetch target tag"],
	["git-target-inspection-fetch", "git target inspection fetch"],
	["git-import-admitted-target", "git import admitted target"]
]);
function updateRunStepKey(step) {
	return RELEASED_STEP_KEYS.get(step) ?? step;
}
//#endregion
//#region src/infra/update-run-write.ts
const schemaStart = OPENCLAW_STATE_SCHEMA_SQL.indexOf("CREATE TABLE IF NOT EXISTS update_runs (");
const schemaEnd = OPENCLAW_STATE_SCHEMA_SQL.indexOf("ON update_runs(status, created_at_ms DESC, run_id);", schemaStart);
if (schemaStart < 0 || schemaEnd < 0) throw new Error("Update run schema markers are missing");
const updateRunLedgerSchema = OPENCLAW_STATE_SCHEMA_SQL.slice(schemaStart, schemaEnd + 51);
function upsertStep(record, input) {
	const step = {
		...input,
		step: updateRunStepKey(input.step)
	};
	const index = record.steps.findIndex((existing) => existing.step === step.step);
	if (index >= 0) record.steps[index] = {
		...record.steps[index],
		...step
	};
	else record.steps.push(step);
	while (record.steps.length > 128) {
		const disposable = record.steps.findIndex((entry) => !isRetainedStep(entry));
		if (disposable < 0) throw new Error("Update run retained steps exceed the step limit");
		record.steps.splice(disposable, 1);
	}
}
function persistRun(db, record, options) {
	record.updatedAtMs = Math.max(Date.now(), record.updatedAtMs + 1);
	const row = encodeRun(record, options);
	executeSqliteQuerySync(db, getNodeSqliteKysely(db).updateTable("update_runs").set(row).where("run_id", "=", record.runId));
	return decodeRun(row);
}
function mutateRunInTransaction(db, runId, update, options, captureBefore) {
	const record = readUpdateRunRecord(db, runId);
	if (!record) throw new Error(`Unknown update run: ${runId}`);
	const before = JSON.stringify(record);
	captureBefore?.(structuredClone(record));
	update(record);
	return before === JSON.stringify(record) ? record : persistRun(db, record, options);
}
function mutateRun(runId, update, options, captureBefore) {
	return runExistingOpenClawStateWriteTransaction(({ db }) => mutateRunInTransaction(db, runId, update, options, captureBefore), options, {
		schemaSql: updateRunLedgerSchema,
		operationLabel: "update.run",
		busyTimeoutMs: options.busyTimeoutMs
	});
}
function applyUpdateRunDiagnostics(record, diagnostics) {
	const { failure, verification, steps, recovery: observedRecovery, rollbackOutcome: observedRollback } = typeof diagnostics === "function" ? diagnostics(record.verification) : diagnostics;
	if (failure && record.status === "running") upsertStep(record, {
		...failure,
		status: "failed"
	});
	if (verification) {
		const { recovery, rollbackOutcome, booted, noticeDelivered, doctorHint } = record.verification;
		record.verification = {
			recovery,
			rollbackOutcome,
			booted,
			noticeDelivered,
			doctorHint
		};
		record.confirmedAtMs = null;
		for (const step of (steps ?? []).flatMap(updateRunStepsFromResultStep)) upsertStep(record, step);
	}
	const constraint = record.verification.recovery;
	const recovery = verification && constraint?.serviceRestartSafe === false ? constraint : observedRecovery;
	if (recovery || observedRollback || verification) recordUpdateRunVerificationRecord(record, {
		...verification,
		...verification ? record.verification : {},
		...recovery ? { recovery } : {},
		...observedRollback ? { rollbackOutcome: observedRollback } : {}
	});
}
/** Diagnostic capture cannot interrupt lifecycle work or replace its original outcome. */
function recordUpdateRunDiagnostics(runId, diagnostics, warn, options = {}) {
	try {
		if (typeof diagnostics !== "function" && !(diagnostics.failure || diagnostics.recovery || diagnostics.rollbackOutcome || diagnostics.verification)) return;
		return mutateRun(runId, (record) => {
			applyUpdateRunDiagnostics(record, diagnostics);
		}, options);
	} catch (error) {
		if (hasCommandProcessCleanupError(error)) throw error;
		const fact = createUpdateErrorFact("requested", error, options.env);
		warn(`Update diagnostics could not be recorded (${fact.code}): ${fact.message ?? "no error message"}`);
		return;
	}
}
function finishUpdateRun(runId, result, options = {}) {
	return mutateRun(runId, (record) => {
		if (record.status === "running") {
			const diagnostics = result.diagnostics;
			if (diagnostics) {
				applyUpdateRunDiagnostics(record, diagnostics);
				if (!diagnostics.verification) for (const step of (diagnostics.steps ?? []).flatMap(updateRunStepsFromResultStep)) upsertStep(record, step);
			}
			record.before = {
				...record.before,
				...result.before
			};
		}
		finishUpdateRunRecord(record, result);
	}, options);
}
//#endregion
export { recordUpdateRunDiagnostics as a, updateRunStepKey as c, encodeRun as d, persistRun as i, isUpdateRunVerificationConfirmed as l, mutateRun as n, updateRunLedgerSchema as o, mutateRunInTransaction as r, upsertStep as s, finishUpdateRun as t, recordUpdateRunVerificationRecord as u };
