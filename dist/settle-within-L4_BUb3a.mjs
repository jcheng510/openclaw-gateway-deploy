//#region src/shared/settle-within.ts
/** A deadline bounds waiting; fulfillment alone does not certify resource cleanup. */
async function settlesWithin(promise, timeoutMs) {
	let timer;
	try {
		return await Promise.race([promise.then(() => true), new Promise((resolve) => {
			timer = setTimeout(() => resolve(false), timeoutMs);
			timer.unref?.();
		})]);
	} finally {
		clearTimeout(timer);
	}
}
//#endregion
export { settlesWithin as t };
