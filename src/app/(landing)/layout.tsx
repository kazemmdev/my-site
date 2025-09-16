import React from "react"
import Image from "next/image"

import { ScrollArea } from "@/components/ui/scroll-area"
import Footer from "@/app/(landing)/_components/footer"
import Sidebar from "@/app/(landing)/_components/sidebar"
import Socials from "@/app/(landing)/_components/socials"

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="h-screen w-full overflow-hidden">
      <div className="inset-0 size-full -z-10 fixed">
        <Image
          fill
          src="/bg.jpg"
          className="bg-contain object-cover dark:brightness-20 dark:saturate-200 dark:grayscale"
          quality={100}
          alt="bg"
        />
      </div>
      <main className="grid w-full h-full max-w-7xl grid-cols-1 md:grid-cols-2 gap-4 mx-auto px-4 md:px-6 xl:px-0">
        <Sidebar />
        <ScrollArea className="w-full h-screen relative">
          <Sidebar className="flex md:hidden" />
          {children}
          <Socials className="block pt-32 md:pt-0 md:hidden" />
          <Footer className="relative block md:hidden" />
        </ScrollArea>
      </main>
    </div>
  )
}

export default Layout
