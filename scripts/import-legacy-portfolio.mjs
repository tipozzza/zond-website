#!/usr/bin/env node
// One-shot importer: pull all items from legacy portfolio components into data/portfolio.json.
// Safe to re-run — dedups by image path.

import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

const ROOT = process.cwd();
const PORTFOLIO_PATH = path.join(ROOT, "data", "portfolio.json");

// ---- Source data lifted verbatim from legacy components ----

const ledWorks = [
  { src: "/images/led/work-01.jpg", title: "Оформление к Новому году" },
  { src: "/images/led/work-02.jpg", title: "Городское оформление" },
  { src: "/images/led/work-03.jpg", title: "Подсветка фасада" },
  { src: "/images/led/work-04.jpg", title: "Иллюминация коммерческого объекта" },
  { src: "/images/led/work-05.jpg", title: "Новогоднее оформление" },
  { src: "/images/led/work-06.jpg", title: "Световые фигуры на площади" },
  { src: "/images/led/work-07.jpg", title: "Праздничная иллюминация" },
  { src: "/images/led/work-08.jpg", title: "Подсветка территории" },
  { src: "/images/led/work-09.jpg", title: "Новогоднее оформление 2020" },
  { src: "/images/led/work-10.jpg", title: "Оформление к зиме" },
  { src: "/images/led/work-11.jpg", title: "Световое оформление" },
  { src: "/images/led/work-12.jpg", title: "Городские конструкции" },
  { src: "/images/led/work-13.jpg", title: "Брендированное оформление" },
  { src: "/images/led/work-14.jpg", title: "Иллюминация объекта" },
  { src: "/images/led/work-15.jpg", title: "Светящееся пространство" },
  { src: "/images/led/work-16.jpg", title: "Декор фасада" },
  { src: "/images/led/work-17.jpg", title: "Световой декор" },
  { src: "/images/led/work-18.jpg", title: "Иллюминация парка" },
  { src: "/images/led/work-19.jpg", title: "Архитектурное освещение" },
  { src: "/images/led/work-20.jpg", title: "Праздничная инсталляция" },
  { src: "/images/led/work-21.jpg", title: "Подсветка территории" },
  { src: "/images/led/work-22.jpg", title: "Праздничный декор" },
  { src: "/images/led/work-23.jpg", title: "Световая композиция" },
];

const ledPortfolio = [
  { src: "/images/led/portfolio-01.jpg", title: "Иллюминация фасада" },
  { src: "/images/led/portfolio-02-main.jpg", title: "Новогоднее оформление" },
  { src: "/images/led/portfolio-03.jpg", title: "Оформление ёлки" },
  { src: "/images/led/portfolio-04.jpg", title: "LED-экран медиа-фасад" },
  { src: "/images/led/portfolio-05.jpg", title: "Светодиодные фигуры" },
  { src: "/images/led/portfolio-06.jpg", title: "Световая инсталляция" },
  { src: "/images/led/portfolio-07.jpg", title: "Декор торгового центра" },
  { src: "/images/led/portfolio-08.jpg", title: "Архитектурная подсветка" },
];

const designPortfolio = [
  { src: "/images/design/portfolio/portfolio-01.png", title: "Полиграфия" },
  { src: "/images/design/portfolio/portfolio-02.png", title: "Каталог" },
  { src: "/images/design/portfolio/portfolio-03.png", title: "Календарь" },
  { src: "/images/design/portfolio/portfolio-04.png", title: "Открытки" },
  { src: "/images/design/portfolio/portfolio-05.png", title: "Брошюры" },
  { src: "/images/design/portfolio/portfolio-06.png", title: "Полиграфия" },
  { src: "/images/design/portfolio/portfolio-07.png", title: "Полиграфия" },
  { src: "/images/design/portfolio/portfolio-08.png", title: "Полиграфия" },
  { src: "/images/design/portfolio/portfolio-09.png", title: "Полиграфия" },
  { src: "/images/design/portfolio/logos-01.png", title: "Логотипы" },
  { src: "/images/design/portfolio/logos-02.png", title: "Логотипы" },
  { src: "/images/design/portfolio/logos-03.png", title: "Логотипы" },
  { src: "/images/design/portfolio/logos-04.png", title: "Логотипы" },
  { src: "/images/design/portfolio/logos-05.png", title: "Логотипы" },
];

const exhibitionPortfolio = [
  { src: "/images/exhibition/portfolio/case-corporate-booth.jpg", title: "Корпоративный стенд", description: "Премиум-сегмент для крупного бизнеса" },
  { src: "/images/exhibition/portfolio/case-oil-gas.jpg", title: "Нефтегазовая выставка", description: "Индустриальные конференции и форумы" },
  { src: "/images/exhibition/portfolio/case-it-conference.jpg", title: "IT-конференция «Город IT»", description: "Современные минималистичные решения" },
  { src: "/images/exhibition/portfolio/case-retail-popup.jpg", title: "Промо в торговом центре", description: "POS-активации и pop-up зоны" },
  { src: "/images/exhibition/portfolio/case-mobile-event.jpg", title: "Мобильные стенды на event", description: "Быстрая сборка под разовые события" },
  { src: "/images/exhibition/portfolio/case-large-exhibition.jpg", title: "Крупная экспозиция", description: "100+ м² с зонами переговоров и продукции" },
];

