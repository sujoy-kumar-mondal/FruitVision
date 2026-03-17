"use client";
// components/analyze/ActionButtons.tsx

import { ScanSearch, Activity, Loader2 } from "lucide-react";
import { AnalysisStep } from "@/lib/types";

interface Props {
  step: AnalysisStep;
  onClassify: () => void;
  onCheckFreshness: () => void;
}

export default function ActionButtons({
  step,
  onClassify,
  onCheckFreshness,
}: Props) {
  const isClassifying = step === "classifying";
  const isChecking = step === "checking";
  const classifyEnabled = step === "uploaded";
  const freshnessEnabled = step === "classified";

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Classify Button */}
      <button
        onClick={onClassify}
        disabled={!classifyEnabled || isClassifying}
        className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-base font-semibold transition-all duration-200 ${
          classifyEnabled
            ? "bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5"
            : "bg-stone-100 text-stone-400 cursor-not-allowed"
        }`}
      >
        {isClassifying ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Classifying...
          </>
        ) : (
          <>
            <ScanSearch className="w-5 h-5" />
            Classify Fruit Type
          </>
        )}
      </button>

      {/* Freshness Button */}
      <div className="relative group">
        <button
          onClick={onCheckFreshness}
          disabled={!freshnessEnabled || isChecking}
          className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-base font-semibold transition-all duration-200 ${
            freshnessEnabled
              ? "bg-orange-500 hover:bg-orange-600 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5"
              : "bg-stone-100 text-stone-400 cursor-not-allowed"
          }`}
        >
          {isChecking ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Checking Freshness...
            </>
          ) : (
            <>
              <Activity className="w-5 h-5" />
              Check Freshness
            </>
          )}
        </button>

        {/* Tooltip for disabled state */}
        {!freshnessEnabled && step !== "complete" && step !== "checking" && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-stone-800 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
            Classify the fruit first
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-stone-800" />
          </div>
        )}
      </div>
    </div>
  );
}
