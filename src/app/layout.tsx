import type { Metadata, Viewport } from "next"
import { SerwistProvider } from "@serwist/next/react"

import { poppins } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import ThemeProvider from "@/components/providers/theme-provider"

import "./globals.css"

import React from "react"

import QueryProvider from "@/components/providers/query-provider"

const APP_NAME = "kazemmdev"
const APP_DEFAULT_TITLE = "Kazem | Portfolio"
const APP_TITLE_TEMPLATE = "%s - Kazem"
const APP_DESCRIPTION = "Full-Stack Web Developer | PHP, Node, Go, React, Docker"

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE
  },
  formatDetection: {
    telephone: false
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE
    },
    description: APP_DESCRIPTION
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE
    },
    description: APP_DESCRIPTION
  }
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
}

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen antialiased", poppins.variable)}>
        <SerwistProvider swUrl="/sw.js" disable={process.env.NODE_ENV !== "production"}>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <QueryProvider>{children}</QueryProvider>
          </ThemeProvider>
        </SerwistProvider>
      </body>
    </html>
  )
}
