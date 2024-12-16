import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/static-converter",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
