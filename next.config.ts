import type { NextConfig } from "next"

const isProd = process.env.NODE_ENV === "production"

const nextConfig: NextConfig = {
  reactStrictMode: isProd,
  images: {
    // Dev only: fake-IP proxies/VPNs resolve dev.to to 198.18.x.x, which Next's
    // SSRF guard rejects as private. Production keeps the guard.
    dangerouslyAllowLocalIP: !isProd,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      },
      {
        protocol: "http",
        hostname: "localhost"
      }
    ]
  }
}

export default nextConfig
