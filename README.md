# Zond Website

Сайт ГК «Зонд-Реклама». Построен на Next.js 15 + TypeScript + Tailwind CSS.

## Быстрый старт

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера (откроется на http://localhost:3000)
npm run dev

# Production-сборка
npm run build
npm start
```

## Структура

```
app/
  ├─ layout.tsx       — корневой layout (шапка, подвал, метаданные)
  ├─ page.tsx         — главная страница
  ├─ globals.css      — глобальные стили + Tailwind directives
  └─ favicon.ico

components/            — React-компоненты
  ├─ Header.tsx       — шапка с навигацией
  ├─ Footer.tsx       — подвал
  ├─ Hero.tsx         — первый экран
  ├─ Services.tsx     — 6 направлений
  ├─ Stats.tsx        — крупные цифры
  ├─ MapPreview.tsx   — превью карты рекламоносителей
  ├─ Cases.tsx        — кейсы клиентов
  ├─ Clients.tsx      — логотипы клиентов
  ├─ Timeline.tsx     — таймлайн истории компании
  ├─ News.tsx         — новости
  ├─ CTAForm.tsx      — секция формы заявки
  ├─ PixelBorder.tsx  — декоративная LED-пиксельная полоса
  └─ FloatingWA.tsx   — плавающая кнопка WhatsApp

lib/
  └─ site-data.ts     — данные сайта (контакты, услуги, кейсы и т.д.)

public/
  ├─ logo-purple.png  — логотип на белом фоне
  └─ logo-white.png   — логотип на тёмном фоне
```

## Брендовые цвета (в Tailwind)

- `bg-brand`, `text-brand` — основной фиолетовый #3D2E91
- `bg-brand-dark` — тёмный фиолетовый
- `bg-brand-light` — светлый фиолетовый
- `bg-section-outdoor` — красный (Наружная реклама)
- `bg-section-print` — оранжевый (Широкоформатная печать)
- `bg-section-production` — жёлтый (Производство)
- `bg-section-exhibition` — зелёный (Выставочные)
- `bg-section-design` — голубой (Дизайн)
- `bg-section-led` — фиолетовый (LED)

## Шрифт

Rubik из Google Fonts. Подключён через `next/font/google` в `app/layout.tsx`.
Это бесплатный аналог корпоративного PF DinDisplay Pro из брендбука.

## Roadmap

- [x] **Фаза 1.** Главная страница (готово в этом стартовом проекте)
- [ ] **Фаза 2.** Страницы 6 направлений + интерактивная карта + калькуляторы
- [ ] **Фаза 3.** Личный кабинет клиента + интеграция с 1С
- [ ] **Фаза 4.** Блог + полное SEO

См. полный план в файле «Аудит_сайта_и_план_нового.html»

## Деплой

Рекомендуемая платформа: [Vercel](https://vercel.com)

1. Залить код в GitHub-репозиторий
2. На Vercel: New Project → Import репозиторий
3. Vercel автоматически распознает Next.js и развернёт

После: каждый `git push` в main = автоматический деплой на прод.

## Контакты

Проект ГК «Зонд-Реклама», г. Томск.
