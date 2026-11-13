import { a as matchesNoProxy, o as resolveEnvHttpProxyAgentOptions } from "./proxy-env-DxV5eJIK.mjs";
import { n as resolveActiveManagedProxyTlsOptions } from "./managed-proxy-undici-BSZIwyYn.mjs";
import { createRequire } from "node:module";
import { isIPv6 } from "node:net";
//#region src/infra/net/node-proxy-agent.ts
const UNSUPPORTED_PROXY_PROTOCOL_MESSAGE = "Unsupported proxy protocol. SOCKS and PAC proxy URLs are not supported; use an HTTP or HTTPS proxy URL.";
const require = createRequire(import.meta.url);
function proxyUrlWithDefaultScheme(proxyUrl, protocol) {
	const withScheme = proxyUrl.includes("://") ? proxyUrl : `${protocol}://${proxyUrl}`;
	let parsed;
	try {
		parsed = new URL(withScheme);
	} catch {
		throw new Error("Invalid proxy URL. Use an HTTP or HTTPS proxy URL.");
	}
	if (parsed.protocol !== "http:" && parsed.protocol !== "https:") throw new Error(`${UNSUPPORTED_PROXY_PROTOCOL_MESSAGE} Got ${parsed.protocol}`);
	return parsed;
}
function fixedProxyEnv(proxyUrl) {
	const href = proxyUrl.href;
	return {
		HTTP_PROXY: href,
		HTTPS_PROXY: href,
		ALL_PROXY: void 0,
		NO_PROXY: void 0,
		http_proxy: void 0,
		https_proxy: void 0,
		all_proxy: void 0,
		no_proxy: void 0
	};
}
function loadProxyline() {
	return require("@openclaw/proxyline");
}
function applyNodeAgentOptions(agent, options) {
	if (options === void 0) return;
	const agentWithOptions = agent;
	agentWithOptions.options = {
		...agentWithOptions.options,
		...options
	};
	if (typeof options.keepAlive === "boolean") agentWithOptions.keepAlive = options.keepAlive;
	for (const key of [
		"keepAliveMsecs",
		"maxFreeSockets",
		"maxSockets",
		"maxTotalSockets",
		"timeout"
	]) if (typeof options[key] === "number") agentWithOptions[key] = options[key];
	if (options.scheduling === "fifo" || options.scheduling === "lifo") agentWithOptions.scheduling = options.scheduling;
}
/** Resolves the env proxy URL that should be used for a specific Node target. */
function resolveEnvNodeProxyUrlForTarget(targetUrl, env = process.env) {
	return resolveEnvNodeProxyTarget(targetUrl, env)?.proxyUrl;
}
function resolveEnvNodeProxyTarget(targetUrl, env = process.env) {
	let target;
	try {
		target = new URL(targetUrl instanceof URL ? targetUrl.href : targetUrl);
	} catch {
		return;
	}
	if (target.protocol === "ws:") target.protocol = "http:";
	else if (target.protocol === "wss:") target.protocol = "https:";
	let protocol;
	if (target.protocol === "http:") protocol = "http";
	else if (target.protocol === "https:") protocol = "https";
	else return;
	if (matchesNoProxy(target, env)) return;
	const proxyOptions = resolveEnvHttpProxyAgentOptions(env);
	const proxyUrl = protocol === "https" ? proxyOptions?.httpsProxy : proxyOptions?.httpProxy;
	return proxyUrl ? {
		proxyUrl: proxyUrlWithDefaultScheme(proxyUrl, protocol),
		protocol
	} : void 0;
}
function createFixedNodeProxyAgent(proxyUrl, options = {}) {
	const parsedProxyUrl = proxyUrl instanceof URL ? proxyUrl : proxyUrlWithDefaultScheme(proxyUrl, options.protocol ?? "https");
	const proxyConnect = options.proxyConnect;
	const agent = loadProxyline().createAmbientNodeProxyAgent({
		env: fixedProxyEnv(parsedProxyUrl),
		protocol: options.protocol ?? "https",
		...options.proxyTls !== void 0 ? { proxyTls: options.proxyTls } : {},
		...proxyConnect !== void 0 ? { resolveProxyConnectOptions: () => proxyConnect } : {}
	});
	if (agent === void 0) throw new Error(`${UNSUPPORTED_PROXY_PROTOCOL_MESSAGE} Got ${parsedProxyUrl.protocol}`);
	applyNodeAgentOptions(agent, options.agentOptions);
	return agent;
}
function createPerRequestEnvProxyAgent(options) {
	const env = { ...process.env };
	const proxies = resolveEnvHttpProxyAgentOptions(env);
	if (!proxies) return;
	const routes = /* @__PURE__ */ new Map();
	const agents = [];
	for (const protocol of ["http", "https"]) {
		const value = protocol === "http" ? proxies.httpProxy : proxies.httpsProxy;
		if (!value) continue;
		try {
			const proxyUrl = proxyUrlWithDefaultScheme(value, protocol);
			const agent = createFixedNodeProxyAgent(proxyUrl, {
				protocol: options.protocol,
				proxyTls: resolveActiveManagedProxyTlsOptions({
					proxyUrl: proxyUrl.href,
					env
				}),
				agentOptions: options.agentOptions,
				proxyConnect: options.proxyConnect
			});
			routes.set(protocol, agent.addRequest.bind(agent));
			agents.push(agent);
		} catch (error) {
			routes.set(protocol, () => {
				throw error;
			});
		}
	}
	const { ProxylineNodeProxyAgent } = loadProxyline();
	const router = new ProxylineNodeProxyAgent({
		...options.agentOptions,
		defaultProtocol: options.protocol ?? "https",
		getProxyForUrl: () => ""
	});
	const directRequest = router.addRequest.bind(router);
	router.addRequest = (request, requestOptions) => {
		const protocol = request.protocol === "https:" ? "https" : "http";
		const host = isIPv6(request.host) ? `[${request.host}]` : request.host;
		const target = new URL(`${request.protocol}//${host}`);
		if (requestOptions.port) target.port = String(requestOptions.port);
		const route = matchesNoProxy(target, env) ? void 0 : routes.get(protocol);
		if (route) route(request, requestOptions);
		else directRequest(request, requestOptions);
	};
	const destroyRouter = router.destroy.bind(router);
	router.destroy = () => {
		for (const agent of agents) agent.destroy();
		destroyRouter();
	};
	return router;
}
function createNodeProxyAgent(options) {
	if (options.mode === "explicit") return createFixedNodeProxyAgent(options.proxyUrl, {
		protocol: options.protocol,
		agentOptions: options.agentOptions,
		proxyConnect: options.proxyConnect
	});
	if (options.targetUrl === void 0) return createPerRequestEnvProxyAgent(options);
	const target = resolveEnvNodeProxyTarget(options.targetUrl);
	if (target === void 0) return;
	return createFixedNodeProxyAgent(target.proxyUrl, {
		protocol: options.protocol ?? target.protocol,
		proxyTls: resolveActiveManagedProxyTlsOptions({ proxyUrl: target.proxyUrl.href }),
		agentOptions: options.agentOptions,
		proxyConnect: options.proxyConnect
	});
}
/** Builds paired HTTP and HTTPS agents for libraries that require both slots. */
function createFixedNodeProxyAgentPair(proxyUrl) {
	const parsedProxyUrl = proxyUrl instanceof URL ? proxyUrl : proxyUrlWithDefaultScheme(proxyUrl, "https");
	const proxyTls = resolveActiveManagedProxyTlsOptions({ proxyUrl: parsedProxyUrl.href });
	return {
		httpAgent: createFixedNodeProxyAgent(parsedProxyUrl, {
			protocol: "http",
			proxyTls
		}),
		httpsAgent: createFixedNodeProxyAgent(parsedProxyUrl, {
			protocol: "https",
			proxyTls
		})
	};
}
//#endregion
export { createNodeProxyAgent as n, resolveEnvNodeProxyUrlForTarget as r, createFixedNodeProxyAgentPair as t };
