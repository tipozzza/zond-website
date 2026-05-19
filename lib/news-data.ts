import newsJson from "./news.json";

export type NewsItem = {
  slug: string;
  date: string;
  dateLabel: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  externalUrl?: string;
};

export const NEWS: NewsItem[] = newsJson as NewsItem[];
