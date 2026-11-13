import { t as coerceErrorMessage } from "./error-coercion-1P2One0X.mjs";
import { n as createSqliteSnapshotStagingDirectory, r as createSqliteSnapshotStagingDirectorySync } from "./sqlite-snapshot-staging-C3ICAs3m.mjs";
import { c as removeTempDirectoryAsync, n as adoptPreparedLocation, s as removeTempDirectory, t as SqliteSnapshotCleanupError } from "./sqlite-readonly-location-cleanup-HvAn98XM.mjs";
import { r as prepareSingleFlightSqliteSnapshot, t as prepareSqliteSnapshotFromLiveOwner } from "./sqlite-live-snapshot-lXqLzx4P.mjs";
import { c as resolveSqliteInspectionSignal, l as runSqliteReadOnlyWorker, u as runSqliteReadOnlyWorkerSync } from "./sqlite-readonly-worker-cuICqy4r.mjs";
import fs from "node:fs";
//#region src/infra/sqlite-snapshot-source.ts
async function prepareSqliteReadOnlyLocation(pathname, options = {}) {
	const signal = resolveSqliteInspectionSignal(options.signal);
	try {
		signal?.throwIfAborted();
		if (!options.preserveSourceArtifacts && options.allowLiveOwner !== false) {
			const owned = prepareSqliteSnapshotFromLiveOwner(pathname, signal);
			if (owned) return await owned;
		}
		return prepareWorkerSnapshot(pathname, options, signal, false);
	} catch (error) {
		signal?.throwIfAborted();
		throw error;
	}
}
/** Fixed worker readers hold their own token until their private native reader closes. */
function prepareSqliteReadOnlyLocationAsync(pathname, options = {}) {
	return prepareWorkerSnapshot(pathname, options, resolveSqliteInspectionSignal(options.signal), true);
}
function prepareWorkerSnapshot(pathname, options, signal, asynchronousCleanup) {
	signal?.throwIfAborted();
	return prepareSingleFlightSqliteSnapshot(pathname, `${options.preserveSourceArtifacts ? "worker-sync" : "worker-async"}:${options.signal ? "strict" : "best-effort"}:${asynchronousCleanup ? "async-token" : "sync-token"}`, async (flightSignal, recordCleanupFailure) => {
		let stagingRoot;
		try {
			flightSignal.throwIfAborted();
			stagingRoot = await createSqliteSnapshotStagingDirectory(void 0, false, flightSignal, asynchronousCleanup);
			flightSignal.throwIfAborted();
			const location = await runSqliteReadOnlyWorker(pathname, {
				mode: options.preserveSourceArtifacts ? "sync" : "async",
				signal: flightSignal,
				stagingRoot
			});
			flightSignal.throwIfAborted();
			return adoptPreparedLocation(location, stagingRoot, options.signal !== void 0);
		} catch (error) {
			if (stagingRoot && !await removeTempDirectoryAsync(stagingRoot)) {
				const failure = new SqliteSnapshotCleanupError(`${coerceErrorMessage(error)}; SQLite snapshot cleanup failed: ${stagingRoot}`, { cause: error });
				recordCleanupFailure(failure);
				throw failure;
			}
			if (error instanceof SqliteSnapshotCleanupError || asynchronousCleanup && error instanceof AggregateError) {
				recordCleanupFailure(error);
				throw error;
			}
			flightSignal.throwIfAborted();
			throw error;
		}
	}, signal);
}
function prepareSqliteReadOnlyLocationSync(pathname) {
	const stagingRoot = createSqliteSnapshotStagingDirectorySync();
	try {
		return adoptPreparedLocation(runSqliteReadOnlyWorkerSync(pathname, stagingRoot), stagingRoot);
	} catch (error) {
		if (!removeTempDirectory(stagingRoot)) throw new SqliteSnapshotCleanupError(`${coerceErrorMessage(error)}; SQLite snapshot cleanup failed: ${stagingRoot}`, { cause: error });
		throw error;
	}
}
async function prepareSqliteSnapshotSource(pathname) {
	const canonicalPath = fs.realpathSync.native(pathname);
	const journalPath = `${canonicalPath}-journal`;
	let journal;
	try {
		journal = fs.lstatSync(journalPath, { bigint: true });
	} catch (error) {
		if (error.code === "ENOENT") return;
		throw error;
	}
	if (!journal.isFile()) throw new Error(`SQLite rollback journal must be a regular file: ${journalPath}`);
	return await prepareSqliteReadOnlyLocation(canonicalPath);
}
async function withSqliteSnapshotSource(pathname, operation) {
	let prepared = await prepareSqliteSnapshotSource(pathname);
	try {
		try {
			return prepared ? await operation(prepared.location) : await operation(pathname);
		} catch (error) {
			if (prepared) throw error;
			prepared = await prepareSqliteSnapshotSource(pathname);
			if (!prepared) throw error;
			return await operation(prepared.location);
		}
	} finally {
		await prepared?.cleanupAsync();
	}
}
/** Fresh bytes without opening SQLite or making another durable private copy. */
function readSqliteSourceContentVersionSync(pathname) {
	return runSqliteReadOnlyWorkerSync(pathname, void 0, "content-version") || void 0;
}
//#endregion
export { withSqliteSnapshotSource as a, readSqliteSourceContentVersionSync as i, prepareSqliteReadOnlyLocationAsync as n, prepareSqliteReadOnlyLocationSync as r, prepareSqliteReadOnlyLocation as t };
