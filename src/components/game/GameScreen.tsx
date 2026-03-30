"use client";

import { useState } from "react";
import { LogOut, ChevronRight } from "lucide-react";
import { GameCard } from "@/lib/types";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { PlayerChip } from "@/components/ui/PlayerChip";
import { CardDisplay } from "./CardDisplay";

interface GameScreenProps {
  players: string[];
  currentPlayer: string;
  currentCard: GameCard;
  cardIndex: number;
  totalCards: number;
  turnIndex: number;
  progress: number;
  onNext: () => void;
  onExit: () => void;
}

export function GameScreen({
  players,
  currentPlayer,
  currentCard,
  cardIndex,
  totalCards,
  turnIndex,
  progress,
  onNext,
  onExit,
}: GameScreenProps) {
  const [animKey, setAnimKey] = useState(0);

  const handleNext = () => {
    setAnimKey((k) => k + 1);
    // Small delay so the exit animation doesn't clash
    setTimeout(() => onNext(), 30);
  };

  return (
    <div className="min-h-dvh flex flex-col items-center px-4 py-5 relative z-10">
      {/* Top bar */}
      <div className="w-full max-w-[420px] flex justify-between items-center mb-3">
        <button
          onClick={onExit}
          className="glass rounded-xl px-3.5 py-2 text-xs font-body text-white/40
                     cursor-pointer transition-all duration-200 hover:text-white/70
                     flex items-center gap-1.5"
        >
          <LogOut size={13} />
          Salir
        </button>
        <span className="font-body text-xs text-white/30">
          {cardIndex + 1} / {totalCards}
        </span>
      </div>

      {/* Progress */}
      <div className="w-full flex justify-center mb-7">
        <ProgressBar progress={progress} />
      </div>

      {/* Current player name */}
      <div key={`player-${animKey}`} className="text-center mb-6 animate-fade-up">
        <p className="font-body text-xs text-white/35 tracking-[0.2em] uppercase mb-1.5">
          Turno de
        </p>
        <h2
          className="font-display text-white m-0"
          style={{
            fontSize: "clamp(2rem, 8vw, 2.75rem)",
            textShadow: "0 0 30px rgba(255,107,53,0.4)",
          }}
        >
          {currentPlayer}
        </h2>
      </div>

      {/* Card */}
      <div className="w-full flex justify-center">
        <CardDisplay
          card={currentCard}
          currentPlayer={currentPlayer}
          players={players}
          animKey={animKey}
        />
      </div>

      {/* Next button */}
      <button onClick={handleNext} className="btn-primary max-w-[400px] mt-7 flex items-center justify-center gap-2">
        SIGUIENTE
        <ChevronRight size={22} strokeWidth={2.5} />
      </button>

      {/* Player rotation indicator */}
      <div className="flex gap-1.5 mt-6 flex-wrap justify-center max-w-[400px]">
        {players.map((p, i) => (
          <PlayerChip
            key={p}
            name={p}
            isActive={i === turnIndex % players.length}
          />
        ))}
      </div>
    </div>
  );
}
