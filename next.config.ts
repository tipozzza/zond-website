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
    // Только WebP, без AVIF. Замеры на проде (1 ядро): кодирование AVIF идёт
    // в 2,4 раза дольше WebP (2951 мс против 1205 мс на четырёх картинках) и
    // при этом даёт файлы БОЛЬШЕ (246 КБ против 228 КБ). Для нашего железа
    // AVIF — чистый проигрыш: галерея висела серой, пока сервер их кодировал.
    formats: ["image/webp"],
    // Убраны 2048 и 3840: контентная колонка на сайте не шире ~1280 px, такие
    // варианты почти не запрашиваются, но каждый стоит дорого при генерации.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
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
      {
        source: "/_next/image",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
