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
      className="mt-5 select-none touch-none w-full max-w-[300px] relative"
      style={{ cursor: "pointer" }}
      onMouseDown={() => setReveal(true)}
      onMouseUp={() => setReveal(false)}
      onMouseLeave={() => setReveal(false)}
      onTouchStart={(e) => { e.preventDefault(); setReveal(true); }}
      onTouchEnd={() => setReveal(false)}
    >
      {/* Separador ornamental superior */}
      <div className="flex items-center gap-2 mb-3 px-2">
        <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, ${accentColor}90)` }} />
        <span className="font-display text-[10px] tracking-[0.3em] uppercase" style={{ color: accentColor }}>
          revelar frase
        </span>
        <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, transparent, ${accentColor}90)` }} />
      </div>

      {/* Recuadro con esquinas decorativas */}
      <div
        className="relative px-6 py-4 flex flex-col items-center justify-center overflow-hidden"
        style={{
          border: `1.5px solid ${accentColor}80`,
          background: `${accentColor}18`,
          minHeight: "4.5rem",
        }}
      >
        {/* Esquinas ornamentales */}
        <span className="absolute top-[5px] left-[5px] w-3 h-3 border-t-2 border-l-2 pointer-events-none" style={{ borderColor: accentColor }} />
        <span className="absolute top-[5px] right-[5px] w-3 h-3 border-t-2 border-r-2 pointer-events-none" style={{ borderColor: accentColor }} />
        <span className="absolute bottom-[5px] left-[5px] w-3 h-3 border-b-2 border-l-2 pointer-events-none" style={{ borderColor: accentColor }} />
        <span className="absolute bottom-[5px] right-[5px] w-3 h-3 border-b-2 border-r-2 pointer-events-none" style={{ borderColor: accentColor }} />

        {!revealed ? (
          <motion.div
            className="flex flex-col items-center gap-2"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <span
              className="font-display tracking-[0.22em] uppercase"
              style={{ color: accentColor, fontSize: "0.75rem" }}
            >
              mantené presionado
            </span>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: accentColor }} />
              <div className="h-px w-14" style={{ background: `linear-gradient(to right, transparent, ${accentColor}, transparent)` }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: accentColor }} />
            </div>
          </motion.div>
        ) : (
          <motion.p
            key="revealed"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="font-display font-bold text-center"
            style={{
              color: accentColor,
              fontSize: "clamp(1rem, 4vw, 1.15rem)",
              letterSpacing: "0.02em",
              textShadow: `0 0 20px ${accentColor}80`,
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
    case "ADIVINA":
      // Misteriosa: fade lento con leve zoom in
      return {
        initial: { opacity: 0, scale: 0.94, y: 15 },
        animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
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
  const isAdivina = card.category === "ADIVINA";
  const bastaGoesRight = useMemo(() => Math.random() > 0.5, [card.id]);

  useEffect(() => {
    if (showLightning) audioManager.playSfx("/sounds/vine-boom-fx.mp3");
    else if (card.category === "BASTA") audioManager.playSfx("/sounds/basta_chicos_fx.mp3", 2.2);
    else if (card.category === "TODOS") audioManager.playSfx("/sounds/todos_card_fx.mp3");
    else if (card.category === "AMIGOS") audioManager.playSfx("/sounds/dead_fx.mp3", 1.8);
    else if (card.category === "CONFESION") audioManager.playSfx("/sounds/dexter_fx.mp3");
    else if (card.category === "VERSUS") audioManager.playSfx("/sounds/fighting_fx.mp3");
    else if (card.category === "ADIVINA") audioManager.playSfx("/sounds/dexter_fx.mp3", 0.8);
    else audioManager.playSfx("/sounds/faaah_fx.mp3");
  }, [card.id, showLightning, card.category]);

  return (
    <motion.div
      key={animKey}
      {...animationProps}
      className="w-full max-w-[420px] min-h-[340px] rounded-[2.2rem] p-9 flex flex-col justify-center items-center text-center relative overflow-hidden border-2"
      style={{
        borderColor: isAdivina ? "#B388FF40" : isBasta ? "#00E67640" : "#C9A84C40",
        background: isAdivina
          ? "linear-gradient(160deg, #130d1e 0%, #0f0a1a 50%, #0a0810 100%)"
          : isBasta
          ? "linear-gradient(160deg, #061a0e 0%, #041208 50%, #020a04 100%)"
          : "linear-gradient(to bottom right, #18120a, #221a0e, #0e0c08)",
        boxShadow: isAdivina
          ? `0 20px 60px rgba(0,0,0,0.5), 0 0 40px #B388FF22, 0 0 0 4px #B388FF11, inset 0 1px 0 rgba(255,255,255,0.06)`
          : isBasta
          ? `0 20px 60px rgba(0,0,0,0.5), 0 0 40px #00E67622, 0 0 0 4px #00E67611, inset 0 1px 0 rgba(255,255,255,0.06)`
          : `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${config.color}22, 0 0 0 4px #C9A84C11, inset 0 1px 0 rgba(255,255,255,0.06)`,
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
          background: isAdivina
            ? `linear-gradient(90deg, transparent, #B388FF, transparent)`
            : isBasta
            ? `linear-gradient(90deg, transparent, #00E676, transparent)`
            : `linear-gradient(90deg, transparent, #C9A84C, transparent)`,
          opacity: 0.55,
        }}
      />

      {/* Emoji de fondo decorativo */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ fontSize: "clamp(10rem, 40vw, 14rem)", opacity: 0.06, zIndex: 0 }}
        aria-hidden="true"
      >
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
      {isAdivina ? (
        <>
          {/* Nombre del personaje bien visible para el resto del grupo */}
          <p
            className="font-display font-bold text-center m-0"
            style={{
              color: config.color,
              fontSize: "clamp(1.7rem, 7vw, 2.3rem)",
              letterSpacing: "0.04em",
              textShadow: `0 0 28px ${config.color}60`,
            }}
          >
            {card.description}
          </p>
          {/* Instrucción para el resto */}
          <p
            className="font-display text-center mt-4 max-w-[300px]"
            style={{
              color: `${config.color}99`,
              fontSize: "clamp(0.85rem, 3vw, 0.95rem)",
              letterSpacing: "0.01em",
              lineHeight: 1.5,
            }}
          >
            <span style={{ color: config.color, fontWeight: "bold" }}>{currentPlayer}</span>{" "}
            debe hacer preguntas para descubrir su personaje.{" "}
            Solo tiene{" "}
            <span style={{ color: config.color }}>{card.duration ?? 40} segundos</span>.
          </p>
          {/* Timer dentro del bloque ADIVINA */}
          {card.duration !== undefined && (
            <CardTimer
              duration={card.duration}
              accentColor={config.color}
              tickVolumeScale={0.35}
              onRunningChange={onTimerRunning}
            />
          )}
        </>
      ) : (
        <p
          className="font-display font-bold text-[#F0D98A] leading-relaxed m-0 max-w-[340px]"
          style={{
            fontSize: "clamp(1.18rem, 4.5vw, 1.38rem)",
            letterSpacing: "0.01em",
          }}
        >
          {text}
        </p>
      )}

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

      {/* Descripción opcional — no para ADIVINA (ya se muestra arriba) */}
      {card.description && !isAdivina && (
        card.spoiler ? (
          <SpoilerReveal text={card.description} accentColor={config.color} />
        ) : (
          <p
            className="font-display text-[#aaa] leading-relaxed mt-4 max-w-[320px] text-center"
            style={{ fontSize: "clamp(0.88rem, 3vw, 1rem)", letterSpacing: "0.01em" }}
          >
            {card.description}
          </p>
        )
      )}

      {/* Timer — solo para cartas con duración, excepto BASTA y ADIVINA (ya tiene el suyo) */}
      {card.duration !== undefined && !isBasta && !isAdivina && (
        <CardTimer
          duration={card.duration}
          accentColor={config.color}
          large={card.category === "TODOS"}
          tickVolumeScale={card.category === "ADIVINA" ? 0.35 : 1}
          onRunningChange={onTimerRunning}
        />
      )}

      {/* Línea ornamental inferior */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{
          background: isAdivina
            ? `linear-gradient(90deg, transparent, #B388FF, transparent)`
            : isBasta
            ? `linear-gradient(90deg, transparent, #00E676, transparent)`
            : `linear-gradient(90deg, transparent, #C9A84C, transparent)`,
          opacity: 0.38,
        }}
      />
    </motion.div>
  );
}
