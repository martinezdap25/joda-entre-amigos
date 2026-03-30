"use client";

import { GameCard } from "@/lib/types";
import { processCardText } from "@/lib/utils";
import { CATEGORY_CONFIG } from "@/lib/constants";

interface CardDisplayProps {
  card: GameCard;
  currentPlayer: string;
  players: string[];
  animKey: number;
}

export function CardDisplay({
  card,
  currentPlayer,
  players,
  animKey,
}: CardDisplayProps) {
  const config = CATEGORY_CONFIG[card.category];
  const text = processCardText(card.text, currentPlayer, players);

  return (
    <div
      key={animKey}
      className="w-full max-w-[400px] min-h-[320px] rounded-3xl p-8 flex flex-col
                 justify-center items-center text-center relative overflow-hidden
                 animate-card-in"
      style={{
        background: `radial-gradient(ellipse at top, ${config.bgGlow}, rgba(20,20,30,0.95))`,
        border: `2px solid ${config.color}33`,
        boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${config.color}22, inset 0 1px 0 rgba(255,255,255,0.06)`,
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{
          background: `linear-gradient(90deg, transparent, ${config.color}, transparent)`,
        }}
      />

      {/* Emoji */}
      <div
        className="text-5xl mb-4"
        style={{ filter: `drop-shadow(0 0 12px ${config.color}66)` }}
      >
        {config.emoji}
      </div>

      {/* Category label */}
      <div
        className="font-display text-xs tracking-[0.25em] uppercase mb-5 opacity-90"
        style={{ color: config.color }}
      >
        {config.label}
      </div>

      {/* Card text */}
      <p
        className="font-body font-bold text-white leading-relaxed m-0 max-w-[340px]"
        style={{ fontSize: "clamp(1.1rem, 4.5vw, 1.35rem)" }}
      >
        {text}
      </p>
    </div>
  );
}
