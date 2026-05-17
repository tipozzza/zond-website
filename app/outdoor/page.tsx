import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTAForm from "@/components/CTAForm";
import PixelBorder from "@/components/PixelBorder";
import FloatingWA from "@/components/FloatingWA";
import { COMPANY } from "@/lib/site-data";

const CONSTRUCTIONS = [
  {
    icon: "📺",
    name: "Digital 3×6",
    format: "3×6 м",
    sides: "286 сторон",
    price: "45 000 ₽/мес",
    description:
      "Цифровой биллборд формата 3×6 м. 12 рекламодателей в ротации, ваш ролик каждые 60 секунд, 1 440 показов в день. Можно менять контент в любой момент.",
  },
  {
    icon: "🎬",
    name: "Digital 5×15",
    format: "15×5 м",
    sides: "12 сторон",
    price: "90 000 ₽/мес",
    description:
      "Крупноформатный digital для имиджевых кампаний. Доминирует над всеми форматами на ключевых магистралях Томска.",
  },
  {
    icon: "🖥️",
    name: "Digital 6×4",
    format: "6×4 м",
    sides: "12 сторон",
    price: "60 000 ₽/мес",
    description:
      "Промежуточный digital-формат, оптимальный баланс охвата и цены.",
  },
  {
    icon: "🏬",
    name: "Digital Indoor-пилон",
    format: "1×2,1 м",
    sides: "24 стороны в ТРЦ Мегаполис",
    price: "3 000 ₽/мес",
    description:
      "Цифровые пилоны внутри ТРЦ Мегаполис на Ленина 217С. Реклама рядом с покупателями в момент принятия решения о покупке.",
  },
  {
    icon: "🪧",
    name: "Щит 3×6",
    format: "6×3 м",
    sides: "319 сторон",
    price: "20 000 – 35 000 ₽/мес",
    description:
      "Классический статичный билборд — самый доступный формат массового охвата. Печать на баннере, монтаж под ключ.",
  },
  {
    icon: "🔄",
    name: "Тривижн 3×6",
    format: "6×3 м",
    sides: "66 сторон",
    price: "30 000 – 35 000 ₽/мес",
    description:
      "Вращающиеся призмы со сменой 3 изображений. Динамика привлекает внимание лучше статики — эффективность выше на 30-50%.",
  },
  {
    icon: "🏙️",
    name: "Суперсайт 5×15",
    format: "15×5 м",
    sides: "4 стороны",
    price: "75 000 – 80 000 ₽/мес",
    description:
      "Крупноформатный статичный щит на главных магистралях. Имиджевый формат для крупных брендов.",
  },
  {
    icon: "🚶",
    name: "Сити-формат 1,2×1,8",
    format: "1,2×1,8 м",
    sides: "18 сторон",
    price: "8 000 – 9 000 ₽/мес",
    description:
      "Компактные конструкции в пешеходных зонах центра. Идеально для локального бизнеса — кафе, магазинов, услуг.",
  },
  {
    icon: "↩️",
    name: "Тривижн 3×12",
    format: "12×3 м",
    sides: "3 стороны",
    price: "от 60 000 ₽/мес",
    description:
      "Крупноформатный призматрон — редкий и заметный формат с динамической сменой изображений.",
  },
];

const ADVANTAGES = [
  {
    icon: "💡",
    title: "Единственная digital-сеть в Томске",
    text: "336 цифровых экранов в одной сети",
  },
  {
    icon: "📐",
    title: "Лидер по м² в городе",
    text: "более 13 800 м² собственной сети",
  },
  {
    icon: "⚡",
    title: "Размещение от 1 дня",
    text: "для digital можно запустить рекламу даже завтра",
  },
  {
    icon: "📸",
    title: "Фотоотчёт еженедельно",
    text: "контроль состояния конструкций",
  },
  {
    icon: "🎯",
    title: "Бесплатная адресная программа",
    text: "менеджер подберёт оптимальное размещение под вашу задачу",
  },
  {
    icon: "🏆",
    title: "Опыт 33 года",
    text: "на рекламном рынке Томска с 1992 года",
  },
];

