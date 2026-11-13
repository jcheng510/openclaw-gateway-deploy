import "./diagnostic-events-5PMgeIeB.js";
//#region src/infra/gateway-scheduler.d.ts
type GatewaySchedulerClock = {
  now: () => number;
  monotonicNow: () => number;
  arm: (run: () => void | Promise<void>, delayMs: number) => () => void;
};
type GatewayScheduledJob = {
  cancel: () => void;
  stop: () => Promise<void>;
};
/** Owns Gateway wakeups; stores and execution owners retain their deadlines and authority. */
declare class GatewayScheduler {
  private readonly clock;
  private readonly jobs;
  private readonly pending;
  private cancelTimer?;
  private dispatching;
  private timerGeneration;
  private closed;
  private readonly controller;
  constructor(options?: {
    clock?: GatewaySchedulerClock;
  });
  get signal(): AbortSignal;
  now(): number;
  get nextWakeAtMs(): number | null;
  schedule(params: {
    id: string;
    everyMs?: number;
    /** Keep both pending clock deadlines when a stale read would postpone the wake. */
    mode?: "replace" | "earliest";
    run: () => void | Promise<unknown>;
  } & ({
    atMs: number;
  } | {
    delayMs: number;
  })): GatewayScheduledJob;
  beginClose(): void;
  stop(): Promise<void>;
  private remaining;
  private arm;
  private wake;
  private run;
}
//#endregion
export { GatewayScheduler as n, GatewayScheduledJob as t };