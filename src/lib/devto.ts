const DEV_TO_BASE = "https://dev.to/api/articles"
const DEVTO_USERNAME = "kazemmdev"

export type DevToAuthor = {
  name?: string
  username?: string
  profile_image?: string
  profile_image_90?: string
}

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
  reading_time_minutes?: number
  tag_list?: string[]
  body_html?: string
  user?: DevToAuthor
}

function devtoHeaders() {
  return {
    "api-key": process.env.DEVTO_API_KEY ?? "",
    "user-agent": "kazem.dev/portfolio",
    accept: "application/json"
  }
}

// DEV.to's single-article endpoint returns `tag_list` as a comma-separated
// string (and the array lives in `tags` instead) while the list endpoint
// returns `tag_list` as an array — normalize both shapes to string[].
function normalizeTagList(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw.filter((t): t is string => typeof t === "string" && t.length > 0)
  if (typeof raw === "string")
    return raw
      .split(",")
      .map(t => t.trim())
      .filter(Boolean)
  return []
}

function normalizeArticle<T extends { tag_list?: unknown; tags?: unknown }>(
  article: T
): Omit<T, "tag_list"> & { tag_list: string[] } {
  return { ...article, tag_list: normalizeTagList(article.tag_list ?? article.tags) }
}

export async function fetchDevToArticles(page = 1, perPage = 30): Promise<DevToArticle[]> {
  const res = await fetch(
    `${DEV_TO_BASE}/latest?username=${DEVTO_USERNAME}&per_page=${perPage}&page=${page}`,
    { headers: devtoHeaders(), next: { revalidate: 3600 } }
  )
  if (!res.ok) throw new Error(`DEV.to request failed: ${res.status}`)
  const articles = (await res.json()) as DevToArticle[]
  return articles.map(normalizeArticle)
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
  return normalizeArticle((await res.json()) as DevToArticle)
}
