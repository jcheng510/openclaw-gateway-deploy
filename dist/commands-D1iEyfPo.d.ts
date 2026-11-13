import { qt as NativeCommandsSetting, r as OpenClawConfig } from "./types.openclaw-B-tbtohD.js";
import "./types-DATmzouh.js";
import { t as ChannelId } from "./channel-id.types-CjcGKHk0.js";
import "./types.public-Bht1LzOM.js";
//#region src/config/commands.d.ts
type NativeCommandSettingParams = {
  providerId: ChannelId;
  providerSetting?: NativeCommandsSetting;
  globalSetting?: NativeCommandsSetting;
  env?: NodeJS.ProcessEnv;
  stateDir?: string;
  workspaceDir?: string;
  config?: OpenClawConfig;
  autoDefault?: boolean;
};
/** Resolves native skill exposure for a provider, with provider config overriding global config. */
declare function resolveNativeSkillsEnabled(params: NativeCommandSettingParams): boolean;
/** Resolves native command exposure for a provider, with provider config overriding global config. */
declare function resolveNativeCommandsEnabled(params: NativeCommandSettingParams): boolean;
/** Returns true only when native commands are explicitly disabled by provider or inherited global config. */
declare function isNativeCommandsExplicitlyDisabled(params: {
  providerSetting?: NativeCommandsSetting;
  globalSetting?: NativeCommandsSetting;
}): boolean;
//#endregion
export { resolveNativeCommandsEnabled as n, resolveNativeSkillsEnabled as r, isNativeCommandsExplicitlyDisabled as t };