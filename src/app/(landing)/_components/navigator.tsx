"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { NAV_ITEMS } from "@/config/nav"
import { cn } from "@/lib/utils"

const Navigator = () => {
  const pathname = usePathname()

  return (
    <nav className="pt-3 pb-5">
      <div className="mx-auto flex w-fit items-center justify-between gap-6 py-4 md:mx-0 md:flex-col md:items-start md:gap-4">
        {NAV_ITEMS.map(({ title, href }) => {
          const isActive = pathname === href

          return (
            <Link
              key={title}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "group flex items-center gap-3 text-section-nav font-medium transition-colors",
                isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "hidden h-px transition-all duration-300 md:block",
                  isActive
                    ? "w-10 bg-foreground"
                    : "w-4 bg-border group-hover:w-8 group-hover:bg-muted-foreground"
                )}
              />
              {title}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default Navigator
