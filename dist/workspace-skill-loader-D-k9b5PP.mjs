import { l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import "./src-SskUVPJG.mjs";
import { t as stableStringify } from "./stable-stringify-CkQ0IEj1.mjs";
import { t as pruneMapToMaxSize } from "./map-size-CNcWiFKu.mjs";
import { t as createSubsystemLogger } from "./subsystem-CeqVSEVi.mjs";
import { n as sha256Hex } from "./node-crypto-BInnzoVt.mjs";
import "./crypto-digest-y6oZN-_F.mjs";
import { u as readRootJsonObjectSync } from "./json-files-Br8qKrAz.mjs";
import { t as redactConfigObject } from "./redact-snapshot-BGUUmDSs.mjs";
import { n as normalizeAgentId } from "./agent-id-D1-Q6vR4.mjs";
import { r as captureOpenClawStateWorkerContext } from "./openclaw-state-worker-context-C_iAE7YK.mjs";
import "./session-key-BC4m_Ly5.mjs";
import { t as shouldRejectHardlinkedPluginFiles } from "./hardlink-policy-CiAwtyyu.mjs";
import { a as normalizeSkillFilter, n as resolveEffectiveAgentSkillFilter, t as isSessionSkillEnabled } from "./agent-filter-Com2ua2W.mjs";
import { i as getAgentWorkspaceAccess } from "./workspace-access-DIRgQG5g.mjs";
import { t as resolveSkillSource } from "./source-DeRhM-ro.mjs";
import { t as canonicalizePath } from "./paths-CIwQeLl6.mjs";
import { i as resolveSkillManifestMetadata, n as resolveSkillInvocationPolicy, r as resolveSkillKey } from "./frontmatter-CP-MKgNH.mjs";
import { a as prepareSkillLibrarySelection, i as loadSkillLibrarySelection, n as captureSkillLibrarySelection, w as assertUnambiguousManagedSkillNames } from "./selection-C6VzDZA6.mjs";
import { n as resolveWorkspaceSkillDirectories, t as normalizeWorkspaceSkillRoots } from "./workspace-skill-roots-CFHkU9qW.mjs";
import { i as getSkillsSourceVersion, s as observeSkillsSnapshotSource } from "./refresh-state-Cazo5oir.mjs";
import { t as resolveBundledSkillsDir } from "./bundled-dir-DzBRNec_.mjs";
import { n as hasBinary } from "./config-eval-DZokHoB0.mjs";
import { o as prepareSkillBinaryProbe, s as resolveBundledAllowlist, u as shouldIncludeSkill } from "./config-DcPYl_g0.mjs";
import { f as readClawHubSkillsLockfileStatusSync } from "./clawhub-store-CE_V8mNK.mjs";
import { a as resolveLocalSkillCardStatusSync, n as readLocalSkillCardContentSync, r as resolveClawHubSkillStatusLinkSync } from "./clawhub-status-ChOfGQr7.mjs";
import { t as mergeRemoteNodeSkillEntries } from "./remote-skills-Co_eXsF5.mjs";
import { c as tryRealpath, i as resolveSkillsUserHomeDir, l as loadSingleSkillDirectory, n as compactSkillPath, r as resolvePluginSkillsDir } from "./skill-paths-BcXtEU9H.mjs";
import { a as SKILL_SOURCE_ORIGIN_RELATIVE_PATH, n as resolveWorkspaceSkillSourcePlan, r as splitSkillSourcePlan, t as resolveCustodianSkillAgentId } from "./workspace-skill-sources-cANwnBQq.mjs";
import { a as resolveSkillDiscoveryLimits } from "./skill-root-discovery-DJx5misP.mjs";
import { c as loadSkillRootRecords, l as warnInvalidSkill, s as loadGeneratedPluginSkillRecords } from "./plugin-skills-CNjaoQjW.mjs";
import path from "node:path";
//#region src/skills/discovery/status-files.ts
/** Read beside the skill files; Gateway configuration still determines eligibility. */
function readWorkspaceSkillStatusFacts(params) {
	const workspaceLock = readClawHubSkillsLockfileStatusSync(params.workspaceDir);
	const managedParent = path.dirname(path.resolve(params.managedSkillsDir));
	const managedLock = managedParent === path.resolve(params.workspaceDir) ? workspaceLock : readClawHubSkillsLockfileStatusSync(managedParent);
	return {
		workspaceDir: params.workspaceDir,
		managedSkillsDir: params.managedSkillsDir,
		files: params.entries.map((entry) => {
			const source = resolveSkillSource(entry.skill);
			const bundled = source === "openclaw-bundled" || source === "openclaw-custodian";
			const managed = source === "openclaw-managed";
			const skillKey = resolveSkillKey(entry.skill, entry);
			const clawhub = params.workspaceDir && !bundled ? resolveClawHubSkillStatusLinkSync({
				workspaceDir: managed ? managedParent : params.workspaceDir,
				skillDir: entry.skill.baseDir,
				skillKey,
				lockRead: managed ? managedLock : workspaceLock,
				lockfileScope: managed ? "managed" : "workspace"
			}) : void 0;
			const card = resolveLocalSkillCardStatusSync(entry.skill.baseDir);
			const content = card && params.skillCardKey === skillKey ? readLocalSkillCardContentSync(entry.skill.baseDir) : void 0;
			return {
				name: entry.skill.name,
				filePath: entry.skill.filePath,
				...clawhub ? { clawhub } : {},
				...card ? { skillCard: {
					...card,
					...content !== void 0 ? { content } : {}
				} } : {}
			};
		})
	};
}
//#endregion
//#region src/skills/runtime/snapshot-config-fingerprint.ts
let configFingerprints = /* @__PURE__ */ new WeakMap();
function fingerprintSkillSnapshotConfig(config) {
	const cached = configFingerprints.get(config);
	if (cached) return cached;
	const fingerprint = sha256Hex(stableStringify(redactConfigObject(config)));
	configFingerprints.set(config, fingerprint);
	return fingerprint;
}
function resetSkillSnapshotConfigFingerprintCache() {
	configFingerprints = /* @__PURE__ */ new WeakMap();
}
//#endregion
//#region src/skills/loading/skill-entry-metadata.ts
const MAX_SKILL_SOURCE_ORIGIN_BYTES = 16384;
function readSourceInstallSkillKey(skillDir) {
	try {
		const sourceOriginPath = path.join(skillDir, SKILL_SOURCE_ORIGIN_RELATIVE_PATH);
		const parentRealPath = tryRealpath(path.dirname(sourceOriginPath));
		if (!parentRealPath) return;
		const skillDirRealPath = tryRealpath(skillDir);
		if (!skillDirRealPath) return;
		const result = readRootJsonObjectSync({
			rootDir: skillDirRealPath,
			rootRealPath: skillDirRealPath,
			relativePath: path.relative(skillDirRealPath, path.join(parentRealPath, path.basename(sourceOriginPath))),
			boundaryLabel: "skill directory",
			rejectHardlinks: false,
			maxBytes: MAX_SKILL_SOURCE_ORIGIN_BYTES
		});
		return result.ok ? normalizeOptionalString(result.value.slug) : void 0;
	} catch {
		return;
	}
}
function resolveSkillEntryMetadata(params) {
	const metadata = resolveSkillManifestMetadata(params.frontmatter);
	if (metadata?.skillKey) return metadata;
	const sourceInstallSkillKey = readSourceInstallSkillKey(params.skillDir);
	if (!sourceInstallSkillKey) return metadata;
	return {
		...metadata,
		skillKey: sourceInstallSkillKey
	};
}
function createSkillEntry(record) {
	const { skill, frontmatter } = record;
	const invocation = resolveSkillInvocationPolicy(frontmatter);
	const entry = {
		...record.sourceOrder !== void 0 ? { sourceOrder: record.sourceOrder } : {},
		skill,
		frontmatter,
		metadata: resolveSkillEntryMetadata({
			frontmatter,
			skillDir: skill.baseDir
		}),
		invocation,
		exposure: {
			includeInRuntimeRegistry: true,
			includeInAvailableSkillsPrompt: !invocation.disableModelInvocation,
			userInvocable: invocation.userInvocable ?? true
		}
	};
	if (record.syncSourceDir !== void 0) entry.syncSourceDir = record.syncSourceDir;
	if (record.syncDirName !== void 0) entry.syncDirName = record.syncDirName;
	return entry;
}
//#endregion
//#region src/skills/loading/skill-precedence.ts
const skillsLogger$1 = createSubsystemLogger("skills");
const reportedSkillCollisions = /* @__PURE__ */ new Map();
const reportedGroupsBySource = /* @__PURE__ */ new Map();
function reportSkillPrecedenceCollisions(collisions, sourceKey) {
	const groups = /* @__PURE__ */ new Map();
	for (const { winner, loser } of collisions) {
		if (winner.contentHash && winner.contentHash === loser.contentHash && winner.name === loser.name && winner.description === loser.description && winner.disableModelInvocation === loser.disableModelInvocation) continue;
		const winnerRoot = winner.discoveryRoot?.path ?? winner.baseDir;
		const loserRoot = loser.discoveryRoot?.path ?? loser.baseDir;
		const key = JSON.stringify([
			winnerRoot,
			loserRoot,
			winner.source,
			loser.source
		]);
		const group = groups.get(key) ?? {
			winner,
			loser,
			winnerRoot,
			loserRoot,
			names: /* @__PURE__ */ new Set(),
			contents: /* @__PURE__ */ new Set()
		};
		group.names.add(winner.name);
		group.contents.add(JSON.stringify([winner, loser].map((skill) => [
			skill.name,
			skill.contentHash ?? skill.filePath,
			skill.description,
			skill.disableModelInvocation,
			skill.discoveryRoot?.worktree
		])));
		groups.set(key, group);
	}
	for (const key of reportedGroupsBySource.get(sourceKey) ?? []) if (!groups.has(key)) reportedSkillCollisions.delete(key);
	if (groups.size > 0) reportedGroupsBySource.set(sourceKey, new Set(groups.keys()));
	else reportedGroupsBySource.delete(sourceKey);
	for (const [key, group] of groups) {
		const digest = sha256Hex(JSON.stringify([...group.contents].toSorted()));
		if (reportedSkillCollisions.get(key) === digest) continue;
		reportedSkillCollisions.set(key, digest);
		const names = [...group.names].toSorted();
		const sample = names.slice(0, 3).map((name) => name.slice(0, 128));
		if (names.length > sample.length) sample.push(`+${names.length - sample.length} more`);
		const { winner, loser, winnerRoot, loserRoot } = group;
		const isWorkspaceSource = (source) => source === "openclaw-workspace" || source === "agents-skills-project";
		const lowerTrust = isWorkspaceSource(winner.source) && (loser.source === "openclaw-bundled" || loser.source === "openclaw-custodian") || winner.discoveryRoot?.worktree && !loser.discoveryRoot?.worktree && isWorkspaceSource(loser.source);
		skillsLogger$1[lowerTrust ? "warn" : "info"]("Skill precedence collisions resolved.", {
			winnerSource: winner.source,
			loserSource: loser.source,
			winnerRoot,
			loserRoot,
			skillCount: names.length,
			skills: sample,
			consoleMessage: `${compactSkillPath(winnerRoot)} shadows ${names.length} skills from ${compactSkillPath(loserRoot)} (${sample.join(", ")})`
		});
	}
}
function mergeSkillRecords(records, sourceKey, collisions) {
	const discoveredCollisions = collisions ?? [];
	const merged = /* @__PURE__ */ new Map();
	for (const record of records) {
		const replaced = merged.get(record.skill.name);
		if (replaced && canonicalizePath(record.skill.filePath) !== canonicalizePath(replaced.skill.filePath)) discoveredCollisions.push({
			winner: record.skill,
			loser: replaced.skill
		});
		merged.set(record.skill.name, record);
	}
	if (!collisions) reportSkillPrecedenceCollisions(discoveredCollisions, sourceKey);
	return [...merged.values()].toSorted((a, b) => a.skill.name.localeCompare(b.skill.name, "en"));
}
/** Append lower-precedence names without changing the order of either tier. */
function appendLowerPrecedenceSkillRecords(entries, lower, onCollision) {
	if (lower.length === 0) return entries;
	const winners = new Map(entries.map((entry) => [entry.skill.name, entry]));
	for (const entry of lower) {
		const winner = winners.get(entry.skill.name);
		if (winner) onCollision(winner, entry);
		else {
			winners.set(entry.skill.name, entry);
			entries.push(entry);
		}
	}
	return entries;
}
//#endregion
//#region src/skills/loading/workspace-skill-filter.ts
const skillsLogger = createSubsystemLogger("skills");
function filterSkillEntries(entries, config, skillFilter, skillOverrides, eligibility, hasBin, platform) {
	const bundledAllowlist = resolveBundledAllowlist(config);
	assertUnambiguousManagedSkillNames(entries);
	const normalized = normalizeSkillFilter(skillFilter);
	const filtered = entries.filter((entry) => isSessionSkillEnabled(entry.skill.name, normalized, skillOverrides, resolveSkillKey(entry.skill, entry)) && shouldIncludeSkill({
		entry,
		config,
		bundledAllowlist,
		eligibility,
		hasBin,
		platform
	}));
	if (skillFilter !== void 0 || skillOverrides !== void 0) {
		const label = normalized?.length ? normalized.join(", ") : "(none)";
		skillsLogger.debug(`Applying skill filter: ${label}`);
		skillsLogger.debug(`After skill filter: ${filtered.map((entry) => entry.skill.name).join(", ") || "(none)"}`);
	}
	return filtered;
}
function resolveEffectiveWorkspaceSkillFilter(opts) {
	if (opts?.skillFilter !== void 0) return normalizeSkillFilter(opts.skillFilter);
	if (opts?.agentSkillFilter === "ignore" || !opts?.config || !opts.agentId) return;
	return resolveEffectiveAgentSkillFilter(opts.config, opts.agentId);
}
//#endregion
//#region src/skills/loading/workspace-skill-loader.ts
const MAX_SKILL_ENTRY_CACHE_SIZE = 64;
const skillEntryCache = /* @__PURE__ */ new Map();
const agentSkillEntryCache = /* @__PURE__ */ new Map();
const pluginMetadataIds = /* @__PURE__ */ new WeakMap();
let nextPluginMetadataId = 0;
/** Scan selected roots on their owning host, retaining native precedence and file rules. */
function loadWorkspaceSkillSourceEntries(plan, config, collisions) {
	const grouped = /* @__PURE__ */ new Map();
	for (const root of plan.roots) {
		const records = grouped.get(root.tier) ?? [];
		for (const record of loadSkillRootRecords({
			...root,
			config
		})) records.push(Object.assign({}, record, { sourceOrder: root.order }));
		grouped.set(root.tier, records);
	}
	const extra = grouped.get("extra") ?? [];
	if (plan.pluginSkillsDir) for (const record of loadGeneratedPluginSkillRecords({
		pluginSkillsDir: plan.pluginSkillsDir,
		pluginSkillRoots: plan.pluginSkillRoots,
		source: "openclaw-extra",
		limits: resolveSkillDiscoveryLimits(config)
	})) extra.push(Object.assign({}, record, { sourceOrder: (plan.roots.find((root) => root.tier !== "extra")?.order ?? Math.max(-1, ...plan.roots.map((root) => root.order ?? -1)) + 1) - .5 }));
	grouped.set("extra", extra);
	grouped.get("bundled")?.sort((left, right) => left.skill.name.localeCompare(right.skill.name, "en") || left.skill.source.localeCompare(right.skill.source, "en"));
	return mergeSkillRecords([
		"extra",
		"bundled",
		"workshop",
		"managed",
		"personal",
		"workspace"
	].flatMap((tier) => grouped.get(tier) ?? []), JSON.stringify(["sources", plan.workspaceDir]), collisions).map(createSkillEntry);
}
function loadExecutionSkillEntries(executionWorkspaceDir, config, collisions) {
	return mergeSkillRecords(resolveWorkspaceSkillDirectories(executionWorkspaceDir).flatMap((root) => loadSkillRootRecords({
		...root,
		config
	})), JSON.stringify(["execution", executionWorkspaceDir]), collisions).map(createSkillEntry);
}
/** Run on the workspace host using an admitted source plan and native discovery limits. */
function readWorkspaceSkillSources(request) {
	const config = { skills: {
		limits: request.limits,
		load: { allowSymlinkTargets: request.sourcePlan.allowSymlinkTargets }
	} };
	const entries = request.bundledSkillName !== void 0 ? readBundledSkillEntries(request.bundledSkillName, {
		config,
		bundledSkillsDir: request.sourcePlan.bundledSkillsDir
	}) : loadWorkspaceSkillSourceEntries(request.sourcePlan, config);
	const executionEntries = request.executionWorkspaceDir ? loadExecutionSkillEntries(request.executionWorkspaceDir, config) : [];
	const bins = [.../* @__PURE__ */ new Set([
		"brew",
		"npm",
		"pnpm",
		"yarn",
		"bun",
		"uv",
		"go",
		...request.additionalBins,
		...entries.concat(executionEntries).flatMap((entry) => (entry.metadata?.requires?.bins ?? []).concat(entry.metadata?.requires?.anyBins ?? []))
	])].filter(hasBinary).toSorted();
	return {
		entries,
		executionEntries,
		runtime: {
			platform: process.platform,
			bins
		},
		...request.status ? { status: readWorkspaceSkillStatusFacts({
			entries,
			workspaceDir: request.sourcePlan.workspaceDir,
			managedSkillsDir: request.sourcePlan.managedSkillsDir,
			skillCardKey: request.status.skillCardKey
		}) } : {}
	};
}
function loadLocalSkillTiers(workspaceDir, opts) {
	const workspaceOnly = opts?.workspaceOnly === true;
	const { executionWorkspaceDir } = normalizeWorkspaceSkillRoots({
		agentWorkspaceDir: workspaceDir,
		executionWorkspaceDir: opts?.executionWorkspaceDir
	});
	const custodianAgentId = resolveCustodianSkillAgentId(opts?.config, opts?.agentId, workspaceOnly);
	const metadata = opts?.pluginMetadataSnapshot;
	let metadataId = metadata && pluginMetadataIds.get(metadata);
	if (metadata && metadataId === void 0) {
		metadataId = ++nextPluginMetadataId;
		pluginMetadataIds.set(metadata, metadataId);
	}
	const agentSourceKey = JSON.stringify([
		workspaceDir,
		workspaceOnly,
		opts?.gatewayOnly,
		opts?.agentId ? normalizeAgentId(opts.agentId) : void 0,
		custodianAgentId,
		opts?.managedSkillsDir,
		opts?.bundledSkillsDir,
		opts?.pluginSkillsDir ?? resolvePluginSkillsDir(),
		resolveSkillsUserHomeDir(),
		process.env.OPENCLAW_STATE_DIR
	]);
	const agentCacheKey = JSON.stringify([
		agentSourceKey,
		opts?.config ? fingerprintSkillSnapshotConfig(opts.config) : void 0,
		metadataId,
		getSkillsSourceVersion(workspaceDir)
	]);
	const sourceKey = JSON.stringify([agentSourceKey, executionWorkspaceDir]);
	const cacheKey = JSON.stringify([
		agentCacheKey,
		executionWorkspaceDir,
		getSkillsSourceVersion(workspaceDir, opts)
	]);
	const cachedEntries = skillEntryCache.get(cacheKey);
	if (cachedEntries) return cachedEntries;
	let agentTier = agentSkillEntryCache.get(agentCacheKey);
	if (!agentTier) {
		const plan = resolveWorkspaceSkillSourcePlan(workspaceDir, opts);
		const collisions = [];
		agentTier = {
			agent: loadWorkspaceSkillSourceEntries(opts?.gatewayOnly ? splitSkillSourcePlan(plan).gatewayPlan : plan, opts?.config, collisions),
			collisions
		};
		agentSkillEntryCache.set(agentCacheKey, agentTier);
		pruneMapToMaxSize(agentSkillEntryCache, MAX_SKILL_ENTRY_CACHE_SIZE);
	}
	const collisions = [...agentTier.collisions];
	const entries = {
		sourceKey,
		collisions,
		agent: agentTier.agent,
		execution: executionWorkspaceDir && !workspaceOnly && !opts?.gatewayOnly ? loadExecutionSkillEntries(executionWorkspaceDir, opts?.config, collisions) : []
	};
	skillEntryCache.set(cacheKey, entries);
	pruneMapToMaxSize(skillEntryCache, MAX_SKILL_ENTRY_CACHE_SIZE);
	const winners = appendLowerPrecedenceSkillRecords([...entries.agent], entries.execution, (winner, loser) => {
		if (canonicalizePath(winner.skill.filePath) !== canonicalizePath(loser.skill.filePath)) collisions.push({
			winner: winner.skill,
			loser: loser.skill
		});
	});
	const sourceOptions = {
		executionWorkspaceDir,
		workspaceOnly,
		gatewayOnly: opts?.gatewayOnly,
		agentId: opts?.agentId,
		config: opts?.config,
		managedSkillsDir: opts?.managedSkillsDir,
		bundledSkillsDir: opts?.bundledSkillsDir,
		pluginSkillsDir: opts?.pluginSkillsDir,
		pluginMetadataSnapshot: opts?.pluginMetadataSnapshot
	};
	observeSkillsSnapshotSource({
		workspaceDir,
		sourceKey,
		sourceScope: sourceOptions,
		entries: winners.toSorted((a, b) => a.skill.name.localeCompare(b.skill.name, "en")).map((entry) => ({
			skill: entry.skill,
			skillKey: resolveSkillKey(entry.skill, entry)
		})),
		reconcile: (inputs) => {
			if (inputs) {
				sourceOptions.config = inputs.config;
				sourceOptions.pluginMetadataSnapshot = inputs.pluginMetadataSnapshot;
			}
			return loadLocalSkillTiers(workspaceDir, sourceOptions).sourceKey;
		},
		suspend: () => {
			sourceOptions.config = void 0;
			sourceOptions.pluginMetadataSnapshot = void 0;
		}
	});
	return entries;
}
function mergeSkillTiers(tiers, opts, libraryEntries = opts?.librarySelections?.length ? loadSkillLibrarySelection(opts.librarySelections) : []) {
	const entries = mergeRemoteNodeSkillEntries(tiers.agent, opts?.eligibility?.nodeSkills);
	const collisions = [...tiers.collisions];
	if (tiers.execution.length > 0) {
		const localNames = new Set(tiers.agent.map((entry) => entry.skill.name));
		appendLowerPrecedenceSkillRecords(entries, tiers.execution, (winner, loser) => {
			if (!localNames.has(loser.skill.name)) collisions.push({
				winner: winner.skill,
				loser: loser.skill
			});
		});
	}
	reportSkillPrecedenceCollisions(collisions, tiers.sourceKey);
	entries.push(...libraryEntries);
	return entries;
}
/** Keep Library pins and physical read authority fixed across workspace discovery retries. */
function captureWorkspaceSkillPreparation(workspaceDir, opts, assertCurrent) {
	assertCurrent?.();
	const needsLibrary = opts?.bundledSkillName === void 0 && (opts?.entries === void 0 || Boolean(getAgentWorkspaceAccess(workspaceDir, "loadSkills")?.loadSkills));
	const librarySelections = captureSkillLibrarySelection(needsLibrary ? opts?.librarySelections ?? [] : []);
	const libraryContext = librarySelections.length ? captureOpenClawStateWorkerContext() : void 0;
	return {
		librarySelections,
		libraryContext,
		assertCurrent: () => {
			assertCurrent?.();
			libraryContext?.maintenanceScope?.assertAdmission();
			libraryContext?.admission.assertCurrent();
		}
	};
}
async function prepareCapturedWorkspaceSkillEntries(workspaceDir, opts, preparation) {
	const { assertCurrent, libraryContext, librarySelections } = preparation;
	assertCurrent();
	const access = getAgentWorkspaceAccess(workspaceDir, "loadSkills");
	if (!access?.loadSkills && opts?.bundledSkillName !== void 0) return { entries: readBundledSkillEntries(opts.bundledSkillName, opts) };
	if (!access?.loadSkills && opts?.entries !== void 0) return { entries: opts.entries };
	const libraryEntries = libraryContext ? await prepareSkillLibrarySelection(librarySelections, { env: libraryContext.environment }, assertCurrent) : [];
	assertCurrent();
	if (!access?.loadSkills) return { entries: mergeSkillTiers(loadLocalSkillTiers(workspaceDir, opts), opts, libraryEntries) };
	const bundledOnly = opts?.bundledSkillName !== void 0;
	const { agentWorkspaceDir, executionWorkspaceDir } = normalizeWorkspaceSkillRoots({
		agentWorkspaceDir: workspaceDir,
		executionWorkspaceDir: opts?.executionWorkspaceDir
	});
	const { gatewayPlan, workspacePlan } = splitSkillSourcePlan(resolveWorkspaceSkillSourcePlan(agentWorkspaceDir, opts));
	const gatewaySourceEntries = bundledOnly ? readBundledSkillEntries(opts.bundledSkillName, opts) : loadWorkspaceSkillSourceEntries(gatewayPlan, opts?.config);
	const gatewayEntries = [];
	for (const entry of gatewaySourceEntries) gatewayEntries.push({
		...entry,
		skill: {
			...entry.skill,
			fileHost: "gateway"
		}
	});
	const sources = await access.loadSkills({
		sourcePlan: bundledOnly ? {
			...workspacePlan,
			roots: []
		} : workspacePlan,
		executionWorkspaceDir: opts?.workspaceOnly || bundledOnly ? void 0 : executionWorkspaceDir,
		limits: resolveSkillDiscoveryLimits(opts?.config),
		additionalBins: [...new Set(libraryEntries.concat(gatewayEntries).concat(opts?.entries ?? []).flatMap((entry) => (entry.metadata?.requires?.bins ?? []).concat(entry.metadata?.requires?.anyBins ?? [])))],
		status: opts?.status
	});
	assertCurrent();
	const onWorkspace = (entry) => ({
		...entry,
		skill: {
			...entry.skill,
			fileHost: "workspace"
		}
	});
	const hostEntries = sources.entries.map(onWorkspace);
	const agentEntries = mergeSkillRecords([...gatewayEntries, ...hostEntries].toSorted((left, right) => {
		const order = (entry) => entry.sourceOrder ?? Math.max(-1, ...workspacePlan.roots.filter((root) => root.source === entry.skill.source).map((root) => root.order ?? -1));
		return order(left) - order(right);
	}), JSON.stringify(["remote-agent", agentWorkspaceDir]));
	return {
		entries: bundledOnly ? gatewayEntries : opts?.entries ?? mergeSkillTiers({
			sourceKey: JSON.stringify([
				"remote",
				agentWorkspaceDir,
				executionWorkspaceDir
			]),
			agent: agentEntries,
			execution: sources.executionEntries.map(onWorkspace),
			collisions: []
		}, opts, libraryEntries),
		runtime: sources.runtime,
		status: sources.status
	};
}
/** Acquire host source tiers before the native node/execution/Library merge. */
async function prepareWorkspaceSkillEntries(workspaceDir, opts, assertCurrent) {
	const preparation = captureWorkspaceSkillPreparation(workspaceDir, opts, assertCurrent);
	const sources = await prepareCapturedWorkspaceSkillEntries(workspaceDir, opts, preparation);
	preparation.assertCurrent();
	return sources;
}
async function resolveWorkspaceSkillPromptEntries(workspaceDir, opts) {
	const { entries, skillFilter } = await prepareWorkspaceSkillSelection(workspaceDir, opts, "prompt", opts?.assertCurrent);
	return {
		eligible: entries,
		skillFilter
	};
}
async function prepareWorkspaceSkillSelection(workspaceDir, opts, mode, assertCurrent) {
	const preparation = captureWorkspaceSkillPreparation(workspaceDir, opts, assertCurrent);
	for (;;) {
		preparation.assertCurrent();
		const sourceVersion = getSkillsSourceVersion(workspaceDir, opts);
		let skillFilter = mode === "prompt" ? resolveEffectiveWorkspaceSkillFilter(opts) : void 0;
		const sources = await prepareCapturedWorkspaceSkillEntries(workspaceDir, opts, preparation);
		preparation.assertCurrent();
		const entries = sources.entries;
		if (mode === "runtime") {
			const selection = resolveWorkspaceSkillLoad(workspaceDir, opts, entries);
			skillFilter = selection.effectiveSkillFilter;
			if (!selection.shouldFilter) return {
				entries,
				skillFilter
			};
		}
		const probe = await prepareSkillBinaryProbe(entries, {
			...opts,
			skillFilter
		}, preparation.assertCurrent, sources.runtime);
		preparation.assertCurrent();
		if (probe.needsRetry() || (mode === "runtime" || !opts?.entries) && getSkillsSourceVersion(workspaceDir, opts) !== sourceVersion) continue;
		const eligible = filterSkillEntries(entries, opts?.config, skillFilter, opts?.skillOverrides, opts?.eligibility, probe.hasBin, sources.runtime?.platform);
		preparation.assertCurrent();
		if (probe.needsRetry()) continue;
		return {
			entries: eligible,
			skillFilter
		};
	}
}
function resolveWorkspaceSkillLoad(workspaceDir, opts, preparedEntries) {
	const roots = normalizeWorkspaceSkillRoots({
		agentWorkspaceDir: workspaceDir,
		executionWorkspaceDir: opts?.executionWorkspaceDir
	});
	const entries = preparedEntries ?? mergeSkillTiers(loadLocalSkillTiers(roots.agentWorkspaceDir, opts), opts);
	const effectiveSkillFilter = resolveEffectiveWorkspaceSkillFilter(opts);
	return {
		entries,
		effectiveSkillFilter,
		shouldFilter: Boolean(roots.executionWorkspaceDir) || effectiveSkillFilter !== void 0 || opts?.skillOverrides !== void 0 || opts?.eligibility !== void 0
	};
}
/** Runtime preparation shares discovery and filtering with synchronous SDK inventory reads. */
async function prepareWorkspaceSkills(workspaceDir, opts, assertCurrent) {
	return (await prepareWorkspaceSkillSelection(workspaceDir, opts, "runtime", assertCurrent)).entries;
}
function loadWorkspaceSkills(workspaceDir, opts) {
	const { entries, effectiveSkillFilter, shouldFilter } = resolveWorkspaceSkillLoad(workspaceDir, opts);
	if (!shouldFilter) return entries;
	return filterSkillEntries(entries, opts?.config, effectiveSkillFilter, opts?.skillOverrides, opts?.eligibility);
}
function loadVisibleSkills(workspaceDir, opts) {
	const entries = mergeSkillTiers(loadLocalSkillTiers(workspaceDir, opts), opts);
	const effectiveSkillFilter = resolveEffectiveWorkspaceSkillFilter(opts);
	return filterSkillEntries(entries, opts?.config, effectiveSkillFilter, opts?.skillOverrides, opts?.eligibility);
}
/** Read a single bundle with the same boundary and file limits as local discovery. */
function readBundledSkillEntries(skillName, opts) {
	const normalizedName = skillName.trim().toLowerCase();
	if (!/^[a-z0-9][a-z0-9-]*$/u.test(normalizedName)) return [];
	const bundledSkillsDir = opts?.bundledSkillsDir ?? resolveBundledSkillsDir();
	const rootRealPath = bundledSkillsDir ? tryRealpath(bundledSkillsDir) : void 0;
	if (!rootRealPath) return [];
	const limits = resolveSkillDiscoveryLimits(opts?.config);
	const loaded = loadSingleSkillDirectory({
		skillDir: path.join(rootRealPath, normalizedName),
		source: "openclaw-bundled",
		rootRealPath,
		maxBytes: limits.maxSkillFileBytes,
		rejectHardlinks: shouldRejectHardlinkedPluginFiles({
			origin: "bundled",
			rootDir: rootRealPath
		}),
		onDiagnostic: (diagnostic) => warnInvalidSkill("openclaw-bundled", diagnostic)
	});
	if (!loaded || loaded.skill.name.trim().toLowerCase() !== normalizedName) return [];
	return [createSkillEntry(loaded)];
}
function filterWorkspaceSkills(entries, opts) {
	return filterSkillEntries(entries, opts?.config, opts?.skillFilter, opts?.skillOverrides, opts?.eligibility);
}
//#endregion
export { prepareWorkspaceSkills as a, fingerprintSkillSnapshotConfig as c, prepareWorkspaceSkillEntries as i, resetSkillSnapshotConfigFingerprintCache as l, loadVisibleSkills as n, readWorkspaceSkillSources as o, loadWorkspaceSkills as r, resolveWorkspaceSkillPromptEntries as s, filterWorkspaceSkills as t, readWorkspaceSkillStatusFacts as u };
