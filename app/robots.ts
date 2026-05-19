import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/admin/", "/_next/"],
      },
    ],
    sitemap: "https://zond-website.vercel.app/sitemap.xml",
    host: "zond-website.vercel.app",
  };
}
