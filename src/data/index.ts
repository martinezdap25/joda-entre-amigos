import { CardCategory, CardData } from "@/lib/types";
import allCardsRaw from "./cards.json";

type RawCard = CardData & { category: CardCategory };

const allCards = allCardsRaw as RawCard[];

export const cardsByCategory: Record<CardCategory, CardData[]> = {
  RETO:      allCards.filter(c => c.category === "RETO"),
  CONFESION: allCards.filter(c => c.category === "CONFESION"),
  TODOS:     allCards.filter(c => c.category === "TODOS"),
  AMIGOS:    allCards.filter(c => c.category === "AMIGOS"),
  PICANTE:   allCards.filter(c => c.category === "PICANTE"),
  BASTA:     allCards.filter(c => c.category === "BASTA"),
  VERSUS:    allCards.filter(c => c.category === "VERSUS"),
};

export const totalCardCount = allCards.length;
