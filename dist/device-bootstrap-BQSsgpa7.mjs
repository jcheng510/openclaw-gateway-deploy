import { t as createLazyRuntimeMethod } from "./lazy-runtime-CJrzFzqU.mjs";
import "./device-bootstrap-profile-DV7lvW3L.mjs";
import "./device-pairing-CmhQf_CF.mjs";
import "./device-pairing-approval-BwdCs1md.mjs";
import "./device-bootstrap-CYq2QTOv.mjs";
//#region src/plugin-sdk/device-bootstrap.ts
const resolvePairingGatewayUrl = createLazyRuntimeMethod(() => import("./setup-code-B5dJr3b7.mjs"), (pairing) => pairing.resolvePairingGatewayUrl);
//#endregion
export { resolvePairingGatewayUrl as t };
