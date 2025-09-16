"use client"

import Link from "next/link"
import {usePathname} from "next/navigation"
import {NAV_ITEMS} from "@/config/nav";

const Navigator = () => {
    const pathname = usePathname()

    return (
        <nav className="pt-3 pb-5">
            <div
                className="flex md:flex-col w-fit items-center md:items-start justify-between py-4 gap-10 md:gap-4 mx-auto md:mx-0">
                {NAV_ITEMS.map(({title, href}) => {
                    const isActive = pathname === href

                    return (
                        <Link
                            key={title}
                            href={href}
                            aria-current={isActive ? "page" : undefined}
                            className={`${
                                isActive ? "text-white font-semibold" : "text-gray-300 hover:text-white"
                            }`}
                        >
                            {title}
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}

export default Navigator
