import { r as captureOpenClawStateWorkerContext } from "./openclaw-state-worker-context-C_iAE7YK.mjs";
import { c as resolveOpenClawAgentSqlitePath } from "./openclaw-agent-db.paths-Dv3PPTNK.mjs";
import { r as getRuntimeConfig } from "./io.runtime-BOdk1dW9.mjs";
import "./config-D1R2igem.mjs";
import { _ as toDatabaseOptions, p as resolveSqliteTranscriptReadScope } from "./session-accessor.sqlite-scope-AxUEwRt8.mjs";
import { t as withCurrentProjectionSnapshot } from "./session-accessor.sqlite-active-projection-Bh7j4wOo.mjs";
import { t as createBoundSessionHistorySubagentProjection } from "./session-history-readonly-reader-qbPwlfKY.mjs";
import { t as prepareGatewaySessionStoreReadSources } from "./session-utils-store-sources-CkoYwMAP.mjs";
//#region src/gateway/session-history-subagent-projection.ts
/** Bind source addresses and admission once, before an asynchronous history read. */
function prepareSessionHistorySubagentSources(currentSource, options = {}) {
	const env = options.env ?? process.env;
	const context = captureOpenClawStateWorkerContext({ env });
	const sourceReads = prepareGatewaySessionStoreReadSources({
		cfg: getRuntimeConfig(),
		currentSource,
		env,
		registryPath: context.admission.databasePath,
		deferSources: options.deferSources
	});
	return {
		stateDatabase: {
			path: context.admission.databasePath,
			environment: context.environment
		},
		get sourceDatabases() {
			return sourceReads.sources;
		},
		assertCurrent: () => {
			context.maintenanceScope?.assertAdmission();
			context.admission.assertCurrent();
			sourceReads.assertCurrent();
		}
	};
}
/** Bind host-owned stores and retain their admission for one display operation. */
function createSessionHistorySubagentProjection(scope, options = {}) {
	const databaseOptions = toDatabaseOptions(resolveSqliteTranscriptReadScope(scope));
	const sources = prepareSessionHistorySubagentSources({
		agentId: databaseOptions.agentId,
		path: resolveOpenClawAgentSqlitePath(databaseOptions)
	}, options);
	const bound = createBoundSessionHistorySubagentProjection((read) => withCurrentProjectionSnapshot(scope, read, { readOnly: true }), sources.stateDatabase, () => sources.sourceDatabases);
	const assertCurrent = sources.assertCurrent;
	const readCurrent = (read) => {
		assertCurrent();
		const result = read();
		assertCurrent();
		return result;
	};
	return {
		assertCurrent,
		isSubagentSession: (sessionKey) => readCurrent(() => bound.isSubagentSession(sessionKey)),
		isSubagentRunMessage: (runId, messageSeq) => readCurrent(() => bound.isSubagentRunMessage(runId, messageSeq))
	};
}
//#endregion
export { createSessionHistorySubagentProjection as t };
