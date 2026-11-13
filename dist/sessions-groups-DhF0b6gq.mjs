import { l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { t as ADMIN_SCOPE } from "./operator-scopes-D-CL26h0.mjs";
import { Fi as validateSessionsGroupsDefaultsParams, Hi as validateSessionsGroupsRenameParams, Li as validateSessionsGroupsDeleteParams, Ri as validateSessionsGroupsListParams, Ui as validateSessionsGroupsUpdateParams, Vi as validateSessionsGroupsPutParams } from "./src-D2gvuSyP.mjs";
import { t as ErrorCodes } from "./gateway-error-details-DIefe7Zy.mjs";
import { f as errorShape, p as missingScopeErrorShape } from "./error-codes-DI20vDEB.mjs";
import "./method-scopes-DZtl1Vvs.mjs";
import { n as resolveSessionStoreAgentId } from "./session-store-key-__CfQfd2.mjs";
import { t as SessionMutationAuthorizationChangedError } from "./session-mutation-authorization-error-CCz8QGWh.mjs";
import { f as isGatewayAdmin } from "./session-sharing-policy-BALdNo4L.mjs";
import { n as resolveWorkspacePathContainment, t as isWorkspacePathContainmentCurrent } from "./workspace-path-containment-DROBlMFm.mjs";
import { n as getSessionRowProjection } from "./session-row-projection-access-tcGTz6Lk.mjs";
import { _ as updateSessionGroupDefaults, c as SessionGroupNotEmptyError, f as listSessionGroupDefaults, g as renameSessionGroup, h as putSessionGroups, l as SessionGroupNotFoundError, m as listSidebarSectionOrder, p as listSessionGroups, u as deleteSessionGroup, x as prepareProjectedSessionSharing } from "./session-sharing-Bhe-fXzH.mjs";
import { t as ensureSessionGroupCatalog } from "./session-group-catalog-_0wFjk_O.mjs";
import { r as emitSessionsChanged } from "./session-change-event-Biy7CorC.mjs";
import { n as defineValidatedGatewayHandler, t as assertValidParams } from "./validation-B7TobU6-.mjs";
import path from "node:path";
//#region src/gateway/session-group-defaults-access.ts
/** Keep shared group settings visible only where every member session is mutable. */
async function filterMutableSessionGroupRecords(params) {
	if (params.records().length === 0) return [];
	if (isGatewayAdmin(params.client)) return [...params.records()];
	const projection = getSessionRowProjection(params.context);
	if (!projection) throw new Error("Session group membership is unavailable during Gateway startup");
	do
		await projection.prepareMembership();
	while (projection.needsMembershipPreparation());
	const records = params.records();
	const sharing = prepareProjectedSessionSharing({
		cfg: projection.state.policyConfig,
		client: params.client,
		isMember: (target, identityId) => projection.hasMembership(target.storePath, target.storeKey, identityId)
	});
	const allowed = new Set(records.map((record) => record.name));
	for (const [name, targetRefs] of projection.sessionGroupTargets()) {
		if (!allowed.has(name)) continue;
		for (const ref of targetRefs) {
			const agentId = resolveSessionStoreAgentId(projection.state.cfg, ref.sessionKey, ref.agentId);
			const target = projection.sharingTarget({
				agentId,
				key: ref.sessionKey
			});
			if (!target || sharing.authorizeTarget(target)) {
				allowed.delete(name);
				break;
			}
		}
	}
	return records.filter((record) => allowed.has(record.name));
}
//#endregion
//#region src/gateway/server-methods/sessions-groups.ts
const sessionGroupHandlers = {
	"sessions.groups.list": defineValidatedGatewayHandler("sessions.groups.list", validateSessionsGroupsListParams, async ({ respond }) => {
		await ensureSessionGroupCatalog();
		respond(true, {
			groups: listSessionGroups(),
			sectionOrder: listSidebarSectionOrder()
		}, void 0);
	}),
	"sessions.groups.defaults": defineValidatedGatewayHandler("sessions.groups.defaults", validateSessionsGroupsDefaultsParams, async ({ respond, client, context }) => {
		await ensureSessionGroupCatalog();
		respond(true, { defaults: await filterMutableSessionGroupRecords({
			client,
			context,
			records: () => listSessionGroupDefaults()
		}) }, void 0);
	}),
	"sessions.groups.put": async ({ params, respond, context, sessionMutationAuthorization }) => {
		if (!assertValidParams(params, validateSessionsGroupsPutParams, "sessions.groups.put", respond)) return;
		try {
			respond(true, {
				ok: true,
				groups: await putSessionGroups({
					cfg: context.getRuntimeConfig(),
					names: params.names,
					sectionOrder: params.sectionOrder,
					assertCurrent: sessionMutationAuthorization?.assertCurrent,
					assertTargetCurrent: sessionMutationAuthorization?.assertTargetCurrent
				}),
				sectionOrder: listSidebarSectionOrder()
			}, void 0);
			emitSessionsChanged(context, { reason: "groups" });
		} catch (error) {
			if (error instanceof SessionMutationAuthorizationChangedError) throw error;
			if (error instanceof SessionGroupNotEmptyError) {
				respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, error.message));
				return;
			}
			respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, formatErrorMessage(error)));
		}
	},
	"sessions.groups.rename": defineValidatedGatewayHandler("sessions.groups.rename", validateSessionsGroupsRenameParams, async ({ params, respond, context, sessionMutationAuthorization }) => {
		try {
			respond(true, {
				ok: true,
				...await renameSessionGroup({
					cfg: context.getRuntimeConfig(),
					name: params.name,
					to: params.to,
					assertCurrent: sessionMutationAuthorization?.assertCurrent,
					assertTargetCurrent: sessionMutationAuthorization?.assertTargetCurrent
				})
			}, void 0);
		} catch (error) {
			if (error instanceof SessionMutationAuthorizationChangedError) throw error;
			if (error instanceof SessionGroupNotFoundError) {
				respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, error.message));
				return;
			}
			respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, formatErrorMessage(error)));
		} finally {
			emitSessionsChanged(context, { reason: "groups" });
		}
	}),
	"sessions.groups.update": defineValidatedGatewayHandler("sessions.groups.update", validateSessionsGroupsUpdateParams, async ({ params, respond, context, client, sessionMutationAuthorization }) => {
		if (params.cwd && !path.isAbsolute(params.cwd)) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "session group cwd must be absolute"));
			return;
		}
		const name = normalizeOptionalString(params.name);
		if (!name) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "session group name must not be empty"));
			return;
		}
		let cwd = params.cwd;
		const clientScopes = Array.isArray(client?.connect?.scopes) ? client.connect.scopes : [];
		if (cwd && !clientScopes.includes("operator.admin")) {
			const containment = await resolveWorkspacePathContainment(cwd, context.getRuntimeConfig());
			if (!containment || !isWorkspacePathContainmentCurrent(containment, context.getRuntimeConfig())) {
				respond(false, void 0, missingScopeErrorShape({
					missingScope: ADMIN_SCOPE,
					requiredScopes: [ADMIN_SCOPE]
				}));
				return;
			}
			cwd = containment.path;
		}
		const assertCurrent = (currentTargets) => {
			sessionMutationAuthorization?.assertCurrent();
			if (sessionMutationAuthorization) for (const target of currentTargets ?? []) sessionMutationAuthorization.assertTargetCurrent(target);
		};
		if (!await updateSessionGroupDefaults(name, {
			cwd,
			worktree: params.worktree
		}, process.env, assertCurrent, context.getRuntimeConfig())) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `unknown session group: ${name}`));
			return;
		}
		respond(true, {
			ok: true,
			defaults: await filterMutableSessionGroupRecords({
				client,
				context,
				records: () => listSessionGroupDefaults()
			})
		}, void 0);
		emitSessionsChanged(context, { reason: "groups" });
	}),
	"sessions.groups.delete": defineValidatedGatewayHandler("sessions.groups.delete", validateSessionsGroupsDeleteParams, async ({ params, respond, context, sessionMutationAuthorization }) => {
		try {
			respond(true, {
				ok: true,
				...await deleteSessionGroup({
					cfg: context.getRuntimeConfig(),
					name: params.name,
					assertCurrent: sessionMutationAuthorization?.assertCurrent,
					assertTargetCurrent: sessionMutationAuthorization?.assertTargetCurrent
				})
			}, void 0);
		} catch (error) {
			if (error instanceof SessionMutationAuthorizationChangedError) throw error;
			respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, formatErrorMessage(error)));
		} finally {
			emitSessionsChanged(context, { reason: "groups" });
		}
	})
};
//#endregion
export { sessionGroupHandlers };
