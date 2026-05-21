#!/usr/bin/env node
// One-shot SEO pass over lib/news.json + public/data/news.json:
// - Optimize title (45-65 chars, ends with «| ZOND» or «| Зонд-Реклама»)
// - Optimize excerpt (used as both listing card and meta description, target 140-170 chars)
// - Inject 1-2 internal links into content via [text](/url) markdown syntax
//   (renderer in app/news/[slug]/page.tsx interprets these)
// - Reports long content (>600 chars without subheadings) — owner decides about manual H2s
// Idempotent: dedups title suffix, skips link injection if already present.

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const NEWS_PATH = path.join(ROOT, "lib", "news.json");
const NEWS_MIRROR = path.join(ROOT, "public", "data", "news.json");

const SUFFIX = " | ZOND";
const TITLE_MIN = 45;
const TITLE_MAX = 65;
const EXCERPT_MIN = 140;
const EXCERPT_MAX = 170;

// Keyword → service URL. Order matters — first match wins.
// Patterns are case-insensitive, match Russian roots.
const LINK_RULES = [
  {
    pattern: /(гирлянд[а-я]*|иллюминаци[а-я]*|Лайтово|световых фигур|подсветк[а-я]*|новогодн[а-я]+ оформлен|LED-экран[а-я]*)/i,
    href: "/led",
    pickLabel: (m) => m,
  },
  {
    pattern: /(вывеск[а-я]*|лайтбокс[а-я]*|объёмн[а-я]+ букв[а-я]*|стел[а-я]+)/i,
    href: "/production",
    pickLabel: (m) => m,
  },
  {
    pattern: /(выставочн[а-я]+ стенд[а-я]*|выставочн[а-я]+ экспозиц[а-я]*|MAXIBIT)/i,
    href: "/exhibition",
    pickLabel: (m) => m,
  },
  {
    pattern: /(широкоформатн[а-я]+ печат[а-я]+|интерьерн[а-я]+ печат[а-я]+|печат[а-я]+ баннер[а-я]*|печат[а-я]+ визит[а-я]*)/i,
    href: "/print",
    pickLabel: (m) => m,
  },
  {
    pattern: /(дизайн логотип[а-я]*|логотип[а-я]+ компани[а-я]*|брендбук[а-я]*|фирменн[а-я]+ стил[а-я]+)/i,
    href: "/design",
    pickLabel: (m) => m,
  },
  {
    pattern: /(наружн[а-я]+ реклам[а-я]+|цифров[а-я]+ билборд[а-я]*|digital-?билборд[а-я]*|суперсайт[а-я]*|сити-?формат[а-я]*|пилон[а-я]*)/i,
    href: "/outdoor",
    pickLabel: (m) => m,
  },
];

function optimizeTitle(rawTitle) {
  let title = rawTitle.trim();
  // Strip an existing trailing «| ZOND» / «| Зонд-Реклама» before re-adding.
  title = title.replace(/\s*[|·—-]\s*(ZOND|Зонд-?Реклама).*$/i, "").trim();

  // Target length: try title + suffix, trim title if combined > MAX.
  const room = TITLE_MAX - SUFFIX.length;
  if (title.length > room) {
    // Trim at word boundary
    title = title.slice(0, room).replace(/[\s.,;:—]+\S*$/, "").trim();
    // Add ellipsis only if we actually cut a word; otherwise leave clean
  }

  const final = `${title}${SUFFIX}`;
  return final;
}

function firstSentences(text, maxLen) {
  // Split text into sentence-ish chunks at . ! ? + space.
  const sentences = text.replace(/\n+/g, " ").trim().split(/(?<=[.!?])\s+/);
  let out = "";
  for (const s of sentences) {
    if (!out) {
      out = s;
    } else if ((out + " " + s).length <= maxLen) {
      out = out + " " + s;
    } else {
      break;
    }
  }
  return out.trim();
}

function optimizeExcerpt(item) {
  let excerpt = (item.excerpt || "").trim();
  // If too short, rebuild from content first sentences.
  if (excerpt.length < EXCERPT_MIN) {
    const rebuilt = firstSentences(item.content || "", EXCERPT_MAX);
    if (rebuilt.length > excerpt.length) excerpt = rebuilt;
  }
  // If still too long, truncate at word boundary.
  if (excerpt.length > EXCERPT_MAX) {
    excerpt = excerpt
      .slice(0, EXCERPT_MAX - 1)
      .replace(/[\s.,;:—-]+\S*$/, "")
      .trim();
    if (!/[.!?]$/.test(excerpt)) excerpt += "…";
  }
  return excerpt;
}

