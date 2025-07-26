import { NextRequest } from "next/server"

export const runtime = "edge"
export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  const host = req.headers.get("host") ?? "gradeup.app"
  const site = `https://${host}`

  const body = `
User-agent: *
Disallow: /api/
Sitemap: ${site}/sitemap.xml
`.trimStart()

  return new Response(body, {
    headers: { "Content-Type": "text/plain;charset=utf-8" }
  })
}
