import React from "react"
import Image from "next/image"

import { INTRO } from "@/config/contents"
import { cn } from "@/lib/utils"
import { TextEffect } from "@/components/ui/text-effect"
import Footer from "@/app/(landing)/_components/footer"
import Navigator from "@/app/(landing)/_components/navigator"
import Socials from "@/app/(landing)/_components/socials"

// Each intro paragraph starts once the previous one has revealed (0.05s per word).
const paragraphDelay = (index: number) =>
  INTRO.body.slice(0, index).reduce((words, p) => words + p.split(/\s+/).length, 0) * 0.05

const Sidebar = ({ className }: { className?: string }) => {
  // Vertical padding is 9rem on tall screens and shrinks on short ones so the
  // intro, nav, and socials still fit in one viewport.
  return (
    <div
      className={cn(
        "relative hidden flex-col justify-between pt-24 md:flex md:h-dvh md:py-[clamp(2rem,calc((100dvh_-_40rem)/2),9rem)]",
        className
      )}
    >
      <section className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Image
            src={INTRO.avatar}
            alt="Kazem Mirzaei"
            width={48}
            height={48}
            priority
            className="size-12 rounded-full ring-1 ring-border"
          />
          <p className="text-product-label font-semibold text-muted-foreground">{INTRO.role}</p>
        </div>
        <TextEffect
          per="word"
          as="h1"
          preset="slide"
          className="text-hero-product-name font-semibold text-balance md:text-headline"
        >
          {INTRO.title}
        </TextEffect>
        <div className="my-2 max-w-md space-y-3">
          {INTRO.body.map((paragraph, index) => (
            <TextEffect
              key={paragraph}
              per="word"
              as="p"
              delay={paragraphDelay(index)}
              className="text-section-nav text-muted-foreground"
            >
              {paragraph}
            </TextEffect>
          ))}
        </div>
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
