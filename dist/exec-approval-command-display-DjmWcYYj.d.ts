import { M as ExecApprovalRequestPayload } from "./approval-types-C2jV80E7.js";
import "./exec-approvals-CwepMf1g.js";
//#region src/infra/exec-approval-command-display.d.ts
/** Resolves sanitized command and preview text for exec approval prompts. */
declare function resolveExecApprovalCommandDisplay(request: ExecApprovalRequestPayload): {
  /** Primary command text rendered in the approval prompt. */
  commandText: string;
  /** Optional shorter preview, omitted when it would duplicate the primary command text. */
  commandPreview: string | null;
};
//#endregion
export { resolveExecApprovalCommandDisplay as t };