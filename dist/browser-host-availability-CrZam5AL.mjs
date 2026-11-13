import { l as getRuntimeConfigSourceSnapshot } from "./runtime-snapshot-BHGp6OxI.mjs";
import "./runtime-config-snapshot-DPPwvFCZ.mjs";
import { i as resolveBrowserConfig, s as resolveProfile } from "./config-uYvCVfSN.mjs";
import { t as getBrowserProfileCapabilities } from "./profile-capabilities-BY7hNKee.mjs";
import { o as isChromeReachable } from "./chrome-C0Et9iLi.mjs";
import { t as resolveBrowserExecutableForPlatform } from "./chrome.executables-xkffiM1x.mjs";
import { r as getBrowserControlState } from "./browser-control-state-CeOhBv2V.mjs";
//#region extensions/browser/src/browser-host-availability.ts
/** Inspect local capability before routing, without launching or replaying a browser action. */
async function isBrowserHostAvailable(config, profileName) {
	const source = getRuntimeConfigSourceSnapshot() ?? config;
	const resolved = resolveBrowserConfig(source.browser, source);
	if (!resolved.enabled) return false;
	const profile = resolveProfile(resolved, profileName ?? resolved.defaultProfile);
	if (!profile) return false;
	if (getBrowserProfileCapabilities(profile).mode !== "local-managed" || profile.attachOnly) return true;
	if (getBrowserControlState()?.profiles.get(profile.name)?.running) return true;
	try {
		if (resolveBrowserExecutableForPlatform({
			...resolved,
			executablePath: profile.executablePath
		}, process.platform)) return true;
	} catch {
		return true;
	}
	return await isChromeReachable(profile.cdpUrl);
}
//#endregion
export { isBrowserHostAvailable };
