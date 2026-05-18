import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PixelBorder from "@/components/PixelBorder";
import FloatingWA from "@/components/FloatingWA";
import OfficeMap from "@/components/OfficeMap";
import ContactForm from "@/components/ContactForm";

const HOURS = [
  { day: "Понедельник — Пятница", time: "9:00 — 18:00" },
  { day: "Суббота", time: "10:00 — 15:00" },
  { day: "Воскресенье", time: "Выходной" },
];

const REQUISITES = [
  { label: "Полное наименование", value: "ООО «Формат Сити»" },
  { label: "Группа компаний", value: "ГК «Зонд-Реклама»" },
  { label: "ИНН", value: "7017200748" },
  { label: "КПП", value: "701701001" },
  { label: "ОГРН", value: "1077017039660" },
  { label: "ОКПО", value: "82639128" },
  { label: "Юридический адрес", value: "634021, г. Томск, пр. Фрунзе, 115" },
];

export default function ContactsPage() {
  return (
    <>
      <PixelBorder />
      <Header />
      <main>
        {/* Hero */}
        <section className="hero-bg text-white pt-[70px] pb-20 relative overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-6 relative z-10">
            <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold uppercase tracking-wider mb-7">
              Контакты
            </span>
            <h1 className="text-[clamp(38px,5.5vw,64px)] leading-[1.05] font-extrabold tracking-tight mb-5">
              Звоните, пишите,{" "}
              <span className="bg-gradient-to-r from-accent-yellow via-accent-pink to-section-design bg-clip-text text-transparent">
                приезжайте
              </span>
            </h1>
            <p className="text-lg text-white/85 max-w-[640px] font-light leading-relaxed">
              Менеджер ответит в течение часа в рабочее время. Подберём адресную программу
              бесплатно — пришлём 2–3 варианта под ваш бюджет.
            </p>
          </div>
        </section>

        {/* 3 cards */}
        <section className="py-16 bg-white">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Phone */}
              <div className="bg-[#f6f5fa] rounded-2xl p-8 border border-gray-100">
                <div className="w-14 h-14 rounded-xl bg-brand/10 text-brand flex items-center justify-center mb-5">
                  <Phone size={28} />
                </div>
                <h2 className="text-2xl font-bold mb-6">Позвонить</h2>
                <div className="space-y-4">
                  <div>
                    <a
                      href="tel:+78002222062"
                      className="block text-2xl font-bold text-brand hover:underline"
                    >
                      8 800 222-20-62
                    </a>
                    <div className="text-sm text-slate-500 mt-1">Бесплатный по России</div>
                  </div>
                  <div>
                    <a
                      href="tel:+73822979705"
                      className="block text-2xl font-bold text-brand hover:underline"
                    >
                      8 (3822) 97-97-05
                    </a>
                    <div className="text-sm text-slate-500 mt-1">Томск, городской</div>
                  </div>
                </div>
              </div>

              {/* Mail / WA / VK */}
              <div className="bg-[#f6f5fa] rounded-2xl p-8 border border-gray-100">
                <div className="w-14 h-14 rounded-xl bg-brand/10 text-brand flex items-center justify-center mb-5">
                  <Mail size={28} />
                </div>
                <h2 className="text-2xl font-bold mb-6">Написать</h2>
                <a
                  href="mailto:office@zondreklama.ru"
                  className="block text-xl font-bold text-brand hover:underline mb-1 break-all"
                >
                  office@zondreklama.ru
                </a>
                <div className="text-sm text-slate-500 mb-6">
                  Для договоров и официальных запросов
                </div>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="https://wa.me/79234009705"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors"
                  >
                    <MessageCircle size={18} />
                    WhatsApp
                  </a>
                  <a
                    href="https://vk.com/zond.reklama"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#0077FF] hover:bg-[#0066DD] text-white px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors"
                  >
                    ВКонтакте
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="bg-[#f6f5fa] rounded-2xl p-8 border border-gray-100">
                <div className="w-14 h-14 rounded-xl bg-brand/10 text-brand flex items-center justify-center mb-5">
                  <MapPin size={28} />
                </div>
                <h2 className="text-2xl font-bold mb-6">Приехать</h2>
                <div className="space-y-4">
                  <div>
                    <div className="text-xl font-bold">пр. Фрунзе, 115</div>
                    <div className="text-sm text-slate-500 mt-1">Офис</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold">пр. Фрунзе, 109</div>
                    <div className="text-sm text-slate-500 mt-1">Производственный цех</div>
                  </div>
                  <div className="text-sm text-slate-500 pt-3 border-t border-gray-200">
                    634021, г. Томск
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map */}
        <section className="py-12 bg-[#f6f5fa]">
          <div className="max-w-[1280px] mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
              Как нас найти
            </h2>
            <OfficeMap />
          </div>
        </section>

        {/* Hours */}
        <section className="py-16 bg-white">
          <div className="max-w-[800px] mx-auto px-6">
            <div className="bg-[#f6f5fa] rounded-2xl p-6 md:p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center">
                  <Clock size={24} />
                </div>
                <h2 className="text-2xl font-bold">Режим работы</h2>
              </div>
              <ul className="divide-y divide-gray-200">
                {HOURS.map((h) => (
                  <li
                    key={h.day}
                    className="flex flex-wrap justify-between gap-4 py-3 text-base"
                  >
                    <span className="text-slate-700">{h.day}</span>
                    <span className="font-semibold">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="py-16 bg-[#f6f5fa]">
          <div className="max-w-[800px] mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Напишите нам
            </h2>
            <p className="text-base text-slate-600 mb-8">
              Заполните форму — менеджер свяжется в течение рабочего дня.
            </p>
            <ContactForm />
          </div>
        </section>

        {/* Requisites */}
        <section className="py-16 bg-white">
          <div className="max-w-[1000px] mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">Реквизиты</h2>
            <div className="bg-[#f6f5fa] rounded-2xl p-6 md:p-8 border border-gray-100">
              <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                {REQUISITES.map((r) => (
                  <div key={r.label}>
                    <dt className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">
                      {r.label}
                    </dt>
                    <dd className="text-base text-slate-900">{r.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <PixelBorder />
      <FloatingWA />
    </>
  );
}
