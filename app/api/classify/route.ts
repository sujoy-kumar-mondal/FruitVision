/*
 * ============================================================
 * FRUITVISION — CLASSIFY API ROUTE
 * ============================================================
 * CURRENT MODE: MOCK (Dummy Data)
 *
 * TO INTEGRATE THE REAL MODEL:
 * ============================================================
 * 1. Start the FastAPI Python microservice:
 *    cd model-service
 *    uvicorn main:app --reload --port 8000
 *
 * 2. The FastAPI service expects:
 *    POST /classify
 *    Content-Type: multipart/form-data
 *    Field: "image" (image file)
 *
 * 3. The FastAPI service returns:
 *    {
 *      "isKnownFruit": boolean,
 *      "fruitName": string | null,
 *      "confidence": float,
 *      "allProbabilities": [{"fruit": string, "probability": float}]
 *    }
 *
 * 4. Model file: models/fruitvision_phase2.pth
 *    Architecture: HybridConvNet (custom PyTorch CNN)
 *    Input: 64x64 RGB image tensor
 *    Output: 9-class softmax probabilities
 *    Classes (in order): Apple, Banana, Custard Apple, Gooseberry,
 *                        Grapes, Guava, Pear, Purple Grapes, Sapodilla
 *
 * 5. Replace the mock block below with:
 *    const formData = new FormData();
 *    formData.append("image", imageFile);
 *    const mlResponse = await fetch(
 *      process.env.ML_SERVICE_URL + "/classify",
 *      { method: "POST", body: formData }
 *    );
 *    const result = await mlResponse.json();
 *    return NextResponse.json(result);
 *
 * 6. Add to .env.local:
 *    ML_SERVICE_URL=http://localhost:8000
 * ============================================================
 */

import { NextRequest, NextResponse } from "next/server";
import { ClassificationResult, FruitName } from "@/lib/types";
import { SUPPORTED_FRUITS } from "@/lib/constants";

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/** Generate random probabilities for all 9 fruits that sum to 1.0 */
function generateProbabilities(
  topFruit: FruitName,
  topConfidence: number
): { fruit: FruitName; probability: number }[] {
  const remaining = 1 - topConfidence;
  const others = SUPPORTED_FRUITS.filter((f) => f !== topFruit);

  // Random weights for remaining fruits
  const weights = others.map(() => Math.random());
  const total = weights.reduce((sum, w) => sum + w, 0);
  const normalized = weights.map((w) => (w / total) * remaining);

  const result = others.map((fruit, i) => ({
    fruit,
    probability: normalized[i],
  }));

  result.push({ fruit: topFruit, probability: topConfidence });

  // Sort by probability descending
  return result.sort((a, b) => b.probability - a.probability);
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File | null;

    if (!image) {
      return NextResponse.json(
        { message: "No image file provided." },
        { status: 400 }
      );
    }

    // =============================================
    // MOCK IMPLEMENTATION — Replace with real ML call
    // =============================================

    // Simulate model inference delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // 15% chance of unknown fruit
    const isUnknown = Math.random() < 0.15;

    if (isUnknown) {
      const result: ClassificationResult = {
        isKnownFruit: false,
        fruitName: null,
        confidence: 0.0,
        allProbabilities: [],
      };
      return NextResponse.json(result);
    }

    // Pick a random fruit and confidence
    const chosenFruit =
      SUPPORTED_FRUITS[Math.floor(Math.random() * SUPPORTED_FRUITS.length)];
    const confidence = parseFloat(randomBetween(0.75, 0.99).toFixed(4));
    const allProbabilities = generateProbabilities(chosenFruit, confidence);

    const result: ClassificationResult = {
      isKnownFruit: true,
      fruitName: chosenFruit,
      confidence,
      allProbabilities,
    };

    return NextResponse.json(result);

    // =============================================
    // TODO: MODEL INTEGRATION
    // Replace mock block above with:
    // const formData = new FormData();
    // formData.append("image", imageFile);
    // const response = await fetch("http://localhost:8000/classify", {
    //   method: "POST",
    //   body: formData
    // });
    // const result = await response.json();
    // return NextResponse.json(result);
    //
    // The FastAPI service will load the trained HybridConvNet PyTorch model
    // and run inference. Model file path: models/fruitvision_phase2.pth
    // =============================================
  } catch (error) {
    console.error("[/api/classify] Error:", error);
    return NextResponse.json(
      { message: "Internal server error during classification." },
      { status: 500 }
    );
  }
}
