import { l as normalizeMediaFacts } from "./media-facts-CYny4oQ-.mjs";
import { r as mergeInboundPathRoots } from "./inbound-path-policy-CN2LLfoX.mjs";
import { a as getSessionSafeDefaultMediaLocalRoots } from "./local-roots-aZbIaNlj.mjs";
import { a as normalizeAttachments } from "./attachments.normalize-BxV3g4kG.mjs";
import { t as MediaAttachmentCache } from "./attachments-Cs-M12jK.mjs";
import { t as resolveChannelInboundAttachmentRoots } from "./channel-inbound-roots-zbEJ_VDb.mjs";
import path from "node:path";
//#region src/media-understanding/runner.attachments.ts
/** Normalizes message context media fields for the media-understanding runner. */
function normalizeMediaAttachments(ctx) {
	const attachments = normalizeAttachments(ctx);
	return ctx.SkipStickerMediaUnderstanding ? attachments.filter((attachment) => attachment.index !== 0) : attachments;
}
/** Creates the lazy attachment cache used by image, audio, video, and document providers. */
function createMediaAttachmentCache(attachments, options) {
	return new MediaAttachmentCache(attachments, options);
}
function resolveMediaAttachmentLocalRoots(params) {
	const workspaceDirs = normalizeMediaFacts(params.ctx.media).flatMap((fact) => fact.workspaceDir ? [path.resolve(fact.workspaceDir)] : []);
	return mergeInboundPathRoots(getSessionSafeDefaultMediaLocalRoots(params.workspaceDir), workspaceDirs, params.workspaceDir ? [path.resolve(params.workspaceDir)] : void 0, resolveChannelInboundAttachmentRoots(params));
}
//#endregion
export { normalizeMediaAttachments as n, resolveMediaAttachmentLocalRoots as r, createMediaAttachmentCache as t };
