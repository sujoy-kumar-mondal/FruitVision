"use client";
// components/layout/Navbar.tsx

import Link from "next/link";
import { Leaf } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 border-b border-transparent"
      style={{ borderImage: "linear-gradient(to right, #16a34a, #86efac, #16a34a) 1" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-1.5 rounded-lg bg-green-50 group-hover:bg-green-100 transition-colors">
              <Leaf className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-xl font-bold text-green-700 tracking-tight">
              FruitVision
            </span>
          </Link>

          {/* CTA */}
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-semibold shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
          >
            Try It Now
          </Link>
        </div>
      </div>
      {/* Green gradient bottom border */}
      <div className="h-0.5 w-full bg-gradient-to-r from-green-600 via-green-400 to-green-600" />
    </nav>
  );
}
