import { o as openRootFileSync } from "./boundary-file-read-CCth2Hwg.mjs";
import fs from "node:fs";
import path from "node:path";
import { root } from "@openclaw/fs-safe/root";
//#region src/skills/loading/skill-directory-modes.ts
async function ensureWritableSkillDirectories(skillsDir, relativePath) {
	if (process.platform === "win32") return;
	const fixedRoot = path.join(await fs.promises.realpath(path.dirname(skillsDir)), path.basename(skillsDir));
	const boundary = await root(fixedRoot);
	if (boundary.rootReal !== fixedRoot) throw new Error("Skill directory root must not be a symbolic link");
	const visit = async (relativeDir) => {
		const scopedPath = `.${path.sep}${relativeDir}`;
		const stat = await boundary.stat(scopedPath);
		if (stat.isSymbolicLink || !stat.isDirectory) return;
		const opened = openRootFileSync({
			absolutePath: path.join(fixedRoot, relativeDir),
			rootPath: fixedRoot,
			rootRealPath: fixedRoot,
			boundaryLabel: "skills directory",
			allowedType: "directory",
			symlinks: "reject"
		});
		if (!opened.ok) throw new Error("Could not open skill directory safely", { cause: opened.error });
		try {
			if ((opened.stat.mode & 448) !== 448) fs.fchmodSync(opened.fd, opened.stat.mode | 448);
		} finally {
			fs.closeSync(opened.fd);
		}
		for (const child of await boundary.list(scopedPath, { withFileTypes: true })) if (child.isDirectory && !child.isSymbolicLink) await visit(path.join(relativeDir, child.name));
	};
	await visit(relativePath);
}
//#endregion
export { ensureWritableSkillDirectories as t };
