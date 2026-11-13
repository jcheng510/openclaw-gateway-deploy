import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { r as logVerbose } from "./globals-ChjEJkWj.mjs";
import { n as getAcpSessionManager } from "./manager-B85OKKGa.mjs";
import { c as readAcpSessionEntryAsync } from "./session-meta-C-yU0zLz.mjs";
import { i as listSessionBindingsBySessionAsync, t as getSessionBindingService } from "./session-binding-service-Cm-tIhAJ.mjs";
//#region src/auto-reply/reply/dispatch-acp-manager.runtime.ts
/** Runtime ACP manager dependencies and stale-binding cleanup used by reply dispatch. */
const ACP_STALE_BINDING_UNBIND_REASON = "acp-session-init-failed";
function isStaleSessionInitError(params) {
	if (params.code !== "ACP_SESSION_INIT_FAILED") return false;
	return /(ACP (session )?metadata is missing|missing ACP metadata|Session is not ACP-enabled|Resource not found)/i.test(params.message);
}
async function maybeUnbindStaleBoundConversations(params) {
	if (!isStaleSessionInitError(params.error)) return;
	try {
		const removed = await getSessionBindingService().unbind({
			targetSessionKey: params.targetSessionKey,
			reason: ACP_STALE_BINDING_UNBIND_REASON
		});
		if (removed.length > 0) logVerbose(`dispatch-acp: removed ${removed.length} stale bound conversation(s) for ${params.targetSessionKey} after ${params.error.code}: ${params.error.message}`);
	} catch (error) {
		logVerbose(`dispatch-acp: failed to unbind stale bound conversations for ${params.targetSessionKey}: ${formatErrorMessage(error)}`);
	}
}
//#endregion
export { getAcpSessionManager, listSessionBindingsBySessionAsync, maybeUnbindStaleBoundConversations, readAcpSessionEntryAsync };
