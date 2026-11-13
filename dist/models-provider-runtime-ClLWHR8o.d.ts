import { r as OpenClawConfig } from "./types.openclaw-B-tbtohD.js";
import { tn as ReplyPayload } from "./reply-payload-DRFubeid.js";
import "./agent-harness-runtime-y6jiaaqJ.js";
import "./config-Bxd-vTK2.js";
import "./approval-types-C2jV80E7.js";
import "./index-D_aAxq5-.js";
import "./thinking.shared-CS1qF_24.js";
import "./types-GPumK0qC.js";
import "./types.public-Bht1LzOM.js";
import "./model-selection-BBbugPil.js";
import { i as buildPreparedModelsProviderData, n as ModelsProviderData, o as ModelsProviderMenu, t as ModelsCommandSessionEntry } from "./commands-models-catalog-Dc13ILuu.js";
import "./model-visibility-policy-BVcjpZW0.js";
//#region src/auto-reply/reply/commands-models.d.ts
declare const MODEL_PICKER_CHANGED_MESSAGE = "Available models changed. Open /models and choose again.";
declare function formatModelsAvailableHeader(params: {
  provider: string;
  total: number;
  cfg: OpenClawConfig;
  agentId?: string;
  agentDir?: string;
  workspaceDir?: string;
  sessionEntry?: ModelsCommandSessionEntry;
  availability?: ModelsProviderMenu;
}): string;
type ModelsCommandReplyParams = {
  cfg: OpenClawConfig;
  commandBodyNormalized: string;
  surface?: string;
  currentModel?: string;
  agentId?: string;
  agentDir?: string;
  workspaceDir?: string;
  sessionEntry?: ModelsCommandSessionEntry;
};
declare function resolveModelsCommandReply(params: ModelsCommandReplyParams): Promise<ReplyPayload | null>;
//#endregion
//#region src/plugin-sdk/models-provider-runtime.d.ts
declare function buildModelsProviderData(...args: Parameters<typeof buildPreparedModelsProviderData>): Promise<ModelsProviderData>;
//#endregion
export { resolveModelsCommandReply as i, MODEL_PICKER_CHANGED_MESSAGE as n, formatModelsAvailableHeader as r, buildModelsProviderData as t };