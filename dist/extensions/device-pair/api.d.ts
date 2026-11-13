import { A as listDevicePairing, F as DeviceBootstrapProfileInput, I as PAIRING_SETUP_BOOTSTRAP_PROFILE, M as DevicePairingApprovalOptions, N as DeviceBootstrapOperations, P as DeviceBootstrapProfile, j as ApproveDevicePairingResult, n as OpenClawPluginApi, t as definePluginEntry } from "../../plugin-entry-vg94gAgL.js";
import { s as OpenClawConfig } from "../../provider-model-types-C99fy4xU.js";
import "@openclaw/fs-safe/temp";
//#region src/infra/device-pairing-approval.d.ts
export declare function approveDevicePairing(requestId: string, baseDir?: string): Promise<ApproveDevicePairingResult>;
export declare function approveDevicePairing(requestId: string, options: DevicePairingApprovalOptions, baseDir?: string): Promise<ApproveDevicePairingResult>;
//#endregion
//#region src/infra/device-bootstrap.d.ts
type DeviceBootstrapTokenIssueParams = {
  /** Revalidate caller authority at the worker's transaction and commit boundaries. */
  assertCurrent?: () => void;
  baseDir?: string;
  profile?: DeviceBootstrapProfileInput;
  roles?: readonly string[];
  scopes?: readonly string[];
};
/** Issue a short-lived generic bootstrap token with a bounded role/scope handoff profile. */
export declare function issueDeviceBootstrapToken(params?: DeviceBootstrapTokenIssueParams): Promise<{
  token: string;
  expiresAtMs: number;
}>;
type BootstrapParams<Key extends keyof DeviceBootstrapOperations> = Omit<DeviceBootstrapOperations[Key]["input"], "nowMs"> & {
  baseDir?: string;
};
/** Remove every outstanding bootstrap token. */
export declare function clearDeviceBootstrapTokens(params?: BootstrapParams<"bootstrap.clear"> & {
  assertCurrent?: () => void;
}): Promise<DeviceBootstrapOperations["bootstrap.clear"]["output"]>;
/** Revoke one bootstrap token and retain its record for best-effort restoration. */
export declare function revokeDeviceBootstrapToken(params: BootstrapParams<"bootstrap.revoke">): Promise<DeviceBootstrapOperations["bootstrap.revoke"]["output"]>;
//#endregion
//#region src/plugin-sdk/device-bootstrap.d.ts
export declare const resolvePairingGatewayUrl: (cfg: OpenClawConfig, opts: {
  env: NodeJS.ProcessEnv;
  publicUrl?: string;
  publicOriginPreference?: "fallback" | "prefer";
  urlPathMode?: "origin-only" | "preserve";
  preferRemoteUrl?: boolean;
  useLocalGateway?: boolean;
  forceSecure?: boolean;
  runCommandWithTimeout?: (argv: string[], opts: {
    timeoutMs: number;
    maxOutputBytes?: number;
  }) => Promise<{
    code: number | null;
    stdout: string;
    stderr?: string;
  }>;
  networkInterfaces: () => ReturnType<typeof import("node:os").networkInterfaces>;
}) => Promise<{
  url?: string;
  source?: string;
  error?: string;
}>;
//#endregion
//#region src/plugin-sdk/run-command.d.ts
/** Captured process result returned by plugin command execution helpers. */
type PluginCommandRunResult = {
  /** Process exit code, with `1` used when the command failed before spawning or did not report one. */
  code: number;
  /** Captured standard output as UTF-8 text. */
  stdout: string;
  /** Captured standard error, normalized to include timeout or thrown-error messages. */
  stderr: string;
};
/** Options for commands that are launched on behalf of a plugin runtime. */
type PluginCommandRunOptions = {
  /** Executable and arguments, with the command name in the first slot. */
  argv: string[];
  /** Hard execution limit in milliseconds before the command is terminated. */
  timeoutMs: number;
  /** Working directory for the child process. Defaults to the current process directory. */
  cwd?: string;
  /** Environment passed to the child process. Defaults to the current process environment. */
  env?: NodeJS.ProcessEnv;
};
/** Run a plugin-managed command with timeout handling and normalized stdout/stderr results. */
export declare function runPluginCommandWithTimeout(options: PluginCommandRunOptions): Promise<PluginCommandRunResult>;
//#endregion
//#region src/infra/tmp-openclaw-dir.d.ts
type SecureDirStat = {
  isDirectory(): boolean;
  isSymbolicLink(): boolean;
  mode?: number;
  uid?: number;
};
/** Injectable filesystem/platform hooks for resolving the preferred temp root in tests. */
type ResolvePreferredOpenClawTmpDirOptions = {
  accessSync?: (path: string, mode?: number) => void;
  chmodSync?: (path: string, mode: number) => void;
  getuid?: () => number | undefined;
  lstatSync?: (path: string) => SecureDirStat;
  mkdirSync?: (path: string, opts: {
    recursive: boolean;
    mode?: number;
  }) => void;
  platform?: NodeJS.Platform;
  preferredDir?: string;
  tmpdir?: () => string;
  warn?: (message: string) => void;
};
/** Resolves a safe OpenClaw temp root, falling back to user-scoped os.tmpdir paths when needed. */
export declare function resolvePreferredOpenClawTmpDir(options?: ResolvePreferredOpenClawTmpDirOptions): string;
//#endregion
//#region src/media/qr-image.d.ts
type QrPngRenderOptions = {
  scale?: number;
  marginModules?: number;
};
/** Temp-file write options kept to filename segments so callers cannot choose parent paths. */
type QrPngTempFileOptions = QrPngRenderOptions & {
  tmpRoot: string;
  dirPrefix: string;
  fileName?: string;
};
type QrPngTempFile = {
  filePath: string;
  dirPath: string;
  mediaLocalRoots: string[];
};
/** Renders QR text as raw PNG base64 after validating bounded renderer options. */
export declare function renderQrPngBase64(input: string, opts?: QrPngRenderOptions): Promise<string>;
/** Renders QR text as a PNG data URL. */
export declare function renderQrPngDataUrl(input: string, opts?: QrPngRenderOptions): Promise<string>;
/** Writes QR PNG output into a scoped temp directory and returns that directory as a media root. */
export declare function writeQrPngTempFile(input: string, opts: QrPngTempFileOptions): Promise<QrPngTempFile>;
//#endregion
export { type DeviceBootstrapProfile, type OpenClawPluginApi, PAIRING_SETUP_BOOTSTRAP_PROFILE, definePluginEntry, listDevicePairing };