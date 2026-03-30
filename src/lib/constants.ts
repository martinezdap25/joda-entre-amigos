import { CardCategory, CategoryConfig } from "./types";

export const MIN_PLAYERS = 2;
export const MAX_PLAYERS = 15;
export const MAX_NAME_LENGTH = 20;

/** Cantidad de cartas por jugador por partida */
export const CARDS_PER_PLAYER = 10;

export const CATEGORY_CONFIG: Record<CardCategory, CategoryConfig> = {
  RETO: {
    label: "RETO",
    emoji: "🔥",
    color: "#FF6B35",
    bgGlow: "rgba(255,107,53,0.15)",
    tailwindColor: "brand-fire",
    points: 2,
    isGroupCard: false,
  },
  CONFESION: {
    label: "CONFESIÓN",
    emoji: "🤫",
    color: "#E040FB",
    bgGlow: "rgba(224,64,251,0.15)",
    tailwindColor: "brand-pink",
    points: 2,
    isGroupCard: false,
  },
  TODOS: {
    label: "TODOS JUEGAN",
    emoji: "🎲",
    color: "#FFEA00",
    bgGlow: "rgba(255,234,0,0.15)",
    tailwindColor: "brand-yellow",
    points: 0,
    isGroupCard: true,
  },
  AMIGOS: {
    label: "AMIGOS DE MIERDA",
    emoji: "💀",
    color: "#FF1744",
    bgGlow: "rgba(255,23,68,0.15)",
    tailwindColor: "brand-red",
    points: 3,
    isGroupCard: false,
  },
  PICANTE: {
    label: "PICANTE LEVE",
    emoji: "🌶️",
    color: "#FF9100",
    bgGlow: "rgba(255,145,0,0.15)",
    tailwindColor: "brand-orange",
    points: 3,
    isGroupCard: false,
  },
};
