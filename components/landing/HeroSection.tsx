"use client";
// components/landing/HeroSection.tsx

import { motion } from "framer-motion";
import Link from "next/link";
import { SUPPORTED_FRUITS, FRUIT_EMOJIS } from "@/lib/constants";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center pt-20 pb-16 px-4">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 text-green-700 text-sm font-medium">
                🤖 AI-Powered Fruit Analysis
              </span>
            </motion.div>

            {/* Heading */}
            <div className="space-y-2">
              <h1 className="text-5xl lg:text-6xl font-extrabold text-stone-900 leading-tight">
                Know Your Fruit.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400">
                  Know Its Freshness.
                </span>
              </h1>
            </div>

            {/* Subheading */}
            <p className="text-lg text-stone-500 leading-relaxed max-w-lg">
              FruitVision uses a custom-built Convolutional Neural Network to
              identify{" "}
              <span className="font-semibold text-stone-700">8 fruit types</span>{" "}
              and predict freshness across{" "}
              <span className="font-semibold text-stone-700">5 stages</span> —
              instantly.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/analyze"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
              >
                Analyze a Fruit →
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-green-600 text-green-700 hover:bg-green-50 font-semibold rounded-xl transition-all duration-200"
              >
                Learn How It Works
              </a>
            </div>

            {/* Stat Pills */}
            <div className="flex flex-wrap gap-3">
              {[
                "✓ 8 Fruit Types",
                "✓ 5 Freshness Stages",
                "✓ Custom CNN Model",
              ].map((pill) => (
                <span
                  key={pill}
                  className="px-3 py-1.5 bg-green-50 border border-green-100 text-green-700 text-sm font-medium rounded-full"
                >
                  {pill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right Column — Fruit Emoji Grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            <div className="relative bg-gradient-to-br from-green-50 to-lime-50 rounded-3xl border-2 border-green-200 shadow-2xl p-6">
              {/* Decorative dots */}
              <div className="absolute top-4 right-4 flex gap-1.5">
                {["bg-red-400", "bg-yellow-400", "bg-green-400"].map((c, i) => (
                  <div key={i} className={`w-3 h-3 rounded-full ${c}`} />
                ))}
              </div>
              <p className="text-xs font-medium text-green-600 mb-4 uppercase tracking-wider">
                Supported Fruits
              </p>
              <div className="grid grid-cols-3 gap-3">
                {SUPPORTED_FRUITS.map((fruit, i) => (
                  <motion.div
                    key={fruit}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.06, duration: 0.4 }}
                    whileHover={{ scale: 1.08, y: -4 }}
                    className="flex flex-col items-center gap-1.5 p-3 bg-white rounded-xl shadow-sm border border-green-100 cursor-default transition-shadow hover:shadow-md"
                  >
                    <span className="text-3xl leading-none">
                      {FRUIT_EMOJIS[fruit]}
                    </span>
                    <span className="text-xs font-medium text-stone-600 text-center leading-tight">
                      {fruit}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
