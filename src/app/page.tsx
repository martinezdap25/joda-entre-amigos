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
    turnIndex,
    progress,
    startGame,
    nextCard,
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
          turnIndex={turnIndex}
          progress={progress}
          onNext={nextCard}
          onExit={exitGame}
        />
      )}

      {screen === "finished" && (
        <GameOver
          totalCards={totalCards}
          onRestart={restartGame}
          onExit={exitGame}
        />
      )}
    </main>
  );
}
