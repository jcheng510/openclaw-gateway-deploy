import { r as __exportAll } from "./rolldown-runtime-Dr7-SnC6.mjs";
import { j as resolveIntegerOption } from "./number-coercion-Dq1l5muL.mjs";
import { a as getPluginRuntimeGatewayRequestScope } from "./gateway-request-scope-Da9jAC9_.mjs";
import { r as getBoundLegacyPluginSdkResourceHost } from "./legacy-sdk-resource-host-CYqyTaJu.mjs";
import { t as pruneMapToMaxSize } from "./map-size-CNcWiFKu.mjs";
import { a as isRequestBodyLimitError, c as requestBodyErrorToText, n as DEFAULT_WEBHOOK_MAX_BODY_BYTES, s as readRequestBodyWithLimit } from "./http-body-PMignl3j.mjs";
import { n as normalizePluginHttpPath } from "./http-path-CmuZ01eh.mjs";
import { x as resolveRequestClientIpFromHeaders } from "./net-BD0odJBF.mjs";
import { t as GatewayScheduler } from "./gateway-scheduler-Dq116NWy.mjs";
import { n as rawDataToString } from "./ws-BdD3UP1C.mjs";
import { p as createGatewayAuthRateLimiter } from "./auth-rate-limit-ljr4u3Yk.mjs";
import { t as getWebhookLegacyListener } from "./http-legacy-listener-Sd8ajkej.mjs";
import { a as createWebhookInFlightLimiter, c as readWebhookBodyOrReject, i as beginWebhookRequestPipelineOrReject, n as WEBHOOK_IN_FLIGHT_DEFAULTS, o as isJsonContentType, r as applyBasicWebhookRequestGuards, s as readJsonWebhookBodyOrReject, t as WEBHOOK_BODY_READ_DEFAULTS } from "./webhook-request-guards-CTunXcRc.mjs";
import { r as registerPluginHttpRoute } from "./http-registry-DzomuceN.mjs";
import { c as resolveWebhookPath, d as resolveWebhookTargets, f as withResolvedWebhookRequestPipeline, i as registerWebhookTargetWithPluginRoute, l as resolveWebhookTargetWithAuthOrReject, n as normalizeWebhookPath, o as resolveSingleWebhookTarget, r as registerWebhookTarget, s as resolveSingleWebhookTargetAsync, t as canonicalizeWebhookRouteKey, u as resolveWebhookTargetWithAuthOrRejectSync } from "./webhook-targets-BrmmCjTv.mjs";
import { randomUUID } from "node:crypto";
//#region src/plugin-sdk/webhook-memory-guards.ts
/** Default webhook ingress rate-limit settings for plugin monitors. */
const WEBHOOK_RATE_LIMIT_DEFAULTS = Object.freeze({
	windowMs: 6e4,
	maxRequests: 120,
	maxTrackedKeys: 4096
});
/** Default cardinality and sampling settings for webhook anomaly counters. */
const WEBHOOK_ANOMALY_COUNTER_DEFAULTS = Object.freeze({
	maxTrackedKeys: 4096,
	ttlMs: 216e5,
	logEvery: 25
});
/** HTTP status codes counted as anomalous webhook request outcomes. */
const WEBHOOK_ANOMALY_STATUS_CODES = Object.freeze([
	400,
	401,
	408,
	413,
	415,
	429
]);
function createBoundedTimedMap(maxTrackedKeys, pruneIntervalMs, isExpired) {
	const entries = /* @__PURE__ */ new Map();
	let lastPruneMs = 0;
	return {
		get(key, nowMs) {
			if (isExpired && nowMs - lastPruneMs >= pruneIntervalMs) {
				for (const [entryKey, entry] of entries) if (isExpired(entry, nowMs)) entries.delete(entryKey);
				lastPruneMs = nowMs;
			}
			return entries.get(key);
		},
		touch(key, value) {
			entries.delete(key);
			entries.set(key, value);
			pruneMapToMaxSize(entries, maxTrackedKeys);
		},
		size: () => entries.size,
		clear() {
			entries.clear();
			lastPruneMs = 0;
		}
	};
}
/** Create a simple fixed-window rate limiter for in-memory webhook protection. */
function createFixedWindowRateLimiter(options) {
	const windowMs = resolveIntegerOption(options.windowMs, WEBHOOK_RATE_LIMIT_DEFAULTS.windowMs, { min: 1 });
	const maxRequests = resolveIntegerOption(options.maxRequests, WEBHOOK_RATE_LIMIT_DEFAULTS.maxRequests, { min: 1 });
	const state = createBoundedTimedMap(resolveIntegerOption(options.maxTrackedKeys, WEBHOOK_RATE_LIMIT_DEFAULTS.maxTrackedKeys, { min: 1 }), resolveIntegerOption(options.pruneIntervalMs, windowMs, { min: 1 }), (entry, nowMs) => nowMs - entry.windowStartMs >= windowMs);
	return {
		isRateLimited: (key, nowMs = Date.now()) => {
			if (!key) return false;
			const existing = state.get(key, nowMs);
			if (!existing || nowMs - existing.windowStartMs >= windowMs) {
				state.touch(key, {
					count: 1,
					windowStartMs: nowMs
				});
				return false;
			}
			const nextCount = existing.count + 1;
			state.touch(key, {
				count: nextCount,
				windowStartMs: existing.windowStartMs
			});
			return nextCount > maxRequests;
		},
		size: state.size,
		clear: () => state.clear()
	};
}
/** Count keyed events in memory with optional TTL pruning and bounded cardinality. */
function createBoundedCounter(options) {
	const maxTrackedKeys = resolveIntegerOption(options.maxTrackedKeys, WEBHOOK_ANOMALY_COUNTER_DEFAULTS.maxTrackedKeys, { min: 1 });
	const ttlMs = resolveIntegerOption(options.ttlMs, 0, { min: 0 });
	const pruneIntervalMs = resolveIntegerOption(options.pruneIntervalMs, ttlMs > 0 ? ttlMs : 6e4, { min: 1 });
	const isExpired = (entry, nowMs) => ttlMs > 0 && nowMs - entry.updatedAtMs >= ttlMs;
	const counters = createBoundedTimedMap(maxTrackedKeys, pruneIntervalMs, ttlMs > 0 ? isExpired : void 0);
	return {
		increment: (key, nowMs = Date.now()) => {
			if (!key) return 0;
			const existing = counters.get(key, nowMs);
			const nextCount = (existing && !isExpired(existing, nowMs) ? existing.count : 0) + 1;
			counters.touch(key, {
				count: nextCount,
				updatedAtMs: nowMs
			});
			return nextCount;
		},
		size: counters.size,
		clear: () => counters.clear()
	};
}
/** Track repeated webhook failures and emit sampled logs for suspicious request patterns. */
function createWebhookAnomalyTracker(options) {
	const maxTrackedKeys = resolveIntegerOption(options?.maxTrackedKeys, WEBHOOK_ANOMALY_COUNTER_DEFAULTS.maxTrackedKeys, { min: 1 });
	const ttlMs = resolveIntegerOption(options?.ttlMs, WEBHOOK_ANOMALY_COUNTER_DEFAULTS.ttlMs, { min: 0 });
	const logEvery = resolveIntegerOption(options?.logEvery, WEBHOOK_ANOMALY_COUNTER_DEFAULTS.logEvery, { min: 1 });
	const trackedStatusCodes = new Set(options?.trackedStatusCodes ?? WEBHOOK_ANOMALY_STATUS_CODES);
	const counter = createBoundedCounter({
		maxTrackedKeys,
		ttlMs
	});
	return {
		record: ({ key, statusCode, message, log, nowMs }) => {
			if (!key || !trackedStatusCodes.has(statusCode)) return 0;
			const next = counter.increment(key, nowMs);
			if (log && (next === 1 || next % logEvery === 0)) log(message(next));
			return next;
		},
		size: counter.size,
		clear: counter.clear
	};
}
//#endregion
//#region src/plugin-sdk/webhook-ingress.ts
/**
* Public SDK subpath for webhook ingress guards, targets, and request helpers.
*/
var webhook_ingress_exports = /* @__PURE__ */ __exportAll({
	DEFAULT_WEBHOOK_MAX_BODY_BYTES: () => DEFAULT_WEBHOOK_MAX_BODY_BYTES,
	WEBHOOK_ANOMALY_COUNTER_DEFAULTS: () => WEBHOOK_ANOMALY_COUNTER_DEFAULTS,
	WEBHOOK_ANOMALY_STATUS_CODES: () => WEBHOOK_ANOMALY_STATUS_CODES,
	WEBHOOK_BODY_READ_DEFAULTS: () => WEBHOOK_BODY_READ_DEFAULTS,
	WEBHOOK_IN_FLIGHT_DEFAULTS: () => WEBHOOK_IN_FLIGHT_DEFAULTS,
	WEBHOOK_RATE_LIMIT_DEFAULTS: () => WEBHOOK_RATE_LIMIT_DEFAULTS,
	applyBasicWebhookRequestGuards: () => applyBasicWebhookRequestGuards,
	beginWebhookRequestPipelineOrReject: () => beginWebhookRequestPipelineOrReject,
	canonicalizeWebhookRouteKey: () => canonicalizeWebhookRouteKey,
	createAuthRateLimiter: () => createAuthRateLimiter,
	createBoundedCounter: () => createBoundedCounter,
	createFixedWindowRateLimiter: () => createFixedWindowRateLimiter,
	createWebhookAnomalyTracker: () => createWebhookAnomalyTracker,
	createWebhookInFlightLimiter: () => createWebhookInFlightLimiter,
	getWebhookLegacyListener: () => getWebhookLegacyListener,
	isJsonContentType: () => isJsonContentType,
	isRequestBodyLimitError: () => isRequestBodyLimitError,
	normalizePluginHttpPath: () => normalizePluginHttpPath,
	normalizeWebhookPath: () => normalizeWebhookPath,
	rawDataToString: () => rawDataToString,
	readJsonWebhookBodyOrReject: () => readJsonWebhookBodyOrReject,
	readRequestBodyWithLimit: () => readRequestBodyWithLimit,
	readWebhookBodyOrReject: () => readWebhookBodyOrReject,
	registerPluginHttpRoute: () => registerPluginHttpRoute,
	registerWebhookTarget: () => registerWebhookTarget,
	registerWebhookTargetWithPluginRoute: () => registerWebhookTargetWithPluginRoute,
	requestBodyErrorToText: () => requestBodyErrorToText,
	resolveRequestClientIp: () => resolveRequestClientIp,
	resolveSingleWebhookTarget: () => resolveSingleWebhookTarget,
	resolveSingleWebhookTargetAsync: () => resolveSingleWebhookTargetAsync,
	resolveWebhookPath: () => resolveWebhookPath,
	resolveWebhookTargetWithAuthOrReject: () => resolveWebhookTargetWithAuthOrReject,
	resolveWebhookTargetWithAuthOrRejectSync: () => resolveWebhookTargetWithAuthOrRejectSync,
	resolveWebhookTargets: () => resolveWebhookTargets,
	withResolvedWebhookRequestPipeline: () => withResolvedWebhookRequestPipeline
});
function resolveRequestClientIp(req, trustedProxies, allowRealIpFallback = false) {
	return (!req || !getWebhookLegacyListener(req) ? getPluginRuntimeGatewayRequestScope()?.client?.clientIp : void 0) ?? resolveRequestClientIpFromHeaders(req, trustedProxies, allowRealIpFallback);
}
function createAuthRateLimiter(config) {
	const host = getBoundLegacyPluginSdkResourceHost();
	if (host) return createGatewayAuthRateLimiter(config, {
		scheduler: host.scheduler,
		id: `auth/sdk:${randomUUID()}`
	});
	const scheduler = new GatewayScheduler();
	const limiter = createGatewayAuthRateLimiter(config, {
		scheduler,
		id: "auth:standalone"
	});
	const dispose = limiter.dispose.bind(limiter);
	limiter.dispose = () => {
		dispose();
		scheduler.stop();
	};
	return limiter;
}
//#endregion
export { WEBHOOK_ANOMALY_STATUS_CODES as a, createFixedWindowRateLimiter as c, WEBHOOK_ANOMALY_COUNTER_DEFAULTS as i, createWebhookAnomalyTracker as l, resolveRequestClientIp as n, WEBHOOK_RATE_LIMIT_DEFAULTS as o, webhook_ingress_exports as r, createBoundedCounter as s, createAuthRateLimiter as t };
