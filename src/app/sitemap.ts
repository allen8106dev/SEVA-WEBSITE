import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return siteConfig.indexable && siteConfig.url
    ? [{ url: siteConfig.url.href }]
    : [];
}
