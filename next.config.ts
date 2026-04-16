import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/Invoice-followup',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
