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
    handleBastaLoser,
    restartGame,
    exitGame,
  } = useGame();

  useEffect(() => {
    if (screen !== "setup") {
      // Detener explícitamente en cualquier pantalla que no sea setup.
      // Esto cubre el caso donde el .catch() de play() registró un
      // resumeHandler huérfano antes de que el cleanup anterior corriera.
      audioManager.stopBg();
      return;
    }
    audioManager.playBg("/sounds/bellaciao.mp3");
    return () => audioManager.stopBg();
  }, [screen]);

  const handleStartGame = (players: string[]) => {
    audioManager.stopBg();
    startGame(players);
  };

  return (
    <main className="relative min-h-dvh">
      <ParticleBackground />

      {/* Botón de volumen — solo en setup */}
      {screen === "setup" && (
        <div className="fixed top-4 right-4 z-[100]">
          <VolumeControl />
        </div>
      )}

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
          onBastaLoser={handleBastaLoser}
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
