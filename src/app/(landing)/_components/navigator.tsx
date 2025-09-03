import Link from "next/link"

import { NAV_ITEMS } from "@/config/nav"

const Navigator = () => (
  <nav className="">
    <div className="flex flex-col w-full justify-between py-4 gap-4">
      {NAV_ITEMS.map(({ title, href }) => (
        <Link key={title} href={href}>
          {title}
        </Link>
      ))}
    </div>
  </nav>
)

export default Navigator
