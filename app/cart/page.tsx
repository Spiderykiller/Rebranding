"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/Cardcontext";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";

export default function CartPage() {
  const { items, remove, updateQty } = useCart();
  const router = useRouter();
  const { isLoaded, isSignedIn } = useUser(); // Clerk hook
  const [loading, setLoading] = useState(true);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);

  // ✅ Redirect if user not signed in
  useEffect(() => {
    if (isLoaded) {
      if (!isSignedIn) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    }
  }, [isLoaded, isSignedIn, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-10 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-4xl font-bold tracking-tight">Your Cart</h1>
        <p className="text-black/60 mt-2">
          Review your selected items before checkout
        </p>
      </motion.div>

      {items.length === 0 ? (
        <div className="max-w-6xl mx-auto mt-20 text-center">
          <p className="text-xl text-black/60">Your cart is empty</p>
          <Link
            href="/"
            className="inline-block mt-6 px-8 py-4 bg-black text-white rounded-xl font-medium hover:bg-black/90 transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 mt-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                className="flex gap-6 p-6 bg-white rounded-2xl shadow-lg"
              >
                {/* Image */}
                <div className="relative w-28 h-28 rounded-xl bg-gray-100 overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.png"}
                    alt={item.name}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-black/60 mt-1">${item.price}</p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 mt-4">
                    <button
                      onClick={() =>
                        updateQty(item.id, Math.max(1, item.qty - 1))
                      }
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
                    >
                      <Minus size={16} />
                    </button>

                    <span className="min-w-[30px] text-center font-medium">
                      {item.qty}
                    </span>

                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Price + Remove */}
                <div className="flex flex-col justify-between items-end">
                  <p className="text-lg font-semibold">
                    ${(item.price * item.qty).toFixed(2)}
                  </p>
                  <button
                    onClick={() => remove(item.id)}
                    className="text-red-500 hover:text-red-600 transition flex items-center gap-1 text-sm"
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 h-fit sticky top-24">
            <h2 className="text-2xl font-bold">Order Summary</h2>

            <div className="mt-6 space-y-3 text-black/70">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>Calculated at checkout</span>
              </div>
            </div>

            <div className="border-t mt-6 pt-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <button className="mt-8 w-full py-4 rounded-xl bg-black text-white font-medium hover:bg-black/90 transition flex items-center justify-center gap-2">
              Checkout
              <ArrowRight size={18} />
            </button>

            <p className="text-xs text-black/50 mt-4 text-center">
              Secure checkout powered by Stripe-ready UI
            </p>
          </div>
        </div>
      )}
    </div>
  );
}



