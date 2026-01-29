import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server"; // server-side only

export async function requireAuth(req: NextRequest) {
  const user = await currentUser(); // gets logged-in user
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return user.id;
}

export async function getStrapiUserRole(userId: string) {
  const res = await fetch(
    `${process.env.STRAPI_URL}/api/user-profiles?filters[clerkUserId][$eq]=${userId}`,
    {
      headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
    }
  );

  const data = await res.json();
  return data?.data?.[0]?.attributes?.role || "user";
}

