import { i as resolveOpenClawPackageRootsSync } from "./openclaw-root-3-SBP6RS.mjs";
import { p as shortenHomePath } from "./utils-DUAwk2p5.mjs";
import { t as formatCliCommand } from "./command-format-Cte1SWM4.mjs";
import { Fn as object, Jn as string, Nt as array } from "./schemas-BOYIvvln.mjs";
import { t as safeParseJsonWithSchema } from "./zod-parse-Bip-sZi_.mjs";
import { i as runCommandWithTimeout, n as runExec } from "./exec-Bjx7k3vE.mjs";
import { r as captureOpenClawStateWorkerContext } from "./openclaw-state-worker-context-C_iAE7YK.mjs";
import "./agent-scope-config-Dm6T00l4.mjs";
import { r as listAgentEntriesWithSource } from "./agent-roster-B45JERT5.mjs";
import { n as createSqliteWorkerWriteAdmission } from "./sqlite-worker-store-DNLj-iuz.mjs";
import { a as runOpenClawStateWorkerOperation } from "./openclaw-state-worker-store-DwGcGmZn.mjs";
import { s as withFileLock } from "./file-lock-B1Bd3Xow.mjs";
import "./file-lock-C-MFU0Wb.mjs";
import { n as resolveSandboxScope } from "./config-contract-CgxcWtCc.mjs";
import { t as note } from "./note-BpWs6H5N.mjs";
import { S as SANDBOX_CONTAINERS_DIR, _ as SANDBOX_BROWSERS_DIR, w as SANDBOX_REGISTRY_PATH, y as SANDBOX_BROWSER_REGISTRY_PATH } from "./constants-Cbgtaz8l.mjs";
import { T as PODMAN_SANDBOX_ENGINE, s as isDockerDaemonUnavailable, u as validateSandboxContainerEngineTarget, w as DOCKER_SANDBOX_ENGINE } from "./docker-D6oDL_5P.mjs";
import { n as browserEntryToRow, r as containerEntryToRow } from "./registry.kernel-gI4IBM7a.mjs";
import "./sandbox-Ck63sGje.mjs";
import fs from "node:fs";
import path from "node:path";
import fs$1 from "node:fs/promises";
//#region src/commands/doctor-sandbox-legacy-registry.ts
/** Doctor-only inspection and migration for legacy sandbox registry files. */
const RegistryEntrySchema = object({ containerName: string() }).passthrough();
const RegistryFileSchema = object({ entries: array(RegistryEntrySchema) });
async function readLegacyRegistryFile(registryPath) {
	try {
		const raw = await fs$1.readFile(registryPath, "utf-8");
		return safeParseJsonWithSchema(RegistryFileSchema, raw);
	} catch (error) {
		if (error?.code === "ENOENT") return { entries: [] };
		if (error instanceof Error) throw error;
		throw new Error(`Failed to read sandbox registry file: ${registryPath}`, { cause: error });
	}
}
async function readShardedEntriesDetailed(dir) {
	let files;
	try {
		files = await fs$1.readdir(dir);
	} catch (error) {
		if (error?.code === "ENOENT") return {
			entries: [],
			invalidFiles: []
		};
		throw error;
	}
	const invalidFiles = [];
	return {
		entries: (await Promise.all(files.filter((name) => name.endsWith(".json")).toSorted().map(async (name) => {
			const filePath = path.join(dir, name);
			try {
				const raw = await fs$1.readFile(filePath, "utf-8");
				const entry = safeParseJsonWithSchema(RegistryEntrySchema, raw);
				if (!entry) invalidFiles.push(filePath);
				return entry;
			} catch {
				invalidFiles.push(filePath);
				return null;
			}
		}))).filter((entry) => entry !== null).toSorted((left, right) => left.containerName.localeCompare(right.containerName)),
		invalidFiles: invalidFiles.toSorted()
	};
}
async function quarantineLegacyRegistry(registryPath) {
	const quarantinePath = `${registryPath}.invalid-${Date.now()}`;
	try {
		await fs$1.rename(registryPath, quarantinePath);
	} catch (error) {
		if (error?.code === "ENOENT") return null;
		throw error;
	}
	return quarantinePath;
}
async function quarantineInvalidShards(dir, invalidFiles) {
	const quarantineDir = `${dir}.invalid-${Date.now()}`;
	await fs$1.mkdir(quarantineDir, { recursive: true });
	for (const invalidFile of invalidFiles) await fs$1.rename(invalidFile, path.join(quarantineDir, path.basename(invalidFile))).catch(async (error) => {
		if (error?.code !== "ENOENT") throw error;
	});
	return quarantineDir;
}
async function writeLegacyEntryIfMissing(context, kind, entry) {
	const normalized = {
		...entry,
		containerName: entry.containerName,
		sessionKey: typeof entry.sessionKey === "string" ? entry.sessionKey : "",
		createdAtMs: typeof entry.createdAtMs === "number" ? entry.createdAtMs : 0,
		lastUsedAtMs: typeof entry.lastUsedAtMs === "number" ? entry.lastUsedAtMs : 0,
		image: typeof entry.image === "string" ? entry.image : ""
	};
	const row = kind === "containers" ? containerEntryToRow(normalized) : browserEntryToRow({
		...normalized,
		cdpPort: typeof entry.cdpPort === "number" ? entry.cdpPort : 0
	});
	const assertCurrent = () => {
		context.admission.assertCurrent();
		context.maintenanceScope?.assertAdmission();
	};
	await runOpenClawStateWorkerOperation(context, (scope) => scope.execute({
		type: "sandboxRegistry.insertIfMissing",
		input: row
	}), {
		assertCurrent,
		createAdmission: createSqliteWorkerWriteAdmission(assertCurrent, [context.admission.databasePath])
	});
}
async function migrateMonolithicIfNeeded(target, context) {
	const { registryPath } = target;
	try {
		await fs$1.access(registryPath);
	} catch (error) {
		if (error?.code === "ENOENT") return {
			kind: target.kind,
			status: "missing"
		};
		throw error;
	}
	return await withFileLock(registryPath, {
		stale: 3e4,
		retries: {
			retries: 59,
			factor: 1,
			minTimeout: 1e3,
			maxTimeout: 1e3
		}
	}, async () => {
		const registry = await readLegacyRegistryFile(registryPath);
		if (!registry) {
			const quarantinePath = await quarantineLegacyRegistry(registryPath);
			if (quarantinePath === null) return {
				kind: target.kind,
				status: "missing"
			};
			return {
				kind: target.kind,
				status: "quarantined-invalid",
				path: registryPath,
				quarantinePath
			};
		}
		if (registry.entries.length === 0) {
			await fs$1.rm(registryPath, { force: true });
			return {
				kind: target.kind,
				status: "removed-empty"
			};
		}
		for (const entry of registry.entries) await writeLegacyEntryIfMissing(context, target.kind, entry);
		await fs$1.rm(registryPath, { force: true });
		return {
			kind: target.kind,
			status: "migrated",
			entries: registry.entries.length
		};
	});
}
async function migrateShardedIfNeeded(target, context) {
	if (!await shardedRegistryDirectoryExists(target.shardedDir)) return {
		kind: target.kind,
		status: "missing"
	};
	const { entries, invalidFiles } = await readShardedEntriesDetailed(target.shardedDir);
	for (const entry of entries) await writeLegacyEntryIfMissing(context, target.kind, entry);
	const quarantinePath = invalidFiles.length > 0 ? await quarantineInvalidShards(target.shardedDir, invalidFiles) : void 0;
	await fs$1.rm(target.shardedDir, {
		recursive: true,
		force: true
	});
	return quarantinePath ? {
		kind: target.kind,
		status: "quarantined-invalid",
		path: target.shardedDir,
		quarantinePath
	} : entries.length > 0 ? {
		kind: target.kind,
		status: "migrated",
		entries: entries.length
	} : {
		kind: target.kind,
		status: "removed-empty"
	};
}
async function shardedRegistryDirectoryExists(directory) {
	try {
		return (await fs$1.stat(directory)).isDirectory();
	} catch (error) {
		if (error?.code === "ENOENT") return false;
		throw error;
	}
}
function combineMigrationResults(target, monolithic, sharded) {
	if (monolithic.status === "quarantined-invalid") return monolithic;
	if (sharded.status === "quarantined-invalid") return sharded;
	const entries = (monolithic.status === "migrated" ? monolithic.entries : 0) + (sharded.status === "migrated" ? sharded.entries : 0);
	if (entries > 0) return {
		kind: target.kind,
		status: "migrated",
		entries
	};
	if (monolithic.status === "removed-empty" || sharded.status === "removed-empty") return {
		kind: target.kind,
		status: "removed-empty"
	};
	return {
		kind: target.kind,
		status: "missing"
	};
}
function legacyRegistryTargets() {
	return [{
		kind: "containers",
		registryPath: SANDBOX_REGISTRY_PATH,
		shardedDir: SANDBOX_CONTAINERS_DIR
	}, {
		kind: "browsers",
		registryPath: SANDBOX_BROWSER_REGISTRY_PATH,
		shardedDir: SANDBOX_BROWSERS_DIR
	}];
}
/** Inspects old registry files without mutating them. */
async function inspectLegacySandboxRegistryFiles() {
	const inspections = [];
	for (const target of legacyRegistryTargets()) {
		const exists = await fs$1.access(target.registryPath).then(() => true, (error) => {
			if (error?.code === "ENOENT") return false;
			throw error;
		});
		const registry = exists ? await readLegacyRegistryFile(target.registryPath) : { entries: [] };
		inspections.push({
			kind: target.kind,
			path: target.registryPath,
			source: "monolithic",
			exists,
			valid: Boolean(registry),
			entries: registry?.entries.length ?? 0
		});
		const sharded = await readShardedEntriesDetailed(target.shardedDir);
		inspections.push({
			kind: target.kind,
			path: target.shardedDir,
			source: "sharded",
			exists: await shardedRegistryDirectoryExists(target.shardedDir),
			valid: sharded.invalidFiles.length === 0,
			entries: sharded.entries.length
		});
	}
	return inspections;
}
/** Migrates old registry files into SQLite when present. */
async function migrateLegacySandboxRegistryFiles() {
	const context = captureOpenClawStateWorkerContext();
	const results = [];
	for (const target of legacyRegistryTargets()) {
		const sharded = await migrateShardedIfNeeded(target, context);
		const monolithic = await migrateMonolithicIfNeeded(target, context);
		results.push(combineMigrationResults(target, monolithic, sharded));
	}
	return results;
}
//#endregion
//#region src/commands/doctor-sandbox.ts
/** Doctor checks and repairs for Docker sandbox images, namespaces, and registry state. */
const SANDBOX_REGISTRY_FILES_CHECK_ID = "core/doctor/sandbox/registry-files";
function resolveSandboxScript(scriptRel) {
	const roots = resolveOpenClawPackageRootsSync({
		cwd: process.cwd(),
		argv1: process.argv[1]
	});
	for (const root of roots) {
		const scriptPath = path.join(root, scriptRel);
		if (fs.existsSync(scriptPath)) return {
			scriptPath,
			cwd: root
		};
	}
	return null;
}
async function runSandboxScript(scriptRel, runtime) {
	const script = resolveSandboxScript(scriptRel);
	if (!script) {
		note(`Unable to locate ${scriptRel}. Run it from the repo root.`, "Sandbox");
		return false;
	}
	runtime.log(`Running ${scriptRel}...`);
	const result = await runCommandWithTimeout(["bash", script.scriptPath], {
		timeoutMs: 12e5,
		cwd: script.cwd
	});
	if (result.code !== 0) {
		runtime.error(`Failed running ${scriptRel}: ${result.stderr.trim() || result.stdout.trim() || "unknown error"}`);
		return false;
	}
	runtime.log(`Completed ${scriptRel}.`);
	return true;
}
async function isContainerEngineAvailable(command) {
	try {
		await runExec(command, command === "docker" ? [
			"version",
			"--format",
			"{{.Server.Version}}"
		] : ["info"], { timeoutMs: 5e3 });
		return true;
	} catch {
		return false;
	}
}
function formatNamespaceProbeCommand(args) {
	return ["unshare", ...args].join(" ");
}
async function runCodexBwrapNamespaceProbe(kind, args) {
	try {
		await runExec("unshare", args, { timeoutMs: 5e3 });
		return { ok: true };
	} catch (error) {
		const reason = error?.stderr?.trim() || error?.stdout?.trim() || (error instanceof Error ? error.message : String(error));
		return {
			ok: false,
			kind,
			command: formatNamespaceProbeCommand(args),
			reason
		};
	}
}
function codexBwrapNeedsNetworkNamespaceProbe(cfg) {
	const network = cfg.agents?.defaults?.sandbox?.docker?.network?.trim().toLowerCase();
	return network === void 0 || network === "" || network === "none";
}
async function probeCodexBwrapNamespaces(cfg) {
	if (process.platform !== "linux") return { ok: true };
	const userProbe = await runCodexBwrapNamespaceProbe("user", [
		"--user",
		"--map-root-user",
		"true"
	]);
	if (!userProbe.ok || !codexBwrapNeedsNetworkNamespaceProbe(cfg)) return userProbe;
	return await runCodexBwrapNamespaceProbe("network", [
		"--user",
		"--map-root-user",
		"--net",
		"true"
	]);
}
async function noteCodexBwrapNamespaceWarning(cfg, engineName) {
	const probe = await probeCodexBwrapNamespaces(cfg);
	if (probe.ok) return;
	const symptom = probe.kind === "user" ? "  bwrap: setting up uid map: Permission denied" : "  bwrap: loopback: Failed RTM_NEWADDR: Operation not permitted";
	const networkSentence = codexBwrapNeedsNetworkNamespaceProbe(cfg) ? `With ${engineName} sandbox network egress disabled, it also needs an unprivileged network namespace.` : `${engineName} sandbox network egress is enabled, so doctor only checked the user namespace.`;
	const lines = [
		`Codex bwrap ${probe.kind} namespace probe failed while ${engineName} sandbox mode is enabled.`,
		`Codex app-server \`workspace-write\` shell execution needs unprivileged user namespaces. ${networkSentence}`,
		"On Ubuntu/AppArmor hosts this usually appears as:",
		symptom,
		`Probe command: ${probe.command}`,
		`Probe result: ${probe.reason}`,
		"",
		"Fix the host namespace policy for the OpenClaw service user, then restart the gateway.",
		"Prefer an AppArmor profile that grants the required namespaces to the OpenClaw service process.",
		"`kernel.apparmor_restrict_unprivileged_userns=0` is a host-wide fallback with security tradeoffs; use it only when that host posture is acceptable.",
		"Do not add broad Docker container privileges just to satisfy nested bwrap; that weakens the outer sandbox."
	];
	note(lines.join("\n"), "Sandbox");
}
async function containerImageExists(command, image) {
	try {
		await runExec(command, [
			"image",
			"inspect",
			image
		], { timeoutMs: 5e3 });
		return true;
	} catch (error) {
		const stderr = error?.stderr || error?.message || "";
		if (command === "docker" ? stderr.includes("No such image") : /No such image|image not known|image .* not found/iu.test(stderr)) return false;
		if (command === "docker" && isDockerDaemonUnavailable(stderr)) return false;
		throw error;
	}
}
async function handleMissingSandboxImage(params, runtime, prompter) {
	if (await containerImageExists(params.engineCommand, params.image)) return;
	const buildHint = params.buildScript ? `Build it with ${params.buildScript}.` : "Build or pull it first.";
	note(`Sandbox ${params.kind} image missing: ${params.image}. ${buildHint}`, "Sandbox");
	if (params.buildScript) {
		if (await prompter.confirmRuntimeRepair({
			message: `Build ${params.kind} sandbox image now?`,
			initialValue: true
		})) await runSandboxScript(params.buildScript, runtime);
	}
}
/**
* Checks configured sandbox images and optionally runs repo build scripts for missing defaults.
*
* Non-container backends skip image checks; local container mode also probes Codex bwrap namespace
* support because nested app-server shells rely on host user/network namespace policy.
*/
async function maybeRepairSandboxImages(cfg, runtime, prompter) {
	const sandbox = cfg.agents?.defaults?.sandbox;
	const mode = sandbox?.mode ?? "off";
	if (!sandbox || mode === "off") return cfg;
	const backend = (sandbox.backend?.trim() || "docker").toLowerCase();
	if (backend !== "docker" && backend !== "podman") {
		if (sandbox.browser?.enabled) note(`Sandbox backend "${backend}" selected. Docker browser health checks are skipped; browser sandbox currently requires the docker backend.`, "Sandbox");
		return cfg;
	}
	const containerEngine = backend === "podman" ? PODMAN_SANDBOX_ENGINE : DOCKER_SANDBOX_ENGINE;
	if (!await isContainerEngineAvailable(containerEngine.command)) {
		const lines = containerEngine.id === "docker" ? [
			`Sandbox mode is enabled (mode: "${mode}") but Docker is not available.`,
			"Docker is required for sandbox mode to function.",
			"Isolated sessions (automations, sub-agents) will fail without Docker.",
			"",
			"Options:",
			"- Install Docker and restart the gateway",
			"- Disable sandbox mode: openclaw config set agents.defaults.sandbox.mode off"
		] : [
			`Sandbox mode is enabled (mode: "${mode}") but Podman is not available.`,
			"Podman is required by the selected sandbox backend.",
			"Isolated sessions (automations, sub-agents) will fail without Podman.",
			"",
			"Options:",
			"- Install Podman and restart the gateway",
			"- Disable sandbox mode: openclaw config set agents.defaults.sandbox.mode off"
		];
		note(lines.join("\n"), "Sandbox");
		return cfg;
	}
	await validateSandboxContainerEngineTarget(containerEngine);
	await noteCodexBwrapNamespaceWarning(cfg, containerEngine.displayName);
	const dockerImage = sandbox.docker?.image?.trim() || "openclaw-sandbox:bookworm-slim";
	await handleMissingSandboxImage({
		engineCommand: containerEngine.command,
		kind: "base",
		image: dockerImage,
		buildScript: containerEngine.id !== "docker" ? void 0 : dockerImage === "openclaw-sandbox-common:bookworm-slim" ? "scripts/sandbox-common-setup.sh" : dockerImage === "openclaw-sandbox:bookworm-slim" ? "scripts/sandbox-setup.sh" : void 0
	}, runtime, prompter);
	if (sandbox.browser?.enabled && containerEngine.id === "docker") await handleMissingSandboxImage({
		engineCommand: containerEngine.command,
		kind: "browser",
		image: sandbox.browser.image?.trim() || "openclaw-sandbox-browser:bookworm-slim",
		buildScript: "scripts/sandbox-browser-setup.sh"
	}, runtime, prompter);
	else if (sandbox.browser?.enabled) note("Podman sandbox selected. Browser sandbox health checks are skipped because browser sandboxing requires the Docker engine.", "Sandbox");
	return cfg;
}
function formatLegacyRegistryInspectionLine(file) {
	const status = file.valid ? `${file.entries} entr${file.entries === 1 ? "y" : "ies"}` : "invalid";
	return `- ${file.kind} ${file.source}: ${shortenHomePath(file.path)} (${status})`;
}
function formatLegacyRegistryMigrationLine(result) {
	if (result.status === "migrated") return `- Migrated ${result.kind} registry into ${result.entries} SQLite row${result.entries === 1 ? "" : "s"}.`;
	if (result.status === "removed-empty") return `- Removed empty legacy ${result.kind} registry files.`;
	if (result.status === "quarantined-invalid") {
		const file = shortenHomePath(result.path);
		const quarantine = ` to ${shortenHomePath(result.quarantinePath)}`;
		return `- Quarantined invalid legacy ${result.kind} registry ${file}${quarantine}.`;
	}
	return "";
}
async function detectLegacySandboxRegistryFileIssues() {
	return (await inspectLegacySandboxRegistryFiles()).filter((file) => file.exists);
}
function legacySandboxRegistryInspectionToHealthFinding(file) {
	return {
		checkId: SANDBOX_REGISTRY_FILES_CHECK_ID,
		severity: "warning",
		message: `Legacy sandbox registry file detected.
${formatLegacyRegistryInspectionLine(file)}`,
		path: file.path,
		fixHint: `Run ${formatCliCommand("openclaw doctor --fix")} to migrate valid entries to SQLite.`
	};
}
function legacySandboxRegistryInspectionToRepairEffect(file) {
	return {
		kind: "state",
		action: !file.valid ? "would-quarantine-legacy-sandbox-registry" : file.entries === 0 ? "would-remove-empty-legacy-sandbox-registry" : "would-migrate-legacy-sandbox-registry",
		target: file.path,
		dryRunSafe: false
	};
}
/** Migrates legacy sandbox registry files and directories. */
async function maybeRepairSandboxRegistryFiles(prompter) {
	const legacyFiles = await detectLegacySandboxRegistryFileIssues();
	if (legacyFiles.length === 0) return;
	if (!prompter.shouldRepair) {
		note([
			"Legacy sandbox registry files detected.",
			...legacyFiles.map(formatLegacyRegistryInspectionLine),
			`Run ${formatCliCommand("openclaw doctor --fix")} to migrate them to SQLite.`
		].join("\n"), "Sandbox");
		return;
	}
	const results = (await migrateLegacySandboxRegistryFiles()).filter((result) => result.status !== "missing").map(formatLegacyRegistryMigrationLine).filter((line) => line.length > 0);
	if (results.length > 0) note(results.join("\n"), "Doctor changes");
}
/** Warns when agent sandbox overrides are ignored because sandbox scope resolves to shared. */
function noteSandboxScopeWarnings(cfg) {
	const globalSandbox = cfg.agents?.defaults?.sandbox;
	const warnings = [];
	for (const { entry: agent, source } of listAgentEntriesWithSource(cfg)) {
		const agentId = agent.id;
		const agentSandbox = agent.sandbox;
		if (!agentSandbox) continue;
		if (resolveSandboxScope({ scope: agentSandbox.scope ?? globalSandbox?.scope }) !== "shared") continue;
		const overrides = [
			"docker",
			"browser",
			"prune"
		].filter((key) => agentSandbox[key] && Object.keys(agentSandbox[key]).length > 0);
		if (overrides.length === 0) continue;
		const agentPath = source.kind === "entries" ? `agents.entries.${source.key}` : `agents.list (id "${agentId}")`;
		warnings.push([`- ${agentPath} sandbox ${overrides.join("/")} overrides ignored.`, `  scope resolves to "shared".`].join("\n"));
	}
	if (warnings.length > 0) note(warnings.join("\n"), "Sandbox");
}
//#endregion
export { detectLegacySandboxRegistryFileIssues, legacySandboxRegistryInspectionToHealthFinding, legacySandboxRegistryInspectionToRepairEffect, maybeRepairSandboxImages, maybeRepairSandboxRegistryFiles, noteSandboxScopeWarnings };
