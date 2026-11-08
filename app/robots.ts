import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  const base = process.env.SITE_URL || "https://vendricksystems.com";
  return {
    rules: {
      userAgent: "*",
      ...(process.env.SITE_INDEXABLE === "true"
        ? { allow: "/" }
        : { disallow: "/" }),
    },
    sitemap: base + "/sitemap.xml",
  };
}
