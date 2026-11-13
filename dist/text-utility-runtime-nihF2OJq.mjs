import "./cjk-chars-6ld30jSx.mjs";
import { A as withTimeout } from "./fs-safe-CHQXnCPk.mjs";
import "./utils-DUAwk2p5.mjs";
import "./fetch-timeout-BalAwPkh.mjs";
import "./with-timeout-Wg1tC7se.mjs";
import "./tool-result-limits-B-fhY8wF.mjs";
//#region src/plugin-sdk/text-utility-runtime.ts
/** Run a channel probe with shared timeout, elapsed-time, and error-result handling. */
async function runChannelProbe(timeoutMs, run, onError) {
	const startedAt = Date.now();
	const elapsedMs = () => Date.now() - startedAt;
	const finish = (result) => ({
		...result,
		elapsedMs: result.elapsedMs ?? elapsedMs()
	});
	try {
		return finish(await withTimeout(run({
			startedAt,
			elapsedMs
		}), timeoutMs ?? 0));
	} catch (error) {
		if (!onError) throw error;
		return finish(onError(error));
	}
}
//#endregion
export { runChannelProbe as t };
