import { c as normalizeOptionalLowercaseString, l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { r as createLazyRuntimeModule } from "./lazy-runtime-CJrzFzqU.mjs";
import { n as isTruthyEnvValue } from "./env-SuLFUnAK.mjs";
import { d as resolveHomeDir } from "./utils-DUAwk2p5.mjs";
import { f as parseLegacySecretRefEnvMarker, s as isLegacySecretRefEnvMarker } from "./types.secrets-BXEuin38.mjs";
import { r as resolveStateDir } from "./state-dir-CfAW6S2K.mjs";
import { S as resolveIsConfigReadOnly, m as resolveConfigPath, p as resolveCanonicalConfigPath, t as CONFIG_PATH } from "./paths-CtO6iw0c.mjs";
import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { t as formatCliCommand } from "./command-format-Cte1SWM4.mjs";
import { n as sanitizeForLog } from "./ansi-6Z0Nu6M4.mjs";
import { t as createSubsystemLogger } from "./subsystem-CeqVSEVi.mjs";
import { s as resolveOpenClawStateSqlitePath } from "./openclaw-state-db.paths-rJI64Ab5.mjs";
import { b as resolveFutureConfigActionBlock, r as cloneEnvWithPlatformSemantics } from "./config-env-vars-C__rW8Th.mjs";
import { o as withArtifactPreservingStateReads, p as withOpenClawStateDatabaseReadSnapshot } from "./openclaw-state-db-readonly-DE3MB0wy.mjs";
import { r as assertOpenClawStateWriteAllowedAtPath } from "./openclaw-state-ownership-1l-TMJat.mjs";
import { r as normalizeProviderId } from "./provider-id-BIyeXQag.mjs";
import { d as resolveAgentWorkspaceDir } from "./agent-scope-config-Dm6T00l4.mjs";
import "./session-key-BC4m_Ly5.mjs";
import { t as DEFAULT_ACCOUNT_ID } from "./account-id-CW6dlabA.mjs";
import { a as readAgentRosterProperty, l as tryResolveSoleAgentId, n as listAgentEntries } from "./agent-roster-B45JERT5.mjs";
import { i as hashConfigRaw, s as parseConfigJson5 } from "./io.read-helpers-CgQwh9G4.mjs";
import { r as UPDATE_ENVIRONMENT_FAILURE_REASONS } from "./update-outcome-BHX5xsqd.mjs";
import { f as shouldDeferConfiguredPluginInstallRepair, p as shouldSkipLegacyUpdateDoctorConfigWrite } from "./update-phase-Ibh5Kd_i.mjs";
import { c as createConfigIoContext, n as prepareConfigRecoveryFromContext, s as recoverConfigFromLastKnownGoodCore } from "./io.factory-DBfPTl1R.mjs";
import { c as readDeferredPluginMigrations, i as mergeDeferredPluginMigration, r as formatDeferredPluginMigration, t as DeferredPluginMigrationConflictError, u as recordDeferredPluginMigrations } from "./deferred-plugin-migrations-Ds53ELH9.mjs";
import { C as setActiveDegradedPlugins } from "./discovery-BePzXbRd.mjs";
import { r as getOfficialExternalPluginCatalogEntry } from "./official-external-plugin-catalog-VarBz9zD.mjs";
import { i as loadInstalledPluginIndexInstallRecordsSync } from "./installed-plugin-index-record-reader-BKR65EEF.mjs";
import { o as getOfficialExternalPluginCatalogManifest } from "./official-external-plugin-catalog-source-CqaCy6HX.mjs";
import { h as resolveNormalizedProviderModelMaxTokens } from "./validation-core-YrPXii0X.mjs";
import { r as createInvalidConfigError } from "./io.invalid-config-DkKUeCUl.mjs";
import { f as readRecentConfigAuditRecords } from "./io.audit-BTBLX19y.mjs";
import { l as removeLegacyCopilotDiscovery, u as migrateLegacyContextBudgetConfig } from "./validation-D_X_aeNf.mjs";
import { r as retainLegacyDefaultAgentId } from "./legacy.default-agent-owner-C1atgXtB.mjs";
import { t as migratePersistedImplicitMainRoster } from "./legacy.roster-D1NwNEmk.mjs";
import "./agent-scope-L_eY3Hj7.mjs";
import { n as loadPluginManifestRegistryForPluginRegistry } from "./plugin-registry-contributions-CZq67NZQ.mjs";
import { a as resolveDeferredPluginMigrationConfigPaths, i as preserveDeferredPluginMigrationConfig } from "./deferred-plugin-migration-config-BbOrU7ue.mjs";
import { r as normalizeTalkSection } from "./talk-_lqz02Jd.mjs";
import { a as HeartbeatSchema } from "./zod-schema.agent-runtime-BVnAAfQo.mjs";
import { n as discoverConfigSecretTargets } from "./target-registry-query-BBW_L4tU.mjs";
import { i as setPathExistingStrict } from "./path-utils-NVUc8xdq.mjs";
import "./target-registry-C2MbIpos.mjs";
import "./env-vars-BV_dRD_D.mjs";
import { a as isBlockedLegacyCodexModelRef } from "./codex-route-model-ref-BOlFzBP5.mjs";
import { c as migrateLegacyWebSearchConfig, d as resolveLegacyCliRuntimeAlias, l as migrateLegacyXSearchConfig, o as stripRetiredTuningKnobs, s as migrateLegacyWebFetchConfig, u as migrateLegacyRuntimeModelRef } from "./legacy-BsVKffEe.mjs";
import { c as selectedCanonicalModelRefsForRuntimePolicy, f as visitChannelEntries, i as mergeModelRefMapEntries, o as rewriteModelRefs, r as isLegacyModelsAddCodexMetadataModel, s as modelEntryWithRuntimePolicy, u as visitAgentConfigScopes } from "./legacy-config-migrations.runtime.models-Dl5Y6YWP.mjs";
import { n as containsAuthoredInclude, t as classifyOtelGrpcMigrationOwnership } from "./include-migration-ownership-CmcqCsxa.mjs";
import { t as configIncludeOwnsAgentRoster } from "./agent-roster-provenance-DBIaC1eR.mjs";
import { y as recoverConfigFromJsonRootSuffix } from "./io.runtime-BOdk1dW9.mjs";
import "./io-B18HRL9J.mjs";
import "./plugin-registry-BbOSHtTb.mjs";
import { c as evaluateAgentDatabaseAdmissions, g as recordAgentDatabaseAdmissions, p as listAgentDatabaseAdmissionRefusals, r as canIsolateAgentDatabase } from "./agent-database-admission-CLYAvaL3.mjs";
import { a as withoutPluginInstallRecords } from "./installed-plugin-index-records-DHEAmSsp.mjs";
import { a as runPluginSetupConfigMigrations } from "./setup-registry-CUd0q44F.mjs";
import { r as resolveUpdateRehearsalRoot } from "./update-rehearsal-paths-C4PfIK1q.mjs";
import { t as DEFAULT_GOOGLE_API_BASE_URL } from "./google-api-base-url-DVjll0O0.mjs";
import { t as note } from "./note-BpWs6H5N.mjs";
import { n as sanitizeDoctorNote, t as emitDoctorNotes } from "./emit-notes-DnxujLhz.mjs";
import { a as noteMcpOriginWarning, c as noteOpencodeProviderOverrides, i as noteImplicitFallbackClobberWarnings, l as noteSandboxOriginProxyWarning, n as noteDoctorConfigPreflightIssues, o as noteMediaCliModelWarnings, r as noteDoctorHookConfigWarnings, s as noteMissingDefaultAgentOwner } from "./doctor-config-analysis-yucbqgfG.mjs";
import { t as listDoctorConfiguredChannelIds } from "./configured-channel-ids-XADU8iWJ.mjs";
import { a as migrateLegacyConfig, n as applyUnknownConfigKeyStep, o as applyLegacyDoctorMigrations, r as prepareDoctorConfigReferenceSource, s as applyChannelDoctorCompatibilityMigrations, t as applyLegacyCompatibilityStep } from "./config-flow-steps-kAaYHX80.mjs";
import { c as inspectShippedPluginInstallConfigRecords, n as assertShippedPluginInstallConfigImportCurrent, s as readShippedPluginInstallConfigImportRecords } from "./plugin-registry-migration-CUoERKwp.mjs";
import { r as callGateway } from "./call-CjdP4t26.mjs";
import { t as getAgentDatabaseStartupAdmission } from "./agent-database-startup-DP2u4aPo.mjs";
import { i as migrateLegacyCommandOwners } from "./doctor-command-owner-vD3F1213.mjs";
import { r as loadSetupChannelPluginFromManifestRecord } from "./read-only-C2Wb_vFV.mjs";
import { t as pruneBindingsForMissingAgents } from "./legacy-config-binding-repair-CnK0B9dK.mjs";
import { r as withProgress } from "./progress-CqUCMTil.mjs";
import { t as createPluginCapabilityConsentPrompter } from "./plugin-capability-consent-CpRz5cis.mjs";
import { t as resolveSingleAccountPromotion } from "./setup-promotion-helpers-CvQw1LzB.mjs";
import { n as importAutomaticConfigRepairInstallRecords, r as planAutomaticConfigRepair, t as commitAutomaticConfigRepair } from "./automatic-config-repair-DgVwk8M2.mjs";
import { t as readResolvedDeferredPluginMigrationWarnings } from "./deferred-plugin-migration-warnings-CzAuuLg_.mjs";
import { c as throwIfDoctorStateMigrationRefused, t as DoctorStateMigrationRefusalError } from "./state-migrations.messages-DZiaEGjz.mjs";
import { a as readConfigPreflightSnapshot, o as measureDoctorConfigPreflightStep, t as assertPreflightConfigUnchanged } from "./config-preflight-snapshot-D4KXv22P.mjs";
import { n as createDoctorPluginMetadataSnapshotScope } from "./plugin-metadata-snapshot-scope-D_fEAKNq.mjs";
import { n as runDoctorPluginConvergence } from "./doctor-config-preflight-plugin-verification-B1Q7yyEy.mjs";
import { t as inspectPluginMigrationAvailability } from "./plugin-migration-availability-DB7_julx.mjs";
import { n as createWorkspaceAliasMigrationRepair } from "./doctor-workspace-alias-CLkLN9zt.mjs";
import { n as cronCodexRuntimePolicyTargetKey } from "./store-migration-Bj2hb-Af.mjs";
import { t as applyDoctorConfigMutation } from "./config-mutation-state-C1aF4rWi.mjs";
import { t as canWriteDoctorInclude } from "./roster-include-write-D4-FFLQR.mjs";
import { existsSync } from "node:fs";
import path from "node:path";
import fs$1 from "node:fs/promises";
import { homedir } from "node:os";
import { isDeepStrictEqual } from "node:util";
//#region src/commands/doctor-config-preflight-plugin-index.ts
/** Returns true during updater-managed config rewrites where plugin validation may be stale. */
function shouldSkipPluginValidationForDoctorConfigPreflight(env = process.env) {
	return isTruthyEnvValue(env.OPENCLAW_UPDATE_IN_PROGRESS);
}
/** One preflight owns completion; each read still checks the current update phase. */
function createDoctorRehearsalSnapshotPreparation(report) {
	let completed = false;
	const prepareSnapshot = async (snapshot) => {
		if (completed) return;
		const { completeUpdateCandidatePluginRehearsal } = await import("./update-candidate-plugin-repair-Dp-NhDDK.mjs");
		const result = await completeUpdateCandidatePluginRehearsal({
			config: snapshot.sourceConfig ?? snapshot.config ?? {},
			env: process.env,
			installRecords: loadInstalledPluginIndexInstallRecordsSync({ env: process.env })
		});
		completed = true;
		report({
			changes: result.copiedFiles > 0 ? [`Update rehearsal: copied ${result.copiedFiles} missing plugin dependency files.`] : [],
			warnings: result.warnings
		});
	};
	return (enabled) => enabled && resolveUpdateRehearsalRoot(process.env) && process.env.OPENCLAW_UPDATE_IN_PROGRESS === "1" ? prepareSnapshot : void 0;
}
//#endregion
//#region src/commands/doctor/shared/config-recovery.ts
const transformDoctorRecoveryCandidate = (params) => {
	const ownership = classifyOtelGrpcMigrationOwnership({
		snapshot: {
			path: params.configPath,
			includeProvenance: params.includeProvenance
		},
		authoredConfig: params.candidate.parsed,
		resolvedConfig: params.resolvedConfig
	});
	if (ownership && ownership.kind !== "direct") throw createInvalidConfigError(params.configPath, ownership.kind === "resolved-only" ? "candidate migration cannot persist an env-resolved diagnostics.otel.protocol repair" : "candidate migration requires an include-owned diagnostics.otel.protocol repair");
	const migration = applyLegacyDoctorMigrations(params.candidate.parsed, {
		sourceConfigBeforeMigrations: params.resolvedConfig,
		context: {
			authoredRaw: params.candidate.parsed,
			resolvedRaw: params.resolvedConfig
		}
	});
	return migration.next ? preserveDeferredPluginMigrationConfig({
		sourceConfig: params.candidate.parsed,
		nextConfig: migration.next,
		pending: params.deferredPluginMigrations
	}) : params.candidate.parsed;
};
function prepareDoctorConfigRecoverySnapshot(options, snapshot) {
	return prepareConfigRecoveryFromContext(createConfigIoContext(options, transformDoctorRecoveryCandidate), snapshot);
}
function recoverDoctorConfigFromLastKnownGood(params) {
	const context = createConfigIoContext({ configPath: params.snapshot.path }, transformDoctorRecoveryCandidate);
	return recoverConfigFromLastKnownGoodCore({
		...params,
		deps: context.deps,
		prepareCandidate: context.prepareRecoveryBackupCandidate
	});
}
//#endregion
//#region src/commands/doctor-config-preflight-legacy-config.ts
function createDoctorConfigRepairPlanner(params) {
	const planScopedConfigRepair = (snapshot) => {
		const installRecords = params.hasImportedPluginConfig() ? loadInstalledPluginIndexInstallRecordsSync() : void 0;
		return params.runWithPluginMetadataSnapshot({ config: snapshot.sourceConfig ?? snapshot.config ?? {} }, () => planAutomaticConfigRepair(snapshot, { installRecords }));
	};
	const planAdmittedConfigRepair = (snapshot, prepared = null) => (params.options.repairPrefixedConfig === true || params.stateMigrationsRequested && params.options.migrateLegacyConfig !== false) && !snapshot.valid && !params.skipLegacyParentConfigWrite && (params.options.repairPrefixedConfig === true || !shouldSkipPluginValidationForDoctorConfigPreflight()) && !resolveIsConfigReadOnly(process.env) && !resolveFutureConfigActionBlock({
		action: "normalize legacy config",
		snapshot
	}) ? prepared ?? planScopedConfigRepair(snapshot) : null;
	return {
		planScopedConfigRepair,
		planAdmittedConfigRepair
	};
}
async function migrateLegacyDoctorConfig(params) {
	if (!params.enabled) return;
	const changes = await params.measure("legacy-config-migration", maybeMigrateLegacyConfig);
	if (changes.length > 0) note(changes.map((entry) => `- ${entry}`).join("\n"), "Doctor changes");
}
function assertPreJuneConfigMigrated(config) {
	if (!isRecord(config)) return;
	const retired = [];
	const checkKeys = (scope, configPath, keys) => {
		if (!isRecord(scope)) return;
		for (const key of keys) if (Object.hasOwn(scope, key)) retired.push(configPath ? `${configPath}.${key}` : key);
	};
	checkKeys(config, "", ["heartbeat"]);
	checkKeys(config.routing, "routing", ["allowFrom", "groupChat"]);
	checkKeys(config.gateway, "gateway", ["webchat"]);
	const channels = isRecord(config.channels) ? config.channels : {};
	checkKeys(channels, "channels", ["webchat"]);
	checkKeys(channels.telegram, "channels.telegram", ["requireMention"]);
	for (const channelId of [
		"discord",
		"line",
		"matrix",
		"telegram"
	]) visitChannelEntries(config, channelId, (scope, configPath) => {
		checkKeys(scope.threadBindings, `${configPath}.threadBindings`, ["ttlHours"]);
	});
	visitChannelEntries(config, "feishu", (scope, configPath) => {
		if (configPath !== "channels.feishu") checkKeys(scope, configPath, ["botName"]);
	});
	checkKeys((isRecord(config.session) ? config.session : {}).threadBindings, "session.threadBindings", ["ttlHours"]);
	visitAgentConfigScopes(config, (scope, configPath) => {
		checkKeys(scope, configPath, configPath === "agents.defaults" ? [
			"llm",
			"embeddedPi",
			"embeddedHarness"
		] : ["embeddedPi", "embeddedHarness"]);
		checkKeys(scope.sandbox, `${configPath}.sandbox`, ["perSession"]);
	});
	if (retired.length > 0) throw new Error(`Config contains retired pre-June keys: ${retired.join(", ")}. Doctor cannot remove these settings safely. Install OpenClaw 2026.9.5, run "${formatCliCommand("openclaw doctor --fix")}", then upgrade to latest. See https://docs.openclaw.ai/install/updating#upgrading-very-old-versions.`);
}
/** Repair active legacy bytes before considering an older backup. */
async function prepareDoctorConfigRecovery(params) {
	let snapshotRead = params.snapshotRead;
	let snapshot = snapshotRead.snapshot;
	assertPreJuneConfigMigrated(snapshot.sourceConfigBeforeMigrations ?? snapshot.sourceConfig);
	let activeConfigRepair = null;
	const recoveryEnabled = params.enabled && !resolveFutureConfigActionBlock({
		action: "recover config",
		snapshot
	});
	if (recoveryEnabled && snapshot.valid) {
		const recovery = await prepareDoctorConfigRecoverySnapshot({ configPath: snapshot.path }, snapshot);
		if (recovery) {
			await recovery.apply();
			snapshotRead = await params.readSnapshot();
			snapshot = snapshotRead.snapshot;
		}
	}
	if (recoveryEnabled && snapshot.exists && !snapshot.valid) {
		const pendingPluginInstallConfig = inspectShippedPluginInstallConfigRecords(snapshot.sourceConfig).status !== "missing";
		activeConfigRepair = typeof snapshot.raw === "string" && parseConfigJson5(snapshot.raw).ok ? params.planRepair(snapshot) : null;
		let configRepaired = false;
		if (!activeConfigRepair && await recoverConfigFromJsonRootSuffix(snapshot)) {
			note("Removed non-JSON prefix from openclaw.json.", "Config");
			configRepaired = true;
		} else if (!activeConfigRepair && !pendingPluginInstallConfig && await recoverDoctorConfigFromLastKnownGood({
			snapshot,
			reason: "doctor-invalid-config"
		})) {
			note("Restored openclaw.json from last-known-good; original saved as .clobbered.*.", "Config");
			configRepaired = true;
		}
		if (configRepaired) {
			snapshotRead = await params.readSnapshot();
			snapshot = snapshotRead.snapshot;
		}
		if (!snapshot.valid && typeof snapshot.raw === "string" && !parseConfigJson5(snapshot.raw).ok) throw new Error(`Config at ${snapshot.path} is not parseable and cannot be repaired automatically. The file remains unchanged. Inspect the exact parse error with ${formatCliCommand("openclaw config validate")}, then hand-edit the file; or move it aside and run ${formatCliCommand("openclaw onboard")} to generate a fresh config.`);
	}
	return {
		snapshotRead,
		activeConfigRepair
	};
}
async function maybeMigrateLegacyConfig() {
	const changes = [];
	const home = resolveHomeDir();
	if (!home) return changes;
	const targetPath = resolveCanonicalConfigPath();
	const targetDir = path.dirname(targetPath);
	try {
		await fs$1.access(targetPath);
		return changes;
	} catch {}
	const legacyPath = path.join(home, ".clawdbot", "clawdbot.json");
	try {
		await fs$1.access(legacyPath);
	} catch {
		return changes;
	}
	await fs$1.mkdir(targetDir, { recursive: true });
	try {
		await fs$1.copyFile(legacyPath, targetPath, fs$1.constants.COPYFILE_EXCL);
		changes.push(`Migrated legacy config: ${legacyPath} -> ${targetPath}`);
	} catch (error) {
		if ((error && typeof error === "object" && "code" in error ? error.code : void 0) !== "EEXIST") throw new Error(`Failed to migrate legacy config ${legacyPath} -> ${targetPath}: ${formatErrorMessage(error)}`, { cause: error });
	}
	return changes;
}
//#endregion
//#region src/commands/doctor-config-preflight-migrations.ts
/** Settle package repairs before state migrations select their plugin owners. */
async function prepareDoctorMigrationPlugins(params) {
	const convergence = await runDoctorPluginConvergence(params);
	setActiveDegradedPlugins(convergence.quarantinedPlugins);
	await params.onDeferredPlugins(convergence.deferredPlugins ?? [], convergence.migrationInspection);
	const refreshed = await params.readRefreshedSnapshot();
	assertPreflightConfigUnchanged(params.snapshotRead.snapshot, refreshed.snapshot);
	return refreshed;
}
async function assertDoctorPreflightMigrationsComplete(params) {
	const scopedRefusals = params.stepReceipts.filter((receipt) => receipt.outcome === "refused" && (receipt.refusal?.code === "agent-database-ownership-mismatch" || receipt.refusal?.code === "blocked-by-agent-database-refusal") && receipt.refusedAgentDatabasePaths?.length);
	const admissions = scopedRefusals.length > 0 ? getAgentDatabaseStartupAdmission() ? listAgentDatabaseAdmissionRefusals() : await evaluateAgentDatabaseAdmissions(params.cfg) : [];
	if (scopedRefusals.length > 0) recordAgentDatabaseAdmissions(admissions);
	const isolatedPaths = new Set(admissions.filter((refusal) => refusal.code !== "agent-database-ownership-mismatch" || canIsolateAgentDatabase(params.cfg, refusal.agentId)).flatMap((refusal) => refusal.paths.map((pathname) => path.resolve(pathname))));
	for (const receipt of scopedRefusals) if (receipt.refusedAgentDatabasePaths?.every((pathname) => isolatedPaths.has(path.resolve(pathname)))) receipt.outcome = "warning";
	try {
		throwIfDoctorStateMigrationRefused(params.stepReceipts);
	} catch (error) {
		if (error instanceof DoctorStateMigrationRefusalError) {
			const { assertConfiguredWorkspaceStateReady } = await import("./workspace-state-dirs-OztDezt5.mjs");
			try {
				await assertConfiguredWorkspaceStateReady({
					cfg: params.cfg,
					operation: "doctor"
				});
			} catch (workspaceError) {
				params.report({
					changes: [],
					warnings: [String(workspaceError)]
				});
			}
		}
		throw error;
	}
}
function noteStateMigrationResult(result) {
	for (const key of [
		"changes",
		"notices",
		"warnings"
	]) if (result[key]?.length) note(result[key].map((entry) => `- ${entry}`).join("\n"), `Doctor ${key}`);
}
//#endregion
//#region src/commands/doctor-config-preflight-plugin-migrations.ts
/** One preflight retains unavailable owners until their migration reports completion. */
function createDoctorPluginMigrationPreparation(params) {
	const previousById = /* @__PURE__ */ new Map();
	let deferred = [];
	let expectedPending = [];
	let refreshSnapshot = false;
	let previousLoaded = false;
	const loadPrevious = async (snapshot) => {
		if (previousLoaded) return;
		const env = cloneEnvWithPlatformSemantics(params.env());
		if (!(snapshot?.exists ?? existsSync(resolveConfigPath(env)))) return;
		deferred = await withArtifactPreservingStateReads(() => withOpenClawStateDatabaseReadSnapshot(async () => readDeferredPluginMigrations({ env }), { env }));
		expectedPending = structuredClone(deferred);
		for (const entry of deferred) previousById.set(entry.pluginId, entry);
		previousLoaded = true;
	};
	let prepared = false;
	const completedIds = /* @__PURE__ */ new Set();
	const reported = /* @__PURE__ */ new Map();
	let statelessPluginIds = /* @__PURE__ */ new Set();
	let runtimePluginAliases = /* @__PURE__ */ new Set();
	const inspectedStatelessPluginIds = /* @__PURE__ */ new Set();
	const learn = (inspection) => {
		if (!inspection) return;
		statelessPluginIds = new Set(inspection.statelessPluginIds);
		runtimePluginAliases = new Set(inspection.runtimePluginAliases);
		for (const pluginId of inspection.requiredPluginIds) {
			const pending = previousById.get(pluginId);
			if (pending) previousById.set(pluginId, {
				...pending,
				requiresStateMigration: true
			});
		}
		for (const pluginId of inspection.inspectionRequiredPluginIds) {
			const pending = previousById.get(pluginId);
			if (pending) previousById.set(pluginId, {
				...pending,
				requiresDoctorInspection: true
			});
		}
	};
	const retain = (pending) => mergeDeferredPluginMigration(previousById.get(pending.pluginId), pending);
	const remember = () => {
		for (const pending of deferred) previousById.set(pending.pluginId, pending);
	};
	const prepare = async (snapshot) => {
		await loadPrevious(snapshot);
		if (!snapshot.exists) return [...previousById.values()];
		if (!prepared && params.enabled) {
			const availability = await inspectPluginMigrationAvailability({
				cfg: snapshot.sourceConfig,
				env: params.env(),
				installRecords: readShippedPluginInstallConfigImportRecords(snapshot, { env: params.env() }),
				retainedPluginIds: [...previousById.keys()],
				deferInstallation: shouldDeferConfiguredPluginInstallRepair(params.env())
			});
			learn(availability);
			deferred = availability.pending.map(retain);
			remember();
			prepared = true;
		}
		return [...previousById.values()];
	};
	const reportPending = (plugin) => {
		const warning = formatDeferredPluginMigration(plugin, params.env());
		const previous = reported.get(plugin.pluginId);
		if (previous?.warnings[0] === warning) return;
		params.report({
			changes: [],
			warnings: [warning],
			warningDisposition: "recoverable",
			outcome: "deferred"
		});
		if (previous) {
			previous.warnings = [warning];
			return;
		}
		const receipt = {
			id: `plugin:${plugin.pluginId}`,
			phase: "final",
			source: [{
				kind: "owner",
				id: plugin.pluginId
			}],
			target: [{
				kind: "owner",
				id: plugin.pluginId
			}],
			requiredness: "conditional",
			reversibility: "checkpoint-required",
			outcome: "deferred",
			changes: [],
			warnings: [warning]
		};
		reported.set(plugin.pluginId, receipt);
		params.recordReceipt(receipt);
	};
	const persistPending = async (pending, resolvedPluginIds) => {
		try {
			const committed = await recordDeferredPluginMigrations({
				env: params.env(),
				pending,
				...resolvedPluginIds ? { resolvedPluginIds } : {},
				expectedPending
			});
			if (committed) expectedPending = structuredClone(committed);
			return true;
		} catch (error) {
			if (!(error instanceof DeferredPluginMigrationConflictError)) throw error;
			expectedPending = structuredClone(error.pending);
			previousById.clear();
			deferred = error.pending;
			completedIds.clear();
			statelessPluginIds.clear();
			runtimePluginAliases.clear();
			inspectedStatelessPluginIds.clear();
			refreshSnapshot = true;
			for (const plugin of deferred) {
				previousById.set(plugin.pluginId, plugin);
				reportPending(plugin);
			}
			return false;
		}
	};
	return {
		deferred: () => deferred,
		prepare,
		snapshotOptions: async () => {
			await loadPrevious();
			return {
				preparePluginMigrations: !prepared && params.enabled ? prepare : void 0,
				deferredPluginMigrations: [...previousById.values()]
			};
		},
		async migrate(config) {
			const { autoMigrateLegacyPluginDoctorState } = await import("./state-migrations.plugin-doctor-ocuaat-d.mjs");
			params.report(await params.measure("plugin-doctor-migrations", () => params.runWithPluginMetadataSnapshot({ config }, () => autoMigrateLegacyPluginDoctorState({
				config,
				env: params.env(),
				log: params.log,
				...params.doctorOnlyStateMigrations ? { doctorOnlyStateMigrations: true } : {}
			}))));
		},
		async converged(pending, snapshot, metadata, inspection) {
			learn(inspection);
			deferred = pending.map((plugin) => retain(Object.assign(resolveDeferredPluginMigrationConfigPaths({
				config: snapshot.sourceConfigBeforeMigrations ?? snapshot.sourceConfig,
				pluginId: plugin.pluginId,
				compatibilityMigrationPaths: metadata?.plugins.find((record) => record.id === plugin.pluginId)?.configContracts?.compatibilityMigrationPaths
			}), plugin)));
			remember();
			if (!await persistPending([...previousById.values()])) return;
			for (const plugin of deferred) reportPending(plugin);
		},
		observe(result) {
			for (const pluginId of result.requiredPluginIds ?? []) {
				const pending = previousById.get(pluginId);
				if (pending) previousById.set(pluginId, {
					...pending,
					requiresStateMigration: true
				});
			}
			for (const pluginId of result.statelessPluginIds ?? []) inspectedStatelessPluginIds.add(pluginId);
			for (const pluginId of result.completedPluginIds ?? []) completedIds.add(pluginId);
		},
		async complete() {
			if (!params.enabled) return false;
			const unavailableIds = new Set(deferred.map((plugin) => plugin.pluginId));
			const resolvedPluginIds = [...previousById.values()].filter((plugin) => {
				if (completedIds.has(plugin.pluginId)) return true;
				if (plugin.requiresStateMigration || unavailableIds.has(plugin.pluginId)) return false;
				if (inspectedStatelessPluginIds.has(plugin.pluginId)) return true;
				if (plugin.requiresDoctorInspection) return false;
				return statelessPluginIds.has(plugin.pluginId) || runtimePluginAliases.has(plugin.pluginId) && !plugin.validationExcludedPaths?.length && (plugin.configPaths ?? []).every((segments) => segments.length === 2 && segments[0] === "session" && segments[1] === "store");
			}).map((plugin) => plugin.pluginId);
			const resolvedIds = new Set(resolvedPluginIds);
			const pending = [...previousById.values()].filter((plugin) => !resolvedIds.has(plugin.pluginId)).map((plugin) => unavailableIds.has(plugin.pluginId) ? plugin : Object.assign(plugin, {
				reason: "The installed plugin has not confirmed that its saved data and settings are ready for this version. If Doctor cannot finish the upgrade, report this warning to the plugin maintainer.",
				command: "openclaw doctor --fix"
			}));
			if (resolvedPluginIds.length === 0 && pending.length === 0) return refreshSnapshot;
			if (!await persistPending(pending, resolvedPluginIds)) return true;
			for (const pluginId of resolvedPluginIds) previousById.delete(pluginId);
			for (const plugin of pending) {
				previousById.set(plugin.pluginId, plugin);
				reportPending(plugin);
			}
			return refreshSnapshot || resolvedPluginIds.length > 0;
		}
	};
}
//#endregion
//#region src/commands/doctor-config-preflight-worker-scope.ts
async function withDoctorConfigPreflightWorkerScope(options, run) {
	if (options.migrateState !== false && options.doctorOnlyStateMigrations === true) {
		const { withSqliteReadOnlyWorkerScope } = await import("./sqlite-readonly-worker-ChyOPBgv.mjs");
		return await withSqliteReadOnlyWorkerScope(() => run(options));
	}
	return await run(options);
}
//#endregion
//#region src/commands/doctor-config-preflight.cron.ts
/** Preserve a retired partition selector even when other config cannot drive core migrations. */
async function migrateRetainedStore(params) {
	const cfg = retainStoreConfig(params.config);
	if (!cfg) return;
	const { repairLegacyCronStoreWithoutPrompt } = await params.measure("cron-repair-import", () => import("./legacy-repair-BGlwl-yp.mjs"));
	params.report(await params.measure("cron-repair", () => repairLegacyCronStoreWithoutPrompt({
		cfg,
		migrateCodexModelRefs: false
	})));
	const { migrateLegacyConfigMachineState } = await import("./state-migrations.config-machine-state-CVXrzjMj.mjs");
	params.report(migrateLegacyConfigMachineState({
		config: params.config,
		env: params.env
	}));
}
/** Restores retired cron migration inputs that canonical config migration intentionally strips. */
function withLegacyConfig(config, legacyConfig) {
	const legacyCron = legacyConfig?.cron;
	if (!legacyCron || !Object.hasOwn(legacyCron, "store") && !Object.hasOwn(legacyCron, "webhook")) return config;
	return {
		...config,
		cron: {
			...config.cron,
			...Object.hasOwn(legacyCron, "store") ? { store: legacyCron.store } : {},
			...Object.hasOwn(legacyCron, "webhook") ? { webhook: legacyCron.webhook } : {}
		}
	};
}
/** Isolates the trusted partition selector from a partially valid legacy config. */
function retainStoreConfig(config) {
	const cron = config?.cron;
	if (typeof cron?.store !== "string" || !cron.store.trim()) return;
	return { cron: {
		store: cron.store,
		...Object.hasOwn(cron, "webhook") ? { webhook: cron.webhook } : {}
	} };
}
//#endregion
//#region src/commands/doctor-update-run.ts
/** Report unfinished or failed update work during Doctor diagnostics. */
async function noteStaleUpdateRuns(options = {}) {
	const [{ staleUpdateRunGuidance }, { listUpdateRunsAsync }, { renderUpdateRunReport }, { updateRunWarningMessages }, { readInstalledUpdateCandidate, reconcileInterruptedUpdateRuns }, { isAcknowledgedAbandonedUpdateRun }] = await Promise.all([
		import("./update-run-activity-Wfhk_SwB.mjs"),
		import("./update-run-reader-NURial4T.mjs"),
		import("./update-run-report-BbmTTsre.mjs"),
		import("./update-run-step-BlBxK_Yb.mjs"),
		import("./update-run-interruption-BiU43nDG.mjs"),
		import("./update-run-record-INBQXGqI.mjs")
	]);
	if (options.migrateState !== false) try {
		for (const run of await reconcileInterruptedUpdateRuns()) note(`Update ${run.runId}: recorded succeeded after verifying the installed and serving candidate build ${run.after.buildId}; its updater exited before recording completion.`, "Update history");
	} catch (error) {
		note(`Update history reconciliation could not complete: ${String(error)}`, "Update history");
	}
	for (const run of await listUpdateRunsAsync({
		active: true,
		limit: 100
	})) {
		const guidance = staleUpdateRunGuidance(run);
		if (guidance) note(`Update ${run.runId}: ${guidance}`, "Update history");
	}
	const history = await listUpdateRunsAsync({ limit: 100 });
	for (const run of history) if (run.status === "failed" && run.reason === "abandoned" && !isAcknowledgedAbandonedUpdateRun(run)) {
		const reason = readInstalledUpdateCandidate(run) ? "the recorded candidate has not been verified as installed and serving" : "the target build was not recorded, so current version equality cannot prove this update completed";
		note(`Update ${run.runId} remains abandoned: ${reason}. Run \`openclaw update repair\` to repair the installation and reconcile its history.`, "Update history");
	}
	const [latest] = history;
	if (latest) {
		if (latest.status === "failed" && latest.reason && (latest.reason === "update-activation-timeout" || UPDATE_ENVIRONMENT_FAILURE_REASONS.has(latest.reason))) note(`Update ${latest.runId}: ${renderUpdateRunReport(latest).markdown}`, "Update history");
		const resolvedWarnings = await readResolvedDeferredPluginMigrationWarnings(latest.steps.map((step) => step.detail));
		const warnings = updateRunWarningMessages(latest.steps.filter((step) => {
			const completedAtMs = step.detail ? resolvedWarnings.get(step.detail) : void 0;
			return completedAtMs === void 0 || completedAtMs < (step.endedAtMs ?? latest.finishedAtMs ?? latest.createdAtMs);
		}));
		if (warnings.length) note(`Recorded warnings from update ${latest.runId} (a later repair may have resolved them):\n${warnings.slice(-3).join("\n")}`, "Update history");
	}
}
//#endregion
//#region src/commands/doctor/shared/legacy-config-state-migration-input.ts
function resolveStateMigrationConfigInput(params) {
	const pluginDoctorConfig = params.snapshot.sourceConfig ?? params.snapshot.config ?? params.snapshot.parsed;
	if (params.postConvergenceConfig) return {
		cfg: params.postConvergenceConfig,
		...pluginDoctorConfig ? { pluginDoctorConfig } : {}
	};
	if (params.snapshot.valid) return params.snapshot.legacyIssues.length > 0 && pluginDoctorConfig !== void 0 ? {
		cfg: params.baseConfig,
		pluginDoctorConfig
	} : { cfg: params.baseConfig };
	const migrationSource = pluginDoctorConfig ?? params.snapshot.parsed;
	if (params.snapshot.legacyIssues.length === 0 || migrationSource === void 0) return null;
	const migrated = migrateLegacyConfig(migrationSource, { sourceConfigBeforeMigrations: params.snapshot.sourceConfigBeforeMigrations });
	if (!migrated.config || migrated.partiallyValid) return { pluginDoctorConfig: pluginDoctorConfig ?? migrationSource };
	return {
		cfg: migrated.config,
		...pluginDoctorConfig ? { pluginDoctorConfig } : {}
	};
}
//#endregion
//#region src/commands/doctor-config-preflight.ts
/** Config preflight for Doctor: legacy migration, recovery, and snapshot loading. */
const loadState = createLazyRuntimeModule(() => import("./state-migrations.state-dir-DDhgAaEN.mjs"));
const loadCronRepair = createLazyRuntimeModule(() => import("./legacy-repair-BGlwl-yp.mjs"));
/** Preserve retired state inputs before the main Doctor config repair flow. */
async function runDoctorConfigPreflight(options = {}) {
	return await withDoctorConfigPreflightWorkerScope(options, runDoctorConfigPreflightOperation);
}
async function runDoctorConfigPreflightOperation(options) {
	const stateMigrationsRequested = options.migrateState !== false;
	const skipLegacyParentConfigWrite = shouldSkipLegacyUpdateDoctorConfigWrite(process.env);
	if (stateMigrationsRequested) await assertOpenClawStateWriteAllowedAtPath({
		databasePath: resolveOpenClawStateSqlitePath(process.env),
		env: process.env,
		recoverOrphanedSidecars: true
	});
	await noteStaleUpdateRuns({ migrateState: stateMigrationsRequested });
	const measurePreflightStep = (name, run) => measureDoctorConfigPreflightStep(name, run, options.measure);
	let modelBillingRouteMigrationSource;
	const cronCodexRuntimePolicyTargets = [];
	const stateMigrationStepReceipts = [];
	let postSessionPluginMigration;
	let postSessionPluginMigrationPlanBound = false;
	let doctorMediaPersistenceAttempted = false;
	let configSnapshotRead;
	let pluginInstallConfigImport;
	const pluginMigrations = createDoctorPluginMigrationPreparation({
		enabled: stateMigrationsRequested,
		env: () => process.env,
		report: (result) => noteDoctorStateMigrationResult(result),
		recordReceipt: (receipt) => stateMigrationStepReceipts.push(receipt),
		measure: measurePreflightStep,
		runWithPluginMetadataSnapshot: (scope, run) => pluginMetadata.run(scope, run),
		doctorOnlyStateMigrations: options.doctorOnlyStateMigrations === true
	});
	const hasPendingPluginInstallConfig = (snapshot) => !skipLegacyParentConfigWrite && inspectShippedPluginInstallConfigRecords(snapshot.sourceConfig).status === "valid";
	const pluginMetadata = createDoctorPluginMetadataSnapshotScope({
		getBaseSnapshot: () => configSnapshotRead?.pluginMetadataSnapshot,
		env: process.env,
		getDeferredPluginIds: () => pluginMigrations.deferred().map((pending) => pending.pluginId)
	});
	const noteDoctorStateMigrationResult = (result) => {
		pluginMigrations.observe(result);
		noteStateMigrationResult(result);
	};
	const getSnapshotPreparation = createDoctorRehearsalSnapshotPreparation(noteDoctorStateMigrationResult);
	const { planScopedConfigRepair, planAdmittedConfigRepair } = createDoctorConfigRepairPlanner({
		options,
		stateMigrationsRequested,
		skipLegacyParentConfigWrite,
		hasImportedPluginConfig: () => pluginInstallConfigImport !== void 0,
		runWithPluginMetadataSnapshot: pluginMetadata.run
	});
	const readConfigSnapshotForPreflight = async (allowCurrentPluginMetadata = true) => await measurePreflightStep("config-snapshot", async () => readConfigPreflightSnapshot({
		allowCurrentPluginMetadata,
		includePluginMetadata: options.preparePluginMetadataSnapshot === true,
		measure: options.measure,
		observe: options.observe,
		preparePluginMetadataSnapshot: options.preparePluginMetadataSnapshot === true,
		skipPluginValidation: shouldSkipPluginValidationForDoctorConfigPreflight(),
		prepareSnapshot: getSnapshotPreparation(options.doctorOnlyStateMigrations === true),
		...await pluginMigrations.snapshotOptions()
	}));
	const stateDirMigrations = stateMigrationsRequested ? await measurePreflightStep("state-migrations-import", loadState) : void 0;
	if (stateDirMigrations) noteDoctorStateMigrationResult(await measurePreflightStep("state-dir-migrations", () => stateDirMigrations.autoMigrateLegacyStateDir({ env: process.env })));
	await migrateLegacyDoctorConfig({
		enabled: options.migrateLegacyConfig !== false,
		measure: measurePreflightStep
	});
	configSnapshotRead = await readConfigSnapshotForPreflight(!stateDirMigrations);
	const recovery = await prepareDoctorConfigRecovery({
		enabled: options.repairPrefixedConfig === true && !skipLegacyParentConfigWrite,
		snapshotRead: configSnapshotRead,
		planRepair: planScopedConfigRepair,
		readSnapshot: () => readConfigSnapshotForPreflight(false)
	});
	configSnapshotRead = recovery.snapshotRead;
	let snapshot = configSnapshotRead.snapshot;
	const activeConfigRepair = recovery.activeConfigRepair;
	noteDoctorConfigPreflightIssues(snapshot, {
		invalidConfigNote: options.invalidConfigNote,
		activeRepair: activeConfigRepair !== null
	});
	let baseConfig = snapshot.sourceConfig ?? snapshot.config ?? {};
	let automaticConfigRepair = planAdmittedConfigRepair(snapshot, activeConfigRepair);
	if (options.doctorOnlyStateMigrations === true && stateDirMigrations) {
		const { prepareLegacyStateDatabaseSchema } = await import("./state-migrations.doctor-BPAuuZrE.mjs");
		const receipt = await measurePreflightStep("state-schema", () => prepareLegacyStateDatabaseSchema(process.env));
		if (receipt.outcome !== "skipped") {
			stateMigrationStepReceipts.push(receipt);
			noteDoctorStateMigrationResult({
				changes: receipt.changes,
				warnings: receipt.warnings,
				notices: receipt.notices
			});
			throwIfDoctorStateMigrationRefused(stateMigrationStepReceipts);
		}
	}
	if (automaticConfigRepair && hasPendingPluginInstallConfig(snapshot)) {
		pluginInstallConfigImport = await importAutomaticConfigRepairInstallRecords(snapshot);
		configSnapshotRead = await readConfigSnapshotForPreflight(false);
		snapshot = configSnapshotRead.snapshot;
		assertShippedPluginInstallConfigImportCurrent(snapshot, pluginInstallConfigImport);
		baseConfig = snapshot.sourceConfig ?? snapshot.config ?? {};
		automaticConfigRepair = planAdmittedConfigRepair(snapshot);
		if (!automaticConfigRepair) throw new Error("Config changed after plugin install migration; rerun Doctor.");
	}
	let postConvergenceStateConfig;
	if (stateDirMigrations) {
		const refreshed = await prepareDoctorMigrationPlugins({
			cfg: automaticConfigRepair?.config ?? baseConfig,
			env: process.env,
			measure: options.measure,
			snapshotRead: {
				...configSnapshotRead,
				snapshot
			},
			readRefreshedSnapshot: () => readConfigSnapshotForPreflight(false),
			onDeferredPlugins: (pending, inspection) => pluginMigrations.converged(pending, snapshot, configSnapshotRead?.pluginMetadataSnapshot, inspection)
		});
		configSnapshotRead = refreshed;
		pluginMetadata.invalidate();
		snapshot = refreshed.snapshot;
		baseConfig = snapshot.sourceConfig ?? snapshot.config ?? {};
		automaticConfigRepair = planAdmittedConfigRepair(snapshot);
		postConvergenceStateConfig = automaticConfigRepair?.snapshot.config;
	}
	const stateMigrationInput = resolveStateMigrationConfigInput({
		snapshot,
		baseConfig,
		postConvergenceConfig: postConvergenceStateConfig
	});
	if (stateDirMigrations) {
		if (options.doctorOnlyStateMigrations === true && !stateMigrationInput?.cfg) {
			const { detectLegacyExecApprovals, migrateLegacyExecApprovals } = await import("./state-migrations.exec-approvals-DZv7pwSt.mjs");
			const stateDir = resolveStateDir(process.env);
			noteDoctorStateMigrationResult(await measurePreflightStep("exec-approvals-migration", () => migrateLegacyExecApprovals({
				detected: detectLegacyExecApprovals({
					stateDir,
					doctorOnlyStateMigrations: true
				}),
				stateDir,
				env: process.env
			})));
		}
		if (stateMigrationInput) {
			if (stateMigrationInput.cfg) {
				const { autoMigrateLegacyState } = await import("./state-migrations.doctor-BPAuuZrE.mjs");
				const migrationConfig = stateMigrationInput.cfg;
				const pluginDoctorConfig = stateMigrationInput.pluginDoctorConfig;
				const { collectCronCodexRuntimePolicyTargetsReadOnly, repairLegacyCronStoreWithoutPrompt } = await measurePreflightStep("cron-repair-import", loadCronRepair);
				noteDoctorStateMigrationResult(await measurePreflightStep("cron-repair", () => repairLegacyCronStoreWithoutPrompt({
					cfg: withLegacyConfig(migrationConfig, pluginDoctorConfig),
					migrateCodexModelRefs: false
				})));
				if (options.repairPrefixedConfig === true) {
					const cronCodexPlan = await measurePreflightStep("cron-policy-scan", () => collectCronCodexRuntimePolicyTargetsReadOnly({ cfg: migrationConfig }));
					cronCodexRuntimePolicyTargets.push(...cronCodexPlan.targets);
					noteDoctorStateMigrationResult({
						changes: [],
						warnings: cronCodexPlan.warnings
					});
				}
				const legacyStateResult = await measurePreflightStep("legacy-state-migrations", () => pluginMetadata.run({ config: pluginDoctorConfig ?? migrationConfig }, () => autoMigrateLegacyState({
					cfg: migrationConfig,
					...pluginDoctorConfig ? { pluginDoctorConfig } : {},
					configIncludedPaths: snapshot.includedPaths ?? [],
					env: process.env,
					recoverCorruptTargetStore: options.recoverCorruptTargetStore,
					doctorOnlyStateMigrations: options.doctorOnlyStateMigrations,
					invocationPurpose: options.invocationPurpose,
					...options.agentDatabaseMigrationDiscovery ? { agentDatabaseMigrationDiscovery: options.agentDatabaseMigrationDiscovery } : {},
					beforeWorkspaceStateMigration: options.beforeWorkspaceStateMigration,
					onStepReceipt: (receipt) => stateMigrationStepReceipts.push(receipt)
				})));
				postSessionPluginMigration = legacyStateResult.postSessionPluginMigration;
				postSessionPluginMigrationPlanBound = options.doctorOnlyStateMigrations === true;
				doctorMediaPersistenceAttempted = options.doctorOnlyStateMigrations === true;
				noteDoctorStateMigrationResult(legacyStateResult);
				if (options.doctorOnlyStateMigrations === true) await assertDoctorPreflightMigrationsComplete({
					cfg: migrationConfig,
					stepReceipts: stateMigrationStepReceipts,
					report: noteDoctorStateMigrationResult
				});
			} else if (stateMigrationInput.pluginDoctorConfig) {
				const pluginDoctorConfig = stateMigrationInput.pluginDoctorConfig;
				await migrateRetainedStore({
					config: pluginDoctorConfig,
					env: process.env,
					measure: measurePreflightStep,
					report: noteDoctorStateMigrationResult
				});
				await pluginMigrations.migrate(pluginDoctorConfig);
			}
		}
	}
	if (stateDirMigrations && options.doctorOnlyStateMigrations === true && !doctorMediaPersistenceAttempted) {
		const { migrateLegacyMediaPersistence } = await import("./state-migrations.media-persistence-D0BwU0dV.mjs");
		noteDoctorStateMigrationResult(await measurePreflightStep("media-persistence-migration", () => migrateLegacyMediaPersistence({ env: process.env })));
	}
	if (await pluginMigrations.complete()) {
		configSnapshotRead = await readConfigSnapshotForPreflight(false);
		snapshot = configSnapshotRead.snapshot;
		baseConfig = snapshot.sourceConfig ?? snapshot.config ?? {};
		automaticConfigRepair = planAdmittedConfigRepair(snapshot);
	}
	if (automaticConfigRepair && !skipLegacyParentConfigWrite) {
		modelBillingRouteMigrationSource ??= snapshot.sourceConfigBeforeMigrations ?? snapshot.sourceConfig;
		await measurePreflightStep("automatic-config-repair", () => pluginInstallConfigImport ? commitAutomaticConfigRepair(automaticConfigRepair, snapshot, pluginInstallConfigImport) : pluginMetadata.run({ config: automaticConfigRepair.config }, () => commitAutomaticConfigRepair(automaticConfigRepair, snapshot)));
		note(`Migrated legacy config keys in the active openclaw.json:\n${automaticConfigRepair.changes.map((entry) => `- ${entry}`).join("\n")}`, "Doctor changes");
		configSnapshotRead = await readConfigSnapshotForPreflight(false);
		snapshot = configSnapshotRead.snapshot;
		baseConfig = snapshot.sourceConfig ?? snapshot.config ?? {};
	}
	const deferredPluginMigrations = pluginMigrations.deferred();
	return {
		snapshot,
		baseConfig,
		...deferredPluginMigrations.length > 0 ? { deferredPluginMigrations } : {},
		...modelBillingRouteMigrationSource ? { modelBillingRouteMigrationSource } : {},
		...configSnapshotRead.pluginMetadataSnapshot ? { pluginMetadataSnapshot: configSnapshotRead.pluginMetadataSnapshot } : {},
		...cronCodexRuntimePolicyTargets.length > 0 ? { cronCodexRuntimePolicyTargets } : {},
		...stateMigrationStepReceipts.length > 0 ? { stateMigrationStepReceipts } : {},
		...postSessionPluginMigration ? { postSessionPluginMigration } : {},
		...postSessionPluginMigrationPlanBound ? { postSessionPluginMigrationPlanBound: true } : {}
	};
}
//#endregion
//#region src/commands/doctor/changes-panel-sink.ts
function createDoctorChangesPanelSink(shouldRepair) {
	const pending = [];
	return {
		emit: (changeLines, options = {}) => {
			if (changeLines.length === 0) return;
			const body = changeLines.join("\n");
			const message = options.sanitize ? sanitizeDoctorNote(body) : body;
			if (shouldRepair) {
				pending.push(message);
				return;
			}
			note(message, "Doctor changes preview");
		},
		drain: () => pending.splice(0)
	};
}
//#endregion
//#region src/commands/doctor/finalize-config-flow.ts
/** Decide whether doctor should write the repaired candidate config or only print hints. */
async function finalizeDoctorConfigFlow(params) {
	const confirmedConfigSource = {
		path: params.snapshot.path,
		hash: params.snapshot.hash ?? hashConfigRaw(params.snapshot.raw)
	};
	let cfg = params.cfg;
	let shouldWriteConfig = params.shouldRepair && params.pendingChanges;
	if (!params.shouldRepair && params.pendingChanges) {
		shouldWriteConfig = await params.confirm({
			message: "Apply recommended config repairs now?",
			initialValue: true
		});
		if (shouldWriteConfig) cfg = params.candidate;
		else if (params.fixHints.length > 0) params.note(params.fixHints.join("\n"), "Doctor");
	}
	return {
		cfg,
		shouldWriteConfig,
		confirmedConfigSource
	};
}
//#endregion
//#region src/commands/doctor/shared/config-migration-result.ts
/** Preserve migration provenance before repairs, then prepare the post-write health handoff. */
function prepareDoctorConfigMigrationResult(preflight, snapshot) {
	const sourceVersion = snapshot.sourceConfig.meta?.lastTouchedVersion;
	const sourceLastTouchedVersion = typeof sourceVersion === "string" ? sourceVersion : void 0;
	const billingRouteSource = preflight.modelBillingRouteMigrationSource ?? snapshot.sourceConfigBeforeMigrations ?? snapshot.sourceConfig;
	return async (params) => {
		let modelBillingRouteWarnings = [];
		if ((params.shouldWriteConfig || preflight.modelBillingRouteMigrationSource) && (!isDeepStrictEqual(billingRouteSource.agents, params.cfg.agents) || !isDeepStrictEqual(billingRouteSource.models, params.cfg.models))) {
			const { collectModelBillingRouteMigrationWarnings } = await import("./model-billing-route-migration-wvmVEv45.mjs");
			modelBillingRouteWarnings = params.runWithCurrentPluginMetadata(params.cfg, () => collectModelBillingRouteMigrationWarnings({
				before: billingRouteSource,
				after: params.cfg,
				metadataSnapshot: params.metadataSnapshot
			}));
		}
		let receipts = preflight.stateMigrationStepReceipts;
		let postSession = preflight.postSessionPluginMigration;
		const planBound = preflight.postSessionPluginMigrationPlanBound;
		if (planBound && params.pluginInventoryChanged && postSession) {
			const { preparePostSessionPluginMigration } = await import("./state-migrations.plugin-plan-BOk6qV7D.mjs");
			const { resolveLivePluginDoctorStateMigrationInventory } = await import("./doctor-contract-registry-1ApASHUH.mjs");
			postSession = params.runWithCurrentPluginMetadata(params.cfg, () => preparePostSessionPluginMigration({
				mode: "doctor",
				inventory: resolveLivePluginDoctorStateMigrationInventory({
					config: params.cfg,
					env: process.env
				})
			}));
			if (postSession.step.refusal) {
				const { createLegacyStateMigrationStepReceipt } = await import("./state-migrations.messages-CZL2DT2J.mjs");
				receipts = [...receipts ?? [], createLegacyStateMigrationStepReceipt(postSession.step, {
					changes: [],
					warnings: [postSession.step.refusal.message]
				})];
				postSession = void 0;
			}
		}
		return {
			...sourceLastTouchedVersion ? { sourceLastTouchedVersion } : {},
			...modelBillingRouteWarnings.length > 0 ? { modelBillingRouteWarnings } : {},
			...params.metadataSnapshot ? { pluginMetadataSnapshot: params.metadataSnapshot } : {},
			...receipts ? { stateMigrationStepReceipts: receipts } : {},
			...postSession ? { postSessionPluginMigration: postSession } : {},
			...planBound ? { postSessionPluginMigrationPlanBound: true } : {}
		};
	};
}
//#endregion
//#region src/secrets/legacy-secretref-env-marker.ts
/**
* Converts parseable legacy env marker strings into structured env SecretRef objects.
*/
function migrateLegacySecretRefEnvMarkers(config) {
	const candidates = discoverConfigSecretTargets(config).flatMap((target) => {
		if (!isLegacySecretRefEnvMarker(target.value)) return [];
		const ref = parseLegacySecretRefEnvMarker(target.value, config.secrets?.defaults?.env);
		return ref ? [{
			path: target.path,
			pathSegments: target.pathSegments,
			value: target.value.trim(),
			ref
		}] : [];
	});
	if (candidates.length === 0) return {
		config,
		changes: []
	};
	const next = structuredClone(config);
	const changes = [];
	for (const candidate of candidates) if (setPathExistingStrict(next, candidate.pathSegments, candidate.ref)) changes.push(`Moved ${candidate.path} ${candidate.value} marker → structured env SecretRef.`);
	return {
		config: next,
		changes
	};
}
//#endregion
//#region src/channels/plugins/setup-promotion-discovery.ts
function resolveDiscoveredChannelSetupPromotionSurface(channelKey, cfg) {
	const registry = loadPluginManifestRegistryForPluginRegistry({
		config: cfg,
		includeDisabled: true
	});
	if (registry.plugins.some((plugin) => plugin.channels.includes(channelKey) && plugin.packageManifest?.setupFeatures?.configPromotion === "preserve-root")) return { configPromotion: "preserve-root" };
	if (getOfficialExternalPluginCatalogManifest(getOfficialExternalPluginCatalogEntry(channelKey) ?? {})?.setupFeatures?.configPromotion === "preserve-root") return { configPromotion: "preserve-root" };
	const owner = registry.plugins.find((plugin) => plugin.channels.includes(channelKey) && plugin.packageManifest?.setupFeatures?.configPromotion === true);
	if (!owner) return null;
	const { plugin } = loadSetupChannelPluginFromManifestRecord({
		record: owner,
		channelId: channelKey,
		env: process.env
	});
	const setup = plugin?.setupContract ?? plugin?.setup;
	return setup && typeof setup === "object" ? setup : null;
}
//#endregion
//#region src/commands/doctor/shared/legacy-talk-config-normalizer.ts
function buildLegacyRealtimeTalkCompat(talk, normalizedTalk) {
	if (talk.realtime !== void 0) return;
	const compat = {};
	for (const key of [
		"model",
		"mode",
		"transport",
		"brain"
	]) if (talk[key] !== void 0) compat[key] = talk[key];
	if (talk.voice !== void 0) compat.speakerVoice = talk.voice;
	if (Object.keys(compat).length === 0) return;
	if (normalizedTalk.provider !== void 0) compat.provider = normalizedTalk.provider;
	if (normalizedTalk.providers !== void 0) compat.providers = normalizedTalk.providers;
	return normalizeTalkSection({ realtime: compat })?.realtime;
}
/** Normalize Talk provider shape and move only core-owned legacy realtime fields. */
function normalizeLegacyTalkConfig(cfg, changes) {
	const rawTalk = cfg.talk;
	if (!isRecord(rawTalk)) return cfg;
	const normalizedTalk = normalizeTalkSection(rawTalk) ?? {};
	for (const key of [
		"voiceId",
		"voiceAliases",
		"modelId",
		"outputFormat",
		"apiKey"
	]) if (rawTalk[key] !== void 0) normalizedTalk[key] = rawTalk[key];
	const legacyRealtimeCompat = buildLegacyRealtimeTalkCompat(rawTalk, normalizedTalk);
	if (legacyRealtimeCompat) normalizedTalk.realtime = legacyRealtimeCompat;
	if (Object.keys(normalizedTalk).length === 0 || isDeepStrictEqual(normalizedTalk, rawTalk)) return cfg;
	changes.push("Normalized talk.provider/providers shape (trimmed provider ids and merged missing compatibility fields).");
	if (legacyRealtimeCompat) changes.push("Moved legacy realtime Talk provider/model fields into talk.realtime.");
	return {
		...cfg,
		talk: normalizedTalk
	};
}
//#endregion
//#region src/commands/doctor/shared/legacy-config-core-normalizers.ts
const INHERITED_ACCOUNT_POLICY_KEYS = [
	"dmPolicy",
	"allowFrom",
	"groupPolicy",
	"groupAllowFrom"
];
const log = createSubsystemLogger("doctor");
/** Migrate legacy browser/Chrome relay config to current browser profile settings. */
function normalizeLegacyBrowserConfig(cfg, changes) {
	const rawBrowser = cfg.browser;
	if (!isRecord(rawBrowser)) return cfg;
	const browser = structuredClone(rawBrowser);
	let browserChanged = false;
	if ("relayBindHost" in browser) {
		delete browser.relayBindHost;
		browserChanged = true;
		changes.push("Removed browser.relayBindHost (legacy Chrome extension relay setting; the extension relay binds loopback on the profile cdpPort).");
	}
	const rawProfiles = browser.profiles;
	if (isRecord(rawProfiles)) {
		const profiles = { ...rawProfiles };
		let profilesChanged = false;
		for (const [profileName, rawProfile] of Object.entries(rawProfiles)) {
			if (!isRecord(rawProfile)) continue;
			if ((normalizeOptionalString(rawProfile.driver) ?? "") !== "extension" || !normalizeOptionalString(rawProfile.cdpUrl)) continue;
			const nextProfile = { ...rawProfile };
			delete nextProfile.cdpUrl;
			profiles[profileName] = nextProfile;
			profilesChanged = true;
			changes.push(`Removed browser.profiles.${profileName}.cdpUrl (extension driver profiles own their relay endpoint).`);
		}
		if (profilesChanged) {
			browser.profiles = profiles;
			browserChanged = true;
		}
	}
	const rawSsrFPolicy = browser.ssrfPolicy;
	if (isRecord(rawSsrFPolicy) && "allowPrivateNetwork" in rawSsrFPolicy) {
		const legacyAllowPrivateNetwork = rawSsrFPolicy.allowPrivateNetwork;
		const currentDangerousAllowPrivateNetwork = rawSsrFPolicy.dangerouslyAllowPrivateNetwork;
		let resolvedDangerousAllowPrivateNetwork = currentDangerousAllowPrivateNetwork;
		if (typeof legacyAllowPrivateNetwork === "boolean" || typeof currentDangerousAllowPrivateNetwork === "boolean") resolvedDangerousAllowPrivateNetwork = legacyAllowPrivateNetwork === true || currentDangerousAllowPrivateNetwork === true;
		else if (currentDangerousAllowPrivateNetwork === void 0) resolvedDangerousAllowPrivateNetwork = legacyAllowPrivateNetwork;
		const nextSsrFPolicy = { ...rawSsrFPolicy };
		delete nextSsrFPolicy.allowPrivateNetwork;
		if (resolvedDangerousAllowPrivateNetwork !== void 0) nextSsrFPolicy.dangerouslyAllowPrivateNetwork = resolvedDangerousAllowPrivateNetwork;
		browser.ssrfPolicy = nextSsrFPolicy;
		browserChanged = true;
		changes.push(`Moved browser.ssrfPolicy.allowPrivateNetwork → browser.ssrfPolicy.dangerouslyAllowPrivateNetwork (${String(resolvedDangerousAllowPrivateNetwork)}).`);
	}
	if (!browserChanged) return cfg;
	return {
		...cfg,
		browser
	};
}
/** Move single-account channel fields into accounts.default when account maps exist. */
function seedMissingDefaultAccountsFromSingleAccountBase(cfg, changes) {
	const channels = cfg.channels;
	if (!channels) return cfg;
	let channelsChanged = false;
	const nextChannels = { ...channels };
	for (const [channelId, rawChannel] of Object.entries(channels)) {
		if (!isRecord(rawChannel)) continue;
		const rawAccounts = rawChannel.accounts;
		if (!isRecord(rawAccounts)) continue;
		const accountKeys = Object.keys(rawAccounts);
		if (accountKeys.length === 0) continue;
		if (accountKeys.some((key) => normalizeOptionalLowercaseString(key) === "default")) continue;
		const promotion = resolveSingleAccountPromotion({
			channelKey: channelId,
			channel: rawChannel,
			resolveBundledSurface: (key) => resolveDiscoveredChannelSetupPromotionSurface(key, cfg)
		});
		if (promotion.kind === "preserve-root") continue;
		if (promotion.shouldDeferPromotion) {
			log.debug(`Deferring channels.${channelId} single-account promotion until its plugin declares uncovered root keys.`);
			continue;
		}
		const keysToMove = promotion.keysToMove;
		if (keysToMove.length === 0) continue;
		const defaultAccount = {};
		for (const key of keysToMove) {
			const value = rawChannel[key];
			defaultAccount[key] = value && typeof value === "object" ? structuredClone(value) : value;
		}
		const nextChannel = { ...rawChannel };
		for (const key of keysToMove) delete nextChannel[key];
		const inheritedPolicyKeys = INHERITED_ACCOUNT_POLICY_KEYS.filter((key) => keysToMove.includes(key));
		const nextAccounts = {
			...rawAccounts,
			[DEFAULT_ACCOUNT_ID]: defaultAccount
		};
		if (inheritedPolicyKeys.length > 0) for (const [accountId, rawAccount] of Object.entries(rawAccounts)) {
			if (!isRecord(rawAccount)) continue;
			const nextAccount = { ...rawAccount };
			let accountChanged = false;
			for (const key of inheritedPolicyKeys) {
				if (Object.hasOwn(nextAccount, key)) continue;
				const value = rawChannel[key];
				nextAccount[key] = value && typeof value === "object" ? structuredClone(value) : value;
				accountChanged = true;
			}
			if (accountChanged) nextAccounts[accountId] = nextAccount;
		}
		nextChannel.accounts = nextAccounts;
		nextChannels[channelId] = nextChannel;
		channelsChanged = true;
		changes.push(`Moved channels.${channelId} single-account top-level values into channels.${channelId}.accounts.default.`);
	}
	if (!channelsChanged) return cfg;
	return {
		...cfg,
		channels: nextChannels
	};
}
const LEGACY_CODEX_CLI_RUNTIME_ID = "codex-cli";
const CODEX_APP_SERVER_RUNTIME_ID = "codex";
function migrateUnblockedLegacyRuntimeModelRef(modelRef, blockedModelIdentities) {
	return isBlockedLegacyCodexModelRef({
		modelRef,
		blockedModelIdentities
	}) ? null : migrateLegacyRuntimeModelRef(modelRef);
}
function mergeModelEntry(legacyEntry, currentEntry) {
	if (!isRecord(legacyEntry) || !isRecord(currentEntry)) return currentEntry ?? legacyEntry;
	return mergeModelRefMapEntries(currentEntry, legacyEntry, "models").value;
}
function normalizeLegacyCodexCliAgentRuntimePolicy(raw) {
	if (!isRecord(raw)) return {
		value: raw,
		changed: false
	};
	if (normalizeOptionalLowercaseString(raw.id) !== LEGACY_CODEX_CLI_RUNTIME_ID) return {
		value: raw,
		changed: false
	};
	return {
		value: {
			...raw,
			id: CODEX_APP_SERVER_RUNTIME_ID
		},
		changed: true
	};
}
function normalizeLegacyRuntimeAgentModelConfig(raw, blockedModelIdentities) {
	if (typeof raw === "string") {
		const migrated = migrateUnblockedLegacyRuntimeModelRef(raw, blockedModelIdentities);
		return migrated ? {
			value: migrated.ref,
			changed: true,
			selectedRuntime: migrated.runtime,
			selectedRefs: [{
				ref: migrated.ref,
				runtime: migrated.runtime
			}]
		} : {
			value: raw,
			changed: false,
			selectedRefs: []
		};
	}
	if (!isRecord(raw)) return {
		value: raw,
		changed: false,
		selectedRefs: []
	};
	const migratedPrimary = typeof raw.primary === "string" ? migrateUnblockedLegacyRuntimeModelRef(raw.primary, blockedModelIdentities) : null;
	let changed = false;
	const next = { ...raw };
	const selectedRefs = [];
	let selectedRuntime = migratedPrimary?.runtime;
	if (migratedPrimary) {
		next.primary = migratedPrimary.ref;
		selectedRefs.push({
			ref: migratedPrimary.ref,
			runtime: migratedPrimary.runtime
		});
		changed = true;
	}
	if (Array.isArray(raw.fallbacks)) next.fallbacks = raw.fallbacks.map((fallback) => {
		if (typeof fallback !== "string") return fallback;
		const migratedFallback = migrateUnblockedLegacyRuntimeModelRef(fallback, blockedModelIdentities);
		if (migratedFallback) {
			selectedRuntime ??= migratedFallback.runtime;
			selectedRefs.push({
				ref: migratedFallback.ref,
				runtime: migratedFallback.runtime
			});
			changed = true;
			return migratedFallback.ref;
		}
		return fallback;
	});
	if (!changed) return {
		value: raw,
		changed: false,
		selectedRefs: []
	};
	return {
		value: next,
		changed: true,
		selectedRuntime,
		selectedRefs
	};
}
function normalizeLegacyRuntimeAllowlistModels(rawModels, blockedModelIdentities) {
	if (!isRecord(rawModels)) return {
		value: rawModels,
		changed: false
	};
	let changed = false;
	const next = {};
	const legacyEntries = [];
	for (const [rawKey, entry] of Object.entries(rawModels)) {
		const migrated = migrateUnblockedLegacyRuntimeModelRef(rawKey, blockedModelIdentities);
		if (migrated) {
			changed = true;
			legacyEntries.push({
				migratedKey: migrated.ref,
				entry,
				runtime: migrated.runtime
			});
			continue;
		}
		next[rawKey] = mergeModelEntry(entry, next[rawKey]);
	}
	for (const { migratedKey, entry, runtime } of legacyEntries) next[migratedKey] = modelEntryWithRuntimePolicy(mergeModelEntry(entry, next[migratedKey]), runtime).entry;
	return {
		value: next,
		changed
	};
}
function normalizeLegacyRuntimeModelPolicy(rawPolicy, blockedModelIdentities) {
	if (!isRecord(rawPolicy) || !Array.isArray(rawPolicy.allow)) return {
		value: rawPolicy,
		runtimes: /* @__PURE__ */ new Set(),
		selectedRefs: []
	};
	const runtimes = /* @__PURE__ */ new Set();
	const selectedRefs = [];
	const allow = rawPolicy.allow.map((entry) => {
		if (typeof entry !== "string") return entry;
		const migrated = migrateUnblockedLegacyRuntimeModelRef(entry, blockedModelIdentities);
		if (!migrated) return entry;
		runtimes.add(migrated.runtime);
		selectedRefs.push({
			ref: migrated.ref,
			runtime: migrated.runtime
		});
		return migrated.ref;
	});
	return {
		value: runtimes.size > 0 ? {
			...rawPolicy,
			allow
		} : rawPolicy,
		runtimes,
		selectedRefs
	};
}
function ensureSelectedModelRuntimePolicies(rawModels, selectedRefs) {
	if (selectedRefs.length === 0) return {
		value: rawModels,
		changed: false
	};
	const next = isRecord(rawModels) ? { ...rawModels } : {};
	let changed = false;
	for (const { ref, runtime } of selectedRefs) {
		const current = next[ref];
		const updated = modelEntryWithRuntimePolicy(current, runtime);
		if (!updated.changed) continue;
		next[ref] = updated.entry;
		changed = true;
	}
	return {
		value: next,
		changed
	};
}
function normalizeLegacyCodexCliRuntimePinsInModels(rawModels, path, changes) {
	if (!isRecord(rawModels)) return {
		value: rawModels,
		changed: false
	};
	let changed = false;
	const next = { ...rawModels };
	for (const [modelRef, rawEntry] of Object.entries(rawModels)) {
		if (!isRecord(rawEntry)) continue;
		const runtime = normalizeLegacyCodexCliAgentRuntimePolicy(rawEntry.agentRuntime);
		if (!runtime.changed) continue;
		next[modelRef] = {
			...rawEntry,
			agentRuntime: runtime.value
		};
		changed = true;
		changes.push(`Moved ${path}.${sanitizeForLog(modelRef)} agentRuntime.id from codex-cli to codex.`);
	}
	return {
		value: next,
		changed
	};
}
function normalizeLegacyRuntimeAgentContainer(raw, path, changes, blockedModelIdentities) {
	let changed = false;
	const next = { ...raw };
	const legacyWholeAgentRuntime = resolveLegacyCliRuntimeAlias(isRecord(raw.agentRuntime) ? raw.agentRuntime.id : void 0);
	const model = normalizeLegacyRuntimeAgentModelConfig(raw.model, blockedModelIdentities);
	if (model.changed) {
		next.model = model.value;
		changed = true;
		const runtimeSuffix = model.selectedRuntime ? ` and selected ${model.selectedRuntime} runtime` : "";
		changes.push(`Moved ${path}.model legacy runtime primary refs to canonical provider refs${runtimeSuffix}.`);
	}
	const modelPolicy = normalizeLegacyRuntimeModelPolicy(raw.modelPolicy, blockedModelIdentities);
	const models = normalizeLegacyRuntimeAllowlistModels(raw.models, blockedModelIdentities);
	if (models.changed) {
		next.models = models.value;
		changed = true;
		changes.push(`Moved ${path}.models legacy runtime keys to canonical provider keys.`);
	}
	const policyRuntimes = ensureSelectedModelRuntimePolicies(next.models, modelPolicy.selectedRefs);
	if (policyRuntimes.changed) {
		next.models = policyRuntimes.value;
		changed = true;
		changes.push(`Preserved runtime policy for ${path}.modelPolicy.allow entries.`);
	}
	if (model.selectedRuntime) {
		const modelRuntimes = ensureSelectedModelRuntimePolicies(next.models, model.selectedRefs);
		if (modelRuntimes.changed) {
			next.models = modelRuntimes.value;
			changed = true;
			changes.push(`Selected ${model.selectedRuntime} runtime for ${path}.models entries.`);
		}
	}
	for (const key of ["heartbeat", "subagents"]) {
		const execution = raw[key];
		if (!isRecord(execution)) continue;
		const selection = normalizeLegacyRuntimeAgentModelConfig(execution.model, blockedModelIdentities);
		if (!selection.changed) continue;
		next[key] = {
			...execution,
			model: selection.value
		};
		const runtimes = ensureSelectedModelRuntimePolicies(next.models, selection.selectedRefs);
		if (runtimes.changed) next.models = runtimes.value;
		changed = true;
		changes.push(`Moved ${path}.${key}.model to canonical refs with model runtime policy.`);
	}
	if (legacyWholeAgentRuntime) {
		const selectedRefs = selectedCanonicalModelRefsForRuntimePolicy(next.model ?? raw.model, legacyWholeAgentRuntime.provider).map((ref) => ({
			ref,
			runtime: legacyWholeAgentRuntime.runtime
		}));
		const modelRuntimes = ensureSelectedModelRuntimePolicies(next.models, selectedRefs);
		if (modelRuntimes.changed) {
			next.models = modelRuntimes.value;
			changed = true;
			changes.push(`Moved ${path}.agentRuntime.id ${legacyWholeAgentRuntime.runtime} to matching ${legacyWholeAgentRuntime.provider} model runtime policy.`);
		}
	}
	if (model.selectedRuntime && isRecord(raw.agentRuntime)) {
		delete next.agentRuntime;
		changed = true;
		changes.push(`Removed ${path}.agentRuntime; runtime is now model scoped.`);
	}
	if (modelPolicy.runtimes.size > 0) {
		next.modelPolicy = modelPolicy.value;
		changed = true;
		changes.push(`Moved ${path}.modelPolicy.allow legacy runtime refs to canonical provider refs.`);
	}
	const codexCliRuntimePins = normalizeLegacyCodexCliRuntimePinsInModels(next.models, `${path}.models`, changes);
	if (codexCliRuntimePins.changed) {
		next.models = codexCliRuntimePins.value;
		changed = true;
	}
	return {
		value: next,
		changed
	};
}
function normalizeLegacyCodexCliProviderRuntimePins(cfg, changes) {
	if (!isRecord(cfg.models)) return cfg;
	return normalizeModelProviders(cfg, (rawProvider, providerId) => {
		let providerChanged = false;
		const nextProvider = { ...rawProvider };
		const providerRuntime = normalizeLegacyCodexCliAgentRuntimePolicy(rawProvider.agentRuntime);
		if (providerRuntime.changed) {
			nextProvider.agentRuntime = providerRuntime.value;
			providerChanged = true;
			changes.push(`Moved models.providers.${sanitizeForLog(providerId)} agentRuntime.id from codex-cli to codex.`);
		}
		if (Array.isArray(rawProvider.models)) {
			const nextProviderModels = rawProvider.models.map((entry, index) => {
				if (!isRecord(entry)) return entry;
				const runtime = normalizeLegacyCodexCliAgentRuntimePolicy(entry.agentRuntime);
				if (!runtime.changed) return entry;
				providerChanged = true;
				const modelId = normalizeOptionalString(entry.id) ?? `[${index}]`;
				changes.push(`Moved models.providers.${sanitizeForLog(providerId)}.models.${sanitizeForLog(modelId)} agentRuntime.id from codex-cli to codex.`);
				return Object.assign({}, entry, { agentRuntime: runtime.value });
			});
			if (providerChanged) nextProvider.models = nextProviderModels;
		}
		return providerChanged ? nextProvider : rawProvider;
	});
}
/** Move legacy runtime-tagged model/provider refs onto current agentRuntime policy fields. */
function normalizeLegacyRuntimeModelRefs(cfg, changes, blockedModelIdentities) {
	const cfgWithProviders = normalizeLegacyCodexCliProviderRuntimePins(cfg, changes);
	const rewriteRemainingSlots = (config) => rewriteModelRefs(config, "config", changes, (modelRef) => {
		const migrated = migrateUnblockedLegacyRuntimeModelRef(modelRef, blockedModelIdentities);
		return migrated && (migrated.legacyProvider === "codex-cli" || migrated.legacyProvider === "claude-cli" || migrated.legacyProvider === "google-gemini-cli") ? migrated.ref : null;
	}).value;
	const rawAgents = cfgWithProviders.agents;
	if (!isRecord(rawAgents)) return rewriteRemainingSlots(cfgWithProviders);
	let changed = false;
	const nextAgents = { ...rawAgents };
	if (isRecord(rawAgents.defaults)) {
		const defaults = normalizeLegacyRuntimeAgentContainer(rawAgents.defaults, "agents.defaults", changes, blockedModelIdentities);
		if (defaults.changed) {
			nextAgents.defaults = defaults.value;
			changed = true;
		}
	}
	if (Array.isArray(rawAgents.list)) {
		const nextList = rawAgents.list.map((entry, index) => {
			if (!isRecord(entry)) return entry;
			const agentId = normalizeOptionalString(entry.id);
			const agent = normalizeLegacyRuntimeAgentContainer(entry, agentId ? `agents.list.${sanitizeForLog(agentId)}` : `agents.list[${index}]`, changes, blockedModelIdentities);
			if (agent.changed) {
				changed = true;
				return agent.value;
			}
			return entry;
		});
		if (changed) nextAgents.list = nextList;
	}
	if (isRecord(rawAgents.entries)) {
		let nextEntries;
		for (const [agentId, entry] of Object.entries(rawAgents.entries)) {
			if (!isRecord(entry)) continue;
			const agent = normalizeLegacyRuntimeAgentContainer(entry, `agents.entries.${sanitizeForLog(agentId)}`, changes, blockedModelIdentities);
			if (agent.changed) (nextEntries ??= { ...rawAgents.entries })[agentId] = agent.value;
		}
		if (nextEntries) {
			nextAgents.entries = nextEntries;
			changed = true;
		}
	}
	return rewriteRemainingSlots(changed ? {
		...cfgWithProviders,
		agents: nextAgents
	} : cfgWithProviders);
}
/** Add missing metadata source markers to legacy OpenAI Codex model catalog entries. */
function normalizeLegacyOpenAICodexModelsAddMetadata(cfg, changes) {
	if (!isRecord(cfg.models)) return cfg;
	return normalizeModelProviders(cfg, (rawProvider, providerId) => {
		if (normalizeProviderId(providerId) !== "openai-codex" || !Array.isArray(rawProvider.models)) return rawProvider;
		let changed = false;
		const models = Array.from(rawProvider.models, (model) => {
			if (!isRecord(model) || "metadataSource" in model || !isLegacyModelsAddCodexMetadataModel({
				provider: providerId,
				model
			})) return model;
			changed = true;
			const safeProviderId = sanitizeForLog(providerId);
			const safeModelId = sanitizeForLog(normalizeOptionalString(model.id) ?? "unknown");
			changes.push(`Marked models.providers.${safeProviderId}.models.${safeModelId} as /models add metadata so official OpenAI Codex metadata can override it.`);
			return Object.assign({}, model, { metadataSource: "models-add" });
		});
		return changed ? {
			...rawProvider,
			models
		} : rawProvider;
	});
}
function normalizeModelProviders(cfg, normalize) {
	const providers = cfg.models?.providers;
	if (!isRecord(providers)) return cfg;
	let nextProviders;
	for (const [providerId, provider] of Object.entries(providers)) {
		if (!isRecord(provider)) continue;
		const next = normalize(provider, providerId);
		if (next !== provider) (nextProviders ??= { ...providers })[providerId] = next;
	}
	return nextProviders ? {
		...cfg,
		models: {
			...cfg.models,
			providers: nextProviders
		}
	} : cfg;
}
/** Rename legacy OpenAI API identifiers to the current completion/chat API ids. */
function normalizeLegacyOpenAIModelProviderApi(cfg, changes) {
	if (!isRecord(cfg.models)) return cfg;
	return normalizeModelProviders(cfg, (rawProvider, providerId) => {
		let providerChanged = false;
		const nextProvider = { ...rawProvider };
		if (nextProvider.api === "openai") {
			nextProvider.api = "openai-completions";
			providerChanged = true;
			changes.push(`Moved models.providers.${sanitizeForLog(providerId)}.api "openai" → "openai-completions".`);
		}
		const rawProviderModels = rawProvider.models;
		if (Array.isArray(rawProviderModels)) {
			let modelsChanged = false;
			const nextModels = [];
			rawProviderModels.forEach((model, index) => {
				if (!isRecord(model) || model.api !== "openai") {
					nextModels.push(model);
					return;
				}
				modelsChanged = true;
				changes.push(`Moved models.providers.${sanitizeForLog(providerId)}.models[${index}].api "openai" → "openai-completions".`);
				nextModels.push({
					...model,
					api: "openai-completions"
				});
			});
			if (modelsChanged) {
				nextProvider.models = nextModels;
				providerChanged = true;
			}
		}
		return providerChanged ? nextProvider : rawProvider;
	});
}
/** Remove retired bundled nano-banana skill config after migrating image generation models. */
function normalizeLegacyNanoBananaSkill(cfg, changes) {
	const NANO_BANANA_SKILL_KEY = "nano-banana-pro";
	const NANO_BANANA_MODEL = "google/gemini-3-pro-image-preview";
	const rawSkills = cfg.skills;
	if (!isRecord(rawSkills)) return cfg;
	let next = cfg;
	let skillsChanged = false;
	const skills = structuredClone(rawSkills);
	if (Array.isArray(skills.allowBundled)) {
		const allowBundled = skills.allowBundled.filter((value) => typeof value !== "string" || value.trim() !== NANO_BANANA_SKILL_KEY);
		if (allowBundled.length !== skills.allowBundled.length) {
			if (allowBundled.length === 0) {
				delete skills.allowBundled;
				changes.push(`Removed skills.allowBundled entry for ${NANO_BANANA_SKILL_KEY}.`);
			} else {
				skills.allowBundled = allowBundled;
				changes.push(`Removed ${NANO_BANANA_SKILL_KEY} from skills.allowBundled.`);
			}
			skillsChanged = true;
		}
	}
	const rawEntries = skills.entries;
	if (!isRecord(rawEntries)) {
		if (!skillsChanged) return cfg;
		return {
			...cfg,
			skills
		};
	}
	const rawLegacyEntry = rawEntries[NANO_BANANA_SKILL_KEY];
	if (!isRecord(rawLegacyEntry)) {
		if (!skillsChanged) return cfg;
		return {
			...cfg,
			skills
		};
	}
	if (next.agents?.defaults?.mediaModels?.image === void 0) {
		next = {
			...next,
			agents: {
				...next.agents,
				defaults: {
					...next.agents?.defaults,
					mediaModels: {
						...next.agents?.defaults?.mediaModels,
						image: { primary: NANO_BANANA_MODEL }
					}
				}
			}
		};
		changes.push(`Moved skills.entries.${NANO_BANANA_SKILL_KEY} → agents.defaults.mediaModels.image.primary (${NANO_BANANA_MODEL}).`);
	}
	const legacyEnv = isRecord(rawLegacyEntry.env) ? rawLegacyEntry.env : void 0;
	const legacyEnvApiKey = normalizeOptionalString(legacyEnv?.GEMINI_API_KEY) ?? "";
	const legacyApiKey = legacyEnvApiKey || (typeof rawLegacyEntry.apiKey === "string" ? normalizeOptionalString(rawLegacyEntry.apiKey) : rawLegacyEntry.apiKey && isRecord(rawLegacyEntry.apiKey) ? structuredClone(rawLegacyEntry.apiKey) : void 0);
	const rawModels = isRecord(next.models) ? structuredClone(next.models) : {};
	const rawProviders = isRecord(rawModels.providers) ? { ...rawModels.providers } : {};
	const rawGoogle = isRecord(rawProviders.google) ? { ...rawProviders.google } : {};
	if (!(rawGoogle.apiKey !== void 0) && legacyApiKey) {
		rawGoogle.apiKey = legacyApiKey;
		if (!rawGoogle.baseUrl) rawGoogle.baseUrl = DEFAULT_GOOGLE_API_BASE_URL;
		if (!Array.isArray(rawGoogle.models)) rawGoogle.models = [];
		rawProviders.google = rawGoogle;
		rawModels.providers = rawProviders;
		next = {
			...next,
			models: rawModels
		};
		changes.push(`Moved skills.entries.${NANO_BANANA_SKILL_KEY}.${legacyEnvApiKey ? "env.GEMINI_API_KEY" : "apiKey"} → models.providers.google.apiKey.`);
	}
	const entries = { ...rawEntries };
	delete entries[NANO_BANANA_SKILL_KEY];
	if (Object.keys(entries).length === 0) delete skills.entries;
	else skills.entries = entries;
	changes.push(`Removed legacy skills.entries.${NANO_BANANA_SKILL_KEY}.`);
	if (Object.keys(skills).length === 0) {
		const { skills: _ignored, ...rest } = next;
		return rest;
	}
	return {
		...next,
		skills
	};
}
function normalizeConfiguredPositiveInteger(value) {
	if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) return;
	return Math.floor(value);
}
function resolveConfiguredOllamaModelNumCtxBudget(params) {
	if (normalizeConfiguredPositiveInteger(params.model.contextTokens) !== void 0) return;
	const modelContextWindow = normalizeConfiguredPositiveInteger(params.model.contextWindow);
	const providerContextWindow = normalizeConfiguredPositiveInteger(params.provider.contextWindow);
	if (modelContextWindow !== void 0 || providerContextWindow !== void 0) return modelContextWindow ?? (params.providerNumCtxApplies ? void 0 : providerContextWindow);
	return normalizeConfiguredPositiveInteger(params.model.maxTokens) ?? (params.providerNumCtxApplies ? void 0 : normalizeConfiguredPositiveInteger(params.provider.maxTokens));
}
function resolveConfiguredOllamaProviderNumCtxBudget(provider) {
	return normalizeConfiguredPositiveInteger(provider.contextWindow) ?? normalizeConfiguredPositiveInteger(provider.maxTokens);
}
function isNativeOllamaProviderConfig(provider) {
	return normalizeOptionalLowercaseString(provider.api) === "ollama";
}
function isNativeOllamaModelConfig(provider, model) {
	return (normalizeOptionalLowercaseString(model.api) || normalizeOptionalLowercaseString(provider.api)) === "ollama";
}
function hasConfiguredOllamaProviderNumCtx(provider) {
	const rawParams = provider.params;
	return isRecord(rawParams) && Object.hasOwn(rawParams, "num_ctx");
}
function applyLegacyOllamaProviderNumCtxParams(params) {
	if (!isNativeOllamaProviderConfig(params.provider)) return {
		provider: params.provider,
		changed: false
	};
	const rawParams = params.provider.params;
	if (rawParams !== void 0 && !isRecord(rawParams)) return {
		provider: params.provider,
		changed: false
	};
	if (rawParams && Object.hasOwn(rawParams, "num_ctx")) return {
		provider: params.provider,
		changed: false
	};
	const numCtx = resolveConfiguredOllamaProviderNumCtxBudget(params.provider);
	if (numCtx === void 0) return {
		provider: params.provider,
		changed: false
	};
	params.changes.push(`Set models.providers.${sanitizeForLog(params.providerId)}.params.num_ctx to ${numCtx} for native Ollama compatibility.`);
	return {
		provider: {
			...params.provider,
			params: rawParams ? {
				...rawParams,
				num_ctx: numCtx
			} : { num_ctx: numCtx }
		},
		changed: true
	};
}
/** Seed native Ollama num_ctx params from legacy context-token budgets. */
function normalizeLegacyOllamaNativeNumCtxParams(cfg, changes) {
	return normalizeModelProviders(cfg, (rawProvider, providerId) => {
		const rawModels = rawProvider.models;
		if (!Array.isArray(rawModels)) return rawProvider;
		const providerParams = rawModels.some((model) => isRecord(model) && normalizeConfiguredPositiveInteger(model.contextTokens) !== void 0) ? {
			provider: rawProvider,
			changed: false
		} : applyLegacyOllamaProviderNumCtxParams({
			providerId,
			provider: rawProvider,
			changes
		});
		const providerNumCtxApplies = isNativeOllamaProviderConfig(providerParams.provider) && hasConfiguredOllamaProviderNumCtx(providerParams.provider);
		if (rawModels.length === 0) return providerParams.provider;
		let modelsChanged = false;
		const nextModels = rawModels.map((model, index) => {
			if (!isRecord(model)) return model;
			if (!isNativeOllamaModelConfig(providerParams.provider, model)) return model;
			const rawParams = model.params;
			if (rawParams !== void 0 && !isRecord(rawParams)) return model;
			if (rawParams && Object.hasOwn(rawParams, "num_ctx")) return model;
			const numCtx = resolveConfiguredOllamaModelNumCtxBudget({
				model,
				provider: providerParams.provider,
				providerNumCtxApplies
			});
			if (numCtx === void 0) return model;
			modelsChanged = true;
			changes.push(`Set models.providers.${sanitizeForLog(providerId)}.models[${index}].params.num_ctx to ${numCtx} for native Ollama compatibility.`);
			return Object.assign({}, model, { params: rawParams ? {
				...rawParams,
				num_ctx: numCtx
			} : { num_ctx: numCtx } });
		});
		return modelsChanged || providerParams.changed ? {
			...providerParams.provider,
			models: nextModels
		} : rawProvider;
	});
}
const MISTRAL_MODEL_CACHE_READ_COST_BY_ID = {
	"codestral-latest": .03,
	"devstral-medium-latest": .04,
	"magistral-small": .05,
	"mistral-large-latest": .05,
	"mistral-medium-2508": .04,
	"mistral-medium-3-5": .15,
	"mistral-small-latest": .01,
	"pixtral-large-latest": .2
};
function normalizeLegacyMistralModelCost(params) {
	const cost = params.model.cost;
	if (!isRecord(cost) || cost.cacheRead !== 0) return {
		model: params.model,
		changed: false
	};
	const normalizedCacheRead = MISTRAL_MODEL_CACHE_READ_COST_BY_ID[params.modelId.toLowerCase()];
	if (normalizedCacheRead === void 0) return {
		model: params.model,
		changed: false
	};
	params.changes.push(`Normalized models.providers.${sanitizeForLog(params.providerId)}.models[${params.index}].cost.cacheRead (0 → ${normalizedCacheRead}) for Mistral prompt-cache billing.`);
	return {
		model: {
			...params.model,
			cost: {
				...cost,
				cacheRead: normalizedCacheRead
			}
		},
		changed: true
	};
}
/** Normalize stale Mistral model defaults such as prompt-cache read cost. */
function normalizeLegacyMistralModelDefaults(cfg, changes) {
	return normalizeModelProviders(cfg, (rawProvider, providerId) => {
		if (normalizeProviderId(providerId) !== "mistral") return rawProvider;
		const rawModels = rawProvider.models;
		if (!Array.isArray(rawModels)) return rawProvider;
		let modelsChanged = false;
		const nextModels = rawModels.map((model, index) => {
			if (!isRecord(model)) return model;
			const modelId = normalizeOptionalString(model.id) ?? "";
			if (!modelId) return model;
			let nextModel = model;
			let modelChanged = false;
			const contextWindow = typeof model.contextWindow === "number" && Number.isFinite(model.contextWindow) ? model.contextWindow : null;
			const maxTokens = typeof model.maxTokens === "number" && Number.isFinite(model.maxTokens) ? model.maxTokens : null;
			if (contextWindow !== null && maxTokens !== null) {
				const normalizedMaxTokens = resolveNormalizedProviderModelMaxTokens({
					providerId,
					modelId,
					contextWindow,
					rawMaxTokens: maxTokens
				});
				if (normalizedMaxTokens !== maxTokens) {
					nextModel = Object.assign({}, nextModel, { maxTokens: normalizedMaxTokens });
					modelChanged = true;
					changes.push(`Normalized models.providers.${providerId}.models[${index}].maxTokens (${maxTokens} → ${normalizedMaxTokens}) to avoid Mistral context-window rejects.`);
				}
			}
			const costNormalization = normalizeLegacyMistralModelCost({
				providerId,
				model: nextModel,
				modelId,
				index,
				changes
			});
			if (costNormalization.changed) {
				nextModel = costNormalization.model;
				modelChanged = true;
			}
			if (modelChanged) modelsChanged = true;
			return modelChanged ? nextModel : model;
		});
		return modelsChanged ? {
			...rawProvider,
			models: nextModels
		} : rawProvider;
	});
}
//#endregion
//#region src/commands/doctor/shared/legacy-config-compatibility-base.ts
/** Run common compatibility migrations before caller-specific setup/channel passes. */
function normalizeBaseCompatibilityConfigValues(cfg, changes, afterBrowser, blockedModelIdentities) {
	let next = seedMissingDefaultAccountsFromSingleAccountBase(cfg, changes);
	next = normalizeLegacyBrowserConfig(next, changes);
	next = afterBrowser ? afterBrowser(next) : next;
	for (const migrate of [
		migrateLegacyWebSearchConfig,
		migrateLegacyWebFetchConfig,
		migrateLegacyXSearchConfig
	]) {
		const migrated = migrate(next);
		if (migrated.changes.length === 0) continue;
		next = migrated.config;
		changes.push(...migrated.changes);
	}
	next = normalizeLegacyNanoBananaSkill(next, changes);
	next = normalizeLegacyTalkConfig(next, changes);
	next = normalizeLegacyOpenAIModelProviderApi(next, changes);
	next = normalizeLegacyRuntimeModelRefs(next, changes, blockedModelIdentities);
	next = normalizeLegacyOllamaNativeNumCtxParams(next, changes);
	return normalizeLegacyMistralModelDefaults(next, changes);
}
//#endregion
//#region src/commands/doctor/shared/reserved-mcp-server-name-migrate.ts
const RESERVED_MCP_SERVER_NAME = "__proto__";
function resolveMcpServers(raw, nodeHost) {
	if (!isRecord(raw)) return;
	const owner = nodeHost ? raw.nodeHost : raw;
	if (!isRecord(owner)) return;
	const mcp = isRecord(owner.mcp) ? owner.mcp : void 0;
	return isRecord(mcp?.servers) ? mcp.servers : void 0;
}
/** Drop reserved MCP server names before canonical config validation runs. */
function migrateReservedMcpServerNames(cfg, sourceRaw = cfg) {
	const locations = [{
		path: "mcp.servers",
		nodeHost: false
	}, {
		path: "nodeHost.mcp.servers",
		nodeHost: true
	}].filter(({ nodeHost }) => [sourceRaw, cfg].some((value) => Object.hasOwn(resolveMcpServers(value, nodeHost) ?? {}, RESERVED_MCP_SERVER_NAME)));
	if (locations.length === 0) return {
		config: cfg,
		changes: []
	};
	const next = structuredClone(cfg);
	const changes = [];
	for (const { path, nodeHost } of locations) {
		const servers = resolveMcpServers(next, nodeHost);
		if (servers) delete servers[RESERVED_MCP_SERVER_NAME];
		changes.push(`Dropped MCP server "${RESERVED_MCP_SERVER_NAME}" from ${path} because the name is reserved; re-add it under a different name.`);
	}
	return {
		config: next,
		changes
	};
}
//#endregion
//#region src/commands/doctor/shared/legacy-config-core-migrate.ts
function repairAgentRoster(cfg, repair) {
	const roster = readAgentRosterProperty(cfg);
	const values = roster?.value;
	if (!roster || !isRecord(values) && !Array.isArray(values)) return cfg;
	if (Array.isArray(values) !== (roster.kind === "list")) return cfg;
	let changed = false;
	const entries = Object.entries(values).map(([key, agent]) => {
		const path = roster.kind === "entries" ? `agents.entries.${key}` : `agents.list[${key}]`;
		const next = isRecord(agent) ? repair(agent, path) : agent;
		changed ||= next !== agent;
		return [key, next];
	});
	return changed ? {
		...cfg,
		agents: {
			...cfg.agents,
			[roster.kind]: roster.kind === "entries" ? Object.fromEntries(entries) : entries.map(([, agent]) => agent)
		}
	} : cfg;
}
function repairInvalidHeartbeatActiveHours(cfg, changes) {
	const repairHeartbeat = (heartbeat, path) => {
		if (!isRecord(heartbeat) || !Object.hasOwn(heartbeat, "activeHours")) return heartbeat;
		if (HeartbeatSchema.safeParse({ activeHours: heartbeat.activeHours }).success) return heartbeat;
		const { activeHours: _activeHours, ...rest } = heartbeat;
		changes.push(`Removed invalid ${path}.activeHours; heartbeats will use unrestricted hours until it is reconfigured.`);
		return rest;
	};
	const defaultsHeartbeat = repairHeartbeat(cfg.agents?.defaults?.heartbeat, "agents.defaults.heartbeat");
	const next = repairAgentRoster(cfg, (agent, path) => {
		const heartbeat = repairHeartbeat(agent.heartbeat, `${path}.heartbeat`);
		return heartbeat === agent.heartbeat ? agent : {
			...agent,
			heartbeat
		};
	});
	if (defaultsHeartbeat === cfg.agents?.defaults?.heartbeat) return next;
	return {
		...next,
		agents: {
			...next.agents,
			defaults: {
				...next.agents?.defaults,
				heartbeat: defaultsHeartbeat
			}
		}
	};
}
function repairNullAgentWorkspaces(cfg, changes) {
	let repaired = 0;
	const next = repairAgentRoster(cfg, (agent) => {
		if (agent.workspace === null) {
			repaired += 1;
			const { workspace: _workspace, ...rest } = agent;
			return rest;
		}
		return agent;
	});
	if (repaired === 0) return cfg;
	changes.push(`Removed null workspace value${repaired === 1 ? "" : "s"} from agents.${readAgentRosterProperty(cfg)?.kind} entr${repaired === 1 ? "y" : "ies"}.`);
	return next;
}
/** Normalize current config through core, plugin setup, channel, and secret-ref migrations. */
function normalizeCompatibilityConfigValues(cfg, options = {}) {
	const changes = [];
	const copilotConfig = removeLegacyCopilotDiscovery(cfg);
	if (copilotConfig !== cfg) changes.push("The GitHub Copilot discovery switch was retired and has been removed. Configured Copilot access now refreshes its model list automatically. Use the model allow list (agents.defaults.modelPolicy.allow) to hide Copilot models; it does not stop discovery requests.");
	let contextBudgetConfig = copilotConfig;
	let contextBudgetWarnings;
	if (options.sourceConfigBeforeMigrations === void 0) {
		const migration = migrateLegacyContextBudgetConfig(copilotConfig);
		contextBudgetConfig = migration.config;
		changes.push(...migration.changes.map(({ message }) => message));
		contextBudgetWarnings = migration.warnings.map(({ message }) => message);
	} else {
		const migration = migrateLegacyContextBudgetConfig(options.sourceConfigBeforeMigrations);
		changes.push(...migration.changes.map(({ message }) => message));
		contextBudgetWarnings = migration.warnings.map(({ message }) => message);
	}
	const reservedMcpServerNames = migrateReservedMcpServerNames(contextBudgetConfig, options.sourceRaw);
	changes.push(...reservedMcpServerNames.changes);
	let next = normalizeBaseCompatibilityConfigValues(reservedMcpServerNames.config, changes, (config) => {
		const setupMigration = runPluginSetupConfigMigrations({ config });
		if (setupMigration.changes.length === 0) return config;
		changes.push(...setupMigration.changes);
		return setupMigration.config;
	}, options.blockedModelIdentities);
	const tuningCandidate = structuredClone(next);
	if (stripRetiredTuningKnobs(tuningCandidate, changes)) next = tuningCandidate;
	const channelMigrations = applyChannelDoctorCompatibilityMigrations(next);
	contextBudgetWarnings.push(...channelMigrations.warnings ?? []);
	if (channelMigrations.changes.length > 0) {
		next = channelMigrations.next;
		changes.push(...channelMigrations.changes);
	}
	const secretRefMarkers = migrateLegacySecretRefEnvMarkers(next);
	if (secretRefMarkers.changes.length > 0) {
		next = secretRefMarkers.config;
		changes.push(...secretRefMarkers.changes);
	}
	next = normalizeLegacyOpenAICodexModelsAddMetadata(next, changes);
	next = repairInvalidHeartbeatActiveHours(next, changes);
	next = repairNullAgentWorkspaces(next, changes);
	next = migrateLegacyCommandOwners(next, changes);
	next = pruneBindingsForMissingAgents(next, changes);
	return {
		config: next,
		changes,
		...contextBudgetWarnings.length > 0 ? { warnings: contextBudgetWarnings } : {}
	};
}
//#endregion
//#region src/commands/doctor-config-flow.ts
async function refreshGatewayAuthStateAfterAuthProfileRepair() {
	for (const request of [{
		method: "secrets.reload",
		params: {}
	}, {
		method: "models.authStatus",
		params: { refresh: true }
	}]) try {
		await callGateway({
			...request,
			timeoutMs: 3e3
		});
	} catch {}
}
async function loadAndMaybeMigrateDoctorConfig(params) {
	const shouldRepair = params.options.repair === true || params.options.yes === true;
	let preflight = await withProgress({
		label: "Checking OpenClaw state…",
		enabled: params.options.nonInteractive !== true && params.options.json !== true,
		delayMs: 200
	}, (progress) => runDoctorConfigPreflight({
		observe: false,
		invocationPurpose: "doctor",
		repairPrefixedConfig: shouldRepair,
		recoverCorruptTargetStore: shouldRepair,
		doctorOnlyStateMigrations: shouldRepair,
		preparePluginMetadataSnapshot: true,
		...params.agentDatabaseMigrationDiscovery ? { agentDatabaseMigrationDiscovery: params.agentDatabaseMigrationDiscovery } : {},
		beforeWorkspaceStateMigration: createWorkspaceAliasMigrationRepair(params.prompter, progress.done),
		measure: async (name, run) => {
			progress.setLabel(`${name.slice(name.lastIndexOf(".") + 1).replaceAll("-", " ")}…`);
			return await run();
		}
	}));
	const { importShippedPluginInstallConfigForDoctor } = await import("./plugin-registry-migration-iW5bZ2DO.mjs");
	const pluginInstallConfigImport = !shouldSkipLegacyUpdateDoctorConfigWrite(process.env) && inspectShippedPluginInstallConfigRecords(preflight.snapshot.sourceConfig).status === "valid" ? await importShippedPluginInstallConfigForDoctor(preflight.snapshot) : void 0;
	if (pluginInstallConfigImport?.pluginInventoryChanged) {
		const { readConfigPreflightSnapshot } = await import("./config-preflight-snapshot-DhYNaNY2.mjs");
		const refreshed = await readConfigPreflightSnapshot({
			allowCurrentPluginMetadata: false,
			includePluginMetadata: true,
			preparePluginMetadataSnapshot: true,
			skipPluginValidation: shouldSkipPluginValidationForDoctorConfigPreflight()
		});
		preflight = {
			...preflight,
			snapshot: refreshed.snapshot,
			baseConfig: refreshed.snapshot.sourceConfig,
			pluginMetadataSnapshot: refreshed.pluginMetadataSnapshot
		};
	}
	const { snapshot, baseConfig: baseCfg } = preflight;
	const referenceSource = prepareDoctorConfigReferenceSource(snapshot);
	const pluginMetadataSnapshotState = {
		current: preflight.pluginMetadataSnapshot,
		inventoryChanged: pluginInstallConfigImport?.pluginInventoryChanged
	};
	const { createDoctorPluginMetadataSnapshotScope } = await import("./plugin-metadata-snapshot-scope-DzCLMyj3.mjs");
	const pluginMetadataSnapshotScope = createDoctorPluginMetadataSnapshotScope({
		getBaseSnapshot: () => pluginMetadataSnapshotState.current,
		env: process.env,
		getDeferredPluginIds: () => preflight.deferredPluginMigrations?.map((pending) => pending.pluginId) ?? []
	});
	const runWithPluginMetadataSnapshot = pluginMetadataSnapshotScope.run;
	const invalidatePluginMetadataSnapshot = () => {
		pluginMetadataSnapshotState.current = void 0;
		pluginMetadataSnapshotScope.invalidate();
	};
	const runWithCurrentPluginMetadata = (config, run) => {
		const soleAgentId = tryResolveSoleAgentId(config);
		return runWithPluginMetadataSnapshot({
			config,
			workspaceDir: soleAgentId ? resolveAgentWorkspaceDir(config, soleAgentId) : void 0
		}, run);
	};
	let state = {
		cfg: baseCfg,
		candidate: structuredClone(baseCfg),
		pendingChanges: false,
		fixHints: []
	};
	const explicitSetPaths = [];
	let shouldRepairCronCodexModelRefsAfterConfigWrite = false;
	let openAICodexAuthProfileIdMap;
	let modelRetirementRepairRan = false;
	let retiredModelRefConfig;
	const doctorFixCommand = formatCliCommand("openclaw doctor --fix");
	const changesPanelSink = createDoctorChangesPanelSink(shouldRepair);
	const configRepairWarnings = [];
	const applyConfigMutation = (mutation, options) => {
		changesPanelSink.emit(mutation.changes, options.sanitize ? { sanitize: true } : {});
		if (options.emitWarnings && mutation.warnings?.length) {
			emitDoctorNotes({
				note,
				warningNotes: mutation.warnings
			});
			configRepairWarnings.push(...mutation.warnings);
		}
		state = applyDoctorConfigMutation({
			state,
			mutation,
			shouldRepair,
			fixHint: options.fixHint
		});
	};
	const finalizeMigrationResult = prepareDoctorConfigMigrationResult(preflight, snapshot);
	const rawRosterMigrations = [snapshot.sourceConfigBeforeMigrations, snapshot.parsed].filter((source) => source !== void 0).map((source) => migratePersistedImplicitMainRoster(source));
	const rosterMigrations = rawRosterMigrations.filter((migration) => migration.changed);
	const rosterMigrationNeeded = rosterMigrations.length > 0 || baseCfg.agents?.ownership === void 0 && listAgentEntries(baseCfg).length > 1;
	const legacyDefaultAgentId = rawRosterMigrations.map((migration) => migration.retainedLegacyDefaultAgentId).find((agentId) => agentId !== void 0);
	const legacyStep = runWithCurrentPluginMetadata(state.candidate, () => applyLegacyCompatibilityStep({
		snapshot,
		state,
		shouldRepair,
		doctorFixCommand
	}));
	state = legacyStep.state;
	if (legacyDefaultAgentId) {
		retainLegacyDefaultAgentId(state.cfg, legacyDefaultAgentId);
		retainLegacyDefaultAgentId(state.candidate, legacyDefaultAgentId);
	}
	const includeOwnsRoster = configIncludeOwnsAgentRoster(snapshot);
	const persistCanonicalAgentRoster = snapshot.exists && rosterMigrationNeeded && !includeOwnsRoster;
	if (persistCanonicalAgentRoster) {
		const migrated = migratePersistedImplicitMainRoster(state.candidate, { materializeWorkspace: true }).config;
		const migratedRoster = readAgentRosterProperty(migrated);
		const migratedEntries = migratedRoster?.kind === "entries" ? migratedRoster.value : void 0;
		const { list: _legacyList, ...candidateAgents } = migrated.agents ?? {};
		const stampsExplicitOwnership = Object.keys(migratedEntries ?? {}).length > 1;
		applyConfigMutation({
			config: {
				...migrated,
				agents: {
					...candidateAgents,
					...stampsExplicitOwnership ? { ownership: "explicit" } : {},
					entries: migratedEntries
				}
			},
			changes: [...new Set(rosterMigrations.flatMap((migration) => migration.diagnostics).concat("Prepared the canonical agent roster without retired default markers for persistence.", ...stampsExplicitOwnership ? ["Stamped the multi-agent roster for explicit per-surface ownership."] : []))]
		}, { fixHint: `Run "${doctorFixCommand}" to persist the explicit agent roster.` });
		if (stampsExplicitOwnership) explicitSetPaths.push(["agents", "ownership"]);
	}
	const { prepareSessionStoreOwnerRecovery } = await import("./doctor-session-store-owner-ZbQ0fNVu.mjs");
	const sessionStoreOwnerRecovery = await prepareSessionStoreOwnerRecovery({
		config: state.candidate,
		snapshot,
		prompter: params.prompter
	});
	applyConfigMutation(sessionStoreOwnerRecovery, {
		fixHint: `Run "${doctorFixCommand}" to review session-store ownership recovery.`,
		sanitize: true,
		emitWarnings: true
	});
	const { collectBlockedLegacyOpenAICodexProviderPlan } = await import("./legacy-config-migrations.runtime.models-V0rw0UM7.mjs");
	const blockedCodexProviderPlan = collectBlockedLegacyOpenAICodexProviderPlan(state.candidate);
	const blockedCodexModelIdentities = new Set(blockedCodexProviderPlan.blockedModelIdentities);
	if (preflight.cronCodexRuntimePolicyTargets?.length) {
		const { repairCronCodexRuntimePolicies } = await import("./runtime-policy-migration-D3JP0XeQ.mjs");
		const cronRuntimeRepair = repairCronCodexRuntimePolicies({
			cfg: state.candidate,
			targets: preflight.cronCodexRuntimePolicyTargets,
			blockedModelIdentities: blockedCodexModelIdentities
		});
		applyConfigMutation(cronRuntimeRepair, {
			fixHint: `Run "${doctorFixCommand}" to preserve migrated cron runtime policy.`,
			emitWarnings: true
		});
		const blockedTargets = new Set(cronRuntimeRepair.blockedTargets.map(cronCodexRuntimePolicyTargetKey));
		shouldRepairCronCodexModelRefsAfterConfigWrite = preflight.cronCodexRuntimePolicyTargets.some((target) => !blockedTargets.has(cronCodexRuntimePolicyTargetKey(target)));
	}
	const pluginLegacyIssues = await (async () => {
		if (snapshot.parsed === snapshot.sourceConfig) return [];
		const { findDoctorLegacyConfigIssues } = await import("./legacy-config-issues-Dk2EQVjh.mjs");
		return runWithCurrentPluginMetadata(state.candidate, () => findDoctorLegacyConfigIssues(snapshot.parsed, snapshot.parsed));
	})();
	const seenLegacyIssues = new Set(snapshot.legacyIssues.map((issue) => `${issue.path}:${issue.message}`));
	const pluginIssueLines = pluginLegacyIssues.filter((issue) => {
		const key = `${issue.path}:${issue.message}`;
		if (seenLegacyIssues.has(key)) return false;
		seenLegacyIssues.add(key);
		return true;
	}).map((issue) => `- ${issue.path}: ${issue.message}`);
	const legacyIssueLines = [...legacyStep.issueLines, ...pluginIssueLines];
	if (pluginIssueLines.length > 0 && !shouldRepair && !state.fixHints.includes(`Run "${doctorFixCommand}" to migrate legacy config keys.`)) state.fixHints.push(`Run "${doctorFixCommand}" to migrate legacy config keys.`);
	if (legacyIssueLines.length > 0) note(legacyIssueLines.join("\n"), "Legacy config keys detected");
	changesPanelSink.emit(legacyStep.changeLines);
	const { MODEL_METADATA_CORRUPTION_AUDIT_LIMIT, repairGeneratedModelMetadataCorruption } = await import("./model-metadata-corruption-repair-DVNJ_J5U.mjs");
	applyConfigMutation(runWithCurrentPluginMetadata(state.candidate, () => repairGeneratedModelMetadataCorruption({
		config: state.candidate,
		authoredRoot: snapshot.parsed,
		configPath: snapshot.path,
		currentHash: hashConfigRaw(snapshot.raw),
		auditRecords: readRecentConfigAuditRecords({
			env: process.env,
			homedir,
			limit: MODEL_METADATA_CORRUPTION_AUDIT_LIMIT
		})
	})), {
		fixHint: `Run "${doctorFixCommand}" to remove audit-proven generated model metadata.`,
		emitWarnings: true
	});
	noteDoctorHookConfigWarnings(state.cfg, snapshot.path);
	applyConfigMutation(runWithCurrentPluginMetadata(state.candidate, () => normalizeCompatibilityConfigValues(state.candidate, {
		blockedModelIdentities: blockedCodexModelIdentities,
		sourceRaw: snapshot.parsed,
		sourceConfigBeforeMigrations: snapshot.sourceConfigBeforeMigrations
	})), {
		fixHint: `Run "${doctorFixCommand}" to apply these changes.`,
		emitWarnings: true
	});
	const { repairUnownedChannelAccountBindings } = await import("./legacy-config-binding-repair-3WlaxoaJ.mjs");
	applyConfigMutation(runWithCurrentPluginMetadata(state.candidate, () => repairUnownedChannelAccountBindings({
		config: state.candidate,
		sourceConfigBeforeMigrations: snapshot.sourceConfigBeforeMigrations
	})), {
		fixHint: `Run "${doctorFixCommand}" to preserve channel account ownership.`,
		emitWarnings: true
	});
	const { prepareTailscaleConfigMigration } = await import("./doctor-tailscale-DP2Y6GSF.mjs");
	applyConfigMutation(await prepareTailscaleConfigMigration({
		cfg: state.candidate,
		env: process.env
	}), {
		fixHint: `Run "${doctorFixCommand}" to apply safe Tailscale configuration migrations.`,
		emitWarnings: true
	});
	const { prepareRetiredPhoneControlCleanup } = await import("./doctor-retired-phone-control-CMXdaWeC.mjs");
	const retiredPhoneControlCleanup = await prepareRetiredPhoneControlCleanup({
		cfg: state.candidate,
		env: process.env
	});
	applyConfigMutation({
		config: retiredPhoneControlCleanup.config,
		changes: retiredPhoneControlCleanup.configChanges,
		warnings: retiredPhoneControlCleanup.warnings
	}, {
		fixHint: `Run "${doctorFixCommand}" to retire Phone Control lease configuration.`,
		emitWarnings: true
	});
	if (retiredPhoneControlCleanup.cleanupPending && !shouldRepair) note(`Retired Phone Control lease state remains. Run "${doctorFixCommand}" to archive it.`, "Legacy state detected");
	const { recoverInstalledPluginConfigIds } = await import("./installed-plugin-id-recovery-CZX1iOHK.mjs");
	const installedPluginRecovery = await recoverInstalledPluginConfigIds(state.candidate, process.env);
	applyConfigMutation({
		...installedPluginRecovery,
		warnings: installedPluginRecovery.notices
	}, {
		fixHint: `Run "${doctorFixCommand}" to apply these changes.`,
		emitWarnings: true
	});
	if (referenceSource) referenceSource.installedPluginIdRecovery = installedPluginRecovery.recovery;
	const pluginActivationSourceConfig = state.candidate;
	const { collectCodexPluginActivationWarnings } = await import("./codex-plugin-activation-warning-cn_i_J1A.mjs");
	emitDoctorNotes({
		note,
		warningNotes: collectCodexPluginActivationWarnings(pluginActivationSourceConfig)
	});
	const { applyPluginAutoEnable } = await import("./plugin-auto-enable-boyGHi8B.mjs");
	applyConfigMutation(runWithCurrentPluginMetadata(state.candidate, () => applyPluginAutoEnable({
		config: state.candidate,
		env: process.env
	})), { fixHint: `Run "${doctorFixCommand}" to apply these changes.` });
	if (!shouldRepair) {
		const { repairStaleAgentModelRefs } = await import("./stale-agent-model-ref-repair-BNLkb7jh.mjs");
		const staleAgentModelRepair = runWithCurrentPluginMetadata(state.candidate, () => repairStaleAgentModelRefs(state.candidate, { env: process.env }));
		retiredModelRefConfig = staleAgentModelRepair.retiredModelRefConfig;
		applyConfigMutation(staleAgentModelRepair, {
			fixHint: `Run "${doctorFixCommand}" to remove stale agent model references.`,
			sanitize: true,
			emitWarnings: true
		});
	}
	const [{ collectPluginToolAllowlistWarnings }, { collectGitHubUpgradeWarnings }, { normalizePluginsConfig }] = await Promise.all([
		import("./plugin-tool-allowlist-warnings-BihtvYkz.mjs"),
		import("./github-preview-upgrade-CdoPbEUH.mjs"),
		import("./config-state-HVfXpm2t.mjs")
	]);
	const pluginWarnings = [...runWithCurrentPluginMetadata(state.candidate, () => collectPluginToolAllowlistWarnings({
		cfg: state.candidate,
		env: process.env
	})), ...collectGitHubUpgradeWarnings(normalizePluginsConfig(state.candidate.plugins))];
	if (pluginWarnings.length > 0) note(sanitizeDoctorNote(pluginWarnings.join("\n")), "Doctor warnings");
	const hasConfiguredChannels = listDoctorConfiguredChannelIds(state.candidate, { configEntryPolicy: "raw" }).length > 0;
	let collectMutableAllowlistWarnings;
	if (hasConfiguredChannels) {
		const channelDoctor = await import("./channel-doctor-BGknT3_3.mjs");
		collectMutableAllowlistWarnings = channelDoctor.collectChannelDoctorMutableAllowlistWarnings;
		const channelDoctorSequence = await runWithCurrentPluginMetadata(state.candidate, () => channelDoctor.runChannelDoctorConfigSequences({
			cfg: state.candidate,
			env: process.env,
			shouldRepair
		}));
		emitDoctorNotes({
			note,
			changeNotes: channelDoctorSequence.changeNotes,
			infoNotes: channelDoctorSequence.infoNotes,
			warningNotes: channelDoctorSequence.warningNotes
		});
		const staleChannelCleanups = await runWithCurrentPluginMetadata(state.candidate, () => channelDoctor.collectChannelDoctorStaleConfigMutations(state.candidate, { env: process.env }));
		for (const staleCleanup of staleChannelCleanups) applyConfigMutation(staleCleanup, {
			fixHint: `Run "${doctorFixCommand}" to remove stale channel plugin references.`,
			sanitize: true,
			emitWarnings: true
		});
	}
	const { repairHooksTokenReuseGatewayAuth } = await import("./hooks-token-reuse-repair-CgFpy8Mi.mjs");
	applyConfigMutation(await repairHooksTokenReuseGatewayAuth(state.candidate, process.env), { fixHint: `Run "${doctorFixCommand}" to rotate hooks.token away from Gateway auth.` });
	if (shouldRepair) {
		const { runDoctorRepairSequence } = await import("./repair-sequencing-BivlmiAc.mjs");
		const prompter = params.prompter;
		const repairSequence = await runDoctorRepairSequence({
			state,
			installedPluginIdRecovery: installedPluginRecovery.recovery,
			doctorFixCommand,
			env: process.env,
			blockedCodexProviderPlan,
			pluginMetadataSnapshotState,
			runWithPluginMetadataSnapshot,
			...prompter ? { onCapabilityConsent: createPluginCapabilityConsentPrompter({
				note: async (message, title) => note(message, title),
				confirm: (confirmation) => prompter.confirmRuntimeRepair({
					...confirmation,
					requiresInteractiveConfirmation: true
				})
			}) } : {}
		});
		state = repairSequence.state;
		if (referenceSource) referenceSource.installedPluginIdRecovery = new Map([...installedPluginRecovery.recovery, ...repairSequence.installedPluginIdRecovery]);
		pluginMetadataSnapshotState.current = repairSequence.pluginMetadataSnapshot;
		openAICodexAuthProfileIdMap = repairSequence.openAICodexAuthProfileIdMap;
		retiredModelRefConfig = repairSequence.retiredModelRefConfig;
		modelRetirementRepairRan = repairSequence.modelRetirementRepairRan;
		if (repairSequence.authProfilesRepaired) await refreshGatewayAuthStateAfterAuthProfileRepair();
		emitDoctorNotes({
			note,
			changeNotes: repairSequence.changeNotes,
			warningNotes: repairSequence.warningNotes
		});
		for (const configChange of repairSequence.configChangeNotes ?? []) changesPanelSink.emit([configChange]);
	} else {
		const { collectDoctorPreviewNotes } = await import("./preview-warnings-CNzZL_bv.mjs");
		const previewNotes = await runWithCurrentPluginMetadata(state.candidate, () => collectDoctorPreviewNotes({
			cfg: state.candidate,
			activationSourceConfig: pluginActivationSourceConfig,
			doctorFixCommand,
			env: process.env,
			allowExec: params.options.allowExec === true,
			blockedCodexProviderPlan
		}));
		emitDoctorNotes({
			note,
			infoNotes: previewNotes.infoNotes,
			warningNotes: previewNotes.warningNotes
		});
	}
	const mutableAllowlistWarnings = collectMutableAllowlistWarnings ? await runWithCurrentPluginMetadata(state.candidate, () => collectMutableAllowlistWarnings({
		cfg: state.candidate,
		env: process.env
	})) : [];
	if (mutableAllowlistWarnings.length > 0) note(sanitizeDoctorNote(mutableAllowlistWarnings.join("\n")), "Doctor warnings");
	const unknownStep = applyUnknownConfigKeyStep({
		state,
		shouldRepair,
		doctorFixCommand
	});
	state = unknownStep.state;
	if (unknownStep.removed.length > 0 || unknownStep.repairs.length > 0) {
		const lines = [...unknownStep.removed.map((pathLocal) => `- ${pathLocal}`), ...unknownStep.repairs.map((change) => `- ${change}`)];
		if (shouldRepair) changesPanelSink.emit(lines);
		else note(lines.join("\n"), "Unknown config keys");
	}
	if (unknownStep.warnings.length > 0) note(unknownStep.warnings.join("\n"), "Doctor warnings");
	if (inspectShippedPluginInstallConfigRecords(state.candidate).status === "valid") applyConfigMutation({
		config: withoutPluginInstallRecords(state.candidate, { preserveEmptyPlugins: containsAuthoredInclude(snapshot.parsed) }),
		changes: ["Removed retired plugins.installs after preserving plugin install records."]
	}, { fixHint: `Run "${doctorFixCommand}" to migrate retired plugin install records.` });
	const finalized = await finalizeDoctorConfigFlow({
		...state,
		snapshot,
		shouldRepair,
		confirm: params.confirm,
		note
	});
	const cfg = finalized.cfg;
	const shouldWriteConfig = finalized.shouldWriteConfig && legacyStep.blocksWrite !== true;
	const includeBoundaryWrite = shouldWriteConfig && canWriteDoctorInclude(snapshot, cfg, {
		persistCanonicalAgentRoster,
		explicitSetPaths
	}, referenceSource?.installedPluginIdRecovery);
	const configuredOpencodePluginIds = [cfg.models?.providers?.opencode || cfg.models?.providers?.["opencode-zen"] ? "opencode" : void 0, cfg.models?.providers?.["opencode-go"] ? "opencode-go" : void 0].filter((pluginId) => pluginId !== void 0);
	let activeOpencodePluginIds = [];
	if (configuredOpencodePluginIds.length > 0) {
		const { resolveEnabledProviderPluginIds } = await import("./providers-PEJ8669z.mjs");
		activeOpencodePluginIds = runWithCurrentPluginMetadata(cfg, () => resolveEnabledProviderPluginIds({
			config: cfg,
			onlyPluginIds: configuredOpencodePluginIds
		}));
	}
	noteOpencodeProviderOverrides(cfg, {
		opencodePluginActive: activeOpencodePluginIds.includes("opencode"),
		opencodeGoPluginActive: activeOpencodePluginIds.includes("opencode-go")
	});
	noteImplicitFallbackClobberWarnings(cfg);
	noteSandboxOriginProxyWarning(cfg);
	noteMcpOriginWarning(cfg);
	noteMediaCliModelWarnings(cfg);
	noteMissingDefaultAgentOwner(cfg);
	const migrationResult = await finalizeMigrationResult({
		cfg,
		shouldWriteConfig,
		pluginInventoryChanged: pluginMetadataSnapshotState.inventoryChanged,
		metadataSnapshot: pluginMetadataSnapshotState.current,
		runWithCurrentPluginMetadata
	});
	const pendingChangePanels = changesPanelSink.drain();
	return {
		...finalized,
		...shouldWriteConfig && sessionStoreOwnerRecovery.changes.length > 0 ? { confirmedConfigSource: {
			path: snapshot.path,
			hash: snapshot.hash ?? hashConfigRaw(snapshot.raw)
		} } : {},
		...referenceSource ? { referenceSource } : {},
		...pluginInstallConfigImport ? { pluginInstallConfigImport } : {},
		path: snapshot.path ?? CONFIG_PATH,
		shouldWriteConfig,
		...configRepairWarnings.length ? { warnings: [...new Set(configRepairWarnings)] } : {},
		...shouldWriteConfig && pendingChangePanels.length > 0 ? { pendingChangePanels } : {},
		sourceConfigValid: snapshot.valid,
		...legacyStep.partiallyValid === true ? { skipPluginValidationOnWrite: true } : {},
		...shouldWriteConfig && explicitSetPaths.length > 0 ? { explicitSetPaths } : {},
		...shouldWriteConfig && persistCanonicalAgentRoster ? { persistCanonicalAgentRoster: true } : {},
		...includeBoundaryWrite ? { skipWizardMetadataForIncludeWrite: true } : {},
		...shouldRepairCronCodexModelRefsAfterConfigWrite ? { shouldRepairCronCodexModelRefsAfterConfigWrite: true } : {},
		...shouldRepair && retiredPhoneControlCleanup.cleanupPending && retiredPhoneControlCleanup.cleanupSafe ? { retiredPhoneControlStateCleanupPending: true } : {},
		...blockedCodexProviderPlan.blockedModelIdentities.length > 0 ? { blockedCodexModelIdentities: blockedCodexProviderPlan.blockedModelIdentities } : {},
		...openAICodexAuthProfileIdMap ? { openAICodexAuthProfileIdMap } : {},
		...retiredModelRefConfig ? { retiredModelRefConfig } : {},
		modelRetirementRepairRan: modelRetirementRepairRan && !legacyStep.blocksWrite && (shouldWriteConfig || snapshot.valid),
		...migrationResult,
		runWithPluginMetadataSnapshot,
		invalidatePluginMetadataSnapshot
	};
}
//#endregion
export { loadAndMaybeMigrateDoctorConfig };
