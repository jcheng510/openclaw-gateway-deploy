import "./operator-scopes-D-CL26h0.mjs";
import { ei as validateSessionPortalCloseParams, fr as validatePortalCloseParams, mr as validatePortalOpenParams, ni as validateSessionPortalOpenParams, pr as validatePortalListParams, ti as validateSessionPortalListParams } from "./src-D2gvuSyP.mjs";
import { t as ErrorCodes } from "./gateway-error-details-DIefe7Zy.mjs";
import { f as errorShape } from "./error-codes-DI20vDEB.mjs";
import { t as captureSessionPortalTarget } from "./session-portal-target-D54R2k-a.mjs";
import { r as defineValidatedGatewayMethod } from "./validation-B7TobU6-.mjs";
import { n as resolveSessionEnvironmentCaller } from "./environments.session-DyQez4z1.mjs";
//#region src/gateway/server-methods/portals.session.ts
function sessionPortalOwner(options, environmentId) {
	const access = options.sessionAccessAuthority;
	const environments = options.context.workerEnvironmentService;
	const service = options.context.portalService;
	if (!access || !environments || !service) throw new Error("Session preview authority or transport is unavailable");
	if (access.sandboxRequired) throw new Error("This conversation requires sandbox isolation; attached machine previews are unavailable");
	const target = captureSessionPortalTarget(environments, {
		...access.target,
		sessionLifecycleRevision: access.target.lifecycleRevision
	}, environmentId);
	const assertInvocationCurrent = () => {
		access.assertCurrent();
		target.assertCurrent();
	};
	assertInvocationCurrent();
	const { binding } = target;
	const resourceOwnerKey = JSON.stringify([
		binding.agentId,
		binding.sessionKey,
		binding.sessionId,
		binding.sessionLifecycleRevision ?? null,
		binding.generation
	]);
	return {
		...target,
		resourceOwnerKey,
		environments,
		service,
		access,
		assertAllowed: assertInvocationCurrent
	};
}
function fail(options, error) {
	options.respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, error instanceof Error ? error.message : "Session preview request failed"));
}
function changed(options) {
	options.context.broadcast("portal.changed", { portals: options.context.portalService.list().map(({ url: _url, tokenQuery: _token, ...portal }) => portal) }, { dropIfSlow: true });
}
const sessionPortalHandlers = {
	"portal.session.list": defineValidatedGatewayMethod("portal.session.list", validateSessionPortalListParams, (options) => {
		try {
			const owner = sessionPortalOwner(options, options.params.environmentId);
			const portals = owner.service.listWorkerPortals(owner.binding.environmentId, owner.binding.ownerEpoch, owner.resourceOwnerKey);
			owner.assertAllowed();
			options.respond(true, { portals });
		} catch (error) {
			fail(options, error);
		}
	}),
	"portal.session.open": defineValidatedGatewayMethod("portal.session.open", validateSessionPortalOpenParams, async (options) => {
		try {
			const request = options.params;
			const owner = sessionPortalOwner(options, request.environmentId);
			await owner.touch();
			owner.assertAllowed();
			const session = owner.access.retainSession();
			let connection;
			try {
				session.assertCurrent();
				connection = await owner.environments.openNodePortal({
					environmentId: owner.binding.environmentId,
					ownerEpoch: owner.binding.ownerEpoch,
					remotePort: request.port
				});
			} catch (error) {
				session.release();
				throw error;
			}
			const close = async () => {
				try {
					await connection.close();
				} finally {
					session.release();
				}
			};
			try {
				owner.assertAllowed();
				session.assertCurrent();
			} catch (error) {
				await close();
				throw error;
			}
			const opened = await owner.service.open({
				targetPort: request.port,
				resourceOwnerKey: owner.resourceOwnerKey,
				assertCurrent: owner.assertAllowed,
				ownerSignal: AbortSignal.any([session.signal, owner.signal]),
				target: {
					kind: "worker",
					environmentId: owner.binding.environmentId,
					ownerEpoch: owner.binding.ownerEpoch,
					remotePort: request.port,
					connect: () => connection.connect(() => {
						session.assertCurrent();
						owner.assertCurrent();
					}, owner.touch)
				},
				onClose: close,
				...request.title !== void 0 ? { title: request.title } : {},
				...request.description !== void 0 ? { description: request.description } : {},
				...request.path !== void 0 ? { path: request.path } : {}
			});
			changed(options);
			owner.assertAllowed();
			options.respond(true, opened);
		} catch (error) {
			fail(options, error);
		}
	}),
	"portal.session.close": defineValidatedGatewayMethod("portal.session.close", validateSessionPortalCloseParams, async (options) => {
		try {
			const owner = sessionPortalOwner(options, options.params.environmentId);
			if (!owner.service.listWorkerPortals(owner.binding.environmentId, owner.binding.ownerEpoch, owner.resourceOwnerKey).some(({ id }) => id === options.params.id)) throw new Error("Portal does not belong to this conversation's attached environment");
			await owner.service.close(options.params.id, owner.assertAllowed);
			changed(options);
			owner.assertAllowed();
			options.respond(true, { closed: true });
		} catch (error) {
			fail(options, error);
		}
	})
};
//#endregion
//#region src/gateway/server-methods/portals.ts
function requirePortalService(context, respond) {
	const service = context.portalService;
	if (!service) respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "portals unavailable"));
	return service;
}
function redactPortalSummary(summary) {
	const { tokenQuery: _tokenQuery, url: _url, ...redacted } = summary;
	return redacted;
}
function attachedPortalOwner(options, environmentId) {
	const { context } = options;
	const environments = context.workerEnvironmentService;
	if (!environments) throw new Error("Conversation environments are unavailable");
	const caller = resolveSessionEnvironmentCaller(options);
	const binding = environments.findSessionAttachment(caller.identity);
	if (!binding || binding.environmentId !== environmentId) throw new Error("Portal environment is not attached to this conversation");
	const assertCurrent = () => {
		caller.assertCurrent();
		environments.assertSessionAttachment(binding);
	};
	assertCurrent();
	return {
		binding,
		environments,
		assertCurrent
	};
}
const portalHandlers = {
	...sessionPortalHandlers,
	"portal.list": defineValidatedGatewayMethod("portal.list", validatePortalListParams, (options) => {
		const { params, respond, context, client } = options;
		const service = requirePortalService(context, respond);
		if (!service) return;
		const scopes = Array.isArray(client?.connect?.scopes) ? client.connect.scopes : [];
		let portals;
		try {
			const owner = params.environmentId ? attachedPortalOwner(options, params.environmentId) : void 0;
			portals = owner ? service.listWorkerPortals(owner.binding.environmentId, owner.binding.ownerEpoch) : service.list();
		} catch (error) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, String(error)));
			return;
		}
		respond(true, { portals: scopes.includes("operator.write") || scopes.includes("operator.admin") ? portals : portals.map(redactPortalSummary) }, void 0);
	}),
	"portal.open": defineValidatedGatewayMethod("portal.open", validatePortalOpenParams, async (options) => {
		const { params: request, respond, context } = options;
		const service = requirePortalService(context, respond);
		if (!service) return;
		try {
			const owner = request.environmentId ? attachedPortalOwner(options, request.environmentId) : void 0;
			await owner?.environments.touchSessionAttachment(owner.binding);
			owner?.assertCurrent();
			const connection = owner ? await owner.environments.openNodePortal({
				environmentId: owner.binding.environmentId,
				ownerEpoch: owner.binding.ownerEpoch,
				remotePort: request.port
			}) : void 0;
			try {
				owner?.assertCurrent();
			} catch (error) {
				await connection?.close();
				throw error;
			}
			const opened = await service.open({
				targetPort: request.port,
				...owner && connection ? {
					target: {
						kind: "worker",
						environmentId: owner.binding.environmentId,
						ownerEpoch: owner.binding.ownerEpoch,
						remotePort: request.port,
						connect: () => connection.connect(() => owner.environments.assertSessionAttachment(owner.binding), () => owner.environments.touchSessionAttachment(owner.binding))
					},
					assertCurrent: owner.assertCurrent,
					onClose: connection.close
				} : {},
				...request.title !== void 0 ? { title: request.title } : {},
				...request.description !== void 0 ? { description: request.description } : {},
				...request.path !== void 0 ? { path: request.path } : {}
			});
			owner?.assertCurrent();
			context.broadcast("portal.changed", { portals: service.list().map(redactPortalSummary) }, { dropIfSlow: true });
			respond(true, opened, void 0);
		} catch (error) {
			respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, error instanceof Error ? error.message : String(error)));
		}
	}),
	"portal.close": defineValidatedGatewayMethod("portal.close", validatePortalCloseParams, async (options) => {
		const { params, respond, context } = options;
		const service = requirePortalService(context, respond);
		if (!service) return;
		try {
			const owner = params.environmentId ? attachedPortalOwner(options, params.environmentId) : void 0;
			if (owner && !service.listWorkerPortals(owner.binding.environmentId, owner.binding.ownerEpoch).some((portal) => portal.id === params.id)) throw new Error("Portal does not belong to the attached environment");
			if (owner) await service.close(params.id, owner.assertCurrent);
			else await service.close(params.id);
			owner?.assertCurrent();
			context.broadcast("portal.changed", { portals: service.list().map(redactPortalSummary) }, { dropIfSlow: true });
			respond(true, { closed: true }, void 0);
		} catch (error) {
			respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, error instanceof Error ? error.message : String(error)));
		}
	})
};
//#endregion
export { portalHandlers };
