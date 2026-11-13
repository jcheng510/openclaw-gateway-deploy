import { c as normalizeOptionalLowercaseString } from "./string-coerce-6kR-86XC.mjs";
import { _ as toAgentStoreSessionKey } from "./session-key-BC4m_Ly5.mjs";
import { randomUUID } from "node:crypto";
//#region src/gateway/session-create-key.ts
function buildDashboardSessionKey(agentId, options = {}) {
	return `agent:${agentId}:dashboard:${`${options.incognito ? "incognito-" : ""}${randomUUID()}`}`;
}
function resolveSessionCreateTargetKey(params) {
	const { cfg, agentId, requestedKey } = params;
	const loweredRequestedKey = normalizeOptionalLowercaseString(requestedKey);
	return requestedKey ? loweredRequestedKey === "global" || loweredRequestedKey === "unknown" ? loweredRequestedKey : toAgentStoreSessionKey({
		agentId,
		requestKey: requestedKey,
		mainKey: cfg.session?.mainKey
	}) : void 0;
}
//#endregion
export { resolveSessionCreateTargetKey as n, buildDashboardSessionKey as t };
