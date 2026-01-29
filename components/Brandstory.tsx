"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function BrandStory() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div>
            <h2 className="text-4xl font-bold tracking-tight leading-tight">
              Engineered for Speed. Designed for Reality.
            </h2>
            <p className="text-gray-600 mt-4 leading-relaxed max-w-xl">
              Our design philosophy blends biomechanical research, real-world athlete testing, and data-driven precision to craft performance footwear for modern movement. Every curve, every stitch, every sole is engineered to respond faster than you do.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-3xl font-bold">256+</h3>
              <p className="text-sm text-gray-500">Athlete Tests</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold">98%</h3>
              <p className="text-sm text-gray-500">Performance Rating</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold">12K</h3>
              <p className="text-sm text-gray-500">Hours of Research</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold">4.9★</h3>
              <p className="text-sm text-gray-500">User Satisfaction</p>
            </div>
          </div>

          <button className="px-8 py-4 bg-black text-white rounded-xl font-medium hover:scale-105 transition">
            Discover the Technology
          </button>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative h-[520px] rounded-3xl overflow-hidden shadow-2xl"
        >
          <Image
            src="/images/brand-tech.jpg"
            alt="Brand Technology"
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/10" />
        </motion.div>
      </div>
    </section>
  );
}
