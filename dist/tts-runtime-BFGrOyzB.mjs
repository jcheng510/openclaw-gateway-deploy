import { l as normalizeOptionalString, o as normalizeLowercaseStringOrEmpty } from "./string-coerce-6kR-86XC.mjs";
import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { r as getRuntimeConfig } from "./io.runtime-BOdk1dW9.mjs";
import "./config-D1R2igem.mjs";
import { t as resolveApiKeyForProviderCore } from "./model-auth-provider-GP8l5DsY.mjs";
import "./model-auth-ByqXHWUV.mjs";
import { t as publishOutputFileAtomically } from "./output-file.runtime.js";
import { s as isLoopbackHost } from "./net-BD0odJBF.mjs";
import { r as callGateway } from "./call-CjdP4t26.mjs";
import { t as buildGatewayConnectionDetailsWithResolvers } from "./connection-details-BhnOWfP0.mjs";
import { i as canonicalizeSpeechProviderId, s as listSpeechProviders } from "./directives-w6ktb1eV.mjs";
import { g as resolveTtsPrefsPath, l as listTtsPersonas, m as resolveTtsConfig, o as getTtsPersona } from "./tts-settings-DcjFIdsQ.mjs";
import { p as getTtsCommandSecretTargetIds } from "./command-secret-targets-VjuVjcxK.mjs";
import { _ as setTtsProvider, g as setTtsPersona, l as listSpeechVoices, m as setTtsEnabled, s as resolveExplicitTtsOverrides, t as getTtsProvider } from "./runtime-api-9HI1G_Fp.mjs";
import { n as textToSpeech } from "./tts-Cw1OB5Jm.mjs";
import { a as providerHasGenericConfig, c as resolveCapabilityProviderAgentId, f as resolveSelectedProviderFromModelRef, i as pinRuntimeConfigSnapshot, u as resolveLocalCapabilityRuntimeConfig } from "./shared-Clsi-OLO.mjs";
import "./media-output-DikfNWEZ.mjs";
import path from "node:path";
import fs from "node:fs/promises";
//#region src/cli/capability-cli/tts-runtime.ts
async function runTtsConvert(params) {
	let result;
	let attempts = [];
	if (params.transport === "gateway") {
		const gatewayConnection = buildGatewayConnectionDetailsWithResolvers({ config: getRuntimeConfig() });
		if (params.output && !isLoopbackHost(new URL(gatewayConnection.url).hostname)) throw new Error(`--output is not supported for remote gateway TTS yet (gateway target: ${gatewayConnection.url}).`);
		result = await callGateway({
			method: "tts.convert",
			params: {
				text: params.text,
				channel: params.channel,
				provider: normalizeOptionalString(params.provider),
				modelId: params.modelId,
				voiceId: params.voiceId
			},
			timeoutMs: 12e4
		});
	} else {
		const cfg = await resolveLocalCapabilityRuntimeConfig({
			commandName: "infer tts convert",
			targetIds: getTtsCommandSecretTargetIds()
		});
		const effectiveCfg = await injectTtsAuthProfileApiKey({
			cfg,
			provider: resolveTtsProviderForAuthHydration({
				cfg,
				provider: params.provider,
				modelId: params.modelId,
				channelId: params.channel
			}),
			channelId: params.channel
		});
		if (effectiveCfg !== cfg) pinRuntimeConfigSnapshot(effectiveCfg);
		const overrides = resolveExplicitTtsOverrides({
			cfg: effectiveCfg,
			provider: params.provider,
			modelId: params.modelId,
			voiceId: params.voiceId,
			channelId: params.channel
		});
		const hasExplicitSelection = Boolean(overrides.provider || normalizeOptionalString(params.modelId) || normalizeOptionalString(params.voiceId));
		const localResult = await textToSpeech({
			text: params.text,
			cfg: effectiveCfg,
			channel: params.channel,
			overrides,
			disableFallback: hasExplicitSelection
		});
		if (!localResult.success || !localResult.audioPath) throw new Error(localResult.error ?? "TTS conversion failed");
		result = localResult;
		attempts = localResult.attempts ?? [];
	}
	let outputPath = result.audioPath;
	if (params.output && result.audioPath) {
		const sourcePath = result.audioPath;
		outputPath = path.resolve(params.output);
		await publishOutputFileAtomically({
			filePath: outputPath,
			writeTemp: (tempPath) => fs.copyFile(sourcePath, tempPath)
		});
	}
	return {
		ok: true,
		capability: "tts.convert",
		transport: params.transport,
		provider: result.provider,
		attempts,
		outputs: [{
			path: outputPath,
			format: result.outputFormat,
			voiceCompatible: result.voiceCompatible
		}]
	};
}
function resolveTtsProviderForAuthHydration(params) {
	const explicitProvider = params.provider ?? resolveSelectedProviderFromModelRef(normalizeOptionalString(params.modelId));
	if (explicitProvider) return explicitProvider;
	const ttsConfig = resolveTtsConfig(params.cfg, { channelId: params.channelId });
	return getTtsProvider(ttsConfig, resolveTtsPrefsPath(ttsConfig));
}
async function injectTtsAuthProfileApiKey(params) {
	if (!params.provider) return params.cfg;
	const providerId = canonicalizeSpeechProviderId(params.provider, params.cfg) ?? normalizeLowercaseStringOrEmpty(params.provider);
	if (!providerId) return params.cfg;
	if (ttsProviderConfigHasApiKey(resolveTtsConfig(params.cfg, { channelId: params.channelId }).providerConfigs[providerId])) return params.cfg;
	const existingProviderConfig = resolveExistingTtsProviderConfig({
		cfg: params.cfg,
		providerId,
		channelId: params.channelId
	});
	if (ttsProviderConfigHasApiKey(existingProviderConfig?.value)) return params.cfg;
	const auth = await resolveApiKeyForProviderCore({
		provider: providerId,
		cfg: params.cfg,
		credentialPrecedence: "profile-first"
	}).catch(() => void 0);
	if (!auth?.apiKey || auth.mode !== "api-key") return params.cfg;
	if (existingProviderConfig?.scope === "channel") {
		const channels = { ...params.cfg.channels };
		const channel = channels[existingProviderConfig.channelKey];
		if (!isRecord(channel)) return params.cfg;
		const nextChannel = {
			...channel,
			tts: buildTtsConfigWithHydratedProvider({
				tts: channel.tts,
				existingProviderConfig,
				providerId,
				apiKey: auth.apiKey
			})
		};
		return {
			...params.cfg,
			channels: {
				...channels,
				[existingProviderConfig.channelKey]: nextChannel
			}
		};
	}
	const nextTts = buildTtsConfigWithHydratedProvider({
		tts: params.cfg.tts,
		existingProviderConfig,
		providerId,
		apiKey: auth.apiKey
	});
	return {
		...params.cfg,
		tts: nextTts
	};
}
function resolveExistingTtsProviderConfig(params) {
	const channelTts = resolveChannelTtsConfigForAuthHydration(params);
	if (channelTts) {
		const channelProviderConfig = resolveExistingTtsProviderConfigInTts({
			cfg: params.cfg,
			tts: channelTts.tts,
			providerId: params.providerId
		});
		if (channelProviderConfig) return {
			...channelProviderConfig,
			scope: "channel",
			channelKey: channelTts.channelKey
		};
	}
	const rootProviderConfig = resolveExistingTtsProviderConfigInTts({
		cfg: params.cfg,
		tts: params.cfg.tts,
		providerId: params.providerId
	});
	return rootProviderConfig ? {
		...rootProviderConfig,
		scope: "root"
	} : void 0;
}
function resolveExistingTtsProviderConfigInTts(params) {
	if (!isRecord(params.tts)) return;
	const providers = isRecord(params.tts.providers) ? params.tts.providers : void 0;
	const exact = providers?.[params.providerId];
	if (exact !== void 0) return {
		container: "providers",
		key: params.providerId,
		value: exact
	};
	for (const [container, entries] of [["providers", providers], ["direct", params.tts]]) for (const [key, value] of Object.entries(entries ?? {})) {
		if (container === "direct" && TTS_CONFIG_RESERVED_KEYS.has(key)) continue;
		if (normalizeLowercaseStringOrEmpty(canonicalizeSpeechProviderId(key, params.cfg) ?? key) === params.providerId) return {
			container,
			key,
			value
		};
	}
}
const TTS_CONFIG_RESERVED_KEYS = /* @__PURE__ */ new Set([
	"auto",
	"enabled",
	"maxTextLength",
	"mode",
	"modelOverrides",
	"persona",
	"personas",
	"prefsPath",
	"provider",
	"providers",
	"summaryModel",
	"timeoutMs"
]);
function resolveChannelTtsConfigForAuthHydration(params) {
	const channels = params.cfg.channels;
	const normalizedChannelId = normalizeOptionalString(params.channelId);
	if (!isRecord(channels) || !normalizedChannelId) return;
	const channelKey = Object.hasOwn(channels, normalizedChannelId) ? normalizedChannelId : Object.keys(channels).find((candidate) => normalizeLowercaseStringOrEmpty(candidate) === normalizeLowercaseStringOrEmpty(normalizedChannelId));
	const channel = channelKey ? channels[channelKey] : void 0;
	if (!channelKey || !isRecord(channel)) return;
	return {
		channelKey,
		tts: channel.tts
	};
}
function buildTtsConfigWithHydratedProvider(params) {
	const tts = isRecord(params.tts) ? { ...params.tts } : {};
	const providers = isRecord(tts.providers) ? { ...tts.providers } : {};
	const providerConfigKey = params.existingProviderConfig?.key ?? params.providerId;
	const nextProviderConfig = {
		...isRecord(params.existingProviderConfig?.value) ? params.existingProviderConfig.value : {},
		apiKey: params.apiKey
	};
	if (params.existingProviderConfig?.container === "direct") tts[providerConfigKey] = nextProviderConfig;
	else {
		providers[providerConfigKey] = nextProviderConfig;
		tts.providers = providers;
	}
	return tts;
}
function ttsProviderConfigHasApiKey(value) {
	return isRecord(value) && "apiKey" in value;
}
async function runTtsProviders(transport, rawAgentId) {
	const cfg = getRuntimeConfig();
	if (transport === "gateway") {
		if (rawAgentId !== void 0) throw new Error("--agent is only supported with local TTS provider inspection.");
		const payload = await callGateway({
			method: "tts.providers",
			timeoutMs: 3e4
		});
		return {
			...payload,
			providers: (payload.providers ?? []).map((provider) => {
				const id = typeof provider.id === "string" ? provider.id : "";
				return Object.assign({
					available: true,
					configured: typeof provider.configured === `boolean` ? provider.configured : providerHasGenericConfig({
						cfg,
						providerId: id
					}),
					selected: Boolean(id && payload.active === id)
				}, provider);
			})
		};
	}
	const agentId = resolveCapabilityProviderAgentId(cfg, rawAgentId);
	const config = resolveTtsConfig(cfg);
	const prefsPath = resolveTtsPrefsPath(config);
	const active = getTtsProvider(config, prefsPath);
	return {
		providers: listSpeechProviders(cfg).map((provider) => ({
			available: true,
			configured: active === provider.id || providerHasGenericConfig({
				cfg,
				providerId: provider.id,
				agentId
			}),
			selected: active === provider.id,
			id: provider.id,
			name: provider.label,
			models: [...provider.models ?? []],
			voices: [...provider.voices ?? []]
		})),
		active
	};
}
async function runTtsPersonas(transport) {
	if (transport === "gateway") return await callGateway({
		method: "tts.personas",
		timeoutMs: 3e4
	});
	const cfg = getRuntimeConfig();
	const config = resolveTtsConfig(cfg);
	const prefsPath = resolveTtsPrefsPath(config);
	return {
		active: getTtsPersona(config, prefsPath)?.id ?? null,
		personas: listTtsPersonas(config).map((persona) => ({
			id: persona.id,
			label: persona.label,
			description: persona.description,
			provider: persona.provider,
			fallbackPolicy: persona.fallbackPolicy,
			providers: Object.keys(persona.providers ?? {})
		}))
	};
}
async function runTtsVoices(providerRaw) {
	const cfg = await resolveLocalCapabilityRuntimeConfig({
		commandName: "infer tts voices",
		targetIds: getTtsCommandSecretTargetIds()
	});
	const config = resolveTtsConfig(cfg);
	const prefsPath = resolveTtsPrefsPath(config);
	const provider = normalizeOptionalString(providerRaw) || getTtsProvider(config, prefsPath);
	return await listSpeechVoices({
		provider,
		cfg,
		config
	});
}
async function runTtsStateMutation(params) {
	if (params.transport === "gateway") {
		const method = params.capability === "tts.enable" ? "tts.enable" : params.capability === "tts.disable" ? "tts.disable" : params.capability === "tts.set-provider" ? "tts.setProvider" : "tts.setPersona";
		return await callGateway({
			method,
			params: params.capability === "tts.set-provider" ? { provider: params.provider } : params.capability === "tts.set-persona" ? { persona: params.persona ?? "off" } : void 0,
			timeoutMs: 3e4
		});
	}
	const cfg = getRuntimeConfig();
	const config = resolveTtsConfig(cfg);
	const prefsPath = resolveTtsPrefsPath(config);
	if (params.capability === "tts.enable" || params.capability === "tts.disable") {
		const enabled = params.capability === "tts.enable";
		setTtsEnabled(prefsPath, enabled);
		return { enabled };
	}
	if (params.capability === "tts.set-persona") {
		if (!params.persona) {
			setTtsPersona(prefsPath, null);
			return { persona: null };
		}
		const persona = listTtsPersonas(config).find((entry) => entry.id === normalizeLowercaseStringOrEmpty(params.persona ?? ""));
		if (!persona) throw new Error(`Unknown TTS persona: ${params.persona}`);
		setTtsPersona(prefsPath, persona.id);
		return { persona: persona.id };
	}
	if (!params.provider) throw new Error("--provider is required");
	const provider = canonicalizeSpeechProviderId(params.provider, cfg);
	if (!provider) throw new Error(`Unknown speech provider: ${params.provider}`);
	setTtsProvider(prefsPath, provider);
	return { provider };
}
//#endregion
export { runTtsConvert, runTtsPersonas, runTtsProviders, runTtsStateMutation, runTtsVoices };
