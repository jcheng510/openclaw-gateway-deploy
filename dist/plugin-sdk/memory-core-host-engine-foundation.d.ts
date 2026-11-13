import { Bt as MemorySearchConfig, r as OpenClawConfig } from "../types.openclaw-B-tbtohD.js";
import { a as onInternalSessionTranscriptUpdate, r as resolveSessionTranscriptsDirForAgent } from "../paths-UINMFCfh.js";
import { n as createSubsystemLogger } from "../subsystem-RmDRaRJV.js";
import "../config-Bxd-vTK2.js";
import { t as resolveStateDir } from "../state-dir-CrCP_VLr.js";
import "../paths-Tf7t-9Le.js";
import { o as resolveUserPath } from "../home-dir-DJ1GwOT9.js";
import { n as truncateUtf16Safe } from "../utf16-slice-C5Uh1nl-.js";
import "../utils-DhaCU8ER.js";
import { V as root } from "../fs-safe-BPoG_Ac0.js";
import { c as resolveAgentContextLimits, l as resolveAgentDir, u as resolveAgentWorkspaceDir } from "../agent-scope-BuqaqJkY.js";
import { n as resolveMemorySearchConfig, r as resolveMemorySearchSyncConfig, t as ResolvedMemorySearchConfig } from "../memory-search-CnBBPVeI.js";
import "@openclaw/fs-safe/advanced";
import "@openclaw/fs-safe/root";
import { isPathInside } from "@openclaw/fs-safe/path";
import "@openclaw/fs-safe/walk";
//#region src/shared/global-singleton.d.ts
type GlobalSingletonLifecycle = "close-and-restart" | "close-only" | "plugin-registry";
type GlobalSingletonReset<T> = (value: T) => void | Promise<void>;
/** Resolves a process-local singleton for caches and registries that tolerate helper lookup. */
export declare function resolveGlobalSingleton<T>(key: symbol, create: () => T, reset?: GlobalSingletonReset<T>, lifecycle?: GlobalSingletonLifecycle): T;
//#endregion
export { type MemorySearchConfig, type OpenClawConfig, type ResolvedMemorySearchConfig, createSubsystemLogger, isPathInside, onInternalSessionTranscriptUpdate, resolveAgentContextLimits, resolveAgentDir, resolveAgentWorkspaceDir, resolveMemorySearchConfig, resolveMemorySearchSyncConfig, resolveSessionTranscriptsDirForAgent, resolveStateDir, resolveUserPath, root, truncateUtf16Safe };