"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCart } from "@/context/Cardcontext"; // ✅ fixed name
import Link from "next/link";

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const { add, open } = useCart();
  const router = useRouter();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();

    add({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: 1,
    });

    open(); 
    router.push("/cart");
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked(!liked);
  };

  return (
    <Link href={`/products/${product.id}`}>
      <motion.div
        whileHover={{ y: -12 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="group relative rounded-2xl overflow-hidden bg-white shadow-xl cursor-pointer"
      >
      
        <button
          onClick={handleWishlist}
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 backdrop-blur rounded-full"
        >
          <Heart
            size={20}
            className={liked ? "fill-black stroke-black" : "stroke-black"}
          />
        </button>

        {/* Image */}
        <div className="relative w-full h-[320px] overflow-hidden bg-white">
          <Image
            src={product.image ||  "/fallback.jpg" }
            alt={product.name || "Product image"}
            fill
            className="object-contain group-hover:scale-110 transition duration-500"
          />
        </div>

        <div className="relative p-5 backdrop-blur-xl bg-white/80 border-t border-black/5">
          <h3 className="text-lg font-semibold tracking-tight">
            {product.name}
          </h3>
          <p className="text-sm text-black/60 mt-1">${product.price}</p>

          <button
            onClick={handleAddToCart}
            className="mt-4 w-full py-3 rounded-xl font-medium bg-black text-white hover:bg-black/90 transition flex items-center justify-center gap-2"
          >
            {added ? (
              <span className="text-green-300">Added ✓</span>
            ) : (
              <>
                <ShoppingCart size={18} />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </motion.div>
    </Link>
  );
}
