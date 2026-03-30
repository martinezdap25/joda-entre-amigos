"use client";

import Image from "next/image";

export function Logo() {
  return (
    <div className="text-center mb-8 opacity-0 animate-fade-up w-full">

      {/* Logo con marco romano */}
      <div className="relative mx-auto mb-5 w-28 h-28">

        {/* Borde exterior dorado */}
        <div className="absolute inset-0 border-2 border-[#C9A84C]/60
                        shadow-[0_0_20px_rgba(201,168,76,0.15),inset_0_0_20px_rgba(201,168,76,0.05)]" />

        {/* Esquinas grandes */}
        <span className="absolute -top-[4px] -left-[4px] w-4 h-4 border-t-[3px] border-l-[3px] border-[#E8C84A]" />
        <span className="absolute -top-[4px] -right-[4px] w-4 h-4 border-t-[3px] border-r-[3px] border-[#E8C84A]" />
        <span className="absolute -bottom-[4px] -left-[4px] w-4 h-4 border-b-[3px] border-l-[3px] border-[#E8C84A]" />
        <span className="absolute -bottom-[4px] -right-[4px] w-4 h-4 border-b-[3px] border-r-[3px] border-[#E8C84A]" />

        {/* Puntos centrales en cada lado */}
        <span className="absolute top-1/2 -translate-y-1/2 -left-[5px] w-[5px] h-[5px] bg-[#C9A84C] rounded-full" />
        <span className="absolute top-1/2 -translate-y-1/2 -right-[5px] w-[5px] h-[5px] bg-[#C9A84C] rounded-full" />
        <span className="absolute left-1/2 -translate-x-1/2 -top-[5px] w-[5px] h-[5px] bg-[#C9A84C] rounded-full" />
        <span className="absolute left-1/2 -translate-x-1/2 -bottom-[5px] w-[5px] h-[5px] bg-[#C9A84C] rounded-full" />

        {/* Imagen */}
        <Image
          src="/images/logo_app.png"
          alt="El Coliseo del Trago"
          fill
          className="object-contain p-2"
          priority
        />
      </div>

      {/* Ornamento superior */}
      <div className="flex items-center gap-3 mb-3 px-2">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/60 to-[#C9A84C]" />
        <span className="text-[#C9A84C]/60 text-xs font-display tracking-[0.4em]">⚔ ⚔ ⚔</span>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#C9A84C]/60 to-[#C9A84C]" />
      </div>

      {/* Título */}
      <h1
        className="font-display text-gradient-gold leading-tight tracking-wide"
        style={{ fontSize: "clamp(2rem, 8vw, 3rem)" }}
      >
        El Coliseo del Trago
      </h1>

      {/* Ornamento inferior */}
      <div className="flex items-center gap-3 mt-3 px-2">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-[#C9A84C]/60" />
        <p className="font-body text-[#C9A84C]/50 text-[10px] tracking-[0.35em] uppercase shrink-0">
          SPQR · Bebe o Muere · SPQR
        </p>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#C9A84C]/40 to-[#C9A84C]/60" />
      </div>

    </div>
  );
}
