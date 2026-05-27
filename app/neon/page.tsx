import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PixelBorder from "@/components/PixelBorder";
import FloatingTG from "@/components/FloatingTG";
import Breadcrumb from "@/components/Breadcrumb";
import FAQ from "@/components/FAQ";
import CTAForm from "@/components/CTAForm";
import { buildOgUrl } from "@/lib/og";

export const metadata: Metadata = {
  title: "Неоновые вывески в Томске — LED-неон и классический неон | ZOND",
  description:
    "Изготовление неоновых вывесок в Томске: классический газоразрядный неон и современный LED-неон Neonflex. Производство, монтаж, гарантия 2 года.",
  keywords: [
    "неон Томск",
    "неоновая вывеска",
    "LED-неон",
    "Neonflex",
    "газоразрядный неон",
    "неоновые буквы",
  ],
  alternates: { canonical: "/neon" },
  openGraph: {
    title: "Неоновые вывески в Томске",
    description:
      "Классический неон и LED-неон Neonflex. Производство, монтаж, гарантия 2 года.",
    url: "https://zond-website.vercel.app/neon",
    siteName: "ZOND",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: buildOgUrl({
          title: "Неоновые вывески в Томске",
          subtitle: "Классический неон и современный LED-неон Neonflex",
          category: "Производство",
        }),
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Неоновые вывески в Томске",
    description: "Классический неон и современный LED-неон Neonflex",
    images: [
      buildOgUrl({
        title: "Неоновые вывески в Томске",
        subtitle: "Классический неон и современный LED-неон Neonflex",
        category: "Производство",
      }),
    ],
  },
};

const STATS = [
  { value: "2 типа", label: "технологии: классика и LED-неон" },
  { value: "50 000 ч", label: "срок службы LED-неона" },
  { value: "8-10", label: "цветов свечения на выбор" },
  { value: "2 года", label: "гарантия на производство" },
];

const TECH = [
  {
    icon: "🔮",
    badge: "КЛАССИКА",
    title: "Газоразрядный неон",
    desc: "Стеклянные трубки с инертным газом и высоким напряжением. Аутентичное «винтажное» свечение, ручная гибка под форму, индивидуальный дизайн.",
    pros: [
      "Аутентичный «винтажный» вид",
      "Ручная гибка по эскизу",
      "Глубокое равномерное свечение",
    ],
    cons: [
      "Требует трансформатор и обслуживание",
      "Хрупкость стекла при ударе",
      "Срок службы 5-10 лет",
    ],
  },
  {
    icon: "💡",
    badge: "СОВРЕМЕННОЕ РЕШЕНИЕ",
    title: "LED-неон (Neonflex)",
    desc: "Гибкий силиконовый шнур с встроенной LED-лентой. Имитирует неоновое свечение, но без трансформаторов высокого напряжения. Энергоэффективен и долговечен.",
    pros: [
      "Срок службы 50 000 часов (15+ лет)",
      "Низкое энергопотребление",
      "Безопасное напряжение 12/24V",
      "Гибкость монтажа на криволинейные фасады",
    ],
    cons: [
      "Менее «глубокое» свечение",
      "Швы видны при близком осмотре",
    ],
  },
];

const APPLICATIONS = [
  { icon: "🍺", title: "Бары и пабы", desc: "Аутентичная вывеска с винтажным неоновым свечением." },
  { icon: "☕", title: "Кафе и рестораны", desc: "Привлекающий вечером элемент фасада или интерьера." },
  { icon: "🏢", title: "Фасады", desc: "Контурная подсветка букв, логотипов, архитектурных деталей." },
  { icon: "🎨", title: "Интерьерный декор", desc: "Цитаты, лозунги, акценты на стене в офисе или дома." },
  { icon: "🎪", title: "Выставки и шоурумы", desc: "Привлечение внимания на стенде или в торговом зале." },
  { icon: "📸", title: "Фотозоны", desc: "Светящиеся надписи для соцсетей — мерч-сегмент." },
];

const FAQ_ITEMS = [
  {
    question: "Что выбрать — классический неон или LED-неон?",
    answer:
      "Для аутентичного вида и старинной эстетики — классический неон. Для долгого срока службы, безопасности и низкого энергопотребления — LED-неон (Neonflex). На фасаде вывески под открытым небом лучше LED — он не боится перепадов температур и не требует трансформаторов.",
  },
  {
    question: "Какой срок службы?",
    answer:
      "Классический неон: 5-10 лет при правильном обслуживании. LED-неон: 50 000 часов работы — это 15+ лет при работе 8-10 часов в сутки. Гарантия от нас — 2 года на оба типа.",
  },
  {
    question: "Можно ли отремонтировать неоновую вывеску?",
    answer:
      "Классический неон ремонтируется заменой повреждённой трубки или трансформатора. LED-неон — заменой повреждённого сегмента шнура. По гарантии всё бесплатно в течение 2 лет.",
  },
  {
    question: "Нужно ли согласование?",
    answer:
      "Если неон размещается как вывеска на фасаде — нужен паспорт фасада и согласование с Комитетом архитектуры Томска. Берём документы на себя — срок 3-4 недели. Подробнее на /pasport-fasada.",
  },
  {
    question: "Какая мощность и сколько ест электричества?",
    answer:
      "LED-неон потребляет 8-12 Вт на погонный метр (на 80% меньше классического неона). Метр LED-неона в работе 24/7 стоит около 20-25 ₽/мес по тарифам Томска. Классический неон — в 3-4 раза дороже.",
  },
];

