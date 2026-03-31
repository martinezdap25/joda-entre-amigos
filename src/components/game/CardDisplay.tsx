"use client";

import { GameCard } from "@/lib/types";
import { processCardText } from "@/lib/utils";
import { CATEGORY_CONFIG } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";
import { CardTimer } from "./CardTimer";
import { ImageLightbox } from "./ImageLightbox";

interface CardDisplayProps {
  card: GameCard;
  currentPlayer: string;
  players: string[];
  animKey: number;
  versusPlayer?: string;
  versusPlayer2?: string;
  onTimerRunning?: (running: boolean) => void;
}

/* ── Rayo SVG animado ────────────────────────────────── */
function LightningEffect() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      {/* Flash de fondo */}
      <motion.div
        className="absolute inset-0 rounded-[2.2rem]"
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        style={{ background: "radial-gradient(circle, rgba(255,215,0,0.25) 0%, transparent 70%)" }}
      />
      {/* Rayo central */}
      <motion.svg
        width="90"
        height="160"
        viewBox="0 0 90 160"
        fill="none"
        className="absolute"
        initial={{ opacity: 1, scale: 1.2 }}
        animate={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.path
          d="M50 0 L35 55 H55 L25 110 L70 50 H48 L65 0 Z"
          fill="#FFD700"
          fillOpacity={0.85}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.path
          d="M50 0 L35 55 H55 L25 110 L70 50 H48 L65 0 Z"
          stroke="#FFF"
          strokeWidth="2"
          fill="none"
          strokeOpacity={0.5}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.svg>
    </motion.div>
  );
}

/* ── Animaciones por categoría ───────────────────────── */
function getCardAnimation(category: string) {
  switch (category) {
    case "RETO":
    case "PICANTE":
      // Impacto: entra rápido desde arriba, leve shake
      return {
        initial: { opacity: 0, y: -40 },
        animate: {
          opacity: 1,
          y: [0, -4, 3, -2, 0],
          transition: { duration: 0.4, ease: "easeOut", y: { duration: 0.5, times: [0, 0.2, 0.4, 0.7, 1] } },
        },
      };
    case "CONFESION":
      // Lenta, misteriosa
      return {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
      };
    case "AMIGOS":
      // Entrada con leve shake horizontal (sin desplazar)
      return {
        initial: { opacity: 0, y: 20 },
        animate: {
          opacity: 1,
          y: 0,
          x: [0, -3, 3, -2, 0],
          transition: { duration: 0.4, ease: "easeOut", x: { duration: 0.4, times: [0, 0.2, 0.4, 0.7, 1] } },
        },
      };
    default:
      // Suave fade up
      return {
        initial: { opacity: 0, y: 25 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
      };
  }
}

export function CardDisplay({
  card,
  currentPlayer,
  players,
  animKey,
  versusPlayer,
  versusPlayer2,
  onTimerRunning,
}: CardDisplayProps) {
  const config = CATEGORY_CONFIG[card.category];
  const text = processCardText(card.text, currentPlayer, players, versusPlayer, versusPlayer2);
  const animationProps = getCardAnimation(card.category);
  const showLightning = card.category === "RETO" || card.category === "PICANTE";

  return (
    <motion.div
      key={animKey}
      {...animationProps}
      className="w-full max-w-[420px] min-h-[340px] rounded-[2.2rem] p-9 flex flex-col justify-center items-center text-center relative overflow-hidden border-2 border-[#C9A84C]/40 bg-gradient-to-br from-[#18120a] via-[#221a0e] to-[#0e0c08]"
      style={{
        boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${config.color}22, 0 0 0 4px #C9A84C11, inset 0 1px 0 rgba(255,255,255,0.06)`,
      }}
    >
      {/* Efecto rayo para cartas pesadas */}
      <AnimatePresence>
        {showLightning && <LightningEffect key={`lightning-${animKey}`} />}
      </AnimatePresence>

      {/* Línea ornamental superior */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{
          background: `linear-gradient(90deg, transparent, #C9A84C, transparent)`,
          opacity: 0.55,
        }}
      />

      {/* Emoji */}
      <div className="text-6xl mb-4">
        {config.emoji}
      </div>

      {/* Category label */}
      <div className="font-display text-xs tracking-[0.25em] uppercase mb-3 opacity-90 text-[#C9A84C]">
        {config.label}
      </div>

      {/* Points indicator */}
      <div className="font-display text-[11px] text-[#C9A84C]/50 tracking-[0.25em] uppercase mb-5">
        {config.points} {config.points === 1 ? "punto" : "puntos"}
      </div>

      {/* Card text */}
      <p
        className="font-display font-bold text-[#F0D98A] leading-relaxed m-0 max-w-[340px]"
        style={{ fontSize: "clamp(1.18rem, 4.5vw, 1.38rem)", letterSpacing: "0.01em" }}
      >
        {text}
      </p>

      {/* Imagen opcional (ej: poses) */}
      {card.image && <ImageLightbox src={card.image} />}

      {/* Descripción opcional */}
      {card.description && (
        <p
          className="font-display text-[#888] leading-relaxed mt-4 max-w-[320px] text-center"
          style={{ fontSize: "clamp(0.72rem, 2.5vw, 0.82rem)", letterSpacing: "0.01em" }}
        >
          {card.description}
        </p>
      )}

      {/* Timer (solo para cartas con duración explícita) */}
      {card.duration !== undefined && (
        <CardTimer
          duration={card.duration}
          accentColor={config.color}
          large={card.category === "TODOS"}
          onRunningChange={onTimerRunning}
        />
      )}

      {/* Línea ornamental inferior */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{
          background: `linear-gradient(90deg, transparent, #C9A84C, transparent)`,
          opacity: 0.38,
        }}
      />
    </motion.div>
  );
}
