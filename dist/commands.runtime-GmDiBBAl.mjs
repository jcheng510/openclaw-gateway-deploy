import { t as createLazyImportLoader } from "./lazy-promise-DGqyc4Y4.mjs";
import { a as resolveAgentDir } from "./agent-scope-config-Dm6T00l4.mjs";
import { y as isAcpSessionKey } from "./session-key-BC4m_Ly5.mjs";
import { g as resolveSessionAgentId } from "./agent-scope-L_eY3Hj7.mjs";
import { a as isInternalMessageChannel } from "./message-channel-DDiCYM9I.mjs";
import { r as logVerbose } from "./globals-ChjEJkWj.mjs";
import { a as copyReplyPayloadMetadata } from "./reply-payload-CZCVcyy_.mjs";
import { n as isResetAuthorizedForContext } from "./command-auth-Bze75OJs.mjs";
import { t as clearAllCliSessions } from "./cli-session-binding-Xt6nY3mk.mjs";
import "./session-accessor-CGLseszP.mjs";
import { c as updateSessionEntry } from "./session-accessor.reset-xoze7eVv.mjs";
import { l as resolveCommandTurnTargetSessionKey } from "./command-turn-context-CSgWM9bZ.mjs";
import { n as shouldHandleTextCommands } from "./commands-text-routing-DogWVeU0.mjs";
import "./commands-registry-8w6_PlUY.mjs";
import { t as parseSoftResetCommand } from "./commands-reset-mode-Dq_704Gp.mjs";
import { t as clearBootstrapSnapshot } from "./bootstrap-cache-DzgX-eHd.mjs";
import "./cli-session-CuXTit63.mjs";
import { t as applyCommandTextToContext } from "./command-context-rewrite-DyA5NUca.mjs";
import { n as commandReply } from "./command-gates-D1OFbxXh.mjs";
import "./commands-context-DRNAjt8q.mjs";
import { t as emitResetCommandHooks } from "./commands-reset-hooks-Ccjnfiyr.mjs";
import { n as resetConfiguredBindingTargetInPlace } from "./binding-targets-D3Ka6KbB.mjs";
import { n as resolveBoundAcpThreadSessionKey } from "./targets-BUoobXSD.mjs";
import { n as buildStatusReply } from "./commands-status-BPnfAmue.mjs";
//#region src/auto-reply/reply/commands-reset.ts
/** Handles /new and /reset command flows, including soft reset and ACP-bound sessions. */
function applyAcpResetTailContext(ctx, resetTail) {
	applyCommandTextToContext(ctx, resetTail);
	ctx.AcpDispatchTailAfterReset = true;
}
function isResetAuthorized(params) {
	return isResetAuthorizedForContext({
		ctx: params.ctx,
		cfg: params.cfg,
		commandAuthorized: params.command.isAuthorizedSender || params.ctx.CommandAuthorized === true
	});
}
/** Handles reset/new commands or returns null when another command handler should continue. */
async function maybeHandleResetCommand(params) {
	const resetMatch = params.command.commandBodyNormalized.match(/^\/(new|reset)(?:\s|$)/i);
	if (!resetMatch) return null;
	if (!isResetAuthorized(params)) {
		logVerbose(`Ignoring /${resetMatch[1]} from unauthorized sender: ${params.command.senderId || "<unknown>"}`);
		return isInternalMessageChannel(params.ctx.Provider || params.ctx.Surface) && isInternalMessageChannel(params.command.channel) ? commandReply("⚠️ You are not authorized to reset this session. Gateway resets require operator.admin and command access. Ask your administrator to reset it, or send your message without the command.") : { shouldContinue: false };
	}
	const commandTargetSessionKey = resolveCommandTurnTargetSessionKey(params.ctx);
	const softReset = parseSoftResetCommand(params.command.commandBodyNormalized);
	if (softReset.matched) {
		const boundAcpSessionKey = await resolveBoundAcpThreadSessionKey(params, commandTargetSessionKey);
		params.opts?.abortSignal?.throwIfAborted();
		if (boundAcpSessionKey && isAcpSessionKey(boundAcpSessionKey) ? boundAcpSessionKey.trim() : void 0) return {
			shouldContinue: false,
			reply: { text: "Usage: /reset soft is not available for ACP-bound sessions yet." }
		};
		const targetSessionEntry = params.sessionStore?.[params.sessionKey] ?? params.sessionEntry;
		const previousSessionEntry = params.previousSessionEntry ?? (targetSessionEntry ? { ...targetSessionEntry } : void 0);
		if (targetSessionEntry) {
			const now = Date.now();
			clearAllCliSessions(targetSessionEntry);
			if (params.sessionEntry && params.sessionEntry !== targetSessionEntry) {
				clearAllCliSessions(params.sessionEntry);
				params.sessionEntry.updatedAt = now;
				params.sessionEntry.lastInteractionAt = now;
			}
			if (params.sessionKey) clearBootstrapSnapshot(params.sessionKey);
			targetSessionEntry.updatedAt = now;
			targetSessionEntry.lastInteractionAt = now;
			if (params.sessionStore && params.sessionKey) params.sessionStore[params.sessionKey] = targetSessionEntry;
			if (params.storePath && params.sessionKey) await updateSessionEntry({
				storePath: params.storePath,
				sessionKey: params.sessionKey
			}, async (entry) => {
				const next = { ...entry };
				clearAllCliSessions(next);
				return {
					cliSessionBindings: next.cliSessionBindings,
					cliSessionIds: next.cliSessionIds,
					claudeCliSessionId: next.claudeCliSessionId,
					updatedAt: now,
					lastInteractionAt: now
				};
			}, { consumePendingReset: true });
		}
		await emitResetCommandHooks({
			action: "reset",
			agentId: params.agentId,
			ctx: params.ctx,
			cfg: params.cfg,
			command: params.command,
			sessionKey: params.sessionKey,
			storePath: params.storePath,
			sessionEntry: targetSessionEntry,
			previousSessionEntry,
			previousSessionMemory: params.previousSessionMemory,
			previousSessionResetMessages: params.previousSessionResetMessages,
			onObservedReplyDelivery: params.opts?.onObservedReplyDelivery,
			workspaceDir: params.workspaceDir
		});
		params.command.softResetTriggered = true;
		params.command.softResetTail = softReset.tail;
		return null;
	}
	const commandAction = resetMatch[1]?.toLowerCase() === "reset" ? "reset" : "new";
	const resetTail = params.command.commandBodyNormalized.slice(resetMatch[0].length).trimStart();
	const boundAcpSessionKey = await resolveBoundAcpThreadSessionKey(params, commandTargetSessionKey);
	params.opts?.abortSignal?.throwIfAborted();
	const boundAcpKey = boundAcpSessionKey && isAcpSessionKey(boundAcpSessionKey) ? boundAcpSessionKey.trim() : void 0;
	if (boundAcpKey) {
		const resetResult = await resetConfiguredBindingTargetInPlace({
			cfg: params.cfg,
			sessionKey: boundAcpKey,
			reason: commandAction,
			commandSource: `${params.command.surface}:${params.ctx.CommandSource ?? "text"}`
		});
		if (!resetResult.ok) logVerbose(`acp reset failed for ${boundAcpKey}: ${resetResult.error ?? "unknown error"}`);
		if (resetResult.ok) {
			if (resetResult.sessionId) params.opts?.onSessionPrepared?.({
				sessionKey: resetResult.sessionKey ?? boundAcpKey,
				sessionId: resetResult.sessionId,
				storePath: resetResult.storePath
			});
			params.command.resetHookTriggered = true;
			if (resetTail) {
				applyAcpResetTailContext(params.ctx, resetTail);
				if (params.rootCtx && params.rootCtx !== params.ctx) applyAcpResetTailContext(params.rootCtx, resetTail);
				return { shouldContinue: false };
			}
			return {
				shouldContinue: false,
				reply: {
					text: "✅ ACP session reset in place.",
					isStatusNotice: true
				}
			};
		}
		return {
			shouldContinue: false,
			reply: {
				text: "⚠️ ACP session reset failed. Check /acp status and try again.",
				isStatusNotice: true
			}
		};
	}
	const targetSessionEntry = params.sessionStore?.[params.sessionKey] ?? params.sessionEntry;
	const hookResult = await emitResetCommandHooks({
		action: commandAction,
		agentId: params.agentId,
		ctx: params.ctx,
		cfg: params.cfg,
		command: params.command,
		sessionKey: params.sessionKey,
		storePath: params.storePath,
		sessionEntry: targetSessionEntry,
		previousSessionEntry: params.previousSessionEntry,
		previousSessionMemory: params.previousSessionMemory,
		previousSessionResetMessages: params.previousSessionResetMessages,
		onObservedReplyDelivery: params.opts?.onObservedReplyDelivery,
		workspaceDir: params.workspaceDir
	});
	if (!resetTail) return {
		shouldContinue: false,
		...hookResult.routedReply ? {} : { reply: {
			text: commandAction === "reset" ? "✅ Session reset." : "✅ New session started.",
			isStatusNotice: true
		} }
	};
	return null;
}
//#endregion
//#region src/auto-reply/reply/commands-core.ts
const commandHandlersRuntimeLoader = createLazyImportLoader(() => import("./commands-handlers.runtime.js"));
let HANDLERS = null;
function normalizeCommandHandlerResult(result) {
	if (!result.reply) return result;
	return {
		...result,
		reply: copyReplyPayloadMetadata(result.reply, {
			...result.reply,
			replyToId: void 0,
			replyToCurrent: false
		})
	};
}
async function handleCommands(params) {
	if (params.ctx.CommandInterpretationSuppressed === true) return { shouldContinue: true };
	const allowCreateSessionEntry = params.allowCreateSessionEntry === true;
	const initialSessionEntry = params.initialSessionEntry ?? (allowCreateSessionEntry ? void 0 : params.sessionEntry ? { ...params.sessionEntry } : void 0);
	const agentId = resolveSessionAgentId({
		sessionKey: params.sessionKey,
		config: params.cfg,
		fallbackAgentId: params.agentId
	});
	const { resolveModelLevels, ...dispatchParams } = params;
	const commandParams = {
		...dispatchParams,
		agentId,
		agentDir: agentId === params.agentId ? params.agentDir : resolveAgentDir(params.cfg, agentId),
		initialSessionEntry,
		allowCreateSessionEntry
	};
	const resetResult = await maybeHandleResetCommand(commandParams);
	if (resetResult) return normalizeCommandHandlerResult(resetResult);
	const handlerParams = {
		...commandParams,
		...await resolveModelLevels()
	};
	if (HANDLERS === null) HANDLERS = (await commandHandlersRuntimeLoader.load()).loadCommandHandlers();
	const allowTextCommands = shouldHandleTextCommands({
		cfg: params.cfg,
		surface: params.command.surface,
		commandSource: params.ctx.CommandSource
	});
	for (const handler of HANDLERS) {
		const result = await handler(handlerParams, allowTextCommands);
		if (result) return normalizeCommandHandlerResult(result);
	}
	return { shouldContinue: true };
}
//#endregion
export { buildStatusReply, handleCommands };
