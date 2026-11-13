import { n as appendRegularFile } from "../../fs-safe-CHQXnCPk.mjs";
import { r as resolveStateDir } from "../../state-dir-CfAW6S2K.mjs";
import "../../paths-CtO6iw0c.mjs";
import { t as formatErrorMessage } from "../../errors-YPvSaqwO.mjs";
import { t as createSubsystemLogger } from "../../subsystem-CeqVSEVi.mjs";
import path from "node:path";
import fs from "node:fs/promises";
import os from "node:os";
//#region src/hooks/bundled/command-logger/handler.ts
const log = createSubsystemLogger("command-logger");
const logCommand = async (event) => {
	if (event.type !== "command") return;
	try {
		const stateDir = resolveStateDir(process.env, os.homedir);
		const logDir = path.join(stateDir, "logs");
		await fs.mkdir(logDir, { recursive: true });
		const logFile = path.join(logDir, "commands.log");
		const logLine = JSON.stringify({
			timestamp: event.timestamp.toISOString(),
			action: event.action,
			sessionKey: event.sessionKey,
			senderId: event.context.senderId ?? "unknown",
			source: event.context.commandSource ?? "unknown"
		}) + "\n";
		await appendRegularFile({
			filePath: logFile,
			content: logLine,
			rejectSymlinkParents: true
		});
	} catch (err) {
		const message = formatErrorMessage(err);
		log.error(`Failed to log command: ${message}`);
	}
};
//#endregion
export { logCommand as default };
