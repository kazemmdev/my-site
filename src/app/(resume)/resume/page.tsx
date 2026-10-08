import React from "react"
import type { Metadata } from "next"

import { RESUME } from "@/config/resume"
import ResumeSheet from "@/app/(resume)/_components/resume-sheet"
import ResumeToolbar from "@/app/(resume)/_components/resume-toolbar"

// "Present" durations are computed at render; refresh daily.
export const revalidate = 86400

export const metadata: Metadata = {
  title: "Resume",
  description: "One-page resume of Kazem Mirzaei, Senior Full Stack Developer.",
  alternates: { canonical: "/resume" }
}

const Page = () => (
  <main className="min-h-screen px-4 py-8 md:py-12 print:p-0">
    <ResumeToolbar active="resume" />
    <ResumeSheet doc={RESUME} />
  </main>
)

export default Page
