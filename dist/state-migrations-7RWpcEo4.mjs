import { i as extractErrorCode } from "./error-coercion-1P2One0X.mjs";
import { i as listAgentIds } from "./agent-roster-B45JERT5.mjs";
import { l as resolveSessionStorePathCore } from "./paths-CQ3zRaeb.mjs";
import "./error-runtime-CKQUxkum.mjs";
import "./agent-scope-runtime-BIhssPWI.mjs";
import { n as listTelegramAccountIds } from "./account-selection-Cj6XfcsG.mjs";
import "./session-store-paths-DbuHNXL7.mjs";
import "./runtime-doctor-migrations-CQb3xZx6.mjs";
import { t as archiveLegacyStateSource } from "./doctor-state-migration-fs-CfVap4xL.mjs";
import path from "node:path";
import fs from "node:fs/promises";
//#region extensions/telegram/src/state-migrations.ts
const EMPTY_THREAD_BINDINGS_PATTERNS = [/^\s*\{\s*"version"\s*:\s*1\s*,\s*"bindings"\s*:\s*\[\s*\]\s*\}\s*$/, /^\s*\{\s*"bindings"\s*:\s*\[\s*\]\s*,\s*"version"\s*:\s*1\s*\}\s*$/];
function retiredStateWarning(source) {
	return `${/^thread-bindings-.+\.json$/.test(path.basename(source)) ? "Telegram thread bindings" : "Telegram state"} may contain unmigrated data. Run openclaw doctor --fix on 2026.9.5 with a pre-update backup. Preserved retired Telegram JSON state at ${source}. See https://docs.openclaw.ai/install/updating#upgrading-very-old-versions`;
}
async function isVerifiedEmptyThreadBindingsSource(source) {
	try {
		if (!(await fs.lstat(source)).isFile()) return false;
		const raw = await fs.readFile(source, "utf8");
		JSON.parse(raw);
		return EMPTY_THREAD_BINDINGS_PATTERNS.some((pattern) => pattern.test(raw));
	} catch {
		return false;
	}
}
async function collectRetiredStateSources(params) {
	const telegramDir = path.join(params.stateDir, "telegram");
	const sources = [];
	try {
		for (const entry of await fs.readdir(telegramDir, { withFileTypes: true })) if ((entry.isFile() || entry.isSymbolicLink()) && /^(?:bot-info-.+|sticker-cache|thread-bindings-.+|update-offset-.+)\.json$/.test(entry.name)) sources.push(path.join(telegramDir, entry.name));
	} catch (error) {
		if (extractErrorCode(error) !== "ENOENT") throw error;
	}
	const agentIds = /* @__PURE__ */ new Set([
		...listAgentIds(params.config),
		...listTelegramAccountIds(params.config),
		"main"
	]);
	const storePaths = /* @__PURE__ */ new Set([path.join(params.stateDir, "sessions", "sessions.json"), ...[...agentIds].map((agentId) => resolveSessionStorePathCore(params.config.session?.store, {
		env: params.env,
		agentId
	}))]);
	for (const storePath of storePaths) for (const suffix of [
		"telegram-messages",
		"telegram-sent-messages",
		"telegram-topic-names"
	]) {
		const sourcePath = `${storePath}.${suffix}.json`;
		try {
			const entry = await fs.lstat(sourcePath);
			if (entry.isFile() || entry.isSymbolicLink()) sources.push(sourcePath);
		} catch (error) {
			if (extractErrorCode(error) !== "ENOENT") throw error;
		}
	}
	return sources;
}
const telegramRetiredStateMigration = {
	id: "telegram-legacy-state",
	label: "Retired Telegram JSON state",
	async detectLegacyState(params) {
		const preview = (await collectRetiredStateSources(params)).map(retiredStateWarning);
		return preview.length > 0 ? { preview } : null;
	},
	async migrateLegacyState(params) {
		const changes = [];
		const warnings = [];
		const archiveWarnings = [];
		for (const source of await collectRetiredStateSources(params)) if (/^thread-bindings-.+\.json$/.test(path.basename(source)) && await isVerifiedEmptyThreadBindingsSource(source)) await archiveLegacyStateSource({
			filePath: source,
			label: "empty Telegram thread bindings",
			changes,
			warnings: archiveWarnings
		});
		else warnings.push(retiredStateWarning(source));
		return {
			changes,
			warnings: [...warnings, ...archiveWarnings],
			...warnings.length === 0 && archiveWarnings.length > 0 ? { warningDisposition: "recoverable" } : {}
		};
	}
};
//#endregion
export { telegramRetiredStateMigration };
