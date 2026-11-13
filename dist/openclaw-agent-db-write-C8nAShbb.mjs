import { r as resolveStateDir } from "./state-dir-CfAW6S2K.mjs";
import { t as assertExistingDatabaseIdentity } from "./sqlite-worker-identity-Dggu-rKK.mjs";
import { t as isPromiseLike } from "./promise-like-D7-l5Fsp.mjs";
import { i as readOpenClawAgentDatabaseIdentity } from "./openclaw-agent-db-identity-ChZ28OhF.mjs";
import { r as cloneEnvWithPlatformSemantics } from "./config-env-vars-C__rW8Th.mjs";
import { c as resolveOpenClawAgentSqlitePath } from "./openclaw-agent-db.paths-Dv3PPTNK.mjs";
import { y as retainAgentDatabase } from "./openclaw-agent-db-lifecycle-CCXA1nI8.mjs";
import { o as getOpenClawAgentDatabaseIfOpen, p as withOpenClawAgentDatabaseAsync } from "./openclaw-agent-db-CZUYuo7P.mjs";
import { r as runOpenClawAgentWriteAdmission } from "./openclaw-agent-write-admission-CDwQO6YZ.mjs";
//#region src/state/openclaw-agent-db-write.ts
/** Admit a synchronous mutation without blocking a reclamation worker's parent callback. */
function withOpenClawAgentDatabaseWrite(inputOptions, operation, expectedDatabase) {
	const options = {
		...inputOptions,
		env: cloneEnvWithPlatformSemantics(inputOptions.env ?? process.env)
	};
	options.env.OPENCLAW_STATE_DIR = resolveStateDir(options.env);
	const pathname = resolveOpenClawAgentSqlitePath(options);
	options.path = pathname;
	const run = async (database) => {
		const { identity, birthtime } = readOpenClawAgentDatabaseIdentity(database);
		if (typeof identity === "string") assertExistingDatabaseIdentity(pathname, `file:${identity}`, birthtime);
		const result = operation(database);
		if (isPromiseLike(result)) {
			await result;
			throw new Error("Agent database write callbacks must remain synchronous");
		}
		return result;
	};
	return runOpenClawAgentWriteAdmission(options, async (_identity, assertCurrent) => {
		if (!expectedDatabase) return await withOpenClawAgentDatabaseAsync(options, run, assertCurrent);
		const database = getOpenClawAgentDatabaseIfOpen(options);
		if (!database || database.db !== expectedDatabase || !expectedDatabase.isOpen) throw new Error("Borrowed agent database closed or changed before write admission");
		const release = retainAgentDatabase(expectedDatabase);
		try {
			return await run(database);
		} finally {
			release();
		}
	}, true);
}
//#endregion
export { withOpenClawAgentDatabaseWrite as t };
