import { cn } from "@/lib/utils"

const Footer = ({ className }: { className?: string }) => (
  <footer className={cn("md:absolute bottom-0 w-full hidden md:block", className)}>
    <div className="text-white/30 text-center md:text-left py-4">
      © {new Date().getFullYear()} Kazem Mirzaei
    </div>
  </footer>
)
export default Footer
