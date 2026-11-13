//#region src/config/channel-config-keys.ts
const CHANNEL_KERNEL_CONFIG_KEYS = /* @__PURE__ */ new Set(["defaults", "modelByChannel"]);
/** Return whether a channel config key names a kernel-owned namespace. */
function isKernelOwnedChannelConfigKey(key) {
	return CHANNEL_KERNEL_CONFIG_KEYS.has(key);
}
//#endregion
export { isKernelOwnedChannelConfigKey as t };
