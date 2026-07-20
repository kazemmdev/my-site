"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"

import { LogoMark } from "@/components/ui/logo-mark"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetArticleQuery } from "@/app/(blug)/blog/[slug]/_api"
import ArticleContent from "@/app/(blug)/blog/[slug]/_components/ArticleContent"

const Page = () => {
  const { data, isLoading, isError } = useGetArticleQuery()

  if (isLoading)
    return (
      <div className="mx-auto w-full max-w-3xl px-4 pt-10 pb-32">
        <div className="shimmer relative flex h-[300px] w-full items-center justify-center rounded-lg bg-muted/60">
          <LogoMark className="size-16 text-muted-foreground/25" />
        </div>
        <Skeleton className="mt-6 h-8 w-2/3" />
        <Skeleton className="mt-4 h-4 w-full" />
        <Skeleton className="mt-2 h-4 w-5/6" />
      </div>
    )

  if (isError || !data)
    return (
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-3 px-4 pt-24 pb-32 text-center">
        <LogoMark className="size-14 text-muted-foreground/40" />
        <p className="text-lg font-medium">This article can’t be loaded right now</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          You can find all of my posts on DEV Community instead.
        </p>
        <div className="flex items-center gap-5 pt-2">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> Back to blog
          </Link>
          <Link
            href="https://dev.to/kazemmdev"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            Read on dev.to <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    )

  return (
    <article className="mx-auto w-full max-w-3xl px-4 pt-10 pb-32">
      <div className="relative flex h-[300px] w-full items-center justify-center overflow-hidden rounded-lg bg-muted/60">
        <LogoMark className="size-16 text-muted-foreground/25" />
        {data.cover_image && (
          <Image
            src={data.cover_image}
            alt="post cover"
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
          />
        )}
      </div>
      <h1 className="py-4 text-3xl font-semibold tracking-tight">{data.title}</h1>
      <ArticleContent html={data.body_html} />
    </article>
  )
}

export default Page
