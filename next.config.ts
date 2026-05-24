import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
    viewTransition: true,
  },
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
    ];
  },
};

export default config;
