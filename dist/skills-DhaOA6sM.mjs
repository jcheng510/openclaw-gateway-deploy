import { l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import { u as normalizeSortedUniqueTrimmedStringList } from "./string-normalization-YMwDjufr.mjs";
import { i as getOrCreatePromise } from "./lazy-promise-DGqyc4Y4.mjs";
import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { n as resolvePreferredOpenClawTmpDir } from "./tmp-openclaw-dir-BSb3HetY.mjs";
import { n as sha256Hex } from "./node-crypto-BInnzoVt.mjs";
import "./crypto-digest-y6oZN-_F.mjs";
import { n as createAsyncLock } from "./json-files-Br8qKrAz.mjs";
import "./redact-sentinel-f_PhnHTI.mjs";
import { t as redactConfigObject } from "./redact-snapshot-BGUUmDSs.mjs";
import { n as normalizeAgentId } from "./agent-id-D1-Q6vR4.mjs";
import { i as SkillUploadRequestError } from "./openclaw-state-worker-error-CvUWzlTD.mjs";
import { r as captureOpenClawStateWorkerContext } from "./openclaw-state-worker-context-C_iAE7YK.mjs";
import { C as tryResolveAmbientOwnerAgentId, d as resolveAgentWorkspaceDir, g as resolveDefaultAgentId, t as AgentSelectionRequiredError } from "./agent-scope-config-Dm6T00l4.mjs";
import "./session-key-BC4m_Ly5.mjs";
import { i as listAgentIds } from "./agent-roster-B45JERT5.mjs";
import { n as createSqliteWorkerWriteAdmission } from "./sqlite-worker-store-DNLj-iuz.mjs";
import "./agent-scope-L_eY3Hj7.mjs";
import { n as mutateConfigFileWithRetry } from "./mutate-BrQ5d2nB.mjs";
import "./config-D1R2igem.mjs";
import { a as hasGatewayClientCap, t as GATEWAY_CLIENT_CAPS } from "./client-info-S_xwnr2o.mjs";
import { Aa as validateSkillsSecurityVerdictsParams, Ca as validateSkillsProposalEventsListParams, Ch as buildClawHubTrustErrorDetails, Da as validateSkillsProposalUpdateParams, Ea as validateSkillsProposalReviseParams, Fa as validateSkillsUploadChunkParams, Ia as validateSkillsUploadCommitParams, La as validateSkillsWorkshopReadParams, Ma as validateSkillsStatusParams, Na as validateSkillsUpdateParams, Oa as validateSkillsProposalsListParams, Pa as validateSkillsUploadBeginParams, Sa as validateSkillsProposalEvaluateParams, Ta as validateSkillsProposalRequestRevisionParams, _a as validateSkillsDetailParams, ba as validateSkillsProposalCreateParams, ga as validateSkillsCuratorStatusParams, ha as validateSkillsCuratorActionParams, hm as validateSkillsProposalHistoryStatusParams, ja as validateSkillsSkillCardParams, ka as validateSkillsSearchParams, ma as validateSkillsBinsParams, mm as validateSkillsProposalHistoryScanParams, va as validateSkillsInstallParams, wa as validateSkillsProposalInspectParams, xa as validateSkillsProposalDecisionParams, ya as validateSkillsProposalActionParams } from "./src-D2gvuSyP.mjs";
import { n as normalizeSecretInput } from "./normalize-secret-input-DBJvdk-L.mjs";
import { a as DEFAULT_MAX_ARCHIVE_BYTES_ZIP } from "./archive-DqZZMnnW.mjs";
import { i as buildSkillProposalRevisionChangedErrorDetails, t as ErrorCodes } from "./gateway-error-details-DIefe7Zy.mjs";
import { f as errorShape } from "./error-codes-DI20vDEB.mjs";
import { i as isValidBase64 } from "./base64-xteYEv8l.mjs";
import { t as retainMutationAuthority } from "./mutation-authority-E8BC9dNY.mjs";
import { _ as resolveClawHubBaseUrl } from "./clawhub-client-jMrwU6Rk.mjs";
import { r as fetchExactClawHubSkillSecurityVerdicts } from "./clawhub-install-trust-CZoURrTn.mjs";
import { a as fetchClawHubSkillDetail } from "./clawhub-skills-BYsGKlKf.mjs";
import { i as resolveNodeExecEligibility } from "./exec-defaults-DGSh4Lk5.mjs";
import { t as SessionMutationAuthorizationChangedError } from "./session-mutation-authorization-error-CCz8QGWh.mjs";
import { _ as resolveSessionSharingTarget, s as authorizeSessionSharingTarget } from "./session-sharing-policy-BALdNo4L.mjs";
import { N as resolveSkillProposalName } from "./store-6HwYjj1p.mjs";
import { n as PROPOSAL_DRAFT_FILE } from "./store-record-Dxu22ebc.mjs";
import { c as proposeCreateSkill, d as assertExpectedRevisionHash, f as evaluateSkillProposal, i as reviseSkillProposal, l as proposeUpdateSkill, n as quarantineSkillProposal, p as listSkillProposalEvents, r as rejectSkillProposal, t as applySkillProposal, u as SkillProposalRevisionChangedError } from "./service-qRJYEGWc.mjs";
import { n as listSkillProposals, t as inspectSkillProposal } from "./service-query-Ci9vUcQ3.mjs";
import { r as validateRequestedSkillSlug } from "./install-paths-CdlkBGI2.mjs";
import { s as parseRequestedClawHubSkillRef } from "./clawhub-store-CE_V8mNK.mjs";
import { c as searchSkillsFromClawHub } from "./clawhub-status-ChOfGQr7.mjs";
import { i as prepareWorkspaceSkillEntries } from "./workspace-skill-loader-D-k9b5PP.mjs";
import { n as prepareRemoteSkillConnections } from "./remote-skills-Co_eXsF5.mjs";
import { i as prepareWorkspaceSkillStatus } from "./status-Er1pZtWd.mjs";
import { n as readWritableWorkshopSkill, t as listWritableWorkshopSkillSummaries } from "./workspace-skill-read-WQySWcpN.mjs";
import "./session-sharing-Bhe-fXzH.mjs";
import { t as getRemoteSkillEligibility } from "./remote-CgP2ocY0.mjs";
import { n as ensureSkillsWatcher } from "./refresh-BVJA_wY3.mjs";
import { i as installSkillArchiveFromPath } from "./archive-install-Bdsv980w.mjs";
import { r as updateSkillsFromClawHub, t as installSkillFromClawHub } from "./clawhub-BuFcRTRs.mjs";
import { n as getSkillCuratorStatus, t as SKILL_LIFECYCLE_CURATION_RETIRED_MESSAGE } from "./curator-CAF-tRhx.mjs";
import { n as installSkill } from "./install-BFSHqn6h.mjs";
import { r as skillsLibraryHandlers } from "./skills-library-DPeC2OPd.mjs";
import { a as captureGatewayClientUploadCommitGuard } from "./upload-policy-D2eRzQeB.mjs";
import { t as assertValidParams } from "./validation-B7TobU6-.mjs";
import { t as registerClawHubCatalogIconUrls } from "./catalog-icon-registry-b1MkOn00.mjs";
import { u as resolveSkillUploadDatabaseOptions } from "./upload-store.sqlite-BsX_vTyg.mjs";
import path from "node:path";
import fs from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { withTempWorkspace } from "@openclaw/fs-safe/temp";
//#region src/skills/config/mutations.ts
async function updateSkillConfigEntry(params) {
	return (await mutateConfigFileWithRetry({
		afterWrite: { mode: "auto" },
		mutate: (draft) => {
			const entries = { ...draft.skills?.entries };
			const current = { ...entries[params.skillKey] };
			if (typeof params.enabled === "boolean") current.enabled = params.enabled;
			if (typeof params.apiKey === "string") {
				const trimmed = normalizeSecretInput(params.apiKey);
				if (trimmed === "__OPENCLAW_REDACTED__") {} else if (trimmed) current.apiKey = trimmed;
				else delete current.apiKey;
			}
			if (params.env && typeof params.env === "object") {
				const nextEnv = { ...current.env };
				for (const [key, value] of Object.entries(params.env)) {
					const trimmedKey = key.trim();
					if (!trimmedKey) continue;
					const trimmedVal = value.trim();
					if (trimmedVal === "__OPENCLAW_REDACTED__") continue;
					if (!trimmedVal) delete nextEnv[trimmedKey];
					else nextEnv[trimmedKey] = trimmedVal;
				}
				current.env = nextEnv;
			}
			entries[params.skillKey] = current;
			draft.skills = {
				...draft.skills,
				entries
			};
			return current;
		}
	})).result ?? {};
}
//#endregion
//#region src/skills/discovery/bins.ts
/** Collects all binary names a set of skills may require or install. */
function collectSkillBins(entries) {
	return normalizeSortedUniqueTrimmedStringList(entries.flatMap((entry) => [
		...entry.metadata?.requires?.bins ?? [],
		...entry.metadata?.requires?.anyBins ?? [],
		...(entry.metadata?.install ?? []).flatMap((spec) => spec?.bins ?? [])
	]));
}
//#endregion
//#region src/skills/security/clawhub-verdicts.ts
function projectClawHubVerdictItem(item, target) {
	const projected = {
		registry: target.registry,
		ok: item.ok,
		decision: item.decision,
		reasons: item.reasons,
		requestedSlug: target.slug,
		requestedVersion: target.version,
		...target.ownerHandle ? { requestedOwnerHandle: target.ownerHandle } : {},
		...item.slug !== void 0 ? { slug: item.slug } : {},
		...item.version !== void 0 ? { version: item.version } : {},
		...item.displayName !== void 0 ? { displayName: item.displayName } : {},
		...item.publisherHandle !== void 0 ? { publisherHandle: item.publisherHandle } : {},
		...item.publisherDisplayName !== void 0 ? { publisherDisplayName: item.publisherDisplayName } : {},
		...item.createdAt !== void 0 ? { createdAt: item.createdAt } : {},
		...item.checkedAt !== void 0 ? { checkedAt: item.checkedAt } : {},
		...item.skillUrl !== void 0 ? { skillUrl: item.skillUrl } : {},
		...item.securityAuditUrl !== void 0 ? { securityAuditUrl: item.securityAuditUrl } : {}
	};
	const security = item.security;
	if (security && typeof security === "object") {
		if ("status" in security && typeof security.status === "string") projected.securityStatus = security.status;
		if ("passed" in security && typeof security.passed === "boolean") projected.securityPassed = security.passed;
	}
	if (item.error) {
		const error = {};
		if (typeof item.error.code === "string") error.code = item.error.code;
		if (typeof item.error.message === "string") error.message = item.error.message;
		if (Object.keys(error).length > 0) projected.error = error;
	}
	return projected;
}
function normalizeAutoVerdictRegistryBase(registry) {
	try {
		const url = new URL(registry);
		const normalizedPath = url.pathname.replace(/\/+$/, "");
		return `${url.origin}${normalizedPath}`;
	} catch {
		return null;
	}
}
function canAutoFetchVerdictRegistry(registry) {
	const configured = normalizeAutoVerdictRegistryBase(resolveClawHubBaseUrl());
	const target = normalizeAutoVerdictRegistryBase(registry);
	return configured !== null && target === configured;
}
function collectClawHubVerdictTargets(report) {
	const targets = /* @__PURE__ */ new Map();
	for (const skill of report.skills) {
		const link = skill.clawhub;
		if (!link || link.status !== "linked" || !link.valid) continue;
		if (!canAutoFetchVerdictRegistry(link.registry)) continue;
		const key = `${link.registry}\0${link.ownerHandle ?? ""}\0${link.slug}\0${link.installedVersion}`;
		targets.set(key, {
			registry: link.registry,
			slug: link.slug,
			...link.ownerHandle ? { ownerHandle: link.ownerHandle } : {},
			version: link.installedVersion
		});
	}
	return [...targets.values()];
}
async function fetchOpenClawSkillSecurityVerdicts(targets) {
	const byRegistry = /* @__PURE__ */ new Map();
	for (const target of targets) {
		const registryTargets = byRegistry.get(target.registry) ?? [];
		registryTargets.push(target);
		byRegistry.set(target.registry, registryTargets);
	}
	const items = [];
	for (const [registry, registryTargets] of byRegistry) {
		const verdicts = await fetchExactClawHubSkillSecurityVerdicts({
			baseUrl: registry,
			items: registryTargets.map(({ slug, ownerHandle, version }) => ({
				slug,
				...ownerHandle ? { ownerHandle } : {},
				version
			})),
			skipAuth: true
		});
		for (const [index, item] of verdicts.entries()) items.push(projectClawHubVerdictItem(item, registryTargets[index]));
	}
	return items;
}
//#endregion
//#region src/gateway/server-methods/skills-curator.ts
function respondRetiredSkillCuratorAction({ params, respond }, method) {
	if (!assertValidParams(params, validateSkillsCuratorActionParams, method, respond)) return;
	respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, formatErrorMessage(SKILL_LIFECYCLE_CURATION_RETIRED_MESSAGE)));
}
const skillsCuratorHandlers = {
	"skills.curator.status": async ({ params, respond, context, client }) => {
		if (!assertValidParams(params, validateSkillsCuratorStatusParams, "skills.curator.status", respond)) return;
		const status = await getSkillCuratorStatus({ config: context.getRuntimeConfig() });
		if (hasGatewayClientCap(client?.connect.caps, GATEWAY_CLIENT_CAPS.SKILL_CURATOR_LIVE_INVENTORY)) {
			respond(true, status, void 0);
			return;
		}
		const { inventory: _inventory, ...legacyStatus } = status;
		const skills = status.skills.filter((skill) => skill.createdAtMs !== null && skill.stateChangedAtMs !== null);
		respond(true, {
			...legacyStatus,
			skills,
			counts: {
				active: skills.length,
				stale: 0,
				archived: 0
			}
		}, void 0);
	},
	"skills.curator.pin": (options) => respondRetiredSkillCuratorAction(options, "skills.curator.pin"),
	"skills.curator.unpin": (options) => respondRetiredSkillCuratorAction(options, "skills.curator.unpin"),
	"skills.curator.restore": (options) => respondRetiredSkillCuratorAction(options, "skills.curator.restore")
};
//#endregion
//#region src/skills/lifecycle/upload-store.ts
/** Time window in which uploaded skill archive chunks may be committed. */
const SKILL_UPLOAD_TTL_MS = 36e5;
const SKILL_UPLOAD_INSTALL_LEASE_MS = 9e5;
const SKILL_UPLOAD_INSTALL_HEARTBEAT_MS = 3e4;
const MAX_SKILL_UPLOAD_CHUNK_BYTES = 4194304;
const MAX_SKILL_UPLOAD_BASE64_LENGTH = Math.ceil(MAX_SKILL_UPLOAD_CHUNK_BYTES / 3) * 4;
const SKILL_UPLOAD_IDEMPOTENCY_KEY_MAX_LENGTH = 2048;
const SHA256_PATTERN = /^[a-f0-9]{64}$/i;
const UPLOAD_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const locks = /* @__PURE__ */ new Map();
async function withLock(key, fn) {
	let entry = locks.get(key);
	if (!entry) {
		entry = {
			lock: createAsyncLock(),
			references: 0
		};
		locks.set(key, entry);
	}
	entry.references += 1;
	try {
		return await entry.lock(fn);
	} finally {
		entry.references -= 1;
		if (entry.references === 0) locks.delete(key);
	}
}
function normalizeSkillUploadSha256(value) {
	if (value === void 0) return;
	const normalized = value.trim().toLowerCase();
	if (!SHA256_PATTERN.test(normalized)) throw new SkillUploadRequestError("invalid sha256");
	return normalized;
}
function validateUploadId(uploadId) {
	const normalized = uploadId.trim();
	if (!UPLOAD_ID_PATTERN.test(normalized)) throw new SkillUploadRequestError("invalid uploadId");
	return normalized;
}
function validateSizeBytes(sizeBytes) {
	if (!Number.isSafeInteger(sizeBytes) || sizeBytes < 1) throw new SkillUploadRequestError("invalid sizeBytes");
	if (sizeBytes > DEFAULT_MAX_ARCHIVE_BYTES_ZIP) throw new SkillUploadRequestError("skill archive exceeds maximum upload size");
	return sizeBytes;
}
function validateUploadSlug(slug) {
	try {
		return validateRequestedSkillSlug(slug);
	} catch (err) {
		throw new SkillUploadRequestError(formatErrorMessage(err));
	}
}
function validateOffset(offset) {
	if (!Number.isSafeInteger(offset) || offset < 0) throw new SkillUploadRequestError("invalid offset");
	return offset;
}
function validateIdempotencyKey(value) {
	const normalized = value?.trim();
	if (!normalized) return;
	if (normalized.length > SKILL_UPLOAD_IDEMPOTENCY_KEY_MAX_LENGTH) throw new SkillUploadRequestError("idempotencyKey is too long");
	return normalized;
}
function resolvePositiveDuration(value, fallback) {
	return value !== void 0 && Number.isSafeInteger(value) && value > 0 ? value : fallback;
}
function decodeBase64Chunk(dataBase64) {
	const normalized = dataBase64.trim();
	if (normalized.length > MAX_SKILL_UPLOAD_BASE64_LENGTH) throw new SkillUploadRequestError("upload chunk exceeds maximum size");
	if (!isValidBase64(normalized)) throw new SkillUploadRequestError("invalid dataBase64");
	const decoded = Buffer.from(normalized, "base64");
	if (decoded.length < 1) throw new SkillUploadRequestError("empty upload chunk");
	if (decoded.length > MAX_SKILL_UPLOAD_CHUNK_BYTES) throw new SkillUploadRequestError("upload chunk exceeds maximum size");
	return decoded;
}
async function cleanupExpiredUploads(scope, lockRoot, excludeUploadId) {
	const expired = await scope.execute({
		type: "skillUploads.expired",
		input: void 0
	});
	for (const uploadId of expired) {
		if (uploadId === excludeUploadId) continue;
		await withLock(`${lockRoot}:upload:${uploadId}`, async () => {
			await scope.execute({
				type: "skillUploads.deleteExpired",
				input: { uploadId }
			});
		});
	}
}
function toSkillUploadRecord(row, archivePath) {
	return {
		version: 1,
		kind: "skill-archive",
		uploadId: row.upload_id,
		slug: row.slug,
		force: row.force === 1,
		sizeBytes: row.size_bytes,
		...row.sha256 ? { sha256: row.sha256 } : {},
		...row.actual_sha256 ? { actualSha256: row.actual_sha256 } : {},
		receivedBytes: row.received_bytes,
		archivePath,
		createdAt: row.created_at,
		expiresAt: row.expires_at,
		committed: row.committed === 1,
		...row.committed_at !== null ? { committedAt: row.committed_at } : {},
		...row.idempotency_key_hash ? { idempotencyKeyHash: row.idempotency_key_hash } : {}
	};
}
function createSkillUploadStore(options) {
	const stateOptions = resolveSkillUploadDatabaseOptions(options ?? {});
	const ttlMs = options?.ttlMs ?? SKILL_UPLOAD_TTL_MS;
	const tempRootDir = options?.tempRootDir;
	const installLeaseMs = resolvePositiveDuration(options?.installLeaseMs, SKILL_UPLOAD_INSTALL_LEASE_MS);
	const installLeaseHeartbeatMs = resolvePositiveDuration(options?.installLeaseHeartbeatMs, SKILL_UPLOAD_INSTALL_HEARTBEAT_MS);
	return {
		async begin(params, assertCommitAllowed) {
			const request = { ...params };
			const context = captureOpenClawStateWorkerContext(stateOptions);
			const root = context.admission.databasePath;
			return await withLock(`${root}:begin`, async () => {
				const { runOpenClawStateWorkerOperation } = await import("./openclaw-state-worker-store-Bp_XCEWM.mjs");
				return runOpenClawStateWorkerOperation(context, async (scope) => {
					await cleanupExpiredUploads(scope, root);
					if (request.kind !== "skill-archive") throw new SkillUploadRequestError("unsupported upload kind");
					const slug = validateUploadSlug(request.slug);
					const sizeBytes = validateSizeBytes(request.sizeBytes);
					const sha256 = normalizeSkillUploadSha256(request.sha256);
					const force = request.force === true;
					const idempotencyKey = validateIdempotencyKey(request.idempotencyKey);
					const keyHash = idempotencyKey ? sha256Hex(idempotencyKey) : void 0;
					return scope.execute({
						type: "skillUploads.begin",
						input: {
							kind: request.kind,
							slug,
							sizeBytes,
							sha256,
							force,
							keyHash,
							ttlMs
						}
					});
				}, uploadWriteAdmission(context, assertCommitAllowed));
			});
		},
		async chunk(params, assertCommitAllowed) {
			const uploadId = validateUploadId(params.uploadId);
			const offset = validateOffset(params.offset);
			const decoded = decodeBase64Chunk(params.dataBase64);
			const context = captureOpenClawStateWorkerContext(stateOptions);
			const root = context.admission.databasePath;
			const { runOpenClawStateWorkerOperation } = await import("./openclaw-state-worker-store-Bp_XCEWM.mjs");
			return runOpenClawStateWorkerOperation(context, async (scope) => {
				await cleanupExpiredUploads(scope, root, uploadId);
				return withLock(`${root}:upload:${uploadId}`, () => scope.execute({
					type: "skillUploads.chunk",
					input: {
						uploadId,
						offset,
						decoded
					}
				}));
			}, uploadWriteAdmission(context, assertCommitAllowed));
		},
		async commit(params, assertCommitAllowed) {
			const uploadId = validateUploadId(params.uploadId);
			const requestedSha = normalizeSkillUploadSha256(params.sha256);
			const context = captureOpenClawStateWorkerContext(stateOptions);
			return await withLock(`${context.admission.databasePath}:upload:${uploadId}`, async () => {
				const { runOpenClawStateWorkerOperation } = await import("./openclaw-state-worker-store-Bp_XCEWM.mjs");
				const result = await runOpenClawStateWorkerOperation(context, (scope) => scope.execute({
					type: "skillUploads.commit",
					input: {
						uploadId,
						requestedSha
					}
				}), uploadWriteAdmission(context, assertCommitAllowed));
				context.admission.assertCurrent();
				return result;
			});
		},
		async withCommittedUpload(uploadIdRaw, action) {
			const uploadId = validateUploadId(uploadIdRaw);
			const context = captureOpenClawStateWorkerContext(stateOptions);
			return withLock(`${context.admission.databasePath}:upload:${uploadId}`, async () => {
				const { runOpenClawStateWorkerOperation } = await import("./openclaw-state-worker-store-Bp_XCEWM.mjs");
				const { withSkillUploadInstallOwner } = await import("./upload-store-install-owner-35KFS9qq.mjs");
				const owner = randomUUID();
				return withSkillUploadInstallOwner(context, {
					uploadId,
					owner
				}, (claimStarted) => runOpenClawStateWorkerOperation(context, async (scope) => {
					claimStarted();
					const row = await scope.execute({
						type: "skillUploads.claim",
						input: {
							uploadId,
							leaseOwner: owner,
							installLeaseMs
						}
					});
					context.admission.assertCurrent();
					let renewal;
					let renewalPaused = 0;
					let installing = true;
					const heartbeat = setInterval(() => {
						if (!installing || renewalPaused || renewal) return;
						renewal = scope.execute({
							type: "skillUploads.renew",
							input: {
								uploadId,
								owner,
								installLeaseMs
							}
						}).then(() => void 0, () => void 0).finally(() => {
							renewal = void 0;
						});
					}, installLeaseHeartbeatMs);
					heartbeat.unref();
					try {
						return await withTempWorkspace({
							rootDir: tempRootDir ?? resolvePreferredOpenClawTmpDir(),
							prefix: "openclaw-skill-upload-"
						}, async (tmp) => {
							const archivePath = path.join(tmp.dir, "archive.zip");
							await fs.writeFile(archivePath, row.archive_blob, { mode: 384 });
							context.admission.assertCurrent();
							return action(toSkillUploadRecord(row, archivePath), { remove: async () => {
								renewalPaused += 1;
								try {
									await renewal;
									if (await scope.execute({
										type: "skillUploads.consume",
										input: {
											uploadId,
											owner
										}
									}) === "not-owner") throw new SkillUploadRequestError("upload install lease is no longer active");
								} finally {
									renewalPaused -= 1;
								}
							} });
						});
					} finally {
						installing = false;
						clearInterval(heartbeat);
						await renewal;
					}
				}));
			});
		}
	};
}
/** The callback is pure host policy; worker transactions recheck it before effects and COMMIT. */
function uploadWriteAdmission(context, assertCommitAllowed) {
	const assertCurrent = () => {
		assertCommitAllowed?.();
		context.admission.assertCurrent();
		context.maintenanceScope?.assertAdmission();
	};
	return {
		assertCurrent,
		createAdmission: createSqliteWorkerWriteAdmission(assertCurrent, [context.admission.databasePath])
	};
}
const defaultSkillUploadStore = createSkillUploadStore();
if (process.env.VITEST || false) globalThis[Symbol.for("openclaw.skillUploadStoreTestApi")] = { createSkillUploadStore };
//#endregion
//#region src/skills/lifecycle/upload-install.ts
const UPLOADED_SKILL_ARCHIVES_DISABLED_MESSAGE = "Uploaded skill archive installs are disabled by skills.install.allowUploadedArchives";
function areUploadedSkillArchivesEnabled(config) {
	return config.skills?.install?.allowUploadedArchives === true;
}
async function installUploadedSkillArchive(params) {
	const store = params.store ?? defaultSkillUploadStore;
	if (!areUploadedSkillArchivesEnabled(params.config)) return {
		ok: false,
		error: UPLOADED_SKILL_ARCHIVES_DISABLED_MESSAGE,
		errorKind: "unavailable"
	};
	try {
		params.beforePersistentApply?.();
		const requestedSlug = validateRequestedSkillSlug(params.slug);
		const requestedSha = normalizeSkillUploadSha256(params.sha256);
		return await store.withCommittedUpload(params.uploadId, async (record, upload) => {
			const rejectInvalid = async (error) => {
				await upload.remove().catch(() => void 0);
				return {
					ok: false,
					error,
					errorKind: "invalid-request"
				};
			};
			if (record.kind !== "skill-archive") return await rejectInvalid("unsupported upload kind");
			if (record.slug !== requestedSlug) return await rejectInvalid("install slug does not match upload slug");
			if (record.force !== params.force) return await rejectInvalid("install force does not match upload force");
			if (requestedSha && requestedSha !== record.actualSha256) return await rejectInvalid("install sha256 does not match uploaded archive");
			if (!record.actualSha256) return await rejectInvalid("committed upload is missing sha256");
			const install = await installSkillArchiveFromPath({
				archivePath: record.archivePath,
				workspaceDir: params.workspaceDir,
				slug: record.slug,
				force: record.force,
				timeoutMs: params.timeoutMs,
				logger: params.log,
				beforePersistentApply: params.beforePersistentApply,
				policy: {
					config: params.config,
					installId: "upload",
					origin: {
						type: "upload",
						uploadId: params.uploadId,
						sha256: record.actualSha256
					},
					source: {
						kind: "upload",
						authority: "user",
						mutable: false,
						network: false
					},
					requestedSpecifier: `upload:${params.uploadId}`
				}
			});
			if (!install.ok) {
				if (install.failureKind === "invalid-request") await upload.remove().catch(() => void 0);
				return {
					ok: false,
					error: install.error,
					errorKind: install.failureKind
				};
			}
			await upload.remove().catch(() => void 0);
			return {
				ok: true,
				message: `Installed ${record.slug}`,
				stdout: "",
				stderr: "",
				code: 0,
				slug: record.slug,
				targetDir: install.targetDir,
				sha256: record.actualSha256
			};
		});
	} catch (err) {
		const error = err instanceof SkillUploadRequestError ? err.message : formatErrorMessage(err);
		return {
			ok: false,
			error,
			errorKind: err instanceof SkillUploadRequestError || error.startsWith("Invalid skill slug") ? "invalid-request" : "unavailable"
		};
	}
}
//#endregion
//#region src/gateway/server-methods/skills-workspace-handler.ts
function resolveSkillsAgentWorkspace(params, context) {
	const cfg = context.getRuntimeConfig();
	const agentIdRaw = params && typeof params === "object" && "agentId" in params ? normalizeOptionalString(params.agentId) : void 0;
	let agentId;
	try {
		agentId = agentIdRaw ? normalizeAgentId(agentIdRaw) : resolveDefaultAgentId(cfg, {
			surface: "skills workspace",
			hint: "Pass agentId to select a configured agent."
		});
	} catch (error) {
		if (!(error instanceof AgentSelectionRequiredError)) throw error;
		return {
			ok: false,
			error: errorShape(ErrorCodes.INVALID_REQUEST, error.message)
		};
	}
	if (agentIdRaw && !listAgentIds(cfg).includes(agentId)) return {
		ok: false,
		error: errorShape(ErrorCodes.INVALID_REQUEST, `unknown agent id "${agentIdRaw}"`)
	};
	return {
		ok: true,
		cfg,
		agentId,
		workspaceDir: resolveAgentWorkspaceDir(cfg, agentId)
	};
}
const SKILL_PROPOSAL_RESPONSE_HANDLED = Symbol("skill proposal response handled");
function defineSkillsProposalWorkspaceHandler(method, validate, run) {
	return async (options) => {
		const { params, respond, context } = options;
		if (!assertValidParams(params, validate, method, respond)) return;
		const resolved = resolveSkillsAgentWorkspace(params, context);
		if (!resolved.ok) {
			respond(false, void 0, resolved.error);
			return;
		}
		try {
			const result = await run(params, resolved, options);
			if (result !== SKILL_PROPOSAL_RESPONSE_HANDLED) respond(true, result, void 0);
		} catch (error) {
			if (error instanceof SessionMutationAuthorizationChangedError) {
				respond(false, void 0, error.error);
				return;
			}
			const details = error instanceof SkillProposalRevisionChangedError ? buildSkillProposalRevisionChangedErrorDetails({
				expectedRevisionHash: error.expectedRevisionHash,
				currentRevisionHash: error.currentRevisionHash
			}) : void 0;
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, formatErrorMessage(error), details ? { details } : void 0));
		}
	};
}
//#endregion
//#region src/gateway/server-methods/skills-install.ts
const clawHubInstallsInFlight = /* @__PURE__ */ new Map();
function installClawHubSkillDeduped(params) {
	const key = JSON.stringify([
		params.workspaceDir,
		params.slug,
		params.version ?? null,
		params.force ?? false
	]);
	return getOrCreatePromise(clawHubInstallsInFlight, key, () => installSkillFromClawHub(params), { evictOnSettled: true });
}
const handleSkillsInstall = async ({ params, respond, context, client }) => {
	if (!assertValidParams(params, validateSkillsInstallParams, "skills.install", respond)) return;
	const p = params;
	const resolved = resolveSkillsAgentWorkspace(params, context);
	if (!resolved.ok) {
		respond(false, void 0, resolved.error);
		return;
	}
	const cfg = resolved.cfg;
	const workspaceDirRaw = resolved.workspaceDir;
	if ("source" in p && p.source === "clawhub") {
		const result = await installClawHubSkillDeduped({
			workspaceDir: workspaceDirRaw,
			slug: p.slug,
			version: p.version,
			force: Boolean(p.force),
			logger: context.logGateway,
			config: cfg
		});
		const errorDetails = result.ok ? void 0 : buildClawHubTrustErrorDetails(result);
		respond(result.ok, result.ok ? {
			ok: true,
			message: `Installed ${result.slug}@${result.version}`,
			stdout: "",
			stderr: "",
			code: 0,
			slug: result.slug,
			version: result.version,
			targetDir: result.targetDir,
			...result.warning ? { warning: result.warning } : {}
		} : result, result.ok ? void 0 : errorShape(ErrorCodes.UNAVAILABLE, result.error, errorDetails ? { details: errorDetails } : void 0));
		return;
	}
	if ("source" in p && p.source === "upload") {
		const uploadGuard = captureGatewayClientUploadCommitGuard({
			method: "skills.install",
			requestParams: p,
			client,
			context
		});
		const assertCommitAllowed = uploadGuard ? retainMutationAuthority(uploadGuard) : void 0;
		try {
			const result = await installUploadedSkillArchive({
				uploadId: p.uploadId,
				slug: p.slug,
				force: Boolean(p.force),
				sha256: p.sha256,
				timeoutMs: p.timeoutMs,
				workspaceDir: workspaceDirRaw,
				config: cfg,
				log: context.logGateway,
				beforePersistentApply: assertCommitAllowed
			});
			if (!result.ok) assertCommitAllowed?.();
			const errorCode = !result.ok && result.errorKind === "invalid-request" ? ErrorCodes.INVALID_REQUEST : ErrorCodes.UNAVAILABLE;
			const responseResult = result.ok ? result : {
				ok: false,
				error: result.error,
				errorCode
			};
			respond(result.ok, responseResult, result.ok ? void 0 : errorShape(errorCode, result.error));
		} catch (error) {
			if (!(error instanceof SessionMutationAuthorizationChangedError)) throw error;
			respond(false, void 0, error.error);
		}
		return;
	}
	const result = await installSkill({
		workspaceDir: workspaceDirRaw,
		agentId: resolved.agentId,
		skillName: p.name,
		installId: p.installId,
		timeoutMs: p.timeoutMs,
		config: cfg
	});
	respond(result.ok, result, result.ok ? void 0 : errorShape(ErrorCodes.UNAVAILABLE, result.message));
};
//#endregion
//#region src/gateway/server-methods/skills-proposal-history.ts
const HISTORY_SCAN_RETIRED_MESSAGE = "Historical batch scans are retired. Start a learning session from Workshop to review past conversations.";
const skillProposalHistoryHandlers = {
	"skills.proposals.historyStatus": ({ params, respond }) => {
		if (!assertValidParams(params, validateSkillsProposalHistoryStatusParams, "skills.proposals.historyStatus", respond)) return;
		respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, HISTORY_SCAN_RETIRED_MESSAGE));
	},
	"skills.proposals.historyScan": ({ params, respond }) => {
		if (!assertValidParams(params, validateSkillsProposalHistoryScanParams, "skills.proposals.historyScan", respond)) return;
		respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, HISTORY_SCAN_RETIRED_MESSAGE));
	}
};
//#endregion
//#region src/gateway/server-methods/skills-status.ts
async function buildRemoteAwareWorkspaceSkillStatus(resolved, selections, skillCardKey) {
	await prepareRemoteSkillConnections();
	const nodeSkills = resolveNodeExecEligibility({
		cfg: resolved.cfg,
		agentId: resolved.agentId
	});
	return prepareWorkspaceSkillStatus(resolved.workspaceDir, {
		librarySelections: selections,
		skillCardKey,
		config: resolved.cfg,
		agentId: resolved.agentId,
		eligibility: {
			nodeSkills,
			remote: getRemoteSkillEligibility({ advertiseExecNode: nodeSkills.canExec })
		}
	});
}
const handleSkillsStatus = async ({ params, respond, context, client }) => {
	if (!assertValidParams(params, validateSkillsStatusParams, "skills.status", respond)) return;
	const agentId = params.agentId ?? tryResolveAmbientOwnerAgentId(context.getRuntimeConfig());
	const resolved = resolveSkillsAgentWorkspace({
		...params,
		agentId
	}, context);
	if (!resolved.ok) {
		respond(false, void 0, resolved.error);
		return;
	}
	const target = params.sessionKey ? resolveSessionSharingTarget({
		cfg: resolved.cfg,
		sessionKey: params.sessionKey,
		agentId: resolved.agentId
	}) : void 0;
	if (params.sessionKey && !target) {
		respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "Session not found."));
		return;
	}
	if (target) {
		const denied = authorizeSessionSharingTarget({
			cfg: resolved.cfg,
			client,
			target
		});
		if (denied) {
			respond(false, void 0, denied);
			return;
		}
	}
	const sessionId = target?.entry.sessionId;
	ensureSkillsWatcher({
		workspaceDir: resolved.workspaceDir,
		config: resolved.cfg,
		agentId: resolved.agentId
	});
	const { report } = await buildRemoteAwareWorkspaceSkillStatus(resolved, target?.entry.skillLibrarySelections);
	if (target && params.sessionKey) {
		const cfg = context.getRuntimeConfig();
		const current = resolveSessionSharingTarget({
			cfg,
			sessionKey: params.sessionKey,
			agentId: resolved.agentId
		});
		if (!current || current.entry.sessionId !== sessionId || current.storePath !== target.storePath || current.storeKey !== target.storeKey) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "Session changed; retry."));
			return;
		}
		const denied = authorizeSessionSharingTarget({
			cfg,
			client,
			target: current
		});
		if (denied) {
			respond(false, void 0, denied);
			return;
		}
	}
	respond(true, report, void 0);
};
//#endregion
//#region src/gateway/server-methods/skills-upload.ts
function mapUploadError(err) {
	if (err instanceof SessionMutationAuthorizationChangedError) return err.error;
	if (err instanceof SkillUploadRequestError) return errorShape(ErrorCodes.INVALID_REQUEST, err.message);
	return errorShape(ErrorCodes.UNAVAILABLE, formatErrorMessage(err));
}
/** Gateway handlers for the staged uploaded-skill archive flow. */
const skillsUploadHandlers = {
	"skills.upload.begin": makeUploadHandler("skills.upload.begin", validateSkillsUploadBeginParams, (params, guard) => defaultSkillUploadStore.begin(params, guard)),
	"skills.upload.chunk": makeUploadHandler("skills.upload.chunk", validateSkillsUploadChunkParams, (params, guard) => defaultSkillUploadStore.chunk(params, guard)),
	"skills.upload.commit": makeUploadHandler("skills.upload.commit", validateSkillsUploadCommitParams, (params, guard) => defaultSkillUploadStore.commit(params, guard))
};
/** Wraps each upload stage with feature gating, protocol validation, and error mapping. */
function makeUploadHandler(name, validator, action) {
	return async ({ params, respond, context, client }) => {
		if (!areUploadedSkillArchivesEnabled(context.getRuntimeConfig())) {
			respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, UPLOADED_SKILL_ARCHIVES_DISABLED_MESSAGE));
			return;
		}
		if (!assertValidParams(params, validator, name, respond)) return;
		try {
			respond(true, await action(params, captureGatewayClientUploadCommitGuard({
				method: name,
				requestParams: params,
				client,
				context
			})), void 0);
		} catch (err) {
			respond(false, void 0, mapUploadError(err));
		}
	};
}
//#endregion
//#region src/gateway/server-methods/skills.ts
function proposalWorkspaceOptions(resolved) {
	return {
		workspaceDir: resolved.workspaceDir,
		agentId: resolved.agentId,
		eventActor: { type: "gateway" },
		config: resolved.cfg
	};
}
function projectGatewaySkillProposalRecord(record) {
	return record.draftFile === "PROPOSAL.md" ? record : {
		...record,
		draftFile: PROPOSAL_DRAFT_FILE
	};
}
function projectGatewaySkillProposalResult(result) {
	return {
		...result,
		record: projectGatewaySkillProposalRecord(result.record)
	};
}
function projectGatewaySkillProposalReadResult(proposal) {
	return {
		...projectGatewaySkillProposalResult(proposal),
		...proposal.supportFiles ? { supportFiles: proposal.supportFiles.map(({ path, content }) => ({
			path,
			content
		})) } : {}
	};
}
function collectClawHubTrustWarnings(results) {
	return results.map((result) => normalizeOptionalString(result.warning)).filter((warning) => Boolean(warning));
}
function buildRevisionAgentInstruction(proposal) {
	return [
		`Revise Skill Workshop proposal \`${proposal.record.id}\` (${resolveSkillProposalName(proposal.record.kind, proposal.record.target)}).`,
		"",
		"Use `skill_workshop` with `action=inspect` first, then `action=revise` for that pending proposal.",
		"The proposal ID and expected revision hash are bound by this run; do not substitute them.",
		"Do not apply, approve, reject, quarantine, or install the proposal.",
		"",
		"Requested changes:"
	].join("\n");
}
async function forwardSkillWorkshopRevisionToChatSend(opts, params) {
	const { handleChatSendWithSkillWorkshopProposalRevision } = await import("./chat-send-handler-B1S9aBTR.mjs");
	const chatParams = {
		sessionKey: params.sessionKey,
		agentId: params.targetAgentId ?? params.agentId,
		...params.sessionId ? { sessionId: params.sessionId } : {},
		message: params.instructions,
		deliver: false,
		queueMode: "followup",
		systemProvenanceReceipt: buildRevisionAgentInstruction(params.proposal),
		suppressCommandInterpretation: true,
		idempotencyKey: params.idempotencyKey
	};
	await handleChatSendWithSkillWorkshopProposalRevision({
		...opts,
		req: {
			...opts.req,
			method: "chat.send",
			params: chatParams
		},
		params: chatParams
	}, {
		agentId: params.agentId,
		workspaceDir: params.workspaceDir,
		proposalId: params.proposal.record.id,
		expectedRevisionHash: params.expectedRevisionHash
	});
}
/** Gateway request handlers for skill status, catalogs, installs, updates, and workshop proposals. */
const skillsHandlers = {
	...skillsCuratorHandlers,
	...skillsLibraryHandlers,
	...skillsUploadHandlers,
	...skillProposalHistoryHandlers,
	"skills.status": handleSkillsStatus,
	"skills.securityVerdicts": async ({ params, respond, context }) => {
		if (!assertValidParams(params, validateSkillsSecurityVerdictsParams, "skills.securityVerdicts", respond)) return;
		const resolved = resolveSkillsAgentWorkspace(params, context);
		if (!resolved.ok) {
			respond(false, void 0, resolved.error);
			return;
		}
		try {
			const { report } = await buildRemoteAwareWorkspaceSkillStatus(resolved);
			const targets = collectClawHubVerdictTargets(report);
			if (targets.length === 0) {
				respond(true, {
					schema: "openclaw.skills.security-verdicts.v1",
					items: []
				}, void 0);
				return;
			}
			respond(true, {
				schema: "openclaw.skills.security-verdicts.v1",
				items: await fetchOpenClawSkillSecurityVerdicts(targets)
			}, void 0);
		} catch (err) {
			respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, formatErrorMessage(err)));
		}
	},
	"skills.skillCard": async ({ params, respond, context }) => {
		if (!assertValidParams(params, validateSkillsSkillCardParams, "skills.skillCard", respond)) return;
		const resolved = resolveSkillsAgentWorkspace(params, context);
		if (!resolved.ok) {
			respond(false, void 0, resolved.error);
			return;
		}
		const { report, files } = await buildRemoteAwareWorkspaceSkillStatus(resolved, void 0, params.skillKey);
		const skill = report.skills.find((candidate) => candidate.skillKey === params.skillKey);
		if (!skill?.skillCard) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `skill card not found for ${params.skillKey}`));
			return;
		}
		const content = files.find((file) => file.name === skill.name && file.filePath === skill.filePath)?.skillCard?.content;
		if (content === void 0) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `skill card not readable for ${params.skillKey}`));
			return;
		}
		respond(true, {
			schema: "openclaw.skills.skill-card.v1",
			skillKey: skill.skillKey,
			path: skill.skillCard.path,
			sizeBytes: skill.skillCard.sizeBytes,
			content
		}, void 0);
	},
	"skills.bins": async ({ params, respond, context }) => {
		if (!assertValidParams(params, validateSkillsBinsParams, "skills.bins", respond)) return;
		const cfg = context.getRuntimeConfig();
		const bins = /* @__PURE__ */ new Set();
		for (const agentId of listAgentIds(cfg)) {
			const { entries } = await prepareWorkspaceSkillEntries(resolveAgentWorkspaceDir(cfg, agentId), {
				config: cfg,
				agentId,
				agentSkillFilter: "ignore"
			});
			for (const bin of collectSkillBins(entries)) bins.add(bin);
		}
		respond(true, { bins: [...bins].toSorted() }, void 0);
	},
	"skills.search": async ({ params, respond }) => {
		if (!assertValidParams(params, validateSkillsSearchParams, "skills.search", respond)) return;
		try {
			const results = await searchSkillsFromClawHub({
				query: params.query,
				limit: params.limit
			});
			registerClawHubCatalogIconUrls(results.map((result) => result.icon ?? void 0));
			respond(true, { results }, void 0);
		} catch (err) {
			respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, formatErrorMessage(err)));
		}
	},
	"skills.detail": async ({ params, respond }) => {
		if (!assertValidParams(params, validateSkillsDetailParams, "skills.detail", respond)) return;
		try {
			const requested = parseRequestedClawHubSkillRef(params.slug);
			if (requested.requestedReference) {
				respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `ClawHub cannot return details for ${requested.requestedReference}; external skill sources are install-only. Install it directly, or run "openclaw skills install ${requested.requestedReference}".`));
				return;
			}
			const detail = await fetchClawHubSkillDetail({
				slug: requested.slug,
				...requested.ownerHandle ? { ownerHandle: requested.ownerHandle } : {}
			});
			registerClawHubCatalogIconUrls([detail.skill?.icon ?? void 0, detail.owner?.image ?? void 0]);
			respond(true, detail, void 0);
		} catch (err) {
			respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, formatErrorMessage(err)));
		}
	},
	"skills.proposals.list": defineSkillsProposalWorkspaceHandler("skills.proposals.list", validateSkillsProposalsListParams, async (_parsedParams, resolved) => {
		const options = {
			config: resolved.cfg,
			agentId: resolved.agentId
		};
		return {
			...await listSkillProposals(options),
			installedSkills: listWritableWorkshopSkillSummaries(options).map(({ name, skillKey, description }) => ({
				name,
				skillKey,
				description
			}))
		};
	}),
	"skills.workshop.read": defineSkillsProposalWorkspaceHandler("skills.workshop.read", validateSkillsWorkshopReadParams, async (parsedParams, resolved) => {
		const skill = await readWritableWorkshopSkill(parsedParams.name, {
			config: resolved.cfg,
			agentId: resolved.agentId
		});
		return {
			name: skill.skillName,
			skillKey: skill.skillKey,
			description: skill.description,
			content: skill.content
		};
	}),
	"skills.proposals.events.list": defineSkillsProposalWorkspaceHandler("skills.proposals.events.list", validateSkillsProposalEventsListParams, async (parsedParams, resolved) => listSkillProposalEvents({
		agentId: resolved.agentId,
		config: resolved.cfg,
		proposalId: parsedParams.proposalId,
		afterSequence: parsedParams.afterSequence,
		limit: parsedParams.limit
	})),
	"skills.proposals.inspect": defineSkillsProposalWorkspaceHandler("skills.proposals.inspect", validateSkillsProposalInspectParams, async (parsedParams, resolved) => {
		const proposal = await inspectSkillProposal(parsedParams.proposalId, {
			agentId: resolved.agentId,
			config: resolved.cfg
		});
		if (!proposal) throw new Error(`Skill proposal not found: ${parsedParams.proposalId}`);
		return projectGatewaySkillProposalReadResult(proposal);
	}),
	"skills.proposals.evaluate": defineSkillsProposalWorkspaceHandler("skills.proposals.evaluate", validateSkillsProposalEvaluateParams, (parsedParams, resolved) => evaluateSkillProposal({
		...proposalWorkspaceOptions(resolved),
		proposalId: parsedParams.proposalId,
		expectedRevisionHash: parsedParams.expectedRevisionHash,
		correlationId: parsedParams.correlationId,
		trigger: "manual"
	}).then(projectGatewaySkillProposalResult)),
	"skills.proposals.create": defineSkillsProposalWorkspaceHandler("skills.proposals.create", validateSkillsProposalCreateParams, (parsedParams, resolved, options) => proposeCreateSkill({
		...proposalWorkspaceOptions(resolved),
		assertCommitAllowed: captureGatewayClientUploadCommitGuard({
			method: "skills.proposals.create",
			requestParams: parsedParams,
			client: options.client,
			context: options.context
		}),
		name: parsedParams.name,
		description: parsedParams.description,
		content: parsedParams.content,
		supportFiles: parsedParams.supportFiles,
		createdBy: "gateway",
		goal: parsedParams.goal,
		evidence: parsedParams.evidence
	}).then(projectGatewaySkillProposalReadResult)),
	"skills.proposals.update": defineSkillsProposalWorkspaceHandler("skills.proposals.update", validateSkillsProposalUpdateParams, (parsedParams, resolved, options) => proposeUpdateSkill({
		...proposalWorkspaceOptions(resolved),
		assertCommitAllowed: captureGatewayClientUploadCommitGuard({
			method: "skills.proposals.update",
			requestParams: parsedParams,
			client: options.client,
			context: options.context
		}),
		skillName: parsedParams.skillName,
		description: parsedParams.description,
		content: parsedParams.content,
		supportFiles: parsedParams.supportFiles,
		createdBy: "gateway",
		goal: parsedParams.goal,
		evidence: parsedParams.evidence
	}).then(projectGatewaySkillProposalReadResult)),
	"skills.proposals.revise": defineSkillsProposalWorkspaceHandler("skills.proposals.revise", validateSkillsProposalReviseParams, (parsedParams, resolved, options) => reviseSkillProposal({
		...proposalWorkspaceOptions(resolved),
		assertCommitAllowed: captureGatewayClientUploadCommitGuard({
			method: "skills.proposals.revise",
			requestParams: parsedParams,
			client: options.client,
			context: options.context
		}),
		proposalId: parsedParams.proposalId,
		expectedRevisionHash: parsedParams.expectedRevisionHash,
		correlationId: parsedParams.correlationId,
		content: parsedParams.content,
		supportFiles: parsedParams.supportFiles,
		description: parsedParams.description,
		goal: parsedParams.goal,
		evidence: parsedParams.evidence
	}).then(projectGatewaySkillProposalReadResult)),
	"skills.proposals.requestRevision": defineSkillsProposalWorkspaceHandler("skills.proposals.requestRevision", validateSkillsProposalRequestRevisionParams, async (parsedParams, resolved, opts) => {
		const expectedRevisionHash = parsedParams.expectedRevisionHash;
		const proposal = await inspectSkillProposal(parsedParams.proposalId, {
			agentId: resolved.agentId,
			config: resolved.cfg
		});
		if (!proposal) throw new Error(`Skill proposal not found: ${parsedParams.proposalId}`);
		if (proposal.record.status !== "pending") throw new Error(`Skill proposal is not pending: ${parsedParams.proposalId}`);
		assertExpectedRevisionHash(proposal.revisionHash, expectedRevisionHash);
		await forwardSkillWorkshopRevisionToChatSend(opts, {
			agentId: resolved.agentId,
			expectedRevisionHash,
			idempotencyKey: parsedParams.idempotencyKey,
			instructions: parsedParams.instructions,
			proposal,
			workspaceDir: resolved.workspaceDir,
			sessionId: parsedParams.sessionId,
			sessionKey: parsedParams.sessionKey,
			targetAgentId: parsedParams.targetAgentId ? normalizeAgentId(parsedParams.targetAgentId) : void 0
		});
		return SKILL_PROPOSAL_RESPONSE_HANDLED;
	}),
	"skills.proposals.apply": defineSkillsProposalWorkspaceHandler("skills.proposals.apply", validateSkillsProposalDecisionParams, (parsedParams, resolved) => applySkillProposal({
		...proposalWorkspaceOptions(resolved),
		proposalId: parsedParams.proposalId,
		expectedRevisionHash: parsedParams.expectedRevisionHash,
		correlationId: parsedParams.correlationId,
		reason: parsedParams.reason
	}).then(projectGatewaySkillProposalResult)),
	"skills.proposals.reject": defineSkillsProposalWorkspaceHandler("skills.proposals.reject", validateSkillsProposalDecisionParams, (parsedParams, resolved) => rejectSkillProposal({
		...proposalWorkspaceOptions(resolved),
		proposalId: parsedParams.proposalId,
		expectedRevisionHash: parsedParams.expectedRevisionHash,
		correlationId: parsedParams.correlationId,
		reason: parsedParams.reason
	}).then(projectGatewaySkillProposalRecord)),
	"skills.proposals.quarantine": defineSkillsProposalWorkspaceHandler("skills.proposals.quarantine", validateSkillsProposalActionParams, (parsedParams, resolved) => quarantineSkillProposal({
		...proposalWorkspaceOptions(resolved),
		proposalId: parsedParams.proposalId,
		expectedRevisionHash: parsedParams.expectedRevisionHash,
		correlationId: parsedParams.correlationId,
		reason: parsedParams.reason
	}).then(projectGatewaySkillProposalRecord)),
	"skills.install": handleSkillsInstall,
	"skills.update": async ({ params, respond, context }) => {
		if (!assertValidParams(params, validateSkillsUpdateParams, "skills.update", respond)) return;
		const p = params;
		if ("source" in p) {
			if (!p.slug && !p.all) {
				respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "clawhub skills.update requires \"slug\" or \"all\""));
				return;
			}
			if (p.slug && p.all) {
				respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "clawhub skills.update accepts either \"slug\" or \"all\", not both"));
				return;
			}
			const resolved = resolveSkillsAgentWorkspace(params, context);
			if (!resolved.ok) {
				respond(false, void 0, resolved.error);
				return;
			}
			const results = await updateSkillsFromClawHub({
				workspaceDir: resolved.workspaceDir,
				slug: p.slug,
				...p.force ? { force: true } : {},
				logger: context.logGateway,
				config: resolved.cfg
			});
			const errors = results.filter((result) => !result.ok);
			const warnings = collectClawHubTrustWarnings(results);
			respond(errors.length === 0, {
				ok: errors.length === 0,
				skillKey: p.slug ?? "*",
				config: {
					source: "clawhub",
					results
				}
			}, errors.length === 0 ? void 0 : errorShape(ErrorCodes.UNAVAILABLE, errors.map((result) => result.error).join("; "), { details: {
				results,
				...warnings.length > 0 ? { warnings } : {}
			} }));
			return;
		}
		const updated = await updateSkillConfigEntry(p);
		respond(true, {
			ok: true,
			skillKey: p.skillKey,
			config: redactConfigObject(updated)
		}, void 0);
	}
};
//#endregion
export { skillsHandlers };
