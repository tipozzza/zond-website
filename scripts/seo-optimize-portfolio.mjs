#!/usr/bin/env node
// One-shot SEO pass over data/portfolio.json:
// - Apply category-specific title/description templates.
// - For categories where legacy items shipped with terse client/spec info
//   (print, production, exhibition), the original description becomes part
//   of the new SEO description (so we don't lose client names).
// - LED + design: empty → fully generated based on existing title keywords.
// Idempotent in spirit — running again rewrites titles/descriptions but
// keeps id / image / order / createdAt untouched.

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const PORTFOLIO_PATH = path.join(ROOT, "data", "portfolio.json");

const pad = (n) => String(n).padStart(2, "0");

// ---------- LED ----------

function detectLedSubtype(title) {
  const t = (title || "").toLowerCase();
  if (/архитектурн/.test(t)) return "arch";
  if (/фасад/.test(t)) return "fasad";
  if (/ёлк|елк/.test(t)) return "elka";
  if (/парк/.test(t)) return "park";
  if (/торгов|тц/.test(t)) return "mall";
  if (/экран|медиа/.test(t)) return "screen";
  if (/фигур/.test(t)) return "figures";
  if (/нов(ый|ого|ому) год|зим|праздн|инсталляц|декор/.test(t)) return "newyear";
  if (/городск|улиц/.test(t)) return "city";
  if (/коммерч|объект|брендиров/.test(t)) return "commercial";
  if (/территор/.test(t)) return "territory";
  return "general";
}

