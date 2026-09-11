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
        image && "bg-muted/60",
        className
      )}
    >
      {image ? (
        <>
          <LogoMark className="size-16 text-muted-foreground/25" />
          <Image src={image} alt={title} fill sizes={sizes} className="object-cover" />
        </>
      ) : (
        <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/15 via-primary/5 to-transparent">
          <LogoMark className="absolute size-24 text-primary/10" />
          <div className="relative flex items-center gap-2.5 rounded-full border border-border/70 bg-card/90 px-4 py-2 shadow-xs backdrop-blur-sm">
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
            <div className="text-left leading-tight">
              {authorName && <p className="text-sm font-medium text-foreground">{authorName}</p>}
              {date && <p className="text-xs text-muted-foreground">{date}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export { ArticleCover }
