import { t as pathMayExistSync } from "./path-existence-O1bMV6vh.mjs";
import { a as readStoredDeviceIdentity, c as resolveDeviceIdentityStore, d as readProcessDeviceIdentity, i as insertStoredDeviceIdentityIfAbsent, n as assertNoPendingLegacyIdentity, o as readStoredDeviceIdentityReadOnly, r as generateStoredDeviceIdentity, u as cacheProcessDeviceIdentity } from "./device-identity-store-vMcW1FNH.mjs";
import { c as normalizeEd25519PublicKeyBase64Url, d as verifyEd25519Signature, l as publicKeyRawBase64UrlFromEd25519Pem, u as signEd25519Payload } from "./ed25519-signature-D_xiObSW.mjs";
import crypto from "node:crypto";
//#region src/infra/device-identity.ts
function toDeviceIdentity(stored) {
	return {
		deviceId: stored.deviceId,
		publicKeyPem: stored.publicKeyPem,
		privateKeyPem: stored.privateKeyPem
	};
}
/** Load a valid canonical identity or atomically create its SQLite row. */
function loadOrCreateDeviceIdentity(options = {}) {
	const resolved = resolveDeviceIdentityStore(options);
	const resolvedOptions = {
		...options,
		path: resolved.databasePath,
		identityKey: resolved.identityKey
	};
	const existing = pathMayExistSync(resolved.databasePath) ? readStoredDeviceIdentity(resolvedOptions) : null;
	if (existing) return toDeviceIdentity(existing);
	assertNoPendingLegacyIdentity(resolvedOptions);
	const candidate = generateStoredDeviceIdentity();
	return toDeviceIdentity(insertStoredDeviceIdentityIfAbsent(candidate, resolvedOptions));
}
/** Keep one authoritative identity stable for the lifetime of a state-dir process. */
function loadOrCreateProcessDeviceIdentity(options = {}) {
	const { databasePath, identityKey } = resolveDeviceIdentityStore(options);
	const cacheKey = `${databasePath}\0${identityKey}`;
	const cached = readProcessDeviceIdentity(cacheKey);
	if (cached) return cached;
	const identity = loadOrCreateDeviceIdentity({
		...options,
		path: databasePath,
		identityKey
	});
	return cacheProcessDeviceIdentity(cacheKey, identity);
}
/** Load a valid persisted identity without creating or mutating SQLite state. */
function loadDeviceIdentityIfPresent(options = {}) {
	const stored = readStoredDeviceIdentityReadOnly(options);
	if (stored) return toDeviceIdentity(stored);
	assertNoPendingLegacyIdentity(options);
	return null;
}
/** Sign a UTF-8 payload with a PEM Ed25519 private key and return base64url bytes. */
function signDevicePayload(privateKeyPem, payload) {
	return signEd25519Payload(privateKeyPem, payload);
}
/** Normalize PEM or raw base64/base64url public keys to canonical raw base64url bytes. */
function normalizeDevicePublicKeyBase64Url(publicKey) {
	return normalizeEd25519PublicKeyBase64Url(publicKey);
}
/** Derive the stable device id from PEM or raw base64/base64url public key material. */
function deriveDeviceIdFromPublicKey(publicKey) {
	try {
		const normalized = normalizeEd25519PublicKeyBase64Url(publicKey);
		if (!normalized) return null;
		const raw = Buffer.from(normalized, "base64url");
		return crypto.createHash("sha256").update(raw).digest("hex");
	} catch {
		return null;
	}
}
/** Export a PEM Ed25519 public key as canonical raw base64url bytes. */
function publicKeyRawBase64UrlFromPem(publicKeyPem) {
	return publicKeyRawBase64UrlFromEd25519Pem(publicKeyPem);
}
/** Verify a UTF-8 payload signature against PEM or raw base64/base64url public key material. */
function verifyDeviceSignature(publicKey, payload, signatureBase64Url) {
	return verifyEd25519Signature({
		publicKey,
		payload,
		signatureBase64Url
	});
}
//#endregion
export { normalizeDevicePublicKeyBase64Url as a, verifyDeviceSignature as c, loadOrCreateProcessDeviceIdentity as i, loadDeviceIdentityIfPresent as n, publicKeyRawBase64UrlFromPem as o, loadOrCreateDeviceIdentity as r, signDevicePayload as s, deriveDeviceIdFromPublicKey as t };
