import { t as createDeferredCore } from "./deferred-D0La5CRk.mjs";
import { i as resolveGlobalSingleton } from "./global-singleton-BfHBYj6Y.mjs";
import { i as getNodeSqliteKysely, n as executeSqliteQuerySync, r as executeSqliteQueryTakeFirstSync } from "./kysely-sync-Y4_ti-rQ.mjs";
import { n as getAdmittedSqliteSchemaFacts } from "./sqlite-schema-facts-DwsuACBg.mjs";
import { a as readDatabasePathIdentitySync } from "./sqlite-worker-identity-Dggu-rKK.mjs";
import { a as tableHasColumn, i as tableExists } from "./openclaw-state-db-schema-helpers-C29HKgWe.mjs";
import { i as stageSqliteTransactionState, t as deferSqlitePostCommitPublication } from "./sqlite-post-commit-Dih1WMKX.mjs";
import { r as runSqliteDeferredTransactionSync } from "./sqlite-transaction-2VkikDo-.mjs";
import { s as resolveOpenClawStateSqlitePath } from "./openclaw-state-db.paths-rJI64Ab5.mjs";
import { l as parseSqliteTableDefinition } from "./sqlite-schema-contract-DLUumhUB.mjs";
import { v as registerOpenClawStateDatabaseLifecycleListener, y as requireOpenClawStateDatabaseIdentity } from "./openclaw-state-db-cache-IAib4pqp.mjs";
import { n as ok, t as err } from "./result-BQGgYouL.mjs";
import { d as withExistingOpenClawStateDatabaseReadOnly, t as executeExistingOpenClawStateRead } from "./openclaw-state-db-readonly-DE3MB0wy.mjs";
import { r as captureOpenClawStateWorkerContext } from "./openclaw-state-worker-context-C_iAE7YK.mjs";
import { r as openOpenClawStateDatabase } from "./openclaw-state-db-DM-mSY0m.mjs";
import { t as createOpenClawStateSchemaEnsurer } from "./openclaw-state-feature-schema-C1E82tS9.mjs";
import { n as GIT_COAUTHOR_PREFERENCE_KEY, t as GATEWAY_OWNER_PROFILE_ID } from "./user-profile-constants-DfyZS95p.mjs";
import { B as publishUserProfileAuthorityChange, D as ensureUserProfilesSchema, I as onUserProfileEmailBindingChanged, N as captureUserProfileAuthorityRead, O as hasEnsuredUserProfileRoleSchema, P as emitUserProfilesChanged, S as userProfilesDb, T as UserProfileOwnerError, U as readUserProfileEmailBindingRevision, W as readUserProfileVersion, c as projectUserProfileDisplay, d as resolveCatalogProfile, f as selectProfileDisplayEntries, g as selectUserProfileEmailAlias, h as selectResolvedUserProfileMetadataById, n as bindPreparedUserProfileIdentity, o as matchUserProfileReference, p as selectResolvedUserProfile, s as projectCatalogUserProfileIdentity, t as applyUserProfileEmailBinding, v as setUserProfileEmailBinding, w as UserProfileNotFoundError, x as userProfileDisplaySelection, y as toUserProfile } from "./user-profiles-internal-Co87Y1ZN.mjs";
import path from "node:path";
import { isDeepStrictEqual, toUSVString } from "node:util";
//#region src/utils/github-login.ts
const GITHUB_LOGIN_PATTERN = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$/u;
function normalizeGitHubLogin(value) {
	const login = value.trim();
	return GITHUB_LOGIN_PATTERN.test(login) ? login : void 0;
}
//#endregion
//#region src/state/user-preferences-publication.ts
const publications = resolveGlobalSingleton(Symbol.for("openclaw.userPreferences.publications"), () => {
	const stores = /* @__PURE__ */ new Map();
	registerOpenClawStateDatabaseLifecycleListener((event) => {
		if (event.kind !== "opened" && event.identity) stores.delete(event.identity.key);
	});
	return stores;
});
function publication(key) {
	let current = publications.get(key);
	if (!current) {
		current = {
			revision: {},
			pending: /* @__PURE__ */ new Set()
		};
		publications.set(key, current);
	}
	return current;
}
function publishUserPreferencesChange(db) {
	const current = publication(requireOpenClawStateDatabaseIdentity({ db }).key);
	const commit = () => {
		current.revision = {};
	};
	if (!stageSqliteTransactionState(db, {
		stage: () => {},
		rollback: () => {},
		commit
	})) commit();
}
/** Fence readers before worker dispatch and retain the fence through native settlement. */
function beginUserPreferenceMutation(admission) {
	admission.assertCurrent();
	const current = publication(admission.identity.key);
	const settled = createDeferredCore();
	current.revision = {};
	current.pending.add(settled.promise);
	return () => {
		current.revision = {};
		current.pending.delete(settled.promise);
		settled.resolve();
	};
}
async function captureUserPreferenceRead(admission) {
	const current = publication(admission.identity.key);
	while (current.pending.size) await Promise.all(current.pending);
	admission.assertCurrent();
	const revision = current.revision;
	const profileRevision = readUserProfileVersion();
	return () => {
		admission.assertCurrent();
		return publications.get(admission.identity.key) === current && current.revision === revision && current.pending.size === 0 && readUserProfileVersion() === profileRevision;
	};
}
//#endregion
//#region src/state/user-preferences.store.ts
const ensureUserPreferencesSchema = createOpenClawStateSchemaEnsurer({
	table: "user_preferences",
	operationLabel: "users.preferences.schema.ensure"
});
function updatesGitCoauthorPreference(update) {
	return update.serialized.some(({ prefKey }) => prefKey === "git.coauthor.enabled") || update.deletionKeys.includes("git.coauthor.enabled");
}
function deleteUserPreference(database, profileId, key) {
	const db = getNodeSqliteKysely(database);
	if (!tableExists(database, "user_preferences")) return;
	executeSqliteQuerySync(database, db.deleteFrom("user_preferences").where("profile_id", "=", profileId).where("pref_key", "=", key));
	publishUserPreferencesChange(database);
}
function readPreferenceKeys(database, profileId) {
	const db = getNodeSqliteKysely(database);
	return new Set(executeSqliteQuerySync(database, db.selectFrom("user_preferences").select("pref_key").where("profile_id", "=", profileId)).rows.map((row) => row.pref_key));
}
/** Moves one retired profile's preferences without overwriting the merge target's choices. */
function mergeUserPreferences(database, sourceProfileId, targetProfileId) {
	if (sourceProfileId === targetProfileId || !tableExists(database, "user_preferences")) return;
	const db = getNodeSqliteKysely(database);
	const targetKeys = readPreferenceKeys(database, targetProfileId);
	const rows = executeSqliteQuerySync(database, db.selectFrom("user_preferences").selectAll().where("profile_id", "=", sourceProfileId).orderBy("pref_key", "asc")).rows;
	for (const row of rows) {
		if (targetKeys.has(row.pref_key)) continue;
		if (targetKeys.size >= 128) break;
		executeSqliteQuerySync(database, db.insertInto("user_preferences").values({
			...row,
			profile_id: targetProfileId
		}).onConflict((conflict) => conflict.columns(["profile_id", "pref_key"]).doNothing()));
		targetKeys.add(row.pref_key);
	}
	executeSqliteQuerySync(database, db.deleteFrom("user_preferences").where("profile_id", "=", sourceProfileId));
	publishUserPreferencesChange(database);
}
function readUserPreferences(sqlite, profileId, keys) {
	if (keys?.length === 0) return {};
	let query = getNodeSqliteKysely(sqlite).selectFrom("user_preferences").select(["pref_key", "value_json"]).where("profile_id", "=", profileId).orderBy("pref_key", "asc");
	if (keys) query = query.where("pref_key", "in", [...keys]);
	return Object.fromEntries(executeSqliteQuerySync(sqlite, query).rows.map((row) => [row.pref_key, JSON.parse(row.value_json)]));
}
function writeUserPreferences(sqlite, profileId, update) {
	const { serialized, deletionKeys, expected } = update;
	if (expected.length > 0) {
		const current = readUserPreferences(sqlite, profileId, expected.map(({ prefKey }) => prefKey));
		for (const { prefKey, valueJson } of expected) if (valueJson === null ? Object.hasOwn(current, prefKey) : !Object.hasOwn(current, prefKey) || !isDeepStrictEqual(current[prefKey], JSON.parse(valueJson))) return err({ code: "conflict" });
	}
	const db = getNodeSqliteKysely(sqlite);
	const currentKeys = readPreferenceKeys(sqlite, profileId);
	const nextKeys = new Set(currentKeys);
	deletionKeys.forEach((key) => nextKeys.delete(key));
	serialized.forEach((entry) => nextKeys.add(entry.prefKey));
	if (serialized.length > 0 && nextKeys.size > 128) return err({
		code: "profile-key-limit",
		limit: 128,
		currentCount: currentKeys.size
	});
	if (deletionKeys.length > 0) executeSqliteQuerySync(sqlite, db.deleteFrom("user_preferences").where("profile_id", "=", profileId).where("pref_key", "in", deletionKeys));
	const updatedAtMs = Date.now();
	if (serialized.length > 0) executeSqliteQuerySync(sqlite, db.insertInto("user_preferences").values(serialized.map((entry) => ({
		profile_id: profileId,
		pref_key: entry.prefKey,
		value_json: entry.valueJson,
		updated_at_ms: updatedAtMs
	}))).onConflict((conflict) => conflict.columns(["profile_id", "pref_key"]).doUpdateSet({
		value_json: (eb) => eb.ref("excluded.value_json"),
		updated_at_ms: (eb) => eb.ref("excluded.updated_at_ms")
	})));
	if (updatesGitCoauthorPreference(update)) publishUserProfileAuthorityChange(sqlite, profileId);
	publishUserPreferencesChange(sqlite);
	return ok(void 0);
}
//#endregion
//#region src/state/user-profile-github-identity.ts
const GITHUB_PROVIDER = "github";
const GITHUB_LOGIN_SUBJECT_PREFIX = "login:";
const githubColumnFacts = /* @__PURE__ */ new WeakMap();
function readGitHubColumns(db) {
	const schema = getAdmittedSqliteSchemaFacts(db);
	if (!schema) return {
		primaryAccount: tableHasColumn(db, "user_profiles", "primary_github_account_id"),
		verifiedLogin: tableHasColumn(db, "user_profile_identities", "canonical_login")
	};
	let columns = githubColumnFacts.get(schema);
	if (!columns) {
		const hasColumn = (table, column) => {
			const sql = schema.tableSql.get(table);
			return sql !== void 0 && parseSqliteTableDefinition(sql, table).columns.has(column);
		};
		columns = {
			primaryAccount: hasColumn("user_profiles", "primary_github_account_id"),
			verifiedLogin: hasColumn("user_profile_identities", "canonical_login")
		};
		githubColumnFacts.set(schema, columns);
	}
	return columns;
}
function parseStoredGitHubIdentity(row) {
	const accountId = Number(row.subject);
	const login = row.canonical_login ? normalizeGitHubLogin(row.canonical_login) : void 0;
	return login && Number.isSafeInteger(accountId) && accountId > 0 ? {
		accountId,
		login
	} : null;
}
function toPublicGitHubIdentity(identity) {
	return {
		login: identity.login,
		profileUrl: `https://github.com/${identity.login}`,
		avatarUrl: `https://avatars.githubusercontent.com/u/${identity.accountId}?v=4`
	};
}
function selectStoredGitHubIdentities(db, profileIds) {
	if (profileIds?.length === 0) return /* @__PURE__ */ new Map();
	const columns = readGitHubColumns(db);
	if (!columns.verifiedLogin) return /* @__PURE__ */ new Map();
	let query = userProfilesDb(db).selectFrom("user_profile_identities").innerJoin("user_profiles", "user_profiles.id", "user_profile_identities.profile_id").select([
		"profile_id",
		"subject",
		"canonical_login"
	]).select((eb) => [columns.primaryAccount ? "user_profiles.primary_github_account_id" : eb.val(null).as("primary_github_account_id")]).where("provider", "=", GITHUB_PROVIDER).where("canonical_login", "is not", null).orderBy("subject", "asc");
	if (profileIds) query = query.where("profile_id", "in", [...profileIds]);
	const rows = executeSqliteQuerySync(db, query).rows;
	const profiles = /* @__PURE__ */ new Map();
	for (const row of rows) {
		const identity = parseStoredGitHubIdentity(row);
		if (!identity) continue;
		const profile = profiles.get(row.profile_id) ?? {
			accounts: [],
			primaryId: row.primary_github_account_id ?? null
		};
		profile.accounts.push(identity);
		profiles.set(row.profile_id, profile);
	}
	return new Map([...profiles].map(([id, { accounts, primaryId }]) => [id, {
		accounts,
		primary: primaryId === null && accounts.length === 1 ? accounts[0] : accounts.find((account) => account.accountId === primaryId)
	}]));
}
function githubAuthenticationSubject(login) {
	const normalized = login.trim().toLowerCase();
	if (!normalized) throw new TypeError("GitHub login is invalid");
	return `${GITHUB_LOGIN_SUBJECT_PREFIX}${normalized}`;
}
function selectUserProfileGitHubIdentities(db, profileIds) {
	return new Map([...selectStoredGitHubIdentities(db, profileIds)].flatMap(([profileId, { primary }]) => primary ? [[profileId, toPublicGitHubIdentity(primary)]] : []));
}
/** Resolves current verified identities and public-credit preferences without initializing storage. */
async function resolveUserProfileGitHubAttribution(profileIds, options = {}) {
	if (profileIds.length === 0) return /* @__PURE__ */ new Map();
	const reply = await executeExistingOpenClawStateRead(options, {
		type: "userProfiles.githubAttribution.resolve",
		profileIds
	}, { current: true });
	if (!reply) return /* @__PURE__ */ new Map();
	if (!reply.ok || reply.type !== "userProfiles.githubAttribution.resolve") throw new Error("GitHub attribution reader returned an unexpected result");
	return reply.identities;
}
/** Bind public credit to its live profile owner before any later publication awaits. */
async function prepareUserProfileGitHubAttribution(profileIds, options = {}) {
	const selectedProfileIds = [...profileIds];
	const context = captureOpenClawStateWorkerContext(options);
	for (let attempt = 0; attempt < 3; attempt += 1) {
		const authority = await captureUserProfileAuthorityRead(context.admission);
		const reply = await executeExistingOpenClawStateRead({
			path: context.admission.databasePath,
			env: context.environment
		}, {
			type: "userProfiles.githubAttribution.resolve",
			profileIds: selectedProfileIds
		}, {
			context,
			current: true
		});
		context.admission.assertCurrent();
		if (reply && (!reply.ok || reply.type !== "userProfiles.githubAttribution.resolve")) throw new Error("GitHub attribution reader returned an unexpected result");
		const isCurrent = authority.bind([...selectedProfileIds, ...reply?.canonicalProfileIds ?? []]);
		if (isCurrent) return {
			identities: reply?.identities ?? /* @__PURE__ */ new Map(),
			isCurrent
		};
	}
	throw new Error("Git co-author credit changed while preparing attribution");
}
/** Retain every account; the merge target owns primary choice and its coauthor consent. */
function prepareUserProfileGitHubMerge(db, sourceProfileIds, targetProfileId) {
	const identities = selectStoredGitHubIdentities(db, [targetProfileId, ...sourceProfileIds]);
	const targetAccounts = identities.get(targetProfileId);
	const targetIdentity = targetAccounts?.primary;
	const survivingSourceProfileId = targetAccounts ? void 0 : sourceProfileIds.find((profileId) => identities.get(profileId)?.primary);
	const survivingAccountId = targetIdentity?.accountId ?? (survivingSourceProfileId ? identities.get(survivingSourceProfileId)?.primary?.accountId : void 0);
	for (const sourceProfileId of sourceProfileIds) {
		const sourceIdentity = identities.get(sourceProfileId)?.primary;
		if (!sourceIdentity || sourceIdentity.accountId !== survivingAccountId) deleteUserPreference(db, sourceProfileId, GIT_COAUTHOR_PREFERENCE_KEY);
	}
	executeSqliteQuerySync(db, userProfilesDb(db).updateTable("user_profiles").set({ primary_github_account_id: survivingAccountId ?? null }).where("id", "=", targetProfileId));
}
function readGitHubIdentityBinding(db, alias, accountId) {
	const kysely = userProfilesDb(db);
	const subject = String(accountId);
	const existing = executeSqliteQueryTakeFirstSync(db, kysely.selectFrom("user_profile_identities").leftJoin("user_profiles", "user_profiles.id", "user_profile_identities.profile_id").select([
		"profile_id",
		"canonical_login",
		"primary_github_account_id"
	]).where("provider", "=", GITHUB_PROVIDER).where("subject", "=", subject).where("canonical_login", "is not", null));
	const aliasIdentity = alias.kind === "email" ? selectUserProfileEmailAlias(db, alias.email) : executeSqliteQueryTakeFirstSync(db, kysely.selectFrom("user_profile_identities").select("profile_id").where("provider", "=", GITHUB_PROVIDER).where("subject", "=", alias.subject).where("canonical_login", "is", null));
	const aliasProfileId = aliasIdentity ? selectResolvedUserProfileMetadataById(db, aliasIdentity.profile_id)?.id : void 0;
	return {
		existing,
		aliasIdentity,
		aliasProfileId,
		aliasGitHubIdentity: aliasProfileId ? selectStoredGitHubIdentities(db, [aliasProfileId]).get(aliasProfileId) : void 0,
		existingProfileId: existing ? selectResolvedUserProfileMetadataById(db, existing.profile_id)?.id : void 0
	};
}
function assertCompatibleGitHubEmailBinding(binding, accountId) {
	const { existingProfileId, aliasProfileId, aliasGitHubIdentity } = binding;
	if ([
		binding.aliasIdentity?.profile_id,
		binding.existing?.profile_id,
		aliasProfileId,
		existingProfileId
	].includes("gateway-owner")) throw new UserProfileOwnerError("merge");
	if (existingProfileId && existingProfileId !== aliasProfileId || aliasGitHubIdentity && !aliasGitHubIdentity.accounts.some((account) => account.accountId === accountId)) throw new Error("GitHub identity requires explicit linking to this email; ask an administrator to use users.linkEmail");
}
/** The email owner checks the same conflicts even when optional GitHub metadata is unavailable. */
function assertGitHubEmailIdentityBinding(db, email, accountId) {
	if (!Number.isSafeInteger(accountId) || accountId <= 0) throw new TypeError("GitHub account id must be a positive safe integer");
	assertCompatibleGitHubEmailBinding(readGitHubIdentityBinding(db, {
		kind: "email",
		email
	}, accountId), accountId);
}
function applyVerifiedGitHubIdentity(params) {
	if (!Number.isSafeInteger(params.identity.accountId) || params.identity.accountId <= 0) throw new TypeError("GitHub account id must be a positive safe integer");
	const login = normalizeGitHubLogin(params.identity.login);
	if (!login) throw new TypeError("GitHub login is invalid");
	const db = params.db;
	const kysely = userProfilesDb(db);
	const subject = String(params.identity.accountId);
	const now = Date.now();
	const bindingFacts = readGitHubIdentityBinding(db, params.alias, params.identity.accountId);
	const { existing, aliasIdentity, aliasProfileId, aliasGitHubIdentity, existingProfileId } = bindingFacts;
	if (params.preserveEmailProfile) assertCompatibleGitHubEmailBinding(bindingFacts, params.identity.accountId);
	const currentProfileId = (aliasProfileId && (aliasGitHubIdentity === void 0 || aliasGitHubIdentity.accounts.some((account) => account.accountId === params.identity.accountId)) ? aliasProfileId : void 0) ?? existingProfileId ?? params.createProfile();
	const targetProfileId = existingProfileId ?? currentProfileId;
	if (aliasIdentity?.profile_id === "gateway-owner" || existing?.profile_id === "gateway-owner" || currentProfileId === "gateway-owner" || targetProfileId === "gateway-owner") throw new UserProfileOwnerError("merge");
	const affectedProfileIds = [
		currentProfileId,
		targetProfileId,
		...aliasIdentity ? [aliasIdentity.profile_id] : [],
		...aliasProfileId ? [aliasProfileId] : [],
		...existing ? [existing.profile_id] : []
	];
	params.mutation?.before(db, ...affectedProfileIds);
	const currentIdentity = currentProfileId === aliasProfileId ? aliasGitHubIdentity : selectStoredGitHubIdentities(db, [currentProfileId]).get(currentProfileId);
	if (!params.preserveEmailProfile && targetProfileId === currentProfileId && !currentIdentity?.accounts.some((account) => account.accountId === params.identity.accountId)) deleteUserPreference(db, targetProfileId, GIT_COAUTHOR_PREFERENCE_KEY);
	if (currentProfileId !== targetProfileId) params.mergeProfiles(currentProfileId, targetProfileId);
	const targetAccounts = currentProfileId === targetProfileId ? currentIdentity : selectStoredGitHubIdentities(db, [targetProfileId]).get(targetProfileId);
	const primaryAccountId = !targetAccounts || targetAccounts.primary ? targetAccounts?.primary?.accountId ?? params.identity.accountId : void 0;
	const authorityChanged = currentProfileId !== targetProfileId || existing?.profile_id !== targetProfileId || existing.canonical_login !== login || aliasIdentity?.profile_id !== targetProfileId;
	if (!authorityChanged && (primaryAccountId === void 0 || existing.primary_github_account_id === primaryAccountId)) return {
		profileId: targetProfileId,
		changed: false
	};
	if (primaryAccountId !== void 0) executeSqliteQuerySync(db, kysely.updateTable("user_profiles").set({ primary_github_account_id: primaryAccountId }).where("id", "=", targetProfileId));
	const writeIdentity = (identitySubject, canonicalLogin) => {
		const binding = {
			profile_id: targetProfileId,
			canonical_login: canonicalLogin
		};
		executeSqliteQuerySync(db, kysely.insertInto("user_profile_identities").values({
			provider: GITHUB_PROVIDER,
			subject: identitySubject,
			...binding,
			created_at: now
		}).onConflict((conflict) => conflict.columns(["provider", "subject"]).doUpdateSet(binding)));
	};
	writeIdentity(subject, login);
	if (params.alias.kind === "email") setUserProfileEmailBinding(db, params.alias.email, targetProfileId, now);
	else writeIdentity(params.alias.subject, null);
	if (authorityChanged) {
		params.mutation?.authority(...affectedProfileIds);
		publishUserProfileAuthorityChange(db, ...affectedProfileIds);
	}
	return {
		profileId: targetProfileId,
		changed: true
	};
}
//#endregion
//#region src/state/user-profile-identity.read.ts
const profileCatalogPath = (options) => path.resolve(options.path ?? resolveOpenClawStateSqlitePath(options.env ?? process.env));
/** Worker hydration retains unknown legacy bindings without inventing their lifetime. */
function readUserProfileEmailBindings(db, profileIds) {
	if (Array.isArray(profileIds) && profileIds.length === 0 || !tableExists(db, "user_profile_emails")) return [];
	const query = userProfilesDb(db).selectFrom("user_profile_emails").select(["email", "profile_id"]).select((eb) => [tableHasColumn(db, "user_profile_emails", "binding_id") ? "binding_id" : eb.val(null).as("binding_id")]).orderBy("email", "asc");
	return executeSqliteQuerySync(db, profileIds === void 0 ? query : typeof profileIds === "string" ? query.where("profile_id", "=", profileIds) : query.where("profile_id", "in", [...profileIds])).rows.map(({ email, profile_id, binding_id }) => ({
		email,
		profileId: profile_id,
		bindingId: binding_id
	}));
}
function listUserProfilesSync(options = {}) {
	ensureUserProfilesSchema(options);
	const database = openOpenClawStateDatabase(options);
	return runSqliteDeferredTransactionSync(database.db, () => {
		const kysely = userProfilesDb(database.db);
		const profiles = executeSqliteQuerySync(database.db, kysely.selectFrom("user_profiles").select([
			...userProfileDisplaySelection,
			"created_at",
			...hasEnsuredUserProfileRoleSchema(database.db) || tableHasColumn(database.db, "user_profiles", "role") ? ["role"] : []
		]).orderBy("created_at", "asc").orderBy("id", "asc")).rows;
		const emails = executeSqliteQuerySync(database.db, kysely.selectFrom("user_profile_emails").select(["profile_id", "email"]).orderBy("email", "asc")).rows;
		const githubIdentities = selectUserProfileGitHubIdentities(database.db);
		const emailsByProfile = new Map(profiles.map(({ id }) => [id, []]));
		for (const { profile_id, email } of emails) emailsByProfile.get(profile_id)?.push(email);
		return profiles.map((profile) => Object.assign(toUserProfile(profile), {
			emails: emailsByProfile.get(profile.id) ?? [],
			githubIdentity: githubIdentities.get(profile.id) ?? null,
			hasAvatar: profile.has_avatar === 1
		}));
	}, {
		databaseLabel: database.path,
		operationLabel: "user-profiles.list"
	});
}
/** Disclosure scopes need current aliases, never the resident display catalog. */
function readCurrentUserProfileAliases(profileId, options = {}) {
	ensureUserProfilesSchema(options);
	const database = openOpenClawStateDatabase(options);
	return runSqliteDeferredTransactionSync(database.db, () => {
		const canonicalId = selectResolvedUserProfileMetadataById(database.db, profileId)?.id ?? profileId;
		const aliases = executeSqliteQuerySync(database.db, userProfilesDb(database.db).selectFrom("user_profiles").select("id").where("merged_into", "=", canonicalId)).rows;
		return /* @__PURE__ */ new Set([canonicalId, ...aliases.map((row) => row.id)]);
	});
}
/** In-memory counterpart of the bounded SQL selector for the Gateway catalog. */
function projectHasMultipleSessionSharingIdentities(rows) {
	let people = 0;
	for (const row of rows.values()) if (!row.merged_into && row.id !== "gateway-owner" && ++people === 2) return true;
	return false;
}
/** True when session-sharing policy can distinguish at least two durable people. */
function selectHasMultipleSessionSharingIdentities(db) {
	return executeSqliteQuerySync(db, userProfilesDb(db).selectFrom("user_profiles").select("id").where("merged_into", "is", null).where("id", "!=", GATEWAY_OWNER_PROFILE_ID).limit(2)).rows.length >= 2;
}
/** Exact canonical identity and aliases selected on the caller's admitted connection. */
function selectUserProfileIdentityInDatabase(db, profileId) {
	const profile = selectResolvedUserProfileMetadataById(db, profileId);
	return profile && {
		profileId: profile.id,
		role: profile.role ?? null,
		aliases: new Set(executeSqliteQuerySync(db, userProfilesDb(db).selectFrom("user_profiles").select("id").where((eb) => eb.or([eb("id", "=", profile.id), eb("merged_into", "=", profile.id)]))).rows.map((row) => row.id))
	};
}
/** Read display rows and their one-hop aliases without creating profile storage. */
function selectUserProfileDisplaysInDatabase(db, ids) {
	const profiles = userProfilesDb(db).selectFrom("user_profiles");
	const rows = executeSqliteQuerySync(db, profiles.select(userProfileDisplaySelection).where((eb) => eb.or([eb("id", "in", [...ids]), eb("id", "in", profiles.select("merged_into").where("id", "in", [...ids]).where("merged_into", "!=", ""))]))).rows;
	if (rows.some((row) => typeof row.id !== "string" || row.merged_into !== null && typeof row.merged_into !== "string")) return new Map(ids.map((id) => [id, selectResolvedUserProfile(db, id, profiles.select(userProfileDisplaySelection))]));
	const byId = new Map(rows.map((row) => [row.id, row]));
	return new Map(ids.map((id) => {
		const raw = byId.get(toUSVString(id));
		return [id, raw?.merged_into ? byId.get(raw.merged_into) ?? raw : raw];
	}));
}
/** Resolve display navigation against the caller's admitted database and visible profile IDs. */
function selectUserProfileReferenceInDatabase(db, reference, allowedProfileIds) {
	let profiles = userProfilesDb(db).selectFrom("user_profiles");
	if (allowedProfileIds) profiles = profiles.where((eb) => eb(eb.fn.coalesce("merged_into", "id"), "in", [...allowedProfileIds]));
	return matchUserProfileReference(reference, selectResolvedUserProfile(db, reference, profiles.select(["id", "merged_into"]))?.id, (prefix) => executeSqliteQuerySync(db, profiles.select((eb) => eb.fn.coalesce("merged_into", "id").as("id")).where("id", "like", `${prefix}%`).distinct().limit(2)).rows.map((row) => row.id));
}
//#endregion
//#region src/state/user-profile-list.ts
const hasMultipleSessionSharingIdentities = (options = {}) => readProfileCatalog(options, projectHasMultipleSessionSharingIdentities, selectHasMultipleSessionSharingIdentities) ?? false;
/** Exact durable identity facts; never use display-reference prefix matching for authority. */
function readUserProfileIdentity(profileId, options = {}) {
	return readProfileCatalog(options, (resident) => projectCatalogUserProfileIdentity(resident, profileId), (db) => selectUserProfileIdentityInDatabase(db, profileId));
}
/** Existing one-hop aliases are identity facts; this read never creates profile storage. */
function readUserProfileAliases(profileId, options = {}) {
	return /* @__PURE__ */ new Set([profileId, ...readUserProfileIdentity(profileId, options)?.aliases ?? []]);
}
/** Gateway readers already retain this catalog with their session projection. */
function readResidentUserProfileId(profileId, options = {}) {
	const catalog = profileCatalogs.get(profileCatalogPath(options));
	if (!catalog?.valid) throw new Error("User profile catalog is not ready");
	return resolveCatalogProfile(catalog.rows, profileId)?.id;
}
/** Committed canonical row identity is the revision of catalog-derived avatar facts. */
function readResidentUserProfileRevision(profileId, pathname) {
	const catalog = profileCatalogs.get(pathname);
	return catalog?.valid ? resolveCatalogProfile(catalog.rows, profileId) : void 0;
}
const profileCatalogs = /* @__PURE__ */ new Map();
const profileMutationPublications = /* @__PURE__ */ new Set();
let stopCatalogEvents;
let stopBindingEvents;
let profileCatalogHandles = /* @__PURE__ */ new WeakMap();
const profileBindings = /* @__PURE__ */ new WeakMap();
function supersedeBindingPublications(identity, email, current) {
	if (current && !profileMutationPublications.has(current)) return;
	for (const publication of profileMutationPublications) {
		if (publication === current) break;
		if (publication.identity.key === identity.key && publication.emailBindings.has(email)) publication.supersededBindings.add(email);
	}
}
function applyCatalogEmailBinding(rows, email, binding) {
	const bindings = profileBindings.get(rows);
	if (!bindings) return;
	const previous = applyUserProfileEmailBinding(bindings, email, binding);
	for (const id of /* @__PURE__ */ new Set([previous, binding?.profileId])) {
		const row = id && rows.get(id);
		if (row) rows.set(row.id, { ...row });
	}
}
function observeEmailBindings() {
	stopBindingEvents ??= onUserProfileEmailBindingChanged(({ db, email, binding }) => {
		supersedeBindingPublications(requireOpenClawStateDatabaseIdentity({ db }), email);
		const rows = profileCatalogHandles.get(db);
		if (rows) applyCatalogEmailBinding(rows, email, binding);
	});
}
function readProfileCatalog(options, resident, stored) {
	const catalog = profileCatalogs.get(profileCatalogPath(options));
	return catalog ? resident(catalog.rows) : withExistingOpenClawStateDatabaseReadOnly(({ db }) => tableExists(db, "user_profiles") ? stored(db) : void 0, options);
}
function loadProfileCatalog(catalog, db, identity) {
	if (!catalog.valid || catalog.identity.key !== identity.key) {
		catalog.rows = [...profileCatalogs.values()].find((candidate) => candidate.valid && candidate.identity.key === identity.key)?.rows ?? new Map(tableExists(db, "user_profiles") ? selectProfileDisplayEntries(db) : []);
		Object.assign(catalog, {
			identity,
			valid: true
		});
		for (const publication of profileMutationPublications) retainProfileMutationPublicationCatalog(publication, catalog, true);
		return true;
	}
	return false;
}
function retainProfileMutationPublicationCatalog(publication, catalog, late) {
	if (!catalog.valid || catalog.identity.key !== publication.identity.key) return;
	if (!publication.catalogs.has(catalog)) {
		const lease = Symbol("pending profile mutation publication");
		publication.catalogs.set(catalog, lease);
		catalog.leases.add(lease);
	}
	let witness = publication.witnesses.get(catalog.rows);
	if (!witness) {
		witness = {
			rows: new Map([...publication.before.keys()].map((id) => [id, catalog.rows.get(id)])),
			late
		};
		publication.witnesses.set(catalog.rows, witness);
	}
	const bindings = profileBindings.get(catalog.rows);
	if (bindings && !witness.bindings) witness.bindings = {
		index: bindings,
		values: new Map([...publication.emailBindings.keys()].map((email) => [email, bindings.byEmail.get(email)])),
		late
	};
}
function releaseProfileCatalog(catalog, lease) {
	if (catalog.leases.delete(lease) && catalog.leases.size === 0) {
		for (const [pathname, current] of profileCatalogs) if (current === catalog) profileCatalogs.delete(pathname);
	}
	stopUnusedProfileCatalogObservers();
}
function stopUnusedProfileCatalogObservers() {
	if (profileCatalogs.size === 0 && profileMutationPublications.size === 0) {
		stopCatalogEvents?.();
		stopCatalogEvents = void 0;
		stopBindingEvents?.();
		stopBindingEvents = void 0;
		profileCatalogHandles = /* @__PURE__ */ new WeakMap();
	}
}
/** Capture under the worker's write transaction; native commits replace these row objects. */
function retainUserProfileMutationPublication(identity, before, emailBindings = []) {
	observeEmailBindings();
	const publication = {
		identity,
		before: new Map(before),
		emailBindings: new Map(emailBindings.map((change) => [change.email, change.before])),
		supersededBindings: /* @__PURE__ */ new Set(),
		witnesses: /* @__PURE__ */ new Map(),
		catalogs: /* @__PURE__ */ new Map()
	};
	profileMutationPublications.add(publication);
	for (const catalog of profileCatalogs.values()) retainProfileMutationPublicationCatalog(publication, catalog, false);
	const publish = (after, committed, bindings, settled) => {
		let changed = false;
		for (const catalog of publication.catalogs.keys()) {
			const witness = publication.witnesses.get(catalog.rows);
			if (!catalog.valid || catalog.identity.key !== identity.key || !witness) continue;
			const rowsBefore = new Map([...publication.before.keys()].map((id) => [id, catalog.rows.get(id)]));
			for (const [profileId, previous] of publication.before) {
				if (!after.has(profileId)) continue;
				const row = witness.rows.get(profileId);
				const observed = after.get(profileId);
				if (catalog.rows.get(profileId) === row && (!witness.late || isDeepStrictEqual(row, previous)) && !isDeepStrictEqual(row, observed)) {
					if (observed) catalog.rows.set(profileId, observed);
					else catalog.rows.delete(profileId);
					changed = true;
				}
			}
			const bindingWitness = witness.bindings;
			for (const change of bindings) {
				const index = profileBindings.get(catalog.rows);
				const previous = bindingWitness?.values.get(change.email);
				const current = index?.byEmail.get(change.email);
				if (bindingWitness && index === bindingWitness.index && publication.emailBindings.has(change.email) && !publication.supersededBindings.has(change.email) && (current === previous && !bindingWitness.late || isDeepStrictEqual(current ?? null, publication.emailBindings.get(change.email)))) {
					applyCatalogEmailBinding(catalog.rows, change.email, change.after);
					changed = true;
				}
			}
			if (committed) {
				let later = false;
				for (const successor of profileMutationPublications) {
					if (successor === publication) {
						later = true;
						continue;
					}
					const next = successor.witnesses.get(catalog.rows);
					if (!later || successor.identity.key !== identity.key || !next) continue;
					for (const [id, previousRow] of rowsBefore) {
						const final = catalog.rows.get(id);
						if (final !== previousRow && next.rows.get(id) === previousRow && successor.before.has(id) && isDeepStrictEqual(successor.before.get(id), final)) next.rows.set(id, final);
					}
				}
			}
		}
		for (const change of bindings) supersedeBindingPublications(identity, change.email, publication);
		settled?.();
		if (changed || bindings.length > 0 || committed && [...publication.before].some(([id, previous]) => after.has(id) && !isDeepStrictEqual(previous, after.get(id)))) emitUserProfilesChanged();
	};
	return {
		reconcile(after, bindings = [], settled) {
			publish(new Map(after), true, bindings, settled);
		},
		invalidate(settled) {
			publish(new Map([...publication.before.keys()].map((id) => [id, void 0])), false, [], settled);
		},
		release() {
			profileMutationPublications.delete(publication);
			for (const [catalog, lease] of publication.catalogs) releaseProfileCatalog(catalog, lease);
			publication.catalogs.clear();
			stopUnusedProfileCatalogObservers();
		}
	};
}
function retainUserProfilePublication(identity, profileId, before) {
	const publication = retainUserProfileMutationPublication(identity, [[profileId, before]]);
	return {
		reconcile(observed) {
			publication.reconcile([[profileId, observed]]);
		},
		release: publication.release
	};
}
function observeProfileCatalogs(refresh = false) {
	observeEmailBindings();
	if (stopCatalogEvents && !refresh) return;
	stopCatalogEvents?.();
	stopCatalogEvents = registerOpenClawStateDatabaseLifecycleListener((event) => {
		let changed = false;
		for (const [locator, current] of profileCatalogs) if (event.kind === "opened") {
			if (event.database.path !== locator && event.identity.key !== current.identity.key && event.identity.canonicalPath !== current.identity.canonicalPath) continue;
			if (current.asyncOnly) {
				if (current.identity.key !== event.identity.key) {
					current.rows = /* @__PURE__ */ new Map();
					current.identity = event.identity;
					current.valid = false;
					changed = true;
				}
			} else changed = loadProfileCatalog(current, event.database.db, event.identity) || changed;
			profileCatalogHandles.set(event.database.db, current.rows);
		} else if (event.kind !== "closed" && (event.path === locator || event.identity?.key === current.identity.key)) {
			current.rows.clear();
			current.valid = false;
			changed = true;
		}
		if (changed) emitUserProfilesChanged();
	});
}
/** Retain exact identity and display/navigation facts; physical admission updates every locator before observers. */
function retainUserProfileCatalog(options = {}) {
	const pathname = profileCatalogPath(options);
	const catalog = profileCatalogs.get(pathname) ?? {
		rows: /* @__PURE__ */ new Map(),
		identity: readDatabasePathIdentitySync(pathname),
		valid: false,
		leases: /* @__PURE__ */ new Set()
	};
	if (!profileCatalogs.has(pathname)) {
		withExistingOpenClawStateDatabaseReadOnly(({ db }) => loadProfileCatalog(catalog, db, readDatabasePathIdentitySync(pathname)), {
			...options,
			path: pathname
		});
		profileCatalogs.set(pathname, catalog);
	}
	observeProfileCatalogs(true);
	const lease = Symbol("profile catalog lease");
	catalog.leases.add(lease);
	return () => releaseProfileCatalog(catalog, lease);
}
async function acquireUserProfileCatalog(options = {}) {
	const context = captureOpenClawStateWorkerContext(options);
	const authority = await captureUserProfileAuthorityRead(context.admission);
	const pathname = context.admission.databasePath;
	let refreshObserver = false;
	let catalog = profileCatalogs.get(pathname) ?? [...profileCatalogs.values()].find((candidate) => candidate.valid && candidate.identity.key === context.admission.identity.key);
	if (catalog) profileCatalogs.set(pathname, catalog);
	while (!catalog?.valid || catalog.identity.key !== context.admission.identity.key || !profileBindings.has(catalog.rows)) {
		const profileRevision = readUserProfileVersion();
		const bindingRevision = readUserProfileEmailBindingRevision();
		const reply = await executeExistingOpenClawStateRead({
			...options,
			path: pathname
		}, { type: "userProfiles.catalog" }, { current: true });
		context.admission.assertCurrent();
		if (reply && (!reply.ok || reply.type !== "userProfiles.catalog")) throw new Error(reply.ok ? "Unexpected profile catalog reply" : reply.message);
		if (profileRevision !== readUserProfileVersion() || bindingRevision !== readUserProfileEmailBindingRevision()) {
			catalog = profileCatalogs.get(pathname);
			continue;
		}
		catalog = profileCatalogs.get(pathname) ?? [...profileCatalogs.values()].find((candidate) => candidate.valid && candidate.identity.key === context.admission.identity.key);
		if (catalog?.valid && catalog.identity.key === context.admission.identity.key && profileBindings.has(catalog.rows)) {
			profileCatalogs.set(pathname, catalog);
			break;
		}
		if (!catalog?.valid || catalog.identity.key !== context.admission.identity.key) {
			if (catalog) catalog.valid = false;
			catalog = {
				rows: new Map(reply?.profiles ?? []),
				identity: context.admission.identity,
				valid: true,
				leases: /* @__PURE__ */ new Set(),
				asyncOnly: true
			};
			refreshObserver = true;
			profileCatalogs.set(pathname, catalog);
		}
		const bindings = {
			byEmail: /* @__PURE__ */ new Map(),
			byId: /* @__PURE__ */ new Map(),
			emailsByProfile: /* @__PURE__ */ new Map()
		};
		for (const binding of reply?.emailBindings ?? []) applyUserProfileEmailBinding(bindings, binding.email, binding);
		profileBindings.set(catalog.rows, bindings);
		for (const publication of profileMutationPublications) retainProfileMutationPublicationCatalog(publication, catalog, true);
	}
	observeProfileCatalogs(refreshObserver);
	const retained = catalog;
	const identity = retained.identity.key;
	const rows = retained.rows;
	const bindings = profileBindings.get(rows);
	const lease = Symbol("prepared profile catalog");
	retained.leases.add(lease);
	let active = true;
	return {
		rows,
		bindings,
		assertCurrent(profileId) {
			context.admission.assertCurrent();
			if (!active || !retained.valid || context.admission.identity.key !== identity || retained.identity.key !== identity || retained.rows !== rows) throw new UserProfileNotFoundError(profileId);
			authority.assertSettled(profileId);
		},
		release() {
			if (active) {
				active = false;
				releaseProfileCatalog(retained, lease);
			}
		}
	};
}
/** Retain one off-thread preparation for a synchronous batch of current canonical identities. */
async function prepareUserProfileCatalog(options = {}) {
	const catalog = await acquireUserProfileCatalog(options);
	return {
		readCurrentIdentity(profileId) {
			catalog.assertCurrent(profileId);
			const profile = projectCatalogUserProfileIdentity(catalog.rows, profileId);
			if (profile && profile.profileId !== profileId) catalog.assertCurrent(profile.profileId);
			return profile;
		},
		release: catalog.release
	};
}
/** Prepare once off-thread; execution reads only committed facts retained by this owner. */
async function prepareUserProfileIdentity(profileId, options = {}) {
	return bindPreparedUserProfileIdentity(profileId, await acquireUserProfileCatalog(options));
}
/** Stage exact changed keys before commit so observers always see the whole committed catalog. */
function stageUserProfileCatalogChange(db, profileIds) {
	const catalog = profileCatalogHandles.get(db);
	if (catalog) {
		const rows = selectProfileDisplayEntries(db, profileIds);
		stageSqliteTransactionState(db, {
			stage: () => {},
			rollback: () => {},
			commit: () => rows.forEach(([id, row]) => catalog.set(id, row))
		});
	}
}
function publishUserProfilesChange(db, ...profileIds) {
	stageUserProfileCatalogChange(db, profileIds);
	deferSqlitePostCommitPublication(db, emitUserProfilesChanged);
}
/** Reads merge-aware display data without loading avatar bytes. */
function getUserProfileDisplay(profileId, options = {}) {
	const profile = readProfileCatalog(options, (resident) => resolveCatalogProfile(resident, profileId), (db) => selectResolvedUserProfile(db, profileId, userProfilesDb(db).selectFrom("user_profiles").select(userProfileDisplaySelection)));
	if (!profile) throw new UserProfileNotFoundError(profileId);
	return projectUserProfileDisplay(profile);
}
/** Read a bounded display cohort and its one-hop merge targets without initializing storage. */
function getUserProfileDisplays(profileIds, options = {}) {
	const ids = [...new Set(profileIds)];
	if (ids.length === 0) return /* @__PURE__ */ new Map();
	const project = (resolve) => new Map(ids.flatMap((id) => {
		const profile = resolve(id);
		return profile ? [[id, projectUserProfileDisplay(profile)]] : [];
	}));
	return readProfileCatalog(options, (resident) => project((id) => resolveCatalogProfile(resident, id)), (db) => {
		const rows = selectUserProfileDisplaysInDatabase(db, ids);
		return project((id) => rows.get(id));
	}) ?? /* @__PURE__ */ new Map();
}
/** Activity references are display navigation, never authentication identifiers. */
function resolveUserProfileReference(reference, options = {}) {
	const { allowedProfileIds } = options;
	if (allowedProfileIds?.size === 0) return ok(void 0);
	return readProfileCatalog(options, (resident) => {
		const allowed = (row) => !allowedProfileIds || allowedProfileIds.has(row.merged_into ?? row.id);
		const raw = resident.get(reference);
		return matchUserProfileReference(reference, raw && allowed(raw) ? resolveCatalogProfile(resident, reference)?.id : void 0, (prefix) => [...resident.values()].filter((row) => allowed(row) && row.id.toLowerCase().startsWith(prefix)).map((row) => row.merged_into ?? row.id));
	}, (db) => selectUserProfileReferenceInDatabase(db, reference, allowedProfileIds)) ?? ok(void 0);
}
//#endregion
export { readUserPreferences as A, prepareUserProfileGitHubAttribution as C, selectUserProfileGitHubIdentities as D, selectStoredGitHubIdentities as E, normalizeGitHubLogin as F, writeUserPreferences as M, beginUserPreferenceMutation as N, ensureUserPreferencesSchema as O, captureUserPreferenceRead as P, githubAuthenticationSubject as S, resolveUserProfileGitHubAttribution as T, profileCatalogPath as _, prepareUserProfileIdentity as a, applyVerifiedGitHubIdentity as b, readResidentUserProfileRevision as c, resolveUserProfileReference as d, retainUserProfileCatalog as f, listUserProfilesSync as g, stageUserProfileCatalogChange as h, prepareUserProfileCatalog as i, updatesGitCoauthorPreference as j, mergeUserPreferences as k, readUserProfileAliases as l, retainUserProfilePublication as m, getUserProfileDisplays as n, publishUserProfilesChange as o, retainUserProfileMutationPublication as p, hasMultipleSessionSharingIdentities as r, readResidentUserProfileId as s, getUserProfileDisplay as t, readUserProfileIdentity as u, readCurrentUserProfileAliases as v, prepareUserProfileGitHubMerge as w, assertGitHubEmailIdentityBinding as x, readUserProfileEmailBindings as y };
