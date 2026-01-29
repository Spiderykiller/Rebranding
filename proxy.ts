import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

/* ---------- Route matchers ---------- */

// Routes that require login
const isProtectedRoute = createRouteMatcher([
  "/cart(.*)",
  "/checkout(.*)",
  "/orders(.*)",
]);

// Routes that require admin
const isAdminRoute = createRouteMatcher([
  "/admin(.*)",
]);

/* ---------- Helper: fetch user role from Strapi ---------- */
async function getUserRole(clerkUserId: string) {
  const res = await fetch(
    `${process.env.STRAPI_URL}/api/user-profiles?filters[clerkUserId][$eq]=${clerkUserId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      cache: "no-store",
    }
  );

  const data = await res.json();
  return data?.data?.[0]?.attributes?.role;
}

/* ---------- Middleware ---------- */
export default clerkMiddleware(async (auth, request: NextRequest) => {
  const { userId, redirectToSignIn } = await auth();

  /* 🔐 Protect normal routes */
  if (isProtectedRoute(request) && !userId) {
    return redirectToSignIn();
  }

  /* 🛡️ Protect admin routes */
  if (isAdminRoute(request)) {
    if (!userId) {
      return redirectToSignIn();
    }

    const role = await getUserRole(userId);

    if (role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
});

/* ---------- Matcher config ---------- */
export const config = {
  matcher: [
    // Skip Next internals & static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};


