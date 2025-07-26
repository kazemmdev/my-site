"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface IBox extends React.PropsWithChildren {
  url?: string
  height?: number
  isGlowing?: boolean
  isSolid?: boolean
}

const Boxes = ({ children }: React.PropsWithChildren) => {
  const cardsRef = React.useRef<HTMLDivElement>(null)
  const handleMouseEnter = () => {
    cardsRef.current?.childNodes?.forEach((el) => {
      const child = el as HTMLDivElement
      child.style.setProperty("--border-opacity", "1")
    })
  }
  const handleMouseLeave = () => {
    cardsRef.current?.childNodes?.forEach((el) => {
      const child = el as HTMLDivElement
      child.style.setProperty("--border-opacity", "0")
    })
  }
  const handleMouseOver = (e: any) => {
    cardsRef.current?.childNodes?.forEach((el) => {
      const child = el as HTMLDivElement
      const x = child?.getBoundingClientRect().left
      child!.style.setProperty("--cursor-x", `${e.clientX - x}`)
    })
    cardsRef.current?.childNodes?.forEach((el) => {
      const child = el as HTMLDivElement
      const y = child?.getBoundingClientRect().top!
      child!.style.setProperty("--cursor-y", `${e.clientY - y}`)
    })
  }
  return (
    <>
      <div className="cards-highlight absolute inset-0 z-50 overflow-visible pointer-events-none select-none" />
      <div
        ref={cardsRef}
        onMouseMove={handleMouseOver}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative grid grid-cols-1 gap-4 py-10 text-white lg:grid-cols-3 sm:grid-cols-2"
      >
        {children}
      </div>
    </>
  )
}

const Box = ({
  url,
  isGlowing = false,
  isSolid = false,
  height = 270,
  children,
}: IBox) => {
  const router = useRouter()
  const cardRef = React.useRef<HTMLDivElement>(null)
  const handleMouseEnter = () => {
    cardRef.current?.style.setProperty("--opacity", "1")
  }
  const handleMouseLeave = () => {
    cardRef.current?.style.setProperty("--opacity", "0")
  }
  return (
    <div
      className={cn(url && "cursor-pointer", `min-h-[${height}px]`)}
      onClick={() => url && router.push(url)}
    >
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          `min-h-[${height}px] h-full`,
          "flex flex-col justify-start rounded-2xl relative flex-1 p-4 overflow-hidden",
          isGlowing && "card-glow",
          isSolid &&
            "before:pointer-events-none before:select-none before:absolute before:inset-0 before:p-[1px] before:bg-gradient-to-b before:from-white/10 before:to-transparent card-mask bg-[radial-gradient(ellipse at center,#242c3c,#242c3caa)]",
        )}
      >
        {isGlowing && <div className="card-glow-highlight" />}
        {isGlowing || isSolid ? (
          <div
            className={cn(
              "absolute top-[1px] bottom-[1px] left-[1px] right-[1px] rounded-[inherit] bg-background flex flex-col items-start justify-end"
            )}
          >
            {children}
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  )
}

const BoxTitle = ({ children }: React.PropsWithChildren) => (
  <h3 className="text-xl relative flex items-center gap-2 justify-start px-4 pb-2 overflow-hidden text-primary-foreground">
    {children}
  </h3>
)
const BoxContent = ({ children }: React.PropsWithChildren) => (
  <div className="relative flex flex-col justify-start px-4 h-[85px] overflow-hidden text-gray-500">
    {children}
  </div>
)

export {
  Boxes,
  Box,
  BoxTitle,
  BoxContent
}