const STEPS = [
  {
    num: "1",
    icon: "📞",
    text: `Оставьте заявку или позвоните ${COMPANY.phone}`,
  },
  {
    num: "2",
    icon: "📋",
    text: "Менеджер подберёт адресную программу под ваш бюджет и задачу (бесплатно)",
  },
  {
    num: "3",
    icon: "✍️",
    text: "Согласуете макет и подпишете договор",
  },
  {
    num: "4",
    icon: "🚀",
    text: "Запуск рекламы — для digital в течение 1-3 дней, для статичных конструкций 3-5 дней",
  },
];

const FAQ = [
  {
    q: "Чем отличается digital-биллборд от статичного щита?",
    a: "Digital — это цифровая LED-панель: можно менять контент в любой момент, 12 рекламодателей в ротации, видна одинаково хорошо днём и ночью. Статичный щит дешевле, но требует печати баннера, не меняется, эффективнее в дневное время. Digital сильнее для коротких акций и тестирования, статика — для длительных имиджевых кампаний.",
  },
  {
    q: "Сколько раз в день показывают мою рекламу на digital?",
    a: "В формате Digital 3×6 цикл показа — 60 секунд. Каждый ролик длится 5 секунд, в ротации 12 рекламодателей. Ваш ролик появляется 1 440 раз в сутки (60 × 24).",
  },
  {
    q: "Что такое сторона A и сторона B?",
    a: "Каждая рекламная конструкция имеет две стороны для размещения. Сторона A — по направлению основного потока транспорта (видят те, кто едет к вам), сторона B — по встречному направлению. Сторона A обычно стоит чуть дороже из-за лучшего трафика.",
  },
  {
    q: "Какой минимальный срок размещения?",
    a: "Для digital — от 1 дня (можно запустить ролик на конкретное событие). Для статичных конструкций — от 1 месяца (нужно время на печать баннера и монтаж). При размещении от 3 месяцев действуют скидки.",
  },
  {
    q: "Что входит в стоимость размещения?",
    a: "В цену включено: само размещение на конструкции, регулярная проверка состояния, замена в случае повреждения по нашей вине. Печать баннера и монтаж — отдельно (от 5 000 ₽ за щит 3×6). Дизайн макета — отдельная услуга от нашего отдела дизайна.",
  },
  {
    q: "Можно ли поменять макет во время кампании?",
    a: "На digital — да, без доплаты, бесплатно меняем хоть каждый день. На статичных конструкциях — это перемонтаж, стоит как новый монтаж (от 5 000 ₽ за щит 3×6) плюс печать нового баннера.",
  },
];

