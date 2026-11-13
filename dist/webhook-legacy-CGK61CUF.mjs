import { C as parseStrictNonNegativeInteger } from "./number-coercion-Dq1l5muL.mjs";
import "./number-runtime-DyNDaYIV.mjs";
import { c as createFixedWindowRateLimiter, o as WEBHOOK_RATE_LIMIT_DEFAULTS, r as webhook_ingress_exports } from "./webhook-ingress-DWyOaUd8.mjs";
import { r as applyBasicWebhookRequestGuards } from "./webhook-request-guards-CTunXcRc.mjs";
import net from "node:net";
//#region extensions/telegram/src/webhook-legacy.ts
const telegramWebhookHost = webhook_ingress_exports;
function parseIpLiteral(value) {
	const trimmed = value?.trim();
	if (!trimmed) return;
	if (trimmed.startsWith("[")) {
		const end = trimmed.indexOf("]");
		if (end !== -1) {
			const candidate = trimmed.slice(1, end);
			return net.isIP(candidate) === 0 ? void 0 : candidate;
		}
	}
	if (net.isIP(trimmed) !== 0) return trimmed;
	const lastColon = trimmed.lastIndexOf(":");
	if (lastColon > -1 && trimmed.includes(".") && trimmed.indexOf(":") === lastColon) {
		const candidate = trimmed.slice(0, lastColon);
		return net.isIP(candidate) === 4 ? candidate : void 0;
	}
}
function createTelegramLegacyWebhookAuthLimiter(config) {
	const rateLimiter = createFixedWindowRateLimiter(WEBHOOK_RATE_LIMIT_DEFAULTS);
	const trusted = new net.BlockList();
	for (const proxy of config?.gateway?.trustedProxies ?? []) {
		const value = proxy.trim();
		const [address = "", prefix] = value.split("/", 2);
		if (prefix !== void 0) {
			const bits = parseStrictNonNegativeInteger(prefix);
			const family = net.isIP(address);
			if (bits !== void 0 && family === 4 && bits <= 32) trusted.addSubnet(address, bits, "ipv4");
			else if (bits !== void 0 && family === 6 && bits <= 128) trusted.addSubnet(address, bits, "ipv6");
		} else if (net.isIP(value) === 4) trusted.addAddress(value, "ipv4");
		else if (net.isIP(value) === 6) trusted.addAddress(value, "ipv6");
	}
	const isTrusted = (ip) => trusted.check(ip, net.isIP(ip) === 6 ? "ipv6" : "ipv4");
	const headerValue = (header) => Array.isArray(header) ? header[0] : header;
	const clientIp = (req) => {
		const remote = parseIpLiteral(req.socket.remoteAddress);
		if (!remote) return "unknown";
		if (!isTrusted(remote)) return remote;
		const forwarded = headerValue(req.headers["x-forwarded-for"])?.split(",").map(parseIpLiteral).filter((ip) => ip !== void 0);
		for (const hop of forwarded?.toReversed() ?? []) if (!isTrusted(hop)) return hop;
		return config?.gateway?.allowRealIpFallback === true ? parseIpLiteral(headerValue(req.headers["x-real-ip"])) ?? "unknown" : "unknown";
	};
	return (req, res) => applyBasicWebhookRequestGuards({
		req,
		res,
		rateLimiter,
		rateLimitKey: `${req.url}:${clientIp(req)}`
	});
}
//#endregion
export { telegramWebhookHost as n, createTelegramLegacyWebhookAuthLimiter as t };
