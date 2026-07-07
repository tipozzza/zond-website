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
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
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
