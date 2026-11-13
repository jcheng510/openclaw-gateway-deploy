import { n as buildTemporalContextText } from "./date-time-B8B56dzx.mjs";
import { i as buildUiPresentationPrompt, t as buildHarnessVisibleReplyGuidance } from "./source-reply-delivery-mode-C0QKYTyh.mjs";
import { t as log } from "./logger-CRHWOiHk.mjs";
import { c as buildSkillWorkshopPromptSection, d as buildCredentialSafetyPrompt, l as buildDelegationGuidanceSection, u as resolveMainSessionDelegationMode } from "./watched-sessions-prompt-CC-PSkBX.mjs";
import { b as prepareAgentWorkspaceContext, r as buildWatchedSessionsHarnessContext } from "./agent-harness-runtime-CnrNnAqy.mjs";
import { o as resolveAgentWorkspaceMemoryRouting, s as shouldIncludeAgentHarnessRuntimeContext } from "./agent-harness-attempt-runtime-4hy2BjTq.mjs";
//#region extensions/agentsapi/agentsapi-prompt.ts
const OPENAI_HOSTED_ENVIRONMENT_INSTRUCTIONS = [
	"You are the OpenClaw assistant. Use your hosted Linux workspace for commands and files.",
	"OpenClaw functions run in the Gateway and use its workspace; your hosted VM owns shell commands and VM files.",
	"Input attachments are mapped to hosted VM paths in each user message. Write deliverable files under /workspace/outputs; OpenClaw transfers them and attaches them to your final reply after your turn completes.",
	"Gateway messaging functions cannot open hosted VM paths. Finish your assistant turn to deliver hosted output attachments."
].join("\n\n");
const SELF_HOSTED_ENVIRONMENT_INSTRUCTIONS = [
	"You are the OpenClaw assistant. Use your connected self-hosted executor for commands and workspace files.",
	"OpenClaw functions run in the Gateway and use its workspace. Native shell commands and file operations run in your connected executor's workspace.",
	"OpenClaw does not transfer input attachments or output files to or from this executor."
].join("\n\n");
/** The native session owns this snapshot until OpenClaw resets its binding. */
async function buildAgentsApiInstructions(params, tools, environment) {
	const toolNames = new Set(tools.map((tool) => tool.name));
	const workspaceDir = params.bootstrapWorkspaceDir ?? params.workspaceDir;
	const { memoryToolNames, memoryToolRouted } = resolveAgentWorkspaceMemoryRouting({
		config: params.config,
		agentId: params.agentId,
		workspaceDir,
		toolNames
	});
	const workspace = await prepareAgentWorkspaceContext({
		scope: "full",
		workspaceDir,
		config: params.config,
		sessionKey: params.sessionKey,
		sessionId: params.sessionId,
		bootstrapUserProfileId: params.bootstrapUserProfileId,
		agentId: params.agentId,
		chatType: params.chatType,
		contextMode: params.bootstrapContextMode,
		runKind: params.bootstrapContextRunKind,
		warn: (message) => log.warn(message),
		memoryToolRouted,
		memoryTools: shouldIncludeAgentHarnessRuntimeContext(params) ? {
			toolNames: [...toolNames],
			citationsMode: params.config?.memory?.citations
		} : void 0
	});
	const messageTool = tools.find((tool) => tool.name === "message");
	const fullPrompt = params.promptMode !== "minimal" && params.promptMode !== "none";
	const delegationAvailable = params.disableTools !== true && params.delegationCapability !== "report_only" && params.sourceReplyDeliveryMode !== "message_tool_only";
	return joinSections([
		environment.type === "openai_hosted" ? OPENAI_HOSTED_ENVIRONMENT_INSTRUCTIONS : `${SELF_HOSTED_ENVIRONMENT_INSTRUCTIONS}\n\nYour executor workspace directory is ${JSON.stringify(environment.workspace_directory)}.`,
		environment.type === "openai_hosted" ? "OpenClaw workspace files below are Gateway-owned instruction and reference snapshots. Their paths identify their source, not files available in your hosted VM. Do not try to reread or edit those paths with hosted shell or file tools." : "OpenClaw workspace files below are Gateway-owned instruction and reference snapshots. Their paths identify their source, not files available in your connected executor. Do not try to reread or edit those paths with executor shell or file tools.",
		workspace.instructionSnapshot.instructions,
		workspace.personaInstructions,
		workspace.promptContextFiles.length ? [
			"## OpenClaw Workspace Context",
			"Supporting project reference from the Gateway workspace:",
			...workspace.promptContextFiles.map((file) => `### ${file.path}\n\n${file.content}`)
		].join("\n\n") : void 0,
		workspace.memoryRecallInstructions,
		workspace.memoryReferenceFiles.length ? [
			"## OpenClaw Workspace Memory",
			`MEMORY.md is a memory file, not an instruction file. Its contents are not embedded here. Use ${memoryToolNames.join(" or ")} when durable memory is relevant.`,
			...workspace.memoryReferenceFiles.map((file) => `- ${file.path}`)
		].join("\n\n") : void 0,
		toolNames.has("skill_workshop") ? buildSkillWorkshopPromptSection().join("\n") : void 0,
		delegationAvailable ? buildDelegationGuidanceSection({
			mode: resolveMainSessionDelegationMode(params),
			isMinimal: !fullPrompt,
			hiddenDelegationTool: toolNames.has("sessions_spawn") ? "`sessions_spawn`" : "",
			hasVisibleSessionSpawn: toolNames.has("sessions_spawn"),
			hasSessionsYield: toolNames.has("sessions_yield"),
			hasSubagentsList: toolNames.has("subagents"),
			hasSessionsSend: toolNames.has("sessions_send")
		}).join("\n") : void 0,
		params.disableTools !== true && fullPrompt ? buildUiPresentationPrompt({
			screenToolName: toolNames.has("screen") ? "screen" : void 0,
			showWidgetToolName: toolNames.has("show_widget") ? "show_widget" : void 0,
			dashboardToolName: toolNames.has("dashboard") ? "dashboard" : void 0,
			portalToolName: toolNames.has("portal") ? "portal" : void 0,
			messageTool
		}) : void 0,
		buildCredentialSafetyPrompt(toolNames.has("openclaw") || toolNames.has("gateway") ? { controlToolsAvailable: true } : void 0),
		params.gitCoauthorPrompt,
		params.extraSystemPrompt
	]);
}
/** Current facts use the existing input carrier, not immutable session instructions. */
function buildAgentsApiTurnContext(params, tools) {
	if (!shouldIncludeAgentHarnessRuntimeContext(params)) return;
	const toolNames = new Set(tools.map((tool) => tool.name));
	return joinSections([
		"OpenClaw runtime context for this turn (replaces earlier runtime facts):",
		buildTemporalContextText({
			configuredTimezone: params.config?.agents?.defaults?.userTimezone,
			sessionStatusAvailable: toolNames.has("session_status")
		}),
		params.hostCapabilities.activeComputerContext?.() ?? "Current active computer: active_node=unknown (host presence unavailable)",
		buildHarnessVisibleReplyGuidance({
			sourceReplyDeliveryMode: params.sourceReplyDeliveryMode,
			messageToolAvailable: toolNames.has("message"),
			requireExplicitMessageTarget: params.requireExplicitMessageTarget
		}),
		params.permissionChange?.notice,
		buildWatchedSessionsHarnessContext({
			config: params.config,
			sessionKey: params.sessionKey,
			toolNames
		}),
		"Current user request:"
	]);
}
function joinSections(sections) {
	return sections.filter((section) => section?.trim()).join("\n\n");
}
//#endregion
export { buildAgentsApiTurnContext as n, buildAgentsApiInstructions as t };
