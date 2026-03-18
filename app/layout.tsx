import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "FruitVision — AI-Powered Fruit Classification & Freshness Prediction",
  description:
    "FruitVision uses a custom Convolutional Neural Network to identify 8 fruit types and predict freshness across 5 stages — instantly. BCA Final Year Project, Team D-09 Pixel Mind.",
  keywords: [
    "fruit classification",
    "freshness prediction",
    "AI",
    "CNN",
    "machine learning",
    "fruit analysis",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen bg-stone-50 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
