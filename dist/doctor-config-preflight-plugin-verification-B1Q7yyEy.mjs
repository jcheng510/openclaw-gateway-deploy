import { o as resolveCompatibilityHostVersion } from "./version-BMuSsYfE.mjs";
import { f as shouldDeferConfiguredPluginInstallRepair } from "./update-phase-Ibh5Kd_i.mjs";
import { l as normalizePluginsConfig, u as resolveEffectiveEnableState } from "./config-state-D-KaEbbt.mjs";
import { b as formatPluginVerificationDiagnostic, h as buildDegradedPluginsFromVerificationFailures, m as PLUGIN_AVAILABILITY_POLICY, v as describePluginAvailabilityFailure } from "./discovery-BePzXbRd.mjs";
import { r as resolveUpdateRehearsalRoot } from "./update-rehearsal-paths-C4PfIK1q.mjs";
import { t as note } from "./note-BpWs6H5N.mjs";
import { o as measureDoctorConfigPreflightStep } from "./config-preflight-snapshot-D4KXv22P.mjs";
//#region src/commands/doctor-config-preflight-plugin-verification.ts
async function planStartupPluginVerification(params) {
	const { planStartupPluginConvergence } = await measureDoctorConfigPreflightStep("plugin-plan-import", () => import("./startup-plugin-convergence-plan-BJf0qpnx.mjs"), params.measure);
	return await measureDoctorConfigPreflightStep("plugin-plan", () => planStartupPluginConvergence({
		config: params.cfg,
		env: params.env
	}), params.measure);
}
function buildStartupPluginQuarantine(params) {
	return buildDegradedPluginsFromVerificationFailures(params.failures.filter((failure) => resolveEffectiveEnableState({
		id: failure.pluginId,
		origin: "global",
		config: normalizePluginsConfig(params.cfg.plugins),
		rootConfig: params.cfg
	}).enabled));
}
async function runDoctorPluginConvergence(params) {
	const plan = await planStartupPluginVerification(params);
	if (!plan.required) return { quarantinedPlugins: [] };
	const { inspectPluginMigrationAvailability } = await import("./plugin-migration-availability-akhti7eK.mjs");
	const isUpdateRehearsal = Boolean(resolveUpdateRehearsalRoot(params.env));
	if (isUpdateRehearsal) note("Plugin refresh deferred to live update finalization; the canary verifies copied plugin payloads without downloading replacements.", `Doctor ${PLUGIN_AVAILABILITY_POLICY.severity}s`);
	if (isUpdateRehearsal || shouldDeferConfiguredPluginInstallRepair(params.env)) {
		const payloads = await verifyStartupPluginPayloads(params, plan.installRecords);
		const { pending, ...migrationInspection } = await inspectPluginMigrationAvailability({
			...params,
			installRecords: plan.installRecords,
			deferInstallation: true
		});
		return {
			...payloads,
			migrationInspection,
			deferredPlugins: [...new Map([...payloads.deferredPlugins ?? [], ...pending].map((entry) => [entry.pluginId, entry])).values()]
		};
	}
	const { runPostCorePluginConvergence } = await measureDoctorConfigPreflightStep("plugin-convergence-import", () => import("./post-core-plugin-convergence-BwVg1_Y2.mjs"), params.measure);
	const convergence = await measureDoctorConfigPreflightStep("plugin-convergence", () => runPostCorePluginConvergence({
		cfg: params.cfg,
		env: params.env,
		compatibilityHostVersion: resolveCompatibilityHostVersion(params.env)
	}), params.measure);
	if (convergence.changes.length > 0) note(convergence.changes.map((entry) => `- ${entry}`).join("\n"), "Doctor changes");
	const notices = convergence.notices ?? [];
	if (notices.length > 0) note(notices.map((notice) => `- ${notice.message} ${notice.guidance.join(" ")}`.trim()).join("\n"), "Doctor notices");
	const warnings = convergence.warnings.map((warning) => `${warning.message} ${warning.guidance.join(" ")}`.trim());
	if (warnings.length > 0) note(warnings.map((warning) => `- ${warning}`).join("\n"), `Doctor ${PLUGIN_AVAILABILITY_POLICY.severity}s`);
	const quarantinedPlugins = buildStartupPluginQuarantine({
		cfg: params.cfg,
		failures: convergence.smokeFailures
	});
	const { pending, ...migrationInspection } = await inspectPluginMigrationAvailability({
		...params,
		installRecords: convergence.installRecords,
		deferInstallation: false
	});
	const deferredPlugins = new Map(pending.map((plugin) => [plugin.pluginId, plugin]));
	for (const warning of convergence.warnings) if (warning.pluginId) deferredPlugins.set(warning.pluginId, {
		...deferredPlugins.get(warning.pluginId),
		pluginId: warning.pluginId,
		reason: warning.reason,
		command: "openclaw update repair"
	});
	for (const plugin of quarantinedPlugins) deferredPlugins.set(plugin.pluginId, {
		...deferredPlugins.get(plugin.pluginId),
		pluginId: plugin.pluginId,
		reason: plugin.diagnostic.detail,
		command: "openclaw update repair"
	});
	return {
		...warnings.length > 0 ? { warnings } : {},
		quarantinedPlugins,
		...migrationInspection.requiredPluginIds.length > 0 || migrationInspection.inspectionRequiredPluginIds.length > 0 || migrationInspection.statelessPluginIds.length > 0 ? { migrationInspection } : {},
		...deferredPlugins.size > 0 ? { deferredPlugins: [...deferredPlugins.values()] } : {}
	};
}
async function refreshStartupPluginQuarantine(params) {
	const plan = await planStartupPluginVerification(params);
	if (!plan.required) return { quarantinedPlugins: [] };
	return verifyStartupPluginPayloads(params, plan.installRecords);
}
async function verifyStartupPluginPayloads(params, records) {
	const { runActivePluginPayloadSmokeCheck } = await measureDoctorConfigPreflightStep("plugin-payload-verification-import", () => import("./active-payload-verification-iaI5WFF4.mjs"), params.measure);
	const smoke = await measureDoctorConfigPreflightStep("plugin-payload-verification", () => runActivePluginPayloadSmokeCheck({
		cfg: params.cfg,
		records,
		env: params.env
	}), params.measure);
	const quarantinedPlugins = buildStartupPluginQuarantine({
		cfg: params.cfg,
		failures: smoke.failures
	});
	if (quarantinedPlugins.length > 0) note(quarantinedPlugins.map((plugin) => `- ${describePluginAvailabilityFailure(plugin.pluginId, formatPluginVerificationDiagnostic(plugin.diagnostic)).message}`).join("\n"), `Doctor ${PLUGIN_AVAILABILITY_POLICY.severity}s`);
	return {
		quarantinedPlugins,
		deferredPlugins: quarantinedPlugins.map((plugin) => ({
			pluginId: plugin.pluginId,
			reason: plugin.diagnostic.detail,
			command: "openclaw update repair"
		}))
	};
}
//#endregion
export { runDoctorPluginConvergence as n, refreshStartupPluginQuarantine as t };
