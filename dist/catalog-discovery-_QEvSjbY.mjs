//#region packages/plugin-package-contract/src/catalog-order.ts
/** Compare registry-issued category priorities, then downloads and canonical identity. */
function comparePluginCatalogEntries(left, right, category) {
	if (category) {
		const leftRank = left.catalog.categoryRanks?.[category] ?? Number.MAX_SAFE_INTEGER;
		const rightRank = right.catalog.categoryRanks?.[category] ?? Number.MAX_SAFE_INTEGER;
		if (leftRank !== rightRank) return leftRank - rightRank;
	}
	const downloads = (right.catalog.downloads ?? 0) - (left.catalog.downloads ?? 0);
	const leftIdentity = left.catalog.packageName ?? left.id;
	const rightIdentity = right.catalog.packageName ?? right.id;
	return downloads || (leftIdentity < rightIdentity ? -1 : leftIdentity > rightIdentity ? 1 : 0);
}
//#endregion
//#region src/plugins/catalog-discovery.ts
const DISCOVERY_ID_PREFIX = "ch_";
const LOCAL_DISCOVERY_ID_PREFIX = "local_";
const DISCOVERY_ID_PAYLOAD = /^[A-Za-z0-9_-]+$/u;
function normalizedAlias(value) {
	return value?.trim().toLowerCase() || void 0;
}
function indexClawHubPlugins(plugins) {
	const index = /* @__PURE__ */ new Map();
	for (const plugin of plugins) {
		const identity = normalizedAlias(localClawHubIdentity(plugin));
		if (identity) index.set(identity, plugin);
	}
	return index;
}
function projectLocalFacts(plugin, mutationAllowed, remoteInstallable = true) {
	if (!plugin) return {
		present: false,
		installed: false,
		enabled: false,
		state: "not-installed",
		action: mutationAllowed ? "install" : "unavailable"
	};
	return {
		present: true,
		installed: plugin.installed,
		enabled: plugin.enabled,
		state: plugin.state,
		pluginId: plugin.id,
		...!plugin.installed && plugin.install ? { install: plugin.install } : {},
		action: plugin.installed ? "manage" : mutationAllowed && (remoteInstallable || plugin.install) ? "install" : "unavailable"
	};
}
/** URL-safe route identity. Package aliases remain private to the Gateway join. */
function encodeDiscoveryId(prefix, identity) {
	const normalized = identity.trim();
	if (!normalized) throw new Error("Cannot encode an empty plugin discovery identity.");
	return `${prefix}${Buffer.from(normalized, "utf8").toString("base64url")}`;
}
function encodePluginDiscoveryId(packageName) {
	const normalized = packageName.trim();
	if (!normalized) throw new Error("Cannot encode an empty ClawHub package identity.");
	return encodeDiscoveryId(DISCOVERY_ID_PREFIX, normalized);
}
function encodeLocalPluginDiscoveryId(identity) {
	return encodeDiscoveryId(LOCAL_DISCOVERY_ID_PREFIX, identity);
}
function resolvePluginDiscoveryIdentity(id) {
	const prefix = id.startsWith(DISCOVERY_ID_PREFIX) ? DISCOVERY_ID_PREFIX : id.startsWith(LOCAL_DISCOVERY_ID_PREFIX) ? LOCAL_DISCOVERY_ID_PREFIX : void 0;
	if (!prefix) return;
	const payload = id.slice(prefix.length);
	if (!payload || !DISCOVERY_ID_PAYLOAD.test(payload)) return;
	try {
		const identity = Buffer.from(payload, "base64url").toString("utf8");
		return encodeDiscoveryId(prefix, identity) === id ? {
			origin: prefix === DISCOVERY_ID_PREFIX ? "clawhub" : "local",
			identity
		} : void 0;
	} catch {
		return;
	}
}
function joinClawHubPluginCatalog(params) {
	const localIndex = indexClawHubPlugins(params.local.plugins);
	const remote = params.remote.map((plugin) => {
		const localPlugin = localIndex.get(normalizedAlias(plugin.packageName) ?? "");
		const categories = [.../* @__PURE__ */ new Set([...plugin.categories, ...localPlugin?.capabilityCategories ?? []])];
		return {
			id: encodePluginDiscoveryId(plugin.packageName),
			catalog: {
				name: plugin.displayName,
				packageName: plugin.packageName,
				...plugin.summary ? { summary: plugin.summary } : {},
				family: plugin.family,
				...plugin.ownerHandle ? { author: plugin.ownerHandle } : {},
				official: plugin.isOfficial,
				categories,
				...categoryPriorityFacts(plugin.packageName, categories, params.categories),
				...plugin.iconUrl ? { imageUrl: plugin.iconUrl } : {},
				...plugin.latestVersion ? { latestVersion: plugin.latestVersion } : {},
				...plugin.downloads !== void 0 ? { downloads: plugin.downloads } : {},
				...plugin.installs !== void 0 ? { installs: plugin.installs } : {},
				...plugin.verificationTier ? { verificationTier: plugin.verificationTier } : {},
				...plugin.featured !== void 0 ? { featured: plugin.featured } : {},
				...plugin.trending !== void 0 ? { trending: plugin.trending } : {},
				...plugin.featuredRank !== void 0 ? { featuredRank: plugin.featuredRank } : {},
				...plugin.trendingRank !== void 0 ? { trendingRank: plugin.trendingRank } : {},
				publishedToClawHub: true
			},
			local: projectLocalFacts(localPlugin, params.local.mutationAllowed)
		};
	});
	if (!params.includeBundledOnly && params.intent !== "all" || params.cursor) return remote;
	const publishedPackages = new Set(params.remote.map((plugin) => normalizedAlias(plugin.packageName)));
	const query = normalizedAlias(params.query);
	const joined = [...params.local.plugins.filter((plugin) => !publishedPackages.has(normalizedAlias(localClawHubIdentity(plugin))) && (params.intent === "all" && plugin.installed && (!params.categories || params.query?.trim() || plugin.capabilityCategories?.some((category) => !params.category || category === params.category)) || params.includeBundledOnly && plugin.origin === "bundled" && (params.intent !== "bundled" || !localClawHubIdentity(plugin)))).filter((plugin) => {
		const categories = localDiscoveryCategories(plugin);
		if (params.category && !categories.includes(params.category)) return false;
		if (!query) return true;
		return [
			plugin.id,
			plugin.packageName,
			plugin.name,
			plugin.description,
			...categories
		].flatMap((value) => value ? [value.toLowerCase()] : []).some((value) => value.includes(query));
	}).toSorted((left, right) => left.name.localeCompare(right.name)).map((plugin) => projectLocalDiscoveryEntry(plugin, params.local.mutationAllowed, params.includeBundledOnly && plugin.origin === "bundled", params.categories)), ...remote];
	return params.intent === "all" && !query ? joined.toSorted((left, right) => comparePluginCatalogEntries(left, right, params.category)) : joined;
}
function localDiscoveryCategories(plugin) {
	return [.../* @__PURE__ */ new Set([...plugin.categories ?? (plugin.category ? [plugin.category] : []), ...plugin.capabilityCategories ?? []])];
}
function localClawHubIdentity(plugin) {
	return plugin.clawhubPackage ?? (plugin.install?.source === "clawhub" ? plugin.install.packageName : void 0);
}
function projectLocalDiscoveryEntry(plugin, mutationAllowed, publicationVerified = false, categories) {
	const clawhubIdentity = localClawHubIdentity(plugin);
	const publishedToClawHub = clawhubIdentity ? true : publicationVerified ? false : void 0;
	const packageName = plugin.clawhubPackage ?? plugin.packageName;
	const official = plugin.origin === "bundled";
	return {
		id: clawhubIdentity ? encodePluginDiscoveryId(clawhubIdentity) : encodeLocalPluginDiscoveryId(plugin.id),
		catalog: {
			name: plugin.name,
			...packageName ? { packageName } : {},
			...plugin.description ? { summary: plugin.description } : {},
			official,
			...official ? { author: "openclaw" } : {},
			categories: localDiscoveryCategories(plugin),
			...official ? categoryPriorityFacts(packageName, localDiscoveryCategories(plugin), categories) : {},
			...publishedToClawHub !== void 0 ? { publishedToClawHub } : {},
			...plugin.version ? { latestVersion: plugin.version } : {}
		},
		local: projectLocalFacts(plugin, mutationAllowed, false)
	};
}
function categoryPriorityFacts(packageName, memberships, categories = []) {
	const ranks = categories.flatMap((category) => {
		const rank = packageName && memberships.includes(category.slug) ? category.pinnedPackages?.indexOf(packageName) ?? -1 : -1;
		return rank >= 0 ? [[category.slug, rank]] : [];
	});
	return ranks.length ? { categoryRanks: Object.fromEntries(ranks) } : {};
}
function findLocalPluginByIdentity(local, identity, origin = "clawhub") {
	return origin === "local" ? local.plugins.find((plugin) => plugin.id === identity) : indexClawHubPlugins(local.plugins).get(normalizedAlias(identity) ?? "");
}
function joinLocalPluginDetail(params) {
	const plugin = projectLocalDiscoveryEntry(params.plugin, params.local.mutationAllowed);
	const inspection = params.inspection;
	const capabilities = inspection?.overview?.capabilities;
	const contracts = { ...capabilities?.contracts };
	if (inspection?.declared.tools.length) contracts.tools = inspection.declared.tools;
	return {
		plugin,
		detail: {
			origin: "local",
			...plugin.catalog.official ? { author: {
				handle: "openclaw",
				displayName: "OpenClaw",
				official: true
			} } : inspection?.overview?.publisherName ? { author: { displayName: inspection.overview.publisherName } } : {},
			...params.plugin.packageName ? { packageName: params.plugin.packageName } : {},
			topics: [],
			...inspection?.overview?.readme ? { readme: inspection.overview.readme } : {},
			...inspection?.overview?.repositoryUrl ? { repositoryUrl: inspection.overview.repositoryUrl } : {},
			...inspection?.overview?.documentationUrl ? { documentationUrl: inspection.overview.documentationUrl } : {},
			...Object.keys(contracts).length ? { contracts } : {},
			...capabilities?.providers.length ? { providers: capabilities.providers } : {},
			...capabilities?.channels.length ? { channels: capabilities.channels } : {},
			...capabilities?.ui !== void 0 ? { uiCapabilities: capabilities.ui } : {},
			configuration: [],
			mcpServers: inspection?.components.mcpServers ?? [],
			skills: (inspection?.components.skills ?? []).map((name) => ({ name })),
			versions: []
		}
	};
}
function joinClawHubPluginDetail(params) {
	const [plugin] = joinClawHubPluginCatalog({
		remote: [params.remote],
		local: params.local
	});
	if (!plugin) throw new Error("ClawHub returned no plugin detail.");
	return {
		plugin,
		detail: {
			origin: "clawhub",
			packageName: params.remote.packageName,
			...params.remote.owner ? { author: params.remote.owner } : {},
			topics: params.remote.topics,
			...params.remote.createdAt !== void 0 ? { createdAt: params.remote.createdAt } : {},
			...params.remote.updatedAt !== void 0 ? { updatedAt: params.remote.updatedAt } : {},
			...params.remote.readme ? { readme: params.remote.readme } : {},
			...params.remote.repositoryUrl ? { repositoryUrl: params.remote.repositoryUrl } : {},
			...params.remote.documentationUrl ? { documentationUrl: params.remote.documentationUrl } : {},
			...params.remote.compatibility ? { compatibility: params.remote.compatibility } : {},
			...params.remote.contracts ? { contracts: params.remote.contracts } : {},
			...params.remote.providers ? { providers: params.remote.providers } : {},
			...params.remote.channels ? { channels: params.remote.channels } : {},
			...params.remote.uiCapabilities !== void 0 ? { uiCapabilities: params.remote.uiCapabilities } : {},
			configuration: params.remote.configFields,
			mcpServers: params.remote.mcpServers,
			skills: params.remote.skills,
			versions: params.remote.versions,
			...params.remote.verification ? { verification: params.remote.verification } : {},
			...params.remote.security ? { security: params.remote.security } : {}
		}
	};
}
//#endregion
export { joinClawHubPluginDetail as a, joinClawHubPluginCatalog as i, encodePluginDiscoveryId as n, joinLocalPluginDetail as o, findLocalPluginByIdentity as r, resolvePluginDiscoveryIdentity as s, encodeLocalPluginDiscoveryId as t };
