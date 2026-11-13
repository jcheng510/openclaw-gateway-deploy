import { a as resolveCliParentCommandPath } from "./config-output-mode-CLfAA2mn.mjs";
import { A as resolveGatewayCatalogCommandPath, a as getPrimaryCommand, l as isHelpOrVersionInvocation, n as getCommandPathWithRootOptions, u as isRootHelpInvocation } from "./argv-vtXWEchA.mjs";
//#region src/cli/argv-invocation.ts
/** Resolves command path and help/version mode from a raw process argv array. */
function resolveCliArgvInvocation(argv) {
	return {
		argv,
		commandPath: resolveGatewayCatalogCommandPath(argv) ?? resolveCliParentCommandPath(argv) ?? getCommandPathWithRootOptions(argv, 2),
		primary: getPrimaryCommand(argv),
		hasHelpOrVersion: isHelpOrVersionInvocation(argv),
		isRootHelpInvocation: isRootHelpInvocation(argv)
	};
}
//#endregion
export { resolveCliArgvInvocation as t };
