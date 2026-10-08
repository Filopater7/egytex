import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow any HTTPS image source.
    // Admins paste product images from various hosts, so we allow all.
    // If you want to lock this down for production, replace the wildcard
    // with specific hostnames, e.g. { hostname: "your-cdn.com" }.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
