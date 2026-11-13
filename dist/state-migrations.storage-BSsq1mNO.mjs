import { f as asSafeIntegerInRange } from "./number-coercion-Dq1l5muL.mjs";
import { r as asNullableRecord } from "./record-coerce-TIsquoVR.mjs";
import { o as parseRegistryNpmSpec } from "./npm-registry-spec-CwucyVOH.mjs";
import { n as hashFileDescriptorSync } from "./file-descriptor-B4yBUiAP.mjs";
import { g as projectDeliveryQueueTerminalEntry, m as inferDeliveryQueueFailureRetention, y as deliveryQueueMetadata } from "./openclaw-state-db-legacy-backfills-xddLXhvs.mjs";
import { l as runOpenClawStateWriteTransaction } from "./openclaw-state-db-DM-mSY0m.mjs";
import { a as recordLegacyMigrationReceipt, c as resolveLegacyMigrationSourceKey, r as readLegacyMigrationReceiptFromDatabase, t as markLegacyMigrationSourceRemoved } from "./state-migrations.receipts-hdU93ZN1.mjs";
import "./installed-plugin-index-CrJ6zmAL.mjs";
import { a as createPluginInstallRecordMap, d as setPluginInstallRecordMapEntry, i as copyPluginInstallRecordMap, l as parsePluginInstallRecordMap, o as getPluginInstallRecordMapEntry, u as serializePluginInstallRecordMap } from "./installed-plugin-record-match-jRpkbRKW.mjs";
import { t as parseInstalledPluginIndex } from "./installed-plugin-index-store-CUXGXwqh.mjs";
import { r as migrationFileExists } from "./state-migrations.fs-lkr0wCF_.mjs";
import { a as listLegacyDeliveryQueueFiles, i as listLegacyDeliveryQueueDeliveredMarkers, o as resolveLegacyDeliveryQueuePath, t as LEGACY_DELIVERY_QUEUE_DIRS } from "./delivery-queue-legacy-files-BUh-vm0t.mjs";
import { c as readLegacyMigrationSourceSnapshotSync, n as assertLegacyMigrationSourceUnchanged } from "./state-migrations.source-snapshot-DY_wIW_B.mjs";
import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
//#region src/infra/state-migrations.storage.ts
const LEGACY_DELIVERY_QUEUE_MAX_AGE_MS = 2592e5;
function hashLegacyArchiveSource(sourcePath) {
	const fd = fs.openSync(sourcePath, "r");
	try {
		return hashFileDescriptorSync(fd).sha256;
	} finally {
		fs.closeSync(fd);
	}
}
function archiveLegacyFileSource(params) {
	try {
		let sourceSha256;
		for (let index = 1;; index++) {
			const targetPath = index === 1 ? `${params.sourcePath}.migrated` : `${params.sourcePath}.migrated.${index}`;
			if (!fs.existsSync(targetPath)) {
				fs.renameSync(params.sourcePath, targetPath);
				return {
					targetPath,
					action: "archived"
				};
			}
			sourceSha256 ??= hashLegacyArchiveSource(params.sourcePath);
			if (sourceSha256 === hashLegacyArchiveSource(targetPath)) {
				fs.rmSync(params.sourcePath, { force: true });
				return {
					targetPath,
					action: "removed"
				};
			}
		}
	} catch (err) {
		params.warnings.push(`Failed archiving ${params.label} ${params.sourcePath}: ${String(err)}`);
		return null;
	}
}
function readLegacyInstalledPluginIndex(sourcePath) {
	try {
		const parsed = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
		const current = parseInstalledPluginIndex(parsed);
		if (current) return current;
		const topLevelInstallRecords = readLegacyTopLevelInstallRecords(parsed);
		const installRecords = topLevelInstallRecords === void 0 ? readLegacyEmbeddedInstallRecords(parsed) : topLevelInstallRecords;
		if (!installRecords) return null;
		return parseInstalledPluginIndex({
			version: 1,
			hostContractVersion: "legacy",
			compatRegistryVersion: "legacy",
			migrationVersion: 1,
			policyHash: "legacy",
			generatedAtMs: 0,
			installRecords,
			plugins: [],
			diagnostics: []
		});
	} catch {
		return null;
	}
}
function readLegacyTopLevelInstallRecords(parsed) {
	const legacy = asNullableRecord(parsed);
	if (!legacy) return null;
	const key = Object.hasOwn(legacy, "installRecords") ? "installRecords" : Object.hasOwn(legacy, "records") ? "records" : void 0;
	return key ? parsePluginInstallRecordMap(legacy[key]) : void 0;
}
function readLegacyEmbeddedInstallRecords(parsed) {
	const plugins = asNullableRecord(parsed)?.plugins;
	if (!Array.isArray(plugins)) return null;
	const records = createPluginInstallRecordMap();
	let found = false;
	for (const item of plugins) {
		const plugin = asNullableRecord(item);
		if (!plugin) return null;
		if (!Object.hasOwn(plugin, "installRecord")) continue;
		const { pluginId, installRecord } = plugin;
		if (typeof pluginId !== "string" || !pluginId.trim()) return null;
		setPluginInstallRecordMapEntry(records, pluginId, installRecord);
		found = true;
	}
	return found ? parsePluginInstallRecordMap(records) : null;
}
function legacyInstalledPluginIndexMatches(current, legacy) {
	return serializePluginInstallRecordMap(current.installRecords) === serializePluginInstallRecordMap(legacy.installRecords) && JSON.stringify(current.plugins) === JSON.stringify(legacy.plugins) && JSON.stringify(current.diagnostics) === JSON.stringify(legacy.diagnostics);
}
function readInstallRecordField(record, key) {
	return record[key];
}
function legacyInstallRecordHasCurrentResolvedIdentity(params) {
	const { currentRecord, legacyRecord } = params;
	if (legacyRecord.spec) return currentRecord.resolvedSpec === legacyRecord.spec;
	return Boolean(legacyRecord.resolvedSpec && currentRecord.resolvedSpec === legacyRecord.resolvedSpec);
}
function readAuthoritativeCurrentNpmIdentity(record) {
	const { resolvedName, resolvedVersion, resolvedSpec } = record;
	if (resolvedName && resolvedVersion) return {
		name: resolvedName,
		version: resolvedVersion
	};
	const parsed = resolvedSpec ? parseRegistryNpmSpec(resolvedSpec) : null;
	if (parsed?.selectorKind === "exact-version" && parsed.selector) return {
		name: parsed.name,
		version: parsed.selector
	};
	return null;
}
function legacyNpmInstallRecordSupersededByCurrent(params) {
	const { currentRecord, legacyRecord } = params;
	if (currentRecord.source !== "npm" || legacyRecord.source !== "npm") return false;
	const legacyParsedSpec = legacyRecord.spec ? parseRegistryNpmSpec(legacyRecord.spec) : null;
	if (legacyParsedSpec?.selectorKind !== "exact-version") return false;
	const currentIdentity = readAuthoritativeCurrentNpmIdentity(currentRecord);
	return Boolean(currentIdentity && legacyParsedSpec.selector && currentIdentity.name === legacyParsedSpec.name && currentIdentity.version === legacyParsedSpec.selector);
}
function legacyInstallRecordCoveredByCurrent(currentRecord, legacyRecord) {
	if (currentRecord.source !== legacyRecord.source) return false;
	if (legacyNpmInstallRecordSupersededByCurrent({
		currentRecord,
		legacyRecord
	})) return true;
	for (const key of Object.keys(legacyRecord).toSorted()) {
		const currentValue = readInstallRecordField(currentRecord, key);
		if (currentValue === readInstallRecordField(legacyRecord, key)) continue;
		if (key === "spec" && legacyInstallRecordHasCurrentResolvedIdentity({
			currentRecord,
			legacyRecord
		})) continue;
		if ((key === "resolvedAt" || key === "installedAt") && typeof currentValue === "string") continue;
		return false;
	}
	return true;
}
function mergeLegacyInstalledPluginIndexRecords(current, legacy) {
	const installRecords = copyPluginInstallRecordMap(current.installRecords);
	const conflicts = [];
	let addedCount = 0;
	for (const [pluginId, legacyRecord] of Object.entries(legacy.installRecords)) {
		const currentRecord = getPluginInstallRecordMapEntry(installRecords, pluginId);
		if (!currentRecord) {
			setPluginInstallRecordMapEntry(installRecords, pluginId, legacyRecord);
			addedCount += 1;
			continue;
		}
		if (!legacyInstallRecordCoveredByCurrent(currentRecord, legacyRecord)) conflicts.push(pluginId);
	}
	return {
		merged: {
			...current,
			installRecords
		},
		addedCount,
		conflicts
	};
}
function archiveLegacyInstalledPluginIndex(params) {
	const resolution = archiveLegacyFileSource({
		sourcePath: params.sourcePath,
		label: "plugin install index",
		warnings: params.warnings
	});
	if (!resolution) return;
	params.changes.push(resolution.action === "removed" ? `Removed already-archived plugin install index legacy source ${params.sourcePath}` : `Archived plugin install index legacy source → ${resolution.targetPath}`);
}
function hardenLegacyImportSource(params) {
	try {
		fs.chmodSync(params.sourcePath, 384);
		return true;
	} catch (err) {
		params.warnings.push(`Failed securing ${params.label} legacy source: ${String(err)}`);
		return false;
	}
}
function archiveLegacyImportSource(params) {
	if (!hardenLegacyImportSource(params)) return null;
	const resolution = archiveLegacyFileSource({
		sourcePath: params.sourcePath,
		label: `${params.label} legacy source`,
		warnings: params.warnings
	});
	if (!resolution) return null;
	if (resolution.action === "archived") try {
		fs.chmodSync(resolution.targetPath, 384);
	} catch (err) {
		params.warnings.push(`Failed securing archived ${params.label} legacy source: ${String(err)}`);
	}
	params.changes.push(resolution.action === "removed" ? `Removed already-archived ${params.label} legacy source ${params.sourcePath}` : `Archived ${params.label} legacy source → ${resolution.targetPath}`);
	return resolution;
}
function buildLegacyDeliveryQueueRow(params) {
	const originalEnqueuedAt = asSafeIntegerInRange(params.entry.enqueuedAt, { min: 0 }) ?? params.now;
	const retryCount = asSafeIntegerInRange(params.entry.retryCount, { min: 0 }) ?? 0;
	const lastAttemptAt = asSafeIntegerInRange(params.entry.lastAttemptAt, { min: 0 });
	const platformSendStartedAt = asSafeIntegerInRange(params.entry.platformSendStartedAt, { min: 0 });
	const failed = params.status === "failed";
	const retention = failed ? inferDeliveryQueueFailureRetention(params.entry, params.id, params.queueName) : void 0;
	if (failed && !retention) return null;
	const failedAt = failed ? asSafeIntegerInRange(params.entry.failedAt, { min: 0 }) ?? lastAttemptAt ?? originalEnqueuedAt : null;
	const enqueuedAt = failedAt ?? originalEnqueuedAt;
	const meta = failed ? void 0 : deliveryQueueMetadata(params.queueName, params.entry);
	const retainedEntry = {
		...params.entry,
		id: params.id,
		enqueuedAt,
		retryCount
	};
	if (lastAttemptAt === void 0) delete retainedEntry.lastAttemptAt;
	else retainedEntry.lastAttemptAt = lastAttemptAt;
	if (platformSendStartedAt === void 0) delete retainedEntry.platformSendStartedAt;
	else retainedEntry.platformSendStartedAt = platformSendStartedAt;
	const failedEntry = failed ? projectDeliveryQueueTerminalEntry({
		id: params.id,
		retryCount
	}, enqueuedAt, "failed", retention) : void 0;
	return {
		queue_name: params.queueName,
		id: params.id,
		status: params.status,
		entry_kind: meta?.entryKind ?? null,
		session_key: meta?.sessionKey ?? null,
		channel: meta?.channel ?? null,
		target: meta?.target ?? null,
		account_id: meta?.accountId ?? null,
		retry_count: retryCount,
		last_attempt_at: !failed ? lastAttemptAt ?? null : null,
		last_error: !failed && typeof params.entry.lastError === "string" ? params.entry.lastError : null,
		recovery_state: failed ? failedEntry?.recoveryState ?? null : typeof params.entry.recoveryState === "string" ? params.entry.recoveryState : null,
		platform_send_started_at: !failed ? platformSendStartedAt ?? null : null,
		entry_json: JSON.stringify(failedEntry ?? retainedEntry),
		enqueued_at: enqueuedAt,
		updated_at: params.now,
		failed_at: failedAt
	};
}
function legacyDeliveryQueueRowsMatch(existing, incoming) {
	return [
		"status",
		"entry_kind",
		"session_key",
		"channel",
		"target",
		"account_id",
		"retry_count",
		"last_attempt_at",
		"last_error",
		"recovery_state",
		"platform_send_started_at",
		"entry_json",
		"enqueued_at",
		"failed_at"
	].every((column) => {
		const left = existing[column];
		const right = incoming[column];
		return (typeof left === "bigint" ? Number(left) : left) === (typeof right === "bigint" ? Number(right) : right);
	});
}
/** Never recursively remove a queue directory containing retained archives or unknown files. */
function removeEmptyLegacyDeliveryQueueDirs(queueDir) {
	for (const dir of [path.join(queueDir, "failed"), queueDir]) try {
		fs.rmdirSync(dir);
	} catch (error) {
		if (![
			"ENOENT",
			"ENOTEMPTY",
			"EEXIST"
		].includes(error.code ?? "")) throw error;
	}
}
async function migrateLegacyDeliveryQueues(params) {
	const changes = [];
	const warnings = [];
	const env = {
		...process.env,
		OPENCLAW_STATE_DIR: params.stateDir
	};
	const now = Date.now();
	let refused = false;
	for (const queue of LEGACY_DELIVERY_QUEUE_DIRS) {
		const queueDir = resolveLegacyDeliveryQueuePath(params.stateDir, queue.dirName);
		const files = listLegacyDeliveryQueueFiles(queueDir);
		const markerPaths = listLegacyDeliveryQueueDeliveredMarkers(queueDir);
		if (files.length === 0 && markerPaths.length === 0) continue;
		const imports = [];
		const sourceIds = /* @__PURE__ */ new Map();
		const unresolvedPendingIds = /* @__PURE__ */ new Set();
		const conflicts = [];
		let imported = 0;
		const deliveredNames = new Set(markerPaths.map((file) => path.basename(file, ".delivered")));
		const deliveredIds = new Set(deliveredNames);
		const markerIds = new Map([...deliveredNames].map((name) => [name, /* @__PURE__ */ new Set([name])]));
		for (const file of [...files, ...markerPaths.map((sourcePath) => ({
			sourcePath,
			status: "delivered"
		}))]) try {
			const snapshot = readLegacyMigrationSourceSnapshotSync({
				sourcePath: file.sourcePath,
				label: queue.label
			});
			let reason;
			let mediaPaths = [];
			let row = null;
			if (file.status === "delivered") {
				reason = "delivered";
				try {
					const id = asNullableRecord(JSON.parse(snapshot.raw))?.id;
					if (typeof id === "string" && id) {
						deliveredIds.add(id);
						markerIds.get(path.basename(file.sourcePath, ".delivered"))?.add(id);
					}
				} catch {}
			} else {
				const parsed = JSON.parse(snapshot.raw);
				if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("expected a queue entry object");
				const entry = parsed;
				const id = typeof entry.id === "string" ? entry.id : path.basename(file.sourcePath, ".json");
				if (!id) throw new Error("missing queue entry id");
				const enqueuedAt = asSafeIntegerInRange(entry.enqueuedAt, { min: 0 });
				if (file.status === "pending") {
					sourceIds.set(file.sourcePath, id);
					if (deliveredNames.has(path.basename(file.sourcePath, ".json")) || deliveredNames.has(id)) reason = "delivered";
					else if (enqueuedAt === void 0 || enqueuedAt > now) reason = "unverified enqueue time";
					else if (now - enqueuedAt >= LEGACY_DELIVERY_QUEUE_MAX_AGE_MS) reason = "at least 72 hours old";
				}
				if (reason && reason !== "delivered" || file.status === "failed") mediaPaths = (await import("./state-migrations.delivery-queue-media-DMAnB0n2.mjs")).resolveLegacyDeliveryQueueMediaPaths(entry, params.stateDir);
				if (!reason) row = buildLegacyDeliveryQueueRow({
					queueName: queue.queueName,
					id,
					status: file.status,
					entry,
					now
				});
			}
			imports.push({
				snapshot,
				sourceKey: resolveLegacyMigrationSourceKey("delivery-queue", file.sourcePath, snapshot.sha256),
				row,
				reason,
				mediaPaths
			});
		} catch (error) {
			if (file.status === "pending") unresolvedPendingIds.add(sourceIds.get(file.sourcePath));
			refused = true;
			warnings.push(`Left malformed ${queue.label} source ${file.sourcePath} in place: ${String(error)}`);
		}
		for (const [sourcePath, id] of sourceIds) if (deliveredNames.has(path.basename(sourcePath, ".json"))) {
			deliveredIds.add(id);
			markerIds.get(path.basename(sourcePath, ".json"))?.add(id);
		}
		for (const item of imports) {
			const id = sourceIds.get(item.snapshot.sourcePath);
			if (id !== void 0 && deliveredIds.has(id)) {
				item.row = null;
				item.reason = "delivered";
				item.mediaPaths = [];
			}
		}
		const committed = [];
		try {
			runOpenClawStateWriteTransaction(({ db }) => {
				const insert = db.prepare(`INSERT INTO delivery_queue_entries (queue_name, id, status, entry_kind, session_key, channel, target, account_id, retry_count, last_attempt_at, last_error, recovery_state, platform_send_started_at, entry_json, enqueued_at, updated_at, failed_at) VALUES (@queue_name, @id, @status, @entry_kind, @session_key, @channel, @target, @account_id, @retry_count, @last_attempt_at, @last_error, @recovery_state, @platform_send_started_at, @entry_json, @enqueued_at, @updated_at, @failed_at)`);
				for (const item of imports) {
					const { snapshot, sourceKey, row } = item;
					assertLegacyMigrationSourceUnchanged({
						sourcePath: snapshot.sourcePath,
						snapshot,
						label: queue.label
					});
					const receipt = readLegacyMigrationReceiptFromDatabase(db, sourceKey);
					if (receipt) {
						const report = asNullableRecord(JSON.parse(receipt.reportJson));
						const reason = report?.reason;
						const mediaPaths = report?.mediaPaths;
						if (typeof reason !== "string" || !Array.isArray(mediaPaths) || !mediaPaths.every((value) => typeof value === "string")) throw new Error("Legacy delivery import receipt has no verified disposition");
						committed.push({
							...item,
							reason: reason === "imported" ? void 0 : reason,
							mediaPaths,
							mediaBackups: report?.mediaBackups
						});
						continue;
					}
					if (row) {
						const existing = db.prepare("SELECT * FROM delivery_queue_entries WHERE queue_name = ? AND id = ?").get(queue.queueName, row.id);
						if (existing && !legacyDeliveryQueueRowsMatch(existing, row)) {
							conflicts.push(row.id);
							continue;
						}
						if (!existing) {
							insert.run(row);
							imported++;
						}
					}
					recordLegacyMigrationReceipt(db, {
						sourceKey,
						migrationKind: "delivery-queues",
						sourcePath: snapshot.sourcePath,
						targetTable: "delivery_queue_entries",
						sourceSha256: snapshot.sha256,
						sourceSizeBytes: snapshot.size,
						sourceRecordCount: 1,
						runId: randomUUID(),
						now,
						reportJson: JSON.stringify({
							queueName: queue.queueName,
							reason: item.reason ?? "imported",
							mediaPaths: item.mediaPaths,
							mediaPreserved: item.mediaPaths.length === 0
						})
					});
					committed.push(item);
				}
			}, { env });
		} catch (error) {
			refused = true;
			warnings.push(`Failed migrating ${queue.label} ${queueDir}: ${String(error)}`);
			continue;
		}
		if (imported > 0) changes.push(`Migrated ${imported} ${queue.label} ${imported === 1 ? "entry" : "entries"} → shared SQLite state`);
		if (conflicts.length > 0) {
			refused = true;
			warnings.push(`Left ${queue.label} in place because ${conflicts.length} ${conflicts.length === 1 ? "entry" : "entries"} already existed in shared state: ${conflicts[0]}`);
		}
		for (const { snapshot, sourceKey, reason, mediaPaths, mediaBackups } of committed) {
			const ids = markerIds.get(path.basename(snapshot.sourcePath, ".delivered"));
			if (reason === "delivered" && [...unresolvedPendingIds].some((id) => id === void 0 || id === sourceIds.get(snapshot.sourcePath) || ids?.has(id))) continue;
			if (snapshot.sourcePath.endsWith(".delivered") && ids && files.some((file) => file.status === "pending" && (ids.has(path.basename(file.sourcePath, ".json")) || ids.has(sourceIds.get(file.sourcePath) ?? "")) && migrationFileExists(file.sourcePath))) continue;
			const recordMediaPreservation = (preserved, copies) => {
				runOpenClawStateWriteTransaction(({ db }) => {
					db.prepare("UPDATE migration_sources SET report_json = ?, removed_source = 0 WHERE source_key = ?").run(JSON.stringify({
						queueName: queue.queueName,
						reason: reason ?? "imported",
						mediaPaths,
						mediaPreserved: preserved,
						mediaBackups: copies
					}), sourceKey);
				}, { env });
			};
			try {
				assertLegacyMigrationSourceUnchanged({
					sourcePath: snapshot.sourcePath,
					snapshot,
					label: queue.label
				});
				if (mediaPaths.length > 0) recordMediaPreservation(false, mediaBackups);
				const mediaArchive = mediaPaths.length > 0 ? await (await import("./state-migrations.delivery-queue-media-DMAnB0n2.mjs")).preserveLegacyDeliveryQueueMedia({
					mediaPaths,
					previousBackups: mediaBackups,
					sourcePath: snapshot.sourcePath,
					stateDir: params.stateDir
				}) : void 0;
				if (mediaArchive) recordMediaPreservation(true, mediaArchive.copies);
				assertLegacyMigrationSourceUnchanged({
					sourcePath: snapshot.sourcePath,
					snapshot,
					label: queue.label
				});
				const archive = archiveLegacyImportSource({
					sourcePath: snapshot.sourcePath,
					label: queue.label,
					changes,
					warnings
				});
				if (archive) markLegacyMigrationSourceRemoved(sourceKey, env);
				if (reason && reason !== "delivered") warnings.push(`Did not replay ${queue.label} source ${snapshot.sourcePath}: ${reason}. Original content is retained at ${archive?.targetPath ?? snapshot.sourcePath}${mediaArchive ? `; queue-owned media copies: ${mediaArchive.directory}` : ""}; review it before explicitly sending a new message. Do not restore it to the queue.`);
			} catch (error) {
				warnings.push(`Retained ${queue.label} source or archive ${snapshot.sourcePath}; run openclaw doctor --fix to retry cleanup: ${String(error)}`);
			}
		}
		try {
			removeEmptyLegacyDeliveryQueueDirs(queueDir);
		} catch (error) {
			warnings.push(`Failed cleaning empty ${queue.label} directory ${queueDir}: ${String(error)}`);
		}
	}
	return {
		changes,
		warnings,
		...!refused && warnings.length > 0 ? { warningDisposition: "recoverable" } : {}
	};
}
//#endregion
export { migrateLegacyDeliveryQueues as a, mergeLegacyInstalledPluginIndexRecords as i, archiveLegacyInstalledPluginIndex as n, readLegacyInstalledPluginIndex as o, legacyInstalledPluginIndexMatches as r, archiveLegacyImportSource as t };
