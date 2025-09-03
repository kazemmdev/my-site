import React from "react"

import { EXPERIENCES } from "@/config/contents"
import { Box, BoxContent, Boxes, BoxTitle } from "@/components/ui/boxes"

const Page = () => {
  return (
    <Boxes>
      {EXPERIENCES.map((expr, index) => (
        <Box key={index}>
          <BoxTitle className="space-y-2 p-5">
            <h3 className="text-xl font-bold text-left">{expr.title}</h3>
            <p className="text-left italic opacity-80">{expr.timeframe}</p>
          </BoxTitle>
          <BoxContent className="pointer-events-auto relative flex h-auto w-full flex-col rounded-md p-6 overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900 sm:w-[500px]">
            <div className="space-y-2 p-5">
              <h3 className="text-xl font-bold text-left">{expr.title}</h3>
              <p className="text-left italic opacity-80">{expr.timeframe}</p>
              <ul className="list-disc space-y-1">
                {expr.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          </BoxContent>
        </Box>
      ))}
    </Boxes>
  )
}

export default Page
