"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SearchablePlayerList } from "@/components/ui/SearchablePlayerList";

interface BastaLoserModalProps {
  players: string[];
  onConfirm: (loser: string) => void;
}

export function BastaLoserModal({ players, onConfirm }: BastaLoserModalProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="w-full max-w-[420px] rounded-2xl border-2 border-[#C9A84C]/50 bg-[#18120a] flex flex-col items-center overflow-hidden"
        style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px #C9A84C11" }}
      >
        {/* Header ornamental */}
        <div className="w-full px-7 pt-7 pb-5 flex flex-col items-center gap-3 border-b border-[#C9A84C]/15">
          {/* Línea superior */}
          <div className="flex items-center gap-3 w-full">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#C9A84C]/50" />
            <span className="text-[#C9A84C]/60 text-[10px] font-display tracking-[0.35em]">VEREDICTO</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#C9A84C]/50" />
          </div>

          <span className="text-5xl">💀</span>

          <AnimatePresence mode="wait">
            {!selected ? (
              <motion.div
                key="select"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                className="flex flex-col items-center gap-1"
              >
                <h3 className="font-display text-[#F0D98A] text-lg tracking-[0.12em] uppercase">
                  ¿Quién cayó?
                </h3>
                <p className="font-display max-w-52 text-center text-[10px] text-[#C9A84C]/40 tracking-[0.22em] uppercase">
                  Seleccioná al derrotado Bebe 2 copas
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                className="flex flex-col items-center gap-1"
              >
                <h3 className="font-display text-[#FF6B6B] text-lg tracking-[0.12em] uppercase">
                  ¿Confirmás?
                </h3>
                <p className="font-display text-[#C9A84C]/40 text-[10px] tracking-[0.22em] uppercase">
                  El derrotado es
                </p>
                <p className="font-display text-[#F0D98A] text-2xl tracking-wide font-bold mt-1">
                  {selected}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Body */}
        <div className="w-full px-6 py-5">
          <AnimatePresence mode="wait">
            {!selected ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <SearchablePlayerList
                  players={players}
                  onSelect={setSelected}
                  placeholder="Buscar gladiador..."
                />
              </motion.div>
            ) : (
              /* Confirmación */
              <motion.div
                key="buttons"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex gap-3"
              >
                <button
                  onClick={() => setSelected(null)}
                  className="flex-1 py-4 border border-[#C9A84C]/30 font-display text-xs tracking-[0.18em] uppercase text-[#C9A84C]/60 hover:text-[#C9A84C] hover:border-[#C9A84C]/60 transition-colors"
                >
                  Volver
                </button>
                <button
                  onClick={() => onConfirm(selected)}
                  className="relative flex-1 py-4 border-2 border-[#8B2020]/80 font-display text-xs tracking-[0.18em] uppercase text-[#FF6B6B] hover:bg-[#1a0a0a] hover:border-[#C03030] transition-colors overflow-hidden"
                  style={{ background: "#ff111108" }}
                >
                  <span className="absolute top-[4px] left-[4px] w-2.5 h-2.5 border-t-2 border-l-2 border-[#8B2020]/60 pointer-events-none" />
                  <span className="absolute top-[4px] right-[4px] w-2.5 h-2.5 border-t-2 border-r-2 border-[#8B2020]/60 pointer-events-none" />
                  <span className="absolute bottom-[4px] left-[4px] w-2.5 h-2.5 border-b-2 border-l-2 border-[#8B2020]/60 pointer-events-none" />
                  <span className="absolute bottom-[4px] right-[4px] w-2.5 h-2.5 border-b-2 border-r-2 border-[#8B2020]/60 pointer-events-none" />
                  Confirmar derrota
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer ornamental */}
        <div className="w-full px-7 pb-4 flex items-center gap-3">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#C9A84C]/20" />
          <span className="text-[#C9A84C]/20 text-[9px] font-display tracking-[0.3em]">⚔ AD GLORIAM ⚔</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#C9A84C]/20" />
        </div>
      </motion.div>
    </div>,
    document.body
  );
}