const printPortfolio = [
  { src: "/images/print/print-portfolio-01-eldorado.jpg", title: "Литой баннер «Эльдорадо»", description: "Баннер 6×3 м, литой 460 гр" },
  { src: "/images/print/print-portfolio-02-banner.jpg", title: "Широкоформатная печать", description: "Баннер для наружной рекламы" },
  { src: "/images/print/print-portfolio-03-interior.jpeg", title: "Интерьерная печать", description: "Постер для интерьера" },
  { src: "/images/print/print-portfolio-04-banner.jpeg", title: "Печать на баннере", description: "Полноцветная сольвентная" },
];

const productionGallery = [
  { src: "/images/portfolio-production/portfolio-01-objemnye-bukvy.jpg", title: "Объёмные буквы", description: "Корпоративный заказ" },
  { src: "/images/portfolio-production/portfolio-02-svetovye-bukvy.jpg", title: "Световые буквы", description: "Розничный магазин" },
  { src: "/images/portfolio-production/portfolio-03-krishnaya-ustanovka.jpg", title: "Крышная установка", description: "БЦ в центре Томска" },
  { src: "/images/portfolio-production/portfolio-04-dns-oformlenie.jpg", title: "Внутреннее оформление", description: "DNS" },
  { src: "/images/portfolio-production/portfolio-05-ukazatel.jpeg", title: "Указатель / навигация", description: "Городская инфраструктура" },
  { src: "/images/portfolio-production/portfolio-06-bukvy-universitet.jpg", title: "Объёмные буквы для университета", description: "ТУСУР" },
  { src: "/images/portfolio-production/portfolio-07-bukvy-knizhnyy.jpeg", title: "Объёмные буквы", description: "Книжный магазин" },
  { src: "/images/portfolio-production/portfolio-08-bukvy-kakadu.jpeg", title: "Объёмные буквы", description: "Клуб «Какаду»" },
  { src: "/images/portfolio-production/portfolio-09-stend.jpeg", title: "Информационный стенд", description: "Офисное здание" },
  { src: "/images/portfolio-production/portfolio-10-vyveska-kofeynya.jpeg", title: "Объёмная вывеска", description: "Кофейня" },
  { src: "/images/portfolio-production/portfolio-11-ostanovki.jpg", title: "Остановочные комплексы", description: "Городская инфраструктура" },
  { src: "/images/portfolio-production/portfolio-12-azs-gazoyl.jpg", title: "Оформление АЗС", description: "ГазОйл" },
  { src: "/images/portfolio-production/portfolio-13-azs-gazoyl-2.jpg", title: "Оформление АЗС", description: "ГазОйл" },
  { src: "/images/portfolio-production/portfolio-14-shevchenko-ostanovka.jpg", title: "Автобусная остановка", description: "ул. Шевченко" },
  { src: "/images/portfolio-production/portfolio-16-tablichka.jpeg", title: "Табличка", description: "Корпоративный заказ" },
  { src: "/images/portfolio-production/portfolio-17-tablichka-vtb.jpeg", title: "Таблички для банка", description: "ВТБ" },
  { src: "/images/portfolio-production/portfolio-20-vtb-bankomat.jpeg", title: "Брендирование банкомата", description: "ВТБ" },
  { src: "/images/portfolio-production/portfolio-25-objemnye-svetovye.jpeg", title: "Объёмные световые буквы", description: "Розничная сеть" },
  { src: "/images/portfolio-production/portfolio-32-dns-tomsk.jpeg", title: "Объёмные буквы DNS", description: "DNS Томск" },
  { src: "/images/portfolio-production/portfolio-33-misc.jpg", title: "Производство", description: "Цех Зонд-Реклама" },
];

const sources = [
  { category: "led", items: ledWorks },
  { category: "led", items: ledPortfolio },
  { category: "design", items: designPortfolio },
  { category: "exhibition", items: exhibitionPortfolio },
  { category: "print", items: printPortfolio },
  { category: "production", items: productionGallery },
];

// ---- Run ----

const portfolio = JSON.parse(fs.readFileSync(PORTFOLIO_PATH, "utf-8"));

const stats = {};
for (const cat of Object.keys(portfolio)) {
  stats[cat] = { imported: 0, skippedExisting: 0, skippedMissingFile: 0 };
}

for (const { category, items } of sources) {
  if (!portfolio[category]) {
    console.error(`Unknown category: ${category}`);
    continue;
  }
  const existing = new Set(portfolio[category].items.map((it) => it.image));
  let nextOrder = portfolio[category].items.reduce((m, it) => Math.max(m, it.order ?? 0), 0);

  for (const src of items) {
    const image = src.src;

    if (existing.has(image)) {
      stats[category].skippedExisting++;
      continue;
    }

    const physical = path.join(ROOT, "public", image.replace(/^\//, ""));
    if (!fs.existsSync(physical)) {
      stats[category].skippedMissingFile++;
      console.warn(`SKIP missing: ${image}`);
      continue;
    }

    nextOrder++;
    portfolio[category].items.push({
      id: randomUUID(),
      image,
      title: src.title ?? `Проект ${category} #${nextOrder}`,
      description: src.description ?? "",
      order: nextOrder,
      createdAt: new Date().toISOString(),
    });
    existing.add(image);
    stats[category].imported++;
  }
}

fs.writeFileSync(PORTFOLIO_PATH, JSON.stringify(portfolio, null, 2) + "\n", "utf-8");

console.log("\n=== Import summary ===");
for (const [cat, s] of Object.entries(stats)) {
  console.log(
    `${cat.padEnd(12)} imported=${s.imported}  dedup=${s.skippedExisting}  missing-file=${s.skippedMissingFile}  total-now=${portfolio[cat].items.length}`,
  );
}
