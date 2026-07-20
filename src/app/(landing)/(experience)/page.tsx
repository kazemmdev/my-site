import React from "react"

import { EDUCATION, EXPERIENCES } from "@/config/contents"
import { Box, BoxContent, Boxes, BoxTitle } from "@/components/ui/boxes"

const Page = () => {
  return (
    <Boxes>
      {EXPERIENCES.map((expr, index) => (
        <Box key={index}>
          <BoxTitle className="space-y-2 p-6">
            <h3 className="text-left text-lg font-semibold">{expr.title}</h3>
            <p className="text-left text-sm text-muted-foreground">{expr.timeframe}</p>
          </BoxTitle>
          <BoxContent className="pointer-events-auto relative flex h-auto w-full flex-col overflow-hidden rounded-lg border border-border bg-popover p-6 text-popover-foreground sm:w-[500px]">
            <div className="space-y-3 p-2">
              <h3 className="text-left text-lg font-semibold">{expr.title}</h3>
              <p className="text-left text-sm text-muted-foreground">{expr.timeframe}</p>
              <ul className="list-disc space-y-1.5 pl-5 marker:text-primary">
                {expr.details.map((detail, index) => (
                  <li key={index} className="text-sm leading-relaxed">
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </BoxContent>
        </Box>
      ))}
      {EDUCATION.map((edu, index) => (
        <div
          key={`edu-${index}`}
          className="flex h-full flex-col justify-start rounded-lg border border-border bg-card p-6 text-card-foreground shadow-xs"
        >
          <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
            Education
          </p>
          <h3 className="mt-2 text-left text-lg font-semibold">{edu.title}</h3>
          <p className="text-left text-sm text-muted-foreground">{edu.timeframe}</p>
        </div>
      ))}
    </Boxes>
  )
}

export default Page
