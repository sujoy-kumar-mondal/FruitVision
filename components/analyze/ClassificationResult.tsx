"use client";
// components/analyze/ClassificationResult.tsx

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ClassificationResult as CResult } from "@/lib/types";
import { FRUIT_EMOJIS } from "@/lib/constants";

interface Props {
  result: CResult;
}

export default function ClassificationResult({ result }: Props) {
  const [expanded, setExpanded] = useState(false);
  const { fruitName, confidence, allProbabilities } = result;

  if (!fruitName) return null;

  const emoji = FRUIT_EMOJIS[fruitName];
  const pct = Math.round(confidence * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full bg-white rounded-2xl shadow-lg border-l-4 border-l-green-500 border border-stone-100 overflow-hidden"
    >
      <div className="p-6 space-y-5">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-5xl">{emoji}</span>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-stone-800">{fruitName}</h3>
            <span className="inline-flex items-center mt-1 px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
              Identified with {pct}% confidence
            </span>
          </div>
        </div>

        {/* Confidence Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-stone-500 font-medium">
            <span>Classification Confidence</span>
            <span className="text-green-700 font-bold">{pct}%</span>
          </div>
          <div className="w-full bg-stone-100 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full"
            />
          </div>
        </div>

        {/* Collapsible Probabilities */}
        <button
          onClick={() => setExpanded((p) => !p)}
          className="flex items-center gap-2 text-sm font-semibold text-green-700 hover:text-green-800 transition-colors"
        >
          {expanded ? (
            <>
              <ChevronUp className="w-4 h-4" /> Hide All Probabilities
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" /> View All Probabilities
            </>
          )}
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden space-y-2"
            >
              {allProbabilities.map((item, i) => {
                const isTop = i === 0;
                const itemPct = Math.round(item.probability * 100);
                return (
                  <div key={item.fruit} className="flex items-center gap-3">
                    <span className="text-sm w-4 text-center">
                      {FRUIT_EMOJIS[item.fruit]}
                    </span>
                    <span
                      className={`text-xs w-24 shrink-0 font-medium ${
                        isTop ? "text-green-700" : "text-stone-500"
                      }`}
                    >
                      {item.fruit}
                    </span>
                    <div className="flex-1 bg-stone-100 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${itemPct}%` }}
                        transition={{ duration: 0.6, delay: i * 0.04 }}
                        className={`h-full rounded-full ${
                          isTop ? "bg-green-500" : "bg-stone-300"
                        }`}
                      />
                    </div>
                    <span
                      className={`text-xs font-semibold w-8 text-right ${
                        isTop ? "text-green-700" : "text-stone-400"
                      }`}
                    >
                      {itemPct}%
                    </span>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
