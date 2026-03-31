"use client";

import { useEffect } from "react";
import { useGame } from "@/hooks";
import { ParticleBackground } from "@/components/layout/ParticleBackground";
import { PlayerSetup, GameScreen, GameOver } from "@/components/game";
import { VolumeControl } from "@/components/ui/VolumeControl";
import { audioManager } from "@/lib/audioManager";

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

  /* Música de fondo: solo en setup */
  useEffect(() => {
    if (screen === "setup") {
      audioManager.playBg("/sounds/bellaciao.mp3");
    } else {
      audioManager.stopBg();
    }
  }, [screen]);

  return (
    <main className="relative min-h-dvh">
      <ParticleBackground />

      {/* Botón de volumen — solo en setup */}
      {screen === "setup" && (
        <div className="fixed top-4 right-4 z-50">
          <VolumeControl />
        </div>
      )}

      {screen === "setup" && <PlayerSetup onStartGame={startGame} />}

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
