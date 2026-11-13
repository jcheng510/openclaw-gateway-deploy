import { r as resolveAgentConfig } from "./agent-scope-config-Dm6T00l4.mjs";
import { T as parseSessionDeliveryRoute } from "./session-key-BC4m_Ly5.mjs";
import "./agent-scope-L_eY3Hj7.mjs";
import { n as pickSandboxToolPolicy } from "./sandbox-tool-policy-DMflEE2E.mjs";
import { f as resolveToolsBySender } from "./group-policy-CMnQJDAV.mjs";
//#region src/agents/sender-tool-policy.ts
/**
* Sender-scoped sandbox tool policy resolver.
* Applies per-agent toolsBySender matches before global sender policy so
* channel delivery can narrow tool access by sender identity.
*/
/** Resolves sender-scoped sandbox tool policy, preferring agent config over global config. */
function resolveSenderToolPolicy(params) {
	const cfg = params.config;
	if (!cfg) return;
	const sender = {
		messageProvider: parseSessionDeliveryRoute(params.sessionKey)?.channel ?? params.messageProvider,
		senderId: params.senderId,
		senderName: params.senderName,
		senderUsername: params.senderUsername,
		senderE164: params.senderE164
	};
	const agentTools = params.agentId && params.agentId.trim() ? resolveAgentConfig(cfg, params.agentId)?.tools : void 0;
	const agentPolicy = resolveToolsBySender({
		toolsBySender: agentTools?.toolsBySender,
		...sender
	});
	if (agentPolicy) return pickSandboxToolPolicy(agentPolicy);
	const globalPolicy = resolveToolsBySender({
		toolsBySender: cfg.tools?.toolsBySender,
		...sender
	});
	return pickSandboxToolPolicy(globalPolicy);
}
//#endregion
export { resolveSenderToolPolicy as t };
