//#region src/gateway/managed-outgoing-artifact-id.ts
const MANAGED_OUTGOING_IMAGE_ARTIFACT_ID_PREFIX = "artifact_managed_image_";
const MANAGED_OUTGOING_MEDIA_ARTIFACT_ID_PREFIX = "artifact_managed_media_";
const MANAGED_OUTGOING_ATTACHMENT_ID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
function parseManagedOutgoingArtifactId(value) {
	const family = value.startsWith("artifact_managed_image_") ? "image" : value.startsWith("artifact_managed_media_") ? "media" : null;
	if (!family) return null;
	const prefix = family === "image" ? MANAGED_OUTGOING_IMAGE_ARTIFACT_ID_PREFIX : MANAGED_OUTGOING_MEDIA_ARTIFACT_ID_PREFIX;
	const attachmentId = value.slice(prefix.length);
	return MANAGED_OUTGOING_ATTACHMENT_ID_RE.test(attachmentId) ? {
		attachmentId,
		family
	} : null;
}
//#endregion
export { parseManagedOutgoingArtifactId as i, MANAGED_OUTGOING_IMAGE_ARTIFACT_ID_PREFIX as n, MANAGED_OUTGOING_MEDIA_ARTIFACT_ID_PREFIX as r, MANAGED_OUTGOING_ATTACHMENT_ID_RE as t };
