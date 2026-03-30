"use client";

import { useMemo } from "react";

const PARTICLE_COLORS = ["#FF6B35", "#E040FB", "#00E5FF", "#FFEA00", "#FF1744"];
const PARTICLE_COUNT = 18;

interface Particle {
  id: number;
  size: number;
  x: number;
  y: number;
  color: string;
  duration: number;
  delay: number;
}

export function ParticleBackground() {
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        id: i,
        size: Math.random() * 4 + 2,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
        duration: 8 + Math.random() * 12,
        delay: Math.random() * 5,
      })),
    []
  );

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full animate-float"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: 0.25,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
