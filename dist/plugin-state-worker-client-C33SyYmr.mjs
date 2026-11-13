import { s as resolveOpenClawStateSqlitePath } from "./openclaw-state-db.paths-rJI64Ab5.mjs";
import { n as ok, t as err } from "./result-BQGgYouL.mjs";
import { r as captureOpenClawStateWorkerContext } from "./openclaw-state-worker-context-C_iAE7YK.mjs";
import { a as wrapPluginStateError, n as restorePluginStateWorkerFailure } from "./plugin-state-worker-errors-CjFwoNaT.mjs";
import { n as pluginStateWorkerOperations } from "./plugin-state-worker-contract-jJNqV2rs.mjs";
//#region src/plugin-state/plugin-state-worker-client.ts
async function execute({ env, assertActive }, command, missing, checks = {}) {
	const { assertCurrent, isObservation } = checks;
	const assertAdmission = assertCurrent ? () => {
		assertActive?.();
		assertCurrent();
	} : assertActive;
	assertAdmission?.();
	const databasePath = resolveOpenClawStateSqlitePath(env ?? process.env);
	const description = pluginStateWorkerOperations[command.type];
	let dispatched = false;
	try {
		const context = captureOpenClawStateWorkerContext({
			path: databasePath,
			env
		});
		const [{ runOpenClawStateWorkerOperation }, { createSqliteWorkerWriteAdmission }] = await Promise.all([import("./openclaw-state-worker-store-Bp_XCEWM.mjs"), import("./sqlite-worker-store-B3q06gbG.mjs")]);
		const operation = async (scope) => {
			dispatched = true;
			const result = await scope.execute(command);
			if (!result.ok) throw restorePluginStateWorkerFailure(result.error);
			return result.value;
		};
		if (missing) {
			const result = await runOpenClawStateWorkerOperation(context, operation, {
				existingOnly: true,
				assertCurrent: assertAdmission
			});
			assertActive?.();
			return result === void 0 ? missing() : result;
		}
		const result = await runOpenClawStateWorkerOperation(context, operation, {
			assertCurrent: assertAdmission,
			createAdmission: createSqliteWorkerWriteAdmission(() => {
				context.admission.assertCurrent();
				assertAdmission?.();
			}, [databasePath])
		});
		if (isObservation?.(result)) assertAdmission?.();
		return result;
	} catch (error) {
		throw wrapPluginStateError(error, description.operation, dispatched ? description.code : "PLUGIN_STATE_OPEN_FAILED", dispatched ? description.message : "Failed to open the plugin state database.", databasePath);
	}
}
function registerPluginStateInWorker(params) {
	const { env, assertActive, assertCurrent, ...input } = params;
	return execute({
		env,
		assertActive
	}, {
		type: "pluginState.register",
		input
	}, void 0, { assertCurrent });
}
function observePluginStateInWorker(params) {
	const { env, assertActive, ...input } = params;
	return execute({
		env,
		assertActive
	}, {
		type: "pluginState.observe",
		input
	}, void 0, { isObservation: () => true });
}
function comparePluginStateUpdateInWorker(params) {
	const { env, assertActive, ...input } = params;
	return execute({
		env,
		assertActive
	}, {
		type: "pluginState.compareUpdate",
		input
	}, void 0, { isObservation: (result) => result.status === "conflict" });
}
function comparePluginStateDeleteInWorker(params) {
	const { env, assertActive, ...input } = params;
	return execute({
		env,
		assertActive
	}, {
		type: "pluginState.compareDelete",
		input
	}, void 0, { isObservation: (result) => result.status === "conflict" });
}
function registerPluginStateIfAbsentInWorker(params) {
	const { env, assertActive, ...input } = params;
	return execute({
		env,
		assertActive
	}, {
		type: "pluginState.registerIfAbsent",
		input
	});
}
function deletePluginStateIfEqualInWorker(params) {
	const { env, assertActive, ...input } = params;
	return execute({
		env,
		assertActive
	}, {
		type: "pluginState.deleteIfEqual",
		input
	});
}
function lookupPluginStateInWorker(params) {
	const { env, assertActive, ...input } = params;
	return execute({
		env,
		assertActive
	}, {
		type: "pluginState.lookup",
		input
	}, () => void 0);
}
async function lookupManyPluginStateInWorker(params) {
	const { env, assertActive, ...input } = params;
	params.assertActive?.();
	if (input.keys.length === 0) return [];
	return (await execute({
		env,
		assertActive
	}, {
		type: "pluginState.lookupMany",
		input
	}, () => input.keys.map(() => ok(void 0)))).map((result) => result.ok ? result : err(restorePluginStateWorkerFailure(result.error)));
}
function consumePluginStateInWorker(params) {
	const { env, assertActive, ...input } = params;
	return execute({
		env,
		assertActive
	}, {
		type: "pluginState.consume",
		input
	});
}
function deletePluginStateInWorker(params) {
	const { env, assertActive, assertCurrent, ...input } = params;
	return execute({
		env,
		assertActive
	}, {
		type: "pluginState.delete",
		input
	}, void 0, { assertCurrent });
}
function listPluginStateInWorker(params) {
	const { env, assertActive, ...input } = params;
	return execute({
		env,
		assertActive
	}, {
		type: "pluginState.entries",
		input
	}, () => []);
}
function clearPluginStateInWorker(params) {
	const { env, assertActive, ...input } = params;
	return execute({
		env,
		assertActive
	}, {
		type: "pluginState.clear",
		input
	});
}
function sweepExpiredPluginStateEntriesInWorker(params = {}) {
	return execute(params, {
		type: "pluginState.sweep",
		input: void 0
	});
}
function countPluginStateInWorker(params) {
	const { env, assertActive, ...input } = params;
	return execute({
		env,
		assertActive
	}, {
		type: "pluginState.count",
		input
	}, () => 0);
}
function registerPluginStateJournalInWorker(params) {
	const { env, assertActive, ...input } = params;
	return execute({
		env,
		assertActive
	}, {
		type: "pluginState.appendJournal",
		input
	});
}
function listPluginStateInKeyRangeInWorker(params) {
	const { env, assertActive, ...input } = params;
	return execute({
		env,
		assertActive
	}, {
		type: "pluginState.entriesInKeyRange",
		input
	}, () => []);
}
function movePluginStateEntriesInWorker(params) {
	const { env, assertActive, ...input } = params;
	return execute({
		env,
		assertActive
	}, {
		type: "pluginState.moveEntries",
		input
	});
}
//#endregion
export { sweepExpiredPluginStateEntriesInWorker as _, countPluginStateInWorker as a, listPluginStateInKeyRangeInWorker as c, lookupPluginStateInWorker as d, movePluginStateEntriesInWorker as f, registerPluginStateJournalInWorker as g, registerPluginStateInWorker as h, consumePluginStateInWorker as i, listPluginStateInWorker as l, registerPluginStateIfAbsentInWorker as m, comparePluginStateDeleteInWorker as n, deletePluginStateIfEqualInWorker as o, observePluginStateInWorker as p, comparePluginStateUpdateInWorker as r, deletePluginStateInWorker as s, clearPluginStateInWorker as t, lookupManyPluginStateInWorker as u };
