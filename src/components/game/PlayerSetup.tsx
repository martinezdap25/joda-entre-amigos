"use client";

import { useRef, KeyboardEvent } from "react";
import { usePlayers } from "@/hooks";
import { MIN_PLAYERS } from "@/lib/constants";
import { Logo } from "@/components/ui/Logo";
import { PlayerChip } from "@/components/ui/PlayerChip";

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

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      addPlayer();
      inputRef.current?.focus();
    }
  };

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
        <div className="flex gap-2.5 mb-2">
          <input
            ref={inputRef}
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Nombre del jugador..."
            maxLength={20}
            autoComplete="off"
            className="input-field flex-1"
          />
          <button
            onClick={handleAdd}
            className="px-6 rounded-2xl border-none gradient-fire text-white text-xl
                       font-bold cursor-pointer transition-all duration-300
                       shadow-[0_4px_15px_rgba(255,107,53,0.4)]
                       hover:scale-105 active:scale-95"
            aria-label="Agregar jugador"
          >
            +
          </button>
        </div>

        {/* Error */}
        {error && (
          <p className="text-brand-red text-xs font-body ml-1 mb-3">{error}</p>
        )}

        {/* Player chips */}
        <div className="min-h-[56px] mt-4 flex flex-wrap gap-2">
          {players.map((p, i) => (
            <PlayerChip
              key={p}
              name={p}
              index={i}
              onRemove={() => removePlayer(p)}
            />
          ))}
        </div>

        {/* Player count */}
        {players.length > 0 && (
          <p className="text-white/30 text-xs font-body mt-3 text-center">
            {players.length} jugador{players.length !== 1 ? "es" : ""} — mínimo{" "}
            {MIN_PLAYERS} para empezar
          </p>
        )}

        {/* Start button */}
        <button
          onClick={handleStart}
          disabled={!canStart}
          className={`
            w-full py-5 mt-7 rounded-2xl border-none text-xl font-display
            tracking-wider uppercase transition-all duration-400
            ${
              canStart
                ? "btn-primary"
                : "bg-white/[0.06] text-white/25 cursor-not-allowed"
            }
          `}
        >
          🎉 EMPEZAR JODA
        </button>
      </div>
    </div>
  );
}
