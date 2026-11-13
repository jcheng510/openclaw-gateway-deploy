import { F as resolveTimerTimeoutMs } from "./number-coercion-Dq1l5muL.mjs";
import { o as resolveUserPath } from "./home-dir-CjKH62jd.mjs";
import { o as normalizeWindowsPathPreservingCase, t as hasNodeErrorCode } from "./path-guards-CH7noY0Z.mjs";
import { r as resolveStateDir } from "./state-dir-CfAW6S2K.mjs";
import "./paths-CtO6iw0c.mjs";
import { n as formatErrorMessageWithCode } from "./errors-YPvSaqwO.mjs";
import { i as getNodeSqliteKysely, n as executeSqliteQuerySync } from "./kysely-sync-Y4_ti-rQ.mjs";
import { t as openNodeSqliteDatabase } from "./node-sqlite-B4hwsR7e.mjs";
import { o as prepareSqliteReadOnlyLocationInProcess, r as inspectSqliteSchemaHeaderInProcess } from "./sqlite-readonly-location-C_s7qsHQ.mjs";
import { n as createSqliteSnapshotStagingDirectory, u as resolvePrivateSqliteSnapshotStagingRoot } from "./sqlite-snapshot-staging-C3ICAs3m.mjs";
import { d as withPreparedSqliteSnapshot, o as releaseSnapshotTempDirectory, s as removeTempDirectory, u as retainSnapshotWork } from "./sqlite-readonly-location-cleanup-HvAn98XM.mjs";
import { i as tableExists } from "./openclaw-state-db-schema-helpers-C29HKgWe.mjs";
import { a as readSqliteUserVersion } from "./sqlite-user-version-BLp_KV8U.mjs";
import { a as resolveOpenClawStateDirForDatabasePath, i as resolveOpenClawRegisteredAgentDatabasePath } from "./openclaw-state-db.paths-rJI64Ab5.mjs";
import { Et as _enum, Fn as object, Jn as string, Nt as array, Pn as number, Un as record, nr as tuple, xn as literal } from "./schemas-BOYIvvln.mjs";
import { n as runtimeProcessEntrypoints, t as SQLITE_READONLY_CHILD_ARG } from "./runtime-process-entrypoints-CbWx0yUe.mjs";
import { r as resolveRuntimeWorkerUrl, t as resolveRuntimeWorkerArgv } from "./runtime-worker-url-S0NIVxUR.mjs";
import { o as resolveAggregateSqliteInspectionTimeoutMs } from "./sqlite-readonly-worker-cuICqy4r.mjs";
import { r as readStateSchemaContentVersion } from "./openclaw-state-db-schema-version-n89EOGL7.mjs";
import { r as hasCommandProcessCleanupError } from "./exec-result-C1iGiwu0.mjs";
import { a as runUtf8CommandWithTimeout } from "./exec-Bjx7k3vE.mjs";
import { l as withCommandProcessScope } from "./exec-spawn-B_BFgGrb.mjs";
import { t as listDefaultAgentDatabasePaths } from "./agent-database-path-discovery-B_nrhsNg.mjs";
import { a as resolveUpdateCandidateStatePath, i as resolveUpdateCandidateStateIdentity, t as UPDATE_CANDIDATE_PLUGIN_PLAN_FILENAME } from "./update-candidate-paths-Cqw4bJB-.mjs";
import { a as sealUpdateCandidatePluginCodeLinks, t as UpdateCandidatePluginCodeLinkReceiptSchema } from "./update-candidate-plugin-code-links-BLJaj5A4.mjs";
import { n as withUpdateCandidateIoBudget } from "./update-candidate-io-pRtgvOhr.mjs";
import { writeSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs$1 from "node:fs/promises";
import os from "node:os";
import { StringDecoder } from "node:string_decoder";
//#region src/infra/update-candidate-state.diagnostics.ts
const UPDATE_STATE_INSPECTION_PROGRESS_PREFIX = "State schema progress: ";
const ProgressSchema = object({
	phase: string(),
	path: string().optional(),
	snapshot: object({
		status: _enum(["copying", "completed"]),
		copiedPages: number().nonnegative(),
		totalPages: number().nonnegative(),
		copiedBytes: number().nonnegative().optional(),
		elapsedMs: number().nonnegative()
	}).optional()
});
function createUpdateStateSnapshotReporter(path, phase, onProgress) {
	const started = performance.now();
	let emittedAt = -Infinity;
	let pages = {
		totalPages: 0,
		remainingPages: 0
	};
	const emit = (status, copiedBytes) => {
		const now = performance.now();
		if (status === "copying" && now - emittedAt < 1e3 && pages.remainingPages > 0) return;
		emittedAt = now;
		onProgress?.({
			phase,
			path,
			snapshot: {
				status,
				copiedPages: pages.totalPages - pages.remainingPages,
				totalPages: pages.totalPages,
				copiedBytes,
				elapsedMs: Math.max(0, now - started)
			}
		});
	};
	emit("copying");
	return {
		onProgress: (progress) => {
			pages = progress;
			emit("copying");
		},
		complete: (copiedBytes) => emit("completed", copiedBytes)
	};
}
/** Stderr leaves the released worker's stdout JSON contract unchanged. */
function createUpdateStateInspectionReporter(legacy = false) {
	let emittedBytes = 0;
	let exhausted = false;
	return (progress) => {
		if (exhausted) return;
		let line = `${UPDATE_STATE_INSPECTION_PROGRESS_PREFIX}${JSON.stringify(progress)}\n`;
		if (legacy && emittedBytes + Buffer.byteLength(line) > 12e3) {
			exhausted = true;
			line = `${UPDATE_STATE_INSPECTION_PROGRESS_PREFIX}${JSON.stringify({ phase: "schema inspection; detailed progress omitted" })}\n`;
		}
		emittedBytes += Buffer.byteLength(line);
		writeSync(2, line);
	};
}
/** Keep the last source independently of diagnostic output volume and child lifetime. */
function createUpdateStateInspectionDiagnostics(params) {
	const startedAt = Date.now();
	const decoder = new StringDecoder("utf8");
	let progress = {
		phase: params.phase,
		...params.paths.length === 1 ? { path: params.paths[0] } : {}
	};
	let pending = "";
	let tail = "";
	let diagnosticBytes = 0;
	const checkLimit = (pendingBytes = 0) => {
		if (params.stderrLimit && diagnosticBytes + pendingBytes > params.stderrLimit.bytes) params.stderrLimit.onExceeded();
	};
	const receiveLine = (line) => {
		if (line.startsWith("State schema progress: ")) {
			let decoded;
			try {
				decoded = JSON.parse(line.slice(23));
			} catch {}
			const value = ProgressSchema.safeParse(decoded);
			if (value.success) {
				progress = value.data;
				params.onProgress?.(progress);
				return;
			}
		}
		diagnosticBytes += Buffer.byteLength(line) + 1;
		checkLimit();
		tail = `${tail}${line}\n`.slice(-12e3);
	};
	return {
		onOutputChunk: (chunk, stream) => {
			if (stream !== "stderr") return;
			const lines = `${pending}${decoder.write(chunk)}`.split("\n");
			const last = lines.pop() ?? "";
			checkLimit(Buffer.byteLength(last));
			pending = last.slice(-12e3);
			diagnosticBytes += Buffer.byteLength(last) - Buffer.byteLength(pending);
			for (const line of lines) receiveLine(line);
		},
		stderr: () => `${tail}${pending}`.trim(),
		failure(reason, termination) {
			const detail = formatErrorMessageWithCode(reason ?? "").trim() || "Worker exited without diagnostic output";
			const elapsed = Math.max(0, Date.now() - startedAt) / 1e3;
			const scope = params.paths.slice(0, 3).join(", ");
			const source = progress.path ?? `source scope [${scope}${params.paths.length > 3 ? ", …" : ""}]`;
			return new Error(`${params.operation} failed${termination ? ` (${termination})` : ""} after ${elapsed.toFixed(3)} seconds during ${progress.phase} for ${source} (scope: ${params.paths.length} source paths): ${detail}. Check access to the reported source, free space, and storage performance, then retry the update.`, reason instanceof Error ? { cause: reason } : void 0);
		}
	};
}
//#endregion
//#region src/infra/update-candidate-state.process.ts
/** A bounded command result does not release snapshot ownership before late process cleanup. */
function withUpdateStateInspectionWork(run, signal) {
	let stop = () => {};
	const work = withCommandProcessScope((stopScope) => {
		stop = stopScope;
		return run();
	}, signal);
	return retainSnapshotWork(work, () => stop());
}
function finishStateInspection(stagingRoot, outcome) {
	if ("cause" in outcome && hasCommandProcessCleanupError(outcome.cause)) {
		releaseSnapshotTempDirectory(stagingRoot);
		throw new Error(`${formatErrorMessageWithCode(outcome.cause)}. Staging retained at ${stagingRoot}. Confirm that update workers have stopped before retrying the update.`, { cause: outcome.cause });
	}
	if (!removeTempDirectory(stagingRoot)) throw new Error(`State schema inspection snapshot cleanup failed: ${stagingRoot}`, { cause: "cause" in outcome ? outcome.cause : void 0 });
	if ("cause" in outcome) throw outcome.cause;
	return outcome.value;
}
//#endregion
//#region src/infra/update-candidate-state.inspection.ts
async function runUpdateStateInspectionWorker(params) {
	const workerUrl = resolveRuntimeWorkerUrl({
		...params.readOnlySource ? runtimeProcessEntrypoints.sqliteReadOnly : runtimeProcessEntrypoints.updateCandidateState,
		root: params.root
	});
	const sourceTsconfigPath = /\.[cm]?ts$/.test(fileURLToPath(workerUrl)) ? fileURLToPath(new URL("../../tsconfig.json", workerUrl)) : void 0;
	const inspection = createUpdateStateInspectionDiagnostics({
		operation: "State schema inspection",
		phase: params.input.mode === "versions" ? "schema inspection startup" : "shared database discovery",
		paths: params.readOnlySource ? [params.readOnlySource] : params.input.mode === "versions" ? params.databases.map((database) => database.path) : [path.resolve(params.input.stateDir, "state", "openclaw.sqlite")]
	});
	try {
		return {
			...await withUpdateStateInspectionWork(() => withUpdateCandidateIoBudget({
				directory: params.stagingRoot,
				bytes: params.databases.reduce((total, database) => total + Number(database.sizeBytes ?? 0), 0),
				timeoutMs: Math.max(params.timeoutMs ?? 0, resolveAggregateSqliteInspectionTimeoutMs("state schema inspection", params.databases)),
				signal: params.signal,
				nodeRunner: params.nodeRunner,
				env: params.sourceEnv
			}, (signal) => runUtf8CommandWithTimeout([
				params.nodeRunner,
				...resolveRuntimeWorkerArgv(workerUrl, params.nodeRunner),
				...params.readOnlySource ? [
					SQLITE_READONLY_CHILD_ARG,
					"sync",
					params.readOnlySource,
					params.stagingRoot
				] : []
			], {
				cwd: os.tmpdir(),
				input: params.readOnlySource ? void 0 : JSON.stringify({
					...params.input,
					env: {
						HOME: params.sourceEnv.HOME,
						OPENCLAW_HOME: params.sourceEnv.OPENCLAW_HOME,
						USERPROFILE: params.sourceEnv.USERPROFILE,
						OPENCLAW_AGENT_DIR: params.sourceEnv.OPENCLAW_AGENT_DIR,
						PI_CODING_AGENT_DIR: params.sourceEnv.PI_CODING_AGENT_DIR
					}
				}),
				baseEnv: params.sourceEnv,
				env: {
					XDG_CACHE_HOME: params.stagingRoot,
					...sourceTsconfigPath ? { TSX_TSCONFIG_PATH: sourceTsconfigPath } : {}
				},
				killGraceMs: 500,
				killProcessTree: true,
				maxOutputBytes: {
					stdout: 1048576,
					stderr: 2e4
				},
				outputCapture: {
					stdout: "head",
					stderr: "discard"
				},
				terminateOnOutputLimit: { stdout: true },
				onOutputChunk: inspection.onOutputChunk,
				signal
			})), params.signal),
			stderr: inspection.stderr(),
			inspection
		};
	} catch (error) {
		if (hasCommandProcessCleanupError(error)) throw inspection.failure(error);
		params.signal?.throwIfAborted();
		throw inspection.failure(error);
	}
}
function parseUpdateStateInspectionWorker(result, schema) {
	if (result.code !== 0 || result.termination !== "exit" || result.outputLimitExceeded) {
		const signal = result.signal ? `, signal ${result.signal}` : "";
		throw result.inspection.failure(result.stderr || (result.outputLimitExceeded ? "Worker output exceeded its capture limit" : result.stdout), `${result.termination}${signal}`);
	}
	try {
		return schema.parse(JSON.parse(result.stdout));
	} catch (error) {
		throw result.inspection.failure(error);
	}
}
//#endregion
//#region src/infra/update-candidate-state.sizes.ts
const inventorySource = `
  const fs = require("node:fs");
  let input = "";
  process.stdin.setEncoding("utf8");
  process.stdin.on("data", chunk => { input += chunk; });
  process.stdin.on("end", () => {
    const result = [];
    const progress = path => fs.writeSync(2, ${JSON.stringify(UPDATE_STATE_INSPECTION_PROGRESS_PREFIX)} + JSON.stringify({ phase: "metadata inventory", path }) + "\\n");
    for (const file of JSON.parse(input).files) {
      let size;
      progress(file);
      try { size = fs.statSync(file, { bigint: true }).size; }
      catch (error) {
        if (error.code !== "ENOENT") result.push({ path: file });
        continue;
      }
      for (const suffix of ["-wal", "-shm", "-journal"]) {
        progress(file + suffix);
        try { size += fs.statSync(file + suffix, { bigint: true }).size; }
        catch (error) {
          if (error.code !== "ENOENT") { size = undefined; break; }
        }
      }
      result.push({ path: file, sizeBytes: size?.toString() });
    }
    process.stdout.write(JSON.stringify(result));
  });
`;
const inventorySchema = array(object({
	path: string(),
	sizeBytes: string().regex(/^\d+$/).optional()
}));
/** Measure SQLite families in a bounded child so metadata cannot block updater cancellation. */
async function readUpdateStateDatabaseSizes(files, options) {
	const budget = resolveAggregateSqliteInspectionTimeoutMs("state schema inventory", files.map((file) => ({
		path: file,
		sizeBytes: void 0
	})));
	const inspection = createUpdateStateInspectionDiagnostics({
		operation: "State schema inventory",
		phase: "metadata inventory",
		paths: files
	});
	let result;
	try {
		result = await withUpdateStateInspectionWork(() => runUtf8CommandWithTimeout([
			options.nodeRunner,
			"--input-type=commonjs",
			"--eval",
			inventorySource
		], {
			cwd: os.tmpdir(),
			input: JSON.stringify({ files }),
			baseEnv: options.sourceEnv,
			env: { XDG_CACHE_HOME: options.stagingRoot },
			signal: options.signal,
			timeoutMs: resolveTimerTimeoutMs(Math.max(options.timeoutMs ?? 0, budget), budget),
			killGraceMs: 500,
			killProcessTree: true,
			maxOutputBytes: {
				stdout: 1048576,
				stderr: 2e4
			},
			outputCapture: {
				stdout: "head",
				stderr: "discard"
			},
			terminateOnOutputLimit: { stdout: true },
			onOutputChunk: inspection.onOutputChunk
		}), options.signal);
	} catch (error) {
		if (hasCommandProcessCleanupError(error)) throw inspection.failure(error);
		options.signal?.throwIfAborted();
		throw inspection.failure(error);
	}
	options.signal?.throwIfAborted();
	if (result.code !== 0 || result.termination !== "exit" || result.outputLimitExceeded) throw inspection.failure(inspection.stderr() || (result.outputLimitExceeded ? "Worker output exceeded its capture limit" : ""), result.termination);
	try {
		return inventorySchema.parse(JSON.parse(result.stdout)).map((entry) => ({
			path: entry.path,
			sizeBytes: entry.sizeBytes === void 0 ? void 0 : BigInt(entry.sizeBytes)
		}));
	} catch (error) {
		throw inspection.failure(error);
	}
}
//#endregion
//#region src/infra/update-candidate-state.ts
const UpdateStateSchemaVersionsSchema = array(object({
	path: string(),
	userVersion: number().nullable(),
	contentVersion: number().optional()
}));
const UpdateCandidateStateSnapshotSchema = object({
	versions: UpdateStateSchemaVersionsSchema,
	pluginPaths: record(string(), string()),
	pluginCodeLinks: UpdateCandidatePluginCodeLinkReceiptSchema.optional()
});
/** Older inspection workers report only the published version; agent stores never defer it. */
function resolveUpdateStateContentVersion(entry) {
	return entry.contentVersion ?? entry.userVersion;
}
function updateStateSchemaVersionsMatch(before, after, params) {
	const versions = new Map(after.map((entry) => [entry.path, resolveUpdateStateContentVersion(entry)]));
	const candidate = params.candidateSchemaVersions;
	if (!candidate) return before.length === after.length && before.every((entry) => versions.get(entry.path) === resolveUpdateStateContentVersion(entry));
	const baseline = new Map(before.map((entry) => [entry.path, resolveUpdateStateContentVersion(entry)]));
	return before.every((entry) => resolveUpdateStateContentVersion(entry) === null || versions.get(entry.path) === resolveUpdateStateContentVersion(entry)) && after.every((entry) => {
		const version = resolveUpdateStateContentVersion(entry);
		if (version === null || baseline.get(entry.path) === version) return true;
		const supported = entry.path === params.sharedPath ? candidate.state : candidate.agent;
		return baseline.get(entry.path) == null && version === supported;
	});
}
async function fileExists(file) {
	try {
		await fs$1.access(file);
		return true;
	} catch (error) {
		if (hasNodeErrorCode(error, "ENOENT")) return false;
		throw error;
	}
}
/** Every raw spelling discovered for one database, grouped by projection identity. */
const StateDatabaseDiscoverySchema = object({ spellings: tuple([string()], string()) });
const UpdateCandidateStateInventorySchema = array(tuple([string(), StateDatabaseDiscoverySchema])).transform((entries) => new Map(entries));
const UpdateCandidateSnapshotInventorySchema = object({
	databases: UpdateCandidateStateInventorySchema,
	pluginBytes: number().nonnegative(),
	pluginPlan: literal(UPDATE_CANDIDATE_PLUGIN_PLAN_FILENAME)
});
const UpdateStateSchemaInspectionPlanSchema = object({
	files: array(tuple([string(), StateDatabaseDiscoverySchema])),
	sharedVersion: UpdateStateSchemaVersionsSchema.element
});
function queueStateDatabaseSpelling(files, identity, file) {
	const discovery = files.get(identity);
	if (discovery) {
		if (!discovery.spellings.includes(file)) discovery.spellings.push(file);
		return;
	}
	files.set(identity, { spellings: [file] });
}
function collectRegisteredPaths(db, shared, files) {
	return (tableExists(db, "agent_databases") ? executeSqliteQuerySync(db, getNodeSqliteKysely(db).selectFrom("agent_databases").select("path").orderBy("path")).rows : []).map(({ path: stored }) => {
		const source = resolveOpenClawRegisteredAgentDatabasePath(shared, stored);
		queueStateDatabaseSpelling(files, resolveUpdateCandidateStateIdentity(resolveOpenClawStateDirForDatabasePath(shared), source), source);
		return {
			stored,
			source
		};
	});
}
async function withStateDatabaseSnapshot(file, read, stagingRoot, onProgress) {
	const progress = createUpdateStateSnapshotReporter(file, "shared database snapshot", onProgress);
	const snapshot = await prepareSqliteReadOnlyLocationInProcess(file, stagingRoot, void 0, progress.onProgress);
	return withPreparedSqliteSnapshot(snapshot, async (location) => {
		progress.complete((await fs$1.stat(location)).size);
		return read(location);
	});
}
async function collectStateDatabasePaths(input, options = {}) {
	const shared = path.resolve(input.stateDir, "state", "openclaw.sqlite");
	const stateRoot = path.resolve(input.stateDir);
	const files = /* @__PURE__ */ new Map();
	const queue = (file) => {
		queueStateDatabaseSpelling(files, resolveUpdateCandidateStateIdentity(stateRoot, file), file);
	};
	queue(shared);
	let directories = [];
	if (options.includeUnconfiguredAgents !== false) directories = (await listDefaultAgentDatabasePaths(input.stateDir)).map((entry) => entry.agentId);
	const configured = Object.entries(input.config.agents?.entries ?? {});
	for (const directory of [input.env?.OPENCLAW_AGENT_DIR, input.env?.PI_CODING_AGENT_DIR]) if (directory?.trim()) queue(path.join(resolveUserPath(directory, input.env), "openclaw-agent.sqlite"));
	const projected = (input.config.agents?.list ?? []).map((agent) => [agent.id, agent]);
	for (const [id, agent] of [...configured, ...projected]) {
		directories.push(id);
		if (agent.agentDir) queue(path.join(resolveUserPath(agent.agentDir, input.env), "openclaw-agent.sqlite"));
	}
	for (const id of /* @__PURE__ */ new Set(["main", ...directories])) queue(path.resolve(input.stateDir, "agents", id, "agent", "openclaw-agent.sqlite"));
	return new Map([...files.entries()].toSorted(([, a], [, b]) => a.spellings[0] < b.spellings[0] ? -1 : a.spellings[0] > b.spellings[0] ? 1 : 0));
}
/** Released updaters compare exact response paths, so every raw alias is published. */
function publishStateDatabaseVersions(files, inspected) {
	const versions = [];
	for (const [identity, discovery] of files) {
		const result = inspected.get(identity);
		if (!result) continue;
		for (const spelling of discovery.spellings) versions.push({
			path: spelling,
			...result
		});
	}
	return versions;
}
/** Read registrations and plugin ownership from one private shared copy before budgeting. */
async function readUpdateCandidateStateInventoryInProcess(input) {
	await fs$1.mkdir(input.targetStateDir, {
		recursive: true,
		mode: 448
	});
	const planPath = path.join(input.targetStateDir, UPDATE_CANDIDATE_PLUGIN_PLAN_FILENAME);
	await fs$1.writeFile(planPath, "", {
		mode: 384,
		flag: "wx"
	});
	let progressAt = Date.now();
	const onProgress = async () => {
		const now = Date.now();
		if (now - progressAt < 1e3) return;
		progressAt = now;
		await fs$1.utimes(planPath, new Date(now), new Date(now));
	};
	const { prepareUpdateCandidatePlugins } = await import("./update-candidate-plugins-BRNEwspt.mjs");
	const files = await collectStateDatabasePaths(input);
	const shared = path.resolve(input.stateDir, "state", "openclaw.sqlite");
	const measure = async (sharedStateDatabasePath) => {
		input.onProgress?.({
			phase: "plugin inventory",
			path: input.stateDir
		});
		const plugins = await prepareUpdateCandidatePlugins({
			...input,
			sharedStateDatabasePath,
			onProgress
		});
		await fs$1.writeFile(planPath, JSON.stringify(plugins));
		return {
			databases: files,
			pluginBytes: plugins.bytes,
			pluginPlan: UPDATE_CANDIDATE_PLUGIN_PLAN_FILENAME
		};
	};
	if (await fileExists(shared)) return withStateDatabaseSnapshot(shared, async (location) => {
		const db = openNodeSqliteDatabase(location, { readOnly: true });
		try {
			collectRegisteredPaths(db, shared, files);
		} finally {
			db.close();
		}
		return measure(location);
	}, input.targetStateDir, input.onProgress);
	return measure();
}
function readStateDatabaseVersion(location, file, shared, files) {
	const db = openNodeSqliteDatabase(location, { readOnly: true });
	try {
		if (file === shared) collectRegisteredPaths(db, shared, files);
		return {
			userVersion: readSqliteUserVersion(db),
			...file === shared ? { contentVersion: readStateSchemaContentVersion(db) } : {}
		};
	} finally {
		db.close();
	}
}
/** Discover registered stores from the same private shared-database generation used for inspection. */
async function discoverUpdateStateSchemaInspectionInProcess(input) {
	const shared = path.resolve(input.stateDir, "state", "openclaw.sqlite");
	input.onProgress?.({
		phase: "shared database discovery",
		path: shared
	});
	const files = await collectStateDatabasePaths(input);
	if (!await fileExists(shared)) return {
		files: [...files],
		sharedVersion: {
			path: shared,
			userVersion: null
		}
	};
	const sharedVersion = await withStateDatabaseSnapshot(shared, (location) => ({
		path: shared,
		...readStateDatabaseVersion(location, shared, shared, files)
	}), input.stagingRoot, input.onProgress);
	return {
		files: [...files],
		sharedVersion
	};
}
/** Missing databases stay explicit so creation is schema-checked and loss blocks rollback. */
async function readUpdateStateSchemaVersionsInProcess(input) {
	const shared = path.resolve(input.stateDir, "state", "openclaw.sqlite");
	const files = input.inspectionPlan ? new Map(input.inspectionPlan.files) : await collectStateDatabasePaths(input);
	const sharedIdentity = resolveUpdateCandidateStateIdentity(input.stateDir, shared);
	const inspected = /* @__PURE__ */ new Map();
	for (const [identity, discovery] of files) {
		const file = discovery.spellings[0];
		if (identity === sharedIdentity && input.inspectionPlan) {
			const { userVersion, contentVersion } = input.inspectionPlan.sharedVersion;
			inspected.set(identity, {
				userVersion,
				...contentVersion === void 0 ? {} : { contentVersion }
			});
			continue;
		}
		input.onProgress?.({
			phase: file === shared ? "shared database inspection" : "agent schema inspection",
			path: file
		});
		if (!await fileExists(file)) {
			inspected.set(identity, { userVersion: null });
			continue;
		}
		if (file !== shared) {
			const { userVersion } = await inspectSqliteSchemaHeaderInProcess(file);
			inspected.set(identity, { userVersion });
			continue;
		}
		inspected.set(identity, await withStateDatabaseSnapshot(file, (location) => readStateDatabaseVersion(location, file, shared, files), input.stagingRoot, input.onProgress));
	}
	return publishStateDatabaseVersions(files, inspected);
}
/** Released candidates can snapshot shared state even when they cannot expose discovery. */
async function discoverLegacyUpdateStateSchemaInspection(params) {
	params.signal?.throwIfAborted();
	const shared = path.resolve(params.input.stateDir, "state", "openclaw.sqlite");
	const files = await collectStateDatabasePaths(params.input);
	if (!await fileExists(shared)) return {
		files: [...files],
		sharedVersion: {
			path: shared,
			userVersion: null
		}
	};
	const stagingRoot = await createSqliteSnapshotStagingDirectory(params.stagingRoot, params.root !== void 0, params.signal);
	let outcome;
	try {
		const snapshot = parseUpdateStateInspectionWorker(await runUpdateStateInspectionWorker({
			...params,
			stagingRoot,
			readOnlySource: shared
		}), object({
			ok: literal(true),
			location: string()
		}));
		const relative = path.relative(stagingRoot, snapshot.location);
		if (!relative || relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) throw new Error("Legacy state inspection returned a snapshot outside parent-owned staging.");
		const sharedVersion = {
			path: shared,
			...readStateDatabaseVersion(snapshot.location, shared, shared, files)
		};
		outcome = { value: {
			files: [...files],
			sharedVersion
		} };
	} catch (cause) {
		outcome = { cause };
	}
	return finishStateInspection(stagingRoot, outcome);
}
/** Raw fingerprint reads need their own process so descriptor closes cannot release caller locks. */
async function readUpdateDatabaseGenerationsIsolated(paths, options = {}) {
	const sourceEnv = options.env ?? process.env;
	const controller = new AbortController();
	const signal = options.signal ? AbortSignal.any([options.signal, controller.signal]) : controller.signal;
	const stagingRoot = await createSqliteSnapshotStagingDirectory(resolvePrivateSqliteSnapshotStagingRoot(sourceEnv), options.root !== void 0, signal);
	const inspection = (async () => {
		let outcome;
		try {
			const worker = {
				nodeRunner: process.execPath,
				sourceEnv,
				stagingRoot,
				timeoutMs: options.timeoutMs,
				signal
			};
			const generations = parseUpdateStateInspectionWorker(await runUpdateStateInspectionWorker({
				...worker,
				root: options.root,
				input: {
					mode: "database-generations",
					paths,
					stateDir: resolveStateDir(sourceEnv),
					config: {}
				},
				databases: await readUpdateStateDatabaseSizes(paths, worker)
			}), record(string(), string().regex(/^[a-f0-9]{64}$/u).nullable()));
			if (Object.keys(generations).length !== new Set(paths).size || paths.some((pathname) => !Object.hasOwn(generations, pathname))) throw new Error("Database generation worker did not return the supplied inventory.");
			outcome = { value: generations };
		} catch (cause) {
			outcome = { cause };
		}
		return finishStateInspection(stagingRoot, outcome);
	})();
	return retainSnapshotWork(inspection, () => controller.abort());
}
/** Schema fencing reads private copies in candidate workers under size-aware deadlines. */
async function readUpdateStateSchemaVersions({ root, nodeRunner = process.execPath, timeoutMs, signal: callerSignal, ...input }) {
	if (root === null) throw new Error("The active installation root is unknown; state inspection is unsafe.");
	const controller = new AbortController();
	const signal = callerSignal ? AbortSignal.any([callerSignal, controller.signal]) : controller.signal;
	signal.throwIfAborted();
	const sourceEnv = input.env ?? process.env;
	const stagingRoot = await createSqliteSnapshotStagingDirectory(resolvePrivateSqliteSnapshotStagingRoot(sourceEnv), root !== void 0, signal);
	const inspection = (async () => {
		let outcome;
		try {
			const shared = path.resolve(input.stateDir, "state", "openclaw.sqlite");
			const sizeOptions = {
				nodeRunner,
				signal,
				sourceEnv,
				stagingRoot,
				timeoutMs
			};
			const discoveryParams = {
				input: {
					...input,
					mode: "discover",
					stagingRoot
				},
				nodeRunner,
				root,
				signal,
				sourceEnv,
				stagingRoot,
				timeoutMs,
				databases: await readUpdateStateDatabaseSizes([shared], sizeOptions)
			};
			const discoveryResult = await runUpdateStateInspectionWorker(discoveryParams);
			const legacyWorker = discoveryResult.code !== 0 && discoveryResult.stderr.includes("Unknown update state inspection mode");
			const discovery = legacyWorker ? await discoverLegacyUpdateStateSchemaInspection({
				...discoveryParams,
				input
			}) : parseUpdateStateInspectionWorker(discoveryResult, UpdateStateSchemaInspectionPlanSchema);
			const sharedIdentity = resolveUpdateCandidateStateIdentity(input.stateDir, shared);
			const files = legacyWorker ? discovery.files.flatMap(([, database]) => database.spellings) : discovery.files.filter(([identity]) => identity !== sharedIdentity).map(([, database]) => database.spellings[0]);
			outcome = { value: parseUpdateStateInspectionWorker(await runUpdateStateInspectionWorker({
				...discoveryParams,
				input: legacyWorker ? {
					...input,
					mode: "versions"
				} : {
					...input,
					mode: "versions",
					stagingRoot,
					inspectionPlan: discovery
				},
				databases: await readUpdateStateDatabaseSizes(files, sizeOptions)
			}), UpdateStateSchemaVersionsSchema) };
		} catch (cause) {
			outcome = { cause };
		}
		return finishStateInspection(stagingRoot, outcome);
	})();
	return retainSnapshotWork(inspection, () => controller.abort());
}
/** Keep snapshot dependencies out of schema inspection; rebind registry paths to private copies. */
async function snapshotUpdateCandidateState(input) {
	const { createVerifiedSqliteSnapshot } = await import("./sqlite-snapshot-Bb4ZpYp_.mjs");
	const { copyUpdateCandidatePlugins, UpdateCandidatePluginPlanSchema } = await import("./update-candidate-plugins-BRNEwspt.mjs");
	const plugins = UpdateCandidatePluginPlanSchema.parse(JSON.parse(await fs$1.readFile(input.pluginPlanPath, "utf8")));
	const admittedDatabases = new Set(input.databaseInventory);
	const sourceRoot = path.resolve(input.stateDir);
	const shared = path.join(sourceRoot, "state", "openclaw.sqlite");
	const { createUpdateCandidateExecApprovalsProjection } = await import("./update-candidate-exec-approvals-Gg_z2Rv2.mjs");
	const targetPath = (source) => path.join(resolveUpdateCandidateStatePath(sourceRoot, input.targetStateDir, path.dirname(source)), path.basename(source));
	const execApprovals = createUpdateCandidateExecApprovalsProjection(sourceRoot, targetPath);
	const files = await collectStateDatabasePaths(input);
	const inspected = /* @__PURE__ */ new Map();
	for (const [identity, discovery] of files) {
		if (!admittedDatabases.has(identity)) throw new Error(`State database registration changed after snapshot inventory: ${discovery.spellings[0]}`);
		const file = discovery.spellings[0];
		if (!await fileExists(file)) {
			inspected.set(identity, { userVersion: null });
			continue;
		}
		const target = targetPath(file);
		let contentVersion;
		await fs$1.mkdir(path.dirname(target), {
			recursive: true,
			mode: 448
		});
		const progress = createUpdateStateSnapshotReporter(file, "database snapshot", input.onProgress);
		const snapshot = await createVerifiedSqliteSnapshot({
			sourcePath: file,
			targetPath: target,
			sourceAcquisition: {
				mode: "isolated-process",
				stagingRoot: input.targetStateDir
			},
			preserveRowIds: true,
			onProgress: progress.onProgress,
			...file === shared ? { transform: (db) => {
				contentVersion = readStateSchemaContentVersion(db);
				const queries = getNodeSqliteKysely(db);
				execApprovals.rebaseReceipt(db);
				for (const table of ["agent_database_leases", "state_leases"]) if (tableExists(db, table)) executeSqliteQuerySync(db, queries.deleteFrom(table));
				for (const { stored, source } of collectRegisteredPaths(db, shared, files)) {
					const rebound = targetPath(source);
					const reboundStored = path.relative(input.targetStateDir, rebound);
					const resolvedRebound = resolveOpenClawRegisteredAgentDatabasePath(shared, reboundStored);
					const sameRegisteredDatabase = source === resolvedRebound || process.platform === "win32" && normalizeWindowsPathPreservingCase(source) === normalizeWindowsPathPreservingCase(resolvedRebound);
					if (stored !== reboundStored && sameRegisteredDatabase) executeSqliteQuerySync(db, queries.deleteFrom("agent_databases").where("path", "=", stored).where("agent_id", "in", queries.selectFrom("agent_databases").select("agent_id").where("path", "=", reboundStored)));
					executeSqliteQuerySync(db, queries.updateTable("agent_databases").set({ path: reboundStored }).where("path", "=", stored));
				}
			} } : {}
		});
		progress.complete((await fs$1.stat(target)).size);
		inspected.set(identity, {
			userVersion: snapshot.userVersion,
			...contentVersion === void 0 ? {} : { contentVersion }
		});
	}
	input.onProgress?.({
		phase: "execution approvals snapshot",
		path: sourceRoot
	});
	await execApprovals.copySources();
	const versions = publishStateDatabaseVersions(files, inspected);
	const pluginCodeLinks = [];
	input.onProgress?.({
		phase: "plugin snapshot",
		path: sourceRoot
	});
	return {
		versions,
		pluginPaths: await copyUpdateCandidatePlugins(plugins, {
			...input,
			onCodeLink: (fact) => {
				pluginCodeLinks.push(fact);
			}
		}),
		pluginCodeLinks: await sealUpdateCandidatePluginCodeLinks(input.pluginPlanPath, pluginCodeLinks)
	};
}
//#endregion
export { createUpdateStateInspectionReporter as _, discoverUpdateStateSchemaInspectionInProcess as a, readUpdateStateSchemaVersions as c, snapshotUpdateCandidateState as d, updateStateSchemaVersionsMatch as f, createUpdateStateInspectionDiagnostics as g, runUpdateStateInspectionWorker as h, collectStateDatabasePaths as i, readUpdateStateSchemaVersionsInProcess as l, parseUpdateStateInspectionWorker as m, UpdateCandidateStateSnapshotSchema as n, readUpdateCandidateStateInventoryInProcess as o, readUpdateStateDatabaseSizes as p, UpdateStateSchemaInspectionPlanSchema as r, readUpdateDatabaseGenerationsIsolated as s, UpdateCandidateSnapshotInventorySchema as t, resolveUpdateStateContentVersion as u };
