"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const categories = [
  {
    name: "Running",
    image: "/images/running.jpg",
  },
  {
    name: "Training",
    image: "/images/training.jpg",
  },
  {
    name: "Lifestyle",
    image: "/images/lifestyle.jpg",
  },
  {
    name: "Limited",
    image: "/images/limited.jpg",
  },
];

export default function CategoryShowcase() {
  return (
    <section className="py-28 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight">
            Shop by Category
          </h2>
          <p className="text-white/60 mt-3">
            Precision-engineered collections built for movement.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative h-[420px] rounded-2xl overflow-hidden cursor-pointer"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover group-hover:scale-110 transition duration-700"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition" />

              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-bold tracking-wide">
                  {cat.name}
                </h3>
                <p className="text-sm text-white/80 mt-1">
                  Explore Collection →
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
