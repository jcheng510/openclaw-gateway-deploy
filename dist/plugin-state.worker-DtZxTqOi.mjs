import { n as captureOpenClawStateDatabaseReadAdmission } from "./openclaw-state-db-cache-IAib4pqp.mjs";
import { n as ok, t as err } from "./result-BQGgYouL.mjs";
import { i as requestSqliteWorkerOperationAdmission } from "./sqlite-worker-operation-admission-BB758RIN.mjs";
import { l as runOpenClawStateWriteTransaction } from "./openclaw-state-db-DM-mSY0m.mjs";
import { a as wrapPluginStateError, b as lookupPluginStateEntry, d as countLivePluginStateNamespaceEntries, i as withPluginStateDatabaseReadOnly, m as deletePluginStateEntry, p as deleteExpiredPluginStateEntries, t as capturePluginStateWorkerFailure } from "./plugin-state-worker-errors-CjFwoNaT.mjs";
import { _ as consumePluginStateEntry, b as registerPluginStateEntryIfAbsent, g as clearPluginStateNamespace, m as observePluginStateEntry, n as listPluginStateEntriesInKeyRange, o as registerPluginStateSequencedJournalEntryInDatabase, p as compareAndApplyPluginStateEntry, r as lookupPluginStateEntries, t as listPluginStateEntries, v as deletePluginStateEntryIfEqual, w as registerPluginStateEntry, y as movePluginStateEntries } from "./plugin-state-store.reads-CJVwh8aX.mjs";
import { n as pluginStateWorkerOperations } from "./plugin-state-worker-contract-jJNqV2rs.mjs";
//#region src/plugin-state/plugin-state.worker.ts
function executePluginStateCommand(command, options, openDatabase, hasRetainedDatabase) {
	const description = pluginStateWorkerOperations[command.type];
	const failure = (error) => err(capturePluginStateWorkerFailure(wrapPluginStateError(error, description.operation, description.code, description.message, options.path)));
	if (command.type === "pluginState.lookup" || command.type === "pluginState.lookupMany" || command.type === "pluginState.entries" || command.type === "pluginState.entriesInKeyRange" || command.type === "pluginState.count") try {
		switch (command.type) {
			case "pluginState.lookup": return ok(withPluginStateDatabaseReadOnly("lookup", (store) => lookupPluginStateEntry(store, command.input), options));
			case "pluginState.lookupMany": {
				const rows = withPluginStateDatabaseReadOnly("lookup", (store) => lookupPluginStateEntries(store, command.input), options) ?? command.input.keys.map(() => ok(void 0));
				return ok(rows.map((row) => row.ok ? row : err(capturePluginStateWorkerFailure(row.error))));
			}
			case "pluginState.entriesInKeyRange": return ok(withPluginStateDatabaseReadOnly("entries", (store) => listPluginStateEntriesInKeyRange(store, command.input), options) ?? []);
			case "pluginState.entries": return ok(withPluginStateDatabaseReadOnly("entries", (store) => listPluginStateEntries(store, command.input), options) ?? []);
			case "pluginState.count": return ok(withPluginStateDatabaseReadOnly("count", ({ db }) => countLivePluginStateNamespaceEntries(db, {
				...command.input,
				now: Date.now()
			}), options) ?? 0);
		}
	} catch (error) {
		return failure(error);
	}
	let database;
	try {
		database = openDatabase();
	} catch (error) {
		return err(capturePluginStateWorkerFailure(wrapPluginStateError(error, description.operation, hasRetainedDatabase ? description.code : "PLUGIN_STATE_OPEN_FAILED", hasRetainedDatabase ? description.message : "Failed to open the plugin state database.", options.path)));
	}
	try {
		return ok(runOpenClawStateWriteTransaction((store) => {
			requestSqliteWorkerOperationAdmission({
				stage: "transaction",
				facts: void 0
			});
			const result = (() => {
				switch (command.type) {
					case "pluginState.appendJournal": return registerPluginStateSequencedJournalEntryInDatabase(store, command.input);
					case "pluginState.observe": return observePluginStateEntry(store, command.input, captureOpenClawStateDatabaseReadAdmission(store.path).identity.key);
					case "pluginState.compareUpdate":
					case "pluginState.compareDelete": return compareAndApplyPluginStateEntry(store, command.input, captureOpenClawStateDatabaseReadAdmission(store.path).identity.key);
					case "pluginState.moveEntries": return movePluginStateEntries(store, command.input);
					case "pluginState.register": return registerPluginStateEntry(store, command.input);
					case "pluginState.registerIfAbsent": return registerPluginStateEntryIfAbsent(store, command.input);
					case "pluginState.deleteIfEqual": return deletePluginStateEntryIfEqual(store, command.input);
					case "pluginState.consume": return consumePluginStateEntry(store, command.input);
					case "pluginState.delete": return deletePluginStateEntry(store.db, command.input) > 0;
					case "pluginState.clear": return clearPluginStateNamespace(store.db, command.input);
					case "pluginState.sweep": return deleteExpiredPluginStateEntries(store.db, Date.now());
					default: throw new Error("Plugin-state read command entered its write path");
				}
			})();
			requestSqliteWorkerOperationAdmission({
				stage: "commit",
				facts: void 0
			});
			return result;
		}, {
			...options,
			database
		}));
	} catch (error) {
		return failure(error);
	}
}
//#endregion
export { executePluginStateCommand };
