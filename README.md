# FruitVision 🍎

> AI-powered fruit classification and freshness prediction system.  
> BCA Final Year Project — Team D-09 (Pixel Mind), Brainware University, 2025.

## Features

- Upload fruit images via drag-and-drop or file browser
- Classify fruit type from 8 supported fruits using HybridConvNet CNN
- Predict freshness across 5 discrete stages
- Clean, animated Next.js frontend with Framer Motion
- Mobile-responsive design

## Supported Fruits

Apple, Banana, Gooseberry, Grapes, Guava, Pear, Purple Grapes, Sapodilla

## Freshness Stages

1. Fresh → 2. Consumable → 3. Rot Started → 4. Almost Rotten → 5. Rotten

## Tech Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS v4 + Framer Motion + Lucide React
- Mock API (replace with FastAPI + PyTorch for production)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Model Integration

See comments in `app/api/classify/route.ts` and `app/api/freshness/route.ts`
for full instructions on connecting the trained PyTorch model.

Toggle `IS_MOCK_MODE` in `lib/constants.ts` to show/hide the demo mode banner.

## Environment Variables

```
ML_SERVICE_URL=http://localhost:8000   # FastAPI microservice URL
```

## Project Structure

```
fruitvision/
├── app/
│   ├── layout.tsx                  # Root layout
│   ├── page.tsx                    # Landing page
│   ├── analyze/page.tsx            # Main analysis page
│   ├── api/classify/route.ts       # Classify API (mock)
│   └── api/freshness/route.ts      # Freshness API (mock)
├── components/
│   ├── layout/                     # Navbar, Footer
│   ├── landing/                    # Hero, HowItWorks, SupportedFruits, TechStack
│   └── analyze/                    # ImageUploader, ImagePreview, ActionButtons,
│                                   #   ClassificationResult, FreshnessResult, UnknownFruitAlert
├── hooks/useAnalysis.ts            # Core analysis state hook
├── lib/
│   ├── api.ts                      # Client-side fetch helpers
│   ├── constants.ts                # Fruits, stages, IS_MOCK_MODE
│   └── types.ts                    # TypeScript interfaces
└── public/fruits/                  # Fruit images for landing page
```

## Team

**Team D-09 — Pixel Mind**  
Brainware University, Department of Computational Science, 2025
