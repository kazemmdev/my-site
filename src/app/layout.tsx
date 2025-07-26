import type {Metadata, Viewport} from "next";
import { poppins } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import ThemeProvider from "@/components/providers/theme-provider"

import "./globals.css";
import React from "react";

const APP_NAME = "kazemmdev";
const APP_DEFAULT_TITLE = "Kazem Mirzaei";
const APP_TITLE_TEMPLATE = "%s - Kazem Mirzaei";
const APP_DESCRIPTION = "Full-Stack Web Developer | PHP, Node, Go, React, Docker";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
        <body className={cn("min-h-screen antialiased", poppins.variable)} suppressHydrationWarning>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
