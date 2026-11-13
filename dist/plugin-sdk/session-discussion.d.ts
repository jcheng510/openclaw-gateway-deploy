import { Eu as SessionDiscussionState, Tu as SessionDiscussionProvider, wu as SessionDiscussionInfo } from "../agent-harness-runtime-y6jiaaqJ.js";
//#region packages/session-url-contract/src/index.d.ts
type ControlUiSessionNamespace = "chat" | "dashboard";
type BuildControlUiSessionPathParams = {
  namespace: ControlUiSessionNamespace;
  sessionKey: string;
  fallbackAgentId?: string;
  basePath?: string;
  displayName?: string;
  exactKey?: boolean;
  mainKey?: string;
  shortIdLength?: number;
};
export declare function buildControlUiSessionPath(params: BuildControlUiSessionPathParams): string | null;
//#endregion
//#region src/plugins/session-discussion-registry.d.ts
export declare function registerSessionDiscussionProvider(provider: SessionDiscussionProvider): void;
//#endregion
export type { SessionDiscussionInfo, SessionDiscussionProvider, SessionDiscussionState };