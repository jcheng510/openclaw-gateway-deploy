import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { n as logError } from "./logger-DmolGPgx.mjs";
import { r as logVerbose } from "./globals-ChjEJkWj.mjs";
import { T as setReplyPayloadMetadata } from "./reply-payload-CZCVcyy_.mjs";
import { c as requireCommandFlagEnabled } from "./command-gates-D1OFbxXh.mjs";
import { i as formatDetailedPluginHealth } from "./status-plugin-health-5LnGI9-6.mjs";
import { t as buildStatusReplyParts } from "./status-text-B0nNertx.mjs";
//#region src/auto-reply/reply/commands-status.ts
/** Builds /status replies using the command's authorized channel context. */
/** Builds a status reply or suppresses unauthorized status requests. */
async function buildStatusReply(params) {
	const { command } = params;
	if (!command.isAuthorizedSender) {
		logVerbose(`Ignoring /status from unauthorized sender: ${command.senderId || "<unknown>"}`);
		return;
	}
	try {
		const { text, presentation } = await buildStatusReplyParts({
			...params,
			statusChannel: command.channel,
			statusAccountId: command.accountId
		});
		return setReplyPayloadMetadata({
			text,
			presentation,
			presentationTextMode: "fallback"
		}, { contextFreeCommand: true });
	} catch (error) {
		logError(`/status render failed: ${formatErrorMessage(error)}`);
		return setReplyPayloadMetadata({ text: "⚠️ Status: error rendering response" }, { contextFreeCommand: true });
	}
}
async function buildStatusPluginsReply(params) {
	const { command } = params;
	if (!command.isAuthorizedSender) {
		logVerbose(`Ignoring /status plugins from unauthorized sender: ${command.senderId || "<unknown>"}`);
		return;
	}
	const disabled = requireCommandFlagEnabled(params.cfg, {
		label: "/status plugins",
		configKey: "plugins"
	});
	if (disabled) return disabled.reply ? setReplyPayloadMetadata(disabled.reply, { contextFreeCommand: true }) : void 0;
	try {
		const { collectInstalledPluginHealthSnapshot } = await import("./status-plugin-health.runtime.js");
		const snapshot = await collectInstalledPluginHealthSnapshot({
			config: params.cfg,
			workspaceDir: params.workspaceDir
		});
		return setReplyPayloadMetadata({ text: formatDetailedPluginHealth(snapshot) }, { contextFreeCommand: true });
	} catch (error) {
		logError(`/status plugins render failed: ${formatErrorMessage(error)}`);
		return setReplyPayloadMetadata({ text: "⚠️ Plugins: health unavailable" }, { contextFreeCommand: true });
	}
}
//#endregion
export { buildStatusReply as n, buildStatusPluginsReply as t };
