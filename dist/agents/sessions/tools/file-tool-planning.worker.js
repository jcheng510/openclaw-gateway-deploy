import { c as isRecord } from "../../../record-coerce-TIsquoVR.mjs";
import { r as truncateUtf16Safe } from "../../../utf16-slice-D_ngcYKd.mjs";
import { n as serveWorkerTasks } from "../../../worker-task-server-Dj9rLvzH.mjs";
import { t as levenshteinDistance } from "../../../levenshtein-distance-LMZfJS7z.mjs";
import { n as prepareFileDiff, r as prepareFileWriteDiff } from "../../../file-diff-Cm5KmaWf.mjs";
//#region src/agents/line-endings.ts
/**
* Line-ending detection and restoration shared by the file-mutating agent tools.
*/
function detectLineEnding(content) {
	const crlfIdx = content.indexOf("\r\n");
	const lfIdx = content.indexOf("\n");
	if (lfIdx === -1) return "\n";
	if (crlfIdx === -1) return "\n";
	return crlfIdx < lfIdx ? "\r\n" : "\n";
}
function normalizeToLF(text) {
	return text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}
//#endregion
//#region src/agents/sessions/tools/edit-replacements.ts
function splitLinesWithEndings(content) {
	return content.match(/[^\n]*\n|[^\n]+/g) ?? [];
}
function getLineSpans(content) {
	let offset = 0;
	return splitLinesWithEndings(content).map((line) => {
		const span = {
			start: offset,
			end: offset + line.length
		};
		offset = span.end;
		return span;
	});
}
function getReplacementLineRange(lines, replacement) {
	const replacementStart = replacement.matchIndex;
	const replacementEnd = replacement.matchIndex + replacement.matchLength;
	let lower = 0;
	let upper = lines.length;
	while (lower < upper) {
		const middle = Math.floor((lower + upper) / 2);
		const line = lines[middle];
		if (!line) throw new Error("Replacement range is outside the base content.");
		if (line.end <= replacementStart) lower = middle + 1;
		else upper = middle;
	}
	const firstLine = lines[lower];
	const startLine = firstLine && replacementStart >= firstLine.start ? lower : -1;
	if (startLine === -1) throw new Error("Replacement range is outside the base content.");
	let endLine = startLine;
	while (endLine < lines.length) {
		const line = lines.at(endLine);
		if (!line || line.end >= replacementEnd) break;
		endLine++;
	}
	if (endLine >= lines.length) throw new Error("Replacement range is outside the base content.");
	return {
		startLine,
		endLine: endLine + 1
	};
}
function applyReplacements(content, replacements, offset = 0) {
	const parts = [];
	let cursor = 0;
	for (const replacement of replacements) {
		const matchIndex = replacement.matchIndex - offset;
		parts.push(content.slice(cursor, matchIndex), replacement.newText);
		cursor = matchIndex + replacement.matchLength;
	}
	parts.push(content.slice(cursor));
	return parts.join("");
}
function groupReplacementsByLine(baseContent, replacements) {
	const lines = getLineSpans(baseContent);
	const groups = [];
	const sortedReplacements = replacements.toSorted((a, b) => a.matchIndex - b.matchIndex);
	for (const replacement of sortedReplacements) {
		const range = getReplacementLineRange(lines, replacement);
		const current = groups.at(-1);
		if (current && range.startLine < current.endLine) {
			current.endLine = Math.max(current.endLine, range.endLine);
			current.replacements.push(replacement);
		} else groups.push({
			...range,
			replacements: [replacement]
		});
	}
	return {
		lines,
		groups
	};
}
function splitLinesWithTerminators(content) {
	return content.match(/[^\r\n]*(?:\r\n|\r|\n)|[^\r\n]+/g) ?? [];
}
function getLineTerminator(line) {
	if (line === void 0) return;
	if (line.endsWith("\r\n")) return "\r\n";
	if (line.endsWith("\n")) return "\n";
	return line.endsWith("\r") ? "\r" : void 0;
}
function restoreNormalizedLineEndings(normalizedContent, sourceLines, fallback) {
	let sourceIndex = 0;
	return normalizedContent.replace(/\n/g, () => {
		const source = sourceLines[sourceIndex] ?? sourceLines.at(-1);
		sourceIndex++;
		return getLineTerminator(source) ?? fallback;
	});
}
function countLineBreaks(content) {
	return content.match(/\n/g)?.length ?? 0;
}
function applyReplacementsPreservingLineEndings(originalContent, baseContent, replacements) {
	const originalLines = splitLinesWithTerminators(originalContent);
	const { lines: baseLines, groups } = groupReplacementsByLine(baseContent, replacements);
	if (originalLines.length !== baseLines.length) throw new Error("Cannot preserve original line endings because the base content has a different line count.");
	const fileFallback = detectLineEnding(originalContent);
	let originalIndex = 0;
	let result = "";
	for (const group of groups) {
		result += originalLines.slice(originalIndex, group.startLine).join("");
		const firstLine = baseLines.at(group.startLine);
		const lastLine = baseLines.at(group.endLine - 1);
		if (!firstLine || !lastLine) throw new Error("Replacement group is outside the base content.");
		const groupStartOffset = firstLine.start;
		const normalizedGroup = baseContent.slice(groupStartOffset, lastLine.end);
		const sourceGroup = originalLines.slice(group.startLine, group.endLine);
		const groupFallback = getLineTerminator(sourceGroup[0]) ?? getLineTerminator(originalLines[group.startLine - 1]) ?? fileFallback;
		const restoredGroup = restoreNormalizedLineEndings(normalizedGroup, sourceGroup, groupFallback);
		const restoredReplacements = group.replacements.map((replacement) => {
			const relativeStart = replacement.matchIndex - groupStartOffset;
			const relativeEnd = relativeStart + replacement.matchLength;
			const restoredStart = restoreNormalizedLineEndings(normalizedGroup.slice(0, relativeStart), sourceGroup, groupFallback).length;
			const restoredEnd = restoreNormalizedLineEndings(normalizedGroup.slice(0, relativeEnd), sourceGroup, groupFallback).length;
			const range = getReplacementLineRange(baseLines, replacement);
			const replacementSource = originalLines.slice(range.startLine, range.endLine);
			const replacementFallback = getLineTerminator(replacementSource[0]) ?? getLineTerminator(originalLines[range.startLine - 1]) ?? fileFallback;
			const consumedTerminatorCount = countLineBreaks(normalizedGroup.slice(relativeStart, relativeEnd));
			const replacementTerminatorCount = countLineBreaks(replacement.newText);
			const terminatorSources = consumedTerminatorCount > 0 ? replacementSource.slice(0, consumedTerminatorCount) : replacementSource.slice(0, 1);
			const sourceOffset = Math.max(0, terminatorSources.length - replacementTerminatorCount);
			return {
				matchIndex: restoredStart,
				matchLength: restoredEnd - restoredStart,
				newText: restoreNormalizedLineEndings(replacement.newText, terminatorSources.slice(sourceOffset), replacementFallback)
			};
		});
		result += applyReplacements(restoredGroup, restoredReplacements);
		originalIndex = group.endLine;
	}
	return result + originalLines.slice(originalIndex).join("");
}
//#endregion
//#region src/agents/sessions/tools/edit-diff.ts
/** Pure file edit planning and shared display/unified-patch receipts. */
const fuzzyGraphemeSegmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
function foldFuzzyCharacters(text) {
	return text.replace(/[\u2018\u2019\u201A\u201B]/g, "'").replace(/[\u201C\u201D\u201E\u201F]/g, "\"").replace(/[\u2010\u2011\u2012\u2013\u2014\u2015\u2212]/g, "-").replace(/[\u00A0\u2002-\u200A\u202F\u205F\u3000]/g, " ");
}
/**
* Normalize text for fuzzy matching. Applies progressive transformations:
* - Strip trailing whitespace from each line
* - Normalize smart quotes to ASCII equivalents
* - Normalize Unicode dashes/hyphens to ASCII hyphen
* - Normalize special Unicode spaces to regular space
*
*/
function normalizeForFuzzyMatch(text) {
	return foldFuzzyCharacters(text.normalize("NFKC").split("\n").map((line) => line.trimEnd()).join("\n"));
}
function buildNfkcBoundaries(text, authoritativeNfkc) {
	const boundaries = [];
	const normalizedSegments = [];
	let normalizedOffset = 0;
	for (const segment of fuzzyGraphemeSegmenter.segment(text)) {
		const sourceStart = segment.index;
		const sourceEnd = sourceStart + segment.segment.length;
		const normalizedSegment = segment.segment.normalize("NFKC");
		normalizedSegments.push(normalizedSegment);
		const boundary = boundaries[normalizedOffset] ?? {};
		if (normalizedSegment.length === 0) {
			boundaries[normalizedOffset] = {
				end: boundary.end ?? sourceStart,
				start: sourceEnd
			};
			continue;
		}
		boundaries[normalizedOffset] = {
			start: boundary.start ?? sourceStart,
			end: boundary.end ?? sourceStart
		};
		normalizedOffset += normalizedSegment.length;
		boundaries[normalizedOffset] = {
			start: sourceEnd,
			end: sourceEnd
		};
	}
	if (normalizedSegments.join("") !== authoritativeNfkc) return;
	return boundaries;
}
function buildFuzzyBoundaries(text, normalizedText) {
	const authoritativeNfkc = text.normalize("NFKC");
	const nfkcBoundaries = buildNfkcBoundaries(text, authoritativeNfkc);
	if (!nfkcBoundaries) return;
	const boundaries = [];
	let sourceLineStart = 0;
	let normalizedLineStart = 0;
	while (sourceLineStart <= authoritativeNfkc.length) {
		const newlineIndex = authoritativeNfkc.indexOf("\n", sourceLineStart);
		const sourceLineEnd = newlineIndex === -1 ? authoritativeNfkc.length : newlineIndex;
		const line = authoritativeNfkc.slice(sourceLineStart, sourceLineEnd);
		const keptLineEnd = sourceLineStart + line.trimEnd().length;
		for (let offset = sourceLineStart; offset <= keptLineEnd; offset++) {
			const boundary = nfkcBoundaries[offset];
			if (boundary) boundaries[normalizedLineStart + offset - sourceLineStart] = boundary;
		}
		const normalizedLineEnd = normalizedLineStart + keptLineEnd - sourceLineStart;
		if (keptLineEnd < sourceLineEnd) {
			const beforeTrim = nfkcBoundaries[keptLineEnd];
			const afterTrim = nfkcBoundaries[sourceLineEnd];
			boundaries[normalizedLineEnd] = {
				end: beforeTrim?.end,
				start: afterTrim?.start
			};
		}
		if (newlineIndex === -1) break;
		const afterNewline = nfkcBoundaries[sourceLineEnd + 1];
		boundaries[normalizedLineEnd + 1] = afterNewline;
		normalizedLineStart = normalizedLineEnd + 1;
		sourceLineStart = sourceLineEnd + 1;
	}
	if (boundaries.length > normalizedText.length + 1) return;
	return boundaries;
}
function translateFuzzySpan(normalized, fuzzyStart, fuzzyLength) {
	const fuzzyEnd = fuzzyStart + fuzzyLength;
	const originalStart = normalized.boundaries?.[fuzzyStart]?.start;
	const originalEnd = normalized.boundaries?.[fuzzyEnd]?.end;
	if (originalStart === void 0 || originalEnd === void 0) return;
	return {
		originalStart,
		originalLength: originalEnd - originalStart
	};
}
/**
* Find oldText in content, trying exact match first, then fuzzy match.
* When fuzzy matching is used and an offsetMap is provided, the returned
* index and matchLength are translated back to original-content coordinates
* so the caller can apply replacements against the un-normalized content.
*/
function fuzzyFindText(content, oldText, normalizedFile) {
	const exactIndex = content.indexOf(oldText);
	if (exactIndex !== -1) return {
		found: true,
		index: exactIndex,
		matchLength: oldText.length,
		usedFuzzyMatch: false
	};
	const fuzzyContent = normalizedFile?.text ?? normalizeForFuzzyMatch(content);
	const fuzzyOldText = normalizeForFuzzyMatch(oldText);
	if (!fuzzyOldText) return {
		found: false,
		index: -1,
		matchLength: 0,
		usedFuzzyMatch: true,
		unsafeBoundary: true
	};
	const fuzzyIndex = fuzzyContent.indexOf(fuzzyOldText);
	if (fuzzyIndex === -1) return {
		found: false,
		index: -1,
		matchLength: 0,
		usedFuzzyMatch: false
	};
	if (normalizedFile && !normalizedFile.boundaries) normalizedFile.boundaries = buildFuzzyBoundaries(content, normalizedFile.text);
	const translated = normalizedFile ? translateFuzzySpan(normalizedFile, fuzzyIndex, fuzzyOldText.length) : void 0;
	if (!translated) return {
		found: false,
		index: -1,
		matchLength: 0,
		usedFuzzyMatch: true,
		unsafeBoundary: true
	};
	return {
		found: true,
		index: translated.originalStart,
		matchLength: translated.originalLength,
		usedFuzzyMatch: true
	};
}
/** Strip UTF-8 BOM if present, return both the BOM (if any) and the text without it */
function stripBom(content) {
	return content.startsWith("﻿") ? {
		bom: "﻿",
		text: content.slice(1)
	} : {
		bom: "",
		text: content
	};
}
function countOccurrences(fuzzyContent, oldText) {
	const fuzzyOldText = normalizeForFuzzyMatch(oldText);
	if (!fuzzyOldText) return 0;
	return fuzzyContent.split(fuzzyOldText).length - 1;
}
function countExactOccurrences(content, oldText) {
	return content.split(oldText).length - 1;
}
const EDIT_CANDIDATE_LIMIT = 3;
const EDIT_CANDIDATE_MAX_LINES = 1e3;
const EDIT_CANDIDATE_MAX_SCAN_CHARS = 131072;
const EDIT_CANDIDATE_MAX_LINE_CHARS = 120;
const EDIT_CANDIDATE_MIN_SCORE = .45;
function getBoundedLines(text, maxLines, maxScanChars) {
	return truncateUtf16Safe(text, maxScanChars).split("\n", maxLines).map((line) => truncateUtf16Safe(line, EDIT_CANDIDATE_MAX_LINE_CHARS));
}
function scoreCandidate(expected, candidate) {
	const normalizedExpected = expected.trim();
	const normalizedCandidate = candidate.trim();
	const maxLength = Math.max(normalizedExpected.length, normalizedCandidate.length);
	if (maxLength === 0) return 0;
	if (Math.min(normalizedExpected.length, normalizedCandidate.length) / maxLength < EDIT_CANDIDATE_MIN_SCORE) return 0;
	return 1 - levenshteinDistance(normalizedExpected, normalizedCandidate) / maxLength;
}
function describeIndentation(line) {
	const indentation = line.match(/^[ \t]*/)?.[0] ?? "";
	if (!indentation) return "none";
	const tabs = indentation.match(/\t/g)?.length ?? 0;
	const spaces = indentation.length - tabs;
	return tabs === 0 ? `${spaces} spaces` : `${spaces} spaces and ${tabs} tabs`;
}
function firstDifferenceIndex(left, right) {
	const sharedLength = Math.min(left.length, right.length);
	for (let index = 0; index < sharedLength; index++) if (left.charAt(index) !== right.charAt(index)) return index;
	return left.length === right.length ? -1 : sharedLength;
}
function describeCandidateDifference(expected, found) {
	if ((expected.match(/^[ \t]*/)?.[0] ?? "") !== (found.match(/^[ \t]*/)?.[0] ?? "")) return `indentation differs (expected ${describeIndentation(expected)}, found ${describeIndentation(found)})`;
	const expectedBackslashes = expected.match(/\\/g)?.length ?? 0;
	const foundBackslashes = found.match(/\\/g)?.length ?? 0;
	if (expectedBackslashes !== foundBackslashes) return `escaping differs (expected ${expectedBackslashes} backslashes, found ${foundBackslashes})`;
	const differenceIndex = firstDifferenceIndex(expected, found);
	return differenceIndex === -1 ? "this line matches; surrounding lines differ" : `first difference at column ${differenceIndex + 1}`;
}
function getCandidateHint(content, oldText) {
	const expected = getBoundedLines(oldText, 32, 4096).reduce((best, line) => line.trim().length > best.trim().length ? line : best, "");
	if (!expected.trim()) return "";
	const candidates = getBoundedLines(content, EDIT_CANDIDATE_MAX_LINES, EDIT_CANDIDATE_MAX_SCAN_CHARS).map((line, index) => {
		const score = scoreCandidate(expected, line);
		return score >= EDIT_CANDIDATE_MIN_SCORE ? {
			lineNumber: index + 1,
			line,
			score
		} : void 0;
	}).filter((candidate) => candidate !== void 0).toSorted((left, right) => right.score - left.score || left.lineNumber - right.lineNumber).slice(0, EDIT_CANDIDATE_LIMIT);
	if (candidates.length === 0) return "";
	const expectedDisplay = JSON.stringify(expected);
	return "\nClosest matching lines:\n" + candidates.map((candidate) => {
		const foundDisplay = JSON.stringify(candidate.line);
		const differenceIndex = firstDifferenceIndex(expectedDisplay, foundDisplay);
		const markerIndex = differenceIndex === -1 ? Math.min(expectedDisplay.length, foundDisplay.length) : differenceIndex;
		const markerWidth = Math.max(1, Math.min(12, Math.max(expectedDisplay.length, foundDisplay.length) - markerIndex));
		return [
			`  near line ${candidate.lineNumber} (${Math.round(candidate.score * 100)}% match):`,
			`    expected: ${expectedDisplay}`,
			`    found:    ${foundDisplay}`,
			`              ${" ".repeat(markerIndex)}${"^".repeat(markerWidth)}`,
			`    hint: ${describeCandidateDifference(expected, candidate.line)}`
		].join("\n");
	}).join("\n");
}
function getNotFoundError(path, editIndex, totalEdits, content, oldText) {
	const prefix = totalEdits === 1 ? "Could not find the exact text" : `Could not find edits[${editIndex}]`;
	const hint = getCandidateHint(content, oldText);
	return /* @__PURE__ */ new Error(`${prefix} in ${path}. The old text must match exactly including all whitespace and newlines.${hint}`);
}
function getDuplicateError(path, editIndex, totalEdits, occurrences) {
	if (totalEdits === 1) return /* @__PURE__ */ new Error(`Found ${occurrences} occurrences of the text in ${path}. The text must be unique. Please provide more context to make it unique.`);
	return /* @__PURE__ */ new Error(`Found ${occurrences} occurrences of edits[${editIndex}] in ${path}. Each oldText must be unique. Please provide more context to make it unique.`);
}
function getEmptyOldTextError(path, editIndex, totalEdits) {
	if (totalEdits === 1) return /* @__PURE__ */ new Error(`oldText must not be empty in ${path}.`);
	return /* @__PURE__ */ new Error(`edits[${editIndex}].oldText must not be empty in ${path}.`);
}
function getUnsafeFuzzyBoundaryError(path, editIndex, totalEdits) {
	const target = totalEdits === 1 ? "The fuzzy match" : `The fuzzy match for edits[${editIndex}]`;
	return /* @__PURE__ */ new Error(`${target} in ${path} crosses an ambiguous Unicode-normalization or trimmed-whitespace boundary. Copy the exact source text or use a span whose normalized boundaries map cleanly.`);
}
/**
* Apply one or more exact-text replacements to LF-normalized content.
*
* All edits are matched against the same original content. Replacements are
* assembled from original spans so offsets remain stable. Fuzzy matching is
* lookup-only: replacements always splice into the original content.
*/
function applyEdits(normalizedContent, edits, path) {
	const normalizedEdits = edits.map((edit) => ({
		oldText: normalizeToLF(edit.oldText),
		newText: normalizeToLF(edit.newText)
	}));
	for (const [i, edit] of normalizedEdits.entries()) if (edit.oldText.length === 0) throw getEmptyOldTextError(path, i, normalizedEdits.length);
	const fuzzyFile = normalizedEdits.some((edit) => !normalizedContent.includes(edit.oldText)) ? {
		text: normalizeForFuzzyMatch(normalizedContent),
		boundaries: void 0
	} : void 0;
	const matchedEdits = [];
	for (const [i, edit] of normalizedEdits.entries()) {
		const matchResult = fuzzyFindText(normalizedContent, edit.oldText, fuzzyFile);
		const occurrences = fuzzyFile && matchResult.usedFuzzyMatch ? countOccurrences(fuzzyFile.text, edit.oldText) : countExactOccurrences(normalizedContent, edit.oldText);
		if (occurrences > 1) throw getDuplicateError(path, i, normalizedEdits.length, occurrences);
		if (matchResult.unsafeBoundary) throw getUnsafeFuzzyBoundaryError(path, i, normalizedEdits.length);
		if (!matchResult.found) throw getNotFoundError(path, i, normalizedEdits.length, normalizedContent, edit.oldText);
		matchedEdits.push({
			editIndex: i,
			matchIndex: matchResult.index,
			matchLength: matchResult.matchLength,
			newText: edit.newText
		});
	}
	matchedEdits.sort((a, b) => a.matchIndex - b.matchIndex);
	for (let i = 1; i < matchedEdits.length; i++) {
		const previous = matchedEdits.at(i - 1);
		const current = matchedEdits.at(i);
		if (!previous || !current) continue;
		if (previous.matchIndex + previous.matchLength > current.matchIndex) throw new Error(`edits[${previous.editIndex}] and edits[${current.editIndex}] overlap in ${path}. Merge them into one edit or target disjoint regions.`);
	}
	return {
		baseContent: normalizedContent,
		newContent: applyReplacements(normalizedContent, matchedEdits),
		replacements: matchedEdits
	};
}
function validateNoOpEditTargets(normalizedContent, noOpEdits, realEdits, path) {
	if (noOpEdits.length > 0) applyEdits(normalizedContent, noOpEdits.map((edit) => ({
		oldText: edit.oldText,
		newText: ""
	})), path);
	const exactNoOpEdits = noOpEdits.filter((edit) => normalizedContent.includes(normalizeToLF(edit.oldText)));
	if (exactNoOpEdits.length > 0 && realEdits.length > 0) applyEdits(normalizedContent, [...exactNoOpEdits, ...realEdits].map((edit) => ({
		oldText: edit.oldText,
		newText: ""
	})), path);
}
function splitNoOpEdits(normalizedContent, edits, path) {
	const noOpEdits = [];
	const realEdits = [];
	for (const edit of edits) if (edit.oldText === edit.newText) {
		applyEdits(normalizedContent, [{
			oldText: edit.oldText,
			newText: ""
		}], path);
		noOpEdits.push(edit);
	} else realEdits.push(edit);
	return {
		noOpEdits,
		realEdits
	};
}
function prepareFileEdit(content, edits, path) {
	const { bom, text } = stripBom(content);
	const normalized = normalizeToLF(text);
	const { noOpEdits, realEdits } = splitNoOpEdits(normalized, edits, path);
	validateNoOpEditTargets(normalized, noOpEdits, realEdits, path);
	if (realEdits.length === 0) return {
		changed: false,
		message: `No changes made to ${path}. The replacement text is identical to the original.`
	};
	const { baseContent, newContent, replacements } = applyEdits(normalized, realEdits, path);
	if (baseContent === newContent) return {
		changed: false,
		message: `No changes made to ${path}. The replacement produced identical content.`
	};
	const finalContent = applyReplacementsPreservingLineEndings(text, baseContent, replacements);
	if (normalizeToLF(finalContent) !== newContent) throw new Error("Line-ending restoration changed the normalized edit result.");
	const receipt = prepareFileDiff(path, baseContent, newContent);
	if (!receipt) throw new Error("Unbounded edit diff did not produce a patch");
	return {
		changed: true,
		content: bom + finalContent,
		editCount: realEdits.length,
		receipt
	};
}
//#endregion
//#region src/agents/sessions/tools/file-tool-planning.worker.ts
function isEdit(value) {
	return isRecord(value) && typeof value.oldText === "string" && typeof value.newText === "string";
}
serveWorkerTasks((input) => {
	if (isRecord(input) && typeof input.path === "string" && typeof input.content === "string") {
		if (input.kind === "edit" && Array.isArray(input.edits) && input.edits.every(isEdit)) return {
			kind: "edit",
			plan: prepareFileEdit(input.content, input.edits, input.path)
		};
		if (input.kind === "write" && (input.beforeText === void 0 || typeof input.beforeText === "string") && (input.created === void 0 || typeof input.created === "boolean")) return {
			kind: "write",
			receipt: prepareFileWriteDiff({
				path: input.path,
				content: input.content,
				beforeText: input.beforeText,
				created: input.created
			})
		};
	}
	throw new Error("Invalid file-tool planning request");
});
//#endregion
export {};
