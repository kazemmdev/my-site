"use client"

import React from "react"
import { flushSync } from "react-dom"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

const DURATION = 500

const DarkMode = () => {
  const { resolvedTheme, setTheme } = useTheme()

  const toggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    const next = resolvedTheme === "dark" ? "light" : "dark"
    const root = document.documentElement
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (!document.startViewTransition || reduceMotion) {
      setTheme(next)
      return
    }

    // The new theme grows as a circle from the button until it covers the farthest corner.
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

    root.classList.add("theme-transition")
    const transition = document.startViewTransition(() => {
      // Apply the class now so the new snapshot already has the next theme.
      root.classList.toggle("dark", next === "dark")
      flushSync(() => setTheme(next))
    })

    // `ready` rejects when the browser skips the transition (e.g. a second click
    // mid-animation); the theme still switches, so there's nothing to recover.
    transition.ready
      .then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: DURATION, easing: "ease-in-out", pseudoElement: "::view-transition-new(root)" }
        )
      })
      .catch(() => {})
    const cleanup = () => root.classList.remove("theme-transition")
    transition.finished.then(cleanup, cleanup)
  }

  // Icons swap via the `.dark` class, so no client-only "mounted" render is needed.
  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggle}
      className="inline-flex size-8 cursor-pointer items-center justify-center rounded-full border border-input text-muted-foreground transition-colors hover:text-foreground"
    >
      <Sun className="hidden size-4 dark:block" />
      <Moon className="size-4 dark:hidden" />
    </button>
  )
}

export default DarkMode
