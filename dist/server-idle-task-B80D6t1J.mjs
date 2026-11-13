import { E as tryBeginGatewayIndependentRootWorkAdmission, l as isGatewayRestartDrainError, s as getGatewayRestartDrainSignal } from "./gateway-work-admission-B4bQUVQ6.mjs";
//#region src/gateway/server-idle-task.ts
/** Runs low-priority work while idle, optionally repeating after completed passes. */
function scheduleGatewayIdleTask(params) {
	const { scheduler } = params;
	let stopped = false;
	let job;
	let running;
	const isClosing = () => stopped || params.isClosing() || getGatewayRestartDrainSignal().aborted;
	const run = async () => {
		if (isClosing()) return;
		if (params.isBusy()) schedule(params.retryDelayMs);
		else {
			await params.run();
			if (params.repeatDelayMs !== void 0) schedule(params.repeatDelayMs);
		}
	};
	const schedule = (delayMs) => {
		if (isClosing()) return;
		job = scheduler.schedule({
			id: params.id,
			delayMs,
			run: () => {
				if (isClosing()) return;
				const admission = params.isBusy() ? null : tryBeginGatewayIndependentRootWorkAdmission("idle-task");
				if (!admission) {
					schedule(params.retryDelayMs);
					return;
				}
				running = Promise.resolve().then(() => admission.run(run)).catch((error) => {
					if (!isGatewayRestartDrainError(error)) params.log.warn(`${params.errorMessage}: ${String(error)}`);
				}).finally(() => {
					admission.release();
					running = void 0;
				});
				return running;
			}
		});
	};
	schedule(params.delayMs);
	return { stop: () => {
		stopped = true;
		job?.cancel();
		return running;
	} };
}
//#endregion
export { scheduleGatewayIdleTask as t };
