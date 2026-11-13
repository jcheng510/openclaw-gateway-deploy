import { n as hasRetainedPluginRuntimeCloseError } from "./runtime-close-error-iDUxzBP6.mjs";
import { o as getOpenClawDatabaseMaintenanceScope } from "./openclaw-state-db-async-lifecycle-D4cx8OBO.mjs";
import { w as tryResolveConfiguredAgentWorkspaceDir } from "./agent-scope-config-Dm6T00l4.mjs";
import "./agent-scope-L_eY3Hj7.mjs";
import { r as countPendingDeliveryQueueEntriesReadOnly } from "./delivery-queue-sqlite-BLFBXqlF.mjs";
import "./delivery-queue-namespaces-DE2c296l.mjs";
import { r as listLegacyDeliveryQueueArtifacts } from "./delivery-queue-legacy-files-BUh-vm0t.mjs";
import { t as withLegacyMigrationStateLock } from "./state-migrations.lock-CsXieFvY.mjs";
//#region src/commands/doctor-outbound-delivery.ts
/** Doctor owns the retired raw queue; current delivery recovery never prepares old payloads. */
async function migrateDoctorDeliveryQueues(params) {
	const stateEnv = {
		...params.env,
		OPENCLAW_STATE_DIR: params.stateDir
	};
	if (listLegacyDeliveryQueueArtifacts(params.stateDir).length === 0 && await countPendingDeliveryQueueEntriesReadOnly([
		"outbound",
		"outbound-legacy-preparing-v1",
		"outbound-prepared-migration-v1"
	], stateEnv) === 0) return {
		changes: [],
		warnings: []
	};
	return withLegacyMigrationStateLock({
		stateDir: params.stateDir,
		env: params.env,
		label: "legacy delivery queues",
		releaseLabel: "Delivery queue",
		run: async (env) => {
			const { migrateLegacyDeliveryQueues } = await import("./state-migrations.storage-kpuyQ4ie.mjs");
			const imported = await migrateLegacyDeliveryQueues({ stateDir: params.stateDir });
			if (imported.warnings.length > 0 && imported.warningDisposition !== "recoverable") return imported;
			const { loadLegacyPendingDeliveries, loadPendingLegacyDeliveryPreparations, loadPendingDeliveryMigrations } = await import("./delivery-queue-storage-lBmy7VyO.mjs");
			const legacy = loadLegacyPendingDeliveries(params.stateDir);
			const preparations = loadPendingLegacyDeliveryPreparations(params.stateDir);
			if (legacy.length === 0 && preparations.length === 0 && loadPendingDeliveryMigrations(params.stateDir).length === 0) return imported;
			const { migrateLegacyPendingOutboundDeliveries } = await import("./delivery-queue-migration-CIvlp74l.mjs");
			const warnings = [...imported.warnings];
			const log = {
				info: (_message) => {},
				warn: (message) => warnings.push(message),
				error: (message) => warnings.push(message)
			};
			const migration = {
				cfg: params.cfg,
				stateDir: params.stateDir,
				log
			};
			const needsRuntime = legacy.length > 0 || preparations.some((entry) => entry.legacyPreparationState === "claimed");
			let result;
			if (needsRuntime) {
				const { loadGatewayStartupPluginPlanWithMetadata } = await import("./gateway-startup-plugin-loader-YslzBfkX.mjs");
				const { acquirePluginRegistryForInspection } = await import("./plugins/loader.js");
				const { createHookRunner } = await import("./hooks-DDz9qHFx.mjs");
				const { withPluginRegistryPreparationScope } = await import("./registry-lifecycle-ptjdVPo2.mjs");
				const { withPluginRuntimeRegistryScope } = await import("./gateway-request-scope-Bg1sYoWf.mjs");
				const workspaceDir = tryResolveConfiguredAgentWorkspaceDir(params.cfg);
				const { plan, metadataSnapshot } = loadGatewayStartupPluginPlanWithMetadata({
					config: params.cfg,
					workspaceDir,
					env
				});
				const maintenance = getOpenClawDatabaseMaintenanceScope();
				if (!maintenance) throw new Error("Outbound migration requires its maintenance resource owner");
				let inspection;
				let acquisitionFailure;
				maintenance.own({}, "agent-resources", async () => {
					if (inspection) try {
						await inspection.release();
					} catch (error) {
						if (hasRetainedPluginRuntimeCloseError(error)) throw error;
					}
					else if (hasRetainedPluginRuntimeCloseError(acquisitionFailure)) throw acquisitionFailure;
				});
				try {
					inspection = await acquirePluginRegistryForInspection({
						config: params.cfg,
						activationSourceConfig: params.cfg,
						env,
						workspaceDir,
						onlyPluginIds: [...plan.pluginIds],
						manifestRegistry: metadataSnapshot.manifestRegistry,
						discovery: metadataSnapshot.discovery,
						channelPluginLoadIntent: "full",
						runtimeSideEffects: true,
						throwOnLoadError: true
					});
				} catch (error) {
					acquisitionFailure = error;
					if (hasRetainedPluginRuntimeCloseError(error)) throw error;
					return {
						changes: imported.changes,
						warnings: [...warnings, `Legacy outbound delivery preparation deferred: ${String(error)}. Run openclaw doctor --fix after repairing the plugin.`],
						warningDisposition: "recoverable"
					};
				}
				const registry = inspection.registry;
				try {
					result = await withPluginRegistryPreparationScope(registry, () => withPluginRuntimeRegistryScope(registry, () => migrateLegacyPendingOutboundDeliveries({
						...migration,
						hookRunner: createHookRunner(registry, {
							logger: log,
							catchErrors: true
						})
					})));
				} catch (error) {
					const failures = [error];
					try {
						await inspection.release();
					} catch (releaseError) {
						failures.push(releaseError);
					}
					if (failures.length > 1) throw new AggregateError(failures, "Outbound migration and plugin disposal failed", { cause: error });
					throw error;
				}
				await inspection.release();
			} else result = await migrateLegacyPendingOutboundDeliveries(migration);
			if (result.remaining > 0) warnings.push(`${result.remaining} legacy outbound deliveries still require preparation. Run openclaw doctor --fix to retry.`);
			return {
				changes: [...imported.changes, ...result.moved > 0 ? [`Prepared ${result.moved} legacy outbound deliveries for current queue recovery`] : []],
				warnings,
				warningDisposition: "recoverable"
			};
		}
	});
}
//#endregion
export { migrateDoctorDeliveryQueues };
