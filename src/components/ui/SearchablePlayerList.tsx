"use client";

import { useState } from "react";
import { Search, Sword } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchablePlayerListProps {
  players: string[];
  onSelect: (player: string) => void;
  /** Texto del placeholder del buscador */
  placeholder?: string;
}

export function SearchablePlayerList({
  players,
  onSelect,
  placeholder = "Buscar gladiador...",
}: SearchablePlayerListProps) {
  const [query, setQuery] = useState("");

  const filtered = players.filter((p) =>
    p.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Buscador */}
      <div
        className="flex items-center gap-2 border border-[#C9A84C]/30 bg-[#0e0c08] px-3 py-3"
      >
        <Search size={13} className="text-[#C9A84C]/40 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent font-display text-xs tracking-[0.15em] text-[#F0D98A] placeholder:text-[#C9A84C]/25 outline-none uppercase"
        />
      </div>

      {/* Lista */}
      <div className="max-h-[240px] overflow-y-auto flex flex-col gap-1.5 pr-0.5">
        <AnimatePresence initial={false}>
          {filtered.map((p) => (
            <motion.button
              key={p}
              layout
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              onClick={() => onSelect(p)}
              className="relative flex items-center gap-3 px-4 py-3 border border-[#C9A84C]/25 bg-[#0e0c08] hover:border-[#C9A84C]/60 hover:bg-[#13100a] transition-colors duration-150 text-left w-full group"
            >
              {/* Esquinas decorativas */}
              <span className="absolute top-[4px] left-[4px] w-2 h-2 border-t border-l border-[#C9A84C]/30 group-hover:border-[#C9A84C]/60 transition-colors pointer-events-none" />
              <span className="absolute top-[4px] right-[4px] w-2 h-2 border-t border-r border-[#C9A84C]/30 group-hover:border-[#C9A84C]/60 transition-colors pointer-events-none" />
              <span className="absolute bottom-[4px] left-[4px] w-2 h-2 border-b border-l border-[#C9A84C]/30 group-hover:border-[#C9A84C]/60 transition-colors pointer-events-none" />
              <span className="absolute bottom-[4px] right-[4px] w-2 h-2 border-b border-r border-[#C9A84C]/30 group-hover:border-[#C9A84C]/60 transition-colors pointer-events-none" />

              <Sword size={13} className="text-[#C9A84C]/40 shrink-0 group-hover:text-[#C9A84C]/70 transition-colors" />
              <span className="font-display text-sm tracking-widest uppercase text-[#F0D98A] truncate">
                {p}
              </span>
            </motion.button>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="font-display text-[10px] text-[#C9A84C]/30 tracking-[0.25em] uppercase text-center py-4">
            Sin resultados
          </p>
        )}
      </div>
    </div>
  );
}
