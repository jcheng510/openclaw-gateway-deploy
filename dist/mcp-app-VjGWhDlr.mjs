import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { i as logWarn } from "./logger-DmolGPgx.mjs";
import { a as updateMcpAppModelContext } from "./mcp-app-model-context-CZq9Kt1b.mjs";
import { r as GatewayErrorDetailCodes, t as ErrorCodes } from "./gateway-error-details-DIefe7Zy.mjs";
import { f as errorShape } from "./error-codes-DI20vDEB.mjs";
import { n as authorizeOperatorScopesForMethod } from "./method-scopes-DZtl1Vvs.mjs";
import { n as resolveRequestedSessionAgentId } from "./session-request-agent-DFWpsx2m.mjs";
import { s as buildMcpAppSandboxPath } from "./mcp-ui-resource-BI2vS_SR.mjs";
import { a as resolveMcpAppActiveView, i as requireMcpAppInteraction, n as executeMcpAppOperation, s as withMcpAppActiveView, t as McpAppViewExpiredError } from "./mcp-app-operations-BBixrbsA.mjs";
import { t as createMcpAppStandaloneTicket } from "./mcp-app-standalone-BThOpJmo.mjs";
//#region src/gateway/server-methods/mcp-app.ts
function requireString(params, key) {
	const value = params[key];
	if (typeof value !== "string" || !value.trim()) throw new Error(`${key} is required`);
	return value.trim();
}
function optionalCursor(params) {
	const cursor = params.cursor;
	return typeof cursor === "string" && cursor.trim() ? { cursor: cursor.trim() } : void 0;
}
var McpAppRequestError = class extends Error {
	constructor(shape) {
		super(shape.message);
		this.shape = shape;
	}
};
function resolveMcpAppSessionOwner(params, cfg) {
	const sessionKey = requireString(params, "sessionKey");
	const explicitAgentId = typeof params.agentId === "string" && params.agentId.trim() ? params.agentId.trim() : void 0;
	const owner = resolveRequestedSessionAgentId(cfg, sessionKey, explicitAgentId);
	if (!owner.ok) throw new McpAppRequestError(owner.error);
	return owner.agentId;
}
function operationHandler(buildOperation) {
	return async ({ respond, params, context }) => {
		await handle(respond, async () => {
			const operation = buildOperation(params);
			const cfg = context.getRuntimeConfig();
			const active = await resolveMcpAppActiveView({
				sessionKey: requireString(params, "sessionKey"),
				agentId: resolveMcpAppSessionOwner(params, cfg),
				viewId: requireString(params, "viewId")
			});
			return await executeMcpAppOperation(active, operation);
		});
	};
}
async function handle(respond, operation) {
	try {
		respond(true, await operation());
	} catch (error) {
		respond(false, void 0, error instanceof McpAppRequestError ? error.shape : errorShape(ErrorCodes.UNAVAILABLE, formatErrorMessage(error), error instanceof McpAppViewExpiredError ? { details: { code: GatewayErrorDetailCodes.MCP_APP_VIEW_EXPIRED } } : void 0));
	}
}
const mcpAppHandlers = {
	"mcp.app.view": async ({ respond, params, context, client }) => {
		await handle(respond, async () => {
			const active = await resolveMcpAppActiveView({
				sessionKey: requireString(params, "sessionKey"),
				agentId: resolveMcpAppSessionOwner(params, context.getRuntimeConfig()),
				viewId: requireString(params, "viewId"),
				cfg: context.getRuntimeConfig()
			});
			return await withMcpAppActiveView(active, "read", async () => {
				const { view } = active;
				let interactive = false;
				try {
					await requireMcpAppInteraction(view);
					interactive = true;
				} catch {}
				const updateModelContextSupported = interactive && active.runtime.mcpAppModelContextRevoked !== true;
				const sandboxPort = context.getMcpAppSandboxPort?.() ?? await context.ensureSandboxHostPort?.();
				if (sandboxPort === void 0) throw new Error("MCP App sandbox listener is unavailable; restart the Gateway");
				const configuredOrigin = context.getRuntimeConfig().mcp?.apps?.sandboxOrigin;
				let standalone = void 0;
				try {
					standalone = createMcpAppStandaloneTicket({
						sessionKey: requireString(params, "sessionKey"),
						view,
						toolOperationsAuthorized: authorizeOperatorScopesForMethod("mcp.app.callTool", client?.connect?.scopes ?? []).allowed
					});
				} catch (error) {
					logWarn(`mcp-app: standalone ticket unavailable: ${formatErrorMessage(error)}`);
				}
				return {
					sandboxUrl: buildMcpAppSandboxPath(view.csp),
					sandboxPort,
					...configuredOrigin ? { sandboxOrigin: new URL(configuredOrigin).origin } : {},
					html: view.html,
					...view.csp ? { csp: view.csp } : {},
					toolInput: view.toolInput,
					toolResult: view.toolResult,
					...standalone ? {
						standaloneUrl: standalone.url,
						standaloneExpiresAtMs: standalone.expiresAtMs
					} : {},
					messageSupported: interactive,
					updateModelContextSupported
				};
			});
		});
	},
	"mcp.app.updateModelContext": async ({ respond, params, context }) => {
		await handle(respond, async () => {
			const active = await resolveMcpAppActiveView({
				sessionKey: requireString(params, "sessionKey"),
				agentId: resolveMcpAppSessionOwner(params, context.getRuntimeConfig()),
				viewId: requireString(params, "viewId")
			});
			return await withMcpAppActiveView(active, "read", async () => {
				await requireMcpAppInteraction(active.view);
				updateMcpAppModelContext(active.runtime, active.view, params);
				return {};
			});
		});
	},
	"mcp.app.callTool": operationHandler((params) => ({
		method: "tools/call",
		params: {
			name: requireString(params, "toolName"),
			arguments: params.arguments ?? {}
		}
	})),
	"mcp.app.listTools": operationHandler((params) => ({
		method: "tools/list",
		params: optionalCursor(params) ?? {}
	})),
	"mcp.app.listResources": operationHandler((params) => ({
		method: "resources/list",
		params: optionalCursor(params) ?? {}
	})),
	"mcp.app.listResourceTemplates": operationHandler((params) => ({
		method: "resources/templates/list",
		params: optionalCursor(params) ?? {}
	})),
	"mcp.app.readResource": operationHandler((params) => ({
		method: "resources/read",
		params: { uri: requireString(params, "uri") }
	}))
};
//#endregion
export { mcpAppHandlers };
