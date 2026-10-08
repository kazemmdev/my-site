import React from "react"
import type { Metadata } from "next"

import { CV } from "@/config/resume"
import ResumeSheet from "@/app/(resume)/_components/resume-sheet"
import ResumeToolbar from "@/app/(resume)/_components/resume-toolbar"

// "Present" durations are computed at render; refresh daily.
export const revalidate = 86400

export const metadata: Metadata = {
  title: "CV",
  description:
    "Detailed CV of Kazem Mirzaei, Senior Full Stack Developer: experience, skills, and education.",
  alternates: { canonical: "/cv" }
}

const Page = () => (
  <main className="min-h-screen px-4 py-8 md:py-12 print:p-0">
    <ResumeToolbar active="cv" />
    <ResumeSheet doc={CV} />
  </main>
)

export default Page
