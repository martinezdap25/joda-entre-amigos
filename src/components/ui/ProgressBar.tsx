"use client";

interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full max-w-[420px] h-[3px] rounded-full bg-white/[0.06] overflow-hidden">
      <div
        className="h-full rounded-full gradient-fire transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
