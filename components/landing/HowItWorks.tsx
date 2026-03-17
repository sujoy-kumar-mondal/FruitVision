"use client";
// components/landing/HowItWorks.tsx

import { motion, useInView } from "framer-motion";
import { UploadCloud, ScanSearch, Activity } from "lucide-react";
import { useRef } from "react";

const STEPS = [
  {
    icon: UploadCloud,
    title: "Upload a Photo",
    description:
      "Take or upload a clear photo of your fruit. Supported formats: JPG, PNG, WEBP.",
    step: 1,
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-t-green-500",
  },
  {
    icon: ScanSearch,
    title: "Classify Fruit Type",
    description:
      "Our hybrid CNN analyzes your image and identifies the fruit from 9 supported types.",
    step: 2,
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-t-orange-500",
  },
  {
    icon: Activity,
    title: "Check Freshness",
    description:
      "Get a freshness prediction across 5 stages — from Fresh to Rotten — with a confidence score.",
    step: 3,
    color: "text-green-700",
    bg: "bg-lime-50",
    border: "border-t-green-600",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="how-it-works" className="py-24 px-4 bg-white/60" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-stone-900 mb-4">
            How FruitVision Works
          </h2>
          <p className="text-lg text-stone-500 max-w-xl mx-auto">
            Three simple steps from photo to freshness report
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Dashed connector lines — desktop only */}
          <div className="hidden md:block absolute top-14 left-[33%] right-[33%] h-0 border-t-2 border-dashed border-green-200 z-0" />

          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`relative z-10 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-8 border-t-4 ${step.border}`}
              >
                {/* Step number */}
                <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-bold">
                  {step.step}
                </div>
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl ${step.bg} flex items-center justify-center mb-5`}
                >
                  <Icon className={`w-7 h-7 ${step.color}`} />
                </div>
                <h3 className="text-xl font-bold text-stone-800 mb-3">
                  {step.title}
                </h3>
                <p className="text-stone-500 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
