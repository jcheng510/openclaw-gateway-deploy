import { types } from "node:util";
//#region src/plugins/plugin-return-value.ts
const promiseThen = Object.getOwnPropertyDescriptor(Promise.prototype, "then");
const promiseSpecies = Object.getOwnPropertyDescriptor(Promise, Symbol.species);
/** Preserve foreign then/species results while identifying native host continuations. */
function mapPluginReturnPromise(completion, fulfilled, rejected) {
	const then = completion.then;
	const constructor = types.isPromise(completion) && Object.getPrototypeOf(completion) === Promise.prototype ? Object.getOwnPropertyDescriptor(completion, "constructor") ?? Object.getOwnPropertyDescriptor(Promise.prototype, "constructor") : void 0;
	const host = then === promiseThen?.value && constructor?.value === Promise && Object.getOwnPropertyDescriptor(Promise, Symbol.species)?.get === promiseSpecies?.get;
	return {
		value: Reflect.apply(then, completion, rejected ? [fulfilled, rejected] : [fulfilled]),
		host
	};
}
/** Capture a returned then method once without turning synchronous values into async work. */
function resolvePluginReturnPromise(value) {
	if (types.isPromise(value)) return Promise.resolve(value);
	if (value === null || typeof value !== "object" && typeof value !== "function") return;
	let then;
	try {
		then = Reflect.get(value, "then");
	} catch (error) {
		return Promise.reject(error);
	}
	if (typeof then !== "function") return;
	return Promise.resolve({ then(resolve, reject) {
		Reflect.apply(then, value, [resolve, reject]);
	} });
}
//#endregion
export { resolvePluginReturnPromise as n, mapPluginReturnPromise as t };
