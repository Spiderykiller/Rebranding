"use client";

import { useEffect, useState } from "react";
import ProductCard from "./Productcard";
import { SkeletonCard } from "./loader"; 

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

export default function ProductGrid({ initialCategory }: { initialCategory?: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);

      try {
        const url = initialCategory
          ? `/api/products?category=${initialCategory}`
          : "/api/products";

        const res = await fetch(url);
        const data = await res.json();

        setProducts(data.products);
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [initialCategory]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 mt-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {initialCategory ? `${initialCategory} Products` : "Featured Products"}
        </h2>

        <span className="text-gray-500 text-sm">
          {loading ? "Loading…" : `${products.length} items`}
        </span>
      </div>

    
      <div className="
        grid 
        gap-6 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4 
        xl:grid-cols-5
        transition-all
      ">
        {loading
          ? Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)
          : products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>

     
      {!loading && products.length === 0 && (
        <div className="w-full py-20 flex flex-col items-center text-gray-500">
          <img
            src="/images/empty.jpg"
            alt="No products"
            className="w-40 opacity-70"
          />
          <p className="mt-4 text-lg">No products found.</p>
        </div>
      )}
    </div>
  );
}
