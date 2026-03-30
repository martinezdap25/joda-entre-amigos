import { CardCategory, CardData } from "@/lib/types";
import { retoCards } from "./cards/reto";
import { confesionCards } from "./cards/confesion";
import { todosCards } from "./cards/todos";
import { amigosCards } from "./cards/amigos";
import { picanteCards } from "./cards/picante";

export const cardsByCategory: Record<CardCategory, CardData[]> = {
  RETO: retoCards,
  CONFESION: confesionCards,
  TODOS: todosCards,
  AMIGOS: amigosCards,
  PICANTE: picanteCards,
};

export const totalCardCount = Object.values(cardsByCategory).reduce(
  (sum, cards) => sum + cards.length,
  0
);
