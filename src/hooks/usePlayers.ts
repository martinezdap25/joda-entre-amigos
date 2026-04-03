"use client";

import { useState, useCallback } from "react";
import { MIN_PLAYERS, MAX_PLAYERS, MAX_NAME_LENGTH } from "@/lib/constants";

interface UsePlayersReturn {
  playerName: string;
  players: string[];
  error: string;
  canStart: boolean;
  setPlayerName: (name: string) => void;
  addPlayer: () => boolean;
  removePlayer: (name: string) => void;
}

export function usePlayers(): UsePlayersReturn {
  const [playerName, setPlayerName] = useState("");
  const [players, setPlayers] = useState<string[]>([]);
  const [error, setError] = useState("");

  const canStart = players.length >= MIN_PLAYERS;

  const addPlayer = useCallback((): boolean => {
    const name = playerName.trim().slice(0, MAX_NAME_LENGTH);
    const normalizedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    if (!normalizedName) {
      setError("Escribí un nombre");
      return false;
    }

    if (players.some((p) => p.toLowerCase() === normalizedName.toLowerCase())) {
      setError("Ese nombre ya está en la lista");
      return false;
    }

    if (players.length >= MAX_PLAYERS) {
      setError(`Máximo ${MAX_PLAYERS} jugadores`);
      return false;
    }

    setPlayers((prev) => [...prev, normalizedName]);
    setPlayerName("");
    setError("");
    return true;
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
