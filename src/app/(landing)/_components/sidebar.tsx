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
        "relative hidden md:flex md:h-dvh pt-32 md:py-40 flex-col justify-between",
        className
      )}
    >
      <section className="flex flex-col gap-2">
        <TextEffect per="word" as="h1" preset="slide" className="text-5xl font-bold">
          {INTRO.title}
        </TextEffect>
        <TextEffect per="word" as="p" className="text-gray-300 my-3">
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
