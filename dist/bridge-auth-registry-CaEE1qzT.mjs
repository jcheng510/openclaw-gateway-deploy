import { l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import "./string-coerce-runtime-B1b8UNzb.mjs";
//#region extensions/browser/src/browser/bridge-auth-registry.ts
/**
* Ephemeral auth registry for loopback browser bridge servers.
*
* Dynamic sandbox/host ports need auth lookup without persisting tokens in
* config files, so callers store credentials only for the current process.
*/
const authByPort = /* @__PURE__ */ new Map();
/** Store auth material for a loopback bridge port in the current process. */
function setBridgeAuthForPort(port, auth) {
	if (!Number.isFinite(port) || port <= 0) return;
	authByPort.set(port, {
		token: normalizeOptionalString(auth.token),
		password: normalizeOptionalString(auth.password)
	});
}
/** Read auth material for a loopback bridge port. */
function getBridgeAuthForPort(port) {
	return authByPort.get(port);
}
/** Drop auth material when a bridge server closes or changes port. */
function deleteBridgeAuthForPort(port) {
	authByPort.delete(port);
}
//#endregion
export { getBridgeAuthForPort as n, setBridgeAuthForPort as r, deleteBridgeAuthForPort as t };
