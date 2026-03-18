// lib/constants.ts

import { FreshnessInfo, FruitName } from "./types";

/**
 * Set to false to hide the mock mode banner on the analyze page.
 * Switch to false when the real FastAPI ML service is connected.
 */
export const IS_MOCK_MODE = true;

export const SUPPORTED_FRUITS: FruitName[] = [
  "Apple",
  "Banana",
  "Gooseberry",
  "Grapes",
  "Guava",
  "Pear",
  "Purple Grapes",
  "Sapodilla",
];

export const FRUIT_EMOJIS: Record<FruitName, string> = {
  Apple: "🍎",
  Banana: "🍌",
  Gooseberry: "🫐",
  Grapes: "🍇",
  Guava: "🍈",
  Pear: "🍐",
  "Purple Grapes": "🍇",
  Sapodilla: "🟤",
};

export const FRUIT_IMAGES: Record<FruitName, string> = {
  Apple: "/fruits/apple.jpg",
  Banana: "/fruits/banana.jpg",
  Gooseberry: "/fruits/gooseberry.jpg",
  Grapes: "/fruits/grapes.jpg",
  Guava: "/fruits/guava.jpg",
  Pear: "/fruits/pear.jpg",
  "Purple Grapes": "/fruits/purple_grapes.jpg",
  Sapodilla: "/fruits/sapodilla.jpg",
};

export const FRESHNESS_STAGES: FreshnessInfo[] = [
  {
    stage: 1,
    label: "Fresh",
    description:
      "This fruit is in perfect condition. Ideal for immediate consumption.",
    color: "text-green-700",
    bgColor: "bg-green-100",
    emoji: "✅",
  },
  {
    stage: 2,
    label: "Consumable",
    description:
      "Still good to eat. Consume within a day or two for best experience.",
    color: "text-lime-700",
    bgColor: "bg-lime-100",
    emoji: "👍",
  },
  {
    stage: 3,
    label: "Rot Started",
    description:
      "Early signs of deterioration. Can still be used for cooking or juices.",
    color: "text-yellow-700",
    bgColor: "bg-yellow-100",
    emoji: "⚠️",
  },
  {
    stage: 4,
    label: "Almost Rotten",
    description:
      "Significant decay present. Not recommended for direct consumption.",
    color: "text-orange-700",
    bgColor: "bg-orange-100",
    emoji: "🔴",
  },
  {
    stage: 5,
    label: "Rotten",
    description: "Fruit has fully deteriorated. Discard immediately.",
    color: "text-red-700",
    bgColor: "bg-red-100",
    emoji: "❌",
  },
];

export const FRESHNESS_RECOMMENDATIONS: Record<number, string> = {
  1: "Perfect for eating fresh! Store in a cool dry place.",
  2: "Consume soon. Refrigerate to extend shelf life by 1-2 days.",
  3: "Best used for cooking, smoothies, or jam. Avoid raw consumption.",
  4: "Not suitable for consumption. Discard or compost.",
  5: "Discard immediately. Do not consume under any circumstances.",
};
