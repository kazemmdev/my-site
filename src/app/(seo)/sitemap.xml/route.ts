import { NextRequest } from "next/server"

import { fetchAllDevToArticles } from "@/lib/devto"

export const runtime = "edge"
export const dynamic = "force-dynamic"

type UrlEntry = {
  url: string
  lastModified?: string | null
  changeFrequency: string
  priority: number
}

export async function GET(req: NextRequest) {
  const host = req.headers.get("host") ?? "kazemm.dev"
  const base = `https://${host}`

  const articles = await fetchAllDevToArticles().catch(() => [])

  const urls: UrlEntry[] = [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1.0 },
    { url: `${base}/skills`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/blog`, changeFrequency: "weekly", priority: 0.8 },
    ...articles.map(a => ({
      url: `${base}/blog/${a.slug}`,
      lastModified: a.edited_at ?? a.published_at,
      changeFrequency: "weekly",
      priority: 0.7
    }))
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    u => `<url>
  <loc>${u.url}</loc>${u.lastModified ? `\n  <lastmod>${new Date(u.lastModified).toISOString()}</lastmod>` : ""}
  <changefreq>${u.changeFrequency}</changefreq>
  <priority>${u.priority}</priority>
</url>`
  )
  .join("\n")}
</urlset>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400"
    }
  })
}
