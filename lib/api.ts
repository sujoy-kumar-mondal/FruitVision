// lib/api.ts
// Client-side helper functions for calling Next.js API routes

import { ClassificationResult, FreshnessResult, FruitName } from "./types";

export async function classifyFruit(image: File): Promise<ClassificationResult> {
  const formData = new FormData();
  formData.append("image", image);

  const response = await fetch("/api/classify", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Classification failed. Please try again.");
  }

  return response.json();
}

export async function checkFreshness(
  image: File,
  fruitName: FruitName
): Promise<FreshnessResult> {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("fruitName", fruitName);

  const response = await fetch("/api/freshness", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      error.message || "Freshness check failed. Please try again."
    );
  }

  return response.json();
}
