import { l as normalizeOptionalString, o as normalizeLowercaseStringOrEmpty } from "./string-coerce-6kR-86XC.mjs";
import { n as normalizeAgentId } from "./agent-id-D1-Q6vR4.mjs";
import { d as resolveAgentWorkspaceDir } from "./agent-scope-config-Dm6T00l4.mjs";
import { A as parseAgentSessionKey, y as isAcpSessionKey } from "./session-key-BC4m_Ly5.mjs";
import { i as listAgentIds, n as listAgentEntries } from "./agent-roster-B45JERT5.mjs";
import { t as splitTrailingAuthProfile } from "./model-ref-profile-BIKs-96s.mjs";
import { o as resolveAgentModelFallbackValues } from "./model-input-DEyB5bFf.mjs";
import { u as resolveAgentModelFallbacksOverride } from "./agent-scope-L_eY3Hj7.mjs";
import { f as resolveExecPolicyForMode } from "./exec-approvals-core-GflUelcW.mjs";
import { t as dedupeByKey } from "./dedupe-by-key-DnqEVrst.mjs";
import { i as buildModelAliasIndex, v as resolveModelRefFromString, y as readUtilityModelSetting } from "./model-selection-shared-dOoB6UQS.mjs";
import { t as resolveDefaultModelForAgent } from "./model-selection-config-rcK5tFX8.mjs";
import { r as getRuntimeConfig } from "./io.runtime-BOdk1dW9.mjs";
import "./io-B18HRL9J.mjs";
import { d as listAgentProvenance } from "./agent-deletion-journal-C9BqqBYt.mjs";
import { r as resolveAgentMainSessionKey } from "./main-session-BFJFO581.mjs";
import "./model-selection-BAezv3YH.mjs";
import { o as loadExecApprovalsReadOnlyAsync } from "./exec-approvals-store-D6OdMNqR.mjs";
import { i as resolveAgentAvatarUrlFromSource } from "./identity-avatar-file-C3RuXwXq.mjs";
import { t as isInternalSessionEffectsKey } from "./internal-session-key-BOMXCQVf.mjs";
import { a as tryResolveSessionCompatibilityOwnerAgentId } from "./session-request-agent-DFWpsx2m.mjs";
import { n as readAcpSessionMetaForEntry } from "./session-meta-readonly-Bf4Y50W_.mjs";
import { n as readAcpSessionMeta } from "./session-meta-C-yU0zLz.mjs";
import "./sessions-Db5eEwNA.mjs";
import { t as SESSION_PERMISSION_BY_EXEC_MODE } from "./session-permission-exec-mode-Bm_ZQ6Ge.mjs";
import { i as resolveSandboxConfigForAgent } from "./config-Dq9GjaYt.mjs";
import { o as insideGitCheckout } from "./git-CtRrTgDk.mjs";
import { n as resolveModelAgentRuntimeMetadata } from "./agent-runtime-metadata-ClBJSa7F.mjs";
import { r as resolveExecDefaults } from "./exec-defaults-DGSh4Lk5.mjs";
import { o as resolveGatewaySessionStoreTarget, s as resolveGatewaySessionStoreTargetWithStore } from "./session-utils-store-lookup-B0P8tI_m.mjs";
import { t as findCanonicalStoreMatch } from "./session-utils-store-selection-fXGPFfH8.mjs";
import { n as resolveConfiguredPrimaryModelForAgent } from "./utility-model-D_Q_w5Zo.mjs";
import { t as listGatewayAgentsBasic } from "./agent-list-MjP0aLqX.mjs";
import { r as resolveGatewayAssistantAvatar } from "./assistant-avatar-Dtt2jKna.mjs";
import { t as projectWorkerPlacementAgentRuntime } from "./placement-session-runtime-C0kqyrmj.mjs";
import { i as resolveGatewayModelThinkingProfile } from "./session-utils-model-DV42Uc60.mjs";
//#region src/gateway/session-utils-store.ts
/**
* Returns the owning agent id if the session key belongs to an agent that is no
* longer present in config (deleted). Returns null for non-agent legacy/global
* keys, confirmed ACP runtime session keys, or when the owning agent still
* exists (#65524).
*/
function resolveDeletedAgentIdFromSessionKey(cfg, sessionKey, entry, options) {
	const parsed = parseAgentSessionKey(sessionKey);
	if (!parsed) return null;
	const agentId = normalizeAgentId(parsed.agentId);
	if (listAgentIds(cfg).includes(agentId)) return null;
	if (isAcpSessionKey(sessionKey) && !parsed.rest.startsWith("acp:binding:")) {
		if (options?.acpMeta !== void 0 ? options.acpMeta : readAcpMetaForDeletedAgentCheck({
			cfg,
			sessionKey,
			entry,
			acpMetadataSessionKey: options?.acpMetadataSessionKey
		})) return null;
	}
	return agentId;
}
function readAcpMetaForDeletedAgentCheck(params) {
	if (params.entry?.acp) return params.entry.acp;
	const acpMetadataSessionKey = normalizeOptionalString(params.acpMetadataSessionKey);
	const directKeys = /* @__PURE__ */ new Set();
	if (acpMetadataSessionKey) directKeys.add(acpMetadataSessionKey);
	else {
		const acpMeta = readAcpSessionMeta({
			sessionKey: params.sessionKey,
			cfg: params.cfg
		});
		if (acpMeta) return acpMeta;
	}
	directKeys.add(params.sessionKey);
	for (const directKey of directKeys) {
		const agentId = parseAgentSessionKey(directKey)?.agentId ?? tryResolveSessionCompatibilityOwnerAgentId(params.cfg, directKey);
		const acpMeta = readAcpSessionMetaForEntry({
			sessionKey: directKey,
			...agentId ? { agentId } : {},
			entry: params.entry ?? void 0
		});
		if (acpMeta) return acpMeta;
	}
}
function loadSessionEntryWithMode(sessionKey, opts, readOnly, cfg = getRuntimeConfig()) {
	const key = normalizeOptionalString(sessionKey) ?? "";
	const target = resolveGatewaySessionStoreTargetWithStore({
		cfg,
		key,
		exactRead: true,
		readOnly,
		projection: opts?.projection,
		env: opts?.env,
		targetDiscoveryCache: opts?.targetDiscoveryCache,
		...opts?.clone === false ? { clone: false } : {},
		...opts?.agentId ? { agentId: opts.agentId } : {},
		...opts?.includeStoreChildEntries ? { includeStoreChildEntries: true } : {}
	});
	const storePath = target.storePath;
	const store = target.store;
	if (!readOnly) {
		for (const storeKey of target.storeKeys) if (isInternalSessionEffectsKey(storeKey)) delete store[storeKey];
	}
	const canonicalMatch = findCanonicalStoreMatch(store, target.storeKeys);
	const legacyKey = canonicalMatch?.key !== target.canonicalKey ? canonicalMatch?.key : void 0;
	const entry = readOnly && opts?.clone !== false && canonicalMatch?.entry ? structuredClone(canonicalMatch.entry) : canonicalMatch?.entry;
	return {
		cfg,
		agentId: target.agentId,
		storePath,
		store,
		...target.readSource ? { readSource: target.readSource } : {},
		...target.capturedReadSource ? { capturedReadSource: target.capturedReadSource } : {},
		...target.capturedReadSources ? { capturedReadSources: target.capturedReadSources } : {},
		entry,
		canonicalKey: target.canonicalKey,
		storeKeys: target.storeKeys,
		legacyKey
	};
}
function loadGatewaySessionEntry(sessionKey, opts, cfg) {
	return loadSessionEntryWithMode(sessionKey, opts, false, cfg);
}
function loadGatewaySessionEntryReadOnly(sessionKey, opts, cfg) {
	return loadSessionEntryWithMode(sessionKey, opts, true, cfg);
}
function resolveCanonicalSessionEntryFromStoreKeys(store, storeKeys) {
	return findCanonicalStoreMatch(store, storeKeys)?.entry;
}
function resolveCanonicalGatewaySessionStoreKey(params) {
	const target = resolveGatewaySessionStoreTarget({
		cfg: params.cfg,
		key: params.key,
		store: params.store,
		...params.agentId ? { agentId: params.agentId } : {}
	});
	const primaryKey = target.canonicalKey;
	findCanonicalStoreMatch(params.store, target.storeKeys);
	return {
		target,
		primaryKey,
		entry: params.store[primaryKey]
	};
}
function parseGroupKey(key) {
	const parts = (parseAgentSessionKey(key)?.rest ?? key).split(":").filter(Boolean);
	if (parts.length >= 3) {
		const [channel, kind, ...rest] = parts;
		if (kind === "group" || kind === "channel") return {
			channel,
			kind,
			id: rest.join(":")
		};
	}
	return null;
}
function isGroupOrChannelDisplaySession(entry, parsed) {
	return entry?.chatType === "group" || entry?.chatType === "channel" || parsed?.kind === "group" || parsed?.kind === "channel";
}
function resolveGatewayAgentModel(cfg, agentId, resolvedModel) {
	const primary = `${resolvedModel.provider}/${resolvedModel.model}`;
	const utilityOnly = !resolveConfiguredPrimaryModelForAgent({
		cfg,
		agentId
	}) && readUtilityModelSetting(cfg, agentId).kind === "explicit";
	const fallbackOverride = resolveAgentModelFallbacksOverride(cfg, agentId);
	const defaultFallbacks = resolveAgentModelFallbackValues(cfg.agents?.defaults?.model);
	const fallbacks = dedupeByKey((fallbackOverride ?? defaultFallbacks).map((value) => splitTrailingAuthProfile(value).model.trim()).filter(Boolean), normalizeLowercaseStringOrEmpty);
	return {
		...utilityOnly ? {} : { primary },
		...fallbacks.length > 0 ? { fallbacks } : {}
	};
}
function resolvedPermissionLabel(policy) {
	const { mode } = policy;
	const canonical = resolveExecPolicyForMode(mode);
	return mode !== "allowlist" && policy.security === canonical.security && policy.ask === canonical.ask ? SESSION_PERMISSION_BY_EXEC_MODE[mode] : void 0;
}
async function listAgentsForGateway(cfg, modelCatalog, options) {
	const [basic, provenanceRecords, execApprovals] = await Promise.all([
		listGatewayAgentsBasic(cfg),
		listAgentProvenance(),
		loadExecApprovalsReadOnlyAsync()
	]);
	const identityById = /* @__PURE__ */ new Map();
	for (const entry of listAgentEntries(cfg)) {
		if (!entry?.id) continue;
		const agentId = normalizeAgentId(entry.id);
		const avatar = normalizeOptionalString(entry.identity?.avatar);
		const httpAvatar = avatar && options?.httpAvatarBasePath !== void 0 ? (await resolveGatewayAssistantAvatar({
			cfg,
			identity: {
				agentId,
				avatar
			},
			httpBasePath: options.httpAvatarBasePath
		})).avatar : void 0;
		const avatarUrl = httpAvatar ?? await resolveAgentAvatarUrlFromSource(cfg, agentId, avatar);
		const identity = entry.identity ? {
			name: normalizeOptionalString(entry.identity.name),
			theme: normalizeOptionalString(entry.identity.theme),
			emoji: normalizeOptionalString(entry.identity.emoji),
			avatar: httpAvatar ?? avatar,
			avatarUrl
		} : void 0;
		identityById.set(agentId, identity);
	}
	const roster = options?.includeSystem ? basic.agents : basic.agents.filter((entry) => entry.kind !== "system");
	const provenanceById = new Map(provenanceRecords.map((record) => [record.agentId, record]));
	const agents = roster.map((entry) => {
		const { id } = entry;
		const execDefaults = resolveExecDefaults({
			cfg,
			agentId: id,
			execApprovals
		});
		const defaultPermissionMode = resolveSandboxConfigForAgent(cfg, id).mode === "off" ? resolvedPermissionLabel(execDefaults) : void 0;
		const resolvedModel = resolveDefaultModelForAgent({
			cfg,
			agentId: id
		});
		const model = resolveGatewayAgentModel(cfg, id, resolvedModel);
		const utilitySetting = readUtilityModelSetting(cfg, id);
		const selectionParams = {
			cfg,
			agentId: id,
			defaultProvider: resolvedModel.provider
		};
		const utility = utilitySetting.kind === "explicit" ? resolveModelRefFromString({
			...selectionParams,
			raw: utilitySetting.modelRef,
			aliasIndex: buildModelAliasIndex(selectionParams)
		})?.ref : void 0;
		const sessionKey = resolveAgentMainSessionKey({
			cfg,
			agentId: id
		});
		const agentRuntime = projectWorkerPlacementAgentRuntime(resolveModelAgentRuntimeMetadata({
			cfg,
			agentId: id,
			provider: resolvedModel.provider,
			model: resolvedModel.model,
			sessionKey,
			acpRuntime: false
		}));
		const hasAgentCatalog = options?.modelCatalogByAgentId?.has(id);
		const preparedCatalog = hasAgentCatalog ? options?.modelCatalogByAgentId?.get(id) : modelCatalog ? void 0 : options?.modelCatalogByAgentId?.get(basic.defaultId);
		const agentModelCatalog = hasAgentCatalog ? preparedCatalog?.entries : modelCatalog ?? preparedCatalog?.entries;
		const thinkingProfile = resolveGatewayModelThinkingProfile({
			cfg,
			agentId: id,
			provider: resolvedModel.provider,
			model: resolvedModel.model,
			modelCatalog: agentModelCatalog,
			sessionKey,
			providerPolicySource: preparedCatalog?.pluginRegistry
		});
		const workspace = resolveAgentWorkspaceDir(cfg, id);
		const workspaceGit = insideGitCheckout(workspace);
		const agent = Object.assign({
			id,
			...entry.admissionRefusal ? {
				status: entry.status,
				admissionRefusal: entry.admissionRefusal
			} : {},
			...options?.includeSystem ? { kind: entry.kind } : {},
			name: entry.name,
			identity: identityById.get(id),
			workspace,
			workspaceGit,
			agentRuntime,
			thinkingLevels: thinkingProfile.thinkingLevels,
			thinkingOptions: thinkingProfile.thinkingLevels.map((level) => level.label),
			thinkingDefault: thinkingProfile.thinkingDefault
		}, { model }, utility ? { utilityModel: `${utility.provider}/${utility.model}` } : {}, defaultPermissionMode ? { defaultPermissionMode } : {});
		const provenance = provenanceById.get(id);
		return provenance ? Object.assign(agent, {
			createdVia: provenance.createdVia,
			creatorAgentId: provenance.creatorAgentId,
			createdAt: provenance.createdAtMs
		}) : agent;
	});
	return {
		defaultId: basic.defaultId,
		ownership: basic.ownership,
		selectionRequired: basic.selectionRequired,
		mainKey: basic.mainKey,
		scope: basic.scope,
		agents
	};
}
//#endregion
export { parseGroupKey as a, resolveDeletedAgentIdFromSessionKey as c, loadGatewaySessionEntryReadOnly as i, listAgentsForGateway as n, resolveCanonicalGatewaySessionStoreKey as o, loadGatewaySessionEntry as r, resolveCanonicalSessionEntryFromStoreKeys as s, isGroupOrChannelDisplaySession as t };
