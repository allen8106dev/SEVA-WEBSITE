import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // The local dev cache served homepage CSS in place of globals.css.
  // Avoid restoring that generated state across dev sessions; production is unchanged.
  experimental: { turbopackFileSystemCacheForDev: false },
};

export default nextConfig;
