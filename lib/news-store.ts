import { getFile, putFile } from "@/lib/github-api";

/**
 * Хранилище новостей. Источник правды для публичного рендера — lib/news.json
 * (его статически импортит lib/news-data.ts). public/data/news.json — зеркало,
 * которое держим в синхроне (двойная синхронизация). Все записи новостей идут
 * через writeNewsBoth, чтобы оба файла оставались идентичными.
 */
export const NEWS_LIB_PATH = "lib/news.json";
export const NEWS_PUBLIC_PATH = "public/data/news.json";

export async function writeNewsBoth(
  news: unknown[],
  message: string,
  libSha?: string,
): Promise<void> {
  const content = JSON.stringify(news, null, 2);
  // lib/news.json — рендерится сайтом
  const libVersion = libSha ?? (await getFile(NEWS_LIB_PATH))?.sha;
  await putFile(NEWS_LIB_PATH, content, message, libVersion);
  // public/data/news.json — зеркало (тот же контент)
  const pub = await getFile(NEWS_PUBLIC_PATH);
  await putFile(NEWS_PUBLIC_PATH, content, message, pub?.sha);
}
