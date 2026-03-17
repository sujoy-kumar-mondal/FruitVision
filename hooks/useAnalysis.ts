"use client";
// hooks/useAnalysis.ts

import { useState, useCallback } from "react";
import { classifyFruit, checkFreshness } from "@/lib/api";
import {
  AnalysisStep,
  ClassificationResult,
  FreshnessResult,
} from "@/lib/types";
import { FruitName } from "@/lib/types";

interface UseAnalysisReturn {
  // State
  step: AnalysisStep;
  uploadedImage: File | null;
  previewUrl: string | null;
  classificationResult: ClassificationResult | null;
  freshnessResult: FreshnessResult | null;
  error: string | null;

  // Actions
  handleImageUpload: (file: File) => void;
  handleClassify: () => Promise<void>;
  handleCheckFreshness: () => Promise<void>;
  handleReset: () => void;

  // Computed
  canClassify: boolean;
  canCheckFreshness: boolean;
  isLoading: boolean;
}

export function useAnalysis(): UseAnalysisReturn {
  const [step, setStep] = useState<AnalysisStep>("idle");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [classificationResult, setClassificationResult] =
    useState<ClassificationResult | null>(null);
  const [freshnessResult, setFreshnessResult] =
    useState<FreshnessResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback((file: File) => {
    // Validate type
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file (JPG, PNG, or WEBP).");
      return;
    }

    // Validate size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      setError("Image file size must be under 10MB.");
      return;
    }

    // Revoke previous object URL if any
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });

    const url = URL.createObjectURL(file);
    setUploadedImage(file);
    setPreviewUrl(url);
    setStep("uploaded");
    setError(null);
    setClassificationResult(null);
    setFreshnessResult(null);
  }, []);

  const handleClassify = useCallback(async () => {
    if (!uploadedImage) return;

    setStep("classifying");
    setError(null);

    try {
      const result = await classifyFruit(uploadedImage);
      setClassificationResult(result);

      if (result.isKnownFruit) {
        setStep("classified");
      } else {
        setStep("unknown");
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Classification failed.";
      setError(message);
      setStep("uploaded");
    }
  }, [uploadedImage]);

  const handleCheckFreshness = useCallback(async () => {
    if (!uploadedImage || !classificationResult?.fruitName) return;
    if (step !== "classified") return;

    setStep("checking");
    setError(null);

    try {
      const result = await checkFreshness(
        uploadedImage,
        classificationResult.fruitName as FruitName
      );
      setFreshnessResult(result);
      setStep("complete");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Freshness check failed.";
      setError(message);
      setStep("classified");
    }
  }, [uploadedImage, classificationResult, step]);

  const handleReset = useCallback(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setStep("idle");
    setUploadedImage(null);
    setPreviewUrl(null);
    setClassificationResult(null);
    setFreshnessResult(null);
    setError(null);
  }, [previewUrl]);

  const canClassify = step === "uploaded";
  const canCheckFreshness = step === "classified";
  const isLoading = step === "classifying" || step === "checking";

  return {
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
    canClassify,
    canCheckFreshness,
    isLoading,
  };
}
