"use client"

import React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { AnimatedGroup } from "@/components/ui/animated-group"
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
      className={cn("relative grid gap-4 md:grid-cols-2 md:py-32", className)}
      variants={{
        container: {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.06
            }
          }
        },
        item: {
          hidden: { opacity: 0, y: 16 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.4,
              ease: "easeOut"
            }
          }
        }
      }}
    >
      {children}
    </AnimatedGroup>
  )
}

const boxClasses = (className?: string) =>
  cn(
    "group relative flex h-full flex-1 cursor-pointer flex-col justify-start overflow-hidden",
    "rounded-lg border border-border bg-card text-card-foreground shadow-xs",
    "transition-all duration-200 hover:border-primary/40 hover:shadow-md",
    className
  )

const Box = ({ url, className, children }: IBoxProps & { url?: string }) => {
  return url ? (
    <Link href={url}>
      <div className={boxClasses(className)}>{children}</div>
    </Link>
  ) : (
    <MorphingDialog
      transition={{
        type: "spring",
        bounce: 0.05,
        duration: 0.25
      }}
    >
      <div className={boxClasses(className)}>{children}</div>
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
