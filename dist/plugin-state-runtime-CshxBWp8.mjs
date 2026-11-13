import "./sqlite-wal-fdekKFS3.mjs";
import "./sqlite-strict-UBtwgAMG.mjs";
//#region src/plugin-sdk/plugin-state-runtime.ts
function createPluginStateErrorReporter(getRuntime, plugin, feature, message, formatError = (error) => ({ error: String(error) })) {
	return (error) => {
		try {
			getRuntime()?.logging.getChildLogger({
				plugin,
				feature
			}).warn(message, formatError(error));
		} catch {}
	};
}
//#endregion
export { createPluginStateErrorReporter as t };
