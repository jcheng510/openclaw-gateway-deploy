import { t as createDeferredCore } from "./deferred-D0La5CRk.mjs";
import { o as runOutsideAsyncWorkScope, t as AsyncWorkScope } from "./async-work-scope-ClifbwQr.mjs";
import { t as createSubsystemLogger } from "./subsystem-CeqVSEVi.mjs";
import { AsyncLocalStorage } from "node:async_hooks";
//#region src/infra/gateway-scheduler.ts
const log = createSubsystemLogger("gateway/scheduler");
const hostClock = {
	now: () => Date.now(),
	monotonicNow: () => performance.now(),
	arm: (run, delayMs) => {
		const timer = setTimeout(() => {
			run();
		}, delayMs);
		timer.unref();
		return () => clearTimeout(timer);
	}
};
/** Owns Gateway wakeups; stores and execution owners retain their deadlines and authority. */
var GatewayScheduler = class {
	constructor(options = {}) {
		this.jobs = /* @__PURE__ */ new Map();
		this.pending = /* @__PURE__ */ new Set();
		this.dispatching = false;
		this.timerGeneration = 0;
		this.closed = false;
		this.controller = new AbortController();
		this.clock = options.clock ?? hostClock;
	}
	get signal() {
		return this.controller.signal;
	}
	now() {
		return this.clock.now();
	}
	get nextWakeAtMs() {
		const nowMs = this.now();
		const elapsedMs = this.clock.monotonicNow();
		let next = null;
		for (const job of this.jobs.values()) {
			if (job.pending.size > 0) continue;
			const atMs = nowMs + this.remaining(job, nowMs, elapsedMs);
			next = next === null ? atMs : Math.min(next, atMs);
		}
		return next;
	}
	schedule(params) {
		const relative = "delayMs" in params;
		const nowMs = this.now();
		const atMs = relative ? nowMs + params.delayMs : params.atMs;
		if (!Number.isFinite(atMs) || params.everyMs !== void 0 && (!Number.isFinite(params.everyMs) || params.everyMs <= 0)) throw new Error(`Invalid Gateway schedule: ${params.id}`);
		const previous = this.jobs.get(params.id);
		if (previous) previous.cancelled = true;
		const job = {
			id: params.id,
			run: params.run,
			everyMs: params.everyMs,
			atMs,
			elapsedAtMs: relative || params.everyMs !== void 0 ? this.clock.monotonicNow() + Math.max(0, atMs - nowMs) : void 0,
			context: runOutsideAsyncWorkScope(() => AsyncLocalStorage.snapshot()),
			pending: /* @__PURE__ */ new Set(),
			cancelled: this.closed
		};
		if (params.mode === "earliest" && previous && previous.pending.size === 0) {
			job.atMs = Math.min(job.atMs, previous.atMs);
			if (previous.elapsedAtMs !== void 0) job.elapsedAtMs = job.elapsedAtMs === void 0 ? previous.elapsedAtMs : Math.min(job.elapsedAtMs, previous.elapsedAtMs);
		}
		const cancel = () => {
			job.cancelled = true;
			if (this.jobs.get(job.id) === job) {
				this.jobs.delete(job.id);
				this.arm();
			}
		};
		if (!this.closed) {
			this.jobs.set(job.id, job);
			this.arm();
		}
		return {
			cancel,
			stop: async () => {
				cancel();
				await Promise.all(job.pending);
			}
		};
	}
	beginClose() {
		this.closed = true;
		this.controller.abort();
		this.timerGeneration += 1;
		this.cancelTimer?.();
		this.cancelTimer = void 0;
		for (const job of this.jobs.values()) job.cancelled = true;
		this.jobs.clear();
	}
	async stop() {
		this.beginClose();
		await Promise.all(this.pending);
	}
	remaining(job, nowMs, elapsedMs) {
		const wallDelay = job.atMs - nowMs;
		return job.elapsedAtMs === void 0 ? wallDelay : Math.min(wallDelay, job.elapsedAtMs - elapsedMs);
	}
	arm() {
		if (this.closed || this.dispatching) return;
		this.cancelTimer?.();
		this.cancelTimer = void 0;
		const generation = ++this.timerGeneration;
		const next = this.nextWakeAtMs;
		if (next !== null) {
			const nowMs = this.now();
			const delayMs = Math.min(2147483647, Math.max(0, next - nowMs));
			this.cancelTimer = this.clock.arm(() => generation === this.timerGeneration ? this.wake(nowMs + delayMs) : void 0, delayMs);
		}
	}
	wake(expectedAtMs) {
		this.cancelTimer = void 0;
		if (this.closed) return;
		const nowMs = this.now();
		const elapsedMs = this.clock.monotonicNow();
		const due = [...this.jobs.values()].filter((job) => job.pending.size === 0 && this.remaining(job, nowMs, elapsedMs) <= 0).toSorted((a, b) => this.remaining(a, nowMs, elapsedMs) - this.remaining(b, nowMs, elapsedMs));
		const started = [];
		if (nowMs - expectedAtMs > 6e4) log.debug(`late wake by ${nowMs - expectedAtMs}ms; coalescing ${due.length} due jobs`);
		this.dispatching = true;
		try {
			for (const job of due) {
				if (this.closed || job.cancelled || this.jobs.get(job.id) !== job) continue;
				if (job.everyMs === void 0) this.jobs.delete(job.id);
				started.push(this.run(job));
			}
		} finally {
			this.dispatching = false;
			this.arm();
		}
		return Promise.all(started).then(() => void 0);
	}
	run(job) {
		log.debug(`running ${job.id}`);
		const done = createDeferredCore();
		const work = new AsyncWorkScope();
		job.pending.add(done.promise);
		this.pending.add(done.promise);
		const finish = () => {
			job.pending.delete(done.promise);
			this.pending.delete(done.promise);
			if (job.everyMs !== void 0 && !job.cancelled && !this.closed) {
				job.atMs = this.now() + job.everyMs;
				job.elapsedAtMs = this.clock.monotonicNow() + job.everyMs;
			}
			done.resolve();
			this.arm();
		};
		let result = void 0;
		try {
			result = job.context(() => work.run(job.run));
		} catch (error) {
			log.error(`${job.id} failed: ${String(error)}`);
		}
		if (!result && !work.hasPendingWork) {
			finish();
			return done.promise;
		}
		Promise.resolve(result).catch((error) => log.error(`${job.id} failed: ${String(error)}`)).then(() => AsyncWorkScope.runWhenAllIdle(() => [work], () => work.drain())).finally(finish);
		return done.promise;
	}
};
//#endregion
export { GatewayScheduler as t };
