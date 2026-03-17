"use client";
// components/landing/TechStack.tsx

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const STATS = [
  { value: "~700K", label: "Trainable Parameters" },
  { value: "0.97", label: "Macro F1 Score (Phase 2)" },
  { value: "9", label: "Fruit Classes" },
  { value: "5", label: "Freshness Stages" },
];

export default function TechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="rounded-3xl bg-gradient-to-br from-green-800 via-green-700 to-green-900 p-10 lg:p-14 overflow-hidden relative"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-green-600/20 -translate-y-1/2 translate-x-1/4 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-lime-400/10 translate-y-1/2 -translate-x-1/4 blur-2xl" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left — Description */}
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 bg-green-600/50 text-lime-200 text-xs font-semibold rounded-full uppercase tracking-widest border border-green-500/40">
                Model Architecture
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                Built on a Custom Hybrid CNN
              </h2>
              <p className="text-green-100/80 leading-relaxed text-base">
                FruitVision is powered by{" "}
                <span className="font-semibold text-white">HybridConvNet</span>{" "}
                — a fully custom CNN designed in-house using PyTorch. Inspired
                by VGG, ResNet, and Inception architectures, the model achieves
                a macro F1-score of{" "}
                <span className="font-semibold text-lime-300">0.97</span> on
                diverse fruit and vegetable datasets.
              </p>
            </div>

            {/* Right — Stats */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-5 text-center"
                >
                  <div className="text-3xl font-extrabold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-green-200 font-medium leading-tight">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
