import { Yi as validateSessionsObserverVisibilityParams } from "./src-D2gvuSyP.mjs";
import { t as ErrorCodes } from "./gateway-error-details-DIefe7Zy.mjs";
import { f as errorShape } from "./error-codes-DI20vDEB.mjs";
import { n as defineValidatedGatewayHandler } from "./validation-B7TobU6-.mjs";
//#region src/gateway/session-observer-rpc.ts
const sessionObserverHandlers = { "sessions.observer.visibility": defineValidatedGatewayHandler("sessions.observer.visibility", validateSessionsObserverVisibilityParams, ({ params, respond, client, context }) => {
	if (!client?.connId) {
		respond(false, void 0, errorShape(ErrorCodes.FORBIDDEN, "Session observer visibility requires a connected client."));
		return;
	}
	if (!context.sessionObserver) {
		respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, "Session observer is unavailable."));
		return;
	}
	const { visible } = params;
	context.sessionObserver.setConnectionVisibility(client.connId, visible);
	respond(true, { ok: true });
}) };
//#endregion
export { sessionObserverHandlers };
