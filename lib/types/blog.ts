export const BLOG_CATEGORIES = [
  "outdoor",
  "print",
  "production",
  "design",
  "exhibition",
  "led",
  "general",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export const BLOG_CATEGORY_LABELS: Record<BlogCategory, string> = {
  outdoor: "Наружная реклама",
  print: "Печать",
  production: "Производство",
  design: "Дизайн и полиграфия",
  exhibition: "Выставки",
  led: "Светодиодная продукция",
  general: "Общее",
};

export const BLOG_CATEGORY_HREF: Record<BlogCategory, string> = {
  outdoor: "/outdoor",
  print: "/print",
  production: "/production",
  design: "/design",
  exhibition: "/exhibition",
  led: "/led",
  general: "/#services",
};

export function isValidCategory(value: string): value is BlogCategory {
  return (BLOG_CATEGORIES as readonly string[]).includes(value);
}

export type BlogPost = {
  slug: string;
  date: string;
  dateLabel: string;
  title: string;
  metaTitle?: string;
  metaDescription: string;
  excerpt: string;
  category: BlogCategory;
  tags: string[];
  image: string;
  content: string;
  readingMinutes: number;
  author?: string;
};

export function computeReadingMinutes(content: string): number {
  const words = content
    .replace(/[#*_`>\[\]()]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
