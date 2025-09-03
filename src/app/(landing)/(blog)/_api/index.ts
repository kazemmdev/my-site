import { useInfiniteQuery } from "@tanstack/react-query"

export type DevToArticle = {
  id: number
  title: string
  url: string
  cover_image: string | null
  description?: string | null
  published_at?: string | null
  tag_list?: string[]
}

const PER_PAGE = 6

async function fetchMyArticles({ pageParam = 1 }: { pageParam?: number }) {
  const res = await fetch(`/api/devto/articles?per_page=${PER_PAGE}&page=${pageParam}`, {
    cache: "no-store"
  })
  if (!res.ok) throw new Error(`DEV.to proxy failed: ${res.status}`)
  const data = (await res.json()) as DevToArticle[]
  return { items: data, page: pageParam }
}

export function useGetBlogArticlesQuery() {
  return useInfiniteQuery({
    queryKey: ["articles"],
    queryFn: ({ pageParam }) => fetchMyArticles({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: last => (last.items.length < PER_PAGE ? undefined : last.page + 1),
    staleTime: 5 * 60 * 1000
  })
}
