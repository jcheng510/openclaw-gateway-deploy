import { r as collectNestedErrorCandidates } from "./error-coercion-1P2One0X.mjs";
import { t as UpdateSchemaRefusalError } from "./openclaw-update-schema-refusal-B87dYIxC.mjs";
import { t as formatCliCommand } from "./command-format-Cte1SWM4.mjs";
import { n as StartupMaintenanceRequiredError } from "./startup-maintenance-required-CNRZ_k46.mjs";
import { t as GatewayStateOwnerContentionError } from "./gateway-state-owner-CPG45dwV.mjs";
import { t as DoctorUnreadableStateDatabaseError } from "./state-repair-message-B5Bu99oR.mjs";
import { r as hasCommandProcessCleanupError } from "./exec-result-C1iGiwu0.mjs";
import { c as hasGatewayServiceStopUnsafeError } from "./service-inspection-error-C_WINlwy.mjs";
import { t as DoctorMaintenanceRefusalError } from "./update-doctor-result-BlDxecnI.mjs";
import { t as ConfigWritePostCommitError } from "./io.write-errors-DFZ36R-m.mjs";
import { n as GatewayLockError } from "./gateway-lock-DhA-3HKn.mjs";
import { t as ExecApprovalsMigrationRequiredError } from "./exec-approvals-migration-gate-Buu906aC.mjs";
import { t as DoctorStateMigrationRefusalError } from "./state-migrations.messages-DZiaEGjz.mjs";
//#region src/commands/doctor-maintenance-inspection.ts
/** Admission verdict for explicit Doctor maintenance before mutable repair. */
/** Admission has not opened repair writers; deferral cannot authorize any later work. */
function classifyDoctorMaintenanceRefusal(error) {
	const causes = collectNestedErrorCandidates(error);
	const refusal = causes.find((cause) => cause instanceof DoctorMaintenanceRefusalError && cause.refusal.kind === "data-at-risk");
	if (refusal) return refusal.refusal;
	if (hasGatewayServiceStopUnsafeError(error) || hasCommandProcessCleanupError(error)) return {
		kind: "data-at-risk",
		reason: "active-mutation"
	};
	if (causes.some((cause) => cause instanceof DoctorUnreadableStateDatabaseError)) return {
		kind: "data-at-risk",
		reason: "unreadable-state"
	};
	if (causes.some((cause) => cause instanceof DoctorStateMigrationRefusalError || cause instanceof StartupMaintenanceRequiredError || cause instanceof ExecApprovalsMigrationRequiredError || cause instanceof UpdateSchemaRefusalError)) return {
		kind: "data-at-risk",
		reason: "incomplete-migration"
	};
	if (causes.some((cause) => cause instanceof GatewayLockError || cause instanceof ConfigWritePostCommitError && cause.rollbackStatus !== "restored")) return {
		kind: "data-at-risk",
		reason: "gateway-state-unverified"
	};
	return {
		kind: "deferred",
		reason: causes.some((cause) => cause instanceof GatewayStateOwnerContentionError) ? "coordinator-contention" : "admission-unavailable"
	};
}
/** The same persisted-state admission protects completion and exceptional restoration. */
async function assertDoctorMaintenanceReady(cfg, env, log) {
	const { assertSessionStoreMigrationComplete } = await import("./startup-migration-C0cmuwnr.mjs");
	assertSessionStoreMigrationComplete({
		cfg,
		env,
		operation: "doctor"
	});
	const { assertOpenClawDatabasesReady } = await import("./openclaw-database-preflight-C1rXZ1NA.mjs");
	const { resolveConfiguredAgentDatabaseTargets } = await import("./targets-BnBbF677.mjs");
	await assertOpenClawDatabasesReady({
		env,
		config: cfg,
		operation: "doctor",
		onDeferredSchemaPublication: (publication) => log(publication.message),
		configuredAgentDatabaseTargets: resolveConfiguredAgentDatabaseTargets(cfg, { env })
	});
	const { assertConfiguredWorkspaceStateReady } = await import("./workspace-state-dirs-OztDezt5.mjs");
	await assertConfiguredWorkspaceStateReady({
		cfg,
		operation: "doctor"
	});
	const { assertNoPendingLegacyExecApprovals } = await import("./exec-approvals-migration-gate-DF6g3I2x.mjs");
	assertNoPendingLegacyExecApprovals({
		operation: "doctor",
		env
	});
}
/** Repair may have committed config before a later diagnostic failed. */
async function readDoctorMaintenanceRecoveryConfig(resources, env, log) {
	const { readConfigFileSnapshot } = await import("./config/config.js");
	return resources.run(async () => {
		const { config } = await readConfigFileSnapshot({
			skipPluginValidation: true,
			observe: false
		});
		await assertDoctorMaintenanceReady(config, env, log);
		return config;
	});
}
function assertDoctorMaintenanceInspection(inspection, env) {
	const kind = inspection.serviceUpdateVerdict?.kind;
	if (!inspection.blockMessage && (kind === "unavailable" || inspection.inspected && (kind === "owned" || kind === "absent" || inspection.offline === true))) return;
	const detail = inspection.blockMessage ?? inspection.serviceMutationSkipMessage ?? `Gateway service ownership or shutdown could not be verified. Run ${formatCliCommand("openclaw gateway status --deep", env)} and stop it through its service owner before retrying.`;
	const guidance = kind === "foreign" ? `Run ${formatCliCommand("openclaw gateway status --deep", env)} to locate the Gateway's installation, then run ${formatCliCommand("openclaw doctor --fix", env)} from that installation. The service was left unchanged.` : `Stop the Gateway service and other OpenClaw processes using this state, then run ${formatCliCommand("openclaw doctor --fix", env)} from an independent shell.`;
	throw new DoctorMaintenanceRefusalError(`Doctor could not enter maintenance. Error: ${detail} ${guidance}`, {
		kind: "data-at-risk",
		reason: "gateway-state-unverified"
	});
}
//#endregion
export { readDoctorMaintenanceRecoveryConfig as i, assertDoctorMaintenanceReady as n, classifyDoctorMaintenanceRefusal as r, assertDoctorMaintenanceInspection as t };
