import type { NextConfig } from "next";
import { REDIRECTS } from "./lib/redirects";

const nextConfig: NextConfig = {
  async redirects() {
    return REDIRECTS;
  },
  async rewrites() {
    // Легаси фото-ссылки 1С: старый путь Drupal → фактическое фото конструкции.
    // /sites/default/files/content/upload/outdoor/007a_l_d.jpg → /images/constructions/007a_l_d.jpg
    // Нет файла — статик-хендлер вернёт 404 без краша.
    return [
      {
        source: "/sites/default/files/content/upload/outdoor/:file",
        destination: "/images/constructions/:file",
      },
    ];
  },
  images: {
    // Конвертация на лету выключена намеренно.
    //
    // Сервер на Timeweb — одно ядро. Пока картинки кодировались в момент
    // запроса, галерея висела серыми плашками: замер на проде дал 2,7–4,5 с
    // на 12 параллельных холодных картинок — кодирование на одном ядре просто
    // выстраивается в очередь. Кэш оптимизатора лежит в .next/cache/images и
    // стирается при каждом деплое, а бот викторины коммитит дважды в день,
    // так что кэш не успевал прогреться и всё начиналось заново.
    //
    // Вместо этого все файлы в public/images один раз приведены к 1280 px по
    // длинной стороне (JPEG q80, mozjpeg) скриптом scripts/compress-images.mjs:
    // 212 МБ → 95 МБ. Теперь Next отдаёт их статикой — сервер не считает
    // ничего, а заголовок immutable ниже кладёт их в кэш браузера на год.
    //
    // Переедем на несколько ядер — достаточно убрать этот флаг: компоненты уже
    // размечены через next/image с sizes, srcset вернётся сам собой.
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
