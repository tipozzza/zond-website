import { COMPANY, SERVICES } from "@/lib/site-data";

type Props = {
  accentColor?: string;
};

export default function CTAForm({ accentColor }: Props = {}) {
  return (
    <section id="contact-form" className="py-24 bg-gradient-to-br from-[#0a0820] to-[#1a0e3a] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(111,46,145,0.5)_0%,transparent_40%),radial-gradient(circle_at_80%_70%,rgba(0,174,239,0.3)_0%,transparent_40%)]" />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Левая часть — каналы связи */}
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight leading-tight mb-5">
              Расскажите о задаче — мы{" "}
              <span className="bg-gradient-to-r from-accent-yellow to-accent-pink bg-clip-text text-transparent">
                подберём решение
              </span>
            </h2>
            <p className="text-lg text-white/85 mb-8 leading-relaxed">
              Ответим в течение часа в рабочее время. Подготовим 2-3 варианта размещения под ваш бюджет,
              покажем фото конструкций и трафик локаций.
            </p>
            <div className="grid gap-3.5">
              <Channel icon="📞" title={COMPANY.phone} subtitle="Томск, городской" />
              <Channel icon="✈" title="Telegram" subtitle="@zond_reklama — быстрее всего" />
              <Channel icon="🇲" title="MAX" subtitle="+7 923 400-97-05 — российский мессенджер" />
              <Channel icon="✉️" title={COMPANY.email} subtitle="Для договоров и официальных запросов" />
            </div>
          </div>

          {/* Правая часть — форма */}
          <div className="bg-white text-[#1f2530] rounded-2xl p-10">
            <h3 className="text-2xl font-bold mb-2">Оставить заявку</h3>
            <p className="text-sm text-gray-500 mb-7">Заполните форму — менеджер свяжется в течение часа.</p>
            <form className="space-y-4">
              <Field label="Имя *" type="text" placeholder="Как к вам обращаться" />
              <div className="grid grid-cols-2 gap-3">
                <Field label="Телефон *" type="tel" placeholder="+7 (___) ___-__-__" />
                <Field label="Email" type="email" placeholder="email@example.ru" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Какая задача?</label>
                <select className="w-full py-3.5 px-4 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:border-brand focus:outline-none transition-colors">
                  <option>Выберите направление…</option>
                  {SERVICES.map((s) => <option key={s.id}>{s.title}</option>)}
                  <option>Не определился — нужна консультация</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Комментарий</label>
                <textarea
                  placeholder="Расскажите про задачу, бюджет, сроки"
                  className="w-full py-3.5 px-4 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:border-brand focus:outline-none transition-colors min-h-[80px] resize-y"
                />
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Нажимая «Отправить», вы соглашаетесь с{" "}
                <a href="/privacy" className="text-brand">политикой конфиденциальности</a>{" "}
                и даёте согласие на обработку персональных данных.
              </p>
              <button
                type="submit"
                className="btn w-full py-4 text-sm text-white hover:-translate-y-0.5 hover:brightness-90 transition-all"
                style={{ backgroundColor: accentColor ?? "#550082" }}
              >
                Отправить заявку →
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Channel({ icon, title, subtitle }: { icon: string; title: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-3.5 p-4 bg-white/6 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-light to-brand text-white flex items-center justify-center text-xl flex-shrink-0">
        {icon}
      </div>
      <div className="text-sm">
        <strong className="block text-base mb-0.5">{title}</strong>
        <span className="text-white/85 text-xs">{subtitle}</span>
      </div>
    </div>
  );
}

function Field({ label, type, placeholder }: { label: string; type: string; placeholder: string }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1.5">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full py-3.5 px-4 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:border-brand focus:outline-none transition-colors"
      />
    </div>
  );
}
