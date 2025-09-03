import { NextResponse } from "next/server"

const DEV_TO = "https://dev.to/api/articles"

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params

  if (!slug) {
    return NextResponse.json({ error: "Missing article slug" }, { status: 400 })
  }

  const res = await fetch(`${DEV_TO}/${slug}`, {
    headers: {
      "api-key": process.env.DEVTO_API_KEY ?? "",
      "user-agent": "kazem.dev/portfolio",
      accept: "application/json"
    },
    cache: "no-store"
  })

  if (!res.ok) {
    const text = await res.text().catch(() => "")
    return NextResponse.json(
      { error: `Dev.to request failed`, status: res.status, body: text },
      { status: res.status }
    )
  }

  const data = await res.json()
  return NextResponse.json(data, { status: 200 })
}
