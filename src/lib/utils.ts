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
 * Replace {player} and {randomPlayer} placeholders in card text.
 */
export function processCardText(
  text: string,
  currentPlayer: string,
  allPlayers: string[]
): string {
  let result = text.replace(/{player}/g, currentPlayer);

  const others = allPlayers.filter((p) => p !== currentPlayer);
  if (others.length > 0) {
    const randomOther = others[Math.floor(Math.random() * others.length)];
    result = result.replace(/{randomPlayer}/g, randomOther);
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
