"use client"

import React from "react"
import Link from "next/link"
import { ArrowUpRight, Rss } from "lucide-react"

import { formatDate } from "@/lib/utils"
import { Box, Boxes } from "@/components/ui/boxes"
import { LogoMark } from "@/components/ui/logo-mark"
import { ArticleCover } from "@/components/article-cover"
import ListInfinite from "@/components/list-infinite"
import { DevToArticle, useGetBlogArticlesQuery } from "@/app/(landing)/(blog)/_api"

const BlogPlaceholder = () => (
  <div className="col-span-full flex flex-col items-center justify-center gap-3 rounded-card border border-dashed border-border bg-card px-6 py-16 text-center">
    <LogoMark className="size-12 text-muted-foreground/40" />
    <p className="flex items-center gap-2 text-product-label font-semibold">
      <Rss className="size-4 text-muted-foreground" /> Articles can’t be loaded right now
    </p>
    <p className="max-w-sm text-body leading-relaxed text-muted-foreground">
      My latest posts live on DEV Community — you can read everything there while this page takes
      a break.
    </p>
    <Link
      href="https://dev.to/kazemmdev"
      target="_blank"
      rel="noopener"
      className="inline-flex items-center gap-1 text-body font-medium text-link hover:underline"
    >
      Read on dev.to <ArrowUpRight className="size-4" />
    </Link>
  </div>
)

const ArticleCardSkeleton = () => (
  <div className="shimmer overflow-hidden rounded-card border border-border bg-card">
    <div className="flex h-48 w-full items-center justify-center bg-muted/50">
      <LogoMark className="size-12 text-muted-foreground/25" />
    </div>
    <div className="space-y-2 px-5 pt-3 pb-4">
      <div className="h-4 w-3/4 rounded bg-muted" />
      <div className="h-4 w-1/2 rounded bg-muted" />
    </div>
  </div>
)

const ArticlesList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useGetBlogArticlesQuery()

  return (
    <Boxes className="!grid-cols-1">
      <ListInfinite
        data={data}
        hasMore={hasNextPage}
        nextPage={fetchNextPage}
        loading={isFetchingNextPage || isFetching}
        className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2"
        renderItem={(article: DevToArticle) => {
          const date = formatDate(article.published_at)

          return (
            <Box key={article.id} url={`/blog/${article.slug}`}>
              <div>
                <ArticleCover
                  image={article.social_image ?? article.cover_image}
                  title={article.title}
                  authorName={article.user?.name}
                  authorAvatar={article.user?.profile_image_90}
                  publishedAt={article.published_at}
                  sizes="(min-width: 768px) 320px, 100vw"
                  className="h-48"
                />
                <div className="px-5 pt-3 pb-4">
                  <h3 className="text-product-label font-semibold">{article.title}</h3>
                  {(date || article.reading_time_minutes) && (
                    <p className="mt-1.5 text-utility-nav text-muted-foreground">
                      {date}
                      {date && article.reading_time_minutes ? " · " : ""}
                      {article.reading_time_minutes && `${article.reading_time_minutes} min read`}
                    </p>
                  )}
                </div>
              </div>
            </Box>
          )
        }}
        renderLoader={() => (
          <>
            {Array.from({ length: 4 }, (_, i) => (
              <ArticleCardSkeleton key={i} />
            ))}
          </>
        )}
        renderEmpty={() => <BlogPlaceholder />}
      />
    </Boxes>
  )
}

export default ArticlesList
