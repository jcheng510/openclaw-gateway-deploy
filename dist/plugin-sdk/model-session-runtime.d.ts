import { r as OpenClawConfig } from "../types.openclaw-B-tbtohD.js";
import { D as InternalSessionEntry, j as SessionEntry } from "../reply-payload-DRFubeid.js";
import { b as PluginMetadataSnapshot } from "../io-BzE-gESh.js";
import { Fd as StickyModelSelectionDispatchOutcome, rd as resolveSessionModelRef } from "../agent-harness-runtime-y6jiaaqJ.js";
import "../types-BopH1kpP.js";
import { n as ThinkLevel } from "../thinking.shared-CS1qF_24.js";
import { h as ModelCatalogEntry, o as ModelVisibilityPolicy } from "../model-selection-BBbugPil.js";
import { t as AgentModelPrimaryWriteTarget } from "../agent-scope-BuqaqJkY.js";
import { a as isModelSelectionLocked, i as applyModelOverrideToSessionEntry, n as ModelOverrideSelection, o as resolveAgentMaxConcurrent, r as ModelSelectionLockedError, s as resolveChannelModelOverride, t as MODEL_SELECTION_LOCKED_MESSAGE } from "../model-overrides-Cud4K947.js";
import "../model-visibility-policy-BVcjpZW0.js";
//#region src/model-picker/apply-session-model-selection.d.ts
type SessionModelSelectionRequest = {
  provider: string;
  model: string;
  isDefault: boolean;
  resetToDefault?: true;
  alias?: string;
  profileOverride?: string;
  runtime: {
    kind: "unchanged";
  } | {
    kind: "clear";
  } | {
    kind: "set";
    runtime: string;
  };
};
type ApplySessionModelSelectionParams = {
  cfg: OpenClawConfig;
  agentId: string;
  sessionKey: string;
  storePath?: string;
  sessionEntry: InternalSessionEntry;
  sessionStore: Record<string, InternalSessionEntry>;
  allowCreate?: boolean;
  defaultProvider: string;
  defaultModel: string;
  currentProvider: string;
  currentModel: string;
  modelPolicy?: Omit<ModelVisibilityPolicy, "catalog">;
  modelCatalog: readonly ModelCatalogEntry[];
  thinkingCatalog?: readonly ModelCatalogEntry[];
  canPersistStickyModelSelection?: boolean;
  stickyModelSelectionTarget?: AgentModelPrimaryWriteTarget;
  validateAuthProfileSelection?: () => string | undefined;
  request: SessionModelSelectionRequest;
  /** Raw directive text used only by the existing session patch hook. */
  patchModel?: string;
  markLiveSwitchPending: true;
};
type ApplySessionModelSelectionResult = {
  status: "applied";
  provider: string;
  model: string;
  effectiveModelRef: string;
  agentRuntime: string;
  changed: boolean;
  contextTokens: number;
  configuredDefaultUpdate?: StickyModelSelectionDispatchOutcome;
  runtimeChange?: {
    kind: "clear";
  } | {
    kind: "set";
    runtime: string;
  };
  thinkingRemap?: {
    from: ThinkLevel;
    to: ThinkLevel;
    provider: string;
    model: string;
  };
} | {
  status: "rejected";
  reason: "locked" | "not-allowed" | "invalid-runtime" | "unknown-provider";
  message: string;
} | {
  status: "conflict";
  message: string;
};
//#endregion
//#region src/agents/session-runtime-compat.d.ts
/** Persisted runtime fields used to recover session runtime compatibility. */
type SessionRuntimeCompatEntry = Pick<SessionEntry, "agentHarnessId" | "agentRuntimeOverride" | "modelSelectionLocked" | "pluginOwnerId">;
/** Resolves the persisted runtime id, preserving locked transcript ownership. */
export declare function resolvePersistedSessionRuntimeId(entry?: SessionRuntimeCompatEntry): string | undefined;
//#endregion
//#region src/sessions/auth-profile-preservation.d.ts
/** Applies a user model selection without dropping a compatible pinned auth profile. */
export declare function applyModelOverrideWithAuthProfileCompatibility(params: {
  cfg: OpenClawConfig;
  agentDir: string;
  entry: SessionEntry;
  currentProvider: string;
  selection: ModelOverrideSelection;
  profileOverride?: string;
  profileOverrideSource?: "auto" | "user";
  selectionSource?: "auto" | "user";
  explicitDefaultSelection?: boolean;
  markLiveSwitchPending?: boolean;
  metadataSnapshot?: Pick<PluginMetadataSnapshot, "plugins">;
}): {
  updated: boolean;
};
//#endregion
//#region src/plugin-sdk/model-session-runtime.d.ts
export declare const applySessionModelSelection: (params: ApplySessionModelSelectionParams) => Promise<ApplySessionModelSelectionResult>;
//#endregion
export { type ApplySessionModelSelectionParams, type ApplySessionModelSelectionResult, MODEL_SELECTION_LOCKED_MESSAGE, ModelSelectionLockedError, type SessionModelSelectionRequest, applyModelOverrideToSessionEntry, isModelSelectionLocked, resolveAgentMaxConcurrent, resolveChannelModelOverride, resolveSessionModelRef };