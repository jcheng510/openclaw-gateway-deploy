import { D as resolveExpiresAtMsFromDurationMs, F as resolveTimerTimeoutMs } from "./number-coercion-Dq1l5muL.mjs";
import { r as getAsyncWorkSignal, t as AsyncWorkScope } from "./async-work-scope-ClifbwQr.mjs";
import { _ as retainGatewayRootWorkAdmissionContinuationScope } from "./gateway-work-admission-B4bQUVQ6.mjs";
import { randomUUID } from "node:crypto";
//#region src/gateway/question-manager.ts
/** Grace period for late question.waitAnswer and question.get calls. */
const QUESTION_RESOLVED_ENTRY_GRACE_MS = 15e3;
const QuestionManagerErrorCodes = {
	NOT_FOUND: "QUESTION_NOT_FOUND",
	ALREADY_TERMINAL: "QUESTION_ALREADY_TERMINAL",
	ID_IN_USE: "QUESTION_ID_IN_USE",
	INVALID_ANSWER: "QUESTION_INVALID_ANSWER",
	REQUESTER_INACTIVE: "QUESTION_REQUESTER_INACTIVE"
};
var QuestionManagerError = class extends Error {
	constructor(code, message) {
		super(message);
		this.code = code;
		this.name = "QuestionManagerError";
	}
};
function waitResult(entry, includeResolutionId) {
	const { record, resolutionId } = entry;
	if (record.status !== "answered") return { status: record.status };
	return {
		status: "answered",
		answers: record.answers ?? { answers: {} },
		...includeResolutionId && resolutionId ? { resolutionId } : {}
	};
}
/** Process-local lifecycle owner for pending questions. */
var QuestionManager = class {
	constructor(scheduler, onPublicationError) {
		this.scheduler = scheduler;
		this.onPublicationError = onPublicationError;
		this.entries = /* @__PURE__ */ new Map();
		this.closed = false;
		this.publications = new AsyncWorkScope();
		this.scheduleId = `questions:${randomUUID()}`;
	}
	async drain() {
		if (this.closed) await this.publications.drain();
		else await AsyncWorkScope.runWhenAllIdle(() => [this.publications], () => {});
	}
	request(params) {
		if (this.closed) throw new Error("Question manager is closed");
		if (params.isRequesterActive && !params.isRequesterActive()) throw new QuestionManagerError(QuestionManagerErrorCodes.REQUESTER_INACTIVE, "the agent run that requested this question is no longer active");
		const createdAtMs = this.scheduler.now();
		const timeoutMs = resolveTimerTimeoutMs(params.timeoutMs, 1);
		const expiresAtMs = resolveExpiresAtMsFromDurationMs(timeoutMs, { nowMs: createdAtMs });
		if (expiresAtMs === void 0) throw new Error("question expiry is unavailable");
		const id = params.id ?? randomUUID();
		if (this.entries.has(id)) throw new QuestionManagerError(QuestionManagerErrorCodes.ID_IN_USE, `question '${id}' already exists`);
		const record = {
			id,
			questions: params.questions,
			...params.agentId ? { agentId: params.agentId } : {},
			...params.sessionKey ? { sessionKey: params.sessionKey } : {},
			...params.runId ? { runId: params.runId } : {},
			createdAtMs,
			expiresAtMs,
			status: "pending"
		};
		const entry = {
			record,
			ordinary: !params.questions.some((question) => question.isSecret || question.secretStore),
			job: this.scheduler.schedule({
				id: `${this.scheduleId}:${id}`,
				delayMs: timeoutMs,
				run: () => {
					this.expire(id);
					return this.drain();
				}
			}),
			waiters: /* @__PURE__ */ new Set(),
			onResolved: params.onResolved,
			sessionAccess: params.sessionAccess,
			isRequesterActive: params.isRequesterActive,
			requesterRun: params.requesterRun,
			admissionContinuation: retainGatewayRootWorkAdmissionContinuationScope()
		};
		this.entries.set(record.id, entry);
		entry.releaseHumanInputWait = params.registerHumanInputWait?.(() => this.get(id)?.status === "pending" && this.entries.get(id) === entry);
		return record;
	}
	get(id) {
		const entry = this.entries.get(id);
		if (!entry) return null;
		if (entry.record.status === "pending" && entry.record.expiresAtMs <= this.scheduler.now()) this.expire(id);
		this.refreshRequester(entry);
		return this.entries.get(id) === entry ? entry.record : null;
	}
	/** Observation only: unlike get(), this cannot expire or cancel and recursively broadcast. */
	observe(id, expectedRecord) {
		const entry = this.entries.get(id);
		if (!entry || expectedRecord && entry.record !== expectedRecord) return null;
		return this.observeEntry(entry);
	}
	observeEntry(entry) {
		return {
			get record() {
				return entry.record;
			},
			ordinary: entry.ordinary,
			sessionAccess: entry.sessionAccess,
			isCurrent: () => this.entries.get(entry.record.id) === entry,
			refreshRequester: () => this.refreshRequester(entry)
		};
	}
	refreshRequester(entry) {
		if (this.entries.get(entry.record.id) !== entry || entry.record.status !== "pending") return;
		if (entry.isRequesterActive?.() === false && this.entries.get(entry.record.id) === entry && entry.record.status === "pending") this.cancelEntry(entry, "requester-inactive");
	}
	/** Called by the Gateway's existing authority-close observer. */
	cancelClosedAuthorities(closedRun) {
		for (const [id, entry] of this.entries) {
			if (closedRun && entry.requesterRun && (entry.requesterRun.runId !== closedRun.runId || closedRun.instanceId !== void 0 && entry.requesterRun.instanceId !== closedRun.instanceId)) continue;
			this.get(id);
		}
	}
	list(include) {
		const records = [];
		for (const [id, entry] of this.entries) {
			if (include && !include(entry.record)) continue;
			const record = this.get(id);
			if (record?.status === "pending") records.push(record);
		}
		return records.toSorted((left, right) => left.createdAtMs - right.createdAtMs || left.id.localeCompare(right.id));
	}
	/** Re-enters only the still-pending question's original admitted root. */
	runPendingContinuation(id, run) {
		const record = this.get(id);
		const entry = this.entries.get(id);
		if (!entry?.admissionContinuation || entry.record !== record || entry.record.status !== "pending" || entry.record.expiresAtMs <= this.scheduler.now()) return null;
		return entry.admissionContinuation.run(run);
	}
	waitAnswer(id, timeoutMs, includeResolutionId = false) {
		const entry = this.requireEntry(id);
		if (entry.record.status !== "pending") return Promise.resolve(waitResult(entry, includeResolutionId));
		const signal = getAsyncWorkSignal();
		return new Promise((resolve) => {
			let timer;
			const waiter = () => {
				if (!entry.waiters.delete(waiter)) return;
				clearTimeout(timer);
				signal?.removeEventListener("abort", waiter);
				resolve(waitResult(entry, includeResolutionId));
			};
			entry.waiters.add(waiter);
			if (signal?.aborted) {
				waiter();
				return;
			}
			signal?.addEventListener("abort", waiter, { once: true });
			if (timeoutMs !== void 0) {
				timer = setTimeout(waiter, resolveTimerTimeoutMs(timeoutMs, 1));
				timer.unref?.();
			}
		});
	}
	resolve(id, answers, resolvedBy, options) {
		const entry = this.requirePendingEntry(id);
		const canonical = this.validateAnswers(entry.record.questions, answers);
		options?.commit?.();
		entry.resolutionId = options?.resolutionId;
		entry.record = {
			...entry.record,
			status: "answered",
			answers: canonical,
			...resolvedBy ? { resolvedBy } : {}
		};
		this.finish(entry);
		return {
			status: "answered",
			answers: canonical
		};
	}
	cancel(id, resolvedBy) {
		const entry = this.requirePendingEntry(id);
		return this.cancelEntry(entry, resolvedBy);
	}
	cancelEntry(entry, resolvedBy) {
		entry.record = {
			...entry.record,
			status: "cancelled",
			...resolvedBy ? { resolvedBy } : {}
		};
		this.finish(entry);
		return { status: "cancelled" };
	}
	/** Retires this Gateway's owner only after received mutations have joined. */
	close() {
		if (this.closed) return;
		this.closed = true;
		this.publications.beginClose();
		this.reset();
	}
	/** Reusable on open owners (v2026.8.1 SDK context); never reopens a closed owner. */
	reset() {
		const entries = [...this.entries.values()];
		this.entries.clear();
		for (const entry of entries) {
			entry.sessionAccess?.release();
			entry.job.cancel();
			const releaseHumanInputWait = entry.releaseHumanInputWait;
			entry.releaseHumanInputWait = void 0;
			releaseHumanInputWait?.(false);
			entry.admissionContinuation?.release();
			entry.admissionContinuation = null;
			for (const waiter of entry.waiters) waiter();
		}
	}
	requireEntry(id) {
		const record = this.get(id);
		const entry = this.entries.get(id);
		if (!record || !entry || entry.record !== record) throw this.notFound(id);
		return entry;
	}
	requirePendingEntry(id) {
		const entry = this.requireEntry(id);
		if (entry.record.status !== "pending") throw new QuestionManagerError(QuestionManagerErrorCodes.ALREADY_TERMINAL, `question '${id}' is already ${entry.record.status}`);
		return entry;
	}
	/** Validates answers against stored questions and returns them in canonical form. */
	validateAnswers(questions, answers) {
		const submittedIds = Object.keys(answers.answers);
		const questionsById = new Map(questions.map((question) => [question.questionId, question]));
		const unknownId = submittedIds.find((id) => !questionsById.has(id));
		if (unknownId) throw this.invalidAnswer(unknownId, "is not part of this request");
		const canonical = { answers: {} };
		for (const question of questions) {
			const values = Object.hasOwn(answers.answers, question.questionId) ? answers.answers[question.questionId] : void 0;
			if (!values || values.length === 0) throw this.invalidAnswer(question.questionId, "requires an answer");
			if (values.some((value) => question.isSecret ? value.length === 0 : !value.trim())) throw this.invalidAnswer(question.questionId, "contains an empty answer");
			if (!question.multiSelect && values.length > 1) throw this.invalidAnswer(question.questionId, "does not allow multiple answers");
			const canonicalValues = values.map((value) => {
				if (question.isSecret) return value;
				const matched = question.options.find((option) => option.label.trim() === value.trim());
				return matched ? matched.label : value.trim();
			});
			if (question.options.length > 0 && !question.isOther && canonicalValues.some((value) => !question.options.some((option) => option.label === value))) throw this.invalidAnswer(question.questionId, "contains an unknown option");
			canonical.answers[question.questionId] = canonicalValues;
		}
		return canonical;
	}
	invalidAnswer(id, reason) {
		return new QuestionManagerError(QuestionManagerErrorCodes.INVALID_ANSWER, `question '${id}' ${reason}`);
	}
	notFound(id) {
		return new QuestionManagerError(QuestionManagerErrorCodes.NOT_FOUND, `question '${id}' was not found`);
	}
	expire(id) {
		const entry = this.entries.get(id);
		if (!entry || entry.record.status !== "pending") return;
		entry.record = {
			...entry.record,
			status: "expired"
		};
		this.finish(entry);
	}
	finish(entry) {
		entry.job.cancel();
		const continuation = entry.admissionContinuation;
		entry.admissionContinuation = null;
		let settled = false;
		const settle = () => {
			if (settled) return;
			settled = true;
			const releaseHumanInputWait = entry.releaseHumanInputWait;
			entry.releaseHumanInputWait = void 0;
			try {
				releaseHumanInputWait?.(entry.isRequesterActive?.() !== false);
			} finally {
				entry.isRequesterActive = void 0;
				for (const waiter of entry.waiters) waiter();
			}
		};
		const publish = async () => {
			try {
				settle();
				const { id, status, answers } = entry.record;
				if (status !== "pending" && this.entries.get(id) === entry) {
					const event = status === "answered" ? {
						id,
						status,
						answers: answers ?? { answers: {} }
					} : {
						id,
						status
					};
					await entry.onResolved?.(event, this.observeEntry(entry));
				}
			} finally {
				continuation?.release();
			}
		};
		this.publications.track(async () => {
			try {
				let publication;
				try {
					publication = continuation ? continuation.run(publish) : publish();
				} finally {
					settle();
				}
				await publication;
			} finally {
				if (this.entries.get(entry.record.id) === entry) entry.job = this.scheduler.schedule({
					id: `${this.scheduleId}:${entry.record.id}`,
					delayMs: QUESTION_RESOLVED_ENTRY_GRACE_MS,
					run: () => {
						if (this.entries.get(entry.record.id) === entry) {
							this.entries.delete(entry.record.id);
							entry.sessionAccess?.release();
						}
					}
				});
			}
		}).catch(() => {
			continuation?.release();
			this.onPublicationError?.();
		});
	}
};
//#endregion
export { QuestionManagerError as n, QuestionManagerErrorCodes as r, QuestionManager as t };
