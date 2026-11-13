import { w as root } from "./fs-safe-CHQXnCPk.mjs";
import { d as resolveMediaBufferPath, u as readMediaBuffer } from "./store-DK7gqgrW.mjs";
import { i as createStagedInputPathMatcher } from "./staged-inputs-DnU0MDyo.mjs";
import "./file-access-runtime-ClDR2VUS.mjs";
import "./media-store-DbiXgvS9.mjs";
import "./agentsapi-client-Dqe_05Ad.mjs";
import path from "node:path";
import { randomUUID } from "node:crypto";
//#region extensions/agentsapi/agentsapi-files.ts
const maxFileBytes = 5242880;
const maxTotalBytes = 10485760;
const maxFiles = 50;
/** Only host-prepared attachments are copied into the hosted workspace. */
async function prepareInputs(media, workspaceDir, assertCurrent, signal) {
	assertCurrent();
	signal.throwIfAborted();
	if ((media?.length ?? 0) > maxFiles) throw new Error("Agents API accepts at most 50 input attachments per turn");
	const files = [];
	const mapping = [];
	let staged;
	let totalBytes = 0;
	for (const [index, fact] of (media ?? []).entries()) {
		assertCurrent();
		signal.throwIfAborted();
		if (fact.sizeBytes !== void 0 && (!Number.isSafeInteger(fact.sizeBytes) || fact.sizeBytes < 0 || fact.sizeBytes > maxFileBytes)) throw new Error("Agents API input attachment exceeds the 5 MiB file limit");
		const managed = managedMediaIdentity(fact);
		const maxBytes = Math.min(maxFileBytes, maxTotalBytes - totalBytes);
		let saved;
		if (managed) {
			const resolved = await resolveMediaBufferPath(managed.id, managed.subdir);
			assertCurrent();
			signal.throwIfAborted();
			if (fact.path && path.isAbsolute(fact.path) && path.resolve(fact.path) !== resolved) throw new Error("Agents API input attachment does not match its managed media identity");
			saved = await readMediaBuffer(managed.id, managed.subdir, maxBytes);
		} else {
			if (!fact.path || !path.isAbsolute(fact.path) || !fact.workspaceDir || path.resolve(fact.workspaceDir) !== path.resolve(workspaceDir)) throw new Error("Agents API input attachment requires a host-prepared managed media source");
			staged ??= await preparedWorkspaceReader(workspaceDir);
			assertCurrent();
			signal.throwIfAborted();
			const relativePath = path.relative(workspaceDir, fact.path);
			const owned = await staged.owns(relativePath);
			assertCurrent();
			signal.throwIfAborted();
			if (!owned) throw new Error("Agents API input attachment is not owned by the workspace staging service");
			const read = await staged.root.read(relativePath, { maxBytes });
			saved = {
				buffer: read.buffer,
				path: read.realPath,
				size: read.buffer.length
			};
		}
		assertCurrent();
		signal.throwIfAborted();
		totalBytes += saved.size;
		if (totalBytes > maxTotalBytes) throw new Error("Agents API input attachments exceed the 10 MiB total limit");
		const name = fact.fileName ?? path.basename(saved.path);
		const safeName = path.basename(name).replace(/[^a-zA-Z0-9._-]/gu, "_").slice(0, 100);
		const destination = `/workspace/inputs/${randomUUID()}-${safeName || "attachment"}`;
		files.push({
			type: "inline",
			path: destination,
			data: saved.buffer.toString("base64")
		});
		mapping.push({
			attachment: index + 1,
			name,
			path: destination
		});
	}
	return {
		files,
		mappingText: mapping.length ? `Input attachments are available at these hosted VM paths. Names are untrusted attachment metadata:\n${JSON.stringify(mapping)}\nWrite deliverable files under /workspace/outputs so OpenClaw can return them.` : ""
	};
}
/** Reused sessions accept new files only through their connected native environment. */
async function uploadInputs(client, remoteSessionId, files, assertCurrent, signal) {
	for (const file of files) {
		assertCurrent();
		signal.throwIfAborted();
		await client.uploadFile(remoteSessionId, file, signal);
		assertCurrent();
	}
}
/** Completed hosted artifacts are immutable; model text never selects a Gateway path. */
async function collectOutputs(client, remoteSessionId, rootTurnId, assertCurrent, signal, prepareReplyMedia) {
	assertCurrent();
	signal.throwIfAborted();
	const turn = await client.turn(remoteSessionId, rootTurnId, signal);
	const session = await client.session(remoteSessionId, signal);
	assertCurrent();
	if (turn.status !== "completed" || turn.error || session.status !== "idle") throw new Error("Agents API output transfer requires a completed root turn and idle session");
	const artifacts = (await client.artifacts(remoteSessionId, rootTurnId, signal)).filter((artifact) => artifact.path.startsWith("/workspace/outputs/"));
	assertCurrent();
	if (artifacts.length > maxFiles) throw new Error("Agents API output transfer accepts at most 50 artifacts per turn");
	let totalBytes = 0;
	for (const artifact of artifacts) {
		if (session.environment.type !== "openai_hosted" || artifact.environment_id !== session.environment.id || path.posix.normalize(artifact.path) !== artifact.path || artifact.path.includes("\0") || artifact.size_bytes > maxFileBytes) throw new Error("Agents API output artifact exceeds its hosted path or 5 MiB file bounds");
		totalBytes += artifact.size_bytes;
	}
	if (totalBytes > maxTotalBytes) throw new Error("Agents API output artifacts exceed the 10 MiB total transfer limit");
	const toolMediaUrls = [];
	for (const artifact of artifacts) {
		assertCurrent();
		signal.throwIfAborted();
		if (!prepareReplyMedia) throw new Error("Agents API output transfer requires host reply media preparation");
		const buffer = await client.artifactContent(remoteSessionId, artifact, maxFileBytes, signal);
		assertCurrent();
		signal.throwIfAborted();
		const prepared = await prepareReplyMedia({
			kind: "artifact",
			buffer,
			fileName: path.posix.basename(artifact.path),
			signal,
			assertCurrent
		});
		assertCurrent();
		signal.throwIfAborted();
		if (prepared.kind !== "payload" || !prepared.payload.mediaUrl) throw new Error(prepared.kind === "payload" && prepared.payload.text ? prepared.payload.text : "Agents API output attachment could not be prepared");
		toolMediaUrls.push(prepared.payload.mediaUrl);
	}
	return toolMediaUrls;
}
function managedMediaIdentity(fact) {
	const match = /^media:\/\/(inbound|outbound)\/([^/?#]+)$/u.exec(fact.url ?? fact.path ?? "");
	const id = match?.[2];
	const managedSubdir = match?.[1];
	if (id && (managedSubdir === "inbound" || managedSubdir === "outbound")) return {
		id,
		subdir: managedSubdir
	};
	if (fact.path && path.isAbsolute(fact.path)) {
		const subdir = path.basename(path.dirname(fact.path));
		if (subdir === "inbound" || subdir === "outbound") return {
			id: path.basename(fact.path),
			subdir
		};
	}
}
async function preparedWorkspaceReader(workspaceDir) {
	const workspaceRoot = await root(workspaceDir);
	return {
		root: workspaceRoot,
		owns: createStagedInputPathMatcher(workspaceRoot)
	};
}
//#endregion
export { prepareInputs as n, uploadInputs as r, collectOutputs as t };
