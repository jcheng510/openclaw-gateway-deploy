import { f as toStructuredErrorObject } from "./error-coercion-1P2One0X.mjs";
import { t as createSubsystemLogger } from "./subsystem-CeqVSEVi.mjs";
import { s as resolveOpenClawStateSqlitePath } from "./openclaw-state-db.paths-rJI64Ab5.mjs";
import { n as runtimeProcessEntrypoints } from "./runtime-process-entrypoints-CbWx0yUe.mjs";
import { r as resolveRuntimeWorkerUrl } from "./runtime-worker-url-S0NIVxUR.mjs";
import { g as recordOpenClawStateDatabaseOpenFailure, l as confirmOpenClawStateDatabaseIntegrity } from "./openclaw-state-db-cache-IAib4pqp.mjs";
import { c as recordOpenClawDatabaseQuarantine } from "./openclaw-quarantine-store-kMr7ESBr.mjs";
import "./openclaw-state-db-DM-mSY0m.mjs";
import { o as closeOpenClawAgentDatabaseByPathAsync } from "./openclaw-agent-db-lifecycle-CCXA1nI8.mjs";
import { i as confirmOpenClawAgentDatabaseIntegrity, l as recordOpenClawAgentDatabaseOpenFailure } from "./openclaw-agent-db-CZUYuo7P.mjs";
import { a as listOpenClawRegisteredAgentDatabases } from "./openclaw-agent-db-registry-listing-DKcT5BJS.mjs";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { fork } from "node:child_process";
//#region src/state/openclaw-database-verify.impl.ts
const log = createSubsystemLogger("state/database-verify");
const DATABASE_VERIFY_CHILD_ARG = "--openclaw-database-verify-child";
function isVerifyResult(value) {
	if (!value || typeof value !== "object" || Array.isArray(value)) return false;
	const result = value;
	return typeof result.path === "string" && typeof result.ok === "boolean" && (result.error === void 0 || typeof result.error === "string") && (result.terminal === void 0 || typeof result.terminal === "boolean");
}
const workerLifecycles = /* @__PURE__ */ new WeakMap();
function ownDatabaseVerifyWorker(worker) {
	let terminationRequested = false;
	const lifecycle = {
		settled: new Promise((resolve) => {
			let exit;
			let disconnected = !worker.connected;
			const finish = () => {
				if (!exit || !disconnected) return;
				worker.off("exit", onExit);
				worker.off("disconnect", onDisconnect);
				worker.off("close", onClose);
				resolve(exit);
			};
			const onExit = (code, signal) => {
				exit = {
					code,
					signal
				};
				finish();
			};
			const onDisconnect = () => {
				disconnected = true;
				finish();
			};
			const onClose = (code, signal) => {
				if (worker.pid === void 0) {
					exit = {
						code,
						signal
					};
					disconnected = true;
					finish();
				}
			};
			worker.once("exit", onExit);
			worker.once("disconnect", onDisconnect);
			worker.once("close", onClose);
		}),
		requestTermination: () => {
			if (terminationRequested || worker.pid === void 0 || worker.exitCode !== null || worker.signalCode !== null) return;
			terminationRequested = true;
			let signalError;
			const onSignalError = (error) => {
				signalError = error;
			};
			worker.on("error", onSignalError);
			try {
				if (worker.kill()) return;
			} catch (error) {
				signalError = toStructuredErrorObject(error);
			} finally {
				worker.off("error", onSignalError);
			}
			log.error("database verification worker termination failed; waiting for native exit", {
				pid: worker.pid,
				error: signalError?.message ?? "signal was not delivered"
			});
		}
	};
	workerLifecycles.set(worker, lifecycle);
	return lifecycle;
}
function runDatabaseVerifyWorker(targets, options = {}) {
	const workerUrl = options.workerUrl ?? resolveRuntimeWorkerUrl(runtimeProcessEntrypoints.databaseVerify);
	const execArgv = workerUrl.pathname.endsWith(".ts") ? ["--import", "tsx"] : void 0;
	let worker;
	try {
		worker = fork(fileURLToPath(workerUrl), [DATABASE_VERIFY_CHILD_ARG], {
			execArgv,
			stdio: [
				"ignore",
				"ignore",
				"ignore",
				"ipc"
			]
		});
	} catch (error) {
		return Promise.reject(toStructuredErrorObject(error));
	}
	const lifecycle = ownDatabaseVerifyWorker(worker);
	let result;
	let failure;
	let settled = false;
	const fail = (error) => {
		if (settled) return;
		failure ??= toStructuredErrorObject(error);
		lifecycle.requestTermination();
	};
	const onMessage = (message) => {
		if (!Array.isArray(message) || !message.every(isVerifyResult)) {
			fail(/* @__PURE__ */ new Error("database verification worker returned invalid results"));
			return;
		}
		result = message;
	};
	worker.once("message", onMessage);
	worker.on("error", fail);
	const completion = lifecycle.settled.then((exit) => {
		settled = true;
		worker.off("message", onMessage);
		worker.off("error", fail);
		options.onWorker?.(void 0);
		if (failure) throw failure;
		if (exit.code !== 0) throw new Error(`database verification worker exited with ${exit.signal ? `signal ${exit.signal}` : `code ${exit.code}`}`);
		if (!result) throw new Error("database verification worker exited without results");
		return result;
	});
	options.onWorker?.(worker);
	if (worker.pid !== void 0) try {
		worker.send(targets, (error) => {
			if (error) fail(error);
		});
	} catch (error) {
		fail(error);
	}
	return completion;
}
async function terminateDatabaseVerifyWorker(worker) {
	const lifecycle = workerLifecycles.get(worker);
	if (!lifecycle) throw new Error("database verification worker is not owned by this verifier");
	lifecycle.requestTermination();
	await lifecycle.settled;
}
/** Resolve the state database and current registered agent database paths. */
function collectOpenClawDatabaseVerifyTargets(options) {
	const targets = /* @__PURE__ */ new Map();
	const statePath = path.resolve(resolveOpenClawStateSqlitePath(options.env));
	if (existsSync(statePath)) targets.set(statePath, {
		kind: "state",
		label: "OpenClaw state database",
		path: statePath
	});
	let registeredDatabases = [];
	try {
		registeredDatabases = listOpenClawRegisteredAgentDatabases({ env: options.env });
	} catch (error) {
		log.warn("failed to collect registered agent databases for integrity verification", { error: String(error) });
	}
	for (const registered of registeredDatabases) {
		const agentPath = path.resolve(registered.path);
		if (!existsSync(agentPath) || targets.has(agentPath)) continue;
		targets.set(agentPath, {
			kind: "agent",
			label: `OpenClaw agent database ${registered.agentId}`,
			path: agentPath
		});
	}
	return [...targets.values()];
}
/** Reconfirm worker failures on live owners before quarantine and latching. */
async function applyOpenClawDatabaseVerificationResults(options) {
	const targetByPath = new Map(options.targets.map((target) => [target.path, target]));
	for (const result of options.results) {
		const target = targetByPath.get(result.path);
		if (!target) continue;
		const details = {
			kind: target.kind,
			label: target.label,
			path: result.path
		};
		if (result.ok) {
			log.info("database integrity verification passed", details);
			continue;
		}
		if (!result.terminal) {
			log.warn("database integrity verification was inconclusive", {
				...details,
				error: result.error
			});
			continue;
		}
		const confirmation = await (target.kind === "state" ? confirmOpenClawStateDatabaseIntegrity : confirmOpenClawAgentDatabaseIntegrity)(result.path);
		if (confirmation.status === "healthy") {
			log.info("discarding stale database integrity verification result", details);
			continue;
		}
		if (!confirmation.terminal) {
			log.warn("database integrity verification was inconclusive", {
				...details,
				error: confirmation.error.message
			});
			continue;
		}
		if (!(target.kind === "state" ? recordOpenClawStateDatabaseOpenFailure : recordOpenClawAgentDatabaseOpenFailure)(result.path, confirmation.error, confirmation.generation)) {
			log.info("discarding database integrity result after database generation changed", details);
			continue;
		}
		if (target.kind === "agent") await closeOpenClawAgentDatabaseByPathAsync(result.path);
		if (!recordOpenClawDatabaseQuarantine({
			env: options.env,
			generation: confirmation.generation,
			kind: target.kind,
			path: result.path,
			reason: confirmation.error.message
		})) log.error("failed to persist database quarantine; quarantine is process-local", {
			kind: target.kind,
			path: result.path
		});
		log.error("database integrity verification failed", {
			...details,
			error: confirmation.error.message
		});
	}
}
//#endregion
export { applyOpenClawDatabaseVerificationResults, collectOpenClawDatabaseVerifyTargets, runDatabaseVerifyWorker, terminateDatabaseVerifyWorker };
