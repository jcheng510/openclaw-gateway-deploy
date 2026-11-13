import { l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import { n as normalizeAgentId } from "./agent-id-D1-Q6vR4.mjs";
import { d as resolveAgentWorkspaceDir } from "./agent-scope-config-Dm6T00l4.mjs";
import { A as parseAgentSessionKey } from "./session-key-BC4m_Ly5.mjs";
import "./agent-scope-L_eY3Hj7.mjs";
import { Di as validateSessionsDiffParams } from "./src-D2gvuSyP.mjs";
import { t as ErrorCodes } from "./gateway-error-details-DIefe7Zy.mjs";
import { f as errorShape } from "./error-codes-DI20vDEB.mjs";
import { n as resolveRequestedSessionAgentId } from "./session-request-agent-DFWpsx2m.mjs";
import { i as loadGatewaySessionEntryReadOnly } from "./session-utils-store-DWiBeNMH.mjs";
import "./session-utils-FXsPIESl.mjs";
import { n as loadCheckoutDiff } from "./session-diff-KsrgkuxC.mjs";
import { t as assertValidParams } from "./validation-B7TobU6-.mjs";
import { i as loadRepositoryArtifactDiff, t as resolveRepositoryWorkspaceAccess } from "./session-repository-workspace-access-Ds5gmDH9.mjs";
//#region src/gateway/server-methods/sessions-diff.ts
async function loadSessionDiff(params, context) {
	const empty = (unavailableReason) => ({
		sessionKey: params.sessionKey,
		files: [],
		additions: 0,
		deletions: 0,
		...unavailableReason ? { unavailableReason } : {}
	});
	const loaded = loadGatewaySessionEntryReadOnly(params.sessionKey, { agentId: params.agentId });
	const { cfg, agentId: loadedAgentId, entry, storePath, canonicalKey } = loaded;
	if (!entry?.sessionId || !storePath) return empty("unknown_session");
	const agentId = normalizeAgentId(loadedAgentId ?? parseAgentSessionKey(canonicalKey)?.agentId ?? params.agentId ?? parseAgentSessionKey(params.sessionKey)?.agentId);
	const repository = resolveRepositoryWorkspaceAccess({
		...loaded,
		agentId
	}, context);
	if (repository) {
		if (repository.kind === "stored") return await loadRepositoryArtifactDiff(repository, params);
		if (!repository.repository.baseCommit) throw new Error("The cloud repository is still preparing its base revision.");
		const result = await repository.inspect("diff", {
			scope: params.scope ?? "all",
			commit: params.commit,
			baseCommit: repository.repository.baseCommit
		});
		delete result.root;
		return result;
	}
	const cwd = normalizeOptionalString(entry.spawnedCwd) ?? normalizeOptionalString(entry.spawnedWorkspaceDir) ?? normalizeOptionalString(resolveAgentWorkspaceDir(cfg, agentId));
	if (!cwd) return empty("unknown_session");
	if (params.scope === "commit") {
		if (!params.commit) throw new TypeError("commit scope requires a commit");
		return await loadCheckoutDiff({
			commit: params.commit,
			cwd,
			scope: "commit",
			sessionKey: params.sessionKey
		});
	}
	return await loadCheckoutDiff({
		cwd,
		scope: params.scope ?? "all",
		sessionKey: params.sessionKey,
		baseline: entry.sessionDiffBaseline,
		sessionId: entry.sessionId
	});
}
const sessionsDiffHandlers = { "sessions.diff": async ({ params, respond, context }) => {
	if (!assertValidParams(params, validateSessionsDiffParams, "sessions.diff", respond)) return;
	if ((params.scope ?? "all") === "commit" !== (params.commit !== void 0)) {
		respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "invalid sessions.diff params: commit must be set if and only if scope is commit"));
		return;
	}
	const requestedAgent = resolveRequestedSessionAgentId(context.getRuntimeConfig(), params.sessionKey, params.agentId);
	if (!requestedAgent.ok) {
		respond(false, void 0, requestedAgent.error);
		return;
	}
	respond(true, await loadSessionDiff({
		...params,
		...requestedAgent.agentId ? { agentId: requestedAgent.agentId } : {}
	}, context));
} };
//#endregion
export { sessionsDiffHandlers };
