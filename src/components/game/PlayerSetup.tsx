"use client";

import { useRef } from "react";
import { Play } from "lucide-react";
import { usePlayers } from "@/hooks";
import { MIN_PLAYERS } from "@/lib/constants";
import { Logo } from "@/components/ui/Logo";
import { PlayerInput } from "@/components/ui/PlayerInput";
import { PlayerList } from "@/components/ui/PlayerList";

interface PlayerSetupProps {
  onStartGame: (players: string[]) => void;
}

export function PlayerSetup({ onStartGame }: PlayerSetupProps) {
  const {
    playerName,
    players,
    error,
    canStart,
    setPlayerName,
    addPlayer,
    removePlayer,
  } = usePlayers();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    addPlayer();
    inputRef.current?.focus();
  };

  const handleStart = () => {
    if (canStart) onStartGame(players);
  };

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-6 py-10 relative z-10">
      <Logo />

      <div className="w-full max-w-[420px] opacity-0 animate-fade-up-delay">
        {/* Input row */}
        <PlayerInput
          ref={inputRef}
          value={playerName}
          onChange={setPlayerName}
          onAdd={handleAdd}
          error={error}
        />

        {/* Player list */}
        <PlayerList players={players} onRemove={removePlayer} />

        {/* Start button */}
        <div className="relative mt-7">
          {/* Línea ornamental superior */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-[#C9A84C]/60" />
            <span className="text-[#C9A84C]/50 text-[10px] font-display tracking-[0.3em]">⚔ AD GLORIAM ⚔</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#C9A84C]/40 to-[#C9A84C]/60" />
          </div>

          <button
            onClick={handleStart}
            disabled={!canStart}
            className={`
              relative w-full py-5 border-2 font-display
              tracking-[0.25em] uppercase transition-all duration-300
              flex items-center justify-center gap-3 overflow-hidden text-base
              ${canStart
                ? `bg-gradient-to-b from-[#2a1f00] via-[#1a1200] to-[#0e0c08]
                   border-[#C9A84C]/70 text-[#F0D98A]
                   shadow-[0_0_30px_rgba(201,168,76,0.2),inset_0_1px_0_rgba(201,168,76,0.15)]
                   hover:border-[#E8C84A] hover:shadow-[0_0_45px_rgba(201,168,76,0.4),inset_0_1px_0_rgba(201,168,76,0.25)]
                   hover:scale-[1.02] active:scale-[0.98]`
                : "bg-white/[0.03] border-white/10 text-white/20 cursor-not-allowed"
              }
            `}
          >
            {/* Esquinas decorativas */}
            {canStart && <>
              <span className="absolute top-[5px] left-[5px] w-3 h-3 border-t-2 border-l-2 border-[#C9A84C]/70 pointer-events-none" />
              <span className="absolute top-[5px] right-[5px] w-3 h-3 border-t-2 border-r-2 border-[#C9A84C]/70 pointer-events-none" />
              <span className="absolute bottom-[5px] left-[5px] w-3 h-3 border-b-2 border-l-2 border-[#C9A84C]/70 pointer-events-none" />
              <span className="absolute bottom-[5px] right-[5px] w-3 h-3 border-b-2 border-r-2 border-[#C9A84C]/70 pointer-events-none" />
            </>}

            <Play size={18} strokeWidth={2.5} fill="currentColor" className={canStart ? "text-[#C9A84C]" : ""} />
            EMPEZAR JODA
            <Play size={18} strokeWidth={2.5} fill="currentColor" className={`rotate-180 ${canStart ? "text-[#C9A84C]" : ""}`} />
          </button>
        </div>
      </div>
    </div>
  );
}
