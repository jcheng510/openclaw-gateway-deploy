import { r as resolveStateDir } from "./state-dir-CfAW6S2K.mjs";
import "./paths-CtO6iw0c.mjs";
import { t as loadDeviceIdentityIfPresentAsync } from "./device-identity-async-QXxgO6Sm.mjs";
//#region src/node-host/local-id.ts
const localNodeIdByStateDir = /* @__PURE__ */ new Map();
async function resolveLocalNodeId(env = process.env) {
	const stateDir = resolveStateDir(env);
	const cached = localNodeIdByStateDir.get(stateDir);
	if (cached) return cached;
	const nodeId = (await loadDeviceIdentityIfPresentAsync({ env }))?.deviceId ?? null;
	if (nodeId) localNodeIdByStateDir.set(stateDir, nodeId);
	return nodeId;
}
//#endregion
export { resolveLocalNodeId as t };
