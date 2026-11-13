import { l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { i as logWarn } from "./logger-DmolGPgx.mjs";
import { o as resolveEnvHttpProxyAgentOptions } from "./proxy-env-DxV5eJIK.mjs";
import { a as loadUndiciRuntimeDeps, n as createHttp1EnvHttpProxyAgent, r as createHttp1ProxyAgent } from "./undici-runtime-CqYpdl7N.mjs";
import { t as fetchWithPreparedRuntimeDispatcher } from "./runtime-fetch-DkWhaX5J.mjs";
//#region src/infra/net/proxy-fetch.ts
/** Non-enumerable marker used to recover the explicit proxy URL from proxy fetch wrappers. */
const PROXY_FETCH_PROXY_URL = Symbol.for("openclaw.proxyFetch.proxyUrl");
/**
* Create a fetch function that routes requests through the given HTTP proxy.
* Uses undici's ProxyAgent under the hood.
*/
function makeProxyFetch(proxyUrl) {
	const runtimeDeps = loadUndiciRuntimeDeps();
	let agent = null;
	const proxyFetch = (input, init) => {
		agent ??= createHttp1ProxyAgent({ uri: proxyUrl });
		return fetchWithPreparedRuntimeDispatcher(runtimeDeps, input, {
			...init,
			dispatcher: agent
		});
	};
	Object.defineProperty(proxyFetch, PROXY_FETCH_PROXY_URL, { value: proxyUrl });
	return proxyFetch;
}
/** Return the explicit proxy URL attached by {@link makeProxyFetch}, if present. */
function getProxyUrlFromFetch(fetchImpl) {
	const proxyUrl = fetchImpl?.[PROXY_FETCH_PROXY_URL];
	return normalizeOptionalString(proxyUrl);
}
/**
* Resolve a proxy-aware fetch from standard environment variables.
* Respects NO_PROXY / no_proxy exclusions via undici's EnvHttpProxyAgent.
* Returns undefined when no proxy is configured.
* Gracefully returns undefined if the proxy URL is malformed.
*/
function resolveProxyFetchFromEnv(env = process.env) {
	const proxyOptions = resolveEnvHttpProxyAgentOptions(env);
	if (!proxyOptions) return;
	try {
		const runtimeDeps = loadUndiciRuntimeDeps();
		const agent = createHttp1EnvHttpProxyAgent(proxyOptions, void 0, env);
		return ((input, init) => fetchWithPreparedRuntimeDispatcher(runtimeDeps, input, {
			...init,
			dispatcher: agent
		}));
	} catch (err) {
		logWarn(`Proxy env var set but agent creation failed — falling back to direct fetch: ${formatErrorMessage(err)}`);
		return;
	}
}
//#endregion
export { resolveProxyFetchFromEnv as i, getProxyUrlFromFetch as n, makeProxyFetch as r, PROXY_FETCH_PROXY_URL as t };
