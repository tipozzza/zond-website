import { MetadataRoute } from "next";
import { NEWS } from "@/lib/news-data";

const BASE_URL = "https://zond-website.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE_URL, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/outdoor`, priority: 0.9, changeFrequency: "daily" as const },
    { url: `${BASE_URL}/print`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/production`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/design`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/exhibition`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/led`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/about`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/contacts`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/news`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/russifikaciya`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/privacy`, priority: 0.3, changeFrequency: "yearly" as const },
  ].map((p) => ({ ...p, lastModified: new Date() }));

  const newsPages = NEWS.map((item) => ({
    url: `${BASE_URL}/news/${item.slug}`,
    lastModified: new Date(item.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...newsPages];
}
