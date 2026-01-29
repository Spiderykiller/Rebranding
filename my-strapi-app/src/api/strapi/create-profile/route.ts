import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user?.emailAddresses[0]?.emailAddress) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const res = await fetch(
    `${process.env.STRAPI_URL}/api/user-profiles/from-clerk`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clerkUserId: userId,
        email: user.emailAddresses[0].emailAddress,
      }),
    }
  );

  const data = await res.json();
  return NextResponse.json(data);
}
