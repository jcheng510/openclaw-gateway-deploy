//#region src/utils/fetch-timeout.d.ts
type TimeoutAbortSignalParams = {
  timeoutMs?: number;
  signal?: AbortSignal;
  operation?: string;
  url?: string;
};
/** Returns a bound abort relay for use as an event listener. */
declare function bindAbortRelay(controller: AbortController): () => void;
/**
 * Builds an abort signal that combines an optional parent signal with a timeout.
 * Callers must run `cleanup`; `refresh` restarts only the internal timeout timer.
 */
declare function buildTimeoutAbortSignal(params: TimeoutAbortSignalParams): {
  signal?: AbortSignal;
  cleanup: () => void;
  refresh: () => void;
};
declare function fetchWithTimeout(url: string, init: RequestInit, timeoutMs: number, fetchFn?: typeof fetch): Promise<Response>;
//#endregion
export { buildTimeoutAbortSignal as n, fetchWithTimeout as r, bindAbortRelay as t };