import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.SITE_URL || "https://vendricksystems.com";
  return ["", "/services", "/about", "/projects", "/contact", "/privacy", "/demo", "/careers", "/updates", "/suppliers", "/investors"].map(
    (path) => ({ url: base + path }),
  );
}
