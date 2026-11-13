import { t as exitCliAfterOutput } from "./one-shot-exit-BzmTIPQe.mjs";
import { t as formatCliCommand } from "./command-format-Cte1SWM4.mjs";
import { a as isConfigReadFailure, t as configFailureHeading } from "./io.invalid-config-DkKUeCUl.mjs";
import { r as isPluginPackagingRuntimeOutputInvalidConfigSnapshot } from "./recovery-policy-D5E-mA-L.mjs";
import { c as readConfigFileSnapshot, u as readConfigFileSnapshotForWrite } from "./io.runtime-BOdk1dW9.mjs";
import "./config-D1R2igem.mjs";
import { r as isJsonOutputModeActive } from "./json-output-mode-VgNFmvRv.mjs";
import { r as buildPluginCompatibilitySnapshotNotices } from "./status-PvKw4Ldm.mjs";
import { t as formatPluginCompatibilityNotice } from "./status-compatibility-DdQ1VWdc.mjs";
import { n as formatPluginPackagingRuntimeOutputRecoveryHint } from "./config-recovery-hints-BpoTGCnY.mjs";
import { t as renderConfigValidationIssueLines } from "./issue-location-C1gyv_-R.mjs";
//#region src/commands/config-validation.ts
/** Read the config file and exit through the runtime when validation fails. */
async function requireValidConfigFileSnapshot(runtime, opts) {
	const readOptions = {
		...opts?.observe === false ? { observe: false } : {},
		...opts?.skipPluginValidation ? { skipPluginValidation: true } : {}
	};
	return validateConfigFileSnapshot(opts?.adoptPluginMetadata ? (await (await import("./command-config-snapshot-DLjtzCOy.mjs")).readCommandConfigSnapshot(readOptions)).snapshot : await readConfigFileSnapshot(Object.keys(readOptions).length > 0 ? readOptions : void 0), runtime, opts?.includeCompatibilityAdvisory);
}
/** Preserve native read-time ownership through commands that can write after awaits. */
async function requireValidConfigForWrite(runtime) {
	const read = await readConfigFileSnapshotForWrite();
	if (!await validateConfigFileSnapshot(read.snapshot, runtime)) return null;
	return read;
}
/** Each command phase owns prepared facts; installation ends the preceding metadata scope. */
async function withCommandPluginMetadata(params, run) {
	const [{ completePluginMetadataSnapshot, resolvePluginMetadataSnapshot }, { withPluginMetadataSnapshotScope }] = await Promise.all([import("./plugin-metadata-snapshot-6zGx-_Dj.mjs"), import("./current-plugin-metadata-snapshot-BHpxCDkw.mjs")]);
	return await withPluginMetadataSnapshotScope(completePluginMetadataSnapshot(params) ?? resolvePluginMetadataSnapshot(params), run, {
		config: params.config,
		workspaceDir: params.workspaceDir
	});
}
async function validateConfigFileSnapshot(snapshot, runtime, includeCompatibilityAdvisory = false) {
	if (snapshot.exists && !snapshot.valid) {
		if (isJsonOutputModeActive(process.argv)) {
			const { writeInvalidConfigCliJson } = await import("./config-validation-output-BN88TWA8.mjs");
			writeInvalidConfigCliJson(runtime, snapshot);
			exitCliAfterOutput(runtime, 1);
		}
		const issues = snapshot.issues.length > 0 ? renderConfigValidationIssueLines(snapshot).join("\n") : "Unknown validation issue.";
		runtime.error(`${configFailureHeading(snapshot)}: ${snapshot.path}\n${issues}`);
		runtime.error(isConfigReadFailure(snapshot) ? "Resolve the read error shown above, then retry." : isPluginPackagingRuntimeOutputInvalidConfigSnapshot(snapshot) ? `Fix: ${formatPluginPackagingRuntimeOutputRecoveryHint()}` : `Fix: ${formatCliCommand("openclaw doctor --fix")}`);
		runtime.error(`Inspect: ${formatCliCommand("openclaw config validate")}`);
		runtime.exit(1);
		return null;
	}
	if (!includeCompatibilityAdvisory) return snapshot;
	const compatibility = buildPluginCompatibilitySnapshotNotices({ config: snapshot.config });
	if (compatibility.length > 0) runtime.log([
		`Plugin compatibility: ${compatibility.length} notice${compatibility.length === 1 ? "" : "s"}.`,
		...compatibility.slice(0, 3).map((notice) => `- ${formatPluginCompatibilityNotice(notice)}`),
		...compatibility.length > 3 ? [`- ... +${compatibility.length - 3} more`] : [],
		`Review: ${formatCliCommand("openclaw doctor")}`
	].join("\n"));
	return snapshot;
}
/** Read and return a valid OpenClaw config, or null after reporting validation errors. */
async function requireValidConfig(runtime, opts) {
	return (await requireValidConfigFileSnapshot(runtime, opts))?.config ?? null;
}
//#endregion
export { withCommandPluginMetadata as i, requireValidConfigFileSnapshot as n, requireValidConfigForWrite as r, requireValidConfig as t };
