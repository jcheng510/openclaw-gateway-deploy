import { n as serveWorkerTasks } from "../../worker-task-server-Dj9rLvzH.mjs";
import { n as readSessionPhysicalDiskUsage } from "../../disk-budget-files-DE2PkCPJ.mjs";
//#region src/config/sessions/disk-budget.worker.ts
serveWorkerTasks((input) => {
	return readSessionPhysicalDiskUsage(input);
});
//#endregion
export {};
