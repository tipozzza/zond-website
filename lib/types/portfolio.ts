export type PortfolioItem = {
  id: string;
  image: string;
  title: string;
  description: string;
  order: number;
  createdAt: string;
  /**
   * Год реализации проекта. Опционально — работы без года уходят в конец
   * списка при сортировке по completionYear DESC.
   */
  completionYear?: number | null;
};

export type PortfolioCategory = {
  title: string;
  slug: string;
  items: PortfolioItem[];
};

export type PortfolioData = Record<string, PortfolioCategory>;

export const PORTFOLIO_CATEGORIES = [
  "outdoor",
  "print",
  "production",
  "exhibition",
  "design",
  "led",
] as const;

export type CategorySlug = (typeof PORTFOLIO_CATEGORIES)[number];

export function isValidCategory(slug: string): slug is CategorySlug {
  return (PORTFOLIO_CATEGORIES as readonly string[]).includes(slug);
}