function injectInternalLinks(content) {
  // Don't add links to content that already contains markdown links.
  if (/\[[^\]]+\]\(\/[^)]+\)/.test(content)) {
    return { content, added: 0 };
  }
  let modified = content;
  const usedHrefs = new Set();
  let added = 0;
  // Up to 2 distinct service links per article.
  for (const rule of LINK_RULES) {
    if (added >= 2) break;
    if (usedHrefs.has(rule.href)) continue;
    const match = modified.match(rule.pattern);
    if (!match) continue;
    const phrase = match[0];
    // Replace only the first occurrence of the matched phrase.
    const idx = modified.indexOf(phrase);
    if (idx < 0) continue;
    modified = modified.slice(0, idx) + `[${phrase}](${rule.href})` + modified.slice(idx + phrase.length);
    usedHrefs.add(rule.href);
    added++;
  }
  return { content: modified, added };
}

// ---- RUN ----

const news = JSON.parse(fs.readFileSync(NEWS_PATH, "utf-8"));

const stats = {
  total: news.length,
  titleChanged: 0,
  excerptChanged: 0,
  linksInjected: 0,
  longContent: [],
  emptyZones: [],
};

const before = news.map((n) => ({ ...n }));

for (let i = 0; i < news.length; i++) {
  const item = news[i];

  // A. Title
  const newTitle = optimizeTitle(item.title);
  if (newTitle !== item.title) {
    stats.titleChanged++;
    item.title = newTitle;
  }

  // B/C. Excerpt (used as both listing card and meta description)
  const newExcerpt = optimizeExcerpt(item);
  if (newExcerpt !== item.excerpt) {
    stats.excerptChanged++;
    item.excerpt = newExcerpt;
  }

  // D. Internal links in content
  const { content: linkedContent, added } = injectInternalLinks(item.content || "");
  if (added > 0) {
    item.content = linkedContent;
    stats.linksInjected += added;
  }

  // F. Track long content for manual H2 review
  const plainLen = (item.content || "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").length;
  if (plainLen > 600 && !/^## /m.test(item.content || "")) {
    stats.longContent.push({ slug: item.slug, len: plainLen });
  }

  // Empty zones detection
  const empty = [];
  if (!item.image) empty.push("image");
  if (!item.date) empty.push("date");
  if (!item.content || item.content.length < 50) empty.push("content");
  if (empty.length) {
    stats.emptyZones.push({ slug: item.slug, missing: empty });
  }
}

// Write both copies
fs.writeFileSync(NEWS_PATH, JSON.stringify(news, null, 2) + "\n", "utf-8");
fs.writeFileSync(NEWS_MIRROR, JSON.stringify(news, null, 2) + "\n", "utf-8");

// Compute length stats
const titleLens = news.map((n) => n.title.length);
const excerptLens = news.map((n) => n.excerpt.length);
const stat = (arr) => ({
  min: Math.min(...arr),
  max: Math.max(...arr),
  avg: Math.round(arr.reduce((a, b) => a + b, 0) / arr.length),
});

console.log("\n=== News SEO Pass Summary ===\n");
console.log(`Total items: ${stats.total}`);
console.log(`Title changed: ${stats.titleChanged}`);
console.log(`Excerpt changed: ${stats.excerptChanged}`);
console.log(`Internal links injected: ${stats.linksInjected}`);
console.log(`\nTitle length:   ${JSON.stringify(stat(titleLens))}`);
console.log(`Excerpt length: ${JSON.stringify(stat(excerptLens))}`);

if (stats.longContent.length) {
  console.log(`\nLong content (>600 chars, no H2) — candidates for manual subheadings:`);
  for (const c of stats.longContent) console.log(`  · ${c.slug} (${c.len} chars)`);
}

if (stats.emptyZones.length) {
  console.log(`\nEmpty zones:`);
  for (const e of stats.emptyZones) console.log(`  · ${e.slug}: missing ${e.missing.join(", ")}`);
} else {
  console.log(`\nNo empty zones — все 26 новостей имеют image/date/content.`);
}

// Show 3 before/after examples (varied types)
console.log("\n=== 3 before/after examples ===");
const samples = ["robocup-2026", "billboard-052-update", "rusification-2026"];
for (const slug of samples) {
  const a = before.find((n) => n.slug === slug);
  const b = news.find((n) => n.slug === slug);
  if (!a || !b) continue;
  console.log(`\n--- ${slug} ---`);
  console.log(`title  BEFORE: ${a.title}`);
  console.log(`title  AFTER:  ${b.title}`);
  console.log(`excerpt BEFORE (${a.excerpt.length}): ${a.excerpt}`);
  console.log(`excerpt AFTER  (${b.excerpt.length}): ${b.excerpt}`);
  if (a.content !== b.content) {
    console.log(`content: links injected`);
    const links = [...b.content.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)];
    for (const l of links) console.log(`  · [${l[1]}](${l[2]})`);
  }
}
