"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black via-zinc-900 to-black" />
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] bg-accent/20 rounded-full blur-[120px]" />
      <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] bg-accent/20 rounded-full blur-[120px]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-8 items-center">
        
        {/* Left Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            Redefine <span className="text-accent">Speed</span> <br />
            Redefine <span className="text-accent">Style</span>
          </h1>

          <p className="text-lg text-white/70 max-w-lg leading-relaxed">
            Experience a new generation of performance gear built with AI-inspired
            design, engineered for the future of movement.
          </p>

          <div className="flex gap-5">
            <button className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:scale-105 transition">
              Shop Collection
            </button>
            <button className="px-8 py-4 border border-white/30 rounded-full hover:bg-white/10 transition">
              Explore Tech
            </button>
          </div>
        </motion.div>

        {/* Right Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative flex items-center justify-center"
        >
          <div className="absolute h-[420px] w-[420px] rounded-full bg-accent/30 blur-[100px]" />

          {/* Replace this with your product image */}
          <Image
            src="/hero.jpg"
            alt="Featured Product"
            width={500}
            height={400}
            className="relative object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)]"
          />
        </motion.div>

      </div>
    </section>
  );
}
