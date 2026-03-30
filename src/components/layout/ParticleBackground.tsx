"use client";

import { useMemo } from "react";

const STAR_COUNT = 120;

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  gold: boolean;
}

export function ParticleBackground() {
  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: STAR_COUNT }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() < 0.15 ? Math.random() * 2 + 2 : Math.random() * 1.2 + 0.4,
        opacity: Math.random() * 0.5 + 0.15,
        duration: 2 + Math.random() * 5,
        delay: Math.random() * 6,
        gold: Math.random() < 0.08,
      })),
    []
  );

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full"
          style={{
            width: s.size,
            height: s.size,
            left: `${s.x}%`,
            top: `${s.y}%`,
            backgroundColor: s.gold ? "#C9A84C" : "#ffffff",
            opacity: s.opacity,
            boxShadow: s.gold
              ? `0 0 ${s.size * 3}px ${s.size}px rgba(201,168,76,0.4)`
              : s.size > 2
              ? `0 0 ${s.size * 2}px ${s.size * 0.5}px rgba(255,255,255,0.3)`
              : "none",
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: var(--op, 0.3); transform: scale(1); }
          50%       { opacity: 0.05;           transform: scale(0.6); }
        }
      `}</style>
    </div>
  );
}
