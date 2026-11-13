import { ta as OpenClawConfig } from "./types-C1mCepiY.js";
import "./types-BaOV3VIS.js";
import "./config-Bz6INurk.js";
import "@openclaw/ai/internal/tool-schema";
//#region src/plugin-sdk/provider-onboard.d.ts
/** Pair of preset appliers exposed by provider setup modules. */
type ProviderOnboardPresetAppliers<TArgs extends unknown[]> = {
  applyProviderConfig: (cfg: OpenClawConfig, ...args: TArgs) => OpenClawConfig;
  applyConfig: (cfg: OpenClawConfig, ...args: TArgs) => OpenClawConfig;
};
//#endregion
export { ProviderOnboardPresetAppliers as t };