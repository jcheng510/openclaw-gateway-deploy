import "./agent-harness-runtime-y6jiaaqJ.js";
import { x as ChannelMeta } from "./types.core-CuY7f6gy.js";
import { n as ChatChannelId } from "./channel-id.types-CjcGKHk0.js";
import "./types.plugin-BmmXapqg.js";
import "./types.public-Bht1LzOM.js";
import "./config-schema-MpDk-AfL.js";
import "./setup-helpers-xUpeGrEH.js";
import "./config-helpers-CSloNEEf.js";
import "./helpers-CR-HZbL7.js";
//#region src/channels/chat-meta-shared.d.ts
/**
 * Metadata shown for built-in chat channels in setup, status, and selection UIs.
 */
type ChatChannelMeta = ChannelMeta;
//#endregion
//#region src/channels/chat-meta.d.ts
/**
 * Returns metadata for one built-in chat channel id.
 * Shipped plugin-SDK contract: callers pass bundled ids, so absence is an invariant
 * violation; drift-tolerant core paths use findChatChannelMeta instead.
 */
declare function getChatChannelMeta(id: ChatChannelId): ChatChannelMeta;
//#endregion
export { getChatChannelMeta as t };