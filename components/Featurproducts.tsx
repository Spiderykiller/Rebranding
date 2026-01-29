"use client";

import { useEffect, useState } from "react";
import ProductCard, { Product } from "@/components/Productcard";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      router.push("/login");
      return;
    }

    const fetchFeatured = async () => {
      try {
        // Fetch from serverless route instead of Strapi directly
        const res = await fetch("/api/products/featured", { cache: "no-store" });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Failed to fetch featured products: ${res.status} ${res.statusText}. Response: ${text}`);
        }

        const data = await res.json();

        // Map products to frontend type
        const mappedProducts: Product[] = data
          .filter((item: any) => item.attributes && item.attributes.name)
          .map((item: any) => {
            let imageUrl: string | null = null;

            if (item.attributes.image?.data) {
              if (Array.isArray(item.attributes.image.data)) {
                imageUrl = item.attributes.image.data[0]?.attributes?.url || null;
              } else {
                imageUrl = item.attributes.image.data.attributes?.url || null;
              }
            }

            if (!imageUrl) imageUrl = "/fallback.jpg";

            return {
              id: item.id,
              name: item.attributes.name,
              price: item.attributes.price ?? 0,
              description: item.attributes.description || "",
              image: imageUrl.startsWith("http") ? imageUrl : imageUrl,
            };
          });

        setProducts(mappedProducts);
      } catch (err) {
        console.error("Error fetching featured products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, [isLoaded, isSignedIn, router]);

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500">
        Loading premium collection...
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="py-20 text-center text-gray-500">
        No products available at the moment.
      </div>
    );
  }

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex items-end justify-between mb-12"
      >
        <div>
          <h2 className="text-4xl font-bold tracking-tight">
            Featured Collection
          </h2>
          <p className="text-gray-500 mt-2">
            Hand-picked premium drops engineered for movement.
          </p>
        </div>

        <button className="hidden md:block px-6 py-3 border border-black/10 rounded-xl hover:bg-black/5 transition">
          View all
        </button>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}





