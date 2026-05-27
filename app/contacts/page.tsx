import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PixelBorder from "@/components/PixelBorder";
import FloatingTG from "@/components/FloatingTG";
import OfficeMap from "@/components/OfficeMap";
import ContactForm from "@/components/ContactForm";
import Breadcrumb from "@/components/Breadcrumb";
import FAQ from "@/components/FAQ";
import MaxLink from "@/components/MaxLink";
import { buildOgUrl } from "@/lib/og";

export const metadata: Metadata = {
  title: "Контакты ZOND в Томске — пр. Фрунзе, 115",
  description:
    "Адрес: 634021, г. Томск, пр. Фрунзе, 115. Телефон 8 (3822) 97-97-05, email office@zondreklama.ru. Режим работы: Пн-Пт 9-18, Сб 10-15. Отвечаем за час.",
  keywords: [
    "ZOND контакты",
    "Зонд-Реклама контакты",
    "адрес рекламного агентства Томск",
    "телефон Зонд",
  ],
  alternates: { canonical: "/contacts" },
  openGraph: {
    title: "Контакты ZOND",
    description:
      "Томск, пр. Фрунзе 115 — звоните или приезжайте. 8 (3822) 97-97-05, office@zondreklama.ru.",
    url: "https://zond-website.vercel.app/contacts",
    siteName: "ZOND",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: buildOgUrl({
          title: "Контакты ZOND",
          subtitle: "Томск, пр. Фрунзе 115 — звоните или приезжайте",
          category: "Контакты",
        }),
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Контакты ZOND",
    description: "Томск, пр. Фрунзе 115 — звоните или приезжайте",
    images: [
      buildOgUrl({
        title: "Контакты ZOND",
        subtitle: "Томск, пр. Фрунзе 115 — звоните или приезжайте",
        category: "Контакты",
      }),
    ],
  },
};

const STATS = [
  { value: "< 1 час", label: "ответ в рабочее время" },
  { value: "6", label: "каналов связи" },
  { value: "6 дней", label: "работаем в неделю" },
  { value: "24/7", label: "заявка через сайт" },
];

const CHANNELS = [
  {
    icon: "📞",
    title: "Телефон",
    value: "8 (3822) 97-97-05",
    desc: "Городской, Томск. Пн-Пт 9-18, Сб 10-15.",
    href: "tel:+73822979705",
  },
  {
    icon: "✉️",
    title: "Email",
    value: "office@zondreklama.ru",
    desc: "Для договоров, ТЗ и официальных запросов.",
    href: "mailto:office@zondreklama.ru",
  },
  {
    icon: "✈",
    title: "Telegram",
    value: "@zond_reklama",
    desc: "Быстрее всего написать в мессенджер.",
    href: "https://t.me/zond_reklama",
  },
  {
    icon: "🇲",
    title: "MAX",
    value: "+7 923 400-97-05",
    desc: "Российский мессенджер от VK. Работаем в рабочие часы.",
    // href не задан — MAX-карточка рендерится через <MaxLink> отдельно
    // ниже в коде, чтобы deep-link + fallback работали корректно.
    isMax: true,
  },
  {
    icon: "🟦",
    title: "ВКонтакте",
    value: "vk.com/zond.reklama",
    desc: "Лента работ, новости, оперативные ответы.",
    href: "https://vk.com/zond.reklama",
  },
  {
    icon: "📍",
    title: "Адрес",
    value: "пр. Фрунзе, 115",
    desc: "634021, г. Томск. Офис + шоурум.",
    href: "https://yandex.ru/maps/?text=Томск,%20пр.%20Фрунзе,%20115",
  },
  {
    icon: "🕐",
    title: "Часы работы",
    value: "Пн-Пт 9-18, Сб 10-15",
    desc: "Воскресенье — выходной. Заявка через сайт принимается 24/7.",
  },
];

