import { l as ChannelStreamingConfig } from "./types.base-CO3vBS33.js";
//#region src/channels/streaming-config-readers.d.ts
type StreamingCompatEntry = {
  streaming?: unknown;
};
declare function getChannelStreamingConfigObject(entry: StreamingCompatEntry | null | undefined): ChannelStreamingConfig | undefined;
declare function resolveChannelStreamingNativeTransport(entry: StreamingCompatEntry | null | undefined): boolean | undefined;
//#endregion
export { getChannelStreamingConfigObject as n, resolveChannelStreamingNativeTransport as r, StreamingCompatEntry as t };