export default function OutdoorPage() {
  return (
    <>
      <PixelBorder />
      <Header />
      <main>
        {/* Hero */}
        <section className="hero-bg text-white pt-[70px] pb-20 relative overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-6 relative z-10">
            <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold uppercase tracking-wider mb-7">
              <span className="w-2 h-2 rounded-full bg-section-outdoor animate-pulse shadow-[0_0_12px_rgba(227,6,19,0.8)]" />
              Наружная реклама
            </span>

            <h1 className="text-[clamp(38px,5.5vw,64px)] leading-[1.05] font-extrabold tracking-tight mb-7 max-w-[900px]">
              Наружная реклама в{" "}
              <span className="bg-gradient-to-r from-accent-yellow via-accent-pink to-section-outdoor bg-clip-text text-transparent">
                Томске и Северске
              </span>
            </h1>

            <p className="text-lg text-white/85 mb-9 max-w-[760px] font-light leading-relaxed">
              Собственная сеть из 244 рекламных конструкций — 751 сторона размещения,
              336 digital-экранов, более 13 800 м² рекламной площади.
              Лидер по охвату в Томске с 1992 года.
            </p>

            <div className="flex gap-3 flex-wrap">
              <a href="/#map" className="btn btn-primary btn-lg">Посмотреть карту</a>
              <a href="#contact-form" className="btn btn-outline-white btn-lg">Подобрать программу</a>
            </div>
          </div>
        </section>

        {/* Сеть в цифрах */}
        <section className="bg-section-outdoor text-white py-16 md:py-20">
          <div className="max-w-[1280px] mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-10">
              Сеть в цифрах
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              <NetStat num="751" label="сторон размещения" />
              <NetStat num="244" label="рекламные конструкции" />
              <NetStat num="336" label="digital-экранов" />
              <NetStat num="88%" label="с подсветкой 24/7" />
            </div>
          </div>
        </section>

        {/* Типы конструкций */}
        <section className="py-20 bg-white">
          <div className="max-w-[1280px] mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
              Типы рекламных конструкций
            </h2>
            <p className="text-base text-gray-500 mb-12 max-w-[720px]">
              Полная палитра форматов — сначала digital, затем статичные конструкции.
              Под любую задачу: от точечного локального охвата до федеральных имиджевых кампаний.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CONSTRUCTIONS.map((c) => (
                <article
                  key={c.name}
                  className="flex flex-col p-6 rounded-2xl border border-gray-100 bg-[#f6f5fa] hover:border-section-outdoor/40 hover:shadow-lg transition-all"
                >
                  <div className="text-3xl mb-4">{c.icon}</div>
                  <h3 className="text-xl font-bold mb-1 leading-tight">{c.name}</h3>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-4">
                    {c.format} · {c.sides}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-5 flex-1">
                    {c.description}
                  </p>
                  <div className="inline-flex items-center px-4 py-2.5 rounded-lg bg-section-outdoor/10 text-section-outdoor font-bold text-sm self-start">
                    {c.price}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Почему выбирают нас */}
        <section className="py-20 bg-[#f6f5fa]">
          <div className="max-w-[1280px] mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-12">
              Почему выбирают нас
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ADVANTAGES.map((a) => (
                <div
                  key={a.title}
                  className="flex gap-4 p-6 rounded-2xl bg-white border border-gray-100"
                >
                  <div className="w-12 h-12 rounded-xl bg-section-outdoor/10 text-section-outdoor flex items-center justify-center text-2xl flex-shrink-0">
                    {a.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-1.5 leading-tight">{a.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{a.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Как заказать */}
        <section className="py-20 bg-white">
          <div className="max-w-[1280px] mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-14">
              Как заказать
            </h2>
            <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
              {STEPS.map((s) => (
                <li
                  key={s.num}
                  className="relative p-6 pt-10 rounded-2xl border border-gray-100 bg-[#f6f5fa]"
                >
                  <div className="absolute -top-5 left-5 w-12 h-12 rounded-xl bg-section-outdoor text-white font-extrabold text-xl flex items-center justify-center shadow-lg">
                    {s.num}
                  </div>
                  <div className="text-2xl mb-3">{s.icon}</div>
                  <p className="text-sm text-gray-700 leading-relaxed">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-[#f6f5fa]">
          <div className="max-w-[860px] mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-12 text-center">
              Часто задаваемые вопросы
            </h2>
            <div className="space-y-3">
              {FAQ.map((item) => (
                <details
                  key={item.q}
                  className="group bg-white rounded-2xl border border-gray-100 overflow-hidden"
                >
                  <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer font-semibold text-base list-none hover:bg-gray-50 transition-colors">
                    <span>{item.q}</span>
                    <span className="w-8 h-8 rounded-full bg-section-outdoor/10 text-section-outdoor flex-shrink-0 flex items-center justify-center text-lg leading-none group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <CTAForm />
      </main>
      <Footer />
      <PixelBorder />
      <FloatingWA />
    </>
  );
}

function NetStat({ num, label }: { num: string; label: string }) {
  return (
    <div>
      <div className="text-5xl md:text-6xl font-extrabold leading-none mb-2 tracking-tight">
        {num}
      </div>
      <div className="text-xs uppercase tracking-wider font-medium text-white/85">
        {label}
      </div>
    </div>
  );
}
