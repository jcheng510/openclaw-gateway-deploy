import { w as parseStrictPositiveInteger } from "./number-coercion-Dq1l5muL.mjs";
import { r as resolveOpenClawPackageRootSync } from "./openclaw-root-3-SBP6RS.mjs";
import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { r as defaultRuntime } from "./runtime-BC29JSZp.mjs";
import { t as hasErrnoCode } from "./errno-FR4CRyya.mjs";
import { r as resolveStateDir } from "./state-dir-CfAW6S2K.mjs";
import "./paths-CtO6iw0c.mjs";
import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { a as createSqliteLifecycleAggregateError } from "./sqlite-lifecycle-errors-Q-hsFPSB.mjs";
import { t as VERSION } from "./version-BMuSsYfE.mjs";
import { s as resolveOpenClawStateSqlitePath } from "./openclaw-state-db.paths-rJI64Ab5.mjs";
import { c as hasActiveGatewayStateOwner } from "./gateway-state-owner-CPG45dwV.mjs";
import { n as runtimeProcessEntrypoints } from "./runtime-process-entrypoints-CbWx0yUe.mjs";
import { a as POST_CORE_UPDATE_RESULT_PATH_ENV, c as buildPostCoreHandoffEnv, n as POST_CORE_UPDATE_ENV, o as POST_CORE_UPDATE_SOURCE_CONFIG_PATH_ENV, r as POST_CORE_UPDATE_INSTALL_RECORDS_PATH_ENV, s as POST_CORE_UPDATE_STARTED_AT_ENV, t as POST_CORE_UPDATE_CHANNEL_ENV } from "./update-post-core-context-B2x24New.mjs";
import { n as UpdateFailureFactSchema } from "./update-run-schema-Ap8UiBpH.mjs";
import { dt as isUnfencedUpdateDriver } from "./openclaw-state-db-read-connection-DJObJIAO.mjs";
import { r as theme } from "./theme-DzaUZY4q.mjs";
import { r as hasCommandProcessCleanupError, t as CommandProcessCleanupError } from "./exec-result-C1iGiwu0.mjs";
import { a as getWindowsSystem32ExePath } from "./windows-install-roots--RziW4S3.mjs";
import { a as runUtf8CommandWithTimeout, n as runExec } from "./exec-Bjx7k3vE.mjs";
import { l as withCommandProcessScope } from "./exec-spawn-B_BFgGrb.mjs";
import { o as resolveExecutablePath } from "./executable-path-D8C96q25.mjs";
import { c as readJsonIfExists, h as writeJson } from "./json-files-Br8qKrAz.mjs";
import { r as readPackageVersion } from "./package-json-7gGhB8Vf.mjs";
import { c as normalizeUpdateChannel } from "./update-channels-YuXTW0De.mjs";
import { P as verifyPackageUpdateRecovery, n as compareSemverStrings } from "./update-check-CJv8Mjkn.mjs";
import { a as publishFileExclusive, c as sha256File } from "./directory-durability-fWp4i1Sl.mjs";
import { i as readGitRuntimeArtifactIdentity } from "./update-git-runtime-CXZMwux0.mjs";
import { n as updateInstallRootsMatch, t as resolveUpdateInstallRoot } from "./update-install-root-DH-onosx.mjs";
import { p as prepareOpenClawStateDatabaseRemoval } from "./openclaw-state-db-cache-IAib4pqp.mjs";
import { n as drainAgentDatabaseResources } from "./openclaw-agent-db-resources-DZhhXFbz.mjs";
import { v as ALLOW_OLDER_BINARY_DESTRUCTIVE_ACTIONS_ENV } from "./config-env-vars-C__rW8Th.mjs";
import { d as resolveConfigIncludesForRead, i as hashConfigRaw, o as normalizeConfigIoDeps, u as resolveConfigForRead } from "./io.read-helpers-CgQwh9G4.mjs";
import { f as isVerifiedUpdateRollback, s as classifyUpdateOutcome } from "./update-outcome-BHX5xsqd.mjs";
import { r as normalizeUpdateFailureFacts } from "./update-failure-facts-RzGaiYBm.mjs";
import { i as updateRunStepsFromResultStep, r as isUpdateGatewayReadinessPending } from "./update-run-step-BfCzkPVr.mjs";
import { a as createPluginInstallRecordMap, d as setPluginInstallRecordMapEntry, l as parsePluginInstallRecordMap, u as serializePluginInstallRecordMap } from "./installed-plugin-record-match-jRpkbRKW.mjs";
import { r as loadInstalledPluginIndexInstallRecords } from "./installed-plugin-index-record-reader-BKR65EEF.mjs";
import { o as assertConfigFileWritePathSnapshot } from "./io.warnings-AdNkx0te.mjs";
import { t as ConfigMutationConflictError } from "./mutation-conflict-Be0wSyDG.mjs";
import { c as collectUpdateDoctorFailureFacts, m as normalizeUpdatePostInstallDoctorWarnings, t as DoctorMaintenanceRefusalError } from "./update-doctor-result-BlDxecnI.mjs";
import { a as createManagedHandoffProcessIdentityReader } from "./update-managed-service-handoff-lease-1Q-bxDqA.mjs";
import { n as readPersistedInstalledPluginIndex } from "./installed-plugin-index-store-CUXGXwqh.mjs";
import { c as readConfigFileSnapshot } from "./io.runtime-BOdk1dW9.mjs";
import { c as withConfigMutationLock } from "./mutate-BrQ5d2nB.mjs";
import "./config-D1R2igem.mjs";
import { r as acquireGatewayLock } from "./gateway-lock-DhA-3HKn.mjs";
import { f as recordUpdateRunStep, v as UpdateRecoveryRequiredError } from "./update-run-ledger-C5c7VrBu.mjs";
import { i as getUpdateRun } from "./update-run-reader-DZIHUks3.mjs";
import { r as sanitizeTriageUpdateFailure } from "./triage-update-eoJDeooB.mjs";
import { u as writeUpdateRunReportArtifact } from "./update-failure-report-artifact-nsHdMhs6.mjs";
import { a as resolveManagedUpdateRequester, n as createManagedUpdateRequesterAuthority, r as createManagedUpdateRequesterContinuationAuthority } from "./update-requester-authority-jkN9ySi6.mjs";
import { t as resolveNodeRunner } from "./node-runner-DIokVayT.mjs";
import { o as closeOpenClawAgentDatabaseByPathAsync } from "./openclaw-agent-db-lifecycle-CCXA1nI8.mjs";
import { r as withPluginLifecycleLease } from "./plugin-lifecycle-lease-BgmqKrMY.mjs";
import { i as restorePersistedInstalledPluginIndexIfCurrent } from "./installed-plugin-index-store-write-COsuotm6.mjs";
import { o as writePersistedInstalledPluginIndexInstallRecordsWithLease } from "./installed-plugin-index-records-DHEAmSsp.mjs";
import { d as withUpdateCommandExecutorChild, p as UpdateCommandRecoveryPendingError, t as withUpdateCommandExecutor } from "./update-command-executor-B6yk9cYV.mjs";
import { a as buildControlPlaneUpdateRestartHealthPendingResult, c as readControlPlaneUpdateSentinelMeta, f as normalizeControlPlaneUpdateResult, i as UPDATE_RUN_ID_ENV, l as resolveManagedServiceUpdateFailureExitCode, n as CONTROL_PLANE_UPDATE_SENTINEL_META_ENV } from "./update-control-plane-sentinel-CB0F6AWU.mjs";
import { a as resolveGatewayInstallEntrypoint } from "./gateway-entrypoint-DTaXABcS.mjs";
import { y as supportsPostCoreExecutor } from "./package-update-activation-DaNpk9zG.mjs";
import { c as parseUpdateTimeoutMs } from "./shared-Dwr7djBO.mjs";
import { C as createUpdateCommandAuthority, a as recordUpdatePackageCompletion, c as resolveSettledUpdateCommandResult, i as publishUpdateCommandTerminalResult, t as deferUpdateCommandTerminalResult, u as captureUpdateCommandTerminalRecord } from "./update-command-terminal--2X6rdAF.mjs";
import { a as preparePostCorePluginConfig, i as persistValidatedDowngradeConfig, l as writePostCoreSourceConfigFile, o as readPostCorePreUpdateSourceConfig, t as capturePreUpdateSourceConfig } from "./update-command-config-BZhg-nUW.mjs";
import { c as releaseLegacySourceLock, i as runUpdateFinalizationDoctorInFreshProcess, n as settleUpdateDoctorMaintenance, r as completePostCorePluginUpdate, s as completeSourceUpdateRuntime, t as updatePluginsAfterCoreUpdate } from "./update-command-plugins-BU_OxQ0J.mjs";
import { m as resolveManagedGatewayServiceProcessEnv } from "./service-layout-BP96VEeH.mjs";
import { t as withGatewayServiceOperationLock } from "./service-operation-lock-CVHxlxU5.mjs";
import { n as resolveGatewayService } from "./service-Du2I2Kt4.mjs";
import { c as withOwnedManagedUpdateEnv, i as resolveServiceRefreshEnv, l as withUpdateEnv, s as stripGatewayServiceMarkerEnv, t as disableUpdatedPackageCompileCacheEnv } from "./update-command-service-env-QsECikj0.mjs";
import { t as readCurrentGitUpdateRecovery } from "./update-runner-git-recovery-DIk_H2Ti.mjs";
import { n as maybeStopManagedServiceBeforeMutableUpdate, o as revalidateManagedGatewayServiceAfterUpdate, t as createWindowsTaskAutoStartGuard, u as parkForegroundUpdateForActivation } from "./update-command-service-maintenance-DYkRssIw.mjs";
import { d as resolveGatewayServiceManagementBlockMessageForUpdate, l as readGatewayServiceStateForUpdate, m as resolveUpdatedGatewayRestartPort, n as GatewayServiceUpdateOwnershipError, s as isGatewayServiceManagementAllowedForUpdate } from "./update-command-service-plan-CyZKQiYX.mjs";
import { a as compensateOriginalManagedService, o as maybeRestartServiceAfterFailedMutableUpdate, p as isPackageManagerUpdateMode } from "./update-command-verification-DZ0ylhUs.mjs";
import { t as hasDeferredUpdateModelRetirement } from "./update-deferred-model-retirement-D7zJlOyx.mjs";
import { c as readUpdateStateSchemaVersions, f as updateStateSchemaVersionsMatch, s as readUpdateDatabaseGenerationsIsolated, u as resolveUpdateStateContentVersion } from "./update-candidate-state-DSdpv9IU.mjs";
import { r as readUpdateConfigSnapshot } from "./update-command-config-snapshot-DAFe1zyY.mjs";
import { a as collectPostCorePluginFailureFacts, i as collectPostCorePluginAdvisories, s as createPostCorePluginUpdateResult, t as appendPluginUpdateWarnings } from "./update-command-plugins-internals-DKt7rsYn.mjs";
import { n as recordPostCoreUpdateEvidence } from "./update-run-interruption-Xb91xMFs.mjs";
import { n as NativePackageRollbackError } from "./package-update-steps-DUyCf_no.mjs";
import { n as publishVerifiedSqliteFile } from "./sqlite-snapshot-DzSJnhxt.mjs";
import { r as readPackageUpdateIdentity } from "./update-command-package-Cji-DlW7.mjs";
import { r as loadUpdateRecovery, t as assertUpdateRecoveryAdmission } from "./update-run-recovery-admission-D2B4sqip.mjs";
import { t as verifyUpdateFailureRecovery } from "./update-command-failure-recovery-B3pbwmGc.mjs";
import { n as retireStandaloneGitWrapper } from "./update-command-git-Bj2GODC-.mjs";
import { d as prepareUpdateServiceResult, f as recordServiceReconciliationWarning, g as resolveAutomaticUpdateTriage, i as UpdateCommandPendingRecoveryFailure, l as markControlPlaneUpdateRestartSentinelFailureBestEffort, m as recordUpdateResultNextAction, n as UpdateCommandFailure, y as writeControlPlaneUpdateRestartSentinelBestEffort } from "./update-command-result-BUs0awIs.mjs";
import { i as tryInstallShellCompletion, n as resolvePostUpdateServiceStateReadEnv, r as shouldPrepareUpdatedInstallRestart, t as maybeRestartService } from "./update-command-service-3Zucy02m.mjs";
import { n as restoreGatewayServiceDefinitionBackup, r as verifyGatewayServiceDefinitionBackup } from "./service-definition-backup-CzOVpOLV.mjs";
import { t as createUpdateDatabaseBackup } from "./update-database-backup-D4G3cTh-.mjs";
import { i as readUpdateCandidateSource } from "./update-command-managed-context-BYvoN6HJ.mjs";
import fs from "node:fs";
import path from "node:path";
import fs$1 from "node:fs/promises";
import os from "node:os";
import { isDeepStrictEqual, stripVTControlCharacters } from "node:util";
import { spawn } from "node:child_process";
import { replaceFileAtomic } from "@openclaw/fs-safe/atomic";
//#region src/infra/update-timeout-provenance.ts
/** Keep a compatibility allowance for shipped receivers and retain the caller's intent. */
function createUpdateTimeoutHandoff(operatorTimeout, fallbackTimeoutMs) {
	return {
		completionOwner: "parent",
		timeout: {
			version: 1,
			serialized: operatorTimeout ?? String(Math.ceil(fallbackTimeoutMs / 1e3)),
			operator: operatorTimeout ?? null
		}
	};
}
/** Unknown or mismatched private input cannot remove a shipped caller's deadline. */
function isOmittedUpdateTimeout(serialized, handoff) {
	if (!serialized || !parseStrictPositiveInteger(serialized) || !isRecord(handoff)) return false;
	const timeout = handoff.timeout;
	return handoff.completionOwner === "parent" && isRecord(timeout) && timeout.version === 1 && timeout.operator === null && timeout.serialized === serialized;
}
//#endregion
//#region src/cli/update-cli/update-command-post-core.ts
const POST_CORE_UPDATE_RESULT_POLL_MS = 100;
const POST_CORE_UPDATE_STOP_GRACE_MS = 1e3;
const POST_CORE_CONFIG_WRITER_MIN_VERSION = "2026.4.29";
/** Restore operator intent only when the private handoff matches this child command. */
async function resolvePostCoreUpdateHandoff(params) {
	const handoff = params.resultPath ? await readJsonIfExists(path.join(path.dirname(params.resultPath), "handoff.json")) : void 0;
	let opts = typeof handoff?.sourceRuntimePrepared === "boolean" ? {
		...params.opts,
		sourceRuntimePrepared: handoff.sourceRuntimePrepared
	} : params.opts;
	if (opts.timeout !== void 0 && isOmittedUpdateTimeout(opts.timeout, handoff)) opts = {
		...opts,
		timeout: void 0
	};
	return {
		opts,
		parentOwnsCompletion: handoff?.completionOwner === "parent"
	};
}
async function writePostCoreUpdateFailureFile(filePath, error) {
	if (filePath) {
		const failureFacts = collectUpdateDoctorFailureFacts(error);
		const failure = sanitizeTriageUpdateFailure({ error: formatErrorMessage(error) }, {
			env: process.env,
			stateDir: resolveStateDir()
		});
		await writeJson(filePath, {
			status: "failed",
			error: failure.error,
			...failureFacts.length ? { failureFacts } : {}
		}, {
			trailingNewline: true,
			dirMode: 448
		});
	}
}
async function writePostCorePluginUpdateResultFile(filePath, result) {
	if (!filePath) return;
	await writeJson(filePath, result, {
		trailingNewline: true,
		dirMode: 448
	});
}
/** @internal exported for focused handoff contract tests. */
async function writePostCorePluginInstallRecordsFile(filePath, records) {
	await fs$1.writeFile(filePath, `${serializePluginInstallRecordMap(records)}\n`, "utf-8");
}
async function readPostCorePluginInstallRecordsFile(filePath) {
	if (!filePath) return;
	let raw;
	try {
		raw = await fs$1.readFile(filePath, "utf-8");
	} catch (err) {
		if (hasErrnoCode(err, "ENOENT")) return;
		throw new Error(`Unable to read plugin install records file: ${filePath}. Run openclaw doctor to inspect and repair plugin installation state.`, { cause: err });
	}
	let parsed;
	try {
		parsed = JSON.parse(raw);
	} catch (err) {
		throw new Error(`Malformed JSON in plugin install records file: ${filePath}. Run openclaw doctor to inspect and repair plugin installation state.`, { cause: err });
	}
	try {
		const records = parsePluginInstallRecordMap(parsed);
		if (!records) throw new Error("Invalid plugin install record map");
		return records;
	} catch (err) {
		throw new Error(`Invalid plugin install records in handoff file: ${filePath}. Run openclaw doctor to inspect and repair plugin installation state.`, { cause: err });
	}
}
async function readPostCoreUpdateResultFile(filePath) {
	try {
		const parsed = await readJsonIfExists(filePath);
		if (parsed?.status === "failed" && typeof parsed.error === "string") {
			const facts = UpdateFailureFactSchema.array().safeParse(parsed.failureFacts);
			return {
				status: "failed",
				error: parsed.error,
				...facts.success && facts.data.length ? { failureFacts: normalizeUpdateFailureFacts(facts.data) } : {}
			};
		}
		if (parsed && typeof parsed === "object" && (parsed.status === "ok" || parsed.status === "warning" || parsed.status === "skipped" || parsed.status === "error")) return parsed;
	} catch {
		return;
	}
}
async function stopPostCoreUpdateChild(child) {
	if (process.platform === "win32" && child.pid) try {
		await runExec(getWindowsSystem32ExePath("taskkill.exe"), [
			"/PID",
			String(child.pid),
			"/T",
			"/F"
		], {
			logOutput: false,
			timeoutMs: 5e3
		});
		return;
	} catch {
		child.kill();
		return;
	}
	child.kill();
}
/**
* Returns the stdio mode for the post-core-update child process.
*
* Windows shells (PowerShell/CMD) wait for all processes that hold inherited console handles to
* exit before returning the prompt, even after the immediate child has exited.  Using "pipe" on
* Windows prevents the child (and any grandchildren it spawns) from ever receiving a reference to
* the parent's console handles, eliminating the terminal hang seen in #78445.
*
* @internal exported for testing
*/
function resolvePostCoreUpdateChildStdio(platform = process.platform, jsonMode = false) {
	return platform === "win32" || jsonMode ? "pipe" : "inherit";
}
/** @internal exported for focused handoff contract tests. */
function preparePostCorePluginInstallRecordsForFreshProcess(params) {
	if (!params.targetVersion) return params.records;
	const runtimeComparison = compareSemverStrings(VERSION, params.targetVersion);
	if (runtimeComparison === null || runtimeComparison <= 0) return params.records;
	let changed = false;
	const next = createPluginInstallRecordMap();
	for (const [pluginId, record] of Object.entries(params.records)) {
		const installedVersion = record.resolvedVersion ?? record.version;
		const comparison = installedVersion ? compareSemverStrings(installedVersion, params.targetVersion) : null;
		if (record.source !== "npm" || comparison === null || comparison <= 0) {
			setPluginInstallRecordMapEntry(next, pluginId, record);
			continue;
		}
		const { resolvedSpec: _resolvedSpec, resolvedVersion: _resolvedVersion, ...rest } = record;
		setPluginInstallRecordMapEntry(next, pluginId, rest);
		changed = true;
	}
	return changed ? next : params.records;
}
async function continuePostCoreUpdateInFreshProcess(params) {
	const authority = createUpdateCommandAuthority({ opts: params.opts }, "Post-core update");
	authority.assertCurrent();
	const entryPath = await resolveGatewayInstallEntrypoint(params.root);
	authority.assertCurrent();
	if (!entryPath) return { resumed: false };
	const selectedNode = resolveExecutablePath(params.nodeRunner ?? resolveNodeRunner(), { useCache: false });
	if (!selectedNode) throw new Error("The selected Node executable is unavailable for post-core update.");
	const nodeRunner = await fs$1.realpath(selectedNode);
	authority.assertCurrent();
	const delegated = await supportsPostCoreExecutor(params.root, nodeRunner);
	authority.assertCurrent();
	if (delegated && (!authority.executorFence || !authority.runId)) throw new UpdateCommandRecoveryPendingError("Post-core update requires its live executor.");
	const baseEnv = stripGatewayServiceMarkerEnv(disableUpdatedPackageCompileCacheEnv(process.env));
	if (!delegated && params.opts.acceptCapabilities) {
		const { stdout } = await runExec(nodeRunner, [
			entryPath,
			"update",
			"--help"
		], {
			baseEnv,
			logOutput: false,
			timeoutMs: params.timeoutMs
		});
		authority.assertCurrent();
		if (!/^[\t ]*--accept-capabilities(?:[\t ]|$)/m.test(stripVTControlCharacters(stdout))) return { resumed: false };
	}
	const argv = [entryPath, "update"];
	if (params.opts.json) argv.push("--json");
	if (params.opts.restart === false) argv.push("--no-restart");
	if (params.opts.yes) argv.push("--yes");
	if (params.opts.acceptCapabilities) argv.push("--accept-capabilities");
	const handoff = {
		...createUpdateTimeoutHandoff(params.opts.timeout, params.timeoutMs),
		sourceRuntimePrepared: params.sourceRuntimePrepared
	};
	const serializedTimeout = handoff.timeout.serialized;
	argv.push("--timeout", serializedTimeout);
	const resultDir = await fs$1.mkdtemp(path.join(os.tmpdir(), "openclaw-update-post-core-"));
	const resultPath = path.join(resultDir, "plugins.json");
	const installRecordsPath = path.join(resultDir, "plugin-install-records.json");
	const sourceConfigPath = path.join(resultDir, "source-config.json");
	const postCoreHostVersion = await readPackageVersion(params.root);
	authority.assertCurrent();
	const pluginInstallRecords = preparePostCorePluginInstallRecordsForFreshProcess({
		records: params.pluginInstallRecords,
		targetVersion: postCoreHostVersion
	});
	let tentativePluginIndex;
	let childSettled = true;
	const restoreTentativePluginIndex = async () => {
		const tentative = tentativePluginIndex;
		if (!tentative) return;
		authority.assertCurrent();
		await withPluginLifecycleLease({ assertCurrent: authority.assertCurrent }, async (lease) => {
			await restorePersistedInstalledPluginIndexIfCurrent(tentative.previous, tentative.revision, { lease });
		});
		authority.assertCurrent();
		tentativePluginIndex = void 0;
	};
	try {
		if (pluginInstallRecords && pluginInstallRecords !== params.pluginInstallRecords) {
			await withPluginLifecycleLease({ assertCurrent: authority.assertCurrent }, async (lease) => {
				tentativePluginIndex = await writePersistedInstalledPluginIndexInstallRecordsWithLease(pluginInstallRecords, {
					...params.preUpdateConfig ? { config: params.preUpdateConfig.sourceConfig } : {},
					lease
				});
			});
			authority.assertCurrent();
		}
		await writePostCorePluginInstallRecordsFile(installRecordsPath, pluginInstallRecords);
		await writePostCoreSourceConfigFile(sourceConfigPath, params.preUpdateConfig);
		await writeJson(path.join(resultDir, "handoff.json"), handoff, { dirMode: 448 });
		const jsonMode = params.opts.json === true;
		const childStdio = resolvePostCoreUpdateChildStdio(process.platform, jsonMode);
		const handoffEnv = buildPostCoreHandoffEnv({
			baseEnv,
			compatHostVersion: postCoreHostVersion,
			requestedChannel: params.requestedChannel,
			sourceConfigPath: params.preUpdateConfig ? sourceConfigPath : void 0
		});
		const sentinelMeta = await readControlPlaneUpdateSentinelMeta(baseEnv);
		authority.assertCurrent();
		if (sentinelMeta?.root) {
			const sentinelPath = path.join(resultDir, "sentinel-meta.json");
			const sentinel = {
				version: 1,
				meta: {
					...sentinelMeta,
					root: resolveUpdateInstallRoot(params.root)
				}
			};
			await fs$1.writeFile(sentinelPath, JSON.stringify(sentinel), { mode: 384 });
			handoffEnv[CONTROL_PLANE_UPDATE_SENTINEL_META_ENV] = sentinelPath;
		}
		authority.assertCurrent();
		await releaseLegacySourceLock(params.root, params.opts.run?.sourceArtifactLock);
		const childEnv = {
			...handoffEnv,
			OPENCLAW_UPDATE_IN_PROGRESS: "1",
			...params.opts.run ? { [UPDATE_RUN_ID_ENV]: params.opts.run.runId } : {},
			[POST_CORE_UPDATE_ENV]: "1",
			[POST_CORE_UPDATE_CHANNEL_ENV]: params.channel,
			[POST_CORE_UPDATE_RESULT_PATH_ENV]: resultPath,
			[POST_CORE_UPDATE_INSTALL_RECORDS_PATH_ENV]: installRecordsPath,
			[POST_CORE_UPDATE_STARTED_AT_ENV]: String(params.updateStartedAtMs)
		};
		authority.assertCurrent();
		if (delegated && authority.executorFence && authority.runId) {
			const { executorFence, runId } = authority;
			const child = await withUpdateCommandExecutorChild(executorFence, params.root, async (executor, bindChild) => {
				const input = {
					executor,
					runId,
					root: params.root,
					requester: authority.requester?.requester,
					opts: {
						json: params.opts.json,
						restart: params.opts.restart,
						yes: params.opts.yes,
						acceptCapabilities: params.opts.acceptCapabilities,
						timeout: serializedTimeout
					}
				};
				const result = await runUtf8CommandWithTimeout([
					nodeRunner,
					path.join(params.root, "dist", runtimeProcessEntrypoints.updateMigratedFinalize.distWorkerPath),
					"--post-core"
				], {
					cwd: params.root,
					baseEnv: {},
					env: childEnv,
					input: JSON.stringify(input),
					beforeInput: (pid, spawnedArgv) => {
						authority.assertRequesterCurrent();
						bindChild(pid, spawnedArgv);
					},
					timeoutMs: params.opts.run?.activationTimeoutMs,
					killProcessTree: true,
					requireProcessTreeExtinction: true,
					maxOutputBytes: 65536,
					outputCapture: "tail",
					onOutputChunk: (chunk, stream) => {
						(stream === "stdout" && !jsonMode ? process.stdout : process.stderr).write(chunk);
					}
				});
				if (result.cleanup === "forced" || result.cleanup === "uncertain") throw new CommandProcessCleanupError();
				return result;
			});
			authority.assertCurrent();
			const result = await readPostCoreUpdateResultFile(resultPath);
			authority.assertCurrent();
			if (!result) {
				if (await fs$1.lstat(`${resultPath}.pending`).catch((error) => {
					if (hasErrnoCode(error, "ENOENT")) return;
					throw error;
				})) throw new CommandProcessCleanupError();
			}
			if (child.code !== 0 || child.termination !== "exit" || !result || result.status === "failed") {
				await restoreTentativePluginIndex();
				return {
					resumed: false,
					exitCode: child.code || 1,
					error: result?.status === "failed" ? result.error : child.stderr || "Post-core update did not confirm completion.",
					...result?.status === "failed" && result.failureFacts ? { failureFacts: result.failureFacts } : {}
				};
			}
			tentativePluginIndex = void 0;
			return {
				resumed: true,
				pluginUpdate: result
			};
		}
		const child = spawn(nodeRunner, argv, {
			cwd: params.root,
			stdio: childStdio,
			env: childEnv
		});
		if (childStdio === "pipe") {
			child.stdout?.pipe(jsonMode ? process.stderr : process.stdout);
			child.stderr?.pipe(process.stderr);
		}
		const childResult = await new Promise((resolve, reject) => {
			let closed = false;
			let exited = false;
			let committed;
			let childError;
			let terminationError;
			let termination = Promise.resolve();
			let forceStop;
			const resultPoll = setInterval(() => {
				readPostCoreUpdateResultFile(resultPath).then((pluginUpdate) => {
					if (closed || exited || committed || childError || !pluginUpdate || pluginUpdate.status === "failed") return;
					committed = pluginUpdate;
					tentativePluginIndex = void 0;
					clearInterval(resultPoll);
					if (process.platform !== "win32") {
						forceStop = setTimeout(() => {
							if (child.exitCode === null && child.signalCode === null) try {
								child.kill("SIGKILL");
							} catch (error) {
								terminationError = error;
							}
						}, POST_CORE_UPDATE_STOP_GRACE_MS);
						forceStop.unref();
					}
					termination = Promise.resolve().then(() => {
						if (!exited) return stopPostCoreUpdateChild(child);
					}).catch((error) => {
						terminationError = error;
					});
				}).catch(() => void 0);
			}, POST_CORE_UPDATE_RESULT_POLL_MS);
			child.once("error", (error) => {
				childError = error;
			});
			child.once("exit", () => {
				exited = true;
				clearInterval(resultPoll);
			});
			child.once("close", (code, signal) => {
				closed = true;
				clearInterval(resultPoll);
				clearTimeout(forceStop);
				termination.then(async () => {
					const finalResult = committed ?? await readPostCoreUpdateResultFile(resultPath);
					if (finalResult && finalResult.status !== "failed") {
						tentativePluginIndex = void 0;
						resolve({
							kind: "plugin-update",
							pluginUpdate: finalResult
						});
					} else if (terminationError) reject(new Error("Post-core writer termination failed", { cause: terminationError }));
					else if (childError) reject(childError);
					else if (signal) reject(/* @__PURE__ */ new Error(`post-update process terminated by signal ${signal}`));
					else resolve({
						kind: "exit",
						exitCode: code ?? 1
					});
				}).catch(reject);
			});
		});
		const postCoreResult = childResult.kind === "plugin-update" ? childResult.pluginUpdate : await readPostCoreUpdateResultFile(resultPath);
		authority.assertCurrent();
		const exitCode = childResult.kind === "exit" ? childResult.exitCode : 0;
		if (postCoreResult?.status === "failed") {
			await restoreTentativePluginIndex();
			return {
				resumed: false,
				exitCode: exitCode || 1,
				error: postCoreResult.error,
				...postCoreResult.failureFacts ? { failureFacts: postCoreResult.failureFacts } : {}
			};
		}
		const pluginUpdate = postCoreResult;
		if (exitCode !== 0) {
			if (pluginUpdate) return {
				resumed: true,
				pluginUpdate
			};
			await restoreTentativePluginIndex();
			return {
				resumed: false,
				exitCode
			};
		}
		return {
			resumed: true,
			...pluginUpdate ? { pluginUpdate } : {}
		};
	} catch (error) {
		if (hasCommandProcessCleanupError(error)) {
			childSettled = false;
			throw error;
		}
		try {
			await restoreTentativePluginIndex();
		} catch (rollbackError) {
			throw new Error("Post-core update failed and could not restore the previous plugin index", { cause: rollbackError });
		}
		throw error;
	} finally {
		if (childSettled) await fs$1.rm(resultDir, {
			recursive: true,
			force: true
		}).catch(() => void 0);
	}
}
function shouldResumePostCoreUpdateInFreshProcess(params) {
	const { result } = params;
	if (result.status !== "ok" || params.downgradeRisk && (compareSemverStrings(result.after?.version ?? "", POST_CORE_CONFIG_WRITER_MIN_VERSION) ?? -1) < 0) return false;
	if (params.installKindChanged === true || isPackageManagerUpdateMode(result.mode)) return true;
	return result.mode === "git";
}
//#endregion
//#region src/cli/update-cli/update-command-resume.ts
async function resumePostCoreUpdate(params) {
	try {
		const env = { ...process.env };
		const runId = env[UPDATE_RUN_ID_ENV]?.trim();
		let parent;
		let parentError;
		if (runId && !params.opts.run) try {
			parent = createManagedHandoffProcessIdentityReader({ env }).processIdentity(process.ppid);
		} catch (error) {
			parentError = error;
		}
		const { opts, parentOwnsCompletion } = await resolvePostCoreUpdateHandoff({
			opts: params.opts,
			resultPath: process.env[POST_CORE_UPDATE_RESULT_PATH_ENV]
		});
		const resumed = {
			...params,
			opts,
			parentOwnsCompletion
		};
		const record = runId && !params.opts.run && !parentOwnsCompletion ? getUpdateRun(runId, { env }) : void 0;
		if (runId && !params.opts.run && !parentOwnsCompletion && !record) throw new UpdateCommandRecoveryPendingError("Post-core update run is unavailable; resume cannot verify its owner.");
		let completed;
		if (runId && record && isUnfencedUpdateDriver(record.before.version)) {
			if (!parent) throw new UpdateCommandRecoveryPendingError("Legacy package parent identity is unavailable.", { cause: parentError });
			const inPostCore = (current) => current?.status === "running" && current.steps.findLast((entry) => entry.step === "openclaw doctor")?.status === "completed" && current.steps.findLast((entry) => entry.step === "post-update verification")?.status === "in_progress";
			const root = resolveUpdateInstallRoot(params.root);
			const executingRoot = resolveOpenClawPackageRootSync({ moduleUrl: import.meta.url });
			if (!inPostCore(record) || !executingRoot || resolveUpdateInstallRoot(executingRoot) !== root) throw new UpdateCommandRecoveryPendingError("Legacy post-core update does not match its running installation.");
			const meta = await readControlPlaneUpdateSentinelMeta(env);
			const managedHandoff = env.OPENCLAW_UPDATE_RUN_HANDOFF === "1" || Boolean(meta?.handoffId || meta?.root);
			if (meta?.runId && meta.runId !== runId || managedHandoff && (!meta?.runId || !meta.handoffId || !meta.root)) throw new UpdateCommandRecoveryPendingError("Legacy managed post-core handoff is incomplete or names another update run.");
			if (meta?.handoffId && meta.root) {
				const { assertManagedServiceUpdateHandoffRoot } = await import("./update-managed-service-handoff-DybShBrM.mjs");
				await assertManagedServiceUpdateHandoffRoot({
					expectedRoot: meta.root,
					root,
					executingRoot,
					postCore: true
				});
			}
			completed = await withUpdateCommandExecutor(runId, async (executor) => {
				const fence = await executor.enter(root);
				const requester = resolveManagedUpdateRequester(record.origin.requester);
				const requesterAuthority = requester?.authorizationSource?.startsWith("profile:") ? await createManagedUpdateRequesterContinuationAuthority(requester, {
					runId,
					executor: fence
				}, env) : requester ? await createManagedUpdateRequesterAuthority(requester, env) : void 0;
				fence.assertCurrent();
				const current = getUpdateRun(runId, { env });
				if (!inPostCore(current) || current?.createdAtMs !== record.createdAtMs) throw new UpdateCommandRecoveryPendingError("Legacy post-core update changed during admission.");
				return await resumePostCoreUpdateInternal({
					...resumed,
					opts: {
						...opts,
						run: {
							runId,
							env,
							executorFence: fence,
							...requesterAuthority ? { requesterAuthority } : {}
						}
					}
				});
			}, {
				legacyPackageParent: parent,
				...meta?.handoffId && meta.root ? { legacyPackageHandoff: {
					handoffId: meta.handoffId,
					root: meta.root
				} } : {}
			});
		} else completed = await resumePostCoreUpdateInternal(resumed);
		const { pluginUpdate, result, assertRequesterCurrent } = completed;
		assertRequesterCurrent();
		if (process.env["OPENCLAW_UPDATE_POST_CORE_RESULT_PATH"]) await writePostCorePluginUpdateResultFile(process.env[POST_CORE_UPDATE_RESULT_PATH_ENV], pluginUpdate);
		if (params.opts.json && !process.env["OPENCLAW_UPDATE_POST_CORE_RESULT_PATH"]) defaultRuntime.writeJson(result);
	} catch (error) {
		await writePostCoreUpdateFailureFile(process.env[POST_CORE_UPDATE_RESULT_PATH_ENV], error).catch((writeError) => defaultRuntime.error(`Could not save post-update failure: ${String(writeError)}`));
		throw error;
	}
	if (!params.opts.run?.executorFence) defaultRuntime.exit(0);
}
async function resumePostCoreUpdateInternal(params) {
	const runId = process.env[UPDATE_RUN_ID_ENV]?.trim();
	const postCoreUpdate = process.env[POST_CORE_UPDATE_ENV] === "1";
	const { assertCurrent, assertRequesterCurrent } = createUpdateCommandAuthority({ opts: params.opts }, "Post-core update");
	assertCurrent?.();
	if (params.channel !== "stable" && params.channel !== "extended-stable" && params.channel !== "beta" && params.channel !== "dev") throw new Error("Missing post-core update channel context.");
	const channel = params.channel;
	const requestedChannelInput = process.env["OPENCLAW_UPDATE_POST_CORE_REQUESTED_CHANNEL"]?.trim() ?? "";
	const requestedChannel = requestedChannelInput ? normalizeUpdateChannel(requestedChannelInput) : null;
	if (requestedChannelInput && !requestedChannel) throw new Error("Invalid post-core requested update channel context.");
	process.env.OPENCLAW_COMPATIBILITY_HOST_VERSION = await readPackageVersion(params.root) ?? VERSION;
	assertCurrent?.();
	const { parentOwnsCompletion } = params;
	let maintenance;
	let outcome;
	let producedPluginUpdate;
	try {
		outcome = { pluginUpdate: await withCommandProcessScope(async () => {
			const doctorWarnings = [];
			const recordDoctorWarnings = (additionalWarnings = []) => {
				const warnings = [...additionalWarnings, ...doctorWarnings.map((warning) => warning.message)];
				if (!postCoreUpdate || !runId || warnings.length === 0) return;
				try {
					recordPostCoreUpdateEvidence(runId, { warnings });
				} catch (error) {
					defaultRuntime.error(`Post-core update evidence could not be saved: ${formatErrorMessage(error)} Update completion may require Doctor verification.`);
				}
			};
			const onDoctorWarnings = (warnings) => {
				doctorWarnings.push(...warnings.map((message) => ({
					reason: "doctor-advisory",
					message,
					guidance: ["Run `openclaw doctor --fix` after repairing the plugin."]
				})));
				recordDoctorWarnings();
			};
			const { beginDoctorMaintenance } = await import("./doctor-maintenance-D5eCzZ_2.mjs");
			assertCurrent?.();
			maintenance = await beginDoctorMaintenance({
				root: parentOwnsCompletion ? null : params.root,
				options: {
					repair: true,
					nonInteractive: true,
					json: params.opts.json
				},
				runtime: {
					...defaultRuntime,
					log: defaultRuntime.error
				},
				...params.opts.run ? { assertCurrent } : {}
			});
			assertCurrent?.();
			await maintenance?.releaseState();
			await withPluginLifecycleLease({ assertCurrent }, async (lease) => {
				await completeSourceUpdateRuntime({
					root: params.root,
					sourceRuntimePrepared: params.opts.sourceRuntimePrepared,
					timeoutMs: params.timeoutMs,
					lease,
					beforePersistentEffect: assertCurrent
				});
			});
			assertCurrent?.();
			if (!parentOwnsCompletion) {
				const warning = await runUpdateFinalizationDoctorInFreshProcess({
					opts: params.opts,
					phase: "post-plugin",
					assertCurrent,
					root: params.root,
					yes: params.opts.yes === true,
					json: params.opts.json === true,
					timeoutMs: params.timeoutMs,
					onWarnings: onDoctorWarnings
				});
				if (warning) {
					doctorWarnings.push(warning);
					recordDoctorWarnings();
				}
			}
			const configSnapshot = await readConfigFileSnapshot({
				skipPluginValidation: true,
				suppressFutureVersionWarning: true,
				observe: false
			});
			const updateStartedAtMs = parseStrictPositiveInteger(process.env["OPENCLAW_UPDATE_POST_CORE_STARTED_AT_MS"] ?? "");
			const preUpdateSourceConfig = await readPostCorePreUpdateSourceConfig({
				sourceConfigPath: process.env[POST_CORE_UPDATE_SOURCE_CONFIG_PATH_ENV],
				currentSnapshot: configSnapshot,
				updateStartedAtMs
			});
			const parentPluginInstallRecords = await readPostCorePluginInstallRecordsFile(process.env[POST_CORE_UPDATE_INSTALL_RECORDS_PATH_ENV]);
			assertCurrent?.();
			let { pluginUpdate } = await convergePostCoreUpdatePlugins({
				...params,
				channel,
				requestedChannel,
				preUpdateConfig: preUpdateSourceConfig,
				parentPluginInstallRecords,
				updateStartedAtMs,
				assertCurrent
			});
			producedPluginUpdate = pluginUpdate;
			if (!parentOwnsCompletion) {
				pluginUpdate = (await completePostCorePluginUpdate({
					root: params.root,
					opts: params.opts,
					pluginUpdate,
					freshDoctorRequired: pluginUpdate.changed,
					assertCurrent,
					yes: params.opts.yes === true,
					json: params.opts.json === true,
					timeoutMs: params.timeoutMs,
					onWarnings: onDoctorWarnings
				})).pluginUpdate;
				recordDoctorWarnings(collectPostCorePluginAdvisories(pluginUpdate));
			}
			const finalSnapshot = await readConfigFileSnapshot({ observe: false });
			assertCurrent?.();
			await persistValidatedDowngradeConfig(finalSnapshot, assertCurrent);
			assertCurrent?.();
			return doctorWarnings.length ? {
				...pluginUpdate,
				status: pluginUpdate.status === "error" ? "error" : "warning",
				warnings: [...pluginUpdate.warnings ?? [], ...doctorWarnings]
			} : pluginUpdate;
		}) };
	} catch (error) {
		outcome = error instanceof DoctorMaintenanceRefusalError && error.refusal.kind === "deferred" ? { pluginUpdate: {
			...producedPluginUpdate ?? createPostCorePluginUpdateResult({ status: "warning" }),
			status: "warning",
			warnings: [...producedPluginUpdate?.warnings ?? [], {
				reason: "doctor-advisory",
				message: error.message,
				guidance: ["After other OpenClaw processes release state, run `openclaw doctor --fix`."]
			}]
		} } : { error };
	}
	if (maintenance) {
		const owned = maintenance;
		outcome = await settleUpdateDoctorMaintenance(outcome, async () => owned.finish((await readConfigFileSnapshot({
			skipPluginValidation: true,
			observe: false
		})).config), () => owned.release(), "Post-core update and service restoration failed");
	}
	if ("error" in outcome) throw outcome.error;
	const { pluginUpdate } = outcome;
	assertCurrent?.();
	const result = {
		status: pluginUpdate.status === "error" ? "error" : "ok",
		mode: "unknown",
		root: params.root,
		runId,
		steps: pluginUpdate.doctorLint ? [pluginUpdate.doctorLint] : [],
		durationMs: 0,
		postUpdate: { plugins: pluginUpdate }
	};
	if (postCoreUpdate && runId) try {
		recordPostCoreUpdateEvidence(runId, {
			candidate: pluginUpdate.status !== "error" ? await readPackageUpdateIdentity(params.root) : void 0,
			warnings: collectPostCorePluginAdvisories(pluginUpdate),
			doctorLint: pluginUpdate.doctorLint
		});
		if (!parentOwnsCompletion && pluginUpdate.doctorLint) {
			const reportPath = await writeUpdateRunReportArtifact({
				result,
				detached: true,
				report: { markdown: "Post-plugin Doctor diagnostics; update completion is pending with the parent updater." }
			});
			defaultRuntime.error(`Post-plugin Doctor report (update completion pending): ${reportPath}`);
		}
	} catch (error) {
		defaultRuntime.error(`Post-core update evidence could not be saved: ${formatErrorMessage(error)} Update completion may require Doctor verification.`);
	}
	assertCurrent?.();
	return {
		pluginUpdate,
		result,
		assertRequesterCurrent
	};
}
/** Shared plugin producer; entry points retain runtime preparation and completion ownership. */
async function convergePostCoreUpdatePlugins(params) {
	const { assertCurrent } = params;
	assertCurrent?.();
	return await withPluginLifecycleLease({ assertCurrent }, async () => {
		const preparedConfig = await preparePostCorePluginConfig({
			requestedChannel: params.requestedChannel,
			preUpdateConfig: params.preUpdateConfig,
			suppressFutureVersionWarning: true,
			observe: false,
			assertCurrent
		});
		const currentPluginInstallRecords = await loadInstalledPluginIndexInstallRecords();
		const persistedPluginIndex = params.parentPluginInstallRecords ? await readPersistedInstalledPluginIndex() : null;
		assertCurrent?.();
		const pluginInstallRecords = Object.keys(currentPluginInstallRecords).length > 0 || Boolean(persistedPluginIndex && params.updateStartedAtMs !== void 0 && persistedPluginIndex.generatedAtMs >= params.updateStartedAtMs) ? currentPluginInstallRecords : params.parentPluginInstallRecords ?? currentPluginInstallRecords;
		const pluginUpdate = await updatePluginsAfterCoreUpdate({
			root: params.root,
			channel: params.channel,
			...preparedConfig,
			json: params.opts.json,
			acceptCapabilities: params.opts.acceptCapabilities,
			timeoutMs: params.timeoutMs,
			workTimeoutMs: parseUpdateTimeoutMs(params.opts.timeout) ?? null,
			pluginInstallRecords,
			assertCurrent
		});
		assertCurrent?.();
		return {
			pluginUpdate,
			configSnapshot: preparedConfig.configSnapshot
		};
	});
}
//#endregion
//#region src/cli/update-cli/update-command-convergence.ts
async function convergeUpdatePlugins(params) {
	const assertCurrent = params.assertCurrent ?? params.opts.run?.executorFence?.assertCurrent;
	assertCurrent?.();
	const postUpdateRoot = params.result.root ?? params.root;
	const failedTargetRuntime = (result = params.result) => ({
		...result,
		status: "error",
		reason: "post-core-update-failed",
		recovery: result.recovery?.serviceRestartSafe === false ? result.recovery : {
			serviceRestartSafe: false,
			reason: "runtime-verification-failed"
		}
	});
	const preUpdateConfig = capturePreUpdateSourceConfig(params.configSnapshot);
	const postUpdateInstalledVersion = await readPackageVersion(postUpdateRoot);
	assertCurrent?.();
	const versionComparison = postUpdateInstalledVersion && VERSION ? compareSemverStrings(VERSION, postUpdateInstalledVersion) : null;
	const runtimeRootChanged = !updateInstallRootsMatch(params.previousInstallRoot ?? params.root, postUpdateRoot);
	const retainedDifferentRuntime = params.coreAlreadyCurrent === true && (runtimeRootChanged || versionComparison !== null && versionComparison !== 0);
	const shouldResumePostCoreInFreshProcess = (!params.coreAlreadyCurrent || retainedDifferentRuntime) && !params.candidateRuntime && shouldResumePostCoreUpdateInFreshProcess({
		result: retainedDifferentRuntime ? {
			...params.result,
			status: "ok",
			before: {
				...params.result.before,
				version: VERSION
			},
			after: {
				...params.result.after,
				version: postUpdateInstalledVersion
			}
		} : params.result,
		downgradeRisk: params.downgradeRisk || versionComparison !== null && versionComparison > 0,
		installKindChanged: params.installKindChanged || retainedDifferentRuntime && runtimeRootChanged
	});
	let postUpdateConfigSnapshot;
	if (params.requestedChannel && params.configSnapshot.valid && params.requestedChannel !== params.storedChannel && !params.opts.json) {
		const verb = shouldResumePostCoreInFreshProcess ? "will be set" : "set";
		defaultRuntime.log(theme.muted(`Update channel ${verb} to ${params.requestedChannel}.`));
	}
	if (params.opts.run) recordUpdateRunStep(params.opts.run.runId, {
		step: "post-update verification",
		status: "in_progress",
		startedAtMs: Date.now()
	}, { env: params.opts.run.env });
	const compatibilityHostVersion = params.candidateRuntime ? postUpdateInstalledVersion ?? VERSION : versionComparison != null && versionComparison > 0 ? postUpdateInstalledVersion : null;
	const compatibilityEnv = compatibilityHostVersion ? { OPENCLAW_COMPATIBILITY_HOST_VERSION: compatibilityHostVersion } : {};
	return await withOwnedManagedUpdateEnv(params.ownedManagedUpdateEnv, () => withUpdateEnv(compatibilityEnv, async () => {
		let postCorePluginUpdate;
		const doctorWarnings = [];
		const collectDoctorWarnings = (warnings) => {
			doctorWarnings.push(...warnings);
		};
		let targetRuntimeConverged = false;
		let maintenanceDeferred = false;
		if (shouldResumePostCoreInFreshProcess) {
			if (retainedDifferentRuntime && params.opts.run?.completionOwner === "gateway-restart") {
				await params.beforeDoctor?.();
				assertCurrent?.();
			}
			const freshProcessResult = await continuePostCoreUpdateInFreshProcess({
				root: postUpdateRoot,
				sourceRuntimePrepared: params.result.sourceRuntimePrepared,
				channel: params.channel,
				requestedChannel: params.requestedChannel,
				opts: params.opts,
				pluginInstallRecords: params.preUpdatePluginInstallRecords,
				updateStartedAtMs: params.startedAt,
				timeoutMs: params.updateStepTimeoutMs,
				nodeRunner: params.packageUpdateNodeRunner,
				preUpdateConfig
			});
			assertCurrent?.();
			if (freshProcessResult.exitCode !== void 0) return {
				resultWithPostUpdate: {
					...failedTargetRuntime(),
					...freshProcessResult.failureFacts?.length ? { steps: [...params.result.steps, {
						name: "post-update verification",
						command: "openclaw update",
						cwd: postUpdateRoot,
						durationMs: 0,
						exitCode: freshProcessResult.exitCode,
						stderrTail: freshProcessResult.error,
						failureFacts: freshProcessResult.failureFacts
					}] } : {}
				},
				detail: freshProcessResult.error,
				cancelled: freshProcessResult.exitCode === 130 || freshProcessResult.exitCode === 143
			};
			targetRuntimeConverged = freshProcessResult.resumed;
			postCorePluginUpdate = freshProcessResult.pluginUpdate;
		}
		if (retainedDifferentRuntime && !params.candidateRuntime && !targetRuntimeConverged) return {
			resultWithPostUpdate: failedTargetRuntime(),
			detail: "The installed target could not resume plugin convergence. Run openclaw update using the installed target executable."
		};
		const runtimeStartedAt = Date.now();
		const runtime = targetRuntimeConverged ? { changed: false } : await withPluginLifecycleLease({ assertCurrent }, (lease) => completeSourceUpdateRuntime({
			root: postUpdateRoot,
			sourceRuntimePrepared: params.result.sourceRuntimePrepared,
			timeoutMs: params.updateStepTimeoutMs,
			lease,
			beforePersistentEffect: assertCurrent,
			beforePublication: params.beforeRuntimePublication
		}));
		const runtimeDurationMs = Math.max(0, Date.now() - runtimeStartedAt);
		assertCurrent?.();
		if (!targetRuntimeConverged) {
			const phase = await convergePostCoreUpdatePlugins({
				root: postUpdateRoot,
				channel: params.channel,
				requestedChannel: params.requestedChannel,
				opts: params.opts,
				timeoutMs: params.updateStepTimeoutMs,
				preUpdateConfig,
				...params.candidateRuntime ? {
					parentPluginInstallRecords: params.preUpdatePluginInstallRecords,
					updateStartedAtMs: params.startedAt
				} : {},
				assertCurrent
			});
			postCorePluginUpdate = phase.pluginUpdate;
			postUpdateConfigSnapshot = phase.configSnapshot;
		}
		assertCurrent?.();
		if (postCorePluginUpdate && (!params.coreAlreadyCurrent || postCorePluginUpdate.changed || hasDeferredUpdateModelRetirement())) {
			const producedPluginUpdate = postCorePluginUpdate;
			const completedPluginUpdate = await completePostCorePluginUpdate({
				root: postUpdateRoot,
				databaseBackup: params.databaseBackup,
				onDatabaseWriteStep: (step) => params.result.steps.push(step),
				opts: params.opts,
				...params.candidateRuntime ? { doctorConfigWrites: true } : {},
				pluginUpdate: producedPluginUpdate,
				freshDoctorRequired: producedPluginUpdate.changed,
				beforeDoctor: params.beforeDoctor,
				assertCurrent,
				yes: params.opts.yes === true,
				json: params.opts.json === true,
				timeoutMs: params.updateStepTimeoutMs,
				onWarnings: collectDoctorWarnings,
				...params.packageUpdateNodeRunner ? { nodeRunner: params.packageUpdateNodeRunner } : {}
			}).catch((error) => {
				if (!(error instanceof DoctorMaintenanceRefusalError) || error.refusal.kind !== "deferred") throw error;
				maintenanceDeferred = true;
				postCorePluginUpdate = {
					...producedPluginUpdate,
					status: "warning"
				};
				if (!doctorWarnings.includes(error.message)) collectDoctorWarnings([error.message]);
			});
			assertCurrent?.();
			if (completedPluginUpdate) {
				postCorePluginUpdate = completedPluginUpdate.pluginUpdate;
				postUpdateConfigSnapshot = completedPluginUpdate.configSnapshot;
			}
		} else if (params.candidateRuntime) postUpdateConfigSnapshot = await readConfigFileSnapshot({ observe: false });
		assertCurrent?.();
		if (!maintenanceDeferred && params.candidateRuntime && postUpdateConfigSnapshot) {
			await persistValidatedDowngradeConfig(postUpdateConfigSnapshot, assertCurrent);
			assertCurrent?.();
		}
		const resultWithPostUpdate = {
			...params.result,
			steps: [...params.result.steps, ...runtime.changed ? [{
				name: "source runtime publication",
				command: "openclaw update",
				cwd: postUpdateRoot,
				durationMs: runtimeDurationMs,
				exitCode: 0
			}] : []],
			...postCorePluginUpdate ? {
				status: postCorePluginUpdate.status === "error" ? "error" : params.result.status,
				...postCorePluginUpdate.status === "error" ? { reason: "post-update-plugins" } : {},
				postUpdate: {
					...params.result.postUpdate,
					plugins: postCorePluginUpdate
				}
			} : {}
		};
		const failureFacts = postCorePluginUpdate ? collectPostCorePluginFailureFacts(postCorePluginUpdate) : [];
		if (failureFacts.length) resultWithPostUpdate.steps.push({
			name: "post-update verification",
			command: "openclaw plugins update",
			cwd: postUpdateRoot,
			durationMs: 0,
			exitCode: 1,
			failureFacts
		});
		resultWithPostUpdate.steps.push(...normalizeUpdatePostInstallDoctorWarnings(doctorWarnings).map((message, index) => ({
			name: `post-plugin-doctor-warning-${index + 1}`,
			command: "openclaw doctor --fix",
			cwd: postUpdateRoot,
			durationMs: 0,
			exitCode: 0,
			advisory: {
				kind: "package-post-install-doctor",
				message
			}
		})));
		resultWithPostUpdate.steps.push(...collectPostCorePluginAdvisories(postCorePluginUpdate).map((message, index) => ({
			name: `finalize:plugins:${index}`,
			command: "openclaw plugins update",
			cwd: postUpdateRoot,
			durationMs: 0,
			exitCode: 0,
			advisory: {
				kind: "recoverable-maintenance",
				message
			}
		})));
		if (params.result.gitRuntime) {
			const observed = await readGitRuntimeArtifactIdentity(postUpdateRoot);
			assertCurrent?.();
			const matches = isDeepStrictEqual(params.result.gitRuntime, observed);
			const message = "Activated Git runtime changed before or during post-update verification.";
			resultWithPostUpdate.steps.push({
				name: "post-core runtime verification",
				command: "verify activated Git runtime",
				cwd: postUpdateRoot,
				durationMs: 0,
				exitCode: matches ? 0 : 1,
				diagnostics: [JSON.stringify({
					activated: params.result.gitRuntime,
					observed
				})],
				...!matches ? { failureFacts: [{
					check: "runtime",
					code: "runtime-verification-failed",
					message
				}] } : {}
			});
			if (!matches) return {
				resultWithPostUpdate: failedTargetRuntime(resultWithPostUpdate),
				detail: message
			};
		}
		if (params.coreAlreadyCurrent && resultWithPostUpdate.status !== "error" && (runtime.changed || postCorePluginUpdate?.changed || retainedDifferentRuntime && params.opts.run?.gatewayRestartRequired || params.requestedChannel !== null && params.requestedChannel !== params.storedChannel)) {
			resultWithPostUpdate.status = "ok";
			delete resultWithPostUpdate.reason;
		}
		if (params.opts.run) {
			for (const step of resultWithPostUpdate.steps.flatMap(updateRunStepsFromResultStep)) if (step.step.startsWith("warning:")) recordUpdateRunStep(params.opts.run.runId, step, { env: params.opts.run.env });
			recordUpdateRunStep(params.opts.run.runId, {
				step: "post-update verification",
				status: postCorePluginUpdate?.status === "error" ? "failed" : "completed",
				endedAtMs: Date.now(),
				...failureFacts.length ? { failureFacts } : {}
			}, { env: params.opts.run.env });
		}
		return {
			resultWithPostUpdate,
			postUpdateConfigSnapshot
		};
	}));
}
//#endregion
//#region src/cli/update-cli/update-command-post-update-maintenance.ts
/** Shell integration changes follow settled restart and health recovery. */
async function completePostUpdateMaintenance(params, result, assertCurrent, context) {
	await tryInstallShellCompletion({
		root: context.root,
		jsonMode: Boolean(params.opts.json),
		skipPrompt: Boolean(params.opts.yes)
	});
	if (!params.installKindChanged || result.mode === "git") return;
	const retirement = await retireStandaloneGitWrapper({
		previousRoot: params.previousInstallRoot ?? params.root,
		assertCurrent
	});
	if (!retirement.error) return;
	defaultRuntime.error(retirement.error);
	await markControlPlaneUpdateRestartSentinelFailureBestEffort({
		...context.sentinel,
		reason: "wrapper-retirement-failed"
	});
	return {
		result: {
			...result,
			status: "error",
			reason: "wrapper-retirement-failed"
		},
		detail: retirement.error
	};
}
async function resumePostUpdateWindowsAutoStart(params, result, stopped) {
	await stopped?.windowsTaskAutoStartRecovery?.restore(true, createWindowsTaskAutoStartGuard({
		root: result.recovery?.packageRollbackVerified && stopped.serviceUpdateVerdict?.kind === "owned" ? stopped.serviceUpdateVerdict.root : result.root ?? params.root,
		before: stopped,
		timeoutMs: params.updateStepTimeoutMs
	}));
}
//#endregion
//#region src/cli/update-cli/update-command-recovery.ts
function readOriginalUpdateRecovery(params, timeoutMs) {
	return params.installKind === "git" ? readCurrentGitUpdateRecovery(params.root, timeoutMs) : verifyPackageUpdateRecovery(params.root);
}
/** Refuse retained recovery before any package-only effects or diagnostic writes. */
function assertUpdateCommandRecovery(opts) {
	opts.run?.executorFence?.assertCurrent();
	assertUpdateCommandRecoveryState(opts);
}
function assertUpdateCommandRecoveryState(opts) {
	if (opts.recovery) throw new UpdateCommandRecoveryPendingError("Full-state checkpoint recovery is deferred; retained state was left unchanged.");
	if (opts.run) {
		const current = loadUpdateRecovery(opts.run.runId, { env: opts.run.env });
		if (current) throw new UpdateRecoveryRequiredError(current);
	}
}
/** Package-only finalization cannot adopt a retained full-state claim. */
async function assertUpdateCommandPackageFinalization(params) {
	const run = params.opts.run;
	const executor = run?.executorFence;
	const assertCurrent = () => {
		if (params.opts.run !== run || run?.executorFence !== executor) throw new UpdateCommandRecoveryPendingError("Package finalization lost its original executor.");
		executor?.assertCurrent();
	};
	try {
		assertCurrent();
		if (params.opts.recovery) throw new Error("Full-state checkpoint recovery is deferred; retained state was left unchanged.");
		const env = params.ownedManagedUpdateEnv ?? params.opts.run?.env;
		const targetPath = resolveOpenClawStateSqlitePath(env);
		await assertUpdateRecoveryAdmission({
			env,
			path: targetPath
		});
		assertCurrent();
		if (run && resolveOpenClawStateSqlitePath(run.env) !== targetPath) {
			await assertUpdateRecoveryAdmission({ env: run.env });
			assertCurrent();
		}
	} catch (cause) {
		throw new UpdateCommandPendingRecoveryFailure(params.result, formatErrorMessage(cause), { cause });
	}
}
/** Hold the originally admitted executor through package finalization awaits. */
function createUpdateCommandFinalizationFence(params) {
	const originalRun = params.opts.run;
	const executor = originalRun?.executorFence;
	const assertCurrent = () => {
		try {
			if (params.opts.run !== originalRun || originalRun?.executorFence !== executor) throw new Error("Package finalization lost its original executor.");
			executor?.assertCurrent();
		} catch (cause) {
			throw new UpdateCommandPendingRecoveryFailure(params.result, formatErrorMessage(cause), { cause });
		}
	};
	return assertCurrent;
}
//#endregion
//#region src/cli/update-cli/update-command-restart-context.ts
async function prepareUpdateRestart(params, restartConfigSnapshot) {
	let refreshGatewayServiceEnv = false;
	let gatewayServiceEnv;
	let gatewayServiceInstallEnv;
	let serviceManagerUid = params.preManagedServiceStop?.serviceManagerUid;
	let serviceUpdateVerdict = params.preManagedServiceStop?.serviceUpdateVerdict;
	let skipLegacyServiceRestart = serviceUpdateVerdict?.kind === "absent";
	const serviceStateReadEnv = resolveServiceRefreshEnv(resolvePostUpdateServiceStateReadEnv({
		updateMode: params.result.mode,
		processEnv: process.env,
		preManagedServiceEnv: params.preManagedServiceStop?.serviceEnv
	}), params.invocationCwd);
	let serviceMutationAllowed = params.preManagedServiceStop?.serviceMutationAllowed !== false && isGatewayServiceManagementAllowedForUpdate(process.env) && isGatewayServiceManagementAllowedForUpdate(serviceStateReadEnv);
	let serviceMutationSkipMessage = !serviceMutationAllowed ? params.preManagedServiceStop?.serviceMutationSkipMessage ?? resolveGatewayServiceManagementBlockMessageForUpdate(process.env) ?? resolveGatewayServiceManagementBlockMessageForUpdate(serviceStateReadEnv) : void 0;
	let gatewayPort = await resolveUpdatedGatewayRestartPort({
		config: restartConfigSnapshot.valid ? restartConfigSnapshot.config : void 0,
		processEnv: process.env,
		serviceEnv: params.ownedManagedUpdateEnv
	});
	if (params.shouldRestart && serviceMutationAllowed && !skipLegacyServiceRestart) try {
		const serviceState = await readGatewayServiceStateForUpdate(resolveGatewayService(), serviceStateReadEnv, params.updateStepTimeoutMs, {
			managerUid: serviceManagerUid,
			assertCurrent: params.assertCurrent
		});
		serviceUpdateVerdict = await revalidateManagedGatewayServiceAfterUpdate({
			state: serviceState,
			root: params.result.root ?? params.root,
			preManagedServiceStop: params.preManagedServiceStop,
			allowInstallRootChange: true
		});
		gatewayServiceEnv = serviceState.env;
		serviceManagerUid ??= serviceState.runtime?.systemd?.managerUid;
		skipLegacyServiceRestart = serviceUpdateVerdict.kind === "foreign" || serviceUpdateVerdict.kind === "absent";
		if (serviceUpdateVerdict.kind === "unavailable") {
			serviceMutationAllowed = false;
			serviceMutationSkipMessage = serviceUpdateVerdict.message;
		} else if (serviceUpdateVerdict.kind === "foreign") {
			serviceMutationAllowed = false;
			serviceMutationSkipMessage = "Gateway service management skipped: the service belongs to a different OpenClaw installation and was left untouched.";
		} else if (!skipLegacyServiceRestart && shouldPrepareUpdatedInstallRestart({
			updateMode: params.result.mode,
			serviceInstalled: serviceState.installed,
			serviceLoaded: serviceState.loadState.status === "loaded",
			serviceStoppedForUpdate: params.preManagedServiceStop?.stopped,
			serviceMatchesUpdateRoot: serviceUpdateVerdict.kind === "owned",
			requiresInstallRootRefresh: serviceUpdateVerdict.kind === "owned" && serviceUpdateVerdict.requiresInstallRootRefresh
		})) {
			gatewayServiceInstallEnv = resolveManagedGatewayServiceProcessEnv(serviceState.command, params.ownedManagedUpdateEnv ?? process.env);
			if (gatewayServiceInstallEnv) gatewayServiceInstallEnv = stripGatewayServiceMarkerEnv(gatewayServiceInstallEnv);
			refreshGatewayServiceEnv = serviceUpdateVerdict.kind === "owned" && serviceUpdateVerdict.refreshDefinition;
			if (serviceUpdateVerdict.kind === "owned" && gatewayServiceInstallEnv === null) {
				refreshGatewayServiceEnv = false;
				serviceUpdateVerdict = {
					...serviceUpdateVerdict,
					refreshDefinition: false
				};
			}
		}
		gatewayPort = await resolveUpdatedGatewayRestartPort({
			config: restartConfigSnapshot.valid ? restartConfigSnapshot.config : void 0,
			serviceEnv: gatewayServiceEnv,
			serviceCommand: serviceUpdateVerdict.kind === "unresolved" || serviceUpdateVerdict.kind === "owned" && (!serviceUpdateVerdict.refreshDefinition || serviceUpdateVerdict.requiresInstallRootRefresh && restartConfigSnapshot.config.gateway?.port === void 0) ? serviceState.command : void 0
		});
	} catch (err) {
		if (params.preManagedServiceStop?.stopped) {
			const message = err instanceof GatewayServiceUpdateOwnershipError ? formatErrorMessage(err) : "Stopped gateway service could not be revalidated; inspect it before restarting manually.";
			throw new GatewayServiceUpdateOwnershipError(message, err);
		}
		serviceMutationAllowed = false;
		serviceMutationSkipMessage = "Code update completed; gateway service management skipped because its current ownership could not be inspected. Run `openclaw gateway status --deep` before restarting it manually.";
	}
	if (params.serviceRuntimeRefreshRequired && (!serviceMutationAllowed || !refreshGatewayServiceEnv || gatewayServiceInstallEnv === null)) throw new GatewayServiceUpdateOwnershipError("Replacing the unsupported Gateway Node requires a writable service definition and a reproducible service environment. Ask its deployment owner to refresh the service before retrying.", void 0);
	return {
		refreshGatewayServiceEnv,
		gatewayServiceEnv,
		gatewayServiceInstallEnv,
		serviceUpdateVerdict,
		serviceManagerUid,
		skipLegacyServiceRestart,
		serviceStateReadEnv,
		serviceMutationAllowed,
		serviceMutationSkipMessage,
		gatewayPort
	};
}
//#endregion
//#region src/infra/update-database-restore.ts
async function existingFile(file) {
	try {
		const info = await fs$1.lstat(file);
		if (!info.isFile() || info.nlink !== 1) throw new Error(`Database recovery requires a regular, unaliased file: ${file}`);
		return info;
	} catch (error) {
		if (hasErrnoCode(error, "ENOENT")) return;
		throw error;
	}
}
async function withDatabaseExclusion(env, paths, sourcePaths, assertCurrent, operation) {
	assertCurrent();
	const owner = await acquireGatewayLock({
		env,
		role: "sqlite-maintenance",
		allowInTests: true,
		timeoutMs: 0
	});
	if (!owner) throw new Error("Database rollback requires exclusive state ownership");
	const exclusions = [];
	const assertOwned = () => {
		assertCurrent();
		owner.assertCurrent();
		for (const exclusion of exclusions) exclusion.assertCurrent();
	};
	const acquire = async (index) => {
		const databasePath = paths[index];
		if (databasePath === void 0) return operation(assertOwned);
		const exclusion = await prepareOpenClawStateDatabaseRemoval(databasePath, assertCurrent);
		exclusions.push(exclusion);
		assertOwned();
		return acquire(index + 1);
	};
	const drain = async (index) => {
		const pathname = sourcePaths[index];
		if (pathname === void 0) return acquire(0);
		return drainAgentDatabaseResources({ path: pathname }, async () => {
			await closeOpenClawAgentDatabaseByPathAsync(pathname);
			assertOwned();
			return drain(index + 1);
		});
	};
	let outcome;
	try {
		outcome = { value: await owner.run(() => drain(0)) };
	} catch (error) {
		outcome = { error };
	}
	if ("error" in outcome && hasCommandProcessCleanupError(outcome.error)) throw outcome.error;
	try {
		await owner.release();
		for (const exclusion of exclusions.toReversed()) exclusion.release();
	} catch (cleanupError) {
		if ("error" in outcome) throw createSqliteLifecycleAggregateError([outcome.error, cleanupError], "Database rollback and ownership cleanup both failed", outcome.error);
		throw cleanupError;
	}
	if ("error" in outcome) throw outcome.error;
	return outcome.value;
}
/** The caller owns a settled failed candidate that has never been allowed to serve. */
async function restoreUpdateDatabaseBackup(params) {
	if (!/^[a-zA-Z0-9_-]{1,128}$/u.test(params.runId)) throw new Error("Database rollback requires its original update run identity.");
	const { backup, assertCurrent } = params;
	const paths = [.../* @__PURE__ */ new Set([...backup.databases.map((entry) => entry.path), ...backup.missingPaths])].toSorted();
	const displaced = [];
	return await withDatabaseExclusion(params.env, paths, [.../* @__PURE__ */ new Set([...backup.sourcePaths, ...paths])], assertCurrent, async (assertOwned) => {
		if (params.expectedGenerations) {
			assertOwned();
			const generations = await readUpdateDatabaseGenerationsIsolated(paths, { env: params.env });
			assertOwned();
			if (!isDeepStrictEqual(generations, params.expectedGenerations)) return null;
		}
		assertOwned();
		for (const entry of backup.databases) {
			const source = await fs$1.open(entry.snapshotPath, "r");
			try {
				const content = await sha256File(source);
				if (content.digest !== entry.sha256 || content.bytes !== entry.sizeBytes) throw new Error(`Database snapshot changed: ${entry.snapshotPath}`);
			} finally {
				await source.close();
			}
			assertOwned();
		}
		const moves = [];
		for (const databasePath of paths) for (const suffix of [
			"",
			"-wal",
			"-shm",
			"-journal"
		]) {
			const source = `${databasePath}${suffix}`;
			const target = `${databasePath}.migrated-${params.runId}${suffix}`;
			if (await existingFile(target)) throw new Error(`Migrated database recovery file already exists: ${target}`);
			const identity = await existingFile(source);
			if (identity) moves.push({
				source,
				target,
				identity
			});
		}
		for (const move of moves) {
			assertOwned();
			await publishFileExclusive({
				sourcePath: move.source,
				targetPath: move.target,
				expectedSourceIdentity: move.identity,
				strategy: "rename-noreplace"
			});
			displaced.push(move.target);
			assertOwned();
		}
		for (const entry of backup.databases) {
			assertOwned();
			const sourceIdentity = await fs$1.lstat(entry.snapshotPath);
			await publishVerifiedSqliteFile({
				sourcePath: entry.snapshotPath,
				sourceIdentity,
				targetPath: entry.path,
				expectedContent: {
					sha256: entry.sha256,
					sizeBytes: entry.sizeBytes
				},
				requireAtomicPublication: true,
				beforePublish: assertOwned,
				afterPublish: (guard) => guard.assertTargetMatchesExpectedContent(assertOwned)
			});
			assertOwned();
		}
		return displaced;
	});
}
//#endregion
//#region src/cli/update-cli/update-command-database-backup.ts
async function captureUpdateDatabases(params) {
	const startedAt = Date.now();
	const { execution, context, transaction } = params;
	const backupRoot = transaction.databaseBackupRoot ?? transaction.backupRoot;
	const env = context?.env ?? execution.opts.run.env;
	params.assertCurrent();
	const source = await readUpdateCandidateSource(env, execution.legacyConfigPlan);
	params.assertCurrent();
	let maintenance = null;
	let unavailable;
	try {
		if (hasActiveGatewayStateOwner(resolveOpenClawStateSqlitePath(env))) throw new Error("This process still owns a running Gateway");
		maintenance = await acquireGatewayLock({
			env,
			role: "sqlite-maintenance",
			allowInTests: true,
			timeoutMs: 0
		});
		if (!maintenance) throw new Error("Exclusive state ownership is unavailable");
	} catch (error) {
		unavailable = formatErrorMessage(error);
	}
	let outcome;
	try {
		const capture = async () => {
			params.assertCurrent();
			const captured = await createUpdateDatabaseBackup({
				backupRoot,
				stateDir: resolveStateDir(env),
				config: source.config,
				env,
				timeoutMs: execution.updateStepTimeoutMs,
				nodeRunner: execution.packageUpdateNodeRunner
			});
			params.assertCurrent();
			maintenance?.assertCurrent();
			return captured;
		};
		outcome = { value: await (maintenance ? maintenance.run(capture) : capture()) };
	} catch (error) {
		outcome = { error };
	}
	if ("error" in outcome && hasCommandProcessCleanupError(outcome.error)) throw outcome.error;
	try {
		await maintenance?.release();
	} catch (cleanupError) {
		if ("error" in outcome) throw createSqliteLifecycleAggregateError([outcome.error, cleanupError], "Database backup and ownership cleanup both failed", outcome.error);
		throw cleanupError;
	}
	if ("error" in outcome) throw outcome.error;
	const backup = outcome.value;
	params.assertCurrent();
	const restorable = maintenance !== null && backup.databases.every((entry) => typeof backup.sourceGenerations[entry.path] === "string");
	if (!restorable) backup.warnings.push(`Automatic database restoration is disabled because ${unavailable ? `the Gateway could not be confirmed stopped during capture: ${unavailable}` : "a source database changed or its write generation could not be captured"}. Snapshots remain available at ${backup.directory}; later writes must be preserved.`);
	const step = {
		name: "database snapshot",
		command: "snapshot databases before migrations",
		cwd: resolveStateDir(env),
		durationMs: Date.now() - startedAt,
		exitCode: 0,
		diagnostics: [`Databases snapshotted at ${backup.directory}. Verified successful activation removes these snapshots; otherwise retain them with the update's recovery artifacts.`, ...backup.databases.map((entry) => `${entry.path} -> ${entry.snapshotPath}; schema ${entry.userVersion}; ${entry.sizeBytes} bytes; SHA-256 ${entry.sha256}`)],
		warnings: backup.warnings
	};
	execution.progress?.onStepComplete?.({
		...step,
		index: 0,
		total: 0
	});
	return {
		backup: restorable ? backup : void 0,
		step
	};
}
/** Called only before this update admits a candidate Gateway, after its child has settled. */
async function restoreFailedUpdateDatabases(params) {
	const startedAt = Date.now();
	const refuse = (reason) => {
		params.backup.restoreRefusal ??= reason;
		params.result.reason = "state-migrated-no-rollback";
		const step = {
			name: "database rollback",
			command: "preserve databases changed after snapshot capture",
			cwd: params.backup.directory,
			durationMs: Date.now() - startedAt,
			exitCode: 1,
			stderrTail: `${reason}. Current databases were preserved. Keep the retained snapshots at ${params.backup.directory}; run openclaw doctor from the candidate version to inspect recovery before restarting or downgrading.`
		};
		params.result.steps.push(step);
		params.progress?.onStepComplete?.({
			...step,
			index: 0,
			total: 0
		});
		return false;
	};
	if (params.backup.restoreRefusal) return refuse(params.backup.restoreRefusal);
	try {
		const migratedPaths = await restoreUpdateDatabaseBackup({
			...params,
			expectedGenerations: params.backup.postMigrationGenerations ?? params.backup.sourceGenerations
		});
		if (migratedPaths === null) return refuse("databases changed after migration; the writer is unknown");
		params.assertCurrent();
		const step = {
			name: "database rollback",
			command: "restore pre-migration databases",
			cwd: params.backup.directory,
			durationMs: Date.now() - startedAt,
			exitCode: 0,
			diagnostics: [`Restored pre-migration databases from ${params.backup.directory}.`, ...migratedPaths.map((file) => `Migrated database file retained for manual recovery: ${file}`)]
		};
		params.result.steps.push(step);
		params.progress?.onStepComplete?.({
			...step,
			index: 0,
			total: 0
		});
		return true;
	} catch (cause) {
		throw new UpdateCommandRecoveryPendingError(`Database rollback could not finish; keep the Gateway stopped. Preserve ${params.backup.directory} and <database>.migrated-${params.runId}. Run the compatible candidate's Doctor to inspect recovery before restarting.`, { cause });
	}
}
//#endregion
//#region src/cli/update-cli/update-command-rollback.ts
/** Restores the previous generation only while schemas and activation-owned config stay intact. */
async function rollbackFailedUpdate(params) {
	const { preManagedServiceStop: before, packageTransaction, opts } = params;
	const run = opts.run;
	const executor = run?.executorFence;
	const assertCurrent = () => {
		if (opts.run !== run || run?.executorFence !== executor) throw new Error("Package rollback lost its original executor.");
		executor?.assertCurrent();
	};
	const env = before?.serviceEnv ?? opts.run?.env ?? process.env;
	const pendingRecovery = (result, pendingRecoveryReason) => ({
		result: {
			...result,
			status: "error",
			recovery: {
				serviceRestartSafe: false,
				reason: "runtime-verification-failed"
			}
		},
		rolledBack: false,
		pendingRecoveryReason
	});
	if (!opts.recovery) try {
		assertCurrent();
		const targetPath = resolveOpenClawStateSqlitePath(env);
		await assertUpdateRecoveryAdmission({
			env,
			path: targetPath
		});
		assertCurrent();
		if (opts.run && resolveOpenClawStateSqlitePath(opts.run.env) !== targetPath) {
			await assertUpdateRecoveryAdmission({ env: opts.run.env });
			assertCurrent();
		}
	} catch (error) {
		return pendingRecovery(params.result, formatErrorMessage(error));
	}
	if (opts.recovery) return pendingRecovery(params.result, "Full-state checkpoint recovery is deferred; the retained record and artifacts were left unchanged.");
	if (params.originalManagedServiceRuntime) return compensateOriginalManagedService(params, assertCurrent);
	let result = params.result;
	const config = params.configSnapshot.sourceConfigBeforeMigrations ?? params.configSnapshot.sourceConfig;
	const configSnapshot = params.activationConfig ?? {
		path: params.configSnapshot.path,
		raw: params.configSnapshot.raw,
		hash: hashConfigRaw(params.configSnapshot.raw)
	};
	const configFiles = [configSnapshot, ...params.activationConfig?.includedFiles ?? []];
	const expectedConfigHashes = new Map(configFiles.map((file) => [file.path, file.hash]));
	const changedConfigFiles = configFiles.filter((file) => file.hash !== hashConfigRaw(file.raw));
	const recoveryEnv = {
		...env,
		[ALLOW_OLDER_BINARY_DESTRUCTIVE_ACTIONS_ENV]: "1"
	};
	const port = before?.stopped ? before.servicePort ?? await resolveUpdatedGatewayRestartPort({
		config,
		serviceEnv: env
	}) : void 0;
	const failed = (reason) => ({
		result: {
			...result,
			status: "error",
			rollbackOutcome: result.rollbackOutcome ?? {
				status: "not-attempted",
				reason
			},
			reason: result.recovery?.serviceRestartSafe === true && result.recovery.packageRollbackVerified ? params.result.reason ?? reason : reason
		},
		rolledBack: false,
		stoppedForRollback
	});
	const stateUnchanged = async () => {
		assertCurrent();
		const baseline = params.schemaVersions;
		const current = await readUpdateStateSchemaVersions({
			stateDir: resolveStateDir(env),
			config,
			env,
			root: result.root ?? null,
			nodeRunner: params.nodeRunner,
			timeoutMs: params.timeoutMs
		});
		assertCurrent();
		const sharedPath = resolveOpenClawStateSqlitePath(env);
		if (baseline === void 0 || !updateStateSchemaVersionsMatch(baseline, current, {
			sharedPath,
			candidateSchemaVersions: params.candidateSchemaVersions
		})) return false;
		const baselineVersions = new Map(baseline.map((entry) => [entry.path, resolveUpdateStateContentVersion(entry)]));
		for (const entry of current) {
			const version = resolveUpdateStateContentVersion(entry);
			if (version === null || baselineVersions.get(entry.path) != null) continue;
			const kind = entry.path === sharedPath ? "state" : "agent";
			const supported = params.previousSchemaVersions?.[kind];
			if (supported === void 0 || version > supported) {
				if (params.databaseBackup && run && packageTransaction) return false;
				throw new Error(`Automatic rollback refused: newly created ${kind} database ${entry.path} uses schema ${version}; retained previous package support is ${supported ?? "unknown"}. Keep the update installed.`);
			}
		}
		await assertConfigUnchanged();
		assertCurrent();
		return true;
	};
	let stoppedForRollback;
	let failureReason = "rollback-state-unverified";
	const assertConfigUnchanged = async () => {
		assertCurrent();
		let unchanged = configFiles.every((file) => file.doctorOwned !== false);
		for (const file of configFiles) {
			if (!unchanged) break;
			try {
				if (file.pathSnapshot) assertConfigFileWritePathSnapshot(file.pathSnapshot, fs);
				unchanged = (await readUpdateConfigSnapshot(file.path)).hash === expectedConfigHashes.get(file.path);
				if (file.pathSnapshot) assertConfigFileWritePathSnapshot(file.pathSnapshot, fs);
			} catch (error) {
				if (!(error instanceof ConfigMutationConflictError)) throw error;
				unchanged = false;
			}
			assertCurrent();
		}
		if (unchanged && params.activationConfig?.includedFiles === void 0 && params.configSnapshot.includedPaths?.length) {
			const deps = normalizeConfigIoDeps({ env: { ...env } });
			const included = resolveConfigIncludesForRead(params.configSnapshot.parsed, params.configSnapshot.path, deps);
			unchanged = isDeepStrictEqual(config, resolveConfigForRead(included, deps.env).resolvedConfigRaw);
		}
		assertCurrent();
		if (!unchanged) {
			failureReason = "state-migrated-no-rollback";
			const detail = `Configuration ${configSnapshot.path} or its included files changed after activation; automatic rollback was refused to preserve those edits.`;
			result = {
				...result,
				steps: [...result.steps, {
					name: "config-rollback",
					command: "restore pre-update config",
					cwd: params.previousRoot,
					durationMs: 0,
					exitCode: 1,
					stderrTail: detail
				}]
			};
			throw new Error(detail);
		}
	};
	const stop = async () => {
		assertCurrent();
		failureReason = "service-revalidation-failed";
		const stopped = await withOwnedManagedUpdateEnv(recoveryEnv, () => maybeStopManagedServiceBeforeMutableUpdate({
			updateRun: opts.run,
			updateInstallKind: "package",
			root: result.root ?? params.previousRoot,
			shouldRestart: true,
			jsonMode: opts.json === true,
			expectedService: before,
			allowInstallRootChange: packageTransaction !== void 0,
			timeoutMs: params.timeoutMs
		}));
		assertCurrent();
		if (stopped.serviceEnv) {
			stopped.serviceEnv = { ...stopped.serviceEnv };
			delete stopped.serviceEnv[ALLOW_OLDER_BINARY_DESTRUCTIVE_ACTIONS_ENV];
		}
		stopped.windowsTaskAutoStartRecovery ??= before?.windowsTaskAutoStartRecovery;
		stoppedForRollback = stopped;
		if (stopped.blockMessage || stopped.serviceMutationAllowed === false || stopped.running && !stopped.stopped) throw new Error(stopped.blockMessage ?? "Update service could not be stopped safely.");
		return stopped;
	};
	try {
		assertCurrent();
		if (params.rollbackBlockedReason) return failed(params.rollbackBlockedReason);
		if (params.definitionRecovery.unverified) return failed("service-definition-rollback-unverified");
		if (!params.schemaVersions) return failed("rollback-state-unverified");
		if (!await stateUnchanged()) {
			if (!params.databaseBackup || !run || !packageTransaction) return failed("state-migrated-no-rollback");
			let restored;
			try {
				restored = await restoreFailedUpdateDatabases({
					backup: params.databaseBackup,
					result,
					runId: run.runId,
					env,
					assertCurrent
				});
			} catch (cause) {
				throw new UpdateCommandPendingRecoveryFailure(result, formatErrorMessage(cause), { cause });
			}
			if (!restored || !await stateUnchanged()) return failed("state-migrated-no-rollback");
		}
		await packageTransaction?.assertRollbackSafe?.();
		assertCurrent();
		const definitionBackup = params.definitionRecovery.backup;
		const restoreGeneration = async (assertNativeCurrent) => {
			const assertRestorationCurrent = () => {
				assertCurrent();
				assertNativeCurrent();
			};
			if (definitionBackup) failureReason = "service-definition-rollback-unverified";
			const command = definitionBackup ? await resolveGatewayService().readCommand(recoveryEnv, { requireEffective: true }) : void 0;
			if (definitionBackup && !command) throw new Error("Service definition cannot be inspected for backup restoration.");
			const definition = definitionBackup && command ? {
				env: recoveryEnv,
				command,
				receipt: definitionBackup,
				assertCurrent: assertRestorationCurrent
			} : void 0;
			if (definition) await verifyGatewayServiceDefinitionBackup(definition);
			assertRestorationCurrent();
			const stopped = before?.stopped ? await stop() : void 0;
			const restore = async () => {
				failureReason = "rollback-state-unverified";
				if (!await stateUnchanged()) return failed("state-migrated-no-rollback");
				failureReason = "source-rollback-failed";
				if (!packageTransaction) throw new Error("The retained package transaction is unavailable.");
				assertRestorationCurrent();
				result.rollbackOutcome = {
					status: "failed",
					reason: "Previous generation restoration did not complete"
				};
				const { activePackageRoot, ...restored } = await packageTransaction.rollback(assertCurrent);
				result = {
					...result,
					root: activePackageRoot ?? void 0,
					after: void 0,
					steps: [...result.steps, restored]
				};
				assertRestorationCurrent();
				if (restored.exitCode === 0) {
					result.after = result.before;
					result.recovery = {
						serviceRestartSafe: false,
						packageRollbackVerified: true,
						reason: "runtime-verification-failed"
					};
				} else if (activePackageRoot) {
					result.after = await readPackageUpdateIdentity(activePackageRoot);
					assertRestorationCurrent();
				}
				if (opts.run) recordUpdateRunStep(opts.run.runId, {
					step: "package rollback",
					status: restored.exitCode === 0 ? "completed" : "failed",
					endedAtMs: Date.now(),
					detail: restored.advisory?.message ?? restored.stderrTail ?? restored.reason
				}, { env: opts.run.env });
				if (restored.exitCode !== 0) return failed(restored.reason ?? "source-rollback-failed");
				failureReason = "rollback-state-unverified";
				await assertConfigUnchanged();
				for (const file of changedConfigFiles.toReversed()) {
					await assertConfigUnchanged();
					assertRestorationCurrent();
					const targetPath = file.pathSnapshot?.targetPath ?? file.path;
					if (file.raw === null) await fs$1.rm(targetPath, { force: true });
					else await replaceFileAtomic({
						filePath: targetPath,
						content: file.raw,
						mode: 384,
						preserveExistingMode: false,
						beforeRename: async () => {
							await assertConfigUnchanged();
							assertRestorationCurrent();
						}
					});
					expectedConfigHashes.set(file.path, hashConfigRaw(file.raw));
				}
				await assertConfigUnchanged();
				assertRestorationCurrent();
			};
			const includeLocks = [...new Set(changedConfigFiles.filter((file) => file !== configSnapshot).map((file) => file.pathSnapshot?.targetPath ?? file.path))].toSorted();
			const restoreWithIncludeLocks = async (index) => index === includeLocks.length ? await restore() : await withConfigMutationLock({
				lockPath: includeLocks[index],
				assertCurrent: assertRestorationCurrent
			}, () => restoreWithIncludeLocks(index + 1));
			const refused = changedConfigFiles.length === 0 ? await restore() : await withOwnedManagedUpdateEnv(env, () => withConfigMutationLock({
				lockPath: configSnapshot.path,
				assertCurrent: assertRestorationCurrent
			}, () => restoreWithIncludeLocks(0)));
			assertRestorationCurrent();
			if (refused) return {
				refused,
				stopped
			};
			if (definition) {
				failureReason = "service-definition-rollback-unverified";
				await restoreGatewayServiceDefinitionBackup(definition);
				assertRestorationCurrent();
			}
			return { stopped };
		};
		const restoration = definitionBackup ? await withGatewayServiceOperationLock(recoveryEnv, restoreGeneration) : await restoreGeneration(assertCurrent);
		if (restoration.refused) return restoration.refused;
		result.rollbackOutcome = {
			status: "succeeded",
			reason: "Previous package and configuration restored"
		};
		const { stopped } = restoration;
		if (!stopped || port === void 0) return {
			result,
			rolledBack: false
		};
		const originalVerdict = before?.serviceUpdateVerdict;
		const restoresDifferentService = originalVerdict?.kind === "owned" && originalVerdict.requiresInstallRootRefresh;
		const serviceRoot = restoresDifferentService ? originalVerdict.root : params.previousRoot;
		const serviceIdentity = restoresDifferentService ? before?.serviceIdentity : result.before;
		if (!params.previousVerified || !serviceIdentity?.version) return failed("previous-version-unverified");
		if (restoresDifferentService && !isDeepStrictEqual(await readPackageUpdateIdentity(serviceRoot), serviceIdentity)) return failed("previous-version-unverified");
		assertCurrent();
		const restoredService = restoresDifferentService ? {
			...stopped,
			serviceUpdateVerdict: {
				...originalVerdict,
				refreshDefinition: false,
				requiresInstallRootRefresh: false
			},
			serviceEnv: before?.serviceEnv,
			serviceNodeRunner: before?.serviceNodeRunner,
			servicePort: before?.servicePort,
			serviceIdentity: before?.serviceIdentity,
			serviceManagerUid: before?.serviceManagerUid
		} : stopped;
		failureReason = "service-revalidation-failed";
		if (stopped.windowsTaskAutoStartRecovery) params.onGatewayStartAttempted?.();
		await stopped.windowsTaskAutoStartRecovery?.restore(true, createWindowsTaskAutoStartGuard({
			root: serviceRoot,
			before: restoredService,
			timeoutMs: params.timeoutMs
		}), assertCurrent);
		assertCurrent();
		const nodeRunner = before?.serviceNodeRunner ?? params.nodeRunner;
		const state = await readGatewayServiceStateForUpdate(resolveGatewayService(), recoveryEnv, params.timeoutMs, {
			managerUid: restoredService.serviceManagerUid,
			assertCurrent
		});
		let verdict = await revalidateManagedGatewayServiceAfterUpdate({
			state,
			root: serviceRoot,
			preManagedServiceStop: restoredService
		});
		if (verdict.kind === "owned") verdict = {
			...verdict,
			refreshDefinition: false,
			requiresInstallRootRefresh: false
		};
		assertCurrent();
		stoppedForRollback = {
			...restoredService,
			serviceUpdateVerdict: verdict
		};
		result.recovery = {
			serviceRestartSafe: true,
			packageRollbackVerified: true,
			version: serviceIdentity.version,
			reason: "gateway-verification-incomplete",
			...serviceIdentity.buildId ? { buildId: serviceIdentity.buildId } : {}
		};
		assertCurrent();
		if (opts.run) recordUpdateRunStep(opts.run.runId, {
			step: "previous generation restoration",
			status: "completed",
			endedAtMs: Date.now()
		}, { env: opts.run.env });
		failureReason = "restart-unhealthy";
		let verificationFailure;
		let verifiedAtMs;
		const restartOutcome = await maybeRestartService({
			onGatewayStartAttempted: params.onGatewayStartAttempted,
			shouldRestart: true,
			result,
			opts,
			refreshServiceEnv: false,
			expectedGatewayIdentity: {
				version: serviceIdentity.version,
				...serviceIdentity.buildId ? { buildId: serviceIdentity.buildId } : {}
			},
			serviceUpdateVerdict: verdict,
			serviceManagerUid: before?.serviceManagerUid,
			serviceEnv: recoveryEnv,
			serviceInstallEnv: before?.serviceDefinitionEnv,
			gatewayPort: port,
			requireRunningServiceAfterRestart: true,
			timeoutMs: params.timeoutMs,
			nodeRunner,
			invocationCwd: params.invocationCwd,
			onVerified: (at) => {
				verifiedAtMs = at;
			},
			onVerificationFailure: (reason) => {
				verificationFailure = reason;
			}
		});
		assertCurrent();
		const healthy = restartOutcome === "ok";
		return {
			result: {
				...result,
				recovery: {
					...result.recovery,
					service: healthy ? "healthy" : restartOutcome === "readiness-pending" || verificationFailure === "timeout" ? void 0 : verificationFailure || restartOutcome === "restart-health-failed" ? "failed" : void 0,
					reason: healthy ? void 0 : verificationFailure ?? (restartOutcome === "readiness-pending" ? "gateway-readiness-pending" : restartOutcome === "failed" ? "restart-failed" : "restart-unhealthy")
				}
			},
			rolledBack: healthy,
			stoppedForRollback,
			...verifiedAtMs === void 0 ? {} : { verifiedAtMs }
		};
	} catch (error) {
		if (error instanceof UpdateCommandPendingRecoveryFailure || hasCommandProcessCleanupError(error)) throw error;
		const detail = formatErrorMessage(error);
		try {
			assertCurrent();
		} catch (cause) {
			return {
				...pendingRecovery(result, formatErrorMessage(cause)),
				stoppedForRollback
			};
		}
		if (error instanceof NativePackageRollbackError) failureReason = error.reason;
		assertCurrent();
		const step = {
			name: "package rollback",
			command: "restore previous generation",
			cwd: params.previousRoot,
			durationMs: 0,
			exitCode: 1,
			stderrTail: detail,
			warnings: failureReason === "service-definition-rollback-unverified" ? [detail] : []
		};
		if (step.warnings.length) result.steps.push(step);
		if (run) {
			const endedAtMs = Date.now();
			for (const row of updateRunStepsFromResultStep(step)) recordUpdateRunStep(run.runId, {
				...row,
				detail,
				endedAtMs
			}, { env: run.env });
		}
		return failed(failureReason);
	}
}
//#endregion
//#region src/cli/update-cli/update-command-terminal-publication.ts
function completeUpdateCommandResult(params, result, serviceStop) {
	if (serviceStop?.stopped && serviceStop.serviceMembershipSourceAbsent && !result.steps.some((step) => step.name === "managed-service-membership")) {
		const message = "Service membership unverifiable on this host; using managed stop/update/start.";
		defaultRuntime.error(message);
		result.steps.push({
			name: "managed-service-membership",
			command: "openclaw update",
			cwd: result.root ?? "",
			durationMs: 0,
			exitCode: 0,
			advisory: {
				kind: "recoverable-maintenance",
				message
			}
		});
	}
	return normalizeControlPlaneUpdateResult({
		...result,
		...result.status === "error" && result.reason !== "update-activation-timeout" && params.rollbackBlockedReason ? { reason: params.rollbackBlockedReason } : {},
		durationMs: Math.max(0, Date.now() - params.startedAt)
	});
}
async function publishSettledUpdateCommandResult(params, state, onTerminalRecord) {
	const settled = await resolveSettledUpdateCommandResult(params, state.pendingResult, state.failure, state.terminalRecord);
	const result = completeUpdateCommandResult(params, settled.result);
	result.recovery = settled.settlementFailed ? void 0 : result.recovery;
	const reporting = state.readReportingState();
	const reportDowntime = !settled.settlementFailed && reporting.pendingRestartAtMs === void 0;
	if (reporting.notify) await reporting.notify(result);
	const { rolledBack, completedDowntimeMs } = state.readReportingState();
	return publishUpdateCommandTerminalResult(params, result, {
		rolledBack: rolledBack && !settled.settlementFailed,
		downtimeMs: reportDowntime ? completedDowntimeMs : void 0,
		captured: settled.captured
	}, onTerminalRecord);
}
function createPostUpdateFailureResult(params, error) {
	const message = formatErrorMessage(error);
	const failureFacts = collectUpdateDoctorFailureFacts(error);
	return {
		message,
		result: {
			...params.result,
			status: "error",
			reason: "post-update-failed",
			steps: [...params.result.steps, {
				name: "post-update verification",
				command: "openclaw update",
				cwd: params.result.root ?? params.root,
				durationMs: Math.max(0, Date.now() - params.startedAt),
				exitCode: 1,
				stderrTail: message,
				...failureFacts.length ? { failureFacts } : {}
			}]
		}
	};
}
//#endregion
//#region src/cli/update-cli/update-command-post-update.ts
async function finishUpdate(params, { candidateRuntime = false, onGatewayStartAttempted: observeGatewayStartAttempted } = {}) {
	const beganSuccessfully = params.result.status === "ok";
	let gatewayStartAttempted = false;
	const onGatewayStartAttempted = () => {
		gatewayStartAttempted = true;
		observeGatewayStartAttempted?.();
	};
	const definitionRecovery = {};
	const fence = createUpdateCommandFinalizationFence(params);
	const assertCurrent = params.opts.run?.requesterAuthority ? createUpdateCommandAuthority({
		opts: params.opts,
		assertCurrent: fence
	}).assertCurrent : fence;
	const parkForegroundOrigin = () => parkForegroundUpdateForActivation(params, assertCurrent);
	const sentinelOptions = {
		meta: params.controlPlaneUpdateSentinelMeta,
		jsonMode: Boolean(params.opts.json),
		env: params.opts.run?.env ?? params.ownedManagedUpdateEnv
	};
	assertCurrent();
	await assertUpdateCommandPackageFinalization(params);
	assertCurrent();
	const shouldRestart = prepareUpdateServiceResult(params);
	let gateway = "preserve";
	let triageAllowed = true;
	const createFailure = (result, exitCode = 1, detail, options) => new UpdateCommandFailure(result, exitCode, detail, {
		...options,
		automaticTriage: triageAllowed ? resolveAutomaticUpdateTriage(result, detail, {
			...params,
			gateway
		}) : void 0
	});
	let rollbackAttempted = false;
	let rollbackStopState;
	const currentServiceStop = () => rollbackStopState ?? params.preManagedServiceStop;
	let rolledBack = false;
	let originalServiceRecoveryHandled = false;
	let completedDowntimeMs = params.coreAlreadyCurrent ? 0 : void 0;
	let pendingRestartAtMs = params.preManagedServiceStop?.stoppedAtMs ?? params.controlPlaneUpdateSentinelMeta?.serviceStoppedAtMs;
	const recordVerifiedDowntime = (verifiedAtMs) => {
		if (pendingRestartAtMs !== void 0) {
			completedDowntimeMs = (completedDowntimeMs ?? 0) + Math.max(0, verifiedAtMs - pendingRestartAtMs);
			pendingRestartAtMs = void 0;
		}
	};
	assertCurrent();
	recordUpdateResultNextAction(params, params.result);
	let pendingResult = params.result;
	let terminalRecord;
	let pendingNotify = true;
	const writeRestartSentinel = (result) => writeControlPlaneUpdateRestartSentinelBestEffort({
		...sentinelOptions,
		result
	});
	const publishFinalResult = (failure, onTerminalRecord) => publishSettledUpdateCommandResult(params, {
		pendingResult,
		failure,
		terminalRecord,
		readReportingState: () => ({
			notify: pendingNotify ? writeRestartSentinel : void 0,
			rolledBack,
			pendingRestartAtMs,
			completedDowntimeMs
		})
	}, onTerminalRecord);
	const deferredTerminal = deferUpdateCommandTerminalResult(params.opts.run, publishFinalResult);
	const recoverFailedResult = async (initialResult, initialRecoverService) => {
		fence();
		if (params.databaseBackup?.restoreRefusal) params.rollbackBlockedReason = "state-migrated-no-rollback";
		let result = initialResult;
		let recoverService = initialRecoverService;
		if (result.status === "error" && (params.packageTransaction || params.rollbackBlockedReason || params.originalManagedServiceRuntime) && !rollbackAttempted && !isUpdateGatewayReadinessPending(result)) {
			rollbackAttempted = true;
			const rollback = await withOwnedManagedUpdateEnv(params.ownedManagedUpdateEnv, () => rollbackFailedUpdate({
				result,
				previousRoot: params.root,
				packageTransaction: params.packageTransaction,
				databaseBackup: beganSuccessfully && !gatewayStartAttempted ? params.databaseBackup : void 0,
				rollbackBlockedReason: params.rollbackBlockedReason,
				schemaVersions: params.schemaVersions,
				candidateSchemaVersions: params.candidateSchemaVersions,
				previousSchemaVersions: params.previousSchemaVersions,
				previousVerified: params.previousVerified,
				originalManagedServiceRuntime: params.originalManagedServiceRuntime,
				allowGatewayRestart: params.shouldRestart,
				onGatewayStartAttempted,
				configSnapshot: params.configSnapshot,
				activationConfig: params.activationConfig,
				opts: params.opts,
				preManagedServiceStop: params.preManagedServiceStop,
				timeoutMs: params.updateStepTimeoutMs,
				nodeRunner: params.packageUpdateNodeRunner,
				invocationCwd: params.invocationCwd,
				definitionRecovery
			}));
			if (params.originalManagedServiceRuntime && rollback.pendingRecoveryReason) throw new UpdateCommandPendingRecoveryFailure(rollback.result, rollback.pendingRecoveryReason);
			result = rollback.result;
			originalServiceRecoveryHandled = rollback.originalServiceRecovery !== void 0;
			rollbackStopState = rollback.stoppedForRollback;
			rolledBack = rollback.rolledBack;
			pendingRestartAtMs ??= rollbackStopState?.stoppedAtMs;
			if (rollback.verifiedAtMs !== void 0) recordVerifiedDowntime(rollback.verifiedAtMs);
			recoverService = false;
		}
		if (result.status === "error" && params.rollbackBlockedReason) {
			result = {
				...result,
				reason: params.rollbackBlockedReason
			};
			recoverService = false;
		} else if (result.status === "error" && params.result.status === "ok" && !params.packageTransaction && params.opts.run) recordUpdateRunStep(params.opts.run.runId, {
			step: "package rollback",
			status: "skipped",
			endedAtMs: Date.now(),
			detail: "No retained previous package transaction is available; automatic package restoration was not attempted."
		}, { env: params.opts.run.env });
		if (isUpdateGatewayReadinessPending(result)) {
			triageAllowed = false;
			return {
				result,
				recoverService: false
			};
		}
		return {
			result,
			recoverService
		};
	};
	const reportResult = async (initialResult, initialRecoverService = false, initialRestoreFailure, notify = true) => {
		const { result, recoverService } = await recoverFailedResult(initialResult, initialRecoverService);
		assertCurrent();
		let restoreFailure = initialRestoreFailure;
		let finalResult = completeUpdateCommandResult(params, result, currentServiceStop());
		const serviceVerdict = currentServiceStop()?.serviceUpdateVerdict;
		let root = finalResult.recovery?.packageRollbackVerified && serviceVerdict?.kind === "owned" ? serviceVerdict.root : finalResult.root ?? params.root;
		pendingResult = finalResult;
		pendingNotify = notify;
		if (!restoreFailure) try {
			if (!rolledBack && finalResult.status !== "ok" && !isUpdateGatewayReadinessPending(finalResult) && finalResult.recovery?.serviceRestartSafe !== true) await currentServiceStop()?.windowsTaskAutoStartRecovery?.complete(false);
			else {
				if (currentServiceStop()?.windowsTaskAutoStartRecovery) onGatewayStartAttempted();
				await resumePostUpdateWindowsAutoStart(params, finalResult, currentServiceStop());
			}
		} catch (cause) {
			restoreFailure = { cause };
		}
		if (restoreFailure) {
			rolledBack = false;
			try {
				await currentServiceStop()?.windowsTaskAutoStartRecovery?.complete(false);
			} catch (cause) {
				restoreFailure = { cause: new AggregateError([restoreFailure.cause, cause], `Windows task restoration and compensation failed: ${formatErrorMessage(restoreFailure.cause)}; ${formatErrorMessage(cause)}`) };
			}
			defaultRuntime.error(`Failed to restore Windows Scheduled Task autostart: ${String(restoreFailure.cause)}`);
			finalResult.status = "error";
			finalResult.reason = result.status === "error" ? result.reason : "windows-task-autostart-restore-failed";
			finalResult.recovery = {
				serviceRestartSafe: false,
				reason: "runtime-verification-failed"
			};
			finalResult.steps = finalResult.steps.concat({
				name: "windows-task-autostart-recovery",
				command: "openclaw update",
				cwd: finalResult.root ?? params.root,
				durationMs: 0,
				exitCode: 1,
				stderrTail: formatErrorMessage(restoreFailure.cause)
			});
		}
		const completedBeforeCleanup = deferredTerminal ? await captureUpdateCommandTerminalRecord(params, finalResult, assertCurrent) : void 0;
		assertCurrent();
		recordUpdateResultNextAction(params, finalResult, completedBeforeCleanup?.record);
		if (notify && recoverService) {
			pendingNotify = false;
			await writeRestartSentinel(finalResult);
		}
		if (recoverService && finalResult.recovery?.serviceRestartSafe === true) {
			const service = await maybeRestartServiceAfterFailedMutableUpdate({
				onGatewayStartAttempted,
				recovery: result.recovery,
				originalManagedServiceRuntime: params.originalManagedServiceRuntime,
				updateRun: params.opts.run,
				preManagedServiceStop: params.preManagedServiceStop,
				jsonMode: Boolean(params.opts.json),
				nodeRunner: params.packageUpdateNodeRunner,
				timeoutMs: params.updateStepTimeoutMs,
				invocationCwd: params.invocationCwd
			});
			if (service && !params.originalManagedServiceRuntime) {
				root = serviceVerdict && "root" in serviceVerdict ? serviceVerdict.root : root;
				finalResult.recovery = {
					...finalResult.recovery,
					service
				};
				if (service === "healthy" && params.shouldRestart) gateway = "verify-running";
				if (service === "failed") {
					finalResult.status = "error";
					try {
						await currentServiceStop()?.windowsTaskAutoStartRecovery?.complete(false);
					} catch (cause) {
						return await reportResult(finalResult, false, { cause }, false);
					}
				}
			}
		}
		await currentServiceStop()?.windowsTaskAutoStartRecovery?.complete(rolledBack || isUpdateGatewayReadinessPending(finalResult) || finalResult.status === "ok" || finalResult.recovery?.serviceRestartSafe === true && finalResult.recovery.service === "healthy");
		assertCurrent();
		const cleanupFailure = await recordUpdatePackageCompletion(params, finalResult, assertCurrent);
		assertCurrent();
		finalResult = cleanupFailure?.result ?? finalResult;
		if ((finalResult.status === "error" || cleanupFailure) && !originalServiceRecoveryHandled) {
			finalResult = await verifyUpdateFailureRecovery({
				result: finalResult,
				root,
				opts: params.opts,
				env: currentServiceStop()?.serviceEnv ?? params.ownedManagedUpdateEnv,
				timeoutMs: params.updateStepTimeoutMs,
				serviceStopped: !rolledBack && currentServiceStop()?.stopped,
				waitForStartup: params.result.status !== "error" || params.mutationStarted || params.preManagedServiceStop?.stopped === true || currentServiceStop()?.stopped === true || Boolean(params.originalManagedServiceRuntime?.definition.rebound) || rollbackAttempted,
				assertCurrent
			});
			assertCurrent();
			triageAllowed &&= !isUpdateGatewayReadinessPending(finalResult);
			rolledBack &&= isVerifiedUpdateRollback(finalResult);
		}
		pendingResult = completeUpdateCommandResult(params, finalResult);
		terminalRecord = deferredTerminal ? await captureUpdateCommandTerminalRecord(params, pendingResult, assertCurrent) : void 0;
		assertCurrent();
		const reportedResult = deferredTerminal ? pendingResult : await publishFinalResult();
		if (cleanupFailure) {
			const { detail } = cleanupFailure;
			throw new UpdateCommandFailure(reportedResult, 1, detail, { cause: cleanupFailure });
		}
		if (restoreFailure) {
			const priorDetail = [result.reason, params.failure?.detail].filter(Boolean).join(": ");
			const detail = `${priorDetail ? `${priorDetail}; ` : ""}Windows Scheduled Task autostart recovery failed: ` + formatErrorMessage(restoreFailure.cause);
			const cause = params.failure ? new AggregateError([params.failure.cause, restoreFailure.cause], detail, { cause: restoreFailure.cause }) : restoreFailure.cause;
			throw createFailure(reportedResult, resolveManagedServiceUpdateFailureExitCode(reportedResult), detail, { cause });
		}
		return reportedResult;
	};
	const restoreWindowsAutoStart = async (result) => {
		try {
			if (currentServiceStop()?.windowsTaskAutoStartRecovery) onGatewayStartAttempted();
			await resumePostUpdateWindowsAutoStart(params, result, currentServiceStop());
		} catch (cause) {
			await reportResult(result, false, { cause });
		}
	};
	const runPostUpdate = async () => {
		try {
			if (params.coreAlreadyCurrent && params.deferredMaintenance) {
				defaultRuntime.error(params.deferredMaintenance);
				return params.result;
			}
			if (params.result.status === "error" || params.result.recovery?.serviceRestartSafe === false) {
				const reported = await reportResult({
					...params.result,
					status: "error"
				}, params.result.recovery?.serviceRestartSafe === true);
				throw createFailure(reported, resolveManagedServiceUpdateFailureExitCode(reported), params.failure?.detail, params.failure);
			}
			if (params.result.status === "skipped" && !params.coreAlreadyCurrent) {
				const reported = await reportResult(params.result, params.result.recovery?.serviceRestartSafe === true);
				throw createFailure(reported, classifyUpdateOutcome(reported) === "failed" ? resolveManagedServiceUpdateFailureExitCode(reported) : 0);
			}
			const postUpdateRoot = params.result.root ?? params.root;
			const convergePlugins = async (beforeDoctor) => {
				const convergence = await convergeUpdatePlugins({
					...params,
					beforeDoctor: beforeDoctor ?? parkForegroundOrigin,
					beforeRuntimePublication: parkForegroundOrigin,
					assertCurrent,
					candidateRuntime
				});
				if (convergence.resultWithPostUpdate.status === "error") {
					triageAllowed = !convergence.cancelled;
					const reported = await reportResult(convergence.resultWithPostUpdate);
					throw createFailure(reported, resolveManagedServiceUpdateFailureExitCode(reported), convergence.detail);
				}
				return convergence;
			};
			const deferPluginConvergence = shouldRestart && params.preManagedServiceStop?.serviceMutationAllowed !== false && params.coreAlreadyCurrent === true && params.preManagedServiceStop?.serviceUpdateVerdict?.kind === "owned";
			let resultWithPostUpdate = params.result;
			let postUpdateConfigSnapshot;
			if (!deferPluginConvergence) {
				({resultWithPostUpdate, postUpdateConfigSnapshot} = await convergePlugins());
				if (params.coreAlreadyCurrent) {
					if (params.preManagedServiceStop?.serviceUpdateVerdict?.kind === "absent" && params.preManagedServiceStop.serviceMutationSkipMessage) defaultRuntime.error(params.preManagedServiceStop.serviceMutationSkipMessage);
					else if (params.preManagedServiceStop?.serviceMutationSkipMessage) recordServiceReconciliationWarning(resultWithPostUpdate, params.preManagedServiceStop.serviceEnv ?? process.env, params.preManagedServiceStop.serviceMutationSkipMessage);
					return resultWithPostUpdate;
				}
			}
			const restartConfigSnapshot = postUpdateConfigSnapshot ?? await withOwnedManagedUpdateEnv(params.ownedManagedUpdateEnv, async () => readConfigFileSnapshot({
				observe: false,
				skipPluginValidation: true,
				suppressFutureVersionWarning: true
			}));
			let restartContext;
			try {
				restartContext = await prepareUpdateRestart({
					...params,
					shouldRestart,
					result: resultWithPostUpdate,
					assertCurrent
				}, restartConfigSnapshot);
			} catch (error) {
				const message = error instanceof GatewayServiceUpdateOwnershipError ? error.message : formatErrorMessage(error);
				defaultRuntime.error(message);
				const reported = await reportResult({
					...resultWithPostUpdate,
					status: "error",
					reason: "service-revalidation-failed"
				});
				throw createFailure(reported, resolveManagedServiceUpdateFailureExitCode(reported), message, { cause: error });
			}
			const notifyRestart = () => writeRestartSentinel(buildControlPlaneUpdateRestartHealthPendingResult(resultWithPostUpdate));
			if (!params.coreAlreadyCurrent) {
				await notifyRestart();
				await restoreWindowsAutoStart(resultWithPostUpdate);
			}
			let verificationFailure = "restart-unhealthy";
			const restart = async () => {
				const restarted = await withOwnedManagedUpdateEnv(params.ownedManagedUpdateEnv, async () => maybeRestartService({
					onGatewayStartAttempted,
					originalManagedServiceRuntime: params.originalManagedServiceRuntime,
					shouldRestart: shouldRestart && restartContext.serviceMutationAllowed,
					result: resultWithPostUpdate,
					opts: params.opts,
					refreshServiceEnv: restartContext.refreshGatewayServiceEnv,
					definitionRecovery,
					serviceUpdateVerdict: restartContext.serviceUpdateVerdict,
					serviceManagerUid: restartContext.serviceManagerUid,
					serviceRuntimeRefreshRequired: params.serviceRuntimeRefreshRequired,
					serviceEnv: restartContext.gatewayServiceEnv,
					serviceInstallEnv: restartContext.gatewayServiceInstallEnv,
					gatewayPort: restartContext.gatewayPort,
					invocationCwd: params.invocationCwd,
					nodeRunner: params.packageUpdateNodeRunner,
					skipLegacyServiceRestart: restartContext.skipLegacyServiceRestart,
					requireRunningServiceAfterRestart: currentServiceStop()?.stopped === true,
					serviceMutationSkipMessage: restartContext.serviceMutationSkipMessage,
					timeoutMs: params.updateStepTimeoutMs,
					onVerificationFailure: (reason) => {
						verificationFailure = reason;
					},
					onPluginWarnings: (warnings) => {
						resultWithPostUpdate = appendPluginUpdateWarnings(resultWithPostUpdate, warnings);
					},
					onVerified: recordVerifiedDowntime
				}));
				if (restarted !== "failed" && restarted !== "restart-health-failed") return restarted === "ok";
				triageAllowed = restartContext.serviceMutationAllowed;
				if (restarted === "restart-health-failed" && params.shouldRestart && restartContext.serviceMutationAllowed && (params.preManagedServiceStop?.running !== false || params.preManagedServiceStop.stopped) && !restartContext.skipLegacyServiceRestart) gateway = "verify-running";
				const failure = {
					...resultWithPostUpdate,
					status: "error",
					reason: verificationFailure,
					recovery: {
						serviceRestartSafe: false,
						reason: "runtime-verification-failed"
					}
				};
				const recovered = await recoverFailedResult(failure, false);
				if (recovered.result.status !== "ok") {
					await markControlPlaneUpdateRestartSentinelFailureBestEffort({
						...sentinelOptions,
						reason: recovered.result.reason ?? verificationFailure
					});
					const reported = await reportResult(recovered.result, false, void 0, false);
					throw createFailure(reported, resolveManagedServiceUpdateFailureExitCode(reported));
				}
				resultWithPostUpdate = recovered.result;
				return true;
			};
			if (!params.coreAlreadyCurrent) await restart();
			if (deferPluginConvergence) {
				({resultWithPostUpdate, postUpdateConfigSnapshot} = await convergePlugins(async () => {
					const before = currentServiceStop();
					if (!before) throw new Error("Plugin maintenance lost its update service owner.");
					await before.windowsTaskAutoStartRecovery?.complete(true);
					const stopped = await maybeStopManagedServiceBeforeMutableUpdate({
						updateRun: params.opts.run,
						updateInstallKind: resultWithPostUpdate.mode === "git" ? "git" : "package",
						root: postUpdateRoot,
						shouldRestart: true,
						jsonMode: Boolean(params.opts.json),
						expectedService: before,
						phase: "prepare",
						timeoutMs: params.updateStepTimeoutMs,
						onStopped: (state) => {
							rollbackStopState = state;
							pendingRestartAtMs ??= state.stoppedAtMs;
						}
					});
					rollbackStopState = stopped;
					before.windowsTaskAutoStartRecovery = stopped.windowsTaskAutoStartRecovery;
					if (stopped.blockMessage || !stopped.stopped) throw new Error(stopped.blockMessage ?? "Gateway could not be parked for plugin maintenance.");
					stopped.windowsTaskAutoStartRecovery?.beginMutation();
					pendingRestartAtMs ??= stopped.stoppedAtMs;
				}));
				const requiresInstallRootRefresh = restartContext.serviceUpdateVerdict?.kind === "owned" && restartContext.serviceUpdateVerdict.requiresInstallRootRefresh;
				if (resultWithPostUpdate.postUpdate?.plugins?.changed || params.serviceRuntimeRefreshRequired || requiresInstallRootRefresh) {
					restartContext = await prepareUpdateRestart({
						...params,
						result: resultWithPostUpdate,
						shouldRestart,
						preManagedServiceStop: currentServiceStop(),
						assertCurrent
					}, postUpdateConfigSnapshot ?? restartConfigSnapshot);
					pendingRestartAtMs ??= Date.now();
					if (!params.serviceRuntimeRefreshRequired && !requiresInstallRootRefresh) restartContext.refreshGatewayServiceEnv = false;
					await notifyRestart();
					await restoreWindowsAutoStart(resultWithPostUpdate);
					const reconciled = await restart();
					if (requiresInstallRootRefresh && reconciled && resultWithPostUpdate.status === "skipped") {
						resultWithPostUpdate.status = "ok";
						delete resultWithPostUpdate.reason;
					}
				}
				return resultWithPostUpdate;
			}
			const maintenanceFailure = await completePostUpdateMaintenance(params, resultWithPostUpdate, assertCurrent, {
				root: postUpdateRoot,
				sentinel: sentinelOptions
			});
			if (maintenanceFailure) {
				const reported = await reportResult(maintenanceFailure.result, false, void 0, false);
				throw createFailure(reported, 1, maintenanceFailure.detail);
			}
			return resultWithPostUpdate;
		} catch (error) {
			if (params.originalManagedServiceRuntime && error instanceof UpdateCommandRecoveryPendingError) throw new UpdateCommandPendingRecoveryFailure(pendingResult, formatErrorMessage(error), { cause: error });
			if (error instanceof UpdateCommandFailure || hasCommandProcessCleanupError(error)) throw error;
			const { result, message } = createPostUpdateFailureResult(params, error);
			defaultRuntime.error(`Post-update verification failed: ${message}`);
			const reported = await reportResult(result);
			throw createFailure(reported, resolveManagedServiceUpdateFailureExitCode(reported), message, { cause: error });
		}
	};
	return await reportResult(await runPostUpdate());
}
//#endregion
export { assertUpdateCommandRecoveryState as a, resumePostCoreUpdate as c, isOmittedUpdateTimeout as d, assertUpdateCommandRecovery as i, writePostCoreUpdateFailureFile as l, captureUpdateDatabases as n, createUpdateCommandFinalizationFence as o, restoreFailedUpdateDatabases as r, readOriginalUpdateRecovery as s, finishUpdate as t, createUpdateTimeoutHandoff as u };
