import { c as isWindowsTaskSupervisorChildArgument, l as readWindowsTaskSupervisorRestartExitCode } from "../windows-task-supervisor-contract-DlaAkrWJ.mjs";
import { a as rewritePnpmVersionedOpenClawEntryPath } from "../openclaw-root-3-SBP6RS.mjs";
import { n as isTruthyEnvValue } from "../env-SuLFUnAK.mjs";
import { t as formatErrorMessage } from "../errors-YPvSaqwO.mjs";
import { t as isContainerEnvironment } from "../container-environment-e2wGNmXf.mjs";
import { E as writeRestartSentinelIfUnchanged, g as readRestartSentinelReadOnly, m as markUpdateRestartSentinelFailure } from "../restart-sentinel-B8oVBXRb.mjs";
import { _ as rotateAgentEventLifecycleGeneration } from "../agent-events-Cg4kQnvf.mjs";
import { p as markGatewayRestartDraining } from "../gateway-work-admission-B4bQUVQ6.mjs";
import { n as scheduleDetachedLaunchdRestartHandoff } from "../launchd-restart-handoff-BBI9c9JF.mjs";
import { n as consumeGatewayRestartIntentPayloadSync, r as consumeGatewayRestartIntentSync } from "../restart-intent-oQbHJaEn.mjs";
import { i as detectRespawnSupervisor, n as detectGatewayRespawnSupervisor, r as detectGatewayRespawnSupervisorIdentity } from "../supervisor-markers-C7Y6CSt4.mjs";
import { a as claimManagedServiceUpdateHandoff, f as requestManagedServiceUpdateHandoffPark, h as waitForSystemServiceUpdateHandoffs, i as captureForegroundUpdateHandoffStop, o as commitManagedServiceUpdateHandoff, r as cancelManagedServiceUpdateHandoff, s as completeForegroundUpdateHandoffAfterClose, u as isForegroundUpdateHandoff } from "../update-managed-service-handoff-BxBI1aee.mjs";
import { n as resolveGatewayRestartDrainTimeoutMs } from "../restart-budget-BrFMgEHj.mjs";
import { n as waitForGatewayHealthyRestart } from "../restart-health-BtnfWS3d.mjs";
import { a as getDiagnosticSessionActivitySnapshot } from "../diagnostic-run-activity-CwdtVcLR.mjs";
import { s as writeDiagnosticStabilityBundleForFailureSync } from "../diagnostic-stability-bundle-CKxznURo.mjs";
import { n as abortEmbeddedAgentRun } from "../runs-BSJKmITf.mjs";
import { n as listActiveEmbeddedRunSessionIds } from "../active-run-projections-Dk8tgs6I.mjs";
import { a as markGatewayRestartHandled, c as resetGatewayRestartStateForInProcessRestart, g as abortPendingChannelReloads, i as isGatewayRestartExternallyAllowed, l as rollbackGatewayRestartSignalAdmission, n as consumeGatewayRestartIntent, o as peekGatewayRestartReason, p as triggerOpenClawRestart, s as requestGatewayRestartWithSignalAdmission, t as consumeGatewayRestartAuthorization, u as scheduleGatewayRestart } from "../restart-CFTa2hH4.mjs";
import { i as writeGatewayRestartHandoffSync } from "../restart-handoff-qRX54lLk.mjs";
import { E as waitForActiveCronJobs, T as resetCronActiveJobs, t as advanceCronActiveJobGeneration } from "../active-jobs-CTCtrefd.mjs";
import { i as retireActiveCronTaskRunTracking, o as waitForActiveCronTaskRuns, t as abortActiveCronTaskRuns } from "../active-run-cancellation-CKD08Yo7.mjs";
import { f as resetAllLanes } from "../command-queue-Bf07l33f.mjs";
import { r as waitForGatewayActiveWork, t as createGatewayActiveWorkSnapshot } from "../gateway-active-work-DwtY5v4j.mjs";
import { c as resetGatewaySuspendCoordinatorForLifecycleRestart } from "../gateway-suspend-coordinator-Bu_30lLB.mjs";
import { spawn } from "node:child_process";
//#region src/infra/process-respawn.ts
function resolveGatewayRestartDecision() {
	if (isTruthyEnvValue(process.env.OPENCLAW_NO_RESPAWN)) return {
		mode: "disabled",
		reason: "no-respawn"
	};
	const supervisor = detectGatewayRespawnSupervisor(process.env);
	if (supervisor) return {
		mode: "supervised",
		supervisor
	};
	return {
		mode: "disabled",
		reason: "unmanaged",
		detail: process.platform === "win32" ? "win32: detached respawn unsupported without Scheduled Task markers" : isContainerEnvironment() ? "container: use in-process restart to keep PID 1 alive" : "unmanaged: use in-process restart to keep custom supervisor PID tracking stable"
	};
}
/**
* Attempt to restart this process with a fresh PID.
* - supervised environments (launchd/systemd/schtasks): caller should exit and let supervisor restart
* - OPENCLAW_NO_RESPAWN=1: caller should keep in-process restart behavior (tests/dev)
* - unmanaged environments: caller should keep in-process restart behavior so
*   custom supervisors keep tracking the same gateway PID
*/
function restartGatewayProcessWithFreshPid(opts = {}) {
	const decision = opts.decision ?? resolveGatewayRestartDecision();
	if (decision.mode === "disabled") return decision.reason === "no-respawn" ? { mode: "disabled" } : {
		mode: "disabled",
		detail: decision.detail
	};
	const { supervisor } = decision;
	if (supervisor === "launchd") {
		const handoff = scheduleDetachedLaunchdRestartHandoff({
			mode: "start-after-exit",
			waitForPid: process.pid
		});
		return handoff.ok ? {
			mode: "supervised",
			handoffSpawned: handoff.value
		} : {
			mode: "failed",
			detail: handoff.error
		};
	}
	if (supervisor === "schtasks") {
		if (process.argv.some(isWindowsTaskSupervisorChildArgument)) {
			const exitCode = readWindowsTaskSupervisorRestartExitCode(process.argv);
			if (exitCode === void 0) return {
				mode: "failed",
				detail: "Windows task supervisor restart marker is missing or invalid"
			};
			return {
				mode: "supervised",
				exitCode
			};
		}
		const restart = triggerOpenClawRestart();
		if (!restart.ok) return {
			mode: "failed",
			detail: restart.detail ?? `${restart.method} restart failed`
		};
	}
	return { mode: "supervised" };
}
/**
* Update restarts must replace the OS process so the new code runs from a
* fresh module graph after package files have changed on disk.
*
* The caller resolves supervisor ownership first; this path is only for an
* unmanaged process whose installed package contents have been replaced.
*/
function respawnGatewayProcessForUpdate(opts = {}) {
	const decision = opts.decision ?? resolveGatewayRestartDecision();
	if (decision.mode === "disabled" && decision.reason === "no-respawn") return {
		mode: "disabled",
		detail: "OPENCLAW_NO_RESPAWN"
	};
	try {
		const [entryArg, ...entryArgs] = process.argv.slice(1);
		const args = [
			...process.execArgv,
			...entryArg ? [rewritePnpmVersionedOpenClawEntryPath(entryArg)] : [],
			...entryArgs
		];
		const child = spawn(process.execPath, args, {
			env: opts.env ? {
				...process.env,
				...opts.env
			} : process.env,
			detached: true,
			stdio: "inherit"
		});
		child.on("error", () => {});
		child.unref();
		return {
			mode: "spawned",
			pid: child.pid ?? void 0,
			child
		};
	} catch (err) {
		return {
			mode: "failed",
			detail: formatErrorMessage(err)
		};
	}
}
//#endregion
//#region src/cli/gateway-cli/lifecycle.runtime.ts
async function stopGatewayManagedProviderLocalServices() {
	const { hasManagedProviderLocalServices } = await import("../provider-runtime-lifecycle-B_VEgtSV.mjs");
	if (!hasManagedProviderLocalServices()) return;
	const { stopManagedProviderLocalServices } = await import("../provider-local-service-D8lAM_YV.mjs");
	await stopManagedProviderLocalServices();
}
//#endregion
export { abortActiveCronTaskRuns, abortEmbeddedAgentRun, abortPendingChannelReloads, advanceCronActiveJobGeneration, cancelManagedServiceUpdateHandoff, captureForegroundUpdateHandoffStop, claimManagedServiceUpdateHandoff, commitManagedServiceUpdateHandoff, completeForegroundUpdateHandoffAfterClose, consumeGatewayRestartAuthorization, consumeGatewayRestartIntent, consumeGatewayRestartIntentPayloadSync, consumeGatewayRestartIntentSync, createGatewayActiveWorkSnapshot, detectGatewayRespawnSupervisor, detectGatewayRespawnSupervisorIdentity, detectRespawnSupervisor, getDiagnosticSessionActivitySnapshot, isForegroundUpdateHandoff, isGatewayRestartExternallyAllowed, listActiveEmbeddedRunSessionIds, markGatewayRestartDraining as markGatewayDraining, markGatewayRestartHandled, markUpdateRestartSentinelFailure, peekGatewayRestartReason, readRestartSentinelReadOnly, requestGatewayRestartWithSignalAdmission, requestManagedServiceUpdateHandoffPark, resetAllLanes, resetCronActiveJobs, resetGatewayRestartStateForInProcessRestart, resetGatewaySuspendCoordinatorForLifecycleRestart, resolveGatewayRestartDecision, resolveGatewayRestartDrainTimeoutMs, respawnGatewayProcessForUpdate, restartGatewayProcessWithFreshPid, retireActiveCronTaskRunTracking, rollbackGatewayRestartSignalAdmission, rotateAgentEventLifecycleGeneration, scheduleGatewayRestart, stopGatewayManagedProviderLocalServices, waitForActiveCronJobs, waitForActiveCronTaskRuns, waitForGatewayActiveWork, waitForGatewayHealthyRestart, waitForSystemServiceUpdateHandoffs, writeDiagnosticStabilityBundleForFailureSync, writeGatewayRestartHandoffSync, writeRestartSentinelIfUnchanged };
