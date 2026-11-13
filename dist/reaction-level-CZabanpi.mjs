import { g as resolveReactionLevel } from "./status-helpers-55wz2TGj.mjs";
import { r as inspectTelegramAccount } from "./account-inspect-BS5mY2sn.mjs";
//#region extensions/telegram/src/reaction-level.ts
/**
* Resolve the effective reaction level and its implications.
*/
function resolveTelegramReactionLevel(params) {
	const account = inspectTelegramAccount({
		cfg: params.cfg,
		accountId: params.accountId
	});
	return resolveReactionLevel({
		value: account.config.reactionLevel,
		defaultLevel: "minimal",
		invalidFallback: "ack"
	});
}
//#endregion
export { resolveTelegramReactionLevel as t };
