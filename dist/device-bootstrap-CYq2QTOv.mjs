import { t as createSubsystemLogger } from "./subsystem-CeqVSEVi.mjs";
import { n as createAsyncLock } from "./json-files-Br8qKrAz.mjs";
import { n as executeDevicePairingMutation, t as DevicePairingAuthorityRefusedError } from "./device-pairing-worker-B8A2gDTf.mjs";
import { n as loadBoundDeviceBootstrapContextReadOnly } from "./device-pairing-store-readonly-BZug65qg.mjs";
import { f as normalizeDeviceBootstrapHandoffProfile, o as PAIRING_SETUP_BOOTSTRAP_PROFILE, p as normalizeDeviceBootstrapProfile } from "./device-bootstrap-profile-DV7lvW3L.mjs";
import "./pairing-files-DdxuFZBY.mjs";
import "./device-bootstrap.worker-types-B_8ydFBr.mjs";
import { randomUUID } from "node:crypto";
//#region src/infra/device-bootstrap.ts
const withLock = createAsyncLock();
const log = createSubsystemLogger("device-bootstrap");
function assertBootstrapTokenCurrent(facts) {
	if (facts.issuedAtMs < Date.now() - 6e5) throw new DevicePairingAuthorityRefusedError();
}
function warnIfIssuedBootstrapScopesWereStripped(params) {
	if (!params.input) return;
	const requestedProfile = normalizeDeviceBootstrapProfile(params.input);
	const requestedScopes = requestedProfile.scopes;
	if (requestedScopes.length === 0) return;
	const retainedScopeSet = new Set(params.profile.scopes);
	const strippedScopes = requestedScopes.filter((scope) => !retainedScopeSet.has(scope));
	if (strippedScopes.length === 0) return;
	log.warn("bootstrap_token_scopes_stripped", {
		roles: requestedProfile.roles,
		requestedScopes,
		retainedScopes: params.profile.scopes,
		strippedScopes,
		consoleMessage: "bootstrap token scopes stripped to bootstrap handoff allowlist"
	});
}
async function issueDeviceBootstrapTokenRecord(params) {
	const assertCurrent = params.assertCurrent;
	return await withLock(async () => {
		const input = params.profile || (params.roles || params.scopes ? {
			roles: params.roles,
			scopes: params.scopes
		} : void 0);
		const profile = input ? normalizeDeviceBootstrapHandoffProfile(input) : PAIRING_SETUP_BOOTSTRAP_PROFILE;
		warnIfIssuedBootstrapScopesWereStripped({
			input,
			profile
		});
		return await executeDevicePairingMutation({
			type: "bootstrap.issue",
			input: {
				profile,
				setupId: params.setupId,
				nowMs: Date.now()
			}
		}, {
			baseDir: params.baseDir,
			assertCurrent
		});
	});
}
/** Issue a short-lived generic bootstrap token with a bounded role/scope handoff profile. */
async function issueDeviceBootstrapToken(params = {}) {
	return await issueDeviceBootstrapTokenRecord(params);
}
/**
* Issue a setup bootstrap token plus an opaque correlation id. `setupId` is
* minted here, beside the credential, so the presenting client can follow one
* exact credential without ever handling the bearer token. Generic bootstrap
* handoffs stay uncorrelated: only setup codes have a presenting client.
*/
async function issueDevicePairSetupBootstrapToken(params) {
	const setupId = randomUUID();
	return {
		...await issueDeviceBootstrapTokenRecord({
			...params,
			setupId
		}),
		setupId
	};
}
/** Reuse one environment-owned setup credential across provider replay. */
async function ensureDevicePairSetupBootstrapToken(params) {
	const { baseDir, ...input } = params;
	return await withLock(() => executeDevicePairingMutation({
		type: "bootstrap.ensure",
		input: {
			...input,
			nowMs: Date.now()
		}
	}, { baseDir }));
}
/** Consume only while the bound device and its live handoff authority remain current. */
async function consumeDeviceBootstrapTokenWithSetupCompletion(params) {
	const { baseDir, pairedDeviceMatches, ...input } = params;
	return await withLock(async () => {
		try {
			return await executeDevicePairingMutation({
				type: "bootstrap.consume",
				input: {
					...input,
					nowMs: Date.now()
				}
			}, {
				baseDir,
				admit: (facts) => {
					if (facts.kind === "bootstrap.consume") {
						assertBootstrapTokenCurrent(facts);
						if (pairedDeviceMatches && !pairedDeviceMatches(facts.pairedDevice)) throw new DevicePairingAuthorityRefusedError();
					}
				}
			});
		} catch (error) {
			if (error instanceof DevicePairingAuthorityRefusedError) return null;
			throw error;
		}
	});
}
/** Confirm that the pairing client received the credential-bearing handoff response. */
async function confirmDevicePairSetupCompletionDelivery(params) {
	const { baseDir, ...input } = params;
	return await withLock(() => executeDevicePairingMutation({
		type: "bootstrap.confirm",
		input: {
			...input,
			nowMs: Date.now()
		}
	}, { baseDir }));
}
/** Read the terminal outcome and prune expired completions under the settlement lock. */
async function readDevicePairSetupCompletion(params) {
	const { baseDir, ...input } = params;
	return await withLock(() => executeDevicePairingMutation({
		type: "bootstrap.readCompletion",
		input: {
			...input,
			nowMs: Date.now()
		}
	}, { baseDir }));
}
/** Remove every outstanding bootstrap token. */
async function clearDeviceBootstrapTokens(params = {}) {
	const { baseDir, assertCurrent, ...input } = params;
	return await withLock(() => executeDevicePairingMutation({
		type: "bootstrap.clear",
		input: {
			...input,
			nowMs: Date.now()
		}
	}, {
		baseDir,
		assertCurrent
	}));
}
/** Revoke one bootstrap token and retain its record for best-effort restoration. */
async function revokeDeviceBootstrapToken(params) {
	const { baseDir, ...input } = params;
	return await withLock(() => executeDevicePairingMutation({
		type: "bootstrap.revoke",
		input: {
			...input,
			nowMs: Date.now()
		}
	}, { baseDir }));
}
/** Restore an uncorrelated bootstrap bearer after an undelivered credential response. */
async function restoreGenericDeviceBootstrapToken(params) {
	const { baseDir, ...input } = params;
	return await withLock(() => executeDevicePairingMutation({
		type: "bootstrap.restore",
		input: {
			...input,
			nowMs: Date.now()
		}
	}, { baseDir }));
}
/** Record one role/scope leg of a multi-role bootstrap handoff. */
async function redeemDeviceBootstrapTokenProfile(params) {
	const { baseDir, ...input } = params;
	return await withLock(async () => {
		try {
			return await executeDevicePairingMutation({
				type: "bootstrap.redeem",
				input: {
					...input,
					nowMs: Date.now()
				}
			}, {
				baseDir,
				admit: (facts) => {
					if (facts.kind === "bootstrap.token") assertBootstrapTokenCurrent(facts);
				}
			});
		} catch (error) {
			if (error instanceof DevicePairingAuthorityRefusedError) return {
				recorded: false,
				fullyRedeemed: false
			};
			throw error;
		}
	});
}
/** Verify a bootstrap token, bind its first device identity, and stage requested scopes. */
async function verifyDeviceBootstrapToken(params) {
	const { baseDir, ...input } = params;
	return await withLock(async () => {
		try {
			return await executeDevicePairingMutation({
				type: "bootstrap.verify",
				input: {
					...input,
					nowMs: Date.now()
				}
			}, {
				baseDir,
				admit: (facts) => {
					if (facts.kind === "bootstrap.token") assertBootstrapTokenCurrent(facts);
				}
			});
		} catch (error) {
			if (error instanceof DevicePairingAuthorityRefusedError) return {
				ok: false,
				reason: "bootstrap_token_invalid"
			};
			throw error;
		}
	});
}
/** Remove retained setup outcomes independently of status requests or later pairings. */
async function pruneExpiredDevicePairSetupCompletions(params = {}) {
	return await withLock(() => executeDevicePairingMutation({
		type: "bootstrap.prune",
		input: { nowMs: params.nowMs ?? Date.now() }
	}, { baseDir: params.baseDir }));
}
/** Read already-bound context only after verifying the same credential and identity. */
async function getBoundDeviceBootstrapContext(params) {
	const { baseDir, ...input } = params;
	return await withLock(() => loadBoundDeviceBootstrapContextReadOnly({
		...input,
		nowMs: Date.now()
	}, baseDir));
}
/** Read the profile from already-bound bootstrap context. */
async function getBoundDeviceBootstrapProfile(params) {
	return (await getBoundDeviceBootstrapContext(params))?.profile ?? null;
}
//#endregion
export { getBoundDeviceBootstrapContext as a, issueDevicePairSetupBootstrapToken as c, redeemDeviceBootstrapTokenProfile as d, restoreGenericDeviceBootstrapToken as f, ensureDevicePairSetupBootstrapToken as i, pruneExpiredDevicePairSetupCompletions as l, verifyDeviceBootstrapToken as m, confirmDevicePairSetupCompletionDelivery as n, getBoundDeviceBootstrapProfile as o, revokeDeviceBootstrapToken as p, consumeDeviceBootstrapTokenWithSetupCompletion as r, issueDeviceBootstrapToken as s, clearDeviceBootstrapTokens as t, readDevicePairSetupCompletion as u };
