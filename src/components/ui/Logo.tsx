"use client";

export function Logo() {
  return (
    <div className="text-center mb-10 opacity-0 animate-fade-up">
      <div
        className="text-6xl mb-2 animate-pulse-glow"
        style={{ filter: "drop-shadow(0 0 20px rgba(255,107,53,0.5))" }}
      >
        🔥
      </div>

      <h1 className="font-display text-gradient leading-tight tracking-tight"
        style={{ fontSize: "clamp(2.25rem, 8vw, 3.5rem)" }}
      >
        JODA ENTRE AMIGOS
      </h1>

      <p className="font-body text-white/40 text-sm mt-3 tracking-[0.2em] uppercase">
        El juego que arruina amistades
      </p>
    </div>
  );
}
