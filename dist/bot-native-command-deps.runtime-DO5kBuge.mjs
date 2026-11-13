import { r as getRuntimeConfig } from "./io.runtime-BOdk1dW9.mjs";
import { s as readChannelAllowFromStore } from "./pairing-store-Bvqa0taN.mjs";
import "./runtime-config-snapshot-DPPwvFCZ.mjs";
import "./conversation-runtime-BTiRmJeW.mjs";
import { t as listSkillCommandsForAgents } from "./chat-commands-DBAiju2K.mjs";
import "./skill-commands-runtime-C2z1H4Wg.mjs";
import { t as loadTelegramSendModule } from "./send-runtime-DgCLXElZ.mjs";
import { r as syncTelegramMenuCommands } from "./bot-native-command-menu-DTJCMHXS.mjs";
//#region extensions/telegram/src/bot-native-command-deps.runtime.ts
const defaultTelegramNativeCommandDeps = {
	get getRuntimeConfig() {
		return getRuntimeConfig;
	},
	get readChannelAllowFromStore() {
		return readChannelAllowFromStore;
	},
	get listSkillCommandsForAgents() {
		return listSkillCommandsForAgents;
	},
	get syncTelegramMenuCommands() {
		return syncTelegramMenuCommands;
	},
	async runModelsAuthLoginFlow(opts) {
		const { runModelsAuthLoginFlow } = await import("./plugin-sdk/provider-auth-login-flow-runtime.js");
		return await runModelsAuthLoginFlow(opts);
	},
	async editMessageTelegram(...args) {
		const { editMessageTelegram } = await loadTelegramSendModule();
		return await editMessageTelegram(...args);
	},
	async sendMessageTelegram(...args) {
		const { sendMessageTelegram } = await loadTelegramSendModule();
		return await sendMessageTelegram(...args);
	}
};
//#endregion
export { defaultTelegramNativeCommandDeps as t };
