import { r as OpenClawConfig } from "./types.openclaw-B-tbtohD.js";
import { N as ExecApprovalResolved, i as NormalizedApprovalRequest, j as ExecApprovalRequest, n as ApprovalResolved, r as ChannelApprovalKind, t as ApprovalRequestInput } from "./approval-types-C2jV80E7.js";
import "./exec-approvals-CwepMf1g.js";
import { a as GatewayReconnectPausedInfo } from "./client-BgkkQfqS.js";
//#region src/infra/exec-approval-channel-runtime.types.d.ts
type ApprovalRequestEvent$1 = ApprovalRequestInput;
/** Adapter implemented by a channel to deliver and finalize native approval prompts. */
type ExecApprovalChannelRuntimeAdapter<TPending, TRequest extends ApprovalRequestEvent$1 = ExecApprovalRequest, TResolved extends ApprovalResolved = ExecApprovalResolved> = {
  label: string;
  clientDisplayName: string;
  cfg: OpenClawConfig;
  gatewayUrl?: string;
  /** Defaults to exec-only; include plugin when the adapter can handle plugin approvals. */
  eventKinds?: readonly ChannelApprovalKind[];
  isConfigured: () => boolean;
  shouldHandle: (request: NormalizedApprovalRequest<TRequest>) => boolean;
  deliverRequested: (request: NormalizedApprovalRequest<TRequest>) => Promise<TPending[]>;
  beforeGatewayClientStart?: () => Promise<void> | void;
  finalizeResolved: (params: {
    request: NormalizedApprovalRequest<TRequest>;
    resolved: TResolved;
    entries: TPending[];
  }) => Promise<void>;
  finalizeExpired?: (params: {
    request: NormalizedApprovalRequest<TRequest>;
    entries: TPending[];
  }) => Promise<void>;
  onStopped?: () => Promise<void> | void;
  nowMs?: () => number;
};
/** Runtime handle used by approval bootstrap code to manage a channel-native approval client. */
type ExecApprovalChannelRuntime<TRequest extends ApprovalRequestEvent$1 = ExecApprovalRequest, TResolved extends ApprovalResolved = ExecApprovalResolved> = {
  start: () => Promise<void>;
  stop: () => Promise<void>;
  handleRequested: (request: TRequest) => Promise<void>;
  handleResolved: (resolved: TResolved) => Promise<void>;
  handleExpired: (approvalId: string) => Promise<void>;
  request: <T = unknown>(method: string, params: Record<string, unknown>) => Promise<T>;
};
//#endregion
//#region src/infra/exec-approval-channel-runtime.d.ts
type ApprovalRequestEvent = ApprovalRequestInput;
/** Error raised when the gateway pauses approval reconnects after a terminal startup failure. */
declare class ExecApprovalChannelRuntimeTerminalStartError extends Error {
  readonly detailCode: string | null;
  constructor(info: GatewayReconnectPausedInfo, cause?: unknown);
}
/** Narrows terminal approval runtime startup failures for bootstrap retry policy. */
declare function isExecApprovalChannelRuntimeTerminalStartError(error: unknown): error is ExecApprovalChannelRuntimeTerminalStartError;
/** Creates the gateway-backed approval runtime that tracks pending requests and finalization. */
declare function createExecApprovalChannelRuntime<TPending, TRequest extends ApprovalRequestEvent = ExecApprovalRequest, TResolved extends ApprovalResolved = ExecApprovalResolved>(adapter: ExecApprovalChannelRuntimeAdapter<TPending, TRequest, TResolved>): ExecApprovalChannelRuntime<TRequest, TResolved>;
//#endregion
export { ExecApprovalChannelRuntimeAdapter as a, ExecApprovalChannelRuntime as i, createExecApprovalChannelRuntime as n, isExecApprovalChannelRuntimeTerminalStartError as r, ExecApprovalChannelRuntimeTerminalStartError as t };