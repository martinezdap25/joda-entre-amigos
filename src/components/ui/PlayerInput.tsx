"use client";

import { KeyboardEvent, forwardRef, useRef } from "react";
import { audioManager } from "@/lib/audioManager";

interface PlayerInputProps {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
  placeholder?: string;
  maxLength?: number;
  error?: string | null;
}

export const PlayerInput = forwardRef<HTMLInputElement, PlayerInputProps>(
  (
    {
      value,
      onChange,
      onAdd,
      placeholder = "Inscribe tu nombre...",
      maxLength = 20,
      error,
    },
    ref
  ) => {
    const lastTickRef = useRef(0);

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") onAdd();
    };

    const handleChange = (v: string) => {
      onChange(v);
      const now = Date.now();
      if (now - lastTickRef.current > 80) {
        lastTickRef.current = now;
        audioManager.playTypingClick();
      }
    };

    return (
      <div className="w-full">

        {/* Ornamento superior */}
        <div className="flex items-center gap-2 mb-2 px-1">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-[#C9A84C]/80" />
          <span className="text-[#C9A84C]/70 text-xs font-display tracking-[0.3em]">✦ GLADIADORES ✦</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#C9A84C]/50 to-[#C9A84C]/80" />
        </div>

        {/* Input + botón */}
        <div className="flex gap-2.5">
          <div className="relative flex-1">
            {/* Esquinas decorativas */}
            <span className="absolute top-[6px] left-[6px] w-2.5 h-2.5 border-t-2 border-l-2 border-[#C9A84C]/60 pointer-events-none" />
            <span className="absolute top-[6px] right-[6px] w-2.5 h-2.5 border-t-2 border-r-2 border-[#C9A84C]/60 pointer-events-none" />
            <span className="absolute bottom-[6px] left-[6px] w-2.5 h-2.5 border-b-2 border-l-2 border-[#C9A84C]/60 pointer-events-none" />
            <span className="absolute bottom-[6px] right-[6px] w-2.5 h-2.5 border-b-2 border-r-2 border-[#C9A84C]/60 pointer-events-none" />

            <input
              ref={ref}
              type="text"
              value={value}
              onChange={(e) => handleChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              maxLength={maxLength}
              autoComplete="off"
              className="
                w-full py-4 px-6
                bg-[#0e0c08] border-2 border-[#C9A84C]/40
                text-[#F0D98A] font-display text-sm tracking-widest uppercase
                outline-none transition-all duration-300
                placeholder:text-white/25 placeholder:font-display placeholder:tracking-widest
                focus:border-[#C9A84C]/80 focus:shadow-[0_0_20px_rgba(201,168,76,0.25)]
                focus:bg-[#13100a]
              "
            />
          </div>

          {/* Botón medalla */}
          <button
            onClick={onAdd}
            aria-label="Agregar gladiador"
            className="
              relative w-[58px] shrink-0
              bg-gradient-to-b from-[#E8C84A] via-[#C9A84C] to-[#8B6914]
              border-2 border-[#E8C84A]/60
              text-[#1a1200] font-display text-4xl leading-none
              cursor-pointer transition-all duration-300
              flex items-center justify-center
              shadow-[0_4px_20px_rgba(201,168,76,0.4),inset_0_1px_0_rgba(255,255,255,0.3)]
              hover:shadow-[0_6px_28px_rgba(201,168,76,0.6)] hover:scale-105
              active:scale-95 active:shadow-[0_2px_10px_rgba(201,168,76,0.3)]
            "
          >
            +
          </button>
        </div>

        {/* Ornamento inferior */}
        <div className="flex items-center gap-2 mt-2 px-1">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-[#C9A84C]/50" />
          <span className="text-[#C9A84C]/40 text-[10px] font-body tracking-[0.25em] uppercase">SPQR</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#C9A84C]/30 to-[#C9A84C]/50" />
        </div>

        {/* Error */}
        {error && (
          <p className="text-[#FF6B6B] text-xs font-body ml-1 mt-2 tracking-wide">
            ⚠ {error}
          </p>
        )}
      </div>
    );
  }
);

PlayerInput.displayName = "PlayerInput";
