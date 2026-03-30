"use client";

import { useState, useCallback } from "react";
import { GameCard, GameScreen } from "@/lib/types";
import { shuffleArray, buildDeck } from "@/lib/utils";
import { cardsByCategory } from "@/data";
import { CARDS_PER_PLAYER } from "@/lib/constants";

interface UseGameReturn {
  // State
  screen: GameScreen;
  players: string[];
  deck: GameCard[];
  cardIndex: number;
  turnIndex: number;
  currentPlayer: string;
  currentCard: GameCard | null;
  progress: number;
  totalCards: number;

  // Actions
  startGame: (playerList: string[]) => void;
  nextCard: () => void;
  restartGame: () => void;
  exitGame: () => void;
}

export function useGame(): UseGameReturn {
  const [screen, setScreen] = useState<GameScreen>("setup");
  const [players, setPlayers] = useState<string[]>([]);
  const [deck, setDeck] = useState<GameCard[]>([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [turnIndex, setTurnIndex] = useState(0);

  const currentPlayer = players.length > 0
    ? players[turnIndex % players.length]
    : "";

  const currentCard = deck.length > 0 ? deck[cardIndex] : null;

  const progress = deck.length > 0
    ? Math.round(((cardIndex + 1) / deck.length) * 100)
    : 0;

  const createShuffledDeck = useCallback(
    (playerCount: number) => {
      const allCards = buildDeck(cardsByCategory);
      const shuffled = shuffleArray(allCards);
      const total = CARDS_PER_PLAYER * playerCount;
      return shuffled.slice(0, Math.min(total, shuffled.length));
    },
    []
  );

  const startGame = useCallback(
    (playerList: string[]) => {
      setPlayers(playerList);
      setDeck(createShuffledDeck(playerList.length));
      setCardIndex(0);
      setTurnIndex(0);
      setScreen("playing");
    },
    [createShuffledDeck]
  );

  const nextCard = useCallback(() => {
    if (cardIndex + 1 >= deck.length) {
      setScreen("finished");
      return;
    }
    setCardIndex((i) => i + 1);
    setTurnIndex((i) => i + 1);
  }, [cardIndex, deck.length]);

  const restartGame = useCallback(() => {
    setDeck(createShuffledDeck(players.length));
    setCardIndex(0);
    setTurnIndex(0);
    setScreen("playing");
  }, [createShuffledDeck, players.length]);

  const exitGame = useCallback(() => {
    setScreen("setup");
    setPlayers([]);
    setDeck([]);
    setCardIndex(0);
    setTurnIndex(0);
  }, []);

  return {
    screen,
    players,
    deck,
    cardIndex,
    turnIndex,
    currentPlayer,
    currentCard,
    progress,
    totalCards: deck.length,
    startGame,
    nextCard,
    restartGame,
    exitGame,
  };
}
