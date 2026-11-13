import { c as normalizeOptionalLowercaseString, l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import { D as resolveExpiresAtMsFromDurationMs, c as asFiniteNumberInRange, o as asDateTimestampMs } from "./number-coercion-Dq1l5muL.mjs";
import { o as resolveUserPath } from "./home-dir-CjKH62jd.mjs";
import { r as defaultRuntime } from "./runtime-BC29JSZp.mjs";
import { i as createLazyRuntimeNamedExport } from "./lazy-runtime-CJrzFzqU.mjs";
import "./utils-DUAwk2p5.mjs";
import { a as openRootFile } from "./boundary-file-read-CCth2Hwg.mjs";
import { t as createSubsystemLogger } from "./subsystem-CeqVSEVi.mjs";
import { t as KeyedAsyncQueue } from "./keyed-async-queue-CTreGrmR.mjs";
import { r as withContainerEnvFile } from "./container-env-file-D374GzwT.mjs";
import { f as isSameSsrFPolicy } from "./ssrf-D9VemJFV.mjs";
import { f as readAdmittedRunOperatorAuthority } from "./admitted-run-context-BL8yRX2D.mjs";
import { a as DEFAULT_SOUL_FILENAME, n as DEFAULT_BOOTSTRAP_FILENAME, r as DEFAULT_IDENTITY_FILENAME, s as DEFAULT_USER_FILENAME, t as DEFAULT_AGENTS_FILENAME } from "./workspace-bootstrap-policy-DaS4N8nC.mjs";
import { n as readWorkspaceBootstrapFile, t as MAX_WORKSPACE_BOOTSTRAP_FILE_BYTES } from "./workspace-bootstrap-read-B5B8MlNt.mjs";
import { t as ensureAgentWorkspace, u as publishBootstrapFile } from "./workspace-CV6W-hTb.mjs";
import { C as SANDBOX_DOCKER_CREATE_ARGS_EPOCH, b as SANDBOX_BROWSER_SECURITY_HASH_EPOCH, v as SANDBOX_BROWSER_IMAGE_CONTRACT_EPOCH } from "./constants-Cbgtaz8l.mjs";
import { n as isToolAllowed } from "./tool-policy-CQANCgET.mjs";
import { i as resolveSandboxConfigForAgent, r as resolveSandboxBrowserDockerCreateConfig } from "./config-Dq9GjaYt.mjs";
import { n as resolveSandboxRuntimeStatus } from "./runtime-status-DhbVLtao.mjs";
import { r as toSandboxProvisioningError } from "./provisioning-error-DGO2o4QD.mjs";
import "./workspace-mounts-BNQn7dkc.mjs";
import { C as readDockerPort, S as readDockerContainerLabel, d as prepareSandboxMountPlan, i as execDocker, m as handleHotSandboxConfigMismatch, o as formatDockerDaemonUnavailableError, p as sandboxMountPlanMatchesContainer, s as isDockerDaemonUnavailable, t as buildSandboxCreateArgs, w as DOCKER_SANDBOX_ENGINE, x as readDockerContainerEnvVar, y as dockerContainerState } from "./docker-D6oDL_5P.mjs";
import { t as hashTextSha256 } from "./hash-DZK-8tRm.mjs";
import { a as computeSandboxBrowserConfigHash, t as resolveDockerEnvPolicyEpoch } from "./sanitize-env-vars-ONA2Ymtb.mjs";
import { i as slugifySessionKey, r as resolveSandboxWorkspaceLayoutPaths, t as buildSandboxContainerName } from "./shared-DuRvvpmK.mjs";
import { a as readRegisteredSandboxRuntimeIds, i as readBrowserRegistry, p as updateBrowserRegistry } from "./registry-CVyypT5Q.mjs";
import { n as validateNetworkMode } from "./validate-sandbox-security-BU0HpnzW.mjs";
import { f as assertSshSandboxSecretOwnerAvailable } from "./ssh-backend-Cr0o97Qx.mjs";
import { a as getSandboxBackendWorkdirResolver, t as createSandboxBackend } from "./backend-BpLYjAaM.mjs";
import { r as resolveSubagentSessionAttachmentRootDir, t as SANDBOX_SUBAGENT_ATTACHMENTS_MOUNT } from "./subagent-attachment-paths-RH3egeZ6.mjs";
import { n as prepareRemoteSkillConnections } from "./remote-skills-Co_eXsF5.mjs";
import { a as DEFAULT_OPENCLAW_BROWSER_COLOR, d as ensureBrowserControlAuth, f as resolveBrowserControlAuth, l as resolveBrowserConfig, n as DEFAULT_BROWSER_ACTION_TIMEOUT_MS, s as DEFAULT_OPENCLAW_BROWSER_PROFILE_NAME, u as resolveProfile } from "./browser-profiles-De-G_EOZ.mjs";
import { i as startBrowserBridgeServer, n as stopCachedBrowserBridge, r as stopCachedBrowserBridgesForContainer, t as BROWSER_BRIDGES } from "./browser-bridges-DkuPE_9I.mjs";
import { t as createOneTimeTicketStore } from "./one-time-ticket-store-B8dK9Gfu.mjs";
import { t as createSandboxFsBridge } from "./fs-bridge-CkHTzWVb.mjs";
import fs from "node:fs";
import path from "node:path";
import fs$1 from "node:fs/promises";
import crypto from "node:crypto";
//#region src/config/port-defaults.ts
/** Default browser-CDP sidecar port range used when no browser-control-relative range is safe. */
const DEFAULT_BROWSER_CDP_PORT_RANGE_START = 18800;
/** Inclusive end of the default browser-CDP sidecar port range. */
const DEFAULT_BROWSER_CDP_PORT_RANGE_END = 18899;
const DEFAULT_BROWSER_CDP_PORT_RANGE_SPAN = 99;
/** Derives the browser-CDP sidecar range from the browser-control port when it fits. */
function deriveDefaultBrowserCdpPortRange(browserControlPort) {
	const start = asFiniteNumberInRange(browserControlPort + 9, {
		min: 0,
		minExclusive: true,
		max: 65535
	}) ?? DEFAULT_BROWSER_CDP_PORT_RANGE_START;
	const end = start + DEFAULT_BROWSER_CDP_PORT_RANGE_SPAN;
	if (end <= 65535) return {
		start,
		end
	};
	return {
		start: DEFAULT_BROWSER_CDP_PORT_RANGE_START,
		end: DEFAULT_BROWSER_CDP_PORT_RANGE_END
	};
}
//#endregion
//#region src/agents/sandbox/novnc-auth.ts
/**
* noVNC observer authentication helpers.
*
* Issues short-lived observer tokens and builds local noVNC URLs without exposing long-lived browser bridge state.
*/
const NOVNC_PASSWORD_ENV_KEY = "OPENCLAW_BROWSER_NOVNC_PASSWORD";
const NOVNC_TOKEN_TTL_MS = 6e4;
const MAX_NOVNC_TOKEN_TTL_MS = NOVNC_TOKEN_TTL_MS;
const NOVNC_PASSWORD_LENGTH = 8;
const NOVNC_PASSWORD_ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NO_VNC_OBSERVER_TOKENS = createOneTimeTicketStore({ ttlMs: NOVNC_TOKEN_TTL_MS });
function resolveNoVncObserverTokenExpiresAt(params) {
	return resolveExpiresAtMsFromDurationMs(params.ttlMs, {
		nowMs: params.nowMs,
		minRemainingMs: 1
	}) ?? resolveExpiresAtMsFromDurationMs(NOVNC_TOKEN_TTL_MS, {
		nowMs: params.nowMs,
		minRemainingMs: 1
	});
}
function isNoVncEnabled(params) {
	return params.noVncEnabled && !params.headless;
}
function generateNoVncPassword() {
	let out = "";
	for (let i = 0; i < NOVNC_PASSWORD_LENGTH; i += 1) out += NOVNC_PASSWORD_ALPHABET[crypto.randomInt(0, 62)];
	return out;
}
function issueNoVncObserverToken(params) {
	const now = params.nowMs ?? Date.now();
	const expiresAt = resolveNoVncObserverTokenExpiresAt({
		ttlMs: typeof params.ttlMs === "number" && params.ttlMs <= MAX_NOVNC_TOKEN_TTL_MS ? params.ttlMs : void 0,
		nowMs: now
	});
	if (expiresAt === void 0) return crypto.randomBytes(24).toString("hex");
	return NO_VNC_OBSERVER_TOKENS.mint({
		noVncPort: params.noVncPort,
		password: normalizeOptionalString(params.password)
	}, {
		ttlMs: expiresAt - now,
		nowMs: now
	}).token;
}
function consumeNoVncObserverToken(token, nowMs) {
	const now = asDateTimestampMs(nowMs ?? Date.now());
	if (now === void 0) return null;
	return NO_VNC_OBSERVER_TOKENS.consume(token, now) ?? null;
}
function buildNoVncObserverTokenUrl(baseUrl, token) {
	return `${baseUrl}/sandbox/novnc?${new URLSearchParams({ token }).toString()}`;
}
//#endregion
//#region src/agents/sandbox/browser.ts
const HOT_BROWSER_WINDOW_MS = 3e5;
const CDP_SOURCE_RANGE_ENV_KEY = "OPENCLAW_BROWSER_CDP_SOURCE_RANGE";
const CDP_AUTH_TOKEN_ENV_KEY = "OPENCLAW_BROWSER_CDP_AUTH_TOKEN";
const SANDBOX_BROWSER_IMAGE_CONTRACT_LABEL = "org.openclaw.sandbox-browser.contract";
const browserContainerLifecycleQueue = new KeyedAsyncQueue();
const browserNetworkLifecycleQueue = new KeyedAsyncQueue();
function buildSandboxCdpAuthHeader(token) {
	return `Basic ${Buffer.from(`openclaw:${token}`).toString("base64")}`;
}
function buildSandboxCdpUrl(params) {
	const url = new URL(`http://127.0.0.1:${params.cdpPort}`);
	url.username = "openclaw";
	url.password = params.authToken;
	return url.toString().replace(/\/$/, "");
}
async function waitForSandboxCdp(params) {
	const deadline = Date.now() + Math.max(0, params.timeoutMs);
	const url = `http://127.0.0.1:${params.cdpPort}/json/version`;
	while (Date.now() < deadline) {
		try {
			const requestTimeoutMs = Math.max(1, Math.min(1e3, deadline - Date.now()));
			const ctrl = new AbortController();
			const t = setTimeout(ctrl.abort.bind(ctrl), requestTimeoutMs);
			try {
				const res = await fetch(url, {
					headers: { Authorization: buildSandboxCdpAuthHeader(params.authToken) },
					signal: ctrl.signal
				});
				await res.body?.cancel().catch(() => void 0);
				if (res.ok) return true;
			} finally {
				clearTimeout(t);
			}
		} catch {}
		const remainingMs = deadline - Date.now();
		if (remainingMs <= 0) break;
		await new Promise((r) => {
			setTimeout(r, Math.min(150, remainingMs));
		});
	}
	return false;
}
function buildSandboxBrowserResolvedConfig(params) {
	const cdpHost = "127.0.0.1";
	const cdpPortRange = deriveDefaultBrowserCdpPortRange(params.controlPort);
	return {
		enabled: true,
		evaluateEnabled: params.evaluateEnabled,
		controlPort: params.controlPort,
		cdpProtocol: "http",
		cdpHost,
		cdpIsLoopback: true,
		cdpPortRangeStart: cdpPortRange.start,
		cdpPortRangeEnd: cdpPortRange.end,
		remoteCdpTimeoutMs: 1500,
		remoteCdpHandshakeTimeoutMs: 3e3,
		localLaunchTimeoutMs: 15e3,
		localCdpReadyTimeoutMs: 8e3,
		actionTimeoutMs: DEFAULT_BROWSER_ACTION_TIMEOUT_MS,
		color: DEFAULT_OPENCLAW_BROWSER_COLOR,
		executablePath: void 0,
		headless: params.headless,
		noSandbox: false,
		attachOnly: true,
		defaultProfile: DEFAULT_OPENCLAW_BROWSER_PROFILE_NAME,
		extraArgs: [],
		tabCleanup: {
			enabled: true,
			idleMinutes: 120,
			maxTabsPerSession: 8,
			sweepMinutes: 5
		},
		profiles: { [DEFAULT_OPENCLAW_BROWSER_PROFILE_NAME]: {
			cdpPort: params.cdpPort,
			cdpUrl: buildSandboxCdpUrl({
				cdpPort: params.cdpPort,
				authToken: params.cdpAuthToken
			}),
			color: DEFAULT_OPENCLAW_BROWSER_COLOR
		} },
		ssrfPolicy: params.ssrfPolicy
	};
}
async function ensureSandboxBrowserImage(image) {
	const result = await execDocker([
		"image",
		"inspect",
		"-f",
		`{{ index .Config.Labels "${SANDBOX_BROWSER_IMAGE_CONTRACT_LABEL}" }}`,
		image
	], { allowFailure: true });
	if (result.code === 0) {
		const contract = result.stdout.trim();
		if (contract === "2026-05-12-cdp-relay-auth") return;
		throw new Error(`Sandbox browser image ${image} is stale or incompatible (contract=${contract && contract !== "<no value>" ? contract : "missing"}, expected=${SANDBOX_BROWSER_IMAGE_CONTRACT_EPOCH}). Rebuild it with scripts/sandbox-browser-setup.sh.`);
	}
	const stderr = result.stderr.trim();
	if (isDockerDaemonUnavailable(stderr)) throw new Error(formatDockerDaemonUnavailableError(stderr));
	throw new Error(`Sandbox browser image not found: ${image}. Build it with scripts/sandbox-browser-setup.sh.`);
}
async function ensureDockerNetwork(network, opts) {
	validateNetworkMode(network, { allowContainerNamespaceJoin: opts?.allowContainerNamespaceJoin === true });
	const normalized = normalizeOptionalLowercaseString(network) ?? "";
	if (!normalized || normalized === "bridge" || normalized === "none") return;
	await browserNetworkLifecycleQueue.enqueue(normalized, async () => {
		if ((await execDocker([
			"network",
			"inspect",
			network
		], { allowFailure: true })).code === 0) return;
		opts?.assertCurrent?.();
		await execDocker([
			"network",
			"create",
			"--driver",
			"bridge",
			network
		]);
	});
}
async function ensureSandboxBrowser(params) {
	if (!params.cfg.browser.enabled) return null;
	if (!isToolAllowed(params.cfg.tools, "browser")) return null;
	if (normalizeOptionalLowercaseString(params.cfg.browser.network) === "none") throw new Error("Sandbox browser network mode \"none\" is unsupported because browser control requires a host-reachable published CDP port. Use \"bridge\", a custom bridge network, or disable the sandbox browser.");
	const slug = params.cfg.scope === "shared" ? "shared" : slugifySessionKey(params.scopeKey);
	const containerName = buildSandboxContainerName(params.cfg.browser.containerPrefix, slug);
	let provisioning = true;
	const withWorkspace = params.withWorkspace;
	const provision = () => browserContainerLifecycleQueue.enqueue(containerName, async () => await ensureSandboxBrowserContainer({
		...params,
		withWorkspace: withWorkspace ? (operation) => provisioning ? operation() : withWorkspace(operation) : void 0
	}, containerName));
	try {
		return await (withWorkspace ? withWorkspace(provision) : provision());
	} finally {
		provisioning = false;
	}
}
async function ensureSandboxBrowserContainer(params, containerName) {
	let existing = BROWSER_BRIDGES.get(params.scopeKey);
	const stopExistingForContainer = async () => {
		await stopCachedBrowserBridgesForContainer(containerName);
		existing = BROWSER_BRIDGES.get(params.scopeKey);
	};
	const state = await dockerContainerState(containerName);
	const browserImage = params.cfg.browser.image ?? "openclaw-sandbox-browser:bookworm-slim";
	const cdpSourceRange = normalizeOptionalString(params.cfg.browser.cdpSourceRange);
	const browserDockerCfg = resolveSandboxBrowserDockerCreateConfig({
		docker: params.cfg.docker,
		browser: {
			...params.cfg.browser,
			image: browserImage
		}
	});
	const mountPlan = await prepareSandboxMountPlan({
		engine: DOCKER_SANDBOX_ENGINE,
		workspaceDir: params.workspaceDir,
		...params.withWorkspace ? { workspaceSource: "managed-worktree" } : {},
		assertCurrent: params.assertCurrent,
		agentWorkspaceDir: params.agentWorkspaceDir,
		skillsWorkspaceDir: params.skillsWorkspaceDir,
		workdir: params.cfg.docker.workdir,
		workspaceAccess: params.cfg.workspaceAccess,
		binds: browserDockerCfg.binds,
		tmpfs: browserDockerCfg.tmpfs
	});
	const expectedHash = computeSandboxBrowserConfigHash({
		docker: browserDockerCfg,
		dockerEnvPolicyEpoch: resolveDockerEnvPolicyEpoch(browserDockerCfg.env),
		browser: {
			cdpPort: params.cfg.browser.cdpPort,
			vncPort: params.cfg.browser.vncPort,
			noVncPort: params.cfg.browser.noVncPort,
			headless: params.cfg.browser.headless,
			noVncEnabled: params.cfg.browser.noVncEnabled,
			autoStartTimeoutMs: params.cfg.browser.autoStartTimeoutMs,
			cdpSourceRange
		},
		securityEpoch: SANDBOX_BROWSER_SECURITY_HASH_EPOCH,
		workspaceAccess: params.cfg.workspaceAccess,
		workspaceDir: params.workspaceDir,
		agentWorkspaceDir: params.agentWorkspaceDir,
		mountFormatVersion: 4,
		createArgsEpoch: SANDBOX_DOCKER_CREATE_ARGS_EPOCH,
		managedMounts: mountPlan.binds
	});
	const now = Date.now();
	let hasContainer = state.exists;
	let running = state.running;
	let currentHash = null;
	let hashMismatch = false;
	const noVncEnabled = isNoVncEnabled(params.cfg.browser);
	let noVncPassword;
	let cdpAuthToken;
	if (hasContainer) {
		if (noVncEnabled) noVncPassword = await readDockerContainerEnvVar(containerName, "OPENCLAW_BROWSER_NOVNC_PASSWORD") ?? void 0;
		cdpAuthToken = await readDockerContainerEnvVar(containerName, CDP_AUTH_TOKEN_ENV_KEY) ?? void 0;
		if (!cdpAuthToken) {
			defaultRuntime.log(`Removing stale sandbox browser container ${containerName} because it lacks the current CDP relay auth contract; it will be recreated.`);
			await stopExistingForContainer();
			params.assertCurrent?.();
			await execDocker([
				"rm",
				"-f",
				containerName
			], { allowFailure: true });
			hasContainer = false;
			running = false;
		}
	}
	if (hasContainer) {
		const registryEntry = (await readBrowserRegistry()).entries.find((entry) => entry.containerName === containerName);
		currentHash = await readDockerContainerLabel(containerName, "openclaw.configHash");
		if (!currentHash) currentHash = registryEntry?.configHash ?? null;
		hashMismatch = !currentHash || currentHash !== expectedHash;
		if (hashMismatch) {
			const lastUsedAtMs = registryEntry?.lastUsedAtMs;
			if (running && (typeof lastUsedAtMs !== "number" || now - lastUsedAtMs < HOT_BROWSER_WINDOW_MS)) {
				const mountsMatch = await sandboxMountPlanMatchesContainer({
					engine: DOCKER_SANDBOX_ENGINE,
					containerName,
					plan: mountPlan
				});
				handleHotSandboxConfigMismatch({
					containerName,
					scope: params.cfg.scope,
					sessionKey: params.scopeKey,
					browser: true,
					mountsChanged: !mountsMatch
				});
			} else {
				await stopExistingForContainer();
				params.assertCurrent?.();
				await execDocker([
					"rm",
					"-f",
					containerName
				], { allowFailure: true });
				hasContainer = false;
				running = false;
			}
		}
	}
	if (params.withWorkspace) await updateBrowserRegistry({
		containerName,
		sessionKey: params.scopeKey,
		workspaceDir: params.workspaceDir,
		createdAtMs: now,
		lastUsedAtMs: now,
		image: browserImage,
		configHash: hashMismatch && running ? currentHash ?? void 0 : expectedHash,
		cdpPort: 0
	});
	if (!hasContainer) {
		if (noVncEnabled) noVncPassword = generateNoVncPassword();
		cdpAuthToken = crypto.randomBytes(24).toString("hex");
		await ensureDockerNetwork(browserDockerCfg.network, {
			assertCurrent: params.assertCurrent,
			allowContainerNamespaceJoin: browserDockerCfg.dangerouslyAllowContainerNamespaceJoin === true
		});
		await ensureSandboxBrowserImage(browserImage);
		const { argv: args, env } = buildSandboxCreateArgs({
			name: containerName,
			cfg: browserDockerCfg,
			scopeKey: params.scopeKey,
			labels: {
				"openclaw.sandboxBrowser": "1",
				"openclaw.browserConfigEpoch": SANDBOX_BROWSER_SECURITY_HASH_EPOCH
			},
			configHash: expectedHash,
			includeBinds: false,
			bindSourceRoots: [params.workspaceDir, params.agentWorkspaceDir]
		});
		for (const bind of mountPlan.skippedBinds) defaultRuntime.log(`sandbox browser: skipping user bind "${bind}" — container path conflicts with a protected read-only skill mount`);
		for (const bind of mountPlan.binds) args.push("-v", bind);
		args.push("-p", `127.0.0.1::${params.cfg.browser.cdpPort}`);
		if (noVncEnabled) args.push("-p", `127.0.0.1::${params.cfg.browser.noVncPort}`);
		Object.assign(env, {
			OPENCLAW_BROWSER_HEADLESS: params.cfg.browser.headless ? "1" : "0",
			OPENCLAW_BROWSER_ENABLE_NOVNC: params.cfg.browser.noVncEnabled ? "1" : "0",
			OPENCLAW_BROWSER_CDP_PORT: String(params.cfg.browser.cdpPort),
			[CDP_AUTH_TOKEN_ENV_KEY]: cdpAuthToken,
			OPENCLAW_BROWSER_AUTO_START_TIMEOUT_MS: String(params.cfg.browser.autoStartTimeoutMs),
			OPENCLAW_BROWSER_VNC_PORT: String(params.cfg.browser.vncPort),
			OPENCLAW_BROWSER_NOVNC_PORT: String(params.cfg.browser.noVncPort),
			OPENCLAW_BROWSER_NO_SANDBOX: "1"
		});
		if (cdpSourceRange) env[CDP_SOURCE_RANGE_ENV_KEY] = cdpSourceRange;
		if (noVncEnabled && noVncPassword) env[NOVNC_PASSWORD_ENV_KEY] = noVncPassword;
		await withContainerEnvFile(env, async (envFile) => {
			args.push("--env-file", envFile, browserImage);
			params.assertCurrent?.();
			await execDocker(args);
		});
		params.assertCurrent?.();
		await execDocker(["start", containerName]);
	} else if (!running) {
		params.assertCurrent?.();
		await execDocker(["start", containerName]);
	}
	const mappedCdp = await readDockerPort(containerName, params.cfg.browser.cdpPort);
	if (!mappedCdp) throw new Error(`Failed to resolve CDP port mapping for ${containerName}.`);
	if (!cdpAuthToken) throw new Error(`Failed to resolve CDP relay auth for ${containerName}.`);
	const cdpUrl = buildSandboxCdpUrl({
		cdpPort: mappedCdp,
		authToken: cdpAuthToken
	});
	const mappedNoVnc = noVncEnabled ? await readDockerPort(containerName, params.cfg.browser.noVncPort) : null;
	if (noVncEnabled && !noVncPassword) noVncPassword = await readDockerContainerEnvVar(containerName, "OPENCLAW_BROWSER_NOVNC_PASSWORD") ?? void 0;
	const existingProfile = existing ? resolveProfile(existing.bridge.state.resolved, DEFAULT_OPENCLAW_BROWSER_PROFILE_NAME) : null;
	const desiredEvaluateEnabled = params.evaluateEnabled ?? true;
	let desiredAuthToken = normalizeOptionalString(params.bridgeAuth?.token);
	let desiredAuthPassword = normalizeOptionalString(params.bridgeAuth?.password);
	if (!desiredAuthToken && !desiredAuthPassword) {
		desiredAuthToken = existing?.authToken;
		desiredAuthPassword = existing?.authPassword;
		if (!desiredAuthToken && !desiredAuthPassword) desiredAuthToken = crypto.randomBytes(24).toString("hex");
	}
	const canReuse = Boolean(!params.withWorkspace && existing && existing.bridge.server.listening && existing.containerName === containerName && existingProfile?.cdpPort === mappedCdp && existingProfile?.cdpUrl === cdpUrl && isSameSsrFPolicy(existing.bridge.state.resolved.ssrfPolicy, params.ssrfPolicy) && existing.authToken === desiredAuthToken && existing.authPassword === desiredAuthPassword && existing.bridge.state.resolved.evaluateEnabled === desiredEvaluateEnabled);
	if (existing && !canReuse) await stopCachedBrowserBridge(params.scopeKey, existing);
	let bridge = canReuse ? existing?.bridge ?? null : null;
	if (!bridge) {
		const startTarget = async () => {
			const currentState = await dockerContainerState(containerName);
			if (currentState.exists && !currentState.running) {
				params.assertCurrent?.();
				await execDocker(["start", containerName]);
			}
			if (!await waitForSandboxCdp({
				cdpPort: mappedCdp,
				authToken: cdpAuthToken,
				timeoutMs: params.cfg.browser.autoStartTimeoutMs
			})) {
				params.assertCurrent?.();
				await execDocker([
					"rm",
					"-f",
					containerName
				], { allowFailure: true });
				throw new Error(`Sandbox browser CDP did not become reachable on 127.0.0.1:${mappedCdp} within ${params.cfg.browser.autoStartTimeoutMs}ms. The hung container has been forcefully removed.`);
			}
		};
		const onEnsureAttachTarget = params.cfg.browser.autoStart ? () => params.withWorkspace ? params.withWorkspace(startTarget) : startTarget() : void 0;
		bridge = await startBrowserBridgeServer({
			resolved: buildSandboxBrowserResolvedConfig({
				controlPort: 0,
				cdpPort: mappedCdp,
				cdpAuthToken,
				headless: params.cfg.browser.headless,
				evaluateEnabled: desiredEvaluateEnabled,
				ssrfPolicy: params.ssrfPolicy
			}),
			authToken: desiredAuthToken,
			authPassword: desiredAuthPassword,
			onEnsureAttachTarget,
			resolveSandboxNoVncToken: consumeNoVncObserverToken
		});
		BROWSER_BRIDGES.set(params.scopeKey, {
			bridge,
			containerName,
			authToken: desiredAuthToken,
			authPassword: desiredAuthPassword
		});
	}
	await updateBrowserRegistry({
		containerName,
		workspaceDir: params.workspaceDir,
		sessionKey: params.scopeKey,
		createdAtMs: now,
		lastUsedAtMs: now,
		image: browserImage,
		configHash: hashMismatch && running ? currentHash ?? void 0 : expectedHash,
		cdpPort: mappedCdp,
		noVncPort: mappedNoVnc ?? void 0
	});
	const noVncUrl = mappedNoVnc && noVncEnabled ? buildNoVncObserverTokenUrl(bridge.baseUrl, issueNoVncObserverToken({
		noVncPort: mappedNoVnc,
		password: noVncPassword
	})) : void 0;
	return {
		bridgeUrl: bridge.baseUrl,
		noVncUrl,
		containerName
	};
}
//#endregion
//#region src/agents/sandbox/docker-user.ts
async function resolveSandboxDockerUser(params) {
	if (params.docker.user?.trim()) return params.docker;
	const backend = params.backend.trim().toLowerCase();
	if (backend !== "docker" && backend !== "podman") return params.docker;
	const stat = params.stat ?? ((workspaceDir) => fs$1.stat(workspaceDir));
	try {
		const workspaceStat = await stat(params.workspaceDir);
		const uid = Number.isInteger(workspaceStat.uid) ? workspaceStat.uid : null;
		const gid = Number.isInteger(workspaceStat.gid) ? workspaceStat.gid : null;
		if (uid === null || gid === null || uid < 0 || gid < 0) return params.docker;
		if (backend === "podman" && (uid === 0 || gid === 0)) return params.docker;
		return {
			...params.docker,
			user: `${uid}:${gid}`
		};
	} catch {
		return params.docker;
	}
}
//#endregion
//#region src/agents/sandbox/workspace.ts
/**
* Sandbox workspace bootstrapper.
*
* Creates sandbox workspaces and seeds agent bootstrap files through root-boundary reads.
*/
const log = createSubsystemLogger("sandbox-workspace");
async function ensureSandboxWorkspace(workspaceDir, seedFrom, skipBootstrap, skipOptionalBootstrapFiles) {
	await fs$1.mkdir(workspaceDir, { recursive: true });
	if (seedFrom) {
		const seed = resolveUserPath(seedFrom);
		const files = [
			DEFAULT_AGENTS_FILENAME,
			DEFAULT_SOUL_FILENAME,
			DEFAULT_IDENTITY_FILENAME,
			DEFAULT_USER_FILENAME,
			DEFAULT_BOOTSTRAP_FILENAME
		];
		for (const name of files) {
			const src = path.join(seed, name);
			const dest = path.join(workspaceDir, name);
			if (await fs$1.access(dest).then(() => true, () => false)) continue;
			const opened = await openRootFile({
				absolutePath: src,
				rootPath: seed,
				boundaryLabel: "sandbox seed workspace"
			});
			if (!opened.ok) continue;
			let content;
			try {
				content = await readWorkspaceBootstrapFile(opened.fd);
			} catch (err) {
				if (err instanceof RangeError) {
					log.warn(`Ignoring oversized sandbox seed file ${src}: file exceeds the ${MAX_WORKSPACE_BOOTSTRAP_FILE_BYTES}-byte limit`);
					continue;
				}
				throw err;
			} finally {
				fs.closeSync(opened.fd);
			}
			await publishBootstrapFile(dest, content);
		}
	}
	await ensureAgentWorkspace({
		dir: workspaceDir,
		ensureBootstrapFiles: !skipBootstrap,
		skipOptionalBootstrapFiles
	});
}
//#endregion
//#region src/agents/sandbox/context.ts
const sandboxLog = createSubsystemLogger("agent/sandbox");
const loadSyncWorkspaceSkills = createLazyRuntimeNamedExport(() => import("./workspace-skill-sync.runtime.js"), "syncWorkspaceSkills");
async function syncSandboxSkillsToWorkspace(params) {
	try {
		const [syncWorkspaceSkills, { getRemoteSkillEligibility }, { resolveNodeExecEligibility }] = await Promise.all([
			loadSyncWorkspaceSkills(),
			import("./remote-dMDXd1Jp.mjs"),
			import("./exec-defaults-i5hb_YBj.mjs")
		]);
		await prepareRemoteSkillConnections();
		const nodeSkills = resolveNodeExecEligibility({
			cfg: params.config,
			sessionKey: params.rawSessionKey,
			agentId: params.agentId,
			execOverrides: params.execOverrides
		});
		const eligibility = {
			nodeSkills,
			remote: getRemoteSkillEligibility({ advertiseExecNode: nodeSkills.canExec })
		};
		return {
			eligibility,
			skillUsagePaths: await syncWorkspaceSkills({
				sourceWorkspaceDir: params.sourceWorkspaceDir,
				targetWorkspaceDir: params.targetWorkspaceDir,
				config: params.config,
				agentId: params.agentId,
				eligibility,
				skillsSnapshot: params.skillsSnapshot
			})
		};
	} catch (error) {
		const message = error instanceof Error ? error.message : JSON.stringify(error);
		defaultRuntime.error?.(`Sandbox skill sync failed: ${message}`);
		if (params.skillsSnapshot?.librarySelections?.length) throw error;
		return {};
	}
}
async function ensureSandboxWorkspaceLayout(params, selected, execOverrides) {
	const { rawSessionKey, runtime, localWorkspace } = selected;
	const cfg = localWorkspace ? {
		...selected.cfg,
		workspaceAccess: "rw"
	} : selected.cfg;
	const { agentWorkspaceDir, sandboxWorkspaceDir, scopeKey, skillsWorkspaceDir, workspaceDir } = resolveSandboxWorkspaceLayoutPaths({
		cfg,
		rawSessionKey,
		agentId: runtime.agentId,
		isolationSubject: localWorkspace && runtime.isolationSubject?.kind !== "session" ? {
			kind: "session",
			sessionKey: rawSessionKey
		} : runtime.isolationSubject,
		workspaceDir: localWorkspace?.workspaceDir ?? params.workspaceDir
	});
	if (cfg.workspaceAccess !== "rw") await ensureSandboxWorkspace(sandboxWorkspaceDir, agentWorkspaceDir, params.config?.agents?.defaults?.skipBootstrap, params.config?.agents?.defaults?.skipOptionalBootstrapFiles);
	else await fs$1.mkdir(workspaceDir, { recursive: true });
	const syncedSkills = await syncSandboxSkillsToWorkspace({
		sourceWorkspaceDir: agentWorkspaceDir,
		targetWorkspaceDir: cfg.workspaceAccess === "rw" ? skillsWorkspaceDir : sandboxWorkspaceDir,
		config: params.config,
		agentId: runtime.agentId,
		rawSessionKey,
		execOverrides,
		skillsSnapshot: params.skillsSnapshot
	});
	return {
		agentWorkspaceDir,
		scopeKey,
		sandboxWorkspaceDir,
		skillsWorkspaceDir,
		...syncedSkills.eligibility ? { skillsEligibility: syncedSkills.eligibility } : {},
		...syncedSkills.skillUsagePaths ? { skillUsagePaths: syncedSkills.skillUsagePaths } : {},
		workspaceDir
	};
}
function resolveSandboxSession(params) {
	const rawSessionKey = params.sessionKey?.trim();
	if (!rawSessionKey) return null;
	const runtime = params.preparedRuntimeStatus ? { ...params.preparedRuntimeStatus } : resolveSandboxRuntimeStatus({
		cfg: params.config,
		agentId: params.agentId,
		sessionKey: rawSessionKey
	});
	if (!runtime.sandboxed) return null;
	const configured = resolveSandboxConfigForAgent(params.config, runtime.agentId);
	const sessionAttachmentRoot = resolveSubagentSessionAttachmentRootDir({
		agentId: runtime.agentId,
		childSessionKey: rawSessionKey
	});
	try {
		if (fs.statSync(sessionAttachmentRoot).isDirectory()) runtime.isolationSubject = {
			kind: "session",
			sessionKey: rawSessionKey
		};
	} catch {}
	const librarySelections = params.skillsSnapshot?.librarySelections;
	if (librarySelections?.length) runtime.isolationSubject = {
		kind: "session",
		sessionKey: `${rawSessionKey}:skills:${hashTextSha256(JSON.stringify(librarySelections))}`
	};
	const configuredSandbox = librarySelections?.length ? {
		...configured,
		scope: "agent"
	} : configured;
	if (!runtime.sandboxRequired) return {
		rawSessionKey,
		runtime,
		cfg: configuredSandbox
	};
	return {
		rawSessionKey,
		runtime,
		cfg: {
			...configuredSandbox,
			scope: "agent",
			workspaceAccess: runtime.workspaceAccess
		}
	};
}
function assertSandboxSessionSecretOwnerAvailable(config, resolved) {
	if (resolved.cfg.backend !== "ssh") return;
	assertSshSandboxSecretOwnerAvailable({
		config,
		scope: resolved.cfg.scope,
		agentId: resolved.runtime.agentId
	});
}
async function prepareSandboxWorkspaceSelection(params, resolved) {
	const { rawSessionKey, runtime } = resolved;
	const localWorkspace = params.config ? await (await import("./local-workspace-BlcvuqtH.mjs")).prepareLocalSandboxWorkspace({
		cfg: params.config,
		agentId: runtime.agentId,
		sessionKey: rawSessionKey,
		workspaceDir: params.workspaceDir,
		backend: resolved.cfg.backend,
		assertCurrent: params.assertCurrent
	}) : void 0;
	const cfg = localWorkspace ? {
		...resolved.cfg,
		scope: "session",
		workspaceAccess: resolveSandboxConfigForAgent(params.config, runtime.agentId).workspaceAccess === "ro" ? "ro" : "rw"
	} : resolved.cfg;
	if (!localWorkspace && runtime.sandboxRequired && resolveSandboxConfigForAgent(params.config, runtime.agentId).workspaceAccess === "rw") sandboxLog.warn("Configured sandbox workspaceAccess \"rw\" is capped to \"ro\" for a role-required session; guests cannot share the writable agent workspace.");
	return {
		rawSessionKey,
		runtime,
		cfg,
		localWorkspace
	};
}
async function resolveProvisionedSandboxContext(params, resolved) {
	const selected = await prepareSandboxWorkspaceSelection(params, resolved);
	const { rawSessionKey, runtime, cfg, localWorkspace } = selected;
	if (cfg.prune.idleHours !== 0 || cfg.prune.maxAgeDays !== 0) await (await import("./prune-9zx3Y457.mjs")).maybePruneSandboxes();
	const { agentWorkspaceDir, scopeKey, skillsEligibility, skillUsagePaths, skillsWorkspaceDir, workspaceDir } = await ensureSandboxWorkspaceLayout(params, selected, params.execOverrides);
	localWorkspace?.assertCurrent();
	const docker = await resolveSandboxDockerUser({
		backend: cfg.backend,
		docker: cfg.docker,
		workspaceDir
	});
	const resolvedCfg = docker === cfg.docker ? cfg : {
		...cfg,
		docker
	};
	const readOnlyResourceMounts = resolvedCfg.scope === "shared" ? void 0 : await (async () => {
		const hostPath = resolveSubagentSessionAttachmentRootDir({
			agentId: runtime.agentId,
			childSessionKey: rawSessionKey
		});
		try {
			if (!(await fs$1.stat(hostPath)).isDirectory()) return;
			return [{
				hostPath: await fs$1.realpath(hostPath),
				containerPath: SANDBOX_SUBAGENT_ATTACHMENTS_MOUNT
			}];
		} catch {
			return;
		}
	})();
	const registeredRuntimeIds = await readRegisteredSandboxRuntimeIds({
		backendId: resolvedCfg.backend,
		scopeKey
	});
	const provisionBackend = () => createSandboxBackend({
		sessionKey: rawSessionKey,
		scopeKey,
		...registeredRuntimeIds.length > 0 ? { registeredRuntimeIds } : {},
		workspaceDir,
		...localWorkspace ? {
			workspaceSource: "managed-worktree",
			assertRuntimeCurrent: localWorkspace.assertCurrent
		} : {},
		agentWorkspaceDir,
		skillsWorkspaceDir,
		readOnlyResourceMounts,
		cfg: resolvedCfg,
		...params.requireCurrentConfig !== void 0 ? { requireCurrentConfig: params.requireCurrentConfig } : {}
	}, readAdmittedRunOperatorAuthority(params.admittedRunContext));
	const backend = localWorkspace ? await localWorkspace.provision(provisionBackend) : await provisionBackend();
	const resolvedBrowserConfig = resolvedCfg.browser.enabled ? resolveBrowserConfig(params.config?.browser, params.config) : void 0;
	const evaluateEnabled = resolvedBrowserConfig?.evaluateEnabled ?? true;
	const bridgeAuth = cfg.browser.enabled ? await (async () => {
		const cfgForAuth = params.config ?? (await import("./config/config.js")).getRuntimeConfig();
		let browserAuth = resolveBrowserControlAuth(cfgForAuth);
		try {
			browserAuth = (await ensureBrowserControlAuth({ cfg: cfgForAuth })).auth;
		} catch (error) {
			const message = error instanceof Error ? error.message : JSON.stringify(error);
			defaultRuntime.error?.(`Sandbox browser auth ensure failed: ${message}`);
		}
		return browserAuth;
	})() : void 0;
	if (resolvedCfg.browser.enabled && backend.capabilities?.browser !== true) throw new Error(`Sandbox backend "${backend.id}" does not support browser sandboxes yet.`);
	const provisionBrowser = () => ensureSandboxBrowser({
		scopeKey,
		workspaceDir,
		agentWorkspaceDir,
		skillsWorkspaceDir,
		cfg: resolvedCfg,
		evaluateEnabled,
		bridgeAuth,
		ssrfPolicy: resolvedBrowserConfig?.ssrfPolicy,
		withWorkspace: localWorkspace?.provision,
		assertCurrent: localWorkspace?.assertCurrent
	});
	const browser = resolvedCfg.browser.enabled && backend.capabilities?.browser === true ? await provisionBrowser() : null;
	const sandboxContext = {
		enabled: true,
		...runtime.sandboxRequired ? { required: true } : {},
		...localWorkspace ? {
			workspaceSource: "managed-worktree",
			workspaceCwd: localWorkspace.workspaceCwd
		} : {},
		backendId: backend.id,
		sessionKey: rawSessionKey,
		workspaceDir,
		agentWorkspaceDir,
		skillsWorkspaceDir,
		...skillsEligibility ? { skillsEligibility } : {},
		...skillUsagePaths ? { skillUsagePaths } : {},
		...readOnlyResourceMounts ? { readOnlyResourceMounts } : {},
		workspaceAccess: resolvedCfg.workspaceAccess,
		runtimeId: backend.runtimeId,
		runtimeLabel: backend.runtimeLabel,
		containerName: backend.runtimeId,
		containerWorkdir: backend.workdir,
		docker: resolvedCfg.docker,
		tools: resolvedCfg.tools,
		browserAllowHostControl: resolvedCfg.browser.allowHostControl,
		browser: browser ?? void 0,
		backend
	};
	sandboxContext.fsBridge = backend.createFsBridge?.({ sandbox: sandboxContext }) ?? createSandboxFsBridge({ sandbox: sandboxContext });
	if (localWorkspace) {
		localWorkspace.assertCurrent();
		(await import("./local-workspace-BlcvuqtH.mjs")).bindLocalSandboxWorkspace(sandboxContext, localWorkspace);
	}
	return sandboxContext;
}
async function resolveSandboxContext(params) {
	const resolved = resolveSandboxSession(params);
	if (!resolved) return null;
	try {
		assertSandboxSessionSecretOwnerAvailable(params.config, resolved);
		return await resolveProvisionedSandboxContext(params, resolved);
	} catch (error) {
		throw toSandboxProvisioningError(error, resolved.cfg.backend);
	}
}
async function ensureSandboxWorkspaceForSession(params) {
	const resolved = resolveSandboxSession(params);
	if (!resolved) return null;
	assertSandboxSessionSecretOwnerAvailable(params.config, resolved);
	const selected = await prepareSandboxWorkspaceSelection(params, resolved);
	const { rawSessionKey, cfg } = selected;
	const { agentWorkspaceDir, scopeKey, skillsEligibility, skillUsagePaths, skillsWorkspaceDir, workspaceDir } = await ensureSandboxWorkspaceLayout(params, selected);
	const containerWorkdir = getSandboxBackendWorkdirResolver(cfg.backend)?.({
		cfg,
		sessionKey: rawSessionKey,
		scopeKey,
		workspaceDir,
		agentWorkspaceDir,
		skillsWorkspaceDir
	});
	return {
		workspaceDir,
		...containerWorkdir ? { containerWorkdir } : {},
		skillsWorkspaceDir,
		...skillsEligibility ? { skillsEligibility } : {},
		...skillUsagePaths ? { skillUsagePaths } : {},
		workspaceAccess: cfg.workspaceAccess
	};
}
//#endregion
export { resolveSandboxContext as n, ensureSandboxWorkspaceForSession as t };
