import { o as formatErrorMessage$1 } from "./error-coercion-CwIUUFnu.mjs";
import { r as redactSensitiveText } from "./redact-BwKH5fIe.mjs";
//#region src/infra/errors.ts
function formatErrorMessage(err) {
	return formatErrorMessage$1(err, { redact: redactSensitiveText });
}
function formatErrorMessageWithCode(err) {
	return formatErrorMessage$1(err, {
		includeCode: true,
		redact: redactSensitiveText
	});
}
//#endregion
export { formatErrorMessageWithCode as n, formatErrorMessage as t };
