import { r as defaultRuntime } from "../../runtime-BC29JSZp.mjs";
import { t as formatErrorMessage } from "../../errors-YPvSaqwO.mjs";
import { t as createSubsystemLogger } from "../../subsystem-CeqVSEVi.mjs";
import { d as resolveAgentWorkspaceDir } from "../../agent-scope-config-Dm6T00l4.mjs";
import { l as resolveAgentIdFromSessionKey } from "../../session-key-BC4m_Ly5.mjs";
import { i as listAgentIds } from "../../agent-roster-B45JERT5.mjs";
import { l as resolveSessionStorePathCore } from "../../paths-CQ3zRaeb.mjs";
import "../../agent-scope-L_eY3Hj7.mjs";
import { t as dedupeByKey } from "../../dedupe-by-key-DnqEVrst.mjs";
import { a as escapeInternalRuntimeContextDelimiters, i as OPENCLAW_RUNTIME_CONTEXT_NOTICE, n as INTERNAL_RUNTIME_CONTEXT_END, t as INTERNAL_RUNTIME_CONTEXT_BEGIN } from "../../internal-runtime-context-CLIwiurx.mjs";
import { n as SILENT_REPLY_TOKEN } from "../../tokens-BTKQYTUd.mjs";
import { a as resolveMainSessionKey, r as resolveAgentMainSessionKey } from "../../main-session-BFJFO581.mjs";
import "../../session-accessor-CGLseszP.mjs";
import { b as applySessionEntryLifecycleMutation } from "../../session-accessor.reset-xoze7eVv.mjs";
import { o as isGatewayStartupEvent } from "../../internal-hooks-C3e5o6Hw.mjs";
import { a as clearBootEchoContextForSession, o as setBootEchoContextForSession } from "../../openclaw-tools-BwWTN0hs.mjs";
import { t as createDefaultDeps } from "../../deps-DDJuVwX7.mjs";
import { i as agentCommandFromSystem } from "../../agent-command-DUhFGJSr.mjs";
import "../../agent-CwYoGxCC.mjs";
import { t as runStartupTasks } from "../../startup-tasks-x74hr4mk.mjs";
import path from "node:path";
import fs from "node:fs/promises";
import crypto from "node:crypto";
import { readRegularFile } from "@openclaw/fs-safe/advanced";
//#region src/gateway/boot.ts
function generateBootSessionId() {
	return `boot-${(/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-").replace("T", "_").replace("Z", "")}-${crypto.randomUUID().slice(0, 8)}`;
}
const log$1 = createSubsystemLogger("gateway/boot");
const BOOT_FILENAME = "BOOT.md";
function buildBootPrompt(content) {
	const safeContent = escapeInternalRuntimeContextDelimiters(content);
	return [
		"You are running a boot check. Follow BOOT.md instructions exactly.",
		"",
		INTERNAL_RUNTIME_CONTEXT_BEGIN,
		OPENCLAW_RUNTIME_CONTEXT_NOTICE,
		"",
		"BOOT.md:",
		safeContent,
		INTERNAL_RUNTIME_CONTEXT_END,
		"",
		"If BOOT.md asks you to send a message, use the message tool (action=send with channel + target).",
		"Use the `target` field (not `to`) for message tool destinations.",
		`After sending with the message tool, reply with ONLY: ${SILENT_REPLY_TOKEN}.`,
		`If nothing needs attention, reply with ONLY: ${SILENT_REPLY_TOKEN}.`
	].join("\n");
}
const MAX_BOOT_FILE_BYTES = 16777216;
async function loadBootFile(workspaceDir) {
	const bootPath = path.join(workspaceDir, BOOT_FILENAME);
	let buffer;
	try {
		const resolvedPath = await fs.realpath(bootPath);
		({buffer} = await readRegularFile({
			filePath: resolvedPath,
			maxBytes: MAX_BOOT_FILE_BYTES
		}));
	} catch (err) {
		if (err.code === "ENOENT") return { status: "missing" };
		throw err;
	}
	const content = buffer.toString("utf-8").trim();
	return content ? {
		status: "ok",
		content
	} : { status: "empty" };
}
async function runBootOnce(params) {
	const bootRuntime = {
		log: () => {},
		error: (message) => log$1.error(String(message)),
		exit: defaultRuntime.exit
	};
	let result;
	try {
		result = await loadBootFile(params.workspaceDir);
	} catch (err) {
		const message = formatErrorMessage(err);
		log$1.error(`boot: failed to read ${BOOT_FILENAME}: ${message}`);
		return {
			status: "failed",
			reason: message
		};
	}
	if (result.status !== "ok") return {
		status: "skipped",
		reason: result.status
	};
	const mainSessionKey = params.agentId ? resolveAgentMainSessionKey({
		cfg: params.cfg,
		agentId: params.agentId
	}) : resolveMainSessionKey(params.cfg);
	const message = buildBootPrompt(result.content);
	const sessionId = generateBootSessionId();
	const agentId = resolveAgentIdFromSessionKey(mainSessionKey);
	const sessionKey = `agent:${agentId}:boot:${sessionId}`;
	const storePath = resolveSessionStorePathCore(params.cfg.session?.store, { agentId });
	let ownedSessionId = sessionId;
	let agentFailure;
	let cleanupFailure;
	setBootEchoContextForSession(sessionKey, message);
	try {
		await agentCommandFromSystem({
			message,
			sessionKey,
			sessionId,
			deliver: false,
			suppressPromptPersistence: true,
			onSessionIdChanged: (nextSessionId) => {
				ownedSessionId = nextSessionId;
			}
		}, { boundary: "gateway.boot" }, bootRuntime, params.deps);
	} catch (err) {
		agentFailure = formatErrorMessage(err);
		log$1.error(`boot: agent run failed: ${agentFailure}`);
	} finally {
		clearBootEchoContextForSession(sessionKey);
		try {
			await applySessionEntryLifecycleMutation({
				agentId,
				storePath,
				removals: [{
					sessionKey,
					expectedSessionId: ownedSessionId,
					archiveRemovedTranscript: false
				}],
				skipMaintenance: true
			});
		} catch (err) {
			cleanupFailure = formatErrorMessage(err);
			log$1.error(`boot: failed to clean up session: ${cleanupFailure}`);
		}
	}
	if (!agentFailure && !cleanupFailure) return { status: "ran" };
	return {
		status: "failed",
		reason: [agentFailure ? `agent run failed: ${agentFailure}` : void 0, cleanupFailure ? `session cleanup failed: ${cleanupFailure}` : void 0].filter((part) => Boolean(part)).join("; ")
	};
}
//#endregion
//#region src/hooks/bundled/boot-md/handler.ts
const log = createSubsystemLogger("hooks/boot-md");
/** Gateway-startup hook that runs BOOT.md checks once per unique agent workspace. */
const runBootChecklist = async (event) => {
	if (!isGatewayStartupEvent(event)) return;
	if (!event.context.cfg) return;
	const cfg = event.context.cfg;
	const deps = event.context.deps ?? createDefaultDeps();
	const tasks = dedupeByKey(listAgentIds(cfg).map((agentId) => {
		return {
			agentId,
			workspaceDir: resolveAgentWorkspaceDir(cfg, agentId)
		};
	}), ({ workspaceDir }) => workspaceDir).map(({ agentId, workspaceDir }) => ({
		source: "boot-md",
		agentId,
		workspaceDir,
		run: () => runBootOnce({
			cfg,
			deps,
			workspaceDir,
			agentId
		})
	}));
	await runStartupTasks({
		tasks,
		log
	});
};
//#endregion
export { runBootChecklist as default };
