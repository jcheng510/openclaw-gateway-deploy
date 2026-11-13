import { r as resolveOpenClawPackageRootSync } from "./openclaw-root-3-SBP6RS.mjs";
import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { r as defaultRuntime } from "./runtime-BC29JSZp.mjs";
import { r as resolveStateDir } from "./state-dir-CfAW6S2K.mjs";
import "./paths-CtO6iw0c.mjs";
import "./update-run-schema-Ap8UiBpH.mjs";
import { p as tryReadJson } from "./json-files-Br8qKrAz.mjs";
import { r as readPackageVersion } from "./package-json-7gGhB8Vf.mjs";
import { n as parsePackageOpenClawSchemaVersions } from "./openclaw-schema-versions-PVhojTxP.mjs";
import { a as nodeVersionSatisfiesEngine } from "./runtime-guard-Be896Oh5.mjs";
import { s as redactSupportDiagnosticLine } from "./diagnostic-support-redaction-DYsNZIjV.mjs";
import { r as cloneEnvWithPlatformSemantics } from "./config-env-vars-C__rW8Th.mjs";
import { o as withArtifactPreservingStateReads } from "./openclaw-state-db-readonly-DE3MB0wy.mjs";
import { t as createConfigIO } from "./io.factory-DBfPTl1R.mjs";
import { i as loadInstalledPluginIndexInstallRecordsSync } from "./installed-plugin-index-record-reader-BKR65EEF.mjs";
import "./env-vars-BV_dRD_D.mjs";
import "./io-B18HRL9J.mjs";
import { n as UpdatePreMutationError, p as resolveUpdateRoot } from "./shared-Dwr7djBO.mjs";
import { c as withOwnedManagedUpdateEnv } from "./update-command-service-env-QsECikj0.mjs";
import { i as hasSchemaRefusal, n as checkTargetDatabaseSchemasForContexts, o as createUpdateConfigFailure, r as formatSchemaRefusalLines, t as captureTargetDatabaseSchemaContext } from "./schema-preflight-_BPWsRCI.mjs";
import { t as planLegacyConfigForUpdateChannel } from "./legacy-config-repair-BptO12dg.mjs";
import { n as parseUpdateAdmissionContext, t as isUpdateAdmissionAuthorityEnvKey } from "./update-admission-contract-BBB5KL0d.mjs";
import { t as preflightConfiguredNpmPluginTargets } from "./update-command-plugin-preflight-rcY_4VAN.mjs";
import path from "node:path";
import fs from "node:fs/promises";
//#region src/cli/update-cli/update-command-admit.ts
/** Inspect live inputs using this candidate's contracts, without admitting a mutable run. */
async function inspectUpdateAdmission(context) {
	return await withArtifactPreservingStateReads(async () => {
		if (!path.isAbsolute(context.installation.root) || context.installation.installKind !== "package") throw new Error("Candidate admission requires an explicit package installation root.");
		const root = await resolveUpdateRoot({ root: context.installation.root });
		const candidateRoot = resolveOpenClawPackageRootSync({ moduleUrl: import.meta.url });
		if (!candidateRoot) throw new Error("Candidate package root is unavailable.");
		const manifest = await tryReadJson(path.join(candidateRoot, "package.json"), { maxBytes: 1048576 });
		if (!isRecord(manifest) || typeof manifest.version !== "string" || !manifest.version.trim()) throw new Error("Candidate package version is unavailable.");
		const candidateVersion = manifest.version;
		const schemaVersions = parsePackageOpenClawSchemaVersions(manifest);
		if (!schemaVersions) throw new Error("Candidate package schema declarations are unavailable.");
		const installedVersion = await readPackageVersion(root, { maxBytes: 1048576 });
		const env = cloneEnvWithPlatformSemantics(process.env);
		env.OPENCLAW_VERSION = candidateVersion;
		env.OPENCLAW_DEV_SOURCE_ROOT = candidateRoot;
		delete env.OPENCLAW_COMPATIBILITY_HOST_VERSION;
		delete env.OPENCLAW_BUNDLED_PLUGINS_DIR;
		return await withOwnedManagedUpdateEnv(env, async () => {
			const timeoutMs = context.request.timeoutMs ?? 12e4;
			const checks = /* @__PURE__ */ new Map();
			const reasons = [];
			const warnings = [];
			const legacyConfigWarning = {
				code: "config-warning",
				message: "Configuration contains legacy fields that candidate Doctor can repair after installation."
			};
			const refuse = (name, code, message, nextAction) => {
				checks.set(name, {
					status: "refuse",
					detail: message
				});
				reasons.push({
					code,
					message,
					...nextAction ? { nextAction } : {}
				});
			};
			let databaseContext;
			try {
				const { snapshot, writeOptions } = await createConfigIO({
					env: cloneEnvWithPlatformSemantics(env),
					pluginValidation: "core-only",
					observe: false,
					shellEnvFallback: "defer",
					suppressFutureVersionWarning: true
				}).readConfigFileSnapshotForWrite();
				const legacyConfigPlan = !snapshot.valid && snapshot.legacyIssues.length ? planLegacyConfigForUpdateChannel(snapshot, writeOptions) : void 0;
				databaseContext = await captureTargetDatabaseSchemaContext(env, { legacyConfigPlan });
				if (legacyConfigPlan) warnings.push(legacyConfigWarning);
				checks.set("config", { status: warnings.length ? "warn" : "ok" });
			} catch (error) {
				if (!(error instanceof UpdatePreMutationError)) throw error;
				refuse("config", error.reason, error.message, error.nextAction ?? "Run openclaw doctor --fix, then correct any remaining configuration errors and retry.");
				databaseContext = void 0;
			}
			let schemasAccepted = false;
			let pluginInstallRecords;
			const checkDatabaseSchemas = async (schemaContext) => {
				try {
					const schemas = await checkTargetDatabaseSchemasForContexts(schemaVersions, [schemaContext]);
					if (hasSchemaRefusal(schemas)) refuse("database-schema", "database-schema-preflight", formatSchemaRefusalLines(schemas).join("\n"));
					else {
						checks.set("database-schema", { status: "ok" });
						return true;
					}
				} catch (error) {
					if (!(error instanceof UpdatePreMutationError)) throw error;
					refuse("database-schema", error.reason, error.message);
				}
				return false;
			};
			if (databaseContext) schemasAccepted = await checkDatabaseSchemas(databaseContext);
			if (databaseContext && schemasAccepted && !databaseContext.legacyConfigPlan) {
				const { snapshot, writeOptions } = await createConfigIO({
					env: cloneEnvWithPlatformSemantics(env),
					observe: false,
					suppressFutureVersionWarning: true,
					shellEnvFallback: "defer"
				}).readConfigFileSnapshotForWrite();
				try {
					if (!snapshot.valid || snapshot.readError) {
						const legacyConfigPlan = !snapshot.readError ? planLegacyConfigForUpdateChannel(snapshot, writeOptions) : void 0;
						if (!legacyConfigPlan) throw createUpdateConfigFailure(snapshot);
						databaseContext = await captureTargetDatabaseSchemaContext(env, { legacyConfigPlan });
						schemasAccepted = await checkDatabaseSchemas(databaseContext);
						warnings.push(legacyConfigWarning);
					}
					pluginInstallRecords = writeOptions.basePluginMetadataSnapshot?.index.installRecords;
					warnings.push(...snapshot.warnings.map((warning) => ({
						code: warning.code ?? "config-warning",
						message: `${warning.path}: ${warning.message}`
					})));
					if (snapshot.warnings.length || databaseContext.legacyConfigPlan) checks.set("config", { status: "warn" });
				} catch (error) {
					if (!(error instanceof UpdatePreMutationError)) throw error;
					refuse("config", error.reason, error.message, error.nextAction);
					databaseContext = void 0;
				}
			}
			const nodeEngines = isRecord(manifest.engines) && typeof manifest.engines.node === "string" ? manifest.engines.node : void 0;
			const runtimeCompatible = !nodeEngines || nodeVersionSatisfiesEngine(process.versions.node, nodeEngines) === true;
			checks.set("node-runtime", {
				status: runtimeCompatible ? "ok" : "warn",
				...!runtimeCompatible ? { detail: `Candidate requires Node ${nodeEngines}; selected runtime is Node ${process.versions.node}. The installed updater selects or provisions a compatible runtime.` } : {}
			});
			if (databaseContext && schemasAccepted) {
				const pluginWarnings = await preflightConfiguredNpmPluginTargets({
					config: databaseContext.config,
					env: databaseContext.env,
					targetVersion: candidateVersion,
					channel: context.target.channel,
					timeoutMs,
					installRecords: pluginInstallRecords ?? loadInstalledPluginIndexInstallRecordsSync({
						env: databaseContext.env,
						artifactPreservingReadOnly: true
					})
				});
				warnings.push(...pluginWarnings.map((warning) => ({
					code: "plugin-availability",
					message: warning.message
				})));
				checks.set("plugin-availability", { status: pluginWarnings.length ? "warn" : "ok" });
			}
			return {
				protocol: 1,
				verdict: reasons.length ? "refuse" : "admit",
				reasons,
				warnings,
				facts: {
					candidateVersion,
					installedVersion,
					nodeEngines,
					checks: Array.from(checks, ([name, check]) => ({
						name,
						...check
					}))
				}
			};
		});
	});
}
/** Internal protocol receiver; failures return no verdict and cannot inherit update authority. */
async function updateAdmitCommand(contextPath) {
	try {
		if (Object.keys(process.env).some(isUpdateAdmissionAuthorityEnvKey)) throw new Error("Candidate admission requires an authority-free supervisor invocation.");
		if (!contextPath || !path.isAbsolute(contextPath)) throw new Error("Candidate admission context path is missing or invalid.");
		const stat = await fs.stat(contextPath);
		if (!stat.isFile() || stat.size > 1048576) throw new Error("Candidate admission context is not a bounded regular file.");
		const context = parseUpdateAdmissionContext(JSON.parse(await fs.readFile(contextPath, "utf8")));
		if (!context) throw new Error("Candidate admission context is invalid.");
		const verdict = await inspectUpdateAdmission(context);
		defaultRuntime.writeJson(verdict);
		process.exitCode = verdict.verdict === "admit" ? 0 : 3;
	} catch (error) {
		defaultRuntime.error(redactSupportDiagnosticLine(error instanceof Error ? error.message : String(error), {
			env: process.env,
			stateDir: resolveStateDir(process.env)
		}));
		process.exitCode = 2;
	}
}
//#endregion
export { updateAdmitCommand };
