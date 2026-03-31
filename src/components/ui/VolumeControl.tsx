"use client";

import { useState } from "react";
import { Volume2, VolumeX, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { audioManager } from "@/lib/audioManager";

export function VolumeControl() {
  const [open, setOpen]       = useState(false);
  const [musicVol, setMusicVolState] = useState(() => audioManager.musicVol);
  const [sfxVol,   setSfxVolState]   = useState(() => audioManager.sfxVol);

  const handleMusicVol = (v: number) => {
    setMusicVolState(v);
    audioManager.setMusicVol(v);
  };

  const handleSfxVol = (v: number) => {
    setSfxVolState(v);
    audioManager.setSfxVol(v);
  };

  const allMuted = musicVol === 0 && sfxVol === 0;

  return (
    <>
      {/* Botón parlante */}
      <button
        onClick={() => setOpen(true)}
        className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#C9A84C]/40 bg-[#18120a] text-[#C9A84C]/70 hover:text-[#F0D98A] hover:border-[#C9A84C]/70 transition-colors"
        aria-label="Control de volumen"
      >
        {allMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
      </button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-6"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="w-full max-w-[320px] rounded-2xl border-2 border-[#C9A84C]/40 bg-[#18120a] p-7 flex flex-col gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <h3 className="font-display text-sm tracking-[0.22em] uppercase text-[#F0D98A]">
                  Sonido
                </h3>
                <button
                  onClick={() => setOpen(false)}
                  className="w-7 h-7 flex items-center justify-center rounded-full border border-[#C9A84C]/30 text-[#C9A84C]/50 hover:text-[#F0D98A] hover:border-[#C9A84C]/60 transition-colors"
                >
                  <X size={13} />
                </button>
              </div>

              {/* Música */}
              <VolumeSlider
                label="Música"
                emoji="🎵"
                value={musicVol}
                onChange={handleMusicVol}
              />

              {/* Efectos */}
              <VolumeSlider
                label="Efectos"
                emoji="🔊"
                value={sfxVol}
                onChange={handleSfxVol}
              />

              {/* Línea ornamental inferior */}
              <div
                className="h-px w-full"
                style={{ background: "linear-gradient(90deg, transparent, #C9A84C44, transparent)" }}
              />
              <p className="font-display text-[10px] tracking-[0.2em] uppercase text-[#C9A84C]/30 text-center -mt-3">
                Tocá afuera para cerrar
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Slider reutilizable ─────────────────────────────── */

function VolumeSlider({
  label, emoji, value, onChange,
}: {
  label: string;
  emoji: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="font-display text-xs tracking-[0.18em] uppercase text-[#C9A84C]/70">
          {emoji} {label}
        </span>
        <span className="font-display text-xs text-[#C9A84C]/40">
          {value === 0 ? "silenciado" : `${Math.round(value * 100)}%`}
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={1}
        step={0.05}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-[#C9A84C]"
        style={{ background: `linear-gradient(to right, #C9A84C ${value * 100}%, #C9A84C22 ${value * 100}%)` }}
      />
    </div>
  );
}
