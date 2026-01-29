"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/context/Cardcontext";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Minus, Plus } from "lucide-react";

type Product = {
  name: string;
  price: number;
  description?: string;
  image: string;
  stock?: number;
};

const sizes = ["US 7", "US 8", "US 9", "US 10", "US 11"];

export default function ProductDetailPage() {
  const { id } = useParams();
  const { add, open } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products/${id}?populate=*`,
          { cache: "no-store" }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await res.json();
        const attrs = data.data.attributes;

        setProduct({
          name: attrs.name,
          price: attrs.price,
          description: attrs.description,
          image: attrs.image?.data?.attributes?.url,
          stock: attrs.stock,
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-lg text-gray-500">
        Loading premium experience...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center text-xl text-red-500">
        Product not found
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-20">
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative w-full h-[520px] bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-12 hover:scale-105 transition duration-700"
          />
          <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-black text-white text-sm tracking-wide">
            Limited Edition
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div>
            <h1 className="text-5xl font-bold tracking-tight leading-tight">
              {product.name}
            </h1>

            <p className="mt-4 text-2xl font-semibold">${product.price}</p>

            <p className="mt-4 text-gray-600 leading-relaxed max-w-xl">
              {product.description ||
                "Precision engineered performance footwear built for speed, comfort, and modern urban athletes."}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Select Size</h3>
            <div className="flex flex-wrap gap-3">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`px-5 py-3 rounded-xl border transition text-sm ${
                    selectedSize === s
                      ? "bg-black text-white border-black"
                      : "border-black/10 hover:border-black"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Quantity</h3>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="p-3 rounded-xl border hover:bg-black/5"
              >
                <Minus size={18} />
              </button>
              <span className="text-lg font-medium w-12 text-center">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="p-3 rounded-xl border hover:bg-black/5"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              className="flex-1 py-4 bg-black text-white rounded-xl font-semibold tracking-wide hover:scale-[1.02] transition flex items-center justify-center gap-3"
              onClick={() => {
                add({
                  id: id as string,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  qty,
                });
                open();
              }}
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>

            <button className="p-4 border border-black/10 rounded-xl hover:bg-black/5 transition">
              <Heart size={22} />
            </button>
          </div>

          <p className="text-sm text-green-600">
            {product.stock
              ? `${product.stock} items in stock`
              : "In stock – ready to ship"}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

