import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PixelBorder from "@/components/PixelBorder";
import FloatingTG from "@/components/FloatingTG";
import Breadcrumb from "@/components/Breadcrumb";
import { buildOgUrl } from "@/lib/og";
import { pluralizeYears } from "@/lib/pluralize";

const YEARS_ON_MARKET = new Date().getFullYear() - 1992;
const YEARS_WORD = pluralizeYears(YEARS_ON_MARKET);

export const metadata: Metadata = {
  title: "Работа в ZOND — вакансии в Томске | ZOND Реклама",
  description:
    "Работа в рекламной компании ZOND в Томске. Открыты вакансии менеджеров и специалистов. Резюме на hr@zondreklama.ru.",
  keywords: [
    "работа Томск",
    "вакансии Зонд",
    "ZOND вакансии",
    "работа в рекламе Томск",
    "менеджер по продажам Томск",
  ],
  alternates: { canonical: "/vacancies" },
  openGraph: {
    title: "Работа в ZOND",
    description: "Вакансии в Томске. Резюме на hr@zondreklama.ru.",
    url: "https://zond-website.vercel.app/vacancies",
    siteName: "ZOND",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: buildOgUrl({
          title: "Работа в ZOND",
          subtitle: "Вакансии в Томске",
          category: "careers",
        }),
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Работа в ZOND",
    description: "Вакансии в Томске",
    images: [
      buildOgUrl({
        title: "Работа в ZOND",
        subtitle: "Вакансии в Томске",
        category: "careers",
      }),
    ],
  },
};

// JSON-LD JobPosting для активных hh.ru-вакансий — улучшает индексацию
// для Google Jobs (и потенциально для Яндекс.Работы).
const JOB_LOGIST_JSONLD = {
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: "Специалист договорной группы (Логист)",
  description:
    "Работа в рекламно-производственной компании ZOND в Томске. Полное описание и отклик через hh.ru.",
  datePosted: new Date().toISOString().slice(0, 10),
  employmentType: "FULL_TIME",
  hiringOrganization: {
    "@type": "Organization",
    name: "Зонд-Реклама",
    sameAs: "https://zond-website.vercel.app",
    logo: "https://zond-website.vercel.app/logo-square-purple.png",
  },
  jobLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      streetAddress: "пр. Фрунзе, 115",
      addressLocality: "Томск",
      addressCountry: "RU",
    },
  },
  applicantContact: {
    "@type": "ContactPoint",
    email: "hr@zondreklama.ru",
  },
  url: "https://tomsk.hh.ru/vacancy/132864064",
};

export default function VacanciesPage() {
  return (
    <>
      <PixelBorder />
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JOB_LOGIST_JSONLD) }}
      />
      <main className="bg-white">
        <Breadcrumb
          items={[
            { name: "Главная", url: "/" },
            { name: "Вакансии", url: "/vacancies" },
          ]}
        />

        <section className="max-w-[860px] mx-auto px-6 py-16">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Работа в ZOND
          </h1>
          <p className="text-lg text-slate-700 leading-relaxed mb-12">
            Мы рекламно-производственная компания в Томске, на рынке с 1992 года.
            У нас работают 50+ специалистов: дизайнеры, инженеры-конструкторы,
            монтажники, менеджеры, рабочие производства. Растём, всегда открыты для
            новых сотрудников.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold mb-6">Открытые вакансии</h2>

          <div className="space-y-5 mb-12">
            <article className="border border-slate-200 rounded-2xl p-6 hover:border-brand hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">
                Специалист договорной группы (Логист)
              </h3>
              <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                Полное описание, требования и условия — на странице вакансии
                hh.ru. Отклик через сайт.
              </p>
              <a
                href="https://tomsk.hh.ru/vacancy/132864064?query=зонд+реклама"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand hover:bg-brand/90 text-white px-5 py-2.5 rounded-lg font-semibold transition text-sm"
              >
                Смотреть на hh.ru →
              </a>
            </article>

            <article className="border border-slate-200 rounded-2xl p-6 hover:border-brand hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">Менеджер по продажам</h3>
              <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                Открыта постоянно — у нас всегда есть место сильному менеджеру с
                опытом в B2B-продажах. Опыт в рекламе и полиграфии будет плюсом.
                Подробности — по запросу.
              </p>
              <a
                href="mailto:hr@zondreklama.ru?subject=Вакансия%20менеджера%20по%20продажам"
                className="inline-flex items-center gap-2 bg-brand hover:bg-brand/90 text-white px-5 py-2.5 rounded-lg font-semibold transition text-sm"
              >
                Написать в HR →
              </a>
            </article>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-12">
            <h2 className="text-xl md:text-2xl font-bold mb-3">
              Не нашли подходящую вакансию?
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Если вы хотите работать в ZOND — присылайте резюме на{" "}
              <a
                href="mailto:hr@zondreklama.ru"
                className="text-brand font-semibold hover:underline"
              >
                hr@zondreklama.ru
              </a>
              . Мы сохраним его в базе кадрового резерва и свяжемся, когда появится
              подходящая позиция.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Часто открытые вакансии не успевают попасть на hh.ru — кандидата
              находим из накопленной базы.
            </p>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mb-6">Что мы предлагаем</h2>
          <ul className="space-y-3 mb-12">
            <li className="flex gap-3 text-slate-800">
              <span className="text-brand text-xl shrink-0">✓</span>
              <span>Стабильную компанию (на рынке {YEARS_ON_MARKET} {YEARS_WORD})</span>
            </li>
            <li className="flex gap-3 text-slate-800">
              <span className="text-brand text-xl shrink-0">✓</span>
              <span>Современное производство (свой цех, оборудование, бортогибы, ЧПУ)</span>
            </li>
            <li className="flex gap-3 text-slate-800">
              <span className="text-brand text-xl shrink-0">✓</span>
              <span>Команду профессионалов с опытом 5–20 лет</span>
            </li>
            <li className="flex gap-3 text-slate-800">
              <span className="text-brand text-xl shrink-0">✓</span>
              <span>Своевременную оплату труда</span>
            </li>
            <li className="flex gap-3 text-slate-800">
              <span className="text-brand text-xl shrink-0">✓</span>
              <span>Возможность роста (примеры есть)</span>
            </li>
          </ul>

          <div className="border-t border-slate-200 pt-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Контакты для HR</h2>
            <div className="space-y-2 text-slate-800">
              <p>
                <span className="text-slate-500">📍</span>{" "}
                <Link href="/contacts" className="hover:text-brand transition">
                  Томск, пр. Фрунзе 115
                </Link>
              </p>
              <p>
                <span className="text-slate-500">📞</span>{" "}
                <a href="tel:+73822979705" className="hover:text-brand transition">
                  +7 (3822) 97-97-05
                </a>
              </p>
              <p>
                <span className="text-slate-500">📧</span>{" "}
                <a href="mailto:hr@zondreklama.ru" className="text-brand font-semibold hover:underline">
                  hr@zondreklama.ru
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <PixelBorder />
      <FloatingTG />
    </>
  );
}
