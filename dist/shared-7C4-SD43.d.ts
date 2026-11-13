import { q as AgentModelEntryConfig, r as OpenClawConfig } from "./types.openclaw-B-tbtohD.js";
import { s as ConfigWriteOptions } from "./io-BzE-gESh.js";
import { n as RuntimeEnv } from "./runtime-DlqUc5_p.js";
import "./config-Bxd-vTK2.js";
import { t as ProviderModelRef } from "./model-catalog-refs-Phyl1k6H.js";
import "./model-selection-BBbugPil.js";
//#region src/config/logging.d.ts
type LogConfigUpdatedOptions = {
  path?: string;
  backupPath?: string | false;
  suffix?: string;
};
/** Emits the standard config-updated message through the active runtime logger. */
declare function logConfigUpdated(runtime: RuntimeEnv, opts?: LogConfigUpdatedOptions): void;
//#endregion
//#region src/commands/models/shared.d.ts
/** Runtime config snapshot supplied to model config mutators. */
type UpdateConfigContext = {
  runtimeConfig: OpenClawConfig;
  canonicalModelKeys?: ReadonlyMap<string, string | undefined>;
  restoreSourceEntry: (from: string, to: string, entry: AgentModelEntryConfig) => AgentModelEntryConfig;
};
/** Reads source config, applies a mutator, and writes only the source-form config. */
declare function updateConfig(mutator: (cfg: OpenClawConfig, context: UpdateConfigContext) => OpenClawConfig | Promise<OpenClawConfig>, selectModelRefs?: (cfg: OpenClawConfig, context: UpdateConfigContext) => readonly (ProviderModelRef | undefined)[], beforeCommit?: () => void, writeOptions?: ConfigWriteOptions): Promise<OpenClawConfig>;
//#endregion
export { logConfigUpdated as n, updateConfig as t };