import React from "react"

import { INTRO } from "@/config/contents"
import { TextEffect } from "@/components/ui/text-effect"
import Footer from "@/app/(landing)/_components/footer"
import Navigator from "@/app/(landing)/_components/navigator"
import Socials from "@/app/(landing)/_components/socials"

const Sidebar = () => {
  return (
    <div className="relative h-dvh py-40 flex flex-col justify-between">
      <section title="bio" className="flex flex-col gap-2">
        <TextEffect per="word" as="h1" preset="slide" className="text-5xl font-bold">
          {INTRO.title}
        </TextEffect>
        <TextEffect per="word" as="p" className="text-gray-300 my-3">
          {INTRO.body}
        </TextEffect>
      </section>
      <section title="Navigation">
        <Navigator />
      </section>
      <section title="Contact">
        <Socials />
        <Footer />
      </section>
    </div>
  )
}

export default Sidebar
