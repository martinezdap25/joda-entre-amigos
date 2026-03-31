"use client";

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

  return (
    <main className="relative min-h-dvh">
      <ParticleBackground />

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
