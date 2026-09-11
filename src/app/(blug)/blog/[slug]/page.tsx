import React from "react"
import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"

import { fetchDevToArticle } from "@/lib/devto"
import { LogoMark } from "@/components/ui/logo-mark"
import ArticleContent from "@/app/(blug)/blog/[slug]/_components/ArticleContent"

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await fetchDevToArticle(slug)

  if (!article) return { title: "Article not found" }

  const description = article.description ?? undefined
  const coverImage = article.social_image ?? article.cover_image
  const images = coverImage ? [coverImage] : undefined

  return {
    title: article.title,
    description,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description,
      url: `/blog/${article.slug}`,
      publishedTime: article.published_at ?? undefined,
      modifiedTime: article.edited_at ?? undefined,
      tags: article.tag_list,
      images
    },
    twitter: {
      card: images ? "summary_large_image" : "summary",
      title: article.title,
      description,
      images
    }
  }
}

const Page = async ({ params }: Props) => {
  const { slug } = await params
  const article = await fetchDevToArticle(slug)

  if (!article) notFound()

  return (
    <article className="mx-auto w-full max-w-3xl px-4 pt-10 pb-32">
      <div className="relative flex h-[300px] w-full items-center justify-center overflow-hidden rounded-lg bg-muted/60">
        <LogoMark className="size-16 text-muted-foreground/25" />
        {(article.social_image ?? article.cover_image) && (
          <Image
            src={(article.social_image ?? article.cover_image)!}
            alt={article.title}
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
          />
        )}
      </div>
      <h1 className="py-4 text-3xl font-semibold tracking-tight">{article.title}</h1>
      <ArticleContent html={article.body_html ?? ""} />
    </article>
  )
}

export default Page
