import Link from "next/link"

import DarkMode from "@/components/ui/dark-mode"

const NavBar = () => (
  <nav className="sticky top-0 z-40 flex w-full items-center justify-between border-b backdrop-blur-md transition-all duration-300 dark:bg-gray-900/40 rounded-2xl card-glass">
    <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-8 py-4">
      <Link href="/" className="text-2xl dark:text-white cursor-pointer">
        Kazem Mirzaei
      </Link>
      <DarkMode />
    </div>
  </nav>
)

export default NavBar
