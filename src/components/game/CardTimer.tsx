"use client";

import { useState, useEffect, useRef } from "react";

interface CardTimerProps {
  duration: number;  // segundos
  accentColor: string;
  onRunningChange?: (running: boolean) => void;
}

type TimerStatus = "idle" | "running" | "done";

export function CardTimer({ duration, accentColor, onRunningChange }: CardTimerProps) {
  const [status, setStatus] = useState<TimerStatus>("idle");
  const [remaining, setRemaining] = useState(duration);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Cuando cambia la carta (nueva duration llega), componente remonta por key en CardDisplay
  // así que este efecto solo limpia al desmontar
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleStart = () => {
    setRemaining(duration);
    setStatus("running");
    onRunningChange?.(true);
  };

  useEffect(() => {
    if (status !== "running") return;

    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setStatus("done");
          onRunningChange?.(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [status]);

  // Geometría del ring SVG
  const R = 30;
  const CIRC = 2 * Math.PI * R;
  const strokeDashoffset = CIRC * (1 - remaining / duration);

  // ── IDLE ──────────────────────────────────────────────────
  if (status === "idle") {
    return (
      <button
        onClick={handleStart}
        className="mt-5 flex items-center gap-2 px-5 py-2 border font-display text-[11px] tracking-[0.22em] uppercase transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
        style={{
          borderColor: `${accentColor}70`,
          color: accentColor,
          background: `${accentColor}10`,
        }}
      >
        <span className="text-base">⏱️</span>
        INICIAR · {duration}s
      </button>
    );
  }

  // ── DONE ──────────────────────────────────────────────────
  if (status === "done") {
    return (
      <div
        className="mt-5 px-6 py-2 border font-display text-sm tracking-[0.28em] uppercase animate-pulse"
        style={{
          borderColor: `${accentColor}80`,
          color: accentColor,
          background: `${accentColor}15`,
        }}
      >
        ¡TIEMPO!
      </div>
    );
  }

  // ── RUNNING ───────────────────────────────────────────────
  return (
    <div className="mt-5 flex flex-col items-center select-none">
      <div className="relative w-[76px] h-[76px] flex items-center justify-center">
        {/* Ring SVG */}
        <svg
          width="76"
          height="76"
          viewBox="0 0 76 76"
          className="-rotate-90 absolute inset-0"
        >
          {/* Track */}
          <circle
            cx="38" cy="38" r={R}
            fill="none"
            stroke={`${accentColor}20`}
            strokeWidth="5"
          />
          {/* Progress */}
          <circle
            cx="38" cy="38" r={R}
            fill="none"
            stroke={accentColor}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: "stroke-dashoffset 1s linear" }}
          />
        </svg>

        {/* Número central */}
        <span
          className="relative font-display text-2xl font-bold z-10"
          style={{ color: accentColor }}
        >
          {remaining}
        </span>
      </div>

      <span
        className="font-display text-[10px] tracking-[0.25em] uppercase mt-1 opacity-50"
        style={{ color: accentColor }}
      >
        segundos
      </span>
    </div>
  );
}
