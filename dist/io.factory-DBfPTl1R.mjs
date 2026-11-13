import { r as collectNestedErrorCandidates } from "./error-coercion-1P2One0X.mjs";
import { r as resolveGlobalSet } from "./global-singleton-BfHBYj6Y.mjs";
import { D as withPluginCache, d as getPluginMetadataSnapshotCache } from "./plugin-cache-DK2CPN_y.mjs";
import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { w as root } from "./fs-safe-CHQXnCPk.mjs";
import { t as isBlockedObjectKey } from "./prototype-keys-CuYw53fZ.mjs";
import { h as sleep } from "./utils-DUAwk2p5.mjs";
import { t as isPlainObject } from "./plain-object-BFvGATnd.mjs";
import { t as hasErrnoCode } from "./errno-FR4CRyya.mjs";
import { n as ConfigIncludeError, r as ConfigIncludeReadError } from "./includes-Dj3t0m8d.mjs";
import { S as resolveIsConfigReadOnly } from "./paths-CtO6iw0c.mjs";
import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { n as OpenClawStateOwnershipError } from "./sqlite-lifecycle-errors-Q-hsFPSB.mjs";
import { r as isSqliteSchemaMismatchError } from "./sqlite-schema-issues-Cd5MmsG2.mjs";
import { t as deferSqlitePostCommitPublication } from "./sqlite-post-commit-Dih1WMKX.mjs";
import { r as findStartupMaintenanceRequiredError } from "./startup-maintenance-required-CNRZ_k46.mjs";
import { c as isStateDatabaseReadAdmissionInvalidatedError } from "./openclaw-state-db-async-lifecycle-D4cx8OBO.mjs";
import { s as resolveOpenClawStateSqlitePath } from "./openclaw-state-db.paths-rJI64Ab5.mjs";
import { t as KeyedAsyncQueue } from "./keyed-async-queue-CTreGrmR.mjs";
import { t as _usingCtx } from "./usingCtx-DwOBYOJf.mjs";
import { n as ok, t as err } from "./result-BQGgYouL.mjs";
import { c as getPublishedConfigRuntimeEnvState, m as snapshotEnv, n as captureConfigReadEnvMutation, p as restoreEnvChangesIfUnchanged, r as cloneEnvWithPlatformSemantics, s as createConfigRuntimeEnvBase, t as applyConfigEnvVars } from "./config-env-vars-C__rW8Th.mjs";
import { d as withExistingOpenClawStateDatabaseReadOnly, m as withSynchronousArtifactPreservingStateSnapshot, o as withArtifactPreservingStateReads, r as isArtifactPreservingStateRead } from "./openclaw-state-db-readonly-DE3MB0wy.mjs";
import { r as captureOpenClawStateWorkerContext } from "./openclaw-state-worker-context-C_iAE7YK.mjs";
import { h as setConfigResolutionFacts, r as copyConfigResolutionFacts } from "./resolution-facts-CYe39-eJ.mjs";
import { a as hashConfigRevision, c as readConfigFileIfPresent, d as resolveConfigIncludesForRead, f as resolveConfigPathForDeps, i as hashConfigRaw, m as resolveGatewayMode, n as containsConfigIncludeDirective, o as normalizeConfigIoDeps, r as hasConfigMeta, s as parseConfigJson5, t as coerceConfig, u as resolveConfigForRead } from "./io.read-helpers-CgQwh9G4.mjs";
import { l as runOpenClawStateWriteTransaction } from "./openclaw-state-db-DM-mSY0m.mjs";
import { t as createDedupeCache } from "./dedupe-Bq05tjkn.mjs";
import { c as readDeferredPluginMigrations, l as readDeferredPluginMigrationsAsync } from "./deferred-plugin-migrations-Ds53ELH9.mjs";
import { c as shouldDeferShellEnvFallback, i as loadShellEnvFallback, l as shouldEnableShellEnvFallback, s as resolveShellEnvFallbackTimeoutMs } from "./shell-env-CveuoxyC.mjs";
import { r as loadInstalledPluginIndexInstallRecords } from "./installed-plugin-index-record-reader-BKR65EEF.mjs";
import { l as withPluginMetadataSnapshotScope } from "./current-plugin-metadata-snapshot-CdI4MWI9.mjs";
import { D as DuplicateAgentDirError, E as attachAgentListProjection, O as findDuplicateAgentDirs, d as asRuntimeConfig, f as materializeRuntimeConfig, u as asResolvedSourceConfig } from "./validation-core-YrPXii0X.mjs";
import { r as formatConfigIssueSummary } from "./issue-format-IKggtHBm.mjs";
import { a as isConfigReadFailure, c as throwInvalidConfig, i as formatInvalidConfigDetails, n as createConfigReadError, s as isInvalidConfigError } from "./io.invalid-config-DkKUeCUl.mjs";
import { a as runOpenClawStateWorkerOperation } from "./openclaw-state-worker-store-DwGcGmZn.mjs";
import { a as appendConfigAuditRecordSync, c as createConfigObserveAuditRecord, i as appendConfigAuditRecord } from "./io.audit-BTBLX19y.mjs";
import { a as writeConfigHealthPatchInDatabase, i as readConfigHealthStateInDatabase, n as prepareConfigHealthPatch } from "./io.health-state.kernel-DmCHBLAj.mjs";
import { D as loggedInvalidConfigs, E as loggedConfigWarningFingerprints, O as setBoundedConfigIoWarningEntry, T as autoOwnerDisplaySecretByPath, c as chmodConfigBestEffort, i as warnIfJSON5CommentsWillBeStripped, l as chmodConfigBestEffortSync, n as warnIfConfigFromFuture, p as resolveConfigStatMetadata, r as warnOnConfigMiskeys, t as logConfigWarningsOnce, v as captureConfigWriteLockGuard, x as withConfigWriteLock } from "./io.warnings-AdNkx0te.mjs";
import { t as ConfigMutationConflictError } from "./mutation-conflict-Be0wSyDG.mjs";
import { n as createConfigWriteAuthorityGuard } from "./write-authority-BBYsD_pp.mjs";
import { i as resolveConfigWidePluginMetadataSnapshotAsync, r as resolveConfigWidePluginMetadataSnapshot } from "./io.plugin-metadata-Dh6QPasb.mjs";
import { i as validateConfigObjectWithPluginsAsync, r as validateConfigObjectWithPlugins, u as migrateLegacyContextBudgetConfig } from "./validation-D_X_aeNf.mjs";
import { t as inheritLegacyDefaultAgentId } from "./legacy.default-agent-owner-C1atgXtB.mjs";
import { t as migratePersistedImplicitMainRoster } from "./legacy.roster-D1NwNEmk.mjs";
import { i as unsetConfigValueAtPath, n as parseConfigPath, r as setConfigValueAtPath } from "./config-paths-DGj9QUTx.mjs";
import { t as resolveShellEnvExpectedKeys } from "./shell-env-expected-keys-CGgKeWMd.mjs";
import { c as resolveManagedUnsetPathsForWrite, o as setDeferredPluginMigrationConfigFacts } from "./deferred-plugin-migration-config-BbOrU7ue.mjs";
import { l as getRuntimeConfigSourceSnapshot, t as captureManagedConfigSnapshotPreparation } from "./runtime-snapshot-BHGp6OxI.mjs";
import { n as loadDotEnvAsync, t as loadDotEnv } from "./dotenv-g6Y72yq_.mjs";
import { i as shouldAttemptLastKnownGoodRecovery, n as isPluginLocalInvalidConfigSnapshot, t as collectPollutedSecretPlaceholders } from "./recovery-policy-D5E-mA-L.mjs";
import { t as GATEWAY_CONFIG_SELECTION_ENV_KEYS } from "./gateway-env-selection-BiWRWRXt.mjs";
import { t as findLegacyConfigIssues } from "./legacy-BsVKffEe.mjs";
import { a as includeContributionOwnsBindings, i as includeContributionOwnsAgentRoster } from "./agent-roster-provenance-DBIaC1eR.mjs";
import { n as prepareConfigSnapshotValidation, t as materializeConfigSnapshotDefaults } from "./io.snapshot-preparation-lIWsc3n6.mjs";
import path from "node:path";
import { isDeepStrictEqual } from "node:util";
import crypto from "node:crypto";
import { isMainThread } from "node:worker_threads";
import { replaceFileAtomic, replaceFileAtomicSync } from "@openclaw/fs-safe/atomic";
//#region src/agents/owner-display.ts
const MAX_OWNER_PROMPT_SENDERS = 16;
function exceedsOwnerPromptContentBudget(ownerNumbers) {
	let bytes = 0;
	for (const ownerId of ownerNumbers) {
		bytes += Buffer.byteLength(ownerId, "utf8") + (bytes > 0 ? 2 : 0);
		if (bytes > 980) return true;
	}
	return false;
}
/** Keep owner identity guidance bounded without changing the authorization allowlist. */
function resolveOwnerPromptNumbers(params) {
	const ownerNumbers = params.ownerNumbers;
	if (!ownerNumbers?.length) return;
	if (ownerNumbers.length <= MAX_OWNER_PROMPT_SENDERS && !exceedsOwnerPromptContentBudget(ownerNumbers)) return ownerNumbers;
	const promptOwners = ownerNumbers.slice(0, MAX_OWNER_PROMPT_SENDERS);
	const senderId = params.senderId;
	if (params.senderIsOwner && senderId && ownerNumbers.includes(senderId)) {
		if (!promptOwners.includes(senderId)) promptOwners[promptOwners.length - 1] = senderId;
		if (exceedsOwnerPromptContentBudget(promptOwners) && promptOwners[0] !== senderId) return [senderId, ...promptOwners.filter((ownerId) => ownerId !== senderId)];
	}
	return promptOwners;
}
/**
* Ensure hash mode has a dedicated secret.
* Returns updated config and generated secret when autofill was needed.
*/
function ensureOwnerDisplaySecret(config, _generateSecret) {
	return { config };
}
//#endregion
//#region src/config/io.health-state.ts
const observations = resolveGlobalSet(Symbol.for("openclaw.configHealthObservations"), "close-and-restart");
const supersededObservation = /* @__PURE__ */ new Error("Config health observation was superseded");
function matchingObservations(next) {
	const matches = [];
	for (const current of observations) if (current.configPath === next.configPath && (current.databasePath === next.databasePath || next.identity() !== void 0 && current.identity() === next.identity())) matches.push(current);
	return matches;
}
function supersedeMatchingObservations(next) {
	for (const current of matchingObservations(next)) observations.delete(current);
}
/** Synchronous producers invalidate in-flight observations without retaining a scope. */
function supersedeConfigHealthObservations(deps, configPath) {
	if (observations.size === 0) return;
	const env = resolveConfigHealthStateEnv(deps);
	const databasePath = resolveOpenClawStateSqlitePath(env);
	let context;
	try {
		context = captureOpenClawStateWorkerContext({
			path: databasePath,
			env
		});
	} catch {}
	supersedeMatchingObservations({
		databasePath,
		configPath,
		identity: () => context?.admission.identity.key
	});
}
const loggedHealthWriteFailures = /* @__PURE__ */ new Map();
function resolveConfigHealthStateEnv(deps) {
	if (deps.env.OPENCLAW_HOME || deps.env.HOME || deps.env.USERPROFILE || deps.env.PREFIX) return deps.env;
	return {
		...deps.env,
		HOME: deps.homedir()
	};
}
function handleHealthReadFailure(error) {
	if (error instanceof OpenClawStateOwnershipError) throw error;
	return {};
}
function handleHealthWriteFailure(deps, databasePath, error) {
	if (error instanceof OpenClawStateOwnershipError || findStartupMaintenanceRequiredError(error)) throw error;
	const message = formatErrorMessage(error);
	const repeated = loggedHealthWriteFailures.get(databasePath) === message;
	setBoundedConfigIoWarningEntry(loggedHealthWriteFailures, databasePath, message);
	if (!repeated) deps.logger.warn(`Config health-state write failed: ${message}`);
}
function readConfigHealthStateFromStore(deps) {
	try {
		return withExistingOpenClawStateDatabaseReadOnly(({ db }) => readConfigHealthStateInDatabase(db), { env: resolveConfigHealthStateEnv(deps) }) ?? {};
	} catch (error) {
		return handleHealthReadFailure(error);
	}
}
function patchConfigHealthEntryToStore(deps, configPath, changes) {
	const env = resolveConfigHealthStateEnv(deps);
	const databasePath = resolveOpenClawStateSqlitePath(env);
	try {
		const patch = prepareConfigHealthPatch(changes);
		if (Object.keys(patch).length === 0) return;
		const updatedAtMs = Date.now();
		runOpenClawStateWriteTransaction(({ db }) => {
			let pending = [];
			if (observations.size > 0) {
				let context;
				try {
					context = captureOpenClawStateWorkerContext({
						path: databasePath,
						env
					});
				} catch {}
				pending = matchingObservations({
					databasePath,
					configPath,
					identity: () => context?.admission.identity.key
				});
			}
			writeConfigHealthPatchInDatabase(db, configPath, patch, updatedAtMs);
			const publish = () => {
				for (const observation of pending) observations.delete(observation);
				loggedHealthWriteFailures.delete(databasePath);
			};
			if (!deferSqlitePostCommitPublication(db, publish)) publish();
		}, {
			env,
			path: databasePath
		});
	} catch (error) {
		handleHealthWriteFailure(deps, databasePath, error);
	}
}
/** Bind one asynchronous observation/recovery to its original shared-state owner. */
function captureConfigHealthStateStore(deps, configPath, assertAdmissionCurrent) {
	const env = resolveConfigHealthStateEnv(deps);
	const databasePath = resolveOpenClawStateSqlitePath(env);
	let captured;
	try {
		captured = { context: captureOpenClawStateWorkerContext({
			path: databasePath,
			env
		}) };
	} catch (error) {
		captured = { error };
	}
	const captureScope = (continuation = false) => {
		assertAdmissionCurrent?.();
		const observation = {
			databasePath,
			configPath,
			identity: () => "context" in captured ? captured.context.admission.identity.key : void 0
		};
		if (!continuation) supersedeMatchingObservations(observation);
		if (matchingObservations(observation).length === 0) observations.add(observation);
		const isCurrent = () => {
			assertAdmissionCurrent?.();
			if ("context" in captured) captured.context.admission.assertCurrent();
			return observations.has(observation);
		};
		const assertCurrent = () => {
			if (!isCurrent()) throw supersededObservation;
		};
		const createOperationGuard = () => {
			let guardFailed = false;
			return {
				rethrowIfInvalid: (error) => {
					if (guardFailed && error !== supersededObservation) throw error;
					try {
						isCurrent();
					} catch {
						throw error;
					}
				},
				assertCurrent: () => {
					try {
						assertCurrent();
					} catch (error) {
						guardFailed = true;
						throw error;
					}
				}
			};
		};
		const store = {
			isCurrent,
			captureContinuation: () => captureScope(true),
			[Symbol.dispose]() {
				observations.delete(observation);
			},
			async read() {
				const artifactPreserving = isArtifactPreservingStateRead();
				const guard = createOperationGuard();
				try {
					if ("error" in captured) throw captured.error;
					const snapshot = await runOpenClawStateWorkerOperation(captured.context, (scope) => scope.execute({
						type: "config.health.read",
						input: { artifactPreserving }
					}), {
						existingOnly: true,
						assertCurrent: guard.assertCurrent
					}) ?? {
						state: {},
						basis: {}
					};
					return isCurrent() ? snapshot : null;
				} catch (error) {
					guard.rethrowIfInvalid(error);
					if (error === supersededObservation) return null;
					const state = handleHealthReadFailure(error);
					return isCurrent() ? {
						state,
						basis: null
					} : null;
				}
			},
			async update(changes, previous) {
				const guard = createOperationGuard();
				try {
					const patch = prepareConfigHealthPatch(changes);
					if (Object.keys(patch).length === 0) return;
					if ("error" in captured) throw captured.error;
					const prior = previous.basis?.[configPath];
					const expected = previous.basis === null ? void 0 : prior ? { ...prior } : null;
					const updatedAtMs = Date.now();
					if (await runOpenClawStateWorkerOperation(captured.context, (scope) => scope.execute({
						type: "config.health.patch",
						input: {
							configPath,
							patch,
							expected,
							updatedAtMs
						}
					}), { assertCurrent: guard.assertCurrent }) && observations.has(observation)) loggedHealthWriteFailures.delete(databasePath);
				} catch (error) {
					guard.rethrowIfInvalid(error);
					if (error === supersededObservation) return;
					handleHealthWriteFailure(deps, databasePath, error);
				}
			},
			async updateAfterFileCommit(changes, previous) {
				try {
					await store.update(changes, previous);
				} catch (error) {
					handleHealthWriteFailure(deps, databasePath, error);
				}
			}
		};
		return store;
	};
	return captureScope();
}
//#endregion
//#region src/config/io.observe-state.ts
function readConfigHealthEntry(state, configPath) {
	const entry = state.entries?.[configPath];
	return isRecord(entry) ? entry : {};
}
function createConfigHealthFingerprint(params) {
	return {
		hash: params.hash ?? hashConfigRaw(params.raw),
		bytes: Buffer.byteLength(params.raw, "utf-8"),
		mtimeMs: params.stat?.mtimeMs ?? null,
		ctimeMs: params.stat?.ctimeMs ?? null,
		...resolveConfigStatMetadata(params.stat),
		hasMeta: hasConfigMeta(params.parsed),
		gatewayMode: resolveGatewayMode(params.resolved ?? params.parsed),
		observedAt: params.observedAt ?? (/* @__PURE__ */ new Date()).toISOString()
	};
}
function createConfigFingerprintFromRead(params) {
	const parsed = parseConfigJson5(params.raw, params.deps.json5);
	return createConfigHealthFingerprint({
		raw: params.raw,
		parsed: parsed.ok ? parsed.parsed : {},
		stat: params.stat
	});
}
async function readConfigFingerprintForPath(deps, configPath) {
	try {
		return createConfigFingerprintFromRead({
			deps,
			raw: await deps.fs.promises.readFile(configPath, "utf-8"),
			stat: await deps.fs.promises.stat(configPath).catch(() => null)
		});
	} catch {
		return null;
	}
}
function readConfigFingerprintForPathSync(deps, configPath) {
	try {
		const raw = deps.fs.readFileSync(configPath, "utf-8");
		let stat = null;
		try {
			stat = deps.fs.statSync(configPath, { throwIfNoEntry: false }) ?? null;
		} catch {}
		return createConfigFingerprintFromRead({
			deps,
			raw,
			stat
		});
	} catch {
		return null;
	}
}
function extractRestoreErrorDetails(error) {
	if (!error || typeof error !== "object") return {
		code: null,
		message: typeof error === "string" ? error : null
	};
	return {
		code: "code" in error && typeof error.code === "string" ? error.code : null,
		message: "message" in error && typeof error.message === "string" ? error.message : null
	};
}
//#endregion
//#region src/config/io.observe-suspicious.ts
function isUpdateChannelOnlyRoot(value) {
	if (!isRecord(value)) return false;
	const keys = Object.keys(value);
	if (keys.length !== 1 || keys[0] !== "update") return false;
	const update = value.update;
	if (!isRecord(update)) return false;
	return Object.keys(update).length === 1 && typeof update.channel === "string";
}
function resolveConfigObserveSuspiciousReasons(params) {
	const reasons = [];
	const baseline = params.lastKnownGood;
	if (!baseline) return reasons;
	if (baseline.bytes >= 512 && params.bytes < Math.floor(baseline.bytes * .5)) reasons.push(`size-drop-vs-last-good:${baseline.bytes}->${params.bytes}`);
	if (baseline.hasMeta && !params.hasMeta) reasons.push("missing-meta-vs-last-good");
	if (baseline.gatewayMode && !params.gatewayMode) reasons.push("gateway-mode-missing-vs-last-good");
	if (baseline.gatewayMode && isUpdateChannelOnlyRoot(params.parsed)) reasons.push("update-channel-only-root");
	return reasons;
}
function resolveConfigReadRecoveryContext(params) {
	const suspicious = resolveConfigObserveSuspiciousReasons({
		bytes: params.current.bytes,
		hasMeta: params.current.hasMeta,
		gatewayMode: params.current.gatewayMode,
		parsed: params.parsed,
		lastKnownGood: params.backupBaseline
	});
	if (suspicious.length === 0) return null;
	const suspiciousSignature = `${params.current.hash}:${suspicious.join(",")}`;
	if (params.entry.lastObservedSuspiciousSignature === suspiciousSignature) return null;
	return {
		suspicious,
		suspiciousSignature
	};
}
//#endregion
//#region src/config/io.observe.ts
function sameFingerprint(left, right) {
	if (!left) return false;
	return left.hash === right.hash && left.bytes === right.bytes && left.mtimeMs === right.mtimeMs && left.ctimeMs === right.ctimeMs && left.dev === right.dev && left.ino === right.ino && left.mode === right.mode && left.nlink === right.nlink && left.uid === right.uid && left.gid === right.gid && left.hasMeta === right.hasMeta && left.gatewayMode === right.gatewayMode;
}
function createObservedFingerprint(snapshot, stat) {
	const raw = snapshot.raw;
	return createConfigHealthFingerprint({
		raw,
		parsed: snapshot.parsed,
		resolved: snapshot.resolved,
		stat
	});
}
function resolveObservation(params) {
	const entry = readConfigHealthEntry(params.healthState, params.snapshot.path);
	const baseline = entry.lastKnownGood ?? params.backupBaseline;
	return {
		entry,
		baseline,
		suspicious: resolveConfigObserveSuspiciousReasons({
			bytes: params.current.bytes,
			hasMeta: params.current.hasMeta,
			gatewayMode: params.current.gatewayMode,
			parsed: params.snapshot.parsed,
			lastKnownGood: baseline
		})
	};
}
function resolveHealthyObservationChanges(params) {
	if (!params.snapshot.valid) return null;
	const changes = {
		lastKnownGood: params.current,
		lastObservedSuspiciousSignature: null
	};
	return !sameFingerprint(params.entry.lastKnownGood, params.current) || params.entry.lastObservedSuspiciousSignature !== null ? changes : null;
}
async function observeConfigSnapshot(deps, snapshot, assertCurrent) {
	if (!snapshot.exists || typeof snapshot.raw !== "string") return;
	assertCurrent?.();
	try {
		try {
			var _usingCtx$2 = _usingCtx();
			const health = _usingCtx$2.u(captureConfigHealthStateStore(deps, snapshot.path, assertCurrent));
			const stat = await deps.fs.promises.stat(snapshot.path).catch(() => null);
			if (!health.isCurrent()) return;
			const current = createObservedFingerprint(snapshot, stat);
			const healthSnapshot = await health.read();
			if (!healthSnapshot) return;
			const healthState = healthSnapshot.state;
			const backupPath = `${snapshot.path}.bak`;
			const backupBaseline = readConfigHealthEntry(healthState, snapshot.path).lastKnownGood ?? await readConfigFingerprintForPath(deps, backupPath) ?? void 0;
			if (!health.isCurrent()) return;
			const { entry, baseline, suspicious } = resolveObservation({
				snapshot,
				current,
				healthState,
				backupBaseline
			});
			if (suspicious.length === 0) {
				const changes = resolveHealthyObservationChanges({
					snapshot,
					current,
					entry
				});
				if (changes) await health.update(changes, healthSnapshot);
				return;
			}
			const signature = `${current.hash}:${suspicious.join(",")}`;
			if (entry.lastObservedSuspiciousSignature === signature) return;
			const backup = (baseline?.hash ? baseline : null) ?? await readConfigFingerprintForPath(deps, backupPath);
			if (!health.isCurrent()) return;
			deps.logger.warn(`Config observe anomaly: ${snapshot.path} (${suspicious.join(", ")})`);
			await appendConfigAuditRecord({
				env: deps.env,
				homedir: deps.homedir,
				record: createConfigObserveAuditRecord({
					configPath: snapshot.path,
					valid: snapshot.valid,
					current,
					suspicious,
					lastKnownGood: entry.lastKnownGood,
					backup
				})
			}, assertCurrent);
			await health.update({ lastObservedSuspiciousSignature: signature }, healthSnapshot);
		} catch (_) {
			_usingCtx$2.e = _;
		} finally {
			_usingCtx$2.d();
		}
	} catch (error) {
		if (isStateDatabaseReadAdmissionInvalidatedError(error)) return;
		throw error;
	}
}
function observeConfigSnapshotSync(deps, snapshot) {
	if (!snapshot.exists || typeof snapshot.raw !== "string") return;
	supersedeConfigHealthObservations(deps, snapshot.path);
	const current = createObservedFingerprint(snapshot, deps.fs.statSync(snapshot.path, { throwIfNoEntry: false }) ?? null);
	const healthState = readConfigHealthStateFromStore(deps);
	const backupPath = `${snapshot.path}.bak`;
	const { entry, baseline, suspicious } = resolveObservation({
		snapshot,
		current,
		healthState,
		backupBaseline: readConfigHealthEntry(healthState, snapshot.path).lastKnownGood ?? readConfigFingerprintForPathSync(deps, backupPath) ?? void 0
	});
	if (suspicious.length === 0) {
		const changes = resolveHealthyObservationChanges({
			snapshot,
			current,
			entry
		});
		if (changes) patchConfigHealthEntryToStore(deps, snapshot.path, changes);
		return;
	}
	const signature = `${current.hash}:${suspicious.join(",")}`;
	if (entry.lastObservedSuspiciousSignature === signature) return;
	const backup = (baseline?.hash ? baseline : null) ?? readConfigFingerprintForPathSync(deps, backupPath);
	deps.logger.warn(`Config observe anomaly: ${snapshot.path} (${suspicious.join(", ")})`);
	appendConfigAuditRecordSync({
		env: deps.env,
		homedir: deps.homedir,
		record: createConfigObserveAuditRecord({
			configPath: snapshot.path,
			valid: snapshot.valid,
			current,
			suspicious,
			lastKnownGood: entry.lastKnownGood,
			backup
		})
	});
	patchConfigHealthEntryToStore(deps, snapshot.path, { lastObservedSuspiciousSignature: signature });
}
//#endregion
//#region src/config/io.owner-display-secret.ts
/** Retains generated owner display secrets in memory without persisting them into config. */
function retainGeneratedOwnerDisplaySecret(params) {
	const { config, configPath, generatedSecret, state } = params;
	if (generatedSecret) state.pendingByPath.set(configPath, generatedSecret);
	else state.pendingByPath.delete(configPath);
	return config;
}
//#endregion
//#region src/config/runtime-overrides.ts
let overrides = {};
function sanitizeOverrideValue(value, seen = /* @__PURE__ */ new WeakSet()) {
	if (Array.isArray(value)) return value.map((entry) => sanitizeOverrideValue(entry, seen));
	if (!isPlainObject(value)) return value;
	if (seen.has(value)) return {};
	seen.add(value);
	const sanitized = {};
	for (const [key, entry] of Object.entries(value)) {
		if (entry === void 0 || isBlockedObjectKey(key)) continue;
		sanitized[key] = sanitizeOverrideValue(entry, seen);
	}
	seen.delete(value);
	return sanitized;
}
function mergeOverrides(base, override) {
	if (!isPlainObject(base) || !isPlainObject(override)) return override;
	const next = { ...base };
	for (const [key, value] of Object.entries(override)) {
		if (value === void 0 || isBlockedObjectKey(key)) continue;
		next[key] = mergeOverrides(base[key], value);
	}
	return next;
}
function applyOverrideTree(cfg, overrideTree) {
	const next = mergeOverrides(cfg, overrideTree);
	if (next.agents === cfg.agents) return inheritLegacyDefaultAgentId(cfg, next);
	return inheritLegacyDefaultAgentId(cfg, attachAgentListProjection(next));
}
/** Return the process-local runtime override tree used by debug config commands. */
function getConfigOverrides() {
	return overrides;
}
/** Clear all process-local runtime overrides. Intended for debug reset flows and tests. */
function resetConfigOverrides() {
	overrides = {};
}
/** Set one runtime override at a parsed config path after sanitizing object values. */
function setConfigOverride(pathRaw, value) {
	const parsed = parseConfigPath(pathRaw);
	if (!parsed.ok) return err(parsed.error);
	setConfigValueAtPath(overrides, parsed.path, sanitizeOverrideValue(value));
	return ok(parsed.path);
}
/** Remove one runtime override path and report whether an override was present. */
function unsetConfigOverride(pathRaw) {
	const parsed = parseConfigPath(pathRaw);
	if (!parsed.ok) return err(parsed.error);
	const removed = unsetConfigValueAtPath(overrides, parsed.path);
	return ok(removed);
}
/** Merge the current runtime overrides over a loaded config without mutating the input config. */
function applyConfigOverrides(cfg) {
	if (!overrides || Object.keys(overrides).length === 0) return cfg;
	return applyOverrideTree(cfg, overrides);
}
/** Capture an immutable applier for the process-local overrides active at this instant. */
function captureConfigOverrideApplier() {
	const capturedOverrides = structuredClone(overrides);
	if (Object.keys(capturedOverrides).length === 0) return (cfg) => cfg;
	return (cfg) => applyOverrideTree(cfg, capturedOverrides);
}
//#endregion
//#region src/config/io.context.ts
function createConfigIoContext(options = {}, transformRecoveryCandidate) {
	const deps = normalizeConfigIoDeps(options);
	const configPath = resolveConfigPathForDeps(deps);
	const pathResolution = {
		env: deps.env,
		homedir: options.homedir
	};
	function resolveDeferredPluginMigrations() {
		return options.deferredPluginMigrations ?? (options.pluginValidation === "core-only" ? [] : readDeferredPluginMigrations({
			env: deps.env,
			artifactPreservingReadOnly: !deps.observe
		}));
	}
	async function resolveDeferredPluginMigrationsAsync() {
		return options.deferredPluginMigrations ?? (options.pluginValidation === "core-only" ? [] : readDeferredPluginMigrationsAsync({
			env: deps.env,
			artifactPreservingReadOnly: !deps.observe
		}));
	}
	function observeLoadConfigSnapshot(snapshot) {
		if (deps.observe) observeConfigSnapshotSync(deps, snapshot);
		return snapshot;
	}
	async function observeLoadConfigSnapshotAsync(snapshot, assertCurrent) {
		if (deps.observe) await observeConfigSnapshot(deps, snapshot, assertCurrent);
		return snapshot;
	}
	function shouldLoadShellEnv(config, env) {
		return (shouldEnableShellEnvFallback(env) || config.env?.shellEnv?.enabled === true) && options.shellEnvFallback !== "defer" && !shouldDeferShellEnvFallback(env);
	}
	async function finalizeLoadedRuntimeConfigAsync(config, metadata, assertCurrent) {
		if (!metadata.getSnapshot()) {
			const env = cloneEnvWithPlatformSemantics(deps.env);
			applyConfigEnvVars(config, env);
			if (shouldLoadShellEnv(config, env)) await metadata.loadAsync(config);
		}
		assertCurrent?.();
		const snapshot = metadata.getSnapshot();
		return snapshot ? withPluginMetadataSnapshotScope(snapshot, () => finalizeLoadedRuntimeConfig(config), {
			config,
			env: deps.env
		}) : finalizeLoadedRuntimeConfig(config);
	}
	function finalizeLoadedRuntimeConfig(cfg) {
		const duplicates = findDuplicateAgentDirs(cfg, pathResolution);
		if (duplicates.length > 0) throw new DuplicateAgentDirError(duplicates);
		applyConfigEnvVars(cfg, deps.env);
		if (shouldLoadShellEnv(cfg, deps.env)) loadShellEnvFallback({
			enabled: true,
			env: deps.env,
			expectedKeys: resolveShellEnvExpectedKeys(deps.env, cfg),
			logger: deps.logger,
			timeoutMs: cfg.env?.shellEnv?.timeoutMs ?? resolveShellEnvFallbackTimeoutMs(deps.env)
		});
		const pendingValue = autoOwnerDisplaySecretByPath.get(configPath);
		const { config: resolvedConfig, generatedSecret } = ensureOwnerDisplaySecret(cfg, () => pendingValue ?? crypto.randomBytes(32).toString("hex"));
		const finalized = applyConfigOverrides(retainGeneratedOwnerDisplaySecret({
			config: resolvedConfig,
			configPath,
			generatedSecret,
			state: { pendingByPath: autoOwnerDisplaySecretByPath }
		}));
		const inherited = inheritLegacyDefaultAgentId(cfg, finalized);
		copyConfigResolutionFacts(cfg, inherited);
		return inherited;
	}
	function createValidationPluginMetadataSnapshotLoader(params) {
		let snapshot;
		let pending;
		return {
			load: (config) => {
				snapshot ??= resolveConfigWidePluginMetadataSnapshot({
					config,
					env: params.env,
					allowCurrent: params.allowCurrentPluginMetadata
				});
				return { manifestRegistry: snapshot.manifestRegistry };
			},
			loadAsync: (config) => pending ??= (async () => {
				snapshot ??= await resolveConfigWidePluginMetadataSnapshotAsync({
					config,
					env: params.env,
					allowCurrent: params.allowCurrentPluginMetadata
				});
				const records = await withPluginCache(getPluginMetadataSnapshotCache(snapshot), () => loadInstalledPluginIndexInstallRecords({ env: params.env })).catch(() => ({}));
				return {
					manifestRegistry: snapshot.manifestRegistry,
					installedPluginRecordIds: new Set(Object.keys(records))
				};
			})(),
			getManifestRegistry: () => snapshot?.manifestRegistry,
			getSnapshot: () => snapshot
		};
	}
	function resolveRuntimePreflightSourceConfig(candidate, includeFileHashes, includeFileTargets, baseEnv = deps.env) {
		const env = cloneEnvWithPlatformSemantics(baseEnv);
		const resolvedIncludes = resolveConfigIncludesForRead(candidate, configPath, {
			...deps,
			env
		}, includeFileHashes, includeFileTargets);
		const resolution = resolveConfigForRead(resolvedIncludes, env, deps.lowerPrecedenceEnv);
		const contextBudgetConfig = migrateLegacyContextBudgetConfig(resolution.resolvedConfigRaw).config;
		return coerceConfig(migratePersistedImplicitMainRoster(contextBudgetConfig, {
			env,
			homedir: deps.homedir
		}).config);
	}
	function* prepareRecoveryBackupCandidateSteps(candidate) {
		try {
			const originalEnv = cloneEnvWithPlatformSemantics(deps.env);
			const includeProvenance = [];
			const originalResolvedIncludes = resolveConfigIncludesForRead(candidate.parsed, configPath, {
				...deps,
				env: originalEnv
			}, void 0, void 0, void 0, (event) => {
				const { value: _value, ...ownership } = event;
				includeProvenance.push(ownership);
			});
			const originalResolution = resolveConfigForRead(originalResolvedIncludes, originalEnv, deps.lowerPrecedenceEnv);
			const prepareValidation = (pending) => {
				const authoredCandidate = transformRecoveryCandidate ? transformRecoveryCandidate({
					candidate,
					configPath,
					includeProvenance,
					resolvedConfig: originalResolution.resolvedConfigRaw,
					deferredPluginMigrations: pending
				}) : candidate.parsed;
				const candidateEnv = cloneEnvWithPlatformSemantics(deps.env);
				const resolved = resolveConfigIncludesForRead(authoredCandidate, configPath, {
					...deps,
					env: candidateEnv
				});
				return {
					authoredCandidate,
					effectiveConfigRaw: resolveConfigForRead(resolved, candidateEnv, deps.lowerPrecedenceEnv).resolvedConfigRaw,
					pluginMetadata: createValidationPluginMetadataSnapshotLoader({ env: candidateEnv }),
					validationOptions: {
						...pathResolution,
						env: candidateEnv,
						pluginValidation: options.pluginValidation,
						sourceRaw: authoredCandidate,
						preservedLegacyRootKeys: options.preservedLegacyRootKeys,
						deferredPluginMigrations: pending
					}
				};
			};
			const { authoredCandidate: preparedRawConfig, validated } = yield {
				sync: () => withSynchronousArtifactPreservingStateSnapshot(() => {
					const prepared = prepareValidation(resolveDeferredPluginMigrations());
					return {
						authoredCandidate: prepared.authoredCandidate,
						validated: validateConfigObjectWithPlugins(prepared.effectiveConfigRaw, {
							...prepared.validationOptions,
							loadPluginMetadataSnapshot: prepared.pluginMetadata.load
						})
					};
				}),
				async: async () => {
					const prepared = prepareValidation(await resolveDeferredPluginMigrationsAsync());
					return {
						authoredCandidate: prepared.authoredCandidate,
						validated: await validateConfigObjectWithPluginsAsync(prepared.effectiveConfigRaw, {
							...prepared.validationOptions,
							loadPluginMetadataSnapshotAsync: prepared.pluginMetadata.loadAsync
						})
					};
				}
			};
			if (!validated.ok) {
				const issueSummary = formatConfigIssueSummary(validated.issues.slice(0, 3)) ?? "";
				const detail = issueSummary.length > 800 ? `${issueSummary.slice(0, 799)}…` : issueSummary;
				return {
					ok: false,
					reason: `candidate is not valid current config${detail ? `: ${detail}` : ""}`
				};
			}
			return {
				ok: true,
				candidate: {
					config: validated.config,
					parsed: preparedRawConfig,
					raw: preparedRawConfig !== candidate.parsed ? JSON.stringify(preparedRawConfig, null, 2).trimEnd().concat("\n") : candidate.raw
				}
			};
		} catch (error) {
			if (error instanceof ConfigIncludeReadError || !(error instanceof ConfigIncludeError || isInvalidConfigError(error))) throw error;
			return {
				ok: false,
				reason: `candidate preparation failed: ${error.message}`
			};
		}
	}
	function prepareRecoveryBackupCandidate(candidate) {
		const steps = prepareRecoveryBackupCandidateSteps(candidate);
		let next = steps.next();
		while (!next.done) try {
			next = steps.next(next.value.sync());
		} catch (error) {
			next = steps.throw(error);
		}
		return next.value;
	}
	async function prepareRecoveryBackupCandidateAsync(candidate) {
		const steps = prepareRecoveryBackupCandidateSteps(candidate);
		let next = steps.next();
		while (!next.done) try {
			next = steps.next(await next.value.async());
		} catch (error) {
			next = steps.throw(error);
		}
		return next.value;
	}
	return {
		deps,
		pathResolution,
		configPath,
		options,
		...transformRecoveryCandidate ? { transformRecoveryCandidate } : {},
		resolveDeferredPluginMigrations,
		resolveDeferredPluginMigrationsAsync,
		observeLoadConfigSnapshot,
		observeLoadConfigSnapshotAsync,
		finalizeLoadedRuntimeConfig,
		finalizeLoadedRuntimeConfigAsync,
		createValidationPluginMetadataSnapshotLoader,
		resolveRuntimePreflightSourceConfig,
		prepareRecoveryBackupCandidate,
		prepareRecoveryBackupCandidateAsync
	};
}
//#endregion
//#region src/config/io.clobber-snapshot.ts
/** Maximum retained clobbered-config snapshots per config file. */
const CONFIG_CLOBBER_SNAPSHOT_LIMIT = 32;
const CONFIG_CLOBBER_LOCK_STALE_MS = 3e4;
const CONFIG_CLOBBER_LOCK_RETRY_MS = 10;
const CONFIG_CLOBBER_LOCK_TIMEOUT_MS = 2e3;
const clobberSnapshotQueue = new KeyedAsyncQueue();
const clobberCapWarnedPaths = createDedupeCache({
	ttlMs: 0,
	maxSize: 4096
});
function formatConfigArtifactTimestamp(ts) {
	return ts.replaceAll(":", "-").replaceAll(".", "-");
}
function isFsErrorCode(error, code) {
	return error instanceof Error && hasErrnoCode(error, code);
}
function resolveClobberPaths(configPath) {
	const dir = path.dirname(configPath);
	const basename = path.basename(configPath);
	return {
		dir,
		prefix: `${basename}.clobbered.`,
		lockPath: path.join(dir, `${basename}.clobber.lock`)
	};
}
function shouldRemoveStaleLock(mtimeMs, nowMs) {
	return typeof mtimeMs === "number" && nowMs - mtimeMs > CONFIG_CLOBBER_LOCK_STALE_MS;
}
async function acquireClobberLock(deps, lockPath) {
	const startedAt = Date.now();
	while (Date.now() - startedAt < CONFIG_CLOBBER_LOCK_TIMEOUT_MS) try {
		await deps.fs.promises.mkdir(lockPath, { mode: 448 });
		return true;
	} catch (error) {
		if (!isFsErrorCode(error, "EEXIST")) return false;
		if (shouldRemoveStaleLock((await deps.fs.promises.stat(lockPath).catch(() => null))?.mtimeMs, Date.now())) {
			await deps.fs.promises.rmdir(lockPath).catch(() => {});
			continue;
		}
		await sleep(CONFIG_CLOBBER_LOCK_RETRY_MS);
	}
	return false;
}
function acquireClobberLockSync(deps, lockPath) {
	for (let attempt = 0; attempt < 2; attempt++) try {
		deps.fs.mkdirSync(lockPath, { mode: 448 });
		return true;
	} catch (error) {
		if (!isFsErrorCode(error, "EEXIST")) return false;
		if (!shouldRemoveStaleLock(deps.fs.statSync(lockPath, { throwIfNoEntry: false })?.mtimeMs, Date.now())) return false;
		try {
			deps.fs.rmdirSync(lockPath);
		} catch {
			return false;
		}
	}
	return false;
}
function compareClobberedSiblings(left, right) {
	return left.timestampKey.localeCompare(right.timestampKey) || left.mtimeMs - right.mtimeMs || left.name.localeCompare(right.name);
}
function createClobberedSiblingSnapshot(params) {
	return {
		name: params.entry,
		path: path.join(params.dir, params.entry),
		timestampKey: params.entry.slice(params.prefix.length).replace(/-\d{2}$/, ""),
		mtimeMs: params.mtimeMs
	};
}
async function listClobberedSiblings(deps, dir, prefix) {
	try {
		const entries = await deps.fs.promises.readdir(dir);
		const snapshots = [];
		for (const entry of entries) {
			if (!entry.startsWith(prefix)) continue;
			const stat = await deps.fs.promises.stat(path.join(dir, entry)).catch(() => null);
			snapshots.push(createClobberedSiblingSnapshot({
				dir,
				entry,
				prefix,
				mtimeMs: stat?.mtimeMs ?? 0
			}));
		}
		return snapshots.toSorted(compareClobberedSiblings);
	} catch {
		return [];
	}
}
function listClobberedSiblingsSync(deps, dir, prefix) {
	try {
		const snapshots = [];
		for (const entry of deps.fs.readdirSync(dir)) {
			if (!entry.startsWith(prefix)) continue;
			const stat = deps.fs.statSync(path.join(dir, entry), { throwIfNoEntry: false });
			snapshots.push(createClobberedSiblingSnapshot({
				dir,
				entry,
				prefix,
				mtimeMs: stat?.mtimeMs ?? 0
			}));
		}
		return snapshots.toSorted(compareClobberedSiblings);
	} catch {
		return [];
	}
}
function warnClobberCapReached(deps, configPath, existing) {
	if (clobberCapWarnedPaths.check(configPath)) return;
	deps.logger.warn(`Config clobber snapshot cap reached for ${configPath}: ${existing} existing .clobbered.* files; rotating oldest snapshots to preserve the latest forensic copy.`);
}
async function rotateOldestClobberedSiblings(deps, snapshots) {
	const deleteCount = Math.max(0, snapshots.length - CONFIG_CLOBBER_SNAPSHOT_LIMIT + 1);
	for (const snapshot of snapshots.slice(0, deleteCount)) try {
		await deps.fs.promises.unlink(snapshot.path);
	} catch (error) {
		if (!isFsErrorCode(error, "ENOENT")) return false;
	}
	return true;
}
function rotateOldestClobberedSiblingsSync(deps, snapshots) {
	const deleteCount = Math.max(0, snapshots.length - CONFIG_CLOBBER_SNAPSHOT_LIMIT + 1);
	for (const snapshot of snapshots.slice(0, deleteCount)) try {
		deps.fs.unlinkSync(snapshot.path);
	} catch (error) {
		if (!isFsErrorCode(error, "ENOENT")) return false;
	}
	return true;
}
function buildClobberedTargetPath(configPath, observedAt, attempt) {
	const basePath = `${configPath}.clobbered.${formatConfigArtifactTimestamp(observedAt)}`;
	return attempt === 0 ? basePath : `${basePath}-${String(attempt).padStart(2, "0")}`;
}
async function persistBoundedClobberedConfigSnapshot(params) {
	const paths = resolveClobberPaths(params.configPath);
	return await clobberSnapshotQueue.enqueue(paths.lockPath, async () => {
		if (!await acquireClobberLock(params.deps, paths.lockPath)) return null;
		try {
			const existing = await listClobberedSiblings(params.deps, paths.dir, paths.prefix);
			if (existing.length >= CONFIG_CLOBBER_SNAPSHOT_LIMIT) {
				warnClobberCapReached(params.deps, params.configPath, existing.length);
				if (!await rotateOldestClobberedSiblings(params.deps, existing)) return null;
			}
			for (let attempt = 0; attempt < CONFIG_CLOBBER_SNAPSHOT_LIMIT; attempt++) {
				const targetPath = buildClobberedTargetPath(params.configPath, params.observedAt, attempt);
				try {
					await params.deps.fs.promises.writeFile(targetPath, params.raw, {
						encoding: "utf-8",
						mode: 384,
						flag: "wx"
					});
					return targetPath;
				} catch (error) {
					if (!isFsErrorCode(error, "EEXIST")) return null;
				}
			}
			return null;
		} finally {
			await params.deps.fs.promises.rmdir(paths.lockPath).catch(() => {});
		}
	});
}
function persistBoundedClobberedConfigSnapshotSync(params) {
	const paths = resolveClobberPaths(params.configPath);
	if (!acquireClobberLockSync(params.deps, paths.lockPath)) return null;
	try {
		const existing = listClobberedSiblingsSync(params.deps, paths.dir, paths.prefix);
		if (existing.length >= CONFIG_CLOBBER_SNAPSHOT_LIMIT) {
			warnClobberCapReached(params.deps, params.configPath, existing.length);
			if (!rotateOldestClobberedSiblingsSync(params.deps, existing)) return null;
		}
		for (let attempt = 0; attempt < CONFIG_CLOBBER_SNAPSHOT_LIMIT; attempt++) {
			const targetPath = buildClobberedTargetPath(params.configPath, params.observedAt, attempt);
			try {
				params.deps.fs.writeFileSync(targetPath, params.raw, {
					encoding: "utf-8",
					mode: 384,
					flag: "wx"
				});
				return targetPath;
			} catch (error) {
				if (!isFsErrorCode(error, "EEXIST")) return null;
			}
		}
		return null;
	} finally {
		try {
			params.deps.fs.rmdirSync(paths.lockPath);
		} catch {}
	}
}
//#endregion
//#region src/config/io.observe-recovery-effects.ts
function createConfigRecoveryStatEffect(deps, configPath, requireIdentity = false) {
	const unavailable = (error) => {
		if (requireIdentity && !hasErrnoCode(error, "ENOENT")) throw error;
		return null;
	};
	return {
		sync: () => {
			try {
				return deps.fs.statSync(configPath, { throwIfNoEntry: false }) ?? null;
			} catch (error) {
				return unavailable(error);
			}
		},
		async: () => deps.fs.promises.stat(configPath).catch(unavailable)
	};
}
function createConfigBackupMissingEffect(deps, backupPath) {
	return {
		sync: () => {
			try {
				deps.fs.statSync(backupPath);
				return false;
			} catch (error) {
				return hasErrnoCode(error, "ENOENT");
			}
		},
		async: () => deps.fs.promises.stat(backupPath).then(() => false, (error) => hasErrnoCode(error, "ENOENT"))
	};
}
function createConfigBackupReadEffect(deps, backupPath) {
	const unavailable = (error) => {
		if (!hasErrnoCode(error, "ENOENT")) throw error;
		return null;
	};
	return {
		sync: () => {
			try {
				return deps.fs.readFileSync(backupPath, "utf-8");
			} catch (error) {
				return unavailable(error);
			}
		},
		async: () => deps.fs.promises.readFile(backupPath, "utf-8").catch(unavailable)
	};
}
//#endregion
//#region src/config/io.observe-recovery.ts
async function commitRecoveryFileIfCurrent(params) {
	let superseded;
	try {
		await params.write(() => {
			params.beforeCommit?.();
			if (!params.health.isCurrent()) {
				superseded = /* @__PURE__ */ new Error("Config recovery observation was superseded");
				throw superseded;
			}
		});
		return true;
	} catch (error) {
		if (superseded && error === superseded) return false;
		throw error;
	}
}
function createRecoveryCommitEffect(params) {
	const options = {
		filePath: params.configPath,
		content: params.raw,
		dirMode: 448,
		mode: 384,
		tempPrefix: path.basename(params.configPath),
		fileSystem: params.deps.fs
	};
	return {
		sync: () => {
			replaceFileAtomicSync(options);
			return true;
		},
		async: (health) => commitRecoveryFileIfCurrent({
			health,
			beforeCommit: params.beforeCommit,
			write: (assertCurrent) => replaceFileAtomic({
				...options,
				copyFallbackOnPermissionError: false,
				fileSystem: { promises: {
					...params.deps.fs.promises,
					rename: (source, destination) => {
						assertCurrent();
						return params.deps.fs.promises.rename(source, destination);
					}
				} }
			})
		})
	};
}
function parseBackupConfigRaw(deps, backupRaw) {
	try {
		return { parsed: deps.json5.parse(backupRaw) };
	} catch {
		return null;
	}
}
async function maybeRecoverSuspiciousConfigRead(params) {
	try {
		var _usingCtx$1 = _usingCtx();
		const health = _usingCtx$1.u(captureConfigHealthStateStore(params.deps, params.configPath, params.assertCurrent));
		return await runConfigRecoveryAsync(recoverSuspiciousConfigRead(params), health, params.assertCurrent);
	} catch (_) {
		_usingCtx$1.e = _;
	} finally {
		_usingCtx$1.d();
	}
}
async function runConfigRecoveryAsync(recovery, health, assertCurrent) {
	assertCurrent?.();
	let step = recovery.next();
	while (!step.done) try {
		assertCurrent?.();
		const value = await step.value.async(health);
		assertCurrent?.();
		step = recovery.next(value);
	} catch (error) {
		assertCurrent?.();
		try {
			if (!health.isCurrent()) throw error;
		} catch {
			throw error;
		}
		step = recovery.throw(error);
	}
	return step.value;
}
function maybeRecoverSuspiciousConfigReadSync(params) {
	supersedeConfigHealthObservations(params.deps, params.configPath);
	const recovery = recoverSuspiciousConfigRead(params);
	let step = recovery.next();
	while (!step.done) try {
		step = recovery.next(step.value.sync());
	} catch (error) {
		step = recovery.throw(error);
	}
	return step.value;
}
/** Prepare the existing recovery without observing or writing the selected config. */
async function prepareSuspiciousConfigRead(params) {
	try {
		var _usingCtx3 = _usingCtx();
		const health = _usingCtx3.u(captureConfigHealthStateStore(params.deps, params.configPath, params.assertCurrent));
		const plan = await runConfigRecoveryAsync(planSuspiciousConfigRead(params, true), health);
		const captureApplyHealth = () => health.captureContinuation();
		return plan && {
			candidate: plan.candidate,
			apply: async (beforeCommit) => {
				try {
					var _usingCtx4 = _usingCtx();
					const applyHealth = _usingCtx4.u(captureApplyHealth());
					const assertAllowed = () => {
						if (!applyHealth.isCurrent()) throw new ConfigMutationConflictError("config recovery observation was superseded", { retryable: false });
						beforeCommit?.();
						plan.assertUnchanged();
					};
					assertAllowed();
					const currentPlan = await runConfigRecoveryAsync(planSuspiciousConfigRead(params, true), applyHealth);
					if (!currentPlan || !isDeepStrictEqual(currentPlan.candidate, plan.candidate)) throw new ConfigMutationConflictError("config recovery candidate changed since preparation", { retryable: false });
					const assertCurrentPlan = () => {
						assertAllowed();
						currentPlan.assertUnchanged();
					};
					assertCurrentPlan();
					const result = await runConfigRecoveryAsync(currentPlan.apply(assertCurrentPlan), applyHealth);
					if (result.superseded) throw new ConfigMutationConflictError("config recovery observation was superseded", { retryable: false });
					if (!result.restored) throw result.error;
				} catch (_) {
					_usingCtx4.e = _;
				} finally {
					_usingCtx4.d();
				}
			}
		};
	} catch (_) {
		_usingCtx3.e = _;
	} finally {
		_usingCtx3.d();
	}
}
function* recoverSuspiciousConfigRead(params) {
	const { raw, parsed } = params;
	const plan = yield* planSuspiciousConfigRead(params);
	if (!plan) return {
		raw,
		parsed
	};
	if (params.allowBackupRecovery) {
		if (!(yield {
			sync: () => true,
			async: () => params.allowBackupRecovery?.() ?? true
		})) return {
			raw,
			parsed
		};
	}
	return (yield* plan.apply()).superseded ? {
		raw,
		parsed
	} : plan.candidate;
}
function* planSuspiciousConfigRead(params, requireIdentity = false) {
	const { deps, configPath, raw, parsed } = params;
	if (resolveIsConfigReadOnly(deps.env)) return null;
	const backupPath = `${configPath}.bak`;
	if (yield createConfigBackupMissingEffect(deps, backupPath)) return null;
	const stat = yield createConfigRecoveryStatEffect(deps, configPath, requireIdentity);
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const current = createConfigHealthFingerprint({
		raw,
		parsed,
		stat,
		observedAt: now
	});
	const healthSnapshot = yield {
		sync: () => ({
			state: readConfigHealthStateFromStore(deps),
			basis: null
		}),
		async: (health) => health.read()
	};
	if (!healthSnapshot) return null;
	const healthState = healthSnapshot.state;
	const entry = readConfigHealthEntry(healthState, configPath);
	let backupRaw = null;
	if (!entry.lastKnownGood) backupRaw = yield createConfigBackupReadEffect(deps, backupPath);
	const recoveryContext = resolveConfigReadRecoveryContext({
		current,
		parsed,
		entry,
		backupBaseline: entry.lastKnownGood ?? (backupRaw ? createConfigHealthFingerprint({
			raw: backupRaw,
			parsed: parseBackupConfigRaw(deps, backupRaw)?.parsed ?? {},
			stat: null
		}) : void 0)
	});
	if (!recoveryContext) return null;
	const { suspicious, suspiciousSignature } = recoveryContext;
	backupRaw ??= yield createConfigBackupReadEffect(deps, backupPath);
	if (!backupRaw) return null;
	const backupParse = parseBackupConfigRaw(deps, backupRaw);
	if (!backupParse || !resolveGatewayMode(backupParse.parsed)) return null;
	const backupCandidate = {
		raw: backupRaw,
		parsed: backupParse.parsed
	};
	const prepared = yield {
		sync: () => params.prepareBackup(backupCandidate),
		async: () => params.prepareBackupAsync?.(backupCandidate) ?? params.prepareBackup(backupCandidate)
	};
	if (!prepared.ok) return null;
	const preparedCandidate = prepared.candidate;
	const backupStat = yield createConfigRecoveryStatEffect(deps, backupPath, requireIdentity);
	const backup = createConfigHealthFingerprint({
		raw: backupRaw,
		parsed: backupParse.parsed,
		stat: backupStat
	});
	const currentObservation = {
		sync: () => true,
		async: (health) => health.isCurrent()
	};
	if (!(yield currentObservation)) return null;
	return {
		candidate: preparedCandidate,
		assertUnchanged: () => {
			for (const [pathname, expectedRaw, expectedStat] of [[
				configPath,
				raw,
				stat
			], [
				backupPath,
				backupRaw,
				backupStat
			]]) {
				const actualRaw = createConfigBackupReadEffect(deps, pathname).sync();
				const actualStat = createConfigRecoveryStatEffect(deps, pathname, true).sync();
				if (actualRaw !== expectedRaw || !actualStat || !expectedStat || actualStat.dev !== expectedStat.dev || actualStat.ino !== expectedStat.ino || actualStat.mtimeMs !== expectedStat.mtimeMs || actualStat.size !== expectedStat.size) throw new ConfigMutationConflictError("config recovery source changed since preparation", { retryable: false });
			}
		},
		*apply(beforeCommit) {
			if (!(yield currentObservation)) return {
				restored: false,
				error: void 0,
				superseded: true
			};
			const snapshotParams = {
				deps,
				configPath,
				raw,
				observedAt: now
			};
			const clobberedPath = yield {
				sync: () => persistBoundedClobberedConfigSnapshotSync(snapshotParams),
				async: () => persistBoundedClobberedConfigSnapshot(snapshotParams)
			};
			if (!(yield currentObservation)) return {
				restored: false,
				error: void 0,
				superseded: true
			};
			let restoredFromBackup = false;
			let restoreError;
			try {
				if (preparedCandidate.raw !== backupRaw) warnIfJSON5CommentsWillBeStripped({
					raw: backupRaw,
					filePath: configPath,
					warn: (message) => deps.logger.warn(message)
				});
				if (!(yield createRecoveryCommitEffect({
					deps,
					configPath,
					raw: preparedCandidate.raw,
					beforeCommit
				}))) return {
					restored: false,
					error: void 0,
					superseded: true
				};
				const chmodParams = {
					deps,
					configPath,
					context: "backup restore"
				};
				yield {
					sync: () => chmodConfigBestEffortSync(chmodParams),
					async: () => chmodConfigBestEffort(chmodParams)
				};
				restoredFromBackup = true;
			} catch (error) {
				restoreError = error;
			}
			const restoreErrorDetails = restoredFromBackup ? {
				code: null,
				message: null
			} : extractRestoreErrorDetails(restoreError);
			const result = restoredFromBackup ? "auto-restored from backup" : "auto-restore from backup failed";
			const detail = !restoredFromBackup && restoreErrorDetails.message ? `; ${restoreErrorDetails.message}` : "";
			deps.logger.warn(`Config ${result}: ${configPath} (${suspicious.join(", ")}${detail})`);
			const audit = {
				env: deps.env,
				homedir: deps.homedir,
				record: createConfigObserveAuditRecord({
					configPath,
					valid: restoredFromBackup,
					current,
					suspicious,
					lastKnownGood: entry.lastKnownGood,
					backup,
					clobberedPath,
					restoredFromBackup,
					restoredBackupPath: backupPath,
					restoreErrorCode: restoreErrorDetails.code,
					restoreErrorMessage: restoreErrorDetails.message
				})
			};
			yield {
				sync: () => appendConfigAuditRecordSync(audit),
				async: () => appendConfigAuditRecord(audit, params.assertCurrent)
			};
			if (restoredFromBackup) yield {
				sync: () => patchConfigHealthEntryToStore(deps, configPath, { lastObservedSuspiciousSignature: suspiciousSignature }),
				async: (health) => health.updateAfterFileCommit({ lastObservedSuspiciousSignature: suspiciousSignature }, healthSnapshot)
			};
			return {
				restored: restoredFromBackup,
				error: restoreError
			};
		}
	};
}
/** True reports committed file work; health metadata remains best-effort. */
async function promoteConfigSnapshotToLastKnownGoodCore(params) {
	try {
		var _usingCtx5 = _usingCtx();
		const { deps, snapshot } = params;
		if (resolveIsConfigReadOnly(deps.env)) return false;
		if (!snapshot.exists || !snapshot.valid || typeof snapshot.raw !== "string") return false;
		const polluted = collectPollutedSecretPlaceholders(snapshot.parsed);
		if (polluted.length > 0) {
			params.logger?.warn(`Config last-known-good promotion skipped: redacted secret placeholder at ${polluted[0]}`);
			return false;
		}
		const health = _usingCtx5.u(captureConfigHealthStateStore(deps, snapshot.path));
		const healthSnapshot = await health.read();
		if (!healthSnapshot) return false;
		const stat = await deps.fs.promises.stat(snapshot.path).catch(() => null);
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const current = createConfigHealthFingerprint({
			raw: snapshot.raw,
			parsed: snapshot.parsed,
			resolved: snapshot.resolved,
			stat,
			observedAt: now
		});
		const lastGoodPath = `${snapshot.path}.last-good`;
		if (!health.isCurrent()) return false;
		const raw = snapshot.raw;
		if (!await commitRecoveryFileIfCurrent({
			health,
			write: async (assertCurrent) => {
				await (await root(path.dirname(lastGoodPath))).write(path.basename(lastGoodPath), raw, {
					mkdir: false,
					mode: 384,
					durable: false,
					encoding: "utf8",
					overwrite: true,
					assertBeforeMutation: assertCurrent
				});
			}
		})) return false;
		await chmodConfigBestEffort({
			deps,
			configPath: lastGoodPath,
			context: "last-known-good promotion"
		});
		await health.updateAfterFileCommit({
			lastKnownGood: current,
			lastPromotedGood: current,
			lastObservedSuspiciousSignature: null
		}, healthSnapshot);
		return true;
	} catch (_) {
		_usingCtx5.e = _;
	} finally {
		_usingCtx5.d();
	}
}
/** True lets recovery callers reread the changed file even if newer health facts win. */
async function recoverConfigFromLastKnownGoodCore(params) {
	try {
		var _usingCtx6 = _usingCtx();
		const { deps, snapshot } = params;
		if (resolveIsConfigReadOnly(deps.env)) return false;
		if (!snapshot.exists || typeof snapshot.raw !== "string") return false;
		if (!shouldAttemptLastKnownGoodRecovery(snapshot)) {
			if (isPluginLocalInvalidConfigSnapshot(snapshot)) deps.logger.warn(`Config last-known-good recovery skipped: invalidity is scoped to stale plugin config (${params.reason})`);
			return false;
		}
		const health = _usingCtx6.u(captureConfigHealthStateStore(deps, snapshot.path));
		const healthSnapshot = await health.read();
		if (!healthSnapshot) return false;
		const promoted = readConfigHealthEntry(healthSnapshot.state, snapshot.path).lastPromotedGood;
		if (!promoted?.hash) return false;
		const lastGoodPath = `${snapshot.path}.last-good`;
		const backupRaw = await deps.fs.promises.readFile(lastGoodPath, "utf-8").catch(() => null);
		if (!backupRaw || hashConfigRaw(backupRaw) !== promoted.hash) return false;
		const backupParse = parseBackupConfigRaw(deps, backupRaw);
		if (!backupParse) return false;
		const originalCandidate = {
			raw: backupRaw,
			parsed: backupParse.parsed
		};
		const prepared = params.prepareCandidate(originalCandidate);
		if (!prepared.ok) {
			deps.logger.warn(`Config last-known-good recovery skipped: ${prepared.reason} (${params.reason})`);
			return false;
		}
		const recoveryCandidate = prepared.candidate;
		const polluted = collectPollutedSecretPlaceholders(recoveryCandidate.parsed);
		if (polluted.length > 0) {
			deps.logger.warn(`Config last-known-good recovery skipped: redacted secret placeholder at ${polluted[0]}`);
			return false;
		}
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const stat = await deps.fs.promises.stat(snapshot.path).catch(() => null);
		const current = createConfigHealthFingerprint({
			raw: snapshot.raw,
			parsed: snapshot.parsed,
			resolved: snapshot.resolved,
			stat,
			observedAt: now
		});
		if (!health.isCurrent()) return false;
		const clobberedPath = await persistBoundedClobberedConfigSnapshot({
			deps,
			configPath: snapshot.path,
			raw: snapshot.raw,
			observedAt: now
		});
		if (!health.isCurrent()) return false;
		if (recoveryCandidate.raw !== backupRaw) warnIfJSON5CommentsWillBeStripped({
			raw: backupRaw,
			filePath: snapshot.path,
			warn: (message) => deps.logger.warn(message)
		});
		if (!await createRecoveryCommitEffect({
			deps,
			configPath: snapshot.path,
			raw: recoveryCandidate.raw
		}).async(health)) return false;
		await chmodConfigBestEffort({
			deps,
			configPath: snapshot.path,
			context: "last-known-good recovery"
		});
		const issueSummary = formatConfigIssueSummary([...snapshot.issues, ...snapshot.legacyIssues]);
		deps.logger.warn(`Config auto-restored from last-known-good: ${snapshot.path} (${params.reason})${issueSummary ? `; Rejected validation details: ${issueSummary}.` : ""}`);
		await appendConfigAuditRecord({
			env: deps.env,
			homedir: deps.homedir,
			record: createConfigObserveAuditRecord({
				configPath: snapshot.path,
				valid: snapshot.valid,
				current,
				suspicious: [params.reason],
				lastKnownGood: promoted,
				backup: promoted,
				clobberedPath,
				restoredFromBackup: true,
				restoredBackupPath: lastGoodPath
			})
		});
		await health.updateAfterFileCommit({
			lastKnownGood: promoted,
			lastPromotedGood: promoted,
			lastObservedSuspiciousSignature: null
		}, healthSnapshot);
		return true;
	} catch (_) {
		_usingCtx6.e = _;
	} finally {
		_usingCtx6.d();
	}
}
//#endregion
//#region src/config/io.runtime-env.ts
function maybeLoadDotEnvForConfig(env) {
	if (env === process.env) loadDotEnv({ quiet: true });
}
function resolveManagedRuntimeEnvBaseline() {
	const published = getPublishedConfigRuntimeEnvState();
	return {
		generation: published.generation,
		sourceConfig: published.sourceConfig ?? getRuntimeConfigSourceSnapshot() ?? {}
	};
}
function createManagedRuntimeEnvBase(env = process.env) {
	return createConfigRuntimeEnvBase(resolveManagedRuntimeEnvBaseline().sourceConfig, env, {
		ownedEnv: getPublishedConfigRuntimeEnvState().ownedEnv,
		preservedKeys: GATEWAY_CONFIG_SELECTION_ENV_KEYS
	});
}
//#endregion
//#region src/config/io.snapshot-shared.ts
function createConfigFileSnapshot(params) {
	const sourceConfigBeforeMigrations = params.sourceConfigBeforeMigrations ? asResolvedSourceConfig(params.sourceConfigBeforeMigrations) : void 0;
	const sourceConfig = asResolvedSourceConfig(params.sourceConfig);
	setDeferredPluginMigrationConfigFacts(sourceConfig, params.deferredPluginMigrations);
	const runtimeConfig = asRuntimeConfig(params.runtimeConfig);
	if (params.resolutionFacts !== void 0) {
		setConfigResolutionFacts(sourceConfigBeforeMigrations, params.resolutionFacts);
		setConfigResolutionFacts(sourceConfig, params.resolutionFacts);
		setConfigResolutionFacts(runtimeConfig, params.resolutionFacts);
	}
	return {
		path: params.path,
		includedPaths: [...params.includedPaths ?? []],
		...params.includeProvenance ? { includeProvenance: params.includeProvenance.map((entry) => ({
			...entry,
			path: [...entry.path],
			...entry.targetPaths ? { targetPaths: [...entry.targetPaths] } : {}
		})) } : {},
		...params.agentRosterIncludeOwned !== void 0 ? { agentRosterIncludeOwned: params.agentRosterIncludeOwned } : {},
		...params.bindingsIncludeOwned !== void 0 ? { bindingsIncludeOwned: params.bindingsIncludeOwned } : {},
		exists: params.exists,
		raw: params.raw,
		parsed: params.parsed,
		...params.authoredConfig ? { authoredConfig: params.authoredConfig } : {},
		...sourceConfigBeforeMigrations ? { sourceConfigBeforeMigrations } : {},
		sourceConfig,
		resolved: sourceConfig,
		valid: params.valid,
		runtimeConfig,
		config: runtimeConfig,
		hash: params.hash,
		...params.readError ? { readError: params.readError } : {},
		issues: params.issues,
		warnings: params.warnings,
		legacyIssues: params.legacyIssues
	};
}
async function finalizeReadConfigSnapshotInternalResult(deps, result, options) {
	if (deps.observe && options?.observe !== false) await observeConfigSnapshot(deps, result.snapshot);
	return result;
}
async function collectInvalidConfigLegacyIssues(raw, sourceRaw) {
	if (!raw || typeof raw !== "object") return [];
	const { findDoctorLegacyConfigIssues } = await import("./legacy-config-issues-Dk2EQVjh.mjs");
	return findDoctorLegacyConfigIssues(raw, sourceRaw);
}
//#endregion
//#region src/config/io.load.ts
function* resolveConfigLoadEffect(effect) {
	let result;
	yield {
		sync: () => {
			result = effect.sync();
		},
		async: async () => {
			result = await effect.async();
		}
	};
	return result;
}
function loadConfigFromContext(context, options = {}) {
	const operation = loadConfigWithEffects(context, options);
	let step = operation.next();
	while (!step.done) try {
		options.assertCurrent?.();
		step.value.sync();
		options.assertCurrent?.();
		step = operation.next();
	} catch (error) {
		step = operation.throw(error);
	}
	return step.value;
}
async function loadConfigFromContextAsync(context, options = {}) {
	if (!isMainThread) return loadConfigFromContext(context, options);
	const operation = loadConfigWithEffects(context, options);
	let step = operation.next();
	while (!step.done) try {
		options.assertCurrent?.();
		await step.value.async();
		options.assertCurrent?.();
		step = operation.next();
	} catch (error) {
		step = operation.throw(error);
	}
	return step.value;
}
function* loadConfigWithEffects(context, options) {
	const { deps, configPath, pathResolution } = context;
	let envBeforeRead;
	try {
		yield* resolveConfigLoadEffect({
			sync: () => maybeLoadDotEnvForConfig(deps.env),
			async: async () => {
				if (deps.env === process.env) await loadDotEnvAsync({
					env: deps.env,
					quiet: true
				});
			}
		});
		envBeforeRead = snapshotEnv(deps.env);
		if (!(yield* resolveConfigLoadEffect({
			sync: () => deps.fs.existsSync(configPath),
			async: () => deps.fs.promises.access(configPath).then(() => true, () => false)
		}))) {
			loggedConfigWarningFingerprints.delete(configPath);
			const config = coerceConfig(migratePersistedImplicitMainRoster({}).config);
			const metadata = context.createValidationPluginMetadataSnapshotLoader({ env: deps.env });
			const materialized = yield* resolveConfigLoadEffect({
				sync: () => materializeRuntimeConfig(config, {
					...pathResolution,
					...context.options.pluginValidation === "core-only" ? { manifestRegistry: { plugins: [] } } : { loadManifestRegistry: () => metadata.load(config).manifestRegistry }
				}),
				async: async () => materializeRuntimeConfig(config, {
					...pathResolution,
					manifestRegistry: context.options.pluginValidation === "core-only" ? { plugins: [] } : (await metadata.loadAsync(config)).manifestRegistry
				})
			});
			return yield* resolveConfigLoadEffect({
				sync: () => context.finalizeLoadedRuntimeConfig(materialized),
				async: () => context.finalizeLoadedRuntimeConfigAsync(materialized, metadata, options.assertCurrent)
			});
		}
		const raw = yield* resolveConfigLoadEffect({
			sync: () => deps.fs.readFileSync(configPath, "utf-8"),
			async: () => deps.fs.promises.readFile(configPath, "utf-8")
		});
		const parsed = deps.json5.parse(raw);
		const readResolution = resolveConfigForRead(resolveConfigIncludesForRead(parsed, configPath, deps), deps.env, deps.lowerPrecedenceEnv);
		const contextBudgetMigration = migrateLegacyContextBudgetConfig(readResolution.resolvedConfigRaw);
		const rosterMigration = migratePersistedImplicitMainRoster(contextBudgetMigration.config, {
			env: deps.env,
			homedir: deps.homedir
		});
		const effectiveConfigRaw = rosterMigration.config;
		const hash = hashConfigRaw(raw);
		for (const warning of readResolution.envWarnings) deps.logger.warn(`Config (${configPath}): missing env var "${warning.varName}" at ${warning.configPath} - feature using this value will be unavailable`);
		for (const diagnostic of [
			...contextBudgetMigration.changes.map(({ message }) => message),
			...contextBudgetMigration.warnings.map(({ message }) => message),
			...rosterMigration.diagnostics
		]) deps.logger.warn(`Config (${configPath}): ${diagnostic}`);
		warnOnConfigMiskeys(effectiveConfigRaw, deps.logger);
		if (typeof effectiveConfigRaw === "object" && effectiveConfigRaw !== null) {
			const duplicates = findDuplicateAgentDirs(effectiveConfigRaw, pathResolution);
			if (duplicates.length > 0) throw new DuplicateAgentDirError(duplicates);
		}
		const pluginMetadata = context.createValidationPluginMetadataSnapshotLoader({ env: deps.env });
		const validationParams = {
			...pathResolution,
			pluginValidation: context.options.pluginValidation,
			sourceRaw: parsed,
			preservedLegacyRootKeys: context.options.preservedLegacyRootKeys
		};
		const { deferredPluginMigrations, validated } = yield* resolveConfigLoadEffect({
			sync: () => withSynchronousArtifactPreservingStateSnapshot(() => {
				const pending = context.resolveDeferredPluginMigrations();
				return {
					deferredPluginMigrations: pending,
					validated: validateConfigObjectWithPlugins(effectiveConfigRaw, {
						...validationParams,
						deferredPluginMigrations: pending,
						loadPluginMetadataSnapshot: pluginMetadata.load
					})
				};
			}),
			async: async () => {
				const pending = await context.resolveDeferredPluginMigrationsAsync();
				return {
					deferredPluginMigrations: pending,
					validated: await validateConfigObjectWithPluginsAsync(effectiveConfigRaw, {
						...validationParams,
						deferredPluginMigrations: pending,
						loadPluginMetadataSnapshotAsync: pluginMetadata.loadAsync
					})
				};
			}
		});
		if (!validated.ok) {
			const invalidSnapshot = createConfigFileSnapshot({
				path: configPath,
				exists: true,
				raw,
				parsed,
				sourceConfig: coerceConfig(effectiveConfigRaw),
				valid: false,
				runtimeConfig: coerceConfig(effectiveConfigRaw),
				hash,
				issues: validated.issues,
				deferredPluginMigrations,
				warnings: validated.warnings,
				resolutionFacts: readResolution.resolutionFacts,
				legacyIssues: []
			});
			yield* resolveConfigLoadEffect({
				sync: () => context.observeLoadConfigSnapshot(invalidSnapshot),
				async: () => context.observeLoadConfigSnapshotAsync(invalidSnapshot, options.assertCurrent)
			});
			throwInvalidConfig({
				configPath,
				issues: validated.issues,
				logger: deps.logger,
				loggedConfigPaths: loggedInvalidConfigs
			});
		}
		if (context.options.pluginValidation !== "skip") logConfigWarningsOnce({
			configPath,
			warnings: validated.warnings,
			logger: deps.logger
		});
		if (!deps.suppressFutureVersionWarning) warnIfConfigFromFuture(validated.config, deps.logger);
		if (deps.observe && !options.skipSuspiciousRecovery && !containsConfigIncludeDirective(parsed)) {
			const recoveryParams = {
				deps,
				configPath,
				raw,
				parsed,
				prepareBackup: context.prepareRecoveryBackupCandidate
			};
			if ((yield* resolveConfigLoadEffect({
				sync: () => maybeRecoverSuspiciousConfigReadSync(recoveryParams),
				async: () => maybeRecoverSuspiciousConfigRead({
					...recoveryParams,
					prepareBackupAsync: context.prepareRecoveryBackupCandidateAsync,
					assertCurrent: options.assertCurrent
				})
			})).raw !== raw) {
				restoreEnvChangesIfUnchanged({
					env: deps.env,
					before: envBeforeRead,
					after: snapshotEnv(deps.env)
				});
				return yield* loadConfigWithEffects(context, {
					...options,
					skipSuspiciousRecovery: true
				});
			}
		}
		const cfg = materializeRuntimeConfig(validated.config, {
			...pathResolution,
			manifestRegistry: context.options.pluginValidation === "core-only" ? { plugins: [] } : pluginMetadata.getManifestRegistry()
		});
		const snapshot = createConfigFileSnapshot({
			path: configPath,
			exists: true,
			raw,
			parsed,
			sourceConfig: coerceConfig(effectiveConfigRaw),
			valid: true,
			runtimeConfig: cfg,
			deferredPluginMigrations,
			hash,
			issues: [],
			warnings: validated.warnings,
			resolutionFacts: readResolution.resolutionFacts,
			legacyIssues: []
		});
		yield* resolveConfigLoadEffect({
			sync: () => context.observeLoadConfigSnapshot(snapshot),
			async: () => context.observeLoadConfigSnapshotAsync(snapshot, options.assertCurrent)
		});
		return yield* resolveConfigLoadEffect({
			sync: () => context.finalizeLoadedRuntimeConfig(cfg),
			async: () => context.finalizeLoadedRuntimeConfigAsync(cfg, pluginMetadata, options.assertCurrent)
		});
	} catch (error) {
		if (envBeforeRead) restoreEnvChangesIfUnchanged({
			env: deps.env,
			before: envBeforeRead,
			after: snapshotEnv(deps.env)
		});
		if (error instanceof DuplicateAgentDirError) {
			deps.logger.error(error.message);
			throw error;
		}
		if (error?.code === "INVALID_CONFIG") throw error;
		deps.logger.error(`Failed to read config at ${configPath}: ${formatErrorMessage(error)}`);
		throw error;
	}
}
//#endregion
//#region src/config/io.recovery.ts
function findJsonRootSuffix(raw, json5) {
	if (/^\s*(?:\{|\[)/.test(raw)) return null;
	let offset = 0;
	while (offset < raw.length) {
		const nextNewline = raw.indexOf("\n", offset);
		const lineEnd = nextNewline === -1 ? raw.length : nextNewline + 1;
		const line = raw.slice(offset, lineEnd);
		if (/^\s*(?:\{|\[)/.test(line)) {
			const candidate = raw.slice(offset);
			const parsed = parseConfigJson5(candidate, json5);
			return parsed.ok ? {
				raw: candidate,
				parsed: parsed.parsed
			} : null;
		}
		offset = lineEnd;
	}
	return null;
}
async function persistPrefixedConfigRecovery(params) {
	const { context } = params;
	const observedAt = (/* @__PURE__ */ new Date()).toISOString();
	const clobberedPath = await persistBoundedClobberedConfigSnapshot({
		deps: context.deps,
		configPath: context.configPath,
		raw: params.originalRaw,
		observedAt
	});
	await replaceFileAtomic({
		filePath: context.configPath,
		content: params.recoveredRaw,
		dirMode: 448,
		mode: 384,
		tempPrefix: path.basename(context.configPath),
		fileSystem: context.deps.fs
	});
	context.deps.logger.warn(`Config auto-stripped non-JSON prefix: ${context.configPath}` + (clobberedPath ? ` (original saved as ${clobberedPath})` : ""));
}
async function recoverConfigFromJsonRootSuffixWithContext(context, snapshot) {
	if (resolveIsConfigReadOnly(context.deps.env)) return false;
	if (!snapshot.exists || snapshot.valid || typeof snapshot.raw !== "string") return false;
	const suffixRecovery = findJsonRootSuffix(snapshot.raw, context.deps.json5);
	if (!suffixRecovery) return false;
	let resolved;
	try {
		resolved = resolveConfigIncludesForRead(suffixRecovery.parsed, context.configPath, context.deps);
	} catch {
		return false;
	}
	const resolution = resolveConfigForRead(resolved, context.deps.env, context.deps.lowerPrecedenceEnv);
	if (!validateConfigObjectWithPlugins(resolution.resolvedConfigRaw, {
		...context.pathResolution,
		sourceRaw: suffixRecovery.parsed
	}).ok) return false;
	await persistPrefixedConfigRecovery({
		context,
		originalRaw: snapshot.raw,
		recoveredRaw: suffixRecovery.raw
	});
	return true;
}
//#endregion
//#region src/config/io.snapshot.ts
function listResolvedIncludePaths(includeFilePathsForWatch) {
	return [...includeFilePathsForWatch].toSorted();
}
async function readConfigFileSnapshotInternal(context, options = {}, sourceRaw) {
	const preparation = options.preparation === void 0 ? captureManagedConfigSnapshotPreparation(context.configPath) : options.preparation;
	preparation?.assertCurrent();
	const result = await readConfigSnapshotWithPreparation(context, {
		...options,
		preparation
	}, sourceRaw);
	preparation?.assertCurrent();
	return result;
}
async function readConfigSnapshotWithPreparation(context, options, sourceRaw) {
	const { deps, configPath, pathResolution } = context;
	const preparation = options.preparation;
	const assertReadCurrent = createConfigWriteAuthorityGuard(captureConfigWriteLockGuard(configPath), preparation?.assertCurrent);
	assertReadCurrent();
	captureConfigReadEnvMutation(deps.env, () => maybeLoadDotEnvForConfig(deps.env));
	let restoreReadEnv;
	let fallbackRaw = null;
	let fallbackParsed = {};
	let fallbackSourceConfig = {};
	let fallbackHash = hashConfigRaw(null);
	let fallbackEnvSnapshotForRestore;
	const includeFileHashesForWrite = {};
	const includeFileTargetsForWrite = {};
	const includeFilePathsForWatch = /* @__PURE__ */ new Set();
	const includeProvenance = [];
	let agentRosterIncludeOwned = false;
	let bindingsIncludeOwned = false;
	try {
		const raw = await deps.measure("config.snapshot.read.file", () => sourceRaw ?? readConfigFileIfPresent(deps, configPath));
		if (raw === void 0) {
			const migrated = migratePersistedImplicitMainRoster({});
			const config = coerceConfig(migrated.config);
			const metadata = context.createValidationPluginMetadataSnapshotLoader({
				env: deps.env,
				allowCurrentPluginMetadata: options.allowCurrentPluginMetadata
			});
			return await finalizeReadConfigSnapshotInternalResult(deps, {
				snapshot: createConfigFileSnapshot({
					path: configPath,
					exists: false,
					raw: null,
					parsed: {},
					sourceConfig: config,
					valid: true,
					runtimeConfig: preparation ? await preparation((prepare) => prepare({
						kind: "materialize",
						context,
						metadata,
						config
					})) : materializeConfigSnapshotDefaults(context, config, metadata),
					hash: hashConfigRaw(null),
					issues: [],
					warnings: [],
					legacyIssues: []
				}),
				pluginMetadataSnapshot: metadata.getSnapshot()
			});
		}
		const rawHash = await deps.measure("config.snapshot.read.hash", () => hashConfigRaw(raw));
		fallbackRaw = raw;
		fallbackHash = rawHash;
		const parsedRes = await deps.measure("config.snapshot.read.parse", () => parseConfigJson5(raw, deps.json5));
		if (!parsedRes.ok) return await finalizeReadConfigSnapshotInternalResult(deps, { snapshot: createConfigFileSnapshot({
			path: configPath,
			includedPaths: listResolvedIncludePaths(includeFilePathsForWatch),
			exists: true,
			raw,
			parsed: {},
			sourceConfig: {},
			valid: false,
			runtimeConfig: {},
			hash: rawHash,
			issues: [{
				path: "",
				errorCode: "CONFIG_SOURCE_INVALID",
				message: `JSON5 parse failed: ${parsedRes.error}`
			}],
			warnings: [],
			legacyIssues: []
		}) });
		const effectiveParsed = parsedRes.parsed;
		fallbackParsed = effectiveParsed;
		fallbackSourceConfig = coerceConfig(effectiveParsed);
		let resolved;
		try {
			resolved = await deps.measure("config.snapshot.read.includes", () => resolveConfigIncludesForRead(effectiveParsed, configPath, deps, includeFileHashesForWrite, includeFileTargetsForWrite, includeFilePathsForWatch, (event) => {
				const { value: _value, ...ownership } = event;
				includeProvenance.push(ownership);
				agentRosterIncludeOwned ||= includeContributionOwnsAgentRoster(event);
				bindingsIncludeOwned ||= includeContributionOwnsBindings(event);
			}));
		} catch (error) {
			if (findStartupMaintenanceRequiredError(error)) throw error;
			const message = error instanceof ConfigIncludeError ? error.message : `Include resolution failed: ${String(error)}`;
			return await finalizeReadConfigSnapshotInternalResult(deps, {
				snapshot: createConfigFileSnapshot({
					path: configPath,
					includedPaths: listResolvedIncludePaths(includeFilePathsForWatch),
					exists: true,
					raw,
					parsed: effectiveParsed,
					sourceConfig: coerceConfig(effectiveParsed),
					valid: false,
					runtimeConfig: coerceConfig(effectiveParsed),
					hash: rawHash,
					issues: [{
						path: "",
						errorCode: error instanceof ConfigIncludeReadError || !(error instanceof ConfigIncludeError) ? "CONFIG_READ_FAILED" : "CONFIG_SOURCE_INVALID",
						message
					}],
					warnings: [],
					legacyIssues: []
				}),
				includeFileHashesForWrite,
				includeFileTargetsForWrite
			});
		}
		const readResolution = await deps.measure("config.snapshot.read.env", () => {
			assertReadCurrent();
			return captureConfigReadEnvMutation(deps.env, () => resolveConfigForRead(resolved, deps.env, deps.lowerPrecedenceEnv), (restore) => {
				restoreReadEnv = restore;
			});
		});
		fallbackEnvSnapshotForRestore = readResolution.envSnapshotForRestore;
		const envVarWarnings = readResolution.envWarnings.map((warning) => ({
			path: warning.configPath,
			message: `Missing env var "${warning.varName}" - feature using this value will be unavailable`
		}));
		const contextBudgetMigration = migrateLegacyContextBudgetConfig(readResolution.resolvedConfigRaw);
		const rosterMigration = migratePersistedImplicitMainRoster(contextBudgetMigration.config, {
			env: deps.env,
			homedir: deps.homedir
		});
		envVarWarnings.push(...contextBudgetMigration.changes, ...contextBudgetMigration.warnings, ...rosterMigration.diagnostics.map((message) => ({
			path: "agents.entries",
			message
		})));
		const effectiveConfigRaw = rosterMigration.config;
		const snapshotHash = hashConfigRevision(raw, includeFileHashesForWrite, includeFileTargetsForWrite);
		fallbackHash = snapshotHash;
		fallbackSourceConfig = coerceConfig(effectiveConfigRaw);
		const pluginMetadata = context.createValidationPluginMetadataSnapshotLoader({
			env: deps.env,
			allowCurrentPluginMetadata: options.allowCurrentPluginMetadata
		});
		const validationRequest = {
			kind: "validate",
			prepareValidation: options.prepareValidation,
			context,
			metadata: pluginMetadata,
			raw: effectiveConfigRaw,
			sourceRaw: effectiveParsed
		};
		const { deferredPluginMigrations, validated } = await deps.measure("config.snapshot.read.validate", () => preparation ? preparation((prepare) => prepare(validationRequest)) : options.prepareValidation ? prepareConfigSnapshotValidation(validationRequest) : withSynchronousArtifactPreservingStateSnapshot(() => {
			const pending = context.resolveDeferredPluginMigrations();
			return {
				deferredPluginMigrations: pending,
				validated: validateConfigObjectWithPlugins(effectiveConfigRaw, {
					...pathResolution,
					pluginValidation: context.options.pluginValidation,
					loadPluginMetadataSnapshot: pluginMetadata.load,
					sourceRaw: effectiveParsed,
					preservedLegacyRootKeys: context.options.preservedLegacyRootKeys,
					deferredPluginMigrations: pending
				})
			};
		}));
		const snapshotSource = () => ({
			path: configPath,
			includedPaths: listResolvedIncludePaths(includeFilePathsForWatch),
			exists: true,
			raw,
			parsed: effectiveParsed,
			authoredConfig: coerceConfig(resolved),
			includeProvenance,
			agentRosterIncludeOwned,
			bindingsIncludeOwned,
			sourceConfigBeforeMigrations: coerceConfig(readResolution.resolvedConfigRaw),
			sourceConfig: coerceConfig(effectiveConfigRaw),
			hash: snapshotHash,
			deferredPluginMigrations,
			warnings: [...validated.warnings, ...envVarWarnings],
			resolutionFacts: readResolution.resolutionFacts
		});
		if (!validated.ok) {
			const availableSnapshot = pluginMetadata.getSnapshot();
			const collect = () => context.options.pluginValidation === "core-only" ? findLegacyConfigIssues(effectiveConfigRaw, effectiveParsed) : collectInvalidConfigLegacyIssues(effectiveConfigRaw, effectiveParsed);
			const legacyIssues = await deps.measure("config.snapshot.read.legacy-issues", () => availableSnapshot ? withPluginMetadataSnapshotScope(availableSnapshot, collect, {
				config: coerceConfig(effectiveConfigRaw),
				env: deps.env
			}) : collect());
			assertReadCurrent();
			restoreReadEnv?.();
			return await finalizeReadConfigSnapshotInternalResult(deps, {
				snapshot: createConfigFileSnapshot({
					...snapshotSource(),
					valid: false,
					runtimeConfig: coerceConfig(effectiveConfigRaw),
					issues: validated.issues,
					legacyIssues
				}),
				envSnapshotForRestore: readResolution.envSnapshotForRestore,
				includeFileHashesForWrite,
				includeFileTargetsForWrite
			});
		}
		if (!deps.suppressFutureVersionWarning) warnIfConfigFromFuture(validated.config, deps.logger);
		let callerRejectedSuspiciousRecovery = false;
		if (options.recoverSuspicious === true && deps.observe && !options.skipSuspiciousRecovery && !containsConfigIncludeDirective(effectiveParsed)) {
			const allowSuspiciousRecovery = options.allowSuspiciousRecovery;
			let recoveryCandidate = null;
			if ((await deps.measure("config.snapshot.read.recover-suspicious", () => maybeRecoverSuspiciousConfigRead({
				deps,
				configPath,
				raw,
				parsed: effectiveParsed,
				prepareBackup: (backup) => {
					const prepared = context.prepareRecoveryBackupCandidate(backup);
					recoveryCandidate = prepared.ok ? prepared.candidate.config ?? null : null;
					return prepared;
				},
				...allowSuspiciousRecovery ? { allowBackupRecovery: async () => {
					const allowed = recoveryCandidate !== null && await allowSuspiciousRecovery(recoveryCandidate, validated.config);
					callerRejectedSuspiciousRecovery = !allowed;
					return allowed;
				} } : {}
			}))).raw !== raw) {
				assertReadCurrent();
				restoreReadEnv?.();
				return await readConfigFileSnapshotInternal(context, {
					preparation,
					prepareValidation: options.prepareValidation,
					allowCurrentPluginMetadata: options.allowCurrentPluginMetadata,
					recoverSuspicious: options.recoverSuspicious,
					skipSuspiciousRecovery: true
				});
			}
		}
		const snapshotConfig = await deps.measure("config.snapshot.read.materialize", () => materializeRuntimeConfig(validated.config, {
			...pathResolution,
			manifestRegistry: pluginMetadata.getSnapshot()?.manifestRegistry ?? (context.options.pluginValidation === "core-only" ? { plugins: [] } : void 0)
		}));
		return await deps.measure("config.snapshot.read.observe", () => finalizeReadConfigSnapshotInternalResult(deps, {
			snapshot: createConfigFileSnapshot({
				...snapshotSource(),
				valid: true,
				runtimeConfig: snapshotConfig,
				issues: [],
				legacyIssues: []
			}),
			envSnapshotForRestore: readResolution.envSnapshotForRestore,
			includeFileHashesForWrite,
			includeFileTargetsForWrite,
			pluginMetadataSnapshot: pluginMetadata.getSnapshot(),
			...validated.strictIssues ? { strictIssues: validated.strictIssues } : {}
		}, { observe: !callerRejectedSuspiciousRecovery }));
	} catch (error) {
		assertReadCurrent();
		restoreReadEnv?.();
		if (findStartupMaintenanceRequiredError(error) || collectNestedErrorCandidates(error).some((failure) => failure instanceof OpenClawStateOwnershipError || isSqliteSchemaMismatchError(failure))) throw error;
		const nodeError = error;
		let message;
		if (nodeError?.code === "EACCES") {
			const uid = process.getuid?.();
			const uidHint = typeof uid === "number" ? String(uid) : "$(id -u)";
			message = [
				`read failed: ${String(error)}`,
				"",
				"Config file is not readable by the current process. If running in a container",
				"or 1-click deployment, fix ownership with:",
				`  chown ${uidHint} "${configPath}"`,
				"Then restart the gateway."
			].join("\n");
			deps.logger.error(message);
		} else message = `read failed: ${String(error)}`;
		return await finalizeReadConfigSnapshotInternalResult(deps, {
			snapshot: createConfigFileSnapshot({
				path: configPath,
				includedPaths: listResolvedIncludePaths(includeFilePathsForWatch),
				exists: true,
				raw: fallbackRaw,
				parsed: fallbackParsed,
				sourceConfig: fallbackSourceConfig,
				valid: false,
				runtimeConfig: fallbackSourceConfig,
				hash: fallbackHash,
				...fallbackRaw === null ? { readError: { code: nodeError?.code ?? null } } : {},
				issues: [{
					path: "",
					errorCode: "CONFIG_READ_FAILED",
					message
				}],
				warnings: [],
				legacyIssues: []
			}),
			envSnapshotForRestore: fallbackEnvSnapshotForRestore,
			includeFileHashesForWrite,
			includeFileTargetsForWrite
		});
	}
}
/** Preview recovery through the ordinary snapshot pipeline at the selected config path. */
async function prepareConfigRecoveryFromContext(context, current) {
	return await withArtifactPreservingStateReads(async () => {
		if (!current.exists || !current.valid || typeof current.raw !== "string" || containsConfigIncludeDirective(current.parsed)) return null;
		if (current.path !== context.configPath) throw new ConfigMutationConflictError("config recovery path changed since last load", { retryable: false });
		const previewContext = createConfigIoContext({
			...context.options,
			configPath: context.configPath,
			env: cloneEnvWithPlatformSemantics(context.deps.env),
			observe: false
		}, context.transformRecoveryCandidate);
		const plan = await prepareSuspiciousConfigRead({
			deps: previewContext.deps,
			configPath: context.configPath,
			raw: current.raw,
			parsed: current.parsed,
			prepareBackup: previewContext.prepareRecoveryBackupCandidate
		});
		if (!plan) return null;
		const envBeforeRead = snapshotEnv(previewContext.deps.env);
		try {
			const { snapshot, pluginMetadataSnapshot } = await readConfigFileSnapshotInternal(previewContext, { allowCurrentPluginMetadata: false }, plan.candidate.raw);
			if (isConfigReadFailure(snapshot)) throw createConfigReadError(snapshot.path, formatInvalidConfigDetails(snapshot.issues));
			return snapshot.valid ? {
				snapshot,
				pluginMetadataSnapshot,
				apply: plan.apply
			} : null;
		} finally {
			restoreEnvChangesIfUnchanged({
				env: previewContext.deps.env,
				before: envBeforeRead,
				after: snapshotEnv(previewContext.deps.env)
			});
		}
	});
}
async function readConfigFileSnapshotFromContext(context, options = {}) {
	return (await readConfigFileSnapshotInternal(context, {
		recoverSuspicious: options.recoverSuspicious === true,
		allowSuspiciousRecovery: options.allowSuspiciousRecovery
	})).snapshot;
}
async function readConfigFileSnapshotWithPluginMetadataFromContext(context, options = {}) {
	const read = () => readConfigSnapshotWithPluginMetadata(context, options);
	return options.prepareValidation && !context.deps.observe ? withArtifactPreservingStateReads(read) : read();
}
async function readConfigSnapshotWithPluginMetadata(context, options) {
	const preparation = captureManagedConfigSnapshotPreparation(context.configPath);
	const result = await readConfigFileSnapshotInternal(context, {
		preparation,
		prepareValidation: options.prepareValidation,
		allowCurrentPluginMetadata: options.allowCurrentPluginMetadata,
		recoverSuspicious: options.recoverSuspicious === true,
		allowSuspiciousRecovery: options.allowSuspiciousRecovery
	});
	let pluginMetadataSnapshot = result.pluginMetadataSnapshot;
	if (!pluginMetadataSnapshot && result.snapshot.valid) {
		const pluginMetadata = context.createValidationPluginMetadataSnapshotLoader({
			env: context.deps.env,
			allowCurrentPluginMetadata: options.allowCurrentPluginMetadata
		});
		if (preparation) await preparation((prepare) => prepare({
			kind: "metadata",
			metadata: pluginMetadata,
			config: result.snapshot.sourceConfig
		}));
		else if (options.prepareValidation) await pluginMetadata.loadAsync(result.snapshot.sourceConfig);
		else pluginMetadata.load(result.snapshot.sourceConfig);
		pluginMetadataSnapshot = pluginMetadata.getSnapshot();
	}
	preparation?.assertCurrent();
	return {
		snapshot: result.snapshot,
		...result.strictIssues ? { strictIssues: result.strictIssues } : {},
		...pluginMetadataSnapshot ? { pluginMetadataSnapshot } : {}
	};
}
async function readConfigFileSnapshotForWriteFromContext(context, options = {}) {
	const assertConfigPathForWrite = () => {
		if (resolveConfigPathForDeps(context.deps) !== context.configPath) throw new ConfigMutationConflictError("config path changed since last load", { retryable: false });
	};
	assertConfigPathForWrite();
	const readContext = options.observe === false ? {
		...context,
		deps: {
			...context.deps,
			observe: false
		}
	} : context;
	const read = () => readConfigFileSnapshotInternal(readContext);
	const result = await (readContext.deps.observe ? read() : withArtifactPreservingStateReads(read));
	assertConfigPathForWrite();
	return {
		snapshot: result.snapshot,
		writeOptions: {
			assertConfigPathForWrite,
			basePluginMetadataSnapshot: result.pluginMetadataSnapshot,
			envSnapshotForRestore: result.envSnapshotForRestore,
			expectedConfigPath: context.configPath,
			ownedConfigPathForWrite: context.configPath,
			includeFileHashesForWrite: result.includeFileHashesForWrite,
			includeFileTargetsForWrite: result.includeFileTargetsForWrite,
			unsetPaths: resolveManagedUnsetPathsForWrite(void 0)
		}
	};
}
async function readBestEffortConfigSnapshotFromContext(context) {
	const operation = async () => {
		const result = await readConfigFileSnapshotInternal(context);
		if (!result.snapshot.valid) return {
			config: result.snapshot.config,
			sourceConfig: result.snapshot.sourceConfig,
			configDiagnostics: {
				path: result.snapshot.path,
				issues: result.snapshot.issues
			}
		};
		return {
			config: context.finalizeLoadedRuntimeConfig(result.snapshot.config),
			sourceConfig: result.snapshot.sourceConfig,
			configDiagnostics: null
		};
	};
	return await (context.deps.observe ? operation() : withArtifactPreservingStateReads(operation));
}
async function readSourceConfigBestEffortFromContext(context) {
	const { deps, configPath } = context;
	maybeLoadDotEnvForConfig(deps.env);
	if (!deps.fs.existsSync(configPath)) return {};
	try {
		const raw = deps.fs.readFileSync(configPath, "utf-8");
		const parsed = parseConfigJson5(raw, deps.json5);
		if (!parsed.ok) {
			deps.logger.warn(`Config (${configPath}): best-effort read ignored unparseable config: ${parsed.error}`);
			return {};
		}
		let resolved;
		try {
			resolved = resolveConfigIncludesForRead(parsed.parsed, configPath, deps);
		} catch (err) {
			deps.logger.warn(`Config (${configPath}): best-effort read skipped $include resolution: ${formatErrorMessage(err)}`);
			return coerceConfig(parsed.parsed);
		}
		const resolution = resolveConfigForRead(resolved, deps.env, deps.lowerPrecedenceEnv);
		return coerceConfig(resolution.resolvedConfigRaw);
	} catch (err) {
		deps.logger.warn(`Config (${configPath}): best-effort read failed: ${formatErrorMessage(err)}`);
		return {};
	}
}
//#endregion
//#region src/config/io.factory.ts
function createConfigIO(options = {}) {
	const context = createConfigIoContext(options);
	const readInternal = (observe) => readConfigFileSnapshotInternal(observe === false ? {
		...context,
		deps: {
			...context.deps,
			observe: false
		}
	} : context);
	return {
		configPath: context.configPath,
		env: context.deps.env,
		logger: context.deps.logger,
		loadConfig: (loadOptions) => loadConfigFromContext(context, loadOptions),
		loadConfigAsync: (loadOptions) => loadConfigFromContextAsync(context, loadOptions),
		readBestEffortConfig: async () => (await readBestEffortConfigSnapshotFromContext(context)).config,
		readBestEffortConfigSnapshot: () => readBestEffortConfigSnapshotFromContext(context),
		readSourceConfigBestEffort: () => readSourceConfigBestEffortFromContext(context),
		readConfigFileSnapshot: (readOptions = {}) => readConfigFileSnapshotFromContext(context, readOptions),
		readConfigFileSnapshotWithPluginMetadata: (readOptions = {}) => readConfigFileSnapshotWithPluginMetadataFromContext(context, readOptions),
		readConfigFileSnapshotForWrite: (readOptions) => readConfigFileSnapshotForWriteFromContext(context, readOptions),
		prepareConfigRecovery: (current) => prepareConfigRecoveryFromContext(context, current),
		promoteConfigSnapshotToLastKnownGood: (snapshot) => promoteConfigSnapshotToLastKnownGoodCore({
			deps: context.deps,
			snapshot,
			logger: context.deps.logger
		}),
		recoverConfigFromLastKnownGood: (params) => recoverConfigFromLastKnownGoodCore({
			deps: context.deps,
			snapshot: params.snapshot,
			reason: params.reason,
			prepareCandidate: context.prepareRecoveryBackupCandidate
		}),
		recoverConfigFromJsonRootSuffix: (snapshot) => recoverConfigFromJsonRootSuffixWithContext(context, snapshot),
		writeConfigFile: async (config, writeOptions = {}) => {
			writeOptions.assertConfigPathForWrite?.();
			const { writeConfigFileFromContext } = await import("./io.write-DhC4gD_I.mjs");
			writeOptions.assertConfigPathForWrite?.();
			return withConfigWriteLock(context.configPath, () => writeConfigFileFromContext(context, config, writeOptions, () => readInternal(writeOptions.observe)), context.deps.env, writeOptions.assertCurrent);
		}
	};
}
//#endregion
export { maybeLoadDotEnvForConfig as a, createConfigIoContext as c, getConfigOverrides as d, resetConfigOverrides as f, resolveOwnerPromptNumbers as h, createManagedRuntimeEnvBase as i, applyConfigOverrides as l, unsetConfigOverride as m, prepareConfigRecoveryFromContext as n, resolveManagedRuntimeEnvBaseline as o, setConfigOverride as p, createConfigFileSnapshot as r, recoverConfigFromLastKnownGoodCore as s, createConfigIO as t, captureConfigOverrideApplier as u };
