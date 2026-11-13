import { u as ShouldHandleTextCommandsParams } from "./commands-registry.types-DS-ojUlf.js";
//#region src/auto-reply/commands-text-routing.d.ts
/** Returns whether a surface can receive provider-native slash commands. */
declare function isNativeCommandSurface(surface?: string): boolean;
/** Decides whether text slash commands remain active for the current surface/config pair. */
declare function shouldHandleTextCommands(params: ShouldHandleTextCommandsParams): boolean;
//#endregion
export { shouldHandleTextCommands as n, isNativeCommandSurface as t };