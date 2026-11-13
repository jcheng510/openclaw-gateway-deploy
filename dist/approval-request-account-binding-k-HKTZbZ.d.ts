import { r as OpenClawConfig } from "./types.openclaw-B-tbtohD.js";
import "./reply-payload-DRFubeid.js";
import { g as PluginApprovalRequest, j as ExecApprovalRequest, o as SystemAgentApprovalRequest } from "./approval-types-C2jV80E7.js";
import "./exec-approvals-CwepMf1g.js";
//#region src/infra/approval-request-account-binding.d.ts
type ApprovalRequestLike = {
  id: string;
  request: ExecApprovalRequest["request"] | PluginApprovalRequest["request"] | SystemAgentApprovalRequest["request"];
  createdAtMs: number;
  expiresAtMs: number;
};
/** Resolves the account id an approval request belongs to for an optional channel filter. */
declare function resolveApprovalRequestAccountId(params: {
  cfg: OpenClawConfig;
  request: ApprovalRequestLike;
  channel?: string | null;
}): string | null;
/** Resolves an approval request account only when the request can be routed to a channel. */
declare function resolveApprovalRequestChannelAccountId(params: {
  cfg: OpenClawConfig;
  request: ApprovalRequestLike;
  channel: string;
}): string | null;
/** Checks whether a channel/account pair is eligible to handle an approval request. */
declare function doesApprovalRequestMatchChannelAccount(params: {
  cfg: OpenClawConfig;
  request: ApprovalRequestLike;
  channel: string;
  accountId?: string | null;
}): boolean;
/** Selects the one channel account that owns a native approval request. */
declare function doesApprovalRequestSelectChannelAccount(params: {
  cfg: OpenClawConfig;
  request: ApprovalRequestLike;
  channel: string;
  accountId?: string | null;
  defaultAccountId: string;
  eligibleAccountIds: readonly string[];
}): boolean;
//#endregion
export { resolveApprovalRequestChannelAccountId as i, doesApprovalRequestSelectChannelAccount as n, resolveApprovalRequestAccountId as r, doesApprovalRequestMatchChannelAccount as t };