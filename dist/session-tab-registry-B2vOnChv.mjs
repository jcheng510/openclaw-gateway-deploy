import { c as normalizeOptionalLowercaseString, o as normalizeLowercaseStringOrEmpty } from "./string-coerce-6kR-86XC.mjs";
import "./string-coerce-runtime-B1b8UNzb.mjs";
import { a as createDeferred } from "./extension-shared-BW58_FN4.mjs";
import { $ as getOptionalBrowserStateRuntime, A as forgetColdNativeActivity, B as hasDurableTabAlias, C as withBrowserSessionTabNativeActivity, D as activeDurableStorageKeys, E as withoutBrowserSessionTabCleanup, F as volatileSessionTabTargetKey, G as rememberVolatileTabAliases, H as hasVolatileTabAlias, I as volatileTabCleanupByTarget, J as resolveVolatileTabAlias, K as resolveDurableTabAlias, L as volatileTabsBySession, M as rememberColdNativeActivity, N as sameVolatileSessionTab, O as deleteVolatileRegistrations, P as volatileRegistrationsForTarget, Q as getBrowserStateRuntime, R as clearDurableTabAliases, S as updateBrowserSessionTab, T as withBrowserSessionTabSelection, U as hasVolatileTabExact, V as hasDurableTabExact, W as rememberDurableTabAliases, Y as resolveVolatileTabExact, Z as captureBrowserSessionTabAuthority, et as isBrowserStateRuntimeCurrent, f as getOptionalBrowserSessionTabStore, h as parseBrowserSessionTabRecord, i as compareBrowserSessionTabProfileAliases, j as readColdNativeActivity, k as deleteVolatileSessionTab, m as parseBrowserDashboardStopIntent, n as browserSessionTabNativeIdentity, o as deleteBrowserSessionTabIf, q as resolveDurableTabExact, r as browserSessionTabStorageKey, s as dispatchBrowserSessionTabIfCurrent, t as assertBrowserSessionTabAuthority, tt as readCurrentBrowserState, u as ensureBrowserSessionTabStoreReady, w as withBrowserSessionTabOperation, x as sameBrowserSessionTabRecord, y as readBrowserDashboardStopIntents, z as forgetVolatileTabAlias } from "./session-tab-store-BxAwbW3e.mjs";
import "./constants-C-i9f6FL.mjs";
import { randomUUID } from "node:crypto";
//#region extensions/browser/src/browser/session-tab-cleanup-claim.ts
/**
* Durable tab cleanup owns claims, fingerprint verification, close, and retirement.
* A concurrent touch or competing sweep cannot delete another generation's row.
*/
function isIgnorableTabCloseError(error) {
	const message = normalizeLowercaseStringOrEmpty(String(error));
	return message.includes("tab not found") || message.includes("target closed") || message.includes("target not found") || message.includes("no such target") || message.includes("no target with given id found");
}
async function claimCleanup(tab, now, kind, authority) {
	const cleanupAttemptToken = randomUUID();
	const cleanupKind = kind === "lifecycle" ? "lifecycle" : tab.cleanupKind ?? kind;
	return await updateBrowserSessionTab(tab.storageKey, (current) => {
		const record = parseBrowserSessionTabRecord(current);
		if (!record || !sameBrowserSessionTabRecord(record, tab)) return;
		return {
			...record,
			cleanupRequestedAt: now,
			cleanupAttemptToken,
			cleanupKind
		};
	}, authority) ? {
		...tab,
		cleanupRequestedAt: now,
		cleanupAttemptToken,
		cleanupKind
	} : void 0;
}
function matchesCleanupAttempt(current, tab) {
	return Boolean(current && sameBrowserSessionTabRecord({
		...current,
		lastUsedAt: tab.lastUsedAt
	}, tab));
}
async function deleteClaimedTab(tab, authority, onWarn) {
	try {
		if (tab.dashboard?.state === "stopping") {
			await updateBrowserSessionTab(tab.storageKey, (current) => {
				const record = parseBrowserSessionTabRecord(current);
				if (!matchesCleanupAttempt(record, tab) || !record.dashboard) return;
				return {
					...withoutBrowserSessionTabCleanup(record),
					dashboard: {
						...record.dashboard,
						state: "stopped"
					}
				};
			}, authority);
			return;
		}
		await deleteBrowserSessionTabIf(tab.storageKey, (current) => {
			return matchesCleanupAttempt(parseBrowserSessionTabRecord(current), tab);
		}, authority);
	} catch (error) {
		onWarn?.(`failed to delete tracked browser tab ${tab.nativeTargetId}: ${String(error)}`);
	}
}
async function closeCurrentDurableTab(tab, closeIfCurrent, getResolvedBrowserConfig) {
	const [{ getRuntimeConfig }, { resolveCdpControlPolicy }, { closeTrackedCdpTarget }, config] = await Promise.all([
		import("./plugin-sdk/runtime-config-snapshot.js"),
		import("./cdp-reachability-policy-D96Sc61k.mjs"),
		import("./cdp.helpers-DaSZQ8YZ.mjs"),
		import("./config-DhRecwIE.mjs")
	]);
	let resolved = await getResolvedBrowserConfig?.();
	if (!resolved) {
		const cfg = getRuntimeConfig();
		resolved = config.resolveBrowserConfig(cfg.browser, cfg);
	}
	const profile = config.resolveProfile(resolved, tab.profile);
	if (!profile?.cdpUrl) return { status: "ownership-mismatch" };
	if (tab.dashboard && !config.isLocalManagedProfile(profile)) return { status: "ownership-mismatch" };
	if (profile.driver === "extension" && !resolved.extensionRelayInternalTokens[profile.name]) return {
		status: "unavailable",
		reason: "extension-relay-unavailable"
	};
	const cdpControlPolicy = resolveCdpControlPolicy(profile, resolved.ssrfPolicy);
	return await closeTrackedCdpTarget({
		profileName: profile.name,
		cdpUrl: profile.cdpUrl,
		nativeTargetId: tab.nativeTargetId,
		timeoutMs: resolved.remoteCdpTimeoutMs,
		ssrfPolicy: cdpControlPolicy,
		expectedProfileFingerprint: tab.profileFingerprint,
		expectedBrowserInstanceFingerprint: tab.browserInstanceFingerprint,
		closeIfCurrent
	});
}
async function closeDurableTab(candidate, params, now, cleanupKind) {
	if (params.isCurrent?.() === false || candidate.dashboard?.state === "active" || candidate.dashboard?.state === "stopped") return 0;
	const authority = {
		...params.authority,
		runtime: params.authority?.runtime ?? getBrowserStateRuntime()
	};
	const tab = await claimCleanup(candidate, now, cleanupKind, {
		...authority,
		assertCurrent: () => {
			authority.assertCurrent?.();
			if (params.isCurrent?.() === false) throw new Error("Browser tab cleanup caller changed");
		}
	});
	if (!tab) return 0;
	const closeIfCurrent = async (dispatch) => await dispatchBrowserSessionTabIfCurrent(tab.storageKey, (current) => matchesCleanupAttempt(parseBrowserSessionTabRecord(current), tab), dispatch, authority) ?? { status: "cancelled" };
	let outcome;
	try {
		if (params.closeDurableTab) outcome = await params.closeDurableTab(tab, { closeIfCurrent });
		else if (params.closeTab) {
			const closeTab = params.closeTab;
			outcome = await closeIfCurrent(async () => {
				await closeTab({
					targetId: tab.nativeTargetId,
					nativeTargetId: tab.nativeTargetId,
					profile: tab.profile
				});
				return { status: "closed" };
			});
		} else outcome = await closeCurrentDurableTab(tab, closeIfCurrent, params.getResolvedBrowserConfig);
	} catch (error) {
		if (isIgnorableTabCloseError(error)) {
			await deleteClaimedTab(tab, authority, params.onWarn);
			return 0;
		}
		params.onWarn?.(`failed to close tracked browser tab ${tab.nativeTargetId}: ${String(error)}`);
		return 0;
	}
	if (outcome.status === "cancelled") return 0;
	if (outcome.status === "unavailable") {
		if (outcome.reason === "extension-relay-unavailable") {
			params.onWarn?.(`deferred tracked browser tab ${tab.nativeTargetId}: extension relay runtime unavailable`);
			return 0;
		}
		if (!tab.dashboard && now - tab.lastUsedAt >= 864e5) {
			params.onWarn?.(`retired unreachable tracked browser tab ${tab.nativeTargetId}: ${outcome.reason}`);
			await deleteClaimedTab(tab, authority, params.onWarn);
			return 0;
		}
		params.onWarn?.(`deferred tracked browser tab ${tab.nativeTargetId}: ${outcome.reason}`);
		return 0;
	}
	if (outcome.status === "ownership-mismatch") {
		params.onWarn?.(`retired tracked browser tab ${tab.nativeTargetId}: ownership mismatch`);
		await deleteClaimedTab(tab, authority, params.onWarn);
		return 0;
	}
	await deleteClaimedTab(tab, authority, params.onWarn);
	return outcome.status === "closed" ? 1 : 0;
}
//#endregion
//#region extensions/browser/src/browser/session-tab-sweep-selection.ts
function trackedTabIdentity(tab) {
	return tab.kind === "durable" ? `durable:${tab.storageKey}` : `volatile:${tab.sessionKey}:${volatileSessionTabTargetKey(tab)}`;
}
function selectTrackedTabsForSessions(params) {
	const volatile = [];
	for (const sessionKey of params.sessionKeys) volatile.push(...params.volatile.get(sessionKey) ?? []);
	return [...params.durable.filter((tab) => params.sessionKeys.has(tab.sessionKey)), ...volatile];
}
function selectStaleTrackedTabs(params) {
	const selected = /* @__PURE__ */ new Map();
	const activeBySession = /* @__PURE__ */ new Map();
	const nativeIdentityCounts = /* @__PURE__ */ new Map();
	const observedNativeActivity = /* @__PURE__ */ new Map();
	for (const tab of params.tabs) {
		if (tab.kind !== "durable" || tab.interactionTargetKind !== "native") continue;
		const identity = browserSessionTabNativeIdentity(tab);
		nativeIdentityCounts.set(identity, (nativeIdentityCounts.get(identity) ?? 0) + 1);
		const observedAt = readColdNativeActivity(identity);
		if (observedAt !== void 0) observedNativeActivity.set(tab.storageKey, observedAt);
	}
	const effectiveLastUsedAt = (tab) => tab.kind === "durable" ? Math.max(tab.lastUsedAt, observedNativeActivity.get(tab.storageKey) ?? 0) : tab.lastUsedAt;
	for (const tab of params.tabs) {
		if (tab.kind === "durable" && tab.dashboard) continue;
		const observedAt = tab.kind === "durable" ? observedNativeActivity.get(tab.storageKey) : void 0;
		const isActiveDurable = tab.kind === "durable" && activeDurableStorageKeys().has(tab.storageKey);
		const isUnambiguousNative = tab.kind === "durable" && tab.interactionTargetKind === "native" && nativeIdentityCounts.get(browserSessionTabNativeIdentity(tab)) === 1;
		const activitySupersedesSweep = tab.kind === "durable" && tab.cleanupKind === "sweep" && observedAt !== void 0 && observedAt >= (tab.cleanupRequestedAt ?? 0);
		if (tab.kind === "durable" && tab.cleanupAttemptToken && !activitySupersedesSweep) {
			if (tab.cleanupKind === "lifecycle" || isActiveDurable || isUnambiguousNative) selected.set(trackedTabIdentity(tab), tab);
			continue;
		}
		if (params.sessionFilter && !params.sessionFilter(tab.sessionKey)) continue;
		if (tab.kind === "durable" && !isActiveDurable && (tab.interactionTargetKind === "opaque" || !isUnambiguousNative)) continue;
		const active = activeBySession.get(tab.sessionKey) ?? [];
		active.push(tab);
		activeBySession.set(tab.sessionKey, active);
	}
	for (const tabs of activeBySession.values()) {
		tabs.sort((left, right) => effectiveLastUsedAt(left) - effectiveLastUsedAt(right) || left.trackedAt - right.trackedAt);
		if (params.idleMs && params.idleMs > 0) {
			for (const tab of tabs) if (params.now - effectiveLastUsedAt(tab) >= params.idleMs) selected.set(trackedTabIdentity(tab), tab);
		}
		const remaining = tabs.filter((tab) => !selected.has(trackedTabIdentity(tab)));
		if (params.maxTabsPerSession && params.maxTabsPerSession > 0 && remaining.length > params.maxTabsPerSession) for (const tab of remaining.slice(0, remaining.length - params.maxTabsPerSession)) selected.set(trackedTabIdentity(tab), tab);
	}
	return [...selected.values()];
}
//#endregion
//#region extensions/browser/src/browser/session-tab-untrack-selection.ts
function selectSessionTabToUntrack(params) {
	if (params.volatileIsExact && !params.hasDurableExactCandidate) return "volatile";
	if (params.durableIsExact && !params.hasVolatileExactCandidate) return "durable";
	if (params.hasVolatileCandidate && params.hasDurableCandidate) return "ambiguous";
	if (params.volatileAvailable) return "volatile";
	if (params.durableAvailable) return "durable";
	if (params.hasVolatileCandidate || params.hasDurableCandidate) return "ambiguous";
	return "missing";
}
//#endregion
//#region extensions/browser/src/browser/session-tab-tracking.ts
function normalizeProfileAliases(values) {
	return [...new Set((values ?? []).map(normalizeOptionalLowercaseString).filter((value) => Boolean(value)))].toSorted(compareBrowserSessionTabProfileAliases);
}
function resolveInteractionIdentity(params) {
	const sessionKey = normalizeOptionalLowercaseString(params.sessionKey);
	const targetId = params.targetId?.trim();
	if (!sessionKey || !targetId) return;
	const profile = normalizeOptionalLowercaseString(params.profile);
	return {
		sessionKey,
		targetId,
		route: params.route ?? { kind: "browser-control" },
		...profile ? { profile } : {}
	};
}
function isVolatileRoute(route) {
	return route.kind === "node-proxy" || Boolean(route.baseUrl);
}
function durableOwnership(params) {
	return params.ownership?.status === "durable" ? params.ownership : void 0;
}
async function deleteInvalidRecord(key, authority, onWarn) {
	try {
		await deleteBrowserSessionTabIf(key, (current) => {
			if (parseBrowserDashboardStopIntent(key, current)) return false;
			const record = parseBrowserSessionTabRecord(current);
			return !record || browserSessionTabStorageKey(record) !== key;
		}, authority);
	} catch (error) {
		onWarn?.(`failed to delete invalid browser session tab record: ${String(error)}`);
		return;
	}
	onWarn?.("deleted invalid browser session tab record");
}
async function readDurableTabs(onWarn, suppliedAuthority = {}) {
	const authority = captureBrowserSessionTabAuthority(suppliedAuthority);
	const store = getOptionalBrowserSessionTabStore(authority);
	if (!store) return [];
	await ensureBrowserSessionTabStoreReady(authority.runtime);
	const tabs = [];
	for (const entry of await store.entries()) {
		if (parseBrowserDashboardStopIntent(entry.key, entry.value)) continue;
		const record = parseBrowserSessionTabRecord(entry.value);
		if (!record || browserSessionTabStorageKey(record) !== entry.key) {
			await deleteInvalidRecord(entry.key, authority, onWarn);
			continue;
		}
		tabs.push({
			...record,
			kind: "durable",
			storageKey: entry.key
		});
	}
	return tabs;
}
function resolveVolatile(identity, options) {
	const tabs = volatileTabsBySession().get(identity.sessionKey);
	const exactKey = volatileSessionTabTargetKey(identity);
	const exact = tabs?.get(exactKey);
	if (exact) return {
		tab: exact,
		tabKey: exactKey,
		isExact: true
	};
	const exactTarget = resolveVolatileTabExact(identity);
	if (!exactTarget && hasVolatileTabExact(identity)) return;
	const target = exactTarget ?? resolveVolatileTabAlias(identity);
	if (!target) {
		if (!options?.readOnly && !hasVolatileTabAlias(identity)) forgetVolatileTabAlias(identity);
		return;
	}
	const tab = target.sessionKey === identity.sessionKey ? tabs?.get(target.tabKey) : void 0;
	if (!tab) {
		if (!options?.readOnly) forgetVolatileTabAlias(identity);
		return;
	}
	return {
		tab,
		tabKey: target.tabKey,
		isExact: Boolean(exactTarget)
	};
}
async function readDurableTabsReadOnly(suppliedAuthority = {}) {
	const authority = captureBrowserSessionTabAuthority(suppliedAuthority);
	const store = getOptionalBrowserSessionTabStore(authority);
	if (!store) {
		authority.assertCurrent?.();
		return [];
	}
	await ensureBrowserSessionTabStoreReady(authority.runtime);
	assertBrowserSessionTabAuthority(authority);
	const entries = await store.entries();
	assertBrowserSessionTabAuthority(authority);
	return entries.flatMap(({ key, value }) => {
		const record = parseBrowserSessionTabRecord(value);
		return record && browserSessionTabStorageKey(record) === key ? [{
			...record,
			kind: "durable",
			storageKey: key
		}] : [];
	});
}
/** Reads session membership without changing activity, aliases, or cleanup state. */
async function filterTrackedSessionBrowserTabs(params) {
	const sessionKey = normalizeOptionalLowercaseString(params.sessionKey);
	if (!sessionKey || params.tabs.length === 0) return [];
	const route = params.route ?? { kind: "browser-control" };
	const profile = normalizeOptionalLowercaseString(params.profile);
	const durableKeys = /* @__PURE__ */ new Set();
	const nativeIdentities = /* @__PURE__ */ new Set();
	if (!isVolatileRoute(route) && profile) for (const record of await readDurableTabsReadOnly(params.authority)) {
		if (record.sessionKey !== sessionKey || record.profile !== profile && !record.profileAliases?.includes(profile)) continue;
		durableKeys.add(record.storageKey);
		nativeIdentities.add(browserSessionTabNativeIdentity({
			...record,
			profile
		}));
	}
	return params.tabs.filter((tab) => [tab.targetId, tab.tabId].some((targetId) => {
		const identity = resolveInteractionIdentity({
			sessionKey,
			route,
			profile,
			targetId
		});
		if (!identity) return false;
		if (resolveVolatile(identity, { readOnly: true })) return true;
		const storageKey = resolveDurableTabExact(identity) ?? resolveDurableTabAlias(identity);
		return storageKey !== void 0 && durableKeys.has(storageKey) || profile !== void 0 && nativeIdentities.has(browserSessionTabNativeIdentity({
			sessionKey,
			profile,
			nativeTargetId: identity.targetId
		}));
	}));
}
function upsertVolatile(identity, aliases, profileAliases, ownership, now) {
	const state = volatileTabsBySession();
	const tabs = state.get(identity.sessionKey) ?? /* @__PURE__ */ new Map();
	const key = volatileSessionTabTargetKey(identity);
	const existing = tabs.get(key);
	tabs.set(key, {
		...identity,
		kind: "volatile",
		registration: {},
		...ownership ? { ownership } : {},
		trackedAt: existing?.trackedAt ?? now,
		lastUsedAt: now
	});
	state.set(identity.sessionKey, tabs);
	rememberVolatileTabAliases(identity, aliases, key, profileAliases);
}
async function clearDurableForVolatile(identity, authority, onCleared) {
	const mappedKey = resolveDurableTabExact(identity);
	if (!mappedKey) {
		if (authority.runtime) assertBrowserSessionTabAuthority(authority);
		onCleared();
		return true;
	}
	return await withBrowserSessionTabSelection(mappedKey, authority, async (tab) => {
		const record = parseBrowserSessionTabRecord(await tab.lookup());
		assertBrowserSessionTabAuthority(authority);
		if (record) {
			if (!await tab.deleteIf((current) => {
				const selected = parseBrowserSessionTabRecord(current);
				return Boolean(selected && sameBrowserSessionTabRecord(selected, record));
			})) return false;
		} else {
			clearDurableTabAliases(mappedKey);
			activeDurableStorageKeys().delete(mappedKey);
		}
		assertBrowserSessionTabAuthority(authority);
		onCleared();
		return true;
	});
}
function withBrowserDashboardRegistration(targetId, profile, authority, register) {
	if (authority.dashboardRegistration) return register(authority);
	const registration = {
		kind: "dashboard-registration",
		targetId,
		profile
	};
	const current = {
		...authority,
		dashboardRegistration: registration,
		assertCurrent: () => {
			authority.assertCurrent?.();
			if (registration.closeDispatched) throw new Error("Browser dashboard close was dispatched during registration");
		}
	};
	return withBrowserSessionTabOperation(registration, current, () => register(current));
}
/** Starts tracking a browser tab for later session cleanup. */
async function trackSessionBrowserTab(input) {
	const params = {
		...input,
		authority: captureBrowserSessionTabAuthority(input.authority)
	};
	const identity = resolveInteractionIdentity(params);
	if (!identity) return;
	const ownership = durableOwnership(params);
	const profileAliases = normalizeProfileAliases(params.profileAliases);
	const now = params.now ?? Date.now();
	if (isVolatileRoute(identity.route)) {
		upsertVolatile(identity, params.aliases ?? [], profileAliases, params.ownership, now);
		return;
	}
	const register = async (authority) => {
		await ensureBrowserSessionTabStoreReady(authority.runtime);
		if (!ownership) {
			if (!await clearDurableForVolatile(identity, authority, () => {
				upsertVolatile(identity, params.aliases ?? [], profileAliases, params.ownership, now);
			})) throw new Error("durable browser tab changed during non-durable transition");
			return;
		}
		if (!identity.profile) throw new Error("durable browser tab tracking requires an explicit profile");
		const profile = identity.profile;
		const storageKey = browserSessionTabStorageKey({
			...ownership,
			sessionKey: identity.sessionKey
		});
		const registered = await updateBrowserSessionTab(storageKey, (current) => {
			const existing = parseBrowserSessionTabRecord(current);
			const persistedProfileAliases = normalizeProfileAliases([
				...existing?.profileAliases ?? [],
				existing?.profile,
				...profileAliases
			]).filter((alias) => alias !== profile);
			return {
				version: 1,
				sessionKey: identity.sessionKey,
				nativeTargetId: ownership.nativeTargetId,
				profile,
				...persistedProfileAliases.length > 0 ? { profileAliases: persistedProfileAliases } : {},
				profileFingerprint: ownership.profileFingerprint,
				browserInstanceFingerprint: ownership.browserInstanceFingerprint,
				interactionTargetKind: identity.targetId === ownership.nativeTargetId ? "native" : "opaque",
				trackedAt: existing?.trackedAt ?? now,
				lastUsedAt: now,
				...params.dashboard ? { dashboard: params.dashboard } : existing?.dashboard ? { dashboard: existing.dashboard } : {}
			};
		}, {
			...authority,
			onCommitted: (record) => {
				rememberDurableTabAliases(identity, params.aliases ?? [], storageKey, record.profileAliases);
				activeDurableStorageKeys().add(storageKey);
				deleteVolatileSessionTab(identity.sessionKey, volatileSessionTabTargetKey(identity));
			}
		});
		return registered ? {
			...registered,
			kind: "durable",
			storageKey
		} : void 0;
	};
	return params.dashboard && ownership ? await withBrowserDashboardRegistration(ownership.nativeTargetId, identity.profile, params.authority, register) : await register(params.authority);
}
function canonicalStorageKey(params, identity) {
	const ownership = durableOwnership(params);
	if (ownership && !identity.profile) return;
	return ownership ? browserSessionTabStorageKey({
		...ownership,
		sessionKey: identity.sessionKey
	}) : resolveDurableTabAlias(identity);
}
/** Updates last-used time for an existing tracked browser tab. */
async function touchSessionBrowserTab(input) {
	const params = {
		...input,
		authority: captureBrowserSessionTabAuthority(input.authority)
	};
	const identity = resolveInteractionIdentity(params);
	if (!identity) return;
	const now = params.now ?? Date.now();
	const volatile = resolveVolatile(identity);
	if (volatile) volatileTabsBySession().get(identity.sessionKey)?.set(volatile.tabKey, {
		...volatile.tab,
		lastUsedAt: now
	});
	if (isVolatileRoute(identity.route) || !getOptionalBrowserSessionTabStore()) return;
	await ensureBrowserSessionTabStoreReady(params.authority.runtime);
	const key = canonicalStorageKey(params, identity);
	if (key && await withBrowserSessionTabSelection(key, params.authority, async (tab) => {
		const candidate = parseBrowserSessionTabRecord(await tab.lookup());
		if (!candidate) return false;
		await tab.update((current) => {
			const record = parseBrowserSessionTabRecord(current);
			if (!record || !sameBrowserSessionTabRecord(record, candidate)) return;
			if (record.cleanupKind === "sweep") return {
				...withoutBrowserSessionTabCleanup(record),
				lastUsedAt: now
			};
			return {
				...record,
				lastUsedAt: now
			};
		}, () => activeDurableStorageKeys().add(key));
		return true;
	})) return;
	if (identity.profile) {
		const nativeTargetId = params.nativeTargetId?.trim() || identity.targetId;
		const coldIdentity = browserSessionTabNativeIdentity({
			sessionKey: identity.sessionKey,
			profile: identity.profile,
			nativeTargetId
		});
		await withBrowserSessionTabNativeActivity(coldIdentity, params.authority, async (store) => {
			if (readColdNativeActivity(coldIdentity) !== void 0 || (await store.entries()).some(({ key: entryKey, value }) => {
				const tab = parseBrowserSessionTabRecord(value);
				return tab?.interactionTargetKind === "native" && browserSessionTabNativeIdentity(tab) === coldIdentity && browserSessionTabStorageKey(tab) === entryKey;
			})) {
				if (getOptionalBrowserStateRuntime() === params.authority.runtime) rememberColdNativeActivity(coldIdentity, now);
			}
		});
	}
}
/** Removes a browser tab from session cleanup tracking. */
async function untrackSessionBrowserTab(input) {
	const params = {
		...input,
		authority: captureBrowserSessionTabAuthority(input.authority)
	};
	const identity = resolveInteractionIdentity(params);
	if (!identity) return;
	const initialVolatile = resolveVolatile(identity);
	if (isVolatileRoute(identity.route) || !getOptionalBrowserSessionTabStore()) {
		if (initialVolatile) deleteVolatileSessionTab(identity.sessionKey, initialVolatile.tabKey);
		return;
	}
	await ensureBrowserSessionTabStoreReady(params.authority.runtime);
	const key = canonicalStorageKey(params, identity);
	const untrack = async (tab) => {
		const record = tab ? parseBrowserSessionTabRecord(await tab.lookup()) : void 0;
		assertBrowserSessionTabAuthority(params.authority);
		const volatile = resolveVolatile(identity);
		const deleteSelected = async () => {
			if (tab && record) await tab.deleteIf((current) => {
				const selected = parseBrowserSessionTabRecord(current);
				return Boolean(selected && sameBrowserSessionTabRecord(selected, record));
			});
		};
		if (record && durableOwnership(params)) {
			await deleteSelected();
			return;
		}
		const selection = selectSessionTabToUntrack({
			volatileAvailable: Boolean(volatile),
			durableAvailable: Boolean(record),
			hasVolatileCandidate: Boolean(volatile) || hasVolatileTabAlias(identity),
			hasDurableCandidate: Boolean(record) || hasDurableTabAlias(identity),
			volatileIsExact: volatile?.isExact ?? false,
			durableIsExact: Boolean(record && resolveDurableTabExact(identity) === key),
			hasVolatileExactCandidate: hasVolatileTabExact(identity),
			hasDurableExactCandidate: hasDurableTabExact(identity)
		});
		if (selection === "volatile" && volatile) deleteVolatileSessionTab(identity.sessionKey, volatile.tabKey);
		else if (selection === "durable") await deleteSelected();
		else if (selection === "missing" && identity.profile) {
			const identityKey = browserSessionTabNativeIdentity({
				sessionKey: identity.sessionKey,
				profile: identity.profile,
				nativeTargetId: params.nativeTargetId?.trim() || identity.targetId
			});
			await withBrowserSessionTabNativeActivity(identityKey, params.authority, async () => {
				forgetColdNativeActivity(identityKey);
			});
		}
	};
	if (key) await withBrowserSessionTabSelection(key, params.authority, untrack);
	else await untrack();
}
//#endregion
//#region extensions/browser/src/browser/session-tab-registry.ts
/**
* Session-owned browser tabs. Host-local durable ownership is canonical in
* plugin SQLite; all other tabs remain process-local.
*/
function readVolatileTabs(sessionKeys) {
	const current = volatileTabsBySession();
	const volatile = /* @__PURE__ */ new Map();
	for (const sessionKey of sessionKeys ?? current.keys()) {
		const tabs = current.get(sessionKey);
		if (tabs) volatile.set(sessionKey, Array.from(tabs.values()));
	}
	return volatile;
}
async function performVolatileCleanup(candidate, params, cleanupKind) {
	const inFlight = volatileTabCleanupByTarget();
	const targetKey = volatileSessionTabTargetKey(candidate);
	const resolveCurrent = () => {
		const current = resolveVolatile(candidate)?.tab;
		return current?.registration === candidate.registration && (cleanupKind !== "sweep" || sameVolatileSessionTab(current, candidate)) ? current : void 0;
	};
	while (true) {
		if (params.isCurrent?.() === false) return 0;
		const current = resolveCurrent();
		if (!current) return 0;
		const existing = inFlight.get(targetKey);
		if (existing) {
			await existing.promise;
			if (existing.registrations.some((owned) => owned.registration === candidate.registration)) return 0;
			continue;
		}
		const { promise: cleanup, resolve: complete } = createDeferred();
		const owner = {
			registrations: volatileRegistrationsForTarget(targetKey),
			promise: cleanup
		};
		const performClose = async () => {
			let tab = current;
			let closeTab = params.closeTab;
			try {
				if (!closeTab && tab.route.kind === "browser-control") {
					const { browserCloseTabByRawTargetId } = await import("./client-D-Tcy9dw.mjs");
					const latest = resolveCurrent();
					if (!latest) {
						owner.registrations = [];
						return 0;
					}
					tab = latest;
					closeTab = ({ baseUrl, targetId, profile }) => browserCloseTabByRawTargetId(baseUrl, targetId, { profile });
				}
				if (closeTab) await closeTab({
					targetId: tab.targetId,
					...tab.route.kind === "browser-control" && tab.route.baseUrl ? { baseUrl: tab.route.baseUrl } : {},
					...tab.route.kind === "node-proxy" ? { route: tab.route } : {},
					...tab.profile ? { profile: tab.profile } : {}
				});
				else if (tab.route.kind === "node-proxy") {
					const outcome = await tab.route.closeTarget({
						targetId: tab.targetId,
						profile: tab.profile,
						ownership: tab.ownership
					});
					if (outcome.status === "cancelled" || outcome.status === "unavailable") {
						params.onWarn?.(`deferred tracked browser tab ${tab.targetId}: ${outcome.status === "unavailable" ? outcome.reason : "cleanup cancelled"}`);
						return 0;
					}
					if (outcome.status === "ownership-mismatch") params.onWarn?.(`retired tracked browser tab ${tab.targetId}: ownership mismatch`);
					deleteVolatileRegistrations(owner.registrations);
					return outcome.status === "closed" ? 1 : 0;
				}
			} catch (error) {
				if (closeTab && tab.route.kind === "browser-control" && isIgnorableTabCloseError(error)) {
					deleteVolatileRegistrations(owner.registrations);
					return 0;
				}
				params.onWarn?.(`failed to close tracked browser tab ${tab.targetId}: ${String(error)}`);
				return 0;
			}
			deleteVolatileRegistrations(owner.registrations);
			return 1;
		};
		inFlight.set(targetKey, owner);
		try {
			complete(performClose());
			return await cleanup;
		} finally {
			if (inFlight.get(targetKey) === owner) inFlight.delete(targetKey);
		}
	}
}
async function closeTrackedTabs(tabs, params) {
	let closed = 0;
	const now = params.now ?? Date.now();
	for (const tab of tabs) closed += tab.kind === "durable" ? await closeDurableTab(tab, params, now, params.cleanupKind) : await performVolatileCleanup(tab, params, params.cleanupKind);
	return closed;
}
async function withTrackedTabCleanup(authority, cleanup) {
	return authority.runtime ? await withBrowserSessionTabOperation(Symbol("cleanup"), authority, cleanup) : await cleanup();
}
function isCleanupCurrent(params) {
	return isBrowserStateRuntimeCurrent(params.authority?.runtime, params.isCurrent);
}
async function prepareTrackedTabCleanup(params) {
	let dashboardClosed = 0;
	let durable = await readCurrentBrowserState(params.authority?.runtime, () => readDurableTabs(params.onWarn, params.authority), params.isCurrent);
	if (!durable) return {
		dashboardClosed,
		durable
	};
	if (durable.some((tab) => tab.dashboard) || (await readCurrentBrowserState(params.authority?.runtime, () => readBrowserDashboardStopIntents(params.authority), params.isCurrent))?.length) {
		const { reconcileBrowserDashboards } = await import("./browser-dashboard-DnfqfEjB.mjs");
		if (!isCleanupCurrent(params)) return {
			dashboardClosed,
			durable: void 0
		};
		dashboardClosed = await reconcileBrowserDashboards(params);
		durable = await readCurrentBrowserState(params.authority?.runtime, () => readDurableTabs(params.onWarn, params.authority), params.isCurrent);
	}
	return {
		dashboardClosed,
		durable: isCleanupCurrent(params) ? durable : void 0
	};
}
/** Closes and untracks tabs for the supplied session keys. */
async function closeTrackedBrowserTabsForSessions(input) {
	const params = {
		...input,
		authority: captureBrowserSessionTabAuthority(input.authority)
	};
	const sessionKeys = new Set(params.sessionKeys.map((key) => normalizeOptionalLowercaseString(key)).filter((key) => key !== void 0));
	const volatile = readVolatileTabs(sessionKeys);
	return await withTrackedTabCleanup(params.authority, async () => {
		if (params.isCurrent?.() === false) return 0;
		const { dashboardClosed, durable } = params.authority.runtime ? await prepareTrackedTabCleanup(params) : {
			dashboardClosed: 0,
			durable: []
		};
		if (!durable || !isCleanupCurrent(params)) return dashboardClosed;
		return dashboardClosed + await closeTrackedTabs(selectTrackedTabsForSessions({
			durable,
			volatile,
			sessionKeys
		}), {
			...params,
			cleanupKind: "lifecycle"
		});
	});
}
/** Closes and untracks stale, pending, or excess browser tabs. */
async function sweepTrackedBrowserTabs(input) {
	const params = {
		...input,
		authority: captureBrowserSessionTabAuthority(input.authority)
	};
	const volatile = params.ordinaryCleanup === false ? [] : Array.from(readVolatileTabs().values()).flat();
	return await withTrackedTabCleanup(params.authority, async () => {
		const now = params.now ?? Date.now();
		const { dashboardClosed, durable } = params.authority.runtime ? await prepareTrackedTabCleanup(params) : {
			dashboardClosed: 0,
			durable: []
		};
		if (!durable || !isCleanupCurrent(params)) return dashboardClosed;
		if (params.ordinaryCleanup === false) return dashboardClosed + await closeTrackedTabs(durable.filter((tab) => !tab.dashboard && tab.cleanupKind === "lifecycle"), {
			...params,
			now,
			cleanupKind: "lifecycle"
		});
		return dashboardClosed + await closeTrackedTabs(selectStaleTrackedTabs({
			tabs: [...durable, ...volatile],
			now,
			idleMs: params.idleMs,
			maxTabsPerSession: params.maxTabsPerSession,
			sessionFilter: params.sessionFilter
		}), {
			...params,
			now,
			cleanupKind: "sweep"
		});
	});
}
/** Browser dashboard lifetime changes reuse fingerprinted cleanup and its claim owner. */
async function closeBrowserDashboardTabs(tabs, params = {}) {
	return await closeTrackedTabs(tabs.map((tab) => ({
		...tab,
		kind: "durable"
	})), {
		...params,
		getResolvedBrowserConfig: params.getResolvedBrowserConfig ?? (async () => {
			const { getBrowserControlState } = await import("./browser-control-state-bj7rvAfW.mjs");
			return getBrowserControlState()?.resolved ?? null;
		}),
		cleanupKind: "lifecycle"
	});
}
//#endregion
export { touchSessionBrowserTab as a, withBrowserDashboardRegistration as c, filterTrackedSessionBrowserTabs as i, closeTrackedBrowserTabsForSessions as n, trackSessionBrowserTab as o, sweepTrackedBrowserTabs as r, untrackSessionBrowserTab as s, closeBrowserDashboardTabs as t };
