import { l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import { w as parseStrictPositiveInteger } from "./number-coercion-Dq1l5muL.mjs";
import { r as defaultRuntime } from "./runtime-BC29JSZp.mjs";
import { t as danger } from "./globals-ChjEJkWj.mjs";
import "./string-coerce-runtime-B1b8UNzb.mjs";
import "./runtime-env-Bh9hwd9E.mjs";
import "./number-runtime-DyNDaYIV.mjs";
import { n as ACT_MAX_VIEWPORT_DIMENSION } from "./act-policy-tIEm1pjf.mjs";
import { c as runBrowserCliRequest } from "./browser-cli-shared-DvvixFoK.mjs";
//#region extensions/browser/src/cli/browser-cli-resize.ts
function parseBrowserViewportDimension(value, label) {
	const parsed = parseStrictPositiveInteger(value);
	if (parsed !== void 0 && parsed <= 8192) return parsed;
	const reason = parsed === void 0 ? "must be a positive integer" : `maximum is ${ACT_MAX_VIEWPORT_DIMENSION}`;
	defaultRuntime.error(danger(`Invalid ${label}: ${reason}`));
	defaultRuntime.exit(1);
}
async function runBrowserResizeWithOutput(params) {
	await runBrowserCliRequest({
		parent: params.parent,
		path: "/act",
		body: {
			kind: "resize",
			width: params.width,
			height: params.height,
			targetId: normalizeOptionalString(params.targetId)
		},
		successMessage: params.successMessage,
		errorPolicy: params.errorPolicy
	});
}
//#endregion
export { runBrowserResizeWithOutput as n, parseBrowserViewportDimension as t };
