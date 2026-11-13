import { c as normalizeOptionalLowercaseString } from "./string-coerce-6kR-86XC.mjs";
import "./src-SskUVPJG.mjs";
import { t as expectDefined } from "./expect-lbe3Hgrh.mjs";
import { n as sliceUtf16Safe, r as truncateUtf16Safe } from "./utf16-slice-D_ngcYKd.mjs";
import { t as formatCliCommand } from "./command-format-Cte1SWM4.mjs";
import { l as resolveSessionStorePathCore, u as resolveSessionStorePathWithContext } from "./paths-CQ3zRaeb.mjs";
import { g as resolveSessionAgentId } from "./agent-scope-L_eY3Hj7.mjs";
import { n as canonicalizeMainSessionAlias, r as resolveAgentMainSessionKey } from "./main-session-BFJFO581.mjs";
import { s as sessionCreatorProfileId } from "./session-entry-provenance-BWZtrWXT.mjs";
import { E as resolveSessionEntry, b as loadExactSessionEntryCandidatesReadOnlyBatch } from "./session-accessor.sqlite-pending-inputs-BdT_Tg9N.mjs";
import { s as withSessionEntryReadOnlyInWorker } from "./session-entry-read-runtime-e6OehipM.mjs";
import { r as resolveSandboxToolPolicyForAgent, t as classifyToolAgainstSandboxToolPolicy } from "./tool-policy-CQANCgET.mjs";
import { r as escapeControlCharsVisible, t as auditSandboxToolPolicyBlock } from "./tool-policy-audit-C_2wblRD.mjs";
import { i as resolveSandboxConfigForAgent } from "./config-Dq9GjaYt.mjs";
//#region src/agents/sandbox/runtime-status.ts
/**
* Sandbox runtime status and tool-policy diagnostics.
*
* Resolves whether a session is sandboxed and explains policy blocks before tool execution.
*/
function shouldSandboxSession(cfg, sessionKey, mainSessionKey, sandboxRequired, sandboxMode) {
	if (sandboxRequired) return true;
	if (sandboxMode === "off" || cfg.mode === "off") return false;
	if (cfg.mode === "all") return true;
	return sessionKey.trim() !== mainSessionKey.trim();
}
function resolveMainSessionKeyForSandbox(params) {
	if (params.cfg?.session?.scope === "global") return "global";
	return resolveAgentMainSessionKey({
		cfg: params.cfg,
		agentId: params.agentId
	});
}
/** Resolves sandbox mode, effective session scope, and tool policy for a session. */
function resolveSandboxRuntimeStatus(params) {
	return resolveSandboxRuntimeStatusWithRead(params, resolveSessionEntry);
}
/** Keep the classification read's captured owner alive through one asynchronous policy preparation. */
async function withSandboxRuntimeStatusInWorker(params, source, consume) {
	source.assertCurrent();
	const classification = resolveSandboxClassification(params);
	const prepare = (entry) => {
		source.assertCurrent();
		return consume(resolveSandboxRuntimeStatusWithRead({
			...params,
			preparedSessionEntry: entry ?? null
		}, resolveSessionEntry, classification));
	};
	if (!classification.classificationSessionKey) {
		const result = await prepare(void 0);
		source.assertCurrent();
		return result;
	}
	return withSessionEntryReadOnlyInWorker({
		agentId: classification.classificationAgentId,
		sessionKey: classification.comparableSessionKey,
		storePath: resolveSessionStorePathWithContext(params.cfg?.session?.store, {
			agentId: classification.classificationAgentId,
			env: source.env
		}, { cwd: source.cwd }),
		env: source.env
	}, source.assertCurrent, async (read) => {
		if (!read.ok) throw read.error;
		return prepare(read.value);
	});
}
/** Classifies durable canonical keys without admitting the same store once per session. */
function resolveSandboxRuntimeStatusesForPersistedSessions(requests) {
	const results = loadExactSessionEntryCandidatesReadOnlyBatch(requests.map((params) => ({
		agentId: params.agentId,
		env: params.env,
		storePath: resolveSessionStorePathCore(params.cfg.session?.store, {
			agentId: params.agentId,
			env: params.env
		}),
		projection: "list",
		sessionKeys: params.sessionKeys.map((sessionKey) => canonicalizeMainSessionAlias({
			...params,
			sessionKey
		}))
	})));
	return requests.map((params, index) => {
		const result = expectDefined(results[index], "sandbox session read result");
		if (!result.ok) throw result.error;
		const byKey = new Map(result.value.map(({ sessionKey, entry }) => [sessionKey, entry]));
		const readSession = ({ sessionKey }) => ({
			existing: byKey.get(sessionKey),
			normalizedKey: sessionKey,
			legacyKeys: []
		});
		return params.sessionKeys.map((sessionKey) => resolveSandboxRuntimeStatusWithRead({
			...params,
			sessionKey
		}, readSession));
	});
}
function resolveSandboxClassification(params) {
	const sessionKey = params.sessionKey?.trim() ?? "";
	const agentId = resolveSessionAgentId({
		sessionKey,
		config: params.cfg,
		agentId: params.agentId
	});
	const classificationSessionKey = params.classificationSessionKey?.trim() || sessionKey;
	const classificationAgentId = resolveSessionAgentId({
		sessionKey: classificationSessionKey,
		config: params.cfg,
		agentId: params.classificationAgentId,
		fallbackAgentId: classificationSessionKey === sessionKey ? agentId : void 0
	});
	const cfg = params.cfg;
	return {
		sessionKey,
		agentId,
		classificationSessionKey,
		classificationAgentId,
		cfg,
		sandboxCfg: resolveSandboxConfigForAgent(cfg, classificationAgentId),
		mainSessionKey: resolveMainSessionKeyForSandbox({
			cfg,
			agentId: classificationAgentId
		}),
		comparableSessionKey: canonicalizeMainSessionAlias({
			cfg,
			agentId: classificationAgentId,
			sessionKey: classificationSessionKey
		})
	};
}
function resolveSandboxRuntimeStatusWithRead(params, readSession, classification = resolveSandboxClassification(params)) {
	const { sessionKey, agentId, classificationSessionKey, classificationAgentId, cfg, sandboxCfg, mainSessionKey, comparableSessionKey } = classification;
	const session = params.preparedSessionEntry !== void 0 ? {
		existing: params.preparedSessionEntry ?? void 0,
		normalizedKey: comparableSessionKey
	} : classificationSessionKey ? readSession({
		agentId: classificationAgentId,
		clone: false,
		sessionKey: comparableSessionKey,
		storePath: resolveSessionStorePathCore(cfg?.session?.store, { agentId: classificationAgentId })
	}, { readOnly: true }) : void 0;
	const sandboxRequired = session?.existing?.sandbox === "required";
	const profileId = sessionCreatorProfileId(session?.existing?.createdActor)?.trim();
	const isolation = sandboxRequired ? {
		sandboxRequired: true,
		createdActor: session.existing?.createdActor,
		isolationSubject: profileId ? {
			kind: "profile",
			profileId
		} : {
			kind: "session",
			sessionKey: session.normalizedKey
		},
		workspaceAccess: sandboxCfg.workspaceAccess === "rw" ? "ro" : sandboxCfg.workspaceAccess
	} : { sandboxRequired: false };
	const sandboxed = classificationSessionKey ? shouldSandboxSession(sandboxCfg, comparableSessionKey, mainSessionKey, sandboxRequired, session?.existing?.sandboxMode) : false;
	return {
		agentId,
		sessionKey,
		classificationAgentId,
		classificationSessionKey,
		mainSessionKey,
		mode: sandboxCfg.mode,
		...isolation,
		sandboxed,
		toolPolicy: resolveSandboxToolPolicyForAgent(cfg, classificationAgentId)
	};
}
function hasUnsafeControlChars(value) {
	return Array.from(value).some((char) => {
		const codePoint = char.codePointAt(0) ?? 0;
		return codePoint < 32 || codePoint === 127;
	});
}
function redactSessionKey(value) {
	const trimmed = value.trim();
	if (!trimmed) return "(unknown)";
	if (trimmed.length <= 12) return "(redacted)";
	return `${escapeControlCharsVisible(truncateUtf16Safe(trimmed, 6))}…${escapeControlCharsVisible(sliceUtf16Safe(trimmed, -6))}`;
}
function shellEscapeSingleArg(value) {
	return `'${value.replaceAll("'", `'\\''`)}'`;
}
/** Formats the user-facing denial message when sandbox tool policy blocks a tool. */
function formatSandboxToolPolicyBlockedMessage(params) {
	const tool = normalizeOptionalLowercaseString(params.toolName);
	if (!tool) return;
	const runtime = resolveSandboxRuntimeStatus({
		cfg: params.cfg,
		sessionKey: params.sessionKey,
		agentId: params.agentId
	});
	if (!runtime.sandboxed) return;
	const { blockedByDeny, blockedByAllow } = classifyToolAgainstSandboxToolPolicy(tool, runtime.toolPolicy);
	if (!blockedByDeny && !blockedByAllow) return;
	const blockingSource = blockedByDeny ? runtime.toolPolicy.sources.deny : runtime.toolPolicy.sources.allow;
	if (params.audit === true) auditSandboxToolPolicyBlock({
		toolName: tool,
		ruleType: blockedByDeny ? "deny" : "allow",
		ruleSource: blockingSource.source,
		configKey: blockingSource.key,
		policy: runtime.toolPolicy,
		mode: runtime.mode
	});
	const reasons = [];
	const fixes = [];
	if (blockedByDeny) {
		reasons.push("deny list");
		fixes.push(`Remove "${tool}" from ${runtime.toolPolicy.sources.deny.key}.`);
	}
	if (blockedByAllow) {
		reasons.push("allow list");
		fixes.push(`Add "${tool}" to ${runtime.toolPolicy.sources.allow.key} (or set it to [] to allow all).`);
	}
	const lines = [];
	lines.push(`Tool "${tool}" blocked by sandbox tool policy (mode=${runtime.mode}).`);
	lines.push(`Session: ${redactSessionKey(runtime.sessionKey)}`);
	lines.push(`Reason: ${reasons.join(" + ")}`);
	lines.push("Fix:");
	lines.push(runtime.sandboxRequired ? "- This session requires a sandbox; create a new session under an authorized role." : "- agents.defaults.sandbox.mode=off (disable sandbox)");
	for (const fix of fixes) lines.push(`- ${fix}`);
	if (runtime.mode === "non-main" && !runtime.sandboxRequired) lines.push("- Use the agent main session instead of a non-main session.");
	const explainCommand = runtime.sessionKey && !hasUnsafeControlChars(runtime.sessionKey) ? `openclaw sandbox explain --session ${shellEscapeSingleArg(runtime.sessionKey)} --agent ${runtime.agentId}` : `openclaw sandbox explain --agent ${runtime.agentId}`;
	lines.push(`- See: ${formatCliCommand(explainCommand)}`);
	return lines.join("\n");
}
//#endregion
export { withSandboxRuntimeStatusInWorker as i, resolveSandboxRuntimeStatus as n, resolveSandboxRuntimeStatusesForPersistedSessions as r, formatSandboxToolPolicyBlockedMessage as t };
