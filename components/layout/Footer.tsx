// components/layout/Footer.tsx

import { Leaf } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-green-100 bg-white/60 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-green-700">
          <Leaf className="w-4 h-4" />
          <span className="font-semibold text-sm">FruitVision</span>
        </div>
        <p className="text-xs text-stone-500">
          FruitVision — BCA Final Year Project | Team D-09 (Pixel Mind)
        </p>
        <p className="text-xs text-stone-400">
          Brainware University, Department of Computational Science, 2025
        </p>
      </div>
    </footer>
  );
}
