"use client";

interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full max-w-[420px] h-[5px] rounded-full bg-[#C9A84C]/10 overflow-hidden shadow-[0_0_8px_#C9A84C44]">
      <div
        className="h-full rounded-full bg-gradient-to-r from-[#C9A84C] via-[#F0D98A] to-[#C9A84C] shadow-[0_0_12px_#C9A84C88] transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