const SERVICE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Изготовление неоновых вывесок в Томске",
  serviceType: "Производство неоновых и LED-неоновых вывесок",
  areaServed: { "@type": "City", name: "Томск" },
  provider: {
    "@type": "Organization",
    name: "Зонд-Реклама",
    alternateName: "ZOND",
    url: "https://zond-website.vercel.app",
  },
  url: "https://zond-website.vercel.app/neon",
};

// TODO: фото неоновых вывесок от Дмитрия. Сейчас fallback — LED-фото с /led.
const HERO_PHOTO = "/images/led/header-led.jpg";

export default function NeonPage() {
  return (
    <>
      <PixelBorder />
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_JSONLD) }}
      />
      <main>
        <Breadcrumb
          items={[
            { name: "Главная", url: "/" },
            { name: "Услуги", url: "/#services" },
            { name: "Неоновые вывески", url: "/neon" },
          ]}
        />

        {/* HERO */}
        <section className="relative bg-slate-900 text-white overflow-hidden">
          <Image
            src={HERO_PHOTO}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-25 blur-[2px] md:blur-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/85 md:from-black/40 md:via-black/30 md:to-black/70" />
          <div className="relative container mx-auto px-4 max-w-5xl py-16 md:py-24">
            <div className="inline-flex items-center gap-2 bg-accent-yellow text-slate-900 px-4 py-2 rounded-full text-sm font-bold mb-6 shadow-lg">
              <span aria-hidden>✨</span>Неоновые вывески под ключ
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] md:drop-shadow-lg">
              Неоновые вывески в&nbsp;Томске
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-3xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] md:drop-shadow-lg">
              Классический газоразрядный неон и современный LED-неон Neonflex. Бары,
              кафе, фасады, интерьерный декор — производство, монтаж, гарантия 2 года.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              <a
                href="#contact-form"
                className="inline-flex items-center gap-2 bg-accent-yellow text-slate-900 px-7 py-4 rounded-xl font-bold text-base shadow-xl hover:-translate-y-0.5 hover:brightness-95 transition"
              >
                📝 Оставить заявку
              </a>
              <a
                href="tel:+73822979705"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/30 text-white px-7 py-4 rounded-xl font-semibold text-base hover:bg-white/20 transition"
              >
                ☎ 8 (3822) 97-97-05
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/85">
              <span>✓ Два типа технологии</span>
              <span>✓ Ручная гибка</span>
              <span>✓ Согласование с УГА</span>
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

        {/* ТЕХНОЛОГИИ */}
        <section className="py-16 md:py-20 bg-slate-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
              Две технологии — две задачи
            </h2>
            <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
              Классический газоразрядный неон vs современный LED-неон Neonflex.
              Выбираем под бренд и условия эксплуатации.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {TECH.map((t) => (
                <article
                  key={t.title}
                  className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm"
                >
                  <div className="text-4xl mb-3">{t.icon}</div>
                  <div className="text-xs uppercase tracking-wider text-brand font-bold mb-2">
                    {t.badge}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{t.title}</h3>
                  <p className="text-slate-700 leading-relaxed mb-5">{t.desc}</p>
                  <div className="mb-4">
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">
                      Плюсы
                    </div>
                    <ul className="space-y-1 text-sm text-slate-700">
                      {t.pros.map((p) => (
                        <li key={p} className="flex gap-2">
                          <span className="text-emerald-600">✓</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-rose-700 mb-2">
                      Минусы
                    </div>
                    <ul className="space-y-1 text-sm text-slate-700">
                      {t.cons.map((c) => (
                        <li key={c} className="flex gap-2">
                          <span className="text-rose-500">−</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ПРИМЕНЕНИЕ */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
              Где применяется неон
            </h2>
            <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
              От аутентичных баров до интерьерного декора и фотозон в соцсетях.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {APPLICATIONS.map((a) => (
                <div
                  key={a.title}
                  className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center"
                >
                  <div className="text-4xl mb-3">{a.icon}</div>
                  <h3 className="font-bold mb-2">{a.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FAQ items={FAQ_ITEMS} title="Частые вопросы о неоновых вывесках" />

        <section className="bg-brand text-white py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
              Хотите свою неоновую вывеску?
            </h2>
            <p className="text-lg md:text-xl text-white/85 mb-8 max-w-2xl mx-auto">
              Бесплатный замер по Томску, эскиз и расчёт за 2-3 дня. Производство —
              2-3 недели.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <a
                href="#contact-form"
                className="inline-flex items-center gap-2 bg-accent-yellow text-slate-900 px-8 py-4 rounded-xl font-bold text-base shadow-xl hover:-translate-y-0.5 hover:brightness-95 transition"
              >
                📝 Оставить заявку
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

        <CTAForm />
      </main>
      <Footer />
      <PixelBorder />
      <FloatingTG />
    </>
  );
}
