import { l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import { n as normalizeAgentId } from "./agent-id-D1-Q6vR4.mjs";
import "./session-key-BC4m_Ly5.mjs";
import { g as resolveSessionAgentId } from "./agent-scope-L_eY3Hj7.mjs";
import { o as SESSION_READ_SCOPE } from "./operator-scopes-D-CL26h0.mjs";
import { K as validateChatMetadataParams } from "./src-D2gvuSyP.mjs";
import { H as readUserProfileAliasRevision } from "./user-profiles-internal-Co87Y1ZN.mjs";
import { t as ErrorCodes } from "./gateway-error-details-DIefe7Zy.mjs";
import { f as errorShape } from "./error-codes-DI20vDEB.mjs";
import { c as readOperatorRolePolicyRevision } from "./operator-role-policy-Cx-TzI2k.mjs";
import { r as PreparedModelRuntimePublicationSupersededError } from "./prepared-model-runtime.errors-Dmzyx34v.mjs";
import { n as resolveRequestedSessionAgentId } from "./session-request-agent-DFWpsx2m.mjs";
import { t as SessionMutationAuthorizationChangedError } from "./session-mutation-authorization-error-CCz8QGWh.mjs";
import { d as hiddenSessionNotFound, u as hasSessionReadAccessChanged } from "./session-sharing-policy-BALdNo4L.mjs";
import { n as prepareOperatorModelPresentation } from "./operator-model-presentation-BiKS5bEN.mjs";
import { b as createSessionListEntryFilter } from "./session-sharing-Bhe-fXzH.mjs";
import { t as assertValidParams } from "./validation-B7TobU6-.mjs";
import { t as ModelAccountConnectAuthorityError } from "./model-account-connect-Brj88asd.mjs";
import { t as retainGatewaySessionEntryReadOnly } from "./session-utils-read-lifetime-p0hweLpu.mjs";
import { t as resolveAgentIdOrRespondError } from "./agent-id-shared-Ed1g6nj_.mjs";
import { t as preparePersonalModelAccountSelection } from "./users-model-account-access-JJGNloBw.mjs";
import { r as resolveAuthenticatedProfileId } from "./users-profile-access-CXHxWyKf.mjs";
import { isDeepStrictEqual } from "node:util";
//#region src/gateway/server-methods/chat-metadata-contract.ts
const chatMetadataSessionFields = [
	"sessionId",
	"lifecycleRevision",
	"sessionStartedAt",
	"acp",
	"agentHarnessId",
	"agentRuntimeOverride",
	"modelSelectionLocked",
	"pluginOwnerId",
	"providerOverride",
	"modelOverride",
	"modelOverrideRouteResolution",
	"modelOverrideFallbackOriginProvider",
	"modelOverrideFallbackOriginModel",
	"authProfileOverride",
	"authProfileOverrideSource",
	"authProfileOverrideCompactionCount"
];
//#endregion
//#region src/gateway/server-methods/chat-metadata-handler.ts
/** Resolve saved-session grants or capture a new draft's current human authority. */
function resolveChatMetadataReadParams(options, params, draftAccountSelection) {
	const { respond, context, client, signal } = options;
	const cfg = context.getRuntimeConfig();
	const roleRevision = readOperatorRolePolicyRevision();
	const aliasRevision = readUserProfileAliasRevision();
	const profileInput = client?.authenticatedUserProfile?.profileId;
	const userInput = client?.authenticatedUserId;
	const isRequestCurrent = () => !signal?.aborted && readOperatorRolePolicyRevision() === roleRevision && readUserProfileAliasRevision() === aliasRevision && client?.authenticatedUserProfile?.profileId === profileInput && client?.authenticatedUserId === userInput;
	const assertRequestCurrent = () => {
		if (!isRequestCurrent() || context.getRuntimeConfig() !== cfg) throw new PreparedModelRuntimePublicationSupersededError("Chat metadata access changed while preparing its metadata. Retry the request.");
	};
	if (params.sessionKey) {
		const sessionKey = params.sessionKey;
		const requested = resolveRequestedSessionAgentId(cfg, params.sessionKey, normalizeOptionalString(params.agentId));
		if (!requested.ok) {
			respond(false, void 0, requested.error);
			return;
		}
		const requesterProfileId = resolveAuthenticatedProfileId(client);
		const session = retainGatewaySessionEntryReadOnly(params.sessionKey, requested.agentId, (previous, current) => !hasSessionReadAccessChanged(previous, current) && chatMetadataSessionFields.every((field) => isDeepStrictEqual(previous[field], current[field])));
		const isCurrent = () => isRequestCurrent() && session.isCurrent();
		const assertVisible = () => {
			const visible = createSessionListEntryFilter({
				client,
				cfg: (context.getCommittedRuntimeConfig ?? context.getRuntimeConfig)()
			});
			if (session.entry && visible?.(session.legacyKey ?? session.canonicalKey, session.entry) === false) throw new SessionMutationAuthorizationChangedError(hiddenSessionNotFound(sessionKey));
		};
		try {
			assertVisible();
			return {
				agentId: resolveSessionAgentId({
					sessionKey: params.sessionKey,
					config: session.cfg,
					agentId: requested.agentId
				}),
				sessionKey: session.canonicalKey,
				storePath: session.readSource?.path ?? session.storePath,
				sessionEntry: session.entry,
				isCurrent,
				assertCurrent: () => {
					assertVisible();
					assertRequestCurrent();
					if (!session.isCurrentAtResponse()) throw new PreparedModelRuntimePublicationSupersededError("Session changed while preparing its metadata. Retry the request.");
				},
				release: session.release,
				requesterProfileId
			};
		} catch (error) {
			session.release();
			throw error;
		}
	}
	const resolved = resolveAgentIdOrRespondError({
		rawAgentId: params.agentId,
		respond,
		cfg,
		normalize: (id) => typeof id === "string" && id.trim() ? normalizeAgentId(id) : void 0
	});
	if (!resolved) return;
	assertRequestCurrent();
	draftAccountSelection?.assertCurrent();
	return {
		agentId: resolved.agentId,
		requesterProfileId: draftAccountSelection?.owner ?? resolveAuthenticatedProfileId(client),
		isCurrent: isRequestCurrent,
		assertCurrent: assertRequestCurrent,
		...draftAccountSelection ? { draftAccountSelection } : {}
	};
}
async function handleChatMetadataRequest(options) {
	const { params, respond, context, client } = options;
	if (!assertValidParams(params, validateChatMetadataParams, "chat.metadata", respond)) return;
	let scope;
	try {
		scope = resolveChatMetadataReadParams(options, params, !params.sessionKey && params.authProfileId ? await preparePersonalModelAccountSelection(options, params.authProfileId, SESSION_READ_SCOPE) : void 0);
		if (!scope) return;
		const metadata = await context.readChatMetadata(scope);
		scope.draftAccountSelection?.assertCurrent();
		scope.assertCurrent?.();
		const cfg = context.getRuntimeConfig();
		const policy = prepareOperatorModelPresentation({
			cfg,
			policyConfig: context.getCommittedRuntimeConfig?.() ?? cfg,
			client
		})?.forAgent(scope.agentId, metadata.models);
		respond(true, policy ? policy.metadata(metadata) : metadata);
	} catch (error) {
		if (error instanceof SessionMutationAuthorizationChangedError) {
			respond(false, void 0, error.error);
			return;
		}
		if (!(error instanceof ModelAccountConnectAuthorityError)) throw error;
		respond(false, void 0, errorShape(ErrorCodes.FORBIDDEN, error.message));
	} finally {
		scope?.release?.();
	}
}
//#endregion
export { resolveChatMetadataReadParams as n, handleChatMetadataRequest as t };
