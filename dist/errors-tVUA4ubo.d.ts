import { hasNodeErrorCode as hasErrnoCode, isNodeError as isErrno } from "@openclaw/fs-safe/path";
//#region src/infra/errors.d.ts
declare function formatErrorMessage(err: unknown): string;
declare function formatUncaughtError(err: unknown): string;
//#endregion
export { isErrno as i, formatUncaughtError as n, hasErrnoCode as r, formatErrorMessage as t };