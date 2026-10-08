import React from "react"
import Image from "next/image"

import { cn, formatDate } from "@/lib/utils"
import { LogoMark } from "@/components/ui/logo-mark"

type ArticleCoverProps = {
  image?: string | null
  title: string
  authorName?: string | null
  authorAvatar?: string | null
  publishedAt?: string | null
  sizes: string
  className?: string
}

const ArticleCover = ({
  image,
  title,
  authorName,
  authorAvatar,
  publishedAt,
  sizes,
  className
}: ArticleCoverProps) => {
  const date = formatDate(publishedAt)

  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-center overflow-hidden",
        image && "bg-muted/50",
        className
      )}
    >
      {image ? (
        <>
          <LogoMark className="size-16 text-muted-foreground/25" />
          <Image src={image} alt={title} fill sizes={sizes} className="object-cover" />
        </>
      ) : (
        <div className="relative flex h-full w-full items-center justify-center bg-muted/50">
          <LogoMark className="absolute size-24 text-muted-foreground/15" />
          <div className="relative flex items-center gap-2.5 rounded-full border border-border bg-card/80 px-4 py-2 backdrop-blur-md">
            {authorAvatar ? (
              <Image
                src={authorAvatar}
                alt={authorName ?? "Author"}
                width={32}
                height={32}
                className="size-8 rounded-full object-cover"
              />
            ) : (
              <div className="flex size-8 items-center justify-center rounded-full bg-muted">
                <LogoMark className="size-4 text-muted-foreground/50" />
              </div>
            )}
            <div className="text-start">
              {authorName && <p className="text-body font-medium text-foreground">{authorName}</p>}
              {date && <p className="text-utility-nav text-muted-foreground">{date}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export { ArticleCover }
