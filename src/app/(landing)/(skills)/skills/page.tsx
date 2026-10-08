import React from "react"

import { CV } from "@/config/resume"
import { Box, BoxContent, Boxes, BoxTitle } from "@/components/ui/boxes"

const Page = () => {
  return (
    <Boxes>
      {CV.skills.map(({ label, items }) => (
        <Box key={label}>
          <BoxTitle className="space-y-2 p-6">
            <h3 className="text-start text-product-label font-semibold">{label}</h3>
            <p className="text-start text-body text-muted-foreground">{items}</p>
          </BoxTitle>
          <BoxContent className="pointer-events-auto relative flex h-auto w-full flex-col overflow-hidden rounded-card border border-border bg-popover p-6 text-popover-foreground sm:w-[500px]">
            <div className="space-y-3 p-2">
              <h3 className="text-start text-product-label font-semibold">{label}</h3>
              <div className="flex flex-wrap gap-1.5">
                {items.split(", ").map(item => (
                  <span
                    key={item}
                    className="rounded-full border border-input px-2.5 py-0.5 text-utility-nav text-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </BoxContent>
        </Box>
      ))}
    </Boxes>
  )
}

export default Page
