import { r as createLazyRuntimeModule } from "./lazy-runtime-CJrzFzqU.mjs";
import "./session-binding-service-Cm-tIhAJ.mjs";
import "./conversation-binding-BoFuztni.mjs";
import "./session-DtiLRiR0.mjs";
import "./pairing-store-Bvqa0taN.mjs";
import "./thread-bindings-policy-COsLxg-E.mjs";
import "./thread-bindings-messages-D32wY0rW.mjs";
import "./channel-access-compat--lzoFGno.mjs";
import "./binding-routing-NEteHJWH.mjs";
import "./pairing-labels-CjTiKuHT.mjs";
//#region src/channels/session-meta.ts
const loadInboundSessionRuntime = createLazyRuntimeModule(() => import("./inbound.runtime.js"));
/**
* Best-effort inbound session metadata recorder for channel plugin command handlers.
*/
async function recordInboundSessionMetaSafe(params) {
	const runtime = await loadInboundSessionRuntime();
	const storePath = runtime.resolveSessionStorePathCore(params.cfg.session?.store, { agentId: params.agentId });
	try {
		await runtime.recordInboundSessionMeta({
			storePath,
			sessionKey: params.sessionKey,
			ctx: params.ctx
		});
	} catch (err) {
		params.onError?.(err);
	}
}
//#endregion
export { recordInboundSessionMetaSafe as t };
