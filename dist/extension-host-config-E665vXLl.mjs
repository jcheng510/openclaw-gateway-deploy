import { D as setRuntimeConfigSnapshot } from "./runtime-snapshot-BHGp6OxI.mjs";
import { c as readConfigFileSnapshot } from "./io.runtime-BOdk1dW9.mjs";
import "./health-2Ucp6rRI.mjs";
import "./runtime-config-snapshot-DPPwvFCZ.mjs";
//#region extensions/browser/src/browser/extension-host-config.ts
/** Standalone browser helpers must not observe, repair, or migrate Gateway state. */
async function readBrowserHostConfig() {
	const snapshot = await readConfigFileSnapshot({
		observe: false,
		pluginValidation: "core-only"
	});
	if (!snapshot.valid) throw new Error("Browser host configuration is invalid");
	const cfg = snapshot.runtimeConfig ?? snapshot.config;
	setRuntimeConfigSnapshot(cfg, snapshot.sourceConfig);
	return cfg;
}
//#endregion
export { readBrowserHostConfig as t };
