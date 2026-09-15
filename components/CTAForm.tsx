import { COMPANY } from "@/lib/site-data";
import CTALeadForm from "@/components/CTALeadForm";

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

          {/* Правая часть — форма (клиентский компонент: отправка в /api/contact без перезагрузки) */}
          <div className="bg-white text-[#1f2530] rounded-2xl p-10 relative">
            <h3 className="text-2xl font-bold mb-2">Оставить заявку</h3>
            <p className="text-sm text-gray-500 mb-7">Заполните форму — менеджер свяжется в течение часа.</p>
            <CTALeadForm accentColor={accentColor} />
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
