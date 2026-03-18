"use client";
// components/landing/SupportedFruits.tsx

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SUPPORTED_FRUITS, FRUIT_EMOJIS } from "@/lib/constants";

export default function SupportedFruits() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 px-4 bg-stone-50" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-bold text-stone-900 mb-4">
            Supported Fruits
          </h2>
          <p className="text-lg text-stone-500 max-w-xl mx-auto">
            FruitVision currently recognizes these 8 fruit types
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-5">
          {SUPPORTED_FRUITS.map((fruit, i) => (
            <motion.div
              key={fruit}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 24px 0 rgba(22, 163, 74, 0.18)",
              }}
              className="flex flex-col items-center gap-3 p-6 bg-white border border-stone-200 rounded-2xl cursor-default group transition-all"
            >
              <span className="text-5xl leading-none group-hover:scale-110 transition-transform duration-200">
                {FRUIT_EMOJIS[fruit]}
              </span>
              <span className="text-base font-semibold text-stone-700 text-center">
                {fruit}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
