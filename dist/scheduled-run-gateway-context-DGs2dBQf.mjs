import { t as bindGatewayContextResolver } from "./gateway-context-binding-VqB7gkMe.mjs";
import { s as withPluginRuntimeGatewayContextResolver } from "./gateway-request-scope-Da9jAC9_.mjs";
import { n as runWithSpawnBroker, t as getSpawnBroker } from "./context-Ha66RMSw.mjs";
import { t as captureSqliteReadOnlyWorkerScope } from "./sqlite-readonly-worker-context-CtZdPPcK.mjs";
import { l as withoutGatewayToolCallerIdentity } from "./gateway-caller-context-DQ2iIITl.mjs";
//#region src/gateway/scheduled-run-gateway-context.ts
/**
* Supplies a Gateway request context to scheduler-owned agent runs.
*
* Timer ticks, hook dispatch queues, and heartbeat wakeups have no Gateway
* request of their own, so trusted built-in tools (terminal, dashboard) resolve
* no context and fail mid-run. RPC-triggered runs already inherit a scope from
* their caller and must keep it.
*/
function fenceScheduledGatewayContextResolver(resolveGatewayContext) {
	if (!resolveGatewayContext) return;
	const resolveScheduledContext = () => {
		return resolveGatewayContext()?.resolveGatewayContext?.() ?? void 0;
	};
	bindGatewayContextResolver(resolveScheduledContext, resolveGatewayContext);
	return resolveScheduledContext;
}
/** Capture host resources; detached runs replace inherited request and tool-caller scopes. */
function createScheduledGatewayRunner(resolveGatewayContext) {
	const spawnBroker = getSpawnBroker();
	const runWithReadOnlyWorkers = captureSqliteReadOnlyWorkerScope();
	return async (run) => await withoutGatewayToolCallerIdentity(() => runWithSpawnBroker(spawnBroker, async () => {
		const runWithWorkers = () => runWithReadOnlyWorkers(run);
		if (!resolveGatewayContext) return await runWithWorkers();
		return await withPluginRuntimeGatewayContextResolver(resolveGatewayContext, runWithWorkers, { inheritRequestScope: false });
	}));
}
//#endregion
export { fenceScheduledGatewayContextResolver as n, createScheduledGatewayRunner as t };
