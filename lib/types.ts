// lib/types.ts

export type FruitName =
  | "Apple"
  | "Banana"
  | "Gooseberry"
  | "Grapes"
  | "Guava"
  | "Pear"
  | "Purple Grapes"
  | "Sapodilla";

export type FreshnessStage = 1 | 2 | 3 | 4 | 5;

export interface FreshnessInfo {
  stage: FreshnessStage;
  label: string;
  description: string;
  color: string;
  bgColor: string;
  emoji: string;
}

export interface ClassificationResult {
  isKnownFruit: boolean;
  fruitName: FruitName | null;
  confidence: number; // 0.0 to 1.0
  allProbabilities: {
    fruit: FruitName;
    probability: number;
  }[];
}

export interface FreshnessResult {
  stage: FreshnessStage;
  label: string;
  confidence: number;
  description: string;
  recommendation: string;
}

export type AnalysisStep =
  | "idle"
  | "uploaded"
  | "classifying"
  | "classified"
  | "unknown"
  | "checking"
  | "complete";
