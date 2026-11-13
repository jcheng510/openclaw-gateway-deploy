import { r as OpenClawConfig } from "../types.openclaw-B-tbtohD.js";
import { j as SessionEntry } from "../reply-payload-DRFubeid.js";
import { Jc as resolveFastModeState, aa as resolveControlCommandGate, dd as formatFastModeSourceSuffix, fd as formatFastModeStatusValue, ia as resolveCommandAuthorizedFromAuthorizers, ld as formatFastModeCommandOptions, nd as resolveStoredModelOverride, op as CommandAuthorization, sp as resolveCommandAuthorization, ud as formatFastModeCurrentStatus, xo as AgentRuntimePolicyScope } from "../agent-harness-runtime-y6jiaaqJ.js";
import { n as CommandArgs, t as CommandArgValues } from "../commands-args.types-zglMcgeO.js";
import "../model-selection-BBbugPil.js";
import { a as CommandArgsParsing, l as NativeCommandSpec, r as CommandArgDefinition, t as ChatCommandDefinition } from "../commands-registry.types-DS-ojUlf.js";
import { i as shouldComputeCommandAuthorized, t as hasControlCommand } from "../command-detection-DCu9-Oak.js";
import { _ as normalizeCommandBody, a as findCommandByNativeName, b as listChatCommands, c as listNativeCommandSpecs, d as parseCommandArgs, f as resolveCommandArgChoices, g as maybeResolveTextAlias, i as canResolveCommandArgMenu, l as listNativeCommandSpecsForConfig, m as serializeCommandArgs, o as formatCommandArgMenuTitle, p as resolveCommandArgMenu, r as buildCommandTextFromArgs } from "../commands-registry-lJJR-XSm.js";
import { n as resolveNativeCommandSessionTargets } from "../native-command-session-targets-MApalmzG.js";
import { n as ModelsProviderData } from "../commands-models-catalog-Dc13ILuu.js";
import { t as listSkillCommandsForAgents } from "../chat-commands-BWR24yUX.js";
import { n as listProviderPluginCommandSpecs } from "../command-specs-KoGv1AZN.js";
//#region src/agents/thinking-runtime.d.ts
/** Resolves an explicit session override before configured model/provider policy. */
export declare function resolveEffectiveAgentRuntime(params: {
  cfg: OpenClawConfig;
  provider: string;
  modelId: string;
  modelApi?: string | null;
  modelBaseUrl?: unknown;
  sessionEntry?: Pick<SessionEntry, "agentHarnessId" | "agentRuntimeOverride" | "modelSelectionLocked">;
} & AgentRuntimePolicyScope): string;
//#endregion
export { type ChatCommandDefinition, type CommandArgDefinition, type CommandArgValues, type CommandArgs, type CommandArgsParsing, type CommandAuthorization, type ModelsProviderData, type NativeCommandSpec, buildCommandTextFromArgs, canResolveCommandArgMenu, findCommandByNativeName, formatCommandArgMenuTitle, formatFastModeCommandOptions, formatFastModeCurrentStatus, formatFastModeSourceSuffix, formatFastModeStatusValue, hasControlCommand, listChatCommands, listNativeCommandSpecs, listNativeCommandSpecsForConfig, listProviderPluginCommandSpecs, listSkillCommandsForAgents, maybeResolveTextAlias, normalizeCommandBody, parseCommandArgs, resolveCommandArgChoices, resolveCommandArgMenu, resolveCommandAuthorization, resolveCommandAuthorizedFromAuthorizers, resolveControlCommandGate, resolveFastModeState, resolveNativeCommandSessionTargets, resolveStoredModelOverride, serializeCommandArgs, shouldComputeCommandAuthorized };