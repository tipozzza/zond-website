type Crumb = { name: string; url: string };

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `https://zond-website.vercel.app${item.url}`,
    })),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <nav aria-label="Хлебные крошки" className="text-sm text-slate-500 py-3 container mx-auto px-4">
        {items.map((item, i) => (
          <span key={i}>
            {i > 0 && " / "}
            {i === items.length - 1 ? (
              <span className="text-slate-800">{item.name}</span>
            ) : (
              <a href={item.url} className="hover:text-brand">
                {item.name}
              </a>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
