import Link from "next/link"

import { cn } from "@/lib/utils"

const SOURCE_URL = "https://github.com/kazemmdev/my-site"

const Footer = ({ className }: { className?: string }) => (
  <footer className={cn("bottom-0 hidden w-full md:absolute md:block", className)}>
    <div className="py-4 text-center text-utility-nav text-muted-foreground md:text-start">
      © {new Date().getFullYear()} Kazem Mirzaei ·{" "}
      <Link href={SOURCE_URL} target="_blank" rel="noopener" className="text-link hover:underline">
        Source on GitHub
      </Link>
    </div>
  </footer>
)
export default Footer
