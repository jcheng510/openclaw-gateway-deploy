import { D as withPluginCache, a as createPluginCache, o as getPluginCache } from "./plugin-cache-DK2CPN_y.mjs";
import { r as createLazyRuntimeModule } from "./lazy-runtime-CJrzFzqU.mjs";
import { a as measureGatewayBootstrapStep } from "./startup-trace-fue7GRYn.mjs";
import { n as sanitizeTerminalText } from "./safe-text-C6FhHCw7.mjs";
import { o as withArtifactPreservingStateReads, p as withOpenClawStateDatabaseReadSnapshot } from "./openclaw-state-db-readonly-DE3MB0wy.mjs";
import "./agent-scope-config-Dm6T00l4.mjs";
import { i as listAgentIds } from "./agent-roster-B45JERT5.mjs";
import { t as createConfigIO } from "./io.factory-DBfPTl1R.mjs";
import { a as isConfigReadFailure, i as formatInvalidConfigDetails, n as createConfigReadError } from "./io.invalid-config-DkKUeCUl.mjs";
import { c as readConfigFileSnapshot, d as readConfigFileSnapshotWithPluginMetadata } from "./io.runtime-BOdk1dW9.mjs";
import "./io-B18HRL9J.mjs";
import { h as readAgentDatabaseAdmissionRefusal, p as listAgentDatabaseAdmissionRefusals } from "./agent-database-admission-CLYAvaL3.mjs";
import { f as withDeferredPluginDoctorMigrations } from "./doctor-contract-registry-C87v36Ap.mjs";
import { t as describeConfigSnapshotInputChange } from "./snapshot-inputs-DRbOtoHS.mjs";
import { a as throwStartupMigrationIdentityChanged, i as throwStartupMigrationGuardRejected, n as refuseStartupMigrationsForLiveGatewayOwner, r as rethrowStartupConfigFailure } from "./doctor-startup-migration-refusal-BUpd_Lzf.mjs";
import { t as addDoctorLegacyIssues } from "./legacy-config-issues-B5wx0JVD.mjs";
import { s as recordStartupMigrationWarnings } from "./state-migrations.messages-DZiaEGjz.mjs";
import { t as completeDoctorPluginMetadataSnapshot } from "./plugin-metadata-snapshot-scope-D_fEAKNq.mjs";
//#region src/commands/doctor-config-preflight-measure.ts
async function measureDoctorConfigPreflightStep(name, run, measure, metrics) {
	const tracedRun = () => measureGatewayBootstrapStep(`cli.bootstrap.${name}`, run, metrics);
	return measure ? await measure(`doctor.config-preflight.${name}`, tracedRun) : await tracedRun();
}
//#endregion
//#region src/commands/config-preflight-snapshot.ts
const loadInstalledPluginIndexStoreWrite = createLazyRuntimeModule(() => import("./installed-plugin-index-store-write-ByQFu-oS.mjs"));
function throwPluginRegistryPersistenceFailed(reason, repair = "Run \"openclaw doctor --fix\" and retry.") {
	throw new Error(`OpenClaw refreshed the plugin registry but could not verify the persisted replacement (${reason}); refusing to accept the plugin registry. ${repair}`);
}
function formatPluginRegistryDifferences(snapshot) {
	const differences = new Map(snapshot?.registryDiagnostics.flatMap((diagnostic) => diagnostic.differences ?? []).map((difference) => [JSON.stringify(difference), difference]));
	if (differences.size === 0) return;
	return [...differences.values()].toSorted((left, right) => [
		left.pluginId,
		left.persistedSource,
		left.derivedSource
	].join("\0").localeCompare([
		right.pluginId,
		right.persistedSource,
		right.derivedSource
	].join("\0"))).map((difference) => `${sanitizeTerminalText(difference.pluginId)} (${difference.changed.join("+")} changed; persisted source: ${JSON.stringify(difference.persistedSource)}; derived source: ${JSON.stringify(difference.derivedSource)})`).join(", ");
}
async function readConfigPreflightSnapshot(params) {
	const cache = params.allowCurrentPluginMetadata ? getPluginCache() : createPluginCache();
	return withPluginCache(cache, async () => {
		const sharedOptions = {
			...params.isolateEnv ? { isolateEnv: true } : {},
			...params.observe === false ? { observe: false } : {},
			...params.measure ? { measure: params.measure } : {},
			...params.allowCurrentPluginMetadata ? {} : { allowCurrentPluginMetadata: false }
		};
		let deferred = params.deferredPluginMigrations;
		if (params.preparePluginMigrations) {
			const core = await readConfigFileSnapshot({
				...sharedOptions,
				pluginValidation: "core-only",
				deferredPluginMigrations: deferred
			});
			await params.prepareSnapshot?.(core);
			deferred = await params.preparePluginMigrations(core);
		}
		const readOptions = {
			...sharedOptions,
			deferredPluginMigrations: deferred
		};
		return withDeferredPluginDoctorMigrations(deferred?.map((entry) => entry.pluginId) ?? [], async () => {
			if (params.includePluginMetadata && !params.skipPluginValidation) {
				const result = await readConfigFileSnapshotWithPluginMetadata(readOptions);
				const pluginMetadataSnapshot = params.preparePluginMetadataSnapshot ? completeDoctorPluginMetadataSnapshot({
					snapshot: result.pluginMetadataSnapshot,
					config: result.snapshot.sourceConfig ?? result.snapshot.config ?? {}
				}) : result.pluginMetadataSnapshot;
				return {
					snapshot: addDoctorLegacyIssues(result.snapshot, pluginMetadataSnapshot),
					...pluginMetadataSnapshot ? { pluginMetadataSnapshot } : {}
				};
			}
			const snapshot = await readConfigFileSnapshot({
				...readOptions,
				skipPluginValidation: params.skipPluginValidation
			});
			if (!params.preparePluginMigrations) await params.prepareSnapshot?.(snapshot);
			return { snapshot: addDoctorLegacyIssues(snapshot) };
		});
	});
}
function needsRefreshedPluginIndexPersistence(snapshotRead) {
	return snapshotRead.pluginMetadataSnapshot?.registrySource === "derived";
}
async function persistRefreshedPluginIndex(params) {
	const lease = params.lease;
	if (!lease) throwPluginRegistryPersistenceFailed("startup migration lease was not acquired");
	const { withPluginLifecycleLease } = await import("./plugin-lifecycle-lease-DO5BHP1b.mjs");
	return await withPluginLifecycleLease({
		env: params.env,
		assertCurrent: params.assertCurrent,
		processBound: true
	}, async (pluginLease) => {
		const fresh = await params.readPersistedSnapshot();
		assertPreflightConfigUnchanged(params.snapshotRead.snapshot, fresh.snapshot);
		pluginLease.assertOwned();
		if (!needsRefreshedPluginIndexPersistence(fresh)) {
			if (fresh.pluginMetadataSnapshot?.registrySource !== "persisted") throwPluginRegistryPersistenceFailed("fresh metadata was not persisted or derived");
			return { snapshotRead: fresh };
		}
		const derivedPluginMetadataSnapshot = fresh.pluginMetadataSnapshot;
		if (!derivedPluginMetadataSnapshot?.configFingerprint?.trim()) throwPluginRegistryPersistenceFailed("derived metadata was incomplete");
		const { writePersistedInstalledPluginIndexWithLeaseSync } = await params.measure("plugin-index-store-import", loadInstalledPluginIndexStoreWrite);
		await params.measure("plugin-index-persistence", () => writePersistedInstalledPluginIndexWithLeaseSync(derivedPluginMetadataSnapshot.registryIndex, {
			env: params.env,
			lease: { assertOwnedInTransaction(database) {
				lease.assertOwnedInTransaction(database);
				pluginLease.assertOwnedInTransaction(database);
			} }
		}));
		const persistedSnapshotRead = await params.readPersistedSnapshot();
		const persistedPluginMetadataSnapshot = persistedSnapshotRead.pluginMetadataSnapshot;
		if (persistedPluginMetadataSnapshot?.registrySource !== "persisted") {
			const diagnosticCodes = persistedPluginMetadataSnapshot?.registryDiagnostics.map((diagnostic) => diagnostic.code);
			const differences = formatPluginRegistryDifferences(persistedPluginMetadataSnapshot);
			throwPluginRegistryPersistenceFailed(`reread source was ${persistedPluginMetadataSnapshot?.registrySource ?? "missing"}${differences ? `; differences: ${differences}` : ""}${diagnosticCodes?.length ? `; diagnostics: ${diagnosticCodes.join(", ")}` : ""}`, "Stop plugin package changes, run \"openclaw plugins registry --refresh\", then retry.");
		}
		assertPreflightConfigUnchanged(params.snapshotRead.snapshot, persistedSnapshotRead.snapshot);
		return { snapshotRead: persistedSnapshotRead };
	});
}
/** Admit the same config and state before the lease and again before persistent writes. */
async function readAdmittedConfigSnapshot(params) {
	return await withArtifactPreservingStateReads(async () => {
		await measureDoctorConfigPreflightStep("admission.live-owner", () => refuseStartupMigrationsForLiveGatewayOwner(params.env));
		try {
			const selected = await measureDoctorConfigPreflightStep("admission.core-config", () => readConfigFileSnapshot({
				observe: false,
				isolateEnv: true,
				pluginValidation: "core-only"
			}));
			if (isConfigReadFailure(selected) || selected.issues.some((issue) => issue.errorCode === "CONFIG_SOURCE_INVALID")) return { snapshot: selected };
			const recoveryOptions = {
				configPath: selected.path,
				observe: false,
				env: params.env
			};
			const coreRecovery = await measureDoctorConfigPreflightStep("admission.core-recovery", () => createConfigIO({
				...recoveryOptions,
				pluginValidation: "core-only"
			}).prepareConfigRecovery(selected));
			const candidate = coreRecovery?.snapshot ?? selected;
			await assertStartupStateReady({
				cfg: candidate.sourceConfig ?? candidate.config,
				env: params.env
			});
			if (candidate.valid) {
				await params.validateConfig?.(candidate);
				const { loadDeviceIdentityIfPresent } = await import("./device-identity-CvpIEFnM.mjs");
				loadDeviceIdentityIfPresent({ env: params.env });
			}
			let read = await withOpenClawStateDatabaseReadSnapshot(() => params.readSnapshot(coreRecovery ? { isolateEnv: true } : void 0), { env: params.env });
			assertPreflightConfigUnchanged(selected, read.snapshot);
			const recovery = await measureDoctorConfigPreflightStep("admission.config-recovery", () => createConfigIO(recoveryOptions).prepareConfigRecovery(read.snapshot));
			if (Boolean(coreRecovery) !== Boolean(recovery)) throwStartupMigrationIdentityChanged();
			if (recovery) {
				assertPreflightConfigUnchanged(candidate, recovery.snapshot);
				read = {
					snapshot: recovery.snapshot,
					pluginMetadataSnapshot: recovery.pluginMetadataSnapshot
				};
			}
			if (read.snapshot.valid) await params.validateConfig?.(read.snapshot);
			if (params.beforeStatePreparation && !await measureDoctorConfigPreflightStep("admission.config-guard", () => params.beforeStatePreparation?.(read.snapshot))) throwStartupMigrationGuardRejected();
			if (read.snapshot.valid) {
				const { loadDeviceIdentityIfPresent } = await import("./device-identity-CvpIEFnM.mjs");
				loadDeviceIdentityIfPresent({ env: params.env });
			}
			return {
				...read,
				...recovery ? { recovery } : {}
			};
		} catch (error) {
			return rethrowStartupConfigFailure(error);
		}
	});
}
function assertPreflightConfigUnchanged(before, after) {
	const unreadable = [before, after].find(isConfigReadFailure);
	if (unreadable) throw createConfigReadError(unreadable.path, formatInvalidConfigDetails(unreadable.issues));
	const change = describeConfigSnapshotInputChange(before, after);
	if (change) throwStartupMigrationIdentityChanged(change);
}
/** Admission runs before lease acquisition: even acquiring a lease commits SQLite writes. */
async function assertStartupStateReady(params) {
	const { assertOpenClawDatabasesReady } = await measureDoctorConfigPreflightStep("admission.database-runtime-import", () => import("./openclaw-database-preflight-C1rXZ1NA.mjs"));
	const agentCount = listAgentIds(params.cfg).length;
	const admissionMetrics = { agentCount };
	await measureDoctorConfigPreflightStep("admission.database-readiness", () => assertOpenClawDatabasesReady({
		env: params.env,
		config: params.cfg,
		operation: "gateway-startup",
		onAgentInspection: (stats) => {
			Object.assign(admissionMetrics, stats);
		}
	}), void 0, () => admissionMetrics);
	const [{ assertSessionStoreMigrationComplete }, { resolveAllAgentSessionStoreCandidateTargetsSync }, { inspectOpenClawRegisteredAgentDatabases }] = await measureDoctorConfigPreflightStep("admission.session-runtime-import", () => Promise.all([
		import("./startup-migration-C0cmuwnr.mjs"),
		import("./targets-BnBbF677.mjs"),
		import("./openclaw-agent-db-registry-Df3At7RI.mjs")
	]));
	const registeredDatabases = await measureDoctorConfigPreflightStep("admission.agent-inventory", () => inspectOpenClawRegisteredAgentDatabases({
		env: params.env,
		includeIncompatibleSchemaVersions: true
	}));
	const targets = await measureDoctorConfigPreflightStep("admission.session-targets", () => resolveAllAgentSessionStoreCandidateTargetsSync(params.cfg, {
		env: params.env,
		registeredDatabases
	}).filter((target) => !readAgentDatabaseAdmissionRefusal(target.agentId, { env: params.env })), void 0, () => ({
		agentCount,
		registeredDatabaseCount: registeredDatabases.length
	}));
	await measureDoctorConfigPreflightStep("admission.session-readiness", () => assertSessionStoreMigrationComplete({
		...params,
		targets
	}), void 0, () => ({ targetCount: targets.length }));
	recordStartupMigrationWarnings(listAgentDatabaseAdmissionRefusals({ env: params.env }).map((refusal) => `${refusal.reason}\n${refusal.repairHint}`));
	const { assertConfiguredWorkspaceStateReady } = await measureDoctorConfigPreflightStep("admission.workspace-runtime-import", () => import("./workspace-state-dirs-OztDezt5.mjs"));
	await measureDoctorConfigPreflightStep("admission.workspace-readiness", () => assertConfiguredWorkspaceStateReady(params), void 0, () => ({ agentCount }));
}
//#endregion
export { readConfigPreflightSnapshot as a, readAdmittedConfigSnapshot as i, needsRefreshedPluginIndexPersistence as n, measureDoctorConfigPreflightStep as o, persistRefreshedPluginIndex as r, assertPreflightConfigUnchanged as t };
