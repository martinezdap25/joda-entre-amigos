"use client";

import { RotateCcw, DoorOpen } from "lucide-react";

interface GameOverProps {
  totalCards: number;
  onRestart: () => void;
  onExit: () => void;
}

export function GameOver({ totalCards, onRestart, onExit }: GameOverProps) {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-6 relative z-10 animate-fade-up">
      <div className="text-7xl mb-5">🏆</div>

      <h2 className="font-display text-brand-yellow text-center text-4xl mb-3">
        ¡SE ACABARON LAS CARTAS!
      </h2>

      <p className="font-body text-white/40 text-base mb-8 text-center">
        Sobrevivieron {totalCards} rondas. Respeto.
      </p>

      <div className="flex gap-3 flex-wrap justify-center">
        <button onClick={onRestart} className="btn-primary max-w-[220px] flex items-center justify-center gap-2">
          <RotateCcw size={18} strokeWidth={2.5} />
          OTRA RONDA
        </button>

        <button onClick={onExit} className="btn-secondary flex items-center justify-center gap-2">
          <DoorOpen size={18} strokeWidth={2.5} />
          SALIR
        </button>
      </div>
    </div>
  );
}
