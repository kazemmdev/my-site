const DEV_TO_BASE = "https://dev.to/api/articles"
const DEVTO_USERNAME = "kazemmdev"

export type DevToArticle = {
  id: number
  title: string
  slug: string
  url: string
  cover_image: string | null
  social_image?: string | null
  description?: string | null
  published_at?: string | null
  edited_at?: string | null
  tag_list?: string[]
  body_html?: string
}

function devtoHeaders() {
  return {
    "api-key": process.env.DEVTO_API_KEY ?? "",
    "user-agent": "kazem.dev/portfolio",
    accept: "application/json"
  }
}

export async function fetchDevToArticles(page = 1, perPage = 30): Promise<DevToArticle[]> {
  const res = await fetch(
    `${DEV_TO_BASE}/latest?username=${DEVTO_USERNAME}&per_page=${perPage}&page=${page}`,
    { headers: devtoHeaders(), next: { revalidate: 3600 } }
  )
  if (!res.ok) throw new Error(`DEV.to request failed: ${res.status}`)
  return res.json()
}

export async function fetchAllDevToArticles(): Promise<DevToArticle[]> {
  const acc: DevToArticle[] = []
  let page = 1
  const perPage = 100

  while (true) {
    const batch = await fetchDevToArticles(page, perPage)
    acc.push(...batch)
    if (batch.length < perPage) break
    page += 1
  }

  return acc
}

export async function fetchDevToArticle(slug: string): Promise<DevToArticle | null> {
  const res = await fetch(`${DEV_TO_BASE}/${DEVTO_USERNAME}/${slug}`, {
    headers: devtoHeaders(),
    next: { revalidate: 300 }
  })
  if (!res.ok) return null
  return res.json()
}
