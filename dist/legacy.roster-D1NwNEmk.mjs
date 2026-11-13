import { l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import "./utils-DUAwk2p5.mjs";
import { n as normalizeAgentId } from "./agent-id-D1-Q6vR4.mjs";
import "./agent-scope-config-Dm6T00l4.mjs";
import "./session-key-BC4m_Ly5.mjs";
import { a as readAgentRosterProperty, l as tryResolveSoleAgentId, n as listAgentEntries } from "./agent-roster-B45JERT5.mjs";
import { t as resolveDefaultAgentWorkspaceDir } from "./workspace-default-path-BG9KN4ds.mjs";
import "./workspace-default-CQbD5G-j.mjs";
import { i as tryGetLegacyDefaultAgentId, r as retainLegacyDefaultAgentId } from "./legacy.default-agent-owner-C1atgXtB.mjs";
import { t as isChannelConfigMetadataKey } from "./config-metadata-aX1D2IMg.mjs";
import { t as normalizeRouteBindingChannelId } from "./binding-scope-9Xwo2CwM.mjs";
import { t as isPerAgentSessionStoreConfig } from "./session-store-config-BTa4BrjU.mjs";
//#region src/config/legacy.default-agent-roles.ts
function isChannelWideBinding(binding, channelId) {
	const match = binding.match;
	return isRecord(match) && normalizeRouteBindingChannelId(typeof match.channel === "string" ? match.channel : void 0) === channelId && (typeof match.accountId === "string" ? match.accountId.trim() : void 0) === "*" && match.peer === void 0 && !normalizeOptionalString(match.guildId) && !normalizeOptionalString(match.teamId) && (!Array.isArray(match.roles) || match.roles.length === 0);
}
function listUnboundAmbientChannelIds(cfg, ambientChannelIds) {
	if (cfg.bindings && !Array.isArray(cfg.bindings)) return [];
	const bindings = (cfg.bindings ?? []).filter((binding) => isRecord(binding) && binding.type !== "acp");
	const channels = new Set(ambientChannelIds.map(normalizeRouteBindingChannelId).filter((id) => Boolean(id)));
	if (isRecord(cfg.channels)) for (const [id, value] of Object.entries(cfg.channels)) {
		const channelId = normalizeRouteBindingChannelId(id);
		if (channelId && !isChannelConfigMetadataKey(id) && (!isRecord(value) || value.enabled !== false)) channels.add(channelId);
	}
	return [...channels].toSorted().filter((channelId) => !bindings.some((binding) => isChannelWideBinding(binding, channelId)));
}
/** Preserve a legacy workspace locator without assigning any runtime ownership. */
function resolveLegacyAgentWorkspacePin(defaultWorkspace, entry, options = {}) {
	return !Object.hasOwn(entry, "workspace") || typeof entry.workspace === "string" && entry.workspace.trim().length === 0 ? normalizeOptionalString(defaultWorkspace) ?? resolveDefaultAgentWorkspaceDir(options.env, options.homedir) : void 0;
}
function resolveLegacyFirstAgentWorkspacePin(agents, entries, options = {}) {
	return agents.ownership === void 0 && entries.length > 1 && entries.every((entry) => !Object.hasOwn(entry, "default") || entry.default === false) ? resolveLegacyAgentWorkspacePin(isRecord(agents.defaults) ? agents.defaults.workspace : void 0, entries[0], options) : void 0;
}
function materializeLegacyDefaultAgentRoles(cfg, legacyDefaultAgentId, options = {}) {
	const agentId = normalizeAgentId(legacyDefaultAgentId);
	let next = cfg;
	const insertedPaths = [];
	if (options.materializeWorkspace) {
		const entries = { ...next.agents?.entries };
		const entryKey = Object.keys(entries).find((candidate) => normalizeAgentId(candidate) === agentId);
		const entry = entryKey ? entries[entryKey] : void 0;
		const workspace = entry ? resolveLegacyAgentWorkspacePin(next.agents?.defaults?.workspace, entry, options) : void 0;
		if (entryKey && entry && workspace !== void 0) {
			entries[entryKey] = {
				...entry,
				workspace
			};
			next = {
				...next,
				agents: {
					...next.agents,
					entries
				}
			};
			insertedPaths.push([
				"agents",
				"entries",
				entryKey,
				"workspace"
			]);
		}
	}
	const channels = listUnboundAmbientChannelIds(cfg, options.ambientChannelIds ?? []);
	if (channels.length > 0) {
		next = {
			...next,
			bindings: [...Array.isArray(next.bindings) ? next.bindings : [], ...channels.map((channel) => ({
				agentId,
				match: {
					channel,
					accountId: "*"
				}
			}))]
		};
		insertedPaths.push(["bindings"]);
	}
	const rawDefaults = cfg.agents?.defaults;
	const defaults = isRecord(rawDefaults) ? rawDefaults : void 0;
	if (rawDefaults === void 0 || defaults) {
		const soleFallback = normalizeAgentId(tryResolveSoleAgentId(cfg) ?? "main");
		const unset = (key) => defaults?.[key] === void 0 || isRecord(defaults[key]) && !Object.hasOwn(defaults[key], "agentId");
		const materializedDefaults = { ...defaults };
		let changed = false;
		const materialize = (key, enabled) => {
			if (!enabled) return;
			materializedDefaults[key] = {
				...isRecord(materializedDefaults[key]) ? materializedDefaults[key] : {},
				agentId
			};
			insertedPaths.push([
				"agents",
				"defaults",
				key,
				"agentId"
			]);
			changed = true;
		};
		materialize("heartbeat", !listAgentEntries(cfg).some((entry) => entry.heartbeat) && defaults?.heartbeat === void 0);
		materialize("systemAgent", unset("systemAgent"));
		materialize("authInheritance", agentId !== soleFallback && unset("authInheritance"));
		materialize("sessionStore", options.materializeSessionStore !== false && !isPerAgentSessionStoreConfig(cfg.session?.store) && unset("sessionStore"));
		if (changed) next = {
			...next,
			agents: {
				...next.agents,
				defaults: materializedDefaults
			}
		};
	}
	const talk = isRecord(cfg.talk) ? cfg.talk : void 0;
	if ((cfg.talk === void 0 || talk) && (!talk || !Object.hasOwn(talk, "agentId"))) {
		next = {
			...next,
			talk: {
				...talk,
				agentId
			}
		};
		insertedPaths.push(["talk", "agentId"]);
	}
	return {
		config: next,
		insertedPaths
	};
}
//#endregion
//#region src/config/legacy.roster.ts
/** Keeps Doctor's allocated identities tied to their original authored list positions. */
function projectLegacyAgentRosterEntries(list) {
	const entries = [];
	const diagnostics = [];
	const ids = /* @__PURE__ */ new Set();
	for (const [sourceIndex, value] of list.entries()) {
		if (!isRecord(value)) {
			diagnostics.push(`Removed malformed agents.list[${sourceIndex}] entry.`);
			continue;
		}
		const rawId = typeof value.id === "string" && value.id.trim() ? value.id.trim() : "agent";
		const requestedId = normalizeAgentId(rawId);
		if (requestedId !== rawId) diagnostics.push(`Normalized agents.list id "${rawId}" → agents.entries.${requestedId}.`);
		let id = requestedId;
		let suffix = 2;
		while (ids.has(id)) {
			id = `${requestedId}-${suffix}`;
			suffix += 1;
		}
		const { id: _id, ...config } = value;
		entries.push({
			sourceIndex,
			id,
			config
		});
		ids.add(id);
		if (id !== requestedId) diagnostics.push(`Moved duplicate agents.list id "${requestedId}" to agents.entries.${id}.`);
	}
	return {
		entries,
		diagnostics
	};
}
/** Converts a valid legacy roster without applying ownership or runtime migrations. */
function parseLegacyAgentRoster(value) {
	if (!Array.isArray(value)) return;
	const ids = /* @__PURE__ */ new Set();
	const entries = [];
	for (const entry of value) {
		if (!isRecord(entry)) return;
		const { id, ...config } = entry;
		if (typeof id !== "string" || id.trim() !== id || !id) return;
		const normalizedId = normalizeAgentId(id);
		if (normalizedId !== id || ids.has(normalizedId)) return;
		ids.add(id);
		entries.push([id, config]);
	}
	return {
		entries: Object.fromEntries(entries),
		order: [...ids]
	};
}
function migratePersistedImplicitMainRoster(raw, options = {}) {
	if (!isRecord(raw)) return {
		config: raw,
		changed: false,
		diagnostics: []
	};
	const root = raw;
	if (Object.hasOwn(root, "agents") && !isRecord(root.agents)) return {
		config: raw,
		changed: false,
		diagnostics: []
	};
	let agents = isRecord(root.agents) ? root.agents : {};
	let convertedLegacyList = false;
	let legacyRoster;
	let rosterProperty = readAgentRosterProperty({
		...root,
		agents
	});
	if (rosterProperty?.kind === "list") {
		const roster = parseLegacyAgentRoster(rosterProperty.value);
		if (!roster) return {
			config: raw,
			changed: false,
			diagnostics: []
		};
		legacyRoster = roster;
		const { list: _list, ...rest } = agents;
		agents = {
			...rest,
			entries: roster.entries
		};
		convertedLegacyList = true;
		rosterProperty = readAgentRosterProperty({
			...root,
			agents
		});
	}
	const entries = rosterProperty?.kind === "entries" ? rosterProperty.value : void 0;
	if (!rosterProperty || isRecord(entries) && Object.keys(entries).length === 0) {
		if (agents.ownership === "explicit") return {
			config: convertedLegacyList ? {
				...root,
				agents
			} : raw,
			changed: convertedLegacyList,
			diagnostics: convertedLegacyList ? ["Moved agents.list to keyed agents.entries."] : []
		};
		return {
			config: {
				...root,
				agents: {
					...agents,
					entries: { main: {} }
				}
			},
			changed: true,
			diagnostics: convertedLegacyList ? ["Moved agents.list to keyed agents.entries."] : []
		};
	}
	if (!isRecord(entries)) return {
		config: raw,
		changed: false,
		diagnostics: []
	};
	const roster = entries;
	const validIds = legacyRoster?.order ?? Object.entries(roster).flatMap(([id, entry]) => isRecord(entry) ? [id] : []);
	if (validIds.length === 0) return {
		config: raw,
		changed: false,
		diagnostics: []
	};
	if (validIds.some((id) => {
		const entry = roster[id];
		return Object.hasOwn(entry, "default") && typeof entry.default !== "boolean";
	})) return {
		config: raw,
		changed: false,
		diagnostics: []
	};
	const markedIds = validIds.filter((id) => roster[id].default === true);
	const hasValidLegacyMarker = agents.ownership !== "explicit" && markedIds.length === 1;
	const legacyDefaultAgentId = tryGetLegacyDefaultAgentId(raw) ?? (validIds.length > 1 && hasValidLegacyMarker ? markedIds[0] : void 0);
	let nextRoot = {
		...root,
		agents
	};
	let insertedPaths = [];
	const diagnostics = convertedLegacyList ? ["Moved agents.list to keyed agents.entries."] : [];
	let changed = convertedLegacyList;
	if (legacyRoster && !legacyDefaultAgentId) {
		const firstId = legacyRoster.order[0];
		const entry = legacyRoster.entries[firstId];
		const workspace = resolveLegacyFirstAgentWorkspacePin(agents, legacyRoster.order.map((id) => legacyRoster.entries[id]), options);
		if (workspace !== void 0) {
			nextRoot = {
				...nextRoot,
				agents: {
					...agents,
					entries: {
						...roster,
						[firstId]: {
							...entry,
							workspace
						}
					}
				}
			};
			insertedPaths.push([
				"agents",
				"entries",
				firstId,
				"workspace"
			]);
			diagnostics.push("Preserved the first legacy agent's existing workspace.");
		}
	}
	if (legacyDefaultAgentId && options.materializeRoles !== false) {
		const materialized = materializeLegacyDefaultAgentRoles(nextRoot, legacyDefaultAgentId, options);
		nextRoot = materialized.config;
		insertedPaths = materialized.insertedPaths;
		if (insertedPaths.length > 0) {
			diagnostics.push("Materialized legacy per-surface agent ownership.");
			changed = true;
		}
	}
	if (hasValidLegacyMarker) {
		const nextAgents = nextRoot.agents ?? agents;
		const materializedEntries = nextAgents.entries ?? roster;
		nextRoot = {
			...nextRoot,
			agents: {
				...nextAgents,
				entries: Object.fromEntries(Object.entries(materializedEntries).map(([id, entry]) => {
					if (!isRecord(entry)) return [id, entry];
					const { default: _default, ...rest } = entry;
					return [id, rest];
				}))
			}
		};
		diagnostics.push("Removed retired agents.entries.*.default markers.");
		changed = true;
	}
	const config = changed ? nextRoot : raw;
	retainLegacyDefaultAgentId(config, legacyDefaultAgentId);
	return {
		config,
		changed,
		diagnostics,
		...insertedPaths.length > 0 ? { insertedPaths } : {},
		...legacyDefaultAgentId ? { retainedLegacyDefaultAgentId: legacyDefaultAgentId } : {}
	};
}
//#endregion
export { resolveLegacyFirstAgentWorkspacePin as a, materializeLegacyDefaultAgentRoles as i, parseLegacyAgentRoster as n, projectLegacyAgentRosterEntries as r, migratePersistedImplicitMainRoster as t };
