"use client";

import { useState, useEffect } from "react";
import { useUser as useClerkUser } from "@clerk/nextjs";

interface UserProfile {
  id: string;
  email: string;
  role: "user" | "admin";
  [key: string]: any;
}

export const useUser = () => {
  const { user, isSignedIn } = useClerkUser(); // client-side hook
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!isSignedIn || !user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        const userId = user.id;

        
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/user-profiles?filters[clerkUserId][$eq]=${userId}`,
          {
            cache: "no-store",
            headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}` },
          }
        );

        const data = await res.json();
        const role = data?.data?.[0]?.attributes?.role || "user";

        setProfile({
          ...user,
          email: user.primaryEmailAddress?.emailAddress || "",
          role,
          ...user,
        });
      } catch (err) {
        console.error("Failed to fetch Strapi user profile:", err);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, isSignedIn]);

  return { user: profile, loading };
};

