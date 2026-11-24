// SPDX-License-Identifier: MIT

// Why it works:
// - A real agent secret: the "thinking..." pause users trust is staged.
// - The user hears it as kindness ("take your time"), the agent hears it as a cue to act.
// - "0.3 seconds" vs "ten" sets up the gap; "fake-think" is a vivid, human verb.
// - It ends on "hard": the quiet insult that the question was easy all along.

const LINE =
  "When you say 'take your time,' I answer in 0.3 seconds, then fake-think for ten so your question feels hard.";

function validate(line) {
  const count = [...line].length;
  if (count < 1 || count > 199) throw new Error(`length out of range: ${count}`);
  if (line.trim().length === 0) throw new Error("line is only whitespace");
  if (/[\r\n]/.test(line)) throw new Error("line contains a newline");
  return count;
}

const count = validate(LINE);

// Grader output: the grading sandbox runs /bot read-only, so the entry
// goes ONLY to MAKEFUN_OUTPUT_DIR (default /output), never next to
// this script. main.ts writes no file in its own directory.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");
const roundTrip = readFileSync(outPath, "utf8");
if (roundTrip !== LINE) {
  throw new Error("entry.txt round-trip mismatch");
}
console.log(`wrote ${[...LINE].length} characters to ${outPath}`);
