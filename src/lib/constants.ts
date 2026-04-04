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
    points: 1,
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
    label: "PICANTE",
    emoji: "🌶️",
    color: "#FF9100",
    bgGlow: "rgba(255,145,0,0.15)",
    tailwindColor: "brand-orange",
    points: 3,
    isGroupCard: false,
  },
  BASTA: {
    label: "¡BASTA!",
    emoji: "⏱️",
    color: "#C9A84C",
    bgGlow: "rgba(201,168,76,0.15)",
    tailwindColor: "brand-gold",
    points: 2,
    isGroupCard: true,
  },
  VERSUS: {
    label: "VERSUS",
    emoji: "⚔️",
    color: "#00E5FF",
    bgGlow: "rgba(0,229,255,0.15)",
    tailwindColor: "brand-cyan",
    points: 2,
    isGroupCard: false,
  },
  ADIVINA: {
    label: "ADIVINA QUIÉN SOY",
    emoji: "🎭",
    color: "#B388FF",
    bgGlow: "rgba(179,136,255,0.15)",
    tailwindColor: "brand-purple",
    points: 2,
    isGroupCard: false,
  },
};
