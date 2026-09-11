import React from "react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { fetchDevToArticle } from "@/lib/devto"
import { formatDate } from "@/lib/utils"
import { LogoMark } from "@/components/ui/logo-mark"
import { ArticleCover } from "@/components/article-cover"
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

  const date = formatDate(article.published_at)

  return (
    <article className="mx-auto w-full max-w-3xl px-4 pt-10 pb-32">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Back to blog
      </Link>

      <ArticleCover
        image={article.social_image ?? article.cover_image}
        title={article.title}
        authorName={article.user?.name}
        authorAvatar={article.user?.profile_image_90}
        publishedAt={article.published_at}
        sizes="(min-width: 768px) 768px, 100vw"
        className="mt-4 h-[300px] rounded-lg"
      />

      <h1 className="pt-6 text-3xl font-semibold tracking-tight text-balance">{article.title}</h1>

      <div className="mt-4 flex items-center gap-3">
        {article.user?.profile_image_90 ? (
          <Image
            src={article.user.profile_image_90}
            alt={article.user.name ?? "Author"}
            width={36}
            height={36}
            className="size-9 rounded-full object-cover"
          />
        ) : (
          <LogoMark className="size-9 text-muted-foreground/40" />
        )}
        <div className="text-sm leading-tight">
          <p className="font-medium text-foreground">{article.user?.name ?? "Kazem"}</p>
          <p className="text-xs text-muted-foreground">
            {date}
            {date && article.reading_time_minutes ? " · " : ""}
            {article.reading_time_minutes && `${article.reading_time_minutes} min read`}
          </p>
        </div>
      </div>

      {article.tag_list && article.tag_list.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {article.tag_list.map(tag => (
            <span
              key={tag}
              className="rounded-md border border-border bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <hr className="pb-4 mt-6 border-border" />

      <ArticleContent html={article.body_html ?? ""} />
    </article>
  )
}

export default Page