const DIRECTIONS = [
  {
    icon: "🚌",
    title: "Общественный транспорт",
    desc: "Остановка «Фрунзе» — 3 минуты пешком. Автобусы 1, 3, 4, 13, 19, 25, троллейбусы 1, 3, 4.",
  },
  {
    icon: "🚗",
    title: "На автомобиле",
    desc: "С пр. Фрунзе — поворот к зданию с парковкой. Бесплатная гостевая парковка для клиентов.",
  },
  {
    icon: "🚕",
    title: "На такси",
    desc: "Точка в Яндекс.Такси: «Зонд-Реклама, пр. Фрунзе 115, Томск». В среднем 200-350 ₽ из центра.",
  },
];

const FAQ_ITEMS = [
  {
    question: "Нужно ли записываться заранее, чтобы приехать в офис?",
    answer:
      "Не обязательно — приём по будням в часы работы. Если хотите видеть конкретного менеджера или посмотреть производство — позвоните за 1-2 часа, подготовим встречу.",
  },
  {
    question: "Есть ли парковка у офиса?",
    answer:
      "Да. У здания пр. Фрунзе 115 — бесплатная гостевая парковка для клиентов. Места видно от перекрёстка, шлагбаума нет.",
  },
  {
    question: "Работаете ли в выходные?",
    answer:
      "Суббота — сокращённый день 10:00-15:00. Воскресенье — выходной для офиса. Срочные заявки можно оставить через сайт или Telegram — рассмотрим в первый рабочий день.",
  },
  {
    question: "Как быстро вы отвечаете на заявки?",
    answer:
      "В рабочее время — в течение часа. Вне рабочих часов — на следующее утро. Если задача срочная, лучше позвонить — мобильный канал быстрее почты.",
  },
  {
    question: "Можно ли провести переговоры по видеосвязи?",
    answer:
      "Да. Подключаемся по Telegram, Zoom, Google Meet — на ваш выбор. Согласуем удобное время по телефону или почте.",
  },
  {
    question: "В каких мессенджерах вы доступны?",
    answer:
      "Telegram — основной канал (@zond_reklama). Также MAX (российский мессенджер от VK): +7 923 400-97-05. ВКонтакте — лента работ и оперативные ответы. Менеджеры отвечают в рабочие часы; через бот сайта заявка попадёт ответственному сотруднику автоматически.",
  },
  {
    question: "Куда отправлять макеты и крупные файлы?",
    answer:
      "На email office@zondreklama.ru до 25 МБ. Больше — через файлообменник (Яндекс.Диск, WeTransfer, Google Drive) ссылкой в письме. Также принимаем USB-носители в офисе.",
  },
];

