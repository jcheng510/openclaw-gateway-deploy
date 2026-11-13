import { i as isSilentReplyPayloadText } from "./tokens-BTKQYTUd.mjs";
import { i as parseInlineDirectives, l as stripInlineDirectiveTagsForDelivery } from "./directive-tags-BDwXb2d0.mjs";
import { t as splitMediaFromOutput } from "./parse-CQsHLk6K.mjs";
import { trySafeFileURLToPath } from "@openclaw/fs-safe/advanced";
//#region src/auto-reply/reply/reply-directives.ts
/** Parses inline reply directives such as media, reply targets, audio, and silence. */
/** Parses media, reply-target, audio, and silent directives from reply text. */
function parseReplyDirectives(raw, options = {}) {
	const split = splitMediaFromOutput(raw, {
		extractMarkdownImages: options.extractMarkdownImages,
		extractMediaDirectives: options.extractMediaDirectives,
		preserveTrailingWhitespace: options.preserveTrailingWhitespace,
		onAudioDirective: options.onAudioDirective
	});
	let text = split.text ?? "";
	const replyParsed = text.includes("[[") ? parseInlineDirectives(text, {
		currentMessageId: options.currentMessageId,
		stripAudioTag: false,
		preserveTrailingWhitespace: options.preserveTrailingWhitespace
	}) : void 0;
	text = stripInlineDirectiveTagsForDelivery(replyParsed?.hasReplyTag ? replyParsed.text : text, { preserveTrailingWhitespace: options.preserveTrailingWhitespace }).text;
	const silentToken = options.silentToken ?? "NO_REPLY";
	const isSilent = isSilentReplyPayloadText(text, silentToken);
	return {
		text: isSilent ? "" : text,
		mediaUrls: split.mediaUrls?.map((source) => trySafeFileURLToPath(source) ?? source),
		replyToId: replyParsed?.replyToId,
		replyToCurrent: replyParsed?.replyToCurrent || void 0,
		replyToTag: replyParsed?.hasReplyTag ?? false,
		audioAsVoice: split.audioAsVoice,
		isSilent
	};
}
//#endregion
export { parseReplyDirectives as t };
