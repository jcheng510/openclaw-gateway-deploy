import { Ft as CommandTurnContext } from "../reply-payload-DRFubeid.js";
import { _a as finalizeInboundContextForSdk, ba as DispatchReplyWithDispatcher, ya as DispatchReplyWithBufferedBlockDispatcher } from "../agent-harness-runtime-y6jiaaqJ.js";
import { h as resolveChunkMode } from "../outbound.types-DjHzlueC.js";
import { i as ReplyPayload } from "../reply-payload-3AoiLY6q.js";
import { n as generateConversationLabel } from "../conversation-label-generator-CELyFW4F.js";
//#region src/plugin-sdk/reply-dispatch-runtime.d.ts
/** Dispatches a reply with buffered block support after lazy-loading the runtime dispatcher. */
export declare const dispatchReplyWithBufferedBlockDispatcher: DispatchReplyWithBufferedBlockDispatcher;
/** Dispatches a reply through the provider dispatcher after lazy-loading runtime code. */
export declare const dispatchReplyWithDispatcher: DispatchReplyWithDispatcher;
//#endregion
export { type CommandTurnContext, type DispatchReplyWithBufferedBlockDispatcher, type DispatchReplyWithDispatcher, type ReplyPayload, finalizeInboundContextForSdk as finalizeInboundContext, generateConversationLabel, resolveChunkMode };