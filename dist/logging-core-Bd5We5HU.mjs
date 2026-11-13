import { r as getBoundLegacyPluginSdkResourceHost } from "./legacy-sdk-resource-host-CYqyTaJu.mjs";
import "./redact-CYYx6Qjc.mjs";
import "./logger-DabFgCLJ.mjs";
import "./subsystem-CeqVSEVi.mjs";
import "./logger-DmolGPgx.mjs";
import { f as startGatewayDiagnosticHeartbeat, p as stopGatewayDiagnosticHeartbeat } from "./diagnostic-DLixObfX.mjs";
import { t as GatewayScheduler } from "./gateway-scheduler-Dq116NWy.mjs";
//#region src/plugin-sdk/logging-core.ts
/**
* Public SDK subpath for logging, diagnostics, and redaction helpers.
*/
let standaloneDiagnosticScheduler;
/** Standalone SDK callers own this schedule; Gateway plugins use their bound host. */
function startDiagnosticHeartbeat(config, opts) {
	const host = getBoundLegacyPluginSdkResourceHost();
	const scheduler = host ? host.scheduler : standaloneDiagnosticScheduler ??= new GatewayScheduler();
	startGatewayDiagnosticHeartbeat(scheduler, config, opts);
}
function stopDiagnosticHeartbeat() {
	stopGatewayDiagnosticHeartbeat();
	const scheduler = standaloneDiagnosticScheduler;
	standaloneDiagnosticScheduler = void 0;
	scheduler?.stop();
}
//#endregion
export { stopDiagnosticHeartbeat as n, startDiagnosticHeartbeat as t };
