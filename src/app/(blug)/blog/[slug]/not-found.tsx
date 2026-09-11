import React from "react"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"

import { LogoMark } from "@/components/ui/logo-mark"

const NotFound = () => (
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

export default NotFound
