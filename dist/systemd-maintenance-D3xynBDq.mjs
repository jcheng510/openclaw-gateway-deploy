import { r as hasCommandProcessCleanupError } from "./exec-result-C1iGiwu0.mjs";
import { a as getGatewayServiceUpdateNativeCommand, l as withGatewayServiceUpdateAuthority, n as GatewayServiceAuthorityError } from "./service-update-authority-CVLjmQiA.mjs";
import { n as GATEWAY_SERVICE_STOP_TIMEOUT_MS } from "./gateway-shutdown-budget-v-vGFkEN.mjs";
import { c as assertServiceDefinitionWritable, p as resolveManagedGatewayServiceCommand } from "./service-layout-BP96VEeH.mjs";
import { t as parseKeyValueOutput } from "./runtime-parse-B34Z1eD8.mjs";
import { G as reloadSystemdUserManager, P as execSystemctlUser, _ as refreshSystemdUnitPolicy, c as resolveSystemdUnitPath, g as preserveSystemdUnitPolicy, s as resolveSystemdServiceName, w as parseSystemdTimeSpanMs } from "./systemd-service-files-CS2rOHBM.mjs";
import { t as withGatewayServiceOperationLock } from "./service-operation-lock-CVHxlxU5.mjs";
import { n as assertNoSystemGatewayOwnership } from "./systemd-scope-Caua70eo.mjs";
import { n as withSystemdDefinitionMutation } from "./systemd-definition-mutation-DjoWtanv.mjs";
import { n as auditGatewayServiceConfig } from "./service-audit-D0WZN4KF.mjs";
import { t as reconcileGatewayServiceDefinition } from "./service-reconciliation-CKsHElkZ.mjs";
//#region src/daemon/systemd-maintenance.ts
/** Read the effective native policy; absence is a diagnostic, not a stop refusal. */
async function readSystemdGatewayStopTimeout(state) {
	const unit = `${resolveSystemdServiceName(state.env)}.service`;
	const result = await execSystemctlUser(state.env, [
		"show",
		unit,
		"--no-page",
		"--property",
		"LoadState,TimeoutStopUSec"
	], 1e4);
	const properties = parseKeyValueOutput(result.stdout, "=");
	const timeout = parseSystemdTimeSpanMs(properties.timeoutstopusec ?? "");
	return result.code === 0 && properties.loadstate === "loaded" && timeout !== void 0 ? timeout === 0 ? Infinity : timeout : void 0;
}
/** Refresh policy without activation: an ordinary install would stop under the old budget. */
async function prepareSystemdGatewayMaintenance(params) {
	const { state, assertCurrent } = params;
	let inspectEffective = true;
	try {
		assertCurrent();
		const timeout = params.stopping ? await readSystemdGatewayStopTimeout(state) : Infinity;
		assertCurrent();
		const audit = await auditGatewayServiceConfig({
			env: state.env,
			command: state.command
		});
		assertCurrent();
		if (!audit.definitionDrift?.some((fact) => fact.kind === "outdated") && (timeout ?? 0) >= 33e4) return false;
		const command = resolveManagedGatewayServiceCommand(state.command);
		if (!command) {
			params.warn("The installed definition is unavailable for a managed refresh.");
			return false;
		}
		assertServiceDefinitionWritable(state.definitionMutationCapability ?? {
			kind: "unknown",
			reason: "inspection-failed"
		});
		await withGatewayServiceOperationLock(state.env, async (assertNative) => withGatewayServiceUpdateAuthority(assertCurrent, async () => {
			await reconcileGatewayServiceDefinition({
				env: state.env,
				root: params.root,
				command: state.command,
				expectedCommand: command,
				warn: params.warn,
				install: async (definitionTransaction) => {
					await withSystemdDefinitionMutation(state.env, command.environment ?? state.env, async (mutation) => {
						const unitPath = resolveSystemdUnitPath(state.env);
						const previous = mutation.snapshots.get(unitPath);
						if (!previous) throw new Error("The managed unit disappeared before its policy refresh.");
						await assertNoSystemGatewayOwnership(state.env);
						await mutation.publish(unitPath, preserveSystemdUnitPolicy(refreshSystemdUnitPolicy(previous.contents.toString("utf8")), previous.contents.toString("utf8"), definitionTransaction.preservePolicy), previous.mode);
						await definitionTransaction.beforeWrite();
						await assertNoSystemGatewayOwnership(state.env);
						await reloadSystemdUserManager(state.env, void 0, definitionTransaction.assertCurrent);
						await definitionTransaction.beforeWrite();
					}, { definitionTransaction });
				}
			});
		}, {
			updateOwned: false,
			assertRecoveryCurrent: assertNative,
			nativeCommand: getGatewayServiceUpdateNativeCommand()
		}));
		return true;
	} catch (error) {
		if (hasCommandProcessCleanupError(error) || error instanceof GatewayServiceAuthorityError) {
			inspectEffective = false;
			throw error;
		}
		assertCurrent();
		params.warn(`Gateway service policy refresh skipped: ${String(error)}`);
		return false;
	} finally {
		if (!params.stopping && inspectEffective) {
			assertCurrent();
			try {
				const effective = await readSystemdGatewayStopTimeout(state);
				assertCurrent();
				if ((effective ?? 0) < 33e4) params.warn(`Gateway effective service stop timeout is ${effective === void 0 ? "unverified" : `${effective}ms`}; ${GATEWAY_SERVICE_STOP_TIMEOUT_MS / 1e3}s or longer is required. Preserving operator overrides; the Gateway was not stopped.`);
			} catch (error) {
				assertCurrent();
				params.warn(`Gateway effective service stop timeout could not be verified: ${String(error)}`);
			}
		}
	}
}
//#endregion
export { readSystemdGatewayStopTimeout as n, prepareSystemdGatewayMaintenance as t };
