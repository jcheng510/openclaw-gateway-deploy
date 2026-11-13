import { o as normalizeLowercaseStringOrEmpty, t as hasNonEmptyString } from "../../string-coerce-6kR-86XC.mjs";
import { r as asNullableRecord } from "../../record-coerce-TIsquoVR.mjs";
import { o as hasConfiguredSecretInput } from "../../types.secrets-BXEuin38.mjs";
import { t as formatCliCommand } from "../../command-format-Cte1SWM4.mjs";
import { Et as _enum, Jn as string, Lt as boolean, Pn as number, Un as record, qn as strictObject, sr as unknown } from "../../schemas-BOYIvvln.mjs";
import { u as isPrivateIpAddress } from "../../ssrf-D9VemJFV.mjs";
import { t as ErrorCodes } from "../../gateway-error-details-DIefe7Zy.mjs";
import { f as errorShape } from "../../error-codes-DI20vDEB.mjs";
import "../../string-coerce-runtime-B1b8UNzb.mjs";
import "../../secret-input-7b-a2toH.mjs";
import "../../setup-tools-CLFs_KtI.mjs";
import { i as isPrivateNetworkOptInEnabled } from "../../ssrf-policy-YLHOH0uQ.mjs";
import "../../gateway-runtime-Bj4ovX3U.mjs";
import { n as redactCdpUrl } from "../../browser-cdp-DmzPHY2E.mjs";
import { $ as getOptionalBrowserStateRuntime, Q as getBrowserStateRuntime } from "../../session-tab-store-BxAwbW3e.mjs";
import { n as applyBrowserTabToolBinding } from "../../browser-tool-description-BtJwFF-H.mjs";
import { i as resolveBrowserConfig, r as isLocalManagedProfile, s as resolveProfile } from "../../config-uYvCVfSN.mjs";
import { n as resolveCdpControlPolicy } from "../../cdp-reachability-policy-DM3fLDJ4.mjs";
import { c as isProfileGenerationCurrent, o as getProfileLifecycle } from "../../server-context.lifecycle-HHiwjm_E.mjs";
import { n as getPwAiModule } from "../../pw-ai-module-uvQ04qzW.mjs";
import { n as browserNavigationPolicyForProfile } from "../../routes-BDgX_KfK.mjs";
import { t as createBrowserRouteDispatcher } from "../../dispatcher-mafzpFBt.mjs";
import { n as resolveBrowserControlAuth } from "../../control-auth-BPB3AO6C.mjs";
import { o as readBrowserDashboardDefinition, s as sameBrowserDashboardDefinition } from "../../browser-dashboard-jhPrbzff.mjs";
import { a as handleBrowserGatewayRequest, n as hasBrowserNodeHostWork, o as withTimeout, r as runBrowserProxyCommand, s as createBrowserTool, t as createBrowserPluginService } from "../../plugin-service-B8EvOnaF.mjs";
import { r as getBrowserControlState, t as createBrowserControlContext } from "../../browser-control-state-CeOhBv2V.mjs";
import { n as stopBrowserControlService, t as startBrowserControlServiceFromConfig } from "../../control-service-DbBxtjAV.mjs";
//#region extensions/browser/src/session-browser-dashboard.ts
const MAX_SESSION_DASHBOARDS = 64;
function keyFor(definition) {
	return JSON.stringify([
		definition.agentId,
		definition.sessionKey,
		definition.instanceId
	]);
}
function response(resource) {
	const definition = resource.definition;
	return {
		sessionKey: definition.sessionKey,
		name: definition.name,
		instanceId: definition.instanceId,
		revision: definition.revision,
		url: definition.url,
		title: definition.title,
		paused: resource.paused,
		stopping: false,
		...resource.page ? { browserTab: {
			target: "host",
			profile: definition.profile,
			targetId: resource.page.targetId
		} } : {}
	};
}
async function createResource(definition, authority, signal, operation) {
	const runtime = getBrowserStateRuntime();
	const resources = runtime.sessionDashboards ??= /* @__PURE__ */ new Map();
	if (resources.size >= MAX_SESSION_DASHBOARDS) throw new Error("The Gateway has reached its isolated dashboard limit. Remove an unused browser widget and retry.");
	const session = authority.retainSession();
	const controller = new AbortController();
	const key = keyFor(definition);
	let retired = false;
	let definitionPending = false;
	let definitionEpoch = 0;
	let page;
	let assertProfileCurrent;
	let removeProfileAbort;
	let closing;
	const close = () => {
		retired = true;
		controller.abort(/* @__PURE__ */ new Error("The isolated browser dashboard was retired."));
		session.signal.removeEventListener("abort", onAbort);
		session.release();
		removeProfileAbort?.();
		removeProfileAbort = void 0;
		if (!closing) closing = (async () => {
			await page?.close();
			if (resources.get(key) === resource) resources.delete(key);
		})().catch((error) => {
			closing = void 0;
			throw error;
		});
		return closing;
	};
	const assertCurrent = () => {
		session.assertCurrent();
		if (retired || getOptionalBrowserStateRuntime() !== runtime || page && !page.isCurrent()) throw new Error("The isolated browser context is no longer available. Reopen the dashboard.");
		assertProfileCurrent?.();
		if (definitionPending) throw new Error("The dashboard definition changed. Refresh the dashboard before continuing.");
	};
	const resource = {
		definition,
		session: authority.target,
		paused: operation === "stop",
		signal: controller.signal,
		assertCurrent,
		assertDefinitionCurrent: async () => {
			session.assertCurrent();
			const epoch = definitionEpoch;
			const current = await readBrowserDashboardDefinition(definition, getBrowserControlState()?.resolved.defaultProfile);
			session.assertCurrent();
			if (epoch !== definitionEpoch) throw new Error("The dashboard changed during verification. Retry the operation.");
			if (!sameBrowserDashboardDefinition(definition, current)) {
				await close();
				throw new Error("The dashboard was removed or replaced. Open its current definition.");
			}
			definitionPending = false;
			assertCurrent();
		},
		definitionChanged: () => {
			definitionPending = true;
			definitionEpoch += 1;
		},
		close
	};
	const onAbort = () => {
		close().catch(() => {});
	};
	session.signal.addEventListener("abort", onAbort, { once: true });
	resources.set(key, resource);
	try {
		authority.assertCurrent();
		signal?.throwIfAborted();
		if (operation === "open") {
			if (!await startBrowserControlServiceFromConfig()) throw new Error("Browser control is unavailable on this Gateway.");
			authority.assertCurrent();
			signal?.throwIfAborted();
			const context = createBrowserControlContext();
			if (definition.profile !== context.state().resolved.defaultProfile) throw new Error("Isolated session dashboards use the configured default managed profile. Remove the widget's custom profile before reopening it.");
			const profileContext = context.forProfile(definition.profile);
			if (!isLocalManagedProfile(profileContext.profile)) throw new Error("Isolated session dashboards require a local managed browser profile. Attached, extension and remote profiles are unsupported.");
			await profileContext.ensureBrowserAvailable({ signal });
			authority.assertCurrent();
			signal?.throwIfAborted();
			const state = getBrowserControlState();
			const profile = state?.profiles.get(definition.profile);
			if (!state || !profile) throw new Error("Browser profile is unavailable.");
			const lifecycle = getProfileLifecycle(profile);
			const generation = lifecycle.generation;
			const configRevision = lifecycle.configRevision;
			assertProfileCurrent = () => {
				if (getBrowserControlState() !== state || state.profiles.get(definition.profile) !== profile || !isProfileGenerationCurrent({
					state,
					runtime: profile,
					generation,
					configRevision
				})) throw new Error("The browser profile changed. Reopen the dashboard.");
			};
			lifecycle.controller.signal.addEventListener("abort", onAbort, { once: true });
			removeProfileAbort = () => lifecycle.controller.signal.removeEventListener("abort", onAbort);
			const playwright = await getPwAiModule({ mode: "strict" });
			authority.assertCurrent();
			assertProfileCurrent();
			if (!playwright) throw new Error("Isolated session dashboards require Playwright in this Gateway build.");
			page = await playwright.createPageViaPlaywright({
				cdpUrl: profileContext.profile.cdpUrl,
				url: definition.url,
				isolatedContext: true,
				assertCurrent: () => {
					authority.assertCurrent();
					assertCurrent();
				},
				...browserNavigationPolicyForProfile(context, profileContext),
				cdpPolicy: resolveCdpControlPolicy(profileContext.profile, state.resolved.ssrfPolicy),
				signal: signal ? AbortSignal.any([
					signal,
					session.signal,
					controller.signal
				]) : AbortSignal.any([session.signal, controller.signal])
			});
			resource.page = page;
			if (retired) {
				await page.close();
				throw new Error("The session browser was retired during startup.");
			}
			authority.assertCurrent();
			signal?.throwIfAborted();
			await resource.assertDefinitionCurrent();
			authority.assertCurrent();
		}
		assertCurrent();
		return resource;
	} catch (error) {
		await close();
		throw error;
	}
}
/** Same-widget requests serialize before allocation, so competing viewers never create shared-profile tabs. */
async function accessSessionBrowserDashboard(request, authority, options) {
	if (authority.sandboxRequired) throw new Error("This session requires a sandbox. The Gateway's isolated browser context does not provide a sandbox backend; ask an operator for a supported sandbox browser.");
	authority.assertCurrent();
	options.signal?.throwIfAborted();
	if (!await startBrowserControlServiceFromConfig()) throw new Error("Browser control is unavailable on this Gateway.");
	authority.assertCurrent();
	const definition = await readBrowserDashboardDefinition(request, getBrowserControlState()?.resolved.defaultProfile);
	authority.assertCurrent();
	options.signal?.throwIfAborted();
	if (!definition || definition.sessionKey !== authority.target.sessionKey || definition.agentId !== authority.target.agentId) throw new Error("The browser dashboard is missing, invalid or belongs to a different session.");
	const runtime = getBrowserStateRuntime();
	const key = keyFor(definition);
	const operationKey = `session:${key}`;
	const previous = runtime.dashboardOperations.get(operationKey)?.promise;
	const promise = (async () => {
		await previous?.catch(() => {});
		authority.assertCurrent();
		options.signal?.throwIfAborted();
		if (getOptionalBrowserStateRuntime() !== runtime) throw new Error("Browser runtime changed.");
		const currentDefinition = await readBrowserDashboardDefinition({
			...request,
			instanceId: definition.instanceId
		}, getBrowserControlState()?.resolved.defaultProfile);
		authority.assertCurrent();
		options.signal?.throwIfAborted();
		if (getOptionalBrowserStateRuntime() !== runtime) throw new Error("Browser runtime changed.");
		if (!sameBrowserDashboardDefinition(definition, currentDefinition)) throw new Error("The dashboard changed before this operation. Open its current definition.");
		let resource = runtime.sessionDashboards?.get(key);
		if (resource && (!sameBrowserDashboardDefinition(resource.definition, definition) || resource.session.sessionId !== authority.target.sessionId || resource.session.lifecycleRevision !== authority.target.lifecycleRevision)) {
			await resource.close();
			resource = void 0;
		}
		if (resource) {
			try {
				await resource.assertDefinitionCurrent();
			} catch (error) {
				if (resource.page && !resource.page.isCurrent()) await resource.close();
				throw error;
			}
			authority.assertCurrent();
		}
		if (resource && (options.operation === "stop" || options.operation === "open" && (options.resume && resource.paused || !resource.page && !resource.paused))) {
			await resource.close();
			resource = void 0;
			authority.assertCurrent();
		}
		if (!resource) resource = await createResource(definition, authority, options.signal, options.operation);
		authority.assertCurrent();
		resource.assertCurrent();
		return {
			response: response(resource),
			resource
		};
	})();
	const operation = { promise };
	runtime.dashboardOperations.set(operationKey, operation);
	try {
		return await promise;
	} finally {
		if (runtime.dashboardOperations.get(operationKey) === operation) runtime.dashboardOperations.delete(operationKey);
	}
}
//#endregion
//#region extensions/browser/src/gateway/session-browser-request.ts
const identitySchema = strictObject({
	name: string().regex(/^[a-z0-9][a-z0-9._-]{0,63}$/),
	instanceId: string().min(1).optional(),
	sessionKey: string().optional(),
	agentId: string().optional(),
	resume: boolean().optional()
});
const requestSchema = strictObject({
	sessionKey: string().min(1),
	agentId: string().min(1).optional(),
	method: _enum([
		"GET",
		"POST",
		"DELETE"
	]),
	path: string(),
	timeoutMs: number().finite().positive().optional(),
	dashboard: identitySchema.optional(),
	query: record(string(), unknown()).optional(),
	body: record(string(), unknown()).optional()
});
const routes = /* @__PURE__ */ new Set([
	"GET /tabs",
	"GET /snapshot",
	"POST /screenshot",
	"POST /navigate",
	"POST /tabs/focus",
	"POST /act",
	"POST /screencast"
]);
const actions = /* @__PURE__ */ new Set([
	"click",
	"clickCoords",
	"type",
	"press",
	"hover",
	"scrollIntoView",
	"drag",
	"select",
	"fill",
	"resize",
	"wait",
	"evaluate",
	"insertText"
]);
const selectors = [
	"targetId",
	"profile",
	"target",
	"node"
];
/** Closed session route: it never forwards profile, tab, file, cookie or host administration. */
const handleSessionBrowserGatewayRequest = async (options) => {
	const { respond, sessionAccessAuthority: authority, signal: requestSignal, client } = options;
	try {
		if (!authority) throw new Error("Session browser access requires Gateway session admission.");
		const params = requestSchema.parse(options.params);
		await withTimeout(async (timeoutSignal) => {
			const signal = timeoutSignal && requestSignal ? AbortSignal.any([timeoutSignal, requestSignal]) : timeoutSignal ?? requestSignal;
			const identity = identitySchema.parse(params.dashboard ?? (params.method === "GET" ? params.query : params.body));
			if (identity.sessionKey !== void 0 && identity.sessionKey !== params.sessionKey || identity.agentId !== void 0 && identity.agentId !== authority.target.agentId) throw new Error("Dashboard identity must match the admitted session.");
			const assertInvocation = () => {
				signal?.throwIfAborted();
				authority.assertCurrent();
			};
			assertInvocation();
			const dashboard = params.path === "/dashboard";
			if (!dashboard && !routes.has(`${params.method} ${params.path}`)) throw new Error("This operation is unavailable in an isolated session browser.");
			if (!dashboard && [params.query, params.body].some((record) => record && selectors.some((key) => Object.hasOwn(record, key)))) throw new Error("Session browser requests cannot select a browser profile or target.");
			if (params.path === "/act" && (typeof params.body?.kind !== "string" || !actions.has(params.body.kind))) throw new Error("This action is unavailable in an isolated session browser.");
			const { response, resource } = await accessSessionBrowserDashboard({
				sessionKey: params.sessionKey,
				agentId: authority.target.agentId,
				name: identity.name,
				instanceId: identity.instanceId
			}, authority, {
				operation: dashboard ? params.method === "POST" ? "open" : params.method === "DELETE" ? "stop" : "inspect" : "inspect",
				resume: identity.resume ?? params.body?.resume === true,
				signal
			});
			assertInvocation();
			if (dashboard) {
				respond(true, response);
				return;
			}
			const tab = response.browserTab;
			if (!tab || response.paused) throw new Error("The session browser is paused or unavailable. Resume the dashboard first.");
			const context = createBrowserControlContext();
			const assertCurrent = () => {
				assertInvocation();
				resource.assertCurrent();
			};
			assertCurrent();
			if (params.path === "/tabs") {
				const tabs = await context.forProfile(tab.profile).listTabs({ signal });
				assertCurrent();
				respond(true, {
					running: true,
					tabs: tabs.filter((entry) => entry.targetId === tab.targetId)
				});
				return;
			}
			const binding = {
				kind: "tab",
				tabId: 0,
				...tab
			};
			const query = {
				...applyBrowserTabToolBinding(params.query ?? {}, binding),
				managedOnly: true
			};
			const body = applyBrowserTabToolBinding(params.body ?? {}, binding);
			const result = await createBrowserRouteDispatcher(context).dispatch({
				method: params.method,
				path: params.path,
				query,
				body,
				signal,
				assertCurrent,
				screencastAuthority: {
					signal: resource.signal,
					assertCurrent: resource.assertCurrent,
					retainRequester: () => {
						assertInvocation();
						resource.assertCurrent();
						const borrow = authority.retain();
						const viewerSignal = AbortSignal.any([
							borrow.signal,
							resource.signal,
							...client?.connectionSignal ? [client.connectionSignal] : []
						]);
						return {
							signal: viewerSignal,
							release: borrow.release,
							isCurrent: () => {
								try {
									viewerSignal.throwIfAborted();
									borrow.assertCurrent();
									resource.assertCurrent();
									return client?.invalidated !== true;
								} catch {
									return false;
								}
							}
						};
					}
				}
			});
			assertCurrent();
			if (result.status >= 400) {
				const payload = asNullableRecord(result.body);
				respond(false, void 0, errorShape(result.status >= 500 ? ErrorCodes.UNAVAILABLE : ErrorCodes.INVALID_REQUEST, typeof payload?.error === "string" ? payload.error : "Session browser request failed.", { details: result.body }));
				return;
			}
			respond(true, result.body);
		}, params.timeoutMs, "session browser request");
	} catch (error) {
		respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, error instanceof Error ? error.message : String(error)));
	}
};
//#endregion
//#region extensions/browser/src/security-audit.ts
const BLOCKED_HOSTNAMES = /* @__PURE__ */ new Set([
	"localhost",
	"localhost.localdomain",
	"metadata.google.internal"
]);
function isTrustedPrivateHostname(hostname) {
	const normalized = normalizeLowercaseStringOrEmpty(hostname);
	return normalized.length > 0 && BLOCKED_HOSTNAMES.has(normalized);
}
function collectBrowserSecurityAuditFindings(ctx) {
	const findings = [];
	let resolved;
	try {
		resolved = resolveBrowserConfig(ctx.config.browser, ctx.config);
	} catch (err) {
		findings.push({
			checkId: "browser.control_invalid_config",
			severity: "warn",
			title: "Browser control config looks invalid",
			detail: String(err),
			remediation: `Fix browser.cdpUrl in ${ctx.configPath} and re-run "${formatCliCommand("openclaw security audit --deep")}".`
		});
		return findings;
	}
	if (!resolved.enabled) return findings;
	if (resolved.extensionRelay.allowLegacyAuth) findings.push({
		checkId: "browser.extension_relay_legacy_auth",
		severity: "warn",
		title: "Legacy browser extension relay authentication is enabled",
		detail: "browser.extensionRelay.allowLegacyAuth defaults to true for one migration window, so old relay Bearer, Basic, and token-subprotocol clients can still authenticate.",
		remediation: "Update paired Chrome extensions and external CDP clients to Browser Relay Authentication v2, then set browser.extensionRelay.allowLegacyAuth=false."
	});
	const browserAuth = resolveBrowserControlAuth(ctx.config, ctx.env);
	const explicitAuthMode = ctx.config.gateway?.auth?.mode;
	const tokenConfigured = Boolean(browserAuth.token) || hasNonEmptyString(ctx.env.OPENCLAW_GATEWAY_TOKEN) || hasConfiguredSecretInput(ctx.config.gateway?.auth?.token, ctx.config.secrets?.defaults);
	const passwordCanWin = explicitAuthMode === "password" || explicitAuthMode !== "token" && explicitAuthMode !== "none" && explicitAuthMode !== "trusted-proxy" && !tokenConfigured;
	const passwordConfigured = Boolean(browserAuth.password) || passwordCanWin && (hasNonEmptyString(ctx.env.OPENCLAW_GATEWAY_PASSWORD) || hasConfiguredSecretInput(ctx.config.gateway?.auth?.password, ctx.config.secrets?.defaults));
	if (!tokenConfigured && !passwordConfigured) findings.push({
		checkId: "browser.control_no_auth",
		severity: "critical",
		title: "Browser control has no auth",
		detail: "Browser control HTTP routes are enabled but no gateway.auth token/password is configured. Any local process (or SSRF to loopback) can call browser control endpoints.",
		remediation: "Set gateway.auth.token (recommended) or gateway.auth.password so browser control HTTP routes require authentication. Restarting the gateway will auto-generate gateway.auth.token when browser control is enabled."
	});
	for (const name of Object.keys(resolved.profiles)) {
		const profile = resolveProfile(resolved, name);
		if (!profile || profile.cdpIsLoopback) continue;
		let url;
		try {
			url = new URL(profile.cdpUrl);
		} catch {
			continue;
		}
		const redactedCdpUrl = redactCdpUrl(profile.cdpUrl) ?? profile.cdpUrl;
		if (url.protocol === "http:") findings.push({
			checkId: "browser.remote_cdp_http",
			severity: "warn",
			title: "Remote CDP uses HTTP",
			detail: `browser profile "${name}" uses http CDP (${redactedCdpUrl}); this is OK only if it's tailnet-only or behind an encrypted tunnel.`,
			remediation: "Prefer HTTPS/TLS or a tailnet-only endpoint for remote CDP."
		});
		if (isPrivateNetworkOptInEnabled(resolved.ssrfPolicy) && (isTrustedPrivateHostname(url.hostname) || isPrivateIpAddress(url.hostname))) findings.push({
			checkId: "browser.remote_cdp_private_host",
			severity: "warn",
			title: "Remote CDP targets a private/internal host",
			detail: `browser profile "${name}" points at a private/internal CDP host (${redactedCdpUrl}). This is expected for LAN/tailnet/WSL-style setups, but treat it as a trusted-network endpoint.`,
			remediation: "Prefer a tailnet or tunnel for remote CDP. If you want strict blocking, set browser.ssrfPolicy.dangerouslyAllowPrivateNetwork=false and allow only explicit hosts."
		});
	}
	return findings;
}
//#endregion
export { collectBrowserSecurityAuditFindings, createBrowserPluginService, createBrowserTool, handleBrowserGatewayRequest, handleSessionBrowserGatewayRequest, hasBrowserNodeHostWork, runBrowserProxyCommand, stopBrowserControlService };
