import type { MetadataRoute } from "next";
import { getAllProducts, getAllPosts } from "@/sanity/lib/sanity";

export const revalidate = 3600;

const BASE = "https://www.bodidoc.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, posts] = await Promise.all([
    getAllProducts().catch(() => []),
    getAllPosts().catch(() => []),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,                                              lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/shop`,                                    lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/shop/tissue-oil-range`,                   lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/shop/aqueous-range`,                      lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/moments`,                                 lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/about-us`,                                lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/contact-us`,                              lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/competitions`,                            lastModified: new Date(), changeFrequency: "weekly",  priority: 0.75 },
    { url: `${BASE}/trade-book`,                              lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/terms-conditions-privacy-policy`,         lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
  ];

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE}/shop/${p.slug.current}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE}/moments/${post.slug.current}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...productPages, ...postPages];
}
