import { n as resolveBrowserEngine } from "./registry-DmbmGJfu.mjs";
//#region extensions/browser/src/browser/profile-capabilities.ts
/** Resolve capabilities through the selected engine inside the Browser plugin. */
function getBrowserProfileCapabilities(profile) {
	return resolveBrowserEngine(profile.engine).capabilities(profile);
}
/** Resolve the default snapshot format for a profile and available drivers. */
function resolveDefaultSnapshotFormat(params) {
	if (params.explicitFormat) return params.explicitFormat;
	if (params.mode === "efficient") return "ai";
	if (getBrowserProfileCapabilities(params.profile).mode === "local-existing-session") return "ai";
	return params.hasPlaywright ? "ai" : "aria";
}
/** Return true when screenshots should use Playwright for the profile. */
function shouldUsePlaywrightForScreenshot(params) {
	return !params.wsUrl || Boolean(params.ref) || Boolean(params.element);
}
/** Return true when ARIA snapshots should use Playwright for the profile. */
function shouldUsePlaywrightForAriaSnapshot(params) {
	return !params.wsUrl;
}
//#endregion
export { shouldUsePlaywrightForScreenshot as i, resolveDefaultSnapshotFormat as n, shouldUsePlaywrightForAriaSnapshot as r, getBrowserProfileCapabilities as t };
