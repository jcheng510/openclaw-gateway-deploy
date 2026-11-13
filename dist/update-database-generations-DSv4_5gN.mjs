import { t as hasNodeErrorCode } from "./path-guards-CH7noY0Z.mjs";
import { n as sha256Hex } from "./node-crypto-BInnzoVt.mjs";
import "./crypto-digest-y6oZN-_F.mjs";
import { a as serializeSqliteFileGeneration, r as readStableSqliteFileGeneration } from "./sqlite-file-generation-Z_oSlnyK.mjs";
import fs from "node:fs";
//#region src/infra/update-database-generations.ts
function readWalIndexHeader(pathname) {
	const file = `${pathname}-shm`;
	let descriptor;
	try {
		descriptor = fs.openSync(file, "r");
	} catch (error) {
		if (hasNodeErrorCode(error, "ENOENT")) return null;
		throw error;
	}
	try {
		const before = fs.fstatSync(descriptor, { bigint: true });
		const header = Buffer.alloc(96);
		const first = fs.readSync(descriptor, header, 0, 48, 0);
		const second = fs.readSync(descriptor, header, 48, 48, 48);
		const after = fs.fstatSync(descriptor, { bigint: true });
		const current = fs.lstatSync(file, { bigint: true });
		if (!before.isFile() || !current.isFile() || before.dev !== after.dev || before.ino !== after.ino || before.dev !== current.dev || before.ino !== current.ino || first !== 48 || second !== 48 || !header.subarray(0, 48).equals(header.subarray(48, 96))) throw new Error(`SQLite WAL commit header is unavailable or changing: ${pathname}`);
		return header;
	} finally {
		fs.closeSync(descriptor);
	}
}
/** Run only in an isolated process or after all source handles drain: raw close
* can release this process's SQLite locks. Inspect only the supplied inventory. */
function readUpdateDatabaseGenerations(paths) {
	return Object.fromEntries(paths.map((pathname) => {
		const entry = fs.lstatSync(pathname, { throwIfNoEntry: false });
		if (!entry) {
			if (["-wal", "-journal"].some((suffix) => fs.lstatSync(`${pathname}${suffix}`, { throwIfNoEntry: false }))) throw new Error(`Database is absent but retained journal data exists: ${pathname}`);
			return [pathname, null];
		}
		if (!entry.isFile()) throw new Error(`Database generation requires a regular file: ${pathname}`);
		const before = readWalIndexHeader(pathname);
		const generation = readStableSqliteFileGeneration(pathname);
		const after = readWalIndexHeader(pathname);
		if ((before === null ? after !== null : !after?.equals(before)) || generation.wal && generation.wal.size > 0n && after?.[12] !== 1) throw new Error(`SQLite WAL commit publication could not be verified: ${pathname}`);
		const writeGeneration = generation.wal?.size === 0n ? {
			...generation,
			wal: void 0
		} : generation;
		return [pathname, sha256Hex(JSON.stringify([serializeSqliteFileGeneration(writeGeneration), after?.toString("hex") ?? null]))];
	}));
}
//#endregion
export { readUpdateDatabaseGenerations as t };
