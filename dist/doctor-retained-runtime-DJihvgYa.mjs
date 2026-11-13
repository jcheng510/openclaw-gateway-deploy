import { i as resolveOpenClawPackageRootsSync } from "./openclaw-root-3-SBP6RS.mjs";
import { o as getOpenClawDatabaseMaintenanceScope } from "./openclaw-state-db-async-lifecycle-D4cx8OBO.mjs";
import { t as maintainRetainedUpdateRuntimes } from "./temp-artifact-cleanup-DA2wQVhY.mjs";
import { t as note } from "./note-BpWs6H5N.mjs";
import { t as inspectDoctorTemporaryDirectories } from "./temporary-directories-D9gfjHvu.mjs";
//#region src/commands/doctor-retained-runtime.ts
async function noteRetainedUpdateRuntimes(env, shouldRepair) {
	const maintenance = getOpenClawDatabaseMaintenanceScope();
	const { directories, warnings } = await inspectDoctorTemporaryDirectories(env);
	const lines = await maintainRetainedUpdateRuntimes({
		packageRoots: resolveOpenClawPackageRootsSync({
			moduleUrl: import.meta.url,
			argv1: process.argv[1],
			cwd: process.cwd()
		}),
		temporaryDirectories: directories,
		repair: shouldRepair,
		assertCurrent() {
			if (!maintenance?.ownsSchemaMaintenance) throw new Error("Doctor does not hold Gateway maintenance");
			maintenance.assertAdmission();
		}
	});
	lines.push(...warnings);
	if (lines.length) note(lines.join("\n"), "Updater runtimes");
}
//#endregion
export { noteRetainedUpdateRuntimes };
