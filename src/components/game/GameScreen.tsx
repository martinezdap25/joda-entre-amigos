"use client";

import { useState } from "react";
import { Shield } from "lucide-react";
import { GameCard } from "@/lib/types";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { CardDisplay } from "./CardDisplay";

interface GameScreenProps {
  players: string[];
  currentPlayer: string;
  currentCard: GameCard;
  cardIndex: number;
  totalCards: number;
  progress: number;
  isGroupCard: boolean;
  onCompleted: () => void;
  onDrank: () => void;
  onNext: () => void;
  onExit: () => void;
}

export function GameScreen({
  players,
  currentPlayer,
  currentCard,
  cardIndex,
  totalCards,
  progress,
  isGroupCard,
  onCompleted,
  onDrank,
  onNext,
  onExit,
}: GameScreenProps) {
  const [animKey, setAnimKey] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const handleChoice = (action: () => void) => {
    if (timerRunning) {
      setPendingAction(() => action);
      return;
    }
    setAnimKey((k) => k + 1);
    setTimeout(() => action(), 30);
  };

  const confirmAdvance = () => {
    setTimerRunning(false);
    setPendingAction(null);
    setAnimKey((k) => k + 1);
    setTimeout(() => pendingAction?.(), 30);
  };

  return (
    <div className="min-h-dvh flex flex-col items-center px-4 py-5 relative z-10 bg-gradient-to-b from-[#18120a] via-[#221a0e] to-[#0e0c08]">
      {/* Top bar */}
      <div className="w-full max-w-[440px] flex justify-between items-center mb-5">
        <button
          onClick={onExit}
          className="rounded-lg px-4 py-2 text-xs font-display tracking-[0.18em] uppercase border border-[#C9A84C]/60 bg-[#18120a] text-[#C9A84C] hover:bg-[#221a0e] hover:text-[#F0D98A] transition-colors duration-200 focus:outline-none"
        >
          Salir
        </button>
        <span className="font-display text-xs text-[#C9A84C]/30 tracking-[0.18em]">
          <Shield size={13} className="inline-block mr-1 mb-0.5 text-[#C9A84C]/40" />
          {cardIndex + 1} / {totalCards}
        </span>
      </div>

      {/* Progress */}
      <div className="w-full flex justify-center mb-7">
        <div className="w-full max-w-[340px]">
          <ProgressBar progress={progress} />
        </div>
      </div>

      {/* Player name — oculto para cartas grupales */}
      <div key={`player-${animKey}`} className="text-center mb-7 animate-fade-up">
        {isGroupCard ? (
          <>
            <p className="font-display text-xs text-[#FFEA00]/40 tracking-[0.22em] uppercase mb-2">
              Ronda grupal
            </p>
            <h2
              className="font-display text-[#FFEA00] m-0"
              style={{
                fontSize: "clamp(1.6rem, 6vw, 2.2rem)",
                letterSpacing: "0.06em",
                fontWeight: 700,
              }}
            >
              TODOS JUEGAN
            </h2>
          </>
        ) : (
          <>
            <p className="font-display text-xs text-[#C9A84C]/40 tracking-[0.22em] uppercase mb-2">
              Turno de
            </p>
            <h2
              className="font-display text-[#C9A84C] m-0"
              style={{
                fontSize: "clamp(2.2rem, 8vw, 2.9rem)",
                letterSpacing: "0.04em",
                fontWeight: 700,
              }}
            >
              {currentPlayer}
            </h2>
          </>
        )}
      </div>

      {/* Card */}
      <div className="w-full flex justify-center">
        <CardDisplay
          card={currentCard}
          currentPlayer={currentPlayer}
          players={players}
          animKey={animKey}
          onTimerRunning={setTimerRunning}
        />
      </div>

      {/* Botones: condicional según tipo de carta */}
      <div className="w-full max-w-[400px] flex gap-3 mt-8">
        {isGroupCard ? (
          /* Carta grupal → solo SIGUIENTE, sin scoring */
          <button
            onClick={() => handleChoice(onNext)}
            className="relative flex-1 py-5 border-2 font-display tracking-[0.18em] uppercase transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden text-base bg-gradient-to-b from-[#1a1800] via-[#1a1500] to-[#0e0c08] border-[#FFEA00]/60 text-[#FFEA00] hover:border-[#FFE000] hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="absolute top-[5px] left-[5px] w-2.5 h-2.5 border-t-2 border-l-2 border-[#FFEA00]/60 pointer-events-none" />
            <span className="absolute top-[5px] right-[5px] w-2.5 h-2.5 border-t-2 border-r-2 border-[#FFEA00]/60 pointer-events-none" />
            <span className="absolute bottom-[5px] left-[5px] w-2.5 h-2.5 border-b-2 border-l-2 border-[#FFEA00]/60 pointer-events-none" />
            <span className="absolute bottom-[5px] right-[5px] w-2.5 h-2.5 border-b-2 border-r-2 border-[#FFEA00]/60 pointer-events-none" />
            <span className="text-xl">🎲</span>
            SIGUIENTE
          </button>
        ) : (
          /* Carta de jugador → CUMPLIÓ / TOMÓ */
          <>
            <button
              onClick={() => handleChoice(onCompleted)}
              className="relative flex-1 py-5 border-2 font-display tracking-[0.18em] uppercase transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden text-base bg-gradient-to-b from-[#2a1f00] via-[#1a1200] to-[#0e0c08] border-[#C9A84C]/70 text-[#F0D98A] hover:border-[#E8C84A] hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="absolute top-[5px] left-[5px] w-2.5 h-2.5 border-t-2 border-l-2 border-[#C9A84C]/70 pointer-events-none" />
              <span className="absolute top-[5px] right-[5px] w-2.5 h-2.5 border-t-2 border-r-2 border-[#C9A84C]/70 pointer-events-none" />
              <span className="absolute bottom-[5px] left-[5px] w-2.5 h-2.5 border-b-2 border-l-2 border-[#C9A84C]/70 pointer-events-none" />
              <span className="absolute bottom-[5px] right-[5px] w-2.5 h-2.5 border-b-2 border-r-2 border-[#C9A84C]/70 pointer-events-none" />
              <span className="text-xl">🏅</span>
              CUMPLIÓ
            </button>

            <button
              onClick={() => handleChoice(onDrank)}
              className="relative flex-1 py-5 border-2 font-display tracking-[0.18em] uppercase transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden text-base bg-gradient-to-b from-[#1a0a0a] via-[#220e0e] to-[#0e0808] border-[#8B2020]/70 text-[#FF6B6B] hover:border-[#C03030] hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="absolute top-[5px] left-[5px] w-2.5 h-2.5 border-t-2 border-l-2 border-[#8B2020]/70 pointer-events-none" />
              <span className="absolute top-[5px] right-[5px] w-2.5 h-2.5 border-t-2 border-r-2 border-[#8B2020]/70 pointer-events-none" />
              <span className="absolute bottom-[5px] left-[5px] w-2.5 h-2.5 border-b-2 border-l-2 border-[#8B2020]/70 pointer-events-none" />
              <span className="absolute bottom-[5px] right-[5px] w-2.5 h-2.5 border-b-2 border-r-2 border-[#8B2020]/70 pointer-events-none" />
              <span className="text-xl">🍷</span>
              TOMÓ
            </button>
          </>
        )}
      </div>
      {/* Modal: confirmación cuando el timer sigue corriendo */}
      {pendingAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-6">
          <div className="w-full max-w-[340px] rounded-2xl border-2 border-[#C9A84C]/50 bg-[#18120a] p-7 flex flex-col items-center gap-5 text-center shadow-2xl">
            <span className="text-4xl">⏱️</span>
            <p className="font-display text-[#F0D98A] text-base leading-relaxed">
              El timer sigue corriendo.<br />¿Avanzar igual?
            </p>
            <div className="flex gap-3 w-full">
              <button
                onClick={() => setPendingAction(null)}
                className="flex-1 py-3 border border-[#C9A84C]/40 font-display text-xs tracking-[0.18em] uppercase text-[#C9A84C]/60 hover:text-[#C9A84C] transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmAdvance}
                className="flex-1 py-3 border border-[#C9A84C]/70 bg-[#2a1f00] font-display text-xs tracking-[0.18em] uppercase text-[#F0D98A] hover:bg-[#3a2d00] transition-colors"
              >
                Avanzar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
