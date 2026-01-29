"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, ShoppingBag, Heart, CreditCard, LogOut } from "lucide-react";
import { useUser } from "@/context/Usercontext";

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading } = useUser();

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    
    return <div className="min-h-screen flex items-center justify-center">Checking authentication...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-6 bg-white p-8 rounded-3xl shadow-lg">
          <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center text-white text-3xl font-bold">
            G
          </div>
          <div>
            <h1 className="text-3xl font-bold">{user.displayName || "ghost"}</h1>
            <p className="text-black/60">{user.email || "ghost@email.com" }</p>
          </div>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition cursor-pointer">
            <div className="flex items-center gap-4">
              <ShoppingBag />
              <div>
                <h3 className="font-semibold">My Orders</h3>
                <p className="text-sm text-black/60">Track your purchases</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition cursor-pointer">
            <div className="flex items-center gap-4">
              <Heart />
              <div>
                <h3 className="font-semibold">Wishlist</h3>
                <p className="text-sm text-black/60">Saved items</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition cursor-pointer">
            <div className="flex items-center gap-4">
              <CreditCard />
              <div>
                <h3 className="font-semibold">Payment Methods</h3>
                <p className="text-sm text-black/60">Manage cards</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition cursor-pointer">
            <div className="flex items-center gap-4 text-red-500">
              <LogOut />
              <div>
                <h3 className="font-semibold">Log Out</h3>
                <p className="text-sm text-black/60">End session</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