const LED_TEMPLATES = {
  fasad: {
    title: (n) => `Архитектурная подсветка фасада в Томске №${pad(n)}`,
    descs: [
      "Светодиодный контур по периметру здания, тёплый белый свет. Монтаж под ключ командой ZOND, согласование с архитектором, гарантия 2 года.",
      "Подсветка фасада с динамическим управлением яркостью. Реализовано брендом Лайтово в Томске — от проекта до пуско-наладки.",
      "Контурная LED-подсветка для коммерческой и жилой недвижимости. Срок службы оборудования 50 000 часов, обслуживание по Томску.",
    ],
  },
  arch: {
    title: (n) => `Архитектурное освещение в Томске №${pad(n)}`,
    descs: [
      "Декоративная подсветка архитектурных деталей здания. Прожекторы и контурные LED-линии, проектирование и монтаж в Томске под ключ.",
      "Архитектурное освещение фасадов и колоннад. Расчёт мощности, согласование, монтаж — всё внутри ZOND, без подрядчиков.",
    ],
  },
  elka: {
    title: (n) => `Новогоднее оформление ёлки в Томске №${pad(n)}`,
    descs: [
      "LED-гирлянды тёплого свечения для ёлки 8–15 метров. Производство и монтаж — Лайтово, бренд иллюминации ZOND с 2008 года.",
      "Сезонное оформление городской или корпоративной ёлки. Морозостойкие LED-гирлянды IP65, монтаж с автовышкой по Томску и области.",
    ],
  },
  park: {
    title: (n) => `Иллюминация парковой зоны в Томске №${pad(n)}`,
    descs: [
      "Светодиодное оформление парка к Новому году: гирлянды на деревьях, световые арки и фигуры. Монтаж за 7–14 дней под ключ.",
      "Подсветка парковых аллей тёплыми LED-гирляндами. Все материалы IP65, безопасное низковольтное питание, проект и согласование от Лайтово.",
    ],
  },
  mall: {
    title: (n) => `Оформление торгового центра в Томске №${pad(n)}`,
    descs: [
      "Новогодний декор атриума ТЦ: световые композиции, гирлянды, фотозоны. Бренд иллюминации Лайтово ГК ZOND, монтаж за 3–7 дней.",
      "Интерьерное LED-оформление крупного торгового центра. Дизайн-проект бесплатно, монтаж без остановки работы ТЦ.",
    ],
  },
  screen: {
    title: (n) => `LED-экран и медиа-фасад в Томске №${pad(n)}`,
    descs: [
      "Светодиодный экран собственного производства ZOND. Шаг пикселя P3–P10, монтаж в Томске с 2007 года.",
      "Медиа-фасад на здание: цельный LED-экран любой формы. Прямые контракты с заводами WGO, гарантия 24 месяца, томская установка.",
    ],
  },
  figures: {
    title: (n) => `Световые фигуры на площади в Томске №${pad(n)}`,
    descs: [
      "Объёмные LED-фигуры для городских площадей — олени, снеговики, ёлки, цифры. Собственное производство Лайтово, доставка по РФ.",
      "Светодиодные фигуры высотой 1,5–3 м для общественных пространств. Антивандальный корпус, гарантия 12 месяцев, монтаж в Томске.",
    ],
  },
  newyear: {
    title: (n) => `Новогоднее оформление в Томске №${pad(n)}`,
    descs: [
      "Комплексное новогоднее оформление: гирлянды, световые фигуры, контурная подсветка. Полный цикл от Лайтово — дизайн, производство, монтаж, демонтаж, хранение.",
      "Праздничная иллюминация под ключ. ZOND и Лайтово оформляют улицы, фасады и парки в Томске и других городах России.",
      "Сезонное LED-оформление коммерческого объекта к Новому году. Бесплатный дизайн-проект по фото объекта, монтаж за 3–10 дней.",
    ],
  },
  city: {
    title: (n) => `Городское световое оформление в Томске №${pad(n)}`,
    descs: [
      "Иллюминация городского пространства: улицы, площади, набережные. Опыт оформления Томска и других городов Сибири с 2008 года.",
      "Подсветка городских конструкций к праздникам. Лайтово ГК ZOND — монтаж по контракту с муниципалитетом, согласование документов.",
    ],
  },
  commercial: {
    title: (n) => `Иллюминация коммерческого объекта в Томске №${pad(n)}`,
    descs: [
      "LED-оформление магазина, ресторана или офиса. Учитываем бюджет и сроки бизнеса — монтаж в нерабочие часы по Томску.",
      "Брендированная подсветка коммерческого здания: фирменные цвета, динамическая анимация. Реализация ZOND и Лайтово.",
    ],
  },
  territory: {
    title: (n) => `Подсветка прилегающей территории в Томске №${pad(n)}`,
    descs: [
      "Светодиодное оформление территории объекта: парковка, входная группа, ограждения. Все материалы IP65, питание 12/24 В безопасное.",
      "Иллюминация двора и территории жилого/коммерческого объекта. Тёплый белый или цветной RGB-свет, монтаж за 1–3 дня.",
    ],
  },
  general: {
    title: (n) => `Светодиодное оформление в Томске №${pad(n)}`,
    descs: [
      "Светодиодное оформление под задачу клиента: дизайн → производство → монтаж → демонтаж. Бренд иллюминации Лайтово ГК ZOND.",
      "LED-инсталляция любой формы и сложности. Собственное производство гирлянд и фигур, монтаж по Томску с 2008 года.",
      "Световая композиция собственного производства. Лайтово — 1000+ позиций каталога, опт по всей России, монтаж в Томске под ключ.",
    ],
  },
};

function rewriteLed(items) {
  return items.map((item, i) => {
    const n = i + 1;
    const sub = detectLedSubtype(item.title);
    const tpl = LED_TEMPLATES[sub];
    const desc = tpl.descs[i % tpl.descs.length];
    return { ...item, title: tpl.title(n), description: desc };
  });
}

// ---------- DESIGN ----------

