"use client"

import React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { AnimatedGroup } from "@/components/ui/animated-group"
import { BorderTrail } from "@/components/ui/border-trail"
import {
  MorphingDialog,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogTitle,
  MorphingDialogTrigger
} from "@/components/ui/morphing-dialog"

interface IBoxProps extends React.PropsWithChildren {
  className?: string
}

const Boxes = ({ className, children }: IBoxProps) => {
  return (
    <AnimatedGroup
      className={cn("relative grid md:grid-cols-2 gap-4 md:py-32 text-white", className)}
      variants={{
        container: {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.05
            }
          }
        },
        item: {
          hidden: { opacity: 0, y: 100, filter: "blur(4px)" },
          visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
              duration: 1.1,
              type: "spring",
              bounce: 0.4
            }
          }
        }
      }}
    >
      {children}
    </AnimatedGroup>
  )
}

const Box = ({ url, className, children }: IBoxProps & { url?: string }) => {
  return url ? (
    <Link href={url}>
      <div
        className={cn(
          "group peer overflow-hidden bg-stone-400 dark:bg-stone-700/20 backdrop-blur-3xl",
          "h-full flex flex-col justify-start rounded-xl relative flex-1 cursor-pointer",
          "hover:dark:bg-stone-800/80 peer-hover:dark:bg-stone-800/100",
          "transition-all duration-300 ease-in-out",
          className
        )}
      >
        <BorderTrail
          className="group-hover:opacity-100 opacity-0"
          style={{
            boxShadow:
              "0px 0px 60px 30px rgb(255 255 255 / 50%), 0 0 100px 60px rgb(0 0 0 / 50%), 0 0 140px 90px rgb(0 0 0 / 50%)"
          }}
          size={100}
        />
        {children}
      </div>
    </Link>
  ) : (
    <MorphingDialog
      transition={{
        type: "spring",
        bounce: 0.05,
        duration: 0.25
      }}
    >
      <div
        className={cn(
          "group peer overflow-hidden bg-stone-600 dark:bg-stone-800/20 backdrop-blur-3xl",
          "h-full flex flex-col justify-start rounded-xl relative flex-1 cursor-pointer",
          "hover:dark:bg-stone-800/80 peer-hover:dark:bg-stone-800/100",
          "transition-all duration-300 ease-in-out",
          className
        )}
      >
        <BorderTrail
          className="group-hover:opacity-100 opacity-0"
          style={{
            boxShadow:
              "0px 0px 60px 30px rgb(255 255 255 / 50%), 0 0 100px 60px rgb(0 0 0 / 50%), 0 0 140px 90px rgb(0 0 0 / 50%)"
          }}
          size={100}
        />
        {children}
      </div>
    </MorphingDialog>
  )
}

const BoxTitle = ({ className, children }: IBoxProps) => (
  <MorphingDialogTrigger>
    <MorphingDialogTitle className={cn("", className)}>{children}</MorphingDialogTitle>
  </MorphingDialogTrigger>
)

const BoxContent = ({ className, children }: IBoxProps) => (
  <MorphingDialogContainer>
    <MorphingDialogContent className={cn("mx-4", className)}>{children}</MorphingDialogContent>
  </MorphingDialogContainer>
)

export { Boxes, Box, BoxTitle, BoxContent }
