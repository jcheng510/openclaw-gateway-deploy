import { o as resolveUserPath } from "./home-dir-CjKH62jd.mjs";
import { t as createLazyImportLoader } from "./lazy-promise-DGqyc4Y4.mjs";
import "./utils-DUAwk2p5.mjs";
import { l as emitTrustedSecurityEvent } from "./diagnostic-events-4jYHJPUA.mjs";
import { t as PLUGIN_INSTALL_ERROR_CODE } from "./install-types-auyGAGw8.mjs";
import { i as resolvePackageExtensionEntries } from "./package-manifest-MF4xNi-g.mjs";
import "./manifest-BocQ5UD3.mjs";
import { n as satisfiesPluginApiRange, t as resolvePackagePluginApiRange } from "./package-compat-qQaLgNbY.mjs";
import { a as resolveDefaultPluginExtensionsDir } from "./install-paths-BylxcuP5.mjs";
import { a as resolvePackageDirInstallTransaction, i as requestDeferredPackageDirInstall } from "./install-package-dir-B3XJuWfa.mjs";
import path from "node:path";
//#region src/plugins/install-transaction.ts
const PLUGIN_INSTALL_TRANSACTION = Symbol.for("openclaw.pluginInstallTransaction");
const PLUGIN_INSTALL_TRANSACTION_REQUEST = Symbol.for("openclaw.pluginInstallTransactionRequest");
const PLUGIN_INSTALL_OWNER_MIGRATIONS = Symbol.for("openclaw.pluginInstallOwnerMigrations");
const settlements = /* @__PURE__ */ new WeakMap();
function attachPluginInstallTransaction(result, transaction) {
	Object.defineProperty(result, PLUGIN_INSTALL_TRANSACTION, {
		configurable: true,
		enumerable: true,
		value: transaction
	});
	return result;
}
function resolvePluginInstallTransaction(result) {
	return result[PLUGIN_INSTALL_TRANSACTION];
}
function takePluginInstallTransaction(result) {
	const transaction = resolvePluginInstallTransaction(result);
	Reflect.deleteProperty(result, PLUGIN_INSTALL_TRANSACTION);
	return transaction;
}
function requestDeferredPluginInstall(params, transactionSink, assertOwned) {
	Object.defineProperty(params, PLUGIN_INSTALL_TRANSACTION_REQUEST, {
		configurable: false,
		enumerable: true,
		value: {
			deferCommit: true,
			...transactionSink ? { transactionSink } : {},
			...assertOwned ? { assertOwned } : {}
		}
	});
	return params;
}
function copyPluginInstallTransactionRequest(source, target) {
	const request = resolvePluginInstallTransactionRequest(source);
	return request ? requestDeferredPluginInstall(target, request.transactionSink, request.assertOwned) : target;
}
function resolvePluginInstallTransactionRequest(params) {
	return params[PLUGIN_INSTALL_TRANSACTION_REQUEST];
}
/** Keep direct and deferred installs bound to the owner that admitted them. */
async function withPluginInstallTransactions(params, assertOwned, run) {
	const request = resolvePluginInstallTransactionRequest(params);
	const initiatingAssert = request?.assertOwned;
	const callerBeforePersistentEffect = params.beforePersistentEffect;
	const transactions = [];
	let refusal;
	const assertCurrent = () => {
		if (refusal) throw refusal.error;
		try {
			initiatingAssert?.();
			assertOwned();
		} catch (error) {
			refusal = { error };
			throw error;
		}
	};
	assertCurrent();
	const beforePersistentEffect = () => {
		try {
			assertCurrent();
			return (callerBeforePersistentEffect?.())?.then(assertCurrent, (error) => {
				refusal ??= { error };
				throw refusal.error;
			});
		} catch (error) {
			refusal ??= { error };
			throw refusal.error;
		}
	};
	const owned = requestDeferredPluginInstall({
		...params,
		beforePersistentEffect
	}, request ? request.transactionSink : transactions, assertCurrent);
	let result;
	try {
		result = await run(owned, assertCurrent);
		assertCurrent();
	} catch (error) {
		if (!request && !refusal) try {
			await settlePluginInstallTransactions(transactions, "rollback", { error });
		} catch (rollbackError) {
			if (!refusal) throw rollbackError;
		}
		throw refusal ? refusal.error : error;
	}
	if (!request) try {
		await settlePluginInstallTransactions(transactions, "commit");
	} catch (error) {
		throw refusal ? refusal.error : error;
	}
	return result;
}
function retainPluginInstallTransaction(params, result) {
	const transaction = resolvePluginInstallTransaction(result);
	if (transaction) resolvePluginInstallTransactionRequest(params)?.transactionSink?.push(transaction);
}
function attachPluginInstallOwnerMigrations(result, migrations) {
	Object.defineProperty(result, PLUGIN_INSTALL_OWNER_MIGRATIONS, {
		configurable: false,
		enumerable: true,
		value: migrations
	});
	return result;
}
function resolvePluginInstallOwnerMigrations(result) {
	return result[PLUGIN_INSTALL_OWNER_MIGRATIONS];
}
async function settlePluginInstallTransactions(transactions, action, primaryFailure) {
	const ordered = action === "rollback" ? transactions.toReversed() : transactions;
	const errors = [];
	for (const transaction of new Set(ordered)) try {
		let settlement = settlements.get(transaction);
		if (!settlement) {
			settlement = Promise.resolve().then(() => transaction[action]()).catch((error) => {
				settlements.delete(transaction);
				throw error;
			});
			settlements.set(transaction, settlement);
		}
		await settlement;
	} catch (error) {
		errors.push(error);
	}
	if (errors.length > 0) {
		const message = `Plugin install transaction ${action} failed`;
		throw primaryFailure ? new AggregateError([primaryFailure.error, ...errors], `${String(primaryFailure.error)}; ${message}`, { cause: primaryFailure.error }) : new AggregateError(errors, message);
	}
}
//#endregion
//#region src/plugins/security-events.ts
function pluginLifecycleAction(mode) {
	return mode === "update" ? "plugin.updated" : "plugin.installed";
}
function pluginAuditOutcomeForReason(reason) {
	return reason === "security_scan_failed" ? "error" : "denied";
}
function emitPluginInstallSecurityEvent(params) {
	emitTrustedSecurityEvent({
		category: "plugin",
		action: pluginLifecycleAction(params.mode),
		outcome: "success",
		severity: "medium",
		actor: { kind: "operator" },
		target: {
			kind: "plugin",
			name: params.pluginId
		},
		policy: {
			id: "plugin.install",
			decision: "allow"
		},
		control: {
			id: "plugin.install",
			family: "supply_chain"
		},
		attributes: {
			source_family: params.sourceFamily,
			mode: params.mode,
			extension_count: params.extensionCount ?? 0,
			has_version: params.hasVersion ?? false,
			trusted_official_source: params.trustedSourceLinkedOfficialInstall === true
		}
	});
}
function emitPluginAuditSecurityEvent(params) {
	emitTrustedSecurityEvent({
		category: "plugin",
		action: "plugin.audit.failed",
		outcome: params.outcome,
		severity: params.outcome === "error" ? "high" : "medium",
		actor: { kind: "operator" },
		target: {
			kind: "plugin",
			...params.pluginId ? { name: params.pluginId } : {}
		},
		policy: {
			id: "plugin.install",
			decision: "deny",
			reason: params.reason
		},
		control: {
			id: "plugin.install.audit",
			family: "supply_chain"
		},
		reason: params.reason,
		attributes: {
			...params.sourceFamily ? { source_family: params.sourceFamily } : {},
			...params.mode ? { mode: params.mode } : {}
		}
	});
}
//#endregion
//#region src/plugins/install-shared.ts
const pluginInstallRuntimeLoader = createLazyImportLoader(() => import("./install.runtime.js"));
async function loadPluginInstallRuntime() {
	return await pluginInstallRuntimeLoader.load();
}
const defaultLogger = {};
function formatUnresolvedOpenClawPeerLinkError(packageName) {
	return `Installed plugin ${packageName} declares an openclaw dependency, but OpenClaw could not create a plugin-local node_modules/openclaw link. Run from a packaged OpenClaw install or reinstall OpenClaw, then retry.`;
}
const MISSING_EXTENSIONS_ERROR = "package.json missing openclaw.extensions; update the plugin package to include openclaw.extensions (for example [\"./dist/index.js\"]). See https://docs.openclaw.ai/help/troubleshooting#plugin-install-fails-with-missing-openclaw-extensions";
function validateOpenClawPackageInstallCompatibility(params) {
	const currentHostVersion = params.runtime.resolveCompatibilityHostVersion();
	const minHostVersionCheck = params.runtime.checkMinHostVersion({
		currentVersion: currentHostVersion,
		minHostVersion: params.packageMetadata?.install?.minHostVersion
	});
	if (!minHostVersionCheck.ok) {
		if (minHostVersionCheck.kind === "invalid") return {
			ok: false,
			error: `invalid package.json openclaw.install.minHostVersion: ${minHostVersionCheck.error}`,
			code: PLUGIN_INSTALL_ERROR_CODE.INVALID_MIN_HOST_VERSION
		};
		if (minHostVersionCheck.kind === "unknown_host_version") return {
			ok: false,
			error: `plugin "${params.pluginId}" requires OpenClaw >=${minHostVersionCheck.requirement.minimumLabel}, but this host version could not be determined. Re-run from a released build or set OPENCLAW_VERSION and retry.`,
			code: PLUGIN_INSTALL_ERROR_CODE.UNKNOWN_HOST_VERSION
		};
		return {
			ok: false,
			error: `plugin "${params.pluginId}" requires OpenClaw >=${minHostVersionCheck.requirement.minimumLabel}, but this host is ${minHostVersionCheck.currentVersion}. Upgrade OpenClaw and retry.`,
			code: PLUGIN_INSTALL_ERROR_CODE.INCOMPATIBLE_HOST_VERSION
		};
	}
	const pluginApiRangeCheck = resolvePackagePluginApiRange(params.packageMetadata);
	if (!pluginApiRangeCheck.ok) return {
		ok: false,
		error: `invalid package.json openclaw.compat.pluginApi: ${pluginApiRangeCheck.error}`,
		code: PLUGIN_INSTALL_ERROR_CODE.INVALID_PLUGIN_API
	};
	const pluginApiRange = pluginApiRangeCheck.range;
	if (pluginApiRange && !satisfiesPluginApiRange(currentHostVersion, pluginApiRange)) return {
		ok: false,
		error: `plugin "${params.pluginId}" requires plugin API ${pluginApiRange}, but this OpenClaw runtime exposes ${currentHostVersion}. Upgrade OpenClaw or install a compatible plugin version and retry.`,
		code: PLUGIN_INSTALL_ERROR_CODE.INCOMPATIBLE_PLUGIN_API
	};
	return null;
}
async function readOptionalPackageManifest(params) {
	const manifestPath = path.join(params.packageDir, "package.json");
	if (!await params.runtime.fileExists(manifestPath)) return { ok: true };
	try {
		return {
			ok: true,
			manifest: await params.runtime.readJsonFile(manifestPath)
		};
	} catch (err) {
		return {
			ok: false,
			error: `invalid package.json: ${String(err)}`
		};
	}
}
function ensureOpenClawExtensions(params) {
	const resolved = resolvePackageExtensionEntries(params.manifest);
	if (resolved.status === "missing") return {
		ok: false,
		error: MISSING_EXTENSIONS_ERROR,
		code: PLUGIN_INSTALL_ERROR_CODE.MISSING_OPENCLAW_EXTENSIONS
	};
	if (resolved.status === "empty") return {
		ok: false,
		error: "package.json openclaw.extensions is empty",
		code: PLUGIN_INSTALL_ERROR_CODE.EMPTY_OPENCLAW_EXTENSIONS
	};
	if (resolved.status === "invalid") return {
		ok: false,
		error: resolved.error,
		code: PLUGIN_INSTALL_ERROR_CODE.INVALID_OPENCLAW_EXTENSIONS
	};
	return {
		ok: true,
		entries: resolved.entries
	};
}
function buildDirectoryInstallResult(params) {
	return {
		ok: true,
		pluginId: params.pluginId,
		targetDir: params.targetDir,
		manifestName: params.manifestName,
		version: params.version,
		extensions: params.extensions,
		...params.setup ? { setup: params.setup } : {}
	};
}
function emitSuccessfulPluginInstallSecurityEvent(result, params) {
	if (params.dryRun || !result.ok) return;
	emitPluginInstallSecurityEvent({
		pluginId: result.pluginId,
		mode: params.mode,
		sourceFamily: params.sourceFamily,
		extensionCount: result.extensions.length,
		hasVersion: Boolean(result.version),
		trustedSourceLinkedOfficialInstall: params.trustedSourceLinkedOfficialInstall
	});
}
function buildBlockedInstallResult(params) {
	return {
		ok: false,
		error: params.blocked.reason,
		...params.blocked.installPolicyWarning ? { installPolicyWarning: params.blocked.installPolicyWarning } : {},
		...params.blocked.code === "security_scan_failed" ? { code: PLUGIN_INSTALL_ERROR_CODE.SECURITY_SCAN_FAILED } : params.blocked.code === "security_scan_blocked" ? { code: PLUGIN_INSTALL_ERROR_CODE.SECURITY_SCAN_BLOCKED } : {}
	};
}
function sourceFamilyForInstallPolicyKind(kind, fallback) {
	switch (kind) {
		case "plugin-archive": return "archive";
		case "plugin-dir": return "directory";
		case "plugin-git": return "git";
		case "plugin-npm": return "npm";
		default: return fallback;
	}
}
function sourceFamilyForInstallPolicySource(source, fallback) {
	switch (source?.kind) {
		case "archive":
		case "file":
		case "git":
		case "npm": return source.kind;
		default: return fallback;
	}
}
async function ensureInstallTargetAvailableForMode(params) {
	return await params.runtime.ensureInstallTargetAvailable({
		mode: params.mode,
		targetDir: params.targetPath,
		alreadyExistsError: `plugin already exists: ${params.targetPath} (delete it first)`
	});
}
async function resolvePreparedDirectoryInstallTarget(params) {
	const targetDirResult = await resolvePluginInstallTarget({
		runtime: params.runtime,
		pluginId: params.pluginId,
		extensionsDir: params.extensionsDir,
		nameEncoder: params.nameEncoder
	});
	if (!targetDirResult.ok) return targetDirResult;
	return {
		ok: true,
		target: {
			targetPath: targetDirResult.targetDir,
			effectiveMode: await resolveEffectiveInstallMode({
				runtime: params.runtime,
				requestedMode: params.requestedMode,
				targetPath: targetDirResult.targetDir
			})
		}
	};
}
async function runInstallSourceScan(params) {
	try {
		const scanResult = await params.scan();
		if (scanResult?.blocked) {
			const reason = scanResult.blocked.code === "security_scan_failed" ? "security_scan_failed" : "security_scan_blocked";
			emitPluginAuditSecurityEvent({
				outcome: pluginAuditOutcomeForReason(reason),
				reason,
				pluginId: params.pluginId,
				mode: params.mode,
				sourceFamily: params.sourceFamily
			});
			return buildBlockedInstallResult({ blocked: scanResult.blocked });
		}
		return null;
	} catch (err) {
		emitPluginAuditSecurityEvent({
			outcome: "error",
			reason: "security_scan_failed",
			pluginId: params.pluginId,
			mode: params.mode,
			sourceFamily: params.sourceFamily
		});
		return {
			ok: false,
			error: `${params.subject} installation blocked: code safety scan failed (${String(err)}). Run "openclaw security audit --deep" for details.`,
			code: PLUGIN_INSTALL_ERROR_CODE.SECURITY_SCAN_FAILED
		};
	}
}
async function installPluginDirectoryIntoExtensions(params) {
	const runtime = await loadPluginInstallRuntime();
	let targetDir = params.targetDir;
	if (!targetDir) {
		const targetDirResult = await resolvePluginInstallTarget({
			runtime,
			pluginId: params.pluginId,
			extensionsDir: params.extensionsDir,
			nameEncoder: params.nameEncoder
		});
		if (!targetDirResult.ok) return targetDirResult;
		targetDir = targetDirResult.targetDir;
	}
	const availability = await ensureInstallTargetAvailableForMode({
		runtime,
		targetPath: targetDir,
		mode: params.mode
	});
	if (!availability.ok) return availability;
	if (params.dryRun) return buildDirectoryInstallResult({
		pluginId: params.pluginId,
		targetDir,
		manifestName: params.manifestName,
		version: params.version,
		extensions: params.extensions,
		setup: params.setup
	});
	let artifactConsentFailure;
	const packageInstallParams = {
		sourceDir: params.sourceDir,
		targetDir,
		mode: params.mode,
		timeoutMs: params.timeoutMs,
		workTimeoutMs: params.workTimeoutMs,
		logger: params.logger,
		copyErrorPrefix: params.copyErrorPrefix,
		hasDeps: params.hasDeps,
		omitOpenClawHostDependency: true,
		sourceHardlinks: params.sourceHardlinks ?? "reject",
		depsLogMessage: params.depsLogMessage,
		afterCopy: params.afterCopy,
		beforePersistentApply: params.beforePersistentApply,
		afterInstall: async (installedDir) => {
			const postInstallResult = await params.afterInstall?.(installedDir);
			if (postInstallResult) return postInstallResult;
			try {
				await params.onBeforePluginArtifactCommit?.({
					pluginId: params.pluginId,
					...params.mode === "update" ? { currentArtifactDir: targetDir } : {},
					stagedArtifactDir: installedDir,
					mode: params.mode
				});
			} catch (error) {
				artifactConsentFailure = { error };
				throw error;
			}
			return { ok: true };
		}
	};
	const transactionRequest = resolvePluginInstallTransactionRequest(params);
	const installRes = await runtime.installPackageDir(transactionRequest ? requestDeferredPackageDirInstall(packageInstallParams, transactionRequest.assertOwned) : packageInstallParams);
	if (!installRes.ok) {
		if (artifactConsentFailure) throw artifactConsentFailure.error;
		return installRes;
	}
	const result = buildDirectoryInstallResult({
		pluginId: params.pluginId,
		targetDir,
		manifestName: params.manifestName,
		version: params.version,
		extensions: params.extensions,
		setup: params.setup
	});
	const transaction = resolvePackageDirInstallTransaction(installRes);
	return transaction ? attachPluginInstallTransaction(result, transaction) : result;
}
async function resolvePluginInstallTarget(params) {
	const extensionsDir = params.extensionsDir ? resolveUserPath(params.extensionsDir) : resolveDefaultPluginExtensionsDir();
	return await params.runtime.resolveCanonicalInstallTarget({
		baseDir: extensionsDir,
		id: params.pluginId,
		invalidNameMessage: "invalid plugin name: path traversal detected",
		boundaryLabel: "extensions directory",
		nameEncoder: params.nameEncoder
	});
}
async function resolveEffectiveInstallMode(params) {
	if (params.requestedMode !== "update") return "install";
	return await params.runtime.fileExists(params.targetPath) ? "update" : "install";
}
//#endregion
export { resolvePluginInstallOwnerMigrations as C, settlePluginInstallTransactions as D, retainPluginInstallTransaction as E, takePluginInstallTransaction as O, requestDeferredPluginInstall as S, resolvePluginInstallTransactionRequest as T, emitPluginInstallSecurityEvent as _, ensureOpenClawExtensions as a, attachPluginInstallTransaction as b, loadPluginInstallRuntime as c, resolvePreparedDirectoryInstallTarget as d, runInstallSourceScan as f, emitPluginAuditSecurityEvent as g, validateOpenClawPackageInstallCompatibility as h, ensureInstallTargetAvailableForMode as i, withPluginInstallTransactions as k, readOptionalPackageManifest as l, sourceFamilyForInstallPolicySource as m, defaultLogger as n, formatUnresolvedOpenClawPeerLinkError as o, sourceFamilyForInstallPolicyKind as p, emitSuccessfulPluginInstallSecurityEvent as r, installPluginDirectoryIntoExtensions as s, buildDirectoryInstallResult as t, resolveEffectiveInstallMode as u, pluginAuditOutcomeForReason as v, resolvePluginInstallTransaction as w, copyPluginInstallTransactionRequest as x, attachPluginInstallOwnerMigrations as y };
