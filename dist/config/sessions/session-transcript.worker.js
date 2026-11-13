import { c as isRecord } from "../../record-coerce-TIsquoVR.mjs";
import { s as withSqliteReaderOwner } from "../../sqlite-reader-lifecycle-B0eu7rNH.mjs";
import { r as cloneEnvWithPlatformSemantics } from "../../config-env-vars-C__rW8Th.mjs";
import { t as serveOwnedWorkerTasks } from "../../worker-task-server-Dj9rLvzH.mjs";
import { r as readSessionColdTranscript } from "../../session-cold-storage-state-DkGnIhMN.mjs";
import { a as runWithSessionTranscriptReadFence } from "../../session-transcript-read-fence-Bq0b1oaG.mjs";
import { i as sessionHistoryCleanupError, r as encodeSessionTranscriptWorkerError, t as SessionHistoryDeltaPreparationError } from "../../session-history-worker-errors-BIrOr1iJ.mjs";
//#region src/config/sessions/session-transcript.worker.ts
const MAX_RETAINED_HISTORY_DATABASES = 64;
const historyDatabaseScopes = /* @__PURE__ */ new Map();
async function withHistoryDatabase(database, operationLabel, operation) {
	const key = JSON.stringify(database);
	let retained = historyDatabaseScopes.get(key);
	if (!retained) {
		const { OpenClawAgentDatabaseReadOnlyScope } = await import("../../openclaw-agent-db-readonly-scope-4ZeNPyKA.mjs");
		retained = {
			database,
			scope: new OpenClawAgentDatabaseReadOnlyScope()
		};
	}
	const { scope } = retained;
	try {
		const value = await withSqliteReaderOwner({
			operation: `sessions.${operationLabel}`,
			ownerKind: "worker"
		}, () => scope.run(database, operation));
		historyDatabaseScopes.delete(key);
		if (!scope.hasRetainedConnection) return {
			ok: true,
			value,
			closedHistoryDatabase: database
		};
		historyDatabaseScopes.set(key, retained);
		if (historyDatabaseScopes.size > MAX_RETAINED_HISTORY_DATABASES) {
			const oldest = historyDatabaseScopes.entries().next().value;
			oldest[1].scope.close();
			historyDatabaseScopes.delete(oldest[0]);
			return {
				ok: true,
				value,
				closedHistoryDatabase: oldest[1].database
			};
		}
		return {
			ok: true,
			value
		};
	} catch (error) {
		try {
			scope.close();
		} catch (cleanupError) {
			throw sessionHistoryCleanupError(error, cleanupError, "database close");
		}
		throw error;
	}
}
let closeReadOnlyCandidates;
let releaseReadValidation;
serveOwnedWorkerTasks(async (input, channel, control) => {
	if (!closeReadOnlyCandidates) {
		const closeCandidates = (await import("../../openclaw-agent-db-readonly-scope-4ZeNPyKA.mjs")).closeOpenClawAgentDatabaseReadOnlyCandidates;
		const releaseValidation = (await import("../../openclaw-agent-db-validation-cache-CVXuYVzS.mjs")).releaseOpenClawAgentDatabaseReadValidation;
		closeReadOnlyCandidates = closeCandidates;
		releaseReadValidation = releaseValidation;
	}
	const request = input;
	if (request.kind === "sqlite-target") {
		const { resolveSqliteTargetFromSessionStorePath } = await import("../../session-sqlite-target-BuTsI35E.mjs");
		return {
			ok: true,
			value: { target: resolveSqliteTargetFromSessionStorePath(request.storePath, request) }
		};
	}
	if (request.kind === "usage-cost") {
		const { executeUsageCostWorker, usageCostWorkerFailure } = await import("../../session-cost-usage-worker-sMOfdva6.mjs");
		try {
			if (!channel) throw new Error("Usage cost worker requires its host channel");
			const closed = /* @__PURE__ */ new Map();
			return {
				ok: true,
				value: await executeUsageCostWorker(request, channel, control, async (database, read) => {
					closed.delete(JSON.stringify(database));
					const result = await withHistoryDatabase(database, request.kind, read);
					if (result.closedHistoryDatabase) closed.set(JSON.stringify(result.closedHistoryDatabase), result.closedHistoryDatabase);
					return result.value;
				}),
				closedDatabases: [...closed.values()]
			};
		} catch (error) {
			return usageCostWorkerFailure(error);
		}
	}
	try {
		if (request.kind === "prewarm") {
			await Promise.all([
				import("../../session-history-worker-reader-C3yxqZQc.mjs"),
				import("../../chat-history-page-kernel-gh_PCxrt.mjs"),
				import("../../session-history-snapshot-CmdZzk4t.mjs")
			]);
			const { withOpenClawAgentDatabaseReadOnly } = await import("../../openclaw-agent-db-readonly-NHkpglJf.mjs");
			return await withHistoryDatabase(request.database, request.kind, () => {
				const opened = withOpenClawAgentDatabaseReadOnly(() => void 0, {
					...request.database,
					env: cloneEnvWithPlatformSemantics(request.env)
				});
				if (!opened.found && opened.reason !== "database-missing") throw new Error(`Session history prewarm admission unavailable: ${opened.reason}`);
				return { kind: "prewarm" };
			});
		}
		if (request.kind === "historical-eviction-candidates") {
			const { withOpenClawAgentDatabaseReadOnly } = await import("../../openclaw-agent-db-readonly-NHkpglJf.mjs");
			const { runSqliteDeferredTransactionSync } = await import("../../sqlite-transaction-B2ga_dsS.mjs");
			const { readHistoricalSessionIdsInDatabase } = await import("../../session-history-eviction-candidates-B0uC6Lxu.mjs");
			return await withHistoryDatabase(request.database, request.kind, () => {
				const result = withOpenClawAgentDatabaseReadOnly((database) => runSqliteDeferredTransactionSync(database.db, () => readHistoricalSessionIdsInDatabase({
					...request,
					database
				})), {
					...request.database,
					env: request.env
				});
				if (!result.found) throw new Error(`SQLite history eviction cannot read its database: ${result.reason}`);
				return {
					kind: "historical-eviction-candidates",
					sessionIds: result.value
				};
			});
		}
		if (request.kind === "session-pending-archives") {
			const { withOpenClawAgentDatabaseReadOnly } = await import("../../openclaw-agent-db-readonly-NHkpglJf.mjs");
			const { runSqliteDeferredTransactionSync } = await import("../../sqlite-transaction-B2ga_dsS.mjs");
			const { hasPendingSessionTranscriptArchives } = await import("../../session-accessor.sqlite-archive-store-kernel-DdcTlRlT.mjs");
			return await withHistoryDatabase(request.database, request.kind, () => {
				const result = withOpenClawAgentDatabaseReadOnly((database) => runSqliteDeferredTransactionSync(database.db, () => hasPendingSessionTranscriptArchives(database)), {
					...request.database,
					env: cloneEnvWithPlatformSemantics(request.env)
				});
				return {
					kind: "session-pending-archives",
					pending: result.found && result.value
				};
			});
		}
		if (request.kind === "session-archive-presence") {
			const { readTranscriptArchivePresenceInWorker } = await import("../../session-accessor.sqlite-archive-read-CPM5gfmH.mjs");
			return await withHistoryDatabase(request.database, request.kind, () => ({
				kind: "session-archive-presence",
				registered: readTranscriptArchivePresenceInWorker({
					...request,
					env: cloneEnvWithPlatformSemantics(request.env)
				})
			}));
		}
		if (request.kind === "session-archive-pruning") {
			const { readSessionArchivePruningInWorker } = await import("../../session-history-archive-pruning.worker-uPE8vYUP.mjs");
			return await withHistoryDatabase(request.database, request.kind, () => ({
				kind: "session-archive-pruning",
				result: readSessionArchivePruningInWorker(request)
			}));
		}
		if (request.kind === "cold-metadata") {
			const { withOpenClawAgentDatabaseReadOnly } = await import("../../openclaw-agent-db-readonly-NHkpglJf.mjs");
			return await withHistoryDatabase(request.database, request.kind, () => {
				const result = withOpenClawAgentDatabaseReadOnly((database) => readSessionColdTranscript(database.db, request.sessionId), {
					...request.database,
					env: cloneEnvWithPlatformSemantics(request.env)
				});
				return {
					kind: "cold-metadata",
					archive: result.found ? result.value : void 0
				};
			});
		}
		if (request.kind === "transcript-match") {
			const { findTranscriptEventMatchingInDatabase } = await import("../../session-transcript-match-C0NMnmon.mjs");
			const { withOpenClawAgentDatabaseReadOnly } = await import("../../openclaw-agent-db-readonly-NHkpglJf.mjs");
			return await withHistoryDatabase(request.database, request.kind, () => {
				const opened = withOpenClawAgentDatabaseReadOnly((database) => findTranscriptEventMatchingInDatabase(database, request.request), {
					...request.database,
					env: cloneEnvWithPlatformSemantics(request.request.target.env ?? process.env)
				});
				return {
					kind: "transcript-match",
					result: opened.found ? opened.value : void 0
				};
			});
		}
		if (request.kind === "transcript-search") {
			const { searchSessionTranscriptsReadOnlySync } = await import("../../session-transcript-search-BtTBy8nW.mjs");
			return await withHistoryDatabase(request.database, request.kind, () => ({
				kind: "transcript-search",
				result: searchSessionTranscriptsReadOnlySync(request.params, {
					...request.database,
					env: cloneEnvWithPlatformSemantics(request.params.env ?? process.env)
				})
			}));
		}
		if (request.kind === "session-store-target") {
			const { readSessionStoreTargetResult } = await import("../../session-store-target-inventory-M_N9s2ao.mjs");
			request.request.env = cloneEnvWithPlatformSemantics(request.request.env);
			const read = readSessionStoreTargetResult(request.request);
			if (!read.ok) {
				const readError = encodeSessionTranscriptWorkerError(read.error);
				if (!readError) throw read.error;
				return {
					ok: true,
					value: {
						kind: "session-store-target",
						readError
					}
				};
			}
			return {
				ok: true,
				value: read.value
			};
		}
		if (request.kind === "session-exact-entries") {
			const { readExactSessionEntriesWithLifecycle } = await import("../../session-entry-read.worker-BcItDl5z.mjs");
			request.env = cloneEnvWithPlatformSemantics(request.env);
			return await withHistoryDatabase(request.database, request.kind, () => readExactSessionEntriesWithLifecycle(request));
		}
		if (request.kind === "session-row-facts") {
			const { readSessionRowDatabaseFacts } = await import("../../session-entry-read.worker-BcItDl5z.mjs");
			return await withHistoryDatabase(request.database, request.kind, () => readSessionRowDatabaseFacts(request));
		}
		if (request.kind === "session-row-backfill") {
			const { readSessionRowTranscriptFields } = await import("../../session-row-transcript-backfill.kernel-BcQUvd-I.mjs");
			return await withHistoryDatabase(request.database, request.kind, () => ({
				kind: "session-row-backfill",
				fields: readSessionRowTranscriptFields(request.params)
			}));
		}
		if (request.kind === "session-target-inventory") {
			const { readSessionStoreTargetInventory } = await import("../../session-store-target-inventory-M_N9s2ao.mjs");
			return {
				ok: true,
				value: readSessionStoreTargetInventory(request.request)
			};
		}
		if (request.kind === "session-identity-evidence") {
			const { withOpenClawAgentDatabaseReadOnly } = await import("../../openclaw-agent-db-readonly-NHkpglJf.mjs");
			const { readSessionIdentityEvidenceInDatabase } = await import("../../session-accessor.sqlite-entry-availability-B_aq8-1a.mjs");
			const { readWithCanonicalSessionReaderContinuation } = await import("../../session-canonical-key-tmwL52zt.mjs");
			return await withHistoryDatabase(request.database, request.kind, () => {
				const result = withOpenClawAgentDatabaseReadOnly((database) => readWithCanonicalSessionReaderContinuation(database, request.continuation, () => readSessionIdentityEvidenceInDatabase(database, request.identities)), {
					...request.database,
					env: cloneEnvWithPlatformSemantics(request.env)
				});
				return {
					kind: "session-identity-evidence",
					evidence: result.found ? result.value : request.identities.map(() => result.reason === "database-missing" ? { status: "absent" } : {
						status: "unknown",
						reason: result.reason
					})
				};
			});
		}
		if (request.kind === "session-diagnostic-text") {
			const { readSessionDiagnosticText } = await import("../../session-entry-read.worker-BcItDl5z.mjs");
			return await withHistoryDatabase(request.database, request.kind, () => readSessionDiagnosticText(request));
		}
		if (request.kind === "session-entry-read") {
			const { loadSessionEntryReadOnlyResultInScope } = await import("../../session-accessor.sqlite-entry-D7_eq-YY.mjs");
			return await withHistoryDatabase(request.database, request.kind, () => {
				let source;
				const read = loadSessionEntryReadOnlyResultInScope({
					...request.scope,
					env: cloneEnvWithPlatformSemantics(request.scope.env ?? process.env)
				}, request.continuation, (readSource) => {
					if (typeof readSource.databaseIdentity !== "string") throw new Error("Private session entry requires its process-held owner");
					source = {
						...readSource,
						databaseIdentity: readSource.databaseIdentity
					};
				});
				if (!read.ok) {
					const readError = encodeSessionTranscriptWorkerError(read.error);
					if (!readError || readError.kind === "fence") throw read.error;
					return {
						kind: "session-entry-read",
						entry: void 0,
						source,
						readError
					};
				}
				return {
					kind: "session-entry-read",
					entry: read.value,
					source
				};
			});
		}
		if (request.kind === "session-entry-list") {
			const { listSessionEntriesReadOnly } = await import("../../session-accessor.sqlite-entry-list.read-zlpx9xJr.mjs");
			return await withHistoryDatabase(request.database, request.kind, () => ({
				kind: "session-entry-list",
				entries: listSessionEntriesReadOnly({
					...request.scope,
					env: cloneEnvWithPlatformSemantics(request.scope.env ?? process.env)
				})
			}));
		}
		if (request.kind === "usage-cache") {
			const { readSessionCostUsageCache } = await import("../../session-cost-usage-cache-read-Dsx-wNes.mjs");
			return await withHistoryDatabase(request.database, request.kind, () => readSessionCostUsageCache({
				...request.database,
				env: request.env
			}, request.request));
		}
		if (request.kind === "branch-summaries") {
			const { readSessionBranchSummariesInWorker } = await import("../../session-accessor.sqlite-branches-Dxf5U96q.mjs");
			return {
				ok: true,
				value: readSessionBranchSummariesInWorker(request.request)
			};
		}
		if (request.kind === "session-membership-facts") {
			const { withOpenClawAgentDatabaseReadOnly } = await import("../../openclaw-agent-db-readonly-NHkpglJf.mjs");
			const { readSessionMembershipFactsInDatabase } = await import("../../session-membership-facts-3xx3rJP1.mjs");
			const { readWithCanonicalSessionReaderContinuation } = await import("../../session-canonical-key-tmwL52zt.mjs");
			return await withHistoryDatabase(request.database, request.kind, () => {
				const result = withOpenClawAgentDatabaseReadOnly((database) => readWithCanonicalSessionReaderContinuation(database, request.continuation, () => readSessionMembershipFactsInDatabase(database, request.sessionKeys)), {
					...request.database,
					env: cloneEnvWithPlatformSemantics(request.env)
				});
				if (!result.found && result.reason !== "database-missing") throw new Error(`Session membership read unavailable: ${result.reason}`);
				return result.found ? result.value : {
					kind: "session-membership-facts",
					facts: []
				};
			});
		}
		if (request.kind === "projection-status") {
			const { withOpenClawAgentDatabaseReadOnly } = await import("../../openclaw-agent-db-readonly-NHkpglJf.mjs");
			const { runSqliteDeferredTransactionSync } = await import("../../sqlite-transaction-B2ga_dsS.mjs");
			const { hasSessionsNeedingTranscriptIndexReconcile, hasOrphanedTranscriptIndexRows, sessionTranscriptIndexNeedsReconcile } = await import("../../session-transcript-index-C7g23YKb.mjs");
			return await withHistoryDatabase(request.database, request.kind, () => {
				const result = withOpenClawAgentDatabaseReadOnly(({ db }) => runSqliteDeferredTransactionSync(db, () => request.sessionId !== void 0 ? sessionTranscriptIndexNeedsReconcile(db, request.sessionId) : hasSessionsNeedingTranscriptIndexReconcile(db) || hasOrphanedTranscriptIndexRows(db)), {
					...request.database,
					env: request.env
				});
				return result.found ? result.value : request.sessionId === void 0 && result.reason === "schema-missing";
			});
		}
		if (request.kind === "session-members") {
			const { withOpenClawAgentDatabaseReadOnly } = await import("../../openclaw-agent-db-readonly-NHkpglJf.mjs");
			const { listSessionMembersInDatabase } = await import("../../session-sharing-store.kernel-BXtOpSKd.mjs");
			return await withHistoryDatabase(request.database, request.kind, () => {
				const result = withOpenClawAgentDatabaseReadOnly((database) => listSessionMembersInDatabase(database, request.sessionKey), {
					...request.database,
					env: request.env
				});
				return result.found ? result.value : [];
			});
		}
		if (request.kind === "session-pending-input-receipts") {
			const { listSessionPendingInputReceipts } = await import("../../session-accessor.sqlite-pending-input-receipts-CyWCH3r1.mjs");
			return await withHistoryDatabase(request.database, request.kind, () => ({
				kind: "session-pending-input-receipts",
				receipts: listSessionPendingInputReceipts({
					agentId: request.agentId,
					sessionKey: request.sessionKey,
					sessionId: request.sessionId,
					storePath: request.database.path,
					env: cloneEnvWithPlatformSemantics(request.env)
				}, { runIds: request.runIds })
			}));
		}
		if (request.kind === "session-progress-card") {
			const { withOpenClawAgentDatabaseReadOnly } = await import("../../openclaw-agent-db-readonly-NHkpglJf.mjs");
			const { readSessionProgressCard } = await import("../../progress-card-store-BP78JU_d.mjs");
			return await withHistoryDatabase(request.database, request.kind, () => {
				const result = withOpenClawAgentDatabaseReadOnly((database) => readSessionProgressCard(database.db, request.sessionKey), {
					...request.database,
					env: request.env
				});
				return {
					kind: "session-progress-card",
					card: result.found ? result.value : null
				};
			});
		}
		if (request.kind === "session-row-presence") {
			const { loadSessionEntryReadOnlyInScope } = await import("../../session-accessor.sqlite-entry-D7_eq-YY.mjs");
			return await withHistoryDatabase(request.database, request.kind, () => loadSessionEntryReadOnlyInScope({
				...request.scope,
				projection: "list"
			}) !== void 0);
		}
		return await runWithSessionTranscriptReadFence(request.admission, async () => {
			if (request.kind === "session-title-fields") {
				const { readSessionTitleFieldsFromTranscript } = await import("../../session-transcript-title-reader-Bce0j4ga.mjs");
				return await withHistoryDatabase(request.database, request.kind, () => ({
					kind: "session-title-fields",
					fields: readSessionTitleFieldsFromTranscript(request.scope, {
						includeInterSession: request.includeInterSession,
						readOnly: true
					})
				}));
			}
			if (request.kind === "session-preview") {
				const { readSessionPreviewItemsReadOnly } = await import("../../session-transcript-preview-reader-CFBdVbJ4.mjs");
				return await withHistoryDatabase(request.database, request.kind, () => ({
					kind: "session-preview",
					items: readSessionPreviewItemsReadOnly(request)
				}));
			}
			if (request.kind === "transcript-hydration" || request.kind === "current-turn-entry") {
				const { readOpenClawDatabaseQuarantineFailure } = await import("../../openclaw-quarantine-store-BsssjzXK.mjs");
				const quarantine = readOpenClawDatabaseQuarantineFailure("agent", request.database.path, { env: request.target.env });
				if (quarantine) throw quarantine;
				if (request.kind === "current-turn-entry") {
					const { readSessionTranscriptCurrentTurnEntry } = await import("../../session-accessor.sqlite-current-turn-MUHU8Nxn.mjs");
					return await withHistoryDatabase(request.database, request.kind, () => readSessionTranscriptCurrentTurnEntry(request.target, {
						entryId: request.entryId,
						version: request.version,
						includeEntry: request.includeEntry,
						readOnly: true,
						resolvedScope: request.resolvedScope
					}));
				}
				const { readSessionTranscriptBoundedActiveContextCore } = await import("../../session-accessor.sqlite-active-context-B2XbxJVr.mjs");
				const { streamSessionTranscriptHydration } = await import("../../session-transcript-hydration.worker-CRw_3c-b.mjs");
				return await withHistoryDatabase(request.database, request.kind, () => {
					if (request.limits) return {
						kind: "bounded",
						snapshot: readSessionTranscriptBoundedActiveContextCore(request.target, {
							...request.limits,
							readOnly: true,
							resolvedScope: request.resolvedScope
						})
					};
					if (!channel) throw new Error("Full transcript hydration requires its host channel");
					return streamSessionTranscriptHydration(request, channel, control);
				});
			}
			if (request.kind === "model-context") {
				const { readSessionTranscriptModelContext } = await import("../../session-accessor.sqlite-model-context-Da-umOgy.mjs");
				return {
					ok: true,
					value: readSessionTranscriptModelContext(request.target, request.through, request.limits)
				};
			}
			if (request.kind === "history-page") {
				const { readSessionHistoryRequest } = await import("../../session-history-worker-reader-C3yxqZQc.mjs");
				return await withHistoryDatabase(request.database, request.kind, () => readSessionHistoryRequest(request.request, {
					...request.target,
					database: request.database
				}));
			}
			if (request.kind === "session-reset-recall") {
				const { readSessionResetRecallCutoffInProcess } = await import("../../session-reset-recall-read-i37Kl7E7.mjs");
				return {
					ok: true,
					value: { cutoff: readSessionResetRecallCutoffInProcess(request.scope) }
				};
			}
			const { buildSessionEntryInProcess, readSessionEntryResetRecallCutoff } = await import("../../session-files-BpQlZ4HR.mjs");
			const { createSensitiveTextRedactor } = await import("../../redact-BfXCHwaC.mjs");
			const entry = await buildSessionEntryInProcess(request.absPath, request.options, createSensitiveTextRedactor(request.redaction));
			return {
				ok: true,
				value: {
					entry,
					resetRecallCutoff: entry ? readSessionEntryResetRecallCutoff(entry) : { state: "absent" }
				}
			};
		});
	} catch (error) {
		if (error instanceof SessionHistoryDeltaPreparationError && request.kind === "history-page" && request.request.kind === "delta") return {
			ok: false,
			error: {
				kind: "delta-visibility",
				partial: error.partial
			}
		};
		if (error instanceof SyntaxError && request.kind === "history-page" && (request.request.kind === "message-lookup" || request.request.kind === "message-by-id" || request.request.kind === "message-count" || request.request.kind === "artifacts" || request.request.kind === "message-page" || request.request.kind === "around-id" || request.request.kind === "source-messages" || request.request.kind === "recent-page")) return {
			ok: false,
			error: {
				kind: "syntax",
				message: error.message
			}
		};
		const encoded = encodeSessionTranscriptWorkerError(error);
		if (encoded) return {
			ok: false,
			error: encoded
		};
		throw error;
	}
}, {
	transferList(reply) {
		if (!reply.ok) return [];
		const value = reply.value;
		if (typeof value !== "object" || value === null || !("kind" in value) || value.kind !== "artifacts" || value.result.kind !== "download-response") return [];
		const body = value.result.response?.body;
		return body ? [body.buffer] : [];
	},
	closeResource: (key) => {
		const parsed = key === void 0 ? void 0 : JSON.parse(key);
		if (!Array.isArray(parsed) || !parsed.every((candidate) => isRecord(candidate) && typeof candidate.path === "string" && (candidate.scope === void 0 || candidate.scope === "sibling-family"))) throw new Error("Session reader cleanup requires captured physical paths");
		const candidates = parsed.map((candidate) => candidate.scope ? {
			path: candidate.path,
			scope: candidate.scope
		} : { path: candidate.path });
		closeReadOnlyCandidates?.(candidates);
		releaseReadValidation?.(candidates);
		for (const [identity, retained] of historyDatabaseScopes) if (!retained.scope.hasRetainedConnection) historyDatabaseScopes.delete(identity);
	}
});
//#endregion
export {};
