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
 * Скрипт идемпотентный: повторный запуск почти ничего не меняет (файл
 * перезаписывается, только если стал заметно легче), так что его безопасно
 * прогнать ещё раз — в том числе чтобы дожать то, что не получилось в прошлый.
 *
 * На Windows файловые операции иногда срываются с «UNKNOWN» — антивирус или
 * файловый фильтр перехватывает открытие файла. Поэтому: по умолчанию один
 * поток и до пяти попыток на каждую операцию с нарастающей паузой. Медленнее,
 * зато доходит до конца. Список того, что всё-таки не поддалось, пишется в
 * scripts/.compress-failed.txt — следующий запуск с --only-failed возьмёт
 * только эти файлы.
 *
 * Запуск:
 *   node scripts/compress-images.mjs --dry               # только посчитать
 *   node scripts/compress-images.mjs --max=1280 --q=80   # переписать файлы
 *   node scripts/compress-images.mjs --only-failed       # добить неудачные
 *   node scripts/compress-images.mjs --jobs=4            # быстрее, если ОС даёт
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

sharp.cache(false); // не держать файлы в кэше libvips — мы их тут же перезаписываем

const ROOT = "public/images";
const FAILED_LIST = "scripts/.compress-failed.txt";
const args = process.argv.slice(2);
const DRY = args.includes("--dry");
const ONLY_FAILED = args.includes("--only-failed");
const MAX = Number(args.find((a) => a.startsWith("--max="))?.slice(6) || 1280);
const QUALITY = Number(args.find((a) => a.startsWith("--q="))?.slice(4) || 80);
// Один поток по умолчанию: параллельное чтение сотен файлов — как раз то, на
// чём спотыкается антивирус. Скорость тут не важна, скрипт разовый.
const JOBS = Number(args.find((a) => a.startsWith("--jobs="))?.slice(7) || 1);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Повторяет файловую операцию: временные сбои ФС на Windows — не приговор. */
async function retry(label, fn) {
  let last;
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      return fn();
    } catch (e) {
      last = e;
      if (attempt < 5) await sleep(150 * 2 ** (attempt - 1)); // 150→300→600→1200 мс
    }
  }
  throw new Error(`${label}: ${last.code || ""} ${last.message}`);
}

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (/\.(jpe?g|png)$/i.test(e.name)) acc.push(p);
  }
  return acc;
}

async function process1(file) {
  // Читаем файл в память и отдаём sharp буфер, а не путь. На Windows sharp
  // держит исходник открытым, и перезапись того же файла падает с EPERM —
  // через буфер этой связи нет.
  const input = await retry("чтение", () => fs.readFileSync(file));
  const before = input.length;
  const isPng = /\.png$/i.test(file);
  let pipeline = sharp(input)
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
  if (!DRY && win) await retry("запись", () => fs.writeFileSync(file, buf));
  return { file, before, after: win ? buf.length : before, skipped: !win };
}

let files;
if (ONLY_FAILED) {
  if (!fs.existsSync(FAILED_LIST)) {
    console.error(`Нет файла ${FAILED_LIST} — нечего добивать.`);
    process.exit(1);
  }
  files = fs.readFileSync(FAILED_LIST, "utf8").split(/\r?\n/).filter(Boolean).filter(fs.existsSync);
  console.log(`Повторный проход по ${files.length} файлам из прошлого запуска.\n`);
} else {
  files = walk(ROOT);
}

let idx = 0, done = 0, before = 0, after = 0, skipped = 0;
const heaviest = [];
const failed = [];

async function worker() {
  while (idx < files.length) {
    const f = files[idx++];
    try {
      const r = await process1(f);
      before += r.before; after += r.after;
      if (r.skipped) skipped++;
      heaviest.push({ f: r.file, kb: Math.round(r.after / 1024) });
    } catch (e) {
      failed.push(f);
      if (failed.length <= 10) console.error("НЕ ВЫШЛО", f, "—", e.message);
    }
    if (++done % 100 === 0) process.stderr.write(`  ${done}/${files.length}\n`);
  }
}
await Promise.all(Array.from({ length: Math.max(1, JOBS) }, worker));

const MB = (b) => (b / 1048576).toFixed(1);
const ok = files.length - failed.length;
console.log(`\nmax=${MAX}px  quality=${QUALITY}  потоков=${JOBS}${DRY ? "  (пробный прогон, файлы не тронуты)" : ""}`);
console.log(`обработано: ${ok} из ${files.length} (уже были оптимальны: ${skipped})`);
if (ok > 0) {
  console.log(`было:       ${MB(before)} МБ`);
  console.log(`стало:      ${MB(after)} МБ  (−${Math.round((1 - after / before) * 100)}%)`);
  console.log(`средний:    ${Math.round(after / ok / 1024)} КБ`);
}

if (failed.length) {
  fs.writeFileSync(FAILED_LIST, failed.join("\n") + "\n");
  console.log(`\nНЕ ПОДДАЛОСЬ: ${failed.length} файлов${failed.length > 10 ? " (первые 10 выше)" : ""}.`);
  console.log(`Список записан в ${FAILED_LIST}.`);
  console.log(`Повтори: node scripts/compress-images.mjs --only-failed`);
  process.exitCode = 1;
} else {
  if (fs.existsSync(FAILED_LIST)) fs.unlinkSync(FAILED_LIST);
  console.log(`\nВсе файлы обработаны, ни одной ошибки.`);
  heaviest.sort((a, b) => b.kb - a.kb);
  console.log(`самые тяжёлые после сжатия:`);
  for (const h of heaviest.slice(0, 5)) console.log(`  ${h.kb} КБ  ${h.f}`);
}