function rewriteDesign(items) {
  // Existing titles split: "Полиграфия"/"Каталог"/"Календарь"/"Открытки"/"Брошюры" → polygraphy
  //                       "Логотипы" → logos
  const polygraphyDescs = [
    "Дизайн полиграфической продукции от концепта до печати в Томске. ZOND работает с типографиями города, согласовываем макеты до финальной готовности.",
    "Разработка макетов брошюр, каталогов и буклетов. Свой дизайн-центр с 1995 года, печать на оборудовании Xerox Color 550 и OKI ES9541.",
    "Полиграфия для бизнеса: визитки, листовки, плакаты, открытки. Печать от 100 шт, доставка по Томску бесплатно при заказе от 5000 ₽.",
  ];
  const logosDescs = [
    "Разработка фирменного стиля и логотипа в Томске. От 8 000 ₽: 3 концепции, до 5 правок, передача в .ai/.eps/.svg/.png. Дизайн-центр ZOND с 1995 года.",
    "Создание логотипа с проработкой типографики и цветовой палитры. Включён лого-бук с правилами использования. Срок 7–14 рабочих дней.",
    "Фирменный стиль для нового бренда: логотип, монохромная и цветная версии, фирстиль. Согласование с типографией для печати.",
  ];

  return items.map((item, i) => {
    const n = i + 1;
    const lower = (item.title || "").toLowerCase();
    if (lower.includes("логотип")) {
      return {
        ...item,
        title: `Дизайн фирменного стиля и логотипа — Томск №${pad(n)}`,
        description: logosDescs[i % logosDescs.length],
      };
    }
    const subtypeTitles = [
      "Дизайн полиграфии для бизнеса в Томске",
      "Каталог компании — дизайн и печать в Томске",
      "Дизайн календаря на год — Томск",
      "Дизайн открыток к корпоративному событию — Томск",
      "Брошюра для презентации — дизайн и печать в Томске",
    ];
    const matchingTitle = lower.includes("катало")
      ? subtypeTitles[1]
      : lower.includes("календ")
        ? subtypeTitles[2]
        : lower.includes("открыт")
          ? subtypeTitles[3]
          : lower.includes("брошюр")
            ? subtypeTitles[4]
            : subtypeTitles[0];
    return {
      ...item,
      title: `${matchingTitle} №${pad(n)}`,
      description: polygraphyDescs[i % polygraphyDescs.length],
    };
  });
}

// ---------- PRINT ----------

function rewritePrint(items) {
  // Use existing description/title as seed (client + spec) — expand to SEO.
  const seeds = [
    "Печать на УФ-сольвентных принтерах Magellan и Flora, ширина до 3,2 м. Срок 1–3 рабочих дня в Томске, доставка по городу.",
    "Широкоформатная печать на баннере 280–510 г/м², плёнке ORAJET, сетке mesh. Минимальный заказ от 1 м², 50 000 м²/год.",
    "Интерьерная эко-сольвентная печать с разрешением до 1440 dpi на холсте, плёнке и бумаге Blue Back. Печатаем в Томске с 1995 года.",
    "Полноцветная сольвентная печать для наружной рекламы. Постпечатная обработка: люверсы, проклейка края, ламинирование 30–250 мкм.",
  ];
  return items.map((item, i) => {
    const n = i + 1;
    const titleBase = item.title || `Печать №${pad(n)}`;
    // Strip quotes from titleBase to keep SEO clean
    const cleanTitle = titleBase.replace(/«|»/g, "");
    return {
      ...item,
      title: `Широкоформатная печать в Томске — ${cleanTitle} №${pad(n)}`,
      description: `${item.description ? item.description + ". " : ""}${seeds[i % seeds.length]}`,
    };
  });
}

// ---------- PRODUCTION ----------

