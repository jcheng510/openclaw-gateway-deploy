import { o as normalizeLowercaseStringOrEmpty } from "./string-coerce-6kR-86XC.mjs";
import "./string-coerce-runtime-B1b8UNzb.mjs";
//#region extensions/memory-core/src/memory/tokenize.ts
const CJK_RE = /[\u3040-\u309f\u30a0-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uac00-\ud7af\u1100-\u11ff]/;
function tokenize(text) {
	const lower = normalizeLowercaseStringOrEmpty(text);
	const ascii = lower.match(/[a-z0-9_]+/g) ?? [];
	if (!CJK_RE.test(lower)) return new Set(ascii);
	const tokens = new Set(ascii);
	const unigrams = [];
	let previousCjk;
	for (const char of lower) if (CJK_RE.test(char)) {
		if (previousCjk !== void 0) tokens.add(previousCjk + char);
		unigrams.push(char);
		previousCjk = char;
	} else previousCjk = void 0;
	for (const char of unigrams) tokens.add(char);
	return tokens;
}
function jaccardSimilarity(setA, setB) {
	if (setA.size === 0 && setB.size === 0) return 1;
	if (setA.size === 0 || setB.size === 0) return 0;
	let intersectionSize = 0;
	const smaller = setA.size <= setB.size ? setA : setB;
	const larger = setA.size <= setB.size ? setB : setA;
	for (const token of smaller) if (larger.has(token)) intersectionSize++;
	const unionSize = setA.size + setB.size - intersectionSize;
	return unionSize === 0 ? 0 : intersectionSize / unionSize;
}
function textSimilarity(contentA, contentB) {
	const tokensA = tokenize(contentA);
	const tokensB = tokenize(contentB);
	if (tokensA.size === 0 && tokensB.size === 0) return normalizeLowercaseStringOrEmpty(contentA) === normalizeLowercaseStringOrEmpty(contentB) ? 1 : 0;
	return jaccardSimilarity(tokensA, tokensB);
}
//#endregion
export { textSimilarity as n, tokenize as r, jaccardSimilarity as t };
