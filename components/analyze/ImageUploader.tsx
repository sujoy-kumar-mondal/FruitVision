"use client";
// components/analyze/ImageUploader.tsx

import { useRef, useState, DragEvent, ChangeEvent } from "react";
import { UploadCloud } from "lucide-react";

interface Props {
  onImageUpload: (file: File) => void;
}

export default function ImageUploader({ onImageUpload }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) onImageUpload(file);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onImageUpload(file);
    // Reset input so the same file can be re-uploaded
    e.target.value = "";
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`relative flex flex-col items-center justify-center gap-4 w-full min-h-[280px] rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-200 ${
        isDragging
          ? "border-green-500 bg-green-50 scale-[1.01]"
          : "border-stone-300 bg-stone-50 hover:border-green-400 hover:bg-green-50/50"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />

      {/* Icon */}
      <div
        className={`p-5 rounded-full transition-colors ${
          isDragging ? "bg-green-100" : "bg-stone-100"
        }`}
      >
        <UploadCloud
          className={`w-12 h-12 transition-colors ${
            isDragging ? "text-green-600" : "text-stone-400"
          }`}
        />
      </div>

      {/* Text */}
      <div className="text-center space-y-1 select-none">
        {isDragging ? (
          <p className="text-xl font-semibold text-green-600">Drop it! 🍎</p>
        ) : (
          <>
            <p className="text-base font-medium text-stone-700">
              Drag & drop your fruit photo here
            </p>
            <p className="text-sm text-stone-400">or</p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                inputRef.current?.click();
              }}
              className="px-5 py-2 border-2 border-green-500 text-green-600 font-semibold text-sm rounded-lg hover:bg-green-50 transition-colors"
            >
              Browse File
            </button>
          </>
        )}
      </div>

      <p className="text-xs text-stone-400">
        Supports JPG, PNG, WEBP — Max 10MB
      </p>
    </div>
  );
}
