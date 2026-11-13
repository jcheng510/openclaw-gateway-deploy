import { r as resolveStateDir } from "./state-dir-CfAW6S2K.mjs";
import { n as createSqliteWorkerOperationAdmission } from "./sqlite-worker-operation-admission-BB758RIN.mjs";
import { r as cloneEnvWithPlatformSemantics } from "./config-env-vars-C__rW8Th.mjs";
import { c as resolveOpenClawAgentSqlitePath } from "./openclaw-agent-db.paths-Dv3PPTNK.mjs";
import { n as sessionChanges } from "./session-row-changes-DFigA589.mjs";
import { o as prepareOpenClawAgentDatabaseRegistrySnapshotRead } from "./openclaw-agent-db-registry-listing-DKcT5BJS.mjs";
import { n as runOpenClawAgentWorkerWrite } from "./openclaw-agent-write-admission-CDwQO6YZ.mjs";
import { t as captureOpenClawAgentDatabaseExecution } from "./openclaw-agent-execution-C4GB-NRD.mjs";
import { t as assertSessionStoreReadCandidate } from "./session-store-read-candidates-YT_i67iQ.mjs";
import { _ as toDatabaseOptions, l as resolveSqliteScope } from "./session-accessor.sqlite-scope-AxUEwRt8.mjs";
import { t as captureSessionStoreReadCandidates } from "./session-store-target-inventory-DQQNzqyR.mjs";
import { m as withSessionHistoryWorkerReadCandidates } from "./session-transcript-worker-resources-DLvHY0vJ.mjs";
import { o as withSessionHistoryWorkerDatabase } from "./session-transcript-worker-runtime-BNJMKJjz.mjs";
//#region src/config/sessions/provider-review-store.ts
async function withProviderReviewDatabase(target, assertCallerCurrent, operation) {
	assertCallerCurrent();
	const env = cloneEnvWithPlatformSemantics(target.env ?? process.env);
	env.OPENCLAW_STATE_DIR = resolveStateDir(env);
	const logical = resolveSqliteScope({
		...target,
		storePath: void 0,
		env
	});
	const storePath = logical.path ?? target.storePath ?? resolveOpenClawAgentSqlitePath(toDatabaseOptions(logical));
	const candidates = captureSessionStoreReadCandidates(storePath);
	const registryRead = prepareOpenClawAgentDatabaseRegistrySnapshotRead({ env });
	return withSessionHistoryWorkerReadCandidates(candidates, async (discovery) => {
		const request = {
			agentId: logical.agentId,
			storePath,
			env
		};
		let selected = await discovery.readStoreTarget({
			...request,
			registeredDatabases: { status: "deferred" }
		});
		let assertRegistryCurrent;
		if (selected.kind === "session-target-registry-required") {
			const registry = await registryRead.read();
			assertRegistryCurrent = registry.assertCurrent;
			registry.assertCurrent();
			discovery.assertCurrent();
			assertCallerCurrent();
			selected = await discovery.readStoreTarget({
				...request,
				registeredDatabases: registry.result.status === "available" ? registry.result.entries : { status: "unavailable" }
			});
		}
		if (selected.kind !== "session-store-target") throw new Error("Provider review store could not resolve its database owner");
		assertRegistryCurrent?.();
		const sourcePath = selected.sourcePath;
		const assertCurrent = () => {
			discovery.assertCurrent();
			assertSessionStoreReadCandidate(sourcePath, candidates);
			assertCallerCurrent();
		};
		assertCurrent();
		return operation({
			...selected.database,
			env
		}, logical.sessionKey, assertCurrent);
	});
}
async function readSessionProviderReview(target, assertCurrent) {
	assertCurrent();
	const { sessionId, lifecycleRevision } = target;
	return withProviderReviewDatabase(target, assertCurrent, async (options, sessionKey, assertHeld) => {
		const result = await withSessionHistoryWorkerDatabase(options, (owner) => owner.readExactEntries({
			sessionKeys: [sessionKey],
			env: options.env ?? {}
		}));
		assertHeld();
		const entry = result.entries.find((row) => row.sessionKey === sessionKey)?.entry;
		return entry?.sessionId === sessionId && entry.lifecycleRevision === lifecycleRevision ? entry : void 0;
	});
}
/** A review clear can consume only the exact refusal the human acknowledged. */
async function compareSessionProviderReview(target, params) {
	params.assertCurrent();
	const capturedTarget = { ...target };
	const input = structuredClone({
		sessionKey: target.sessionKey,
		sessionId: target.sessionId,
		lifecycleRevision: target.lifecycleRevision,
		expectedReview: params.expectedReview,
		nextReview: params.nextReview
	});
	return withProviderReviewDatabase(capturedTarget, params.assertCurrent, async (options, sessionKey, assertHeld) => {
		input.sessionKey = sessionKey;
		const execution = captureOpenClawAgentDatabaseExecution(options);
		const assertCurrent = () => {
			execution.assertCurrent();
			assertHeld();
		};
		try {
			const entry = await runOpenClawAgentWorkerWrite(options, () => execution.runExisting({
				assertCurrent,
				createAdmission(binding) {
					return () => ({
						nativeLocations: binding.nativeLocations,
						admission: createSqliteWorkerOperationAdmission((request, grant) => {
							binding.authorize(request);
							assertCurrent();
							if (!grant()) throw new Error("Provider review authority expired");
						}, binding.attachment)
					});
				}
			}, (worker) => worker.execute({
				type: "session.providerReview.compare",
				input
			})));
			if (!entry) throw new Error("Session disappeared before provider review update");
			sessionChanges.emit({
				agentId: capturedTarget.agentId,
				storePath: execution.path,
				sessionKey
			});
			return entry;
		} finally {
			await execution.release();
		}
	});
}
//#endregion
export { compareSessionProviderReview, readSessionProviderReview };
