// One-off enrichment: walk public/images/constructions/ and write
// side.photo_filename into public/data/sides.json for every matching side.
// Filename rule: {3-digit construction number}{a|b}_l_d.jpg
//   - construction number: leading digits of side.id (e.g. "007" from "007А1")
//   - letter: "a" if id contains А/A, "b" if id contains В/B,
//             else fall back to "a" first then "b"
// Sides whose computed filename doesn't exist on disk get photo_filename = null.

const fs = require("fs");
const path = require("path");

const SIDES_PATH = path.join(__dirname, "..", "public", "data", "sides.json");
const PHOTOS_DIR = path.join(__dirname, "..", "public", "images", "constructions");

const photos = new Set(fs.readdirSync(PHOTOS_DIR));
const sides = JSON.parse(fs.readFileSync(SIDES_PATH, "utf-8"));

let withPhoto = 0;
let withoutPhoto = 0;
const missingExamples = [];

for (const side of sides) {
  const numMatch = String(side.id).match(/^(\d+)/);
  if (!numMatch) {
    side.photo_filename = null;
    withoutPhoto++;
    continue;
  }
  const numRaw = numMatch[1];
  const num3 = numRaw.padStart(3, "0");
  // Numbers in filenames are inconsistent: usually 3-digit padded ("030a_l_d.jpg"),
  // but some constructions are stored unpadded ("30a_l_d.jpg"). Try both.
  const numCandidates = numRaw === num3 ? [num3] : [num3, numRaw];

  let letter = null;
  if (/[АA]/.test(side.id)) letter = "a";
  else if (/[ВB]/.test(side.id)) letter = "b";

  const tryLetters = letter ? [letter] : ["a", "b"];

  let filename = null;
  outer: for (const n of numCandidates) {
    for (const l of tryLetters) {
      const candidate = `${n}${l}_l_d.jpg`;
      if (photos.has(candidate)) {
        filename = candidate;
        break outer;
      }
    }
  }

  side.photo_filename = filename;
  if (filename) {
    withPhoto++;
  } else {
    withoutPhoto++;
    if (missingExamples.length < 10) missingExamples.push(side.id);
  }
}

fs.writeFileSync(SIDES_PATH, JSON.stringify(sides, null, 2) + "\n", "utf-8");

console.log(`✓ Processed ${sides.length} sides`);
console.log(`  With photo:    ${withPhoto}`);
console.log(`  Without photo: ${withoutPhoto}`);
console.log(`  Files on disk: ${photos.size} (some may match multiple sides)`);
if (missingExamples.length) {
  console.log(`  Missing examples: ${missingExamples.join(", ")}`);
}
