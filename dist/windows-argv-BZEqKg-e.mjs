import { o as normalizeLowercaseStringOrEmpty } from "./string-coerce-6kR-86XC.mjs";
//#region src/cli/windows-argv.ts
/** Remove duplicated Windows node launcher argv entries while preserving normal POSIX argv. */
function normalizeWindowsArgv(argv, options = {}) {
	if ((options.platform ?? process.platform) !== "win32") return argv;
	if (argv.length < 2) return argv;
	const stripControlChars = (value) => {
		let out = "";
		for (let i = 0; i < value.length; i += 1) {
			const code = value.charCodeAt(i);
			if (code >= 32 && code !== 127) out += value[i];
		}
		return out;
	};
	const normalizeCandidate = (value) => stripControlChars(value).replace(/^['"]+|['"]+$/g, "").trim().replace(/^\\\\\\?\\/, "");
	const basename = (value) => value.split(/[\\/]/).pop() ?? value;
	const execPath = normalizeCandidate(options.execPath ?? process.execPath);
	const execPathLower = normalizeLowercaseStringOrEmpty(execPath);
	const execBase = normalizeLowercaseStringOrEmpty(basename(execPath));
	const isExecPath = (value) => {
		if (!value) return false;
		const normalized = normalizeCandidate(value);
		if (!normalized) return false;
		const lower = normalizeLowercaseStringOrEmpty(normalized);
		const base = basename(lower);
		return lower === execPathLower || base === execBase || base === "node.exe";
	};
	const next = [...argv];
	while (isExecPath(next[1])) next.splice(1, 1);
	return next;
}
//#endregion
export { normalizeWindowsArgv as t };
