import type { NextConfig } from "next";
import withPwa from 'next-pwa';

const isProd = process.env.NODE_ENV === "production"

const pwaConfig = {
  dest: "public",
  disable: !isProd,
  register: true,
  dynamicStartUrl: true,
  skipWaiting: true,
}

const nextConfig: NextConfig = withPwa(pwaConfig)({
  reactStrictMode: isProd,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kazemm.dev",
      },
      {
        protocol: "https",
        hostname: "*.kazemm.dev",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  webpack: (config: any) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    })
    return config
  },
});

export default nextConfig;
