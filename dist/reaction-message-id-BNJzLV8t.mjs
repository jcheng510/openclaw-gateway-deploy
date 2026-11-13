import { m as readStringOrNumberParam } from "./common-CnSoEQyp.mjs";
//#region src/channels/plugins/actions/reaction-message-id.ts
/**
* Resolves the message id for reaction tools from explicit args or current tool context.
*/
function resolveReactionMessageId(params) {
	return readStringOrNumberParam(params.args, "messageId") ?? params.toolContext?.currentMessageId;
}
//#endregion
export { resolveReactionMessageId as t };
