import React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import Footer from "@/app/(landing)/_components/footer"
import Sidebar from "@/app/(landing)/_components/sidebar"
import Socials from "@/app/(landing)/_components/socials"

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-96 bg-linear-to-b from-primary/10 to-transparent"
      />
      <main className="mx-auto grid h-full w-full max-w-7xl grid-cols-1 gap-4 px-4 md:grid-cols-2 md:px-6 xl:px-0">
        <Sidebar />
        <ScrollArea className="relative h-screen w-full">
          <Sidebar className="flex md:hidden" />
          {children}
          <Socials className="block pt-32 md:hidden md:pt-0" />
          <Footer className="relative block md:hidden" />
        </ScrollArea>
      </main>
    </div>
  )
}

export default Layout
