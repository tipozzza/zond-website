"use client";

import Image from "next/image";

const SERVICES = [
  {
    title: "Новогодняя подсветка фасадов",
    description:
      "Новогоднее оформление гирляндами в зимний период является актуальным решением для таких объектов, как частные дома, торговые центры, объекты коммерческой недвижимости, бизнес центры и муниципальные объекты.",
    image: "/images/led/service-fasad-noviy-god.jpg",
    href: "#contact-form",
  },
  {
    title: "Производство световых фигур",
    description:
      "Объёмные и плоские световые фигуры уже давно стали классикой в оформление приусадебных участков, общественных пространств и городской среды. Такие изделия успешно не только освещают, но и эстетически усовершенствуют новогоднюю композицию.",
    image: "/images/led/service-figures.jpg",
    href: "#contact-form",
  },
  {
    title: "Архитектурная подсветка зданий",
    description:
      "Архитектурное освещение фасадов наделяет улицы городов уникальными и современными мотивами, которые не только подчёркивают архитектурные решения каждого строения, но и отлично выделяют их на общем фоне.",
    image: "/images/led/service-fasad-arch.jpg",
    href: "#contact-form",
  },
  {
    title: "Контурная подсветка неоном",
    description:
      "Контурная подсветка домов осуществляется с помощью дюралайта и гибкого неона. Такое оформление отлично подчёркивает прямые геометрические очертания здания, за счёт линейного расположения светодиодов в конструкции.",
    image: "/images/led/service-neon.jpg",
    href: "#contact-form",
  },
  {
    title: "Оформление новогодних ёлок",
    description:
      "Украшение елей гирляндами – это важная часть подготовки к Новому году. Их устанавливают в домах, офисах, в холлах ТРЦ и бизнес-центров, во дворах и на площадях городов. Без оформления праздничной ели невозможно представить ни один новогодний праздник.",
    image: "/images/led/service-elka.jpg",
    href: "#contact-form",
  },
  {
    title: "Подсветка деревьев",
    description:
      "В подсветке деревьев мы используем большое количество светодиодных гирлянд, что особенно красочно смотрится при иллюминации протяжённых алей или садов целиком. Оформление происходит без причинения вреда деревьям.",
    image: "/images/led/service-trees.jpg",
    href: "#contact-form",
  },
];

export default function IlluminationServices() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Услуги иллюминации и новогоднего оформления от LIGHTOVO
          </h2>
          <div className="w-16 h-1 bg-[#F4C430] mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {SERVICES.map((service, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              <div className="p-4 pb-0">
                <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-100">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-center mb-3 text-slate-900">
                  {service.title}
                </h3>
                <div className="w-12 h-0.5 bg-[#F4C430] mx-auto mb-4"></div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 text-center flex-1">
                  {service.description}
                </p>

                <div className="text-center mt-auto">
                  <a
                    href={service.href}
                    className="inline-block bg-[#F4C430] hover:bg-[#E8B86E] text-[#0B1E3F] px-8 py-3 rounded-lg font-bold transition"
                  >
                    Подробнее
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
