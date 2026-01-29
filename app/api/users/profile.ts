import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/serverHelper";

export async function GET(req: NextRequest) {
  try {
    const userId = await requireAuth(req);
    const res = await fetch(`${process.env.STRAPI_URL}/api/user-profiles?filters[clerkUserId][$eq]=${userId}`, {
      headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
      cache: "no-store",
    });
    const data = await res.json();
    return NextResponse.json(data?.data?.[0]?.attributes || {});
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}
