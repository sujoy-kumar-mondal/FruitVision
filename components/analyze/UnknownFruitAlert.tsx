"use client";
// components/analyze/UnknownFruitAlert.tsx

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { SUPPORTED_FRUITS, FRUIT_EMOJIS } from "@/lib/constants";

interface Props {
  onReset: () => void;
}

export default function UnknownFruitAlert({ onReset }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-amber-50 border border-amber-200 rounded-2xl p-6 space-y-5"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-amber-100 rounded-xl">
          <AlertTriangle className="w-8 h-8 text-amber-500" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-amber-800">
            Fruit Not Recognized
          </h3>
          <p className="text-sm text-amber-600 mt-0.5">
            The uploaded image does not match any of the 9 supported fruit
            types.
          </p>
        </div>
      </div>

      <p className="text-stone-600 text-sm">
        Please upload a clear photo of one of these fruits:
      </p>

      {/* Supported fruits mini grid */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
        {SUPPORTED_FRUITS.map((fruit) => (
          <div
            key={fruit}
            className="flex flex-col items-center gap-1 p-2 bg-white rounded-xl border border-amber-100 text-center"
          >
            <span className="text-xl">{FRUIT_EMOJIS[fruit]}</span>
            <span className="text-xs text-stone-600 font-medium leading-tight">
              {fruit}
            </span>
          </div>
        ))}
      </div>

      {/* Tips */}
      <div className="bg-white/70 rounded-xl p-4 space-y-1.5 border border-amber-100">
        <p className="text-xs font-bold text-stone-500 uppercase tracking-wide mb-2">
          Tips for better results:
        </p>
        {[
          "Ensure the fruit is centered and clearly visible",
          "Use good lighting without heavy shadows",
          "Avoid cluttered backgrounds",
        ].map((tip) => (
          <p key={tip} className="text-sm text-stone-600 flex items-center gap-2">
            <span className="text-green-600 font-bold">✓</span>
            {tip}
          </p>
        ))}
      </div>

      <button
        onClick={onReset}
        className="w-full py-3 px-6 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors shadow-sm"
      >
        Try Another Image
      </button>
    </motion.div>
  );
}
