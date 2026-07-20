import React from "react"

import { SKILLS } from "@/config/contents"
import { Box, BoxContent, Boxes, BoxTitle } from "@/components/ui/boxes"

const Page = () => {
  return (
    <Boxes>
      {SKILLS.map((skill, index) => (
        <Box key={index}>
          <BoxTitle className="space-y-2 p-6">
            <h3 className="text-left text-lg font-semibold">{skill.title}</h3>
            <p className="text-left text-sm text-muted-foreground">{skill.items?.join(", ")}</p>
          </BoxTitle>
          <BoxContent className="pointer-events-auto relative flex h-auto w-full flex-col overflow-hidden rounded-lg border border-border bg-popover p-6 text-popover-foreground sm:w-[500px]">
            <div className="space-y-3 p-2">
              <h3 className="text-left text-lg font-semibold">{skill.title}</h3>
              <div className="flex flex-wrap gap-1.5">
                {skill.items?.map(item => (
                  <span
                    key={item}
                    className="rounded-md border border-border bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{skill.body}</p>
            </div>
          </BoxContent>
        </Box>
      ))}
    </Boxes>
  )
}

export default Page
