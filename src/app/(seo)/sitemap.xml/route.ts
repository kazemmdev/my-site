import { NextRequest } from "next/server"

export const runtime = "edge"
export const dynamic = "force-dynamic"

type Article = { slug: string; updated_at?: string }
type Course = { uuid: string; updated_at?: string }

async function fetchAll<T>(url: string): Promise<T[]> {
  const acc: T[] = []

  while (url) {
    const res = await fetch(url, {
      headers: { accept: "application/json" },
      next: { revalidate: 3600 }
    })

    if (!res.ok) throw new Error(`API ${url} → ${res.status}`)

    const json = await res.json().catch(() => {
      throw new Error(`Non-JSON at ${url}`)
    })

    acc.push(...(json.data as T[]))
    url = json.links?.next ?? null
  }
  return acc
}

export async function GET(req: NextRequest) {
  const host = req.headers.get("host") ?? "gradeup.app"
  const base = `https://${host}`

  const API = (process.env.NEXT_PUBLIC_API_URL ?? "https://gradeup.app/api/v1/").replace(
    /\/?$/,
    "/"
  )

  const [articles, courses] = await Promise.all([
    fetchAll<Article>(`${API}categories/latest/articles?page=1`),
    fetchAll<Course>(`${API}courses?page=1`)
  ])

  const urls: any[] = [
    { url: `${base}/`, priority: 1.0 },
    ...articles.map(a => ({
      url: `${base}/blog/${a.slug}`,
      lastModified: a.updated_at,
      changeFrequency: "weekly",
      priority: 0.8
    })),
    ...courses.map(c => ({
      url: `${base}/courses/${c.uuid}`,
      lastModified: c.updated_at,
      changeFrequency: "weekly",
      priority: 0.8
    }))
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    u => `<url>
  <loc>${u.url}</loc>${u.lastModified ? `\n  <lastmod>${u.lastModified}</lastmod>` : ""}
  <changefreq>${u.changeFrequency ?? "monthly"}</changefreq>
  <priority>${u.priority ?? 0.5}</priority>
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
