import type {Metadata, Viewport} from "next";
import { poppins } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import ThemeProvider from "@/components/providers/theme-provider"

import "./globals.css";
import React from "react";

export const metadata: Metadata = {
  title: "Kazem Mirzaei",
  description: "Full-Stack Web Developer | PHP, Node, Go, React, Docker"
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
