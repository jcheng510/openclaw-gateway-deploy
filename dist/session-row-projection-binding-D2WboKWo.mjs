import { i as resolveGlobalSingleton } from "./global-singleton-BfHBYj6Y.mjs";
//#region src/gateway/session-row-projection-binding.ts
const SessionRowProjectionBinding = resolveGlobalSingleton(Symbol.for("openclaw.sessionRowProjectionBinding"), () => class {
	constructor(owner, readCommittedEntry) {
		this.owner = owner;
		this.readCommittedEntry = readCommittedEntry;
	}
});
//#endregion
export { SessionRowProjectionBinding as t };
