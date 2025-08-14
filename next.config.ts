import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages
  output: "export",
  // Base path for GitHub Pages: https://<user>.github.io/horntail-timer
  basePath: isProd ? "/horntail-timer" : undefined,
  // Ensure images work without Image Optimization on static hosting
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
