export function buildOgUrl(params: {
  title: string;
  subtitle?: string;
  category?: string;
}): string {
  const qs = new URLSearchParams();
  qs.set("title", params.title);
  if (params.subtitle) qs.set("subtitle", params.subtitle);
  if (params.category) qs.set("category", params.category);
  return `/api/og?${qs.toString()}`;
}
