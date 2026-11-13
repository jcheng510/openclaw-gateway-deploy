import { r as OpenClawConfig } from "../types.openclaw-B-tbtohD.js";
import { Ac as DevicePairingApprovalOptions, Fc as DeviceBootstrapPurpose, Ic as PAIRING_SETUP_BOOTSTRAP_PROFILE, Lc as normalizeDeviceBootstrapProfile, Mc as BOOTSTRAP_HANDOFF_OPERATOR_SCOPES, Nc as DeviceBootstrapProfile, Oc as listDevicePairing, Pc as DeviceBootstrapProfileInput, jc as DeviceBootstrapOperations, kc as ApproveDevicePairingResult } from "../agent-harness-runtime-y6jiaaqJ.js";
import "../config-runtime-DF67bJpL.js";
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
export { BOOTSTRAP_HANDOFF_OPERATOR_SCOPES, type DeviceBootstrapProfile, type DeviceBootstrapProfileInput, type DeviceBootstrapPurpose, PAIRING_SETUP_BOOTSTRAP_PROFILE, listDevicePairing, normalizeDeviceBootstrapProfile };