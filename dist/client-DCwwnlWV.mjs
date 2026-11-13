import { l as normalizeOptionalString, o as normalizeLowercaseStringOrEmpty } from "./string-coerce-6kR-86XC.mjs";
import { F as resolveTimerTimeoutMs, p as clampPositiveTimerTimeoutMs } from "./number-coercion-Dq1l5muL.mjs";
import { i as extractErrorCode, u as toErrorObject } from "./error-coercion-1P2One0X.mjs";
import { r as asNullableRecord } from "./record-coerce-TIsquoVR.mjs";
import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { t as formatCliCommand } from "./command-format-Cte1SWM4.mjs";
import { i as readResponseWithLimit } from "./http-response-body-L4SAGcXJ.mjs";
import { r as getRuntimeConfig } from "./io.runtime-BOdk1dW9.mjs";
import { i as fetchWithSsrFGuard } from "./fetch-guard-BulPh3pN.mjs";
import { s as isLoopbackHost } from "./net-BD0odJBF.mjs";
import "./error-runtime-CKQUxkum.mjs";
import "./string-coerce-runtime-B1b8UNzb.mjs";
import "./response-limit-runtime-EJhmMies.mjs";
import "./number-runtime-DyNDaYIV.mjs";
import "./setup-tools-CLFs_KtI.mjs";
import "./runtime-config-snapshot-DPPwvFCZ.mjs";
import "./ssrf-runtime-CaiftzgS.mjs";
import { t as parseBrowserHttpUrl } from "./browser-cdp-DmzPHY2E.mjs";
import "./constants-C-i9f6FL.mjs";
import { i as resolveBrowserConfig, s as resolveProfile } from "./config-uYvCVfSN.mjs";
import { m as parseBrowserErrorPayload, t as BROWSER_ACT_ERROR_CODES } from "./errors-BqlAThZX.mjs";
import { m as resolveBrowserRateLimitMessage } from "./cdp.helpers-BQx3QNZm.mjs";
import { n as getBridgeAuthForPort } from "./bridge-auth-registry-CaEE1qzT.mjs";
import { n as resolveBrowserControlAuth } from "./control-auth-BPB3AO6C.mjs";
import { AsyncLocalStorage } from "node:async_hooks";
//#region extensions/browser/src/browser/request-scope.ts
const requestScope = new AsyncLocalStorage();
/** Carry a dashboard's authority through the existing local Browser client transport. */
function withBrowserRequestScope(scope, run) {
	return requestScope.run(scope, run);
}
function getBrowserRequestScope() {
	return requestScope.getStore();
}
//#endregion
//#region extensions/browser/src/browser/client-fetch.ts
/**
* Browser control client transport.
*
* Sends requests to either an absolute HTTP browser-control URL or the local
* in-process dispatcher, adding loopback auth and operator-facing diagnostics.
*/
var BrowserServiceError = class extends Error {
	constructor(message, metadata, status) {
		super(message);
		this.name = "BrowserServiceError";
		this.status = status;
		this.code = metadata?.code;
		this.unrecognizedCode = metadata?.unrecognizedCode;
		this.reason = metadata && "reason" in metadata ? metadata.reason : void 0;
		this.details = metadata && "details" in metadata ? metadata.details : void 0;
	}
};
function browserServiceErrorFromPayload(value, fallback, status) {
	const parsed = parseBrowserErrorPayload(value);
	const message = parsed?.error ?? fallback;
	const modelHint = parsed?.code === BROWSER_ACT_ERROR_CODES.operationFailed && status !== 401 ? void 0 : resolveBrowserServiceModelHint(message, status);
	return new BrowserServiceError(modelHint ? appendBrowserToolModelHint(message, modelHint) : message, parsed ?? void 0, status);
}
function isAbsoluteHttp(url) {
	return /^https?:\/\//i.test(url.trim());
}
function isLoopbackHttpUrl(url) {
	try {
		return isLoopbackHost(new URL(url).hostname);
	} catch {
		return false;
	}
}
function withLoopbackBrowserAuth(url, init) {
	const headers = new Headers(init?.headers ?? {});
	if (headers.has("authorization") || headers.has("x-openclaw-password")) return {
		...init,
		headers
	};
	if (!isLoopbackHttpUrl(url)) return {
		...init,
		headers
	};
	try {
		const { port } = parseBrowserHttpUrl(url, "browser control URL");
		const bridgeAuth = getBridgeAuthForPort(port);
		if (bridgeAuth?.token) {
			headers.set("Authorization", `Bearer ${bridgeAuth.token}`);
			return {
				...init,
				headers
			};
		}
		if (bridgeAuth?.password) {
			headers.set("x-openclaw-password", bridgeAuth.password);
			return {
				...init,
				headers
			};
		}
	} catch {}
	try {
		const cfg = getRuntimeConfig();
		const auth = resolveBrowserControlAuth(cfg);
		if (auth.token) headers.set("Authorization", `Bearer ${auth.token}`);
		else if (auth.password) headers.set("x-openclaw-password", auth.password);
	} catch {}
	return {
		...init,
		headers
	};
}
const BROWSER_TOOL_PERSISTENT_MODEL_HINT = "Do NOT retry the browser tool — it will keep failing. Use an alternative approach or inform the user that the browser is currently unavailable.";
const BROWSER_TOOL_TRANSIENT_MODEL_HINT = "This may be a transient browser error. Retry the browser tool once. If the same error persists, use an alternative approach or inform the user that the browser is currently unavailable.";
const BROWSER_TRANSIENT_NETWORK_ERROR_RE = /\b(?:ECONNRESET|ECONNABORTED|ENETRESET|ETIMEDOUT|EPIPE|EHOSTUNREACH|ENETUNREACH|EAI_AGAIN|UND_ERR_(?:CONNECT_TIMEOUT|HEADERS_TIMEOUT|BODY_TIMEOUT|SOCKET))\b|fetch failed|network error|other side closed|socket (?:hang up|terminated)|connection (?:reset|aborted|timed out)/i;
const BROWSER_PERSISTENT_FAILURE_RE = /\bECONNREFUSED\b|connection refused|browser control (?:is )?(?:disabled|not enabled)|invalid (?:auth|authentication|credentials|password|token)|authentication (?:failed|required)|unauthorized/i;
const BROWSER_ERROR_BODY_LIMIT_BYTES = 16384;
const BROWSER_SUCCESS_BODY_LIMIT_BYTES = 33554432;
function decodeBrowserControlResponseUtf8(body, status) {
	try {
		return new TextDecoder("utf-8", { fatal: true }).decode(body);
	} catch {
		throw browserServiceErrorFromPayload(void 0, `Browser control response was not valid UTF-8 (HTTP ${status})`, status);
	}
}
function resolveDispatcherBrowserControlOwnership(url) {
	if (isAbsoluteHttp(url)) return "unknown";
	try {
		const cfg = getRuntimeConfig();
		const resolved = resolveBrowserConfig(cfg?.browser, cfg);
		const requestedProfile = new URL(url, "http://localhost").searchParams.get("profile")?.trim();
		const profile = resolveProfile(resolved, requestedProfile || resolved.defaultProfile);
		if (!profile) return "unknown";
		return profile.driver === "openclaw" && profile.cdpIsLoopback && !profile.attachOnly ? "local-managed" : "external-browser";
	} catch {
		return "unknown";
	}
}
function resolveBrowserFetchOperatorHint(url, opts) {
	if (opts?.ownership === "external-browser") return "The browser profile is external to OpenClaw; make sure its browser/CDP endpoint is running and reachable. Restarting the OpenClaw gateway will not launch it.";
	return !isAbsoluteHttp(url) ? `Run \`${formatCliCommand("openclaw browser doctor")}\` and check the Gateway logs.` : "If this is a sandboxed session, ensure the sandbox browser is running.";
}
function normalizeErrorMessage(err) {
	const message = err instanceof Error ? normalizeOptionalString(err.message) : void 0;
	if (message) return message;
	return String(err);
}
function appendBrowserToolModelHint(message, hint) {
	return `${message.replaceAll(BROWSER_TOOL_PERSISTENT_MODEL_HINT, "").replaceAll(BROWSER_TOOL_TRANSIENT_MODEL_HINT, "").trim()} ${hint}`;
}
function classifyBrowserFetchFailure(err) {
	const directCode = extractErrorCode(err);
	const formatted = formatErrorMessage(err);
	const detail = directCode ? `${formatted} | ${directCode}` : formatted;
	const detailLower = normalizeLowercaseStringOrEmpty(detail);
	const nameLower = err instanceof Error ? normalizeLowercaseStringOrEmpty(err.name) : "";
	if (nameLower === "aborterror") return "aborted";
	if (BROWSER_PERSISTENT_FAILURE_RE.test(detail)) return "persistent";
	if (nameLower.includes("timeout") || detailLower.includes("timed out") || detailLower.includes("timeout")) return "timeout";
	if (BROWSER_TRANSIENT_NETWORK_ERROR_RE.test(detail)) return "transient-network";
	return detailLower.includes("aborterror") || detailLower.includes("aborted") || detailLower.includes("abort") || detailLower.includes("cancelled") || detailLower.includes("canceled") ? "aborted" : "persistent";
}
function isPersistentBrowserServiceFailure(message, status) {
	return status === 401 || BROWSER_PERSISTENT_FAILURE_RE.test(message);
}
function resolveBrowserServiceModelHint(message, status) {
	if (message.includes(BROWSER_TOOL_PERSISTENT_MODEL_HINT)) return BROWSER_TOOL_PERSISTENT_MODEL_HINT;
	if (message.includes(BROWSER_TOOL_TRANSIENT_MODEL_HINT)) return BROWSER_TOOL_TRANSIENT_MODEL_HINT;
	if (isPersistentBrowserServiceFailure(message, status)) return BROWSER_TOOL_PERSISTENT_MODEL_HINT;
	if (status === 408 || status === 504) return BROWSER_TOOL_TRANSIENT_MODEL_HINT;
	if (status === void 0 || status < 500 || status > 599) return;
	const kind = classifyBrowserFetchFailure(new Error(message));
	return kind === "timeout" || kind === "transient-network" ? BROWSER_TOOL_TRANSIENT_MODEL_HINT : void 0;
}
function resolveBrowserToolModelHint(kind) {
	if (kind === "timeout" || kind === "transient-network") return BROWSER_TOOL_TRANSIENT_MODEL_HINT;
	return kind === "persistent" ? BROWSER_TOOL_PERSISTENT_MODEL_HINT : void 0;
}
async function discardResponseBody(res) {
	try {
		await res.body?.cancel();
	} catch {}
}
function enhanceDispatcherPathError(url, err) {
	const msg = normalizeErrorMessage(err);
	const kind = classifyBrowserFetchFailure(err);
	const operatorHint = resolveBrowserFetchOperatorHint(url, { ownership: resolveDispatcherBrowserControlOwnership(url) });
	const modelHint = resolveBrowserToolModelHint(kind);
	const suffix = modelHint ? `${operatorHint} ${modelHint}` : operatorHint;
	const normalized = msg.endsWith(".") ? msg : `${msg}.`;
	return new Error(`${normalized} ${suffix}`, err instanceof Error ? { cause: err } : void 0);
}
function enhanceBrowserFetchError(url, err, timeoutMs) {
	const operatorHint = resolveBrowserFetchOperatorHint(url);
	const msg = normalizeErrorMessage(err);
	const kind = classifyBrowserFetchFailure(err);
	if (kind === "timeout") return new Error(`Can't reach the OpenClaw browser control service (timed out after ${timeoutMs}ms). ${operatorHint} ${BROWSER_TOOL_TRANSIENT_MODEL_HINT}`, err instanceof Error ? { cause: err } : void 0);
	if (kind === "aborted") return new Error(`Browser control request was cancelled. ${operatorHint}`, err instanceof Error ? { cause: err } : void 0);
	if (kind === "transient-network") return new Error(`Can't reach the OpenClaw browser control service. ${operatorHint} (${msg}) ${BROWSER_TOOL_TRANSIENT_MODEL_HINT}`, err instanceof Error ? { cause: err } : void 0);
	return new Error(appendBrowserToolModelHint(`Can't reach the OpenClaw browser control service. ${operatorHint} (${msg})`, BROWSER_TOOL_PERSISTENT_MODEL_HINT), err instanceof Error ? { cause: err } : void 0);
}
function createBrowserRequestAbort(upstreamSignal) {
	const controller = new AbortController();
	const abort = () => controller.abort(upstreamSignal?.reason);
	if (upstreamSignal?.aborted) abort();
	else upstreamSignal?.addEventListener("abort", abort, { once: true });
	return {
		controller,
		signal: controller.signal,
		dispose: () => upstreamSignal?.removeEventListener("abort", abort)
	};
}
async function fetchHttpJson(url, init) {
	const timeoutMs = resolveTimerTimeoutMs(init.timeoutMs, 5e3);
	const abort = createBrowserRequestAbort(init.signal);
	const { controller: ctrl, signal } = abort;
	const t = setTimeout(() => ctrl.abort(/* @__PURE__ */ new Error("timed out")), timeoutMs);
	let release;
	try {
		const guarded = await fetchWithSsrFGuard({
			url,
			init,
			timeoutMs,
			signal,
			policy: { allowPrivateNetwork: true },
			auditContext: "browser-control-client"
		});
		release = guarded.release;
		const res = guarded.response;
		if (!res.ok) {
			if (res.status === 429) {
				await discardResponseBody(res);
				throw new BrowserServiceError(`${resolveBrowserRateLimitMessage(url)} ${BROWSER_TOOL_PERSISTENT_MODEL_HINT}`);
			}
			const body = await readResponseWithLimit(res, BROWSER_ERROR_BODY_LIMIT_BYTES).catch(() => void 0);
			const text = body ? decodeBrowserControlResponseUtf8(body, res.status) : "";
			let parsed;
			if (text) try {
				parsed = JSON.parse(text);
			} catch {}
			throw browserServiceErrorFromPayload(parsed, text || `HTTP ${res.status}`, res.status);
		}
		const body = await readResponseWithLimit(res, BROWSER_SUCCESS_BODY_LIMIT_BYTES, { onOverflow: ({ maxBytes }) => new BrowserServiceError(`Browser control response exceeded ${maxBytes} bytes`) });
		return JSON.parse(decodeBrowserControlResponseUtf8(body, res.status));
	} finally {
		clearTimeout(t);
		await release?.();
		abort.dispose();
	}
}
/** Fetch JSON from browser control over HTTP or local dispatcher transport. */
async function fetchBrowserJson(url, init) {
	const timeoutMs = resolveTimerTimeoutMs(init?.timeoutMs, 5e3);
	const scope = getBrowserRequestScope();
	let isDispatcherPath = false;
	try {
		if (isAbsoluteHttp(url)) {
			if (scope) throw new Error("Dashboard browser requests must stay on the local managed browser");
			return await fetchHttpJson(url, {
				...withLoopbackBrowserAuth(url, init),
				timeoutMs
			});
		}
		isDispatcherPath = true;
		const { dispatchBrowserControlRequest } = await import("./local-dispatch.runtime.js");
		const parsed = new URL(url, "http://localhost");
		const query = {};
		for (const [key, value] of parsed.searchParams.entries()) query[key] = value;
		if (scope) query.managedOnly = true;
		let body = init?.body;
		if (typeof body === "string") try {
			body = JSON.parse(body);
		} catch {}
		const abort = createBrowserRequestAbort(init?.signal);
		const { controller: abortCtrl, signal } = abort;
		let abortListener;
		const abortPromise = signal.aborted ? Promise.reject(toErrorObject(signal.reason ?? /* @__PURE__ */ new Error("aborted"), "Non-Error rejection")) : new Promise((_, reject) => {
			abortListener = () => reject(toErrorObject(signal.reason ?? /* @__PURE__ */ new Error("aborted"), "Non-Error rejection"));
			signal.addEventListener("abort", abortListener, { once: true });
		});
		let timer;
		if (timeoutMs) timer = setTimeout(() => abortCtrl.abort(/* @__PURE__ */ new Error("timed out")), timeoutMs);
		const dispatchPromise = dispatchBrowserControlRequest({
			method: init?.method?.toUpperCase() === "DELETE" ? "DELETE" : init?.method?.toUpperCase() === "POST" ? "POST" : "GET",
			path: parsed.pathname,
			query,
			body,
			signal,
			...scope ? { assertCurrent: scope.assertCurrent } : {}
		});
		const result = await Promise.race([dispatchPromise, abortPromise]).finally(() => {
			if (timer) clearTimeout(timer);
			if (abortListener) signal.removeEventListener("abort", abortListener);
			abort.dispose();
		});
		if (result.status >= 400) {
			if (result.status === 429) throw new BrowserServiceError(`${resolveBrowserRateLimitMessage(url)} ${BROWSER_TOOL_PERSISTENT_MODEL_HINT}`);
			throw browserServiceErrorFromPayload(result.body, `HTTP ${result.status}`, result.status);
		}
		return result.body;
	} catch (err) {
		if (err instanceof BrowserServiceError) throw err;
		if (isDispatcherPath) throw enhanceDispatcherPathError(url, err);
		throw enhanceBrowserFetchError(url, err, timeoutMs);
	}
}
//#endregion
//#region extensions/browser/src/browser/client-request.ts
function browserClientTimeout(target, requested, localDefault) {
	return typeof target === "function" ? requested : resolveTimerTimeoutMs(requested, localDefault);
}
/** Send the same explicitly projected request through the selected transport. */
async function requestBrowserJson(target, path, opts = {}) {
	if (typeof target === "function") return await target({
		...opts,
		method: opts.method ?? "GET",
		path
	});
	const query = new URLSearchParams();
	for (const [key, value] of Object.entries(opts.query ?? {})) if (value !== void 0) query.set(key, String(value));
	const suffix = query.size ? `${path.includes("?") ? "&" : "?"}${query}` : "";
	const profile = opts.profile ? `${suffix || path.includes("?") ? "&" : "?"}profile=${encodeURIComponent(opts.profile)}` : "";
	return await fetchBrowserJson(`${target?.trim().replace(/\/$/, "") ?? ""}${path}${suffix}${profile}`, {
		method: opts.method,
		...opts.body === void 0 ? {} : {
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(opts.body)
		},
		timeoutMs: opts.timeoutMs,
		signal: opts.signal
	});
}
function postBrowserJson(target, path, body, timeoutMs, opts) {
	return requestBrowserJson(target, path, {
		method: "POST",
		body,
		timeoutMs,
		profile: opts?.profile,
		signal: opts?.signal
	});
}
//#endregion
//#region extensions/browser/src/browser/client.ts
const BROWSER_STATUS_REQUEST_TIMEOUT_MS = 7500;
const BROWSER_DOCTOR_REQUEST_TIMEOUT_MS = 7500;
const BROWSER_DEEP_DOCTOR_REQUEST_TIMEOUT_MS = 1e4;
async function sendProfilePost(baseUrl, path, opts, fallbackTimeoutMs) {
	await requestBrowserJson(baseUrl, path, {
		profile: opts?.profile,
		method: "POST",
		timeoutMs: browserClientTimeout(baseUrl, opts?.timeoutMs, fallbackTimeoutMs),
		signal: opts?.signal
	});
}
async function sendTabCloseRequest(baseUrl, path, opts) {
	return await requestBrowserJson(baseUrl, path, {
		profile: opts?.profile,
		method: "DELETE",
		timeoutMs: browserClientTimeout(baseUrl, opts?.timeoutMs, 5e3),
		signal: opts?.signal
	});
}
async function browserStatus(baseUrl, opts) {
	return await requestBrowserJson(baseUrl, "/", {
		profile: opts?.profile,
		timeoutMs: browserClientTimeout(baseUrl, opts?.timeoutMs, BROWSER_STATUS_REQUEST_TIMEOUT_MS),
		signal: opts?.signal
	});
}
async function browserDoctor(baseUrl, opts) {
	return await requestBrowserJson(baseUrl, "/doctor", {
		profile: opts?.profile,
		query: opts?.deep ? { deep: "true" } : void 0,
		timeoutMs: browserClientTimeout(baseUrl, void 0, opts?.deep ? BROWSER_DEEP_DOCTOR_REQUEST_TIMEOUT_MS : BROWSER_DOCTOR_REQUEST_TIMEOUT_MS),
		signal: opts?.signal
	});
}
async function browserProfiles(baseUrl, opts) {
	return (await requestBrowserJson(baseUrl, "/profiles", {
		timeoutMs: browserClientTimeout(baseUrl, opts?.timeoutMs, 3e3),
		signal: opts?.signal
	})).profiles ?? [];
}
async function browserSystemProfiles(baseUrl, opts) {
	return (await requestBrowserJson(baseUrl, "/system-profiles", {
		query: opts?.browser ? { browser: opts.browser } : void 0,
		timeoutMs: browserClientTimeout(baseUrl, opts?.timeoutMs, 3e3),
		signal: opts?.signal
	})).systemProfiles ?? [];
}
async function browserImportProfile(baseUrl, opts) {
	return await postBrowserJson(baseUrl, "/profiles/import", {
		browser: opts.browser,
		systemProfile: opts.systemProfile,
		into: opts.into,
		domains: opts.domains
	}, 12e4, { signal: opts.signal });
}
async function browserStart(baseUrl, opts) {
	await sendProfilePost(baseUrl, "/start", opts, 15e3);
}
async function browserStop(baseUrl, opts) {
	await sendProfilePost(baseUrl, "/stop", opts, 15e3);
}
async function browserResetProfile(baseUrl, opts) {
	return await requestBrowserJson(baseUrl, "/reset-profile", {
		profile: opts?.profile,
		method: "POST",
		timeoutMs: 2e4
	});
}
async function browserCreateProfile(baseUrl, opts) {
	return await postBrowserJson(baseUrl, "/profiles/create", {
		name: opts.name,
		color: opts.color,
		cdpUrl: opts.cdpUrl,
		userDataDir: opts.userDataDir,
		driver: opts.driver
	}, 1e4);
}
async function browserDeleteProfile(baseUrl, profile) {
	return await requestBrowserJson(baseUrl, `/profiles/${encodeURIComponent(profile)}`, {
		method: "DELETE",
		timeoutMs: 2e4
	});
}
function normalizeBrowserTabsResult(value) {
	const result = asNullableRecord(value);
	if (result?.running === false) return {
		running: false,
		tabs: []
	};
	return {
		running: true,
		tabs: Array.isArray(result?.tabs) ? result.tabs : []
	};
}
async function browserTabs(baseUrl, opts) {
	return normalizeBrowserTabsResult(await requestBrowserJson(baseUrl, "/tabs", {
		profile: opts?.profile,
		timeoutMs: browserClientTimeout(baseUrl, opts?.timeoutMs, 3e3),
		signal: opts?.signal
	}));
}
async function browserOpenTab(baseUrl, url, opts) {
	return await postBrowserJson(baseUrl, "/tabs/open", {
		url,
		...opts?.label ? { label: opts.label } : {},
		...opts?.managedOnly ? { managedOnly: true } : {}
	}, browserClientTimeout(baseUrl, opts?.timeoutMs, 15e3), opts);
}
async function browserFocusTab(baseUrl, targetId, opts) {
	return await postBrowserJson(baseUrl, "/tabs/focus", { targetId }, browserClientTimeout(baseUrl, opts?.timeoutMs, 5e3), opts);
}
async function browserCloseTab(baseUrl, targetId, opts) {
	return await sendTabCloseRequest(baseUrl, `/tabs/${encodeURIComponent(targetId)}`, opts);
}
/** Close a canonical raw target id selected by OpenClaw's internal tab bookkeeping. */
async function browserCloseTabByRawTargetId(baseUrl, targetId, opts) {
	await sendTabCloseRequest(baseUrl, `/tabs/${encodeURIComponent(targetId)}?targetIdMode=raw`, opts);
}
/** Execute legacy index-based tab actions. */
async function browserTabAction(baseUrl, opts) {
	return await postBrowserJson(baseUrl, "/tabs/action", {
		action: opts.action,
		index: opts.index
	}, 1e4, { profile: opts.profile });
}
async function browserSnapshot(baseUrl, opts) {
	const q = {};
	if (opts.format) q.format = opts.format;
	if (opts.targetId) q.targetId = opts.targetId;
	if (typeof opts.limit === "number") q.limit = opts.limit;
	if (typeof opts.maxChars === "number" && Number.isFinite(opts.maxChars)) q.maxChars = opts.maxChars;
	if (opts.refs === "aria" || opts.refs === "role") q.refs = opts.refs;
	if (typeof opts.interactive === "boolean") q.interactive = opts.interactive;
	if (typeof opts.compact === "boolean") q.compact = opts.compact;
	if (typeof opts.depth === "number" && Number.isFinite(opts.depth)) q.depth = opts.depth;
	if (opts.selector?.trim()) q.selector = opts.selector.trim();
	if (opts.frame?.trim()) q.frame = opts.frame.trim();
	if (opts.labels === true) q.labels = "1";
	if (opts.urls === true) q.urls = "1";
	if (opts.mode) q.mode = opts.mode;
	const resolvedTimeoutMs = clampPositiveTimerTimeoutMs(opts.timeoutMs) ?? 2e4;
	q.timeoutMs = resolvedTimeoutMs;
	return await requestBrowserJson(baseUrl, "/snapshot", {
		query: q,
		profile: opts.profile,
		timeoutMs: resolvedTimeoutMs,
		signal: opts.signal
	});
}
//#endregion
export { withBrowserRequestScope as C, fetchBrowserJson as S, browserTabs as _, browserDoctor as a, requestBrowserJson as b, browserOpenTab as c, browserSnapshot as d, browserStart as f, browserTabAction as g, browserSystemProfiles as h, browserDeleteProfile as i, browserProfiles as l, browserStop as m, browserCloseTabByRawTargetId as n, browserFocusTab as o, browserStatus as p, browserCreateProfile as r, browserImportProfile as s, browserCloseTab as t, browserResetProfile as u, browserClientTimeout as v, BrowserServiceError as x, postBrowserJson as y };
