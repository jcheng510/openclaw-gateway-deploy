import { c as isRecord } from "../../record-coerce-TIsquoVR.mjs";
import { t as openNodeSqliteDatabase } from "../../node-sqlite-B4hwsR7e.mjs";
import { i as tableExists } from "../../openclaw-state-db-schema-helpers-C29HKgWe.mjs";
import { u as runSqliteReadOnlyWorkerSync } from "../../sqlite-readonly-worker-cuICqy4r.mjs";
import { W as cronRunRecordStoreKey, r as openOpenClawStateReadConnection, t as assertStateReadSchema } from "../../openclaw-state-db-read-connection-DJObJIAO.mjs";
import { n as serveWorkerTasks } from "../../worker-task-server-Dj9rLvzH.mjs";
import { t as inspectCronRowsForDoctor } from "../../doctor-inventory-DqCiHZyQ.mjs";
import { n as serializeCronLoadError } from "../../load-error-Hk_r_XY_.mjs";
import { t as loadCronStoreFromDatabase } from "../../load.kernel-D0YbW3jN.mjs";
import { n as readCronRunRecordsInDatabase } from "../../run-history.kernel--Y98rxfv.mjs";
//#region src/cron/store/read-only.worker.ts
serveWorkerTasks(async (input, _channel, control) => {
	try {
		if (!isRecord(input) || typeof input.location !== "string" || input.storeKey !== void 0 && typeof input.storeKey !== "string" || input.stagingRoot !== void 0 && typeof input.stagingRoot !== "string" || input.history !== void 0 && (typeof input.storeKey !== "string" || !isRecord(input.history) || input.history.jobId !== void 0 && typeof input.history.jobId !== "string")) throw new Error("Cron read-only worker requires a database location and an optional store key");
		const { location, storeKey, stagingRoot } = input;
		return await control.runNativeSection(() => {
			const connection = stagingRoot ? openOpenClawStateReadConnection(location, runSqliteReadOnlyWorkerSync(location, stagingRoot), void 0, stagingRoot) : void 0;
			const db = connection?.database.db ?? openNodeSqliteDatabase(location, { readOnly: true });
			try {
				if (isRecord(input.history)) {
					assertStateReadSchema(db, location);
					return {
						ok: true,
						history: readCronRunRecordsInDatabase(db, typeof input.history.jobId === "string" ? input.history.jobId : void 0).filter((row) => cronRunRecordStoreKey(row) === storeKey)
					};
				}
				return {
					ok: true,
					inventory: storeKey === void 0 ? inspectCronRowsForDoctor(db) : void 0,
					loaded: storeKey !== void 0 && tableExists(db, "cron_jobs") ? loadCronStoreFromDatabase(db, storeKey) : void 0
				};
			} finally {
				if (connection) connection.close();
				else db.close();
			}
		});
	} catch (error) {
		return {
			ok: false,
			error: serializeCronLoadError(error)
		};
	}
});
//#endregion
export {};
