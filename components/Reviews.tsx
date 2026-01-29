"use client";

import { motion } from "framer-motion";

const reviews = [
  {
    name: "Daniel K.",
    role: "Marathon Runner",
    text: "The comfort and responsiveness are unreal. I shaved 4 minutes off my personal best in just three weeks.",
  },
  {
    name: "Amara T.",
    role: "Fitness Coach",
    text: "These shoes feel engineered, not just designed. Lightweight, stable, and premium in every detail.",
  },
  {
    name: "Jason M.",
    role: "Urban Athlete",
    text: "The build quality is insane. You can feel the technology with every single step.",
  },
];

export default function Reviews() {
  return (
    <section className="py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight">
            Trusted by Athletes Worldwide
          </h2>
          <p className="text-gray-500 mt-3">
            Real performance. Real feedback. No compromises.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-xl border border-black/5"
            >
              <p className="text-gray-700 leading-relaxed">
                “{review.text}”
              </p>

              <div className="mt-6">
                <h4 className="font-semibold">{review.name}</h4>
                <p className="text-sm text-gray-500">{review.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
