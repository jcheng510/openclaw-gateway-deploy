import { r as getRuntimeConfig } from "./io.runtime-BOdk1dW9.mjs";
import "./io-B18HRL9J.mjs";
import { i as resolveSessionEventAgentScope } from "./session-request-agent-DFWpsx2m.mjs";
import { n as withReadySessionRows } from "./session-row-prepared-read-KCtcAa3e.mjs";
import { performance } from "node:perf_hooks";
//#region src/gateway/session-event-prepared-row.ts
const PUBLICATIONS_PER_TURN = 8;
const PUBLICATION_BUDGET_MS = 6;
const publicationOwners = /* @__PURE__ */ new WeakMap();
function createPublicationOwner(projection) {
	const pending = /* @__PURE__ */ new Set();
	const deferred = Symbol("publication-deferred");
	let started = 0;
	let startedAt = 0;
	let reset;
	let wake;
	const waiting = /* @__PURE__ */ new Set();
	function track(work) {
		pending.add(work);
		work.then(() => pending.delete(work), () => pending.delete(work));
		return work;
	}
	function wakeNext() {
		wake ??= setImmediate(() => {
			wake = void 0;
			clearImmediate(reset);
			reset = void 0;
			const resume = waiting.values().next().value;
			if (resume) {
				waiting.delete(resume);
				resume();
			}
			if (waiting.size > 0) wakeNext();
		});
	}
	function claimTurn(resumed) {
		const now = performance.now();
		if (!reset) {
			started = 0;
			startedAt = now;
			reset = setImmediate(() => {
				reset = void 0;
			});
			reset.unref?.();
		}
		if (!resumed && (wake || waiting.size > 0) || started >= PUBLICATIONS_PER_TURN || now - startedAt >= PUBLICATION_BUDGET_MS) return new Promise((resolve) => {
			waiting.add(resolve);
			wakeNext();
		});
		started++;
	}
	const rows = { withPreparedExactRows(queries, consume, options) {
		return track((async () => {
			let resumed = false;
			for (;;) {
				let yieldUntil;
				const prepared = await projection.withPreparedExactRows(queries, (read) => {
					yieldUntil = claimTurn(resumed);
					return yieldUntil ? deferred : consume(read);
				}, options);
				if (prepared.kind === "pending") return prepared;
				if (prepared.value !== deferred) return {
					kind: "complete",
					value: prepared.value
				};
				await yieldUntil;
				resumed = true;
			}
		})());
	} };
	return {
		rows: {
			...rows,
			track,
			withReadyRows(queries, consume, options) {
				return track(withReadySessionRows(rows, queries, consume, options));
			}
		},
		async drain() {
			while (pending.size > 0) await Promise.allSettled(pending);
			clearImmediate(reset);
			reset = void 0;
		}
	};
}
/** Independent prepared publishers share a budget without serializing row preparation. */
function sessionEventPublicationRows(projection) {
	let owner = publicationOwners.get(projection);
	if (!owner) {
		owner = createPublicationOwner(projection);
		publicationOwners.set(projection, owner);
	}
	return owner.rows;
}
async function drainSessionEventPublications(projection) {
	await publicationOwners.get(projection)?.drain();
}
async function withPreparedSessionEventRow(projection, sessionKey, eventAgentId, publish) {
	if (!projection) {
		publish();
		return;
	}
	const routingAgentId = resolveSessionEventAgentScope(getRuntimeConfig(), sessionKey, eventAgentId)?.[1];
	if (routingAgentId) {
		await sessionEventPublicationRows(projection).withReadyRows(() => [{
			key: sessionKey,
			agentId: routingAgentId
		}], () => publish(), { includeAncestors: true });
		return;
	}
	do
		await projection.ensureMaterialized();
	while (projection.needsMaterialization);
	publish();
}
//#endregion
export { sessionEventPublicationRows as n, withPreparedSessionEventRow as r, drainSessionEventPublications as t };
