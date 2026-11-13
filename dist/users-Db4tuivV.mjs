import { t as FsSafeError, w as root } from "./fs-safe-CHQXnCPk.mjs";
import { r as isMissingPathError } from "./errno-FR4CRyya.mjs";
import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { d as resolveAgentWorkspaceDir } from "./agent-scope-config-Dm6T00l4.mjs";
import { i as listAgentIds } from "./agent-roster-B45JERT5.mjs";
import "./agent-scope-L_eY3Hj7.mjs";
import { As as validateUsersPersonalFileGetParams, Fs as validateUsersSelfParams, Ls as validateUsersSetAvatarParams, Ms as validateUsersPrefsGetParams, Ns as validateUsersPrefsSetParams, Os as validateUsersMergeParams, Ps as validateUsersSelectModelAccountParams, Ss as validateUsersListChannelIdentitiesParams, Ts as validateUsersListParams, Us as validateUsersUnlinkAuthProfileParams, Vs as validateUsersSetRoleParams, Ws as validateUsersUnlinkChannelIdentityParams, _s as validateUsersLinkChannelIdentityParams, cs as validateUsersAuthConnectCatalogParams, ds as validateUsersGitHubAuthorizeCancelParams, fs as validateUsersGitHubAuthorizePollParams, gs as validateUsersLinkAuthProfileParams, hs as validateUsersGitHubStatusParams, js as validateUsersPersonalFileSetParams, ls as validateUsersAuthConnectStartParams, ms as validateUsersGitHubDisconnectParams, os as validateUsersAuthConnectAnswerParams, ps as validateUsersGitHubAuthorizeStartParams, ss as validateUsersAuthConnectCancelParams, us as validateUsersAuthConnectStatusParams, ws as validateUsersListModelAccountsParams, xs as validateUsersListAuthLinksParams, ys as validateUsersLinkEmailParams, zs as validateUsersSetDisplayNameParams } from "./src-D2gvuSyP.mjs";
import { C as UserProfileMergeError, T as UserProfileOwnerError, w as UserProfileNotFoundError } from "./user-profiles-internal-Co87Y1ZN.mjs";
import { o as getActiveSecretsRuntimeConfigSnapshot } from "./runtime-state-I0A0iuwu.mjs";
import { t as assertAdmittedRunOperatorAuthority } from "./admitted-run-context-BL8yRX2D.mjs";
import { a as roleScopesAllow } from "./operator-scope-compat-Ci6GBcmU.mjs";
import { r as hasMultipleSessionSharingIdentities, s as readResidentUserProfileId, t as getUserProfileDisplay, u as readUserProfileIdentity } from "./user-profile-list-y7DDikZX.mjs";
import { r as GatewayErrorDetailCodes, t as ErrorCodes } from "./gateway-error-details-DIefe7Zy.mjs";
import { f as errorShape } from "./error-codes-DI20vDEB.mjs";
import { n as UserChannelIdentityConflictError } from "./user-channel-identities-CUKW0ayO.mjs";
import { h as listProfiles, i as getUserProfileListItem, l as setAvatar, u as setDisplayName } from "./user-profiles-BZfSkfNw.mjs";
import { f as resolveOperatorRolePolicyForAssignment, i as invalidateOperatorRolePolicy } from "./operator-role-policy-Cx-TzI2k.mjs";
import { n as changeCanonicalUserChannelIdentity, r as listCanonicalUserChannelIdentities } from "./user-channel-identity-operations-CyHQYsXR.mjs";
import { i as getAgentWorkspaceAccess } from "./workspace-access-DIRgQG5g.mjs";
import { t as MAX_WORKSPACE_BOOTSTRAP_FILE_BYTES } from "./workspace-bootstrap-read-B5B8MlNt.mjs";
import { i as isValidBase64 } from "./base64-xteYEv8l.mjs";
import { a as resolveGatewayPersonalToolParticipant, i as getGatewayToolCallerIdentity, t as captureGatewayToolCallerAssertion } from "./gateway-caller-context-DQ2iIITl.mjs";
import { v as resolveSystemGitHubIdentityStatus } from "./github-tool-identity-fecb-JRm.mjs";
import { n as holdGatewayPolicyResponse } from "./ws-policy-close-BgtfQbi3.mjs";
import { t as SessionMutationAuthorizationChangedError } from "./session-mutation-authorization-error-CCz8QGWh.mjs";
import { E as isGatewayClientProfilePending, O as isIneligiblePersonalGatewayCaller, S as authenticatedProfileUnavailableError } from "./session-sharing-policy-BALdNo4L.mjs";
import { n as enqueueWorkspaceFileUpdate } from "./workspace-fs-D-J6-EXA.mjs";
import { a as mergeCanonicalUserProfiles, i as linkCanonicalUserProfileEmail, o as setCanonicalUserProfileRole } from "./user-profile-writes-CX-xP12J.mjs";
import { r as defineValidatedGatewayMethod, t as assertValidParams } from "./validation-B7TobU6-.mjs";
import { i as setCanonicalUserPreferences, t as getCanonicalUserPreferences } from "./user-preferences-4aF7mMeg.mjs";
import { n as ModelAccountConnectInputError, t as ModelAccountConnectAuthorityError } from "./model-account-connect-Brj88asd.mjs";
import { i as prepareUserModelAccountAction } from "./users-model-account-access-JJGNloBw.mjs";
import { n as requireProfileMutationAccess, r as resolveAuthenticatedProfileId, t as prepareUserProfileAdministration } from "./users-profile-access-CXHxWyKf.mjs";
import { n as preparePersonalGitHubAction } from "./github-personal-authorization-1dLuSrQE.mjs";
import { t as publishUserPreferencesChanged } from "./user-preference-events-D5jMnkHE.mjs";
import { t as broadcastChatMetadataChanged } from "./server-chat-metadata-lifecycle-CdhTsVSb.mjs";
import { createHash } from "node:crypto";
//#region src/gateway/server-methods/users-auth-connect.ts
async function runConnectRequest(options, profileId, run, requiredScope = "operator.write") {
	try {
		const action = await prepareUserModelAccountAction(options, profileId, requiredScope);
		const service = options.context.modelAccountConnectService;
		if (!service) throw new Error("Model-account service is not running.");
		const result = await run(service, action);
		options.respond(true, result);
	} catch (error) {
		const responseError = error instanceof ModelAccountConnectAuthorityError ? errorShape(ErrorCodes.FORBIDDEN, error.message) : error instanceof ModelAccountConnectInputError || error instanceof UserProfileNotFoundError ? errorShape(ErrorCodes.INVALID_REQUEST, error.message) : errorShape(ErrorCodes.UNAVAILABLE, "Model account connect is unavailable right now; try again shortly.");
		options.respond(false, void 0, responseError);
	}
}
const usersAuthConnectHandlers = {
	"users.listAuthLinks": defineValidatedGatewayMethod("users.listAuthLinks", validateUsersListAuthLinksParams, (options) => runConnectRequest(options, options.params.profileId, (service, action) => service.listLinks(action), "operator.read")),
	"users.linkAuthProfile": defineValidatedGatewayMethod("users.linkAuthProfile", validateUsersLinkAuthProfileParams, (options) => runConnectRequest(options, options.params.profileId, (service, action) => service.link(action, options.params.authProfileId), "operator.admin")),
	"users.unlinkAuthProfile": defineValidatedGatewayMethod("users.unlinkAuthProfile", validateUsersUnlinkAuthProfileParams, (options) => runConnectRequest(options, options.params.profileId, (service, action) => service.unlink(action, options.params.provider))),
	"users.listModelAccounts": defineValidatedGatewayMethod("users.listModelAccounts", validateUsersListModelAccountsParams, (options) => runConnectRequest(options, options.params.profileId, (service, action) => service.list(action, options.params.cursor), "operator.read")),
	"users.selectModelAccount": defineValidatedGatewayMethod("users.selectModelAccount", validateUsersSelectModelAccountParams, (options) => runConnectRequest(options, options.params.profileId, (service, action) => service.select(action, options.params.authProfileId))),
	"users.authConnect.start": defineValidatedGatewayMethod("users.authConnect.start", validateUsersAuthConnectStartParams, (options) => runConnectRequest(options, options.params.profileId, (service, action) => service.start(action, options.params.provider, options.params.method))),
	"users.authConnect.answer": defineValidatedGatewayMethod("users.authConnect.answer", validateUsersAuthConnectAnswerParams, (options) => runConnectRequest(options, options.params.profileId, (service, action) => service.answer(action, options.params.connectId, options.params.stepId, options.params.value))),
	"users.authConnect.status": defineValidatedGatewayMethod("users.authConnect.status", validateUsersAuthConnectStatusParams, (options) => runConnectRequest(options, options.params.profileId, (service, action) => service.status(action, options.params.connectId))),
	"users.authConnect.cancel": defineValidatedGatewayMethod("users.authConnect.cancel", validateUsersAuthConnectCancelParams, (options) => runConnectRequest(options, options.params.profileId, (service, action) => service.cancel(action, options.params.connectId))),
	"users.authConnect.catalog": defineValidatedGatewayMethod("users.authConnect.catalog", validateUsersAuthConnectCatalogParams, (options) => runConnectRequest(options, options.params.profileId, (service, action) => service.catalog(action)))
};
//#endregion
//#region src/gateway/server-methods/users-channel-identities.ts
function identityError(error) {
	return errorShape(error instanceof UserChannelIdentityConflictError || error instanceof UserProfileNotFoundError || error instanceof UserProfileOwnerError ? ErrorCodes.INVALID_REQUEST : ErrorCodes.UNAVAILABLE, formatErrorMessage(error));
}
const usersChannelIdentityHandlers = {
	"users.linkChannelIdentity": async (options) => {
		const { params, respond } = options;
		if (!assertValidParams(params, validateUsersLinkChannelIdentityParams, "users.linkChannelIdentity", respond)) return;
		try {
			const assertCurrent = await prepareUserProfileAdministration(options);
			const result = await changeCanonicalUserChannelIdentity("link", params.profileId, params.identity, { assertCurrent });
			if (result.kind !== "linked") throw new Error("Channel identity mutation returned an unexpected result");
			respond(true, result.link);
		} catch (error) {
			respond(false, void 0, identityError(error));
		}
	},
	"users.unlinkChannelIdentity": async (options) => {
		const { params, respond } = options;
		if (!assertValidParams(params, validateUsersUnlinkChannelIdentityParams, "users.unlinkChannelIdentity", respond)) return;
		try {
			const assertCurrent = await prepareUserProfileAdministration(options);
			const result = await changeCanonicalUserChannelIdentity("unlink", params.profileId, params.identity, { assertCurrent });
			if (result.kind !== "unlinked") throw new Error("Channel identity mutation returned an unexpected result");
			respond(true, { removed: result.removed });
		} catch (error) {
			respond(false, void 0, identityError(error));
		}
	},
	"users.listChannelIdentities": async (options) => {
		const { params, respond } = options;
		if (!assertValidParams(params, validateUsersListChannelIdentitiesParams, "users.listChannelIdentities", respond)) return;
		try {
			const assertCurrent = await prepareUserProfileAdministration(options);
			const links = await listCanonicalUserChannelIdentities(params.profileId);
			assertCurrent();
			respond(true, { links });
		} catch (error) {
			respond(false, void 0, identityError(error));
		}
	}
};
//#endregion
//#region src/gateway/server-methods/users-github.ts
function runPersonalGitHub(options, fallbackError, run) {
	const fail = (error) => options.respond(false, void 0, errorShape(ErrorCodes.FORBIDDEN, error instanceof Error ? error.message : fallbackError));
	try {
		const action = preparePersonalGitHubAction(options);
		const service = options.context.githubOAuthService?.personal;
		if (!service) throw new Error("GitHub connections are unavailable; retry after Gateway startup.");
		const result = run(action, service);
		if (result instanceof Promise) return result.then((value) => {
			action.assertCurrent();
			options.respond(true, value);
		}).catch(fail);
		options.respond(true, result);
	} catch (error) {
		fail(error);
	}
}
const usersGitHubHandlers = {
	"users.github.status": defineValidatedGatewayMethod("users.github.status", validateUsersGitHubStatusParams, (options) => runPersonalGitHub(options, "My GitHub is unavailable.", async (action, service) => {
		const config = options.context.getRuntimeConfig();
		const system = await resolveSystemGitHubIdentityStatus({
			config,
			sourceConfig: getActiveSecretsRuntimeConfigSnapshot()?.sourceConfig ?? config
		});
		return {
			personal: await service.status(action),
			system
		};
	})),
	"users.github.authorize.start": defineValidatedGatewayMethod("users.github.authorize.start", validateUsersGitHubAuthorizeStartParams, (options) => runPersonalGitHub(options, "My GitHub authorization failed.", (action, service) => service.startAuthorization(action))),
	"users.github.authorize.poll": defineValidatedGatewayMethod("users.github.authorize.poll", validateUsersGitHubAuthorizePollParams, (options) => runPersonalGitHub(options, "My GitHub authorization failed.", (action, service) => service.pollAuthorization(action, options.params.requestId))),
	"users.github.authorize.cancel": defineValidatedGatewayMethod("users.github.authorize.cancel", validateUsersGitHubAuthorizeCancelParams, (options) => runPersonalGitHub(options, "My GitHub authorization failed.", (action, service) => ({ cancelled: service.cancelAuthorization(action, options.params.requestId) }))),
	"users.github.disconnect": defineValidatedGatewayMethod("users.github.disconnect", validateUsersGitHubDisconnectParams, (options) => runPersonalGitHub(options, "My GitHub disconnect failed.", (action, service) => {
		service.disconnect(action);
		return { disconnected: true };
	}))
};
//#endregion
//#region src/gateway/server-methods/users-personal-file.ts
var PersonalFileAccessError = class extends Error {};
function preparePersonalFile(options, requestedAgentId) {
	const { client, context } = options;
	if (!listAgentIds(context.getRuntimeConfig()).includes(requestedAgentId)) throw new PersonalFileAccessError("Select an existing agent to edit your personal instructions.");
	const agentId = requestedAgentId;
	const workspaceDir = resolveAgentWorkspaceDir(context.getRuntimeConfig(), agentId);
	const operatorAuthority = client?.internal?.operatorRunAuthority;
	const toolCaller = getGatewayToolCallerIdentity();
	const assertToolCurrent = captureGatewayToolCallerAssertion();
	const currentProfile = () => {
		try {
			resolveGatewayPersonalToolParticipant(client?.internal?.agentRuntimeIdentity, { requireSingleParticipant: true })?.assertCurrent();
		} catch (error) {
			throw new PersonalFileAccessError("Personal instructions are unavailable in this turn. Ask in your own Control UI turn with a new message.", { cause: error });
		}
		options.sessionMutationCommitGuard?.();
		if (!hasMultipleSessionSharingIdentities()) throw new PersonalFileAccessError("Personal instructions are only available on multi-user Gateways. Use the agent workspace USER.md on a single-user Gateway.");
		if (!client || client.invalidated || client.connectionSignal?.aborted || client.connect.role !== "operator" || options.signal?.aborted) throw new PersonalFileAccessError("Personal instructions require a current signed-in connection.");
		let id;
		if (operatorAuthority) {
			assertAdmittedRunOperatorAuthority(operatorAuthority);
			const requesterAuthority = toolCaller?.operatorAuthority;
			if (client.internal?.syntheticClient !== true || !requesterAuthority?.source || requesterAuthority.source !== operatorAuthority.source || requesterAuthority.profileId !== operatorAuthority.profileId || !assertToolCurrent) throw new PersonalFileAccessError("Personal instructions require an admitted user turn.");
			assertAdmittedRunOperatorAuthority(requesterAuthority);
			assertToolCurrent();
			operatorAuthority.assertCurrent();
			id = operatorAuthority.profileId;
		} else {
			if (isIneligiblePersonalGatewayCaller(client) || isGatewayClientProfilePending(client) || !client.connId || !context.getClientConnIds?.((current) => current === client).has(client.connId)) throw new PersonalFileAccessError("Personal instructions require a current signed-in connection.");
			id = client.authenticatedUserProfile?.profileId;
		}
		const canonicalId = id ? readResidentUserProfileId(id) : void 0;
		if (!canonicalId || !/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,127}$/.test(canonicalId)) throw new PersonalFileAccessError("Sign in with a durable profile to edit personal instructions.");
		const cfg = context.getRuntimeConfig();
		const policy = resolveOperatorRolePolicyForAssignment(canonicalId, readUserProfileIdentity(canonicalId)?.role ?? null, cfg);
		if (![
			client.connect.scopes ?? [],
			...operatorAuthority ? [operatorAuthority.scopes] : [],
			...policy ? [policy.scopes] : []
		].every((allowedScopes) => roleScopesAllow({
			role: "operator",
			requestedScopes: ["operator.read"],
			allowedScopes
		}))) throw new PersonalFileAccessError("Personal instructions require current operator.read permission.");
		if (policy && policy.agents !== "*" && !policy.agents.includes(agentId)) throw new PersonalFileAccessError("Your operator role cannot edit personal instructions for this agent.");
		return canonicalId;
	};
	const profileId = currentProfile();
	const assertCurrent = () => {
		const cfg = context.getRuntimeConfig();
		if (currentProfile() !== profileId || !listAgentIds(cfg).includes(agentId) || resolveAgentWorkspaceDir(cfg, agentId) !== workspaceDir) throw new PersonalFileAccessError("Profile or agent workspace changed; reload before saving.");
		if (getAgentWorkspaceAccess(workspaceDir)) throw new PersonalFileAccessError("Personal instructions editing requires a local agent workspace.");
	};
	assertCurrent();
	return {
		agentId,
		profileId,
		workspaceDir,
		name: `users/${profileId}/USER.md`,
		assertCurrent
	};
}
function hash$1(content) {
	return createHash("sha256").update(content).digest("hex");
}
async function runPersonalFile(options, params, write) {
	try {
		const target = preparePersonalFile(options, params.agentId);
		const fsRoot = await root(target.workspaceDir, {
			symlinks: "reject",
			mutationSymlinks: "reject",
			hardlinks: "reject",
			maxBytes: MAX_WORKSPACE_BOOTSTRAP_FILE_BYTES,
			nonBlockingRead: true,
			assertBeforeMutation: target.assertCurrent
		});
		const read = async () => {
			target.assertCurrent();
			try {
				const loaded = await fsRoot.read(target.name);
				target.assertCurrent();
				return {
					agentId: target.agentId,
					profileId: target.profileId,
					missing: false,
					content: new TextDecoder("utf-8", {
						fatal: true,
						ignoreBOM: true
					}).decode(loaded.buffer),
					hash: hash$1(loaded.buffer)
				};
			} catch (error) {
				target.assertCurrent();
				if (!isMissingPathError(error)) throw error;
				return {
					agentId: target.agentId,
					profileId: target.profileId,
					missing: true,
					content: "",
					hash: null
				};
			}
		};
		if (!write) {
			const result = await read();
			target.assertCurrent();
			options.respond(true, result);
			return;
		}
		if (write.content.length > 4e3) {
			options.respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "Keep personal instructions within 4,000 characters."));
			return;
		}
		await enqueueWorkspaceFileUpdate(async () => {
			const previous = await read();
			target.assertCurrent();
			if (previous.hash !== write.expectedHash) {
				options.respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "Personal USER.md changed since it was read. Reload before saving.", { details: { type: "personal_file_conflict" } }));
				return;
			}
			await fsRoot.write(target.name, write.content, {
				mkdir: true,
				overwrite: !previous.missing
			});
			target.assertCurrent();
			options.respond(true, {
				agentId: target.agentId,
				profileId: target.profileId,
				missing: false,
				content: write.content,
				hash: hash$1(write.content)
			});
		});
	} catch (error) {
		options.respond(false, void 0, errorShape(error instanceof PersonalFileAccessError ? ErrorCodes.FORBIDDEN : ErrorCodes.INVALID_REQUEST, error instanceof FsSafeError ? "Personal USER.md could not be accessed safely. Check the agent workspace and remove file aliases." : error instanceof Error ? error.message : "Personal instructions are unavailable; reload and try again."));
	}
}
const usersPersonalFileHandlers = {
	"users.personalFile.get": defineValidatedGatewayMethod("users.personalFile.get", validateUsersPersonalFileGetParams, (options) => runPersonalFile(options, options.params)),
	"users.personalFile.set": defineValidatedGatewayMethod("users.personalFile.set", validateUsersPersonalFileSetParams, (options) => runPersonalFile(options, options.params, options.params))
};
//#endregion
//#region src/gateway/server-methods/users.ts
function refreshConnectedProfile(context, profile, display = getUserProfileDisplay(profile.id)) {
	context.refreshConnectedUserProfile?.({
		...display,
		updatedAt: profile.updatedAt
	});
	return display;
}
function profileError(error) {
	if (error instanceof UserProfileNotFoundError || error instanceof UserProfileOwnerError || error instanceof UserProfileMergeError) return errorShape(ErrorCodes.INVALID_REQUEST, error.message);
	return errorShape(ErrorCodes.UNAVAILABLE, formatErrorMessage(error));
}
function preparePersonalPreferences(client) {
	const unavailable = "Personal settings are unavailable in this turn. Ask in your own Control UI turn with a new message.";
	try {
		const participant = resolveGatewayPersonalToolParticipant(client?.internal?.agentRuntimeIdentity, { requireSingleParticipant: true });
		return () => {
			try {
				participant?.assertCurrent();
			} catch {
				throw new Error(unavailable);
			}
		};
	} catch {
		throw new Error(unavailable);
	}
}
const usersHandlers = {
	...usersAuthConnectHandlers,
	...usersChannelIdentityHandlers,
	...usersGitHubHandlers,
	...usersPersonalFileHandlers,
	"users.list": async ({ params, respond }) => {
		if (!assertValidParams(params, validateUsersListParams, "users.list", respond)) return;
		respond(true, { profiles: await listProfiles() });
	},
	"users.self": async ({ client, params, respond }) => {
		if (!assertValidParams(params, validateUsersSelfParams, "users.self", respond)) return;
		if (!client?.authenticatedUserId && !client?.authenticatedUserProfile) {
			respond(false, void 0, errorShape(ErrorCodes.FORBIDDEN, "users.self requires an authenticated user"));
			return;
		}
		try {
			if (client.authenticatedGitHubIdentitySync) try {
				await client.authenticatedGitHubIdentitySync();
			} catch {}
			const profileId = resolveAuthenticatedProfileId(client);
			if (!profileId) {
				respond(false, void 0, authenticatedProfileUnavailableError());
				return;
			}
			respond(true, { profile: getUserProfileListItem(profileId) });
		} catch (error) {
			respond(false, void 0, profileError(error));
		}
	},
	"users.prefs.get": async ({ client, params, respond, sessionMutationAuthorization }) => {
		if (!assertValidParams(params, validateUsersPrefsGetParams, "users.prefs.get", respond)) return;
		const profileId = client?.authenticatedUserProfile?.profileId ?? "";
		if (!profileId) {
			if (isGatewayClientProfilePending(client)) {
				respond(false, void 0, authenticatedProfileUnavailableError());
				return;
			}
			respond(true, { status: "no_durable_identity" }, void 0);
			return;
		}
		try {
			const assertCurrent = preparePersonalPreferences(client);
			const preferences = await getCanonicalUserPreferences(profileId, params.keys);
			assertCurrent();
			sessionMutationAuthorization?.assertCurrent();
			if (!preferences) {
				respond(false, void 0, authenticatedProfileUnavailableError());
				return;
			}
			respond(true, {
				status: "ok",
				entries: preferences.entries
			}, void 0);
		} catch (error) {
			if (error instanceof SessionMutationAuthorizationChangedError) throw error;
			respond(false, void 0, profileError(error));
		}
	},
	"users.prefs.set": async ({ client, context, params, respond }) => {
		if (!assertValidParams(params, validateUsersPrefsSetParams, "users.prefs.set", respond)) return;
		const profileId = client?.authenticatedUserProfile?.profileId ?? "";
		if (!profileId) {
			if (isGatewayClientProfilePending(client)) {
				respond(false, void 0, authenticatedProfileUnavailableError());
				return;
			}
			respond(true, { status: "no_durable_identity" }, void 0);
			return;
		}
		try {
			const assertCurrent = preparePersonalPreferences(client);
			const result = await setCanonicalUserPreferences(profileId, params.entries, {
				expectedEntries: params.expectedEntries,
				assertCurrent
			});
			if (!result) {
				respond(false, void 0, authenticatedProfileUnavailableError());
				return;
			}
			if (!result.ok) {
				if (result.error.code === "conflict") {
					respond(true, { status: "conflict" }, void 0);
					return;
				}
				if (result.error.code === "profile-key-limit") {
					respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `users.prefs.set exceeds the ${result.error.limit}-key profile limit (current count: ${result.error.currentCount})`, { details: {
						code: GatewayErrorDetailCodes.USER_PREFS_LIMIT_EXCEEDED,
						limit: result.error.limit,
						currentCount: result.error.currentCount
					} }));
					return;
				}
				const key = "key" in result.error ? ` for ${result.error.key}` : "";
				respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `invalid users.prefs.set entry${key}: ${result.error.code}`));
				return;
			}
			respond(true, { status: "ok" }, void 0);
			publishUserPreferencesChanged(context, result.value.profileId, Object.keys(params.entries));
		} catch (error) {
			respond(false, void 0, profileError(error));
		}
	},
	"users.linkEmail": async (options) => {
		const { context, params, respond } = options;
		if (!assertValidParams(params, validateUsersLinkEmailParams, "users.linkEmail", respond)) return;
		const email = params.email.trim();
		if (!email) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "email must not be empty"));
			return;
		}
		const targetProfileId = params.targetProfileId;
		try {
			const assertCurrent = await prepareUserProfileAdministration(options);
			const { profile, display } = await linkCanonicalUserProfileEmail(email, targetProfileId, { assertCurrent });
			refreshConnectedProfile(context, profile, display);
			broadcastChatMetadataChanged(context);
			respond(true, { profile });
		} catch (error) {
			respond(false, void 0, profileError(error));
		}
	},
	"users.merge": async (options) => {
		const { context, params, respond } = options;
		if (!assertValidParams(params, validateUsersMergeParams, "users.merge", respond)) return;
		try {
			const assertCurrent = await prepareUserProfileAdministration(options);
			holdGatewayPolicyResponse(respond);
			const { profile, display, movedAliasKinds } = await mergeCanonicalUserProfiles(params.sourceProfileId, params.targetProfileId, {
				assertCurrent,
				onCommitted: (profileIds) => {
					for (const profileId of profileIds) {
						invalidateOperatorRolePolicy(profileId);
						context.disconnectClientsForUserProfile?.(profileId);
					}
				}
			});
			refreshConnectedProfile(context, profile, display);
			broadcastChatMetadataChanged(context);
			respond(true, {
				profile,
				movedAliasKinds
			});
		} catch (error) {
			respond(false, void 0, profileError(error));
		}
	},
	"users.setDisplayName": ({ client, context, params, respond }) => {
		if (!assertValidParams(params, validateUsersSetDisplayNameParams, "users.setDisplayName", respond)) return;
		try {
			if (!requireProfileMutationAccess(client, params.profileId, respond)) return;
			const profile = setDisplayName(params.profileId, params.displayName);
			refreshConnectedProfile(context, profile);
			respond(true, { profile });
		} catch (error) {
			respond(false, void 0, profileError(error));
		}
	},
	"users.setRole": async (options) => {
		const { context, params, respond } = options;
		if (!assertValidParams(params, validateUsersSetRoleParams, "users.setRole", respond)) return;
		const { profileId, role } = params;
		const isConfiguredRole = () => {
			const definitions = context.getRuntimeConfig().gateway?.roles?.definitions;
			return role === null || definitions !== void 0 && Object.hasOwn(definitions, role);
		};
		const unknownRoleMessage = `unknown operator role "${role}"; define it under gateway.roles.definitions before assigning it`;
		if (!isConfiguredRole()) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, unknownRoleMessage));
			return;
		}
		try {
			const assertCurrent = await prepareUserProfileAdministration(options);
			holdGatewayPolicyResponse(respond);
			respond(true, { profile: await setCanonicalUserProfileRole(profileId, role, {
				assertCurrent: () => {
					assertCurrent();
					if (!isConfiguredRole()) throw new Error(unknownRoleMessage);
				},
				onCommitted: (canonicalProfileId) => {
					invalidateOperatorRolePolicy(canonicalProfileId);
					context.disconnectClientsForUserProfile?.(canonicalProfileId);
				}
			}) });
		} catch (error) {
			respond(false, void 0, profileError(error));
		}
	},
	"users.setAvatar": ({ client, context, params, respond }) => {
		if (!assertValidParams(params, validateUsersSetAvatarParams, "users.setAvatar", respond)) return;
		const avatarBase64 = params.avatarBase64.trim();
		if (!isValidBase64(avatarBase64)) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "avatarBase64 must be base64"));
			return;
		}
		const bytes = Buffer.from(avatarBase64, "base64");
		try {
			if (!requireProfileMutationAccess(client, params.profileId, respond)) return;
			const result = setAvatar(params.profileId, bytes, params.mime);
			if (!result.ok) {
				respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, result.error.code));
				return;
			}
			const display = refreshConnectedProfile(context, result.value);
			respond(true, {
				profile: result.value,
				avatarRevision: display.avatarRevision
			});
		} catch (error) {
			respond(false, void 0, profileError(error));
		}
	}
};
//#endregion
export { usersHandlers };
