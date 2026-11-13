import { w as root } from "./fs-safe-CHQXnCPk.mjs";
import { n as resolvePathViaExistingAncestorSync } from "./boundary-path-CAv_plX7.mjs";
import { t as hasErrnoCode } from "./errno-FR4CRyya.mjs";
import { r as resolveStateDir } from "./state-dir-CfAW6S2K.mjs";
import { m as resolveConfigPath } from "./paths-CtO6iw0c.mjs";
import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { n as sha256Hex } from "./node-crypto-BInnzoVt.mjs";
import "./crypto-digest-y6oZN-_F.mjs";
import { Et as _enum, Fn as object, Jn as string } from "./schemas-BOYIvvln.mjs";
import { s as updateRecoveryCaptureStateSchema } from "./update-run-schema-Ap8UiBpH.mjs";
import { c as sha256File, i as pinDirectory } from "./directory-durability-fWp4i1Sl.mjs";
import { i as sameFileMutationFingerprint } from "./file-descriptor-B4yBUiAP.mjs";
import { a as getUpdateRunAsync } from "./update-run-reader-DZIHUks3.mjs";
import "./update-capture-paths-XsG-DxQI.mjs";
import { i as parseUpdateRecoveryBackupManifest } from "./backup-verify-manifest-B4n-YkgS.mjs";
import path from "node:path";
import fs from "node:fs/promises";
import { isDeepStrictEqual } from "node:util";
//#region src/infra/update-recovery-backup-status.ts
const updateRecoveryBackupRefSchema = object({
	directory: string().min(1),
	manifestPath: string().min(1),
	manifestSha256: string().regex(/^[a-f0-9]{64}$/u)
}).strict();
const sha256 = string().regex(/^[a-f0-9]{64}$/u);
const updateRecoveryTerminalOutcomeSchema = object({
	status: _enum(["restored", "committed"]),
	error: string().max(4096).optional(),
	manifestSha256: sha256
}).strict();
const updateRecoveryForwardResolutionSchema = updateRecoveryCaptureStateSchema.shape.forwardResolution.unwrap();
object({
	status: _enum([
		"pending",
		"restored",
		"committed",
		"restore-failed"
	]),
	error: string().optional()
}).strict();
const recordedOutcomeSchema = updateRecoveryTerminalOutcomeSchema;
async function statOrMissing(pathname) {
	try {
		return await fs.lstat(pathname);
	} catch (error) {
		if (hasErrnoCode(error, "ENOENT")) return;
		throw error;
	}
}
async function fileDigest(pathname) {
	const source = await (await root(path.dirname(pathname))).open(path.basename(pathname), {
		symlinks: "reject",
		hardlinks: "reject"
	});
	try {
		const before = await source.handle.stat({ bigint: true });
		const hashed = await sha256File(source.handle);
		if (!sameFileMutationFingerprint(before, await source.handle.stat({ bigint: true }))) throw new Error(`Update recovery payload changed while reading: ${pathname}`);
		return {
			size: hashed.bytes,
			sha256: hashed.digest
		};
	} finally {
		await source.handle.close();
	}
}
function canonicalEntryPath(pathname) {
	const absolute = path.resolve(pathname);
	return path.join(resolvePathViaExistingAncestorSync(path.dirname(absolute)), path.basename(absolute));
}
const MAX_MANIFEST_BYTES = 134217728;
function backupStore(stateDir = resolveStateDir()) {
	return `${resolvePathViaExistingAncestorSync(stateDir)}.update-captures`;
}
function captureDirectory(runId, stateDir) {
	return path.join(backupStore(stateDir), runId);
}
const MAX_UPDATE_RECOVERY_OUTCOME_BYTES = 16384;
function assertManifestLocation(ref, manifest) {
	if (manifest.stateDir !== resolvePathViaExistingAncestorSync(resolveStateDir()) || manifest.configPath !== canonicalEntryPath(resolveConfigPath()) || ref.directory !== (manifest.generation && manifest.generation.kind !== "baseline" ? path.join(captureDirectory(manifest.runId, manifest.stateDir), manifest.generation.kind) : captureDirectory(manifest.runId, manifest.stateDir))) throw new Error("Update recovery backup belongs to another state directory or update run.");
}
async function withRecoveryMetadata(ref, authority, run) {
	authority.assertOwned();
	updateRecoveryBackupRefSchema.parse(ref);
	if (path.resolve(ref.directory) !== ref.directory || ref.manifestPath !== path.join(ref.directory, "manifest.json")) throw new Error("Invalid update recovery manifest locator.");
	const pin = await pinDirectory(ref.directory);
	try {
		const source = await root(ref.directory, {
			symlinks: "reject",
			hardlinks: "reject"
		});
		const bytes = await source.readBytes("manifest.json", { maxBytes: MAX_MANIFEST_BYTES });
		if (sha256Hex(bytes) !== ref.manifestSha256) throw new Error("Update recovery manifest changed before metadata access.");
		const manifest = parseUpdateRecoveryBackupManifest(bytes.toString("utf8"));
		assertManifestLocation(ref, manifest);
		let outcome;
		if (await statOrMissing(path.join(ref.directory, "outcome.json"))) {
			outcome = recordedOutcomeSchema.parse(await source.readJson("outcome.json", { maxBytes: MAX_UPDATE_RECOVERY_OUTCOME_BYTES }));
			if (outcome.manifestSha256 !== ref.manifestSha256) throw new Error("Update recovery outcome refers to another manifest.");
		}
		await pin.assertCurrent();
		authority.assertOwned();
		return await run({
			manifest,
			outcome,
			pin
		});
	} finally {
		await pin.close();
	}
}
/** Bind retained crash/refusal evidence without claiming it is a sealed or restorable generation. */
async function fingerprintIncompleteRecoveryGeneration(directory, assertOwned) {
	const observed = /* @__PURE__ */ new Map();
	const inventory = [];
	const walk = async (current) => {
		const pin = await pinDirectory(current);
		try {
			if (pin.receipt.realPath !== current) throw new Error("Incomplete recovery generation changed location.");
			const before = await fs.lstat(current, { bigint: true });
			observed.set(current, before);
			const entries = (await (await root(current)).list("", { withFileTypes: true })).toSorted((a, b) => a.name.localeCompare(b.name));
			for (const entry of entries) {
				assertOwned();
				const pathname = path.join(current, entry.name);
				if (entry.isDirectory) await walk(pathname);
				else if (entry.isFile) {
					const identity = await fs.lstat(pathname, { bigint: true });
					observed.set(pathname, identity);
					inventory.push([path.relative(directory, pathname), await fileDigest(pathname)]);
				} else throw new Error("Incomplete recovery generation contains an unsupported file kind.");
			}
			await pin.assertCurrent();
			assertOwned();
		} finally {
			await pin.close();
		}
	};
	await walk(directory);
	for (const [pathname, before] of observed) {
		const after = await fs.lstat(pathname, { bigint: true });
		if (!sameFileMutationFingerprint(before, after) || before.mode !== after.mode) throw new Error("Incomplete recovery generation changed while binding its evidence.");
		inventory.push([path.relative(directory, pathname), [
			before.dev,
			before.ino,
			before.mode,
			before.size,
			before.birthtimeNs,
			before.mtimeNs,
			before.ctimeNs
		].map(String)]);
	}
	assertOwned();
	return sha256Hex(JSON.stringify(inventory));
}
/** This records repair of current state, never reverse publication or permission to delete B/C/T. */
async function readBinding(ref, authority) {
	return withRecoveryMetadata(ref, authority, async ({ manifest, outcome, pin }) => {
		const run = await getUpdateRunAsync(manifest.runId);
		authority.assertOwned();
		const capture = run?.origin.updateRecoveryCapture;
		if (outcome || run?.status !== "failed" || run.finishedAtMs === null || !capture || capture.manifestSha256 !== ref.manifestSha256 || capture.restored || capture.retirement || manifest.schemaVersion !== 2 || manifest.generation?.kind !== "baseline") throw new Error("Forward recovery requires the same failed run and unresolved baseline.");
		const generations = {
			candidateSha256: null,
			preparedSha256: null
		};
		const incompleteGenerations = {};
		for (const kind of ["candidate", "prepared"]) {
			const directory = path.join(ref.directory, kind);
			if (!await statOrMissing(directory)) continue;
			if (!await statOrMissing(path.join(directory, "manifest.json"))) {
				incompleteGenerations[kind] = await fingerprintIncompleteRecoveryGeneration(directory, authority.assertOwned);
				continue;
			}
			const raw = await (await root(directory)).readBytes("manifest.json", {
				maxBytes: MAX_MANIFEST_BYTES,
				symlinks: "reject",
				hardlinks: "reject"
			});
			let generation;
			try {
				generation = parseUpdateRecoveryBackupManifest(raw.toString("utf8"));
			} catch (error) {
				if (!(error instanceof SyntaxError)) throw error;
				incompleteGenerations[kind] = await fingerprintIncompleteRecoveryGeneration(directory, authority.assertOwned);
				continue;
			}
			if (generation.runId !== manifest.runId || generation.installRoot !== manifest.installRoot || generation.stateDir !== manifest.stateDir || generation.configPath !== manifest.configPath || generation.generation?.kind !== kind || generation.generation.baselineSha256 !== ref.manifestSha256 || generation.generation.kind === "prepared" && generation.generation.candidateSha256 !== generations.candidateSha256) throw new Error("Forward recovery generation identity changed.");
			if (kind === "candidate") generations.candidateSha256 = sha256Hex(raw);
			else generations.preparedSha256 = sha256Hex(raw);
		}
		await pin.assertCurrent();
		authority.assertOwned();
		return {
			runId: manifest.runId,
			failedAtMs: run.finishedAtMs,
			manifestSha256: ref.manifestSha256,
			installRoot: manifest.installRoot,
			stateDir: manifest.stateDir,
			configPath: manifest.configPath,
			...generations,
			...Object.keys(incompleteGenerations).length > 0 ? { incompleteGenerations } : {}
		};
	});
}
/** Missing receipt keeps admission closed. Malformed or contradictory receipts fail closed. */
async function hasUpdateRecoveryForwardResolution(ref, authority = { assertOwned() {} }) {
	return withRecoveryMetadata(ref, authority, async ({ manifest, outcome }) => {
		const run = await getUpdateRunAsync(manifest.runId);
		authority.assertOwned();
		const value = run?.origin.updateRecoveryCapture?.forwardResolution;
		if (!value) return false;
		const receipt = updateRecoveryForwardResolutionSchema.parse(value);
		if (outcome || !isDeepStrictEqual(receipt.binding, await readBinding(ref, authority))) throw new Error("Forward recovery receipt is stale or contradicts its failed capture.");
		authority.assertOwned();
		return true;
	});
}
function resolveUpdateRecoveryTerminalOutcome(run, manifestSha256) {
	if (run?.status === "succeeded") return "committed";
	if (run?.status === "rolled-back" || run?.origin.updateRecoveryCapture?.restored === true && run.origin.updateRecoveryCapture.manifestSha256 === manifestSha256 || run?.steps.some((step) => (step.step === "state rollback" || step.step === "previous generation restoration") && step.status === "completed")) return "restored";
}
async function listBackups(installRoot) {
	const result = [];
	const store = backupStore();
	if (!await statOrMissing(store)) return result;
	for (const captureId of await fs.readdir(store)) {
		if (captureId === ".openclaw-private-update-capture") continue;
		const directory = path.join(store, captureId);
		const entry = await statOrMissing(directory);
		if (entry?.isFile() && /^agent-schema-.+\.tar\.gz$/u.test(captureId)) continue;
		const manifestPath = path.join(directory, "manifest.json");
		const manifestEntry = entry?.isDirectory() ? await statOrMissing(manifestPath) : void 0;
		if (entry?.isDirectory() && /^openclaw-update-canary-.+$/u.test(captureId) && !manifestEntry) continue;
		if (!entry?.isDirectory() || !manifestEntry?.isFile()) throw new Error(`Unresolved update capture ${directory} has incomplete publication. Inspection only: openclaw update status --json; npx openclaw@latest doctor --fix. Earlier captures are retained.`);
		const source = await root(directory, {
			symlinks: "reject",
			hardlinks: "reject"
		});
		const raw = await source.readText("manifest.json", { maxBytes: MAX_MANIFEST_BYTES });
		const manifest = parseUpdateRecoveryBackupManifest(raw);
		if (installRoot && manifest.installRoot !== path.resolve(installRoot)) continue;
		const ref = {
			directory,
			manifestPath,
			manifestSha256: sha256Hex(raw)
		};
		assertManifestLocation(ref, manifest);
		const capture = (await getUpdateRunAsync(manifest.runId))?.origin.updateRecoveryCapture;
		if (capture && capture.manifestSha256 !== ref.manifestSha256) throw new Error(`Update capture identity changed: ${manifestPath}. Inspect with openclaw update status --json; npx openclaw@latest doctor --fix.`);
		const terminalPath = path.join(directory, "outcome.json");
		let outcome;
		if (await statOrMissing(terminalPath)) {
			const terminal = recordedOutcomeSchema.parse(await source.readJson("outcome.json", { maxBytes: MAX_UPDATE_RECOVERY_OUTCOME_BYTES }));
			if (terminal.manifestSha256 !== ref.manifestSha256) throw new Error(`Update recovery outcome refers to another manifest: ${manifestPath}`);
			outcome = terminal;
		} else outcome = {
			status: capture?.status ?? "pending",
			error: capture?.error
		};
		result.push({
			ref,
			manifest,
			outcome
		});
	}
	return result.toSorted((a, b) => b.manifest.createdAt.localeCompare(a.manifest.createdAt));
}
/** Backup-local pending markers cannot override the update's durable terminal result. */
async function inspectUpdateRecoveryBackups(params = {}) {
	const snapshots = await listBackups(params.installRoot);
	const forwardResolved = /* @__PURE__ */ new Set();
	for (const { ref } of snapshots) if (await hasUpdateRecoveryForwardResolution(ref)) forwardResolved.add(ref.manifestSha256);
	return await Promise.all(snapshots.map(async ({ ref, manifest, outcome }) => {
		if (forwardResolved.has(ref.manifestSha256)) return {
			ref,
			runId: manifest.runId,
			captureStatus: outcome.status,
			status: "forward-resolved",
			terminalOutcome: void 0,
			nextAction: "openclaw update status --json",
			message: `Update recovery set ${ref.manifestPath}: current state repaired forward; failed history and all generations retained.`
		};
		let terminalOutcome;
		let ambiguity;
		try {
			const run = await getUpdateRunAsync(manifest.runId);
			terminalOutcome = resolveUpdateRecoveryTerminalOutcome(run, ref.manifestSha256);
			if (outcome.status === "committed" || outcome.status === "restored") {
				if (terminalOutcome && terminalOutcome !== outcome.status) {
					terminalOutcome = void 0;
					ambiguity = "capture and update terminal outcomes disagree";
				} else terminalOutcome = outcome.status;
			}
			if (run?.origin.updateRecoveryCapture?.doctorCompleted && !terminalOutcome && !(params.forwardRepair && run.status === "failed" && run.origin.updateRecoveryCapture.manifestSha256 === ref.manifestSha256)) ambiguity = "Doctor succeeded but its older updater has no complete runtime validation";
			if (!terminalOutcome && !ambiguity && run?.status !== "failed") ambiguity = run ? `update run is ${run.status}` : "no matching update run exists";
		} catch (error) {
			ambiguity = `update outcome is unreadable: ${formatErrorMessage(error)}`;
		}
		if (!terminalOutcome && !ambiguity && snapshots.length - forwardResolved.size > 1) ambiguity = "other recovery sets exist; restoring this set could discard newer database writes";
		const status = terminalOutcome ? "stale" : ambiguity ? "ambiguous" : "unresolved";
		const nextAction = status === "unresolved" ? "npx openclaw@latest doctor --fix" : "openclaw update status --json";
		const reason = terminalOutcome ? `stale: its update already ${terminalOutcome === "committed" ? "succeeded" : "restored state"}` : ambiguity ?? "unresolved after a failed update";
		return {
			ref,
			runId: manifest.runId,
			captureStatus: outcome.status,
			status,
			terminalOutcome,
			nextAction,
			message: `Update recovery set ${ref.manifestPath}: ${reason}. ${status === "unresolved" ? "Keep the Gateway stopped and run" : "Automatic restoration is refused; inspect with"} \`${nextAction}\`.${status === "ambiguous" ? " Resolve the recorded outcome before retrying `npx openclaw@latest doctor --fix`." : ""}`
		};
	}));
}
//#endregion
export { inspectUpdateRecoveryBackups };
