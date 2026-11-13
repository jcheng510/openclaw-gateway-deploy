import { n as createLazyRuntimeMethodBinder } from "./lazy-runtime-CJrzFzqU.mjs";
//#region src/plugins/install-security-scan.ts
/** Lazily loads install scanning so normal plugin startup avoids policy/runtime imports. */
async function loadInstallSecurityScanRuntime() {
	return await import("./install-security-scan.runtime.js");
}
const bindInstallSecurityScanRuntime = createLazyRuntimeMethodBinder(loadInstallSecurityScanRuntime);
/** Scans an unpacked bundle source before plugin install/update. */
const scanBundleInstallSource = bindInstallSecurityScanRuntime((runtime) => runtime.scanBundleInstallSourceRuntime);
/** Scans a package source directory and executable metadata before install/update. */
const scanPackageInstallSource = bindInstallSecurityScanRuntime((runtime) => runtime.scanPackageInstallSourceRuntime);
/** Scans the installed package dependency tree after npm resolution. */
const scanInstalledPackageDependencyTree = bindInstallSecurityScanRuntime((runtime) => runtime.scanInstalledPackageDependencyTreeRuntime);
/**
* Retained for install.runtime compatibility with pre-v2026.6.5 lazy install chunks.
* Remove only with the matching runtime-postbuild legacy alias cleanup.
*/
const scanFileInstallSource = bindInstallSecurityScanRuntime((runtime) => runtime.scanFileInstallSourceRuntime);
/** Runs npm install policy checks before package install side effects. */
const preflightPluginNpmInstallPolicy = bindInstallSecurityScanRuntime((runtime) => runtime.preflightPluginNpmInstallPolicyRuntime);
/** Runs git install policy checks before plugin install side effects. */
const preflightPluginGitInstallPolicy = bindInstallSecurityScanRuntime((runtime) => runtime.preflightPluginGitInstallPolicyRuntime);
/** Evaluates shared install policy for skill-managed dependency installs. */
const evaluateSkillInstallPolicy = bindInstallSecurityScanRuntime((runtime) => runtime.evaluateSkillInstallPolicyRuntime);
//#endregion
export { scanFileInstallSource as a, scanBundleInstallSource as i, preflightPluginGitInstallPolicy as n, scanInstalledPackageDependencyTree as o, preflightPluginNpmInstallPolicy as r, scanPackageInstallSource as s, evaluateSkillInstallPolicy as t };
