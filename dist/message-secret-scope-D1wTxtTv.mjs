import { l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import "./session-key-BC4m_Ly5.mjs";
import { n as normalizeAccountId } from "./account-id-CW6dlabA.mjs";
import { n as normalizeMessageChannel } from "./message-channel-core-CQXI3ZKP.mjs";
import { t as isDeliverableMessageChannel } from "./message-channel-normalize-CAZyLfyK.mjs";
import "./message-channel-DDiCYM9I.mjs";
//#region src/cli/message-secret-scope.ts
function resolveScopedChannelCandidate(value) {
	if (typeof value !== "string") return;
	const normalized = normalizeMessageChannel(value);
	if (!normalized || !isDeliverableMessageChannel(normalized)) return;
	return normalized;
}
function resolveChannelFromTargetValue(target) {
	const trimmed = normalizeOptionalString(target);
	if (!trimmed) return;
	const separator = trimmed.indexOf(":");
	if (separator <= 0) return;
	return resolveScopedChannelCandidate(trimmed.slice(0, separator));
}
function resolveChannelFromTargets(targets) {
	if (!Array.isArray(targets)) return;
	const seen = /* @__PURE__ */ new Set();
	for (const target of targets) {
		const channel = resolveChannelFromTargetValue(target);
		if (channel) seen.add(channel);
	}
	if (seen.size !== 1) return;
	return [...seen][0];
}
function resolveScopedAccountId(value) {
	const trimmed = normalizeOptionalString(value);
	if (!trimmed) return;
	return normalizeAccountId(trimmed);
}
/** Resolve the narrowest channel/account secret scope visible from message CLI inputs. */
function resolveMessageSecretScope(params) {
	const channel = resolveScopedChannelCandidate(params.channel) ?? resolveChannelFromTargetValue(params.target) ?? resolveChannelFromTargets(params.targets) ?? resolveScopedChannelCandidate(params.fallbackChannel);
	const accountId = resolveScopedAccountId(params.accountId) ?? resolveScopedAccountId(params.fallbackAccountId ?? void 0);
	return {
		...channel ? { channel } : {},
		...accountId ? { accountId } : {}
	};
}
//#endregion
export { resolveMessageSecretScope as t };
