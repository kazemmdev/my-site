import { CV } from "@/config/resume"
import { renderResumePdf } from "@/app/(resume)/_pdf/resume-pdf"

export const revalidate = 86400

export const GET = () => renderResumePdf(CV)
