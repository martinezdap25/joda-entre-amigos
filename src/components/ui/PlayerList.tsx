"use client";

import { Sword, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MIN_PLAYERS, CARDS_PER_PLAYER } from "@/lib/constants";

interface PlayerListProps {
  players: string[];
  onRemove: (name: string) => void;
}

export function PlayerList({ players, onRemove }: PlayerListProps) {
  if (players.length === 0) return null;

  const reversed = [...players].reverse();

  return (
    <div className="w-full mt-4">

      {/* Encabezado */}
      <div className="flex items-center gap-2 mb-2 px-1">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-[#C9A84C]/50" />
        <span className="text-[#C9A84C]/50 text-[10px] font-display tracking-[0.3em]">
          ✦ GLADIADORES ({players.length}) ✦
        </span>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#C9A84C]/30 to-[#C9A84C]/50" />
      </div>

      {/* Lista con scroll */}
      <div className="max-h-[220px] overflow-y-auto scrollbar-thin flex flex-col gap-1.5 pr-1">
        <AnimatePresence initial={false}>
          {reversed.map((p) => (
            <motion.div
              key={p}
              layout
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="
                flex items-center justify-between
                px-4 py-3
                bg-[#0e0c08] border border-[#C9A84C]/25
                transition-colors duration-200
                hover:border-[#C9A84C]/50 hover:bg-[#13100a]
              "
            >
              <div className="flex items-center gap-3">
                <Sword size={13} className="text-[#C9A84C]/50 shrink-0" />
                <span className="font-display text-sm tracking-widest uppercase text-[#F0D98A]">
                  {p}
                </span>
              </div>
              <button
                onClick={() => onRemove(p)}
                aria-label={`Eliminar a ${p}`}
                className="text-[#C9A84C]/30 hover:text-[#FF6B6B] transition-colors duration-200 p-1"
              >
                <X size={14} strokeWidth={2.5} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Contadores */}
      <div className="mt-2 px-1">
        {players.length < MIN_PLAYERS && (
          <p className="text-[#C9A84C]/40 text-[10px] font-body text-center tracking-widest uppercase">
            Faltan {MIN_PLAYERS - players.length} gladiador{MIN_PLAYERS - players.length !== 1 ? "es" : ""} más
          </p>
        )}
        {players.length >= MIN_PLAYERS && (
          <p className="text-[#C9A84C]/50 text-[10px] font-display text-center tracking-[0.2em]">
            🃏 {CARDS_PER_PLAYER * players.length} cartas — {CARDS_PER_PLAYER} por jugador
          </p>
        )}
      </div>

    </div>
  );
}
