/**
 * Разовое пережатие всех картинок в public/images.
 *
 * Зачем: сервер на Timeweb — одно ядро. Пока Next оптимизировал картинки на
 * лету, галерея висела серой по 2–4 секунды, потому что ядро кодировало WebP
 * в момент запроса, а кэш оптимизатора стирался при каждом деплое.
 * Решение: один раз привести исходники к разумному размеру и отдавать их
 * статикой (next.config.ts → images.unoptimized), чтобы сервер не считал вообще.
 *
 * Имена и расширения файлов НЕ меняются — ни одна ссылка в коде и в JSON
 * (lib/news.json, data/portfolio.json, public/data/sides.json …) не ломается.
 *
 * Скрипт идемпотентный: повторный запуск с теми же параметрами почти ничего
 * не меняет (файл перезаписывается, только если стал легче), так что его
 * безопасно прогнать ещё раз после большой партии загрузок из админки.
 *
 * Запуск:
 *   node scripts/compress-images.mjs --dry              # только посчитать
 *   node scripts/compress-images.mjs --max=1280 --q=80  # переписать файлы
 */
import fs from "node:fs";
import path from "node:path";

let sharp;
try {
  sharp = (await import("sharp")).default;
} catch {
  console.error(
    "Не найден пакет sharp. Обычно он приезжает вместе с Next; если его нет —\n" +
      "выполни `npm i -D sharp` и запусти скрипт снова.",
  );
  process.exit(1);
}

const ROOT = "public/images";
const args = process.argv.slice(2);
const DRY = args.includes("--dry");
const MAX = Number(args.find((a) => a.startsWith("--max="))?.slice(6) || 1280);
const QUALITY = Number(args.find((a) => a.startsWith("--q="))?.slice(4) || 80);

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (/\.(jpe?g|png)$/i.test(e.name)) acc.push(p);
  }
  return acc;
}

async function process1(file) {
  const before = fs.statSync(file).size;
  const isPng = /\.png$/i.test(file);
  let pipeline = sharp(file)
    .rotate() // выправить ориентацию по EXIF до ресайза (фото с телефонов)
    .resize({ width: MAX, height: MAX, fit: "inside", withoutEnlargement: true });

  // PNG жмём без палитры: квантование до 256 цветов давало на наших файлах
  // выигрыш в 1–2 % и при этом полосило градиенты. Фотографии, ошибочно
  // сохранённые в PNG, переведены в JPEG отдельно (см. историю коммитов).
  pipeline = isPng
    ? pipeline.png({ compressionLevel: 9 })
    : pipeline.jpeg({ quality: QUALITY, mozjpeg: true, progressive: true });

  const buf = await pipeline.toBuffer();
  // Пишем, только если выигрыш ощутимый: иначе повторный запуск переписывал бы
  // все 600+ файлов ради экономии в байты и раздувал коммит на пустом месте.
  const win = buf.length < before * 0.97 || before - buf.length > 10 * 1024;
  if (!DRY && win) fs.writeFileSync(file, buf);
  return { file, before, after: win ? buf.length : before, skipped: !win };
}

const files = walk(ROOT);
const CONCURRENCY = 4;
let idx = 0, done = 0, before = 0, after = 0, skipped = 0;
const heaviest = [];

async function worker() {
  while (idx < files.length) {
    const f = files[idx++];
    try {
      const r = await process1(f);
      before += r.before; after += r.after;
      if (r.skipped) skipped++;
      heaviest.push({ f: r.file, kb: Math.round(r.after / 1024) });
    } catch (e) {
      console.error("ОШИБКА", f, e.message);
    }
    if (++done % 100 === 0) process.stderr.write(`  ${done}/${files.length}\n`);
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));

const MB = (b) => (b / 1048576).toFixed(1);
console.log(`\nmax=${MAX}px  quality=${QUALITY}${DRY ? "  (пробный прогон, файлы не тронуты)" : ""}`);
console.log(`файлов:      ${files.length} (из них уже оптимальны: ${skipped})`);
console.log(`было:        ${MB(before)} МБ`);
console.log(`стало:       ${MB(after)} МБ  (−${Math.round((1 - after / before) * 100)}%)`);
console.log(`средний:     ${Math.round(after / files.length / 1024)} КБ`);
heaviest.sort((a, b) => b.kb - a.kb);
console.log(`самые тяжёлые после сжатия:`);
for (const h of heaviest.slice(0, 5)) console.log(`  ${h.kb} КБ  ${h.f}`);
