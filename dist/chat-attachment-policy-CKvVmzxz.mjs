import { r as MAX_IMAGE_BYTES } from "./constants-GzjKtFvA.mjs";
import { a as MAX_PAYLOAD_BYTES } from "./server-constants-BH_EolwD.mjs";
//#region src/shared/chat-attachment-frame-budget.ts
const WS_FRAME_ENVELOPE_SLACK_BYTES = 262144;
function resolveChatAttachmentFrameBudgetBytes(maxPayloadBytes) {
	return Math.max(0, Math.floor((maxPayloadBytes - WS_FRAME_ENVELOPE_SLACK_BYTES) * 3 / 4));
}
//#endregion
//#region src/gateway/chat-attachment-policy.ts
const DEFAULT_CHAT_ATTACHMENT_MAX_MB = 20;
const MAX_ADVERTISED_ATTACHMENT_BYTES = resolveChatAttachmentFrameBudgetBytes(MAX_PAYLOAD_BYTES);
/** Default decoded-size ceiling when `agents.defaults.mediaMaxMb` is unset or invalid. */
const DEFAULT_CHAT_ATTACHMENT_MAX_BYTES = DEFAULT_CHAT_ATTACHMENT_MAX_MB * 1024 * 1024;
/** Resolve the maximum decoded attachment size accepted for chat inputs. */
function resolveChatAttachmentMaxBytes(cfg) {
	const configured = cfg.agents?.defaults?.mediaMaxMb;
	return Math.min(Number.MAX_SAFE_INTEGER, Math.max(1, Math.floor((typeof configured === "number" && Number.isFinite(configured) && configured > 0 ? configured : DEFAULT_CHAT_ATTACHMENT_MAX_MB) * 1024 * 1024)));
}
/**
* Resolve the decoded-size ceilings every chat attachment faces regardless of
* entrypoint or model. Images are checked against the configured ceiling first
* and the agent-hydration cap second, so their effective limit is the smaller of
* the two. MIME acceptance and per-message counts are deliberately absent: they
* depend on the entrypoint, the resolved model, and payload sniffing, so they
* cannot be stated once per connection.
*/
function resolveChatAttachmentPolicy(cfg) {
	const maxBytes = Math.min(resolveChatAttachmentMaxBytes(cfg), MAX_ADVERTISED_ATTACHMENT_BYTES);
	return {
		maxBytes,
		maxImageBytes: Math.min(maxBytes, MAX_IMAGE_BYTES)
	};
}
//#endregion
export { resolveChatAttachmentMaxBytes as n, resolveChatAttachmentPolicy as r, DEFAULT_CHAT_ATTACHMENT_MAX_BYTES as t };
