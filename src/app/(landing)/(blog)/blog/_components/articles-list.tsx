"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Rss } from "lucide-react"

import { Box, Boxes } from "@/components/ui/boxes"
import { Skeleton } from "@/components/ui/skeleton"
import ListInfinite from "@/components/list-infinite"
import { DevToArticle, useGetBlogArticlesQuery } from "@/app/(landing)/(blog)/_api"

const BlogPlaceholder = () => (
  <div className="col-span-full flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-card/50 px-6 py-16 text-center">
    <span className="flex size-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
      <Rss className="size-5" />
    </span>
    <p className="font-medium">Articles can’t be loaded right now</p>
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
              <div className="relative h-48 w-full overflow-hidden bg-muted">
                {article.cover_image && (
                  <Image src={article.cover_image} alt="post cover" fill className="object-cover" />
                )}
              </div>
              <div className="px-5 pt-3 pb-4">
                <h3 className="text-base font-semibold">{article.title}</h3>
              </div>
            </div>
          </Box>
        )}
        renderLoader={() => <Skeleton className="h-52 w-full" />}
        renderEmpty={() => <BlogPlaceholder />}
      />
    </Boxes>
  )
}

export default ArticlesList
