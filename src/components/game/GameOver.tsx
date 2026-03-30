"use client";

import { RotateCcw, DoorOpen } from "lucide-react";
import { PlayerScore } from "@/lib/types";

interface GameOverProps {
  totalCards: number;
  scores: PlayerScore[];
  onRestart: () => void;
  onExit: () => void;
}

export function GameOver({ totalCards, scores, onRestart, onExit }: GameOverProps) {
  // Campeón: más medallas (desempate: menos copas)
  const champion = [...scores].sort((a, b) =>
    b.medals - a.medals || a.drinks - b.drinks
  )[0];

  // Perdedor: más copas (desempate: menos medallas)
  const loser = [...scores].sort((a, b) =>
    b.drinks - a.drinks || a.medals - b.medals
  )[0];

  // Ranking por medallas
  const ranking = [...scores].sort((a, b) =>
    b.medals - a.medals || a.drinks - b.drinks
  );

  return (
    <div className="h-dvh flex flex-col items-center px-6 py-10 relative z-10 bg-gradient-to-b from-[#18120a] via-[#221a0e] to-[#0e0c08] animate-fade-up overflow-hidden">

      {/* Título */}
      <h2 className="font-display text-[#F0D98A] text-center text-3xl mb-2 tracking-[0.08em] mt-6">
        ¡SE ACABÓ LA JODA!
      </h2>

      <div className="w-full max-w-[420px] flex items-center gap-2 mb-8">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-[#C9A84C]/60" />
        <span className="text-[#C9A84C]/60 text-xs font-display tracking-[0.3em]">{totalCards} RONDAS</span>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#C9A84C]/40 to-[#C9A84C]/60" />
      </div>

      {/* Campeón y Perdedor destacados */}
      <div className="w-full max-w-[420px] flex gap-3 mb-8">
        {/* Campeón */}
        <div className="flex-1 border-2 border-[#C9A84C]/60 rounded-xl p-4 text-center bg-gradient-to-b from-[#2a1f00]/60 to-[#0e0c08]/80">
          <div className="text-4xl mb-2">🏆</div>
          <p className="font-display text-[10px] text-[#C9A84C]/50 tracking-[0.25em] uppercase mb-1">Campeón</p>
          <p className="font-display text-[#F0D98A] text-xl tracking-wide">{champion?.name}</p>
          <p className="font-display text-[#C9A84C]/60 text-sm mt-1">{champion?.medals} 🏅</p>
        </div>

        {/* Perdedor */}
        <div className="flex-1 border-2 border-[#8B2020]/50 rounded-xl p-4 text-center bg-gradient-to-b from-[#1a0a0a]/60 to-[#0e0808]/80">
          <div className="text-4xl mb-2">💀</div>
          <p className="font-display text-[10px] text-[#8B2020]/60 tracking-[0.25em] uppercase mb-1">Perdedor</p>
          <p className="font-display text-[#FF6B6B] text-xl tracking-wide">{loser?.name}</p>
          <p className="font-display text-[#8B2020]/60 text-sm mt-1">{loser?.drinks} 🍷</p>
        </div>
      </div>

      {/* Ranking completo — scrollable */}
      <div className="w-full max-w-[420px] mb-6 flex flex-col min-h-0 flex-1">
        <p className="font-display text-[10px] text-[#C9A84C]/40 tracking-[0.3em] uppercase mb-3 text-center shrink-0">Ranking Final</p>
        <div className="flex flex-col gap-2 overflow-y-auto min-h-0 pr-1">
          {ranking.map((player, i) => (
            <div
              key={player.name}
              className={`flex items-center justify-between px-4 py-3 rounded-lg border ${
                i === 0
                  ? "border-[#C9A84C]/50 bg-[#2a1f00]/40"
                  : "border-white/10 bg-white/[0.02]"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="font-display text-[#C9A84C]/40 text-sm w-5">{i + 1}.</span>
                <span className={`font-display text-base ${
                  i === 0 ? "text-[#F0D98A]" : "text-white/70"
                }`}>{player.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-display text-sm text-[#C9A84C]/70">{player.medals} 🏅</span>
                <span className="font-display text-sm text-[#8B2020]/70">{player.drinks} 🍷</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Botones */}
      <div className="flex gap-4 flex-wrap justify-center w-full max-w-[420px]">
        <button
          onClick={onRestart}
          className="relative flex-1 max-w-[200px] py-4 border-2 font-display tracking-[0.12em] uppercase transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden text-sm whitespace-nowrap bg-gradient-to-b from-[#2a1f00] via-[#1a1200] to-[#0e0c08] border-[#C9A84C]/70 text-[#F0D98A] hover:border-[#E8C84A] hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="absolute top-[5px] left-[5px] w-2.5 h-2.5 border-t-2 border-l-2 border-[#C9A84C]/70 pointer-events-none" />
          <span className="absolute top-[5px] right-[5px] w-2.5 h-2.5 border-t-2 border-r-2 border-[#C9A84C]/70 pointer-events-none" />
          <span className="absolute bottom-[5px] left-[5px] w-2.5 h-2.5 border-b-2 border-l-2 border-[#C9A84C]/70 pointer-events-none" />
          <span className="absolute bottom-[5px] right-[5px] w-2.5 h-2.5 border-b-2 border-r-2 border-[#C9A84C]/70 pointer-events-none" />
          <RotateCcw size={16} strokeWidth={2.5} className="text-[#C9A84C] shrink-0" />
          OTRA RONDA
        </button>

        <button
          onClick={onExit}
          className="relative flex-1 max-w-[200px] py-4 border-2 font-display tracking-[0.12em] uppercase transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden text-sm whitespace-nowrap bg-white/[0.03] border-[#C9A84C]/30 text-[#C9A84C]/70 hover:border-[#E8C84A] hover:text-[#F0D98A] hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="absolute top-[5px] left-[5px] w-2.5 h-2.5 border-t-2 border-l-2 border-[#C9A84C]/40 pointer-events-none" />
          <span className="absolute top-[5px] right-[5px] w-2.5 h-2.5 border-t-2 border-r-2 border-[#C9A84C]/40 pointer-events-none" />
          <span className="absolute bottom-[5px] left-[5px] w-2.5 h-2.5 border-b-2 border-l-2 border-[#C9A84C]/40 pointer-events-none" />
          <span className="absolute bottom-[5px] right-[5px] w-2.5 h-2.5 border-b-2 border-r-2 border-[#C9A84C]/40 pointer-events-none" />
          <DoorOpen size={16} strokeWidth={2.5} className="text-[#C9A84C]/70" />
          SALIR
        </button>
      </div>
    </div>
  );
}
