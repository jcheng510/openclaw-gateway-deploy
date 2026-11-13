import { g as readStringValue } from "./string-coerce-6kR-86XC.mjs";
import { a as parseOpenClawManifestInstallBase, c as resolveOpenClawManifestOs, i as parseFrontmatterBool, l as resolveOpenClawManifestRequires, n as getFrontmatterString, o as resolveOpenClawManifestBlock, r as normalizeStringList, s as resolveOpenClawManifestInstall, t as applyOpenClawManifestInstallCommonFields } from "./frontmatter-Bibn4xoJ.mjs";
//#region src/hooks/frontmatter.ts
function parseInstallSpec(input) {
	const parsed = parseOpenClawManifestInstallBase(input, [
		"bundled",
		"npm",
		"git"
	]);
	if (!parsed) return;
	const { raw } = parsed;
	const spec = applyOpenClawManifestInstallCommonFields({ kind: parsed.kind }, parsed);
	if (typeof raw.package === "string") spec.package = raw.package;
	if (typeof raw.repository === "string") spec.repository = raw.repository;
	return spec;
}
/** Resolve OpenClaw hook metadata from the manifest block in HOOK.md frontmatter. */
function resolveHookManifestMetadata(frontmatter) {
	const metadataObj = resolveOpenClawManifestBlock({ frontmatter });
	if (!metadataObj) return;
	const requires = resolveOpenClawManifestRequires(metadataObj);
	const install = resolveOpenClawManifestInstall(metadataObj, parseInstallSpec);
	const osRaw = resolveOpenClawManifestOs(metadataObj);
	return {
		always: typeof metadataObj.always === "boolean" ? metadataObj.always : void 0,
		emoji: readStringValue(metadataObj.emoji),
		homepage: readStringValue(metadataObj.homepage),
		hookKey: readStringValue(metadataObj.hookKey),
		export: readStringValue(metadataObj.export),
		os: osRaw.length > 0 ? osRaw : void 0,
		events: normalizeStringList(metadataObj.events),
		requires,
		install: install.length > 0 ? install : void 0
	};
}
/** Resolve invocation policy from top-level hook frontmatter flags. */
function resolveHookInvocationPolicy(frontmatter) {
	return { enabled: parseFrontmatterBool(getFrontmatterString(frontmatter, "enabled"), true) };
}
/** Resolve the config key for a hook, honoring metadata hookKey overrides. */
function resolveHookKey(hookName, entry) {
	return entry?.metadata?.hookKey ?? hookName;
}
//#endregion
export { resolveHookKey as n, resolveHookManifestMetadata as r, resolveHookInvocationPolicy as t };
