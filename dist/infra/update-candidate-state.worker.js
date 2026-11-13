import { n as collectErrorGraphCandidates } from "../error-coercion-1P2One0X.mjs";
import { n as formatErrorMessageWithCode } from "../errors-YPvSaqwO.mjs";
import { _ as createUpdateStateInspectionReporter, a as discoverUpdateStateSchemaInspectionInProcess, d as snapshotUpdateCandidateState, l as readUpdateStateSchemaVersionsInProcess, o as readUpdateCandidateStateInventoryInProcess } from "../update-candidate-state-DSdpv9IU.mjs";
//#region src/infra/update-candidate-state.worker.ts
async function snapshotCandidateState() {
	const chunks = [];
	for await (const chunk of process.stdin) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
	const input = JSON.parse(Buffer.concat(chunks).toString("utf8"));
	switch (input.mode) {
		case "database-generations": {
			const { readUpdateDatabaseGenerations } = await import("../update-database-generations-CrTqaFUJ.mjs");
			return readUpdateDatabaseGenerations(input.paths);
		}
		case "inventory": {
			const { databases, ...inventory } = await readUpdateCandidateStateInventoryInProcess({
				...input,
				onProgress: createUpdateStateInspectionReporter(!input.streamProgress)
			});
			return {
				...inventory,
				databases: [...databases]
			};
		}
		case "database-backup": {
			const { createUpdateDatabaseBackupInProcess } = await import("../update-database-backup-CwyIrbzC.mjs");
			return createUpdateDatabaseBackupInProcess({
				...input,
				onProgress: createUpdateStateInspectionReporter()
			});
		}
		case "snapshot": return snapshotUpdateCandidateState({
			...input,
			onProgress: createUpdateStateInspectionReporter(!input.streamProgress)
		});
		case "discover": return discoverUpdateStateSchemaInspectionInProcess({
			...input,
			onProgress: createUpdateStateInspectionReporter()
		});
		case "versions": return readUpdateStateSchemaVersionsInProcess({
			...input,
			onProgress: createUpdateStateInspectionReporter(!input.inspectionPlan)
		});
		default: throw new Error("Unknown update state inspection mode");
	}
}
snapshotCandidateState().then((value) => process.stdout.write(JSON.stringify(value))).catch((error) => {
	process.stderr.write(formatErrorMessageWithCode(error));
	const causes = collectErrorGraphCandidates(error, (current) => [current.cause]);
	if (causes.length > 1) process.stderr.write(`\nCaused by: ${formatErrorMessageWithCode(causes.at(-1))}`);
	process.exitCode = 1;
});
//#endregion
export {};
