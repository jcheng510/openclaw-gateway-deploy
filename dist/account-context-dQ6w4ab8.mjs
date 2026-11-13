import { r as asNullableRecord } from "./record-coerce-TIsquoVR.mjs";
import { t as asBoolean } from "./boolean-cOv0ta_w.mjs";
import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { n as resolveChannelAccount } from "./account-resolution-DCHDXWZ0.mjs";
import { r as hasConfiguredUnavailableCredentialStatus } from "./account-snapshot-fields-DFo0tplW.mjs";
import { a as resolveChannelAccountConfigured, o as resolveChannelAccountEnabled } from "./account-summary-B_USoWFL.mjs";
import { t as inspectChannelAccount } from "./account-inspection-C7g92eSF.mjs";
//#region src/gateway/health/account-context.ts
const PUBLIC_IMESSAGE_FULL_DISK_ACCESS_ERROR = "imsg cannot access ~/Library/Messages/chat.db. Grant Full Disk Access to the Gateway/launcher process and restart Gateway.";
const redactIMessageProbeErrorMessage = (message) => {
	const trimmed = message.trim();
	if (!trimmed) return "";
	return trimmed.replaceAll(/\/Users\/[^/\s]+\/Library\/Messages\/chat\.db/g, "~/Library/Messages/chat.db");
};
function buildNonSensitiveProbeFailure(channelId, probe) {
	const record = asNullableRecord(probe);
	if (channelId !== "imessage" || !record || record.ok !== false) return;
	if (typeof record.error !== "string") return;
	const error = redactIMessageProbeErrorMessage(record.error);
	if (!/\bimsg\b/i.test(error) || !error.includes("~/Library/Messages/chat.db") || !/\bFull Disk Access\b/i.test(error)) return;
	return {
		ok: false,
		error: PUBLIC_IMESSAGE_FULL_DISK_ACCESS_ERROR
	};
}
function resolveProbeAccountEnabled(params) {
	const fallback = asBoolean(asNullableRecord(params.account)?.enabled) ?? true;
	try {
		return resolveChannelAccountEnabled({
			plugin: params.plugin,
			account: params.account,
			cfg: params.cfg
		});
	} catch (error) {
		params.diagnostics.push(`${params.plugin.id}:${params.accountId}: failed to evaluate enabled state (${formatErrorMessage(error)}).`);
		return fallback;
	}
}
async function resolveProbeAccountConfigured(params) {
	const fallback = asBoolean(asNullableRecord(params.account)?.configured) ?? true;
	try {
		return await resolveChannelAccountConfigured({
			plugin: params.plugin,
			account: params.account,
			cfg: params.cfg,
			readAccountConfiguredField: true
		});
	} catch (error) {
		params.diagnostics.push(`${params.plugin.id}:${params.accountId}: failed to evaluate configured state (${formatErrorMessage(error)}).`);
		return fallback;
	}
}
async function resolveHealthAccountContext(params) {
	const diagnostics = [];
	let inspectedAccount;
	try {
		inspectedAccount = await inspectChannelAccount(params);
	} catch (error) {
		diagnostics.push(`${params.plugin.id}:${params.accountId}: failed to inspect account (${formatErrorMessage(error)}).`);
	}
	const inspected = asNullableRecord(inspectedAccount);
	const inspectedEnabled = asBoolean(inspected?.enabled);
	const inspectedConfigured = asBoolean(inspected?.configured);
	let account;
	if (inspectedEnabled !== false && !hasConfiguredUnavailableCredentialStatus(inspectedAccount)) try {
		account = await resolveChannelAccount(params);
	} catch (error) {
		diagnostics.push(`${params.plugin.id}:${params.accountId}: failed to resolve account (${formatErrorMessage(error)}).`);
	}
	if (account === null || account === void 0) return {
		probeAccount: void 0,
		inspectedAccount,
		enabled: inspectedEnabled ?? false,
		configured: inspectedConfigured,
		diagnostics
	};
	const enabled = resolveProbeAccountEnabled({
		plugin: params.plugin,
		cfg: params.cfg,
		accountId: params.accountId,
		account,
		diagnostics
	});
	const configured = await resolveProbeAccountConfigured({
		plugin: params.plugin,
		cfg: params.cfg,
		accountId: params.accountId,
		account,
		diagnostics
	});
	return {
		probeAccount: account,
		inspectedAccount,
		enabled,
		configured,
		diagnostics
	};
}
//#endregion
export { resolveHealthAccountContext as n, buildNonSensitiveProbeFailure as t };