export default function ContactsPage() {
  return (
    <>
      <PixelBorder />
      <Header />
      <main>
        <Breadcrumb
          items={[
            { name: "Главная", url: "/" },
            { name: "Контакты", url: "/contacts" },
          ]}
        />

        {/* HERO */}
        <section className="relative bg-slate-900 text-white overflow-hidden">
          <Image
            src="/images/hero-tomsk.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-20 blur-[2px] md:blur-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/85 md:from-black/40 md:via-black/30 md:to-black/70" />
          <div className="relative container mx-auto px-4 max-w-5xl py-16 md:py-24">
            <div className="inline-flex items-center gap-2 bg-accent-yellow text-slate-900 px-4 py-2 rounded-full text-sm font-bold mb-6 shadow-lg">
              <span aria-hidden>📍</span>
              Томск, пр. Фрунзе, 115
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] md:drop-shadow-lg">
              Контакты ZOND
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-3xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] md:drop-shadow-lg">
              Свяжитесь любым удобным способом — отвечаем в течение часа в рабочее
              время.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              <a
                href="tel:+73822979705"
                className="inline-flex items-center gap-2 bg-accent-yellow text-slate-900 px-7 py-4 rounded-xl font-bold text-base shadow-xl hover:-translate-y-0.5 hover:brightness-95 transition"
              >
                📞 8 (3822) 97-97-05
              </a>
              <a
                href="https://t.me/zond_reklama"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/30 text-white px-7 py-4 rounded-xl font-semibold text-base hover:bg-white/20 transition"
              >
                ✈ Telegram
              </a>
              <MaxLink className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/30 text-white px-7 py-4 rounded-xl font-semibold text-base hover:bg-white/20 transition">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-[#7B61FF] text-white text-[10px] font-bold">M</span>
                MAX
              </MaxLink>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/85">
              <span>✓ Ответ за час</span>
              <span>✓ 6 каналов связи</span>
              <span>✓ Бесплатная парковка</span>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="bg-white border-b border-slate-100">
          <div className="container mx-auto px-4 max-w-6xl py-10 md:py-12">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-8">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight text-brand">
                    {s.value}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-600 mt-2 leading-snug">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* СПОСОБЫ СВЯЗИ */}
        <section className="py-16 md:py-20 bg-slate-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
              Способы связи
            </h2>
            <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
              Выбирайте удобный канал — каждый ведёт к ответственному менеджеру.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {CHANNELS.map((c) => {
                const inner = (
                  <>
                    <div className="text-4xl mb-3">{c.icon}</div>
                    <div className="text-xs uppercase tracking-wider text-slate-400 mb-1">
                      {c.title}
                    </div>
                    <div className="text-lg font-bold text-brand mb-2 break-words">
                      {c.value}
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{c.desc}</p>
                  </>
                );
                const className =
                  "bg-white rounded-2xl p-6 border border-slate-200 hover:border-brand hover:shadow-xl transition block";
                if (c.isMax) {
                  return (
                    <MaxLink key={c.title} className={className}>
                      {inner}
                    </MaxLink>
                  );
                }
                return c.href ? (
                  <a
                    key={c.title}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={className}
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={c.title} className={className}>
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* КАРТА + КАК ДОБРАТЬСЯ */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
              Офис на карте
            </h2>
            <p className="text-center text-slate-600 mb-10 max-w-2xl mx-auto">
              Томск, пр. Фрунзе 115 — офис, шоурум и производственный цех в одном здании.
            </p>
            <div className="mb-10">
              <OfficeMap />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {DIRECTIONS.map((d) => (
                <div
                  key={d.title}
                  className="bg-slate-50 rounded-2xl p-6 border border-slate-200"
                >
                  <div className="text-4xl mb-3">{d.icon}</div>
                  <h3 className="font-bold mb-2">{d.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ПРОИЗВОДСТВО */}
        <section className="bg-brand text-white py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
              Хотите увидеть, как делаются вывески?
            </h2>
            <p className="text-lg md:text-xl text-white/85 mb-8 max-w-2xl mx-auto">
              Покажем производственный цех на пр. Фрунзе 115: лазерная резка,
              ЧПУ-фрезеровка, УФ-печать, LED-сборка. По предварительной записи.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <a
                href="#contact-form"
                className="inline-flex items-center gap-2 bg-accent-yellow text-slate-900 px-8 py-4 rounded-xl font-bold text-base shadow-xl hover:-translate-y-0.5 hover:brightness-95 transition"
              >
                📅 Записаться на экскурсию
              </a>
              <a
                href="tel:+73822979705"
                className="inline-flex items-center gap-2 text-white text-lg font-semibold hover:underline"
              >
                ☎ 8 (3822) 97-97-05
              </a>
            </div>
          </div>
        </section>

        <FAQ items={FAQ_ITEMS} title="Частые вопросы по контактам" />

        {/* ФОРМА */}
        <section id="contact-form" className="py-16 md:py-20 bg-white">
          <div className="max-w-[800px] mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Напишите нам
            </h2>
            <p className="text-base text-slate-600 mb-8">
              Заполните форму — менеджер свяжется в течение часа в рабочее время.
            </p>
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
      <PixelBorder />
      <FloatingTG />
    </>
  );
}
