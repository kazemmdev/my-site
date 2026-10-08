"use client"

import React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

const DarkMode = () => {
  const { resolvedTheme, setTheme } = useTheme()

  // Icons swap via the `.dark` class, so no client-only "mounted" render is needed.
  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="inline-flex size-8 cursor-pointer items-center justify-center rounded-full border border-input text-muted-foreground transition-colors hover:text-foreground"
    >
      <Sun className="hidden size-4 dark:block" />
      <Moon className="size-4 dark:hidden" />
    </button>
  )
}

export default DarkMode
