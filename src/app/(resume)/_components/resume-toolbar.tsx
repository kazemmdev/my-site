import React from "react"
import Link from "next/link"
import { ArrowLeft, Download } from "lucide-react"

import { RESUME_DOCUMENTS, type ResumeDocument } from "@/config/resume"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const VIEWS = [
  { kind: "resume", label: "Compact", href: "/resume" },
  { kind: "cv", label: "Full CV", href: "/cv" }
] as const

const ResumeToolbar = ({ active }: { active: ResumeDocument["kind"] }) => (
  <nav className="mx-auto mb-6 flex w-full max-w-[210mm] flex-wrap items-center justify-between gap-3 print:hidden">
    <Link
      href="/"
      className="inline-flex items-center gap-1 text-body font-medium text-muted-foreground hover:text-foreground"
    >
      <ArrowLeft className="size-4" /> kazemm.dev
    </Link>
    <div className="flex items-center gap-3">
      <div className="flex rounded-full border border-input p-0.5">
        {VIEWS.map(({ kind, label, href }) => (
          <Link
            key={kind}
            href={href}
            aria-current={kind === active ? "page" : undefined}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-utility-nav transition-colors",
              kind === active
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {label}
          </Link>
        ))}
      </div>
      <Button asChild size="sm">
        <a href={`/${active}.pdf`} download={RESUME_DOCUMENTS[active].fileName}>
          <Download /> Download PDF
        </a>
      </Button>
    </div>
  </nav>
)

export default ResumeToolbar
