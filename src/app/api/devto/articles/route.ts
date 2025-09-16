import { NextResponse } from "next/server"

const DEV_TO = "https://dev.to/api/articles/me/published"
const PER_PAGE_DEFAULT = 5

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const page = Number(searchParams.get("page") || "1")
  const perPage = Number(searchParams.get("per_page") || PER_PAGE_DEFAULT)

  const res = await fetch(`${DEV_TO}?per_page=${perPage}&page=${page}`, {
    headers: {
      "api-key": process.env.DEVTO_API_KEY ?? "",
      "user-agent": "kazem.dev/portfolio",
      accept: "application/json"
    },
    cache: "no-store"
  })

  const body = await res.text()
  return new NextResponse(body, { status: res.status })
}
