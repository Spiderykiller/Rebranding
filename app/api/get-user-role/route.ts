import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const clerkUserId = req.nextUrl.searchParams.get("clerkUserId");
    if (!clerkUserId) {
      return NextResponse.json({ error: "Missing clerkUserId" }, { status: 400 });
    }

    const res = await fetch(`${process.env.STRAPI_URL}/api/user-profiles?filters[clerkUserId][$eq]=${clerkUserId}`, {
      headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: text }, { status: res.status });
    }

    const data = await res.json();
    const role = data?.data?.[0]?.attributes?.role || "user";

    return NextResponse.json({ role });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
