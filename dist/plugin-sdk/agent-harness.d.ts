import { r as OpenClawConfig } from "../types.openclaw-B-tbtohD.js";
import { Ht as InputProvenance } from "../reply-payload-DRFubeid.js";
import { $n as createOpenClawCodingTools, Ec as OpenClawAgentToolResult, G as createAgentToolResultMiddlewareRunner, K as createCodexAppServerToolResultExtensionRunner, La as AgentHarness, Sc as AgentToolResultMiddlewareEvent, Uc as SandboxToolPolicy, Yc as TrustedSubagentCompletionHandoff, bc as AgentToolResultMiddleware, dt as disposeRegisteredAgentHarnesses, hr as abortEmbeddedAgentRun, i as EmbeddedRunAttemptParamsV2, km as ScheduledToolPolicyContext, lo as AgentHarnessV2, mr as abortAndDrainEmbeddedAgentRun, r as EmbeddedRunAttemptParams, yr as resolveActiveEmbeddedRunSessionId } from "../agent-harness-runtime-y6jiaaqJ.js";
import { n as AnyAgentTool } from "../common-CXaMD1Ub.js";
//#region src/agents/web-search-tool-policy.d.ts
type WebSearchToolPolicyParams = {
  webSearchEnabled?: boolean;
  config?: OpenClawConfig;
  modelProvider?: string;
  modelId?: string;
  agentId?: string;
  sessionKey?: string;
  sessionId?: string;
  sandboxToolPolicy?: SandboxToolPolicy;
  messageProvider?: string;
  agentAccountId?: string | null;
  groupId?: string | null;
  groupChannel?: string | null;
  groupSpace?: string | null;
  spawnedBy?: string | null;
  senderId?: string | null;
  senderName?: string | null;
  senderUsername?: string | null;
  senderE164?: string | null;
  inputProvenance?: InputProvenance;
  trustedInternalHandoff?: TrustedSubagentCompletionHandoff;
  scheduledToolPolicy?: ScheduledToolPolicyContext;
  runtimeToolAllowlist?: string[];
};
type WebSearchToolPolicyResolution = {
  allowed: boolean;
  persistentAllowed: boolean;
};
/** Resolves current and sender-independent policy for the managed web_search tool. */
export declare function resolveWebSearchToolPolicy(params: WebSearchToolPolicyParams): WebSearchToolPolicyResolution;
//#endregion
export { type AgentHarness, type AgentHarnessV2, type AgentToolResultMiddleware, type AgentToolResultMiddlewareEvent, type AnyAgentTool, type EmbeddedRunAttemptParams, type EmbeddedRunAttemptParamsV2, type OpenClawAgentToolResult, abortEmbeddedAgentRun as abortAgentHarnessRun, abortAndDrainEmbeddedAgentRun as abortAndDrainAgentHarnessRun, createAgentToolResultMiddlewareRunner, createCodexAppServerToolResultExtensionRunner, createOpenClawCodingTools, disposeRegisteredAgentHarnesses, resolveActiveEmbeddedRunSessionId };