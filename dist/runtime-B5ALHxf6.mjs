import { t as createPluginRuntimeStore } from "./runtime-store-D069N8IS.mjs";
//#region extensions/telegram/src/runtime.ts
const { setRuntime: setTelegramRuntime, getRuntime: getTelegramRuntime, tryGetRuntime: getOptionalTelegramRuntime } = createPluginRuntimeStore({
	pluginId: "telegram",
	errorMessage: "Telegram runtime not initialized"
});
//#endregion
export { getTelegramRuntime as n, setTelegramRuntime as r, getOptionalTelegramRuntime as t };
