"use client";

import { useEffect, useMemo, useState } from "react";
import { GameCard } from "@/lib/types";
import { processCardText } from "@/lib/utils";
import { CATEGORY_CONFIG } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";
import { CardTimer } from "./CardTimer";
import { ImageLightbox } from "./ImageLightbox";
import { audioManager } from "@/lib/audioManager";

interface CardDisplayProps {
  card: GameCard;
  currentPlayer: string;
  players: string[];
  animKey: number;
  versusPlayer?: string;
  versusPlayer2?: string;
  onTimerRunning?: (running: boolean) => void;
}

/* ── Spoiler: mantener presionado para revelar ───────── */
function SpoilerReveal({ text, accentColor }: { text: string; accentColor: string }) {
  const [revealed, setReveal] = useState(false);

  return (
    <div
      className="mt-4 select-none touch-none w-full max-w-[300px]"
      style={{ cursor: "pointer" }}
      onMouseDown={() => setReveal(true)}
      onMouseUp={() => setReveal(false)}
      onMouseLeave={() => setReveal(false)}
      onTouchStart={(e) => { e.preventDefault(); setReveal(true); }}
      onTouchEnd={() => setReveal(false)}
    >
      {/* min-h fijo para que el recuadro no cambie de tamaño al revelar */}
      <div
        className="px-6 py-2 rounded-2xl flex flex-col items-center justify-center"
        style={{
          border: `1px solid ${accentColor}40`,
          background: `${accentColor}12`,
          minHeight: "4rem",
        }}
      >
        {!revealed ? (
          <>
            <span
              className="font-display text-[10px] tracking-[0.22em] uppercase"
              style={{ color: `${accentColor}80` }}
            >
              🔒 Mantené presionado para revelar
            </span>
            <div
              className="h-3 rounded-full mt-1"
              style={{ width: "6rem", background: `${accentColor}30` }}
            />
          </>
        ) : (
          <motion.p
            key="revealed"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-display font-bold text-center"
            style={{
              color: accentColor,
              fontSize: "clamp(1rem, 4vw, 1.15rem)",
              textShadow: `0 0 18px ${accentColor}60`,
            }}
          >
            {text}
          </motion.p>
        )}
      </div>
    </div>
  );
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
        initial: { opacity: 0, y: -40, scale: 1 },
        animate: {
          opacity: 1,
          y: [0, -4, 3, -2, 0],
          scale: 1,
          transition: { duration: 0.4, ease: "easeOut", y: { duration: 0.5, times: [0, 0.2, 0.4, 0.7, 1] } },
        },
      };
    case "CONFESION":
      // Lenta, misteriosa
      return {
        initial: { opacity: 0, y: 20, scale: 1 },
        animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
      };
    case "AMIGOS":
      // Entrada suave desde abajo
      return {
        initial: { opacity: 0, y: 20, scale: 1 },
        animate: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.4, ease: "easeOut" },
        },
      };
    case "VERSUS":
      // Choque: entra desde abajo con leve rebote de escala
      return {
        initial: { opacity: 0, y: 30, scale: 0.97 },
        animate: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.35, ease: "easeOut" },
        },
      };
    case "BASTA":
      // Pop energético — entra escalando con rebote
      return {
        initial: { opacity: 0, scale: 0.82 },
        animate: {
          opacity: 1,
          scale: [1.06, 0.97, 1.02, 1],
          transition: { duration: 0.45, ease: "easeOut", scale: { duration: 0.45, times: [0.2, 0.5, 0.75, 1] } },
        },
      };
    default:
      // Suave fade up
      return {
        initial: { opacity: 0, y: 25, scale: 1 },
        animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: "easeOut" } },
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
  const isBasta = card.category === "BASTA";
  const bastaGoesRight = useMemo(() => Math.random() > 0.5, [card.id]);

  useEffect(() => {
    if (showLightning) audioManager.playSfx("/sounds/vine-boom-fx.mp3");
    else if (card.category === "BASTA") audioManager.playSfx("/sounds/basta_chicos_fx.mp3", 2.2);
    else if (card.category === "TODOS") audioManager.playSfx("/sounds/todos_card_fx.mp3");
    else if (card.category === "AMIGOS") audioManager.playSfx("/sounds/dead_fx.mp3", 1.8);
    else if (card.category === "CONFESION") audioManager.playSfx("/sounds/dexter_fx.mp3");
    else if (card.category === "VERSUS") audioManager.playSfx("/sounds/fighting_fx.mp3");
    else audioManager.playSfx("/sounds/faaah_fx.mp3");
  }, [card.id, showLightning, card.category]);

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

      {/* Category label — oculto para BASTA (ya se muestra en el header) */}
      {!isBasta && (
        <div className="font-display text-xs tracking-[0.25em] uppercase mb-3 opacity-90 text-[#C9A84C]">
          {config.label}
        </div>
      )}

      {/* Points indicator */}
      {isBasta ? (
        <div className="font-display text-[11px] text-[#C9A84C]/50 tracking-[0.25em] uppercase mb-5">
          🍷 2 copas — el perdedor
        </div>
      ) : !config.isGroupCard && (() => {
        const pts = card.points ?? config.points;
        return (
          <div className="font-display text-[11px] text-[#C9A84C]/50 tracking-[0.25em] uppercase mb-5">
            {pts} {pts === 1 ? "punto" : "puntos"}
          </div>
        );
      })()}

      {/* Card text */}
      <p
        className="font-display font-bold text-[#F0D98A] leading-relaxed m-0 max-w-[340px]"
        style={{
          fontSize: "clamp(1.18rem, 4.5vw, 1.38rem)",
          letterSpacing: "0.01em",
        }}
      >
        {text}
      </p>

      {/* Indicador BASTA: quién empieza y hacia dónde */}
      {isBasta && (
        <div className="mt-5 w-full max-w-[300px] flex flex-col items-center gap-2">
          {/* Separador ornamental */}
          <div className="flex items-center gap-3 w-full">
            <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, ${config.color}40)` }} />
            <span className="font-display text-[9px] tracking-[0.35em] uppercase" style={{ color: `${config.color}60` }}>arranca</span>
            <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, transparent, ${config.color}40)` }} />
          </div>

          {/* Fila principal: flecha ← nombre → flecha */}
          <div className="flex items-center gap-3 w-full justify-center">
            {/* Flecha izquierda — activa si va a la izquierda */}
            <motion.svg
              width="28" height="28" viewBox="0 0 28 28" fill="none"
              animate={!bastaGoesRight ? { x: [-3, 0, -3], opacity: [0.9, 1, 0.9] } : { opacity: 0.18 }}
              transition={!bastaGoesRight ? { duration: 1.1, repeat: Infinity, ease: "easeInOut" } : {}}
            >
              <path d="M18 6 L8 14 L18 22" stroke={config.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 14 H22" stroke={config.color} strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
            </motion.svg>

            {/* Nombre del jugador */}
            <div className="flex flex-col items-center">
              <span
                className="font-display font-bold leading-none"
                style={{
                  color: config.color,
                  fontSize: "clamp(1rem, 4vw, 1.2rem)",
                  letterSpacing: "0.04em",
                  textShadow: `0 0 18px ${config.color}60`,
                }}
              >
                {currentPlayer}
              </span>
            </div>

            {/* Flecha derecha — activa si va a la derecha */}
            <motion.svg
              width="28" height="28" viewBox="0 0 28 28" fill="none"
              animate={bastaGoesRight ? { x: [0, 3, 0], opacity: [0.9, 1, 0.9] } : { opacity: 0.18 }}
              transition={bastaGoesRight ? { duration: 1.1, repeat: Infinity, ease: "easeInOut" } : {}}
            >
              <path d="M10 6 L20 14 L10 22" stroke={config.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M20 14 H6" stroke={config.color} strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
            </motion.svg>
          </div>

          {/* Label dirección */}
          <span
            className="font-display text-[10px] tracking-[0.28em] uppercase"
            style={{ color: `${config.color}70` }}
          >
            hacia la {bastaGoesRight ? "derecha" : "izquierda"}
          </span>
        </div>
      )}

      {/* Imagen opcional (ej: poses) */}
      {card.image && <ImageLightbox src={card.image} />}

      {/* Descripción opcional */}
      {card.description && (
        card.spoiler ? (
          <SpoilerReveal text={card.description} accentColor={config.color} />
        ) : (
          <p
            className="font-display text-[#888] leading-relaxed mt-4 max-w-[320px] text-center"
            style={{ fontSize: "clamp(0.72rem, 2.5vw, 0.82rem)", letterSpacing: "0.01em" }}
          >
            {card.description}
          </p>
        )
      )}

      {/* Timer — solo para cartas con duración, excepto BASTA que lo muestra fuera de la card */}
      {card.duration !== undefined && !isBasta && (
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
