"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

interface SaveHalfModalProps {
  players: string[];
  saveCount: number;
  onConfirm: (savedPlayers: string[]) => void;
}

export function SaveHalfModal({ players, saveCount, onConfirm }: SaveHalfModalProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  const toggle = (player: string) => {
    setSelected((prev) => {
      if (prev.includes(player)) return prev.filter((p) => p !== player);
      if (prev.length >= saveCount) return prev;
      return [...prev, player];
    });
  };

  const drinkCount = players.length - selected.length;
  const canConfirm = selected.length === saveCount;
  const slotsLeft = saveCount - selected.length;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="w-full max-w-[420px] rounded-2xl border-2 border-[#C9A84C]/50 bg-[#18120a] flex flex-col items-center overflow-hidden"
        style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px #C9A84C11" }}
      >
        {/* Header */}
        <div className="w-full px-7 pt-7 pb-5 flex flex-col items-center gap-3 border-b border-[#C9A84C]/15">
          <div className="flex items-center gap-3 w-full">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#C9A84C]/50" />
            <span className="text-[#C9A84C]/60 text-[10px] font-display tracking-[0.35em]">ELEGÍ AL EQUIPO</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#C9A84C]/50" />
          </div>

          <span className="text-5xl">🛡️</span>

          <div className="flex flex-col items-center gap-1">
            <h3 className="font-display text-[#F0D98A] text-lg tracking-[0.12em] uppercase">
              ¿A quién salvás?
            </h3>
            <p className="font-display text-center text-[10px] text-[#C9A84C]/40 tracking-[0.22em] uppercase">
              Elegí {saveCount} para salvar · el resto toma 3
            </p>
          </div>
        </div>

        {/* Lista de jugadores */}
        <div className="w-full px-5 py-4 flex flex-col gap-2 max-h-[45vh] overflow-y-auto">
          {players.map((player) => {
            const isSelected = selected.includes(player);
            const isDisabled = !isSelected && selected.length >= saveCount;

            return (
              <button
                key={player}
                onClick={() => toggle(player)}
                disabled={isDisabled}
                className={`relative flex items-center gap-3 px-4 py-3 border transition-all duration-150 text-left w-full ${
                  isSelected
                    ? "border-[#C9A84C]/80 bg-[#C9A84C]/10 text-[#F0D98A]"
                    : isDisabled
                    ? "border-[#C9A84C]/10 text-[#C9A84C]/25 cursor-not-allowed"
                    : "border-[#C9A84C]/25 bg-[#0e0c08] hover:border-[#C9A84C]/60 text-[#F0D98A]"
                }`}
              >
                <span className="text-base shrink-0">{isSelected ? "🛡️" : "💀"}</span>
                <span className="font-display text-sm tracking-widest uppercase truncate flex-1">
                  {player}
                </span>
                {isSelected && (
                  <span className="font-display text-[10px] tracking-[0.2em] text-[#C9A84C]/60 uppercase shrink-0">
                    Salvado
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Indicador de slots + confirmar */}
        <div className="w-full px-5 pb-6 pt-3 flex flex-col items-center gap-3">
          {/* Slots visuales */}
          <div className="flex gap-1.5">
            {Array.from({ length: saveCount }).map((_, i) => (
              <div
                key={i}
                className="w-6 h-1.5 rounded-full transition-all duration-200"
                style={{ background: i < selected.length ? "#C9A84C" : "#C9A84C30" }}
              />
            ))}
          </div>

          <button
            disabled={!canConfirm}
            onClick={() => onConfirm(selected)}
            className={`w-full py-4 border-2 font-display text-sm tracking-[0.18em] uppercase transition-all duration-200 ${
              canConfirm
                ? "border-[#C9A84C]/80 text-[#F0D98A] hover:scale-[1.02] active:scale-[0.98]"
                : "border-[#C9A84C]/20 text-[#C9A84C]/30 cursor-not-allowed"
            }`}
          >
            {canConfirm
              ? `🛡️ CONFIRMAR — ${drinkCount} ${drinkCount === 1 ? "TOMA" : "TOMAN"} 3`
              : `ELEGÍ ${slotsLeft} MÁS`}
          </button>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}
