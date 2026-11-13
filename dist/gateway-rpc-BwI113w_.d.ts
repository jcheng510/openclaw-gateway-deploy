import "./types.openclaw-B-tbtohD.js";
import { Jn as GatewayClientMode, Yn as GatewayClientName } from "./reply-payload-DRFubeid.js";
import { Qt as DeviceIdentity } from "./agent-harness-runtime-y6jiaaqJ.js";
import { n as OperatorScope } from "./types.plugin-BmmXapqg.js";
import { Command } from "commander";
//#region src/cli/gateway-rpc.types.d.ts
/** Common gateway RPC flags accepted by direct gateway command helpers. */
type GatewayRpcOpts = {
  url?: string;
  expectUrl?: string;
  port?: string;
  token?: string;
  password?: string;
  timeout?: string;
  expectFinal?: boolean;
  json?: boolean;
};
//#endregion
//#region src/cli/gateway-rpc.d.ts
declare function addGatewayClientOptions(cmd: Command, defaults?: {
  timeoutMs?: number;
}): Command;
declare function callGatewayFromCli(method: string, opts: GatewayRpcOpts, params?: unknown, extra?: {
  clientName?: GatewayClientName;
  mode?: GatewayClientMode;
  deviceIdentity?: DeviceIdentity | null;
  signal?: AbortSignal;
  expectFinal?: boolean;
  progress?: boolean;
  scopes?: OperatorScope[];
  sharedStateMode?: "read-only";
}): Promise<Record<string, unknown>>;
//#endregion
export { callGatewayFromCli as n, GatewayRpcOpts as r, addGatewayClientOptions as t };