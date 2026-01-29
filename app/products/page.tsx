"use client"; 

import { useEffect, useState } from "react";
import ProductCard from "@/components/Productcard";
import { motion } from "framer-motion";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "http://localhost:1337/api/products?populate=*",
          { cache: "no-store" }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const json = await res.json();

        const productsData = json.data.map((item: any) => ({
          id: item.id,
          ...item.attributes,
        }));

        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-gray-200 h-80 rounded-xl shadow-md"
          ></div>
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="flex justify-center items-center p-16 text-gray-500 text-xl">
        No products available.
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((p) => (
          <motion.div
            key={p.id}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl"
          >
            <ProductCard product={p} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}



