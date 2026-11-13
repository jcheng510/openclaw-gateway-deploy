import { a as copyConfigResolutionFactsThroughRewrite } from "./resolution-facts-CYe39-eJ.mjs";
import { n as containsConfigIncludeDirective, p as resolveConfigSnapshotHash } from "./io.read-helpers-CgQwh9G4.mjs";
import { i as loadInstalledPluginIndexInstallRecordsSync } from "./installed-plugin-index-record-reader-BKR65EEF.mjs";
import { l as withPluginMetadataSnapshotScope } from "./current-plugin-metadata-snapshot-CdI4MWI9.mjs";
import { r as validateConfigObjectRaw } from "./validation-core-YrPXii0X.mjs";
import { w as stampConfigWriteMetadata } from "./io.warnings-AdNkx0te.mjs";
import { r as resolveConfigWidePluginMetadataSnapshot } from "./io.plugin-metadata-Dh6QPasb.mjs";
import { r as validateConfigObjectWithPlugins } from "./validation-D_X_aeNf.mjs";
import { t as inheritLegacyDefaultAgentId } from "./legacy.default-agent-owner-C1atgXtB.mjs";
import { c as resolveManagedUnsetPathsForWrite, i as preserveDeferredPluginMigrationConfig, n as getDeferredPluginMigrationConfigFacts, o as setDeferredPluginMigrationConfigFacts, r as omitDeferredPluginMigrationConfig, s as applyUnsetPathsForWrite } from "./deferred-plugin-migration-config-BbOrU7ue.mjs";
import { t as findLegacyConfigIssues } from "./legacy-BsVKffEe.mjs";
import { a as transformConfigFile } from "./mutate-BrQ5d2nB.mjs";
import "./config-D1R2igem.mjs";
import { a as withoutPluginInstallRecords } from "./installed-plugin-index-records-DHEAmSsp.mjs";
import { f as withDeferredPluginDoctorMigrations } from "./doctor-contract-registry-C87v36Ap.mjs";
import { i as restoreDoctorConfigEnvRefs, o as applyLegacyDoctorMigrations, r as prepareDoctorConfigReferenceSource } from "./config-flow-steps-kAaYHX80.mjs";
import { c as inspectShippedPluginInstallConfigRecords, n as assertShippedPluginInstallConfigImportCurrent, r as importShippedPluginInstallConfigForDoctor, s as readShippedPluginInstallConfigImportRecords } from "./plugin-registry-migration-CUoERKwp.mjs";
import { t as prepareConfigWriteTopology } from "./io.write-topology-CpNNOgKw.mjs";
import { n as findDoctorLegacyConfigIssues } from "./legacy-config-issues-B5wx0JVD.mjs";
import { isDeepStrictEqual } from "node:util";
//#region src/commands/doctor/shared/automatic-config-repair.ts
function admitAutomaticConfigRepairSnapshot(snapshot) {
	return !snapshot.valid && snapshot.exists && snapshot.raw !== null && (snapshot.includedPaths?.length ?? 0) === 0 && !containsConfigIncludeDirective(snapshot.parsed);
}
function prepareAutomaticConfigRepairWrite(snapshot, config) {
	const unsetPaths = resolveManagedUnsetPathsForWrite(void 0);
	return stampConfigWriteMetadata(applyUnsetPathsForWrite(prepareConfigWriteTopology({
		snapshot,
		nextConfig: config,
		options: { persistCanonicalAgentRoster: true },
		unsetPaths,
		env: process.env
	}).nextConfig, unsetPaths), void 0, void 0, snapshot.parsed);
}
function planConfigRepair(snapshot, pluginContracts, installRecordOverride) {
	if (!admitAutomaticConfigRepairSnapshot(snapshot)) return null;
	const deferredPluginMigrations = getDeferredPluginMigrationConfigFacts(snapshot.sourceConfig);
	const sourceRecords = inspectShippedPluginInstallConfigRecords(snapshot.sourceConfig);
	if (sourceRecords.status === "invalid") return null;
	const projected = inheritLegacyDefaultAgentId(snapshot.sourceConfig, withoutPluginInstallRecords(snapshot.sourceConfig));
	const installRecords = pluginContracts ? installRecordOverride ?? (sourceRecords.status === "valid" ? readShippedPluginInstallConfigImportRecords(snapshot) : void 0) : void 0;
	const withMetadata = (config, run) => {
		const invoke = (metadata) => deferredPluginMigrations ? withDeferredPluginDoctorMigrations(deferredPluginMigrations.map((pending) => pending.pluginId), () => run(metadata)) : run(metadata);
		if (installRecords === void 0) return invoke();
		const metadata = resolveConfigWidePluginMetadataSnapshot({
			config,
			installRecords,
			allowCurrent: false
		});
		return withPluginMetadataSnapshotScope(metadata, () => invoke(metadata), { config });
	};
	const migration = withMetadata(projected, () => applyLegacyDoctorMigrations(projected, {
		sourceConfigBeforeMigrations: snapshot.sourceConfigBeforeMigrations,
		context: {
			authoredRaw: snapshot.parsed,
			resolvedRaw: snapshot.sourceConfig
		},
		pluginContracts
	}));
	const config = preserveDeferredPluginMigrationConfig({
		sourceConfig: snapshot.sourceConfig,
		nextConfig: migration.next ?? projected,
		pending: deferredPluginMigrations ?? []
	});
	if (isDeepStrictEqual(config, snapshot.sourceConfig)) return null;
	copyConfigResolutionFactsThroughRewrite(snapshot.sourceConfig, config);
	const writeConfig = pluginContracts ? restoreDoctorConfigEnvRefs(config, prepareDoctorConfigReferenceSource(snapshot)) : config;
	let warnings = snapshot.warnings;
	const runtimeConfig = withMetadata(config, (metadata) => {
		const validationConfig = omitDeferredPluginMigrationConfig(config, deferredPluginMigrations);
		const validated = pluginContracts ? validateConfigObjectWithPlugins(prepareAutomaticConfigRepairWrite(snapshot, writeConfig), {
			...metadata ? { pluginMetadataSnapshot: metadata } : {},
			deferredPluginMigrations
		}) : {
			...validateConfigObjectRaw(validationConfig),
			warnings
		};
		warnings = validated.warnings;
		const issues = (pluginContracts ? findDoctorLegacyConfigIssues : findLegacyConfigIssues)(validationConfig, validationConfig);
		return validated.ok && issues.length === 0 ? deferredPluginMigrations?.length ? validated.config : config : null;
	});
	if (!runtimeConfig) return null;
	copyConfigResolutionFactsThroughRewrite(snapshot.sourceConfig, runtimeConfig);
	setDeferredPluginMigrationConfigFacts(config, deferredPluginMigrations);
	return {
		config,
		writeConfig,
		changes: [
			...migration.changes,
			...migration.warnings ?? [],
			...sourceRecords.status === "valid" ? ["Removed retired plugins.installs after preserving plugin install records."] : []
		],
		snapshot: {
			...snapshot,
			sourceConfig: config,
			resolved: config,
			runtimeConfig,
			config: runtimeConfig,
			warnings,
			valid: true,
			issues: [],
			legacyIssues: []
		}
	};
}
/** Admits only complete, deterministic single-file legacy migrations. */
function planAutomaticConfigRepair(snapshot, options) {
	return planConfigRepair(snapshot, true, options?.installRecords);
}
/** Validate the prospective plugin contracts before their records become durable. */
async function importAutomaticConfigRepairInstallRecords(snapshot) {
	return await importShippedPluginInstallConfigForDoctor(snapshot, { validateRecords: (installRecords) => {
		if (!planAutomaticConfigRepair(snapshot, { installRecords })) throw new Error("Config cannot be repaired safely with the current plugin inventory.");
	} });
}
/**
* Backup inventory and restore overlap checks need legacy roots without changing state.
* Full plugin-contract validation belongs to Doctor's repair plan.
*/
function resolveLegacyConfigSnapshotForBackup(snapshot) {
	if (snapshot.valid) return snapshot;
	return planConfigRepair(snapshot, false)?.snapshot;
}
/** Commits a planned repair against the exact snapshot admitted by its caller. */
async function writeAutomaticConfigRepair(plan, snapshot, options = {}) {
	await transformConfigFile({
		baseHash: resolveConfigSnapshotHash(snapshot) ?? void 0,
		transform: (_current, { snapshot: currentSnapshot }) => {
			assertShippedPluginInstallConfigImportCurrent(currentSnapshot, options.pluginInstallConfigImport);
			return { nextConfig: plan.writeConfig };
		},
		afterWrite: {
			mode: "none",
			reason: "automatic migration"
		},
		writeOptions: {
			expectedConfigPath: snapshot.path,
			assertCurrent: options.assertCurrent,
			auditOrigin: "doctor",
			skipOutputLogs: true,
			skipRuntimeSnapshotRefresh: true,
			allowConfigSizeDrop: options.pluginInstallConfigImport !== void 0,
			persistCanonicalAgentRoster: true
		}
	});
}
/** Revalidate imported inventory under its owner lease before the guarded config write. */
async function commitAutomaticConfigRepair(plan, snapshot, pluginInstallConfigImport) {
	if (!pluginInstallConfigImport) return await writeAutomaticConfigRepair(plan, snapshot);
	const { withPluginLifecycleLease } = await import("./plugin-lifecycle-lease-DO5BHP1b.mjs");
	await withPluginLifecycleLease({}, async (lease) => {
		const currentPlan = planAutomaticConfigRepair(snapshot, { installRecords: loadInstalledPluginIndexInstallRecordsSync() });
		if (!currentPlan) throw new Error("Config cannot be repaired safely with the current plugin inventory.");
		await writeAutomaticConfigRepair(currentPlan, snapshot, {
			pluginInstallConfigImport,
			assertCurrent: () => lease.assertOwned()
		});
	});
}
//#endregion
export { resolveLegacyConfigSnapshotForBackup as i, importAutomaticConfigRepairInstallRecords as n, planAutomaticConfigRepair as r, commitAutomaticConfigRepair as t };
