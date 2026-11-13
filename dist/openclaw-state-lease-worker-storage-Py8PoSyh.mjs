import { s as throwSqliteLifecycleErrors } from "./sqlite-lifecycle-errors-Q-hsFPSB.mjs";
import { n as OpenClawStateLeaseError } from "./openclaw-state-lease-error-Ds9BTWol.mjs";
import { n as startOpenClawStateLeaseTimer } from "./openclaw-state-lease-heartbeat-N-FrPH5_.mjs";
import { r as leaseHeartbeatState } from "./openclaw-state-lease-heartbeat-shared-CaaucrDI.mjs";
import { n as withOpenClawStateLeaseWorkerAdmission, r as withOpenClawStateLeasesWorkerAdmission } from "./openclaw-state-lease-worker-owner-CP__faVy.mjs";
//#region src/state/openclaw-state-lease-worker-storage.ts
function admittedWorkerOperation(context, operation) {
	return async (admission) => {
		const { runOpenClawStateWorkerOperation } = await import("./openclaw-state-worker-store-Bp_XCEWM.mjs");
		return runOpenClawStateWorkerOperation(context, (scope) => operation(scope, admission.identity), {
			assertCurrent: admission.assertCurrent,
			createAdmission: admission.createAdmission
		});
	};
}
/** Preserve the original admission, maintenance scope and coordinator runtime. */
function createOpenClawStateLeaseWorkerStorage(context, processBound = false) {
	const storage = {
		path: context.admission.databasePath,
		assertCurrent() {
			context.maintenanceScope?.assertAdmission();
			context.admission.assertCurrent();
		},
		async withRetainedStartup(operation, assertCurrent) {
			assertCurrent();
			const { runOpenClawStateWorkerOperation } = await import("./openclaw-state-worker-store-Bp_XCEWM.mjs");
			return runOpenClawStateWorkerOperation(context, () => operation(context), { assertCurrent });
		},
		acquire(owner, leaseMs, operationLabel, signal, observeExpiry = false) {
			return owner.runLifecycle("acquire", admittedWorkerOperation(context, (scope, identity) => scope.execute({
				type: "stateLease.acquire",
				input: {
					identity,
					leaseMs,
					operationLabel,
					processBound,
					...observeExpiry ? { observeExpiry: true } : {}
				}
			}, { signal })));
		},
		verify(owner, signal) {
			return owner.runLifecycle("verify", admittedWorkerOperation(context, (scope, identity) => scope.execute({
				type: "stateLease.verify",
				input: { identity }
			}, { signal })));
		},
		renew(owner, leaseMs, operationLabel, signal) {
			return owner.runLifecycle("renew", admittedWorkerOperation(context, (scope, identity) => scope.execute({
				type: "stateLease.renew",
				input: {
					identity,
					leaseMs,
					operationLabel
				}
			}, { signal })));
		},
		startTimer(owner, params) {
			const renew = () => storage.renew(owner, params.leaseMs, params.operationLabel, params.signal);
			return {
				...startOpenClawStateLeaseTimer({
					observation: params.observation,
					heartbeatMs: params.heartbeatMs,
					async renew() {
						await renew();
					},
					onRenewError(error) {
						try {
							owner.rethrowIfUncertain(error, void 0);
						} catch (uncertainty) {
							params.onLost(uncertainty);
							return;
						}
						if (error instanceof OpenClawStateLeaseError && error.code === "OPENCLAW_STATE_LEASE_LOST" || Number(Atomics.load(params.observation, leaseHeartbeatState.expiresAt)) <= Date.now()) params.onLost(error);
					},
					onLost: (error) => params.onLost(error)
				}),
				verify: () => storage.verify(owner, params.signal),
				renew
			};
		},
		release(owner, operationLabel) {
			return owner.runLifecycle("release", async (admission) => {
				const { readDatabasePathIdentity } = await import("./sqlite-worker-identity-DlMczGwb.mjs");
				const { runSqliteWorkerStoreOperation } = await import("./sqlite-worker-store-B3q06gbG.mjs");
				const { openOpenClawStateWorkerCleanupStore } = await import("./openclaw-state-worker-store-Bp_XCEWM.mjs");
				admission.assertCurrent();
				const expectedIdentity = context.admission.identity.key;
				if ((await readDatabasePathIdentity(storage.path)).key !== expectedIdentity) throw new Error("State lease cleanup cannot adopt a replacement shared database");
				admission.assertCurrent();
				const cleanupContext = {
					environment: context.environment,
					existingSchemaPath: context.existingSchemaPath
				};
				const store = await openOpenClawStateWorkerCleanupStore(storage.path, cleanupContext, admission.assertCurrent);
				if (!store) throw new Error("State lease cleanup lost its original database");
				const errors = [];
				try {
					await runSqliteWorkerStoreOperation(store, (scope) => scope.execute({
						type: "stateLease.release",
						input: {
							identity: admission.identity,
							operationLabel,
							databaseIdentity: expectedIdentity
						}
					}), cleanupContext, admission.assertCurrent, admission.createAdmission);
				} catch (error) {
					errors.push(error);
				}
				try {
					await store.close();
				} catch (error) {
					errors.push(error);
				}
				throwSqliteLifecycleErrors(errors, "State lease release and worker close failed");
			});
		}
	};
	return storage;
}
/** Retain the actual lease until every admitted worker transaction has settled. */
function runWithOpenClawStateLeaseWorker(lease, context, operation, authority) {
	return withOpenClawStateLeaseWorkerAdmission(lease, context.admission.databasePath, admittedWorkerOperation(context, operation), authority);
}
/** Share one actor operation while every original lease retains its native settlement. */
function runWithOpenClawStateLeasesWorker(leases, context, operation, authority) {
	return withOpenClawStateLeasesWorkerAdmission(leases, context, async (admission) => {
		const { runOpenClawStateWorkerOperation } = await import("./openclaw-state-worker-store-Bp_XCEWM.mjs");
		admission.assertCurrent();
		return runOpenClawStateWorkerOperation(context, (scope) => operation(scope, admission.identities), {
			assertCurrent: admission.assertCurrent,
			createAdmission: admission.createAdmission
		});
	}, authority);
}
//#endregion
export { runWithOpenClawStateLeaseWorker as n, runWithOpenClawStateLeasesWorker as r, createOpenClawStateLeaseWorkerStorage as t };
