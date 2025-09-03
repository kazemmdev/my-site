import React from "react"
import Image from "next/image"

import { ScrollArea } from "@/components/ui/scroll-area"
import Sidebar from "@/app/(landing)/_components/sidebar"

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="h-screen w-full">
      <Image
        fill
        src="/bg.jpg"
        className="bg-contain -z-10 object-cover dark:brightness-10 dark:saturate-200 dark:grayscale"
        quality={100}
        alt="bg"
      />
      <main className="grid w-full h-full max-w-7xl grid-cols-2 gap-4 mx-auto">
        <Sidebar />
        <ScrollArea className="w-full pt-20 h-screen">{children}</ScrollArea>
      </main>
    </div>
  )
}

// https://kadet.dev/
// https://abusaid.netlify.app/#skills

export default Layout
