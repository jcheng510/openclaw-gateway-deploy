import { c as normalizeOptionalLowercaseString, g as readStringValue, l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import { m as clampTimerTimeoutMs } from "./number-coercion-Dq1l5muL.mjs";
import { r as asNullableRecord } from "./record-coerce-TIsquoVR.mjs";
import { d as normalizeStringEntries } from "./string-normalization-YMwDjufr.mjs";
import { r as truncateUtf16Safe } from "./utf16-slice-D_ngcYKd.mjs";
import { n as isTruthyEnvValue } from "./env-SuLFUnAK.mjs";
import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { t as createSubsystemLogger } from "./subsystem-CeqVSEVi.mjs";
import { Et as _enum, Fn as object, Jn as string, Lt as boolean, Nt as array, qn as strictObject } from "./schemas-BOYIvvln.mjs";
import { r as getRuntimeConfig } from "./io.runtime-BOdk1dW9.mjs";
import { t as ErrorCodes } from "./gateway-error-details-DIefe7Zy.mjs";
import { f as errorShape } from "./error-codes-DI20vDEB.mjs";
import { n as detectMime } from "./mime-CGDYrRzL.mjs";
import { t as DEFAULT_MAX_LIVE_TOOL_RESULT_CHARS } from "./tool-result-limits-B-fhY8wF.mjs";
import { a as wrapExternalContent, i as truncateSanitizedExternalContent } from "./external-content-CmQTCbqd.mjs";
import "./string-coerce-runtime-B1b8UNzb.mjs";
import "./text-utility-runtime-nihF2OJq.mjs";
import { f as saveMediaBuffer } from "./store-DK7gqgrW.mjs";
import { t as jsonResult } from "./tool-results-BCM3fdVS.mjs";
import { d as readPositiveIntegerParam, h as readToolStringParam, i as imageResultFromFile, l as readNonNegativeIntegerParam } from "./common-CnSoEQyp.mjs";
import { r as readGatewayToolOperatorScopes, t as callGatewayTool } from "./gateway-CnezJTJC.mjs";
import "./runtime-env-Bh9hwd9E.mjs";
import "./number-runtime-DyNDaYIV.mjs";
import { o as hasGatewayToolRoutingContext } from "./in-process-gateway-D3MPtHXl.mjs";
import { l as resolveNodeCommandAllowlist, o as isNodeCommandAllowed } from "./node-command-policy-B8V85z2C.mjs";
import { a as resolveNodeIdFromList, n as listNodes } from "./nodes-utils-4kbftX2Z.mjs";
import "./runtime-config-snapshot-DPPwvFCZ.mjs";
import "./media-mime-DLFR6fqC.mjs";
import { t as startLazyPluginServiceModule } from "./plugin-runtime-C9riwXn8.mjs";
import "./security-runtime-DxwQ9WKi.mjs";
import { r as parseGatewayPayload, t as respondUnavailableOnNodeInvokeError } from "./nodes.helpers-D-xrp4Rq.mjs";
import "./gateway-runtime-Bj4ovX3U.mjs";
import "./agent-harness-runtime-CnrNnAqy.mjs";
import { n as redactCdpUrl } from "./browser-cdp-DmzPHY2E.mjs";
import { a as createDeferred } from "./extension-shared-BW58_FN4.mjs";
import { t as describeImageFile } from "./runtime-DtkqaNoZ.mjs";
import "./param-readers-CdkHMQwf.mjs";
import { $ as getOptionalBrowserStateRuntime } from "./session-tab-store-BxAwbW3e.mjs";
import { n as BROWSER_PROXY_UPLOAD_COMMAND, r as browserProxyUploadUnavailableMessage, t as BROWSER_PROXY_COMMAND } from "./browser-node-commands-CIbUPKdY.mjs";
import { n as applyBrowserTabToolBinding, t as createBrowserToolDefinition } from "./browser-tool-description-BtJwFF-H.mjs";
import { i as DEFAULT_BROWSER_ACTION_TIMEOUT_MS, r as DEFAULT_AI_SNAPSHOT_MAX_CHARS } from "./constants-C-i9f6FL.mjs";
import { o as EXISTING_SESSION_TIMEOUT_OVERRIDE_KINDS } from "./act-policy-tIEm1pjf.mjs";
import { i as resolveBrowserConfig, s as resolveProfile } from "./config-uYvCVfSN.mjs";
import { t as getBrowserProfileCapabilities } from "./profile-capabilities-BY7hNKee.mjs";
import { n as resolveCdpControlPolicy } from "./cdp-reachability-policy-DM3fLDJ4.mjs";
import { r as closeTrackedCdpTarget } from "./cdp.helpers-BQx3QNZm.mjs";
import { I as parseBrowserNavigationUrl, T as findRoleSnapshotLineRef, w as finalizeRoleSnapshot } from "./chrome-C0Et9iLi.mjs";
import { i as resolveExistingUploadPaths } from "./paths-CLBj5mEu.mjs";
import { a as loadBrowserConfigForRuntimeRefresh } from "./server-context-Dk3uRG3w.mjs";
import { a as normalizeBrowserRequestPath, i as isPersistentBrowserProfileMutation, o as resolveRequestedBrowserProfile, r as isBrowserHostLocalRoute } from "./routes-BDgX_KfK.mjs";
import { r as normalizeBrowserScreenshot } from "./screenshot-BBC7j-SI.mjs";
import { t as parseSystemProfileDomains } from "./system-profile-domains-Dhc1TERW.mjs";
import { t as createBrowserRouteDispatcher } from "./dispatcher-mafzpFBt.mjs";
import { a as touchSessionBrowserTab, o as trackSessionBrowserTab, s as untrackSessionBrowserTab } from "./session-tab-registry-B2vOnChv.mjs";
import { a as stopBrowserDashboard, i as requestBrowserDashboard, n as inspectBrowserDashboard, t as assertBrowserDashboardTargetCurrent } from "./browser-dashboard-jhPrbzff.mjs";
import { C as withBrowserRequestScope, _ as browserTabs, a as browserDoctor, c as browserOpenTab, d as browserSnapshot, f as browserStart, h as browserSystemProfiles, l as browserProfiles, m as browserStop, o as browserFocusTab, p as browserStatus, s as browserImportProfile, t as browserCloseTab } from "./client-DCwwnlWV.mjs";
import { _ as browserScreenshotAction, a as persistBrowserProxyResultFiles, c as browserArmFileChooser, d as browserEmulateSetting, f as browserErrors, g as browserRequests, h as browserPdfSave, i as stageBrowserScreenshotForSharing, l as browserConsoleMessages, m as browserPageText, n as createBrowserNodeSessionTabRoute, o as browserAct, p as browserNavigate, r as resolveRuntimeImageSanitization, s as browserArmDialog, t as createBrowserNodeProxyRequest, u as browserDownload, v as browserWaitForDownload, y as isBrowserControlHostUnavailableError } from "./browser-node-proxy-Bpgn13E-.mjs";
import { a as prepareBrowserProxyUploadRequest, d as assertBrowserProxyFileCountWithinLimit, f as createBrowserProxyFailure, h as visitBrowserProxyFilePaths, i as isBrowserProxyUploadRequest, m as parseBrowserProxyRoute, n as ensureBrowserProxyUploadCleanup, o as stageBrowserProxyUploadRequest, p as parseBrowserProxyFailure, r as hasBrowserProxyUploadWork, s as BROWSER_PROXY_ERROR_ENVELOPE, t as discardStagedBrowserProxyUpload, u as assertBrowserProxyFileBytesWithinLimits } from "./browser-proxy-upload-BHGah0Y5.mjs";
import { n as resolveBrowserProxyTimeouts, t as resolveBrowserProxyTimeoutMs } from "./browser-proxy-timeouts-BkSGd7p-.mjs";
import { i as hasBrowserControlWork, r as getBrowserControlState, t as createBrowserControlContext } from "./browser-control-state-CeOhBv2V.mjs";
import { t as describeBrowserControlUnavailable } from "./plugin-enabled-B4dnU8iH.mjs";
import { t as startBrowserControlServiceFromConfig } from "./control-service-DbBxtjAV.mjs";
import fs, { readFile } from "node:fs/promises";
import { toUSVString } from "node:util";
import crypto from "node:crypto";
//#region extensions/browser/src/browser-tool-session-tabs.ts
function readOpenedTab(result) {
	const opened = asNullableRecord(result);
	if (!opened) return { aliases: [] };
	const targetId = normalizeOptionalString(opened.targetId);
	const aliases = [
		targetId,
		normalizeOptionalString(opened.tabId),
		normalizeOptionalString(opened.label),
		normalizeOptionalString(opened.suggestedTargetId)
	].filter((alias) => Boolean(alias));
	const profile = normalizeOptionalString(opened.resolvedProfile);
	const rawOwnership = opened.ownership && typeof opened.ownership === "object" ? opened.ownership : void 0;
	const ownership = rawOwnership?.status === "durable" && !profile ? void 0 : rawOwnership;
	return {
		targetId,
		aliases: [...new Set(aliases)],
		profile,
		ownership
	};
}
function stripBrowserOpenInternalMetadata(value) {
	const record = asNullableRecord(value);
	if (!record) return value;
	const { ownership: _ownership, resolvedProfile: _resolvedProfile, ...agentVisible } = record;
	return agentVisible;
}
async function trackOpenedBrowserTab(params) {
	const opened = readOpenedTab(params.result);
	const profile = opened.profile ?? params.fallbackProfile;
	try {
		await params.track({
			sessionKey: params.sessionKey,
			targetId: opened.targetId,
			route: params.route,
			profile,
			...params.fallbackProfile && opened.profile && opened.profile !== params.fallbackProfile ? { profileAliases: [params.fallbackProfile] } : {},
			ownership: params.route.kind === "browser-control" && params.route.baseUrl ? void 0 : opened.ownership,
			aliases: opened.aliases,
			...params.authority ? { authority: params.authority } : {}
		});
	} catch (trackingError) {
		if (!opened.targetId) throw trackingError;
		try {
			await params.closeTab(opened.targetId, profile);
		} catch (closeError) {
			throw Object.assign(new Error("Failed to register browser tab cleanup and close the newly opened tab", { cause: closeError }), {
				name: "BrowserTabTrackingCompensationError",
				errors: [trackingError, closeError]
			});
		}
		throw trackingError;
	}
}
function createBrowserToolSessionTabs(params) {
	const trackedRoute = () => params.nodeRoute && !params.isHostFallbackActive?.() ? params.nodeRoute : {
		kind: "browser-control",
		...params.baseUrl ? { baseUrl: params.baseUrl } : {}
	};
	const trackedProfile = (route) => route.kind === "node-proxy" ? params.routeProfile?.() ?? params.requestedProfile : route.baseUrl && !params.requestedProfile ? void 0 : params.requestedProfile ?? params.defaultProfile;
	const identity = (targetId) => {
		const route = trackedRoute();
		return {
			sessionKey: params.sessionKey,
			targetId,
			route,
			profile: trackedProfile(route),
			...params.authority ? { authority: params.authority } : {}
		};
	};
	return {
		touch: async (targetId) => {
			if (targetId) await params.registry.touchSessionBrowserTab(identity(targetId));
		},
		untrack: async (targetId) => {
			if (targetId) await params.registry.untrackSessionBrowserTab(identity(targetId));
		},
		trackOpened: async (result, closeTab) => {
			const route = trackedRoute();
			const profile = trackedProfile(route);
			await trackOpenedBrowserTab({
				result,
				sessionKey: params.sessionKey,
				fallbackProfile: profile,
				route,
				track: params.registry.trackSessionBrowserTab,
				authority: params.authority,
				closeTab
			});
		}
	};
}
//#endregion
//#region extensions/browser/src/browser/vision.ts
/**
* Browser screenshot description helpers built on the shared media image
* understanding contract. No browser-specific model registry lives here.
*/
/** Default prompt for turning browser screenshots into text-only page context. */
const DEFAULT_BROWSER_SCREENSHOT_DESCRIPTION_PROMPT = "Describe what is visible in this browser screenshot. Capture page layout, headings, primary content blocks, visible text, and notable interactive elements so a text-only assistant can reason about the page.";
function normalizeActiveModel(activeModel) {
	const provider = activeModel?.provider?.trim();
	if (!provider) return;
	const model = activeModel?.model?.trim();
	return model ? {
		provider,
		model
	} : { provider };
}
async function resolveImageUnderstandingFilePath(ctx, deps) {
	const maxDimensionPx = ctx.imageSanitization?.maxDimensionPx;
	if (typeof maxDimensionPx !== "number" || !Number.isFinite(maxDimensionPx)) return ctx.filePath;
	const source = await readFile(ctx.filePath);
	const normalized = await deps.normalizeBrowserScreenshot(source, { maxSide: Math.max(1, Math.floor(maxDimensionPx)) });
	if (normalized.buffer === source) return ctx.filePath;
	return (await deps.saveMediaBuffer(normalized.buffer, normalized.contentType ?? "image/jpeg", "browser")).path;
}
/** Produces a text description for a browser screenshot, or null when no text was produced. */
async function describeBrowserScreenshot(ctx, deps) {
	const filePath = await resolveImageUnderstandingFilePath(ctx, deps);
	const agentId = ctx.agentDir ? void 0 : (await import("./plugin-sdk/agent-scope-runtime.js")).resolveSessionAgentIdStrict({
		agentId: ctx.agentId,
		sessionKey: ctx.mediaScope?.sessionKey,
		config: ctx.cfg
	});
	const described = await deps.describeImageFile({
		filePath,
		cfg: ctx.cfg,
		prompt: DEFAULT_BROWSER_SCREENSHOT_DESCRIPTION_PROMPT,
		...agentId ? { agentId } : {},
		agentDir: ctx.agentDir,
		workspaceDir: ctx.workspaceDir,
		activeModel: normalizeActiveModel(ctx.activeModel),
		scopeContext: ctx.mediaScope
	});
	const text = described.text?.trim();
	if (!text) return null;
	return {
		text,
		provider: described.provider,
		model: described.model,
		decision: described.decision
	};
}
/** Neutralizes model-generated MEDIA directives before feeding text back to tools. */
function neutralizeMediaDirectives(text) {
	if (!text || !/media:/i.test(text)) return text;
	return text.replace(/(^|\n)([^\S\n]*)(MEDIA:)/gi, "$1$2[neutralized] $3");
}
//#endregion
//#region extensions/browser/src/browser-tool.snapshot.ts
const BROWSER_EXTERNAL_JSON_TRUNCATION_MARKERS = {
	snapshot: "\n[truncated — retry with a smaller maxChars or limit]",
	console: "\n[truncated — retry with a stricter level or targetId]",
	requests: "\n[truncated — retry with a narrower filter or smaller limit]",
	errors: "\n[truncated — retry with a smaller limit]",
	tabs: "\n[truncated — retry with action=snapshot and a specific targetId]",
	act: "\n[truncated — inspect the affected targetId with action=snapshot]",
	download: "\n[truncated — retry with a specific targetId and download ref]"
};
function truncateBrowserToolText(value, marker, maxChars) {
	const bounded = truncateSanitizedExternalContent(value, maxChars);
	if (!bounded.truncated) return bounded;
	if (marker.length > maxChars) return bounded;
	return {
		text: `${truncateSanitizedExternalContent(value, Math.max(0, maxChars - marker.length)).text}${marker}`,
		truncated: true
	};
}
/** Bound and wrap browser-originated text before it reaches the model. */
function wrapBrowserExternalText(params) {
	const wrap = (value) => wrapExternalContent(value, {
		source: "browser",
		includeWarning: params.includeWarning
	});
	const prefix = params.prefix ? `${params.prefix}\n` : "";
	const wrapperOverhead = prefix.length + wrap("").length;
	let maxInnerChars = Math.max(0, Math.min(params.maxChars ?? Infinity, DEFAULT_MAX_LIVE_TOOL_RESULT_CHARS - wrapperOverhead));
	const value = neutralizeMediaDirectives(params.value);
	let bounded = truncateBrowserToolText(value, params.marker, maxInnerChars);
	let wrappedText = prefix + wrap(bounded.text);
	if (wrappedText.length > 16e3) {
		maxInnerChars = Math.max(0, maxInnerChars - (wrappedText.length - DEFAULT_MAX_LIVE_TOOL_RESULT_CHARS));
		bounded = truncateBrowserToolText(value, params.marker, maxInnerChars);
		wrappedText = prefix + wrap(bounded.text);
	}
	return {
		text: wrappedText,
		boundedText: bounded.text,
		truncated: bounded.truncated
	};
}
/** Wrap page-controlled JSON payloads as untrusted browser content. */
function wrapBrowserExternalJson(params) {
	const wrapped = wrapBrowserExternalText({
		value: JSON.stringify(params.payload, (_key, value) => typeof value === "string" ? neutralizeMediaDirectives(value) : value, 2) ?? "null",
		marker: BROWSER_EXTERNAL_JSON_TRUNCATION_MARKERS[params.kind],
		includeWarning: params.includeWarning ?? true
	});
	return {
		wrappedText: wrapped.text,
		truncated: wrapped.truncated,
		safeDetails: {
			ok: true,
			externalContent: {
				untrusted: true,
				source: "browser",
				kind: params.kind,
				wrapped: true
			}
		}
	};
}
/** Keep debug log counts aligned with complete records inside the output budget. */
function formatBrowserDebugLogResult(kind, result, entries, limit) {
	const total = entries.length;
	let records = entries.slice(-limit);
	const details = () => ({
		ok: result.ok,
		targetId: result.targetId,
		url: result.url,
		total,
		returned: records.length,
		truncated: records.length < total
	});
	const wrap = () => wrapBrowserExternalJson({
		kind,
		payload: {
			...details(),
			[kind]: records
		},
		includeWarning: false
	});
	let wrapped = wrap();
	if (wrapped.truncated && records.length > 0) {
		const initialRecords = records;
		let lower = 1;
		let upper = initialRecords.length;
		while (lower < upper) {
			const middle = Math.floor((lower + upper) / 2);
			records = initialRecords.slice(middle);
			wrapped = wrap();
			if (wrapped.truncated) lower = middle + 1;
			else upper = middle;
		}
		if (records.length !== initialRecords.length - lower) {
			records = initialRecords.slice(lower);
			wrapped = wrap();
		}
	}
	return {
		content: [{
			type: "text",
			text: wrapped.wrappedText
		}],
		details: {
			...wrapped.safeDetails,
			...details(),
			truncated: records.length < total || wrapped.truncated
		}
	};
}
function isAriaRefsUnsupportedError(err) {
	const msg = String(err).toLowerCase();
	return msg.includes("refs=aria") && msg.includes("not support");
}
/** Execute and format browser snapshots for agent consumption. */
async function executeSnapshotAction(params) {
	const { input, baseUrl, profile, proxyRequest } = params;
	const snapshotDefaults = getRuntimeConfig().browser?.snapshotDefaults;
	const format = input.snapshotFormat === "ai" ? "ai" : input.snapshotFormat === "aria" ? "aria" : void 0;
	const formatExplicit = format !== void 0;
	const mode = input.mode === "efficient" || !formatExplicit && snapshotDefaults?.mode === "efficient" ? "efficient" : void 0;
	const labels = typeof input.labels === "boolean" ? input.labels : void 0;
	const urls = typeof input.urls === "boolean" ? input.urls : void 0;
	const refs = input.refs === "aria" || input.refs === "role" ? input.refs : void 0;
	const hasMaxChars = Object.hasOwn(input, "maxChars");
	const targetId = normalizeOptionalString(input.targetId);
	const limit = readPositiveIntegerParam(input, "limit", { message: "limit must be a positive integer." });
	const maxCharsRaw = readNonNegativeIntegerParam(input, "maxChars", { message: "maxChars must be a non-negative integer." });
	const maxChars = maxCharsRaw !== void 0 && maxCharsRaw > 0 ? maxCharsRaw : void 0;
	const interactive = typeof input.interactive === "boolean" ? input.interactive : void 0;
	const compact = typeof input.compact === "boolean" ? input.compact : void 0;
	const depth = readNonNegativeIntegerParam(input, "depth", { message: "depth must be a non-negative integer." });
	const selector = normalizeOptionalString(input.selector);
	const frame = normalizeOptionalString(input.frame);
	const resolvedMaxChars = hasMaxChars ? maxChars : format === "ai" && mode !== "efficient" ? DEFAULT_AI_SNAPSHOT_MAX_CHARS : void 0;
	const snapshotTimeoutMs = readPositiveIntegerParam(input, "timeoutMs", { message: "timeoutMs must be a positive integer." }) ?? 2e4;
	const snapshotQuery = {
		...format ? { format } : {},
		targetId,
		limit,
		...typeof resolvedMaxChars === "number" ? { maxChars: resolvedMaxChars } : {},
		refs,
		interactive,
		compact,
		depth,
		selector,
		frame,
		labels,
		urls,
		mode,
		timeoutMs: snapshotTimeoutMs
	};
	let refsFallback;
	const readSnapshot = async (query) => await browserSnapshot(proxyRequest ?? baseUrl, {
		...query,
		profile,
		signal: params.signal
	});
	let snapshot;
	try {
		snapshot = await readSnapshot(snapshotQuery);
	} catch (err) {
		if (refs !== "aria" || !isAriaRefsUnsupportedError(err)) throw err;
		refsFallback = "role";
		snapshot = await readSnapshot({
			...snapshotQuery,
			refs: "role"
		});
	}
	await params.onTabActivity?.(readStringValue(snapshot.targetId) ?? targetId);
	const identity = {
		format: snapshot.format,
		targetId: snapshot.targetId,
		url: snapshot.url
	};
	const dialogState = {
		...snapshot.blockedByDialog ? { blockedByDialog: true } : {},
		...snapshot.browserState !== void 0 ? { browserState: snapshot.browserState } : {}
	};
	const aiMetadata = snapshot.format === "ai" ? {
		labels: snapshot.labels,
		labelsCount: snapshot.labelsCount,
		labelsSkipped: snapshot.labelsSkipped,
		annotations: snapshot.annotations,
		imagePath: snapshot.imagePath,
		imageType: snapshot.imageType,
		refsFallback
	} : {};
	const externalContent = {
		untrusted: true,
		source: "browser",
		kind: "snapshot",
		format: snapshot.format,
		wrapped: true
	};
	const finishSnapshot = async (text, details) => {
		if (labels && snapshot.format === "ai" && snapshot.imagePath) return await imageResultFromFile({
			label: "browser:snapshot",
			path: snapshot.imagePath,
			extraText: text,
			details: {
				...details,
				media: { outbound: false }
			},
			imageSanitization: resolveRuntimeImageSanitization()
		});
		return {
			content: [{
				type: "text",
				text
			}],
			details
		};
	};
	const query = normalizeOptionalString(input.query);
	if (query && !snapshot.blockedByDialog) {
		const tokens = query.toLowerCase().split(/\s+/);
		const matches = (snapshot.format === "ai" ? snapshot.snapshot : snapshot.nodes.map((node) => `- ${node.role} ${JSON.stringify(node.name)} [ref=${node.ref}]${node.value ? ` value=${JSON.stringify(node.value)}` : ""}${node.description ? ` description=${JSON.stringify(node.description)}` : ""}`).join("\n")).split("\n").filter((line) => {
			const lower = line.toLowerCase();
			return tokens.every((token) => lower.includes(token));
		});
		const matchedText = matches.join("\n");
		const matchCount = matches.length;
		const summary = matchCount ? `${matchCount} matching line(s) in the returned snapshot${snapshot.truncated ? " (source truncated)" : ""}.` : "No matching lines in the returned snapshot. Refine the query or take a broader snapshot.";
		const wrapped = wrapBrowserExternalText({
			value: matchedText,
			marker: BROWSER_EXTERNAL_JSON_TRUNCATION_MARKERS.snapshot,
			maxChars: maxChars ?? 4e4,
			includeWarning: true,
			prefix: summary
		});
		const snapshotRefs = snapshot.format === "ai" ? snapshot.refs ?? {} : Object.fromEntries(snapshot.nodes.map((node) => [node.ref, {
			role: node.role,
			name: node.name
		}]));
		const filtered = finalizeRoleSnapshot({
			snapshot: wrapped.boundedText,
			refs: snapshotRefs
		});
		const newElements = filtered.snapshot.split("\n").filter((line) => line.endsWith(" [new]") && findRoleSnapshotLineRef(line)).length;
		return await finishSnapshot(wrapped.text, {
			ok: snapshot.ok,
			...identity,
			matchCount,
			stats: filtered.stats,
			refs: filtered.stats.refs,
			...snapshot.format === "ai" && snapshot.newElements !== void 0 ? { newElements } : {},
			truncated: snapshot.truncated || wrapped.truncated || void 0,
			...dialogState,
			...aiMetadata,
			externalContent
		});
	}
	if (snapshot.format === "ai") {
		if (snapshot.blockedByDialog) {
			const wrapped = wrapBrowserExternalJson({
				kind: "snapshot",
				payload: {
					...identity,
					...dialogState
				}
			});
			return {
				content: [{
					type: "text",
					text: wrapped.wrappedText
				}],
				details: {
					...wrapped.safeDetails,
					...identity,
					...dialogState
				}
			};
		}
		const boundedSnapshot = wrapBrowserExternalText({
			value: snapshot.snapshot ?? "",
			marker: BROWSER_EXTERNAL_JSON_TRUNCATION_MARKERS.snapshot,
			includeWarning: true
		});
		return await finishSnapshot(boundedSnapshot.text, {
			ok: true,
			...identity,
			truncated: snapshot.truncated || boundedSnapshot.truncated ? true : void 0,
			newElements: snapshot.newElements,
			stats: snapshot.stats,
			refs: snapshot.refs ? Object.keys(snapshot.refs).length : void 0,
			...aiMetadata,
			...dialogState,
			externalContent
		});
	}
	{
		const wrapped = wrapBrowserExternalJson({
			kind: "snapshot",
			payload: snapshot
		});
		return {
			content: [{
				type: "text",
				text: wrapped.wrappedText
			}],
			details: {
				...wrapped.safeDetails,
				...identity,
				nodeCount: snapshot.nodes.length,
				...dialogState,
				externalContent
			}
		};
	}
}
function withPageStateUnavailableHint(result, reason) {
	return {
		...result,
		content: [...result.content, {
			type: "text",
			text: `[page snapshot unavailable: ${reason}. Use action=snapshot to read the page.]`
		}]
	};
}
/**
* Attach fresh page state to the result of an action that changed the page
* document (navigate, act that navigated). The model can act on the new page
* without a follow-up snapshot call. The inline state uses the efficient
* interactive tier so the unsolicited payload stays bounded on every profile
* (mode=efficient forces the capped ai format even where the profile default
* would be an uncapped aria tree); a full snapshot stays one explicit call away.
*/
async function appendNavigatedPageState(params) {
	let snapshot;
	try {
		snapshot = await executeSnapshotAction({
			input: {
				targetId: params.targetId,
				mode: "efficient"
			},
			baseUrl: params.baseUrl,
			profile: params.profile,
			proxyRequest: params.proxyRequest,
			signal: params.signal
		});
	} catch (err) {
		params.signal?.throwIfAborted();
		if (err instanceof Error && err.name === "AbortError") throw err;
		return withPageStateUnavailableHint(params.result, wrapExternalContent(neutralizeMediaDirectives(formatErrorMessage(err)), {
			source: "browser",
			includeWarning: false
		}));
	}
	const baseDetails = params.result.details && typeof params.result.details === "object" ? params.result.details : {};
	return {
		content: [...params.result.content, ...snapshot.content],
		details: {
			...baseDetails,
			pageState: snapshot.details
		}
	};
}
//#endregion
//#region extensions/browser/src/browser-tool.actions.ts
function normalizePositiveTimeoutMs(value) {
	return readPositiveIntegerParam({ value }, "value", { message: "timeoutMs must be a positive integer." });
}
function normalizeNonNegativeDurationMs(value) {
	return readNonNegativeIntegerParam({ value }, "value", { message: "timeMs must be a non-negative integer." });
}
function withLocalActTimeout(request, usesChromeMcp) {
	if (normalizePositiveTimeoutMs("timeoutMs" in request ? request.timeoutMs : void 0) !== void 0 || usesChromeMcp && !EXISTING_SESSION_TIMEOUT_OVERRIDE_KINDS.has(request.kind)) return request;
	switch (request.kind) {
		case "click":
		case "type":
		case "hover":
		case "scrollIntoView":
		case "drag":
		case "select":
		case "fill":
		case "evaluate":
		case "wait": return {
			...request,
			timeoutMs: DEFAULT_BROWSER_ACTION_TIMEOUT_MS
		};
		default: return request;
	}
}
function formatAgentTab(tab) {
	if (!tab || typeof tab !== "object") return { value: tab };
	const source = tab;
	const targetId = readStringValue(source.targetId);
	const tabId = readStringValue(source.tabId);
	const webExtensionTabId = typeof source.webExtensionTabId === "number" && Number.isSafeInteger(source.webExtensionTabId) && source.webExtensionTabId >= 0 ? source.webExtensionTabId : void 0;
	const label = readStringValue(source.label);
	const suggestedTargetId = readStringValue(source.suggestedTargetId) ?? label ?? tabId ?? targetId;
	return {
		...suggestedTargetId ? { suggestedTargetId } : {},
		...tabId ? { tabId } : {},
		...webExtensionTabId !== void 0 ? { webExtensionTabId } : {},
		...label ? { label } : {},
		title: source.title,
		url: source.url,
		...source.urlUnavailableReason === "navigation_blocked" || source.urlUnavailableReason === "navigation_check_failed" ? { urlUnavailableReason: source.urlUnavailableReason } : {},
		type: source.type,
		...targetId ? { targetId } : {},
		...source.wsUrl ? { wsUrl: source.wsUrl } : {}
	};
}
function formatTabsToolResult(result) {
	const formattedTabs = result.tabs.map(formatAgentTab);
	const wrapped = wrapBrowserExternalJson({
		kind: "tabs",
		payload: {
			running: result.running,
			tabs: formattedTabs
		},
		includeWarning: false
	});
	return {
		content: [{
			type: "text",
			text: wrapped.wrappedText
		}],
		details: {
			...wrapped.safeDetails,
			running: result.running,
			tabCount: formattedTabs.length,
			tabs: formattedTabs
		}
	};
}
/** Protect page-controlled model text while preserving the shipped structured result contract. */
function formatBrowserExternalToolResult(params) {
	return {
		content: [{
			type: "text",
			text: wrapBrowserExternalJson({
				kind: params.kind,
				payload: params.payload,
				includeWarning: false
			}).wrappedText
		}],
		details: params.payload
	};
}
function isChromeStaleTargetError(usesChromeMcp, err) {
	const status = err && typeof err === "object" && "status" in err ? err.status : null;
	const msg = String(err);
	const isTabNotFound = (status === 404 || msg.includes("404:")) && msg.includes("tab not found");
	return usesChromeMcp && isTabNotFound;
}
function canRetryChromeActAfterSoleTargetRefresh(request) {
	if (request.kind !== "wait" || normalizeNonNegativeDurationMs(request.timeMs) === void 0) return false;
	return [
		request.fn,
		request.text,
		request.textGone,
		request.selector,
		request.url,
		request.loadState
	].every((value) => !normalizeOptionalString(value));
}
async function executeTabsAction(params) {
	const { baseUrl, profile, timeoutMs, proxyRequest } = params;
	const result = await browserTabs(proxyRequest ?? baseUrl, {
		profile,
		timeoutMs,
		signal: params.signal
	});
	const tabs = result.running ? result.tabs.filter((tab) => !params.targetId || readStringValue(tab.targetId) === params.targetId) : [];
	return formatTabsToolResult({
		running: result.running,
		tabs
	});
}
/** Validate the /act wire payload's abort summary once for note and page-state decisions. */
function readBrowserBatchAbort(result) {
	if (!result || typeof result !== "object") return null;
	const aborted = result.aborted;
	if (!aborted || typeof aborted !== "object") return null;
	const { reason, afterAction, url, skipped } = aborted;
	if (reason !== "navigation" && reason !== "closed" || typeof afterAction !== "number" || typeof url !== "string" || typeof skipped !== "number") return null;
	return {
		reason,
		afterAction,
		url,
		skipped
	};
}
function actObservedNavigation(result, aborted) {
	if (aborted?.reason === "navigation") return true;
	const results = result?.results;
	return Array.isArray(results) && results.some((entry) => entry?.navigated === true);
}
async function executeConsoleAction(params) {
	const { input, baseUrl, profile, proxyRequest } = params;
	const result = await browserConsoleMessages(proxyRequest ?? baseUrl, {
		level: normalizeOptionalString(input.level),
		targetId: normalizeOptionalString(input.targetId),
		profile,
		signal: params.signal
	});
	const wrapped = wrapBrowserExternalJson({
		kind: "console",
		payload: result,
		includeWarning: false
	});
	return {
		content: [{
			type: "text",
			text: wrapped.wrappedText
		}],
		details: {
			...wrapped.safeDetails,
			targetId: readStringValue(result.targetId),
			url: readStringValue(result.url),
			messageCount: Array.isArray(result.messages) ? result.messages.length : void 0
		}
	};
}
/** Read browser debug logs, keeping counts aligned with the bounded payload. */
async function executeDebugLogAction(kind, params) {
	const { input, baseUrl, profile, proxyRequest, signal } = params;
	const limit = readPositiveIntegerParam(input, "limit", { message: "limit must be a positive integer." }) ?? 50;
	const options = {
		targetId: normalizeOptionalString(input.targetId),
		clear: typeof input.clear === "boolean" ? input.clear : void 0,
		profile,
		signal
	};
	if (kind === "requests") {
		const result = await browserRequests(proxyRequest ?? baseUrl, {
			...options,
			filter: normalizeOptionalString(input.filter)
		});
		return formatBrowserDebugLogResult(kind, result, result.requests, limit);
	}
	const result = await browserErrors(proxyRequest ?? baseUrl, options);
	return formatBrowserDebugLogResult("errors", result, result.errors, limit);
}
/** Extract visible page prose with the same trust boundary as snapshots. */
async function executeTextAction(params) {
	const { input, baseUrl, profile, proxyRequest, signal } = params;
	const targetId = normalizeOptionalString(input.targetId);
	const selector = normalizeOptionalString(input.selector);
	const maxChars = Math.min(readPositiveIntegerParam(input, "maxChars", { message: "maxChars must be a positive integer." }) ?? 4e4, DEFAULT_AI_SNAPSHOT_MAX_CHARS);
	const result = await browserPageText(proxyRequest ?? baseUrl, {
		targetId,
		selector,
		maxChars,
		profile,
		signal
	});
	const wrapped = wrapBrowserExternalText({
		value: result.text,
		marker: "\n[truncated — retry with a narrower selector]",
		includeWarning: true,
		maxChars,
		prefix: result.truncated ? "Page text was truncated. Retry with a narrower selector." : void 0
	});
	return {
		content: [{
			type: "text",
			text: wrapped.text
		}],
		details: {
			ok: result.ok,
			targetId: result.targetId,
			url: result.url,
			truncated: result.truncated || wrapped.truncated,
			externalContent: {
				untrusted: true,
				source: "browser",
				kind: "text",
				wrapped: true
			}
		}
	};
}
/** Apply settings in order and pin later changes to the first resolved tab. */
async function executeEmulateAction(params) {
	const { input, baseUrl, profile, proxyRequest, signal } = params;
	const requested = [
		[
			"device",
			"device",
			"name"
		],
		[
			"colorScheme",
			"media",
			"colorScheme"
		],
		[
			"timezoneId",
			"timezone",
			"timezoneId"
		],
		[
			"locale",
			"locale",
			"locale"
		]
	].flatMap(([field, setting, key]) => {
		const value = normalizeOptionalString(input[field]);
		return value ? [{
			field,
			setting,
			key,
			value
		}] : [];
	});
	if (requested.length === 0) throw new Error("emulate requires at least one of device, colorScheme, timezoneId, or locale.");
	const colorScheme = requested.find(({ field }) => field === "colorScheme")?.value;
	if (colorScheme && ![
		"dark",
		"light",
		"no-preference",
		"none"
	].includes(colorScheme)) throw new Error("colorScheme must be dark|light|no-preference|none.");
	let targetId = normalizeOptionalString(input.targetId);
	const applied = [];
	for (const { field, setting, key, value } of requested) {
		targetId = (await browserEmulateSetting(proxyRequest ?? baseUrl, {
			setting,
			body: {
				targetId,
				[key]: value
			},
			profile,
			signal
		})).targetId ?? targetId;
		applied.push(field);
	}
	return jsonResult({
		ok: true,
		targetId,
		applied
	});
}
/** Execute explicit Browser download operations through the local or node-host path. */
async function executeDownloadAction(params) {
	const { action, input, baseUrl, profile, proxyRequest } = params;
	const targetId = normalizeOptionalString(input.targetId);
	const options = {
		targetId,
		timeoutMs: normalizePositiveTimeoutMs(input.timeoutMs),
		profile,
		signal: params.signal
	};
	const result = action === "download" ? await browserDownload(proxyRequest ?? baseUrl, {
		...options,
		ref: readToolStringParam(input, "ref", { required: true }),
		path: readToolStringParam(input, "path", { required: true })
	}) : await browserWaitForDownload(proxyRequest ?? baseUrl, {
		...options,
		path: readToolStringParam(input, "path")
	});
	await params.onTabActivity?.(readStringValue(result.targetId) ?? targetId);
	return formatBrowserExternalToolResult({
		kind: "download",
		payload: result
	});
}
/** Execute browser actions with route-owned timeout semantics and stale-tab recovery. */
async function executeActAction(params) {
	const { request, baseUrl, profile, proxyRequest } = params;
	if ("timeoutMs" in request && request.timeoutMs !== void 0) normalizePositiveTimeoutMs(request.timeoutMs);
	const effectiveRequest = proxyRequest ? request : withLocalActTimeout(request, params.usesChromeMcp);
	const finishActResult = async (result, resolvedTargetId) => {
		const aborted = readBrowserBatchAbort(result);
		await (effectiveRequest.kind === "close" || aborted?.reason === "closed" ? params.onTabClose : params.onTabActivity)?.(resolvedTargetId);
		const formatted = formatActToolResult(result, aborted);
		if (!actObservedNavigation(result, aborted)) return formatted;
		return await appendNavigatedPageState({
			result: formatted,
			targetId: resolvedTargetId,
			baseUrl,
			profile,
			proxyRequest,
			signal: params.signal
		});
	};
	const dispatchAct = async (actionRequest) => {
		const result = await browserAct(proxyRequest ?? baseUrl, actionRequest, {
			profile,
			signal: params.signal
		});
		return {
			result,
			targetId: readStringValue(result.targetId) ?? readStringValue(actionRequest.targetId)
		};
	};
	let dispatched;
	try {
		dispatched = await dispatchAct(effectiveRequest);
	} catch (err) {
		const proxyRoute = proxyRequest?.route();
		const usesChromeMcp = proxyRequest ? proxyRoute?.status === "resolved" && proxyRoute.driver === "existing-session" : params.usesChromeMcp;
		const recoveryProfile = proxyRoute?.status === "resolved" ? proxyRoute.profile : profile ?? "default";
		if (isChromeStaleTargetError(usesChromeMcp, err)) {
			let tabRefreshError;
			const availability = await browserTabs(proxyRequest ?? baseUrl, {
				profile,
				signal: params.signal
			}).catch((refreshError) => {
				params.signal?.throwIfAborted();
				tabRefreshError = refreshError;
				return {
					running: false,
					tabs: []
				};
			});
			const tabs = availability.tabs;
			const freshTargetId = tabs.length === 1 ? readStringValue(tabs[0]?.targetId) : void 0;
			const retryRequest = freshTargetId && normalizeOptionalString(effectiveRequest.targetId) ? {
				...effectiveRequest,
				targetId: freshTargetId
			} : null;
			if (retryRequest && canRetryChromeActAfterSoleTargetRefresh(effectiveRequest)) {
				const retried = await dispatchAct(retryRequest);
				return await finishActResult(retried.result, retried.targetId);
			}
			if (tabRefreshError) throw new Error(`Chrome tab not found for profile="${recoveryProfile}", and refreshing tabs failed: ${formatErrorMessage(tabRefreshError)}. Run action=tabs profile="${recoveryProfile}" and retry with a returned targetId.`, { cause: err });
			if (!availability.running) throw new Error(`Browser tabs are unavailable for profile="${recoveryProfile}". Reconnect or start that browser profile, then run action=tabs and retry.`, { cause: err });
			if (!tabs.length) throw new Error(`No browser tabs found for profile="${recoveryProfile}". Make sure the configured Chromium-based browser (v144+) is running and has open tabs, then retry.`, { cause: err });
			throw new Error(`Chrome tab not found (stale targetId?). Run action=tabs profile="${recoveryProfile}" and use one of the returned targetIds.`, { cause: err });
		}
		throw err;
	}
	return await finishActResult(dispatched.result, dispatched.targetId);
}
function formatActToolResult(result, aborted) {
	const formatted = formatBrowserExternalToolResult({
		kind: "act",
		payload: result
	});
	if (!aborted) return formatted;
	const note = aborted.reason === "navigation" ? `Batch aborted after action ${aborted.afterAction} because the page navigated; ${aborted.skipped} remaining action(s) skipped. Earlier refs are stale.` : `Batch aborted after action ${aborted.afterAction} because the page or browser context closed; ${aborted.skipped} remaining action(s) skipped. Take a new snapshot before continuing.`;
	return {
		...formatted,
		content: [...formatted.content, {
			type: "text",
			text: note
		}]
	};
}
//#endregion
//#region extensions/browser/src/browser-tool.screenshot.ts
function formatScreenshotShareHint(filePath) {
	return `[Screenshot saved to ${JSON.stringify(filePath)}. A sanitized outbound copy is ready at this path for explicit sharing.]`;
}
const SCREENSHOT_SHARE_UNAVAILABLE = "[Screenshot sharing is unavailable because an outbound copy could not be prepared.]";
async function executeScreenshotAction({ input: params, baseUrl, profile, requestedTimeoutMs, proxyRequest, signal, onTabActivity, opts }) {
	const targetId = readToolStringParam(params, "targetId");
	const type = params.type === "jpeg" ? "jpeg" : "png";
	const result = await browserScreenshotAction(proxyRequest ?? baseUrl, {
		targetId,
		fullPage: Boolean(params.fullPage),
		ref: readToolStringParam(params, "ref"),
		element: readToolStringParam(params, "element"),
		type,
		labels: typeof params.labels === "boolean" ? params.labels : void 0,
		timeoutMs: requestedTimeoutMs ?? 2e4,
		profile,
		signal
	});
	await onTabActivity(readStringValue(result.targetId) ?? targetId);
	if (opts?.screenshotResultMode === "path") {
		const artifactPath = opts.persistScreenshot ? await opts.persistScreenshot({
			sourcePath: result.path,
			type,
			targetId: readStringValue(result.targetId) ?? targetId
		}) : result.path;
		if (artifactPath.length > 4096) throw new Error("Browser screenshot artifact path exceeds 4096 characters");
		const resultTargetId = readStringValue(result.targetId) ?? targetId;
		const resultUrl = readStringValue(result.url);
		return jsonResult({
			ok: result.ok,
			path: artifactPath,
			...resultTargetId ? { targetId: truncateUtf16Safe(resultTargetId, 256) } : {},
			...resultUrl ? { url: truncateUtf16Safe(resultUrl, 2048) } : {},
			...Array.isArray(result.annotations) ? { annotationCount: result.annotations.length } : {},
			media: { outbound: false }
		});
	}
	const screenshotPath = result.path;
	const screenshotCfg = getRuntimeConfig();
	const imageSanitization = resolveRuntimeImageSanitization();
	let shareHint = SCREENSHOT_SHARE_UNAVAILABLE;
	try {
		shareHint = formatScreenshotShareHint(await stageBrowserScreenshotForSharing(screenshotPath, imageSanitization?.maxDimensionPx));
	} catch {}
	const screenshotDetails = {
		...result,
		media: { outbound: false }
	};
	let extraText = shareHint;
	try {
		const described = await describeBrowserScreenshot({
			cfg: screenshotCfg,
			filePath: screenshotPath,
			agentDir: opts?.agentDir,
			agentId: opts?.agentId,
			workspaceDir: opts?.workspaceDir,
			activeModel: opts?.activeModel,
			mediaScope: opts?.mediaScope,
			imageSanitization
		}, {
			describeImageFile,
			normalizeBrowserScreenshot,
			saveMediaBuffer
		});
		if (described) return {
			content: [{
				type: "text",
				text: `[analyzed by ${described.provider && described.model ? `${described.provider}/${described.model}` : "media image understanding"}]\n${wrapExternalContent(neutralizeMediaDirectives(described.text.trim()), {
					source: "browser",
					includeWarning: true
				})}\n${shareHint}`
			}],
			details: {
				...result,
				vision: {
					provider: described.provider,
					model: described.model,
					decision: described.decision
				}
			}
		};
	} catch (err) {
		const rawReason = err instanceof Error ? err.message : String(err);
		extraText = `[browser screenshot vision failed: ${wrapExternalContent(neutralizeMediaDirectives(rawReason), {
			source: "browser",
			includeWarning: false
		})}]\n${shareHint}`;
	}
	return await imageResultFromFile({
		label: "browser:screenshot",
		path: screenshotPath,
		extraText,
		details: screenshotDetails,
		imageSanitization
	});
}
//#endregion
//#region extensions/browser/src/browser-tool-dispatch.ts
function readOptionalTargetAndTimeout(params) {
	return {
		targetId: normalizeOptionalString(params.targetId),
		timeoutMs: readPositiveIntegerParam(params, "timeoutMs", { message: "timeoutMs must be a positive integer." })
	};
}
function readTargetUrlParam(params) {
	const targetUrl = readToolStringParam(params, "targetUrl") ?? readToolStringParam(params, "url", {
		required: true,
		label: "targetUrl"
	});
	parseBrowserNavigationUrl(targetUrl);
	return targetUrl;
}
/** Run tab actions against the prepared host, node, or sandbox route. */
async function executeBrowserTabAction(context) {
	const { action, params, baseUrl, profile, proxyRequest, nodeRoute, sessionTabs, capabilities, isUserBrowserProfile, toolTimeoutMs, requestedTimeoutMs, signal, opts } = context;
	const touchTab = async (targetId) => {
		await sessionTabs.touch(targetId);
		await context.onTabActivity(targetId);
	};
	const trackedTabResult = async (result, targetId) => {
		await touchTab(readStringValue(asNullableRecord(result)?.targetId) ?? targetId);
		return jsonResult(result);
	};
	const actionOptions = {
		input: params,
		baseUrl,
		profile,
		proxyRequest,
		signal
	};
	const clientOptions = {
		profile,
		timeoutMs: toolTimeoutMs,
		signal
	};
	switch (action) {
		case "tabs": return await executeTabsAction({
			baseUrl,
			profile,
			timeoutMs: toolTimeoutMs,
			proxyRequest,
			targetId: context.boundTargetId,
			signal
		});
		case "open": {
			const targetUrl = readTargetUrlParam(params);
			const label = normalizeOptionalString(params.label);
			const opened = await browserOpenTab(proxyRequest ?? baseUrl, targetUrl, {
				...clientOptions,
				label
			});
			const closeOpenedTab = async (targetId, openedProfile) => {
				if (nodeRoute && !proxyRequest?.isHostFallbackActive()) {
					await nodeRoute.closeTarget({
						targetId,
						profile: openedProfile
					});
					return;
				}
				await browserCloseTab(baseUrl, targetId, {
					profile: openedProfile,
					timeoutMs: toolTimeoutMs
				});
			};
			await sessionTabs.trackOpened(opened, closeOpenedTab);
			await context.onTabActivity(readStringValue(asNullableRecord(opened)?.targetId), readStringValue(asNullableRecord(opened)?.resolvedProfile));
			return formatBrowserExternalToolResult({
				kind: "tabs",
				payload: stripBrowserOpenInternalMetadata(opened)
			});
		}
		case "focus": {
			const targetId = readToolStringParam(params, "targetId", { required: true });
			return await trackedTabResult(await browserFocusTab(proxyRequest ?? baseUrl, targetId, clientOptions), targetId);
		}
		case "close": {
			const targetId = readToolStringParam(params, "targetId");
			const result = targetId ? await browserCloseTab(proxyRequest ?? baseUrl, targetId, clientOptions) : await browserAct(proxyRequest ?? baseUrl, { kind: "close" }, clientOptions);
			await sessionTabs.untrack(readStringValue(asNullableRecord(result)?.targetId) ?? targetId);
			return jsonResult(result);
		}
		case "snapshot": return await executeSnapshotAction({
			...actionOptions,
			onTabActivity: touchTab
		});
		case "screenshot": return await executeScreenshotAction({
			...actionOptions,
			requestedTimeoutMs,
			onTabActivity: touchTab,
			opts
		});
		case "navigate": {
			const targetUrl = readTargetUrlParam(params);
			const targetId = readToolStringParam(params, "targetId");
			const result = await browserNavigate(proxyRequest ?? baseUrl, {
				url: targetUrl,
				targetId,
				timeoutMs: requestedTimeoutMs,
				profile,
				signal
			});
			const navigatedTargetId = readStringValue(asNullableRecord(result)?.targetId) ?? targetId;
			await touchTab(navigatedTargetId);
			const formatted = formatBrowserExternalToolResult({
				kind: asNullableRecord(result)?.download ? "download" : "act",
				payload: result
			});
			if (asNullableRecord(result)?.download) return formatted;
			return await appendNavigatedPageState({
				result: formatted,
				targetId: navigatedTargetId,
				baseUrl,
				profile,
				proxyRequest,
				signal
			});
		}
		case "console": {
			const result = await executeConsoleAction(actionOptions);
			const targetId = readToolStringParam(params, "targetId");
			await touchTab(readStringValue(asNullableRecord(result.details)?.targetId) ?? targetId);
			return result;
		}
		case "requests":
		case "errors":
		case "text":
		case "emulate": {
			const result = action === "requests" || action === "errors" ? await executeDebugLogAction(action, actionOptions) : await (action === "text" ? executeTextAction : executeEmulateAction)(actionOptions);
			await touchTab(readStringValue(asNullableRecord(result.details)?.targetId) ?? readStringValue(params.targetId));
			return result;
		}
		case "pdf": {
			const targetId = normalizeOptionalString(params.targetId);
			const result = await browserPdfSave(proxyRequest ?? baseUrl, {
				targetId,
				profile,
				signal
			});
			await touchTab(readStringValue(result.targetId) ?? targetId);
			return {
				content: [{
					type: "text",
					text: `FILE:${result.path}`
				}],
				details: result
			};
		}
		case "download":
		case "waitfordownload": return await executeDownloadAction({
			...actionOptions,
			action,
			onTabActivity: touchTab
		});
		case "upload": {
			const paths = Array.isArray(params.paths) ? params.paths.map((p) => String(p)) : [];
			if (paths.length === 0) throw new Error("paths required");
			const resolvedResult = await resolveExistingUploadPaths({ requestedPaths: paths });
			if (!resolvedResult.ok) throw new Error(resolvedResult.error);
			const ref = readToolStringParam(params, "ref");
			const inputRef = readToolStringParam(params, "inputRef");
			const element = readToolStringParam(params, "element");
			const { targetId, timeoutMs } = readOptionalTargetAndTimeout(params);
			return await trackedTabResult(await browserArmFileChooser(proxyRequest ?? baseUrl, {
				paths: resolvedResult.paths,
				ref,
				inputRef,
				element,
				targetId,
				timeoutMs,
				profile,
				signal
			}), targetId);
		}
		case "dialog": {
			const accept = Boolean(params.accept);
			const promptText = readStringValue(params.promptText);
			const dialogId = readStringValue(params.dialogId);
			const { targetId, timeoutMs } = readOptionalTargetAndTimeout(params);
			return await trackedTabResult(await browserArmDialog(proxyRequest ?? baseUrl, {
				accept,
				promptText,
				dialogId,
				targetId,
				timeoutMs,
				profile,
				signal
			}), targetId);
		}
		case "act": {
			const request = context.actRequest;
			if (!request) throw new Error("request required");
			if (!capabilities.actKinds.some((kind) => kind === request.kind)) throw new Error(`browser act kind ${JSON.stringify(request.kind)} is unavailable for this run`);
			return await executeActAction({
				request,
				baseUrl,
				profile,
				usesChromeMcp: isUserBrowserProfile,
				proxyRequest,
				signal,
				onTabActivity: touchTab,
				onTabClose: sessionTabs.untrack
			});
		}
		default: throw new Error(`Unknown action: ${action}`);
	}
}
//#endregion
//#region extensions/browser/src/browser-node-routing.ts
/** Select the same authorized browser-capable node on every request surface. */
async function resolveBrowserNodeTarget(params) {
	const policy = params.config.gateway?.nodes?.browser;
	const mode = policy?.mode ?? "auto";
	const explicit = params.explicitTarget || Boolean(params.requestedNode?.trim());
	if (mode === "off") {
		if (explicit) throw new Error("Node browser proxy is disabled (gateway.nodes.browser.mode=off).");
		return null;
	}
	const requested = params.requestedNode?.trim() || policy?.node?.trim();
	if (mode === "manual" && !explicit && !requested) return null;
	if (!explicit && !requested) {
		const { isBrowserHostAvailable } = await import("./browser-host-availability-CrZam5AL.mjs");
		if (await isBrowserHostAvailable(params.config, params.profile)) return null;
	}
	const browserNodes = (await params.nodes()).filter((node) => {
		if (params.requireConnected && !node.connected) return false;
		return node.caps?.includes("browser") || node.commands?.includes("browser.proxy");
	});
	if (browserNodes.length === 0) {
		if (explicit || requested) throw new Error("No connected browser-capable nodes.");
		return null;
	}
	if (requested) {
		const nodeId = resolveNodeIdFromList(browserNodes, requested, false, { allowCompactDisplayName: true });
		return browserNodes.find((node) => node.nodeId === nodeId) ?? null;
	}
	if (browserNodes.length === 1) return browserNodes[0] ?? null;
	if (explicit) throw new Error(`Multiple browser-capable nodes connected (${browserNodes.length}). Set gateway.nodes.browser.node or pass node=<id>.`);
	return null;
}
//#endregion
//#region extensions/browser/src/browser-tool.routing.ts
async function resolveBrowserToolNodeTarget(params) {
	if (params.allowHostControl === false) {
		if (params.target === "node" || params.requestedNode) throw new Error("Node browser control is disabled by sandbox policy.");
		return null;
	}
	const cfg = getRuntimeConfig();
	const policy = cfg.gateway?.nodes?.browser;
	const explicitTarget = params.target === "node";
	const requestedNode = params.requestedNode?.trim();
	if (policy?.mode === "off") {
		await resolveBrowserNodeTarget({
			nodes: () => [],
			config: cfg,
			requestedNode,
			explicitTarget
		});
		return null;
	}
	if (params.sandboxBridgeUrl?.trim() && !explicitTarget && !requestedNode) return null;
	if (params.target && !explicitTarget) return null;
	if (!explicitTarget && !requestedNode && !policy?.node?.trim() && (policy?.mode === "manual" || policy?.mode !== "auto" && !hasGatewayToolRoutingContext() && cfg.gateway?.mode !== "remote" && !cfg.gateway?.remote?.url?.trim() && !process.env.OPENCLAW_GATEWAY_URL?.trim())) return null;
	const node = await resolveBrowserNodeTarget({
		nodes: () => listNodes({}, params.signal),
		config: cfg,
		profile: params.profile,
		requestedNode,
		explicitTarget,
		requireConnected: true
	});
	params.signal?.throwIfAborted();
	return node ? {
		nodeId: node.nodeId,
		label: node.displayName ?? node.remoteIp ?? node.nodeId,
		commands: node.commands ?? [],
		pendingDeclaredCommands: node.pendingDeclaredCommands ?? []
	} : null;
}
function resolveBrowserBaseUrl(params) {
	const cfg = getRuntimeConfig();
	const resolved = resolveBrowserConfig(cfg.browser, cfg);
	const normalizedSandbox = params.sandboxBridgeUrl?.trim() ?? "";
	if ((params.target ?? (normalizedSandbox ? "sandbox" : "host")) === "sandbox") {
		if (!normalizedSandbox) throw new Error("Sandbox browser is unavailable. Enable agents.defaults.sandbox.browser.enabled or use target=\"host\" if allowed.");
		return normalizedSandbox.replace(/\/$/, "");
	}
	if (params.allowHostControl === false) throw new Error("Host browser control is disabled by sandbox policy.");
	if (!resolved.enabled) throw new Error("Browser control is disabled. Set browser.enabled=true in ~/.openclaw/openclaw.json.");
}
const DEFAULT_EXISTING_SESSION_MANAGE_TIMEOUT_MS = 45e3;
const EXISTING_SESSION_MANAGE_ACTIONS = /* @__PURE__ */ new Set([
	"status",
	"start",
	"stop",
	"profiles",
	"tabs",
	"open",
	"focus",
	"close"
]);
const PERSISTENT_TAB_ACTIONS = /* @__PURE__ */ new Set([
	"profiles",
	"tabs",
	"open",
	"focus",
	"close"
]);
function hasExistingSessionProfile(resolved) {
	return Object.keys(resolved.profiles).some((name) => {
		const candidate = resolveProfile(resolved, name);
		return candidate ? getBrowserProfileCapabilities(candidate).usesChromeMcp : false;
	});
}
function resolveBrowserToolTimeoutMs({ requestedTimeoutMs, action, isUserBrowserProfile, usesPersistentPlaywright, isNodeProxy, resolvedBrowser }) {
	if (requestedTimeoutMs !== void 0) return requestedTimeoutMs;
	if (EXISTING_SESSION_MANAGE_ACTIONS.has(action) && (isUserBrowserProfile || action === "profiles" && hasExistingSessionProfile(resolvedBrowser))) return DEFAULT_EXISTING_SESSION_MANAGE_TIMEOUT_MS;
	if (PERSISTENT_TAB_ACTIONS.has(action) && (usesPersistentPlaywright || isNodeProxy)) return resolvedBrowser.actionTimeoutMs;
}
//#endregion
//#region extensions/browser/src/browser-tool.lifecycle.ts
const unavailableSystemProfiles = (unavailableReason) => ({
	profiles: [],
	unavailableReason
});
/**
* Read importable system profiles from the host control server. Discovery must
* match where import runs (host-local), so it never uses a node proxy or the
* sandbox base URL. Other profile sources remain useful when host discovery
* is unavailable, so failures become an explicit degradation fact.
*/
async function readHostSystemProfiles(params) {
	if (params.allowHostControl === false) return unavailableSystemProfiles("Host system profile discovery is disabled by sandbox policy; enable host control to discover importable system profiles.");
	let hostBaseUrl;
	try {
		hostBaseUrl = resolveBrowserBaseUrl({
			target: "host",
			sandboxBridgeUrl: params.sandboxBridgeUrl,
			allowHostControl: params.allowHostControl
		});
	} catch {
		return unavailableSystemProfiles("Host browser control is unavailable; enable it and retry action=profiles target=\"host\".");
	}
	try {
		return {
			profiles: await browserSystemProfiles(hostBaseUrl, {
				timeoutMs: params.timeoutMs,
				signal: params.signal
			}),
			unavailableReason: void 0
		};
	} catch {
		params.signal?.throwIfAborted();
		return unavailableSystemProfiles("Host system profile discovery failed; retry action=profiles target=\"host\" after host browser control is available.");
	}
}
async function executeBrowserLifecycleAction({ action, input: params, baseUrl, profile, timeoutMs: toolTimeoutMs, proxyRequest, allowHostControl, sandboxBridgeUrl, signal }) {
	const readBrowserStatus = async () => await browserStatus(proxyRequest ?? baseUrl, {
		profile,
		timeoutMs: toolTimeoutMs,
		signal
	});
	switch (action) {
		case "doctor": return jsonResult(await browserDoctor(proxyRequest ?? baseUrl, {
			profile,
			signal
		}));
		case "status": return jsonResult(await readBrowserStatus());
		case "start":
		case "stop":
			await (action === "start" ? browserStart : browserStop)(proxyRequest ?? baseUrl, {
				profile,
				timeoutMs: toolTimeoutMs,
				signal
			});
			return jsonResult(await readBrowserStatus());
		case "profiles": {
			const { profiles: systemProfiles, unavailableReason: systemProfilesUnavailable } = await readHostSystemProfiles({
				allowHostControl,
				sandboxBridgeUrl,
				timeoutMs: toolTimeoutMs,
				signal
			});
			if (proxyRequest) {
				const result = await proxyRequest({
					method: "GET",
					path: "/profiles",
					timeoutMs: toolTimeoutMs
				});
				return jsonResult({
					...result && typeof result === "object" ? result : { profiles: result },
					systemProfiles,
					...systemProfilesUnavailable ? { systemProfilesUnavailable } : {}
				});
			}
			return jsonResult({
				profiles: await browserProfiles(baseUrl, {
					timeoutMs: toolTimeoutMs,
					signal
				}),
				systemProfiles,
				...systemProfilesUnavailable ? { systemProfilesUnavailable } : {}
			});
		}
		case "importprofile": {
			if (proxyRequest) throw new Error("system profile import must run on the browser host");
			const domains = parseSystemProfileDomains(params.domains);
			return jsonResult(await browserImportProfile(baseUrl, {
				browser: normalizeOptionalString(params.browser) ?? "chrome",
				systemProfile: normalizeOptionalString(params.systemProfile) ?? "Default",
				into: normalizeOptionalString(params.into) ?? "imported",
				domains,
				signal
			}));
		}
		default: throw new Error(`Unknown action: ${String(action)}`);
	}
}
//#endregion
//#region extensions/browser/src/browser-tool.ts
function isBrowserRouteIdentifier(value, maxChars) {
	return typeof value === "string" && value.length > 0 && value.length <= maxChars && value.trim() === value;
}
function resolveBrowserTabIdentity(params) {
	if (params.baseUrl || !isBrowserRouteIdentifier(params.targetId, 128) || !isBrowserRouteIdentifier(params.profile, 128)) return;
	if (params.target === "node") return isBrowserRouteIdentifier(params.node, 256) ? {
		targetId: params.targetId,
		profile: params.profile,
		target: "node",
		node: params.node
	} : void 0;
	return {
		targetId: params.targetId,
		profile: params.profile,
		target: "host"
	};
}
function withBrowserTabDetails(result, identity) {
	const details = asNullableRecord(result.details);
	if (!identity || !details || details.ok === false || details.isError === true || Array.isArray(details.results) && details.results.some((entry) => asNullableRecord(entry)?.ok === false) || asNullableRecord(details.aborted)?.reason === "closed") return result;
	const url = readStringValue(details.url);
	const protocol = url ? URL.parse(url)?.protocol : void 0;
	const title = readStringValue(details.title);
	return {
		...result,
		details: {
			...details,
			browserTab: {
				...identity,
				...url && (protocol === "http:" || protocol === "https:") ? { url: truncateUtf16Safe(url, 2048) } : {},
				...title ? { title: truncateUtf16Safe(title, 512) } : {}
			}
		}
	};
}
const LEGACY_BROWSER_ACT_REQUEST_KEYS = [
	"kind",
	"actions",
	"stopOnError",
	"targetId",
	"ref",
	"doubleClick",
	"button",
	"modifiers",
	"x",
	"y",
	"text",
	"submit",
	"slowly",
	"key",
	"delayMs",
	"startRef",
	"endRef",
	"values",
	"fields",
	"width",
	"height",
	"timeMs",
	"textGone",
	"selector",
	"url",
	"loadState",
	"fn",
	"timeoutMs"
];
function readActRequestParam(params) {
	const requestParam = params.request;
	const nestedRequest = requestParam && typeof requestParam === "object" ? { ...requestParam } : void 0;
	if (!nestedRequest && !readToolStringParam(params, "kind")) return;
	const request = nestedRequest ?? {};
	const hasMismatchedKind = typeof request.kind === "string" && typeof params.kind === "string" && request.kind !== params.kind;
	for (const key of LEGACY_BROWSER_ACT_REQUEST_KEYS) {
		if (Object.hasOwn(request, key) || !Object.hasOwn(params, key)) continue;
		if (hasMismatchedKind && key !== "targetId") continue;
		request[key] = params[key];
	}
	return request;
}
function readToolTimeoutMs(params) {
	return readPositiveIntegerParam(params, "timeoutMs", { message: "timeoutMs must be a positive integer." });
}
function createBrowserTool(opts) {
	const { binding, capabilities, metadata } = createBrowserToolDefinition(opts, getRuntimeConfig);
	return {
		...metadata,
		execute: async (_toolCallId, args, signal) => {
			let params = binding ? applyBrowserTabToolBinding(args, binding) : args;
			const action = readToolStringParam(params, "action", { required: true });
			if (!capabilities.actions.some((candidate) => candidate === action)) throw new Error(`browser action ${JSON.stringify(action)} is unavailable for this run; use an available action such as snapshot, or select a managed browser profile in an unbound run.`);
			const dashboardName = readToolStringParam(params, "dashboard");
			let browserDashboard;
			if (dashboardName) {
				const operatorScopes = readGatewayToolOperatorScopes();
				const sessionScoped = operatorScopes !== void 0 && !operatorScopes.includes("operator.admin");
				const dashboardScopes = sessionScoped ? operatorScopes.includes("operator.write") ? ["operator.write"] : ["operator.sessions.write"] : ["operator.admin"];
				if (binding || !opts?.agentSessionKey || opts.allowHostControl === false || params.target && params.target !== "host" || params.node) throw new Error("Browser dashboard requires this session's unbound host-browser capability");
				const request = {
					sessionKey: opts.agentSessionKey,
					agentId: opts.agentId,
					name: dashboardName
				};
				if (params.profile !== void 0 || params.targetId !== void 0) throw new Error("A dashboard selector owns its browser profile and tab. Omit profile and targetId.");
				const callDashboard = async (method, resume = false) => {
					signal?.throwIfAborted();
					const dashboard = await callGatewayTool(sessionScoped ? "browser.dashboard.request" : "browser.request", { timeoutMs: readToolTimeoutMs(params) }, {
						...sessionScoped ? {
							sessionKey: request.sessionKey,
							agentId: request.agentId
						} : { target: "host" },
						method,
						path: "/dashboard",
						body: {
							...request,
							...resume ? { resume: true } : {}
						}
					}, {
						scopes: dashboardScopes,
						signal
					});
					signal?.throwIfAborted();
					return dashboard;
				};
				if (action === "close") return jsonResult({ browserDashboard: await callDashboard("DELETE") });
				if (action === "open") {
					if (params.targetUrl !== void 0 || params.url !== void 0) throw new Error("Update the dashboard widget URL with dashboard widget_put before opening it");
					return jsonResult({ browserDashboard: await callDashboard("POST", true) });
				}
				if ([
					"doctor",
					"status",
					"start",
					"stop",
					"profiles",
					"importprofile"
				].includes(action)) throw new Error("Use browser tab actions with a dashboard selector; open resumes it and close pauses it");
				const dashboard = await callDashboard("POST");
				browserDashboard = dashboard;
				if (!dashboard.browserTab) throw new Error(`Dashboard ${dashboardName} is paused. Use action=open with dashboard=${dashboardName} to resume it.`);
				params = applyBrowserTabToolBinding(params, {
					kind: "tab",
					tabId: 0,
					...dashboard.browserTab
				});
				if (sessionScoped) {
					if (![
						"tabs",
						"focus",
						"navigate",
						"snapshot",
						"screenshot",
						"act"
					].includes(action)) throw new Error("Session dashboards support tabs, focus, navigate, snapshot, screenshot and act; open resumes and close pauses them.");
					const stripSelectors = (input) => {
						if (!input) return;
						const { targetId: _targetId, profile: _profile, target: _target, node: _node, ...rest } = input;
						return rest;
					};
					const proxyRequest = Object.assign(async (call) => {
						return callGatewayTool("browser.dashboard.request", { timeoutMs: call.timeoutMs }, {
							sessionKey: request.sessionKey,
							agentId: request.agentId,
							dashboard: {
								name: dashboardName,
								instanceId: dashboard.instanceId
							},
							method: call.method,
							path: call.path,
							query: stripSelectors(call.query),
							body: stripSelectors(asNullableRecord(call.body) ?? void 0)
						}, {
							scopes: dashboardScopes,
							signal: call.signal ?? signal
						});
					}, {
						isHostFallbackActive: () => false,
						route: () => void 0
					});
					const result = await executeBrowserTabAction({
						action,
						params,
						actRequest: action === "act" ? readActRequestParam(params) : void 0,
						profile: dashboard.browserTab.profile,
						proxyRequest,
						capabilities,
						isUserBrowserProfile: false,
						boundTargetId: dashboard.browserTab.targetId,
						requestedTimeoutMs: readToolTimeoutMs(params),
						signal,
						opts,
						sessionTabs: {
							touch: async () => {},
							untrack: async () => {},
							trackOpened: async () => {
								throw new Error("Dashboard owns its context.");
							}
						},
						onTabActivity: () => {}
					});
					return {
						...result,
						details: {
							...asNullableRecord(result.details),
							browserDashboard: dashboard
						}
					};
				}
			}
			const requestedProfile = readToolStringParam(params, "profile");
			const requestedNode = readToolStringParam(params, "node");
			const requestedTimeoutMs = readToolTimeoutMs(params);
			let target = readToolStringParam(params, "target");
			const runtimeConfig = getRuntimeConfig();
			const resolvedBrowser = resolveBrowserConfig(runtimeConfig.browser, runtimeConfig);
			const effectiveProfile = requestedProfile ?? resolvedBrowser.defaultProfile;
			const resolvedProfile = resolveProfile(resolvedBrowser, effectiveProfile);
			const profileCapabilities = resolvedProfile ? getBrowserProfileCapabilities(resolvedProfile) : void 0;
			let profile = profileCapabilities?.usesChromeMcp ? effectiveProfile : requestedProfile;
			const configuredNode = runtimeConfig.gateway?.nodes?.browser?.node?.trim();
			if (requestedNode && target && target !== "node") throw new Error("node is only supported with target=\"node\".");
			if (action === "importprofile") {
				if (target === "sandbox" || target === "node" || requestedNode) throw new Error("system profile import must run on the host; omit target or use target=\"host\".");
				target = "host";
			}
			const isUserBrowserProfile = profileCapabilities?.usesChromeMcp === true;
			if (isUserBrowserProfile) {
				if (target === "sandbox") throw new Error(`profile="${profile}" cannot use the sandbox browser; use target="host" or omit target.`);
			}
			let nodeTarget = null;
			try {
				nodeTarget = await resolveBrowserToolNodeTarget({
					requestedNode: requestedNode ?? void 0,
					profile: requestedProfile,
					target,
					sandboxBridgeUrl: opts?.sandboxBridgeUrl,
					allowHostControl: opts?.allowHostControl,
					signal
				});
			} catch (error) {
				signal?.throwIfAborted();
				if (!(isUserBrowserProfile && !target && !requestedNode && !configuredNode)) throw error;
			}
			if (isUserBrowserProfile && !target && !requestedNode && !nodeTarget) target = "host";
			const baseUrl = nodeTarget ? void 0 : resolveBrowserBaseUrl({
				target: target === "node" ? void 0 : target,
				sandboxBridgeUrl: opts?.sandboxBridgeUrl,
				allowHostControl: opts?.allowHostControl
			});
			const allowAutomaticHostFallback = Boolean(nodeTarget && !target && !requestedNode && !configuredNode && opts?.allowHostControl !== false);
			const proxyRequest = nodeTarget ? createBrowserNodeProxyRequest({
				nodeTarget,
				allowAutomaticHostFallback,
				signal
			}) : null;
			if (proxyRequest) profile = requestedProfile;
			if (!proxyRequest && isUserBrowserProfile && [
				"requests",
				"errors",
				"text",
				"emulate"
			].includes(action)) throw new Error(`action=${action} is not supported for existing-session profiles; use action=snapshot to inspect this page, or select a managed browser profile for ${action}.`);
			const nodeRoute = nodeTarget ? createBrowserNodeSessionTabRoute(nodeTarget) : void 0;
			const toolTimeoutMs = resolveBrowserToolTimeoutMs({
				requestedTimeoutMs,
				action,
				isUserBrowserProfile,
				usesPersistentPlaywright: profileCapabilities?.usesPersistentPlaywright === true,
				isNodeProxy: proxyRequest !== null,
				resolvedBrowser
			});
			const sessionTabs = createBrowserToolSessionTabs({
				sessionKey: opts?.agentSessionKey,
				requestedProfile: profile,
				defaultProfile: resolvedBrowser.defaultProfile,
				baseUrl,
				nodeRoute,
				routeProfile: () => {
					const route = proxyRequest?.route();
					return route?.status === "resolved" ? route.profile : void 0;
				},
				isHostFallbackActive: proxyRequest?.isHostFallbackActive,
				registry: {
					touchSessionBrowserTab,
					trackSessionBrowserTab,
					untrackSessionBrowserTab
				}
			});
			switch (action) {
				case "doctor":
				case "status":
				case "start":
				case "stop":
				case "profiles":
				case "importprofile": return await executeBrowserLifecycleAction({
					action,
					input: params,
					baseUrl,
					profile,
					timeoutMs: toolTimeoutMs,
					proxyRequest,
					allowHostControl: opts?.allowHostControl,
					sandboxBridgeUrl: opts?.sandboxBridgeUrl,
					signal
				});
			}
			let tabIdentity;
			if (browserDashboard) await assertBrowserDashboardTargetCurrent(browserDashboard, opts?.agentId, { signal });
			const dispatchTabAction = () => executeBrowserTabAction({
				action,
				actRequest: action === "act" ? readActRequestParam(params) : void 0,
				params,
				baseUrl,
				profile,
				proxyRequest,
				nodeRoute,
				sessionTabs,
				capabilities,
				isUserBrowserProfile,
				toolTimeoutMs,
				requestedTimeoutMs,
				signal,
				opts,
				boundTargetId: binding ? binding.targetId : dashboardName ? readToolStringParam(params, "targetId") : void 0,
				onTabActivity: (targetId, openedProfile) => {
					const route = proxyRequest?.route();
					const onNode = proxyRequest && !proxyRequest.isHostFallbackActive();
					const routeProfile = onNode ? route?.status === "resolved" ? route.profile : void 0 : profile ?? resolvedBrowser.defaultProfile;
					tabIdentity = resolveBrowserTabIdentity({
						targetId,
						baseUrl,
						profile: openedProfile ?? routeProfile,
						target: onNode ? "node" : "host",
						node: onNode && route?.status === "resolved" ? nodeTarget?.nodeId : void 0
					});
				}
			});
			const dashboardTarget = browserDashboard;
			const result = dashboardTarget ? await withBrowserRequestScope({
				managedOnly: true,
				assertCurrent: (admittedProfile) => assertBrowserDashboardTargetCurrent(dashboardTarget, opts?.agentId, { signal }, admittedProfile)
			}, dispatchTabAction) : await dispatchTabAction();
			if (browserDashboard) return {
				...result,
				details: {
					...asNullableRecord(result.details),
					browserDashboard
				}
			};
			return [
				"open",
				"focus",
				"navigate",
				"screenshot",
				"snapshot",
				"text",
				"requests",
				"errors",
				"console",
				"emulate",
				"act"
			].includes(action) ? withBrowserTabDetails(result, tabIdentity) : result;
		}
	};
}
//#endregion
//#region extensions/browser/src/sdk-node-runtime.ts
/** Runs async work with an optional aborting timeout signal. */
async function withTimeout(work, timeoutMs, label) {
	const resolved = clampTimerTimeoutMs(timeoutMs);
	if (!resolved) return await work(void 0);
	const controller = new AbortController();
	const error = /* @__PURE__ */ new Error(`${label ?? "request"} timed out`);
	const timeout = createDeferred();
	const timer = setTimeout(() => {
		timeout.reject(error);
		controller.abort(error);
	}, resolved);
	timer.unref?.();
	try {
		return await Promise.race([work(controller.signal), timeout.promise]);
	} finally {
		clearTimeout(timer);
	}
}
//#endregion
//#region extensions/browser/src/gateway/browser-request-tab-scope.ts
const browserTabScopeSchema = strictObject({
	sessionKey: string().trim().min(1).max(512),
	referencedTabs: array(strictObject({
		target: _enum(["host", "node"]),
		node: string().trim().min(1).max(256).optional(),
		profile: string().trim().min(1).optional(),
		targetId: string().trim().min(1)
	}).refine((tab) => tab.target === "node" || tab.node === void 0)).max(64).optional()
});
/** Apply session membership only after the execution owner has completed the route. */
async function applyBrowserRequestTabScope(params) {
	params.assertCurrent();
	const listTabs = params.method === "GET" && params.path === "/tabs";
	const openTab = params.method === "POST" && params.path === "/tabs/open";
	const closeTab = params.method === "DELETE" && /^\/tabs\/[^/]+$/.test(params.path);
	const touchTab = params.method === "POST" && (params.path === "/navigate" || params.path === "/tabs/focus");
	if (!listTabs && !openTab && !closeTab && !touchTab) return params.result;
	const authority = {
		runtime: getOptionalBrowserStateRuntime() ?? void 0,
		assertCurrent: params.assertCurrent
	};
	const registry = await import("./session-tab-registry-DGBVaQrQ.mjs");
	const nodeRoute = params.nodeTarget ? (await import("./browser-node-proxy-CJzSGehx.mjs")).createBrowserNodeSessionTabRoute(params.nodeTarget) : void 0;
	params.assertCurrent();
	const route = nodeRoute ?? { kind: "browser-control" };
	const profile = normalizeOptionalLowercaseString(params.profile);
	if (listTabs) {
		const result = asNullableRecord(params.result);
		if (!Array.isArray(result?.tabs)) return params.result;
		const tabs = result.tabs.flatMap((value) => {
			const tab = asNullableRecord(value);
			const targetId = normalizeOptionalString(tab?.targetId);
			return targetId ? [{
				value,
				targetId,
				tabId: normalizeOptionalString(tab?.tabId)
			}] : [];
		});
		const tracked = new Set(await registry.filterTrackedSessionBrowserTabs({
			sessionKey: params.scope.sessionKey,
			route,
			profile,
			tabs,
			authority
		}));
		params.assertCurrent();
		const referenced = new Set((params.scope.referencedTabs ?? []).filter((tab) => {
			if (nodeRoute ? tab.target !== "node" || tab.node !== nodeRoute.nodeId : tab.target !== "host") return false;
			return normalizeOptionalLowercaseString(tab.profile ?? (nodeRoute ? !params.requestedProfile ? profile : void 0 : params.defaultProfile)) === profile;
		}).map((tab) => tab.targetId));
		return {
			...result,
			tabs: tabs.filter((tab) => tracked.has(tab) || referenced.has(tab.targetId) || Boolean(tab.tabId && referenced.has(tab.tabId))).map((tab) => tab.value)
		};
	}
	const sessionTabs = createBrowserToolSessionTabs({
		sessionKey: params.scope.sessionKey,
		requestedProfile: params.requestedProfile,
		defaultProfile: params.defaultProfile ?? "",
		nodeRoute,
		routeProfile: () => params.profile,
		registry,
		authority
	});
	if (openTab) await sessionTabs.trackOpened(params.result, params.closeTab);
	else if (closeTab) await sessionTabs.untrack(decodeURIComponent(params.path.slice(6)));
	else if (touchTab) await sessionTabs.touch(normalizeOptionalString(asNullableRecord(params.body)?.targetId));
	params.assertCurrent();
	return params.result;
}
//#endregion
//#region extensions/browser/src/gateway/browser-request.ts
const logger = createSubsystemLogger("browser");
const dashboardRequestSchema = object({
	sessionKey: string().trim().min(1),
	agentId: string().trim().min(1).optional(),
	name: string().regex(/^[a-z0-9][a-z0-9._-]{0,63}$/),
	instanceId: string().min(1).optional()
});
async function handleBrowserGatewayRequest({ params, respond, context, client, signal: invocationSignal, hasCurrentClientAuthority }) {
	const reject = (...error) => respond(false, void 0, errorShape(...error));
	const typed = params;
	const methodRaw = (normalizeOptionalString(typed.method) ?? "").toUpperCase();
	const path = normalizeBrowserRequestPath(normalizeOptionalString(typed.path) ?? "");
	let query = typed.query && typeof typed.query === "object" ? typed.query : void 0;
	let body = typed.body;
	const timeoutMs = clampTimerTimeoutMs(typed.timeoutMs);
	const explicitNode = typed.target === "node";
	const requestedNode = normalizeOptionalString(typed.node);
	const connectionSignal = client?.connectionSignal;
	const requestSignal = invocationSignal && connectionSignal && invocationSignal !== connectionSignal ? AbortSignal.any([invocationSignal, connectionSignal]) : invocationSignal ?? connectionSignal;
	const isRequesterCurrent = () => !requestSignal?.aborted && !client?.invalidated && !client?.connectionSignal?.aborted && hasCurrentClientAuthority?.() !== false;
	const assertRequesterCurrent = () => {
		requestSignal?.throwIfAborted();
		if (!isRequesterCurrent()) throw new Error("Browser requester is no longer active");
	};
	const parsedTabScope = typed.tabScope === void 0 ? void 0 : browserTabScopeSchema.safeParse(typed.tabScope);
	if (parsedTabScope && (!parsedTabScope.success || typed.dashboard !== void 0 || path === "/dashboard")) {
		reject(ErrorCodes.INVALID_REQUEST, "tabScope requires a valid session tab scope and cannot be combined with dashboard");
		return;
	}
	const tabScope = parsedTabScope?.data;
	if (typed.target !== void 0 && typed.target !== "host" && !explicitNode || typed.node !== void 0 && (!explicitNode || !requestedNode || typeof typed.node !== "string" || typed.node.length > 256)) {
		reject(ErrorCodes.INVALID_REQUEST, "target must be \"host\" or \"node\"; node requires target=\"node\" and a nonempty selector of at most 256 characters");
		return;
	}
	if (!methodRaw || !path) {
		reject(ErrorCodes.INVALID_REQUEST, "method and path are required");
		return;
	}
	if (methodRaw !== "GET" && methodRaw !== "POST" && methodRaw !== "DELETE") {
		reject(ErrorCodes.INVALID_REQUEST, "method must be GET, POST, or DELETE");
		return;
	}
	if (path === "/dashboard") {
		if (typed.target === "node" || requestedNode) {
			reject(ErrorCodes.INVALID_REQUEST, "Browser dashboards use a local managed browser on the Gateway host");
			return;
		}
		const request = dashboardRequestSchema.extend({ resume: boolean().optional() }).safeParse(methodRaw === "GET" ? query : body);
		if (!request.success) {
			reject(ErrorCodes.INVALID_REQUEST, "Browser dashboard requires sessionKey and a stable widget name");
			return;
		}
		try {
			respond(true, await (methodRaw === "DELETE" ? stopBrowserDashboard : methodRaw === "GET" ? inspectBrowserDashboard : requestBrowserDashboard)(request.data, {
				signal: requestSignal,
				assertCurrent: assertRequesterCurrent
			}));
		} catch (error) {
			reject(ErrorCodes.INVALID_REQUEST, String(error));
		}
		return;
	}
	let assertDashboardCurrent;
	if (typed.dashboard !== void 0) {
		const scope = dashboardRequestSchema.safeParse(typed.dashboard);
		if (!scope.success || explicitNode || requestedNode) {
			reject(ErrorCodes.INVALID_REQUEST, "Dashboard requests require a valid local dashboard identity");
			return;
		}
		try {
			const authority = {
				signal: requestSignal,
				assertCurrent: assertRequesterCurrent
			};
			const dashboard = await inspectBrowserDashboard(scope.data, authority);
			const tab = dashboard.browserTab;
			if (!tab || dashboard.paused) throw new Error("Dashboard browser is paused or unavailable. Resume the dashboard first.");
			if (path === "/tabs/open" || path === "/tabs/action" || path === "/start" || path === "/stop" || path === "/reset-profile" || path.startsWith("/profiles") || path.startsWith("/system-")) throw new Error("Use the dashboard controls to open or stop its retained tab");
			if (methodRaw === "DELETE" && path.startsWith("/tabs/") && decodeURIComponent(path.slice(6)) !== tab.targetId) throw new Error("Dashboard request cannot address another browser tab");
			const binding = {
				kind: "tab",
				tabId: 0,
				...tab
			};
			query = {
				...applyBrowserTabToolBinding(query ?? {}, binding),
				managedOnly: true
			};
			const bodyRecord = asNullableRecord(body);
			if (bodyRecord || methodRaw === "POST") body = applyBrowserTabToolBinding(bodyRecord ?? {}, binding);
			assertDashboardCurrent = (profile) => assertBrowserDashboardTargetCurrent(dashboard, scope.data.agentId, authority, profile);
			await assertDashboardCurrent();
		} catch (error) {
			reject(ErrorCodes.INVALID_REQUEST, String(error));
			return;
		}
	}
	const cfg = getRuntimeConfig();
	const configuredNode = normalizeOptionalString(cfg.gateway?.nodes?.browser?.node);
	const forceHostLocal = Boolean(assertDashboardCurrent) || isBrowserHostLocalRoute(methodRaw, path);
	if (forceHostLocal && explicitNode) {
		reject(ErrorCodes.INVALID_REQUEST, "this browser route must run on the Gateway host");
		return;
	}
	let nodeTarget = null;
	if (!forceHostLocal && typed.target !== "host") try {
		nodeTarget = await resolveBrowserNodeTarget({
			nodes: () => context.nodeRegistry.listConnected(),
			config: cfg,
			profile: resolveRequestedBrowserProfile({
				query,
				body
			}),
			explicitTarget: explicitNode,
			requestedNode
		});
		assertRequesterCurrent();
	} catch (err) {
		reject(ErrorCodes.UNAVAILABLE, String(err));
		return;
	}
	if (nodeTarget && path === "/screencast") {
		reject(ErrorCodes.INVALID_REQUEST, "browser screencast is not available over a node proxy", { details: {
			code: "SCREENCAST_UNSUPPORTED",
			reason: "node"
		} });
		return;
	}
	if (nodeTarget && isPersistentBrowserProfileMutation(methodRaw, path)) {
		reject(ErrorCodes.INVALID_REQUEST, "browser.request cannot mutate persistent browser profiles over a node proxy");
		return;
	}
	let preparedUpload = null;
	let proxyCommand = BROWSER_PROXY_COMMAND;
	if (nodeTarget) {
		if (isBrowserProxyUploadRequest({
			method: methodRaw,
			path,
			body
		}) && !nodeTarget.commands?.includes("browser.proxy.upload.v1")) {
			const message = browserProxyUploadUnavailableMessage(nodeTarget.declaredCommands);
			if (explicitNode || configuredNode) {
				reject(ErrorCodes.UNAVAILABLE, message);
				return;
			}
			logger.warn(`browser node ${nodeTarget.displayName ?? nodeTarget.nodeId} lacks ${BROWSER_PROXY_UPLOAD_COMMAND}; falling back to Gateway host`);
			nodeTarget = null;
		}
	}
	if (nodeTarget) {
		try {
			assertRequesterCurrent();
			preparedUpload = await prepareBrowserProxyUploadRequest({
				method: methodRaw,
				path,
				body,
				signal: requestSignal
			});
			assertRequesterCurrent();
		} catch (err) {
			const message = err instanceof Error ? err.message : String(err);
			reject(ErrorCodes.INVALID_REQUEST, message);
			return;
		}
		if (preparedUpload.upload) proxyCommand = BROWSER_PROXY_UPLOAD_COMMAND;
	}
	if (nodeTarget && preparedUpload) {
		const resolvedNodeTarget = nodeTarget;
		const allowlist = resolveNodeCommandAllowlist(cfg, nodeTarget);
		const allowed = isNodeCommandAllowed({
			command: proxyCommand,
			declaredCommands: nodeTarget.commands,
			allowlist
		});
		if (!allowed.ok) {
			const platform = nodeTarget.platform ?? "unknown";
			const hint = `node command not allowed: ${allowed.reason} (platform: ${platform}, command: ${proxyCommand})`;
			reject(ErrorCodes.INVALID_REQUEST, hint, { details: {
				reason: allowed.reason,
				command: proxyCommand
			} });
			return;
		}
		const { proxyTimeoutMs, nodeInvokeTimeoutMs } = resolveBrowserProxyTimeouts(timeoutMs);
		const invokeProxy = async (proxyRequest, command = BROWSER_PROXY_COMMAND) => {
			assertRequesterCurrent();
			const invoked = await context.nodeRegistry.invoke({
				nodeId: resolvedNodeTarget.nodeId,
				command,
				params: {
					...proxyRequest,
					timeoutMs: proxyTimeoutMs,
					errorEnvelope: BROWSER_PROXY_ERROR_ENVELOPE
				},
				timeoutMs: nodeInvokeTimeoutMs,
				signal: requestSignal,
				isDispatchAuthorized: isRequesterCurrent,
				idempotencyKey: crypto.randomUUID()
			});
			assertRequesterCurrent();
			return invoked;
		};
		const proxyParams = {
			method: methodRaw,
			path,
			query,
			body: preparedUpload.body,
			upload: preparedUpload.upload,
			profile: resolveRequestedBrowserProfile({
				query,
				body
			})
		};
		let res;
		try {
			res = await invokeProxy(proxyParams, proxyCommand);
		} catch (error) {
			reject(ErrorCodes.UNAVAILABLE, String(error));
			return;
		}
		if (!explicitNode && !configuredNode && isBrowserControlHostUnavailableError(res.error) && !res.ok) logger.warn(`browser node ${nodeTarget.displayName ?? nodeTarget.nodeId} control host unavailable; falling back to Gateway host`);
		else {
			if (!respondUnavailableOnNodeInvokeError(respond, res)) return;
			const payload = res.payloadJSON ? parseGatewayPayload(res.payloadJSON) : res.payload;
			const failure = parseBrowserProxyFailure(payload);
			if (failure) {
				const { status, body: errorBody } = failure.error;
				reject(status >= 500 ? ErrorCodes.UNAVAILABLE : ErrorCodes.INVALID_REQUEST, errorBody.error, { details: errorBody });
				return;
			}
			const proxy = payload && typeof payload === "object" ? payload : null;
			if (!proxy || !("result" in proxy)) {
				reject(ErrorCodes.UNAVAILABLE, "browser proxy failed");
				return;
			}
			try {
				const result = await persistBrowserProxyResultFiles(proxy.result, proxy.files);
				assertRequesterCurrent();
				const resolvedRoute = parseBrowserProxyRoute(proxy);
				const scopedResult = tabScope ? await applyBrowserRequestTabScope({
					scope: tabScope,
					method: methodRaw,
					path,
					body,
					result,
					nodeTarget,
					profile: resolvedRoute?.status === "resolved" ? resolvedRoute.profile : resolveRequestedBrowserProfile({
						query,
						body
					}),
					requestedProfile: resolveRequestedBrowserProfile({
						query,
						body
					}),
					assertCurrent: assertRequesterCurrent,
					closeTab: async (targetId, profile) => {
						const closed = await invokeProxy({
							method: "DELETE",
							path: `/tabs/${encodeURIComponent(targetId)}`,
							query: { targetIdMode: "raw" },
							profile
						});
						const closePayload = closed.payloadJSON ? parseGatewayPayload(closed.payloadJSON) : closed.payload;
						if (!closed.ok || parseBrowserProxyFailure(closePayload) || !asNullableRecord(closePayload)?.result) throw new Error("Failed to close newly opened browser node tab");
					}
				}) : result;
				assertRequesterCurrent();
				respond(true, scopedResult);
			} catch (error) {
				reject(ErrorCodes.UNAVAILABLE, tabScope ? String(error) : "browser proxy file transfer failed");
			}
			return;
		}
	}
	const ready = await startBrowserControlServiceFromConfig();
	if (!ready) {
		reject(ErrorCodes.UNAVAILABLE, await describeBrowserControlUnavailable());
		return;
	}
	let dispatcher;
	try {
		dispatcher = createBrowserRouteDispatcher(createBrowserControlContext());
	} catch (err) {
		reject(ErrorCodes.UNAVAILABLE, String(err));
		return;
	}
	const requesterSignal = connectionSignal;
	const requester = client && requesterSignal ? {
		connId: client.connId,
		signal: requesterSignal,
		isCurrent: () => client.invalidated !== true && !requesterSignal.aborted && hasCurrentClientAuthority?.() !== false
	} : void 0;
	let resolvedProfile;
	const assertCurrent = async (profile) => {
		assertRequesterCurrent();
		if (profile) resolvedProfile = profile.name;
		await assertDashboardCurrent?.(profile);
		assertRequesterCurrent();
	};
	const dispatch = (timeoutSignal) => dispatcher.dispatch({
		method: methodRaw,
		path,
		query,
		body,
		signal: timeoutSignal && requestSignal ? AbortSignal.any([timeoutSignal, requestSignal]) : timeoutSignal ?? requestSignal,
		...requester ? { requester } : {},
		assertCurrent
	});
	let result;
	try {
		await assertCurrent();
		result = timeoutMs ? await withTimeout(dispatch, timeoutMs, "browser request") : await dispatch();
	} catch (err) {
		reject(ErrorCodes.UNAVAILABLE, String(err));
		return;
	}
	if (result.status >= 400) {
		const message = result.body && typeof result.body === "object" && "error" in result.body ? String(result.body.error) : `browser request failed (${result.status})`;
		reject(result.status >= 500 ? ErrorCodes.UNAVAILABLE : ErrorCodes.INVALID_REQUEST, message, { details: result.body });
		return;
	}
	try {
		respond(true, tabScope ? await applyBrowserRequestTabScope({
			scope: tabScope,
			method: methodRaw,
			path,
			body,
			result: result.body,
			profile: resolvedProfile,
			requestedProfile: resolveRequestedBrowserProfile({
				query,
				body
			}),
			defaultProfile: ready.resolved.defaultProfile,
			assertCurrent: assertRequesterCurrent,
			closeTab: async (targetId, profile) => {
				assertRequesterCurrent();
				const closed = await dispatcher.dispatch({
					method: "DELETE",
					path: `/tabs/${encodeURIComponent(targetId)}`,
					query: {
						profile,
						targetIdMode: "raw"
					},
					signal: requestSignal,
					...requester ? { requester } : {},
					assertCurrent
				});
				assertRequesterCurrent();
				if (closed.status >= 400) throw new Error(`Failed to close newly opened browser tab (${closed.status})`);
			}
		}) : result.body);
	} catch (error) {
		reject(ErrorCodes.UNAVAILABLE, String(error));
	}
}
const browserHandlers = { "browser.request": handleBrowserGatewayRequest };
//#endregion
//#region extensions/browser/src/node-host/invoke-browser.ts
function readOwnedTabCloseRequest(value) {
	const record = asNullableRecord(value);
	const ownership = asNullableRecord(record?.ownership);
	if (ownership?.status !== "durable" || typeof ownership.nativeTargetId !== "string" || !ownership.nativeTargetId.trim() || typeof ownership.profileFingerprint !== "string" || !ownership.profileFingerprint.trim() || typeof ownership.browserInstanceFingerprint !== "string" || !ownership.browserInstanceFingerprint.trim()) throw new Error("INVALID_REQUEST: valid durable tab ownership required");
	return { ownership: {
		status: "durable",
		nativeTargetId: ownership.nativeTargetId.trim(),
		profileFingerprint: ownership.profileFingerprint.trim(),
		browserInstanceFingerprint: ownership.browserInstanceFingerprint.trim()
	} };
}
const BROWSER_PROXY_STATUS_TIMEOUT_MS = 750;
const BROWSER_PROXY_MAX_ENCODED_PAYLOAD_BYTES = 25165824;
function countBrowserProxyEncodedPayloadBytes(serialized) {
	let bytes = Buffer.byteLength(serialized, "utf8") + 2;
	for (const character of "\"\\") {
		const code = character.charCodeAt(0);
		let index = serialized.indexOf(character);
		while (index !== -1) {
			const end = Math.min(index + 128, serialized.length);
			for (; index < end; index++) if (serialized.charCodeAt(index) === code) bytes++;
			index = serialized.indexOf(character, index);
		}
	}
	const wellFormed = toUSVString(serialized);
	if (wellFormed !== serialized) {
		for (let index = wellFormed.indexOf("�"); index !== -1; index = wellFormed.indexOf("�", index + 1)) if (serialized.charCodeAt(index) !== 65533) bytes += 3;
	}
	return bytes;
}
function resolveBrowserProxyConfig(cfg = loadBrowserConfigForRuntimeRefresh()) {
	const proxy = cfg.nodeHost?.browserProxy;
	if (proxy?.enabled === false) throw new Error("UNAVAILABLE: node browser proxy disabled");
	return { allowProfiles: Array.isArray(proxy?.allowProfiles) ? normalizeStringEntries(proxy.allowProfiles) : [] };
}
let browserControlReady = null;
let admittedBrowserControlState = null;
function hasBrowserNodeHostWork() {
	return hasBrowserControlWork() || hasBrowserProxyUploadWork();
}
async function ensureBrowserControlService() {
	const current = getBrowserControlState();
	if (current && current === admittedBrowserControlState) return;
	if (browserControlReady) return browserControlReady;
	const sharedStartup = (async () => {
		const cfg = loadBrowserConfigForRuntimeRefresh();
		if (!resolveBrowserConfig(cfg.browser, cfg).enabled) throw new Error(await describeBrowserControlUnavailable(cfg));
		const started = await startBrowserControlServiceFromConfig();
		if (!started) throw new Error(await describeBrowserControlUnavailable(cfg));
		admittedBrowserControlState = started;
	})().finally(() => {
		if (browserControlReady === sharedStartup) browserControlReady = null;
	});
	browserControlReady = sharedStartup;
	return sharedStartup;
}
function collectBrowserProxyPaths(payload) {
	const paths = /* @__PURE__ */ new Set();
	visitBrowserProxyFilePaths(payload, (filePath) => {
		paths.add(filePath.trim());
		assertBrowserProxyFileCountWithinLimit(paths.size);
	});
	return [...paths];
}
async function readBrowserProxyFiles(filePaths) {
	const files = [];
	let totalBytes = 0;
	for (const filePath of filePaths) try {
		const stat = await fs.stat(filePath).catch(() => null);
		if (!stat || !stat.isFile()) throw new Error("file not found");
		assertBrowserProxyFileBytesWithinLimits(stat.size, totalBytes + stat.size);
		const buffer = await fs.readFile(filePath);
		assertBrowserProxyFileBytesWithinLimits(buffer.byteLength, totalBytes + buffer.byteLength);
		totalBytes += buffer.byteLength;
		const mimeType = await detectMime({
			buffer,
			filePath
		});
		files.push({
			path: filePath,
			base64: buffer.toString("base64"),
			mimeType
		});
	} catch (err) {
		throw new Error(`browser proxy file read failed for ${filePath}: ${String(err)}`, { cause: err });
	}
	return files;
}
function isBrowserProxyTimeoutError(err) {
	return String(err).includes("browser proxy request timed out");
}
function combineBrowserProxySignals(timeoutSignal, invocationSignal) {
	if (timeoutSignal && invocationSignal) return AbortSignal.any([timeoutSignal, invocationSignal]);
	return timeoutSignal ?? invocationSignal;
}
function isWsBackedBrowserProxyPath(path) {
	return path === "/act" || path === "/download" || path === "/navigate" || path === "/pdf" || path === "/screenshot" || path === "/snapshot" || path === "/wait/download";
}
async function readBrowserProxyStatus(params) {
	const query = params.profile ? { profile: params.profile } : {};
	try {
		const response = await withTimeout((signal) => params.dispatcher.dispatch({
			method: "GET",
			path: "/",
			query,
			signal
		}), BROWSER_PROXY_STATUS_TIMEOUT_MS, "browser proxy status");
		if (response.status >= 400 || !response.body || typeof response.body !== "object") return null;
		const body = response.body;
		return {
			running: body.running,
			transport: body.transport,
			cdpHttp: body.cdpHttp,
			cdpReady: body.cdpReady,
			cdpUrl: body.cdpUrl
		};
	} catch {
		return null;
	}
}
function formatBrowserProxyTimeoutMessage(params) {
	const parts = [`browser proxy timed out for ${params.method} ${params.path} after ${params.timeoutMs}ms`, params.wsBacked ? "ws-backed browser action" : "browser action"];
	if (params.profile) parts.push(`profile=${params.profile}`);
	if (params.status) {
		const statusParts = [
			`running=${String(params.status.running)}`,
			`cdpHttp=${String(params.status.cdpHttp)}`,
			`cdpReady=${String(params.status.cdpReady)}`
		];
		if (typeof params.status.transport === "string" && params.status.transport.trim()) statusParts.push(`transport=${params.status.transport}`);
		if (typeof params.status.cdpUrl === "string" && params.status.cdpUrl.trim()) statusParts.push(`cdpUrl=${redactCdpUrl(params.status.cdpUrl)}`);
		parts.push(`status(${statusParts.join(", ")})`);
	}
	return parts.join("; ");
}
async function runBrowserProxyCommand(paramsJSON, command = BROWSER_PROXY_COMMAND, invocationSignal) {
	invocationSignal?.throwIfAborted();
	ensureBrowserProxyUploadCleanup();
	if (!paramsJSON) throw new Error("INVALID_REQUEST: paramsJSON required");
	const params = JSON.parse(paramsJSON);
	if (command === "browser.proxy" && params.upload !== void 0) throw new Error("INVALID_REQUEST: browser.proxy does not accept upload envelopes");
	if (command === "browser.proxy.upload.v1" && !params.upload) throw new Error("INVALID_REQUEST: browser.proxy.upload.v1 requires an upload envelope");
	if (command !== "browser.proxy" && command !== "browser.proxy.upload.v1") throw new Error(`INVALID_REQUEST: unsupported browser proxy command: ${command}`);
	const pathValue = typeof params.path === "string" ? params.path.trim() : "";
	if (!pathValue) throw new Error("INVALID_REQUEST: path required");
	resolveBrowserProxyConfig();
	const method = typeof params.method === "string" ? params.method.trim().toUpperCase() : "GET";
	const path = normalizeBrowserRequestPath(pathValue);
	if (method !== "GET" && method !== "POST" && method !== "DELETE") throw new Error("INVALID_REQUEST: method must be GET, POST, or DELETE");
	if (path === "/__openclaw/session-tab/close-owned" && method !== "POST") throw new Error("INVALID_REQUEST: owned tab close requires POST");
	await ensureBrowserControlService();
	invocationSignal?.throwIfAborted();
	const cfg = loadBrowserConfigForRuntimeRefresh();
	const resolved = resolveBrowserConfig(cfg.browser, cfg);
	let body = params.body;
	const requestedProfile = resolveRequestedBrowserProfile({
		query: params.query,
		body,
		profile: params.profile
	}) ?? "";
	const effectiveProfile = path === "/profiles" ? "" : requestedProfile || resolved.defaultProfile;
	const effectiveResolvedProfile = effectiveProfile ? resolveProfile(resolved, effectiveProfile) : null;
	const route = effectiveResolvedProfile ? {
		status: "resolved",
		profile: effectiveProfile,
		driver: effectiveResolvedProfile.driver
	} : { status: "unavailable" };
	const includeRoute = params.errorEnvelope === BROWSER_PROXY_ERROR_ENVELOPE;
	const allowedProfiles = resolveBrowserProxyConfig(cfg).allowProfiles;
	if (isPersistentBrowserProfileMutation(method, path)) throw new Error("INVALID_REQUEST: browser.proxy cannot mutate persistent browser profiles");
	if (isBrowserHostLocalRoute(method, path)) throw new Error("INVALID_REQUEST: browser.proxy cannot run host-local browser routes");
	const assertCurrent = (profile) => {
		invocationSignal?.throwIfAborted();
		const current = resolveBrowserProxyConfig();
		const selected = profile?.name || effectiveProfile || requestedProfile;
		if ((path !== "/profiles" || selected) && current.allowProfiles.length > 0 && (!selected || !current.allowProfiles.includes(selected.trim()))) throw new Error("INVALID_REQUEST: browser profile not allowed");
	};
	assertCurrent();
	const timeoutMs = resolveBrowserProxyTimeoutMs(params.timeoutMs);
	const deadlineAt = Date.now() + timeoutMs;
	const timeoutDetails = {
		method,
		path,
		profile: requestedProfile || resolved.defaultProfile || void 0,
		timeoutMs,
		wsBacked: isWsBackedBrowserProxyPath(path)
	};
	const query = {};
	const rawQuery = params.query ?? {};
	for (const [key, value] of Object.entries(rawQuery)) {
		if (value === void 0 || value === null) continue;
		query[key] = typeof value === "string" ? value : String(value);
	}
	if (effectiveProfile || requestedProfile) query.profile = effectiveProfile || requestedProfile;
	if (path === "/__openclaw/session-tab/close-owned") {
		const request = readOwnedTabCloseRequest(body);
		const liveResolved = getBrowserControlState()?.resolved ?? resolved;
		const profile = resolveProfile(liveResolved, effectiveProfile);
		assertCurrent(profile ?? void 0);
		const result = profile?.cdpUrl && effectiveProfile ? await closeTrackedCdpTarget({
			profileName: effectiveProfile,
			cdpUrl: profile.cdpUrl,
			nativeTargetId: request.ownership.nativeTargetId,
			expectedProfileFingerprint: request.ownership.profileFingerprint,
			expectedBrowserInstanceFingerprint: request.ownership.browserInstanceFingerprint,
			timeoutMs: liveResolved.remoteCdpTimeoutMs,
			ssrfPolicy: resolveCdpControlPolicy(profile, liveResolved.ssrfPolicy),
			signal: invocationSignal,
			closeIfCurrent: async (dispatch) => {
				assertCurrent(profile);
				return await dispatch();
			}
		}) : { status: "ownership-mismatch" };
		return JSON.stringify({
			result,
			...includeRoute ? { route } : {}
		});
	}
	const dispatcher = createBrowserRouteDispatcher(createBrowserControlContext());
	let stagedUpload;
	try {
		stagedUpload = await withTimeout((timeoutSignal) => stageBrowserProxyUploadRequest({
			method,
			path,
			body,
			upload: params.upload,
			signal: combineBrowserProxySignals(timeoutSignal, invocationSignal)
		}), timeoutMs, "browser proxy request");
	} catch (err) {
		if (!isBrowserProxyTimeoutError(err)) throw err;
		throw new Error(formatBrowserProxyTimeoutMessage({
			...timeoutDetails,
			status: null
		}), { cause: err });
	}
	body = stagedUpload.body;
	try {
		assertCurrent();
	} catch (error) {
		await discardStagedBrowserProxyUpload(stagedUpload);
		throw error;
	}
	const remainingTimeoutMs = deadlineAt - Date.now();
	if (remainingTimeoutMs <= 0) {
		await discardStagedBrowserProxyUpload(stagedUpload);
		throw new Error(formatBrowserProxyTimeoutMessage({
			...timeoutDetails,
			status: null
		}));
	}
	let response;
	try {
		response = await withTimeout((timeoutSignal) => dispatcher.dispatch({
			method,
			path,
			query,
			body,
			signal: combineBrowserProxySignals(timeoutSignal, invocationSignal),
			assertCurrent: async (profile) => {
				assertCurrent(profile);
			}
		}), remainingTimeoutMs, "browser proxy request");
	} catch (err) {
		if (!isBrowserProxyTimeoutError(err)) throw err;
		const profileForStatus = requestedProfile || resolved.defaultProfile;
		const status = await readBrowserProxyStatus({
			dispatcher,
			profile: path === "/profiles" ? void 0 : profileForStatus
		});
		throw new Error(formatBrowserProxyTimeoutMessage({
			...timeoutDetails,
			profile: path === "/profiles" ? void 0 : profileForStatus || void 0,
			status
		}), { cause: err });
	}
	if (response.status >= 400) {
		await discardStagedBrowserProxyUpload(stagedUpload);
		if (params.errorEnvelope === "browser-v1") return JSON.stringify(createBrowserProxyFailure(response.status, response.body, route));
		const detail = response.body && typeof response.body === "object" && "error" in response.body ? String(response.body.error).trim() : "";
		throw new Error(detail ? `${response.status}: ${detail}` : `HTTP ${response.status}`);
	}
	const result = response.body;
	if (allowedProfiles.length > 0 && path === "/profiles") {
		const obj = typeof result === "object" && result !== null ? result : {};
		obj.profiles = (Array.isArray(obj.profiles) ? obj.profiles : []).filter((entry) => {
			if (!entry || typeof entry !== "object") return false;
			const name = entry.name;
			return typeof name === "string" && allowedProfiles.includes(name);
		});
	}
	const paths = collectBrowserProxyPaths(result);
	const files = paths.length > 0 ? await readBrowserProxyFiles(paths) : void 0;
	const payload = {
		result,
		...files ? { files } : {},
		...includeRoute ? { route } : {}
	};
	const serialized = JSON.stringify(payload);
	if (countBrowserProxyEncodedPayloadBytes(serialized) > BROWSER_PROXY_MAX_ENCODED_PAYLOAD_BYTES) throw new Error("browser proxy payload exceeds 24 MiB encoded limit");
	return serialized;
}
//#endregion
//#region extensions/browser/src/plugin-service.ts
const EAGER_BROWSER_CONTROL_SERVICE_ENV = "OPENCLAW_EAGER_BROWSER_CONTROL_SERVER";
const UNSAFE_BROWSER_CONTROL_OVERRIDE_SPECIFIER = /^(?:data|http|https|node):/i;
function validateBrowserControlOverrideSpecifier(specifier) {
	const trimmed = specifier.trim();
	if (UNSAFE_BROWSER_CONTROL_OVERRIDE_SPECIFIER.test(trimmed)) throw new Error(`Refusing unsafe browser control override specifier: ${trimmed}`);
	return trimmed;
}
function createBrowserPluginService(params) {
	let handle = null;
	return {
		id: "browser-control",
		start: async () => {
			if (!isTruthyEnvValue(process.env[EAGER_BROWSER_CONTROL_SERVICE_ENV])) return;
			if (handle) return;
			handle = await startLazyPluginServiceModule({
				skipEnvVar: "OPENCLAW_SKIP_BROWSER_CONTROL_SERVER",
				overrideEnvVar: "OPENCLAW_BROWSER_CONTROL_MODULE",
				validateOverrideSpecifier: validateBrowserControlOverrideSpecifier,
				loadDefaultModule: async () => await import("./server-BZhIBiLW.mjs"),
				startExportNames: ["startBrowserControlServiceFromConfig", "startBrowserControlServerFromConfig"],
				stopExportNames: ["stopBrowserControlService", "stopBrowserControlServer"]
			});
		},
		stop: async () => {
			const current = handle;
			if (current) {
				await current.stop();
				if (handle === current) handle = null;
				return;
			}
			await params.stopOnDemand();
		}
	};
}
//#endregion
export { handleBrowserGatewayRequest as a, browserHandlers as i, hasBrowserNodeHostWork as n, withTimeout as o, runBrowserProxyCommand as r, createBrowserTool as s, createBrowserPluginService as t };
