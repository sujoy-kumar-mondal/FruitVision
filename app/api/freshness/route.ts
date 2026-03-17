/*
 * ============================================================
 * FRUITVISION — FRESHNESS API ROUTE
 * ============================================================
 * CURRENT MODE: MOCK (Dummy Data)
 *
 * TO INTEGRATE THE REAL MODEL:
 * ============================================================
 * 1. The FastAPI service expects:
 *    POST /freshness
 *    Content-Type: multipart/form-data
 *    Fields: "image" (image file), "fruitName" (string)
 *
 * 2. The FastAPI service returns:
 *    {
 *      "stage": int (1-5),
 *      "label": string,
 *      "confidence": float,
 *      "description": string,
 *      "recommendation": string
 *    }
 *
 * 3. Model: One freshness regressor per fruit type
 *    Model files: models/freshness/{fruitname}_regressor.pth
 *    Input: 64x64 RGB image tensor
 *    Output: Discrete stage prediction (1-5)
 *
 * 4. Replace mock block with actual fetch to ML service.
 * ============================================================
 */

import { NextRequest, NextResponse } from "next/server";
import { FreshnessResult, FreshnessStage } from "@/lib/types";
import {
  FRESHNESS_STAGES,
  FRESHNESS_RECOMMENDATIONS,
} from "@/lib/constants";

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/** Weighted random stage selection: 30%, 25%, 20%, 15%, 10% */
function pickWeightedStage(): FreshnessStage {
  const rand = Math.random();
  if (rand < 0.3) return 1;
  if (rand < 0.55) return 2;
  if (rand < 0.75) return 3;
  if (rand < 0.9) return 4;
  return 5;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File | null;
    const fruitName = formData.get("fruitName") as string | null;

    if (!image || !fruitName) {
      return NextResponse.json(
        { message: "Both image and fruitName are required." },
        { status: 400 }
      );
    }

    // =============================================
    // MOCK IMPLEMENTATION — Replace with real ML call
    // =============================================

    // Simulate model inference delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const stage = pickWeightedStage();
    const stageInfo = FRESHNESS_STAGES[stage - 1];
    const confidence = parseFloat(randomBetween(0.8, 0.97).toFixed(4));

    const result: FreshnessResult = {
      stage,
      label: stageInfo.label,
      confidence,
      description: stageInfo.description,
      recommendation: FRESHNESS_RECOMMENDATIONS[stage],
    };

    return NextResponse.json(result);

    // =============================================
    // TODO: MODEL INTEGRATION
    // Replace mock block above with actual fetch to ML service.
    // =============================================
  } catch (error) {
    console.error("[/api/freshness] Error:", error);
    return NextResponse.json(
      { message: "Internal server error during freshness check." },
      { status: 500 }
    );
  }
}
