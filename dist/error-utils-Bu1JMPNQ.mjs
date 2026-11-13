import { o as formatErrorMessage$1 } from "./error-coercion-1P2One0X.mjs";
import { b as redactToolPayloadText } from "./redact-CYYx6Qjc.mjs";
//#region packages/memory-host-sdk/src/host/error-utils.ts
/** Format memory-host errors through the canonical formatter and redaction policy. */
function formatErrorMessage(err) {
	return formatErrorMessage$1(err, { redact: redactToolPayloadText });
}
//#endregion
export { formatErrorMessage as t };
