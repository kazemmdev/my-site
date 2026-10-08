import React from "react"

import { CV } from "@/config/resume"
import { formatDuration, formatPeriod } from "@/lib/resume"
import { Box, BoxContent, Boxes, BoxTitle } from "@/components/ui/boxes"

// "Present" durations are computed at render; refresh daily.
export const revalidate = 86400

const Page = () => {
  return (
    <Boxes>
      {CV.experience.map(role => (
        <Box key={`${role.company}-${role.start}`}>
          <BoxTitle className="space-y-2 p-6">
            <h3 className="text-start text-product-label font-semibold">{role.title}</h3>
            <p className="text-start text-body text-muted-foreground">
              <span className="font-medium text-foreground">{role.company}</span> ·{" "}
              {formatPeriod(role)}
            </p>
          </BoxTitle>
          <BoxContent className="pointer-events-auto relative flex h-auto max-h-[85dvh] w-full flex-col overflow-auto rounded-card border border-border bg-popover p-6 text-popover-foreground sm:w-[560px]">
            <div className="space-y-3 p-2">
              <h3 className="text-start text-product-label font-semibold">{role.title}</h3>
              <div className="space-y-1 text-start text-body text-muted-foreground">
                <p>
                  <span className="font-medium text-foreground">{role.company}</span>
                  {role.companyNote && ` · ${role.companyNote}`}
                </p>
                <p>
                  {formatPeriod(role)} · {formatDuration(role)}
                  {role.employment && ` · ${role.employment}`}
                </p>
              </div>
              <ul className="list-disc space-y-1.5 ps-5 marker:text-muted-foreground">
                {role.bullets.map(bullet => (
                  <li key={bullet} className="text-body leading-relaxed">
                    {bullet}
                  </li>
                ))}
              </ul>
              {role.stack && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {role.stack.map(item => (
                    <span
                      key={item}
                      className="rounded-full border border-input px-2.5 py-0.5 text-utility-nav text-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </BoxContent>
        </Box>
      ))}
      {CV.education.map(({ degree, detail }) => (
        <div
          key={degree}
          className="flex h-full flex-col justify-start rounded-card border border-border bg-card p-6 text-card-foreground"
        >
          <p className="text-utility-nav font-semibold text-muted-foreground">Education</p>
          <h3 className="mt-2 text-start text-product-label font-semibold">{degree}</h3>
          <p className="text-start text-body text-muted-foreground">{detail}</p>
        </div>
      ))}
    </Boxes>
  )
}

export default Page
