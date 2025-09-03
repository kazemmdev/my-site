import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

async function fetchMyArticle(slug: string) {
  const res = await fetch(`/api/devto/articles/${slug}`, {
    cache: "no-store"
  })
  if (!res.ok) throw new Error(`DEV.to proxy failed: ${res.status}`)
  return await res.json()
}

export function useGetArticleQuery() {
  const { slug } = useParams()
  return useQuery({
    queryKey: ["article", slug],
    queryFn: () => fetchMyArticle(slug?.toString()!),
    staleTime: 5 * 60 * 1000
  })
}
