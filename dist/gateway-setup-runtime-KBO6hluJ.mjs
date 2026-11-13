import { p as resolveManagedGatewayServiceCommand } from "./service-layout-BP96VEeH.mjs";
import { o as readDaemonRuntimePinForInstall } from "./runtime-pin-state-xN-Oh5tA.mjs";
import { l as resolveRecordedDaemonRuntime } from "./runtime-paths-gv9qep4u.mjs";
import "./daemon-runtime-B_YYWgfz.mjs";
import { a as resolveRunningBunFallback } from "./daemon-install-runtime-warning-BtSPqbWz.mjs";
//#region src/commands/gateway-setup-runtime.ts
/** Resolve setup runtime intent without turning automatic choices into persistent pins. */
async function resolveGatewaySetupRuntime(params) {
	const expected = readDaemonRuntimePinForInstall({
		kind: "gateway",
		env: params.env
	}, params.existingCommand, params.runtime !== void 0);
	const pin = params.runtime === void 0 ? expected.pin : void 0;
	const existing = resolveManagedGatewayServiceCommand(params.existingCommand);
	const env = {
		...params.env,
		OPENCLAW_WRAPPER: params.env.OPENCLAW_WRAPPER ?? existing?.environment?.OPENCLAW_WRAPPER
	};
	const recordedRuntime = params.runtime === void 0 && !pin && !env.OPENCLAW_WRAPPER?.trim() ? await resolveRecordedDaemonRuntime(existing?.programArguments[0], env) : void 0;
	const retainedRuntime = recordedRuntime?.status === "supported" ? recordedRuntime : void 0;
	const bunFallbackPath = params.selectRuntime && params.runtime === void 0 && !pin && !retainedRuntime && !env.OPENCLAW_WRAPPER?.trim() ? await resolveRunningBunFallback({ env }) : void 0;
	const suggestedRuntime = retainedRuntime?.runtime ?? (bunFallbackPath ? "bun" : "node");
	const runtime = params.runtime ?? pin?.runtime ?? (params.selectRuntime ? await params.selectRuntime(suggestedRuntime) : suggestedRuntime);
	return {
		runtime,
		runtimeExplicit: params.runtime !== void 0 || pin !== void 0 || params.selectRuntime !== void 0,
		runtimePath: runtime === retainedRuntime?.runtime ? retainedRuntime.path : runtime === "bun" ? bunFallbackPath : void 0,
		pinnedRuntimePath: pin?.path,
		runtimePinUpdate: {
			expected,
			pin
		},
		env
	};
}
//#endregion
export { resolveGatewaySetupRuntime as t };
