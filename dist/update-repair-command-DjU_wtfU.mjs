import { n as tryProcessCwd } from "./safe-cwd-DOxDm8mD.mjs";
import { r as defaultRuntime } from "./runtime-BC29JSZp.mjs";
import { b as resolveGatewayPort } from "./paths-CtO6iw0c.mjs";
import { t as formatCliCommand } from "./command-format-Cte1SWM4.mjs";
import { s as resolveOpenClawStateSqlitePath } from "./openclaw-state-db.paths-rJI64Ab5.mjs";
import "./update-run-timeouts-Byb-PlTk.mjs";
import { r as readPackageVersion } from "./package-json-7gGhB8Vf.mjs";
import { c as normalizeUpdateChannel, u as resolveEffectiveUpdateChannel } from "./update-channels-YuXTW0De.mjs";
import { n as compareSemverStrings, o as resolveNpmChannelTag } from "./update-check-CJv8Mjkn.mjs";
import { n as readBuiltGatewayBuildId } from "./update-git-runtime-CXZMwux0.mjs";
import { r as assertOpenClawStateWriteAllowedAtPath } from "./openclaw-state-ownership-1l-TMJat.mjs";
import { i as isUnacknowledgedPackageOwnerRefusal, n as isAbandonedUpdateRun, r as isAcknowledgedAbandonedUpdateRun } from "./update-run-record-BCEjJm1u.mjs";
import { r as assertConfigWriteAllowedInCurrentMode } from "./config-write-guard-DgZDKy-v.mjs";
import { c as readConfigFileSnapshot } from "./io.runtime-BOdk1dW9.mjs";
import "./config-D1R2igem.mjs";
import { a as isFreshUnacknowledgedAbandonedUpdateRun, n as inspectNewerRecoveryHistory, r as inspectUpdateRepairDriverAdmission, s as needsPostCoreRepair } from "./update-run-activity-8Zl-pDYm.mjs";
import { d as recordUpdateRunRepairContinuation, h as reconcileAbandonedUpdateRunsAsync, s as reconcilePackageOwnerRefusal, t as acknowledgeAbandonedUpdateRun } from "./update-run-ledger-C5c7VrBu.mjs";
import { c as listUpdateRuns } from "./update-run-reader-DZIHUks3.mjs";
import { i as UPDATE_RUN_ID_ENV } from "./update-control-plane-sentinel-CB0F6AWU.mjs";
import { c as parseUpdateTimeoutMs, f as resolveTargetVersion, p as resolveUpdateRoot } from "./shared-Dwr7djBO.mjs";
import { i as resolveServiceRefreshEnv } from "./update-command-service-env-QsECikj0.mjs";
import { a as resolveGatewayRestartProbeContext, n as confirmGatewayReachable, o as waitForGatewayHttpReadiness } from "./restart-health-probe-W2iSdUGi.mjs";
import { t as assertUpdateRecoveryAdmission } from "./update-run-recovery-admission-D2B4sqip.mjs";
import { t as updateFinalizeCommand } from "./update-command-finalize-BkvWZsOd.mjs";
//#region src/cli/update-cli/update-repair-command.ts
/** Public repair can clear a stale ledger without entering post-core maintenance. */
async function updateRepairCommand(opts) {
	const timeoutMs = parseUpdateTimeoutMs(opts.timeout);
	const env = resolveServiceRefreshEnv(process.env, tryProcessCwd());
	const options = {
		env,
		busyTimeoutMs: timeoutMs ?? 18e5
	};
	assertConfigWriteAllowedInCurrentMode({ env });
	await assertOpenClawStateWriteAllowedAtPath({
		databasePath: resolveOpenClawStateSqlitePath(env),
		env,
		recoverOrphanedSidecars: false
	});
	const activeRuns = listUpdateRuns({
		active: true,
		limit: 100
	}, options);
	const inheritedRunId = env[UPDATE_RUN_ID_ENV];
	const admission = inspectUpdateRepairDriverAdmission(activeRuns, inheritedRunId);
	if (admission.kind === "conflict") throw new Error(admission.message);
	const recentRuns = listUpdateRuns({ limit: 100 }, options);
	const historicalRuns = recentRuns.filter((run) => isAbandonedUpdateRun(run) && !isAcknowledgedAbandonedUpdateRun(run));
	if (admission.kind === "continuation") {
		const continuation = admission.run;
		recordUpdateRunRepairContinuation(continuation.runId, inheritedRunId, options);
		await updateFinalizeCommand(opts, [...activeRuns, ...historicalRuns].filter((run) => run.runId !== continuation.runId).map((run) => run.runId));
		return;
	}
	const lastRun = recentRuns[0];
	if (!activeRuns.length && !historicalRuns.length && opts.channel === void 0 && !opts.acceptCapabilities && lastRun && isUnacknowledgedPackageOwnerRefusal(lastRun)) {
		const snapshot = await readConfigFileSnapshot({ skipPluginValidation: true });
		const root = await resolveUpdateRoot();
		const installedVersion = await readPackageVersion(root);
		const { channel } = resolveEffectiveUpdateChannel({
			configChannel: normalizeUpdateChannel(lastRun.target.channel ?? snapshot.config.update?.channel),
			currentVersion: installedVersion,
			installKind: "package"
		});
		if (snapshot.valid && (channel !== "dev" || lastRun.target.tag)) {
			const targetVersion = lastRun.target.version ?? (lastRun.target.tag ? (await resolveTargetVersion(lastRun.target.tag, timeoutMs, { env })).version : (await resolveNpmChannelTag({
				channel,
				timeoutMs,
				env
			})).version);
			await assertUpdateRecoveryAdmission(options);
			const currentVersion = await readPackageVersion(root);
			const comparison = compareSemverStrings(currentVersion, targetVersion);
			if (comparison !== null && comparison >= 0) {
				assertConfigWriteAllowedInCurrentMode({ env });
				if (reconcilePackageOwnerRefusal(lastRun, options)) {
					reportRepairResult(opts, [lastRun.runId], `OpenClaw ${currentVersion} satisfies the package target ${targetVersion}. Acknowledged the package-owner refusal; no maintenance or service restart was needed.`);
					return;
				}
			}
		}
	}
	const recoveryRuns = activeRuns.length ? activeRuns : lastRun && isFreshUnacknowledgedAbandonedUpdateRun(lastRun) ? [lastRun] : [];
	const recoverySinceMs = recoveryRuns.length ? Math.min(...recoveryRuns.map((run) => run.createdAtMs)) : void 0;
	const history = inspectNewerRecoveryHistory(recoverySinceMs, recentRuns);
	const recoveryRunIds = [...new Set([
		...recoveryRuns,
		...historicalRuns,
		...history.postCoreRuns
	].map((run) => run.runId))];
	if (opts.channel !== void 0 || opts.acceptCapabilities || recoverySinceMs === void 0 || recoveryRunIds.length !== recoveryRuns.length || recoveryRuns.some(needsPostCoreRepair) || history.postCoreRuns.length > 0 || history.incomplete) {
		await updateFinalizeCommand(opts, recoveryRunIds);
		return;
	}
	if (!(await readConfigFileSnapshot({ skipPluginValidation: true })).valid) {
		await updateFinalizeCommand(opts, recoveryRunIds);
		return;
	}
	const context = await resolveGatewayRestartProbeContext(env);
	const port = resolveGatewayPort(context.config, env);
	const root = await resolveUpdateRoot();
	const [gateway, http, expectedVersion, expectedBuildId] = await Promise.all([
		confirmGatewayReachable({
			port,
			...context,
			env
		}),
		waitForGatewayHttpReadiness({
			config: context.config,
			port,
			attempts: 1,
			deadlineAt: Date.now() + Math.min(timeoutMs ?? 3e3, 3e3),
			delayMs: 0
		}),
		readPackageVersion(root),
		readBuiltGatewayBuildId(root)
	]);
	if (!gateway.reachable || !expectedVersion || !expectedBuildId || gateway.gatewayVersion !== expectedVersion || gateway.gatewayBuildId !== expectedBuildId || gateway.activatedPluginErrors.length || gateway.channelProbeErrors.length || http.healthz !== 200 || http.readyz !== 200) {
		await updateFinalizeCommand(opts, recoveryRunIds);
		return;
	}
	assertConfigWriteAllowedInCurrentMode({ env });
	const currentRuns = listUpdateRuns({
		active: true,
		limit: 100
	}, options);
	const currentAdmission = inspectUpdateRepairDriverAdmission(currentRuns, inheritedRunId);
	if (currentAdmission.kind === "conflict") throw new Error(currentAdmission.message);
	const currentHistory = inspectNewerRecoveryHistory(recoverySinceMs, listUpdateRuns({ limit: 100 }, options));
	if (currentRuns.some(needsPostCoreRepair) || currentHistory.postCoreRuns.length > 0 || currentHistory.incomplete) throw new Error(`Update history changed during inspection and now needs post-core maintenance. Retry ${formatCliCommand("openclaw update repair", env)}; if the managed Gateway cannot stop, run ${formatCliCommand("openclaw gateway stop", env)} first.`);
	const reconciled = activeRuns.length ? await reconcileAbandonedUpdateRunsAsync({
		explicit: true,
		runIds: activeRuns.map((run) => run.runId),
		requireAllActive: true,
		repairHistorySinceMs: recoverySinceMs
	}, options) : [];
	if (listUpdateRuns({
		active: true,
		limit: 1
	}, options).length) throw new Error("An update is still in progress; retry update repair after it finishes.");
	reportRepairResult(opts, recoveryRunIds.filter((runId) => acknowledgeAbandonedUpdateRun(runId, options)), reconciled.length ? `Gateway is healthy. Reconciled ${reconciled.length} abandoned update run${reconciled.length === 1 ? "" : "s"}. No maintenance or service restart was needed.` : "Gateway is healthy. Abandoned update runs are already reconciled. No maintenance or service restart was needed.");
}
function reportRepairResult(opts, reconciledRuns, message) {
	if (opts.json) defaultRuntime.writeJson({
		status: "ok",
		mode: "repair",
		restart: false,
		reconciledRuns,
		message
	});
	else defaultRuntime.log(message);
}
//#endregion
export { updateRepairCommand };
