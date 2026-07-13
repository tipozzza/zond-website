import Link from "next/link";
import { BLOG } from "@/lib/blog-data";
import {
  BLOG_CATEGORY_LABELS,
  type BlogCategory,
  type BlogPost,
} from "@/lib/types/blog";

type RelatedService = { href: string; label: string };

type Props = {
  /** Основная категория статей для подборки (совпадает с темой страницы). */
  category: BlogCategory;
  /** Доп. категории для добора, если своих статей меньше max. */
  also?: BlogCategory[];
  /** Исключить статью по slug (например, текущую на странице статьи). */
  excludeSlug?: string;
  /** Максимум карточек статей. */
  max?: number;
  /** Заголовок секции. */
  title?: string;
  /** Смежные услуги — контекстная перелинковка услуга↔услуга. */
  relatedServices?: RelatedService[];
  /** Класс фона секции под дизайн конкретной страницы. */
  className?: string;
};

/**
 * Блок перелинковки в конце страниц услуг: подтягивает статьи блога нужной
 * категории (SEO-связка услуга → блог) и показывает смежные услуги
 * (услуга ↔ услуга). Серверный компонент — ссылки попадают прямо в HTML.
 * Если ни статей, ни смежных услуг нет — секция не рендерится.
 */
export default function RelatedArticles({
  category,
  also = [],
  excludeSlug,
  max = 3,
  title = "Читайте также",
  relatedServices,
  className = "bg-white",
}: Props) {
  const cats: BlogCategory[] = [category, ...also];
  const seen = new Set<string>();
  const picked: BlogPost[] = [];
  for (const cat of cats) {
    for (const post of BLOG) {
      if (post.category !== cat) continue;
      if (excludeSlug && post.slug === excludeSlug) continue;
      if (seen.has(post.slug)) continue;
      seen.add(post.slug);
      picked.push(post);
      if (picked.length >= max) break;
    }
    if (picked.length >= max) break;
  }

  const hasServices = !!relatedServices && relatedServices.length > 0;
  if (picked.length === 0 && !hasServices) return null;

  return (
    <section className={`py-12 md:py-16 ${className}`}>
      <div className="max-w-[1280px] mx-auto px-6">
        {picked.length > 0 && (
          <>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              {title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {picked.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blog/${item.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-xs font-semibold text-brand px-2.5 py-1 rounded-full">
                      {BLOG_CATEGORY_LABELS[item.category] || item.category}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <time>{item.dateLabel}</time>
                      <span>~{item.readingMinutes} мин</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-brand transition">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-3 mb-4 flex-1">
                      {item.excerpt}
                    </p>
                    <span className="text-sm font-semibold text-brand mt-auto">
                      Читать статью →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {hasServices && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <span className="text-slate-600 font-medium">Смежные услуги:</span>
            {relatedServices!.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-700 font-semibold text-sm hover:border-brand hover:text-brand transition"
              >
                {s.label} →
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
