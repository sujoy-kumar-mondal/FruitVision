"use client";
// components/analyze/ImagePreview.tsx

interface Props {
  previewUrl: string;
  fileName: string;
  fileSize: number;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function ImagePreview({ previewUrl, fileName, fileSize }: Props) {
  const truncated =
    fileName.length > 36 ? fileName.slice(0, 33) + "..." : fileName;

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <div className="w-full rounded-xl overflow-hidden shadow-lg border border-stone-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={previewUrl}
          alt="Uploaded fruit preview"
          className="w-full max-h-80 object-contain bg-stone-100"
          style={{ maxHeight: 320 }}
        />
      </div>
      <div className="text-center space-y-0.5">
        <p className="text-sm font-medium text-stone-600 truncate max-w-xs">
          {truncated}
        </p>
        <p className="text-xs text-stone-400">{formatFileSize(fileSize)}</p>
      </div>
    </div>
  );
}
