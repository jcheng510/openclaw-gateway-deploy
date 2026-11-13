import { R as ResolvedTalkConfig, r as OpenClawConfig, z as TalkConfig } from "./types.openclaw-B-tbtohD.js";
import { d as ContextVisibilityMode, x as MarkdownTableMode } from "./types.base-CO3vBS33.js";
import "./types.secrets-DxQuXa9f.js";
import "./reply-payload-DRFubeid.js";
import "./io-BzE-gESh.js";
import "./types-DATmzouh.js";
import "./openclaw-state-db-C-0605Y_.js";
import { pi as ResolveMarkdownTableModeParams, tc as CronStoreFile } from "./agent-harness-runtime-y6jiaaqJ.js";
import "./config-Bxd-vTK2.js";
import "./openclaw-state-db.generated-DU3vSkaz.js";
import "./agent-scope-BuqaqJkY.js";
import "./group-policy-6ZNr3EhF.js";
import "./plugin-config-runtime-cWf60aWO.js";
import "./shared-7C4-SD43.js";
import "./model-overrides-Cud4K947.js";
import "./context-visibility-6vWCOuQ8.js";
import "./runtime-group-policy-DZdFkJ-E.js";
import "./commands-D1iEyfPo.js";
import "./ingress-queue-CS0PMiWa.js";
import "./plugin-state-store-Bmt40qHi.js";
import "./resolve-configured-secret-input-string-D5yctlI2.js";
import { DatabaseSync } from "node:sqlite";
import { Selectable } from "kysely";
//#region src/config/context-visibility.d.ts
type ContextVisibilityDefaultsConfig = {
  channels?: {
    defaults?: {
      /**
       * Global default supplemental context visibility for channels without a local override.
       */
      contextVisibility?: ContextVisibilityMode;
    };
  };
};
/** Reads the global channel default supplemental context visibility mode. */
declare function resolveDefaultContextVisibility(cfg: ContextVisibilityDefaultsConfig): ContextVisibilityMode | undefined;
/** Resolves supplemental context visibility using explicit, account, channel, default precedence. */
declare function resolveChannelContextVisibilityMode(params: {
  /** Full OpenClaw config containing channel defaults and per-channel overrides. */
  cfg: OpenClawConfig;
  /** Channel id whose visibility policy is being resolved. */
  channel: string;
  /** Optional channel account id used for account-specific overrides. */
  accountId?: string | null;
  /** Runtime adapter override that takes precedence over config-backed policy. */
  configuredContextVisibility?: ContextVisibilityMode;
}): ContextVisibilityMode;
//#endregion
//#region src/config/markdown-tables.d.ts
declare function resolveMarkdownTableMode(params: ResolveMarkdownTableModeParams): MarkdownTableMode;
//#endregion
//#region src/config/talk.d.ts
/**
 * Resolve the single active Talk speech provider and its provider-owned config.
 * Ambiguous multi-provider config stays unresolved until `talk.provider` names one.
 */
declare function resolveActiveTalkProviderConfig(talk: TalkConfig | undefined): ResolvedTalkConfig | undefined;
//#endregion
//#region src/cron/store.d.ts
type SaveCronStoreOptions = {
  stateOnly?: boolean;
};
/** Resolves the public plugin-SDK cron store path. */
declare function resolveCronStorePath(storePath?: string): string;
/** Plugin-SDK alias for loading the cron store. */
declare function loadCronStore(storePath: string): Promise<CronStoreFile>;
/** Plugin-SDK alias for saving the cron store. */
declare function saveCronStore(storePath: string, store: CronStoreFile, opts?: SaveCronStoreOptions): Promise<void>;
//#endregion
//#region src/config/dangerous-name-matching.d.ts
type DangerousNameMatchingConfig = {
  dangerouslyAllowNameMatching?: boolean;
};
type DangerousNameMatchingResolverInput = {
  providerConfig?: DangerousNameMatchingConfig | null | undefined;
  accountConfig?: DangerousNameMatchingConfig | null | undefined;
};
/** Returns true only for the explicit dangerous name-matching opt-in flag. */
declare function isDangerousNameMatchingEnabled(config: DangerousNameMatchingConfig | null | undefined): boolean;
/** Resolves account-level dangerous name matching, inheriting the provider flag when unset. */
declare function resolveDangerousNameMatchingEnabled(input: DangerousNameMatchingResolverInput): boolean;
//#endregion
export { saveCronStore as a, resolveChannelContextVisibilityMode as c, resolveCronStorePath as i, resolveDefaultContextVisibility as l, resolveDangerousNameMatchingEnabled as n, resolveActiveTalkProviderConfig as o, loadCronStore as r, resolveMarkdownTableMode as s, isDangerousNameMatchingEnabled as t };