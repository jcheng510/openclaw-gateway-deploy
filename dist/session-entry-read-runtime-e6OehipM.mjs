import { r as resolveStateDir } from "./state-dir-CfAW6S2K.mjs";
import { a as readDatabasePathIdentitySync } from "./sqlite-worker-identity-Dggu-rKK.mjs";
import { t as isPromiseLike } from "./promise-like-D7-l5Fsp.mjs";
import { n as ok, t as err } from "./result-BQGgYouL.mjs";
import { n as normalizeAgentId } from "./agent-id-D1-Q6vR4.mjs";
import { n as createSqliteWorkerOperationAdmission } from "./sqlite-worker-operation-admission-BB758RIN.mjs";
import { r as cloneEnvWithPlatformSemantics } from "./config-env-vars-C__rW8Th.mjs";
import { r as isIncognitoSessionKey } from "./session-key-DDIJxXfQ.mjs";
import { A as parseAgentSessionKey } from "./session-key-BC4m_Ly5.mjs";
import { c as resolveOpenClawAgentSqlitePath, i as isIncognitoOpenClawAgentSqlitePath } from "./openclaw-agent-db.paths-Dv3PPTNK.mjs";
import { w as resolveUnsuffixedSqliteTargetFromSessionStorePath } from "./openclaw-state-db-DM-mSY0m.mjs";
import { n as assertAgentDatabaseAdmitted } from "./agent-database-admission-CLYAvaL3.mjs";
import { m as listOpenIncognitoAgentDatabases } from "./openclaw-agent-db-lifecycle-CCXA1nI8.mjs";
import { u as retainOpenClawAgentDatabaseReadCandidates } from "./openclaw-agent-db-CZUYuo7P.mjs";
import { n as runOpenClawAgentWorkerWrite } from "./openclaw-agent-write-admission-CDwQO6YZ.mjs";
import { t as captureOpenClawAgentDatabaseExecution } from "./openclaw-agent-execution-C4GB-NRD.mjs";
import { n as captureSessionStoreReadCandidate, t as assertSessionStoreReadCandidate } from "./session-store-read-candidates-YT_i67iQ.mjs";
import { s as resolveSqliteAgentId, u as resolveSqliteSessionKey } from "./session-accessor.sqlite-scope-AxUEwRt8.mjs";
import { s as captureCanonicalSessionReaderContinuation } from "./session-canonical-key-Cjd4Pn_g.mjs";
import { w as loadSessionEntryReadOnlyResultInScope } from "./session-accessor.sqlite-pending-inputs-BdT_Tg9N.mjs";
import { r as resolveSessionTranscriptReadFence } from "./session-transcript-read-fence-Bq0b1oaG.mjs";
import { S as withSessionStoreTarget, s as loadSessionEntry } from "./session-accessor.sqlite-entry-C87Sde4p.mjs";
import { t as captureSessionStoreReadCandidates } from "./session-store-target-inventory-DQQNzqyR.mjs";
import { c as maintenanceLane } from "./session-transcript-worker-resources-DLvHY0vJ.mjs";
import { o as withSessionHistoryWorkerDatabase } from "./session-transcript-worker-runtime-BNJMKJjz.mjs";
import path from "node:path";
//#region src/config/sessions/session-entry-read-runtime.ts
function captureSessionEntryReadScope(input) {
	const env = cloneEnvWithPlatformSemantics(input.env ?? process.env);
	env.OPENCLAW_STATE_DIR = resolveStateDir(env);
	const scope = {
		...input,
		env,
		...input.storePath ? { storePath: path.resolve(input.storePath) } : {}
	};
	return {
		scope,
		env,
		agentId: scope.agentId ? normalizeAgentId(scope.agentId) : parseAgentSessionKey(scope.sessionKey)?.agentId
	};
}
function isNativeSessionEntryRead(scope, agentId) {
	const storePath = scope.storePath;
	return Boolean(isIncognitoSessionKey(scope.sessionKey) || storePath && (isIncognitoOpenClawAgentSqlitePath(storePath, {
		agentId: agentId ?? scope.defaultAgentId ?? "main",
		env: scope.env
	}) || listOpenIncognitoAgentDatabases().some((owner) => owner.storePath === storePath)));
}
/** Retain the original logical source through its asynchronous consumer and owned effects. */
async function withSessionEntryReadOnlyInWorker(input, assertCallerCurrent, consume) {
	const { scope, agentId } = captureSessionEntryReadScope(input);
	assertCallerCurrent();
	if (isNativeSessionEntryRead(scope, agentId)) {
		const read = loadSessionEntryReadOnlyResultInScope(scope);
		assertCallerCurrent();
		const result = await consume(read, {
			kind: "native",
			assertCurrent: assertCallerCurrent
		});
		assertCallerCurrent();
		return result;
	}
	return await withSessionEntryReadOnlyWorkerSource(scope, assertCallerCurrent, async (source) => {
		if (!source.ok) return await consume(source, {
			kind: "unresolved",
			assertCurrent: assertCallerCurrent
		});
		const owner = source.value;
		const read = await owner.reader.readEntryResult({
			scope: owner.scope,
			continuation: owner.continuation
		});
		owner.assertCurrent();
		return await consume(read, owner);
	});
}
/** Diagnostic identities name the default agent store, not a logical store locator. */
async function withSessionDiagnosticTextInWorker(input, assertCurrent, consume) {
	const { scope, env } = captureSessionEntryReadScope(input);
	const agentId = normalizeAgentId(input.agentId);
	assertCurrent();
	if (isIncognitoSessionKey(scope.sessionKey)) {
		consume(void 0);
		return;
	}
	const storePath = resolveOpenClawAgentSqlitePath({
		agentId,
		env
	});
	const admission = resolveSessionTranscriptReadFence(input);
	await withSessionHistoryWorkerDatabase({
		agentId,
		path: storePath,
		env
	}, async (owner) => {
		assertCurrent();
		const text = await owner.readDiagnosticText({
			scope: {
				...scope,
				agentId,
				databaseAgentId: agentId,
				storePath,
				sessionId: input.sessionId
			},
			admission
		});
		owner.assertCurrent();
		assertCurrent();
		consume(text);
	}, maintenanceLane);
}
/** Shared finite readers retain one captured file source through a data-only operation. */
async function withSessionEntryReadOnlyWorkerSource(input, assertCallerCurrent, consume) {
	const { scope, env, agentId } = captureSessionEntryReadScope(input);
	assertCallerCurrent();
	const consumeRead = async (read) => {
		assertCallerCurrent();
		const value = await consume(read);
		assertCallerCurrent();
		return value;
	};
	let storePath = scope.storePath;
	if (!storePath) {
		if (!agentId) return await consumeRead(err(/* @__PURE__ */ new Error("Cannot resolve SQLite session scope without an agent id")));
		storePath = resolveOpenClawAgentSqlitePath({
			agentId,
			env
		});
	}
	let candidates;
	try {
		candidates = captureSessionStoreReadCandidates(storePath);
	} catch (error) {
		return await consumeRead(err(error));
	}
	const native = retainOpenClawAgentDatabaseReadCandidates(candidates.flatMap((candidate) => [candidate, {
		...candidate,
		path: candidate.physicalPath
	}]), env);
	const continuations = [];
	let active = true;
	const assertSourcesCurrent = () => {
		if (!active) throw new Error("Session entry read source is no longer active");
		assertCallerCurrent();
		for (const candidate of candidates) if (captureSessionStoreReadCandidate(candidate.path, candidate.scope).physicalPath !== candidate.physicalPath) throw new Error("Session store alias changed during discovery; retry the read.");
		for (const { owner } of continuations) owner.assertCurrent();
	};
	let assertReadCurrent = assertSourcesCurrent;
	try {
		for (const database of native.databases) {
			const owner = captureCanonicalSessionReaderContinuation(database);
			if (owner) continuations.push({
				path: captureSessionStoreReadCandidate(database.path).physicalPath,
				owner
			});
		}
		const value = await withSessionStoreTarget({
			agentId,
			defaultAgentId: scope.defaultAgentId,
			storePath,
			env: { ...env },
			candidates
		}, async (target, route) => {
			const database = target.database;
			return await withSessionHistoryWorkerDatabase({
				...database,
				env
			}, async (owner) => {
				assertReadCurrent = () => {
					assertSourcesCurrent();
					route.assertCurrent();
					owner.assertCurrent();
				};
				assertReadCurrent();
				const result = await consumeRead(ok({
					kind: "file",
					scope: {
						...scope,
						agentId: target.logicalAgentId,
						databaseAgentId: database.agentId,
						storePath: database.path,
						env: { ...env }
					},
					reader: owner,
					assertCurrent: assertReadCurrent,
					onRegistryChange: route.onRegistryChange,
					refreshBeforeDispatch: route.refreshBeforeDispatch,
					revalidateTarget: route.revalidateTarget,
					continuation: continuations.find((item) => item.path === database.path && item.owner.receipt.agentId === database.agentId)?.owner.receipt
				}));
				assertReadCurrent();
				return result;
			});
		}, assertSourcesCurrent, async (error, assertDiscoveryCurrent) => {
			assertReadCurrent = () => {
				assertSourcesCurrent();
				assertDiscoveryCurrent();
			};
			assertReadCurrent();
			const result = await consumeRead(err(error));
			assertReadCurrent();
			return result;
		});
		assertReadCurrent();
		return value;
	} finally {
		active = false;
		for (const { owner } of continuations.toReversed()) owner.release();
		native.release();
	}
}
/** Preserve logical lookup and writable open semantics on the canonical file-backed actor. */
async function readSessionEntryInWorker(input, assertCallerCurrent) {
	const env = cloneEnvWithPlatformSemantics(input.env ?? process.env);
	env.OPENCLAW_STATE_DIR = resolveStateDir(env);
	const scope = {
		...input,
		env
	};
	assertCallerCurrent();
	const agentId = scope.agentId ? normalizeAgentId(scope.agentId) : parseAgentSessionKey(scope.sessionKey)?.agentId;
	let storePath = scope.storePath ? path.resolve(scope.storePath) : void 0;
	if (isNativeSessionEntryRead(scope, agentId)) return loadSessionEntry(scope);
	if (!storePath) {
		if (!agentId) throw new Error("Cannot resolve SQLite session scope without an agent id");
		storePath = resolveOpenClawAgentSqlitePath({
			agentId,
			env
		});
	}
	const candidates = captureSessionStoreReadCandidates(storePath);
	const loadedRead = await withSessionStoreTarget({
		agentId,
		defaultAgentId: scope.defaultAgentId,
		storePath,
		env,
		candidates
	}, async (target, owner) => {
		const sessionKey = resolveSqliteSessionKey(scope.sessionKey, target.logicalAgentId);
		const options = {
			...target.database,
			env
		};
		const targetIdentity = readDatabasePathIdentitySync(options.path);
		const execution = captureOpenClawAgentDatabaseExecution(options, targetIdentity.key.startsWith("file:") ? { expectedIdentity: {
			kind: "file",
			physicalIdentity: targetIdentity.key.slice(5),
			nativeLocation: targetIdentity.canonicalPath,
			birthtime: targetIdentity.birthtime
		} } : { expectedCreationIdentity: targetIdentity });
		const assertRetainedTarget = () => {
			execution.assertCurrent();
			const currentIdentity = readDatabasePathIdentitySync(options.path);
			if (currentIdentity.key !== targetIdentity.key || currentIdentity.canonicalPath !== targetIdentity.canonicalPath) throw new Error("Session database identity changed while awaiting admission");
		};
		const assertCurrent = () => {
			execution.assertCurrent();
			owner.assertCurrent();
		};
		const source = {
			assertCurrent,
			onRegistryChange: owner.onRegistryChange,
			createAdmission(binding) {
				return () => ({
					nativeLocations: binding.nativeLocations,
					admission: createSqliteWorkerOperationAdmission((request, grant) => {
						binding.authorize(request);
						assertCurrent();
						if (!grant()) throw new Error("Session read authority expired");
					}, binding.attachment)
				});
			}
		};
		let entry;
		try {
			entry = await runOpenClawAgentWorkerWrite(options, async () => {
				await owner.refreshBeforeDispatch(assertRetainedTarget);
				assertRetainedTarget();
				await execution.prepare(source);
				return execution.runExisting(source, (worker) => worker.execute({
					type: "session.entry.read",
					input: { sessionKey }
				}));
			});
			await owner.revalidateTarget();
			assertCurrent();
		} finally {
			await execution.release();
		}
		owner.assertCurrent();
		return {
			entry,
			assertCurrent: owner.assertCurrent
		};
	}, assertCallerCurrent);
	loadedRead.assertCurrent();
	return loadedRead.entry;
}
/** Keep every discovered database and original admission alive through one synchronous consumer. */
async function withSessionEntriesFromStoresInWorker(inputs, consume) {
	const reads = [];
	const enter = (index) => {
		const input = inputs[index];
		if (input) return withSessionEntriesFromStoreInWorker(input, async (read) => {
			reads.push(read);
			try {
				return await enter(index + 1);
			} finally {
				reads.pop();
			}
		});
		for (const read of reads) read.assertCurrent();
		let active = true;
		try {
			const result = consume(reads.map((read) => ({
				result: read.result,
				database: read.database,
				assertCurrent: () => {
					if (!active) throw new Error("Session entry read consumer is no longer active");
					read.assertCurrent();
				}
			})));
			if (isPromiseLike(result)) {
				Promise.resolve(result).catch(() => {});
				throw new Error("Session entry read consumers must remain synchronous");
			}
			return Promise.resolve(result);
		} finally {
			active = false;
		}
	};
	return enter(0);
}
/** The ordinary return API returns data, never a retained authority claim. */
function readSessionEntriesFromStoreInWorker(input, prepareSource) {
	return withSessionEntriesFromStoreInWorker(input, async (read) => read.result, true, prepareSource);
}
async function withSessionEntriesFromStoreInWorker(input, consume, dataOnly = false, prepareSource) {
	const request = {
		...input.selection ? {
			selection: input.selection,
			projection: input.projection
		} : {
			sessionKeys: [...new Set(input.sessionKeys)],
			projection: input.projection
		},
		lifecycleSessionKey: input.lifecycleSessionKey,
		includeMembers: input.includeMembers,
		includeParticipantRecords: input.includeParticipantRecords,
		includeAuthorization: input.includeAuthorization
	};
	return withSessionStoreReaderInWorker(input, async (owner, database, continuation, assertCurrent) => {
		prepareSource?.(database);
		assertCurrent();
		const result = await owner.readExactEntries({
			...request,
			env: database.env,
			continuation
		});
		assertCurrent();
		return consume({
			result,
			database,
			assertCurrent
		});
	}, {
		backing: input.projection === "backing" || input.projection === "list",
		dataOnly
	});
}
/** Keep the physical reader owner through a registry maintenance consumer and its commit guard. */
function withSessionRegistryEntriesInWorker(input, consume) {
	assertAgentDatabaseAdmitted(input.agentId, { env: input.env });
	return withSessionStoreReaderInWorker(input, async (owner, database, _continuation, assertReaderCurrent) => {
		const assertCurrent = () => {
			assertAgentDatabaseAdmitted(input.agentId, { env: database.env });
			assertAgentDatabaseAdmitted(database.agentId, { env: database.env });
			assertReaderCurrent();
		};
		assertCurrent();
		const entries = await owner.readEntries({
			agentId: database.agentId,
			storePath: database.path,
			env: database.env
		});
		assertCurrent();
		return await consume(entries, assertCurrent);
	}, { lane: maintenanceLane });
}
/** Return owned full entries only for expired cron runs; live deletion guards stay on the host. */
async function readExpiredCronRunEntriesInWorker(input) {
	const expiredCronRuns = {
		agentId: normalizeAgentId(input.agentId),
		updatedBefore: input.updatedBefore
	};
	assertAgentDatabaseAdmitted(expiredCronRuns.agentId, { env: input.env });
	return withSessionStoreReaderInWorker(input, async (owner, database, _continuation, assertCurrent) => {
		const assertAdmitted = () => {
			assertAgentDatabaseAdmitted(expiredCronRuns.agentId, { env: database.env });
			assertAgentDatabaseAdmitted(database.agentId, { env: database.env });
		};
		assertAdmitted();
		const entries = await owner.readEntries({
			agentId: database.agentId,
			storePath: database.path,
			env: database.env,
			expiredCronRuns
		});
		assertAdmitted();
		assertCurrent();
		return entries;
	}, {
		lane: maintenanceLane,
		dataOnly: true
	});
}
async function withSessionStoreReaderInWorker(input, read, { backing = false, lane, dataOnly = false } = {}) {
	const env = cloneEnvWithPlatformSemantics(input.env ?? process.env);
	env.OPENCLAW_STATE_DIR = resolveStateDir(env);
	const agentId = normalizeAgentId(input.agentId);
	const storePath = input.storePath;
	const target = resolveUnsuffixedSqliteTargetFromSessionStorePath(storePath);
	const captured = captureSessionStoreReadCandidate(target.path);
	const direct = target.agentId && captured.path === captured.physicalPath;
	const candidates = direct ? [captured] : captureSessionStoreReadCandidates(storePath);
	const native = backing ? retainOpenClawAgentDatabaseReadCandidates(candidates.flatMap((candidate) => [candidate, {
		...candidate,
		path: candidate.physicalPath
	}]), env) : void 0;
	const continuations = [];
	let assertFinalCurrent;
	try {
		for (const database of native?.databases ?? []) {
			const owner = captureCanonicalSessionReaderContinuation(database);
			if (owner) continuations.push({
				path: captureSessionStoreReadCandidate(database.path).physicalPath,
				owner
			});
		}
		const readDatabase = async (database, assertRoute) => {
			const continuation = continuations.find((item) => item.path === database.path)?.owner;
			return withSessionHistoryWorkerDatabase({
				...database,
				env
			}, async (owner) => {
				let active = true;
				const assertCapturedCurrent = () => {
					owner.assertCurrent();
					continuation?.assertCurrent();
					assertRoute();
				};
				if (dataOnly) assertFinalCurrent = assertCapturedCurrent;
				const assertCurrent = () => {
					if (!active) throw new Error("Session entry read consumer is no longer active");
					assertCapturedCurrent();
				};
				try {
					return await read(owner, {
						...database,
						env: { ...env }
					}, continuation?.receipt, assertCurrent);
				} finally {
					active = false;
				}
			}, lane);
		};
		let result;
		if (direct && target.agentId) {
			resolveSqliteAgentId({
				scopedAgentId: agentId,
				storeAgentId: target.agentId
			});
			result = await readDatabase({
				agentId: target.agentId,
				path: captured.physicalPath
			}, () => assertSessionStoreReadCandidate(target.path, [captured]));
		} else result = await withSessionStoreTarget({
			agentId,
			storePath,
			env,
			candidates
		}, async (selected, owner) => await readDatabase(selected.database, owner.assertCurrent), void 0, void 0, { lane });
		assertFinalCurrent?.();
		return result;
	} finally {
		for (const { owner } of continuations.toReversed()) owner.release();
		native?.release();
	}
}
//#endregion
export { withSessionEntriesFromStoreInWorker as a, withSessionRegistryEntriesInWorker as c, withSessionDiagnosticTextInWorker as i, readSessionEntriesFromStoreInWorker as n, withSessionEntriesFromStoresInWorker as o, readSessionEntryInWorker as r, withSessionEntryReadOnlyInWorker as s, readExpiredCronRunEntriesInWorker as t };
