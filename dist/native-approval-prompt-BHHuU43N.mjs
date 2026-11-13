import { c as normalizeOptionalLowercaseString } from "./string-coerce-6kR-86XC.mjs";
import { n as listBundledChannelCatalogEntries } from "./bundled-channel-catalog-read-dhf_ivua.mjs";
import { n as resolveChannelApprovalCapability } from "./plugins-BVrJdw4D.mjs";
//#region src/channels/plugins/native-approval-prompt.ts
const NATIVE_APPROVAL_PROMPT_RUNTIME_CAPABILITY = "nativeApprovals";
const NATIVE_APPROVAL_PROMPT_RUNTIME_CAPABILITY_NORMALIZED = "nativeapprovals";
function channelPluginHasNativeApprovalPromptUi(plugin) {
	const capability = resolveChannelApprovalCapability(plugin);
	return Boolean(capability?.native || capability?.nativeRuntime);
}
function isKnownNativeApprovalPromptChannel(channel) {
	const normalized = normalizeOptionalLowercaseString(channel);
	return Boolean(normalized && listBundledChannelCatalogEntries().some((entry) => entry.id === normalized && entry.channel.approvalFlags?.includes("native")));
}
function hasNativeApprovalPromptRuntimeCapability(capabilities) {
	return Boolean(capabilities?.some((capability) => normalizeOptionalLowercaseString(capability) === NATIVE_APPROVAL_PROMPT_RUNTIME_CAPABILITY_NORMALIZED));
}
//#endregion
export { isKnownNativeApprovalPromptChannel as i, channelPluginHasNativeApprovalPromptUi as n, hasNativeApprovalPromptRuntimeCapability as r, NATIVE_APPROVAL_PROMPT_RUNTIME_CAPABILITY as t };
