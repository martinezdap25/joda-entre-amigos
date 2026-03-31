"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { audioManager } from "@/lib/audioManager";

export function VolumeControl() {
  const [open, setOpen]     = useState(false);
  const [musicVol, setMusic] = useState(0.3);
  const [sfxVol,   setSfx]   = useState(0.6);

  // Sync with persisted values after mount (avoids hydration mismatch)
  useEffect(() => {
    setMusic(audioManager.musicVol);
    setSfx(audioManager.sfxVol);
  }, []);

  return (
    <>
      {/* Botón parlante relleno */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Control de volumen"
        className="w-10 h-10 flex items-center justify-center rounded-xl border border-[#C9A84C]/40 bg-[#18120a] text-[#C9A84C] hover:text-[#F0D98A] hover:border-[#C9A84C]/70 transition-colors active:scale-95"
      >
        <SpeakerIcon muted={musicVol === 0 && sfxVol === 0} />
      </button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm px-6"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 16 }}
              animate={{ scale: 1,    opacity: 1, y: 0  }}
              exit={{    scale: 0.88, opacity: 0, y: 16 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full max-w-[320px] rounded-2xl border-2 border-[#C9A84C]/40 bg-[#18120a] p-7 flex flex-col gap-6"
              style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px #C9A84C11" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <SpeakerIcon muted={false} size={18} />
                  <h3 className="font-display text-sm tracking-[0.22em] uppercase text-[#F0D98A]">
                    Sonido
                  </h3>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="w-7 h-7 flex items-center justify-center rounded-full border border-[#C9A84C]/30 text-[#C9A84C]/50 hover:text-[#F0D98A] hover:border-[#C9A84C]/60 transition-colors"
                >
                  <X size={13} />
                </button>
              </div>

              {/* Línea separadora */}
              <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, #C9A84C33, transparent)" }} />

              {/* Música */}
              <VolumeRow
                emoji="🎵"
                label="Música"
                value={musicVol}
                onChange={(v) => { setMusic(v); audioManager.setMusicVol(v); }}
              />

              {/* Efectos */}
              <VolumeRow
                emoji="🔊"
                label="Efectos"
                value={sfxVol}
                onChange={(v) => { setSfx(v); audioManager.setSfxVol(v); }}
              />

              {/* Footer */}
              <p className="font-display text-[10px] tracking-[0.2em] uppercase text-[#C9A84C]/25 text-center">
                Tocá afuera para cerrar
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Fila de volumen ─────────────────────────────────── */
function VolumeRow({ emoji, label, value, onChange }: {
  emoji: string;
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="font-display text-xs tracking-[0.18em] uppercase text-[#C9A84C]/70">
          {emoji} {label}
        </span>
        <span className="font-display text-xs tabular-nums text-[#C9A84C]/40 w-12 text-right">
          {value === 0 ? "silenciado" : `${Math.round(value * 100)}%`}
        </span>
      </div>
      <input
        type="range"
        min={0} max={1} step={0.05}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #C9A84C ${value * 100}%, #C9A84C1A ${value * 100}%)`,
          accentColor: "#C9A84C",
        }}
      />
    </div>
  );
}

/* ── Ícono parlante relleno (SVG propio) ─────────────── */
function SpeakerIcon({ muted, size = 20 }: { muted: boolean; size?: number }) {
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {muted ? (
        /* Parlante con X */
        <>
          <path d="M3 9v6h4l5 5V4L7 9H3z" />
          <line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </>
      ) : (
        /* Parlante con ondas */
        <>
          <path d="M3 9v6h4l5 5V4L7 9H3z" />
          <path d="M16.5 12a4.5 4.5 0 00-2.5-4.03v8.05A4.5 4.5 0 0016.5 12z" />
          <path d="M14 3.23v2.06A7 7 0 0119 12a7 7 0 01-5 6.71v2.06A9 9 0 0021 12a9 9 0 00-7-8.77z" />
        </>
      )}
    </svg>
  );
}
