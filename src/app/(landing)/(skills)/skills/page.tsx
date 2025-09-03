import React from "react"

import { SKILLS } from "@/config/contents"
import { Box, BoxContent, Boxes, BoxTitle } from "@/components/ui/boxes"

const Page = () => {
  return (
    <Boxes>
      {SKILLS.map((skill, index) => (
        <Box key={index}>
          <BoxTitle className="space-y-2 p-5">
            <h3 className="text-xl font-bold text-left">{skill.title}</h3>
            <p className="text-left opacity-80">{skill.items?.join(", ")}</p>
          </BoxTitle>
          <BoxContent className="pointer-events-auto relative flex h-auto w-full flex-col rounded-md p-6 overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900 sm:w-[500px]">
            <div className="space-y-2 p-5">
              <h3 className="text-xl font-bold text-left">{skill.title}</h3>
              <p className="text-left opacity-80">{skill.items?.join(", ")}</p>
              <p>{skill.body}</p>
            </div>
          </BoxContent>
        </Box>
      ))}
    </Boxes>
  )
}

export default Page
