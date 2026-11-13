import { t as hasErrnoCode } from "./errno-FR4CRyya.mjs";
import { r as resolveStateDir } from "./state-dir-CfAW6S2K.mjs";
import { r as cloneEnvWithPlatformSemantics } from "./config-env-vars-C__rW8Th.mjs";
import { r as isArtifactPreservingStateRead } from "./openclaw-state-db-readonly-DE3MB0wy.mjs";
import { i as resolvePluginSourceCapturesDirectory, r as resolvePluginSourceCaptureFallbackPrefix } from "./plugin-source-capture-path-L0n-8p-6.mjs";
import { C as setActiveDegradedPlugins } from "./discovery-BePzXbRd.mjs";
import { i as throwStartupMigrationGuardRejected, r as rethrowStartupConfigFailure } from "./doctor-startup-migration-refusal-BUpd_Lzf.mjs";
import { s as recordStartupMigrationWarnings } from "./state-migrations.messages-DZiaEGjz.mjs";
import { a as readConfigPreflightSnapshot, i as readAdmittedConfigSnapshot, n as needsRefreshedPluginIndexPersistence, r as persistRefreshedPluginIndex, t as assertPreflightConfigUnchanged } from "./config-preflight-snapshot-D4KXv22P.mjs";
import { t as refreshStartupPluginQuarantine } from "./doctor-config-preflight-plugin-verification-B1Q7yyEy.mjs";
import fs from "node:fs/promises";
import { tmpdir } from "node:os";
//#region src/commands/startup-plugin-source-captures.ts
async function hasCaptureDirectories(stateDir, directory) {
	try {
		await fs.access(directory);
		return true;
	} catch (error) {
		if (!hasErrnoCode(error, "ENOENT")) throw error;
	}
	const prefix = resolvePluginSourceCaptureFallbackPrefix(stateDir);
	try {
		for await (const entry of await fs.opendir(tmpdir())) if (entry.isDirectory() && entry.name.startsWith(prefix)) return true;
	} catch (error) {
		if (!hasErrnoCode(error, "ENOENT")) throw error;
	}
	return false;
}
/** Reclaim retired payloads before runtime loading, using the same receipt owner as Doctor. */
async function cleanupStartupPluginSourceCaptures(env = process.env) {
	if (isArtifactPreservingStateRead()) return;
	const stateDir = resolveStateDir(env);
	const directory = resolvePluginSourceCapturesDirectory(stateDir);
	try {
		if (!await hasCaptureDirectories(stateDir, directory)) return;
		const [{ withDoctorSqliteMaintenanceLock, DoctorSqliteMaintenanceLockUnavailableError }, { pruneUnreferencedPluginNativeCaptures }, { isGatewayLifecycleContentionError }] = await Promise.all([
			import("./doctor-sqlite-maintenance-lock-BMIeQhbQ.mjs"),
			import("./plugin-source-capture-report-UvN1qTM0.mjs"),
			import("./gateway-lock-B1APoK4k.mjs")
		]);
		const result = await withDoctorSqliteMaintenanceLock({
			env,
			operation: "plugin source cleanup",
			protectedPaths: [directory],
			run: (authority) => pruneUnreferencedPluginNativeCaptures(stateDir, () => authority.assertCurrent(), env, { startup: true })
		}).catch((error) => {
			if (error instanceof DoctorSqliteMaintenanceLockUnavailableError && isGatewayLifecycleContentionError(error.cause)) return;
			throw error;
		});
		if (result?.warnings.length) process.emitWarning(`Plugin source capture startup cleanup: ${result.warnings.join("; ")}`);
	} catch (error) {
		process.emitWarning(`Plugin source capture startup cleanup deferred: ${String(error)}`);
	}
}
//#endregion
//#region src/commands/startup-config-preflight.ts
/** Prepare current runtime state; legacy imports and repair receipts belong to Doctor. */
async function runStartupConfigPreflight(options) {
	const { withSqliteReadOnlyWorkerScope } = await import("./sqlite-readonly-worker-ChyOPBgv.mjs");
	try {
		return await withSqliteReadOnlyWorkerScope(() => prepareStartupConfig(options));
	} catch (error) {
		if (options.gateway) rethrowStartupConfigFailure(error);
		throw error;
	}
}
async function prepareStartupConfig(options) {
	let env = process.env;
	const measure = options.measure ?? (async (_name, run) => await run());
	const readSnapshot = (readOptions) => readConfigPreflightSnapshot({
		allowCurrentPluginMetadata: false,
		includePluginMetadata: true,
		isolateEnv: readOptions?.isolateEnv,
		preparePluginMetadataSnapshot: true,
		skipPluginValidation: false,
		observe: options.gateway ? false : options.observe,
		measure
	});
	const beforeStatePreparation = async (snapshot) => {
		if (options.beforeStatePreparation && !await options.beforeStatePreparation(snapshot)) throwStartupMigrationGuardRejected();
	};
	if (!options.gateway) {
		const read = await readSnapshot();
		await beforeStatePreparation(read.snapshot);
		if (read.snapshot.valid && options.observe !== false) await cleanupStartupPluginSourceCaptures(env);
		return result(read);
	}
	const readAdmitted = () => readAdmittedConfigSnapshot({
		env,
		readSnapshot,
		validateConfig: options.validateStartupConfig,
		beforeStatePreparation: options.beforeStatePreparation
	});
	let read = await readAdmitted();
	env = cloneEnvWithPlatformSemantics(process.env);
	if (!read.snapshot.valid) return result(read);
	if (options.observe !== false) await cleanupStartupPluginSourceCaptures(env);
	let lease;
	let heartbeat;
	let heartbeatError;
	const assertHeartbeatCurrent = () => {
		if (heartbeatError) throw heartbeatError;
	};
	const assertLeaseCurrent = () => {
		assertHeartbeatCurrent();
		lease?.heartbeat();
	};
	try {
		if (read.recovery || needsRefreshedPluginIndexPersistence(read)) {
			const { acquireStartupMigrationLeaseWithWait } = await import("./startup-migration-checkpoint-L46at2FH.mjs");
			lease = await acquireStartupMigrationLeaseWithWait({ env });
			heartbeat = setInterval(() => {
				try {
					lease?.heartbeat();
				} catch (error) {
					heartbeatError = error instanceof Error ? error : new Error("OpenClaw startup lease heartbeat failed.", { cause: error });
				}
			}, 6e4);
			heartbeat.unref();
			read = await readAdmitted();
			if (!read.snapshot.valid) return result(read);
			assertLeaseCurrent();
			if (read.recovery) {
				const recovered = read.snapshot;
				await read.recovery.apply(assertLeaseCurrent);
				read = await readSnapshot();
				assertPreflightConfigUnchanged(recovered, read.snapshot);
			}
			if (needsRefreshedPluginIndexPersistence(read)) read = (await persistRefreshedPluginIndex({
				env,
				lease,
				measure,
				readPersistedSnapshot: readSnapshot,
				snapshotRead: read,
				assertCurrent: assertHeartbeatCurrent
			})).snapshotRead;
		}
		const verification = await refreshStartupPluginQuarantine({
			cfg: read.snapshot.sourceConfig,
			env,
			measure
		});
		setActiveDegradedPlugins(verification.quarantinedPlugins);
		recordStartupMigrationWarnings([...verification.warnings ?? [], ...(verification.deferredPlugins ?? []).map((plugin) => `Plugin "${plugin.pluginId}": ${plugin.reason}. Run \`${plugin.command}\`.`)]);
		await beforeStatePreparation(read.snapshot);
		assertLeaseCurrent();
		return result(read);
	} finally {
		clearInterval(heartbeat);
		lease?.release();
	}
}
function result(read) {
	return {
		snapshot: read.snapshot,
		baseConfig: read.snapshot.sourceConfig,
		...read.pluginMetadataSnapshot ? { pluginMetadataSnapshot: read.pluginMetadataSnapshot } : {}
	};
}
//#endregion
export { runStartupConfigPreflight };
