import { m as resolveConfigPath } from "./paths-CtO6iw0c.mjs";
import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { o as OPENCLAW_DATABASE_SCHEMA_DOCS_URL } from "./openclaw-state-db-contract-CQDemVBb.mjs";
import { s as resolveOpenClawStateSqlitePath } from "./openclaw-state-db.paths-rJI64Ab5.mjs";
import { t as normalizeSupportDiagnosticErrorCode } from "./diagnostic-support-redaction-DYsNZIjV.mjs";
import { r as cloneEnvWithPlatformSemantics } from "./config-env-vars-C__rW8Th.mjs";
import { r as isArtifactPreservingStateRead } from "./openclaw-state-db-readonly-DE3MB0wy.mjs";
import { t as createConfigIO } from "./io.factory-DBfPTl1R.mjs";
import { n as formatConfigIssueLines } from "./issue-format-IKggtHBm.mjs";
import { a as isConfigReadFailure } from "./io.invalid-config-DkKUeCUl.mjs";
import "./env-vars-BV_dRD_D.mjs";
import "./io-B18HRL9J.mjs";
import { o as resolveConfiguredAgentDatabaseCandidatePaths } from "./targets-CxfGP2B4.mjs";
import { n as UpdatePreMutationError } from "./shared-Dwr7djBO.mjs";
import { n as preflightOpenClawDatabaseSchemas } from "./openclaw-database-preflight-CVTZcUhE.mjs";
import fs from "node:fs";
import path from "node:path";
import { isDeepStrictEqual } from "node:util";
//#region src/cli/update-cli/update-command-config-failure.ts
/** Keep validation fields separate from diagnostics that can contain rejected secret values. */
function createUpdateConfigFailure(snapshot) {
	if (isConfigReadFailure(snapshot)) {
		const code = normalizeSupportDiagnosticErrorCode(snapshot.readError?.code ?? void 0);
		const nextAction = snapshot.readError ? "Check configuration file access before retrying." : "Run `openclaw doctor --json` to inspect the configuration loading failure before retrying.";
		return new UpdatePreMutationError("config-read-failed", `Update refused: configuration could not be read${code ? ` (${code})` : ""}. ${nextAction}`, {
			nextAction,
			failureFacts: [{
				check: "config",
				code: code ?? "config-read-failed",
				message: "Configuration could not be read."
			}]
		});
	}
	const issues = snapshot.issues.map(({ path, pathSegments }) => ({
		path,
		pathSegments,
		message: "Invalid configuration field"
	}));
	const nextAction = "Run `openclaw doctor --fix` to repair retired or unrecognized configuration fields, then correct any remaining errors before retrying.";
	return new UpdatePreMutationError("invalid-config", [
		`Update refused: configuration is invalid at ${snapshot.path}.`,
		...formatConfigIssueLines(issues, "-", { normalizeRoot: true }),
		nextAction
	].join("\n"), {
		nextAction,
		failureFacts: issues.length ? issues.map((issue) => ({
			check: "invalid-config",
			code: "invalid-config",
			affectedKey: issue.path || "<root>",
			message: issue.message
		})) : [{
			check: "invalid-config",
			code: "invalid-config",
			message: "Invalid configuration field"
		}]
	});
}
//#endregion
//#region src/cli/update-cli/schema-preflight.ts
/** Candidate admission sees only the invoking process's config and shared-state selectors. */
function isCandidateAdmissionContextCovered(env, admissionEnv = process.env) {
	return resolveConfigPath(env) === resolveConfigPath(admissionEnv) && resolveOpenClawStateSqlitePath(env) === resolveOpenClawStateSqlitePath(admissionEnv);
}
function formatSchemaRefusalLines(schemas, dryRun = false) {
	const prefix = dryRun ? "Would refuse update" : "Update refused";
	return [
		...schemas.incompatible.map((database) => {
			const agent = database.agentId ? ` (agent ${database.agentId})` : "";
			return `${prefix}: ${database.kind} database${agent} ${database.path} has schema ${database.foundVersion}; target supports ${database.supportedVersion}; writer build ${database.writerAppVersion ?? "unknown"}.`;
		}),
		...schemas.indeterminate.map((database) => `${prefix}: could not inspect ${database.kind} database ${database.path}: ${database.reason}; check database access and free disk space, then retry the update.`),
		OPENCLAW_DATABASE_SCHEMA_DOCS_URL,
		"Installing manually via npm bypasses this guard; back up first and verify compatibility."
	];
}
async function checkTargetDatabaseSchemas(supportedVersions, context) {
	let configuredAgentDatabaseCandidatePaths;
	try {
		configuredAgentDatabaseCandidatePaths = resolveConfiguredAgentDatabaseCandidatePaths(context.config, { env: context.env });
	} catch (error) {
		throw new UpdatePreMutationError("database-schema-preflight", `Update refused: could not inspect configured database paths: ${formatErrorMessage(error)}`);
	}
	return preflightOpenClawDatabaseSchemas({
		env: context.env,
		supportedVersions,
		preserveSourceArtifacts: isArtifactPreservingStateRead(),
		configuredAgentDatabaseTargets: [],
		configuredAgentDatabaseCandidatePaths
	});
}
async function captureTargetDatabaseSchemaContext(env, options) {
	const configValidation = options?.configValidation === "candidate" && isCandidateAdmissionContextCovered(env) ? "candidate" : void 0;
	const inspectionEnv = cloneEnvWithPlatformSemantics(env);
	const readEnv = cloneEnvWithPlatformSemantics(env);
	const { snapshot, writeOptions } = await createConfigIO({
		env: inspectionEnv,
		observe: false,
		pluginValidation: "core-only"
	}).readConfigFileSnapshotForWrite();
	const planned = options?.legacyConfigPlan;
	const before = planned?.snapshot;
	const legacyConfigPlan = before && before.path === snapshot.path && before.exists === snapshot.exists && before.raw === snapshot.raw && before.hash === snapshot.hash && isDeepStrictEqual(before.includedPaths ?? [], snapshot.includedPaths ?? []) && isDeepStrictEqual(before.includeProvenance ?? [], snapshot.includeProvenance ?? []) && isDeepStrictEqual(before.sourceConfig, snapshot.sourceConfig) && isDeepStrictEqual(planned.includeIdentity.includeFileHashesForWrite ?? {}, writeOptions.includeFileHashesForWrite ?? {}) && isDeepStrictEqual(planned.includeIdentity.includeFileTargetsForWrite ?? {}, writeOptions.includeFileTargetsForWrite ?? {}) ? planned : void 0;
	if (before?.path === snapshot.path && !legacyConfigPlan) throw new UpdatePreMutationError("database-schema-preflight", `Update refused: planned configuration changed at ${snapshot.path}. Retry against the current source.`);
	if (!snapshot.valid && !legacyConfigPlan && configValidation !== "candidate" || snapshot.readError) throw createUpdateConfigFailure(snapshot);
	return {
		env: inspectionEnv,
		config: configValidation === "candidate" ? snapshot.sourceConfig : legacyConfigPlan?.config ?? snapshot.sourceConfig ?? snapshot.config,
		configSnapshot: snapshot,
		readEnv,
		...legacyConfigPlan ? { legacyConfigPlan } : {},
		...configValidation ? { configValidation } : {}
	};
}
function canonicalDatabaseIdentity(database) {
	let canonical;
	try {
		canonical = fs.realpathSync.native(database.path);
	} catch {
		canonical = path.resolve(database.path);
	}
	const comparable = process.platform === "win32" ? canonical.toLowerCase() : canonical;
	return `${database.kind}\0${comparable}`;
}
/** Inspect the union of caller/service stores without granting migration ownership. */
async function checkTargetDatabaseSchemasForContexts(supportedVersions, contexts) {
	if (!supportedVersions) return {
		incompatible: [],
		indeterminate: []
	};
	const incompatible = /* @__PURE__ */ new Map();
	const indeterminate = /* @__PURE__ */ new Map();
	for (const context of contexts) {
		const result = await checkTargetDatabaseSchemas(supportedVersions, context);
		for (const database of result.incompatible) {
			const identity = canonicalDatabaseIdentity(database);
			incompatible.set(identity, incompatible.get(identity) ?? database);
			indeterminate.delete(identity);
		}
		for (const database of result.indeterminate) {
			const identity = canonicalDatabaseIdentity(database);
			if (!incompatible.has(identity) && !indeterminate.has(identity)) indeterminate.set(identity, database);
		}
	}
	return {
		incompatible: [...incompatible.values()],
		indeterminate: [...indeterminate.values()]
	};
}
function hasSchemaRefusal(schemas) {
	return schemas.incompatible.length > 0 || schemas.indeterminate.length > 0;
}
//#endregion
export { isCandidateAdmissionContextCovered as a, hasSchemaRefusal as i, checkTargetDatabaseSchemasForContexts as n, createUpdateConfigFailure as o, formatSchemaRefusalLines as r, captureTargetDatabaseSchemaContext as t };
