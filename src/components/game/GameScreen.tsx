"use client";

import { useState, useEffect, useRef } from "react";
import { Shield } from "lucide-react";
import { GameCard } from "@/lib/types";
import { pickRandomPlayer } from "@/lib/utils";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { CardDisplay } from "./CardDisplay";
import { CardTimer } from "./CardTimer";
import { BastaLoserModal } from "./BastaLoserModal";
import { SaveHalfModal } from "./SaveHalfModal";
import { audioManager } from "@/lib/audioManager";

interface GameScreenProps {
  players: string[];
  currentPlayer: string;
  currentCard: GameCard;
  cardIndex: number;
  totalCards: number;
  progress: number;
  isGroupCard: boolean;
  onCompleted: (partner?: string) => void;
  onDrank: (partner?: string) => void;
  onNext: () => void;
  onVersusResult: (winner: string, loser: string) => void;
  onPoseResult: (involvedPlayers: string[], success: boolean) => void;
  onBastaLoser: (loser: string) => void;
  onSaveHalf: (savedPlayers: string[]) => void;
  onExit: () => void;
}

export function GameScreen({
  players,
  currentPlayer,
  currentCard,
  cardIndex,
  totalCards,
  progress,
  isGroupCard,
  onCompleted,
  onDrank,
  onNext,
  onVersusResult,
  onPoseResult,
  onBastaLoser,
  onSaveHalf,
  onExit,
}: GameScreenProps) {
  const [animKey, setAnimKey] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [versusRevealed, setVersusRevealed] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  const [versusPlayer, setVersusPlayer] = useState<string>("");
  const [versusPlayer2, setVersusPlayer2] = useState<string>("");
  const [bastaFinished, setBastaFinished] = useState(false);
  const [showSaveHalf, setShowSaveHalf] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  // Reset scroll interno al cambiar de carta
  useEffect(() => {
    containerRef.current?.scrollTo({ top: 0, left: 0 });
  }, [animKey]);

  const isBasta = currentCard.category === "BASTA";
  const isVersus = currentCard.category === "VERSUS";
  const isAdivina = currentCard.category === "ADIVINA";
  const isPicante = currentCard.category === "PICANTE";
  const isRetoWithPartner = currentCard.category === "RETO" && currentCard.text.includes("{randomPlayer}") && currentCard.cardSubtype !== "solo";
  const isWithPartner = isRetoWithPartner || currentCard.cardSubtype === "partner";
  const isSaveHalf = currentCard.cardSubtype === "save_half";
  const isPose = !!currentCard.poseCount;
  const poseCount = currentCard.poseCount ?? 1;

  // Elegir jugadores extra una vez por carta
  useEffect(() => {
    setBastaFinished(false);
    setShowSaveHalf(false);
    setVersusRevealed(false);
    if (isPicante) audioManager.playSfx("/sounds/ara_ara_fx.mp3");
    if (isAdivina) audioManager.playSfx("/sounds/quien_es_fx.mp3");
    const needsOne = (isVersus || poseCount >= 2 || isWithPartner) && players.length > 1;
    if (!needsOne) { setVersusPlayer(""); setVersusPlayer2(""); return; }

    const p1 = pickRandomPlayer(players, currentPlayer);
    setVersusPlayer(p1);

    if (poseCount >= 3 && players.length > 2) {
      const rest = players.filter(p => p !== currentPlayer && p !== p1);
      setVersusPlayer2(rest[Math.floor(Math.random() * rest.length)] ?? "");
    } else {
      setVersusPlayer2("");
    }
  }, [currentCard, players, currentPlayer, isVersus, poseCount]);

  const handleChoice = (action: () => void) => {
    if (timerRunning) {
      setPendingAction(() => action);
      return;
    }
    setAnimKey((k) => k + 1);
    timeoutRef.current = setTimeout(() => action(), 30);
  };

  const confirmAdvance = () => {
    setTimerRunning(false);
    setPendingAction(null);
    setAnimKey((k) => k + 1);
    timeoutRef.current = setTimeout(() => pendingAction?.(), 30);
  };

  return (
    <div ref={containerRef} className="no-scrollbar fixed inset-0 overflow-y-scroll overflow-x-hidden flex flex-col items-center px-4 py-5 z-10 bg-gradient-to-b from-[#18120a] via-[#221a0e] to-[#0e0c08]">
      {/* Top bar */}
      <div className="w-full max-w-[440px] flex justify-between items-center mb-5 shrink-0">
        <button
          onClick={onExit}
          className="rounded-lg px-4 py-2 text-xs font-display tracking-[0.18em] uppercase border border-[#C9A84C]/60 bg-[#18120a] text-[#C9A84C] hover:bg-[#221a0e] hover:text-[#F0D98A] transition-colors duration-200 focus:outline-none"
        >
          Salir
        </button>
        <span className="font-display text-xs text-[#C9A84C]/30 tracking-[0.18em]">
          <Shield size={13} className="inline-block mr-1 mb-0.5 text-[#C9A84C]/40" />
          {cardIndex + 1} / {totalCards}
        </span>
      </div>

      {/* Progress */}
      <div className="w-full flex justify-center mb-7">
        <div className="w-full max-w-[340px]">
          <ProgressBar progress={progress} />
        </div>
      </div>

      {/* Player name — oculto para cartas grupales */}
      <div key={`player-${animKey}`} className="text-center mb-7 animate-fade-up">
        {isGroupCard ? (
          <>
            <p className="font-display text-xs tracking-[0.22em] uppercase mb-2 text-[#C9A84C]/40">
              Ronda grupal
            </p>
            <h2
              className="font-display m-0"
              style={{
                fontSize: "clamp(1.6rem, 6vw, 2.2rem)",
                letterSpacing: "0.06em",
                fontWeight: 700,
                color: currentCard.category === "BASTA" ? "#C9A84C" : "#FFEA00",
              }}
            >
              {currentCard.category === "BASTA" ? "¡BASTA!" : "TODOS JUEGAN"}
            </h2>
          </>
        ) : (
          <>
            <p className="font-display text-xs text-[#C9A84C]/40 tracking-[0.22em] uppercase mb-2">
              Turno de
            </p>
            <h2
              className="font-display text-[#C9A84C] m-0"
              style={{
                fontSize: "clamp(2.2rem, 8vw, 2.9rem)",
                letterSpacing: "0.04em",
                fontWeight: 700,
              }}
            >
              {currentPlayer}
            </h2>
          </>
        )}
      </div>

      {/* Card */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[420px] relative">
        <CardDisplay
          card={currentCard}
          currentPlayer={currentPlayer}
          players={players}
          animKey={animKey}
          versusPlayer={versusPlayer || undefined}
          versusPlayer2={versusPlayer2 || undefined}
          onTimerRunning={setTimerRunning}
        />

        {/* Tapa VERSUS: cubre la carta hasta que un tercero la revele */}
        {isVersus && versusPlayer && !versusRevealed && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-[2.2rem] overflow-hidden"
            style={{
              background: "linear-gradient(160deg, #1e1608 0%, #18120a 50%, #0e0c08 100%)",
              border: "2px solid #C9A84C40",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px #C9A84C22, inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            {/* Línea ornamental superior */}
            <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)", opacity: 0.55 }} />

            <div className="flex flex-col items-center gap-5 px-7 py-8 w-full">
              {/* Label */}
              <div className="flex items-center gap-3 w-full">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#C9A84C]" />
                <span className="font-display text-[10px] tracking-[0.35em] uppercase text-[#C9A84C]">versus</span>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#C9A84C]" />
              </div>

              {/* Jugadores */}
              <div className="flex items-center gap-3 justify-center">
                <span className="font-display font-bold text-[#F0D98A]" style={{ fontSize: "clamp(1.2rem, 5vw, 1.6rem)", letterSpacing: "0.04em" }}>
                  {currentPlayer}
                </span>
                <span className="font-display text-[#C9A84C]/60 text-lg">vs</span>
                <span className="font-display font-bold text-[#F0D98A]" style={{ fontSize: "clamp(1.2rem, 5vw, 1.6rem)", letterSpacing: "0.04em" }}>
                  {versusPlayer}
                </span>
              </div>

              {/* Instrucción */}
              <p className="font-display text-[#C9A84C] text-center leading-relaxed" style={{ fontSize: "clamp(0.95rem, 3.5vw, 1.1rem)", letterSpacing: "0.02em" }}>
                Que otro jugador lea la carta en voz alta.{" "}
                <span className="text-[#F0D98A] font-bold">{currentPlayer}</span> y <span className="text-[#F0D98A] font-bold">{versusPlayer}</span> no la miren.
              </p>

              {/* Botón revelar */}
              <button
                onClick={() => setVersusRevealed(true)}
                className="relative w-full py-4 border-2 font-display tracking-[0.22em] uppercase transition-all duration-200 flex items-center justify-center overflow-hidden text-sm bg-gradient-to-b from-[#2a1f00] via-[#1a1200] to-[#0e0c08] border-[#C9A84C] text-[#F0D98A] hover:bg-[#3a2d00] active:scale-[0.98]"
              >
                <span className="absolute top-[5px] left-[5px] w-3 h-3 border-t-2 border-l-2 border-[#C9A84C] pointer-events-none" />
                <span className="absolute top-[5px] right-[5px] w-3 h-3 border-t-2 border-r-2 border-[#C9A84C] pointer-events-none" />
                <span className="absolute bottom-[5px] left-[5px] w-3 h-3 border-b-2 border-l-2 border-[#C9A84C] pointer-events-none" />
                <span className="absolute bottom-[5px] right-[5px] w-3 h-3 border-b-2 border-r-2 border-[#C9A84C] pointer-events-none" />
                VER CARTA
              </button>
            </div>

            {/* Línea ornamental inferior */}
            <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)", opacity: 0.55 }} />
          </div>
        )}

        {/* Tapa ADIVINA: muestra los emojis-pista antes de revelar la carta */}
        {isAdivina && !versusRevealed && (() => {
          const emojiHint = currentCard.text.split('? ')[1]?.trim() ?? '';
          return (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center rounded-[2.2rem] overflow-hidden"
              style={{
                background: "linear-gradient(160deg, #130d1e 0%, #0f0a1a 50%, #0a0810 100%)",
                border: "2px solid #B388FF40",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px #B388FF22, inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              {/* Línea ornamental superior */}
              <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, transparent, #B388FF, transparent)", opacity: 0.55 }} />

              <div className="flex flex-col items-center gap-5 px-7 py-8 w-full">
                {/* Label */}
                <div className="flex items-center gap-3 w-full">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#B388FF]" />
                  <span className="font-display text-[10px] tracking-[0.35em] uppercase text-[#B388FF]">adivina quién soy</span>
                  <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#B388FF]" />
                </div>

                {/* Emojis pista */}
                <div className="text-center" style={{ fontSize: "clamp(3.5rem, 18vw, 5rem)", lineHeight: 1.2 }}>
                  {emojiHint}
                </div>

                {/* Instrucción */}
                <p className="font-display text-[#B388FF] text-center leading-relaxed" style={{ fontSize: "clamp(0.88rem, 3.2vw, 1rem)", letterSpacing: "0.02em" }}>
                  <span className="text-[#D4AAFF] font-bold">{currentPlayer}</span>, usá los emojis como pista para adivinar tu personaje. Cuando estés listo, otro jugador apretá{" "}
                  <span style={{ color: "#D4AAFF" }}>VER CARTA</span>.
                </p>

                {/* Botón revelar */}
                <button
                  onClick={() => setVersusRevealed(true)}
                  className="relative w-full py-4 border-2 font-display tracking-[0.22em] uppercase transition-all duration-200 flex items-center justify-center overflow-hidden text-sm bg-gradient-to-b from-[#1e1030] via-[#130a20] to-[#0a0810] border-[#B388FF] text-[#D4AAFF] hover:bg-[#2a1840] active:scale-[0.98]"
                >
                  <span className="absolute top-[5px] left-[5px] w-3 h-3 border-t-2 border-l-2 border-[#B388FF] pointer-events-none" />
                  <span className="absolute top-[5px] right-[5px] w-3 h-3 border-t-2 border-r-2 border-[#B388FF] pointer-events-none" />
                  <span className="absolute bottom-[5px] left-[5px] w-3 h-3 border-b-2 border-l-2 border-[#B388FF] pointer-events-none" />
                  <span className="absolute bottom-[5px] right-[5px] w-3 h-3 border-b-2 border-r-2 border-[#B388FF] pointer-events-none" />
                  VER CARTA
                </button>
              </div>

              {/* Línea ornamental inferior */}
              <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, transparent, #B388FF, transparent)", opacity: 0.55 }} />
            </div>
          );
        })()}
        </div>
      </div>

      {/* Botones: condicional según tipo de carta */}
      <div className="w-full max-w-[400px] flex gap-3 mt-8">
        {isBasta ? (
          /* Carta BASTA → timer externo; cuando termina aparece modal de perdedor */
          <div className="w-full flex justify-center">
            <CardTimer
              key={`basta-timer-${animKey}`}
              duration={currentCard.duration ?? 30}
              accentColor="#C9A84C"
              large
              onRunningChange={setTimerRunning}
              onDone={() => {
                audioManager.playSfx("/sounds/basta_final_fx.mp3");
                setBastaFinished(true);
              }}
            />
          </div>
        ) : isSaveHalf ? (
          /* Carta save_half → botón para abrir selección de equipo */
          <button
            onClick={() => setShowSaveHalf(true)}
            className="relative flex-1 py-5 border-2 font-display tracking-[0.18em] uppercase transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden text-base bg-gradient-to-b from-[#1a1800] via-[#1a1500] to-[#0e0c08] border-[#FFEA00]/60 text-[#FFEA00] hover:border-[#FFE000] hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="absolute top-[5px] left-[5px] w-2.5 h-2.5 border-t-2 border-l-2 border-[#FFEA00]/60 pointer-events-none" />
            <span className="absolute top-[5px] right-[5px] w-2.5 h-2.5 border-t-2 border-r-2 border-[#FFEA00]/60 pointer-events-none" />
            <span className="absolute bottom-[5px] left-[5px] w-2.5 h-2.5 border-b-2 border-l-2 border-[#FFEA00]/60 pointer-events-none" />
            <span className="absolute bottom-[5px] right-[5px] w-2.5 h-2.5 border-b-2 border-r-2 border-[#FFEA00]/60 pointer-events-none" />
            ELEGIR EQUIPO
          </button>
        ) : isGroupCard ? (
          /* Carta grupal → solo SIGUIENTE, sin scoring */
          <button
            onClick={() => handleChoice(onNext)}
            className="relative flex-1 py-5 border-2 font-display tracking-[0.18em] uppercase transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden text-base bg-gradient-to-b from-[#1a1800] via-[#1a1500] to-[#0e0c08] border-[#FFEA00]/60 text-[#FFEA00] hover:border-[#FFE000] hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="absolute top-[5px] left-[5px] w-2.5 h-2.5 border-t-2 border-l-2 border-[#FFEA00]/60 pointer-events-none" />
            <span className="absolute top-[5px] right-[5px] w-2.5 h-2.5 border-t-2 border-r-2 border-[#FFEA00]/60 pointer-events-none" />
            <span className="absolute bottom-[5px] left-[5px] w-2.5 h-2.5 border-b-2 border-l-2 border-[#FFEA00]/60 pointer-events-none" />
            <span className="absolute bottom-[5px] right-[5px] w-2.5 h-2.5 border-b-2 border-r-2 border-[#FFEA00]/60 pointer-events-none" />
            SIGUIENTE
          </button>
        ) : isVersus && versusPlayer ? (
          /* Carta VERSUS → winner recibe medallas, loser recibe copas */
          <>
            <button
              onClick={() => handleChoice(() => onVersusResult(currentPlayer, versusPlayer))}
              disabled={!versusRevealed}
              className="relative flex-1 py-4 border-2 font-display tracking-[0.12em] uppercase transition-all duration-300 flex flex-col items-center justify-center gap-1 overflow-hidden text-sm bg-gradient-to-b from-[#2a1f00] via-[#1a1200] to-[#0e0c08] border-[#C9A84C]/70 text-[#F0D98A] hover:border-[#E8C84A] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-30 disabled:pointer-events-none"
            >
              <span className="absolute top-[5px] left-[5px] w-2.5 h-2.5 border-t-2 border-l-2 border-[#C9A84C]/70 pointer-events-none" />
              <span className="absolute top-[5px] right-[5px] w-2.5 h-2.5 border-t-2 border-r-2 border-[#C9A84C]/70 pointer-events-none" />
              <span className="absolute bottom-[5px] left-[5px] w-2.5 h-2.5 border-b-2 border-l-2 border-[#C9A84C]/70 pointer-events-none" />
              <span className="absolute bottom-[5px] right-[5px] w-2.5 h-2.5 border-b-2 border-r-2 border-[#C9A84C]/70 pointer-events-none" />
              <span className="truncate max-w-full px-2">{currentPlayer}</span>
              <span className="text-xs text-[#C9A84C]/50 tracking-[0.2em]">GANÓ</span>
            </button>

            <button
              onClick={() => handleChoice(() => onVersusResult(versusPlayer, currentPlayer))}
              disabled={!versusRevealed}
              className="relative flex-1 py-4 border-2 font-display tracking-[0.12em] uppercase transition-all duration-300 flex flex-col items-center justify-center gap-1 overflow-hidden text-sm bg-gradient-to-b from-[#2a1f00] via-[#1a1200] to-[#0e0c08] border-[#C9A84C]/70 text-[#F0D98A] hover:border-[#E8C84A] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-30 disabled:pointer-events-none"
            >
              <span className="absolute top-[5px] left-[5px] w-2.5 h-2.5 border-t-2 border-l-2 border-[#C9A84C]/70 pointer-events-none" />
              <span className="absolute top-[5px] right-[5px] w-2.5 h-2.5 border-t-2 border-r-2 border-[#C9A84C]/70 pointer-events-none" />
              <span className="absolute bottom-[5px] left-[5px] w-2.5 h-2.5 border-b-2 border-l-2 border-[#C9A84C]/70 pointer-events-none" />
              <span className="absolute bottom-[5px] right-[5px] w-2.5 h-2.5 border-b-2 border-r-2 border-[#C9A84C]/70 pointer-events-none" />
              <span className="truncate max-w-full px-2">{versusPlayer}</span>
              <span className="text-xs text-[#C9A84C]/50 tracking-[0.2em]">GANÓ</span>
            </button>
          </>
        ) : isPose && poseCount >= 2 ? (
          /* Pose grupal → todos los involucrados ganan medallas o copas */
          (() => {
            const involved = [currentPlayer, versusPlayer, versusPlayer2]
              .filter(Boolean)
              .slice(0, poseCount) as string[];
            return (
              <>
                <button
                  onClick={() => handleChoice(() => onPoseResult(involved, true))}
                  className="relative flex-1 py-4 border-2 font-display tracking-[0.12em] uppercase transition-all duration-300 flex items-center justify-center overflow-hidden text-sm bg-gradient-to-b from-[#2a1f00] via-[#1a1200] to-[#0e0c08] border-[#C9A84C]/70 text-[#F0D98A] hover:border-[#E8C84A] hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="absolute top-[5px] left-[5px] w-2.5 h-2.5 border-t-2 border-l-2 border-[#C9A84C]/70 pointer-events-none" />
                  <span className="absolute top-[5px] right-[5px] w-2.5 h-2.5 border-t-2 border-r-2 border-[#C9A84C]/70 pointer-events-none" />
                  <span className="absolute bottom-[5px] left-[5px] w-2.5 h-2.5 border-b-2 border-l-2 border-[#C9A84C]/70 pointer-events-none" />
                  <span className="absolute bottom-[5px] right-[5px] w-2.5 h-2.5 border-b-2 border-r-2 border-[#C9A84C]/70 pointer-events-none" />
                  <span className="text-sm tracking-[0.15em]">CLAVARON</span>
                </button>
                <button
                  onClick={() => handleChoice(() => onPoseResult(involved, false))}
                  className="relative flex-1 py-4 border-2 font-display tracking-[0.12em] uppercase transition-all duration-300 flex items-center justify-center overflow-hidden text-sm bg-gradient-to-b from-[#1a0a0a] via-[#220e0e] to-[#0e0808] border-[#8B2020]/70 text-[#FF6B6B] hover:border-[#C03030] hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="absolute top-[5px] left-[5px] w-2.5 h-2.5 border-t-2 border-l-2 border-[#8B2020]/70 pointer-events-none" />
                  <span className="absolute top-[5px] right-[5px] w-2.5 h-2.5 border-t-2 border-r-2 border-[#8B2020]/70 pointer-events-none" />
                  <span className="absolute bottom-[5px] left-[5px] w-2.5 h-2.5 border-b-2 border-l-2 border-[#8B2020]/70 pointer-events-none" />
                  <span className="absolute bottom-[5px] right-[5px] w-2.5 h-2.5 border-b-2 border-r-2 border-[#8B2020]/70 pointer-events-none" />
                  <span className="text-sm tracking-[0.15em]">NO CLAVARON</span>
                </button>
              </>
            );
          })()
        ) : isAdivina ? (
          /* Carta ADIVINA → adivinó (medallas) o no adivinó (copas) */
          <>
            <button
              onClick={() => handleChoice(() => onCompleted())}
              disabled={!versusRevealed}
              className="relative flex-1 py-3 border-2 font-display tracking-[0.15em] uppercase transition-all duration-300 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#2a1f00] via-[#1a1200] to-[#0e0c08] border-[#C9A84C]/70 text-[#F0D98A] hover:border-[#E8C84A] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-30 disabled:pointer-events-none"
            >
              <span className="absolute top-[5px] left-[5px] w-2.5 h-2.5 border-t-2 border-l-2 border-[#C9A84C]/70 pointer-events-none" />
              <span className="absolute top-[5px] right-[5px] w-2.5 h-2.5 border-t-2 border-r-2 border-[#C9A84C]/70 pointer-events-none" />
              <span className="absolute bottom-[5px] left-[5px] w-2.5 h-2.5 border-b-2 border-l-2 border-[#C9A84C]/70 pointer-events-none" />
              <span className="absolute bottom-[5px] right-[5px] w-2.5 h-2.5 border-b-2 border-r-2 border-[#C9A84C]/70 pointer-events-none" />
              <span className="text-sm">ADIVINÓ</span>
            </button>
            <button
              onClick={() => handleChoice(() => onDrank())}
              disabled={!versusRevealed}
              className="relative flex-1 py-3 border-2 font-display tracking-[0.15em] uppercase transition-all duration-300 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#1a0a0a] via-[#220e0e] to-[#0e0808] border-[#8B2020]/70 text-[#FF6B6B] hover:border-[#C03030] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-30 disabled:pointer-events-none"
            >
              <span className="absolute top-[5px] left-[5px] w-2.5 h-2.5 border-t-2 border-l-2 border-[#8B2020]/70 pointer-events-none" />
              <span className="absolute top-[5px] right-[5px] w-2.5 h-2.5 border-t-2 border-r-2 border-[#8B2020]/70 pointer-events-none" />
              <span className="absolute bottom-[5px] left-[5px] w-2.5 h-2.5 border-b-2 border-l-2 border-[#8B2020]/70 pointer-events-none" />
              <span className="absolute bottom-[5px] right-[5px] w-2.5 h-2.5 border-b-2 border-r-2 border-[#8B2020]/70 pointer-events-none" />
              <span className="text-sm">NO ADIVINÓ</span>
            </button>
          </>
        ) : (
          /* Carta de jugador → CUMPLIÓ / TOMÓ */
          <>
            <button
              onClick={() => handleChoice(() => onCompleted(isWithPartner && versusPlayer ? versusPlayer : undefined))}
              className="relative flex-1 py-3 border-2 font-display tracking-[0.15em] uppercase transition-all duration-300 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#2a1f00] via-[#1a1200] to-[#0e0c08] border-[#C9A84C]/70 text-[#F0D98A] hover:border-[#E8C84A] hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="absolute top-[5px] left-[5px] w-2.5 h-2.5 border-t-2 border-l-2 border-[#C9A84C]/70 pointer-events-none" />
              <span className="absolute top-[5px] right-[5px] w-2.5 h-2.5 border-t-2 border-r-2 border-[#C9A84C]/70 pointer-events-none" />
              <span className="absolute bottom-[5px] left-[5px] w-2.5 h-2.5 border-b-2 border-l-2 border-[#C9A84C]/70 pointer-events-none" />
              <span className="absolute bottom-[5px] right-[5px] w-2.5 h-2.5 border-b-2 border-r-2 border-[#C9A84C]/70 pointer-events-none" />
              <span className="text-sm">{isPicante ? "SAFÓ" : isWithPartner ? "CUMPLIERON" : "CUMPLIÓ"}</span>
            </button>

            <button
              onClick={() => handleChoice(() => onDrank(isWithPartner && versusPlayer ? versusPlayer : undefined))}
              className="relative flex-1 py-3 border-2 font-display tracking-[0.15em] uppercase transition-all duration-300 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#1a0a0a] via-[#220e0e] to-[#0e0808] border-[#8B2020]/70 text-[#FF6B6B] hover:border-[#C03030] hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="absolute top-[5px] left-[5px] w-2.5 h-2.5 border-t-2 border-l-2 border-[#8B2020]/70 pointer-events-none" />
              <span className="absolute top-[5px] right-[5px] w-2.5 h-2.5 border-t-2 border-r-2 border-[#8B2020]/70 pointer-events-none" />
              <span className="absolute bottom-[5px] left-[5px] w-2.5 h-2.5 border-b-2 border-l-2 border-[#8B2020]/70 pointer-events-none" />
              <span className="absolute bottom-[5px] right-[5px] w-2.5 h-2.5 border-b-2 border-r-2 border-[#8B2020]/70 pointer-events-none" />
              <span className="text-sm">{isWithPartner ? "TOMARON" : "TOMÓ"}</span>
            </button>
          </>
        )}
      </div>
      {/* Modal: save half */}
      {showSaveHalf && (
        <SaveHalfModal
          players={players}
          saveCount={Math.floor(players.length / 2)}
          onConfirm={(savedPlayers) => {
            setShowSaveHalf(false);
            setAnimKey((k) => k + 1);
            timeoutRef.current = setTimeout(() => onSaveHalf(savedPlayers), 30);
          }}
        />
      )}

      {/* Modal: perdedor de BASTA */}
      {bastaFinished && (
        <BastaLoserModal
          players={players}
          onConfirm={(loser) => {
            setBastaFinished(false);
            setAnimKey((k) => k + 1);
            timeoutRef.current = setTimeout(() => onBastaLoser(loser), 30);
          }}
        />
      )}

      {/* Modal: confirmación cuando el timer sigue corriendo */}
      {pendingAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-6">
          <div className="w-full max-w-[340px] rounded-2xl border-2 border-[#C9A84C]/50 bg-[#18120a] p-7 flex flex-col items-center gap-5 text-center shadow-2xl">
            <span className="text-4xl">⏱️</span>
            <p className="font-display text-[#F0D98A] text-base leading-relaxed">
              El timer sigue corriendo.<br />¿Avanzar igual?
            </p>
            <div className="flex gap-3 w-full">
              <button
                onClick={() => setPendingAction(null)}
                className="flex-1 py-3 border border-[#C9A84C]/40 font-display text-xs tracking-[0.18em] uppercase text-[#C9A84C]/60 hover:text-[#C9A84C] transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmAdvance}
                className="flex-1 py-3 border border-[#C9A84C]/70 bg-[#2a1f00] font-display text-xs tracking-[0.18em] uppercase text-[#F0D98A] hover:bg-[#3a2d00] transition-colors"
              >
                Avanzar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
