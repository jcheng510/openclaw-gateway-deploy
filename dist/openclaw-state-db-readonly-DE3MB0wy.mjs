import { t as createDeferredCore } from "./deferred-D0La5CRk.mjs";
import { i as resolveGlobalSingleton } from "./global-singleton-BfHBYj6Y.mjs";
import { r as getAsyncWorkSignal, t as AsyncWorkScope } from "./async-work-scope-ClifbwQr.mjs";
import { t as hasErrnoCode } from "./errno-FR4CRyya.mjs";
import { t as assertExistingDatabaseIdentity } from "./sqlite-worker-identity-Dggu-rKK.mjs";
import { a as prepareSqliteReadOnlyLocationFromOwnedDatabase } from "./sqlite-readonly-location-C_s7qsHQ.mjs";
import { r as runWithSqliteBusyTimeout } from "./sqlite-busy-timeout-DYrW2wFu.mjs";
import { t as isPromiseLike } from "./promise-like-D7-l5Fsp.mjs";
import { i as SqliteCoordinatorError, s as throwSqliteLifecycleErrors } from "./sqlite-lifecycle-errors-Q-hsFPSB.mjs";
import { l as retainSnapshotTempDirectory, t as SqliteSnapshotCleanupError, u as retainSnapshotWork } from "./sqlite-readonly-location-cleanup-HvAn98XM.mjs";
import { a as withSqlitePostCommitPublications } from "./sqlite-post-commit-Dih1WMKX.mjs";
import { a as runSqliteImmediateTransactionSync } from "./sqlite-transaction-2VkikDo-.mjs";
import { l as observeOpenClawDatabaseMaintenanceResource, o as getOpenClawDatabaseMaintenanceScope, t as StateDatabaseReadAdmissionInvalidatedError } from "./openclaw-state-db-async-lifecycle-D4cx8OBO.mjs";
import { n as existingPathOrUndefined, s as resolveOpenClawStateSqlitePath } from "./openclaw-state-db.paths-rJI64Ab5.mjs";
import { i as readSqliteSourceContentVersionSync, n as prepareSqliteReadOnlyLocationAsync, r as prepareSqliteReadOnlyLocationSync, t as prepareSqliteReadOnlyLocation } from "./sqlite-snapshot-source-DgqadUes.mjs";
import { a as withOpenClawStateReadOnlyLocation, i as openOpenClawStateReadOnlyLocation, t as assertStateReadSchema } from "./openclaw-state-db-read-connection-DJObJIAO.mjs";
import { S as retainOpenClawStateDatabaseForIndependentRead, _ as registerOpenClawStateDatabaseAsyncResource, f as openClawStateDatabaseCache, n as captureOpenClawStateDatabaseReadAdmission, t as borrowOpenClawStateDatabaseForAsyncRead, y as requireOpenClawStateDatabaseIdentity } from "./openclaw-state-db-cache-IAib4pqp.mjs";
import { a as isExistingOpenClawStateSchema } from "./openclaw-state-db-schema-policy-Ci755wWB.mjs";
import { t as createOpenClawStateReadTransport } from "./openclaw-state-read-worker-N851KEmP.mjs";
import { n as captureOpenClawStateReadWorkerContext } from "./openclaw-state-worker-context-C_iAE7YK.mjs";
import { lstatSync } from "node:fs";
import path from "node:path";
import { AsyncLocalStorage } from "node:async_hooks";
//#region src/state/openclaw-state-db-content-version.ts
/** The read-only owner has checked retained scopes and exited discovery first. */
function readAdmittedStateContentVersion(pathname, env) {
	const assertCurrent = () => {
		getOpenClawDatabaseMaintenanceScope()?.assertReadAdmission();
		openClawStateDatabaseCache.assertOpenClawStateDatabaseFreshOpenAllowedAtPath(pathname, env);
	};
	assertCurrent();
	if (existingPathOrUndefined(pathname) === void 0) return;
	const version = readSqliteSourceContentVersionSync(pathname);
	assertCurrent();
	return version === void 0 ? void 0 : `${pathname}:${isExistingOpenClawStateSchema(pathname)}:${version}`;
}
//#endregion
//#region src/state/openclaw-state-db-transaction.ts
const managedStateTransactions = resolveGlobalSingleton(Symbol.for("openclaw.managedStateTransactions"), () => /* @__PURE__ */ new WeakSet());
/** Only the synchronous transaction owner may lend its uncommitted authority rows. */
function isManagedStateTransaction(database) {
	return database.isTransaction && managedStateTransactions.has(database);
}
function runManagedStateTransaction(database, operation, options) {
	if (database.isTransaction && !managedStateTransactions.has(database)) throw new Error("Cannot join an unmanaged shared-state transaction; enter through runOpenClawStateWriteTransaction before BEGIN.");
	const transaction = () => withSqlitePostCommitPublications(database, () => {
		const outer = !database.isTransaction;
		if (outer) managedStateTransactions.add(database);
		try {
			return runSqliteImmediateTransactionSync(database, operation, options);
		} finally {
			if (outer) managedStateTransactions.delete(database);
		}
	});
	return options.busyTimeoutMs === void 0 ? transaction() : runWithSqliteBusyTimeout(database, options.busyTimeoutMs, transaction);
}
//#endregion
//#region src/state/openclaw-state-db-readonly-reuse.ts
/** Current-authority guards can borrow their writer; discovery sees committed rows. */
function withCachedOpenClawStateDatabaseReadOnly(operation, pathname, currentAuthority) {
	const opened = openClawStateDatabaseCache.getCachedOpenClawStateDatabase(pathname, { readOnly: true });
	if (!opened?.db.isOpen) return { reused: false };
	const ownedTransaction = currentAuthority && isManagedStateTransaction(opened.db);
	if (opened.db.isTransaction && !ownedTransaction) return { reused: false };
	try {
		assertStateReadSchema(opened.db, pathname);
		observeOpenClawDatabaseMaintenanceResource(opened.db);
		const value = operation(opened);
		if (ownedTransaction && isPromiseLike(value)) throw new SqliteCoordinatorError("SQLite current-authority read must remain synchronous");
		return {
			reused: true,
			value
		};
	} catch (error) {
		openClawStateDatabaseCache.evictOpenClawStateDatabaseAfterCorruption(opened, error);
		throw error;
	}
}
/** A native read borrow can avoid copying only while its original physical path still matches. */
function canReadWarmNativeSourceIndependently(database, pathname, admittedIdentity) {
	const identity = requireOpenClawStateDatabaseIdentity(database);
	if (identity.key !== admittedIdentity) return false;
	try {
		assertExistingDatabaseIdentity(pathname, identity.key);
		return true;
	} catch {
		return false;
	}
}
//#endregion
//#region src/state/openclaw-state-read-error.ts
function mapOpenClawStateReadError(mapError, read) {
	const receipt = { phase: "before-read" };
	try {
		const result = read(receipt);
		return mapError ? result.catch((error) => {
			throw mapError(error, receipt.phase);
		}) : result;
	} catch (error) {
		throw mapError ? mapError(error, receipt.phase) : error;
	}
}
function observeReadOutcome(receipt, outcome) {
	if (!outcome) return;
	const admitted = "error" in outcome ? outcome.sourceAdmitted : outcome.value.type === "admit" ? void 0 : outcome.value.sourceAdmitted;
	if (admitted === true) receipt.phase = "read";
	else if (admitted === false && receipt.phase !== "read") receipt.phase = "before-read";
}
//#endregion
//#region src/state/openclaw-state-read-scope.ts
/** Normal drainage and explicit abort retain the selected callback's context. */
function bindRetainedReadScope(scope) {
	const context = scope.work.run(() => AsyncLocalStorage.snapshot());
	return {
		run: (operation) => context(() => runRetainedReadScope(scope, () => scope.work.track(operation))),
		abort: (reason) => context(() => scope.work.beginClose(reason))
	};
}
/** Closing retains custody for accepted readers, but never admits a new reader. */
function assertRetainedReadScopeAdmission(pathname, scopes) {
	if (scopes.some((scope) => scope?.path === pathname && (!scope.active || scope.work.isClosing))) throw new StateDatabaseReadAdmissionInvalidatedError("Shared-state read scope is closing or closed; retry the operation in a current scope.");
}
function createRetainedReadScope(pathname, identity, cleanup) {
	let pending;
	let unregister;
	const scope = {
		path: pathname,
		active: true,
		work: new AsyncWorkScope(),
		resources: /* @__PURE__ */ new Set(),
		close() {
			if (!scope.active) return Promise.resolve();
			unregister ??= registerOpenClawStateDatabaseAsyncResource({ async close(current) {
				if (!current || current.key === identity.key || current.canonicalPath === identity.canonicalPath) await scope.close();
			} });
			return pending ??= (async () => {
				await scope.work.drain();
				const settled = await Promise.allSettled([...scope.resources].map((resource) => resource.close()));
				throwSqliteLifecycleErrors(settled.flatMap((result) => result.status === "rejected" ? [result.reason] : []), "Shared-state read scope drainage failed");
				await cleanup?.();
				scope.active = false;
				unregister?.();
			})().finally(() => {
				pending = void 0;
			});
		}
	};
	return scope;
}
async function runRetainedReadScope(scope, operation) {
	let outcome;
	const errors = [];
	try {
		outcome = { value: await operation() };
	} catch (error) {
		outcome = { error };
		errors.push(error);
	}
	try {
		await scope.close();
	} catch (error) {
		errors.push(error);
	}
	throwSqliteLifecycleErrors(errors, "Shared-state read scope and cleanup failed");
	if ("error" in outcome) throw outcome.error;
	return outcome.value;
}
/** Leave synchronous admission before native cleanup can reenter a reader. */
function runSynchronousReadScope(scope, operation) {
	let result;
	let failed = false;
	let failure;
	const cleanupErrors = [];
	try {
		result = operation();
		if (isPromiseLike(result)) throw new SqliteCoordinatorError("SQLite metadata snapshot scope must remain synchronous");
	} catch (error) {
		failed = true;
		failure = error;
	} finally {
		scope.leave();
		for (const reader of scope.readers.values()) try {
			if (!reader.close()) cleanupErrors.push(/* @__PURE__ */ new Error("Shared-state metadata snapshot cleanup is incomplete."));
		} catch (error) {
			cleanupErrors.push(error);
		}
		scope.readers.clear();
	}
	if (cleanupErrors.length) throw new AggregateError(failed ? [failure, ...cleanupErrors] : cleanupErrors, "Shared-state metadata snapshot cleanup failed.");
	if (failed) throw failure;
	return result;
}
//#endregion
//#region src/state/openclaw-state-db-readonly.ts
const artifactPreservingReads = resolveGlobalSingleton(Symbol.for("openclaw.artifactPreservingStateReads"), () => new AsyncLocalStorage());
const disposableStateReads = resolveGlobalSingleton(Symbol.for("openclaw.disposableStateReads"), () => new AsyncLocalStorage());
const stateSnapshotReads = resolveGlobalSingleton(Symbol.for("openclaw.stateSnapshotReads"), () => new AsyncLocalStorage());
/** Opaque identity for derived facts scoped to these owned private database bytes. */
function getActiveOpenClawStateDatabaseReadSnapshot(options = {}) {
	const current = stateSnapshotReads.getStore();
	return current?.path === resolveReadOnlyPath(options) ? current : void 0;
}
/** Resolve a composite read from one online snapshot without redirecting live writers. */
async function withOpenClawStateDatabaseReadSnapshot(operation, options = {}) {
	const pathname = resolveReadOnlyPath(options);
	const current = stateSnapshotReads.getStore();
	if (current?.active && current.path === pathname || !existingPathOrUndefined(pathname)) return await operation();
	const env = options.env ?? process.env;
	const callerSignal = getAsyncWorkSignal();
	const controller = new AbortController();
	let closeSnapshotWork;
	const run = async () => {
		let admission;
		let prepared;
		try {
			openClawStateDatabaseCache.assertOpenClawStateDatabaseFreshOpenAllowedAtPath(pathname, env);
			admission = captureOpenClawStateDatabaseReadAdmission(pathname);
			prepared = await prepareSqliteReadOnlyLocation(pathname, {
				preserveSourceArtifacts: isArtifactPreservingStateRead(),
				signal: controller.signal
			});
		} catch (error) {
			throw new Error(`Cannot read shared state for discovery: ${pathname}. Retry after the current state operation completes. ${String(error)}`, { cause: error });
		}
		const releaseSource = retainSnapshotTempDirectory(prepared.cleanupRoot ?? path.dirname(prepared.location));
		const snapshot = Object.assign(createRetainedReadScope(pathname, admission.identity, async () => {
			releaseSource();
			let cause;
			try {
				if (await prepared.cleanupAsync()) return;
			} catch (error) {
				cause = error;
			}
			throw new SqliteSnapshotCleanupError(`Shared-state discovery snapshot cleanup failed: ${prepared.cleanupRoot ?? pathname}`, { cause });
		}), {
			location: prepared.location,
			env
		});
		const lifecycle = stateSnapshotReads.run(snapshot, () => bindRetainedReadScope(snapshot));
		closeSnapshotWork = lifecycle.abort;
		const closeFromCaller = () => lifecycle.abort(callerSignal?.reason);
		callerSignal?.addEventListener("abort", closeFromCaller, { once: true });
		if (callerSignal?.aborted) closeFromCaller();
		try {
			return await lifecycle.run(async () => {
				controller.signal.throwIfAborted();
				openClawStateDatabaseCache.assertOpenClawStateDatabaseFreshOpenAllowedAtPath(pathname, env);
				admission.assertCurrent();
				return await operation();
			});
		} finally {
			callerSignal?.removeEventListener("abort", closeFromCaller);
		}
	};
	return await retainSnapshotWork(run(), () => {
		controller.abort(/* @__PURE__ */ new Error("Shared-state snapshot admission closed"));
		closeSnapshotWork?.(controller.signal.reason);
	});
}
/** The caller owns this private database and removes its files after the scope closes. */
async function withDisposableOpenClawStateReads(pathname, operation) {
	const resolvedPath = resolveReadOnlyPath({ path: pathname });
	const scope = createRetainedReadScope(resolvedPath, captureOpenClawStateDatabaseReadAdmission(resolvedPath).identity);
	return await runRetainedReadScope(scope, () => disposableStateReads.run([...disposableStateReads.getStore() ?? [], scope], operation));
}
function requiresArtifactPreservingSnapshot(pathname) {
	return isArtifactPreservingStateRead() && !disposableStateReads.getStore()?.some((scope) => scope.active && scope.path === pathname);
}
/** Admission scopes every nested reader without changing normal live-read semantics. */
function withArtifactPreservingStateReads(operation) {
	return artifactPreservingReads.run(true, operation);
}
function isArtifactPreservingStateRead() {
	return artifactPreservingReads.getStore() === true;
}
const synchronousReadSnapshots = resolveGlobalSingleton(Symbol.for("openclaw.synchronousStateReadSnapshots"), () => ({ current: void 0 }));
/** One synchronous metadata operation shares private bytes, never later admission reads. */
function withSynchronousArtifactPreservingStateSnapshot(operation, options) {
	if (options?.current) {
		resolveReadOnlyPath(options.current);
		const inherited = synchronousReadSnapshots.current;
		return stateSnapshotReads.exit(() => {
			synchronousReadSnapshots.current = void 0;
			try {
				return withArtifactPreservingStateReads(() => withSynchronousArtifactPreservingStateSnapshot(operation));
			} finally {
				synchronousReadSnapshots.current = inherited;
			}
		});
	}
	if (!isArtifactPreservingStateRead() || synchronousReadSnapshots.current) return operation();
	const readers = /* @__PURE__ */ new Map();
	synchronousReadSnapshots.current = readers;
	return runSynchronousReadScope({
		readers,
		leave: () => {
			synchronousReadSnapshots.current = void 0;
		}
	}, operation);
}
function resolveReadOnlyPath(options) {
	const pathname = path.resolve(options.path ?? resolveOpenClawStateSqlitePath(options.env ?? process.env));
	assertRetainedReadScopeAdmission(pathname, [stateSnapshotReads.getStore(), ...disposableStateReads.getStore() ?? []]);
	isExistingOpenClawStateSchema(pathname);
	return pathname;
}
function withOpenClawStateDatabaseReadOnlyIfOpen(operation, pathname, currentAuthority = false) {
	const snapshot = stateSnapshotReads.getStore();
	if (snapshot?.active && snapshot.path === pathname) {
		openClawStateDatabaseCache.assertOpenClawStateDatabaseFreshOpenAllowedAtPath(pathname, snapshot.env);
		return {
			reused: true,
			value: withOpenClawStateReadOnlyLocation(operation, pathname, snapshot.location)
		};
	}
	return withCachedOpenClawStateDatabaseReadOnly(operation, pathname, currentAuthority);
}
function withFreshOpenClawStateDatabaseReadOnly(operation, options, pathname) {
	const env = options.env ?? process.env;
	openClawStateDatabaseCache.assertOpenClawStateDatabaseFreshOpenAllowedAtPath(pathname, env);
	const readers = synchronousReadSnapshots.current;
	if (readers && requiresArtifactPreservingSnapshot(pathname)) {
		let opened = readers.get(pathname);
		if (!opened) {
			opened = openOpenClawStateReadOnlyLocation(pathname, prepareSqliteReadOnlyLocationSync(pathname));
			readers.set(pathname, opened);
		}
		assertStateReadSchema(opened.database.db, pathname);
		const result = operation(opened.database);
		if (isPromiseLike(result)) throw new SqliteCoordinatorError("SQLite metadata snapshot read must remain synchronous");
		return result;
	}
	const prepared = requiresArtifactPreservingSnapshot(pathname) ? prepareSqliteReadOnlyLocationSync(pathname) : void 0;
	return withOpenClawStateReadOnlyLocation(operation, pathname, prepared ?? pathname);
}
/** Read shared state without joining writers; admission inherits artifact preservation. */
function withOpenClawStateDatabaseReadOnly(operation, options = {}) {
	const pathname = resolveReadOnlyPath(options);
	if (synchronousReadSnapshots.current?.has(pathname)) return withFreshOpenClawStateDatabaseReadOnly(operation, options, pathname);
	const reused = withOpenClawStateDatabaseReadOnlyIfOpen(operation, pathname);
	if (reused.reused) return reused.value;
	return withFreshOpenClawStateDatabaseReadOnly(operation, options, pathname);
}
/** A missing pathname is not absence while this read owner can serve retained state. */
function isOpenClawStateDatabaseDefinitelyAbsent(env = process.env) {
	try {
		const pathname = resolveReadOnlyPath({ env });
		const snapshot = stateSnapshotReads.getStore();
		if (synchronousReadSnapshots.current?.has(pathname) || snapshot?.active && snapshot.path === pathname || openClawStateDatabaseCache.getCachedOpenClawStateDatabase(pathname)?.db.isOpen) return false;
		try {
			lstatSync(pathname);
			return false;
		} catch (error) {
			return hasErrnoCode(error, "ENOENT");
		}
	} catch {
		return false;
	}
}
/** Read existing shared state while preserving non-missing filesystem failures. */
function withExistingOpenClawStateDatabaseReadOnly(operation, options = {}) {
	const pathname = resolveReadOnlyPath(options);
	if (synchronousReadSnapshots.current?.has(pathname)) return withFreshOpenClawStateDatabaseReadOnly(operation, options, pathname);
	const reused = withOpenClawStateDatabaseReadOnlyIfOpen(operation, pathname);
	if (reused.reused) return reused.value;
	const existingPath = existingPathOrUndefined(pathname);
	return existingPath === void 0 ? void 0 : withFreshOpenClawStateDatabaseReadOnly(operation, options, existingPath);
}
/** Fixed reads observe committed state unless their owner explicitly selected a snapshot. */
function executeExistingOpenClawStateRead(options, command, { context, current, mapError, signal, preferIndependentWarmRead } = {}) {
	return mapOpenClawStateReadError(mapError, (receipt) => {
		context?.admission.assertCurrent();
		const execute = () => executeRetainedOpenClawStateRead(options, command, receipt, context, signal, preferIndependentWarmRead);
		const read = current ? () => stateSnapshotReads.exit(execute) : execute;
		return context?.runInCapturedSchemaScope ? context.runInCapturedSchemaScope(read) : read();
	});
}
function executeRetainedOpenClawStateRead(options, command, receipt, capturedContext, signal, preferIndependentWarmRead) {
	const pathname = resolveReadOnlyPath(options);
	const current = stateSnapshotReads.getStore();
	const snapshot = current?.active && current.path === pathname ? current : void 0;
	const scopes = [...snapshot ? [snapshot] : [], ...(disposableStateReads.getStore() ?? []).filter((scope) => scope.active && scope.path === pathname)];
	const env = snapshot?.env ?? options.env;
	const context = capturedContext ?? captureOpenClawStateReadWorkerContext({
		path: pathname,
		env
	});
	if (capturedContext) {
		if (context.admission.databasePath !== pathname) throw new Error("Shared-state read context does not match its selected source");
		context.maintenanceScope?.assertAdmission();
		context.admission.assertCurrent();
	}
	const preserveArtifacts = requiresArtifactPreservingSnapshot(pathname);
	const controller = new AbortController();
	const readSignal = signal ? AbortSignal.any([signal, controller.signal]) : controller.signal;
	const run = async () => {
		const producerSettled = createDeferredCore();
		const transport = createOpenClawStateReadTransport(command);
		let cleanupPending;
		let transportStopped = false;
		let cleaned = false;
		let validated = false;
		const acceptanceErrors = [];
		let borrowed;
		let prepared;
		let expectedIdentity;
		let releasePreparedSource;
		const assertReadLifetime = () => {
			readSignal.throwIfAborted();
			context.maintenanceScope?.assertAdmission();
			context.admission.assertCurrent();
			borrowed?.assertCurrent();
			if (expectedIdentity !== void 0) assertExistingDatabaseIdentity(pathname, expectedIdentity);
			if (scopes.some((scope) => !scope.active)) throw new Error("Shared-state read scope is closed");
		};
		const authority = {
			signal: readSignal,
			assertCurrent() {
				assertReadLifetime();
				openClawStateDatabaseCache.assertOpenClawStateDatabaseOpenAllowed(pathname, "cached-read");
			}
		};
		const cleanup = () => {
			if (cleaned) return Promise.resolve();
			return cleanupPending ??= (async () => {
				if (!transportStopped) {
					await transport.close();
					transportStopped = true;
				}
				await producerSettled.promise;
				if (prepared) {
					releasePreparedSource?.();
					if (!await prepared.cleanupAsync()) throw new Error(`Shared-state read snapshot cleanup failed: ${prepared.cleanupRoot ?? pathname}`);
					prepared = void 0;
				}
				if (!validated) {
					validated = true;
					try {
						authority.assertCurrent();
					} catch (error) {
						acceptanceErrors.push(error);
					}
				}
				borrowed?.release();
				borrowed = void 0;
				cleaned = true;
				unregister();
				for (const scope of scopes) scope.resources.delete(resource);
			})().finally(() => {
				cleanupPending = void 0;
			});
		};
		const resource = { async close() {
			controller.abort(/* @__PURE__ */ new Error("Shared-state read admission closed"));
			await cleanup();
		} };
		const unregister = registerOpenClawStateDatabaseAsyncResource({ async close(identity) {
			if (!identity || identity.key === context.admission.identity.key || identity.canonicalPath === context.admission.identity.canonicalPath) await resource.close();
		} });
		context.maintenanceScope?.own(resource, "shared-resources", () => resource.close());
		for (const scope of scopes) scope.resources.add(resource);
		const read = async () => {
			assertReadLifetime();
			let nativeSource;
			if (snapshot) openClawStateDatabaseCache.assertOpenClawStateDatabaseOpenAllowed(pathname, "cached-read");
			else if (preserveArtifacts) {
				const native = borrowOpenClawStateDatabaseForAsyncRead(pathname, "cached-read");
				borrowed = native;
				nativeSource = native?.database;
			} else borrowed = retainOpenClawStateDatabaseForIndependentRead(pathname, "cached-read");
			if (!snapshot && !borrowed && !existingPathOrUndefined(pathname)) return;
			const independentWarmSource = nativeSource && preferIndependentWarmRead && canReadWarmNativeSourceIndependently(nativeSource, pathname, context.admission.identity.key);
			let location = snapshot?.location ?? pathname;
			if (nativeSource && !independentWarmSource) {
				prepared = await prepareSqliteReadOnlyLocationFromOwnedDatabase(nativeSource.db, authority.assertCurrent, authority.signal, "async");
				location = prepared.location;
			} else if (!snapshot && preserveArtifacts && !independentWarmSource) {
				await transport.validateFresh(context, authority);
				authority.assertCurrent();
				prepared = await prepareSqliteReadOnlyLocationAsync(pathname, {
					preserveSourceArtifacts: preserveArtifacts,
					signal: authority.signal
				});
				location = prepared.location;
			}
			if (!snapshot && !prepared) expectedIdentity = context.admission.identity.key;
			if (prepared) {
				authority.assertCurrent();
				releasePreparedSource = retainSnapshotTempDirectory(prepared.cleanupRoot ?? path.dirname(prepared.location));
			}
			receipt.phase = "unobserved";
			const outcome = await transport.read({
				context,
				location,
				checkFreshAdmission: !borrowed,
				expectedIdentity,
				snapshotRoot: prepared?.cleanupRoot
			}, authority);
			observeReadOutcome(receipt, outcome);
			const sourceAdmitted = "error" in outcome ? outcome.sourceAdmitted : outcome.value.type !== "admit" && outcome.value.sourceAdmitted;
			try {
				authority.assertCurrent();
				if (sourceAdmitted) borrowed?.observe();
			} catch (error) {
				if (!("error" in outcome)) throw error;
				acceptanceErrors.push(error);
			}
			if ("error" in outcome) throw outcome.error;
			return outcome.value;
		};
		const errors = [];
		const cleanupErrors = [];
		let result;
		try {
			result = await read();
		} catch (error) {
			errors.push(error);
		} finally {
			producerSettled.resolve();
		}
		try {
			await cleanup();
		} catch (error) {
			cleanupErrors.push(error);
		}
		errors.push(...[...new Set(acceptanceErrors)].filter((error) => !errors.includes(error)), ...cleanupErrors);
		throwSqliteLifecycleErrors(errors, "Shared-state read and cleanup failed");
		return result;
	};
	const tracked = scopes.reduceRight((operation, scope) => () => scope.work.track(operation), run);
	const maintenance = context.maintenanceScope;
	return retainSnapshotWork(maintenance ? maintenance.run(() => maintenance.track(tracked())) : tracked(), () => controller.abort(/* @__PURE__ */ new Error("Shared-state read admission closed")));
}
/** Read existing shared state without creating or updating its SQLite sidecars. */
function withExistingOpenClawStateDatabaseArtifactPreservingReadOnly(operation, options = {}, openStateSchemaReadAdmission) {
	if (openStateSchemaReadAdmission) return withExistingOpenClawStateDatabaseCurrentReadOnly(operation, options, openStateSchemaReadAdmission);
	return withArtifactPreservingStateReads(() => withExistingOpenClawStateDatabaseReadOnly(operation, options));
}
/** Publication guards need current rows, never an inherited discovery snapshot. */
function withExistingOpenClawStateDatabaseCurrentReadOnly(operation, options = {}, openStateSchemaReadAdmission) {
	const pathname = resolveReadOnlyPath(options);
	return stateSnapshotReads.exit(() => {
		if (!openStateSchemaReadAdmission) {
			const reused = withOpenClawStateDatabaseReadOnlyIfOpen(operation, pathname, true);
			if (reused.reused) return reused.value;
		}
		if (existingPathOrUndefined(pathname) === void 0) return;
		openClawStateDatabaseCache.assertOpenClawStateDatabaseFreshOpenAllowedAtPath(pathname, options.env ?? process.env);
		return withOpenClawStateReadOnlyLocation(operation, pathname, prepareSqliteReadOnlyLocationSync(pathname), openStateSchemaReadAdmission);
	});
}
/** Preserve source artifacts while allowing the caller to progress during snapshot preparation. */
function withExistingOpenClawStateDatabaseArtifactPreservingReadOnlyAsync(operation, options = {}) {
	return withArtifactPreservingStateReads(async () => {
		const pathname = resolveReadOnlyPath(options);
		const reused = withOpenClawStateDatabaseReadOnlyIfOpen(operation, pathname);
		if (reused.reused) return reused.value;
		if (existingPathOrUndefined(pathname) === void 0) return;
		const env = options.env ?? process.env;
		openClawStateDatabaseCache.assertOpenClawStateDatabaseFreshOpenAllowedAtPath(pathname, env);
		if (!requiresArtifactPreservingSnapshot(pathname)) return withOpenClawStateReadOnlyLocation(operation, pathname, pathname);
		const prepared = await prepareSqliteReadOnlyLocation(pathname, { preserveSourceArtifacts: true });
		try {
			openClawStateDatabaseCache.assertOpenClawStateDatabaseFreshOpenAllowedAtPath(pathname, env);
		} catch (error) {
			prepared.cleanup();
			throw error;
		}
		return withOpenClawStateReadOnlyLocation(operation, pathname, prepared);
	});
}
function readCurrentOpenClawStateDatabaseContentVersion(options = {}) {
	const pathname = resolveReadOnlyPath(options);
	const env = options.env ?? process.env;
	return stateSnapshotReads.exit(() => readAdmittedStateContentVersion(pathname, env));
}
//#endregion
export { readCurrentOpenClawStateDatabaseContentVersion as a, withExistingOpenClawStateDatabaseArtifactPreservingReadOnly as c, withExistingOpenClawStateDatabaseReadOnly as d, withOpenClawStateDatabaseReadOnly as f, runManagedStateTransaction as h, isOpenClawStateDatabaseDefinitelyAbsent as i, withExistingOpenClawStateDatabaseArtifactPreservingReadOnlyAsync as l, withSynchronousArtifactPreservingStateSnapshot as m, getActiveOpenClawStateDatabaseReadSnapshot as n, withArtifactPreservingStateReads as o, withOpenClawStateDatabaseReadSnapshot as p, isArtifactPreservingStateRead as r, withDisposableOpenClawStateReads as s, executeExistingOpenClawStateRead as t, withExistingOpenClawStateDatabaseCurrentReadOnly as u };
