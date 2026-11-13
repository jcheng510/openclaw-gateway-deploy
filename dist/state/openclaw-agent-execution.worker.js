import "../src-SskUVPJG.mjs";
import { t as expectDefined } from "../expect-lbe3Hgrh.mjs";
import { c as isRecord } from "../record-coerce-TIsquoVR.mjs";
import { t as formatErrorMessage } from "../errors-YPvSaqwO.mjs";
import { o as sqliteReaderDatabasePathKey } from "../sqlite-reader-lifecycle-B0eu7rNH.mjs";
import { a as readDatabasePathIdentitySync, t as assertExistingDatabaseIdentity } from "../sqlite-worker-identity-Dggu-rKK.mjs";
import { a as createSqliteLifecycleAggregateError, s as throwSqliteLifecycleErrors } from "../sqlite-lifecycle-errors-Q-hsFPSB.mjs";
import { t as assertTransactionUsable } from "../sqlite-transaction-2VkikDo-.mjs";
import { d as onSqliteWalCheckpoint } from "../sqlite-wal-fdekKFS3.mjs";
import { b as retainOpenClawStateDatabase, y as requireOpenClawStateDatabaseIdentity } from "../openclaw-state-db-cache-IAib4pqp.mjs";
import { i as readOpenClawAgentDatabaseIdentity } from "../openclaw-agent-db-identity-ChZ28OhF.mjs";
import { i as getOpenClawAgentDatabaseValidation } from "../openclaw-agent-db-validation-cache-C348cqkT.mjs";
import { f as SQLITE_WORKER_OPERATION_CLEANUP, i as requestSqliteWorkerOperationAdmission, l as SQLITE_WORKER_CLOSE_RECEIPT, m as SQLITE_WORKER_PREPARE_COMMAND, p as SQLITE_WORKER_PREPARE_ADMITTED, r as deferSqliteWorkerCommitReceipt, s as takeSqliteWorkerOperationAdmissionAttachment, t as SqliteWorkerOpenRefusedError } from "../sqlite-worker-operation-admission-BB758RIN.mjs";
import { r as openOpenClawStateDatabase } from "../openclaw-state-db-DM-mSY0m.mjs";
import { i as readAgentDeletionJournalStatusInDatabase } from "../agent-deletion-journal.read-BnCyzoNE.mjs";
import { m as ensureOpenClawAgentDatabasePermissions } from "../openclaw-agent-db-maintenance-DY-8E9tR.mjs";
import { d as prepareOpenClawAgentDatabaseWorkerLease } from "../openclaw-agent-db-lease-B-E6z2mk.mjs";
import { a as closeOpenClawAgentDatabaseByPath, y as retainAgentDatabase } from "../openclaw-agent-db-lifecycle-CCXA1nI8.mjs";
import { c as openOpenClawAgentDatabase, d as runOpenClawAgentWriteTransaction, o as getOpenClawAgentDatabaseIfOpen } from "../openclaw-agent-db-CZUYuo7P.mjs";
import { MessageChannel, receiveMessageOnPort } from "node:worker_threads";
import { isPromise } from "node:util/types";
//#region src/state/openclaw-agent-execution-close.ts
function closeAgentDatabaseExecution({ database, identity, closeDomain, releaseBorrow, releaseSharedBorrow }) {
	let checkpoint;
	const errors = [];
	for (const cleanup of [
		closeDomain,
		() => {
			if (!database) return;
			const closingPath = sqliteReaderDatabasePathKey(database.path);
			const stopObserving = onSqliteWalCheckpoint((observation) => {
				if (observation.databasePath === closingPath) checkpoint = {
					health: observation.health,
					observedAtNs: observation.observedAtNs
				};
			});
			try {
				closeOpenClawAgentDatabaseByPath(database.path, database.agentId);
			} finally {
				stopObserving();
			}
		},
		() => releaseBorrow?.(),
		releaseSharedBorrow
	]) try {
		cleanup();
	} catch (error) {
		errors.push(error);
	}
	throwSqliteLifecycleErrors(errors, "Agent database cleanup failed");
	if (identity && checkpoint) return {
		identity: {
			key: `file:${identity.physicalIdentity}`,
			canonicalPath: identity.nativeLocation
		},
		incarnation: identity.incarnation,
		checkpoint
	};
}
//#endregion
//#region src/state/openclaw-agent-execution-domain.ts
/** One admitted publication scope borrows the canonical connection; it never owns its close. */
function createAgentDatabaseDomainOwner(context) {
	let binding;
	let prepared;
	let failedBinding = false;
	const requireBinding = (id) => {
		if (!binding || binding.id !== id || !binding.authority.active) throw new Error("Agent database operation lost its bound publication scope");
		return binding;
	};
	const bind = (input) => {
		const database = context.assertCurrent();
		if (!prepared || prepared.id !== input.id || binding) throw new Error("Agent publication module was not prepared for this scope");
		const factory = prepared.factory;
		prepared = void 0;
		failedBinding = true;
		const authority = { active: true };
		try {
			const backend = factory(input.input, {
				databasePath: context.databasePath,
				database,
				admit: (stage) => {
					if (!authority.active) throw new Error("Agent publication cleanup cannot admit a transaction");
					context.admit(stage);
				}
			});
			if (isPromise(backend)) {
				backend.catch(() => {});
				throw new Error("Connection-bound publication factories must remain synchronous");
			}
			if (!isRecord(backend) || typeof backend.execute !== "function" || typeof backend.close !== "function" || typeof backend.assertSettled !== "function" || SQLITE_WORKER_PREPARE_COMMAND in backend && backend[SQLITE_WORKER_PREPARE_COMMAND] !== void 0 && typeof backend[SQLITE_WORKER_PREPARE_COMMAND] !== "function" || backend.prepare !== void 0 && typeof backend.prepare !== "function") throw new Error("Agent publication module returned an invalid connection-bound backend");
			binding = {
				id: input.id,
				backend,
				authority
			};
			failedBinding = false;
		} catch (error) {
			authority.active = false;
			throw error;
		}
	};
	const prepareCommand = async (input) => {
		const current = requireBinding(input.id);
		const loading = current.backend[SQLITE_WORKER_PREPARE_COMMAND]?.(input.command.type);
		if (loading) await loading;
		await current.backend.prepare?.(input.command);
		if (requireBinding(input.id) !== current) throw new Error("Agent publication changed during command preparation");
	};
	const closeBinding = () => {
		if (!binding) return;
		binding.authority.active = false;
		const closed = binding.backend.close();
		if (closed !== void 0) {
			closed.catch(() => {});
			throw new Error("Connection-bound publication cleanup must remain synchronous");
		}
		binding = void 0;
	};
	return {
		async prepare(command) {
			if (command.type === "database.domain.bind" || command.type === "database.domain.publish") {
				if (binding || prepared) throw new Error("Agent database already has an admitted publication scope");
				const url = new URL(command.input.moduleUrl);
				if (url.protocol !== "file:" || url.search || url.hash) throw new Error("Agent publication requires a static local module URL");
				const module = await import(url.href);
				if (!isRecord(module) || typeof module.bindSqliteWorkerBackend !== "function") throw new Error("Agent publication module must export bindSqliteWorkerBackend");
				const factory = module.bindSqliteWorkerBackend;
				prepared = {
					id: command.input.id,
					factory: (input, bindingContext) => factory(input, bindingContext)
				};
			} else if (command.type === "database.domain.execute") await prepareCommand(command.input);
		},
		async preparePublication(input) {
			bind(input);
			requireBinding(input.id).backend.assertSettled?.();
			await Promise.resolve();
			await prepareCommand(input);
		},
		cleanupPublication(id) {
			if (binding?.id === id) {
				context.assertCleanupCurrent();
				closeBinding();
			}
		},
		execute(command) {
			if (command.type === "database.domain.bind") {
				bind(command.input);
				return;
			}
			context.assertCurrent();
			const current = requireBinding(command.input.id);
			if (command.type === "database.domain.close") {
				closeBinding();
				return;
			}
			return current.backend.execute(command.input.command);
		},
		assertSettled() {
			prepared = void 0;
			if (failedBinding) throw new Error("Agent publication binding did not settle");
			if (binding && !binding.authority.active) throw new Error("Agent publication cleanup did not settle");
			binding?.backend.assertSettled?.();
		},
		close() {
			closeBinding();
			prepared = void 0;
		}
	};
}
//#endregion
//#region src/state/openclaw-agent-execution.worker.ts
function createSqliteWorkerBackend(input, opening) {
	const backend = openAgentDatabaseBackend(input, opening);
	try {
		backend.execute({
			type: "database.prepareWrite",
			input: void 0
		});
		backend.assertSettled?.();
		return backend;
	} catch (error) {
		try {
			backend.close();
		} catch (cleanupError) {
			throw createSqliteLifecycleAggregateError([error, cleanupError], "Agent creation and cleanup failed", error);
		}
		throw error;
	}
}
/** The broker supplies a private admission channel before invoking this native factory. */
function openExistingSqliteWorkerBackend(input, opening) {
	return openAgentDatabaseBackend(input, opening);
}
function openAgentDatabaseBackend(input, opening) {
	if (opening.databasePath !== input.databasePath) throw new Error("Agent database open does not match its captured execution owner");
	const admitOpen = () => {
		try {
			requestSqliteWorkerOperationAdmission({
				stage: "open",
				facts: input
			});
		} catch (error) {
			throw new SqliteWorkerOpenRefusedError(error);
		}
	};
	admitOpen();
	const options = {
		agentId: input.agentId,
		path: input.databasePath,
		env: input.environment
	};
	let admittedFileIdentity = input.creatingIdentity?.key ?? opening.existingIdentity ?? readDatabasePathIdentitySync(input.databasePath).key;
	let admittedFileBirthtime = input.creatingIdentity?.birthtime;
	const assertFileIdentity = () => {
		if (input.expectedIdentity) assertExistingDatabaseIdentity(input.databasePath, `file:${input.expectedIdentity.physicalIdentity}`, input.expectedIdentity.birthtime);
		if (admittedFileIdentity.startsWith("path:")) {
			const current = readDatabasePathIdentitySync(input.databasePath);
			if (current.key !== admittedFileIdentity || input.creatingIdentity && current.canonicalPath !== input.creatingIdentity.canonicalPath) throw new Error("Agent database target changed before creating open");
		} else {
			if (input.creatingIdentity && readDatabasePathIdentitySync(input.databasePath).canonicalPath !== input.creatingIdentity.canonicalPath) throw new Error("Agent database target changed before creating open");
			assertExistingDatabaseIdentity(input.databasePath, admittedFileIdentity, admittedFileBirthtime);
		}
	};
	let database;
	let shared;
	let sharedBorrow;
	let releaseBorrow;
	let identity;
	let openingFailure;
	let startupJournalRequested = false;
	let publicationStartupJournal;
	const readRequestPreparation = () => {
		const attachment = takeSqliteWorkerOperationAdmissionAttachment();
		if (!isRecord(attachment) || attachment.kind !== "agent-execution" || typeof attachment.startupJournal !== "boolean") throw new Error("Agent execution requires its request-local preparation facts");
		return attachment.startupJournal;
	};
	const readDeletionJournal = () => readAgentDeletionJournalStatusInDatabase(expectDefined(shared, "Agent execution shared-state owner").db, input.agentId) !== "absent";
	const openWriter = () => {
		let validation;
		if (!database) {
			admitOpen();
			assertFileIdentity();
			if (!shared) {
				shared = openOpenClawStateDatabase({
					path: input.stateDatabasePath,
					env: input.environment,
					initializationAgentPaths: [input.databasePath]
				});
				sharedBorrow = retainOpenClawStateDatabase(shared);
			}
			const lease = prepareOpenClawAgentDatabaseWorkerLease(options, shared, input.leaseId);
			const { port1, port2 } = new MessageChannel();
			try {
				requestSqliteWorkerOperationAdmission({
					stage: "prepare",
					facts: {
						kind: "shared-owner",
						identity: requireOpenClawStateDatabaseIdentity(shared),
						lease: lease.receipt,
						validationPort: port2
					}
				}, [port2]);
				lease.validation = receiveMessageOnPort(port1)?.message;
			} catch (error) {
				throw new SqliteWorkerOpenRefusedError(error);
			} finally {
				port1.close();
				port2.close();
			}
			assertFileIdentity();
			let registration;
			let openingResult;
			try {
				const opened = openOpenClawAgentDatabase(options, lease, {
					starting: () => requestSqliteWorkerOperationAdmission({
						stage: "prepare",
						facts: {
							kind: "agent-registration-start",
							lease: lease.receipt
						}
					}),
					committed(receipt) {
						registration = receipt;
					}
				});
				database = opened;
				releaseBorrow = retainAgentDatabase(opened.db);
				openingResult = {
					ok: true,
					value: opened
				};
			} catch (error) {
				openingFailure = { error };
				openingResult = {
					ok: false,
					error
				};
			}
			if (registration) try {
				requestSqliteWorkerOperationAdmission({
					stage: "prepare",
					facts: {
						kind: "agent-registration-committed",
						registration
					}
				});
			} catch (error) {
				if (!openingResult.ok) throw createSqliteLifecycleAggregateError([openingResult.error, error], `${String(openingResult.error)}; committed registration reporting failed: ${String(error)}`, openingResult.error);
				throw error;
			}
			if (!openingResult.ok) throw openingResult.error;
			const opened = openingResult.value;
			const nativeIdentity = readOpenClawAgentDatabaseIdentity(opened);
			if (typeof nativeIdentity.identity !== "string") throw new Error("Disk agent execution requires its canonical file identity");
			const openedFileIdentity = `file:${nativeIdentity.identity}`;
			if (admittedFileIdentity.startsWith("file:") && (openedFileIdentity !== admittedFileIdentity || admittedFileBirthtime !== void 0 && nativeIdentity.birthtime !== admittedFileBirthtime)) throw new Error("Agent writer differs from its admitted physical file");
			if (input.expectedIdentity && nativeIdentity.identity !== input.expectedIdentity.physicalIdentity) throw new Error("Agent writer differs from its expected physical file");
			admittedFileIdentity = openedFileIdentity;
			admittedFileBirthtime = nativeIdentity.birthtime;
			identity = {
				kind: "file",
				physicalIdentity: nativeIdentity.identity,
				birthtime: nativeIdentity.birthtime,
				incarnation: nativeIdentity.incarnation,
				nativeLocation: nativeIdentity.filename
			};
			validation = getOpenClawAgentDatabaseValidation(opened);
		}
		if (!database || !database.db.isOpen || getOpenClawAgentDatabaseIfOpen(options) !== database) throw new Error("Agent execution lost its retained native database");
		requestSqliteWorkerOperationAdmission({
			stage: "prepare",
			facts: {
				identity,
				validation,
				...startupJournalRequested ? { agentDeletionJournalPresent: readDeletionJournal() } : {}
			}
		});
		return database;
	};
	const admit = (stage, publication) => {
		assertFileIdentity();
		requestSqliteWorkerOperationAdmission({
			stage,
			facts: {
				identity,
				...startupJournalRequested ? { agentDeletionJournalPresent: readDeletionJournal() } : {},
				...publication ? { publication } : {}
			}
		});
		if (stage === "commit") ensureOpenClawAgentDatabasePermissions(input.databasePath, options);
	};
	const writeTransaction = (operationLabel, owner, write) => {
		const opened = openWriter();
		return runOpenClawAgentWriteTransaction((current) => {
			if (current.db !== opened.db) throw new Error(`${owner} lost its canonical database owner`);
			admit("transaction");
			return write(current);
		}, options, { operationLabel });
	};
	let providerReview;
	let entryReader;
	let archives;
	let archivePruning;
	let transcript;
	let replacements;
	let trajectory;
	let acpEntry;
	let pendingInputWithdrawal;
	const domain = createAgentDatabaseDomainOwner({
		databasePath: input.databasePath,
		assertCurrent() {
			assertOpen();
			const current = openWriter();
			assertFileIdentity();
			return current.db;
		},
		assertCleanupCurrent() {
			if (!database || !identity || !database.db.isOpen || database.db.location() !== identity.nativeLocation || getOpenClawAgentDatabaseIfOpen(options) !== database) throw new Error("Agent cleanup lost its retained native database");
			assertFileIdentity();
		},
		admit
	});
	let closed = false;
	let closeReceipt;
	const assertOpen = () => {
		if (closed) throw new Error("Agent database execution owner is closed");
	};
	const executeCommand = (command) => {
		if (command.type === "database.domain.bind" || command.type === "database.domain.publish" || command.type === "database.domain.execute" || command.type === "database.domain.close") return domain.execute(command);
		if (command.type === "database.prepareWrite") {
			openWriter();
			return;
		}
		if (command.type === "database.walMaintenance") return openWriter().walMaintenance.maintainPeriodic?.(command.input, admit) ?? { reclaimedPages: 0 };
		if (command.type === "session.entry.read" && entryReader) return entryReader.readSessionEntryRow(openWriter(), command.input.sessionKey)?.entry;
		if (command.type === "trajectory.events.append" && trajectory) {
			const append = trajectory.appendSqliteTrajectoryRuntimeEventsInTransaction;
			return writeTransaction("trajectory.runtime.append", "Trajectory append", (current) => {
				append(current, command.input);
				deferSqliteWorkerCommitReceipt(current.db, { kind: "trajectory-runtime-append" });
				admit("commit");
			});
		}
		if ((command.type === "session.archives.preparePublication" || command.type === "session.archives.recordPublication") && archives) {
			const kernel = archives;
			return writeTransaction("session.archive.publish", "Session archive publication", (current) => {
				const result = command.type === "session.archives.preparePublication" ? kernel.prepareSessionTranscriptArchivePublishPlans(current, command.input) : kernel.recordSessionTranscriptArchivePublishResults(current, command.input.results, command.input.nowMs);
				admit("commit");
				return result;
			});
		}
		if (command.type === "session.transcript.initialize" && transcript) {
			const assertIdentity = transcript.assertIdentity;
			assertIdentity(command.input);
			const initialize = transcript.initialize;
			return writeTransaction("session.entry.create-with-transcript", "Session transcript", (current) => {
				const publication = {
					kind: "session-transcript-initialized",
					sessionKey: command.input.sessionKey
				};
				initialize(current, {
					agentId: input.agentId,
					path: input.databasePath,
					...command.input
				}, command.input.cwd, { onPlaceholderInserted: ({ sessionId }) => {
					publication.placeholder = { sessionId };
				} });
				deferSqliteWorkerCommitReceipt(current.db, publication);
				admit("commit", publication);
				return publication;
			});
		}
		if (command.type === "session.entry.acp" && acpEntry) return acpEntry.mutateAcpSessionEntryInWorker(openWriter(), options, command.input, admit);
		if (command.type === "session.entries.replace" && replacements) {
			const replace = replacements.commitSessionEntryReplacementsInDatabase;
			const preparePublication = replacements.prepareSessionEntryReplacementPublication;
			return writeTransaction("session.entry-replacements", "Session replacement", (current) => {
				const result = replace(current, command.input, () => {
					const initialization = command.input.initializeTranscript;
					if (!initialization) return;
					try {
						if (!transcript) throw new Error("Session transcript initialization was not prepared");
						const assertIdentity = transcript.assertIdentity;
						assertIdentity(initialization);
						transcript.initialize(current, {
							agentId: input.agentId,
							path: input.databasePath,
							...initialization
						}, initialization.cwd);
					} catch (error) {
						throw Object.assign(new Error(formatErrorMessage(error), { cause: error }), { name: "SessionTranscriptInitializationError" });
					}
				});
				const publication = preparePublication(result);
				deferSqliteWorkerCommitReceipt(current.db, publication);
				admit("commit", publication);
				return result;
			});
		}
		if (command.type === "session.providerReview.compare" && providerReview) return providerReview.compareSessionProviderReviewInWorker(openWriter(), options, command.input, admit);
		if (command.type === "session.pendingInputs.withdraw" && pendingInputWithdrawal) return pendingInputWithdrawal.discardSessionPendingInputInWorker(openWriter(), options, command.input, admit);
		if (command.type === "session.archivePruning.deletePublished" && archivePruning) return archivePruning.deletePublishedSessionArchiveInDatabase(openWriter(), options, command.input, admit);
		if (command.type === "session.archivePruning.removeLegacy" && archivePruning) return archivePruning.removeLegacySessionArchiveInDatabase(openWriter(), options, command.input.filePath, admit);
		if (command.type === "session.archivePruning.reclaimPages" && archivePruning) return archivePruning.reclaimSessionArchivePagesInWorker(openWriter(), command.input.maxPages, admit);
		throw new Error("Unknown agent database operation");
	};
	return {
		prepare(command) {
			if (command.type === "session.entry.acp") return import("../session-meta-entry.worker-DyN-uKUj.mjs").then((module) => {
				acpEntry = module;
			});
			if (command.type === "session.entry.read") return import("../session-accessor.sqlite-entry-read-Dov50wfJ.mjs").then((module) => {
				entryReader = module;
			});
			if (command.type === "trajectory.events.append") return import("../runtime-store.sqlite-CLe9LZBK.mjs").then((module) => {
				trajectory = module;
			});
			if (command.type === "session.archives.preparePublication" || command.type === "session.archives.recordPublication") return import("../session-accessor.sqlite-archive-store-kernel-DdcTlRlT.mjs").then((module) => {
				archives = module;
			});
			if (command.type === "session.archivePruning.deletePublished" || command.type === "session.archivePruning.removeLegacy" || command.type === "session.archivePruning.reclaimPages") return import("../session-history-archive-pruning.worker-uPE8vYUP.mjs").then((module) => {
				archivePruning = module;
			});
			if (command.type === "session.transcript.initialize" || command.type === "session.entries.replace" && command.input.initializeTranscript) return Promise.all([
				import("../session-accessor.sqlite-transcript-header-1zTao2bn.mjs"),
				import("../session-accessor.sqlite-scope-BPHCVNrG.mjs"),
				command.type === "session.entries.replace" ? import("../session-accessor.sqlite-replacement-state-CAAYl-dC.mjs") : void 0
			]).then(([header, scope, replacement]) => {
				replacements = replacement ?? replacements;
				transcript = {
					initialize: header.ensureTranscriptHeader,
					assertIdentity: scope.assertSqliteTranscriptWriteIdentity
				};
			});
			if (command.type === "session.entries.replace") return import("../session-accessor.sqlite-replacement-state-CAAYl-dC.mjs").then((module) => {
				replacements = module;
			});
			if (command.type === "session.providerReview.compare") return import("../provider-review-store.worker-Coxdwjqf.mjs").then((module) => {
				providerReview = module;
			});
			if (command.type === "session.pendingInputs.withdraw") return import("../session-pending-input-withdrawal.worker-D1eHPgNt.mjs").then((module) => {
				pendingInputWithdrawal = module;
			});
			if (command.type === "database.domain.bind" || command.type === "database.domain.publish" || command.type === "database.domain.execute" || command.type === "database.domain.close") return domain.prepare(command);
		},
		[SQLITE_WORKER_PREPARE_ADMITTED](command) {
			if (command.type !== "database.domain.publish") return;
			publicationStartupJournal = readRequestPreparation();
			startupJournalRequested = publicationStartupJournal;
			try {
				return domain.preparePublication(command.input);
			} finally {
				startupJournalRequested = false;
			}
		},
		[SQLITE_WORKER_OPERATION_CLEANUP](command) {
			if (command.type === "database.domain.publish") {
				startupJournalRequested = publicationStartupJournal ?? false;
				try {
					domain.cleanupPublication(command.input.id);
				} finally {
					startupJournalRequested = false;
					publicationStartupJournal = void 0;
				}
			}
		},
		assertSettled() {
			if (openingFailure) throw openingFailure.error;
			domain.assertSettled();
			if (database) {
				assertTransactionUsable(database.db);
				if (!identity || !database.db.isOpen || database.db.isTransaction) throw new Error("Agent database command left an unsettled native connection");
			}
		},
		execute(command) {
			assertOpen();
			if (command.type === "database.domain.publish") {
				if (publicationStartupJournal === void 0) throw new Error("Agent publication lost its request-local preparation facts");
				startupJournalRequested = publicationStartupJournal;
			} else startupJournalRequested = readRequestPreparation();
			try {
				return executeCommand(command);
			} finally {
				startupJournalRequested = false;
			}
		},
		[SQLITE_WORKER_CLOSE_RECEIPT]() {
			return closeReceipt;
		},
		close() {
			closed = true;
			closeReceipt = void 0;
			closeReceipt = closeAgentDatabaseExecution({
				database,
				identity,
				closeDomain: () => domain.close(),
				releaseBorrow,
				releaseSharedBorrow: () => sharedBorrow?.release()
			});
		}
	};
}
//#endregion
export { createSqliteWorkerBackend, openExistingSqliteWorkerBackend };
