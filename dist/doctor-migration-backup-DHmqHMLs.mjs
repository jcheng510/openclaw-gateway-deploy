import { o as getOpenClawDatabaseMaintenanceScope } from "./openclaw-state-db-async-lifecycle-D4cx8OBO.mjs";
import { s as resolveOpenClawStateSqlitePath } from "./openclaw-state-db.paths-rJI64Ab5.mjs";
import { existsSync, realpathSync, statSync } from "node:fs";
import { randomUUID } from "node:crypto";
//#region src/commands/doctor-migration-backup.ts
/** Preserve the old database generation before Doctor advances its schemas. */
async function backupDoctorMigrationDatabases(params) {
	const { detectOpenClawStateDatabaseSchemaMigrations } = await import("./openclaw-state-db-schema-discovery-Idvid3mU.mjs");
	const sharedPath = resolveOpenClawStateSqlitePath(params.env);
	const pending = new Set(params.pendingDatabasePaths);
	if (detectOpenClawStateDatabaseSchemaMigrations({ env: params.env }).length > 0) pending.add(sharedPath);
	if (pending.size === 0) return {
		changes: [],
		warnings: []
	};
	if (existsSync(sharedPath)) pending.add(sharedPath);
	const maintenance = getOpenClawDatabaseMaintenanceScope();
	if (!maintenance?.ownsSchemaMaintenance) throw new Error("Pre-migration SQLite backups require Doctor maintenance ownership.");
	maintenance.assertAdmission();
	const { createVerifiedSqliteSnapshot } = await import("./sqlite-snapshot-Bb4ZpYp_.mjs");
	const { sanitizeOpenClawStateLeaseRows } = await import("./openclaw-state-snapshot-sanitizer-D7-vi2mn.mjs");
	maintenance.assertAdmission();
	const backupId = randomUUID();
	const changes = [];
	for (const sourcePath of new Set([...pending].map((pathname) => realpathSync.native(pathname)))) {
		maintenance.assertAdmission();
		const identity = statSync(sourcePath);
		if (identity.dev !== 0 && identity.ino !== 0 && params.verifiedSnapshots?.some((snapshot) => snapshot.dev === identity.dev && snapshot.ino === identity.ino)) continue;
		const backup = await createVerifiedSqliteSnapshot({
			sourcePath,
			targetPath: `${sourcePath}.pre-startup-migration-${backupId}.bak`,
			preserveRowIds: true,
			transform: sanitizeOpenClawStateLeaseRows,
			beforePublish: () => maintenance.assertAdmission()
		});
		maintenance.assertAdmission();
		changes.push(`Saved pre-migration SQLite backup: ${backup.path}`);
	}
	return {
		changes,
		warnings: []
	};
}
//#endregion
export { backupDoctorMigrationDatabases };
