import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { t as createSubsystemLogger } from "./subsystem-CeqVSEVi.mjs";
import "./error-runtime-CKQUxkum.mjs";
import "./runtime-env-Bh9hwd9E.mjs";
//#region extensions/telegram/src/api-logging.ts
const fallbackLogger = createSubsystemLogger("telegram/api");
async function withTelegramApiErrorLogging({ operation, fn, runtime, logger, shouldLog }) {
	try {
		return await fn();
	} catch (err) {
		if (!shouldLog || shouldLog(err)) {
			const errText = formatErrorMessage(err);
			(logger ?? runtime?.error ?? ((message) => fallbackLogger.error(message)))(`telegram ${operation} failed: ${errText}`);
		}
		throw err;
	}
}
//#endregion
export { withTelegramApiErrorLogging as t };
