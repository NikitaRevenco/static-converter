import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverComponentsExternalPackages: ["vscode-oniguruma", "shiki"],
};

export default nextConfig;
