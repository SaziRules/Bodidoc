import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio/", "/admin/", "/api/", "/_next/image"],
      },
    ],
    sitemap: "https://www.bodidoc.com/sitemap.xml",
  };
}
