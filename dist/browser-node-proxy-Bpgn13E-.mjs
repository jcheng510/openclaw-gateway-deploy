import { F as resolveTimerTimeoutMs, N as resolveOptionalIntegerOption, a as addTimerTimeoutGraceMs, p as clampPositiveTimerTimeoutMs } from "./number-coercion-Dq1l5muL.mjs";
import { r as asNullableRecord } from "./record-coerce-TIsquoVR.mjs";
import { r as truncateUtf16Safe } from "./utf16-slice-D_ngcYKd.mjs";
import { t as createSubsystemLogger } from "./subsystem-CeqVSEVi.mjs";
import { r as getRuntimeConfig } from "./io.runtime-BOdk1dW9.mjs";
import { n as estimateBase64DecodedBytes, t as canonicalizeBase64 } from "./base64-xteYEv8l.mjs";
import "./string-coerce-runtime-B1b8UNzb.mjs";
import "./text-utility-runtime-nihF2OJq.mjs";
import { f as saveMediaBuffer } from "./store-DK7gqgrW.mjs";
import { t as callGatewayTool } from "./gateway-CnezJTJC.mjs";
import "./runtime-env-Bh9hwd9E.mjs";
import "./number-runtime-DyNDaYIV.mjs";
import "./runtime-config-snapshot-DPPwvFCZ.mjs";
import "./media-runtime-fidPeJHC.mjs";
import "./media-store-DbiXgvS9.mjs";
import "./security-runtime-DxwQ9WKi.mjs";
import "./agent-harness-runtime-CnrNnAqy.mjs";
import "./channel-actions-B4LfC_3Y.mjs";
import "./media-understanding-runtime-AVkDCKzy.mjs";
import { X as parseBrowserSessionTabCloseResult } from "./session-tab-store-BxAwbW3e.mjs";
import { n as BROWSER_PROXY_UPLOAD_COMMAND, r as browserProxyUploadUnavailableMessage, t as BROWSER_PROXY_COMMAND } from "./browser-node-commands-CIbUPKdY.mjs";
import "./constants-C-i9f6FL.mjs";
import { d as resolveBrowserNavigationTimeoutMs, u as resolveBrowserActRequestTimeoutMs } from "./act-policy-tIEm1pjf.mjs";
import "./config-uYvCVfSN.mjs";
import "./profile-capabilities-BY7hNKee.mjs";
import "./paths-CLBj5mEu.mjs";
import { r as normalizeBrowserScreenshot, t as DEFAULT_BROWSER_SCREENSHOT_MAX_BYTES } from "./screenshot-BBC7j-SI.mjs";
import "./session-tab-registry-B2vOnChv.mjs";
import { S as fetchBrowserJson, b as requestBrowserJson, v as browserClientTimeout, x as BrowserServiceError, y as postBrowserJson } from "./client-DCwwnlWV.mjs";
import { a as prepareBrowserProxyUploadRequest, c as BROWSER_PROXY_MAX_FILE_BYTES, d as assertBrowserProxyFileCountWithinLimit, h as visitBrowserProxyFilePaths, i as isBrowserProxyUploadRequest, l as BROWSER_PROXY_OWNED_TAB_CLOSE_PATH, m as parseBrowserProxyRoute, p as parseBrowserProxyFailure, s as BROWSER_PROXY_ERROR_ENVELOPE, u as assertBrowserProxyFileBytesWithinLimits } from "./browser-proxy-upload-BHGah0Y5.mjs";
import { n as resolveBrowserProxyTimeouts } from "./browser-proxy-timeouts-BkSGd7p-.mjs";
import path from "node:path";
import { readFile } from "node:fs/promises";
import crypto from "node:crypto";
//#region extensions/browser/src/browser-node-fallback.ts
/**
* Browser-node fallback classification.
*
* Only the node host's explicit pre-dispatch reachability failure is safe to
* retry on the Gateway host. Other failures may follow a mutating action.
*/
const BROWSER_CONTROL_HOST_UNREACHABLE = /\bbrowser control host is not reachable\b/i;
function isBrowserControlHostUnavailableError(value) {
	const seen = /* @__PURE__ */ new Set();
	const visit = (candidate, depth) => {
		if (typeof candidate === "string") return BROWSER_CONTROL_HOST_UNREACHABLE.test(candidate);
		if (!candidate || typeof candidate !== "object" || depth > 3 || seen.has(candidate)) return false;
		seen.add(candidate);
		const record = candidate;
		if (typeof record.message === "string" && BROWSER_CONTROL_HOST_UNREACHABLE.test(record.message)) return true;
		return [
			record.error,
			record.cause,
			record.details,
			record.nodeError
		].some((entry) => visit(entry, depth + 1));
	};
	return visit(value, 0);
}
//#endregion
//#region extensions/browser/src/browser/client-actions.ts
function resolveBrowserOperationRequestTimeoutMs(timeoutMs) {
	const operationTimeoutMs = clampPositiveTimerTimeoutMs(timeoutMs) ?? 12e4;
	return addTimerTimeoutGraceMs(operationTimeoutMs, 5e3) ?? 1;
}
async function browserNavigate(baseUrl, opts) {
	const timeoutMs = resolveBrowserNavigationTimeoutMs(opts.timeoutMs);
	return await postBrowserJson(baseUrl, "/navigate", {
		url: opts.url,
		targetId: opts.targetId,
		timeoutMs
	}, resolveBrowserOperationRequestTimeoutMs(timeoutMs), opts);
}
async function browserArmDialog(baseUrl, opts) {
	return await postBrowserJson(baseUrl, "/hooks/dialog", {
		accept: opts.accept,
		promptText: opts.promptText,
		dialogId: opts.dialogId,
		targetId: opts.targetId,
		timeoutMs: opts.timeoutMs
	}, browserClientTimeout(baseUrl, void 0, resolveBrowserOperationRequestTimeoutMs(opts.timeoutMs)), opts);
}
async function browserArmFileChooser(baseUrl, opts) {
	return await postBrowserJson(baseUrl, "/hooks/file-chooser", {
		paths: opts.paths,
		ref: opts.ref,
		inputRef: opts.inputRef,
		element: opts.element,
		targetId: opts.targetId,
		timeoutMs: opts.timeoutMs
	}, browserClientTimeout(baseUrl, void 0, resolveBrowserOperationRequestTimeoutMs(opts.timeoutMs)), opts);
}
async function browserWaitForDownload(baseUrl, opts) {
	return await postBrowserJson(baseUrl, "/wait/download", {
		targetId: opts.targetId,
		path: opts.path,
		timeoutMs: opts.timeoutMs
	}, resolveBrowserOperationRequestTimeoutMs(opts.timeoutMs), opts);
}
async function browserDownload(baseUrl, opts) {
	return await postBrowserJson(baseUrl, "/download", {
		targetId: opts.targetId,
		ref: opts.ref,
		path: opts.path,
		timeoutMs: opts.timeoutMs
	}, resolveBrowserOperationRequestTimeoutMs(opts.timeoutMs), opts);
}
async function browserAct(baseUrl, req, opts) {
	return await postBrowserJson(baseUrl, "/act", req, resolveTimerTimeoutMs(opts?.timeoutMs, resolveBrowserActRequestTimeoutMs(req)), opts);
}
async function browserScreenshotAction(baseUrl, opts) {
	const effectiveTimeoutMs = clampPositiveTimerTimeoutMs(opts.timeoutMs) ?? 2e4;
	return await postBrowserJson(baseUrl, "/screenshot", {
		targetId: opts.targetId,
		fullPage: opts.fullPage,
		ref: opts.ref,
		element: opts.element,
		type: opts.type,
		labels: opts.labels,
		timeoutMs: effectiveTimeoutMs
	}, effectiveTimeoutMs, opts);
}
function buildQuery(params) {
	return Object.fromEntries(Object.entries(params).filter(([, value]) => typeof value === "boolean" || typeof value === "string" && value.length > 0));
}
function readBrowserPageJson(baseUrl, path, opts, query) {
	return requestBrowserJson(baseUrl, path, {
		query,
		profile: opts.profile,
		timeoutMs: browserClientTimeout(baseUrl, void 0, 2e4),
		signal: opts.signal
	});
}
async function browserConsoleMessages(baseUrl, opts = {}) {
	return await readBrowserPageJson(baseUrl, "/console", opts, buildQuery({
		level: opts.level,
		targetId: opts.targetId
	}));
}
async function browserRequests(baseUrl, opts = {}) {
	return await readBrowserPageJson(baseUrl, "/requests", opts, buildQuery({
		filter: opts.filter,
		clear: opts.clear,
		targetId: opts.targetId
	}));
}
async function browserErrors(baseUrl, opts = {}) {
	return await readBrowserPageJson(baseUrl, "/errors", opts, buildQuery({
		clear: opts.clear,
		targetId: opts.targetId
	}));
}
/** Read bounded visible text without executing page-supplied code. */
async function browserPageText(baseUrl, opts) {
	return await readBrowserPageJson(baseUrl, "/text", opts, {
		...buildQuery({
			targetId: opts.targetId,
			selector: opts.selector
		}),
		maxChars: opts.maxChars
	});
}
async function browserEmulateSetting(baseUrl, opts) {
	return await postBrowserJson(baseUrl, `/set/${opts.setting}`, opts.body, browserClientTimeout(baseUrl, void 0, 2e4), opts);
}
async function browserPdfSave(baseUrl, opts = {}) {
	return await postBrowserJson(baseUrl, "/pdf", { targetId: opts.targetId }, browserClientTimeout(baseUrl, void 0, 2e4), opts);
}
//#endregion
//#region extensions/browser/src/browser/proxy-files.ts
/**
* Browser proxy file helpers.
*
* Persists files returned by node-hosted browser proxy calls and rewrites
* proxied result paths to local saved media paths.
*/
const INVALID_BROWSER_PROXY_FILE_ENVELOPE = "browser proxy returned an invalid file envelope";
function invalidBrowserProxyFileEnvelope() {
	throw new Error(INVALID_BROWSER_PROXY_FILE_ENVELOPE);
}
function collectBrowserProxyResultPaths(result) {
	const paths = /* @__PURE__ */ new Set();
	visitBrowserProxyFilePaths(result, (filePath) => {
		paths.add(filePath);
		assertBrowserProxyFileCountWithinLimit(paths.size);
	});
	return paths;
}
function validateBrowserProxyFiles(result, files) {
	const referencedPaths = collectBrowserProxyResultPaths(result);
	const candidates = files === void 0 ? [] : files;
	if (!Array.isArray(candidates)) return invalidBrowserProxyFileEnvelope();
	assertBrowserProxyFileCountWithinLimit(candidates.length);
	const validated = [];
	for (const value of candidates) {
		const file = asNullableRecord(value);
		if (!file || typeof file.path !== "string" || !file.path.trim() || typeof file.base64 !== "string" || file.mimeType !== void 0 && typeof file.mimeType !== "string" || !referencedPaths.delete(file.path)) return invalidBrowserProxyFileEnvelope();
		validated.push({
			path: file.path,
			base64: file.base64,
			...file.mimeType === void 0 ? {} : { mimeType: file.mimeType }
		});
	}
	if (referencedPaths.size > 0) return invalidBrowserProxyFileEnvelope();
	return validated;
}
function decodeBrowserProxyFileBase64(file, totalBytes) {
	const estimatedBytes = estimateBase64DecodedBytes(file.base64);
	assertBrowserProxyFileBytesWithinLimits(estimatedBytes, totalBytes + estimatedBytes);
	const canonicalBase64 = file.base64 === "" ? "" : canonicalizeBase64(file.base64);
	if (canonicalBase64 === void 0) throw new Error("browser proxy file contains malformed base64 data");
	const buffer = Buffer.from(canonicalBase64, "base64");
	assertBrowserProxyFileBytesWithinLimits(buffer.byteLength, totalBytes + buffer.byteLength);
	return buffer;
}
/** Validate, persist, and rewrite every route-owned file in a node result. */
async function persistBrowserProxyResultFiles(result, files) {
	const validatedFiles = validateBrowserProxyFiles(result, files);
	if (validatedFiles.length === 0) return result;
	const decoded = [];
	let totalBytes = 0;
	for (const file of validatedFiles) {
		const buffer = decodeBrowserProxyFileBase64(file, totalBytes);
		totalBytes += buffer.byteLength;
		decoded.push({
			file,
			buffer
		});
	}
	const mapping = /* @__PURE__ */ new Map();
	for (const { file, buffer } of decoded) {
		const saved = await saveMediaBuffer(buffer, file.mimeType, "browser", BROWSER_PROXY_MAX_FILE_BYTES, file.path);
		mapping.set(file.path, saved.path);
	}
	visitBrowserProxyFilePaths(result, (filePath) => mapping.get(filePath));
	return result;
}
//#endregion
//#region extensions/browser/src/browser/screenshot-sharing.ts
/** Stages a bounded screenshot copy in the sandbox-authorized outbound store. */
async function stageBrowserScreenshotForSharing(filePath, maxDimensionPx) {
	const source = await readFile(filePath);
	const normalized = await normalizeBrowserScreenshot(source, {
		maxSide: maxDimensionPx ?? 2e3,
		maxBytes: DEFAULT_BROWSER_SCREENSHOT_MAX_BYTES
	});
	return (await saveMediaBuffer(normalized.buffer, normalized.contentType, "outbound", DEFAULT_BROWSER_SCREENSHOT_MAX_BYTES, path.basename(filePath))).path;
}
//#endregion
//#region extensions/browser/src/browser-tool.runtime.ts
/**
* Runtime dependency barrel for the Browser agent tool.
*
* Kept separate from browser-tool.ts so tests can mock the tool boundary while
* production still imports SDK helpers and browser client actions lazily.
*/
/** Resolve global image downscaling for screenshots returned to agent tools. */
function resolveRuntimeImageSanitization() {
	const maxDimensionPx = resolveOptionalIntegerOption(getRuntimeConfig().agents?.defaults?.imageMaxDimensionPx, { min: 1 });
	if (maxDimensionPx === void 0) return;
	return { maxDimensionPx };
}
//#endregion
//#region extensions/browser/src/browser-node-proxy.ts
const logger = createSubsystemLogger("browser");
var BrowserNodeSafeFallbackError = class extends Error {
	constructor(message, cause) {
		super(message, cause === void 0 ? void 0 : { cause });
		this.name = "BrowserNodeSafeFallbackError";
	}
};
function unwrapBrowserProxyPayload(payload) {
	if (payload?.payload !== void 0) return payload.payload;
	if (typeof payload?.payloadJSON !== "string" || !payload.payloadJSON.trim()) return null;
	try {
		return JSON.parse(payload.payloadJSON);
	} catch {
		return null;
	}
}
async function callBrowserProxy(params) {
	const { proxyTimeoutMs, nodeInvokeTimeoutMs, gatewayTimeoutMs } = resolveBrowserProxyTimeouts(params.timeoutMs);
	if (isBrowserProxyUploadRequest(params) && !params.declaredCommands.includes("browser.proxy.upload.v1")) throw new BrowserNodeSafeFallbackError(browserProxyUploadUnavailableMessage(params.pendingDeclaredCommands));
	const preparedUpload = await prepareBrowserProxyUploadRequest({
		method: params.method,
		path: params.path,
		body: params.body,
		signal: params.signal
	});
	const command = preparedUpload.upload ? BROWSER_PROXY_UPLOAD_COMMAND : BROWSER_PROXY_COMMAND;
	let payload;
	try {
		payload = await callGatewayTool("node.invoke", { timeoutMs: gatewayTimeoutMs }, {
			nodeId: params.nodeId,
			command,
			timeoutMs: nodeInvokeTimeoutMs,
			params: {
				method: params.method,
				path: params.path,
				query: params.query,
				body: preparedUpload.body,
				upload: preparedUpload.upload,
				timeoutMs: proxyTimeoutMs,
				profile: params.profile,
				errorEnvelope: BROWSER_PROXY_ERROR_ENVELOPE
			},
			idempotencyKey: crypto.randomUUID()
		}, {
			scopes: ["operator.admin"],
			...params.signal ? { signal: params.signal } : {}
		});
	} catch (error) {
		if (params.allowAutomaticHostFallback && isBrowserControlHostUnavailableError(error)) throw new BrowserNodeSafeFallbackError("browser node control host unavailable", error);
		throw error;
	}
	const parsed = unwrapBrowserProxyPayload(payload);
	if (!parsed || typeof parsed !== "object" || !("result" in parsed) && !parseBrowserProxyFailure(parsed)) {
		const selectedNode = truncateUtf16Safe(params.nodeLabel?.trim() || params.nodeId, 256);
		throw new Error(`Browser proxy returned an invalid response from node ${JSON.stringify(selectedNode)}. Retry with action=status target="host" to check Gateway host browser control.`);
	}
	return parsed;
}
async function callLocalBrowserControl(params) {
	const url = new URL(params.path, "http://localhost");
	for (const [key, value] of Object.entries(params.query ?? {})) if (value !== void 0) url.searchParams.set(key, String(value));
	if (params.profile) url.searchParams.set("profile", params.profile);
	return await fetchBrowserJson(`${url.pathname}${url.search}`, {
		method: params.method,
		body: params.body === void 0 ? void 0 : JSON.stringify(params.body),
		timeoutMs: params.timeoutMs,
		signal: params.signal
	});
}
function createBrowserNodeProxyRequest(params) {
	let target = params.allowAutomaticHostFallback ? "auto" : "node";
	let route;
	const dispatch = async (request) => {
		const requestWithSignal = request.signal || params.signal ? {
			...request,
			signal: request.signal ?? params.signal
		} : request;
		if (target === "host") return await callLocalBrowserControl(requestWithSignal);
		try {
			const proxy = await callBrowserProxy({
				nodeId: params.nodeTarget.nodeId,
				nodeLabel: params.nodeTarget.label,
				declaredCommands: params.nodeTarget.commands ?? [],
				pendingDeclaredCommands: params.nodeTarget.pendingDeclaredCommands ?? [],
				allowAutomaticHostFallback: target === "auto",
				...requestWithSignal
			});
			target = "node";
			route = parseBrowserProxyRoute(proxy);
			const failure = parseBrowserProxyFailure(proxy);
			if (failure) {
				const { status, body } = failure.error;
				throw new BrowserServiceError(body.error, body, status);
			}
			if (!("result" in proxy)) throw new Error("Browser proxy returned a failure without an error payload.");
			return await persistBrowserProxyResultFiles(proxy.result, proxy.files);
		} catch (error) {
			if (target !== "auto" || !(error instanceof BrowserNodeSafeFallbackError)) throw error;
			target = "host";
			route = void 0;
			logger.warn(`browser node ${params.nodeTarget.label ?? params.nodeTarget.nodeId} unavailable before dispatch (${error.message}); falling back to Gateway host`);
			return await callLocalBrowserControl(requestWithSignal);
		}
	};
	return Object.assign(dispatch, {
		isHostFallbackActive: () => target === "host",
		route: () => route
	});
}
function createBrowserNodeSessionTabRoute(nodeTarget) {
	return {
		kind: "node-proxy",
		nodeId: nodeTarget.nodeId,
		closeTarget: async (tab) => {
			const cleanupProxy = createBrowserNodeProxyRequest({
				nodeTarget,
				allowAutomaticHostFallback: false
			});
			if (tab.ownership?.status === "durable") return parseBrowserSessionTabCloseResult(await cleanupProxy({
				method: "POST",
				path: BROWSER_PROXY_OWNED_TAB_CLOSE_PATH,
				body: { ownership: tab.ownership },
				profile: tab.profile
			}));
			await cleanupProxy({
				method: "DELETE",
				path: `/tabs/${encodeURIComponent(tab.targetId)}`,
				query: { targetIdMode: "raw" },
				profile: tab.profile
			});
			return { status: "closed" };
		}
	};
}
//#endregion
export { browserScreenshotAction as _, persistBrowserProxyResultFiles as a, browserArmFileChooser as c, browserEmulateSetting as d, browserErrors as f, browserRequests as g, browserPdfSave as h, stageBrowserScreenshotForSharing as i, browserConsoleMessages as l, browserPageText as m, createBrowserNodeSessionTabRoute as n, browserAct as o, browserNavigate as p, resolveRuntimeImageSanitization as r, browserArmDialog as s, createBrowserNodeProxyRequest as t, browserDownload as u, browserWaitForDownload as v, isBrowserControlHostUnavailableError as y };
