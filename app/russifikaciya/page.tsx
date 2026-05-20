import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PixelBorder from "@/components/PixelBorder";
import FloatingTG from "@/components/FloatingTG";
import Breadcrumb from "@/components/Breadcrumb";
import FAQ from "@/components/FAQ";
import CTAForm from "@/components/CTAForm";

export const metadata: Metadata = {
  title: "Русификация англоязычной вывески в Томске — закон 2026",
  description:
    "С 1 марта 2026 года иностранные слова на вывесках должны быть на государственном языке. Замена, перевод или новая вывеска в Томске — от 1 дня. Бесплатный замер.",
  keywords: [
    "русификация вывески",
    "замена англоязычной вывески",
    "русский язык на вывеске",
    "закон 2026 вывески",
    "перевод вывески Томск",
  ],
};

export default function RussifikaciyaPage() {
  return (
    <>
      <PixelBorder />
      <Header />
      <main>
        <Breadcrumb
          items={[
            { name: "Главная", url: "/" },
            { name: "Русификация вывески", url: "/russifikaciya" },
          ]}
        />

        {/* HERO */}
        <section className="bg-gradient-to-br from-brand to-purple-900 text-white py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="inline-block bg-red-500 text-white px-4 py-1.5 rounded-full text-sm font-bold mb-6">
              ВНИМАНИЕ: закон с 1 марта 2026
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Замена англоязычной вывески в Томске по закону 2026 года
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              С 1 марта 2026 года вывески с иностранными словами должны быть переведены на
              государственный язык или дополнены переводом такого же размера. За нарушение —
              штрафы от 50 000 ₽ до 500 000 ₽ для юр.лиц.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a
                href="#contact-form"
                className="bg-white text-brand px-8 py-4 rounded-xl font-bold"
              >
                Получить бесплатный замер
              </a>
              <a
                href="tel:+73822979705"
                className="bg-white/10 backdrop-blur border border-white/30 text-white px-8 py-4 rounded-xl font-semibold"
              >
                8 (3822) 97-97-05
              </a>
            </div>
          </div>
        </section>

        {/* ЧТО ИЗМЕНИЛОСЬ */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold mb-6">Что изменилось с 1 марта 2026 года</h2>
            <p className="mb-4 text-slate-700 leading-relaxed">
              Федеральным законом «О государственном языке РФ» (с изменениями от 28.02.2025
              № 53-ФЗ) запрещено использование иностранных слов и выражений на вывесках, в
              наружной рекламе, а также в названиях товаров и услуг — за исключением случаев,
              когда у этих слов нет общеупотребительных русских аналогов.
            </p>
            <p className="mb-4 text-slate-700 leading-relaxed">
              Если на фасаде вашего магазина, кафе, салона или офиса есть слова на английском
              или других иностранных языках — их нужно либо перевести, либо сопроводить
              переводом того же размера и шрифта.
            </p>
            <p className="mb-4 text-slate-700 leading-relaxed">
              <strong>Штрафы за нарушение:</strong> для должностных лиц — от 10 000 до 50 000 ₽,
              для юридических лиц — от 50 000 до 500 000 ₽ (ст. 14.3 КоАП РФ).
            </p>
          </div>
        </section>

        {/* ЧТО ПРЕДЛАГАЕМ */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold mb-10 text-center">Что мы предлагаем</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="text-4xl mb-3">📝</div>
                <h3 className="text-xl font-bold mb-2">Перевод и дополнение</h3>
                <p className="text-slate-600">
                  Добавляем русский перевод к существующей вывеске. Самый бюджетный вариант — от
                  5 000 ₽.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="text-4xl mb-3">🔄</div>
                <h3 className="text-xl font-bold mb-2">Полная замена</h3>
                <p className="text-slate-600">
                  Изготавливаем новую вывеску — только на русском или с дополнительным русским
                  блоком. От 1 дня для табличек, 5-7 дней для световых.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="text-4xl mb-3">🎨</div>
                <h3 className="text-xl font-bold mb-2">Новый дизайн</h3>
                <p className="text-slate-600">
                  Разрабатываем новый логотип и вывеску с нуля — с русским названием и
                  проработанной типографикой. От 8 000 ₽.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* СРОКИ И ЦЕНЫ */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold mb-6">Сколько стоит и как быстро</h2>
            <ul className="space-y-3 text-slate-700">
              <li>✓ <strong>Перевод (наклейка/таблица):</strong> от 5 000 ₽, 1-2 дня</li>
              <li>✓ <strong>Замена баннера на вывеске:</strong> от 15 000 ₽, 2-3 дня</li>
              <li>✓ <strong>Замена световых букв:</strong> от 50 000 ₽, 5-10 дней</li>
              <li>✓ <strong>Полная замена лайтбокса:</strong> от 30 000 ₽, 5-7 дней</li>
              <li>✓ <strong>Новый комплексный фасад:</strong> от 100 000 ₽, 14-21 день</li>
            </ul>
            <p className="mt-6 text-slate-600">
              Бесплатный замер по Томску. Согласование с администрацией — берём на себя.
            </p>
          </div>
        </section>

        <FAQ
          items={[
            {
              question: "Какие именно слова надо переводить?",
              answer:
                "Все иностранные слова — английские, китайские, японские и другие. Исключение — слова без общеупотребительных русских аналогов (например, «Wi-Fi», «такси», «кофе»). Если сомневаетесь — поможем определить.",
            },
            {
              question: "Можно ли просто наклеить русские слова поверх английских?",
              answer:
                "Можно, если это аккуратно с точки зрения дизайна и материала. Но по практике лучше сделать новую вывеску — она прослужит дольше и не будет выглядеть «латаной».",
            },
            {
              question: "А если у меня бренд на английском?",
              answer:
                "Можно оставить английское написание бренда, но рядом обязательно — русское прочтение того же размера. Например: NIKE / НАЙК, MCDONALD'S / МАКДОНАЛДС.",
            },
            {
              question: "Нужно ли согласовывать новую вывеску?",
              answer:
                "Если меняется только текст (например, добавляется русский перевод), новое согласование обычно не требуется. Если меняется конструкция целиком — нужен новый Паспорт фасада. Мы согласуем под ключ.",
            },
          ]}
        />

        <CTAForm />
      </main>
      <Footer />
      <PixelBorder />
      <FloatingTG />
    </>
  );
}
