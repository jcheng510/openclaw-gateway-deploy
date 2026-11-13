import { t as openNodeSqliteDatabase } from "./node-sqlite-B4hwsR7e.mjs";
import "./openclaw-state-db-contract-CQDemVBb.mjs";
import { r as readFiniteSqliteNumber } from "./sqlite-number-DZt1m75H.mjs";
import { p as truncateSqliteWal } from "./sqlite-wal-fdekKFS3.mjs";
import { n as assertSqliteIntegrity } from "./sqlite-integrity-BWdDHT-b.mjs";
import "./openclaw-state-db-DM-mSY0m.mjs";
import fs from "node:fs";
//#region src/commands/doctor-sqlite-compact.ts
/** Shared doctor-only SQLite compaction mechanics. */
/**
* Compact one SQLite file during an explicit offline doctor operation.
*
* Validation runs before the first checkpoint because checkpointing mutates
* the database files. A busy checkpoint is a hard failure, never partial
* success, so VACUUM cannot race an active reader or writer.
*/
function compactDoctorSqliteFile(options) {
	const database = openNodeSqliteDatabase(options.sqlitePath);
	let operationError;
	let result;
	try {
		database.exec(`PRAGMA busy_timeout = ${options.busyTimeoutMs ?? 5e3};`);
		database.exec("PRAGMA trusted_schema = OFF;");
		options.validateBeforeMutation?.(database);
		const before = readCompactSnapshot(database, options.sqlitePath);
		let { integrityCheck } = assertSqliteIntegrity(database, options.sqlitePath);
		if (!(options.operation === "import-finalize" && before.autoVacuum === 2 && before.freelistPages === 0 && before.walSizeBytes === 0)) {
			truncateSqliteWal(database, options.sqlitePath);
			database.exec("PRAGMA auto_vacuum = INCREMENTAL;");
			database.exec(options.operation === "import-finalize" && before.autoVacuum !== 0 ? "PRAGMA incremental_vacuum;" : "VACUUM;");
			truncateSqliteWal(database, options.sqlitePath);
			({integrityCheck} = assertSqliteIntegrity(database, options.sqlitePath));
		}
		const after = readCompactSnapshot(database, options.sqlitePath);
		const beforeBytes = before.dbSizeBytes + before.walSizeBytes;
		const afterBytes = after.dbSizeBytes + after.walSizeBytes;
		result = {
			after,
			before,
			integrityCheck,
			reclaimedBytes: Math.max(0, beforeBytes - afterBytes)
		};
	} catch (error) {
		operationError = error;
	}
	try {
		database.close();
	} catch (error) {
		operationError ??= error;
	}
	if (operationError === void 0 && result) try {
		options.afterSuccess?.();
	} catch (error) {
		operationError ??= error;
	}
	if (operationError !== void 0) throw operationError instanceof Error ? operationError : /* @__PURE__ */ new Error("SQLite compaction failed with a non-Error value.");
	if (!result) throw new Error(`SQLite compaction produced no result for ${options.sqlitePath}.`);
	return result;
}
function readCompactSnapshot(database, sqlitePath) {
	return {
		autoVacuum: readPragmaNumber(database, "auto_vacuum"),
		dbSizeBytes: fileSize(sqlitePath),
		freelistPages: readPragmaNumber(database, "freelist_count"),
		pageSizeBytes: readPragmaNumber(database, "page_size"),
		walSizeBytes: fileSize(`${sqlitePath}-wal`)
	};
}
function readPragmaNumber(database, pragmaName) {
	const row = database.prepare(`PRAGMA ${pragmaName};`).get();
	const value = readFiniteSqliteNumber(row?.[pragmaName] ?? (row ? Object.values(row)[0] : void 0));
	if (value === void 0) throw new Error(`SQLite PRAGMA ${pragmaName} returned an invalid result.`);
	return value;
}
function fileSize(filePath) {
	try {
		return fs.statSync(filePath).size;
	} catch (error) {
		if (error.code === "ENOENT") return 0;
		throw error;
	}
}
//#endregion
export { compactDoctorSqliteFile as t };
