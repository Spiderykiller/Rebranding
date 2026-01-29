"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useUser as useClerkUser} from "@clerk/nextjs";

interface UserProfile {
  id: string;
  email: string;
  role: "user" | "admin";
  [key: string]: any; // additional fields from Clerk
}

interface UserContextType {
  user: UserProfile | null;
  loading: boolean;
}

const UserContext = createContext<UserContextType>({ user: null, loading: true });

export function UserProvider({ children }: { children: ReactNode }) {
  const { user: clerkUser, isSignedIn } = useClerkUser();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!isSignedIn || !clerkUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        // Fetch Strapi profile using Clerk user ID
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/user-profiles?filters[clerkUserId][$eq]=${clerkUser.id}`,
          {
            cache: "no-store",
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
            },
          }
        );

        const data = await res.json();
        const role = data?.data?.[0]?.attributes?.role || "user";

        setUser({
          ...clerkUser,
          email: clerkUser.primaryEmailAddress?.emailAddress || "",
          role,
          ...clerkUser, // include all other Clerk user properties
        });
      } catch (err) {
        console.error("Failed to fetch Strapi user profile:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [clerkUser, isSignedIn]);

  return <UserContext.Provider value={{ user, loading }}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}

