// One-off, idempotent migration: make `id` unique in public/data/sides.json.
//
// Problem: 153 constructions store both sides as bare `id === construction`
// (side "A"/"B"), so 306 rows collide on `id`. That breaks per-side links
// /outdoor/<id> (one side shadows the other in findSide()).
//
// Fix: ONLY for those collision rows (id === construction) set
//   id = construction + side  (Latin, e.g. "118A" / "118B").
// Already-unique conventions are left untouched:
//   A. Cyrillic per-side ids   — "244А1"
//   B. Latin-folded ids        — "111B1" (side "В1")
//
// Idempotent: rows that already satisfy id !== construction are skipped, so
// re-running changes nothing. Run: node scripts/dedupe-sides-id.js

const fs = require("fs");
const path = require("path");

const SIDES_PATH = path.join(__dirname, "..", "public", "data", "sides.json");

const raw = fs.readFileSync(SIDES_PATH, "utf8");
const sides = JSON.parse(raw);
if (!Array.isArray(sides)) {
  throw new Error("Expected sides.json to be an array");
}

let changed = 0;
const before = sides.map((s) => s.id);

// A row is a collision ONLY if its id is shared by another row. All such rows
// are the bare A/B pairs (id === construction). We deliberately do NOT touch
// bare-but-unique ids (e.g. mixed construction "114" whose lone B side has a
// unique id "114") — renaming those would change which side /outdoor/114
// resolves to under the new construction fallback.
const counts = new Map();
for (const s of sides) counts.set(s.id, (counts.get(s.id) || 0) + 1);

for (const s of sides) {
  if (counts.get(s.id) > 1 && s.id === s.construction) {
    const next = `${s.construction}${s.side}`; // e.g. "118" + "B" -> "118B"
    if (next !== s.id) {
      s.id = next;
      changed += 1;
    }
  }
}

// --- Validation: 0 duplicates, 726 unique ids ---
const ids = sides.map((s) => s.id);
const seen = new Map();
for (const id of ids) seen.set(id, (seen.get(id) || 0) + 1);
const dups = [...seen.entries()].filter(([, n]) => n > 1);

console.log(`Rows total:        ${sides.length}`);
console.log(`Ids changed:       ${changed}`);
console.log(`Unique ids:        ${seen.size}`);
console.log(`Duplicate ids:     ${dups.length}`);
if (dups.length) {
  console.error("FAILED — still duplicated:", dups.slice(0, 10));
  process.exit(1);
}
if (seen.size !== sides.length) {
  console.error("FAILED — unique id count != row count");
  process.exit(1);
}

// Only write when something actually changed (keeps the script a no-op on re-run).
// Preserve the file's existing shape (2-space indent, original trailing-newline
// state) so the diff is limited to the changed `id` lines.
if (changed > 0) {
  const trailing = raw.endsWith("\n") ? "\n" : "";
  fs.writeFileSync(SIDES_PATH, JSON.stringify(sides, null, 2) + trailing, "utf8");
  console.log("\nWrote", SIDES_PATH);
  const sample = sides
    .filter((s, i) => before[i] !== s.id)
    .slice(0, 6)
    .map((s) => `${s.construction}/${s.side} -> ${s.id}`);
  console.log("Sample changes:", sample);
} else {
  console.log("\nNo changes needed — already unique. (no-op)");
}
