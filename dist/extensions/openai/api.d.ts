import { n as OpenClawConfig } from "../../types.openclaw-R0XDvekS.js";
import { A as CaptureQueryRow, B as resolveAgentDir, C as isDebugProxyGlobalFetchPatchInstalled, D as getDebugProxyCaptureStore, E as closeDebugProxyCaptureStore, F as createDebugProxyWebSocketAgent, G as RealtimeVoiceBrowserSession, H as RealtimeTranscriptionProviderPlugin, I as resolveDebugProxySettings, J as RealtimeVoiceProviderCapabilities, K as RealtimeVoiceBrowserSessionCreateRequest, L as resolveEffectiveDebugProxyUrl, M as CaptureSessionRecord, N as CaptureSessionSummary, O as CaptureEventRecord, P as SharedCaptureBlobRecord, R as resolveProviderRequestHeaders$1, S as finalizeDebugProxyCaptureAsync, T as acquireDebugProxyCaptureStore, U as RealtimeVoiceProviderPlugin, V as PluginLogger, W as RealtimeVoiceBridge, _ as captureWsEvent, b as initializeDebugProxyCaptureAsync, c as OAuthCredentials, d as createProviderHttpError, f as readProviderJsonResponse, g as captureHttpExchangeAsync, h as captureHttpExchange, i as ProviderPlugin, j as CaptureSessionCoverageSummary, k as CaptureQueryPreset, l as redactSensitiveText, m as fetchWithSsrFGuard, nt as AuthProfileCredential, p as readProviderTextResponse, q as RealtimeVoiceGatewayControl, s as ProviderAuthContext, tt as MediaUnderstandingProvider, u as formatErrorMessage, v as captureWsEventAsync, w as DebugProxyCaptureStore, x as finalizeDebugProxyCapture, y as initializeDebugProxyCapture, z as createRealtimeTranscriptionWebSocketSession } from "../../cli-backend.types-EMzB3xUc.js";
import "../../provider-model-shared-0zXsfvUq.js";
import "../../provider-onboard-CrpTwV_W.js";
import "../../ssrf-runtime-csCfRw31.js";
import "../../context-visibility-DbSPn59q.js";
import "../../config-contracts-D4MXX3ov.js";
import "@openclaw/fs-safe/advanced";
import "kysely";
import { ClientOptions, RawData } from "ws";
import "@openclaw/fs-safe/path";
import { IncomingMessage, ServerResponse } from "node:http";
import "@openclaw/ai/internal/shared";
import "@openclaw/fs-safe/permissions";
import "@openclaw/fs-safe/durability";
import "@openclaw/fs-safe/store";
import "@openclaw/fs-safe/atomic";
//#region src/proxy-capture/store.worker-contract.d.ts
type CapturePayloadInput = {
  data?: Buffer | string | null;
  contentType?: string;
  previewLimit?: number;
};
type CaptureDeleteResult$1 = {
  sessions: number;
  events: number;
  blobs: number;
};
type CaptureWorkerOperations = {
  "capture.upsertSession": {
    input: CaptureSessionRecord;
    output: void;
  };
  "capture.endSession": {
    input: {
      sessionId: string;
      endedAt: number;
    };
    output: void;
  };
  "capture.persistPayload": {
    input: {
      data: Buffer;
      contentType?: string;
    };
    output: SharedCaptureBlobRecord;
  };
  "capture.recordEvent": {
    input: CaptureEventRecord;
    output: void;
  };
  "capture.recordEventWithPayload": {
    input: {
      event: CaptureEventRecord;
      payload: CapturePayloadInput;
    };
    output: void;
  };
  "capture.listSessions": {
    input: {
      limit?: number;
    };
    output: CaptureSessionSummary[];
  };
  "capture.getSessionEvents": {
    input: {
      sessionId: string;
      limit?: number;
    };
    output: Array<Record<string, unknown>>;
  };
  "capture.summarizeSessionCoverage": {
    input: {
      sessionId: string;
    };
    output: CaptureSessionCoverageSummary;
  };
  "capture.readBlob": {
    input: {
      blobId: string;
    };
    output: string | null;
  };
  "capture.queryPreset": {
    input: {
      preset: CaptureQueryPreset;
      sessionId?: string;
    };
    output: CaptureQueryRow[];
  };
  "capture.deleteSessions": {
    input: {
      sessionIds: string[];
    };
    output: CaptureDeleteResult$1;
  };
  "capture.purgeAll": {
    input: undefined;
    output: CaptureDeleteResult$1;
  };
};
//#endregion
//#region src/proxy-capture/store.types.d.ts
type CaptureDeleteResult = CaptureWorkerOperations["capture.purgeAll"]["output"];
type AsyncDebugProxyCaptureStore = {
  readonly dbPath: string;
  readonly isClosed: boolean;
  upsertSession(session: CaptureSessionRecord): Promise<void>;
  endSession(sessionId: string, endedAt?: number): Promise<void>;
  persistPayload(data: Buffer, contentType?: string): Promise<SharedCaptureBlobRecord>;
  recordEvent(event: CaptureEventRecord): Promise<void>;
  recordEventWithPayload(event: CaptureEventRecord, payload: CapturePayloadInput): Promise<void>;
  listSessions(limit?: number): Promise<CaptureSessionSummary[]>;
  getSessionEvents(sessionId: string, limit?: number): Promise<Array<Record<string, unknown>>>;
  summarizeSessionCoverage(sessionId: string): Promise<CaptureSessionCoverageSummary>;
  readBlob(blobId: string): Promise<string | null>;
  queryPreset(preset: CaptureQueryPreset, sessionId?: string): Promise<CaptureQueryRow[]>;
  deleteSessions(sessionIds: string[]): Promise<CaptureDeleteResult>;
  purgeAll(): Promise<CaptureDeleteResult>;
  close(): Promise<void>;
};
//#endregion
//#region src/proxy-capture/store.async.d.ts
declare function acquireDebugProxyCaptureStoreAsync(options?: {
  env?: NodeJS.ProcessEnv;
}): Promise<{
  store: AsyncDebugProxyCaptureStore;
  release: () => Promise<void>;
}>;
//#endregion
//#region extensions/openai/default-models.d.ts
export declare const OPENAI_DEFAULT_MODEL = "openai/gpt-6-astra";
export declare const OPENAI_CODEX_DEFAULT_MODEL = "openai/gpt-6-astra";
export declare const OPENAI_DEFAULT_IMAGE_MODEL = "gpt-image-2";
export declare const OPENAI_DEFAULT_TTS_MODEL = "gpt-4o-mini-tts";
export declare const OPENAI_DEFAULT_TTS_VOICE = "alloy";
export declare const OPENAI_DEFAULT_AUDIO_TRANSCRIPTION_MODEL = "gpt-4o-transcribe";
export declare const OPENAI_DEFAULT_EMBEDDING_MODEL = "text-embedding-3-small";
export declare function applyOpenAIProviderConfig(cfg: OpenClawConfig): OpenClawConfig;
export declare function applyOpenAIConfig(cfg: OpenClawConfig): OpenClawConfig;
//#endregion
//#region extensions/openai/media-understanding-provider.d.ts
export declare const openaiMediaUnderstandingProvider: MediaUnderstandingProvider;
//#endregion
//#region extensions/openai/openai-chatgpt-oauth.runtime.d.ts
export declare function loginOpenAICodexOAuth(params: {
  prompter: ProviderAuthContext["prompter"];
  runtime: ProviderAuthContext["runtime"];
  oauth: ProviderAuthContext["oauth"];
  isRemote: boolean;
  openUrl: (url: string) => Promise<void>;
  signal?: AbortSignal;
  assertCurrent?: () => void;
  onManualCodeInput?: () => Promise<string>;
  localBrowserMessage?: string;
}): Promise<OAuthCredentials | null>;
//#endregion
//#region extensions/openai/openai-chatgpt-oauth-flow.runtime.d.ts
declare function refreshOpenAICodexToken$1(refreshToken: string): Promise<OAuthCredentials>;
//#endregion
//#region extensions/openai/openai-chatgpt-provider.runtime.d.ts
export declare function refreshOpenAICodexToken(...args: Parameters<typeof refreshOpenAICodexToken$1>): Promise<Awaited<ReturnType<typeof refreshOpenAICodexToken$1>>>;
//#endregion
//#region extensions/openai/openai-provider.d.ts
export declare function buildOpenAIProvider(): ProviderPlugin;
//#endregion
//#region extensions/openai/realtime-transcription-provider.d.ts
export declare function buildOpenAIRealtimeTranscriptionProvider(): RealtimeTranscriptionProviderPlugin;
//#endregion
//#region src/proxy-capture/store-readonly.d.ts
type DebugProxyCaptureReader = {
  getSessionEvents(sessionId: string, limit?: number): Array<Record<string, unknown>>;
  readBlob(blobId: string): string | null;
};
/** @deprecated Use createDebugProxyCaptureReaderAsync for worker-backed, noncreating reads. */
declare function createDebugProxyCaptureReader(params: {
  env: NodeJS.ProcessEnv;
}): DebugProxyCaptureReader;
//#endregion
//#region src/proxy-capture/store-readonly.async.d.ts
type AsyncDebugProxyCaptureReader = {
  getSessionEvents(sessionId: string, limit?: number): Promise<Array<Record<string, unknown>>>;
  readBlob(blobId: string): Promise<string | null>;
};
/** Capture the read target without opening or creating its database. */
declare function createDebugProxyCaptureReaderAsync(params: {
  env: NodeJS.ProcessEnv;
}): AsyncDebugProxyCaptureReader;
declare namespace proxy_capture_d_exports {
  export { AsyncDebugProxyCaptureReader, AsyncDebugProxyCaptureStore, CaptureEventRecord, CaptureQueryPreset, CaptureQueryRow, CaptureSessionSummary, DebugProxyCaptureReader, DebugProxyCaptureStore, acquireDebugProxyCaptureStore, acquireDebugProxyCaptureStoreAsync, captureHttpExchange, captureHttpExchangeAsync, captureWsEvent, captureWsEventAsync, closeDebugProxyCaptureStore, createDebugProxyCaptureReader, createDebugProxyCaptureReaderAsync, createDebugProxyWebSocketAgent, finalizeDebugProxyCapture, finalizeDebugProxyCaptureAsync, getDebugProxyCaptureStore, initializeDebugProxyCapture, initializeDebugProxyCaptureAsync, isDebugProxyGlobalFetchPatchInstalled, resolveDebugProxySettings, resolveEffectiveDebugProxyUrl };
}
//#endregion
//#region extensions/openai/realtime-host.d.ts
declare const openAIRealtimeHost: {
  resolveAgentDir: typeof resolveAgentDir;
  isProviderAuthProfileConfigured: (params: {
    provider: string;
    cfg?: OpenClawConfig;
    agentDir?: string;
    profileTypes?: readonly AuthProfileCredential["type"][];
    capability?: string;
    allowKeychainPrompt?: boolean;
    includeExternalCliAuth?: boolean;
  }) => boolean;
  resolveProviderAuthProfileApiKey: (params: {
    provider: string;
    cfg?: OpenClawConfig;
    agentDir?: string;
    profileTypes?: readonly AuthProfileCredential["type"][];
    capability?: string;
    allowKeychainPrompt?: boolean;
    includeExternalCliAuth?: boolean;
  }) => Promise<string | undefined>;
  resolveProviderRequestHeaders: typeof resolveProviderRequestHeaders$1;
  createRealtimeTranscriptionWebSocketSession: typeof createRealtimeTranscriptionWebSocketSession;
  captureWsEventAsync: typeof captureWsEventAsync | undefined;
  createDebugProxyWebSocketAgent: typeof createDebugProxyWebSocketAgent;
  resolveDebugProxySettings: typeof resolveDebugProxySettings;
  fetchWithSsrFGuard: typeof fetchWithSsrFGuard;
  createProviderHttpError: typeof createProviderHttpError;
  readProviderJsonResponse: typeof readProviderJsonResponse;
  readProviderTextResponse: typeof readProviderTextResponse;
  formatErrorMessage: typeof formatErrorMessage;
  warn: (value: string) => string;
  redactSensitiveText: typeof redactSensitiveText;
};
type OpenAIRealtimeHost = typeof openAIRealtimeHost;
//#endregion
//#region extensions/openai/realtime-quicksilver-socket.shared.d.ts
type OpenAIQuicksilverSocket = {
  readonly readyState: number;
  send(payload: string): void;
  close(code?: number, reason?: string): void;
  on(event: "message", listener: (data: RawData, isBinary: boolean) => void): OpenAIQuicksilverSocket;
  on(event: "error", listener: (error: Error) => void): OpenAIQuicksilverSocket;
  on(event: "close", listener: (code: number, reason: Buffer) => void): OpenAIQuicksilverSocket;
  once(event: "open", listener: () => void): OpenAIQuicksilverSocket;
  once(event: "error", listener: (error: Error) => void): OpenAIQuicksilverSocket;
  once(event: "close", listener: (code: number, reason: Buffer) => void): OpenAIQuicksilverSocket;
  off(event: "open", listener: () => void): OpenAIQuicksilverSocket;
  off(event: "message", listener: (data: RawData, isBinary: boolean) => void): OpenAIQuicksilverSocket;
  off(event: "error", listener: (error: Error) => void): OpenAIQuicksilverSocket;
  off(event: "close", listener: (code: number, reason: Buffer) => void): OpenAIQuicksilverSocket;
};
type OpenAIQuicksilverSocketFactory = (url: string, options: Pick<ClientOptions, "headers" | "maxPayload">) => OpenAIQuicksilverSocket;
//#endregion
//#region extensions/openai/realtime-quicksilver-wire.d.ts
type OpenAIQuicksilverAuth = {
  type: "api-key";
  token: string;
} | {
  type: "oauth";
  token: string;
  accountId: string;
};
type OpenAIQuicksilverInitialItem = {
  role: "user" | "assistant";
  text: string;
};
//#endregion
//#region extensions/openai/realtime-quicksilver-session.d.ts
type OpenAIQuicksilverSessionRequest = {
  initialItems?: OpenAIQuicksilverInitialItem[];
  ownerConnId?: string;
} & ((RealtimeVoiceBrowserSessionCreateRequest & {
  gaSession?: Record<string, unknown> & {
    model: string;
  };
  gaSideband?: never;
}) | (Omit<RealtimeVoiceBrowserSessionCreateRequest, "clientControl" | "gatewayControl"> & {
  clientControl: {
    owner: "gateway";
  };
  gatewayControl: RealtimeVoiceGatewayControl;
  gaSession: Record<string, unknown> & {
    model: string;
  };
  gaSideband: {
    createBridge: (params: {
      apiKey: string;
      callId: string;
      onTerminal: () => void;
    }) => RealtimeVoiceBridge;
  };
}));
declare function createOpenAIQuicksilverBrowserSessionBroker(params: {
  getConfig: () => OpenClawConfig | undefined;
  logger: Pick<PluginLogger, "debug" | "warn">;
  fetchImpl?: typeof fetch;
  webSocketFactory?: OpenAIQuicksilverSocketFactory;
  onCleanupComplete?: () => void;
}, context: OpenAIRealtimeHost): {
  broker: {
    capabilities: Partial<RealtimeVoiceProviderCapabilities> & {
      handlesAgentConsult: true;
    };
    createBrowserSession: (request: OpenAIQuicksilverSessionRequest, auth: OpenAIQuicksilverAuth) => Promise<RealtimeVoiceBrowserSession>;
    cancelBrowserSession: (session: RealtimeVoiceBrowserSession) => Promise<void> | void;
  };
  handler: (req: IncomingMessage, res: ServerResponse) => Promise<boolean>;
  cleanup: () => Promise<void>;
  getSessionCounts: () => {
    pending: number;
    inFlight: number;
    active: number;
    reservations: number;
  };
};
//#endregion
//#region extensions/openai/realtime-voice-provider-factory.d.ts
type OpenAIQuicksilverBrowserSessionBroker = ReturnType<typeof createOpenAIQuicksilverBrowserSessionBroker>["broker"];
declare function buildOpenAIRealtimeVoiceProvider$1(context: OpenAIRealtimeHost, options?: {
  quicksilverBrowserSessionBroker?: OpenAIQuicksilverBrowserSessionBroker;
  logger?: Pick<PluginLogger, "debug" | "warn">;
}): RealtimeVoiceProviderPlugin;
//#endregion
//#region extensions/openai/realtime-voice-provider.d.ts
export declare function buildOpenAIRealtimeVoiceProvider(options?: Parameters<typeof buildOpenAIRealtimeVoiceProvider$1>[1]): RealtimeVoiceProviderPlugin;
//#endregion