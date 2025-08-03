"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"

const DarkMode = () => {
  const { theme, setTheme } = useTheme()
  return (
    <div
      onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
      className="relative h-8 w-8 min-w-[32px] cursor-pointer overflow-hidden rounded-full border-2 border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-900"
    >
      {theme && (
        <>
          <Moon
            className={cn(
              "ease-[cubic-bezier(0.26,2,0.46,0.71)] absolute h-5 w-5 [transition:transform_0.5s,opacity_0.15s]",
              theme == "dark"
                ? "translate-x-[0.32em] translate-y-[0.32em]"
                : "translate-x-0 translate-y-[-2em]"
            )}
          />
          <Sun
            className={cn(
              "ease-[cubic-bezier(0.26,2,0.46,0.71)] absolute h-5 w-5 [transition:transform_0.5s,opacity_0.15s]",
              theme == "dark"
                ? "translate-x-[0.3em] translate-y-[2em]"
                : "translate-x-[0.26em] translate-y-[0.26em]"
            )}
          />
        </>
      )}
    </div>
  )
}

export default DarkMode
