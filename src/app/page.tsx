"use client";

import { useEffect, useRef } from "react";
import { useGame } from "@/hooks";
import { ParticleBackground } from "@/components/layout/ParticleBackground";
import { PlayerSetup, GameScreen, GameOver } from "@/components/game";

export default function Home() {
  const {
    screen,
    players,
    currentPlayer,
    currentCard,
    cardIndex,
    totalCards,
    progress,
    scores,
    isGroupCard,
    startGame,
    handleCompleted,
    handleDrank,
    handleNext,
    handleVersusResult,
    handlePoseResult,
    restartGame,
    exitGame,
  } = useGame();

  const bgRef = useRef<HTMLAudioElement | null>(null);

  // Arranca al montar la app
  useEffect(() => {
    if (screen !== "setup") return;

    const audio = new Audio("/sounds/bellaciao.mp3");
    audio.loop   = true;
    audio.volume = 0.3;
    bgRef.current = audio;

    const tryPlay = () => audio.play().catch(() => {});
    audio.play().catch(() => {
      document.addEventListener("click",      tryPlay, { once: true });
      document.addEventListener("touchstart", tryPlay, { once: true });
    });

    return () => {
      document.removeEventListener("click",      tryPlay);
      document.removeEventListener("touchstart", tryPlay);
      audio.pause();
      audio.src = "";
      bgRef.current = null;
    };
  }, [screen]);

  // Para la música cuando el jugador presiona Comenzar
  const handleStartGame = (players: string[]) => {
    if (bgRef.current) {
      bgRef.current.pause();
      bgRef.current = null;
    }
    startGame(players);
  };

  return (
    <main className="relative min-h-dvh">
      <ParticleBackground />

      {screen === "setup" && <PlayerSetup onStartGame={handleStartGame} />}

      {screen === "playing" && currentCard && (
        <GameScreen
          players={players}
          currentPlayer={currentPlayer}
          currentCard={currentCard}
          cardIndex={cardIndex}
          totalCards={totalCards}
          progress={progress}
          isGroupCard={isGroupCard}
          onCompleted={handleCompleted}
          onDrank={handleDrank}
          onNext={handleNext}
          onVersusResult={handleVersusResult}
          onPoseResult={handlePoseResult}
          onExit={exitGame}
        />
      )}

      {screen === "finished" && (
        <GameOver
          totalCards={totalCards}
          scores={scores}
          onRestart={restartGame}
          onExit={exitGame}
        />
      )}
    </main>
  );
}
