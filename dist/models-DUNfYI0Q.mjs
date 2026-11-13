import { l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import { C as tryResolveAmbientOwnerAgentId } from "./agent-scope-config-Dm6T00l4.mjs";
import { o as SESSION_READ_SCOPE } from "./operator-scopes-D-CL26h0.mjs";
import { a as hasGatewayClientCap, t as GATEWAY_CLIENT_CAPS } from "./client-info-S_xwnr2o.mjs";
import { wn as validateModelsListParams } from "./src-D2gvuSyP.mjs";
import { a as roleScopesAllow } from "./operator-scope-compat-Ci6GBcmU.mjs";
import { t as ErrorCodes } from "./gateway-error-details-DIefe7Zy.mjs";
import { f as errorShape } from "./error-codes-DI20vDEB.mjs";
import { t as authorizeCurrentOperatorRoleScopes } from "./operator-role-policy-Cx-TzI2k.mjs";
import { r as PreparedModelRuntimePublicationSupersededError } from "./prepared-model-runtime.errors-Dmzyx34v.mjs";
import { f as refreshExpiredPreparedModelCatalog } from "./prepared-model-catalog-2PLeV8Ci.mjs";
import { t as SessionMutationAuthorizationChangedError } from "./session-mutation-authorization-error-CCz8QGWh.mjs";
import { n as prepareOperatorModelPresentation } from "./operator-model-presentation-BiKS5bEN.mjs";
import { t as assertValidParams } from "./validation-B7TobU6-.mjs";
import { t as ModelAccountConnectAuthorityError } from "./model-account-connect-Brj88asd.mjs";
import { t as resolveAgentIdOrRespondError } from "./agent-id-shared-Ed1g6nj_.mjs";
import { n as resolveChatMetadataReadParams } from "./chat-metadata-handler-kMr67w6v.mjs";
import { t as preparePersonalModelAccountSelection } from "./users-model-account-access-JJGNloBw.mjs";
import { i as projectSessionModelCatalog } from "./chat-metadata-session-projection-CQQVogxJ.mjs";
import { i as UnknownModelCatalogProviderError, t as buildModelsListResult } from "./models-list-result-BlmkgUrX.mjs";
//#region src/gateway/server-methods/models.ts
const modelsHandlers = { "models.list": async (options) => {
	const { params, respond, context, client } = options;
	if (!assertValidParams(params, validateModelsListParams, "models.list", respond)) return;
	let scope;
	let publicationScope;
	try {
		const scoped = Boolean(params.sessionKey || params.authProfileId);
		const draftAccountSelection = !params.sessionKey && params.authProfileId ? await preparePersonalModelAccountSelection(options, params.authProfileId, SESSION_READ_SCOPE) : void 0;
		scope = scoped ? resolveChatMetadataReadParams(options, params, draftAccountSelection) : void 0;
		if (scoped && !scope) return;
		const cfg = context.getRuntimeConfig();
		const resolved = scope ?? resolveAgentIdOrRespondError({
			rawAgentId: params.agentId ?? tryResolveAmbientOwnerAgentId(cfg),
			respond,
			cfg,
			normalize: normalizeOptionalString
		});
		if (!resolved) return;
		if (!scope) {
			const roleError = authorizeCurrentOperatorRoleScopes(client, cfg);
			if (roleError) {
				respond(false, void 0, roleError);
				return;
			}
			const scopes = client?.connect.scopes ?? [];
			if (roleScopesAllow({
				role: "operator",
				requestedScopes: ["operator.sessions.read"],
				allowedScopes: scopes
			}) && !roleScopesAllow({
				role: "operator",
				requestedScopes: ["operator.read"],
				allowedScopes: scopes
			})) {
				scope = resolveChatMetadataReadParams(options, { agentId: resolved.agentId });
				if (!scope) return;
			}
		}
		publicationScope = scope ?? resolveChatMetadataReadParams(options, { agentId: resolved.agentId });
		if (!publicationScope) return;
		if (params.refresh !== true) refreshExpiredPreparedModelCatalog({
			agentId: resolved.agentId,
			config: cfg
		});
		const result = await buildModelsListResult({
			source: {
				kind: "gateway",
				context
			},
			agentId: resolved.agentId,
			params,
			includeManualSelection: hasGatewayClientCap(client?.connect.caps, GATEWAY_CLIENT_CAPS.MODEL_SELECTION_POLICY),
			requesterProfileId: publicationScope.requesterProfileId,
			...scope ? { readScope: scope } : {}
		});
		publicationScope.draftAccountSelection?.assertCurrent();
		publicationScope.assertCurrent?.();
		const currentConfig = context.getRuntimeConfig();
		const projected = scope && params.view !== "provider-config" ? {
			...result,
			models: projectSessionModelCatalog(scope, result.models, currentConfig)
		} : result;
		const policy = prepareOperatorModelPresentation({
			cfg: currentConfig,
			policyConfig: context.getCommittedRuntimeConfig?.() ?? currentConfig,
			client
		})?.forAgent(resolved.agentId, projected.models);
		respond(true, policy ? policy.catalog(projected) : projected, void 0);
	} catch (error) {
		if (error instanceof UnknownModelCatalogProviderError) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, error.message));
			return;
		}
		if (error instanceof SessionMutationAuthorizationChangedError) {
			respond(false, void 0, error.error);
			return;
		}
		if (error instanceof PreparedModelRuntimePublicationSupersededError) {
			respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, error.message, {
				retryable: true,
				retryAfterMs: 0
			}));
			return;
		}
		if (!(error instanceof ModelAccountConnectAuthorityError)) throw error;
		respond(false, void 0, errorShape(ErrorCodes.FORBIDDEN, error.message));
	} finally {
		(publicationScope ?? scope)?.release?.();
	}
} };
//#endregion
export { modelsHandlers };
