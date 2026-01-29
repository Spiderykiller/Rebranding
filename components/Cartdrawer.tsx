"use client";

import { useCart } from "@/context/Cardcontext";
import Image from "next/image";
import { X, Plus, Minus, Trash2 } from "lucide-react";

export default function CartDrawer() {
  const { items, isOpen, close, remove, updateQty, total } = useCart();

  return (
    <div
      className={`fixed inset-0 z-50 transition ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        onClick={close}
        className={`absolute inset-0 bg-black/40 transition ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Drawer */}
      <div
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={close}>
            <X />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 && (
            <p className="text-gray-500 text-sm">Your cart is empty.</p>
          )}

          {items.map((item) => {
            const imageSrc = typeof item.image === "string" && item.image ? item.image : "/placeholder.png";
            const altText = typeof item.name === "string" && item.name ? item.name : "Product image";

            return (
              <div key={item.id} className="flex gap-4">
                {/* Product Image */}
                <div className="relative w-20 h-20 bg-gray-100 rounded-xl overflow-hidden">
                  <Image
                    src={imageSrc}
                    alt={altText}
                    fill
                    className="object-contain"
                    sizes="80px"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 flex flex-col">
                  <h4 className="font-medium">{altText}</h4>
                  <p className="text-sm text-gray-500">
                    ${typeof item.price === "number" ? item.price.toFixed(2) : "0.00"}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() =>
                        updateQty(item.id, Math.max(1, item.qty - 1))
                      }
                      className="p-1 border rounded"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="text-sm w-6 text-center">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="p-1 border rounded"
                    >
                      <Plus size={16} />
                    </button>

                    <button
                      onClick={() => remove(item.id)}
                      className="ml-auto text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="border-t p-6 space-y-4">
          <div className="flex justify-between text-sm font-medium">
            <span>Total</span>
            <span>${typeof total === "number" ? total.toFixed(2) : "0.00"}</span>
          </div>

          <button className="w-full py-4 bg-black text-white rounded-xl font-medium hover:bg-black/90 transition">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
