import type { MetadataRoute } from "next";
import { SITE } from "@/lib/utils";
import { getAllPosts } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const posts = await getAllPosts();
  const blogEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    priority: 0.7,
  }));

  return [
    { url: `${SITE.url}/`, lastModified: now, priority: 1.0 },
    { url: `${SITE.url}/services`, lastModified: now, priority: 0.9 },
    {
      url: `${SITE.url}/services/ai-integration`,
      lastModified: now,
      priority: 0.9,
    },
    { url: `${SITE.url}/about`, lastModified: now, priority: 0.7 },
    { url: `${SITE.url}/contact`, lastModified: now, priority: 0.8 },
    { url: `${SITE.url}/blog`, lastModified: now, priority: 0.6 },
    ...blogEntries,
  ];
}
