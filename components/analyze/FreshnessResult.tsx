"use client";
// components/analyze/FreshnessResult.tsx

import { motion } from "framer-motion";
import { FreshnessResult as FResult } from "@/lib/types";
import { FRESHNESS_STAGES } from "@/lib/constants";
import { FruitName } from "@/lib/types";
import { FRUIT_EMOJIS } from "@/lib/constants";

interface Props {
  result: FResult;
  fruitName: FruitName;
  onReset: () => void;
}

const METER_COLORS = [
  "bg-green-500",
  "bg-lime-500",
  "bg-yellow-400",
  "bg-orange-500",
  "bg-red-500",
];

const METER_LABELS = ["Fresh", "Consumable", "Rot Started", "Almost Rotten", "Rotten"];

const STAGE_BG = [
  "bg-green-50 border-green-200",
  "bg-lime-50 border-lime-200",
  "bg-yellow-50 border-yellow-200",
  "bg-orange-50 border-orange-200",
  "bg-red-50 border-red-200",
];

const REC_BG = [
  "bg-green-50",
  "bg-lime-50",
  "bg-yellow-50",
  "bg-orange-50",
  "bg-red-50",
];

export default function FreshnessResult({ result, fruitName, onReset }: Props) {
  const { stage, label, confidence, description, recommendation } = result;
  const stageInfo = FRESHNESS_STAGES[stage - 1];
  const fruitEmoji = FRUIT_EMOJIS[fruitName];
  const confidencePct = Math.round(confidence * 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full space-y-5"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-8 rounded-full bg-orange-500" />
        <h3 className="text-xl font-bold text-stone-800">Freshness Report</h3>
      </div>

      {/* 5-Stage Meter */}
      <div className="bg-white rounded-2xl shadow-md border border-stone-100 p-6 space-y-3">
        <p className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-4">
          Freshness Meter
        </p>
        <div className="flex gap-1.5">
          {METER_COLORS.map((color, i) => {
            const isActive = i + 1 === stage;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <motion.div
                  animate={isActive ? { scaleY: 1.2, y: -4 } : { scaleY: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`w-full h-5 rounded-full ${color} ${
                    isActive
                      ? "opacity-100 shadow-md ring-2 ring-offset-1 ring-stone-300"
                      : "opacity-30"
                  }`}
                />
                <span className="text-[9px] font-medium text-stone-400 text-center leading-tight hidden sm:block">
                  {METER_LABELS[i]}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-1 sm:hidden">
          {METER_LABELS.map((l) => (
            <span key={l} className="text-[9px] text-stone-400 text-center" style={{ width: "20%" }}>
              {l}
            </span>
          ))}
        </div>
      </div>

      {/* Stage Result Card */}
      <div
        className={`rounded-2xl border p-6 space-y-4 ${STAGE_BG[stage - 1]}`}
      >
        <div className="flex flex-wrap items-start gap-4">
          <span className="text-5xl">{stageInfo.emoji}</span>
          <div className="flex-1">
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-1">
              Stage {stage} / 5
            </p>
            <p className={`text-2xl font-extrabold ${stageInfo.color}`}>
              {label}
            </p>
            <span className="inline-flex items-center mt-2 px-3 py-1 bg-white/70 text-stone-600 text-sm font-semibold rounded-full border border-stone-200">
              {confidencePct}% confidence
            </span>
          </div>
        </div>
        <p className="text-stone-600 leading-relaxed">{description}</p>

        {/* Recommendation */}
        <div className={`rounded-xl p-4 ${REC_BG[stage - 1]} border border-current/10`}>
          <div className="flex items-start gap-2">
            <span className="text-base">💡</span>
            <div>
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wide">
                Recommendation:
              </span>
              <p className={`text-sm font-medium mt-0.5 ${stageInfo.color}`}>
                {recommendation}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-5 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{fruitEmoji}</span>
          <div>
            <p className="text-sm text-stone-400 font-medium">Summary</p>
            <p className="text-base font-bold text-stone-800">
              {fruitName} — Stage {stage}:{" "}
              <span className={stageInfo.color}>{label}</span>
            </p>
          </div>
        </div>
        <button
          onClick={onReset}
          className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold text-sm rounded-xl transition-all shadow-sm hover:shadow-md"
        >
          Start New Analysis
        </button>
      </div>
    </motion.div>
  );
}
