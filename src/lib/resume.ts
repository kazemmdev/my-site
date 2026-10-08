import type { ResumeRole } from "@/config/resume"

const MONTH = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric", timeZone: "UTC" })

const parseMonth = (value: string) => {
  const [year, month] = value.split("-").map(Number)
  return { year, month }
}

const formatMonth = (value: string) => {
  const { year, month } = parseMonth(value)
  return MONTH.format(Date.UTC(year, month - 1))
}

/** "Jun 2026 - Present" */
export function formatPeriod(role: ResumeRole) {
  return `${formatMonth(role.start)} - ${role.end ? formatMonth(role.end) : "Present"}`
}

/** Inclusive month count, e.g. Dec 2024 - Oct 2026 → "1 year 11 months" */
export function formatDuration(role: ResumeRole, now = new Date()) {
  const start = parseMonth(role.start)
  const end = role.end
    ? parseMonth(role.end)
    : { year: now.getUTCFullYear(), month: now.getUTCMonth() + 1 }
  const total = (end.year - start.year) * 12 + (end.month - start.month) + 1
  const years = Math.floor(total / 12)
  const months = total % 12
  const plural = (n: number, unit: string) => `${n} ${unit}${n === 1 ? "" : "s"}`

  return [years && plural(years, "year"), months && plural(months, "month")]
    .filter(Boolean)
    .join(" ")
}

/** Roles with no company detail line put the company next to the title instead. */
export const isCompact = (role: ResumeRole) => !role.companyNote && !role.employment
