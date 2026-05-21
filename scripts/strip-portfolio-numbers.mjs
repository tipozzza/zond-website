#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";

const path = "data/portfolio.json";
const data = JSON.parse(readFileSync(path, "utf-8"));

let changed = 0;
for (const cat of Object.values(data)) {
  for (const item of cat.items) {
    const before = item.title;
    item.title = item.title
      .replace(/\s*[-—–]?\s*№\s*\d{1,3}\s*$/u, "")
      .replace(/\s+№\s*\d{1,3}\s+/u, " ")
      .trim();
    if (before !== item.title) {
      changed++;
      console.log(`${before} → ${item.title}`);
    }
  }
}

writeFileSync(path, JSON.stringify(data, null, 2) + "\n", "utf-8");
console.log(`\nИтого: ${changed} title обновлено`);

console.log("\n=== Дубли после очистки ===");
for (const [key, cat] of Object.entries(data)) {
  const titles = cat.items.map((i) => i.title);
  const dups = titles.filter((t, i) => titles.indexOf(t) !== i);
  const uniqueDups = [...new Set(dups)];
  console.log(`${key}: ${titles.length} items, ${dups.length} дубли${uniqueDups.length ? " — " + uniqueDups.join(" | ") : ""}`);
}
