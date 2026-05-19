"use client";
import { Star, ExternalLink } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-10 md:p-16 shadow-lg text-center">
          <div className="flex justify-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={32} className="fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
            Что говорят клиенты
          </h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Реальные отзывы клиентов о работе с Зонд-Реклама — на странице компании в 2ГИС. 33 года в Томске, тысячи реализованных проектов.
          </p>
          <a
            href="https://2gis.ru/tomsk/search/зонд%20реклама"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand hover:bg-brand/90 text-white px-8 py-4 rounded-xl font-bold transition shadow-lg"
          >
            Читать отзывы на 2ГИС
            <ExternalLink size={20} />
          </a>
          <p className="text-xs text-slate-400 mt-4">Открывается в новой вкладке</p>
        </div>
      </div>
    </section>
  );
}
