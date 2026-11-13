import { t as createChannelRegistryLoader } from "./registry-loader-5kWc-UcU.mjs";
//#region src/channels/plugins/outbound/load.ts
const loadChannelOutboundAdapter = createChannelRegistryLoader((entry) => entry.plugin.outbound);
//#endregion
export { loadChannelOutboundAdapter as t };