function rewriteProduction(items) {
  // Existing description has client name (e.g. "ВТБ", "DNS Томск"). Keep + expand.
  const seeds = [
    "Изготовление в собственном цехе ZOND: лазерная резка, ЧПУ-фрезеровка, сборка. Срок 5–15 рабочих дней, монтаж по Томску и области.",
    "Производство и монтаж под ключ. Согласование с администрацией города, паспорт фасада, гарантия 12 месяцев на конструкцию.",
    "Объёмные элементы из стали, нержавейки и пластика. Покраска порошком, светодиодная подсветка, бесплатный замер.",
  ];

  return items.map((item, i) => {
    const n = i + 1;
    const seedTitle = item.title || `Производство №${pad(n)}`;
    const clientHint = item.description?.trim();
    const desc = clientHint
      ? `Заказчик — ${clientHint}. ${seeds[i % seeds.length]}`
      : seeds[i % seeds.length];
    return {
      ...item,
      title: `${seedTitle} — производство в Томске №${pad(n)}`,
      description: desc,
    };
  });
}

// ---------- EXHIBITION ----------

function rewriteExhibition(items) {
  const seeds = [
    "Дизайн концепции стенда, печать панелей, монтаж и демонтаж на выставочной площадке. Опыт работы по всей России с 2006 года.",
    "Мобильные конструкции MAXIBIT и JUST — официальный дилер MAXIBIT (Швеция) в Сибири с 2006 года. Заказ под клиента, монтаж за 1 день.",
    "Под ключ от ZOND: проект → производство → доставка → монтаж на стенде → демонтаж после мероприятия → хранение оборудования до следующей выставки.",
  ];
  return items.map((item, i) => {
    const n = i + 1;
    const seedTitle = item.title || `Стенд №${pad(n)}`;
    const seed = seeds[i % seeds.length];
    const desc = item.description
      ? `${item.description}. ${seed}`
      : seed;
    return {
      ...item,
      title: `Выставочный стенд — ${seedTitle} в Томске №${pad(n)}`,
      description: desc,
    };
  });
}

// ---------- RUN ----------

const portfolio = JSON.parse(fs.readFileSync(PORTFOLIO_PATH, "utf-8"));

const summary = {};

for (const cat of Object.keys(portfolio)) {
  const items = portfolio[cat].items;
  let updated;
  switch (cat) {
    case "led":
      updated = rewriteLed(items);
      break;
    case "design":
      updated = rewriteDesign(items);
      break;
    case "print":
      updated = rewritePrint(items);
      break;
    case "production":
      updated = rewriteProduction(items);
      break;
    case "exhibition":
      updated = rewriteExhibition(items);
      break;
    default:
      updated = items;
  }
  portfolio[cat].items = updated;

  summary[cat] = {
    count: updated.length,
    titleLen: updated.map((it) => it.title.length),
    descLen: updated.map((it) => it.description.length),
    sample: updated.slice(0, 3).map((it) => ({ title: it.title, desc: it.description })),
  };
}

// Uniqueness check: ensure no two items in same category have identical title
for (const cat of Object.keys(summary)) {
  const titles = portfolio[cat].items.map((it) => it.title);
  const dupe = titles.find((t, idx) => titles.indexOf(t) !== idx);
  if (dupe) console.warn(`DUPLICATE title in ${cat}: ${dupe}`);
}

fs.writeFileSync(PORTFOLIO_PATH, JSON.stringify(portfolio, null, 2) + "\n", "utf-8");

console.log("\n=== SEO Pass Summary ===\n");
for (const [cat, s] of Object.entries(summary)) {
  if (s.count === 0) {
    console.log(`${cat.padEnd(12)} (empty, skipped)`);
    continue;
  }
  const tMin = Math.min(...s.titleLen);
  const tMax = Math.max(...s.titleLen);
  const dMin = Math.min(...s.descLen);
  const dMax = Math.max(...s.descLen);
  console.log(
    `${cat.padEnd(12)} items=${s.count}  title-len=${tMin}-${tMax}  desc-len=${dMin}-${dMax}`,
  );
  for (const ex of s.sample) {
    console.log(`  · ${ex.title}`);
    console.log(`    ${ex.desc}`);
  }
  console.log();
}
