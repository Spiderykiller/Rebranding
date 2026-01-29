import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/serverHelper";

export async function POST(req: NextRequest) {
  try {
    const userId = await requireAuth(req);
    const { cartItems, address, paymentMethod } = await req.json();

    // Call Strapi or another backend to create the order
    // Example: POST /api/orders in Strapi with cartItems & userId
    return NextResponse.json({ message: "Order created", orderId: "12345" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to create order" }, { status: 500 });
  }
}
