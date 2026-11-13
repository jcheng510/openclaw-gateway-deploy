import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { Fn as object, Kt as custom } from "./schemas-BOYIvvln.mjs";
//#region src/worker/protocol-record.ts
const workerProtocolIdentifier = (label, maxChars = 256) => custom((value) => typeof value === "string" && value.length > 0 && value.length <= maxChars && value.trim() === value && !value.includes("\0"), { error: `INVALID_REQUEST: ${label} must be a bounded non-empty identifier` });
const WorkerGatewayNamespace = workerProtocolIdentifier("gatewayNamespace").refine((value) => typeof value === "string" && /^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/u.test(value), { error: "INVALID_REQUEST: gatewayNamespace must be a safe bounded path component" });
function hasExactOwnKeys(value, required, optional = []) {
	const allowed = /* @__PURE__ */ new Set([...required, ...optional]);
	return required.every((key) => Object.hasOwn(value, key)) && optional.every((key) => Object.hasOwn(value, key) || !Reflect.has(value, key)) && Object.keys(value).every((key) => allowed.has(key));
}
/** Validate the received object's own keys before schema parsing copies its properties. */
function workerProtocolObject(shape) {
	const required = [];
	const optional = [];
	for (const [key, schema] of Object.entries(shape)) (schema.isOptional() ? optional : required).push(key);
	return custom((value) => isRecord(value) && hasExactOwnKeys(value, required, optional)).pipe(object(shape));
}
//#endregion
export { workerProtocolObject as i, hasExactOwnKeys as n, workerProtocolIdentifier as r, WorkerGatewayNamespace as t };
