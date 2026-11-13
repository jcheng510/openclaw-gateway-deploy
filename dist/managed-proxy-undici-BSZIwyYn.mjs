import { l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { n as getActiveManagedProxyTlsOptions, r as getActiveManagedProxyUrl } from "./active-proxy-state-fUgx64cL.mjs";
import { s as resolveEnvHttpProxyUrl } from "./proxy-env-DxV5eJIK.mjs";
import { readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
//#region src/infra/net/proxy/proxy-tls.ts
function isHttpsProxyUrl(value) {
	if (!value) return false;
	try {
		return new URL(value).protocol === "https:";
	} catch {
		return false;
	}
}
/** Returns a CA file only for HTTPS proxy URLs; HTTP proxies do not need TLS trust. */
function resolveManagedProxyCaFileForUrl(params) {
	if (!isHttpsProxyUrl(params.proxyUrl)) return;
	return normalizeOptionalString(params.caFileOverride) ?? normalizeOptionalString(params.config?.tls?.caFile);
}
/** Loads managed proxy TLS options asynchronously for startup paths. */
async function loadManagedProxyTlsOptions(caFile) {
	if (!caFile) return;
	try {
		return { ca: await readFile(caFile, "utf8") };
	} catch (err) {
		throw new Error(`proxy CA file could not be read (${caFile}): ${formatErrorMessage(err)}`, { cause: err });
	}
}
/** Loads managed proxy TLS options synchronously for inherited child-process routing. */
function loadManagedProxyTlsOptionsSync(caFile) {
	if (!caFile) return;
	try {
		return { ca: readFileSync(caFile, "utf8") };
	} catch (err) {
		throw new Error(`proxy CA file could not be read (${caFile}): ${formatErrorMessage(err)}`, { cause: err });
	}
}
//#endregion
//#region src/infra/net/proxy/active-managed-proxy-tls.ts
const MANAGED_PROXY_ENV_PREFIX = ["OPENCLAW", "PROXY"].join("_");
const MANAGED_PROXY_ACTIVE_ENV_KEY = `${MANAGED_PROXY_ENV_PREFIX}_ACTIVE`;
const MANAGED_PROXY_CA_FILE_ENV_KEY = `${MANAGED_PROXY_ENV_PREFIX}_CA_FILE`;
function normalizeProxyUrl(value) {
	if (!value) return;
	try {
		return new URL(value).href;
	} catch {
		return;
	}
}
function resolveManagedProxyUrl(env = process.env) {
	const activeProxyUrl = getActiveManagedProxyUrl();
	if (activeProxyUrl) return activeProxyUrl.href;
	if (env[MANAGED_PROXY_ACTIVE_ENV_KEY] !== "1") return;
	return normalizeProxyUrl(resolveEnvHttpProxyUrl("https", env));
}
/** Resolves managed proxy TLS trust only when the target proxy is OpenClaw's active proxy. */
function resolveActiveManagedProxyTlsOptions(params) {
	const env = params?.env ?? process.env;
	const managedProxyUrl = resolveManagedProxyUrl(env);
	const targetProxyUrl = normalizeProxyUrl(params?.proxyUrl ?? resolveEnvHttpProxyUrl("https", env));
	if (!managedProxyUrl || targetProxyUrl !== managedProxyUrl) return;
	const activeProxyTls = getActiveManagedProxyTlsOptions();
	if (activeProxyTls) return activeProxyTls;
	const proxyCaFile = resolveManagedProxyCaFileForUrl({
		proxyUrl: managedProxyUrl,
		caFileOverride: env[MANAGED_PROXY_CA_FILE_ENV_KEY]
	});
	try {
		return loadManagedProxyTlsOptionsSync(proxyCaFile);
	} catch {
		return;
	}
}
//#endregion
//#region src/infra/net/proxy/managed-proxy-undici.ts
function readProxyTlsRecord(options) {
	if (!options || !("proxyTls" in options)) return;
	return isRecord(options.proxyTls) ? options.proxyTls : void 0;
}
function readProxyUrlFromOptions(options) {
	if (!options) return;
	if ("uri" in options) {
		const uri = options.uri;
		return uri instanceof URL ? uri.href : typeof uri === "string" ? uri : void 0;
	}
	if ("httpsProxy" in options || "httpProxy" in options) {
		const httpsProxy = Reflect.get(options, "httpsProxy");
		const httpProxy = Reflect.get(options, "httpProxy");
		return typeof httpsProxy === "string" ? httpsProxy : typeof httpProxy === "string" ? httpProxy : void 0;
	}
}
function addActiveManagedProxyTlsOptions(options, params) {
	const proxyTls = resolveActiveManagedProxyTlsOptions({
		proxyUrl: readProxyUrlFromOptions(options),
		env: params?.env
	});
	if (!proxyTls) return options;
	const existingProxyTls = readProxyTlsRecord(options);
	return {
		...options,
		proxyTls: {
			...proxyTls,
			...existingProxyTls
		}
	};
}
//#endregion
export { resolveManagedProxyCaFileForUrl as a, loadManagedProxyTlsOptionsSync as i, resolveActiveManagedProxyTlsOptions as n, loadManagedProxyTlsOptions as r, addActiveManagedProxyTlsOptions as t };
