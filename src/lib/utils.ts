import { CardData, GameCard, CardCategory } from "./types";

/**
 * Fisher-Yates shuffle — returns a new shuffled array.
 */
export function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Pick a random player excluding a given one.
 */
export function pickRandomPlayer(allPlayers: string[], exclude: string): string {
  const others = allPlayers.filter((p) => p !== exclude);
  return others[Math.floor(Math.random() * others.length)] ?? exclude;
}

/**
 * Replace {player}, {randomPlayer} and {randomPlayer2} placeholders in card text.
 * Explicitly provided players are used directly (no re-randomisation).
 */
export function processCardText(
  text: string,
  currentPlayer: string,
  allPlayers: string[],
  versusPlayer?: string,
  versusPlayer2?: string
): string {
  let result = text.replace(/{player}/g, currentPlayer);

  const p1 = versusPlayer ?? pickRandomPlayer(allPlayers, currentPlayer);
  result = result.replace(/{randomPlayer}/g, p1);

  if (versusPlayer2) {
    result = result.replace(/{randomPlayer2}/g, versusPlayer2);
  }

  return result;
}

/**
 * Build the full deck from a category-keyed card map.
 */
export function buildDeck(
  cardMap: Record<CardCategory, CardData[]>
): GameCard[] {
  return Object.entries(cardMap).flatMap(([category, cards]) =>
    cards.map((card) => ({
      ...card,
      category: category as CardCategory,
    }))
  );
}

/**
 * Build a fully shuffled deck from all categories mixed together.
 * TODOS cards appear randomly throughout (no rigid pattern).
 */
export function buildInterlacedDeck(
  cardMap: Record<CardCategory, CardData[]>
): GameCard[] {
  const allCards: GameCard[] = [];
  for (const [cat, cards] of Object.entries(cardMap)) {
    for (const card of cards) {
      allCards.push({ ...card, category: cat as CardCategory });
    }
  }
  return shuffleArray(allCards);
}
