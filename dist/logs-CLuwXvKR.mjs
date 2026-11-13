import { dn as validateLogsTailParams } from "./src-D2gvuSyP.mjs";
import { t as ErrorCodes } from "./gateway-error-details-DIefe7Zy.mjs";
import { f as errorShape } from "./error-codes-DI20vDEB.mjs";
import { t as readConfiguredLogTail } from "./log-tail-bfP7WUXS.mjs";
import { r as defineValidatedGatewayMethod } from "./validation-B7TobU6-.mjs";
//#region src/gateway/server-methods/logs.ts
/** Gateway handler for bounded reads from the configured gateway log. */
const logsHandlers = { "logs.tail": defineValidatedGatewayMethod("logs.tail", validateLogsTailParams, async ({ params, respond }) => {
	try {
		respond(true, await readConfiguredLogTail({
			cursor: params.cursor,
			limit: params.limit,
			maxBytes: params.maxBytes
		}), void 0);
	} catch (err) {
		respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, `log read failed: ${String(err)}`));
	}
}) };
//#endregion
export { logsHandlers };
