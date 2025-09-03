"use client"

import React from "react"
import Image from "next/image"

import { useGetArticleQuery } from "@/app/(blug)/blog/[slug]/_api"
import ArticleContent from "@/app/(blug)/blog/[slug]/_components/ArticleContent";

const Page = () => {
  const { data, isLoading } = useGetArticleQuery()
    if (isLoading) return <div>Loading...</div>
  return (
    <article className="w-full max-w-3xl mx-auto pt-10 pb-32">
      <div className="w-full h-[300px] relative overflow-hidden rounded-md">
        <Image src={data.cover_image!} alt="post cover" fill className="object-cover" />
      </div>
      <h1 className="text-3xl font-semibold py-3">{data?.title}</h1>
        <ArticleContent html={data?.body_html} />
    </article>
  )
}

export default Page
