"use client";
// app/analyze/page.tsx

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, AlertCircle, X } from "lucide-react";
import { useAnalysis } from "@/hooks/useAnalysis";
import { IS_MOCK_MODE } from "@/lib/constants";
import ImageUploader from "@/components/analyze/ImageUploader";
import ImagePreview from "@/components/analyze/ImagePreview";
import ActionButtons from "@/components/analyze/ActionButtons";
import ClassificationResult from "@/components/analyze/ClassificationResult";
import FreshnessResult from "@/components/analyze/FreshnessResult";
import UnknownFruitAlert from "@/components/analyze/UnknownFruitAlert";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// ─── Progress Stepper ───────────────────────────────────────────────────
type StepState = "upcoming" | "active" | "complete";

function getStepStates(step: string): [StepState, StepState, StepState] {
  switch (step) {
    case "idle":
      return ["active", "upcoming", "upcoming"];
    case "uploaded":
      return ["complete", "active", "upcoming"];
    case "classifying":
      return ["complete", "active", "upcoming"];
    case "classified":
      return ["complete", "complete", "active"];
    case "unknown":
      return ["complete", "complete", "active"];
    case "checking":
      return ["complete", "complete", "active"];
    case "complete":
      return ["complete", "complete", "complete"];
    default:
      return ["active", "upcoming", "upcoming"];
  }
}

interface StepBubbleProps {
  label: string;
  number: number;
  state: StepState;
  isLoading?: boolean;
}

function StepBubble({ label, number, state, isLoading }: StepBubbleProps) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative">
        {state === "complete" ? (
          <div className="w-9 h-9 rounded-full bg-green-600 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
        ) : state === "active" ? (
          <div className="relative w-9 h-9">
            {/* Pulsing ring */}
            <span className="absolute inset-0 rounded-full bg-green-400/30 animate-ping" />
            <div className="relative w-9 h-9 rounded-full bg-green-600 flex items-center justify-center text-white text-sm font-bold">
              {isLoading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                number
              )}
            </div>
          </div>
        ) : (
          <div className="w-9 h-9 rounded-full bg-transparent border-2 border-stone-300 flex items-center justify-center text-stone-400 text-sm font-bold">
            {number}
          </div>
        )}
      </div>
      <span
        className={`text-xs font-semibold hidden sm:block ${
          state === "upcoming" ? "text-stone-400" : "text-stone-700"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function Connector({ done }: { done: boolean }) {
  return (
    <div
      className={`flex-1 h-0.5 mx-1 mt-[-18px] transition-colors duration-500 ${
        done ? "bg-green-500" : "bg-stone-200"
      }`}
    />
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────
export default function AnalyzePage() {
  const {
    step,
    uploadedImage,
    previewUrl,
    classificationResult,
    freshnessResult,
    error,
    handleImageUpload,
    handleClassify,
    handleCheckFreshness,
    handleReset,
  } = useAnalysis();

  const [s1, s2, s3] = getStepStates(step);
  const isChecking = step === "checking";
  const isClassifying = step === "classifying";

  const showImageUploader = step === "idle";
  const showImagePreview = step !== "idle" && previewUrl && uploadedImage;
  const showClassificationResult =
    classificationResult &&
    (step === "classified" || step === "checking" || step === "complete");
  const showFreshnessResult = freshnessResult && step === "complete";
  const showUnknown = step === "unknown";
  const showActions = step !== "idle";
  const showReset = step !== "idle";

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-4 bg-stone-50">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-green-700 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          {/* Page title */}
          <div>
            <h1 className="text-3xl font-extrabold text-stone-900">
              Fruit Analyzer
            </h1>
            <p className="text-stone-500 mt-1">
              Upload a fruit image to classify and check its freshness
            </p>
          </div>

          {/* Mock Mode Banner */}
          {IS_MOCK_MODE && (
            <div className="flex items-center gap-3 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm">
              <span className="text-lg">ℹ️</span>
              <span>
                <span className="font-semibold">Demo Mode:</span> Using mock AI
                responses. Connect the FastAPI service to run real inference.
              </span>
            </div>
          )}

          {/* Progress Stepper */}
          <div className="flex items-start gap-0 bg-white rounded-2xl shadow-sm border border-stone-100 px-6 py-5">
            <StepBubble
              label="Upload"
              number={1}
              state={s1}
            />
            <Connector done={s1 === "complete"} />
            <StepBubble
              label="Classify"
              number={2}
              state={s2}
              isLoading={isClassifying}
            />
            <Connector done={s2 === "complete"} />
            <StepBubble
              label="Freshness"
              number={3}
              state={s3}
              isLoading={isChecking}
            />
          </div>

          {/* Error Banner */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm"
              >
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span className="flex-1">{error}</span>
                <button
                  onClick={() => {}}
                  className="text-red-400 hover:text-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Card */}
          <motion.div
            layout
            className="bg-white rounded-2xl shadow-lg border border-stone-100 p-6 space-y-6"
          >
            {/* Image Uploader */}
            {showImageUploader && (
              <ImageUploader onImageUpload={handleImageUpload} />
            )}

            {/* Image Preview */}
            {showImagePreview && (
              <ImagePreview
                previewUrl={previewUrl!}
                fileName={uploadedImage!.name}
                fileSize={uploadedImage!.size}
              />
            )}

            {/* Action Buttons */}
            {showActions && (
              <ActionButtons
                step={step}
                onClassify={handleClassify}
                onCheckFreshness={handleCheckFreshness}
              />
            )}
          </motion.div>

          {/* Results */}
          <AnimatePresence mode="wait">
            {showUnknown && (
              <UnknownFruitAlert key="unknown" onReset={handleReset} />
            )}
          </AnimatePresence>

          {showClassificationResult && (
            <ClassificationResult result={classificationResult} />
          )}

          {showFreshnessResult && classificationResult?.fruitName && (
            <FreshnessResult
              result={freshnessResult}
              fruitName={classificationResult.fruitName}
              onReset={handleReset}
            />
          )}

          {/* Reset Button */}
          {showReset && !showFreshnessResult && !showUnknown && (
            <div className="text-center">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 text-sm font-semibold text-stone-500 hover:text-red-600 border border-stone-200 hover:border-red-200 rounded-xl transition-colors"
              >
                Reset &amp; Start Over
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
