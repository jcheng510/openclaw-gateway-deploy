import { c as normalizeOptionalLowercaseString, l as normalizeOptionalString, o as normalizeLowercaseStringOrEmpty } from "./string-coerce-6kR-86XC.mjs";
import { k as walkDirectorySync } from "./fs-safe-CHQXnCPk.mjs";
import { r as racePromiseWithAbortSignal } from "./abort-signal-Z3A36sLL.mjs";
import { m as isPathInsideWithRealpath } from "./includes-Dj3t0m8d.mjs";
import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { t as createSubsystemLogger } from "./subsystem-CeqVSEVi.mjs";
import { u as readRootJsonObjectSync } from "./json-files-Br8qKrAz.mjs";
import { d as resolveAgentWorkspaceDir } from "./agent-scope-config-Dm6T00l4.mjs";
import { i as listAgentIds } from "./agent-roster-B45JERT5.mjs";
import { t as createDedupeCache } from "./dedupe-Bq05tjkn.mjs";
import { d as resolveEffectivePluginActivationState, l as normalizePluginsConfig, r as hasExplicitPluginConfig } from "./config-state-D-KaEbbt.mjs";
import { c as normalizeBundlePathList, n as CLAUDE_BUNDLE_MANIFEST_RELATIVE_PATH, s as mergeBundlePathLists } from "./bundle-manifest-DtjqvBG-.mjs";
import "./agent-scope-L_eY3Hj7.mjs";
import { n as resolveEffectiveAgentSkillFilter } from "./agent-filter-Com2ua2W.mjs";
import { n as loadPluginManifestRegistryForPluginRegistry } from "./plugin-registry-contributions-CZq67NZQ.mjs";
import { r as logVerbose } from "./globals-ChjEJkWj.mjs";
import { d as parseFrontmatterBlock, i as parseFrontmatterBool, p as stripFrontmatterBlock } from "./frontmatter-Bibn4xoJ.mjs";
import { a as isWorkspaceAccessUnavailableError, i as getAgentWorkspaceAccess } from "./workspace-access-DIRgQG5g.mjs";
import { n as resolveSkillTelemetrySource } from "./source-DeRhM-ro.mjs";
import { t as canonicalizePath } from "./paths-CIwQeLl6.mjs";
import { i as resolveNodeExecEligibility } from "./exec-defaults-DGSh4Lk5.mjs";
import { T as sanitizeSkillCommandName } from "./selection-C6VzDZA6.mjs";
import { n as filterUserInvocableSkillEntries, r as isSkillPromptVisible } from "./skill-index-ZDYIG8ML.mjs";
import { a as prepareWorkspaceSkills, n as loadVisibleSkills, t as filterWorkspaceSkills } from "./workspace-skill-loader-D-k9b5PP.mjs";
import { n as prepareRemoteSkillConnections } from "./remote-skills-Co_eXsF5.mjs";
import { t as getRemoteSkillEligibility } from "./remote-CgP2ocY0.mjs";
import { i as listReservedChatSlashCommandNames } from "./chat-command-invocation-DtwjZNJZ.mjs";
import fs from "node:fs";
import path from "node:path";
import { readRegularFileSync } from "@openclaw/fs-safe/advanced";
//#region src/plugins/bundle-commands.ts
const BUNDLE_COMMAND_MAX_BYTES = 1048576;
const log = createSubsystemLogger("plugins/bundle-commands");
function readClaudeBundleManifest(rootDir) {
	const result = readRootJsonObjectSync({
		rootDir,
		relativePath: CLAUDE_BUNDLE_MANIFEST_RELATIVE_PATH,
		boundaryLabel: "plugin root",
		rejectHardlinks: true
	});
	return result.ok ? result.value : {};
}
function resolveClaudeCommandRootDirs(rootDir) {
	const raw = readClaudeBundleManifest(rootDir);
	const declared = normalizeBundlePathList(raw.commands);
	const defaults = fs.existsSync(path.join(rootDir, "commands")) ? ["commands"] : [];
	return mergeBundlePathLists(defaults, declared);
}
function listMarkdownFilesRecursive(rootDir) {
	return walkDirectorySync(rootDir, {
		symlinks: "skip",
		descend: ({ name }) => !name.startsWith("."),
		include: ({ kind, name }) => kind === "file" && !name.startsWith(".") && Boolean(normalizeOptionalLowercaseString(name)?.endsWith(".md"))
	}).entries.map((entry) => entry.path).toSorted((a, b) => a.localeCompare(b));
}
function toDefaultCommandName(rootDir, filePath) {
	return path.relative(rootDir, filePath).replace(/\.[^.]+$/u, "").split(path.sep).join(":");
}
function toDefaultDescription(promptTemplate) {
	const lineEnd = promptTemplate.indexOf("\n");
	return (lineEnd < 0 ? promptTemplate : promptTemplate.slice(0, lineEnd)).trimEnd();
}
function loadBundleCommandsFromRoot(params) {
	const entries = [];
	for (const filePath of listMarkdownFilesRecursive(params.commandRoot)) {
		let raw;
		try {
			raw = readRegularFileSync({
				filePath,
				maxBytes: BUNDLE_COMMAND_MAX_BYTES
			}).buffer.toString("utf-8");
		} catch (error) {
			log.warn(`skipping unreadable bundle command file ${filePath}: ${formatErrorMessage(error)}`);
			continue;
		}
		const frontmatter = parseFrontmatterBlock(raw);
		if (!parseFrontmatterBool(frontmatter["user-invocable"], true)) continue;
		const promptTemplate = stripFrontmatterBlock(raw);
		if (!promptTemplate) continue;
		const rawName = normalizeOptionalString(frontmatter.name) || toDefaultCommandName(params.commandRoot, filePath);
		if (!rawName) continue;
		const description = normalizeOptionalString(frontmatter.description) || toDefaultDescription(promptTemplate);
		entries.push({
			pluginId: params.pluginId,
			rawName,
			description,
			promptTemplate,
			sourceFilePath: filePath
		});
	}
	return entries;
}
function loadEnabledClaudeBundleCommands(params) {
	if (!hasExplicitPluginConfig(params.cfg?.plugins)) return [];
	const registry = loadPluginManifestRegistryForPluginRegistry({
		workspaceDir: params.workspaceDir,
		config: params.cfg,
		includeDisabled: true
	});
	const normalizedPlugins = normalizePluginsConfig(params.cfg?.plugins);
	const commands = [];
	for (const record of registry.plugins) {
		if (record.format !== "bundle" || record.bundleFormat !== "claude" || !(record.bundleCapabilities ?? []).includes("commands")) continue;
		if (!resolveEffectivePluginActivationState({
			id: record.id,
			origin: record.origin,
			channelIds: record.channels,
			config: normalizedPlugins,
			rootConfig: params.cfg
		}).activated) continue;
		for (const relativeRoot of resolveClaudeCommandRootDirs(record.rootDir)) {
			const commandRoot = path.resolve(record.rootDir, relativeRoot);
			if (!fs.existsSync(commandRoot)) continue;
			if (!isPathInsideWithRealpath(record.rootDir, commandRoot, { requireRealpath: true })) continue;
			commands.push(...loadBundleCommandsFromRoot({
				pluginId: record.id,
				commandRoot
			}));
		}
	}
	return commands;
}
//#endregion
//#region src/skills/discovery/command-specs.ts
const skillsLogger = createSubsystemLogger("skills");
const skillCommandDebugOnce = createDedupeCache({
	ttlMs: 0,
	maxSize: 1024
});
function logSkillCommandOnce(messageKey, message, meta, level = "debug") {
	if (skillCommandDebugOnce.check(messageKey)) return;
	skillsLogger[level](message, meta);
}
function resolveUniqueSkillCommandName(base, used) {
	const normalizedBase = normalizeLowercaseStringOrEmpty(base);
	if (!used.has(normalizedBase)) return base;
	for (let index = 2; index < 1e3; index += 1) {
		const suffix = `_${index}`;
		const maxBaseLength = Math.max(1, 32 - suffix.length);
		const candidate = `${base.slice(0, maxBaseLength)}${suffix}`;
		const candidateKey = normalizeLowercaseStringOrEmpty(candidate);
		if (!used.has(candidateKey)) return candidate;
	}
	return `${base.slice(0, Math.max(1, 30))}_x`;
}
function resolveCommandSkillLoadOptions(opts) {
	return {
		bundledSkillName: opts?.bundledSkillName,
		config: opts?.config,
		managedSkillsDir: opts?.managedSkillsDir,
		bundledSkillsDir: opts?.bundledSkillsDir,
		librarySelections: opts?.librarySelections,
		agentId: opts?.agentId,
		agentSkillFilter: opts?.includeAllowlistHidden ? "ignore" : "apply",
		skillFilter: opts?.includeAllowlistHidden ? void 0 : opts?.skillFilter ?? resolveEffectiveAgentSkillFilter(opts?.config, opts?.agentId),
		eligibility: opts?.eligibility,
		pluginMetadataSnapshot: opts?.pluginMetadataSnapshot
	};
}
/** Builds user-invocable slash command specs for synchronous SDK consumers. */
function buildWorkspaceSkillCommandSpecs(workspaceDir, opts) {
	const loadOptions = {
		...resolveCommandSkillLoadOptions(opts),
		gatewayOnly: opts?.gatewayOnly
	};
	return assembleWorkspaceSkillCommandSpecs(workspaceDir, opts?.entries ? filterWorkspaceSkills(opts.entries, loadOptions) : loadVisibleSkills(workspaceDir, loadOptions), opts);
}
/** Prepares eligibility once before sharing the synchronous command assembly. */
async function prepareWorkspaceSkillCommandSpecs(workspaceDir, opts, assertCurrent) {
	const eligible = await prepareWorkspaceSkills(workspaceDir, resolveCommandSkillLoadOptions(opts), assertCurrent);
	assertCurrent?.();
	return assembleWorkspaceSkillCommandSpecs(workspaceDir, eligible, opts);
}
function assembleWorkspaceSkillCommandSpecs(workspaceDir, eligible, opts) {
	const userInvocable = filterUserInvocableSkillEntries(eligible);
	const used = /* @__PURE__ */ new Set();
	for (const reserved of opts?.reservedNames ?? []) used.add(normalizeLowercaseStringOrEmpty(reserved));
	const specs = [];
	const claimName = (rawName, bundle = false) => {
		const prefix = bundle ? "bundle-" : "";
		const label = bundle ? "bundle" : "skill";
		const level = bundle ? "debug" : "trace";
		const base = sanitizeSkillCommandName(rawName);
		if (base !== rawName) logSkillCommandOnce(`${prefix}sanitize:${rawName}:${base}`, `Sanitized ${label} command name "${rawName}" to "/${base}".`, {
			rawName,
			sanitized: `/${base}`
		}, level);
		const unique = resolveUniqueSkillCommandName(base, used);
		if (unique !== base) logSkillCommandOnce(`${prefix}dedupe:${rawName}:${unique}`, `De-duplicated ${label} command name for "${rawName}" to "/${unique}".`, {
			rawName,
			deduped: `/${unique}`
		}, level);
		used.add(normalizeLowercaseStringOrEmpty(unique));
		return unique;
	};
	for (const entry of userInvocable) {
		const rawName = entry.skill.name;
		const unique = claimName(rawName);
		const description = entry.skill.description?.trim() || rawName;
		const dispatch = entry.disableCommandDispatch ? void 0 : (() => {
			if (normalizeLowercaseStringOrEmpty(entry.frontmatter?.["command-dispatch"] ?? entry.frontmatter?.["command_dispatch"] ?? "") !== "tool") return;
			const toolName = (entry.frontmatter?.["command-tool"] ?? entry.frontmatter?.["command_tool"] ?? "").trim();
			if (!toolName) {
				logSkillCommandOnce(`dispatch:missingTool:${rawName}`, `Skill command "/${unique}" requested tool dispatch but did not provide command-tool. Ignoring dispatch.`, {
					skillName: rawName,
					command: unique
				});
				return;
			}
			const argModeRaw = normalizeOptionalLowercaseString(entry.frontmatter?.["command-arg-mode"] ?? entry.frontmatter?.["command_arg_mode"] ?? "");
			if (argModeRaw && argModeRaw !== "raw") logSkillCommandOnce(`dispatch:badArgMode:${rawName}:${argModeRaw}`, `Skill command "/${unique}" requested tool dispatch but has unknown command-arg-mode. Falling back to raw.`, {
				skillName: rawName,
				command: unique,
				argMode: argModeRaw
			});
			return {
				kind: "tool",
				toolName,
				argMode: "raw"
			};
		})();
		specs.push({
			name: unique,
			displayName: entry.skill.displayName ?? rawName,
			skillFile: canonicalizePath(entry.skill.filePath),
			skillName: rawName,
			description,
			modelVisible: isSkillPromptVisible(entry),
			skillSource: resolveSkillTelemetrySource(entry.skill),
			...dispatch ? { dispatch } : {}
		});
	}
	const bundleCommands = loadEnabledClaudeBundleCommands({
		workspaceDir,
		cfg: opts?.config
	});
	for (const entry of bundleCommands) specs.push({
		name: claimName(entry.rawName, true),
		skillName: entry.rawName,
		description: entry.description,
		modelVisible: false,
		promptTemplate: entry.promptTemplate,
		sourceFilePath: entry.sourceFilePath
	});
	return specs;
}
//#endregion
//#region src/skills/discovery/chat-commands.ts
function resolveWorkspaceSkillCommandOptions(params) {
	const nodeSkills = resolveNodeExecEligibility({
		cfg: params.cfg,
		agentId: params.agentId,
		sessionEntry: params.sessionEntry,
		sessionKey: params.sessionKey,
		execOverrides: params.execOverrides
	});
	const eligibility = {
		nodeSkills,
		remote: getRemoteSkillEligibility({ advertiseExecNode: nodeSkills.canExec })
	};
	return {
		config: params.cfg,
		agentId: params.agentId,
		skillFilter: params.skillFilter,
		includeAllowlistHidden: params.includeAllowlistHidden,
		eligibility,
		pluginMetadataSnapshot: params.pluginMetadataSnapshot,
		librarySelections: params.sessionEntry?.skillLibrarySelections
	};
}
function hasRemoteWorkspace(workspaceDir) {
	try {
		return Boolean(getAgentWorkspaceAccess(workspaceDir, "loadSkills")?.loadSkills);
	} catch (error) {
		if (isWorkspaceAccessUnavailableError(error)) return true;
		throw error;
	}
}
/** Synchronous public SDK contract; remote workspace menus are deferred. */
function listSkillCommandsForWorkspace(params) {
	return buildWorkspaceSkillCommandSpecs(params.workspaceDir, {
		...resolveWorkspaceSkillCommandOptions(params),
		reservedNames: listReservedChatSlashCommandNames(),
		gatewayOnly: hasRemoteWorkspace(params.workspaceDir)
	});
}
async function prepareSkillCommandsForWorkspace(params, assertCurrent) {
	assertCurrent?.();
	await prepareRemoteSkillConnections();
	assertCurrent?.();
	const commands = await prepareWorkspaceSkillCommandSpecs(params.workspaceDir, {
		...resolveWorkspaceSkillCommandOptions(params),
		reservedNames: listReservedChatSlashCommandNames()
	}, assertCurrent);
	assertCurrent?.();
	return commands;
}
/** Resolve Gateway-bundled commands with the active Harness eligibility checks. */
async function prepareBundledSkillCommandForWorkspace(params) {
	await prepareRemoteSkillConnections();
	return (await prepareWorkspaceSkillCommandSpecs(params.workspaceDir, {
		...resolveWorkspaceSkillCommandOptions(params),
		reservedNames: listReservedChatSlashCommandNames(),
		bundledSkillName: params.skillName
	})).find((command) => command.skillSource === "bundled" && command.skillName.trim().toLowerCase() === params.skillName.trim().toLowerCase());
}
function dedupeBySkillName(commands) {
	const seen = /* @__PURE__ */ new Set();
	const out = [];
	for (const cmd of commands) {
		const key = normalizeOptionalLowercaseString(cmd.skillName);
		if (key && seen.has(key)) continue;
		if (key) seen.add(key);
		out.push(cmd);
	}
	return out;
}
function* resolveAgentSkillCommandWorkspaces(params, allowRemote = false) {
	const agentIds = params.agentIds ?? listAgentIds(params.cfg);
	const hasSingleAgentContext = agentIds.length === 1;
	const workspaceAgents = [];
	for (const agentId of agentIds) {
		const workspaceDir = resolveAgentWorkspaceDir(params.cfg, agentId);
		const remote = allowRemote ? Boolean(getAgentWorkspaceAccess(workspaceDir, "loadSkills")?.loadSkills) : hasRemoteWorkspace(workspaceDir);
		if (!remote) {
			if (!fs.existsSync(workspaceDir)) {
				logVerbose(`Skipping agent "${agentId}": workspace does not exist: ${workspaceDir}`);
				continue;
			}
			try {
				fs.realpathSync(workspaceDir);
			} catch {
				logVerbose(`Skipping agent "${agentId}": cannot resolve workspace: ${workspaceDir}`);
				continue;
			}
		}
		workspaceAgents.push({
			agentId,
			workspaceDir,
			gatewayOnly: remote && !allowRemote,
			skillFilter: resolveEffectiveAgentSkillFilter(params.cfg, agentId)
		});
	}
	for (const { agentId, workspaceDir, skillFilter, gatewayOnly } of workspaceAgents) yield {
		workspaceDir,
		options: {
			...resolveWorkspaceSkillCommandOptions({
				cfg: params.cfg,
				agentId,
				workspaceDir,
				skillFilter,
				...hasSingleAgentContext ? {
					sessionEntry: params.sessionEntry,
					sessionKey: params.sessionKey,
					execOverrides: params.execOverrides
				} : {}
			}),
			gatewayOnly
		}
	};
}
function appendSkillCommands(entries, used, commands) {
	for (const command of commands) {
		used.add(normalizeLowercaseStringOrEmpty(command.name));
		entries.push(command);
	}
}
function finalizeSkillCommands(entries) {
	return dedupeBySkillName(entries).toSorted((left, right) => left.skillName.localeCompare(right.skillName, "en"));
}
/** Synchronous public SDK contract for native command consumers. */
function listSkillCommandsForAgents(params) {
	const used = listReservedChatSlashCommandNames();
	const entries = [];
	for (const { workspaceDir, options } of resolveAgentSkillCommandWorkspaces(params)) appendSkillCommands(entries, used, buildWorkspaceSkillCommandSpecs(workspaceDir, {
		...options,
		reservedNames: used
	}));
	return finalizeSkillCommands(entries);
}
async function prepareSkillCommandsForAgents(params) {
	params.signal?.throwIfAborted();
	await prepareRemoteSkillConnections();
	params.signal?.throwIfAborted();
	const used = listReservedChatSlashCommandNames();
	const entries = [];
	for (const { workspaceDir, options } of resolveAgentSkillCommandWorkspaces(params, true)) {
		const commands = await racePromiseWithAbortSignal(prepareWorkspaceSkillCommandSpecs(workspaceDir, {
			...options,
			reservedNames: used
		}), params.signal);
		params.signal?.throwIfAborted();
		appendSkillCommands(entries, used, commands);
	}
	return finalizeSkillCommands(entries);
}
//#endregion
export { prepareSkillCommandsForWorkspace as a, prepareSkillCommandsForAgents as i, listSkillCommandsForWorkspace as n, prepareBundledSkillCommandForWorkspace as r, listSkillCommandsForAgents as t };
