import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { t as asBoolean } from "./boolean-cOv0ta_w.mjs";
import { n as isTruthyEnvValue } from "./env-SuLFUnAK.mjs";
import "./string-coerce-runtime-B1b8UNzb.mjs";
import "./runtime-env-Bh9hwd9E.mjs";
import { r as resolvePluginConfigObject } from "./plugin-config-runtime-D_KiiATx.mjs";
//#region extensions/canvas/src/config.ts
function parseCanvasHostConfig(value) {
	if (!isRecord(value)) return;
	const enabled = asBoolean(value.enabled);
	return enabled === void 0 ? {} : { enabled };
}
/** Parses raw Canvas plugin config into a typed, normalized shape. */
function parseCanvasPluginConfig(value) {
	if (!isRecord(value)) return {};
	const host = parseCanvasHostConfig(value.host);
	return host ? { host } : {};
}
/** Resolves Canvas route configuration from plugin-owned config. */
function resolveCanvasHostConfig(params) {
	return parseCanvasPluginConfig(params.pluginConfig ?? resolvePluginConfigObject(params.config, "canvas") ?? {}).host ?? {};
}
/** Returns whether Canvas-owned document and renderer routes should be active. */
function isCanvasHostEnabled(config) {
	if (isTruthyEnvValue(process.env.OPENCLAW_SKIP_CANVAS_HOST)) return false;
	return resolveCanvasHostConfig({ config }).enabled !== false;
}
/** Runtime config parser for Canvas plugin settings. */
const canvasConfigSchema = { parse: parseCanvasPluginConfig };
//#endregion
export { resolveCanvasHostConfig as i, isCanvasHostEnabled as n, parseCanvasPluginConfig as r, canvasConfigSchema as t };
