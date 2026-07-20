import React from "react"

import { INTRO } from "@/config/contents"
import { cn } from "@/lib/utils"
import { TextEffect } from "@/components/ui/text-effect"
import Footer from "@/app/(landing)/_components/footer"
import Navigator from "@/app/(landing)/_components/navigator"
import Socials from "@/app/(landing)/_components/socials"

const Sidebar = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "relative hidden flex-col justify-between pt-24 md:flex md:h-dvh md:py-36",
        className
      )}
    >
      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
          {INTRO.role}
        </p>
        <TextEffect
          per="word"
          as="h1"
          preset="slide"
          className="text-4xl font-semibold tracking-tight text-balance md:text-5xl"
        >
          {INTRO.title}
        </TextEffect>
        <TextEffect
          per="word"
          as="p"
          className="my-2 max-w-md leading-relaxed text-muted-foreground"
        >
          {INTRO.body}
        </TextEffect>
      </section>
      <section>
        <Navigator />
      </section>
      <section>
        <Socials />
        <Footer />
      </section>
    </div>
  )
}

export default Sidebar
