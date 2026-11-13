import "../manifest-registry-BfeWy5EV.js";
import "../openclaw-state-db-C-0605Y_.js";
import { S as resolvePinnedHostnameWithPolicy, a as SsrFBlockedError, g as isPrivateNetworkAllowedByPolicy, o as SsrFPolicy, t as LookupFn, v as matchesHostnameAllowlist } from "../ssrf-CkjpArdF.js";
import { D as openLocalFileSafely, I as resolveAbsolutePathForRead, J as writeExternalFileWithinRoot, L as resolveAbsolutePathForWrite, N as readRegularFile, O as pathExists, P as readRegularFileSync, R as resolveLocalPathFromRootsSync, S as canonicalPathFromExistingAncestor, U as statRegularFile, V as root, W as statRegularFileSync, k as pathExistsSync, o as FsSafeError, q as withTimeout, w as findExistingAncestor, y as appendRegularFile } from "../fs-safe-BPoG_Ac0.js";
import "../staged-inputs-GVpqI5Pd.js";
import { n as redactSensitiveText } from "../redact-CwfI4AYn.js";
import { r as extractErrorCode } from "../error-coercion-vrFGEpI-.js";
import { o as hasProxyEnvConfigured, t as normalizeHostname } from "../hostname-CYRQ91__.js";
import { t as formatErrorMessage } from "../errors-tVUA4ubo.js";
import { a as parseAccessGroupAllowFromEntry } from "../allow-from-Bdiy2LH6.js";
import { i as shouldIncludeSupplementalContext, n as evaluateSupplementalContextVisibility, r as filterSupplementalContextItems, t as ContextVisibilityDecision } from "../context-visibility-6vWCOuQ8.js";
import { i as expandAllowFromWithAccessGroups } from "../access-groups-Rov_z4Z9.js";
import { a as resolvePinnedMainDmOwnerFromAllowlist } from "../dm-policy-shared-BG2U8LLg.js";
import { r as resolvePreferredOpenClawTmpDir } from "../tmp-openclaw-dir-BVXh5Mbm.js";
import { assertNoSymlinkParents, assertNoSymlinkParentsSync, pathScope, resolveExistingPathsWithinRoot, resolveStrictExistingPathsWithinRoot, sanitizeUntrustedFileName } from "@openclaw/fs-safe/advanced";
import { isPathInside } from "@openclaw/fs-safe/path";
import { movePathWithCopyFallback, replaceFileAtomic } from "@openclaw/fs-safe/atomic";
import "@openclaw/fs-safe/permissions";
import "@openclaw/fs-safe/durability";
import { FileStoreSync } from "@openclaw/fs-safe/store";
//#region src/security/external-content.d.ts
type ExternalContentSource = "email" | "webhook" | "api" | "browser" | "channel_metadata" | "web_search" | "web_fetch" | "unknown";
/** Bound sanitized external prose while preserving its exact retained source prefix. */
export declare function truncateSanitizedExternalContent(value: string, maxChars: number): {
  text: string;
  truncated: boolean;
  retainedRawChars: number;
};
type WrapExternalContentOptions = {
  /** Source of the external content */
  source: ExternalContentSource;
  /** Original sender information (e.g., email address) */
  sender?: string;
  /** Subject line (for emails) */
  subject?: string;
  /** External task label associated with the content */
  taskName?: string;
  /** Whether to include detailed security warning */
  includeWarning?: boolean;
};
/**
 * Wraps external untrusted content with security boundaries and warnings.
 *
 * This function should be used whenever processing content from external sources
 * (emails, webhooks, API calls from untrusted clients) before passing to LLM.
 *
 * @example
 * ```ts
 * const safeContent = wrapExternalContent(emailBody, {
 *   source: "email",
 *   sender: "user@example.com",
 *   subject: "Help request"
 * });
 * // Pass safeContent to LLM instead of raw emailBody
 * ```
 */
export declare function wrapExternalContent(content: string, options: WrapExternalContentOptions): string;
/**
 * Wraps web search/fetch content with security markers.
 * This is a simpler wrapper for web tools that just need content wrapped.
 */
export declare function wrapWebContent(content: string, source?: "web_search" | "web_fetch"): string;
//#endregion
//#region src/plugin-sdk/file-access-runtime.d.ts
/** Return whether a path resolves to a regular file, treating filesystem errors as missing. */
export declare function fileExists(filePath: string): boolean;
//#endregion
//#region src/security/channel-metadata.d.ts
/**
 * Build bounded, externally wrapped channel metadata for prompt context.
 * Channel-provided labels can be user-controlled, so keep the result externally wrapped.
 */
export declare function buildChannelMetadata(params: {
  source: string;
  label: string;
  entries: Array<string | null | undefined>;
  maxChars?: number;
}): string | undefined;
/** @deprecated Use buildChannelMetadata. Removal: after 2026-09-08 (see sdk-untrusted-context-identifier-aliases). */
export declare const buildUntrustedChannelMetadata: typeof buildChannelMetadata;
//#endregion
//#region src/security/safe-regex.d.ts
type SafeRegexRejectReason = "empty" | "unsafe-nested-repetition" | "invalid-regex";
type SafeRegexCompileResult = {
  regex: RegExp;
  source: string;
  flags: string;
  reason: null;
} | {
  regex: null;
  source: string;
  flags: string;
  reason: SafeRegexRejectReason;
};
export declare function compileSafeRegexDetailed(source: string, flags?: string): SafeRegexCompileResult;
//#endregion
//#region src/infra/private-file-store.d.ts
/** Create a sync private file store rooted at `rootDir`. */
export declare function privateFileStoreSync(rootDir: string): FileStoreSync;
//#endregion
//#region src/infra/ports.d.ts
/** Probes Node's wildcard bind by default; callers may scope checks to their owned interface. */
export declare function ensurePortAvailable(port: number, host?: string, signal?: AbortSignal): Promise<void>;
//#endregion
//#region src/security/secret-equal.d.ts
/** Compare two optional UTF-8 secrets without leaking length through timingSafeEqual errors. */
export declare function safeEqualSecret(provided: string | undefined | null, expected: string | undefined | null): boolean;
//#endregion
export { type ContextVisibilityDecision, FsSafeError, type LookupFn, type SafeRegexRejectReason, SsrFBlockedError, type SsrFPolicy, appendRegularFile, assertNoSymlinkParents, assertNoSymlinkParentsSync, canonicalPathFromExistingAncestor, evaluateSupplementalContextVisibility, expandAllowFromWithAccessGroups, extractErrorCode, filterSupplementalContextItems, findExistingAncestor, formatErrorMessage, hasProxyEnvConfigured, isPathInside, isPrivateNetworkAllowedByPolicy, matchesHostnameAllowlist, movePathWithCopyFallback, normalizeHostname, openLocalFileSafely, parseAccessGroupAllowFromEntry, pathExists, pathExistsSync, pathScope, readRegularFile, readRegularFileSync, redactSensitiveText, replaceFileAtomic, resolveAbsolutePathForRead, resolveAbsolutePathForWrite, resolveExistingPathsWithinRoot, resolveLocalPathFromRootsSync, resolvePinnedHostnameWithPolicy, resolvePinnedMainDmOwnerFromAllowlist, resolvePreferredOpenClawTmpDir, resolveStrictExistingPathsWithinRoot, root, sanitizeUntrustedFileName, shouldIncludeSupplementalContext, statRegularFile, statRegularFileSync, withTimeout, writeExternalFileWithinRoot };