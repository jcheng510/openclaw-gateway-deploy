import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { r as truncateUtf16Safe } from "./utf16-slice-D_ngcYKd.mjs";
import { r as racePromiseWithAbortSignal } from "./abort-signal-Z3A36sLL.mjs";
import { n as executeSqliteQuerySync, r as executeSqliteQueryTakeFirstSync, u as sql } from "./kysely-sync-Y4_ti-rQ.mjs";
import { t as deferSqlitePostCommitPublication } from "./sqlite-post-commit-Dih1WMKX.mjs";
import { r as runSqliteDeferredTransactionSync } from "./sqlite-transaction-2VkikDo-.mjs";
import { o as getOpenClawDatabaseMaintenanceScope } from "./openclaw-state-db-async-lifecycle-D4cx8OBO.mjs";
import { n as ok, t as err } from "./result-BQGgYouL.mjs";
import { i as getExistingOpenClawStateSchemaPath } from "./openclaw-state-db-schema-policy-Ci755wWB.mjs";
import { t as executeExistingOpenClawStateRead } from "./openclaw-state-db-readonly-DE3MB0wy.mjs";
import { r as WorkerTaskError } from "./worker-task-pool-Cl1KhdJb.mjs";
import { r as captureOpenClawStateWorkerContext, t as captureOpenClawStateReadContext } from "./openclaw-state-worker-context-C_iAE7YK.mjs";
import { l as runOpenClawStateWriteTransaction, r as openOpenClawStateDatabase } from "./openclaw-state-db-DM-mSY0m.mjs";
import { i as USER_PROFILE_AVATAR_MIME_TYPES, r as MAX_USER_PROFILE_AVATAR_BYTES } from "./avatar-limits-2506OuP3.mjs";
import "./user-profile-constants-DfyZS95p.mjs";
import { A as runUserProfileWriteTransaction, B as publishUserProfileAuthorityChange, C as UserProfileMergeError, D as ensureUserProfilesSchema, E as ensureUserProfileRoleSchema, L as onUserProfilesChanged, O as hasEnsuredUserProfileRoleSchema, S as userProfilesDb, T as UserProfileOwnerError, V as publishUserProfileIdentityChange, W as readUserProfileVersion, _ as selectUserProfileEmails, b as userProfileAvatarPresence, g as selectUserProfileEmailAlias, h as selectResolvedUserProfileMetadataById, i as insertUserProfile, j as isProfileDisplayRow, l as requireResolvedUserProfileById, u as requireResolvedUserProfileMetadataById, v as setUserProfileEmailBinding, w as UserProfileNotFoundError, y as toUserProfile, z as publishUserProfileAliasChange } from "./user-profiles-internal-Co87Y1ZN.mjs";
import { o as mergeUserModelAccounts } from "./user-model-accounts-TezCccjj.mjs";
import { D as selectUserProfileGitHubIdentities, O as ensureUserPreferencesSchema, S as githubAuthenticationSubject, _ as profileCatalogPath, b as applyVerifiedGitHubIdentity, c as readResidentUserProfileRevision, h as stageUserProfileCatalogChange, k as mergeUserPreferences, m as retainUserProfilePublication, o as publishUserProfilesChange, w as prepareUserProfileGitHubMerge, x as assertGitHubEmailIdentityBinding } from "./user-profile-list-y7DDikZX.mjs";
import { m as classifyTailscaleLogin, t as CHANNEL_IDENTITY_PROVIDER } from "./user-channel-identities-CUKW0ayO.mjs";
import { n as normalizeProfileEmail, t as ensureProfileForEmailInDatabase } from "./user-profile-email.kernel-CYKBP8yI.mjs";
import { i as mergeUserGitHubConnection } from "./user-github-connections-C1OhbQVE.mjs";
import { n as readGatewayOwnerProfileForEnsure, t as ensureGatewayOwnerProfileRow } from "./user-profiles-owner-CvRHwTmu.mjs";
import { createHash } from "node:crypto";
import pLimit from "p-limit";
//#region src/state/user-profiles-merge.ts
function mergeUserProfiles(db, sourceProfileId, targetProfileId, now, mutation) {
	if (sourceProfileId === targetProfileId) return;
	const kysely = userProfilesDb(db);
	const sourceProfileIds = [sourceProfileId, ...executeSqliteQuerySync(db, kysely.selectFrom("user_profiles").select("id").where("merged_into", "=", sourceProfileId)).rows.map((row) => row.id)];
	mutation?.before(db, ...sourceProfileIds, targetProfileId);
	prepareUserProfileGitHubMerge(db, sourceProfileIds, targetProfileId);
	const source = requireResolvedUserProfileById(db, sourceProfileId);
	if (source.avatar !== null) executeSqliteQuerySync(db, kysely.updateTable("user_profiles").set({
		avatar: source.avatar,
		avatar_mime: source.avatar_mime,
		avatar_sha256: source.avatar_sha256
	}).where("id", "=", targetProfileId).where("avatar", "is", null));
	mergeUserModelAccounts(db, sourceProfileId, targetProfileId);
	mergeUserGitHubConnection(db, sourceProfileId, targetProfileId);
	for (const mergedProfileId of sourceProfileIds) mergeUserPreferences(db, mergedProfileId, targetProfileId);
	const sourceEmails = executeSqliteQuerySync(db, kysely.selectFrom("user_profile_emails").select("email").where("profile_id", "in", sourceProfileIds)).rows;
	for (const { email } of sourceEmails) setUserProfileEmailBinding(db, email, targetProfileId, now);
	executeSqliteQuerySync(db, kysely.updateTable("user_profile_identities").set({ profile_id: targetProfileId }).where("profile_id", "in", sourceProfileIds));
	executeSqliteQuerySync(db, kysely.updateTable("user_profiles").set({
		merged_into: targetProfileId,
		updated_at: now
	}).where("id", "in", sourceProfileIds));
	executeSqliteQuerySync(db, kysely.updateTable("user_profiles").set({ updated_at: now }).where("id", "=", targetProfileId));
	stageUserProfileCatalogChange(db, sourceProfileIds);
	mutation?.publish(...sourceProfileIds, targetProfileId);
	mutation?.authority(...sourceProfileIds, targetProfileId);
	mutation?.identity(...sourceProfileIds);
	publishUserProfileAuthorityChange(db, ...sourceProfileIds, targetProfileId);
	publishUserProfileIdentityChange(db, ...sourceProfileIds);
	deferSqlitePostCommitPublication(db, publishUserProfileAliasChange);
}
//#endregion
//#region src/state/user-profile-reads.ts
async function resolveCanonicalCachedGitHubIdentity(params, options = {}) {
	const reply = await executeExistingOpenClawStateRead(options, {
		type: "userProfiles.githubIdentity.cached",
		accountId: params.accountId,
		email: params.email
	});
	if (!reply) return;
	if (!reply.ok || reply.type !== "userProfiles.githubIdentity.cached") throw new Error("Cached GitHub identity reader returned an unexpected result");
	return reply.identity;
}
async function listProfiles(options = {}) {
	const context = captureOpenClawStateWorkerContext(options);
	const { executeOpenClawStateWorker } = await import("./openclaw-state-worker-store-Bp_XCEWM.mjs");
	return await executeOpenClawStateWorker(context, {
		type: "userProfiles.list",
		input: void 0
	});
}
/** Candidate IDs and search labels; current recipient policy remains caller-owned. */
async function readUserProfileDirectory(limit, options = {}) {
	const context = captureOpenClawStateWorkerContext(options);
	const { executeOpenClawStateWorker } = await import("./openclaw-state-worker-store-Bp_XCEWM.mjs");
	return await executeOpenClawStateWorker(context, {
		type: "userProfiles.directory",
		input: { limit }
	});
}
//#endregion
//#region src/state/user-profiles-avatar.types.ts
function isUserProfileAvatarAdmission(value) {
	return isRecord(value) && value.kind === "profile-avatar" && isProfileDisplayRow(value.before);
}
//#endregion
//#region src/state/user-profiles-tailscale-avatar.ts
const TAILSCALE_AVATAR_FETCH_TIMEOUT_MS = 5e3;
const TAILSCALE_AVATAR_MAX_REDIRECTS = 3;
async function fetchTailscaleAvatar(url, options) {
	try {
		const timeoutMs = options.timeoutMs ?? TAILSCALE_AVATAR_FETCH_TIMEOUT_MS;
		const fetchImpl = options.fetchImpl;
		const [{ readRemoteMediaBuffer }, { fileTypeFromBuffer }] = await Promise.all([import("./fetch-B_YqU4JB.mjs"), import("file-type")]);
		const loaded = await readRemoteMediaBuffer({
			url,
			fetchImpl,
			maxBytes: MAX_USER_PROFILE_AVATAR_BYTES,
			maxRedirects: TAILSCALE_AVATAR_MAX_REDIRECTS,
			timeoutMs,
			responseHeaderTimeoutMs: timeoutMs,
			readIdleTimeoutMs: timeoutMs,
			requestInit: { headers: { Accept: USER_PROFILE_AVATAR_MIME_TYPES.join(",") } }
		});
		const mime = USER_PROFILE_AVATAR_MIME_TYPES.find((candidate) => candidate === loaded.contentType);
		const detected = await fileTypeFromBuffer(loaded.buffer);
		return mime && detected?.mime === mime ? {
			bytes: loaded.buffer,
			mime
		} : null;
	} catch {
		return null;
	}
}
//#endregion
//#region src/state/user-profiles-avatar.ts
const pendingReaders = /* @__PURE__ */ new Map();
const avatarReads = pLimit(4);
const avatarCache = /* @__PURE__ */ new Map();
let avatarCacheBytes = 0;
function evictAvatar(revision, avatar) {
	avatarCache.delete(revision);
	avatarCacheBytes -= avatar.avatar?.byteLength ?? 0;
}
function currentAvatar(avatar) {
	try {
		return avatar.isCurrent();
	} catch {
		return false;
	}
}
onUserProfilesChanged(() => {
	for (const [revision, avatar] of avatarCache) if (!currentAvatar(avatar)) evictAvatar(revision, avatar);
});
function cacheAvatar(revision, avatar) {
	const previous = avatarCache.get(revision);
	if (previous) evictAvatar(revision, previous);
	avatarCache.set(revision, avatar);
	avatarCacheBytes += avatar.avatar?.byteLength ?? 0;
	for (const [oldest, value] of avatarCache) {
		if (avatarCache.size <= 128 && avatarCacheBytes <= 16777216) break;
		evictAvatar(oldest, value);
	}
}
async function readAvatar(operation) {
	if (avatarReads.pendingCount >= 128) throw new WorkerTaskError("Profile avatar read queue is full", "overloaded");
	const signal = AbortSignal.timeout(5e3);
	try {
		return await racePromiseWithAbortSignal(avatarReads(() => {
			signal.throwIfAborted();
			return operation(signal);
		}), signal);
	} catch (error) {
		if (signal.aborted) throw new WorkerTaskError("Profile avatar read budget expired", "timeout");
		throw error;
	}
}
/** Keep every refresh and materialization bound to the original physical store. */
function createProfileAvatarReader(profileId, options = {}) {
	const pathname = profileCatalogPath(options);
	const share = !(options.env || options.database || getOpenClawDatabaseMaintenanceScope() || getExistingOpenClawStateSchemaPath());
	const residentRevision = () => share ? readResidentUserProfileRevision(profileId, pathname) : void 0;
	const key = share ? JSON.stringify([pathname, profileId]) : void 0;
	const pending = key && pendingReaders.get(key);
	if (pending) return pending;
	let context = share ? void 0 : captureOpenClawStateWorkerContext({
		...options,
		path: options.database?.path ?? pathname
	});
	const readContext = context ?? captureOpenClawStateReadContext(pathname);
	let inspection;
	const reader = { inspect() {
		readContext.admission.assertCurrent();
		const revision = residentRevision();
		const cached = revision && avatarCache.get(revision);
		if (cached) {
			if (currentAvatar(cached)) {
				avatarCache.delete(revision);
				avatarCache.set(revision, cached);
				return Promise.resolve({
					...cached,
					isCurrent() {
						readContext.admission.assertCurrent();
						return cached.isCurrent() && revision === residentRevision();
					}
				});
			}
			evictAvatar(revision, cached);
		}
		if (!inspection) {
			if (key) pendingReaders.set(key, reader);
			inspection = inspect().finally(() => {
				inspection = void 0;
				if (key && pendingReaders.get(key) === reader) pendingReaders.delete(key);
			});
		}
		return inspection;
	} };
	async function inspect() {
		const captured = context ??= {
			...captureOpenClawStateWorkerContext({ path: pathname }),
			...readContext
		};
		const location = {
			path: captured.admission.databasePath,
			env: captured.environment
		};
		for (;;) {
			const revision = readUserProfileVersion();
			const row = residentRevision();
			const reply = await readAvatar((signal) => executeExistingOpenClawStateRead(location, {
				type: "userProfiles.avatar.inspect",
				profileId
			}, {
				context: captured,
				current: true,
				signal
			}));
			captured.admission.assertCurrent();
			if (reply && (!reply.ok || reply.type !== "userProfiles.avatar.inspect")) throw new Error("Unexpected profile avatar inspection result");
			if (revision !== readUserProfileVersion()) continue;
			const snapshot = reply?.inspection ?? {
				profile: void 0,
				hasAvatar: false,
				emails: []
			};
			const isCurrent = () => {
				captured.admission.assertCurrent();
				return row ? row === residentRevision() : revision === readUserProfileVersion();
			};
			let bytes;
			const readBytes = async () => {
				const { profile, avatar } = snapshot;
				if (!profile || !avatar || !isCurrent()) return;
				const result = await readAvatar((signal) => executeExistingOpenClawStateRead(location, {
					type: "userProfiles.avatar.read",
					profileId,
					expected: {
						canonicalProfileId: profile.id,
						sha256: avatar.sha256,
						mime: avatar.mime
					}
				}, {
					context: captured,
					current: true,
					signal
				}));
				if (result && (!result.ok || result.type !== "userProfiles.avatar.read")) throw new Error("Unexpected profile avatar materialization result");
				return isCurrent() ? result?.avatar : void 0;
			};
			const prepared = {
				...snapshot,
				isCurrent,
				loadBytes() {
					if (!isCurrent()) return Promise.resolve(void 0);
					return bytes ??= readBytes().then((avatar) => {
						if (!avatar && row && avatarCache.get(row) === prepared) evictAvatar(row, prepared);
						if (!avatar || !row || avatarCache.get(row) !== prepared) bytes = void 0;
						return avatar;
					}, (error) => {
						bytes = void 0;
						throw error;
					});
				}
			};
			if (row && snapshot.avatar && snapshot.profile?.id === row.id && snapshot.avatar.sha256 === row.avatar_sha256 && snapshot.avatar.mime === row.avatar_mime) cacheAvatar(row, prepared);
			return prepared;
		}
	}
	return reader;
}
function requireAvatarProfile(profile, profileId) {
	if (!profile) throw new UserProfileNotFoundError(profileId);
	return profile;
}
/** Best-effort avatar adoption runs after authentication so remote I/O cannot delay login. */
async function adoptTailscaleProfileAvatar(profileId, profilePic, options = {}, fetchOptions = {}) {
	const first = captureOpenClawStateWorkerContext({
		...options,
		path: options.database?.path ?? options.path
	});
	const { executeOpenClawStateWorker, runOpenClawStateWorkerOperation } = await import("./openclaw-state-worker-store-Bp_XCEWM.mjs");
	const before = await executeOpenClawStateWorker(first, {
		type: "userProfiles.avatar.inspect",
		input: { profileId }
	});
	const initial = requireAvatarProfile(before.profile, profileId);
	if (before.hasAvatar || !profilePic) return initial;
	const avatar = await fetchTailscaleAvatar(profilePic, fetchOptions);
	const context = captureOpenClawStateWorkerContext({
		...options,
		path: first.admission.databasePath
	});
	if (!avatar) return requireAvatarProfile((await executeOpenClawStateWorker(context, {
		type: "userProfiles.avatar.inspect",
		input: { profileId }
	})).profile, profileId);
	const [{ withOpenClawStateSettlementRead }, { createSqliteWorkerOperationAdmission }] = await Promise.all([import("./openclaw-state-settlement-read-C8lSyfQY.mjs"), import("./sqlite-worker-operation-admission-Dg_vqgjT.mjs")]);
	return await withOpenClawStateSettlementRead(context, async (settlementRead) => runOpenClawStateWorkerOperation(context, async (scope) => {
		const receipt = await scope.execute({
			type: "userProfiles.avatar.adopt",
			input: {
				profileId,
				bytes: avatar.bytes,
				mime: avatar.mime,
				now: Date.now()
			}
		});
		settlementRead.acknowledge(receipt.committed);
		return requireAvatarProfile(receipt.profile, profileId);
	}, { createAdmission(retained) {
		return {
			nativeLocations: [context.admission.databasePath],
			admission: createSqliteWorkerOperationAdmission((request, grant) => {
				context.admission.assertCurrent();
				if (request.stage !== "transaction" || !isUserProfileAvatarAdmission(request.facts)) throw new Error("Unexpected profile avatar transaction admission");
				const publication = retainUserProfilePublication(context.admission.identity, request.facts.before.id, request.facts.before);
				try {
					settlementRead.bind({
						type: "userProfiles.reconcile",
						profileId: request.facts.before.id
					}, retained.settled, publication.reconcile, publication.release);
				} catch (error) {
					publication.release();
					throw error;
				}
				grant();
			})
		};
	} }));
}
//#endregion
//#region src/state/user-profiles.ts
function normalizeInitialDisplayName(name) {
	const normalized = name?.trim();
	return normalized ? truncateUtf16Safe(normalized, 256) : null;
}
function selectUserProfileListItemById(db, profileId) {
	const kysely = userProfilesDb(db);
	const profile = executeSqliteQueryTakeFirstSync(db, kysely.selectFrom("user_profiles").select([
		"id",
		"display_name",
		"avatar_mime",
		"merged_into",
		...hasEnsuredUserProfileRoleSchema(db) ? ["role"] : [],
		"created_at",
		"updated_at",
		userProfileAvatarPresence
	]).where("id", "=", profileId));
	if (!profile) throw new UserProfileNotFoundError(profileId);
	return {
		...toUserProfile(profile),
		emails: selectUserProfileEmails(db, profileId),
		githubIdentity: selectUserProfileGitHubIdentities(db, [profileId]).get(profileId) ?? null,
		hasAvatar: profile.has_avatar === 1
	};
}
/** Resolves a durable profile reference to its current one-hop merge head. */
function resolveUserProfileId(profileId, options = {}) {
	ensureUserProfilesSchema(options);
	const { db } = openOpenClawStateDatabase(options);
	return selectResolvedUserProfileMetadataById(db, profileId)?.id;
}
/** Reads a profile's protocol-facing representation through its merge head. */
function getUserProfileListItem(profileId, options = {}) {
	ensureUserProfilesSchema(options);
	const { db } = openOpenClawStateDatabase(options);
	return selectUserProfileListItemById(db, requireResolvedUserProfileMetadataById(db, profileId).id);
}
/** Reads the role assigned to an existing profile's current merge head. */
function getUserProfileRole(profileId, options = {}) {
	ensureUserProfileRoleSchema(options);
	const { db } = openOpenClawStateDatabase(options);
	return requireResolvedUserProfileMetadataById(db, profileId).role ?? null;
}
/** Assigns or clears the role on an existing profile's current merge head. */
function setUserProfileRole(profileId, role, options = {}) {
	ensureUserProfileRoleSchema(options);
	const now = Date.now();
	return runUserProfileWriteTransaction(({ db }) => {
		const profile = requireResolvedUserProfileMetadataById(db, profileId);
		options.mutation?.before(db, profile.id);
		if (profileId === "gateway-owner" || profile.id === "gateway-owner") throw new UserProfileOwnerError("role");
		executeSqliteQuerySync(db, userProfilesDb(db).updateTable("user_profiles").set({
			role,
			updated_at: now
		}).where("id", "=", profile.id));
		if ((profile.role ?? null) !== role) {
			options.mutation?.authority(profile.id);
			publishUserProfileAuthorityChange(db, profile.id);
		}
		options.mutation?.publish(profile.id);
		publishUserProfilesChange(db, profile.id);
		return selectUserProfileListItemById(db, profile.id);
	}, options, { operationLabel: "user-profiles.set-role" });
}
function ensureProfileForEmailWithInitialName(email, initialDisplayName, options) {
	const normalizedEmail = normalizeProfileEmail(email);
	ensureUserProfilesSchema(options);
	const { db: reader } = openOpenClawStateDatabase(options);
	const assertBinding = (database) => {
		if (options.expectedGitHubAccountId !== void 0) assertGitHubEmailIdentityBinding(database, normalizedEmail, options.expectedGitHubAccountId);
	};
	const selectExistingProfile = (database) => {
		assertBinding(database);
		const alias = selectUserProfileEmailAlias(database, normalizedEmail);
		return alias ? toUserProfile(requireResolvedUserProfileMetadataById(database, alias.profile_id)) : void 0;
	};
	const found = runSqliteDeferredTransactionSync(reader, () => selectExistingProfile(reader));
	if (found) return found;
	const now = Date.now();
	return runUserProfileWriteTransaction(({ db }) => {
		assertBinding(db);
		return ensureProfileForEmailInDatabase(db, normalizedEmail, initialDisplayName, now, options.mutation);
	}, options, { operationLabel: "user-profiles.ensure" });
}
/** Resolves an email alias or atomically creates its first durable profile. */
function ensureProfileForEmail(email, options = {}) {
	return ensureProfileForEmailWithInitialName(email, null, options);
}
function ensureProfileForProviderIdentity(params) {
	const options = params.options;
	const subject = params.provider === "github" ? githubAuthenticationSubject(params.subject) : params.subject;
	ensureUserProfilesSchema(params.options);
	const { db: reader } = openOpenClawStateDatabase(params.options);
	const selectExistingIdentity = (database) => {
		let query = userProfilesDb(database).selectFrom("user_profile_identities").select(["profile_id", "subject"]).where("provider", "=", params.provider);
		query = params.provider === "github" ? query.where((eb) => eb.or([eb("subject", "=", subject), eb.and([eb("subject", "=", params.subject), eb("canonical_login", "is", null)])])).orderBy(sql`CASE WHEN subject = ${subject} THEN 0 ELSE 1 END`) : query.where("subject", "=", subject);
		return executeSqliteQueryTakeFirstSync(database, query);
	};
	const existing = runSqliteDeferredTransactionSync(reader, () => {
		const identity = selectExistingIdentity(reader);
		return identity?.subject === subject ? toUserProfile(requireResolvedUserProfileMetadataById(reader, identity.profile_id)) : void 0;
	});
	if (existing) return existing;
	const now = Date.now();
	return runUserProfileWriteTransaction(({ db }) => {
		const kysely = userProfilesDb(db);
		const existingIdentity = selectExistingIdentity(db);
		if (existingIdentity) {
			const profile = requireResolvedUserProfileMetadataById(db, existingIdentity.profile_id);
			if (existingIdentity.subject !== subject) {
				options.mutation?.before(db, existingIdentity.profile_id);
				executeSqliteQuerySync(db, kysely.updateTable("user_profile_identities").set({ subject }).where("provider", "=", params.provider).where("subject", "=", existingIdentity.subject));
				options.mutation?.authority(existingIdentity.profile_id, profile.id);
				publishUserProfileAuthorityChange(db, existingIdentity.profile_id, profile.id);
				options.mutation?.publish(existingIdentity.profile_id);
				publishUserProfilesChange(db, existingIdentity.profile_id);
			}
			return toUserProfile(profile);
		}
		const row = insertUserProfile(db, params.initialDisplayName, now, options.mutation);
		executeSqliteQuerySync(db, kysely.insertInto("user_profile_identities").values({
			provider: params.provider,
			subject,
			profile_id: row.id,
			canonical_login: null,
			created_at: now
		}));
		options.mutation?.authority(row.id);
		options.mutation?.publish(row.id);
		publishUserProfilesChange(db, row.id);
		return toUserProfile(row);
	}, params.options, { operationLabel: "user-profiles.ensure-identity" });
}
function adoptDisplayNameIfEmpty(profileId, displayName, options) {
	const { db: reader } = openOpenClawStateDatabase(options);
	const existing = runSqliteDeferredTransactionSync(reader, () => requireResolvedUserProfileMetadataById(reader, profileId));
	if (!displayName || existing.display_name?.trim()) return toUserProfile(existing);
	const now = Date.now();
	return runUserProfileWriteTransaction(({ db }) => {
		const profile = requireResolvedUserProfileMetadataById(db, profileId);
		options.mutation?.before(db, profile.id);
		if (profile.display_name?.trim()) return toUserProfile(profile);
		executeSqliteQuerySync(db, userProfilesDb(db).updateTable("user_profiles").set({
			display_name: displayName,
			updated_at: now
		}).where("id", "=", profile.id));
		options.mutation?.publish(profile.id);
		publishUserProfilesChange(db, profile.id);
		return toUserProfile({
			...profile,
			display_name: displayName,
			updated_at: now
		});
	}, options, { operationLabel: "user-profiles.adopt-display-name" });
}
/** Shared-secret devices resolve one local owner without inventing an email identity. */
function ensureGatewayOwnerProfile(initialDisplayName, options = {}) {
	const displayName = normalizeInitialDisplayName(initialDisplayName);
	ensureUserProfilesSchema(options);
	const { db: reader } = openOpenClawStateDatabase(options);
	const found = runSqliteDeferredTransactionSync(reader, () => {
		const { existing, identified } = readGatewayOwnerProfileForEnsure(reader);
		return existing && identified && (!displayName || existing.display_name?.trim()) ? existing : void 0;
	});
	if (found) return toUserProfile(found);
	return runUserProfileWriteTransaction(({ db }) => toUserProfile(ensureGatewayOwnerProfileRow(db, displayName, options.mutation)), options, { operationLabel: "user-profiles.ensure-owner" });
}
/** Resolves a verified Tailscale login and adopts its display name into an empty field. */
function ensureProfileForTailscaleIdentity(identity, options = {}) {
	const classified = classifyTailscaleLogin(identity.login);
	if (classified.kind === "invalid") throw new TypeError("Tailscale login must contain a nonempty subject and suffix");
	const displayName = normalizeInitialDisplayName(identity.name);
	return adoptDisplayNameIfEmpty((classified.kind === "email" ? ensureProfileForEmailWithInitialName(classified.email, displayName, options) : ensureProfileForProviderIdentity({
		provider: classified.provider,
		subject: classified.subject,
		initialDisplayName: displayName,
		options
	})).id, displayName, options);
}
/** Explicit administration keeps both selected IDs exact; only an exact repeat may follow a tombstone. */
function mergeProfiles(sourceProfileId, targetProfileId, options = {}) {
	ensureUserProfilesSchema(options);
	return runUserProfileWriteTransaction(({ db }) => {
		const source = requireResolvedUserProfileMetadataById(db, sourceProfileId);
		const target = requireResolvedUserProfileMetadataById(db, targetProfileId);
		if ([
			sourceProfileId,
			targetProfileId,
			source.id,
			target.id
		].includes("gateway-owner")) throw new UserProfileOwnerError("merge");
		if (sourceProfileId === targetProfileId) throw new UserProfileMergeError("source and target profiles must differ");
		if (target.id !== targetProfileId) throw new UserProfileMergeError(`target profile ${targetProfileId} is merged into ${target.id}; choose the current merge head`);
		if (source.id !== sourceProfileId) {
			if (source.id === target.id) return {
				profile: selectUserProfileListItemById(db, target.id),
				movedAliasKinds: []
			};
			throw new UserProfileMergeError(`source profile ${sourceProfileId} is already merged into ${source.id}`);
		}
		const kysely = userProfilesDb(db);
		const cohort = kysely.selectFrom("user_profiles").select("id").where((eb) => eb.or([eb("id", "=", source.id), eb("merged_into", "=", source.id)]));
		const email = executeSqliteQueryTakeFirstSync(db, kysely.selectFrom("user_profile_emails").select("email").where("profile_id", "in", cohort).limit(1));
		const identities = executeSqliteQuerySync(db, kysely.selectFrom("user_profile_identities").select((eb) => eb.case().when("provider", "=", CHANNEL_IDENTITY_PROVIDER).then("channel").else("provider").end().as("kind")).distinct().where("profile_id", "in", cohort)).rows;
		const movedAliasKinds = [];
		if (email) movedAliasKinds.push("email");
		for (const kind of ["provider", "channel"]) if (identities.some((identity) => identity.kind === kind)) movedAliasKinds.push(kind);
		mergeUserProfiles(db, source.id, target.id, Date.now(), options.mutation);
		publishUserProfilesChange(db, target.id);
		return {
			profile: selectUserProfileListItemById(db, target.id),
			movedAliasKinds
		};
	}, options, { operationLabel: "user-profiles.merge" });
}
/** Links an email to a profile and retains an aliasless prior profile as a merge tombstone. */
function linkEmail(email, targetProfileId, options = {}) {
	const normalizedEmail = normalizeProfileEmail(email);
	const now = Date.now();
	ensureUserProfilesSchema(options);
	return runUserProfileWriteTransaction(({ db }) => {
		const kysely = userProfilesDb(db);
		const target = requireResolvedUserProfileMetadataById(db, targetProfileId);
		if (targetProfileId === "gateway-owner" || target.id === "gateway-owner") throw new UserProfileOwnerError("merge");
		const existingAlias = selectUserProfileEmailAlias(db, normalizedEmail);
		if (existingAlias?.profile_id === "gateway-owner") throw new UserProfileOwnerError("merge");
		if (existingAlias?.profile_id === target.id) return selectUserProfileListItemById(db, target.id);
		const changedIds = [target.id, ...existingAlias ? [existingAlias.profile_id] : []];
		options.mutation?.before(db, ...changedIds);
		setUserProfileEmailBinding(db, normalizedEmail, target.id, now);
		const remainingAliases = existingAlias ? executeSqliteQuerySync(db, kysely.selectFrom("user_profile_emails").select("email").where("profile_id", "=", existingAlias.profile_id)).rows : [];
		executeSqliteQuerySync(db, kysely.updateTable("user_profiles").set({ updated_at: now }).where("id", "=", target.id));
		if (existingAlias) {
			if (remainingAliases.length === 0) mergeUserProfiles(db, existingAlias.profile_id, target.id, now, options.mutation);
			else executeSqliteQuerySync(db, kysely.updateTable("user_profiles").set({ updated_at: now }).where("id", "=", existingAlias.profile_id));
		}
		options.mutation?.authority(...changedIds);
		publishUserProfileAuthorityChange(db, ...changedIds);
		options.mutation?.publish(...changedIds);
		publishUserProfilesChange(db, ...changedIds);
		return selectUserProfileListItemById(db, target.id);
	}, options, { operationLabel: "user-profiles.link-email" });
}
function setDisplayName(profileId, name, options = {}) {
	const now = Date.now();
	ensureUserProfilesSchema(options);
	return runOpenClawStateWriteTransaction(({ db }) => {
		const profile = requireResolvedUserProfileMetadataById(db, profileId);
		executeSqliteQuerySync(db, userProfilesDb(db).updateTable("user_profiles").set({
			display_name: name,
			updated_at: now
		}).where("id", "=", profile.id));
		publishUserProfilesChange(db, profile.id);
		return selectUserProfileListItemById(db, profile.id);
	}, options, { operationLabel: "user-profiles.set-display-name" });
}
function normalizeGitHubAuthenticationAlias(alias) {
	return alias.kind === "email" ? {
		kind: "email",
		email: normalizeProfileEmail(alias.email)
	} : {
		kind: "github-login",
		subject: githubAuthenticationSubject(alias.login)
	};
}
function syncGitHubIdentity(params, options = {}) {
	const alias = normalizeGitHubAuthenticationAlias(params.authenticationAlias);
	const githubDisplayName = normalizeInitialDisplayName(params.identity.name);
	const initialDisplayName = githubDisplayName ?? normalizeInitialDisplayName(params.initialDisplayName);
	ensureUserProfilesSchema(options);
	ensureUserPreferencesSchema(options);
	return runUserProfileWriteTransaction(({ db }) => {
		const now = Date.now();
		const binding = applyVerifiedGitHubIdentity({
			db,
			mutation: options.mutation,
			alias,
			identity: params.identity,
			preserveEmailProfile: params.preserveEmailProfile,
			createProfile: () => insertUserProfile(db, initialDisplayName, now, options.mutation).id,
			mergeProfiles: (sourceProfileId, targetProfileId) => mergeUserProfiles(db, sourceProfileId, targetProfileId, now, options.mutation)
		});
		const profile = selectUserProfileListItemById(db, binding.profileId);
		const displayName = githubDisplayName && profile.displayName === params.identity.login.trim() ? githubDisplayName : profile.displayName ?? initialDisplayName;
		if (!binding.changed && displayName === profile.displayName) return profile;
		options.mutation?.before(db, profile.id);
		executeSqliteQuerySync(db, userProfilesDb(db).updateTable("user_profiles").set({
			display_name: displayName,
			updated_at: now
		}).where("id", "=", profile.id));
		options.mutation?.publish(profile.id);
		publishUserProfilesChange(db, profile.id);
		return {
			...profile,
			displayName,
			updatedAt: now
		};
	}, options, { operationLabel: "user-profiles.sync-github-identity" });
}
/** Stores a bounded, allowlisted avatar without ever leaving the write transaction async. */
function setAvatar(profileId, bytes, mime, options = {}) {
	if (bytes.byteLength > 524288) return err({
		code: "avatar_too_large",
		maxBytes: MAX_USER_PROFILE_AVATAR_BYTES
	});
	if (!USER_PROFILE_AVATAR_MIME_TYPES.includes(mime)) return err({
		code: "unsupported_avatar_mime",
		mime
	});
	const now = Date.now();
	ensureUserProfilesSchema(options);
	const value = runOpenClawStateWriteTransaction(({ db }) => {
		const profile = requireResolvedUserProfileMetadataById(db, profileId);
		const sha256 = createHash("sha256").update(bytes).digest("hex");
		executeSqliteQuerySync(db, userProfilesDb(db).updateTable("user_profiles").set({
			avatar: bytes,
			avatar_mime: mime,
			avatar_sha256: sha256,
			updated_at: now
		}).where("id", "=", profile.id));
		publishUserProfilesChange(db, profile.id);
		return selectUserProfileListItemById(db, profile.id);
	}, options, { operationLabel: "user-profiles.set-avatar" });
	return ok(value);
}
//#endregion
export { resolveCanonicalCachedGitHubIdentity as _, getUserProfileRole as a, resolveUserProfileId as c, setUserProfileRole as d, syncGitHubIdentity as f, readUserProfileDirectory as g, listProfiles as h, getUserProfileListItem as i, setAvatar as l, createProfileAvatarReader as m, ensureProfileForEmail as n, linkEmail as o, adoptTailscaleProfileAvatar as p, ensureProfileForTailscaleIdentity as r, mergeProfiles as s, ensureGatewayOwnerProfile as t, setDisplayName as u };
