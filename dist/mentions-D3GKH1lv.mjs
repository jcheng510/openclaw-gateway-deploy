import { hn as validateMentionsListParams, mn as validateMentionsDismissParams } from "./src-D2gvuSyP.mjs";
import { t as ErrorCodes } from "./gateway-error-details-DIefe7Zy.mjs";
import { f as errorShape } from "./error-codes-DI20vDEB.mjs";
import { t as assertValidParams } from "./validation-B7TobU6-.mjs";
//#region src/gateway/server-methods/mentions.ts
const mentionHandlers = {
	"mentions.list": ({ client, context, params, respond }) => {
		if (!assertValidParams(params, validateMentionsListParams, "mentions.list", respond)) return;
		if (!context.mentionInbox) {
			respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, "The mention Inbox is unavailable. Reconnect to retry."));
			return;
		}
		const result = context.mentionInbox.list(client);
		respond(result.ok, result.ok ? result.value : void 0, result.ok ? void 0 : result.error);
	},
	"mentions.dismiss": ({ client, context, params, respond }) => {
		if (!assertValidParams(params, validateMentionsDismissParams, "mentions.dismiss", respond)) return;
		if (!context.mentionInbox) {
			respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, "The mention Inbox is unavailable. Reconnect to retry."));
			return;
		}
		const result = context.mentionInbox.dismiss(client, params.ids);
		respond(result.ok, result.ok ? result.value : void 0, result.ok ? void 0 : result.error);
	}
};
//#endregion
export { mentionHandlers };
