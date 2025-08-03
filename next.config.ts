import type { NextConfig } from "next"
import withSerwistInit from "@serwist/next"

const isProd = process.env.NODE_ENV === "production"

const nextConfig: NextConfig = {
  reactStrictMode: isProd,
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kazemm.dev"
      },
      {
        protocol: "https",
        hostname: "*.kazemm.dev"
      },
      {
        protocol: "http",
        hostname: "localhost"
      }
    ]
  },
  webpack: (config: any) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    })
    return config
  }
}

const withSerwist = withSerwistInit({
  // Note: This is only an example. If you use Pages Router,
  // use something else that works, such as "service-worker/index.ts".
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js"
})

export default withSerwist(nextConfig)
