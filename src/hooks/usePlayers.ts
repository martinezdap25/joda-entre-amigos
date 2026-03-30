"use client";

import { useState, useCallback } from "react";
import { MIN_PLAYERS, MAX_PLAYERS, MAX_NAME_LENGTH } from "@/lib/constants";

interface UsePlayersReturn {
  playerName: string;
  players: string[];
  error: string;
  canStart: boolean;
  setPlayerName: (name: string) => void;
  addPlayer: () => void;
  removePlayer: (name: string) => void;
}

export function usePlayers(): UsePlayersReturn {
  const [playerName, setPlayerName] = useState("");
  const [players, setPlayers] = useState<string[]>([]);
  const [error, setError] = useState("");

  const canStart = players.length >= MIN_PLAYERS;

  const addPlayer = useCallback(() => {
    const name = playerName.trim().slice(0, MAX_NAME_LENGTH);

    if (!name) {
      setError("Escribí un nombre");
      return;
    }

    if (players.some((p) => p.toLowerCase() === name.toLowerCase())) {
      setError("Ese nombre ya está en la lista");
      return;
    }

    if (players.length >= MAX_PLAYERS) {
      setError(`Máximo ${MAX_PLAYERS} jugadores`);
      return;
    }

    setPlayers((prev) => [...prev, name]);
    setPlayerName("");
    setError("");
  }, [playerName, players]);

  const removePlayer = useCallback((name: string) => {
    setPlayers((prev) => prev.filter((p) => p !== name));
    setError("");
  }, []);

  return {
    playerName,
    players,
    error,
    canStart,
    setPlayerName,
    addPlayer,
    removePlayer,
  };
}
