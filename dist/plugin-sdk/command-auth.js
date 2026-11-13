import { i as resolveCommandAuthorization } from "../command-auth-Bze75OJs.mjs";
import { n as resolveControlCommandGate, r as resolveDualTextControlCommandGate, t as resolveCommandAuthorizedFromAuthorizers } from "../command-gating-BArmc1o3.mjs";
import { a as parseAccessGroupAllowFromEntry, t as ACCESS_GROUP_ALLOW_FROM_PREFIX } from "../allow-from-lzM6Rg-R.mjs";
import { n as listChatCommands, r as listChatCommandsForConfig, t as isCommandEnabled } from "../commands-registry-list-Dr2HTJ1R.mjs";
import { i as resolveTextCommand, n as maybeResolveTextAlias, r as normalizeCommandBody, t as getCommandDetection } from "../commands-registry-normalize-CvFDss4T.mjs";
import { n as shouldHandleTextCommands, t as isNativeCommandSurface } from "../commands-text-routing-DogWVeU0.mjs";
import { a as formatCommandArgMenuTitle, c as listNativeCommandSpecs, d as parseCommandArgs, f as resolveCommandArgChoices, i as findCommandByNativeName, l as listNativeCommandSpecsForConfig, m as serializeCommandArgs, n as buildCommandTextFromArgs, p as resolveCommandArgMenu, s as isCommandMessage, t as buildCommandText } from "../commands-registry-8w6_PlUY.mjs";
import { n as resolveStoredModelOverride } from "../stored-model-overrides-FHu3r-Hz.mjs";
import { a as shouldComputeCommandAuthorized, n as hasInlineCommandTokens, r as isControlCommandMessage, t as hasControlCommand } from "../command-detection-BBT2k2J9.mjs";
import { i as listProviderPluginCommandSpecs, r as getPluginCommandSpecs } from "../command-specs-CR2c726R.mjs";
import { n as resolveDmGroupAccessWithLists } from "../dm-policy-shared-BV1FjVP9.mjs";
import { i as listReservedChatSlashCommandNames, o as resolveSkillCommandInvocation } from "../chat-command-invocation-DtwjZNJZ.mjs";
import { n as resolveAccessGroupAllowFromMatches, r as resolveAccessGroupAllowFromState, t as expandAllowFromWithAccessGroups } from "../access-groups-Dho8uZoB.mjs";
import "../channel-access-compat--lzoFGno.mjs";
import { n as resolveInboundDirectDmAccessWithRuntime, t as createPreCryptoDirectDmAuthorizer } from "../direct-dm-access-DG5fLzxD.mjs";
import { t as resolveNativeCommandSessionTargets } from "../native-command-session-targets-VtkHb9RS.mjs";
import { n as listSkillCommandsForWorkspace, t as listSkillCommandsForAgents } from "../chat-commands-DBAiju2K.mjs";
import { i as resolveModelsCommandReply, n as formatModelsAvailableHeader } from "../commands-models-C4V2PXbS.mjs";
import { t as buildModelsProviderData } from "../models-provider-runtime-BuwjoLi4.mjs";
//#region src/plugin-sdk/telegram-command-ui.ts
/**
* Telegram command UI helpers exposed for plugin command pagination.
*/
/** Builds an inline keyboard row for paginated Telegram command listings. */
function buildCommandsPaginationKeyboard(currentPage, totalPages, agentId) {
	const buttons = [];
	const suffix = agentId ? `:${agentId}` : "";
	if (currentPage > 1) buttons.push({
		text: "◀ Prev",
		callback_data: `commands_page_${currentPage - 1}${suffix}`
	});
	buttons.push({
		text: `${currentPage}/${totalPages}`,
		callback_data: `commands_page_noop${suffix}`
	});
	if (currentPage < totalPages) buttons.push({
		text: "Next ▶",
		callback_data: `commands_page_${currentPage + 1}${suffix}`
	});
	return [buttons];
}
//#endregion
//#region src/plugin-sdk/command-auth.ts
/**
* Classify direct-DM command handling after sender authorization has been computed.
*
* @deprecated Use `resolveChannelMessageIngress` from `openclaw/plugin-sdk/channel-ingress-runtime`.
*/
function resolveDirectDmAuthorizationOutcome(params) {
	if (params.isGroup) return "allowed";
	if (params.dmPolicy === "disabled") return "disabled";
	if (!params.senderAllowedForCommands) return "unauthorized";
	return "allowed";
}
/**
* Resolve legacy command authorization using an injected runtime object.
*
* @deprecated Use `resolveChannelMessageIngress` from `openclaw/plugin-sdk/channel-ingress-runtime`.
*/
async function resolveSenderCommandAuthorizationWithRuntime(params) {
	return resolveSenderCommandAuthorization({
		...params,
		shouldComputeCommandAuthorized: params.runtime.shouldComputeCommandAuthorized,
		resolveCommandAuthorizedFromAuthorizers: params.runtime.resolveCommandAuthorizedFromAuthorizers
	});
}
/**
* Resolve whether a sender may run slash/control commands under legacy DM/group policy.
* Returns effective allowlists so callers can report the exact source set used for authorization.
*
* @deprecated Use `resolveChannelMessageIngress` from `openclaw/plugin-sdk/channel-ingress-runtime`.
*/
async function resolveSenderCommandAuthorization(params) {
	const shouldComputeAuth = params.shouldComputeCommandAuthorized(params.rawBody, params.cfg);
	const storeAllowFrom = !params.isGroup && params.dmPolicy !== "allowlist" && params.dmPolicy !== "open" ? await params.readAllowFromStore().catch(() => []) : [];
	const channel = params.channel;
	const accountId = params.accountId ?? "default";
	let configuredAllowFrom = params.configuredAllowFrom;
	let configuredGroupAllowFrom = params.configuredGroupAllowFrom ?? [];
	let dmStoreAllowFrom = storeAllowFrom;
	if (channel) {
		const expand = (allowFrom) => expandAllowFromWithAccessGroups({
			cfg: params.cfg,
			allowFrom,
			channel,
			accountId,
			senderId: params.senderId,
			isSenderAllowed: params.isSenderAllowed,
			resolveMembership: params.resolveAccessGroupMembership
		});
		[configuredAllowFrom, configuredGroupAllowFrom] = await Promise.all([expand(params.configuredAllowFrom), expand(params.configuredGroupAllowFrom ?? [])]);
		if (!params.isGroup) dmStoreAllowFrom = await expand(storeAllowFrom);
	}
	const access = resolveDmGroupAccessWithLists({
		isGroup: params.isGroup,
		dmPolicy: params.dmPolicy,
		groupPolicy: "allowlist",
		allowFrom: configuredAllowFrom,
		groupAllowFrom: configuredGroupAllowFrom,
		storeAllowFrom: dmStoreAllowFrom,
		isSenderAllowed: (allowFrom) => params.isSenderAllowed(params.senderId, allowFrom)
	});
	const effectiveAllowFrom = access.effectiveAllowFrom;
	const effectiveGroupAllowFrom = access.effectiveGroupAllowFrom;
	const senderAllowedForCommands = params.isSenderAllowed(params.senderId, params.isGroup ? effectiveGroupAllowFrom : effectiveAllowFrom);
	const ownerAllowedForCommands = params.isSenderAllowed(params.senderId, effectiveAllowFrom);
	const groupAllowedForCommands = params.isSenderAllowed(params.senderId, effectiveGroupAllowFrom);
	return {
		shouldComputeAuth,
		effectiveAllowFrom,
		effectiveGroupAllowFrom,
		senderAllowedForCommands,
		commandAuthorized: shouldComputeAuth ? params.resolveCommandAuthorizedFromAuthorizers?.({
			useAccessGroups: true,
			authorizers: [{
				configured: effectiveAllowFrom.length > 0,
				allowed: ownerAllowedForCommands
			}, {
				configured: effectiveGroupAllowFrom.length > 0,
				allowed: groupAllowedForCommands
			}]
		}) ?? senderAllowedForCommands : void 0
	};
}
//#endregion
export { ACCESS_GROUP_ALLOW_FROM_PREFIX, buildCommandText, buildCommandTextFromArgs, buildCommandsPaginationKeyboard, buildModelsProviderData, createPreCryptoDirectDmAuthorizer, expandAllowFromWithAccessGroups, findCommandByNativeName, formatCommandArgMenuTitle, formatModelsAvailableHeader, getCommandDetection, getPluginCommandSpecs, hasControlCommand, hasInlineCommandTokens, isCommandEnabled, isCommandMessage, isControlCommandMessage, isNativeCommandSurface, listChatCommands, listChatCommandsForConfig, listNativeCommandSpecs, listNativeCommandSpecsForConfig, listProviderPluginCommandSpecs, listReservedChatSlashCommandNames, listSkillCommandsForAgents, listSkillCommandsForWorkspace, maybeResolveTextAlias, normalizeCommandBody, parseAccessGroupAllowFromEntry, parseCommandArgs, resolveAccessGroupAllowFromMatches, resolveAccessGroupAllowFromState, resolveCommandArgChoices, resolveCommandArgMenu, resolveCommandAuthorization, resolveCommandAuthorizedFromAuthorizers, resolveControlCommandGate, resolveDirectDmAuthorizationOutcome, resolveDualTextControlCommandGate, resolveInboundDirectDmAccessWithRuntime, resolveModelsCommandReply, resolveNativeCommandSessionTargets, resolveSenderCommandAuthorization, resolveSenderCommandAuthorizationWithRuntime, resolveSkillCommandInvocation, resolveStoredModelOverride, resolveTextCommand, serializeCommandArgs, shouldComputeCommandAuthorized, shouldHandleTextCommands };
