import { f as asSafeIntegerInRange } from "./number-coercion-Dq1l5muL.mjs";
import { t as pruneMapToMaxSize } from "./map-size-CNcWiFKu.mjs";
import { t as hasErrnoCode } from "./errno-FR4CRyya.mjs";
import { i as getNodeSqliteKysely, n as executeSqliteQuerySync, r as executeSqliteQueryTakeFirstSync } from "./kysely-sync-Y4_ti-rQ.mjs";
import { n as StartupMaintenanceRequiredError } from "./startup-maintenance-required-CNRZ_k46.mjs";
import { a as resolveOpenClawStateDirForDatabasePath, s as resolveOpenClawStateSqlitePath } from "./openclaw-state-db.paths-rJI64Ab5.mjs";
import { c as withExistingOpenClawStateDatabaseArtifactPreservingReadOnly } from "./openclaw-state-db-readonly-DE3MB0wy.mjs";
import { l as runOpenClawStateWriteTransaction, r as openOpenClawStateDatabase } from "./openclaw-state-db-DM-mSY0m.mjs";
import { t as pathMayExistSync } from "./path-existence-O1bMV6vh.mjs";
import { n as deriveCanonicalEd25519PrivateKeyRaw, r as deriveCanonicalEd25519PublicKeyRaw } from "./ed25519-signature-D_xiObSW.mjs";
import path from "node:path";
import crypto from "node:crypto";
//#region src/infra/device-identity-process-cache.ts
const identities = /* @__PURE__ */ new Map();
function readProcessDeviceIdentity(cacheKey) {
	return identities.get(cacheKey);
}
function cacheProcessDeviceIdentity(cacheKey, identity) {
	const cached = identities.get(cacheKey);
	if (cached) return cached;
	pruneMapToMaxSize(identities, 31);
	identities.set(cacheKey, identity);
	return identity;
}
//#endregion
//#region src/infra/device-identity-store.ts
const PRIMARY_DEVICE_IDENTITY_KEY = "primary";
var DeviceIdentityStorageError = class extends Error {
	constructor(message, options) {
		super(message, options);
		this.name = "DeviceIdentityStorageError";
	}
};
function normalizeIdentityKey(key) {
	const normalized = key ?? PRIMARY_DEVICE_IDENTITY_KEY;
	if (normalized.length === 0 || normalized !== normalized.trim()) throw new DeviceIdentityStorageError("Device identity key must be a non-empty string without surrounding whitespace.");
	if (normalized.length > 128) throw new DeviceIdentityStorageError("Device identity key exceeds 128 characters.");
	return normalized;
}
function invalidStoredIdentityError(identityKey, cause) {
	return new DeviceIdentityStorageError(`SQLite contains an invalid persisted device identity "${identityKey}". Run "openclaw doctor --fix" before starting the gateway or connecting this client.`, cause === void 0 ? void 0 : { cause });
}
function fingerprintPublicKey(publicKeyPem) {
	const raw = deriveCanonicalEd25519PublicKeyRaw(publicKeyPem);
	return crypto.createHash("sha256").update(raw).digest("hex");
}
/** Generate canonical Ed25519 material before entering a synchronous write transaction. */
function generateStoredDeviceIdentity(now = Date.now()) {
	const { publicKey, privateKey } = crypto.generateKeyPairSync("ed25519");
	const publicKeyPem = publicKey.export({
		type: "spki",
		format: "pem"
	});
	const privateKeyPem = privateKey.export({
		type: "pkcs8",
		format: "pem"
	});
	return {
		deviceId: fingerprintPublicKey(publicKeyPem),
		publicKeyPem,
		privateKeyPem,
		createdAtMs: now
	};
}
function keyPairMatches(publicKeyPem, privateKeyPem) {
	try {
		deriveCanonicalEd25519PublicKeyRaw(publicKeyPem);
		deriveCanonicalEd25519PrivateKeyRaw(privateKeyPem);
		const publicKey = crypto.createPublicKey(publicKeyPem);
		const privateKey = crypto.createPrivateKey(privateKeyPem);
		if (publicKey.asymmetricKeyType !== "ed25519" || privateKey.asymmetricKeyType !== "ed25519") return false;
		const derivedPublicKey = crypto.createPublicKey(privateKeyPem).export({
			type: "spki",
			format: "der"
		});
		const storedPublicKey = publicKey.export({
			type: "spki",
			format: "der"
		});
		return Buffer.from(derivedPublicKey).equals(Buffer.from(storedPublicKey));
	} catch {
		return false;
	}
}
function parseCreatedAtMs(value) {
	return asSafeIntegerInRange(value, { min: 0 }) ?? null;
}
/** Validate persisted key material and return the canonical runtime shape. */
function validateStoredDeviceIdentity(value, identityKey = PRIMARY_DEVICE_IDENTITY_KEY) {
	try {
		if (!value.deviceId || !/^[a-f0-9]{64}$/.test(value.deviceId) || !value.publicKeyPem || !value.privateKeyPem || parseCreatedAtMs(value.createdAtMs) === null || !keyPairMatches(value.publicKeyPem, value.privateKeyPem)) throw invalidStoredIdentityError(identityKey);
		if (fingerprintPublicKey(value.publicKeyPem) !== value.deviceId) throw invalidStoredIdentityError(identityKey);
		return {
			deviceId: value.deviceId,
			publicKeyPem: value.publicKeyPem,
			privateKeyPem: value.privateKeyPem
		};
	} catch (error) {
		if (error instanceof DeviceIdentityStorageError) throw error;
		throw invalidStoredIdentityError(identityKey, error);
	}
}
function rowToStoredIdentity(row, expectedIdentityKey) {
	if (row.identity_key !== expectedIdentityKey || typeof row.device_id !== "string" || typeof row.public_key_pem !== "string" || typeof row.private_key_pem !== "string" || parseCreatedAtMs(row.created_at_ms) === null || parseCreatedAtMs(row.updated_at_ms) === null) throw invalidStoredIdentityError(expectedIdentityKey);
	return {
		deviceId: row.device_id,
		publicKeyPem: row.public_key_pem,
		privateKeyPem: row.private_key_pem,
		createdAtMs: row.created_at_ms
	};
}
function salvageStoredIdentityRow(row, expectedIdentityKey, repairedAtMs) {
	if (row.identity_key !== expectedIdentityKey || typeof row.public_key_pem !== "string" || typeof row.private_key_pem !== "string") return null;
	try {
		const publicKey = crypto.createPublicKey(row.public_key_pem);
		const privateKey = crypto.createPrivateKey(row.private_key_pem);
		if (publicKey.asymmetricKeyType !== "ed25519" || privateKey.asymmetricKeyType !== "ed25519") return null;
		const canonicalPublicKeyPem = publicKey.export({
			type: "spki",
			format: "pem"
		});
		const canonicalPrivateKeyPem = privateKey.export({
			type: "pkcs8",
			format: "pem"
		});
		if (crypto.createPublicKey(canonicalPrivateKeyPem).export({
			type: "spki",
			format: "pem"
		}) !== canonicalPublicKeyPem) return null;
		const createdAtMs = parseCreatedAtMs(row.created_at_ms) ?? parseCreatedAtMs(row.updated_at_ms) ?? repairedAtMs;
		const salvaged = {
			deviceId: fingerprintPublicKey(canonicalPublicKeyPem),
			publicKeyPem: canonicalPublicKeyPem,
			privateKeyPem: canonicalPrivateKeyPem,
			createdAtMs
		};
		validateStoredDeviceIdentity(salvaged, expectedIdentityKey);
		return salvaged;
	} catch {
		return null;
	}
}
function storedIdentityToRow(identityKey, stored, updatedAtMs = stored.createdAtMs) {
	return {
		identity_key: identityKey,
		device_id: stored.deviceId,
		public_key_pem: stored.publicKeyPem,
		private_key_pem: stored.privateKeyPem,
		created_at_ms: stored.createdAtMs,
		updated_at_ms: updatedAtMs
	};
}
function readStoredIdentityRowFromDatabase(database, identityKey) {
	const db = getNodeSqliteKysely(database.db);
	return executeSqliteQueryTakeFirstSync(database.db, db.selectFrom("device_identities").selectAll().where("identity_key", "=", identityKey)) ?? null;
}
function readStoredIdentityFromDatabase(database, identityKey) {
	const row = readStoredIdentityRowFromDatabase(database, identityKey);
	return row ? rowToStoredIdentity(row, identityKey) : null;
}
function isEmptyBootstrapIdentityTableMiss(database, error) {
	if (!(error instanceof Error) || !hasErrnoCode(error, "ERR_SQLITE_ERROR") || !/\bno such table: device_identities\b/iu.test(error.message)) return false;
	const db = getNodeSqliteKysely(database.db);
	return !executeSqliteQueryTakeFirstSync(database.db, db.selectFrom("sqlite_master").select("name").where("name", "not like", "sqlite_%").limit(1));
}
/** Resolve the concrete database and row identity used by process caches and diagnostics. */
function resolveDeviceIdentityStore(options = {}) {
	return {
		databasePath: path.resolve(options.path ?? resolveOpenClawStateSqlitePath(options.env ?? process.env)),
		identityKey: normalizeIdentityKey(options.identityKey)
	};
}
function assertNoPendingLegacyIdentity(options) {
	const { databasePath, identityKey } = resolveDeviceIdentityStore(options);
	if (identityKey !== PRIMARY_DEVICE_IDENTITY_KEY) return;
	const legacyPath = path.join(resolveOpenClawStateDirForDatabasePath(databasePath), "identity", "device.json");
	if (pathMayExistSync(`${legacyPath}.doctor-importing`) || pathMayExistSync(`${legacyPath}.native-importing`) || pathMayExistSync(legacyPath)) throw new StartupMaintenanceRequiredError("state-migrations", `Legacy device identity exists at ${legacyPath}. Run "openclaw doctor --fix" before starting the gateway or connecting this client.`);
}
/** Read through the writable shared-state lifecycle, validating any existing row. */
function readStoredDeviceIdentity(options = {}) {
	const resolved = resolveDeviceIdentityStore(options);
	const stored = readStoredIdentityFromDatabase(openOpenClawStateDatabase({
		env: options.env,
		path: resolved.databasePath
	}), resolved.identityKey);
	if (stored) validateStoredDeviceIdentity(stored, resolved.identityKey);
	return stored;
}
/** Read without creating, repairing, chmodding, or joining the writer lifecycle. */
function readStoredDeviceIdentityReadOnly(options = {}) {
	const resolved = resolveDeviceIdentityStore(options);
	return withExistingOpenClawStateDatabaseArtifactPreservingReadOnly((database) => {
		let stored;
		try {
			stored = readStoredIdentityFromDatabase(database, resolved.identityKey);
		} catch (error) {
			if (isEmptyBootstrapIdentityTableMiss(database, error)) return null;
			throw error;
		}
		if (stored) validateStoredDeviceIdentity(stored, resolved.identityKey);
		return stored;
	}, {
		env: options.env,
		path: resolved.databasePath
	}) ?? null;
}
/** Insert a candidate only when the key is still absent, then return the authoritative row. */
function insertStoredDeviceIdentityIfAbsent(candidate, options = {}) {
	const resolved = resolveDeviceIdentityStore(options);
	validateStoredDeviceIdentity(candidate, resolved.identityKey);
	return runOpenClawStateWriteTransaction(({ db }) => {
		const existing = readStoredIdentityFromDatabase({ db }, resolved.identityKey);
		if (existing) validateStoredDeviceIdentity(existing, resolved.identityKey);
		else {
			assertNoPendingLegacyIdentity({
				...options,
				path: resolved.databasePath,
				identityKey: resolved.identityKey
			});
			const kysely = getNodeSqliteKysely(db);
			executeSqliteQuerySync(db, kysely.insertInto("device_identities").values(storedIdentityToRow(resolved.identityKey, candidate)).onConflict((conflict) => conflict.column("identity_key").doNothing()));
		}
		const authoritative = readStoredIdentityFromDatabase({ db }, resolved.identityKey);
		if (!authoritative) throw new DeviceIdentityStorageError(`SQLite device identity "${resolved.identityKey}" was not durable after insert.`);
		validateStoredDeviceIdentity(authoritative, resolved.identityKey);
		return authoritative;
	}, {
		env: options.env,
		path: resolved.databasePath
	}, { operationLabel: "device-identity.create" });
}
/** Replace only an invalid authoritative row; preserve a valid concurrent winner. */
function repairInvalidStoredDeviceIdentity(candidate, options = {}) {
	const resolved = resolveDeviceIdentityStore(options);
	validateStoredDeviceIdentity(candidate, resolved.identityKey);
	return runOpenClawStateWriteTransaction(({ db }) => {
		let repaired = false;
		let rotated = false;
		let existingRow = null;
		try {
			existingRow = readStoredIdentityRowFromDatabase({ db }, resolved.identityKey);
			const existing = existingRow ? rowToStoredIdentity(existingRow, resolved.identityKey) : null;
			if (existing) {
				validateStoredDeviceIdentity(existing, resolved.identityKey);
				return {
					identity: existing,
					repaired,
					rotated
				};
			}
		} catch (error) {
			if (!(error instanceof DeviceIdentityStorageError)) throw error;
		}
		if (existingRow) {
			const salvaged = salvageStoredIdentityRow(existingRow, resolved.identityKey, candidate.createdAtMs);
			if (salvaged) {
				executeSqliteQuerySync(db, getNodeSqliteKysely(db).updateTable("device_identities").set({
					device_id: salvaged.deviceId,
					public_key_pem: salvaged.publicKeyPem,
					private_key_pem: salvaged.privateKeyPem,
					created_at_ms: salvaged.createdAtMs,
					updated_at_ms: candidate.createdAtMs
				}).where("identity_key", "=", resolved.identityKey));
				const authoritative = readStoredIdentityFromDatabase({ db }, resolved.identityKey);
				if (!authoritative) throw new DeviceIdentityStorageError(`SQLite device identity "${resolved.identityKey}" was not durable after repair.`);
				validateStoredDeviceIdentity(authoritative, resolved.identityKey);
				return {
					identity: authoritative,
					repaired: true,
					rotated
				};
			}
			executeSqliteQuerySync(db, getNodeSqliteKysely(db).deleteFrom("device_identities").where("identity_key", "=", resolved.identityKey));
		}
		repaired = true;
		rotated = true;
		executeSqliteQuerySync(db, getNodeSqliteKysely(db).insertInto("device_identities").values(storedIdentityToRow(resolved.identityKey, candidate)).onConflict((conflict) => conflict.column("identity_key").doNothing()));
		const authoritative = readStoredIdentityFromDatabase({ db }, resolved.identityKey);
		if (!authoritative) throw new DeviceIdentityStorageError(`SQLite device identity "${resolved.identityKey}" was not durable after repair.`);
		validateStoredDeviceIdentity(authoritative, resolved.identityKey);
		return {
			identity: authoritative,
			repaired,
			rotated
		};
	}, {
		env: options.env,
		path: resolved.databasePath
	}, { operationLabel: "device-identity.doctor-repair" });
}
//#endregion
export { readStoredDeviceIdentity as a, resolveDeviceIdentityStore as c, readProcessDeviceIdentity as d, insertStoredDeviceIdentityIfAbsent as i, validateStoredDeviceIdentity as l, assertNoPendingLegacyIdentity as n, readStoredDeviceIdentityReadOnly as o, generateStoredDeviceIdentity as r, repairInvalidStoredDeviceIdentity as s, DeviceIdentityStorageError as t, cacheProcessDeviceIdentity as u };
