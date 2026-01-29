import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const STRAPI_URL = process.env.STRAPI_URL;
  if (!STRAPI_URL) {
    return NextResponse.json({ error: "STRAPI_URL not defined" }, { status: 500 });
  }

  try {
    const res = await fetch(`${STRAPI_URL}/api/products?populate=*&pagination[limit]=4`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch from Strapi");
    const data = await res.json();
    return NextResponse.json(data.data); // only the data array
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch featured products" }, { status: 500 });
  }
}

