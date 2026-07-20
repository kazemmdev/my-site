"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Rss } from "lucide-react"

import { Box, Boxes } from "@/components/ui/boxes"
import { LogoMark } from "@/components/ui/logo-mark"
import ListInfinite from "@/components/list-infinite"
import { DevToArticle, useGetBlogArticlesQuery } from "@/app/(landing)/(blog)/_api"

const BlogPlaceholder = () => (
  <div className="col-span-full flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-card/50 px-6 py-16 text-center">
    <LogoMark className="size-12 text-muted-foreground/40" />
    <p className="flex items-center gap-2 font-medium">
      <Rss className="size-4 text-primary" /> Articles can’t be loaded right now
    </p>
    <p className="max-w-sm text-sm text-muted-foreground">
      My latest posts live on DEV Community — you can read everything there while this page takes
      a break.
    </p>
    <Link
      href="https://dev.to/kazemmdev"
      target="_blank"
      rel="noopener"
      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
    >
      Read on dev.to <ArrowUpRight className="size-4" />
    </Link>
  </div>
)

const ArticleCardSkeleton = () => (
  <div className="shimmer overflow-hidden rounded-lg border border-border bg-card">
    <div className="flex h-48 w-full items-center justify-center bg-muted/60">
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
        renderItem={(article: DevToArticle) => (
          <Box key={article.id} url={`/blog/${article.id}`}>
            <div>
              <div className="relative flex h-48 w-full items-center justify-center overflow-hidden bg-muted/60">
                <LogoMark className="size-12 text-muted-foreground/25" />
                {article.cover_image && (
                  <Image
                    src={article.cover_image}
                    alt="post cover"
                    fill
                    sizes="(min-width: 768px) 320px, 100vw"
                    className="object-cover"
                  />
                )}
              </div>
              <div className="px-5 pt-3 pb-4">
                <h3 className="text-base font-semibold">{article.title}</h3>
              </div>
            </div>
          </Box>
        )}
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
