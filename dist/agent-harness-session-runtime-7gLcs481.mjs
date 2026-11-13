import { l as resolveSessionStorePathCore } from "./paths-CQ3zRaeb.mjs";
import { c as loadSessionEntryReadOnly } from "./session-accessor.sqlite-entry-C87Sde4p.mjs";
import "./session-accessor-CGLseszP.mjs";
import { a as upsertSessionUpstreamLink, t as deleteSessionUpstreamLink } from "./session-upstream-links-CUZ0mlFi.mjs";
import { AsyncLocalStorage } from "node:async_hooks";
import { isDeepStrictEqual } from "node:util";
import { randomUUID } from "node:crypto";
//#region src/agents/harness/native-session/binding-leases.ts
/** Serializes native binding changes across processes without owning backend policy. */
function createNativeSessionBindingLeases(state, options) {
	if (!state.withCurrent) throw new Error(options.errors.atomicUpdatesRequired);
	const context = new AsyncLocalStorage();
	const update = async (key, prepare, assertCurrent) => {
		let assertPreparedCurrent;
		const store = state.withCurrent({ assertCurrent: () => {
			assertCurrent?.();
			assertPreparedCurrent?.();
		} });
		let observed = await store.observe(key);
		while (true) {
			const prepared = prepare(observed.value);
			assertPreparedCurrent = prepared.assertCurrent;
			const outcome = await store.compareAndApply(key, observed.comparison, prepared.next === void 0 ? {
				operation: "update",
				action: "keep"
			} : {
				operation: "update",
				action: "set",
				value: prepared.next,
				...prepared.ttlMs === void 0 ? {} : { ttlMs: prepared.ttlMs }
			});
			if (outcome.status !== "conflict") return prepared.next !== void 0;
			assertPreparedCurrent = void 0;
			observed = outcome.current;
		}
	};
	const transact = async (key, apply, ttlMs, assertCurrent) => {
		const deadline = Date.now() + options.lease.waitMs;
		while (true) {
			let busy = false;
			let leaseLost = false;
			let result;
			const owner = context.getStore()?.get(key);
			if (owner && owner.phase !== "held") throw options.errors.lostLease(key);
			if (owner?.failure) throw owner.failure;
			const ownedToken = owner?.token;
			const assertOwnerCurrent = () => {
				assertCurrent?.();
				owner?.assertCurrent?.();
				if (owner && (owner.phase !== "held" || owner.failure)) throw owner.failure ?? options.errors.lostLease(key);
			};
			assertOwnerCurrent();
			await update(key, (raw) => {
				busy = false;
				leaseLost = false;
				const current = readRecord(key, raw);
				const lease = current?.lease;
				const now = Date.now();
				if (ownedToken && (!lease || lease.token !== ownedToken || lease.expiresAt <= now)) {
					leaseLost = true;
					return {};
				}
				if (lease && lease.token !== ownedToken && lease.expiresAt > now) {
					busy = true;
					return {};
				}
				const applied = apply(current, ownedToken);
				const nextLease = applied.next?.lease;
				result = applied.result;
				return {
					next: applied.next,
					ttlMs: typeof ttlMs === "function" ? applied.next && ttlMs(applied.next) : ttlMs,
					assertCurrent: () => {
						if (ownedToken && lease.expiresAt <= Date.now() || nextLease && (nextLease.token !== lease?.token || nextLease.expiresAt !== lease?.expiresAt) && nextLease.expiresAt <= Date.now()) {
							const failure = options.errors.lostLease(key);
							if (owner) owner.failure = failure;
							throw failure;
						}
					}
				};
			}, assertOwnerCurrent);
			if (leaseLost) {
				const failure = options.errors.lostLease(key);
				if (owner) owner.failure = failure;
				throw failure;
			}
			if (!busy) return result;
			if (Date.now() >= deadline) throw options.errors.leaseTimeout(key);
			await sleep(options.lease.retryIntervalMs);
		}
	};
	const withLease = async (key, run, acquisition) => {
		acquisition.assertCurrent?.();
		const owned = context.getStore();
		const existing = owned?.get(key);
		if (existing) {
			if (existing.phase !== "held") throw options.errors.lostLease(key);
			const failureBeforeRun = existing.failure;
			if (failureBeforeRun) throw failureBeforeRun;
			const result = await run();
			acquisition.assertCurrent?.();
			const failureAfterRun = existing.failure;
			if (failureAfterRun) throw failureAfterRun;
			return result;
		}
		const token = randomUUID();
		const acquired = await transact(key, (current) => {
			const next = acquisition.prepareLease(current, {
				token,
				expiresAt: Date.now() + options.lease.staleMs
			});
			return {
				result: next !== void 0,
				next
			};
		}, void 0, acquisition.assertCurrent);
		acquisition.assertCurrent?.();
		if (!acquired) throw options.errors.acquisitionRejected(key);
		const owner = {
			token,
			phase: "held",
			assertCurrent: acquisition.assertCurrent
		};
		const nested = new Map(owned);
		nested.set(key, owner);
		let renewal;
		const heartbeat = setInterval(() => {
			if (!renewal) renewal = renew(key, owner).finally(() => {
				renewal = void 0;
			});
		}, options.lease.renewIntervalMs);
		heartbeat.unref();
		try {
			const result = await context.run(nested, run);
			clearInterval(heartbeat);
			await renewal;
			acquisition.assertCurrent?.();
			if (owner.failure) throw owner.failure;
			return result;
		} finally {
			clearInterval(heartbeat);
			owner.phase = "closed";
			await renewal;
			acquisition.assertCurrent?.();
			try {
				await update(key, (raw) => {
					const stored = readRecord(key, raw);
					if (stored?.lease?.token !== token) return {};
					const { lease: _lease, ...released } = stored;
					return {
						next: readRecord(key, released),
						ttlMs: options.releaseTtlMs(key, stored)
					};
				}, acquisition.assertCurrent);
			} catch (error) {
				acquisition.assertCurrent?.();
				options.onReleaseFailure?.(key, error);
			}
		}
	};
	const readRecord = (key, raw) => {
		const current = options.readRecord(raw);
		if (raw !== void 0 && !current) throw options.errors.invalidRow(key);
		return current;
	};
	const renew = async (key, owner) => {
		if (owner.failure || owner.phase !== "held") return;
		try {
			if (!await update(key, (raw) => {
				const current = readRecord(key, raw);
				const lease = current?.lease;
				const now = Date.now();
				if (!current || !lease || lease.token !== owner.token || lease.expiresAt <= now) return {};
				return {
					next: {
						...current,
						lease: {
							token: owner.token,
							expiresAt: now + options.lease.staleMs
						}
					},
					assertCurrent: () => {
						if (lease.expiresAt <= Date.now()) throw options.errors.lostLease(key);
					}
				};
			}, () => {
				owner.assertCurrent?.();
				if (owner.phase !== "held" || owner.failure) throw owner.failure ?? options.errors.lostLease(key);
			}) && owner.phase === "held") owner.failure = options.errors.lostLease(key);
		} catch (error) {
			if (owner.phase === "held") owner.failure = options.errors.lostLease(key, error);
		}
	};
	const captureLeaseAssertion = (key) => {
		const owner = context.getStore()?.get(key);
		const assertCurrent = () => {
			if (!owner || owner.phase !== "held") throw options.errors.lostLease(key);
			const lease = readRecord(key, state.lookup(key))?.lease;
			if (!lease || lease.token !== owner.token || lease.expiresAt <= Date.now()) throw options.errors.lostLease(key);
		};
		assertCurrent();
		return assertCurrent;
	};
	return {
		captureLeaseAssertion,
		transact,
		withLease,
		hasLease: (key) => context.getStore()?.has(key) === true,
		owner: (key) => context.getStore()?.get(key)
	};
}
function sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}
//#endregion
//#region src/agents/harness/native-session/binding-lifecycle.ts
/** Shared binding coordination; backend callbacks retain native ownership and retention policy. */
function createNativeSessionBindingLifecycle(state, options) {
	const leases = createNativeSessionBindingLeases(state, options);
	const exclusiveContext = new AsyncLocalStorage();
	let activeMutations = 0;
	let pendingExclusiveOperations = 0;
	let exclusiveTail = Promise.resolve();
	let mutationsDrained = [];
	const waitForMutations = async () => {
		if (activeMutations === 0) return;
		await new Promise((resolve) => {
			mutationsDrained.push(resolve);
		});
	};
	const withMutation = async (run) => {
		if (exclusiveContext.getStore() === true) return await run();
		if (pendingExclusiveOperations > 0) throw new Error(options.errors.mutationBlocked);
		activeMutations += 1;
		try {
			return await run();
		} finally {
			activeMutations -= 1;
			if (activeMutations === 0) {
				const drained = mutationsDrained;
				mutationsDrained = [];
				for (const resolve of drained) resolve();
			}
		}
	};
	const withExclusiveMutationFence = async (run) => {
		pendingExclusiveOperations += 1;
		const operation = exclusiveTail.then(async () => {
			await waitForMutations();
			return await exclusiveContext.run(true, run);
		});
		exclusiveTail = operation.then(() => void 0, () => void 0);
		try {
			return await operation;
		} finally {
			pendingExclusiveOperations -= 1;
		}
	};
	const withDeletion = async (key, deletion, run) => {
		const deleteIf = state.deleteIf?.bind(state);
		if (!deleteIf) throw new Error(options.errors.conditionalDeletionRequired);
		return await withMutation(async () => {
			deletion.assertCurrent();
			if (state.lookup(key) === void 0) {
				let active = true;
				try {
					return await run(void 0, {
						commit() {
							deletion.assertCurrent();
							if (!active || state.lookup(key) !== void 0) throw new Error(options.errors.deletionChanged);
						},
						rollback() {}
					});
				} finally {
					active = false;
				}
			}
			return await leases.withLease(key, async () => {
				const owner = leases.owner(key);
				const stored = options.readRecord(state.lookup(key));
				deletion.assertRecordCurrent(stored);
				if (!stored) throw new Error(options.errors.deletionChanged);
				const { lease: _lease, ...expectedValue } = stored;
				let deleted;
				let active = true;
				const assertActive = () => {
					deletion.assertCurrent();
					if (!active || owner.phase === "closed" || owner.failure) throw owner.failure ?? options.errors.lostLease(key);
				};
				try {
					return await run(stored, {
						commit() {
							assertActive();
							if (deleted) return;
							let removed;
							if (!deleteIf(key, (raw) => {
								const { lease, ...value } = options.readRecord(raw) ?? {};
								if (lease?.token !== owner.token || lease.expiresAt <= Date.now() || !isDeepStrictEqual(value, expectedValue)) return false;
								removed = raw;
								return true;
							}) || !removed) throw new Error(options.errors.deletionChanged);
							deleted = removed;
							owner.phase = "deleted";
						},
						rollback() {
							assertActive();
							if (!deleted) return;
							const restored = {
								...deleted,
								lease: {
									token: owner.token,
									expiresAt: Date.now() + options.lease.staleMs
								}
							};
							if (!state.registerIfAbsent(key, restored)) throw new Error(options.errors.rollbackChanged);
							deleted = void 0;
							owner.phase = "held";
						}
					});
				} finally {
					active = false;
				}
			}, deletion);
		});
	};
	return {
		captureLeaseAssertion: leases.captureLeaseAssertion,
		transact: leases.transact,
		withLease: leases.withLease,
		hasLease: leases.hasLease,
		withMutation,
		withExclusiveMutationFence,
		withDeletion
	};
}
//#endregion
//#region src/agents/harness/native-session/binding-generation.ts
/** Resolve host lineage before selecting a native queue, catalog, or connection. */
async function resolveNativeSessionBinding(params) {
	let assertCurrent = params.assertCurrent ?? (() => {});
	const assertAdmissionCurrent = () => {
		assertCurrent();
		params.signal?.throwIfAborted();
	};
	assertAdmissionCurrent();
	params.assertBinding?.(readOwnershipBinding(params));
	const authority = params.target?.sessionKey?.trim() ? captureNativeSessionGenerationAuthority({
		...params,
		target: params.target,
		assertCurrent
	}) : void 0;
	assertCurrent = authority?.assertCurrent ?? assertCurrent;
	assertAdmissionCurrent();
	let binding = params.readBinding();
	if (!binding && authority && params.target && params.generation) {
		if (!await reclaimPreparedGeneration({
			...params,
			generation: params.generation,
			reclaimStale: params.reclaimStale === true
		}, authority, assertAdmissionCurrent) && params.reclaimStale) throw params.createSupersededError(params.target.sessionId);
		binding = params.readBinding();
	}
	assertAdmissionCurrent();
	params.assertBinding?.(binding);
	return {
		binding,
		assertCurrent
	};
}
/** Let the authoritative OpenClaw generation adopt its predecessor or reclaim a stale row. */
async function reclaimNativeSessionGeneration(params) {
	params.assertCurrent?.();
	if (!params.target.sessionKey?.trim()) return true;
	const authority = captureNativeSessionGenerationAuthority(params);
	if (authority.state === "superseded") return false;
	return reclaimPreparedGeneration(params, authority);
}
/** Capture the host generation and predecessor together, then revalidate both after waits. */
function captureNativeSessionGenerationAuthority(params) {
	const readEntry = () => {
		try {
			return readBindingSessionEntry(params);
		} catch {
			return null;
		}
	};
	const entry = readEntry();
	const current = entry?.sessionId === params.target.sessionId;
	const state = entry === void 0 ? "ephemeral" : current ? "current" : "superseded";
	const previousSessionId = current ? entry.previousSessionId : void 0;
	const assertHostCurrent = () => {
		if (state === "ephemeral") return;
		const latest = readEntry();
		if (state !== "current" || !latest || latest.sessionId !== params.target.sessionId || latest.previousSessionId !== previousSessionId) throw params.createSupersededError(params.target.sessionId);
	};
	return {
		state,
		previousSessionId,
		assertHostCurrent,
		assertCurrent() {
			params.assertCurrent?.();
			assertHostCurrent();
		}
	};
}
async function reclaimPreparedGeneration(params, authority, assertCurrent = authority.assertCurrent) {
	const plan = await params.generation.prepareReclaim();
	assertCurrent();
	if (plan.kind === "resolved") return plan.result;
	if (authority.state !== "current") return false;
	params.onHostGenerationVerified?.(authority.assertHostCurrent);
	if (authority.previousSessionId === plan.expectedPreviousSessionId) {
		const adopted = await params.generation.adopt(authority.previousSessionId, assertCurrent);
		if (adopted !== "absent") return adopted !== "conflict";
	}
	if (params.reclaimStale === false) return false;
	return params.generation.reclaim(plan.expectedPreviousSessionId, assertCurrent);
}
function readOwnershipBinding(params) {
	const binding = params.readBinding();
	if (binding || !params.target) return binding;
	const entry = readBindingSessionEntry({
		...params,
		target: params.target
	});
	return entry?.sessionId === params.target.sessionId && entry.previousSessionId ? params.readBinding(entry.previousSessionId) : void 0;
}
function readBindingSessionEntry(params) {
	const { target } = params;
	return target.sessionKey?.trim() ? loadSessionEntryReadOnly({
		agentId: target.agentId,
		sessionKey: target.sessionKey.trim(),
		storePath: params.storePath?.trim() || resolveSessionStorePathCore(params.config?.session?.store, { agentId: target.agentId }),
		hydrateSkillPromptRefs: false,
		readConsistency: "latest"
	}) : void 0;
}
//#endregion
//#region src/agents/harness/native-session/initialization.ts
/** Backend binding ownership redeems the existing host initializer's exact creation handle. */
function createNativeSessionInitializationOwner(options) {
	const initializations = /* @__PURE__ */ new WeakMap();
	return {
		/** Capture cleanup ownership before any potentially committing binding or link write. */
		prepare(params) {
			const { initialization, bindingStore, identity } = params;
			initialization.assertCurrent();
			let link;
			const ownership = {
				store: bindingStore,
				identity: structuredClone(identity),
				assertCleanupAllowed: params.assertCleanupAllowed,
				cleanup: async () => {
					initialization.assertRollbackCurrent();
					if (link && deleteSessionUpstreamLink(link.sessionKey, link.agentId, {
						expected: link,
						assertCommitAllowed: initialization.assertRollbackCurrent
					}) === "changed") throw new Error(options.errors.linkChanged);
					initialization.assertRollbackCurrent();
					await cleanup?.(initialization.assertRollbackCurrent);
					initialization.assertRollbackCurrent();
				}
			};
			initializations.set(initialization, ownership);
			const cleanup = params.prepareCleanup?.();
			return {
				assertCurrent: initialization.assertCurrent,
				async bind(binding) {
					initialization.assertCurrent();
					ownership.binding = options.validateBinding(binding);
					if (!await options.writeBinding(bindingStore, identity, ownership.binding, initialization.assertCurrent)) {
						ownership.binding = void 0;
						throw new Error(options.errors.bindingChanged);
					}
					initialization.assertCurrent();
				},
				link(input) {
					initialization.assertCurrent();
					const now = Date.now();
					link = structuredClone({
						...input,
						createdAt: now,
						updatedAt: now
					});
					if (!upsertSessionUpstreamLink(input, {
						now,
						ifAbsent: true,
						assertCommitAllowed: initialization.assertCurrent
					})) {
						link = void 0;
						throw new Error(options.errors.linkWriteFailed);
					}
					initialization.assertCurrent();
				}
			};
		},
		getRollback(store, params, identity, binding) {
			const handle = params.initialization;
			if (!handle) return;
			handle.assertRollbackCurrent();
			const ownership = initializations.get(handle);
			if (!ownership && !binding) return;
			if (!ownership || ownership.store !== store || !isDeepStrictEqual(ownership.identity, identity) || binding && !isDeepStrictEqual(ownership.binding, binding)) throw new Error(options.errors.ownerChanged);
			ownership.assertCleanupAllowed?.();
			return ownership.cleanup;
		}
	};
}
//#endregion
export { createNativeSessionBindingLifecycle as a, resolveNativeSessionBinding as i, captureNativeSessionGenerationAuthority as n, reclaimNativeSessionGeneration as r, createNativeSessionInitializationOwner as t };
