import Link from "next/link";
import { NEWS } from "@/lib/site-data";

export default function News() {
  return (
    <section id="news" className="py-24">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="max-w-3xl mb-14">
          <span className="inline-block px-3.5 py-1.5 rounded bg-brand text-white text-xs font-bold uppercase tracking-wider mb-4">
            Новости и материалы
          </span>
          <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-tight leading-tight mb-4">
            Что нового<br /><span className="text-brand">у Зонд-Рекламы</span>
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            Запуски новых конструкций, изменения в рекламном законодательстве,
            акции и спецпредложения для клиентов.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {NEWS.map((item, i) => (
            <article key={i} className="bg-white border border-gray-200 rounded-xl p-7 hover:border-brand hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand/10 transition-all">
              <div className="inline-block text-xs text-brand uppercase tracking-wider mb-3.5 font-bold py-1 px-2.5 bg-brand/8 rounded">
                {item.date} · {item.category}
              </div>
              <h3 className="text-lg font-bold leading-snug mb-3.5">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.excerpt}</p>
              <Link href={item.href} className="inline-flex items-center gap-1.5 mt-4 text-brand font-bold text-xs uppercase tracking-wider hover:gap-3 transition-all">
                Читать далее →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
