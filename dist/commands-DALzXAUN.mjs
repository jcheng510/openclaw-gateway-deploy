import { X as validateCommandsListParams } from "./src-D2gvuSyP.mjs";
import { t as ErrorCodes } from "./gateway-error-details-DIefe7Zy.mjs";
import { f as errorShape } from "./error-codes-DI20vDEB.mjs";
import { _ as resolveSessionSharingTarget, s as authorizeSessionSharingTarget } from "./session-sharing-policy-BALdNo4L.mjs";
import "./session-sharing-Bhe-fXzH.mjs";
import { r as defineValidatedGatewayMethod } from "./validation-B7TobU6-.mjs";
import { t as resolveAgentIdOrRespondError } from "./agent-id-shared-Ed1g6nj_.mjs";
import { t as buildCommandsListResult } from "./commands-list-result-D_kDJwpj.mjs";
//#region src/gateway/server-methods/commands.ts
/** Gateway handler for enumerating available chat/native commands. */
const commandsHandlers = { "commands.list": defineValidatedGatewayMethod("commands.list", validateCommandsListParams, async ({ params, respond, context, client }) => {
	const resolved = resolveAgentIdOrRespondError({
		rawAgentId: params.agentId,
		respond,
		cfg: context.getRuntimeConfig(),
		normalize: (rawAgentId) => typeof rawAgentId === "string" ? rawAgentId.trim() : void 0
	});
	if (!resolved) return;
	const target = params.sessionKey ? resolveSessionSharingTarget({
		cfg: resolved.cfg,
		sessionKey: params.sessionKey,
		agentId: resolved.agentId
	}) : null;
	if (params.sessionKey && !target) {
		respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "Session not found."));
		return;
	}
	if (target) {
		const error = authorizeSessionSharingTarget({
			cfg: resolved.cfg,
			client,
			target
		});
		if (error) {
			respond(false, void 0, error);
			return;
		}
	}
	const result = await buildCommandsListResult({
		cfg: resolved.cfg,
		agentId: resolved.agentId,
		provider: params.provider,
		scope: params.scope,
		includeArgs: params.includeArgs,
		sessionKey: params.sessionKey,
		sessionEntry: target?.entry
	});
	if (target && params.sessionKey) {
		const cfg = context.getRuntimeConfig();
		const current = resolveSessionSharingTarget({
			cfg,
			sessionKey: params.sessionKey,
			agentId: resolved.agentId
		});
		if (!current || current.storePath !== target.storePath || current.storeKey !== target.storeKey || current.entry.sessionId !== target.entry.sessionId || current.entry.lifecycleRevision !== target.entry.lifecycleRevision || JSON.stringify(current.entry.skillLibrarySelections) !== JSON.stringify(target.entry.skillLibrarySelections)) {
			respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, "Session changed while preparing its commands. Retry the request."));
			return;
		}
		const error = authorizeSessionSharingTarget({
			cfg,
			client,
			target: current
		});
		if (error) {
			respond(false, void 0, error);
			return;
		}
	}
	respond(true, result, void 0);
}) };
//#endregion
export { commandsHandlers };
