"use client";

import { useState, useRef, useEffect } from "react";
import { audioManager } from "@/lib/audioManager";

interface CardTimerProps {
  duration: number;
  accentColor: string;
  large?: boolean;   // modo BASTA: botón interactivo que reinicia al presionar
  tickVolumeScale?: number; // escala de volumen para los ticks (default 1)
  onRunningChange?: (running: boolean) => void;
  onDone?: () => void; // llamado una sola vez cuando el timer expira
}

type TimerStatus = "idle" | "running" | "done";

export function CardTimer({ duration, accentColor, large = false, tickVolumeScale = 1, onRunningChange, onDone }: CardTimerProps) {
  const [status, setStatus] = useState<TimerStatus>("idle");
  const [remaining, setRemaining] = useState(duration);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      audioManager.stopTimerTick();
    };
  }, []);

  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    let current = duration;
    intervalRef.current = setInterval(() => {
      current -= 1;
      if (current <= 0) {
        clearInterval(intervalRef.current!);
        audioManager.stopTimerTick();
        setRemaining(0);
        setStatus("done");
        onRunningChange?.(false);
        onDone?.();
      } else {
        setRemaining(current);
        // Tick de bomba: urgente en los últimos 3 segundos
        audioManager.playTimerTick(current <= 3, tickVolumeScale);
      }
    }, 1000);
  };

  const handleStart = () => {
    setRemaining(duration);
    setStatus("running");
    onRunningChange?.(true);
    if (large) audioManager.playBastaPress();
    startInterval();
  };

  // Modo BASTA: reinicia y arranca de inmediato sin animación
  const handlePress = () => {
    audioManager.stopTimerTick();
    audioManager.playBastaPress();
    setRemaining(duration);
    startInterval();
  };

  const isUrgent = remaining <= 3 && remaining > 0;

  // ── IDLE ──────────────────────────────────────────────────
  if (status === "idle") {
    return (
      <button
        onClick={handleStart}
        className={`mt-5 flex items-center justify-center border font-display tracking-[0.22em] uppercase transition-all duration-150 hover:scale-[1.03] active:scale-[0.97] ${
          large ? "px-10 py-5 text-lg w-full max-w-[260px]" : "px-5 py-2 text-[11px]"
        }`}
        style={{
          borderColor: `${accentColor}70`,
          color: accentColor,
          background: `${accentColor}10`,
        }}
      >
        INICIAR · {duration}s
      </button>
    );
  }

  // ── DONE ──────────────────────────────────────────────────
  if (status === "done") {
    return (
      <div
        className={`mt-5 border font-display tracking-[0.28em] uppercase animate-pulse text-center ${
          large ? "px-10 py-5 text-2xl w-full max-w-[260px]" : "px-6 py-2 text-sm"
        }`}
        style={{
          borderColor: "#ff4444cc",
          color: "#ff4444",
          background: "#ff111115",
        }}
      >
        ¡TIEMPO!
      </div>
    );
  }

  // ── RUNNING modo normal (timer pasivo, no interactivo) ────
  if (!large) {
    return (
      <div className="mt-5 flex items-center gap-3">
        <span
          className="font-display text-3xl font-bold tabular-nums"
          style={{ color: isUrgent ? "#ff4444" : accentColor }}
        >
          {remaining}
        </span>
        <span
          className="font-display text-[10px] tracking-[0.25em] uppercase opacity-50"
          style={{ color: accentColor }}
        >
          seg
        </span>
      </div>
    );
  }

  // ── RUNNING modo BASTA (botón grande interactivo) ─────────
  return (
    <div className="mt-5 flex flex-col items-center gap-2 w-full max-w-[260px]">
      <button
        onClick={handlePress}
        className="w-full py-6 border-2 font-display font-bold transition-all duration-75 active:scale-95 flex flex-col items-center justify-center gap-1"
        style={{
          borderColor: isUrgent ? "#ff4444" : `${accentColor}90`,
          color: isUrgent ? "#ff4444" : accentColor,
          background: isUrgent ? "#ff111120" : `${accentColor}12`,
        }}
      >
        <span className="text-6xl tabular-nums leading-none">{remaining}</span>
      </button>
    </div>
  );
}
