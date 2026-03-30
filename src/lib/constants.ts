import { CardCategory, CategoryConfig } from "./types";

export const MIN_PLAYERS = 2;
export const MAX_PLAYERS = 15;
export const MAX_NAME_LENGTH = 20;

export const CATEGORY_CONFIG: Record<CardCategory, CategoryConfig> = {
  RETO: {
    label: "RETO",
    emoji: "🔥",
    color: "#FF6B35",
    bgGlow: "rgba(255,107,53,0.15)",
    tailwindColor: "brand-fire",
  },
  CONFESION: {
    label: "CONFESIÓN",
    emoji: "🤫",
    color: "#E040FB",
    bgGlow: "rgba(224,64,251,0.15)",
    tailwindColor: "brand-pink",
  },
  ELIGE: {
    label: "ELEGÍ A ALGUIEN",
    emoji: "👆",
    color: "#00E5FF",
    bgGlow: "rgba(0,229,255,0.15)",
    tailwindColor: "brand-cyan",
  },
  TODOS: {
    label: "TODOS",
    emoji: "🎉",
    color: "#FFEA00",
    bgGlow: "rgba(255,234,0,0.15)",
    tailwindColor: "brand-yellow",
  },
  AMIGOS: {
    label: "AMIGOS DE MIERDA",
    emoji: "💀",
    color: "#FF1744",
    bgGlow: "rgba(255,23,68,0.15)",
    tailwindColor: "brand-red",
  },
  PICANTE: {
    label: "PICANTE LEVE",
    emoji: "🌶️",
    color: "#FF9100",
    bgGlow: "rgba(255,145,0,0.15)",
    tailwindColor: "brand-orange",
  },
};
