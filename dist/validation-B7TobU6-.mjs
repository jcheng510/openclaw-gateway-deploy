import { t as ErrorCodes } from "./gateway-error-details-DIefe7Zy.mjs";
import { f as errorShape } from "./error-codes-DI20vDEB.mjs";
import { y as formatValidationErrors } from "./worker-inference-DDewC2W1.mjs";
//#region src/gateway/server-methods/validation.ts
/** Validate params and return the standard method error without emitting a response. */
function validateGatewayMethodParams(params, validate, method) {
	if (validate(params)) return;
	return errorShape(ErrorCodes.INVALID_REQUEST, `invalid ${method} params: ${formatValidationErrors(validate.errors)}`);
}
/** Validate params and emit the standard INVALID_REQUEST response on failure. */
function assertValidParams(params, validate, method, respond) {
	const error = validateGatewayMethodParams(params, validate, method);
	if (!error) return true;
	respond(false, void 0, error);
	return false;
}
function hasValidMethodParams(options, validate, method) {
	return assertValidParams(options.params, validate, method, options.respond);
}
function defineValidatedGatewayHandler(method, validate, handler) {
	return (options) => {
		if (!hasValidMethodParams(options, validate, method)) return;
		return handler(options);
	};
}
/** Bind a core method to its schema before exposing it through the open plugin registry. */
function defineValidatedGatewayMethod(method, validate, handler) {
	return defineValidatedGatewayHandler(method, validate, handler);
}
//#endregion
export { validateGatewayMethodParams as i, defineValidatedGatewayHandler as n, defineValidatedGatewayMethod as r, assertValidParams as t };
