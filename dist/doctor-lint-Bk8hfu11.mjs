import { r as defaultRuntime } from "./runtime-BC29JSZp.mjs";
import { r as resolveUpdateRehearsalRoot } from "./update-rehearsal-paths-C4PfIK1q.mjs";
//#region src/commands/doctor-lint.ts
/** CLI entrypoint for non-mutating Doctor lint health checks. */
/** Delegate rehearsal lint before loading the worker's health-check graph. */
async function runDoctorLintCli(runtime, opts) {
	if (runtime === defaultRuntime && opts.json && resolveUpdateRehearsalRoot(process.env)) {
		const { hasCliProcessScope } = await import("./runtime-cleanup-scope-CPV3WiOc.mjs");
		if (hasCliProcessScope()) {
			const { runUpdateDoctorLintProcess } = await import("./doctor-lint-process-BlNjNspl.mjs");
			const { resolveDoctorUpdateBudget } = await import("./doctor-update-budget-BYOrC4XS.mjs");
			return runUpdateDoctorLintProcess(opts, (await resolveDoctorUpdateBudget({
				cfg: {},
				env: process.env
			}))?.disposalDeadlineMs);
		}
	}
	const { runDoctorLintCliInProcess } = await import("./doctor-lint-runner-AYF9zMes.mjs");
	return runDoctorLintCliInProcess(runtime, opts);
}
//#endregion
export { runDoctorLintCli };
