#!/usr/bin/env node
// One-shot in-place compression for /public/images.
// Re-runs safely — only overwrites if the new buffer is actually smaller.

import sharp from "sharp";
import { readdirSync, statSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";

const ROOT = "public/images";
const MAX_WIDTH = 1920;
const QUALITY_JPG = 82;
const QUALITY_PNG = 85;

let before = 0;
let after = 0;
let processed = 0;
let skipped = 0;
let errors = 0;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function processFile(file, attempt = 1) {
  const ext = file.split(".").pop().toLowerCase();
  if (!["jpg", "jpeg", "png"].includes(ext)) return;

  const stat = statSync(file);
  if (attempt === 1) before += stat.size;

  try {
    // Read into buffer first to avoid sharp holding a file lock during pipeline.
    const { readFile } = await import("node:fs/promises");
    const inputBuf = await readFile(file);
    const img = sharp(inputBuf, { failOn: "none" });
    const meta = await img.metadata();
    let pipeline = img;

    if (meta.width && meta.width > MAX_WIDTH) {
      pipeline = pipeline.resize(MAX_WIDTH, null, { withoutEnlargement: true });
    }

    if (ext === "png") {
      pipeline = pipeline.png({
        quality: QUALITY_PNG,
        compressionLevel: 9,
        palette: true,
      });
    } else {
      pipeline = pipeline.jpeg({
        quality: QUALITY_JPG,
        progressive: true,
        mozjpeg: true,
      });
    }

    pipeline = pipeline.withMetadata({ orientation: meta.orientation });

    const buffer = await pipeline.toBuffer();

    if (buffer.length < stat.size * 0.95) {
      // Save only if at least 5% smaller — avoid churning already-tight files.
      await writeFile(file, buffer);
      after += buffer.length;
      processed++;
      const fromKb = Math.round(stat.size / 1024);
      const toKb = Math.round(buffer.length / 1024);
      if (fromKb > 500) {
        console.log(`OK ${file}: ${fromKb} → ${toKb} КБ`);
      }
    } else {
      after += stat.size;
      skipped++;
    }
  } catch (e) {
    if (attempt < 3) {
      await sleep(200 * attempt);
      return processFile(file, attempt + 1);
    }
    errors++;
    after += stat.size;
    console.warn(`ERR ${file}: ${e.message}`);
  }
}

async function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const st = statSync(path);
    if (st.isDirectory()) await walk(path);
    else await processFile(path);
  }
}

console.log(`Compressing ${ROOT} (max width ${MAX_WIDTH}, jpeg q${QUALITY_JPG}, png q${QUALITY_PNG})…\n`);
await walk(ROOT);

console.log("\n=== Summary ===");
console.log(`Processed (rewritten): ${processed}`);
console.log(`Skipped (already optimal): ${skipped}`);
console.log(`Errors: ${errors}`);
console.log(`Total before: ${(before / 1024 / 1024).toFixed(1)} МБ`);
console.log(`Total after:  ${(after / 1024 / 1024).toFixed(1)} МБ`);
const saved = before - after;
const pct = before > 0 ? Math.round((saved / before) * 100) : 0;
console.log(`Saved:        ${(saved / 1024 / 1024).toFixed(1)} МБ (${pct}%)`);
