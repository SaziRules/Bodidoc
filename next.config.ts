import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bodidoc1.optimizedit.co.za",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
      },
    ],
    minimumCacheTTL: 2592000, // 30 days — prevents repeat bot hits from re-invoking the function
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;