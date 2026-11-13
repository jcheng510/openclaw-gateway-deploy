import { l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import { i as extractErrorCode } from "./error-coercion-1P2One0X.mjs";
import { r as defaultRuntime } from "./runtime-BC29JSZp.mjs";
import { c as sleepWithAbort, n as computeBackoff } from "./src-DqaLEvc_.mjs";
import { b as resolveGatewayPort } from "./paths-CtO6iw0c.mjs";
import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { p as isDiagnosticsEnabled } from "./diagnostic-events-4jYHJPUA.mjs";
import { o as sendHttpRequestRejection } from "./http-request-lifecycle-DO9mb9Gu.mjs";
import { o as readJsonBodyWithLimit } from "./http-body-PMignl3j.mjs";
import { r as createRuntimeConfigReader } from "./runtime-snapshot-BHGp6OxI.mjs";
import { r as formatDurationPrecise } from "./format-duration-BIQQYTeV.mjs";
import { i as classifyGatewayProbePath } from "./gateway-http-route-contracts-jBtizxKU.mjs";
import "./string-coerce-runtime-B1b8UNzb.mjs";
import { c as logWebhookError, l as logWebhookProcessed, u as logWebhookReceived } from "./diagnostic-DLixObfX.mjs";
import { t as safeEqualSecret } from "./secret-equal-DRsL8lKD.mjs";
import "./runtime-env-Bh9hwd9E.mjs";
import { t as resolveTelegramAllowedUpdates } from "./allowed-updates-CAdSYdXv.mjs";
import { d as isRetryableTelegramApiError, n as resolveTelegramTransport, p as isTelegramAuthenticationError } from "./fetch-B9qcDzbC.mjs";
import { a as mergeTelegramAccountConfig, s as resolveTelegramLegacyWebhookListener } from "./account-selection-Cj6XfcsG.mjs";
import "./runtime-config-snapshot-DPPwvFCZ.mjs";
import "./ssrf-runtime-CaiftzgS.mjs";
import "./security-runtime-DxwQ9WKi.mjs";
import { n as resolvePluginRoutePathContext, t as isProtectedPluginRoutePathFromContext } from "./path-context-DrlVq_tQ.mjs";
import "./gateway-config-runtime-BslYVYjs.mjs";
import "./logging-core-Bd5We5HU.mjs";
import "./diagnostic-runtime-BugV72v3.mjs";
import { t as createPluginRuntimeStore } from "./runtime-store-D069N8IS.mjs";
import { c as createFixedWindowRateLimiter, n as resolveRequestClientIp, o as WEBHOOK_RATE_LIMIT_DEFAULTS } from "./webhook-ingress-DWyOaUd8.mjs";
import { r as applyBasicWebhookRequestGuards } from "./webhook-request-guards-CTunXcRc.mjs";
import { r as registerPluginHttpRoute } from "./http-registry-DzomuceN.mjs";
import { n as normalizeWebhookPath, o as resolveSingleWebhookTarget, r as registerWebhookTarget } from "./webhook-targets-BrmmCjTv.mjs";
import { n as telegramWebhookHost, t as createTelegramLegacyWebhookAuthLimiter } from "./webhook-legacy-CGK61CUF.mjs";
import { t as withTelegramApiErrorLogging } from "./api-logging-CFMPlj80.mjs";
import { i as createTelegramBot, n as createTelegramTransportIngressMonitor, t as createTelegramStatusPublisher } from "./transport-status-Cm1CYE8R.mjs";
import { createServer } from "node:http";
import { InputFile } from "grammy";
//#region extensions/telegram/src/webhook.ts
const TELEGRAM_WEBHOOK_MAX_BODY_BYTES = 1048576;
const TELEGRAM_WEBHOOK_BODY_TIMEOUT_MS = 3e4;
const TELEGRAM_WEBHOOK_TEXT_TYPE = "text/plain; charset=utf-8";
const TELEGRAM_WEBHOOK_ACCEPTED_HEADER = "x-openclaw-delivery-accepted";
const TELEGRAM_WEBHOOK_ACCEPTED_VALUE = "durable";
const TELEGRAM_WEBHOOK_SPOOLED_DRAIN_INTERVAL_MS = 500;
const TELEGRAM_WEBHOOK_INGRESS_STOP_GRACE_MS = 15e3;
const TELEGRAM_WEBHOOK_REGISTRATION_RETRY_POLICY = {
	initialMs: 5e3,
	maxMs: 6e4,
	factor: 2,
	jitter: .2
};
function formatWebhookStartupError(error) {
	const message = formatErrorMessage(error);
	const code = extractErrorCode(error);
	return code && !message.includes(code) ? `${message} (${code})` : message;
}
async function waitForWebhookIngressStop(task) {
	if (!task) return;
	let timer;
	try {
		await Promise.race([task, new Promise((resolve) => {
			timer = setTimeout(resolve, TELEGRAM_WEBHOOK_INGRESS_STOP_GRACE_MS);
			timer.unref?.();
		})]);
	} finally {
		clearTimeout(timer);
	}
}
async function initializeTelegramWebhookBot(params) {
	let attempt = 0;
	while (true) try {
		await withTelegramApiErrorLogging({
			operation: "getMe",
			runtime: params.runtime,
			fn: () => params.bot.init(params.abortSignal)
		});
		return;
	} catch (err) {
		if (!isRetryableTelegramApiError(err, { context: "webhook" }) || params.abortSignal?.aborted) throw err;
		attempt += 1;
		params.onRetry();
		const delayMs = computeBackoff(params.retryPolicy, attempt);
		params.runtime.log?.(`telegram getMe retry ${attempt} scheduled in ${formatDurationPrecise(delayMs)}`);
		await sleepWithAbort(delayMs, params.abortSignal);
	}
}
function resolveSingleHeaderValue(header) {
	if (typeof header === "string") return header;
	if (Array.isArray(header) && header.length === 1) return header[0];
}
const webhookState = createPluginRuntimeStore({
	key: "telegram:webhook",
	errorMessage: "Telegram webhook routes are not registered"
});
async function handleTelegramWebhook(webhookTargets, rateLimiter, req, res, legacyListener = telegramWebhookHost.getWebhookLegacyListener?.(req)) {
	const targets = webhookTargets.get(normalizeWebhookPath(req.url ?? ""))?.filter((target) => target.isActive() && target.requestPath === req.url && (!legacyListener || target.legacyListener?.port === legacyListener.port && target.legacyListener?.host === legacyListener.host));
	if (!targets?.length || req.method !== "POST") {
		res.writeHead(404);
		res.end();
		return true;
	}
	if (targets.some((target) => target.diagnosticsEnabled())) logWebhookReceived({
		channel: "telegram",
		updateType: "telegram-post"
	});
	const secret = resolveSingleHeaderValue(req.headers["x-telegram-bot-api-secret-token"]);
	const match = resolveSingleWebhookTarget(targets, (target) => safeEqualSecret(secret, target.secret));
	if (match.kind !== "single") {
		const legacyAuthGuard = legacyListener ? targets[0]?.legacyAuthGuard : void 0;
		if (!(legacyAuthGuard ? legacyAuthGuard(req, res) : applyBasicWebhookRequestGuards({
			req,
			res,
			rateLimiter,
			rateLimitKey: `${req.url}:${resolveRequestClientIp(req) ?? "unknown"}`
		}))) return true;
		res.shouldKeepAlive = false;
		res.writeHead(401, {
			Connection: "close",
			"Content-Type": TELEGRAM_WEBHOOK_TEXT_TYPE
		});
		res.end(match.kind === "ambiguous" ? "ambiguous webhook target" : "unauthorized");
		return true;
	}
	await match.target.handle(req, res);
	return true;
}
async function startTelegramWebhook(opts) {
	let state = webhookState.tryGetRuntime();
	if (!state) {
		state = {
			targets: /* @__PURE__ */ new Map(),
			rateLimiter: createFixedWindowRateLimiter(WEBHOOK_RATE_LIMIT_DEFAULTS)
		};
		webhookState.setRuntime(state);
	}
	const { targets: webhookTargets, rateLimiter } = state;
	const readConfig = createRuntimeConfigReader(opts.config ?? {});
	const legacyListener = resolveTelegramLegacyWebhookListener(opts.legacyWebhook);
	const gatewayOwnsLegacyListeners = telegramWebhookHost.getWebhookLegacyListener !== void 0;
	const path = opts.path ?? "/telegram-webhook";
	if (path === "/healthz") throw new Error(`Telegram webhook path "${path}" conflicts with the health path.`);
	const pathname = URL.parse(path, "http://localhost")?.pathname ?? path;
	const probe = classifyGatewayProbePath(pathname);
	const pathConflict = probe === "live" || probe === "ready" || probe === "startup" ? "is reserved for Gateway probes" : isProtectedPluginRoutePathFromContext(resolvePluginRoutePathContext(pathname)) ? "requires Gateway authentication" : void 0;
	if (pathConflict && !legacyListener) throw new Error(`Telegram webhook path "${path}" ${pathConflict}. Set webhookPath to /telegram-webhook and update webhookUrl or its reverse-proxy mapping before restarting.`);
	const secret = normalizeOptionalString(opts.secret) ?? "";
	if (!secret) throw new Error("Telegram webhook mode requires a non-empty secret token. Set channels.telegram.webhookSecret in your config.");
	const publicUrl = normalizeOptionalString(opts.publicUrl);
	if (!publicUrl) throw new Error("Telegram webhook mode requires webhookUrl pointing to the Gateway webhook route.");
	const runtime = opts.runtime ?? defaultRuntime;
	if (pathConflict) runtime.log?.(`Telegram webhook path "${path}" ${pathConflict} on the Gateway port; its legacy listener remains available. Set webhookPath to /telegram-webhook and update webhookUrl or its reverse-proxy mapping before setting legacyWebhook: false.`);
	const status = createTelegramStatusPublisher("webhook", opts.setStatus);
	status.noteStart();
	const webhookRegistrationRetryPolicy = opts.webhookRegistrationRetryPolicy ?? TELEGRAM_WEBHOOK_REGISTRATION_RETRY_POLICY;
	let shutDown = false;
	let shutdownPromise;
	let unregisterRoute;
	let ownedLegacyServer;
	let unregisterTarget;
	let ownedBot = void 0;
	let webhookIngressMonitor;
	const shutdownAbortController = new AbortController();
	const telegramAccountConfig = opts.config ? mergeTelegramAccountConfig(opts.config, opts.accountId ?? "default") : void 0;
	const telegramTransport = resolveTelegramTransport(opts.fetch, { network: telegramAccountConfig?.network });
	const botAbortController = new AbortController();
	const accountAbortSignal = opts.abortSignal ? AbortSignal.any([opts.abortSignal, shutdownAbortController.signal]) : shutdownAbortController.signal;
	const botFetchAbortSignal = opts.abortSignal ? AbortSignal.any([opts.abortSignal, botAbortController.signal]) : botAbortController.signal;
	const runShutdownPhase = async (label, run) => {
		try {
			await run();
		} catch (err) {
			runtime.error?.(`telegram webhook ${label} failed: ${formatErrorMessage(err)}`);
		}
	};
	const shutdown = () => {
		if (shutdownPromise) return shutdownPromise;
		shutDown = true;
		const ingressMonitor = webhookIngressMonitor;
		webhookIngressMonitor = void 0;
		shutdownPromise = Promise.resolve().then(async () => {
			const ingressStopTask = ingressMonitor ? runShutdownPhase("ingress stop", () => ingressMonitor.stop()) : void 0;
			const server = ownedLegacyServer;
			const listenerCloseTask = server ? runShutdownPhase("legacy listener close", () => new Promise((resolve, reject) => {
				server.close((error) => {
					if (error && extractErrorCode(error) !== "ERR_SERVER_NOT_RUNNING") reject(error);
					else resolve();
				});
			})) : void 0;
			await runShutdownPhase("route release", () => {
				unregisterRoute?.();
				unregisterTarget?.();
			});
			await runShutdownPhase("bot stop", () => ownedBot?.stop());
			await runShutdownPhase("transport close", () => telegramTransport.close());
			await runShutdownPhase("ingress drain", () => waitForWebhookIngressStop(ingressStopTask));
			await runShutdownPhase("ingress settlement", () => ingressMonitor?.waitForDeferredClaims());
			if (listenerCloseTask) await listenerCloseTask;
			await runShutdownPhase("status update", () => status.noteStop());
		});
		botAbortController.abort();
		shutdownAbortController.abort();
		return shutdownPromise;
	};
	const runStartupPhase = async (run) => {
		try {
			return await run();
		} catch (err) {
			if (!opts.abortSignal?.aborted) status.noteError(formatWebhookStartupError(err), isTelegramAuthenticationError(err) ? "blocked" : void 0);
			await shutdown();
			throw err;
		}
	};
	const bot = await runStartupPhase(() => createTelegramBot({
		token: opts.token,
		runtime,
		buildContext: opts.buildContext,
		dispatchReplyFromConfig: opts.dispatchReplyFromConfig,
		proxyFetch: opts.fetch,
		fetchAbortSignal: botFetchAbortSignal,
		accountAbortSignal,
		config: opts.config,
		accountId: opts.accountId,
		ownerAgentId: opts.ownerAgentId,
		telegramTransport
	}));
	ownedBot = bot;
	await runStartupPhase(() => initializeTelegramWebhookBot({
		bot,
		runtime,
		abortSignal: opts.abortSignal,
		onRetry: () => status.noteRecovery(),
		retryPolicy: webhookRegistrationRetryPolicy
	}));
	const botInfo = bot.botInfo;
	const log = (line) => runtime.log?.(line);
	const startWebhookSpoolDrain = () => {
		if (webhookIngressMonitor) return;
		webhookIngressMonitor = createTelegramTransportIngressMonitor({
			stateDir: opts.stateDir,
			bot,
			botInfo,
			accountId: opts.accountId ?? "default",
			pollIntervalMs: TELEGRAM_WEBHOOK_SPOOLED_DRAIN_INTERVAL_MS,
			abortSignal: accountAbortSignal,
			onLog: (message) => log(`webhook ${message}`),
			onError: (error) => log(`[telegram][diag] webhook spool drain failed: ${formatErrorMessage(error)}`)
		});
		webhookIngressMonitor.start();
	};
	const handle = async (req, res) => {
		const respondText = (statusCode, text = "") => {
			if (res.headersSent || res.writableEnded) return;
			res.writeHead(statusCode, { "Content-Type": TELEGRAM_WEBHOOK_TEXT_TYPE });
			res.end(text);
		};
		const startTime = Date.now();
		try {
			const body = await readJsonBodyWithLimit(req, {
				maxBytes: TELEGRAM_WEBHOOK_MAX_BODY_BYTES,
				timeoutMs: TELEGRAM_WEBHOOK_BODY_TIMEOUT_MS,
				emptyObjectOnEmpty: false,
				destroyOnLimit: false
			});
			if (!body.ok) {
				if (body.code === "PAYLOAD_TOO_LARGE") {
					await sendHttpRequestRejection(req, res, 413, body.error, TELEGRAM_WEBHOOK_TEXT_TYPE);
					return;
				}
				if (body.code === "REQUEST_BODY_TIMEOUT") {
					await sendHttpRequestRejection(req, res, 408, body.error, TELEGRAM_WEBHOOK_TEXT_TYPE);
					return;
				}
				respondText(400, body.error);
				return;
			}
			const ingressMonitor = webhookIngressMonitor;
			if (!ingressMonitor) throw new Error("Telegram webhook ingress is not ready.");
			await ingressMonitor.admit(body.value);
			res.setHeader(TELEGRAM_WEBHOOK_ACCEPTED_HEADER, TELEGRAM_WEBHOOK_ACCEPTED_VALUE);
			respondText(200);
			status.noteReady();
			if (isDiagnosticsEnabled(readConfig())) logWebhookProcessed({
				channel: "telegram",
				updateType: "telegram-post",
				durationMs: Date.now() - startTime
			});
		} catch (err) {
			const errMsg = formatErrorMessage(err);
			if (isDiagnosticsEnabled(readConfig())) logWebhookError({
				channel: "telegram",
				updateType: "telegram-post",
				error: errMsg
			});
			runtime.log?.(`webhook request failed: ${errMsg}`);
			respondText(500);
		}
	};
	await runStartupPhase(async () => {
		const target = {
			path,
			requestPath: path,
			secret,
			legacyListener,
			legacyAuthGuard: legacyListener ? createTelegramLegacyWebhookAuthLimiter(opts.config) : void 0,
			handle,
			diagnosticsEnabled: () => isDiagnosticsEnabled(readConfig()),
			isActive: () => !shutDown && !opts.abortSignal?.aborted
		};
		unregisterTarget = registerWebhookTarget(webhookTargets, target, { onLastPathTargetRemoved: () => {
			if (webhookTargets.size === 0) rateLimiter.clear();
		} }).unregister;
		unregisterRoute = registerPluginHttpRoute({
			path,
			auth: "plugin",
			pluginId: "telegram",
			source: "webhook",
			accountId: opts.accountId,
			reuseExistingSameOwner: true,
			throwOnFailure: true,
			legacyListener: gatewayOwnsLegacyListeners && legacyListener ? {
				...legacyListener,
				health: { path: "/healthz" }
			} : void 0,
			handler: (req, res) => handleTelegramWebhook(webhookTargets, rateLimiter, req, res),
			log
		});
		if (!gatewayOwnsLegacyListeners && legacyListener && !opts.abortSignal?.aborted) {
			const accountTargets = /* @__PURE__ */ new Map([[normalizeWebhookPath(path), [target]]]);
			const server = createServer((req, res) => {
				if (req.url === "/healthz") {
					res.writeHead(200);
					res.end("ok");
					return;
				}
				handleTelegramWebhook(accountTargets, rateLimiter, req, res, legacyListener).catch((error) => {
					runtime.error?.(`telegram legacy webhook request failed: ${formatErrorMessage(error)}`);
					if (!res.headersSent) res.writeHead(500);
					res.end();
				});
			});
			ownedLegacyServer = server;
			await new Promise((resolve, reject) => {
				const onError = (error) => {
					server.off("error", onError);
					reject(error);
				};
				server.once("error", onError);
				server.listen(legacyListener.port, legacyListener.host, () => {
					server.off("error", onError);
					resolve();
				});
			});
		}
	});
	if (opts.abortSignal?.aborted) shutdown();
	else if (opts.abortSignal) opts.abortSignal.addEventListener("abort", () => void shutdown(), { once: true });
	const advertiseWebhook = async () => {
		if (shutDown || opts.abortSignal?.aborted) return;
		try {
			await withTelegramApiErrorLogging({
				operation: "setWebhook",
				runtime,
				fn: () => bot.api.setWebhook(publicUrl, {
					secret_token: secret,
					allowed_updates: resolveTelegramAllowedUpdates(),
					certificate: opts.webhookCertPath ? new InputFile(opts.webhookCertPath) : void 0
				})
			});
		} catch (err) {
			status.noteError(formatErrorMessage(err), isTelegramAuthenticationError(err) ? "blocked" : isRetryableTelegramApiError(err, { context: "webhook" }) ? "recovering" : void 0);
			throw err;
		}
		if (shutDown) return;
		status.noteReady();
		runtime.log?.(`webhook advertised to telegram on ${publicUrl}`);
	};
	const retryWebhookRegistration = async (firstAttempt) => {
		let attempt = firstAttempt;
		while (true) {
			if (shutDown || opts.abortSignal?.aborted) return;
			const delayMs = computeBackoff(webhookRegistrationRetryPolicy, attempt);
			runtime.log?.(`telegram setWebhook retry ${attempt} scheduled in ${formatDurationPrecise(delayMs)}`);
			try {
				await sleepWithAbort(delayMs, opts.abortSignal);
			} catch {
				return;
			}
			if (shutDown || opts.abortSignal?.aborted) return;
			try {
				await advertiseWebhook();
				return;
			} catch (err) {
				if (!isRetryableTelegramApiError(err, { context: "webhook" })) {
					runtime.error?.(`telegram setWebhook retry stopped after non-recoverable error: ${formatErrorMessage(err)}`);
					await shutdown();
					return;
				}
			}
			attempt += 1;
		}
	};
	if ((webhookTargets.get(normalizeWebhookPath(path)) ?? []).filter((target) => target.requestPath === path && safeEqualSecret(target.secret, secret)).length > 1) runtime.error?.(`Telegram accounts on Gateway route ${path} share a webhook secret. Give each account a distinct webhookSecret or webhookPath. Separate legacy endpoints retain account routing while you update the Gateway routes.`);
	const gatewayPort = resolveGatewayPort(opts.config);
	runtime.log?.(`telegram webhook Gateway route ${path} (port ${gatewayPort})`);
	runtime.log?.(legacyListener && !gatewayOwnsLegacyListeners ? `Telegram 2026.9.6 compatibility listener ${legacyListener.host}:${legacyListener.port} serves this account directly. This host cannot share a legacy port across accounts; use distinct endpoints or route ${publicUrl} to Gateway port ${gatewayPort}${path} and set legacyWebhook: false.` : legacyListener ? `Telegram legacy webhook listener ${legacyListener.host}:${legacyListener.port} forwards to the Gateway route. Point the reverse proxy for ${publicUrl} at Gateway port ${gatewayPort}${path}, verify delivery, then set legacyWebhook: false to disable legacy forwarding for this account.` : `Telegram legacy forwarding for this account is disabled by legacyWebhook: false. Route ${publicUrl} to Gateway port ${gatewayPort}${path}.`);
	if (!shutDown) try {
		await advertiseWebhook();
	} catch (err) {
		if (!isRetryableTelegramApiError(err, { context: "webhook" })) {
			await shutdown();
			throw err;
		}
		retryWebhookRegistration(1);
	}
	if (!shutDown) await runStartupPhase(startWebhookSpoolDrain);
	return {
		bot,
		stop: shutdown
	};
}
//#endregion
export { startTelegramWebhook };
