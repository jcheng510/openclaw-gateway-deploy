import { r as OpenClawConfig } from "../types.openclaw-B-tbtohD.js";
import { r as resolveSessionTranscriptsDirForAgent } from "../paths-UINMFCfh.js";
import { Cu as MemoryPromptSectionBuilder, Fu as getMemoryCapabilityRegistration, Iu as listActiveMemoryPublicArtifacts, Lu as registerMemoryCapability, Nu as buildMemoryPromptSection, Pu as clearMemoryPluginState, Ru as registerMemoryCorpusSupplement, bu as MemoryPluginCapability, xu as MemoryPluginPublicArtifact } from "../agent-harness-runtime-y6jiaaqJ.js";
import "../config-Bxd-vTK2.js";
import { f as resolveDefaultAgentId } from "../agent-scope-BuqaqJkY.js";
import { t as resolveSessionAgentIdCompatibility } from "../agent-scope-runtime-CdwMCzNM.js";
//#region src/plugin-sdk/memory-host-core.d.ts
/** Lists public memory artifacts across all configured memory workspaces. */
export declare function listMemoryHostPublicArtifacts(params: {
  cfg: OpenClawConfig;
}): Promise<MemoryPluginPublicArtifact[]>;
//#endregion
export { type MemoryPluginCapability, type MemoryPluginPublicArtifact, type MemoryPromptSectionBuilder, buildMemoryPromptSection as buildActiveMemoryPromptSection, clearMemoryPluginState, getMemoryCapabilityRegistration, listActiveMemoryPublicArtifacts, registerMemoryCapability, registerMemoryCorpusSupplement, resolveDefaultAgentId, resolveSessionAgentIdCompatibility as resolveSessionAgentId, resolveSessionTranscriptsDirForAgent };