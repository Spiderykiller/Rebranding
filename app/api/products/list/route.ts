import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const STRAPI_URL = process.env.STRAPI_URL;
  if (!STRAPI_URL) {
    return NextResponse.json({ error: "STRAPI_URL not defined" }, { status: 500 });
  }

  try {
    const res = await fetch(`${STRAPI_URL}/api/products?populate=*`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch from Strapi");
    const data = await res.json();
    return NextResponse.json(data.data); // only the products array
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

