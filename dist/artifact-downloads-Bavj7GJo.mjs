import { t as pruneMapToMaxSize } from "./map-size-CNcWiFKu.mjs";
import { d as normalizeMimeType } from "./mime-CGDYrRzL.mjs";
import { d as sendMethodNotAllowed, x as respondNotFound } from "./http-common-mSENR2Yd.mjs";
import { t as buildAssistantMediaContentDisposition } from "./assistant-media-content-disposition-B3NSqIRL.mjs";
import { i as writeByteHeaders } from "./http-byte-range-Bev-58hq.mjs";
import { t as ARTIFACT_DOWNLOAD_PATH } from "./artifact-download-CXaDlLGk.mjs";
import { randomBytes } from "node:crypto";
//#region src/gateway/artifact-downloads.ts
const DOWNLOAD_TTL_MS = 3e5;
const downloads = /* @__PURE__ */ new WeakMap();
function canCreateArtifactDownload(client) {
	return Boolean(client?.connId && client.connectionSignal?.aborted === false && !client.invalidated);
}
function createArtifactDownload(params) {
	const { client } = params;
	if (!canCreateArtifactDownload(client)) throw new Error("Artifact download connection is no longer available");
	params.assertCurrent();
	let grants = downloads.get(client);
	if (!grants) {
		grants = /* @__PURE__ */ new Map();
		downloads.set(client, grants);
	}
	const now = Date.now();
	for (const [ticket, grant] of grants) if (grant.expiresAt <= now) grants.delete(ticket);
	pruneMapToMaxSize(grants, 127);
	const ticket = randomBytes(32).toString("base64url");
	const expiresAt = now + DOWNLOAD_TTL_MS;
	grants.set(ticket, {
		expiresAt,
		digest: params.prepared.digest,
		assertCurrent: params.assertCurrent,
		read: params.read
	});
	return {
		url: `${ARTIFACT_DOWNLOAD_PATH}${encodeURIComponent(client.connId)}/${ticket}`,
		expiresAt: new Date(expiresAt).toISOString()
	};
}
/** The RPC chooses and authorizes the resource; HTTP never accepts a replacement query. */
async function handleArtifactDownloadHttpRequest(req, res, opts) {
	const url = new URL(req.url ?? "/", "http://localhost");
	const pathname = opts.basePath && url.pathname.startsWith(`${opts.basePath}/api/artifacts/download/`) ? url.pathname.slice(opts.basePath.length) : url.pathname;
	if (!pathname.startsWith("/api/artifacts/download/")) return false;
	if (req.method !== "GET" && req.method !== "HEAD") {
		sendMethodNotAllowed(res, "GET, HEAD");
		return true;
	}
	const [connection, ticket, extra] = pathname.slice(ARTIFACT_DOWNLOAD_PATH.length).split("/");
	const client = [...opts.clients].find((candidate) => candidate.connId && encodeURIComponent(candidate.connId) === connection);
	const grants = client ? downloads.get(client) : void 0;
	const grant = ticket && extra === void 0 ? grants?.get(ticket) : void 0;
	if (!client || !grant || !ticket) {
		respondNotFound(res);
		return true;
	}
	const assertCurrent = () => {
		if (!opts.clients.has(client) || client.connectionSignal?.aborted !== false || client.invalidated || grant.expiresAt <= Date.now() || grants?.get(ticket) !== grant) throw new Error("Artifact download expired");
		grant.assertCurrent();
	};
	let prepared;
	try {
		assertCurrent();
		prepared = await grant.read({
			expectedDigest: grant.digest,
			method: req.method,
			headers: {
				range: req.headers.range,
				"if-range": req.headers["if-range"],
				"if-none-match": req.headers["if-none-match"]
			}
		});
		assertCurrent();
	} catch {
		respondNotFound(res);
		return true;
	}
	if (!prepared) {
		respondNotFound(res);
		return true;
	}
	const { artifact, response, body } = prepared;
	const mime = normalizeMimeType(artifact.mimeType);
	const contentType = mime && /^[a-z0-9!#$&^_.+-]+\/[a-z0-9!#$&^_.+-]+$/i.test(mime) ? mime : "application/octet-stream";
	res.setHeader("content-type", contentType);
	res.setHeader("content-disposition", buildAssistantMediaContentDisposition(artifact.title));
	res.setHeader("content-security-policy", "default-src 'none'; sandbox");
	res.setHeader("x-content-type-options", "nosniff");
	res.setHeader("referrer-policy", "no-referrer");
	res.setHeader("cache-control", "private, no-store");
	writeByteHeaders(res, response);
	res.end(body);
	return true;
}
//#endregion
export { createArtifactDownload as n, handleArtifactDownloadHttpRequest as r, canCreateArtifactDownload as t };
