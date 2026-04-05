"use client";

import { useState, useCallback } from "react";
import { GameCard, GameScreen, PlayerScore } from "@/lib/types";
import { buildInterlacedDeck } from "@/lib/utils";
import { cardsByCategory } from "@/data";
import { CARDS_PER_PLAYER, CATEGORY_CONFIG } from "@/lib/constants";
import { audioManager } from "@/lib/audioManager";

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
  scores: PlayerScore[];
  isGroupCard: boolean;

  // Actions
  startGame: (playerList: string[]) => void;
  handleCompleted: (partner?: string) => void;
  handleDrank: (partner?: string) => void;
  handleNext: () => void;
  handleVersusResult: (winner: string, loser: string) => void;
  handlePoseResult: (involvedPlayers: string[], success: boolean) => void;
  handleBastaLoser: (loser: string) => void;
  handleSaveHalf: (savedPlayers: string[]) => void;
  restartGame: () => void;
  exitGame: () => void;
}

export function useGame(): UseGameReturn {
  const [screen, setScreen] = useState<GameScreen>("setup");
  const [players, setPlayers] = useState<string[]>([]);
  const [deck, setDeck] = useState<GameCard[]>([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [turnIndex, setTurnIndex] = useState(0);
  const [scores, setScores] = useState<PlayerScore[]>([]);

  const currentPlayer = players.length > 0
    ? players[turnIndex % players.length]
    : "";

  const currentCard = deck.length > 0 ? deck[cardIndex] : null;

  const isGroupCard = currentCard
    ? CATEGORY_CONFIG[currentCard.category].isGroupCard
    : false;

  const progress = deck.length > 0
    ? Math.round(((cardIndex + 1) / deck.length) * 100)
    : 0;

  const createDeck = useCallback(
    (playerCount: number) => {
      // Filtrar cartas con requisito mínimo de jugadores
      const filtered = Object.fromEntries(
        Object.entries(cardsByCategory).map(([cat, cards]) => [
          cat,
          cards.filter((c) => !c.minPlayers || c.minPlayers <= playerCount),
        ])
      ) as typeof cardsByCategory;
      const allCards = buildInterlacedDeck(filtered);
      const total = CARDS_PER_PLAYER * playerCount;
      return allCards.slice(0, Math.min(total, allCards.length)).map((card) => {
        let c = { ...card };
        if (c.colorOptions?.length && c.text.includes("{randomColor}")) {
          const color = c.colorOptions[Math.floor(Math.random() * c.colorOptions.length)];
          c = { ...c, text: c.text.replace(/\{randomColor\}/g, color) };
        }
        if (c.monthOptions?.length && c.text.includes("{randomMonth}")) {
          const month = c.monthOptions[Math.floor(Math.random() * c.monthOptions.length)];
          c = { ...c, text: c.text.replace(/\{randomMonth\}/g, month) };
        }
        return c;
      });
    },
    []
  );

  const advanceCard = useCallback(() => {
    if (cardIndex + 1 >= deck.length) {
      setScreen("finished");
      return;
    }
    setCardIndex((i) => i + 1);
    setTurnIndex((i) => i + 1);
  }, [cardIndex, deck.length]);

  const getPoints = useCallback((card: typeof currentCard) => {
    if (!card) return 1;
    return card.points ?? CATEGORY_CONFIG[card.category].points;
  }, []);

  const handleCompleted = useCallback((partner?: string) => {
    const pts = getPoints(currentCard);
    setScores((prev) =>
      prev.map((s) => {
        if (s.name === currentPlayer) return { ...s, medals: s.medals + pts };
        if (partner && s.name === partner) return { ...s, medals: s.medals + pts };
        return s;
      })
    );
    advanceCard();
  }, [currentPlayer, currentCard, advanceCard, getPoints]);

  const handleDrank = useCallback((partner?: string) => {
    const pts = getPoints(currentCard);
    setScores((prev) =>
      prev.map((s) => {
        if (s.name === currentPlayer) return { ...s, drinks: s.drinks + pts };
        if (partner && s.name === partner) return { ...s, drinks: s.drinks + pts };
        return s;
      })
    );
    advanceCard();
  }, [currentPlayer, currentCard, advanceCard, getPoints]);

  // Para cartas grupales: avanza sin asignar puntos a nadie
  const handleNext = useCallback(() => {
    advanceCard();
  }, [advanceCard]);

  // Para BASTA: el perdedor suma copas según los puntos de la carta y se avanza
  const handleBastaLoser = useCallback((loser: string) => {
    const pts = getPoints(currentCard);
    setScores((prev) =>
      prev.map((s) => s.name === loser ? { ...s, drinks: s.drinks + pts } : s)
    );
    advanceCard();
  }, [currentCard, advanceCard, getPoints]);

  // Para save_half: los jugadores no salvados reciben 3 copas cada uno
  const handleSaveHalf = useCallback((savedPlayers: string[]) => {
    setScores((prev) =>
      prev.map((s) =>
        savedPlayers.includes(s.name) ? s : { ...s, drinks: s.drinks + 3 }
      )
    );
    advanceCard();
  }, [advanceCard]);

  // Para cartas VERSUS: winner recibe medallas, loser recibe copas
  const handleVersusResult = useCallback((winner: string, loser: string) => {
    const pts = getPoints(currentCard);
    setScores((prev) =>
      prev.map((s) => {
        if (s.name === winner) return { ...s, medals: s.medals + pts };
        if (s.name === loser) return { ...s, drinks: s.drinks + pts };
        return s;
      })
    );
    advanceCard();
  }, [currentCard, advanceCard, getPoints]);

  // Para cartas de pose: todos los involucrados reciben medallas o copas
  const handlePoseResult = useCallback((involvedPlayers: string[], success: boolean) => {
    const pts = getPoints(currentCard);
    setScores((prev) =>
      prev.map((s) => {
        if (!involvedPlayers.includes(s.name)) return s;
        return success
          ? { ...s, medals: s.medals + pts }
          : { ...s, drinks: s.drinks + pts };
      })
    );
    advanceCard();
  }, [currentCard, advanceCard, getPoints]);

  const startGame = useCallback(
    (playerList: string[]) => {
      setPlayers(playerList);
      setDeck(createDeck(playerList.length));
      setScores(playerList.map((name) => ({ name, medals: 0, drinks: 0 })));
      setCardIndex(0);
      setTurnIndex(0);
      setScreen("playing");
    },
    [createDeck]
  );

  const restartGame = useCallback(() => {
    setDeck(createDeck(players.length));
    setScores(players.map((name) => ({ name, medals: 0, drinks: 0 })));
    setCardIndex(0);
    setTurnIndex(0);
    setScreen("playing");
  }, [createDeck, players]);

  const exitGame = useCallback(() => {
    audioManager.stopTimerTick();
    setScreen("setup");
    setPlayers([]);
    setDeck([]);
    setScores([]);
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
    scores,
    isGroupCard,
    startGame,
    handleCompleted,
    handleDrank,
    handleNext,
    handleVersusResult,
    handleBastaLoser,
    handlePoseResult,
    handleSaveHalf,
    restartGame,
    exitGame,
  };
}
