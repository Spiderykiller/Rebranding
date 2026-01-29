import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/serverHelper";

export async function POST(req: NextRequest) {
  try {
    const userId = await requireAuth(req);
    const { productId, qty } = await req.json();

    // Normally you'd call your database here (e.g., Strapi or your own DB)
    // For example, save the cart item under the user's profile
    return NextResponse.json({ message: "Added to cart", productId, qty });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed" }, { status: 500 });
  }
}
