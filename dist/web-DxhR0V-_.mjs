import { o as normalizeLowercaseStringOrEmpty } from "./string-coerce-6kR-86XC.mjs";
import { r as defaultRuntime } from "./runtime-BC29JSZp.mjs";
import { t as exitCliAfterOutput } from "./one-shot-exit-BzmTIPQe.mjs";
import { n as runCommandWithRuntime } from "./cli-utils-SHz2hPC9.mjs";
import { n as formatEnvelopeForText, t as emitJsonOrText } from "./output-BaRjhBNO.mjs";
import { t as registerLocalProvidersCommand } from "./providers-command-fNv1wGzs.mjs";
//#region src/cli/capability-cli/web.ts
function describeWebResultFailure(result) {
	const statusCode = typeof result.statusCode === "number" && Number.isFinite(result.statusCode) ? result.statusCode : void 0;
	const error = result.error;
	const errorMessage = typeof error === "string" ? error : error && typeof error === "object" && typeof error.message === "string" ? error.message : void 0;
	if (result.ok !== false && (statusCode === void 0 || statusCode < 400) && !errorMessage) return;
	return errorMessage ?? (statusCode ? `provider returned status ${statusCode}` : "provider reported failure");
}
async function runWebSearchCommand(params) {
	const { getRuntimeConfig } = await import("./config/config.js");
	const { getCapabilityWebSearchCommandSecretTargets } = await import("./command-secret-targets-DKfH-8xr.mjs");
	const { resolveLocalCapabilityRuntimeConfig } = await import("./shared-Csc_Vdki.mjs");
	const { runWebSearch } = await import("./runtime-B35oIE-n.mjs");
	const rawConfig = getRuntimeConfig();
	const result = await runWebSearch({
		config: await resolveLocalCapabilityRuntimeConfig({
			commandName: "infer web search",
			...getCapabilityWebSearchCommandSecretTargets(rawConfig, { providerId: params.provider }),
			config: rawConfig
		}),
		providerId: params.provider,
		args: {
			query: params.query,
			count: params.limit,
			limit: params.limit
		}
	});
	const error = describeWebResultFailure(result.result);
	return {
		ok: error === void 0,
		capability: "web.search",
		transport: "local",
		provider: result.provider,
		attempts: [],
		outputs: [{ result: result.result }],
		...error ? { error } : {}
	};
}
async function runWebFetchCommand(params) {
	const { getRuntimeConfig } = await import("./config/config.js");
	const { getCapabilityWebFetchCommandSecretTargets } = await import("./command-secret-targets-DKfH-8xr.mjs");
	const { resolveLocalCapabilityRuntimeConfig } = await import("./shared-Csc_Vdki.mjs");
	const { resolveWebFetchDefinition } = await import("./web-fetch/runtime.js");
	const rawConfig = getRuntimeConfig();
	const resolved = resolveWebFetchDefinition({
		config: await resolveLocalCapabilityRuntimeConfig({
			commandName: "infer web fetch",
			...getCapabilityWebFetchCommandSecretTargets(rawConfig, { providerId: params.provider }),
			config: rawConfig
		}),
		providerId: params.provider
	});
	if (!resolved) throw new Error("web.fetch is disabled or no provider is available.");
	const result = await resolved.definition.execute({
		url: params.url,
		format: params.format
	});
	const error = describeWebResultFailure(result);
	return {
		ok: error === void 0,
		capability: "web.fetch",
		transport: "local",
		provider: resolved.provider.id,
		attempts: [],
		outputs: [{ result }],
		...error ? { error } : {}
	};
}
function registerWebCapabilityCommands(capability) {
	const web = capability.command("web").description("Web capabilities");
	web.command("search").description("Run web search").requiredOption("--query <text>", "Search query").option("--provider <id>", "Provider id").option("--limit <n>", "Result limit").option("--json", "Output JSON", false).action(async (opts) => {
		await runCommandWithRuntime(defaultRuntime, async () => {
			const { parseOptionalPositiveInteger } = await import("./shared-Csc_Vdki.mjs");
			const result = await runWebSearchCommand({
				query: String(opts.query),
				provider: opts.provider,
				limit: parseOptionalPositiveInteger(opts.limit, "--limit")
			});
			emitJsonOrText(defaultRuntime, Boolean(opts.json), result, formatEnvelopeForText);
			if (!result.ok) exitCliAfterOutput(defaultRuntime, 1);
		});
	});
	web.command("fetch").description("Fetch one URL").requiredOption("--url <url>", "URL").option("--provider <id>", "Provider id").option("--format <format>", "Format hint").option("--json", "Output JSON", false).action(async (opts) => {
		await runCommandWithRuntime(defaultRuntime, async () => {
			const result = await runWebFetchCommand({
				url: String(opts.url),
				provider: opts.provider,
				format: opts.format
			});
			emitJsonOrText(defaultRuntime, Boolean(opts.json), result, formatEnvelopeForText);
			if (!result.ok) exitCliAfterOutput(defaultRuntime, 1);
		});
	});
	registerLocalProvidersCommand(web, "List web providers", async (cfg, agentId) => {
		const { resolveAgentDir } = await import("./agent-scope-C_9iBeRH.mjs");
		const { isWebFetchProviderConfigured, listWebFetchProviders } = await import("./web-fetch/runtime.js");
		const { isWebSearchProviderConfigured, listWebSearchProviders } = await import("./runtime-B35oIE-n.mjs");
		const agentDir = resolveAgentDir(cfg, agentId);
		const selectedSearchProvider = typeof cfg.tools?.web?.search?.provider === "string" ? normalizeLowercaseStringOrEmpty(cfg.tools.web.search.provider) : "";
		const selectedFetchProvider = typeof cfg.tools?.web?.fetch?.provider === "string" ? normalizeLowercaseStringOrEmpty(cfg.tools.web.fetch.provider) : "";
		return {
			search: listWebSearchProviders({ config: cfg }).map((provider) => ({
				available: true,
				configured: isWebSearchProviderConfigured({
					provider,
					config: cfg,
					agentDir
				}),
				selected: provider.id === selectedSearchProvider,
				id: provider.id,
				envVars: provider.envVars
			})),
			fetch: listWebFetchProviders({ config: cfg }).map((provider) => ({
				available: true,
				configured: isWebFetchProviderConfigured({
					provider,
					config: cfg
				}),
				selected: provider.id === selectedFetchProvider,
				id: provider.id,
				envVars: provider.envVars
			}))
		};
	}, (value) => JSON.stringify(value, null, 2));
}
//#endregion
export { registerWebCapabilityCommands };
