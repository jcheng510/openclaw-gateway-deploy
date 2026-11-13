import { g as readStringValue, l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import { a as asOptionalRecord } from "./record-coerce-TIsquoVR.mjs";
import { n as isHttpUrl } from "./url-protocol-OU3K-ySz.mjs";
//#region src/gateway/server-methods/artifacts-base64.ts
function mimeFromDataUrl(value) {
	return /^data:([^;,]+)(?:;[^,]*)?,/i.exec(value.trim())?.[1]?.toLowerCase();
}
function base64FromDataUrl(value) {
	const trimmed = value.trim();
	const commaIndex = trimmed.indexOf(",");
	if (commaIndex < 0 || trimmed.slice(0, 5).toLowerCase() !== "data:") return;
	if (!trimmed.slice(0, commaIndex).toLowerCase().includes(";base64")) return;
	return trimmed.slice(commaIndex + 1);
}
function normalizeArtifactBase64Alphabet(value) {
	if (!/[-_]/.test(value)) return value;
	const bytes = Buffer.from(value, "ascii");
	for (let index = 0; index < bytes.length; index++) if (bytes[index] === 45) bytes[index] = 43;
	else if (bytes[index] === 95) bytes[index] = 47;
	return bytes.toString("ascii");
}
function readArtifactBase64Payload(value, opts) {
	if (value === void 0) return;
	if (/[^A-Za-z0-9+/_= \n\r\t-]/.test(value)) return;
	const paddingStart = value.indexOf("=");
	if (paddingStart >= 0 && !/^(?:=[ \n\r\t]*){1,2}$/.test(value.slice(paddingStart))) return;
	const padding = paddingStart < 0 ? 0 : value.lastIndexOf("=") === paddingStart ? 1 : 2;
	const hasWhitespace = /[ \n\r\t]/.test(value);
	let encodedLength = value.length;
	if (hasWhitespace) for (let index = 0; index < value.length; index++) {
		const code = value.charCodeAt(index);
		if (code === 32 || code === 10 || code === 13 || code === 9) encodedLength -= 1;
	}
	const remainder = encodedLength % 4;
	if (padding > 0 && remainder !== 0 || remainder === 1) return;
	let data = opts.includeData ? normalizeArtifactBase64Alphabet(hasWhitespace ? value.replace(/[ \n\r\t]/g, "") : value) : void 0;
	if (data !== void 0 && padding === 0 && remainder > 0) data += "=".repeat(4 - remainder);
	return {
		...data !== void 0 ? { data } : {},
		sizeBytes: Math.max(0, Math.floor(encodedLength * 3 / 4) - padding)
	};
}
//#endregion
//#region src/gateway/server-methods/artifacts-content.ts
function toArtifactSummary(artifact) {
	const { data: _data, url: _url, ...summary } = artifact;
	return summary;
}
function mediaUrlValue(value) {
	if (typeof value === "string") return normalizeOptionalString(value);
	const record = asOptionalRecord(value);
	return normalizeOptionalString(record?.url);
}
function isSafeDownloadUrl(value) {
	const trimmed = value.trim();
	if (!trimmed || /^data:/i.test(trimmed)) return false;
	if (trimmed.startsWith("/")) return !trimmed.startsWith("//") && trimmed.startsWith("/api/");
	return isHttpUrl(trimmed);
}
function resolveMessageRunId(message) {
	const meta = asOptionalRecord(message["__openclaw"]);
	return normalizeOptionalString(meta?.runId) ?? normalizeOptionalString(message.runId);
}
function resolveBlockDownload(block, opts) {
	const data = readStringValue(block.data)?.trim();
	const content = readStringValue(block.content)?.trim();
	const url = normalizeOptionalString(block.url) ?? normalizeOptionalString(block.openUrl);
	const imageUrl = mediaUrlValue(block.image_url);
	const audioUrl = normalizeOptionalString(block.audio_url);
	const source = asOptionalRecord(block.source);
	const sourceData = readStringValue(source?.data)?.trim();
	const sourceUrl = normalizeOptionalString(source?.url);
	const dataUrl = [
		url,
		sourceUrl,
		imageUrl,
		audioUrl,
		data,
		content,
		sourceData
	].find((value) => typeof value === "string" && /^data:/i.test(value));
	const base64FromDetectedDataUrl = readArtifactBase64Payload(dataUrl ? base64FromDataUrl(dataUrl) : void 0, opts);
	const directBase64 = [
		data,
		sourceData,
		content
	].filter((value) => typeof value === "string" && !/^data:/i.test(value)).map((value) => readArtifactBase64Payload(value, opts)).find((value) => value !== void 0);
	const base64 = base64FromDetectedDataUrl ?? directBase64;
	const remoteUrl = [
		url,
		sourceUrl,
		imageUrl,
		audioUrl
	].find((value) => typeof value === "string" && isSafeDownloadUrl(value));
	const mimeType = normalizeOptionalString(block.mimeType) ?? normalizeOptionalString(block.media_type) ?? normalizeOptionalString(source?.media_type) ?? normalizeOptionalString(source?.mimeType) ?? (dataUrl ? mimeFromDataUrl(dataUrl) : void 0);
	const explicitSize = block.sizeBytes ?? source?.sizeBytes;
	const sizeBytes = typeof explicitSize === "number" && Number.isFinite(explicitSize) && explicitSize >= 0 ? Math.floor(explicitSize) : base64?.sizeBytes;
	if (base64) return {
		mode: "bytes",
		data: base64.data,
		mimeType,
		sizeBytes
	};
	if (remoteUrl) return {
		mode: "url",
		url: remoteUrl,
		mimeType,
		sizeBytes
	};
	return {
		mode: "unsupported",
		mimeType,
		sizeBytes
	};
}
//#endregion
export { toArtifactSummary as i, resolveBlockDownload as n, resolveMessageRunId as r, mediaUrlValue as t };
