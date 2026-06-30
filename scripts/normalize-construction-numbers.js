// One-shot, idempotent migration: убрать ведущие нули в номерах конструкций.
//
// Проблема: одна физическая конструкция разнесена на два номера — A-стороны
// под зеропадным ("009","028"), B-сторона под голым ("9","28"). Из-за этого на
// карте два маркера и расходятся ссылки.
//
// Канон — БЕЗ ведущих нулей (большинство конструкций в файле уже такие).
// Для всех строк, чей номер встречается в зеропадном виде (15 пар + 10
// одиночных), нормализуем:
//   construction -> String(parseInt(construction,10))   (009 -> 9)
//   id           -> construction + side                 (009А1 -> 9А1, 9 -> 9B)
//   address      -> один (самый полный = самый длинный) адрес на конструкцию
// Остальные конструкции (уже голые) не трогаем.
//
// Идемпотентно: после первого прогона зеропадных номеров нет → повтор = no-op.
// Запуск: node scripts/normalize-construction-numbers.js

const fs = require("fs");
const path = require("path");

const SIDES_PATH = path.join(__dirname, "..", "public", "data", "sides.json");
const raw = fs.readFileSync(SIDES_PATH, "utf8");
const sides = JSON.parse(raw);
if (!Array.isArray(sides)) throw new Error("sides.json должен быть массивом");

// Числовые значения номеров, которые хоть раз встречаются с ведущим нулём.
const affected = new Set();
for (const s of sides) {
  if (/^0\d+$/.test(s.construction)) affected.add(parseInt(s.construction, 10));
}

let constructionChanged = 0;
let idChanged = 0;
let addressChanged = 0;

// 1) Нормализуем номер и id у затронутых строк.
for (const s of sides) {
  if (!affected.has(parseInt(s.construction, 10))) continue;
  const nextConstruction = String(parseInt(s.construction, 10));
  if (nextConstruction !== s.construction) {
    s.construction = nextConstruction;
    constructionChanged += 1;
  }
  const nextId = `${s.construction}${s.side}`;
  if (nextId !== s.id) {
    s.id = nextId;
    idChanged += 1;
  }
}

// 2) Один ЧИСТЫЙ адрес на затронутую конструкцию (не самый длинный):
//   - вариант без префикса «Digital» (тип уже есть в поле type);
//   - чиним «/ (» → «(», «( пл.» → «(пл.», двойные пробелы;
//   - при прочих равных — более полный (с указанием места в скобках).
// Очистку (Digital/пробелы) применяем ко всем затронутым конструкциям;
// выбор между разными вариантами — только когда у сторон РАЗНЫЕ адреса.
const cleanAddr = (s) =>
  s
    .replace(/^\s*Digital\s+/i, "")
    .replace(/\s*\/\s*\(/g, " (")
    .replace(/\(\s+/g, "(")
    .replace(/\s{2,}/g, " ")
    .trim();

function pickAddress(variants) {
  const nonDigital = variants.filter((v) => !/^\s*Digital\s+/i.test(v));
  let pool = nonDigital.length ? nonDigital : variants;
  const withParen = pool.filter((v) => v.includes("("));
  if (withParen.length) pool = withParen;
  pool = [...pool].sort((a, b) => b.length - a.length); // более полный
  return cleanAddr(pool[0]);
}

for (const num of affected) {
  const rows = sides.filter((s) => parseInt(s.construction, 10) === num);
  const best = pickAddress([...new Set(rows.map((r) => r.address))]);
  for (const s of rows) {
    if (s.address !== best) {
      s.address = best;
      addressChanged += 1;
    }
  }
}

// --- Валидация ---
const ids = sides.map((s) => s.id);
const dupIds = ids.filter((v, i) => ids.indexOf(v) !== i);
const byNum = {};
for (const s of sides) {
  const n = parseInt(s.construction, 10);
  (byNum[n] = byNum[n] || new Set()).add(s.construction);
}
const numDupes = Object.entries(byNum).filter(([, set]) => set.size > 1);

console.log(`Затронутые номера:   ${affected.size}`);
console.log(`construction правок: ${constructionChanged}`);
console.log(`id правок:           ${idChanged}`);
console.log(`address правок:      ${addressChanged}`);
console.log(`Сторон всего:        ${sides.length}`);
console.log(`Уникальных id:       ${new Set(ids).size}  | дублей id: ${[...new Set(dupIds)].length}`);
console.log(`Номеров с >1 строкой construction (дубль по нормализации): ${numDupes.length}`);

if ([...new Set(dupIds)].length || numDupes.length || sides.length !== 726) {
  console.error("FAILED — нарушены инварианты");
  if (numDupes.length) console.error("  num dupes:", numDupes.map(([n, set]) => `${n}:${[...set]}`));
  process.exit(1);
}

if (constructionChanged || idChanged || addressChanged) {
  const trailing = raw.endsWith("\n") ? "\n" : "";
  fs.writeFileSync(SIDES_PATH, JSON.stringify(sides, null, 2) + trailing, "utf8");
  console.log("\nЗаписан", SIDES_PATH);
} else {
  console.log("\nИзменений нет — уже нормализовано. (no-op)");
}
