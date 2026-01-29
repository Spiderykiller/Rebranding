import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const clerkUserId = url.searchParams.get("clerkUserId");

  if (!clerkUserId) return NextResponse.json({ error: "Missing user ID" }, { status: 400 });

  const res = await fetch(`${process.env.STRAPI_URL}/api/user-profiles?filters[clerkUserId][$eq]=${clerkUserId}`, {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`, // not public
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) return NextResponse.json({ error: "Failed" }, { status: res.status });

  const data = await res.json();
  return NextResponse.json(data);
}
