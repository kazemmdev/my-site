import { cn } from "@/lib/utils"

const Footer = ({ className }: { className?: string }) => (
  <footer className={cn("bottom-0 hidden w-full md:absolute md:block", className)}>
    <div className="py-4 text-center text-sm text-muted-foreground/70 md:text-left">
      © {new Date().getFullYear()} Kazem Mirzaei
    </div>
  </footer>
)
export default Footer
