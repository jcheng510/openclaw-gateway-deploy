import { a as measureGatewayBootstrapStep } from "./startup-trace-fue7GRYn.mjs";
import { s as resolveOpenClawStateSqlitePath } from "./openclaw-state-db.paths-rJI64Ab5.mjs";
import { a as rethrowGatewayStartupError, t as GatewayStartupCleanupError } from "./server-shutdown-9EoJvj9Y.mjs";
import { t as truncateCloseReason } from "./close-reason-B67wSC7I.mjs";
//#region src/gateway/server.ts
/**
* Lazy public entrypoint for the gateway server implementation.
*
* Keeping `server-start` behind dynamic import lets light-weight callers import
* server types and helpers without paying the full startup dependency graph.
*/
async function loadServerStart() {
	return await measureGatewayBootstrapStep("gateway.server-start-import", () => import("./server-start-BkBmUb8t.mjs"));
}
/** Starts the gateway server after lazily loading the full server implementation. */
async function startGatewayServer(port = 18789, opts = {}) {
	const { acquireGatewayLock } = await import("./gateway-lock-B1APoK4k.mjs");
	const ownedLock = opts.gatewayStateOwner ? null : await acquireGatewayLock({
		port,
		listenerMode: "foreground"
	});
	const gatewayStateOwner = opts.gatewayStateOwner ?? ownedLock ?? void 0;
	try {
		gatewayStateOwner?.assertDatabaseAccess(resolveOpenClawStateSqlitePath());
		const server = await startGatewayServerWithRuntime(port, {
			...opts,
			gatewayStateOwner
		});
		return {
			...server,
			close: async (closeOptions) => {
				await server.close(closeOptions);
				await ownedLock?.release();
			}
		};
	} catch (error) {
		if (!(error instanceof GatewayStartupCleanupError)) await ownedLock?.release();
		throw error;
	}
}
async function startGatewayServerWithRuntime(port, opts) {
	const startupStartedAt = opts.startupStartedAt ?? Date.now();
	let stopDatabaseAdmission;
	const start = async () => {
		const { createSqliteReadOnlyWorkerScope } = await import("./sqlite-readonly-worker-ChyOPBgv.mjs");
		const readOnlyWorkers = createSqliteReadOnlyWorkerScope();
		const { withAgentDatabaseStartupAdmission } = await import("./agent-database-startup-iHhy9BW4.mjs");
		try {
			const server = await readOnlyWorkers.run(() => withAgentDatabaseStartupAdmission(async (admission) => {
				stopDatabaseAdmission = () => admission.stop();
				const mod = await loadServerStart();
				opts.gatewayStateOwner?.assertDatabaseAccess(resolveOpenClawStateSqlitePath());
				return mod.startGatewayServerCore(port, {
					...opts,
					startupStartedAt
				});
			}));
			return {
				...server,
				close: (closeOptions) => readOnlyWorkers.run(async () => {
					try {
						await server.close(closeOptions);
					} finally {
						await readOnlyWorkers.close();
					}
				})
			};
		} catch (error) {
			return await rethrowGatewayStartupError(error, () => readOnlyWorkers.close());
		}
	};
	if (process.platform !== "linux" || process.versions.bun) return await start();
	const { startGatewaySpawnBroker, runWithSpawnBroker } = await import("./context-StZ0KlVn.mjs");
	let logger;
	const broker = await startGatewaySpawnBroker({
		onReady(pid, restarted) {
			if (restarted) logger?.info(`spawn broker restarted pid=${pid}`);
		},
		async onStartupFailure(message) {
			const { createSubsystemLogger } = await import("./subsystem-BlKVVsFx.mjs");
			createSubsystemLogger("gateway").error(message);
		}
	});
	if (!broker) return await start();
	const closeBroker = async () => {
		await stopDatabaseAdmission?.();
		await broker.close();
	};
	try {
		const { createSubsystemLogger } = await import("./subsystem-BlKVVsFx.mjs");
		logger = createSubsystemLogger("gateway");
		logger.info(`spawn broker ready pid=${broker.pid}`);
		const server = await runWithSpawnBroker(broker, start);
		return {
			...server,
			close: (closeOptions) => runWithSpawnBroker(broker, async () => {
				try {
					await server.close(closeOptions);
				} finally {
					await closeBroker();
				}
			})
		};
	} catch (error) {
		return await rethrowGatewayStartupError(error, closeBroker);
	}
}
//#endregion
export { startGatewayServer, truncateCloseReason };
