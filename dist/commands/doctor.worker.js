import { r as defaultRuntime } from "../runtime-BC29JSZp.mjs";
import { a as closeCliResources, c as waitForPendingCliDisposers, r as runCliWithExitFinalization, s as runCliDisposer, t as exitCliAfterOutput } from "../one-shot-exit-BzmTIPQe.mjs";
import { a as withCliCommandCleanup, o as withCliProcessScope } from "../runtime-cleanup-scope-Bcfqw4Hq.mjs";
import { t as enableConsoleCapture } from "../console-DI4wXm8e.mjs";
import { t as scrubDoctorErrorMessage } from "../doctor-error-message-CBAGGfGW.mjs";
//#region src/commands/doctor.worker.ts
async function runDoctorWorker() {
	enableConsoleCapture();
	await withCliProcessScope(() => withCliCommandCleanup(false, async (cleanup) => {
		try {
			const { doctorCommand } = await import("../doctor-vhINiBly.mjs");
			await doctorCommand(defaultRuntime, { nonInteractive: true });
		} finally {
			await closeCliResources(cleanup);
			const resources = cleanup?.pluginResources;
			if (resources) await runCliDisposer("plugin-registration-resources", () => resources.release());
		}
		exitCliAfterOutput(defaultRuntime, 0);
	}));
}
runCliWithExitFinalization({
	run: runDoctorWorker,
	finalize: waitForPendingCliDisposers,
	onError(error) {
		defaultRuntime.error(`Doctor failed: ${scrubDoctorErrorMessage(error)}`);
		process.exitCode = 1;
	}
});
//#endregion
export {};
